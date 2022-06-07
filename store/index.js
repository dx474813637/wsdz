import user from '@/store/modules/user.js'
import theme from '@/store/modules/theme.js'

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		user,
		theme
	},
	strict: true
})
// #endif

// #ifdef VUE3
import {createStore} from 'vuex'
const store = createStore({
	modules: {
		user,
		theme
	}
})
// #endif

export default store