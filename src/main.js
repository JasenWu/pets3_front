import 'babel-polyfill'
import Vue from 'vue'
import myRouter from '@/routes'
// 样式文件

import ElementUI from 'element-ui'// 引入路由

require('@assets/css/index.less')

Vue.use(ElementUI)

new Vue({
  el: '#vue',
  router: myRouter,
  template: `<router-view></router-view>`
})
