define(function(require, exports, module) {
	// 引入组件
	var Home = require('components/home/home')
	var List = require('components/list/list')
	var Detail = require('components/detail/detail')
	// 引入样式
	require('components/app.css')

	// 注册组件
	Vue.component('home', Home);
	Vue.component('list', List);
	Vue.component('detail', Detail);

	// 创建vue实例化对象
	module.exports = new Vue({
		el: '#app',
		data: {
			view: 'home',
			route: [],
			query: '',
			searchValue: ''
		},
		methods: {
			searchResult: function() {
				this.query = this.searchValue;
				this.searchValue = '';
			},
			goBack: function() {
				history.go(-1);
			}
		}
	})
})