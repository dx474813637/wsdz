<template>
	<view>
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			this.ESIGN_QUERY_ESIGN_ACCOUNT()
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getImageBase64_readFile: 'user/getImageBase64_readFile'
			}),
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			async ESIGN_QUERY_ESIGN_ACCOUNT() {
				const res = await this.$api.ESIGN_QUERY_ESIGN_ACCOUNT()
			},
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
