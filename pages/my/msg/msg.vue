<template>
	<view class="text-white w " :style="{
		backgroundColor: themeConfig.pageBg
	}">
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar 
				:title="title"
				backBtn
				@backEvent="handleBackEvent"
				></navBar>
		</view>
		<view class="list" :style="{
			height: `calc(100% - 44px - ${sys.statusBarHeight}px - ${sys.safeAreaInsets.bottom}px)`
		}">
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				title: '消息列表'
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sys: 'theme/sys'
			}),
		},
		methods: {
			handleBackEvent() {
				uni.navigateBack()
			},
		}
	}
</script>


<style lang="scss">
	page {
		height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.w {
		height: 100vh;
	}
</style>
