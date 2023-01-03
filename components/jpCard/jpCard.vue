<template>
	<view class="wrap u-p-20 u-p-t-10 u-p-b-10 u-font-28"
		:style="{
			backgroundColor: themeConfig.pan.boxBg, 
			color: themeConfig.pan.baseText
		}"
	>
		<view class="u-flex u-flex-between u-flex-items-center u-p-20 u-p-t-10 u-p-b-10" >
			<view>浙江网盛生意宝股份有限公司</view>
			<view>state</view>
		</view>
		<view class="u-flex u-flex-between u-flex-items-center u-p-20 u-p-t-10 u-p-b-10">
			<view>单：2400 元/吨</view>
			<view>量：1吨</view>
			<view>总：2400 元</view>
		</view> 
		<view class="u-flex u-flex-between u-flex-items-center u-p-20 u-p-t-10 u-p-b-10">
			<view :style="{
			color: themeConfig.pan.pageTextSub,  
		}">2023年1月3日 13:50:30</view> 
		</view> 
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"jpCard",
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