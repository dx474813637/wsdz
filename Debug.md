 
========================
2022年9月29日
一、交易商用户信息平台灭活：
1.我的，账号后面以及用户信息详细页建议加上文字提示（PC端是提示“平台灭活”）。
2.仍然可以新增/重发/激活买卖盘，应该提示“请等待用户信息审核成功”或“用户信息被平台灭活”；
3.broker，客户列表/客户详情，审核状态显示为“2”，应该显示为“平台灭活”；

二、broker用户信息未激活：
1.激活自己的买卖盘时，提示为“客户信息未审核”，应该提示“用户信息未审核”；
2.买卖盘下单，提示为“客户信息未审核”，应该提示“用户信息未审核”；

三、broker用户信息平台灭活：
1.我的，账号后面以及用户信息详细页建议加上文字提示（同一、1.）。
2.客户列表，客户详情仍然可以审核激活操作，此时的broker应该无权操作，建议提示“用户信息被平台灭活”；
3.自己的买卖盘，仍然可以新增/重发/激活买卖盘，应该不能操作，提示“用户信息被平台灭活”；
4.委托买卖盘列表及详情页，仍然可以激活客户委托买卖盘，应该不能操作，提示“用户信息被平台灭活”；
5.买卖盘下单，提示信息为“客户信息未审核”，文字内容应该为“用户信息被平台灭活”；
 
四、其他：
1.已认证的用户，用户信息中的企业名称是不允许修改的，这个条件请加上。
========================
2022年9月13日
一、订单交易
1.创建/修改订单，区域信息过长时，会超出页面右侧（是否可以调整？）
2.创建/修改订单提交时，买/卖盘状态变化成了未激活，下单提交提示“标题不能为空”，修改提交提示“修改失败”，建议此时应该提示改成“报盘信息不存在或已下架”这样明确一点。 
# 3.修改订单，将卖家送货改为买家自提，地址信息没有改变（买盘也存在该问题）。 
4.订单类型是线下支付，是没有交付方式和交付工具的，订单详情以及审核表单中这2个字段建议拿掉或不显示隐藏。同意订立后，状态应该显示为“已订立”，而不是待支付（无支付流程的哦）。 
5.订单审核，议价总额是不能修改的，这个框建议做成灰色。
## 6.现金支付，选择两站式支付提交后，“现金发起支付”按钮名称建议改成“查询”查询sinopay最新支付状态。 
7.担保支付，一站式支付成功后，资金冻结，等待买方收货。这个时候，买方点击“现金担保支付确认收货”，再点“确认并提交”按钮，点击无效。 
8.担保支付，两站式sinopay支付完成后的，资金冻结，等待买方收货。此时“现金担保支付确认收货”按钮应该是“申请确认收货”。提示“请财务登录sinopay平台完成确认付款。”按钮名称建议改成“查询”查询sinopay最新支付状态。 
9.确认收货按钮，目前是“现金直接支付确认收货”或“现金担保支付确认收货”太长了，对于用户来说建议简化名称。 
二、资金平台
已绑定已认证： 
1.绑卡认证/绑卡查询/转账充值，建议增加一个“绑定提现银行卡”的按钮，因为绑卡是可以多张的，而且没有这个按钮，解绑后没地方重新绑了。  
2.提现，选择提现银行卡，下方按钮“+使用新银行卡充值”应该是“使用新银行卡提现”，提现金额输入框，建议设置为数字键盘（带小数点） 
3.提现记录，列表页，状态为“等待提现”，无法继续输入密码提现，也无法取消。 
4.网银充值记录，列表页，状态显示有问题，现在显示的是提现状态，应该显示为对应的充值状态，而且详情页>点不开。 
5.同名账户转账记录，无法进入转账的详情页。 
已绑定未认证： 
1.进入资金主页，提示信息为“您还未注册...”，应该是提示用户去认证。 
2.点击资金主页的任意模块及功能，提示信息“资金账户权限不足”显示不到一秒，被刷新掉了，弹出提示“您还未注册...”。 
3.无“添加银行卡”（绑定提现银行卡）的按钮，无法绑卡认证。 


========================

