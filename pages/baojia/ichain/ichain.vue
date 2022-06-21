<template>
	<view class="text-white w " >
		<view :style="{
			backgroundColor: themeConfig.navBg
		}">
			<navBar 
				title=" "
				:backBtn="backBtn"
				@backEvent="handleBackEvent"
			></navBar>
		</view>
		<view class="">
			<view class="u-p-30 an-bg">
				<view class="u-p-20 u-text-center u-font-36" style="color: #d6d9dc;">{{title}}</view>
				<view class=" u-p-30 zdy_search">
					<u-search :placeholder="placeholder" v-model="keyword" :action-style="actionstyle" shape="square" @custom="custom" @search="search" @change="change" @clear="clear"></u-search>
				</view>
			</view>
			<view v-show="requesting"><requestLoading></requestLoading></view>
			<view v-show="!requesting" class="u-p-20 text-dark">
				<view v-if="info_show">
					<view class="u-p-20 radius">
						<view class="u-font-36 bg-white u-p-20" style="font-weight：bold;border-radius: 10px;">
							<text class="custom-icon-scoretop custom-icon" style="font-size: 40rpx;color:#0077b5;"></text><text class="u-p-l-20">推荐</text><text style="color:#0077b5;">产业链</text>
						</view>
					</view>
					<view v-for="(item, index) in list_info.list" :key="index">
						<view class="u-p-10 bg-white u-m-20 radius shadow border_blue" @click="navTo('/pages/baojia/ichain/detail?id='+item.id)">
							<view class="u-p-10 u-font-32">
								{{item.pname}}
							</view>
							<view class="u-p-l-10 u-p-r-10 u-font-24 text-gray xx">
								<rich-text :nodes="`<div style='display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;line-clamp: 4;overflow: hidden;height: 128rpx;'>${item.spec}</div>`"></rich-text>
							</view>
							<view class="u-p-20">
								<u-line color="#e2e2e2"></u-line>
							</view>
							<view class="u-flex u-p-20 u-flex-items-center">
								<text class="custom-icon-my custom-icon text-primary"></text>
								<text class="u-p-l-20">提供达人：{{item.author==0?'生意宝':item.author}}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="!info_show">
					<view v-for="(item, index) in list.list" :key="index">
						<view class="u-p-10 bg-white u-m-20 radius shadow border_blue" @click="navTo('/pages/baojia/ichain/detail?id='+item.id)">
							<view class="u-p-10 u-font-32">
								{{item.name}}
							</view>
							<view class="u-p-l-10 u-p-r-10  u-font-24 text-gray xx">
								<rich-text :nodes="`<div style='display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;line-clamp: 4;overflow: hidden;height: 128rpx;'>${item.spec}</div>`"></rich-text>
							</view>
							<view class="u-p-20">
								<u-line color="#e2e2e2"></u-line>
							</view>
							<view class="u-flex u-p-20">
								<text class="custom-icon custom-icon-my"></text>
								<text class="u-p-l-20">提供达人：{{item.author==0?'生意宝':item.author}}</text>
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
			top: '',
			name: '产业链',
			keyword:'',
			list:[],
			requesting:false,
			actionstyle:{
				'color':'#fff'
			},
			list_info:[],
			info_show:true,
			placeholder:'',
			title:'',
			share:{},
			backBtn: true,
		};
	},
	onLoad(options) {
		if(uni.$u.pages().length == 1) this.backBtn = false
		this.name = options.name;
		this.ichain_index();
	},
	methods: {
		navTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		custom(value) {
			this.ichain(value);
		},
		handleBackEvent() {
			uni.navigateBack()
		},
		search(value) {
			this.ichain(value);
		},
		change(value) {
			if(!value)
			{
				this.info_show = true;
			}
		},
		clear() {
			this.info_show = true;
		},
		async ichain_index() {
			this.requesting = true;
			await this.$http
				.post('ichain_index', {
				})
				.then(res => {
					this.requesting = false;
					console.log(res)
					if (res.code == 1) {
						this.setOnlineControl(res)
						this.list_info = res.list;
						this.placeholder = res.placeholder;
						this.title = res.title;
						this.share = res.share;
					}
				});
		},
		async ichain(keywords) {
			this.requesting = true;
			this.info_show = false;
			await this.$http
				.post('ichain_search', {
					keywords: keywords
				})
				.then(res => {
					this.requesting = false;
					if (res.code == 1) {
						this.list = res.list;
						if(res.nolist==0)
						{
							uni.showToast({
								title: res.nomsg,
								icon: 'none'
							});
						}
					}
				});
		}
	}
};
</script>

<style lang="scss">
	.xx {
		>rich-text {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
			overflow: hidden;
			height: 128rpx;
		}
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
page {
	background-color: #f5f5f5;
}
.cate-item {
	position: relative;
}
.activeitem {
	color: var(--drakblue);
	&:after {
		content: '';
		display: block;
		height: 6rpx;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: var(--drakblue);
		animation: scale-up 0.3s ease-out;
		@keyframes scale-up {
			from {
				transform: scale(0);
			}
			to {
				transform: scale(1);
			}
		}
	}
}
.search-result {
	.item {
		margin: 0 30rpx;
		margin-top: 30rpx;
		&:first-child {
			margin-top: 0;
		}
	}
}
.border_blue{
	border-style:none none solid none;
	border-color:transparent transparent #5770bd transparent;
	border-radius: 10px;
}
.an-bg{
	background: url(https://quan001.y.netsun.com/Public/banner-2.jpg);
	background-position: center center;
	background-size: cover;
	height: 280rpx;
}
.zdy_search{
	background: rgba(0, 32, 70, .8);
	border-radius: 8px;
}
</style>
