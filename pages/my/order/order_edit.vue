<template>
	<view class="u-p-20 u-p-l-40 u-p-r-40">
		<view :style="{
			opacity: pageLoading ? 0 : 1,
			position: 'relative',
			zIndex: 0,
		}">
			<u--form
				labelPosition="left"
				:model="form"
				ref="form"
				labelWidth="80"
				>
					<u-form-item
						:label="ordertype == 'S' ? '买方' : '卖方'"
					>
						<view class="">{{company}}</view>
					</u-form-item>
					<u-form-item
						label="商品" 
					>
						<view class="">
							{{type == 'edit' ? order.Product.name : panRes.list.name}} 
						</view>
					</u-form-item>
					<u-form-item
						label="数量" 
					>
						<view class=""> 
							{{panRes.list.amount}}{{panRes.list.unit}}
						</view>
					</u-form-item>
					
					<u-form-item
						label="可售量" 
						v-if="ordertype=='B'"
					>
						<view class="">
							{{left_amount}}{{panRes.list.unit}}
						</view>
					</u-form-item>
					<template v-if="panRes.list.trade_mode == '3'">
						<u-form-item
							label="基差合约" 
						>
							<view class=""> 
								{{panRes.list.base_contract}} 
							</view>
						</u-form-item>
						<u-form-item
							label="基差" 
						>
							<view class=""> 
								{{panRes.list.price}} 元/{{panRes.list.unit}}
							</view>
						</u-form-item>
						<u-form-item
							label="价格类型"
							prop="base_price_type"
							ref="base_price_type"
							required
						>
							<u-radio-group
								v-model="form.base_price_type"
								placement="row"
							  >
								<u-radio
								  :customStyle="{marginRight: '8px'}"
								  v-for="(item, index) in base_price_type_radios"
								  :key="index"
								  :name="item.value"
								  :label="item.name"
								  :disabled="item.disabled"
								>
								</u-radio>
							</u-radio-group>
						</u-form-item>
						<!-- <u-form-item
							label="点价后最迟交收天数" 
						>
							<view class=""> 
								{{panRes.list.base_afterday}} 天
							</view>
						</u-form-item>	 -->
					</template>
					<u-form-item
						:label="ordertype == 'S' ? '供应量' : '采购量'"
						prop="amount"
						ref="amount"
						required
					>
						<view class="u-flex u-flex-items-center">
							<view class="u-flex-1">
								<u--input
									v-model="form.amount"
									clearable
									type="digit"
								></u--input>
							</view>
							<view class="u-p-l-10">{{type == 'edit' ? order.Source.unit : panRes.list.unit}}</view>
						</view>
						
					</u-form-item>
					<u-form-item
						:label="priceLabelStr"
						prop="price"
						ref="price"
						required
					>
						<view class="u-flex u-flex-items-center">
							<view class="u-flex-1">
								<u--input 
									v-model="form.price"
									clearable
									:disabled="panRes.list.trade_mode == '2'"
									type="digit"
									@focus="tar = 'price'"
								></u--input> 
							</view>
							<view class="u-p-l-10">元/{{type == 'edit' ? order.Source.unit : panRes.list.unit}}</view>
						</view>
						
					</u-form-item>
					<template v-if="ordertype == 'S' && form.settle_mode == 'S'">
						<u-form-item
							label="单价包含运费"
							prop="had_tran"
							ref="had_tran" 
							required
						>
							<u-radio-group
								v-model="form.had_tran"
								placement="row"
							  >
								<u-radio
								  :customStyle="{marginRight: '8px'}"
								  v-for="(item, index) in had_tran_radios"
								  :key="index"
								  :name="item.value"
								  :label="item.name"
								  :disabled="item.disabled"
								>
								</u-radio>
							</u-radio-group>
							
						</u-form-item>
						<u-form-item
							:label="tranPriceLabelStr"
							prop="tran_price"
							ref="tran_price"
							required 
						>
							<view class="u-flex u-flex-items-center">
								<view class="u-flex-1">
									<u--input 
										v-model="form.tran_price"
										clearable 
										type="digit"
										@focus="tar = 'tran_price'"
									></u--input> 
								</view>
								<view class="u-p-l-10">元</view>
							</view>
							
						</u-form-item>
					</template>
					
					<u-form-item
						label="商品总额"
						prop="total_price"
						ref="total_price"
						required
					>
						<view class="u-flex u-flex-items-center"> 
							{{form.total_price}}元 
						</view>
						
					</u-form-item>
					<template v-if="panRes.list.trade_mode == '3'">
						<!-- 基差交易方式下 -->
						
						<u-form-item
							label="点价开始"
							prop="base_btime"
							ref="base_btime" 
						>
							<view @click="showStartDate = true">
								<u--input
									:value="form.base_btime || '请选择开始时间'"
									readonly 
									suffixIcon="calendar"
								></u--input>
							</view>
							
						</u-form-item>
						
						<u-datetime-picker
							title="开始日期"
							:show="showStartDate"
							v-model="form.base_btimestamp"
							mode="datetime"
							:minDate="new Date().getTime()"
							closeOnClickOverlay 
							@close="showStartDate = false"
							@cancel="showStartDate = false"
							@confirm="confirmStartDate"
						></u-datetime-picker>
						
						<u-form-item
							label="点价截至"
							prop="base_etime"
							ref="base_etime" 
						>
							<view @click="showEndDate = true">
								<u--input
									:value="form.base_etime || '请选择截至时间'"
									readonly 
									suffixIcon="calendar"
								></u--input>
							</view>
							
						</u-form-item>
						<u-form-item
							label="挂牌截至" 
							v-if="panRes.hasOwnProperty('list')"
						>
							<view>
								{{panRes.list.express_time}} {{panRes.list.express_unit}}:00
							</view>
							
						</u-form-item>
						<u-datetime-picker
							title="结束日期"
							:show="showEndDate"
							v-model="form.base_etimestamp"
							mode="datetime"
							:minDate="new Date().getTime()"
							closeOnClickOverlay 
							@close="showEndDate = false"
							@cancel="showEndDate = false"
							@confirm="confirmEndDate"
						></u-datetime-picker>
						
					</template>
					
					<u-form-item
						label="交收方式"
						prop="settle_mode"
						ref="settle_mode"
					>
						<u-radio-group
							v-model="form.settle_mode"
							placement="row"
						  >
							<u-radio
							  :customStyle="{marginRight: '8px'}"
							  v-for="(item, index) in settle_mode_radios"
							  :key="index"
							  :name="item.value"
							  :label="item.name"
							  :disabled="item.disabled"
							>
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item
						label="交付方式"
						prop="pay_option1"
						ref="pay_option1"
						required
					>
						<!-- v-if="panRes.list.order_type == '1'" -->
						<u-radio-group
							v-model="form.pay_option1"
							placement="row"
						  >
							<u-radio
							  :customStyle="{marginRight: '8px'}"
							  v-for="(item, index) in pay_option1_radios"
							  :key="index"
							  :name="item.value"
							  :label="item.name"
							  :disabled="item.disabled"
							>
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item
						label="支付工具"
						prop="pay_option2"
						ref="pay_option2"
						required
					>
						<!-- v-if="panRes.list.order_type == '1'" -->
						<u-radio-group
							v-model="form.pay_option2"
							placement="row"
						  >
							<u-radio
							  :customStyle="{marginRight: '8px'}"
							  v-for="(item, index) in pay_option2_radios"
							  :key="index"
							  :name="item.value"
							  :label="item.name"
							  :disabled="item.disabled"
							>
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item
						label="签约方式" 
					>	
						{{ panRes.list.esign_type | esignType2Str}}
					</u-form-item>
					<u-form-item
						label="卖方票据" 
						prop="pyeeInfo"
						ref="pyeeInfo"
						required
						v-if="form.pay_option2 == 'BILLPAY'"
					>
						<view class="" @click="show_billacc = true">
							<u--input
								:value="form.pyeeInfo" 
								placeholder="选择卖方收款票据账户"
								suffixIcon="arrow-down"
								suffixIconStyle="color: #909399"
								readyonly
								:customStyle="{background: '#fff'}"
							></u--input>
						</view>
						
					</u-form-item>
					
					<u-form-item
						:label="form.settle_mode == 'S' ? '收货区域' : '提货区域' "
						prop="delivery_place"
						ref="delivery_place"
						required
					>
						<view style="width: 255px;">
							<uni-data-picker
								v-if="!qiehuan"
								placeholder="请选择所在地区" 
								popup-title="请选择所在地区" 
								:localdata="addressArea" 
								v-model="form.delivery_place"
							></uni-data-picker>
							<view v-else>
								{{panRes.list.delivery_place}}
								<!-- <template v-if="type == 'add'">
									{{panRes.list.delivery_place}}
								</template>
								<template v-else-if="order.Regionals">
									{{order.Regionals.map(ele => ele.Particular.name).join('/')}}
									{{panRes.list.delivery_place1}}
								</template> -->
								
							</view>
						</view>
						
					</u-form-item>
					<u-form-item
						:label="form.settle_mode == 'S' ? '收货地址' : '提货地址' "
						prop="settle_address"
						ref="settle_address"
						:required="form.settle_mode == 'S'"
					>
						<view>
							<u--input
								v-if="!qiehuan ||  panRes.list.trade_mode == '3' "
								v-model="form.settle_address"
								placeholder="填写地址" 
								clearable
							></u--input>
							<view v-else>
								<rich-text :nodes="panRes.list.delivery_address"></rich-text> 
								<!-- <template v-if="type == 'add'">
									<rich-text :nodes="panRes.list.delivery_address"></rich-text> 
								</template>
								<template v-else>
									<rich-text :nodes="order.settle_address"></rich-text>  
								</template> -->
							</view>
						</view>
					</u-form-item>
					<u-form-item
						label="商品详情"
						prop="intro"
						ref="intro"
					>
						<u--textarea
							v-model="form.intro" 
							placeholder="商品详情" 
							height="90"
						></u--textarea>
					</u-form-item>
					<u-form-item
						label="备注"
						prop="remark"
						ref="remark"
					>
						<u--textarea
							v-model="form.remark" 
							placeholder="备注" 
							height="90"
						></u--textarea>
					</u-form-item>
				
			</u--form>
			<view class="u-p-t-20 u-m-b-40">
				<u-button type="primary" @click="submit">提 交</u-button>
			</view> 
		</view>
		<u-loading-page 
			:loading="pageLoading"
			loading-text="loading..."
			loadingMode="semicircle" 
		></u-loading-page>
		
		<menusPopupBillAcc
			:show="show_billacc" 
			theme="white"  
			:params="{
				source_id: id,
				source: ordertype == 'S' ? 'BUY' : 'SELL'
			}"
			@close="show_billacc = false"
			@confirm="menusConfirm"
		></menusPopupBillAcc>
	</view>
