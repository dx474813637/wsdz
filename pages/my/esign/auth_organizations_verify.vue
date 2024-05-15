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
				<u-form-item label="打款对公账号信息" >
					<view>{{transferProcess.subbranch}} - {{transferProcess.cardNo}}</view> 
				</u-form-item>  
				<u-form-item label="预计最晚到款日期" >
					<view>{{transferProcess.foresee}}</view> 
				</u-form-item>  
				<u-form-item label="打款进度标识" >
					<view>{{transferProcess.message}}</view> 
				</u-form-item>  
				<u-form-item label="交易流水号" >
					<view>{{transferProcess.bizFlowNo}}</view> 
				</u-form-item>  
				<u-form-item label="校验金额/元" prop="amount" ref="amount" required >
					<view>
						<u--input
							type="number"
							v-model="model.amount" 
							clearable
						></u--input>
						<view class="u-info u-font-24">已打款至您所填的帐户，请通过网银或财务查询打款金额（0.01-0.99元之间）并填写。24小时内只能校验三次</view>
					</view> 
				</u-form-item>  
				<view>
					<u-button type="primary" @click="submit">提 交</u-button>
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
					amount: '',  
				},
				transferProcess: {},
				pageLoading: true, 
			};
		},
		components: {
			menusPopupBankSub,
			menusPopupBank
		},
		computed: {
			...mapState({
				addressArea: state => state.user.addressArea,
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
			agent_idNumber() {
				return cardHide(this.sign_info.agent_idNumber)
			}, 
			rules() {
				return {
					'amount': [{
							validator: (rule, value, callback) => {
								return value >= 0.01 && value <= 0.99
							},
							message: '输入0.01至0.99之内的校验金额',
							trigger: ['blur', 'change']
						}, 
					],   
				}
			}
		},
		watch: {
			// sign_info: {
			// 	handler(n) {
			// 		console.log(n) 
			// 		this.model.mobile = n.mobile 
			// 	},
			// 	immediate: true,
			// 	// deep: true
			// }
		},
		onReady() { 
			this.$refs.form.setRules(this.rules)
		},
		async onLoad() { 
			if(!this.sign_info.id) {
				await this.init()
			} 
			this.ESIGN_QUERY_TRANSFER_PROCESS()
			// this.getBankData()
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				ESIGN_QUERY_ESIGN_ACCOUNT: 'esign/ESIGN_QUERY_ESIGN_ACCOUNT',
				getAddressArea: 'user/getAddressArea'
			}), 
			async ESIGN_QUERY_TRANSFER_PROCESS () {
				const res = await this.$api.ESIGN_QUERY_TRANSFER_PROCESS()
				if(res.code == 1) {
					this.transferProcess = res.list?.result || {}
				}
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
					const r = await this.$api.ESIGN_VERIFY_RANDOM_AMOUNT({
						params: {
							...this.paramsObj
						}
					})
					if(r.code == 1) {
						uni.showToast({
							title: r.msg,
							icon: 'success'
						})
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/my/esign/auth_organizations_verify'
							})
						}, 1000)
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
