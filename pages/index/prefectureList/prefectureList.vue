<template>
	<view class="text-white w " :class="[typeActive]" :style="{
		backgroundColor: themeConfig.pageBg
	}">
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar 
				@backEvent="handleBack"
				backBtn 
				:title="`${onlineControl.title? onlineControl.title : '列表'}`"
			 ></navBar> 
		</view>
		<view class="list" :style="{
			height: `calc(100% - 96px - ${sys.statusBarHeight}px - ${sys.safeAreaInsets.bottom}px)`
		}">
			<template v-if="skeletonLoading">
				<view class="u-p-20 animation" v-for="item in 4" :key="item">
					<u-skeleton loading   animate rows="3" :title="false" avatarShape="square" avatarSize="48"></u-skeleton>
				</view>
			</template>
			<template v-else>
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
							<view class="u-p-20 u-radius-6" :style="{ 
								backgroundColor: typeActive == 'white' ? '#fff' : themeConfig.followCard.boxBottomBg
							}">
								<prefectureCard :origin="item" :cardType="item.type"></prefectureCard>
							</view>
							
						</view>
						
					</u-list-item>
					
					<template name="dataStatus">
						<template v-if="indexList.length == 0">
							<view class="u-m-t-40">
								<u-empty
									mode="data"
									:icon="themeConfig.empty"
								>
								</u-empty>
							</view>
							
						</template>
						<template v-else>
							<!-- <u-loadmore
								:status="loadstatus"
							/> -->
						</template>
					</template>
				</u-list>
			</template>
			
		</view> 
		<menusBar tabbar :activeIndex="pageConfig[pan].menuIndex" :theme="typeActive" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
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
				skeletonLoading: true,
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
				loadstatus: 'loadmore'
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
				if(this.tabs_list.length == 0) return {}
				return {
					login: this.login,
					standard: this.tabs_list[this.tabs_current].standard,
					// terms: this.tabs_list[this.tabs_current].keyword,
					p: this.curP,
				}
			}
		},
		async onLoad(options) {
			// console.log(options) 
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			if(options.hasOwnProperty('standard')) {
				this.standard = options.standard
			}
			if(options.hasOwnProperty('login')) {
				this.login = options.login
			}else {
				uni.showToast({
					title: '参数有误',
					icon: 'none'
				})
			}
			uni.showLoading() 
			this.getData() 
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleBack() {
				uni.navigateBack()
			},
			changePan() {
				this.pan = this.pan == 's'? 'b' : 's';
				this.handleTabsChange({index: this.tabs_current})
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
				this.handleTabsChange({index: this.tabs_list.length - 1})
			},
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
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				// console.log(this.tabs_current)
				const res = await this.$api.prefecture_list()
				// const res = await this.$api.getPanList()
				// console.log(res)
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.indexList = [...this.indexList, ...res.list]
					if(this.curP == res.total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
				this.skeletonLoading = false
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
						background: #1e1f31!important;
						&--circle {}
						&--square {}
					}
					&__content {
						&__rows,
						&__title {
							background: #1e1f31!important;
						}
					}
				}
			}
		}
		.white /deep/ {
			.u-skeleton {
				&__wrapper {
					&__avatar {
						background: #dcdcdc!important;
						&--circle {}
						&--square {}
					}
					&__content {
						&__rows,
						&__title {
							background: #dcdcdc!important;
						}
					}
				}
			}
		}
	}
</style>
<style lang="scss" scoped>
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