</template>

<script>
	const INIT_START_TIME = new Date().getTime()+3600*24*1000;
	const INIT_END_TIME = INIT_START_TIME + 3600*1000;
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				type: 'add',
				ordertype: '',
				id: '',
				fxid: '',
				panRes: {
					list: {}
				},
				left_amount: null,
				order: {},
				tar: '',
				pageLoading: true,
				show_billacc: false,
				showStartDate: false,
				showEndDate: false,
				form: { 
					source: '',
					source_id: '',
					amount: '',
					price: '0',
					total_price: '0',
					pay_option1: 'D_P',
					pay_option2: 'NOPAY',
					pyeeInfo: '',
					settle_mode: '',
					delivery_place: '',
					settle_address: '',
					intro: '',
					remark: '', 
					base_btime: '',
					base_btimestamp: '',
					base_etime: '',
					base_etimestamp: '',
					base_price_type: '1',
					had_tran: '1',
					tran_price: '0'
				},
				base_price_type_radios: [
					{
						name: '现货价',
						value: '1'
					},
					{
						name: '期货价',
						value: '2'
					},
				],
				had_tran_radios: [
					{
						name: '是',
						value: '1'
					},
					{
						name: '否',
						value: '0'
					},
				],
				settle_mode_radios: [
					{
						name: '买家自提',
						value: 'B'
					},
					{
						name: '卖家送货',
						value: 'S'
					},
				],
				pay_option1_radios: [
					{
						name: '款到发货',
						value: 'D_P',
						disabled: false,
					},
					// {
					// 	name: '担保支付',
					// 	value: 'GRT',
					// 	disabled: false,
					// },
					{
						name: '货到付款',
						value: 'COD',
						disabled: false,
					},
				],
				pay_option2_radios: [
					{
						name: '线下支付凭证',
						value: 'NOPAY',
						disabled: false,
					},
					// {
					// 	name: '现金',
					// 	value: 'FUNDPAY',
					// 	disabled: false,
					// },
					// {
					// 	name: '票据-小程序端暂不支持',
					// 	value: 'BILLPAY',
					// 	disabled: true,
					// },
				],
				trade_mode: '',
			}
		},
		computed: {
			...mapState({
				addressArea: state => state.user.addressArea,
				sinoBillAccount: state => state.sinopay.sinoBillAccount,
				sinoBillAccountList: state => state.sinopay.sinoBillAccountList,
			}),
			company() {
				let company = ''
				if(this.type == 'edit') {
					if(this.ordertype == 'S') {
						company = this.order.b_company
					}else {
						company = this.order.s_company
					}
				}else {
					company = this.panRes?.login_company?.name
				} 
				return company 
			},
			tranPriceLabelStr() {
				let str = '运费'
				if(this.form.had_tran == '1') {
					str = '其中运费' 
				} 
				return str
			},
			priceLabelStr() {
				let str = '单价'
				if(this.panRes.list.trade_mode == '3') {
					str = '现货成交单价(一口价)'
					if(this.form.base_price_type == '1') {
						str = '现货单价'
					}
					else if(this.form.base_price_type == '2') {
						str = '期货盘面价'
					}
				} 
				return str
			},
			qiehuan() {
				let qiehuan
				if(this.panRes?.list?.trade_mode == '3') {
					// console.log('ddd')
					if(this.ordertype == 'S') {
						qiehuan = true
					}else {
						qiehuan = false
					}
				}else {
					if(this.ordertype == 'S') {
						if(this.form.settle_mode == 'S') {
							qiehuan = true
						}else {
							qiehuan = false
						}
					}else {
						if(this.form.settle_mode == 'S') {
							qiehuan = false
						}else {
							qiehuan = true
						}
					}
				}
				
				return qiehuan
			},
			rules() {
				let base = {
					amount: {
						required: true, 
						validator: (rule, value, callback) => {
							return uni.$u.test.number(value)
						},
						message: '请填写正确的数值',
						trigger: ['blur', 'change']
					},
					total_price: {
						required: true,
						validator: (rule, value, callback) => {
							return uni.$u.test.number(value)
						},
						message: '请填写正确的数值',
						trigger: ['blur', 'change']
					},
					price: {
						required: true,
						validator: (rule, value, callback) => {
							return uni.$u.test.number(value)
						},
						message: '请填写正确的数值',
						trigger: ['blur', 'change']
					},
				}	 
				if(this.panRes.list?.amount ) {
					base.amount.validator = (rule, value, callback) => {
						return uni.$u.test.number(value) && value > 0 && value <= +(uni.$u.test.number(this.left_amount) ? this.left_amount :this.panRes.list.amount)
					}
					if(this.ordertype == 'B') {
						base.amount.message = '采购量不能大于可售量'
					}else {
						base.amount.message = `请填写0-${ uni.$u.test.number(this.left_amount) ? this.left_amount :this.panRes.list.amount}范围内的数值` 
						
					}
				}
				// if(this.panRes.list?.order_type == '1') {
				// 	base = {
				// 		...base,
				// 		pay_option1: {
				// 			required: true, 
				// 			message: '请选择',
				// 			trigger: ['blur', 'change']
				// 		},
				// 		pay_option2: {
				// 			required: true, 
				// 			message: '请选择',
				// 			trigger: ['blur', 'change']
				// 		},
				// 	}
				// } 
				if(this.form.pay_option2 == 'BILLPAY') {
					base = {
						...base,
						pyeeInfo: {
							required: true, 
							message: '请选择卖方票据账户',
							trigger: ['blur', 'change']
						},
					}
				} 
				// if(!this.qiehuan) {
				if(this.ordertype == 'S') {
					base = {
						...base,
						delivery_place: {
							required: true,
							message: '请选择所在区域',
							trigger: ['blur', 'change']
						}, 
					}
					if(this.form.settle_mode == 'S') {
						base = {
							...base, 
							settle_address: {
								required: true,
								message: '请填写地址',
								trigger: ['blur', 'change']
							},
							tran_price: {
								required: true,
								message: '请填写运费',
								trigger: ['blur', 'change']
							},
						}
					}
				} 
				if(this.panRes?.list?.trade_mode != '3') {
					base = {
						...base,
						base_btime: {
							required: true,
							message: '请选择开始时间',
							trigger: ['blur', 'change']
						},
						base_etime: {
							required: true,
							message: '请选择结束时间',
							trigger: ['blur', 'change']
						},
					}
				}
				if(this.panRes.list.trade_mode == '3') {
					base = {
						...base,
						base_price_type: {
							required: true,
							message: '请选择价格类型',
							trigger: ['blur', 'change']
						}, 
					}
				}
				
				if(this.$refs.form && this.$refs.form.setRules) {
					this.$refs.form.setRules(base)	 
				}
				return base
			}
		},
		async onLoad(options) {
			if(options.hasOwnProperty('type')) {
				this.type = options.type
			}
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			}
			if(options.hasOwnProperty('fxid')) {
				this.fxid = options.fxid
			}
			if(options.hasOwnProperty('ordertype')) {
				this.ordertype = options.ordertype
			}
			if(options.hasOwnProperty('trade_mode')) {
				this.trade_mode = options.trade_mode
			}
			this.init()
			
			
		},
		onReady() {
			this.$refs.form.setRules(this.rules) 
		},
		watch: {
			['form.pay_option1'](n, o) {
				console.log(n)
				// if(n == 'GRT') {
				// 	if(this.sinoBillAccount && this.sinoBillAccountList.length > 0) { 
				// 		this.pay_option2_radios[1].disabled = false
				// 	}
				// }else {
				// 	this.pay_option2_radios[1].disabled = true
				// 	if(o == 'GRT') {
				// 		this.form.pay_option2 = this.pay_option2_radios[0].value
				// 	}
				// }
			}, 
			['form.settle_mode']: {
				immediate: true,
				handler(n, o) {
					// console.log(this.type, this.ordertype, n, this.order.delivery_place)
					  
					this.pay_option1_radios.some(ele => {
						if(ele.value == 'COD') {
							ele.disabled = n == 'B'? true : false
							return true
						}
						return false
					})
					if(this.form.pay_option1 == 'COD' && n == 'B') this.form.pay_option1 = 'D_P'
					if(n == 'B') this.form.tran_price = '0' 
					if(this.type == 'add') { 
						if(this.panRes.list.trade_mode == '3') {
							this.form.delivery_place = this.panRes.list.delivery_place1 
							return
						}
						if(this.ordertype == 'B') { 
							if(n == 'S') {
								this.form.delivery_place = ''
								this.form.settle_address = '' 
								return
							} 
						}else {
							if(n == 'B') { 
								this.form.delivery_place = ''
								this.form.settle_address = ''
								return
							} 
						} 
						this.form.delivery_place = this.panRes.list.delivery_place1 
						this.form.settle_address = this.panRes.list.delivery_address
					}else { 
						if(this.order.delivery_place == this.panRes.list.delivery_place1
							&& this.order.settle_address == this.panRes.list.delivery_address) {
							if(this.ordertype == 'B') {
								if(n == 'S') {
									this.form.delivery_place = ''
									this.form.settle_address = ''
									return
								} 
							}else {
								if(n == 'B') {
									this.form.delivery_place = ''
									this.form.settle_address = ''
									return
								} 
							} 
						}else {
							
							this.form.delivery_place = this.order.delivery_place
							this.form.settle_address = this.order.settle_address 
						}
						
					}
					this.sumPrice()
				}
			}, 
			['form.amount'](n, o) {
				if(this.form.price === '') return
				this.sumPrice()
			}, 
			['form.price'](n, o) {
				if(this.panRes.list.trade_mode == '2') {
					this.form.price = this.panRes.list.price1
					return 
				}
				if(this.form.amount === '' || this.tar == 'total_price') return 
				this.sumPrice()
			}, 
			['form.base_price_type'](n, o) { 
				this.sumPrice()
			}, 
			['form.had_tran'](n, o) { 
				this.sumPrice()
			}, 
			['form.tran_price'](n, o) { 
				this.sumPrice()
			}, 
			// ['form.total_price'](n, o) {
			// 	if(o === '' || this.tar == 'price') return
			// 	// this.form.price = Number((n / this.form.amount).toFixed(2))
			// }, 
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getAddressArea: 'user/getAddressArea',
				getSinoBillAccount: 'sinopay/getSinoBillAccount',
				getSinoBillAccountList: 'sinopay/getSinoBillAccountList',
			}),
			menusConfirm(data) {
				console.log(data)
				this.form.pyeeInfo = data.pyeeInfo
				this.$refs.form.validateField('pyeeInfo')
			}, 
			sumPrice() {
				let total_price = Number((this.form.amount * this.form.price).toFixed(2))
				if(this.form.base_price_type == '2') {
					total_price = Number((this.form.amount * this.form.price + this.panRes.list.price).toFixed(2))
				} 
				if(this.ordertype == 'S') {
					if(this.form.had_tran == '0' && this.form.settle_mode == 'S') {
						total_price += Number(this.form.tran_price)
					}
				}
				this.form.total_price = total_price
			},
			async init() {
				this.getAddressArea()
				if(this.ordertype == 'B') {
					const res = await this.$api.order_query_amount_active({
						params: {
							 source_id: this.id
						}
					})
					this.left_amount = res.list?.left_amount
					this.form.amount = this.left_amount
				}
				if(this.type == 'add') {
					uni.setNavigationBarTitle({
						title: '创建订单'
					})
					uni.showLoading({
						title: '获取商品信息'
					})
					await this.getPan()
					
					 
					this.form.settle_address = this.panRes.list.delivery_address
					//订单类型为销售订单时，settle_mode直接从买盘信息里读取 BS
					this.form.source_id = this.id
					this.form.source = this.ordertype == 'S'? 'BUY' : 'SELL'
					this.settle_mode_radios = this.settle_mode_radios.filter(ele => this.panRes.list.settle_mode.includes(ele.value) )
					this.form.settle_mode = this.settle_mode_radios[1] ? this.settle_mode_radios[1].value : this.settle_mode_radios[0].value
					if(this.panRes.list.trade_mode != '3') this.form.price = this.panRes.list.price1
					
					this.form.delivery_place = this.panRes.list.delivery_place1
					// if(this.panRes.list.order_type == '1') {
					// 	this.form.pay_option1 = 'GRT'
					// 	this.form.pay_option2 = 'FUNDPAY'
					// }
				}else {
					uni.setNavigationBarTitle({
						title: '修改订单'
					})
					uni.showLoading({
						title: '获取订单信息'
					})
					await this.getOrder()
					this.settle_mode_radios = this.settle_mode_radios.filter(ele => this.panRes.list.settle_mode.includes(ele.value) )
				}
				
				this.pageLoading = false
				 // if(!this.sinoBillAccount) {
					//  await this.getSinoBillAccount()
					//  if(this.sinoBillAccount) {
					// 	 await this.getSinoBillAccountList()
					//  }else {
					// 	 this.pay_option2_radios[1].name = '票据-您未开通票据账户'
					//  }
				 // }
				
			},
			async getPan() {
				let func = ''
				if(this.ordertype == 'B') func = 'getSellDetail'
				else func = 'getBuyDetail'
				const res = await this.$api[func]({
					params: { 
						id: this.id,
						fxid: this.fxid,
						trade_mode: this.trade_mode
					}
				})
				if(res.code == 1) {
					this.panRes = res 
				}
			},
			async getOrder() {
				const res = await this.$api.order_detail({
					params: {
						ordertype: this.ordertype,
						id: this.id
					}
				})
				if(res.code == 1) {
					this.pan = res.list.Order.Source
					this.panRes = {
						list: res.list.Order.Source
					}
					this.order = res.list.Order  
					this.left_amount = this.order.left_amount
					this.form.id = this.id
					// this.form.source = res.list.Order.source
					this.form.source_id = res.list.Order.source_id
					this.form.amount = res.list.Order.amount
					this.form.price = res.list.Order.price1
					this.form.total_price = res.list.Order.total_price1
					// this.form.pay_option2 = res.list.Order.pay_mode.includes == 'BILLPAYGUARANTE' ? 'BILLPAY' : 'FUNDPAY'
					this.form.pay_option2 = 'NOPAY' 
					this.form.pyeeInfo = res.list.Order.payeeAccNm || ''
					this.form.settle_mode = res.list.Order.settle_mode
					this.form.pay_option1 = res.list.Order.settle_type
					this.form.delivery_place = res.list.Order.delivery_place
					this.form.settle_address = res.list.Order.settle_address
					this.form.intro = res.list.Order.intro
					this.form.remark = res.list.Order.remark
					
				}
			},
			//确认 开始日期
			confirmStartDate(e) {  
				this.form.base_btimestamp = e.value
				this.form.base_btime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
				// this.form.base_etime = '0'
				this.showStartDate = false 
				this.$refs.form.validateField('base_btime')
				this.$refs.form.validateField('base_etime')
			},
			//确认 结束日期
			confirmEndDate(e) {   
				let date = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
				if(new Date(date.replace(/-/g, "/")).getTime() < new Date(this.form.base_btime.replace(/-/g, "/")).getTime()) {
					uni.showToast({
						title: '结束时间必须大于开始时间',
						icon: 'none'
					})
					
					return
				}
				this.form.base_etimestamp = e.value
				this.form.base_etime = date
				// this.form.base_etime = '0'
				this.showEndDate = false   
				this.$refs.form.validateField('base_etime')
			},
			async submit() {
				this.$refs.form.validate().then(async r => {
					console.log(r)
					if(r) {
						uni.showLoading()
						let func = this.type == 'add' ? 'create_order' : 'change_order'; 
						const res = await this.$api[func]({
							title: this.panRes.list.name,
							fxid: this.fxid,
							da_trade_mode: this.trade_mode,
							...this.form
						})
						if(res.code == 1) {
							if(this.type == 'add') {
								uni.redirectTo({
									url: `/pages/my/order/order?ordertype=${this.ordertype}`,
									success: () => {
										uni.showToast({
											title: '创建订单成功'
										})
									}
								}) 
							}else {
								const p = uni.$u.pages();
								p[p.length - 2].$vm.getData();
								uni.navigateBack({
									success: () => {
										uni.showToast({
											title: '修改成功'
										})
									}
								})
							}
							
							
						}
					}
					
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('请检查表单内容')
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		
	}
</style>
