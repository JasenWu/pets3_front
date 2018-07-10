import Vue from 'vue'
import VueRouter from 'vue-router'

import { NAME, ROUTER_BASE_PATH } from '@config/index'
Vue.use(VueRouter)

const myRouter = new VueRouter({
  base: ROUTER_BASE_PATH,

  routes: [
    {
      path: '/',
      redirect: {name: 'index/index'} // 跳转至首页
    }
  ]
})

myRouter.addRoutes(require('@views/index/router').default)
myRouter.addRoutes(require('@views/detail/router').default)

myRouter.addRoutes(require('./views/error/router').default) // 此路由放在最后

myRouter.beforeEach((to, from, next) => {
  next()
})

myRouter.afterEach((route) => {
  let title = route.meta.title || NAME
  document.title = title
})

export default myRouter
