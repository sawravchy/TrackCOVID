# ------------------------------------------------------- #
#### Config ####
# ------------------------------------------------------- #
# simulation settings
setConfig = function(input) {
  return(list(
    nTrials = 2,
    toggleIntervention = input$toggleIntervention | T, # enable or disable the intervention (app) in the simulation
    genPlot = T,
    
    # model config
    nPlaces = 5,
    nPeople = 10,
    totalTime = 20,
    initialInfected = input$initialInfected | 0.05,
    activeTime = input$activeTime | 16,
    infectionProb = input$infectionProb | 0.1, # probability of being infected when exposed
    probDiscoverInfection = input$probDiscoverInfection | 0.8, # dice rolled each time frame
    isolationCompliance = input$isolationCompliance | 0.75,
    
    # intervention config
    assumedTimeFromInfect = input$assumedTimeFromInfect | 20, # how far back in time to assume infection upon discovery
    putativeInfectProb = input$putativeInfectProb | 0.95, # the probability of infection on exposure as estimated by the app
    interventionCompliance = input$interventionCompliance | 0.75
  ))
}

# ------------------------------------------------------- #
#### Libraries ####
# ------------------------------------------------------- #

library(igraph)
library(shiny)

# ------------------------------------------------------- #
#### UI ####
# ------------------------------------------------------- #
ui <- fluidPage(
  mainPanel(
    fluidRow(
      align = "center",
      titlePanel("Infection Spread +- Intervention")
    ),
    fluidRow(
      align = "center",
      checkboxInput("toggleIntervention", "Use Intervention", value = config$toggleIntervention)
    ),
    fluidRow(
      column(
        3,
        sliderInput("initialInfected", h3("Initial Infected"), min = 0, max = 1, value = config$initialInfected),
        sliderInput("activeTime", h3("Active Time"), min = 0, max = 20, value = config$activeTime)
      ),
      column(
        3,
        sliderInput("infectionProb", h3("Transmission Rate"), min = 0, max = 1, value = config$infectionProb),
        sliderInput("probDiscoverInfection", h3("Discovery Rate"), min = 0, max = 1, value = config$probDiscoverInfection)
      ),
      column(
        3,
        sliderInput("isolationCompliance", h3("Isolation Compliance"), min = 0, max = 1, value = config$isolationCompliance)
      )
    ),
    fluidRow(
      column(
        3,
        sliderInput("assumedTimeFromInfect", h3("Estimated Time from Infection"), min = 0, max = 20, value = config$assumedTimeFromInfect),
        sliderInput("putativeInfectProb", h3("Estimated Transmission Rate"), min = 0, max = 1, value = config$putativeInfectProb)
      ),
      column(
        3,
        sliderInput("interventionCompliance", h3("Intervention Compliance"), min = 0, max = 1, value = config$interventionCompliance)
      )
    ),
    fluidRow(
      align = "center",
      textOutput("percent_infected")
    ),
    fluidRow(
      align = "center",
      plotOutput('plot1')
    ),
    width = 12
  )
)

# ------------------------------------------------------- #
#### Methods ####
# ------------------------------------------------------- #

flaggedRisk = function(personIndex, t, context, config) {
  # This is how the app would assess each person's risk
  # Or at least a simplified version of it
  lastEvent = getVertexIndex(context$peopleLocations[personIndex], t, config)
  exposureTable = distances(context$exposureNetwork, to=lastEvent, mode = 'out')
  isRisk = F
  for (flaggedEvent in unique(context$flaggedExposeEvents)) {
    exposeDistance = exposureTable[context$flaggedExposeEvents[flaggedEvent]]
    if (!(exposeDistance %in% c(0, Inf))) {
      isRisk = T
    }
  }
  return(isRisk)
}

booleanProb = function(probTrue, n=1) {
  sample(c(T,F), n, replace=T, c(probTrue, 1 - probTrue))
}

updatePersonAtHome = function(personIndex, t, context, config) {
  if (isActiveInfected(personIndex, context, config, t) & context$infectionKnowledge[personIndex]) {
    return(booleanProb(config$isolationCompliance))
  } else if (t > 1 & config$toggleIntervention & flaggedRisk(personIndex, t, context, config)) {
    # again this assumes 100% compliance
    return(booleanProb(config$interventionCompliance))
  } else {
    return(F)
  }
}

updatePersonLocation = function(personIndex, context, config) {
  return(sample(1:config$nPlaces, 1, replace=T, context$placeProbabilities[personIndex,]))
}

