<template>
	<view class="home"> 
		<view class="home-header">
			<view class="header-bg" :style="{ backgroundImage: `url(${homeData.bj})` }" v-if="homeData.bj"></view>
			<view class="home-header-main u-flex-column u-flex-between">
				<view class="header-top u-flex u-flex-between u-flex-items-center">
					<view class="item">
						
					</view>
					<view class="item">
						<view class="item-btn">
							<u-icon name="photo"></u-icon>
						</view>
					</view>
				</view>
				<view class="header-bottom u-flex u-flex-items-center u-p-30 text-white u-p-b-60">
					<view class="item item-avatar">
						<u--image 
							showLoading
							:src="homeData.bj" 
							width="60px" 
							height="60px"
							shape="circle"
						></u--image>
					</view>
					<view class="item u-flex-1 u-m-l-30">
						<view class="user-name u-font-40 u-line-1 u-m-b-10">
							皮特猪Peter
						</view>
						<view class="user-sub u-font-28 u-line-1 u-m-b-10">
							不知道干嘛用的地方
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="home-main">
			<view class="user-data u-flex u-flex-items-center u-p-30">
				<view class="item u-flex u-flex-items-center">
					<view class="data">10</view>
					<view class="data-label">获赞</view>
				</view>
				<view class="item u-flex u-flex-items-center">
					<view class="data">32</view>
					<view class="data-label">朋友</view>
				</view>
				<view class="item u-flex u-flex-items-center">
					<view class="data">18</view>
					<view class="data-label">关注</view>
				</view>
				<view class="item u-flex u-flex-items-center">
					<view class="data">32</view>
					<view class="data-label">粉丝</view>
				</view>
			</view>
			<view class="user-tags u-flex u-flex-items-start u-flex-wrap u-p-l-30 u-p-r-30 u-m-b-20">
				<view class="item">
					<u-tag plainFill plain  text="描述1" size="mini"></u-tag>
				</view>
				<view class="item">
					<u-tag plainFill plain  text="大撒大撒" size="mini"></u-tag>
				</view>
				<view class="item">
					<u-tag plainFill plain  text="v虚伪34242" size="mini"></u-tag>
				</view>
				<view class="item">
					<u-tag plainFill plain  text="啊实打实432的撒1" size="mini"></u-tag>
				</view>
				<view class="item">
					<u-tag plainFill plain  text="DSAD发顺丰1" size="mini"></u-tag>
				</view>
			</view>
			<view class="user-info">
				<view class="item u-p-l-30 u-p-r-30 u-m-b-20">
					<u-read-more 
						ref="uReadMore" 
						showHeight="150" 
						toggle 
						textIndent="0"
						closeText="展开"
						>
						<rich-text :nodes="content"></rich-text>
					</u-read-more>
				</view>
			</view>
			<view class="user-tags u-flex u-flex-items-start u-flex-wrap u-p-l-30 u-p-r-30 u-m-b-20" v-if="homeData.me == 1">
				<u-button 
					type="primary" 
					:customStyle="{borderRadius: '5px'}" 
					@click="handleGoto('/pages/my/home/home_edit')"
					>
					编辑资料
				</u-button>
			</view>
			<view class="home-tabs u-p-20 u-flex u-flex-items-center" v-if="tabs_list.length > 0">
				<!-- <u-tabs
					:list="tabs_list"
					:current="tabs_current"
					lineHeight="0"
					:activeStyle="activeTabsStyle"
					:itemStyle="itemTabsStyle"
					@change="handleTabsChange"
				> </u-tabs> -->
				<view class="item-tabs"
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
						<cardA
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
						></cardA>
					</view>
				</template>
				<template v-if="activeTabsKey == 'pan'">
					<view class="list-item u-m-b-20" v-for="item in homeList" :key="item.id">
						<cardA
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
						></cardA>
					</view>
				</template> 
				
			</view>
		</view> 
		
		<u-loadmore
			status="nomore"
		/>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex' 
	import mixShareInfo from '@/config/mixShareInfo' 
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
				content: ''
			};
		},
		components: { 
		},
		async onLoad(options) {
			if(!options.hasOwnProperty('login')) {
				this.handleGoto({
					type: 'reLaunch',
					url: '/pages/index/index'
				})
				return
			}
			this.login = options.login
			uni.showLoading()
			await this.getHomeData()
		},
		computed: {
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
			initTabsData() {
				let arr = []
				if(this.homeData.sell1_show == 1) {
					arr.push({ name: this.homeData.sell1_name, list: this.homeData.sell1, url: this.homeData.sell1_url, key: 'fx_pan'})
				}
				if(this.homeData.sell2_show == 1) {
					arr.push({ name: this.homeData.sell2_name, list: this.homeData.sell2, url: this.homeData.sell2_url, key: 'pan'})
				}
				// if(this.homeData.sell3_show == 1) {
				arr.push({ name: this.homeData.sell3_name, list: this.homeData.sell3, url: this.homeData.sell3_url, key: 'card'})
				// }
				this.tabs_list = arr
			},
			async getHomeData() {
				const res = await this.$api.homepage({params: {login: this.login}})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.homeData = res;
					this.initTabsData()
					
					this.content = `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。`,
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
			handleRouteTo({id}) {
				uni.navigateTo({
					url: `/pages/index/pan/panDetail?id=${id}&pan=s`
				})
			},
			handleClickTims({tims, id, origin}) {
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login: `${tims.login}`,
						content: `咨询${this.pan=='s'? '卖盘': '买盘'}：${origin.name}，https://www.rawmex.cn/${this.pan=='s'? 'sell': 'buy'}-${id}.html`
					}
				}) 
			}
		}
	}
</script>
<style lang="scss" >
	page {
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
.home {
	.home-header {
		position: relative;
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
		.home-header-main {
			box-sizing: border-box;
			height: 160px;
			position: relative;
			z-index: 20;
			.header-top {
			}
			.header-bottom {
				background: linear-gradient(to bottom, transparent, rgba(0,0,0,.5));
				.item-avatar { 
					border-radius: 50px;
					border: 3px solid $u-primary;
				}
				
			}
		}
	}
	.home-main {
		background-color: #fff;
		position: relative;
		z-index: 30;
		top: -10px;
		border-radius: 10px 10px 0 0;
		box-shadow: 0 -5px 5px rgba(0,0,0,.3);
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
			
		}
		.home-tabs {
			.item-tabs {
				font-size: 32rpx;
				margin-right: 15px;
				color: #333;
				&:last-child {
					margin-right: 0;
				}
				&.active {
					color: $u-primary;
					font-weight: bold;
				}
			}
		}
		.home-list {
			
		}
	}
}
</style>
