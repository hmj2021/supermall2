<template>
  <div class="bottom-bar">
    <div class="tools">
      <div class="tools-item">
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div class="tools-item">
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div class="tools-item">
        <i class="icon select"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="buy-pre">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49px;
    background-color: #fff;
    z-index: 10;
  }
  .tools {
    display: flex;
    width: 50%;
    float: left;
    font-size: 14px;
    text-align: center;
  }
  .tools-item {
    flex: 1;
  }
  .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 8px auto 3px;
    background: url("~assets/images/detail/detail_bottom.png") 0 0/100%;
  }
  .service {
    background-position: 0 -54px;
  }
  .shop {
    background-position: 0 -98px;
  }

  .buy-pre {
    float: left;
    height: 49px;
    line-height: 49px;
    text-align: center;
    width: 50%;
  }
  .cart {
    float: left;
    width: 50%;
    background-color: orange;
    color: black;
  }
  .buy {
    float: left;
    width: 50%;
    background-color: #ff8198;
    color: #fff;
  }
</style>
