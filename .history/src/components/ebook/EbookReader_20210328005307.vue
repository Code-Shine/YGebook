<template>
  <div class="ebook-reader">
    {{$route.params.fileName}}
    <!-- 展示书籍的div -->
  <div id="read"></div>
  </div>
</template>

<script>
  export default {
    mounted () {
      // 将其拆解后通过/来进行拼接起来
      const fileName = this.$route.params.fileName.split('|').join('/')
      console.log(fileName)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss"
</style>
