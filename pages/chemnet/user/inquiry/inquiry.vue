<template>
	<view class="">
		<u-notice-bar text="请真实发布！若因信息不实而被投诉，将进入黑名单。"></u-notice-bar> 
		<!-- <view class="u-content u-p-10" v-if="pan == 's' && create_sell_info">
			<u-parse :content="create_sell_info"></u-parse>
		</view> -->
		<view class="u-p-20 u-p-l-40 u-p-r-40">
			<u--form
				labelPosition="left"
				:model="xpForm"
				ref="from"
				labelWidth="80"
				>
				<u-form-item label="CAS/名称" prop="name" required > 
					<u--input 
						v-model="xpForm.name" 
					></u--input>
					
				</u-form-item> 
				<u-form-item label="需求量" prop="num" required > 
					<view class="u-flex u-flex-items-center">
						<view class="item">
							<u-number-box 
								:min="1" 
								:step="1"
								disabledInput
								></u-number-box>
						</view>
						<view class="item u-p-10 u-info">
							×
						</view>
						<view class="item u-font-36">
							{{xpForm.unit_num}}{{list.unit}}
						</view>
					</view>
					
				</u-form-item> 
				<u-form-item label="收货区域" prop="addr" required >
					<view class="u-flex u-p-15 u-border u-radius-4" 
						@click="handleGoto({url: '/pages/my/address/address', params: {source: 1}})"	
						style="background-color: #eee;"
					>
						<view class="u-flex-1"
							:class="{
								'u-info': !xpForm.addr
							}"
						>{{xpForm.addr || '点击选择地址'}}</view>
						<view class="u-p-t-6 u-p-l-10">
							<u-icon name="arrow-down"></u-icon>
						</view>
					</view>
					
				</u-form-item> 
				<u-form-item label="备注" prop="remark"  > 
					<u--textarea v-model="xpForm.remark" placeholder="请输入内容" ></u--textarea>
					
				</u-form-item> 
				
			</u--form> 
		</view>
		<view class="u-p-t-20 u-p-l-40 u-p-r-40 u-m-b-40">
			<u-button type="primary" @click="submit">发 布</u-button>
		</view>
		
		<u-safe-bottom></u-safe-bottom>
		<menusBar activeIndex="0" theme="chemnet"></menusBar>
	</view>
</template>

<script>
	const INIT_START_TIME = new Date().getTime()+3600*24*1000;
	const INIT_END_TIME = INIT_START_TIME + 3600*1000;
	import {mapState, mapMutations, mapActions} from "vuex"
	import menusBar from '@/components/menusBar/menusBarChemnet.vue'
	// import uniSection from '@/pages/my/components/uni-section/uni-section'
	export default {
		data() {
			return {
				pid: '',
				pan: 'b',
				picMaxCount: 5,
				cpy: '',
				product: '',
				prodInfo: '',
				prodUnit: '',
				prodInfoLoading: false,
				list: {
					unit: 'kg'
				},
				xpForm: {
					name: '',
					addr: '',
					num: 1,
					unit_num: 25,
					remark: ''
				},
				addressData: {}
			}
		},
		computed: {  
			rules() { 
				return {
					'name': {
						type: 'string',
						required: true,
						message: '请输入名称',
						trigger: ['blur', 'change']
					},
				}
				
			},
			 
		},
		async onLoad(options) { 
			if(options.hasOwnProperty('data')) {
				console.log(options.data)
			} 
			
			 
		},
		components: {
			menusBar
		},
		watch: {
			addressData(n) {
				console.log(n)
				this.xpForm.addr = n.contact + '-' + n.Regionals.reduce((pre, cur) => pre + cur.Particular.name, '') + n.address
			}
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
		}, 
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),  
			setPageTitle() {
				let title = '';
				if(this.pid) title = '更新'
				else title = '发布'
				
				if(this.pan == 'b') title += '买盘'
				else if(this.pan == 's') title += '卖盘'
				
				uni.setNavigationBarTitle({
					title: title
				})
			},
			submit() {
				
				this.$refs.from.validate().then(async res => {
					// uni.showLoading()
					
					let func = ''
					let params = {...this.xpForm};
					if(this.pan == 's') {
						 
						if(this.pid) {
							func = 'changeSell'
						}else {
							func = 'createSell'
						}
					}else {
						if(this.pid) {
							func = 'changeBuy'
						}else {
							func = 'createBuy'
						}
					}
					if(this.pid) params.id = this.pid
					console.log(params)
					// const r = await this.$api[func](params)
					// if(r.code == 1) {
					// 	const p = uni.$u.pages();
					// 	if(p.length > 1 && p[p.length - 2].route == 'pages/my/broker/list') {
					// 		p[p.length - 2].$vm.refreshList();
					// 		uni.navigateBack({
					// 			success() {
					// 				uni.showToast({
					// 					title: r.msg,
					// 					icon: 'none'
					// 				})
					// 			}
					// 		})
					// 		return
					// 	}
					// 	uni.redirectTo({
					// 		url: `/pages/my/broker/list?pan=${this.pan}`,
					// 		success() {
					// 			uni.showToast({
					// 				title: r.msg,
					// 				icon: 'none'
					// 			})
					// 		}
					// 	})
					// }
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('请检查表单内容')
				})
			}, 
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		
	}
	.data-pickerview {
		height: 400px;
		border: 1px #e5e5e5 solid;
	}
</style>
