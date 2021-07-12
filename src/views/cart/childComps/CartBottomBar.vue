<template>
  <div class="bottom-bar">
    <div class="check">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：￥ {{totalPrice}}
    </div>
    <div class="to-buy" @click="buyClick">
      去结算 ( {{checkedLength}} )
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {CheckButton},
  computed: {
    totalPrice() {
      //过滤
      //.toFixed(2)保留两位小数
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkedLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      //过滤只要没有选中的长度有值就为true,要取反则checked变为false
      // 表示只要有一个没有选中，则全选就不被选中，首先要判断cartList是否有值，否则为undefind,取反为true。
      if(this.$store.state.cartList.length === 0) return false
     //return !this.$store.state.cartList.filter(item => !item.checked).length
     // find函数是只要一旦查找到就return，find函数性能好一些
      return !(this.$store.state.cartList.find(item => !item.checked))
    },

  },
  methods: {
    selectAllClick() {
      //如果全选中，则全部取消
      //如果有没有选中的，则全部选中
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    buyClick() {
      //如果一个都没有选中，则调用toast插件中的show方法
      if(!this.isSelectAll){
        this.$toast.show('请选择需要购买的商品')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 49px;
    display: flex;
    background-color: beige;
  }
  .check {
    display: flex;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
  }
  .total-price {
    margin-left: 30px;
    flex: 1;
  }
  .to-buy {
    width: 90px;
    background-color: #ff5777;
    color: #fff;
  }
</style>
