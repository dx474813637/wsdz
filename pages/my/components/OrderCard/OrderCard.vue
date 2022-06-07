<template>
	<view class="card-w u-p-26"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		>
		<view class="card-header u-flex u-flex-items-center u-flex-between u-border-bottom u-p-b-20">
			<!-- <view class="text-light">{{ids}}</view> -->
			<view class="u-line-1">{{seller}}</view>
			<view class="text-primary u-font-28">{{ht_status}}</view>
		</view>
		<view class="card-main u-p-t-20">
			<view class="main-row u-flex u-flex-between u-flex-items-start u-p-b-20 u-p-t-20">
				<view class="item">{{prod}}</view>
				<view class="item text-light u-text-right">
					<view class="u-m-b-10">
						<u-count-to fontSize="16" :startVal="price" :endVal="price" :decimals="2" separator=","></u-count-to>
						<text class="u-p-l-10 u-font-28">{{unit}}/元</text>
					</view>
					<view class="u-font-28">x {{num}}{{unit}}</view>
					
					<!-- <u-count-to fontSize="16" :startVal="prices" :endVal="prices" :decimals="2" separator=","></u-count-to>
					<text class="u-p-l-10">元</text> -->
				</view>
			</view>
			<view class="main-row u-flex u-flex-between u-flex-items-center u-p-b-20 u-p-t-20">
				<view class="item text-light">{{date}}</view>
				<view class="item ">{{pay_type}}</view>
			</view>
		</view>
		<!-- <view class="card-footer u-flex u-flex-between u-flex-items-center u-p-b-12 u-p-t-12">
			<view></view>
			
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'CustomCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			ids: {
				type: String,
				default: 'ids',
			},
			seller: {
				type: String,
				default: 'seller',
			},
			prod: {
				type: String,
				default: 'prod',
			},
			price: {
				type: String,
				default: 'price',
			},
			prices: {
				type: String,
				default: 'prices',
			},
			num: {
				type: String,
				default: 'num',
			},
			pay_type: {
				type: String,
				default: 'pay_type',
			},
			date: {
				type: String,
				default: 'date',
			},
			unit: {
				type: String,
				default: 'unit',
			},
			ht_status: {
				type: String,
				default: 'ht_status',
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
			
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', {id: this.ids, customData: this.customData})
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
