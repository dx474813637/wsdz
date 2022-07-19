<template>
	<view class="card u-p-t-20 u-p-b-20 bg-white">
		<u-cell-group :border="false">
			<u-cell icon="home" title="名称" :value="origin.company" v-if="origin.company" @click="copy(origin.company)">
				<view class="u-p-t-8" slot="right-icon">
					<i class="custom-icon-fuzhi custom-icon"></i>
				</view>
			</u-cell>
			<u-cell icon="account" title="联系人" :value="origin.contact" v-if="origin.contact" @click="copy(origin.contact)">
				<view class="u-p-t-8" slot="right-icon">
					<i class="custom-icon-fuzhi custom-icon"></i>
				</view>
			</u-cell>
			<u-cell icon="phone" title="手机" :value="origin.mobile" v-if="origin.mobile" @click="copy(origin.mobile)">
				<view class="u-p-t-8" slot="right-icon">
					<i class="custom-icon-fuzhi custom-icon"></i>
				</view>
			</u-cell>
			<u-cell icon="phone" title="电话" :value="origin.tel" v-if="origin.tel" @click="copy(origin.tel)">
				<view class="u-p-t-8" slot="right-icon">
					<i class="custom-icon-fuzhi custom-icon"></i>
				</view>
			</u-cell>
			<u-cell icon="email" title="邮箱" :value="origin.email" v-if="origin.email" @click="copy(origin.email)">
				<view class="u-p-t-8" slot="right-icon">
					<i class="custom-icon-fuzhi custom-icon"></i>
				</view>
			</u-cell>
			<u-cell icon="map" title="地址" :value="origin.address" v-if="origin.address" @click="copy(origin.address)">
				<view class="u-p-t-8" slot="right-icon">
					<i class="custom-icon-fuzhi custom-icon"></i>
				</view>
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		name: 'chemnetCard',
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
</style>