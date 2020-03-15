(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{218:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAZUlEQVR4AeXRMRGAQBAEwQ8IEECAy5fyQpCBCCQgo1HAchQhG191cNN+NMyfb7DgQA83A3vEMGED9BsERosLWB0JWB3JmNdI+An0r8hIAcpIrllGQs00rDgxcgAH5kesUHNp/9kFUU/w1U8vqWgAAAAASUVORK5CYII="},223:function(e,t,a){e.exports=a(409)},400:function(e,t,a){},409:function(e,t,a){"use strict";a.r(t);var n=a(24),s=a.n(n),o=a(178),c=a.n(o),i=a(160),l=a(180),r=a(181),p=a(194),d=a(182),u=a(103),h=a(195),E=a(216),m=a(202),y=a.n(m),b=a(217),g=a.n(b),A=(a(400),function(e){var t=e.mtag,a=e.message;return"SERVER"===t?s.a.createElement("li",{className:"chat you"},a):"CLIENT"===t?s.a.createElement("li",{className:"chat me"},a):"WAITING"===t?s.a.createElement("li",{className:"chat you"},"..."):void 0}),f=a(218),C=a.n(f),T=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).onClickHandler=a.onClickHandler.bind(Object(u.a)(a)),a.onClose=a.onClose.bind(Object(u.a)(a)),a.onMouseOver=a.onMouseOver.bind(Object(u.a)(a)),a.onMouseLeave=a.onMouseLeave.bind(Object(u.a)(a)),a.state={showCross:!1},a}return Object(h.a)(t,e),Object(r.a)(t,[{key:"onClickHandler",value:function(){this.props.changeTab(this.props.title)}},{key:"onMouseOver",value:function(){this.setState({showCross:!0})}},{key:"onMouseLeave",value:function(){this.setState({showCross:!1})}},{key:"onClose",value:function(){this.props.closeTab(this.props.title)}},{key:"render",value:function(){var e="";this.state.showCross&&(e="show");var t="";return this.props.isSelected&&(t="selected"),s.a.createElement("div",{className:"tab ".concat(t),onClick:this.onClickHandler,onMouseOver:this.onMouseOver,onMouseLeave:this.onMouseLeave},s.a.createElement("img",{src:C.a,alt:"close",className:"cross-icon ".concat(e),onClick:this.onClose}),this.props.title)}}]),t}(s.a.Component),v=Object(i.b)((function(e){return{selectedTab:e.selectedTab}}),(function(e){return{changeTab:function(t){e({type:"CHANGE_TAB",payload:t})},closeTab:function(t){e({type:"CLOSE_TAB",payload:t})}}}))(T),N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={messageText:""},a.editor=null,a.chatBox=s.a.createRef(),a.editorSection=s.a.createRef(),a.editorDidMount=a.editorDidMount.bind(Object(u.a)(a)),a.onChange=a.onChange.bind(Object(u.a)(a)),a.addBtnHandler=a.addBtnHandler.bind(Object(u.a)(a)),a.applyBtnHandler=a.applyBtnHandler.bind(Object(u.a)(a)),a.onMessageChangeHandler=a.onMessageChangeHandler.bind(Object(u.a)(a)),a.onKeyPressHandler=a.onKeyPressHandler.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(r.a)(t,[{key:"editorDidMount",value:function(e,t){console.log("editor mounted"),this.editor=e,e.focus()}},{key:"onChange",value:function(e,t){this.props.updateCode(e),this.editor.focus()}},{key:"componentDidUpdate",value:function(){this.chatBox.current.scrollTop=this.chatBox.current.scrollHeight}},{key:"addBtnHandler",value:function(){this.props.addNewTab()}},{key:"applyBtnHandler",value:function(){this.props.sendCode(this.props.code.main)}},{key:"onMessageChangeHandler",value:function(e){this.setState({messageText:e.target.value})}},{key:"onKeyPressHandler",value:function(e){"Enter"===e.key&&0!==this.state.messageText.length&&(this.props.sendMessage(this.state.messageText,this.props.code.main),this.setState({messageText:""}))}},{key:"getTabs",value:function(){return this.props.tabs.map((function(e){return s.a.createElement(v,{isSelected:e.selected,title:e.title,key:e.title})}))}},{key:"getChats",value:function(){return this.props.chat.map((function(e,t){return s.a.createElement(A,{mtag:e.mtag,message:e.message,key:t})}))}},{key:"render",value:function(){return s.a.createElement("div",{class:"wrapper"},s.a.createElement("div",{class:"top-bar"},s.a.createElement("span",{class:"title-text"},"AI playground")),s.a.createElement("div",{className:"row"},s.a.createElement("div",{class:"editor-section col-md-6 col-12"},s.a.createElement("div",{className:"tab-bar"},this.getTabs(),s.a.createElement("button",{class:"new-tab-btn",onClick:this.addBtnHandler},"+"),s.a.createElement("button",{class:"apply-btn ".concat(this.props.applyChange?"green":""),onClick:this.applyBtnHandler},this.props.applyBtnText)),s.a.createElement("div",{className:"editor-box",ref:this.editorSection},s.a.createElement(g.a,{className:"editor",language:"javascript",theme:"vs-dark",value:this.props.code[this.props.selectedTab],options:{selectOnLineNumbers:!0,automaticLayout:!0},onChange:this.onChange,editorDidMount:this.editorDidMount}))),s.a.createElement("div",{class:"chat-box-section col-md-6 col-12"},s.a.createElement("div",{className:"chat-box",ref:this.chatBox},s.a.createElement("ul",{className:"chat-list"},this.getChats())),s.a.createElement("input",{type:"text",class:"input-box",placeholder:"Type Message here...",onChange:this.onMessageChangeHandler,onKeyPress:this.onKeyPressHandler,value:this.state.messageText}))))}}]),t}(s.a.Component),S={reverseIt:function(e){return e.split("").reverse().join("")},CampK12:{translate:function(e,t,a){return new Promise((function(n,s){E.post("https://translate.yandex.net/api/v1.5/tr.json/translate",null,{params:{lang:"".concat(t,"-").concat(a),key:"trnsl.1.1.20200131T134450Z.40bdceadd6b715c0.6451fead3a42dc87e73bca2d45ed7a1bc15142dd",text:e}}).then((function(e){n(e.data.text[0])})).catch((function(e){s(e)}))}))}}},B=Object(i.b)((function(e){return{chat:e.chat,tabs:e.tabs,selectedTab:e.selectedTab,code:e.code,applyChange:e.applyChange,applyBtnText:e.applyBtnText}}),(function(e){return{updateCode:function(t){e({type:"UPDATE_CODE",payload:t}),e({type:"CHANGE_APPLY_BTN_TEXT",payload:"Apply change"})},addNewTab:function(){e({type:"ADD_NEW_TAB"})},sendMessage:function(t,a){e((function(e){e({type:"SEND_MESSAGE",payload:{mtag:"CLIENT",message:t}}),e({type:"SEND_MESSAGE",payload:{mtag:"WAITING"}});var n=a;n="("+n+')("'.concat(t,'")');try{y()(n,S).then((function(t){e({type:"SEND_MESSAGE",payload:{mtag:"SERVER",message:t}})})).catch((function(t){e({type:"SEND_MESSAGE",payload:{mtag:"SERVER",message:"Error executing the code"}})}))}catch(s){e({type:"SEND_MESSAGE",payload:{mtag:"SERVER",message:"Error executing the code"}})}}))},sendCode:function(t){e((function(e){e({type:"APPLY_CAHNGE"}),e({type:"CHANGE_APPLY_BTN_TEXT",payload:"Applying"});try{var a=t;a="("+a+')("Test")',y()(a,S),e({type:"CHANGE_APPLIED"}),e({type:"CHANGE_APPLY_BTN_TEXT",payload:"Change Applied"})}catch(n){e({type:"CHANGE_APPLIED"}),e({type:"CHANGE_APPLY_BTN_TEXT",payload:"Error"})}}))}}}))(N),H=a(106),O=a(219),_=a.n(O),k=a(176),M=a(221),x=Object(M.a)({chat:[{mtag:"SERVER",message:"Hi, I am a chatbot"}],tabs:[{title:"main",selected:!0}],selectedTab:"main",code:{main:"\nasync function respond(inputText) {\n\treturn inputText;\n}\n\t\t"},tabIncrementer:0,applyChange:!1,applyBtnText:"Apply Change"},{TESTING:function(e,t){console.log("testing")},CHANGE_TAB:function(e,t){var a=e.selectedTab;e.tabs.forEach((function(n,s){n.title===a&&(e.tabs[s].selected=!1),n.title===t.payload&&(e.tabs[s].selected=!0,e.selectedTab=t.payload)}))},ADD_NEW_TAB:function(e,t){var a="file".concat(e.tabIncrementer+1);e.tabs.push({title:a,selected:!1}),e.code[a]="// start editing this file",e.tabIncrementer+=1},UPDATE_CODE:function(e,t){e.code[e.selectedTab]=t.payload},CLOSE_TAB:function(e,t){"main"!==t.payload&&(e.tabs.forEach((function(a,n){a.title===t.payload&&e.tabs.splice(n,1)})),e.selectedTab="main")},SEND_MESSAGE:function(e,t){"CLIENT"===t.payload.mtag?e.chat.push({mtag:"CLIENT",message:t.payload.message}):"WAITING"===t.payload.mtag?e.chat.push({mtag:"WAITING",message:""}):(e.chat.pop(),e.chat.push({mtag:"SERVER",message:t.payload.message}))},APPLY_CAHNGE:function(e,t){e.applyChange=!0},CHANGE_APPLY_BTN_TEXT:function(e,t){e.applyBtnText=t.payload},CHANGE_APPLIED:function(e,t){e.applyChange=!1}}),I=Object(H.createStore)(x,Object(H.applyMiddleware)(k.a,_.a));c.a.render(s.a.createElement(i.a,{store:I},s.a.createElement(B,null)),document.getElementById("root"))}},[[223,2,3]]]);
//# sourceMappingURL=main.19e76007.chunk.js.map