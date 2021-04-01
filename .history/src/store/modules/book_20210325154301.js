const book = {
    state: {
        test: 1
    },
    mutations: {
        SET_TEST: (state, newTest) => {
            state.test = newTest
        }
    },
    actions: {
        setTest: ({ commit, state }, newTest) => {
            // console.log(state.test, newTest)
            // 下面可会返回一个promise的对象
            return commit('SET_TEST', newTest)
        }
    }
}