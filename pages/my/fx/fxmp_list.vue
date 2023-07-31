<template>
	<view class="w">
		<view class="search-wrapper u-flex u-p-l-20 u-p-r-20">
			<view class="item u-flex-1 u-p-b-10" @click="show = true">
				<u-input 
					placeholder="请选择" 
					v-model="pid_name" 
					:showAction="false"
					readonly
					bgColor="#fff" 
					suffixIcon="arrow-down-fill"
					suffixIconStyle="color: #909399"
				>
				</u-input>
			</view>
			
		</view>
		<view class="tabs-w">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			> </u-tabs>
		</view>
		
		<view class="list">
			<u-list
				height="100%"
				enableBackToTop
				@scrolltolower="scrolltolower"
				:preLoadingScreen="100"
			>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="item"
				>
					<view class="u-p-10 u-p-l-20 u-p-r-20">
						<FxmpCard
							:detailData="item" 
							@detail="handleDetail"
							@delete="handleDelet"
						></FxmpCard>
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
		<menusPopupStandard
			:show="show"
			theme="white"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopupStandard>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import FxmpCard from '@/pages/my/components/FxmpCard/FxmpCard.vue'
	import menusPopupStandard from '@/components/menusPopup/menusPopupStandard.vue'
	export default {
		data() {
			return {
				show: false,
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
						value: '',
						disabled: false,
					}, 
				],
				indexList: [],
				curP: 1,
				pid: '',
				pid_name: '',
				loadstatus: 'loadmore'
			};
		},
		async onLoad(opt) {
			if(opt.hasOwnProperty('pid')) {
				this.pid = opt.pid 
				this.initNameByPid()
			} 
			uni.showLoading()
			await this.getData()
		},
		computed: {
			...mapState({ 
				fxStandard: state => state.user.fxStandard, 
				typeConfig: state => state.theme.typeConfig,
			}),
		},
		components: {
			FxmpCard,
			menusPopupStandard
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({ 
				getFxStandard: 'user/getFxStandard', 
			}), 
			async initNameByPid() {
				if(this.fxStandard.length == 0) {
					uni.showLoading()
					await this.getFxStandard() 
				}
				this.pid_name = this.fxStandard.filter(ele => ele.pid == this.pid)[0].name 
			},
			async refreshList() {
				this.initParamas()
				await this.getData()
			},
			async menusConfirm(data) {
				console.log(data)
				this.pid_name = data.name
				this.pid = data.pid  
				this.show = false;
				uni.showLoading()
				this.refreshList()
			}, 
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			handleSearch(v) {
				this.refreshList()
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(value) {
				// this.pid = ''
				// this.pid_name = ''
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
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.fx_sell_list({params:{ 
					p: this.curP,
					pid: this.pid, 
				}})
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.list.list ]
					if(this.indexList.length >= +res.list.total ) {
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
			
			async handleDelet({id}) {
				uni.showLoading()
				const res = await this.$api.fx_sell_del({
					params: {  
						id
					}
				})
				if(res.code == 1) {
					uni.showToast({
						title: '删除成功'
					})
					const index = this.indexList.findIndex(ele => ele.id == id)
					this.indexList.splice(index, 1)
				}
				
				
			},
			handleDetail(data) {
				
				this.handleGoto({
					url: '/pages/index/pan/panDetail',
					params: {
						id: data.id, 
						pan:'s',
					}
				}) 
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
		height: calc(100% - 83px);
		
	}
</style>
