<template>
	<view class="w">
		<view class="search-wrapper u-flex u-p-l-20 u-p-r-20">
			<view class="item u-flex-1 u-p-b-10">
				<u-search 
					placeholder="检索商品名称" 
					v-model="keyword"
					clearabled
					:showAction="false"
					bgColor="#e8e8e8"
					@search="handleSearch"
				></u-search>
			</view>
			
		</view>
		<view class="list u-p-l-20 u-p-r-20">
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
						<PanZzCard
							:pid="item.id"
							:name="item.name"
							:sub="item.Customer.name"
							:status="item.state"
							:type="item.trade_type"
							:date="item.post_time"
							:price="item.price"
							:dprice="item.dprice"
							:unit="item.unit"
							:origin="item"
							isAuth 
							@front="handleProdFront" 
						></PanZzCard>
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
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import PanZzCard from '@/pages/my/components/PanZzCard/PanZzCard.vue'
	export default {
		data() {
			return {
				show: false,
				keyword: '',
				product: "",
				product_id: "",
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				pan: 's',
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			uni.setNavigationBarTitle({
				title: '客户自主' + (this.pan == 's'? '卖盘': '买盘')
			})
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				// login: state => state.user.login,
				// auth: state => state.user.auth,
				// myCpy: state => state.user.myCpy,
			}),
		},
		components: {
			PanZzCard
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			scrolltolower() {
				this.getMoreData()
			},
			handleSearch(v) {
				this.refreshList()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api[this.pan == 's'? 'broker_customer_sell': 'broker_customer_buy']({
					params: {
						p: this.curP,
						terms: this.keyword
					}
				})
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.list]
					if(this.indexList.length >= res.total) {
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
			handleProdFront({id}) {
				this.handleGoto({
					url: '/pages/index/pan/panDetail',
					params: {
						id,
						pan: this.pan,
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
		height: 100vh;
	}
	.list {
		height: calc(100% - 39px - env(safe-area-inset-bottom));
		
	}
</style>
