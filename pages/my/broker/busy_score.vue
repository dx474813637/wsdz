<template>
	<view class="wrap u-p-l-30 u-p-r-30">
		<view class="u-flex u-flex-items-center u-flex-between u-p-30 u-border-bottom">
			<view class="item text-base">
				login账号
			</view>
			<view class="item">
				{{list.login}}
			</view>
		</view>
		<view class="u-flex u-flex-items-center u-flex-between u-p-30 u-border-bottom">
			<view class="item text-base">
				AB得分
			</view>
			<view class="item">
				{{list.ab}}
			</view>
		</view>
		<view class="u-flex u-flex-items-center u-flex-between u-p-30 u-border-bottom">
			<view class="item text-base">
				C得分
			</view>
			<view class="item">
				{{list.c}}
			</view>
		</view>
		<view class="u-flex u-flex-items-center u-flex-between u-p-30 u-border-bottom">
			<view class="item text-base">
				T得分
			</view>
			<view class="item">
				{{list.t}}
			</view>
		</view>
		<view class="u-flex u-flex-items-center u-flex-between u-p-30 u-border-bottom">
			<view class="item text-base">
				MDU得分
			</view>
			<view class="item">
				{{list.mdu}}
			</view>
		</view>
		<view class="u-flex u-flex-items-center u-flex-between u-p-30 u-border-bottom">
			<view class="item text-base">
				总得分
			</view>
			<view class="item">
				{{list.total}}
			</view>
		</view>
		<!-- <view class="u-flex u-flex-items-center u-flex-between u-p-30 u-border-bottom">
			<view class="item text-base">
				统计日期
			</view>
			<view class="item">
				{{list.cdate}}
			</view>
		</view> -->
		<view class="u-flex u-flex-items-center u-flex-between u-p-30 u-border-bottom">
			<view class="item text-base">
				 统计月份
			</view>
			<view class="item">
				{{list.cmonth}}
			</view>
		</view>
		<view class="u-flex u-flex-items-center u-flex-between u-p-30 u-border-bottom">
			<view class="item">
				
			</view>
			<view class="item text-base">
				{{list.ctime}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {}
			}
		},
		async onLoad() {
			uni.showLoading()
			await this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.company_get_busy_score()
				if(res.code == 1) {
					this.list = res.list
				}
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
