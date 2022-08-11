<template>
	<view class="wrapper u-p-l-20 u-p-r-20 ">
		<u-navbar
			title="个人中心"
			bgColor="transparent"
			:fixed="false"
		>
			<view class="u-flex u-flex-items-center" slot="left">
				<view @click="handleGoto('/pages/my/user/settings')" class="step1 item u-p-10">
					<i class="custom-icon-shezhi1 custom-icon u-font-38"></i>
				</view>
				<view @click="handleGoto('/pages/my/msg/msg')" class="step2 item u-p-10" style="position: relative;">
					<i class="custom-icon-comment custom-icon u-font-40"></i>
					<u-badge absolute :offset="[5,3]" isDot :show="newMsg == '1'" bgColor="#ff2225"></u-badge>
				</view>
			</view>
		</u-navbar>
		<view @click="handleGoto('/pages/my/user/info')" class="step3 user u-flex u-flex-items-center u-p-20 u-p-t-50 u-m-b-26">
			
			<view class="user-img u-flex u-flex-items-center u-flex-center">
				<i class="custom-icon-myfill custom-icon"></i>
			</view>
			<view class="user-info">
				<template v-if="loading">
					<u-loading-icon></u-loading-icon>
				</template>
				<template v-else>
					<view class="item u-flex u-flex-items-center">
						<view class="name u-line-1 u-font-38 step7">{{login || myCpy.mobile}}</view>
						<view v-if="myCpy.type" class="step8 sub text-white u-font-24 u-flex u-flex-items-center u-p-4 u-p-l-10 u-p-r-16 u-m-l-20">
							<text >{{myCpy.type | type2str}}</text>
						</view>
						<view 
							style="background: #f90;"
							v-if="myCpy.state == 0" class="sub text-white u-font-24 u-flex u-flex-items-center u-p-4 u-p-l-10 u-p-r-16 u-m-l-20">
							<text>审核中</text>
						</view>
					</view>
					<view class="item">
						<view class="sub2 u-font-28 step9 text-light u-flex u-flex-items-center">
							<text v-if="myCpy.name">{{myCpy.name}}</text>
							<text v-else>点击完善用户信息，解锁更多功能</text>
							<i class="custom-icon-edit custom-icon u-font-28 text-light u-m-l-10"></i>
						</view>
					</view>
				</template>
				
			</view>
			
		</view>
		
		<view class="user-item-box u-p-28 u-p-b-38 bg-white u-m-b-26 step4">
			<view class="set-sub u-flex u-flex-items-center u-m-b-30 step10">
				<view class="sub-title u-flex u-flex-items-center u-p-l-16 u-p-r-16 bg-primary">
					<i class="text-white custom-icon-warn custom-icon"></i>
					<text class="text-white u-font-24 u-p-l-10">{{tips.tips_title}}</text>
				</view>
				<view @click="handleGoto(tips.tips_url)" class="sub-main u-flex u-flex-items-center u-flex-between u-p-l-10 u-p-r-10 u-flex-1">
					<text class="u-font-24">{{tips.tips_info}}</text>
					<i class="custom-icon-roundadd custom-icon"></i>
				</view>
			</view>
			<view class="set-main u-flex u-flex-between u-flex-items-center u-p-l-10 u-p-r-10">
				<view @click="handleGoto({url: '/pages/my/broker/edit', params: {pan: 'b'}})" class=" step11 item u-flex u-flex-between u-flex-items-center u-flex-1 u-p-r-40">
					<view class="item">
						<view class="u-font-34 u-p-b-4">发布买盘</view>
						<view class="u-font-26 text-light">挂牌采购商品</view>
					</view>
					<view class="item">
						<image class="mm-img" src="http://dingxiang.netsun.testwebsite.cn/public/img/icon2.png" mode=""></image>
					</view>
				</view>
				<view @click="handleGoto({url: '/pages/my/broker/edit', params: {pan: 's'}})" class=" step12 item u-flex u-flex-between u-flex-items-center u-flex-1 u-p-l-40 u-border-left" style="border-color: #f8f8f8!important;">
					<view class="item">
						<view class="u-font-34 u-p-b-4">发布卖盘</view>
						<view class="u-font-26 text-light">挂牌供应商品</view>
					</view>
					<view class="item">
						<image class="mm-img" src="http://dingxiang.netsun.testwebsite.cn/public/img/icon1.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="user-item-box u-p-24 bg-white u-m-b-26 step5" v-if=" auth == 1">
			<view @click="handleGoto('/pages/my/customer/customer')" class="u-flex u-flex-items-center u-p-t-6 u-p-b-30  u-border-bottom" style="border-color: #f8f8f8!important;">
				<view class="radius-50 bg-primary text-white u-flex u-flex-items-center u-flex-center u-p-16">
					<i class=" custom-icon-friend custom-icon u-font-40"></i>
				</view>
				<view class="item u-p-l-20">
					<view class="u-font-36">客户管理</view>
					<view class="text-light u-font-26">撮合员代为发布买卖盘时前置设定</view>
				</view>
			</view>
			<view class="step25 u-m-t-20">
				<u-scroll-list> 
					<view 
						v-for="(item, index) in brokerList"
						@click="scrollListItemClick(item)" 
						:class="['item-broker u-p-20', item.step13]"
						>
						<view class="icon-w u-flex u-flex-center u-flex-items-center">
							<i :class="['custom-icon u-font-36', item.icon]"></i>
						</view>
						
						<view class="u-p-t-20 u-font-26 " style="white-space: nowrap;color: #4d525d;">{{item.title}}</view>
					</view> 
				</u-scroll-list>
			</view>
			
			<!-- <view class="u-flex u-flex-items-center u-flex-between u-p-b-10 u-p-t-24">
				<view @click="handleGoto('/pages/my/customer/customer')" class=" step13 u-p-l-30 item u-flex u-flex-items-center u-flex-1">
					<i class="custom-icon-sort custom-icon u-font-38"></i>
					<text class="u-p-l-20 u-font-28">客户列表</text>
				</view>
				<view @click="handleTakeAccount" class=" step14 u-p-l-30 item u-flex u-flex-items-center u-flex-1 u-border-left" style="border-color: #f8f8f8!important;">
					<i class="custom-icon-friendadd custom-icon u-font-38"></i>
					<text class="u-p-l-20 u-font-28">领取客户账号</text>
				</view>
			</view>
			<view class="u-flex u-flex-items-center u-flex-between u-p-b-10 u-p-t-24">
				<view @click="handleGoto({url:'/pages/my/broker/auth_list', params:{pan: 's'}})" class=" step15 u-p-l-30 item u-flex u-flex-items-center u-flex-1">
					<i class="custom-icon-weituobiangeng custom-icon u-font-38"></i>
					<text class="u-p-l-20 u-font-28">客户委托卖盘</text>
				</view>
				<view @click="handleGoto({url:'/pages/my/broker/auth_list', params:{pan: 'b'}})" class="step16 u-p-l-30 item u-flex u-flex-items-center u-flex-1 u-border-left" style="border-color: #f8f8f8!important;">
					<i class="custom-icon-weituobiangeng custom-icon u-font-38"></i>
					<text class="u-p-l-20 u-font-28">客户委托买盘</text>
				</view>
			</view>
			<view class="u-flex u-flex-items-center u-flex-between u-p-b-10 u-p-t-24">
				<view @click="handleGoto({url:'/pages/my/customer/customer_pan_zz', params:{pan: 's'}})" class=" step15 u-p-l-30 item u-flex u-flex-items-center u-flex-1">
					<i class="custom-icon-zu555 custom-icon u-font-38"></i>
					<text class="u-p-l-20 u-font-28">客户自主卖盘</text>
				</view>
				<view @click="handleGoto({url:'/pages/my/customer/customer_pan_zz', params:{pan: 'b'}})" class="step16 u-p-l-30 item u-flex u-flex-items-center u-flex-1 u-border-left" style="border-color: #f8f8f8!important;">
					<i class="custom-icon-jinhuoqu custom-icon u-font-38"></i>
					<text class="u-p-l-20 u-font-28">客户自主买盘</text>
				</view>
			</view>
			<view class="u-flex u-flex-items-center u-flex-between u-p-b-10 u-p-t-24">
				<view @click="handleGoto({url:'/pages/my/customer/customer_order', params:{ordertype: 'S'}})" class="step16 u-p-l-30 item u-flex u-flex-items-center u-flex-1 u-border-left" style="border-color: #f8f8f8!important;">
					<i class="custom-icon-zu558 custom-icon u-font-38"></i>
					<text class="u-p-l-20 u-font-28">客户销售订单</text>
				</view>
				<view @click="handleGoto({url:'/pages/my/customer/customer_order', params:{ordertype: 'B'}})" class=" step15 u-p-l-30 item u-flex u-flex-items-center u-flex-1">
					<i class="custom-icon-zu556 custom-icon u-font-38"></i>
					<text class="u-p-l-20 u-font-28">客户采购订单</text>
				</view>
			</view> -->
		</view>
		
		<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26 step6">
			<view class="box-header u-flex u-flex-items-end u-border-bottom u-p-b-14 u-p-l-30 u-p-r-30">
				<view class="u-font-34">买盘卖盘</view>
				<view class="text-light u-font-26 u-p-l-10">发布前设置交易商品</view>
			</view>
			<view class="box-row u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10">
				<view @click="handleGoto('/pages/my/broker/prod_edit')" class="step17 item u-text-center u-flex-1">
					<i class="custom-icon-roundadd custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">添加交易商品</text>
				</view>
				<view @click="handleGoto('/pages/my/broker/prod_set')" class="step18 item u-text-center u-flex-1">
					<i class="custom-icon-goods custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">商品列表</text>
				</view>
				<view @click="handleGoto({url: '/pages/my/broker/list', params: {pan: 'b'}})" class="step19 item u-text-center u-flex-1">
					<i class="custom-icon-jinhuoqu custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">我的买盘</text>
				</view>
				<view @click="handleGoto({url: '/pages/my/broker/list', params: {pan: 's'}})" class="step20 item u-text-center u-flex-1">
					<i class="custom-icon-zu555 custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">我的卖盘</text>
				</view>
			</view>
		</view>
		
		<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26" >
			<view class="box-header u-flex u-flex-items-end u-border-bottom u-p-b-14 u-p-l-30 u-p-r-30">
				<view class="u-font-34">订单中心</view>
				
			</view>
			<view class="box-row u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10">
				<view @click="handleGoto({url: '/pages/my/order/order', params: {ordertype: 'B'}})" class="item u-text-center u-flex-1">
					<i class="custom-icon-zu556 custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">采购订单</text>
				</view>
				<view @click="handleGoto({url: '/pages/my/order/order', params: {ordertype: 'S'}})" class="item u-text-center u-flex-1">
					<i class="custom-icon-zu558 custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">销售订单</text>
				</view> 
				<view class="item u-flex-1"></view>
				<view class="item u-flex-1"></view>
			</view>
		</view>
		
		
		<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26" v-if="sh == 1">
			<view class="box-header u-flex u-flex-items-end u-border-bottom u-p-b-14 u-p-l-30 u-p-r-30">
				<view class="u-font-34">资金中心</view>
				
			</view>
			<view class="box-row u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10">
				<view @click="handleGoto('/pages/my/money/index')" class="item u-text-center u-flex-1">
					<i class="custom-icon-moneybag custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">资金主页</text>
				</view>
				<view @click="handleGoto('/pages/my/money/sino_zh1')" class="item u-text-center u-flex-1">
					<i class="custom-icon-pay custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">现金账户</text>
				</view>
				<view @click="handleGoto('/pages/my/money/bill')" class="item u-text-center u-flex-1">
					<i class="custom-icon-form custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">付款记录</text>
				</view>
				<view @click="handleGoto('/pages/my/money/safe_list')" class="item u-text-center u-flex-1">
					<i class="custom-icon-lock custom-icon t-label"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">安全设置</text>
				</view>
			</view>
		</view>
		
		<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26" v-for="(ele, i) in moreMenusNew" :key="i">
			<view class="box-header u-border-bottom u-flex u-flex-items-end u-p-b-14 u-p-l-30 u-p-r-30">
				<view class="u-font-34">{{ele.name}}</view>
			</view>
			<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-t-20 ">
				<view 
					class="item u-text-center u-m-t-15" 
					v-for="(item, index) in ele.list" 
					:key="index"
					@click="handleMenusClick(item)"
					>
					<image class="icon-img" :src="item.icon" mode=""></image>
					<text class="u-font-26 u-p-b-10 u-line-1 menus-name">{{item.name}}</text>
				</view>
			</view>
		</view>
		
		<xky-guideStep :step="step" :otherHeight="$u.sys().safeAreaInsets.top"></xky-guideStep>
		<u-safe-bottom></u-safe-bottom>
		<menusBar tabbar theme="white" :activeIndex="5" border></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import mixCheckLoginStatus from '@/config/mixCheckLoginStatus'
	export default {
		// mixins: [mixCheckLoginStatus],
		data() {
			return {
				loading: false,
				step:{
				    name:'wode_guide',
				    guideList: []
				},
				brokerList: [
					{
						title: '客户列表',
						icon: 'custom-icon-sort',
						url: '/pages/my/customer/customer',
						params: {},
						class: 'step13',
					},
					{
						title: '领取账号',
						icon: 'custom-icon-friendadd',
						flag: 1,
						func: 'handleTakeAccount',
						class: 'step14',
					},
					{
						title: '委托卖盘',
						icon: 'custom-icon-weituobiangeng',
						url: '/pages/my/broker/auth_list',
						params: {pan: 's'},
						class: 'step15',
					},
					{
						title: '委托买盘',
						icon: 'custom-icon-weituobiangeng',
						url: '/pages/my/broker/auth_list',
						params: {pan: 'b'},
						class: 'step16',
					},
					{
						title: '自主卖盘',
						icon: 'custom-icon-zu555',
						url: '/pages/my/customer/customer_pan_zz',
						params: {pan: 's'},
						class: 'step21',
					},
					{
						title: '自主买盘',
						icon: 'custom-icon-jinhuoqu',
						url: '/pages/my/customer/customer_pan_zz',
						params: {pan: 'b'},
						class: 'step22',
					},
					{
						title: '销售订单',
						icon: 'custom-icon-zu558',
						url: '/pages/my/customer/customer_order',
						params: {ordertype: 'S'},
						class: 'step23',
					},
					{
						title: '采购订单',
						icon: 'custom-icon-zu556',
						url: '/pages/my/customer/customer_order',
						params: {ordertype: 'B'},
						class: 'step24',
					},
				], 
			};
		},
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy,
				login: state => state.user.login,
				auth: state => state.user.auth,
				sh: state => state.user.sh,
				moreMenus: state => state.user.moreMenus,
				moreMenusNew: state => state.user.moreMenusNew, 
				newMsg: state => state.user.newMsg, 
				bd: state => state.user.bd, 
				tips: state => state.user.tips, 
				wode_guide: state => state.user.wode_guide
			}),
		},
		async onLoad() {
			await this.wode()
			this.step.guideList = this.wode_guide.list
			if(!this.myCpy.id) {
				this.loading = true
				uni.showLoading({
					title: '获取最新用户信息中'
				})
				await this.myCompany()
				this.loading = false
			}else {
				this.myCompany()
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				myCompany: 'user/myCompany',
				wode: 'user/wode'
			}),
			async handleTakeAccount() {
				uni.showLoading()
				const res = await this.$api.addCustomer();
				if(res.code == 1) {
					uni.showToast({
						title: '成功领取账号'
					})
				}
				
			},
			scrollListItemClick(item) {
				if(item.hasOwnProperty('url')) {
					this.handleGoto({
						url: item.url,
						params: item.params
					})
				}else if(item.flag == 1) {
					this[item.func]()
				}
			},
			handleMenusClick(item) {
				console.log(item)
				if(item.type == 1 ){
					uni.reLaunch({
						url: item.url
					})
				}
				else if(item.type == 2 ){
					uni.redirectTo({
						url: item.url
					})
				}
				else if(item.type == 3 ){
					uni.navigateTo({
						url: item.url
					})
				}
				
				
				
			}
		}
	}
