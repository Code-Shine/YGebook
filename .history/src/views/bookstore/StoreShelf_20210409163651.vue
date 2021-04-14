<!-- 书架组件 -->
<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll class="store-shelf-scroll-wrapper"
            :top="0"
             @onScroll="onScroll"
            ref="scroll">
      <shelf-search></shelf-search>
      <!-- <shelf-list :data="shelfList"></shelf-list> -->
      <shelf-list></shelf-list>
    </scroll>
    <!-- <shelf-footer></shelf-footer> -->
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import { storeShelfMixin } from '../../utils/mixin'
  import Scroll from '../../components/common/Scroll'
  import ShelfSearch from '../../components/shelf/ShelfSearch'
  import { shelf } from '../../api/store'
  import ShelfList from '../../components/shelf/ShelfList'
  // import ShelfFooter from '../../components/shelf/ShelfFooter'
  import { appendAddToShelf } from '../../utils/store'

  export default {
    mixins: [storeShelfMixin],
    components: {
      Scroll,
      ShelfTitle,
      ShelfSearch,
       ShelfList
    },
    methods: {
            // 滚动页面的监听事件，ShelfTitle和ShelfSearch组件会进行监听
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
      },
      getShelfList() {
        // 通过接口获得数据，并将其放入到vuex中
        shelf().then(response => {
          if (response.status === 200 && response.data && response.data.bookList) {
            this.setShelfList(appendAddToShelf(response.data.bookList))
          }
        })
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
      top: 0;
      left: 0;
      z-index: 101;
    }
  }
</style>
