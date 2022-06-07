<template>
	<view class="wrapper u-p-l-20 u-p-r-20 ">
		<u-navbar
			title="个人中心"
			bgColor="transparent"
			:fixed="false"
		>
			<view slot="left">
				<view @click="handleGoto('/pages/my/user/settings')" class="item u-p-10">
					<i class="custom-icon-shezhi1 custom-icon u-font-38"></i>
				</view>
			</view>
		</u-navbar>
		<view @click="handleGoto('/pages/my/user/info')" class="user u-flex u-flex-items-center u-p-20 u-p-t-50 u-m-b-26">
			<view class="user-img u-flex u-flex-items-center u-flex-center">
				<i class="custom-icon-myfill custom-icon"></i>
			</view>
			<view class="user-info">
				<view class="item u-flex u-flex-items-center">
					<view class="name u-font-38">broker104</view>
					<view class="sub text-white u-font-24 u-flex u-flex-items-center u-p-4 u-p-l-10 u-p-r-16 u-m-l-20">
						<text >个人用户</text>
					</view>
				</view>
				<view class="item">
					<view class="sub2 u-font-28 text-light u-flex u-flex-items-center">
						<text>宁波网盛大宗商品交易有限公司</text>
						<i class="custom-icon-edit custom-icon u-font-28 text-light u-m-l-10"></i>
					</view>
				</view>
			</view>
		</view>
		
		<view class="user-item-box u-p-28 u-p-b-38 bg-white u-m-b-26">
			<view class="set-sub u-flex u-flex-items-center u-m-b-30">
				<view class="sub-title u-flex u-flex-items-center u-p-l-16 u-p-r-16 bg-primary">
					<i class="text-white custom-icon-warn custom-icon"></i>
					<text class="text-white u-font-24 u-p-l-10">发布提示</text>
				</view>
				<view @click="handleGoto('/pages/my/broker/prod_set')" class="sub-main u-flex u-flex-items-center u-flex-between u-p-l-10 u-p-r-10 u-flex-1">
					<text class="u-font-24">发布买卖盘时请先设置好交易商品</text>
					<i class="custom-icon-roundadd custom-icon"></i>
				</view>
			</view>
			<view class="set-main u-flex u-flex-between u-flex-items-center u-p-l-10 u-p-r-10">
				<view @click="handleGoto({url: '/pages/my/broker/edit', params: {pan: 'b'}})" class="item u-flex u-flex-between u-flex-items-center u-flex-1 u-p-r-40">
					<view class="item">
						<view class="u-font-34 u-p-b-4">发布买盘</view>
						<view class="u-font-26 text-light">挂牌采购商品</view>
					</view>
					<view class="item">
						<image class="mm-img" src="http://dingxiang.netsun.testwebsite.cn/public/img/icon2.png" mode=""></image>
					</view>
				</view>
				<view @click="handleGoto({url: '/pages/my/broker/edit', params: {pan: 's'}})" class="item u-flex u-flex-between u-flex-items-center u-flex-1 u-p-l-40 u-border-left" style="border-color: #f8f8f8!important;">
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
		
		<view class="user-item-box u-p-24 bg-white u-m-b-26">
			<view @click="handleGoto('/pages/my/customer/customer')" class="u-flex u-flex-items-center u-p-t-6 u-p-b-30  u-border-bottom" style="border-color: #f8f8f8!important;">
				<view class="radius-50 bg-primary text-white u-flex u-flex-items-center u-flex-center u-p-16">
					<i class=" custom-icon-friend custom-icon u-font-40"></i>
				</view>
				<view class="item u-p-l-20">
					<view class="u-font-36">客户管理</view>
					<view class="text-light u-font-26">撮合员代为发布买卖盘时前置设定</view>
				</view>
			</view>
			<view class="u-flex u-flex-items-center u-flex-between u-p-b-10 u-p-t-24">
				<view @click="handleGoto('/pages/my/customer/customer')" class="item u-flex u-flex-items-center u-flex-1 u-flex-center">
					<i class="custom-icon-sort custom-icon "></i>
					<text class="u-p-l-20 u-font-28">客户列表</text>
				</view>
				<view @click="handleTakeAccount" class="item u-flex u-flex-items-center u-flex-1 u-flex-center u-border-left" style="border-color: #f8f8f8!important;">
					<i class="custom-icon-friendadd custom-icon"></i>
					<text class="u-p-l-20 u-font-28">领取客户账号</text>
				</view>
			</view>
		</view>
		
		<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26">
			<view class="box-header u-flex u-flex-items-end u-border-bottom u-p-b-14 u-p-l-30 u-p-r-30" style="border-color: #f8f8f8!important;">
				<view class="u-font-34">买盘卖盘</view>
				<view class="text-light u-font-26 u-p-l-10">发布前设置交易商品</view>
			</view>
			<view class="box-row u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10">
				<view @click="handleGoto('/pages/my/broker/prod_edit')" class="item u-text-center u-flex-1">
					<i class="custom-icon-roundadd custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">添加交易商品</text>
				</view>
				<view @click="handleGoto('/pages/my/broker/prod_set')" class="item u-text-center u-flex-1">
					<i class="custom-icon-goods custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">商品列表</text>
				</view>
				<view @click="handleGoto('/pages/my/broker/list')" class="item u-text-center u-flex-1">
					<i class="custom-icon-jinhuoqu custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">我的买盘</text>
				</view>
				<view @click="handleGoto('/pages/my/broker/list')" class="item u-text-center u-flex-1">
					<i class="custom-icon-zu555 custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">我的卖盘</text>
				</view>
			</view>
		</view>
		
		<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26">
			<view class="box-header u-flex u-flex-items-end u-border-bottom u-p-b-14 u-p-l-30 u-p-r-30" style="border-color: #f8f8f8!important;">
				<view class="u-font-34">订单中心</view>
				
			</view>
			<view class="box-row u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10">
				<view @click="handleGoto('/pages/my/order/order')" class="item u-text-center u-flex-1">
					<i class="custom-icon-zu556 custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">采购订单</text>
				</view>
				<view @click="handleGoto('/pages/my/order/order')" class="item u-text-center u-flex-1">
					<i class="custom-icon-zu558 custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">销售订单</text>
				</view>
				<view @click="handleGoto('/pages/my/order/order')" class="item u-text-center u-flex-1">
					<i class="custom-icon-jinhuodan custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">采购了结单</text>
				</view>
				<view @click="handleGoto('/pages/my/order/order')" class="item u-text-center u-flex-1">
					<i class="custom-icon-chuhuo custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">销售了结单</text>
				</view>
			</view>
		</view>
		
		
		<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26">
			<view class="box-header u-flex u-flex-items-end u-border-bottom u-p-b-14 u-p-l-30 u-p-r-30" style="border-color: #f8f8f8!important;">
				<view class="u-font-34">资金中心</view>
				
			</view>
			<view class="box-row u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10">
				<view @click="handleGoto('/pages/my/money/index')" class="item u-text-center u-flex-1">
					<i class="custom-icon-moneybag custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">资金主页</text>
				</view>
				<view @click="handleGoto('/pages/my/money/sino_zh1')" class="item u-text-center u-flex-1">
					<i class="custom-icon-pay custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">现金账户</text>
				</view>
				<view @click="handleGoto('/pages/my/money/bill')" class="item u-text-center u-flex-1">
					<i class="custom-icon-form custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">付款记录</text>
				</view>
				<view @click="handleGoto('/pages/my/money/safe_list')" class="item u-text-center u-flex-1">
					<i class="custom-icon-lock custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">安全设置</text>
				</view>
			</view>
		</view>
		
		<view class="user-item-box u-p-t-30 u-p-b-20 bg-white u-m-b-26">
			<view class="box-header u-flex u-flex-items-end u-p-b-14 u-p-l-30 u-p-r-30">
				<view class="u-font-34">其他设置</view>
			</view>
			<view class="box-row u-flex u-flex-items-center u-p-30 ts-bg u-p-b-40">
				<view class="item u-p-16 bg-warning radius-50">
					<i class="custom-icon-forward custom-icon u-font-40 text-white"></i>
				</view>
				<view class="item u-p-l-20 u-flex u-flex-items-center u-flex-1 u-flex-between">
					<view class=" u-flex-1">
						<view class="">推牌推送订阅</view>
						<view class="text-light u-font-26">用于及时获取相关标准品的新增挂牌</view>
					</view>
					<view @click="handleGoto('/pages/my/user/subscribe_list')" class="u-m-l-10">
						<u-button size="mini" type="warning" shape="circle" :customStyle="{backgroundImage: 'linear-gradient(to right, #ffa509, #ff7903 )', height: '25px'}">推送通知</u-button>
					</view>
				</view>
			</view>
			<view class="box-row u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10">
				<view class="item u-text-center u-flex-1">
					<i class="custom-icon-edit custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">菜单名</text>
				</view>
				<view class="item u-text-center u-flex-1">
					<i class="custom-icon-edit custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">菜单名</text>
				</view>
				<view class="item u-text-center u-flex-1">
					<i class="custom-icon-edit custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">菜单名</text>
				</view>
				<view class="item u-text-center u-flex-1">
					<i class="custom-icon-edit custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">菜单名</text>
				</view>
			</view>
			<view class="box-row u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10">
				<view class="item u-text-center u-flex-1">
					<i class="custom-icon-edit custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">菜单名</text>
				</view>
				<view class="item u-text-center u-flex-1">
					<i class="custom-icon-edit custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">菜单名</text>
				</view>
				<view class="item u-text-center u-flex-1">
					<i class="custom-icon-edit custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">菜单名</text>
				</view>
				<view class="item u-text-center u-flex-1">
					<i class="custom-icon-edit custom-icon u-font-40"></i>
					<text class="u-font-26 u-p-t-16 u-line-1 menus-name">菜单名</text>
				</view>
			</view>
		</view>
		
		
		<u-safe-bottom></u-safe-bottom>
		<menusBar tabbar theme="white" :activeIndex="5" border></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixCheckLoginStatus from '@/config/mixCheckLoginStatus'
	export default {
		// mixins: [mixCheckLoginStatus],
		data() {
			return {
				
			};
		},
		async onLoad() {
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleTakeAccount() {
				uni.showToast({
					title: '成功领取账号'
				})
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
	.wrapper {
		padding-bottom: 50px;
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
			}
			.sub2 {
				
			}
		}
	}
	.user-data {
	}
</style>
