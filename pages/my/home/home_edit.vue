<template>
	<view class="u-p-20 u-p-l-40 u-p-r-40">
		<u--form
			labelPosition="left"
			:model="model"
			ref="userform"
			labelWidth="80"
			>
			<u-form-item
				label="联系人"
				prop="contact"
				ref="contact" 
			>
				<u--input
					v-model="model.contact" 
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="昵称"
				prop="da_name"
				ref="da_name"
				required
			>
				<u--input
					v-model="model.da_name" 
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="手机"
				prop="mobile"
				ref="mobile" 
			>
				<u--input
					v-model="model.mobile" 
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="电话"
				prop="tel"
				ref="tel" 
			>
				<u--input
					v-model="model.tel" 
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				label="头像"
				prop="da_pic"
				ref="da_pic" 
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
				label="认证信息"
				prop="attestation"
				ref="attestation" 
			>
				<u--input
					v-model="model.attestation" 
					clearable 
				></u--input>
			</u-form-item>
			<u-form-item
				label="达人简介"
				prop="da_intro"
				ref="da_intro" 
			>
				<!-- <rich-text :nodes="model.da_intro"></rich-text> -->
				<u-textarea v-model="model.da_intro" height="120"></u-textarea>
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
					contact: '',
					da_name: '', 
					mobile: '', 
					tel: '', 
					da_intro: '', 
					da_pic: '', 
					da_pic_base64: '', 
					da_pic_name: '头像.jpg',  
					attestation: ''
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
					'da_name': {
						type: 'string',
						required: true,
						message: '请填写昵称',
						trigger: ['blur', 'change']
					},
				}
						
			}
		},
		async onLoad() { 
			await this.myHomeInfo()
			await this.myHomeInfo2()
		},
		onReady() {
			this.$refs.userform.setRules(this.rules)
		},
		watch: { 
			['model.da_pic'](n) { 
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
			async myHomeInfo() {
				const res = await this.$api.homepage_info();
				if(res.code == 1) {
					this.fxImg = res.list.detail.url_img
					res.list.detail.da_pic = this.fxImg + res.list.detail.da_pic
					this.model = {
						...this.model,
						...res.list.detail
					}
				}
			},
			async myHomeInfo2() {
				const res = await this.$api.page_info();
				if(res.code == 1) { 
					this.model.attestation = res.list.attestation
				}
			},
			async submit() {
				this.$refs.userform.validate().then(async res => {  
					this.submit2()
					this.submit1()
					
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('请检查表单内容')
				})
			}, 
			async submit1() {
				const list = await this.$api.homepage_info_change({
					...this.model,
					da_pic: this.model.da_pic.replace(this.fxImg, ''),
					da_inro: this.model.da_intro
				})
				if(list.code == 1) { 
					this.$utils.prePage()?.hasOwnProperty('getHomeData') && this.$utils.prePage().getHomeData();
					uni.showToast({
						title: list.msg
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 800)
					
				}
			},
			async submit2() {
				const list = await this.$api.save_page_info({
					name: this.model.da_name,
					info:  this.model.da_intro,
					attestation: this.model.attestation,
				})
				 
			},
			// 删除图片
			deletePic(event) {
				console.log(event)
				this[`fileList${event.name}`].splice(event.index, 1)
				this.model.da_pic = ''
				this.model.da_pic_base64 = ''
				 
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
					this.model.da_pic_base64 = result
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

<style scoped lang="scss">
	.wrapper {
		
	}
</style>
