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
				<template v-if="is_submit">
					<u-form-item label="认证状态" >
						<view class="u-flex">
							<view>{{ sign_info.organizations_state | esignOrganizationsState }}</view> 
							<view class="u-m-l-20">
								<u-button shape="circle" type="primary" plain size="mini" @click="refresh2">刷新</u-button>
							</view> 
						</view> 
						
					</u-form-item> 
					<view>
						<u-button type="primary" @click="handleGoto({url: '/pages/my/esign/auth', type: 'reLaunch'})">返回身份信息</u-button>
					</view>
				</template>
				<template v-else>
					<u-form-item label="打款对公账号信息" >
						<view >
							<view class="">
								{{transferProcess.subbranch}}
							</view>
							<view class="">
								{{transferProcess.cardNo}}
							</view>
						</view> 
					</u-form-item>  
					<u-form-item label="预计最晚到款日期" >
						<view>{{transferProcess.foresee}}</view> 
					</u-form-item>  
					<u-form-item label="打款进度标识" >
						<view class="u-flex">
							<view>{{transferProcess.message}}</view> 
							<view class="u-m-l-20">
								<u-button shape="circle" type="primary" plain size="mini" @click="refresh">刷新</u-button>
							</view> 
						</view> 
					</u-form-item>  
					<u-form-item label="交易流水号" >
						<view>{{transferProcess.bizFlowNo}}</view> 
					</u-form-item>  
					<u-form-item label="校验金额/元" prop="amount" ref="amount" required >
						<view>
							<u--input
								type="digit"
								v-model="model.amount" 
								clearable
							></u--input>
							<view class="u-info u-font-24">已打款至您所填的帐户，请通过网银或财务查询打款金额（0.01-0.99元之间）并填写。24小时内只能校验三次</view>
						</view> 
					</u-form-item>  
					<view>
						<u-button type="primary" @click="submit">提 交</u-button>
					</view>
				</template>
				
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
				is_submit: false,
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
				updateSignState: 'esign/updateSignState',
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
			async refresh2() {
				uni.showLoading()
				const res = await this.$api.ESIGN_QUERY_VERIFY_ORGANIZATIONS()
				if(res.code == 1) { 
					this.updateSignState(res.list.organizations_auth_state)
					this.showToast({
						type: 'success',
						message: '更新企业认证状态成功', 
					})
					this.ESIGN_QUERY_ESIGN_ACCOUNT()
				}
				
			},
			async refresh() {
				uni.showLoading()
				await this.ESIGN_QUERY_TRANSFER_PROCESS()
				this.showToast({
					type: 'success',
					message: '查询随机金额打款进度成功', 
				})
				this.ESIGN_QUERY_ESIGN_ACCOUNT()
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
						this.showToast({
							type: 'success',
							message: r.msg, 
						})
						this.is_submit = true;
						this.ESIGN_QUERY_ESIGN_ACCOUNT() 
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
