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
})({206:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  name: 'ALL',
  path: '/'
}, {
  name: 'Science Fiction',
  path: '/list/' + encodeURIComponent('SF')
}, {
  name: 'Super Heros',
  path: '/list/' + encodeURIComponent('SH')
}, {
  name: 'Love Story',
  path: '/list/' + encodeURIComponent('LS')
}, {
  name: 'War',
  path: '/list/' + encodeURIComponent('War')
}, {
  name: 'Histroy',
  path: '/list/' + encodeURIComponent('HISTORY')
}];
},{}],98:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _antd = require('antd');

var _reactRouterDom = require('react-router-dom');

var _nav = require('../nav');

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMenuContent = function getMenuContent(_ref) {
  var _ref$path = _ref.path,
      path = _ref$path === undefined ? '/' : _ref$path,
      name = _ref.name;
  return _react2.default.createElement(
    'a',
    { href: path, style: { color: '#fff2e8' } },
    name
  );
};

var LayoutDefault = function (_Component) {
  (0, _inherits3.default)(LayoutDefault, _Component);

  function LayoutDefault(props) {
    (0, _classCallCheck3.default)(this, LayoutDefault);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LayoutDefault.__proto__ || (0, _getPrototypeOf2.default)(LayoutDefault)).call(this, props));

    _this.matchRouteName = _this.props.match ? _nav2.default.find(function (e) {
      return e.name === _this.props.match.params.type;
    }) ? _nav2.default.find(function (e) {
      return e.name === _this.props.match.params.type;
    }).name : '全部' : _nav2.default[0].name;

    _this.toggleLoading = function () {
      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var tip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'One more secend';

      _this.setState({
        tip: tip,
        loading: status
      });
    };

    _this.state = {
      loading: false,
      tip: 'Wait for it'
    };
    return _this;
  }

  (0, _createClass3.default)(LayoutDefault, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.__LOADING__ = this.toggleLoading;
    }
  }, {
    key: 'componentWillUnMount',
    value: function componentWillUnMount() {
      window.__LOADING__ = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state,
          loading = _state.loading,
          tip = _state.tip;


      return _react2.default.createElement(
        'div',
        { className: 'flex-column', style: { width: '100%', height: '100%' } },
        _react2.default.createElement(
          _antd.Menu,
          {
            style: { fontSize: 13.5, backgroundColor: '#000' },
            mode: 'horizontal',
            defaultSelectedKeys: [this.matchRouteName]
          },
          _react2.default.createElement(
            _antd.Menu.Item,
            {
              style: {
                marginLeft: 24,
                marginRight: 30,
                fontSize: 18,
                textAlign: 'center',
                color: '#fff !important',
                float: 'left'
              }
            },
            _react2.default.createElement(
              'a',
              { href: '/', className: 'hover-scale logo-text', style: {
                  color: '#fff2e8'
                } },
              'Trailers'
            )
          ),
          _nav2.default.map(function (e, i) {
            return _react2.default.createElement(
              _antd.Menu.Item,
              { key: e.name },
              getMenuContent((0, _extends3.default)({}, e))
            );
          })
        ),
        _react2.default.createElement(
          _antd.Spin,
          {
            spinning: loading,
            tip: tip,
            wrapperClassName: 'content-spin full'
          },
          children
        )
      );
    }
  }]);
  return LayoutDefault;
}(_react.Component);

