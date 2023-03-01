<template>
	<view class="text-white w " :class="[typeActive]" :style="{
		backgroundColor: themeConfig.pageBg
	}">
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar @backEvent="handleBack" backBtn
				:title="`${onlineControl.title? onlineControl.title :pageConfig[pan].navtitle}`"></navBar>
			<view class="search-w u-p-l-20 u-p-r-20 u-p-b-10 u-p-t-10 u-flex u-flex-items-center ">
				<!-- <view @click="handleGoto({url: '/pages/index/search/search', params: {pan: pan}})" class="item u-flex-1" >
					<u-search 
						placeholder="搜索商品" 
						:value="keyword"
						:showAction="false"
						disabled
						:bgColor="themeConfig.pageBg"
					></u-search>
				</view> -->
				<view class="item u-flex-1">
					<view class="u-flex u-flex-items-center" :style="{
							color: themeConfig.pan.pageText
						}" @click="cpyPopup = true">
						<i class="custom-icon-gongsi1 custom-icon"></i>
						<text class="u-p-l-8 u-font-30 u-line-1">
							{{cpyInfo.name}}
						</text>
					</view>
				</view>
				<view @click="changePan" class="u-flex u-flex-items-center" 
					v-if="panSwitchBtn"
					:style="{
						color: themeConfig.tabTextActive
					}">
					<i class="custom-icon-qiehuan1 custom-icon"></i>
					<text class="u-p-l-8 u-font-30">{{pan == 's'? '卖盘' : '买盘'}}</text>
				</view>
			</view>

			<view class="tabs-w">
				<u-tabs :list="tabs_list" :current="tabs_current" lineHeight="0"
					:activeStyle="{...activeTabsStyle, color: themeConfig.tabTextActive}"
					:inactiveStyle="{ color: themeConfig.tabTextInactive}" :itemStyle="itemTabsStyle"
					@change="handleTabsChange">
					<!-- <view 
						slot="right"
						class="u-p-r-20 u-flex u-flex-items-center"
						:style="{
							color: themeConfig.pan.pageText
						}"
						@click="show = true"
					>
						<i class="custom-icon-filter2 custom-icon"></i>
						<text class="u-p-l-8 u-font-30">分类筛选</text>
					</view>
					 -->
				</u-tabs>
			</view>
		</view>
		<view class="list" :style="{
			height: `calc(100% - 182px - ${sys.statusBarHeight}px - ${sys.safeAreaInsets.bottom}px)`
		}">

			<template v-if="skeletonLoading">
				<view class="u-p-20 animation" v-for="item in 4" :key="item">
					<u-skeleton loading animate rows="3" :title="false" avatarShape="square" avatarSize="48">
					</u-skeleton>
				</view>
			</template>
			<template v-else>
				<u-list height="100%" enableBackToTop @scrolltolower="scrolltolower" :preLoadingScreen="100">
					<u-list-item v-if="info">
						<view class="u-p-l-20 u-p-r-20 u-p-t-20">
							<view class="u-content u-p-26 u-radius-6" :style="{
									backgroundColor: typeActive == 'white' ? '#fff' : themeConfig.followCard.boxBottomBg,
									color: themeConfig.pageText,
									fontSize: '14px'
								}">
								<u-parse :content="info"></u-parse>
							</view>
						</view>
					</u-list-item>
					<u-list-item v-for="(item, index) in indexList" :key="item.id">
						<view class="u-p-l-20 u-p-r-20 u-p-t-20">
							<cardA :name="item.name" :pid="item.id" :amount="item.amount" :color="item.color"
								:price="item.price" :dprice="item.dprice" :unit="item.unit"
								:spec="pan == 'b' ? item.spec : item.spec1" :delivery_place="item.delivery_place"
								:express_time="item.express_time" :express_unit="item.express_unit"
								:trade_type="item.trade_type" :pubDate="item.post_time" :tims="item.Tims" :origin="item"
								@tims="handleClickTims" @detail="handleRouteTo"></cardA>
						</view>

					</u-list-item>

					<template name="dataStatus">
						<template v-if="indexList.length == 0">
							<view class="u-m-t-40">
								<u-empty mode="data" :icon="themeConfig.empty">
								</u-empty>
							</view>

						</template>
						<template v-else>
							<u-loadmore :status="loadstatus" />
						</template>
					</template>
				</u-list>
			</template>

		</view>
		<view class="route-btn u-flex u-flex-column">
			<view class="item u-flex u-flex-center u-flex-items-center" @click="routeEvent" v-if="xcxBtn" :style="{
					background: typeActive == 'white'? '#007aff' :themeConfig.themeIconColor,
					color: typeActive == 'white'? '#fff' :themeConfig.navText,
				}">
				<i class="custom-icon-xiaochengxu custom-icon" :style="{
					color: typeActive == 'white'? '#fff' :themeConfig.navText,
					fontSize: '30px'
				}"></i>
			</view>
		</view>
		<u-popup :show="cpyPopup" mode="center" @close="cpyPopup = false" :safeAreaInsetBottom="false" round="25"
			:bgColor="themeConfig.pageBg">
			<view class="wrapper u-p-20" :style="{
				backgroundColor: themeConfig.pageBg,
				color: themeConfig.baseText,
			}">
				<view class="main u-p-30" :style="{
					backgroundColor: themeConfig.boxBgBottom,
				}">
					<view class="u-flex u-flex-center u-m-b-30"> {{cpyInfo2.name}}</view> 
					
					<view class="" :style="{
						color: themeConfig.pageText,
					}"> {{cpyInfo2.intro}}</view>
				</view>
			</view>
		</u-popup>
		<menusBar tabbar :activeIndex="pageConfig[pan].menuIndex" :theme="typeActive"></menusBar>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				show: false,
				login: '',
				pan: 's',
				standard: '',
				cpyInfo: {},
				cpyInfo2: {},
				skeletonLoading: true,
				cpyPopup: false,
				pageConfig: {
					's': {
						navtitle: '卖盘中心',
						menuIndex: 1
					},
					'b': {
						navtitle: '买盘中心',
						menuIndex: 2
					},
				},
				keyword: '',
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '30rpx',
					color: '#fff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				tabs_list: [],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				xcxBtn: 0,
				panSwitchBtn: 0,
				appid: '',
				info: ``,
			};
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
				if (this.tabs_list.length == 0) return {}
				return {
					login: this.login,
					standard: this.tabs_list[this.tabs_current].standard,
					// terms: this.tabs_list[this.tabs_current].keyword,
					p: this.curP,
					prefecture: 1,
				}
			}
		},
		async onLoad(options) {
			// console.log(options) 
			if (options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			if (options.hasOwnProperty('standard')) {
				this.standard = options.standard
			}
			if (options.hasOwnProperty('login')) {
				this.login = options.login
			} else {
				uni.showToast({
					title: '参数有误',
					icon: 'none'
				})
			}
			uni.showLoading()
			await this.getInitInfo()
			this.getData()
			// if(options.hasOwnProperty('data')) {
			// 	const data = JSON.parse(decodeURIComponent(options.data))
			// 	// console.log(encodeURIComponent(JSON.stringify(data)))
			// 	this.menusConfirm({
			// 		name: data.name,
			// 		id: data.standard,
			// 		keyword: data.keyword || "",
			// 		disabled: false,
			// 	})
			// 	this.tabs_current = 1
			// }
			// else if(options.hasOwnProperty('keyword')) {
			// 	// this.keyword = options.keyword
			// 	this.menusConfirm({keyword: options.keyword, name: `搜索${options.keyword}结果`})
			// 	this.tabs_current = 1
			// }
			// else {
			// }
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleBack() {
				uni.navigateBack()
			},
			changePan() {
				this.pan = this.pan == 's' ? 'b' : 's';
				this.handleTabsChange({
					index: this.tabs_current
				})
			},
			async getInitInfo() {
				const res = await this.$api.mancust_info_category({
					params: {
						login: this.login,
						id: this.standard,
					}
				})
				if (res.code == 1) {
					this.cpyInfo = res.list
					this.cpyInfo2 = res.company
					this.xcxBtn = res.xcx
					this.panSwitchBtn = res.show
					this.appid = res.appid
					this.tabs_list = [{
						standard: '',
						disabled: false,
						name: '全部'
					}, ...res.category.map(ele => {
						return {
							...ele,
							disabled: false,
							standard: ele.id,
						}
					})]
					let index = this.tabs_list.findIndex(ele => ele.id == this.standard)
					if (index == -1) index = 0
					this.handleTabsChange({
						index
					})
				}
			},
			async menusConfirm(data) {
				console.log(data)
				this.tabs_list.push({
					name: data.name,
					keyword: data.keyword || "",
					disabled: false,
					standard: data.id,
				})
				this.show = false;
				this.handleTabsChange({
					index: this.tabs_list.length - 1
				})
			},
			refreshList() {
				uni.showLoading()
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.info = '';
				this.loadstatus = 'loadmore'
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(obj) {
				this.tabs_current = obj.index
				// if(obj.index == 0) {
				// 	delete this.customShareParams.data
				// }else {
				// 	this.customShareParams.data = encodeURIComponent(JSON.stringify(this.tabs_list[obj.index]))
				// }

				this.changeTabsStatus('disabled', true)
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getData() {
				if (this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				// console.log(this.tabs_current)
				const res = await this.$api[this.pan == 's' ? 'getSell' : 'getBuy']({
					params: this.paramsObj
				})
				// const res = await this.$api.getPanList()
				// console.log(res)
				if (res.code == 1) {
					this.setOnlineControl(res)
					this.indexList = [...this.indexList, ...res.list]
					this.info = res.info
					if (this.curP == res.total) {
						this.loadstatus = 'nomore'
					} else {
						this.loadstatus = 'loadmore'
					}
				}
				this.skeletonLoading = false
			},
			async getMoreData() {
				if (this.loadstatus != 'loadmore') return
				this.curP++
				await this.getData()
			},
			handleRouteTo({
				id
			}) {
				uni.navigateTo({
					url: `/pages/index/pan/panDetail?id=${id}&pan=${this.pan}`
				})
			},
			handleClickTims({
				tims,
				id,
				origin
			}) {
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login: `${tims.login}`,
						content: `咨询${this.pan=='s'? '卖盘': '买盘'}：${origin.name}，https://www.rawmex.cn/${this.pan=='s'? 'sell': 'buy'}-${id}.html`
					}
				})
				// this.handleGoto({
				// 	url: '/pages/index/webview/webview',
				// 	params: {
				// 		_a: 'msg',
				// 		f: 'detail',
				// 		id: `${tims.id}_${tims.ctime}`,
				// 		ttype: this.pan == 's'? 'sell': 'buy',
				// 		tid: id,
				// 		tims: '1'
				// 	}
				// })
			},
			routeEvent() {
				console.log(this.appid)
				uni.navigateToMiniProgram({
					appId: this.appid,
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100vh;

		.dark /deep/ {
			.u-skeleton {
				&__wrapper {
					&__avatar {
						background: #1e1f31 !important;

						&--circle {}

						&--square {}
					}

					&__content {

						&__rows,
						&__title {
							background: #1e1f31 !important;
						}
					}
				}
			}
		}

		.white /deep/ {
			.u-skeleton {
				&__wrapper {
					&__avatar {
						background: #dcdcdc !important;

						&--circle {}

						&--square {}
					}

					&__content {

						&__rows,
						&__title {
							background: #dcdcdc !important;
						}
					}
				}
			}
		}
	}
</style>
<style lang="scss" scoped>
	.wrapper {
		width: 80vw;
		border-radius: 20rpx;
		overflow: hidden;

		.header {}

		.main {
			background-color: #f8f8f8;
			// height: 50vh;
			width: 100%;
			box-sizing: border-box;
		}
	}

	.route-btn {
		position: fixed;
		right: 20px;
		bottom: 80px;
		bottom: calc(80px + constant(safe-area-inset-bottom));
		bottom: calc(80px + env(safe-area-inset-bottom));
		z-index: 20;

		.item {
			width: 45px;
			height: 45px;
			border-radius: 30px;
		}
	}

	.search-w {
		height: 42px;
		box-sizing: border-box;
	}

	.w {
		height: 100vh;
	}

	.list {
		height: calc(100% - 182px - env(safe-area-inset-bottom));

	}

	.animation {
		animation: shandong 1.5s ease infinite;
	}

	@keyframes shandong {
		50% {
			opacity: .5;
		}

		100% {
			opacity: 1;
		}
	}
</style>
