<template>
	<view class="w u-p-20">
		<u-navbar
			bgColor="transparent"
			:fixed="false"
		>
			<view slot="left">
				<view @click="handleGoto({url: '/pages/my/money/index'})" class="text-white u-flex u-flex-items-center">
					<u-icon
						name="arrow-left"
						color="#fff"
					></u-icon>
					<text class="u-p-l-20 ">资金中心</text>
				</view>
				
			</view>
		</u-navbar>
		
		<view class="main u-p-10 u-p-t-20">
			<view class="text-white u-p-b-10 u-font-36">
				注册支付平(sinopay)账号
			</view>
			<view class="text-white u-font-28 u-p-b-30">
				所有表单都为必填
			</view>
			<view class="form-w u-p-20 u-p-l-40 u-p-r-40">
				<u--form
					labelPosition="left"
					:model="model"
					:rules="rules"
					ref="userform"
					labelWidth="80"
					borderBottom
					:labelStyle="{fontSize: '28rpx'}"
				>
					<u-form-item
						label="用户类型"
						@click="showActions"
						ref="item1"
						borderBottom
					>
						<u--input
							v-model="userType"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择用户类型"
							border="none"
						></u--input>
						<u-icon
							slot="right"
							name="arrow-right"
						></u-icon>
					</u-form-item>
					<u-action-sheet
						:show="showUserType"
						:actions="userActions"
						title="请选择用户类型"
						@close="showUserType = false"
						@select="userTypeSelect"
					>
					</u-action-sheet>
					<u-form-item
						borderBottom
						label="手机号"
						prop="base.phone"
						ref="base_phone"
					>
						<u--input
							v-model="model.base.phone"
							placeholder="手机号"
							border="none"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item
						borderBottom
						label="验证码"
						prop="base.code"
						ref="base_code"
					>	
						<view class="u-flex u-flex-items-center">
							<u-input
								v-model="model.base.code"
								placeholder="验证码"
								border="none"
								clearable
							>
								<template slot="suffix">
									<u-code
										ref="uCode"
										@change="codeChange"
										keep-running
										change-text="XS后重新获取"
										@start="disabled = true"
										@end="disabled = false"
									></u-code>
									<u-button
										type="primary"
										@tap="getCode"
										:text="tips"
										size="small"
										:disabled="disabled"
									></u-button>
								</template>
							</u-input>
						</view>
					</u-form-item>
					<template v-if="userType == '个人'">
						
						<u-form-item
							borderBottom
							label="姓名"
							prop="userInfo.name"
							ref="userInfo_name"
						>
							<u--input
								v-model="model.userInfo.name"
								placeholder="姓名"
								border="none"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							label="身份证"
							borderBottom
							prop="userInfo.id"
							ref="userInfo_id"
						>
							<u--input
								v-model="model.userInfo.id"
								placeholder="身份证"
								border="none"
								clearable
							></u--input>
						</u-form-item>
					</template>
					<template v-if="userType == '个体工商户'">
						
						<u-form-item
							borderBottom
							label="姓名"
							prop="userInfo2.name"
							ref="userInfo_name"
						>
							<u--input
								v-model="model.userInfo2.name"
								placeholder="姓名"
								border="none"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							label="身份证"
							borderBottom
							prop="userInfo2.id"
							ref="userInfo_id"
						>
							<u--input
								v-model="model.userInfo2.id"
								placeholder="身份证"
								border="none"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							label="公司名称"
							borderBottom
							prop="userInfo2.cpyname"
							ref="userInfo_cpyname"
						>
							<u--input
								v-model="model.userInfo2.cpyname"
								placeholder="公司名称"
								border="none"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							label="信用统一代码"
							borderBottom
							prop="userInfo2.cpyid"
							ref="userInfo_cpyid"
						>
							<u--input
								v-model="model.userInfo2.cpyid"
								placeholder="信用统一代码"
								border="none"
								clearable
							></u--input>
						</u-form-item>
					</template>
					
					<template v-else-if="userType == '企业'">
						
						<u-form-item
							borderBottom
							label="企业名称"
							prop="cpyInfo.name"
							ref="cpyInfo_name"
						>
							<u--input
								border="none"
								v-model="model.cpyInfo.name"
								placeholder="企业名称"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							label="信用统一代码"
							borderBottom
							prop="cpyInfo.id"
							ref="cpyInfo_id"
						>
							<u--input
								border="none"
								v-model="model.cpyInfo.id"
								placeholder="信用统一代码"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							borderBottom
							label="法人姓名"
							prop="cpyInfo.name2"
							ref="cpyInfo_name2"
						>
							<u--input
								border="none"
								v-model="model.cpyInfo.name2"
								placeholder="法人姓名"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							borderBottom
							label="法人身份证"
							prop="cpyInfo.id2"
							ref="cpyInfo_id2"
						>
							<u--input
								border="none"
								v-model="model.cpyInfo.id2"
								placeholder="法人身份证"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							borderBottom
							label="联系人"
							prop="cpyInfo.contact"
							ref="cpyInfo_contact"
						>
							<u--input
								border="none"
								v-model="model.cpyInfo.contact"
								placeholder="联系人"
								clearable
							></u--input>
						</u-form-item>
					</template>
					
					
				</u--form>
				<view class="u-p-t-50 u-m-b-40">
					<u-button type="primary" @click="submit">提交</u-button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
				tips: '',
				disabled: false,
				userType: '个人',
				showUserType: false,
				userActions: [{
						name: '个人',
					},
					{
						name: '个体工商户'
					},
					{
						name: '企业'
					},
				],
				model: {
					base: {
						phone: '',
						code: '',
					},
					userInfo: {
						name: '',
						id: '',
					},
					userInfo2: {
						name: '',
						id: '',
						cpyname: '',
						cpyid: '',
					},
					cpyInfo: {
						name: '',
						id: '',
						name2: '',
						id2: '',
						contact: '',
					}
				},
				btnDisabled: false,
			}
		},
		computed: {
			rules() {
				return {
					'base.phone': [{
							type: 'string',
							required: true,
							message: '请填写手机号',
							trigger: ['blur', 'change']
						},{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value)
							},
							message: '请填写正确的手机号',
							trigger: ['blur', 'change']
						}],
					'base.code': {
						type: 'string',
						required: true,
						message: '请填写验证码',
						trigger: ['blur', 'change']
					},
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.id': {
						type: 'string',
						required: true,
						message: '请填写身份证',
						trigger: ['blur', 'change']
					},
					'userInfo2.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo2.id': {
						type: 'string',
						required: true,
						message: '请填写身份证',
						trigger: ['blur', 'change']
					},
					'userInfo2.cpyname': {
						type: 'string',
						required: true,
						message: '请填写公司名称',
						trigger: ['blur', 'change']
					},
					'userInfo2.cpyid': {
						type: 'string',
						required: true,
						message: '请填写公司信用统一代码',
						trigger: ['blur', 'change']
					},
					'cpyInfo.name': {
						type: 'string',
						required: true,
						message: '请填写企业名称',
						trigger: ['blur', 'change']
					},
					'cpyInfo.id': {
						type: 'string',
						required: true,
						message: '请填写信用统一代码',
						trigger: ['blur', 'change']
					},
					'cpyInfo.contact': {
						type: 'string',
						required: true,
						message: '请填写联系人',
						trigger: ['blur', 'change']
					},
					'cpyInfo.name2': {
						type: 'string',
						required: true,
						message: '请填写法人姓名',
						trigger: ['blur', 'change']
					},
					'cpyInfo.id2': {
						type: 'string',
						required: true,
						message: '请填写法人身份证',
						trigger: ['blur', 'change']
					},
				}
			}
		},
		onReady() {
			this.$refs.userform.setRules(this.rules)
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				if(this.disabled) return
				uni.showLoading({
					title: '正在获取验证码'
				})
				this.$refs.uCode.start();
				const res = await this.$api.getPhoneCode()
				if(res.code == 1) {
					uni.showToast({
						title: '验证码已发送'
					})
				}
			},
			userTypeSelect(e) {
				this.userType = e.name
				this.$refs.userform.clearValidate()
				// this.$refs.form1.validateField('userInfo.sex')
			},
			showActions() {
				this.showUserType = true; 
				uni.hideKeyboard()
			},
			submit() {
				
				this.$refs.userform.validate().then(res => {
					
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			async handleGetCode() {
				if(this.btnDisabled) return;
				this.$refs.userform.validateField('base.phone', async (errRes) => {
					if(errRes.length > 0) return
					this.btnDisabled = true;
					const res = await this.$api.getPhoneCode();
					if(res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
				
			},
			handleCountDownFinish() {
				this.btnDisabled = false;
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style scoped lang="scss">
	
	.w {
		box-sizing: border-box;
		// position: absolute;
		// z-index: 1;
		min-height: 100vh;
		background-image: url("http://dingxiang.netsun.testwebsite.cn/mShop/img/bg1.png");
		background-size: 100% 240px;
		background-position: top;
		background-repeat: no-repeat;
		width: 100%;
		// height: 240px;
		// left: 0;
		// top: 0;
	}
	.main {
		position: relative;
		z-index: 1;
		box-sizing: border-box;
	}
	.form-w {
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 10px;
	}
</style>
