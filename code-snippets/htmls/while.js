// ==UserScript==
// @name            计时器掌控者|视频广告跳过|视频广告加速器
// @name:en         TimerHooker
// @namespace       https://gitee.com/HGJing/everthing-hook/
// @homepageURL     https://timer.palerock.cn
// @downloadURL     https://palerock.cn/node-service/scripts/install/@hook-js_timer/hook.timer.user.js
// @updateURL       https://palerock.cn/node-service/scripts/update/@hook-js_timer/hook.timer.user.js
// @version         2.0.12
// @description     控制网页计时器速度|加速跳过页面计时广告|视频快进（慢放）|跳过广告|支持几乎所有网页.
// @description:en  it can hook the timer speed to change.
// @include         *
// @author          Cangshi
// @run-at          document-start
// @grant           unsafeWindow

// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_listValues
// @grant           GM_deleteValue
// @grant           GM_addValueChangeListener
// @grant           GM_removeValueChangeListener
// @grant           GM_log
// @grant           GM_registerMenuCommand
// @grant           GM_unregisterMenuCommand
// @grant           GM_openInTab
// @grant           GM_xmlhttpRequest
// @grant           GM_getTab
// @grant           GM_saveTab
// @grant           GM_notification
// @grant           GM_setClipboard

// @grant           GM.deleteValue
// @grant           GM.getValue
// @grant           GM.listValues
// @grant           GM.setValue

// @grant           GM.getResourceUrl
// @grant           GM.notification
// @grant           GM.registerMenuCommand
// @grant           GM.xmlHttpRequest
// ==/UserScript==

