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
				<u-form-item label="企业名称" >
					<view>{{sign_info.organizations_name}}</view> 
				</u-form-item> 
				<u-form-item label="统一社会信用代码" >
					<view>{{sign_info.reg_no}}</view> 
				</u-form-item> 
				<u-form-item label="开户行总行名称" prop="bank" ref="bank" required >
					<view @click="show1 = true">
						<u--input
							v-model="model.bank"
							readonly 
							suffixIcon="arrow-down"
							suffixIconStyle="color: #909399"
							placeholder="点击选择开户行总行"
							clearable
						></u--input>
					</view>
				</u-form-item> 
				<u-form-item label="开户行所在地" prop="regional" ref="regional" required > 
					<uni-data-picker 
						placeholder="所在地" 
						popup-title="请选择所在地区" 
						:localdata="addressAreaAuth" 
						v-model="model.regional"
					></uni-data-picker>
				</u-form-item> 
				<u-form-item label="开户行名称" prop="subbranch" ref="subbranch" required >
					<view @click="show2 = true">
						<u--input
							v-model="model.subbranch"
							readonly 
							suffixIcon="arrow-down"
							suffixIconStyle="color: #909399"
							placeholder="点击搜索开户行"
							clearable
						></u--input>
					</view>
					<!-- <u--input
						v-model="model.subbranch" 
						clearable
					></u--input> -->
				</u-form-item> 
				<u-form-item label="银行卡号" prop="cardNo" ref="cardNo" required >
					<u--input
						v-model="model.cardNo" 
						clearable
					></u--input>
				</u-form-item> 
				<u-form-item label="通知短信手机号" prop="mobile" ref="mobile" required >
					<u--input
						v-model="model.mobile" 
						clearable
					></u--input>
				</u-form-item> 
				<view>
					<u-button type="primary" @click="submit">提交并申请打款</u-button>
				</view>
			</view>
				
		</u--form>
		
		<menusPopupBank
			:show="show1"
			theme="white" 
			@close="show1 = false"
			@confirm="menusConfirm1"
		></menusPopupBank>
		
		<menusPopupBankSub 
			:show="show2" 
			theme="white" 
			showMode="list"
			@close="show2 = false"
			@confirm="menusConfirm2"
		></menusPopupBankSub>
		<menusBar  theme="white" ></menusBar> 
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import { phoneHide, cardHide } from '@/utils'
	import menusPopupBank from '@/pages/my/components/menusPopup/menusPopupBank.vue'
	import menusPopupBankSub from '@/pages/my/components/menusPopup/menusPopupBankSub.vue'
	 
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				labelStyle: {
					color: '#666',
					fontSize: '14px'
				},
				model: { 
					bank: '',  
					regional: '',
					subbranch: '',
					cardNo: '',
					mobile: '',
				},
				organizations: {},
				pageLoading: true, 
			};
		},
		components: {
			menusPopupBankSub,
			menusPopupBank
		},
		computed: {
			...mapState({
				addressAreaAuth: state => state.user.addressAreaAuth,
				sign_info: (state) => state.esign.sign_info,
				sign_organizations_apply_state: (state) => state.esign.sign_organizations_apply_state,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				is_sign_apply: 'esign/is_sign_apply',
				sign_agent: 'esign/sign_agent',
				// sign_organizations: 'esign/sign_organizations',
			}),
			paramsObj() {
				return {
					...this.model
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
					'regional': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					}, 
					'subbranch': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					}, 
					'cardNo': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					}, 
					'bank': {
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
					this.model.mobile = n.mobile 
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
			await this.getLastData()
			this.getAddressAreaAuth() 
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				ESIGN_QUERY_ESIGN_ACCOUNT: 'esign/ESIGN_QUERY_ESIGN_ACCOUNT',
				ESIGN_QUERY_VERIFY_ORGANIZATIONS: 'esign/ESIGN_QUERY_VERIFY_ORGANIZATIONS',
				getAddressAreaAuth: 'user/getAddressAreaAuth'
			}),
			async getBankData () {
				const res = await this.$api.ESIGN_GET_BANK_CODE()
			},
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
			async getLastData() {
				const res = await this.$api.ESIGN_QUERY_LOGIN_VERIFY_ORGANIZATIONS_RECORD();
				if(res.code == 1) {
					const list = res.list.Channel_esign_verify_organizations || {}; 
					this.organizations = list
					if(list.id) {
						this.model.bank = list.bank 
						this.model.regional = list.regional 
						this.model.subbranch = list.subbranch 
						this.model.cardNo = list.cardNo 
						this.model.mobile = list.mobile
					}
					
				}
			},
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			}, 
			menusConfirm1(data) { 
				this.model.bank = data.name 
				this.$refs.form.validateField('bank')
			},
			menusConfirm2(data) {
				console.log(data)
				this.model.subbranch = data.bank_name 
				this.$refs.form.validateField('subbranch')
			},
			submit() {
				
				this.$refs.form.validate().then(async res => {
					uni.showLoading() 
					const r = await this.$api.ESIGN_TRANSFER_RANDOM_AMOUNT({
						...this.paramsObj
					})
					if(r.code == 1 && r.list.State == 'SUCCESS') {
						await this.ESIGN_QUERY_VERIFY_ORGANIZATIONS() 
						if(this.sign_organizations_apply_state == '1') { 
							//申请成功，跳转打款验证
							this.showToast({
								type: 'success',
								message: r.msg, 
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/my/esign/auth_organizations_verify'
								})
							}, 1000)
						}
						else if(this.sign_organizations_apply_state == '0') {
							//申请失败，重新递交
							this.showToast({
								type: 'error',
								message: '申请失败' || r.list.errorMsg, 
							})
							await this.getLastData()
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

<style lang="scss" scoped>

</style>
