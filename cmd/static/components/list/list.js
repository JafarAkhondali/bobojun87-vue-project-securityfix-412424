define(function(require, exports, module) {
	// 引入Util
	var Util = require('../../utils/Util');
	// 引入样式
	require('./list.css')
	require('../home/item.css')
	// List组件
	module.exports = Vue.extend({
		props: ['searchQuery'],
		template: '#tpl_list',
		data: function() {
			return {
				orders: [
					{id: 'price', text:'价格排序'}, 
					{id: 'sales', text:'销量排序'}, 
					{id: 'evaluate', text:'好评排序'}, 
					{id: 'discount', text:'优惠排序'}
				],
				list: [],
				others: []
			}
		},
		mounted: function() {
			var self = this;
			// console.log(this.$parent.route[1])
			Util.ajax("data/list.json?id=" + this.$parent.route[1], function(res) {
				if (res && res.errno === 0) {
					self.list = res.data.slice(0, 3);
					self.others = res.data.slice(3);
				}
			})
		},
		methods: {
			showOthers: function() {
				this.list = this.list.concat(this.others);
				this.others = [];
			},
			sortList: function(id) {
				// console.log(id)
				this.list.sort(function(a, b) {
					if (id == 'discount') {
						// 升序
						return (a.originPrice - a.price) - (b.originPrice - b.price)
					}
					// 升序
					return a[id] - b[id]
				})
			}
		},
		computed: {
			listFilterResult: function() {
				// 用来保存过滤后的数据
				var result = [];
				// 获取输入框的值
				var query = this.searchQuery;
				// console.log(query)
				this.list.forEach(function(item, index) {
					if (item.title.indexOf(query) >= 0) {
						result.push(item);
					}
				})
				return result;
			}
		}
	})
})