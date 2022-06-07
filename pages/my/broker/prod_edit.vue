<template>
	<view class="u-p-20">
		
		<u--form
			labelPosition="left"
			:model="model"
			:rules="rules"
			ref="from"
			labelWidth="80"
		>
			
				<u-form-item
					label="标准商品"
					prop="product_id"
					ref="product_id"
					required
				>
					<view @click="show = true">
						<u-input
							:value="product"
							placeholder="点击选择标准商品" 
							readonly
						>
							<template slot="suffix">
								<view class="">
									<i class="custom-icon-unfold custom-icon"></i>
								</view>	
							</template>
						</u-input>
					</view>
					
				</u-form-item>
				
				<menusPopup 
					:show="show" 
					theme="white"
					@close="show = false"
					@confirm="menusConfirm"
				></menusPopup>
				<u-form-item
					label="名称"
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
					label="单位"
					prop="unit"
					ref="unit"
				>
					<u--input
						v-model="model.unit"
						clearable
					></u--input>
				</u-form-item>
				<!-- <uni-section title="属性" type="circle" padding border> -->
					<u-form-item
						label="规格属性"
						prop="attr_common_12"
						ref="attr_common_12"
					>
						<u--input
							v-model="model.attr_common_12"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item
						label="品牌/产地"
						prop="attr_common_11"
						ref="attr_common_11"
					>
						<u--input
							v-model="model.attr_common_11"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item
						label="生产商"
						prop="attr_common_13"
						ref="attr_common_13"
					>
						<u--input
							v-model="model.attr_common_13"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item
						label="质量标准"
						prop="attr_common_14"
						ref="attr_common_14"
					>
						<u--input
							v-model="model.attr_common_14"
							clearable
						></u--input>
					</u-form-item>
				<!-- </uni-section> -->
				
				<u-form-item
					label="需求类型"
					prop="type"
					ref="type"
				>
					 <u-radio-group
					    v-model="model.type"
					    placement="row"
					  >
					    <u-radio
					      :customStyle="{marginRight: '8px'}"
					      v-for="(item, index) in radiolist_type"
					      :key="item.value"
					      :label="item.name"
					      :name="item.value"
					    >
					    </u-radio>
					  </u-radio-group>
				</u-form-item>
				<u-form-item
					label="图片"
					prop="img"
					ref="img"
				>
					<u-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						:maxCount="1"
					></u-upload>
					<!-- <u--input
						v-model="model.img"
					></u--input> -->
				</u-form-item>
				
				<u-form-item
					label="商品简介"
					prop="intro"
					ref="intro"
				>
					<u--textarea
						v-model="model.intro" 
						placeholder="商品简介" 
						height="90"
					></u--textarea>
				</u-form-item>
				
		</u--form>
		<view class="u-p-t-20 u-m-b-40">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
		
	</view>
</template>

<script>
	import uniSection from '@/pages/my/components/uni-section/uni-section'
	export default {
		data() {
			return {
				pid: '',
				product: '',
				show: false,
				model: {
					product_id: '',
					name: 'uView UI',
					unit: '',
					attr_common_12: '',
					attr_common_11: '',
					attr_common_13: '',
					attr_common_14: '',
					intro: '',
					type: 'bs',
					img: ''
				},
				list: [
					{
						label: '菜单1',
						value: 'caidan1'
					},
					{
						label: '菜单2',
						value: 'caidan2'
					},
					{
						label: '菜单3',
						value: 'caidan3'
					},
					{
						label: '菜单4',
						value: 'caidan4'
					},
					{
						label: '菜单21',
						value: 'caidan21'
					},
					{
						label: '菜单31',
						value: 'caidan31'
					},
					{
						label: '菜单41',
						value: 'caidan41'
					}
				],
				fileList1: [],
				radiolist_type: [
					{
						name: '买盘',
						disabled: false,
						value: "b"
					},
					{
						name: '卖盘',
						disabled: false,
						value: "s"
					},
					{
						name: '均可',
						disabled: false,
						value: "bs"
					},
				],
			}
		},
		computed: {
			rules() {
				return {
					'product_id': {
						type: 'string',
						required: true,
						message: '请选择商品',
						trigger: ['blur', 'change']
					},
					'name': {
						type: 'string',
						required: true,
						message: '请填写名称',
						trigger: ['blur', 'change']
					},
				}
			},
			candidates() {
				return this.list.map(ele => ele.label)
			},
		},
		onLoad(options) {
			if(!options.hasOwnProperty('pid')) {
				uni.setNavigationBarTitle({
					title: '交易商品名添加'
				})
			}else {
				this.pid = options.pid
			}
			
		},
		components: {
			uniSection
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
		},
		methods: {
			
			async menusConfirm(data) {
				console.log(data)
				uni.showToast({
					title: `点击了：${data.name}项`,
					icon: 'none'
				})
				this.product = data.name
				this.model.product_id = data.pid
				this.show = false;
			},
			typeSelect(e) {
				console.log(e)
				this.model.type = e.value
				this.type = e.name
			},
			showActions() {
				this.showType = true; 
				uni.hideKeyboard()
			},
			submit() {
				
				this.$refs.from.validate().then(async res => {
					
					// uni.$u.toast('校验通过')
					const r = await this.$api.editProd({...this.model.prod, id: this.pid})
					console.log(r)
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
			
			comboxBlur(e) {
				const index = this.candidates.indexOf(e)
				if(index != -1) {
					this.model.product_id = this.list[index].value
					this.product = e
				}else {
					this.model.product_id = '';
					this.product = ''
				}
				this.$refs.from.validateField('product_id')
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		
	}
</style>
