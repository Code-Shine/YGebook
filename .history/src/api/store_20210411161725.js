import axios from 'axios'
import { setLocalForage } from '../utils/localForage'

// export function gotoStoreHome(vue) {
//     vue.$router.push({
//         path: '/store/home'
//     })
// }

// 下载书籍的方法
export function download(book, onSuccess, onError, onProgress) {
    if (onProgress == null) {
        onProgress = onError
        onError = null
    }
    // console.log('测试点1')
    // 通过axios来发起请求
    return axios.create({
        baseURL: process.env.VUE_APP_EPUB_URL,
        method: 'get',
        responseType: 'blob',
        timeout: 180 * 1000,
        // 下载进度
        onDownloadProgress: progressEvent => {
            if (onProgress) onProgress(progressEvent)
        }
    }).get(`${book.categoryText}/${book.fileName}.epub`).then(res => {
        // console.log(res)
        const blob = new Blob([res.data])
        setLocalForage(book.fileName, blob, () => {
            if (onSuccess) onSuccess(book)
        }, err => {
            if (onError) onError(err)
        })
    }).catch(err => {
        if (onError) onError(err)
    })
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