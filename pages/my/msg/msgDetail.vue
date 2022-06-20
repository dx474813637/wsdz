<template>
	<view class="text-white w " :class="[typeActive]" :style="{
		backgroundColor: themeConfig.pageBg,
		paddingBottom: tabHeight + 'px'
	}">
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar 
				:title="`${title}${lunxunLoading? '（更新中...）' :''}`"
				backBtn
				@backEvent="handleBackEvent"
			></navBar>
		</view>
		
		<view class="list" :style="{
			height: `calc(100% - 44px - ${sys.statusBarHeight}px - ${sys.safeAreaInsets.bottom}px)`
		}">
			<template v-if="loading">
				<view class="u-p-20 animation" v-for="item in 3" :key="item">
					<u-skeleton loading avatar animate rows="2" :title="false" avatarShape="square" avatarSize="48"></u-skeleton>
				</view>
				
			</template>
			<template v-else>
				<scroll-view
					id="scrollview"
					scroll-y
					style="height:100%;transition: all .3s"
					enable-back-to-top
					scroll-anchoring
					:scroll-top="scrollTop"
					:scroll-into-view="target"
					@scrolltoupper="scrolltoupper"
				>
					
					<view
						id="msglistview"
					>
						<template v-if="indexList.length == 0">
							<u-empty
								mode="data"
								:icon="themeConfig.empty"
								marginTop="80"
								:textColor="themeConfig.pageTextSub"
							>
							</u-empty>
						</template>
						<template v-else>
							<view class="u-p-10">
								<u-loadmore
									:status="loadstatus"
								/>
							</view>
							
						</template>
						<view
							v-for="(item, index) in indexList"
							:key="item.id"
							:id="'msg'+item.id"
							class="u-p-b-20"
						>
							<MsgChatCard
								:msg="item"
							></MsgChatCard>
							
						</view>
					</view>
					
				</scroll-view>
			</template>
		</view>
		
		<tabBar
			:theme="typeActive"
			:customStyle="{
				boxShadow: '0 0 10rpx rgba(0,0,0,.1)',
			}"
			:mainStyle="{
				height: 'auto',
				minHeight: '60px'
			}"
			>
			<view class="msg-tabbar u-flex u-flex-items-end u-flex-between u-p-20 "
				:style="{
					color: themeConfig.tabText,
					backgroundColor: themeConfig.tabBg,
				}"
			>
				<view class="content u-flex-1">
					<u--textarea 
						v-model="val" 
						placeholder="请输入内容..."
						autoHeight
						fixed
						:cursorSpacing="20"
						:customStyle="{
							background: themeConfig.msg.detail.areaBg,
							color: themeConfig.msg.detail.areaColor,
							minHeight: '40px',
							border: 0,
							boxSizing: 'border-box'
						}"
						@linechange="linechange"
						maxlength="200"
						></u--textarea>
				</view>
				<view class="btn u-p-l-20">
					<u-button
						:customStyle="{
							background: themeConfig.msg.detail.btnBg,
							color: themeConfig.msg.detail.btnColor,
							height: '40px',
							width: '80px',
							border: 0
						}"
					>发送</u-button>
				</view>
			</view>
			
		</tabBar>
	</view>
</template>

<script>
	let query
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import MsgChatCard from '@/pages/my/components/MsgChatCard/MsgChatCard.vue'
	export default {
		data() {
			return {
				id: '',
				title: '消息详情',
				loading: true,
				indexList: [],
				cpy: {},
				refresher: false,
				curP: 1,
				loadstatus: 'loadmore',
				scrollTop: 0,
				val: '',
				tabHeight: 60,
				target: '',
				timer: null,
				lunxunLoading: false,
			};
		},
		components: {
			MsgChatCard
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sys: 'theme/sys'
			}),
			paramsObj() {
				return {
					p: this.curP,
					id: this.id
				}
			},
		},
		
		async onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			}else {
				uni.reLaunch({
					url: '/pages/my/msg/msg'
				})
				return
			}
			await this.refreshList()
			this.scrollToBottom()  
			this.lunxun()
		},
		onUnload() {
			console.log('onUnload')
			clearInterval(this.timer)
			this.timer = null
		},
		mounted() {  
			query = uni.createSelectorQuery()
			query.select('#scrollview').boundingClientRect()  
			query.select('#msglistview').boundingClientRect()  
		},  
		// updated() {  
		// 	// this.scrollToBottom()  
		// },  
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			scrollToBottom() {  
				let that = this  
				
				query.exec((res) => {  
					
					if(!res[0] || !res[1]) return
					if(res[1].height > res[0].height){  
						that.scrollTop = res[1].height - res[0].height  
						// console.log(res)  
					}  
				})  
			},  
			async refreshList() {
				this.initParamas()
				await this.getData()
			},
			initParamas() {
				this.curP = 1;
				// this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			handleBackEvent() {
				uni.navigateBack()
			},
			async scrolltoupper() {
				const target = 'msg'+this.indexList[0].id
				await this.getMoreData()
				this.target = target
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				await uni.$u.sleep(1000)
				const res = await this.$api.getMsgDetail({params: this.paramsObj})
				
				if(res.code == 1) {
					this.loading = false
					res.list = this.filterData(res.list)
					if(this.curP == 1) this.indexList = res.list.reverse()
					else this.indexList = [...res.list.reverse(), ...this.indexList]
					this.cpy = res.cpy
					console.log(this.indexList)
					if(this.indexList.length >= res.total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			linechange(e) {
				// console.log(e.detail)
				if(e.detail.lineCount <= 1) this.tabHeight = 60
				else this.tabHeight = e.detail.height + 18 + 20
				this.$nextTick(() => {
					this.scrollToBottom()
				})
				
			},
			filterData(data) {
				data.forEach((ele, index) => {
					if(index == data.length - 1 ) {
						ele.pre = '0'
						ele.showTime = '1'
					}else {
						ele.pre = (ele.isMe == data[index + 1].isMe ? '1' : '0')
						ele.showTime = Math.abs(new Date(ele.time.replace(/-/g,'/')).getTime() - new Date(data[index + 1].time.replace(/-/g,'/')).getTime()) > 5*60*1000  ? '1' : '0'
					}
					
				})
				return data
			},
			lunxun() {
				if(this.timer) return;
				clearInterval(this.timer)
				this.timer = null
				this.timer = setInterval(async () => {
					if(this.refresher || this.loading || this.lunxunLoading || this.loadstatus == 'loading') return
					this.lunxunLoading = true;
					this.initParamas()
					const res = await this.$api.getMsgDetail({params: this.paramsObj})
					if(res.code == 1) {
						res.list = this.filterData(res.list)
						this.indexList = res.list
					}
					this.$nextTick(() => {
						this.scrollToBottom()
					})
					this.lunxunLoading = false;
				}, 60000)
			},
		},
	}
</script>
<style lang="scss">
	.dark /deep/ {
		.u-textarea {
			&__field {
				color: #c8dbf0!important;
			}
			textarea {
				transition: all .3s!important;
			}
		}
	}
	.white /deep/ {
		.u-textarea {
			&__field {
				color: #333!important;
			}
			textarea {
				transition: all .3s!important;
			}
		}
	}
</style>
<style lang="scss" scoped>
	
	.w {
		padding-bottom: 60px;
		height: 100vh;
		box-sizing: border-box;
	}
	.msg-tabbar {
		min-height: 60px;
		box-sizing: border-box;
		.item-btn {
			height: 100%;
			&.share-btn {
				
			}
		}
	}
</style>
