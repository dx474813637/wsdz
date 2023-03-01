<template>
	<view class="waterfallList "> 
	</view>	
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name: 'waterfallList',
		props: {
			origin: {
				type: Array,
				default: () => {
					return []
				}
			}, 
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				page: state => state.user.page,
			}), 
			themeConfig() {
				return this.typeConfig.chemnet
			}
		},
		data() {
			return {
				list: []
			};
		}, 
		mounted() { 
		},
		created() { 
		},
		methods: {
			...mapMutations({
				setMoreMenus: 'user/setMoreMenus',
				setMoreMenusNew: 'user/setMoreMenusNew',
				setWdMenus: 'user/setWdMenus',
				setBrokerMenus: 'user/setBrokerMenus',
				setDingyue: 'user/setDingyue',
				setNewMsg: 'user/setNewMsg',
				setPage: 'user/setPage'
			}), 
		}
	};
</script> 
<style scoped lang="scss"> 
</style>
