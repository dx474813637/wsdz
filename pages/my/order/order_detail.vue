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
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.intro1">
				<view class="item text-light item-label">商品详情</view>
				<view class="item u-text-right u-line-3">{{list.intro1}}</view>
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
				<view class="item text-light item-label">交付方式</view>
				<view class="item u-text-right">{{list.create_time}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">支付工具</view>
				<view class="item u-text-right">{{list.create_time}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">下单日期</view>
				<view class="item u-text-right">{{list.create_time}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">合同状态</view>
				<view class="item u-text-right">{{list.state | orderState2Str}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">交收状态</view>
				<view class="item u-text-right">{{list.settle_state}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.remark">
				<view class="item text-light item-label">备注</view>
				<view class="item u-text-right">{{list.remark}}</view>
			</view>
		</view>
		<view class="main u-p-20 u-m-t-30">
			<view class="btn-wrap u-flex u-flex-items-center u-flex-wrap">
				<view class="item u-p-10">
					<u-button type="primary" @click="order_cancel">取消</u-button>
				</view>
				<view class="item u-p-10">
					<u-button type="primary"  @click="handleGoto(`/pages/my/order/order_edit?type=edit&id=${id}&ordertype=${ordertype}`)">修改</u-button>
				</view>
				<view class="item u-p-10">
					<u-button type="primary" @click="order_submit">发送</u-button>
				</view>
				<view class="item u-p-10" v-if="ordertype == 'B'">
					<u-button type="primary" @click="order_pay">支付</u-button>
				</view>
				<view class="item u-p-10" v-if="ordertype == 'S' && list.state == '4'">
					<u-button type="primary" @click="handleShowPopup('audit')">审核</u-button>
				</view>
				<view class="item u-p-10" v-if="ordertype == 'S'">
					<u-button type="primary" @click="handleShowPopup('send')">发货</u-button>
				</view>
				
			</view>
		</view>
		<u-popup 
			:show="show" 
			mode="bottom"  
			@close="show = false"  
			round="25"
			bgColor="#fff"
		>
			<view class="wrapper" :style="{
				backgroundColor: themeConfig.pageBg,
				color: themeConfig.baseText,
			}">
				<view class="header u-p-18"  :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item u-flex-1">
							<text class="u-info" @click="show = false">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34">{{formActive == 'send'? '发货' : '审核'}}表单</text>
						</view>
						<view class="item u-flex-1 u-text-right">
						
						</view>
					</view>
				</view>
				<view class="main" :style="{
					backgroundColor: themeConfig.pageBg,
				}">
					<u-list height="100%">
						<view class="form-content u-p-20">
							<template v-if="formActive == 'audit'">
								<u--form
									labelPosition="left"
									:model="form_audit"
									ref="form_audit"
									labelWidth="80"
									>
									<u-form-item
										label="交付方式" 
									>
										<u--input
											:value="list.total_price2" 
											readyonly
											:customStyle="{background: '#fff'}"
										></u--input>
									</u-form-item>
									<u-form-item
										label="支付工具" 
									>
										<u-radio-group
										    v-model="zfgjValue"
										    placement="row"
										  >
										    <u-radio
										      :customStyle="{marginRight: '8px'}"
										      v-for="(item, index) in zfgj"
										      :key="index"
										      :name="item.value"
										      :label="item.name"
											  :disabled="item.disabled"
										    >
										    </u-radio>
										  </u-radio-group>
									</u-form-item>
									<u-form-item
										label="审核意见" 
									>
										<u-radio-group
										    v-model="form_audit.audit"
										    placement="row"
										  >
										    <u-radio
										      :customStyle="{marginRight: '8px'}"
										      v-for="(item, index) in shyj"
										      :key="index"
										      :name="item.value"
										      :label="item.name"
										    >
										    </u-radio>
										  </u-radio-group>
									</u-form-item>
									<u-form-item
										label="议价总额" 
									>
										<u--input
											:value="list.total_price2" 
											readyonly
											:customStyle="{background: '#fff'}"
										></u--input>
									</u-form-item>
									<u-form-item
										label="审核备注" 
									>
										<u--textarea
											v-model="form_audit.remark_audit" 
											placeholder="审核备注" 
											height="90"
											maxlength="-1"
										></u--textarea>
									</u-form-item>
								</u--form>
							</template>
							
							<template v-if="formActive == 'send'">
								<u--form
									labelPosition="left"
									:model="form_send"
									ref="form_send"
									labelWidth="80"
									>
									<u-form-item
										label="发货备注" 
									>
										<u--textarea
											v-model="form_send.remark_send" 
											placeholder="发货备注" 
											height="90"
											maxlength="-1"
										></u--textarea>
									</u-form-item>
								</u--form>
							</template>
						</view>
					</u-list>
				</view>
				<view class="confirm-rows u-p-20" :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<u-button :customStyle="{backgroundColor: themeConfig.badgeBg, color: '#fff', border: 'none'}" shape="circle" @click="handleConfirm">提 交</u-button>
				</view>
			</view>
		</u-popup>
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
				formActive: '',
				form_audit: {
					audit: '1',
					remark_audit: '',
				},
				form_send: {
					remark_send: '',
				},
				shyj: [
					{
						name: '退回订单',
						value: '0',
						disabled: false,
					},
					{
						name: '同意订立',
						value: '1',
						disabled: false,
					},
					{
						name: '废止订单',
						value: '2',
						disabled: false,
					},
				],
				zfgjValue: 'xianjin',
				zfgj: [
					{
						name: '现金',
						value: 'xianjin',
						disabled: false,
					},
					{
						name: '票据',
						value: 'piaoju',
						disabled: true,
					},
				]
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
				const res = await this.$api.order_detail({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.list = res.list.Order
				}
			},
			async order_cancel() {
				uni.showLoading({
					title: '取消中...'
				})
				const res = await this.$api.order_cancel({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					uni.showLoading({
						title: '取消成功！正在刷新'
					})
					this.getData()
				}
			},
			async order_send() {
				uni.showLoading({
					title: '发货中...'
				})
				const res = await this.$api.order_send({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					uni.showLoading({
						title: '取消成功！正在刷新'
					})
					this.getData()
				}
			},
			async order_submit() {
				uni.showLoading({
					title: '发送对方议价...'
				})
				const res = await this.$api.order_submit({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					uni.showLoading({
						title: '发送成功！正在刷新'
					})
					this.getData()
				}
			},
			async order_pay() {
				uni.showLoading({
					title: '发起支付中...'
				})
				const res = await this.$api.order_pay({
					params: { 
						id: this.id,
					}
				})
				if(res.code == 1) { 
					
				}
			},
			handleConfirm() {
				if(this.formActive == 'audit') {
					
				}else if(this.formActive == 'send') {
					
				}
			},
			async order_audit() {
				uni.showLoading({
					title: '提交审核中...'
				})
				const res = await this.$api.order_audit({
					params: { 
						...this.form_audit,
						id: this.id,
						ordertype: this.ordertype,
						pyeelnfo: '',
					}
				})
				if(res.code == 1) { 
					uni.showLoading({
						title: '审核成功！正在刷新'
					})
					this.getData()
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
