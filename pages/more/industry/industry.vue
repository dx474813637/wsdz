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
					<view class="u-p-30 bg-white item-card u-m-t-20 u-flex u-flex-items-center u-flex-between" @click="handleClick(item)">
						<view class=" ">
							<u-image width="60" height="60" :src="item.logo" mode="aspectFit"></u-image>
						</view> 
						<view class=" u-flex-1 u-p-l-40 u-p-r-20"> 
							<view class="u-font-36 u-m-b-10" style="color: #5d606f;">{{item.name}}</view>
							<view class="u-line-2 u-font-26 u-info" style="height: 38px;color: #9395aa;line-height: 19px;">{{item.info}}</view>
						</view> 
						<view class="icon-bg u-flex u-flex-items-center u-flex-center"> 
							<i class="custom-icon-youjiantou custom-icon"></i>
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
				cate: 1, //1市场 2网站
				loadstatus: 'loadmore',
				tabs_current: 0,
				tabs_list: [],
			};
		},
		async onLoad(opt) {
			if(opt.hasOwnProperty('cate')) {
				this.cate = opt.cate
			}
			uni.showLoading()
			await this.getData()
			
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
				const res = await this.$api.industry({
					params: {
						p: this.curP,
						cate: this.cate
					}
				})
				if(res.code == 1) { 
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
			handleClick(data) { 
				uni.navigateToMiniProgram({
					appId: data.appid,
					path: data.path,
					success: res => {
						console.log(res)
					},
					fail: res => {
						console.log(res)
					}
				})
			}
			
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f1f5f8;
		height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.icon-bg {
		border-radius: 30px;
		background-color: #007aff;
		width: 25px;
		flex: 0 0 25px;
		height: 25px;
		.custom-icon {
			color: #fff;
			font-size: 14px;
		}
	}
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
		height: calc(100% - 50px - env(safe-area-inset-bottom));
		
	}
	.tab {
		height: 35px;
		line-height: 35px;
		padding: 0 10px;
	}
	
</style>
