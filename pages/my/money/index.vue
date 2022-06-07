<template>
	<view class="wrapper">
		<view class="header">
			<view class="header-box">
				<!-- 已登录 -->
				<view class="person">
					<view class="item-left">
						<view class="person-avatar">
							<open-data type="userAvatarUrl"></open-data>
						</view>
					</view>
					<view class="item-right">
						<view class="person-nick">张三</view>
						<view class="person-sub">
							<view class="status u-flex u-flex-items-center">
								<view class="icon-acc u-flex u-flex-items-center u-flex-center">
									<i class="custom-icon-my custom-icon"></i>
								</view>
								<span class="acc-name">dx5184</span>
							</view>
						</view>
					</view>
					<view class="item-info">
						<view @click="handleGoto('/pages/my/money/sino_info')" class="info-a u-flex u-flex-items-center">
							<text class="u-font-28">账号信息</text>
							<i class="custom-icon-right custom-icon"></i>
						</view>
					</view>
				</view>

				<view class="main-card">
					<view @click="handleGoto('/pages/my/user/index')" class="card-item">
						<view class="item-top icon">
							<i class="custom-icon-my custom-icon"></i>
						</view>
						<view class="item-bottom c-title">返回我的</view>
					</view>
					<view @click="handleGoto('/pages/my/money/sino_info')" class="card-item">
						<view class="item-top icon">
							<i class="custom-icon-safe custom-icon"></i>
						</view>
						<view class="item-bottom c-title">已认证</view>
					</view>
					<!-- <navigator url="/pages/my/money/sino_info" class="card-item">
						<view class="item-top icon">
							<i class="custom-icon-warn custom-icon" style="color: red"></i>
						</view>
						<view class="item-bottom c-title">未认证</view>
					</navigator> -->
					<view @click="handleGoto('/pages/my/money/bill')" class="card-item">
						<view class="item-top icon">
							<i class="custom-icon-form custom-icon"></i>
						</view>
						<view class="item-bottom c-title">付款记录</view>
					</view>
					<view @click="handleGoto('/pages/my/money/safe_list')" class="card-item">
						<view class="item-top icon">
							<i class="custom-icon-lock custom-icon"></i>
						</view>
						<view class="item-bottom c-title">安全设置</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="main">
			<view class="main-wrapper">
				<view class="main-box">
					<view class="box-header u-flex u-flex-between u-flex-items-end">
						<view class="item-left u-flex">
							<view class="box-title">现金账户</view>
						</view>
						<view class="item-right u-flex">
							<view @click="handleGoto('/pages/my/money/sino_zh1')" class="u-flex a-href">
								<span>付款账户信息</span>
								<i class="custom-icon-right custom-icon"></i>
							</view>
						</view>
					</view>
					<moneyCard></moneyCard>
				</view>
				<view class="main-list">
					<view @click="handleGoto('/pages/my/money/bank_card')" class="list-item">
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
					<view @click="handleGoto('/pages/my/money/sino_cz_list')" class="list-item">
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
							<view>100000110011</view>
							<i class="custom-icon-right custom-icon"></i>
						</view>
					</view>
				</view>
			</view>
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
						<image src="http://dingxiang.netsun.testwebsite.cn/mShop/img/bg-sou.png" alt="" />
					</view>
					<view class="header-title">您还未注册</view>
				</view>
				<view class="wrap-content">
					<view class="content u-flex u-flex-column u-flex-items-center">
						<view class="warning">请准备好</view>
						<view>身份信息/企业信息</view>
						<view>银行卡号/企业开户账号</view>
						<view class="handle-box u-flex u-flex-column u-flex-items-center">
							<view @click="handleGoto('/pages/my/money/sino_reg')" class="handle-btn reg">注册新账号</view>
							<view @click="handleGoto('/pages/my/money/sino_bind')" class="handle-btn">绑定已有账号</view>
							<view class="exit-btn" @click="exitBtn">我要考虑一下</view>
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
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import moneyCard from '@/pages/my/components/moneyCard/moneyCard.vue'
	export default {
		data() {
			return {
				show: true,
			};
		},
		components: {
			moneyCard
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
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
	.wrapper {
		padding-bottom: 60px;
	}
	.header {
		position: relative;
		background-image: url("http://dingxiang.netsun.testwebsite.cn/mShop/img/bg1.png");
		background-size: 100% 80%;
		background-position: top;
		background-repeat: no-repeat;
		padding-top: 85px;

		.header-box {
			padding: 0 12px;

			.person {
				display: flex;
				align-items: center;
				height: 50px;
				margin-bottom: 18px;
				position: relative;

				.item-left {
					flex: 0 0 50px;
					width: 50px;
					height: 50px;

					.person-avatar {
						width: 50px;
						height: 50px;
						border-radius: 50%;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
						}
					}
				}

				.item-right {
					flex: 0 0 calc(100% - 50px);
					width: calc(100% - 50px);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					padding-left: 10px;

					.person-nick {
						color: #fff;
						font-size: 15px;
						/* padding-left: 8px; */
					}

					.person-sub {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;
						font-size: 12px;

						.status {
							/* background-color: #007aff; */
							color: #71adef;
							height: 30px;
							border-radius: 15px;
							/* padding: 0 15px; */
							position: relative;

							.icon-acc {
								position: absolute;
								left: 0;
								top: 50%;
								transform: translateY(-50%);
								width: 20px;
								height: 20px;
								border-radius: 50%;
								background-color: #feb800;

								.custom-icon {
									color: #fff;
									font-size: 12px;
								}
							}

							.acc-name {
								padding: 2px 10px 2px 25px;
								border-radius: 10px;
								background-color: rgba(0, 0, 0, 0.7);
								color: #fff;
								margin-left: 5px;
							}
						}
					}
				}

				.item-info {
					position: absolute;
					right: -10px;
					top: 50%;
					transform: translateY(-50%);

					.info-a {
						padding: 2px 5px 2px 15px;
						// display: inline-block;
						background-color: #007aff;
						color: #fff;
						border-radius: 15px 0 0 15px;
					}
				}
			}
		}

	}

	.main-card {
		background-color: #fff;
		height: 90px;
		display: flex;
		align-items: center;
		border-radius: 3px;
		box-shadow: 0 0 5px rgba(90, 90, 90, 0.05);
		margin-bottom: 20px;

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
					color: #007aff;
				}
			}

			.item-bottom {
				&.c-title {
					font-size: 12px;
				}
			}
		}
	}
	.main {
		.main-wrapper {
			padding: 5px 12px;
			.main-box {
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
			height: 380px;
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
					background-image: url("http://dingxiang.netsun.testwebsite.cn/mShop/img/bg2.png");
					background-size: 100%;
					.bg {
						height: 90px;
						img {
							height: 100%;
						}
					}
					.header-title {
						padding-bottom: 0px;
					}
				}
				.header-title {
					font-size: 16px;
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
