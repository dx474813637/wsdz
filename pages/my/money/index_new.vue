<template>
	<view class="w u-p-20">
		<view class="w-bg"></view>
		<u-navbar
			bgColor="transparent"
			:fixed="false"
			title="资金平台"
			titleStyle="color: #fff" 
		>
			<view slot="left">
				<view class="text-white u-flex u-flex-items-center" @click="handleGoto({url: '/pages/my/user/index', type: 'reLaunch'})">
					<u-icon
						name="account-fill"
						color="#fff"
						size="20"
					></u-icon> 
				</view>
				
			</view> 
		</u-navbar>
		
		<view class="main u-p-10 u-p-t-20">
			<view class="text-white u-p-b-30 u-p-t-10 u-font-32 info-box u-flex u-flex-column">
				<view class="u-flex u-flex-items-baseline">
					<view class="u-font-40">{{tishi.list[4].title}}</view>
					<view class="ac_label u-m-l-10">{{sino.sinopay_poster}}</view>
				</view>
				<view class="u-font-28 u-p-t-10" style="opacity: 0.8;">{{tishi.list[4].info}}</view>
				
			</view>
			<!-- <view class="text-white u-font-28 u-p-b-30">
				所有表单都为必填
			</view> -->
			<view class="form-w u-m-t-30">
				<view class="tabs-w u-flex u-flex-items-end u-font-32">
					<view 
						class="tabs-item u-flex-center u-flex u-flex-items-center"
						v-for="(item, index) in tabs"
						:key="item.id"
						:class="{
							active: index == active,
							left: item.id == 1,
							right: item.id == 2
						}"
						@click="active = index"
					>
						<text :class="['custom-icon', item.icon]"></text>
						<text class="u-m-l-10">{{item.name}}</text>
					</view> 
				</view>
				<view class=" u-p-l-40 u-p-r-40 u-p-20">
					<view class="item-rows u-p-t-10 u-p-b-30 u-flex u-flex-items-end  u-flex-between">
						<view class="rows-label">
							<u-button type="warning" size="mini" text="转账充值" @click="show_zzlc = true" ></u-button>
						</view>
						<view class="rows-content ">
							<view class="u-font-26 " style="color: #999;" @click="handleGoto(`/pages/my/money/sino_zh${active == 1? '2' : '1'}`)"> 
								<text class="custom-icon-info custom-icon u-font-28"></text>
								<text class="u-m-l-6 ">账户信息</text>
							</view>
						</view>
					</view>
					<moneyCard2 :sinoType="sinoType" @getData="refreshAccFound"></moneyCard2> 
					
					<view class="icon-w u-flex u-flex-items-center u-flex-between u-p-t-16 u-p-b-16">
						<view class="item left u-flex u-flex-items-center u-flex-start u-p-r-40">
							<!-- <u-button type="primary" text="充值" color="#4960b1" @click="handleGoto({url: '/pages/my/money/sino_cz', params: {cz: 1, wallet: sinoType}})" ></u-button> -->
							<u-button type="primary" text="转账充值" color="#4960b1" @click="show_zzlc = true"  ></u-button>
						</view>
						<view class="item right u-flex u-flex-items-center u-p-t-20 u-p-b-20"> 
							<view class="icon-text u-m-l-30 u-flex u-flex-column u-flex-items-start u-font-28">
								<rich-text :nodes="cz_sub.cz"></rich-text> 
							</view>
						</view>
					</view>
					
					<view class="icon-w u-flex u-flex-items-center u-flex-between u-p-t-20 u-p-b-20">
						<view class="item left u-flex u-flex-items-center u-flex-start u-p-r-40">
							<u-button type="primary" plain text="提现" color="#4960b1" @click="handleGoto({url: '/pages/my/money/sino_cz', params: {cz: 0, wallet: sinoType}})" ></u-button>
						</view>
						<view class="item right u-flex u-flex-items-center u-p-t-14 u-p-b-14"> 
							<view class="icon-text u-m-l-30 u-flex u-flex-column u-flex-items-start u-font-28">
								<rich-text :nodes="cz_sub.tx"></rich-text> 
							</view>
						</view>
					</view>
					
					
				</view>
			</view>
			
			<view class="main-card u-m-t-30" >
				<view @click="handleGoto('/pages/my/user/index')" class="card-item">
					<view class="item-top icon">
						<i class="custom-icon-my custom-icon"></i>
					</view>
					<view class="item-bottom c-title">返回我的</view>
				</view>
				<view @click="handleGoto('/pages/my/money/sino_info')" class="card-item" v-if="sino.auth_state == 1">
					<view class="item-top icon">
						<i class="custom-icon-safe custom-icon"></i>
					</view>
					<view class="item-bottom c-title">已认证</view>
				</view>
				<view @click="handleGoto('/pages/my/money/sino_info')" class="card-item" v-else>
					<view class="item-top icon">
						<i class="custom-icon-warn custom-icon" style="color: red"></i>
					</view>
					<view class="item-bottom c-title">未认证</view>
				</view>
				<view @click="handleGoto('/pages/my/money/bill')" class="card-item">
					<view class="item-top icon">
						<i class="custom-icon-form custom-icon"></i>
					</view>
					<view class="item-bottom c-title">收付记录</view>
				</view>
				<view @click="handleGoto('/pages/my/money/safe_list')" class="card-item">
					<view class="item-top icon">
						<i class="custom-icon-lock custom-icon"></i>
					</view>
					<view class="item-bottom c-title">安全设置</view>
				</view>
			</view> 
			
			<view class="form-w u-font-28 u-p-20 text-base" v-if="tishi.list[4].other">
				<u-parse :content="tishi.list[4].other"></u-parse>
			</view>
		</view>
		
		
		 <ZzCzPopup
			:aid="wallet.id"
			:sinoType="sinoType"
			:show="show_zzlc"
			@close="show_zzlc = false"  
			></ZzCzPopup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import moneyCard2 from '@/pages/my/components/moneyCard2/moneyCard2.vue'
	import ZzCzPopup from '@/pages/my/components/ZzCzPopup/ZzCzPopup.vue'
	export default {
		data() {
			return {
				active: 0,
				tabs: [
					{
						id: 1,
						name: '付款账户',
						icon: 'custom-icon-moneybag',
						type: 'B',
					},
					{
						id: 2,
						name: '收款账户',
						icon: 'custom-icon-recharge',
						type: 'S',
					},
				],
				show_zzlc: false
			}
		},
		components: {
			moneyCard2,
			ZzCzPopup
		},
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy,
				tishi: state => state.sinopay.tishi,
				sino: state => state.sinopay.sino,
				sinoFund: state => state.sinopay.sinoFund,
			}),
			sinoType() {
				return this.tabs[this.active].type
			},
			cz_sub() {
				if(this.sino.sinopay_type == 'C') {
					return this.tishi.other.geren
				}else {
					return this.tishi.other.qiye
				}
				
			},
			wallet() {
				let w = {};
				if(!this.sinoFund || this.sinoFund.length == 0) return w;
				w = this.sinoFund.filter(ele => ele.type == this.sinoType)[0] || {}
				// console.log(this.sinoFund, w)
				return w
			},
		}, 
		async onLoad() {
			await this.getSinoAccount() 
			this.getSinoFundAccount()
		},
		watch: {
			active(n) {
				this.refreshAccFound()
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto',
				setSinoFundLoading: 'sinopay/setSinoFundLoading',
			}),
			...mapActions({
				getSinoAccount: 'sinopay/getSinoAccount', 
				getSinoFundAccount: 'sinopay/getSinoFundAccount', 
				refreshSinoFundAccount: 'sinopay/refreshSinoFundAccount'
			}),
			async refreshAccFound() {
				this.setSinoFundLoading(true)
				await this.refreshSinoFundAccount({id: this.wallet.id})
				this.getSinoFundAccount()
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style scoped lang="scss">
	
	.main-card {
		background-color: #fff;
		height: 90px;
		display: flex;
		align-items: center;
		border-radius: 3px;
		box-shadow: 0 0 5px rgba(90, 90, 90, 0.05);
		margin-bottom: 10px;
	
		.card-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
			align-items: center;
	
			.item-top {
				height: 30px;
				display: flex;
				align-items: center;
				color: #000;
				margin-bottom: 8px;
	
				&.num {
					font-weight: bold;
					font-size: 16px;
				}
	
				.custom-icon {
					font-size: 28px;
					color: #3060b2;
				}
			}
	
			.item-bottom {
				&.c-title {
					font-size: 12px;
				}
			}
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
	.icon-w {
		border-top: 1rpx solid #eee;
		.item {
			box-sizing: border-box;
			&:last-child{
				border-left: 1rpx solid #eee;
			}
			&.left {
				width: 40%; 
				.custom-icon {
					color: #3b8ed3;
					font-size: 34px
				}
			}
			&.right {
				width: 60%; 
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
	.tabs-w { 
		background-color: #fff;
		border-radius: 8px 8px 0 0;
		position: relative;
		&::before,
		&::after {
			content: '';
			position: absolute;
			left: 0;
			width: 100%;
			height: 10px;
		}
		&::before {
			top: 0;
			background-color: #eee;
		}
		&::after {
			bottom: 0;
			background-color: #fff;
		}
		.tabs-item {
			width: 50%;
			height: 45px;
			line-height: 45px;
			color: #999;
			background: #eee;
			position: relative;
			z-index: 2; 
			.custom-icon {
				font-size: 18px;
			}
			&.active { 
				color: #3f5297;
				background: #fff; 
				z-index: 10;
				font-size: 34rpx;
			} 
			&.left {
				border-radius: 0 10px 10px 0;
			}
			&.right {
				border-radius: 10px 0 0 10px;
			}
			
		}
	}
	.main {
		position: relative;
		z-index: 1;
		box-sizing: border-box;
	}
	.form-w {
		box-sizing: border-box;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
		background-color: #fff;
		.form-content {
			background-color: #fff;
		}
	}
	.ac_label {
		color: #fff;
		padding: 2px 12px;
		border-radius: 20px;
		background-color: #a3add0;
		font-size: 14px;
		font-weight: 300;
	}
</style>


</style>
