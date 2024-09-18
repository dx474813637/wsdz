<template>
	<view class="u-p-30">
		<template v-if="auth_z_view.html_view">
			<u-parse :content="auth_z_view.html_view"></u-parse>
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
				auth_z_view: {
					company_name: '',
					html_view: ''
				},
				pageLoading: true,
			};
		}, 
		async onLoad(options) { 
			await this.init()
		},
		methods: { 
			async init() {
				this.pageLoading = true
				uni.showLoading()
				try{
					await this.AUTH_Z_VIEW()  
					
				}catch(e){
					//TODO handle the exception
				}
				this.pageLoading = false 
			}, 
			async AUTH_Z_VIEW() {
				const res = await this.$api.AUTH_Z_VIEW()
				if(res.code == 1) {
					this.auth_z_view.company_name = res.list.company_name
					this.auth_z_view.html_view = res.list.html_view
				}
			}, 
		}
	}
</script>

<style lang="scss">

</style>