2022年9月2日
rawmex小程序订单交易+资金平台：
一、订单交易：
1 本人发布的买卖盘，建议不可以点击“立即下单”（文字提示，或按钮不可点）。
2 买盘的“立即下单”按钮名称改为“我要供应”，用户会不会更容易理解。
3 买卖盘，订单类型为“线下支付”的即期买卖盘，创建订单时无法提交，都提示“支付工具缺失”。
4 买卖盘，修改订单，创建订单时由买方自己填写了收货区域和地址，此时修改页面的收货区域和地址显示为空，而提货区域和地址显示为买方填写的收货信息；
5 买卖盘，修改订单，报盘信息删除或下架后，修改信息提交时，提示为“修改失败”（建议提示为“报盘信息不存在或已下架！”这样明确一点）
6 订单状态为支付中，选择两站式，确认并提交时，提示“请输入支付密码”，应该是提示“提交成功，请登录sinopay平台完成支付 ”
7 担保支付，订单状态为待收货，如果是两站式的，应该是点击“申请确认收货”后，由财务登录sinopay进行解冻货款。而不是由用户直接输入密码提交。

二、资金平台：
已绑定已认证： 
1 添加银行卡，输入鉴权金额和验证码，提交验证，仍然提示“绑定ID缺失”。
2 提现，提现第一步，请显示可提现余额；
##提现第二步“输入支付密码提交验证”，支付密码输入，不是安全键盘；密码没有显示为隐藏；提现第二步，无法取消提现。
##3 同名账户转账，第二步短信验证码校验，无法取消转账；
转账成功后，仍然停留在“短信验证码校验”页面，页面不会跳转；
转账金额输入<0.01时，虽然提示“参数不全”，但还是会新增一条记录在转账列表中。（建议设置下金额格式）
#4 提现记录，列表页，状态为“等待提现”，无法继续输入密码提现，也无法取消；详情页，所有记录的状态都为“提现成功”（而不是其对应的状态）。
5 网银充值记录，列表页，状态显示有问题，应该显示为对应的充值状态，而不是提现状态；
##详情页，不需要显示银行卡；充值金额/状态等信息显示不对应。
##6 同名账户转账记录，无法进入转账的详情页；
状态为“等待转账/转账中”，无法取消转账。
7 收付记录，收付款详情，担保支付的支付工具字段，应该显示为 现金 担保支付。 
##8 已绑定未认证，点击资金主页任意模块，提示信息“资金账户权限不足”显示不到一秒，被刷新掉了，看不清提示信息。
9 已绑定未认证，点击“去认证”，跳转的是资金主页，而不是认证页面；点击“添加银行卡”，仍然提示“资金账户权限不足”。
10 未绑定，绑定已有账号，企业名称过长时，部分信息会被遮挡。
11 未绑定，点击资金主页的眼睛，冻结金额显示为“undenfined”，建议改成0或者无。


============================
2022年8月24日您好：
注册新账号
1.页面标题“注册支付平台（sinopay）账号”，少了一个台字。
2.页面需要增加显示和“统一社会信用代码”这个字段；密码设置需要二次确认；法人身份证输入格式建议限制下只能数字和字母。
3.法人姓名已填，点击“获取验证码”，验证码开始倒计时，但提示“法人姓名缺失”。
 
绑定已有账号
1.页面需要增加显示“公司名称”和“统一社会信用代码”这2个字段；备注字段背景提示文字建议拿掉或者使用中文。
2.用户绑定成功，此后如果sinopay解除绑定，用户还是能继续查看资金相关页面，虽然个别会提示“绑定关系不存在”，
但内容仍可见，安全设置等功能仍能打开。只有退出登录才会更新。这个建议直接不能点击或弹出您“还未注册的页面”。
 
资金主页
1.已认证的账户，“绑卡认证”按钮不显示。（图1）
2.收付记录（现金），收款列表，搜索功能无效。
 
安全设置
1.修改登录密码，建议文字改为“修改sinopay登录密码”。
# 2.重置登录密码、设置或修改支付密码、重置支付密码，这3个页面的手机号显示不对（显示的应该是sinopay绑定的手机号，而不是rawmex的联系手机）
 
绑定认证/绑卡查询/转账充值
1.银行账户列表，状态是“未验证”的，显示的是值0（应该是具体状态名）。
2.银行卡详情，只有“未验证”的才有“银行卡鉴权”按钮，其他状态不需要这个按钮。开户行名称过长时，顶部的蓝色部分，银行卡号会被遮挡。（图2）
# 3.输入鉴权验证金额和鉴权验证，点击“提交验证/当前银行卡详情/点我取消鉴权”，都会提示“绑定ID缺失” 。
 
