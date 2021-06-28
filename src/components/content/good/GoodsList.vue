<template>
    <div class="good-list">
      <good-list-item v-for="item in goods"  :good-item="item"/>
    </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";
  export default {
    name: "GoodsList",
    props:{
        goods:{
            type:Array,
            default() {
                return []
            }
        }
    },
    components:{
      GoodListItem
    }
  }
</script>

<style scoped>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);

    padding: 2px;
  }

</style>
