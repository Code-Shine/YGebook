<template>
  <div class="shelf-item-book">
    <img class="shelf-item-book-cover" :src="data.cover">
  </div>
</template>

<script>
export default {
    props: {
      data: Object
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

</style>
