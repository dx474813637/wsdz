<template>
	<view class="wrapper u-radius-10 uni-shadow-base bg-white u-p-15" @click="handleDetail">
		<view class="card u-flex u-flex-items-center u-flex-between u-p-10 u-p-l-20 u-p-r-20 u-border-bottom">
			<view class="item">
				{{detailData.Sell.name}}
			</view>
			<view class="item u-font-24" >
				状态
			</view>
		</view>
		<view class="main u-p-10 u-p-l-20 u-p-r-20 u-font-30 text-base">
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
					交易数量
				</view>
				<view class="item u-text-right" > 
					{{detailData.amount}} {{detailData.da_product.unit}}
				</view>
			</view>
			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item" > 
					分销费点数
				</view>
				<view class="item u-text-right" > 
					{{detailData.da_product.price1}} 元/{{detailData.da_product.unit}}
				</view>
			</view>
			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item" > 
					分销分成
				</view>
				<view class="item u-text-right" > 
					{{detailData.price1_sum1}} 元
				</view>
			</view>
			<view class="rows u-flex u-flex-items-center u-flex-between u-m-t-10">
				<view class="item u-flex u-flex-items-center u-info"> 
					{{detailData.post_time}}
				</view>
				<view class="item u-flex u-flex-items-center">
					<!-- <view class="u-m-l-15" @click.stop="handleDelete"  >
						<u-button type="error" size="small" plain shape="circle">删除</u-button>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'FxjlCard',
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
