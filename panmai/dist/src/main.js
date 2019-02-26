import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

Vue.use(VueSocketio, socketio('http://localhost:3000'), store)
new Vue({
    el: '#app',
    render: h => h(App)
})
