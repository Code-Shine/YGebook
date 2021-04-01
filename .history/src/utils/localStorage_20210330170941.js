import Storage from 'web-storage-cache'

const localStorage = new Storage()

// 先来封装一下几个基本操作
// 第一个是写入
export function setLocalStorage(key, value) {
    return localStorage.set(key, value)
}
// 第二个是获取,只需要传入一个key就可以获得value值
export function getLocalStorage(key) {
    return localStorage.get(key)
}
// 再写一个remove,可以移除某个值
export function removeLoaclStorage(key) {
    return localStorage.delete(key)
}
// 全部清除的方法
export function clearLoaclStorage() {
    return localStorage.clear()
        // eslint-disable-next-line eol-last
}