<template>
	<view class="card u-p-20 bg-white u-radius-8  u-flex u-flex-between"
	 :class="{
		'uni-shadow-base' : shadow
	 }"
	 @click="cardClick">
		<view class="item">
			<u--image 
			showLoading 
			:src="origin.pic" 
			width="75px" 
			height="75px" 
			radius="5"
			></u--image>
		</view>
		<view class="item u-m-l-30 u-flex-1" >
			<view class="u-font-34 text-dark u-m-b-8 u-line-1" >{{origin.name}}</view>
			<view class="u-font-26 text-light u-line-3">
				<rich-text :nodes="origin.info"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"groupListCard",
		props: {
			origin: {
				type: Object,
				default:() => {
					return {}
				},
			},
			shadow: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			cardClick() {
				this.$emit('groupClick', {data: this.origin})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card { 
	}
</style>