<template>
	<view class="u-p-20">
		<u--form
			labelPosition="left"
			:model="model"
			:rules="rules"
			ref="userform"
			labelWidth="80"
		>
			<u-form-item
				label="用户类型"
				@click="showActions"
				ref="item1"
			>
				<u--input
					v-model="userType"
					disabled
					disabledColor="#ffffff"
					placeholder="请选择用户类型"
					border="none"
				></u--input>
				<u-icon
					slot="right"
					name="arrow-right"
				></u-icon>
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
					label="所在地"
					prop="userInfo.suozaidi"
					ref="userInfo_suozaidi"
					required
				>
					<uni-data-picker 
						placeholder="所在地" 
						popup-title="请选择所在地区" 
						:localdata="dataTree" 
						v-model="model.userInfo.suozaidi"
					></uni-data-picker>
				</u-form-item>
				<u-form-item
					label="详细地址"
					prop="userInfo.address"
					ref="userInfo_address"
				>
					<u--textarea
						v-model="model.cpyInfo.address" 
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
					label="所在地"
					prop="cpyInfo.suozaidi"
					ref="cpyInfo_suozaidi"
					required
				>
					<uni-data-picker 
						placeholder="所在地" 
						popup-title="请选择所在地区" 
						:localdata="dataTree" 
						v-model="model.cpyInfo.suozaidi"
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
					<!-- <u--input
						v-model="model.cpyInfo.img"
					></u--input> -->
				</u-form-item>
			</template>
			
			
		</u--form>
		<view class="u-p-t-20 u-m-b-40">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userType: '个人用户',
				showUserType: false,
				userActions: [{
						name: '个人用户',
					},
					{
						name: '企业用户'
					},
				],
				model: {
					userInfo: {
						name: 'uView UI',
						zip: '',
						email: '',
						mobile: '',
						address: '',
						credit_code: '',
						regional: '',
						suozaidi: ''
					},
					cpyInfo: {
						name: 'uView UI2',
						contact: '',
						tel: '',
						fax: '',
						zip: '',
						email: '',
						mobile: '',
						address: '',
						credit_code: '',
						regional: '',
						suozaidi: '',
						img: ''
					}
				},
				dataTree: [
					{
						text: "浙江省",
						value: "zj",
						children: [{
							text: "杭州市",
							value: "hz",
							children: [
								{
									text: '西湖区',
									value: 'xh'
								},
								{
									text: '拱墅区',
									value: 'gs'
								},
							]
						},
						{
							text: "宁波市",
							value: "nb"
						}]
					},
					{
						text: "北京市",
						value: "bj",
						children: [{
							text: "朝阳区",
							value: "cy"
						},
						{
							text: "xx区",
							value: "xx"
						}]
					},
					{
						text: "上海市",
						value: "sh",
						children: [{
							text: "闵行区",
							value: "mh"
						},
						{
							text: "浦东区",
							value: "pd"
						}]
					},
				],
				fileList1: [],
			}
		},
		computed: {
			rules() {
				// if(this.userType == '个人用户') {
					return {
						'userInfo.name': {
							type: 'string',
							required: true,
							message: '请填写姓名',
							trigger: ['blur', 'change']
						},
						'userInfo.credit_code': {
							type: 'string',
							required: true,
							message: '请填写身份证',
							trigger: ['blur', 'change']
						},
				// 	}
				// }else if(this.userType == '企业用户') {
				// 	return {
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
							required: true,
							message: '请填写统一社会信用代码',
							trigger: ['blur', 'change']
						},
					}
				// }
			}
		},
		onReady() {
			this.$refs.userform.setRules(this.rules)
		},
		methods: {
			userTypeSelect(e) {
				this.userType = e.name
				this.$refs.userform.setRules(this.rules)
				// this.$refs.form1.validateField('userInfo.sex')
			},
			showActions() {
				this.showUserType = true; 
				uni.hideKeyboard()
			},
			submit() {
				
				this.$refs.userform.validate().then(res => {
					
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log('popupclosed');
			},
			onchange(e) {
				console.log('onchange:', e);
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		
	}
</style>
