<template>
	<view class="w">
		<view class="search-wrapper u-flex u-p-l-20 u-p-r-20">
			<view class="item u-flex-1 u-p-b-10">
				<u-search 
					placeholder="账号/公司/注册手机/客户手机" 
					v-model="keyword"
					clearabled
					:showAction="false"
					bgColor="#e8e8e8"
					@search="handleSearch"
				></u-search>
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
				<view
					slot="right"
					class="u-p-r-20 u-flex u-flex-items-center"
					@click="addCustomer"
				>
					<i class="custom-icon-friend custom-icon"></i>
					<!-- <u-icon
						name="setting"
						size="16"
					></u-icon> -->
					<text class="u-p-l-8 u-font-30">领取客户账号</text>
				</view>
			</u-tabs>
		</view>
		
		<view class="list u-p-l-15 u-p-r-15">
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
						<CustomCard
							:originalData="item"
							@detail="handleCustomDetail"
							@copy="handleCopy"
						></CustomCard>
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
	import CustomCard from '@/pages/my/components/CustomCard/CustomCard.vue'
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
						disabled: false,
					},
					{
						name: '已使用',
						disabled: false,
					},
					{
						name: '未使用',
						disabled: false,
					},
				],
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
				myCpy: state => state.user.myCpy,
			}),
			paramsObj() {
				let base = {
					p: this.curP,
					zt: 1
				}
				if(this.tabs_current == 1) {
					base.state = 1
				}
				if(this.tabs_current == 2) {
					base.state = 0
				}
				if(this.tabs_current == -1) {
					base.terms = this.keyword
				}
				console.log(base)
				return base
			}
		},
		components: {
			CustomCard
		},
		methods: {
			async addCustomer() {
				if(this.myCpy.state == '2') {
					uni.showToast({
						title: '当前用户信息被平台灭活',
						icon: 'none'
					})
					return
				}
				uni.showLoading()
				const res = await this.$api.addCustomer();
				if(res.code == 1) {
					this.tabs_current = 0
					this.refreshList()
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
			handleSearch(v) {
				this.tabs_current = -1
				this.refreshList()
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(value) {
				this.tabs_current = value.index
				this.keyword = ""
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
				const res = await this.$api.broker({
					params: this.paramsObj
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
			handleCopy(data) {
				let str;
				if(data.to_state == 1) {
					str = `账号：${data.login}`
				}else {
					str = `账号：${data.login}，初始密码：${data.to_passwd}`
				}
				
				uni.setClipboardData({
					data: str,
					success: function () {
						console.log('success');
					}
				});
			},
			handleCustomDetail({id, originalData}) {
				
				uni.navigateTo({
					url: `/pages/my/customer/customer_detail?id=${id}&data=${encodeURIComponent(JSON.stringify(originalData))}`
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
