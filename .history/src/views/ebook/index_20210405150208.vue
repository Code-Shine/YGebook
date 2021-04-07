<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-footer></ebook-footer>

  </div>
</template>

<script>
  // 引入组件
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookMenu from '../../components/ebook/EbookMenu.vue'
  import EbookFooter from '../../components/ebook/EbookFooter.vue'
  import { getReadTime, saveReadTime } from '../../utils/localStorage'
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin],
    // 将组件进行注册,此时就将组件引入了
    components: {
      EbookReader,
      EbookTitle,
      // eslint-disable-next-line vue/no-unused-components
      EbookMenu,
      EbookFooter

    },
    methods: {
      startLoopReadTime() {
        let readTime = getReadTime(this.fileName)
        if (!readTime) {
          readTime = 0
        }
        this.task = setInterval(() => {
          readTime++
          if (readTime % 30 === 0) {
            saveReadTime(this.fileName, readTime)
          }
        }, 1000)
      }
    },
    mounted() {
      this.startLoopReadTime()
    },
    // 在结束之前终止当前的定时任务
    beforeDestroy() {
      if (this.task) {
        clearInterval(this.task)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss"
</style>
