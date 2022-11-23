<template>
	<view class="w u-p-20">
		<view class="w-bg"></view>
		<u-navbar
			bgColor="transparent"
			:fixed="false"
			title="资金平台"
			titleStyle="color: #fff"
			autoBack
		>
			<view slot="left">
				<view class="text-white u-flex u-flex-items-center">
					<u-icon
						name="arrow-left"
						color="#fff"
						size="20"
					></u-icon> 
				</view>
				
			</view> 
		</u-navbar>
		<view class="main u-p-10 u-p-t-20">
			<view class="text-white u-p-b-30 u-p-t-10 u-font-32 info-box u-flex u-flex-items-center u-flex-column">
				<view class="u-font-40">收款账户</view>
				<view class="u-font-28 u-p-t-10" style="opacity: 0.8; font-weight: 300">{{wallet.name}}</view>
				
			</view> 
			<view class="form-w u-m-t-30">
				<view class="form-header u-flex u-flex-items-center u-flex-between u-p-25">
					<view class="item u-flex u-flex-items-center">
						<u-icon
							name="account-fill"
							color="#8db5ff"
							size="24"
						></u-icon> 
						<view class="u-p-l-10">收款账户</view>
					</view>
					<view class="item u-flex u-flex-items-center">
						<view class="f-h-label" @click="handleGoto({url: '/pages/my/money/sino_cz_list', params: {wallet: type}})" >充值提现记录</view>
					</view>
				</view>
				<view class="form-content u-p-l-40 u-p-r-40 u-p-20">
					<view class=" ">
						<view class="item-rows u-p-t-18 u-p-b-18 u-flex   u-flex-between">
							<view class="rows-label">账户名称</view>
							<view class="rows-content">{{wallet.name}}</view>
						</view>
						<view class="item-rows u-p-t-18 u-p-b-18 u-flex   u-flex-between">
							<view class="rows-label">账户</view>
							<view class="rows-content">{{wallet.user_fundaccno}}</view>
						</view>
						<view class="item-rows u-p-t-18 u-p-b-18 u-flex   u-flex-between">
							<view class="rows-label">类型</view>
							<view class="rows-content">收款账户</view>
						</view>
						<view class="item-rows u-p-t-18 u-p-b-18 u-flex   u-flex-between">
							<view class="rows-label">手机</view>
							<view class="rows-content">{{wallet.mobile}}</view>
						</view>
						<view class="item-rows u-p-t-18 u-p-b-18 u-flex   u-flex-between">
							<view class="rows-label">开通时间</view>
							<view class="rows-content">{{wallet.ctime}}</view>
						</view>
					</view>
				</view>
				 
			</view>
			<view class="main-list u-m-t-30">
				<view @click="handleGoto({url: '/pages/my/money/bank_card', params: {wallet: type}})" class="list-item">
					<view class="item-left">
						<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
							<i class="custom-icon-vipcard custom-icon"></i>
						</view>
						<view class="text-base item-t">
							<view class="t-title u-font-32 u-m-b-10">提现银行卡</view>
							<view class="t-sub u-font-24">仅限账户认证与交易资金的提现</view>
						</view>
					</view>
					<view class="item-right">
						<u-button type="primary" shape="circle" plain size="mini" color="#f90" text="去查询" ></u-button>
					</view>
				</view>
				<!-- <view @click="handleGoto({url: '/pages/my/money/bank_card', params: {wallet: type}})" class="list-item">
					<view class="item-left">
						<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
							<i class="custom-icon-vipcard custom-icon"></i>
						</view>
						<view class="text-base item-t">
							<view class="t-title u-font-32 u-m-b-10">银联充值银行卡</view>
							<view class="t-sub u-font-24">进行充值前银联绑定银行卡</view>
						</view>
					</view>
					<view class="item-right">
						<u-button type="primary" shape="circle" plain size="mini" color="#f90" text="去查询" ></u-button>
					</view>
				</view> -->
				<view @click="show_zzlc = true" class="list-item">
					<view class="item-left">
						<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
							<i class="custom-icon-searchlist custom-icon"></i>
						</view>
						<view class="text-base item-t">
							<view class="t-title u-font-32 u-m-b-10">转账充值</view>
							<view class="t-sub u-font-24">进行充值前银联绑定银行卡</view>
						</view>
					</view>
					<view class="item-right">
						<u-button type="primary" shape="circle" plain size="mini" color="#f90" text="去查询" ></u-button>
					</view>
				</view> 
			</view>
							
		</view>
 
		 <ZzCzPopup
			:aid="aid"
			:sinoType="type"
			:show="show_zzlc"
			@close="show_zzlc = false"  
			></ZzCzPopup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex' 
	import ZzCzPopup from '@/pages/my/components/ZzCzPopup/ZzCzPopup.vue'
	export default {
		data() {
			return {
				type: 'S',
				show_zzlc: false,
			};
		},
		computed: {
			...mapState({
				sino: state => state.sinopay.sino,
				sinoFund: state => state.sinopay.sinoFund,
				myCpy: state => state.user.myCpy 
			}),
			wallet() {
				let w = {};
				if(!this.sinoFund || this.sinoFund.length == 0) return w;
				w = this.sinoFund.filter(ele => ele.type == this.type)[0] || {}
				return w
			},
			aid() {  
				return this.wallet.id 
			},
		},
		components: { 
			ZzCzPopup
		},
		async onLoad() {
			uni.showLoading()
			await this.getSinoFundAccount()
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getSinoFundAccount: 'sinopay/getSinoFundAccount', 
			}),
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped> 
	.main-list {
		// box-shadow: 0 0 5px rgba(90, 90, 90, 0.05);
		margin-bottom: 10px;
		.list-item {
			padding: 0 10px;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 70px; 
			border-radius: 3px;
			border-bottom: 1px solid #f8f8f8;
			.t-title {
				color: #000;
			}
			.t-sub {
				color: #999;
			}
			.custom-icon {
				color: #666;
			}
			.item-left {
				display: flex;
				align-items: center;
				.icon-wrap {
					width: 35px;
					height: 35px;
					border-radius: 50%;
					background-color: #356dc6;
					.custom-icon {
						font-size: 20px;
						color: #fff;
					}
				}
				.item-t {
					margin-left: 20px;
					font-size: 15px;
				}
			}
			.item-right {
				display: flex;
				align-items: center;
				color: #999;
				.custom-icon {
					color: #ccc;
				}
			}
		}
	}
	 
	 .form-header {
	 	color: #fff;
	 	background: #3060b2;
	 	border-radius: 8px 8px 0 0;
	 	box-shadow: 0 -6px 10px rgba(0,0,0,.1);
	 	.f-h-label {
	 		border: 1rpx solid #fffc9d;
	 		color: #fffc9d;
	 		border-radius: 4px;
	 		padding: 6rpx 16rpx;
	 		font-size: 24rpx;
	 	}
	 }
	.item-rows {
		border-bottom: 1rpx solid #eee;
		.rows-label {
			white-space: nowrap;
			.rows-label-bg {
				background: #e5efff;
				width: 45px;
				height: 45px;
				border-radius: 24px;
				.custom-icon {
					font-size: 25px;
					color: #3060b2;
				}
			}
		}
		.rows-content {
			text-align: right;
			color: #666
		}
	}
	 .w {
	 	box-sizing: border-box;
	 	// position: absolute;
	 	// z-index: 1;
	 	min-height: 100vh;
	 	// background-image: url("https://wx.rawmex.cn/Public/bg1.png");
	 	// background-size: 100% 240px;
	 	// background-position: top;
	 	// background-repeat: no-repeat;
	 	width: 100%;
	 	// height: 240px;
	 	// left: 0;
	 	// top: 0;
	 }
	 .w-bg {
	 	position: absolute;
	 	left: 0;
	 	top: 0;
	 	height: 240px;
	 	background: #3f5297;
	 	width: 100%;
	 } 
	 .main {
	 	position: relative;
	 	z-index: 1;
	 	box-sizing: border-box;
	 }
	 .form-w {
	 	box-sizing: border-box;
	 	border-radius: 10px;
	 	// overflow: hidden;
	 	.form-content {
	 		background-color: #fff;
	 	}
	 }
</style>
