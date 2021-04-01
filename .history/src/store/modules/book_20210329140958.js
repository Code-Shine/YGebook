const book = {
    state: {
        fileName: '',
        menuVisible: false,
        settingVisible: -1 // -1：不显示，0：字号设置，1：主题设置，2：进度设置，3：目录
    },
    mutations: {
        SET_FILENAME: (state, fileName) => {
            state.fileName = fileName
        },
        SET_MENUVISIBLE: (state, menuVisible) => {
            state.menuVisible = menuVisible
        }
    }
    // 以下内容被复制到了actions.js中进行单独的管理
    // actions: {
    //     setFileName: ({ commit }, fileName) => {
    //         // console.log(state.test, newTest)
    //         // 下面可会返回一个promise的对象
    //         return commit('SET_FILENAME', fileName)
    //     },
    //     setMenuVisible: ({ commit }, menuVisible) => {
    //         return commit('SET_MENUVISIBLE', menuVisible)
    //     }
    // }
    // eslint-disable-next-line eol-last
}

// 然后将这个book作为对象输出出去
// eslint-disable-next-line eol-last
export default book