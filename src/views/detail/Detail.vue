<template>
  <div id="detail">
    <detail-nav-bar @itemClick="itemClick" ref="navBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="scrollPosition" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick1"  v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/good/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import {backTopMixin, itemListenerMixin} from "@/common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    //BackTop,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener: null
      themeTopYs: [],
      currentIndex: 0,
      //isShowBackTop: false,

    }
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求数据
    getDetail(this.iid).then(res => {
      //console.log(res)
      //1.获取顶部轮播图片
      const data = res.result
      this.topImages = data.itemInfo.topImages

      //2.获取商品信息（标题价格等。。）
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //4.获取商品详细信息
      this.detailInfo = data.detailInfo

      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //请求推荐数据
    getRecommend().then(res => {
      //console.log(res)
      this.recommends = res.data.list
    })
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //console.log(this.themeTopYs)

    },
    itemClick(index) {
      //console.log(this.themeTopYs[index])
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    // mixin
    // backClick1() {
    //   //通过ref获得组件scroll中的scroll属性；scrollTo(x,y,毫秒)
    //   this.$refs.scroll.scrollTo(0,0,0)
    // },
    scrollPosition(position) {
      //backTop
      this.isShowBackTop = -position.y > 500

      //1.获取滚动的y值
      const positionY = -position.y
      //2.判断y值在哪个区域
      //console.log(positionY)
      //当0<=positionY<themeTopYs[1],index=0
      //当themeTopYs[1]<=positionY<themeTopYs[2],index=1
      //当themeTopYs[2]<=positionY<themeTopYs[3],index=2

      //当themeTopYs[3]<=position,index=3
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++){
        //this.currentIndex !== i 该条件是为了减少多次判断
        //i === length-1 不是 = ，一个等号是赋值，这里是判断。 一个等号导致了页面卡断滚动不了，刷新不了
        if ( this.currentIndex !== i
          && ((i < length-1 && positionY < this.themeTopYs[i + 1]
          && positionY >= this.themeTopYs[i])
          || (i === length-1 &&  positionY >= this.themeTopYs[i]))) {
          //console.log(i)
          this.currentIndex = i
          //3. 将该curerentIndex赋值给navBar组件中的currentIndex
          this.$refs.navBar.currentIndex = this.currentIndex

        }
      }
    },
    addCart() {
      //  1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;



      // 2. 将商品添加到购物车里
      //this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        console.log(this.$toast)
        this.$toast.show(res,2000)
      })




    },
  },
  mounted() {
    //mixin.js
  },
  destroyed() {
    //  取消全局事件的监听
    this.$bus.$off('itmeImageLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 9;
    background-color: #fff;
  }

</style>
