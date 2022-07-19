<template>
	<view class="w u-p-l-20 u-p-t-20 u-p-r-20">
		<view class="u-text-center u-p-20 u-m-b-20 u-font-40">{{list.title}}</view>
		
		<view class="u-text-center u-p-20 u-m-b-20 text-base u-font-28">
			<text class="u-p-r-10" v-if="list.source">{{list.source}}</text>
			<text>{{list.pubDate}}</text>
		</view>
		<view class="u-content u-p-20">
			<u-parse :content="list.content"></u-parse>
		</view>
		
		<u-safe-bottom></u-safe-bottom>
		<tabBar
			theme="white"
			:customStyle="{
				'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
			}">
			<view class="pan-tabbar u-flex u-flex-items-center u-flex-around "
				:style="{
					color: themeConfig.tabText,
					backgroundColor: themeConfig.tabBg,
				}"
			>
				<view @click="handleGoto('/pages/index/index')" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<text>首页</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<view class="item-btn  u-flex u-flex-items-center u-flex-center">
					<u-button open-type="share" :customStyle="{
						color: themeConfig.tabText,
						backgroundColor: 'transparent',
						border: 'none',
						fontSize: '16px'
					}">
						<i class="custom-icon-forward custom-icon"></i>
						<text class="u-p-l-10">分享</text>
					</u-button>
					
				</view>
			</view>
			
		</tabBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				list: '',
				mode: 'event',
				id: '',
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			}else {
				uni.navigateBack()
			}
			if(options.hasOwnProperty('mode')) {
				this.mode = options.mode
			}
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				sh: state => state.user.sh,
			}),
			...mapGetters({
				sys: 'theme/sys'
			}),
			themeConfig() {
				return this.typeConfig.white
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async getData() {
				const res = await this.$api.ppiNewsDetail({
					params: {
						id: this.id,
						mode: this.mode
					}
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.list = res.list
					uni.setNavigationBarTitle({
						title: res.list.title
					})
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.w {
		padding-bottom: 80px;
		min-height: 100vh;
	}
	.u-content {
		line-height: 25px;
		font-weight: 300;
	}
	.pan-tabbar {
		height: 100%;
		.item-btn {
			height: 100%;
			&.share-btn {
				
			}
		}
	}
</style>
