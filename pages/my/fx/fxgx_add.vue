<template>
	<view class="w u-p-l-20 u-p-r-20" :style="{
		backgroundImage: `url(https://wx.rawmex.cn/Public/2023fenxiao/daren-04.png?time=${new Date().getTime()})`
	}"> 
		<view class="bg-white u-radius-10 " style="position: relative; padding-top: 40px;">
			<view class="tabs-w u-flex u-flex-items-end u-flex-between">
				<view class="item bg-white text-primary u-flex-1 active">全部货源</view>
				<view class="item u-flex-1" @click="handleGoto({url: '/pages/my/fx/fxgx_list', type: 'redirect'})">我的货源</view>
			</view>
			<view class="search-wrapper u-flex u-p-20">
				<view class="item u-flex-1 u-p-r-10" @click="show = true">
					<u-input 
						placeholder="请选择品类" 
						v-model="pid_name" 
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
						:localdata="addressCity" 
						v-model="addressData.regional" 
						@change="handleValArea"
					></uni-data-picker>
				</view>
				
			</view> 
			
			<view class="list u-p-20"> 
				<view
					v-for="(item, index) in indexList"
					:key="item"
				>
					<view class=" u-m-b-20">
						<FxgxCardAdd
							:detailData="item" 
							@add="handleAdd"
						></FxgxCardAdd>
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
	import FxgxCardAdd from '@/pages/my/components/FxgxCard/FxgxCardAdd.vue'
	import menusPopupMyStandard from '@/components/menusPopup/menusPopupMyStandard.vue'
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
				addressData: {},
				tabs_list: [
					{
						name: '按时间',
						value: 'post_time',
						disabled: false,
					},
					{
						name: '按千分比',
						value: 'pay_type1',
						disabled: false,
					},
					{
						name: '按每单位费率',
						value: 'pay_type2',
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
				pid_name: '',
				pid: '',
				curP: 1,
				loadstatus: 'loadmore'
			};
		},
		async onLoad(opt) {
			this.getAddressArea()
			if(opt.hasOwnProperty('pid')) {
				this.pid = opt.pid 
				this.initNameByPid()
			} 
			uni.showLoading()
			await this.getData()
		},
		computed: {
			...mapState({ 
				addressArea: state => state.user.addressArea, 
				addressCity: state => state.user.addressCity, 
				fxStandard: state => state.user.fxStandard, 
				typeConfig: state => state.theme.typeConfig,
			}),
		},
		components: {
			FxgxCardAdd,
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
				getAddressArea: 'user/getAddressArea', 
			}), 
			async refreshList() {
				this.initParamas()
				await this.getData()
			},
			async initNameByPid() {
				if(this.fxStandard.length == 0) {
					uni.showLoading()
					await this.getFxStandard() 
				}
				this.pid_name = this.fxStandard.filter(ele => ele.pid == this.pid)[0].name 
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
				const res = await this.$api.fxgx_wait_list({params:{ 
					p: this.curP,
					pid: this.pid,
					orderby: this.tabs_list[this.tabs_current].value,
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
			handleValArea() {
				this.refreshList()
			},
			async handleAdd({id, sign}) {
				uni.showLoading()
				const res = await this.$api.fxgx_add({
					params: {  
						id,
						sign
					}
				})
				if(res.code == 1) {
					uni.showToast({
						title: res.msg
					})  
				} 
				
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
	.w {
		height: 100%;
		padding-top: 140px; 
		// background-image: url('https://wx.rawmex.cn/Public/2023fenxiao/003.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	.list {
		// height: calc(100% - 83px);
		
	}
</style>
