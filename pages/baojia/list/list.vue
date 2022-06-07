<template>
	<view class="text-white u-p-b-80" :style="{'min-height': '100vh',
		backgroundColor: themeConfig.pageBg
	}">
		<navBar :title="onlineControl.title" ></navBar>
		
		<view class="u-p-b-80 u-p-t-40">
			<view>
				<view class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20">
					<view class=" radius can-box uni-shadow-lg" :style="{
						backgroundColor: themeConfig.boxBg,
						boxShadow: themeConfig.boxShadow,
					}">
						<view class="u-p-30" v-show="show_canvas">
							<uni-ec-canvas 
								ref="echarts" 
								class="uni-ec-canvas" 
								canvas-id="multi-charts-line"
								:force-use-old-canvas="false" 
								:ec="ec" 
								:ecloading="ecloading"
								@titleClick="handleTitleClick"
								@initSuccess="handleInitSuccess"
							></uni-ec-canvas>
						</view>
					</view>
				</view>
				
				<view class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" >
					<view class="d-bk u-flex radius u-flex u-flex-between u-flex-items-center u-p-20" :style="{
						backgroundColor: themeConfig.boxBg,
						color: themeConfig.pageText
					}">
						<view class="u-flex-1 u-text-center u-p-l-10 u-p-r-10 u-p-t-20 u-p-b-20" 
							v-for="(item, index) in memu " 
							:key="index" 
							:style="{
								color: item.ec_type == ecType ? themeConfig.tabTextActive : themeConfig.tabTextInactive,
							}"
							@click="handleClickEcTabs(item)">
							<view class="img-center">
								<i :class="[item.icon, 'custom-icon u-font-36']"></i>
								<!-- <u-image width="40rpx" height="40rpx" :src="item.img"></u-image> -->
							</view>
							<view class="u-p-t-20 u-font-28">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				
				<view class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" v-if="ecType == 1 && list_table && list_table.length > 0">
					<view class="d-bk radius uni-shadow-lg" :style="{
							backgroundColor: themeConfig.boxBg,
							color: themeConfig.pageTextSub,
							boxShadow: themeConfig.boxShadow
						}">
						<view class="u-flex">
							<view class="u-flex-1 u-text-center u-p-20">
								日期
							</view>
							<view class="u-flex-1 u-text-center u-p-20">
								价格
							</view>
							<view class="u-flex-1 u-text-center u-p-20">
								涨跌
							</view>
						</view>
						<view class="u-flex u-font-30" v-for="(item, index) in list_table" :key="index">
							<view class="u-flex-1 u-text-center u-p-20">
								{{item.pdate}}
							</view>
							<view class="u-flex-1 u-text-center u-p-20" :style="{
								color: themeConfig.pageText
							}">
								{{item.pave}}
							</view>
							<view class="u-flex-1 u-text-center u-p-20 " :class="item.color">
								{{item.zdf}}
							</view>
						</view>
					</view>
				</view>
				
				<view class="u-p-l-30 u-p-r-30 u-p-t-10 u-p-b-10" v-for="(item, index) in news" :key="index">
					<cardB
						:name="item.name"
						:cid="item.id"
						:color="item.color"
						:price="item.price"
						:dprice="item.dprice"
						:unit="item.unit"
						:is_zd="item.is_zd"
						:cname="item.cname"
						:intro="item.intro"
						:place_company="item.place_company"
						:reg_name="item.reg_name"
						:pubDate="item.post_date"
						:type="item.tiao"
					></cardB>
				</view>
				

			</view>
			<u-loadmore :status="status" />
		</view>
		<u-safe-bottom></u-safe-bottom>
		<menusPopup
			:show="!show_canvas" 
			:theme="typeActive"
			:isPPI="true"
			mainkey="ppid"
			@close="cancel"
			@confirm="menusConfirm"
		></menusPopup>
		 <menusBar tabbar :activeIndex="4" :theme="typeActive" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import uniEcCanvas from "@/pages/baojia/components/uni-ec-canvas/uni-ec-canvas";
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		components: {
			uniEcCanvas,
		},
		data() {
			return {
				id: '927',
				dir: 'futures',
				onlineControl: {
					share_title: '生意社期限实时报价系统',
					title: '生意社期限实时报价系统'
				},
				memu_show: 0,
				tabbar_show: 0,
				// title: '原料价格',
				// ppi_title: '生意社期现实时报价系统',
				// share_title: '',
				show_canvas: true,
				// classes: '927-futures',
				news: [],
				list_table: [],
				memu_msg: '',
				p: 1,
				hasMore: true,
				status: 'loadmore',
				memu: [
					{
						name: '生意社价格',
						ec_type: 1,
						type: 1,
						icon: 'custom-icon-xiaoqu'
					},
					{
						name: '月柱K图',
						ec_type: 2,
						type: 1,
						icon: 'custom-icon-zhuzhuangtu'
					},
					{
						name: '买盘',
						url: '/pages/index/pan/pan?pan=b',
						type: 1,
						icon: 'custom-icon-jinhuoqu'
					},
					{
						name: '卖盘',
						url: '/pages/index/pan/pan?pan=s',
						type: 1,
						icon: 'custom-icon-zu555'
					},
					// {
					// 	name: '定价中心',
					// 	url: '/pages/baojia/list/list',
					// 	type: 1,
					// 	icon: 'custom-icon-caiyouduo_zhuye-weixuanzhong'
					// },
					// {
					// 	name: '生意群',
					// 	url: '/pages/baojia/list/list',
					// 	type: 1,
					// 	icon: 'custom-icon-caiyouduo_zhuye-weixuanzhong'
					// },
				],
				memub: [],
				ec: {
					option: {},
				},
				ecType: 1,
				ecloading: false,
				indexData: null,
				originalData: null,
				originalData2: null
			};
		},
		// onShareTimeline() {
		// 	return {
		// 		title: this.share_title,
		// 		query: 'login=' + uni.getStorageSync('login') + '&id=' + this.id + '&dir=' + this.dir
		// 	}
		// },
		// onShareAppMessage(res) {
		// 	this.$http
		// 		.post('share', {
		// 			login: uni.getStorageSync('login'),
		// 			url: '/' + this.$scope.route + '|' + uni.getStorageSync('login')
		// 		})
		// 		.then(resa => {
		// 			resa.data.poster ? uni.setStorageSync('poster', resa.data.poster) : '';
		// 		});
		// 	return {
		// 		title: this.share_title,
		// 		path: '/' + this.$scope.route + '?login=' + uni.getStorageSync('login') + '&id=' + this.id + '&dir=' + this
		// 			.dir
		// 	};
		// },
		async onLoad(options) {
			options.login ? uni.setStorageSync('login', options.login) : {};
			options.id ? this.id = options.id : {};
			options.dir ? this.dir = options.dir : {};
			// this.get_cate();
			// this.ave();
			// this.newsUrl();
			// this.initEcConfig()
			await this.getIndexData()
			// this.$api.getPpiBasketCap({params: {id: '1036', dir: 'nyhy'}})
			// this.$api.getPpiPer({params: {id: '1036', dir: 'nyhy'}})
			// this.$api.getPpiBasketBuy({params: {id: '1036', dir: 'nyhy'}})
			// this.$api.getPpiBasketSell({params: {id: '1036', dir: 'nyhy'}})
		},
		mounted() {
		},
		onShow() {},
		onReachBottom() {
			// this.newsUrl();
			this.p ++;
			this.getIndexData()
		},
		watch: {
			typeActive(v) {
				this.renderEc()
			},
			async ecType(v) {
				//切换柱状图获取 月K柱图数据
				if((v == 2 && !this.originalData2) || (v == 1 && !this.originalData)) {
					await this.getEcData()
				}
				this.renderEc()
			}
		},
		async onReady() {
			uni.showLoading()
			await this.getEcData()
			this.renderEc()
			this.setNavColor()
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				echartsConfig: 'theme/echartsConfig'
			}),
			memu_filters() {
				return this.memu.filter(ele => {
					return !ele.hasOwnProperty('ec_type') || ele.ec_type != this.ecType
				})
			}
		},
		methods: {
			...mapMutations({
				setNavColor: 'theme/setNavColor'
			}),
			async getIndexData() {
				if(this.status == 'loading') return
				this.status = 'loading'
				const res = await  this.$api.getPpiIndex({
					params: {
						id: this.id, 
						dir: this.dir,
						p: this.p
					},
				})
				
				if(res.code == 1 && res.list) {
					this.indexData = res.list
					this.list_table = res.list.list_table
					this.news = [...this.news, ...res.list.pw_rec_list]
					if(this.p >= res.list.pw_page_total) {
						this.status = 'nomore'
					}else {
						this.status = 'loadmore'
					}
				}
			},
			async handleInitSuccess() {
				await this.getEcData()
				this.renderEc()
			},
			initData() {
				this.p = 1;
				this.news = [];
				this.list_table = []
				this.indexData = null
				this.status = 'loadmore'
			},
			async getEcData() {
				this.ecloading = true
				const res = await this[ this.ecType == 1 ? 'ave':'getPpiPer']();
				if(res.code == 1) {
					if(this.ecType == 1) {
						this.originalData = res.list
					}
					else if(this.ecType == 2) {
						this.originalData2 = res.list
					}
					
					this.ecloading = false
				}
			},
			renderEc() {
				let type = this.ecType == 1 ? 'line' : 'bar'
				let option = uni.$u.deepClone({
					...this.echartsConfig.base,
					...this.echartsConfig.series[type]
				})
				if(this.ecType == 1) {
					option.title.text = `${this.originalData.name} {a|[切换]}`
					option.title.subtext = ''
					option.xAxis.data = this.originalData.data_list
					option.series[0].data = this.originalData.price_list
					option.tooltip.formatter = '{b0}\n{a0}: {c0}%'
				}else if(this.ecType == 2) {
					option.title.text = `${this.originalData2.name} {a|[切换]}`
					option.title.subtext = this.originalData2.spec
					option.xAxis.data = this.originalData2.data_list
					option.tooltip.formatter = '{b0}\n{a0}: {c0}{c1}%'
					// option.series[0].data = this.originalData2.data.split(',')
					option.series[0].data = this.originalData2.price_lista
					option.series[1].data = this.originalData2.price_listb
				}
				
				this.ec.option = option
			},
			handleTitleClick() {
				//触发 图标标题的点击事件
				this.show_canvas = false
			},
			async menusConfirm(data) {
				console.log(data)
				this.ec.option.title.text = `${data.name} {a|[切换]}`
				this.show_canvas = true;
				this.id = data.ppid
				this.dir = data.dir
				this.originalData = null
				this.originalData2 = null
				this.initData()
				this.getIndexData()
				await this.getEcData()
				this.renderEc()
			},
			handleClickEcTabs(item) {
				if(item.hasOwnProperty('ec_type')) {
					this.ecType = item.ec_type
				}else {
					// item.url += '&data=' + JSON.stringify({
					// 	name: this.indexData?.Finfo?.name,
					// 	id: this.indexData?.pid,
					// 	keyword: ''
					// })
					this.navTo(item.url, item.type)
				}
				
			},
			cancel(e) {
				this.show_canvas = true;
				this.$nextTick(() => {
					this.$refs.echarts.$curChart.resize()
				})
			},
			handleRouteTo({id, type}) {
				this.navTo('/pagesb/ppi/detail?id='+id, type)
			},
			navTo(e, type) {
				if (type == 1) {
					uni.navigateTo({
						url: e
					});
				}
				if (type == 2) {
					uni.redirectTo({
						url: e
					});
				}
				if (type == 3) {
					uni.showToast({
						title: this.memu_msg
					});
				}
				if (type == 4) {
					uni.navigateToMiniProgram({
						appId: e,
						success(res) {
							// 打开成功
						},
						complete(res1) {
							console.log(res1);
						}
					});
				}
			},
			// newsUrl() {
			// 	if (!this.hasMore) {
			// 		return;
			// 	}
			// 	this.status = 'loading';
			// 	this.$http
			// 		.get('m_ppi_index', {
			// 			login: uni.getStorageSync('login'),
			// 			id: this.id,
			// 			p: ++this.p,
			// 			dir: this.dir
			// 		})
			// 		.then(res => {
			// 			this.list = res.data.list;
			// 			this.news = this.news.concat(res.data.list.pw_rec_list);
			// 			this.hasMore = this.p < res.data.list.pw_page_total;
			// 			this.tags = res.data.list.Finfo.name;
			// 			this.memu_msg = res.data.memu_msg;
			// 			if (this.p < res.data.list.pw_page_total) {
			// 				this.status = 'loadmore';
			// 			} else {
			// 				this.status = 'nomore';
			// 			}
			// 			if (res.data.memu) {
			// 				this.memu = res.data.memu;
			// 			}
			// 			if (res.data.memub) {
			// 				this.memub = res.data.memub;
			// 			}
			// 			this.share_title = res.data.share_title;
			// 			this.title = res.data.title;
			// 			this.ppi_title = res.data.ppi_title;
			// 			this.memu_show = res.data.memu_show;
			// 			this.tabbar_show = res.data.tabbar_show;
			// 		});
			// },
			async getPpiPer() {
				return await this.$api.getPpiPer({
					params: {
						id: this.id,
						login: uni.getStorageSync('login'),
					}
				})
			},
			async ave() {
				return await this.$api.getPpiAve({
					params: {
						id: this.id,
						login: uni.getStorageSync('login'),
					}
				})
				
			},
		}
	};
</script>

<style scoped lang="scss">
	// .bg-black {
	// 	background-color: $page-bg;
	// }

	.radius {
		border-radius: 12rpx;
	}

	// .d-bk {
	// 	background-color: $box-bg;
	// }

	.img-center {
		display: flex;
		justify-content: center;
	}

	.lbdq {
		text-align: justify;
		text-align-last: justify;
		padding: 20rpx 10rpx 20rpx 20rpx;
	}

	.ppi_gray {
		color: $page-text;
	}

	.text-gray {
		color: $page-text-sub;
	}
	.text-light {
		color: #ccd4d4;
	}

	.text-yellow {
		color: #7eecec;
	}

	.text-red {
		color: #d04343;
	}

	.text-green {
		color: #6fd2a3;
	}

	.dongtai .dt-item:first-child {
		margin-top: 0;
	}

	.chanpin .cp-item:nth-child(1) {
		margin-top: 0;
	}

	.text-dark {
		color: #c7c7c7;
		display: inline-block;
		font-size: 40rpx;
		margin: 0;
		padding: 0;
		font-weight: 400;
		position: relative;
	}
</style>
<style scoped>
	.uni-ec-canvas {
		width: 100%;
		height: 600rpx;
		display: block;
	}
</style>
