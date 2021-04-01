<template>
  <div id="app">
    <span class="text">ABCDEFG</span>
    <router-view/>
  </div>
</template>

<script>
  export default {}
  // 设置一个名为DOMContentLoaded的监听事件，执行一个匿名的函数
  document.addEventListener('DOMContentLoaded', () => {
    // 选择根元素html
    const html = document.querySelector('html')
    // 获取屏幕宽度的十分之一为fontSize
    const fontSize = window.innerWidth / 10
    // 为屏幕设置一个最大值，当其大于50的时候将其设置为50，否则为其本身
    // eslint-disable-next-line no-const-assign
    fontSize = fontSize > 50 ? 50 : fontSize
    // 将根元素的fontSize设置为fontSize，因为rem是根据此来进行自适应的
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style scoped>
  .text {
    font-family: 'Days One';
    font-size: 1rem;
    color: orange;
  }
</style>
