<template>
	<view class="w u-p-l-20 u-p-r-20"> 
		<view class="bg-white u-radius-18 u-p-t-15" >
			<view class="search-wrapper u-flex u-p-20">
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
			
			<view class="list u-p-20"> 
				<view
					v-for="(item, index) in indexList"
					:key="item"
				>
					<view class="u-m-b-20">
						<FxjlCard
							:detailData="item" 
							@detail="handleDetail"
						></FxjlCard>
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
		<menusPopupMyStandard
			:show="show"
			theme="white"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopupMyStandard>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import FxjlCard from '@/pages/my/components/FxjlCard/FxjlCard.vue'
	import menusPopupMyStandard from '@/components/menusPopup/menusPopupMyStandard.vue'
	export default {
		data() {
			return {
				pid: '',
				pid_name: '',
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
				indexList: [],
				curP: 1,
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
			FxjlCard,
			menusPopupMyStandard
		},
		onReachBottom() {
			this.scrolltolower()
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
				this.pid = ''
				this.pid_name = ''
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
				const res = await this.$api.fx_sell_suc({params:{ 
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
				const res = await this.$api.all_api({
					params: {
						API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER',
						Action: 'DELETE',
						token: 1,
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
				
				// this.handleGoto({
				// 	url: '/pages/my/fx/fxgx',
				// 	params: {
				// 		id: data.id, 
				// 		data: encodeURIComponent(JSON.stringify(data)),
				// 	}
				// })
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
		padding-top: 120px; 
		background-image: url('https://wx.rawmex.cn/Public/2023fenxiao/005.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	.list {
		height: calc(100% - 39px);
		
	}
</style>
