<template>
	<view class="w u-p-20">
		<view class="bg" :style="{
			backgroundColor: textObj.themeColor
		}"></view>
		<u-navbar
			bgColor="transparent"
			:fixed="false"
		>
			<view slot="left">
				<view @click="handleGoto('/pages/my/money/index')" class="text-white u-flex u-flex-items-center">
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
				{{textObj.title}}
			</view>
			<view class="text-white u-font-28 u-p-b-30">
				{{textObj.sub}}
			</view>
			<view class="form-w u-p-20 u-p-l-40 u-p-r-40">
				<u--form
					labelPosition="top"
					:model="model"
					:rules="rules"
					ref="form"
					labelWidth="100%"
					borderBottom
					:labelStyle="{fontSize: '28rpx', paddingBottom: '10rpx'}"
				>
					<u-form-item
						label="资金账户" 
						required
					>
						<view @click="showPicker">
							<u--input
								:value="sino_acc"
								readonly
								suffixIcon="arrow-down"
								suffixIconStyle="color: #bbb" 
							></u--input>
						</view>
						
					</u-form-item>
					
					<u-picker 
						:show="show_acc" 
						ref="uPicker" 
						closeOnClickOverlay
						:columns="columns_acc" 
						@confirm="confirm_acc" 
						@close="show_acc = false" 
						@cancel="show_acc = false" 
						></u-picker>
					
					<u-form-item
						label="充值类型"
						@click="showActions"
						ref="item1"
						:borderBottom="false"
						v-if="cz == 1"
					>
						<u-radio-group 
						    v-model="cztype"
						    placement="row">
							<u-radio label="直接充值" name="直接充值"></u-radio>
							<view class="u-p-l-20"></view>
							<u-radio label="财务充值" name="财务充值"></u-radio>
						</u-radio-group>
					</u-form-item>
					<template v-if="cz != 2">
						<u-form-item
							:label="`选择${cz == 1? '充值' : '提现'}银行卡`"
							prop="bind_id"
							ref="form_bind_id"
							required
						>
							<view @click="handleSelectBankcard">
								<u--input
									v-model="bank.name"
									placeholder="点击选择银行卡"
									suffixIcon="arrow-down"
									suffixIconStyle="color: #bbb"
									readonly
								></u--input>
							</view>
							
						</u-form-item>
					</template>
					<view class="u-p-t-20 u-p-b-20" v-if="cz == 2">
						<view class="u-flex u-flex-items-center u-m-b-10">
							<text class="text-light u-font-28">转出资金账户：</text>
							<u--text text="1100000565"></u--text>
						</view>
						<view class="u-flex u-flex-items-center u-m-b-10">
							<text class="text-light u-font-28">可用余额：</text>
							<u--text mode="price" text="123.5"></u--text>
						</view>
						<view class="u-flex u-flex-items-center u-m-b-10">
							<text class="text-light u-font-28">可提余额：</text>
							<u--text mode="price" text="12.5"></u--text>
						</view>
						<view class="u-flex u-flex-items-center u-m-b-10">
							<text class="text-light u-font-28">转入资金账户：</text>
							<u--text text="1100000566"></u--text>
						</view>
					</view>
					
					<u-form-item
						:label="`${textObj.label}金额`"
						prop="money"
						ref="form_money"
						required
					>
						<u--input
							v-model="model.money"
							placeholder="请输入金额"
							clearable
						></u--input>
					</u-form-item>
					
					<view class="u-p-t-20 u-p-b-20">
						<template v-if="cz != 2">
							<view class="u-flex u-flex-items-center u-m-b-10">
								<text class="text-light u-font-28">手续费：</text>
								<u--text mode="price" :text="sxf"></u--text>
							</view>
							<view class="u-flex u-flex-items-center">
								<text class="text-light u-font-28">到账金额：</text>
								<u--text mode="price" :text="money">></u--text>
							</view>
						</template>
						<template v-else>
							<text class="text-error u-font-28">当天可提，转账金额需要小于等于可提余额 ??</text>
						</template>
					</view>
					
					<u-form-item
						v-if="cz != 1"
						:label="`备注`"
						prop="bz"
						ref="form_bz"
					>
						<u--input
							v-model="model.bz"
							placeholder="备注"
							clearable
						></u--input>
					</u-form-item>
					
				</u--form>
				<view class="u-p-t-50 u-m-b-40">
					<u-button type="primary" :customStyle="{
						backgroundColor: textObj.themeColor,
						borderColor: textObj.themeColor,
					}" @click="submit">提交</u-button>
				</view>
			</view>
		</view>
		<u-popup 
			:show="bankPopup" 
			@close="bankClose" 
			@open="bankOpen"
			mode="bottom"
		>
			<view class="popup-wrapper">
				<view class="wrapper-title u-p-r-40 text-light u-flex u-flex-items-center u-flex-between">
					<text></text>
					<text>选择银行卡</text>
					<i @click="refreshList" class="custom-icon-refresh custom-icon"></i>
				</view>
				<view class="wrapper-main">
					<u-list
						height="100%"
						enableBackToTop
						@scrolltolower="scrolltolower"
						:preLoadingScreen="100"
					>
						<u-list-item
							v-for="(item, index) in indexList"
							:key="item.id"
						>
							<view class="u-p-10">
								<BankCard
									:bank_class="item.bank_class"
									:bank_name="item.bank_name"
									:bank_sub="item.bank_accname"
									:bank_no="item.bank_accno"
									:origin="item"
									@detail="handleClick"
								></BankCard> 
							</view>
							
						</u-list-item>
						
						<template name="dataStatus">
							<template v-if="indexList.length == 0">
								<template v-if="loadstatus == 'loading'">
									<view class="u-p-80">
										<u-loading-icon></u-loading-icon>
									</view>
								</template>
								<template v-else>
									<u-empty
										mode="data"
										:icon="typeConfig.white.empty"
									>
									</u-empty>
								</template>
								
							</template>
							<!-- <template v-else>
								<u-loadmore
									:status="loadstatus"
								/>
							</template> -->
						</template>
						
					</u-list>
				</view>
				<view class="wrapper-footer">
					<view @click="handleGoto('/pages/my/money/card_add')" class="footer-a u-flex u-flex-items-center u-flex-center">
						<u-icon name="plus-circle-fill" color="#f00"></u-icon>
						<text class="u-p-l-10 text-error">使用新银行卡充值</text>
					</view>
				</view>
			</view>
		</u-popup>
		<u-modal :show="codeInputShow" negativeTop="220" title="输入手机验证码"
			confirmText="返回资金中心"
			closeOnClickOverlay
			confirmColor="#999"
			@confirm="handleBack"
			@close="codeInputShow = false"
		 >
			<view class="slot-content u-p-t-40 u-p-b-40">
				<u-code-input
					v-model="code" 
					mode="line" 
					:maxlength="6" 
					:focus="focus"
					hairline
					@finish="handleSumbitCode"
				></u-code-input>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import BankCard from '@/pages/my/components/BankCard/BankCard.vue'
	export default {
		data() {
			return {
				show_acc: false,
				index_acc: 0,
				cz: 1,
				cztype: '直接充值',
				bankPopup: false,
				codeInputShow: false,
				focus: false,
				code: '',
				bank: {
					id: '',
					name: ''
				},
				model: { 
					money: '',
					bind_id: '',
					bz: ''
				},
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				bankLoading: false
			}
		},
		components: {
			BankCard
		},
		async onLoad(options) {
			if(options.hasOwnProperty('cz')) {
				this.cz = options.cz
			}
			if(!this.sinoFund || this.sinoFund.length == 0) {
				await this.getSinoFundAccount()
			}
			this.bankLoading = true;
			await this.getBankCard()
			this.bankLoading = false;
		},
		watch: {
			index_acc: {
				// immediate: true,
				async handler(n) {
					this.bankLoading = true;
					await this.getBankCard()
					this.bankLoading = false;
				}
			}
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				sinoFund: state => state.sinopay.sinoFund,
				sinoFundLoading: state => state.sinopay.sinoFundLoading,
			}),
			columns_acc() {
				if(!this.sinoFund || this.sinoFund.length == 0) return [];
				return [
					this.sinoFund.map(ele => {
						let label = '';
						if(ele.type == 'S') label = '【收】'
						else label = '【付】'
						return `${label}${ele.user_fundaccno}-${ele.name}`
					})
				]
			},
			sino_acc() {
				if(!this.sinoFund || this.sinoFund.length == 0) return '';
				let item = this.sinoFund[this.index_acc]
				let label = ''; 
				if(item.type == 'S') label = '【收】'
				else label = '【付】'
				return `${label}${item.user_fundaccno}-${item.name}`
			},
			rules() {
				if(this.cz != '2') {
					return {
						'money': [{
							type: 'number',
							required: true,
							message: '请填写金额数值',
							trigger: ['blur', 'change']
						},{
							validator: (rule, value, callback) => {
								return value > 0
							},
							message: '金额数值必须大于0'
						}],
						'bind_id': {
							type: 'string',
							required: true,
							message: '请选择银行卡',
							trigger: ['blur', 'change']
						}
					}
				}else {
					return {
						'money': [{
							type: 'number',
							required: true,
							message: '请填写金额数值',
							trigger: ['blur', 'change']
						},{
							validator: (rule, value, callback) => {
								return value > 0
							},
							message: '金额数值必须大于0'
						}]
					}
				}
				
			},
			money() {
				if(!this.model.money) return 0
				return this.model.money - this.sxf
			},
			sxf() {
				if(!this.model.money) return 0
				return this.model.money * 0
			},
			textObj() {
				if(this.cz == 1) {
					return {
						title: '我要充值',
						label: '充值',
						themeColor: '#d34c3c',
						sub: ''
					}
				}
				else if(this.cz == 0){
					return {
						title: '提现申请',
						label: '提现',
						themeColor: '#408df4',
						sub: '提现提前绑定好提现银行卡，且有可提余额。'
					}
				}
				else if(this.cz == 2){
					return {
						title: '转账到同名账户',
						label: '转账',
						themeColor: '#408df4',
						sub: ''
					}
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getSinoFundAccount: 'sinopay/getSinoFundAccount'
			}),
			showPicker() {
				if(this.columns_acc.length == 0) return;
				this.show_acc = true
			},
			confirm_acc(e) { 
				this.show_acc = false
				this.index_acc = e.indexs[0]
			},
			refreshList() {
				if(this.cz == '2') return
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			
			scrolltolower() {
				// this.getMoreData()
			},
			async getBankCard() {
				if( this.cz == '2') return
				// this.loadstatus = 'loading'
				const res = await this.$api.sino_fund_account_list_bind({
					params: {
						account_id: this.sinoFund[this.index_acc].id
					}
				})
				if(res.code == 1) {
					this.indexList = res.list
					 
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			bankClose() {
				this.bankPopup = false
			},
			bankOpen() {
				
			},
			submit() {
				
				this.$refs.form.validate().then(async res => {
					uni.showLoading()
					const r = await this.$api.czApply({...this.model})
					console.log(r)
					if(r.code == 1) {
						if(this.cz != '2') {
							this.codeInputShow = true
							uni.showToast({
								title: r.msg,
								icon: 'none'
							})
							this.$nextTick(() => {
								this.focus = true
							})
						}else {
							uni.showToast({
								title: r.msg,
								icon: 'none'
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/my/money/index'
								})
							}, 1000)
						}
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			async handleGetCode() {
				if(this.btnDisabled) return;
				this.$refs.form.validateField('base.phone', async (errRes) => {
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
			handleSelectBankcard() {
				
				this.bankPopup = true
			},
			handleClick(bank) {
				this.bank.name = bank.name
				this.model.bind_id = '321321'
				this.bankClose()
			},
			handleBack() {
				uni.redirectTo({
					url: '/pages/my/money/index'
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
							url: '/pages/my/money/index'
						})
					}, 1000)
				}
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
	.popup-wrapper {
		width: 100%;
		.wrapper-title {
			height: 90rpx;
		}
		.wrapper-main {
			border-top: 1rpx solid #f8f8f8;
			border-bottom: 1rpx solid #f8f8f8;
			height: 650rpx;
			width: 100%;
			background-color: $page-bg2;
		}
		.wrapper-footer {
			height: 90rpx;
			.footer-a {
				width: 100%;
				height: 100%;
			}
		}
	}
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		height: 240px;
		width: 100%;
		
	}
	.w {
		box-sizing: border-box;
		// position: absolute;
		// z-index: 1;
		min-height: 100vh;
		// background-image: url("http://dingxiang.netsun.testwebsite.cn/mShop/img/bg1.png");
		// background-size: 100% 240px;
		// background-position: top;
		// background-repeat: no-repeat;
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
