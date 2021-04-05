<template>
  <div class="ebook-loading">
    加载中...
  </div>
</template>

<script>
  // import { px2rem } from '../../utils/utils'
  export default {}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-loading {
    position: relative;
    z-index: 400;
    width: px2rem(63);
    height: px2rem(40);
    background: transparent;
    border: px2rem(1.5) solid #d7d7d7;
    border-radius: px2rem(3);

  }
</style>
