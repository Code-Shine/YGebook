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
    let book = getLocalStorage(`${fileName}-info`)
        // book没有的话就会执行下面的if,定义book这个对象
    if (!book) {
        // eslint-disable-next-line no-const-assign
        book = {}
    }
    book[key] = value // 将值赋给这个对象
    setLocalStorage(`${fileName}-info`, book) // 将这个对象存入localStorage
        // eslint-disable-next-line eol-last
}

// 根据电子书名和键值来获取其中存储的值
export function getBookObject(fileName, key) {
    const book = getLocalStorage(`${fileName}-info`)
    if (book) {
        return book[key]
    } else {
        return null
    }
}

// 获得电子书其中的字体
export function getFontFamily(fileName) {
    return getBookObject(fileName, 'fontFamily')
}

// 将字体保存到localstorage中
export function saveFontFamily(fileName, font) {
    return setBookObject(fileName, 'fontFamily', font)
        // eslint-disable-next-line eol-last
}