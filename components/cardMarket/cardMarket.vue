<template>
	<view :style="{
			boxShadow: themeConfig.marketCard.boxShadow
		}"
	>
		<view class="radius text-gray u-font-30" @click="handleGotoDetail"
			:style="{
				color: themeConfig.pageTextSub,
				boxShadow: themeConfig.boxShadow
			}"
		>	
			<view class="u-p-30" :style="{
				backgroundColor: themeConfig.marketCard.boxBgTop,
				color: themeConfig.baseText
			}">
				<view class="rows u-flex u-flex-between u-flex-items-center">
					<view class="item u-flex u-flex-items-center market-label"
						:style="{
							backgroundColor: themeConfig.marketCard.label_bg,
						}"
					>
						<view v-if="type== 'buy'"
							class="u-p-4 u-p-l-10 u-p-r-10"
							:style="{
								backgroundColor: themeConfig.marketCard.label_b,
								color: '#fff'
							}"
						>买</view>
						<view v-if="type== 'sell'"
							class="u-p-4 u-p-l-10 u-p-r-10"
							:style="{
								backgroundColor: themeConfig.marketCard.label_s,
								color: '#fff'
							}"
						>卖</view>
						<view class="u-p-4 u-p-l-20 u-p-r-20">{{trade_type | tradeType2}}</view>
					</view>
					<view class="item u-line-1">
						{{price | price2str(dprice)}}
					</view>
					<view class="item u-line-1">
						{{delivery_place}}
					</view>
					<view class="item u-line-1">
						{{num}}{{unit}}
					</view>
				</view>
			</view>
			<view class="u-p-30 u-font-28" :style="{
				backgroundColor: themeConfig.marketCard.boxBgBottom,
				color: themeConfig.marketCard.subText
			}">
				<view class="u-flex u-flex-between u-flex-items-center">
					<view class="u-line-1 u-flex-1">品牌/产地：{{spec}}</view>
					<view class=" u-p-l-20">{{pubDate | date2timestamp | timeFrom}}</view>
					
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"cardMarket",
		props: {
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
		flex: 0 0 25%;
		text-align: center;
		&:first-child {
			text-align: left;
		}
		&:last-child {
			text-align: right;
		}
	}
</style>
