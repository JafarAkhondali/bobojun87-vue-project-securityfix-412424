define(function(require, exports, module) {
	// 引入app
	var app = require('components/app')
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
	// window.addEventListener("load", Router)
	Router();
})