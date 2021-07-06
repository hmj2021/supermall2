<template>
  <div class="check-button" :class="{checked: isChecked}" @click="checkClick">
    <img src="~assets/images/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    checkClick() {

    }
  }
}
</script>

<style scoped>
  .check-button {

    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .checked {
    border-color: #ff5777;
    background-color: #ff5777;
  }
</style>
