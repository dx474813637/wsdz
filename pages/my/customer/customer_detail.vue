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
					:value="origin.login"
					border="none"
					disabledColor="#fff"
					color="#666"
					disabled
				></u--input>
			</u-form-item>
			
			<u-form-item
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
			</u-form-item>
			<u-form-item
				label="客户名称"
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
				label="手机"
				prop="mobile"
				ref="mobile"
			>
				<u--input
					v-model="customData.mobile"
					clearable
				></u--input>
			</u-form-item>
			
			
		</u--form>
		<view class="u-p-t-30">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customData: {
					id: '',
					// login: '',
					// pwd: '',
					// status: '',
					name: '',
					contact: '',
					email: '',
					mobile: ''
				},
				origin: {},
				rules: {
					// 'login': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写账号',
					// 	trigger: ['blur', 'change']
					// },
				}
			}
		},
		onReady() {
			// this.$refs.form.setRules(this.rules)
		},
		onLoad(options) {
			const custom = JSON.parse(decodeURIComponent(options.data));
			let {
				to_contact,
				to_email,
				to_name,
				to_mobile,
				to_id
			} = custom
			this.origin = custom
			// this.customData.login = login
			this.customData.contact = to_contact
			this.customData.email = to_email
			this.customData.name = to_name
			this.customData.mobile = to_mobile
			// this.customData.pwd = c_pwd
			this.customData.id = to_id
			// this.customData.status = c_status
		},
		methods: {
			async submit() {
				// this.$refs.form.validate().then(async res => {
				// 	console.log('submit 客户详情')
					uni.showLoading()
					const r = await this.$api.editCustomer(this.customData)
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
				// 	uni.$u.toast('校验失败')
				// })
			}
		}
	}
</script>

<style>

</style>
