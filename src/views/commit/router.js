const moduleId = 'commit';
let modules = {};

modules['layout'] = (resolve) => {
	require.ensure([], () => {resolve(require('@views/_layout/layout'));}, `commit`);
};

modules['form'] = (resolve) => {
	require.ensure([], () => {resolve(require('./form'));}, `commit`);
};
modules['success'] = (resolve) => {
	require.ensure([], () => {resolve(require('./success'));}, `commit`);
};

let routerArr = {
  'form': {title: '提交表单'},
  'success':{title:'成功提交'}
};

let routes = [];
for(let k in routerArr)
{
	let meta = routerArr[k] || {};
	let cRouter = {
		path: `${k}`,
		name: `${moduleId}/${k}`,
		component: modules[k],
		meta: meta
	};
	routes.push(cRouter);
}

let layoutRoute = [{
	path: `/${moduleId}`,
	name: `${moduleId}`,
	component: modules['layout'],
	children: routes
}];

export default layoutRoute;
