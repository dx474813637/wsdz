<template>
	<view class="w" :style="{
		backgroundImage: `url(https://wx.rawmex.cn/Public/2023fenxiao/daren-02.jpg?time=${new Date().getTime()})`
	}"> 
		<view class="header-w u-p-20">
			<!-- <view class="bg-white u-radius-10 u-p-20 u-flex u-flex-items-center u-flex-between">
				<view class="item u-flex-1 page-bg2 u-m-r-6 u-radius-8 u-flex u-flex-items-center u-p-12 u-p-t-20 u-p-b-20" 
					@click="nickShow = true" v-if="!fxhome_info.da_name">
					<view class="icon-w u-m-r-10"  >
						<u-icon name="edit-pen" color="#fff"></u-icon>
					</view>
					<view>
						<view class="u-font-30">您还未设置昵称</view>
						<view class="u-font-20 u-info ">设置昵称可以更好保护隐私</view>
					</view>
				</view>
				<view class="item u-flex-1 page-bg2 u-m-l-6 u-radius-8 u-flex u-flex-items-center u-p-12 u-p-t-20 u-p-b-20" @click="dingyueShow = true">
					<view class="icon-w u-m-r-10">
						<u-icon name="man-add" color="#fff"></u-icon>
					</view>
					<view>
						<view class="u-font-30">微信订阅</view>
						<view class="u-font-20 u-info">订阅后可及时收发卖盘消息</view>
					</view>
				</view>
			</view> -->
			<view class="bg-white u-radius-10 u-p-10">
				<view class="tabs-w u-flex u-flex-items-center u-flex-between u-p-20">
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
				</view>
				
				<view class="list"> 
					<view
						v-for="(item, index) in indexList"
						:key="item.id"
					>
						<view class="u-p-10 u-p-l-20 u-p-r-20">
							<JyfwCard
								:detailData="item" 
								@detail="handleDetail"
								@delete="handleDelet"
							></JyfwCard>
						</view>
						
					</view>
					 
					<template v-if="indexList.length == 0">
						<u-empty
							mode="data"
							:icon="typeConfig.white.empty"
							text="请先添加分销商品再申请分销"
						>
						</u-empty>
					</template>
					<template v-else>
						<u-loadmore
							:status="loadstatus"
						/>
					</template> 
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
			async refreshList() {
				this.initParamas()
				await this.getData()
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
				const res = await this.$api.jyfw_list({params:{ 
					p: this.curP,
					terms: this.keyword 
				}})
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.list.list]
					if(this.indexList.length >= +res.list.total) {
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
			handleAdd({type, id}) {
				uni.navigateTo({
					url: `/pages/my/fx/jyfw`
				})
			},
			async handleDelet({id}) {
				uni.showLoading()
				const res = await this.$api.jyfw_del({
					params: { id }
				})
				if(res.code == 1) {
					uni.showToast({
						title: '删除成功'
					})
					const index = this.indexList.findIndex(ele => ele.id == id)
					this.indexList.splice(index, 1)
				}
				
				
			},
			handleDetail({pid, id, rank}) {
				
				uni.navigateTo({
					url: `/pages/my/fx/jyfw?id=${id}&rank=${rank}&pid=${pid}`
				})
			},
			nickSuccess() {
				this.nickShow = false
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
		padding-top: 120px;
		height: 100%;
		
		background-size: 100% auto;
		background-repeat: no-repeat;
	}
	.list {
		// height: calc(100% - 44px);
		
	}
</style>
