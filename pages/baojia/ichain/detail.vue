<template>
	<view class="text-white w ">
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar 
				title=" "
				:backBtn="backBtn"
				@backEvent="handleBackEvent"
			></navBar>
		</view>
		<view v-show="requesting"><requestLoading></requestLoading></view>
		<view v-show="!requesting" class="">
			<view class="u-p-10 u-m-10 radius text-dark">
				<view class="u-p-10 u-font-36 bg-white u-p-l-20" style="font-weight：bold;border-radius: 10px;">
					{{list.detail.pname}} <text class="u-p-l-30" style="color:#0077b5;">产业链</text>
				</view>
				<view class="u-p-10"></view>
				<view class="bg-white" style="border-radius: 10px;">
					<view class="u-p-10 u-font-36 u-p-l-20">
						{{list.detail.pname}} <text class="u-p-l-30" style="color:#0077b5;">百科</text>
					</view>
					<view class="u-p-10 u-font-26 text-grey bg-white" style="border-radius: 10px;">
						<view class="u-p-20">
							<rich-text :nodes="list.detail.spec" style="line-height: 46rpx;"></rich-text>
						</view>
						<view v-if="list.detail.alias" class="u-p-10">
							<text class="u-p-r-10 custom-icon custom-icon-caigoudan" style="color: #0077b5;"></text>别名：{{list.detail.alias}}
						</view>
						<view v-if="list.detail.pname_e" class="u-p-10">
							<text class="u-p-r-10 custom-icon custom-icon-yingwen" style="color: #0077b5;"></text>英文名称：{{list.detail.pname_e}}
						</view>
						<view v-if="list.detail.alias_e" class="u-p-10">
							<text class="u-p-r-10 custom-icon custom-icon-yingwen" style="color: #0077b5;"></text>英文别名：{{list.detail.alias_e}}
						</view>
						<view v-if="list.detail.casno" class="u-p-10">
							<text class="u-p-r-10 custom-icon custom-icon-Field-number" style="color: #0077b5;"></text>CAS No：{{list.detail.casno}}
						</view>
						<view v-if="list.detail.hscode" class="u-p-10">
							<text class="u-p-r-10 custom-icon custom-icon-haiguan" style="color: #0077b5;"></text>海关编码：{{list.detail.hscode}}
						</view>
						<view v-if="list.detail.category" class="u-p-10">
							<text class="u-p-r-10 custom-icon custom-icon-category" style="color: #0077b5;"></text>类别：{{list.options[list.detail.category]}}
						</view>
					</view>
				</view>
				<view class="u-p-15"></view>
				<view class="u-p-10 bg-white" style="border-radius: 10px;">
					<view class="u-p-10 u-font-36 u-p-l-20">
						{{list.detail.pname}} <text class="u-p-l-30" style="color:#0077b5;">上下游相关</text>
					</view>
					<view class="u-p-10 u-p-b-30">
					</view>
					<view class="u-p-10 bg-blue text-white" @click="change_shows()">
						<view class="u-flex">
							<view class="u-flex-11 u-p-l-20">上游产品</view>
							<view class="u-flex-1"><text class="u-font-40">{{shows_ico}}</text></view>
						</view>
					</view>
					<view v-if="shows" class="u-p-10 tag_list">
						<view class="t1 u-m-10 u-p-10 u-line-1" @click="navTo('/pagesb/ichain/detail?id='+item.id)" v-for="(item, index) in list.s_list" :key="index">
							{{item.pname}}
						</view>
					</view>
					<view class="u-p-10"></view>
					<view class="u-p-10 bg-blue text-white" @click="change_showx()">
						<view class="u-flex">
							<view class="u-flex-11 u-p-l-20">下游产品</view>
							<view class="u-flex-1"><text class="u-font-40">{{showx_ico}}</text></view>
						</view>
					</view>
					<view v-if="showx" class="u-p-10 tag_list">
						<view class="t1 u-m-10 u-p-10 u-line-1" @click="navTo('/pagesb/ichain/detail?id='+item.id)" v-for="(item, index) in list.x_list" :key="index">
							{{item.pname}}
						</view>
					</view>
					<view class="u-p-10"></view>
				</view>
				<view class="u-p-15"></view>
				<view class=" bg-white" style="border-radius: 10px;">
					<view class="u-p-10 u-font-36 u-p-l-20">
						{{list.detail.pname}} <text class="u-p-l-30" style="color:#0077b5;">供应商</text>
					</view>
					<view class="u-p-10">
						<u-line color="#e2e2e2"></u-line>
					</view>
					<view v-for="(item, index) in list.qy_list" :key="index">
						<view class="u-flex u-p-10 bg-white u-m-20 radius border_blue" >
							<!-- <view class="u-flex-2">
								<image class="qiye-img" :lazy-load="true" :src="item.pic1" :mode="widthFix" shape="square"></image>
							</view> -->
							<view class="u-flex-10 ">
								<view class="u-p-10 u-font-32 u-p-l-20">
									{{item.company}}
								</view>
								<view class="u-p-10 u-font-24 text-gray u-p-l-20 u-flex u-flex-items-center">
									<view class="label">产品名</view>
									<view class="u-flex-1 value u-flex u-flex-items-center">
										<text class=" u-line-1 u-p-r-20">{{item.product}} </text>
									</view>
								</view>
								<template v-if="item.company_all">
									<view class="u-p-10 u-font-24 text-gray u-p-l-20 u-flex u-flex-items-center" v-if="item.company_all.contact">
										<view class="label">联系人</view>
										<view class="u-flex-1 value u-flex u-flex-items-center" @click="copy(item.company_all.contact)">
											<text class=" u-line-1 u-p-r-20">{{item.company_all.contact}}</text>
											<i class="custom-icon-fuzhi custom-icon"></i>
										</view>
									</view>
									<view class="u-p-10 u-font-24 text-gray u-p-l-20 u-flex u-flex-items-center" v-if="item.company_all.mobile || item.company_all.tel">
										<view class="label">手机</view>
										<view @click="makecall(item.company_all.mobile || item.company_all.tel)" class="u-flex-1  value u-flex u-flex-items-center">
											<text class=" u-line-1 u-p-r-20">{{item.company_all.mobile || item.company_all.tel}}</text> 
											<i class="custom-icon-dianhua custom-icon"></i> 
										</view>
									</view>
									<view class="u-p-10 u-font-24 text-gray u-p-l-20 u-flex u-flex-items-center" v-if="item.company_all.address">
										<view class="label">地址</view>
										<view class="u-flex-1 value u-flex u-flex-items-center" @click="copy(item.company_all.address)">
											<text class=" u-line-1 u-p-r-20">{{item.company_all.address}}</text>
											<i class="custom-icon-fuzhi custom-icon"></i>
										</view>
									</view>
								</template>
								
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
		<menusBar tabbar :theme="typeActive" ></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sys: 'theme/sys'
			}),
		},
		data() {
			return {
				id:0,
				list:[
				],
				backBtn: true,
				name:'产品详情',
				shows:false,
				showx:false,
				requesting:false,
				shows_ico:'+',
				showx_ico:'+',
				share:{}
			}
		},
		onLoad(options) {
			if(uni.$u.pages().length == 1) this.backBtn = false
			this.id = options.id;
			this.requesting = true;
			this.ichain_detail();
		},
		onShow(options){
			
		},
		methods: {
			
			handleBackEvent() {
				uni.navigateBack()
			},
			change_shows() {
				this.shows = !this.shows;
				if(this.shows_ico=='+')
				{
					this.shows_ico = '-';
				}
				else
				{
					this.shows_ico = '+';
				}
			},
			change_showx() {
				this.showx = !this.showx;
				if(this.showx_ico=='+')
				{
					this.showx_ico = '-';
				}
				else
				{
					this.showx_ico = '+';
				}
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			async ichain_detail() {
				await this.$http
					.post('ichain_detail', {
						id: this.id
					})
					.then(res => {
						this.requesting = false;
						if (res.code == 1) {
							this.setOnlineControl(res)
							this.list = res.list;
							this.name = res.list.detail.pname;
							this.share = res.share;
						}
					});
			},
			copy(data) {
				uni.setClipboardData({
					data,
					success: function () {
						uni.showToast({
							title: '复制成功'
						})
					}
				});
			},
			makecall(data) {
				uni.makePhoneCall({
					phoneNumber: data
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.label {
		white-space: nowrap;
		flex: 0 0 50px;
		text-align: justify;
		margin-right: 20px;
		text-align-last: justify;
	}
	page {
		background-color: #f5f5f5;
	}
.text-dark {
	color: #333;
}
.text-gray {
	color: #666;
}
.w {
	padding-bottom: 50px;
}
.tag_list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 0 auto;
	position: relative;
}
 
.t1{
  width: 30%;
  /* border:1px solid #008CFF; */
  background-color: #f1f1f1;
  border-radius: 5px;
  padding-left: 8rpx;
}
.bg-blue{
	background-color: #0077b5;
	border-radius: 10px;
}

.border_blue{
	border: 1px;
	border-style:solid;
	border-color:#e2e2e2 ;
	border-radius: 10px;
}
.qiye-img {
		width: 122rpx;
		height: 122rpx;
		border-radius:5px;
		box-shadow: 0 0 1px #a3a3a3;
	}
</style>
