export default {
	data() {
		return {
			onlineControl: {
				share_img: '',
				share_title: '',
				title: ''
			},
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
			let fullPath = this.$scope.$page.fullPath
			let login = `poster=${uni.getStorageSync('poster')}`
			let query = ''
			if(fullPath.includes('?')) {
				query = fullPath.split('?')[1] + '&' + login
			} else {
				query = login
			}
			console.log(query)
			return query
		},
		getPath() {
			let fullPath = this.$scope.$page.fullPath
			let login = `poster=${uni.getStorageSync('poster')}`
			if (fullPath.includes('?')) {
				login = '&' + login
			} else {
				login = '?' + login
			}
			console.log(fullPath + login)
			return fullPath + login
		},
		// getShareTitle() {
		// 	let title = uni.getStorageSync('home').title || '旺铺'
		// 	return `${title} - ${this.onlineControl.pageName}`
		// }
	}
}
