
let state = {
		sign_info: {},
		sign_auto_info: {},
		bank: []
	},
	getters = { 
		is_sign_apply(state) { 
			return state.sign_info.id ? true : false
		},
		is_sign_auto_form_show(state) { 
			return (!state.sign_auto_info.id || state.sign_auto_info.state == '0') ? true : false
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
		setSignAutoInfo(state, data) { 
			state.sign_auto_info = data?.Esign_pf_signflows || {} 
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
		}, 
		handleViewPdf(state, url) {
			if(!url) return
			uni.downloadFile({
			  url: `https://upload.rawmex.cn/channel_esign/${url}`,
			  success: function (res) {
			    var filePath = res.tempFilePath;
			    uni.openDocument({
			      filePath: filePath,
			      showMenu: true,
			      success: function (res) {
			        console.log('打开文档成功');
			      }
			    });
			  }
			});
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
		async AUTH_Z_QUERY({commit, state}, data={}) {
			const res = await this._vm.$api.AUTH_Z_QUERY();
			if(res.code == 1) { 
				commit('setSignAutoInfo', res.list)
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