import {tim_online_login} from '@/utils/tims_login.js'
import store from '@/store'


const sys = uni.getSystemInfoSync();
const duration = sys.osName == 'ios' ? 2000 : 3000 

export default function(vm) {
	const http = uni.$u.http
	// import md5Libs from "@/utils/md5";
	const getTokenStorage = () => {
		let token = ''
		try {
			token = uni.getStorageSync('userid')
		} catch (e) {
			//TODO handle the exception
		}
		return token
	}
	let md5flag = false
	let requests = [] // 存储无token的请求队列
	let isRefreshing = false //正在刷新token
	http.setToken = (obj, md5flag) => {
		http.config.header = {
			...http.config.header,
			...obj
		}
		// http.config.header['userid'] = token
		if(!md5flag) {
			// 不存在md5时保存userid
			uni.setStorageSync('userid', obj.userid) 
		}
		
	}
	function get_xcx_code() {
		return new Promise((resolve, rejected) => {
			uni.login({
				success: function (res){
					resolve(res.code);
				},
				fail: err => {
					md5flag = true
					rejected(err)
				}
			});
		});
	}
	
	async function refreshToken() {
		// token接口获取token值
		try{
			let code = await get_xcx_code();
			console.log('code打印:',code)
			return http.post('login_cancel',{code:code})
		}catch(e){
			return e
		}
		
	}
	// 初始化请求配置
	http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = vm.$store.state.user.configBaseURL; /* 根域名 */
		config.header = {
			...config.header,
			...vm.$store.state.user.configHeader
		}
		return config
	})

	// 请求拦截
	http.interceptors.request.use(async (config) => { // 可使用async await 做异步操作
		// console.log(config)
		const token = getTokenStorage()
		config.header = {
			...config.header,
			// 'shareid': vm.$store.state.user.shareid,
			'userid': token
		}
		config.params = {
			...config.params,
			share_other: store.state.user.share_other
		}
		
		// 登录接口和刷新token接口绕过
		if (config.url.indexOf('login_cancel') >= 0) {
			return config
		}
		if (!token) {
			// 立即刷新token
			if (!isRefreshing) {
				console.log('刷新token ing', config.url)
				isRefreshing = true
				refreshToken().then(res => {
					console.log('获取token成功，存入头部',res)
					uni.setStorageSync('WebSocketInfo', res)
					// tim_online_login()
					vm.$ws.init()
					uni.setStorageSync('poster', res.poster) 
					let userid = ""
					// if(res.errMsg != "request:ok") {
					// 	userid = md5Libs.md5(formatDate(new Date()) + 'wsdz')
					// 	http.setToken(userid, true)
					// }else {
					userid = res.userid
					http.setToken({
						userid: userid
					})
					
					// }
					
					console.log('刷新token成功，执行队列')
					requests.forEach(cb => cb(userid))
					// 执行完成后，清空队列
					requests = []
				}).catch(res => {
					console.error('refresh token error: ', res)
				}).finally(() => {
					isRefreshing = false
				})
			}
			return new Promise(resolve => {
				requests.push((token) => {
					// 因为config中的token是旧的，所以刷新token后要将新token传进来
					config.header['userid'] = token
					resolve(config)
				})
			})
		
		} 
		
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		// config.data = config.data || {}
		// // 根据custom参数中配置的是否需要token，添加对应的请求头
		// if (config?.custom?.auth) {
		// 	// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
		// 	config.header.token = vm.$store.state.userInfo.token
		// }
		// console.log(store.state.user.share_other)
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	http.interceptors.response.use((response) => {
		uni.hideNavigationBarLoading();
		uni.hideLoading()
		if (response.hasOwnProperty('data')) {
			if (response.data.code != 1) {
				if (response.data.msg) {
					uni.showToast({
						title: response.data.msg,
						icon: 'none',
						mask: true,
						duration: duration
					})
				}
			}
		} 
		return response.data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		console.log(response)
		return Promise.reject(response)
	})
}
