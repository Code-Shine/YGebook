<template>
  <transition name="hot-search-move">
    <scroll class="hot-search-wrapper"
            :top="52"
            @onScroll="onScroll"
            ref="scroll">
      <hot-search :label="$t('home.hotSearch')"
                  :btn="$t('home.change')"
                  :hotSearch="searchList.hotSearch"></hot-search>
      <div class="line"></div>

    </scroll>
  </transition>
</template>

<script>
  import Scroll from '../common/Scroll'
  import HotSearch from './HotSearch'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    components: {
      Scroll,
      HotSearch
    },
    data() {
      return {
        searchList: {
          hotSearch: [
            {
              type: 1,
              text: 'IT',
              num: '1.8万'
            },
            {
              type: 1,
              text: 'computer',
              num: '1.1万'
            },
            {
              type: 1,
              text: 'business',
              num: '1.3万'
            },
            {
              type: 1,
              text: 'biology',
              num: '1.0万'
            },
            {
              type: 1,
              text: 'physics',
              num: '3.9万'
            }
          ]
        }
      }
    },
    methods: {
      onScroll(offsetY) {
        this.setHotSearchOffsetY(offsetY)
      },
      reset() {
        // 滚动条回到初始的位置
        this.$refs.scroll.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .hot-search-wrapper {
    width: 100%;
    height: 100%;
    background: white;
    .line {
      width: 100%;
      height: 0;
      border-top: px2rem(1) solid #eee;
      margin: px2rem(10) 0;
    }
  }
</style>
