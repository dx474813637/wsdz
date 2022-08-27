<template>
	<view class="w"> 
		<view class="tabs-w">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			>
				<view
					slot="right"
					class="u-p-r-30 text-base u-flex u-flex-items-center"  
				>
					<view class="u-flex u-flex-items-center u-font-28 u-m-l-15" style="position: relative;" @click="handleGoto({url: '/pages/my/mdu/mdu_edit', params: {type:'add', isBroker}})">
						<i class="custom-icon-roundaddfill custom-icon u-info"></i>
						<text class="u-m-l-5">MDU</text> 
					</view>
					<view class="u-flex u-flex-items-center u-font-28 u-m-l-15" style="position: relative;" @click="showFilter">
						<i class="custom-icon-filter2 custom-icon u-info"></i>
						<text class="u-m-l-5">筛选</text>
						<u-badge :isDot="isDot" absolute :offset="[0, -5]"></u-badge>
					</view>
					
				</view>
			</u-tabs>
		</view>
		
		<view class="list" >
			<u-list
				height="100%"
				enableBackToTop
				@scrolltolower="scrolltolower"
				:preLoadingScreen="100"
			>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="item.id"
				>
					<view class="u-p-10 u-p-l-20 u-p-r-20"> 
						<MduCell
							:detailData="item"
							:isBroker="isBroker"
							@detail="handleDetail"
							@audit="handleAudit"
							@delete="handleDelete"
							>
							</MduCell>
					</view>
					
				</u-list-item>
				
				<template name="dataStatus">
					<template v-if="indexList.length == 0">
						<u-empty
							mode="data"
							:icon="typeConfig.white.empty"
						>
						</u-empty>
					</template>
					<template v-else>
						<u-loadmore
							:status="loadstatus"
						/>
					</template>
				</template>
				
			</u-list>
		</view>
		
		<menusPopupMDU
			theme="white"
			:isBroker="isBroker"
			:show="showMduFilter"
			:formData="formData"
			@close="showMduFilter = false"
			@confirm="menusFilterConfirm"
			@showPopup="handleShowPopup"
			@clearForm="clearForm"
			></menusPopupMDU>
			
		<menusPopup 
			theme="white"
			:show="showProd" 
			:overlayStyle="{zIndex: '10075'}"
			@close="showProd = false"
			@confirm="menusProdConfirm"
			></menusPopup>
		
		<menusPopup 
			theme="white"
			:show="showCpy" 
			:isMyAllCpy="true"
			showMode="list"
			:overlayStyle="{zIndex: '10075'}"
			zIndex="10076"
			@close="showCpy = false"
			@confirm="menusCpyConfirm"
			></menusPopup>
			 
			<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import MduCell from '@/pages/my/components/MduCell/MduCell.vue'
	export default {
		data() {
			return {
				isBroker: '1', //是否为broker 1是 0否 
				keyword: '',
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '34rpx',
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 5px'
				},
				tabs_list: [
					{
						name: '全部',
						disabled: false,
						mdu: ''
					},
					{
						name: '生产商',
						disabled: false,
						mdu: 'M'
					},
					{
						name: '经销商',
						disabled: false,
						mdu: 'D'
					},
					{
						name: '下游用户',
						disabled: false,
						mdu: 'U'
					},
				], 
				indexList: [],
				allscore: 0,
				curP: 1,
				loadstatus: 'loadmore',
				showMduFilter: false,
				showProd: false,
				showCpy: false,
				lastFilters: {},
				formData: {
					mdu: '',
					customer_login: '',
					customer_name: '',
					pid: '',
					pid_name: '',
					state: '',
				}, 
			};
		}, 
		onLoad(options) {
			if(options.hasOwnProperty('current')) {
				this.tabs_current = Number(options.current)
			} 
			if(options.hasOwnProperty('isBroker')) {
				this.isBroker = options.isBroker 
			} 
			uni.showLoading()
			this.getData()
		},
		watch: {
			// tabs_current(n) { 
			// 	this.formData.mdu = this.tabs_list[this.tabs_current].mdu;
			// 	console.log('w1',  this.formData.mdu)
			// },
			['lastFilters.mdu'](n) {
				this.tabs_current = this.tabs_list.findIndex(ele => ele.mdu == n);
			}
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				myCpy: state => state.user.myCpy, 
				login: state => state.user.login, 
			}),  
			isDot() {
				let isDot = false
				let {customer_login, pid, state, mdu} = this.lastFilters
				if(customer_login || pid || uni.$u.test.number(state) || mdu) isDot = true
				return isDot
			},
			params() {
				console.log('c2',  this.formData.mdu)
				return { 
					p: this.curP,
					mdu: this.formData.mdu,
					customer_login: this.formData.customer_login,
					pid: this.formData.pid,
					state: this.formData.state,
				}
			},
			func() {
				return this.isBroker == 1 ? 'customer_mdu_list_mdu_broker' : 'customer_mdu_list_mdu'
			},
		}, 
		components: {
			MduCell
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async refreshList() {
				this.initParamas()
				await this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			}, 
			async menusFilterConfirm(data) {
				console.log(data) 
				const {customer_login, mdu, pid, state, customer_name, pid_name} = data;
				this.formData.customer_login = customer_login
				this.formData.mdu = mdu
				this.formData.pid = pid
				this.formData.state = state
				this.formData.customer_name = customer_name
				this.formData.pid_name = pid_name
				this.showMduFilter = false
				uni.showLoading()
				await this.refreshList()
			},
			async menusProdConfirm(data) {
				console.log(data) 
				this.formData.pid = data.pid
				this.formData.pid_name = data.name
				this.showProd = false
			},
			async menusCpyConfirm(data) {
				console.log(data)
				this.formData.customer_login = data.login
				this.formData.customer_name = `${data.to_contact} - ${data.to_name}` 
				this.showCpy = false
			},
			handleShowPopup(type) {
				if(type == 'prod') {
					this.showProd = true
				}
				else if(type == 'cpy') {
					this.showCpy = true
				}
			},
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(value) {
				this.changeTabsStatus('disabled', true)
				this.tabs_current = value.index 
				this.formData.mdu = value.mdu
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			}, 
			scrolltolower() {
				this.getMoreData()
			}, 
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				console.log('g3',  this.params.mdu)
				const res = await this.$api[this.func]({
					params: this.params
				})
				if(res.code == 1) { 
					this.indexList = [...this.indexList, ...res.list]
					if(this.indexList.length >= res.total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
					if(this.curP == 1) {
						this.setFilterParams()
					}
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},  
			setFilterParams() {
				let {mdu, customer_login, pid, state} = this.formData 
				this.lastFilters = {...this.formData}
				if(!mdu && !customer_login && !pid && !uni.$u.test.number(state)) return
				//有效筛选，加入历史记录
				
			},
			showFilter() {
				console.log(this.lastFilters)
				this.formData = {...this.lastFilters}
				this.showMduFilter = true
			},
			clearForm() {
				this.formData = {
					mdu: '',
					customer_login: '',
					customer_name: '',
					pid: '',
					pid_name: '',
					state: '',
				}
			},
			handleDetail(data) {
				if(this.isBroker == 1 && data.state != '0') {
					uni.navigateTo({
						url: `/pages/my/mdu/mdu_detail?id=${data.id}`
					})
				}else {
					this.handleGoto({
						url: '/pages/my/mdu/mdu_edit',
						params: {
							id: data.id,
							type: 'edit',
							isBroker: this.isBroker, 
						}
					}) 
				}
			},
			handleAudit(data) { 
				uni.showActionSheet({
					itemList: ['通过', '不通过'],
					success:  async (res) => {
						let index = res.tapIndex + 1 
						uni.showLoading()
						const resAjax = await this.$api.customer_mdu_audit_mdu({
							params: {
								id: data.id,
								audit: index
							}
						})
						if(resAjax.code == 1) {
							uni.showToast({
								title: resAjax.msg,
								icon: 'none'
							})
							let i = this.indexList.findIndex(ele => ele.id == data.id);
							this.indexList[i].state = index
						}
						
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			async handleDelete(data) {
				uni.showLoading({
					title: '正在删除...'
				})
				let id = data.id
				let func = 'customer_mdu_delete_mdu_broker'
				let params = {id} 
				if(this.isBroker == '0') {
					func = 'customer_mdu_audit_mdu',
					params.audit = 3
				}
				const res = await this.$api[func]({
					params
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					await this.refreshList()
				}
			}, 
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
		height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.w {
		height: 100%;
	}
	.list {
		height: calc(100% - 44px);
		
	}
</style>
