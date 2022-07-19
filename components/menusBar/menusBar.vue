<template>
	<view class="tabbar" :style="{
		'boxShadow':  `0 0 10rpx rgba(${theme == 'white' ? '90,90,90,.4' : '0,0,0,.1'})`
	}">
		<u-tabbar
			:value="activeIndex"
			:inactiveColor="themeConfig.tabTextInactive"
			:activeColor="themeConfig.tabTextActive"
			:customStyle="style"
			:border="false"
		>
			
			<u-tabbar-item 
				:text="item.name" 
				:icon="item.icon" 
				v-for="item in list" 
				:key="item.name"
				@click="handleClick"
			>
				<image
					class="u-page__item__slot-icon"
					slot="active-icon"
					:src="item[`${theme}_icon_2`]"
				></image>
				<image
					class="u-page__item__slot-icon"
					slot="inactive-icon"
					:src="item[`${theme}_icon_1`]"
				></image>
			</u-tabbar-item>
				
		</u-tabbar>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		props: {
			theme: {
				type: String,
				default: 'white'
			},
			border: {
				type: Boolean,
				default: false
			},
			activeIndex: {
				type: Number,
				default: -1
			}
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig
			}),
			themeConfig() {
				return this.typeConfig[this.theme]
			},
			style() {
				return {
					backgroundColor: this.themeConfig.tabBg
				}
				
			}
		},
		data() {
			return {
				active: 0,
				list: []
			};
		},
		created() {
			this.getData();
		},
		methods: {
			...mapMutations({
				setMoreMenus: 'user/setMoreMenus',
				setMoreMenusNew: 'user/setMoreMenusNew',
				setNewMsg: 'user/setNewMsg'
			}),
			async getData() {
				const res = await this.$api.getMenus();
				if(res.code == 1) {
					this.list = res.list
					this.setNewMsg(res.news)
					this.setMoreMenusNew(res.new_memu)
					this.setMoreMenus({
						menusList: res.wd_memu,
						menusTitle: res.wd_memu_name,
						menusShow: res.wd_memu_show,
					})
				}
			},
			handleClick(index) {
				const item = this.list[index]
				if(item.type == 1 ){
					uni.reLaunch({
						url: item.url
					})
				}
				else if(item.type == 2 ){
					uni.redirectTo({
						url: item.url
					})
				}
				else if(item.type == 3 ){
					uni.navigateTo({
						url: item.url
					})
				}
				
				
				
			}
		}
	};
</script>
<style lang="scss">
	.tabbar {
		/deep/ .u-tabbar-item__icon {
			width: auto!important;
		}
	}
	
</style>
<style scoped lang="scss">
	.tabbar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 50;
	}
	.u-page__item__slot-icon {
	    width: 17px;
	    height: 17px;
	}
</style>
