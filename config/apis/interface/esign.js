 // https://api.rawmex.cn/gw/demo/
const http = uni.$u.http 

import {all_api} from '@/config/apis/interface/base.js'

// 代理人签约认证：02->01->03->04->02
// 企业签约认证：02->05->09->10->02
// 注：企业认证的前提是代理人已认证 https://api.rawmex.cn/gw/demo/esign/auth.html 

// 01-签约身份信息添加
export const ESIGN_CREATE_ESIGN_ACCOUNT = (data = {}) => all_api(uni.$u.deepMerge({API: 'ESIGN', Action: 'CREATE_ESIGN_ACCOUNT', token: 1}, data), 'POST') 

 // 02-查询签约身份信息
 // organizations_state：企业认证状态 1-未认证 2-已认证 4-已失效
 // agent_state：代理人认证状态 1-未认证 2-已认证 4-已失效
 export const ESIGN_QUERY_ESIGN_ACCOUNT = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'QUERY_ESIGN_ACCOUNT', token: 1}}, data))
  
 // 03-代理人认证-获取短信验证码 
 export const ESIGN_VERIFY_AGENT_GET_CAPTCHA = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'VERIFY_AGENT_GET_CAPTCHA', token: 1}}, data))
  
 // 04-代理人认证-提交短信验证码 
 export const ESIGN_VERIFY_AGENT = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'VERIFY_AGENT', token: 1}}, data))
 
 // 05-企业认证申请
export const ESIGN_TRANSFER_RANDOM_AMOUNT = (data = {}) => all_api(uni.$u.deepMerge({API: 'ESIGN', Action: 'TRANSFER_RANDOM_AMOUNT', token: 1}, data), 'POST') 

 // 06-获取开户行总行列表
 export const ESIGN_GET_BANK_CODE = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'GET_BANK_CODE', token: 1}}, data))
 
 // 07-获取开户行所在地列表
 // 对外接口：https://www.rawmex.cn/cate/api/index.php?_a=regional&f=json 
 export const ESIGN_regional_json = (data) => http.get('regional_json', data) 
 
 
 // 08-获取开户行支行名称列表
 export const ESIGN_GET_BANK_NAME = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'GET_BANK_NAME', token: 1}}, data))
 
 // 09-企业认证申请-随机金额校验
 export const ESIGN_VERIFY_RANDOM_AMOUNT = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'VERIFY_RANDOM_AMOUNT', token: 1}}, data))
 
 // 10-企业认证申请-查询认证状态
 export const ESIGN_QUERY_VERIFY_ORGANIZATIONS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'QUERY_VERIFY_ORGANIZATIONS', token: 1}}, data))
 
 // 11-查询随机金额打款进度
 // * 单独查询，如果收不到随机金额打款，可通过此接口查询原因 
 export const ESIGN_QUERY_TRANSFER_PROCESS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'QUERY_TRANSFER_PROCESS', token: 1}}, data))
 
 // 12-企业认证申请记录 
 export const ESIGN_QUERY_LOGIN_VERIFY_ORGANIZATIONS_RECORD = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'QUERY_LOGIN_VERIFY_ORGANIZATIONS_RECORD', token: 1}}, data))
 
 
 // =======签约=======
 // 流程说明： https://api.rawmex.cn/gw/demo/esign/esign.html
 // 款到发货签约：01->02->05->07->08->09->10 
 // 货到付款签约：06->07->08->09->10
 
// 01-款到发货-买方要求签约
export const DP_ESIGN_CREATE = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'DP_ESIGN_CREATE', token: 1}}, data))
// 02-款到发货-买方或卖方取消签约（发送要求签约后）
export const DP_ESIGN_CANCEL = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'DP_ESIGN_CANCEL', token: 1}}, data))
// 03-合同模板列表
export const LIST_ESIGN_CONTRACT = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'LIST_ESIGN_CONTRACT', token: 1}}, data))
// 04-模板参数列表
export const LIST_ESIGN_CONTRACT_PARAMETERS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'LIST_ESIGN_CONTRACT_PARAMETERS', token: 1}}, data))
// 05-款到发货-卖方确认并发起签约
export const DP_ESIGN_CREATE_CONFIRM = (data = {}) => all_api(uni.$u.deepMerge({API: 'ESIGN', Action: 'DP_ESIGN_CREATE_CONFIRM', token: 1}, data), 'POST') 
// 06-货到付款-卖方要求签约
export const COM_ESIGN_CREATE = (data = {}) => all_api(uni.$u.deepMerge({API: 'ESIGN', Action: 'COM_ESIGN_CREATE', token: 1}, data), 'POST') 
// 07-卖方撤回签约
export const ESIGN_CONFIRM_CANCEL = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'ESIGN_CONFIRM_CANCEL', token: 1}}, data))
// 08-买方确认协商结果
export const ESIGN_CONFIRM = (data = {}) => all_api(uni.$u.deepMerge({API: 'ESIGN', Action: 'ESIGN_CONFIRM', token: 1}, data), 'POST') 
// 09-开启签约
export const ESIGN_START = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'ESIGN_START', token: 1}}, data))
// 10-查询签约结果
export const ESIGN_QUERY = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'ESIGN_QUERY', token: 1}}, data))
// 11-签约列表
export const LIST_ESIGN_SIGNFLOWS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'LIST_ESIGN_SIGNFLOWS', token: 1}}, data))
// 12-签约详细页
export const DETAIL_ESIGN_SIGNFLOWS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'DETAIL_ESIGN_SIGNFLOWS', token: 1}}, data))
// 13-提交自动签约授权申请 
export const AUTH_Z = (data = {}) => all_api(uni.$u.deepMerge({API: 'ESIGN', Action: 'AUTH_Z', token: 1}, data), 'POST') 
// 14-应用平台选择列表
export const LIST_MANCUSTS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'LIST_MANCUSTS', token: 1}}, data))
// 15-开启授权
export const AUTH_Z_START = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'AUTH_Z_START', token: 1}}, data))
// 16-查询授权信息
export const AUTH_Z_QUERY = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'AUTH_Z_QUERY', token: 1}}, data))
// 17-申请重新发起授权申请
export const AUTH_Z_RE = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'AUTH_Z_RE', token: 1}}, data))
// 18-修改应用场景授权
export const AUTH_Z_SCENE = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'AUTH_Z_SCENE', token: 1}}, data))
 
 
 // 19-合同预览（选择合同模板时）
 export const VIEW_CONTRACT = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'VIEW_CONTRACT', token: 1}}, data))
  
  
// 20-自动签约授权合同预览
export const AUTH_Z_VIEW = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'AUTH_Z_VIEW', token: 1}}, data))
   
  
 
 
 