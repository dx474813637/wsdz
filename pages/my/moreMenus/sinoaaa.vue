<template>
	<view class="">
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
	</view>
</template>

<script>
	
export default {
	
	data() {
		return {
			top: '',
			name: '风险评级',
			keyword:'',
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
	// onShareTimeline(){
	// 	return{
	// 		title: this.share.title,
	// 		query:'name='+this.name+'&login='+this.melogin
	// 	}
	// },
	// onShareAppMessage(res) {
	// 	this.$http
	// 		.post('share', {
	// 			login: uni.getStorageSync('login'),
	// 			url: '/' + this.$scope.route
	// 		})
	// 		.then(resa => {
	// 			resa.data.poster ? uni.setStorageSync('poster', resa.data.poster) : '';
	// 		});
	// 	return {
	// 		title: this.share.title,
	// 		path:'/' +this.$scope.route +'?name=' +this.name+'&login='+this.melogin
	// 	};
	// },
	onLoad(options) {
		this.name = options.name;
		// options.login ? uni.setStorageSync('login', options.login) : uni.setStorageSync('login', 'netsun');
		// options.login ? this.login = options.login : this.login = 'netsun';
		this.sinoaaa_index();
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
				this.list_info = res.list;
				this.placeholder = res.placeholder;
				this.share = res.share;
				this.business = res.business;
				this.ifme = res.me;
				this.melogin = res.melogin;
				uni.setNavigationBarTitle({
					title: res.title
				})
				// console.log(this.melogin)
			}
		},
		async ichain(keywords) {
			this.requesting = true;
			this.info_show = false;
			const res = await this.$api.sinoaaaSearch({params: {name: keywords}})
			this.requesting = false;
			if (res.code == 1) {
				this.list = res.list;
				this.lista = res.lista;
			}
		}
	}
};
</script>

<style lang="less">
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
</style>
