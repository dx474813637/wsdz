<template>
	<view class="w">
		<view class="search-wrapper u-p-l-20 u-p-r-20">
			<view class="item u-p-b-10">
					<uni-combox
						:candidates="candidates" 
						placeholder="请选择下拉匹配选项" 
						v-model="product"
						@blur="comboxBlur1"
					></uni-combox>
			</view>
			<view class="item u-flex-1 u-p-b-10 u-flex u-flex-items-center">
				
				<view class="u-p-r-10 u-flex-1">
					<u--input 
						v-model="keyword"
						placeholder="名称" 
						clearable
						:customStyle="{backgroundColor: '#fff'}"
					></u--input>
				</view>
				<view class="u-p-r-10">
					<u-button type="primary"  @click="handleSearch" :customStyle="{width: '80px', height: '35px', borderRadius: '14rpx'}" >搜索</u-button>
				</view>
				
				<u-button type="warning" icon="reload" @click="resetSearch" :customStyle="{width: '80px', height: '35px', borderRadius: '14rpx'}" >重置</u-button>
			</view>
			
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
						<BrokerCard
							:pid="item.id"
							:name="item.name"
							:pp="item.pp"
							:status="item.status"
							:type="item.type"
							:date="item.date"
							:price="item.price"
							:unit="item.unit"
							@changeStatus="handleChangeStatus"
							@delet="handleDelet"
							@resubmit="handleResubmit"
							@detail="handleProdDetail"
						></BrokerCard>
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
	import BrokerCard from '@/pages/my/components/BrokerCard/BrokerCard.vue'
	export default {
		data() {
			return {
				keyword: '',
				list1: [
					{
						label: '菜单1',
						value: 'caidan1'
					},
					{
						label: '菜单2',
						value: 'caidan2'
					},
					{
						label: '菜单3',
						value: 'caidan3'
					},
					{
						label: '菜单4',
						value: 'caidan4'
					}
				],
				product: "",
				product_id: "",
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore'
			};
		},
		onLoad() {
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			candidates() {
				return this.list1.map(ele => ele.label)
			},
		},
		components: {
			BrokerCard
		},
		methods: {
			comboxBlur1(e) {
				const index = this.candidates.indexOf(e)
				if(index != -1) {
					this.product_id = this.list1[index].value
					this.product = e
				}else {
					this.product_id = '';
					this.product = ''
				}
			},
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			handleSearch() {
				console.log(this.keyword)
			},
			resetSearch() {
				this.keyword = "";
				this.product_id = ""
				this.product = ''
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(value) {
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
				const res = await this.$api.getBrokerList()
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.data]
					if(this.curP == res.page_total) {
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
			handleResubmit({id}) {
				
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
			handleProdDetail({pid}) {
				
				uni.navigateTo({
					url: `/pages/my/broker/edit?pid=${pid}`
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
		height: calc(100% - 85px);
		
	}
</style>
