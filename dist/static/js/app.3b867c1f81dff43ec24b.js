webpackJsonp([4],{0:function(n,e){},"0C+P":function(n,e){},"1lyo":function(n,e){},"2s6i":function(n,e){},"2vMq":function(n,e){},"3kSW":function(n,e){},"8Fkr":function(n,e){},D0OI:function(n,e){},Hdop:function(n,e){},LKo1:function(n,e){},NHnr:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t("0C+P"),t("D0OI");var o=t("WS1o"),i=t.n(o),u=(t("3kSW"),t("whEb")),a=t.n(u),c=(t("cG9A"),t("3lLp")),s=t.n(c),f=(t("1lyo"),t("gdj+")),l=t.n(f),r=(t("Xdvi"),t("rzfL")),d=t.n(r),p=(t("LKo1"),t("S0vK")),h=t.n(p),v=(t("Y3aQ"),t("IIdm")),m=t.n(v),g=(t("P9OS"),t("YyT7")),k=t.n(g),y=(t("2vMq"),t("Jyxf")),S=t.n(y),b=(t("Hdop"),t("VA4b")),E=t.n(b),$=(t("TbA8"),t("EhKy")),w=t.n($),x=(t("RgnK"),t("AO/k")),L=t.n(x),O=(t("2s6i"),t("qn/O")),A=t.n(O),C=(t("UoY8"),t("AqqK")),K=t.n(C),T=t("83B7"),_=t("3cXf"),j=t.n(_),z={name:"App",sockets:{connect:function(n){localStorage.token?this.$socket.send(j()({type:"login",token:localStorage.token})):this.$router.push("/login"),console.log("socket is connected",n)},login:function(n){console.log("login",n),"login"==(n=JSON.parse(n)).type?this.$router.push("/chat"):this.$router.push("/login")},disconnected:function(){console.log("disconnected")},reconnect:function(){console.log("disconnected")}}},H={render:function(){var n=this.$createElement,e=this._self._c||n;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var M=t("C7Lr")(z,H,!1,function(n){t("n2yn")},null,null).exports,R=t("KGCO");T.default.use(R.a);var q=new R.a({mode:"hash",routes:[{path:"/",name:"index",component:function(n){return t.e(2).then(function(){var e=[t("dAjm")];n.apply(null,e)}.bind(this)).catch(t.oe)},children:[{path:"/login",name:"login",component:function(n){return t.e(0).then(function(){var e=[t("K31e")];n.apply(null,e)}.bind(this)).catch(t.oe)}},{path:"/chat",name:"index",component:function(n){return t.e(1).then(function(){var e=[t("QXW3")];n.apply(null,e)}.bind(this)).catch(t.oe)}}]}]});q.beforeEach(function(n,e,t){t()});var P=q,Y=t("R4Sj");T.default.use(Y.a);var D=new Y.a.Store({state:{socketStatus:0,status:0},mutations:{changeSocketStatus:function(n,e){n.socketStatus=e},changeStatus:function(n,e){n.status=e}}}),I=t("ZLEe"),W=t.n(I),X=t("hRKE"),F=t.n(X),G=t("a7o1"),J=t.n(G),N={install:function(n,e,t){var o=void 0;o=null!=e&&"object"===(void 0===e?"undefined":F()(e))?e:J()(e||"",t),n.prototype.$socket=o;n.mixin({beforeCreate:function(){var n=this;if(this.$options.sockets){var e=this.$options.sockets,t=e.prefix||"";W()(e).forEach(function(o){var i=e[o].bind(n);n.$socket.on(t+o,i),e[o].__binded=i})}},beforeDestroy:function(){var n=this;if(this.$options.sockets){var e=this.$options.sockets,t=e.prefix||"";W()(e).forEach(function(o){n.$socket.off(t+o,e[o].__binded)})}}})}},Q=(t("8Fkr"),t("cOjx"),t("aozt")),B=t.n(Q);T.default.use(D),T.default.use(K.a),T.default.use(A.a),T.default.use(L.a),T.default.use(w.a),T.default.use(E.a),T.default.use(S.a),T.default.use(k.a),T.default.use(m.a),T.default.use(h.a),T.default.use(d.a),T.default.use(l.a),T.default.use(s.a),T.default.use(a.a),window.Vue=T.default,T.default.prototype.$message=i.a,T.default.use(N,"/"),T.default.config.productionTip=!1,T.default.prototype.$api=B.a,new T.default({el:"#app",router:P,store:D,components:{App:M},mounted:function(){console.log("app is ok！！！")},template:"<App/>"})},P9OS:function(n,e){},RgnK:function(n,e){},TbA8:function(n,e){},UoY8:function(n,e){},Xdvi:function(n,e){},Y3aQ:function(n,e){},cG9A:function(n,e){},cOjx:function(n,e){!function(n,e){var t,o=document,i=window,u=o.documentElement,a=document.createElement("style");function c(){var t=u.getBoundingClientRect().width;t>(e=e||540)&&(t=e);var o=100*t/n;a.innerHTML="html{font-size:"+o+"px;}"}if(u.firstElementChild)u.firstElementChild.appendChild(a);else{var s=o.createElement("div");s.appendChild(a),o.write(s.innerHTML),s=null}c(),i.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(c,300)},!1),i.addEventListener("pageshow",function(n){n.persisted&&(clearTimeout(t),t=setTimeout(c,300))},!1),"complete"===o.readyState?o.body.style.fontSize="16px":o.addEventListener("DOMContentLoaded",function(n){o.body.style.fontSize="16px"},!1)}(750,750)},n2yn:function(n,e){}},["NHnr"]);