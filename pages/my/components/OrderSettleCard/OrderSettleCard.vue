<template>
	<view class="card-w u-p-20"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		>
		<view class="card-header u-flex u-flex-items-center u-flex-between  u-p-5">
			<view class="u-flex u-flex-items-baseline">
				<view class="u-font-28 text-base"> 
					<u-tag :text="customData.id" plain size="mini" borderColor="#ccc" color="#777"></u-tag>
				</view>
				<!-- <u-tag :text="customData.id" size="mini" ></u-tag> -->
				<view class="u-line-1 u-m-l-10">{{customData.Product.name}}</view>
			</view>
			
			<view class=" u-font-28" style=" flex: 0 0 auto;" >
				<u-tag :text="customData.State.name" size="mini" type="primary"></u-tag>
				<!-- <u-tag 
				:text="customData.state | orderState2Str(customData.order_type)" 
				size="mini" 
				:type="(customData.state == '2' || customData.state == '3')? 'error': 'primary'"
				></u-tag> -->
			</view>
		</view>
		<view class="card-main u-p-t-20">
			<view class="main-row u-flex u-flex-between u-flex-items-start u-p-20 u-radius-8 page-bg2">
				<view class="item u-m-r-10">
					<view class="u-font-28 text-light">发起人</view>
					<view>{{sender}}</view>
				</view>
				<view class="item u-text-right u-m-l-10" >
					<view class="u-font-28 text-light">对方</view>
					<view>{{other}}</view>
				</view>
			</view> 
			<view class="main-row u-flex u-flex-between u-flex-items-center u-m-t-12 u-p-5">
				<view class="item text-light u-font-28">结算差额</view>
				<view class="item ">{{customData.settle_diff1}} 元</view>
			</view>
			<view class="main-row u-flex u-flex-between u-flex-items-center u-m-t-12 u-p-5">
				<view class="item text-light u-font-28">付款人</view>
				<view class="item "
					:class="{
						'text-error': customData.type == '2',
						'text-primary': customData.type == '1'
					}"
				>{{customData.type | order_settle_pay_user}}</view>
			</view>
			<view class="main-row u-flex u-flex-between u-flex-items-center u-m-t-12 u-p-5">
				<view class="item text-error"></view>
				<view class="item text-light u-font-28">{{customData.ptime}}</view>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		name: 'OrderSettleCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			}, 
			boxShadow: {
				type: String,
				default: '0 0 10rpx rgba(0,0,0,.1)',
			},
			borderRadius: {
				type: String,
				default: '16rpx',
			},
			customData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			sender() {
				if(this.customData.poster1) {
					return this.customData.b_login == this.customData.poster1 ? this.customData.B_company.name : this.customData.S_company.name
				}
				return ''
			},
			other() {
				if(this.customData.poster1) {
					return this.customData.b_login == this.customData.poster1 ? this.customData.S_company.name : this.customData.B_company.name
				}
				return ''
			},
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', this.customData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 30rpx;
	}
	.pp {
		color: #666;
		font-size: 32rpx;
		padding-left: 10rpx;
	}
	.item-sub {
		color: #666;
	}
</style>
