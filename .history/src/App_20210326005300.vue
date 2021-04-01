<template>
  <div id="app">
    <span class="text">ABCDEFG</span>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
    const getters = {
        a: () => 1,
        b: () => 2
    }
  function fn(keys) {
      const data = {}
      keys.forEach(key => {
        //判断这个key是否是getters中的值
        if (getters.hasOwnProperty(key) {
          data[key] = getters[key]
        }
      })
      return data
  }
  export default {
    // 混入到computed中
    computed: {
      ...mapGetters(['test']),
      ...fn(['a', 'b', 'c'])
    },
    mounted() {
      // 获取和改变store中test的值
      // this.$store.dispatch('setTest', 10).then(() => {
      //   console.log(this.test)
      // })
      console.log(this.a, this.b)
    }
  }
  // 设置一个名为DOMContentLoaded的监听事件，执行一个匿名的函数
  document.addEventListener('DOMContentLoaded', () => {
    // 选择根元素html
    const html = document.querySelector('html')
    // 获取屏幕宽度的十分之一为fontSize
    let fontSize = window.innerWidth / 10
    // 为屏幕设置一个最大值，当其大于50的时候将其设置为50，否则为其本身
    // eslint-disable-next-line no-const-assign
    fontSize = fontSize > 50 ? 50 : fontSize
    // 将根元素的fontSize设置为fontSize，因为rem是根据此来进行自适应的
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style lang="scss" scoped>
  /* 引入global.scss的样式 */
  @import './assets/styles/global.scss';
  .text {
    font-family: 'Days One';
    font-size: px2rem(20);
    color: red;
  }
</style>
