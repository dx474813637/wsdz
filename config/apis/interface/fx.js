 // https://api.rawmex.cn/gw/demo/
const http = uni.$u.http 

import {all_api} from '@/config/apis/interface/base.js'


// getFxStandard 标准品列表
export const getFxStandard = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'LIST_STANDARD'}}, data))

// getMyProduct 我的交易商品列表
export const getMyProduct = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'WEB_PRODUCT', Action: 'LIST', token: 1}}, data))

// jyfw_edit 添加/修改 分销范围
export const jyfw_edit = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'CHANGE', token: 1}}, data))
// jyfw_list 翻页列表
export const jyfw_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'PAGE_LIST', token: 1}}, data))
// jyfw_list_all 完整列表
export const jyfw_list_all = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'LIST', token: 1}}, data))
// jyfw_del 删除分销范围
export const jyfw_del = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'DELETE', token: 1}}, data))

// fxgx_list 分销关系
export const fxgx_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER_FX', Action: 'PAGE_LIST', token: 1}}, data))
// fxgx_wait_list 待分销关系
export const fxgx_wait_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER_FX', Action: 'PAGE_LIST_DA_PRODUCT', token: 1}}, data))
// fxgx_add 添加分销关系
export const fxgx_add = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER_FX', Action: 'CREATE', token: 1}}, data))
// fxgx_status_change 分销关系 改变状态
export const fxgx_status_change = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER_FX', Action: 'ABLE', token: 1}}, data))
// fxgx_del 分销关系 删除
export const fxgx_del = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER_FX', Action: 'DELETE', token: 1}}, data))

// fx_sell_list_refresh 刷新可分销卖盘
export const fx_sell_list_refresh = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_SELL', Action: 'UPDATE', token: 1}}, data))
// fx_sell_list 分销卖盘 翻页
export const fx_sell_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_SELL', Action: 'PAGE_LIST', token: 1}}, data))
// fx_sell_del 分销卖盘 删除
export const fx_sell_del = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_SELL', Action: 'DELETE', token: 1}}, data))


export const message_xcx = (data) => http.get('message_xcx', data)

export const fenxiao = (data) => http.get('fenxiao', data)

// fx_sell_suc 分销卖盘成交记录翻页 列表
export const fx_sell_suc = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_SELL_LOG_FX', Action: 'PAGE_LIST', token: 1}}, data))

// fx_money 分销卖盘成交记录翻页 列表
export const fx_money = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_SELL_LOG_FX', Action: 'TOTAL_PRICE', token: 1}}, data))

// homepage_info 信息查询
export const homepage_info = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_COMPANY_FX', Action: 'DETAIL', token: 1}}, data))
// homepage_info_change 修改 达人信息
export const homepage_info_change = (data = {}) => all_api(uni.$u.deepMerge({API: 'DA_ALLIANCE_DA_COMPANY_FX', Action: 'CHANGE', token: 1}, data), 'POST') 
	

//daren
export const daren = (data) => http.get('daren', data)

// ===== 店铺分销-分销中心  =====================>

// shop_info 信息查询
export const shop_info = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_COMPANY', Action: 'DETAIL', token: 1}}, data))
// shop_info_change 修改 店铺信息
export const shop_info_change = (data = {}) => all_api(uni.$u.deepMerge({API: 'DA_ALLIANCE_DA_COMPANY', Action: 'CHANGE', token: 1}, data), 'POST') 
// shops_list 联盟店铺列表
export const shops_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_COMPANY', Action: 'ALLIANCE_LIST', token: 1}}, data))
// shop_change 盟主修改 店铺信息
export const shop_change = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_COMPANY', Action: 'ALLIANCE_CHANGE', token: 1}}, data))


// shop_fx_product 分销商品 翻页列表
export const shop_fx_product = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT', Action: 'PAGE_LIST', token: 1}}, data))
// shop_fx_product_detail 分销商品 信息查询
export const shop_fx_product_detail = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT', Action: 'DETAIL', token: 1}}, data))
// shop_fx_product_change 创建/修改 分销商品
export const shop_fx_product_change = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT', Action: 'CHANGE', token: 1}}, data))
// shop_fx_product_change_status 修改状态 分销商品
export const shop_fx_product_change_status = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT', Action: 'ABLE', token: 1}}, data))

// shop_fxgx_list 分销关系 翻页列表
export const shop_fxgx_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER', Action: 'PAGE_LIST', token: 1}}, data))
// shop_fxgx_change_status 改变自己的状态
export const shop_fxgx_change_status = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER', Action: 'ABLE', token: 1}}, data))

// shop_fx_suc_list 店铺分销成交记录翻页 列表
export const shop_fx_suc_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_SELL_LOG', Action: 'PAGE_LIST', token: 1}}, data))
// shop_fx_money 佣金支出
export const shop_fx_money = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_SELL_LOG', Action: 'TOTAL_PRICE', token: 1}}, data))