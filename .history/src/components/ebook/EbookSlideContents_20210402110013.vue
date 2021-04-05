<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <!-- 图标 -->
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <!-- 输入框 -->
        <input type="text" class="slide-contents-search-input" :placeholder="$t('book.searchHint')"
          @click=" showSearchPage()">
      </div>
      <!-- 取消按钮 -->
      <div class="slide-contents-search-cancel" v-if="searchVisibe"
        @click="hideSearchPage()">{{$t('book.cancel')}}</div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      searchVisibe: false
    }
  },
  methods: {
    showSearchPage() {
      this.searchVisibe = true
    },
    hideSearchPage() {
      this.searchVisibe = false
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss";
  .ebook-slide-contents {
    width: 100%;
  .slide-contents-search-wrapper{
       display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
    .slide-contents-search-input-wrapper{
        flex: 1;
        @include center;
      .slide-contents-search-icon{
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;
      }
      .slide-contents-search-input{
        flex: 1;
        width:100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }

    }
    .slide-contents-search-cancel{
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
   }
  }
</style>
