<template>
	<view class="pageTurning" id="pageTurning" :style="{ height: height }" @touchstart="pageTouchstart" @touchmove="pageTouchmove" @touchend="pageTouchend">
		<!-- <view class="page-item">
			<view class="page-item-left" :style="{ backgroundImage: 'url(' + imgData[imgData.length - 1].imgSrc + ')', width: domWidth / 2 + 'px' }"></view>
			<view class="page-item-right" :style="{ backgroundImage: 'url(' + imgData[imgData.length - 1].imgSrc + ')', width: domWidth / 2 + 'px' }"></view>
		</view> -->
		<view class="page-bg">
			<view class="page-item-prev-bg"
				:style="{
					backgroundImage: 'url(' + imgData[nowIndex - 1 < 0 ? imgData.length - 1 : nowIndex - 1].imgSrc + ')',
				}"
			></view>
			<view class="page-item-next-bg"
				:style="{
					backgroundImage: 'url(' + imgData[nowIndex + 1 > imgData.length - 1 ? 0 : nowIndex + 1].imgSrc + ')',
				}"
			></view>
		</view>
		<view class="page-item" v-for="(item, index) in imgData" :key="index">
			<template v-if="index == nowIndex">
				<view
					class="page-item-left"
					:style="{
						backgroundImage: 'url(' + imgData[nowIndex].imgSrc + ')',
						width: imgData[nowIndex].leftWidth + 'px'
					}"
				>
					
					<view
						class="rollLeft"
						:style="{
							width: imgData[nowIndex].moveLeftX + 'px',
							backgroundImage: 'url(' + imgData[nowIndex - 1 < 0 ? imgData.length - 1 : nowIndex - 1].imgSrc + ')',
							backgroundSize: domWidth + 'px 100%',
							backgroundPosition: imgData[nowIndex].moveLeftX + 'px 0%'
						}"
					></view>
				</view>
				
				<view class="page-item-right" 
					:style="{ 
						backgroundImage: 'url(' + imgData[nowIndex].imgSrc + ')', 
						width: imgData[nowIndex].rightWidth + 'px' 
					}">
					<view
						class="rollRight"
						:style="{
							width: imgData[nowIndex].moveRightX + 'px',
							backgroundImage: 'url(' + imgData[nowIndex + 1 > imgData.length - 1 ? 0 : nowIndex + 1].imgSrc + ')',
							backgroundSize: domWidth + 'px 100%'
						}"
					></view>
				</view>
			</template>
			
		</view>
	</view>
</template>

