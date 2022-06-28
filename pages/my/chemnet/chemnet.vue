<template>
	<view class="w">
		<view class="search-wrapper u-flex u-p-l-20 u-p-r-20">
			<view class="item u-flex-1 u-p-b-10">
				<u-search 
					placeholder="检索名称" 
					v-model="keyword"
					clearabled
					:showAction="false"
					bgColor="#e8e8e8"
					@search="handleSearch"
				></u-search>
			</view>
			
		</view>
		<template v-if="searching">
			<view class="loading-wrapper u-flex u-flex-items-center u-flex-center">
				<u-loading-icon show mode="circle" size="35"></u-loading-icon>
			</view>
		</template>
		<template v-else-if="list.id">
			<view class="tabs-w">
				<u-tabs
					:list="tabs_list"
					:current="tabs_current"
					lineHeight="0"
					:activeStyle="activeTabsStyle"
					:itemStyle="itemTabsStyle"
					@change="handleTabsChange"
				>
				</u-tabs>
			</view>
			<view class="list">
				<scroll-view 
					scroll-y 
					class="list-scroll"
					scroll-with-animation
					enable-back-to-top	
					:scroll-into-view="target"
					>
					<view class="main u-p-20">
						<view id="list" class="u-m-b-40 card ">
							<u-cell-group :border='false'>
								<u-cell title="中文名称" v-if="list.cnname" :value="list.cnname"></u-cell>
								<u-cell title="中文别名" v-if="list.cnsynonyms" :value="list.cnsynonyms"></u-cell>
								<u-cell title="英文名称" v-if="list.name" :value="list.name"></u-cell>
								<u-cell title="英文别名" v-if="list.synonyms" >
									<view slot="value">
										<view :class="{
											boxHide: toggle
										}">
											<view class="box u-flex u-flex-items-center u-flex-wrap u-flex-end">
												<view class="item u-m-b-8 u-p-l-8" v-for="item in list.synonyms.split(';')">
													<u-tag :text="item" size="mini" plain></u-tag>
												</view>
											</view>
											<view class="hide-btn" @click="toggle = !toggle">
												{{toggle? '展开更多' : '收起'}}
											</view>
										</view>
										
									</view>
									
								</u-cell>
								<u-cell title="CAS号" v-if="list.registry_number" :value="list.registry_number"></u-cell>
								<u-cell title="EINECS号" v-if="list.einecs" :value="list.einecs"></u-cell>
								<u-cell title="分子式" v-if="list.molecular_formula" :value="list.molecular_formula"></u-cell>
								<u-cell title="分子量" v-if="list.formula_weight" :value="list.formula_weight"></u-cell>
								<u-cell title="InChI" v-if="list.inchi" :value="list.inchi"></u-cell>
								<u-cell title="分子结构" v-if="list.pic_name1" :value="list.pic_name1"></u-cell>
								<u-cell title="熔点" v-if="list.Melting_Point" :value="list.Melting_Point"></u-cell>
								<u-cell title="沸点" v-if="list.Boiling_Point" :value="list.Boiling_Point"></u-cell>
								<u-cell title="闪点" v-if="list.Flash_Point" :value="list.Flash_Point"></u-cell>
								<u-cell title="水溶性" v-if="list.water_solubility" :value="list.water_solubility"></u-cell>
								<u-cell title="蒸汽压" v-if="list.Vapour_Pressure" :value="list.Vapour_Pressure"></u-cell>
							</u-cell-group>
							<view class="intro-box u-m-b-40 u-m-t-40">
								<view class="intro-item" v-if="list.whxz">
									<view class="intro-title">
										<u-tag text="物化性质"  ></u-tag>
									</view>
									<view class="intro-main">
										<rich-text :nodes="list.whxz"></rich-text>
									</view>
								</view>
								<view class="intro-item" v-if="list.usages">
									<view class="intro-title">
										<u-tag text="产品用途"  ></u-tag>
									</view>
									<view class="intro-main">
										<rich-text :nodes="list.usages"></rich-text>
									</view>
								</view>
							</view>
							<view class="footer">
								<view class="f-rows" v-if="list.hazard_symbol && list.hazard_symbol.length > 0">
									<view class="label">
										<u-tag text="危险性标志"  ></u-tag>
									</view>
									<view class="content u-flex u-flex-items-center u-flex-wrap">
										<view class="item u-flex u-flex-items-center u-m-r-10" 
											v-for="(item, index) in list.hazard_symbol " 
											:key="index"
											>
											<u-image :src="item.pic" width="30" height="30" radius="5"></u-image>
											<text class="u-font-28 u-p-10">{{item.str}}</text>
										</view>
									</view>
								</view>
								<view class="f-rows" v-if="list.risk_description">
									<view class="label"><u-tag text="风险术语"></u-tag></view>
									<view class="content u-flex u-flex-items-center u-flex-wrap">
										<view class="item link-label u-p-5" 
											v-for="(item, index) in list.risk_description.split('||')" 
											:key="index"
											>
											<u-tag :text="item" plain></u-tag>
										</view>
									</view>
								</view>
								<view class="f-rows" v-if="list.safety_description">
									<view class="label"><u-tag text="安全术语"></u-tag></view>
									<view class="content u-flex u-flex-items-center u-flex-wrap">
										<view class="item link-label u-p-5"
											v-for="(item, index) in list.safety_description.split('||')" 
											:key="index"
											>
											<u-tag :text="item" plain></u-tag>
										</view>
									</view>
									
								</view>
								<view class="f-rows" v-if="list.fprod">
									<view class="label"><u-tag text="上游原料"></u-tag></view>
									<view class="content u-flex u-flex-items-center u-flex-wrap">
										<view class="item link-label u-p-5"
											v-for="(item, index) in list.fprod.split(' ')" 
											:key="index"
											>
											<u-tag :text="item" plain></u-tag>
										</view>
									</view>
								</view>
								<view class="f-rows" v-if="list.bprod">
									<view class="label"><u-tag text="下游产品"></u-tag></view>
									<view class="content u-flex u-flex-items-center u-flex-wrap">
										<view class="item link-label u-p-5"
											v-for="(item, index) in list.bprod.split(' ')" 
											:key="index"
											>
											<u-tag :text="item" plain></u-tag>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view id="list2" class="" v-if="list_company.length > 0">
							<view class="u-m-b-10">
								<u-tag text="供应商"></u-tag>
							</view>
							<view class="cpy-item u-m-b-20 card"
								v-for="(item, index) in list_company"
								:key="index"
							>
								<chemnetCard
									:origin="item"
								></chemnetCard>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</template>
		<template v-else>
			<template v-if="chemnetList.length > 0">
				<view class="search-his u-p-30">
					<view class="title u-m-b-20 u-flex u-flex-items-center u-flex-between">
						<view class=" u-flex u-flex-items-center">搜索历史</view>
						<view class=" u-flex u-flex-items-center u-font-28 text-base" @click="chemnetList = []">
							<text>清除</text>
							<i class="custom-icon-shanchu custom-icon"></i>
						</view>
					</view>
					<view class="main u-flex u-flex-items-center u-flex-wrap">
						<view class="item u-m-b-15 u-m-r-15"
							v-for="(item, index) in chemnetList"
							:key="index"
							@click="handleSearch(item)"
						>{{item}}</view>
					</view>
					
				</view>
			</template>
			<template v-if="searchRes == 'no'">
				<u-empty
					mode="data"
					:icon="typeConfig.white.empty"
					text="无搜索结果"
				>
				</u-empty>
			</template>
			<view class="u-p-20">
				<view class="help u-p-20 card">
					<view class="title">
						<u-tag text="* CAS查询帮助："></u-tag>
					</view>
					<view class="content">
						<view class="item">
							1、化工字典现有词汇量1,800,000条。
						</view>
						<view class="item">
							2、可输入化学品的中文名、英文名、别名或CAS登记号(美国化学文摘登记号)进行检索。例如，以下的关键词，都可搜到酒石酸：
						</view>
						<view class="item u-p-l-10">
							输入中文名或中文别名进行搜索，如 DL-酒石酸 酒石酸 2,3-二羟基丁二酸
						</view>
						<view class="item u-p-l-10">
							输入英文名或英文别名进行搜索，如 DL-Tartaric Acid Tartaric Acid
						</view>
						<view class="item u-p-l-10">
							输入CAS登记号进行搜索，如 133-37-9
						</view>
					</view>
					
				</view>
			</view>
		</template>
		
			
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import chemnetCard from '@/pages/my/components/chemnetCard/chemnetCard.vue'
	export default {
		data() {
			return {
				keyword: '',
				tabs_current: 0,
				target: 'list',
				activeTabsStyle: {
					fontWeight: 'bold',
					color: '#007aff'
				},
				chemnetList: uni.getStorageSync('chemnetList') || [],
				toggle: true,
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px',
				},
				tabs_list: [
					{
						name: '化学品信息',
						disabled: false,
						scrollto: 'list',
					},
					{
						name: '供应商',
						disabled: false,
						scrollto: 'list2',
					},
				],
				list: {},
				searchRes: '1',
				list_company: [],
				searching: false
			};
		},
		components: {
			chemnetCard
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
		},
		watch: {
			tabs_current(n) {
				this.target = this.tabs_list[n].scrollto
				console.log(this.target)
			},
			keyword(n) {
				if(!n) {
					this.searchRes = '1'
					this.list = {}
					this.list_company = []
				}
			},
			chemnetList(n) {
				uni.setStorageSync('chemnetList', n)
			}
		},
		onLoad() {
			
		},
		methods: {
			async getData() {
				const res = await this.$api.chemnet({params: {terms: this.keyword}})
				if(res.code == 1) {
					this.list_company = res.list_company
					this.list = res.list
				}else {
					this.searchRes = 'no'
				}
			},
			async handleTabsChange(value) {
				this.tabs_current = value.index
			},
			async handleSearch(v) {
				v = v.trim()
				this.keyword = v
				if(!v ) return
				if(this.searching) {
					uni.showToast({
						title: '请等待搜索反馈',
						icon: 'none'
					})
					return
				}
				this.updateChemnet(v)
				this.searchRes = '1'
				this.searching = true
				await this.getData()
				this.searching = false
			},
			updateChemnet(k) {
				let i = this.chemnetList.indexOf(k)
				var arr = uni.$u.deepClone(this.chemnetList)
				if(i != -1) {
					arr.splice(i, 1)
				}
				arr.unshift(k)
				this.chemnetList = arr
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
		height: 100vh;
		/deep/ {
			.u-cell-group {
				.u-cell__body {
					align-items: flex-start!important;
				}
				.u-cell__body__content {
					flex: 0 0 80px!important;
				}
				.u-cell__value {
					flex: 1!important;
					text-align: right!important;
					word-break: break-all!important;
				}
			}
		}
	}
	
</style>
<style lang="scss" scoped>
	.search-his {
		.main {
			.item {
				padding: 2px 8px;
				border-radius: 4px;
				background-color: #e2e2e2;
				color: #555;
				font-size: 14px;
			}
		}
	}
	.help {
		.content {
			.item {
				line-height: 25px;
				padding: 5px;
				color: #333;
			}
		}
	}
	.hide-btn {
		text-align: center;
		line-height: 30px;
		color: #007aff;
		font-size: 14px;
		// position: relative;
	}
	.boxHide {
		height: 130px;
		overflow: hidden;
		position: relative;
		.hide-btn {
			position: absolute;
			bottom: -1px;
			left: 0;
			width: 100%;
			height: 30px;
			background: linear-gradient(to top, #fff 60%, transparent);
		}
	}
	.footer {
		.f-rows {
			padding: 10px;
			.label {
				margin-bottom: 5px;
			}
			.content {
				padding: 10px;
				background-color: #eff7ff;
				border-radius: 8px;
				.item {
					&.link-label {
						
					}
				}
			}
		}
	}
	.intro-box {
		.intro-item {
			padding: 10px;
			.intro-title {
				margin-bottom: 5px;
				
			}
			.intro-main {
				color: #000;
				padding: 10px;
				border-radius: 8px;
				background-color: #eff7ff;
			}
		}
	}
	.w {
		height: 100%;
	}
	.loading-wrapper {
		height: 50vh;
	}
	.list {
		height: calc(100% - 83px);
		.list-scroll {
			height: 100%;
		}
	}
	.card {
		border-radius: 15px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
	}
</style>
