(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-link/u-link"],{"1f70":function(t,n,e){},"219d":function(t,n,e){"use strict";e.r(n);var i=e("88a0"),u=e("6e1e");for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);e("d67f");var o,c=e("f0c5"),r=Object(c["a"])(u["default"],i["b"],i["c"],!1,null,"0f0cb6d2",null,!1,i["a"],o);n["default"]=r.exports},"6e1e":function(t,n,e){"use strict";e.r(n);var i=e("d8c8"),u=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=u.a},"88a0":function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var u=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__get_style([t.linkStyle,t.$u.addStyle(t.customStyle)]));t.$mp.data=Object.assign({},{$root:{s0:e}})},a=[]},d67f:function(t,n,e){"use strict";var i=e("1f70"),u=e.n(i);u.a},d8c8:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=u(e("a3fe"));function u(t){return t&&t.__esModule?t:{default:t}}var a={name:"u-link",mixins:[t.$u.mpMixin,t.$u.mixin,i.default],computed:{linkStyle:function(){var n={color:this.color,fontSize:t.$u.addUnit(this.fontSize),lineHeight:t.$u.addUnit(t.$u.getPx(this.fontSize)+2),textDecoration:this.underLine?"underline":"none"};return n}},methods:{openLink:function(){var n=this;t.setClipboardData({data:this.href,success:function(){t.hideToast(),n.$nextTick((function(){t.$u.toast(n.mpTips)}))}}),this.$emit("click")}}};n.default=a}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-link/u-link-create-component',
    {
        'uni_modules/uview-ui/components/u-link/u-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("219d"))
        })
    },
    [['uni_modules/uview-ui/components/u-link/u-link-create-component']]
]);
