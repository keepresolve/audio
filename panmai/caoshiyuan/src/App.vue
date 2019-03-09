<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    sockets: {
        connect(data) {
            if (localStorage.token) {
                this.$socket.send(
                    JSON.stringify({ type: 'login', token: localStorage.token })
                )
            } else {
                this.$router.push('/login')
            }

            console.log('socket is connected', data)
        },
        login(data) {
            console.log('login', data)
            data = JSON.parse(data)
            let type = data.type
            if (type == 'login') {
                this.$router.push('/chat')
            } else {
                this.$router.push('/login')
            }
        },
        disconnected() {
            console.log('disconnected')
        },
        reconnect() {
            console.log('disconnected')
        }
    }
}
</script>

<style>
* {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
    list-style: none;
}
#app,
html,
body {
    height: 100%;
    background-color: #f8f8f8;
}
</style>
