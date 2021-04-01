<template>
  <div class="ebook">

    <ebook-reader></ebook-reader>
  </div>
</template>

<script>
  // 引入这个组件
  import EbookReader from '../../components/ebook/EbookReader'
  export default {
    // 将组件进行注册,此时就将组件引入了
    components: {
      EbookReader
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss"
</style>
