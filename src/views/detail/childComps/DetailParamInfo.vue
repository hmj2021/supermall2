<template>
  <div v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table, index) in paramInfo.sizes">
      <tr v-for="(tr, index) in table">
          <td v-for="(td, index) in tr">{{td}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
