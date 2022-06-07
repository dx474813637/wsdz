<template>
	<view>
		<u-cell-group>
			
			<view v-for="(item, index) in list" :key="index">
				<view class="bg-white" v-if="item.type == 'cell'">
					<u-cell
						:icon="item.icon" 
						:title="item.title" 
						:isLink="true" 
						:iconStyle="{color: '#999'}"
						:url="item.url"
						arrow-direction="right"
					></u-cell>
				</view>
				
				<view class="u-p-20 u-font-28 text-light" v-if="item.type == 'label'">
					{{item.title}}
				</view>
				
			</view>
		
		
		</u-cell-group>
		<view class="u-p-20 u-m-t-40">
			<u-button type="error" @click="handleLogout">安全登出</u-button>
		</view>
		
	</view>
</template>

<script>
	
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				list: [
					{
						title: '用户管理',
						type: 'label'
					},
					{
						title: '用户信息',
						icon: 'account',
						type: 'cell',
						url: '/pages/my/user/info'
					},
					{
						title: '订阅管理',
						type: 'label'
					},
					{
						title: '订阅设置',
						icon: 'bookmark',
						type: 'cell',
						url: '/pages/my/user/subscribe_set'
					},
					{
						title: '订阅列表',
						icon: 'bell',
						type: 'cell',
						url: '/pages/my/user/subscribe_list'
					},
					{
						title: '账号管理',
						type: 'label'
					},
					{
						title: '登录历史记录',
						icon: 'clock',
						type: 'cell',
						url: '/pages/my/account/log'
					},
					{
						title: '密码修改',
						icon: 'lock',
						type: 'cell',
						url: '/pages/my/account/login_psw_update'
					},
					{
						title: '绑定账号',
						icon: 'man-add',
						type: 'cell',
						url: '/pages/my/account/bind_account'
					},
					{
						title: '绑定手机',
						icon: 'phone',
						type: 'cell',
						url: '/pages/my/account/bind_phone'
					},
				]
			};
		},
		methods: {
			...mapMutations({
				setLogin: 'user/setLogin'
			}),
			async handleLogout() {
				const res = await this.$api.logout();
				if(res.code == 1) {
					this.setLogin(0)
					uni.reLaunch({
						url: '/pages/index/login/login',
						success() {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				}
				
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>

</style>
