<template>
  <div class="cart-list">
    <div class="check">
      <check-button :is-checked="product.checked" @click.native="isChecked"></check-button>
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
  },
  methods: {
    isChecked() {
      //修改模型中的属性
      this.product.checked = !this.product.checked
    }
  }
}
</script>

<style scoped>
  .cart-list {
    display: flex;
    border-bottom: 2px solid #999999;
    padding: 10px 0;
  }
  .cart-img {
    display: flex;
  }
  .cart-img img{
    height: 130px;
  }
  .title {
    display: inline-block;
    height: 50px;
    width: 260px;
    font-size: 17px;
    /*CSS控制文字只显示一行，超出部分显示省略号(给宽度）*/
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .desc {
    display: inline-block;
    height: 30px;
    width: 260px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .price {
    color: var(--color-tint);
    font-size: 18px;
  }
  .count {
    margin-left: 150px;
  }
  .check {
    width: 20px;
    margin-top:55px;

  }
</style>
