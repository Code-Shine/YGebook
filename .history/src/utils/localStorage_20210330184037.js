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
export function removeLocalStorage(key) {
    return localStorage.delete(key)
}
// 全部清除的方法
export function clearLocalStorage() {
    return localStorage.clear()
        // eslint-disable-next-line eol-last
}

// 下面是一些业务代码
// 因为每一本电子书的设置以及内容可能都是不一样的，所以为每一个电子书开辟一个localstorage
export function setBookObject(fileName, key, value) {
    const book = getLocalStorage(`${fileName}-info`)
    if (!book) {
        // eslint-disable-next-line no-const-assign
        book = {}
    }
    book[key] = value
    setLocalStorage(`${fileName}-info`, book)
        // eslint-disable-next-line eol-last
}

// 下面来写获取的代码
export function getBookObject(fileName, key) {
    const book = getLocalStorage.clear(`${fileName}-info`)
    if (book) {
        return book[key]
    } else {
        return null
    }
}