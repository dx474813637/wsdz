<template>
	<view class="w" :style="{
		backgroundColor: themeConfig.pageBg,
		transition: 'all .3s'
	}">
		<navBar fixed projectBtn :title="onlineControl.title" @projectEvent="projectEvent"></navBar>
		<u-status-bar></u-status-bar>

		<custom-official-account class="cont" :msg="gz_msg" :isFollow="false" :max="-1"></custom-official-account>
		<view class="h-circle" :style="{
			backgroundColor: themeConfig.navBg,
			color: '#fff',
			paddingTop: '44px'
		}">
			<view class="step1 search-w u-p-l-20 u-p-r-20 u-p-b-20 u-p-t-10" @click="handleGoto({url: '/pages/chemnet/search/search' })">
				<u-search placeholder="请输入商品中文名、CAS NO." :value="keyword" :showAction="false" 
					:bgColor="themeConfig.pageBg" disabled></u-search>
			</view>
			<!-- <view class="u-p-b-10 step2">
				<u-notice-bar
					v-if="notice.length > 0"
					:bgColor="themeConfig.navBg" 
					:color="themeConfig.warn" 
					:text="notice.map(ele => ele.title)"
					direction="column"
					mode="link"
					@click="handleNoticeIndex"
				></u-notice-bar>
			</view> -->
			<view style="position: relative;z-index: 5;" v-if="this.menusList && this.menusList.length > 0">
				<u-tabs :list="menusList" :lineHeight="0" :lineWidth="0" :activeStyle="{color: '#fff'}"  :inactiveStyle="{color: '#fff'}" @click="handleGoto({url: '/pages/chemnet/classify/classify', params: {id: ''}})">
					<view slot="right" class="u-p-l-10 u-p-r-10" @tap="show = true">
						<u-icon name="list" size="24" color="#fff" bold></u-icon>
					</view>
				</u-tabs>
			</view>
		</view>

		<view class="main u-p-l-30 u-p-t-15 u-p-r-30">

			<view class="swiper u-m-b-20">
				<u-swiper :list="swiperList" keyName="image" indicator indicatorMode="line" circular></u-swiper>

			</view>
			<view class="tbtj index-box u-radius-10 u-p-10 u-p-l-20 u-p-r-20 u-m-b-30">
				<view class="index-box-title u-flex u-flex-items-center u-flex-between u-m-b-20 u-p-t-20 u-p-10">
					<view class="box-item">
						<view>特别推荐</view>
					</view>
				</view>
				<view class="index-box-content">
					<u-scroll-list indicator indicatorColor="#f2f2f2" :indicatorActiveColor="themeConfig.themeColor">
						<view class="tbtj-list" v-for="(list, index) in tbtj_filter" :key="index">
							<view class="tbtj-list-item u-m-b-20" v-for="(item, i) in list.list" :key="`${index}${i}`">
								<chemnetCard :origin="item" @cardClick="handleGoto({url: '/pages/chemnet/product/productDetail', params: {pan: 's', id: '96698'}})"></chemnetCard>
							</view>
						</view>
					</u-scroll-list>
				</view>
			</view>
			<view class="rxcp index-box u-radius-10 u-p-t-10 u-p-b-10">
				<view class="index-box-title u-m-b-20">
					<u-tabs 
						:list="tabsList2" 
						:lineHeight="0" 
						:lineWidth="0" 
						:activeStyle="{
							color: themeConfig.themeColor,
							fontSize: '20px',
							fontWeight: 'bold',
						}"
						:inactiveStyle="{
							color: '#aaa',
							fontSize: '16px',
							fontWeight: 'bold', 
						}" 
						@change="handleChange"
						></u-tabs>
				</view>
				<view class="index-box-content">
					<template v-if="wf_loadStatus">
						<view style="height: 200px; background-color: #fff;" class="u-flex u-flex-items-center u-flex-center">
							<u-loadmore status="loading" />
						</view>
					</template>
					<template v-else>
						<template v-if="wfList.length == 0">
							<u-empty mode="data"></u-empty>
						</template>
						<template v-else>
							<!-- <waterfallList :origin="wfList" :loadStatus="wf_loadStatus"></waterfallList> -->
							
							<custom-waterfalls-flow
								ref="waterfallsFlowRef" 
								:value="wfList" 
								:column="column" 
								:columnSpace="1.5" 
								:seat="2" 
								:listStyle="listStyle"
								@wapperClick="handleClick" 
								@imageClick="handleClick" 
								@loaded="loaded">
								<view class="item-w u-p-20"
									v-for="(item, index) in wfList"
									:key="index"
									 slot="slot{{index}}"
								>
									<view class="card-main u-font-30">
										<view class="u-line-2"> 
											<text>{{item.name}}</text>
										</view>
									</view>
								</view>
							</custom-waterfalls-flow>
						</template>
						
					</template>
					
				</view>
			</view>
		</view>
		<menusPopup 
			:show="show" 
			theme="white"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopup>
		<menusPopupProject 
			:show="showProject" 
			theme="white" 
			@close="showProject = false"
			@confirm="menusConfirmProject"
		></menusPopupProject>
		<!-- <xky-guideStep :step="step" :otherHeight="$u.sys().safeAreaInsets.top + 44"></xky-guideStep> -->
		<u-safe-bottom></u-safe-bottom>
		<menusBar activeIndex="0" theme="chemnet"></menusBar>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions 
	} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	import navBar from '@/components/navBar/navBarChemnet.vue'
	import menusBar from '@/components/menusBar/menusBarChemnet.vue'
	import chemnetCard from '@/pages/chemnet/components/chemnetCard/chemnetCard.vue'
	import menusPopup from '@/components/menusPopup/menusPopupChemnet.vue'
	import { changeProject } from '@/utils/isProject.js'
	// import waterfallList from '@/pages/chemnet/components/waterfallList/waterfallList.vue'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				show: false,
				showProject: false,
				keyword: '', 
				onlineControl: {
					title: '首页'
				}, 
				swiperList: [{
					image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东',
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}],
				wfList: [],
				wf_loadStatus: false,
				tabsList: [{
							name: '关注',
						}, {
							name: '推荐',
						}, {
							name: '电影'
						}, {
							name: '科技'
						}, {
							name: '音乐'
						}, {
							name: '美食'
						}, {
							name: '文化'
						}, {
							name: '财经'
				}, ],
				tabsList2: [{
							name: '热销产品',
							value: 'rxcp',
						}, {
							name: '严选产品',
							value: 'yxcp',
						},{
							name: '选项卡名称',
							value: 'yxcp',
						},
				],
				current: 0,
				listStyle: {
					boxShadow: '0 0 10px rgba(0,0,0,.1)'
				},
				column: 2,
				tbtj: [{
						img: 'https://cdn.uviewui.com/uview/goods/4.jpg',
						name: '硝酸铵钙',
						sub: 'CAS号：873-32-5',
						price: 321,
						unit: '吨'
					},
					{
						img: 'https://cdn.uviewui.com/uview/goods/4.jpg',
						name: '硝酸铵钙',
						sub: 'CAS号：873-32-5',
						price: 321,
						unit: '吨'
					},
					{
						img: 'https://cdn.uviewui.com/uview/goods/4.jpg',
						name: '硝酸铵钙',
						sub: 'CAS号：873-32-5',
						price: 321,
						unit: '吨'
					},{
						img: 'https://cdn.uviewui.com/uview/goods/4.jpg',
						name: '硝酸铵钙',
						sub: 'CAS号：873-32-5',
						price: 321,
						unit: '吨'
					}, 
					{
						img: 'https://cdn.uviewui.com/uview/goods/4.jpg',
						name: '硝酸铵钙',
						sub: 'CAS号：873-32-5',
						price: 321,
						unit: '吨'
					},{
						img: 'https://cdn.uviewui.com/uview/goods/4.jpg',
						name: '硝酸铵钙',
						sub: 'CAS号：873-32-5',
						price: 321,
						unit: '吨'
					},
					{
						img: 'https://cdn.uviewui.com/uview/goods/4.jpg',
						name: '硝酸铵钙',
						sub: 'CAS号：873-32-5',
						price: 321,
						unit: '吨'
					},
					{
						img: 'https://cdn.uviewui.com/uview/goods/4.jpg',
						name: '硝酸铵钙',
						sub: 'CAS号：873-32-5',
						price: 321,
						unit: '吨'
					},
				]
			};
		},
		computed: {
			...mapState({
				menusList: state => state.chemnet.menusList,
				typeActive: state => state.theme.typeActive,
				typeConfig: state => state.theme.typeConfig,
			}),
			...mapGetters({
				// themeConfig: 'theme/themeConfig', 
				sys: 'theme/sys'
			}),
			themeConfig() {
				return this.typeConfig.chemnet
			}, 
			tbtj_filter() {
				if(!this.tbtj && this.tbtj.length == 0) return []
				let list = [];  
				this.tbtj.forEach((ele, index) => {
					if((index + 1) % 3 == 1) {
						list.push({list: []})
					}
					let curListIndex = list.length 
					list[curListIndex - 1].list.push(ele)
					
					// obj.list.push(ele)
					// if((index + 1) % 3 == 0) { 
					// 	list.push( uni.$u.deepClone(obj));
					// 	obj = {list: []}
					// }
				})
				return list
			},
			currentTabsValue() {
				console.log(this.tabsList2[this.current].value)
				return this.tabsList2[this.current].value
			}
		},
		async onLoad() {
			if(!this.menusList || this.menusList.length == 0) {
				this.getMenusList()
			}
			await this.getRxData()
		},
		components: {
			menusBar,
			navBar,
			chemnetCard,
			menusPopup
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getMenusList: 'chemnet/getMenusList',
			}),
			projectEvent() {
				this.showProject = true
			},
			menusConfirmProject({data}) { 
				if( uni.$u.pages()[0].$page.fullPath.includes(data.index)) {
					uni.showToast({
						title: '已在当前系统',
						icon: 'error'
					})
					return
				}
				
				changeProject(data.value)
				this.handleGoto({url: data.index, type: 'reLaunch'})
				
			},
			async menusConfirm(data) {
				console.log(data) 
				this.handleGoto({
					url: '/pages/chemnet/product/product', 
					params: { 
						data: encodeURIComponent(`{"name":"${data.name}","standard":"${data.id}"}`)
					}
				}) 
			},
			async getRxData() {
				if(this.wf_loadStatus) return
				this.wf_loadStatus = true
				const res = await this.rxDataApi(); 
				this.wf_loadStatus = false
				if(res.code == 1) {
					this.wfList = res.list
				}
			},
			rxDataApi() {
				return new Promise((res, rej) => {
					setTimeout(() => {
						res({
							code: 1,
							msg: 'ok',
							list: [
								{
									image: 'https://wx.sunsirs.cn/Public/memu/y003.jpg',
									name: '硝酸铵钙',
									sub: 'CAS号：873-32-5',
									price: 321,
									unit: '吨'
								},
								{
									image: 'https://wx.rawmex.cn/Public/memu/js.jpg?id=2',
									name: '硝酸铵钙',
									sub: 'CAS号：873-32-5',
									price: 321,
									unit: '吨'
								},
								{
									image: 'https://wx.rawmex.cn/Public/memu/x2011.jpg?id=2',
									name: '硝酸铵钙',
									sub: 'CAS号：873-32-5',
									price: 321,
									unit: '吨'
								},
								{
									image: 'https://wx.rawmex.cn/Public/attached/2022/08/23/6304863b155c5.jpg',
									name: '硝酸铵钙',
									sub: 'CAS号：873-32-5',
									price: 321,
									unit: '吨'
								},
								{
									image: 'https://wx.rawmex.cn/Public/attached/2022/08/17/62fc549fa02f8.jpg',
									name: '硝酸铵钙',
									sub: 'CAS号：873-32-5',
									price: 321,
									unit: '吨'
								},
								{
									image: 'https://wx.rawmex.cn//Public/attached/2022/08/12/62f5c69028592.jpg',
									name: '硝酸铵钙',
									sub: 'CAS号：873-32-5',
									price: 321,
									unit: '吨'
								},
								{
									image: 'https://wx.rawmex.cn//Public/attached/2022/08/05/62ecad22c2d14.jpg',
									name: '硝酸铵钙',
									sub: 'CAS号：873-32-5',
									price: 321,
									unit: '吨'
								},
								{
									image: 'https://wx.rawmex.cn//Public/attached/2022/07/29/62e37c7faac51.JPG',
									name: '硝酸铵钙',
									sub: 'CAS号：873-32-5',
									price: 321,
									unit: '吨'
								},
							]
						})
					}, 2500)
				})
			},
			handleClick() {
				this.handleGoto({url: '/pages/chemnet/product/productDetail', params: {pan: 's', id: '96698'}})
			},
			async handleChange({index}) {
				this.current = index;
				await this.getRxData()
			},
			loaded(e) {
				console.log(e)
			},
		}
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
	}
	.tbtj-list {
		&:last-child {
			padding-right: 10px;
		}
	}
</style>
<style lang="scss" scoped>
	.search-w {
		position: relative;
		z-index: 5;
	}
	.index-box {
		background-color: #fff;
		border-radius: 15px;
		&.rxcp {
			background-color: transparent;
		}
		.index-box-title {
			color: $u-main-color;
			.box-item {}
		}

		.index-box-content {
			width: 100%;
			min-height: 200px;
			.tbtj-list {
				width: 100%;
				.tbtj-list-item {
					width: 100%;
				}
			}
		}
	}

	.swiper {
		position: relative;
		z-index: 10;
	}

	.h-circle {
		position: relative;

		&::after {
			content: '';
			position: absolute;
			top: 100%;
			left: 0;
			background-color: $chemnet_color;
			width: 100vw;
			height: 80px;
			border-radius: 0 0 100% 100%;
			transform: translateY(-30px);
			z-index: 2;
			;
		}
	}

	.w {
		min-height: 100vh;
		padding-bottom: 50px;
	}

	.main {
		.banner-img {
			width: 100%;
			border-radius: 16rpx;
		}

}
 
</style>
