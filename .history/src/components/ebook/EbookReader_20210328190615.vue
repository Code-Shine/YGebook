<template>
  <div class="ebook-reader">
    <!-- {{$route.params.fileName}} -->
    <!-- 展示书籍的div -->
    <div id="read"></div>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import { ebookMixin } from '../../utils/mixin'
  import Epub from 'epubjs'
  global.ePub = Epub
  export default {
    mixins: [ebookMixin],
    methods: {
      prevPage() {
        if (this.rendition) {
          this.rendition.prev()
          // 翻页的时候将菜单栏与标题栏进行隐藏
          this.hideTitleAndMenu()
        }
      },
      nextPage() {
        if (this.rendition) {
          this.rendition.next()
          // 翻页的时候将菜单栏与标题栏进行隐藏
          this.hideTitleAndMenu()
        }
      },
      toggleTitleAndMenu() {
        // console.log('切换按钮')
        // 我们通过store去分发一个事件,去改变其vuex中的值
        this.$store.dispatch('setMenuVisible', !this.menuVisible)
      },
      // 设定翻页的时候菜单栏与标题栏进行隐藏
      hideTitleAndMenu() {
        this.$store.dispatch('setMenuVisible', false)
      },
      initEpub () {
        // 将nginx服务器的位置赋值给变量baseUrl,获得了电子书的链接
        const url = 'http://172.25.103.39:8888/epub/' + this.fileName + '.epub'
        // console.log(url)
        // 实例化一个book对象并将其展示
        this.book = new Epub(url)
        // console.log(this.book)
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.rendition.display()
        // console.log('nihao '
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
          // console.log(offsetX, time)
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
      }
    },
    mounted () {
      // 将其拆解后通过/来进行拼接起来
      const fileName = this.$route.params.fileName.split('|').join('/')
      // console.log(fileName)
      // 改变状态后异步的对initEpub进行调用
      this.$store.dispatch('setFileName', fileName).then(() => {
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
