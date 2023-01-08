<template>
	<view class="wrap u-p-20 u-p-t-10 u-p-b-10 u-font-28"
		:style="{
			backgroundColor: themeConfig.pan.boxBg, 
			color: themeConfig.pan.baseText
		}"
	>
		<view class="u-flex u-flex-between u-flex-items-center u-p-20 u-p-t-10 u-p-b-10" >
			<view>{{item.Company.name}}</view>
			<view>{{item.state}}</view>
		</view>
		<view class="u-flex u-flex-between u-flex-items-center u-p-20 u-p-t-10 u-p-b-10">
			<view>单：{{item.unit_price1}}元/{{unit}}</view>
			<view>量：{{item.amount}}{{unit}}</view>
			<view>总：{{item.price1}}元</view>
		</view> 
		<view class="u-flex u-flex-between u-flex-items-center u-p-20 u-p-t-10 u-p-b-10">
			<view :style="{
			color: themeConfig.pan.pageTextSub,  
		}">{{item.ctime1}}</view> 
		</view> 
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"jpCard",
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			unit: {
				type: String,
				default: 'unit'
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				echartsConfig: 'theme/echartsConfig',
				sys: 'theme/sys'
			}), 
		},
	}
</script>

<style lang="scss" scoped>
	.wrap {
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
</style>