充值/提现/转账 记录
## 1.该页面只显示了提现记录，充值和转账记录都没有显示。
2.提现记录列表（付款账户），状态为“已取消”，显示的是“等待提现”。
3.提现记录列表（收款账户），显示的仍是付款账户的记录内容。
4.提现记录详情页，状态显示的是值0（应该是具体状态名）；金额和手续费，请加上单位。
 
提现
选择银行卡并填写提现金额后，提交，提示“提现金额缺失”。
 
收/付款账户信息
1.已认证的账户，“绑卡认证”按钮不显示。
2.点击“同名账户转账记录”，这个与“充值/提现/转账 记录 ”重复，建议去掉。
## 3.点击“同名账户转账”，这个只是输入短信验证码即可，小程序上应该可以实现，建议不必提示前往电脑端操作。
 
票据相关
票据接口唐经理说暂不提供了，所以小程序有关票据的不用展示，请拿掉。


=============================
2022年8月19日 

交易相关：
一、合约现货暂不支持在线交易，已过期和已下架也不能下单。这3类情况下，买卖盘的“立即下单”按钮隐藏或不可点击。
二、买盘或卖盘下单（创建订单）：
1.订单类型为“线下支付”的即期卖盘，下单后无法提交，提示“交付方式缺失” 。
2.单价和商品总额，输入键盘没有小数点，建议要能支持小数点的输入。
3.卖盘下单，交收方式选“卖家送货”，收货区域和地址，不应该显示卖方的，应该为空，由买方填写。
4.买盘下单，交收方式选“买家自提”，提货区域和地址，不应该显示买方的，应该为空，由卖家填写。
5.地址中的&lt和&gt请解析为<>。
6.采购量大于数量时，提交后提示“创建失败”，能明确提示“采购量不能大于报盘数量”。
7.订单详情中，商品详情的换行符<br />也请解析；备注，英文内容过多时，没有换行，直接延伸超出页面右侧边界。（图1）
###[因为接口里company撮合员覆盖客户信息] 8.客户对委托broker的买卖盘，下单，创建订单页，卖方应该显示为该买卖盘交易商的公司名称，而不是撮合员的宁波网盛大宗...（图21）
三、修改订单（发起中）：
###[远程显示] 1.从买盘，下单，发起中的订单确实“取消”“修改”“发送”按钮，流程无法继续。
2.卖盘下单的，修改订单，无法提交，提示“订单ID缺失”。
四、审核后的，订单详情中少了一个字段“审核备注”。
##[已修改为其他交互UI显示] 五、发送订单，提示文字“发送成功！正在...”正在后面如果没有内容建议去掉。发起支付、支付成功、发货等的提示文字也一样。且停留时间建议增加1秒。
六、支付：
###[] 1.支付方式，“两站式”建议可选， 两站式支付后会有对应的提示文字“请财务登录sinopay......”
#[?无接口] 2.支付密码错误多次后，会被冻结，并出现重置解冻按钮的操作。
3.发起支付，弹出的“支付确认”窗口，第一次点击“查看当前支付订单详情”，跳转的是资金主页；第二次点击才跳转到付款详情，但提示“支付ID缺失”，且内容是空的，还少了“订单金额”字段。（图3）
七、收货：
##[远程文字] 1.款到发货：买方确认收货的按钮“现金直接支付确认收货”，文字太长，个别手机出现换行，建议直接用“确认收货”居中显示。
##[远程文字] 2.担保支付：待收货时，订单详情的“现金担保支付确认收货”按钮名称建议改为“确认收货”或“确认收货（支付）”比较贴切。 输入密码后提交，提示“参数不全”，无法提交。（图4）
##[远程文字] 3.货到付款：待支付时，订单详情的“现金发起支付”按钮名称建议改为“确认收货”或“确认收货（支付）”比较贴切。
4.确认收货，弹出的“收货确认”窗口，点击“查看当前支付订单详情”（图5），也存在六(3)的问题。
 
其他问题：
一、无账号，手机短信快速(注册)登录，提示“验证码校验失败”。
二、broker客户管理： 
	1. 客户列表，卖盘记录|买盘记录，如果是客户自主发布买卖盘，broker只有预览功能，不能进入买卖盘的编辑页面。访问记录提示“没有用户登录账号”？
	2. 销售订单|采购订单，客户企业检索，此处键盘不必弹出。订单详情的交付方式和支付工具显示有问题（不是时间），交收状态显示的是值0（应该是具体状态名）。 








jiaban=======
8.9		3.5h
8.10	1h
8.11	4h
8.20	4.5h
8.27	6.5h