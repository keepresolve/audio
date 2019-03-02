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
* {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
}
#app,
html,
body {
    height: 100%;
}
</style>
