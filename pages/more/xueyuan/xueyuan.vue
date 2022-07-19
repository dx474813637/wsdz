<template>
	<view class="w">
		<view class="tabs-w bg-white">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			>
				<view
					slot="right"
					class="u-p-r-20 u-p-l-30 u-flex u-flex-items-center u-border-left text-base" 
					
				>
					<view class="u-flex u-flex-items-center u-m-r-20"
						@click="handleShipin(1)"
						:class="{
							'text-primary': shipin == 1
						}"
					>
						<text class="u-p-r-8 u-font-28">视频</text>
						<i class="custom-icon-video custom-icon text-base u-font-28"
						:class="{
							'text-primary': shipin == 1
						}"></i>
					</view>
					<view class="u-flex u-flex-items-center"
						@click="handleShipin(2)"
						:class="{
							'text-primary': shipin == 2
						}">
						<text class="u-p-r-8 u-font-28">图文</text>
						<i class="custom-icon-image custom-icon text-base u-font-28"
						:class="{
							'text-primary': shipin == 2
						}"></i>
					</view>
					
				</view>
			</u-tabs>
		</view>
		<view class="search-wrapper u-flex u-p-l-20 u-p-r-20 bg-white">
			<view class="item u-flex-1 u-p-b-10">
				<u-search 
					placeholder="搜索" 
					v-model="keyword"
					clearabled
					:showAction="false"
					bgColor="#eee"
					@search="handleSearch"
				></u-search>
			</view>
			
		</view>
		<view class="list ">
			<scroll-view
				scroll-y 
				class="list-scroll"
				scroll-with-animation
				enable-back-to-top	
				@scrolltolower="scrolltolower"
				>
				<view class="u-p-20">
					<custom-waterfalls-flow
						ref="waterfallsFlowRef" 
						:value="indexList" 
						:column="column" 
						:columnSpace="1.5" 
						:seat="2" 
						:listStyle="listStyle"
						@wapperClick="handleClick" 
						@imageClick="handleClick" 
						@loaded="loaded">
						<view class="item-w u-p-20"
							v-for="(item, index) in indexList"
							:key="item.id"
							 slot="slot{{index}}"
						>
							<view class="card-main u-font-30">
								<view class="u-line-2">
									<text v-if="item.shipin == 1" class="label-v custom-icon-videofill custom-icon"></text>
									<text>{{item.title}}</text>
								</view>
							</view>
						</view>
					</custom-waterfalls-flow>
				</view>
				
					
				
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
			</scroll-view>
			
				
		</view>
		
		<menusBar  theme="white" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				column: 2,
				keyword: '',
				tabs_current: 0,
				activeTabsStyle: {
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				tabs_list: [
					{
						name: '全部',
						disabled: false,
						id: '',
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				shipin: 0,
				listStyle: {
					boxShadow: '0 0 10px rgba(0,0,0,.1)'
				}
			};
		},
		onLoad() {
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			paramsObj() {
				return {
					p: this.curP,
					terms: this.keyword,
					cate: this.tabs_list[this.tabs_current]?.id,
					shipin: this.shipin
				}
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async handleTabsChange(value) {
				this.tabs_current = value.index
				this.keyword = ""
				this.changeTabsStatus('disabled', true)
				uni.showLoading();
				this.initParamas();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			handleSearch() {
				uni.showLoading()
				this.refreshList()
			},
			loaded(e) {
				console.log(e)
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.xueyuan({
					params: this.paramsObj
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					if(this.tabs_list.length == 1) {
						this.tabs_list = [...this.tabs_list, 
								...res.cate.map(ele => {
									ele.disabled = false
									return ele
								})
							]
					}
					
					this.indexList = [...this.indexList, ...res.list.map(ele => {
						ele.image = ele.img;
						return ele
					})]
					if(this.curP == 1) this.$refs.waterfallsFlowRef.refresh();
					if(this.indexList.length >= res.total) {
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
			handleShipin(ship) {
				if(this.shipin == ship) ship = 0
				this.shipin = ship
				uni.showLoading()
				this.refreshList()
			},
			handleClick(data) {
				if(data.shipin == 1) {
					wx.openChannelsActivity({
						finderUserName: data.sph,
						feedId: data.feedid,
						success(res) {
							console.log(res)
						}
					})
				}else {
					this.handleGoto({
						url: '/pages/more/xueyuan/xueyuan_detail',
						params: {
							id: data.id
						}
					})
				}
			}
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
	.item-w {
		// width: 50%;
		// flex: 0 0 50%;
		box-sizing: border-box;
	}
	.label-v {
		
		color: #b400ff;
		margin-right: 5px;
		font-size: 16px;
		// padding: 2px 5px;
		// background-color: #b400ff;
		// border: 1rpx solid #007aff;
		// border-radius: 4px; 
	}
	.item-card {
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
		overflow: hidden;
		background-color: #fff;
		.card-header {
			position: relative;
			.video-icon {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,0.2);
			}
		}
	}
		.card-main {
			line-height: 22px;
		}
	.u-content {
		// max-height: 60px;
		overflow: hidden;
		color: #333;
	}
	.w {
		height: 100vh;
	}
	.list {
		height: calc(100% - 133px - env(safe-area-inset-bottom));
		
		.list-scroll {
			height: 100%;
		}
	}
</style>
