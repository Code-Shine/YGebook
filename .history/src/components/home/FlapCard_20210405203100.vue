<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible"></div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin'
  export default {
    mixins: [storeHomeMixin]
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

</style>
