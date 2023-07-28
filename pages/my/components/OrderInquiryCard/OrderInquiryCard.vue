<template>
	<view class="card-w u-p-20"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		>
		<view class="card-header u-flex u-flex-items-center u-flex-between  u-p-5">
			<view class="u-flex u-flex-items-baseline">
				<!-- <view class="u-font-28 text-base"> 
					<u-tag :text="customData.id" plain size="mini" borderColor="#ccc" color="#777"></u-tag>
				</view> -->  
				<view class="u-line-1 text-primary" @click.stop="handleGoto({url: '/pages/index/pan/panDetail', params: {id: prodData.id, pan: 'b'}})">
					{{prodData.name}}
				</view>
				
			</view>
			
			<view class="text-error" style=" flex: 0 0 auto;" > 
				{{customData.price1}} 元/{{prodData.unit}}
			</view>
		</view>
		<view class="card-main "> 
			<view class="main-row u-flex u-flex-between u-flex-items-center u-m-t-20 u-p-5" @click="timsBtn">
				<view class="item text-light u-font-28">卖方</view>
				<view class="item ">{{customData.b_company}}</view>
			</view>
			<view class="main-row u-flex u-flex-between u-flex-items-center u-m-t-20 u-p-5">
				<view class="item text-light u-font-28">联系方式</view>
				<view class="item text-primary u-flex u-flex-items-center" @click.stop="makephone">
					<u-icon name="phone-fill" color="#ccc"></u-icon>
					<view>{{customData.S_company.mobile}}</view> 
				</view>
			</view>
			<view class="main-row u-flex u-flex-between u-flex-items-center u-m-t-20 u-p-5">
				<view class="item text-light u-font-28">发布时间</view>
				<view class="item ">{{customData.create_time}}</view> 
			</view>
			<view class="main-row u-flex u-flex-between u-flex-items-center u-m-t-20 u-p-5" v-if="groupbyid == 1">
				<view class="item"> </view>
				<view class="item" @click.stop="guanlianbtn">
					<u-button type="primary" size="small">关联询价</u-button>
				</view> 
			</view>
		</view> 
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name: 'OrderInquiryCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			ordertype: {
				type: String,
				default: 'B',
			},
			ids: {
				type: String,
				default: 'ids',
			},
			seller: {
				type: String,
				default: 'seller',
			},
			prod: {
				type: String,
				default: 'prod',
			},
			price: {
				type: String,
				default: 'price',
			},
			prices: {
				type: String,
				default: 'prices',
			},
			num: {
				type: String,
				default: 'num',
			},
			pay_type: {
				type: String,
				default: 'pay_type',
			},
			date: {
				type: String,
				default: 'date',
			},
			unit: {
				type: String,
				default: 'unit',
			},
			ht_status: {
				type: String,
				default: 'ht_status',
			},
			boxShadow: {
				type: String,
				default: '0 0 10rpx rgba(0,0,0,.1)',
			},
			borderRadius: {
				type: String,
				default: '16rpx',
			},
			customData: {
				type: Object,
				default: () => ({})
			},
			prodData: {
				type: Object,
				default: () => ({})
			},
			bidType: {
				type: String,
				default: 'subscribe',
			},
			groupbyid: {
				type: String,
				default: '1',
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleGotoDetail() {
				this.$emit('detail', this.customData)
			},
			guanlianbtn() {
				this.$emit('guanlian', this.customData)
			},
			makephone() {
				this.$emit('makephone', this.customData)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 30rpx;
	}
	.pp {
		color: #666;
		font-size: 32rpx;
		padding-left: 10rpx;
	}
	.item-sub {
		color: #666;
	}
</style>
