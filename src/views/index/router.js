const moduleId = 'index'
let modules = {}

modules['layout'] = (resolve) => {
  require.ensure([], () => { resolve(require('@views/_layout/layout')) }, `commit`)
}

modules['index'] = (resolve) => {
  require.ensure([], () => { resolve(require('./index')) }, `index`)
}

let routerArr = {
  'index': {title: 'Unit List'}

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
