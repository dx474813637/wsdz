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
				<u-list-item v-if="res.img">
					<view class=" u-m-t-10 u-m-b-10">
						<u-image width="100%" height="auto" mode="widthFix" :src="res.img" radius="8"></u-image>
					</view>
				</u-list-item>
				<u-list-item>
					<view class="u-flex u-m-t-20 u-m-b-30" >
						<view class="item item-card u-p-20 u-flex-1 u-m-r-15 bg-white" style="background: linear-gradient(to bottom, #fff 20%, #f0f7ff );">
							<view class="u-flex u-flex-items-center u-font-28 u-m-b-10">
								<i class="custom-icon-recharge custom-icon text-primary"></i>
								<view class="u-m-l-10 text-base">{{res.num_title}}</view>
							</view>
							<view class="u-flex u-flex-items-baseline text-primary">
								<u-count-to bold :endVal="res.num" color="#007aff" fontSize="28"></u-count-to>
								<view class="u-m-l-10 u-font-28">{{res.num_unit}}</view>
							</view>
						</view>
						
						<view class="item item-card u-p-20 u-flex-1 u-m-l-15 bg-white" style="background: linear-gradient(to bottom, #fff 20%, #f0f7ff );">
							<view class="u-flex u-flex-items-center u-font-28 u-m-b-10">
								<i class="custom-icon-moneybag custom-icon text-error"></i>
								<view class="u-m-l-10 text-base">{{res.sum_title}}</view>
							</view>
							<view class="u-flex u-flex-items-baseline text-error">
								<u-count-to bold :endVal="res.sum" decimals="2" color="#ff0000" fontSize="28"></u-count-to>
								<view class="u-m-l-10 u-font-28">{{res.sum_unit}}</view>
							</view>
						</view>
					</view>
				</u-list-item>
				<u-list-item v-if="tabs_list && tabs_list.length > 1">
					<view class="mian-list-title u-flex u-flex-items-center u-p-20">
						<i class="custom-icon-sort custom-icon text-primary u-font-40"></i>
						<view class="u-m-l-20 u-font-34" style="font-weight: bold;">{{tabs_list[tabs_current]}}记录</view>
					</view>
				</u-list-item>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="item.id"
				>
					<view class="bg-white item-card u-m-t-30">
						<view class="u-flex u-flex-items-start u-flex-between u-p-20" style="background-color: #f0f7ff;">
							<view class=" u-line-1">{{item.company}}</view>
						</view>
						
						<view class="u-flex u-flex-items-center u-p-t-30 u-p-b-30 u-p-l-10 u-p-r-10">
							<view class="item u-flex-1 u-text-center">
								<view class="text-base u-m-b-10 u-font-28" style="font-weight: 300;">采购商品</view>
								<view class="text-primary u-line-2 u-p-l-10 u-p-r-10">
									{{item.product}}
								</view>
							</view>
							<u-line direction="col" length="80rpx" color="#b5cdff"></u-line>
							<view class="item u-flex-1 u-text-center">
								<view class="text-base u-m-b-10 u-font-28" style="font-weight: 300;">提款时间</view>
								<view class="text-primary">
									{{item.ctime | date2timestamp | date('mm-dd hh:MM')}}
								</view>
							</view>
							<u-line direction="col" length="80rpx" color="#b5cdff"></u-line>
							<view class="item u-flex-1 u-text-center">
								<view class="text-base u-m-b-10 u-font-28" style="font-weight: 300;">提款金额</view>
								<view class="text-primary">
									{{item.money}}元
								</view>
							</view>
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
				res: {},
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				tabs_current: 1,
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
				// this.getMoreData()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.drawingList({
					params: {
						p: this.curP,
					}
				})
				if(res.code == 1) {
					if(this.curP = 1) {
						this.tabs_list = res.memu
						this.res = res
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
				if(e.target.dataset.key == 0) {
					this.handleGoto({
						url: '/pages/index/notice/notice',
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
