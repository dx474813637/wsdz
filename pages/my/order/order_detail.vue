<template>
	<view class="u-p-20" @click="handleDetail">
		<view class="addr-content-box u-m-b-30">
			<view class="addr-content u-p-30">
				<view class="addr-row u-m-b-10 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">交收方式</view>
					<view class="item u-text-right">卖家送货</view>
				</view>
				<view class="addr-row u-m-b-10 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">交收地址</view>
					<view class="item u-text-right">山东济南平阴</view>
				</view>
			</view>
			
		</view>
		<view class="main u-p-30">
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单编号</view>
				<view class="item u-text-right">615</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">来源</view>
				<navigator url="/pages/my/user/index" class="item">买盘： 6063铝棒</navigator>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">买方</view>
				<view class="item u-text-right">宁波网盛大宗商品交易有限公司</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">卖方</view>
				<view class="item u-text-right">宁波网盛大宗商品交易有限公司</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">商品详情</view>
				<view class="item u-text-right">6063铝棒，型号，90，120，年采购预计10000吨，工厂</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">数量</view>
				<view class="item u-text-right">200吨</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">单价</view>
				<view class="item u-text-right">23,200.00 元/吨</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">商品总额</view>
				<view class="item u-text-right">4,640,000.00 元</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">下单日期</view>
				<view class="item u-text-right">2022-04-02</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">合同状态</view>
				<view class="item u-text-right">订立中</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">交收状态</view>
				<view class="item u-text-right">未交收</view>
			</view>
			<view class="u-p-t-16">
				<u-button type="primary">审核</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			ids: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			handleDetail() {
				this.$emit('detail', {id: this.ids})
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
	.addr-content-box {
		background-color: #fff;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		// border: 1rpx solid #f8f8f8;
		border: 3px solid transparent;
		background: 
			linear-gradient(white, white) padding-box,
			repeating-linear-gradient(
				-45deg, 
				red 0, 
				red 12.5%, 
				transparent 0, 
				transparent 25%, 
				#58a 0, 
				#58a 37.5%, 
				transparent 0, 
				transparent 50%
			) 0/2em 2em;
		// &:after {
		// 	content: "";
		// 	position: absolute;
		// 	bottom: 0;
		// 	left: 0;
		// 	height: 6rpx;
		// 	width: 100%;
		// 	background-image: url("../static/img/addr-bottom.jpg");
		// 	background-repeat: repeat-x;
		// 	background-size: auto 100%;
		// 	background-position: 0 0;
		// }
		.addr-content {
			
		}
	}
	.item {
		color: #444;
	}
	.item-label {
		flex: 0 0 100px;
	}
	.main {
		background-color: #fff;
	}
</style>
