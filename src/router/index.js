// 该文件用于创建一个Vue中的路由器（router）

// 引入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Profile = () => import('@/views/profile/Profile')
const Shopcart = () => import('@/views/shopcart/Shopcart')
const Detail =() => import('@/views/detail/Detail')

// 安装插件
Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location)
}

// 创建一个路由器（router）用于管理整个vue项目中所有的路由（route）
const routes = [
   {
    path:'/home',
    component:Home
   },
   {
    path:'/category',
    component:Category
   },
   {
    path:'/profile',
    component:Profile
   },
   {
    path:'/shopcart',
    component:Shopcart
   },
   {
     path:'/detail/:iid',
     component:Detail
   }
]

const router  = new VueRouter({
    routes,
    mode:'history',
})

// 导出router
export default router