const http = uni.$u.http

// 化工网数据库接口 参数terms
export const chemnet = (data) => http.get('chemical_dictionary', data)

// spot_goods 现货公司接口
export const xianhuo = (data) => http.get('spot_goods', data)

// texnet_index 纺织搜索首页
export const texnetIndex = (data) => http.get('texnet_index', data)
// texnet_search 搜索结果 列表
// domain必须 
// p、search_attr 刷选条件json字符串  
// 比如：{"chengfen":"C100","kezhong":"44"} 
// 一个条件多个值 {"chengfen":"C100,T100","kezhong":"44"}  
// 条件名和值在首页接口里。关键字+条件搜索{"chengfen":"C100,T100","kezhong":"44","terms":"搜索词"} 
export const texnetSearch = (data, config={}) => http.post('texnet_search', data, config)
// texnet_detail 详情接口  参数pid 列表里的pid值
export const texnetDetail = (data) => http.get('texnet_detail', data)

// xueyuan 参数p terms标题搜索 cate分类id shipin=1 视频 shipin=2 图文 0或不传 全部
export const xueyuan = (data) => http.get('xueyuan', data)
// xueyuan_detail 参数id 
export const xueyuanDetail = (data) => http.get('xueyuan_detail', data)

// drawing_list 参数p 
export const drawingList = (data) => http.get('drawing_list', data)

// fangan 解决方案接口 
export const fangan = (data) => http.get('fangan', data)
// fangan_detail 详情接口  参数id
export const fanganDetail = (data) => http.get('fangan_detail', data)

// industry 行业市场/网站 接口  参数cate=1 市场 2网站  p页数
export const industry = (data) => http.get('industry', data)
// 供应链服务
export const scm = (data) => http.get('scm', data)

// 发布黑名单
export const blacklist = (data) => http.get('blacklist', data)

// =============风险评级
// 评级字段说明
export const sinoaaaIndex = (data) => http.get('sinoaaa_index', data)
// 搜索 精准 参数name 企业名称
export const sinoaaaSearch = (data) => http.get('sinoaaa_search', data)
