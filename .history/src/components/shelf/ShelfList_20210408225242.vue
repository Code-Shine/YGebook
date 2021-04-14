<template>
  <div class="shelf-list">
    <transition-group name="list"
                        tag="div"
                        id="shelf-list">
        <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
          <shelf-item :data="item" :style="{height: itemHeight}"></shelf-item>
          <div class="shelf-list-title-wrapper">
            <span class="shelf-list-title title-small">{{item.title}}</span>
          </div>
        </div>
      </transition-group>
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
