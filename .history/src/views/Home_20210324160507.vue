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
      // 解析电子书
      this.book = new Epub('public/2018_Book_AgileProcessesInSoftwareEngine.epub')
      // 打印book对象查看是否解析成功 console.log(this.book)
      this.book.renderTo('read',{
        width: window.innerWidth , 
        height: window.innerHeight
      }).display()
    }
  }
</script>
