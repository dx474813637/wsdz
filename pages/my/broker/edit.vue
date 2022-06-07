<template>
	<view class="u-p-20">
		
		<u--form
			labelPosition="left"
			:model="model"
			:rules="rules"
			ref="from"
			labelWidth="80"
		>
			
				<u-form-item
					label="商品"
					prop="product_id"
					ref="product_id"
					required
				>
					<uni-combox 
						:candidates="candidates" 
						placeholder="请选择下拉匹配选项" 
						v-model="product"
						@blur="comboxBlur1"
					></uni-combox>
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
					label="订单类型"
					prop="order_type"
					ref="order_type"
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
					      :name="item.value"
					    >
					    </u-radio>
					  </u-radio-group>
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
					      :name="item.value"
					    >
					    </u-radio>
					  </u-radio-group>
				</u-form-item>
				
				<u-form-item
					:label="pan == 's'? '单价' : '意向单价'"
					prop="price"
					ref="price"
					required
				>
					<u--input
						v-model="model.price"
						clearable
						type="digit"
					></u--input>
				</u-form-item>
				<u-form-item
					v-if="pan == 's'"
					label="点价规则"
					prop="dprice"
					ref="dprice"
				>
					<u--input
						v-model="model.dprice"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="数量"
					prop="amount"
					ref="amount"
					required
				>
					<u--input
						v-model="model.amount"
						clearable
						type="digit"
					></u--input>
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
					prop="express_unit"
					ref="express_unit"
					required
				>
					<view class="u-flex u-flex-items-center">
						<view class="u-flex-2">
							<u--input
								v-model="model.express_time"
								clearable
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
					label="交货地"
					prop="delivery_place"
					ref="delivery_place"
					required
				>
					<uni-data-picker 
						placeholder="请选择交货地" 
						popup-title="请选择所在地区" 
						:localdata="dataTree" 
						v-model="model.delivery_place"
						@change="onchange" 
						@nodeclick="onnodeclick" 
						@popupopened="onpopupopened" 
						@popupclosed="onpopupclosed"
					></uni-data-picker>
				</u-form-item>
				<u-form-item
					label="交收方式"
					prop="settle_mode"
					ref="settle_mode"
					v-if="pan == 's'"
				>
					 <u-radio-group
					    v-model="model.settle_mode"
					    placement="row"
					  >
					    <u-radio
					      :customStyle="{marginRight: '8px'}"
					      v-for="(item, index) in radiolist_settle_mode"
					      :key="item.value"
					      :label="item.name"
					      :name="item.value"
					    >
					    </u-radio>
					  </u-radio-group>
				</u-form-item>
				<u-form-item
					label="图片"
					prop="imgs"
					ref="imgs"
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
				</u-form-item>
				<u-form-item
					label="报盘企业"
					prop="customer_value"
					ref="customer_value"
				>
					<uni-combox 
						:candidates="candidates2" 
						placeholder="请选择下拉匹配选项" 
						v-model="customer_name"
						@blur="comboxBlur2"
					></uni-combox>
				</u-form-item>
				<u-form-item
					label="企业角色"
					prop="mdu"
					ref="mdu"
				>
					 <u-radio-group
					    v-model="model.mdu"
					    placement="row"
					  >
					    <u-radio
					      :customStyle="{marginRight: '8px'}"
					      v-for="(item, index) in radiolist_mdu"
					      :key="item.value"
					      :label="item.name"
					      :name="item.value"
					    >
					    </u-radio>
					  </u-radio-group>
				</u-form-item>
				<u-form-item
					label="报盘类型"
					prop="post_type"
					ref="post_type"
				>
					 <u-radio-group
					    v-model="model.post_type"
					    placement="row"
					  >
					    <u-radio
					      :customStyle="{marginRight: '8px'}"
					      v-for="(item, index) in radiolist_post_type"
					      :key="item.value"
					      :label="item.name"
					      :name="item.value"
					    >
					    </u-radio>
					  </u-radio-group>
				</u-form-item>
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
		<view class="u-p-t-20 u-m-b-40">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
		
	</view>
</template>

