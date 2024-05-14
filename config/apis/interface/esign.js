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
 
 // 08-获取开户行支行名称列表
 export const ESIGN_GET_BANK_NAME = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'GET_BANK_NAME', token: 1}}, data))
 
 // 09-企业认证申请-随机金额校验
 export const ESIGN_VERIFY_RANDOM_AMOUNT = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'VERIFY_RANDOM_AMOUNT', token: 1}}, data))
 
 // 10-企业认证申请-查询认证状态
 export const ESIGN_QUERY_VERIFY_ORGANIZATIONS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'QUERY_VERIFY_ORGANIZATIONS', token: 1}}, data))
 
 // 11-查询随机金额打款进度
 // * 单独查询，如果收不到随机金额打款，可通过此接口查询原因 
 export const ESIGN_QUERY_TRANSFER_PROCESS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'QUERY_TRANSFER_PROCESS', token: 1}}, data))