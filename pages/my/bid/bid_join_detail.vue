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
				<view class="item text-light item-label">竞拍方式</view>
				<view class="item u-text-right">{{list.Trade.Bid_role.is_part == '1' ? '按手竞拍' : '总量竞拍'}}</view>
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
				<view class="item text-light item-label">当前叫价</view>
				<view class="item u-text-right">{{list.Trade.}} 元/{{list.Trade.unit}}</view>
			</view> -->
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">我的出价（单价）</view>
				<view class="item u-text-right">{{list.unit_price}} 元/{{list.Trade.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">数量</view>
				<view class="item u-text-right">{{list.amount}} {{list.Trade.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">我的出价（总价）</view>
				<view class="item u-text-right">{{list.price1}} 元</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">出价时间</view>
				<view class="item u-text-right">{{list.ctime}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">状态</view>
				<view class="item u-text-right">{{list.Trade.Bid_role.state | bid_join2Str(list)}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.order_id">
				<view class="item text-light item-label">订单详情</view>
				<view class="item u-text-right">
					<view class="u-primary" @click="handleGoto({url: '/pages/my/order/order_detail', params: {id: list.order_id, ordertype: 'B' }})">
						点击跳转
					</view>
				</view>
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
				list: {
					Trade: {
						Bid_role: {
							
						}
					}
				}
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
				const res = await this.$api.bid_subscribe_detail_bid({params: {id: this.id}})
				if(res.code == 1) {
					this.list = res.list
				}
			}
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
