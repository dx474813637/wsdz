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
			<view class="u-p-30 u-m-b-20 text-base"> 
				自动签约授权成功后，销售合同签署时，系统将自动调用委托方的数字证书完成盖章。 
			</view>
			<template v-if="!is_sign_auto_form_show">
				<view class="u-border u-p-30 u-radius-8 u-m-b-30"> 
					<u-form-item label="授权结果" >
						<view class="u-flex">
							<view>{{ sign_auto_info.state | esignAutoState2Str }}</view> 
						</view>
					</u-form-item>
					<u-form-item label="授权模板" v-if="list.file_rawmex">
						<view class="text-primary" @click="handleViewPdf(list.file_rawmex)">查看</view>
					</u-form-item>
					<u-form-item label="委托方" >
						<view class="u-flex">
							<view>{{ sign_auto_info.company }}</view> 
						</view> 
					</u-form-item>
					<u-form-item label="联系地址" >
						<view class="u-flex">
							<view>{{ sign_auto_info.address }}</view> 
						</view> 
					</u-form-item>
					<u-form-item label="授权有效期" >
						<view class="u-flex">
							<view>{{ sign_auto_info.start_date }} 至 {{ sign_auto_info.end_date }}</view> 
						</view> 
					</u-form-item>
					<u-form-item label="应用场景" >
						<view >
							<view class="u-flex u-flex-items-center u-m-b-30">
								<view>一口价交易：</view>
								<view :class="{
									'u-success': scene_1
								}">{{ scene_1_text }}</view>
								<view class="u-m-l-20">
									<u--text type="primary" :text="scene_1_btn" @click="shouquanBtn('scene_1')"></u--text>
								</view>
							</view> 
							<view class="u-flex u-flex-items-center">
								<view>议价交易：</view>
								<view :class="{
									'u-success': scene_0
								}">{{ scene_0_text }}</view>
								<view class="u-m-l-20">
									<u--text type="primary" :text="scene_0_btn" @click="shouquanBtn('scene_0')"></u--text>
								</view>
							</view> 
						</view> 
					</u-form-item> 
					<view class="u-p-t-30" v-if="startAuthBtnShow">
						<!-- 开启签约 -->
						<u-button type="primary" @click="authStart">开启签约</u-button>
					</view> 
				</view>
				 
			</template>
			<template v-else-if="!pageLoading">
				<view class="u-p-20">
					<u-form-item label="联系地址" prop="address" ref="address" required > 
						<u--textarea
							v-model="model.address" 
							placeholder="联系地址" 
							height="90"
							maxlength="-1"
						></u--textarea>
					</u-form-item>
					<u-form-item label="授权期限/年" prop="auth_date" ref="auth_date" required >
						<u--input
							v-model="model.auth_date"
							type="number"
							clearable
						></u--input>
					</u-form-item> 
					<u-form-item label="应用场景" prop="scene" ref="scene" required >
						<u-checkbox-group
							v-model="scene"
							placement="row" 
							@change="change"
						>
							<u-checkbox
								:customStyle="{marginRight: '8px'}"
								v-for="(item, index) in checkboxScene"
								:key="item.value"
								:label="item.name"
								:name="item.value"
							>
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item> 
					<u-form-item label="应用平台" prop="mancust" ref="mancust" required >
						<view @click="mancust_show = true">
							<u--input
								:value="mancust_active_name"
								type="number"
								readonly
							></u--input>
						</view>
					</u-form-item>
					<view class="u-p-t-30">
						<!-- 创建&修改 -->
						<u-button type="primary" @click="submit">{{submitBtnText}}</u-button>
					</view> 
					<view class="u-p-t-30" v-if="isConfirmForm">
						<!-- 确认 -->
						<u-button type="error" @click="submit('1')">确认信息并提交</u-button>
					</view>
				</view>
				
			</template>
				<view class="u-p-t-30" v-if="sign_auto_info.state == '5'">
					<!-- 开启签约 -->
					<u-button type="primary" @click="reApplyBtn">申请重新发起授权申请</u-button>
				</view> 
		</u--form>
		<menusBar  theme="white" ></menusBar>
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<u-toast ref="uToast"></u-toast>
		<u-picker 
			:show="mancust_show" 
			:columns="mancust_list"
			keyName="logoname" 
			closeOnClickOverlay
			@close="mancust_show = false"
			@cancel="mancust_show = false"
			@confirm="mancustConfirm"
		></u-picker>
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
				mancust_show: false,
				mancust_list: [],
				transferProcess: {},
				model: {
					address: '',
					auth_date: '1', 
					mancust: 'all',
					scene: '',
				},
				pageLoading: true,
				scene: [],
				// 基本案列数据
				checkboxScene: [{
						name: '一口价交易',
						value: ' scene_1',
						disabled: false
					},
					{
						name: '议价交易',
						value: ' scene_0',
						disabled: false
					} 
				],
			};
		},
		computed: {
			...mapState({
				sign_info: (state) => state.esign.sign_info,
				sign_auto_info: (state) => state.esign.sign_auto_info,
				myCpy: (state) => state.user.myCpy,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				is_sign_auto_form_show: 'esign/is_sign_auto_form_show',
				sign_agent: 'esign/sign_agent',
				sign_organizations: 'esign/sign_organizations',
			}),
			cpyUrlObj() {
				return this.transferProcess.bizFlowNo? {
					url: '/pages/my/esign/auth_organizations_verify'
				} : {
					url: '/pages/my/esign/auth_organizations'
				}
			},
			paramsObj() {
				return {
					...this.model
				}
			}, 
			scene_1() {
				return this.sign_auto_info?.scene?.includes('scene_1') 
			},
			scene_0() {
				return this.sign_auto_info?.scene?.includes('scene_0') 
			},
			scene_1_text() {
				return this.scene_1 ? '已授权' : '未授权'
			},
			scene_0_text() {
				return this.scene_0 ? '已授权' : '未授权'
			},
			scene_1_btn() {
				return this.scene_1 ? '取消' : '授权'
			},
			scene_0_btn() {
				return this.scene_0 ? '取消' : '授权'
			},
			isConfirmForm() {
				return this.sign_auto_info.hasOwnProperty('state') && this.sign_auto_info.state == '0'
			},
			startAuthBtnShow() {
				return this.sign_auto_info.hasOwnProperty('state') && this.sign_auto_info.state == '1'
			},
			submitBtnText() {
				return this.isConfirmForm ? '修改信息' : '创建自动签约授权申请'
			},
			mancust_active_name() {
				if(this.mancust_list[0]?.length == 0) return ''; 
				return this.mancust_list[0]?.filter(ele => ele.login == this.model.mancust)[0]?.logoname
			},
			rules() {
				return {
					'address': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					},
					'auth_date': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					},
					'scene': {
						type: 'string',
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					},  
					'mancust': {
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
			await this.init()
			this.LIST_MANCUSTS() 
		},
		watch: {
			sign_auto_info: {
				handler(n) {
					this.model.address = n.address 
					this.model.mancust = n.mancust 
					this.scene = n?.scene?.split(',').filter(ele => ele) || []
				},
				deep: true,
				immediate: true
			},
			scene: {
				handler(n) { 
					console.log(n)
					if(n.length == 0) {
						this.model.scene = ''
					} else { 
						this.model.scene = n.join(',')
					}
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto',
				handleViewPdf: 'esign/handleViewPdf',
			}),
			...mapActions({
				myCompany: 'user/myCompany',
				AUTH_Z_QUERY: 'esign/AUTH_Z_QUERY'
			}),
			change(e) {
				// console.log(e)
			},
			mancustConfirm(e) { 
				this.model.mancust = e.value[0]?.login
				this.mancust_show = false
			},
			async init() {
				this.pageLoading = true
				uni.showLoading()
				try{
					await this.AUTH_Z_QUERY()  
					
				}catch(e){
					//TODO handle the exception
				}
				this.pageLoading = false 
			},
			async LIST_MANCUSTS() {
				const res = await this.$api.LIST_MANCUSTS()
				if(res.code == 1) {
					this.mancust_list = [res.list?.list_mancusts || []]
				}
			}, 
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			submit(confirm='') {
				
				this.$refs.form.validate().then(async res => {
					uni.showLoading() 
					const r = await this.$api.AUTH_Z({...this.paramsObj, confirm})
					if(r.code == 1) {
						this.showToast({
							type: 'success',
							message: res.msg, 
						}) 
					await this.init()
					}
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('请检查表单内容')
				})
			},
			async shouquanBtn(v) {
				uni.showLoading();
				let del = this.sign_auto_info.scene.includes(v)? '1' : '';
				const res = await this.$api.AUTH_Z_SCENE({
					params: {
						scene: v,
						del
					}
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					await this.init()
				}
			},  
			async authStart() {
				uni.showLoading(); 
				const res = await this.$api.AUTH_Z_START()
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					await this.init()
				}
			}, 
			async reApplyBtn() {
				uni.showLoading(); 
				const res = await this.$api.AUTH_Z_RE()
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					await this.init()
					await this.submit()
				}
			}, 
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
