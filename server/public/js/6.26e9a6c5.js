(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"04f2":function(t,i,e){"use strict";var a=e("2a77"),s=e.n(a);s.a},"2a77":function(t,i,e){},c6f7:function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"loginMain"},[e("h4",[t._v("Ashutosh Foods")]),e("h6",[t._v("Admin Panel")]),e("div",{staticClass:"inputWrapper"},[e("q-input",{attrs:{label:"Enter email",dense:!0,type:"email",disable:t.loading,error:t.isEmailValid,"error-message":"Email Invalid"},scopedSlots:t._u([{key:"prepend",fn:function(){return[e("q-icon",{attrs:{name:"account_circle"}})]},proxy:!0}]),model:{value:t.email,callback:function(i){t.email=i},expression:"email"}}),e("q-input",{attrs:{label:"Enter password",dense:!0,type:t.isPwd?"password":"text",disable:t.loading,rules:[function(t){return!!t||"Password Required"}]},on:{keydown:function(i){return!i.type.indexOf("key")&&t._k(i.keyCode,"enter",13,i.key,"Enter")?null:t.validateForm()}},scopedSlots:t._u([{key:"prepend",fn:function(){return[e("q-icon",{attrs:{name:"vpn_key"}})]},proxy:!0},{key:"append",fn:function(){return[e("q-icon",{staticClass:"cursor-pointer",attrs:{name:t.isPwd?"visibility_off":"visibility"},on:{click:function(i){t.isPwd=!t.isPwd}}})]},proxy:!0}]),model:{value:t.password,callback:function(i){t.password=i},expression:"password"}}),e("q-btn",{staticClass:"full-width",attrs:{disable:t.loading,id:"loginSubmit",color:"primary",label:"Login",padding:"20px auto"},on:{click:function(i){return t.validateForm()}}}),e("q-btn",{staticClass:"full-width",attrs:{flat:"",disable:t.loading,id:"loginSubmit",color:"primary",label:"Forgot Password",padding:"20px auto"}})],1)])},s=[],n={name:"login",data(){return{email:"",password:"",isPwd:!0,loading:!1,delay:0,isEmailValid:!1}},watch:{email(t){this.isEmailValid=!1}},methods:{login(){this.loading=!0,this.$q.loadingBar.start(),this.$axios.post("/auth/login",{email:this.email,password:this.password}).then(t=>{var i=t.data;if(console.log(i),!i.auth)throw"Login unsuccessful";localStorage.setItem("user",JSON.stringify(i.user)),localStorage.setItem("jwt",i.token),this.$store.commit("mainStore/updateAuth",i.user),this.$router.push({name:"Home"}),this.$q.notify({type:"positive",message:"Welcome "+i.user.username})}).catch(t=>{console.error(t),this.$q.notify({message:"Login unsuccessful, please try again.",type:"negative",actions:[{icon:"close",color:"white"}]})}),this.$q.loadingBar.stop(),this.loading=!1},validateForm(){const t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;t.test(String(this.email).toLowerCase())&&""!==this.password?this.login():this.isEmailValid=!0}}},o=n,l=(e("04f2"),e("2877")),r=e("27f9"),d=e("0016"),c=e("9c40"),u=e("eebe"),p=e.n(u),m=Object(l["a"])(o,a,s,!1,null,"766138be",null);i["default"]=m.exports;p()(m,"components",{QInput:r["a"],QIcon:d["a"],QBtn:c["a"]})}}]);