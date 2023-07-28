 
const http = uni.$u.http 

export const all_api = (data, methods = 'GET', config = {}) => {
	if (methods == 'GET') {
		return http.get('all_api', data)
	} else if (methods == 'POST') {
		return http.post('all_api', data, config)
	}
}


// getFxStandard 标准品列表
export const getFxStandard = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'LIST_STANDARD'}}, data))

// jyfw_edit 添加/修改 经营范围
export const jyfw_edit = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'CHANGE', token: 1}}, data))
// jyfw_list 翻页列表
export const jyfw_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'PAGE_LIST', token: 1}}, data))
// jyfw_list_all 完整列表
export const jyfw_list_all = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'LIST', token: 1}}, data))
// jyfw_del 删除经营范围
export const jyfw_del = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PID_TO_MEMBER', Action: 'DELETE', token: 1}}, data))

// fxgx_list 分销关系
export const fxgx_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER', Action: 'PAGE_LIST', token: 1}}, data))
// fxgx_wait_list 待分销关系
export const fxgx_wait_list = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER', Action: 'PAGE_LIST_DA_PRODUCT', token: 1}}, data))
// fxgx_add 添加分销关系
export const fxgx_add = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER', Action: 'CREATE', token: 1}}, data))
// fxgx_status_change 分销关系 改变状态
export const fxgx_status_change = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER', Action: 'ABLE', token: 1}}, data))
// fxgx_del 分销关系 删除
export const fxgx_del = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'DA_ALLIANCE_DA_PRODUCT_TO_MEMBER', Action: 'DELETE', token: 1}}, data))
