<template>
	<view class="card-w u-p-26"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		>
		<view class="card-header ">
			<view class="item u-m-b-20">
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">账号</view>
					<view class="pp">{{c_account}}</view>
				</view>
				<view v-if="c_status != 1" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">初始密码</view>
					<view class="pp">{{c_pwd}}</view>
				</view>
				<view v-if="c_name" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">客户名称</view>
					<view class="pp">{{c_name}}</view>
				</view>
				<view v-if="c_contact" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">联系人</view>
					<view class="pp">{{c_contact}}</view>
				</view>
				<view v-if="c_phone" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">手机</view>
					<view class="pp">{{c_phone}}</view>
				</view>
			</view>
			
		</view>
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-b-12 u-p-t-12">
			<view></view>
			<view class="item " :class="{
				'text-primary': c_status == 1,
				'text-light': c_status != 1,
			}">
				{{c_status == 1 ? '已使用' : '未使用'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CustomCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			ids: {
				type: String,
				default: 'ids',
			},
			c_account: {
				type: String,
				default: 'c_account',
			},
			c_pwd: {
				type: String,
				default: 'c_pwd',
			},
			c_name: {
				type: String,
				default: 'c_name',
			},
			c_contact: {
				type: String,
				default: 'c_contact',
			},
			c_phone: {
				type: String,
				default: 'c_phone',
			},
			c_email: {
				type: String,
				default: 'c_email',
			},
			c_status: {
				type: String,
				default: '1',
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
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			psub() {
				return `${this.type == 's'? '卖盘': '买盘'}：${this.pid}`
			}
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', {id: this.ids, customData: this.customData})
			}
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
