require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/broker/edit"],{"382d":function(e,t,n){},"606d":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=u(n("a34a"));function u(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n,i,u,r,o){try{var a=e[r](o),l=a.value}catch(s){return void n(s)}a.done?t(l):Promise.resolve(l).then(i,u)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(i,u){var o=e.apply(t,n);function a(e){r(o,i,u,a,l,"next",e)}function l(e){r(o,i,u,a,l,"throw",e)}a(void 0)}))}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c={data:function(){return{pid:"",pan:"b",list1:[{label:"菜单1",value:"caidan1"},{label:"菜单2",value:"caidan2"},{label:"菜单3",value:"caidan3"},{label:"菜单4",value:"caidan4"}],list2:[{label:"菜单b-1",value:"caidan1"},{label:"菜单b-2",value:"caidan2"},{label:"菜单b-3",value:"caidan3"},{label:"菜单b-4",value:"caidan4"}],product:"",model:{product_id:"",name:"",order_type:"1",trade_type:"2",price:"",dprice:"",amount:"",spec:"",express_time:"",express_unit_label:"天",express_unit:"d",delivery_place:"",customer_value:"",mdu:"D",post_type:"1",intro:"",settle_mode:"",remark:"",imgs:[]},fileList1:[],radiolist_order_type:[{name:"线上支付",disabled:!1,value:"1"},{name:"线下支付",disabled:!1,value:"2"}],radiolist_trade_type:[{name:"合约现货",disabled:!1,value:"1"},{name:"即期现货",disabled:!1,value:"2"}],radiolist_mdu:[{name:"经销商",disabled:!1,value:"D"},{name:"下游用户",disabled:!1,value:"U"}],radiolist_post_type:[{name:"替报",disabled:!1,value:"1"},{name:"自报",disabled:!1,value:"0"}],radiolist_settle_mode:[{name:"卖家送货",disabled:!1,value:"S"},{name:"买家自提",disabled:!1,value:"B"},{name:"均可",disabled:!1,value:""}],showExpressUnit:!1,expressUnit:[[{label:"天",value:"d"},{label:"小时",value:"h"}]],customer_name:"",dataTree:[{text:"浙江省",value:"zj",children:[{text:"杭州市",value:"hz",children:[{text:"西湖区",value:"xh"},{text:"拱墅区",value:"gs"}]},{text:"宁波市",value:"nb"}]},{text:"北京市",value:"bj",children:[{text:"朝阳区",value:"cy"},{text:"xx区",value:"xx"}]},{text:"上海市",value:"sh",children:[{text:"闵行区",value:"mh"},{text:"浦东区",value:"pd"}]}]}},computed:{candidates:function(){return this.list1.map((function(e){return e.label}))},candidates2:function(){return this.list2.map((function(e){return e.label}))},rules:function(){var e={product_id:{type:"string",required:!0,message:"请选择商品",trigger:["blur","change"]},name:{type:"string",required:!0,message:"请填写名称",trigger:["blur","change"]},price:{type:"string",required:!0,message:"请填写单价",trigger:["blur","change"]},express_time:{type:"string",required:!0,message:"请填写单价",trigger:["blur","change"]},delivery_place:{type:"string",required:!0,message:"请选择交货地",trigger:["blur","change"]}},t={amount:{type:"string",required:!0,message:"请输入有效时间",trigger:["blur","change"]},spec:{type:"string",required:!0,message:"请填写主规格",trigger:["blur","change"]}},n={};return"b"==this.pan?l(l({},e),t):"s"==this.pan?l(l({},e),n):{}}},onLoad:function(e){e.hasOwnProperty("pid")&&(this.pid=e.pid),e.hasOwnProperty("pan")&&(this.pan=e.pan),this.setPageTitle()},onReady:function(){this.$refs.from.setRules(this.rules)},methods:{onnodeclick:function(e){console.log(e)},onpopupopened:function(e){console.log("popupopened")},onpopupclosed:function(e){console.log("popupclosed"),this.$refs.from.validateField("delivery_place")},onchange:function(e){console.log("onchange:",e),this.$refs.from.validateField("delivery_place")},comboxBlur2:function(e){var t=this.candidates2.indexOf(e);-1!=t?(this.model.customer_value=this.list2[t].value,this.customer_name=e):(this.model.customer_value="",this.customer_name=""),this.$refs.from.validateField("customer_value")},comboxBlur1:function(e){var t=this.candidates.indexOf(e);-1!=t?(this.model.product_id=this.list1[t].value,this.product=e):(this.model.product_id="",this.product=""),this.$refs.from.validateField("product_id")},confirmExpressUnit:function(e){console.log(e),this.model.express_unit_label=e.value[0].label,this.model.express_unit=e.value[0].value,this.showExpressUnit=!1},setPageTitle:function(){var t="";t=this.pid?"更新":"发布","b"==this.pan?t+="买盘":"s"==this.pan&&(t+="卖盘"),e.setNavigationBarTitle({title:t})},submit:function(){var t=this;this.$refs.from.validate().then(function(){var n=o(i.default.mark((function n(u){var r;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.showLoading(),console.log(t.model),n.next=4,t.$api.editProd(l(l({},t.model.prod),{},{id:t.pid}));case 4:r=n.sent,console.log(r),1==r.code&&(t.$utils.prePage()&&t.$utils.prePage().refreshList(),e.showToast({title:r.msg,icon:"none"}),setTimeout((function(){e.navigateBack()}),800));case 7:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(t){e.$u.toast("校验失败")}))},deletePic:function(e){this["fileList".concat(e.name)].splice(e.index,1)},afterRead:function(e){var t=this;return o(i.default.mark((function n(){var u,r,o,a,s;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:u=[].concat(e.file),r=t["fileList".concat(e.name)].length,u.map((function(n){t["fileList".concat(e.name)].push(l(l({},n),{},{status:"uploading",message:"上传中"}))})),o=0;case 4:if(!(o<u.length)){n.next=14;break}return n.next=7,t.uploadFilePromise(u[o].url);case 7:a=n.sent,s=t["fileList".concat(e.name)][r],t["fileList".concat(e.name)].splice(r,1,Object.assign(s,{status:"success",message:"",url:a})),r++;case 11:o++,n.next=4;break;case 14:case"end":return n.stop()}}),n)})))()},uploadFilePromise:function(t){return new Promise((function(n,i){e.uploadFile({url:"http://192.168.2.21:7001/upload",filePath:t,name:"file",formData:{user:"test"},success:function(e){setTimeout((function(){n(e.data.data)}),1e3)}})}))}}};t.default=c}).call(this,n("543d")["default"])},b973:function(e,t,n){"use strict";(function(e){n("0d45");i(n("66fd"));var t=i(n("b9bd"));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},b9bd:function(e,t,n){"use strict";n.r(t);var i=n("dc84"),u=n("f3f4");for(var r in u)"default"!==r&&function(e){n.d(t,e,(function(){return u[e]}))}(r);n("c637");var o,a=n("f0c5"),l=Object(a["a"])(u["default"],i["b"],i["c"],!1,null,"8aa2fac0",null,!1,i["a"],o);t["default"]=l.exports},c637:function(e,t,n){"use strict";var i=n("382d"),u=n.n(i);u.a},dc84:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}));var i={"u-Form":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--form/u--form")]).then(n.bind(null,"1442"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"8639"))},uniCombox:function(){return n.e("uni_modules/uni-combox/components/uni-combox/uni-combox").then(n.bind(null,"d83c"))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"1ddf"))},uRadioGroup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-radio-group/u-radio-group")]).then(n.bind(null,"046b2"))},uRadio:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-radio/u-radio")]).then(n.bind(null,"d568"))},"u-Textarea":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(n.bind(null,"64da"))},uPicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-picker/u-picker")]).then(n.bind(null,"1b36"))},uniDataPicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker")]).then(n.bind(null,"e99a"))},uUpload:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-upload/u-upload")]).then(n.bind(null,"5840"))},uButton:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-button/u-button")]).then(n.bind(null,"78a9"))}},u=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showExpressUnit=!0},e.e1=function(t){e.showExpressUnit=!1},e.e2=function(t){e.showExpressUnit=!1})},r=[]},f3f4:function(e,t,n){"use strict";n.r(t);var i=n("606d"),u=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=u.a}},[["b973","common/runtime","common/vendor"]]]);