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
      <div class="slide-contents-search-cancel" v-if="searchVisible"
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
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <!-- 作者 -->
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
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
    <scroll class="slide-contents-list"
         :top="156"
         :bottom="48"
         ref="scroll">
      <div class="slide-contents-item" v-for="(item, index) in navigation"
        :key="index">
        <span class="slide-contents-item-label"
        :style="contentItemStyle(item)">{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '../common/Scroll'
import { px2rem } from '../../utils/utils'
export default {
  mixins: [ebookMixin],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Scroll
  },
  data() {
    return {
      searchVisible: false
    }
  },
  methods: {
    contentItemStyle(item) {
      //  console.log(item)
      return {
          marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
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
    font-size: 0;
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
  .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
      .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);
        .slide-contents-book-img {
          width: px2rem(45);
          height: px2rem(60);
        }
      }
      .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        .slide-contents-book-title {
          width: px2rem(153.75);
          font-size: px2rem(14);
          line-height: px2rem(16);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: keep-all;
          // .slide-contents-book-title-text {
          //   @include ellipsis;
          // }
        }
        .slide-contents-book-author {
          width: px2rem(153.75);
          font-size: px2rem(12);
          line-height: px2rem(14);
          margin-top: px2rem(5);
          @include left;
          .slide-contents-book-author-text {
            @include ellipsis;
          }
        }
      }
      .slide-contents-book-progress-wrapper {
        flex: 0 0 px2rem(70);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .slide-contents-book-progress {
          .progress {
            font-size: px2rem(14);
          }
          .progress-text {
            font-size: px2rem(12);
          }
        }
        .slide-contents-book-time {
          font-size: px2rem(12);
          margin-top: px2rem(5);
        }
      }

    }
  .slide-contents-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;
        .slide-contents-item{
          display: flex;
          padding: px2rem(20) 0;
          box-sizing: border-box;
          .slide-contents-item-label {
            flex: 1;
            font-size: px2rem(14);
            @include ellipsis
          }
          .slide-contents-item-page {}

        }
      }
  }
</style>
