<template>
	<view class="u-p-20 u-p-l-30 u-p-r-30">
		<u--form
			labelPosition="left"
			:model="model"
			:rules="rules"
			ref="from"
			labelWidth="80"
			:labelStyle="{
				flex: '0 0 80px'
			}"
			> 
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
				label="排序"
				prop="rank"
				ref="rank" 
			>
				<u--input v-model="model.rank" placeholder="排序" /> 
			</u-form-item>  
			<u-form-item
				label="添加时间" 
				v-if="list.ctime"
			>
				<view class="text-base">
					{{list.ctime}}
				</view>
			</u-form-item>
			
		</u--form>
		<view class="u-m-t-40" >
			<u-button type="primary" @click="submit">提交表单</u-button>
		</view>
		
		<menusPopupStandard
			:show="show"
			theme="white"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopupStandard>
		 
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import menusPopupStandard from '@/components/menusPopup/menusPopupStandard.vue'
	export default {
		data() {
			return {
				id: '', 
				type: 'add',
				show: false, 
				pid_name: '',
				customer_name: '', 
				model: { 
					pid: '', 
					rank: ''
				},
				list: {}, 
				
			};
		},
		async onLoad(opt) {
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id   
			}  
			if(opt.hasOwnProperty('rank')) {
				this.model.rank = opt.rank 
			} 
			if(opt.hasOwnProperty('pid')) {
				this.model.pid = opt.pid 
				this.initNameByPid()
			} 
		},
		computed: {
			...mapState({ 
				fxStandard: state => state.user.fxStandard, 
				typeConfig: state => state.theme.typeConfig,
			}),
			config() {
				let base = {
					pid: this.model.pid,
					rank: this.model.rank,
					// API: 'DA_ALLIANCE_DA_PID_TO_MEMBER',
					// Action: 'CHANGE',
					token: 1
				}
				if(this.id) base.id = this.id
				return  {
							// func: 'all_api',
							params: base, 
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
				}  
				return obj
				
			}
		}, 
		components: { 
			menusPopupStandard
		},
		onReady() { 
			this.$refs.from.setRules(this.rules)
		},
		methods: { 
			...mapActions({ 
				getFxStandard: 'user/getFxStandard', 
			}), 
			async initNameByPid() {
				if(this.fxStandard.length == 0) {
					uni.showLoading()
					await this.getFxStandard() 
				}
				this.pid_name = this.fxStandard.filter(ele => ele.pid == this.model.pid)[0].name 
			},
			async menusConfirm(data) {
				console.log(data)
				this.pid_name = data.name
				this.model.pid = data.pid  
				this.$refs.from.validateField('pid') 
				this.show = false;
			},   
			// async getData() {
			// 	uni.showLoading({
			// 		title: '获取详细数据中...'
			// 	})
			// 	const res = await this.$api[this.config.detailFunc]({
			// 		params: {
			// 			id: this.id
			// 		}
			// 	})
			// 	if(res.code == 1) {
			// 		this.list = res.list.Result 
			// 		this.model.pid = this.list.pid
			// 		this.pid_name = this.list.list_standards.filter(ele => ele.pid == this.model.pid)[0]?.name
			// 		this.model.rank = this.list.rank 
			// 	}
			// },
			submit() {
				
				this.$refs.from.validate().then(async () => {
					uni.showLoading() 
					const res = await this.$api.jyfw_edit({ params: this.config.params })
					if(res.code == 1) {
						this.$utils.prePage()?.hasOwnProperty('refreshList') && this.$utils.prePage().refreshList();
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
					uni.$u.toast('请检查表单内容')
				})
			},
			 
		}
	}
</script>

<style lang="scss">

</style>
