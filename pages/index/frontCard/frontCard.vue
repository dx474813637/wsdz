<template>
	<view class="w">
		<!-- <rich-text :nodes="card"></rich-text>
		<u-parse :content="more" ></u-parse> -->
		<view class="card-header u-p-30"> 
			<view class="bg">
				<!-- <i class="custom-icon-mingpian custom-icon"></i> -->
			</view>
			 
			<view class="card u-m-b-15 u-radius-10 uni-shadow-base" > 
				<view class="card-main">
					<view class="card-main-top u-p-30 u-p-l-50 u-p-r-50 text-base u-font-30 text-dark">
						<view class="u-flex u-flex-items-start u-m-b-30">
							<view class="item"> 
								<view class="img-w">
									<u--image :src="list.img" mode="aspectFill" width="70px" height="70px" shape="circle"></u--image>
								</view>
							</view>
							<view class="item u-flex-1 u-p-l-30">
								<view class="u-m-b-10 u-flex u-flex-items-center">
									<view class="u-font-40 card-name">
										{{list.name}}
									</view> 
								</view>
								<view class="u-m-b-20">
									<view class="card-row u-flex u-flex-items-center">
										<view class="u-m-r-20" v-if="list.position">{{list.position}}</view>
										<view class="text-base">{{list.phone}}</view>
									</view>
									<view class="card-row" v-if="list.company">{{list.company}}</view>
								</view> 
							</view>
						</view> 
						<view class="card-row u-m-b-10 text-light u-flex u-flex-items-center">
							<u-icon name="phone-fill" color="#ccc" size="22"></u-icon>
							<view class="u-m-l-20">{{list.tel}}</view>
						</view>
						<view class="card-row u-m-b-10 text-light u-flex u-flex-items-center">
							<u-icon name="email-fill" color="#ccc" size="22"></u-icon>
							<view class="u-m-l-20">{{list.email}}</view>
						</view>
						<view class="card-row u-m-b-10 text-light u-flex u-flex-items-center">
							<u-icon name="map-fill" color="#ccc" size="22"></u-icon>
							<view class="u-m-l-20">{{list.address}}</view>
						</view> 
					</view>
					
				</view>
			</view>
			
			<view class="card-main-bottom uni-shadow-base u-flex text-dark u-flex-items-center u-font-32 u-radius-10 bg-white u-p-20">
				<view class="item-btn u-flex-1 u-flex u-flex-items-center u-flex-center " @click="makeCall">
					<i class="custom-icon-dianhua custom-icon text-primary u-font-40" ></i>
					<text class="u-p-l-10">{{button.name1}}</text>
				</view>
				<view class="item">
					<view class="line"></view>
				</view>
				<view class="item-btn u-flex-1 u-flex u-flex-items-center u-flex-center" @click="followFunc">
					<i class="custom-icon-attention custom-icon text-primary u-font-40" ></i>
					<text class="u-p-l-10">{{button.name2}}</text>
				</view>
			</view>
		</view> 
		
		<view class="u-p-l-30 u-p-r-30 u-m-b-15" v-if="list.info">
			<view class="u-radius-10 bg-white u-p-20 u-p-l-30 u-p-r-30 content-w u-font-32 uni-shadow-base">  
				<view class="u-flex u-flex-items-center u-font-32  u-m-b-10">
					<i class="custom-icon-all custom-icon text-error"></i>
					<view class="u-m-l-15 text-dark">主营业务</view>
				</view>
				<view class="text-base u-p-b-15 u-font-30" style="line-height: 24px;font-weight: 300; ">
					<u-parse
						:content="list.info || ''" 
						></u-parse> 
				</view>
				
			</view>
			
		</view>
		<view class="u-p-l-30 u-p-r-30 u-m-b-15 " v-if="myGroup.hasOwnProperty('id')">
			<view class="u-radius-10 bg-white u-p-r-30 u-font-32 u-flex u-flex-items-center uni-shadow-base">  
				 <view class="item u-flex-1">
					 <groupListCard
					 	:origin="myGroup"
						:shadow="false"
					 	@groupClick="groupClick"
					 ></groupListCard>
				 </view>
				 <view class="item">
					 <u-button type="primary" size="small" @click="groupClick({data: myGroup})">去加入</u-button>
				 </view>
			</view>
			
		</view>
		<view class="u-p-l-30 u-p-r-30 u-m-b-15">
			<view class="u-radius-10  content-w u-font-32">  
				<view class="u-flex u-flex-items-center u-font-32 u-m-b-10 u-p-l-30 u-p-r-30">
					<i class="custom-icon-all custom-icon text-error"></i>
					<view class="u-m-l-15 text-dark">Ta的买卖盘</view>
					<view class="item tabs-w u-p-l-20 u-p-r-20">
						<u-tabs
							:list="tabs_list"
							:current="tabs_current" 
							:activeStyle="activeTabsStyle"
							lineColor="#4a67ff"
							:itemStyle="itemTabsStyle"
							@change="handleTabsChange"
						> 
						</u-tabs>
					</view>
				</view> 
				<view class="list">
					<view
						v-for="(item, index) in indexList"
						:key="item.id"
					>
						<view class=" u-p-b-20">
							<cardA
								:name="item.name"
								:pid="item.id"
								:amount="item.amount"
								:color="item.color"
								:price="item.price"
								:dprice="item.dprice"
								:unit="item.unit"
								:spec="item.spec"
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
						
					</view>
					<template v-if="indexList.length == 0">
						<u-empty
							mode="data"
							:icon="themeConfig.empty"
						>
						</u-empty>
					</template> 
				</view>
			</view>
			
		</view>
		
		
		<u-safe-bottom></u-safe-bottom>
		<menusBar tabbar theme="white" ></menusBar>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo' 
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				login:'',
				card: '',
				more: '',
				follow: 0,
				list: {},
				button: {},
				topimg: '',
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '30rpx',
					fontWeight: 'bold',
					color: '#4a67ff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				tabs_list: [
					{
						name: '卖盘', 
						indexList: [],
						value: 's',
						disabled: false,
					},  
					{
						name: '买盘', 
						indexList: [],
						value: 'b',
						disabled: false,
					},  
				], 
				curP: 1,
				loadstatus: 'loadmore',
				dynamic: 0,
				autoGoto: 1,
				myGroup: {}, 
			};
		},
		async onLoad(options) { 
			if (options.hasOwnProperty('login')) {
				this.login = options.login
			}  
			if (options.hasOwnProperty('autoGoto')) {
				this.autoGoto = options.autoGoto
			}  
			uni.showLoading()
			await this.getData() 
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig, 
				wode: state => state.user.wode,
			}),  
			indexList() {
				return this.tabs_list[this.tabs_current].indexList
			},
			pan() {
				return this.tabs_list[this.tabs_current].value
			},
			
		},  
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}), 
			handleRouteTo({id}) {
				uni.navigateTo({
					url: `/pages/index/pan/panDetail?id=${id}&pan=${this.pan}`
				})
			}, 
			
			async handleTabsChange(value) {
				// this.keyword = ''
				this.tabs_current = value.index  
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
			async getData() {
				const res = await this.$api.web_login_card({
					params: {
						login: this.login
					}
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.list = res.list
					this.tabs_list[0].indexList = res.sell_list
					this.tabs_list[1].indexList = res.buy_list
					this.myGroup = res.group || {}
					this.card = res.mp
					this.more = res.more
					this.topimg = res.topimg
					this.button = res.button
					this.follow = res.follow  
					if(res.tz == 1 && this.autoGoto == 1) {
						uni.reLaunch({
							url: res.url
						})
					}
				}
			},
			makeCall() {
				if(!this.list.phone) return
				uni.makePhoneCall({
					phoneNumber: this.list.phone
				});
			},
			showToast(params) {
				this.$refs.uToast.show({ 
					...params,
				})
			},
			async followFunc() {
				// if(!this.isLimit()) return
				// this.$emit('makeCall', {data: this.origin.phone})
				const res = await this.$api.follow({
					params: {
						login: this.list.login,
						follow: this.follow == 1? 2 : 1
					}
				})
				if(res.code == 1) {
					 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading()
					await this.getData()
				}
			},  
			groupClick({data}) {
				
				uni.navigateTo({
					url: `/pages/index/group/group?id=${data.id}`
				})
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f8f8f8;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.content-w { 
	}
	.groupMsg {
		border-bottom: 1rpx solid #f5f5f5; 
		padding: 20px 0px;
	}
	.w {
		padding-bottom: 60px;
		.card-header {
			position: relative;
			z-index: 10;
			overflow: hidden;
			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 150px;
				background-color: #306dbe;
				z-index: 10;
				overflow: hidden;
				&:after {
					content: '';
					position: absolute;
					z-index: 10;
					top: 100%;
					left: 50%;
					width: 120vw;
					height: 120px;
					border-radius: 100%;
					background-color: #306dbe;
					transform: translate(-50%,-60%);
				}
				.custom-icon-mingpian {
					position: absolute;
					z-index: 15;
					top: 20px;
					right: 40px;
					font-size: 120px;
					color: #fff;
					opacity: .2;
					transform: rotateY(180deg) rotate(20deg);
				}
			}
			
			.title {
				position: relative;
				z-index: 10;
				font-style: italic;
				font-weight: 700;
				letter-spacing: 2px;
				text-shadow:2px 3px 1px #405bde;
				font-family: '微软雅黑';
			}
			.card {
				position: relative;
				z-index: 10;
				background: url('https://wx.rawmex.cn/Public/share/ditu.png') no-repeat;
				background-size: 100% 100%;
				// &:after {
				// 	content: '';
				// 	position: absolute;
				// 	z-index: 10;
				// 	top: 0;
				// 	left: 0;
				// 	width: 100%;
				// 	height: 100%;
				// 	border-radius: 10px;
				// 	background-color: #fff;
				// 	opacity: .3;
				// 	transform: rotate(-6deg);
				// }
				.card-main {
					position: relative;
					z-index: 15;
					overflow: hidden;
					min-height: 170px; 
					.card-main-top {
						position: relative;
						z-index: 10;
						.img-w {
							// position: absolute;
							// top: 20px;
							// right: 20px; 
						}
						.card-name { 
							color: #000;
							font-weight: bold;
						}
						.card-row {  
							color: #555;
						}
					}
				}
			}
		}
		
	}
.card-main-bottom {
	background-color: #4b75ff;
	overflow: hidden;
	height: 35px;
	.item-btn {
		// height: 70%;
	}
	.line {
		width: 1px;
		height: 32px;
		background-color: #aaa;
		// transform: rotate(-20deg);
	}
}
</style>
