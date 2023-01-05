import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER';

export default new Vuex.Store({
    state: {
        //user 是一个对象，用来存储当前用户信息（token等数据）
        user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    },
    mutations: {
        setUser(state, data) {
            state.user = data
                //为了数据持久化 还需要将token存储在本地
            window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
        }
    },
    actions: {},
    modules: {}
})