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
				
				label="买方" 
				required
			>
				<view>{{company.name}}</view>
			</u-form-item>
			<u-form-item
				
				label="挂牌" 
				required
			>
				<view>{{list.name}}</view>
			</u-form-item>
			<u-form-item
				
				label="供应单价"
				prop="price"
				ref="price"
				required
			>
				<view class="u-flex u-flex-items-center">
					<view class="item u-flex-1"> 
						<u--input
							v-model="model.price" 
							clearable
						></u--input>
					</view>
					<view class="item u-p-l-10">元/{{list.unit}}</view>
				</view>
			</u-form-item>
			 
			<u-form-item
				label="备注"
				prop="remark"
				ref="remark" 
			>
				<u--input
					v-model="model.remark" 
					clearable
				></u--input>
			</u-form-item>  
		</u--form>
		<view class="u-m-t-40" >
			<u-button type="primary" @click="submit">提交表单</u-button>
		</view>
		 
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				id: '', 
				model: { 
					price: '',
					remark: ''
				},
				list: {}, 
				company: {}
				
			};
		},
		async onLoad(opt) { 
			// if(opt.hasOwnProperty('type')) {
			// 	this.type = opt.type 
			// } 
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id 
				await this.getData()
				
			} 
		},
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy
			}), 
			rules() {
				let obj = {
					price: {
						type: 'string',
						required: true,
						message: '金额不能为空',
						trigger: ['blur', 'change']
					},  
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
			async getData() {
				uni.showLoading({
					title: '获取详细数据中...'
				})
				const res = await this.$api.getBuyDetail({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.list = res.list
					this.company = res.company
				}
			},
			submit() {
				
				this.$refs.from.validate().then(async () => {
					uni.showLoading() 
					const res = await this.$api.order_inquiry_create({ params: {
						...this.model,
						source_id: this.id,
					} })
					if(res.code == 1) {
						// this.$utils.prePage().hasOwnProperty('refreshList') && this.$utils.prePage().refreshList();
						uni.showToast({
							title: res.msg,
							icon: 'success'
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
