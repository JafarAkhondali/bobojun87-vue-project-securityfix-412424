define(function(require, exports, module) {
	// 引入Util
	var Util = require('../../utils/Util');
	// 引入样式
	require('./home.css');
	require('./item.css')
	// Home组件
	module.exports = Vue.extend({
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
})