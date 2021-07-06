<template>
  <div>
    <div class="check">
      <check-button></check-button>
    </div>
    <div class="cart-img">
      <img :src="product.image" alt="">
    </div>
    <div class="cart-detail">
      <span class="title">{{product.title}}</span><br>
      <span class="desc">{{product.desc}}</span><br>
      <span class="price">￥{{product.price}}</span>
      <span class="count">x{{product.count}}</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .cart-img {
    width: 30%;
  }
  .cart-img img{
    height: 130px;
  }
  .cart-detail {
    width: 70%;
  }
  .title {
    font-size: 14px;
  }
  .desc {
    font-size: 12px;
  }
  .price {
    color: var(--color-tint);
    font-size: 18px;
  }
  .count {
    float: right;
  }
  .check {
    width: 20px;
    /*justify-content: center;*/
    /*align-items: center;*/
  }
</style>
