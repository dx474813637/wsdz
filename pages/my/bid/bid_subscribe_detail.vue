<template>
	<view class="u-p-20" >
		
		<view class="main u-p-30">
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">类型</view>
				<view class="item u-text-right">竞买</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">报盘</view>
				<view class="item u-text-right">
					<view class="u-primary" @click="handleGoto({url: '/pages/index/pan/panDetail', params: {id: list.source_id, pan: list.source == 'BUY'? 'b' : 's'}})">
						{{list.Trade.name}}
					</view>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">竞拍开始时间</view>
				<view class="item u-text-right">{{list.Trade.Bid_role.btime}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">竞拍结束时间</view>
				<view class="item u-text-right">{{list.Trade.Bid_role.etime}}</view>
			</view>
			<!-- <view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">买家保证金比例</view>
				<view class="item u-text-right">{{list.Trade.Bid_role.b_bond}}</view>
			</view> -->
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">买家保证金</view>
				<view class="item u-text-right">{{list.Trade.Bid_role.b_bond}} 元</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">状态</view>
				<view class="item u-text-right">{{list.state | bid_subscribe2Str}}</view>
			</view>
			
			<view class=" u-m-b-30 " v-if="list.state <= '2' && list.Trade.Bid_role.is_bid_end != 1 && list.Trade.Bid_role.is_biding != 1">
				<u-button type="primary" @click="exitSubscribe" throttleTime="800">取消预约</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				id: '',
				list: {}
			}
		},
		async onLoad(opt) {
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id;
			}
			uni.showLoading()
			await this.getData()
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async getData() {
				const res = await this.$api.bid_subscribe_detail_bid_subscribe({params: {id: this.id}})
				if(res.code == 1) {
					this.list = res.list
				}
			},
			async exitSubscribe() {
				const res = await this.$api.bid_subscribe_cancel_bid_subscribe({params: {id: this.id}})
				if(res.code == 1) {
					uni.showToast({
						title: res.msg
					})
					this.getData()
				}
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>

	.main {
		background-color: #fff;
	}
</style>
