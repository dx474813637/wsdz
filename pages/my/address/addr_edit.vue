<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<u-input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名"
				placeholder-class="placeholder" clearable />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<u-input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码"
				placeholder-class="placeholder" clearable />
		</view>
		<view class="row b-b" @click="chooseLocation2">
			<text class="tit">地区</text>
			<text class="input">
				{{addressData.regional_name || '请点击选择地区'}}
			</text>
			<u-icon name="arrow-down" size="24" ></u-icon>
			<!-- <text class="yticon icon-shouhuodizhi"></text> -->
			<!-- <input class="input" type="text" v-model="addressData.regional_name" placeholder="楼号、门牌" placeholder-class="placeholder" /> -->
		</view>
		<view class="row textarea b-b">
			<text class="tit">住址</text>
			<u--textarea 
				v-model="addressData.address" 
				placeholder="详细地址" 
				height="90"
				clearable
			></u--textarea>
			<!-- <u-input class="input" type="text" v-model="addressData.address" placeholder="收货人住址"
				placeholder-class="placeholder" /> -->
			<!-- <u-icon name="map-fill" size="36" color="#7181bd"></u-icon> -->
			<!-- <text class="yticon icon-shouhuodizhi"></text> -->
		</view>

		<view class="row default-row u-flex-between">
			<!-- <text class="tit">备注</text>
			<input class="input" type="text" v-model="addressData.remark" placeholder="备注"
				placeholder-class="placeholder" /> -->
			<text class="tit">设为默认</text>
			
			<u-switch :active-color="theme.themeColor" v-model="addressData.autoCheck" @change="switchChange"></u-switch>
			<!-- <switch :checked="addressData.defaule" @change="switchChange" /> -->
		</view>
		<button class="add-btn u-m-t-20 u-m-b-20" @click="confirmAddr">提 交</button>
		<button v-if="manageType == 'edit'" class="add-btn del-btn" @click="delAddrClick">删 除</button>
		<u-picker 
			:show="show" 
			ref="uPicker" 
			:columns="columns" 
			:loading="loading"
			@confirm="pickerConfirm" 
			@change="changeHandler"
		></u-picker>
		<!-- <u-select v-model="show" mode="mutil-column-auto" :list="regionalList" @confirm="areaConfirm"
			safe-area-inset-bottom :default-value="dArr"></u-select> -->
	</view>
</template>

