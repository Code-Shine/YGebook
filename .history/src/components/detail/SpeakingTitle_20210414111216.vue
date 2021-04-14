<template>
  <div class="detail-title-wrapper" :class="{'hide-shadow': ifHideShadow}">
    <div class="title-left-wrapper" @click="back">
      <span class="icon-back"></span>
    </div>
    <div class="title-wrapper-center">
      <span class="wrapper-center">听书页</span>
    </div>
    <!-- 跳转书架页 -->
    <div class="title-right-wrapper">
      <span class="icon-shelf icon" v-if="showShelf" @click="showBookShelf"></span>
      <span class="icon-share" v-else></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: String,
      showShelf: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        ifHideShadow: true
      }
    },
    methods: {
      showBookShelf() {
        this.$router.push('/bookstore/shelf')
      },
      showShadow() {
        this.ifHideShadow = false
      },
      hideShadow() {
        this.ifHideShadow = true
      },
      back() {
        this.$emit('back')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .detail-title-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: px2rem(42);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    font-size: px2rem(20);
    color: #666;
    &.hide-shadow {
      box-shadow: none;
    }
    .title-left-wrapper {
      position: relative;
      z-index: 200;
      flex: 1;
      margin-left: px2rem(15);
      @include left;
    }
    .title-wrapper-center{
      position: relative;
      @include center;
    }
    .title-right-wrapper {
      position: relative;
      z-index: 200;
      flex: 1;
      margin-right: px2rem(15);
      // font-size: px2rem(100);
      @include right;
    }

  }
</style>
