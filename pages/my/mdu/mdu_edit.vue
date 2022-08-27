<template>
	<view class="u-p-20 u-p-l-30 u-p-r-30">
		<u--form
			labelPosition="left"
			:model="model"
			:rules="rules"
			ref="from"
			labelWidth="80"
			>
			<u-form-item
				
				label="交易商"
				prop="customer_login"
				ref="customer_login"
				required
			>
				<view @click="show2 = true" v-if="isBroker == '1'">
					<u-input
						:value="customer_name"
						placeholder="点击选择交易商" 
						readonly
					>
						<template slot="suffix">
							<view class="">
								<i class="custom-icon-unfold custom-icon"></i>
							</view>	
						</template>
					</u-input>
				</view>
				<view class="" v-else>
					{{myCpy.name}}
				</view>
			</u-form-item>
			<u-form-item
				label="标准商品"
				prop="pid"
				ref="pid"
				required
			>
				<view @click="show = true">
					<u-input
						:value="pid_name"
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
			<u-form-item
				label="MDU"
				prop="mdu"
				ref="mdu"
				required
			>
				<!-- 添加MDU模式 复选 -->
				<u-checkbox-group
					v-if="type == 'add'"
					v-model="mdu_arr" 
					@change="checkboxChange"
					>
					<u-checkbox
						:customStyle="{marginRight: '8px'}"
						v-for="(item, index) in mdu_list"
						:key="item.value"
						:label="item.name"
						:name="item.value"
					>
					</u-checkbox>
				</u-checkbox-group>
				
				<!-- 编辑MDU模式 单选 -->
				<u-radio-group
					v-if="type == 'edit'"
				    v-model="model.mdu" 
				    @change="radioChange"
				  >
				    <u-radio
						:customStyle="{marginRight: '8px'}"
						v-for="(item, index) in mdu_list"
						:key="item.value"
						:label="item.name"
						:name="item.value" 
				    >
				    </u-radio>
				  </u-radio-group>
			</u-form-item>
			<u-form-item
				label="备注"
				prop="remark"
				ref="remark" 
			>
				<u-input
					v-model="model.remark"
					placeholder="备注" 
					clearable
					></u-input>
			</u-form-item>
			<template v-if="isBroker == '0'">
				<u-form-item
					label="确认状态" 
				>
					<view :class="{
						'text-error': list.state == '2',
						'text-success': list.state == '1',
						'text-primary': list.state == '0',
					}">
						{{list.state | mduState2Str}}
					</view>
				</u-form-item>
				<u-form-item
					label="添加时间" 
				>
					<view class="text-base">
						{{list.ctime}}
					</view>
				</u-form-item>
			</template>
			
		</u--form>
		<view class="u-m-t-40">
			<u-button type="primary" @click="submit">提交表单</u-button>
		</view>
		
		<menusPopup 
			:show="show" 
			theme="white"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopup>
		
		<menusPopup 
			:show="show2" 
			theme="white"
			:isMyAllCpy="true"
			showMode="list"
			@close="show2 = false"
			@confirm="menusConfirm2"
		></menusPopup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				id: '',
				isBroker: '1',
				type: 'add',
				show: false,
				show2: false,
				pid_name: '',
				customer_name: '',
				mdu_arr: [],
				model: {
					customer_login: '',
					pid: '',
					mdu: '',
					remark: ''
				},
				list: {},
				mdu_list: [{
						name: '生产商',
						disabled: false,
						value: 'M',
					},
					{
						name: '经销商',
						disabled: false,
						value: 'D',
					},
					{
						name: '下游用户',
						disabled: false,
						value: 'U',
					}
				],
				
			};
		},
		async onLoad(opt) {
			if(opt.hasOwnProperty('isBroker')) {
				this.isBroker = opt.isBroker 
			} 
			if(opt.hasOwnProperty('type')) {
				this.type = opt.type 
			} 
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id 
				await this.getData()
				
			} 
		},
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy
			}),
			config() {
				return this.isBroker == '1' ? {
							addFunc: 'customer_mdu_create_mdu_broker',
							addParams: { 
								customer_login: this.model.customer_login,
								pid: this.model.pid,
								mdu: this.model.mdu,
								remark: this.model.remark,
							},
							editFunc: 'customer_mdu_change_mdu_broker',
							editParams: { 
								pid: this.model.pid,
								mdu: this.model.mdu,
								remark: this.model.remark,
								id: this.id ,
							},
							detailFunc: 'customer_mdu_detail_mdu_broker',
						} : {
							addFunc: 'customer_mdu_create_mdu',
							addParams: {  
								pid: this.model.pid,
								mdu: this.model.mdu,
								remark: this.model.remark,
							},
							editFunc: 'customer_mdu_change_mdu',
							editParams: { 
								pid: this.model.pid,
								mdu: this.model.mdu,
								remark: this.model.remark,
								id: this.id ,
							},
							detailFunc: 'customer_mdu_detail_mdu',
						}
			},
			rules() {
				let obj = {
					pid: {
						type: 'string',
						required: true,
						message: '标准品不能为空',
						trigger: ['blur', 'change']
					},
					mdu: {
						type: 'string',
						required: true,
						message: 'MDU至少选择一项',
						trigger: ['blur', 'change']
					},
					
				}
				if(this.isBroker == '1') { 
					obj.customer_login= {
							type: 'string',
							required: true,
							message: '交易商不能为空',
							trigger: ['blur', 'change']
						} 
				}
				if(this.$refs.from && this.$refs.from.setRules) {
					this.$refs.from.setRules(obj)
				} 
				return obj
				
			}
		},
		wathc: { 
			['model.mdu'](n) {
				this.mdu_arr = n.split(',')
			}
		},
		onReady() { 
			this.$refs.from.setRules(this.rules)
		},
		methods: { 
			async menusConfirm(data) {
				console.log(data)
				this.pid_name = data.name
				this.model.pid = data.pid  
				this.$refs.from.validateField('pid') 
				this.show = false;
			},
			async menusConfirm2(data) {
				console.log(data)
				this.model.customer_login = data.login
				this.customer_name = `${data.to_contact} - ${data.to_name}` 
				this.show2 = false;
			},
			checkboxChange(n) { 
				this.model.mdu = n.join(',')
			},
			radioChange(n) {
				this.model.mdu = n
			},
			async getData() {
				uni.showLoading({
					title: '获取详细数据中...'
				})
				const res = await this.$api[this.config.detailFunc]({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.list = res.list.Result
					this.model.customer_login = this.list.Company.login
					this.customer_name = this.list.Company.name
					this.model.pid = this.list.pid
					this.pid_name = this.list.list_standards.filter(ele => ele.pid == this.model.pid)[0]?.name
					this.model.mdu = this.list.mdu
					this.model.remark = this.list.remark 
				}
			},
			submit() {
				
				this.$refs.from.validate().then(async () => {
					uni.showLoading()
					let func = this.type == 'add'? this.config.addFunc : this.config.editFunc;
					let params = this.type == 'add'? this.config.addParams : this.config.editParams;
					const res = await this.$api[func]({ params })
					if(res.code == 1) {
						this.$utils.prePage().hasOwnProperty('refreshList') && this.$utils.prePage().refreshList();
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
						
					}
					
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('校验失败')
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
