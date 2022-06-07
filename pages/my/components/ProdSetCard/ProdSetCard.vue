<template>
	<view class="card-w u-p-16"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		
		>
		<view class="card-header u-flex u-flex-between u-flex-items-center u-p-10">
			<view class="item u-flex-1" @click="handleGotoDetail">
				<view class="item u-flex u-flex-items-end u-m-b-10 u-line-1">
					<text class="name">{{name}}</text>
					<text class="pp">{{pp}}</text>
				</view>
				<view class="item item-sub u-line-1">{{shuxing}}</view>
			</view>
			<view class="item">
				<u-switch 
					size="20"
					:value="switch_status" 
					:loading="loading" 
					@input.stop="switchInput"
				></u-switch>
			</view>
		</view>
		<view class="card-footer u-flex u-flex-end u-p-b-12 u-p-t-12">
			<view class="item u-p-l-12">
				<u-button 
					type="primary" 
					size="mini" 
					shape="circle" 
					icon="plus-circle"
					:disabled="doing"
					@click.stop="handleBrokerAdd('buy')"
				>买盘</u-button>
			</view>
			<view class="item u-p-l-12">
				<u-button 
					type="primary" 
					size="mini" 
					shape="circle" 
					icon="plus-circle"
					:disabled="doing"
					@click.stop="handleBrokerAdd('sell')"
				>卖盘</u-button>
			</view>
			<view class="item u-p-l-12">
				<u-button 
					type="error" 
					size="mini" 
					shape="circle" 
					icon="trash"
					:disabled="doing"
					@click.stop="handleDelet"
				>删除</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ProdSetCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			name: {
				type: String,
				default: '名称',
			},
			pp: {
				type: String,
				default: '品牌',
			},
			shuxing: {
				type: String,
				default: '规格属性',
			},
			pid: {
				type: String,
				default: '',
			},
			status: {
				type: Boolean,
				default: false,
			},
			boxShadow: {
				type: String,
				default: '0 0 10rpx rgba(0,0,0,.1)',
			},
			borderRadius: {
				type: String,
				default: '16rpx',
			},
		},
		data() {
			return {
				switch_status: false,
				loading: false,
				
			}
		},
		computed: {
			doing() {
				return this.loading
			}
		},
		watch: {
			status: {
				deep: true,
				immediate: true,
				handler(flag) {
					// console.log(flag)
					this.switch_status = flag;
					this.loading = false;
				}
			}
		},
		methods: {
			switchInput(value) {
				
				uni.showModal({
					title: '提示',
					content: `是否改变当前商品名${this.name}的状态`,
					success: (res) => {
						if (res.confirm) {
							this.loading = true;
							this.$emit('changeStatus', {status: value, id: this.pid})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleDelet() {
				console.log('删除事件')
				uni.showModal({
					title: '提示',
					content: `是否删除该商品名：${this.name}`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('delet', {id: this.pid})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleBrokerAdd(type) {
				this.$emit('add', {type, id: this.pid})
			},
			handleGotoDetail() {
				this.$emit('detail', {pid: this.pid})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 34rpx;
	}
	.pp {
		color: #999;
		font-size: 28rpx;
		padding-left: 10rpx;
	}
	.item-sub {
		color: #666;
	}
</style>
