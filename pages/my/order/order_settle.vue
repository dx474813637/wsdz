<template>
	<view class="w">
		<view class="search-wrapper u-flex u-flex-items-center u-p-l-20 u-p-r-20 u-p-b-10">
			<view class="item" @click="searchCateShow = true" style="flex: 0 0 100px">
				<u--input 
					:value="searchCate"
					readonly
					suffixIcon="arrow-down"
					suffixIconStyle="color: #909399"
					shape="circle"
					fontSize="14"
					:customStyle="{paddingTop: '4px', paddingBottom: '4px', background: '#e8e8e8', border: 'none'}"
				></u--input>
			</view>
			<view class="item u-flex-1 u-m-l-20">
				<u-search 
					:placeholder="searchplaceholder" 
					v-model="keyword"
					clearabled
					:showAction="false"
					bgColor="#e8e8e8"
					@search="handleSearch"
				></u-search>
			</view>
			<view class="item u-m-l-20" @click="handleSearch">
				<view class=" u-radius-18 bg-primary u-flex u-flex-items-center u-flex-center" style="width: 30px;height: 30px; ">
					<i class="custom-icon-search custom-icon" style="color:#fff; font-size: 14px"></i>
				</view>
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
			>
			</u-tabs>
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
					:key="item.id"
				>
					<view class="u-p-10 u-p-l-20 u-p-r-20">
						<OrderSettleCard
							:customData="item"
							:ordertype="ordertype"
							@detail="handleOrderDetail"
						></OrderSettleCard>
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
		<u-picker 
			:show="searchCateShow" 
			:columns="columns" 
			closeOnClickOverlay 
			@confirm="confirm" 
			@cancel="searchCateShow = false" 
			@close="searchCateShow = false"></u-picker>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import OrderSettleCard from '@/pages/my/components/OrderSettleCard/OrderSettleCard.vue'
	export default {
		data() {
			return {
				ordertype: 'S',
				searchCateShow: false,
				searchCateIndex: 0,
				keyword: '',
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '34rpx',
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 7px'
				},
				tabs_list: [
					{
						name: '全部',
						value: '',
						disabled: false,
					},
					{
						name: '待发送',
						value: 'create',
						disabled: false,
					},
					{
						name: '待审核',
						value: 'audit',
						disabled: false,
					},
					{
						name: '已完成',
						value: 'success',
						disabled: false,
					},
					{
						name: '已取消',
						value: 'cancel',
						disabled: false,
					},
					{
						name: '待支付',
						value: 'pay',
						disabled: false,
					},
					{
						name: '支付中',
						value: 'paying',
						disabled: false,
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore'
			};
		},
		async onLoad(options) {
			if(options.hasOwnProperty('ordertype')) {
				this.ordertype = options.ordertype
			} 
			uni.setNavigationBarTitle({
				title: this.ordertype == 'B' ? '采购结算列表' : '销售结算列表'
			})
			uni.showLoading()
			await this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			columns() {
				return [
					this.searchCateList.map(ele => ele.name)
				]
			},
			searchCate() {
				return this.searchCateList[this.searchCateIndex].name
			},
			searchCateList() {
				return [ 
					{
						name: '买方账号',
						value: 'b_login'
					},
					{
						name: '卖方账号',
						value: 's_login'
					},
					{
						name: '订单ID',
						value: 'order_id'
					},
				]
			},
			paramsObj() { 
				let base = {
					bs: this.ordertype == 'B' ? 'b' : 's',
					state: this.tabs_list[this.tabs_current].value, 
					p: this.curP
				} 
				return {
					...base,
					[this.searchCateList[this.searchCateIndex].value]: this.keyword
				}
			},
			searchplaceholder() {
				let str = `请输入${this.searchCateList[this.searchCateIndex].name}`
				// if(this.searchCateList[this.searchCateIndex].value == 'title') {
				// 	str = `检索商品名`
				// }else {
				// 	str = `检索${this.searchCate}公司名`
				// }
				return str
			}
		},
		components: {
			OrderSettleCard
		},
		methods: {
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			confirm(e) {
				console.log('confirm', e)
				this.searchCateIndex = e.indexs[0]
				this.searchCateShow = false
			},
			async handleSearch(v) {
				console.log(v)
				this.changeTabsStatus('disabled', true)
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
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
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.order_settle_list({params: this.paramsObj})
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.list.Result.Order_settles]
					if(this.curP >= res.list.Result.Pager.rec_total) {
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
			async handleChangeStatus({status, id}) {
				const res = await this.$api.changeProdStatus({params: {id, status}})
				if(res.code == 1) {
					const index = this.indexList.findIndex(ele => ele.id == id)
					this.indexList[index].status = !this.indexList[index].status
					
				}
			},
			handleAdd({type, id}) {
				
			},
			async handleDelet({id}) {
				const res = await this.$api.deletProds({params: {id}})
				if(res.code == 1) {
					uni.showToast({
						title: '删除成功'
					})
					const index = this.indexList.findIndex(ele => ele.id == id)
					this.indexList.splice(index, 1)
				}
				
				
			},
			handleOrderDetail({id}) {
				
				uni.navigateTo({
					url: `/pages/my/order/order_settle_detail?id=${id}&ordertype=${this.ordertype}`
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
		height: 100%;
	}
	.list {
		height: calc(100% - 83px);
		
	}
</style>
