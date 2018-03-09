// 实现异步请求方法
var Util = {
	ajax: function(url, fn) {
		// 创建请求
		var xhr = new XMLHttpRequest();
		// 监听状态的改变
		xhr.onreadystatechange = function(res) {
			// 判断状态
			if (xhr.readyState === 4) {
				// 判断状态码  34 是缓存数据
				if (xhr.status === 200) {
					fn(JSON.parse(xhr.responseText))
				}
			}
		}
		// 打开请求  true: 是否异步请求
		xhr.open("GET", url, true)
		// 发送数据
		xhr.send(null)
	}
}
Util.ajax("data/home.json", function(res) {
	console.log(res)
})
// 创建三个组件
// Home组件
var Home = Vue.extend({
	template: '<h1>Home</h1>'
})
// List组件
var List = Vue.extend({
	template: '<h1>List</h1>'
})
// Detail组件
var Detail = Vue.extend({
	template: '<h1>Detail</h1>'
})
// 注册组件
Vue.component('home', Home);
Vue.component('list', List);
Vue.component('detail', Detail);

// 创建vue实例化对象
var app = new Vue({
	el: '#app',
	data: {
		view: 'list',
		route: ''
	}
})

// 创建路由
var Router = function() {
	// 获取hash
	var hash = location.hash;
	// 过滤
	hash = hash.replace(/^#\/?/, '');
	hash = hash.split("/");
	// 路由映射
	var map = {
		'home': true,
		'list': true,
		'detail': true
	}
	if (map[hash[0]]) {
		app.view = hash[0];
	} else {
		app.view = 'home';
	}
	// app.view = hash[0];
	app.route = hash.slice(1)
	// console.log(app.route)
}
// 监听路由变化
window.addEventListener("hashchange", Router)
window.addEventListener("load", Router)