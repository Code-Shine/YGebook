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
    <!-- 书籍展示 -->
   <div class="slide-contents-book-wrapper" v-show="!searchVisible">
     <!-- 书籍图片 -->
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <!-- 书籍信息 -->
      <div class="slide-contents-book-info-wrapper">
        <!-- 书籍标题 -->
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text"></span>
        </div>
        <!-- 作者 -->
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text"></span>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="slide-contents-book-progress-wrapper">
        <!-- 阅读的进度 -->
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <!-- 已经阅读时间 -->
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      searchVisible: false
    }
  },
  methods: {
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
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
