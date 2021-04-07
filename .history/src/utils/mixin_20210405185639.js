import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from './book'
import { saveLocation } from './localStorage'
export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark'
        ]),
        themeList() {
            return themeList(this)
        }
    },
    methods: {
        ...mapActions([
            'setMenuVisible',
            'setFileName',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark'
        ]),
        initGlobalStyle() {
            removeAllCss()
            switch (this.defaultTheme) {
                case 'Default':
                    // addCss('http://172.25.103.39:8888/theme/theme_default.css')
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break
                case 'Eye':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
                    break
                case 'Gold':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
                    break
                case 'Night':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
                    break
                default:
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break
            }
        },
        refreshLocation() {
            // currentLocation可以获得.rendition中的一个对象,其记录一些信息，比如当前页面在本书的什么位置，可以此来设置进度条
            const currentLocation = this.currentBook.rendition.currentLocation()
            if (currentLocation && currentLocation.start) {
                const startCfi = currentLocation.start.cfi
                    // currentLocation.start.cfi为本章的开始位置，通过percentageFromCfi获得百分比
                const progress = this.currentBook.locations.percentageFromCfi(startCfi)
                    // 设置进度条
                this.setProgress(Math.floor(progress * 100))
                    // 对section值进行刷新
                this.setSection(currentLocation.start.index)
                    // 进行将阅读的进度进行保存在localStorage当中
                saveLocation(this.fileName, startCfi)
            }
        },
        display(target, cb) {
            if (target) {
                this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) cb() // 如果回调函数存在，则是直接调用回调函数
                })
            } else {
                return this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            }
        },
        // 设定翻页的时候菜单栏与标题栏进行隐藏
        hideTitleAndMenu() {
            // this.$store.dispatch('setMenuVisible', false)
            // 优雅的代码方式
            this.setMenuVisible(false)
                // 当菜单栏隐藏的时候，我们需要将设置栏设置回-1，防止下次自动显示
            this.setSettingVisible(-1)
                // 将字体列表进行隐藏
            this.setFontFamilyVisible(false)
        },
        getReadTimeText() {
            return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
        }
    }
    // eslint-disable-next-line eol-last
}
export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark'
        ]),
        themeList() {
            return themeList(this)
        },
        getSectionName() {
            return this.section ? this.navigation[this.section].label : ''
        }
    },
    methods: {
        ...mapActions([
            'setFileName',
            'setMenuVisible',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark'
        ]),
        initGlobalStyle() {
            removeAllCss()
            switch (this.defaultTheme) {
                case 'Default':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break
                case 'Eye':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
                    break
                case 'Gold':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
                    break
                case 'Night':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
                    break
                default:
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break
            }
        },
        refreshLocation() {
            const currentLocation = this.currentBook.rendition.currentLocation()
            if (currentLocation && currentLocation.start) {
                const startCfi = currentLocation.start.cfi
                const progress = this.currentBook.locations.percentageFromCfi(startCfi)
                this.setProgress(Math.floor(progress * 100))
                this.setSection(currentLocation.start.index)
                saveLocation(this.fileName, startCfi)
                const bookmark = getBookmark(this.fileName)
                if (bookmark) {
                    if (bookmark.some(item => item.cfi === startCfi)) {
                        this.setIsBookmark(true)
                    } else {
                        this.setIsBookmark(false)
                    }
                } else {
                    this.setIsBookmark(false)
                }
                if (this.pagelist) {
                    const totalPage = this.pagelist.length
                    const currentPage = currentLocation.start.location
                    if (currentPage && currentPage > 0) {
                        this.setPaginate(currentPage + ' / ' + totalPage)
                    } else {
                        this.setPaginate('')
                    }
                } else {
                    this.setPaginate('')
                }
            }
        },
        display(target, cb) {
            if (target) {
                this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            } else {
                this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            }
        },
        hideTitleAndMenu() {
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
        getReadTimeText() {
            return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
        }
    }
}