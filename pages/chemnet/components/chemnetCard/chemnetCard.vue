<template>
	<view class="card u-flex u-flex-items-center" @click="$emit('cardClick', {origin})">
		<view class="item-img">
			<u--image fade showLoading :src="origin[imgName]" width="80px" height="80px" radius="5" ></u--image>
		</view>
		<view class="item-content u-flex-1 u-p-10 u-p-l-25 u-flex u-flex-column u-flex-between">
			<view class="content-title u-line-1 u-font-30">{{origin.name}}</view>
			<view class="content-sub u-line-1 " v-if="origin.cas_no">CAS号:{{origin.cas_no}}</view>
			<view class="u-flex u-flex-between u-flex-items-end"> 
				<view class="content-price u-line-1">
					<text :style="{color: themeConfig.themeColor}">{{origin.price || '面议'}}</text>
					<text class="u-info u-p-l-10" v-if="origin.unit" style="font-size: 14px;">元/{{origin.unit}}</text> 
				</view>
				<view class="u-info u-p-l-20">
					{{$u.timeFrom(new Date(origin.post_time).getTime())}}
				</view>
			</view>
		</view>
	</view>	
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name: 'chemnetCard',
		props: {
			origin: {
				type: Object,
				default: () => {
					return {}
				}
			}, 
			imgName: {
				type: String,
				default: 'image'
			}
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
	}
	.content-title {
		
	}
	.content-price {
		font-size: 16px;
		// font-weight: bold;
	}
</style>
