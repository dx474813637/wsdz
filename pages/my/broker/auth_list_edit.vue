<template>
	<view class="u-p-20 u-p-l-40 u-p-r-40">
		<view class="">
			<u--form
				labelPosition="left"
				:model="model"
				ref="from"
				labelWidth="80"
				>
					<u-form-item
						label="委托客户"
						required
					>
						<view>{{model.Customer.name}}</view>
					</u-form-item>
					<u-form-item
						label="商品"
						required
					>
						<view>{{product}}</view>
					</u-form-item>
					<u-form-item
						label=" "
						v-if="prodInfo.length > 0 || prodInfoLoading"
					>
						<template v-if="prodInfoLoading">
							<u-loading-icon></u-loading-icon>
						</template>
						
						<text v-else class="text-base">{{prodInfo}}</text>
					</u-form-item>
					<u-form-item
						label="标题"
						prop="name"
						ref="name"
						required
					>
						<u--input
							v-model="model.name"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item
						label="现货类型"
						prop="trade_type"
						ref="trade_type"
					>
						 <u-radio-group
						    v-model="model.trade_type"
						    placement="row"
						  >
						    <u-radio
						      :customStyle="{marginRight: '8px'}"
						      v-for="(item, index) in radiolist_trade_type"
						      :key="item.value"
						      :label="item.name"
								:disabled="item.disabled"
						      :name="item.value"
						    >
						    </u-radio>
						  </u-radio-group>
					</u-form-item>
					<u-form-item
						label="订单类型"
						prop="order_type"
						ref="order_type"
						v-if="model.trade_type == '2'"
					>
						 <u-radio-group
						    v-model="model.order_type"
						    placement="row"
						  >
						    <u-radio
						      :customStyle="{marginRight: '8px'}"
						      v-for="(item, index) in radiolist_order_type"
						      :key="item.value"
						      :label="item.name"
							  :disabled="item.disabled"
						      :name="item.value"
						    >
						    </u-radio>
						  </u-radio-group>
					</u-form-item>
					
					<u-form-item
						label="交易类型"
						prop="trade_mode"
						ref="trade_mode"
						v-if="pan == 's'"
					>
						<view class="">
							{{jiaoyi_str}}
						</view>
					</u-form-item>
					<u-form-item
						label="交收期"
						prop="settle_month"
						ref="settle_month"
						required
						v-if="model.trade_type == 1"
					>
						<view class="u-flex u-flex-items-center">
							<view @click="showSettleMonth = true" class="u-flex-2">
								<u--input
									:value="model.settle_month_label"
									suffixIcon="arrow-down"
									placeholder="月份" 
									readonly
								></u--input>
							</view>
							
							<view @click="showSettleDate = true" class="u-flex-1 u-p-l-20">
								<u--input
									:value="model.settle_date_label"
									suffixIcon="arrow-down"
									placeholder="旬" 
									readonly
								></u--input>
							</view>
						</view>
					</u-form-item>
					<u-picker
						closeOnClickOverlay
						:show="showSettleMonth" 
						:columns="settleMonth"
						@confirm="confirmSettleMonth"
						keyName="label"
						@close="showSettleMonth = false"
						@cancel="showSettleMonth = false"
					></u-picker>
					<u-picker
						closeOnClickOverlay
						:show="showSettleDate" 
						:columns="settleDate"
						@confirm="confirmSettleDate"
						keyName="label"
						@close="showSettleDate = false"
						@cancel="showSettleDate = false"
					></u-picker>
					
					<u-form-item
						:label="pan == 's'? '单价' : '意向单价'"
						prop="price"
						ref="price"
						required
					>
						<u--input
							v-model="model.price"
							clearable
							:disabled="pan == 's'"
							type="digit"
						></u--input>
					</u-form-item>
					<u-form-item label=" " v-if="model.trade_mode == '0'">
						<view class="text-base">填0表示点价，请说明点价规则</view>
					</u-form-item>
					<u-form-item
						v-if="model.price.length != 0 && model.price == 0 && model.trade_mode == '0'"
						label="点价规则"
						prop="dprice"
						ref="dprice"
					>
						<u--input
							v-model="model.dprice"
							:disabled="pan == 's'"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item
						label="数量"
						prop="amount"
						ref="amount"
						required
					>
						<view class="u-flex u-flex-items-center">
							<view class="u-flex-1">
								<u--input
									v-model="model.amount"
									clearable
									:disabled="pan == 's'"
									type="digit"
								></u--input>
							</view>
							<view class="u-p-l-30 u-p-r-30" v-if="prodUnit">{{prodUnit}}</view>
						</view>
						
					</u-form-item>
					<u-form-item
						v-if="pan == 'b'"
						label="主规格"
						prop="spec"
						ref="spec"
						required
					>
						<u--textarea
							v-model="model.spec" 
							placeholder="主规格" 
							height="90"
						></u--textarea>
					</u-form-item>
					<u-form-item
						label="有效时间"
						prop="express_time"
						ref="express_time"
						required
					>
						<view class="u-flex u-flex-items-center">
							<view class="u-flex-2">
								<u--input
									v-model="model.express_time"
									clearable
									type="number"
								></u--input>
							</view>
							
							<view @click="showExpressUnit = true" class="u-flex-1 u-p-l-20">
								<u--input
									:value="model.express_unit_label"
									suffixIcon="arrow-down"
									readonly
									clearable
								></u--input>
							</view>
						</view>
					</u-form-item>
					<u-picker 
						closeOnClickOverlay
						:show="showExpressUnit" 
						:columns="expressUnit"
						keyName="label"
						@confirm="confirmExpressUnit"
						@close="showExpressUnit = false"
						@cancel="showExpressUnit = false"
					></u-picker>
					<u-form-item
						label="交收方式"
					>
						<!-- <view>{{model.settle_mode | settleMode}}</view> -->
						<u-radio-group
						    v-model="model.settle_mode"
						    placement="row"
							disabled
						  >
						    <u-radio
						      :customStyle="{marginRight: '8px'}"
						      v-for="(item, index) in radiolist_settle_mode_filter"
						      :key="item.value"
						      :label="item.name"
						      :name="item.value"
							  
						    >
						    </u-radio>
						  </u-radio-group>
					</u-form-item>
					<u-form-item
						:label="tradeType2Label[0]"
					>
						<uni-data-picker 
							placeholder="请选择区域" 
							popup-title="请选择区域" 
							:localdata="addressArea" 
							v-model="model.delivery_place"
							readonly
							@change="onchange" 
							@nodeclick="onnodeclick" 
							@popupopened="onpopupopened" 
							@popupclosed="onpopupclosed"
						></uni-data-picker>
					</u-form-item>
					
					<u-form-item
						:label="tradeType2Label[1]"
						v-if="model.delivery_address"
					>
						<view>{{model.delivery_address}}</view>
						<!-- <u--textarea
							v-model="model.delivery_address" 
							:placeholder="tradeType2Label[1]" 
							height="60"
						></u--textarea> -->
					</u-form-item>
					<!-- <u-form-item
						label="图片"
						prop="pics"
						ref="pics"
						v-if="pan == 's'"
					>
						<u-upload
							:fileList="fileList1"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="5"
						></u-upload>
					</u-form-item> -->
					
					
					<u-form-item
						label="详细需求"
						prop="intro"
						ref="intro"
						v-if="pan == 'b'"
					>
						<u--textarea
							v-model="model.intro" 
							placeholder="详细需求" 
							height="90"
						></u--textarea>
					</u-form-item>
					
					<u-form-item
						label="备注"
						prop="remark"
						ref="remark"
						v-if="pan == 's'"
					>
						<u--textarea
							v-model="model.remark" 
							placeholder="备注" 
							height="90"
						></u--textarea>
					</u-form-item>
			</u--form>
			
			
		</view>
		<view class="u-flex u-flex-items-center u-flex-between u-p-t-40 u-p-b-40" v-if="myCpy.state == '1'">
			<view class="u-p-r-20 u-flex-1">
				<u-button type="primary" @click="submit('y')">审核通过</u-button>
			</view>
			
			<view class="u-p-l-20 u-flex-1">	
				<u-button type="error" @click="submit('n')">审核拒绝</u-button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {mapState, mapMutations, mapActions} from "vuex"
	// import uniSection from '@/pages/my/components/uni-section/uni-section'
	export default {
		data() {
			return {
				pid: '',
				pan: 'b',
				product: '',
				prodInfo: '',
				prodUnit: '',
				prodInfoLoading: false,
				model: {
					Customer: {name: ''},
					product_id: '',
					name: '',
					order_type: '2',
					trade_type: '2',
					trade_mode: '0',
					settle_month_label: '',
					settle_month: '',
					settle_date_label: '',
					settle_date: '',
					spec: '',
					price: '',
					dprice: '',
					amount: '',
					express_time: '',
					express_unit_label: '天',
					express_unit: 'd',
					delivery_place: '',
					delivery_address: '',
					broker_login: '',
					customer_id: '',
					customer_name: '',
					mdu: 'D',
					post_type: '1',
					intro: '',
					settle_mode: '',
					remark: '',
					pics: []
				},
				fileList1: [],
				radiolist_order_type: [
					{
						name: '线上支付',
						disabled: false,
						value: "1"
					},
					{
						name: '线下支付',
						disabled: false,
						value: "2"
					},
				],
				radiolist_trade_type: [
					{
						name: '合约现货',
						disabled: false,
						value: "1"
					},
					{
						name: '即期现货',
						disabled: false,
						value: "2"
					},
				],
				radiolist_trade_mode: [
					{
						name: '议价交易',
						disabled: false,
						value: "0"
					},
					{
						name: '一口价交易',
						disabled: false,
						value: "2"
					},
				],
				radiolist_mdu: [
					{
						name: '经销商',
						disabled: false,
						value: "D"
					},
					{
						name: '下游用户',
						disabled: false,
						value: "U"
					},
				],
				radiolist_post_type: [
					{
						name: '替报',
						disabled: false,
						value: "1"
					},
					{
						name: '自报',
						disabled: false,
						value: "0"
					},
				],
				radiolist_settle_mode: [
					{
						name: '卖家送货',
						disabled: false,
						show: 'bs',
						value: "S"
					},
					{
						name: '买家自提',
						disabled: false,
						show: 's',
						value: "B"
					},
					{
						name: '两者均可',
						disabled: false,
						show: 's',
						value: ""
					},
					{
						name: '自提或送货',
						disabled: false,
						show: 'b',
						value: ""
					},
				],
				showExpressUnit: false,
				showSettleMonth: false,
				showSettleDate: false,
				show: false,
				show2: false,
				expressUnit: [
					[{label: '天', value: 'd'}, {label: '小时', value: 'h'}]
				],
				settleMonth: [
					[
						{label: '1月', value: '1'},
						{label: '2月', value: '2'},
						{label: '3月', value: '3'},
						{label: '4月', value: '4'},
						{label: '5月', value: '5'},
						{label: '6月', value: '6'},
						{label: '7月', value: '7'},
						{label: '8月', value: '8'},
						{label: '9月', value: '9'},
						{label: '10月', value: '10'},
						{label: '11月', value: '11'},
						{label: '12月', value: '12'},
					]
				],
				settleDate: [
					[
						{label: '上旬', value: 'ftd'},
						{label: '中旬', value: 'mtd'},
						{label: '下旬', value: 'ltd'},
					]
				],
				
			}
		},
		watch: {
			pan: {
				immediate: true,
				handler(n) {
					if(n == 's') {
						this.radiolist_trade_type.forEach(ele => {
							ele.disabled = true
						})
						this.radiolist_order_type.forEach(ele => {
							ele.disabled = true
						})
					}
				}
			},
			['model.trade_type'](n) {
				if(n == '1') this.radiolist_settle_mode.forEach(ele => {
					ele.disabled = true;
				})
				this.$nextTick(() => {
					this.$refs.from.validateField('express_time')
				})
			},
			['model.order_type']: {
				immediate: true, 
				handler(n) {
					this.radiolist_trade_mode.some(ele => {
						if(ele.value == '2') {
							ele.disabled = n == '2' ? true : false;
							return true
						}
						return false
					}) 
				},
			},
			['model.trade_mode'](n) {
				this.radiolist_order_type.some(ele => {
					if(ele.value == '2') {
						ele.disabled = n == '2' ? true : false;
						return true
					}
					return false
				})
				this.radiolist_settle_mode.forEach(ele => {
					if(ele.value != 'B') {
						ele.disabled = n == '2' ? true : false;
					}
				})
				if(n == '2') {
					this.model.settle_mode = 'B'
				}
			},
			['model.express_unit'](n) {
				this.$nextTick(() => {
					this.$refs.from.validateField('express_time')
				})
			}
		},
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy,
				addressArea: state => state.user.addressArea,
				login: state => state.user.login,
				auth: state => state.user.auth
			}),
			rules() {
				let max_express_time = this.model.trade_type == '1'? 360 : 10 
				let baseRules = {
					'product_id': {
						type: 'string',
						required: true,
						message: '请选择商品',
						trigger: ['blur', 'change']
					},
					'name': {
						type: 'string',
						required: true,
						message: '请填写名称',
						trigger: ['blur', 'change']
					},
					'price': [{
						type: 'string',
						required: true,
						message: '请填写金额',
						trigger: ['blur', 'change']
					},{
						type: 'string',
						validator: (rule, value, callback) => {
							return Number(value) >= 0
						},
						message: '请填写正确的金额',
						trigger: ['blur', 'change']
					}],
					'express_time': {
						type: 'string',
						validator: (rule, value, callback) => { 
							if(this.model.express_unit == 'd') { 
								return Number(value) > 0 && value <= max_express_time
							}else {
								return Number(value) > 0
							} 
						},
						message: this.model.express_unit == 'd' ? `请填写有效时间，当前现货类型不得超过${max_express_time}天` : '请填写有效时间',
						trigger: ['blur', 'change']
					},
					'delivery_place': {
						type: 'string',
						required: true,
						message: '请选择交货地',
						trigger: ['blur', 'change']
					},
					'amount': {
						type: 'string',
						validator: (rule, value, callback) => {
							return Number(value) > 0.01
						},
						message: '请输入大于0.01的数字',
						trigger: ['blur', 'change']
					},
					settle_month: {
						validator: (rule, value, callback) => {
							if(this.model.trade_type == 1) {
								if(value && this.model.settle_date) return true
								else return false
							}
							return true
						},
						message: '交收期不能为空',
						trigger: ['change','blur'],
					}
				}
				let bRules = {
					
					'spec': {
						type: 'string',
						required: true,
						message: '请填写主规格',
						trigger: ['blur', 'change']
					},
				}
				let sRules = {
				}
				if(this.pan == 'b') {
					let obj = {
						...baseRules,
						...bRules
					}
					if(this.$refs.from && this.$refs.from.setRules) {
						this.$refs.from.setRules(obj)
					} 
					return obj
				}else if(this.pan == 's') {
					let obj = {
						...baseRules,
						...sRules
					}
					if(this.$refs.from && this.$refs.from.setRules) {
						this.$refs.from.setRules(obj)
					} 
					return obj
				}
				return {}
				
			},
			jiaoyi_str() {
				return this.radiolist_trade_mode.filter(ele => ele.value == this.model.trade_mode)[0].name
			},
			tradeType2Label() {
				if(this.pan == 's' ) {
					if(this.model.settle_mode == 'B') {
						return ['提货区域', '提货地址']
					}else if(this.model.settle_mode == 'S') {
						return ['发货区域', '发货地址']
					}
					return ['交货区域', '交货地址']
				}else {
					return ['收货区域', '收货地址']
					// if(this.model.settle_mode == 'S') {
					// 	return '收货区域'
					// }
				}
			},
			radiolist_settle_mode_filter() {
				return this.radiolist_settle_mode.filter(ele => ele.show.includes(this.pan))
			}
		},
		async onLoad(options) {
			if(options.hasOwnProperty('data')) {
				await this.getAddressArea()
			}else {
				this.getAddressArea()
			}
			
			
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			if(options.hasOwnProperty('pid')) {
				this.pid = options.pid
				if(options.hasOwnProperty('data')) {
					const data = JSON.parse(decodeURIComponent(options.data))
					console.log(data)
					this.model.Customer = data.Customer
					this.model.delivery_place = data.delivery_place
					this.model.delivery_address = data.delivery_address
					this.model.product_id = data.product_id
					this.model.name = data.name
					this.model.order_type = data.order_type
					this.model.trade_type = data.trade_type
					this.model.trade_mode = data.trade_mode
					this.model.price = data.price
					this.model.dprice = data.dprice
					this.model.amount = data.amount
					this.model.customer_id = data.customer_id
					this.model.customer_name = data.customer_name
					this.model.mdu = data.mdu
					this.model.post_type = data.post_type
					this.model.express_time = data.express_time
					this.model.broker_login = data.broker_login
					this.model.express_unit = data.express_unit
					this.model.express_unit_label = this.expressUnit[0].filter(ele => ele.value == data.express_unit)[0]?.label
					this.model.settle_month = data.settle_month
					this.model.settle_month_label = this.settleMonth[0].filter(ele => ele.value == data.settle_month)[0]?.label
					this.model.settle_date = data.settle_date
					this.model.settle_date_label = this.settleDate[0].filter(ele => ele.value == data.settle_date)[0]?.label
					this.model.delivery_place = data.delivery_place
					if(this.pan == 's') {
						this.model.remark = data.remark
						this.model.pics = data.list_pics
					}else {
						this.model.spec = data.spec
						this.model.intro = data.intro
					}
				}
				
				this.prodInfoLoading = true
				await this.getCompanyProductDetail()
				this.prodInfoLoading = false
			}
			else if(options.hasOwnProperty('product_id')) {
				this.model.product_id = options.product_id
				this.prodInfoLoading = true
				await this.getCompanyProductDetail()
				this.prodInfoLoading = false
			}
			this.setPageTitle()
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getAddressArea: 'user/getAddressArea'
			}),
			async getCompanyProductDetail() {
				const res = await this.$api.getCompanyProductDetail({params: {id: this.model.product_id}})
				if(res.code == 1) {
					this.product = res.list.name
					this.prodUnit = res.list.unit
					this.prodInfo = res.list.list_product_attrs.reduce((pre, cur) => {
						return pre + `${cur.Attr.name}：${cur.value}\n`
					}, '')
					
					
				}
			},
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log('popupclosed');
				this.$refs.from.validateField('delivery_place')
			},
			onchange(e) {
				console.log('onchange:', e);
				this.$refs.from.validateField('delivery_place')
			},
			async menusConfirm2(data) {
				console.log(data)
				this.model.customer_id = data.to_id
				this.model.customer_name = data.to_name
				this.show2 = false;
			},
			confirmExpressUnit(e) {
				console.log(e)
				this.model.express_unit_label = e.value[0].label
				this.model.express_unit = e.value[0].value
				this.showExpressUnit = false
			},
			confirmSettleMonth(e) {
				console.log(e)
				this.model.settle_month_label = e.value[0].label
				this.model.settle_month = e.value[0].value
				this.showSettleMonth = false
				this.$refs.from.validateField('settle_month')
			},
			confirmSettleDate(e) {
				console.log(e)
				this.model.settle_date_label = e.value[0].label
				this.model.settle_date = e.value[0].value
				this.showSettleDate = false
				this.$refs.from.validateField('settle_month')
			},
			setPageTitle() {
				let title = '客户委托';
				
				if(this.pan == 'b') title += '买盘详情'
				else if(this.pan == 's') title += '卖盘详情'
				
				uni.setNavigationBarTitle({
					title: title
				})
			},
			submit(flag) {
				
				this.$refs.from.validate().then(async res => {
					uni.showLoading()
					
					let func = ''
					if(this.pan == 's') {
						func = 'brokerChangeSell'
						
					}else {
						func = 'brokerChangeBuy'
					}
					let params = {...this.model, audit: flag};
					
					if(this.pid) params.id = this.pid
					const r = await this.$api[func](params)
					if(r.code == 1) {
						const p = uni.$u.pages();
						if(p.length > 1) {
							p[p.length - 2].$vm.refreshList();
							uni.navigateBack({
								success() {
									uni.showToast({
										title: r.msg,
										icon: 'none'
									})
								}
							})
							return
						}
						
						uni.redirectTo({
							url: `/pages/my/broker/auth_list?pan=${this.pan}`,
							success() {
								uni.showToast({
									title: r.msg,
									icon: 'none'
								})
							}
						})
						
					}
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('请检查表单内容')
				})
			},
			
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				
				this.model.pic1 = ''
				this.model.pic1_base64 = ''
				this.model.pic1_name = ''
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		
	}
	.data-pickerview {
		height: 400px;
		border: 1px #e5e5e5 solid;
	}
</style>
