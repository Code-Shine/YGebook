<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>

  </div>
</template>

<script>
  // 引入组件
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookTitle from '../../components/ebook/EbookTitle'

  export default {
    // 将组件进行注册,此时就将组件引入了
    components: {
      EbookReader,
      // eslint-disable-next-line vue/no-unused-components
      EbookTitle

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss"
</style>
