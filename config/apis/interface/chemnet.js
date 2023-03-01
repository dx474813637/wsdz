const http = uni.$u.http

// chemnet_home
export const chemnet_home = (data) => http.get('chemnet_home', data)
// chemnet_category
export const chemnet_category = (data) => http.get('chemnet_category', data)

// chemnet_product_list 行业商品列表 参数category 分类id（不是必须） p页数
export const chemnet_product_list = (data) => http.get('chemnet_product_list', data)
// chemnet_product_detail 化工网商城商品详情 参数id
export const chemnet_product_detail = (data) => http.get('chemnet_product_detail', data)
// chemnet_product_search 商品搜索  参数：terms 关键字 p页数
export const chemnet_product_search = (data) => http.get('chemnet_product_search', data)