getPlaceProbabilities = function(personIndex, context, config) {
  weights = rep(0, config$nPlaces)
  personHome = context$peopleHomes[personIndex]
  for (placeIndex in 1:length(context$placePopularities)) {
    placePopularity = context$placePopularities[placeIndex]
    distanceA = (context$peopleHomes[personIndex] - placeIndex) %% config$nPlaces
    distanceB = (placeIndex - context$peopleHomes[personIndex]) %% config$nPlaces
    distance = min(distanceA, distanceB)
    weights[placeIndex] = ifelse(distance == 0, placePopularity, placePopularity / distance)
  }
  return(weights / sum(weights))
}

isActiveInfected = function(personIndex, context, config, t) {
  return(
    context$infected[personIndex] &
    (t - context$infectedTime[personIndex] <= config$activeTime)
  )
}

isExposed = function(personIndex, context) {
  return(
    !context$infected[personIndex] &
    !context$peopleAtHome[personIndex] &
    context$peopleLocations[personIndex] %in% context$exposedPlaces
  )
}

addLayer = function(context, config, t) {
  context$exposureNetwork = add.vertices(context$exposureNetwork, config$nPlaces)
  nVertices = vcount(context$exposureNetwork)
  for (p in 1:config$nPlaces) {
    v = nVertices - config$nPlaces + p
    context$exposureNetwork = set_vertex_attr(context$exposureNetwork, 't', index=v, t)
    context$exposureNetwork = set_vertex_attr(context$exposureNetwork, 'place', index=v, p)
  }
  return(context$exposureNetwork)
}

getVertexIndex = function(location, t, config) {
  return((t - 1) * config$nPlaces + location)
}

logMovement = function(personIndex, currentMoveTime, previousLocation, previousMoveTime, context) {
  currentLocation = context$peopleLocations[personIndex]
  fromIndex = getVertexIndex(previousLocation, previousMoveTime, config)
  toIndex = getVertexIndex(currentLocation, currentMoveTime, config)
  context$exposureNetwork = add_edges(context$exposureNetwork, c(fromIndex, toIndex))
  return(context$exposureNetwork)
}

logExposeEvents = function(exposedPlaces) {
  newEvents = c()
  uniqueExposedPlaces = unique(exposedPlaces)
  for (p in 1:config$nPlaces) {
    newEvents = append(newEvents, p %in% uniqueExposedPlaces)
  }
  return(newEvents)
}

updateInfectionKnowledge = function(personIndex, t, context) {
  # person may discover their infection with some probability
  if (!context$infectionKnowledge[personIndex]) {
    context$infectionKnowledge[personIndex] = booleanProb(config$probDiscoverInfection)
  }
  return(context$infectionKnowledge)
}

flagInfection = function(personIndex, t, context, config) {
  # person assumes they have had infection for some time
  for (u in max(t - config$assumedTimeFromInfect, 1):t) {
    flaggedLocation = context$locationHistory[u, personIndex]
    context$flaggedExposeEvents = append(context$flaggedExposeEvents, getVertexIndex(flaggedLocation, u, config))
  }
  return(context$flaggedExposeEvents[!is.na(context$flaggedExposeEvents)])
}

