<template>
	<view class="text-white u-p-b-80" :class="[typeActive]" :style="{
		'min-height': '100vh',
		'backgroundColor': themeConfig.pageBg
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
						<view class="time-btns u-flex u-flex-items-center u-flex-between" v-if="tabs_current == 0 || tabs_current == 2">
							<view class="item"
								 v-for="(item, index) in ec_btns_filters"
								 :key="index"
								 :style="{
									 color: item.active? themeConfig.tabTextActive: themeConfig.tabTextInactive,
									 background: themeConfig.tabBg
								 }"
								 @click="timeBtnsClick(item, index)"
							>
								{{item.name}}
							</view>
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
								color: index == tabs_current ? themeConfig.tabTextActive : themeConfig.tabTextInactive,
							}"
							@click="handleClickEcTabs(item,index)">
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
				<template v-if="tabs_current == 2">
					<view class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" v-if="tabs_current == 2">
						<view class="d-bk u-p-40 radius uni-shadow-lg" :style="{
								backgroundColor: themeConfig.boxBg,
								color: themeConfig.pageTextSub,
								boxShadow: themeConfig.boxShadow
							}">
							<view class="u-text-center u-m-b-30">定价中心</view>
							<u--form
								labelPosition="left"
								:model="setMoneyForm"
								ref="form"
								labelWidth="100"
								:borderBottom="false"
								:labelStyle="{
									width: '100px',
									color: themeConfig.pageTextSub
								}"
							>
								<u-form-item
									label="拟定价产品"
								>
									<view class="u-font-32" :style="{
										color: themeConfig.pageText,
									}">{{indexData.Finfo.pname}}</view>
								</u-form-item>	
								<u-form-item
									label="上次交易日"
									prop="zdate"
								>
									<view :style="{
											color: themeConfig.pageText,
										}"
									>
										<uni-datetime-picker
											type="date" 
											:end="end"
											v-model="setMoneyForm.zdate" 
										/>
									</view>
								</u-form-item>	
								
								<u-form-item
									label="上次交易价"
									prop="price"
								>
									<u--input
										v-model="setMoneyForm.price"
										placeholder="填写上次交易价"
										border="none"
										:color="themeConfig.pageText"
										:placeholderStyle="{
											color: themeConfig.pageTextSub
										}"
										:customStyle="{
											background: themeConfig.pageBg,
											padding: '8px',
											borderRadius: '5px',
										}"
									></u--input>
								</u-form-item>	
								<u-form-item
									label="拟定价日期"
									prop="ddate"
								>
									<view :style="{
											color: themeConfig.pageText,
										}"
									>
										<uni-datetime-picker
											type="date" 
											:end="end"
											v-model="setMoneyForm.ddate" 
										/>
									</view>
								</u-form-item>	
								
								<view class=" u-m-t-20 u-m-b-20" >
									<u-button @click="handleSubmit" :type="typeActive=='white'? 'primary' : 'warning'">参考定价</u-button>
								</view>
								
								<u-form-item
									label="参考定价可为"
								>
									<u--input
										:value="ck_list.ck_price"
										placeholder="点击参考定价按钮生成"
										readonly
										border="none"
										:color="themeConfig.pageText"
										:placeholderStyle="{
											color: themeConfig.pageText
										}"
										:customStyle="{
											background: themeConfig.pageBg,
											padding: '8px',
											borderRadius: '5px',
										}"
									></u--input>
								</u-form-item>	
								<u-form-item
									label="变化幅度"
								>
									<u--input
										:value="ck_list.difference"
										placeholder="点击参考定价按钮生成"
										readonly
										border="none"
										:color="themeConfig.pageText"
										:placeholderStyle="{
											color: themeConfig.pageText
										}"
										:customStyle="{
											background: themeConfig.pageBg,
											padding: '8px',
											borderRadius: '5px',
										}"
									></u--input>
								</u-form-item>	
							</u--form>
							
							
						</view>
					</view>
					<view class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" v-if="tabs_current == 2">
						<view class="d-bk u-p-40 radius uni-shadow-lg" :style="{
								backgroundColor: themeConfig.boxBg,
								color: themeConfig.pageTextSub,
								boxShadow: themeConfig.boxShadow
							}">
							<view class="u-text-center u-m-b-30">定价原理</view>
							<u-parse :content="pc_content3"></u-parse>
						</view>
					</view>
				</template>
				<template v-else>
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
					
					<!-- <view class="u-p-l-30 u-p-r-30 u-p-t-10 u-p-b-10" v-for="(item, index) in news" :key="index">
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
					</view> -->
					
					<view class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20">
						<view class="d-bk u-p-40 radius uni-shadow-lg" :style="{
								backgroundColor: themeConfig.boxBg,
								color: themeConfig.pageTextSub,
								boxShadow: themeConfig.boxShadow
							}">
							<!-- <view class="u-text-center u-m-b-30">定价原理</view> -->
							<u-parse :content="pc_content1" v-if="tabs_current == 0"></u-parse>
							<u-parse :content="pc_content2" v-if="tabs_current == 1"></u-parse>
						</view>
					</view>
				</template>
				

			</view>
			<!-- <u-loadmore v-if="tabs_current != 2" :status="status" /> -->
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
	import uniDatetimePicker from '@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue'
	export default {
		mixins: [mixShareInfo],
		components: {
			uniEcCanvas,
			uniDatetimePicker
		},
		data() {
			return {
				id: '927',
				dir: 'futures',
				onlineControl: {
					share_title: '价格大数据',
					title: '价格大数据'
				},
				memu_show: 0,
				tabbar_show: 0,
				show_canvas: true,
				news: [],
				list_table: [],
				p: 1,
				status: 'loadmore',
				tabs_current: 0,
				tabs_current_options: 0,
				memu: [
					{
						name: '生意社价格',
						ec_type: 1,
						type: 1,
						icon: 'custom-icon-xiaoqu'
					},
					{
						name: '月K柱图',
						ec_type: 2,
						type: 1,
						icon: 'custom-icon-zhuzhuangtu'
					},
					{
						name: '定价中心',
						type: 1,
						icon: 'custom-icon-recharge',
						ec_type: 1,
					},
					{
						name: '商品动态',
						url: '/pages/baojia/list/news',
						type: 1,
						icon: 'custom-icon-lianjie'
					},
				],
				memub: [],
				ec: {
					option: {},
				},
				ecType: 1,
				ecloading: false,
				ec_btns: [
					{
						name: '近1月',
						show: true,
						value: 30,
						startValue: '',
						active: false,
					},
					{
						name: '近3月',
						show: true,
						value: 90,
						startValue: '',
						active: true,
					},
					{
						name: '近6月',
						show: true,
						value: 180,
						startValue: '',
						active: false,
					},
					{
						name: '近1年',
						show: true,
						value: 365,
						startValue: '',
						active: false,
					},
				],
				indexData: null,
				originalData: null,
				originalData2: null,
				originalData3: null,
				end: new Date(new Date().getTime() - 24*60*60*1000).toLocaleDateString(),
				setMoneyForm: {
					zdate: uni.$u.timeFormat(new Date().getTime() - 24*60*60*1000, 'yyyy-mm-dd'),
					price: '',
					ddate: uni.$u.timeFormat(new Date().getTime() - 24*60*60*1000, 'yyyy-mm-dd'),
				},
				ck_list: {
					difference: '',
					ck_price: ''
				},
				pc_content1: '',
				pc_content2: '',
				pc_content3: '',
				rules: {
					zdate: {
						type: 'string',
						required: true,
						message: '请选择上次交易日',
						trigger: ['blur', 'change']
					},
					ddate: {
						type: 'string',
						required: true,
						message: '请选择拟定价日期',
						trigger: ['blur', 'change']
					},
					price: {
						type: 'string',
						required: true,
						message: '请填写上次交易价',
						trigger: ['blur', 'change']
					},
				}
			};
		},
		async onLoad(options) {
			// options.login ? uni.setStorageSync('login', options.login) : "";
			options.id ? this.id = options.id : "";
			options.dir ? this.dir = options.dir : "";
			options.current ? this.tabs_current_options = options.current : 0;
			
			this.time2value()
			await this.getIndexData()
		},
		mounted() {
		},
		onShow() {},
		onReachBottom() {
			// this.newsUrl();
			// if(this.tabs_current == 2) return
			// this.p ++;
			// this.getIndexData()
		},
		watch: {
			typeActive(v) {
				this.renderEc()
			},
			// async ecType(v) {
			// 	//切换柱状图获取 月K柱图数据
			// 	if((v == 2 && !this.originalData2) || (v == 1 && !this.originalData)) {
			// 		await this.getEcData()
			// 	}
			// 	this.renderEc()
			// },
			async tabs_current(v) {
				//切换柱状图获取 月K柱图数据
				if((v == 2 && !this.originalData3) || (v == 1 && !this.originalData2) || (v == 0 && !this.originalData)) {
					await this.getEcData()
					if(v == 2) this.$refs.form.setRules(this.rules)
				}
				this.renderEc()
			}
		},
		async onReady() {
			uni.showLoading()
			if(this.tabs_current_options > 0) {
				this.tabs_current = this.tabs_current_options
			}else {
				this.tabs_current = 0
				await this.getEcData()
				this.renderEc()
			}
			
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
			},
			ec_btns_filters() {
				return this.ec_btns.filter(ele => ele.show)
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
				this.setOnlineControl(res)
				if(res.code == 1 && res.list) {
					this.indexData = res.list
					this.list_table = res.list.list_table
					// this.news = [...this.news, ...res.list.pw_rec_list]
					// if(this.p >= res.list.pw_page_total) {
					// 	this.status = 'nomore'
					// }else {
					// 	this.status = 'loadmore'
					// }
				}
			},
			timeBtnsClick(data) {
				let index = this.ec_btns.findIndex(ele => ele.name == data.name)
				if(!this.ec_btns[index].active) {
					this.ec_btns.forEach((ele, i) => {
						ele.active = i == index ? true : false
					})
					this.renderEc()
					
				}
			},
			time2value() {
				this.ec_btns.forEach((ele, index) => {
					const date = new Date()
					ele.startValue = uni.$u.timeFormat(date.getTime() - ele.value*24*60*60*1000, 'yyyy-mm-dd')
					
				})
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
				let current = this.tabs_current
				let func = '';
				if(current == 0) {
					func = 'ave'
				}else if(current == 1) {
					func = 'getPpiPer'
				}else if(current == 2) {
					func = 'pricingCenter'
				}
				const res = await this[func]();
				if(res.code == 1) {
					if(current == 0) {
						this.originalData = res.list
						this.pc_content1 = res.info
					}
					else if(current == 1) {
						this.originalData2 = res.list
						this.pc_content2 = res.info
					}
					else if(current == 2) {
						this.originalData3 = res.list
						// this.setOnlineControl(res)
						this.pc_content3 = res.yuanli
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
					if(this.tabs_current == 0) { 
						//生意社价格
						option.title.text = `${this.originalData.name} {a|[切换]}`
						option.xAxis.data = this.originalData.data_list
						option.tooltip.formatter = '{b0}\n{a0}: {c0}元'
						// option.series[0].data = this.originalData.price_list
						let series = []
						let name = this.originalData.mode_data.replace(/\'/g, '').split(',')
						option.legend.data = name
						this.originalData.all_list.forEach((ele, index) => {
							// if(index == 0) {
							// 	series.unshift({
							// 		...uni.$u.deepClone(option.series[0]),
							// 		name: name[index],
							// 		data: ele
							// 	}) 
							// }else {
							// 	series.unshift({
							// 		...uni.$u.deepClone(option.series[0]),
							// 		name: name[index],
							// 		lineStyle: {width: 1},
							// 		data: ele
							// 	}) 
							// 	option.tooltip.formatter += `\n{a${index}}: {c${index}}元`
							// }
							series[index] = {
								...uni.$u.deepClone(option.series[0]),
								name: name[index],
								data: ele
							}
							if(index>0) {
								series[index].lineStyle = {width: 1}
								option.tooltip.formatter += `\n{a${index}}: {c${index}}元`
							}
						})
						option.series = series
						
					}
					else if(this.tabs_current == 2) {
						//定价中心
						option.title.text = `${this.originalData3.pic_data.name} {a|[切换]}`
						option.xAxis.data = this.originalData3.pic_data.date_data1
						option.series[0].data = this.originalData3.pic_data.data_data1
						option.series[0].name = this.originalData3.pic_data.mode_data
						option.tooltip.formatter = '{b0}\n{a0}: {c0}'
					}
					option.title.subtext = ''
					let startValue = this.ec_btns_filters.filter(ele => ele.active)[0].startValue;
					option.dataZoom[0].startValue = startValue
				}else if(this.ecType == 2) {
					//月柱K图
					option.dataZoom[0].start = 50
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
				this.customShareParams.id = data.ppid
				this.customShareParams.dir = data.dir
				this.ec.option.title.text = `${data.name} {a|[切换]}`
				this.show_canvas = true;
				this.id = data.ppid
				this.dir = data.dir
				this.originalData = null
				this.originalData2 = null
				this.initData()
				this.indexData = {pid: data.pid}
				this.getIndexData()
				await this.getEcData()
				this.renderEc()
			},
			handleClickEcTabs(item, index) {
				if(item.isDev == 1) {
					uni.showToast({
						title: '该功能正在拼命建设中',
						icon: 'none'
					})
					return
				}
				if(item.hasOwnProperty('ec_type')) {
					this.tabs_current = index
					this.ecType = item.ec_type
					
					this.customShareParams.current = this.tabs_current
				}
				else {
					// item.url += '&data=' + JSON.stringify({
					// 	name: this.indexData?.Finfo?.name,
					// 	id: this.indexData?.pid,
					// 	keyword: ''
					// })
					this.navTo(`${item.url}?id=${this.id}&dir=${this.dir}`, item.type)
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
					uni.reLaunch({
						url: e
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
			async getPpiPer() {
				return await this.$api.getPpiPer({
					params: {
						id: this.id,
						// login: uni.getStorageSync('login'),
					}
				})
			},
			async ave() {
				return await this.$api.getPpiAve({
					params: {
						id: this.id,
						// login: uni.getStorageSync('login'),
					}
				})
				
			},
			async pricingCenter() {
				return await this.$api.pricingCenter({
					params: {
						pid: this.id,
						...this.setMoneyForm
					}
				})
				
			},
			handleSubmit() {
				this.$refs.form.validate().then(async () => {
					uni.showLoading( )
					const res = await this.pricingCenter()
					if(res.code == 1) {
						// this.setOnlineControl(res)
						this.ck_list = res.list
					}
				}).catch(errors => {
					uni.$u.toast('请检查表单内容')
				})
			}
		}
	};
</script>
<style lang="scss">
	page {
		.dark {
			/deep/ {
				.uni-date {
					.uni-date-x--border {
						border-color: #111224!important;
					}
					.uni-date-x {
						background-color: #111224!important;
						color: #bfc5e4!important;
					}
				}
			}
		}
		.white {
			/deep/ {
				.uni-date {
					.uni-date-x--border {
						border-color: #f8f8f8!important;
					}
					.uni-date-x {
						background-color: #f8f8f8!important;
						color: #333!important;
					}
				}
			}
		}
	}
</style>
<style scoped lang="scss">
	// .bg-black {
	// 	background-color: $page-bg;
	// }
	.time-btns {
		padding: 5px 25px 20px 25px;
		.item {
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			padding: 0 14px;
			border-radius: 15px;
			transition: all .3s;
		}
	}
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
