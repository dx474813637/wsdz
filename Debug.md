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
#[因为接口里company撮合员覆盖客户信息] 8.客户对委托broker的买卖盘，下单，创建订单页，卖方应该显示为该买卖盘交易商的公司名称，而不是撮合员的宁波网盛大宗...（图21）
三、修改订单（发起中）：
#[远程显示] 1.从买盘，下单，发起中的订单确实“取消”“修改”“发送”按钮，流程无法继续。
2.卖盘下单的，修改订单，无法提交，提示“订单ID缺失”。
四、审核后的，订单详情中少了一个字段“审核备注”。
##[已修改为其他交互UI显示] 五、发送订单，提示文字“发送成功！正在...”正在后面如果没有内容建议去掉。发起支付、支付成功、发货等的提示文字也一样。且停留时间建议增加1秒。
六、支付：
#[?] 1.支付方式，“两站式”建议可选， 两站式支付后会有对应的提示文字“请财务登录sinopay......”
#[?] 2.支付密码错误多次后，会被冻结，并出现重置解冻按钮的操作。
#[?第一次情况未复现]3.发起支付，弹出的“支付确认”窗口，第一次点击“查看当前支付订单详情”，跳转的是资金主页；
第二次点击才跳转到付款详情，但提示“支付ID缺失”，且内容是空的，还少了“订单金额”字段。（图3）
七、收货：
#[远程文字] 1.款到发货：买方确认收货的按钮“现金直接支付确认收货”，文字太长，个别手机出现换行，建议直接用“确认收货”居中显示。
#[远程文字] 2.担保支付：待收货时，订单详情的“现金担保支付确认收货”按钮名称建议改为“确认收货”或“确认收货（支付）”比较贴切。 输入密码后提交，提示“参数不全”，无法提交。（图4）
#[远程文字] 3.货到付款：待支付时，订单详情的“现金发起支付”按钮名称建议改为“确认收货”或“确认收货（支付）”比较贴切。
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