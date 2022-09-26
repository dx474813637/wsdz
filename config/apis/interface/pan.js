const http = uni.$u.http
//获取 标准品数据
export const getCategory = (data) => http.get('category', data)
//获取 标准品分类列表 --用getCategory
export const getStancate = (data) => http.get('stancate', data)
//获取 标准品列表 参数p、stancate标准品分类id  多一个参数is_market 1市场标准品 0或空 全部
export const getStandard = (data) => http.get('standard', data)


// =====商品信息
// 标准商品： standard *从标准商品列表里选择标准商品引d 
// 商品名称： name 
// 单位： unit 
// 推荐：平方米，立方米，吨，升，米，千克。也可以自定义输入 
// 属性一规格属性： attr_common_12 
// 属性-品牌： attr_common_11 
// 属性-生产商： attr_common_13 
// 属性-质量标准： attr_common_14 
// 自定义属性名-数组： attr_custom_key 多个自定义属性名用，逗号隔开必须与自定义属性值顺序一致 
// 自定义属性值-数组： attr_custom_val 多个自定义属性名用，逗号隔开必须与自定义属性名顺序一致 
// 需求类型： trade_type b-买盘s-卖盘bs-两者皆可 
// 图片： pic1 相册中选择 
// 商品简介： intro
// 我的商品列表 参数p 搜索terms
export const myProduct = (data) => http.get('my_product', data)
// 删除商品 参数id
export const deleteProduct = (data) => http.get('delete_product', data)
// 改变商品状态 参数id state
export const ableProduct = (data) => http.get('able_product', data)
// 创建商品
export const createProduct = (data, config={}) => http.post('create_product', data, config)
//  编辑商品 多一个参数id
export const changeProduct = (data, config={}) => http.post('change_product', data, config)


/**
 * 获取 买盘列表 
 * 页码 p 
 * 客户账号 login   broker01
 * 期货 is_fut 1 0
 * 有效期内 expressed  1 0
 * 分类 catrgory 16
 * 标准品 standard 73
 * 买盘名称 terms 模糊搜索
 * 规格 spec 模糊搜索
 * 价格区间 minp - maxp 元
 * 现货类型 trdtype 1合约2即期
 * 交货地 dplace 地区编码 
 * 
 * 委托撮合 broker_login 
 * 委托客户经理撮合，同时报盘中显示撮合员的联系方式。
 * (只有c开头的账号允许填写)
 * 
 */
//获取 买盘列表 参数p  expressed=1 有效期内 pr: 3
export const getBuy = (data) => http.get('buy', data)
//获取 买盘明细 参数id
export const getBuyDetail = (data) => http.get('buy_detail', data)
//获取 卖盘列表 参数p   expressed=1 有效期内
export const getSell = (data) => http.get('sell', data)
//获取 卖盘明细 参数id
export const getSellDetail = (data) => http.get('sell_detail', data)
//获取 图片上传接口
export const upImg = (data, config = {}) => http.post('upimg', data, config)


//获取 用户买盘清单列表 参数p company_id客户id
export const getBuyShare = (data) => http.get('buy_share', data)
//获取 用户卖盘清单列表 参数p company_id客户id
export const getSellShare = (data) => http.get('sell_share', data)
//获取 商品级市场列表 参数p、pid生意社PID
export const getPidTrade = (data) => http.get('pid_trade', data)

// ======买盘参数
// 商品ID: product_id *该商品的需求类型必须包括买盘
// 标题： name
// 订单类型： order_type *1-线上支付2-线下支付
// 现货类型： trade_type *1-合约现货2-即期现货
// 意向单价： price *元填0表示点价，请说明点价规则
// 点价规则： dprice
// 数量： amount *(大于0.01的数字)
// 主规格： spec
// 有效时间： express_time *(整数时间) 即期现货有效期最多10天，合约现货有效期最多360天
// 有效时间单位： express_unit d-天h-小时
// 交收期-月份： settle_month 1-12*现货类型为1-合约现货时必输
// 交收期-旬： settle_date td-上旬mtd-中旬td-下旬*现货类型为1-合约现货时必输
// 交货地： delivery_place *地区编码：110102-西城区
// 详细需求： intro
// 报盘企业id: customer_id   brokert填写调用报盘企业列表-broker 
// 报盘企业名：customer_name   brokert填写调用报盘企业列表-broker 
// 企业角色： mdu   broker填写D-经销商U-下游用户 
// 报盘类型： post_type  brokert填写1-替报0-自报
// 我的买盘 参数p
export const myBuy = (data) => http.get('my_buy', data)
// 创建买盘
export const createBuy = (data, config={}) => http.post('create_buy', data, config)
// 修改买盘 多一个参数买盘id
export const changeBuy = (data, config={}) => http.post('change_buy', data, config)
// 修改买盘状态 参数id 买盘id state 1-激活 0-取消激活
export const ableBuy = (data) => http.get('able_buy', data)
// 删除买盘 参数id 买盘id
export const deleteBuy = (data) => http.get('delete_buy', data)

// ======卖盘参数
// 商品D: product_id *该商品的需求类型必须包括卖盘
// 标题： name
// 订单类型： order_type *1-线上支付2-线下支付
// 现货类型： trade_type *1-合约现货2-即期现货
// 单价： price *元填0表示点价，请说明点价规侧
// 点价规则： dprice
// 数量： amount *(大于0.01的数字)
// 有效时间： express_time *(整数时间) 即期现货有效期最多10天，合约现货有效期最多360天
// 有效时间单位： express_unit d-天h-小时
// 交收期-月份： settle_month 1-12*现货类型为1-合约现货时必输
// 交收期-旬： settle_date td-上旬mtd-中旬td-下旬*现货类型为1-合约现货时必输
// 交货地： delivery_place *地区编码：110102-西城区
// 图片： pics 多个图片用，逗▣号隔开
// 备注： remark
// 报盘企业id: customer_id   brokert填写调用报盘企业列表-broker 
// 报盘企业名：customer_name   brokert填写调用报盘企业列表-broker 
// 企业角色： mdu   broker填写D-经销商U-下游用户 
// 报盘类型： post_type  brokert填写1-替报0-自报
// 我的卖盘 参数p
export const mySell = (data) => http.get('my_sell', data)
// 修改卖盘状态 参数id 卖盘id state 1-激活 0-取消激活
export const ableSell = (data) => http.get('able_sell', data)
//  删除卖盘 参数id 卖盘id
export const deleteSell = (data) => http.get('delete_sell', data)
//  创建卖盘
export const createSell = (data, config={}) => http.post('create_sell', data, config)
//  修改卖盘 多一个参数卖盘id
export const changeSell = (data, config={}) => http.post('change_sell', data, config)
