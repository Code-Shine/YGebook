<template>
  <div class="ebook-reader">
    {{$route.params.fileName}}
    <!-- 展示书籍的div -->
  <div id="read"></div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss"
</style>
