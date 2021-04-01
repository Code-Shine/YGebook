<template>
  <div class="ebook-popup-list" v-show="fontFamilyVisible">
    <!-- 弹出框的标题部分 -->
    <div class="ebook-popup-title">
      <!-- 隐藏弹出框的图标 -->
      <div class="ebook-popup-title-icon" @click="hide">
        <span class="icon-down2"></span>
      </div>
      <span class="ebook-popup-title-text">选择字体</span>
    </div>
    <!-- 弹出框的字体样式列表 -->
    <div class="ebook-popup-list-wrapper"></div>
  </div>
</template>

<script>
export default {
  methods: {
    hide() {
      this.setFontFamilyVisible(false)
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss";

</style>
