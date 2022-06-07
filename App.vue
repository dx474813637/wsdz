<script>
	import routingIntercept from '@/config/permission.js'
	import store from '@/store'
	
	export default {
		onLaunch: async function() {
			store.dispatch('user/wode')
			routingIntercept()
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '@/common/ext.scss';
	@import '@/common/iconfont.css';
</style>
