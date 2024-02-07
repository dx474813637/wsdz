<template>
	<view class="w" :style="{
		backgroundImage: `url(https://wx.rawmex.cn/Public/2023fenxiao/fxtop6.png?time=${new Date().getTime()})`
	}"> 
		<view class="header-w u-p-20"> 
			<view class="  u-radius-10 u-p-10" style="background-color: #edf6ff;">
				<!-- <view class="u-text-center u-p-10 text-base">{{fxhome_info.da_name}}</view> -->
				
				<view class="list bg-white u-radius-10 u-p-20 u-p-t-80 u-p-b-80 u-flex-column u-flex-items-center"> 
					 <view class="text-base">佣金支出(元)</view>
					 <view>
						 <u-count-to 
							:endVal="indexList.total_price1_sum/100" 
							separator="," 
							:decimals="2"
							duration="800"
							color="#f00"
							fontSize="34"
						 ></u-count-to>
					 </view>
					 <!-- <view class="u-flex u-flex-items-center u-flex-center u-p-40 u u-m-t-40 u-radius-10" style="background-color: #edf6ff; width: 60vw;">
						<view class="item u-text-center u-flex-1 u-p-r-40">
							<view class="text-base u-m-b-6 u-font-28">订单笔数</view>
							<view class="u-error">12</view>
						</view>
						<u-line direction="col" length="50px"></u-line>
						<view class="item u-text-center u-flex-1 u-p-l-40">
							<view class="text-base u-m-b-6 u-font-28">订单总额</view>
							<view class="u-error">230000</view>
						</view>
					 </view> -->
				</view>
			</view>
		</view>
		
		<wxDingyuePopup :show="dingyueShow" @dingyuebtn="dingyueBtn" @close="dingyueShow = false"></wxDingyuePopup>
		<setNickPopup :show="nickShow" @confirmbtn="nickSuccess" @close="nickShow = false"></setNickPopup>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import JyfwCard from '@/pages/my/components/JyfwCard/JyfwCard.vue'
	import wxDingyuePopup from '@/components/wxDingyuePopup/wxDingyuePopup.vue'
	import setNickPopup from '@/components/setNickPopup/setNickPopup.vue'
	export default {
		data() {
			return { 
				indexList: {},
				curP: 1,
				loadstatus: 'loadmore',
				dingyueShow: false,
				nickShow: false
			};
		},
		async onLoad() { 
			uni.showLoading()
			await this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				fxhome_info: state => state.user.fxhome_info,
			}),
		}, 
		components: {
			JyfwCard,
			wxDingyuePopup,
			setNickPopup
		},
		onReachBottom() {
			this.scrolltolower()
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({ 
				getHomeInfo: 'user/getHomeInfo'
			}),   
			async getData() { 
				const res = await this.$api.shop_fx_money()
				if(res.code == 1) {
					this.indexList = res.list
				}
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
	.header-w {
		.icon-w {
			width: 25px;
			height: 25px;
			border-radius: 25px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #0364d3;
		}
	}
	.w {
		padding-top: 120px;
		height: 100%;
		// background-image: url('https://wx.rawmex.cn/Public/2023fenxiao/006.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	.list {
		// height: calc(100% - 44px);
		
	}
</style>
