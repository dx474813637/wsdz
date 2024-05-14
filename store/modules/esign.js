
let state = {
		sign_info: {}
	},
	getters = { 
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
		clearSino(state, data) { 
			state.sign_info = {}
			// uni.setStorageSync('sign_info', {})
		}
	},
	actions = {
		async ESIGN_QUERY_ESIGN_ACCOUNT({commit, state}, data={}) {
			const res = await this._vm.$api.ESIGN_QUERY_ESIGN_ACCOUNT();
			if(res.code == 1) {
				commit('setSignInfo', res.list)
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