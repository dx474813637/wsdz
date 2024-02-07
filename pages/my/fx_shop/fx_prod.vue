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
				label="商品"
				prop="product_id"
				ref="product_id"
				required
			>
				<view @click="show = true">
					<u-input
						v-model="product"
						placeholder="点击选择商品" 
						readonly
						bgColor="#fff" 
						suffixIcon="arrow-down"
						suffixIconStyle="color: #909399; font-size: 14px"
					></u-input>
				</view>
				
			</u-form-item> 
			<u-form-item
				label="费用类型"
				prop="pay_type"
				ref="pay_type" 
			>
				<view @click="show2 = true">
					<u-input
						:value="pay_type_str"
						placeholder="点击选择费用类型" 
						readonly
						bgColor="#fff" 
						suffixIcon="arrow-down"
						suffixIconStyle="color: #909399; font-size: 14px"
					></u-input>
				</view>
			</u-form-item> 
			<u-form-item
				label="分销佣金"
				prop="price1"
				ref="price1" 
			> 
				<u-input
					v-model="model.price1"
					placeholder="分销佣金"   
				></u-input> 
			</u-form-item> 
			<u-form-item
				label="商品所在地"
				prop="address_id"
				ref="address_id" 
			>
				<view @click="show3 = true">
					<u-input
						:value="address"
						placeholder="点击选择商品所在地" 
						readonly
						bgColor="#fff" 
						suffixIcon="arrow-down"
						suffixIconStyle="color: #909399; font-size: 14px"
					></u-input>
				</view>
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
		
		<menusPopupMyProduct 
			:show="show" 
			theme="white"   
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopupMyProduct>
		<u-picker 
			:show="show2" 
			:columns="columns" 
			keyName="label" 
			@confirm="confirm"
			closeOnClickOverlay
			@close="show2 = false"
			@cancel="show2 = false"
		></u-picker>
		<u-picker 
			:show="show3" 
			:columns="regional_list" 
			keyName="name" 
			@confirm="confirm2"
			closeOnClickOverlay
			@close="show3 = false"
			@cancel="show3 = false"
		></u-picker>
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
				show2: false, 
				show3: false, 
				product: '',
				customer_name: '', 
				model: { 
					product_id: '',
					pay_type: '',
					price1: '',
					address_id: '',
				},
				list: {}, 
				columns: [
					[ 
						{
							label: '千分之',
							value: '1', 
						},
						{
							label: '元/unit',
							value: '2', 
						}, 
					],
				],
				
			};
		},
		async onLoad(opt) {
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id   
				await this.getData()
			}  
			// if(opt.hasOwnProperty('rank')) {
			// 	this.model.rank = opt.rank 
			// } 
			// if(opt.hasOwnProperty('product_id')) {
			// 	this.model.product_id = opt.product_id 
			// 	this.initNameByPid()
			// } 
		},
		computed: {
			...mapState({ 
				myProduct: state => state.user.myProduct, 
				fxStandard: state => state.user.fxStandard, 
				typeConfig: state => state.theme.typeConfig,
			}),
			config() {
				let base = {
					...this.model,
				}
				if(this.id) base.id = this.id
				return  {
							// func: 'all_api',
							params: base, 
						}
			},
			rules() {
				let obj = {
					product_id: {
						type: 'string',
						required: true,
						message: '商品不能为空',
						trigger: ['blur', 'change']
					},  
				}  
				return obj
				
			},
			pay_type_str() {
				if(!this.model.pay_type) return ''
				return this.columns[0].filter(ele => ele.value == this.model.pay_type)[0].label
			},
			regional_list() {
				let item = this.list.Address?.map(item => {
						return {
							...item,
							name: item.address+'|'+item.Regionals.map(ele => ele.Particular.name).join('')
						}
					}) || [] 
				item.unshift({name: '无'})
				return [item]
			},
			address() {
				let item = this.regional_list[0].filter(ele => ele.id == this.model.address_id)[0]
				if(!item) return ''
				return item.name
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
				getCompanyProduct: 'user/getCompanyProduct',
			}), 
			async initNameByPid() {
				if(this.myProduct.length == 0) {
					uni.showLoading()
					await this.getCompanyProduct() 
				}
				console.log(this.myProduct, this.model.product_id)
				this.product = this.myProduct.filter(ele => ele.id == this.model.product_id)[0].name 
			},
			async menusConfirm(data) {
				console.log(data) 
				this.product = data.name
				this.model.product_id = data.id
				this.columns[0][1].label = `元/${data.unit || 'unit'}`
				this.show = false;
				this.$refs.from.validateField('product_id') 
			},  
			async getData() {
				uni.showLoading({
					title: '获取详细数据中...'
				})
				const res = await this.$api.shop_fx_product_detail({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.list = res.list.detail 
					this.model.product_id = this.list.product_id
					this.model.pay_type = this.list.pay_type
					this.model.price1 = this.list.price1
					this.model.address_id = this.list.address_id 
					this.initNameByPid()
					// this.product = this.list.list_standards.filter(ele => ele.product_id == this.model.product_id)[0]?.name
					// this.model.rank = this.list.rank 
				}
			},
			submit() {
				
				this.$refs.from.validate().then(async () => {
					uni.showLoading() 
					const res = await this.$api.shop_fx_product_change({ params: this.config.params })
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
			confirm(e) { 
				this.model.pay_type = e.value[0].value
				this.show2 = false
			},
			confirm2(e) { 
				this.model.address_id = e.value[0].id
				this.show3 = false
			},
			 
		}
	}
</script>

<style lang="scss">

</style>
