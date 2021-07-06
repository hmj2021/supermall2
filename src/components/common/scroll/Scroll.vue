<template>
<!--  ref通常用于绑定子组件-->
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //避免钩子函数中变量使用完就被销毁
      scroll:{
        type:Object,
        default() {
          return {}
        }
      }
    }
  },
  mounted() {
    //通过标签以下方式获取不是特别严谨，class可能重复
    //this.scroll = new BScroll(document.querySelector('.wrapper'))
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      scrollY: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //监听滚动
    if (this.probeType === 2 || this.probeType === 3)
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
    //3.监听上拉事件
    if (this.pullUpLoad){
      this.scroll.on('pullingUp',() =>{
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
