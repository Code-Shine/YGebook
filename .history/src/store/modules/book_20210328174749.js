const book = {
    state: {
        fileName: '',
        menuVisible: false
    },
    mutations: {
        SET_FILENAME: (state, fileName) => {
            state.fileName = fileName
        },
        SET_MENUVISIBLE: (state, menuVisible) => {
            state.menuVisible = menuVisible
        }
    },
    actions: {
        setFileName: ({ commit }, fileName) => {
            // console.log(state.test, newTest)
            // 下面可会返回一个promise的对象
            return commit('SET_FILENAME', fileName)
        },
        setMenuVisible: ({ commit }, menuVisible) => {
            return commit('SET_MENUVISIBLE', menuVisible)
        }
    }
    // eslint-disable-next-line eol-last
}

// 然后将这个book作为对象输出出去
// eslint-disable-next-line eol-last
export default book