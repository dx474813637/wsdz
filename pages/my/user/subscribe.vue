<template>
	<view class="w u-p-15"> 
		<view class="u-p-20 bg-white u-radius-10 uni-shadow-base">
			<view class="header u-flex u-flex-items-center u-p-10 u-m-b-20">
				<view class="item">
					<i class="custom-icon-zhifeiji custom-icon" style="font-size: 38px;color: #fd6212;"></i>
				</view>
				<view class="item u-m-l-20">
					<view class="u-m-b-5 u-font-34">EDM、短信推广</view>
					<view class="text-base u-font-28">每个账号每天限发10条，选中单条发送</view>
				</view>
			</view>
			<view class="tabs-w">
				<u-tabs
					:list="tabs_list"
					:current="tabs_current"
					lineHeight="0"
					:activeStyle="activeTabsStyle"
					:itemStyle="itemTabsStyle"
					@change="handleTabsChange"
				></u-tabs>
			</view>
			<view class="main u-p-20">
				<template v-if="tabs_current == 0">
					<view class="send-cate">
						<view @click="show_cate = true">
							<u--input
								placeholder="选择类别"
								:value="type"
								readonly 
								suffixIcon="arrow-down"
								suffixIconStyle="color: #909399"
								></u--input>
						</view>
						<view class="u-flex u-flex-items-center u-flex-center loading-w" v-if="loading || loading_cpy">
							<u-loading-icon mode="circle" ></u-loading-icon>
						</view>
					</view>
					<view class="cpylist u-m-t-30">
						<view class="u-flex u-flex-items-center u-flex-center" style="height: 200px;" v-if="loading_cpy">
							<u-loading-icon mode="circle" ></u-loading-icon>
						</view>
						<view class="" v-else-if="indexList.length == 0">
							<u-empty
								mode="data"
								:icon="typeConfig.white.empty"
								:text="type? '列表为空，请重新选择类别' : '请先选择类别'"
							>
							</u-empty>
						</view>
						<view v-else class="item u-p-15 u-m-b-20 u-font-32 u-radius-5 u-flex u-flex-items-start "
							v-for="(item, index) in indexList"
							:key="item.id"
							@click="handleClick(item)"
							:class="{
								loading: loading_send
							}"
							>
								<view class="u-flex-1">
									{{item.a1}}
								</view>
								<view class="u-p-l-20" v-if="send_id == item.id && loading_send">
									<u-loading-icon mode="circle" size="20" color="#007aff" ></u-loading-icon>
								</view>
								
							</view>
					</view>
				</template>
				<template v-else>
					<view class="cpylist u-m-t-30"> 
						<view class="u-flex u-flex-items-center u-flex-center" style="height: 200px;" v-if="loading_cpy">
							<u-loading-icon mode="circle" ></u-loading-icon>
						</view>
						<view class="" v-else-if="logList.length == 0"> 
							<u-empty
								mode="data"
								:icon="typeConfig.white.empty"
								text="发送记录为空"
							>
							</u-empty>
						</view>
						<view v-else class="item u-p-20 u-m-b-20 u-font-32 u-radius-5 "
							v-for="(item, index) in logList"
							:key="item.id"  
							>
								<view class=" u-m-b-10 u-font-28" style="color: #679bc7;">
									{{item.uptime}}
								</view>  
								<view class=" ">
									{{item.a1}}
								</view>  
							</view>
					</view>
				</template>
			</view>
		</view>
		<u-picker 
			:show="show_cate" 
			ref="uPicker" 
			title="分类"
			closeOnClickOverlay
			:columns="columns_cate" 
			@confirm="cateConfirm" 
			@cancel="show_cate = false" 
			@close="show_cate = false" 
			></u-picker>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				loading: false,
				loading_cpy: false,
				loading_send: false,
				send_id: '',
				cateList: [],
				logList: [],
				indexList: [],
				type: '',
				show_cate: false,
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '34rpx',
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				tabs_list: [
					{
						name: '我要发送推广',
						disabled: false, 
					},
					{
						name: '我的发送记录',
						disabled: false, 
					},
				],
			};
		},
		async onLoad() {
			uni.showLoading()
			await this.getIndex() 
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			columns_cate() {
				if(this.cateList.length == 0) return []
				return [
					this.cateList.map(ele => ele.type)
				]
			}
		},
		watch: {
			type(n) {
				if(n) {
					this.getCpy()
				}
			}
		},
		methods: {
			cateConfirm(e) {
				console.log('confirm', e) 
				this.type = e.value[0]
				this.show_cate = false
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(value) {
				this.changeTabsStatus('disabled', true)
				this.tabs_current = value.index 
				 if(value.index == '0' && !this.loading ) { 
					await this.getIndex()
				 }
				this.changeTabsStatus('disabled', false)
			},
			async getIndex() {
				this.loading = true
				const res = await this.$api.extension_msg_index()
				if(res.code == 1) {
					this.cateList = res.list
					this.logList = res.log
				}
				this.loading = false
			},
			async getCpy() {
				this.loading_cpy = true
				const res = await this.$api.extension_msg_list({
					params: {
						type: this.type
					}
				})
				if(res.code == 1) {
					this.indexList = res.list 
				}
				this.loading_cpy = false
			},
			handleClick(data) {
				if(this.loading_send ) return
				uni.showModal({
					title: '推送确认',
					content: `当前选中：${data.a1}`,
					success: async (res) => {
						if (res.confirm) {
							this.loading_send = true
							this.send_id = data.id
							await this.send(data.id)
							this.loading_send = false
							this.send_id = ''  
							await this.getCpy()
							await this.getIndex()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async send(id) {
				// uni.$u.sleep(3500)
				const res = await this.$api.extension_msg_send({
					params: {
						id: this.send_id, 
					}
				})
				if(res.code == 1) {
					uni.showToast({
						title:res.msg
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2; 
	}
</style>
<style lang="scss" scoped> 
	.w {
		
	}
	.main {
		border-top: 1rpx solid #d3e5f0;
		min-height: 50vh;
	}
	.send-cate {
		position: relative;
		.loading-w {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(255,255,255,.5);
			z-index: 50;
		}
	}
	.cpylist {
		.item {
			border: 1rpx solid #c1d9ff;
			background-color: #f2f8ff;
			line-height: 20px;
			color: #005cce;
			transition: all .3s;
			&.loading {
				color: #999;
				background-color: #f8f8f8;
				border-color: #eee;
			}
		}
	}
</style>
