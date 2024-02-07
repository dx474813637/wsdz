<template>
	<view class="w" > 
		<u--image
			:src="`${list.bj}`"
			width="100%"
			height="auto"
			mode="widthFix"
		></u--image>
		<view class="header-w u-p-20">
			<view class="bg-white u-radius-10 u-p-20 u-m-b-30 u-p-l-40"> 
				<view class="item"
					v-for="(item, index) in list.memu"
					:key="index"
				>
					<view class="u-flex u-flex-items-center"
						@click="goto(item.url)"
					>
						<view class="item">
							<u--image 
								:src="item.img"
								width="40px"
								height="40px"
							></u--image>
						</view>
						<view class="item u-flex-1 u-p-20 u-p-t-40 u-p-b-40 u-flex u-flex-items-center u-border-bottom" style="border-color: #eee!important;">
							<view class="item u-flex-1">
								<view class="u-font-32 text-bold text-black">{{item.name}}</view>
								<view class="u-info u-font-24">{{item.info}}</view> 
							</view>
							<view class="item">
								<u-icon name="arrow-right" size="24" color="#b2d8ff"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="bg-white u-radius-10 u-p-20 ">
				<view class="u-font-28 u-p-10">开启私信提醒</view> 
				<view class="item page-bg2 u-radius-8 u-flex u-flex-items-center u-p-20" @click="dingyueShow = true">
					<view class="icon-w" v-if="!list.button.img">
						<u-icon name="man-add" color="#fff"></u-icon>
					</view>
					<u--image 
						v-else
						:src="list.button.img"
						width="30px"
						height="30px"
					></u--image>
					<view class="u-flex-1 u-m-l-20">
						<view class="u-font-40 u-m-b-10">{{list.button.name}}</view>
						<view class="u-font-26 text-thin">{{list.button.info}}</view>
					</view>
					<view>
						<u-button type="primary" plain size="small">{{list.button.button_name}}</u-button>
					</view>
					
				</view>
			</view> -->
		</view>
		<!-- <view class="tabs-w u-flex u-flex-items-center u-flex-between u-p-30">
			<view class="item u-flex u-flex-items-center">
				<u-icon name="list" size="24" color="#f00"></u-icon>
				<view class="u-m-l-10 u-font-34">我的分销商品</view>
			</view>
			<view class="item">
				<u-button type="primary" shape="circle" size="small" @click="handleGoto({url: '/pages/my/fx/jyfw'})">
					<u-icon
						name="plus"
						size="12"
						color="#fff"
					></u-icon>
					<text class="u-p-l-8 u-font-28">添加分销商品</text>
				</u-button>
			</view> 
		</view> -->
		 
		<wxDingyuePopup :show="dingyueShow" @dingyuebtn="dingyueBtn" @close="dingyueShow = false"></wxDingyuePopup> 
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
				list: {},
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				dingyueShow: false,
				nickShow: false
			};
		},
		async onLoad() { 
			this.getHomeInfo()
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
		// onReachBottom() {
		// 	this.scrolltolower()
		// },
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({ 
				getHomeInfo: 'user/getHomeInfo'
			}),  
			async getData() {
				const res = await this.$api.fenxiao()
				if(res.code == 1) {
					this.list = res.list
				}
			},
			goto(url) {
				uni.navigateTo({
					url
				})
			},
			async dingyueBtn() {
				uni.showLoading()
				const res = await this.$api.tmp_id_list();
				if(res.code == 1) { 
					this.subApi(res.list) 
				}
				this.dingyueShow = false
			},
			subApi(list) {
				wx.requestSubscribeMessage({
					tmplIds: list,
					success: async (res)=>{
						if(res.KIRbQmobnZlPo5OTgaMq6kHRI_zhpwVphn0mY42NeW8 == 'reject') return
						uni.showLoading()
						const res2 = await this.$api.tmp_id_back({
							params: {
								str: JSON.stringify(res)
							}
						})
						if(res2.code == 1) {
							uni.showToast({
								title: res2.msg,
								icon: 'none'
							})
						}
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
		// padding-top: 120px;
		height: 100%;
		// background-image: url('https://wx.rawmex.cn/Public/2023fenxiao/002.jpg');
		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	.list {
		// height: calc(100% - 44px);
		
	}
</style>
