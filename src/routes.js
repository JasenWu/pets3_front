
import { NAME, ROUTER_BASE_PATH } from '@config/index'
let VueRouter = window.VueRouter

const myRouter = new VueRouter({
  base: ROUTER_BASE_PATH,
 
  routes: [
		{
			path: '/',
			redirect: {name:'commit/form'} // 跳转至首页
		},
	]
})

myRouter.addRoutes(require('@views/commit/router').default)

myRouter.beforeEach((to, from, next) => {
  next()
})

myRouter.afterEach((route) => {
  let title = route.meta.title || NAME
  document.title = title
})

export default myRouter
