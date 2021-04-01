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
        const url = 'http://192.168.43.15:8888/epub/' + this.fileName + '.epub'
        console.log(url)
        this.book = new Epub(url)
        // console.log(this.book)
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          hright: innerHeight,
          method: 'default'
        })
        this.rendition.display()
      }
    },
    mounted () {
      /*
      // 将其拆解后通过/来进行拼接起来
      const fileName = this.$route.params.fileName.split('|').join('/')
      // 改变状态后异步的对initEpub进行调用
      this.$store.dispatch('setFileName', fileName).then(() => {
        this.initEpub()
      })
      */
      console.log(this.$route.params.fileName)
       // 可以对上述代码进行精简一下，直接不用定义fileName,而是用其后面的代码代替异步后的fileName
         this.$store.dispatch('setFileName',
         this.$route.params.fileName.split('|').join('/'))
         .then(() => {
             this.initEpub()
         })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss"
</style>
