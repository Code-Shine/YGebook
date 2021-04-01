<template>
  <div class="home">
    <div id = "read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  global.ePub = Epub
  export default {
    name: 'name',
    mounted () {
      this.book = new Epub('public\2018_Book_AgileProcessesInSoftwareEngine.epub')
    }
  }
</script>
