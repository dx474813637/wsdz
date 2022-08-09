<template>
	<view class="w  u-p-l-20 u-p-r-20 u-font-28">
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
			<template  v-if="company && company.hasOwnProperty('Broker')">
				<u-divider :text="info" :hairline="true" ></u-divider>
				<MoreBrokerCard
					:origin="company.Broker"
				></MoreBrokerCard>
			</template>
			<u-parse :content="tabs_list[tabs_current].infob"></u-parse>
		</view>
		
		<u-safe-bottom></u-safe-bottom>
		<tabBar
			theme="white"
			:customStyle="{
				'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
			}">
			<view class="pan-tabbar u-flex u-flex-items-center u-flex-around "
				:style="{
					color: themeConfig.tabText,
					backgroundColor: themeConfig.tabBg,
				}"
			>
				<view @click="handleGoto('/pages/index/index')" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<text>首页</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<view class="item-btn  u-flex u-flex-items-center u-flex-center">
					<u-button open-type="share" :customStyle="{
						color: themeConfig.tabText,
						backgroundColor: 'transparent',
						border: 'none',
						fontSize: '16px'
					}">
						<i class="custom-icon-forward custom-icon"></i>
						<text class="u-p-l-10">分享</text>
					</u-button>
					
				</view>
			</view>
			
		</tabBar>
	</view>
</template>

<script>
	// import MoreBrokerCard from '@/components/MoreBrokerCard/MoreBrokerCard.vue'
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		components: {
			// MoreBrokerCard
		},
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
				infoa: '',
				infob: '',
				info: '',
				company: null,
			};
		},
		watch: {
			tabs_current(n) {
				this.customShareParams.current = n
				this.tabs_list[this.tabs_current] && this.setOnlineControl(this.tabs_list[this.tabs_current])
			}
		},
		async onLoad(options) {
			if(options.hasOwnProperty('current')) {
				this.tabs_current = options.current*1
			}
			uni.showLoading()
			await this.getIndexData()
			
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				sh: state => state.user.sh,
			}),
			...mapGetters({
				sys: 'theme/sys'
			}),
			themeConfig() {
				return this.typeConfig.white
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async getIndexData() {
				const res = await this.$api.scm();
				if(res.code == 1) {
					this.setOnlineControl(res.list[this.tabs_current])
					this.tabs_list = res.list.map(ele => {
						ele.disabled = false
						return ele
					})
					// this.tabs_list[0].name = res.infoa_name
					// this.tabs_list[1].name = res.infob_name
					// this.infoa = res.infoa
					// this.infob = res.infob
					this.info = res.info
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
		/deep/ {
			.u-cell-group {
				.u-cell__body {
					align-items: flex-start!important;
				}
				.u-cell__body__content {
					flex: 0 0 80px!important;
				}
				.u-cell__value {
					flex: 1!important;
					text-align: right!important;
					word-break: break-all!important;
				}
			}
		}
		
	}
</style>
<style lang="scss" scoped>
	
	.w {
		padding-bottom: 80px;
		min-height: 100vh;
	}
	.pan-tabbar {
		height: 100%;
		.item-btn {
			height: 100%;
			&.share-btn {
				
			}
		}
	}
	.list {
		// border-radius: 15px;
	}
	.card {
		border-radius: 10px;
	}
</style>
