<template>
	<view class="w">
		<!-- <view class="search-wrapper u-p-l-20 u-p-r-20">
			<view class="item u-p-b-10" @click="show = true">
				<u-input
					:value="product"
					placeholder="点击选择商品" 
					readonly
				>
					<template slot="suffix">
						<view class="">
							<i class="custom-icon-unfold custom-icon"></i>
						</view>	
					</template>
				</u-input>
			</view>
			<view class="item u-flex-1 u-p-b-10 u-flex u-flex-items-center">
				
				<view class="u-p-r-10 u-flex-1">
					<u--input 
						v-model="keyword"
						placeholder="名称" 
						clearable
						:customStyle="{backgroundColor: '#fff'}"
					></u--input>
				</view>
				<view class="u-p-r-10">
					<u-button type="primary"  @click="handleSearch" :customStyle="{width: '80px', height: '35px', borderRadius: '14rpx'}" >搜索</u-button>
				</view>
				
				<u-button type="warning" icon="reload" @click="resetSearch" :customStyle="{width: '80px', height: '35px', borderRadius: '14rpx'}" >重置</u-button>
			</view>
			
		</view> -->
		
		<view class="list u-p-l-20 u-p-r-20">
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
					<view class="u-p-10">
						<CustomPanCard
							simple
							:pid="item.id"
							:name="item.name"
							:sub="item.remark || item.spec"
							:status="item.state"
							:type="item.trade_type"
							:date="item.post_time"
							:price="item.price"
							:dprice="item.dprice"
							:unit="item.unit"
							:origin="item" 
							@front="handleProdFront"
						></CustomPanCard>
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
		<!-- <tabBar :customStyle="{
			'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
		}">
			<view class=" u-flex u-flex-items-center u-flex-around u-p-20">
				<view class="item u-m-r-10 u-flex-1" @click="handleGoto({url: '/pages/my/broker/edit', params:{pan: pan}})">
					<u-button type="primary" icon="plus-circle">发布{{pan == 's'? '卖盘' :'买盘'}}</u-button>
				</view>
				<view class="item u-m-l-10 u-flex-1" @click="setShareList">
					<u-button type="primary" plain icon="order">生成{{pan == 's'? '卖盘' :'买盘'}}清单</u-button>
				</view>
			</view>
		</tabBar> -->
		<menusPopup 
			:show="show" 
			theme="white"
			:isMyProduct="true"
			:pan="pan"
			showMode="list"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import CustomPanCard from '@/pages/my/components/CustomPanCard/CustomPanCard.vue'
	export default {
		data() {
			return {
				show: false,
				keyword: '',
				product: "",
				product_id: "",
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				pan: 's',
				login: '',
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			if(options.hasOwnProperty('login')) {
				this.login = options.login
			}else {
				uni.navigateBack({
					success() {
						uni.showToast({
							title: 'login参数有误',
							icon: 'none'
						})
					}
				})
				
				return
			}
			uni.setNavigationBarTitle({
				title: this.pan == 's'? `客户(${this.login})的卖盘`: `客户(${this.login})的买盘`
			})
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				// myCpy: state => state.user.myCpy,
			}),
		},
		components: {
			CustomPanCard
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				myCompany: 'user/myCompany'
			}),
			// async setShareList() {
			// 	if(!this.myCpy.id) {
			// 		uni.showLoading()
			// 		await this.myCompany()
			// 		if(!this.myCpy.id) return
			// 	}
				
			// 	this.handleGoto({
			// 		url: '/pages/index/pan/panShare',
			// 		params: {
			// 			pan: this.pan,
			// 			id: this.myCpy.id,
			// 			// auth: this.auth,
			// 			// contact: this.myCpy.contact,
			// 			// name: this.myCpy.name,
			// 			// mobile: this.myCpy.mobile,
			// 		}
			// 	})
			// },
			// async menusConfirm(data) {
			// 	console.log(data)
			// 	this.product = data.name
			// 	this.product_id = data.id
				
			// 	this.show = false;
			// },
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			// async handleSearch() {
			// 	if(!this.keyword && !this.product_id) return
			// 	uni.showLoading()
			// 	this.initParamas() 
			// 	await this.getSearchData()
			// },
			// resetSearch() {
			// 	this.keyword = "";
			// 	this.product_id = "";
			// 	this.product = '';
			// 	uni.showLoading()
			// 	this.refreshList()
			// },
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(value) {
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
				const res = await this.$api[this.pan == 's'? 'customerSell': 'customerBuy']({
					params: {
						login: this.login,
						p: this.curP,
					}
				})
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.list]
					if(this.indexList.length >= res.total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			},
			// async getSearchData() {
			// 	if(this.loadstatus != 'loadmore') return
			// 	this.loadstatus = 'loading'
			// 	const res = await this.$api[this.pan == 's'? 'customerSell' : 'customerBuy']({
			// 		params: {
			// 			login: this.login,
			// 			p: this.curP,
			// 			terms: this.keyword,
			// 			product_id: this.product_id
			// 		}
			// 	})
			// 	if(res.code == 1) {
			// 		this.indexList = [...this.indexList, ...res.list]
			// 		if(this.indexList.length >= res.total) {
			// 			this.loadstatus = 'nomore'
			// 		}else {
			// 			this.loadstatus = 'loadmore'
			// 		}
			// 	}
			// },
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				if(this.keyword || this.product_id) {
					await this.getSearchData()
				}else {
					await this.getData()
				}
				
			},
			async handleChangeStatus({state, id}) {
				const res = await this.$api[this.pan == 's'? 'ableSell' : 'ableBuy']({params: {id, state}})
				if(res.code == 1) {
					const index = this.indexList.findIndex(ele => ele.id == id)
					this.indexList[index].state = state
					
				}
			},
			handleResubmit({id}) {
				
			},
			// async handleDelet({id}) {
			// 	const res = await this.$api[this.pan == 's'? 'deleteSell' : 'deleteBuy']({params: {id}})
			// 	if(res.code == 1) {
			// 		uni.showToast({
			// 			title: '删除成功'
			// 		})
			// 		const index = this.indexList.findIndex(ele => ele.id == id)
			// 		this.indexList.splice(index, 1)
			// 	}
				
				
			// },
			handleProdFront({id}) {
				this.handleGoto({
					url: '/pages/index/pan/panDetail',
					params: {
						id,
						pan: this.pan,
					}
				})
			},
			handleProdDetail({pid, data}) {
				this.handleGoto({
					url: '/pages/my/broker/edit',
					params: {
						pid: pid,
						pan: this.pan,
						data: encodeURIComponent(JSON.stringify(data)),
					}
				})
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
		height: 100vh;
	}
	.list {
		// height: calc(100% - 146px - env(safe-area-inset-bottom));
		height: 100%;
	}
</style>
