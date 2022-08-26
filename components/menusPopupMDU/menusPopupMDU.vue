<template>
	<view>
		<u-popup
			:show="show" 
			mode="right"  
			@close="close" 
			@open="open"
			round="25"
			:bgColor="themeConfig.pageBg"
		>
			<view class="wrapper">
				<view class="form-wrapper u-p-20">
					<u--form
						labelPosition="top"
						:model="form" 
						labelWidth="100%"
						>
						<u-form-item
							label="标准品"
							prop="pid"
							ref="pid" 
						>
							<view @click="handleShowPopup('prod')">
								<u-input
									:value="pid_name"
									placeholder="点击选择标准品" 
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
						<u-form-item
							label="交易商"
							prop="customer_login"
							ref="customer_login"
							
						>
							<view @click="handleShowPopup('cpy')">
								<u-input
									:value="customer_name"
									placeholder="点击选择交易商" 
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
						<!-- <u-form-item
							label="企业角色"
							prop="mdu"
							ref="mdu"
						>
							 <u-radio-group
							    v-model="model.mdu"
							    placement="row"
							  >
							    <u-radio
							      :customStyle="{marginRight: '8px'}"
							      v-for="(item, index) in radiolist_mdu_filter"
							      :key="item.value"
							      :label="item.name"
							      :name="item.value"
							    >
							    </u-radio>
							  </u-radio-group>
						</u-form-item> -->
					</u--form>
				</view>
				<view class="btn-wrapper u-flex ">
					<view class="item u-text-center">
						清除选项
					</view>
					<view class="item u-text-center bg-primary">
						确 认
					</view>
				</view>
				<u-safe-bottom></u-safe-bottom>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:"menusPopupMDU",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			isBroker: {
				type: Boolean,
				default: false
			},
			formData: {
				type: Object,
				default: () => {
					return {
						mdu: '',
						customer_login: '',
						customer_name: '',
						pid: '',
						pid_name: '',
						state: '',
					}
				}
			},
		},
		data() {
			return {
				customer_name: '',
				pid_name: '',
				form: {
					mdu: '',
					customer_login: '',
					pid: '',
					state: '',
				}
			};
		},
		mounted() {},
		watch: {
			formData: {
				deep: true,
				handler(n) {
					console.log('deep', n)
					this.customer_name = n.customer_name;
					this.pid_name = n.pid_name;
					this.form.mdu = n.mdu;
					this.form.customer_login = n.customer_login;
					this.form.pid = n.pid;
					this.form.state = n.state;
				}
			}
		},
		computed: {
			...mapState({
				menusList: state => state.user.menusList,
				ppiCate: state => state.user.ppiCate, 
				myProduct: state => state.user.myProduct, 
				myAllCpy: state => state.user.myAllCpy,
				typeConfig: state => state.theme.typeConfig,
			}),
			themeConfig() {
				return this.typeConfig[this.theme]
			},
		},
		methods: {
			close() {
				this.$emit('close') 
			},
			async open() {
				this.initFormData()
			},
			initFormData() {
				this.form.mdu = this.formData.mdu
				this.form.customer_login = this.formData.customer_login
				this.customer_name = this.formData.customer_name
				this.form.pid = this.formData.pid
				this.pid_name = this.formData.pid_name
				this.form.state = this.formData.state
			},
			handleShowPopup(type) {
				this.$emit('showPopup', type)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		width: 85vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.form-wrapper {
		flex: 1;
	}
	.btn-wrapper {
		flex: 0 0 50px;
		height: 50px;
		width: 100%;
		.item {
			width: 50%;
			color: #fff; 
			background-color: #999;
			line-height: 50px;
		}
	}
</style>