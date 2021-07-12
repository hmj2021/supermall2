import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";

import toast from '@/components/common/toast'

Vue.config.productionTip = false

//默认情况下$bus是没有值的
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
