webpackJsonp([1],{"+WOr":function(e,t){},QXW3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("mvHQ"),n=a.n(s),r={name:"chat",data:function(){return{percentage:0,id:null,socketStatus:0,message:"",chatList:[],logList:[{userName:13,log:"13123"}],isShowLog:!1,showNews:"",activeName:"1",userName:localStorage.userName,numberData:[{number:"18330986136\t",startPrice:"100",maxPrice:"300",unit:"长沙"},{number:"18330986136\t",startPrice:"100",maxPrice:"300",unit:"长沙"},{number:"18330986136\t",startPrice:"100",maxPrice:"300",unit:"长沙"},{number:"18330986136\t",startPrice:"100",maxPrice:"300",unit:"长沙"},{number:"18330986136\t",startPrice:"100",maxPrice:"300",unit:"长沙"},{number:"18330986136\t",startPrice:"100",maxPrice:"300",unit:"长沙"},{number:"18330986136\t",startPrice:"100",maxPrice:"300",unit:"长沙"}],currentPage:5}},sockets:{chatMessage:function(e){},message:function(e){var t=(e=JSON.parse(e)).token==localStorage.token;switch(e.type){case"chat":this.chatList.push({msg:e.msg,self:t,userName:t?"我":e.userName,time:e.createTime});break;case"getMessage":this.chatList=e.list;break;case"log":this.showNews=e.userName+": "+e.log,this.logList.push({log:e.log,self:t,userName:e.userName});break;case"getlog":this.logList=e.list}console.log("message",e)},percentage:function(e){this.percentage=JSON.parse(e).percentage},broadcast:function(e){console.log("broadcast",e)}},watch:{chatList:function(e){var t=this;this.$nextTick(function(){var e=t.$refs.chatList.children;0!=e.length&&e[e.length-1].scrollIntoView()})},logList:function(){}},mounted:function(){console.log(this.$refs.sendMessage);var e=this;document.querySelector(".el-input__inner").addEventListener("keydown",function(t){13==t.keyCode&&e.send()}),this.$socket.send(n()({type:"getMessage",limit:20,currentPage:1,userName:localStorage.userName,passWord:localStorage.passWord,unit:localStorage.unit,token:localStorage.token})),this.$socket.send(n()({type:"getlog",limit:20,currentPage:1,userName:localStorage.userName,passWord:localStorage.passWord,unit:localStorage.unit,token:localStorage.token}))},methods:{objectSpanMethod:function(e){e.row,e.column;var t=e.rowIndex;if(0===e.columnIndex)return t%2==0?{rowspan:2,colspan:1}:{rowspan:0,colspan:0}},currentChange:function(e){},handleClick:function(){},send:function(){if(""!=this.message){if(!localStorage.token)return this.$message({type:"warning",message:"请重新登陆"}),this.$router.push("/login");var e={type:"chat",userName:localStorage.userName,passWord:localStorage.passWord,unit:localStorage.unit,msg:this.message,token:localStorage.token};this.$socket.send(n()(e)),this.message=""}},setTime:function(){this.$socket.emit("percentage",n()({total:100}))}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"chat"}},[a("header",[a("div",[a("el-tabs",{attrs:{span:20},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"竞拍列表",name:"1"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"聊天室",name:"2"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"个人中心",name:"3"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"管理员",name:"4"}})],1)],1),e._v(" "),a("div",{staticClass:"showNews",on:{click:function(t){e.isShowLog=!e.isShowLog}}},[a("span",[e._v(e._s(e.showNews))]),e._v(" "),a("a",[e._v("查看日志详情")])])]),e._v(" "),a("section",{staticClass:"body",attrs:{span:12}},[a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.activeName,expression:"activeName==1"}],staticClass:"item"},[a("div",{staticClass:"numberList"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.numberData,size:"mini",height:"100%",resizable:"","row-class-name":"row",fit:!0,border:""}},[a("el-table-column",{attrs:{"label-class-name":"col",prop:"number","min-width":"100",label:"号码"}}),e._v(" "),a("el-table-column",{attrs:{"label-class-name":"col",prop:"startPrice",label:"标准价",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{"label-class-name":"col",prop:"maxPrice",label:"承诺价",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{"label-class-name":"col",prop:"unit",label:"单位"}})],1)],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{align:"center","current-page":e.currentPage,layout:"prev, pager, next",total:50},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.currentChange}})],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==e.activeName,expression:"activeName==2"}],staticClass:"item chatpage"},[a("el-scrollbar",{staticClass:"chatlist"},[a("ul",{ref:"chatList"},e._l(e.chatList,function(t,s){return a("li",{key:s,class:{left:!t.self,right:t.self}},[a("span",[a("span",[e._v(e._s(t.userName)+":")]),e._v(" "),a("span",[e._v(e._s(t.msg))])])])}),0)]),e._v(" "),a("div",{staticClass:"chatFooter"},[a("el-input",{ref:"sendMessage",staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}},[a("el-button",{attrs:{slot:"append"},on:{click:e.send},slot:"append"},[e._v("发送")])],1)],1)],1),e._v(" "),3==e.activeName?a("div",{staticClass:"item"}):e._e(),e._v(" "),4==e.activeName?a("div",{staticClass:"item"}):e._e(),e._v(" "),a("transition",{attrs:{name:"fade"}},[e.isShowLog?a("el-col",{staticClass:"logs",attrs:{span:6}},[a("span",{attrs:{id:"closeLogs"},on:{click:function(t){e.isShowLog=!1}}},[e._v("×")]),e._v(" "),a("el-scrollbar",{staticStyle:{height:"100%"}},[a("ul",{ref:"logList"},e._l(e.logList,function(t,s){return a("li",{key:s},[a("span",[a("span",[e._v(e._s(t.userName)+":")]),e._v(" "),a("span",[e._v(e._s(t.log))])])])}),0)])],1):e._e()],1)],1)])},staticRenderFns:[]};var l=a("VU/8")(r,i,!1,function(e){a("+WOr"),a("gdk9"),a("vp0p")},"data-v-74c92314",null);t.default=l.exports},gdk9:function(e,t){},vp0p:function(e,t){}});