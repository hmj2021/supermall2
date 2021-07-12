export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {

      //payload新添加的商品，判断新加商品的iid和cartlist中的某个iid相等
      let oldProduct = null;
      //for ..in得到的是数组的下标（键名）
      //for ..of得到的是数组的每一项值（键值）
      for(let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item
        }
      }
      if(oldProduct){
        //oldProduct.count += 1
        context.commit('addCounter',oldProduct)
        resolve('当前商品数量+1')
      }else{
        payload.count = 1
        context.commit('addToCart',payload)
        resolve('添加新的商品')
      }

    })

  }
}
