/*
 * 邱朗，基于https://github.com/icebob/vue-websocket 做一个简单的封装,但去掉它关于namespace的处理
 * 之前采用的 https://github.com/MetinSeylan/Vue-Socket.io 有bug而且太复杂
 */
import IO from 'socket.io-client'

export default {
    install(Vue, connection, opts) {
        let socket
        //console.log('install:'+connection)
        if (connection != null && typeof connection === 'object') {
            socket = connection
        } else {
            socket = IO(connection || '', opts)
        }

        Vue.prototype.$socket = socket

        let addListeners = function() {
            if (this.$options['sockets']) {
                //console.log('bind begin')
                let conf = this.$options.sockets
                // 我们没用prefix,但暂时保留
                let prefix = conf.prefix || ''
                Object.keys(conf).forEach(key => {
                    //console.log('bind event:' + key)
                    // 不然在socket.io 的on回调函数里，this是socket.io
                    // https://stackoverflow.com/questions/43232853/passing-socket-io-data-to-vuejs
                    let func = conf[key].bind(this)
                    this.$socket.on(prefix + key, func)
                    // https://stackoverflow.com/questions/6547293/why-some-attribute-names-start-with-double-underscore-in-javascript
                    //同一个事件多次监听,因为是在不同的vue，测试看不会相互冲掉
                    conf[key].__binded = func
                })
                //console.log('bind end')
            }
        }

        let removeListeners = function() {
            if (this.$options['sockets']) {
                let conf = this.$options.sockets
                let prefix = conf.prefix || ''
                Object.keys(conf).forEach(key => {
                    this.$socket.off(prefix + key, conf[key].__binded)
                })
            }
        }

        Vue.mixin({
            // Vue v2.x
            beforeCreate: addListeners,
            beforeDestroy: removeListeners
        })
    }
}
