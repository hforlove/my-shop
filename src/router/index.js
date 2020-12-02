
import Vue from 'vue'
import VueRouter from 'vue-router'

import { getToken } from 'utils/index'

Vue.use(VueRouter)

const whiteRouters = ['login']

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('view/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('view/home')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('view/category')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('view/cart')
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('view/goods')
  },
  {
    path: '/goodsDetail/:id',
    name: 'goodsDetail',
    component: () => import('view/goodsDetail')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('view/user')
  },
  {
    path: '/userForm',
    name: 'userForm',
    component: () => import('view/user/userForm')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('view/user/about')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('view/address')
  },
  {
    path: '/addressForm',
    name: 'addressForm',
    component: () => import('view/address/addressForm')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('view/test')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    next()
  } else {
    if (whiteRouters.includes(to.name)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