!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t =
        'undefined' != typeof globalThis ? globalThis : t || self).$hookTimer =
        e())
})(this, function () {
  'use strict'
  function t(t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function')
  }
  function e(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n]
      ;(r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r)
    }
  }
  function n(t, n, r) {
    return n && e(t.prototype, n), r && e(t, r), t
  }
  function r(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      )
    return t
  }
  function o(t, e) {
    return (o =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t
      })(t, e)
  }
  function i(t, e) {
    if ('function' != typeof e && null !== e)
      throw new TypeError('Super expression must either be null or a function')
    ;(t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 }
    })),
      e && o(t, e)
  }
  function a(t) {
    return (a =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              'function' == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          })(t)
  }
  function u(t, e) {
    return !e || ('object' !== a(e) && 'function' != typeof e) ? r(t) : e
  }
  function c(t) {
    return (c = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
  }
  function l(t, e, n) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (t[e] = n),
      t
    )
  }
  var s,
    f,
    h,
    d = 1e3
  function y() {
    return d++
  }
  function p() {
    return (
      null == s &&
        (s = 'undefined' == typeof unsafeWindow ? window : unsafeWindow),
      s
    )
  }
  function v() {
    var t = p().parent !== p()
    try {
      t = t && 'FRAMESET' !== p().parent.document.body.tagName
    } catch (t) {}
    return t
  }
  function g(t) {
    var e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1 / 0,
      n =
        Array.prototype.flat ||
        function () {
          var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 1 / 0
          if (t < 1) return this
          var e = [],
            r = t - 1
          return (
            this.forEach(function (t) {
              t instanceof Array ? (e = e.concat(n.call(t, r))) : e.push(t)
            }),
            e
          )
        }
    return n.call(t, e)
  }
  function m(t, e) {
    ;(null == e || e > t.length) && (e = t.length)
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
    return r
  }
  function b(t, e) {
    if (t) {
      if ('string' == typeof t) return m(t, e)
      var n = Object.prototype.toString.call(t).slice(8, -1)
      return (
        'Object' === n && t.constructor && (n = t.constructor.name),
        'Map' === n || 'Set' === n
          ? Array.from(t)
          : 'Arguments' === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? m(t, e)
          : void 0
      )
    }
  }
  function w(t, e) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t
      })(t) ||
      (function (t, e) {
        var n =
          t &&
          (('undefined' != typeof Symbol && t[Symbol.iterator]) ||
            t['@@iterator'])
        if (null != n) {
          var r,
            o,
            i = [],
            a = !0,
            u = !1
          try {
            for (
              n = n.call(t);
              !(a = (r = n.next()).done) &&
              (i.push(r.value), !e || i.length !== e);
              a = !0
            );
          } catch (t) {
            ;(u = !0), (o = t)
          } finally {
            try {
              a || null == n.return || n.return()
            } finally {
              if (u) throw o
            }
          }
          return i
        }
      })(t, e) ||
      b(t, e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
      })()
    )
  }
  function k(t, e) {
    var n =
      ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator']
    if (!n) {
      if (
        Array.isArray(t) ||
        (n = (function (t, e) {
          if (!t) return
          if ('string' == typeof t) return x(t, e)
          var n = Object.prototype.toString.call(t).slice(8, -1)
          'Object' === n && t.constructor && (n = t.constructor.name)
          if ('Map' === n || 'Set' === n) return Array.from(t)
          if (
            'Arguments' === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return x(t, e)
        })(t)) ||
        (e && t && 'number' == typeof t.length)
      ) {
        n && (t = n)
        var r = 0,
          o = function () {}
        return {
          s: o,
          n: function () {
            return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] }
          },
          e: function (t) {
            throw t
          },
          f: o
        }
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    }
    var i,
      a = !0,
      u = !1
    return {
      s: function () {
        n = n.call(t)
      },
      n: function () {
        var t = n.next()
        return (a = t.done), t
      },
      e: function (t) {
        ;(u = !0), (i = t)
      },
      f: function () {
        try {
          a || null == n.return || n.return()
        } finally {
          if (u) throw i
        }
      }
    }
  }
  function x(t, e) {
    ;(null == e || e > t.length) && (e = t.length)
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
    return r
  }
  function O() {
    return (
      null == h &&
        (h = 'undefined' == typeof unsafeWindow ? window : unsafeWindow),
      h
    )
  }
  function R() {
    var t = O().parent !== O()
    try {
      t = t && 'FRAMESET' !== O().parent.document.body.tagName
    } catch (t) {}
    return t
  }
  !(function (t) {
    ;(t.BOOLEAN = 'boolean'),
      (t.STRING = 'string'),
      (t.NUMBER = 'number'),
      (t.SHORTCUT = 'shortcut'),
      (t.LONG_STRING = 'long_string'),
      (t.DATE = 'date'),
      (t.COLOR = 'color'),
      (t.ARRAY = 'array'),
      (t.PICKLIST = 'picklist'),
      (t.DUELING_PICKLIST = 'dueling_picklist')
  })(f || (f = {}))
  var M = '__hooks_load_module',
    _ = Object.getOwnPropertyNames.bind(Object),
    A = Object.getPrototypeOf.bind(Object)
  function S(t) {
    var e,
      n = {},
      r = k(_(t))
    try {
      for (r.s(); !(e = r.n()).done; ) {
        var o = e.value
        n[o] = t[o]
      }
    } catch (t) {
      r.e(t)
    } finally {
      r.f()
    }
    return n
  }
  var C = [[Array.prototype], [Object, !1]].map(function (t) {
    var e = w(t, 1)[0]
    return [e, S(e)]
  })
  function T(t) {
    var e,
      n = k(C)
    try {
      for (n.s(); !(e = n.n()).done; ) {
        var r = w(e.value, 2),
          o = r[0],
          i = r[1]
        if (t === o) return i
      }
    } catch (t) {
      n.e(t)
    } finally {
      n.f()
    }
    return t
  }
  function I(t, e) {
    return (function (t, e) {
      var n = T(
          arguments.length > 2 && void 0 !== arguments[2] && !arguments[2]
            ? t
            : A(t)
        ),
        r = n[e]
      return 'function' == typeof r ? r.bind(t) : n[e]
    })(e.conditions || [], 'reduce')(function (e, n) {
      return (
        e ||
        Object.entries(n).every(function (e) {
          var n = w(e, 2),
            r = n[0],
            o = n[1]
          return t[r] === o
        })
      )
    }, !1)
  }
  var E = {}
  try {
    E.addStyle = GM_addStyle
  } catch (t) {}
  try {
    E.addElement = GM_addElement
  } catch (t) {}
  try {
    E.deleteValue = GM_deleteValue
  } catch (t) {}
  try {
    E.listValues = GM_listValues
  } catch (t) {}
  try {
    E.getValue = GM_getValue
  } catch (t) {}
  try {
    E.setValue = GM_setValue
  } catch (t) {}
  try {
    E.addValueChangeListener = GM_addValueChangeListener
  } catch (t) {}
  try {
    E.removeValueChangeListener = GM_removeValueChangeListener
  } catch (t) {}
  try {
    E.xmlhttpRequest = GM_xmlhttpRequest
  } catch (t) {}
  try {
    E.registerMenuCommand = GM_registerMenuCommand
  } catch (t) {}
  try {
    E.unregisterMenuCommand = GM_unregisterMenuCommand
  } catch (t) {}
  try {
    E.download = GM_download
  } catch (t) {}
  try {
    E.log = GM_log
  } catch (t) {}
  try {
    E.openInTab = GM_openInTab
  } catch (t) {}
  try {
    E.setClipboard = GM_setClipboard
  } catch (t) {}
  try {
    E.info = GM_info
  } catch (t) {}
  try {
    E.getResourceText = GM_getResourceText
  } catch (t) {}
  try {
    E.getResourceURL = GM_getResourceURL
  } catch (t) {}
  try {
    E.getTab = GM_getTab
  } catch (t) {}
  try {
    E.getTabs = GM_getTabs
  } catch (t) {}
  try {
    E.saveTab = GM_saveTab
  } catch (t) {}
  try {
    E.notification = GM_notification
  } catch (t) {}
  var j = window,
    D = new Proxy(
      {},
      {
        get: function (t, e) {
          var n = ['GM', e].join('_')
          return j[n] ? j[n] : E[e] ? E[e] : j.GM && j.GM[e] ? j.GM[e] : void 0
        }
      }
    ),
    P = function () {
      if (!R()) {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
          e[n] = arguments[n]
        var r
        if ((e.unshift('[TimerHook]'), 'function' == typeof D.log))
          D.log(e.join(' '))
        else (r = console).log.apply(r, e)
      }
    },
    N = function () {
      if (!R()) {
        for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++)
          n[r] = arguments[r]
        n.unshift('[TimerHook]'), (t = console).warn.apply(t, n)
      }
    },
    L = (function () {
      function e() {
        t(this, e),
          l(this, 'host', void 0),
          l(this, 'isActive', !1),
          l(this, 'isMountHost', !1)
      }
      return (
        n(e, [
          {
            key: 'mountHost',
            value: function (t) {
              ;(this.host = t), (this.isMountHost = !0), this.onMounted()
            }
          },
          {
            key: 'activate',
            value: function () {
              ;(this.isActive = !0), this.init()
            }
          },
          {
            key: 'deactivate',
            value: function () {
              ;(this.isActive = !1), this.onDestroy()
            }
          },
          { key: 'moduleName', get: function () {} },
          {
            key: 'priority',
            get: function () {
              return 50
            }
          },
          {
            key: 'autoActivate',
            get: function () {
              return !0
            }
          },
          {
            key: 'isCoreModule',
            get: function () {
              return !1
            }
          },
          {
            key: 'isOnlyOuterIframe',
            get: function () {
              return !1
            }
          },
          {
            key: 'getDependencyModule',
            value: function (t) {
              if (null != this.host) {
                var e = this.host.getModule(t)
                return e && e.moduleIdentityName ? e : void 0
              }
            }
          },
          { key: 'init', value: function () {} },
          { key: 'onMounted', value: function () {} },
          { key: 'onDestroy', value: function () {} },
          {
            key: 'declareConfigs',
            value: function () {
              return []
            }
          },
          {
            key: 'setConfig',
            value: function (t, e) {
              var n = this.getDependencyModule('configs')
              ;(n && n.available()) ||
                N("Config module not found, can't set configs values."),
                n.setValue(this.moduleIdentityName, t, e)
            }
          },
          {
            key: 'getConfig',
            value: function (t) {
              var e,
                n = this.getDependencyModule('configs'),
                r = (
                  this.declareConfigs().find(function (e) {
                    return e.key === t
                  }) || {}
                ).default
              return n &&
                n.available() &&
                null !== (e = n.getValue(this.moduleIdentityName, t)) &&
                void 0 !== e
                ? e
                : r
            }
          },
          {
            key: 'window',
            get: function () {
              return this.host ? this.host.getWindow() : O()
            }
          },
          {
            key: 'document',
            get: function () {
              return this.window.document
            }
          }
        ]),
        e
      )
    })()
  function B(t, e, n) {
    return (B =
      'undefined' != typeof Reflect && Reflect.get
        ? Reflect.get
        : function (t, e, n) {
            var r = (function (t, e) {
              for (
                ;
                !Object.prototype.hasOwnProperty.call(t, e) &&
                null !== (t = c(t));

              );
              return t
            })(t, e)
            if (r) {
              var o = Object.getOwnPropertyDescriptor(r, e)
              return o.get ? o.get.call(n) : o.value
            }
          })(t, e, n || t)
  }
  function V(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  var U = (function (e) {
    i(a, e)
    var o = V(a)
    function a() {
      var e
      t(this, a)
      for (var n = arguments.length, i = new Array(n), u = 0; u < n; u++)
        i[u] = arguments[u]
      return (
        l(r((e = o.call.apply(o, [this].concat(i)))), 'rate', 1),
        l(r(e), 'host', void 0),
        e
      )
    }
    return (
      n(a, [
        {
          key: 'onRateChange',
          value: function (t) {
            this.rate = t
          }
        },
        {
          key: 'mountHost',
          value: function (t) {
            B(c(a.prototype), 'mountHost', this).call(this, t),
              (this.rate = t.rate)
          }
        }
      ]),
      a
    )
  })(L)
  function G(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  var H = (function (e) {
    i(a, e)
    var o = G(a)
    function a() {
      var e
      t(this, a)
      for (var n = arguments.length, i = new Array(n), u = 0; u < n; u++)
        i[u] = arguments[u]
      return (
        l(r((e = o.call.apply(o, [this].concat(i)))), 'isDOMLoaded', !1),
        l(r(e), 'waitDomLoadedCallback', void 0),
        e
      )
    }
    return (
      n(a, [
        {
          key: 'onMounted',
          value: function () {
            var t = this
            B(c(a.prototype), 'onMounted', this).call(this),
              this.document.addEventListener('readystatechange', function () {
                ;('interactive' !== t.document.readyState &&
                  'complete' !== t.document.readyState) ||
                  ((t.isDOMLoaded = !0),
                  'function' == typeof t.waitDomLoadedCallback &&
                    t.waitDomLoadedCallback(void 0))
              })
          }
        },
        {
          key: 'waitDomLoaded',
          value: function () {
            var t,
              e,
              n,
              r = this
            return this.isDOMLoaded ||
              (null !== (t = this.document) &&
                void 0 !== t &&
                null !== (e = t.body) &&
                void 0 !== e &&
                null !== (n = e.childNodes) &&
                void 0 !== n &&
                n.length)
              ? Promise.resolve()
              : new Promise(function (t) {
                  r.waitDomLoadedCallback = t
                })
          }
        },
        {
          key: 'applyStyle',
          value: function (t) {
            var e = this.style(),
              n = this.document.createElement('style')
            if ((n.setAttribute('type', 'text/css'), n.styleSheet))
              n.styleSheet.cssText = e
            else {
              var r = this.document.createTextNode(e)
              n.appendChild(r)
            }
            t.appendChild(n)
          }
        },
        {
          key: 'applyElement',
          value: function () {
            var t = this.element()
            return this.document.body.appendChild(t), t
          }
        },
        { key: 'onUiRateChange', value: function (t) {} },
        {
          key: 'onRateChange',
          value: function (t) {
            var e = this.rate !== t
            B(c(a.prototype), 'onRateChange', this).call(this, t),
              e && this.onUiRateChange(t)
          }
        },
        {
          key: 'init',
          value: function () {
            var t = this
            P(
              "Started to loading '".concat(
                this.moduleIdentityName,
                "' component..."
              )
            ),
              this.waitDomLoaded().then(function () {
                t.applyStyle(t.applyElement()),
                  P("UI component '".concat(t.moduleIdentityName, "' loaded."))
              })
          }
        }
      ]),
      a
    )
  })(U)
  function W(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  var q = 'hook_timer__change_rate',
    F = (function (e) {
      i(a, e)
      var o = W(a)
      function a() {
        var e
        t(this, a)
        for (var n = arguments.length, i = new Array(n), u = 0; u < n; u++)
          i[u] = arguments[u]
        return (
          l(r((e = o.call.apply(o, [this].concat(i)))), 'rate', 1),
          l(r(e), 'state', 'preparing'),
          l(r(e), 'setIntervalOrigin', void 0),
          l(r(e), 'clearIntervalOrigin', void 0),
          l(r(e), 'inTimeCheckId', void 0),
          e
        )
      }
      return (
        n(a, [
          {
            key: 'setSpeed',
            value: function (t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
              if (
                (0 === t && (t = this.defaultRate),
                t &&
                  (t !== this.rate || e) &&
                  t > 0 &&
                  ((this.rate = t), this.onRateChanged(t)),
                null == t)
              ) {
                var n = prompt(
                  '输入欲改变计时器变化倍率（当前：' + this.rate + '）'
                )
                n && this.setSpeed(parseFloat(n))
              }
            }
          },
          {
            key: 'speedDown',
            value: function (t) {
              null == t && (t = this.getConfig('decrementRate')),
                this.setSpeed(this.rate - t)
            }
          },
          {
            key: 'speedUp',
            value: function (t) {
              null == t && (t = this.getConfig('incrementRate')),
                this.setSpeed(this.rate + t)
            }
          },
          {
            key: 'speedDivide',
            value: function (t) {
              null == t && (t = this.getConfig('divideRate')),
                this.setSpeed(this.rate / (t || 1))
            }
          },
          {
            key: 'speedMultiply',
            value: function (t) {
              null == t && (t = this.getConfig('multiplyRate')),
                this.setSpeed(this.rate * (t || 1))
            }
          },
          {
            key: 'onRateChanged',
            value: function (t) {
              P('Timer speed rate changed to:', t),
                this.sentChangesToIframe(),
                this.getAllActivateModules()
                  .filter(function (t) {
                    return t.onRateChange
                  })
                  .forEach(function (e) {
                    e.onRateChange(t)
                  })
            }
          },
          {
            key: 'beginInTimeCheck',
            value: function () {
              var t = this
              this.keptInTime &&
                (this.inTimeCheckId = this.setIntervalOrigin.call(
                  this.getWindow(),
                  function () {
                    t.rate && 1 !== t.rate && t.setSpeed(t.rate, !0)
                  },
                  this.keptInterval
                ))
            }
          },
          {
            key: 'catchOriginMethod',
            value: function () {
              ;(this.setIntervalOrigin = this.getWindow().setInterval),
                (this.clearIntervalOrigin = this.getWindow().clearInterval)
            }
          },
          {
            key: 'keptInTime',
            get: function () {
              return this.getConfig('keptInTime')
            }
          },
          {
            key: 'keptInterval',
            get: function () {
              return this.getConfig('keptInterval')
            }
          },
          {
            key: 'defaultRate',
            get: function () {
              return this.getConfig('defaultRate')
            }
          },
          {
            key: 'bootstrap',
            value: function () {
              'preparing' === this.state &&
                (this.catchOriginMethod(),
                this.listenParentEvent(),
                this.launchModules(this.getAllModules()),
                this.setSpeed(this.defaultRate),
                this.beginInTimeCheck(),
                this.waitForModulesLoad(),
                (this.state = 'started'))
            }
          },
          {
            key: 'launchModules',
            value: function (t) {
              var e = this
              t.filter(function (t) {
                return t.autoActivate
              }).forEach(function (t) {
                var n = t.moduleIdentityName
                ;(e.deactivateModules.includes(n) && !t.isCoreModule) ||
                  e.activateModule(n)
              })
            }
          },
          {
            key: 'registerModules',
            value: function (t) {
              var e = this
              return t.filter(function (t) {
                var n = t.moduleIdentityName
                return n && e.registerModule(t, t.isOnlyOuterIframe), n
              })
            }
          },
          {
            key: 'waitForModulesLoad',
            value: function () {
              var t = this,
                e = this.getWindow().___hooks_preModules || []
              e.length > 0 && this.launchModules(this.registerModules(e)),
                (this.getWindow()[M] = 1),
                this.getWindow().addEventListener(M, function (e) {
                  e.detail &&
                    e.detail.moduleIdentityName &&
                    t.launchModules(t.registerModules([e.detail]))
                })
            }
          },
          {
            key: 'exportOuter',
            value: function () {
              var t = this
              this.getWindow()._OxA
                ? ((this.getWindow().$hookTimer = this),
                  (this.getWindow()._OxA = this))
                : Object.defineProperty(this.getWindow(), '_OxA', {
                    get: function () {
                      return 1
                    },
                    set: function (e) {
                      '_OxA' === e && (t.getWindow().$hookTimer = t)
                    }
                  })
            }
          },
          {
            key: 'listenParentEvent',
            value: function () {
              var t = this
              v() &&
                this.getWindow().addEventListener('message', function (e) {
                  var n = e.data
                  ;(n.type || '') === q && t.setSpeed(n.rate || 0)
                })
            }
          },
          {
            key: 'deactivateModules',
            get: function () {
              return this.getConfig('deactivateModules')
            }
          },
          {
            key: 'sentChangesToIframe',
            value: function () {
              var t = this.getWindow().document,
                e = t.querySelectorAll('iframe') || [],
                n = t.querySelectorAll('frame')
              if (e.length)
                for (var r = 0; r < e.length; r++)
                  e[r].contentWindow.postMessage(
                    { type: q, rate: this.rate },
                    '*'
                  )
              if (n.length)
                for (var o = 0; o < n.length; o++)
                  n[o].contentWindow.postMessage(
                    { type: q, rate: this.rate },
                    '*'
                  )
            }
          },
          {
            key: 'declareConfigs',
            value: function () {
              return [
                { key: 'multiplyRate', type: f.NUMBER, default: 2 },
                { key: 'divideRate', type: f.NUMBER, default: 2 },
                { key: 'decrementRate', type: f.NUMBER, default: 2 },
                { key: 'incrementRate', type: f.NUMBER, default: 2 },
                { key: 'defaultRate', type: f.NUMBER, default: 1 },
                { key: 'keptInTime', type: f.BOOLEAN, default: !0 },
                { key: 'keptInterval', type: f.NUMBER, default: 4e3 },
                {
                  key: 'deactivateModules',
                  type: f.ARRAY,
                  values: this.getAllModules().map(function (t) {
                    return { key: t.moduleIdentityName }
                  }),
                  default: []
                }
              ]
            }
          },
          {
            key: 'setConfig',
            value: function (t, e) {
              var n = this.getModule('configs')
              ;(n && n.available()) ||
                N("Config module not found, can't set configs values."),
                n.setValue('host', t, e)
            }
          },
          {
            key: 'getConfig',
            value: function (t) {
              var e,
                n = this.getModule('configs'),
                r = (
                  this.declareConfigs().find(function (e) {
                    return e.key === t
                  }) || {}
                ).default
              return n &&
                n.available() &&
                null !== (e = n.getValue('host', t)) &&
                void 0 !== e
                ? e
                : r
            }
          }
        ]),
        a
      )
    })(
      (function () {
        function e() {
          t(this, e), l(this, 'modules', {})
        }
        return (
          n(e, [
            {
              key: 'activateModule',
              value: function (t) {
                var e = this.getModule(t)
                e
                  ? (e.activate(), P("Module - '".concat(t, "' activated")))
                  : N('Activate module failed, '.concat(t, ' is not found'))
              }
            },
            {
              key: 'deactivateModule',
              value: function (t) {
                var e = this.getModule(t)
                e ||
                  N("Deactivate module failed, '".concat(t, "' is not found")),
                  e.deactivate()
              }
            },
            {
              key: 'getModule',
              value: function (t) {
                return this.modules[t]
              }
            },
            {
              key: 'registerModule',
              value: function (t) {
                var e =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1]
                ;(e && v()) ||
                  ((this.modules[t.moduleIdentityName] = t), t.mountHost(this))
              }
            },
            {
              key: 'getAllActivateModules',
              value: function () {
                return Object.values(this.modules).filter(function (t) {
                  return t.isActive
                })
              }
            },
            {
              key: 'getAllModules',
              value: function () {
                return Object.values(this.modules)
              }
            },
            {
              key: 'getWindow',
              value: function () {
                return p()
              }
            }
          ]),
          e
        )
      })()
    )
  var z = function (t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function')
  }
  function Y(t, e) {
    return t((e = { exports: {} }), e.exports), e.exports
  }
  var $ = Y(function (t) {
    function e(n, r) {
      return (
        (t.exports = e =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t
          }),
        e(n, r)
      )
    }
    t.exports = e
  })
  var K = function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError(
          'Super expression must either be null or a function'
        )
      ;(t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 }
      })),
        e && $(t, e)
    },
    J = Y(function (t) {
      function e(n) {
        return (
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? (t.exports = e =
                function (t) {
                  return typeof t
                })
            : (t.exports = e =
                function (t) {
                  return t &&
                    'function' == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t
                }),
          e(n)
        )
      }
      t.exports = e
    })
  var Q = function (t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      )
    return t
  }
  var X = function (t, e) {
      return !e || ('object' !== J(e) && 'function' != typeof e) ? Q(t) : e
    },
    Z = Y(function (t) {
      function e(n) {
        return (
          (t.exports = e =
            Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t)
                }),
          e(n)
        )
      }
      t.exports = e
    })
  var tt = function (t, e) {
    ;(null == e || e > t.length) && (e = t.length)
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
    return r
  }
  var et = function (t) {
    if (Array.isArray(t)) return tt(t)
  }
  var nt = function (t) {
    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
      return Array.from(t)
  }
  var rt = function (t, e) {
    if (t) {
      if ('string' == typeof t) return tt(t, e)
      var n = Object.prototype.toString.call(t).slice(8, -1)
      return (
        'Object' === n && t.constructor && (n = t.constructor.name),
        'Map' === n || 'Set' === n
          ? Array.from(t)
          : 'Arguments' === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? tt(t, e)
          : void 0
      )
    }
  }
  var ot = function () {
    throw new TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  var it = function (t) {
    return et(t) || nt(t) || rt(t) || ot()
  }
  function at(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n]
      ;(r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r)
    }
  }
  var ut = function (t, e, n) {
    return e && at(t.prototype, e), n && at(t, n), t
  }
  var ct = function (t, e) {
      for (
        ;
        !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = Z(t));

      );
      return t
    },
    lt = Y(function (t) {
      function e(n, r, o) {
        return (
          'undefined' != typeof Reflect && Reflect.get
            ? (t.exports = e = Reflect.get)
            : (t.exports = e =
                function (t, e, n) {
                  var r = ct(t, e)
                  if (r) {
                    var o = Object.getOwnPropertyDescriptor(r, e)
                    return o.get ? o.get.call(n) : o.value
                  }
                }),
          e(n, r, o || n)
        )
      }
      t.exports = e
    })
  var st = function (t) {
    return -1 !== Function.toString.call(t).indexOf('[native code]')
  }
  var ft = function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    },
    ht = Y(function (t) {
      function e(n, r, o) {
        return (
          ft()
            ? (t.exports = e = Reflect.construct)
            : (t.exports = e =
                function (t, e, n) {
                  var r = [null]
                  r.push.apply(r, e)
                  var o = new (Function.bind.apply(t, r))()
                  return n && $(o, n.prototype), o
                }),
          e.apply(null, arguments)
        )
      }
      t.exports = e
    }),
    dt = Y(function (t) {
      function e(n) {
        var r = 'function' == typeof Map ? new Map() : void 0
        return (
          (t.exports = e =
            function (t) {
              if (null === t || !st(t)) return t
              if ('function' != typeof t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              if (void 0 !== r) {
                if (r.has(t)) return r.get(t)
                r.set(t, e)
              }
              function e() {
                return ht(t, arguments, Z(this).constructor)
              }
              return (
                (e.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                  }
                })),
                $(e, t)
              )
            }),
          e(n)
        )
      }
      t.exports = e
    })
  function yt(t, e) {
    var n =
        arguments.length > 2 && void 0 !== arguments[2]
          ? arguments[2]
          : 'initAssign',
      r = Object.getPrototypeOf(e)
    return (
      Object.setPrototypeOf(t, r),
      'function' == typeof r[n] && r[n].call(t, e),
      t
    )
  }
  function pt(t) {
    return Number(Math.random().toString().substr(3, t) + Date.now()).toString(
      36
    )
  }
  function vt(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = Z(t)
      if (e) {
        var o = Z(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return X(this, n)
    }
  }
  !(function (t, e) {
    t((e = { exports: {} }), e.exports)
  })(function (t) {
    function e(n) {
      return (
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? (t.exports = e =
              function (t) {
                return typeof t
              })
          : (t.exports = e =
              function (t) {
                return t &&
                  'function' == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? 'symbol'
                  : typeof t
              }),
        e(n)
      )
    }
    t.exports = e
  })
  var gt = {
    instanceType: (function (t) {
      K(n, t)
      var e = vt(n)
      function n() {
        return z(this, n), e.apply(this, arguments)
      }
      return (
        ut(n, [
          {
            key: 'initAssign',
            value: function (t) {
              ;(this.id = pt(7)),
                (function (t, e, n, r) {
                  e && void 0 !== e[n]
                    ? (t[n] = e[n])
                    : 'function' == typeof r && (t[n] = r())
                })(this, t, 'uniqueId', function () {
                  return pt(7)
                })
            }
          },
          {
            key: 'bind',
            value: function (t) {
              var e,
                r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : []
              return yt(
                (e = lt(Z(n.prototype), 'bind', this)).call.apply(
                  e,
                  [this, t].concat(it(r))
                ),
                this
              )
            }
          },
          {
            key: 'before',
            value: function (t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
              return this.surround({ before: t, adaptAsync: e })
            }
          },
          {
            key: 'after',
            value: function (t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
              return this.surround({ after: t, adaptAsync: e })
            }
          },
          {
            key: 'surround',
            value: function (t) {
              var e = t.before,
                n = void 0 === e ? void 0 : e,
                r = t.after,
                o = void 0 === r ? void 0 : r,
                i = t.onError,
                a = void 0 === i ? void 0 : i,
                u = t.adaptAsync,
                c = void 0 !== u && u,
                l = this
              return 'function' != typeof l
                ? l
                : yt(function () {
                    for (
                      var t = this,
                        e = arguments.length,
                        r = new Array(e),
                        i = 0;
                      i < e;
                      i++
                    )
                      r[i] = arguments[i]
                    var u = {},
                      s = { origin: l, args: r, trans: u },
                      f = 'function' == typeof a
                    try {
                      var h,
                        d,
                        y = !1
                      return 'function' == typeof n &&
                        ((h = n.call(
                          this,
                          Object.assign({}, s, {
                            preventDefault: function () {
                              y = !0
                            }
                          })
                        )),
                        y)
                        ? h
                        : ((d =
                            h instanceof Promise && c
                              ? h.then(function () {
                                  return l.apply(t, r)
                                })
                              : l.apply(this, r)),
                          'function' == typeof o &&
                            (d =
                              d instanceof Promise && c
                                ? d.then(function (e) {
                                    return o.call(
                                      t,
                                      Object.assign({}, s, { lastValue: e })
                                    )
                                  })
                                : o.call(
                                    this,
                                    Object.assign({}, s, { lastValue: d })
                                  )),
                          d instanceof Promise && c && f
                            ? d.catch(function (e) {
                                var n = !1,
                                  r = ''
                                return Promise.resolve(
                                  a.call(
                                    t,
                                    Object.assign({}, s, {
                                      error: e,
                                      resolve: function (t) {
                                        ;(r = t), (n = !0)
                                      }
                                    })
                                  )
                                ).then(function (t) {
                                  if (!n) throw e
                                  return r || t
                                })
                              })
                            : d)
                    } catch (t) {
                      if (!f) throw t
                      var p = !1,
                        v = '',
                        g = function (t) {
                          ;(v = t), (p = !0)
                        },
                        m = a.call(
                          this,
                          Object.assign({}, s, { error: t, resolve: g })
                        )
                      if (!p) throw t
                      return v || m
                    }
                  }, this)
            }
          },
          {
            key: 'then',
            value: function (t) {
              var e = this
              return yt(function () {
                for (
                  var n = arguments.length, r = new Array(n), o = 0;
                  o < n;
                  o++
                )
                  r[o] = arguments[o]
                var i = e.apply(this, r)
                return Promise.resolve(i).then(t)
              }, this)
            }
          },
          {
            key: 'catch',
            value: function (t) {
              var e = this
              return yt(function () {
                var n
                try {
                  for (
                    var r = arguments.length, o = new Array(r), i = 0;
                    i < r;
                    i++
                  )
                    o[i] = arguments[i]
                  if ((n = e.apply(this, o)) instanceof Promise)
                    return n.catch(t)
                } catch (e) {
                  n = t.call(this, e)
                }
                return n
              }, this)
            }
          },
          {
            key: 'finally',
            value: function (t) {
              var e = this
              return yt(function () {
                var n = function () {
                  try {
                    t.call(this)
                  } catch (t) {}
                }
                try {
                  for (
                    var r = arguments.length, o = new Array(r), i = 0;
                    i < r;
                    i++
                  )
                    o[i] = arguments[i]
                  var a = e.apply(this, o)
                  return a instanceof Promise
                    ? 'function' == typeof a.finally
                      ? a.finally(function () {
                          return n()
                        })
                      : a
                          .catch(function (t) {
                            return t
                          })
                          .then(function (t) {
                            if ((n(), t instanceof Error)) throw t
                          })
                    : (n(), a)
                } catch (t) {
                  throw (n(), t)
                }
              }, this)
            }
          },
          {
            key: 'register',
            value: function () {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {}
              return this.registerClass(function (e) {
                var n = (function (t) {
                  K(n, t)
                  var e = vt(n)
                  function n() {
                    return z(this, n), e.apply(this, arguments)
                  }
                  return n
                })(e)
                return Object.assign(n.prototype, t), n
              })
            }
          },
          {
            key: 'registerClass',
            value: function (t) {
              var e = t(this.constructor),
                n = this.bind(this)
              if (
                (Object.setPrototypeOf(n, e.prototype),
                'function' != typeof e || !(n instanceof this.constructor))
              )
                throw new Error('Registered class must extend FunctionInstance')
              return n
            }
          }
        ]),
        n
      )
    })(dt(Function))
  }
  function mt(t, e) {
    var n = function () {
      for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
        n[r] = arguments[r]
      return (t || function () {}).apply(this, n)
    }
    return (
      (function (t, e) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : 'initAssign',
          r = e.prototype
        Object.setPrototypeOf(t, r), 'function' == typeof r[n] && r[n].call(t)
      })(n, (e = Object.assign({}, gt, e)).instanceType),
      n
    )
  }
  var bt,
    wt = { protect: !1, syncDesc: !0, native: !1 },
    kt = Object.defineProperty,
    xt = Object.defineProperties
  function Ot(t, e, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
      o = t[e]
    if ('function' == typeof o) {
      var i = Object.assign({}, wt, r),
        a = i.native,
        u = n(a ? o : mt(o))
      t[e] = a
        ? u
        : function () {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
              e[n] = arguments[n]
            try {
              return u.apply(this, e)
            } catch (t) {
              return (
                console.warn('[Hook JS]', 'Hooks  running lost once.'),
                o.apply(this, e)
              )
            }
          }
      var c = i.protect,
        l = i.syncDesc
      c && At(t, e), l && St(o, t[e])
    }
  }
  function Rt(t, e, n, r) {
    var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}
    return Ot(
      t,
      e,
      function (t) {
        return t[n](r)
      },
      o
    )
  }
  function Mt(t, e, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
    return Rt(t, e, 'before', n, r)
  }
  function _t(t, e, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
    return Ot(t, e, n, Object.assign({}, r, { native: !0 }))
  }
  function At(t, e) {
    kt.call(Object, t, e, { writable: !1 })
  }
  function St(t, e) {
    xt.call(Object, e, {
      toString: {
        enumerable: !1,
        writable: !0,
        value: function () {
          return t.toString()
        }
      },
      toLocaleString: {
        enumerable: !1,
        writable: !0,
        value: function () {
          return t.toLocaleString()
        }
      }
    })
  }
  function Ct(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  !(function (t) {
    ;(t.TIMEOUT = 'timeout'), (t.INTERVAL = 'interval')
  })(bt || (bt = {}))
  var Tt = (function (e) {
    i(a, e)
    var o = Ct(a)
    function a() {
      var e
      t(this, a)
      for (var n = arguments.length, i = new Array(n), u = 0; u < n; u++)
        i[u] = arguments[u]
      return (
        l(r((e = o.call.apply(o, [this].concat(i)))), 'percentage', void 0),
        l(r(e), 'interval', {}),
        l(r(e), 'timeout', {}),
        l(r(e), 'setIntervalOrigin', void 0),
        l(r(e), 'setTimeoutOrigin', void 0),
        l(r(e), 'clearIntervalOrigin', void 0),
        l(r(e), 'clearTimeoutOrigin', void 0),
        e
      )
    }
    return (
      n(a, [
        {
          key: 'onMounted',
          value: function () {
            B(c(a.prototype), 'onMounted', this).call(this),
              (this.setIntervalOrigin = this.window.setInterval),
              (this.setTimeoutOrigin = this.window.setTimeout),
              (this.clearIntervalOrigin = this.window.clearInterval),
              (this.clearTimeoutOrigin = this.window.clearTimeout)
          }
        },
        {
          key: 'init',
          value: function () {
            var t = this
            ;(this.percentage = 1 / this.rate),
              _t(this.window, 'setInterval', function (e) {
                return t.getHookedTimerFunction(bt.INTERVAL, e)
              }),
              _t(this.window, 'setTimeout', function (e) {
                return t.getHookedTimerFunction(bt.TIMEOUT, e)
              }),
              Mt(this.window, 'clearInterval', function (e) {
                var n = e.args
                t.redirectNewestId(n)
              }),
              Mt(this.window, 'clearTimeout', function (e) {
                var n = e.args
                t.redirectNewestId(n)
              })
          }
        },
        {
          key: 'onRateChange',
          value: function (t) {
            var e = this
            B(c(a.prototype), 'onRateChange', this).call(this, t),
              (this.percentage = 1 / t),
              Object.values(this.interval).forEach(function (t) {
                ;(t.args[1] = Math.floor((t.originMS || 1) * e.percentage)),
                  e.clearIntervalOrigin.call(e.window, t.nowId),
                  (t.nowId = e.setIntervalOrigin.apply(e.window, t.args))
              }),
              Object.values(this.timeout).forEach(function (t) {
                var n = Date.now(),
                  r = t.exceptNextFireTime,
                  o = t.oldPercentage,
                  i = r - n
                i < 0 && (i = 0)
                var a = Math.floor((e.percentage / o) * i)
                ;(t.args[1] = a),
                  (t.exceptNextFireTime = n + a),
                  (t.oldPercentage = e.percentage),
                  e.clearTimeoutOrigin.call(e.window, t.nowId),
                  (t.nowId = e.setTimeoutOrigin.apply(e.window, t.args))
              })
          }
        },
        {
          key: 'notifyExec',
          value: function (t) {
            var e = this
            t &&
              Object.values(this.timeout)
                .filter(function (e) {
                  return e.uniqueId === t
                })
                .forEach(function (t) {
                  e.clearTimeoutOrigin.call(e.window, t.nowId),
                    delete e.timeout[t.originId]
                })
          }
        },
        {
          key: 'redirectNewestId',
          value: function (t) {
            var e = t[0]
            this.interval[e] &&
              ((t[0] = this.interval[e].nowId), delete this.interval[e]),
              this.timeout[e] &&
                ((t[0] = this.timeout[e].nowId), delete this.timeout[e])
          }
        },
        {
          key: 'getHookedTimerFunction',
          value: function (t, e) {
            var n = t,
              r = this
            return function () {
              for (
                var t = arguments.length, o = new Array(t), i = 0;
                i < t;
                i++
              )
                o[i] = arguments[i]
              var a = y(),
                u = o[0]
              'string' == typeof u &&
                ((r.window.__timer = { notifyExec: r.notifyExec.bind(r) }),
                (u += ';__timer.notifyExec(' + a + ')'),
                (o[0] = u)),
                'function' == typeof u &&
                  (o[0] = function () {
                    var t = u.apply(this, arguments)
                    return r.notifyExec(a), t
                  })
              var c = o[1]
              o[1] *= r.percentage
              var l = e.apply(r.window, o)
              return (
                (r[n][l] = {
                  args: o,
                  originMS: c,
                  originId: l,
                  nowId: l,
                  uniqueId: a,
                  oldPercentage: r.percentage,
                  exceptNextFireTime: Date.now() + c
                }),
                l
              )
            }
          }
        },
        {
          key: 'moduleIdentityName',
          get: function () {
            return 'timer'
          }
        }
      ]),
      a
    )
  })(U)
  function It(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  var Et,
    jt = (function (e) {
      i(a, e)
      var o = It(a)
      function a() {
        var e
        t(this, a)
        for (var n = arguments.length, i = new Array(n), u = 0; u < n; u++)
          i[u] = arguments[u]
        return (
          l(r((e = o.call.apply(o, [this].concat(i)))), 'DateOrigin', void 0),
          l(r(e), 'DateModified', void 0),
          l(r(e), 'rate', 1),
          l(r(e), 'lastDatetime', void 0),
          l(r(e), 'lastMDatetime', void 0),
          e
        )
      }
      return (
        n(a, [
          {
            key: 'onMounted',
            value: function () {
              B(c(a.prototype), 'onMounted', this).call(this),
                (this.lastDatetime = Date.now()),
                (this.lastMDatetime = Date.now()),
                (this.DateOrigin = this.window.Date),
                (this.DateModified = this.window.Date)
            }
          },
          {
            key: 'init',
            value: function () {
              this.hookedDate()
            }
          },
          {
            key: 'onRateChange',
            value: function (t) {
              this.DateModified &&
                ((this.lastMDatetime = this.DateModified.now()),
                (this.lastDatetime = this.DateOrigin.now())),
                B(c(a.prototype), 'onRateChange', this).call(this, t)
            }
          },
          {
            key: 'hookedDate',
            value: function () {
              var e = this,
                n = this
              _t(this.window, 'Date', function (e) {
                var r = (function (e) {
                  i(o, e)
                  var r = It(o)
                  function o() {
                    t(this, o)
                    for (
                      var e = arguments.length, i = new Array(e), a = 0;
                      a < e;
                      a++
                    )
                      i[a] = arguments[a]
                    if (0 === i.length) {
                      var u = n.DateOrigin.now(),
                        c = u - n.lastDatetime,
                        l = c * n.rate
                      i.push(n.lastMDatetime + l)
                    }
                    return r.call.apply(r, [this].concat(i))
                  }
                  return o
                })(e)
                return (r = r.bind(new r()))
              }),
                (this.DateModified = this.window.Date),
                _t(this.DateModified, 'now', function () {
                  return function () {
                    return new e.DateModified().getTime()
                  }
                })
            }
          },
          {
            key: 'moduleIdentityName',
            get: function () {
              return 'dateTimer'
            }
          }
        ]),
        a
      )
    })(U)
  function Dt(t, e) {
    var n =
      ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator']
    if (!n) {
      if (
        Array.isArray(t) ||
        (n = (function (t, e) {
          if (!t) return
          if ('string' == typeof t) return Pt(t, e)
          var n = Object.prototype.toString.call(t).slice(8, -1)
          'Object' === n && t.constructor && (n = t.constructor.name)
          if ('Map' === n || 'Set' === n) return Array.from(t)
          if (
            'Arguments' === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Pt(t, e)
        })(t)) ||
        (e && t && 'number' == typeof t.length)
      ) {
        n && (t = n)
        var r = 0,
          o = function () {}
        return {
          s: o,
          n: function () {
            return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] }
          },
          e: function (t) {
            throw t
          },
          f: o
        }
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    }
    var i,
      a = !0,
      u = !1
    return {
      s: function () {
        n = n.call(t)
      },
      n: function () {
        var t = n.next()
        return (a = t.done), t
      },
      e: function (t) {
        ;(u = !0), (i = t)
      },
      f: function () {
        try {
          a || null == n.return || n.return()
        } finally {
          if (u) throw i
        }
      }
    }
  }
  function Pt(t, e) {
    ;(null == e || e > t.length) && (e = t.length)
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
    return r
  }
  function Nt(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  !(function (t) {
    ;(t.CTRL = 'ctrl'),
      (t.META = 'meta'),
      (t.CMD = 'meta'),
      (t.SHIFT = 'shift'),
      (t.ALT = 'alt')
  })(Et || (Et = {}))
  var Lt = (function (e) {
    i(o, e)
    var r = Nt(o)
    function o() {
      return t(this, o), r.apply(this, arguments)
    }
    return (
      n(o, [
        {
          key: 'init',
          value: function () {
            var t = this,
              e = this.shortcutList
            this.window.addEventListener('keydown', function (n) {
              var r,
                o = Dt(e)
              try {
                for (o.s(); !(r = o.n()).done; ) {
                  var i = r.value
                  I(n, i) &&
                    (n.preventDefault(),
                    n.stopPropagation(),
                    i.operator(t.host))
                }
              } catch (t) {
                o.e(t)
              } finally {
                o.f()
              }
            })
          }
        },
        {
          key: 'shortcutList',
          get: function () {
            var t = this
            return [
              [
                'shortcutExpressions.+',
                function (t) {
                  return t.speedUp()
                }
              ],
              [
                'shortcutExpressions.-',
                function (t) {
                  return t.speedDown()
                }
              ],
              [
                'shortcutExpressions.*',
                function (t) {
                  return t.speedMultiply()
                }
              ],
              [
                'shortcutExpressions./',
                function (t) {
                  return t.speedDivide()
                }
              ],
              [
                'shortcutExpressions.reset',
                function (t) {
                  return t.setSpeed(1)
                }
              ],
              [
                'shortcutExpressions.custom',
                function (t) {
                  return t.setSpeed()
                }
              ]
            ]
              .map(function (e) {
                var n = w(e, 2),
                  r = n[0],
                  o = n[1]
                return { expressions: t.getConfig(r), operator: o }
              })
              .map(function (t) {
                return (
                  (e = t),
                  'string' ==
                    typeof (n = Object.assign({}, e, { conditions: [] }))
                      .expressions &&
                    (n.expressions = n.expressions.split(';')),
                  n.expressions &&
                    n.expressions instanceof Array &&
                    (n.conditions = n.expressions.map(function (t) {
                      return (function (t) {
                        var e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : '+',
                          n = t
                            .split(e)
                            .map(function (t) {
                              return t.trim()
                            })
                            .filter(function (t) {
                              return t
                            }),
                          r = { code: n.pop() || 'UNKNOWN_KEY' }
                        return (
                          n.forEach(function (t) {
                            r[t + 'Key'] = !0
                          }),
                          r
                        )
                      })(t)
                    })),
                  n
                )
                var e, n
              })
          }
        },
        {
          key: 'moduleIdentityName',
          get: function () {
            return 'shortcutKey'
          }
        },
        {
          key: 'declareConfigs',
          value: function () {
            return [
              {
                type: f.ARRAY,
                itemType: f.SHORTCUT,
                key: 'shortcutExpressions.+',
                default: [
                  'ctrl + Equal',
                  'meta + Equal',
                  'ctrl + Period',
                  'meta + Period'
                ]
              },
              {
                type: f.ARRAY,
                itemType: f.SHORTCUT,
                key: 'shortcutExpressions.-',
                default: [
                  'ctrl + Minus',
                  'meta + Minus',
                  'ctrl + Comma',
                  'meta + Comma'
                ]
              },
              {
                type: f.ARRAY,
                itemType: f.SHORTCUT,
                key: 'shortcutExpressions.*',
                default: ['alt + Equal', 'alt + Period']
              },
              {
                type: f.ARRAY,
                itemType: f.SHORTCUT,
                key: 'shortcutExpressions./',
                default: ['alt + Minus', 'alt + Comma']
              },
              {
                type: f.ARRAY,
                itemType: f.SHORTCUT,
                key: 'shortcutExpressions.reset',
                default: ['ctrl + Digit0', 'meta + Digit0', 'alt + Digit0']
              },
              {
                type: f.ARRAY,
                itemType: f.SHORTCUT,
                key: 'shortcutExpressions.custom',
                default: ['ctrl + Digit9', 'meta + Digit9']
              }
            ]
          }
        }
      ]),
      o
    )
  })(U)
  function Bt(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  function Vt(t, e) {
    var n =
      ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator']
    if (!n) {
      if (
        Array.isArray(t) ||
        (n = (function (t, e) {
          if (!t) return
          if ('string' == typeof t) return Ut(t, e)
          var n = Object.prototype.toString.call(t).slice(8, -1)
          'Object' === n && t.constructor && (n = t.constructor.name)
          if ('Map' === n || 'Set' === n) return Array.from(t)
          if (
            'Arguments' === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Ut(t, e)
        })(t)) ||
        (e && t && 'number' == typeof t.length)
      ) {
        n && (t = n)
        var r = 0,
          o = function () {}
        return {
          s: o,
          n: function () {
            return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] }
          },
          e: function (t) {
            throw t
          },
          f: o
        }
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    }
    var i,
      a = !0,
      u = !1
    return {
      s: function () {
        n = n.call(t)
      },
      n: function () {
        var t = n.next()
        return (a = t.done), t
      },
      e: function (t) {
        ;(u = !0), (i = t)
      },
      f: function () {
        try {
          a || null == n.return || n.return()
        } finally {
          if (u) throw i
        }
      }
    }
  }
  function Ut(t, e) {
    ;(null == e || e > t.length) && (e = t.length)
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
    return r
  }
  function Gt(t) {
    var e,
      n = {},
      r = Vt(
        Object.entries(t).filter(function (t) {
          var e = w(t, 1)[0]
          return !['target', 'key'].includes(e)
        })
      )
    try {
      for (r.s(); !(e = r.n()).done; ) {
        var o = w(e.value, 2),
          i = o[0],
          a = o[1]
        n[i] = a
      }
    } catch (t) {
      r.e(t)
    } finally {
      r.f()
    }
    return n
  }
  var Ht = (function (e) {
    i(a, e)
    var o = Bt(a)
    function a() {
      var e
      t(this, a)
      for (var n = arguments.length, i = new Array(n), u = 0; u < n; u++)
        i[u] = arguments[u]
      return (
        l(r((e = o.call.apply(o, [this].concat(i)))), 'defines', []),
        l(r(e), 'definePropertiesOrigin', void 0),
        l(r(e), 'definePropertyOrigin', void 0),
        e
      )
    }
    return (
      n(a, [
        {
          key: 'onMounted',
          value: function () {
            B(c(a.prototype), 'onMounted', this).call(this),
              (this.definePropertiesOrigin =
                this.window.Object.defineProperties),
              (this.definePropertyOrigin = this.window.Object.defineProperty)
          }
        },
        {
          key: 'isCoreModule',
          get: function () {
            return !0
          }
        },
        {
          key: 'init',
          value: function () {
            var t = this
            Mt(this.window.Object, 'defineProperties', function (e) {
              var n,
                r = e.args,
                o = w(r, 2),
                i = o[0],
                a = o[1],
                u = Object.entries(a)
                  .map(function (e) {
                    var n = w(e, 2),
                      o = n[0],
                      a = n[1],
                      u = Object.assign({ target: i, key: o }, a)
                    return t.hookDefine(u)
                      ? ((r[0] = u.target), [u.key, Gt(u)])
                      : [!1]
                  })
                  .filter(function (t) {
                    return w(t, 1)[0]
                  })
              r[1] =
                ((n = {}),
                u.forEach(function (t) {
                  n[null == t[0] ? '' : t[0]] = t[1]
                }),
                n)
            }),
              Mt(this.window.Object, 'defineProperty', function (e) {
                var n = e.args,
                  r = e.preventDefault,
                  o = w(n, 3),
                  i = o[0],
                  a = o[1],
                  u = o[2],
                  c = Object.assign({ target: i, key: a }, u)
                t.hookDefine(c)
                  ? ((n[0] = c.target), (n[1] = c.key), (n[2] = Gt(c)))
                  : r()
              })
          }
        },
        {
          key: 'hookDefine',
          value: function (t) {
            var e,
              n = Vt(this.defines)
            try {
              for (n.s(); !(e = n.n()).done; ) {
                if ((0, e.value)(t)) return !1
              }
            } catch (t) {
              n.e(t)
            } finally {
              n.f()
            }
            return !0
          }
        },
        {
          key: 'applyDefineRole',
          value: function (t) {
            this.defines.push(t)
          }
        },
        {
          key: 'moduleIdentityName',
          get: function () {
            return 'definition'
          }
        }
      ]),
      a
    )
  })(L)
  function Wt(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return m(t)
      })(t) ||
      (function (t) {
        if (
          ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
          null != t['@@iterator']
        )
          return Array.from(t)
      })(t) ||
      b(t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
      })()
    )
  }
  function qt(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  var Ft = (function (e) {
    i(a, e)
    var o = qt(a)
    function a() {
      var e
      t(this, a)
      for (var n = arguments.length, i = new Array(n), u = 0; u < n; u++)
        i[u] = arguments[u]
      return (
        l(r((e = o.call.apply(o, [this].concat(i)))), 'extraElements', []), e
      )
    }
    return (
      n(a, [
        {
          key: 'init',
          value: function () {
            var t = this
            !(function (t, e, n) {
              Rt(
                t,
                e,
                'after',
                n,
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : {}
              )
            })(this.window.Element.prototype, 'attachShadow', function (e) {
              var n = e.lastValue
              return t.extraElements.push(n), n
            })
          }
        },
        {
          key: 'querySelectorAll',
          value: function (t) {
            return g(
              this.extraElements.map(function (e) {
                return Wt(e.querySelectorAll(t))
              })
            )
          }
        },
        {
          key: 'moduleIdentityName',
          get: function () {
            return 'shadowDOM'
          }
        },
        {
          key: 'isCoreModule',
          get: function () {
            return !0
          }
        }
      ]),
      a
    )
  })(L)
  function zt(t, e) {
    var n =
      ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator']
    if (!n) {
      if (
        Array.isArray(t) ||
        (n = (function (t, e) {
          if (!t) return
          if ('string' == typeof t) return Yt(t, e)
          var n = Object.prototype.toString.call(t).slice(8, -1)
          'Object' === n && t.constructor && (n = t.constructor.name)
          if ('Map' === n || 'Set' === n) return Array.from(t)
          if (
            'Arguments' === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Yt(t, e)
        })(t)) ||
        (e && t && 'number' == typeof t.length)
      ) {
        n && (t = n)
        var r = 0,
          o = function () {}
        return {
          s: o,
          n: function () {
            return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] }
          },
          e: function (t) {
            throw t
          },
          f: o
        }
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    }
    var i,
      a = !0,
      u = !1
    return {
      s: function () {
        n = n.call(t)
      },
      n: function () {
        var t = n.next()
        return (a = t.done), t
      },
      e: function (t) {
        ;(u = !0), (i = t)
      },
      f: function () {
        try {
          a || null == n.return || n.return()
        } finally {
          if (u) throw i
        }
      }
    }
  }
  function Yt(t, e) {
    ;(null == e || e > t.length) && (e = t.length)
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
    return r
  }
  function $t(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  var Kt = (function (e) {
    i(o, e)
    var r = $t(o)
    function o() {
      return t(this, o), r.apply(this, arguments)
    }
    return (
      n(o, [
        {
          key: 'onRateChange',
          value: function (t) {
            B(c(o.prototype), 'onRateChange', this).call(this, t)
            var e,
              n = zt(this.allVideoElements)
            try {
              for (n.s(); !(e = n.n()).done; ) {
                var r = e.value
                this.changePlaybackRate(r, t)
              }
            } catch (t) {
              n.e(t)
            } finally {
              n.f()
            }
          }
        },
        {
          key: 'init',
          value: function () {
            this.preventPlaybackRateLock()
          }
        },
        {
          key: 'changePlaybackRate',
          value: function (t, e) {
            ;(e = e >= 16 ? 16 : e <= 0.065 ? 0.065 : e),
              this.unlockPlaybackRate(t),
              (t.playbackRate = e),
              1 !== e && this.lockPlaybackRate(t)
          }
        },
        {
          key: 'lockPlaybackRate',
          value: function (t) {
            var e = (this.definitionModule || {}).definePropertyOrigin
            ;(void 0 === e ? Object.defineProperty : e).call(
              Object,
              t,
              'playbackRate',
              {
                configurable: !0,
                get: function () {
                  return 1
                },
                set: function () {}
              }
            )
          }
        },
        {
          key: 'unlockPlaybackRate',
          value: function (t) {
            delete t.playbackRate, delete t.playbackRate, delete t.playbackRate
          }
        },
        {
          key: 'definitionModule',
          get: function () {
            return this.getDependencyModule('definition')
          }
        },
        {
          key: 'preventPlaybackRateLock',
          value: function () {
            var t = this.definitionModule
            t
              ? t.applyDefineRole(function (t) {
                  if (
                    t.target instanceof HTMLVideoElement &&
                    'playbackRate' === t.key
                  )
                    return N('已阻止对该网站视频视频倍率的锁定'), !0
                })
              : N(
                  '`Video Speed Module`, dependency: `definition` module is required.'
                )
          }
        },
        {
          key: 'allVideoElements',
          get: function () {
            var t = this.getDependencyModule('shadowDOM')
            return (
              t ||
                N(
                  '`Video Speed Module`, dependency: `shadowDOM` module is required.'
                ),
              [].concat(
                Wt(t ? t.querySelectorAll('video') : []),
                Wt(this.document.querySelectorAll('video'))
              )
            )
          }
        },
        {
          key: 'moduleIdentityName',
          get: function () {
            return 'videoSpeed'
          }
        }
      ]),
      o
    )
  })(U)
  function Jt(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  var Qt = (function (e) {
      i(o, e)
      var r = Jt(o)
      function o(e) {
        var n,
          i =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : '__CM'
        return t(this, o), ((n = r.call(this)).storage = e), (n.prefix = i), n
      }
      return (
        n(o, [
          {
            key: 'isCoreModule',
            get: function () {
              return !0
            }
          },
          {
            key: 'openPage',
            value: function (t) {
              'function' == typeof D.openInTab
                ? D.openInTab(t, { active: !0 })
                : this.window.open(t)
            }
          },
          {
            key: 'init',
            value: function () {
              var t = this
              B(c(o.prototype), 'init', this).call(this),
                'function' == typeof D.registerMenuCommand &&
                  (D.registerMenuCommand('主页', function () {
                    t.openPage('https://timer.palerock.cn')
                  }),
                  D.registerMenuCommand('打开配置页面', function () {
                    t.openPage('https://timer.palerock.cn/configuration')
                  }))
            }
          },
          {
            key: 'getAllConfigs',
            value: function () {
              var t = this
              return this.getDeclaredConfigurations().map(function (e) {
                var n = t.getValue(e.namespace, e.key)
                return Object.assign({}, e, {
                  value: null != n ? n : e.default
                })
              })
            }
          },
          {
            key: 'getDeclaredConfigurations',
            value: function () {
              return g(
                [
                  this.host.declareConfigs().map(function (t) {
                    return Object.assign({}, t, { namespace: 'host' })
                  })
                ].concat(
                  Wt(
                    this.host.getAllActivateModules().map(function (t) {
                      return t.declareConfigs().map(function (e) {
                        return Object.assign({}, e, {
                          namespace: t.moduleIdentityName,
                          modelName: t.moduleName
                        })
                      })
                    })
                  )
                )
              )
            }
          },
          {
            key: 'moduleIdentityName',
            get: function () {
              return 'configs'
            }
          },
          {
            key: 'saveAllConfigs',
            value: function (t) {
              var e = this
              t.forEach(function (t) {
                var n
                e.setValue(
                  t.namespace,
                  t.key,
                  null !== (n = t.value) && void 0 !== n ? n : t.default
                )
              })
            }
          },
          {
            key: 'getValue',
            value: function (t, e) {
              if (this.available())
                return this.storage.get([this.prefix, t, e].join('_'))
            }
          },
          {
            key: 'setValue',
            value: function (t, e, n) {
              this.available() &&
                this.storage.set([this.prefix, t, e].join('_'), n)
            }
          },
          {
            key: 'available',
            value: function () {
              return !!this.storage && this.storage.available()
            }
          },
          {
            key: 'resetAll',
            value: function () {
              var t = this
              this.storage
                .list()
                .filter(function (e) {
                  return e.startsWith(t.prefix)
                })
                .forEach(function (e) {
                  t.storage.remove(e)
                })
            }
          }
        ]),
        o
      )
    })(L),
    Xt = (function () {
      function e() {
        t(this, e), l(this, 'isAvailable', void 0)
      }
      return (
        n(e, [
          {
            key: 'get',
            value: function (t) {
              return D.getValue(t)
            }
          },
          {
            key: 'list',
            value: function () {
              return D.listValues()
            }
          },
          {
            key: 'remove',
            value: function (t) {
              D.deleteValue(t)
            }
          },
          {
            key: 'set',
            value: function (t, e) {
              D.setValue(t, e)
            }
          },
          {
            key: 'available',
            value: function () {
              return (
                null == this.isAvailable &&
                  (this.isAvailable = [
                    a(D.setValue),
                    a(D.getValue),
                    a(D.listValues),
                    a(D.deleteValue)
                  ].every(function (t) {
                    return 'function' === t
                  })),
                this.isAvailable
              )
            }
          }
        ]),
        e
      )
    })()
  function Zt(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = c(t)
      if (e) {
        var o = c(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return u(this, n)
    }
  }
  var te = (function (e) {
      i(a, e)
      var o = Zt(a)
      function a() {
        var e
        t(this, a)
        for (var n = arguments.length, i = new Array(n), u = 0; u < n; u++)
          i[u] = arguments[u]
        return (
          l(r((e = o.call.apply(o, [this].concat(i)))), 'nodeElement', void 0),
          l(r(e), 'clickMapper', {
            '_item-input': function (t) {
              t.setSpeed()
            },
            '_item-x2': function (t) {
              t.speedUp()
            },
            '_item-x-2': function (t) {
              t.speedDown()
            },
            '_item-xx2': function (t) {
              t.speedMultiply()
            },
            '_item-xx-2': function (t) {
              t.speedDivide()
            },
            '_item-reset': function (t) {
              t.setSpeed(0)
            }
          }),
          l(r(e), 'setTimeoutOrigin', setTimeout),
          e
        )
      }
      return (
        n(a, [
          {
            key: 'moduleIdentityName',
            get: function () {
              return 'legacyUi'
            }
          },
          {
            key: 'displayNum',
            get: function () {
              return (this.rate.toString().split('.')[1] || '').length > 2
                ? this.rate.toFixed(2)
                : this.rate.toString()
            }
          },
          {
            key: 'showSuspendedBall',
            get: function () {
              return this.getConfig('showSuspendedBall')
            }
          },
          {
            key: 'deeplyColor',
            get: function () {
              return this.getConfig('deeplyColor')
            }
          },
          {
            key: 'genElement',
            value: function () {
              var t = this.document.createElement('div')
              t.innerHTML =
                (this.showSuspendedBall
                  ? '<div class="_th-container" >\n    <div class="_th-click-hover _item-input">\n        x' +
                    this.displayNum +
                    '\n    </div>\n    <div class="_th-item _item-x2">&gt;</div>\n    <div class="_th-item _item-x-2">&lt;</div>\n    <div class="_th-item _item-xx2">&gt;&gt;</div>\n    <div class="_th-item _item-xx-2">&lt;&lt;</div>\n    <div class="_th-item _item-reset">O</div>\n</div>\n'
                  : '') +
                '<div class="_th_cover-all-show-times _th_hidden">\n    <div class="_th_times">x' +
                this.displayNum +
                '</div>\n</div>'
              var e = this
              return (
                Object.keys(this.clickMapper).forEach(function (n) {
                  var r = e.clickMapper[n],
                    o = t.getElementsByClassName(n)[0]
                  o &&
                    (o.onclick = function () {
                      r(e.host, e.rate)
                    })
                }),
                t
              )
            }
          },
          {
            key: 'element',
            value: function () {
              return (
                this.nodeElement || (this.nodeElement = this.genElement()),
                this.nodeElement
              )
            }
          },
          {
            key: 'style',
            value: function () {
              var t = this.position,
                e = this.positionOffset,
                n = 'right' === t ? 'left' : 'right',
                r = 'left' === t
              return '\n        ._th-container ._th-item {\n            margin-bottom: 3px;\n            position: relative;\n            width: 0;\n            height: 0;\n            cursor: pointer;\n            opacity: .3;\n            background-color: aquamarine;\n            border-radius: 100%;\n            text-align: center;\n            line-height: 30px;\n            -webkit-transition: all .35s;\n            -o-transition: all .35s;\n            transition: all .35s;\n            '
                .concat(
                  n,
                  ': 30px;\n        }\n\n        ._th-container ._th-item, ._th-container ._th-click-hover, ._th_cover-all-show-times ._th_times {\n            -webkit-box-shadow: '
                )
                .concat(
                  this.deeplyColor
                    ? '4px 5px 10px 6px #b2b2b2'
                    : '-3px 4px 12px -5px black',
                  ';\n            box-shadow: '
                )
                .concat(
                  this.deeplyColor
                    ? '4px 5px 10px 6px #b2b2b2'
                    : '-3px 4px 12px -5px black',
                  ';\n        }\n\n        ._th-container:hover ._th-item._item-x2 {\n            margin-'
                )
                .concat(
                  t,
                  ': 18px;\n            width: 40px;\n            height: 40px;\n            line-height: 40px\n        }\n\n        ._th-container:hover ._th-item._item-x-2 {\n            margin-'
                )
                .concat(
                  t,
                  ': 17px;\n            width: 38px;\n            height: 38px;\n            line-height: 38px\n        }\n\n        ._th-container:hover ._th-item._item-xx2 {\n            width: 36px;\n            height: 36px;\n            margin-'
                )
                .concat(
                  t,
                  ': 16px;\n            line-height: 36px\n        }\n\n        ._th-container:hover ._th-item._item-xx-2 {\n            width: 32px;\n            height: 32px;\n            line-height: 32px;\n            margin-'
                )
                .concat(
                  t,
                  ': 14px\n        }\n\n        ._th-container:hover ._th-item._item-reset {\n            width: 30px;\n            line-height: 30px;\n            height: 30px;\n            margin-'
                )
                .concat(
                  t,
                  ': 10px\n        }\n\n        ._th-click-hover {\n            position: relative;\n            -webkit-transition: all .5s;\n            -o-transition: all .5s;\n            transition: all .5s;\n            height: 45px;\n            width: 45px;\n            cursor: pointer;\n            opacity: .6;\n            border-radius: 100%;\n            background-color: aquamarine;\n            text-align: center;\n            line-height: 45px;\n            '
                )
                .concat(
                  n,
                  ': 0\n        }\n\n        ._th-container:hover {\n            '
                )
                .concat(
                  t,
                  ': -5px\n        }\n\n        ._th-container {\n            font-size: 12px;\n            -webkit-transition: all .5s;\n            -o-transition: all .5s;\n            transition: all .5s;\n            '
                )
                .concat(t, ': -30px;\n            top: ')
                .concat(
                  e,
                  ';\n            position: fixed;\n            -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n            z-index: 100000;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            width: 58px;\n            -ms-flex-wrap: wrap;\n                flex-wrap: wrap;\n            -webkit-box-orient: horizontal;\n            -webkit-box-direction: '
                )
                .concat(
                  r ? 'normal' : 'reverse',
                  ';\n            -ms-flex-direction: '
                )
                .concat(
                  r ? 'row' : 'row-reverse',
                  ';\n                    flex-direction: '
                )
                .concat(
                  r ? 'row' : 'row-reverse',
                  ';\n        }\n\n        ._th-container ._th-item:hover {\n            opacity: .8;\n            background-color: #5fb492;\n            color: aliceblue\n        }\n\n        ._th-container ._th-item:active {\n            opacity: .9;\n            background-color: #1b3a26;\n            color: aliceblue\n        }\n\n        ._th-container:hover ._th-click-hover {\n            opacity: .8\n        }\n\n        ._th-container:hover ._th-item {\n            opacity: .6;\n            '
                )
                .concat(
                  n,
                  ': 0\n        }\n\n        ._th-container ._th-click-hover:hover {\n            opacity: .8;\n            background-color: #5fb492;\n            color: aliceblue\n        }\n\n        ._th_cover-all-show-times {\n            position: fixed;\n            top: 0;\n            '
                )
                .concat(
                  n,
                  ': 0;\n            width: 100%;\n            height: 100%;\n            z-index: 99999;\n            opacity: 1;\n            font-weight: 900;\n            font-size: 30px;\n            color: #4f4f4f;\n            background-color: rgba(0, 0, 0, 0.1)\n        }\n\n        ._th_cover-all-show-times._th_hidden {\n            z-index: -99999;\n            opacity: 0;\n            -webkit-transition: 1s all;\n            -o-transition: 1s all;\n            transition: 1s all\n        }\n\n        ._th_cover-all-show-times ._th_times {\n            width: 300px;\n            height: 300px;\n            border-radius: 50%;\n            background-color: rgba(127, 255, 212, 0.51);\n            text-align: center;\n            line-height: 300px;\n            position: absolute;\n            top: 50%;\n            '
                )
                .concat(
                  n,
                  ': 50%;\n            margin-top: -150px;\n            margin-'
                )
                .concat(n, ': -150px\n        }\n        ')
            }
          },
          {
            key: 'onUiRateChange',
            value: function (t) {
              if (
                (B(c(a.prototype), 'onUiRateChange', this).call(this, t),
                this.nodeElement)
              ) {
                var e =
                    this.nodeElement.querySelector('._th-click-hover') || {},
                  n = this.nodeElement.querySelector('._th_times') || {},
                  r = this.displayNum
                ;(e.innerHTML = 'x' + r), (n.innerHTML = 'x' + r)
                var o =
                  this.nodeElement.querySelector('._th_cover-all-show-times') ||
                  {}
                ;(o.className = '_th_cover-all-show-times'),
                  this.setTimeoutOrigin.bind(this.window)(function () {
                    o.className = '_th_cover-all-show-times _th_hidden'
                  }, 100)
              }
            }
          },
          {
            key: 'position',
            get: function () {
              return this.getConfig('position')
            }
          },
          {
            key: 'positionOffset',
            get: function () {
              return this.getConfig('positionOffset')
            }
          },
          {
            key: 'declareConfigs',
            value: function () {
              return [
                { key: 'position', type: f.STRING, default: 'left' },
                { key: 'positionOffset', type: f.STRING, default: '20%' },
                {
                  key: 'showSuspendedBall',
                  type: f.BOOLEAN,
                  default: !0,
                  title: 'Show Suspended Ball'
                },
                {
                  key: 'deeplyColor',
                  type: f.BOOLEAN,
                  default: !0,
                  title: 'Deeply Color'
                }
              ]
            }
          }
        ]),
        a
      )
    })(H),
    ee = new F()
  return (
    ee.exportOuter(),
    ee.registerModule(new Qt(new Xt())),
    ee.registerModule(new Ht()),
    ee.registerModule(new Ft()),
    ee.registerModule(new Tt()),
    ee.registerModule(new jt()),
    ee.registerModule(new Kt()),
    ee.registerModule(new Lt(), !0),
    ee.registerModule(new te(), !0),
    ee.bootstrap(),
    ee
  )
})
