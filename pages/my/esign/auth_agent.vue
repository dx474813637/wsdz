<template>
	<view class="u-p-20">
		<u--form
			labelPosition="top"  
			labelWidth="100%"
			:model="model"
			:rules="rules"
			ref="form"
			:labelStyle="labelStyle"
			>
			<view class="u-p-20"> 
				<u-form-item label="代理人姓名(签合同的操作人)" prop="agent_name" ref="agent_name" required >
					<u--input
						v-model="model.agent_name" 
						clearable
					></u--input>
				</u-form-item>
				<u-form-item label="代理人身份证" prop="agent_idNumber" ref="agent_idNumber" required >
					<u--input
						v-model="model.agent_idNumber"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item label="签约手机号(用于后续签约,请务必填写有效手机号)" prop="mobile" ref="mobile" required >
					<u--input
						v-model="model.mobile"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item label="短信验证码" prop="captcha" ref="captcha" required >
					<u-input
						v-model="model.captcha" 
						placeholder="短信验证码"
						clearable
					>
						<template slot="suffix">
							<u-code
								ref="uCode"
								@change="codeChange"
								seconds="60"
								changeText="X秒重新获取"
							></u-code>
							<u-button
								@tap="getCode"
								:text="tips"
								type="success"
								size="mini"
							></u-button>
						</template>
					</u-input> 
				</u-form-item>
				<view>
					<u-button type="primary" @click="submit">提 交</u-button>
				</view>
			</view>
				
		</u--form>
		<menusBar  theme="white" ></menusBar> 
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import { phoneHide, cardHide } from '@/utils'
	 
	export default {
		data() {
			return {
				labelStyle: {
					color: '#666',
					fontSize: '14px'
				},
				model: { 
					agent_idNumber: '',
					mobile: '',
					agent_name: '',
					captcha: '',
				},
				pageLoading: true,
				tips: '',
			};
		},
		computed: {
			...mapState({
				sign_info: (state) => state.esign.sign_info,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				is_sign_apply: 'esign/is_sign_apply',
				sign_agent: 'esign/sign_agent',
				sign_organizations: 'esign/sign_organizations',
			}),
			paramsObj() {
				return {
					...this.model
				}
			},
			paramsGetCodeObj() {
				return {
					agent_name: this.model.agent_name,
					mobile: this.model.mobile,
				}
			},
			agent_idNumber() {
				return cardHide(this.sign_info.agent_idNumber)
			}, 
			rules() {
				return {
					'mobile': [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => { 
								return uni.$u.test.mobile(value)
							},
							message: '请输入正确的11位手机号',
							trigger: ['blur', 'change']
						},
					],
					'captcha': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					}, 
					'agent_name': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					}, 
					'agent_idNumber': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					}, 
				}
			}
		},
		watch: {
			sign_info: {
				handler(n) {
					console.log(n)
					this.model.agent_idNumber = n.agent_idNumber
					this.model.mobile = n.mobile
					this.model.agent_name = n.agent_name
				},
				immediate: true,
				// deep: true
			}
		},
		onReady() { 
			this.$refs.form.setRules(this.rules)
		},
		async onLoad() {
			if(!this.sign_info.id) {
				await this.init()
			} 
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				ESIGN_QUERY_ESIGN_ACCOUNT: 'esign/ESIGN_QUERY_ESIGN_ACCOUNT'
			}),
			async init(){
				this.pageLoading = true
				uni.showLoading()
				try{
					await this.ESIGN_QUERY_ESIGN_ACCOUNT() 
				}catch(e){
					//TODO handle the exception
				}
				this.pageLoading = false
			},
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			async getCode() { 
				this.$refs.form.validateField('mobile')
				if(!uni.$u.test.mobile(this.model.mobile)) {
					this.showToast({
						type: 'error',
						message: '请填写正确的手机号', 
					})
					return
				}
				if (this.$refs.uCode.canGetCode) {
				  // 模拟向后端请求验证码
				  uni.showLoading({
					title: '正在获取验证码'
				  })
					const res = await this.$api.ESIGN_VERIFY_AGENT_GET_CAPTCHA({
						params: {
							...this.paramsGetCodeObj
						}
					})
					if(res.code == 1) {
						this.showToast({
							type: 'success',
							message: '发送成功！', 
						})
						 this.$refs.uCode.start();
					}
				} else {
				  uni.$u.toast('倒计时结束后再发送');
				}
			},
			submit() {
				
				this.$refs.form.validate().then(async res => {
					uni.showLoading() 
					const r = await this.$api.ESIGN_VERIFY_AGENT({
						params: {
							...this.paramsObj
						}
					})
					if(r.code == 1) {
						this.showToast({
							type: 'success',
							message: r.msg, 
						})
						uni.showLoading() 
						try{
							await this.ESIGN_QUERY_ESIGN_ACCOUNT()
						}catch(e){
							//TODO handle the exception
						}
						
						uni.navigateBack()
					}
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('请检查表单内容')
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
