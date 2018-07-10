const moduleId = 'detail'
let modules = {}

modules['layout'] = (resolve) => {
  require.ensure([], () => { resolve(require('@views/_layout/layout')) }, `commit`)
}

modules['detail'] = (resolve) => {
  require.ensure([], () => { resolve(require('./detail')) }, `detail`)
}

let routerArr = {
  'detail': {title: 'Chapter Details'}

}

let routes = []
for (let k in routerArr) {
  let meta = routerArr[k] || {}
  let cRouter = {
    path: `${k}`,
    name: `${moduleId}/${k}`,
    component: modules[k],
    meta: meta
  }
  routes.push(cRouter)
}

let layoutRoute = [{
  path: `/${moduleId}`,
  name: `${moduleId}`,
  component: modules['layout'],
  children: routes
}]

export default layoutRoute
