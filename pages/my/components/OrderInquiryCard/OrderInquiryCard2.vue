<template>
	<view class="card-w u-p-16"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		> 
		<view class="card-header u-flex u-flex-between u-flex-items-center u-p-10">
			<view class="item u-flex-1 u-p-r-20">
				<view class="item u-flex u-flex-items-center u-m-b-10"> 
					<text class="name u-line-1 ">{{name}}</text>
					<text class="pp text-error">
						<template v-if="origin.trade_mode == '3'">
							{{origin.base_contract}}合约
							<template v-if="origin.price >= 0"> + </template>
							{{origin.price}} 元/{{origin.unit}}
						</template>
						<template v-else-if="origin.trade_mode == '5'">
							{{origin.amount}} {{origin.unit}}
						</template>
						<template v-else> 
							{{price | price2str(dprice)}}
							<template v-if="price>0">元/{{unit}}</template>
						</template>
					</text>
				</view>
				<view class="item u-flex u-flex-items-center">
					<view class="u-m-r-10" style="white-space: nowrap;">
						<u-tag :text="origin.trade_mode | bidTradeM2str" plain plainFill size="mini" type="error" :custionStyle="{height: '18px', minHeight: '18px'}"></u-tag>
					</view>
					<view class="u-m-r-10" style="white-space: nowrap;">
						<u-tag :text="type | tradeType2" size="mini" plain plainFill :custionStyle="{height: '18px', minHeight: '18px'}"></u-tag>
					</view>
					<text class=" item-sub u-line-1 u-flex-1">{{sub}}</text>
				</view>
			</view>
			<view class="item">
				<u-switch 
					size="20"
					:value="switch_status" 
					:loading="loading"  
				></u-switch>
			</view>
		</view> 
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-12">
			<view class="item text-light u-font-28">更新于{{date | date2timestamp | timeFrom}}</view>
			<view class="item u-flex u-flex-items-center"> 
			</view>
			
		</view>
		
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-12 u-m-t-10" v-if="mySend">
			<view class="item text-light u-font-28">
				<view v-if="shareBtnConfig.button1"
					@click.stop="handleShare">
					<u-button 
					 open-type="share"
					  id="share"
						type="primary"  
						shape="circle" 
						plain
						icon="share-fill"
						:disabled="doing"
					>{{shareBtnConfig.button1}}</u-button>
				</view>
			</view>
			<view class="item u-flex u-flex-items-center">
				<view style="position: relative;" v-if="inquiry"
					@click.stop="guanlianbtn">
					<u-button
						type="primary"   
						shape="circle"  
						:disabled="doing"
					>{{shareBtnConfig.button3}}</u-button>
					<u-badge type="error" max="99" :value="origin.total_orders" absolute :offset="[-2, -5]"></u-badge>
				</view> 
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name: 'OrderInquiryCard2',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			name: {
				type: String,
				default: '名称',
			},
			sub: {
				type: String,
				default: 'sub',
			},
			pid: {
				type: String,
				default: '',
			},
			price: {
				type: String,
				default: 'price',
			},
			dprice: {
				type: String,
				default: 'dprice',
			},
			unit: {
				type: String,
				default: 'unit',
			},
			date: {
				type: String,
				default: 'date',
			},
			type: {
				type: String,
				default: 'type',
			},
			status: {
				type: String,
				default: '0',
			},
			origin: {
				type: Object,
				default:() => {
					return {}
				},
			},
			shareBtnConfig: {
				type: Object,
				default:() => {
					return {
						button1: '',
						button2: '',
					}
				},
			},
			isAuth: {
				type: Boolean,
				default: false
			},
			mySend: {
				type: Boolean,
				default: false
			},
			inquiry: {
				type: Boolean,
				default: false
			},
			boxShadow: {
				type: String,
				default: '0 0 10rpx rgba(0,0,0,.1)',
			},
			borderRadius: {
				type: String,
				default: '16rpx',
			},
		},
		data() {
			return {
				switch_status: false,
				loading: false,
				
			}
		},
		computed: {
			...mapState({ 
				myCpy: state => state.user.myCpy,
			}),
			doing() {
				return this.loading
			}
		},
		watch: {
			status: {
				immediate: true,
				handler(flag) {
					console.log(flag)
					if(flag == '1') this.switch_status = true;
					else this.switch_status = false;
					this.loading = false;
				}
			}
		},
		methods: { 
			handleGotoDetail() {
				this.$emit('detail', {pid: this.pid, data: this.origin})
			}, 
			handleShare() {
				this.$emit('handleShare', {data: this.origin})
			}, 
			guanlianbtn() {
				this.$emit('guanlian', this.origin)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 34rpx;
		word-break: break-all;
	}
	.pp {
		color: #999;
		padding-left: 10rpx;
		white-space: nowrap;
	}
	.item-sub {
		color: #666;
	}
</style>
