<template>
	<view class="card-w u-p-40"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		>
		<view class="card-header ">
			<view class="item">
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20">
					<view class="name">{{name}}</view>
					<view class="pp text-primary">现金</view>
				</view>
				<view class="item u-flex u-flex-between u-flex-items-center ">
					<view class="pp u-flex u-flex-items-center">
						2022-5-17 15:35:13
					</view>
					<view>
						<u--text type="error" mode="price" text="728732.32"></u--text>
					</view>
					
					
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: 'BillCard',
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
			name: {
				type: String,
				default: 'name',
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
		methods: {
			handleGotoDetail() {
				this.$emit('detail')
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
