<template>
	<view class="home"> 
		<view class="home-header">
			<view class="header-bg" :style="{ backgroundImage: `url(https://wx.rawmex.cn/Public/2023fenxiao/001.jpg)` }" v-if="homeData.bj"></view>
			
		</view>
		<view class="home-main">
			<view class="main-header u-flex u-flex-items-start u-flex-between u-p-l-50 u-p-r-30">
				<view class="item item-avatar">
					<view class="avatar">
						<u--image
							showLoading
							:src="`${homeData.infoa.list.detail.url_img}${homeData.infoa.list.detail.da_pic}`" 
							width="80px" 
							height="80px"
							shape="circle"
						></u--image>
					</view>
					
				</view>
				<view class="item u-flex u-flex-items-center">
					<view class="item-btn u-p-20 u-flex-column u-flex-items-center" @click="sendMsgBtn">
						<u-icon name="chat" size="25" color="#666"></u-icon>
						<view class="u-info u-font-28">私信</view>
					</view>
					<view class="item-btn u-p-20 u-flex-column u-flex-items-center" @click="dingyueShow = true">
						<u-icon name="man-add" size="25" color="#666"></u-icon>
						<view class="u-info u-font-28">订阅</view>
					</view>
					<view class="item-btn u-p-20 u-flex-column u-flex-items-center" @click="followBtn">
						<u-icon name="eye" size="25" color="#666"></u-icon>
						<view class="u-info u-font-28">关注</view>
					</view>
					<view class="item-btn u-p-t-20 u-p-b-20 u-flex-column u-flex-items-center">
						<u-button open-type="share" :customStyle="{border: '0'}">
							<view class="u-flex-column">
								<u-icon name="share-square" size="25" color="#666"></u-icon>
								<view class="u-info u-font-28">分享</view>
							</view>
						</u-button>
						
					</view>
				</view>
			</view>
			<view class="home-main-info u-flex-column u-flex-between">
				 
				<view class="header-bottom u-flex u-flex-items-center u-p-20">
					
					<view class="item u-flex-1 u-flex u-flex-items-end">
						<view class="user-name u-line-1 u-m-l-20 u-m-r-20" v-if="homeData.infoa.list.detail.da_name">
							{{homeData.infoa.list.detail.da_name  }}
						</view>
						<view class="user-sub u-font-28  u-flex u-flex-items-center u-p-l-14 u-p-r-14 u-p-6 u-radius-6 text-base u-m-r-20 u-m-l-10" 
							 v-else-if="homeData.me == 1" @click="handleGoto('/pages/my/home/home_edit')">
							<u-icon name="plus" size="14"></u-icon>
							<view class="u-m-l-8">
								设置昵称
							</view>	
						</view>
						<view class="user-sub u-font-30  u-flex u-flex-items-center u-p-l-14 u-p-r-14 u-p-6 u-radius-6 text-base" v-if="homeData.info.list.attestation">
							<view class="u-line-1">{{homeData.info.list.attestation}}</view> 
							<view class="u-m-l-10">
								<u-icon name="checkmark-circle" color="#007aff" v-if="homeData.info.list.rz == '1'"></u-icon>
								<i class="custom-icon-bangzhu1 custom-icon u-error u-font-36" v-else ></i>
								<!-- <u-icon name="phone-fill" color="#87cfff" v-else></u-icon> -->
							</view> 
						</view>
					</view>
					
				</view>
			</view>
			<view class="user-info u-p-l-30 u-p-r-30 u-m-b-20" v-if="homeData.infoa.list.detail.da_intro">
				<view class="item u-p-15 u-radius-6">
					<u-read-more 
						ref="uReadMore" 
						showHeight="150" 
						toggle 
						textIndent="0"
						fontSize="12"
						closeText="展开"
						>
						<rich-text :nodes="homeData.infoa.list.detail.da_intro"></rich-text> 
					</u-read-more>
				</view>
			</view>
			<view class="user-info u-p-l-30 u-p-r-30 u-m-b-20" v-else-if="homeData.me == 1">
				<view class="item u-p-15 u-radius-6">
					<view class="" @click="handleGoto('/pages/my/home/home_edit')">
						留下你的个性签名让大家了解和关注你
					</view>
				</view>
			</view>
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
				<view class="user-data u-flex u-flex-items-center u-p-20 u-p-l-30 u-p-r-30">
					<view class="item u-flex u-flex-items-center">
						<view class="data">{{homeData.info.follow}}</view>
						<view class="data-label">关注</view>
					</view>
					<view class="item u-flex u-flex-items-center">
						<view class="data">{{homeData.info.follow_me}}</view>
						<view class="data-label">粉丝</view>
					</view>
				</view> 
				<view class="u-p-r-30">
					<u-button
						type="primary"
						v-if="homeData.me == 1"
						size="small"
						:customStyle="{borderRadius: '5px'}" 
						@click="handleGoto('/pages/my/home/home_edit')"
						>
						编辑资料
					</u-button>
					<u-button
						type="primary" 
						size="small"
						v-else
						:customStyle="{borderRadius: '5px'}" 
						@click="followBtn"
						>
						关注
					</u-button>
				</view>
			</view>
			
			<!-- <view class="user-tags u-flex u-flex-items-start u-flex-wrap u-p-l-30 u-p-r-30 u-m-b-20">
				<u-button 
					type="primary" 
					:customStyle="{borderRadius: '5px'}" 
					@click="handleGoto('/pages/my/home/home_edit')"
					>
					编辑资料
				</u-button>
			</view>
			<view class="user-tags u-flex u-flex-items-start u-flex-wrap u-p-l-30 u-p-r-30 u-m-b-20" v-else>
				<u-button 
					type="primary" 
					:customStyle="{borderRadius: '5px'}" 
					@click="follow"
					>
					关注
				</u-button>
			</view> -->
			<view class="home-tabs u-p-l-20 u-p-r-20 u-flex u-flex-items-center u-flex-between " v-if="tabs_list.length > 0">
				<!-- <u-tabs
					:list="tabs_list"
					:current="tabs_current"
					lineHeight="0"
					:activeStyle="activeTabsStyle"
					:itemStyle="itemTabsStyle"
					@change="handleTabsChange"
				> </u-tabs> -->
				<view class="item-tabs u-flex-1 u-flex u-flex-center"
					:class="{
						active: index == tabs_current
					}"
					v-for="(item, index) in tabs_list"
					:key="item.key"
					@click="handleTabsClick({index, item})"
				>
					{{item.name}}
				</view>
			</view>
			<view class="home-list u-p-20">
				<template v-if="activeTabsKey == 'fx_pan'">
					<view class="list-item u-m-b-20" v-for="item in homeList" :key="item.id">
						<cardFx
							:name="item.Sell.name"
							:pid="item.Sell.id"
							:amount="item.Sell.amount"
							:color="item.Sell.color"
							:price="item.Sell.price"
							:dprice="item.Sell.dprice"
							:unit="item.Sell.unit"
							:spec="item.Sell.spec1"
							:delivery_place="item.Sell.delivery_place"
							:express_time="item.Sell.express_time"
							:express_unit="item.Sell.express_unit"
							:trade_type="item.Sell.trade_type"
							:pubDate="item.Sell.post_time"
							:tims="item.Tims"
							:origin="item"
							theme="white"
							@tims="handleClickTims"
							@detail="handleRouteTo"
						></cardFx>
					</view>
				</template>
				<template v-if="activeTabsKey == 'pan'">
					<view class="list-item u-m-b-20" v-for="item in homeList" :key="item.id">
						<cardFx
							:name="item.name"
							:pid="item.id"
							:amount="item.amount"
							:color="item.color"
							:price="item.price"
							:dprice="item.dprice"
							:unit="item.unit"
							:spec="pan == 'b' ? item.spec : item.spec1"
							:delivery_place="item.delivery_place"
							:express_time="item.express_time"
							:express_unit="item.express_unit"
							:trade_type="item.trade_type"
							:pubDate="item.post_time"
							:tims="item.Tims"
							:origin="item"
							theme="white"
							@tims="handleClickTims"
							@detail="handleRouteTo"
						></cardFx>
					</view>
				</template> 
				 
				<template v-if="homeList.length == 0">
					<u-empty
						mode="data"
						:icon="themeConfig.empty"
					>
					</u-empty>
				</template> 
			</view>
		</view> 
		<wxDingyuePopup :show="dingyueShow" @dingyuebtn="dingyueBtn" @close="dingyueShow = false"></wxDingyuePopup>
		<u-loadmore
			v-if="homeList.length>0"
			status="nomore"
		/>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex' 
	import mixShareInfo from '@/config/mixShareInfo' 
	import cardFx from '@/components/cardA/cardFx.vue'
	import wxDingyuePopup from '@/components/wxDingyuePopup/wxDingyuePopup.vue'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				homeData: {},
				login: '',
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
				tabs_list: [],
				content: '',
				fxImg: 'https://img-album.rawmex.cn/200-200/',
				dingyueShow: false
			};
		},
		components: { 
			cardFx,
			wxDingyuePopup
		},
		async onLoad(options) {
			if(!options.hasOwnProperty('login')) {
				this.handleGoto({
					type: 'reLaunch',
					url: '/pages/index/index'
				})
				return
			}
			this.sendDingyue()
			this.login = options.login
			uni.showLoading()
			await this.getHomeData()
		},
		computed: {
			...mapState({ 
				typeConfig: state => state.theme.typeConfig,
			}),
			themeConfig() {
				return this.typeConfig.white
			},
			homeList() {
				if(!this.tabs_list[this.tabs_current]) return []
				return this.tabs_list[this.tabs_current].list
			},
			activeTabsKey() {
				if(!this.tabs_list[this.tabs_current]) return ''
				return this.tabs_list[this.tabs_current].key
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({ 
				sendDingyue: 'user/sendDingyue',
			}),
			initTabsData() {
				let arr = []
				if(this.homeData.sell1_show == 1) {
					arr.push({ name: this.homeData.sell1_name, list: this.homeData.sell1 || [], url: this.homeData.sell1_url, key: 'fx_pan'})
				}
				if(this.homeData.sell2_show == 1) {
					arr.push({ name: this.homeData.sell2_name, list: this.homeData.sell2 || [], url: this.homeData.sell2_url, key: 'pan'})
				}
				if(this.homeData.sell3_show == 1) {
					arr.push({ name: this.homeData.sell3_name, list: this.homeData.sell3 || [], url: this.homeData.sell3_url, key: 'card'})
				}
				this.tabs_list = arr
			},
			async getHomeData() {
				const res = await this.$api.homepage({params: {login: this.login}})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.homeData = res;
					this.initTabsData()
					 
					this.$nextTick(() => {
										this.$refs.uReadMore.init();
									})
				}
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsClick({item, index}) {  
				if(item.url) {
					uni.navigateTo({
						url: item.url
					})
					return
				}
				this.tabs_current = index
				// this.changeTabsStatus('disabled', true)
				// this.initParamas();
				// uni.showLoading();
				// await this.getData()
				// this.changeTabsStatus('disabled', false)
			},
			handleRouteTo(data) {
				this.handleGoto({
					url: '/pages/index/pan/panDetail',
					params: {
						id: data.origin.sell_id, 
						fxid: data.origin.id, 
						pan:'s',
					}
				})  
			},
			handleClickTims({tims, id, origin}) {
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login: `${tims.login}`,
						content: `咨询${this.pan=='s'? '卖盘': '买盘'}：${origin.name}，https://www.rawmex.cn/sell-${id}.html`
					}
				}) 
			},
			async followBtn() {  
				uni.showLoading()
				const res = await this.$api.follow({
					params: {
						login: this.login,
						follow: 1
					}
				})
				if(res.code == 1) {
					uni.showToast({
						title: res.msg, 
					}) 
				}
			},
			makephone(n) {
				if(!n) return
				uni.makePhoneCall({
					phoneNumber: n+''
				});
			},
			sendMsgBtn() {
				uni.showModal({
					title: '发送私信提醒达人立即联系您',
					content: '达人需微信订阅后才能收到消息',
					confirmText: '立即发送',
					success:  async (res) => {
						if (res.confirm) {
							if(this.homeData.message == 1) {
								this.handleGoto({
									url: '/pages/my/msg/msgDetail',
									params: { login: this.login }
								}) 
							}
							else {
								await this.sendMsg()
							}
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async sendMsg() {
				const res = await this.$api.message_xcx({params: {login: this.login}})
				if(res.code == 1) {
					uni.showToast({
						title: res.msg
					})
				}
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
<style lang="scss" >
	page {
		min-height: 100vh;
		/deep/ {
			.card-w {
				box-shadow: none!important;
			}
		}
	}
</style>
<style lang="scss" scoped>
.home {
	.home-header {
		position: relative;
		height: 120px;
		.header-bg {
			background-size: cover;
			background-repeat: no-repeat;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
		}
	}
	.home-main-info {
		box-sizing: border-box;
		position: relative;
		z-index: 20;
		.header-top {
		}
		.header-bottom {
			// background: linear-gradient(to bottom, transparent, rgba(0,0,0,.5));
			.item-avatar { 
				border-radius: 50px;
				border: 3px solid $u-primary;
			}
			.user-name {
				font-weight: bold;
				font-size: 24px;
			}
			.user-sub {
				// background-color: #f3f9ff;
			}
			
		}
	}
	.home-main {
		background-color: #fff;
		position: relative;
		z-index: 30;
		top: -30px;
		border-radius: 30px 30px 0 0;
		// box-shadow: 0 -5px 5px rgba(0,0,0,.3);
		.main-header {
			.item {
				&.item-avatar {
					position: relative;
					.avatar {
						position: absolute;
						top: -20px;
						border: 4px solid #fff;
						border-radius: 50%;
						width: 80px;
						height: 80px;
						background-color: #fff;
					}
				}
			}
		}
		.user-data {
			>.item {
				margin-right: 15px;
				&:last-child {
					margin-right: 0;
				}
				.data {
					color: #333;
					font-weight: bold;
				}
				.data-label {
					margin-left: 6px;
					color: #999;
				}
			}
		}
		.user-tags {
			.item {
				margin-right: 5px;
				margin-bottom: 5px;
				&:last-child {
					margin-right: 0;
				}
			}
		}
		.user-info {
			.item {
				background-color: #f2f0f1;
			}
		}
		.home-tabs {
			border-top: 6px solid #f8f8f8;
			box-shadow: 0 10px 15px rgba(0,0,0,0.1);
			.item-tabs {
				font-size: 17px;
				margin-right: 15px;
				color: #999;
				position: relative;
				line-height: 50px;
				&:last-child {
					margin-right: 0;
				}
				&::after {
					content: '';
					position: absolute;
					display: none;
					width: 30px;
					height: 3px;
					background-color: #000;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
				}
				&.active {
					color: #000;
					font-weight: bold;
					&:after {
						display: blcok;
					}
				}
			}
		}
		.home-list { 
		}
	}
}
</style>
