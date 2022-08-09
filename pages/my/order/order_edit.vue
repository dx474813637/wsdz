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
						<view class="">
							<template v-if="type == 'edit'">
								{{ordertype == 'S' ? order.b_company : order.s_company}}
							</template>
							<template v-else>
								{{panRes.company.name}}
							</template>
							
						</view>
					</u-form-item>
					<u-form-item
						label="商品" 
					>
						<view class="">
							{{type == 'edit' ? order.source_name : panRes.list.name}}
						</view>
					</u-form-item>
					<u-form-item
						label="数量" 
					>
						<view class=""> 
							{{type == 'edit' ? order.Source.amount + order.Source.unit : panRes.list.amount + panRes.list.unit}}
						</view>
					</u-form-item>
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
									type="number"
								></u--input>
							</view>
							<view class="u-p-l-10">{{type == 'edit' ? order.Source.unit : panRes.list.unit}}</view>
						</view>
						
					</u-form-item>
					<u-form-item
						label="单价"
						prop="price"
						ref="price"
						required
					>
						<view class="u-flex u-flex-items-center">
							<view class="u-flex-1">
								<u--input
									v-model="form.price"
									clearable
									type="number"
									@focus="tar = 'price'"
								></u--input>
							</view>
							<view class="u-p-l-10">元/{{type == 'edit' ? order.Source.unit : panRes.list.unit}}</view>
						</view>
						
					</u-form-item>
					<u-form-item
						label="商品总额"
						prop="total_price"
						ref="total_price"
						required
					>
						<view class="u-flex u-flex-items-center">
							<view class="u-flex-1">
								<u--input
									v-model="form.total_price"
									clearable
									type="number"
									@focus="tar = 'total_price'"
								></u--input>
							</view>
							<view class="u-p-l-10">元</view>
						</view>
						
					</u-form-item>
					<u-form-item
						label="交付方式"
						prop="pay_option1"
						ref="pay_option1"
						required
					>
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
						:label="form.settle_mode == 'S' ? '收货区域' : '提货区域' "
						prop="delivery_place"
						ref="delivery_place"
						:required="!qiehuan"
					>
						<view>
							<uni-data-picker 
								v-if="!qiehuan"
								placeholder="请选择所在地区" 
								popup-title="请选择所在地区" 
								:localdata="addressArea" 
								v-model="form.delivery_place"
							></uni-data-picker>
							<view v-else>
								<template v-if="type == 'add'">
									{{panRes.list.delivery_place}}
								</template>
								<template v-else-if="order.Regionals">
									{{order.Regionals.map(ele => ele.Particular.name).join('/')}}
								</template>
								
							</view>
						</view>
						
					</u-form-item>
					<u-form-item
						:label="form.settle_mode == 'S' ? '收货地址' : '提货地址' "
						prop="settle_address"
						ref="settle_address"
						:required="!qiehuan"
					>
						<view>
							<u--input
								v-if="!qiehuan"
								v-model="form.settle_address"
								placeholder="填写地址" 
								clearable
							></u--input>
							<view v-else>
								<template v-if="type == 'add'">
									{{panRes.list.delivery_address}}
								</template>
								<template v-else>
									{{order.settle_address}}
								</template>
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
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				type: 'add',
				ordertype: '',
				id: '',
				panRes: {},
				order: {},
				tar: '',
				pageLoading: true,
				form: { 
					source: '',
					source_id: '',
					amount: '',
					price: '',
					total_price: '',
					pay_option1: '',
					pay_option2: '',
					pyeelnfo: '',
					settle_mode: '',
					delivery_place: '',
					settle_address: '',
					intro: '',
					remark: '', 
				},
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
					{
						name: '担保支付',
						value: 'GRT',
						disabled: false,
					},
					{
						name: '货到付款',
						value: 'COD',
						disabled: false,
					},
				],
				pay_option2_radios: [
					{
						name: '现金',
						value: 'FUNDPAY',
						disabled: false,
					},
					{
						name: '票据',
						value: 'BILLPAY',
						disabled: true,
					},
				],
			}
		},
		computed: {
			...mapState({
				addressArea: state => state.user.addressArea
			}),
			qiehuan() {
				let qiehuan
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
					pay_option1: {
						required: true, 
						message: '请选择',
						trigger: ['blur', 'change']
					},
					pay_option2: {
						required: true, 
						message: '请选择',
						trigger: ['blur', 'change']
					},
				}	
				if(!this.qiehuan) {
					base = {
						...base,
						delivery_place: {
							require: true,
							message: '请选择所在区域',
							trigger: ['blur', 'change']
						},
						settle_address: {
							require: true,
							message: '请填写地址',
							trigger: ['blur', 'change']
						},
					}
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
			if(options.hasOwnProperty('ordertype')) {
				this.ordertype = options.ordertype
			}
			this.init()
			
			
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		watch: {
			['form.pay_option1'](n, o) {
				if(n == 'GRT') {
					this.pay_option2_radios[1].disabled = false
				}else {
					this.pay_option2_radios[1].disabled = true
					if(o == 'GRT') {
						this.form.pay_option2 = this.pay_option2_radios[0].value
					}
				}
			}, 
			['form.amount'](n, o) {
				if(this.form.price === '') return
				this.form.total_price = (this.form.price * n).toFixed(2)
			}, 
			['form.price'](n, o) {
				if(this.form.amount === '' || this.tar == 'total_price') return
				this.form.total_price = (this.form.amount * n).toFixed(2)
			}, 
			['form.total_price'](n, o) {
				if(o === '' || this.tar == 'price') return
				this.form.price = (n / this.form.amount).toFixed(2)
			}, 
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getAddressArea: 'user/getAddressArea',
			}),
			async init() {
				this.getAddressArea()
				if(this.type == 'add') {
					uni.setNavigationBarTitle({
						title: '创建订单'
					})
					uni.showLoading({
						title: '获取商品信息'
					})
					await this.getPan()
					if(this.ordertype == 'S') {
						this.form.delivery_place = this.panRes.list.delivery_place1
						this.form.settle_address = this.panRes.list.delivery_address
						//订单类型为销售订单时，settle_mode直接从买盘信息里读取 BS
						
						this.settle_mode_radios = this.settle_mode_radios.filter(ele => this.panRes.list.settle_mode.includes(ele.value) )
						this.form.settle_mode = this.settle_mode_radios[1] ? this.settle_mode_radios[1].value : this.settle_mode_radios[0].value
					}
				}else {
					uni.setNavigationBarTitle({
						title: '修改订单'
					})
					uni.showLoading({
						title: '获取订单信息'
					})
					await this.getOrder()
				}
				this.pageLoading = false
				
			},
			async getPan() {
				let func = ''
				if(this.ordertype == 'B') func = 'getSellDetail'
				else func = 'getBuyDetail'
				const res = await this.$api[func]({
					params: { 
						id: this.id
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
					this.order = res.list.Order 
					this.form.source = res.list.Order.source
					this.form.source_id = res.list.Order.source_id
					this.form.amount = res.list.Order.amount
					this.form.price = res.list.Order.price1
					this.form.total_price = res.list.Order.total_price1
					this.form.pay_option1 = res.list.Order.settle_type
					this.form.pay_option2 = res.list.Order.pay_mode == 'FUNDPAYGUARANTE' ? 'FUNDPAY' : 'BILLPAY'
					this.form.pyeelnfo = res.list.Order.payeeAccNm || ''
					this.form.settle_mode = res.list.Order.settle_mode
					this.form.delivery_place = res.list.Order.delivery_place
					this.form.settle_address = res.list.Order.settle_address
					this.form.intro = res.list.Order.intro
					this.form.remark = res.list.Order.remark
				}
			},
			async submit() {
				this.$refs.form.validate().then(async r => {
					console.log(r)
					if(r) {
						uni.showLoading()
						let func = this.type == 'add' ? 'create_order' : 'change_order'; 
						const res = await this.$api[func]({
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
					uni.$u.toast('校验失败')
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		
	}
</style>
