<template>
	<view class="u-p-30">
		<template v-if="info">
			<u-parse :content="info"></u-parse>
		</template>
		
		<u-loading-page :loading="pageLoading"></u-loading-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contract_id: '',
				order_id: '',
				info: '',
				pageLoading: true,
			};
		}, 
		async onLoad(options) {
			if(options.hasOwnProperty('contract_id')) {
				this.contract_id = options.contract_id
			} 
			if(options.hasOwnProperty('order_id')) {
				this.order_id = options.order_id
			} 
			await this.init()
		},
		methods: { 
			async init() {
				this.pageLoading = true
				uni.showLoading()
				try{
					await this.getData()  
					
				}catch(e){
					//TODO handle the exception
				}
				this.pageLoading = false 
			}, 
			async getData() {
				const res = await this.$api.VIEW_CONTRACT({
					params: {
						order_id: this.order_id,
						contract_id: this.contract_id,
					}
				})
				if(res.code == 1) {
					this.info = res.list.view_html
				}
			}, 
		}
	}
</script>

<style lang="scss">

</style>
