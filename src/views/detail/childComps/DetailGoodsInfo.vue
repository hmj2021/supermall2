<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0" >
    <div>
      {{detailInfo.desc}}
    </div>
    <div>
      {{detailInfo.detailImage[0].key}}
    </div>
    <div class="goods-info-img">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"
           :src="item" @load="imgLoad" alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength:0
    }
  },
  methods: {
    imgLoad() {
      //先自增再对比，将counter和图片长度做对比，当相等时，再发送事件。
      if (++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    }
  },
  //watch监听某一个属性的变化
  watch: {
    detailInfo() {
      //获取图片个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }

}
</script>

<style scoped>
  .goods-info-img img{
    width: 100%;
  }
</style>
