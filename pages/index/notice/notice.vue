<template>
	<view class="w">
		<view class="tabs-w bg-white u-flex u-flex-items-center u-p-l-20 u-p-r-20" v-if="tabs_list.length > 0" @click="handleTabClick">
			<view class="tab text-base" v-for="(item, index) in tabs_list" :key="index" :class="{
				'text-primary': tabs_current == index
			}" :data-key="index">
				{{item}}
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
					<view class="u-p-20 bg-white item-card u-m-t-20" @click="handleGoto({url: '/pages/index/notice/noticeDetail', params: {id: item.id} })">
						<view class="u-flex u-flex-items-start u-flex-between u-p-b-10">
							<view class="text-primary">{{item.title}}</view>
							<view class="u-font-28 text-base u-text-right u-p-t-5" style="flex: 0 0 70px">{{item.uptime | date2timestamp | timeFrom}}</view>
						</view>
						<view class="u-m-t-10 u-m-b-10">
							<u-line color="#ccc"></u-line>
						</view>
						<view class="u-flex u-p-t-10">
							<view class="u-content u-m-r-20" v-if="item.pic1">
								<u-image :src="item.pic1" width="60" height="60" mode="scaleToFill" radius="6"></u-image>
							</view>
							<view class="u-content u-line-3 u-flex-1">
								<rich-text :nodes="item.info"></rich-text>
								<!-- <u-parse :content="item.info"></u-parse> -->
							</view>
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
		
		<menusBar  theme="white" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				tabs_current: 0,
				tabs_list: [],
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
					if(this.curP = 1) {
						this.tabs_list = res.memu
					}
					this.setOnlineControl(res)
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
			handleTabClick(e) {
				console.log(e)
				if(e.target.dataset.key == 1) {
					this.handleGoto({
						url: '/pages/more/zxtk/zxtk',
						type: 'redirectTo'
					})
				}
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
	.u-content {
		// max-height: 60px;
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
		height: calc(100% - 85px - env(safe-area-inset-bottom));
		
	}
	.tab {
		height: 35px;
		line-height: 35px;
		padding: 0 10px;
	}
	
</style>
