<template>
	<view class="card u-flex u-flex-items-center" @click="$emit('cardClick', {origin})"> 
		<view class="item-content u-flex-1 u-p-10 ">
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-10">
				<view class="item">
					<view class="content-title u-line-1 u-font-32">{{origin.cname}}</view>
				</view>
				<view class="item">
					<view class="content-sub u-line-1" v-if="origin.list_attr">{{origin.pp_num}} × {{origin.list_attr[0].pack}}{{origin.unit}}</view>
				</view>
			</view>
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-10">
				<view class="item">
					<view class="content-sub u-line-1">
						<text class="u-p-r-10" v-if="origin.brand">品牌：{{origin.brand}}</text>
						<text v-if="origin.spec">规格：{{origin.spec}}</text>
					</view>
				</view>
				<view class="item"></view>
			</view>
			<view class="u-flex u-flex-items-center u-flex-between">
				<view class="item">
					<view class="content-price u-line-1 u-error">
						<template v-if="origin.list_attr[0].price == 0">
							面议
						</template>
						<template v-else>
							￥{{origin.list_attr[0].price}}
						</template>
					</view>
				</view>
				<view class="item u-flex u-flex-items-center">
					<view class="">
						<i class="custom-icon-tims custom-icon text-primary u-font-36"></i>
					</view>
					<view class="u-m-l-30">
						<u-button type="primary" size="small">询盘</u-button>
					</view>
				</view>
			</view>
			 
		</view>
	</view>	
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name: 'chemnetCpyCard',
		props: {
			origin: {
				type: Object,
				default: () => {
					return {}
				}
			}, 
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				page: state => state.user.page,
			}), 
			themeConfig() {
				return this.typeConfig.chemnet
			}
		},
		data() {
			return {
				list: []
			};
		}, 
		mounted() { 
		},
		created() { 
		},
		methods: {
			...mapMutations({
				setMoreMenus: 'user/setMoreMenus',
				setMoreMenusNew: 'user/setMoreMenusNew',
				setWdMenus: 'user/setWdMenus',
				setBrokerMenus: 'user/setBrokerMenus',
				setDingyue: 'user/setDingyue',
				setNewMsg: 'user/setNewMsg',
				setPage: 'user/setPage'
			}), 
		}
	};
</script> 
<style scoped lang="scss">
	.card {
		// background-color: #fff;
		font-size: 14px;;
	}
	.item-content {
		width: calc(100vw - 160px);
		height: 80px;
	}
	.content-sub {
		color: #999;
		font-size: 14px;
		min-height: 20px;
	}
	.content-title {
		
	}
	.content-price {
		font-size: 16px;
		// font-weight: bold;
	}
</style>
