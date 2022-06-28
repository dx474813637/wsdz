<template>
	<view>
		<u-navbar
			:fixed="fixed"
			:bgColor="themeConfig.navBg" 
		>
			<template v-slot:left>
				<view class="u-flex u-flex-items-center">
					<view class="btn u-m-r-20" @click="handleBack" v-if="backBtn">
						<i class="custom-icon custom-icon-back"
							:style="{color: typeActive == 'white'? '#666' :themeConfig.themeIconColor}"
						></i>
					</view>
					<view class="btn" @click="handleChangeTheme">
						<i class="custom-icon"
							:class="{
								'custom-icon-yejianmoshi': typeActive == 'dark',
								'custom-icon-baitianmoshi': typeActive == 'white',
							}"
							:style="{color: themeConfig.themeIconColor}"
						></i>
					</view>
					<view @click="handleGoto({url: '/pages/index/index', type: 'reLaunch'})" class="btn u-m-l-20">
						<i class="custom-icon custom-icon-zhuye2"
							:style="{color: typeActive == 'white'? '#007aff' :themeConfig.themeIconColor}"
						></i>
					</view>
				</view>
				
			</template>
			<template v-slot:center>
				<slot>
					<text class="u-line-1" :style="[titleStyle]">
						{{title}}
					</text>
				</slot>
			</template>
		</u-navbar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"navBar",
		props: {
			fixed: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '',
			},
			backBtn: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig'
			}),
			titleStyle() {
				return {
					color: this.themeConfig.navText,
				}
			}
		},
		methods: {
			...mapMutations({
				setTheme: 'theme/setTheme',
				setNavColor: 'theme/setNavColor',
				handleGoto: 'user/handleGoto'
			}),
			handleChangeTheme() {
				this.setTheme(this.typeActive == 'dark' ? 'white' : 'dark')
				this.setNavColor()
			},
			handleBack() {
				this.$emit('backEvent')
			}
		}
	}
</script>

<style lang="scss">

</style>
