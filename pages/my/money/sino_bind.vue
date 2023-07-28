<template>
	<view class="w u-p-20">
		<view class="w-bg"></view>
		<u-navbar
			bgColor="transparent"
			:fixed="false"
			title="资金平台"
			titleStyle="color: #fff"
			autoBack
		>
			<view slot="left">
				<view class="text-white u-flex u-flex-items-center">
					<u-icon
						name="arrow-left"
						color="#fff"
						size="20"
					></u-icon> 
				</view>
				
			</view> 
		</u-navbar>
		
		<view class="main u-p-10 u-p-t-20">
			<view class="text-white u-p-b-30 u-p-t-10 u-font-32 info-box u-flex u-flex-items-center u-flex-column">
				<view class="u-font-40">{{tishi.list[0].title}}</view>
				<view class="u-font-28 u-p-t-10" style="opacity: 0.8; font-weight: 300">{{tishi.list[0].info}}</view>
				
			</view>
			<!-- <view class="text-white u-font-28 u-p-b-30">
				所有表单都为必填
			</view> -->
			<view class="form-w u-m-t-30">
				<view class="tabs-w u-flex u-flex-items-end u-font-36">
					<view class="tabs-item left u-text-center" @click="handleGoto({url: '/pages/my/money/sino_reg', type: 'redirectTo'})">新用户注册</view>
					<view class="tabs-item right u-text-center active ">绑定已有账号</view>
				</view>
				<view class="form-content u-p-l-40 u-p-r-40 u-p-20">
					<u--form
						labelPosition="left"
						:model="model"
						:rules="rules"
						ref="userform"
						labelWidth="90"
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
							<!-- <u-icon
								slot="right"
								name="arrow-right"
							></u-icon> -->
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
							label="企业名称" 
						>
							<view>{{myCpy.name}}</view>
							<!-- <u-input
								border="none"
								:value="myCpy.name"
								readonly
								placeholder="企业名称"
								clearable
							></u-input> -->
						</u-form-item>
						<u-form-item
							label="信用统一代码"
							borderBottom 
						>
							<u--input
								border="none"
								readonly
								:value="myCpy.credit_code"
								placeholder="信用统一代码" 
							></u--input>
						</u-form-item>
						<u-form-item
							borderBottom
							label="sinopay账号"
							prop="base.sinopay"
							ref="base_sinopay"
						>
							<u--input
								v-model="model.base.sinopay"
								placeholder="sinopay账号"
								border="none"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							borderBottom
							label="sinopay密码"
							prop="base.sinopay_pwd"
							ref="base_sinopay_pwd"
						>	
							<u--input
								v-model="model.base.sinopay_pwd"
								placeholder="sinopay密码"
								border="none"
								password
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							borderBottom
							label="备注"
							prop="base.remark"
							ref="base_remark"
						>
							<u--input
								v-model="model.base.remark" 
								border="none"
								clearable
							></u--input>
						</u-form-item>
						<template v-if="userType == '个人'">
							
							<!-- <u-form-item
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
							</u-form-item> -->
						</template>
						<template v-if="userType == '个体工商户'">
							
							<!-- <u-form-item
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
							</u-form-item> -->
							
						</template>
						
						<template v-else-if="userType == '企业'">
							
							<!-- <u-form-item
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
							</u-form-item> -->
							
						</template>
						
						
					</u--form>
					<view class="u-p-t-50 u-m-b-20">
						<u-button type="primary" shape="circle" :customStyle="{backgroundImage: 'linear-gradient(to right,#6cb5fa, #4077f6)'}" @click="submit">{{tishi.list[0].button || '提交'}}</u-button>
					</view>
					<view class="form-w u-font-28 u-m-b-20 text-base" v-if="tishi.list[0].other">
						<u-parse :content="tishi.list[0].other"></u-parse>
					</view>
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
				
				userType: '企业',
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
						sinopay: '',
						sinopay_pwd: '',
					},
					userInfo: {
						name: '',
						id: '',
					},
					userInfo2: {
						name: '',
						id: '',
					},
					cpyInfo: {
						name: '',
						id: '',
					}
				},
			}
		},
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy,
				tishi: state => state.sinopay.tishi,
			}),
			rules() {
				return {
					'base.sinopay': {
						type: 'string',
						required: true,
						message: '请填写sinopay账号',
						trigger: ['blur', 'change']
					},
					'base.sinopay_pwd': {
						type: 'string',
						required: true,
						message: '请填写sinopay密码',
						trigger: ['blur', 'change']
					},
					// 'userInfo.name': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写姓名',
					// 	trigger: ['blur', 'change']
					// },
					// 'userInfo.id': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写身份证',
					// 	trigger: ['blur', 'change']
					// },
					// 'userInfo2.name': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写姓名',
					// 	trigger: ['blur', 'change']
					// },
					// 'userInfo2.id': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写身份证',
					// 	trigger: ['blur', 'change']
					// },
					// 'cpyInfo.name': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写企业名称',
					// 	trigger: ['blur', 'change']
					// },
					// 'cpyInfo.id': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写信用统一代码',
					// 	trigger: ['blur', 'change']
					// },
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
			userTypeSelect(e) {
				this.userType = e.name
				this.$refs.userform.clearValidate()
				// this.$refs.form1.validateField('userInfo.sex')
			},
			showActions() {
				// this.showUserType = true; 
				// uni.hideKeyboard()
			},
			submit() {
				
				this.$refs.userform.validate().then(async r => {
					const res = await this.$api.sino_account_bind({
						params: {
							sinopay_poster: this.model.base.sinopay,
							sinopay_passwd: this.model.base.sinopay_pwd,
							remark: this.model.base.remark
						}
					})
					if(res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							success: () => {
								this.handleGoto({url : res.url, type: 'redirectTo'}) 
							}
						})
					}
					// uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('请检查表单内容')
				})
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
		// background-image: url("https://wx.rawmex.cn/Public/bg1.png");
		// background-size: 100% 240px;
		// background-position: top;
		// background-repeat: no-repeat;
		width: 100%;
		// height: 240px;
		// left: 0;
		// top: 0;
	}
	.w-bg {
		position: absolute;
		left: 0;
		top: 0;
		height: 240px;
		background: #3f5297;
		width: 100%;
	}
	.tabs-w { 
		.tabs-item {
			width: 50%;
			height: 45px;
			line-height: 45px;
			color: #fff;
			background: #3060b2;
			position: relative;
			border-radius: 8px 8px 0 0;
			z-index: 2;
			&.active {
				height: 50px;
				line-height: 50px;
				color: #111;
				background: #fff; 
				z-index: 10;
				&.left {
					box-shadow: 18px -8px 10px rgba(0,0,0,.1);
					&::before {
						display: block;
					}
				}
				&.right {
					box-shadow: -18px -8px 10px rgba(0,0,0,.1);
					&::before {
						display: block;
					}
				}
			}
			&.left::before {
				right: -19px;
				border-left: 0;
				border-right: 20px solid transparent;
			}
			&.right::before {  
				left: -19px;
				border-right: 0;
				border-left: 20px solid transparent;
			}
			&::before {
				content: '';
				display: none;
				position: absolute;
				bottom: 0; 
				height: 0;
				width: 0; 
				border-top: 0;
				border-bottom: 47px solid #fff;
				z-index:10; 
				
				
			} 
			
		}
	}
	.main {
		position: relative;
		z-index: 1;
		box-sizing: border-box;
	}
	.form-w {
		box-sizing: border-box;
		border-radius: 10px;
		// overflow: hidden;
		.form-content {
			background-color: #fff;
		}
	}
</style>
