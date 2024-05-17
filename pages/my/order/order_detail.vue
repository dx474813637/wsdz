<template>
	<view class="u-p-20" >
		<view class="addr-content-box u-m-b-30" >
			<view class="addr-content u-p-30">
				<view class="addr-row u-m-b-10 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">交收方式</view>
					<view class="item u-text-right">{{list.settle_mode | settleMode}}</view>
				</view>
				<view class="addr-row u-m-b-10 u-flex u-flex-items-start u-flex-between" v-if="list.delivery_place">
					<view class="item text-light item-label">交收区域</view>
					<view class="item u-text-right" v-if="list.Regionals">{{list.Regionals.map(ele => ele.Particular.name).join('/')}}</view>
				</view>
				<view class="addr-row u-m-b-10 u-flex u-flex-items-start u-flex-between" v-if="list.settle_address">
					<view class="item text-light item-label">交收地址</view>
					<view class="item u-text-right" style="word-break: break-all;">{{list.settle_address}}</view>
				</view>
			</view>
			
		</view>
		<view class="main u-p-30">
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单编号</view>
				<view class="item u-text-right">{{list.id}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.Source">
				<view class="item text-light item-label">来源</view>
				<view class="item text-primary" @click="handleGoto({url: '/pages/index/pan/panDetail', params: {
					id: list.source_id, 
					pan: list.source == 'BUY'? 'b' : 's', 
					fxid: list.fxid,
					trade_mode: (list.settle_type == 'GRT' || list.fxid) ? 1 : ''
					}})">{{list.source | source2str}}：{{list.source_name}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.intro">
				<view class="item text-light item-label">商品详情</view>
				<view class="item u-text-right u-line-3">
					<rich-text :nodes="list.intro"></rich-text>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">买方</view>
				<view class="item u-text-right" v-if="list.B_company">{{list.B_company.name}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">卖方</view>
				<view class="item u-text-right" v-if="list.S_company">{{list.S_company.name}}</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">数量</view>
				<view class="item u-text-right">{{list.amount}}{{list.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">单价</view>
				<view class="item u-text-right">{{list.price2}} 元/{{list.unit}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">商品总额</view>
				<view class="item u-text-right">{{list.total_price2}} 元</view>
			</view>
			<template v-if="list.end_price1">
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">首付款</view>
					<view class="item u-text-right">{{list.begin_price1}} 元</view>
				</view> 
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">尾款</view>
					<view class="item u-text-right">{{list.end_price1}} 元</view>
				</view> 
			</template>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单类型</view>
				<view class="item u-text-right">{{list.order_type | orderType2str}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">下单日期</view>
				<view class="item u-text-right">{{list.create_time}}</view>
			</view>
			<template v-if="list.trade_mode == '3'">
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">基准合约</view>
					<view class="item u-text-right">{{list.Source.Base_role.contract}}</view>
				</view> 
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">基差</view>
					<view class="item u-text-right">
						<template v-if="list.Source.price1 >= 0">+</template>
						{{list.Source.price1}} 元/{{list.Source.unit}}
					</view>
				</view>
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">点价开始日</view>
					<view class="item u-text-right">{{list.Base_item.base_btime1}}</view>
				</view>
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">点价截止日</view>
					<view class="item u-text-right">{{list.Base_item.base_etime1}}</view>
				</view>
			</template>
			
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.order_type == '1'">
				<view class="item text-light item-label">交付方式</view>
				<view class="item u-text-right">{{list.settle_type | settleType2str}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.order_type == '1'">
				<view class="item text-light item-label">支付工具</view>
				<view class="item u-text-right">{{list.pay_mode | paymode2str}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.pay_state && list.order_type == '1'">
				<view class="item text-light item-label">支付状态</view>
				<view class="item u-text-right" v-if="list.pay_mode"> 
					<template v-if="list.pay_mode.includes('FUNDPAY')">{{list.pay_state | payFundState2Str}}</template>
					<template v-else-if="list.pay_mode.includes('BILLPAY')">{{list.pay_state | payBillState2Str}}</template>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">交收状态</view>
				<view class="item u-text-right">{{list.settle_state == '1'? '已交收' :'未交收'}}</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
				<view class="item text-light item-label">订单状态</view>
				<view class="item u-text-right">
					{{list.State.name}}
					<!-- <template v-if="list.hasOwnProperty('toState') && list.toState">
						{{list.toState}}
					</template>
					<template v-else>
						{{list.state | orderState2Str(list.order_type)}}
					</template> -->
				</view>
			</view> 
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.remark">
				<view class="item text-light item-label">订单备注</view>
				<view class="item u-text-right" style="word-break: break-all;">
					<rich-text :nodes="list.remark"></rich-text>
				</view>
			</view>
			<template v-if="esign_info.id">
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">签约方式</view>
					<view class="item u-text-right">{{list.esign_type | esignType2Str}}</view>
				</view>
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="esign_info.ContractNo">
					<view class="item text-light item-label">合同编号</view>
					<view class="item u-text-right">{{esign_info.ContractNo }}</view>
				</view>
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.State.value == '42'">
					<view class="item text-light item-label">签约说明</view>
					<view class="item u-text-right">
						<u--text type="error" text="开启签约后，签约信息将以短信的形式发送至用户签约代理人手机上"></u--text>
					</view>
				</view>
			</template>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="nopay_info.id">
				<view class="item text-light item-label">线下支付凭证</view>
				<view class="item u-text-right" >
					<u--image 
					width="120px" 
					height="120px" 
					:src="`https://thumb-album.rawmex.cn/0-0/${nopay_info.pic1}`"
					@click="previewImgBtn([`https://thumb-album.rawmex.cn/0-0/${nopay_info.pic1}`])"
					></u--image>
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="nopay_info.type">
				<view class="item text-light item-label">凭证类型</view>
				<view class="item u-text-right" >
					<template v-if="nopay_info.type == '1'">现金转账凭证</template> 
					<template v-if="nopay_info.type == '2'">电票支付凭证</template> 
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="nopay_info.state">
				<view class="item text-light item-label">线下凭证状态</view>
				<view class="item u-text-right" >
					<template v-if="nopay_info.state == '3'">卖家拒绝</template>  
					<template v-if="nopay_info.state == '1'">卖家同意</template>  
					<template v-if="nopay_info.state == '0'">待审核</template>  
				</view>
			</view>
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="nopay_info.remark">
				<view class="item text-light item-label">线下支付备注</view>
				<view class="item u-text-right" style="word-break: break-all;">
					<rich-text :nodes="nopay_info.remark"></rich-text>
				</view>
			</view>
			<template v-if="list.Order_settle && list.Order_settle[0]">
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">交收结算状态</view>
					<view class="item u-text-right">{{nopay_info.Order.Order_settle_active.State.name}}</view>
				</view> 
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.Order_settle[0].state != 3">
					<view class="item text-light item-label"></view>
					<view class="item u-text-right" @click="handleGoto({url: '/pages/my/order/order_settle_detail', params: {id: list.Order_settle[0].id}})">
						<u-button size="small" type="primary">查看交收结算订单</u-button>
					</view>
				</view>
			</template>
			
			
			<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="list.remark_audit">
				<view class="item text-light item-label">审核备注</view>
				<view class="item u-text-right" style="word-break: break-all;">
					<rich-text :nodes="list.remark_audit"></rich-text>
				</view>
			</view>
			<template v-if="list.Order_end.id && list.Order_end.pay_id">
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between" v-if="nopayEnd_info.pic1">
					<view class="item text-light item-label">尾款支付凭证</view>
					<view class="item u-text-right" >
						<u--image 
						width="120px" 
						height="120px" 
						:src="`https://thumb-album.rawmex.cn/0-0/${nopayEnd_info.pic1}`"
						@click="previewImgBtn([`https://thumb-album.rawmex.cn/0-0/${nopayEnd_info.pic1}`])"
						></u--image>
					</view>
				</view>
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">尾款支付备注</view>
					<view class="item u-text-right">{{nopayEnd_info.remark}}</view>
				</view>  
				<view class="main-row u-m-b-30 u-flex u-flex-items-start u-flex-between">
					<view class="item text-light item-label">尾款状态</view>
					<view class="item u-text-right">
						<template v-if="nopayEnd_info.state == 1">
							卖家同意
						</template>
						<template v-else-if="nopayEnd_info.state == 2">
							卖家拒绝
						</template>
						<template v-else>
							待审核
						</template>
					</view>
				</view>  
			</template>
		</view>
		<view class="main u-p-8 u-m-t-30">
			<view class="btn-wrap u-flex u-flex-items-center u-flex-wrap">
				<view class="item u-p-6"
						v-if="btnList.button1"
					> <!-- 取消 -->
					<u-button type="primary" @click="order_cancel">{{btnList.button1_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button2"
					> <!-- 修改 -->
					<u-button type="primary" @click="handleGoto({url: '/pages/my/order/order_edit', params: {type: 'edit', id, ordertype}})">{{btnList.button2_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button3"
					> <!-- 发送 -->
					<u-button type="primary" @click="order_submit">{{btnList.button3_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button21"
					> <!-- 基差待发送 -->
					<u-button type="primary" @click="base_submit">{{btnList.button21_title}}</u-button>
				</view> 
				<view class="item u-p-6"
						v-if="btnList.button20"
					> <!-- 对发送订单的撤回按钮 -->
					<u-button type="primary" @click="unsubmit_order">{{btnList.button20_title}}</u-button>
				</view> 
				<view class="item u-p-6"
						v-if="btnList.button4"
					> <!-- 审核 -->
					<u-button type="primary" @click="handleShowPopup({mode:'audit'})">{{btnList.button4_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button22"
					> <!-- 基差审核 -->
					<u-button type="primary" @click="handleShowPopup({mode:'audit_base'})">{{btnList.button22_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button5"
					> <!-- 现金发起支付 -->
					<u-button type="primary" @click="handleShowPopup({mode:'create_pay', isBill: false })">{{btnList.button5_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button23"
					> <!-- 提交线下支付凭证 -->
					<u-button type="primary" @click="handleShowPopup({mode:'create_pay', isUnderLine: true })">{{btnList.button23_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button24"
					> <!-- 审核线下支付凭证 -->
					<u-button type="primary" @click="checkOrderNoPayBtn">{{btnList.button24_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button26"
					> <!-- 发起尾款支付流程 -->
					<u-button type="primary" @click="createEndPay">{{btnList.button26_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button27"
					> <!-- 提交尾款支付凭证 -->
					<u-button type="primary" @click="handleShowPopup({mode:'create_pay', isUnderLine: true, isEndPay: true})">{{btnList.button27_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button25"
					> <!-- 发起结算 -->
					<u-button type="primary" @click="checkBtnModal({mode:'create_settle', modalText: {content: '交收中若有多还少补，请确认继续'}})">{{btnList.button25_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button6"
					> <!-- 发货 -->
					<u-button type="primary" @click="handleShowPopup({mode:'send'})">{{btnList.button6_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button7"
					> <!-- 直接支付确认收货 -->
					<u-button type="primary" @click="handleShowPopup({mode:'confirm', isBill: false, isGRT: false })">{{btnList.button7_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button8"
					> <!-- 担保支付确认收货 -->
					<u-button type="primary" @click="handleShowPopup({mode:'confirm', isBill: false, isGRT: true})">{{btnList.button8_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button9"
					> <!-- 票据发起支付 -->
					<u-button type="primary" @click="handleShowPopup({mode:'create_pay', isBill: true })">{{btnList.button9_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button10"
					> <!-- 票据直接支付确认收货 -->
					<u-button type="primary" @click="handleShowPopup({mode:'confirm', isBill: true, isGRT: false})">{{btnList.button10_title}}</u-button>
				</view>
				<view class="item u-p-6"
						v-if="btnList.button11"
					> <!-- 票据担保支付确认收货 -->
					<u-button type="primary" @click="handleShowPopup({mode:'confirm', isBill: true, isGRT: false})">{{btnList.button11_title}}</u-button>
				</view> 
				<view class="item u-p-6"
						v-if="btnList.button28"
					> <!-- 款到发货-买方要求签约 -->
					<u-button type="primary" @click="DPWantESignBtn">{{btnList.button28_title}}</u-button>
				</view> 
				<view class="item u-p-6"
						v-if="btnList.button29"
					> <!-- 款到发货-买方或卖方取消签约（发送要求签约后） -->
					<u-button type="primary" @click="DPCancelESignBtn">{{btnList.button29_title}}</u-button>
				</view> 
				<view class="item u-p-6"
						v-if="btnList.button30"
					> <!-- 款到发货-卖方确认并发起签约 -->
					<u-button type="primary" @click="handleShowPopup({mode:'esign', create_confirm: true})">{{btnList.button30_title || '卖方确认并发起签约'}}</u-button>
				</view> 
				<view class="item u-p-6"
						v-if="btnList.button31"
					> <!-- 卖方撤回签约 -->
					<u-button type="primary" @click="cancelESignConfirmBtn">{{btnList.button31_title}}</u-button>
				</view> 
				<view class="item u-p-6"
						v-if="btnList.button32"
					> <!-- 买方确认协商结果 -->
					<u-button type="primary" @click="handleShowPopup({mode:'esign', confirm: true})">{{btnList.button32_title}}</u-button>
				</view> 
				<view class="item u-p-6"
						v-if="btnList.button33"
					> <!-- 开启签约 -->
					<u-button type="primary" @click="esignStartBtn">{{btnList.button33_title}}</u-button>
				</view> 
			</view>
		</view>
		<u-popup 
			:show="show" 
			mode="bottom"  
			@close="show = false"  
			round="25"
			bgColor="#fff"
			>
			<view class="wrapper" :style="{
				backgroundColor: themeConfig.pageBg,
				color: themeConfig.baseText,
			}">
				<view class="header u-p-18"  :style="{
					backgroundColor: themeConfig.navBg,
				}">
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item u-flex-1">
							<text class="u-info" @click="show = false">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34">
								<template v-if="formActive.mode == 'send'">{{fahuo}}表单</template>
								<template v-else-if="formActive.mode == 'audit'">审核表单</template>
								<template v-else-if="formActive.mode == 'create_pay'">支付订单</template>
								<template v-else-if="formActive.mode == 'confirm'">收货确认</template>
								<template v-else-if="formActive.mode == 'create_settle'">发起结算</template>
								<template v-else-if="formActive.mode == 'esign'">签约订单</template>
							</text>
						</view>
						<view class="item u-flex-1 u-text-right">
						
						</view>
					</view>
				</view>
				<view class="main" :style="{
					backgroundColor: themeConfig.pageBg,
				}">
					<u-list height="100%">
						<view class="form-content u-p-20"> 
							<template v-if="formActive.mode != 'esign'"> 
								<u--form
									labelPosition="left" 
									labelWidth="80" 
									>
									<u-form-item
										label="交付方式" 
										>
										<view>{{list.settle_type | settleType2str}}</view>
									</u-form-item>
									<u-form-item
										label="支付工具" 
										>
										<view>{{list.pay_mode | paymode2str}}</view>
									</u-form-item>
								</u--form>
							</template>
							<template v-if="formActive.mode == 'audit'"> 
								<u--form
									labelPosition="left"
									:model="form_audit"
									ref="form_audit"
									labelWidth="80"
									>  
									<u-form-item
										label="审核意见" 
									>
										<u-radio-group
										    v-model="form_audit.audit"
										    placement="row"
										  >
										    <u-radio
										      :customStyle="{marginRight: '8px'}"
										      v-for="(item, index) in shyj"
										      :key="index"
										      :name="item.value"
										      :label="item.name"
										    >
										    </u-radio>
										  </u-radio-group>
									</u-form-item>
									<u-form-item
										label="议价总额" 
									>
										<u--input
											:value="list.total_price2" 
											disabled 
										></u--input>
									</u-form-item>
									<u-form-item
										label="收款票据" 
										 required
										v-if="list.pay_mode.includes('BILLPAY')"
									>
										<view class="" @click="show_billacc = true">
											<u--input
												:value="form_audit.pyeeInfo" 
												placeholder="选择收款票据账户"
												suffixIcon="arrow-down"
												suffixIconStyle="color: #909399"
												readonly
												:customStyle="{background: '#fff'}"
											></u--input>
										</view>
										
									</u-form-item>
									<u-form-item
										label="审核备注" 
									>
										<u--textarea
											v-model="form_audit.remark_audit" 
											placeholder="审核备注" 
											height="90"
											maxlength="-1"
										></u--textarea>
									</u-form-item>
									 
								</u--form>
							</template>
							<template v-if="formActive.mode == 'audit_base'"> 
								<u--form
									labelPosition="left"
									:model="form_audit_base"
									ref="form_audit_base"
									labelWidth="80"
									>  
									<u-form-item
										label="审核意见" 
									>
										<u-radio-group
										    v-model="form_audit_base.audit"
										    placement="row"
										  >
										    <u-radio
										      :customStyle="{marginRight: '8px'}"
										      v-for="(item, index) in shyj_base"
										      :key="index"
										      :name="item.value"
										      :label="item.name"
										    >
										    </u-radio>
										  </u-radio-group>
									</u-form-item>
									<u-form-item
										label="总额" 
									>
										<u--input
											:value="list.total_price2" 
											disabled 
										></u--input>
									</u-form-item> 
									<u-form-item
										label="审核备注" 
									>
										<u--textarea
											v-model="form_audit_base.remark_audit" 
											placeholder="审核备注" 
											height="90"
											maxlength="-1"
										></u--textarea>
									</u-form-item>
									 
								</u--form>
							</template>
							<template v-if="formActive.mode == 'send'">
								<u--form
									labelPosition="left"
									:model="form_send"
									ref="form_send"
									labelWidth="80"
									>
									<u-form-item
										:label="`${fahuo}备注`" 
									>
										<u--textarea
											v-model="form_send.remark_send" 
											:placeholder="`${fahuo}备注`" 
											height="90"
											maxlength="-1"
										></u--textarea>
									</u-form-item>
								</u--form>
							</template>
							<template v-if="formActive.mode == 'create_pay' || formActive.mode == 'confirm' ">
								<u--form
									labelPosition="left" 
									labelWidth="80" 
									v-if="!formActive.isUnderLine"
									>  
										<u-form-item
											label="支付订单" 
											>
											<view class="u-flex u-flex-items-center"> 
												<view class="item text-primary"
													@click="handleGoto({ url: '/pages/my/money/bill_detail', params: {id: list.pay_id, paytype: ordertype} })" >
													查看当前支付订单详情
												</view>
											</view>
										</u-form-item>
										<u-form-item
											label="支付状态" 
											>
											<view v-if="!formActive.isBill">{{list.pay_state | payFundState2Str}}</view>
											<view v-else>{{list.pay_state | payBillState2Str}}</view>
										</u-form-item>
									</u--form>
								
							</template>
							<template v-if="formActive.mode == 'create_settle'">
								<u--form
									labelPosition="left"
									:model="form_create_settle"
									ref="form_create_settle"
									labelWidth="80"
									>
									<u-form-item
										label="订单总额"  
									>
										<view>{{list.total_price2}} 元</view>
									</u-form-item>
									<u-form-item
										label="订单单价"  
									>
										<view>{{list.price2}} 元/{{list.unit}}</view>
									</u-form-item>
									<u-form-item
										label="订单数量"  
									>
										<view>{{list.amount}} {{list.unit}}</view>
									</u-form-item>
									<u-form-item
										label="交收单价"
										prop="price"
									>
										<view class="u-flex u-flex-items-center">
											<view class="u-flex-1">
												<u--input 
													v-model="form_create_settle.price"
													clearable 
													:customStyle="{backgroundColor: '#fff'}"
													type="digit" 
												></u--input> 
											</view>
											<view class="u-p-l-10">元/{{list.unit}}</view>
										</view> 
									</u-form-item>  
									<u-form-item
										label="交收数量"
										prop="amount"
									>
										<view class="u-flex u-flex-items-center">
											<view class="u-flex-1">
												<u--input 
													v-model="form_create_settle.amount"
													clearable 
													:customStyle="{backgroundColor: '#fff'}"
												></u--input> 
											</view>
											<view class="u-p-l-10">{{list.unit}}</view>
										</view> 
									</u-form-item>  
									<u-form-item
										label="差额处理" 
									>
										<view class="text-error">{{diff | diffRes}}</view>
									</u-form-item> 
									<u-form-item
										label="交收差额" 
									>
										<view>{{diff2}} 元</view>
									</u-form-item> 
									<u-form-item
										label="结算总额" 
									>
										<view>{{settleSum}} 元</view>
									</u-form-item>  
								</u--form>
							</template>
							<template v-if="formActive.mode == 'create_pay'">
								<u--form
									labelPosition="left"
									:model="form_underLine"
									ref="form_underLine"
									labelWidth="100"
									v-if="formActive.isUnderLine"
									>
									<template v-if="list.Order_end.id">
										<u-form-item
											label="订单尾款" 
											>
											<view>{{list.end_price1}} 元</view>
										</u-form-item>
									</template>
									<template v-else-if="list.end_price1">
										<u-form-item
											label="订单首付" 
											>
											<view>{{list.begin_price1}} 元</view>
										</u-form-item>
									</template>
									<template v-else>
										<u-form-item
											label="支付金额" 
											>
											<view>{{list.total_price2}} 元</view>
										</u-form-item>
									</template>
									
									<u-form-item
										label="收款银行账户" 
										v-if="list.pay.result.bank_accno"
										>
										<view>{{list.pay.result.bank_accno}}</view>
									</u-form-item>
									<u-form-item
										label="银行账户名" 
										v-if="list.pay.result.bank_accname"
										>
										<view>{{list.pay.result.bank_accname}}</view>
									</u-form-item>
									<u-form-item
										label="开户行" 
										v-if="list.pay.result.bank_name"
										>
										<view>{{list.pay.result.bank_code}} | {{list.pay.result.bank_name}}</view>
									</u-form-item>
									<u-form-item
										label="开户行行号" 
										v-if="list.pay.result.bank_no"
										>
										<view>{{list.pay.result.bank_no}}</view>
									</u-form-item>
									<u-form-item
										label="支付凭证"
										required
										>
										<view >
											<u-upload
												:fileList="fileList1"
												@afterRead="afterRead"
												@delete="deletePic"
												name="1"
												:maxCount="1"
												:maxSize="2048000"
												@oversize="handleoversize"
											></u-upload>
											<view class="u-info u-font-28">建议上传2M以内的图片</view>
										</view>
									</u-form-item> 
									<u-form-item
										label="凭证类型" 
										required
									>
										<u-radio-group
										    v-model="form_underLine.type"
										    placement="row"
										  >
										    <u-radio
										      :customStyle="{marginRight: '8px'}"
										      v-for="(item, index) in outline_pay_type"
										      :key="index"
										      :name="item.value"
										      :label="item.name"
										    >
										    </u-radio>
										  </u-radio-group>
									</u-form-item>
									<u-form-item
										label="备注"  
									>
										<u--input 
											v-model="form_underLine.remark"   
											placeholder="备注" 
										></u--input>
									</u-form-item> 
								</u--form>
								<u--form
									labelPosition="left"
									:model="form_pay"
									ref="form_pay"
									labelWidth="80"
									v-if="formActive.isBill == false"
									> 
									<template v-if="payOrderLoading">
										<view class="u-p-20">
											<u-loading-icon mode="circle" ></u-loading-icon>
										</view> 
									</template>
									<template v-else-if="paylist.hasOwnProperty('Sino_fund_order') && paylist.Sino_fund_order.paymode == '2'">
										<u-form-item
											label="支付方式" 
											>
											<view class="text-error">
												两站式-请财务登录电脑端sinopay平台完成支付
											</view>
										</u-form-item>
									</template>
									<template v-else>
										<u-form-item
											label="支付方式" 
											>
											<u-radio-group
												v-model="form_pay.paymode"
												placement="row"
												>
												<u-radio
												  :customStyle="{marginRight: '8px'}"
												  v-for="(item, index) in paymode_radios"
												  :key="index"
												  :name="item.value"
												  :label="item.name"
												  :disabled="item.disabled"
												>
												</u-radio>
											  </u-radio-group>
										</u-form-item>
										<u-form-item
											label="支付密码" 
											v-if="form_pay.paymode == '1'"
											required
										>
											<u--input
												type="password"
												v-model="form_pay.paypwd"  
												:customStyle="{background: '#fff'}"
												placeholder="支付密码" 
											></u--input>
										</u-form-item> 
									</template>
									
									
								</u--form>
							</template>
							<template v-if="formActive.mode == 'confirm'">
								<u--form
									labelPosition="left"
									:model="form_confirm"
									ref="form_confirm"
									labelWidth="80"
									v-if="formActive.isGRT && paylist.Sino_fund_order.paymode == '1'"
									>
									
									<u-form-item
										label="支付密码" 
										type="password"
										required
									>
										<u--input
											type="password"
											v-model="form_confirm.paypwd"  
											:customStyle="{background: '#fff'}"
											placeholder="支付密码" 
										></u--input>
									</u-form-item>
								</u--form>
								<view v-if="formActive.isGRT && paylist.Sino_fund_order.paymode == '2'" class="text-error">
									请财务登录sinopay平台完成确认付款。
								</view>
							</template>
							<template v-if="formActive.mode == 'esign'"> 
								<u--form
									labelPosition="left" 
									labelWidth="80"  
									>
									<u-form-item
										label="签约方式" 
										>
										<view>{{list.esign_type | esignType2Str}}</view>
									</u-form-item>
									<u-form-item
										label="交收方式" 
										>
										<view>{{list.settle_mode | settleMode}}</view>
									</u-form-item>
								</u--form>
								<template v-if="formActive.create_confirm">
									<u--form
										labelPosition="left"
										:model="form_esign_create_confirm"
										ref="form_esign_create_confirm" 
										labelWidth="80"  
										> 
										<u-form-item label="合同模板" required >
											<view @click="show_contract = true">
												<u--input
													v-model="form_esign_create_confirm.contract_name"
													readonly 
													suffixIcon="arrow-down"
													suffixIconStyle="color: #909399"
													placeholder="点击选择合同模板"
													clearable
												></u--input>
											</view>
										</u-form-item> 
										<template v-if="form_esign_create_confirm.contract_id == '1'">
											<u-form-item
												label="运费/元" 
											>
												<u--input
													v-model="form_esign_create_confirm.trans_fee" 
												></u--input>
											</u-form-item> 
											<u-form-item
												label="补充条款" 
											>
												<u--textarea
													v-model="form_esign_create_confirm.remark" 
													placeholder="补充条款" 
													height="90"
													maxlength="-1"
												></u--textarea>
											</u-form-item>
										</template> 
									</u--form>
								</template>
								<template v-if="formActive.confirm">
									<u--form
										labelPosition="left"
										:model="form_esign_confirm"
										ref="form_esign_confirm" 
										labelWidth="80"  
										>
										<template v-if="esign_info.contract_id == '1'">
											<u-form-item
												label="运费" 
											>
												<view class="">
													{{esign_info.trans_fee / 100}} 元
												</view>
											</u-form-item>
											<u-form-item
												label="补充条款" 
											>
												<view class="">
													{{esign_info.remark}} 
												</view>
											</u-form-item>
										</template> 
										<u-form-item
											label="审核意见" 
										>
											<u-radio-group
											    v-model="form_esign_confirm.confirm"
											    placement="row"
											  >
											    <u-radio
											      :customStyle="{marginRight: '8px'}"
											      v-for="(item, index) in shyj_esign"
											      :key="index"
											      :name="item.value"
											      :label="item.name"
											    >
											    </u-radio>
											  </u-radio-group>
										</u-form-item>
										<u-form-item
											label="退回签约备注"
											v-if="form_esign_confirm.confirm != '1'"
										>
											<u--textarea
												v-model="form_esign_confirm.audit_remark" 
												placeholder="退回签约备注" 
												height="90"
												maxlength="-1"
											></u--textarea>
										</u-form-item> 
									</u--form>
								</template>
								
							</template>
						</view>
					</u-list>
				</view>
				<view class="confirm-rows u-p-20" :style="{
						backgroundColor: themeConfig.navBg,
					}"
					v-if="!paylist.hasOwnProperty('Sino_fund_order') || paylist.Sino_fund_order.paymode == '0' || paylist.Sino_fund_order.paymode == '1' "
					>
					<u-button :customStyle="{backgroundColor: themeConfig.badgeBg, color: '#fff', border: 'none'}" shape="circle" 
					@click="handleConfirm">确认并提交</u-button>
				</view>
			</view>
		</u-popup>
		
		<menusPopupContract
			:show="show_contract"
			theme="white" 
			:params="{
				order_id: id
			}"
			@close="show_contract = false"
			@confirm="contractConfirm"
		></menusPopupContract>
		<menusPopupBillAcc
			:show="show_billacc" 
			theme="white"  
			:params="{
				source_id: id,
				source: ordertype == 'S' ? 'BUY' : 'SELL'
			}"
			@close="show_billacc = false"
			@confirm="menusConfirm"
		></menusPopupBillAcc>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {js2Fixed} from '@/utils'
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import menusPopupContract from '@/pages/my/components/menusPopup/menusPopupContract.vue'
	export default { 
		components: {
			menusPopupContract
		},
		data() {
			return {
				id: '',
				ordertype: '',
				list: {},
				nopay_info: {},
				nopayEnd_info: {},
				esign_info: {},
				paylist: {},
				payOrderLoading: false,
				show_billacc: false,
				show_contract: false,
				show: false,
				formActive: {}, 
				form_audit: {
					audit: '1',
					pyeeInfo: '',
					remark_audit: '',
				},
				form_audit_base: {
					audit: '1', 
					remark_audit: '',
				},
				form_send: {
					remark_send: '',
				},
				form_pay: {
					paymode: '1',
					paypwd: '',
				},
				form_create_settle: {
					price: '',
					amount: ''
				},
				form_end_pay: {
					price: '',
					amount: ''
				},
				fileList1: [],
				form_underLine: {
					type: '1',
					pic1_base64: '',
					pic1_name: '线下支付凭证.jpg',
					remark: ''
				},
				form_confirm: {
					paypwd: '',
				},
				form_esign_create_confirm: {
					sign_z: '',
					contract_id: '',
					contract_name: '',
					trans_fee: '',
					remark: '',
				},
				form_esign_confirm: {
					confirm: '1',
					audit_remark: ''
				},
				btnList: {},
				shyj_esign: [
					{
						name: '退回协商',
						value: '0',
						disabled: false,
					},
					{
						name: '同意签约',
						value: '1',
						disabled: false,
					}, 
				],
				shyj: [
					{
						name: '退回订单',
						value: '0',
						disabled: false,
					},
					{
						name: '同意订立',
						value: '1',
						disabled: false,
					},
					{
						name: '废止订单',
						value: '2',
						disabled: false,
					},
				],
				outline_pay_type: [ 
					{
						name: '现金转账凭证',
						value: '1',
						disabled: false,
					},
					{
						name: '电票支付凭证',
						value: '2',
						disabled: false,
					},
				],
				shyj_base: [ 
					{
						name: '通过',
						value: '1',
						disabled: false,
					},
					{
						name: '拒绝',
						value: '2',
						disabled: false,
					},
				],
				zfgjValue: 'xianjin',
				zfgj: [
					{
						name: '现金',
						value: 'xianjin',
						disabled: false,
					},
					{
						name: '票据',
						value: 'piaoju',
						disabled: true,
					},
				],
				paymode_radios: [
					{
						name: '一站式',
						value: '1',
						disabled: false,
					},
					{
						name: '两站式',
						value: '2',
						disabled: false,
					},
				],
				fahuo: '发货'
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			} else {
				uni.showToast({
					title: 'id参数有误',
					icon: 'none'
				})
				return
			}
			if(options.hasOwnProperty('ordertype')) {
				this.ordertype = options.ordertype
			}  
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				login: state => state.user.login,
			}),
			themeConfig() {
				return this.typeConfig.white
			},
			settleSum() {
				return js2Fixed(this.form_create_settle.price * this.form_create_settle.amount, 2)
			},
			diff() {
				return js2Fixed((+this.settleSum) - (+this.list.total_price2), 2)
			},
			diff2() {
				return Math.abs(+this.diff)
			}, 
		},
		filters: {
			source2pan: v => {
				console.log(v)
				if(v == 'BUY') return 'b'
				return 's'
			},
			source2str: v => {
				if(v == 'BUY') return '买盘'
				return '卖盘'
			}
		},
		methods: { 
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getImageBase64_readFile: 'user/getImageBase64_readFile'
			}),
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			checkBtnModal(data) {
				uni.showModal({
					title: '提示',
					...data.modalText, 
					success: (res) => {
						if (res.confirm) {
							this.handleShowPopup(data);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async handleShowPopup(data) {
				this.formActive = data; 
				if(data.mode == 'create_pay') {
					//发起支付 如未发起过则先执行发起接口（仅1次），再弹窗；
					if(this.list.state == '6') {
						//state=6 为待支付
						if(this.list.order_type == '1') {
							// 线上支付
							const res = await this.order_pay()
							if(!res) return
						}
					}else {
						this.get_pay_order()
					}
					
				}
				if(data.mode == 'confirm') {
					if(this.list.order_type == '2') {
						uni.showLoading()
						await this.confirm_shouhuo()
						return
					}else if(this.list.order_type == '1') {
						this.get_pay_order()
					}
					
				} 
				if(data.mode == 'audit') {
					if(this.list.pay_mode.includes('BILLPAY')) {
						this.form_audit.pyeeInfo = this.list.payeeAccNm
					}
				}  
				if(data.mode == 'create_settle') {
					this.initSettleFormData()
				}  
				this.show = true
			},
			initSettleFormData() {
				this.form_create_settle.price = this.list.price2
				this.form_create_settle.amount = this.list.amount
			},
			async contractConfirm(data) {
				console.log(data)
				this.form_esign_create_confirm.contract_id = data.contract_id
				this.form_esign_create_confirm.contract_name = data.name
				await this.LIST_ESIGN_CONTRACT_PARAMETERS()
			}, 
			menusConfirm(data) {
				console.log(data)
				this.form_audit.pyeeInfo = data.pyeeInfo
			}, 
			async getData() {
				const res = await this.$api.order_detail({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.list = res.list.Order
					this.btnList = res.button
					this.fahuo = res.fahuo
					this.esign_info = this.list.Esign_signflows || {}
					if(this.esign_info.id) {
						// this.LIST_ESIGN_CONTRACT_PARAMETERS(this.esign_info.id)
					}
					if(this.list.settle_type == 'GRT') {
						this.zfgj[1].disabled = false
					}
					if(this.list.pay_id) this.getNoPayData() 
					// if(this.list.order_type == '2') {
					// 	if(this.list.pay_id) this.getNoPayData()
					// 	// if(this.list.Order_settle[0]?.id) this.getNoPayData()
						
					// }
					if(this.list.Order_end.pay_id) this.getNoPayEndData()
				}
			},  
			async getNoPayData() {
				//获取线下支付凭证ID
				uni.showLoading()
				const res = await this.$api.get_order_nopay({
					params: { 
						id: this.list.pay_id,
						// order_id: this.id,
						order_type: 'ORDER',
						role: this.list.b_login == this.login ? 'B' : 'S'
					}
				}) 
				if(res.code == 1) {
					if(res.list.State == 'ERROR') {
						return
					}
					this.nopay_info = res.list.result
				}
			},
			async getNoPayEndData() {
				//获取尾款线下支付凭证ID
				uni.showLoading()
				const res = await this.$api.get_order_nopay({
					params: {  
						id: this.list.Order_end.pay_id,
						// order_id: this.id,
						order_type: 'ORDER_END',
						role: this.list.b_login == this.login ? 'B' : 'S'
					}
				}) 
				if(res.code == 1) {
					if(res.list.State == 'ERROR') {
						return
					}
					this.nopayEnd_info = res.list.result
				}
			},
			async unsubmit_order() {
				//撤回已发送的订单
				uni.showLoading()
				const res = await this.$api.unsubmit_order({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}
			},
			async order_cancel() {
				uni.showLoading({
					title: '取消中...'
				})
				const res = await this.$api.order_cancel({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}
			},
			async order_send() {
				uni.showLoading({
					title: '发货中...'
				})
				const res = await this.$api.order_send({
					params: {
						remark_send: this.form_send.remark_send,
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
			async base_submit() {
				uni.showLoading()
				const res = await this.$api.base_submit({
					params: {
						ordertype: this.ordertype == 'S' ? 'BUY' : 'SELL',
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}
			},
			async createEndPay() {
				uni.showLoading({
					title: '发起尾款支付...'
				})
				const res = await this.$api.CREATE_END({
					params: { 
						order_id: this.id,
					}
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}
			},
			async order_submit() {
				uni.showLoading({
					title: '发送对方议价...'
				})
				const res = await this.$api.order_submit({
					params: {
						ordertype: this.ordertype,
						id: this.id,
					}
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}
			},
			async get_pay_order() {
				this.payOrderLoading = true
				const res = await this.$api.sino_fund_order_detail_order({
					params: { 
						pay_id: this.list.pay_id,
						paytype: 'B'
					}
				})
				if(res.code == 1) {  
					this.paylist = res.list
				}
				this.payOrderLoading = false
			},
			async order_pay() {
				uni.showLoading({
					title: '发起支付中...'
				})
				const res = await this.$api.order_pay({
					params: { 
						id: this.id,
					}
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
					return true
				}else {
					this.showToast({
						type: 'error',
						message: res.msg, 
					})
					return false
				}
			},
			async order_nopay() {
				if(this.form_underLine.pic1_base64 == '') {
					uni.showToast({ 
						title: '请先上传凭证', 
						icon: 'none'
					})
					return false
				}
				uni.showLoading()
				const res = await this.$api.order_nopay({
					order_id: this.id,
					pay_mode: 'NOPAY',
					...this.form_underLine,
				})
				if(res.code == 1) { 
					if(res.list.State == 'ERROR') {
						uni.showToast({ 
							title: res.list.errorMsg, 
							icon: 'none'
						})
						return false
					}
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
					return true
				}else {
					this.showToast({
						type: 'error',
						message: res.msg, 
					})
					return false
				}
			},
			async order_nopay_end() {
				if(this.form_underLine.pic1_base64 == '') {
					uni.showToast({ 
						title: '请先上传凭证', 
						icon: 'none'
					})
					return false
				}
				uni.showLoading()
				const res = await this.$api.PAY_VOUCHER_END({
					id: this.list.Order_end.id, 
					...this.form_underLine,
				})
				if(res.code == 1) { 
					if(res.list.State == 'ERROR') {
						uni.showToast({ 
							title: res.list.errorMsg, 
							icon: 'none'
						})
						return false
					}
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
					return true
				}else {
					this.showToast({
						type: 'error',
						message: res.msg, 
					})
					return false
				}
			},
			async order_paying() {
				
				let func = 'sino_fund_order_pay';
				let params = {
					...this.form_pay,
					pay_id: this.list.pay_id
				};
				if(this.formActive.isBill) {
					func = 'sino_bill_order_pay';
					params = {
						pay_id: this.list.pay_id
					}
				}
				if(params.paymode != '2' && params.hasOwnProperty('paypwd') && !params.paypwd ) {
					uni.showToast({
						title: '请输入支付密码',
						icon: 'none'
					})
					throw new Error('请输入支付密码')
				}
				uni.showLoading({
					title: '操作中...'
				}) 
				const res = await this.$api[func]({ params })
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '刷新订单数据中'
					})
					await this.getData()
					uni.showLoading({
						title: '刷新支付数据中'
					})
					await this.get_pay_order()
				} 
				else { 
					if(res.errcode == '6012') {
						uni.showModal({
							title: '提示',
							content: res.msg,
							success: async (r) => {
								if (r.confirm) {
									this.handleGoto({
										url: '/pages/my/money/sino_paypw_forget'
									})
								} else if (r.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
					throw new Error(res.msg)
				}
			},
			async order_audit() {
				uni.showLoading({
					title: '提交审核中...'
				}) 
				if(this.list.pay_mode.includes('BILLPAY') && !this.form_audit.pyeeInfo ) {
					uni.showToast({
						title: '票据账户不能为空',
						icon: 'none'
					})
					throw new Error('票据账户不能为空')
				}
				const res = await this.$api.order_audit({
					params: { 
						...this.form_audit,
						id: this.id,
						ordertype: this.ordertype,
					}
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
			async order_audit_base() {
				uni.showLoading({
					title: '提交审核中...'
				})  
				const res = await this.$api.base_audit({
					params: { 
						...this.form_audit,
						id: this.id,
						ordertype: this.ordertype == 'S' ? 'BUY' : 'SELL',
					}
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
			async confirm_shouhuo() {
				let func = 'sino_fund_order_order_confirm'
				let params = {
					pay_id: this.list.pay_id
				} 
				console.log(this.formActive)
				if(!this.formActive.isBill && this.formActive.isGRT) { 
					func = 'sino_fund_order_confirm';
					params = {
						...params,
						paypwd: this.form_confirm.paypwd
					}
					if(this.paylist.Sino_fund_order.paymode == '2') {
						func = 'sino_fund_order_confirm_apply';
						params = {
							...params, 
						} 
					}
				}
				else if(this.formActive.isBill) {
					func = 'sino_bill_order_order_confirm';
				}else if(this.formActive.isGRT) {
					func = 'sino_bill_order_confirm';
					params = {
						...params,
						paypwd: this.form_confirm.paypwd
					}
				}
				console.log(func)
				if(params.hasOwnProperty('paypwd') && !params.paypwd ) {
					uni.showToast({
						title: '请输入支付密码',
						icon: 'none'
					})
					throw new Error('请输入支付密码')
				}
				uni.showLoading({
					title: '提交确认收货...'
				})
				const res = await this.$api[func]({ params })
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
			async createSettle() {
				uni.showLoading({
					title: '提交中...'
				})  
				const res = await this.$api.order_settle_create({
					params: { 
						...this.form_create_settle,
						order_id: this.id, 
					}
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
			async handleConfirm() { 
				if(this.formActive.mode == 'audit') {
					await this.order_audit()
				}
				else if(this.formActive.mode == 'audit_base') {
					await this.order_audit_base()
				}
				else if(this.formActive.mode == 'send') {
					await this.order_send()
				}
				else if(this.formActive.mode == 'create_pay') {
					//提交支付密码支付表单
					if(this.list.order_type == '1') {
						await this.order_paying() 
					}
					else if(this.list.order_type == '2') {
						let res = false;
						if(this.list.Order_end.id) {
							res = await this.order_nopay_end() 
						}else { 
							res = await this.order_nopay() 
						}
						if(!res) return
					}
					
				}
				else if(this.formActive.mode == 'confirm') {
					await this.confirm_shouhuo()
				}
				else if(this.formActive.mode == 'create_settle') {
					if(this.diff == 0) {
						this.showToast({
							type: 'error',
							message: '无差额，无法发起结算',
							position: 'center'
						}) 
					}
					else {
						await this.createSettle()
					}
					
				}
				else if(this.formActive.mode == 'esign') {
					if(this.formActive.create_confirm) {
						if(!this.form_esign_create_confirm.contract_id) {
							this.showToast({
								type: 'error',
								message: '请先选择合同模板',
								position: 'center'
							})   
						}
						else {
							await this.DP_ESIGN_CREATE_CONFIRM()
						}
					}
					if(this.formActive.confirm) {
						await this.ESIGN_CONFIRM()
					}
					
				}
				this.show = false
			}, 
			async checkOrderNoPayBtn() {
				uni.showModal({
					title: '提示',
					content: '是否通过买家线下支付凭证',
					cancelText: '拒绝',
					confirmText: '同意',
					success: async (res) => {
						uni.showLoading()
						await this.checkOrderNoPay(res.confirm ? '1' : '0')
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			previewImgBtn(imgs) {
				uni.previewImage({
					urls: imgs, 
				});
			},
			async checkOrderNoPay(audit) {
				let id = this.list.pay_id;
				let order_type = 'ORDER'
				if(this.list.Order_end.id) {
					id = this.list.Order_end.pay_id
					order_type = 'ORDER_END'
				}
				const res = await this.$api.check_order_nopay({
					params: { 
						id,
						audit,
						order_type,
						remark_audit: ' '
					}
				})
				if(res.code == 1  ) {
					if(res.list.State == 'ERROR') {
						this.showToast({
							type: 'error',
							message: res.list.errorMsg, 
						})
						return
					}
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				 
				this.form_underLine.pic1_base64 = ''
				this.form_underLine.pic1_name = ''
			},
			handleoversize() {
				uni.showToast({
					title: '建议上传2M以内的图片',
					icon: 'none'
				})
			},
			async afterRead(event) {
				console.log(event)
				this.fileList1 = [{
					url:  event.file.thumb,
					status: 'uploading',
					message: '上传中'
				}]
				const base64 = await this.getImageBase64_readFile(event.file.thumb)
				this.fileList1 = [{
					url: event.file.thumb,
					status: 'success'
				}] 
				this.form_underLine.pic1_base64 = base64
				this.form_underLine.pic1_name = event.file.thumb.split('//tmp/')[1]  
				
			},
			async LIST_ESIGN_CONTRACT_PARAMETERS(contract_id) {
				//合同模板参数列表
				uni.showLoading({
					title: '提交中...'
				})  
				const res = await this.$api.LIST_ESIGN_CONTRACT_PARAMETERS({
					params: {  
						order_id: this.id, 
						contract_id: contract_id || this.form_esign_create_confirm.contract_id, 
					}
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					}) 
				}else {
					throw new Error(res.msg)
				}
			},
			async DP_ESIGN_CREATE_CONFIRM() {
				//合同模板参数列表
				uni.showLoading({
					title: '提交中...'
				})  
				const res = await this.$api.DP_ESIGN_CREATE_CONFIRM({
					...this.form_esign_create_confirm,
					order_id: this.id, 
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})  
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
			async ESIGN_CONFIRM() { 
				uni.showLoading({
					title: '提交中...'
				})  
				const res = await this.$api.ESIGN_CONFIRM({
					...this.form_esign_confirm,
					order_id: this.id, 
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})  
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
			async DPWantESignBtn () {
				uni.showModal({
					title: '提示',
					content: '是否要求签约，可忽略直接发起支付',
					cancelText: '取消',
					confirmText: '要求签约',
					success: async (res) => { 
						if (res.confirm) {
							await this.DPWantESignEvent()
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async DPWantESignEvent() {
				uni.showLoading({
					title: '提交中...'
				})  
				const res = await this.$api.DP_ESIGN_CREATE({
					params: {  
						order_id: this.id, 
					}
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			}, 
			async DPCancelESignBtn () {
				uni.showModal({
					title: '提示',
					content: '是否取消签约',
					cancelText: '考虑一下',
					confirmText: '确认取消',
					success: async (res) => { 
						if (res.confirm) {
							await this.DPCancelESign()
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async DPCancelESign() {
				uni.showLoading({
					title: '提交中...'
				})  
				const res = await this.$api.DP_ESIGN_CANCEL({
					params: {  
						order_id: this.id, 
					}
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
			async cancelESignConfirmBtn () {
				uni.showModal({
					title: '提示',
					content: '是否撤回签约',
					cancelText: '考虑一下',
					confirmText: '确认撤回',
					success: async (res) => {
						if (res.confirm) {
							await this.cancelESignConfirm()
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async cancelESignConfirm() {
				uni.showLoading({
					title: '提交中...'
				})  
				const res = await this.$api.ESIGN_CONFIRM_CANCEL({
					params: {  
						order_id: this.id, 
					}
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
			async esignStartBtn () {
				uni.showModal({
					title: '提示',
					content: '是否开启签约，开启后无法撤回',
					cancelText: '考虑一下',
					confirmText: '确认开启',
					success: async (res) => {
						if (res.confirm) {
							await this.esignStart()
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async esignStart() {
				uni.showLoading({
					title: '提交中...'
				})  
				const res = await this.$api.ESIGN_START({
					params: {  
						order_id: this.id, 
					}
				})
				if(res.code == 1) { 
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}else {
					throw new Error(res.msg)
				}
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
		/deep/ {
			.u-upload__button {
				background-color: #fff!important;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.addr-content-box {
		background-color: #fff;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		// border: 1rpx solid #f8f8f8;
		border: 3px solid transparent;
		background: 
			linear-gradient(white, white) padding-box,
			repeating-linear-gradient(
				-45deg, 
				red 0, 
				red 12.5%, 
				transparent 0, 
				transparent 25%, 
				#58a 0, 
				#58a 37.5%, 
				transparent 0, 
				transparent 50%
			) 0/2em 2em;
		// &:after {
		// 	content: "";
		// 	position: absolute;
		// 	bottom: 0;
		// 	left: 0;
		// 	height: 6rpx;
		// 	width: 100%;
		// 	background-image: url("../static/img/addr-bottom.jpg");
		// 	background-repeat: repeat-x;
		// 	background-size: auto 100%;
		// 	background-position: 0 0;
		// }
		.addr-content {
			
		}
	}
	.item {
		color: #444;
	}
	.item-label {
		flex: 0 0 100px;
	}
	.main {
		background-color: #fff;
	}
	.btn-wrap {
		.item {
			flex: 0 0 50%;
			box-sizing: border-box;
		}
	}
	.wrapper {
		width: 100%;
		border-radius: 30rpx 30rpx 0 0 ;
		overflow: hidden;
		.header {
		}
		.main {
			background-color: #f8f8f8;
			height: 50vh;
			width: 100%;
			box-sizing: border-box;
			.item-card {
				width: 100%;
				box-sizing: border-box;
				.card-title {
					color: #666;
				}
			}
			.card-content {
				// background-color: #fff;
				border-radius: 10rpx;
				width: 100%;
				box-sizing: border-box;
				
			}
			.card-label {
				flex: 0 0 30%;
				margin-right: 4%;
				height: 30px;
				line-height: 30px;
				transition: all .3s;
				font-size: 14px;
				text-align: center;
				border-radius: 8rpx;
				position: relative;
				border: 1rpx solid #eee;
				&.rows {
					flex: 0 0 100%;
					margin-right: 0;
					text-align: left;
				}
				&.normal_white {
					border-color: #eee;
					color: #666;
				}
				&.normal_dark {
					border-color: #3a3352;
					color: #c8cfff;
				}
				&.active_white {
					border-color: #98c9ff;
					color: #007aff;
					background-color: #e6f2ff;
				}
				&.disabled_white {
					border-color: #c373ff !important;
					color: #7d3df7 !important;
					background-color: #ead9f7 !important;
				}
				&.active_dark {
					border-color: #025688;
					color: #00ffff;
					// background-color: #e6f2ff;
				}
				&.disabled_dark {
					border-color: #503f17 !important;
					color: #f7823d !important;
					// background-color: #ead9f7 !important;
				}
				&:nth-of-type(3n) {
					margin-right: 0;
				}
			}
		}
		.bottom {
			
		}
	}
</style>
