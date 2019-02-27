<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    sockets: {
        connect() {
            console.log('socket is connected')
        },
        disconnected() {
            console.log('disconnected')
        }
    }
}
</script>

<style>
#app {
}
</style>