# ------------------------------------------------------- #
#### Model ####
# ------------------------------------------------------- #
modelFn = function(input) {
  config = setConfig(input)
  trialResults = c()
  for (q in 1:config$nTrials) {
    # infection model
    infected = booleanProb(config$initialInfected, n=config$nPeople)
    context = list(
      infected = infected,
      infectedStart = length(infected[infected]),
      placePopularities = rbeta(config$nPlaces, 2, 2),
      peopleHomes = floor(runif(config$nPeople, min=0, max=config$nPlaces)),
      peopleLocations = floor(runif(config$nPeople, min=1, max=config$nPlaces)),
      locationHistory = matrix(nrow=config$totalTime, ncol=config$nPeople),
      lastMovedTime = rep(1, config$nPeople),
      peopleAtHome = rep(NA, config$nPeople),
      infectedTime = ifelse(infected, 0, NA),
      exposeEvents = c(),
      placeProbabilities = matrix(nrow=config$nPeople, ncol=config$nPlaces),
      
      # intervention model
      # the exposure network is a "layered" directed graph; represents data maintanined in the app network
      # each layer in the graph is a point in time
      # each node in each layer is a place
      # edges point only forward in time, from one place to another (can also point to same place in next time frame)
      # the edges represent movement of people across time
      # edges are allowed to skip layers. This happens when people stay home for that time frame.
      exposureNetwork = graph.empty(n=0, directed=T),
      infectionKnowledge = rep(F, config$nPeople),
      # These may or may not be true expose events
      # This represents the information that is available in the network
      flaggedExposeEvents = c(),
      infectedMovements = c() # for visualization
    )
    
    for (personIndex in 1:config$nPeople) {
      context$placeProbabilities[personIndex,] = getPlaceProbabilities(personIndex, context, config)
    }
    
    for (t in 1:config$totalTime) {
      exposedPlaces = c()
      # add 1 vertex for each place for each layer; each layer represents a point in time
      context$exposureNetwork = addLayer(context, config, t)
      for (personIndex in 1:config$nPeople) {
        # update locations (simulate movement)
        context$peopleAtHome[personIndex] = updatePersonAtHome(personIndex, t, context, config)
        personMoved = !context$peopleAtHome[personIndex]
        previousLocation = NA
        if (t > 1 & personMoved) {
          previousLocation = context$peopleLocations[personIndex]
          previousMoveTime = context$lastMovedTime[personIndex]
          context$peopleLocations[personIndex] = updatePersonLocation(personIndex, context, config)
          context$lastMovedTime[personIndex] = t
          # update exposure network
          context$exposureNetwork = logMovement(personIndex, t, previousLocation, previousMoveTime, context)
          context$infectedMovements = append(context$infectedMovements, isActiveInfected(personIndex, context, config, t))
        }
        context$locationHistory[t,personIndex] = ifelse(personMoved, context$peopleLocations[personIndex], NA)
        if (!context$peopleAtHome[personIndex] & isActiveInfected(personIndex, context, config, t)) {
          # if person is infected and active and not at home, they have exposed everyone at this location/point in time
          context$exposedPlaces = append(context$exposedPlaces, context$peopleLocations[personIndex])
          context$infectionKnowledge = updateInfectionKnowledge(personIndex, t, context)
          if (context$infectionKnowledge[personIndex]) {
            context$flaggedExposeEvents = flagInfection(personIndex, t, context, config)
          }
        }
      }
      for (personIndex in 1:config$nPeople) {
        if (isExposed(personIndex, context)) {
          # if person is in same time/place, they are exposed
          # probalistic infection
          context$infected[personIndex] = sample(booleanProb(config$infectionProb))
          if (context$infected[personIndex]) {
            # if infected, set time of infection
            context$ infectedTime[personIndex] = t
          }
        }
      }
      context$exposeEvents = append(context$exposeEvents, logExposeEvents(context$exposedPlaces))
      if (config$nTrials == 1) {
        activeInfected = sapply(1:config$nPeople, function(i) { isActiveInfected(i, context, config, t) })
        print(paste('t:', t, ', # active:', length(context$activeInfected[context$activeInfected])))
        print(paste('t:', t, ', # infected:', length(context$infected[context$infected])))
        print(paste('t:', t, ', # at home:', length(context$peopleAtHome[context$peopleAtHome])))
      }
    }
    activeInfected = sapply(1:config$nPeople, function(i) { isActiveInfected(i, context, config, t) })
    trialResults = append(trialResults, length(context$infected[context$infected]) / config$nPeople)
  }
  # print(infectedStart)
  percent_infected = paste(round(mean(trialResults) * 100), '%', sep='')
  print(percent_infected)
  
  if (config$genPlot) {
    eventColors = ifelse(
      context$exposeEvents,
      '#e37d7d',
      '#86bdfc'
    )
    edgeColors = ifelse(
      context$infectedMovements,
      '#cf1111',
      '#076adb'
    )
    
    return(list(
      plot=plot(
        context$exposureNetwork,
        layout=function(g) { return(layout_on_grid(g, width=config$nPlaces)) },
        vertex.color=eventColors, #86bdfc
        vertex.size=rep(sqrt(context$placePopularities * 100), config$totalTime),
        edge.width=0.5,
        edge.color=edgeColors,
        label.font=2
      ),
      infected=percent_infected,
      nTrials=config$nTrials
    ))
  }
}

server <- function(input, output) {
  result = reactive(modelFn(input))
  output$plot1 <- renderPlot({
    result()$item
  }, height = 800, width = 800)
  output$percent_infected <- renderPrint(
    {paste('Average of ',result()$nTrials,' simulations: ', result()$infected,' infected', sep='')}
  )
}

shinyApp(ui, server)