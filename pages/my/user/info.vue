<template>
	<view class="u-p-20 u-p-l-40 u-p-r-40">
		<u--form
			labelPosition="left"
			:model="model"
			ref="userform"
			labelWidth="80"
			>
			<u-form-item
				label="您的撮合员"
				v-if="myCpy.hasOwnProperty('Broker')"
			>
				<view class="u-flex u-flex-items-center ">
					<text>{{myCpy.Broker.contact}} ({{myCpy.Broker.mobile}})</text>
					<i @click="handleTimesBtn" class="text-primary u-m-l-10 custom-icon-tims custom-icon u-font-28"></i>
				</view>
			</u-form-item>
			<u-form-item
				label="用户类型"
				@click="showActions"
				ref="item1"
			>	
				<view>
					<template v-if="!myCpy.hasOwnProperty('state')">
						<u--input
							v-model="userType"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择用户类型"
							border="none"
						></u--input>
					</template>
					<template v-else-if="myCpy.state == 1">
						{{userType + '（审核成功）'}}
					</template>
					<template v-else-if="myCpy.state == 0">
						{{userType + '（审核中）'}}
					</template>
				</view>
				
				<view slot="right">
					<u-icon
						 v-if="myCpy.state != 1"
						name="arrow-right"
					></u-icon>
				</view>
				
				
				
			</u-form-item>
			<u-action-sheet
				:show="showUserType"
				:actions="userActions"
				title="请选择用户类型"
				@close="showUserType = false"
				@select="userTypeSelect"
			>
			</u-action-sheet>
			
			<template v-if="userType == '个人用户'">
				<u-form-item
					label="姓名"
					prop="userInfo.name"
					ref="userInfo_name"
					required
				>
					<u--input
						v-model="model.userInfo.name"
						:disabled="myCpy.state == 1"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="邮编"
					prop="userInfo.zip"
					ref="userInfo_zip"
				>
					<u--input
						v-model="model.userInfo.zip"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="邮箱"
					prop="userInfo.email"
					ref="userInfo_email"
				>
					<u--input
						v-model="model.userInfo.email"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="联系手机"
					prop="userInfo.mobile"
					ref="userInfo_mobile"
				>
					<u--input
						v-model="model.userInfo.mobile"
						disabled
						disabledColor="#f8f8f8"
					></u--input>
				</u-form-item>
				<u-form-item
					label="展示手机"
				>
					<u-checkbox-group
						v-model="checkbox_show_mobile1"
						@change="checkboxChange1">
						<view style="width: 100%;">
							<u-checkbox name="show" label="联系手机在前台完整展示"></u-checkbox>
						</view>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item
					label="所在地"
					prop="userInfo.regional"
					ref="userInfo_regional"
				>
					<uni-data-picker 
						placeholder="所在地" 
						popup-title="请选择所在地区" 
						:localdata="addressArea" 
						v-model="model.userInfo.regional"
						@change="handleValAreaUser"
					></uni-data-picker>
				</u-form-item>
				<u-form-item
					label="详细地址"
					prop="userInfo.address"
					ref="userInfo_address"
				>
					<u--textarea
						v-model="model.userInfo.address" 
						placeholder="详细地址" 
						height="90"
					></u--textarea>
				</u-form-item>
				<u-form-item
					label="身份证"
					prop="userInfo.credit_code"
					ref="userInfo_credit_code"
					required
				>
					<u--input
						v-model="model.userInfo.credit_code"
						:disabled="myCpy.state == 1"
						clearable
					></u--input>
				</u-form-item>
			</template>
			<template v-else-if="userType == '企业用户'">
				<u-form-item
					label="名称"
					prop="cpyInfo.name"
					ref="cpyInfo_name"
					required
				>
					<u--input
						v-model="model.cpyInfo.name"
						clearable
						:disabled="myCpy.state == 1"
					></u--input>
				</u-form-item>
				<u-form-item
					label="联系人"
					prop="cpyInfo.contact"
					ref="cpyInfo_contact"
					required
				>
					<u--input
						v-model="model.cpyInfo.contact"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="电话"
					prop="cpyInfo.tel"
					ref="cpyInfo_tel"
				>
					<u--input
						v-model="model.cpyInfo.tel"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="传真"
					prop="cpyInfo.fax"
					ref="cpyInfo_fax"
				>
					<u--input
						v-model="model.cpyInfo.fax"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="邮编"
					prop="cpyInfo.zip"
					ref="cpyInfo_zip"
				>
					<u--input
						v-model="model.cpyInfo.zip"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="邮箱"
					prop="cpyInfo.email"
					ref="cpyInfo_email"
				>
					<u--input
						v-model="model.cpyInfo.email"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="联系手机"
					prop="cpyInfo.mobile"
					ref="cpyInfo_mobile"
				>
					<u--input
						v-model="model.cpyInfo.mobile"
						disabled
						disabledColor="#f8f8f8"
					></u--input>
				</u-form-item>
				<u-form-item
					label="展示手机"
					
				>
					<u-checkbox-group
					    v-model="checkbox_show_mobile2"
						@change="checkboxChange2">
						<view style="width: 100%;">
							<u-checkbox name="show" label="联系手机在前台完整展示"></u-checkbox>
						</view>
						
					</u-checkbox-group>
				</u-form-item>
				<u-form-item
					label="所在地"
					prop="cpyInfo.regional"
					ref="cpyInfo_regional"
				>
					<uni-data-picker 
						placeholder="所在地" 
						popup-title="请选择所在地区" 
						:localdata="addressArea" 
						v-model="model.cpyInfo.regional"
						@change="handleValAreaCpy"
					></uni-data-picker>
				</u-form-item>
				<u-form-item
					label="详细地址"
					prop="cpyInfo.address"
					ref="cpyInfo_address"
				>
					<u--textarea
						v-model="model.cpyInfo.address" 
						placeholder="详细地址" 
						height="90"
					></u--textarea>
				</u-form-item>
				<u-form-item
					label="信用代码"
					prop="cpyInfo.credit_code"
					ref="cpyInfo_credit_code"
					required
				>
					<u--input
						v-model="model.cpyInfo.credit_code"
						placeholder="统一社会信用代码"
						:disabled="myCpy.state == 1"
						clearable
					></u--input>
				</u-form-item>
				<u-form-item
					label="营业执照"
					prop="cpyInfo.img"
					ref="cpyInfo_img"
				>
					<u-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						:maxCount="1"
					></u-upload>
				</u-form-item>
			</template>
			
			
		</u--form>
		<view class="u-p-t-20 u-m-b-40">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				userType: '个人用户',
				showUserType: false,
				userActions: [{
						name: '个人用户',
						type: 'C'
					},
					{
						name: '企业用户',
						type: 'B'
					},
				],
				checkbox_show_mobile1: ['show'],
				checkbox_show_mobile2: ['show'],
				model: {
					userInfo: {
						type: 'C',
						name: '',
						zip: '',
						email: '',
						mobile: '',
						mobile_show: '1',
						address: '',
						credit_code: '',
						regional: '',
					},
					cpyInfo: {
						type: 'B',
						name: '',
						contact: '',
						tel: '',
						fax: '',
						zip: '',
						email: '',
						mobile: '',
						mobile_show: '1',
						regional: '',
						address: '',
						credit_code: '',
						pic1: '',
						pic1_base64: '',
						pic1_name: ''
					}
				},
				fileList1: [],
			}
		},
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy,
				addressArea: state => state.user.addressArea
			}),
			rules() {
				if(this.userType == '个人用户') {
					return {
						'userInfo.name': {
							type: 'string',
							required: true,
							message: '请填写姓名',
							trigger: ['blur', 'change']
						},
						'userInfo.credit_code': {
							type: 'string',
							validator: (rule, value, callback) => {
								return uni.$u.test.idCard(value)
							},
							message: '请填写正确的身份证',
							trigger: ['blur', 'change']
						},
					}
				}
				else {
					return {
						'cpyInfo.name': {
							type: 'string',
							required: true,
							message: '请填写名称',
							trigger: ['blur', 'change']
						},
						'cpyInfo.contact': {
							type: 'string',
							required: true,
							message: '请填写联系人',
							trigger: ['blur', 'change']
						},
						'cpyInfo.credit_code': {
							type: 'string',
							validator: (rule, value, callback) => {
								return uni.$u.test.enOrNum(value)
							},
							message: '请填写正确的统一社会信用代码',
							trigger: ['blur', 'change']
						},
					}
				}
						
			}
		},
		async onLoad() {
			this.getAddressArea()
			await this.myCompany()
		},
		onReady() {
			this.$refs.userform.setRules(this.rules)
		},
		watch: {
			['model.userInfo.mobile_show'](n) {
				if(n == '1') {
					this.checkbox_show_mobile1 = ['show']
				}else {
					this.checkbox_show_mobile1 = []
				}
			},
			['model.cpyInfo.mobile_show'](n) {
				console.log(n)
				if(n == '1') {
					this.checkbox_show_mobile2 = ['show']
				}else {
					this.checkbox_show_mobile2 = []
				}
			},
			myCpy: {
				deep: true,
				handler(n) {
					console.log(n)
					if(n.type == 'B') {
						this.userType = '企业用户'
						this.model.cpyInfo = uni.$u.deepClone(n)
					}
					else if(n.type == 'C') {
						this.userType = '个人用户'
						this.model.userInfo = uni.$u.deepClone(n)
					}
				}
			},
			['model.cpyInfo.pic1'](n) {
				if(n) {
					this.fileList1 = [{
						url: n
					}]
				}
			}
		},
		methods: {
			...mapMutations({
				setMyCpy: 'user/setMyCpy',
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				myCompany: 'user/myCompany',
				getAddressArea: 'user/getAddressArea'
			}),
			handleValAreaUser() {
				// this.$refs.userform.validateField('userInfo.regional')
			},
			handleValAreaCpy() {
				// this.$refs.userform.validateField('cpyInfo.regional')
			},
			userTypeSelect(e) {
				this.userType = e.name;
				this.$refs.userform.setRules(this.rules)
				// this.$refs.form1.validateField('userInfo.sex')
			},
			showActions() {
				if(this.myCpy.state == 1) return
				this.showUserType = true; 
				uni.hideKeyboard()
			},
			checkboxChange1(v) {
				this.model.userInfo.mobile_show = v[0] ? '1': '0'
			},
			checkboxChange2(v) {
				this.model.cpyInfo.mobile_show = v[0] ? '1': '0'
			},
			async submit() {
				
				this.$refs.userform.validate().then(async res => {
					let type = this.userType
					const data = this.model[this.userType == '个人用户'? 'userInfo' : 'cpyInfo']
					const list = await this.$api.editCompany({
						...data,
					})
					if(list.code == 1) {
						this.setMyCpy(data)
						uni.showToast({
							title: list.msg
						})
					}
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('校验失败')
				})
			},
			handleTimesBtn() {
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login: this.myCpy.Broker.login,
						content: ``
					}
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
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
				this.model.cpyInfo.pic1_base64 = base64
				this.model.cpyInfo.pic1_name = event.file.thumb.split('//tmp/')[1]
				
			},
			
			async getImageBase64_readFile(tempFilePath) {
				  return await new Promise(resolve => {
						//获取全局唯一的文件管理器 
						uni.getFileSystemManager().readFile({ //读取本地文件内容
						  filePath: tempFilePath, // 文件路径
						  encoding: 'base64', // 返回格式
						  success: ({
							data
						  }) => {
							// return resolve('data:image/png;base64,' + data);
							return resolve( data);
						  }
						});
				  });
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		
	}
</style>
