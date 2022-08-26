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
					class="u-p-r-30 u-flex u-flex-items-center u-font-28 text-error"  
				>
					积分：{{allscore}}
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
				const res = await this.$api.my_score({
					params: { 
						p: this.curP,
						zt: this.tabs_list[this.tabs_current].zt
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
