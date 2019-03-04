<template>
  <div class="login">
    <el-progress type="circle" :percentage="percentage">剩余时长</el-progress>
    <button @click="setTime">开始</button>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            percentage: 0,
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
        },
        percentage(data) {
            this.percentage = JSON.parse(data).percentage
        }
    },
    methods: {
        send() {
            console.log(this.$sockets)
            this.$socket.send('asdasd')
        },
        setTime() {
            this.$socket.emit(
                'percentage',
                JSON.stringify({
                    total: 100
                })
            )
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