<script>
	// import uniSection from '@/pages/my/components/uni-section/uni-section'
	export default {
		data() {
			return {
				pid: '',
				pan: 'b',
				list1: [
					{
						label: '菜单1',
						value: 'caidan1'
					},
					{
						label: '菜单2',
						value: 'caidan2'
					},
					{
						label: '菜单3',
						value: 'caidan3'
					},
					{
						label: '菜单4',
						value: 'caidan4'
					}
				],
				list2: [
					{
						label: '菜单b-1',
						value: 'caidan1'
					},
					{
						label: '菜单b-2',
						value: 'caidan2'
					},
					{
						label: '菜单b-3',
						value: 'caidan3'
					},
					{
						label: '菜单b-4',
						value: 'caidan4'
					}
				],
				product: '',
				model: {
					product_id: '',
					name: '',
					order_type: '1',
					trade_type: '2',
					price: '',
					dprice: '',
					amount: '',
					spec: '',
					express_time: '',
					express_unit_label: '天',
					express_unit: 'd',
					delivery_place: '',
					customer_value: '',
					mdu: 'D',
					post_type: '1',
					intro: '',
					settle_mode: '',
					remark: '',
					imgs: []
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
						value: "S"
					},
					{
						name: '买家自提',
						disabled: false,
						value: "B"
					},
					{
						name: '均可',
						disabled: false,
						value: ""
					},
				],
				showExpressUnit: false,
				expressUnit: [
					[{label: '天', value: 'd'}, {label: '小时', value: 'h'}]
				],
				customer_name: '',
				dataTree: [
					{
						text: "浙江省",
						value: "zj",
						children: [{
							text: "杭州市",
							value: "hz",
							children: [
								{
									text: '西湖区',
									value: 'xh'
								},
								{
									text: '拱墅区',
									value: 'gs'
								},
							]
						},
						{
							text: "宁波市",
							value: "nb"
						}]
					},
					{
						text: "北京市",
						value: "bj",
						children: [{
							text: "朝阳区",
							value: "cy"
						},
						{
							text: "xx区",
							value: "xx"
						}]
					},
					{
						text: "上海市",
						value: "sh",
						children: [{
							text: "闵行区",
							value: "mh"
						},
						{
							text: "浦东区",
							value: "pd"
						}]
					},
				],
				
			}
		},
		computed: {
			candidates() {
				return this.list1.map(ele => ele.label)
			},
			candidates2() {
				return this.list2.map(ele => ele.label)
			},
			rules() {
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
					'price': {
						type: 'string',
						required: true,
						message: '请填写单价',
						trigger: ['blur', 'change']
					},
					'express_time': {
						type: 'string',
						required: true,
						message: '请填写单价',
						trigger: ['blur', 'change']
					},
					'delivery_place': {
						type: 'string',
						required: true,
						message: '请选择交货地',
						trigger: ['blur', 'change']
					},
				}
				let bRules = {
					'amount': {
						type: 'string',
						required: true,
						message: '请输入有效时间',
						trigger: ['blur', 'change']
					},
					'spec': {
						type: 'string',
						required: true,
						message: '请填写主规格',
						trigger: ['blur', 'change']
					},
				}
				let sRules = {}
				if(this.pan == 'b') {
					return {
						...baseRules,
						...bRules
					}
				}else if(this.pan == 's') {
					return {
						...baseRules,
						...sRules
					}
				}
				return {}
				
			}
		},
		onLoad(options) {
			if(options.hasOwnProperty('pid')) {
				this.pid = options.pid
			}
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			this.setPageTitle()
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
		},
		methods: {
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
			comboxBlur2(e) {
				const index = this.candidates2.indexOf(e)
				if(index != -1) {
					this.model.customer_value = this.list2[index].value
					this.customer_name = e
				}else {
					this.model.customer_value = '';
					this.customer_name = ''
				}
				this.$refs.from.validateField('customer_value')
			},
			comboxBlur1(e) {
				const index = this.candidates.indexOf(e)
				if(index != -1) {
					this.model.product_id = this.list1[index].value
					this.product = e
				}else {
					this.model.product_id = '';
					this.product = ''
				}
				this.$refs.from.validateField('product_id')
			},
			confirmExpressUnit(e) {
				console.log(e)
				this.model.express_unit_label = e.value[0].label
				this.model.express_unit = e.value[0].value
				this.showExpressUnit = false
			},
			setPageTitle() {
				let title = '';
				if(this.pid) title = '更新'
				else title = '发布'
				
				if(this.pan == 'b') title += '买盘'
				else if(this.pan == 's') title += '卖盘'
				
				uni.setNavigationBarTitle({
					title: title
				})
			},
			submit() {
				
				this.$refs.from.validate().then(async res => {
					uni.showLoading()
					console.log(this.model)
					// uni.$u.toast('校验通过')
					const r = await this.$api.editProd({...this.model.prod, id: this.pid})
					console.log(r)
					if(r.code == 1) {
						this.$utils.prePage() && this.$utils.prePage().refreshList();
						uni.showToast({
							title: r.msg,
							icon: 'none'
						})
						
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
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
