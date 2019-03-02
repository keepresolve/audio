<template>
  <div id="app">12313132
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
    list-style: none;
}
#app,
html,
body {
    height: 100%;
}
</style>
