<template>
  <div class="shelf-item"
  :class="{'shelf-item-shadow': data.type === 1 || data.type === 2}"
   @click="onItemClick">
    <component :is="item" :data="data"></component>
  </div>
</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
  import ShelfBook from './ShelfItemBook'
  import ShelfCategory from './ShelfItemCategory'
  import ShelfAdd from './ShelfItemAdd'
  import { gotoStoreHome } from '../../utils/store'
export default {
  mixins: [storeShelfMixin],
  props: {
      data: Object
    },
  computed: {
      item() {
        return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
      }
    },
     data() {
      return {
        book: ShelfBook,
        category: ShelfCategory,
        add: ShelfAdd
      }
    },
    methods: {
      onItemClick() {
        if (this.data.type === 1) {
          this.showBookDetail(this.data)
        } else if (this.data.type === 2) {

        } else {
          gotoStoreHome()
        }
      }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
    .shelf-item {
      position: relative;
      width: 100%;
      height: 100%;
      // background: mediumvioletred;
     &.shelf-item-shadow {
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .3);
    }
    }
</style>
