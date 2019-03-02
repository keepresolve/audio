<template>
  <div class="index">
    <!-- <div class="status" :style="{background:socketStatus?'blue':'red'}"></div>
    <el-progress type="circle" :percentage="percentage" status="exception"></el-progress>
    <button @click="setTime">asads</button>-->
  </div>
</template>
<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            percentage: 0,
            id: null,
            socketStatus: 0
        }
    },
    sockets: {
        connect() {
            this.socketStatus = 1
            console.log('connected', this.$socket.id)
            this.id = this.$socket.id
        },
        disconnect() {
            this.socketStatus = 0
            console.error('disconnect')
        },
        reconnect() {
            this.socketStatus = 1
            console.log('reconnect')
        },
        message(data) {
            console.log('message', data)
        },
        percentage(data) {
            this.percentage = JSON.parse(data).percentage
        },
        broadcast(data) {
            console.log('broadcast', data)
        }
    },
    methods: {
        send() {
            console.log(this)
            // this.$socket.send('asdasd')
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

<style scoped>
.status {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
</style>
