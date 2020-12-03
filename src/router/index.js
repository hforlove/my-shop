
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
    component: () => import('view/user/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('view/home/home')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('view/category/category')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('view/cart/cart')
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('view/goods/goods')
  },
  {
    path: '/goodsDetail/:id',
    name: 'goodsDetail',
    component: () => import('view/goods/goodsDetail')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('view/user/user')
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
    component: () => import('view/address/address')
  },
  {
    path: '/addressForm',
    name: 'addressForm',
    component: () => import('view/address/addressForm')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('view/order/order')
  },
  {
    path: '/orderDetail/:id',
    name: 'orderDetail',
    component: () => import('view/order/orderDetail')
  },
  {
    path: '/orderCreate',
    name: 'orderCreate',
    component: () => import('view/order/orderCreate')
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
