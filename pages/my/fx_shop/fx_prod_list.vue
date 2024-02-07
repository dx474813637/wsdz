<template>
	<view class="w" :style="{
		backgroundImage: `url(https://wx.rawmex.cn/Public/2023fenxiao/fxtop3.png?time=${new Date().getTime()})`
	}"> 
		<view class="header-w u-p-20"> 
			<view class="bg-white u-radius-10 " style="position: relative; padding-top: 40px;">
				<view class="tabs-w u-flex u-flex-items-end u-flex-between">
					<view class="item u-flex-1" @click="handleGoto({url: '/pages/my/fx_shop/fx_all', type: 'redirect'})">
						联盟货架
					</view>
					<view class="item bg-white text-primary u-flex-1 active">
						我的货架
					</view>
				</view>
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
					<view class="item u-flex-1 u-p-l-10" > 
						<uni-data-picker
							placeholder="筛选所在地区" 
							popup-title="请选择所在地区" 
							:localdata="addressArea" 
							v-model="addressData.regional" 
							@change="handleValArea"
						></uni-data-picker>
					</view>
					
				</view>  
				<view class="list u-p-b-20"> 
					<view
						v-for="(item, index) in indexList"
						:key="item.id"
					>
						<view class="u-p-10 u-p-l-20 u-p-r-20">
							<FxProdCardShop
								:detailData="item" 
								@detail="handleDetail"
								@changeStatus="handleChangeStatus"
							></FxProdCardShop>
						</view>
						
					</view>
					 
					<template v-if="indexList.length == 0">
						<u-empty
							mode="data"
							:icon="typeConfig.white.empty"
							text="请先添加分销商品再申请分销"
						>
						</u-empty>
					</template>
					<template v-else>
						<u-loadmore
							:status="loadstatus"
						/>
					</template> 
				</view>
			</view>
		</view>
		
		<tabBar :customStyle="{
			'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
		}">
			<view class=" u-flex u-flex-items-center u-flex-around u-p-20">
				<view class="item u-flex-1" @click="sendPan">
					<u-button type="primary" shape="circle" @click="handleGoto({url: '/pages/my/fx_shop/fx_prod'})">
						<u-icon
							name="plus"
							size="12"
							color="#fff"
						></u-icon>
						<text class="u-p-l-8 u-font-28">添加分销商品</text>
					</u-button>
				</view> 
			</view>
		</tabBar>
		<menusPopupMyProduct 
			:show="show" 
			theme="white"   
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopupMyProduct>
		<!-- <wxDingyuePopup :show="dingyueShow" @dingyuebtn="dingyueBtn" @close="dingyueShow = false"></wxDingyuePopup> -->
		<!-- <setNickPopup :show="nickShow" @confirmbtn="nickSuccess" @close="nickShow = false"></setNickPopup> -->
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import FxProdCardShop from '@/pages/my/components/FxgxCard/FxProdCardShop.vue'
	import menusPopupMyStandard from '@/components/menusPopup/menusPopupMyStandard.vue'
	// import wxDingyuePopup from '@/components/wxDingyuePopup/wxDingyuePopup.vue'
	// import setNickPopup from '@/components/setNickPopup/setNickPopup.vue'
	export default {
		data() {
			return { 
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				// dingyueShow: false,
				// nickShow: false,
				product: "",
				product_id: "",
				show: false,
				addressData: {},
			};
		},
		async onLoad() {
			this.getAddressArea()
			// this.getHomeInfo()
			uni.showLoading()
			await this.getData()
		},
		computed: {
			...mapState({
				addressArea: state => state.user.addressArea, 
				addressCity: state => state.user.addressCity, 
				fxStandard: state => state.user.fxStandard, 
				typeConfig: state => state.theme.typeConfig,
				// fxhome_info: state => state.user.fxhome_info,
			}),
		}, 
		components: {
			menusPopupMyStandard,
			FxProdCardShop,
			// wxDingyuePopup,
			// setNickPopup
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
				getAddressArea: 'user/getAddressArea',
			}),  
			handleValArea() {
				this.refreshList()
			},
			async refreshList() {
				this.initParamas()
				await this.getData()
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
				const res = await this.$api.shop_fx_product({params:{ 
					p: this.curP,
					product_id: this.product_id,
					regional: this.addressData.regional,
				}})
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.list.list]
					if(this.indexList.length >= +res.list.total) {
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
			handleAdd({type, id}) {
				uni.navigateTo({
					url: `/pages/my/fx/jyfw`
				})
			},
			async menusConfirm(data) {
				console.log(data) 
				 this.product = data.name
				 this.product_id = data.id
				this.show = false;
				uni.showLoading()
				this.refreshList()
			}, 
			async handleChangeStatus({id, sign}) {
				uni.showModal({
					content: '是否改变状态' ,
					success: async (r) => {
						if (r.confirm) {
							uni.showLoading()
							const res = await this.$api.shop_fx_product_change_status({
								params: { id, sign }
							})
							if(res.code == 1) {
								uni.showToast({
									icon: 'none',
									title: res.msg
								})
								const index = this.indexList.findIndex(ele => ele.id == id)
								this.indexList[index].state = 1 - this.indexList[index].state + ''
							}
						}
					}
				})
				
				
				
			},
			handleDetail({ id }) { 
				uni.navigateTo({
					url: `/pages/my/fx_shop/fx_prod?id=${id}`
				})
			},
			nickSuccess() {
				this.nickShow = false
			},
			async dingyueBtn() {
				uni.showLoading()
				const res = await this.$api.tmp_id_list();
				if(res.code == 1) { 
					this.subApi(res.list) 
				}
				this.dingyueShow = false
			},
			subApi(list) {
				wx.requestSubscribeMessage({
					tmplIds: list,
					success: async (res)=>{
						if(res.KIRbQmobnZlPo5OTgaMq6kHRI_zhpwVphn0mY42NeW8 == 'reject') return
						uni.showLoading()
						const res2 = await this.$api.tmp_id_back({
							params: {
								str: JSON.stringify(res)
							}
						})
						if(res2.code == 1) {
							uni.showToast({
								title: res2.msg,
								icon: 'none'
							})
						}
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
	
	.tabs-w {
		// background-color: #eaf2ff;
		// border-radius: 10px 10px 0 0;
		color: #666;
		// overflow: hidden;
		position: absolute; 
		top: -10px;
		left: 0;
		width: 100%;
		font-weight: bold;
		.item { 
			line-height: 40px;
			text-align: center;
			background-color: #eaf2ff;
			// border-radius: 15px 15px 0 0;
			&:first-child {
				border-top-left-radius: 15px;
			}
			&:last-child {
				border-top-right-radius: 15px;
			}
			&.active {  
				line-height: 50px;
				border-radius: 15px 15px 0 0;
			}
		}
	}
	.header-w {
		.icon-w {
			width: 25px;
			height: 25px;
			border-radius: 25px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #0364d3;
		}
	}
	.w {
		padding-top: 120px; 
		padding-bottom: 60px;
		min-height: 100vh;
		
		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	.list {
		// height: calc(100% - 44px);
		
	}
</style>
