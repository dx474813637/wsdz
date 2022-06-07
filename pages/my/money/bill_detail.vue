<template>
	<view>
		<view class="main">
			<view class="main-header">
				<view class="header-title u-flex u-flex-center u-flex-items-center">
					<view>杭州有意思测试有限公司</view>
				</view>
				<view class="header-content u-flex u-flex-center u-flex-items-center">
					<view>
						<u--text size="30" type="error" mode="price" text="128"></u--text>
					</view>
				</view>
			</view>
			<view class="main-content">
				<view class="row u-flex">
					<view class="item-left">
						<p>当前状态</p>
					</view>
					<view class="item-right">
						<p>支付成功</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>支付方式</p>
					</view>
					<view class="item-right">
						<p>现金（sinopay余额/微信支付）或赊账</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>商品</p>
					</view>
					<view class="item-right">
						<p>恒大冰泉低钠水弱碱性饮用水500ml*12瓶箱装</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>商户</p>
					</view>
					<view class="item-right">
						<p>杭州有意思测试有限公司</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>支付时间</p>
					</view>
					<view class="item-right">
						<p>2021-9-9 15:28:11</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>支付单号</p>
					</view>
					<view class="item-right">
						<p>48913213212313215649841</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>订单号</p>
					</view>
					<view class="item-right">
						<p>48913213212313215649841</p>
					</view>
				</view>
			</view>
			<navigator url="/pages/my/order/order_detail" class="u-m-t-60">
				<u-button type="primary">查看订单</u-button>
			</navigator>
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

<style lang="scss" scoped>
.main {
    padding: 20px;
    background-color: #fff;
    .main-header {
        margin-bottom: 20px;
        border-bottom: 1px solid #f8f8f8;
        .header-title {
            /* background-color: #fff; */
            position: relative;
            /* border-bottom: 1px dashed #eee; */
            height: 45px;
            color: #000;
            font-size: 16px;
            /* &:before, &:after {
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
            } */
        }
        .header-content {
            
            height: 80px;
            color: #000;
            font-size: 30px;
            border-radius: 5px;
            padding-bottom: 20px;
            /* box-shadow: 0 5px 5px rgba(0,0,0,.1); */
        }
        
    }
    .main-content {
        padding: 0 5px;
        .row {
            /* border-bottom: 1px solid #eee; */
            min-height: 30px;
            margin-bottom: 10px;
            .item-left {
                color: #999;
                flex: 0 0 90px;
                width: 90px;
                
            }
            .item-right {
                color: #000;
                flex: 1;
            }
        }
    }
}
</style>
