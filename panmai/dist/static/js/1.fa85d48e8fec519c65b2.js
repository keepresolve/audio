webpackJsonp([1],{"2XLm":function(e,t){},"7GPg":function(e,t){},QXW3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("mvHQ"),n=a.n(s),i={name:"chat",data:function(){return{percentage:0,id:null,socketStatus:0,message:"",chatList:[],logList:[{userName:13,log:"13123"}],isShowLog:!1,showNews:"",activeName:"1",userName:localStorage.userName,numberData:[{id:0,number:"18330986137",startPrice:"100",maxPrice:"300",unit:"长沙aaaaaaaaaaaaaaaaaaaaaa"}],AllnumberData:{},selectData:[],total:0,currentPage:1,timer:null,number:"",startPrice:0,dialogVisible:!1,dialog:0}},sockets:{chatMessage:function(e){},message:function(e){var t=(e=JSON.parse(e)).token==localStorage.token;switch(e.type){case"chat":this.chatList.push({msg:e.msg,self:t,userName:t?"我":e.userName,time:e.createTime});break;case"getMessage":this.chatList=e.list;break;case"log":this.showNews=e.userName+": "+e.log,this.logList.push({log:e.log,self:t,userName:e.userName});break;case"getlog":this.logList=e.list}console.log("message",e)},percentage:function(e){this.percentage=JSON.parse(e).percentage},broadcast:function(e){console.log("broadcast",e)}},watch:{chatList:function(e){var t=this;this.$nextTick(function(){t.scrollTop(!0)})},logList:function(){}},mounted:function(){console.log(this.$refs.sendMessage);var e=this;document.querySelector(".el-input__inner").addEventListener("keydown",function(t){13==t.keyCode&&e.send()}),this.$socket.send(n()({type:"getMessage",limit:20,currentPage:1,userName:localStorage.userName,passWord:localStorage.passWord,unit:localStorage.unit,token:localStorage.token})),this.$socket.send(n()({type:"getlog",limit:20,currentPage:1,userName:localStorage.userName,passWord:localStorage.passWord,unit:localStorage.unit,token:localStorage.token})),this.getList(1)},methods:{edit:function(){},add:function(){var e=this,t={type:"0",number:this.number,startPrice:this.startPrice,status:0};this.$api.post("/number",t).then(function(t){0==t.data.status&&e.getList(1),e.dialogVisible=!1}).catch(function(t){t&&(e.dialogVisible=!1)})},getList:function(e){var t=this,a={type:e,currentPage:this.currentPage,limit:20,status:"0"};this.$api.get("/number",{params:a}).then(function(a){0==a.data.status&&(1!=e&&4!=e||(t.numberData=a.data.data.rows,t.AllnumberData=a.data.data.rows))})},remove:function(e){var t=this;this.$api.post("/number",{id:e,type:"9"}).then(function(e){0==e.data.status&&t.getList(1)})},handleSelectionChange:function(e){this.selectData=e},scrollTop:function(e){var t=this.$refs.chatList.children;0!=t.length&&(e?t[t.length-1].scrollIntoView():(clearTimeout(this.timer),this.timer=setTimeout(function(){t[t.length-1].scrollIntoView()},300)))},objectSpanMethod:function(e){e.row,e.column;var t=e.rowIndex;if(0===e.columnIndex)return t%2==0?{rowspan:2,colspan:1}:{rowspan:0,colspan:0}},currentChange:function(e){},handleClick:function(e){switch(e){case"1":this.number,this.startPrice;this.getList(e,paramms)}},send:function(){if(""!=this.message){if(!localStorage.token)return this.$message({type:"warning",message:"请重新登陆"}),this.$router.push("/login");var e={type:"chat",userName:localStorage.userName,passWord:localStorage.passWord,unit:localStorage.unit,msg:this.message,token:localStorage.token};this.$socket.send(n()(e)),this.message=""}},setTime:function(){this.$socket.emit("percentage",n()({total:100}))}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"chat"}},[a("header",[a("div",[a("el-tabs",{attrs:{span:20},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"竞拍列表",name:"1"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"聊天室",name:"2"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"个人中心",name:"3"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"管理员",name:"4"}})],1)],1),e._v(" "),a("div",{staticClass:"showNews",on:{click:function(t){e.isShowLog=!e.isShowLog}}},[a("span",[e._v(e._s(e.showNews))]),e._v(" "),a("a",[e._v("查看日志详情")])])]),e._v(" "),a("section",{staticClass:"body",attrs:{span:12}},[a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.activeName,expression:"activeName==1"}],staticClass:"item"},[a("div",{staticClass:"numberList"},[a("el-table",{attrs:{data:e.numberData,size:"mini",width:"100%",height:"100%",resizable:"","row-class-name":"row",border:""}},[a("el-table-column",{attrs:{"label-class-name":"col",prop:"number","min-width":"100",label:"号码"}}),e._v(" "),a("el-table-column",{attrs:{"label-class-name":"col",prop:"startPrice",label:"标准价",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{"label-class-name":"col",prop:"maxPrice",label:"承诺价",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{"label-class-name":"col",prop:"unit",label:"单位"}})],1)],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{align:"center","current-page":e.currentPage,layout:"prev, pager, next",total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.currentChange}})],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==e.activeName,expression:"activeName==2"}],staticClass:"item chatpage"},[a("el-scrollbar",{staticClass:"chatlist"},[a("ul",{ref:"chatList"},e._l(e.chatList,function(t,s){return a("li",{key:s,class:{left:!t.self,right:t.self}},[a("span",[a("span",[e._v(e._s(t.userName)+":")]),e._v(" "),a("span",[e._v(e._s(t.msg))])])])}),0)]),e._v(" "),a("div",{staticClass:"chatFooter"},[a("el-input",{ref:"sendMessage",staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},on:{focus:e.scrollTop},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}},[a("el-button",{attrs:{slot:"append"},on:{click:e.send},slot:"append"},[e._v("发送")])],1)],1)],1),e._v(" "),3==e.activeName?a("div",{staticClass:"item"}):e._e(),e._v(" "),4==e.activeName?a("div",{staticClass:"item"},[a("div",{staticClass:"numberList"},[a("el-table",{ref:"multipleTable",attrs:{size:"mini",width:"100%",height:"100%",resizable:"","row-class-name":"row",border:"",data:e.AllnumberData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection"}}),e._v(" "),a("el-table-column",{attrs:{label:"号码"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.number))]}}],null,!1,3616061022)}),e._v(" "),a("el-table-column",{attrs:{prop:"startPrice",label:"标准价"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.edit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.remove(t.row.id)}}},[e._v("删除")])]}}],null,!1,2355943213)})],1)],1),e._v(" "),a("div",[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.dialog=0,e.dialogVisible=!0}}},[e._v("添加")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.remove(e.selectData.map(function(e){return e.id}).join(","))}}},[e._v("批量删除")])],1)]):e._e(),e._v(" "),a("transition",{attrs:{name:"fade"}},[e.isShowLog?a("el-col",{staticClass:"logs",attrs:{span:6}},[a("span",{attrs:{id:"closeLogs"},on:{click:function(t){e.isShowLog=!1}}},[e._v("×")]),e._v(" "),a("el-scrollbar",{staticStyle:{height:"100%"}},[a("ul",{ref:"logList"},e._l(e.logList,function(t,s){return a("li",{key:s},[a("span",[a("span",[e._v(e._s(t.userName)+":")]),e._v(" "),a("span",[e._v(e._s(t.log))])])])}),0)])],1):e._e()],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"80%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{attrs:{placeholder:"手机号"},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"起拍价"}},[a("el-input",{attrs:{type:"number",placeholder:"手机号"},model:{value:e.startPrice,callback:function(t){e.startPrice=t},expression:"startPrice"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),0==e.dialog?a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[e._v("确 定")]):e._e()],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(i,l,!1,function(e){a("7GPg"),a("2XLm"),a("cP0a")},"data-v-51667b6c",null);t.default=o.exports},cP0a:function(e,t){}});