</script>
<style lang="scss">
	page {
		min-height: 100vh;
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	.box-row .custom-icon {
		color: #333;
	}
	.t-label {
		font-size: 22px!important;
	}
	.item-broker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.icon-w {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		background-color: #e4eef9;
		.custom-icon {
			color: #0d266b;
		}
	}
	.other-menus {
		.item {
			flex: 0 0 25%;
			.icon-img {
				width: 22px;
				height: 22px;
			}
		}
	}
	.wrapper {
		padding-bottom: 50px;
		min-height: 100vh;
		box-sizing: border-box;
		background-image: linear-gradient(45deg, #eef1f6 75%, #d5fdf6 95%);
	}
	.menus-name {
		color: #666;
	}
	.ts-bg {
		background-image: linear-gradient(to bottom, #fef9f3, #fef7e3);
	}
	.user-item-box {
		border-radius: 18rpx;
		// box-shadow: 0 5rpx 10rpx rgba(90,90,90,.1);
		.set-sub {
			background-color: #eaf7ff;
			height: 28px;
			border-radius: 6rpx;
			overflow: hidden;
			.sub-title {
				height: 100%;
				border-radius: 0 4rpx 4rpx 0;
			}
			.sub-main {
				height: 100%;
				color: #5a86eb;
			}
		}
		.set-main {
			.mm-img {
				width: 36px;
				height: 36px;
				display: block;
			}
		}
	}
	.user {
		.user-img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 10px;
			background-color: #d0e7ff;
			.custom-icon {
				font-size: 22px;
				color: #86b0f8;
			}
		}
		.user-info {
			.name {
				
			}
			.sub {
				background-color: #7da5e2;
				background-image: linear-gradient(to right, #a1c3f7, #86b0f8);
				border-radius: 6rpx;
				white-space: nowrap;
			}
			.sub2 {
				
			}
		}
	}
	.user-data {
	}
</style>
