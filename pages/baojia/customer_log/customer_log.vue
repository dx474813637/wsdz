<template>
	<view class="w">
		<view class="tabs-w" v-if="tabs_list.length > 0">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			>
			</u-tabs>
		</view>
		<view class="list">
			<view class="u-p-30" >
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
		<view class="list u-p-30 u-m-t-20">
			<view class="u-m-b-30 u-flex u-flex-items-center">
				<i class="custom-icon-lianjie custom-icon text-primary u-font-36"></i>
				<view class="u-p-l-20">最新访问记录</view>
			</view>
			<view v-if="tabs_list[tabs_current] && tabs_list[tabs_current].list">
				<view class="u-m-b-20 u-flex u-flex-items-center u-flex-between"
					v-for="item in tabs_list[tabs_current].list"
					:key="item.id"
				>
					<view class="u-flex u-flex-items-center">
						<!-- <view class="u-m-r-10">
							<u-tag :text="item.id" type="error" size="mini" ></u-tag>
						</view> -->
						<view >
							<u-tag :text="item.log" size="mini" ></u-tag>
						</view>
					</view>
					<view class="u-flex u-flex-items-center u-font-24 text-base">
						{{item.uptime}}
					</view>
					
				</view>
			</view>
			<view class="" v-else>
				<u-empty
					mode="data"
					:icon="typeConfig.white.empty"
				>
				</u-empty>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import uniEcCanvas from "@/pages/baojia/components/uni-ec-canvas/uni-ec-canvas";
	export default {
		components: {
			uniEcCanvas
		},
		data() {
			return {
				ec: {
					option: {},
				},
				ecloading: false,
				login: '',
				mobile: '',
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
				originalData: null
			};
		},
		async onLoad(options) {
			if(options.hasOwnProperty('mobile')) {
				this.mobile = options.mobile
			}
			if(options.hasOwnProperty('login')) {
				this.login = options.login
			}else {
				uni.navigateBack({
					success() {
						uni.showToast({
							title: '参数login有误',
							icon: 'none'
						})
					}
				})
				return
			}
			
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
				typeConfig: state => state.theme.typeConfig,
				echarts: state => state.theme.echarts,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				// echartsConfig: 'theme/echartsConfig'
			}),
			echartsConfig() {
				return this.echarts.white
			}
		},
		async onReady() {
			uni.showLoading()
			await this.getData()
			this.handleInitSuccess()
		},
		methods: {
			async getData() {
				let loginParams = `${this.login}${this.mobile?','+this.mobile :''}`;
				const res = await this.$api.loginUidLog({params: {login: loginParams}})
				if(res.code == 1) {
					this.tabs_list = res.list.map(ele => {
						ele.fenxi.reverse()
						return {
								...ele,
								x: ele.fenxi.map(item => item.log),
								y: ele.fenxi.map(item => item.num),
								disabled: false,
								name: `UID: ${ele.uid}`
							}
					})
				}
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(value) {
				
				this.tabs_current = value.index
				this.changeTabsStatus('disabled', true)
				this.handleInitSuccess()
				this.changeTabsStatus('disabled', false)
			},
			async handleInitSuccess() {
				await this.getEcData()
				this.renderEc()
			},
			async getEcData() {
				this.ecloading = true
				let current = this.tabs_current
				this.originalData = this.tabs_list[current]
				
				this.ecloading = false
			},
			renderEc() {
				let type = 'bar'
				let option = uni.$u.deepClone({
					...this.echartsConfig.base,
					...this.echartsConfig.series[type]
				})
				option.grid = {
					...option.grid,
					bottom: '10%',
					y: '10%',
				}
				option.dataZoom[0] = {
					...option.dataZoom[0],
					// start: 0,
					startValue: this.originalData.x[this.originalData.x.length - 15 > 0 ? this.originalData.x.length - 15 :  0 ],
					yAxisIndex: 0,
					xAxisIndex: '',
					orient: 'horizontal',
				}
				option.title.text = '访问记录柱状统计'
				option.title.subtext = ''
				option.yAxis = {
					...option.yAxis,
					axisLine: {
						lineStyle: {
							color: '#a8c4da', //左边线的颜色
							width: '2'
						}
					},
					type: 'category',
					boundaryGap: true,
					data: this.originalData.x
				}
				option.xAxis = {
					...option.xAxis,
					type: 'value',
				}
				option.series[0] = {
					...option.series[0],
					data: this.originalData.y,
					name: '访问次数',
					itemStyle: {
						// color: '#007aff',
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 1,
							y2: 0,
							colorStops: [{
								offset: 1,
								color: '#aa55ff' 
							}, {
								offset: 0,
								color: '#007aff' 
							}],
							global: false // 缺省为 false
						},
						borderRadius: [0, 5, 5, 0],
					}
				}
				option.tooltip.formatter = '{b0}\n{a0}: {c0}次'
				
				
				this.ec.option = option
			},
		}
	}
</script>

<style lang="scss" scoped>
	.w {
		background-color: #f8f8f8;
		min-height: 100vh;
		padding: 0 15px;
	}
	.list {
		background-color: #fff;
		border-radius: 15px;
		
	}
</style>
<style lang="scss">

	.uni-ec-canvas {
		width: 100%;
		height: 80vh;
		display: block;
	}
</style>
