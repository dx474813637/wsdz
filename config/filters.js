const type2str = v => {
	if(v == 'B') return '企业用户'
	else if(v == 'C') return '个人用户'
	else return v
}

//时间简写 转 中文  'd'==>'天'  'h'==>'小时'
const expressUnit = v => {
	if(v == 'd') return '天'
	else if(v == 'h') return '小时'
	else return v
}
//过滤商品属性值用于显示
const filterAttributes = v => {
	if(!v || v.length == 0) return ''
	return v.filter(ele => ele.code == 'attr_common_11' || ele.code == 'attr_common_12')
			.reduce((pre, item, index) => {
				let str = '';
				if(item.code == 'attr_common_12') str += '规格属性：'
				else if(item.code == 'attr_common_11') str += '品牌/产地：'
				
				return `${pre}${str}${item.value}。`
			}, '')
}
//时间日期 转 时间戳
const date2timestamp = v => {
	if(!v) return ''
	return new Date(v.replace(/-/g, "/")).getTime()
}
//现货类型 1合约 2即期
const tradeType = v => {
	if(v == '1') return '合约现货'
	else if(v == '2') return '即期现货'
	else return v
}
//现货类型 1合约 2现货
const tradeType2 = v => {
	if(v == '1') return '合约'
	else if(v == '2') return '现货'
	else return v
}
//2 上中下旬
const date2szx = v => {
	if(v == 'ftd') return '上旬'
	else if(v == 'mtd') return '中旬'
	else if(v == 'ltd') return '下旬'
	else return v
}
//B:买家自提 S:卖家送货 BS:买家自提/卖家送货
const settleMode = v => {
	if(v == 'B') return '买家自提'
	else if(v == 'S') return '卖家送货'
	else if(v == 'BS') return '买家自提/卖家送货'
	else return v
}

const postType2fbr = v => {
	if(v == '1') return '撮合员'
	else return '交易商'
}
const auth2str = v => {
	if(v == 1) return '撮合员'
	else if(v == 0)  return '交易商'
	else return ''
}

const price2str = (price, dprice) => {
	if(price != 0) return price;
	if(!dprice) return '议价'
	else return '点价'
}

const chatTimeFilter = (v, flag) => {
	if(!flag) v = v*1000
	// console.log(v)
	if(!v) return uni.$u.timeFormat(new Date().getTime(), 'yyyy年mm月dd日 hh:MM')
	const yesterday_start = new Date(new Date(new Date() - 24*60*60*1000).toLocaleDateString()).getTime()
	const yesterday_end = new Date(new Date().toLocaleDateString()).getTime()
	const cur_year = new Date(`${new Date().getFullYear()}/01/01`).getTime()
	if(v >= yesterday_end) return uni.$u.timeFormat(v, 'hh:MM')
	else if(v >= yesterday_start) return '昨天 ' + uni.$u.timeFormat(v, 'hh:MM')
	else if(v >= cur_year) return uni.$u.timeFormat(v, 'mm月dd日 hh:MM')
	else  return uni.$u.timeFormat(v, 'yyyy年mm月dd日 hh:MM')
	
	// new Date().getTime() - new Date(new Date().toLocaleDateString()).getTime()


}

export default {
	type2str,
	expressUnit,
	date2timestamp,
	tradeType,
	tradeType2,
	settleMode,
	date2szx,
	postType2fbr,
	auth2str,
	price2str,
	filterAttributes,
	chatTimeFilter
}