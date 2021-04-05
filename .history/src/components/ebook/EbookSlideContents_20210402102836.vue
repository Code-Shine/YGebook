<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <!-- 图标 -->
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <!-- 输入框 -->
        <input type="text" class="slide-contents-search-input" :placeholder="$t('book.searchHint')">
      </div>
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

  .slide-contents-search-wrapper{
    width: 100%;
    .slide-contents-search-input-wrapper{
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-search-input{}
      .slide-contents-search-icon{}

    }
    .slide-contents-search-cancel{}
  }
</style>
