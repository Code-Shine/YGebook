<!-- 书架组件 -->
<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>

    <scroll class="store-shelf-scroll-wrapper"
            :top="0"
            :bottom="scrollBottom"
             @onScroll="onScroll"
            ref="scroll">
      <!-- <shelf-search></shelf-search> -->

      <!-- <shelf-list :data="shelfList"></shelf-list> -->
      <!-- 图片宣传栏 -->
      <div class="banner-wrapper">
          <img class="banner-img" src="../../assets/images/banner.jpg"  alt="好好读书" />
      </div>
      <shelf-list></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import { storeShelfMixin } from '../../utils/mixin'
  import Scroll from '../../components/common/Scroll'
  // import ShelfSearch from '../../components/shelf/ShelfSearch'

  import ShelfList from '../../components/shelf/ShelfList'
  import ShelfFooter from '../../components/shelf/ShelfFooter'

  export default {
    mixins: [storeShelfMixin],
    components: {
      Scroll,
      ShelfTitle,
      // ShelfSearch,
      ShelfList,
      ShelfFooter
    },
    watch: {
      isEditMode(isEditMode) {
        this.scrollBottom = isEditMode ? 48 : 0
        this.$nextTick(() => {
        this.$refs.scroll.refresh()
        })
      }
    },
    data() {
      return {
        scrollBottom: 0,
        banner: ''
      }
    },
    methods: {
            // 滚动页面的监听事件，ShelfTitle和ShelfSearch组件会进行监听
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
      }

   },
    mounted() {
      this.getShelfList()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .store-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;
    .store-shelf-scroll-wrapper {
      position: absolute;
      top: px2rem(50);
      left: 0;
      z-index: 101;
      .banner-wrapper {
      width: 100%;

      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: px2rem(150);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    }

  }
</style>
