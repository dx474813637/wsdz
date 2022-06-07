<template>
	<view class="card-w u-p-26"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		>
		<view class="card-header ">
			<view class="item u-m-b-20">
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20">
					<view class="name">{{typeStr}}单号：{{pid}}</view>
				</view>
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20">
					<view class="pp u-flex u-flex-items-center">
						<i class="custom-icon-moneybag custom-icon"></i>
						<u--text mode="price" :text="price" type="primary"></u--text>
					</view>
					<view class="pp">
						<i class="custom-icon-right custom-icon"></i>
					</view>
				</view>
				<view class="item u-flex u-flex-between u-flex-items-center ">
					<view class="pp u-flex u-flex-items-center">
						<i class="custom-icon-info custom-icon"></i>
						<text class="u-p-l-6">{{date}}</text>
					</view>
					<view class="pp" :class="{
						'text-error': status == 0,
						'text-primary': status == 1,
					}">{{typeStr}}{{status == 1 ? '成功' : '失败'}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CzCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			ids: {
				type: String,
				default: 'ids',
			},
			pid: {
				type: String,
				default: 'pid',
			},
			type: {
				type: String,
				default: 'type',
			},
			price: {
				type: String,
				default: 'price',
			},
			date: {
				type: String,
				default: 'date',
			},
			status: {
				type: String,
				default: '1',
			},
			boxShadow: {
				type: String,
				default: '0 0 10rpx rgba(0,0,0,.1)',
			},
			borderRadius: {
				type: String,
				default: '16rpx',
			},
			detailData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			typeStr() {
				if(this.type == 1) return '提现'
				else return '充值'
			}
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', {id: this.ids, detailData: this.detailData})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 32rpx;
	}
	.pp {
		color: #666;
		font-size: 28rpx;
		// padding-left: 10rpx;
		.custom-icon {
			// color: #bbb;
		}
	}
	.item-sub {
		color: #666;
	}
</style>
