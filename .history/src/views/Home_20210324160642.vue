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
      // 通过renderTo方法去设置渲染书籍，设置宽高都屏幕宽高，使用display方法进行渲染
      this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      }).display()
    }
  }
</script>
