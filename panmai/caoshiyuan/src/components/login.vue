<template>
  <div class="login">
    <button @click="send">asdasd</button>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            id: null,
            msg: 'Welcome to Your Vue.js App'
        }
    },
    sockets: {
        connect() {
            console.log('connected', this.$socket.id)
            this.id = this.$socket.id
        },
        disconnect() {
            console.error('disconnect')
        },
        reconnect() {
            console.log('reconnect')
        },
        message(data) {
            console.log('message', data)
        }
    },
    methods: {
        send() {
            console.log(this.$sockets)
            this.$socket.send('asdasd')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
