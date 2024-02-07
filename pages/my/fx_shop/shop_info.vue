<template>
	<view class="u-p-20 u-p-l-40 u-p-r-40">
		<u--form
			labelPosition="left"
			:model="model"
			ref="shopform"
			labelWidth="80"
			> 
			<u-form-item
				label="店铺名称"
				prop="name"
				ref="name"
				required
			>
				<u--input
					v-model="model.name" 
					clearable
				></u--input>
			</u-form-item> 
			<u-form-item
				label="logo"
				prop="logo"
				ref="logo" 
			> 
				<view>
					<u-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						:maxCount="1"
						:maxSize="2048000"
						@oversize="handleoversize"
					></u-upload>
					<view class="u-info u-font-28">建议上传2M以内的图片</view>
				</view>
			</u-form-item> 
			<u-form-item
				label="店铺简介"
				prop="intro"
				ref="intro" 
			> 
				<u-textarea v-model="model.intro" height="70"></u-textarea>
			</u-form-item>
			<u-form-item
				label="店铺状态"
				prop="state"
				ref="state" 
			>
				<u-switch 
					v-model="model.state" 
					activeValue="1"
					inactiveValue="0"
				></u-switch>
			</u-form-item>
			<u-form-item
				label="联盟状态"
				prop="da_state"
				ref="da_state" 
			>
				<u-switch 
					v-model="model.da_state" 
					activeValue="1"
					inactiveValue="0"
				></u-switch>
			</u-form-item> 
			
			
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
				model: {  
					name: '',  
					intro: '', 
					logo: '', 
					logo_base64: '', 
					logo_name: 'logo.jpg',   
					state: '1',
					da_state: '1', 
				},
				fileList1: [], 
				fxImg: 'https://img-album.rawmex.cn/200-200/',
			}
		},
		computed: {
			...mapState({
				wode: state => state.user.wode, 
				configHeader: state => state.user.configHeader,
				configBaseURL: state => state.user.configBaseURL,
			}),
			rules() {
				return {
					'name': {
						type: 'string',
						required: true,
						message: '请填写店铺名称',
						trigger: ['blur', 'change']
					},
				}
						
			}
		},
		async onLoad() { 
			await this.myShopInfo()
			// await this.myShopInfo2()
		},
		onReady() {
			this.$refs.shopform.setRules(this.rules)
		},
		watch: { 
			['model.logo'](n) { 
				this.fileList1 = n ? [{url: n}] : []
			}
		},
		methods: {
			...mapMutations({ 
				handleGoto: 'user/handleGoto'
			}),  
			...mapActions({ 
				getImageBase64_readFile: 'user/getImageBase64_readFile'
			}),  
			async myShopInfo() {
				const res = await this.$api.shop_info();
				if(res.code == 1) {
					this.fxImg = res.list.detail.url_img
					res.list.detail.logo = this.fxImg + res.list.detail.logo
					this.model = {
						...this.model,
						...res.list.detail
					}
				}
			},
			// async myShopInfo2() {
			// 	const res = await this.$api.page_info();
			// 	if(res.code == 1) { 
			// 		this.model.attestation = res.list.attestation
			// 		this.model.switch1 = res.list.switch1
			// 		this.model.switch2 = res.list.switch2
			// 		this.model.switch3 = res.list.switch3
			// 	}
			// },
			async submit() {
				this.$refs.shopform.validate().then(async res => {  
					// this.submit2()
					this.submit1()
					
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('请检查表单内容')
				})
			}, 
			async submit1() {
				const list = await this.$api.shop_info_change({
					...this.model,
					logo: this.model.logo.replace(this.fxImg, ''), 
				})
				if(list.code == 1) { 
					// this.$utils.prePage()?.hasOwnProperty('getShopData') && this.$utils.prePage().getShopData();
					uni.showToast({
						title: list.msg
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 800)
					
				}
			},
			// async submit2() {
			// 	const list = await this.$api.save_page_info({
			// 		name: this.model.da_name,
			// 		info:  this.model.da_intro,
			// 		attestation: this.model.attestation,
			// 		switch1: this.model.switch1,
			// 		switch2: this.model.switch2,
			// 		switch3: this.model.switch3,
			// 	})
				 
			// },
			// 删除图片
			deletePic(event) {
				console.log(event)
				this[`fileList${event.name}`].splice(event.index, 1)
				this.model.logo = ''
				this.model.logo_base64 = ''
				 
			},
			handleoversize() {
				uni.showToast({
					title: '建议上传2M以内的图片',
					icon: 'none'
				})
			},
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
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
					const result = await this.getImageBase64_readFile(lists[i].url)
					console.log(result)
					this.model.logo_base64 = result
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				} 
			},
			// uploadFilePromise(url) {
			// 	return new Promise((resolve, reject) => {
			// 		let a = uni.uploadFile({
			// 			url: `${this.configBaseURL}upimg`, 
			// 			filePath: url,
			// 			name: 'file',
			// 			header: {
			// 				...this.configHeader,
			// 				userid: uni.getStorageSync('userid'),
			// 			},
			// 			success: (res) => {
			// 				resolve(JSON.parse(res.data))
			// 			}
			// 		});
			// 	})
			// },
			
			
		}
	}
</script>
<style lang="scss">
	page {
		/deep/ {
			.u-upload__deletable {
				width: 30px!important;
				height: 30px!important;
				background-color: #f00!important;
				.u-upload__deletable__icon { 
					transform: scale(1)!important;
					top: 6px!important; 
					right: 4px!important;
					.uicon-close {
						font-size: 16px!important;
					}
				}
			}
		}
	}
</style>
<style scoped lang="scss">
	.wrapper {
		
	}
</style>
