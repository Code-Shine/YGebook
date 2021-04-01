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

      }
    },
    mounted () {
      // 将nginx服务器的位置赋值给变量baseUrl
      const baseUrl = 'http://172.25.103.39:8888/epub/'
      // 将其拆解后通过/来进行拼接起来
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.$store.dispatch('setFileName')
      console.log(`${baseUrl}${fileName}.epub`)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss"
</style>
