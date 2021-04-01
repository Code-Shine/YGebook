const book = {
        fileName: state => state.book.fileName,
        // 从state区取到book对象然后得到属性值
        menuVisible: state => state.book.menuVisible
    }
    // 相当于我们将这个return回去
    // eslint-disable-next-line eol-last
export default book