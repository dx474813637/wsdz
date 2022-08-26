<template>
	<view class="w"> 
		<view class="tabs-w">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			>
				<view
					slot="right"
					class="u-p-r-30 text-base"  
				>
					<view class="u-flex u-flex-items-center u-font-28" style="position: relative;" @click="showMduFilter = true">
						<i class="custom-icon-filter2 custom-icon"></i>
						<text class="u-m-l-10">筛选</text>
						<u-badge isDot absolute :offset="[0, -5]"></u-badge>
					</view>
					
				</view>
			</u-tabs>
		</view>
		
		<view class="list" >
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
					<view class="u-p-10 u-p-l-20 u-p-r-20"> 
						<view class="bg-white u-radius-10 u-p-10">
							<view class="u-p-10 u-border-bottom u-flex u-flex-items-center u-flex-between u-p-l-25 u-p-r-25">
								<view class="item">
									{{item.msg}}
								</view>
								<view class="item" :class="{
									'text-primary': item.zt == 1,
									'text-error': item.zt == 2,
								}"> 
									{{item.score}}
								</view>
							</view>
							<view class="u-p-10 u-flex u-flex-items-center u-flex-between u-p-l-25 u-p-r-25">
								<view class="item u-font-28 text-base">
									<text v-if="item.login">{{item.login}}</text>
								</view>
								<view class="item text-base u-font-28">
									{{item.uptime}}
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
				
			</u-list>
		</view>
		
		<menusPopupMDU
			theme="white"
			:show="showMduFilter"
			:formData="formData"
			@close="showMduFilter = false"
			@confirm="menusFilterConfirm"
			@showPopup="handleShowPopup"
			></menusPopupMDU>
			
		<menusPopup 
			theme="white"
			:show="showProd" 
			:isMyProduct="true" 
			showMode="list"
			:overlayStyle="{zIndex: '10075'}"
			@close="showProd = false"
			@confirm="menusProdConfirm"
			></menusPopup>
		
		<menusPopup 
			theme="white"
			:show="showCpy" 
			:isMyAllCpy="true"
			showMode="list"
			:overlayStyle="{zIndex: '10075'}"
			zIndex="10076"
			@close="showCpy = false"
			@confirm="menusCpyConfirm"
			></menusPopup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import BillCard from '@/pages/my/components/BillCard/BillCard.vue'
	export default {
		data() {
			return {
				isBroker: 1, //是否为broker 1是 0否 
				keyword: '',
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '34rpx',
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 8px'
				},
				tabs_list: [
					{
						name: '全部',
						disabled: false,
						mdu: ''
					},
					{
						name: '生产商',
						disabled: false,
						mdu: 'M'
					},
					{
						name: '经销商',
						disabled: false,
						mdu: 'D'
					},
					{
						name: '下游用户',
						disabled: false,
						mdu: 'U'
					},
				], 
				indexList: [],
				allscore: 0,
				curP: 1,
				loadstatus: 'loadmore',
				showMduFilter: false,
				showProd: false,
				showCpy: false,
				lastFilters: {},
				formData: {
					mdu: '',
					customer_login: '',
					customer_name: '',
					pid: '',
					pid_name: '',
					state: '',
				},
			};
		}, 
		onLoad(options) {
			if(options.hasOwnProperty('current')) {
				this.tabs_current = Number(options.current)
			} 
			if(options.hasOwnProperty('isTrader')) {
				this.isTrader = Number(options.isTrader)
			} 
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				myCpy: state => state.user.myCpy, 
				login: state => state.user.login, 
			}), 
			params() {
				return { 
					p: this.curP,
					mdu: this.formData.mdu,
					customer_login: this.formData.customer_login,
					pid: this.formData.pid,
					state: this.formData.state,
				}
			},
			func() {
				return this.isBroker == 1 ? 'customer_mdu_list_mdu_broker' : 'customer_mdu_list_mdu'
			},
		}, 
		components: {
			BillCard
		},
		methods: {
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			}, 
			async menusFilterConfirm(data) {
				console.log(data) 
				this.showMduFilter = false
			},
			async menusProdConfirm(data) {
				console.log(data) 
				this.formData.pid = data.id
				this.formData.pid_name = data.name
				this.showProd = false
			},
			async menusCpyConfirm(data) {
				console.log(data) 
				// this.formData.customer_login = data.
				this.showCpy = false
			},
			handleShowPopup(type) {
				if(type == 'prod') {
					this.showProd = true
				}
				else if(type == 'cpy') {
					this.showCpy = true
				}
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(value) {
				this.changeTabsStatus('disabled', true)
				this.tabs_current = value.index 
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
				const res = await this.$api[this.func]({
					params: this.params
				})
				if(res.code == 1) { 
					this.indexList = [...this.indexList, ...res.list]
					if(this.indexList.length >= res.total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
					if(this.curP == 1) {
						this.setFilterParams()
					}
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},  
			setFilterParams() {
				let {mdu, customer_login, pid, state} = this.params 
				this.lastFilters = this.params
				if(!mdu && !customer_login && !pid && !uni.$u.test.number(state)) return
				//有效筛选，加入历史记录
				
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
	.w {
		height: 100%;
	}
	.list {
		height: calc(100% - 44px);
		
	}
</style>
