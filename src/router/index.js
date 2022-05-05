import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
import Layout from '@/views/layout/index'
import Home from '@/views/home/index'
import User from '@/views/user/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  // 用户编辑页面
  {
    path: '/user_info',
    component: () => import(/* webpackChunkName: "userInfo" */ '@/views/user/userInfo')
  },
  { // 文章详情页
    path: '/detail',
    component: () => import(/* webpackChunkName: "Detail" */ '@/views/articledetail')
  }
]

const router = new VueRouter({
  routes
})

export default router
