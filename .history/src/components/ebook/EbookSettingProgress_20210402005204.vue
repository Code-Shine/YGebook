<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible == 2">
      <!-- 进度条 -->
      <div class="setting-progress" >
        <!-- 阅读时间栏 -->
      <div class="read-time-wrapper">
        <span class="read-time-text">111</span>
        <span class="icon-forward"></span>
      </div>
        <div class="progress-wrapper">
          <!-- 上一章按钮 -->
          <div class="progress-icon-wrapper"  @click="prevSection()">
            <span class="icon-back"></span>
          </div>
          <input class="progress" type="range"
                 max="100"
                 min="0"
                 step="1"
                 @change="onProgressChange($event.target.value)" @input="onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
           <!-- 下一章按钮 -->
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward" ></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  computed: {
    // 自动获取章节的名称
    getSectionName() {
      if (this.section) {
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          // 通过navigation对象的get方法来获取章节的名称
          return this.currentBook.navigation.get(sectionInfo.href).label
        }
      }
    }
  },
  methods: {
    onProgressChange(progress) { // 拖动松手的调用方法
      this.setProgress(progress).then(() => { // 设置vuex的值然后进行异步的调用displayProgress()
        this.displayProgress()
        this.updateProgressBg()
      })
    },
    onProgressInput(progress) {
     // 拖动的时候也能设置百分比
       this.setProgress(progress).then(() => {
         this.updateProgressBg()
       })
    }, // 拖动过程中调用的方法
    displayProgress() {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      // console.log(cfi)
      this.currentBook.rendition.display(cfi)// 展示cfi相应的定位
    },
    updateProgressBg() {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      // this.$refs.progress.style.backgroundSize = '50% 100%'
      // console.log(this.$refs.progress.style.backgroundSize)
    },
    prevSection() {
      // 章节需要大于0以及书籍是解析完毕的
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
         this.displaySection()
        })
      }
    },
    nextSection() {
      // 不能超过最大的章节数以及书籍是解析完毕的
      if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    },
    displaySection() {
        const sectionInfo = this.currentBook.section(this.section)

          if (sectionInfo && sectionInfo.href) {
            this.currentBook.rendition.display(sectionInfo.href).then(() => {
              // 回调一个方法
              this.refreshLocation()
            })
          }
    },
    refreshLocation() {
      // currentLocation可以获得.rendition中的一个对象,其记录一些信息，比如当前页面在本书的什么位置，可以此来设置进度条
      const currentLocation = this.currentBook.rendition.currentLocation()
      // currentLocation.start.cfi为本章的开始位置，通过percentageFromCfi获得百分比
      const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
      // 设置进度条
      this.setProgress(Math.floor(progress * 100))
    }
  },
  updated() {
    this.updateProgressBg()
  }
}
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss";
   .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
        position: relative;
        width: 100%;
        height: 100%;
        .read-time-wrapper {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: px2rem(40);
          font-size: px2rem(12);
          @include center;
        }
        .progress-wrapper {
          width: 100%;
          height: 100%;
          @include center;
          padding: 0 px2rem(15);
          box-sizing: border-box;
          .progress-icon-wrapper {
            font-size: px2rem(20);
          }
          .progress {
            width: 100%;
            -webkit-appearance: none;
            height: px2rem(2);

            margin: 0 px2rem(10);

            &:focus {
              outline: none;
            }
            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: px2rem(20);
              width: px2rem(20);
              border-radius: 50%;
              background: white;
              box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
              border: px2rem(1) solid #ddd;
            }
          }
        }
        .text-wrapper {
          position: absolute;
          left: 0;
          bottom: px2rem(10);
          width: 100%;
          color: #333;
          font-size: px2rem(12);
          text-align: center;
          .progress-section-text{
            margin: px2rem(10)
          }

        }
      }
  }
</style>
