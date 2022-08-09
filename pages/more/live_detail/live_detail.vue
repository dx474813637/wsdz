<template>
	<view class="w"> 
		<view class="main u-p-20">
			<view class=" u-p-30 u-m-b-20 bg-white u-radius-8 uni-shadow-base">
				<view class="card-name u-m-b-10">{{list.title}}</view>
				<view class="u-flex u-flex-items-center u-flex-between u-font-28 u-info">
					<view class="item u-flex-1 u-font-28" v-if="list.description">{{list.description}}</view>
					<view class="item">
						<u-button 
							size="mini" 
							type="primary" 
							:disabled="!liveNoticeInfo.reservable" 
							@click="yuyue" 
							icon="clock"
							:customStyle="{...customBtn, fontSize: '14px', padding: '0px 12px', height: '24px'}">{{yuyueBtnStr}}</u-button>
					</view>
					
				</view>
			</view>
			<view class="u-m-b-20" >
				<u-button 
					type="primary" 
					@click="handleGotoLive" 
					icon="play-circle"
					:customStyle="customBtn" >进入直播间</u-button>
			</view>
			<view class=" u-p-10 bg-white u-radius-8 uni-shadow-base" v-if="list.intro">
				<u-parse :content="list.intro"></u-parse>
			</view>
			
		</view>
		
		<u-safe-bottom></u-safe-bottom>
		<menusBar  theme="white" ></menusBar>
		
		<view style="position: relative;z-index: 1;">
			<u-loading-page
				:loading="loading"
				loading-text="获取页面数据中..."
			></u-loading-page>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions } from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				indexLoading: true,
				liveInfoLoading: true,
				liveNoticeInfoLoading: true,
				id: '',
				sph: '',
				list: {},
				liveInfo: {},
				liveNoticeInfo: {},
				customBtn: {
					background: 'linear-gradient(to right, #6b8bff, #5770fe)',
					borderRadius: '8px',
					border: 'none'
				},
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
				typeConfig: state => state.theme.typeConfig,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
			}),
			loading() {
				return this.indexLoading // && this.liveInfoLoading
			},
			yuyueBtnStr() {
				// if(this.liveNoticeInfo.status == 2) {
				// 	return '已预约'
				// }
				// if(this.liveNoticeInfo.status == 1) {
				// 	return '已预约'
				// }
				return '直播预约' // + this.liveNoticeInfo.status
			},
			noticeId() {
				let id = ''  
				if(!this.list.author || !this.liveNoticeInfo.startTime ) return ''
				if(this.list.author == this.liveNoticeInfo.startTime) id = this.liveNoticeInfo.noticeId
				else if(this.liveNoticeInfo.otherInfos && this.liveNoticeInfo.otherInfos.length > 0) {
					let arr = this.liveNoticeInfo.otherInfos.filter(ele => ele.startTime == this.list.author)
					if(arr.length > 0) {
						id = arr[0].noticeId
					}else {
						id = this.liveNoticeInfo.noticeId
					}
				}
				
				return id
			}
		},
		async onLoad(options) { 
			
			if(options.hasOwnProperty('id') && options.hasOwnProperty('sph')) {
				this.id = options.id
				this.sph = options.sph
			}else {
				
				uni.navigateBack({
					success() {
						uni.showToast({
							title: '参数有误',
							icon: 'none'
						})
					}
				})
				return 
			}
			await this.getIndex()
			this.indexLoading = false
			// await this.getLiveInfo()
			await this.getLiveNoticeInfo()
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async getLiveNoticeInfo() { 
				try{
					wx.getChannelsLiveNoticeInfo({
						finderUserName: this.sph,
						success: res => {
							console.log(1,res)
						}
					})
					const res = await this.$wxp.getChannelsLiveNoticeInfo({finderUserName: this.sph})
					this.liveNoticeInfo = res
					this.liveNoticeInfoLoading = false
					console.log('getLiveNoticeInfo')
					console.log(res)
				}catch(e){
					console.log(e)
					// uni.showToast({
					// 	title: e.errMsg,
					// 	icon: 'none'
					// })
				}
			},
			async getLiveInfo() {
				try{
					const res = await this.$wxp.getChannelsLiveInfo({finderUserName: this.sph})
					this.liveInfo = res
					this.liveInfoLoading = false
					console.log('getLiveInfo')
					console.log(res)
				}catch(e){
					console.log(e)
					// uni.showToast({
					// 	title: e.errMsg,
					// 	icon: 'none'
					// })
				} 
			},
			async getIndex() {
				const res = await this.$api.xueyuanDetail({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.list = res.list
					this.indexLoading = false
				}
			},
			handleGotoLive() {
				wx.openChannelsLive({
					finderUserName: this.sph,
					success(res) {
						console.log(res)
					}
				})
			},
			yuyue() {
				if(!this.noticeId || this.noticeId == 'none') {
					uni.showToast({
						title: 'noticeId error',
						icon: ''
					})
					return
				}
				wx.reserveChannelsLive({
					noticeId: this.noticeId,
					success: res => {
						console.log(res)
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f6f7fa;
	}
</style>
<style lang="scss" scoped>
	.wrapper {
		position: relative;
		.video-icon {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.5);
		}
	}
	.w {
		padding-bottom: 50px;
	}
	.card-label {
		flex: 0 0 70px;
		padding-right: 15px;
		text-align: justify;
		text-align-last: justify;
	}
	.card-name {
		line-height: 22px; 
	}
	.card {
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
	.card-content {
		word-break: break-all;
	}
	.card-title {
		border-bottom: 1rpx solid #eee;
		line-height: 35px;
		font-weight: bold;
		color: #2464f5;
	}
	
	.card-i {
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
</style>
