(function(e){function t(t){for(var r,o,i=t[0],l=t[1],c=t[2],s=0,f=[];s<i.length;s++)o=i[s],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);d&&d(t);while(f.length)f.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(u.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},o={1:0},a={1:0},u=[];function i(e){return l.p+"js/"+({}[e]||e)+"."+{2:"44a71656",3:"14ef01b9",4:"2a8e037c",5:"a0bfa2af",6:"26e9a6c5",7:"82f1e7ae",8:"44c0c89e",9:"4fccb651"}[e]+".js"}function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={2:1,3:1,4:1,5:1,6:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{2:"c7e4df81",3:"2427d758",4:"a70494ed",5:"e66c284c",6:"e7d185de",7:"31d6cfe0",8:"31d6cfe0",9:"31d6cfe0"}[e]+".css",a=l.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var c=u[i],s=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(s===r||s===a))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){c=f[i],s=c.getAttribute("data-href");if(s===r||s===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],d.parentNode.removeChild(d),n(u)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=u);var c,s=document.createElement("script");s.charset="utf-8",s.timeout=120,l.nc&&s.setAttribute("nonce",l.nc),s.src=i(e);var f=new Error;c=function(t){s.onerror=s.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:s})}),12e4);s.onerror=s.onload=c,document.head.appendChild(s)}return Promise.all(t)},l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var f=0;f<c.length;f++)t(c[f]);var d=s;u.push([0,0]),n()})({0:function(e,t,n){e.exports=n("2f39")},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},2:function(e,t){},"2f39":function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"getAuth",(function(){return O})),n.d(r,"getUsername",(function(){return x}));var o={};n.r(o),n.d(o,"updateAuth",(function(){return A}));var a={};n.r(a),n.d(a,"updateAuth",(function(){return E}));n("5319");var u=n("c973"),i=n.n(u),l=(n("7d6e"),n("e54f"),n("985d"),n("31cd"),n("2b0e")),c=n("1f91"),s=n("42d2"),f=n("b05d"),d=n("1b3f"),p=n("2a19"),h=n("f508");l["a"].use(f["a"],{config:{loadingBar:{position:"top",size:"3px",color:"error"},notify:{position:"top",group:!0,progress:!0,timeout:3e3},loading:{delay:0}},lang:c["a"],iconSet:s["a"],plugins:{LoadingBar:d["a"],Notify:p["a"],Loading:h["a"]}});var m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},g=[],v={name:"App"},b=v,y=n("2877"),w=Object(y["a"])(b,m,g,!1,null,null,null),P=w.exports,S=n("2f62"),j=function(){return{auth:{isLogged:null,user:null}}};function O(e){return e.auth}function x(e){return e.auth.user.username}function A(e,t){e.auth.user=t,e.auth.isLogged=!0}function E({commit:e},t){e("updateAuth",t)}var L={namespaced:!0,getters:r,mutations:o,actions:a,state:j};l["a"].use(S["a"]);var _=function(){const e=new S["a"].Store({modules:{mainStore:L},strict:!1});return e},C=n("8c4f"),T=n("14b7"),k=n.n(T);n("e6cf");const N=[{path:"/",component:()=>Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"713b")),meta:{auth:!0},children:[{path:"",name:"Home",component:()=>Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"8b24"))},{path:"orders",name:"Orders",component:()=>Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"0b35"))},{path:"orders/:id",name:"Order",component:()=>Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"2ab2"))},{path:"completed",name:"Completed",component:()=>Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"2890"))},{path:"products",name:"Products",component:()=>Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"6eb0"))}]},{name:"Login",path:"/login",meta:{guest:!0},component:()=>Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"c6f7"))},{meta:{guest:!0},path:"*",component:()=>Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"e51e"))}];var B=N,q=n("bc3a"),I=n.n(q);l["a"].use(C["a"]);var U=function(){const e=new C["a"]({scrollBehavior:()=>({x:0,y:0}),routes:B,mode:"history",base:"/"});return e.beforeEach((e,t,n)=>{if(null==localStorage.getItem("jwt")||null==k.a.decode(localStorage.jwt));else{var r=k.a.decode(localStorage.jwt),o=r.exp,a=new Date,u=a.getTime()<1e3*o;if(I.a.defaults.headers.common["Authorization"]=localStorage.jwt,u){console.log("requesting here"),I.a.get("/auth").then(e=>{var t=e.data.data;localStorage.setItem("user",JSON.stringify(t))}).catch(t=>{console.error(t),n({path:"/login",params:{nextUrl:e.fullPath}})});var i=JSON.parse(localStorage.getItem("user"));_().commit("mainStore/updateAuth",i)}}e.matched.some(e=>e.meta.auth)?null!=localStorage.getItem("jwt")&&null!=k.a.decode(localStorage.jwt)&&u&&!1!==i.isAdmin?n():n({path:"/login",params:{nextUrl:e.fullPath}}):n()}),e},J=function(){return M.apply(this,arguments)};function M(){return M=i()((function*(){const e="function"===typeof _?yield _({Vue:l["a"]}):_,t="function"===typeof U?yield U({Vue:l["a"],store:e}):U;e.$router=t;const n={router:t,store:e,render:e=>e(P),el:"#q-app"};return{app:n,store:e,router:t}})),M.apply(this,arguments)}I.a.defaults.headers.common["Content-Type"]="application/json",I.a.defaults.baseURL="https://ashutoshfoods.heroku-app.com",l["a"].prototype.$axios=I.a;const D="/";function V(){return $.apply(this,arguments)}function $(){return $=i()((function*(){const{app:e,store:t,router:n}=yield J();let r=!1;const o=e=>{r=!0;const t=Object(e)===e?n.resolve(e).route.fullPath:e;window.location.href=t},a=window.location.href.replace(window.location.origin,""),u=[void 0];for(let c=0;!1===r&&c<u.length;c++)if("function"===typeof u[c])try{yield u[c]({app:e,router:n,store:t,Vue:l["a"],ssrContext:null,redirect:o,urlPath:a,publicPath:D})}catch(i){return i&&i.url?void(window.location.href=i.url):void console.error("[Quasar] boot error:",i)}!0!==r&&new l["a"](e)})),$.apply(this,arguments)}V()},3:function(e,t){},"31cd":function(e,t,n){},4:function(e,t){},5:function(e,t){},6:function(e,t){},7:function(e,t){},8:function(e,t){},9:function(e,t){}});