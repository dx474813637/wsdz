
const http = uni.$u.http

//授权获取用户信息 ？
export const login = (data, config = {}) => http.post('login', data, config)

//获取菜单
export const getMenus = (data) => http.get('memu', data)

//获取 首页整合信息
// pid:标准品PID
// pname:标准品名称
// ppid:生意社品种ID
// name:生意社品种名称
// ave:价格
// amp:日涨跌幅
// pubDate:日期
export const getHome = (data) => http.get('home', data)
//首页推荐配置 参数plate1 plate2 plate3
export const setHomeConfig = (data, config = {}) => http.post('set_home_config', data, config)

//获取 userid 
export const loginCancel = (data, config = {}) => http.post('login_cancel', data, config)
//获取 商品单位列表
export const getUnit = (data) => http.get('unit', data)
//获取 标准品数据
export const getCategory = (data) => http.get('category', data)
//获取 标准品分类列表 --用getCategory
export const getStancate = (data) => http.get('stancate', data)
//获取 标准品列表 参数p、stancate标准品分类id  多一个参数is_market 1市场标准品 0或空 全部
export const getStandard = (data) => http.get('standard', data)
//获取 客户信息列表 参数p
export const getCompany = (data) => http.get('company', data)
//获取 客户信息明细 参数login
export const getCompanyDetail = (data) => http.get('company_detail', data)
//获取 客户商品列表 参数login、p
export const getCompanyProduct = (data) => http.get('company_product', data)
//获取 客户商品明细（商品明细） 参数id
export const getCompanyProductDetail = (data) => http.get('company_product_detail', data)

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
 */
export const getBuy = (data) => http.get('buy', data)
//获取 买盘明细 参数id
export const getBuyDetail = (data) => http.get('buy_detail', data)
//获取 卖盘列表 参数p
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

// =================>价格大数据api
// 价格大数据首页 参数id、p、dir默认futures，这个根据生意社商品分类的字段来
export const getPpiIndex = (data) => http.get('m_ppi_index', data)
// 获取 生意社价格数据 参数id
export const getPpiAve = (data) => http.get('m_ppi_ave', data)
// 获取 原料价格月柱 参数id、p、dir
export const getPpiBasketCap = (data) => http.get('m_ppi_basket_cap', data)
// 获取 K柱图数据 参数id
export const getPpiPer = (data) => http.get('m_ppi_per', data)
// 获取 融资采购 参数id、dir
export const getPpiBasketBuy = (data) => http.get('m_ppi_basket_buy', data)
// 获取 融资销售 参数id、dir
export const getPpiBasketSell = (data) => http.get('m_ppi_basket_sell', data)
// 获取 生意社商品分类
export const getPpiCateList = (data) => http.get('m_ppi_cate_list', data)
// 获取 生意社报价详情 参数id
export const getPpiPriceDetail = (data) => http.get('m_ppi_price_detail', data)
// 采购/销售表单
/**
 * 
 * 表单参数：
	dir 商品分类（必填）
	mode sell：销售  buy：采购（必填）
	pid 商品pid值（必填）
	ppid 商品ppid值（必填）
	spec 规格
	quantity 年销售量/采购数量（必填）
	mode_type 销售方式/采购方式（必填）
	1：现款销售/单次采购
	2：赊账销售/年度采购
	remarks 备注
	contact 联系人
	mobile 联系手机（必填）
	company 公司名称
 */
export const setPpiApplyBasket = (data, config={}) => http.post('m_ppi_apply_basket', data, config)



// export const checkLogin = (data) => http.get('check_login', data)

/**
 * 
 * 账号 login 账号是以字母开头的任何英文字母以及阿拉伯数字组合，不得少于5个字符
 * 手机号 mobile
 * 密码 passwd 密码可使用任何英文字母以及阿拉伯数字组合，不得少于5个字符并区分英文大小写
 * 手机验证码 captcha
 * 操作标志 flag 1获取手机验证码 2校验并注册
 */
// 注册时搜索手机号是否已经注册 参数mobile
export const searchMobile = (data) => http.get('search_mobile', data)
// 注册账号和注册账号获取验证码
export const register = (data) => http.get('register', data)
// 账号登录 参数login  passwd
export const sunsirsLogin = (data) => http.get('sunsirs_login', data)
// 手机登录 参数mobile captcha flag* 1为获取手机验证码 2为校验并登录
export const loginMobile = (data) => http.get('login_mobile', data)
// 修改密码 参数mobile passwd新密码 captcha flag* 1为获取手机验证码 2为校验并登录
export const passwdReset = (data) => http.get('passwd_reset', data)


//  我的接口，通过list.login有值登录，0未登录。未登录状态，
// 点一般的都跳转登录，除非是一些帮助说明的链接。
// auth权限 现在就0和1,0交易商 1broker 
// 现在区别就是客户管理这块和发布的时候多几个表单选项。0的时候隐藏。
export const wode = (data) => http.get('wode', data)
//登出
export const logout = (data) => http.get('logout', data)

