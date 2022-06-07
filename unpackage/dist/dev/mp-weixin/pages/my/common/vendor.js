(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/my/common/vendor"],{

/***/ 250:
/*!******************************************************************!*\
  !*** F:/hbuild-item/wsdz/pages/my/address/reglist2selectlist.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;function _default(list) {
  return list.items11.map(function (ele) {
    var obj = {
      value: ele.code,
      label: ele.name };

    var children = list["items".concat(ele.code)];
    if (children && children.length > 0) {
      obj.children = children.map(function (item) {
        var obj2 = {
          value: item.code,
          label: item.name };

        var children2 = list["items".concat(item.code)];
        if (children2 && children2.length > 0) {
          obj2.children = children2.map(function (item2) {
            return {
              value: item2.code,
              label: item2.name };

          });
        } else {
          obj2.children = [{
            value: item.code,
            label: item.name }];

        }
        return obj2;
      });
    }
    return obj;
  });
}

/***/ }),

/***/ 251:
/*!****************************************************************!*\
  !*** F:/hbuild-item/wsdz/config/mixins/mixCheckLoginStatus.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 10));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default = {
  data: function data() {

    return {
      couponShareTitle: "",
      loginBind: {
        auth: 0,
        cash_name: "" } };


  },
  onLoad: function onLoad() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (

                _this.checkLogin());case 2:res = _context.sent;
              if (res.data.share_name) _this.couponShareTitle = res.data.share_name;
              _this.loginBind.auth = res.data.auth;
              _this.loginBind.cash_name = res.data.cash_name;
              _this.loginBind.order_type = res.data.order_type;
              if (res.data.login != 0) {
                uni.setStorageSync('login', res.data.login);
              } else {
                uni.setStorageSync('prePage', getCurrentPages()[getCurrentPages().length - 1].$page.fullPath);
                if (getCurrentPages()[0].route != "pages/mine/mine") {
                  uni.redirectTo({
                    url: '/pages/login/index' });

                  uni.showToast({
                    title: '请登录生意宝账号。',
                    icon: 'none' });

                }

              }case 8:case "end":return _context.stop();}}}, _callee);}))();
  },
  methods: {
    checkLogin: function checkLogin() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                  _this2.$http.get('check_login'));case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2);}))();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 548:
/*!*********************************************************!*\
  !*** F:/hbuild-item/wsdz/config/mixCheckLoginStatus.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 10));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default = {
  data: function data() {

    return {
      couponShareTitle: "",
      loginBind: {
        auth: 0,
        cash_name: "" } };


  },
  onLoad: function onLoad() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (

                _this.checkLogin());case 2:res = _context.sent;
              console.log(res);
              if (res.share_name) _this.couponShareTitle = res.share_name;
              _this.loginBind.auth = res.auth;
              _this.loginBind.cash_name = res.cash_name;
              _this.loginBind.order_type = res.order_type;
              if (res.login != 0) {
                uni.setStorageSync('login', res.login);
              } else {
                uni.setStorageSync('prePage', getCurrentPages()[getCurrentPages().length - 1].$page.fullPath);
                if (getCurrentPages()[0].route != "pages/mine/mine") {
                  uni.redirectTo({
                    url: '/pages/login/index' });

                  uni.showToast({
                    title: '请登录生意宝账号。',
                    icon: 'none' });

                }

              }case 9:case "end":return _context.stop();}}}, _callee);}))();
  },
  methods: {
    checkLogin: function checkLogin() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                  _this2.$api.checkLogin());case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2);}))();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/common/vendor.js.map