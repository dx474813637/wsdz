<template>
	<view class="card-w"
		:class="{
			'isMe': msg.isMe == 1
		}"
	>
		<view class="chat-time u-text-center u-p-20 u-font-28" :style="{
			color: themeConfig.msg.detail.timeColor
		}"
			v-if="msg.showTime == 1"
		>{{msg.time | date2timestamp | timeFrom}}</view>
		<view class=" u-flex"
			:class="{
				'u-flex-x-reverse': msg.isMe == 1
			}">
			<view class="item item-avatar u-flex u-flex-center">
				<u-image 
					:src="msg.avatar" 
					radius="5"
					width="35" 
					height="35"
				 ></u-image>
			</view>
			<view class="item item-info u-p-15 u-p-l-20 u-p-r-20 "
					:style="{
						color: msg.isMe == 1 ? themeConfig.msg.detail.contentBg1 : themeConfig.msg.detail.contentBg2,
						background: msg.isMe == 1 ? themeConfig.msg.detail.contentBg1: themeConfig.msg.detail.contentBg2
					}">
				<rich-text 
					:nodes="msg.content"
					class="u-font-28"
					:style="{
						color: themeConfig.msg.detail.contentColor
					}"
				></rich-text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name: 'MsgChatCard',
		props: {
			msg: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig'
			}),
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.pos {
		position: relative;
	}
	.card-w {
		width: 100%;
		box-sizing: border-box;
		&.isMe {
			.item-info {
				&:after {
					right: -5px;
					border-left: 5px solid ;
					border-right: 0;
				}
			}
		}
		.item-avatar{
			width: 60px;
		}
		.item-avatar,
		.item-info {
			box-sizing: border-box;
		}
		.item-info {
			max-width: calc(100% - 120px);
			min-height: 35px;
			position: relative;
			color: #007aff;
			border-radius: 6px;
			&:after {
				content: '';
				position: absolute;
				width: 0;
				height: 0;
				right: 100%;
				top: 12px;
				border-right: 5px solid ;
				border-top: 5px solid transparent;
				border-bottom: 5px solid transparent;
				border-left: 0;
			}
			
		}
	}
	.new-label {
		white-space: nowrap;
	}
</style>
