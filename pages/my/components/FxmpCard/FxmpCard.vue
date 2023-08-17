<template>
	<view class="u-p-10 u-radius-8 " style="background-color: #eaf2ff;" @click="handleDetail">
		<view class="u-flex u-flex-between u-flex-items-center u-font-28 u-p-b-10 u-p-l-20 u-p-r-20">
			<view class="item u-font-32" >
				{{detailData.Sell.name}}
			</view> 
			<view class="item u-flex u-info" >
				<view class="u-m-r-10">卖盘详情</view>
				<u-icon name="arrow-right" color="#999" size="14"></u-icon>
			</view> 
		</view>
		<view class="bg-white u-p-10 bg-white u-radius-8">
			<view class="u-p-10 u-flex u-flex-items-center u-border-bottom u-p-b-24" style="border-color: #eee!important">
				<view class="item u-flex-1 u-border-right u-flex-column u-flex-center u-p-r-20 u-m-r-10" style="border-color: #eee!important;">
					<view class="u-font-28 u-m-b-10 u-line-1 text-thin">{{detailData.Company.name}}</view>
					<view class="u-flex u-flex-items-center  u-font-28"> 
						<view class="item text-thin u-flex">
							<u-icon name="account" color="#ccc"></u-icon>
							<view class="u-m-l-8 u-line-1">{{detailData.Company.contact}}</view>
						</view>
						<view class="item text-thin u-m-l-20 u-flex">
							<u-icon name="phone" color="#ccc"></u-icon>
							<view class="u-m-l-8 u-line-1">{{detailData.Company.mobile}}</view>
						</view> 
					</view>
				</view>
				<view class="item u-flex-column u-flex-center u-flex-items-center" style="color: #f00; flex: 0 0 80px">
					<view class="u-font-28 u-line-1">
						{{detailData.da_product.price1}}
						<template v-if="detailData.da_product.pay_type == 1">‰</template>
						<template v-else-if="detailData.da_product.pay_type == 2"> 元/{{detailData.da_product.unit}}</template>
					</view>
					<view class="u-font-26 u-info" >
						分销佣金
					</view>
				</view>
			</view>
			<view class="u-p-t-10 u-p-l-10 u-p-r-20 u-flex u-flex-items-center u-flex-between u-font-28 text-thin">
				<view class="item u-flex">
					<u-icon name="clock" color="#ccc"></u-icon>
					<view class="u-m-l-8">{{detailData.Sell.cdate}}</view> 
				</view>
				<view class="item"> 
					<view class="u-m-l-15" @click.stop="handleDelete"  >
						<u-button type="info" size="small" plain shape="circle">删除</u-button>
					</view> 
				</view>
			</view>
		</view>
	</view> 
</template>

<script>
	export default {
		name: 'FxmpCard',
		props: {
			detailData: {
				type: Object,
				default: () => {
					return {}
				}
			}, 
		},
		data() {
			return {
				
			}
		},
		methods: {
			handleDelete() {
				uni.showModal({
					title: '提示',
					content: `是否删除该条信息？`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('delete', this.detailData)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			}, 
			handleDetail() { 
				this.$emit('detail', this.detailData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
