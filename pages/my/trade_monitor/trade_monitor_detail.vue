<template>
	<view class="u-p-20 u-p-l-40 u-p-r-40">
		<u--form
			labelPosition="left"
			:model="formData"
			ref="addrform"
			labelWidth="80"
		>
			<u-form-item
				label="说明"  
			>
				<view class="text-error">{{formData.type == 'price'? info2 : info1}}</view>
			</u-form-item>
			<u-form-item
				label="商品"
				prop="pid"
				ref="pid"
				required
			>
				<view @click="pid_show = true">
					<u--input
						v-model="formData.pid_str"
						clearable
						readonly
						suffixIcon="arrow-down"
						suffixIconStyle="color: #909399"
					></u--input>
				</view>
			</u-form-item>
			<u-picker  
				ref="uPicker_pid"
				:show="pid_show" 
				:columns="pid_columns"  
				keyName="name" 
				:loading="loading"
				closeOnClickOverlay
				@confirm="pid_confirm"
				@close="pid_show = false"
			></u-picker>
			<u-form-item
				label="监测类型"
				prop="type"
				ref="type"
				required
			>
				<view @click="type_show = true">
					<u--input
						v-model="formData.type_str"
						clearable
						readonly
						suffixIcon="arrow-down"
						suffixIconStyle="color: #909399"
					></u--input>
				</view>
			</u-form-item>
			<u-picker 
				ref="uPicker_type"
				:show="type_show" 
				:columns="type_columns"  
				keyName="label"  
				closeOnClickOverlay
				@confirm="type_confirm" 
				@close="type_show = false"
			></u-picker>
			<u-form-item
				label="警戒系数"
				prop="alert"
				ref="formData_alert"
				required
			>
				<view class="u-flex u-flex-between u-flex-items-center">
					<u--input
						v-model="formData.alert"
						clearable
					></u--input>
					<view class="u-p-l-10 u-p-r-10">%</view>
				</view>
				
			</u-form-item>
			<u-form-item
				label="初始日期"
				prop="sdate"
				ref="sdate"
				required
			>
				<view @click="sdate_show = true">
					<u--input
						v-model="formData.sdate_str"
						clearable
						readonly
						suffixIcon="arrow-down"
						suffixIconStyle="color: #909399"
					></u--input>
				</view>
			</u-form-item>
			 <u-datetime-picker
				ref="datetimePicker_sdate"
				:show="sdate_show"
				v-model="formData.sdate"
				mode="date"
				closeOnClickOverlay
				@confirm="sdate_confirm"
				@close="sdate_show = false"
			></u-datetime-picker>
			<u-form-item
				label="初始价格"
				prop="price"
				ref="formData_price"
				required
				v-if="formData.type=='price'"
			>
				<u--input
					v-model="formData.price"
					clearable
				></u--input> 
			</u-form-item>
			<u-form-item
				label="监测到期"
				prop="edate"
				ref="edate"
				required
			>
				<view @click="edate_show = true">
					<u--input
						v-model="formData.edate_str"
						clearable
						readonly
						suffixIcon="arrow-down"
						suffixIconStyle="color: #909399"
					></u--input>
				</view>
			</u-form-item>
			 <u-datetime-picker
				ref="datetimePicker_edate"
				:show="edate_show" 
				v-model="formData.edate"
				mode="date"
				closeOnClickOverlay
				@confirm="edate_confirm"
				@close="edate_show = false"
			></u-datetime-picker>
			<u-form-item
				label="备注"
				prop="remark"
				ref="formData_remark"
			>
				<u--textarea
					v-model="formData.remark" 
					placeholder="备注" 
					height="90"
				></u--textarea>
			</u-form-item>
		</u--form>
		
		<view class="u-p-t-20">
			<u-button type="primary" @click="confirmForm">提交</u-button>
		</view>
	</view>
</template>

