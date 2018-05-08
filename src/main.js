
import router from '@/routes'//引入路由

 
require('@assets/css/index.less')//样式文件
let Vue = window.Vue

new Vue({
  router,
  template: `<router-view></router-view>`
}).$mount('#vue')
