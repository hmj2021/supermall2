<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" />
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div>
        <div>总销量：{{shop.sells}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .shop-info {
    /*遮盖住底下的tabBar*/
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .shop-top img {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .title {
    display: inline-block;
    padding: 15px 0;
  }
</style>