<script>
	// import listMethods from "./reglist2selectlist.js"
	// import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	import {mapState, mapActions} from "vuex"
	export default {
		// mixins: [mixCheckLogin],
		data() {
			return {
				show: false,
				initDefault: false,
				columns: [
					['中国', '美国'],
					['深圳', '厦门', '上海', '拉萨']
				],
				columnData: [
					['深圳', '厦门', '上海', '拉萨'],
					['得州', '华盛顿', '纽约', '阿拉斯加']
				],
				
				addressData: {
					address: "",
					mobile: '',
					name: "",
					regional: '',
					regional_name: "",
					remark: "",
					autoCheck: false,
					auto: 0
				},
				dArr: [0, 0, 0],
				manageType: ''
			}
		},
		computed: {
			...mapState({
				theme: (state) => state.user.theme,
				regionalList: (state) => state.user.regionalList,
			}),
			loading() {
				return this.regionalList.length == 0
			}
		},
		watch: {
			['addressData.autoCheck'](flag) {
				if(flag) {
					this.addressData.auto = 1
				}else {
					this.addressData.auto = 0
				}
			}
		},
		async onLoad(option) {
			let title = '新增收货地址';
			if (this.regionalList.length == 0) {
				uni.showLoading({
					title: '初始化地区列表中...'
				})
				await this.getRegionalList()
				// uni.hideLoading()
			}
			// this.regionalList = this.$store.state.regionalList
			if (option.type === 'edit') {
				title = '编辑收货地址'
				// let res = await this.$http.get('address_detail', {params: {address_id:option.data.id}})
				this.addressData = JSON.parse(decodeURIComponent(option.data))
				if(this.addressData.auto == 1) {
					this.$set(this.addressData, "autoCheck", true)
					this.initDefault = true
				}else {
					this.$set(this.addressData, "autoCheck", false)
				}
				// this.filterRegionalList(this.addressData.regional, this.regionalList)
			}
			
			// console.log(this.addressData.regional)
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			...mapActions({
				getRegionalList: 'user/getRegionalList'
			}),
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			pickerConfirm(e) {
				console.log('confirm', e)
				this.show = false
			},
			switchChange(v) {
				if(!v && this.initDefault) {
					this.addressData.autoCheck = true
					uni.showToast({
						title: "至少一个默认地址",
						icon: "none"
					})
				}
				
			},
			filterRegionalList(code, list) {
				if (!code) return
				list.forEach((ele, index) => {
					if (ele.children && ele.children.length > 0) {
						ele.children.forEach((item, i) => {
							if (item.value == code) {
								this.dArr = [index, i, 0]
								return
							}
							if (item.children && item.children.length > 0) {
								item.children.forEach((item2, i2) => {
									if (item2.value == code) {
										this.dArr = [index, i, i2]
										return
									}
								})
								// this.dArr = [index, i]
							}
						})

					}
				})
			},
			chooseLocation2() {
				this.show = true
			},
			// areaConfirm(e) {
			// 	this.addressData.regional = e[2].value
			// 	let name = e[0].label + e[1].label
			// 	if(e[1].value !== e[2].value) name += e[2].label
			// 	this.addressData.regional_name = name
			// },
			//地图选择地址
			// chooseLocation() {
			// 	console.log('x')
			// 	uni.chooseLocation({
			// 		success: (data) => {
			// 			// console.log(data)
			// 			// this.addressData.regional_name = data.address;
			// 			this.addressData.address = data.address + ' ' + data.name;
			// 			// this.addressData.area = data.name;
			// 		}
			// 	})
			// },

			//提交
			async confirmAddr() {
				let data = this.addressData;
				if (!data.name) {
					uni.showToast({
						icon: 'error',
						title: '请填写联系人'
					})
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
					uni.showToast({
						icon: 'error',
						title: '请输入正确的手机号码'
					})
					return;
				}
				if (!data.regional_name) {
					uni.showToast({
						icon: 'error',
						title: '请选择地区'
					})
					return;
				}
				if (!data.address) {
					uni.showToast({
						icon: 'error',
						title: '请填写住址'
					})
					return;
				}
				await this.submitData(this.addressData)
				//this.$utils.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				this.$utils.prePage() && this.$utils.prePage().refreshList(this.manageType);
				uni.showToast({
					icon: 'success',
					title: `地址${this.manageType=='edit' ? '修改': '添加'}成功`
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 800)
			},
			async delAddrClick() {
				console.log(this.addressData)
				uni.showModal({
					title: '提示',
					content: '是否删除该地址？',
					success: async (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.showLoading()
							const res = await this.$api.delAddress({params: {id: this.addressData.id}})
							if(res.code == 1) {
								this.$utils.prePage() && this.$utils.prePage().refreshList(this.manageType);
								uni.showToast({
									icon: 'success',
									title: `删除成功`
								})
								setTimeout(() => {
									uni.navigateBack()
								}, 800)
							}
						}	
					}
				})
			},
			async submitData(addressData) {
				uni.showLoading({
					title: '地址提交中...'
				})
				let res = await this.$api.submitAddrData({
					name: addressData.name,
					mobile: addressData.mobile,
					regional: addressData.regional,
					address: addressData.address,
					remark: addressData.remark,
					address_id: addressData.id,
					auto: addressData.auto
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: $page-color-base;
		padding-top: 16rpx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30rpx;
		height: 110rpx;
		background: #fff;
		&.textarea {
			align-items: flex-start;
			height: auto;
			padding-top: 8rpx;
		}
		.tit {
			flex-shrink: 0;
			width: 140rpx;
			font-size: 30rpx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30rpx;
			color: $font-color-dark;
			height: 100%;
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			font-size: 36rpx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16rpx;

		// .tit {
		// 	flex: 1;
		// }

		switch {
			transform: translateX(16rpx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690rpx;
		height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10rpx;
		// box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		&.del-btn {
			background-color: $uni-color-error;
		}
	}
</style>
