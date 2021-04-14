<template>

  <div class="shelf-title" :class="{'hide-shadow': ifHideShadow}"  >
      <!-- 书架标题 -->
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{$t('shelf.title')}}</span>
        <!-- <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span> -->
      </div>

      <div class="null"></div>
      <!-- 显示选择书籍的数量 -->
      <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>

      <!-- 图片宣传栏 -->
      <div class="banner-wrapper">
          <!-- <div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"></div> -->
          <img class="banner-img" src="../../assets/images/banner.jpg"  alt="好好读书" />
      </div>

      <!-- 两边的按钮 -->
      <div class="shelf-title-btn-wrapper shelf-title-left">
        <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right">
        <span class="shelf-title-btn-text" @click="onEditClick">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
      </div>
  </div>

</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import { clearLocalStorage } from '../../utils/localStorage'
  import { clearLocalForage } from '../../utils/localForage'

  export default {
    mixins: [storeShelfMixin],
    computed: {
      selectedText() {
        const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0

        return selectedNumber <= 0 ? this.$t('shelf.selectBook')
        : (selectedNumber === 1 ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber)
         : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber))
      }
    },
     watch: {
      //  监听是否有y轴上的一个偏移量，有的话就显示阴影
      offsetY(offsetY) {
        if (offsetY > 0) {
          // 是否隐藏阴影
          this.ifHideShadow = false
        } else {
          this.ifHideShadow = true
        }
      }
    },
    data() {
      return {
        ifHideShadow: true
      }
    },
    methods: {
      onEditClick() {
        // 如果编辑按钮没有选中，则是将其书籍列表的进行清空
        if (!this.isEditMode) {
          this.setShelfSelected([])
          this.shelfList.forEach(item => {
            item.selected = false
            })
        }
        this.setIsEditMode(!this.isEditMode)
      },
      clearCache() {
        // 实现清除缓存
        // alert('clear cache')
        clearLocalStorage()
        clearLocalForage()
        this.setShelfList([])
        this.setShelfSelected([])
        this.getShelfList() // 重新的获取书架的数据
        this.simpleToast(this.$t('shelf.clearCacheSuccess'))
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .shelf-title {
    position: relative;
    z-index: 130;
    width: 100%;
    height: px2rem(42);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-shadow {
      box-shadow: none;
    }
    // 我的书架字体样式
    .shelf-title-text-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      @include columnCenter;
      .shelf-title-text {
        font-size: px2rem(16);
        line-height: px2rem(20);
        font-weight: bold;
        color: #333;
      }
    }
    .shelf-title-sub-text {
        font-size: px2rem(10);
        color: #333;
      }
    .banner-wrapper {
      width: 100%;
      padding: px2rem(10);
      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: px2rem(150);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .shelf-title-btn-wrapper {
      position: absolute;
      top: 0;
      box-sizing: border-box;
      height: 100%;
      @include center;
      .shelf-title-btn-text {
        font-size: px2rem(14);
        color: #666;
      }
      .icon-back {
        font-size: px2rem(20);
        color: #666;
      }
      &.shelf-title-left {
        left: 0;
        padding-left: px2rem(15);
      }
      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(15);
      }
    }
  }
</style>
