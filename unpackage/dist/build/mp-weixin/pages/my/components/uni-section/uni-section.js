require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/components/uni-section/uni-section"],{"154a":function(t,n,e){},"31fb":function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"7a9e":function(t,n,e){"use strict";e.r(n);var u=e("b745"),i=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=i.a},"96c4":function(t,n,e){"use strict";e.r(n);var u=e("31fb"),i=e("7a9e");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("cb06");var c,r=e("f0c5"),o=Object(r["a"])(i["default"],u["b"],u["c"],!1,null,"3b42683a",null,!1,u["a"],c);n["default"]=o.exports},b745:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"UniSection",emits:["click"],props:{type:{type:String,default:""},title:{type:String,default:""},color:{type:String,default:"#333"},subTitle:{type:String,default:""},padding:{type:Boolean,default:!1},border:{type:Boolean,default:!1}},data:function(){return{}},watch:{title:function(n){t.report&&""!==n&&t.report("title",n)}},methods:{onClick:function(){this.$emit("click")}}};n.default=e}).call(this,e("543d")["default"])},cb06:function(t,n,e){"use strict";var u=e("154a"),i=e.n(u);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/my/components/uni-section/uni-section-create-component',
    {
        'pages/my/components/uni-section/uni-section-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("96c4"))
        })
    },
    [['pages/my/components/uni-section/uni-section-create-component']]
]);
