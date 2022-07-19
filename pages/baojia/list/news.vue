<template>
	<view class="w">
		<view class="list u-p-l-20 u-p-r-20">
			<u-list
				height="100%"
				enableBackToTop
				@scrolltolower="scrolltolower"
				:preLoadingScreen="100"
			>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="item.id"
				>
					<view class="u-p-20 bg-white item-card u-m-t-20" @click="handleGoto({url: '/pages/baojia/list/news_detail', params: {id: item.id, mode: item.mode}})">
						<view class="u-flex u-flex-items-start u-flex-between u-p-b-10">
							<view class="text-primary">{{item.title}}</view>
							<view class="u-font-28 text-base u-text-right u-p-t-5" style="flex: 0 0 100px">{{item.post_date | date2timestamp | timeFrom}}</view>
						</view>
						
						
						<!-- <view class="u-p-10"></view> -->
					</view>
					
				</u-list-item>
				
				<template name="dataStatus">
					<template v-if="indexList.length == 0">
						<u-empty
							mode="data"
							:icon="typeConfig.white.empty"
						>
						</u-empty>
					</template>
					<template v-else>
						<u-loadmore
							:status="loadstatus"
						/>
					</template>
				</template>
			</u-list>
		</view>
		
		<menusBar theme="white" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import uniDatetimePicker from '@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				id: ''
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id = options.id
				this.customShareParams.id = options.id
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
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.ppiNews({
					params: {
						p: this.curP,
						id: this.id
					}
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.indexList = [...this.indexList, ...res.list]
					if(res.list.length == 0) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
				
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
		height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.u-content {
		// max-height: 60px;
		overflow: hidden;
		color: #333;
	}
	.item-card {
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
	}
	.w {
		height: 100vh;
	}
	.list {
		height: calc(100% - env(safe-area-inset-bottom) - 50px);
		
	}
</style>
