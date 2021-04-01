import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss } from './book'
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

            const startCfi = currentLocation.start.cfi
                // currentLocation.start.cfi为本章的开始位置，通过percentageFromCfi获得百分比
            const progress = this.currentBook.locations.percentageFromCfi(startCfi)
                // 设置进度条
            this.setProgress(Math.floor(progress * 100))
                // 进行将阅读的进度进行保存在localStorage当中
            saveLocation(this.fileName, startCfi)
        },
        display(target, cb) {
            if (target) {
                this.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cd) cd()
                })
            } else {
                return this.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cd) cd()
                })
            }
        }
    }
    // eslint-disable-next-line eol-last
}