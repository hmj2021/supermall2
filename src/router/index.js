import Vue from 'vue'
import  VueRouter from 'vue-router'

//懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Me = () => import('views/me/Me')
const Detail = () => import('views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  //配置映射关系
  {
    //重定向
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    // 指定的组件
    component:Home
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/me',
    component:Me
  },
  {
    path: '/detail/:iid',
    component:Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history',

})

// 3.导出
export default router
