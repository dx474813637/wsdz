<template>
	<view>
		<view class="main"> 
			<view class="main-content">
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>交易商</view>
					</view>
					<view class="item-right">
						<view>{{list.Company.name}}</view>
					</view>
				</view> 
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>标准品</view>
					</view>
					<view class="item-right">
						<view>{{pid_name}}</view>
					</view>
				</view> 
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>MDU</view>
					</view>
					<view class="item-right">
						<view>{{list.mdu | mdu2Str}}</view>
					</view>
				</view> 
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>交易商确认状态</view>
					</view>
					<view class="item-right u-flex u-flex-items-center">
						<view class="text-primary u-m-r-15" @click="handleTimesBtn" v-if="list.Company">交易商TIMS</view>
						<view>{{list.state | mduState2Str}}</view>
					</view>
				</view> 
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>添加时间</view>
					</view>
					<view class="item-right">
						<view>{{list.ctime}}</view>
					</view>
				</view> 
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>确认时间</view>
					</view>
					<view class="item-right">
						<view>{{list.audit_time}}</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-start" v-if="list.remark">
					<view class="item-left" style="flex-shrink: 0">
						<view>备注</view>
					</view>
					<view class="item-right">
						<view>{{list.remark}}</view>
					</view>
				</view>  
			</view>
		</view>
			
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				id: '',
				isBroker: '1',
				list: {}
			};
		},
		onLoad(opt) {
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id
			}
			this.getData()
		},
		computed: {
			pid_name() {
				let name = '';
				if(this.list.hasOwnProperty('pid') && this.list.hasOwnProperty('list_standards')) {
					name = this.list.list_standards.filter(ele => ele.pid == this.list.pid)[0]?.name
				}
				return name
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			async getData() {
				uni.showLoading({
					
				})
				const res = await this.$api.customer_mdu_detail_mdu_broker({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.list = res.list?.Result
				}
			}, 
			handleTimesBtn() {
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login: this.list.Company.login,
						content: ``
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		padding: 20px 12px;
		.main-header {
			/* margin-bottom: 20px; */
			background-color: #fff;
		}
		.main-content {
			padding: 0 8px;
			background-color: #fff;
			border-radius: 0 0 8px 8px;
			.row {
				/* border-bottom: 1px solid #eee; */
				height: 45px;
				padding: 0 8px;
				.item-left {
					color: #000;
				}
				.item-right {
					color: #999;
				}
			}
		}
	}
</style>
