(this["webpackJsonpcovidwatch-web"]=this["webpackJsonpcovidwatch-web"]||[]).push([[0],{112:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),i=n.n(o),s=n(164),c=n(163),l=n(7),u=n.n(l),m=n(13),p=n(19),h=n(20),d=n(21),f=n(22),y=n(159),v=n(157),k=n(160),b=n(37),g=n(161),w=n(162),E=n(46),C=n.n(E),S=n(74),j=n.n(S),x=n(75),O=n.n(x),T=n(73),D=n.n(T),P=n(76),I=n.n(P),U=n(158),R=n(166),B=n(154),L=n(167),N=n(156),K=n(155),H=n(144),J=n(147),Y=n(68),M=n.n(Y),A=n(67),F=n.n(A),G=n(29),Q=n.n(G),V=n(69),W=n.n(V),q=n(63),z=n.n(q),_=n(40),X=n.n(_),Z=n(65),$=n.n(Z),ee=n(25);function te(){return ne.apply(this,arguments)}function ne(){return(ne=Object(m.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.localStorage,n=t.getItem("USECONFIRMED")||"false",e.abrupt("return",Promise.resolve(JSON.parse(n)));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ae(e){return re.apply(this,arguments)}function re(){return(re=Object(m.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=window.localStorage,e.abrupt("return",Promise.resolve(n.setItem("USECONFIRMED",JSON.stringify(t))));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var oe=$()({serverBaseUrl:"/api/checkpoints",safetyPeriod:ee.safetyPeriod,estimatedDiagnosisDelay:ee.estimatedDiagnosisDelay,getCheckpoints:function(){var e=window.localStorage.getItem("CHECKPOINTS")||"[]";return Promise.resolve(JSON.parse(e))},setCheckpoints:function(e){var t=window.localStorage;return Promise.resolve(t.setItem("CHECKPOINTS",JSON.stringify(e)))},getUseConfirmed:te,setUseConfirmed:ae}),ie={hostCheckpoint:oe.hostCheckpoint,joinCheckpoint:oe.joinCheckpoint,getExposureStatus:oe.getExposureStatus,reportPositive:oe.reportPositive,getUseConfirmed:te,setUseConfirmed:ae},se={mode:"home",checkpointKey:null,checkpointTime:null},ce=function(e){Object(f.a)(n,e);var t=Object(d.a)(n);function n(){var e;return Object(p.a)(this,n),(e=t.call(this)).state=se,e}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=new URLSearchParams(window.location.search).get("checkpoint");t&&(t.length===ee.checkpointKeyLength?ie.joinCheckpoint(t).then((function(t){t?e.setState({mode:"scan-success"}):e.setState({mode:"scan-error"}),window.history.replaceState(null,null,window.location.pathname)})):(this.setState({mode:"scan-error"}),window.history.replaceState(null,null,window.location.pathname)))}},{key:"reset",value:function(){var e=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState(se);case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"becomeHost",value:function(){var e=Object(m.a)(u.a.mark((function e(){var t,n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ie.hostCheckpoint();case 2:t=e.sent,n=t.key,a=t.time,this.setState({mode:"host",checkpointKey:n,checkpointTime:a});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"endHost",value:function(){var e=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.reset();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"joinCheckpoint",value:function(){var e=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({mode:"join"});case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleScan",value:function(){var e=Object(m.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=15;break}if(t.length!==ee.checkpointKeyLength){e.next=7;break}return e.next=4,ie.joinCheckpoint(t);case 4:this.setState({mode:"scan-succes"}),e.next=15;break;case 7:if(2!==(n=t.split("?checkpoint=")).length||n[1].length!==ee.checkpointKeyLength){e.next=14;break}return e.next=11,ie.joinCheckpoint(n[1]);case 11:this.setState({mode:"scan-succes"}),e.next=15;break;case 14:this.setState({mode:"scan-error"});case 15:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleScanError",value:function(){this.setState({mode:"scan-error"})}},{key:"render",value:function(){var e,t=this.state,n=t.mode,a=t.checkpointKey,o=t.checkpointTime,i="".concat(window.location.href,"?checkpoint=").concat(a);return"home"===n?e=r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{style:{marginTop:25,marginBottom:25}},"Welcome to TrackCOVID. To participate in the effort to track the spread of the SARS-COV-2 virus, please host or join a checkpoint whenever you interact with others in a way that could transmit the virus."),r.a.createElement(J.a,{onClick:this.becomeHost.bind(this),variant:"contained",color:"secondary","aria-label":"add",style:{marginTop:50}},r.a.createElement(F.a,null),"Host a Checkpoint"),r.a.createElement(J.a,{onClick:this.joinCheckpoint.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:50}},r.a.createElement(M.a,null),"Join a Checkpoint")):"host"===n?e=r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{style:{marginTop:25,marginBottom:25}},"You are now hosting a checkpoint. Others may join using the QR code below."),r.a.createElement(z.a,{value:i,size:200,style:{backgroundColor:"#fff",padding:20}}),r.a.createElement(J.a,{onClick:this.endHost.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:25}},r.a.createElement(W.a,null),"End checkpoint"),r.a.createElement(b.a,{style:{marginTop:25}},"Checkpoint created ",new Date(o).toString())):"join"===n?e=r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(X.a,{delay:300,onError:this.handleScanError.bind(this),onScan:this.handleScan.bind(this),style:{width:"100%"},facingMode:"environment"}),r.a.createElement(J.a,{onClick:this.reset.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:25}},r.a.createElement(Q.a,null),"Back")):"scan-success"===n?e=r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{style:{marginTop:25,marginBottom:25}},"You have joined the checkpoint successfully."),r.a.createElement(J.a,{onClick:this.reset.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:25}},r.a.createElement(Q.a,null),"Back")):"scan-error"===n&&(e=r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{style:{marginTop:25,marginBottom:25}},"The QR code could not be read. Please try again."),r.a.createElement(J.a,{onClick:this.reset.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:25}},r.a.createElement(Q.a,null),"Back"))),e}}]),n}(r.a.Component),le=n(149),ue=n(153),me=n(151),pe=n(152),he=n(150),de=n(70),fe=n.n(de),ye=n(77),ve=Object(ye.a)({palette:{type:"dark",primary:{main:"#ffef62"},secondary:{main:"#fbc02d"}}}),ke={exposureStatus:!1,loaded:!1,showReportConfirmation:!1,confirmcode:void 0,mode:"default"},be=function(e){Object(f.a)(n,e);var t=Object(d.a)(n);function n(){var e;return Object(p.a)(this,n),(e=t.call(this)).state=ke,e}return Object(h.a)(n,[{key:"reset",value:function(){var e=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState(ke);case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"showReportPrompt",value:function(){this.setState({mode:"report-prompt"})}},{key:"exitReportPrompt",value:function(){this.setState({mode:"default"})}},{key:"scanConfirmcode",value:function(){this.setState({mode:"scan-confirmcode"})}},{key:"handleScan",value:function(){var e=Object(m.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t&&(t.length===ee.confirmcodeLength?(this.setState({confirmcode:t}),this.reportConfirmation()):this.setState({mode:"scan-error"}));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleScanError",value:function(){this.setState({mode:"scan-error"})}},{key:"reportConfirmation",value:function(){this.setState({showReportConfirmation:!0})}},{key:"reportPositive",value:function(){var e=Object(m.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ie.reportPositive(t);case 2:this.setState({mode:"report-done",showReportConfirmation:!1});case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props,t=e.status,n=e.statusLoaded,a=this.state,o=a.mode,i=a.showReportConfirmation,s=n?t?"A possible transmission path from an infected individual to you has been discovered. You should take precautionary measures to protect yourself and others, according to the directives of the CDC  as well as local, state, and federal governments.":"No transmission paths from infected individuals to you have been discovered at this time. However, everyone is at risk and individuals should follow the directives of the CDC as well as local, state, and federal governments.":"Loading your status...",c=n?t?"elevated":"standard":"Loading...",l=t?"error":"primary";return r.a.createElement(H.a,{container:!0},"default"===o&&r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{style:{marginTop:25}},"Your risk level: ",r.a.createElement("span",{style:{color:ve.palette[l].main}},c)),r.a.createElement(b.a,{style:{marginTop:15}},s),r.a.createElement(b.a,{style:{marginTop:25}},"If you or someone you have been in close contact with have received a positive test, you may report it using the button below. This will warn those who may have been exposed of their increased risk. You will remain anonymous."),r.a.createElement(J.a,{onClick:this.showReportPrompt.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:25}},r.a.createElement(fe.a,null),"Anonymous Report"))||"report-prompt"===o&&r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{style:{marginTop:25}},"Do you have a confirmation code to scan? Scanning a confirmation code will help those that may have been exposed, by letting them know that this is a legitimate risk."),r.a.createElement(J.a,{onClick:this.scanConfirmcode.bind(this),variant:"contained",color:"secondary","aria-label":"add",style:{marginTop:50}},r.a.createElement(C.a,null),"Scan confirmation code"),r.a.createElement(J.a,{onClick:this.reportConfirmation.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:50}},"I don't have a code"))||"scan-confirmcode"===o&&r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},!i&&r.a.createElement(X.a,{delay:300,onError:this.handleScanError.bind(this),onScan:this.handleScan.bind(this),style:{width:"100%"},facingMode:"environment"}),r.a.createElement(J.a,{onClick:this.reset.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:25}},r.a.createElement(Q.a,null),"Back"))||"scan-error"===o&&r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{style:{marginTop:25,marginBottom:25}},"The QR code could not be read. Please try again."),r.a.createElement(J.a,{onClick:this.reset.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:25}},r.a.createElement(Q.a,null),"Back"))||"report-done"===o&&r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{style:{marginTop:25,marginBottom:25}},"Your positive status was reported anonymously. Those at risk will be notified. Thank you."),r.a.createElement(J.a,{onClick:this.reset.bind(this),variant:"contained",color:"primary","aria-label":"add",style:{marginTop:25}},r.a.createElement(Q.a,null),"Back")),r.a.createElement(le.a,{open:i,disableBackdropClick:!0,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},r.a.createElement(he.a,{id:"alert-dialog-title"},"Report positive status?"),r.a.createElement(me.a,null,r.a.createElement(pe.a,{id:"alert-dialog-description"},"This will notify those that may have been exposed of their increased risk. You will remain anonymous. This cannot be undone.")),r.a.createElement(ue.a,null,r.a.createElement(J.a,{onClick:this.reset.bind(this),color:"secondary"},"Never mind"),r.a.createElement(J.a,{onClick:this.reportPositive.bind(this),color:"primary",autoFocus:!0},"Report now"))))}}]),n}(r.a.Component),ge=n(72),we=n.n(ge),Ee=n(71),Ce=n.n(Ee),Se={useConfirmed:!1},je=function(e){Object(f.a)(n,e);var t=Object(d.a)(n);function n(){var e;return Object(p.a)(this,n),(e=t.call(this)).state=Se,e}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this;ie.getUseConfirmed().then((function(t){e.setState({useConfirmed:t})}))}},{key:"toggleUseConfirmed",value:function(){var e=Object(m.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.useConfirmed,this.setState({useConfirmed:!t}),ie.setUseConfirmed(!t);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){this.props.status;var e=this.state.useConfirmed;return r.a.createElement(H.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{style:{marginTop:25}},'Selecting "Use only confirmed diagnoses" will ignore possible transmission paths from unconfirmed reports.'),r.a.createElement(B.a,{component:"nav",style:{marginTop:15,width:"100%"},"aria-label":"settings"},r.a.createElement(L.a,{button:!0,onClick:this.toggleUseConfirmed.bind(this)},r.a.createElement(K.a,null,e?r.a.createElement(Ce.a,null):r.a.createElement(we.a,null)),r.a.createElement(N.a,{primary:"Use only confirmed diagnoses"}))))}}]),n}(r.a.Component),xe=n(165),Oe=function(e){Object(f.a)(n,e);var t=Object(d.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=this.props,t=e.status,n=e.onExposuresTab?"":" See the status tab.";return t?r.a.createElement(xe.a,{style:{marginTop:25,width:"100%"},severity:"error"},"Your risk level is elevated.",n):r.a.createElement("div",null)}}]),n}(r.a.Component);function Te(e){return r.a.createElement(L.a,Object.assign({button:!0,component:"a"},e))}var De=function(e){Object(f.a)(n,e);var t=Object(d.a)(n);function n(){var e;return Object(p.a)(this,n),(e=t.call(this)).state={currentTab:"checkpoints",status:!1,statusLoaded:!1,isDrawerOpen:!1},e}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=function(){var t=Object(m.a)(u.a.mark((function t(){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ie.getExposureStatus();case 2:n=t.sent,e.setState({status:n,statusLoaded:!0});case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t(),setInterval(t,3e4)}},{key:"onChangeTab",value:function(e,t){this.setState({currentTab:t})}},{key:"openDrawer",value:function(){this.setState({isDrawerOpen:!0})}},{key:"closeDrawer",value:function(){this.setState({isDrawerOpen:!1})}},{key:"render",value:function(){var e=this.state,t=e.currentTab,n=e.status,a=e.statusLoaded,o=e.isDrawerOpen,i="checkpoints"===t?ce:"status"===t?be:je;return r.a.createElement("div",null,r.a.createElement(U.a,{position:"static",color:"secondary"},r.a.createElement(y.a,{maxWidth:"sm",style:{flexGrow:1}},r.a.createElement(k.a,null,r.a.createElement(v.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:this.openDrawer.bind(this)},r.a.createElement(D.a,null)),r.a.createElement(b.a,{variant:"h6",component:"h1",style:{flexGrow:1}},"TrackCOVID (beta)")))),r.a.createElement(y.a,{maxWidth:"sm",style:{marginBottom:76}},r.a.createElement(Oe,{status:n,onExposuresTab:"status"===t}),r.a.createElement(i,{status:n,statusLoaded:a})),r.a.createElement(g.a,{value:t,style:{width:"100%",position:"fixed",bottom:0},onChange:this.onChangeTab.bind(this),showLabels:!0},r.a.createElement(w.a,{label:"Checkpoints",value:"checkpoints",icon:r.a.createElement(C.a,null)}),r.a.createElement(w.a,{label:"Status",value:"status",icon:r.a.createElement(j.a,null)}),r.a.createElement(w.a,{label:"Settings",value:"settings",icon:r.a.createElement(O.a,null)})),r.a.createElement(R.a,{open:o,onClose:this.closeDrawer.bind(this)},r.a.createElement(B.a,{component:"nav","aria-label":"settings"},r.a.createElement(Te,{style:{width:250},href:"/",target:"_blank"},r.a.createElement(K.a,null,r.a.createElement(I.a,null)),r.a.createElement(N.a,{primary:"About"})))))}}]),n}(r.a.Component);i.a.render(r.a.createElement(c.a,{theme:ve},r.a.createElement(s.a,null),r.a.createElement(De,null)),document.querySelector("#root"))},25:function(e,t){e.exports={safetyPeriod:12096e5,estimatedDiagnosisDelay:1728e5,serverBaseUrl:"/api/checkpoints",checkpointKeyLength:16,confirmcodeLength:20}},65:function(e,t,n){var a=n(7),r=n(108);e.exports=function(e){var t=e.serverBaseUrl,n=e.safetyPeriod,o=e.estimatedDiagnosisDelay,i=e.getCheckpoints,s=e.setCheckpoints,c=e.getUseConfirmed,l=e.setUseConfirmed;function u(e){return m.apply(this,arguments)}function m(){return(m=r(a.mark((function e(n){var r,o,i,s=arguments;return a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=s.length>1&&void 0!==s[1]?s[1]:"",o=s.length>2?s[2]:void 0,e.next=4,fetch("".concat(t,"/").concat(r),{method:n,headers:{Accept:"application/json","Content-Type":"application/json"},body:o?JSON.stringify(o):void 0});case 4:return i=e.sent,e.abrupt("return",i.json());case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(e){return h.apply(this,arguments)}function h(){return(h=r(a.mark((function e(t){var n,r,o,c,l;return a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i();case 2:if(n=e.sent,r=!1,!(n.length>0)){e.next=10;break}return o=n[n.length-1],e.next=8,u("POST","links/".concat(t,"/").concat(o.key));case 8:c=e.sent,r=c.error;case 10:return l={key:t,time:Date.now()},n.push(l),e.next=14,s(n);case 14:return e.abrupt("return",!r&&l);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e){return f.apply(this,arguments)}function f(){return(f=r(a.mark((function e(t){var n,r,o;return a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u("GET","".concat(t));case 2:return n=e.sent,e.next=5,c();case 5:return r=e.sent,o=r?"confirmedRiskLevel":"riskLevel",e.abrupt("return",!n.error&&"elevated"===n[o]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return(y=r(a.mark((function e(){var t;return a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u("POST");case 2:return t=e.sent.checkpoint,e.abrupt("return",p(t));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(){return(v=r(a.mark((function e(){var t,r,o;return a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i();case 2:return t=e.sent,r=t.filter((function(e){return Date.now()-e.time<=n})),e.next=6,Promise.all(r.map((function(e){return d(e.key)})));case 6:return o=e.sent,e.abrupt("return",o.some((function(e){return e})));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(){return(k=r(a.mark((function e(t){var n,r,s;return a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i();case 2:return n=e.sent,r=n.filter((function(e){return Date.now()-e.time<=o})),s=r.map((function(e){return e.key})),e.next=7,u("POST","exposures",{keys:s,confirmcode:t});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{hostCheckpoint:function(){return y.apply(this,arguments)},joinCheckpoint:function(e){return p(e)},getExposureStatus:function(){return v.apply(this,arguments)},reportPositive:function(e){return k.apply(this,arguments)},getUseConfirmed:c,setUseConfirmed:l}}},91:function(e,t,n){e.exports=n(112)}},[[91,1,2]]]);
//# sourceMappingURL=main.0fbc4ab9.chunk.js.map