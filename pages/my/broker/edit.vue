<template>
	<view class="">
		<u-notice-bar text="请真实发布！若因信息不实而被投诉，将进入黑名单。"></u-notice-bar>
		<view class="u-p-20 u-p-l-40 u-p-r-40">
			<u--form
				labelPosition="left"
				:model="model"
				ref="from"
				labelWidth="80"
				>
				
					<u-form-item
						label="商品"
						prop="standard"
						ref="standard"
						required
					>
						<view @click="show = true">
							<u-input
								:value="product"
								placeholder="点击选择商品" 
								readonly
							>
								<template slot="suffix">
									<view class="">
										<i class="custom-icon-unfold custom-icon"></i>
									</view>	
								</template>
							</u-input>
						</view>
						
					</u-form-item>
					<u-form-item
						label=" "
						v-if="prodInfo.length > 0 || prodInfoLoading"
					>
						<template v-if="prodInfoLoading">
							<u-loading-icon></u-loading-icon>
						</template>
						
						<text v-else class="text-base">{{prodInfo}}</text>
					</u-form-item>
					<u-form-item
						label="标题"
						prop="name"
						ref="name"
						required
					>
						<u--input
							v-model="model.name"
							clearable
						></u--input>
					</u-form-item>
					
					<u-form-item
						label="数量"
						prop="amount"
						ref="amount"
						required
					>
						<view class="u-flex u-flex-items-center">
							<view class="u-flex-1">
								<u--input
									v-model="model.amount"
									clearable
									type="digit"
								></u--input>
							</view>
							<view class="u-p-l-30 u-p-r-30" v-if="prodUnit">{{prodUnit}}</view>
						</view>
						
					</u-form-item>
					<u-form-item
						label="现货类型"
						prop="trade_type"
						ref="trade_type"
					>
						 <u-radio-group
						    v-model="model.trade_type"
						    placement="row"
						  >
						    <u-radio
						      :customStyle="{marginRight: '8px'}"
						      v-for="(item, index) in radiolist_trade_type"
						      :key="item.value"
						      :label="item.name"
						      :name="item.value"
						    >
						    </u-radio>
						  </u-radio-group>
					</u-form-item>
					
					<u-form-item
						label="订单类型"
						prop="order_type"
						ref="order_type"
						v-if="model.trade_type == '2'"
					>
						 <u-radio-group
						    v-model="model.order_type"
						    placement="row"
						  >
						    <u-radio
						      :customStyle="{marginRight: '8px'}"
						      v-for="(item, index) in radiolist_order_type"
						      :key="item.value"
							  :disabled="item.disabled"
						      :label="item.name"
						      :name="item.value"
						    >
						    </u-radio>
						  </u-radio-group>
					</u-form-item>
					
					
					
					<u-form-item
						label="交易类型"
						prop="trade_mode"
						ref="trade_mode"
						v-if="pan == 's' && model.trade_type == '2'"
					>
						 <u-radio-group
						    v-model="model.trade_mode"
						    placement="row"
						  >
						    <u-radio
						      :customStyle="{marginRight: '8px'}"
						      v-for="(item, index) in radiolist_trade_mode_filter"
						      :key="item.value"
							  :disabled="item.disabled"
						      :label="item.name"
						      :name="item.value"
						    >
						    </u-radio>
						  </u-radio-group>
					</u-form-item>
					<!-- 竞拍 start -->
					<template v-if="model.trade_mode == '1' && pan == 's'">
						<u-form-item
							label="竞拍方式"
							prop="bid_is_part"
							ref="bid_is_part" 
							required
						>
							<u-radio-group
							   v-model="model.bid_is_part"
							   placement="row"
							>
							    <u-radio
									:customStyle="{marginRight: '8px'}"
									v-for="(item, index) in radiolist_bid_is_part"
									:key="item.value"
									:disabled="item.disabled"
									:label="item.name"
									:name="item.value"
							    >
							    </u-radio>
							 </u-radio-group>
						</u-form-item>
						<template v-if="model.bid_is_part == '1'">
							<u-form-item
								label="每手尺寸"
								prop="bid_step_amount"
								ref="bid_step_amount" 
								required
							>
								<u--input
									v-model="model.bid_step_amount"
									clearable 
								></u--input>
							</u-form-item>
							<u-form-item
								label="至少下单"
								prop="bid_min_amount"
								ref="bid_min_amount" 
								required
							>
								<view class="u-flex u-flex-items-center">
									<view class="u-flex-1">
										<u--input
											v-model="model.bid_min_amount"
											clearable 
										></u--input>
									</view>
									<view class="u-p-l-20">手</view>
								</view>
							</u-form-item>
						</template>
						
						<u-form-item
							label="起拍价"
							prop="price"
							ref="price" 
							required
						>
							<view class="u-flex u-flex-items-center">
								<view class="u-flex-1">
									<u--input
										v-model="model.price"
										clearable
										type="digit"
									></u--input>
								</view>
								<view class="u-p-l-20">元</view>
							</view>
						</u-form-item>
						<u-form-item
							label="保留价"
							prop="bid_re_price"
							ref="bid_re_price" 
							required
						>
							<view class="u-flex u-flex-items-center">
								<view class="u-flex-1">
									<u--input
										v-model="model.bid_re_price"
										clearable
										type="digit"
									></u--input>
								</view>
								<view class="u-p-l-20">元</view>
							</view>
						</u-form-item>
						<u-form-item
							label="加价幅度"
							prop="bid_step"
							ref="bid_step" 
							required
						>
							<view class="u-flex u-flex-items-center">
								<view class="u-flex-1">
									<u--input
										v-model="model.bid_step"
										clearable
										type="digit"
									></u--input>
								</view>
								<view class="u-p-l-20">元</view>
							</view> 
						</u-form-item>
						<u-form-item
							label="多次竞拍"
							prop="bid_is_repeat"
							ref="bid_is_repeat" 
							required
							v-if="model.bid_is_part == 1"
						>
							<view class="u-flex u-flex-items-center u-flex-start ">
								<view class="u-info u-p-r-20 u-font-28" :class="{
									'text-primary': model.bid_is_repeat == '0'
								}">否</view>
								<u-switch v-model="model.bid_is_repeat" activeValue="1" inactiveValue="0" ></u-switch>
								<view class="u-info u-p-l-20 u-font-28" :class="{
									'text-primary': model.bid_is_repeat == '1'
								}">是</view>
							</view>
						</u-form-item>
						<u-form-item
							label="开始时间"
							prop="bid_bdate"
							ref="bid_bdate" 
							required
						>
							<view class="u-flex u-flex-items-center">
								<view class="u-flex-1" @click="showStartDate = true">
									<u--input
										:value="model.bid_bdate || '请选择'"
										readonly 
										suffixIcon="calendar"
									></u--input>
								</view> 
								<view class="u-flex u-flex-items-center u-p-l-20" style="flex: 0 0 80px">
									<view @click="showStartTime = true ">
										<u--input
											:value="model.bid_btime"
											readonly 
											suffixIcon="clock"
										></u--input>
									</view>
									<!-- <view class="u-p-l-10">时</view> -->
								</view> 
							</view> 
						</u-form-item>
						<u-datetime-picker
							title="开始日期"
							:show="showStartDate"
							v-model="model.bid_btimestamp"
							mode="date"
							closeOnClickOverlay 
							@close="showStartDate = false"
							@cancel="showStartDate = false"
							@confirm="confirmStartDate"
						></u-datetime-picker>
						<u-picker
							title="开始时间"
							closeOnClickOverlay
							:show="showStartTime" 
							:columns="hoursList"
							keyName="label"
							@confirm="confirmStartTime" 
							@close="showStartTime = false"
							@cancel="showStartTime = false"
						></u-picker>
						<u-form-item
							label="结束时间"
							prop="bid_edate"
							ref="bid_edate" 
							required
							v-if="model.bid_bdate"
						>
							<view class="u-flex u-flex-items-center">
								<view class="u-flex-1" @click="showEndDate = true">
									<u--input
										:value="model.bid_edate || '请选择'"
										readonly 
										suffixIcon="calendar"
									></u--input>
								</view> 
								<view class="u-flex u-flex-items-center u-p-l-20" style="flex: 0 0 80px">
									<view @click="showEndTime = true">
										<u--input
											:value="model.bid_etime"
											readonly 
											suffixIcon="clock"
										></u--input>
									</view>
									<!-- <view class="u-p-l-10">时</view> -->
								</view> 
							</view>
						</u-form-item>
						<u-datetime-picker
							title="结束日期"
							:show="showEndDate"
							v-model="model.bid_etimestamp"
							mode="date"
							closeOnClickOverlay 
							@close="showEndDate = false"
							@cancel="showEndDate = false"
							@confirm="confirmEndDate"
						></u-datetime-picker>
						<u-picker
							title="结束时间"
							closeOnClickOverlay
							:show="showEndTime" 
							:columns="hoursList"
							keyName="label"
							@confirm="confirmEndTime" 
							@close="showEndTime = false"
							@cancel="showEndTime = false"
						></u-picker>
						<u-form-item
							label="匿名竞拍"
							prop="bid_is_anonym"
							ref="bid_is_anonym" 
							required
						>
							<view class="u-flex u-flex-items-center u-flex-start ">
								<view class="u-info u-p-r-20 u-font-28" :class="{
									'text-primary': model.bid_is_anonym == '0'
								}">否</view>
								<u-switch v-model="model.bid_is_anonym" activeValue="1" inactiveValue="0" ></u-switch>
								<view class="u-info u-p-l-20 u-font-28" :class="{
									'text-primary': model.bid_is_anonym == '1'
								}">是</view>
							</view>
						</u-form-item>
						<u-form-item
							label="是否暗标"
							prop="bid_is_darkmark"
							ref="bid_is_darkmark" 
							required
						>
							<view class="u-flex u-flex-items-center u-flex-start ">
								<view class="u-info u-p-r-20 u-font-28" :class="{
									'text-primary': model.bid_is_darkmark == '0'
								}">否</view>
								<u-switch v-model="model.bid_is_darkmark" activeValue="1" inactiveValue="0" ></u-switch>
								<view class="u-info u-p-l-20 u-font-28" :class="{
									'text-primary': model.bid_is_darkmark == '1'
								}">是</view>
							</view>
						</u-form-item>
					</template>
					<!-- 竞拍 end -->
					
					<u-form-item
						label="交收期"
						prop="settle_month"
						ref="settle_month"
						required
						v-if="model.trade_type == 1"
					>
						<view class="u-flex u-flex-items-center">
							<view @click="showSettleMonth = true" class="u-flex-2">
								<u--input
									:value="model.settle_month_label"
									suffixIcon="arrow-down"
									placeholder="月份" 
									readonly
								></u--input>
							</view>
							
							<view @click="showSettleDate = true" class="u-flex-1 u-p-l-20">
								<u--input
									:value="model.settle_date_label"
									suffixIcon="arrow-down"
									placeholder="旬" 
									readonly
								></u--input>
							</view>
						</view>
					</u-form-item>
					<u-picker
						closeOnClickOverlay
						:show="showSettleMonth" 
						:columns="settleMonth"
						@confirm="confirmSettleMonth"
						keyName="label"
						@close="showSettleMonth = false"
						@cancel="showSettleMonth = false"
					></u-picker>
					<u-picker
						closeOnClickOverlay
						:show="showSettleDate" 
						:columns="settleDate"
						@confirm="confirmSettleDate"
						keyName="label"
						@close="showSettleDate = false"
						@cancel="showSettleDate = false"
					></u-picker>
					
					<u-form-item
						:label="priceStr"
						prop="price"
						ref="price"
						v-if="model.trade_mode != '1'"
						required 
					>
						<u--input
							v-model="model.price"
							clearable
							type="digit"
						></u--input>
					</u-form-item>
					<u-form-item label=" " v-if="model.trade_mode == '0'">
						<view class="text-base">填0表示点价，请说明点价规则</view>
					</u-form-item>
					<u-form-item
						v-if="model.price.length != 0 && model.price == 0 && model.trade_mode == '0'"
						label="点价规则"
						prop="dprice"
						ref="dprice"
					>
						<u--input
							v-model="model.dprice"
							clearable
						></u--input>
					</u-form-item>
					
					<u-form-item
						v-if="pan == 'b'"
						label="主规格"
						prop="spec"
						ref="spec"
						required
					>
						<u--textarea
							v-model="model.spec" 
							placeholder="主规格" 
							height="90"
						></u--textarea>
					</u-form-item>
					<u-form-item
						label="有效时间"
						prop="express_time"
						ref="express_time"
						required
						v-if="model.trade_mode != '1'"
					>
						<view class="u-flex u-flex-items-center">
							<view class="u-flex-2">
								<u--input
									v-model="model.express_time"
									clearable
									type="number"
								></u--input>
							</view>
							
							<view @click="showExpressUnit = true" class="u-flex-1 u-p-l-20">
								<u--input
									:value="model.express_unit_label"
									suffixIcon="arrow-down"
									readonly
									clearable
								></u--input>
							</view>
						</view>
					</u-form-item>
					<u-picker 
						closeOnClickOverlay
						:show="showExpressUnit" 
						:columns="expressUnit"
						keyName="label"
						@confirm="confirmExpressUnit"
						@close="showExpressUnit = false"
						@cancel="showExpressUnit = false"
					></u-picker>
					
					<u-form-item
						label="交收方式"
						prop="settle_mode"
						ref="settle_mode"
					>
						 <u-radio-group
						    v-model="model.settle_mode"
						    placement="row"
						  >
						    <u-radio
						      :customStyle="{marginRight: '8px'}"
						      v-for="(item, index) in radiolist_settle_mode_filter"
						      :key="item.value"
						      :label="item.name"
						      :disabled="item.disabled"
						      :name="item.value"
						    >
						    </u-radio>
						  </u-radio-group>
					</u-form-item>
					<u-form-item
						:label="tradeType2Label[0]"
						prop="delivery_place"
						ref="delivery_place"
						required
					>
						<uni-data-picker 
							placeholder="请选择区域" 
							popup-title="请选择区域" 
							:localdata="addressArea" 
							v-model="model.delivery_place"
							@change="onchange" 
							@nodeclick="onnodeclick" 
							@popupopened="onpopupopened" 
							@popupclosed="onpopupclosed"
						></uni-data-picker>
					</u-form-item>
					
					<u-form-item
						:label="tradeType2Label[1]"
					>
						<u--textarea
							v-model="model.delivery_address" 
							:placeholder="tradeType2Label[1]" 
							height="60"
						></u--textarea>
					</u-form-item>
					<u-form-item
						label="图片"
						v-if="pan == 's'"
					>
						<view>
							<u-upload
								:fileList="fileList1"
								@afterRead="afterRead"
								@delete="deletePic"
								name="1"
								width="75"
								height="75"
								multiple 
								:maxCount="picMaxCount"
								:maxSize="2048000"
								@oversize="handleoversize"
							></u-upload>
							<view class="u-info u-font-28">建议上传2M以内的图片</view>
						</view>
						
					</u-form-item>
					<template v-if="auth == 1 && model.trade_mode != '1'">
						<u-form-item
							label="报盘企业"
							prop="customer_id"
							ref="customer_id"
							
						>
							<u-input
								:value="model.customer_name"
								@input="handleName"
								placeholder="点击选择报盘企业" 
							>
								<template slot="suffix">
									<view class="" @click="show2 = true">
										<i class="custom-icon-unfold custom-icon"></i>
									</view>	
								</template>
							</u-input>
						</u-form-item>
						<u-form-item
							label="企业角色"
							prop="mdu"
							ref="mdu"
						>
							 <u-radio-group
							    v-model="model.mdu"
							    placement="row"
							  >
							    <u-radio
							      :customStyle="{marginRight: '8px'}"
							      v-for="(item, index) in radiolist_mdu_filter"
							      :key="item.value"
							      :label="item.name"
							      :name="item.value"
							    >
							    </u-radio>
							  </u-radio-group>
						</u-form-item>
						<u-form-item
							label="报盘类型"
							prop="post_type"
							ref="post_type"
						>
							 <u-radio-group
							    v-model="model.post_type"
							    placement="row"
							  >
							    <u-radio
							      :customStyle="{marginRight: '8px'}"
							      v-for="(item, index) in radiolist_post_type"
							      :key="item.value"
							      :label="item.name"
							      :name="item.value"
							    >
							    </u-radio>
							  </u-radio-group>
						</u-form-item>
					</template>
					<template v-if="myCpy.hasOwnProperty('Broker')">
						<u-form-item
							label="撮合员"
						>
							<view class="u-flex u-flex-items-center u-font-32">
								<text>{{myCpy.Broker.contact}} ({{myCpy.Broker.mobile}})</text>
								<i @click="handleGoto({
										url: '/pages/my/msg/msgDetail',
										params: {
											login: myCpy.Broker.login,
											content: ``
										}
									})" class="text-primary u-m-l-10 custom-icon-tims custom-icon u-font-28"></i>
							</view>
						</u-form-item>
						<u-form-item
							label="委托撮合"
							v-if="model.trade_mode != '1'"
						>
							<u-checkbox-group 
							    v-model="checkbox_broker_login"
								@change="checkboxChange">
								<view style="width: 100%;">
									<u-checkbox :name="myCpy.Broker.login" label="委托客户经理撮合，同时报盘中显示撮合员的联系方式。"></u-checkbox>
								</view>
								
							</u-checkbox-group>
						</u-form-item>
					</template>
					
					<u-form-item
						label="详细需求"
						prop="intro"
						ref="intro"
						v-if="pan == 'b'"
					>
						<u--textarea
							v-model="model.intro" 
							placeholder="详细需求" 
							height="90"
						></u--textarea>
					</u-form-item>
					
					<u-form-item
						label="备注"
						prop="remark"
						ref="remark"
						v-if="pan == 's'"
					>
						<u--textarea
							v-model="model.remark" 
							placeholder="备注" 
							height="90"
						></u--textarea>
					</u-form-item>
			</u--form>
			
			<menusPopup 
				:show="show" 
				theme="white"
				:isMyProduct="true"
				:pan="pan"
				showMode="list"
				@close="show = false"
				@confirm="menusConfirm1"
			></menusPopup>
			
			<menusPopup 
				:show="show2" 
				theme="white"
				:isMyAllCpy="true"
				showMode="list"
				@close="show2 = false"
				@confirm="menusConfirm2"
			></menusPopup>
		</view>
		<view class="u-p-t-20 u-p-l-40 u-p-r-40 u-m-b-40">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
		
	</view>
