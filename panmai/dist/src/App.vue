<template>
  <div id="app">asdasdasdsdasd</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    sockets: {
        connect(data) {
            console.log('socket connected')
            // this.id = this.$socket.id
            // this.$socket.emit('login', 'loginId') //监听connect事件
        },
        message(data) {
            //监听message事件，方法是后台定义和提供的

            console.log(data)
        }
    }
}
</script>

<style lang="scss">
</style>
