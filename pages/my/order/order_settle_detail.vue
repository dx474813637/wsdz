<template>
	<view class="u-p-20" >
		<view class="main u-p-30">
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">ID</view>
				<view class="item u-text-right">{{list.id}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">发起人</view>
				<view class="item u-text-right">{{sender}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">买方</view>
				<view class="item u-text-right">{{list.B_company.name}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">卖方</view>
				<view class="item u-text-right">{{list.S_company.name}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单编号</view>
				<view class="item text-primary" 
					@click="handleGoto({
						url: '/pages/my/order/order_detail', 
						params: {id: list.order_id, ordertype}
					})"
				>
						{{list.order_id}}
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">商品</view>
				<view class="item text-primary" 
					@click="handleGoto({
						url: '/pages/index/pan/panDetail', 
						params: {id: list.source_id, pan: list.is_s == '1'? 's' : 'b'}
					})"
				>
						{{list.Order.product_name}}
				</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单数量</view>
				<view class="item u-text-right">{{list.Order.amount}}{{list.Order.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单单价</view>
				<view class="item u-text-right">{{list.Order.price2}} 元/{{list.Order.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">支付总额</view>
				<view class="item u-text-right">{{list.Order.total_price2}} 元</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">交收数量</view>
				<view class="item u-text-right">{{list.amount}}{{list.Order.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">交收单价</view>
				<view class="item u-text-right">{{list.price1}} 元/{{list.Order.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">结算总额</view>
				<view class="item u-text-right">{{list.settle_price1}} 元</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">结算差额</view>
				<view class="item u-text-right">{{list.settle_diff1}} 元</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">结算处理</view>
				<view class="item u-text-right text-error">
					<template v-if="list.type == 1">
						买方补交
					</template>
					<template v-if="list.type == 2">
						卖方还款
					</template>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">结算状态</view>
				<view class="item u-text-right">{{list.State.name}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">添加时间</view>
				<view class="item u-text-right">{{list.ctime}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">更新时间</view>
				<view class="item u-text-right">{{list.ptime}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.remark">
				<view class="item text-light item-label">备注</view>
				<view class="item u-text-right" style="word-break: break-all;">
					<rich-text :nodes="list.remark"></rich-text>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.remark_audit">
				<view class="item text-light item-label">审核备注</view>
				<view class="item u-text-right" style="word-break: break-all;">
					<rich-text :nodes="list.remark_audit"></rich-text>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="nopay_info.id">
				<view class="item text-light item-label">线下支付凭证</view>
				<view class="item u-text-right" >
					<u--image 
					width="120px" 
					height="120px" 
					:src="`https://thumb-album.rawmex.cn/0-0/${nopay_info.pic1}`"
					@click="previewImgBtn([`https://thumb-album.rawmex.cn/0-0/${nopay_info.pic1}`])"
					></u--image>
				</view>
			</view>
			<!-- <view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="nopay_info.id">
				<view class="item text-light item-label">线下支付状态</view>
				<view class="item u-text-right">{{list.state}}</view>
			</view> -->
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="nopay_info.remark">
				<view class="item text-light item-label">线下支付备注</view>
				<view class="item u-text-right" style="word-break: break-all;">
					<rich-text :nodes="nopay_info.remark"></rich-text>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="nopay_info.state">
				<view class="item text-light item-label">线下凭证状态</view>
				<view class="item u-text-right" >
					<template v-if="nopay_info.state == '3'">卖家拒绝</template>  
					<template v-if="nopay_info.state == '1'">卖家同意</template>  
					<template v-if="nopay_info.state == '0'">待审核</template>  
				</view>
			</view>
		</view>
	
		
		<view class="main u-p-8 u-m-t-30">
			<view class="btn-wrap u-flex u-flex-items-center u-flex-wrap">
				<view class="item u-p-6" v-if="btnList.button1"> <!-- 取消 -->
					<u-button type="primary" @click="order_settle_cancel">{{btnList.button1_title}}</u-button>
				</view>
				<view class="item u-p-6" v-if="btnList.button2"> <!-- 修改 --> 
					<u-button type="primary" @click="handleShowPopup({mode:'settle_change'})">{{btnList.button2_title}}</u-button>
				</view>
				<view class="item u-p-6" v-if="btnList.button3"> <!-- 发送 -->
					<u-button type="primary" @click="order_settle_send">{{btnList.button3_title}}</u-button>
				</view>
				<view class="item u-p-6" v-if="btnList.button4"> <!-- 审核 -->
					<u-button type="primary" @click="handleShowPopup({mode:'settle_audit'})">{{btnList.button4_title}}</u-button>
				</view>
				<view class="item u-p-6" v-if="btnList.button5"> <!-- 提交支付凭证 -->
					<u-button type="primary" @click="handleShowPopup({mode:'nopay_settle_create'})">{{btnList.button5_title}}</u-button>
				</view>
				<view class="item u-p-6" v-if="btnList.button6"> <!-- 审核支付凭证 -->
					<u-button type="primary" @click="handleShowPopup({mode:'nopay_settle_audit'})">{{btnList.button6_title}}</u-button>
				</view>
			</view>
		</view>
		<u-popup
			:show="show" 
			mode="bottom"  
			@close="show = false"  
			round="25"
			bgColor="#fff"
			>
			<view class="wrapper" :style="{
				backgroundColor: themeConfig.pageBg,
				color: themeConfig.baseText,
			}">
				<view class="header u-p-18"  :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item u-flex-1">
							<text class="u-info" @click="show = false">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34">
								<template v-if="formActive.mode == 'settle_change'">交收结算</template>
								<template v-else-if="formActive.mode == 'settle_audit'">审核表单</template>
								<template v-else-if="formActive.mode == 'nopay_settle_create'">提交支付凭证</template>
								<template v-else-if="formActive.mode == 'nopay_settle_audit'">审核支付凭证</template>
							</text>
						</view>
						<view class="item u-flex-1 u-text-right">
							
						</view>
					</view>
				</view>
				<view class="main" :style="{
					backgroundColor: themeConfig.pageBg,
				}">
					<u-list height="100%">
						<view class="form-content u-p-20"> 
							<template v-if=" formActive.mode == 'settle_change' || formActive.mode == 'settle_audit'">
								<u--form
									labelPosition="left"
									labelWidth="80"
									>
									<u-form-item
										label="订单总额"  
									>
										<view>{{order.total_price2}} 元</view>
									</u-form-item>
									<u-form-item
										label="订单单价"  
									>
										<view>{{order.price2}} 元/{{order.unit}}</view>
									</u-form-item>
									<u-form-item
										label="订单数量"  
									>
										<view>{{order.amount}} {{order.unit}}</view>
									</u-form-item>
									
								</u--form>
							</template>
							<template v-if=" formActive.mode == 'settle_change'">
								<u--form
									labelPosition="left"
									:model="form_settle_change"
									ref="form_settle_change"
									labelWidth="80"
									>  
									<u-form-item
										label="交收单价" 
										prop="price"
									>
										<view class="u-flex u-flex-items-center">
											<view class="u-flex-1">
												<u--input 
													v-model="form_settle_change.price" 
													:customStyle="{backgroundColor: '#fff'}"
													type="digit" 
													clearable 
												></u--input> 
											</view>
											<view class="u-p-l-10">元/{{order.unit}}</view>
										</view>
									</u-form-item>
									<u-form-item
										label="交收数量" 
										prop="amount"
									>
										<view class="u-flex u-flex-items-center">
											<view class="u-flex-1">
												<u--input 
													v-model="form_settle_change.amount" 
													:customStyle="{backgroundColor: '#fff'}"
													clearable 
												></u--input> 
											</view>
											<view class="u-p-l-10">{{order.unit}}</view>
										</view>
									</u-form-item>
								</u--form>
							</template>  
							<template v-if=" formActive.mode == 'settle_change' || formActive.mode == 'settle_audit'">
								<u--form
									labelPosition="left"
									labelWidth="80"
									>
									<u-form-item
										label="结算总额" 
									>
										<view>{{settleSum}} 元</view>
									</u-form-item>  
									<u-form-item
										label="差额处理" 
									>
										<view class="text-error">{{diff | diffRes}}</view>
									</u-form-item> 
									<u-form-item
										label="结算差额" 
									>
										<view>{{diff2}} 元</view>
									</u-form-item> 
									 
								</u--form>
							</template>  
							<template v-if=" formActive.mode == 'settle_audit'">
								<u--form
									labelPosition="left"
									:model="form_settle_audit"
									ref="form_settle_audit"
									labelWidth="80"
									> 
									<u-form-item
										label="审核意见" 
										prop="audit"
									>
										<u-radio-group
										    v-model="form_settle_audit.audit"
										    placement="row"
										  >
										    <u-radio
										      :customStyle="{marginRight: '8px'}"
										      v-for="(item, index) in shyj"
										      :key="index"
										      :name="item.value"
										      :label="item.name"
										    >
										    </u-radio>
										  </u-radio-group>
									</u-form-item> 
									<u-form-item
										label="审核备注" 
										prop="audit_cancel"
										v-if="form_settle_audit.audit == '2'"
									>
										<u--textarea
											v-model="form_settle_audit.audit_cancel" 
											placeholder="拒绝备注" 
											height="90"
											maxlength="-1"
										></u--textarea>
									</u-form-item>
									 
								</u--form>
							</template>  
							<template v-if="formActive.mode == 'nopay_settle_create' || formActive.mode == 'nopay_settle_audit'">
								<u--form
									labelPosition="left" 
									labelWidth="100" 
									>  
									<u-form-item
										:label="bank_accno_str" 
										>
										<view>{{bank_accno}}</view>
									</u-form-item>
									<u-form-item
										label="银行账户名" 
										>
										<view>{{bank_accname}}</view>
									</u-form-item>
									<u-form-item
										label="开户行" 
										>
										<view>{{bank_name}}</view>
									</u-form-item>
									<u-form-item
										label="开户行行号" 
										v-if="bank_no"
										>
										<view>{{bank_no}}</view>
									</u-form-item>
								</u--form>
							</template>
							<template v-if="formActive.mode == 'nopay_settle_create' ">
								<u--form
									labelPosition="left"
									:model="form_nopay_settle_create"
									ref="form_nopay_settle_create"
									labelWidth="100"
									> 
									<u-form-item
										label="支付金额" 
										>
										<view class="text-error">{{list.settle_diff1}} 元</view>
									</u-form-item>
									<u-form-item
										label="支付凭证"
										prop="pic1_base64"
										required
										>
										<view >
											<u-upload
												:fileList="fileList1"
												@afterRead="afterRead"
												@delete="deletePic"
												name="1"
												:maxCount="1"
												:maxSize="2048000"
												@oversize="handleoversize"
											></u-upload>
											<view class="u-info u-font-28">建议上传2M以内的图片</view>
										</view>
									</u-form-item>
									<u-form-item
										label="备注" 
										prop="remark"
									>
										<u--textarea
											v-model="form_nopay_settle_create.remark" 
											placeholder="备注" 
											height="90"
											maxlength="-1"
										></u--textarea>
									</u-form-item>
									 
								</u--form>
							</template>  
							<template v-if=" formActive.mode == 'nopay_settle_audit'">
								<u--form
									labelPosition="left"
									:model="form_nopay_settle_audit"
									ref="form_nopay_settle_audit"
									labelWidth="100"
									> 
									<u-form-item
										label="买家支付凭证"  
										>
										<view>
											<u--image
											width="120px" 
											height="120px" 
											:src="`https://thumb-album.rawmex.cn/0-0/${nopay_info.pic1}`"
											@click="previewImgBtn([`https://thumb-album.rawmex.cn/0-0/${nopay_info.pic1}`])"
											></u--image>
										</view>
									</u-form-item>
									<u-form-item
										label="买家支付备注" 
										v-if="nopay_info.remark"
										>
										<view>{{nopay_info.remark}}</view>
									</u-form-item>
									<u-form-item
										label="审核意见" 
										prop="audit"
										required 
									>
										<u-radio-group
										    v-model="form_nopay_settle_audit.audit"
										    placement="row"
										  >
										    <u-radio
										      :customStyle="{marginRight: '8px'}"
										      v-for="(item, index) in shyj2"
										      :key="index"
										      :name="item.value"
										      :label="item.name"
										    >
										    </u-radio>
										  </u-radio-group>
									</u-form-item> 
									<u-form-item
										label="审核备注" 
										prop="remark_audit" 
									>
										<u--textarea
											v-model="form_nopay_settle_audit.remark_audit" 
											placeholder="审核备注" 
											height="90"
											maxlength="-1"
										></u--textarea>
									</u-form-item>
									 
								</u--form>
							</template>  
						</view>
					</u-list>
				</view>
				<view class="confirm-rows u-p-20" :style="{
						backgroundColor: themeConfig.navBg,
					}">
					<u-button :customStyle="{backgroundColor: themeConfig.badgeBg, color: '#fff', border: 'none'}" shape="circle" 
					@click="handleConfirm">确认并提交</u-button>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
			
	</view>
</template>

<script>
	import {js2Fixed} from '@/utils' 
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				show: false,
				id: '',
				ordertype: '',
				list: {},
				order: {},
				btnList: {},
				fileList1: [],
				nopay_info: {},
				formActive: {}, 
				form_settle_change: {
					amount: '', 
					price: '',
				},
				form_settle_audit: {
					audit: '1', 
					audit_cancel: '',
				},
				form_nopay_settle_audit: {
					audit: '1', 
					remark_audit: '',
				},
				form_nopay_settle_create: {
					pic1_base64: '',
					pic1_name: '线下支付凭证.jpg',
					remark: ''
				},
				shyj: [ 
					{
						name: '同意',
						value: '1',
						disabled: false,
					},
					{
						name: '拒绝',
						value: '2',
						disabled: false,
					},
				],
				shyj2: [ 
					{
						name: '同意',
						value: '1',
						disabled: false,
					},
					{
						name: '拒绝',
						value: '0',
						disabled: false,
					},
				],
				settle_change_rules: {
					amount: {
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
				},
				settle_audit_rules: {
					audit: {
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					}, 
				},
				nopay_settle_audit_rules: {
					audit: {
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}, 
				},
				nopay_settle_create_rules: { 
					pic1_base64: {
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			} else {
				uni.showToast({
					title: 'id参数有误',
					icon: 'none'
				})
				return
			}
			if(options.hasOwnProperty('ordertype')) {
				this.ordertype = options.ordertype
			}  
			uni.showLoading()
			this.getData()
		}, 
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				login: state => state.user.login,
			}),
			themeConfig() {
				return this.typeConfig.white
			}, 
			diff() {
				return js2Fixed((+this.settleSum) - (+this.order.total_price1), 2)
			},
			diff2() {
				return Math.abs(+this.diff)
			}, 
			diff3() {
				return (+this.list.settle_price1) - (+this.order.total_price1) 
			},
			settleSum() {
				return js2Fixed(this.form_settle_change.price * this.form_settle_change.amount, 2)
			},
			sender() {
				if(this.list.poster) {
					return this.list.b_login == this.list.poster ? this.list.B_company.name : this.list.S_company.name
				}
				return ''
			},
			other() {
				if(this.list.poster) {
					return this.list.b_login == this.list.poster ? this.list.S_company.name : this.list.B_company.name
				}
				return ''
			},
			paramsObj() {
				let obj = {
					params: {
						order_id: this.list.order_id,
						id: this.list.id,
					} 
				}
				if(this.formActive.mode == 'settle_change') { 
					obj.params = {...obj.params, ...this.form_settle_change}
				} 
				if(this.formActive.mode == 'settle_audit') { 
					if(this.form_settle_audit.audit == '1') this.form_settle_audit.audit_cancel = '';
					obj.params = {...obj.params, ...this.form_settle_audit}
				} 
				if(this.formActive.mode == 'nopay_settle_create') { 
					obj = {...this.form_nopay_settle_create, order_settle_id: this.list.id}
				}  
				if(this.formActive.mode == 'nopay_settle_audit') { 
					obj.params = {...obj.params, id: this.list.pay_id, ...this.form_nopay_settle_audit }
				}  
				return obj
			},
			bank_accno() {
				return this.nopay_info.bank_accno || this.list.Rec_account?.bank_accno
			},
			bank_accno_str() {
				return this.list.b_login == this.login ? '付款银行账户' : '收款银行账户'
			},
			bank_accname() {
				return this.nopay_info.bank_accname || this.list.Rec_account?.bank_accname
			},
			bank_no() {
				return this.nopay_info.bank_no || this.list.Rec_account?.bank_no
			},
			bank_name() {
				return `${this.nopay_info.bank_code || this.list.Rec_account?.bank_code} | ${this.nopay_info.bank_name || this.list.Rec_account?.bank_name}`
			},
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getImageBase64_readFile: 'user/getImageBase64_readFile'
			}),
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			async getData() {
				const res = await this.$api.order_settle_detail({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.list = res.list.Result.Order_settle
					this.order = res.list.Result.Order
					this.btnList = res.button
					// this.fahuo = res.fahuo
					// if(this.list.settle_type == 'GRT') {
					// 	this.zfgj[1].disabled = false
					// }
					// if(this.list.pay_id && this.list.Order.order_type == '2') {
					if(this.list.pay_id) {
						this.getNoPayData()
					}
				}
			}, 
			initSettleFormData() { 
				this.form_settle_change.price =  this.list.price1
				this.form_settle_change.amount = this.list.amount
			},
			//取消交收结算
			async order_settle_cancel() {
				uni.showLoading({
					title: '取消中...'
				})
				const res = await this.$api.order_settle_cancel({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}
			},
			//发送交收结算
			async order_settle_send() {
				uni.showModal({
					title: '提示',
					content: '发送后将不能修改，确定发送？',
					success: async (res) => {
						if (res.confirm) {
							await this.baseApi({api: 'order_settle_send'})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			async handleShowPopup(data) {
				this.formActive = data; 
				if(data.mode == 'settle_change') { 
					this.initSettleFormData()
				} 
				if(data.mode == 'settle_audit') { 
					this.initSettleFormData() 
				} 
				if(data.mode == 'nopay_settle_create') { 
					
				}  
				if(data.mode == 'nopay_settle_audit') { 
				}  
				this.show = true
				setTimeout(() => {
					this.$refs[`form_${data.mode}`].setRules(this[`${data.mode}_rules`]) 
				}, 0)
			},
			async handleConfirm() { 
				const res = await this.checkForm()
				console.log(res)
				if(this.formActive.mode == 'settle_change') {
					// await this.settle_change()
					await this.baseApi({api: 'order_settle_change'})
				} 
				if(this.formActive.mode == 'settle_audit') {
					// await this.settle_audit()
					await this.baseApi({api: 'order_settle_audit'})
				} 
				if(this.formActive.mode == 'nopay_settle_create') {
					// await this.nopay_settle_create()
					await this.baseApi({api: 'order_nopay_settle_create'})
				} 
				if(this.formActive.mode == 'nopay_settle_audit') {
					// await this.nopay_settle_audit() 
					await this.baseApi({api: 'order_nopay_settle_audit'})
				} 
				this.show = false
			},
			async checkForm() { 
				return new Promise(async (resolve, rej) => {
					let formName = `form_${this.formActive.mode}`
					this.$refs[formName].validate().then(async r => {
						resolve(true)
					}).catch(errors => {
						uni.$u.toast('检查表单')
						rej(false)
					})
				})
				
			},
			baseApi({api}) {
				return new Promise(async (resolve, rej) => {
					uni.showLoading() 
					const res = await this.$api[api](this.paramsObj)
					if(res.code == 1) {
						this.showToast({
							type: 'success',
							message: res.msg, 
						})
						uni.showLoading({
							title: '获取最新数据中'
						})
						await this.getData()
						resolve()
					}
				})
				
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				 
				this.form_nopay_settle_create.pic1_base64 = ''
				this.form_nopay_settle_create.pic1_name = ''
			},
			handleoversize() {
				uni.showToast({
					title: '建议上传2M以内的图片',
					icon: 'none'
				})
			},
			async afterRead(event) {
				console.log(event)
				this.fileList1 = [{
					url:  event.file.thumb,
					status: 'uploading',
					message: '上传中'
				}]
				const base64 = await this.getImageBase64_readFile(event.file.thumb)
				this.fileList1 = [{
					url: event.file.thumb,
					status: 'success'
				}] 
				this.form_nopay_settle_create.pic1_base64 = base64
				this.form_nopay_settle_create.pic1_name = event.file.thumb.split('//tmp/')[1]  
				
			},
			async getNoPayData() {
				//获取线下支付凭证ID
				uni.showLoading()
				const res = await this.$api.get_order_nopay({
					params: { 
						id: this.list.pay_id,
						// order_id: this.id,
						// order_type: this.list.order_type,
						role: this.list.b_login == this.login ? 'B' : 'S'
					}
				}) 
				if(res.code == 1) {
					if(res.list.State == 'ERROR') {
						return
					}
					this.nopay_info = res.list.result
				}
			},
			previewImgBtn(imgs) {
				uni.previewImage({
					urls: imgs, 
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
		/deep/ {
			.u-upload__button {
				background-color: #fff!important;
			}
		}
	}
</style>
<style lang="scss" scoped>

	.item {
		color: #444;
	}
	.item-label {
		flex: 0 0 100px;
	}
	.main {
		background-color: #fff;
	}
	.btn-wrap {
		.item {
			flex: 0 0 50%;
			box-sizing: border-box;
		}
	}
	.wrapper {
		width: 100%;
		border-radius: 30rpx 30rpx 0 0 ;
		overflow: hidden;
		.header {
		}
		.main {
			background-color: #f8f8f8;
			height: 50vh;
			width: 100%;
			box-sizing: border-box;
			.item-card {
				width: 100%;
				box-sizing: border-box;
				.card-title {
					color: #666;
				}
			}
			.card-content {
				// background-color: #fff;
				border-radius: 10rpx;
				width: 100%;
				box-sizing: border-box;
				
			}
			.card-label {
				flex: 0 0 30%;
				margin-right: 4%;
				height: 30px;
				line-height: 30px;
				transition: all .3s;
				font-size: 14px;
				text-align: center;
				border-radius: 8rpx;
				position: relative;
				border: 1rpx solid #eee;
				&.rows {
					flex: 0 0 100%;
					margin-right: 0;
					text-align: left;
				}
				&.normal_white {
					border-color: #eee;
					color: #666;
				}
				&.normal_dark {
					border-color: #3a3352;
					color: #c8cfff;
				}
				&.active_white {
					border-color: #98c9ff;
					color: #007aff;
					background-color: #e6f2ff;
				}
				&.disabled_white {
					border-color: #c373ff !important;
					color: #7d3df7 !important;
					background-color: #ead9f7 !important;
				}
				&.active_dark {
					border-color: #025688;
					color: #00ffff;
					// background-color: #e6f2ff;
				}
				&.disabled_dark {
					border-color: #503f17 !important;
					color: #f7823d !important;
					// background-color: #ead9f7 !important;
				}
				&:nth-of-type(3n) {
					margin-right: 0;
				}
			}
		}
		.bottom {
			
		}
	}
</style>
