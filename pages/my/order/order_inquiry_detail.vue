<template>
	<view class="u-p-20" >
		
		<view class="main u-p-30">
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单编号</view>
				<view class="item u-text-right">12</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">来源</view>
				<view class="item u-text-right">
					<view class="u-primary" @click="handleGoto({url: '/pages/index/pan/panDetail', params: {id: list.Source.id, pan: 'b'}})">
						{{list.title}}
					</view>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">买方</view>
				<view class="item u-text-right">{{list.b_company}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">卖方</view>
				<view class="item u-text-right">{{list.s_company}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">联系方式</view>
				<view class="item u-text-right text-primary u-flex u-flex-items-center" @click.stop="makephone"> 
					<u-icon name="phone-fill" color="#ccc"></u-icon>
					<view>{{list.S_company.mobile}}</view> 
				</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">标题</view>
				<view class="item u-text-right">{{list.title}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">单价</view>
				<view class="item u-text-right">{{list.price1}} 元/{{list.Source.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">下单日期</view>
				<view class="item u-text-right">{{list.create_time}}</view>
			</view>
			
			<!-- <view class=" u-m-b-30 " v-if="list.state <= '2' && list.Trade.Bid_role.is_bid_end != 1 && list.Trade.Bid_role.is_biding != 1">
				<u-button type="primary" @click="exitSubscribe" throttleTime="800">取消预约</u-button>
			</view> -->
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
				const res = await this.$api.detail_order_inquiry({params: {id: this.id}})
				if(res.code == 1) {
					this.list = res.list.Order
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
			
			makephone(data) {
				uni.makePhoneCall({
					phoneNumber: '' + this.list.S_company.mobile
				});
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
