<template>
	<view class="w"> 
		<view class=" search-wrapper u-flex u-flex-items-center u-p-l-20 u-p-r-20 u-p-b-10">
			<view class="item u-m-r-10" style="flex: 0 0 35%" @click="show = true">
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
			<view class="item u-flex-1  u-flex u-flex-items-center">
				
				<view class="u-p-r-10 u-flex-1">
					<u--input 
						v-model="keyword"
						placeholder="名称" 
						clearable
						:customStyle="{backgroundColor: '#fff'}"
					></u--input>
				</view>
				<view class="u-p-r-10">
					<u-button type="primary" icon="search"  @click="handleSearch" :customStyle="{width: '35px', height: '35px', borderRadius: '14rpx'}" ></u-button>
				</view>
				
				<u-button type="warning" icon="trash" @click="resetSearch" :customStyle="{width: '35px', height: '35px', borderRadius: '14rpx'}" ></u-button>
			</view>
			
		</view>
		<view class="tabs-w u-p-l-10 u-p-r-10" v-if="pan == 's'">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			>
			</u-tabs>
		</view>
		
		<view class="list u-p-l-20 u-p-r-20" :style="{
			height: pan == 's'? 'calc(100% - 146px - env(safe-area-inset-bottom))' : 'calc(100% - 102px - env(safe-area-inset-bottom))'
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
					<view class="u-p-10">
						<BrokerCard
							:pid="item.id"
							:name="item.name"
							:sub="item.spec"
							:status="item.state"
							:type="item.trade_type"
							:date="item.post_time"
							:price="item.price"
							:dprice="item.dprice"
							:unit="item.unit"
							:origin="item"
							@changeStatus="handleChangeStatus"
							@delet="handleDelet"
							@resubmit="handleResubmit"
							@detail="handleProdDetail"
							@front="handleProdFront"
							@showPop="handleShowPop"
						></BrokerCard>
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
		<tabBar :customStyle="{
			'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
		}">
			<view class=" u-flex u-flex-items-center u-flex-around u-p-20">
				<view class="item u-m-r-10 u-flex-1" @click="sendPan">
					<u-button type="primary" icon="plus-circle">发布{{pan == 's'? '卖盘' :'买盘'}}</u-button>
				</view>
				<view class="item u-m-l-10 u-flex-1" @click="setShareList">
					<u-button type="primary" plain icon="order">生成{{pan == 's'? '卖盘' :'买盘'}}清单</u-button>
				</view>
			</view>
		</tabBar>
		<menusPopup 
			:show="show" 
			theme="white"
			:isMyProduct="true"
			:pan="pan"
			showMode="list"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopup>
		
		<!-- pop列表 -->
		<u-popup 
			:show="popshow" 
			@close="popshow = false" 
			mode="bottom" 
			bgColor="transparent"
		>
			<view class="u-p-20 jp-wrap" >
				<view style="border-radius: 10px;overflow: hidden;">
					<view
						class="u-text-center u-p-20 u-font-28"
						:style="{
							color: themeConfig.tabText, 
							backgroundColor: themeConfig.pan.pageBg,
						}"
						>{{poptitle}}</view>
					<scroll-view class="jp-content u-p-20"
						:style="{
							height: '400px',
							color: themeConfig.tabText,
							backgroundColor: themeConfig.pan.pageBg,
						}"
						scroll-y
					> 
						<view class="u-p-10" v-for="(item, index) in popList" :key="index">
							
							<jpCard 
								v-if="showPopType == 'jp'"
								theme="white" 
								:item="item"  
								:unit="poporigin.Sell.unit"
								:pw_curr_page="poporigin.pw_curr_page"
								></jpCard>
							<yyCard 
								v-else-if="showPopType == 'yy'"
								theme="white" 
								:item="item"  
								></yyCard>
						</view>
						<template v-if="popList.length == 0">
							<u-empty
								mode="data"
								:icon="themeConfig.empty"
							>
							</u-empty>
						</template> 
					</scroll-view>
				</view>
				
			</view>
			
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import BrokerCard from '@/pages/my/components/BrokerCard/BrokerCard.vue'
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
				showPopType: '',
				showPopId: '',
				popList: [],
				poploading: false,
				popshow: false,
				poporigin: {},
				popsourceData: {},
				tabs_list: [
					{
						name: '全部',
						value: '',
						disabled: false,
					},
					{
						name: '议价交易',
						value: '0',
						disabled: false,
					},
					{
						name: '竞拍交易',
						value: '1',
						disabled: false,
					},
					{
						name: '一口价交易',
						value: '2',
						disabled: false,
					},
				],
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			if(options.hasOwnProperty('trade_mode')) {
				this.tabs_current = +this.tabs_list.findIndex(ele => ele.value === options.trade_mode)
			}
			uni.setNavigationBarTitle({
				title: this.pan == 's'? '我的卖盘': '我的买盘'
			})
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				login: state => state.user.login,
				auth: state => state.user.auth,
				myCpy: state => state.user.myCpy,
			}),
			...mapState({
				typeActive: state => state.theme.typeActive, 
			}),
			themeConfig() {
				return this.typeConfig.white
			},
			paramsObj() {
				if(this.keyword || this.product_id) {
					return {
						p: this.curP,
						login: this.login,
						terms: this.keyword,
						product_id: this.product_id,
						trade_mode: this.tabs_list[this.tabs_current].value
					}
				}
				return {
					p: this.curP,
					trade_mode: this.tabs_list[this.tabs_current].value
				}
			}, 
			bidConfig() {
				if(this.showPopType == 'jp') {
					return {
						apiName: 'list_sell_bid',
						params: {
							id: this.showPopId,
							p: 1
						}
					}
				}
				if(this.showPopType == 'yy') {
					return {
						apiName: 'bid_subscribe_list_subscribe',
						params: {
							source_id: this.showPopId,
							source: 'SELL',
							p: 1
						}
					}
				}
				return {
					
				}
			},
			poptitle() {
				return `${this.popsourceData.name} - ${this.showPopType == 'jp' ? '竞拍列表' : '预约列表'}`
			},
			
		},
		components: {
			BrokerCard
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				myCompany: 'user/myCompany'
			}),
			async handleShowPop({type, data}) {
				this.showPopType = type
				this.showPopId = data.id
				this.popsourceData = data
				uni.showLoading({
					title: '获取数据中...',
					mask: true,
				})
				await this.getPopData()
				this.popshow = true
			},
			async getPopData() { 
				this.poploading = true;
				const res = await this.$api[this.bidConfig.apiName]({params: this.bidConfig.params})
				if(res.code == 1) {
					this.popList = this.showPopType == 'yy' ? res.list : res.list.list
					this.poporigin = res.list
				}
			},
			async setShareList() {
				if(!this.myCpy.id) {
					uni.showLoading()
					await this.myCompany()
					if(!this.myCpy.id) return
				}
				
				this.handleGoto({
					url: '/pages/index/pan/panShare',
					params: {
						pan: this.pan,
						id: this.myCpy.id,
						// auth: this.auth,
						// contact: this.myCpy.contact,
						// name: this.myCpy.name,
						// mobile: this.myCpy.mobile,
					}
				})
			},
			async menusConfirm(data) {
				console.log(data)
				this.product = data.name
				this.product_id = data.id
				
				this.show = false;
			},
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			async handleSearch() {
				if(!this.keyword && !this.product_id) return
				uni.showLoading()
				this.initParamas() 
				await this.getData()
			},
			resetSearch() {
				this.keyword = "";
				this.product_id = "";
				this.product = '';
				uni.showLoading()
				this.refreshList()
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			}, 
			async handleTabsChange(value) {
				this.tabs_current = value.index
				this.changeTabsStatus('disabled', true)
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			},
			scrolltolower() {
				this.getMoreData()
			},
			async sendPan() {
				if(this.myCpy.state == '2') {
					uni.showToast({
						title: '当前用户信息被平台灭活',
						icon: 'none'
					})
					return
				}
				this.handleGoto({url: '/pages/my/broker/edit', params:{pan: this.pan}})
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api[this.pan == 's'? 'mySell': 'myBuy']({
					params: this.paramsObj
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
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
				 
				
			},
			async handleChangeStatus({state, id}) {
				const res = await this.$api[this.pan == 's'? 'ableSell' : 'ableBuy']({params: {id, state}}) 
				if(res.code == 1) {
					const index = this.indexList.findIndex(ele => ele.id == id)
					let yuan = this.indexList[index].state
					this.indexList[index].state = state
					if(res.acode == 2) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						this.$nextTick(() => {
							this.indexList[index].state = yuan
						})
						
					}
				}
			},
			async handleResubmit({data}) {
				uni.showLoading()
				
				let func = ''
				if(this.pan == 's') {
					func = 'createSell'
				}else {
					func = 'createBuy'
				}
				let params = {...data};
				const r = await this.$api[func](params)
				if(r.code == 1) {
					uni.showLoading()
					this.refreshList()
				}
			},
			async handleDelet({id}) {
				const res = await this.$api[this.pan == 's'? 'deleteSell' : 'deleteBuy']({params: {id}})
				if(res.code == 1) {
					uni.showToast({
						title: '删除成功'
					})
					const index = this.indexList.findIndex(ele => ele.id == id)
					this.indexList.splice(index, 1)
				}
				
				
			},
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
	.jp-wrap {  
		box-sizing: border-box;
	}
	.jp-content { 
		width: 100%;
		box-sizing: border-box; 
	}
	.w {
		height: 100vh;
	}
	.list {
		height: calc(100% - 146px - env(safe-area-inset-bottom));
		
	}
</style>
