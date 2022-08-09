<template>
	<view class="text-white w" :style="{
		backgroundColor: themeConfig.pageBg
	}">
		<navBar fixed :title="onlineControl.title" ></navBar>
		<u-status-bar></u-status-bar>
		
		<custom-official-account 
			class="cont" 
			:msg="gz_msg" 
			:isFollow="false" 
			:max="-1"
		></custom-official-account>
		<view :style="{
			backgroundColor: themeConfig.navBg,
			paddingTop: '44px'
		}">
			<view @click="handleGoto({url:'/pages/index/search/search'})" class="step1 search-w u-p-l-20 u-p-r-20 u-p-b-20 u-p-t-10">
				<u-search
					placeholder="搜索商品" 
					:value="keyword"
					:showAction="false"
					disabled
					:bgColor="themeConfig.pageBg"
				></u-search>
			</view>
			<view class="u-p-b-10 step2">
				<u-notice-bar
					v-if="notice.length > 0"
					:bgColor="themeConfig.navBg" 
					:color="themeConfig.warn" 
					:text="notice.map(ele => ele.title)"
					direction="column"
					mode="link"
					@click="handleNoticeIndex"
				></u-notice-bar>
			</view>
			
		</view>
		
		<view class="main u-p-30">
			<image class="step3 banner-img u-m-b-30" src="https://wx.rawmex.cn/Public/memu/xxx.png" mode="widthFix"></image>
		
			<view class="card-list">
				<view class="card-item u-m-b-20"
					v-for="(item, index) in panList"
					:key="item.pan"
				>
					<panCard
						:list="item.list"
						:name="item.name"
						:icon="item.icon"
						:pan="item.pan"
						@settingClick="handleSettingClick"
					></panCard>
				</view>
			</view>
			
			<view class="card-w u-m-b-20" v-if="marketCardList && marketCardList.length > 0">
				<view class="card-title u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-12">
					<view class="item u-flex u-flex-items-center">
						<i class="custom-icon custom-icon-shop u-font-40" :style="{color: themeConfig.followCard.iconText}"></i>
						<text class="u-p-l-10" :style="{color: themeConfig.followCard.titleText}">商品市场</text>
					</view>
				</view>
				<u-scroll-list :indicator="false">
					<view class="card-tabs u-flex u-flex-items-center">
						<view class="u-flex u-flex-items-center item u-m-r-30 u-p-30"
							v-for="(item, index) in marketCardList"
							:key="index"
							:style="{
								minWidth: '25%',
								boxSizing: 'border-box',
								backgroundColor: themeConfig.marketCardTabs.itemStyle.backgroundColor,
								color: themeConfig.marketCardTabs.itemStyle.color,
								borderRadius: themeConfig.marketCardTabs.itemStyle.borderRadius,
							}"
							@click="handleMarketCardClick(index)"
						>
							<i class="custom-icon-goods custom-icon" :style="{color: themeConfig.marketCardTabs.iconText}"></i>
							<text class="u-p-l-10" style="white-space: nowrap;">{{item.name}}</text>
						</view>
					</view>
				</u-scroll-list>
			</view>
			
			<view class="hq-card-w u-p-20" :style="{backgroundColor: themeConfig.hqCard.hqBg}">
				<view class="card-title u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-12">
					<view class="item u-flex u-flex-items-center">
						<i class="custom-icon u-font-40 custom-icon-shujukanban" :style="{color: themeConfig.followCard.iconText}"></i>
						<text class="u-p-l-10" :style="{color: themeConfig.followCard.titleText}">今日行情</text>
					</view>
					<view @click="handleSettingClick" class="item u-flex u-flex-items-center" :style="{color: themeConfig.followCard.subText}">
						<i class="custom-icon custom-icon-shezhi1 u-font-28" ></i>
						<text class="u-font-28 u-p-l-10">设置商品</text>
					</view>
				</view>
				<view class="hq-main u-flex u-flex-wrap">
					<view class="hq-item u-m-b-20"
						v-for="(item, index) in hqList"
						:key="item.ppid"
						:style="{
							color: item.amp > 0 ? themeConfig.redText : (item.amp < 0?themeConfig.greenText : themeConfig.pageText )
						}"
						@click="handleGoto({url: '/pages/baojia/list/list', params: {id: item.ppid, dir: 'jysp' }})"
					>
						<view class="u-flex u-flex-between u-flex-items-center u-p-t-20 u-p-b-10 u-p-l-20 u-p-r-20"
							:style="{
								backgroundColor: themeConfig.hqCard.cardTopBg,
							}"
						>
							<view class="u-font-34 u-line-1" :style="{color: themeConfig.baseText}">{{item.name}}</view>
							<view class="u-font-28">{{item.amp>=0? '+' :''}}{{item.amp}}%</view>
						</view>
						<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-p-b-20 u-p-t-10"
							:style="{
								backgroundColor: themeConfig.hqCard.cardBottomBg
							}"
						>
							<view class="u-font-34">{{item.ave}}元</view>
						</view>
						
					</view>
				</view>
			</view>
			
			
		</view>
		<!-- <xky-guideStep :step="step" :otherHeight="$u.sys().safeAreaInsets.top + 44"></xky-guideStep> -->
		<u-safe-bottom></u-safe-bottom>
		<menusBar activeIndex="0" :theme="typeActive" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				keyword: '',
				indexList: [],
				notice: [],
				hqList: [],
				marketCardList: [],
				curP: 1,
				loadstatus: 'loadmore',
				gz_msg: '关注微信公众号',
				panList: [
					{
						pan: 's',
						name: '卖盘关注',
						icon: 'custom-icon-guanzhu',
						list: []
					},
					{
						pan: 'b',
						name: '买盘关注',
						icon: 'custom-icon-guanzhu1',
						list: []
					},
				],
				onlineControl: {
					title: '首页'
				},
				attentionJSON: ''
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				echartsConfig: 'theme/echartsConfig',
				sys: 'theme/sys'
			})
		},
		onLoad() {
			console.log(uni.$u.sys())
			uni.showLoading()
			this.getHome()
			this.getMarketCard()
			this.getNotice()
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleNoticeIndex(index) {
				this.handleGoto({
					type: 'reLaunch',
					url: `/pages/index/notice/notice`
				})
			},
			async getNotice() {
				const res = await this.$api.noticeList({params: {p: 1}})
				if(res.code == 1) {
					this.notice = res.list
				}
			},
			handleMarketCardClick(index) {
				this.handleGoto({
					url: '/pages/index/market/market',
					params: {
						current: index
					}
				})
			},
			refreshList() {
				this.initParamas()
				this.getHome()
				this.getMarketCard()
			},
			initParamas() {
				this.panList[0].list = []
				this.panList[1].list = []
				this.hqList = []
			},
			handleSearch(v) {
				console.log(v)
			},
			async getMarketCard() {
				const res = await this.$api.getStandard({
					params: {
						is_market: 1
					}
				})
				if(res.code == 1) {
					this.marketCardList = res.list
				}
			},
			async getHome() {
				const res = await this.$api.getHome()
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.panList[0].list = this.str2list(res.config.plate1)
					this.panList[1].list = this.str2list(res.config.plate2)
					this.hqList = res.list.quotation
					this.gz_msg = res.gz_msg
					this.attentionJSON = JSON.stringify(res.config)
					 
				}
			},
			str2list(str) {
				return str.split(',').map(ele=> {
					let arr = ele.split('|')
					return {
						name: arr[0],
						id: arr[1],
					}
				})
			},
			handleSettingClick({pan}) {
				let current 
				if(pan == 's') current = 0
				else if(pan == 'b') current = 1
				else current = 2
				this.handleGoto({
					url: '/pages/index/attention/attention', 
					params: {
						current: current,
						list: encodeURIComponent(this.attentionJSON)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.w {
		min-height: 100vh;
		padding-bottom: 50px;
	}
	.main {
		.banner-img {
			width: 100%;
			border-radius: 16rpx;
		}
		.hq-card-w {
			border-radius: 12rpx;
			
		}
		.hq-main {
			width: 100%;
			.hq-item {
				width: 48%;
				margin-right: 4%;
				border-radius: 10rpx;
				overflow: hidden;
				&:nth-of-type(2n) {
					margin-right: 0;
				}
			}
		}
	}
	
	.cont {
		position: fixed;
		bottom: 70px;  
		bottom: calc(70px + constant(safe-area-inset-bottom));  
		bottom: calc(70px + env(safe-area-inset-bottom));  
		left: 50%;
		transform: translateX(-50%);
		width: 700rpx;
		z-index: 50;
	}
</style>
