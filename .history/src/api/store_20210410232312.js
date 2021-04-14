import axios from 'axios'
// import { setLocalForage } from '../utils/localForage'

// export function gotoStoreHome(vue) {
//     vue.$router.push({
//         path: '/store/home'
//     })
// }

// 下载书籍的方法
export function download(book, onSucess, onError, onProgress) {
    if (onProgress == null) {
        onProgress = onError
        onError = null
    }
}
// 定义书架的接口
export function shelf() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
    })
}
// 定义接口，这是一个方法，里面封装了一个axios的请求，包含请求方法以及请求的地址
export function home() {
    return axios({
            method: 'get',
            url: `${process.env.VUE_APP_BASE_URL}/book/home`
        })
        // eslint-disable-next-line eol-last
}

export function flatList() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BOOK_URL}/book/flat-list`
    })
}

export function list() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/list`
    })
}
export function detail(book) {
    return axios({
            method: 'get',
            url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
            params: {
                fileName: book.fileName
            }
        })
        // eslint-disable-next-line eol-last
}