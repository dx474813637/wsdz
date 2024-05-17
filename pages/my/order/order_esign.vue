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
						<OrderESignCard
							:customData="item"
							:role="role"
							@detail="handleOrderDetail"
						></OrderESignCard>
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
	import OrderESignCard from '@/pages/my/components/OrderESignCard/OrderESignCard.vue'
	export default {
		data() {
			return {
				role: 'S',
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
						name: '未提交',
						value: '0',
						disabled: false,
					},
					{
						name: '已创建',
						value: '1',
						disabled: false,
					},
					{
						name: '已开启',
						value: '2',
						disabled: false,
					},
					{
						name: '已签约',
						value: '3',
						disabled: false,
					},
					{
						name: '签约协商中',
						value: '4',
						disabled: false,
					},
					{
						name: '协商失败',
						value: '5',
						disabled: false,
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore'
			};
		},
		async onLoad(options) {
			if(options.hasOwnProperty('role')) {
				this.role = options.role
			} 
			uni.setNavigationBarTitle({
				title: this.role == 'B' ? '采购签约列表' : '销售签约列表'
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
						name: '合同编号',
						value: 'contract_no'
					},
					{
						name: '订单ID',
						value: 'order_id'
					},
				]
			},
			paramsObj() { 
				let base = {
					role: this.role,
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
			OrderESignCard
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
				const res = await this.$api.LIST_ESIGN_SIGNFLOWS({params: this.paramsObj})
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.list.result.pw_rec_list]
					if(this.curP >= res.list.result.pw_page_total) {
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
			handleOrderDetail({id}) { 
				uni.navigateTo({
					url: `/pages/my/order/order_esign_detail?id=${id}&role=${this.role}`
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
