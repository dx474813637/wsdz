<template>
	<view class="w">
		<view class="u-p-l-20 u-p-r-20 u-p-t-10 u-p-b-10 ">
			<view class="search-wrapper u-flex u-flex-items-center u-p-15 u-p-r-25 u-p-l-25 bg-white radius">
				<view class="item u-flex u-flex-items-center text-base u-p-r-20" @click="cateShow = true">
					<view class="u-font-28 u-p-r-10">{{cateList[cateCurrent].name}}</view>
					<i class="custom-icon-xiajiantou custom-icon u-font-24 text-light"></i>
				</view>
				<u-line direction="col" color="#ccc" length="40rpx"></u-line>
				<view class="item u-flex-1 u-p-r-10">
					<u-search 
						placeholder="搜索" 
						v-model="keyword"
						:showAction="false"
						clearabled
						bgColor="transparent"
						@search="handleSearch"
						@custom="handleSearch"
					></u-search>
				</view>
				<view class="item u-flex u-flex-items-center text-light" @click="handlwShowSearchMoreBox">
					<view class="u-font-28 u-p-r-10 u-flex u-flex-items-center" style="position: relative;">
						<u-transition
							:show="badgeShow" 
							:mode="badgeMode"
							>
							<u-badge
								type="primary"
								:value="badgeCount"
							>
							</u-badge>
						</u-transition>
						<text class="u-p-l-10" :class="{
							'text-primary': badgeShow
						}">筛选</text>
						
						
					</view>
					<i class="custom-icon-xiajiantou custom-icon u-font-24 text-light"></i>
				</view>
			</view>
		</view>
		<view class="u-p-80" v-if="searchLoading">
			<u-loading-icon
				:show="searchLoading"
				mode="circle"
				text="获取最新列表数据..."
			></u-loading-icon>
		</view>
		<view class="list" v-else>
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
						<view class="card u-flex bg-white " @click="handleGoto({url: '/pages/index/fangzhi/fangzhi_detail', params: {pid: item.pid}})">
							<view class="u-p-20">
								<u-image width="90px" height="90px" :src="item.pic_name1" radius="10"></u-image>
							</view>
							<view class="u-flex-1 u-p-20">
								<view class="u-line-1 u-m-b-15" style="font-weight: bold;">{{item.product1}}</view>
								<view style="height: 60px;overflow: hidden;">
									<view class="u-font-28 text-base u-line-1" v-if="item.peibi">{{item.peibi}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.product_cust">{{item.product_cust}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.shazhi">{{item.shazhi}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.yongtu">{{item.yongtu}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.zhiwuzuzhi">{{item.zhiwuzuzhi}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.midu">{{item.midu}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.liumiangy">{{item.liumiangy}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.kezhong">{{item.kezhong}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.fukuan">{{item.fukuan}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.chengshaxt">{{item.chengshaxt}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.fangshagy">{{item.fangshagy}}</view>
									<view class="u-font-28 text-base u-line-1" v-if="item.guxian">{{item.guxian}}</view>
								</view>
								
							</view>
						</view>
					</view>
					
				</u-list-item>
				
				<template name="dataStatus">
					<template v-if="indexList.length == 0">
						<u-empty
							mode="data"
							:icon="typeConfig.white.empty"
						>
						</u-empty>
					</template>
					<template v-else>
						<u-loadmore
							:status="loadstatus"
						/>
					</template>
				</template>
				<u-safe-bottom></u-safe-bottom>
			</u-list>
		</view>
		
		<menusPopupFangzhi
			:domain="cateList[this.cateCurrent].domain"
			:show="searchMoreShow"
			:menus="menus"
			@confirm="handleConfirmMenus"
			@close="searchMoreShow = false"
		></menusPopupFangzhi>
		
		<u-picker 
			:show="cateShow" 
			ref="uPicker"
			:columns="columns"
			closeOnClickOverlay
			@close="cateShow = false"
			@cancel="cateShow = false"
			@confirm="handleCateConfirm"
			></u-picker>
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
				searchMoreShow: false,
				cateCurrent: 0,
				cateShow: false,
				cateList: [],
				keyword: '',
				curP: 1,
				indexLoading: true,
				searchLoading: false,
				indexList: [],
				menus: [],
				search_attr: {},
				loadstatus: 'loadmore',
				shareJoin: false
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
			paramsObj() {
				let search_attr = {
					...this.search_attr
				};
				if(this.keyword) {
					search_attr.terms = this.keyword
				}
				search_attr = JSON.stringify(search_attr)
				// this.customShareParams.search_attr = encodeURIComponent(search_attr)
				return {
					domain: this.cateList[this.cateCurrent]?.domain,
					search_attr,
					p: this.curP,
				}
			},
			columns() {
				if(!this.cateList || this.cateList.length == 0) return [[]]
				return [
					this.cateList.map(ele => ele.name)
				]
			},
			badgeCount() {
				return Object.values(this.search_attr).join(',').split(',').length
			},
			badgeShow() {
				return Object.values(this.search_attr).length > 0
			},
			badgeMode() {
				if(Object.values(this.search_attr).length == 0) {
					return 'fade-down'
				}
				return 'fade-up'
			}
		},
		watch: {
			async cateCurrent(n) {
				// this.customShareParams.current = n
				await this.handleSearch()
				this.initSearchMenus()
				if(this.shareJoin) this.shareJoin = false
			},
			
		},
		async onLoad(options) {
			console.log(options)
			await this.getIndex()
			if(options.hasOwnProperty('search_attr')) {
				let data = JSON.parse(decodeURIComponent(options.search_attr))
				console.log(data)
				if(data.hasOwnProperty('terms')) {
					this.keyword = data.terms
					delete data.terms
				}
				this.search_attr = data
			}
			if(options.hasOwnProperty('current')) {
				this.shareJoin = true
				this.cateCurrent = options.current
			}else {
				this.initSearchMenus()
				await this.handleSearch()
			}
			
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handlwShowSearchMoreBox() {
				if(this.searchLoading) return
				this.searchMoreShow = true
			},
			handleConfirmMenus(data) {
				uni.showLoading()
				this.searchMoreShow = false
				this.search_attr = {};
				data.list.forEach(ele => {
					let key = ele.field
					let str = ele.list.filter(item => item.active).map(item => item.name).join(',')
					if(str) {
						this.$set(this.search_attr, key, str)
					}
				})
				this.handleSearch()
			},
			initSearchMenus() {
				let menus = uni.$u.deepClone(this.cateList[this.cateCurrent].list)
				let keys = Object.keys(this.search_attr)
				if(keys.length > 0) {
					menus.forEach(ele => {
						let i = keys.indexOf(ele.domain)
						if(i != -1 ) {
							let values = this.search_attr[keys[i]].split(',')
							ele.list.forEach(item => {
								if(values.includes(item.name) ) {
									item.active = true
								}
							})
						}
						
					})
				}
				if(!this.shareJoin) this.search_attr = {}
				
				this.menus = menus
			},
			async getIndex() {
				this.indexLoading = true
				const res = await this.$api.texnetIndex()
				this.indexLoading = false
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.cateList = res.list
				}
			},
			handleCateConfirm(e) {
				console.log(e)
				this.search_attr = {}
				this.keyword = ''
				this.cateCurrent = e.indexs[0]
				this.cateShow = false
				
			},
			scrolltolower() {
				if(this.loadstatus == 'loading') return;
				this.curP ++
				this.getData()
			},
			async handleSearch(v = this.keyword) {
				v = v.trim()
				this.keyword = v
				if(this.searchLoading) {
					uni.showToast({
						title: '请等待搜索反馈',
						icon: 'none'
					})
					return
				}
				
				
				this.searchLoading = true
				this.curP = 1
				this.indexList = []
				await this.getData()
				this.$nextTick(() => {
					this.searchLoading = false
				})
			},
			async getData() {
				if(this.loadstatus == 'loading') return;
				this.loadstatus = 'loading'
				const res = await this.$api.texnetSearch(this.paramsObj)
				
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.indexList = [...this.indexList, ...res.list];
					if(this.indexList.length >= res.total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
		height: 100vh;
	}
</style>

<style lang="scss" scoped>
	.card {
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
	.radius {
		border-radius: 6px;
	}
	.w {
		height: 100%;
	}
	.list {
		box-sizing: border-box;
		border-top: 1rpx solid #eee;
		height: calc(100% - 108px);
	}
</style>
