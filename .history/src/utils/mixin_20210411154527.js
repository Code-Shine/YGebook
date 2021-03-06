import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from './book'
import { saveLocation, getBookShelf, saveBookShelf } from './localStorage'
import { gotoBookDetail, appendAddToShelf } from './store'

import { shelf } from '../api/store'
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
            // currentLocation????????????.rendition??????????????????,????????????????????????????????????????????????????????????????????????????????????????????????
            const currentLocation = this.currentBook.rendition.currentLocation()
            if (currentLocation && currentLocation.start) {
                const startCfi = currentLocation.start.cfi
                    // currentLocation.start.cfi?????????????????????????????????percentageFromCfi???????????????
                const progress = this.currentBook.locations.percentageFromCfi(startCfi)
                    // ???????????????
                this.setProgress(Math.floor(progress * 100))
                    // ???section???????????????
                this.setSection(currentLocation.start.index)
                    // ???????????????????????????????????????localStorage??????
                saveLocation(this.fileName, startCfi)
            }
        },
        display(target, cb) {
            if (target) {
                this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) cb() // ?????????????????????????????????????????????????????????
                })
            } else {
                return this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            }
        },
        // ??????????????????????????????????????????????????????
        hideTitleAndMenu() {
            // this.$store.dispatch('setMenuVisible', false)
            // ?????????????????????
            this.setMenuVisible(false)
                // ???????????????????????????????????????????????????????????????-1???????????????????????????
            this.setSettingVisible(-1)
                // ???????????????????????????
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
                // console.log('?????????')
                gotoBookDetail(this, book)
            }
        }
        // eslint-disable-next-line eol-last
    }
    // ???????????????
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
            // console.log('?????????')
            gotoBookDetail(this, book)
        },
        getShelfList() {
            let shelfList = getBookShelf()
            if (!shelfList) {
                // ?????????????????????????????????????????????vuex???
                shelf().then(response => {
                    if (response.status === 200 && response.data && response.data.bookList) {
                        shelfList = appendAddToShelf(response.data.bookList)
                        saveBookShelf(shelfList)
                        this.setShelfList(shelfList)
                    }
                })
            } else {
                this.setShelfList(shelfList)
            }
        }

    }
    // eslint-disable-next-line eol-last
}