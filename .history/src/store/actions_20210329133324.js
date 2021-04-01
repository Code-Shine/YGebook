const actions = {
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
export default actions