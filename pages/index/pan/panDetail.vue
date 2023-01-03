<template>
	<view class="w " :style="{
		backgroundColor: themeConfig.pan.pageBg,
		color: themeConfig.pan.pageText
	}">
		
		<u-sticky>
			<navBar
				:title="`${onlineControl.title? onlineControl.title :(pan == 's'? '卖盘详情' : '买盘详情')}`" 
				:backBtn="backBtn"
				@backEvent="handleBackEvent"
			></navBar>
		</u-sticky>
		<u-notice-bar bgColor="#ff2a2a" color="#fff" text="已下架" v-if="list.state != '1'"></u-notice-bar>
		<u-notice-bar bgColor="#ff6a00" color="#fff" text="已过期" v-else-if="list.hasOwnProperty('expressed') && list.expressed <= 0"></u-notice-bar>
		<view class="pan-header u-p-10" :style="{
			backgroundColor: themeConfig.pan.headerBg,
		}">
			<view class="u-p-10 u-p-l-30 u-p-r-30 u-flex u-flex-items-start u-flex-between">
				<view class="u-flex u-flex-items-center u-flex-wrap u-flex-1">
					<text class="u-font-36 u-p-r-20" :style="{
						color: themeConfig.pan.headerText
					}">{{list.name}}</text>
					<text class="tag u-font-24 u-m-r-10" :style="{
						borderColor: themeConfig.pan.tagcolor,
						color: themeConfig.pan.lightcolor,
					}">{{pan == 's'?'供 应': '求购'}}</text>
					<text class="tag u-font-24 " :style="{
						borderColor: themeConfig.pan.tagcolor,
						color: themeConfig.pan.lightcolor,
					}"  >
						<template v-if="list.trade_mode == '2'">
							一口价
						</template>
						<template v-else-if="list.trade_mode == '1'">
							竞价
						</template>
						<template v-else>
							议价
						</template>
					</text>
					<view >
						<u-icon
							name="photo" 
							v-if="list.list_pics.length > 0" 
							@click="imgWrapShow = true"
							:color="themeConfig.pan.imgBtn"
							size="20"
						></u-icon>
					</view>	
					
				</view>
				<view class="u-p-l-20 u-flex u-flex-items-center u-font-28 u-p-t-6" :style="{
						color: themeConfig.warn
					}"
					@click="handleTimesBtn('broker43', `投诉${pan=='s'? '卖盘': '买盘'}：${list.name}，https://www.rawmex.cn/${pan=='s'? 'sell': 'buy'}-${id}.html`)"
				>
					<u-icon 
						:name="typeActive == 'dark'? 'bell' : 'bell-fill' "
						:color="themeConfig.warn"
						></u-icon>
					<text class="u-p-l-5">举报</text>
				</view>
			</view>
			
			<view class="u-p-10 u-p-l-30 u-p-r-30 u-flex u-flex-items-center u-flex-between u-flex-wrap">
				<view class="price u-flex u-flex-items-center">
					<text class="u-font-40"
						:style="{
							color: themeConfig.pan.lightcolor,
							fontSize: '26px'
						}"
					>{{list.price | price2str(list.dprice)}}</text>
					<text class="u-p-l-10 "
					 v-if="list.price>0"
					 :style="{
						color: themeConfig.pan.headerSubText
					}">元/{{list.unit}}</text>
				</view>
				<view class="u-flex">
					<text class="tag u-font-30 u-p-5 u-p-l-20 u-p-r-20" :style="{
						borderColor: themeConfig.pan.tagcolor,
						color: themeConfig.pan.headerSubText
					}">{{list.amount}}{{list.unit}}</text>
					<text class="tag u-font-30 u-m-l-20 u-p-5 u-p-l-20 u-p-r-20" :style="{
						borderColor: themeConfig.pan.tagcolor,
						color: themeConfig.pan.headerSubText
					}">{{list.trade_type | tradeType}}</text>
				</view>
			</view>
			<view class="u-p-15 u-p-l-30 u-p-r-30">
				<u-line :color="themeConfig.pan.headerSubText" length="100%" dashed></u-line>
				<view class="u-p-t-30 u-p-b-80 u-font-28" :style="{
					color: themeConfig.pan.headerSubText
				}">
					{{pan == 's'? list.spec1: list.spec}}
				</view>
			</view>
			
		</view>
		
		<view class="pan-main">
			<view class="main-box u-font-30 u-m-b-30"
				:style="{
					backgroundColor: themeConfig.pan.boxBgTop
				}"
				v-if="list.trade_mode == '1'"
			>
				<view class="main-box-title u-flex u-flex-items-center u-flex-between u-p-20 u-p-l-30 u-p-r-30"
					
				>
					<view class="u-flex u-flex-items-center">
						<i class="custom-icon-scoretop custom-icon u-m-r-10" :style="{color: themeConfig.pan.lightcolor}"></i>
						<text :style="{color: themeConfig.pan.baseText}">竞拍信息</text>
					</view>
					<view class="u-flex u-flex-items-center" @click="jpListShow = true" >
						<text :style="{color: themeConfig.pan.baseText}">竞拍记录</text>
						<i class="custom-icon-fenlei custom-icon u-m-l-10" :style="{color: themeConfig.pan.lightcolor}"></i>
					</view>
				</view>
				<view class="u-p-10 u-p-l-20 u-p-r-20">
					<view class="jp-bar u-p-20 u-flex u-flex-items-center u-flex-between"
						:style="{
							backgroundColor: themeConfig.pan.headerBg,
							color: themeConfig.pan.headerText
						}" 
					>
						<view class="item u-flex u-flex-column ">
							<view class="u-m-b-10">距竞拍开始还剩</view>
							<view>
								<u-count-down
									:time="30 * 60 * 60 * 1000"
									format="DD:HH:mm:ss"
									autoStart
									millisecond
									@change="onJpTimeChange"
								>
									<view class="time">
										<text class="time__item">{{ timeData.days }} 天</text>
										<text class="time__item u-m-l-10">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}&nbsp;时</text>
										<text class="time__item u-m-l-10">{{ timeData.minutes }} 分</text>
										<text class="time__item u-m-l-10">{{ timeData.seconds }} 秒</text>
									</view>
								</u-count-down>
							</view>
							
						</view>
						<view class="item u-flex u-flex-items-center">
							<!-- <view class="u-m-l-10"> 
								<u-button type="primary"  >竞 价</u-button>
							</view> -->
							<view class="u-m-l-10"> 
								<u-button type="error"  >预 约</u-button>
							</view>
						</view>
					</view>
				</view>
				<view  :class="{
					'u-p-15': typeActive == 'white'
				}" >
					<view class="main-box-content "
						:class="{
							'u-p-15': typeActive == 'white',
							'u-p-30': typeActive == 'dark'
						}"
						:style="{
							backgroundColor: themeConfig.pan.boxBg,
							borderRadius: typeActive == 'white'?'20rpx': '0',
						}"
					>
						<view class="item u-flex u-flex-items-baseline u-m-b-20">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">起拍价</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">2400 元/吨</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">当前叫价</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">2400 元/吨</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">加价幅度</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">100 元/吨</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">每手尺寸</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">2 吨</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">至少下单</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">1 手</view>
						</view>
					</view>
				</view>
				
				
			</view>
			
			<view class="main-box u-p-30 u-font-30 u-m-b-30"
					:style="{
						backgroundColor: themeConfig.pan.boxBg,
					}"
				>
				<view class="item u-flex u-flex-items-baseline u-m-b-20">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">交货地</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">{{list.delivery_place}}</view>
				</view>
				<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="list.settle_mode">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">交货方式</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">{{list.settle_mode | settleMode}}</view>
				</view>
				<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="list.settle_month">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">交收期</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">{{list.settle_month}}月{{list.settle_date | date2szx}}</view>
				</view>
				<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="list.dprice">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">点价规则</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">{{list.dprice}}</view>
				</view>
				<view class="item u-flex u-flex-items-baseline u-m-b-20">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">发布时间</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">
						{{list.post_time | date2timestamp | timeFrom}} 
						<text :style="{color: themeConfig.pan.pageTextSub}">({{list.post_time}})</text>	
					</view>
				</view>
				<view class="item u-flex u-flex-items-baseline">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">有效时间</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">
						{{list.express_time}}{{list.express_unit | expressUnit}}
						<text :style="{color: themeConfig.pan.pageTextSub}"></text>	
					</view>
				</view>
			</view>
			
			
			<view class="main-box u-font-30 u-m-b-30"
				:style="{
					backgroundColor: themeConfig.pan.boxBgTop
				}"
				v-if="cpy.id"
			>
				<view class="main-box-title u-flex u-flex-items-center u-flex-between u-p-20 u-p-l-30 u-p-r-30"
					
				>
					<view class="u-flex u-flex-items-center">
						<i class="custom-icon-friend custom-icon u-m-r-10" :style="{color: themeConfig.pan.lightcolor}"></i>
						<text :style="{color: themeConfig.pan.baseText}">{{cpy.name}}</text>
					</view>
					<view class="u-flex u-flex-items-center" @click="handleGoto({url: '/pages/index/pan/cardList', params: {pan: 's', id:cpy.id}})">
						<i class="custom-icon-card_fill custom-icon" :style="{color: themeConfig.pan.lightcolor}"></i>
					</view>
				</view>
				<view  :class="{
					'u-p-15': typeActive == 'white'
				}" >
					<view class="main-box-content "
						:class="{
							'u-p-15': typeActive == 'white',
							'u-p-30': typeActive == 'dark'
						}"
						:style="{
							backgroundColor: themeConfig.pan.boxBg,
							borderRadius: typeActive == 'white'?'20rpx': '0',
						}"
					>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.contact">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">联系人</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">{{cpy.contact}}</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.address">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">地址</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">{{cpy.address}}</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.mobile">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">手机</view>
							<view class="item-content u-flex u-flex-items-center" 
								@click="makePhone(cpy.mobile)"
								:style="{
									color: themeConfig.pan.baseText
								}">
								{{cpy.mobile_show ? cpy.mobile : cpy.mobile1}}
								<i class="custom-icon-dianhua custom-icon u-m-l-10"></i>
							</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.tel">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">电话</view>
							<view class="item-content u-flex u-flex-items-center" 
								@click="makePhone(cpy.tel)"
								:style="{
									color: themeConfig.pan.baseText
								}">
								{{cpy.tel}}
								<i class="custom-icon-dianhua custom-icon u-m-l-10"></i>
							</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.email">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">邮箱</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">{{cpy.email}}</view>
						</view>
						<view class="item u-flex u-flex-items-baseline">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">发布人</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">
								{{list.post_type | postType2fbr}}
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
		
			<view class="main-box u-font-30 u-m-b-30"
					:style="{
						backgroundColor: themeConfig.pan.boxBg,
					}"
				>
				<view class="main-box-title u-flex u-flex-items-center u-flex-betweenu-font-32"
					:style="{
						backgroundColor: themeConfig.pan.boxBgTop
					}"
				>
					<view class="item  u-flex u-flex-items-center u-flex-center" :style="{
							backgroundColor: tabs_current == index? themeConfig.pan.tabBgActive : themeConfig.pan.tabBgInactive,
							color: tabs_current == index? themeConfig.pan.tabTextActive : themeConfig.pan.tabTextInactive
						}"
						v-for="(item,index) in tabs_desc"
						:key="index"
						@click="tabs_current = index"
					>{{item.label}}</view>
					
				</view>
				<view class="main-box-content u-p-20">
					<view class=" u-p-20" :style="{
						color: themeConfig.pan.pageTextSub,
						lineHeight: '22px'
					}"
					>
						<template
							v-if="tabs_desc[tabs_current].content"
						>
							<!-- {{tabs_desc[tabs_current].content}} -->
							<rich-text :nodes="tabs_desc[tabs_current].content"></rich-text>
						</template>
						<template v-else>
							<u-empty
								mode="data"
								:icon="themeConfig.empty"
								text="无内容"
							>
							</u-empty>
						</template>
					</view>
				</view>
				
			</view>
			
			<view class="u-flex u-flex-items-center u-flex-center u-p-20 u-m-b-30"
				:style="{
					color: themeConfig.pan.lightcolor
				}"
			>{{`该${pan == 's'? '卖家的其他供应' : '买家的其他求购'}`}}</view>
			
			<view class="other-list">
				<view class="item u-m-b-20"
					v-for="(item, index) in indexList"
					:key="item.id"
				>
					<cardA
						:name="item.name"
						:pid="item.id"
						:amount="item.amount"
						:color="item.color"
						:price="item.price"
						:unit="item.unit"
						:spec="pan == 'b' ? item.spec : item.spec1"
						:delivery_place="item.delivery_place"
						:express_time="item.express_time"
						:express_unit="item.express_unit"
						:trade_type="item.trade_type"
						:pubDate="item.post_time"
						:origin="item"
						@tims="handleClickTims"
						@detail="handleRouteTo"
					></cardA>
				</view>
			</view>
			
					
		</view>
		
		
		
		<u-safe-bottom></u-safe-bottom>
		
		<u-popup 
			:show="imgWrapShow" 
			@close="imgWrapShow = false" 
			mode="center"
			closeable
			bgColor="transparent"
		>
			<view class="imgw">
				<u-swiper
					:list="list.list_pics"
					keyName="pic"
					height="60vh"
					imgMode="aspectFit"
					bgColor="rgba(0,0,0,.7)"
					indicator
					previousMargin="10"
					nextMargin="10"
				></u-swiper>
			</view>
		</u-popup>
		<u-popup 
			:show="jpListShow" 
			@close="jpListShow = false" 
			mode="bottom" 
			bgColor="transparent"
		>
			<view class="u-p-20 jp-wrap" >
				<view style="border-radius: 10px;overflow: hidden;">
					<view
						class="u-text-center u-p-20 u-font-28"
						:style="{
							color: themeConfig.tabText, 
							backgroundColor: themeConfig.pan.pageBg,
						}"
						>竞拍记录</view>
					<scroll-view class="jp-content u-p-20"
						:style="{
							color: themeConfig.tabText,
							backgroundColor: themeConfig.pan.pageBg,
						}"
						scroll-y
					> 
						<view class="u-p-10" v-for="(item, index) in 5" :key="index">
							<jpCard></jpCard>
						</view>
						
					</scroll-view>
				</view>
				
			</view>
			
		</u-popup>
		<tabBar
			:theme="typeActive"
			:customStyle="{
				'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
			}">
			<view class="pan-tabbar u-flex u-flex-items-center u-flex-around "
				:style="{
					color: themeConfig.tabText,
					backgroundColor: themeConfig.tabBg,
				}"
			>
				<view @click="handleGoto({url: '/pages/index/index', type: 'reLaunch'})" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<text>首页</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<view @click="handleTimesBtn('', `咨询${pan=='s'? '卖盘': '买盘'}：${list.name}，https://www.rawmex.cn/${pan=='s'? 'sell': 'buy'}-${id}.html`)" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<i class="custom-icon-tims custom-icon"></i>
					<text>在线联系</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				
				<template v-if="orderBtnShow == 1">
					<view class="item-btn u-flex u-flex-items-center u-flex-center"
						:style="{
							color: themeConfig.tabTextActive
						}"
						@click="handleGoto({url: '/pages/my/order/order_edit', params: {ordertype: pan == 's'? 'B' : 'S', id: id, type: 'add'}})"
					>
						<i class="custom-icon-add-product custom-icon"></i>
						<text class="u-p-l-10">{{orderBtnName}}</text>
					</view>
					<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				</template>
				
				
				 <view class="item-btn  u-flex u-flex-items-center u-flex-center">
					<u-button open-type="share" :customStyle="{
						color: themeConfig.tabText,
						backgroundColor: 'transparent',
						border: 'none',
						fontSize: '16px'
					}">
						<i class="custom-icon-forward custom-icon"></i>
						<text class="u-p-l-10">转发</text>
					</u-button>
					
				</view>
			</view>
			
		</tabBar>
		<u-loading-page 
			:loading="pageLoading"
			loading-text="loading..."
			loadingMode="semicircle"
			:bg-color="themeConfig.pageBg"
			:loading-color="themeConfig.loading"
			:color="themeConfig.pageTextSub"
		></u-loading-page>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				id: '',
				pan: '',
				imgWrapShow: false,
				jpListShow: false,
				backBtn: true,
				indexList: [],
				list: {},
				cpy: {},
				timeData: {},
				cpyInfo: true,
				tabs_current: 0,
				tabs_desc: [
					{
						label: '商品描述',
						content: ''
					},
					{
						label: '备注',
						content: ''
					},
					{
						label: '说明',
						content: ''
					},
				],
				pageLoading: true,
				orderBtnShow: 1,
				orderBtnName: '立即下单',
			};
		},
		async onLoad(options) {
			if(uni.$u.pages().length == 1) this.backBtn = false
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			}
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			await this.getData()
			this.pageLoading = false
			// await this.getCpyData()
			await this.getDataList()
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
				sh: state => state.user.sh,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sys: 'theme/sys'
			})
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			onJpTimeChange(e) {
                this.timeData = e
            },
			makePhone(mobile) {
				uni.makePhoneCall({
					phoneNumber: mobile 
				});
			},
			handleBackEvent() {
				uni.navigateBack()
			},
			async getData() {
				const res = await this.$api[this.pan == 's'? 'getSellDetail' : 'getBuyDetail']({params: {id: this.id}})
				// console.log(res)
				if(res.code == 1) {
					this.list = res.list
					this.cpy = res.company
					this.tabs_desc[0].content = this.list.intro
					this.tabs_desc[1].content = this.list.remark
					this.tabs_desc[2].label =res.detail_title
					this.tabs_desc[2].content =res.detail_info
					this.orderBtnShow = res.button
					this.orderBtnName = res.button_name
					this.setOnlineControl(res)
				}
			},
			async getCpyData() {
				if(!this.list.login) return
				const res = await this.$api.getCompanyDetail({params: {login: this.list.login}})
				// console.log(res)
				if(res.code == 1) {
					this.cpy = res.list
				}
			},
			async getDataList() {
				// if(this.loadstatus != 'loadmore') return
				// this.loadstatus = 'loading'
				const res = await this.$api[this.pan == 's'?'getSell': 'getBuy']({params: {
						login: this.list.login, 
						// standard: this.list.standard,
						p: 1,
						expressed: 1,
						pr: 3
					}})
				if(res.code == 1) {
					this.indexList = res.list.filter(ele => ele.id != this.id)
					// if(this.curP == res.page_total) {
					// 	this.loadstatus = 'nomore'
					// }else {
					// 	this.loadstatus = 'loadmore'
					// }
				}
			},
			
			handleRouteTo({id}) {
				uni.navigateTo({
					url: `/pages/index/pan/panDetail?id=${id}&pan=${this.pan}`
				})
			},
			
			handleClickTims({tims, id}) {
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login: `${tims.login}`,
						content: ``
					}
				})
			},
			handleTimesBtn(login, content="") {
				if(!login) login = this.list.Tims.login
				// if(this.sh == 1) return
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login,
						content,
					}
				})
				// this.handleGoto({
				// 	url: '/pages/index/webview/webview',
				// 	params: {
				// 		_a: 'msg',
				// 		f: 'detail',
				// 		id: `${this.list.Tims.id}_${this.list.Tims.ctime}`,
				// 		ttype: this.pan == 's'? 'sell': 'buy',
				// 		tid: this.id,
				// 		tims: '1'
				// 	}
				// })
			}
		}
	}
