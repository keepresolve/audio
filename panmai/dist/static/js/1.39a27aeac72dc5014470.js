webpackJsonp([1],{"3cXf":function(e,s,t){e.exports={default:t("NUnD"),__esModule:!0}},NUnD:function(e,s,t){var n=t("/KQr"),a=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}},ZMxw:function(e,s){},dAjm:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=t("3cXf"),a=t.n(n),o={name:"HelloWorld",data:function(){return{percentage:0,id:null,socketStatus:0,meesage:"",chatList:[{msg:"山东省",self:!1,userName:"全是"},{msg:"山东省",self:!0,userName:"全是"}]}},sockets:{connect:function(){this.socketStatus=1,console.log("connected",this.$socket.id),this.id=this.$socket.id},disconnect:function(){this.socketStatus=0,console.error("disconnect")},reconnect:function(){this.socketStatus=1,console.log("reconnect")},chatMessage:function(e){var s=(e=JSON.parse(e)).userName==sessionStorage.userName;switch(e.type){case"login":this.chatList.push({msg:"已加入",self:!1,userName:e.userName});break;default:this.chatList.push({msg:e.msg,self:s,userName:s?"自己":e.userName})}},message:function(e){console.log("message",e)},percentage:function(e){this.percentage=JSON.parse(e).percentage},broadcast:function(e){console.log("broadcast",e)}},methods:{send:function(){if(""!=this.meesage){if(!sessionStorage.token)return this.$message({type:"warning",message:"请重新登陆"}),this.$router.push("/");var e={userName:sessionStorage.userName,msg:this.meesage,token:sessionStorage.token};this.$socket.send(a()(e)),this.meesage=""}},setTime:function(){this.$socket.emit("percentage",a()({total:100}))}}},c={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("el-container",{staticClass:"index"},[t("el-header",{staticClass:"header"},[e._v("拍卖室")]),e._v(" "),t("el-main",{staticClass:"main"},[t("ul",e._l(e.chatList,function(s,n){return t("li",{key:n,class:{left:!s.self,right:s.self}},[t("span",[t("span",[e._v(e._s(s.userName)+":")]),e._v(" "),t("span",[e._v(e._s(s.msg))])])])}),0)]),e._v(" "),t("el-footer",{staticClass:"footer"},[t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:e.meesage,callback:function(s){e.meesage=s},expression:"meesage"}},[t("el-button",{attrs:{slot:"append"},on:{click:e.send},slot:"append"},[e._v("发送")])],1)],1)],1)},staticRenderFns:[]};var i=t("C7Lr")(o,c,!1,function(e){t("ZMxw")},"data-v-4ae8c6c0",null);s.default=i.exports}});
//# sourceMappingURL=1.39a27aeac72dc5014470.js.map