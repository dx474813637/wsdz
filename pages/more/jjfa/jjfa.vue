<template>
	<view class="w">
		<pageTurning 
			v-if="bannerList.length > 0" 
			:xunhuan="false"  
			ref="pageTurning" 
			height="100%"  
			:imgList="bannerList"
			@getCurrent="handleGetCurrent"
			></pageTurning>
		<view class="dot-num" v-if="bannerList.length > 0">{{current}}/{{bannerList.length}}</view>
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
				<template v-if="cid">
					<view @click="handleGoto(`/pages/index/pan/cardList?pan=s&id=${cid}`)" class="item-btn  u-flex u-flex-items-center u-flex-center">
						<text>名片</text>
					</view>
					<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				</template>
				<view @click="$u.throttle(btnClickpre, 500)" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<text>上一页</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<view @click="$u.throttle(btnClicknext, 500)" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<text>下一页</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<view class="item-btn  u-flex u-flex-items-center u-flex-center">
					<u-button open-type="share" :customStyle="{
						color: themeConfig.tabText,
						backgroundColor: 'transparent',
						border: 'none',
						fontSize: '16px'
					}">
						<text class="u-p-l-10">分享</text>
					</u-button>
					
				</view>
			</view>
			
		</tabBar>
		
		<view style="position: relative;z-index: 1;">
			<u-loading-page
				:loading="indexLoading"
				loading-text="获取页面数据中..."
			></u-loading-page>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import pageTurning from "@/pages/more/components/cs-pageTurning/cs-pageTurning.vue"
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		components: {
			pageTurning
		},
		data() {
			return {
				id: '',
				cid: '',
				bannerList: [],
				current: 1,
				indexLoading: true,
			};
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			themeConfig() {
				return this.typeConfig.white
			}
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
			if(options.hasOwnProperty('cid')) {
				this.cid = options.cid 
			}
			await this.getIndex()
			this.indexLoading = false
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleGetCurrent({current}) {
				this.current = current
			},
			async getIndex() {
				const res = await this.$api.fanganDetail({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					if(!this.cid) this.cid = res.cid
					this.customShareParams.cid = res.cid
					this.bannerList = res.list.list.map(ele => {
						return {
							imgSrc: ele
						}
					})
				}
			},
			btnClickpre(str) {
				this.$refs.pageTurning.prePage()
				
			},
			btnClicknext(str) {
				this.$refs.pageTurning.nextPage()
				
			}
		}
	}
</script>
<style lang="scss">
	page {
		height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.w {
		height: calc(100% - 60px - env(safe-area-inset-bottom))
	}
	.btn {
		position: fixed;
		z-index: 50;
		left: 0;
		bottom: 0;
		width: 100%; 
		height: 80px;
	}
	.pan-tabbar {
		height: 100%;
		.item-btn {
			height: 100%;
			&.share-btn {
				
			}
		}
	}
	.dot-num {
		position: fixed;
		right: 30px;
		bottom: 120px;
		background-color: rgba(0,0,0,.6);
		border-radius: 15px;
		height: 25px;
		padding: 0 10px;
		color: #fff;
		text-align: center;
		line-height: 25px;
		font-size: 14px;
		z-index: 20;
	}
</style>
