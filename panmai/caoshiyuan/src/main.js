// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import io from './socket'
import 'element-ui/lib/theme-chalk/index.css'
import {
    Message,
    Container,
    Header,
    Main,
    Footer,
    Col,
    Form,
    FormItem,
    Input,
    Button,
    Autocomplete,
    Table,
    TableColumn
} from 'element-ui'
Vue.use(store)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Autocomplete)
Vue.use(Table)
Vue.use(TableColumn)
// import './Column)
// import './rem'
import axios from 'axios'
window.Vue = Vue
Vue.prototype.$message = Message
// import './vconsole'
// new VConsole()

Vue.use(io, '/')
Vue.config.productionTip = false
Vue.prototype.$api = axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    mounted() {
        console.log('app is ok！！！')
    },
    template: '<App/>'
})