<script>
let self;
export default {
	data() {
		self = this;
		return {
			imgData: [],
			domWidth: null,
			dowLeft: null,
			nowIndex: 0,
			startClienX: 0,
			animating: false,
			timgerId: null // 定时器
		};
	},
	created() {
		self.imgData = self.imgList;
		// self.nowIndex = self.imgData.length - 1;
		if (self.autoplay) {
			// 开启自动翻页
			self.creatTimer();
		}
	},
	watch: {
		imgList: { 
			handler(n) {
				console.log(n)
				self.imgData = uni.$u.deepClone(self.imgList);
				// self.nowIndex = self.imgData.length - 1;
				if (self.autoplay) {
					// 开启自动翻页
					self.creatTimer();
				}
				self.initData();
			}
		}
	},
	destroyed() {
		self.deleteTimer();
	},
	mounted() {
		let view = uni
			.createSelectorQuery()
			.in(this)
			.select('#pageTurning');
		view.boundingClientRect(data => {
			if (data) {
				self.domWidth = data.width;
				self.dowLeft = Math.floor(data.left);
				self.initData();
			}
		}).exec();
	},
	props: {
		height: {
			type: String,
			default: '500rpx'
		},
		imgList: {
			type: Array
		},
		xunhuan: {
			type: Boolean,
			default: true
		},
		autoplay: {
			type: Boolean,
			default: false
		},
		interval: {
			type: Number,
			default: 5000
		}
	},
	methods: {
		/*
		 * cs 2020-9-17
		 * 创建定时器
		 */
		creatTimer() {
			clearInterval(self.timgerId);
			self.timgerId = setInterval(function() {
				self.nextPage();
			}, self.interval);
		},
		deleteTimer() {
			clearInterval(self.timgerId);
			self.timgerId = null;
		},
		initData() {
			if(self.imgData.length == 0) return
			self.imgData.forEach((item, index) => {
				item.rightWidth = self.domWidth / 2;
				item.leftWidth = self.domWidth / 2;
				item.moveLeftX = 0;
				item.moveRightX = 0;
				item.zindex = self.imgData.length - index;
			});
			self.$nextTick(function() {
				self.$set(self.imgData, self.imgData.length - 1, self.imgData[self.imgData.length - 1]);
			});
		},
		checkXunhuan(movex) {
			if(!this.xunhuan) {
				if(this.nowIndex == 0 && movex < 0) {
					uni.showToast({
						title: '已经是第一页了',
						icon: 'none'
					})
					return false
				}
				if(this.nowIndex == this.imgData.length - 1 && movex > 0) {
					uni.showToast({
						title: '已经是最后一页了',
						icon: 'none'
					})
					return false
				}
			}
			return true
		},
		pageTouchstart(e) {
			
			// 点击时清除定时器
			self.deleteTimer();
			
			self.startClienX = e.touches[0].clientX;
		},
		pageTouchmove(e) {
			let moveX = self.startClienX - e.touches[0].clientX;
			if (moveX > self.domWidth / 2) {
				moveX = self.domWidth / 2;
			}

			if (moveX < -self.domWidth / 2) {
				moveX = -self.domWidth / 2;
			}
			if (!this.checkXunhuan(moveX)) return

			if (moveX >= 0 && self.startClienX - self.dowLeft >= self.domWidth / 2) {
				// next
				self.imgData[self.nowIndex].rightWidth = Math.floor(self.domWidth / 2 - Math.abs(moveX));
				self.imgData[self.nowIndex].moveRightX = Math.abs(moveX);
			} else if (moveX < 0 && self.startClienX - self.dowLeft < self.domWidth / 2) {
				self.imgData[self.nowIndex].leftWidth = Math.floor(self.domWidth / 2 - Math.abs(moveX));
				self.imgData[self.nowIndex].moveLeftX = Math.abs(moveX);
			}
			self.$nextTick(function() {
				self.$set(self.imgData, self.nowIndex, self.imgData[self.nowIndex]);
			});
		},
		async pageTouchend(e) {
			let moveX = self.startClienX - e.changedTouches[0].clientX;
			if(moveX == 0) return 
			if (!self.checkXunhuan(moveX)) return
			if (Math.abs(moveX) >= (self.domWidth / 2) * 0.7) {
				console.log(moveX)
				await uni.$u.sleep(200)
				self.imgData[self.nowIndex].leftWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveLeftX = 0;
				self.imgData[self.nowIndex].rightWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveRightX = 0;
				if(moveX > 0) {
					// self.imgData.forEach((item, index) => {
					// 	 item.zindex++ 
					// });
					// self.imgData[self.nowIndex].zindex = 0;
					self.nowIndex++;
					if (self.nowIndex > self.imgData.length - 1) {
						self.nowIndex = 0;
					}
				}else {
					// self.imgData.forEach((item, index) => {
					// 	 item.zindex-- 
					// });
					// self.imgData[self.nowIndex].zindex = 0;
					self.nowIndex--;
					if (self.nowIndex < 0) {
						self.nowIndex = self.imgData.length - 1;
					}
					
				}
				self.$emit('getCurrent', {current: self.nowIndex+1})
				

				// this.fanye(moveX)
			} else {
				console.log(2)
				self.imgData[self.nowIndex].leftWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveLeftX = 0;
				self.imgData[self.nowIndex].rightWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveRightX = 0;
			}

			self.$nextTick(function() {
				self.$set(self.imgData, self.imgData.length - 1, self.imgData[self.imgData.length - 1]);
			});

			if (self.autoplay) {
				// 开启自动翻页
				self.creatTimer();
			}
		},
		nextPage() {
			if (!self.checkXunhuan(1)) return
			self.imgData[self.nowIndex].rightWidth = 0;
			self.imgData[self.nowIndex].moveRightX = self.domWidth / 2;
			self.$nextTick(function() {
				self.$set(self.imgData, self.nowIndex, self.imgData[self.nowIndex]);
			});
			setTimeout(function() {
				self.imgData[self.nowIndex].rightWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveRightX = 0;

				// self.imgData.forEach((item, index) => {
				// 	item.zindex++;
				// 	if (item.zindex > self.imgData.length - 1) {
				// 		item.zindex = 0;
				// 	}
				// });
				
				self.nowIndex++;
				if (self.nowIndex > self.imgData.length - 1) {
					self.nowIndex = 0;
				}
				self.$emit('getCurrent', {current: self.nowIndex+1})

				self.$nextTick(function() {
					self.$set(self.imgData, self.imgData.length - 1, self.imgData[self.imgData.length - 1]);
				});
			}, 300);
		},
		prePage() {
			if (!self.checkXunhuan(-1)) return
			self.imgData[self.nowIndex].leftWidth = 0;
			self.imgData[self.nowIndex].moveLeftX = self.domWidth / 2;
			self.$nextTick(function() {
				self.$set(self.imgData, self.nowIndex, self.imgData[self.nowIndex]);
			});
			setTimeout(function() {
				self.imgData[self.nowIndex].leftWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveLeftX = 0;


				self.nowIndex--;
				if (self.nowIndex < 0) {
					self.nowIndex = self.imgData.length - 1;
				}
				self.$emit('getCurrent', {current: self.nowIndex+1})

				self.$nextTick(function() {
					self.$set(self.imgData, self.imgData.length - 1, self.imgData[self.imgData.length - 1]);
				});
			}, 300);
		},
		
	}
};
</script>

