<template>
  <div id="home">
<!--顶部条-->
    <nav-bar class="home-nav">
      <div slot="center">女装铺子</div>
    </nav-bar>
<!--轮播图-->
    <swiper>
    <!--是一个数组，所以不需要一个个写，只需要v-for循环获取，这样不管数组里有几个数据-->
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
<!--推荐栏-->
    <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
<!--本周流行（一张图片）-->
    <div class="popular">
      <a href="http://adi-v3.dev">
        <img src="~assets/images/home/recommend_bg.jpg" alt="">
      </a>
    </div>
<!--商品展示分类控制-->
    <tab-control :titles="['流行', '新款', '精选']"
                 class="tab-control" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"></goods-list>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>





</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar";

    //import {Swiper} from "@/components/common/swiper/Swiper";
    //import {SwiperItem} from "@/components/common/swiper/SwiperItem";
    //这就是index.js的作用
    import {Swiper,SwiperItem} from "@/components/common/swiper";

    import TabControl from "@/components/content/tabControl/TabControl";
    import GoodsList from "@/components/content/good/GoodsList";
    import {getHomeMultiData,getHomeGoods} from "@/network/home";

    export default {
      name: "Home",
      components: {
        NavBar,
        Swiper,
        SwiperItem,
        TabControl,
        GoodsList,
      },
      data() {
        return {
          banners: [],
          recommends: [],
          goods:{
            pop:{page:0, list:[]},
            new:{page:0, list:[]},
            sell:{page:0, list:[]}
          },
          currentType: 'pop'
        }
      },
      computed: {
        showGoods() {
          return this.goods[this.currentType].list
        }
      },
      created() {
        //1. 请求多个数据
       this.getHomeMultiData()
        //2. 请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('new')
       this.getHomeGoods('sell')
      },
      methods: {
        /**
         * 监听事件的方法
         */
        tabClick(index) {
          //console.log(index)
          switch (index) {
             case 0:
              this.currentType = 'pop'
               console.log(this.currentType)
                   break
             case 1:
               this.currentType = 'new'
               console.log(this.currentType)
                  break
             case 2:
               this.currentType = 'sell'
               console.log(this.currentType)
                   break
           }
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
          })
        }
      }
    }
</script>

<style scoped>
  #home {
    padding-top: 40px;
  /*  轮播图被顶部遮盖住了，所以为home顶部设置填充，撑起来*/
  }
  .home-nav {
    /*使用统一设置的背景色base.css*/
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  /*  不加z-index会使得被下面的轮播图掩盖*/
  }
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    flex: 1;

  }
  .recommend-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 5px;
  }

  .popular img{
    width: 100%;
  }
  .tab-control {
    /*实现当其距离top：44px 时固定在此处，没有达到44px时，则恢复跟随网页滚动*/
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9; /* 避免商品滚动是覆盖 */
  }
</style>
