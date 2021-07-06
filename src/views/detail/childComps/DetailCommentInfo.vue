<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment">
    <div class="comment-top">
      <hr>
      <span>用户评价</span>
      <span class="more">更多</span>
      <hr>
    </div>
    <div class="comment-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span class="user-name">{{commentInfo.user.uname}}</span>
    </div>
    <div class="comment-content">
      <p>{{commentInfo.content}}</p>
      <span class="time">{{commentInfo.created | showDate}}</span>
      <span class="style">{{commentInfo.style}}</span>
    </div>
    <div class="comment-imgs">
      <img :src="item" v-for="(item, index) in commentInfo.images" :key="index"/>
    </div>

  </div>
</template>

<script>
import {formatDate} from '@/common/utils';
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  //将时间戳转换成常用时间格式
  filters: {
    showDate(value) {
      //1.将时间戳转成Date对象
      const date = new Date(value * 1000)
      //2.将date格式化
      return formatDate(date,'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .comment {
    padding: 10px 0;
  }
  .comment-top {
    font-size: 16px;
    color: #ff8198;
    height: 30px;
    line-height: 30px;
  }
  .comment-imgs img {
    width: 50px;
    height: 50px;
  }
  .more {
    float: right;
  }
  .comment-user img {
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-top: 10px;
  }
  .user-name {
    display: inline-block;
    padding: 10px;
  }
  .comment-content p {
    text-indent: 2em;
  }
</style>
