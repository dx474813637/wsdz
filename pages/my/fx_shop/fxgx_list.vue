<template>
	<view class="w u-p-l-20 u-p-r-20" :style="{
		backgroundImage: `url(https://wx.rawmex.cn/Public/2023fenxiao/fxtop4.png?time=${new Date().getTime()})`
	}"> 
		<view class="bg-white u-radius-18"> 
			
			<view class="search-wrapper u-flex u-p-20">
				<view class="item u-flex-1 u-p-r-10" @click="show = true">
					<u-input 
						placeholder="点击选择商品" 
						:value="product"
						:showAction="false"
						readonly
						bgColor="#fff" 
						suffixIcon="arrow-down"
						suffixIconStyle="color: #909399; font-size: 14px"
					>
					</u-input>
				</view>
				<!-- <view class="item u-flex-1 u-p-l-10" > 
					<uni-data-picker
						placeholder="筛选所在地区" 
						popup-title="请选择所在地区" 
						:localdata="addressArea" 
						v-model="addressData.regional" 
						@change="handleValArea"
					></uni-data-picker>
				</view> -->
				
			</view> 
			<view class="list u-p-20"> 
				<view
					v-for="(item, index) in indexList"
					:key="item"
				>
					<view class="u-m-b-20">
						<FxgxShopCard
							:detailData="item" 
							@detail="handleDetail"
							@changeStatus="handleChangeStatus"
						></FxgxShopCard>
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
		
		<menusPopupMyProduct 
			:show="show" 
			theme="white"   
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopupMyProduct>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import FxgxShopCard from '@/pages/my/components/FxgxCard/FxgxShopCard.vue'
	import menusPopupStandard from '@/components/menusPopup/menusPopupStandard.vue'
	export default {
		data() {
			return {
				keyword: '',
				show: false,
				// tabs_current: 0,
				// activeTabsStyle: {
				// 	fontSize: '34rpx',
				// 	fontWeight: 'bold',
				// 	color: '#007aff'
				// },
				// itemTabsStyle: {
				// 	height: '44px',
				// 	padding: '0 13px'
				// },
				// tabs_list: [
				// 	{
				// 		name: '全部',
				// 		trade_type: 'bs',
				// 		disabled: false,
				// 	},
				// 	// {
				// 	// 	name: '买盘',
				// 	// 	trade_type: 'b',
				// 	// 	disabled: false,
				// 	// },
				// 	// {
				// 	// 	name: '卖盘',
				// 	// 	trade_type: 's',
				// 	// 	disabled: false,
				// 	// },
				// ],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				product: "",
				product_id: "",
				addressData: {},
			};
		},
		async onLoad() {
			this.getAddressArea()
			uni.showLoading()
			await this.getData()
		},
		onReachBottom() {
			this.scrolltolower()
		},
		computed: {
			...mapState({
				addressArea: state => state.user.addressArea, 
				addressCity: state => state.user.addressCity, 
				typeConfig: state => state.theme.typeConfig,
			}),
		},
		components: {
			FxgxShopCard,
			menusPopupStandard
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({ 
				getFxStandard: 'user/getFxStandard', 
				getAddressArea: 'user/getAddressArea',
			}),  
			handleValArea() {
				this.refreshList()
			},
			async refreshList() {
				this.initParamas()
				await this.getData()
			},
			async menusConfirm(data) {
				console.log(data) 
				 this.product = data.name
				 this.product_id = data.id
				this.show = false;
				uni.showLoading()
				this.refreshList()
			}, 
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			}, 
			scrolltolower() {
				this.getMoreData()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.shop_fxgx_list({params:{
					p: this.curP, 
					product_id: this.product_id,
					regional: this.addressData.regional,
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
			async handleChangeStatus({id, sign}) {
				uni.showModal({
					content: '是否改变状态' ,
					success: async (r) => {
						if (r.confirm) {
							uni.showLoading()
							const res = await this.$api.shop_fxgx_change_status({
								params: { id, sign }
							})
							if(res.code == 1) {
								uni.showToast({
									icon: 'none',
									title: res.msg
								})
								const index = this.indexList.findIndex(ele => ele.id == id)
								this.indexList[index].auth_state = 1 - this.indexList[index].auth_state + ''
							}
						}
					}
				})
				
				
				
			},
			handleDetail(data) {
				
				this.handleGoto({
					url: '/pages/my/fx_shop/fxgx',
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
		padding-top: 120px; 
		// background-image: url('https://wx.rawmex.cn/Public/2023fenxiao/003.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	.list {
		height: calc(100% - 83px);
		
	}
</style>
