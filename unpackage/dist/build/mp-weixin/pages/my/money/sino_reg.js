require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/money/sino_reg"],{"0b06":function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return r}));var r={uNavbar:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(t.bind(null,"554d"))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,"67bb"))},"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,"1442"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"8639"))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--input/u--input")]).then(t.bind(null,"1ddf"))},uActionSheet:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-action-sheet/u-action-sheet")]).then(t.bind(null,"d033"))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-input/u-input")]).then(t.bind(null,"cf8b"))},uCode:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-code/u-code")]).then(t.bind(null,"d0cc"))},uButton:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-button/u-button")]).then(t.bind(null,"78a9"))}},u=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.showUserType=!1},e.e1=function(n){e.disabled=!0},e.e2=function(n){e.disabled=!1})},o=[]},"2c89":function(e,n,t){},"75ba":function(e,n,t){"use strict";var r=t("2c89"),u=t.n(r);u.a},"7eaf":function(e,n,t){"use strict";t.r(n);var r=t("0b06"),u=t("d4e3");for(var o in u)"default"!==o&&function(e){t.d(n,e,(function(){return u[e]}))}(o);t("90da"),t("75ba");var i,a=t("f0c5"),s=Object(a["a"])(u["default"],r["b"],r["c"],!1,null,"53d1a00e",null,!1,r["a"],i);n["default"]=s.exports},"90da":function(e,n,t){"use strict";var r=t("e7a9"),u=t.n(r);u.a},d305:function(e,n,t){"use strict";(function(e){t("0d45");r(t("66fd"));var n=r(t("7eaf"));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t("543d")["createPage"])},d4e3:function(e,n,t){"use strict";t.r(n);var r=t("f012"),u=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,(function(){return r[e]}))}(o);n["default"]=u.a},e7a9:function(e,n,t){},f012:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=o(t("a34a")),u=t("26cb");function o(e){return e&&e.__esModule?e:{default:e}}function i(e,n,t,r,u,o,i){try{var a=e[o](i),s=a.value}catch(c){return void t(c)}a.done?n(s):Promise.resolve(s).then(r,u)}function a(e){return function(){var n=this,t=arguments;return new Promise((function(r,u){var o=e.apply(n,t);function a(e){i(o,r,u,a,s,"next",e)}function s(e){i(o,r,u,a,s,"throw",e)}a(void 0)}))}}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){d(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function d(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var l={data:function(){return{tips:"",disabled:!1,userType:"个人",showUserType:!1,userActions:[{name:"个人"},{name:"个体工商户"},{name:"企业"}],model:{base:{phone:"",code:""},userInfo:{name:"",id:""},userInfo2:{name:"",id:"",cpyname:"",cpyid:""},cpyInfo:{name:"",id:"",name2:"",id2:"",contact:""}},btnDisabled:!1}},computed:{rules:function(){return{"base.phone":[{type:"string",required:!0,message:"请填写手机号",trigger:["blur","change"]},{validator:function(n,t,r){return e.$u.test.mobile(t)},message:"请填写正确的手机号",trigger:["blur","change"]}],"base.code":{type:"string",required:!0,message:"请填写验证码",trigger:["blur","change"]},"userInfo.name":{type:"string",required:!0,message:"请填写姓名",trigger:["blur","change"]},"userInfo.id":{type:"string",required:!0,message:"请填写身份证",trigger:["blur","change"]},"userInfo2.name":{type:"string",required:!0,message:"请填写姓名",trigger:["blur","change"]},"userInfo2.id":{type:"string",required:!0,message:"请填写身份证",trigger:["blur","change"]},"userInfo2.cpyname":{type:"string",required:!0,message:"请填写公司名称",trigger:["blur","change"]},"userInfo2.cpyid":{type:"string",required:!0,message:"请填写公司信用统一代码",trigger:["blur","change"]},"cpyInfo.name":{type:"string",required:!0,message:"请填写企业名称",trigger:["blur","change"]},"cpyInfo.id":{type:"string",required:!0,message:"请填写信用统一代码",trigger:["blur","change"]},"cpyInfo.contact":{type:"string",required:!0,message:"请填写联系人",trigger:["blur","change"]},"cpyInfo.name2":{type:"string",required:!0,message:"请填写法人姓名",trigger:["blur","change"]},"cpyInfo.id2":{type:"string",required:!0,message:"请填写法人身份证",trigger:["blur","change"]}}}},onReady:function(){this.$refs.userform.setRules(this.rules)},methods:c(c({},(0,u.mapMutations)({handleGoto:"user/handleGoto"})),{},{codeChange:function(e){this.tips=e},getCode:function(){var n=this;return a(r.default.mark((function t(){var u;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n.disabled){t.next=2;break}return t.abrupt("return");case 2:return e.showLoading({title:"正在获取验证码"}),n.$refs.uCode.start(),t.next=6,n.$api.getPhoneCode();case 6:u=t.sent,1==u.code&&e.showToast({title:"验证码已发送"});case 8:case"end":return t.stop()}}),t)})))()},userTypeSelect:function(e){this.userType=e.name,this.$refs.userform.clearValidate()},showActions:function(){this.showUserType=!0,e.hideKeyboard()},submit:function(){this.$refs.userform.validate().then((function(n){e.$u.toast("校验通过")})).catch((function(n){e.$u.toast("校验失败")}))},handleGetCode:function(){var n=this;return a(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n.btnDisabled){t.next=2;break}return t.abrupt("return");case 2:n.$refs.userform.validateField("base.phone",function(){var t=a(r.default.mark((function t(u){var o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(u.length>0)){t.next=2;break}return t.abrupt("return");case 2:return n.btnDisabled=!0,t.next=5,n.$api.getPhoneCode();case 5:o=t.sent,1==o.code&&e.showToast({title:o.msg,icon:"none"});case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})))()},handleCountDownFinish:function(){this.btnDisabled=!1}})};n.default=l}).call(this,t("543d")["default"])}},[["d305","common/runtime","common/vendor"]]]);