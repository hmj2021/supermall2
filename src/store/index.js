import Vue from "vue";
import Vuex from 'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
//1. 安装插件
Vue.use(Vuex)

//2. 创建Store对象

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
    //mutations唯一的目的就是修改states中的状态
    //它中的每个方法尽可能完成的事件比较的单一
    /*addCart(state,payload){
      //payload新添加的商品，判断新加商品的iid和cartlist中的某个iid相等
      let oldProduct = null;
      //for ..in得到的是数组的下标（键名）
      //for ..of得到的是数组的每一项值（键值）
      for(let item of state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item
        }
      }
      if(oldProduct){
        oldProduct.count += 1
      }else{
        payload.count = 1
        state.cartList.push(payload)
      }
    }*/
  actions,
})

//3.挂在Vue实例上

export default store
