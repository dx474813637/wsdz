require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/components/OrderCard/OrderCard"],{"04ee":function(t,e,n){},"10a5":function(t,e,n){"use strict";n.r(e);var u=n("3610"),r=n("d269f");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("4c1d");var i,d=n("f0c5"),o=Object(d["a"])(r["default"],u["b"],u["c"],!1,null,"6e0d4248",null,!1,u["a"],i);e["default"]=o.exports},3610:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}));var u={uCountTo:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-count-to/u-count-to")]).then(n.bind(null,"257d"))}},r=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"3cc7":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"CustomCard",props:{bgColor:{type:String,default:"#fff"},ids:{type:String,default:"ids"},seller:{type:String,default:"seller"},prod:{type:String,default:"prod"},price:{type:String,default:"price"},prices:{type:String,default:"prices"},num:{type:String,default:"num"},pay_type:{type:String,default:"pay_type"},date:{type:String,default:"date"},unit:{type:String,default:"unit"},ht_status:{type:String,default:"ht_status"},boxShadow:{type:String,default:"0 0 10rpx rgba(0,0,0,.1)"},borderRadius:{type:String,default:"16rpx"},customData:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{},methods:{handleGotoDetail:function(){this.$emit("detail",{id:this.ids,customData:this.customData})}}};e.default=u},"4c1d":function(t,e,n){"use strict";var u=n("04ee"),r=n.n(u);r.a},d269f:function(t,e,n){"use strict";n.r(e);var u=n("3cc7"),r=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/my/components/OrderCard/OrderCard-create-component',
    {
        'pages/my/components/OrderCard/OrderCard-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("10a5"))
        })
    },
    [['pages/my/components/OrderCard/OrderCard-create-component']]
]);
