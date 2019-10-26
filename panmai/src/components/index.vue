<template>
  <el-container class="index">
    <router-view @changed="changed"></router-view>
  </el-container>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'index',
    data() {
        return {}
    },
    computed: {
        // ...mapState(['socketStatus'])
    },
    mounted() {},
    watch: {},
    sockets: {
        // connect() {
        //     console.log('socket is connected')
        // },
        // disconnected() {
        //     console.log('disconnected')
        // },
        // reconnect() {
        //     this.changeSocketStatus(1)
        //     console.log('reconnect')
        // }
    },
    methods: {
        ...mapMutations(['changeSocketStatus']),
        changed(obj) {
            alert(obj.message)
        }
    }
}
</script>

<style>
.index {
    height: 100%;
}
</style>
