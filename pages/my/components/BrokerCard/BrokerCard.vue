<template>
	<view class="card-w u-p-16"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		
		>
		<view class="card-header u-flex u-flex-between u-flex-items-center u-p-10">
			<view class="item u-flex-1 u-p-r-20" @click="handleGotoDetail">
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
					@input.stop="switchInput"
				></u-switch>
			</view>
		</view>
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-12" v-if="origin.trade_mode == '1'">
			<view class="item text-primary u-font-30 u-flex u-flex-items-center">
				<view class="u-m-r-40" @click="showPop('jp')">竞拍列表</view>
				<view class="u-m-r-40" @click="showPop('yy')">预约列表</view>
			</view>
			<view class="item u-flex u-flex-items-center"></view>
			
		</view>
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-12">
			<view class="item text-light u-font-28">更新于{{date | date2timestamp | timeFrom}}</view>
			<view class="item u-flex u-flex-items-center">
				<view class="u-p-l-12" v-if="!isAuth">
					<u-button 
						type="primary" 
						size="mini" 
						shape="circle" 
						icon="file-text"
						:disabled="doing"
						@click.stop="handleResubmit"
					>重发</u-button>
				</view>
				<view class="u-p-l-12">
					<u-button 
						type="primary" 
						size="mini" 
						shape="circle" 
						icon="attach"
						:disabled="doing"
						@click.stop="handleFront"
					>预览</u-button>
				</view>
				<view class="u-p-l-12" v-if="!isAuth">
					<u-button 
						type="error" 
						size="mini" 
						shape="circle" 
						icon="trash"
						:disabled="doing"
						@click.stop="handleDelet"
					>删除</u-button>
				</view>
			</view>
			
		</view>
		
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-12 u-m-t-20" v-if="mySend">
			<view class="item text-light u-font-28">
				<view v-if="shareBtnConfig.button1">
					<u-button 
					 open-type="share"
					  id="share"
						type="primary"  
						shape="circle" 
						plain
						size="small"
						icon="share-fill"
						:disabled="doing"
						@click.stop="handleShare"
					>{{shareBtnConfig.button1}}</u-button>
				</view>
			</view>
			<view class="item u-flex u-flex-items-center">
				<view style="position: relative;" v-if="inquiry">
					<u-button
						type="primary"   
						size="small"
						shape="circle"  
						:disabled="doing"
						@click.stop="guanlianbtn"
					>{{shareBtnConfig.button3}}</u-button>
					<u-badge type="error" max="99" :value="origin.total_orders" absolute :offset="[-2, -5]"></u-badge>
				</view>
				<view class="u-m-l-30" v-if="shareBtnConfig.button2">
					<u-button 
						type="primary"  
						plain
						size="small"
						shape="circle" 
						icon="photo-fill"
						:disabled="doing"
						@click.stop="handleBigPic"
					>{{shareBtnConfig.button2}}</u-button>
				</view> 
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name: 'BrokerCard',
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
			switchInput(value) {
				if(this.myCpy.state == '2') {
					uni.showToast({
						title: '当前用户信息被平台灭活',
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '提示',
					content: `是否改变当前${this.name}的状态`,
					success: (res) => {
						if (res.confirm) {
							this.loading = true;
							this.$emit('changeStatus',  {state: value?'1':'0', id: this.pid})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleFront() {
				this.$emit('front', {id: this.pid})
			},
			handleDelet() {
				console.log('删除事件')
				uni.showModal({
					title: '提示',
					content: `是否删除该商品名：${this.name}`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('delet', {id: this.pid})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleResubmit() {
				if(this.myCpy.state == '2') {
					uni.showToast({
						title: '当前用户信息被平台灭活',
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '提示',
					content: `是否重发${this.name}`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('resubmit', {data: {...this.origin, to_100ppi: '1'}})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleGotoDetail() {
				this.$emit('detail', {pid: this.pid, data: this.origin})
			},
			showPop(type) {
				this.$emit('showPop', {type, data: this.origin})
			},
			handleShare() {
				this.$emit('handleShare', {data: this.origin})
			},
			handleBigPic() {
				this.$emit('handleBigPic', {data: this.origin})
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
