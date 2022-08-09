
let state = {
		sino: uni.getStorageSync('sino') || {},
		sinoFund: [],
		sinoFundLoading: false
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