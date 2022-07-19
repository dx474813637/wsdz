<template>
	<view class="w">
		<u-sticky>
			<view class="tabs-w">
				<u-tabs
					:list="tabs_list"
					:current="tabs_current"
					lineHeight="0"
					:activeStyle="activeTabsStyle"
					:itemStyle="itemTabsStyle"
					@change="handleTabsChange"
				></u-tabs>
			</view>
		</u-sticky>
		
		<view class="u-p-20 ">
			<view class="list u-p-20">
				<view class="list-item u-p-12 u-flex u-flex-items-center"
					v-for="(item, index) in tabs_list[tabs_current].list"
					:key="item.id"
				>
					<view class="u-flex u-flex-items-center u-flex-between u-flex-1">
						<view>
							{{item.name}}
						</view>
						<view class="u-flex u-flex-items-center">
							<view class="u-font-28 u-flex u-flex-items-center" :style="{color: '#df4d4d'}"
								@click="handleRemoveFollow(item, index)"
							>
								<u-icon name="minus-circle-fill" color="#df4d4d" ></u-icon>
								<text class="u-p-l-10">移除</text>
							</view>
							
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="u-p-20" v-if="guanzhu.info">
			<view class="list u-p-20">
				<!-- <view class="title u-text-center u-m-b-30">{{guanzhu.title}}</view> -->
				<official-account @bindload="bindload" @binderror="binderror"></official-account>
				<u-parse :content="guanzhu.info"></u-parse>
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
		<tabBar :customStyle="{
			'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
		}">
			<view class=" u-flex u-flex-items-center u-flex-center u-p-20" @click="handleAdd">
				<u-button type="primary" shape="circle" icon="plus-circle">新增关注</u-button>
			</view>
		</tabBar>
		<menusPopup 
			:show="show" 
			multiple
			theme="white"
			:isPPI="isPPI"
			:mainkey="tabs_list[tabs_current].mainkey"
			:minNum="minNum"
			:maxNum="maxNum"
			:selectedList="selectedList"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '34rpx',
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				tabs_list: [
					{
						name: '卖盘关注',
						disabled: false,
						list: [],
						mainkey: 'id'
					},
					{
						name: '买盘关注',
						disabled: false,
						list: [],
						mainkey: 'id'
					},
					{
						name: '今日行情',
						disabled: false,
						list: [],
						mainkey: 'pid'
					},
				],
				indexList: [],
				show: false,
				guanzhu: {},
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('current')) {
				this.tabs_current = Number(options.current)
			}
			if(options.hasOwnProperty('list')) {
				this.str2list(options.list)
			}
			// uni.showLoading()
			this.getGuanzhu()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			isPPI() {
				if(this.tabs_current == 2) {
					return true
				}
				return false
			},
			selectedList() {
				return this.tabs_list[this.tabs_current].list
			},
			maxNum() {
				if(this.tabs_current == 2) {
					return 10
				}
				return 5
			},
			minNum() {
				if(this.tabs_current == 2) {
					return 1
				}
				return 1
			},
			
		},
		methods: {
			list2str(list) {
				let params = {
					plate1: '',
					plate2: '',
					plate3: '',
				}
				list.forEach((ele, index) => {
					params[`plate${index+1}`] = ele.list.map(item => `${item.name}|${item.id}`).join(',')
				})
				return params
			},
			str2list(str) {
				const list = JSON.parse(decodeURIComponent(str))
				for(let k in list) {
					let i = 0
					if(k == 'plate1') i = 0
					else if(k == 'plate2') i = 1
					else if(k == 'plate3') i = 2
					this.tabs_list[i].list = list[k].split(',').map(ele => {
						let arr = ele.split('|')
						return {
							name: arr[0],
							id: arr[1],
						}
					})
				}
			},
			bindload(e) {
				console.log(e)
			},
			binderror(e) {
				console.log(e)
			},
			async getGuanzhu() {
				const res = await this.$api.guanzhu()
				if(res.code == 1) {
					this.guanzhu = res.list
				}
			},
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.indexList = [];
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(obj) {
				this.tabs_current = obj.index
			},
			handleRemoveFollow(obj, index) {
				if(this.tabs_list[this.tabs_current].list.length == 1) {
					uni.showToast({
						title: '至少保留一个关注标签',
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '提示',
					content: `是否取消关注【${obj.name}】？`,
					success: async (res) => {
						if (res.confirm) {
							const list = uni.$u.deepClone(this.tabs_list)
							list[this.tabs_current].list.splice(index, 1)
							await this.setHomeConfig(list)
							this.refreshIndexData()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async setHomeConfig(list) {
				uni.showLoading()
				const res = await this.$api.setHomeConfig(this.list2str(list || this.tabs_list))
				if(res.code == 1) {
					this.tabs_list = list
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					
				}
			},
			refreshIndexData() {
				const pages = uni.$u.pages()
				pages[pages.length - 2].$vm.refreshList()
			},
			handleAdd() {
				this.show = true
			},
			async menusConfirm(data) {
				console.log(data)
				let flag = false;
				let arr = data.arr.map(ele => ele.id)
				let activeList = this.tabs_list[this.tabs_current].list
				if(arr.length != activeList.length) {
					flag = true
				}else {
					flag = activeList.some(ele => {
						return !arr.includes(ele.id)
					})
				}
				
				// let tempArr = this.indexList.map(ele => ele.id)
				
				this.show = false
				if(flag) {
					let list = uni.$u.deepClone(this.tabs_list)
					list[this.tabs_current].list = data.arr
					await this.setHomeConfig(list)
					this.refreshIndexData()
				}
				
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	.w {
		padding-bottom: 60px;
	}
	.list {
		background-color: #fff;
		border-radius: 20rpx;
		.list-item {
			border-bottom: 1rpx solid #f8f8f8;
			height: 35px;
			&:last-child {
				border-bottom: 0;
			}
		}
	}
	.tabs-w {
		background-color: #f8f8f8;
	}
</style>
