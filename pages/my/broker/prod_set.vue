<template>
	<view class="w">
		<!-- <view class="search-wrapper u-flex u-p-l-20 u-p-r-20">
			<view class="item u-flex-1 u-p-b-10">
				<u-search 
					placeholder="检索名称" 
					v-model="keyword"
					clearabled
					:showAction="false"
					bgColor="#e8e8e8"
					@search="handleSearch"
				></u-search>
			</view>
			
		</view> -->
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
					@click="handleGoto({url: '/pages/my/broker/prod_edit'})"
					slot="right"
					class="u-p-r-20 u-flex"
				>
					<u-icon
						name="plus-circle"
						size="16"
					></u-icon>
					<text class="u-p-l-8 u-font-30">添加商品</text>
				</view>
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
					<view class="u-p-10">
						<ProdSetCard
							:origin="item"
							:pid="item.id"
							:name="item.name"
							:pp="item.attrObj.attr_common_11"
							:status="item.state"
							:shuxing="item.attrObj.attr_common_12"
							@changeStatus="handleChangeStatus"
							@delet="handleDelet"
							@add="handleAdd"
							@detail="handleProdDetail"
						></ProdSetCard>
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
	import ProdSetCard from '@/pages/my/components/ProdSetCard/ProdSetCard.vue'
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
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
		},
		components: {
			ProdSetCard
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async refreshList() {
				this.initParamas()
				await this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			handleSearch(v) {
				console.log(v)
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
				const res = await this.$api.myProduct({params:{
					p: this.curP,
					// trade_type: this.tabs_list[this.tabs_current].trade_type
				}})
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.list.map(ele => {
						const obj = {}
						ele.attributes.forEach(item => {
							obj[item.code] = item.value
						})
						return {
							...ele,
							attrObj: obj
						}
					})]
					if(!res.list || res.list.length == 0) {
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
			async handleChangeStatus({state, id}) {
				const res = await this.$api.ableProduct({params: {id, state}})
				if(res.code == 1) {
					const index = this.indexList.findIndex(ele => ele.id == id)
					this.indexList[index].state = 1-this.indexList[index].state
					
				}
			},
			handleAdd({type, id}) {
				uni.navigateTo({
					url: `/pages/my/broker/edit?pan=${type}&product_id=${id}`
				})
			},
			async handleDelet({id}) {
				uni.showLoading()
				const res = await this.$api.deleteProduct({params: {id}})
				if(res.code == 1) {
					uni.showToast({
						title: '删除成功'
					})
					const index = this.indexList.findIndex(ele => ele.id == id)
					this.indexList.splice(index, 1)
				}
				
				
			},
			handleProdDetail({pid, data}) {
				
				uni.navigateTo({
					url: `/pages/my/broker/prod_edit?pid=${pid}&data=${encodeURIComponent(JSON.stringify(data))}`
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
		height: calc(100% - 44px);
		
	}
</style>
