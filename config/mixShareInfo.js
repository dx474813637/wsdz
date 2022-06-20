export default {
	data() {
		return {
			onlineControl: {
				share_img: '',
				share_title: '',
				title: '',
			},
			customShareParams: {}
		}
	},
	async onLoad(options) {
		if(options && options.poster) {
			this.$http.setToken({
				poster: options.poster
			})
		}
	},
	onShareTimeline(){
		return{
			title: this.onlineControl.share_title,
			query: this.getQuery(),
			imageUrl: this.onlineControl.share_img
		}
	},
	onShareAppMessage(res) {
		return {
			title: this.onlineControl.share_title,
			path: this.getPath(),
			imageUrl: this.onlineControl.share_img
		};
	},
	methods: {
		setOnlineControl(res) {
			this.onlineControl.share_img = res.share_img
			if(res.share_title) this.onlineControl.share_title = res.share_title
			if(res.title) this.onlineControl.title = res.title
			if(res.title) {
				uni.setNavigationBarTitle({
					title: res.title 
				})
			}
		},
		getQuery() {
			let options = {
				...this.$scope.options,
				...this.customShareParams,
				poster: uni.getStorageSync('poster')
			}
			let query = ''
			query += Object.keys(options).map(ele => {
				return `${ele}=${options[ele]}`
			}).join('&')
			console.log(query)
			return {
				query
			}
		},
		getPath() {
			
			let basePath = this.$scope.route
			let options = {
				...this.$scope.options,
				...this.customShareParams,
				poster: uni.getStorageSync('poster')
			}
			let query = `/${basePath}?`
			query += Object.keys(options).map(ele => {
				return `${ele}=${options[ele]}`
			}).join('&')
			console.log(query)
			return query
		},
		// getShareTitle() {
		// 	let title = uni.getStorageSync('home').title || '旺铺'
		// 	return `${title} - ${this.onlineControl.pageName}`
		// }
	}
}
