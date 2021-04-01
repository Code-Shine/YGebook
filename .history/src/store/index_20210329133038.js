import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
// 导入我们的getter
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        book
    },
    // 引用进来getters
    getters,
    actions
    // eslint-disable-next-line eol-last
})