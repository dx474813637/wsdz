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
		<view class="bg-white u-p-20 u-m-b-20" >
			<u-parse :content="tabs_list[tabs_current].info"></u-parse>
		</view>
		<template  v-if="company && company.hasOwnProperty('Broker')">
			<u-divider  :hairline="true" ></u-divider>
			<MoreBrokerCard
				:origin="company.Broker"
			></MoreBrokerCard>
		</template>
	</view>
	
	
</template>

<script>
	import MoreBrokerCard from '@/pages/my/components/MoreBrokerCard/MoreBrokerCard.vue'
	export default {
		data() {
			return {
				tabs_current: 0,
				tabs_list: [],
				activeTabsStyle: {
					fontSize: '32rpx',
					color: '#fff',
					fontWeight: 'bold'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				info: '',
				company: null,
			};
		},
		components: {
			MoreBrokerCard
		},
		async onLoad() {
			uni.showLoading()
			await this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.xianhuo();
				if(res.code == 1) {
					this.tabs_list = res.list.map(ele => {
						ele.disabled = false
						return ele
					})
					// this.info = res.info
					this.company = res.company
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
<style lang="scss" scoped>
	
</style>
