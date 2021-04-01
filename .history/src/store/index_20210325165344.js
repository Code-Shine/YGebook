import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
// 导入我们的getter
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        book
    },
    // 引用进来getters
    getters
    // eslint-disable-next-line eol-last
})