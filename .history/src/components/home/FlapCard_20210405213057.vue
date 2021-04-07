<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <!-- 推荐的卡片 -->
    <div class="flap-card-bg">
      <div class="book-card" :class="{'animation': runBookCardAnimation}" v-show="runBookCardAnimation">
        <div class="book-card-wrapper">
          <div class="img-wrapper">
            <img class="img" :src="data ? data.cover : ''">
          </div>
          <div class="content-wrapper">
            <div class="content-title">{{data ? data.title : ''}}</div>
            <div class="content-author sub-title-medium">{{data ? data.author : ''}}</div>
            <div class="content-category">{{categoryText()}}</div>
          </div>
          <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
        </div>
    </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin'
  export default {
    mixins: [storeHomeMixin],
    methods: {
      close() {
        this.setFlapCardVisible(false)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .flap-card-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(30);
      z-index: 1100;
      width: 100%;
      @include center;
      .icon-close {
        width: px2rem(45);
        height:px2rem(45);
        border-radius: 50%;
        background: #333;
        font-size: px2rem(25);
        color: white;
        @include center;
      }
    }
  }

</style>
