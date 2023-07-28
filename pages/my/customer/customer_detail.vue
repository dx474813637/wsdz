<template>
	<view class="u-p-20">
		<u--form
			labelPosition="left"
			:model="customData"
			ref="form"
			labelWidth="80"
		>
			<u-form-item
				label="账号"
			>	
			
				<u--input
					:value="`${origin.login}`"
					border="none"
					disabledColor="#fff"
					color="#666"
					disabled
				></u--input>
			</u-form-item>
			
			<!-- <u-form-item
				label="初始密码"
				v-if="origin.to_state != 1"
			>
				<u--input
					:value="origin.to_passwd"
					border="none"
					disabledColor="#fff"
					color="#666"
					disabled
				></u--input>
			</u-form-item>
			<u-form-item
				label="状态"
			>
				<u--input
					:value="origin.to_state == 1 ?'已使用' : '未使用'"
					border="none"
					disabledColor="#fff"
					color="#007aff"
					disabled
				></u--input>
			</u-form-item> -->
			<u-form-item
				label="绑定手机"
			>
				<u--input
					:value="origin.mobile || '未绑定'"
					border="none"
					disabledColor="#fff"
					color="#007aff"
					disabled
				></u--input>
			</u-form-item>
			<u-form-item
				label="审核状态"
				v-if="origin.Company"
			>
				<u--input
					:value="origin.Company.state | state2Str"
					border="none"
					disabledColor="#fff"
					color="#007aff"
					disabled
				></u--input>
			</u-form-item>
			<u-form-item
				label="企业全称"
				prop="name"
				ref="name"
			>
				<u--input
					v-model="customData.name"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="联系人"
				prop="contact"
				ref="contact"
			>
				<u--input
					v-model="customData.contact"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="手机"
				prop="mobile"
				ref="mobile"
			>
				<u--input
					v-model="customData.mobile"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="电话"
				prop="tel"
				ref="tel"
			>
				<u--input
					v-model="customData.tel"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="邮箱"
				prop="email"
				ref="email"
			>
				<u--input
					v-model="customData.email"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="业务范围"
				prop="intro"
				ref="intro"
			>
				<u--textarea
					v-model="customData.intro" 
					placeholder="业务范围" 
					height="90"
				></u--textarea>
			</u-form-item>
			
			<u-form-item
				label="所在地"
				prop="regional"
				ref="regional"
			>
				<uni-data-picker 
					placeholder="所在地" 
					popup-title="请选择所在地区" 
					:localdata="addressArea" 
					v-model="customData.regional"
				></uni-data-picker>
			</u-form-item>
			<u-form-item
				label="详细地址"
				prop="address"
				ref="address"
			>
				<u--input
					v-model="customData.address"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="统一社会信用代码"
				prop="credit_code"
				ref="credit_code"
				v-if="customData.credit_code"
			>
				<u-input
					v-model="customData.credit_code"
					clearable
					readonly
				>
					<!-- <template slot="suffix">
						<template slot="suffix">
							<u-button
								@tap="getXYCode"
								type="success"
								size="mini"
							>获取代码</u-button>
						</template>
					</template> -->
				</u-input>
			</u-form-item>
			
			<u-form-item
				label="营业执照"
				prop="pic1"
				ref="pic1"
				v-if="customData.pic1"
			>
				<u-image width="150px" height="150px" :src="customData.pic1" radius="8"></u-image>
				<!-- <u-upload
					:fileList="fileList1"
					@afterRead="afterRead"
					@delete="deletePic"
					name="1"
					:maxCount="1"
				></u-upload> -->
			</u-form-item>
			<u-form-item
				label="审核激活"
				v-if="origin.Company"
			>
				<u-switch v-model="shenhe" v-if="origin.mobile" ></u-switch>
				<view class="text-error" v-else>
					审核操作需客户账号绑定手机后进行
				</view>
			</u-form-item>
		</u--form>
		<view class="u-p-t-30">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				customData: {
					id: '',
					name: '',
					contact: '',
					email: '',
					mobile: '',
					tel: '',
					regional: '',
					address: '',
					credit_code: '',
					pic1: '',
					pic1_base64: '',
					pic1_name: '',
					audit: 0,
					intro: ''
				},
				fileList1: [],
				origin: {},
				rules: {
					name: {
						min: 5,
						type: 'string',
						message: '名称不得少于5个字',
						trigger: ['change']
					},
					contact: {
						require: true,
						type: 'string',
						message: '请填写联系人',
						trigger: ['change']
					},
					mobile: {
						type: 'number',
						validator: (rule, value, callback) => {
							return uni.$u.test.mobile(value)
						},
						message: '请填写正确的手机号码',
						trigger: ['change']
					},
					// credit_code: {
					// 	type: 'string',
					// 	validator: (rule, value, callback) => {
					// 		if(!value) return true
					// 		return uni.$u.test.enOrNum(value)
					// 	},
					// 	message: '请填写正确的统一社会信用代码',
					// 	trigger: ['blur', 'change']
					// },
					email: {
						type: 'string',
						validator: (rule, value, callback) => {
							if(!value) return true
							return uni.$u.test.email(value)
						},
						message: '请填写正确的邮箱',
						trigger: ['blur', 'change']
					},
				},
				shenhe: false,
				tips: '一键获取代码',
			}
		},
		watch: {
			shenhe(n) {
				this.customData.audit = n ? 1 : 0
			},
			['customData.audit'](n) {
				this.shenhe = n == 1? true : false
			},
			['customData.pic1'](n) {
				if(n) {
					this.fileList1 = [{
						url: n
					}]
				}
			}
		},
		computed: {
			...mapState({
				addressArea: state => state.user.addressArea,
				myCpy: state => state.user.myCpy,
			}),
		},
		onReady() {
			// this.$refs.form.setRules(this.rules)
		},
		filters: {
			state2Str:(v) => {
				if(v == 1) return '已激活'
				else if(v == 0) return '未激活'
				else if(v == 2) return '平台灭活'
				return v
			}
		},
		onLoad(options) {
			
			this.getAddressArea()
			const custom = JSON.parse(decodeURIComponent(options.data));
			console.log(custom)
			this.origin = custom
			this.customData.id = custom.to_id
			if(custom.Company) {
				this.customData.name = custom.Company.name
				this.customData.contact = custom.Company.contact
				this.customData.email = custom.Company.email
				this.customData.mobile = custom.Company.mobile
				this.customData.tel = custom.Company.tel
				this.customData.regional = custom.Company.regional
				this.customData.address = custom.Company.address
				this.customData.credit_code = custom.Company.credit_code
				this.customData.pic1 = custom.Company.pic1
				this.customData.audit = custom.Company.state
				this.customData.intro = custom.Company.intro
			}
			// // this.customData.login = login
			// this.customData.contact = to_contact
			// this.customData.email = to_email
			// this.customData.name = to_name
			// this.customData.mobile = to_mobile
			// // this.customData.pwd = c_pwd
			// this.customData.id = to_id
			// // this.customData.status = c_status
		},
		methods: {
			...mapActions({
				getAddressArea: 'user/getAddressArea',
				getImageBase64_readFile: 'user/getImageBase64_readFile'
			}),
			codeChange(text) {
				this.tips = text;
			},
			async getXYCode() {
				if(!this.customData.name) {
					uni.showToast({
						title: '请先填写企业全称',
						icon: 'none'
					})
					return
				}
			  uni.showLoading()
			  const res = await this.$api.searchCompanyCode({params: {name: this.customData.name}})
			  if(res.code == 1) {
				  this.customData.credit_code = res.list?.credit_code
			  }else {
				  this.customData.credit_code = ""
			  }
			  
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				
				this.customData.pic1 = ''
				this.customData.pic1_base64 = ''
				this.customData.pic1_name = ''
			},
			// 新增图片
			async afterRead(event) {
				console.log(event)
				this.fileList1 = [{
					url:  event.file.thumb,
					status: 'uploading',
					message: '上传中'
				}]
				const base64 = await this.getImageBase64_readFile(event.file.thumb)
				
				this.fileList1 = [{
					url: event.file.thumb,
					status: 'success'
				}]
				this.customData.pic1_base64 = base64
				this.customData.pic1_name = event.file.thumb.split('//tmp/')[1]
				
			},
			async submit() {
				if(this.myCpy.state == '2') {
					uni.showToast({
						title: '当前用户信息被平台灭活',
						icon: 'none'
					})
					return
				}
				// this.$refs.form.validate().then(async res => {
				// 	console.log('submit 客户详情')
					uni.showLoading()
					let paramsObj = {...this.customData}
					let func = ''
					if(this.origin.Company) {
						func = 'shenheCustomer'
					}else {
						func = 'djCustomer'
						paramsObj = {
							...paramsObj,
							audit: '',
						}
					}
					const r = await this.$api[func](paramsObj)
					if(r.code == 1) {
						this.$utils.prePage() && this.$utils.prePage().refreshList();
						uni.showToast({
							title: r.msg,
							icon: 'none'
						})
						
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					}
				// }).catch(errors => {
				// 	uni.$u.toast('请检查表单内容')
				// })
			}
		}
	}
</script>

<style>

</style>
