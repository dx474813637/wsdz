<template>
	<view class="w" :class="{
		active: tabs_current != 0
	}">
		<!-- <u-sticky bgColor="#f8f8f8">
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
		</u-sticky> -->
		<view class="u-p-l-20 u-p-r-20 main-w">
			
			<view class="u-p-20 main" >
				<u--form
					labelPosition="left"
					:model="model"
					:rules="rules"
					ref="from"
					labelWidth="80"
					>
					
						<u-form-item
							label="标准商品"
							prop="standard"
							ref="standard"
							required
						>
							<view @click="show = true">
								<u-input
									:value="product"
									placeholder="点击选择标准商品" 
									readonly
								>
									<template slot="suffix">
										<view class="">
											<i class="custom-icon-unfold custom-icon"></i>
										</view>	
									</template>
								</u-input>
							</view>
							
						</u-form-item>
						
						<menusPopup 
							:show="show" 
							theme="white"
							@close="show = false"
							@confirm="menusConfirm"
						></menusPopup>
						<u-form-item
							label="名称"
							prop="name"
							ref="name"
							required
						>
							<u--input
								v-model="model.name"
								clearable
							></u--input>
						</u-form-item>
						<u-form-item
							label="单位"
							prop="unit"
							ref="unit"
							required
						>
							<u--input
								v-model="model.unit"
								clearable
								placeholder="平方米，立方米，吨，升，米，千克"
							></u--input>
						</u-form-item>
						<view class=""
							:key="item.key"
							v-for="(item, index) in attrObj">
							<template v-if="item.type == 'base'">
								<u-form-item
									:label="item.label"
								>
									<u--input
										v-model="item.value"
										clearable
									></u--input>
								</u-form-item>
							</template>
							<template v-else>
								<view class="u-flex u-flex-items-center u-m-t-10 u-m-b-30">
									<view class="u-p-r-10" style="width: 75px;">
										<u--input
											v-model="item.label"
											clearable
											placeholder="属性名"
										></u--input>
									</view>
									<view class="u-flex-1">
										<u--input
											v-model="item.value"
											clearable
											placeholder="属性值"
										></u--input>
									</view>
									<view class="u-p-l-20 u-p-r-10">
										<u-icon @click="removeCustomAttr(item.key)" name="minus-circle-fill" size="20" color="#ff0000"></u-icon>
									</view>
									
								</view>
							</template>
						</view>
						
						<view class="u-p-40 u-border u-flex u-flex-items-center u-flex-center"
							style="border-style: dashed;border-radius: 20rpx; color: #999;background-color: #f8f8f8;"
							@click="addCustomAttr"
						>
							<u-icon name="plus-circle" color="#999"></u-icon>
							<text class="u-p-l-20 u-font-28">新增自定义属性</text>
						</view>
						<u-form-item
							label="需求类型"
							prop="type"
							ref="type"
						>
							 <u-radio-group
								v-model="model.trade_type"
								placement="row"
							  >
								<u-radio
								  :customStyle="{marginRight: '8px'}"
								  v-for="(item, index) in radiolist_type"
								  :key="item.value"
								  :label="item.name"
								  :name="item.value"
								>
								</u-radio>
							  </u-radio-group>
						</u-form-item>
						<!-- <u-form-item
							label="图片"
							prop="pic1"
							ref="pic1"
						>
							<u-upload
								:fileList="fileList1"
								@afterRead="afterRead"
								@delete="deletePic"
								name="1"
								:maxCount="1"
							></u-upload>
						</u-form-item> -->
						
						<u-form-item
							label="商品简介"
							prop="intro"
							ref="intro"
						>
							<u--textarea
								v-model="model.intro" 
								placeholder="商品简介" 
								height="90"
							></u--textarea>
						</u-form-item>
						
				</u--form>
				<view class="u-p-t-20 u-m-b-40">
					<u-button type="primary" @click="submit">提交</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import BrokerCard from '@/pages/my/components/BrokerCard/BrokerCard.vue'
	export default {
		data() {
			return {
				indexList: [],
				tabs_current: 0,
				loadstatus: 'loadmore',
				tabs_list: [
					{
						name: '商品信息',
						disabled: false,
					},
					{
						name: '我的买盘相关',
						pan: 'b',
						disabled: false,
					},
					{
						name: '我的卖盘相关',
						pan: 's',
						disabled: false,
					},
				],
				activeTabsStyle: {
					fontSize: '34rpx',
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				pid: '',
				product: '',
				show: false,
				model: {
					standard: '',
					name: '',
					unit: '',
					intro: '',
					trade_type: 'bs',
					pic1: ''
				},
				attrObj: [
					{
						label: '品牌',
						key: 'attr_common_11',
						value: '',
						type: 'base'
					},
					{
						label: '规格属性',
						key: 'attr_common_12',
						value: '',
						type: 'base'
					},
					{
						label: '生产商',
						key: 'attr_common_13',
						value: '',
						type: 'base'
					},
					{
						label: '质量标准',
						key: 'attr_common_14',
						value: '',
						type: 'base'
					},
				],
				fileList1: [],
				radiolist_type: [
					{
						name: '买盘',
						disabled: false,
						value: "b"
					},
					{
						name: '卖盘',
						disabled: false,
						value: "s"
					},
					{
						name: '均可',
						disabled: false,
						value: "bs"
					},
				],
			}
		},
		components: {
			BrokerCard
		},
		computed: {
			...mapState({
				login: state => state.user.login
			}),
			rules() {
				return {
					'standard': {
						type: 'string',
						required: true,
						message: '请选择商品',
						trigger: ['blur', 'change']
					},
					'name': {
						type: 'string',
						required: true,
						message: '请填写名称',
						trigger: ['blur', 'change']
					},
					'unit': {
						type: 'string',
						required: true,
						message: '请填写单位',
						trigger: ['blur', 'change']
					},
				}
			},
		},
		onLoad(options) {
			if(!options.hasOwnProperty('pid')) {
				uni.setNavigationBarTitle({
					title: '交易商品名添加'
				})
			}else {
				let obj = JSON.parse(decodeURIComponent(options.data))
				this.pid = options.pid
				this.product = obj.Standard.name
				this.getEditData()
			}
			
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			// async handleChangeStatus({state, id}) {
			// 	const res = await this.$api[this.tabs_list[this.tabs_current].pan == 's'? 'ableSell' : 'ableBuy']({params: {id, state}})
			// 	if(res.code == 1) {
			// 		const index = this.indexList.findIndex(ele => ele.id == id)
			// 		this.indexList[index].state = state
					
			// 	}
			// },
			// handleProdDetail({pid, data}) {
			// 	this.handleGoto({
			// 		url: '/pages/my/broker/edit',
			// 		params: {
			// 			pid: pid,
			// 			pan: this.tabs_list[this.tabs_current].pan,
			// 			data: encodeURIComponent(JSON.stringify(data)),
			// 		}
			// 	})
			// },
			// async handleDelet({id}) {
			// 	const res = await this.$api[this.tabs_list[this.tabs_current].pan == 's'? 'deleteSell' : 'deleteBuy']({params: {id}})
			// 	if(res.code == 1) {
			// 		uni.showToast({
			// 			title: '删除成功'
			// 		})
			// 		const index = this.indexList.findIndex(ele => ele.id == id)
			// 		this.indexList.splice(index, 1)
			// 	}
				
				
			// },
			// changeTabsStatus(key, value) {
			// 	this.tabs_list = this.tabs_list.map(ele => {
			// 		ele[key] = value;
			// 		return ele
			// 	})
			// },
			// initParamas() {
			// 	this.curP = 1;
			// 	this.indexList = [];
			// 	this.loadstatus = 'loadmore'
			// },
			// async handleTabsChange(value) {
			// 	this.tabs_current = value.index
			// 	this.changeTabsStatus('disabled', true)
			// 	this.initParamas();
			// 	if(value.index != 0) {
			// 		uni.showLoading();
			// 		await this.getMyPanData()
			// 	}
				
			// 	this.changeTabsStatus('disabled', false)
			// },
			// scrolltolower() {
			// 	this.getMoreData()
			// },
			// async getMoreData() {
			// 	if(this.loadstatus != 'loadmore') return
			// 	this.curP ++
			// 	await this.getMyPanData()
			// },
			// async getMyPanData() {
			// 	if(this.loadstatus != 'loadmore') return
			// 	this.loadstatus = 'loading'
			// 	const res = await this.$api[this.tabs_list[this.tabs_current].pan == 's'? 'mySell': 'myBuy']({
			// 		params: {
			// 			// login: this.login,
			// 			p: this.curP,
			// 			// standard: this.pid
			// 		}
			// 	})
			// 	if(res.code == 1) {
			// 		this.indexList = [...this.indexList, ...res.list]
			// 		if(this.indexList.length >= res.total) {
			// 			this.loadstatus = 'nomore'
			// 		}else {
			// 			this.loadstatus = 'loadmore'
			// 		}
			// 	}
			// },
			removeCustomAttr(key) {
				let i = this.attrObj.map(ele => ele.key).indexOf(key);
				
				this.attrObj.splice(i, 1)
			},
			addCustomAttr() {
				this.$set(this.attrObj, this.attrObj.length, {
					label: '',
					value: '',
					type: 'custom',
					key: 'custom'+ new Date().getTime()
				})
			},
			async getEditData() {
				uni.showLoading()
				const res = await this.$api.getCompanyProductDetail({params: {id: this.pid}})
				if(res.code == 1) {
					this.model.standard = res.list.standard
					this.model.name = res.list.name
					this.model.unit = res.list.unit
					this.model.intro = res.list.intro
					this.model.trade_type = res.list.trade_type
					this.model.pic1 = res.list.pic1
					this.bianliAttr(res.list.list_product_attrs)
				}
			},
			bianliAttr(attrObj) {
				const attrBase = this.attrObj.map(ele => ele.key)
				attrObj.forEach(ele => {
					let i = attrBase.indexOf(ele.code);
					if(i != -1) {
						this.attrObj[i].value = ele.value
						this.attrObj[i].label = ele.Attr.name
					} else {
						this.$set(this.attrObj, this.attrObj.length, {
							label: ele.Attr.name,
							value: ele.value,
							key: ele.code,
							type: 'custom'
						})
					}
				})
			},
			async menusConfirm(data) {
				this.product = data.name
				this.model.standard = data.id
				if(!this.model.name) this.model.name = data.name
				this.$refs.from.validateField('standard')
				this.$refs.from.validateField('name')
				this.show = false;
			},
			submit() {
				
				this.$refs.from.validate().then(async res => {
					uni.showLoading()
					// uni.$u.toast('校验通过')
					let attrBaseObj = {}
					let attrCustomObj = {
						attr_custom_key: [],
						attr_custom_val: [],
					}
					this.attrObj.forEach(ele => {
						if(ele.type == 'base') {
							attrBaseObj[ele.key] = ele.value
						}else {
							attrCustomObj.attr_custom_key.push(ele.label)
							attrCustomObj.attr_custom_val.push(ele.value)
						}
					})
					let params = {
						...this.model,
						...attrBaseObj,
						...attrCustomObj
					}
					if(this.pid) params.id = this.pid
					const r = await this.$api[this.pid? 'changeProduct' : 'createProduct'](params)
					if(r.code == 1) {
						uni.redirectTo({
							url: '/pages/my/broker/prod_set',
							success() {
								uni.showToast({
									title: r.msg,
									icon: 'none'
								})
							}
						})
					}
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('校验失败')
				})
			},
			
			
			
		}
	}
</script>
<style lang="scss">
	page {
		// background-color: #f8f8f8;
	}
</style>
<style scoped lang="scss">
	.w {
		min-height: 100vh;
		&.active {
			height: 100vh;
		}
	}
	.list {
		height: 100%;
	}
	.main {
		background-color: #fff;
		border-radius: 15px;
		height: 100%;
		box-sizing: border-box;
	}
	.main2 {
		height: 100%;
		box-sizing: border-box;
	}
	.main-w {
		height: calc(100% - 44px);
	}
</style>