exports.default = LayoutDefault;
},{"babel-runtime/helpers/extends":209,"babel-runtime/core-js/object/get-prototype-of":103,"babel-runtime/helpers/classCallCheck":104,"babel-runtime/helpers/createClass":105,"babel-runtime/helpers/possibleConstructorReturn":106,"babel-runtime/helpers/inherits":107,"react":10,"antd":100,"react-router-dom":11,"../nav":206}],99:[function(require,module,exports) {
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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _antd = require('antd');

var _reactRouterDom = require('react-router-dom');

require('moment/locale/zh-cn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var site = 'https://prevue.oss-cn-shenzhen.aliyuncs.com/';
var Meta = _antd.Card.Meta;
var DPlayer = window.DPlayer;

_moment2.default.locale('zh-cn');

var Content = function (_Component) {
  (0, _inherits3.default)(Content, _Component);

  function Content() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Content);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Content.__proto__ || (0, _getPrototypeOf2.default)(Content)).call.apply(_ref, [this].concat(args))), _this), _this.state = { visible: false }, _this._handleClose = function (e) {
      if (_this.player && _this.player.pause) {
        _this.player.pause();
      }
    }, _this._handleCancel = function (e) {
      _this.setState({
        visible: false
      });
    }, _this._jumpToDetail = function () {
      var url = _this.props.url;


      url && window.open(url);
    }, _this._showModal = function (movie) {
      _this.setState({
        visible: true
      });

      var video = site + movie.videoKey;
      var pic = site + movie.coverKey;

      if (!_this.player) {
        setTimeout(function () {
          _this.player = new DPlayer({
            container: document.getElementsByClassName('videoModal')[0],
            screenshot: true,
            autoplay: true,
            video: {
              url: video,
              pic: pic,
              thumbnails: pic
            }
          });
        }, 500);
      } else {
        if (_this.player.video.currentSrc !== video) {
          _this.player.switchVideo({
            url: video,
            autoplay: true,
            pic: pic,
            type: 'auto'
          });
        }

        _this.player.play();
      }
    }, _this._renderContent = function () {
      var movies = _this.props.movies;


      return _react2.default.createElement(
        'div',
        { style: { padding: '30px' } },
        _react2.default.createElement(
          _antd.Row,
          null,
          movies.map(function (it, i) {
            return _react2.default.createElement(
              _antd.Col,
              {
                key: i,
                xl: { span: 6 },
                lg: { span: 8 },
                md: { span: 12 },
                sm: { span: 24 },
                style: { marginBottom: '8px' }
              },
              _react2.default.createElement(
                _antd.Card,
                {
                  bordered: false,
                  hoverable: true,
                  style: { width: '100%' },
                  actions: [_react2.default.createElement(
                    _antd.Badge,
                    null,
                    _react2.default.createElement(_antd.Icon, { style: { marginRight: '2px' }, type: 'clock-circle' }),
                    (0, _moment2.default)(it.meta.createdAt).fromNow(true),
                    ' \u524D\u66F4\u65B0'
                  ), _react2.default.createElement(
                    _antd.Badge,
                    null,
                    _react2.default.createElement(_antd.Icon, { style: { marginRight: '2px' }, type: 'star' }),
                    it.rate,
                    ' \u5206'
                  )],
                  cover: _react2.default.createElement('img', { onClick: function onClick() {
                      return _this._showModal(it);
                    }, src: site + it.posterKey + '?x-oss-process=image/resize,m_fixed,h_400,w_270/rounded-corners,r_10/format,png' })
                },
                _react2.default.createElement(Meta, {
                  style: { height: '202px', overflow: 'hidden' },
                  title: _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/detail/' + it._id },
                    it.title
                  ),
                  onClick: _this._jumpToDetail,
                  description: _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/detail/' + it._id },
                    it.summary
                  )
                })
              )
            );
          })
        ),
        _react2.default.createElement(
          _antd.Modal,
          {
            className: 'videoModal',
            footer: null,
            visible: _this.state.visible,
            afterClose: _this._handleClose,
            onCancel: _this._handleCancel
          },
          _react2.default.createElement(_antd.Spin, { size: 'large' })
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Content, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { padding: 10 } },
        this._renderContent()
      );
    }
  }]);
  return Content;
}(_react.Component);

exports.default = Content;
},{"babel-runtime/core-js/object/get-prototype-of":103,"babel-runtime/helpers/classCallCheck":104,"babel-runtime/helpers/createClass":105,"babel-runtime/helpers/possibleConstructorReturn":106,"babel-runtime/helpers/inherits":107,"react":10,"moment":101,"antd":100,"react-router-dom":11,"moment/locale/zh-cn":108}],57:[function(require,module,exports) {
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

var _default = require('../layouts/default');

var _default2 = _interopRequireDefault(_default);

var _lib = require('../lib');

var _content = require('./content');

var _content2 = _interopRequireDefault(_content);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home(props) {
    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

    _this._selectItem = function (_ref) {
      var key = _ref.key;

      _this.setState({
        selectedKey: key
      });
    };

    _this._getAllMovies = function () {
      (0, _lib.request)(window.__LOADING__)({
        method: 'get',
        url: '/api/movies?type=' + (_this.state.type || '') + '&year=' + (_this.state.year || '')
      }).then(function (res) {
        _this.setState({
          movies: res
        });
      }).catch(function () {
        _this.setState({
          movies: []
        });
      });
    };

    _this._renderContent = function () {
      var movies = _this.state.movies;


      if (!movies || !movies.length) return null;

      return _react2.default.createElement(_content2.default, { movies: movies });
    };

    _this.state = {
      years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
      type: _this.props.match.params.type,
      year: _this.props.match.params.year,
      movies: []
    };
    return _this;
  }

  (0, _createClass3.default)(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._getAllMovies();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          years = _state.years,
          selectedKey = _state.selectedKey;

      return _react2.default.createElement(
        _default2.default,
        this.props,
        _react2.default.createElement(
          'div',
          { className: 'flex-row full' },
          _react2.default.createElement(
            _antd.Menu,
            {
              defaultSelectedKeys: [selectedKey],
              mode: 'inline',
              style: { height: '100%', overflowY: 'scroll', maxWidth: 230 },
              onSelect: this._selectItem,
              className: 'align-self-start' },
            years.map(function (e, i) {
              return _react2.default.createElement(
                _antd.Menu.Item,
                { key: i },
                _react2.default.createElement(
                  'a',
                  { href: '/year/' + e },
                  e,
                  ' \u5E74\u4E0A\u6620'
                )
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'flex-1 scroll-y align-self-start' },
            this._renderContent()
          )
        )
      );
    }
  }]);
  return Home;
}(_react.Component);

exports.default = Home;
},{"babel-runtime/core-js/object/get-prototype-of":103,"babel-runtime/helpers/classCallCheck":104,"babel-runtime/helpers/createClass":105,"babel-runtime/helpers/possibleConstructorReturn":106,"babel-runtime/helpers/inherits":107,"react":10,"../layouts/default":98,"../lib":110,"./content":99,"antd":100}],9947:[function(require,module,exports) {
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
},{}]},{},[9947,57], null)
//# sourceMappingURL=/home.6278a9b2.map