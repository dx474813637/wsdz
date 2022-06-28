<template>
	<view class="card u-p-t-20 u-p-b-20 bg-white">
		<u-cell-group :border="false">
			<u-cell icon="home" title="名称" :value="origin.name" v-if="origin.name"></u-cell>
			<u-cell icon="account" title="联系人" :value="origin.contact" v-if="origin.contact"></u-cell>
			<u-cell icon="phone" title="手机" :value="origin.mobile" v-if="origin.mobile" isLink rightIcon="bell" @click="makecall(origin.mobile)"></u-cell>
			<u-cell icon="phone" title="电话" :value="origin.tel" v-if="origin.tel" right-icon="bell" @click="makecall(origin.tel)"></u-cell>
			<u-cell icon="email" title="邮箱" :value="origin.email" v-if="origin.email"></u-cell>
			<u-cell icon="map" title="地址" :value="origin.address" v-if="origin.address"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
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
			makecall(obj) {
				uni.makePhoneCall({
					phoneNumber: obj
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		border-radius: 10px;
	}
</style>