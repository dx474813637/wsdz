const http = uni.$u.http

//获取 客户信息列表 参数p
export const getCompany = (data) => http.get('company', data)
//获取 全部客户信息列表
export const getAllCompany = (data) => http.get('all_customer', data)
//获取 客户信息明细 参数login
export const getCompanyDetail = (data) => http.get('company_detail', data)
//获取 客户商品列表 参数login、p
export const getCompanyProduct = (data) => http.get('company_product', data)
//获取 客户商品明细（商品明细） 参数id  
export const getCompanyProductDetail = (data) => http.get('company_product_detail', data)

// =====客户管理 
// broker  客户管理列表 
// 参数state 1-已使用 0-未使用 p页数
// terms 名称手机联系人
export const broker = (data) => http.get('broker', data)
// add_customer 领取客户账号 
export const addCustomer = (data) => http.get('add_customer', data)
// login_uid_log 访问记录 参数login
export const loginUidLog = (data) => http.get('login_uid_log', data)

// shenhe_customer 审核我的客户信息
// 客户信息D: id  
// 客户名称： name 
// 联系人： contact 
// 电话： tel 
// 邮箱： email 
// 联系手机： mobile 
// 所在地： regional 如11 
// 详细地址： address 
// 统一社会信用代码： credit_code 
// 营业执照： pic1_upload 
// 审核： audit 0-灭活1-激活
export const shenheCustomer = (data, config={}) => http.post('shenhe_customer', data, config)
// dj_customer 登记（添加）我的客户信息 
// 字段跟审核一样，少一个审核字段。
// 营业执照的字段两个接口都改成pic1。
// 这个字段先不用管，到时候可能也变成pic1_base64  
// pic1_name两个字段。
export const djCustomer = (data, config={}) => http.post('dj_customer', data, config)

//search_company_code 参数name  查询客户名称的社会信用统一代码
export const searchCompanyCode = (data) => http.get('search_company_code', data)

// customer_sell 客户卖盘列表 参数login p
export const customerSell = (data) => http.get('customer_sell', data)
// customer_buy 客户买盘列表 参数login p
export const customerBuy = (data) => http.get('customer_buy', data)


// 参数：
// 客户ID：id * 客户列表（broker）里的to_id
// 客户名称：name
// 联系人：contact
// 邮箱：email
// 手机：mobile
// edit_customer 修改我的客户信息
export const editCustomer = (data, config={}) => http.post('edit_customer', data, config)
// broker_buy 参数 terms商品名称搜索 product_id商品ID搜索 p页数
export const brokerBuy = (data) => http.get('broker_buy', data)
// broker_change_buy 修改客户委托买盘 参数跟修改买盘一致
export const brokerChangeBuy = (data, config={}) => http.post('broker_change_buy', data, config)
// broker_able_buy 修改客户委托买盘状态 参数跟修改买盘状态一致
export const brokerAbleBuy = (data) => http.get('broker_able_buy', data)

// broker_sell 客户委托卖盘 
// 参数 terms商品名称搜索 product_id商品ID搜索 p页数
export const brokerSell = (data) => http.get('broker_sell', data)
// broker_change_sell 修改客户委托卖盘 参数跟修改卖盘一致
export const brokerChangeSell = (data, config={}) => http.post('broker_change_sell', data, config)
// broker_able_sell 修改客户委托卖盘状态 参数跟修改卖盘状态一致
export const brokerAbleSell = (data) => http.get('broker_able_sell', data)

// broker_customer_sell 客户自主卖盘列表
export const broker_customer_sell = (data) => http.get('broker_customer_sell', data)
// broker_customer_buy 客户自主买盘列表
// 参数都是terms商品名称搜索 p页码 product_id商品ID搜索
export const broker_customer_buy = (data) => http.get('broker_customer_buy', data)

// broker_company_product 参数login必须 p  broker客户商品列表
export const brokerCompanyProduct = (data) => http.get('broker_company_product', data)


// extension_msg_index 推广首页
export const extension_msg_index = (data) => http.get('extension_msg_index', data)
// extension_msg_list 推广企业列表 参数 type 分类名称
export const extension_msg_list = (data) => http.get('extension_msg_list', data)
// extension_msg_send  推广推送 参数id  企业id
export const extension_msg_send = (data) => http.get('extension_msg_send', data)