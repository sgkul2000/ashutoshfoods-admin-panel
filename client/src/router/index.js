import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import jwt from 'jsonwebtoken'
import routes from './routes'
import axios from 'axios'
import store from '../store/index.js'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ( /* { store, ssrContext } */ ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (localStorage.getItem('jwt') == null || jwt.decode(localStorage.jwt) == null) {
      // console.log(true);
    } else {
      var jwtObj = jwt.decode(localStorage.jwt);
      var expiry = jwtObj.exp;
      var now = new Date();
      var validity = now.getTime() < expiry * 1000;
      axios.defaults.headers.common['Authorization'] = localStorage.jwt
      if (validity) {
        axios.get('/auth').then((res) => {
          var user = res.data.data
          localStorage.setItem('user', JSON.stringify(user))
        }).catch((error) => {
          console.error(error)
          next({
            path: '/login',
            params: {
              nextUrl: to.fullPath
            }
          })
          // Vue.$q.notify({
          //   type: 'negative',
          //   message: 'Session Timedout.',
          //   actions: {
          //     icon: 'close',
          //     color: 'white'
          //   }
          // })
        })
        var user = JSON.parse(localStorage.getItem('user'))
        // Store.dispatch('mainStore/updateAuth', user)
        store().commit('mainStore/updateAuth', user)

      }

    }
    if (to.matched.some(record => record.meta.auth)) {
      // console.log(user)
      if (localStorage.getItem('jwt') == null || jwt.decode(localStorage.jwt) == null || !validity || user.isAdmin === false) {
        next({
          path: '/login',
          params: {
            nextUrl: to.fullPath
          }
        })
      } else {
        next();
      }
    } else {
      next()
    }
  })
  return Router
}
