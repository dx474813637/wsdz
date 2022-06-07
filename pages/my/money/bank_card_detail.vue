<template>
	<view>
		<view class="main">
			<view class="main-header">
				<BankCard
				
				></BankCard>
			</view>
			<view class="main-content">
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>资金账号</p>
					</view>
					<view class="item-right">
						<p>1100000245</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>手机号码</p>
					</view>
					<view class="item-right">
						<p>18888888888</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>银行卡号</p>
					</view>
					<view class="item-right">
						<p>666*****465464</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>户名</p>
					</view>
					<view class="item-right">
						<p>张三</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>开户行名称</p>
					</view>
					<view class="item-right">
						<p>中国农业银行</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>证件号码</p>
					</view>
					<view class="item-right">
						<p>123132*********1231</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>状态</p>
					</view>
					<view class="item-right">
						<p>已绑定</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>绑定时间</p>
					</view>
					<view class="item-right">
						<p>2021-9-9 08:20:14</p>
					</view>
				</view>
			</view>
			<view class="add-btn">
				<i class="custom-icon-info custom-icon"></i>
				<text>解绑银行卡</text>
			</view>
		</view>
	</view>
</template>

<script>
	import BankCard from '@/pages/my/components/BankCard/BankCard.vue'
	export default {
		data() {
			return {
				
			};
		},
		components: {
			BankCard
		},
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	.main {
		padding: 20px 12px;
		.main-header {
			/* margin-bottom: 20px; */
			background-color: #fff;
		}
		.main-content {
			padding: 0 8px;
			background-color: #fff;
			border-radius: 0 0 8px 8px;
			.row {
				/* border-bottom: 1px solid #eee; */
				height: 45px;
				padding: 0 8px;
				.item-left {
					color: #000;
				}
				.item-right {
					color: #999;
				}
			}
		}
	}
	
	.add-btn {
		/* background-color: #434d59; */
		color: #ff6666;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
	    margin-top: 40px;
		margin-bottom: 20px;
		border-radius: 25px;
		border: 1px solid #ff6666;
		text {
			margin-left: 5px;
		}
	}
</style>
