// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './rem'
import axios from 'axios'
window.Vue = Vue
Vue.use(ElementUI)
import VueSocketio from 'vue-socket.io'
Vue.use(new VueSocketio({ debug: true, connection: 'http://localhost:8000' }))

Vue.config.productionTip = false
Vue.prototype.$api = axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    mounted() {
        console.log('app is ok！！！')
    },
    template: '<App/>'
})
