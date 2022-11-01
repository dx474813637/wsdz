<template>
	<view>
		<button type="default" @click="dingyue">dingyue</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				json: null,
				tmp_id_list: null,
			};
		},
		onLoad() {
			wx.getSetting({
				withSubscriptions: true,
				success: async res => {
					console.log(res)
					const r = await this.$api.get_tmp_id_time({
						params: {
							str: JSON.stringify(res)
						}
					});
				}
			})
		},
		methods: {
			async dingyue() {
				uni.showLoading()
				const res = await this.$api.tmp_id_list();
				if(res.code == 1) {
					this.tmp_id_list = res.list ;
					this.subApi()
					
				}
			},
			subApi() {
				wx.requestSubscribeMessage({
					tmplIds: this.tmp_id_list,
					success: async (res)=>{
						if(res.KIRbQmobnZlPo5OTgaMq6kHRI_zhpwVphn0mY42NeW8 == 'reject') return
						uni.showLoading()
						const res2 = await this.$api.tmp_id_back({
							params: {
								str: JSON.stringify(res)
							}
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss">

</style>
