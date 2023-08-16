<template>
	<view class="wrapper u-radius-10 uni-shadow-base bg-white u-p-15" >
		<view class="card u-flex u-flex-items-center u-flex-between u-p-10 u-p-l-20 u-p-r-20 u-border-bottom">
			<view class="item">
				{{detailData.Product.name}}
			</view>
			<view class="item u-font-24" >
				<!-- 有效/达人放弃 -->
			</view>
		</view>
		<view class="main u-p-10 u-p-l-20 u-p-r-20 u-font-30 text-base">
			<!-- <view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item" > 
					{{detailData.Company.name}}
				</view>
				<view class="item u-text-right" > 
					{{detailData.price1}}
					<template v-if="detailData.pay_type == 1">‰</template>
					<template v-else-if="detailData.pay_type == 2"> 元/{{detailData.unit}}</template>
					
				</view>
			</view>
			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item" > 
					{{detailData.Company.contact}}
				</view>
				<view class="item u-text-right" > 
					{{detailData.Company.mobile}}
				</view>
			</view> -->
			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item" > 
					{{detailData.Company.name}}
				</view>
				<view class="item u-text-right" > 
					{{detailData.Company.contact}} 
				</view>
			</view>
			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item" > 
					联系方式
				</view>
				<view class="item u-text-right" > 
					{{detailData.Company.mobile}}
				</view>
			</view>
			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item" > 
					分销佣金
				</view>
				<view class="item u-text-right" > 
					{{detailData.price1}}
					<template v-if="detailData.pay_type == 1">‰</template>
					<template v-else-if="detailData.pay_type == 2"> 元/{{detailData.unit}}</template>
				</view>
			</view>
			<view class="rows u-flex u-flex-items-center u-flex-between u-m-t-10">
				<view class="item u-flex u-flex-items-center"> 
					{{detailData.post_time}}
				</view>
				<view class="item u-flex u-flex-items-center">
					<view class="u-m-l-15" @click.stop="handleAdd"  >
						<u-button type="error" size="small" plain shape="circle">我要分销</u-button>
					</view> 
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'FxgxCardAdd',
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
			handleAdd() {
				uni.showModal({
					title: '提示',
					content: `确定添加？`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('add', this.detailData)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			}, 
			handleDetail() { 
				// this.$emit('detail', this.detailData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
