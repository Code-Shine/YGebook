<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
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
    background: rgba(0,0,0,.6)
  }

</style>
