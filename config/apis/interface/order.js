const http = uni.$u.http

import {all_api} from '@/config/apis/interface/base.js'
// create_order 创建订单
// 订单类型(修改无)： source *SELL-采购订单BUY-销售订单
// 订单ID: source_id 买卖盘的id 
// 采购量/供应量： amount
// 单价： price
// 商品总额： total_price  *根据采购量和单价计算
// 交付方式： pay_option1	D_P:款到发货GRT:担保支付COD:货到付款
// 支付工具： pay_option2 *FUNDPAY:现金BILLPAY:票据（交付方式为担保支付时）
// 卖方票据账户(修改无)： pyeeInfo *从接口获取卖方票据账户中获取并选择（支付工具为票据时必填）
// 交收方式： settle_mode *订单类型为销售订单时，直接从买盘信息里读取B:买家自提S:卖家送货
// 交收区域：delivery_place
// 			订单类型为采购订单时：
// 				交收方式为卖家送货时必填
// 				交收方式为买家自提时不填
// 			订单类型为销售订单时：
// 				交收方式为卖家送货时不填
// 				交收方式为买家自提时必填
// 交收地址：settle_address
// 			订单类型为采购订单时：
// 				交收方式为卖家送货时必填
// 				交收方式为买家自提时不填
// 			订单类型为销售订单时：
// 				交收方式为卖家送货时不填
// 				交收方式为买家自提时必填
// 商品详情：intro
// 备注 remark
// 基差点价开始日base_btime 
// 基差点价截止日base_etime  格式：2023-02-24 04:00:00  
export const create_order = (data, config={}) => http.post('create_order', data, config)
// change_order 修改订单
export const change_order = (data, config={}) => http.post('change_order', data, config)
// export const change_order = (data = {}) => all_api(uni.$u.deepMerge({API: 'ORDER', Action: 'CHANGE', token: 1}, data), 'POST')

// order_query_amount_active 修改订单
export const order_query_amount_active = (data ) => http.get('order_query_amount_active', data )


// order_get_account  获取卖方票据账户
// 订单类型： source *SELL-采购订单BUY-销售订单 
// 订单ID: source_id
export const order_get_account = (data) => http.get('order_get_account', data)

// my_order 采购/销售订单列表
// 订单类型： ordertype *B-我的采购订单S-我的销售订单
// 支付工具： paymode FUND:现金BILL:票据
// 卖方公司名/买方公司名： company 模糊查询订单类型为我的采购订单搜卖方公司名订单类型为我的销售订单搜买方公司名
// 商品名： title 模糊查询
// 页码： p 默认为1
export const my_order = (data) => http.get('my_order', data)

// order_detail 采购/销售订单详情. ordertype：订单类型 id：订单id
export const order_detail = (data) => http.get('order_detail', data)
// order_cancel 取消采购/销售订单 ordertype：订单类型 id：订单id
export const order_cancel = (data) => http.get('order_cancel', data)
// order_submit 发送采购/销售订单 ordertype：订单类型 id：订单id
export const order_submit = (data) => http.get('order_submit', data)
// unsubmit_order 撤回采购/销售订单 ordertype：订单类型 id：订单id
export const unsubmit_order = (data) => http.get('unsubmit_order', data)
// order_pay 发起支付 id：订单id
export const order_pay = (data) => http.get('order_pay', data)
// order_pay 发起线下支付 order_id：订单id
export const order_nopay = (data = {}) => all_api(uni.$u.deepMerge({API: 'PAYNO', Action: 'NOPAY_ORDER_CREATE', token: 1}, data), 'POST')  
// order_audit  审核采购/销售订单
// 订单类型：ordertype*B-我的采购订单S-我的销售订单
// 订单ID: id 
// 审核意见： audit *0-退回订单1-同意订立2-废止订单
// 收款票据账户： pyeelnfo 从接口获取卖方票据账户中获取并选择（支付工具为票据时必填）
// 审核备注： remark_audit
export const order_audit = (data) => http.get('order_audit', data)

// order_send 销售订单-发货 id：订单id remark_send：发货备注
export const order_send = (data) => http.get('order_send', data)
// get_order_nopay 获取线下支付
export const get_order_nopay = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'PAYNO', Action: 'NOPAY_ORDER_QUERY', token: 1}}, data)) 
// check_order_nopay 审核线下支付
export const check_order_nopay = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'PAYNO', Action: 'NOPAY_ORDER_AUDIT', token: 1}}, data))

