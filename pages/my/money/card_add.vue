<template>
	<view class="u-p-20">
		
		<u--form
			:model="model"
			:rules="rules"
			ref="from"
			labelWidth="100%"
			labelPosition="top"
			
		>
			<u-form-item
				label="请确保输入本人（或本企）的银行卡号"
				prop="card"
				ref="card"
			>
				<view>
					<u--input
						v-model="model.card"
						clearable
						placeholder="请输入银行卡号"
						border="bottom"
						@change="$u.debounce(handleBankChange, 2500)"
					></u--input>
					<view class="u-p-t-20 u-flex u-flex-items-center "
						:class="{
							'text-error': isbankInfo.status == 'error',
							'text-light': isbankInfo.status != 'error'
						}"
					>
						<image :src="isbankInfo.logo" mode="" style="width: 25px; height: 25px;"></image>
						<text class="u-p-l-20" v-if="!bankLoading">{{isbankInfo.name}}</text>
						<u-loading-icon mode="semicircle" size="20" v-else></u-loading-icon>
					</view>
				</view>
				
			</u-form-item>
			<u-form-item
				label="持卡人或公司户名"
				prop="cardname"
				ref="cardname"
			>
				<u--input
					v-model="model.cardname"
					border="bottom"
					placeholder="请输入持卡人或公司户名"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="身份证或信用代码"
				prop="cardid"
				ref="cardid"
			>
				<u--input
					v-model="model.cardid"
					border="bottom"
					placeholder="请输入身份证或信用代码"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="法人姓名"
				prop="name2"
				ref="name2"
			>
				<u--input
					v-model="model.name2"
					border="bottom"
					placeholder="请输入法人姓名"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="手机号"
				prop="cardphone"
				ref="cardphone"
			>
				<u--input
					v-model="model.cardphone"
					border="bottom"
					placeholder="请输入该卡在银行预留的手机号"
					clearable
				></u--input>
			</u-form-item>
			
		</u--form>
		
		<view class="u-p-t-20 u-m-b-40">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
		<u-modal :show="codeInputShow" negativeTop="220" :title="textObj.title"
			confirmText="返回账户银行卡列表"
			confirmColor="#999"
			@confirm="handleBack"
		 >
			<view class="slot-content u-p-t-40">
				<template v-if="type == 'c'">
					<u-code-input
						v-model="code" 
						mode="line" 
						:maxlength="6" 
						:focus="codeInputShow" 
						hairline
						@finish="handleSumbitCode"
					></u-code-input>
					<view class="u-flex u-flex-center u-flex-items-center u-p-20">
						<u-code
							ref="uCode"
							@change="codeChange"
							change-text="XS后重新获取"
							@start="disabled = true"
							@end="disabled = false"
						></u-code>
						<text
							@tap="getCode"
							:text="tips"
							class="u-page__code-text"
						>{{tips}}</text>
					</view>
					
				</template>
				<template v-else>
					<u--input
						v-model="model.cardphone"
						border="bottom"
						:placeholder="textObj.sub"
						clearable
					></u--input>
				</template>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				disabled: true,
				codeInputShow: false,
				type: 'c',
				code: '',
				model: {
					card: '',
					cardname: '',
					cardid: '',
					name2: '',
					cardphone: ''
				},
				bankLoading: false,
				isbankInfo: {
					logo: 'https://65180.m.toocle.com/Public/nocard.png',
					name: '',
					status: 'error'
				},
				rules: {
					card: {
						type: 'string',
						required: true,
						message: '请填写银行卡号',
						trigger: ['blur', 'change']
					},
					npasswd: [{
							type: 'string',
							required: true,
							message: '请填写新密码',
							trigger: ['blur', 'change']
						},
						{
							type: 'string',
							message: '新密码格式不正确',
							trigger: ['blur'],
							validator: (rule, value, callback) => {
								const reg1 = new RegExp(/[a-zA-Z]/)
								const reg2 = new RegExp(/[\d]/)
								return reg1.test(value) && reg2.test(value) && value.length >= 5 ;
							},
						},
					],
					cpasswd: [{
							type: 'string',
							required: true,
							message: '请填写确认密码',
							trigger: ['blur', 'change']
						},{
							type: 'string',
							message: '确认密码与新密码不一致',
							trigger: ['blur', 'change'],
							validator: (rule, value, callback) => {
								return this.model.npasswd == value;
							},
						},
					]
				}
			}
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
		},
		computed: {
			textObj() {
				if(this.type == 'c') {
					return {
						title: '个人验证',
						sub: '输入短信验证码'
					}
				}else {
					return {
						title: '企业验证',
						sub: '输入鉴权序号'
					}
				}
			},
			
		},
		methods: {
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
			async handleBankChange() {
				// console.log(this.model.card)
				this.bankLoading = true;
				const res = await this.$api.searchBank({params: {card: this.model.card}});
				this.bankLoading = false;
				if(res.code == 1) {
					this.isbankInfo.name = res.data.name
					this.isbankInfo.logo = res.data.logo
					this.isbankInfo.status = 'success'
				}else {
					this.isbankInfo.status = 'error'
					this.isbankInfo.name = res.msg
					this.isbankInfo.logo = 'https://65180.m.toocle.com/Public/nocard.png'
				}
			},
			handleBack() {
				uni.redirectTo({
					url: '/pages/my/money/bank_card'
				})
			},
			async handleSumbitCode() {
				uni.showLoading()
				const res = await this.$api.valPhoneCode();
				if(res.code == 1) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/my/money/bank_card'
						})
					}, 1000)
				}
			},
			handleCloseModal() {
				
			},
			submit() {
				
				this.$refs.from.validate().then(async res => {
					const r = await this.$api.bindBankCard({...this.model, ...this.isbankInfo})
					console.log(r)
					if(r.code == 1) {
						this.codeInputShow = true
						
						uni.showToast({
							title: r.msg,
							icon: 'none'
						})
						this.$nextTick(() => {
							this.focus = true
							this.$refs.uCode.start();
						})
						
						// setTimeout(() => {
						// 	uni.navigateBack()
						// }, 800)
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-page {
		&__code-text {
			color: $u-primary;
			font-size: 15px;
			padding-top: 10px;
		}
	}
</style>
