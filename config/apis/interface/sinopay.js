const http = uni.$u.http


// sino_account  当前支付账号
export const sino_account = (data) => http.get('sino_account', data)
// sino_account_list 支付账号列表  'terms' => '关键词', 'p' => '页码',
export const sino_account_list = (data) => http.get('sino_account_list', data)
// sino_account_bind 绑定已有支付账号
	// 'sinopay_poster' => 'sinopay帐号',
	// 'sinopay_passwd' => '登录密码',
	// 'remark' => '备注',
export const sino_account_bind = (data) => http.get('sino_account_bind', data)

// sino_account_create 开通支付账号
	// 法人姓名： legal_name *企业账号必输
	// 法人身份证： lecerti_code *企业账号必输
	// 登录密码： passwd 
	// 备注： remark
	// 验证码： captcha
	// 操作标志： flag *1-获取短信2-回填验证码
export const sino_account_create = (data) => http.get('sino_account_create', data)

// sino_account_unbind 解除绑定支付账号 支付账号ID：id
export const sino_account_unbind = (data) => http.get('sino_account_unbind', data)
// sino_account_change_psw 修改Sinopay登录密码 支付账号ID：id 原始密码：opasswd 新密码：npasswd
export const sino_account_change_psw = (data) => http.get('sino_account_change_psw', data)
// sino_account_reset_psw 重置Sinopay登录密码
	// 支付账号 ID: id
	// 新密码： npasswd
	// 验证码： captcha
	// 操作标志： flag *1-获取短信2-回填验证码
export const sino_account_reset_psw = (data) => http.get('sino_account_reset_psw', data)

// sino_account_change_paypwd 设置/修改支付密码
	// 支付账号ID: id
	// 原始密码： npasswd 修改支付密码时必填
	// 新密码： opasswd
	// 验证码： captcha
	// 操作标志： flag *1-获取短信2-回填验证码
export const sino_account_change_paypwd = (data) => http.get('sino_account_change_paypwd', data)

// sino_fund_account 现金账号列表
export const sino_fund_account = (data) => http.get('sino_fund_account', data)
// sino_fund_account_reg 开通现金账户  现金账户ID：id
export const sino_fund_account_reg = (data) => http.get('sino_fund_account_reg', data)
// sino_fund_account_refresh_bal 刷新现金账号的余额. 现金账户ID：account_id
export const sino_fund_account_refresh_bal = (data) => http.get('sino_fund_account_refresh_bal', data)
// sino_fund_account_bind 绑定银行卡-发起申请（认证）
	// 现金账户ID: account_id
	// 账户名： name *银行卡账户名
	// 卡号： bank_accno *银行卡号
	// 社会信用统一代码： card_id *社会信用统一代码
	// 法人姓名： legal_name
	// 法人身份证： lecerti_code
	// 手机号： mobile *手机号码必须与银行预留手机号一致，绑定后您的资金账户手机号码也会变成该手机号码
	// 开户行名称： bank_name *通过搜索开户行接口获取
export const sino_fund_account_bind = (data) => http.get('sino_fund_account_bind', data)

// sino_fund_account_bank 搜索开户行  关键词：terms 页码：p
export const sino_fund_account_bank = (data) => http.get('sino_fund_account_bank', data)
// sino_fund_account_check 绑定银行卡-校验（认证）
	// 绑定ID： id
	// 鉴权验证金额： amt * 企业必填 鉴权有效时间是48小时
	// 鉴权验证码： code * 如果未收到鉴权验证码，请取消该鉴权任务，重新发起绑定
export const sino_fund_account_check = (data) => http.get('sino_fund_account_check', data)

// sino_fund_account_check_captcha 绑定银行卡-重新获取短信验证码（个人使用）绑定ID：id
export const sino_fund_account_check_captcha = (data) => http.get('sino_fund_account_check_captcha', data)
// sino_fund_account_check_cancel 绑定银行卡-取消鉴权 绑定ID：id
export const sino_fund_account_check_cancel = (data) => http.get('sino_fund_account_check_cancel', data)
// sino_fund_account_unbind 绑定银行卡-解除绑定 绑定ID：id
export const sino_fund_account_unbind = (data) => http.get('sino_fund_account_unbind', data)
// sino_fund_account_list_bind 绑定银行卡列表 现金账户ID：account_id
export const sino_fund_account_list_bind = (data) => http.get('sino_fund_account_list_bind', data)
// sino_fund_account_detail_bind 绑定银行卡详情 绑定ID：id
export const sino_fund_account_detail_bind = (data) => http.get('sino_fund_account_detail_bind', data)

// sino_fund_refund_list_refund 提现列表 现金账户ID：account_id 页码：p
export const sino_fund_refund_list_refund = (data) => http.get('sino_fund_refund_list_refund', data)
// sino_fund_refund_create 创建提现订单
	// 现金账户ID： account_id *
	// 绑定银行卡ID：  bank_accid *
	// 提现金额： rice *
	// 备注： remark
export const sino_fund_refund_create = (data) => http.get('sino_fund_refund_create', data)

// sino_fund_refund_fee_fund_count 提现手续费 提现金额：price
export const sino_fund_refund_fee_fund_count = (data) => http.get('sino_fund_refund_fee_fund_count', data)
// sino_fund_refund_refund 提现
	// 提现订单ID： id *
	// 支付密码：  paypwd *
export const sino_fund_refund_refund = (data) => http.get('sino_fund_refund_refund', data)

// sino_fund_refund_detail_refund 提现明细 提现订单ID：id
export const sino_fund_refund_detail_refund = (data) => http.get('sino_fund_refund_detail_refund', data)
// sino_fund_refund_cancel 取消提现订单 提现订单ID：id
export const sino_fund_refund_cancel = (data) => http.get('sino_fund_refund_cancel', data)

// sino_fund_order_list_order 付款/收款列表
	// 支付类型： paytype B-付款 S-收款
	// 页码： p
	// 卖方/买方： company 支付类型为付款时为卖方 支付类型为收款时为买方
export const sino_fund_order_list_order = (data) => http.get('sino_fund_order_list_order', data)

// 我砍 sino_fund_order_detail_order 付款/收款详情
	// 支付类型：  paytype B-付款 S-收款
	// 支付ID：  pay_id *
export const sino_fund_order_detail_order = (data) => http.get('sino_fund_order_detail_order', data)

// sino_bill_account_list  票据账号列表
export const sino_bill_account_list = (data) => http.get('sino_bill_account_list', data)
// sino_bill_account_list_account 电票账号列表
export const sino_bill_account_list_account = (data) => http.get('sino_bill_account_list_account', data)
// sino_bill_order_list 票据支付列表
	// 支付类型： paytype B-买方支付 S-卖方支付
	// 页码：  p
	// 卖方/买方： company 支付类型为买方支付时为卖方 支付类型为卖方支付时为买方
export const sino_bill_order_list = (data) => http.get('sino_bill_order_list', data)


// sino_bill_order_detail 票据支付详情 
	// 支付类型： paytype B-买方支付 S-卖方支付
	// 支付ID：  pay_id *
export const sino_bill_order_detail = (data) => http.get('sino_bill_order_detail', data)
