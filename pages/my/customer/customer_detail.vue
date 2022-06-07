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
				prop="account"
				ref="account"
			>
				<u--input
					v-model="customData.account"
					border="none"
					disabledColor="#fff"
					color="#666"
					disabled
				></u--input>
			</u-form-item>
			
			<u-form-item
				label="初始密码"
				prop="pwd"
				ref="pwd"
				v-if="customData.status != 1"
			>
				<u--input
					v-model="customData.pwd"
					border="none"
					disabledColor="#fff"
					color="#666"
					disabled
				></u--input>
			</u-form-item>
			<u-form-item
				label="状态"
				prop="status"
				ref="status"
			>
				<u--input
					:value="customData.status == 1 ?'已使用' : '未使用'"
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
					:value="customData.name"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="联系人"
				prop="contact"
				ref="contact"
			>
				<u--input
					:value="customData.contact"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="邮箱"
				prop="email"
				ref="email"
			>
				<u--input
					:value="customData.email"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="手机"
				prop="phone"
				ref="phone"
			>
				<u--input
					:value="customData.phone"
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
					account: '',
					pwd: '',
					status: '',
					name: '',
					contact: '',
					email: '',
					phone: ''
				},
				rules: {
					'account': {
						type: 'string',
						required: true,
						message: '请填写账号',
						trigger: ['blur', 'change']
					},
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad(options) {
			const custom = JSON.parse(decodeURIComponent(options.data));
			let {
				c_account,
				c_contact,
				c_email,
				c_name,
				c_phone,
				c_pwd,
				c_status,
				id
			} = custom
			this.customData.account = c_account
			this.customData.contact = c_contact
			this.customData.email = c_email
			this.customData.name = c_name
			this.customData.phone = c_phone
			this.customData.pwd = c_pwd
			this.customData.id = id
			this.customData.status = c_status
		},
		methods: {
			async submit() {
				this.$refs.form.validate().then(async res => {
					console.log('submit 客户详情')
					uni.showLoading()
					const r = await this.$api.editCostomDetail(this.customData)
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
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style>

</style>
