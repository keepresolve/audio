import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'login',
            component: resolve => require(['@/components/login.vue'], resolve),
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: resolve =>
                        require(['@/components/index.vue'], resolve)
                }
            ]
        }
    ]
})
