define(function(require, exports, module) {
	// 引入Util
	var Util = require('../../utils/Util');
	// 引入样式
	require('./detail.css')
	// Detail组件
	module.exports = Vue.extend({
		template: '#tpl_detail',
		data: function() {
			return {
				detail: {}
			}
		},
		mounted: function() {
			var self = this;
			// console.log(this.$parent.route[0])
			Util.ajax("data/product.json?id=" + this.$parent.route[0], function(res) {
				if (res && res.errno === 0) {
					// console.log(res.data)
					self.detail = res.data;
				}
			})
		}
	})
})