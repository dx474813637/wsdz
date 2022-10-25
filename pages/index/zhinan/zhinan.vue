<template>
	<view class="u-content u-p-10">
			<u-parse :content="content"></u-parse>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ``,
				list : { }
			};
		},
		async onLoad() {
			const res = await this.$api.zhinan()
			if(res.code == 1) { 
				this.content = res.list.info
				this.list = res.list 
				uni.setNavigationBarTitle({
					title: this.list.title
				});
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>
