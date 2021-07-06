import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh,50)

    //1. 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
      //this.$refs.scroll.refresh()
    },
      this.$bus.$on('itemImageLoad', this.itemImgListener)
   // console.log('我是混入中的内容')
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick1() {
      //通过ref获得组件scroll中的scroll属性；scrollTo(x,y,毫秒)
      this.$refs.scroll.scrollTo(0,0,0)
    }
  }
}
