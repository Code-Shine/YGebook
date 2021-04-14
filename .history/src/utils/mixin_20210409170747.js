import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from './book'
import { saveLocation } from './localStorage'
import { gotoBookDetail } from './store'
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
export const storeHomeMixin = {
        computed: {
            ...mapGetters([
                'offsetY',
                'hotSearchOffsetY',
                'flapCardVisible'
            ])
        },
        methods: {
            ...mapActions([
                'setOffsetY',
                'setHotSearchOffsetY',
                'setFlapCardVisible'
            ]),
            // showBookDetail(book) {
            //     this.$router.push({
            //         path: '/bookstore/detail',
            //         query: {
            //             fileName: book.fileName,
            //             category: book.categoryText

            //         }
            //     })
            // },
            showBookDetail(book) {
                // console.log('测试一')
                gotoBookDetail(this, book)
            }
        }
        // eslint-disable-next-line eol-last
    }
    // 书架的混入
export const storeShelfMixin = {
    computed: {
        ...mapGetters([
            'isEditMode',
            'shelfList',
            'shelfSelected',
            'shelfTitleVisible',
            'offsetY',
            'shelfCategory',
            'currentType'
        ])
    },
    methods: {
        ...mapActions([
            'setIsEditMode',
            'setShelfList',
            'setShelfSelected',
            'setShelfTitleVisible',
            'setOffsetY',
            'setShelfCategory',
            'setCurrentType'
        ]),
        showBookDetail(book) {
            // console.log('测试二')
            gotoBookDetail(this, book)
        }
        //     getCategoryList(title) {
        //         this.getShelfList().then(() => {
        //             const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
        //             this.setShelfCategory(categoryList)
        //         })
        //     },
        //     getShelfList() {
        //         let shelfList = getBookShelf()
        //         if (!shelfList) {
        //             shelf().then(response => {
        //                 if (response.status === 200 && response.data && response.data.bookList) {
        //                     shelfList = appendAddToShelf(response.data.bookList)
        //                     saveBookShelf(shelfList)
        //                     return this.setShelfList(shelfList)
        //                 }
        //             })
        //         } else {
        //             return this.setShelfList(shelfList)
        //         }
        //     },
        //     moveOutOfGroup(f) {
        //         this.setShelfList(this.shelfList.map(book => {
        //             if (book.type === 2 && book.itemList) {
        //                 book.itemList = book.itemList.filter(subBook => !subBook.selected)
        //             }
        //             return book
        //         })).then(() => {
        //             const list = computeId(appendAddToShelf([].concat(
        //                 removeAddFromShelf(this.shelfList), ...this.shelfSelected)))
        //             this.setShelfList(list).then(() => {
        //                 this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
        //                 if (f) f()
        //             })
        //         })
        //     }
    }
    // eslint-disable-next-line eol-last
}