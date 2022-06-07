<template>
	<view class="text-white w " :style="{
		backgroundColor: themeConfig.pageBg
	}">
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar :title="`${onlineControl.title? onlineControl.title :pageConfig[pan].navtitle}`" ></navBar>
			<view @click="handleGoto({url: '/pages/index/search/search', params: {pan: pan}})" class="search-w u-p-l-20 u-p-r-20 u-p-b-10 u-p-t-10" >
				<u-search 
					placeholder="搜索商品" 
					:value="keyword"
					:showAction="false"
					disabled
					:bgColor="themeConfig.pageBg"
				></u-search>
			</view>
			<view class="tabs-w">
				<u-tabs
					:list="tabs_list"
					:current="tabs_current"
					lineHeight="0"
					:activeStyle="{...activeTabsStyle, color: themeConfig.tabTextActive}"
					:inactiveStyle="{ color: themeConfig.tabTextInactive}"
					:itemStyle="itemTabsStyle"
					@change="handleTabsChange"
				>
					<view
						slot="right"
						class="u-p-r-20 u-flex u-flex-items-center"
						:style="{
							color: themeConfig.baseText
						}"
						@click="show = true"
					>
						<i class="custom-icon-filter2 custom-icon"></i>
						<text class="u-p-l-8 u-font-30">分类筛选</text>
					</view>
				</u-tabs>
			</view>
		</view>
		<view class="list" :style="{
			height: `calc(100% - 182px - ${sys.statusBarHeight}px - ${sys.safeAreaInsets.bottom}px)`
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
		
		<menusPopup 
			:show="show" 
			:theme="typeActive"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopup>
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
				pan: 's',
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
				tabs_list: [
					{
						name: '全部商品',
						standard: '',
						keyword: '',
						disabled: false,
					},
				],
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
				return {
					standard: this.tabs_list[this.tabs_current].standard,
					terms: this.tabs_list[this.tabs_current].keyword,
					p: this.curP,
				}
			}
		},
		onLoad(options) {
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			if(options.hasOwnProperty('keyword')) {
				// this.keyword = options.keyword
				this.menusConfirm({keyword: options.keyword, name: `搜索${options.keyword}结果`})
			}
			else if(options.hasOwnProperty('data')) {
				const data = JSON.parse(options.data)
			console.log(data)
				this.menusConfirm({
					name: data.name,
					standard: data.id,
					keyword: data.keyword || "",
					disabled: false,
				})
			}
			else {
				uni.showLoading()
				this.getData()
			}
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async menusConfirm(data) {
				console.log(data)
				// uni.showToast({
				// 	title: `点击了：${data.name}项`,
				// 	icon: 'none'
				// })
				// this.keyword = ""
				this.tabs_list.push({
					name: data.name,
					standard: data.id,
					keyword: data.keyword || "",
					disabled: false,
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
				console.log(this.tabs_current)
				const res = await this.$api[this.pan == 's'?'getSell':'getBuy']({params: this.paramsObj})
				// const res = await this.$api.getPanList()
				console.log(res)
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.indexList = [...this.indexList, ...res.list]
					if(this.curP == res.total) {
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
	.list {
		height: calc(100% - 182px - env(safe-area-inset-bottom));
		
	}
</style>
