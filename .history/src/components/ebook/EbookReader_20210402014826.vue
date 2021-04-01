<template>
  <div class="ebook-reader">
    <!-- {{$route.params.fileName}} -->
    <!-- 展示书籍的div -->
    <div id="read"></div>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  // import { addCss } from '../../utils/book'
  import {
    saveFontSize,
    getFontSize,
    getFontFamily,
    saveFontFamily,
    getTheme,
    saveTheme
     } from '../../utils/localStorage'
  import { ebookMixin } from '../../utils/mixin'
  import Epub from 'epubjs'
  global.ePub = Epub
  export default {
    mixins: [ebookMixin],
    methods: {
      prevPage() {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refreshLocation()
          })
          // 翻页的时候将菜单栏与标题栏进行隐藏
          this.hideTitleAndMenu()
        }
      },
      nextPage() {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refreshLocation()
          })
          // 翻页的时候将菜单栏与标题栏进行隐藏
          this.hideTitleAndMenu()
        }
      },
      toggleTitleAndMenu() {
         // 在切换中同理，当切换的时候将设置栏设置回-1，防止下次自动显示
        if (this.menuVisible) {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }

        // console.log('切换按钮')
        // 我们通过store去分发一个事件,去改变其vuex中的值
        // this.$store.dispatch('setMenuVisible', !this.menuVisible)
        this.setMenuVisible(!this.menuVisible)
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
      initFontSize() {
         // 初始化字号
          // eslint-disable-next-line prefer-const
          let fontSize = getFontSize(this.fileName)
          if (!fontSize) {
            saveFontSize(this.fileName, this.defaultFontSize)
          } else {
            this.rendition.themes.fontSize(fontSize)
            this.setDefaultFontSize(fontSize)
          }
      },
      initFontFamily() {
         // 初始化字体
          // eslint-disable-next-line prefer-const
          let font = getFontFamily(this.fileName)
          if (!font) {
            saveFontFamily(this.fileName, this.defaultFontFamily)
          } else {
            this.rendition.themes.font(font)
            this.setDefaultFontFamily(font)
          }
      },
      initTheme() {
        let defaultTheme = getTheme(this.fileName)
        if (!defaultTheme) {
          defaultTheme = this.themeList[0].name
          // this.setDefaultTheme(defaultTheme) // 设置到vuex中
          saveTheme(this.fileName, defaultTheme)
        }
        this.setDefaultTheme(defaultTheme) // 设置到vuex中
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        this.rendition.themes.select(defaultTheme)
      },
      initRendition() {
        // 将电子书进行渲染
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })

        const location = getLocation(this.fileName)
          this.display(location, () => {
            this.initFontSize()
            this.initFontFamily()
            this.initTheme()
            this.initGlobalStyle()
         })

        // 字体加载的钩子函数
          this.rendition.hooks.content.register(contents => {
          Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
          ]).then(() => {
            console.log('字体加载完毕...')
          })
        })
      },
      initGesture() {
                // 使用on来绑定事件，一个是触摸开始时间，一个是触摸结束时间
        this.rendition.on('touchstart', event => {
          // console.log(event)
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          // console.log(event)
          const offsetX = event.changedTouches[0].clientX - this.touchStartX
          const time = event.timeStamp - this.touchStartTime
          // 滑动时间小于500毫秒，且从左到右滑动的距离大于40的时候，跳转上一页
          if (time < 500 && offsetX > 40) {
            this.prevPage()
            // 当滑动时间小于500毫秒，且从右往左滑动的距离大于40的时候，跳转下一页
          } else if (time < 500 && offsetX < -40) {
            this.nextPage()
          } else {
            // 否则就显示菜单栏和标题栏
            this.toggleTitleAndMenu()
          }
          // 禁用事件的默认方法行为
          event.preventDefault()
          // 禁止传播，阻止父事件来处理程序
          event.stopPropagation()
        })
      },
      initEpub () {
        // 将nginx服务器的位置赋值给变量baseUrl,获得了电子书的链接
        const url = process.env.VUE_APP_RES_URL + 'epub/' + this.fileName + '.epub'
        console.log(url)
        // 实例化一个book对象并将其展示
        this.book = new Epub(url)
        // 将这个book对象传入到vuex中
        this.setCurrentBook(this.book)

        this.initRendition()// 初始化Rendition
        this.initGesture() // 关于手势的一些方法
        // 书籍加载完毕执行一个钩子函数,执行一个分页算法
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
        }).then(locations => {
          // console.log(locations)
          this.setBookAvailable(true)
        })
      }
    },
    mounted () {
      // 将其拆解后通过/来进行拼接起来
      const fileName = this.$route.params.fileName.split('|').join('/')
      console.log(fileName)
      // 改变状态后异步的对initEpub进行调用
      // this.$store.dispatch('setFileName', fileName).then(() => {
      //   this.initEpub()
      // })
      this.setFileName(fileName).then(() => {
        this.initEpub()
      })

       // 可以对上述代码进行精简一下，直接不用定义fileName,而是用其后面的代码代替异步后的fileName
        //  this.$store.dispatch('setFileName',
        //  this.$route.params.fileName.split('|').join('/'))
        //  .then(() => {
        //      this.initEpub()
        //  })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss"
</style>
