
let state = {
		sign_info: {},
		bank: []
	},
	getters = { 
		is_sign_apply(state) { 
			return state.sign_info.id ? true : false
		},
		sign_agent(state) { 
			return state.sign_info.agent_state
		},
		sign_organizations(state) { 
			return state.sign_info.organizations_state
		},
	},
	mutations = {
		setSignInfo(state, data) { 
			state.sign_info = data?.Result || {}
			// uni.setStorageSync('sign_info', data)
		}, 
		setBank(state, data) { 
			state.bank = data?.list || [] 
		}, 
		clearSino(state, data) { 
			state.sign_info = {}
			// uni.setStorageSync('sign_info', {})
		},
		updateSignState(state, data) {
			state.sign_info.organizations_state = data
		}
	},
	actions = {
		async ESIGN_QUERY_ESIGN_ACCOUNT({commit, state}, data={}) {
			const res = await this._vm.$api.ESIGN_QUERY_ESIGN_ACCOUNT();
			if(res.code == 1) {
				commit('setSignInfo', res.list)
			}
		}, 
		async ESIGN_GET_BANK_CODE({commit, state}, data={}) {
			const res = await this._vm.$api.ESIGN_GET_BANK_CODE();
			if(res.code == 1) {
				commit('setBank', res.list)
			}
		}, 
	}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}