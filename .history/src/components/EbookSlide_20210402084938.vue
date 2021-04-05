<template>
  <div class="slide-content-wrapper">
    <div class="content"></div>
      <div class="content-page-wrapper">
        <div class="content-page"></div>
        <div class="content-page-tab"></div>
      </div>
    <div class="content-bg"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss";
    .slide-content-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 300;
      display: flex;
      width: 100%;
      height: 100%;
      .content{
        flex: 0 0 85%;
        width: 85%;
        height: 100%;
        .content-page-wrapper{
          .content-page{

          }
          .content-page-tab{

          }
        }
      }
      .content-bg{
        flex: 0 0 15%;
        width: 15%;
        height: 100%;
      }
    }
</style>
