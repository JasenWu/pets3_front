let VueRouter = window.VueRouter
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

export const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
