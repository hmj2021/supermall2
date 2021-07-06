<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">女装铺子</div>
    </nav-bar>
    <tab-control  class="tab-control"
                  ref="tabControl1"
                  :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="Content"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-popular></home-popular>
      <tab-control  ref="tabControl2"
                    :titles="['流行', '新款', '精选']"
                    @tabClick="tabClick"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick1" v-show="isShowBackTop"></back-top>
  </div>


</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar";
    import HomeSwiper from "@/views/home/childComps/HomeSwiper";
    import HomeRecommend from "@/views/home/childComps/HomeRecommend";
    import HomePopular from "@/views/home/childComps/HomePopular";
    import TabControl from "@/components/content/tabControl/TabControl";
    import GoodsList from "@/components/content/good/GoodsList";
    import Scroll from "@/components/common/scroll/Scroll";
    import BackTop from "@/components/content/backTop/BackTop";
    import {itemListenerMixin, backTopMixin} from "@/common/mixin";

    import {getHomeMultiData,getHomeGoods} from "@/network/home";


    export default {
      name: "Home",
      components: {
        NavBar,
        HomeSwiper,
        HomeRecommend,
        HomePopular,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
      },
      mixins: [itemListenerMixin, backTopMixin],
      data() {
        return {
          banners: [],
          recommends: [],
          goods:{
            pop:{page:0, list:[]},
            new:{page:0, list:[]},
            sell:{page:0, list:[]}
          },
          currentType: 'pop',
          //isShowBackTop: false,
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY: 0,
          // itemImgListener: null
        }
      },
      computed: {
        showGoods() {
          return this.goods[this.currentType].list
        }
      },
      activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
      //  取消全局事件的监听
        this.$bus.$off('itmeImageLoad', this.itemImgListener)
      },
      created() {
        //1. 请求多个数据
       this.getHomeMultiData()
        //2. 请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('new')
       this.getHomeGoods('sell')
      },
      mounted() {
        //mixin.js

        //2. 获取tab-control的offsetTop
        //所有组件都有一个属性$el:用于获取组件中的元素
        //console.log(this.$refs.tabControl2.$el.offsetTop);
      },
      methods: {
        //封装到common utils中
        // debounce(func,delay) {
        //   let timer = null
        //   //...表示可以不只是一个参数
        //   return function (...args){
        //     if(timer) clearTimeout(timer)
        //     timer = setTimeout(() => {
        //       func.apply(this,args)
        //     },delay)
        //   }
        // },

        /**
         * 监听事件的方法
         */
        tabClick(index) {
          //console.log(index)
          switch (index) {
             case 0:
              this.currentType = 'pop'
                   break
             case 1:
               this.currentType = 'new'
                  break
             case 2:
               this.currentType = 'sell'
                   break
           }
           //1，2tab-control需要保持一致，无论点击谁，两者展示一致
           this.$refs.tabControl1.currentIndex = index ;
           this.$refs.tabControl2.currentIndex = index ;
        },
        // mixin
        // backClick1() {
        //   //通过ref获得组件scroll中的scroll属性；scrollTo(x,y,毫秒)
        //   this.$refs.scroll.scrollTo(0,0,0)
        // },
        Content(position) {
          //console.log(position)
          this.isShowBackTop = -position.y > 500
          //tab-control吸顶
          this.isTabFixed = -position.y > this.tabOffsetTop

        },
        loadMore() {
          this.getHomeGoods(this.currentType)
        },
        swiperImageLoad() {
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },
        /**
         * 网络请求相关方法
         */

        getHomeMultiData() {
          getHomeMultiData().then(res => {
            //console.log(res);
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
        getHomeGoods(type) {
          const page = this.goods[type].page + 1
          getHomeGoods(type,page).then(res => {
            //console.log(res)
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            //完成了上拉加载更多，
            this.$refs.scroll.finishPullUp()
          })
        }
      }
    }
</script>

<style scoped>
/*scoped 作用域，只作用于本文档的样式*/
  #home {
    /*padding-top: 40px;*/
  /*  轮播图被顶部遮盖住了，所以为home顶部设置填充，撑起来*/
  }
  .home-nav {
    /*使用统一设置的背景色base.css*/
    background-color: var(--color-tint);
    color: #fff;
    /*应用了beter-scroll,就不需要固定，*/
    /*因为beeter-scroll只在固定区域滚动，不影响顶部导航*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  /*  不加z-index会使得被下面的轮播图掩盖*/
  }

  /*.tab-control {*/
  /*  !*实现当其距离top：44px 时固定在此处，没有达到44px时，则恢复跟随网页滚动*!*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  background-color: #fff;*/
  /*  z-index: 9; !* 避免商品滚动是覆盖 *!*/
  /*}*/
  .tab-control {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .fixed {
    position: fixed;
    top: 44px;
  }

  .content {
    /*height: 300px;*/
    overflow: hidden;
    /*计算滚动容器的具体高度=总的高度-顶部高度-底部高度*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
