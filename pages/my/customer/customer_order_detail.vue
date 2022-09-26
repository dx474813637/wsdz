<template>
	<view class="u-p-20" >
		<view class="addr-content-box u-m-b-30" >
			<view class="addr-content u-p-30">
				<view class="addr-row u-m-b-10 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">交收方式</view>
					<view class="item u-text-right">{{list.settle_mode | settleMode}}</view>
				</view>
				<view class="addr-row u-m-b-10 u-flex u-flex-items-start u-flex-between" v-if="list.delivery_place">
					<view class="item text-light item-label">交收区域</view>
					<view class="item u-text-right" v-if="list.Regionals">{{list.Regionals.map(ele => ele.Particular.name).join('/')}}</view>
				</view>
				<view class="addr-row u-m-b-10 u-flex u-flex-items-start u-flex-between" v-if="list.settle_address">
					<view class="item text-light item-label">交收地址</view>
					<view class="item u-text-right" style="word-break: break-all;">{{list.settle_address}}</view>
				</view>
			</view>
			
		</view>
		<view class="main u-p-30">
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单编号</view>
				<view class="item u-text-right">{{list.id}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.Source">
				<view class="item text-light item-label">来源</view>
				<view class="item text-primary" @click="handleGoto(`/pages/index/pan/panDetail?id=${list.source_id}&pan=${list.source == 'BUY'? 'b' : 's'}`)">{{list.source | source2str}}：{{list.source_name}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.intro">
				<view class="item text-light item-label">商品详情</view>
				<view class="item ">
					<rich-text :nodes="list.intro" ></rich-text>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">买方</view>
				<view class="item u-text-right" v-if="list.B_company">{{list.B_company.name}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">卖方</view>
				<view class="item u-text-right" v-if="list.S_company">{{list.S_company.name}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">数量</view>
				<view class="item u-text-right">{{list.amount}}{{list.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">单价</view>
				<view class="item u-text-right">{{list.price2}} 元/{{list.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">商品总额</view>
				<view class="item u-text-right">{{list.total_price2}} 元</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单类型</view>
				<view class="item u-text-right">{{list.order_type | orderType2str}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">下单日期</view>
				<view class="item u-text-right">{{list.create_time}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.order_type == '1'">
				<view class="item text-light item-label">交付方式</view>
				<view class="item u-text-right">{{list.settle_type | settleType2str}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.order_type == '1'">
				<view class="item text-light item-label">支付工具</view>
				<view class="item u-text-right">{{list.pay_mode | paymode2str}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.pay_state">
				<view class="item text-light item-label">支付状态</view>
				<view class="item u-text-right" v-if="list.pay_mode"> 
					<template v-if="list.pay_mode.includes('FUNDPAY')">{{list.pay_state | payFundState2Str}}</template>
					<template v-else-if="list.pay_mode.includes('BILLPAY')">{{list.pay_state | payBillState2Str}}</template>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">交收状态</view>
				<view class="item u-text-right">{{list.settle_state == '1'? '已交收' :'未交收'}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单状态</view>
				<view class="item u-text-right">{{list.state | orderState2Str(list.order_type)}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.remark">
				<view class="item text-light item-label">备注</view>
				<view class="item u-text-right" style="word-break: break-all;">
					<rich-text :nodes="list.remark"></rich-text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default { 
		data() {
			return {
				id: '',
				ordertype: '',
				list: {},
				show: false,
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			} else {
				uni.showToast({
					title: 'id参数有误',
					icon: 'none'
				})
				return
			}
			if(options.hasOwnProperty('ordertype')) {
				this.ordertype = options.ordertype
			}  
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			themeConfig() {
				return this.typeConfig.white
			},
		},
		filters: {
			source2pan: v => {
				console.log(v)
				if(v == 'BUY') return 'b'
				return 's'
			},
			source2str: v => {
				if(v == 'BUY') return '买盘'
				return '卖盘'
			}
		},
		methods: { 
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleShowPopup(mode) {
				this.formActive = mode;
				this.show = true
			},
			async getData() {
				const res = await this.$api.broker_order_detail({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.list = res.list.Order
				}
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	.addr-content-box {
		background-color: #fff;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		// border: 1rpx solid #f8f8f8;
		border: 3px solid transparent;
		background: 
			linear-gradient(white, white) padding-box,
			repeating-linear-gradient(
				-45deg, 
				red 0, 
				red 12.5%, 
				transparent 0, 
				transparent 25%, 
				#58a 0, 
				#58a 37.5%, 
				transparent 0, 
				transparent 50%
			) 0/2em 2em;
		// &:after {
		// 	content: "";
		// 	position: absolute;
		// 	bottom: 0;
		// 	left: 0;
		// 	height: 6rpx;
		// 	width: 100%;
		// 	background-image: url("../static/img/addr-bottom.jpg");
		// 	background-repeat: repeat-x;
		// 	background-size: auto 100%;
		// 	background-position: 0 0;
		// }
		.addr-content {
			
		}
	}
	.item {
		color: #444;
	}
	.item-label {
		flex: 0 0 100px;
	}
	.main {
		background-color: #fff;
	}
	.btn-wrap {
		.item {
			flex: 0 0 33%;
			box-sizing: border-box;
		}
	}
	.wrapper {
		width: 100%;
		border-radius: 30rpx 30rpx 0 0 ;
		overflow: hidden;
		.header {
		}
		.main {
			background-color: #f8f8f8;
			height: 50vh;
			width: 100%;
			box-sizing: border-box;
			.item-card {
				width: 100%;
				box-sizing: border-box;
				.card-title {
					color: #666;
				}
			}
			.card-content {
				// background-color: #fff;
				border-radius: 10rpx;
				width: 100%;
				box-sizing: border-box;
				
			}
			.card-label {
				flex: 0 0 30%;
				margin-right: 4%;
				height: 30px;
				line-height: 30px;
				transition: all .3s;
				font-size: 14px;
				text-align: center;
				border-radius: 8rpx;
				position: relative;
				border: 1rpx solid #eee;
				&.rows {
					flex: 0 0 100%;
					margin-right: 0;
					text-align: left;
				}
				&.normal_white {
					border-color: #eee;
					color: #666;
				}
				&.normal_dark {
					border-color: #3a3352;
					color: #c8cfff;
				}
				&.active_white {
					border-color: #98c9ff;
					color: #007aff;
					background-color: #e6f2ff;
				}
				&.disabled_white {
					border-color: #c373ff !important;
					color: #7d3df7 !important;
					background-color: #ead9f7 !important;
				}
				&.active_dark {
					border-color: #025688;
					color: #00ffff;
					// background-color: #e6f2ff;
				}
				&.disabled_dark {
					border-color: #503f17 !important;
					color: #f7823d !important;
					// background-color: #ead9f7 !important;
				}
				&:nth-of-type(3n) {
					margin-right: 0;
				}
			}
		}
		.bottom {
			
		}
	}
</style>
