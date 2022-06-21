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
					refresher-enabled
					:refresher-default-style="typeActive == 'dark'? 'white': 'black'"
					:refresher-triggered="refresher"
					@refresherrefresh="scrolltoupper"
				>
					
					<view
						id="msglistview"
					>
						<view class="u-p-10">
							<u-loadmore
								:status="loadstatus"
								:loadmore-text="loadmoreText" 
							/>
						</view>
						<template v-if="list.length == 0">
							<u-empty
								mode="data"
								:icon="themeConfig.empty"
								marginTop="80"
								text='暂无消息'
								:textColor="themeConfig.pageTextSub"
							>
							</u-empty>
						</template>
						
						<view
							v-for="(item, index) in list"
							:key="item.id"
							:id="item.id"
							class="u-p-b-20"
						>
							<u-transition show >
								<MsgChatCard
									:msg="item"
									@reset="handleResetMsg"
								></MsgChatCard>
							</u-transition>
							
							
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
						@click="sendMsg"
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
				login: '',
				loading: true,
				indexList: [],
				sendingList: [],
				cpy: {},
				refresher: false,
				curP: 1,
				loadstatus: 'loadmore',
				loadmoreText: '下拉刷新历史消息',
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
				myLogin: state => state.user.login,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sys: 'theme/sys'
			}),
			paramsObj() {
				return {
					// p: this.curP,
					login: this.login
				}
			},
			list() {
				return this.filterData([...this.indexList, ...this.sendingList].sort((a,b) => b.sendtime - a.sendtime)).reverse()
			},
			title() {
				return this.cpy.name || this.login
			}
		},
		
		async onLoad(options) {
			if(options.hasOwnProperty('login')) {
				this.login = options.login
			}else {
				uni.reLaunch({
					url: '/pages/my/msg/msg',
					success() {
						uni.showToast({
							title: 'login参数有误',
							icon: 'none'
						})
					}
				})
				return
			}
			this.getInfo()
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
			async getInfo() {
				const res = await this.$api.getCompanyDetail({params: {login: this.login}});
				if(res.code == 1) {
					this.cpy = res.list
				}
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
				this.refresher = true
				const target = this.indexList[0]?.id
				await this.getData('history')
				if(this.target) this.target = target
				else this.scrollToBottom()
				this.refresher = false
			},
			async getData(type = 'new') {
				if(this.loadstatus != 'loadmore' && type != 'new') return
				this.loadstatus = 'loading'
				let func = type == 'new' ? 'timsNews' : 'timsNewsHistory'
				const res = await this.$api[func]({params: this.paramsObj})
				
				if(res.code == 1) {
					this.loading = false
					if(type == 'new') this.indexList = [...this.indexList, ...res.list.reverse()] //新消息 拼接
					else this.indexList = res.list.reverse() //历史消息 覆盖数据
					
					// this.cpy = res.cpy
					// console.log(this.indexList)
					// if(type == 'history') {
					// 	this.loadstatus = 'nomore'
					// }else {
						this.loadstatus = 'loadmore'
					// }
				}
			},
			async getMoreData(type) {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData(type)
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
						ele.pre = (ele.sender == data[index + 1].sender ? '1' : '0')
						ele.showTime = Math.abs(ele.sendtime - data[index + 1].sendtime) > 5*60  ? '1' : '0'
					}
					
				})
				return data
			},
			lunxun() {
				if(this.timer) return;
				clearInterval(this.timer)
				this.timer = null
				this.timer = setInterval(async () => {
					this.lunxunLoading = true;
					let flag = await this.getData('new')
					
					// this.$nextTick(() => {
					// 	this.scrollToBottom()
					// })
					this.lunxunLoading = false;
				}, 10000)
			},
			async sendMsg() {
				console.log(this.val)
				if(!this.val) {
					uni.showToast({
						title: '不能发送空的内容'
					})
					return
				}
				let obj = this.toSendingList(this.val)
				this.val = ""
				this.$nextTick(() => {
					this.scrollToBottom()
				})
				const res = await this.$api.timsSend({login: this.login, body: obj.body});
				let i = this.sendingList.findIndex(ele => ele.id == obj.id)
				
				if(res.code == 1) {
					const flag = await this.getData('new')
					this.sendingList.splice(i, 1)
					
					this.indexList.push(obj)
					this.indexList[this.indexList.length - 1].state = 'success'
					this.$nextTick(() => {
						if(flag) this.scrollToBottom()
					})
				}else {
					
					this.sendingList[i].state = 'error'
				}
			},
			toSendingList(val) {
				let id = "send_" + new Date().getTime()
				let data = {
						body: val,
						id: id,
						receiver: this.login,
						sender: this.myLogin,
						sendtime: new Date().getTime()/1000,
						state: 'loading',
						showTime: this.sendingList.length == 0? '1' : '0',
						pre: '1'
					}
				this.sendingList.push(data)
				return data
			},
			handleResetMsg(data) {
				uni.showModal({
					title: '提示',
					content: '重发该条消息？',
					success: async (result) => {
						if (result.confirm) {
							this.sendingList.splice(this.sendingList.findIndex(ele => ele.id == data.id), 1)
							let obj = this.toSendingList(data.body)
							
							const res = await this.$api.timsSend({login: this.login, body: data.body});
							let i = this.sendingList.findIndex(ele => ele.id == obj.id)
							if(res.code == 1) {
								await this.getData('new')
								obj.state = 'success'
								this.sendingList.splice(i, 1)
								this.indexList.push(obj)
							}else {
								this.sendingList[i].state = 'error'
							}
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				});
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
