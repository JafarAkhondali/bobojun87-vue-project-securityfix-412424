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
// Util.ajax("data/home.json", function(res) {
// 	console.log(res)
// })
// 创建三个组件
// Home组件
var Home = Vue.extend({
	template: '#tpl_home',
	data: function() {
		return {
			icons: [
				{id: '1', img: '01.png', title: '美食'},
				{id: '2', img: '02.png', title: '电影'},
				{id: '3', img: '03.png', title: '酒店'},
				{id: '4', img: '04.png', title: '休闲'},
				{id: '5', img: '05.png', title: '外卖'},
				{id: '6', img: '06.png', title: 'ktv'},
				{id: '7', img: '07.png', title: '周边游'},
				{id: '8', img: '08.png', title: '丽人'},
				{id: '9', img: '09.png', title: '小吃'},
				{id: '10', img: '10.png', title: '火车票'},
			],
			ad: [],
			list: []
		}
	},
	mounted: function() {
		var self = this;
		Util.ajax("data/home.json", function(res) {
			if (res && res.errno === 0) {
				self.ad = res.data.ad;
				self.list = res.data.list;
			}
		})
	}
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
		route: []
	}
})

// 创建路由
var Router = function() {
	// 获取hash
	var hash = location.hash;
	// 过滤
	hash = hash.replace(/^#!?\/?/, '');
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
	// console.log(hash[0])
}
// 监听路由变化
window.addEventListener("hashchange", Router)
window.addEventListener("load", Router)