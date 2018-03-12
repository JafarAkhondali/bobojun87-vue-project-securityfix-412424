define(function(require, exports, module) {
	// 实现异步请求方法
	module.exports = {
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
})