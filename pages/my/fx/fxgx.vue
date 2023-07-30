<template>
	<view class="u-p-20" >
		
		<view class="main u-p-30" v-if="list.id">
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
				<view class="item u-text-right u-flex u-flex-items-start" :class="{'text-primary': list.state == 1}">
					<text class="u-m-r-30">{{list.state == 1? '激活' : '未激活'}}</text>
					<u-switch v-model="state" asyncChange @change="asyncChange" ></u-switch>
				</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">店铺审核状态</view>
				<view class="item u-text-right" :class="{'text-primary': list.auth_state == 1}">{{list.auth_state == 1? '激活' : '未激活'}}</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">店铺经营状态</view>
				<view class="item u-text-right" :class="{'text-primary': list.da_company.state == 1}">{{list.da_company.state == 1? '激活' : '未激活'}}</view>
			</view>  
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">店铺分销商品状态</view>
				<view class="item u-text-right" :class="{'text-primary': list.da_product.state == 1}">{{list.da_product.state == 1? '激活' : '未激活'}}</view>
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
			state: {
				get() {
					return this.list.state == '1'? true:false
				},
				set(e) {
					this.list.state = e ? '1' : '0'
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
							await this.changeStatus(e)
							
						}
					}
				})
			},
			async changeStatus(e) {
				const res = await this.$api.fxgx_status_change({
					params: { 
						id: this.id
					}
				})
				if(res.code == 1) {
					this.state = e
					uni.showToast({
						title: res.msg
					})
				}
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
