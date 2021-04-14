<template>
  <div class="shelf-search-wrapper">
    <div class="shelf-search">
      <!-- 搜索框的图标 -->
      <div class="search-wrapper">
        <!-- 搜索的图标 -->
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input type="text" class="search-input" :placeholder="$t('shelf.search')">
        </div>
        <div class="icon-clear-wrapper">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <div class="icon-locale-wrapper">
        <span class="icon-cn icon"></span>
        <span class="icon-en icon"></span>
      </div>
      <div class="cancel-btn-wrapper">
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-search-wrapper {
    position: relative;
    z-index: 105;
    width: 100%;
    height: px2rem(94);
    font-size: px2rem(16);
    background: white;
    .shelf-search {
      position: absolute;
      top: px2rem(42);
      left: 0;
      z-index: 105;
      width: 100%;
      height: px2rem(5);
    }
  }
</style>
