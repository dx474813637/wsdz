import store from '@/store'
import wx_permission from '@/config/permission/wx.js'
import { PROJECT } from '@/utils/isProject.js' 

const config = PROJECT
export function permissionBase (vm, e) {
	const {whiteList, userStateList, sinopayWhiteList, sinoTiShiList} = config.base.permission
	// 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
	const url = e.url.split('?')[0]
	console.log('url', e.url)
	if (url == '/pages/my/money/index') {
		uni.redirectTo({
			url: '/pages/my/money/index_new'
		})
		return false
	}
	if (!wx_permission(e.url)) return false
	const r = uni.getStorageSync('WebSocketInfo')
	vm.$ws.send('{"type":"xcx","client_name":"' + r.w_login + '","rawmex_login":"' +
		r.login + '","room_id":"rawmex_xcx","token":"' + r.w_token +
		'","login":"' + r.w_login + '","content":"' + e.url + '"}')
	// 判断当前窗口是白名单，如果是则不重定向路由
	let pass
	let pass_sino
	if (whiteList) {
		pass = whiteList.some((item) => {
			if (typeof(item) === 'object' && item.pattern) {
				return item.pattern.test(url)
			}
			return url === item
		})
	}
	// 不是白名单并且没有token
	if (!pass && store.state.user.login == 0) {
	
		uni.setStorageSync('prePage', e.url)
		uni.navigateTo({
			url: "/pages/index/login/login",
			success() {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
			}
		})
		return false
	}
	
	if (!pass && userStateList) {
		//用户信息是否完善校验
		pass = !userStateList.some((item) => {
			if (typeof(item) === 'object' && item.pattern) {
				return item.pattern.test(url)
			}
			return url === item
		})
	}
	
	if (!pass) {
		if (store.state.user.myCpy.hasOwnProperty('state') && store.state.user.myCpy
			.state == 0) {
			uni.showToast({
				title: '请等待用户信息审核成功',
				icon: 'none'
			})
			return false
		}
		if (!store.state.user.myCpy.hasOwnProperty('state')) {
			uni.showModal({
				title: '提示',
				content: '请先完善用户信息',
				confirmText: '去完善',
				cancelText: '考虑一下',
				success: function(res) {
					if (res.confirm) {
						uni.setStorageSync('prePage', e.url)
						uni.navigateTo({
							url: "/pages/my/user/info"
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
			return false
		}
	
	
	
	}
	
	// if (sinopayWhiteList) {
	// 	//sinopay页面 
	// 	if(url.includes('/pages/my/money/')) { 
	// 		pass_sino = sinopayWhiteList.some((item) => {
	// 			if (typeof (item) === 'object' && item.pattern) {
	// 			  return item.pattern.test(url)
	// 			}
	// 			return url === item
	// 		  })
	// 		if (!pass_sino ) {
	// 			if(!store.state.sinopay.sino.hasOwnProperty('state')) {
	// 				uni.showLoading({
	// 					title: '正在获取资金账户'
	// 				})
	// 				try{
	// 					await store.dispatch('sinopay/getSinoAccount')
	// 				}catch(e){
	// 					uni.$u.toast(e)
	// 					console.error('getSinoAccount error: ', res)
	// 					return false
	// 				}
	
	// 			}
	// 			if(store.state.sinopay.sino.state != 2 ) {
	// 				uni.reLaunch({
	// 					url: '/pages/my/money/index',
	// 					success: () => { 
	// 						// uni.showToast({
	// 						// 	title: '资金账户权限不足',
	// 						// 	icon: 'none'
	// 						// })
	// 					}
	// 				})
	// 				return false
	// 			}
	// 		}
	// 	}
	// }
	
	
	// if (sinoTiShiList) {
	// 	//sinopay页面 
	// 	if (url.includes('/pages/my/money/')) {
	// 		pass_sino = sinoTiShiList.some((item) => {
	// 			if (typeof(item) === 'object' && item.pattern) {
	// 				return item.pattern.test(url)
	// 			}
	// 			return url === item
	// 		})
	// 		if (pass_sino) {
	// 			try {
	// 				await store.dispatch('sinopay/getSinoTishi')
	// 			} catch (e) {
	// 				uni.$u.toast(e)
	// 				console.error('getSinoTishi error: ', res)
	// 				return false
	// 			}
	// 		}
	// 	}
	// }
	// if(!store.state.sinopay.sino.hasOwnProperty('state')) {
	// 	uni.showLoading({
	// 		title: '正在获取资金账户'
	// 	})
	// 	try{
	// 		await store.dispatch('sinopay/getSinoAccount')
	// 	}catch(e){
	// 		uni.$u.toast(e)
	// 		console.error('getSinoAccount error: ', res)
	// 		return false
	// 	}
	
	// } 
	
	//记录路径参数数据 底部菜单跳转判断买卖盘用
	let paramsObj = {}
	e.url.split('?')[1]?.split('&').forEach(item => {
		paramsObj[item.split('=')[0]] = item.split('=')[1]
	})
	store.commit('user/setPage', {
		route: uni.$u.page(),
		options: paramsObj
	})
	return true
}