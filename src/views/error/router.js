const moduleId = 'error';
let modules = {};


modules['404'] = (resolve) => {
	require.ensure([], () => {resolve(require('./404'));}, 'error');
};

let children = [];
let routerArr = {

};
for(let k in routerArr)
{
	let meta = routerArr[k];
	let cRouter = {
		path: `/${moduleId}/${k}`,
		name: `${moduleId}/${k}`,
		component: modules[k],
		meta: meta
	};
	children.push(cRouter);
}

children.push({
	path: '*',
	name: '404',
	component: modules['404'],
	meta: {
		title: '页面未找到',
	}
});

export default children;
