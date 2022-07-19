<template>
	<view class="text-white w " :style="{
		backgroundColor: themeConfig.pageBg
	}">
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar :title="onlineControl.title" 
			:backBtn="backBtn"
			@backEvent="handleBackEvent"></navBar>
			
		</view>	
		<view class="list" :style="{
			height: `calc(100% - 94px - ${sys.statusBarHeight}px - ${sys.safeAreaInsets.bottom}px)`
		}">
			<u-list
				height="100%"
				enableBackToTop
				@scrolltolower="scrolltolower"
				:preLoadingScreen="100"
			>
			
				
				<view class="u-p-20" v-if="userInfo.name">
					<MoreBrokerCard
						:origin="userInfo"
					></MoreBrokerCard>
				</view>
				<view class="u-p-20 u-m-b-30" v-if="userInfo.intro">
					<view class="yw-card u-p-t-30 u-p-b-40 u-p-l-40 u-p-r-40"
						:style="{
							color: themeConfig.tabText,
							backgroundColor: themeConfig.tabBg,
						}"
					>
						<view class="u-text-center u-m-b-20 u-font-34">业务范围</view>
						<view>
							<rich-text :nodes="userInfo.intro"></rich-text>
						</view>
					</view>
				</view>
				
				<u-list-item
					v-for="(item, index) in indexList"
					:key="item.id"
				>
					<view class="u-p-l-20 u-p-r-20 u-p-t-20">
						<cardA
							:name="item.name"
							:pid="item.id"
							:amount="item.amount"
							:color="item.color"
							:price="item.price"
							:dprice="item.dprice"
							:unit="item.unit"
							:spec="pan == 'b' ? item.spec : item.spec1"
							:delivery_place="item.delivery_place"
							:express_time="item.express_time"
							:express_unit="item.express_unit"
							:trade_type="item.trade_type"
							:pubDate="item.post_time"
							:tims="item.Tims"
							:origin="item"
							@tims="handleClickTims"
							@detail="handleRouteTo"
						></cardA>
					</view>
					
				</u-list-item>
				
				<template name="dataStatus">
					<template v-if="indexList.length == 0">
						<u-empty
							mode="data"
							:icon="themeConfig.empty"
						>
						</u-empty>
					</template>
					<template v-else>
						<u-loadmore
							:status="loadstatus"
						/>
					</template>
				</template>
			</u-list>
		</view>
		<tabBar
			:theme="typeActive"
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
					<i class="custom-icon-home custom-icon"></i>
					<text class="u-p-l-10">首页</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<view class="item-btn  u-flex u-flex-items-center u-flex-center">
					<button class="u-flex u-flex-items-center" open-type="share" id="diy_mp" :style="{
						color: themeConfig.tabText,
						backgroundColor: 'transparent',
						border: 'none',
						fontSize: '16px'
					}">
						<i class="custom-icon-forward custom-icon"></i>
						<text class="u-p-l-10">分享名片</text>
					</button>
					
				</view>
				<template v-if="userInfo.intro">
					<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
					<view class="item-btn  u-flex u-flex-items-center u-flex-center">
						<button class="u-flex u-flex-items-center" open-type="share" id="diy_yw" :style="{
							color: themeConfig.tabText,
							backgroundColor: 'transparent',
							border: 'none',
							fontSize: '16px'
						}">
							<i class="custom-icon-forward custom-icon"></i>
							<text class="u-p-l-10">分享业务</text>
						</button>
						
					</view>
				</template>
				
			</view>
			
		</tabBar>
		
		<!-- <menusBar tabbar :theme="typeActive" ></menusBar> -->
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions } from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				userInfo: {},
				id: '',
				pan: 's',
				contact: '',
				mobile: '',
				name: '',
				auth: 0,
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				backBtn: true,
				share_img1: '',
				share_img2: '',
				share_title1: '',
				share_title2: '',
			};
		},
		onShareAppMessage(res){
			let share_img = this.onlineControl.share_img
			let share_title = this.onlineControl.share_title
			if(res.from == 'button') {
				
				if(res.target.id == 'diy_mp') {
					share_img = this.share_img1
					share_title = this.share_title1
				}
				else if(res.target.id == 'diy_yw') {
					share_img =  this.share_img2
					share_title = this.share_title2
				}
				return {
					title: share_title,
					path: this.getPath(),
					imageUrl: share_img
				};
			}
			return {
				title: share_title,
				path: this.getPath(),
				imageUrl: share_img
			};
			
		},
		async onLoad(options) {
			if(uni.$u.pages().length == 1) this.backBtn = false
			
			if(options.hasOwnProperty('pan') && options.hasOwnProperty('id')) {
				this.pan = options.pan
				this.id = options.id
			}
			else {
				uni.reLaunch({
					url: '/pages/index/index',
					success() {
						uni.showToast({
							title: '参数有误',
							icon: 'none'
						})
					}
				})
				
			}
			uni.showLoading()
			await this.getData()
			
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sys: 'theme/sys'
			}),
			paramsObj() {
				return {
					p: this.curP,
					company_id: this.id,
					zt: 1
				}
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				myCompany: 'user/myCompany'
			}),
			refreshList() {
				uni.showLoading()
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api[this.pan == 's'?'getSellShare':'getBuyShare']({params: this.paramsObj})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.share_img1 = res.share_img1
					this.share_img2 = res.share_img2
					this.share_title1 = res.share_title1
					this.share_title2 = res.share_title2
					this.indexList = [...this.indexList, ...res.list]
					this.userInfo = res.company
					if(this.indexList.length >= res.total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			handleRouteTo({id}) {
				uni.navigateTo({
					url: `/pages/index/pan/panDetail?id=${id}&pan=${this.pan}`
				})
			},
			
			handleClickTims({tims, id}) {
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login: `${tims.login}`,
						content: ``
					}
				})
			},
			handleBackEvent() {
				uni.navigateBack()
			},
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
		height: 100vh;
	}
	
	.pan-tabbar {
		height: 100%;
		.item-btn {
			height: 100%;
			&.share-btn {
				
			}
		}
	}
	button::after {
		border: none;
	}
	.yw-card {
		border-radius: 15px;
		line-height: 25px;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
	.cpy-wrapper {
		height: 80px;
		flex-direction: column;
		box-sizing: border-box;
	}
	.list {
		height: calc(100% - 182px - env(safe-area-inset-bottom));
		
	}
</style>
