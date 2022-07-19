<template>
	<view>
		<u-button @click="tiao1">tiao</u-button>
		<u-button @click="tiao2">tiao</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad() {
			// console.log(wx.qy)
			// wx.qy.login({
			// 	suiteId: '', //非必填，第三方应用的suiteid，自建应用不填。若第三方小程序绑定多个第三方应用时，建议填上该字段
			// 	success: async (res) => {
			// 		if (res.code) {
			// 			await this.$http.get('qiye_login_cancel', {
			// 				params: {
			// 					code: res.code
			// 				}
			// 			})
			// 		} else {
			// 			console.log('登录失败！' + res.errMsg)
			// 		}
			//  }
			// });
		},
		methods: {
			tiao1() {
				wx.openChannelsActivity({
					finderUserName: 'sphZjPDm2u52qdq',
					feedId: 'export/UzFfAgtgekIEAQAAAAAA20o6Qz7gdwAAAAstQy6ubaLX4KHWvLEZgBPEgYJgenQXYYqDzNPgMJqgwrExiZbe6KBhbAHcO_c4',
					success(res) {
						console.log(res)
					}
				})
			},
			tiao2() {
				wx.openChannelsActivity({
					finderUserName: 'sphZjPDm2u52qdq',
					feedId: 'export/UzFfAgtgekIEAQAAAAAAFxMNPQo00wAAAAstQy6ubaLX4KHWvLEZgBPEiYJAIHNNCoeDzNPgMJpx68_f19O3JfhitoSK3Z1K',
					success(res) {
						console.log(res)
					}
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
