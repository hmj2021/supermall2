<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tar-bar/>
  </div>
</template>

<script>
  import MainTarBar from "@/components/content/maintarbar/MainTarBar";
  export default {
    name: 'app',
    components: {
      MainTarBar
    }
  }
</script>

<style>
@import "assets/css/base.css";
</style>
