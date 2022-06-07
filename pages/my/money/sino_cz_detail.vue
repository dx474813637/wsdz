<template>
	<view>
		 <view class="main">
			<view class="main-header">
				<view class="header-title u-flex u-flex-items-center u-flex-center">
					<view>充值成功</view>
				</view>
				<view class="header-content u-flex u-flex-items-center u-flex-center">
					<view>128.00</view>
				</view>
			</view>
			<view class="main-content">
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>现金账号：</view>
					</view>
					<view class="item-right">
						<view>1100000245</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>充值银行卡：</view>
					</view>
					<view class="item-right">
						<view>666*****465464</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>充值金额：</view>
					</view>
					<view class="item-right">
						<view>123</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>充值手续费：</view>
					</view>
					<view class="item-right">
						<view>123</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>状态：</view>
					</view>
					<view class="item-right">
						<view>充值成功</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>充值时间：</view>
					</view>
					<view class="item-right">
						<view>2021-9-9 08:20:14</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
		min-height: 100vh;
	}
</style>

<style lang="scss" scoped>
	.main {
	    padding: 20px;
	    .main-header {
	        margin-bottom: 20px;
	        .header-title {
	            background-color: #fff;
	            position: relative;
	            border-bottom: 1px dashed #eee;
	            height: 45px;
	            color: #000;
	            font-size: 16px;
	            &:before, &:after {
	                content: "";
	                position: absolute;
	                background-color: #f8f8f8;
	                bottom: 0;
	                width: 20px;
	                height: 20px;
	                border-radius: 50%;
	            }
	            &:before {
	                left: 0;
	                transform: translate(-50%, 50%);
	            }
	            &:after {
	                right: 0;
	                transform: translate(50%, 50%);
	            }
	        }
	        .header-content {
	            background-color: #fff;
	            height: 150px;
	            color: red;
	            font-size: 30px;
	            border-radius: 5px;
	            box-shadow: 0 5px 5px rgba(0,0,0,.1);
	        }
	    }
	    .main-content {
	        padding: 0 5px;
	        .row {
	            border-bottom: 1px solid #eee;
	            height: 35px;
	            .item-left {
	                color: #000;
	            }
	            .item-right {
	                color: #999
	            }
	        }
	    }
	}
</style>