// ======买盘参数
// 商品ID: product_id *该商品的需求类型必须包括买盘
// 标题： name
// 订单类型： order_type *1-线上支付2-线下支付
// 现货类型： trade_type *1-合约现货2-即期现货
// 意向单价： price *元填0表示点价，请说明点价规则
// 点价规则： dprice
// 数量： amount *(大于0.01的数字)
// 主规格： spec
// 有效时间： express_time *(整数时间)
// 有效时间单位： express_unit d-天h-小时
// 交收期-月份： settle_month 1-12*现货类型为1-合约现货时必输
// 交收期-旬： settle_date td-上旬mtd-中旬td-下旬*现货类型为1-合约现货时必输
// 交货地： delivery_place *地区编码：110102-西城区
// 详细需求： intro
// 我的买盘 参数p
export const myBuy = (data) => http.get('my_buy', data)
// 创建买盘
export const createBuy = (data) => http.get('create_buy', data)
// 修改买盘 多一个参数买盘id
export const changeBuy = (data) => http.get('change_buy', data)
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
// 有效时间： express_time *(整数时间)
// 有效时间单位： express_unit d-天h-小时
// 交收期-月份： settle_month 1-12*现货类型为1-合约现货时必输
// 交收期-旬： settle_date td-上旬mtd-中旬td-下旬*现货类型为1-合约现货时必输
// 交货地： delivery_place *地区编码：110102-西城区
// 图片： pics 多个图片用，逗▣号隔开
// 备注： remark
// 我的卖盘 参数p
export const mySell = (data) => http.get('my_sell', data)
// 修改卖盘状态 参数id 卖盘id state 1-激活 0-取消激活
export const ableSell = (data) => http.get('able_sell', data)
//  删除卖盘 参数id 卖盘id
export const deleteSell = (data) => http.get('delete_sell', data)
//  创建卖盘
export const createSell = (data) => http.get('create_sell', data)
//  修改卖盘 多一个参数卖盘id
export const changeSell = (data) => http.get('change_sell', data)

// =======客户信息
// 用户类型： type *B-企业C-个人 
// 名称/姓名： name 
// 联系人： contact *用户类型为企业时必输 
// 电话： tel 
// 传真： fax 
// 邮编： zip 
// 邮箱： email 
// 联系手机： mobile 不传默认为注册手机号 
// 手机是否前台显示： mobile_show 1-显示 
// 所在地： regional 地区代码，如：110101 
// 详细地址： address 
// 统一社会信用代码/身份证号： credit_code
// 获取我的客户信息
export const myCompany = (data) => http.get('my_company', data)
// 创建/修改客户信息
export const editCompany = (data) => http.get('edit_company', data)

// =====地址信息
// 收/发地址： type *R-收S-发RS-收发 
// 地区： regional  地区编码：110102-西城区 
// 详细地址： address 
// 联系人： contact 
// 电话： tel 
// 备注： remark
//  我的地址 参数p
export const myAddress = (data) => http.get('my_address', data)
//  删除地址 参数id
export const deleteAddress = (data) => http.get('delete_address', data)
//  创建地址
export const createAddress = (data, config={}) => http.post('create_address', data, config)
//  修改地址，比创建多参数id 和to_def 设为默认：1-默认
export const changeAddress = (data, config={}) => http.post('change_address', data, config)
//  地址编码
export const addressArea = (data) => http.get('address_area', data)


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
// 我的商品列表 参数p
export const myProduct = (data) => http.get('my_product', data)
// 删除商品 参数id
export const deleteProduct = (data) => http.get('delete_product', data)
// 改变商品状态 参数id state
export const ableProduct = (data) => http.get('able_product', data)
// 创建商品
export const createProduct = (data) => http.get('create_product', data)
//  编辑商品 多一个参数id
export const changeProduct = (data) => http.get('change_product', data)


















// =====================>下列测试mock拦截api用

export const getInitData = (data) => http.get('/api/initData', data)

export const getRegionalList = (data) => http.get('/api/regional_list', data)

export const submitAddrData = (params, config = {}) => http.post('/api/address_change', params, config)

export const delAddress = (data) => http.get('/api/delAddress', data)

export const getBrokerProds = (data) => http.get('/api/getBrokerProds', data)

export const changeProdStatus = (data) => http.get('/api/changeProdStatus', data)

export const editProd = (params, config = {}) => http.post('/api/editProd', params, config)

export const getSubscribeMsgList = (data) => http.get('/api/getSubscribeMsgList', data)

export const getCustomerList = (data) => http.get('/api/getCustomerList', data)

export const editCostomDetail = (params, config = {}) => http.post('/api/editCostomDetail', params, config)

export const changeLoginPwd = (data) => http.get('/api/changeLoginPwd', data)

export const changeSinoLoginPwd = (data) => http.get('/api/changeSinoLoginPwd', data)

export const updatePayPwd = (data) => http.get('/api/updatePayPwd', data)

export const forgetPayPwd = (data) => http.get('/api/forgetPayPwd', data)

export const getPhoneCode = (data) => http.get('/api/getPhoneCode', data)

export const valPhoneCode = (data) => http.get('/api/valPhoneCode', data)

export const getLogList = (data) => http.get('/api/getLogList', data)

export const getOrderList = (data) => http.get('/api/getOrderList', data)

export const getCzList = (data) => http.get('/api/getCzList', data)

export const getBillList = (data) => http.get('/api/getBillList', data)

export const getBankcardList = (data) => http.get('/api/getBankcardList', data)

export const bindBankCard = (params, config = {}) => http.post('/api/bindBankCard', params, config)

export const czApply = (params, config = {}) => http.post('/api/czApply', params, config)

export const searchBank = (params) => http.get('/api/searchBank', params)

export const getBrokerList = (params) => http.get('/api/getBrokerList', params)

export const getPanList = (params) => http.get('/api/getPanList', params)

export const getFollowPanList = (params) => http.get('/api/getFollowPanList', params)

export const getEcData = (params) => http.get('/api/getEcData', params)

export const getHqData = (params) => http.get('/api/getHqData', params)

export const getAttentionList = (params) => http.get('/api/getAttentionList', params)

export const getMenusList = (params) => http.get('/api/getMenusList', params)

export const setNewFollow = (params) => http.get('/api/setNewFollow', params)

export const removeFollow = (params) => http.get('/api/removeFollow', params)

export const getMarketList = (params) => http.get('/api/getMarketList', params)

