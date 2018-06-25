// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({58:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _antd = require('antd');

var _lib = require('../lib');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/zh-cn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment2.default.locale('zh-cn');

var TabPane = _antd.Tabs.TabPane;
var DPlayer = window.DPlayer;
var site = 'https://prevue.oss-cn-shenzhen.aliyuncs.com/';

var callback = function callback(key) {
  console.log(key);
};

var Detail = function (_Component) {
  (0, _inherits3.default)(Detail, _Component);

  function Detail(props) {
    (0, _classCallCheck3.default)(this, Detail);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Detail.__proto__ || (0, _getPrototypeOf2.default)(Detail)).call(this, props));

    _this._getMovieDetail = function () {
      (0, _lib.request)({
        method: 'get',
        url: '/api/movies/' + _this.state._id
      }).then(function (res) {
        var movie = res.movie;
        var relativeMovies = res.relativeMovies;
        var video = site + movie.videoKey;
        var pic = site + movie.coverKey;

        _this.setState({
          movie: movie,
          relativeMovies: relativeMovies
        }, function () {
          _this.player = new DPlayer({
            container: document.getElementById('videoPlayer'),
            screenshot: true,
            video: {
              url: video,
              pic: pic,
              thumbnails: pic
            }
          });
        });
      }).catch(function () {
        _this.setState({
          movie: {}
        });

        _this.props.history.goBack();
      });
    };

    _this.state = {
      movie: null,
      relativeMovies: [],
      _id: _this.props.match.params.id
    };
    return _this;
  }

  (0, _createClass3.default)(Detail, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._getMovieDetail();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          movie = _state.movie,
          relativeMovies = _state.relativeMovies;


      if (!movie) return null;

      return _react2.default.createElement(
        'div',
        { className: 'flex-row full' },
        _react2.default.createElement(
          'div',
          { className: 'page-shade' },
          _react2.default.createElement(
            'div',
            { className: 'video-wrapper' },
            _react2.default.createElement('div', { id: 'videoPlayer', 'data-src': site + movie.coverKey, 'data-video': site + movie.videoKey })
          ),
          _react2.default.createElement(
            'div',
            { className: 'video-sidebar' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { className: 'homeLink', to: '/' },
              '\u56DE\u5230\u9996\u9875'
            ),
            _react2.default.createElement(
              _antd.Tabs,
              { defaultActiveKey: '1', onChange: callback },
              _react2.default.createElement(
                TabPane,
                { tab: '\u5173\u4E8E\u672C\u7247', key: '1' },
                _react2.default.createElement(
                  'h1',
                  null,
                  movie.title
                ),
                _react2.default.createElement(
                  'dl',
                  null,
                  _react2.default.createElement(
                    'dt',
                    null,
                    '\u8C46\u74E3\u8BC4\u5206\uFF1A',
                    _react2.default.createElement(_antd.Badge, { count: movie.rate, style: { backgroundColor: '#52c41a' } }),
                    ' \u5206'
                  ),
                  _react2.default.createElement(
                    'dt',
                    null,
                    '\u7535\u5F71\u5206\u7C7B\uFF1A',
                    movie.tags && movie.tags.join(' ')
                  ),
                  _react2.default.createElement(
                    'dt',
                    null,
                    '\u66F4\u65B0\u65F6\u95F4\uFF1A',
                    (0, _moment2.default)(movie.meta.updateAt).fromNow()
                  ),
                  _react2.default.createElement(
                    'dt',
                    null,
                    '\u5F71\u7247\u4ECB\u7ECD\uFF1A'
                  ),
                  _react2.default.createElement(
                    'dd',
                    null,
                    movie.summary
                  )
                )
              ),
              _react2.default.createElement(
                TabPane,
                { tab: '\u540C\u7C7B\u7535\u5F71', key: '2' },
                relativeMovies.map(function (item) {
                  return _react2.default.createElement(
                    _reactRouterDom.Link,
                    { key: item._id, className: 'media', to: '/detail/' + item._id },
                    _react2.default.createElement('img', { width: '60', className: 'align-self-center mr-3', src: site + item.posterKey }),
                    _react2.default.createElement(
                      'div',
                      { 'class': 'media-body' },
                      _react2.default.createElement(
                        'h6',
                        { className: 'media-title' },
                        item.title
                      ),
                      _react2.default.createElement(
                        'ul',
                        { className: 'list-unstyled' },
                        item.pubdate && item.pubdate.map(function (it, i) {
                          return _react2.default.createElement(
                            'li',
                            { key: i },
                            (0, _moment2.default)(it.date).format('YYYY.MM'),
                            ' ',
                            it.country
                          );
                        })
                      )
                    )
                  );
                })
              )
            )
          )
        )
      );
    }
  }]);
  return Detail;
}(_react.Component);

exports.default = Detail;
},{"babel-runtime/core-js/object/get-prototype-of":103,"babel-runtime/helpers/classCallCheck":104,"babel-runtime/helpers/createClass":105,"babel-runtime/helpers/possibleConstructorReturn":106,"babel-runtime/helpers/inherits":107,"react":10,"react-router-dom":11,"antd":100,"../lib":110,"moment":101,"moment/locale/zh-cn":108}],9947:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '62784' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[9947,58], null)
//# sourceMappingURL=/detail.924b1803.map