</template>

<script>
	const INIT_START_TIME = new Date().getTime()+3600*24*1000;
	const INIT_END_TIME = INIT_START_TIME + 3600*1000;
	import {mapState, mapMutations, mapActions} from "vuex"
	// import uniSection from '@/pages/my/components/uni-section/uni-section'
	export default {
		data() {
			return {
				pid: '',
				pan: 'b',
				picMaxCount: 5,
				cpy: '',
				product: '',
				prodInfo: '',
				prodUnit: '',
				prodInfoLoading: false,
				model: {
					product_id: '',
					name: '',
					order_type: '2',
					trade_type: '2',
					trade_mode: '0',
					settle_month_label: '',
					settle_month: '',
					settle_date_label: '',
					settle_date: '',
					spec: '',
					price: '',
					dprice: '',
					amount: '',
					express_time: '',
					express_unit_label: '天',
					express_unit: 'd',
					delivery_place: '',
					delivery_address: '',
					broker_login: '',
					customer_id: '',
					customer_name: '',
					mdu: 'D',
					post_type: '0',
					intro: '',
					settle_mode: '',
					remark: '',
					pics: [],
					bid_is_part: '1',
					bid_step_amount: '',
					bid_min_amount: '',
					bid_re_price: '',
					bid_step: '',
					bid_is_repeat: '0',
					bid_btimestamp: INIT_START_TIME ,
					bid_bdate: '',
					bid_btime: '0',
					bid_etimestamp: INIT_END_TIME,
					bid_edate: '',
					bid_etime: '0',
					bid_is_anonym: '0',
					bid_is_darkmark: '0',
				},
				fileList1: [],
				radiolist_order_type: [
					{
						name: '线上支付',
						disabled: false,
						value: "1"
					},
					{
						name: '线下支付',
						disabled: false,
						value: "2"
					},
				],
				radiolist_trade_type: [
					{
						name: '合约现货',
						disabled: false,
						value: "1"
					},
					{
						name: '即期现货',
						disabled: false,
						value: "2"
					},
				],
				radiolist_trade_mode: [
					{
						name: '议价交易',
						disabled: false,
						value: "0"
					},
					{
						name: '竞拍交易',
						disabled: false,
						value: "1"
					},
					{
						name: '一口价',
						disabled: false,
						value: "2"
					},
				],
				radiolist_bid_is_part: [
					{
						name: '按手竞拍',
						disabled: false,
						value: "1"
					},
					{
						name: '总量竞拍',
						disabled: false,
						value: "2"
					}, 
				],
				radiolist_mdu: [
					{
						name: '生产商',
						disabled: false,
						show: 's',
						value: "M"
					},
					{
						name: '经销商',
						disabled: false,
						show: 'bs',
						value: "D"
					},
					{
						name: '下游用户',
						disabled: false,
						show: 'b',
						value: "U"
					},
				],
				radiolist_post_type: [
					{
						name: '替报',
						disabled: false,
						value: "1"
					},
					{
						name: '自报',
						disabled: false,
						value: "0"
					},
				],
				radiolist_settle_mode: [
					{
						name: '卖家送货',
						disabled: false,
						show: 'bs',
						value: "S"
					},
					{
						name: '买家自提',
						disabled: false,
						show: 's',
						value: "B"
					},
					{
						name: '两者均可',
						disabled: false,
						show: 's',
						value: ""
					},
					{
						name: '自提或送货',
						disabled: false,
						show: 'b',
						value: ""
					},
				],
				showExpressUnit: false,
				showSettleMonth: false,
				showSettleDate: false,
				show: false,
				show2: false,
				showStartDate: false,
				showStartTime: false,
				showEndDate: false,
				showEndTime: false,
				expressUnit: [
					[{label: '天', value: 'd'}, {label: '小时', value: 'h'}]
				],
				settleMonth: [
					[
						{label: '1月', value: '1'},
						{label: '2月', value: '2'},
						{label: '3月', value: '3'},
						{label: '4月', value: '4'},
						{label: '5月', value: '5'},
						{label: '6月', value: '6'},
						{label: '7月', value: '7'},
						{label: '8月', value: '8'},
						{label: '9月', value: '9'},
						{label: '10月', value: '10'},
						{label: '11月', value: '11'},
						{label: '12月', value: '12'},
					]
				],
				hoursList: [
					[
						{label: '0时', value: '0'},
						{label: '1时', value: '1'},
						{label: '2时', value: '2'},
						{label: '3时', value: '3'},
						{label: '4时', value: '4'},
						{label: '5时', value: '5'},
						{label: '6时', value: '6'},
						{label: '7时', value: '7'},
						{label: '8时', value: '8'},
						{label: '9时', value: '9'},
						{label: '10时', value: '10'},
						{label: '11时', value: '11'},
						{label: '12时', value: '12'},
						{label: '13时', value: '13'},
						{label: '14时', value: '14'},
						{label: '15时', value: '15'},
						{label: '16时', value: '16'},
						{label: '17时', value: '17'},
						{label: '18时', value: '18'},
						{label: '19时', value: '19'},
						{label: '20时', value: '20'},
						{label: '21时', value: '21'},
						{label: '22时', value: '22'},
						{label: '23时', value: '23'},
					]
				],
				settleDate: [
					[
						{label: '上旬', value: 'ftd'},
						{label: '中旬', value: 'mtd'},
						{label: '下旬', value: 'ltd'},
					]
				],
				checkbox_broker_login:[],
				
			}
		},
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy,
				addressArea: state => state.user.addressArea,
				login: state => state.user.login,
				auth: state => state.user.auth,
				maxSize: state => state.user.maxSize,
			}),
			tradeType2Label() {
				if(this.pan == 's' ) {
					if(this.model.settle_mode == 'B') {
						return ['提货区域', '提货地址']
					}else if(this.model.settle_mode == 'S') {
						return ['发货区域', '发货地址']
					}
					return ['交货区域', '交货地址']
				}else {
					return ['收货区域', '收货地址']
					// if(this.model.settle_mode == 'S') {
					// 	return '收货区域'
					// }
				}
			},
			rules() {
				let max_express_time = this.model.trade_type == '1'? 360 : 10 
				let baseRules = {
					'product_id': {
						type: 'string',
						required: true,
						message: '请选择商品',
						trigger: ['blur', 'change']
					},
					'name': {
						type: 'string',
						required: true,
						message: '请填写名称',
						trigger: ['blur', 'change']
					},
					'price': [{
						type: 'string',
						required: true,
						message: '请填写金额',
						trigger: ['blur', 'change']
					},{
						type: 'string',
						validator: (rule, value, callback) => {
							return Number(value) >= 0
						},
						message: '请填写正确的金额',
						trigger: ['blur', 'change']
					}],
					'express_time': {
						type: 'string',
						validator: (rule, value, callback) => { 
							if(this.model.express_unit == 'd') { 
								return Number(value) > 0 && value <= max_express_time
							}else {
								return Number(value) > 0
							} 
						},
						message: this.model.express_unit == 'd' ? `请填写有效时间，当前现货类型不得超过${max_express_time}天` : '请填写有效时间',
						trigger: ['blur', 'change']
					},
					'delivery_place': {
						type: 'string',
						required: true,
						message: '请选择交货地',
						trigger: ['blur', 'change']
					},
					'amount': {
						type: 'string',
						validator: (rule, value, callback) => {
							return Number(value) > 0.01
						},
						message: '请输入大于0.01的数字',
						trigger: ['blur', 'change']
					},
					settle_month: {
						validator: (rule, value, callback) => {
							if(this.model.trade_type == 1) {
								if(value && this.model.settle_date) return true
								else return false
							}
							return true
						},
						message: '交收期不能为空',
						trigger: ['change','blur'],
					}
				}
				let bRules = {
					
					'spec': {
						type: 'string',
						required: true,
						message: '请填写主规格',
						trigger: ['blur', 'change']
					},
				}
				let sRules = {
				} 
				let jpRules = {
					'bid_step_amount': [{
						type: 'string',
						required: true,
						message: '请填写每手尺寸',
						trigger: ['blur', 'change']
					},{ 
						validator: (rule, value, callback) => {
							return Number(value)*Number(this.model.bid_min_amount) <= Number(this.model.amount)
						},
						message: '每手尺寸*至少下单必须小于等于挂牌数量',
						trigger: ['blur', 'change']
					}],
					'bid_min_amount': [{
						type: 'string',
						required: true,
						message: '请填写至少下单量',
						trigger: ['blur', 'change']
					},{
						type: 'string',
						validator: (rule, value, callback) => {
							return Number(value) >= 0
						},
						message: '请填写正确的数值',
						trigger: ['blur', 'change']
					},{ 
						validator: (rule, value, callback) => {
							return Number(value)*Number(this.model.bid_step_amount) <= Number(this.model.amount)
						},
						message: '每手尺寸*至少下单必须小于等于挂牌数量',
						trigger: ['blur', 'change']
					}],
					'bid_re_price': [{
						type: 'string',
						required: true,
						message: '请填写金额',
						trigger: ['blur', 'change']
					},{
						type: 'string',
						validator: (rule, value, callback) => {
							return Number(value) >= 0
						},
						message: '请填写正确的金额',
						trigger: ['blur', 'change']
					},{ 
						validator: (rule, value, callback) => {
							return +value >= +this.model.price
						},
						message: '保留价必须大于等于起拍价',
						trigger: ['blur', 'change']
					}],
					'bid_step': [{
						type: 'string',
						required: true,
						message: '请填写加价幅度',
						trigger: ['blur', 'change']
					},{
						type: 'string',
						validator: (rule, value, callback) => {
							return Number(value) >= 0
						},
						message: '请填写正确的数值',
						trigger: ['blur', 'change']
					}],
					'bid_bdate': [
						{
							type: 'string',
							required: true,
							message: '请填写开始日期',
							trigger: ['blur', 'change']
						}, 
						{
							validator: (rule, value, callback) => {  
								const time = (this.model.bid_btime || 0)*3600*1000;
								console.log(value)
								console.log(new Date(value.replace(/-/g, "/")).getTime(), time)
								console.log(new Date(value.replace(/-/g, "/")).getTime()+time)
								console.log(INIT_START_TIME)
								return new Date(value.replace(/-/g, "/")).getTime()+time >= INIT_START_TIME 
							},
							message: '竞标开始时间必须大于等于当前时间24小时',
							trigger: ['blur', 'change']
						}
					], 
					'bid_edate': [
						{
							required: true, 
							message: '请输入结束日期',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								if(value > this.model.bid_bdate) return true
								if(value == this.model.bid_bdate && this.model.bid_etime > this.model.bid_btime) return true;
								return false 
							},
							message: '结束时间必须大于开始时间',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								const btime = new Date(this.model.bid_bdate.replace(/-/g, "/")).getTime()+(this.model.bid_btime || 0)*3600*1000
								const etime = new Date(value.replace(/-/g, "/")).getTime()+(this.model.bid_etime || 0)*3600*1000
								return etime - btime <= 3600*1000*24
							},
							message: '竞标持续时间必须小于等于1天',
							trigger: ['blur', 'change']
						}
					]
				}
				if(this.pan == 'b') {
					let obj = {
						...baseRules,
						...bRules
					}
					if(this.$refs.from && this.$refs.from.setRules) {
						this.$refs.from.setRules(obj)
					} 
					return obj
				}else if(this.pan == 's') {
					let obj = {
						...baseRules,
						...sRules
					}
					if(this.model.trade_mode == '1') {
						obj = {
							...obj,
							...jpRules
						}
					}
					if(this.$refs.from && this.$refs.from.setRules) {
						this.$refs.from.setRules(obj)
					} 
					return obj
				}
				return {}
				
			},
			radiolist_trade_mode_filter() {
				if(this.myCpy.grade_2 == 1) return this.radiolist_trade_mode
				else return this.radiolist_trade_mode.filter(ele => ele.value != 1)
			},
			radiolist_mdu_filter() {
				return this.radiolist_mdu.filter(ele => ele.show.includes(this.pan))
			},
			radiolist_settle_mode_filter() {
				return this.radiolist_settle_mode.filter(ele => {
					ele.disabled = ele.value != 'B' && this.model.trade_mode == '2' && this.model.trade_type == '2' ? true : false
					return ele.show.includes(this.pan)
				})
			}, 
			 priceStr() {
				 if(this.pan == 'b') return '意向单价'
				 else return '单价'
			 }, 
		},
		async onLoad(options) {
			this.model.post_type = String(this.auth)
			if(options.hasOwnProperty('data')) {
				await this.getAddressArea()
			}else {
				this.getAddressArea()
			}
			
			
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			if(options.hasOwnProperty('pid')) {
				this.pid = options.pid
				if(options.hasOwnProperty('data')) {
					const data = JSON.parse(decodeURIComponent(options.data))
					console.log(data)
					this.model.delivery_place = data.delivery_place
					this.model.delivery_address = data.delivery_address
					this.model.product_id = data.product_id
					this.model.name = data.name
					this.model.order_type = data.order_type
					this.model.trade_type = data.trade_type
					this.model.trade_mode = data.trade_mode
					this.model.price = data.price
					this.model.dprice = data.dprice
					this.model.amount = data.amount
					this.model.customer_id = data.customer_id
					this.model.customer_name = data.customer_name
					this.model.mdu = data.mdu
					this.model.post_type = data.post_type
					this.model.express_time = data.express_time
					this.model.broker_login = data.broker_login
					this.checkbox_broker_login = [data.broker_login]
					this.model.express_unit = data.express_unit
					this.model.express_unit_label = this.expressUnit[0].filter(ele => ele.value == data.express_unit)[0]?.label
					this.model.settle_month = data.settle_month
					this.model.settle_month_label = this.settleMonth[0].filter(ele => ele.value == data.settle_month)[0]?.label
					this.model.settle_date = data.settle_date
					this.model.settle_date_label = this.settleDate[0].filter(ele => ele.value == data.settle_date)[0]?.label
					this.model.settle_mode = data.settle_mode
					this.model.delivery_place = data.delivery_place
					// 竞拍
					this.model.bid_is_part = data.bid_is_part
					this.model.bid_step_amount = data.bid_step_amount
					this.model.bid_min_amount = data.bid_min_amount
					this.model.bid_re_price = data.bid_re_price
					this.model.bid_step = data.bid_step
					this.model.bid_is_repeat = data.bid_is_repeat
					this.model.bid_bdate = data.bid_bdate
					this.model.bid_btime = data.bid_btime
					this.model.bid_edate = data.bid_edate
					this.model.bid_etime = data.bid_etime
					this.model.bid_is_anonym = data.bid_is_anonym
					this.model.bid_is_darkmark = data.bid_is_darkmark
					
					if(this.pan == 's') {
						this.model.remark = data.remark
						this.model.pics = data.list_pics.map(ele => {
							ele.url = `https://img-album.rawmex.cn/view/${ele.pic}`
							return ele
						})
					}else {
						this.model.spec = data.spec
						this.model.intro = data.intro
					}
				}
				
				this.prodInfoLoading = true
				await this.getCompanyProductDetail()
				this.prodInfoLoading = false
			}
			else if(options.hasOwnProperty('product_id')) {
				this.model.product_id = options.product_id
				this.prodInfoLoading = true
				await this.getCompanyProductDetail()
				this.prodInfoLoading = false
			}
			this.setPageTitle()
		},
		watch: {
			['model.pics'](n) {
				console.log(n)
				this.fileList1 = n.map(ele => {
					return {
						...ele,
						url: ele.url,
					}
				})
			},
			['model.trade_type'](n) { 
				if(n == '1') {
					this.model.order_type = '2'
					this.model.trade_mode = '0'
				}
				this.$nextTick(() => {
					this.$refs.from.validateField('express_time')
				})
			},
			['model.order_type']: {
				immediate: true, 
				handler(n) {
					this.radiolist_trade_mode.forEach(ele => { 
						if(ele.value == '2' || ele.value == '1') {
							ele.disabled = n == '2' ? true : false;
						} 
					}) 
					if(n == '2') {
						this.model.trade_mode = '0'
					}
				},
			},
			['model.trade_mode'](n) {
				this.radiolist_order_type.some(ele => {
					if(ele.value == '2') {
						ele.disabled = n == '2' ? true : false;
						return true
					}
					return false
				})
				this.radiolist_settle_mode.forEach(ele => {
					if(ele.value != 'B') {
						ele.disabled = n == '2' ? true : false;
					}
				})
				if(n == '2') {
					this.model.settle_mode = 'B'
				}
			},
			['model.express_unit'](n) {
				this.$nextTick(() => {
					this.$refs.from.validateField('express_time')
				})
			}, 
			['model.bid_is_part'](n) {
				if(n == 2) this.model.bid_is_repeat = 0
			}, 
			['model.bid_bdate'](n) {
				// this.model.bid_btime = '0'
				// console.log(new Date(`${n} 00:00:00`).getTime() - new Date().getTime())
				// if(new Date(`${n} 00:00:00`).getTime() - new Date().getTime() <= 3600*24*1000) {
				// 	this.model.bid_btime = new Date().getHours()+1
				// }
			}, 
			['model.bid_edate'](n) {
				// this.model.bid_etime = '0'
				// if(n == this.model.bid_bdate) {
				// 	if(+this.model.bid_btime < 23) this.model.bid_etime = +(this.model.bid_btime)+1
				// 	else {
				// 		this.model.bid_etime = '23'
				// 	}
				// }
				
			}, 
			
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
		}, 
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				getAddressArea: 'user/getAddressArea',
				getImageBase64_readFile: 'user/getImageBase64_readFile'
			}),
			handleoversize() {
				uni.showToast({
					title: '建议上传2M以内的图片',
					icon: 'none'
				})
			}, 
			checkboxChange(v) {
				console.log(v)
				this.model.broker_login = v[0] ? v[0]: ''
			}, 
			async getCompanyProductDetail() {
				const res = await this.$api.getCompanyProductDetail({params: {id: this.model.product_id}})
				if(res.code == 1) {
					this.product = res.list.name
					this.model.name = res.list.name
					this.prodUnit = res.list.unit
					this.prodInfo = res.list.list_product_attrs.reduce((pre, cur) => {
						return pre + `${cur.Attr.name}：${cur.value}\n`
					}, '')
					
					
				}
			},
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log('popupclosed');
				this.$refs.from.validateField('delivery_place')
			},
			onchange(e) {
				console.log('onchange:', e);
				this.$refs.from.validateField('delivery_place')
			},
			handleName(e) {
				this.model.customer_name = e
				this.model.customer_id = ''
			},
			async menusConfirm1(data) {
				console.log(data)
				this.product = data.name
				this.model.product_id = data.id
				if(!this.model.name) this.model.name = data.name
				this.show = false;
				
				this.prodInfoLoading = true
				await this.getCompanyProductDetail()
				this.prodInfoLoading = false
				if(this.pan == 'b') {
					this.model.spec = this.prodInfo
				}
			},
			async menusConfirm2(data) {
				console.log(data)
				this.model.customer_id = data.to_id
				this.model.customer_name = data.to_name
				this.show2 = false;
			},
			confirmExpressUnit(e) {
				console.log(e)
				this.model.express_unit_label = e.value[0].label
				this.model.express_unit = e.value[0].value
				this.showExpressUnit = false
			},
			confirmSettleMonth(e) {
				console.log(e)
				this.model.settle_month_label = e.value[0].label
				this.model.settle_month = e.value[0].value
				this.showSettleMonth = false
				this.$refs.from.validateField('settle_month')
			},
			//确认 开始日期
			confirmStartDate(e) {  
				this.model.bid_btimestamp = e.value
				this.model.bid_bdate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				// this.model.bid_etime = '0'
				this.showStartDate = false
				this.$refs.from.validateField('bid_bdate')
				this.$refs.from.validateField('bid_edate')
			},
			//确认 结束日期
			confirmEndDate(e) {   
				let date = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				if(new Date(date.replace(/-/g, "/")).getTime() < new Date(this.model.bid_bdate.replace(/-/g, "/")).getTime()) {
					uni.showToast({
						title: '结束时间必须大于开始时间',
						icon: 'none'
					})
					
					return
				}
				this.model.bid_etimestamp = e.value
				this.model.bid_edate = date
				// this.model.bid_etime = '0'
				this.showEndDate = false  
				this.$refs.from.validateField('bid_edate')
			},
			//确认 开始时间
			confirmStartTime(e) {
				console.log(e) 
				this.model.bid_btime = e.value[0].value
				this.showStartTime = false 
				this.$refs.from.validateField('bid_bdate')
				this.$refs.from.validateField('bid_edate')
			},
			//确认 结束时间
			confirmEndTime(e) {
				console.log(e) 
				if(this.model.bid_bdate == this.model.bid_edate && e.value[0].value <= this.model.bid_btime) {
					uni.showToast({
						title: '结束时间必须大于开始时间',
						icon: 'none'
					})
					return
				}
				this.model.bid_etime = e.value[0].value
				this.showEndTime = false
				this.$refs.from.validateField('bid_edate')
			},
			confirmSettleDate(e) {
				console.log(e)
				this.model.settle_date_label = e.value[0].label
				this.model.settle_date = e.value[0].value
				this.showSettleDate = false
				this.$refs.from.validateField('settle_month')
			},
			setPageTitle() {
				let title = '';
				if(this.pid) title = '更新'
				else title = '发布'
				
				if(this.pan == 'b') title += '买盘'
				else if(this.pan == 's') title += '卖盘'
				
				uni.setNavigationBarTitle({
					title: title
				})
			},
			submit() {
				
				this.$refs.from.validate().then(async res => {
					uni.showLoading()
					
					let func = ''
					let params = {...this.model};
					if(this.pan == 's') {
						
						for(let i = 0; i < this.picMaxCount; i++) {
							// if(this.model.pics[i]) {
							// 	params[`pic${i+1}`] = 'https://img-album.rawmex.cn/view/' + this.model.pics[i].pic
							// }else {
							// 	params[`pic${i+1}`] = ''
							// }
							
							if(this.fileList1[i]) {
								let ele = this.fileList1[i]
								if(ele.hasOwnProperty('id')) {
									let id = ele.id;
									let url = this.model.pics.filter(item => item.id == id)[0].url
									params[`pic${i+1}`] = url
									params[`pic${i+1}_base64`] = ''
									params[`pic${i+1}_name`] = ''
								}else {
									params[`pic${i+1}`] = ''
									if(ele.status == 'success') {
										params[`pic${i+1}_base64`] = ele.url
										params[`pic${i+1}_name`] = ele.name
									}else {
										params[`pic${i+1}_base64`] = ''
										params[`pic${i+1}_name`] = ''
									}
								}
								
								
								
							}else {
								params[`pic${i+1}`] = ''
								params[`pic${i+1}_base64`] = ''
								params[`pic${i+1}_name`] = ''
							}
						}
						
						if(this.pid) {
							func = 'changeSell'
						}else {
							func = 'createSell'
						}
					}else {
						if(this.pid) {
							func = 'changeBuy'
						}else {
							func = 'createBuy'
						}
					}
					if(this.pid) params.id = this.pid
					console.log(params)
					const r = await this.$api[func](params)
					if(r.code == 1) {
						const p = uni.$u.pages();
						if(p.length > 1 && p[p.length - 2].route == 'pages/my/broker/list') {
							p[p.length - 2].$vm.refreshList();
							uni.navigateBack({
								success() {
									uni.showToast({
										title: r.msg,
										icon: 'none'
									})
								}
							})
							return
						}
						uni.redirectTo({
							url: `/pages/my/broker/list?pan=${this.pan}`,
							success() {
								uni.showToast({
									title: r.msg,
									icon: 'none'
								})
							}
						})
					}
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('校验失败')
				})
			},
			
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				
				// this.model.pic1 = ''
				// this.model.pic1_base64 = ''
				// this.model.pic1_name = ''
			},
			// 新增图片
			async afterRead(event) {
				console.log(event)
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.getImageBase64_readFile(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result,
						name: lists[i].url
					}))
					fileListLen++
				}
			},
			// uploadFilePromise(url) {
			// 	return new Promise((resolve, reject) => {
			// 		let a = uni.uploadFile({
			// 			url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
			// 			filePath: url,
			// 			name: 'file',
			// 			formData: {
			// 				user: 'test'
			// 			},
			// 			success: (res) => {
			// 				setTimeout(() => {
			// 					resolve(res.data.data)
			// 				}, 1000)
			// 			}
			// 		});
			// 	})
			// },
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		
	}
	.data-pickerview {
		height: 400px;
		border: 1px #e5e5e5 solid;
	}
</style>
