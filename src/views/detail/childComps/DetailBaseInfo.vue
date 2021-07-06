<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="detail-title">
      {{goods.title}}
    </div>
    <div class="detail-price">
      <span class="nPrice">{{goods.newPrice}}</span>
      <span class="oPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="detail-info">
      <span class="columns0">{{goods.columns[0]}}</span>
      <span class="columns1">{{goods.columns[1]}}</span>
      <span class="columns2">{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="detail-service">
      <span class="service-item" v-for="index in goods.services.length-1"
            :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .detail-title {
    color: black;
  }
  .detail-price {
    height: 30px;
  }
  .nPrice {
    color: var(--color-tint);
    font-size: 20px;
  }
  .oPrice {
    /*加中划线*/
    text-decoration: line-through;
    font-size: 13px;
    padding: 0 10px;
  }
  .discount {
    background-color: #ff8198;
    color: #fff;
    font-size: 10px;
    border-radius: 8px;
    padding:3px;
  }
  .detail-info {
    font-size: 13px;
    display: flex;
    height: 40px;
    line-height: 40px;
  }
  .columns0 {
    float: left;
  }
  .columns1 {
    flex: 1;
    width: 100px;
    /*span是行内元素，其宽高根据内容决定，将其改为行内块元素*/
    display: inline-block;
    text-align: center;
  }
  .columns2 {
    float: right;
  }
  .detail-service {
    font-size: 12px;
    display: flex;
    height: 30px;
    line-height: 30px;
  }
  .service-item {
    flex: 1;
  }
  .service-item img{
    width: 16px;
    height: 16px;
    padding-top: 5px;
  }
</style>
