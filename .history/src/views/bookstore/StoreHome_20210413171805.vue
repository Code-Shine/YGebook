<!-- 书城首页组件 -->
<template>
  <div class="store-home">
   <search-bar></search-bar>
    <!-- <flap-card :data="random"></flap-card> -->
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">

      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"></div>
      </div>
      <!-- 推荐 -->
      <recommend :data="recommend" class="recommend"></recommend>
      <guess-you-like :data="guessYouLike"></guess-you-like>

      <!-- <featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" class="featured"></featured> -->
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="categories" :data="categories"></category>
    </scroll>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar.vue'
import Scroll from '../../components/common/Scroll'
import { storeHomeMixin } from '../../utils/mixin'
//  import FlapCard from '../../components/home/FlapCard'
 import { home } from '../../api/store' // 请求方法

 import GuessYouLike from '../../components/home/GuessYouLike'
  import Recommend from '../../components/home/Recommend'
  //  import Featured from '../../components/home/Featured'
    import CategoryBook from '../../components/home/CategoryBook'
  import Category from '../../components/home/Category'

  export default {
  mixins: [storeHomeMixin],
  components: {
    SearchBar,
    Scroll,
    // FlapCard,
    GuessYouLike,
    Recommend,
    // Featured,
    Category,
      CategoryBook
    },
    data() {
      return {
            scrollTop: 94,
            banner: '',
            guessYouLike: null,
            recommend: null,
            featured: null,
            categoryList: null,
            categories: null,
            random: null
          }
      },
    methods: {
      onScroll(offsetY) {
        // console.log(offsetY)
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          // 如果滚动超过0，则隐藏标题，滚动条距顶部为52像素
          this.scrollTop = 52
        } else {
          // 如果滚动为0，则显示标题，滚动条距顶部为94像素
          this.scrollTop = 94
        }
        // 刷新滚动条
        this.$refs.scroll.refresh()
      }
    },
    mounted() {
      // 通过API获取首页数据,使用mock.js以及axios来进行模拟
      home().then(response => {
        if (response && response.status === 200) {
          const data = response.data
          // 生成随机数
          const randomIndex = Math.floor(Math.random() * data.random.length)
          // console.log(randomIndex)
          // 通过随机数拿到图书
          this.random = data.random[randomIndex]
          // console.log(this.random)
          this.banner = data.banner
          this.guessYouLike = data.guessYouLike
          this.recommend = data.recommend
          this.featured = data.featured
          this.categoryList = data.categoryList
          this.categories = data.categories
        }
      })
    }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .store-home {
    width: 100%;
    height: 100%;
    .banner-wrapper {
      width: 100%;
      padding: px2rem(10);
      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: px2rem(150);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .recommend {
      margin-top: px2rem(0);
    }
    .featured {
      margin-top: px2rem(20);
    }
    .category-list-wrapper {
      margin-top: px2rem(20);
    }
    .categories {
      margin-top: px2rem(20);
    }
  }
</style>
