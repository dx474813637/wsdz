<template>
	<view class="w"> 
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
						<view class="bg-white u-radius-10 u-p-10" @click.stop="add('edit', item)">
							<view class="u-p-10 u-m-b-14 u-border-bottom u-flex u-flex-items-center u-flex-between u-p-l-25 u-p-r-25">
								<view class="item">
									{{item.Standard.name}}
								</view>
								<view class="item" > 
									{{item.type | tradeM2str}}
								</view>
							</view>
							<view class="u-p-10 u-flex u-flex-items-center u-flex-between u-p-l-25 u-p-r-25">
								<view class="item u-font-28 text-base">
									<text >警戒系数：{{item.alert}}%</text>
								</view>
								<view class="item text-base u-font-28" v-if="item.type == 'price' && item.price">
									初始价格：{{item.price}}
								</view>
							</view>
							<view class="u-p-10 u-flex u-flex-items-center u-flex-between u-p-l-25 u-p-r-25">
								<view class="item u-font-28 text-base">
									<text >{{item.sdate}} 至 {{item.edate}}</text>
								</view>
							</view>
							<view class="u-p-10 u-m-t-14 u-border-top u-flex u-flex-items-center u-flex-between u-p-l-25 u-p-r-25">
								<view class="item"></view>
								<view class="item" @click.stop="deleteC(item)"> 
									<u-button type="warning" size="mini" plain text="删除" shape="circle" throttleTime="600"></u-button>
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
		<tabBar :customStyle="{
			'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
		}">
			<view class=" u-flex u-flex-items-center u-flex-around u-p-20">
				<view class="item u-m-r-10 u-flex-1" >
					<u-button type="primary" icon="plus-circle" @click="add('add')">添加行情监测</u-button>
				</view>
			</view>
		</tabBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import BillCard from '@/pages/my/components/BillCard/BillCard.vue'
	export default {
		data() {
			return {
				keyword: '',
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '34rpx',
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				tabs_list: [
					{
						name: '全部',
						disabled: false,
						zt: '0'
					},
					{
						name: '获取记录',
						disabled: false,
						zt: '1'
					},
					{
						name: '使用记录',
						disabled: false,
						zt: '2'
					},
				], 
				indexList: [],
				allscore: 0,
				curP: 1,
				loadstatus: 'loadmore'
			};
		}, 
		onLoad(options) {
			if(options.hasOwnProperty('current')) {
				this.tabs_current = Number(options.current)
			}  
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}), 
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
			handleSearch(v) {
				this.initParamas();
				uni.showLoading();
				this.getData()
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
				this.keyword = ''
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			},
			async subsectionChange(index) { 
				this.changeTabsStatus('disabled', true)
				this.mode_current = index
				this.keyword = ''
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
				const res = await this.$api.trade_monitor_query_trade_monitor({
					params: { 
						p: this.curP, 
					},
				})
				if(res.code == 1) {
					this.allscore = res.score
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
			add(type, item) {
				uni.navigateTo({
					url: `/pages/my/trade_monitor/trade_monitor_detail?type=${type}&data=${encodeURIComponent(JSON.stringify(item))}`
				})
			},
			async deleteC(data) {
				uni.showLoading()
				const res = await this.$api.trade_monitor_delete_trade_monitor({
					params: { 
						id: data.id, 
					},
				})
				if(res.code == 1) {  
					this.indexList.splice( this.indexList.findIndex(ele => ele.id == data.id), 1)
					uni.showToast({
						title: res.msg,
					})
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
	.w {
		height: 100%;
	}
	.list {
		height: calc(100% - 60px - env(safe-area-inset-bottom));
		
	}
</style>
