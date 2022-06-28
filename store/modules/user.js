
// import * as apis from '@/config/api'

let state = {
		addressArea: [],
		menusList: [],
		wode: {},
		login: 0,
		auth: 0,
		bd: 1,
		sh: 1, //接口接收隐藏一些结构用
		ppiCate: [],
		myCpy: {},
		myAllCpy: [],
		myProduct: [],
		moreMenus: {},
		moreMenusNew: [],
		newMsg: 0,
		tips: {}
	},
	getters = {
	},
	mutations = {
		setAddressArea(state, data) {
			state.addressArea = data
		},
		setMenusList(state, data) {
			state.menusList = data
		},
		setPPiCate(state, data) {
			state.ppiCate = data
		},
		handleGoto(state, obj) {
			uni.$u.route(obj)
		},
		setLogin(state, data) {
			state.login = data;
		},
		setAuth(state, data) {
			state.auth = data;
		},
		setSh(state, data) {
			state.sh = data;
		},
		setMyCpy(state, data) {
			state.myCpy = data;
		},
		setAllCpy(state, data) {
			state.myAllCpy = data;
		},
		setMyProduct(state, data) {
			state.myProduct = data;
		},
		setMoreMenus(state, data) {
			state.moreMenus = data;
		},
		setMoreMenusNew(state, data) {
			state.moreMenusNew = data;
		},
		setNewMsg(state, data) {
			state.newMsg = data;
		},
		setBd(state, data) {
			state.bd = data;
			if(data != 1) {
				uni.redirectTo({
					url: '/pages/my/account/bind_phone'
				})
			}
		},
		setTips(state, data) {
			state.tips = data;
		},
		setWode(state, data) {
			state.wode = data;
		},
		clearLogout(state, data) {
			state.bd = 1
			state.auth = 0
			state.myCpy = {}
			state.myAllCpy = []
			state.login = 0
			state.myProduct = []
			state.newMsg = 0
		}
	},
	actions = {
		async getCompanyProduct({commit, state}, data={}) {
			const res = await this._vm.$api.getCompanyProduct({params: {login: state.login, p: 1, ...data}});
			if(res.code == 1) {
				commit('setMyProduct', res.list)
			}
		},
		async getAllCompany({commit, state}) {
			const res = await this._vm.$api.getAllCompany();
			if(res.code == 1) {
				commit('setAllCpy', res.list)
			}
		},
		async myCompany({commit, state}) {
			const res = await this._vm.$api.myCompany();
			if(res.code == 1) {
				commit('setMyCpy', res.list)
			}
		},
		async wode({commit, state}, data={}) {
			const res = await this._vm.$api.wode({params: data})
			
			commit('setWode', res.list)
			commit('setLogin', res.list.login)
			commit('setAuth', res.list.auth)
			commit('setSh', res.list.sh)
			if(res.list.login) commit('setBd', res.list.bd)
			commit('setTips', {
				tips_info: res.list.tips_info,
				tips_title: res.list.tips_title,
				tips_url: res.list.tips_url
			})
		},
		async getAddressArea({commit, state}) {
			//获取地区toCode 数据 存入vuex
			if (state.addressArea.length != 0) {
				return
			}
			const res = await this._vm.$api.addressArea()
			// const resList = JSON.parse(res.list)
			// const list = listMethods(resList)
			// console.log(res)
			commit('setAddressArea', res.list)
		
		},
		async getMenusList({commit, state}) {
			
			const res = await this._vm.$api.getCategory()
			// console.log(res)
			const arr = []
			for(let key in res.list) {
				arr.push(res.list[key])
			}
			commit('setMenusList', arr)
			// commit('setMenusList', [
			// 	{id: 'dxdx', name: 'A级测试固定菜单名', children: [{id: 'dxdxb', name: 'B级测试固定菜单名1'}, {id: 'dxdxbb', name: 'B级测试固定菜单名2'}]}, 
			// 	...res.data
			// 	]
			// )
		
		},
		async getPPiCate({commit, state}) {
			
			const res = await this._vm.$api.getPpiCateList()
			if(res.code == 1) {
				res.list.forEach(ele => {
					ele.list.forEach(item => {
						item.dir = ele.id
					})
				})
				commit('setPPiCate', res.list)
			}
			// const arr = []
			// res.list.forEach(ele => {
			// 	if(ele.children instanceof Array) {
			// 		if(ele.text == '期货') {
			// 			const obj = {name: '期货', id: 'qihuo'};
			// 			obj.list = ele.children.map(item => {
			// 				return {
			// 					name: item.text,
			// 					value: item.value,
			// 					id: item.value,
			// 					ppid: item.value.split('-')[0],
			// 					dir: item.value.split('-')[1]
			// 				}
			// 			})
			// 			arr.push(obj)
						
			// 		}else {
			// 			ele.children.forEach(item => {
			// 				const obj = {};
			// 				let {text, value, dir, children} = item
			// 				children = children.map(ee => {
			// 					ee.dir = dir
			// 					return ee
			// 				})
			// 				obj.name = text
			// 				obj.list = children
			// 				obj.id = value
			// 				arr.push(obj)
			// 			})
			// 		}
					
			// 	}
			// })
			// console.log(arr)
			
		
		},
	}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}