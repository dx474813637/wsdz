<template>
	<view class="w">
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
					v-for="(item, index) in list"
					:key="item.id"
				>
					<view class="u-p-10">
						<view class="u-p-20 bg-white u-radius-10 uni-shadow-base">
							<view class="header u-p-10  u-m-b-10 u-flex u-flex-between text-base u-flex-items-center u-font-28">
								<view class="item">
									{{item.ctime}}
								</view>
								<view class="item">
									{{item.state |bankcardState2Str}}
								</view>
							</view>
							<BankCard
								:bank_class="item.bank_class"
								:bank_name="item.bank_name"
								:bank_sub="item.bank_accname"
								:bank_no="item.bank_accno"
								:origin="item"
								@detail="handleCardDetail"
							></BankCard>
						</view>
						
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
		<tabBar :customStyle="{
			'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
		}">
			<navigator url="/pages/my/money/card_add" class=" u-flex u-flex-items-center u-flex-center u-p-20">
				<u-button type="error" shape="circle" icon="plus-circle">添加银行卡</u-button>
			</navigator>
		</tabBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import BankCard from '@/pages/my/components/BankCard/BankCard.vue'
	export default {
		data() {
			return {
				keyword: '', 
				tabs_current: 1,
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
						disabled: false,
						state: 'all'
					},
					{
						name: '已绑定',
						disabled: false,
						state: '1'
					},
					{
						name: '已解绑',
						disabled: false,
						state: '3'
					},
					{
						name: '绑定失败',
						disabled: false,
						state: '2'
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'nomore'
			};
		},
		onLoad(opt) {
			if(opt.hasOwnProperty('current')) {
				this.tabs_current = opt.current
			}
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				sino: state => state.sinopay.sino,
				myCpy: state => state.user.myCpy,
				sinoFund: state => state.sinopay.sinoFund,
			}),
			list() {
				if(this.tabs_list[this.tabs_current].state == 'all') return this.indexList
				return this.indexList.filter(ele => ele.state == this.tabs_list[this.tabs_current].state )
			}
		},
		components: {
			BankCard
		},
		methods: {
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				// this.loadstatus = 'loadmore'
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
				this.changeTabsStatus('disabled', true)
				this.tabs_current = value.index
				console.log(value)
				if(value.state == 'all') {
					
					this.initParamas();
					uni.showLoading();
					await this.getData()
				}
				this.changeTabsStatus('disabled', false)
			},
			scrolltolower() {
				// this.getMoreData()
			},
			async getData() { 
				const res = await this.$api.sino_fund_account_list_bind({
					params: {
						account_id: this.sinoFund[0]?.id
					}
				})
				if(res.code == 1) {
					this.indexList = res.list 
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			handleCardDetail({id}) {
				uni.navigateTo({
					url: '/pages/my/money/bank_card_detail?id='+ id
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
		box-sizing: border-box;
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}
	.list {
		height: calc(100% - 104px);
		
	}
	
</style>
