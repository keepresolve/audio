import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
    socketStatus: 0,
    status: 0
}
const mutations = {
    changeSocketStatus(state, status) {
        state.socketStatus = status
    },
    changeStatus(state, status) {
        state.status = status
    }
}

export default new Vuex.Store({
    state,
    mutations
})
