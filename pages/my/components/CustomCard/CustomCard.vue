<template>
	<view class="card-w u-p-26"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 
		>
		<view class="card-header " @click="handleGotoDetail">
			<view class="item u-m-b-20">
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">账号</view>
					<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.login}}</view>
				</view>
				<view v-if="originalData.to_state != 1" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">初始密码</view>
					<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.to_passwd}}</view>
				</view>
				<view v-if="originalData.to_name" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">交易商名称</view>
					<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.to_name}}</view>
				</view>
				<view v-if="originalData.to_contact" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">联系人</view>
					<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.to_contact}}</view>
				</view>
				<view v-if="originalData.to_mobile" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">手机</view>
					<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.to_mobile}}</view>
				</view>
				<view v-if="originalData.to_ctime" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
					<view class="name">登记日</view>
					<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.to_ctime | date2timestamp | timeFrom}}</view>
				</view>
			</view>
			
		</view>
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-b-12 u-p-t-12">
			<view class="item  u-flex u-flex-items-center">
				<u-button @click.stop="handleCopy" type="primary" size="mini" shape="circle" >
					{{originalData.to_state == 1 ? '一键复制账号' : '一键复制账号密码'}}
				</u-button>
			</view>
			<view class="item " :class="{
				'text-primary': originalData.to_state == 1,
				'text-light': originalData.to_state != 1,
			}">
				{{originalData.to_state == 1 ? '已使用' : '未使用'}}
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
			originalData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', {id: this.ids, originalData: this.originalData})
			},
			handleCopy() {
				this.$emit('copy', this.originalData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 30rpx;
		white-space: nowrap;
		flex: 0 0 90px
	}
	.pp {
		color: #666;
		font-size: 32rpx;
		padding-left: 10rpx;
		white-space: nowrap;
	}
	.item-sub {
		color: #666;
	}
</style>
