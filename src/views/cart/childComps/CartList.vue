<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in $store.state.cartList"
                      :product="item"
                      :key="index">
      </cart-list-item>
    </scroll>

  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .content {
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 120;
  }
</style>
