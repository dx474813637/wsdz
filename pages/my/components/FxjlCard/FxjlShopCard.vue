<template>
	<view class="u-p-10 u-radius-8 " style="background-color: #eaf2ff;" @click="handleDetail">
		<view class="u-flex u-flex-between u-flex-items-center u-font-28 u-p-b-10 u-p-l-20 u-p-r-20">
			<view class="item u-font-32" >
				{{detailData.Sell.name}}
			</view> 
			<view class="item u-flex u-info" >
				<!-- <view class="u-m-r-10">卖盘详情</view>
				<u-icon name="arrow-right" color="#eee" size="14"></u-icon> -->
			</view> 
		</view>
		<view class="bg-white u-p-10 bg-white u-radius-8">
			<view class="u-p-10 u-flex u-flex-items-center u-border-bottom u-p-b-24" style="border-color: #eee!important">
				<view class="item u-flex-1 u-border-right u-flex-column u-flex-center u-p-r-20 u-m-r-10" style="border-color: #eee!important;">
					<view class="u-font-28 u-m-b-10 u-line-1 text-thin">达人：{{detailData.da_company_fx.name}}</view>
					<view class="u-flex u-flex-items-center  u-font-28"> 
						<view class="item text-thin u-flex">
							<u-icon name="account" color="#ccc"></u-icon>
							<view class="u-m-l-8 u-line-1">{{detailData.da_company_fx.contact}}</view>
						</view>
						<view class="item text-thin u-m-l-20 u-flex">
							<u-icon name="phone" color="#ccc"></u-icon>
							<view class="u-m-l-8 u-line-1">{{detailData.da_company_fx.mobile}}</view>
						</view> 
					</view>
				</view>
				<view class="item u-flex-column u-flex-center u-flex-items-center" style="color: #f00; flex: 0 0 80px">
					<view class="u-font-28 u-line-1">
						{{detailData.price1}}
						<template v-if="detailData.pay_type == 1">‰</template>
						<template v-else-if="detailData.pay_type == 2"> 元/{{detailData.unit}}</template>
					</view>
					<view class="u-font-26 u-info" >
						分销佣金
					</view>
				</view>
			</view>
			<view class="u-p-10 u-flex u-flex-items-center u-flex-between u-font-28 text-thin"> 
				<view class="u-line-1">交易数量：{{detailData.amount}} {{detailData.Sell.unit}}</view>
				<view class="u-line-1">分销分成：{{detailData.price1_sum1}} 元</view>
			</view>
			<view class="u-p-10 u-flex u-flex-items-center u-flex-between u-font-28 text-thin">
				<view class="item u-flex">
					<u-icon name="clock" color="#ccc"></u-icon>
					<view class="u-m-l-8">{{detailData.post_time}}</view> 
				</view> 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'FxjlShopCard',
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
			handleAudit() {
				this.$emit('audit', this.detailData)
			},
			handleDetail() { 
				this.$emit('detail', this.detailData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
