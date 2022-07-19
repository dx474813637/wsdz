<template>
	<view class="w">
		<!-- <cu-custom bgcolor="bg-drakblue" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">{{ name }}</view>
		</cu-custom> -->
		<view class="">
			<view class="u-p-30 bg-white">
				<u-search :placeholder="placeholder" v-model="keyword" shape="square" @custom="custom" @search="search" @change="change" @clear="clear"></u-search>
			</view>
			<view v-if="requesting" class="u-p-t-80">
				<u-loading-icon show mode="circle"></u-loading-icon>
			</view>
			<view v-if="!requesting" class="u-p-20">
				<view  v-if="info_show">
					<view class="cpy u-p-20 bg-white u-m-b-20" v-for="(item, index) in company.slice(0, 5)" :key="index" @click="handleRowClick(item)">
						<view class="cpy-header u-m-b-20 border_b u-p-l-0 u-p-r-0 u-flex u-flex-items-center u-flex-between">
							<view class="text-dark u-flex-1 u-p-r-10 u-line-1">{{item.name}}</view>
							<view class="text-error " style="white-space: nowrap;">{{item.risk_level}}</view>
						</view>
						<view class="cpy-main u-flex u-flex-start u-flex-between">
							<view class=" u-flex u-flex-items-center">
								<u-tag :text="`${item.estiblishTime}成立`" plain size="mini" ></u-tag>
								<view class="u-p-l-10">
									<u-tag :text="item.regStatus" plain size="mini" ></u-tag>
								</view>
								
							</view>
							<view class="u-font-28 text-base">{{item.search_time}}</view>
						</view>
					</view>
				</view>
				
				<view class="bg-white" v-if="info_show">
					<view v-for="(item, index) in list_info" :key="index">
						<view class="border_b">
							<rich-text :nodes="item.name"></rich-text>
						</view>
						<view class="border_b">
							<rich-text :nodes="item.text"></rich-text>
						</view>
					</view>
				</view>
				<view class="bg-white" v-if="!info_show">
					
					
					<view class="u-flex u-flex-items-center u-font-28" v-for="(item, index) in list" :key="index">
						<view class="u-flex-5 u-text-left border_b u-line-1 minhei">
							<rich-text :nodes="item.name"></rich-text>
						</view>
						<view class="u-flex-7 u-text-right border_l u-line-1 minhei">
							<rich-text :nodes="item.text"></rich-text>
						</view>
					</view>
					<view v-for="(item, index) in lista" :key="index">
						<view class="border_b">
							<rich-text :nodes="item.name"></rich-text>
						</view>
						<view class="border_b">
							<rich-text :nodes="item.text"></rich-text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
		<menusBar  theme="white" ></menusBar>
	</view>
</template>

<script>
	
import mixShareInfo from '@/config/mixShareInfo'
export default {
	mixins: [mixShareInfo],
	
	data() {
		return {
			top: '',
			name: '风险评级',
			keyword:'',
			company: [],
			list:[],
			lista:[],
			list_info:[],
			requesting:false,
			info_show:true,
			placeholder:'',
			share:{},
			login:'',
			business:1,
			ifme:0,
			melogin:''
		};
	},
	onLoad(options) {
		// options.login ? uni.setStorageSync('login', options.login) : uni.setStorageSync('login', 'netsun');
		// options.login ? this.login = options.login : this.login = 'netsun';
		this.sinoaaa_index();
		if(options.hasOwnProperty('name')) {
			this.name = options.name
			this.search(this.name)
		}
	},
	methods: {
		// navTo(url) {
		// 	uni.navigateTo({
		// 		url: url
		// 	});
		// },
		custom(value) {
			this.ichain(value);
		},
		handleRowClick(data) {
			this.keyword = data.name;
			this.ichain(this.keyword);
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
		async sinoaaa_index() {
			if(this.requesting) return
			this.requesting = true;
			const res = await this.$api.sinoaaaIndex()
			this.requesting = false;
			if (res.code == 1) {
				this.company = res.company
				this.list_info = res.list;
				this.placeholder = res.placeholder;
				this.share = res.share;
				this.business = res.business;
				this.ifme = res.me;
				this.melogin = res.melogin;
				this.setOnlineControl(res)
				uni.setNavigationBarTitle({
					title: res.title
				})
				// console.log(this.melogin)
			}
		},
		async ichain(keywords) {
			this.customShareParams.name = keywords
			this.requesting = true;
			this.info_show = false;
			const res = await this.$api.sinoaaaSearch({params: {name: keywords}})
			this.requesting = false;
			if (res.code == 1) {
				this.setOnlineControl(res)
				this.list = res.list;
				this.lista = res.lista;
			}
		}
	}
};
</script>

<style lang="less">
	.cpy {
		border-radius: 12px;
	}
page {
	background-color: #f5f5f5;
}
.minhei {
	min-height: 40px;
	box-sizing: border-box;
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
.border_b{
	border:1px;
	border-style:none none solid none;
	border-color:transparent transparent #e3e3e3 transparent;
	padding: 20rpx;
}
.border_l{
	border:1px;
	border-style:none none solid solid;
	border-color:transparent transparent #e3e3e3 #e3e3e3;
	padding: 20rpx;
}
.w {
	padding-bottom: 60px;
}
</style>
