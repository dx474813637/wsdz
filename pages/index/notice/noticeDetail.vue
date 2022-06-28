<template>
	<view class="w u-p-20">
		<view class="u-text-center u-p-20 u-m-b-20 text-base u-font-28">{{list.uptime}}</view>
		<u-parse :content="list.info"></u-parse>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				list: '',
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			}else {
				uni.navigateBack()
			}
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async getData() {
				const res = await this.$api.noticeDetail({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.list = res.list
					uni.setNavigationBarTitle({
						title: res.list.title
					})
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
</style>
