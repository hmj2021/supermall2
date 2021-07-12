<template>
  <div class="cart">
    <nav-bar class="nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
    export default {
      name: "Cart",
      components: {
        CartBottomBar,
        NavBar,
        CartList,
      },
      computed: {
        cartLength() {
          return this.$store.state.cartList.length
        }
      }
    }
</script>

<style scoped>
  .nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
