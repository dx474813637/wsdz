<template>
	<view class="u-p-20 u-font-28">
		<view class="bg-white u-p-20 u-m-b-20" v-if="info">
			<u-parse :content="info"></u-parse>
		</view>
		<view class="bg-white u-p-20" v-if="list">
			<u-parse :content="list"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: '',
				list: '',
			};
		},
		async onLoad() {
			uni.showLoading()
			await this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.blacklist();
				if(res.code == 1) {
					this.info = res.info
					this.list = res.list
					uni.setNavigationBarTitle({
						title: res.title
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f8f8f8;
		
	}
</style>
<style lang="scss" scoped>
	.title {
		
	}
	.main {
		
	}
</style>
