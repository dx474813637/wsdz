<template>
	<view class="wrapper">
		
		<SinoHeader
			mode="1"
		></SinoHeader>
		<view class="main">
			<view class="main-wrapper" v-if="index_mode == 0">
				<view class="main-box">
					<view class="box-header u-flex u-flex-between u-flex-items-end">
						<view class="item-left u-flex u-flex-items-baseline">
							<view class="box-title">现金账户</view>
							<!-- <view class="box-title u-m-l-20"> 
								<u-button size="mini" type="primary" @click="index_mode = 1">
									<view class="u-flex u-flex-items-center">
										<text class="custom-icon-qiehuan1 custom-icon u-font-24"></text>
										<text class="u-m-l-10 u-font-26">票据账户</text>
									</view> 
								</u-button>
							</view> -->
						</view>
						<view class="item-right u-flex">
							<view @click="handleGoto('/pages/my/money/sino_zh1')" class="u-flex a-href">
								<span>付款账户信息</span>
								<i class="custom-icon-right custom-icon"></i>
							</view>
						</view>
					</view>
					<moneyCard sinoType="B"></moneyCard>
				</view>
				<view class="main-list">
					<view @click="handleGoto({url: '/pages/my/money/bank_card', params: {wallet: 'B'}})" class="list-item">
						<view class="item-left">
							<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
								<i class="custom-icon-vipcard custom-icon"></i>
							</view>
							<view class="text-base item-t">绑卡认证 / 绑卡查询 / 转账充值</view>
						</view>
						<view class="item-right">
							<i class="custom-icon-right custom-icon"></i>
						</view>
					</view>
					<view @click="handleGoto({url: '/pages/my/money/sino_cz_list', params: {wallet: 'B'}})" class="list-item">
						<view class="item-left">
							<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
								<i class="custom-icon-searchlist custom-icon"></i>
							</view>
							<view class="text-base item-t">充值 / 提现 / 转账 记录</view>
						</view>
						<view class="item-right">
							<i class="custom-icon-right custom-icon"></i>
						</view>
					</view>
					<view @click="handleGoto('/pages/my/money/sino_zh2')" class="list-item">
						<view class="item-left">
							<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
								<i class="custom-icon-moneybag custom-icon"></i>
							</view>
							<view class="text-base item-t">收款账户</view>
						</view>
						<view class="item-right">
							<view>{{wallet_s.user_fundaccno}}</view>
							<i class="custom-icon-right custom-icon"></i>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="main-wrapper" v-else>
				<view class="main-box">
					<view class="box-header u-flex u-flex-between u-flex-items-end">
						<view class="item-left u-flex u-flex-items-baseline">
							<view class="box-title">票据账户</view>
							<view class="box-title u-m-l-20"> 
								<u-button size="mini" type="primary" @click="index_mode = 0">
									<view class="u-flex u-flex-items-center">
										<text class="custom-icon-qiehuan1 custom-icon u-font-24"></text>
										<text class="u-m-l-10 u-font-26">现金账户</text>
									</view> 
								</u-button> 
							</view>
						</view> 
						<view class="item-right u-flex">
							<view @click="getSinoBillAccount" class="u-flex a-href">
								<i class="custom-icon custom-icon-refresh u-font-30 " ></i>
							</view>
						</view>
					</view> 
					<view style="position: relative;">
						<view v-if="sinoBillLoading" class="loading-w u-flex u-flex-items-center u-flex-center">
							<u-loading-icon mode="circle" ></u-loading-icon>
						</view>
						<view class="pj-box bg-white u-radius-10 uni-shadow-base u-p-30" v-if="sinoBillAccount">
							<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
								<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">SINOPAY票据账户</view>
								<view class="item u-font-30 u-text-right">{{sinoBillAccount.user_billaccno}}</view>
							</view> 
							<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
								<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">开户银行</view>
								<view class="item u-font-30 u-text-right">{{sinoBillAccount.bank_code}}-{{sinoBillAccount.bank_name}}</view>
							</view> 
							<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
								<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">票据账户名称</view>
								<view class="item u-font-30 u-text-right">{{sinoBillAccount.bank_bill_name}}</view>
							</view> 
							<view class="rows u-flex u-flex-items-start u-flex-between ">
								<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">创建时间</view>
								<view class="item text-base u-font-30 u-text-right">{{sinoBillAccount.ctime}}</view>
							</view> 
						</view>
						<view v-else>
							<DisabledCard
								title="票据账户"
								></DisabledCard>
						</view> 
					</view>
					
				</view>
				<view class="main-box"> 
					<view class="box-header u-flex u-flex-between u-flex-items-end" v-if="sinoBillAccountList.length > 0">
						<view class="item-left u-flex u-flex-items-baseline">
							<view class="box-title">电票账户</view> 
						</view>  
						<view class="item-right u-flex">
							<view @click="getSinoBillAccountList" class="u-flex a-href">
								<i class="custom-icon custom-icon-refresh u-font-30 " ></i>
							</view>
						</view>
					</view>
					<view class="" style="position: relative;">
						<view v-if="sinoBillListLoading" class="loading-w u-flex u-flex-items-center u-flex-center">
							<u-loading-icon mode="circle" ></u-loading-icon>
						</view>
					 	<view class="list" v-if="sinoBillAccountList.length > 0">
					 		<view 
					 			v-for="item in sinoBillAccountList"
					 			:key="item.id"
					 			class="pj-box bg-white u-radius-10 uni-shadow-base u-p-30 u-m-b-30">
					 			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
					 				<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">SINOPAY票据账户</view>
					 				<view class="item u-font-30 u-text-right">{{item.user_billaccno}}</view>
					 			</view> 
					 			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
					 				<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">电票账户</view>
					 				<view class="item u-font-30 u-text-right">{{item.acctNo}}</view>
					 			</view> 
					 			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
					 				<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">账户名称</view>
					 				<view class="item u-font-30 u-text-right">{{item.acctName}}</view>
					 			</view> 
					 			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
					 				<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">开户行号</view>
					 				<view class="item u-font-30 u-text-right">{{item.acctSvcr}}</view>
					 			</view> 
					 			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
					 				<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">开户行名</view>
					 				<view class="item text-base u-font-30 u-text-right">{{item.acctSvcname}}</view>
					 			</view> 
					 			<view class="rows u-flex u-flex-items-start u-flex-between ">
					 				<view class="item text-base u-font-28 u-m-r-20" style="flex-shrink: 0;">创建时间</view>
					 				<view class="item text-base u-font-30 u-text-right">{{item.ctime}}</view>
					 			</view> 
					 		</view>
					 	</view>
						<view v-else>
							<DisabledCard
								title="电票账户"
								></DisabledCard>
						</view> 
					</view>
					 
				</view>
				
				
			</view> -->
			
		</view>
		<u-popup 
			:show="show" 
			@close="close" 
			@open="open" 
			mode="center" 
			round="16"
			:closeOnClickOverlay="false"
			>
			<view class="dx-popup-wrap bg-white">
				<view class="wrap-header wrap-header-bg u-flex u-flex-column u-flex-items-center">
					<view class="bg">
						<!-- <image src="http://dingxiang.netsun.testwebsite.cn/mShop/img/bg-sou.png" alt="" /> -->
					</view>
					<view class="header-title">您还未开通或绑定资金账号</view>
				</view>
				<view class="wrap-content">
					<view class="content u-flex u-flex-column u-flex-items-center">
						<view class="warning">请准备好</view>
						<view>企业信息</view>
						<view>企业开户账号</view>
						<view class="handle-box u-flex u-flex-column u-flex-items-center">
							<view @click="handleGoto('/pages/my/money/sino_reg')" class="handle-btn reg">开通资金账号</view>
							<view @click="handleGoto('/pages/my/money/sino_bind')" class="handle-btn">绑定已有资金账号</view>
							<view class="exit-btn" @click="exitBtn">暂不开通</view>
						</view>
					</view>
				</view>
			</view>
			
		</u-popup>
		<u-safe-bottom></u-safe-bottom>
		<menusBar tabbar theme="white" border></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import moneyCard from '@/pages/my/components/moneyCard/moneyCard.vue'
	import SinoHeader from '@/pages/my/components/SinoHeader/SinoHeader.vue'
	// import DisabledCard from '@/pages/my/components/DisabledCard/DisabledCard.vue'
	export default {
		data() {
			return {
				show: false,
				indexLoading: true,
				index_mode: 0,
			};
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				sino: state => state.sinopay.sino,
				sinoFund: state => state.sinopay.sinoFund,
				sinoBillLoading: state => state.sinopay.sinoBillLoading,
				sinoBillListLoading: state => state.sinopay.sinoBillListLoading,
				sinoBillAccount: state => state.sinopay.sinoBillAccount,
				sinoBillAccountList: state => state.sinopay.sinoBillAccountList,
			}),
			wallet_b() {
				if(!this.sinoFund || this.sinoFund.length == 0) return {}
				return this.sinoFund.filter(ele => ele.type == 'B')[0] || {}
			},
			wallet_s() {
				if(!this.sinoFund || this.sinoFund.length == 0) return {}
				return this.sinoFund.filter(ele => ele.type == 'S')[0] || {}
			}
		},
		components: {
			moneyCard,
			SinoHeader,
			// DisabledCard
		},
		async onLoad() {
			this.myCompany()
			await this.getSinoAccount()
			console.log(this.sino)
			if(!this.sino.hasOwnProperty('id') || this.sino.state != 2) {
				this.show = true
			}else { 
				this.getSinoFundAccount() 
				// this.initSinoBill()
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getSinoFundAccount: 'sinopay/getSinoFundAccount',
				getSinoBillAccount: 'sinopay/getSinoBillAccount',
				getSinoBillAccountList: 'sinopay/getSinoBillAccountList',
				getSinoAccount: 'sinopay/getSinoAccount',
				myCompany: 'user/myCompany'
			}),
			initSinoBill() {
				this.getSinoBillAccount()
				this.getSinoBillAccountList() 
			},
			close() {
				
			},
			open() {
				
			},
			exitBtn() {
				this.show = false
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	.loading-w {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background-color: rgba(255,255,255,.7);
	}
	.wrapper {
		padding-bottom: 60px;
	} 
	.main {
		.main-wrapper {
			padding: 5px 12px;
			.main-box {
				position: relative;
				margin-bottom: 20px;
				.box-header {
					margin-bottom: 15px;
					.item-left {
						.box-title {
							font-size: 19px;
							color: #000;
						}
					}
					.item-right {
						font-size: 12px;
						.a-href {
							color: #999;
							span {
							}
							.custom-icon {
								color: #ccc;
								margin-left: 6px;
							}
						}
					}
				}
				
				
			}
			.main-list {
				box-shadow: 0 0 5px rgba(90, 90, 90, 0.05);
				margin-bottom: 10px;
				.list-item {
					padding: 0 10px;
					background-color: #fff;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 70px;
					margin-bottom: 10px;
					border-radius: 3px;
					/* border-bottom: 1px solid #f8f8f8; */
	
					.custom-icon {
						color: #666;
					}
					.item-left {
						display: flex;
						align-items: center;
						.icon-wrap {
							width: 40px;
							height: 40px;
							border-radius: 50%;
							background-color: #f8f8f8;
							.custom-icon {
								font-size: 24px;
								color: #000;
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
			.logout-btn {
				background-color: #d03333;
				line-height: 40px;
				border-radius: 5px;
				display: block;
				color: #fff;
				text-align: center;
				margin: 30px auto 20px;
			}
		}
	}

	.dx-popup-wrap {
			// position: absolute;
			width: 280px;
			height: 360px;
			border-radius: 8px;
			overflow: hidden;
			// top: 0;
			// left: 0;
			// right: 0;
			// bottom: 0;
			// margin: auto;
			/* top: 50%;
			left: 50%;
			transform: translate(-50%, -50%); */
			&.bg-white {
				background-color: #fff;
			}
			.wrap-header {
				padding: 20px 0;
				&.wrap-header-bg {
					padding: 10px 0 30px;
					color: #fff;
					background-image: url("https://wx.rawmex.cn/Public/bg2.png");
					background-size: 100%;
					.bg {
						height: 40px;
						img {
							height: 100%;
						}
					}
					.header-title {
						padding-bottom: 30px;
					}
				}
				.header-title {
					font-size: 18px;
				}
			}
			.wrap-content {
				position: relative;
				&:before {
					z-index: 10;
					content: "";
					position: absolute;
					background-color: #8be1ff;
					width: 250%;
					height: 400px;
					top: -20px;
					left: 50%;
					border-radius: 100%;
					transform: translateX(-50%)
					
				}
				&:after {
					z-index: 10;
					content: "";
					position: absolute;
					background-color: #fff;
					width: 200%;
					height: 150px;
					top: -12px;
					left: 50%;
					border-radius: 100%;
					transform: translateX(-50%)
					
				}
				.content {
					position: relative;
					padding: 10px 0 20px;
					z-index: 20;
					background-color: #fff;
				}
				.warning {
					background-color: #f2f2f2;
					color: #007aff;
					border-radius: 10px;
					line-height: 20px;
					display: block;
					padding: 0 8px;
					margin-bottom: 10px;
					font-size: 14px;
				}
				view {
					line-height: 24px;
					color: #999;
					font-size: 16px;
				}
				.handle-box {
					padding: 10px 0 0;
					.handle-btn {
						line-height: 35px;
						background-color: #eee;
						color: #666;
						font-size: 16px;
						border-radius: 20px;
						display: block;
						margin-bottom: 10px;
						width: 200px;
						text-align: center;
						&.reg {
							background-color: #52a8ec;
							color: #fff;
						}
					}
					.exit-btn {
						padding-top: 15px;
						color: #666;
					}
				}
			}
		}
</style>