<style lang="scss" scoped>
.pageTurning {
	width: 100%;
	position: relative;
	overflow: hidden;
	.page-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
	.page-item {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		.page-item-left {
			position: absolute;
			top: 0;
			right: 50%;
			height: 100%;
			background-position: 0% 0%;
			background-size: 200% 100%;
			// box-shadow: inset -10rpx -10rpx 20rpx 0 rgba(49, 49, 49, 0.2);
			transition: all 0.3s linear 0s;
		}
		.page-item-right {
			position: absolute;
			top: 0;
			left: 50%;
			height: 100%;
			background-size: 200% 100%;
			background-position: -100% 0%;
			// box-shadow: inset 10rpx 10rpx 20rpx 0 rgba(49, 49, 49, 0.2);
			transition: all 0.3s linear 0s;
		}
	}
	.rollRight {
		display: block;
		position: absolute;
		right: -5%;
		top: 0;
		height: 100%;
		background: linear-gradient(90deg, #ddd 50%, rgba(0, 0, 0, 0) 100%);
		transition: all 0.3s linear 0s;
		background-position: 0% 0%;
		z-index: 2;
		box-shadow: 5px 0 20px rgba(0,0,0,.3);
		// filter: drop-shadow(12rpx 0px 12rpx rgba(0, 0, 0, 0.5));
	}
	.rollLeft {
		display: block;
		position: absolute;
		left: -5%;
		top: 0;
		height: 100%;
		background: linear-gradient(90deg, #ddd 50%, rgba(0, 0, 0, 0) 100%);
		transition: all 0.3s linear 0s;
		z-index: 2;
		box-shadow: -5px 0 20px rgba(0,0,0,.3);
		// filter: drop-shadow(-12px 0px 12px rgba(0, 0, 0, 0.5));
	}
	.page-item-prev-bg {
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 50%;
		height: 100%;
		background: linear-gradient(90deg, #ddd 50%, rgba(0, 0, 0, 0) 100%);
		transition: all 0.3s linear 0s;
		background-position: 0 0;
		background-size: 200% 100%;
		z-index: 1;
	}
	.page-item-next-bg {
		display: block;
		position: absolute;
		right: 0%;
		top: 0;
		width: 50%;
		height: 100%;
		background: linear-gradient(90deg, #ddd 50%, rgba(0, 0, 0, 0) 100%);
		transition: all 0.3s linear 0s;
		background-position: 100% 0%;
		background-size: 200% 100%;
		z-index: 1;
	} 
}
</style>
