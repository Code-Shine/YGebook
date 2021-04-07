const book = {
        fileName: state => state.book.fileName,
        // 从state区取到book对象然后得到属性值
        menuVisible: state => state.book.menuVisible,
        settingVisible: state => state.book.settingVisible,
        defaultFontSize: state => state.book.defaultFontSize,
        defaultFontFamily: state => state.book.defaultFontFamily,
        fontFamilyVisible: state => state.book.fontFamilyVisible,
        defaultTheme: state => state.book.defaultTheme,
        bookAvailable: state => state.book.bookAvailable,
        progress: state => state.book.progress,
        section: state => state.book.section,
        isPaginating: state => state.book.isPaginating,
        currentBook: state => state.book.currentBook,
        navigation: state => state.book.navigation,
        cover: state => state.book.cover,
        metadata: state => state.book.metadata,
        paginate: state => state.book.paginate,
        pagelist: state => state.book.pagelist,
        offsetY: state => state.book.offsetY,
        isBookmark: state => state.book.isBookmark,
        hotSearchOffsetY: state => state.store.hotSearchOffsetY,
        flapCardVisible: state => state.store.flapCardVisible
    }
    // 相当于我们将这个return回去
    // eslint-disable-next-line eol-last
export default book