<template>
  <div class="popup" v-show="popupVisible">
    <div class="popup-wrapper">
      <div class="popup-title" v-if="title && title.length > 0">{{tiltle}}</div>
      <div class="popup-btn"
        v-for="(item, index) in btn"
        :key="index"
        @click="item.click">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popop',
  props: {
    tiltle: String,
    btn: Array
  },
  data() {
    return {
      popupVisible: false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

</style>
