<template>
  <div id = "app">
    <div id = "read"></div>
    <router-view/>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  global.ePub = Epub
  export default {
    name: 'name',
    mounted () {
    }
  }
</script>