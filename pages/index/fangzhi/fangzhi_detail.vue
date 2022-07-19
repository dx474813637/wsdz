<template>
	<view class="w">
		<view v-if="list.pic_array && list.pic_array.length > 0">
			<u-swiper
				:list="list.pic_array"
				height="375"
				imgMode="aspectFit"
			></u-swiper>
		</view>
		<view class="main u-p-30">
			<view class="card u-p-30 u-m-b-30">
				<view class="card-name u-m-b-10">{{list.product_name}}</view>
				<view class="u-flex u-flex-items-start u-p-t-15 u-font-28">
					<view class="card-label u-info">供应商</view>
					<view class="card-content">{{list.company}}</view>
				</view>
				<view class="u-flex u-flex-items-start u-p-t-15 u-font-28">
					<view class="card-label u-info">联系人</view>
					<view class="card-content">{{list.company_contact}}</view>
				</view>
				<view class="u-flex u-flex-items-start u-p-t-15 u-font-28">
					<view class="card-label u-info">手机</view>
					<view class="card-content u-flex u-flex-items-center">
						<text>{{list.company_mobile}}</text>
						<i class="custom-icon-iconfonta custom-icon u-m-l-25 u-font-28" @click="makecall(list.company_mobile)"></i>
						<i class="custom-icon-fuzhi custom-icon u-m-l-25 u-font-26" @click="copy(list.company_mobile)"></i>
					</view>
				</view>
				<view class="u-flex u-flex-items-start u-p-t-15 u-font-28">
					<view class="card-label u-info">联系电话</view>
					<view class="card-content u-flex u-flex-items-center">
						<text>{{list.company_tel}}</text>
						<i class="custom-icon-iconfonta custom-icon u-m-l-25 u-font-28" @click="makecall(list.company_tel)"></i>
						<i class="custom-icon-fuzhi custom-icon u-m-l-25 u-font-26" @click="copy(list.company_tel)"></i>
					</view>
				</view>
			</view>
			<view class="card u-p-30 u-m-b-30" >
				<view class="card-title u-font-32">产品参数</view>
				<template v-if="list.list_attr && list.list_attr.length >0 ">
					<view class="u-flex u-flex-items-start u-p-t-15 u-font-28"
						v-for="(item, index) in list.list_attr"
						:key="item.id"
					>
						<view class="card-label u-info">{{item.title}}</view>
						<view class="card-content">{{item.val}}</view>
					</view>
				</template>
				<view class="u-flex u-flex-items-start u-p-t-15 u-font-28">
					<view class="card-label u-info">库存</view>
					<view class="card-content">{{list.product_count}}</view>
				</view>
			</view>
			<view class="card u-p-30 u-m-b-30" v-if="list.intro">
				<view class="card-title u-font-32">详细介绍</view>
				<view class="u-p-20">
					<u-read-more
						toggle
						showHeight="200"
					>
						<u-parse :content="list.intro"></u-parse>
					</u-read-more> 
					
				</view>
			</view>
			<view class="card-title u-font-32 u-text-center">该企业其他产品</view>
			<view v-if="list.list_product && list.list_product.length > 0">
				<view class="u-p-l-20 u-p-r-20 u-p-t-20" v-for="item in list.list_product">
					<view class="card-i u-flex bg-white " @click="handleGoto({url: '/pages/index/fangzhi/fangzhi_detail', params: {pid: item.pid}})">
						<view class="u-p-20">
							<u-image width="50px" height="50px" :src="item.pic_name1" radius="10"></u-image>
						</view>
						<view class="u-flex-1 u-p-20">
							<view class="u-m-b-15" style="font-weight: bold;">{{item.product}}</view>
						</view>
					</view>
				</view>
			</view>
			<u-empty
				v-else
				mode="data"
				:icon="typeConfig.white.empty"
			>
			</u-empty>
		</view>
		
		<u-safe-bottom></u-safe-bottom>
		<menusBar  theme="white" ></menusBar>
		
		<view style="position: relative;z-index: 1;">
			<u-loading-page
				:loading="indexLoading"
				loading-text="获取页面数据中..."
			></u-loading-page>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions } from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				indexLoading: true,
				pid: '',
				list: {}
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
				typeConfig: state => state.theme.typeConfig,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
			}),
		},
		async onLoad(options) {
			
			if(options.hasOwnProperty('pid')) {
				this.pid = options.pid
			}else {
				
				uni.navigateBack({
					success() {
						uni.showToast({
							title: 'pid参数有误',
							icon: 'none'
						})
					}
				})
				return 
			}
			await this.getIndex()
			this.indexLoading = false
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async getIndex() {
				const res = await this.$api.texnetDetail({
					params: {
						pid: this.pid
					}
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.list = res.list
				}
			},
			
			makecall(obj) {
				uni.makePhoneCall({
					phoneNumber: obj
				})
			},
			copy(obj) {
				uni.setClipboardData({
					data: obj,
					success: function () {
					}
				});
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
</style>
<style lang="scss" scoped>
	.w {
		padding-bottom: 50px;
	}
	.card-label {
		flex: 0 0 70px;
		padding-right: 15px;
		text-align: justify;
		text-align-last: justify;
	}
	.card-name {
		line-height: 22px;
	}
	.card {
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
	.card-content {
		word-break: break-all;
	}
	.card-title {
		border-bottom: 1rpx solid #eee;
		line-height: 35px;
		font-weight: bold;
		color: #2464f5;
	}
	
	.card-i {
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
</style>