</script>
<style lang="scss">
.time {
    @include flex;
    align-items: center;

    &__item {
         color: #fff;
         font-size: 14px;
         text-align: center;
     }
}
</style>
<style lang="scss" scoped>
	.jp-wrap {  
		box-sizing: border-box;
	}
	.jp-bar {
		border-radius: 10px;
	}
	.jp-content {
		height: 400px;
		width: 100%;
		box-sizing: border-box;
	}
	.imgw {
		width: 100vw;
	}
	.item-label {
		flex: 0 0 80px
	}
	.w {
		padding-bottom: 60px;
		min-height: 100vh;
	}
	.tag {
		display: inline-block;
		line-height: 18px;
		height: 18px;
		border: 1rpx solid #f8f8f8;
		color: #666;
		border-radius: 8rpx;
		padding: 0 8px;
	}
	.pan-tabbar {
		height: 100%;
		.item-btn {
			height: 100%;
			&.share-btn {
				
			}
		}
	}
	.pan-main {
		position: relative;
		top: -40px;
		padding: 0 15px;
		.main-box {
			border-radius: 16rpx;
			overflow: hidden;
			box-shadow: 0 0 10px rgba(0,0,0,.1);
		}
	}
	.main-box-title .item {
		height: 35px;
		flex: 1 1 50%;
		
	}
</style>
