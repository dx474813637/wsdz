<template>
    <view>
		<uni-section 
			title="用于及时获取相关标准品的新增挂牌。勾选表示已订阅。" 
			type="circle"
			padding>
			<u-checkbox-group
			    v-model="checkboxValue1"
			    placement="column"
			    @change="checkboxChange"
				
			>
			    <u-checkbox
			        :customStyle="{marginBottom: '14px'}"
			        v-for="(item, index) in checkboxList1"
			        :key="index"
			        :label="item.name"
			        :name="item.name"
					size="18px"
					labelSize="17px"
			    >
			    </u-checkbox>
			</u-checkbox-group>
		</uni-section>
		<view class="u-p-20">
			<u-button type="primary">提交</u-button>
		</view>
        
    </view>
</template>
<script>
	import uniSection from '@/pages/my/components/uni-section/uni-section.vue'
	export default {
		data() {
			return {
				checkboxValue1:[],
				// 基本案列数据
				checkboxList1: [{
						name: '苹果',
						disabled: false
					},
					{
						name: '香蕉',
						disabled: false
					},
					{
						name: '橙子',
						disabled: false
					}
				],
			}

		},
		components: {
			uniSection
		},
		methods: {
			checkboxChange(n) {
				console.log('change', n);
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
