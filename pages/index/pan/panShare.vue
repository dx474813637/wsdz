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
		<view class="cpy-wrapper u-p-l-20 u-p-r-20 u-flex u-flex-items-start u-flex-center " :style="{
			backgroundColor: themeConfig.sharePan.cpyBg
		}" v-if="userInfo.name">
			<view class="u-font-34 u-m-b-20" :style="{
				color: themeConfig.sharePan.cpyTitle
			}">{{userInfo.name}}</view>
			<view class="u-flex u-flex-items-center u-font-28" :style="{
				color: themeConfig.sharePan.cpySub
			}">
				<!-- <view class="u-m-r-20">{{pan == 's'? '卖盘清单' : '买盘清单'}}</view>
				<view>{{auth | auth2str}}{{contact}} {{mobile}}</view> -->
				<view class="u-m-r-10">
					<u-tag :text="pan == 's'? '卖盘清单' : '买盘清单'" :borderColor="themeConfig.sharePan.tagBorderColor" :color="themeConfig.sharePan.tagColor" plain size="mini" type="primary"></u-tag>
				</view>
				<view class="u-m-r-10">
					<u-tag :text="userInfo.auth | auth2str" plain size="mini" type="primary":borderColor="themeConfig.sharePan.tagBorderColor" :color="themeConfig.sharePan.tagColor" ></u-tag>
				</view>
				<view class="u-m-r-10" v-if="userInfo.contact">
					<u-tag :text="userInfo.contact" plain size="mini" type="primary":borderColor="themeConfig.sharePan.tagBorderColor" :color="themeConfig.sharePan.tagColor" ></u-tag>
				</view>
				<view class=" " v-if="userInfo.mobile">
					<u-tag :text="userInfo.mobile" plain size="mini" type="primary":borderColor="themeConfig.sharePan.tagBorderColor" :color="themeConfig.sharePan.tagColor" ></u-tag>
				</view>
				
				
			</view>
		</view>
		<view class="list" :style="{
			height: `calc(100% - 174px - ${sys.statusBarHeight}px - ${sys.safeAreaInsets.bottom}px)`
		}">
			<u-list
				height="100%"
				enableBackToTop
				@scrolltolower="scrolltolower"
				:preLoadingScreen="100"
			>
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
		
		
		<menusBar tabbar :theme="typeActive" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				userInfo: {},
				id: '',
				pan: '',
				contact: '',
				mobile: '',
				name: '',
				auth: 0,
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				backBtn: true,
			};
		},
		onLoad(options) {
			if(uni.$u.pages().length == 1) this.backBtn = false
			console.log(options)
			if(options.hasOwnProperty('pan') && options.hasOwnProperty('id')) {
				this.pan = options.pan
				this.id = options.id
			}
			// if(options.hasOwnProperty('auth') && options.hasOwnProperty('id') && options.hasOwnProperty('pan')) {
			// 	this.auth = options.auth
			// 	this.pan = options.pan
			// 	this.contact = options.contact ? '' : decodeURIComponent(options.contact)
			// 	console.log(this.contact)
			// 	this.mobile = options.mobile
			// 	this.name = decodeURIComponent(options.name)
			// 	this.id = options.id
			// }
			else {
				uni.reLaunch({
					url: '/pages/index/index',
					success() {
						uni.showToast({
							title: '清单参数有误',
							icon: 'none'
						})
					}
				})
				
			}
			uni.showLoading()
			this.getData()
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
					company_id: this.id
				}
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
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
	.cpy-wrapper {
		height: 80px;
		flex-direction: column;
		box-sizing: border-box;
	}
	.list {
		height: calc(100% - 182px - env(safe-area-inset-bottom));
		
	}
</style>
