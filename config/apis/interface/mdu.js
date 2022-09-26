const http = uni.$u.http

// customer_mdu_create_mdu_broker 
	// 	添加MDU（broker）customer_login pid mdu remark.  M-生产商 D-经销商 U-下游用户 多选的话用英文逗号,隔开
export const customer_mdu_create_mdu_broker = (data) => http.get('customer_mdu_create_mdu_broker', data)
// customer_mdu_list_mdu_broker
	//  MDU列表（broker）customer_login p pid mdu state 0-待确认 1-已确认 2-不通过
export const customer_mdu_list_mdu_broker = (data) => http.get('customer_mdu_list_mdu_broker', data)
// customer_mdu_detail_mdu_broker
	//  MDU详细页（broker） id
export const customer_mdu_detail_mdu_broker = (data) => http.get('customer_mdu_detail_mdu_broker', data)
// customer_mdu_change_mdu_broker
	//  修改MDU （broker）id pid mdu remark.  M-生产商 D-经销商 U-下游用户
export const customer_mdu_change_mdu_broker = (data) => http.get('customer_mdu_change_mdu_broker', data)
// customer_mdu_delete_mdu_broker
	//  删除MDU（broker）id
export const customer_mdu_delete_mdu_broker = (data) => http.get('customer_mdu_delete_mdu_broker', data)

// customer_mdu_create_mdu
	// 添加MDU（交易商）pid mdu remark.  M-生产商 D-经销商 U-下游用户 多选的话用英文逗号,隔开
export const customer_mdu_create_mdu = (data) => http.get('customer_mdu_create_mdu', data)
// customer_mdu_list_mdu 
	// MDU列表（交易商）p pid mdu state 0-待确认 1-已确认 2-不通过
export const customer_mdu_list_mdu = (data) => http.get('customer_mdu_list_mdu', data)
// customer_mdu_audit_mdu 
	// 审核MDU（交易商）id audit 1-审核通过 2-审核拒绝 3-删除
export const customer_mdu_audit_mdu = (data) => http.get('customer_mdu_audit_mdu', data)
// customer_mdu_detail_mdu 
	// MDU详细页（交易商）id
export const customer_mdu_detail_mdu = (data) => http.get('customer_mdu_detail_mdu', data)
// customer_mdu_change_mdu 
	// 修改MDU（交易商）id pid mdu remark.  M-生产商 D-经销商 U-下游用户
export const customer_mdu_change_mdu = (data) => http.get('customer_mdu_change_mdu', data)

// mdu_broker   mdu客户选择列表
export const mdu_broker = (data) => http.get('mdu_broker', data)
