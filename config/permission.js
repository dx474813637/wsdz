/**
 * @description 自定义路由拦截
 */

// import { getAuthorization } from '@/utils/auth'
import store from '@/store'

// 白名单
const whiteList = [
  '/', 
  { pattern: /^\/pages\/list.*/ },
  // { pattern: /^\/pages\/index\/login*/ },
  { pattern: /^\/pages\/baojia*/ },
  { pattern: /^\/pages\/index*/ },
  // { pattern: /^\/pages\/index\/(?!attention).*/ },
]
// 用户信息未完善 权限列表
const userStateList = [
	{ pattern: /^\/pages\/my\/broker\/edit*/ },
	{ pattern: /^\/pages\/my\/broker\/prod_edit*/ },
]

export default async function() {
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  // 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
  list.forEach(item => {
    uni.addInterceptor(item, {
      invoke(e) {
        // 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
        const url = e.url.split('?')[0]
        console.log('url', url)

        // 判断当前窗口是白名单，如果是则不重定向路由
        let pass
        if (whiteList) {
          pass = whiteList.some((item) => {
            if (typeof (item) === 'object' && item.pattern) {
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
            if (typeof (item) === 'object' && item.pattern) {
              return item.pattern.test(url)
            }
            return url === item
          })
        }
        if (!pass ) {
			if(store.state.user.myCpy.hasOwnProperty('state') && store.state.user.myCpy.state == 0) {
				uni.showToast({
					title: '请等待用户信息审核成功',
					icon: 'none'
				})
				return false
			}
			if(!store.state.user.myCpy.hasOwnProperty('state')){
				uni.showModal({
					title: '提示',
					content: '请先完善用户信息',
					confirmText: '去完善',
					cancelText: '考虑一下',
					success: function (res) {
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
        
        return e
      },
      fail(err) { // 失败回调拦截
        console.log(err)
      }
    })
  })
}