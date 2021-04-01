import Storage from 'web-storage-cache'

const localStorage = new Storage()

// 先来封装一下几个基本操作
// 第一个是写入
export function setLoaclStorage(key, value) {
    return localStorage.set(key, value)
}
// 第二个是获取,只需要传入一个key就可以获得value值
export function getLoaclStorage(key) {
    return localStorage.get(key)
}