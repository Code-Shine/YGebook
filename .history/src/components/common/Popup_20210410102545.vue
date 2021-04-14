<template>
  <div class="popup" v-show="popupVisible">
    <div class="popupbg"></div>
    <div class="popup-wrapper">
      <div class="popup-title" v-if="title && title.length > 0">{{tiltle}}</div>
      <div class="popup-btn"
        :class="{'danger': item.type==='danger'}"
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
  },
  methods: {
    show() {
      this.popupVisible = true
    },
    hide() {
      this.popupVisible = false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

</style>
