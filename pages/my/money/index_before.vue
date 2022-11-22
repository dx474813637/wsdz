<template>
	<view class="w u-p-20">
		<view class="w-bg"></view>
		<u-navbar
			bgColor="transparent"
			:fixed="false"
			:title="tishi.list[sinoAccOpen == 1 ? 2 : 1].title"
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
				<view>{{tishi.list[ sinoAccOpen == 1 ? 2 : 1].info}}</view>
				<view class="u-font-28 u-p-t-10" style="opacity: 0.8;">{{tishi.list[sinoAccOpen == 1 ? 2 : 1].other}}</view>
				
			</view> 
			<view class="form-w u-m-t-30">
				<view class="form-header u-flex u-flex-items-center u-flex-between u-p-25">
					<view class="item u-flex u-flex-items-center">
						<u-icon
							name="account-fill"
							color="#8db5ff"
							size="24"
						></u-icon> 
						<view class="u-p-l-10">账号信息</view>
					</view>
					<view class="item u-flex u-flex-items-center">
						<view class="f-h-label">
							{{sinoAccOpen == 1 ? '未绑定提现卡' :'未开通资金账户'}}
						</view>
					</view>
				</view>
				<view class="form-content u-p-l-40 u-p-r-40 u-p-20">
					<view class="u-p-20">
						<template v-if="sinoAccOpen == 1">
							<view class="item-rows u-p-t-30 u-p-b-30 u-flex u-flex-items-center u-flex-between">
								<view class="rows-label u-flex u-flex-items-center">
									<view class="rows-label-bg u-flex u-flex-center u-flex-items-center">
										<i class="custom-icon-card_fill custom-icon"></i>
									</view>
									<view class="u-p-l-30">付款账户</view>
								</view>
								<view class="rows-content">11000000011</view>
							</view>
							<view class="item-rows u-p-t-30 u-p-b-30 u-flex u-flex-items-center u-flex-between">
								<view class="rows-label u-flex u-flex-items-center">
									<view class="rows-label-bg u-flex u-flex-center u-flex-items-center">
										<i class="custom-icon-card_fill custom-icon"></i>
									</view> 
									<view class="u-p-l-30">收款账户</view>
								</view>
								<view class="rows-content">11000000011</view>
							</view>
						</template>
						<template v-else>
							<view class="item-rows u-p-t-30 u-p-b-30 u-flex   u-flex-between">
								<view class="rows-label">Sinopay账号</view>
								<view class="rows-content">{{sino.sinopay_poster}}</view>
							</view>
							<view class="item-rows u-p-t-30 u-p-b-30 u-flex   u-flex-between">
								<view class="rows-label">用户类型</view>
								<view class="rows-content">企业</view>
							</view>
							<view class="item-rows u-p-t-30 u-p-b-30 u-flex   u-flex-between">
								<view class="rows-label">用户名称</view>
								<view class="rows-content">{{myCpy.name}}</view>
							</view>
							<view class="item-rows u-p-t-30 u-p-b-30 u-flex   u-flex-between">
								<view class="rows-label">绑定时间</view>
								<view class="rows-content">{{sino.ctime}}</view>
							</view>
						</template>
						
						<view class="icon-w u-flex u-flex-items-center u-flex-between u-p-t-50 u-p-b-50">
							<view class="item left u-flex u-flex-items-center u-flex-start">
								<i class="custom-icon-moneybag custom-icon"></i>
								<view class="icon-text u-m-l-20 u-flex u-flex-column u-flex-items-start">
									<view class="u-font-28 u-m-b-6">资金账户</view>
									<view class="u-font-24 icon-text-tag active" v-if="sinoAccOpen == 1">已开通</view>
									<view class="u-font-24 icon-text-tag" v-else>未开通</view>
								</view>
							</view>
							<view class="item right u-flex u-flex-items-center u-flex-end">
								<i class="custom-icon-vipcard custom-icon"></i>
								<view class="icon-text u-m-l-20 u-flex u-flex-column u-flex-items-start">
									<view class="u-font-28 u-m-b-6">绑定提现卡</view>
									<view class="u-font-24 icon-text-tag">未绑定</view> 
								</view>
							</view>
						</view>
					</view>
					<view class="u-p-t-50 u-m-b-40 u-text-center">
						<u-button 
							type="primary" 
							shape="circle" 
							:customStyle="{backgroundImage: 'linear-gradient(to right,#6cb5fa, #4077f6)'}" 
							@click="handleGoto({url: '/pages/my/money/card_add'})"
							v-if="sinoAccOpen == 1"
						>
							{{tishi.list[2].button || '绑定提现银行卡'}}
						</u-button>
						<u-button type="primary" shape="circle" :customStyle="{backgroundImage: 'linear-gradient(to right,#6cb5fa, #4077f6)'}" @click="kaitong" v-else>
							{{tishi.list[1].button || '开通银行账户'}}
						</u-button>
						<view v-if="sinoAccOpen == 1" style="color: #999; padding: 10px; font-size: 14px">可用于交易资金提现</view>
					</view>
				</view>
			</view> 
		</view> 
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy,
				tishi: state => state.sinopay.tishi,
				sino: state => state.sinopay.sino,
				sinoAccOpenObj: state => state.sinopay.sinoAccOpenObj,
			}),
			...mapGetters({ 
				sinoAccOpen: 'sinopay/sinoAccOpen',
			}),
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto',
				setSinoAccOpen: 'sinopay/setSinoAccOpen'
			}),
			kaitong() {
				this.setSinoAccOpen(1)
			}, 
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style scoped lang="scss">
	.item-rows {
		border-bottom: 1rpx solid #eee;
		.rows-label {
			white-space: nowrap;
			.rows-label-bg {
				background: #f9f9f9;
				width: 45px;
				height: 45px;
				border-radius: 24px;
				.custom-icon {
					font-size: 25px;
					color: #555;
				}
			}
		}
		.rows-content {
			text-align: right;
			color: #666
		}
	}
	.icon-w {
		.item {
			width: 50%; 
			&:last-child{
				border-left: 1rpx solid #eee;
			}
			&.left {
				.custom-icon {
					color: #3b8ed3;
					font-size: 34px
				}
			}
			&.right {
				.custom-icon {
					color: #cb4431;
					font-size: 34px
				}
			}
			.icon-text {
				color: #888;
				.icon-text-tag {
					color: #fff;
					background: red;
					border-radius: 8rpx;
					padding: 2px 8px; 
					&.active {
						background: #3060b2
					}
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
