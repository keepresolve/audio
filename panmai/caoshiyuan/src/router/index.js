import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve => require(['@/components/index.vue'], resolve),
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: resolve =>
                        require(['@/components/login.vue'], resolve)
                },
                {
                    path: '/chat',
                    name: 'index',
                    component: resolve =>
                        require(['@/components/chat.vue'], resolve)
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    // if (to.fullPath === '/login') {
    //     next()
    // }else{
    //    if(localStorage.token) this.
    // }

    // if (!to.query.url && from.query.url) {
    //     to.query.url = from.query.url
    // }
    next()
})

export default router
