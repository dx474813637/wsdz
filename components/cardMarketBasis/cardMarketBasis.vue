<template>
	<view >
		<view class="radius text-gray u-font-30" @click="handleGotoDetail"
			:style="{
				color: themeConfig.pageTextSub,
				
			}"
		>	
			<view class="u-p-30" :style="{
				backgroundColor: themeConfig.marketCard.boxBgTop,
				color: themeConfig.baseText
			}">
				<view class="u-flex u-flex-items-center u-flex-between u-p-b-20">
					<view class=" u-flex u-flex-items-center">
						<view class=" u-p-l-10 u-p-r-10 u-radius-4 u-m-r-10"
							:style="{
								backgroundColor: type== 'buy'?themeConfig.marketCard.label_b: themeConfig.marketCard.label_s,
								color: '#fff'
							}"
						>{{type== 'buy'? '买' : '卖'}}</view>
						 
						<view>{{name}}</view>
						<view v-if="trade_type == '1'">{{origin.settle_month}}月 {{origin.settle_date | date2szx}}</view>
					</view> 
					<view class="u-font-28" :style="{ 
						color: themeConfig.marketCard.subText
					}">{{pubDate | date2timestamp | timeFrom}}</view>
				</view>
				
				<view class="rows u-flex u-flex-between u-flex-items-center" :style="{
					boxShadow: themeConfig.boxShadow
					}">
					<view class="item u-flex u-flex-items-center market-label "
						:style="{
							backgroundColor: themeConfig.marketCard.label_bg,
						}"
						>
						
						<view class="u-p-4 u-p-l-20 u-p-r-20">{{trade_type | tradeType2}}</view>
					</view>
					<view class="item u-line-1 u-flex-2">
						<template v-if="origin.trade_mode == '3'">
							{{origin.base_contract}}
							<template v-if="origin.price >= 0">+</template>
							{{origin.price}}
						</template>
						<template v-else>
							{{price | price2str(dprice)}}
						</template> 
					</view>
					<view class="item u-line-1 u-flex-1">
						{{delivery_place}}
					</view>
					<view class="item u-line-1 u-flex-1">
						{{num}}{{unit}}
					</view>
				</view>
			</view>
			<view class="u-p-30 u-font-28" :style="{
				backgroundColor: themeConfig.marketCard.boxBgBottom,
				color: themeConfig.marketCard.subText
			}">
				<view class="u-flex u-flex-between u-flex-items-center">
					<view class="u-line-1 u-flex-1"></view>
					<view class=" u-p-l-20">最迟点价时间：{{origin.expressed}}</view>
					
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"cardMarketBasis",
		props: {
			origin: {
				type: Object,
				default: () => {
					return {}
				}
			},
			cid: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			price: {
				type: String,
				default: ''
			},
			dprice: {
				type: String,
				default: ''
			},
			num: {
				type: String,
				default: ''
			},
			unit: {
				type: String,
				default: ''
			},
			trade_type: {
				type: String,
				default: ''
			},
			delivery_place: {
				type: String,
				default: ''
			},
			spec: {
				type: String,
				default: ''
			},
			pubDate: {
				type: String,
				default: ''
			},
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
			})
		},
		data() {
			return {
				
			};
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', {id: this.cid, type: this.type == 'buy'? 'b' : 's'})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.radius {
		border-radius: 16rpx;
		overflow: hidden;
	}
	.market-label {
		overflow: hidden;
		border-radius: 10rpx;
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
	.rows .item {
		// flex: 0 0 25%;
		text-align: center;
		&:first-child {
			text-align: left;
		}
		&:last-child {
			text-align: right;
		}
	}
</style>
