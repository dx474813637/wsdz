<template>
	<view class="w">
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
					<view class="u-p-20 bg-white item-card u-m-t-20" @click="handleGoto({url: '/pages/index/notice/noticeDetail', params: {id: item.id}})">
						<view class="u-flex u-flex-items-center u-flex-between u-p-b-10">
							<view class="text-primary">{{item.title}}</view>
							<view class="u-font-28 text-base">{{item.uptime | date2timestamp | timeFrom}}</view>
						</view>
						<view class="u-m-t-10 u-m-b-10">
							<u-line color="#ccc"></u-line>
						</view>
						<view class="u-content">
							<u-parse :content="item.info"></u-parse>
						</view>
						<view class="u-p-10"></view>
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
	export default {
		data() {
			return {
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
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
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.noticeList({
					params: {
						p: this.curP,
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
	.u-content {
		max-height: 60px;
		overflow: hidden;
		color: #333;
	}
	.item-card {
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
	}
	.w {
		height: 100vh;
	}
	.list {
		height: calc(100% - env(safe-area-inset-bottom));
		
	}
</style>