<script>
	function  times2str (time) {
		let d = new Date(time)
		let year = d.getFullYear()
		let month = d.getMonth() + 1
		let day = d.getDate()
		let date = `${year+'-'+month +'-'+day}`
		return date
	}
	const maxRange = 30*24*60*60*1000
	import {mapState, mapMutations, mapActions} from "vuex"
	export default {
		// mixins: [mixCheckLogin],
		data() {
			return { 
				info1: '',
				info2: '',
				loading: false,
				show: false,
				switchDisabled: false,
				type: 'add',
				type_show: false,
				type_columns: [
                    [
						{
							label: '指数监测',
							value:'abs'
						},
						{
							label: '价格监测',
							value:'price'
						},
					]
                ],
				pid_show: false, 
				sdate_show: false,
				edate_show: false,
				radiolist1: [{
						name: '收货',
						value: 'R',
						disabled: false
					},
					{
						name: '发货',
						value: 'S',
						disabled: false
					},
					{
						name: '收/发',
						value: 'RS',
						disabled: false
					}
				],
				list: [],
				formData: {
					id: '',
					type: "abs", 
					type_str: "指数监测",
					pid: "", 
					pid_str: "",
					pid: "",
					alert: "5",
					sdate: new Date().getTime(),
					edate: new Date().getTime() + maxRange,
					sdate_str: times2str(new Date().getTime()),
					edate_str: times2str(new Date().getTime() + maxRange),
					price: "",
					remark: "",
					
				},
			}
		},
		onReady() {
			this.$refs.addrform.setRules(this.rules) 
			console.log(this.$refs)
		}, 
		computed: {
			...mapState({
				addressArea: (state) => state.user.addressArea,
			}), 
			pid_columns() {
				if(!this.list || this.list.length == 0) return [[]]
				return [
					this.list.map(ele => ele.Standard)
				]
			},
			rules() {
				let obj = {
					pid: {
						type: 'string',
						required: true,
						message: '商品不能为空',
						trigger: ['blur', 'change']
					}, 
					alert: {
						type: 'string',
						required: true,
						message: '警戒系数不能为空',
						trigger: ['blur', 'change']
					},
					sdate: {
						type: 'number',
						required: true,
						message: '初始日期不能为空',
						trigger: ['blur', 'change']
					},
					edate: {
						type: 'number',
						required: true,
						message: '监测到期不能为空',
						trigger: ['blur', 'change']
					}, 
				}
				if(this.formData.type == 'price') {
					obj = {
						...obj,
						price: {
							type: 'string',
							required: true,
							message: '初始价格不能为空',
							trigger: ['blur', 'change']
						}, 
					}
				} 
				this.$nextTick(() => {
					if(this.$refs.addrform && this.$refs.addrform.setRules) {
						this.$refs.addrform.setRules(obj)
					} 
				})
				
				return obj
			}
		},
		watch: {
			['formData.autoCheck'](flag) {
				if(flag) {
					this.formData.def = 1
				}else {
					this.formData.def = 0
				}
			}
		},
		async onLoad(option) { 
			let title = '新增';
			uni.showLoading({
				title: '初始化行情监测标准品列表...'
			})
			await this.init()
			if (option.type === 'edit') {
				title = '编辑'
				// let res = await this.$http.get('address_detail', {params: {address_id:option.data.id}})
				let data = JSON.parse(decodeURIComponent(option.data))
				this.formData.id = data.id
				this.formData.type = data.type
				this.formData.type_str = this.type_columns[0].filter(ele => ele.value == data.type)[0].label
				this.formData.pid = data.Standard.pid
				this.formData.pid_str = data.Standard.name
				this.formData.alert = data.alert
				this.formData.sdate = Number(new Date(data.sdate))
				this.formData.edate = Number(new Date(data.edate))
				this.formData.sdate_str = data.sdate
				this.formData.edate_str = data.edate
				this.formData.price = data.price
				this.formData.remark = data.remark 
				console.log(this.formData)
				
			}
			
			// console.log(this.formData.regional)
			this.type = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}), 
			async init() {
				this.loading = true
				const res = await this.$api.trade_monitor_list_inquiry_standards()
				if(res.code == 1) {
					 this.list = res.list
					 this.info1 = res.info1
					 this.info2 = res.info2
				}
				this.loading = false
			},
			changeSwitch(e) {
				console.log(e)
				this.formData.autoCheck = e
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			handleValArea() {
				this.$refs.addrform.validateField('formData.regional')
			},
			//提交
			async confirmForm() {
				this.$refs.addrform.validate().then(async res => {
					let flag = await this.submitData(this.formData)
					if(!flag) {
						uni.showToast({
							title: '提交操作有误',
							icon: 'none'
						})
						return 
					}
					const arr = uni.$u.pages()
					arr[arr.length - 2].$vm.refreshList(this.type);
					uni.showToast({
						icon: 'success',
						title: `${this.type=='edit' ? '修改': '添加'}成功`
					})
					setTimeout(() => {
						this.handleGoto({type: 'navigateBack'})
					}, 800)
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('请检查表单内容')
				})
				
				//this.$utils.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				
			},
			async delAddrClick() {
				uni.showModal({
					title: '提示',
					content: '是否删除该地址？',
					success: async (res) => {
						if (res.confirm) {
							uni.showLoading()
							const res = await this.$api.deleteAddress({params: {id: this.formData.id}})
							if(res.code == 1) {
								const arr = uni.$u.pages()
								arr[arr.length - 2].$vm.refreshList(this.type);
								uni.showToast({
									icon: 'success',
									title: `删除成功`
								})
								setTimeout(() => {
									this.handleGoto({type: 'navigateBack'})
								}, 800)
							}
						}	
					}
				})
			},
			async submitData(data) {
				uni.showLoading({
					title: '提交中...'
				})
				// let params = {
				// 	contact: data.contact,
				// 	tel: data.tel,
				// 	to_def: data.def,
				// 	regional: data.regional,
				// 	address: data.address,
				// 	remark: data.remark,
				// 	type: data.type,
				// }
				// if(this.type == 'edit') {
				// 	params.id = data.id
				// }
				const res = await this.$api[this.type == 'add'? 'trade_monitor_create_trade_monitor' : 'trade_monitor_change_trade_monitor']({params: data})
				
				return res.code == 1
			},
			type_confirm(e) {
				console.log(e)
				this.type_show = false
				this.formData.type = e.value[0].value
				this.formData.type_str = e.value[0].label
				this.$refs.addrform.validateField('type')
			},
			pid_confirm(e) {
				console.log(e)
				this.pid_show = false
				this.formData.pid = e.value[0].pid
				this.formData.pid_str = e.value[0].name
				this.$refs.addrform.validateField('pid')
			},
			sdate_confirm(e) {
				console.log(e)
				if(e.value > new Date().getTime()) {
					uni.showToast({
						title: '初始日期不能大于今天',
						icon: 'none'
					})
					return
				}
				this.sdate_show = false
				this.formData.sdate = e.value
				this.formData.sdate_str = times2str(e.value)
				this.$refs.addrform.validateField('sdate')
				if(e.value > this.formData.edate) {
					this.formData.edate = e.value
					this.formData.edate_str = times2str(e.value)
				}
			},
			edate_confirm(e) {
				console.log(e)
				if(e.value > (new Date().getTime() + maxRange)) {
					uni.showToast({
						title: '截止日期不能超出30天',
						icon: 'none'
					})
					return
				}
				else if(e.value < this.formData.sdate) {
					uni.showToast({
						title: '截止日期不能早于初始日期',
						icon: 'none'
					})
					return
				}
				this.edate_show = false
				this.formData.edate = e.value
				this.formData.edate_str = times2str(e.value)
				this.$refs.addrform.validateField('edate')
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: $page-color-base;
		padding-top: 16rpx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30rpx;
		height: 110rpx;
		background: #fff;
		&.textarea {
			align-items: flex-start;
			height: auto;
			padding-top: 8rpx;
		}
		.tit {
			flex-shrink: 0;
			width: 140rpx;
			font-size: 30rpx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30rpx;
			color: $font-color-dark;
			height: 100%;
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			font-size: 36rpx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16rpx;

		// .tit {
		// 	flex: 1;
		// }

		switch {
			transform: translateX(16rpx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690rpx;
		height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10rpx;
		// box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		&.del-btn {
			background-color: $uni-color-error;
		}
	}
</style>
