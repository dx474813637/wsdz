<template>
	
	<view>
		<view class="u-p-10 u-radius-8 " style="background-color: #fff0e0;" >
			<!-- <view class="u-flex u-flex-between u-flex-items-center u-font-28 u-p-b-10 u-p-l-20 u-p-r-20 text-thin">
				<view class="item"> 
				</view>
				<view class="item " style="background-color: #ff8228; color: #fff;border-radius: 20px; padding: 0px 6px;" >
					<template v-if="detailData.state == 1 && detailData.auth_state == 1">有效</template>
					<template v-if="detailData.state == 1 && detailData.auth_state == 0">待店铺审核</template>
					<template v-if="detailData.state == 0 && detailData.auth_state == 1">达人放弃</template>
					<template v-if="detailData.state == 0 && detailData.auth_state == 0">无效</template>
				</view>
			</view> -->
			<view class="bg-white u-p-10 bg-white u-radius-8" >
				<view class="u-p-10 u-flex u-flex-items-center u-border-bottom u-p-b-24" style="border-color: #eee!important" @click="handleDetail">
					<view class="item u-flex-1 u-border-right u-flex-column u-flex-center u-p-r-20 u-m-r-10" style="border-color: #eee!important;">
						<view class=" u-m-b-10 u-flex u-flex-items-end">
							<view class="item u-line-1 u-font-34 ">
								{{detailData.Product.name}}
							</view>
							<!-- <view class="item u-line-1 text-thin u-m-l-10 u-font-28" v-if="detailData.da_product.Product.spec1">
								{{detailData.da_product.Product.spec1}}
							</view> -->
						</view>
						<view class="u-flex u-flex-items-center  u-font-28"> 
							<view class="item text-thin u-flex"> 
								<view class="u-line-1">{{detailData.Product.spec1}}</view>
							</view>
							<!-- <view class="item text-thin u-flex">
								<u-icon name="account" color="#ccc"></u-icon>
								<view class="u-m-l-8 u-line-1">{{detailData.Company.contact}}</view>
							</view>
							<view class="item text-thin u-m-l-20 u-flex">
								<u-icon name="phone" color="#ccc"></u-icon>
								<view class="u-m-l-8 u-line-1">{{detailData.Company.mobile}}</view>
							</view> -->
						</view>
					</view>
					<view class="item u-flex-column u-flex-center u-flex-items-center" style="color: #f00; flex: 0 0 80px">
						<view class="u-font-34 u-line-1">
							{{detailData.price1}}
							<template v-if="detailData.pay_type == 1">‰</template>
							<template v-else-if="detailData.pay_type == 2"> 元/{{detailData.unit}}</template>
						</view>
						<view class="u-font-26 u-info" >
							分销佣金
						</view>
					</view>
				</view>
				<view class="u-p-t-10 u-p-l-10 u-p-r-20 u-flex u-flex-items-center u-flex-between u-font-28 text-thin">
					<view class="item u-flex">
						<u-icon name="clock" color="#ccc"></u-icon>
						<view class="u-m-l-8">{{detailData.post_time}}</view> 
					</view>
					<view class="item">
						<view class="u-m-l-15"  v-if="detailData.state">
							<u-switch 
								v-model="detailData.state"  
								activeValue="1"
								inactiveValue="0"
								asyncChange 
								@change="handleChangeStatus"
							></u-switch>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view> 
</template>

<script>
	export default {
		name: 'FxProdCardShop',
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
			handleChangeStatus(e) {
				this.$emit('changeStatus', this.detailData) 
			},
			handleDetail() { 
				this.$emit('detail', this.detailData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
