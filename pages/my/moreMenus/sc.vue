<template>
	<view class="u-p-20 u-font-28">
		<u-tabs
			:list="tabs_list"
			:current="tabs_current"
			lineHeight="0"
			:activeStyle="{...activeTabsStyle, color: '#007aff'}"
			:inactiveStyle="{ color: '#333'}"
			:itemStyle="itemTabsStyle"
			@change="handleTabsChange"
		></u-tabs>
		<view class="bg-white u-p-20 u-m-b-20" v-if="tabs_current == 0">
			<u-parse :content="infoa"></u-parse>
		</view>
		<view class="bg-white u-p-20" v-if="tabs_current == 1">
			<u-parse :content="infob"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs_current: 0,
				tabs_list: [
					{
						name: '采购基金',
						disabled: false,
					},
					{
						name: '数字供应链',
						disabled: false,
					},
				],
				activeTabsStyle: {
					fontSize: '32rpx',
					color: '#fff',
					fontWeight: 'bold'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				infoa: '',
				infob: '',
			};
		},
		async onLoad() {
			uni.showLoading()
			await this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.scm();
				if(res.code == 1) {
					this.tabs_list[0].name = res.infoa_name
					this.tabs_list[1].name = res.infob_name
					this.infoa = res.infoa
					this.infob = res.infob
					uni.setNavigationBarTitle({
						title: res.title
					})
				}
			},
			
			async handleTabsChange(obj) {
				this.tabs_current = obj.index
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
		
	}
</style>
<style lang="scss">

</style>
