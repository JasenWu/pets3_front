let VueRouter = window.VueRouter
import Form from '@views/commit/form.vue'
import Success from '@views/commit/success.vue'
import { NAME, ROUTER_BASE_PATH } from '@config/index'


const myRouter = new VueRouter({
  base: ROUTER_BASE_PATH,
  path: '/',
  redirect: { name: 'commit/form' } // 跳转至首页
})

myRouter.addRoutes(require('@views/commit/router').default);

myRouter.beforeEach((to, from, next)=>{
	next();
});

myRouter.afterEach((route) => {
  let title = route.meta.title || NAME;
  document.title = NAME;
});


export default myRouter;




