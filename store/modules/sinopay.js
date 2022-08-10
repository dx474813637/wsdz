
let state = {
		sino: uni.getStorageSync('sino') || {},
		sinoFund: [],
		sinoFundLoading: false,
		sinoBillAccount: {},
		sinoBillLoading: false,
		sinoBillAccountList: [],
		sinoBillListLoading: false,
	},
	getters = {
		
	},
	mutations = {
		setSinoAccount(state, data) {
			state.sino = data
			uni.setStorageSync('sino', data)
		},
		setSinoFundAccount(state, data) {
			state.sinoFund = data
		},
		setSinoFundLoading(state, data) {
			state.sinoFundLoading = data
		},
		setSinoBillLoading(state, data) {
			state.sinoBillLoading = data
		},
		setSinoBillListLoading(state, data) {
			state.sinoBillListLoading = data
		},
		setSinoBillAccount(state, data) {
			state.sinoBillAccount = data
		},
		setSinoBillAccountList(state, data) {
			state.sinoBillAccountList = data
		},
		clearSino(state, data) {
			state.sinoFund = []
			state.sino = {}
			uni.setStorageSync('sino', {})
		}
	},
	actions = {
		async getSinoAccount({commit, state}, data={}) {
			const res = await this._vm.$api.sino_account();
			if(res.code == 1) {
				commit('setSinoAccount', res.list)
			}
		},
		async getSinoFundAccount({commit, state}, data={}) {
			
			commit('setSinoFundLoading', true)
			const res = await this._vm.$api.sino_fund_account();
			commit('setSinoFundLoading', false)
			if(res.code == 1) {
				commit('setSinoFundAccount', res.list)
			}
		},
		async getSinoBillAccount({commit, state}, data={}) {
			 
			commit('setSinoBillLoading', true)
			const res = await this._vm.$api.sino_bill_account_list(); 
			
			commit('setSinoBillLoading', false)
			if(res.code == 1) {
				commit('setSinoBillAccount', res.list.bill_account)
			}
		},
		async getSinoBillAccountList({commit, state}, data={}) {
			 
			commit('setSinoBillListLoading', true)
			const res = await this._vm.$api.sino_bill_account_list_account(); 
			commit('setSinoBillListLoading', false)
			if(res.code == 1) {
				commit('setSinoBillAccountList', res.list.list_accounts)
			}
		},
		async refreshSinoFundAccount({commit, state}, data={}) {
			
			// commit('setSinoFundLoading', true)
			const res = await this._vm.$api.sino_fund_account_refresh_bal({
				params: {
					account_id: data.id
				}
			});
			// commit('setSinoFundLoading', false)
			// if(res.code == 1) {
			// 	commit('setSinoFundAccount', res.list)
			// }
		},
	}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}