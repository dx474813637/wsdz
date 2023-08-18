<template>
	<view class="w u-p-l-20 u-p-r-20"> 
		<view class="bg-white u-radius-18">
			<view class="tabs-w u-flex u-flex-items-center u-flex-between">
				<view class="item u-flex-1" @click="handleGoto({url: '/pages/my/fx/fxgx_add', type: 'redirect'})">分销联盟</view>
				<view class="item bg-white text-primary u-flex-1">我的分销</view>
			</view>
			
			<view class="list u-p-20"> 
				<view
					v-for="(item, index) in indexList"
					:key="item"
				>
					<view class="u-m-b-20">
						<FxgxCard
							:detailData="item" 
							@detail="handleDetail"
							@delete="handleDelet"
						></FxgxCard>
					</view>
					
				</view>
				
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
			</view>
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
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import FxgxCard from '@/pages/my/components/FxgxCard/FxgxCard.vue'
	import menusPopupStandard from '@/components/menusPopup/menusPopupStandard.vue'
	export default {
		data() {
			return {
				keyword: '',
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
						trade_type: 'bs',
						disabled: false,
					},
					// {
					// 	name: '买盘',
					// 	trade_type: 'b',
					// 	disabled: false,
					// },
					// {
					// 	name: '卖盘',
					// 	trade_type: 's',
					// 	disabled: false,
					// },
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore'
			};
		},
		async onLoad() {
			uni.showLoading()
			await this.getData()
		},
		onReachBottom() {
			this.scrolltolower()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
		},
		components: {
			FxgxCard,
			menusPopupStandard
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async refreshList() {
				this.initParamas()
				await this.getData()
			},
			async menusConfirm(data) {
				console.log(data)
				 
				this.show = false;
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
				this.keyword = ''
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
				const res = await this.$api.fxgx_list({params:{
					p: this.curP,
					terms: this.keyword 
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
				const res = await this.$api.fxgx_del({
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
					url: '/pages/my/fx/fxgx',
					params: {
						id: data.id, 
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
	.tabs-w {
		background-color: #eaf2ff;
		border-radius: 10px 10px 0 0;
		color: #333;
		overflow: hidden;
		font-weight: bold;
		.item { 
			line-height: 45px;
			text-align: center; 
		}
	}
	.w {
		height: 100%;
		padding-top: 140px; 
		background-image: url('https://wx.rawmex.cn/Public/2023fenxiao/003.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	.list {
		height: calc(100% - 83px);
		
	}
</style>
