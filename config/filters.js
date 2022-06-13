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
//B:买家自提 S:卖家送货 BS:两者皆可
const settleMode = v => {
	if(v == 'B') return '买家自提'
	else if(v == 'S') return '卖家送货'
	else if(v == 'BS') return '两者皆可'
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
	price2str
}