<template>
  <div id="app">
    <span class="text">ABCDEFG</span>
    <router-view/>
  </div>
</template>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    const fontSize = window.innerWidth / 10
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style scoped>
  .text {
    font-family: 'Days One';
    font-size: 20px;
    color: orange;
  }
</style>
