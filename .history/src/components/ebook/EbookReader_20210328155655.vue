<template>
  <div class="ebook-reader">
    <!-- {{$route.params.fileName}} -->
    <!-- 展示书籍的div -->
    <div id="read"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Epub from 'epubjs'
  global.ePub = Epub
  export default {
    computed: {
      ...mapGetters(['fileName'])
    },
    methods: {
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
          console.log(offsetX, time)
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
