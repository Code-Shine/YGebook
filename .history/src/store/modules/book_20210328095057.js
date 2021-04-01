const book = {
    state: {
        fileName: ''
    },
    mutations: {
        SET_FILENAME: (state, fileName) => {
            state.fileName = fileName
        }
    },
    actions: {
        setFileName: ({ commit }, fileName) => {
            // console.log(state.test, newTest)
            // 下面可会返回一个promise的对象
            return commit('SET_FILENAME', fileName)
        }
    }
    // eslint-disable-next-line eol-last
}

// 然后将这个book作为对象输出出去
// eslint-disable-next-line eol-last
export default book