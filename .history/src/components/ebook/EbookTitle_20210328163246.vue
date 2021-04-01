<template>
   <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <!-- 左边 -->
      <div class="left" @click="back">
        <span class="icon-back"></span>
      </div>
      <!-- 右边 -->
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper" @click="gotoBookStore">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss"
</style>
