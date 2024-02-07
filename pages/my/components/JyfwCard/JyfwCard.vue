<template>
	<view class="wrapper u-radius-10  u-p-10  " style="background-color: #e6f2ff;" @click="handleDetail">
		<view class="card u-flex u-flex-items-center u-flex-between u-p-10 u-p-l-25 u-p-r-25 ">
			<view class="item">
				<view class="u-font-36">{{detailData.name}}</view>
				<view class="u-info text-thin u-font-28">{{detailData.ctime}}</view>
			</view>
			<!-- <view class="item u-font-26" @click.stop="handleGoto({
				url: '/pages/my/fx/fxgx_add',
				params: {
					pid: detailData.pid
				}
			})">
				<u-button type="primary" size="small" plain shape="circle">货源中心</u-button>
			</view> -->
		</view>
		<view class="main u-font-30 text-base bg-white" >
			 
			<view class="rows u-flex u-flex-items-center u-flex-between u-p-15 " >
				<view class="item u-flex u-flex-items-center">
					<view class="u-flex u-flex-items-center u-info" @click.stop="handleDelete"  >
						<u-icon name="trash" color="#ccc" size="22"></u-icon>
						<view class="u-m-l-10">
							删除
						</view> 
					</view>
					
				</view>
				<view class="item u-flex u-flex-items-center"> 
					<!-- <view class="u-m-r-15" @click.stop="handleGoto({
						url: '/pages/my/fx/fxmp_list',
						params: {
							pid: detailData.pid
						}
					})"  >
						<u-button type="info" size="small" plain shape="circle">相关卖盘</u-button>
					</view>
					<view class="u-m-r-15" @click.stop="handleGoto({
						url: '/pages/my/fx/fxmp_list',
						params: {
							pid: detailData.pid
						}
					})" >
						<u-button type="info" size="small" plain shape="circle">相关订单</u-button>
					</view> -->
					<view class="u-m-r-15" @click.stop="handleGoto({
						url: '/pages/my/fx/fxgx_add',
						params: {
							pid: detailData.pid
						}
					})" >
						<u-button type="primary" size="small" plain shape="circle">货源中心</u-button>
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
	.wrapper {
		overflow: hidden;
	}
	
</style>
