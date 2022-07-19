<template>
	<view class="w">
		<!-- <view class="wrapper" v-if="list.img">
			<u-image :src="list.img" width="100%" mode="widthFix"></u-image>
		</view> -->
		<view class="main u-p-20">
			<view class=" u-p-20 u-m-b-30">
				<view class="card-name u-m-b-20">{{list.title}}</view>
				<view class="u-flex u-flex-items-center u-font-28 u-info">
					<view class="">{{list.dtime}}</view>
					<view class="u-p-l-20" v-if="list.source">{{list.source}}</view>
				</view>
			</view>
			<u-line color="#ccc"></u-line>
			<view class=" u-m-b-30 u-m-t-30 u-p-20" v-if="list.intro">
				<u-parse :content="list.intro"></u-parse>
			</view>
			
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
				id: '',
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
			
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			}else {
				
				uni.navigateBack({
					success() {
						uni.showToast({
							title: 'id参数有误',
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
				const res = await this.$api.xueyuanDetail({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.list = res.list
				}
			},
			handleShipin() {
				if(this.list.shipin == 1) {
					wx.openChannelsActivity({
						finderUserName: this.list.sph,
						feedId: this.list.feedid,
						success(res) {
							console.log(res)
						}
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.wrapper {
		position: relative;
		.video-icon {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.5);
		}
	}
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
		font-weight: bold;
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
