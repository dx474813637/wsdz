<template>
	<view class="u-p-20">
		<u--form
			labelPosition="left"  
			labelWidth="120"
			:labelStyle="labelStyle"
			>
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
						<view class="u-m-l-20" v-if="sign_info.agent_state == '2'">
							<u-button type="primary" size="mini"
								@click="handleGoto('pages/my/esign/auth_edit')"
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
				}
			};
		},
		computed: {
			...mapState({
				sign_info: (state) => state.esign.sign_info,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sign_agent: 'esign/sign_agent',
				sign_organizations: 'esign/sign_organizations',
			}),
			agent_idNumber() {
				return cardHide(this.sign_info.agent_idNumber)
			},
			mobile() {
				return phoneHide(this.sign_info.mobile)
			},
		},
		onLoad() {
			this.ESIGN_QUERY_ESIGN_ACCOUNT()
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
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
