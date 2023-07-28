<template>
	<view>
		<view class="u-primary u-font-28 u-p-20" v-if="!style_active">
			请先选择一个海报模板列表
		</view>
		<view class="list u-flex u-flex-wrap u-flex-items-start u-p-20">
			<view class="item u-p-20"
				v-for="item in stylelist"
				:key="item.id"
			>
				<view class="card u-radius-8"
					:class="{
						active: item.id == style_active
					}"
					@click="style_active = item.id"
				>
					<u--image
						width="100%" 
						mode="scaleToFill"
						:src="item.img"
					></u--image>
					<view class="active-icon u-flex u-flex-center u-flex-items-center">
						<u-icon name="checkmark-circle-fill" size="40" color="#00ffff"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<tabBar
			theme="white"
			:customStyle="{
				'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
			}">
			<view class="pan-tabbar u-flex u-flex-items-center u-p-l-20 u-p-r-20"
				:style="{
					color: themeConfig.tabText,
					backgroundColor: themeConfig.tabBg,
				}"
			>
				<view @click="handleGoto('/pages/index/index')" class="item-btn  u-flex u-flex-items-center u-flex-center u-flex-1">
					<text>首页</text>
				</view>  
				<view class="item-btn  u-flex u-flex-items-center u-flex-center u-flex-3">
					<u-button @click="haibaoShowClick" icon="photo-fill" type="primary" shape="circle" > 
						<text class="u-p-l-10">生成海报</text>
					</u-button>
					
				</view>
			</view>
			
		</tabBar>
		<u-safe-bottom></u-safe-bottom>
		<!-- 海报确认 -->
		<u-popup
			:show="haibaoShow" 
			@close="haibaoShow = false" 
			mode="bottom" 
			bgColor="#fff"
		>
			<view class="haibao-wrap">
				<scroll-view scroll-y class="u-p-20 haibao" >
					<u--image width="100%" height="auto" :src="haibao" mode="widthFix" radius="6"></u--image>
				</scroll-view>
				<view class="u-flex u-flex-between u-p-20">
					<!-- <view class="item u-flex-1 u-p-r-10"> 
						<u-button type="primary" open-type="share"  >确认转发</u-button>
					</view> -->
					<view class="item u-flex-1 ">
						<u-button type="primary" plain @click="savePic">保存图片</u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				stylelist: [], 
				style_active: '',
				haibao: '',
				haibaoShow: false
			};
		},
		onLoad() { 
			uni.showLoading()
			this.getStyleData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				sh: state => state.user.sh,
			}),
			...mapGetters({
				sys: 'theme/sys'
			}),
			themeConfig() {
				return this.typeConfig.white
			}
		},
		 
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async getStyleData() {
				const res = await this.$api.haibao_list({
					params: {}
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.stylelist = res.list
					// this.haibao = res.haibao
					// uni.setNavigationBarTitle({
					// 	title: res.list.title
					// })
				}
			}, 
			async haibaoShowClick() { 
				if(!this.style_active) {
					uni.showToast({
						title: '请先选择一个海报背景模板',
						icon: 'none'
					})
					return
				}
				uni.showLoading()
				await this.getHaiBaoData()
				this.haibaoShow = true
			},
			async getHaiBaoData() {
				const res = await this.$api.haibao_sc({
					params: {
						id: this.style_active
					}
				})
				if(res.code == 1) { 
					this.haibao = res.list 
				}
			},
			savePic(){
				const that = this
				uni.downloadFile({
					url:this.haibao,//网络图片的地址
					success:function(res){ 
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath, //临时文件地址
							success(res) {
								uni.showToast({
									title:'保存成功',
									icon:'success'
								})
							},
							fail(err){
								console.log(err);
							}
						})
					},
					fail:function(res){
						console.log('保存错误',res);
					},
				})
			}, 
		}, 
	}
</script> 
<style lang="scss" scoped>
	.list {
		box-sizing: border-box;
		.item {
			flex: 0 0 50%;
			box-sizing: border-box;
		}
	}
	.card {
		width: 100%;
		// height: 240px;
		overflow: hidden;
		border: 2px solid #eee;
		position: relative; 
		background-color: #fff;
		box-sizing: border-box;
		&.active {
			border-color: $uni-color-primary;
			.active-icon {
				display: flex;
			}
		}
		.active-icon {
			display: none;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.3);
		}
	}
	.haibao-wrap { 
		box-sizing: border-box;
		& .haibao {
			max-height: 70vh;
			box-sizing: border-box;
			overflow: hidden;
		}
	}
	.w {
		padding-bottom: 80px;
		min-height: 100vh;
	}
	.u-content {
		line-height: 25px;
		font-weight: 300;
	}
	.pan-tabbar {
		height: 100%;
		.item-btn {
			height: 100%;
			&.share-btn {
				
			}
		}
	}
</style>
