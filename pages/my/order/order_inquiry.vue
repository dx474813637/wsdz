<template>
	<view class="w">
		<view class="search-wrapper u-flex u-flex-items-center u-p-l-20 u-p-r-20 u-p-b-10">
			<!-- <view class="item" @click="searchCateShow = true" style="flex: 0 0 100px">
				<u--input 
					:value="searchCate"
					readonly
					suffixIcon="arrow-down"
					suffixIconStyle="color: #909399"
					shape="circle"
					fontSize="14"
					:customStyle="{paddingTop: '4px', paddingBottom: '4px', background: '#e8e8e8', border: 'none'}"
				></u--input>
			</view> -->
			<view class="item u-flex-1 ">
				<u-search 
					:placeholder="searchplaceholder" 
					v-model="keyword"
					clearabled
					:showAction="false"
					bgColor="#e8e8e8"
					@search="handleSearch"
				></u-search>
			</view>
			<view class="item u-m-l-20" @click="handleSearch">
				<view class=" u-radius-18 bg-primary u-flex u-flex-items-center u-flex-center" style="width: 30px;height: 30px; ">
					<i class="custom-icon-search custom-icon" style="color:#fff; font-size: 14px"></i>
				</view>
			</view>
			
		</view>
		<!-- <view class="tabs-w">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			>
			</u-tabs>
		</view> -->
		
		<view class="list">
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
							<template v-if="groupbyid == 1">
								<OrderInquiryCard2
									:pid="item.id"
									:name="item.name"
									:sub="item.spec"
									:status="item.state"
									:type="item.trade_type"
									:date="item.post_time"
									:price="item.price"
									:dprice="item.dprice"
									:unit="item.unit"
									:origin="item"
									:mySend="true" 
									:inquiry="true"
									:shareBtnConfig="shareBtnConfig"  
									@detail="handleProdFront" 
									@handleShare="handleShare" 
									@guanlian="handleGuanlian"
								></OrderInquiryCard2>
							</template> 
							<template v-else>
								<OrderInquiryCard
									:customData="item"  
									:prodData="prodData"
									:groupbyid="groupbyid"
									@detail="handleBidDetail" 
									@makephone="makephone"
								></OrderInquiryCard>
							</template>
						
							
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
		
		<!-- 海报确认 -->
		<u-popup
			:show="haibaoShow" 
			@close="haibaoShow = false" 
			mode="bottom" 
			bgColor="#fff"
		>
			<view class="haibao-wrap">
				<scroll-view scroll-y class="u-p-20 haibao" >
					<u--image width="100%" height="auto" :src="shareTarget.haibao" mode="widthFix" radius="6"></u--image>
				</scroll-view>
				<view class="u-flex u-flex-between u-p-20">
					<view class="item u-flex-1 u-p-r-10"> 
						<u-button type="primary" open-type="share" >确认转发</u-button>
					</view>
					<view class="item u-flex-1 u-p-l-10">
						<u-button type="primary" plain @click="savePic">保存图片</u-button>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- <u-picker 
			:show="searchCateShow" 
			:columns="columns" 
			closeOnClickOverlay 
			@confirm="confirm" 
			@cancel="searchCateShow = false" 
			@close="searchCateShow = false"></u-picker> -->
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex' 
	import OrderInquiryCard from '@/pages/my/components/OrderInquiryCard/OrderInquiryCard.vue'
	import OrderInquiryCard2 from '@/pages/my/components/OrderInquiryCard/OrderInquiryCard2.vue'
	export default {
		data() {
			return {
				ordertype: 'B',
				source: 'SELL',
				searchCateShow: false,
				searchCateIndex: 0,
				keyword: '',
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
						name: '全部',
						value: '',
						disabled: false,
					},
					{
						name: '现金支付',
						value: 'FUND',
						disabled: false,
					},
					{
						name: '票据支付',
						value: 'BILL',
						disabled: false,
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				source_id: '',
				groupbyid: '1',
				shareTarget: {
					title: '',
					path: '',
					imageUrl: '',
					type: '',
					haibao: '',
					data: {}
				},
				shareBtnConfig: {
					button1: '',
					button2: '',
					button3: '',
				},
				haibaoShow: false,
				prodData: {}
			};
		},
		async onLoad(options) {
			 if(options.hasOwnProperty('groupbyid')) {
				this.groupbyid = options.groupbyid
			} 
			if(options.hasOwnProperty('source_id')) {
				this.source_id = options.source_id
			} 
			// if(options.hasOwnProperty('source')) {
			// 	this.source = options.source
			// 	this.searchCateIndex = +this.searchCateList.findIndex(ele => ele.value == this.source)
			// } 
			
			uni.showLoading()
			await this.getData()
		},
		async onShareAppMessage(res) {
			// console.log(res)
			if(res.from == 'menu') {
				
			}else {
				return await this.getShareData(true)
				// {
				// 	title: this.shareTarget.title,
				// 	path: this.shareTarget.path,
				// 	imageUrl: this.shareTarget.imageUrl,
				// };
			}
			
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			columns() {
				return [
					this.searchCateList.map(ele => ele.name)
				]
			},
			searchCate() {
				return this.searchCateList[this.searchCateIndex].name
			},
			searchCateList() {
				return [
					{
						name: '卖家',
						value: 'S'
					},
					{
						name: '买家',
						value: 'B'
					},
				]
			},
			paramsObj() {
				// let company = ''
				// let title = ''
				// if(this.searchCateList[this.searchCateIndex].value == 'company') company = this.keyword
				// else title = this.keyword
				return {
					// ordertype: this.ordertype,
					// paymode: this.tabs_list[this.tabs_current].value,
					// company,
					// title,
					terms: this.keyword,
					p: this.curP,
					source_id: this.source_id,
					groupbyid: this.groupbyid,
					// role: this.searchCateList[this.searchCateIndex].value
				}
			},
			searchplaceholder() {
				let str = '输入关键字'
				// if(this.searchCateList[this.searchCateIndex].value == 'title') {
				// 	str = `检索商品名`
				// }else {
				// 	str = `检索${this.searchCate}公司名`
				// }
				return str
			}
		},
		components: {
			OrderInquiryCard,
			OrderInquiryCard2
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			confirm(e) {
				console.log('confirm', e)
				this.searchCateIndex = e.indexs[0]
				this.searchCateShow = false
			},
			async handleSearch(v) {
				console.log(v)
				this.changeTabsStatus('disabled', true)
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},
			async handleTabsChange(value) {
				this.tabs_current = value.index
				this.changeTabsStatus('disabled', true)
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
				const res = await this.$api[ this.groupbyid == '1' ? 'list_buy_inquiry' : 'list_order_inquiry']({params: this.paramsObj})
				if(res.code == 1) { 
					this.indexList = [...this.indexList, ...(this.groupbyid == '1'? res.list : res.list.list_orders)]
					this.shareBtnConfig.button1 = res.button1
					this.shareBtnConfig.button2 = res.button2
					this.shareBtnConfig.button3 = res.button3
					if(this.groupbyid == 0) {
						this.prodData = res.list.Source
					}
					
					uni.setNavigationBarTitle({
						title: res.title
					})
					if(this.indexList.length >= (this.groupbyid == '1'? res.total : res.list.count_data) ) {
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
			handleAdd({type, id}) {
				
			}, 
			handleBidDetail({id}) {
				
				uni.navigateTo({
					url: `/pages/my/order/order_inquiry_detail?id=${id}`
				})
			},
			handleGuanlian(data){
				uni.navigateTo({
					url: `/pages/my/order/order_inquiry?groupbyid=0&source_id=${data.id}`
				})
			},
			 
			handleProdFront({pid}) {
				this.handleGoto({
					url: '/pages/index/pan/panDetail',
					params: {
						id: pid,
						pan: 'b',
					}
				})
			}, 
			handleShare({data}) {
				this.shareTarget.data = data 
				this.shareTarget.type = 'base' 
			},
			async handleBigPic({data}) {
				this.shareTarget.data = data 
				this.shareTarget.type = 'haibao' 
				await this.getShareData(); 
				this.haibaoShow = true
			},
			savePic(){
				const that = this
				uni.downloadFile({
					url:this.shareTarget.haibao,//网络图片的地址
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
			async getShareData(tongji) {
				uni.showLoading()
				const res = await this.$api.sell_buy_share({params: {
					id: this.shareTarget.data.id,
					cate: 'b',
					tongji: tongji? 1 : ''
				}})
				if(res.code == 1) {
					this.shareTarget.title = res.list.share_title.replace('买盘', '采购询价')
					this.shareTarget.imageUrl = this.shareTarget.type == 'haibao' ? res.list.share_img2 : res.list.share_img;
					this.shareTarget.haibao = res.list.haibao
					this.shareTarget.path = res.list.share_url
					return {
						title: this.shareTarget.title,
						path: this.shareTarget.path,
						imageUrl: this.shareTarget.imageUrl,
					};
				}else {
					return {}
				}
				// console.log(this.shareTarget)
			},
			makephone(data) {
				uni.makePhoneCall({
					phoneNumber: '' + data.S_company.mobile
				});
			}
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
	.haibao-wrap {
		box-sizing: border-box;
		& .haibao {
			max-height: 70vh;
			box-sizing: border-box;
			overflow: hidden;
		}
	}
	.w {
		height: 100%;
	}
	.list {
		height: calc(100% - 39px);
		
	}
</style>