// base_submit 基差待发送 -> 基差待审核
// 订单类型：ordertype SELL-采购订单 BUY-销售订单
// 订单ID：id
export const base_submit = (data) => http.get('base_submit', data)
// base_audit 基差审核
// 订单类型：ordertype SELL-采购订单 BUY-销售订单
// 订单ID：id
// 审核状态：audit  1-通过 2-拒绝
// 审核说明：remark_audit
export const base_audit = (data) => http.get('base_audit', data)


// broker_order  broker客户采购/销售订单列表 
// 订单类型： ordertype *B-客户采购订单S-客户销售订单
// 支付工具： paymode FUND:现金BILL:票据
// 客户账户： customer_login 查询
// 卖方公司名/买方公司名： company 
// 		模糊查询
// 		订单类型为客户采购订单搜卖方公司名
//		订单类型为客户销售订单搜买方公司名
// 商品名： title 模糊查询
// 页码： p 默认为1
export const broker_order = (data) => http.get('broker_order', data)

// broker_order_detail  broker客户采购/销售订单详情 ordertype：订单类型 id：订单id
export const broker_order_detail = (data) => http.get('broker_order_detail', data)
 

// sino_fund_order_pay 支付订单
	// 支付ID： pay_id *
	// 支付方式：  paymode * 1-一站式 2-两站式
	// 支付密码：  paypwd * 支付方式为一站式时必填
export const sino_fund_order_pay = (data) => http.get('sino_fund_order_pay', data)

// sino_fund_order_order_confirm 直接支付-订单确认收货 支付ID：pay_id
export const sino_fund_order_order_confirm = (data) => http.get('sino_fund_order_order_confirm', data)
// sino_fund_order_confirm 担保支付-订单确认收货 支付ID： pay_id 支付密码：paypwd
export const sino_fund_order_confirm = (data) => http.get('sino_fund_order_confirm', data)
// sino_fund_order_confirm_apply 担保支付-二站式-订单申请确认收货 支付ID：pay_id
export const sino_fund_order_confirm_apply = (data) => http.get('sino_fund_order_confirm_apply', data)

// sino_bill_order_pay 票据支付订单 支付ID：pay_id
export const sino_bill_order_pay = (data) => http.get('sino_bill_order_pay', data)

// sino_bill_order_order_confirm 票据直接支付-订单确认收货 支付ID：pay_id
export const sino_bill_order_order_confirm = (data) => http.get('sino_bill_order_order_confirm', data)
// sino_bill_order_confirm 票据担保支付-确认收货-解冻转账 支付ID： pay_id 支付密码：paypwd
export const sino_bill_order_confirm = (data) => http.get('sino_bill_order_confirm', data)



// order_settle_list 交收结算业务-列表
export const order_settle_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ORDER_SETTLE', Action: 'LIST_ORDER_SETTLE', token: 1}}, data)) 
// order_settle_detail 交收结算业务-明细
export const order_settle_detail = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ORDER_SETTLE', Action: 'DETAIL_ORDER_SETTLE', token: 1}}, data)) 
// order_settle_change 交收结算业务-修改交收结算
export const order_settle_change = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ORDER_SETTLE', Action: 'CHANGE', token: 1}}, data)) 
// order_settle_create 交收结算业务-发起交收结算
export const order_settle_create = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ORDER_SETTLE', Action: 'CREATE', token: 1}}, data)) 
// order_settle_cancel 交收结算业务-取消交收结算
export const order_settle_cancel = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ORDER_SETTLE', Action: 'CANCEL', token: 1}}, data)) 
// order_settle_send 交收结算业务-发送交收结算
export const order_settle_send = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ORDER_SETTLE', Action: 'SEND', token: 1}}, data)) 
// order_settle_audit 交收结算业务-审核 （买家操作）
export const order_settle_audit = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ORDER_SETTLE', Action: 'AUDIT', token: 1}}, data)) 


// order_nopay_settle_create 提交支付凭证（付款方操作）-交收结算业务订单
export const order_nopay_settle_create = (data = {}) => all_api(uni.$u.deepMerge({API: 'PAYNO', Action: 'NOPAY_ORDER_SETTLE_CREATE', token: 1}, data), 'POST')
// order_nopay_settle_audit 审核支付凭证（收款方审核时操作） - 交收结算业务订单
export const order_nopay_settle_audit = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'PAYNO', Action: 'NOPAY_ORDER_SETTLE_AUDIT', token: 1}}, data))  


// CREATE_END 发起尾款支付
export const CREATE_END = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ORDER_END', Action: 'CREATE_END', token: 1}}, data))  
// PAY_VOUCHER_END 提交支付凭证-尾款支付  
export const PAY_VOUCHER_END = (data = {}) => all_api(uni.$u.deepMerge({API: 'ORDER_END', Action: 'PAY_VOUCHER_END', token: 1}, data), 'POST')