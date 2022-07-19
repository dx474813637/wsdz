<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {
			this.$api.loginUidLog({params: {login: options.login}})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>
