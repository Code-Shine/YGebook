<template>
  <div class="shelf-list">

        <div class="shelf-list-item-wrapper" v-for="item in shelfList" :key="item.id">
          <shelf-item :data="item"></shelf-item>
          <!-- <div class="shelf-list-title-wrapper">
            <span class="shelf-list-title title-small">{{item.title}}</span>
          </div> -->
        </div>
  </div>

</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
import ShelfItem from './ShelfItem'
export default {
  mixins: [storeShelfMixin],
  components: {
      ShelfItem
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-list {
    position: absolute;
    top: px2rem(94);
    left: 0;
    z-index: 100;
    width: 100%;
  }
</style>
