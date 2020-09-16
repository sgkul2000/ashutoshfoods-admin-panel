import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/' : 'https://ashutoshfoods.heroku-app.com';
Vue.prototype.$axios = axios
// console.log(process.env.NODE_ENV)
