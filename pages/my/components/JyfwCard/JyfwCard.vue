<template>
	<view class="wrapper u-radius-10 uni-shadow-base bg-white u-p-15" @click="handleDetail">
		<view class="card u-flex u-flex-items-center u-flex-between u-p-10 u-p-l-20 u-p-r-20 u-border-bottom">
			<view class="item">
				{{detailData.name}}
			</view>
			<view class="item u-font-24" >
				{{detailData.ctime}}
			</view>
		</view>
		<view class="main u-p-10 u-p-l-20 u-p-r-20 u-font-30 text-base">
			<view class="rows u-flex u-flex-items-center u-flex-between u-m-b-20">
				<view class="item" style="flex: 0 0 80px"> 
					排序：{{detailData.rank}}
				</view>
				<view class="item  u-flex u-flex-items-center" > 
					<view class="u-m-l-15" @click.stop="handleGoto({
						url: '/pages/my/fx/fxgx_add',
						params: {
							pid: detailData.pid
						}
					})"  >
						<u-button type="primary" size="small" plain shape="circle">查看待分销</u-button>
					</view>
					<view class="u-m-l-15" @click.stop="handleGoto({
						url: '/pages/my/fx/fxgx_list',
						params: {
							pid: detailData.pid
						}
					})"  >
						<u-button type="primary" size="small" plain shape="circle">我的分销</u-button>
					</view>
				</view>
			</view>
			<view class="rows u-flex u-flex-items-center u-flex-between u-m-t-10">
				<view class="item u-flex u-flex-items-center"> 
					<view class="u-m-r-15" @click.stop="handleGoto({
						url: '/pages/my/fx/fxmp_list',
						params: {
							pid: detailData.pid
						}
					})"  >
						<u-button type="primary" size="small" plain shape="circle">分销卖盘</u-button>
					</view>
					<view class="u-m-r-15" @click.stop="handleGoto({
						url: '/pages/my/fx/fxcjjl_list',
						params: {
							pid: detailData.pid
						}
					})" >
						<u-button type="primary" size="small" plain shape="circle">已分销订单</u-button>
					</view>
				</view>
				<view class="item u-flex u-flex-items-center">
					<view class="u-m-l-15" @click.stop="handleDelete"  >
						<u-button type="error" size="small" plain shape="circle">删除</u-button>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name: 'JyfwCard',
		props: {
			detailData: {
				type: Object,
				default: () => {
					return {}
				}
			}, 
		},
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			handleDelete() {
				uni.showModal({
					title: '提示',
					content: `是否删除？`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('delete', this.detailData)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleAudit() {
				this.$emit('audit', this.detailData)
			},
			handleDetail() {
				this.$emit('detail', this.detailData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
