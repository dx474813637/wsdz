<template>
	<view class="els-container">
		<u-form-item
			:label="el.name"
			:prop="el.parameter_name"
			:ref="el.parameter_name"
			:required="el.required == '1' ? true : false"
		>
			<view class="">
				<template v-if="el.type == 'text'">
					<u-input 
						v-model="idata[el.parameter_name]"
						:placeholder="`请输入${el.placeholder || el.name}`"
						:maxlength="el.max || -1"
						:type="el.type || 'text'"
						:disabled="el.disabled || isView || el.hidden" 
						@change="handleInput"
						clearable 
					></u-input>
				</template>
				<template v-else-if="el.type == 'text-area'">
					<u--textarea 
						v-model="idata[el.parameter_name]"
						:placeholder="`请输入${el.placeholder || el.name}`"
						:height="el.height || '70'"
						:disabled="el.disabled || isView || el.hidden"
						:count="el.count"
						:autoHeight="el.autoHeight" 
					></u--textarea>
				</template>
				<template v-else-if="el.type == 'select'">
					<view @click="picker_show = true">
						<u-input
							v-model="idata[el.parameter_name]"
							:placeholder="`请选择${el.placeholder || el.name}`"
							type="text"
							readonly  
						></u-input>
					</view>
				</template>
				
				<template v-if="el.remark">
					<u--text type="info" :text="el.remark"></u--text>
				</template>
				
			</view>
			
		</u-form-item>
		
		
		
		<u-picker 
			v-if="el.type == 'select'"
			closeOnClickOverlay
			:show="picker_show" 
			:columns="picker_columns"
			@close="picker_show = false"
			@cancel="picker_show = false"
			@confirm="pickerConfirm"
		></u-picker>
	</view>
</template>
<script>
	export default {
		name: "diy-form-items",
		props: {
			el: {
				type: Object,
				default: () => {}
			},
			idata: {
				type: Object,
				default: () => {}
			},
			isView: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				picker_show: false,
				picker_columns: [[]]
			}
		},
		watch: {
			['el.type']: {
				handler:(type) => {
					if(type == 'select') {
						this.picker_columns = [this.el.value1]
					}
				},
				immediate: true
			}
		},
		computed: {
			disabled(){ 
				return this.isView || this.el.disabled || this.el.hidden;
			}
		},
		created() {
			
		},
		mounted() {
			
		},
		methods: {
			showIcon(data, item) {
				return (
					(data.icon || data.url) &&
					item.options &&
					typeof item.options[0] == "object" &&
					(item.options[0].url || item.options[0].icon)
				)
			},
			pickerConfirm(e) {
				console.log(e)
				this.picker_show = false
			},
			handleInput(e) {
				this.$emit('change', { res: e, el: this.el })
			}
		}
	};
</script> 
<style scoped lang="scss">
</style>