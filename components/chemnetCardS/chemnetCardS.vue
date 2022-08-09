<template>
	<view class="card u-p-30 bg-white">
		<view class="card-header ">
			<view class="item u-m-b-10 title">{{origin.ads_title}}</view>
			<view class="item u-m-b-20 web">{{origin.ads_website}}</view>
		</view>
		<u-line color="#ccc"></u-line>
		<view class="card-main u-p-t-20 ">
			<rich-text class="intro" :nodes="origin.ads_text"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'chemnetCardS',
		props: {
			origin: {
				type: Object,
				default: () =>{
					return {}
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			copy(obj) {
				uni.setClipboardData({
					data: obj,
					success: function () {
						uni.showToast({
							title: '复制成功'
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		border-radius: 10px;
	}
	.title {
		font-weight: bold;
		color: #007aff;
	}
	.web {
		font-size: 14px;
		color: #999;
	}
	.intro {
		color: #333;
		word-break: break-all;
	}
</style>