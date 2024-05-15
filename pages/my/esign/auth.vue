<template>
	<view class="u-p-20">
		<u--form
			labelPosition="left"  
			labelWidth="120"
			:model="model"
			:rules="rules"
			ref="form"
			:labelStyle="labelStyle"
			>
			<template v-if="is_sign_apply">
				<view class="u-border u-p-30 u-radius-8 u-m-b-30">
					<view class="u-m-b-20 text-bold">
						代理人信息
					</view>
					<u-form-item label="姓名" >
						<view class="u-flex">
							<view>{{ sign_info.agent_name }}（签合同的操作人）</view> 
						</view>
					</u-form-item>
					<u-form-item label="身份证号" >
						<view class="u-flex">
							<view>{{ agent_idNumber }}</view> 
						</view> 
					</u-form-item>
					<u-form-item label="认证状态" >
						<view class="u-flex">
							<view>{{ sign_info.agent_state | esignAgentState }}</view> 
							<view class="u-m-l-20" v-if="sign_info.agent_state != '2'">
								<u-button type="primary" size="mini"
									@click="handleGoto('pages/my/esign/auth_agent')"
								>去认证</u-button>
							</view> 
						</view> 
					</u-form-item>
					<u-form-item label="认证时间" >
						<view class="u-flex">
							<view>{{ sign_info.agent_time }}</view> 
						</view> 
					</u-form-item>
					<u-form-item label="签约手机号" >
						<view class="u-flex">
							<view>{{ mobile }}</view>  
						</view> 
					</u-form-item> 
				</view>
				
				<view class="u-border u-p-30 u-radius-8 u-m-b-30">
					<view class="u-m-b-20 text-bold">
						企业信息
					</view>
					<u-form-item label="企业全称" >
						<view class="u-flex">
							<view>{{ sign_info.organizations_name }}</view> 
						</view>  
					</u-form-item>
					<u-form-item label="统一社会信用代码" >
						<view class="u-flex">
							<view>{{ sign_info.reg_no }}</view> 
						</view>   
					</u-form-item>
					<u-form-item label="认证状态" >
						<view class="u-flex">
							<view>{{ sign_info.organizations_state | esignOrganizationsState }}</view>
							<view class="u-m-l-20" v-if="sign_info.organizations_state != '2'">
								<u-button type="primary" size="mini"
									@click="handleGoto('pages/my/esign/auth_organizations')"
								>去认证</u-button>
							</view> 
						</view>  
					</u-form-item>
					<u-form-item label="认证时间" >
						<view class="u-flex">
							<view>{{ sign_info.organizations_time }}</view> 
						</view>   
					</u-form-item>
					<u-form-item label="法人姓名" >
						<view class="u-flex">
							<view>{{ sign_info.account_name }}</view> 
						</view>   
					</u-form-item> 
				</view>
			</template>
			<template v-else-if="!pageLoading">
				<view class="u-p-20">
					<u-form-item label="企业全称" prop="organizations_name" ref="organizations_name" required >
						<u--input
							v-model="model.organizations_name"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item label="统一社会信用代码" prop="reg_no" ref="reg_no" required >
						<u--input
							v-model="model.reg_no"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item label="法人姓名" prop="legal_name" ref="legal_name" required >
						<u--input
							v-model="model.legal_name"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item label="代理人姓名" prop="agent_name" ref="agent_name" required >
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
					<view>
						<u-button type="primary" @click="submit">提 交</u-button>
					</view>
				</view>
				
			</template>
		</u--form>
		<menusBar  theme="white" ></menusBar>
		<u-loading-page :loading="pageLoading"></u-loading-page>
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
					organizations_name: '',
					reg_no: '',
					legal_name: '',
					agent_name: '',
					agent_idNumber: '',
				},
				pageLoading: true,
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
			agent_idNumber() {
				return cardHide(this.sign_info.agent_idNumber)
			},
			mobile() {
				return phoneHide(this.sign_info.mobile)
			},
			rules() {
				return {
					'organizations_name': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					},
					'reg_no': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					},
					'legal_name': {
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
		onReady() { 
			this.$refs.form.setRules(this.rules)
		},
		async onLoad() {
			this.pageLoading = true
			uni.showLoading()
			try{
				await this.ESIGN_QUERY_ESIGN_ACCOUNT() 
			}catch(e){
				//TODO handle the exception
			}
			this.pageLoading = false
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				ESIGN_QUERY_ESIGN_ACCOUNT: 'esign/ESIGN_QUERY_ESIGN_ACCOUNT'
			}),
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			submit() {
				
				this.$refs.form.validate().then(async res => {
					uni.showLoading() 
					const r = await this.$api.ESIGN_CREATE_ESIGN_ACCOUNT({...this.paramsObj})
					if(r.code == 1) {
						uni.showLoading() 
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
