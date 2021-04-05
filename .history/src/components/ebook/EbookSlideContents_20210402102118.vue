<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <!-- 图标 -->
      <div class="slide-contents-search-icon">
        <span class="icon-search"></span>
      </div>
      <!-- 输入框 -->
      <input type="text" class="slide-contents-search-input" :placeholder="$t('book.searchHint')">
      <!-- 取消按钮 -->
      <div class="slide-contents-search-cancel">{{$t('book.cancel')}}</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss";

</style>
