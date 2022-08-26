const http = uni.$u.http

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
// pricing_center 定价中心  接口  
// 参数pid（不是大数据里的ppid，另一个id。螺纹钢 [pid] => 508 [ppid] => 927）必须。
// zdate上次交易日（格式2022-06-17） 
// ddate拟定价日期（格式2022-06-17） 
// price上次交易价
// 折线图用date_data1 data_data1两个数据，已经处理过的。
export const pricingCenter = (data) => http.get('pricing_center', data)

export const ppiNews = (data) => http.get('ppi_news', data)
export const ppiNewsDetail = (data) => http.get('ppi_news_detail', data)

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
 