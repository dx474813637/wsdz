<template>
	<view class="u-p-20" >
		<view class="main u-p-30">
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">ID</view>
				<view class="item u-text-right">{{list.id}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">签约方式</view>
				<view class="item u-text-right">{{order.esign_type == '1'? '手动签约' : '自动签约'}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">来源订单</view>
				<view class="item u-text-right">
					<u-text type="primary" @click="handleGoto({url: '/pages/my/order/order_detail', params: {id: order.id, ordertype: role}})" :text="order.id"></u-text>
				</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">卖家公司</view>
				<view class="item u-text-right">{{list.s_company}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">买家公司</view>
				<view class="item u-text-right">{{list.b_company}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">交易商品</view>
				<view class="item u-text-right">{{order.title}} * {{order.amount}}</view>
			</view> 
			<template v-if="list.contract_id == '1'">
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">补充条款</view>
					<view class="item u-text-right">{{list.remark}}</view>
				</view> 
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">运费</view>
					<view class="item u-text-right">{{list.trans_fee}}</view>
				</view> 
			</template>
			
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">创建时间</view>
				<view class="item u-text-right">{{list.ctime}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">签约状态</view>
				<view class="item u-text-right">{{list.state | esignState2Str}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">合同编号</view>
				<view class="item u-text-right" > 
					<u--text 
						:type="list.file_rawmex ? 'primary' : ''" 
						@click="handleViewPdf(list.file_rawmex_auto || list.file_rawmex)" 
						:text="list.ContractNo" 
					></u--text>
				</view>
			</view> 
		</view> 
		
		<view class="main u-p-l-30 u-p-r-30 u-p-b-30" v-if="params_list.length > 0"> 
			<DiyForm
				:form="params_list"
				:showSure="false"
				:isView="true"
			></DiyForm>
		</view> 
	</view>
</template>

<script> 
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex' 
	export default {
		data() {
			return {
				show: false,
				id: '',
				role: '',
				list: {},
				order: {}, 
				params_list: []
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
			if(options.hasOwnProperty('role')) {
				this.role = options.role
			}  
			uni.showLoading()
			this.getData()
		}, 
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				login: state => state.user.login,
			}),
			themeConfig() {
				return this.typeConfig.white
			},   
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto',
				handleViewPdf: 'esign/handleViewPdf'
			}),
			...mapActions({
				getImageBase64_readFile: 'user/getImageBase64_readFile'
			}),
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			async getData() {
				const res = await this.$api.DETAIL_ESIGN_SIGNFLOWS({
					params: { 
						esign_signflows_id: this.id,
					}
				})
				if(res.code == 1) {
					this.list = res.list.Result 
					this.order = res.list.Result.Order 
					
					if(this.list.contract_id) {
						this.LIST_ESIGN_CONTRACT_PARAMETERS(this.list.contract_id)
					}
				}
			},  
			async LIST_ESIGN_CONTRACT_PARAMETERS(contract_id) {
				//合同模板参数列表
				uni.showLoading({
					title: '提交中...'
				})  
				const res = await this.$api.LIST_ESIGN_CONTRACT_PARAMETERS({
					params: {  
						order_id: this.list.origin_id, 
						contract_id: contract_id , 
					}
				})
				if(res.code == 1) {  
					this.params_list = res.list.List || []
				} 
			}, 
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
		/deep/ {
			.u-upload__button {
				background-color: #fff!important;
			}
		}
	}
</style>
<style lang="scss" scoped>

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
			flex: 0 0 50%;
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
