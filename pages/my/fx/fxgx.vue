<template>
	<view class="u-p-20" >
		
		<view class="main u-p-30">
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">商品</view>
				<view class="item u-text-right">{{list.da_product.Product.name}}</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">店铺</view>
				<view class="item u-text-right">{{list.Company.name}}</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">联系人</view>
				<view class="item u-text-right">{{list.Company.contact}}</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">电话</view>
				<view class="item u-text-right">{{list.Company.mobile}}</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">手续费类型</view>
				<view class="item u-text-right">元/{{list.da_product.Product.unit}}</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">分销费点数</view>
				<view class="item u-text-right">{{list.da_product.price1}} 元/{{list.da_product.Product.unit}}</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">状态</view>
				<view class="item u-text-right u-flex">
					<u--text>激活</u--text>
					<u-switch v-model="value13" asyncChange @change="asyncChange" ></u-switch>
				</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">店铺审核状态</view>
				<view class="item u-text-right">激活</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">店铺经营状态</view>
				<view class="item u-text-right">激活</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">店铺分销商品状态</view>
				<view class="item u-text-right">激活</view>
			</view>  
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				id: '',
				list: {},
			}
		},
		computed: {
			status: {
				get() {
					return this.list.status == '1'? true:false
				},
				set(e) {
					this.list.status = e ? '1' : '0'
				}
			}
		},
		async onLoad(opt) {
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id;
			}
			if(opt.hasOwnProperty('data')) { 
				this.list = JSON.parse(decodeURIComponent(opt.data))
			} 
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}), 
			asyncChange(e) {
				uni.showModal({
					content: e ? '确定要激活吗' : '确定要灭活吗',
					success: async (res) => {
						
						if (res.confirm) {
							await this.changeStatus()
							this.status = e
						}
					}
				})
			},
			async changeStatus() {
				const res = await this.$api.all_api({
					params: {
						API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER',
						Action: 'ABLE',
						token: 1,
						id: this.id
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>

	.main {
		background-color: #fff;
	}
</style>
