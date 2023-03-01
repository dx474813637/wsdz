<template>
	<view class="w u-p-l-20 u-p-t-20 u-p-r-20">
		<view class="u-text-center u-p-20 u-m-b-20 u-font-40">{{list.title}}</view>
		
		<view class="u-text-center u-p-20 u-m-b-20 text-base u-font-28">
			<text class="u-p-r-10" v-if="list.source">{{list.source}}</text>
			<text>{{list.pubDate}}</text>
		</view>
		<view class="u-content u-p-20">
			<u-parse :content="list.content"></u-parse>
		</view>
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
					<view class="item u-flex-1 u-p-r-10"> 
						<u-button type="primary" open-type="share"  >确认转发</u-button>
					</view>
					<view class="item u-flex-1 u-p-l-10">
						<u-button type="primary" plain @click="savePic">保存图片</u-button>
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-safe-bottom></u-safe-bottom>
		<tabBar
			theme="white"
			:customStyle="{
				'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
			}">
			<view class="pan-tabbar u-flex u-flex-items-center u-flex-around "
				:style="{
					color: themeConfig.tabText,
					backgroundColor: themeConfig.tabBg,
				}"
			>
				<view @click="handleGoto('/pages/index/index')" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<text>首页</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<view @click="handleGoto({url: '/pages/baojia/list/list', params: {id: pid, dir}})" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<text>价格大数据</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<view class="item-btn  u-flex u-flex-items-center u-flex-center">
					<u-button open-type="share" :customStyle="{
						color: themeConfig.tabText,
						backgroundColor: 'transparent',
						border: 'none',
						fontSize: '16px'
					}">
						<i class="custom-icon-forward custom-icon"></i>
						<text class="u-p-l-10">分享</text>
					</u-button>
					
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<view class="item-btn  u-flex u-flex-items-center u-flex-center">
					<u-button @click="haibaoShowClick" icon="photo-fill" :customStyle="{
						color: themeConfig.tabText,
						backgroundColor: 'transparent',
						border: 'none',
						fontSize: '16px'
					}"> 
						<text class="u-p-l-10">海报</text>
					</u-button>
					
				</view>
			</view>
			
		</tabBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				list: '',
				mode: 'event',
				id: '',
				dir: '',
				pid: '',
				haibaoShow: false,
				haibao: ''
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			}else {
				uni.navigateBack()
			}
			if(options.hasOwnProperty('mode')) {
				this.mode = options.mode
			}
			if(options.hasOwnProperty('dir')) {
				this.dir = options.dir
			}
			if(options.hasOwnProperty('pid')) {
				this.pid = options.pid
			}
			uni.showLoading()
			this.getData()
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
		
		onShareAppMessage(res) { 
			return {
				title: this.onlineControl.share_title,
				path: this.getPath(),
				imageUrl: this.haibaoShow ? this.haibao : this.onlineControl.share_img
			}; 
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async getData() {
				const res = await this.$api.ppiNewsDetail({
					params: {
						id: this.id,
						mode: this.mode
					}
				})
				if(res.code == 1) {
					this.setOnlineControl(res)
					this.list = res.list
					this.haibao = res.haibao
					uni.setNavigationBarTitle({
						title: res.list.title
					})
				}
			}, 
			haibaoShowClick() { 
				this.haibaoShow = true
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
