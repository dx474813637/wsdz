<template>
	<view class="w">
		<view class="tabs-w">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			> 
				<view
					slot="right"
					class="u-p-r-20 u-flex u-flex-items-center" 
					style="width: 140px;"
				>
					<u-subsection 
						:list="wallet_list" 
						mode="button" 
						:current="wallet_current"
						keyName="name"
						@change="subsectionChange"
						></u-subsection>
				</view>
			</u-tabs>
		</view>
		<view class="list">
			<u-list
				height="100%"
				enableBackToTop
				@scrolltolower="scrolltolower"
				:preLoadingScreen="100"
			>
				<u-list-item
					v-for="(item, index) in list"
					:key="item.id"
				>
					<view class="u-p-10">
						<view class="u-p-20 bg-white u-radius-10 uni-shadow-base">
							<view class="header u-p-10  u-m-b-10 u-flex u-flex-between text-base u-flex-items-center u-font-28">
								<view class="item">
									{{item.ctime}}
								</view>
								<view class="item" :class="{
									'text-success': item.state == '1',
									'text-error': item.state == '2',
									'text-primary': item.state == '3',
									'text-ligit2': item.state == '0'
								}">
									{{item.state |bankcardState2Str}}
								</view>
							</view>
							<BankCard
								:bank_class="item.bank_class"
								:bank_name="item.bank_name"
								:bank_sub="item.bank_accname"
								:bank_no="item.bank_accno"
								:origin="item"
								@detail="handleCardDetail"
							></BankCard>
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
		<tabBar :customStyle="{
			'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
		}">
			<view class="u-flex u-flex-items-center u-p-20"> 
				<view class="u-flex-1 u-m-r-10" @click="handleGoto({url: '/pages/my/money/card_add', params: {wallet: wallet_type}})" >
					<u-button type="error" shape="circle" icon="plus-circle">添加银行卡</u-button>
				</view>
				<view class="u-flex-1 u-m-l-10" @click="show_zzlc = true" >
					<u-button type="primary" shape="circle" icon="file-text">转账充值流程</u-button>
				</view>
			</view>
		</tabBar>
		
		<u-popup
			:show="show_zzlc" 
			mode="bottom"  
			@close="show_zzlc = false"  
			round="25"
			bgColor="#fff"
			>
			<view class="wrapper" :style="{
				backgroundColor: themeConfig.pageBg,
				color: themeConfig.baseText,
			}">
				<view class="header u-p-18"  :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-32">转账充值流程</text>
						</view>
					</view>
				</view>
				<view class="main" :style="{
					backgroundColor: themeConfig.pageBg,
				}">
					<u-list height="100%">
						<view class="u-p-20">
							<view class="u-radius-10 bg-white uni-shadow-base u-p-20 u-flex u-flex-items-center u-m-b-20">
								<view class="item">
									<u--image src="http://zc.toocle.com/Public/wp/img/yd1.png" mode="aspectFit" width="60" height="60"></u--image>
								</view>
								<view class="item u-m-l-20">
									<view class="u-font-28 u-m-b-10"> 手机端下载并安装“平安数字口袋APP” </view>
									<view class="u-font-24 text-base"> 点击左侧图标进行下载</view>
									<view class="u-font-24 text-base"> 安卓与苹果系统自动识别安装</view>
								</view>
							</view>
							<view class="u-radius-10 bg-white uni-shadow-base u-m-b-20 boxbox">
								<view class="header u-p-20 bg-grey u-flex u-flex-items-center u-flex-between u-m-b-20">
									<view class="item u-flex u-flex-items-center">
										<i class="custom-icon-vipcard custom-icon text-primary"></i>
										<text class="u-font-28 u-m-l-20">转账白名单流程</text>
									</view>
								</view>
								 <view class="ctx u-p-l-30 u-p-r-30">
									  <u-swiper
										 :list="imgList"
										 indicator
										 indicatorMode="line"
										 keyName="url" 
										 height="70vw"
										 interval="6000"
										 imgMode="scaleToFill"
										 @change="swiperChange"
										></u-swiper> 
										<view class="u-p-t-30 u-p-b-40 u-font-28 u-text-center text-base">
											<view class="u-m-b-10">
												{{imgList[img_index].title}}
											</view>
											<view class="">
												{{imgList[img_index].sub}}
											</view> 
										</view>  
								 </view>
							</view>
							<view class="u-radius-10 bg-white uni-shadow-base u-m-b-20 boxbox">
								<view class="header u-p-20 bg-grey u-flex u-flex-items-center u-flex-between">
									<view class="item u-flex u-flex-items-center">
										<i class="custom-icon-moneybag custom-icon text-primary"></i>
										<text class="u-font-28 u-m-l-20">转入账号</text>
										<text class="u-font-24 text-base u-m-l-10">[转账成功后即时入账至您的支付账号]</text>
									</view>
								</view>
								 <view class="ctx u-p-20">
									 <view class="u-p-l-20 u-p-r-20 u-font-28 u-m-b-20 text-light2">
										  <view class="">个人用户，可使用手机银行，</view>
										  <view class="">企业用户可使用网银，向以下账户发起转账：</view>
									 </view>
									 <view class="u-radius-10 u-p-20" style="background-color: #f8f8f8;">
									 	<view class="item u-flex u-flex-items-center u-m-b-20">
									 		<view class="u-font-28 text-base" style="flex: 0 0 60px">户名</view>
									 		<view class="u-font-28 u-flex-1 u-text-right text-error">平安银行电子商务交易资金待清算专户（网盛生意宝）</view>
									 		<view class="u-m-l-20" >
												<u-tag text="复制" size="mini" type="primary" @click="copy('平安银行电子商务交易资金待清算专户（网盛生意宝）')"></u-tag>
											</view>
									 	</view>
									 	<view class="item u-flex u-flex-items-center u-m-b-20">
									 		<view class="u-font-28 text-base" style="flex: 0 0 60px">账号</view>
									 		<view class="u-font-28 u-flex-1 u-text-right text-error">15000103221134</view>
									 		<view class="u-m-l-20" >
												<u-tag text="复制" size="mini" type="primary" @click="copy('15000103221134')"></u-tag> 
											</view>
									 	</view>
									 	<view class="item u-flex u-flex-items-center u-m-b-20">
									 		<view class="u-font-28 text-base" style="flex: 0 0 60px">户名</view>
									 		<view class="u-font-28 u-flex-1 u-text-right text-error">平安银行西湖支行</view>
									 		<view class="u-m-l-20" >
												<u-tag text="复制" size="mini" type="primary" @click="copy('平安银行西湖支行')"></u-tag>  
											</view>
									 	</view>
									 </view>
								 </view>
							</view>
						</view>
					</u-list>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import BankCard from '@/pages/my/components/BankCard/BankCard.vue'
	export default {
		data() {
			return {
				wallet_type: 'B',
				keyword: '', 
				tabs_current: 1,
				img_index: 0,
				activeTabsStyle: {
					fontSize: '34rpx',
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				tabs_list: [
					{
						name: '全部',
						disabled: false,
						state: 'all'
					},
					{
						name: '已绑定',
						disabled: false,
						state: '1'
					}, 
					// {
					// 	name: '已解绑',
					// 	disabled: false,
					// 	state: '3'
					// },
					// {
					// 	name: '绑定失败',
					// 	disabled: false,
					// 	state: '2'
					// },
				],
				wallet_current: 0,
				wallet_list: [
					{
						name: '付款账户',
						value: 'B', 
					},
					{
						name: '收款账户',
						value: 'S', 
					},
				],
				indexList: [],
				curP: 1,
				show_zzlc: false,
				loadstatus: 'nomore',
				imgList: [
					{
						url: 'http://zc.toocle.com/Public/wp/img/bank-card-cz1.jpg',
						title: '以提现卡对应的手机号注册',
						sub: '并登录，进入：商户专区',
					},
					{
						url: 'http://zc.toocle.com/Public/wp/img/bank-card-cz2.jpg',
						title: '进入：转账白名单维护',
						sub: '—>待确认页',
					},
					{
						url: 'http://zc.toocle.com/Public/wp/img/bank-card-cz3.jpg',
						title: '对待确认记录，点击右上角的“添加”',
						sub: '后续，白名单确认完成后，可进行转账充值',
					},
				]
			};
		},
		onLoad(opt) {
			if(opt.hasOwnProperty('current')) {
				this.tabs_current = opt.current
			}
			if(opt.hasOwnProperty('wallet')) {
				this.wallet_type = opt.wallet
				this.wallet_current = Number(this.wallet_list.findIndex(ele => ele.value == this.wallet_type))
			}
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				sino: state => state.sinopay.sino,
				myCpy: state => state.user.myCpy,
				sinoFund: state => state.sinopay.sinoFund,
			}),
			themeConfig() {
				return this.typeConfig.white
			},
			list() {
				if(this.tabs_list[this.tabs_current].state == 'all') return this.indexList
				return this.indexList.filter(ele => ele.state == this.tabs_list[this.tabs_current].state )
			},
			wallet() {
				let w = {};
				if(!this.sinoFund || this.sinoFund.length == 0) return w;
				w = this.sinoFund.filter(ele => ele.type == this.wallet_type)[0] || {}
				return w
			}
		},
		components: {
			BankCard
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
				// this.loadstatus = 'loadmore'
			},
			handleSearch(v) {
				console.log(v)
			},
			swiperChange(e) {   
				this.img_index = e.current
			},
			copy(data) {
				uni.setClipboardData({
					data: data,
					success: function () {
						console.log('success');
					}
				});
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async subsectionChange(index) { 
				this.changeTabsStatus('disabled', true)
				this.wallet_current = index 
				this.wallet_type = this.wallet_list[this.wallet_current].value
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			},
			async handleTabsChange(value) {
				this.changeTabsStatus('disabled', true)
				this.tabs_current = value.index
				console.log(value)
				if(value.state == 'all') {
					
					this.initParamas();
					uni.showLoading();
					await this.getData()
				}
				this.changeTabsStatus('disabled', false)
			},
			scrolltolower() {
				// this.getMoreData()
			},
			async getData() { 
				const res = await this.$api.sino_fund_account_list_bind({
					params: {
						account_id: this.wallet.id
					}
				})
				if(res.code == 1) {
					this.indexList = res.list 
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			handleCardDetail({id}) {
				uni.navigateTo({
					url: '/pages/my/money/bank_card_detail?id='+ id
				})
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
	.bg-grey {
		background: linear-gradient(to bottom,  #ffffff 0%,#e8e4e4 100%);
	}
	.boxbox {
		overflow: hidden;
	}
	.w {
		height: 100%;
		box-sizing: border-box;
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}
	.list {
		height: calc(100% - 104px);
		
	}
	.wrapper {
		width: 100%;
		border-radius: 30rpx 30rpx 0 0 ;
		overflow: hidden;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			left: 50%;
			top: 5px;
			transform: translateX(-50%);
			width: 25%;
			height: 4px;
			background-color: #eee;
			border-radius: 8px;
			
		}
		.header {
		}
		.main {
			background-color: #f8f8f8;
			height: 70vh;
			width: 100%;
			box-sizing: border-box;
		}
	}
</style>
