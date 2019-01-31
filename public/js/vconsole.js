/*!
 * vConsole v3.2.2 (https://github.com/Tencent/vConsole)
 *
 * Tencent is pleased to support the open source community by making vConsole available.
 * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define("VConsole", [], t)
    : "object" == typeof exports
    ? (exports.VConsole = t())
    : (e.VConsole = t());
})(window, function() {
  return (function(e) {
    var t = {};
    function o(n) {
      if (t[n]) return t[n].exports;
      var r = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
    }
    return (
      (o.m = e),
      (o.c = t),
      (o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (o.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (o.t = function(e, t) {
        if ((1 & t && (e = o(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (o.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var r in e)
            o.d(
              n,
              r,
              function(t) {
                return e[t];
              }.bind(null, r)
            );
        return n;
      }),
      (o.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return o.d(t, "a", t), t;
      }),
      (o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (o.p = ""),
      o((o.s = 6))
    );
  })([
    function(e, t, o) {
      var n, r, i;
      (r = [t]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(e) {
              "use strict";
              function t(e) {
                return (t =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function(e) {
                        return typeof e;
                      }
                    : function(e) {
                        return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                      })(e);
              }
              function o(e) {
                return "[object Number]" == Object.prototype.toString.call(e);
              }
              function n(e) {
                return "[object String]" == Object.prototype.toString.call(e);
              }
              function r(e) {
                return "[object Array]" == Object.prototype.toString.call(e);
              }
              function i(e) {
                return "[object Boolean]" == Object.prototype.toString.call(e);
              }
              function a(e) {
                return void 0 === e;
              }
              function l(e) {
                return null === e;
              }
              function c(e) {
                return "[object Symbol]" == Object.prototype.toString.call(e);
              }
              function s(e) {
                return !(
                  "[object Object]" != Object.prototype.toString.call(e) &&
                  (o(e) || n(e) || i(e) || r(e) || l(e) || d(e) || a(e) || c(e))
                );
              }
              function d(e) {
                return "[object Function]" == Object.prototype.toString.call(e);
              }
              function u(e) {
                var t = Object.prototype.toString.call(e);
                return (
                  "[object global]" == t ||
                  "[object Window]" == t ||
                  "[object DOMWindow]" == t
                );
              }
              function f(e) {
                if (!s(e) && !r(e)) return [];
                if (r(e)) {
                  var t = [];
                  return (
                    e.forEach(function(e, o) {
                      t.push(o);
                    }),
                    t
                  );
                }
                return Object.getOwnPropertyNames(e).sort();
              }
              Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.getDate = function(e) {
                  var t = e > 0 ? new Date(e) : new Date(),
                    o = t.getDate() < 10 ? "0" + t.getDate() : t.getDate(),
                    n =
                      t.getMonth() < 9
                        ? "0" + (t.getMonth() + 1)
                        : t.getMonth() + 1,
                    r = t.getFullYear(),
                    i = t.getHours() < 10 ? "0" + t.getHours() : t.getHours(),
                    a =
                      t.getMinutes() < 10
                        ? "0" + t.getMinutes()
                        : t.getMinutes(),
                    l =
                      t.getSeconds() < 10
                        ? "0" + t.getSeconds()
                        : t.getSeconds(),
                    c =
                      t.getMilliseconds() < 10
                        ? "0" + t.getMilliseconds()
                        : t.getMilliseconds();
                  return (
                    c < 100 && (c = "0" + c),
                    {
                      time: +t,
                      year: r,
                      month: n,
                      day: o,
                      hour: i,
                      minute: a,
                      second: l,
                      millisecond: c
                    }
                  );
                }),
                (e.isNumber = o),
                (e.isString = n),
                (e.isArray = r),
                (e.isBoolean = i),
                (e.isUndefined = a),
                (e.isNull = l),
                (e.isSymbol = c),
                (e.isObject = s),
                (e.isFunction = d),
                (e.isElement = function(e) {
                  return "object" ===
                    ("undefined" == typeof HTMLElement
                      ? "undefined"
                      : t(HTMLElement))
                    ? e instanceof HTMLElement
                    : e &&
                        "object" === t(e) &&
                        null !== e &&
                        1 === e.nodeType &&
                        "string" == typeof e.nodeName;
                }),
                (e.isWindow = u),
                (e.isPlainObject = function(e) {
                  var o,
                    n = Object.prototype.hasOwnProperty;
                  if (!e || "object" !== t(e) || e.nodeType || u(e)) return !1;
                  try {
                    if (
                      e.constructor &&
                      !n.call(e, "constructor") &&
                      !n.call(e.constructor.prototype, "isPrototypeOf")
                    )
                      return !1;
                  } catch (e) {
                    return !1;
                  }
                  for (o in e);
                  return void 0 === o || n.call(e, o);
                }),
                (e.htmlEncode = function(e) {
                  return document
                    .createElement("a")
                    .appendChild(document.createTextNode(e)).parentNode
                    .innerHTML;
                }),
                (e.JSONStringify = function(e) {
                  if (!s(e) && !r(e)) return JSON.stringify(e);
                  var t = "{",
                    o = "}";
                  r(e) && ((t = "["), (o = "]"));
                  for (var n = t, i = f(e), a = 0; a < i.length; a++) {
                    var l = i[a],
                      u = e[l];
                    try {
                      r(e) ||
                        (s(l) || r(l) || c(l)
                          ? (n += Object.prototype.toString.call(l))
                          : (n += l),
                        (n += ": ")),
                        r(u)
                          ? (n += "Array[" + u.length + "]")
                          : s(u) || c(u) || d(u)
                          ? (n += Object.prototype.toString.call(u))
                          : (n += JSON.stringify(u)),
                        a < i.length - 1 && (n += ", ");
                    } catch (e) {
                      continue;
                    }
                  }
                  return (n += o);
                }),
                (e.getObjAllKeys = f),
                (e.getObjName = function(e) {
                  return Object.prototype.toString
                    .call(e)
                    .replace("[object ", "")
                    .replace("]", "");
                }),
                (e.setStorage = function(e, t) {
                  window.localStorage &&
                    ((e = "vConsole_" + e), localStorage.setItem(e, t));
                }),
                (e.getStorage = function(e) {
                  if (window.localStorage)
                    return (e = "vConsole_" + e), localStorage.getItem(e);
                });
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t, o(0), o(10)]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o, n, r) {
              "use strict";
              var i;
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0),
                (r = (i = r) && i.__esModule ? i : { default: i });
              var a = {
                one: function(e, t) {
                  return t ? t.querySelector(e) : document.querySelector(e);
                },
                all: function(e, t) {
                  var o,
                    n = [];
                  return (
                    (o = t
                      ? t.querySelectorAll(e)
                      : document.querySelectorAll(e)) &&
                      o.length > 0 &&
                      (n = Array.prototype.slice.call(o)),
                    n
                  );
                },
                addClass: function(e, t) {
                  if (e) {
                    (0, n.isArray)(e) || (e = [e]);
                    for (var o = 0; o < e.length; o++) {
                      var r = e[o].className || "",
                        i = r.split(" ");
                      i.indexOf(t) > -1 ||
                        (i.push(t), (e[o].className = i.join(" ")));
                    }
                  }
                },
                removeClass: function(e, t) {
                  if (e) {
                    (0, n.isArray)(e) || (e = [e]);
                    for (var o = 0; o < e.length; o++) {
                      for (
                        var r = e[o].className.split(" "), i = 0;
                        i < r.length;
                        i++
                      )
                        r[i] == t && (r[i] = "");
                      e[o].className = r.join(" ").trim();
                    }
                  }
                },
                hasClass: function(e, t) {
                  if (!e) return !1;
                  for (var o = e.className.split(" "), n = 0; n < o.length; n++)
                    if (o[n] == t) return !0;
                  return !1;
                },
                bind: function(e, t, o, r) {
                  if (e) {
                    void 0 === r && (r = !1), (0, n.isArray)(e) || (e = [e]);
                    for (var i = 0; i < e.length; i++)
                      e[i].addEventListener(t, o, r);
                  }
                },
                delegate: function(e, t, o, n) {
                  e &&
                    e.addEventListener(
                      t,
                      function(t) {
                        var r = a.all(o, e);
                        if (r)
                          e: for (var i = 0; i < r.length; i++)
                            for (var l = t.target; l; ) {
                              if (l == r[i]) {
                                n.call(l, t);
                                break e;
                              }
                              if ((l = l.parentNode) == e) break;
                            }
                      },
                      !1
                    );
                }
              };
              a.render = r.default;
              var l = a;
              (o.default = l), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o) {
              "use strict";
              function n(e, t) {
                for (var o = 0; o < t.length; o++) {
                  var n = t[o];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n);
                }
              }
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0);
              var r = (function() {
                function e(t) {
                  var o =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : "newPlugin";
                  !(function(e, t) {
                    if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, e),
                    (this.id = t),
                    (this.name = o),
                    (this.isReady = !1),
                    (this.eventList = {});
                }
                return (
                  (t = e),
                  (o = [
                    {
                      key: "on",
                      value: function(e, t) {
                        return (this.eventList[e] = t), this;
                      }
                    },
                    {
                      key: "trigger",
                      value: function(e, t) {
                        if ("function" == typeof this.eventList[e])
                          this.eventList[e].call(this, t);
                        else {
                          var o = "on" + e.charAt(0).toUpperCase() + e.slice(1);
                          "function" == typeof this[o] && this[o].call(this, t);
                        }
                        return this;
                      }
                    },
                    {
                      key: "id",
                      get: function() {
                        return this._id;
                      },
                      set: function(e) {
                        if (!e) throw "Plugin ID cannot be empty";
                        this._id = e.toLowerCase();
                      }
                    },
                    {
                      key: "name",
                      get: function() {
                        return this._name;
                      },
                      set: function(e) {
                        if (!e) throw "Plugin name cannot be empty";
                        this._name = e;
                      }
                    },
                    {
                      key: "vConsole",
                      get: function() {
                        return this._vConsole || void 0;
                      },
                      set: function(e) {
                        if (!e) throw "vConsole cannot be empty";
                        this._vConsole = e;
                      }
                    }
                  ]) && n(t.prototype, o),
                  r && n(t, r),
                  e
                );
                var t, o, r;
              })();
              (o.default = r), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t, o) {
      "use strict";
      e.exports = function(e) {
        var t = [];
        return (
          (t.toString = function() {
            return this.map(function(t) {
              var o = (function(e, t) {
                var o = e[1] || "",
                  n = e[3];
                if (!n) return o;
                if (t && "function" == typeof btoa) {
                  var r = ((a = n),
                    "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," +
                      btoa(unescape(encodeURIComponent(JSON.stringify(a)))) +
                      " */"),
                    i = n.sources.map(function(e) {
                      return "/*# sourceURL=" + n.sourceRoot + e + " */";
                    });
                  return [o]
                    .concat(i)
                    .concat([r])
                    .join("\n");
                }
                var a;
                return [o].join("\n");
              })(t, e);
              return t[2] ? "@media " + t[2] + "{" + o + "}" : o;
            }).join("");
          }),
          (t.i = function(e, o) {
            "string" == typeof e && (e = [[null, e, ""]]);
            for (var n = {}, r = 0; r < this.length; r++) {
              var i = this[r][0];
              null != i && (n[i] = !0);
            }
            for (r = 0; r < e.length; r++) {
              var a = e[r];
              (null != a[0] && n[a[0]]) ||
                (o && !a[2]
                  ? (a[2] = o)
                  : o && (a[2] = "(" + a[2] + ") and (" + o + ")"),
                t.push(a));
            }
          }),
          t
        );
      };
    },
    function(e, t, o) {
      var n,
        r,
        i = {},
        a = ((n = function() {
          return window && document && document.all && !window.atob;
        }),
        function() {
          return void 0 === r && (r = n.apply(this, arguments)), r;
        }),
        l = (function(e) {
          var t = {};
          return function(e, o) {
            if ("function" == typeof e) return e();
            if (void 0 === t[e]) {
              var n = function(e, t) {
                return t ? t.querySelector(e) : document.querySelector(e);
              }.call(this, e, o);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (e) {
                  n = null;
                }
              t[e] = n;
            }
            return t[e];
          };
        })(),
        c = null,
        s = 0,
        d = [],
        u = o(13);
      function f(e, t) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o],
            r = i[n.id];
          if (r) {
            r.refs++;
            for (var a = 0; a < r.parts.length; a++) r.parts[a](n.parts[a]);
            for (; a < n.parts.length; a++) r.parts.push(g(n.parts[a], t));
          } else {
            var l = [];
            for (a = 0; a < n.parts.length; a++) l.push(g(n.parts[a], t));
            i[n.id] = { id: n.id, refs: 1, parts: l };
          }
        }
      }
      function v(e, t) {
        for (var o = [], n = {}, r = 0; r < e.length; r++) {
          var i = e[r],
            a = t.base ? i[0] + t.base : i[0],
            l = { css: i[1], media: i[2], sourceMap: i[3] };
          n[a] ? n[a].parts.push(l) : o.push((n[a] = { id: a, parts: [l] }));
        }
        return o;
      }
      function p(e, t) {
        var o = l(e.insertInto);
        if (!o)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid."
          );
        var n = d[d.length - 1];
        if ("top" === e.insertAt)
          n
            ? n.nextSibling
              ? o.insertBefore(t, n.nextSibling)
              : o.appendChild(t)
            : o.insertBefore(t, o.firstChild),
            d.push(t);
        else if ("bottom" === e.insertAt) o.appendChild(t);
        else {
          if ("object" != typeof e.insertAt || !e.insertAt.before)
            throw new Error(
              "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
            );
          var r = l(e.insertAt.before, o);
          o.insertBefore(t, r);
        }
      }
      function b(e) {
        if (null === e.parentNode) return !1;
        e.parentNode.removeChild(e);
        var t = d.indexOf(e);
        t >= 0 && d.splice(t, 1);
      }
      function h(e) {
        var t = document.createElement("style");
        if (
          (void 0 === e.attrs.type && (e.attrs.type = "text/css"),
          void 0 === e.attrs.nonce)
        ) {
          var n = (function() {
            0;
            return o.nc;
          })();
          n && (e.attrs.nonce = n);
        }
        return m(t, e.attrs), p(e, t), t;
      }
      function m(e, t) {
        Object.keys(t).forEach(function(o) {
          e.setAttribute(o, t[o]);
        });
      }
      function g(e, t) {
        var o, n, r, i;
        if (t.transform && e.css) {
          if (
            !(i =
              "function" == typeof t.transform
                ? t.transform(e.css)
                : t.transform.default(e.css))
          )
            return function() {};
          e.css = i;
        }
        if (t.singleton) {
          var a = s++;
          (o = c || (c = h(t))),
            (n = w.bind(null, o, a, !1)),
            (r = w.bind(null, o, a, !0));
        } else
          e.sourceMap &&
          "function" == typeof URL &&
          "function" == typeof URL.createObjectURL &&
          "function" == typeof URL.revokeObjectURL &&
          "function" == typeof Blob &&
          "function" == typeof btoa
            ? ((o = (function(e) {
                var t = document.createElement("link");
                return (
                  void 0 === e.attrs.type && (e.attrs.type = "text/css"),
                  (e.attrs.rel = "stylesheet"),
                  m(t, e.attrs),
                  p(e, t),
                  t
                );
              })(t)),
              (n = function(e, t, o) {
                var n = o.css,
                  r = o.sourceMap,
                  i = void 0 === t.convertToAbsoluteUrls && r;
                (t.convertToAbsoluteUrls || i) && (n = u(n));
                r &&
                  (n +=
                    "\n/*# sourceMappingURL=data:application/json;base64," +
                    btoa(unescape(encodeURIComponent(JSON.stringify(r)))) +
                    " */");
                var a = new Blob([n], { type: "text/css" }),
                  l = e.href;
                (e.href = URL.createObjectURL(a)), l && URL.revokeObjectURL(l);
              }.bind(null, o, t)),
              (r = function() {
                b(o), o.href && URL.revokeObjectURL(o.href);
              }))
            : ((o = h(t)),
              (n = function(e, t) {
                var o = t.css,
                  n = t.media;
                n && e.setAttribute("media", n);
                if (e.styleSheet) e.styleSheet.cssText = o;
                else {
                  for (; e.firstChild; ) e.removeChild(e.firstChild);
                  e.appendChild(document.createTextNode(o));
                }
              }.bind(null, o)),
              (r = function() {
                b(o);
              }));
        return (
          n(e),
          function(t) {
            if (t) {
              if (
                t.css === e.css &&
                t.media === e.media &&
                t.sourceMap === e.sourceMap
              )
                return;
              n((e = t));
            } else r();
          }
        );
      }
      e.exports = function(e, t) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document)
          throw new Error(
            "The style-loader cannot be used in a non-browser environment"
          );
        ((t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}),
          t.singleton || "boolean" == typeof t.singleton || (t.singleton = a()),
          t.insertInto || (t.insertInto = "head"),
          t.insertAt || (t.insertAt = "bottom");
        var o = v(e, t);
        return (
          f(o, t),
          function(e) {
            for (var n = [], r = 0; r < o.length; r++) {
              var a = o[r];
              (l = i[a.id]).refs--, n.push(l);
            }
            e && f(v(e, t), t);
            for (r = 0; r < n.length; r++) {
              var l;
              if (0 === (l = n[r]).refs) {
                for (var c = 0; c < l.parts.length; c++) l.parts[c]();
                delete i[l.id];
              }
            }
          }
        );
      };
      var y,
        _ = ((y = []),
        function(e, t) {
          return (y[e] = t), y.filter(Boolean).join("\n");
        });
      function w(e, t, o, n) {
        var r = o ? "" : n.css;
        if (e.styleSheet) e.styleSheet.cssText = _(t, r);
        else {
          var i = document.createTextNode(r),
            a = e.childNodes;
          a[t] && e.removeChild(a[t]),
            a.length ? e.insertBefore(i, a[t]) : e.appendChild(i);
        }
      }
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t, o(0), o(1), o(2), o(20), o(21), o(22)]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o, n, r, i, a, l, c) {
              "use strict";
              function s(e) {
                return e && e.__esModule ? e : { default: e };
              }
              function d(e) {
                return (d =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function(e) {
                        return typeof e;
                      }
                    : function(e) {
                        return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                      })(e);
              }
              function u(e, t) {
                for (var o = 0; o < t.length; o++) {
                  var n = t[o];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n);
                }
              }
              function f(e, t) {
                return !t || ("object" !== d(t) && "function" != typeof t)
                  ? (function(e) {
                      if (void 0 === e)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called"
                        );
                      return e;
                    })(e)
                  : t;
              }
              function v(e) {
                return (v = Object.setPrototypeOf
                  ? Object.getPrototypeOf
                  : function(e) {
                      return e.__proto__ || Object.getPrototypeOf(e);
                    })(e);
              }
              function p(e, t) {
                return (p =
                  Object.setPrototypeOf ||
                  function(e, t) {
                    return (e.__proto__ = t), e;
                  })(e, t);
              }
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0),
                (n = (function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e)
                    for (var o in e)
                      if (Object.prototype.hasOwnProperty.call(e, o)) {
                        var n =
                          Object.defineProperty &&
                          Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(e, o)
                            : {};
                        n.get || n.set
                          ? Object.defineProperty(t, o, n)
                          : (t[o] = e[o]);
                      }
                  return (t.default = e), t;
                })(n)),
                (r = s(r)),
                (i = s(i)),
                (a = s(a)),
                (l = s(l)),
                (c = s(c));
              var b = 1e3,
                h = (function(e) {
                  function t() {
                    var e, o;
                    !(function(e, t) {
                      if (!(e instanceof t))
                        throw new TypeError(
                          "Cannot call a class as a function"
                        );
                    })(this, t);
                    for (
                      var n = arguments.length, r = new Array(n), i = 0;
                      i < n;
                      i++
                    )
                      r[i] = arguments[i];
                    return (
                      ((o = f(
                        this,
                        (e = v(t)).call.apply(e, [this].concat(r))
                      )).tplTabbox = ""),
                      (o.allowUnformattedLog = !0),
                      (o.isReady = !1),
                      (o.isShow = !1),
                      (o.$tabbox = null),
                      (o.console = {}),
                      (o.logList = []),
                      (o.isInBottom = !0),
                      (o.maxLogNumber = b),
                      (o.logNumber = 0),
                      o.mockConsole(),
                      o
                    );
                  }
                  return (
                    (function(e, t) {
                      if ("function" != typeof t && null !== t)
                        throw new TypeError(
                          "Super expression must either be null or a function"
                        );
                      (e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                          value: e,
                          writable: !0,
                          configurable: !0
                        }
                      })),
                        t && p(e, t);
                    })(t, e),
                    (o = t),
                    (i = [
                      {
                        key: "onInit",
                        value: function() {
                          (this.$tabbox = r.default.render(this.tplTabbox, {})),
                            this.updateMaxLogNumber();
                        }
                      },
                      {
                        key: "onRenderTab",
                        value: function(e) {
                          e(this.$tabbox);
                        }
                      },
                      {
                        key: "onAddTopBar",
                        value: function(e) {
                          for (
                            var t = this,
                              o = ["All", "Log", "Info", "Warn", "Error"],
                              n = [],
                              i = 0;
                            i < o.length;
                            i++
                          )
                            n.push({
                              name: o[i],
                              data: { type: o[i].toLowerCase() },
                              className: "",
                              onClick: function() {
                                if (r.default.hasClass(this, "vc-actived"))
                                  return !1;
                                t.showLogType(this.dataset.type || "all");
                              }
                            });
                          (n[0].className = "vc-actived"), e(n);
                        }
                      },
                      {
                        key: "onAddTool",
                        value: function(e) {
                          var t = this,
                            o = [
                              {
                                name: "Clear",
                                global: !1,
                                onClick: function() {
                                  t.clearLog(),
                                    t.vConsole.triggerEvent("clearLog");
                                }
                              }
                            ];
                          e(o);
                        }
                      },
                      {
                        key: "onReady",
                        value: function() {
                          var e = this;
                          e.isReady = !0;
                          var t = r.default.all(".vc-subtab", e.$tabbox);
                          r.default.bind(t, "click", function(o) {
                            if (
                              (o.preventDefault(),
                              r.default.hasClass(this, "vc-actived"))
                            )
                              return !1;
                            r.default.removeClass(t, "vc-actived"),
                              r.default.addClass(this, "vc-actived");
                            var n = this.dataset.type,
                              i = r.default.one(".vc-log", e.$tabbox);
                            r.default.removeClass(i, "vc-log-partly-log"),
                              r.default.removeClass(i, "vc-log-partly-info"),
                              r.default.removeClass(i, "vc-log-partly-warn"),
                              r.default.removeClass(i, "vc-log-partly-error"),
                              "all" == n
                                ? r.default.removeClass(i, "vc-log-partly")
                                : (r.default.addClass(i, "vc-log-partly"),
                                  r.default.addClass(i, "vc-log-partly-" + n));
                          });
                          var o = r.default.one(".vc-content");
                          r.default.bind(o, "scroll", function(t) {
                            e.isShow &&
                              (o.scrollTop + o.offsetHeight >= o.scrollHeight
                                ? (e.isInBottom = !0)
                                : (e.isInBottom = !1));
                          });
                          for (var n = 0; n < e.logList.length; n++)
                            e.printLog(e.logList[n]);
                          e.logList = [];
                        }
                      },
                      {
                        key: "onRemove",
                        value: function() {
                          (window.console.log = this.console.log),
                            (window.console.info = this.console.info),
                            (window.console.warn = this.console.warn),
                            (window.console.debug = this.console.debug),
                            (window.console.error = this.console.error),
                            (window.console.time = this.console.time),
                            (window.console.timeEnd = this.console.timeEnd),
                            (window.console.clear = this.console.clear),
                            (this.console = {});
                        }
                      },
                      {
                        key: "onShow",
                        value: function() {
                          (this.isShow = !0),
                            1 == this.isInBottom && this.autoScrollToBottom();
                        }
                      },
                      {
                        key: "onHide",
                        value: function() {
                          this.isShow = !1;
                        }
                      },
                      {
                        key: "onShowConsole",
                        value: function() {
                          1 == this.isInBottom && this.autoScrollToBottom();
                        }
                      },
                      {
                        key: "onUpdateOption",
                        value: function() {
                          this.vConsole.option.maxLogNumber !=
                            this.maxLogNumber &&
                            (this.updateMaxLogNumber(), this.limitMaxLogs());
                        }
                      },
                      {
                        key: "updateMaxLogNumber",
                        value: function() {
                          (this.maxLogNumber =
                            this.vConsole.option.maxLogNumber || b),
                            (this.maxLogNumber = Math.max(
                              1,
                              this.maxLogNumber
                            ));
                        }
                      },
                      {
                        key: "limitMaxLogs",
                        value: function() {
                          if (this.isReady)
                            for (; this.logNumber > this.maxLogNumber; ) {
                              var e = r.default.one(".vc-item", this.$tabbox);
                              if (!e) break;
                              e.parentNode.removeChild(e), this.logNumber--;
                            }
                        }
                      },
                      {
                        key: "showLogType",
                        value: function(e) {
                          var t = r.default.one(".vc-log", this.$tabbox);
                          r.default.removeClass(t, "vc-log-partly-log"),
                            r.default.removeClass(t, "vc-log-partly-info"),
                            r.default.removeClass(t, "vc-log-partly-warn"),
                            r.default.removeClass(t, "vc-log-partly-error"),
                            "all" == e
                              ? r.default.removeClass(t, "vc-log-partly")
                              : (r.default.addClass(t, "vc-log-partly"),
                                r.default.addClass(t, "vc-log-partly-" + e));
                        }
                      },
                      {
                        key: "autoScrollToBottom",
                        value: function() {
                          this.vConsole.option.disableLogScrolling ||
                            this.scrollToBottom();
                        }
                      },
                      {
                        key: "scrollToBottom",
                        value: function() {
                          var e = r.default.one(".vc-content");
                          e && (e.scrollTop = e.scrollHeight - e.offsetHeight);
                        }
                      },
                      {
                        key: "mockConsole",
                        value: function() {
                          var e = this,
                            t = this,
                            o = ["log", "info", "warn", "debug", "error"];
                          window.console
                            ? (o.map(function(e) {
                                t.console[e] = window.console[e];
                              }),
                              (t.console.time = window.console.time),
                              (t.console.timeEnd = window.console.timeEnd),
                              (t.console.clear = window.console.clear))
                            : (window.console = {}),
                            o.map(function(t) {
                              window.console[t] = function() {
                                for (
                                  var o = arguments.length,
                                    n = new Array(o),
                                    r = 0;
                                  r < o;
                                  r++
                                )
                                  n[r] = arguments[r];
                                e.printLog({ logType: t, logs: n });
                              };
                            });
                          var n = {};
                          (window.console.time = function(e) {
                            n[e] = Date.now();
                          }),
                            (window.console.timeEnd = function(e) {
                              var t = n[e];
                              t
                                ? (console.log(e + ":", Date.now() - t + "ms"),
                                  delete n[e])
                                : console.log(e + ": 0ms");
                            }),
                            (window.console.clear = function() {
                              t.clearLog();
                              for (
                                var e = arguments.length,
                                  o = new Array(e),
                                  n = 0;
                                n < e;
                                n++
                              )
                                o[n] = arguments[n];
                              t.console.clear.apply(window.console, o);
                            });
                        }
                      },
                      {
                        key: "clearLog",
                        value: function() {
                          (r.default.one(".vc-log", this.$tabbox).innerHTML =
                            ""),
                            (this.logNumber = 0);
                        }
                      },
                      {
                        key: "printOriginLog",
                        value: function(e) {
                          "function" == typeof this.console[e.logType] &&
                            this.console[e.logType].apply(
                              window.console,
                              e.logs
                            );
                        }
                      },
                      {
                        key: "printLog",
                        value: function(e) {
                          var t = e.logs || [];
                          if (t.length || e.content) {
                            t = [].slice.call(t || []);
                            var o = !0,
                              i = /^\[(\w+)\]$/i,
                              l = "";
                            if (n.isString(t[0])) {
                              var c = t[0].match(i);
                              null !== c &&
                                c.length > 0 &&
                                (l = c[1].toLowerCase());
                            }
                            if (
                              (l
                                ? (o = l == this.id)
                                : 0 == this.allowUnformattedLog && (o = !1),
                              o)
                            )
                              if (
                                (e.date || (e.date = +new Date()), this.isReady)
                              ) {
                                if (
                                  (n.isString(t[0]) &&
                                    ((t[0] = t[0].replace(i, "")),
                                    "" === t[0] && t.shift()),
                                  !e.meta)
                                ) {
                                  var s = n.getDate(e.date);
                                  e.meta =
                                    s.hour + ":" + s.minute + ":" + s.second;
                                }
                                for (
                                  var u = r.default.render(a.default, {
                                      logType: e.logType,
                                      noMeta: !!e.noMeta,
                                      meta: e.meta,
                                      style: e.style || ""
                                    }),
                                    f = r.default.one(".vc-item-content", u),
                                    v = 0;
                                  v < t.length;
                                  v++
                                ) {
                                  var p = void 0;
                                  try {
                                    if ("" === t[v]) continue;
                                    p = n.isFunction(t[v])
                                      ? "<span> " + t[v].toString() + "</span>"
                                      : n.isObject(t[v]) || n.isArray(t[v])
                                      ? this.getFoldedLine(t[v])
                                      : "<span> " +
                                        n
                                          .htmlEncode(t[v])
                                          .replace(/\n/g, "<br/>") +
                                        "</span>";
                                  } catch (e) {
                                    p = "<span> [" + d(t[v]) + "]</span>";
                                  }
                                  p &&
                                    ("string" == typeof p
                                      ? f.insertAdjacentHTML("beforeend", p)
                                      : f.insertAdjacentElement(
                                          "beforeend",
                                          p
                                        ));
                                }
                                n.isObject(e.content) &&
                                  f.insertAdjacentElement(
                                    "beforeend",
                                    e.content
                                  ),
                                  r.default
                                    .one(".vc-log", this.$tabbox)
                                    .insertAdjacentElement("beforeend", u),
                                  this.logNumber++,
                                  this.limitMaxLogs(),
                                  this.isInBottom && this.autoScrollToBottom(),
                                  e.noOrigin || this.printOriginLog(e);
                              } else this.logList.push(e);
                            else e.noOrigin || this.printOriginLog(e);
                          }
                        }
                      },
                      {
                        key: "getFoldedLine",
                        value: function(e, t) {
                          var o = this;
                          if (!t) {
                            var i = n.JSONStringify(e),
                              a = i.substr(0, 36);
                            (t = n.getObjName(e)),
                              i.length > 36 && (a += "..."),
                              (t += " " + a);
                          }
                          var s = r.default.render(l.default, {
                            outer: t,
                            lineType: "obj"
                          });
                          return (
                            r.default.bind(
                              r.default.one(".vc-fold-outer", s),
                              "click",
                              function(t) {
                                t.preventDefault(),
                                  t.stopPropagation(),
                                  r.default.hasClass(s, "vc-toggle")
                                    ? (r.default.removeClass(s, "vc-toggle"),
                                      r.default.removeClass(
                                        r.default.one(".vc-fold-inner", s),
                                        "vc-toggle"
                                      ),
                                      r.default.removeClass(
                                        r.default.one(".vc-fold-outer", s),
                                        "vc-toggle"
                                      ))
                                    : (r.default.addClass(s, "vc-toggle"),
                                      r.default.addClass(
                                        r.default.one(".vc-fold-inner", s),
                                        "vc-toggle"
                                      ),
                                      r.default.addClass(
                                        r.default.one(".vc-fold-outer", s),
                                        "vc-toggle"
                                      ));
                                var i = r.default.one(".vc-fold-inner", s);
                                return (
                                  setTimeout(function() {
                                    if (0 == i.children.length && e) {
                                      for (
                                        var t = n.getObjAllKeys(e), a = 0;
                                        a < t.length;
                                        a++
                                      ) {
                                        var s = void 0,
                                          d = "undefined",
                                          u = "";
                                        try {
                                          s = e[t[a]];
                                        } catch (e) {
                                          continue;
                                        }
                                        n.isString(s)
                                          ? ((d = "string"),
                                            (s = '"' + s + '"'))
                                          : n.isNumber(s)
                                          ? (d = "number")
                                          : n.isBoolean(s)
                                          ? (d = "boolean")
                                          : n.isNull(s)
                                          ? ((d = "null"), (s = "null"))
                                          : n.isUndefined(s)
                                          ? ((d = "undefined"),
                                            (s = "undefined"))
                                          : n.isFunction(s)
                                          ? ((d = "function"),
                                            (s = "function()"))
                                          : n.isSymbol(s) && (d = "symbol");
                                        var f = void 0;
                                        if (n.isArray(s)) {
                                          var v =
                                            n.getObjName(s) +
                                            "[" +
                                            s.length +
                                            "]";
                                          f = o.getFoldedLine(
                                            s,
                                            r.default.render(
                                              c.default,
                                              {
                                                key: t[a],
                                                keyType: u,
                                                value: v,
                                                valueType: "array"
                                              },
                                              !0
                                            )
                                          );
                                        } else if (n.isObject(s)) {
                                          var p = n.getObjName(s);
                                          f = o.getFoldedLine(
                                            s,
                                            r.default.render(
                                              c.default,
                                              {
                                                key: n.htmlEncode(t[a]),
                                                keyType: u,
                                                value: p,
                                                valueType: "object"
                                              },
                                              !0
                                            )
                                          );
                                        } else {
                                          e.hasOwnProperty &&
                                            !e.hasOwnProperty(t[a]) &&
                                            (u = "private");
                                          var b = {
                                            lineType: "kv",
                                            key: n.htmlEncode(t[a]),
                                            keyType: u,
                                            value: n.htmlEncode(s),
                                            valueType: d
                                          };
                                          f = r.default.render(l.default, b);
                                        }
                                        i.insertAdjacentElement("beforeend", f);
                                      }
                                      if (n.isObject(e)) {
                                        var h,
                                          m = e.__proto__;
                                        (h = n.isObject(m)
                                          ? o.getFoldedLine(
                                              m,
                                              r.default.render(
                                                c.default,
                                                {
                                                  key: "__proto__",
                                                  keyType: "private",
                                                  value: n.getObjName(m),
                                                  valueType: "object"
                                                },
                                                !0
                                              )
                                            )
                                          : r.default.render(c.default, {
                                              key: "__proto__",
                                              keyType: "private",
                                              value: "null",
                                              valueType: "null"
                                            })),
                                          i.insertAdjacentElement(
                                            "beforeend",
                                            h
                                          );
                                      }
                                    }
                                  }),
                                  !1
                                );
                              }
                            ),
                            s
                          );
                        }
                      }
                    ]) && u(o.prototype, i),
                    s && u(o, s),
                    t
                  );
                  var o, i, s;
                })(i.default);
              (o.default = h), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t, o(7), o(8), o(2)]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o, n, r, i) {
              "use strict";
              function a(e) {
                return e && e.__esModule ? e : { default: e };
              }
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0),
                (r = a(r)),
                (i = a(i)),
                (r.default.VConsolePlugin = i.default);
              var l = r.default;
              (o.default = l), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t, o) {
      var n, r, i;
      (r = []),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function() {
              "use strict";
              if ("undefined" == typeof Symbol) {
                window.Symbol = function() {};
                var e = "__symbol_iterator_key";
                (window.Symbol.iterator = e),
                  (Array.prototype[e] = function() {
                    var e = this,
                      t = 0;
                    return {
                      next: function() {
                        return {
                          done: e.length === t,
                          value: e.length === t ? void 0 : e[t++]
                        };
                      }
                    };
                  });
              }
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t, o) {
      var n, r, i;
      (r = [
        t,
        o(9),
        o(0),
        o(1),
        o(11),
        o(14),
        o(15),
        o(16),
        o(17),
        o(18),
        o(19),
        o(25),
        o(27),
        o(31),
        o(38)
      ]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o, n, r, i, a, l, c, s, d, u, f, v, p, b, h) {
              "use strict";
              function m(e) {
                return e && e.__esModule ? e : { default: e };
              }
              function g(e, t) {
                for (var o = 0; o < t.length; o++) {
                  var n = t[o];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n);
                }
              }
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0),
                (n = m(n)),
                (r = (function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e)
                    for (var o in e)
                      if (Object.prototype.hasOwnProperty.call(e, o)) {
                        var n =
                          Object.defineProperty &&
                          Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(e, o)
                            : {};
                        n.get || n.set
                          ? Object.defineProperty(t, o, n)
                          : (t[o] = e[o]);
                      }
                  return (t.default = e), t;
                })(r)),
                (i = m(i)),
                (l = m(l)),
                (c = m(c)),
                (s = m(s)),
                (d = m(d)),
                (u = m(u)),
                (f = m(f)),
                (v = m(v)),
                (p = m(p)),
                (b = m(b)),
                (h = m(h));
              var y = "#__vconsole",
                _ = (function() {
                  function e(t) {
                    if (
                      ((function(e, t) {
                        if (!(e instanceof t))
                          throw new TypeError(
                            "Cannot call a class as a function"
                          );
                      })(this, e),
                      i.default.one(y))
                    )
                      console.debug("vConsole is already exists.");
                    else {
                      var o = this;
                      if (
                        ((this.version = n.default.version),
                        (this.$dom = null),
                        (this.isInited = !1),
                        (this.option = {
                          defaultPlugins: [
                            "system",
                            "network",
                            "element",
                            "storage"
                          ]
                        }),
                        (this.activedTab = ""),
                        (this.tabList = []),
                        (this.pluginList = {}),
                        (this.switchPos = {
                          x: 10,
                          y: 10,
                          startX: 0,
                          startY: 0,
                          endX: 0,
                          endY: 0
                        }),
                        (this.tool = r),
                        (this.$ = i.default),
                        r.isObject(t))
                      )
                        for (var a in t) this.option[a] = t[a];
                      this._addBuiltInPlugins();
                      var l,
                        c = function() {
                          o.isInited ||
                            (o._render(),
                            o._mockTap(),
                            o._bindEvent(),
                            o._autoRun());
                        };
                      if (void 0 !== document)
                        "complete" == document.readyState
                          ? c()
                          : i.default.bind(window, "load", c);
                      else
                        l = setTimeout(function e() {
                          document && "complete" == document.readyState
                            ? (l && clearTimeout(l), c())
                            : (l = setTimeout(e, 1));
                        }, 1);
                    }
                  }
                  return (
                    (t = e),
                    (o = [
                      {
                        key: "_addBuiltInPlugins",
                        value: function() {
                          this.addPlugin(new f.default("default", "Log"));
                          var e = this.option.defaultPlugins,
                            t = {
                              system: { proto: v.default, name: "System" },
                              network: { proto: p.default, name: "Network" },
                              element: { proto: b.default, name: "Element" },
                              storage: { proto: h.default, name: "Storage" }
                            };
                          if (e && r.isArray(e))
                            for (var o = 0; o < e.length; o++) {
                              var n = t[e[o]];
                              n
                                ? this.addPlugin(new n.proto(e[o], n.name))
                                : console.debug(
                                    "Unrecognized default plugin ID:",
                                    e[o]
                                  );
                            }
                        }
                      },
                      {
                        key: "_render",
                        value: function() {
                          if (!i.default.one(y)) {
                            var e = document.createElement("div");
                            (e.innerHTML = l.default),
                              document.documentElement.insertAdjacentElement(
                                "beforeend",
                                e.children[0]
                              );
                          }
                          this.$dom = i.default.one(y);
                          var t = i.default.one(".vc-switch", this.$dom),
                            o = 1 * r.getStorage("switch_x"),
                            n = 1 * r.getStorage("switch_y");
                          (o || n) &&
                            (o + t.offsetWidth >
                              document.documentElement.offsetWidth &&
                              (o =
                                document.documentElement.offsetWidth -
                                t.offsetWidth),
                            n + t.offsetHeight >
                              document.documentElement.offsetHeight &&
                              (n =
                                document.documentElement.offsetHeight -
                                t.offsetHeight),
                            o < 0 && (o = 0),
                            n < 0 && (n = 0),
                            (this.switchPos.x = o),
                            (this.switchPos.y = n),
                            (i.default.one(".vc-switch").style.right =
                              o + "px"),
                            (i.default.one(".vc-switch").style.bottom =
                              n + "px"));
                          var a = window.devicePixelRatio || 1,
                            c = document.querySelector('[name="viewport"]');
                          if (c && c.content) {
                            var s = c.content.match(
                                /initial\-scale\=\d+(\.\d+)?/
                              ),
                              d = s ? parseFloat(s[0].split("=")[1]) : 1;
                            d < 1 && (this.$dom.style.fontSize = 13 * a + "px");
                          }
                          i.default.one(".vc-mask", this.$dom).style.display =
                            "none";
                        }
                      },
                      {
                        key: "_mockTap",
                        value: function() {
                          var e,
                            t,
                            o,
                            n = !1,
                            r = null;
                          this.$dom.addEventListener(
                            "touchstart",
                            function(n) {
                              if (void 0 === e) {
                                var i = n.targetTouches[0];
                                (t = i.pageX),
                                  (o = i.pageY),
                                  (e = n.timeStamp),
                                  (r =
                                    n.target.nodeType === Node.TEXT_NODE
                                      ? n.target.parentNode
                                      : n.target);
                              }
                            },
                            !1
                          ),
                            this.$dom.addEventListener("touchmove", function(
                              e
                            ) {
                              var r = e.changedTouches[0];
                              (Math.abs(r.pageX - t) > 10 ||
                                Math.abs(r.pageY - o) > 10) &&
                                (n = !0);
                            }),
                            this.$dom.addEventListener(
                              "touchend",
                              function(t) {
                                if (
                                  !1 === n &&
                                  t.timeStamp - e < 700 &&
                                  null != r
                                ) {
                                  var o = r.tagName.toLowerCase(),
                                    i = !1;
                                  switch (o) {
                                    case "textarea":
                                      i = !0;
                                      break;
                                    case "input":
                                      switch (r.type) {
                                        case "button":
                                        case "checkbox":
                                        case "file":
                                        case "image":
                                        case "radio":
                                        case "submit":
                                          i = !1;
                                          break;
                                        default:
                                          i = !r.disabled && !r.readOnly;
                                      }
                                  }
                                  i ? r.focus() : t.preventDefault();
                                  var a = t.changedTouches[0],
                                    l = document.createEvent("MouseEvents");
                                  l.initMouseEvent(
                                    "click",
                                    !0,
                                    !0,
                                    window,
                                    1,
                                    a.screenX,
                                    a.screenY,
                                    a.clientX,
                                    a.clientY,
                                    !1,
                                    !1,
                                    !1,
                                    !1,
                                    0,
                                    null
                                  ),
                                    (l.forwardedTouchEvent = !0),
                                    l.initEvent("click", !0, !0),
                                    r.dispatchEvent(l);
                                }
                                (e = void 0), (n = !1), (r = null);
                              },
                              !1
                            );
                        }
                      },
                      {
                        key: "_bindEvent",
                        value: function() {
                          var e = this,
                            t = i.default.one(".vc-switch", e.$dom);
                          i.default.bind(t, "touchstart", function(t) {
                            (e.switchPos.startX = t.touches[0].pageX),
                              (e.switchPos.startY = t.touches[0].pageY);
                          }),
                            i.default.bind(t, "touchend", function(t) {
                              (e.switchPos.x = e.switchPos.endX),
                                (e.switchPos.y = e.switchPos.endY),
                                (e.switchPos.startX = 0),
                                (e.switchPos.startY = 0),
                                (e.switchPos.endX = 0),
                                (e.switchPos.endY = 0),
                                r.setStorage("switch_x", e.switchPos.x),
                                r.setStorage("switch_y", e.switchPos.y);
                            }),
                            i.default.bind(t, "touchmove", function(o) {
                              if (o.touches.length > 0) {
                                var n = o.touches[0].pageX - e.switchPos.startX,
                                  r = o.touches[0].pageY - e.switchPos.startY,
                                  i = e.switchPos.x - n,
                                  a = e.switchPos.y - r;
                                i + t.offsetWidth >
                                  document.documentElement.offsetWidth &&
                                  (i =
                                    document.documentElement.offsetWidth -
                                    t.offsetWidth),
                                  a + t.offsetHeight >
                                    document.documentElement.offsetHeight &&
                                    (a =
                                      document.documentElement.offsetHeight -
                                      t.offsetHeight),
                                  i < 0 && (i = 0),
                                  a < 0 && (a = 0),
                                  (t.style.right = i + "px"),
                                  (t.style.bottom = a + "px"),
                                  (e.switchPos.endX = i),
                                  (e.switchPos.endY = a),
                                  o.preventDefault();
                              }
                            }),
                            i.default.bind(
                              i.default.one(".vc-switch", e.$dom),
                              "click",
                              function() {
                                e.show();
                              }
                            ),
                            i.default.bind(
                              i.default.one(".vc-hide", e.$dom),
                              "click",
                              function() {
                                e.hide();
                              }
                            ),
                            i.default.bind(
                              i.default.one(".vc-mask", e.$dom),
                              "click",
                              function(t) {
                                if (t.target != i.default.one(".vc-mask"))
                                  return !1;
                                e.hide();
                              }
                            ),
                            i.default.delegate(
                              i.default.one(".vc-tabbar", e.$dom),
                              "click",
                              ".vc-tab",
                              function(t) {
                                var o = this.dataset.tab;
                                o != e.activedTab && e.showTab(o);
                              }
                            ),
                            i.default.bind(
                              i.default.one(".vc-panel", e.$dom),
                              "transitionend webkitTransitionEnd oTransitionEnd otransitionend",
                              function(t) {
                                if (t.target != i.default.one(".vc-panel"))
                                  return !1;
                                i.default.hasClass(e.$dom, "vc-toggle") ||
                                  (t.target.style.display = "none");
                              }
                            );
                          var o = i.default.one(".vc-content", e.$dom),
                            n = !1;
                          i.default.bind(o, "touchstart", function(e) {
                            var t = o.scrollTop,
                              r = o.scrollHeight,
                              a = t + o.offsetHeight;
                            0 === t
                              ? ((o.scrollTop = 1),
                                0 === o.scrollTop &&
                                  (i.default.hasClass(
                                    e.target,
                                    "vc-cmd-input"
                                  ) ||
                                    (n = !0)))
                              : a === r &&
                                ((o.scrollTop = t - 1),
                                o.scrollTop === t &&
                                  (i.default.hasClass(
                                    e.target,
                                    "vc-cmd-input"
                                  ) ||
                                    (n = !0)));
                          }),
                            i.default.bind(o, "touchmove", function(e) {
                              n && e.preventDefault();
                            }),
                            i.default.bind(o, "touchend", function(e) {
                              n = !1;
                            });
                        }
                      },
                      {
                        key: "_autoRun",
                        value: function() {
                          for (var e in ((this.isInited = !0), this.pluginList))
                            this._initPlugin(this.pluginList[e]);
                          this.tabList.length > 0 &&
                            this.showTab(this.tabList[0]),
                            this.triggerEvent("ready");
                        }
                      },
                      {
                        key: "triggerEvent",
                        value: function(e, t) {
                          (e = "on" + e.charAt(0).toUpperCase() + e.slice(1)),
                            r.isFunction(this.option[e]) &&
                              this.option[e].apply(this, t);
                        }
                      },
                      {
                        key: "_initPlugin",
                        value: function(e) {
                          var t = this;
                          (e.vConsole = this),
                            e.trigger("init"),
                            e.trigger("renderTab", function(o) {
                              t.tabList.push(e.id);
                              var n = i.default.render(c.default, {
                                id: e.id,
                                name: e.name
                              });
                              i.default
                                .one(".vc-tabbar", t.$dom)
                                .insertAdjacentElement("beforeend", n);
                              var a = i.default.render(s.default, { id: e.id });
                              o &&
                                (r.isString(o)
                                  ? (a.innerHTML += o)
                                  : r.isFunction(o.appendTo)
                                  ? o.appendTo(a)
                                  : r.isElement(o) &&
                                    a.insertAdjacentElement("beforeend", o)),
                                i.default
                                  .one(".vc-content", t.$dom)
                                  .insertAdjacentElement("beforeend", a);
                            }),
                            e.trigger("addTopBar", function(o) {
                              if (o)
                                for (
                                  var n = i.default.one(".vc-topbar", t.$dom),
                                    a = function(t) {
                                      var a = o[t],
                                        l = i.default.render(d.default, {
                                          name: a.name || "Undefined",
                                          className: a.className || "",
                                          pluginID: e.id
                                        });
                                      if (a.data)
                                        for (var c in a.data)
                                          l.dataset[c] = a.data[c];
                                      r.isFunction(a.onClick) &&
                                        i.default.bind(l, "click", function(t) {
                                          var o = a.onClick.call(l);
                                          !1 === o ||
                                            (i.default.removeClass(
                                              i.default.all(
                                                ".vc-topbar-" + e.id
                                              ),
                                              "vc-actived"
                                            ),
                                            i.default.addClass(
                                              l,
                                              "vc-actived"
                                            ));
                                        }),
                                        n.insertAdjacentElement("beforeend", l);
                                    },
                                    l = 0;
                                  l < o.length;
                                  l++
                                )
                                  a(l);
                            }),
                            e.trigger("addTool", function(o) {
                              if (o)
                                for (
                                  var n = i.default.one(
                                      ".vc-tool-last",
                                      t.$dom
                                    ),
                                    a = function(t) {
                                      var a = o[t],
                                        l = i.default.render(u.default, {
                                          name: a.name || "Undefined",
                                          pluginID: e.id
                                        });
                                      1 == a.global &&
                                        i.default.addClass(l, "vc-global-tool"),
                                        r.isFunction(a.onClick) &&
                                          i.default.bind(l, "click", function(
                                            e
                                          ) {
                                            a.onClick.call(l);
                                          }),
                                        n.parentNode.insertBefore(l, n);
                                    },
                                    l = 0;
                                  l < o.length;
                                  l++
                                )
                                  a(l);
                            }),
                            (e.isReady = !0),
                            e.trigger("ready");
                        }
                      },
                      {
                        key: "_triggerPluginsEvent",
                        value: function(e) {
                          for (var t in this.pluginList)
                            this.pluginList[t].isReady &&
                              this.pluginList[t].trigger(e);
                        }
                      },
                      {
                        key: "_triggerPluginEvent",
                        value: function(e, t) {
                          var o = this.pluginList[e];
                          o && o.isReady && o.trigger(t);
                        }
                      },
                      {
                        key: "addPlugin",
                        value: function(e) {
                          return void 0 !== this.pluginList[e.id]
                            ? (console.debug(
                                "Plugin " + e.id + " has already been added."
                              ),
                              !1)
                            : ((this.pluginList[e.id] = e),
                              this.isInited &&
                                (this._initPlugin(e),
                                1 == this.tabList.length &&
                                  this.showTab(this.tabList[0])),
                              !0);
                        }
                      },
                      {
                        key: "removePlugin",
                        value: function(e) {
                          e = (e + "").toLowerCase();
                          var t = this.pluginList[e];
                          if (void 0 === t)
                            return (
                              console.debug("Plugin " + e + " does not exist."),
                              !1
                            );
                          if ((t.trigger("remove"), this.isInited)) {
                            var o = i.default.one("#__vc_tab_" + e);
                            o && o.parentNode.removeChild(o);
                            for (
                              var n = i.default.all(
                                  ".vc-topbar-" + e,
                                  this.$dom
                                ),
                                r = 0;
                              r < n.length;
                              r++
                            )
                              n[r].parentNode.removeChild(n[r]);
                            var a = i.default.one("#__vc_log_" + e);
                            a && a.parentNode.removeChild(a);
                            for (
                              var l = i.default.all(".vc-tool-" + e, this.$dom),
                                c = 0;
                              c < l.length;
                              c++
                            )
                              l[c].parentNode.removeChild(l[c]);
                          }
                          var s = this.tabList.indexOf(e);
                          s > -1 && this.tabList.splice(s, 1);
                          try {
                            delete this.pluginList[e];
                          } catch (t) {
                            this.pluginList[e] = void 0;
                          }
                          return (
                            this.activedTab == e &&
                              this.tabList.length > 0 &&
                              this.showTab(this.tabList[0]),
                            !0
                          );
                        }
                      },
                      {
                        key: "show",
                        value: function() {
                          if (this.isInited) {
                            var e = this,
                              t = i.default.one(".vc-panel", this.$dom);
                            (t.style.display = "block"),
                              setTimeout(function() {
                                i.default.addClass(e.$dom, "vc-toggle"),
                                  e._triggerPluginsEvent("showConsole");
                                var t = i.default.one(".vc-mask", e.$dom);
                                t.style.display = "block";
                              }, 10);
                          }
                        }
                      },
                      {
                        key: "hide",
                        value: function() {
                          if (this.isInited) {
                            i.default.removeClass(this.$dom, "vc-toggle"),
                              this._triggerPluginsEvent("hideConsole");
                            var e = i.default.one(".vc-mask", this.$dom),
                              t = i.default.one(".vc-panel", this.$dom);
                            i.default.bind(e, "transitionend", function(o) {
                              (e.style.display = "none"),
                                (t.style.display = "none");
                            });
                          }
                        }
                      },
                      {
                        key: "showSwitch",
                        value: function() {
                          if (this.isInited) {
                            var e = i.default.one(".vc-switch", this.$dom);
                            e.style.display = "block";
                          }
                        }
                      },
                      {
                        key: "hideSwitch",
                        value: function() {
                          if (this.isInited) {
                            var e = i.default.one(".vc-switch", this.$dom);
                            e.style.display = "none";
                          }
                        }
                      },
                      {
                        key: "showTab",
                        value: function(e) {
                          if (this.isInited) {
                            var t = i.default.one("#__vc_log_" + e);
                            i.default.removeClass(
                              i.default.all(".vc-tab", this.$dom),
                              "vc-actived"
                            ),
                              i.default.addClass(
                                i.default.one("#__vc_tab_" + e),
                                "vc-actived"
                              ),
                              i.default.removeClass(
                                i.default.all(".vc-logbox", this.$dom),
                                "vc-actived"
                              ),
                              i.default.addClass(t, "vc-actived");
                            var o = i.default.all(".vc-topbar-" + e, this.$dom);
                            i.default.removeClass(
                              i.default.all(".vc-toptab", this.$dom),
                              "vc-toggle"
                            ),
                              i.default.addClass(o, "vc-toggle"),
                              o.length > 0
                                ? i.default.addClass(
                                    i.default.one(".vc-content", this.$dom),
                                    "vc-has-topbar"
                                  )
                                : i.default.removeClass(
                                    i.default.one(".vc-content", this.$dom),
                                    "vc-has-topbar"
                                  ),
                              i.default.removeClass(
                                i.default.all(".vc-tool", this.$dom),
                                "vc-toggle"
                              ),
                              i.default.addClass(
                                i.default.all(".vc-tool-" + e, this.$dom),
                                "vc-toggle"
                              ),
                              this.activedTab &&
                                this._triggerPluginEvent(
                                  this.activedTab,
                                  "hide"
                                ),
                              (this.activedTab = e),
                              this._triggerPluginEvent(this.activedTab, "show");
                          }
                        }
                      },
                      {
                        key: "setOption",
                        value: function(e, t) {
                          if (r.isString(e))
                            (this.option[e] = t),
                              this._triggerPluginsEvent("updateOption");
                          else if (r.isObject(e)) {
                            for (var o in e) this.option[o] = e[o];
                            this._triggerPluginsEvent("updateOption");
                          } else
                            console.debug(
                              "The first parameter of vConsole.setOption() must be a string or an object."
                            );
                        }
                      },
                      {
                        key: "destroy",
                        value: function() {
                          if (this.isInited) {
                            for (
                              var e = Object.keys(this.pluginList),
                                t = e.length - 1;
                              t >= 0;
                              t--
                            )
                              this.removePlugin(e[t]);
                            this.$dom.parentNode.removeChild(this.$dom);
                          }
                        }
                      }
                    ]) && g(t.prototype, o),
                    a && g(t, a),
                    e
                  );
                  var t, o, a;
                })();
              (o.default = _), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e) {
      e.exports = {
        name: "vconsole",
        version: "3.2.2",
        description:
          "A lightweight, extendable front-end developer tool for mobile web page.",
        homepage: "https://github.com/Tencent/vConsole",
        main: "dist/vconsole.min.js",
        scripts: { test: "mocha", dist: "webpack" },
        keywords: ["console", "debug", "mobile"],
        repository: {
          type: "git",
          url: "git+https://github.com/Tencent/vConsole.git"
        },
        dependencies: {},
        devDependencies: {
          "@babel/core": "^7.2.2",
          "@babel/preset-env": "^7.2.3",
          "@babel/plugin-proposal-class-properties": "^7.2.3",
          "@babel/plugin-proposal-export-namespace-from": "^7.2.0",
          "@babel/plugin-proposal-object-rest-spread": "^7.2.0",
          "babel-loader": "^8.0.4",
          "babel-plugin-add-module-exports": "^1.0.0",
          chai: "^4.2.0",
          "css-loader": "^2.1.0",
          "html-loader": "^0.5.5",
          jsdom: "^13.1.0",
          "json-loader": "^0.5.7",
          less: "^3.9.0",
          "less-loader": "^4.1.0",
          mocha: "^5.2.0",
          "style-loader": "^0.23.1",
          webpack: "^4.28.4",
          "webpack-cli": "^3.2.1"
        },
        author: "Tencent",
        license: "MIT"
      };
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o) {
              "use strict";
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = function(e, t, o) {
                  var n = /\{\{([^\}]+)\}\}/g,
                    r = "",
                    i = "",
                    a = 0,
                    l = [],
                    c = function(e, t) {
                      "" !== e &&
                        (t
                          ? e.match(/^ ?else/g)
                            ? (r += "} " + e + " {\n")
                            : e.match(/\/(if|for|switch)/g)
                            ? (r += "}\n")
                            : e.match(/^ ?if|for|switch/g)
                            ? (r += e + " {\n")
                            : e.match(/^ ?(break|continue) ?$/g)
                            ? (r += e + ";\n")
                            : e.match(/^ ?(case|default)/g)
                            ? (r += e + ":\n")
                            : (r += "arr.push(" + e + ");\n")
                          : (r +=
                              'arr.push("' + e.replace(/"/g, '\\"') + '");\n'));
                    };
                  for (
                    window.__mito_data = t,
                      window.__mito_code = "",
                      window.__mito_result = "",
                      e = (e = e.replace(
                        /(\{\{ ?switch(.+?)\}\})[\r\n\t ]+\{\{/g,
                        "$1{{"
                      ))
                        .replace(/^[\r\n]/, "")
                        .replace(/\n/g, "\\\n")
                        .replace(/\r/g, "\\\r"),
                      i = "(function(){\n",
                      r = "var arr = [];\n";
                    (l = n.exec(e));

                  )
                    c(e.slice(a, l.index), !1),
                      c(l[1], !0),
                      (a = l.index + l[0].length);
                  c(e.substr(a, e.length - a), !1),
                    (i += r =
                      "with (__mito_data) {\n" +
                      (r += '__mito_result = arr.join("");') +
                      "\n}"),
                    (i += "})();");
                  var s = document.getElementsByTagName("script"),
                    d = "";
                  s.length > 0 && (d = s[0].nonce || "");
                  var u = document.createElement("SCRIPT");
                  (u.innerHTML = i),
                    u.setAttribute("nonce", d),
                    document.documentElement.appendChild(u);
                  var f = __mito_result;
                  if ((document.documentElement.removeChild(u), !o)) {
                    var v = document.createElement("DIV");
                    (v.innerHTML = f), (f = v.children[0]);
                  }
                  return f;
                }),
                (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t, o) {
      var n = o(12);
      "string" == typeof n && (n = [[e.i, n, ""]]);
      var r = { hmr: !0, transform: void 0, insertInto: void 0 };
      o(4)(n, r);
      n.locals && (e.exports = n.locals);
    },
    function(e, t, o) {
      (e.exports = o(3)(!1)).push([
        e.i,
        '#__vconsole {\n  color: #000;\n  font-size: 13px;\n  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n  /* global */\n  /* compoment */\n}\n#__vconsole .vc-max-height {\n  max-height: 19.23076923em;\n}\n#__vconsole .vc-max-height-line {\n  max-height: 3.38461538em;\n}\n#__vconsole .vc-min-height {\n  min-height: 3.07692308em;\n}\n#__vconsole dd,\n#__vconsole dl,\n#__vconsole pre {\n  margin: 0;\n}\n#__vconsole .vc-switch {\n  display: block;\n  position: fixed;\n  right: 0.76923077em;\n  bottom: 0.76923077em;\n  color: #FFF;\n  background-color: #04BE02;\n  line-height: 1;\n  font-size: 1.07692308em;\n  padding: 0.61538462em 1.23076923em;\n  z-index: 10000;\n  border-radius: 0.30769231em;\n  box-shadow: 0 0 0.61538462em rgba(0, 0, 0, 0.4);\n}\n#__vconsole .vc-mask {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0);\n  z-index: 10001;\n  transition: background 0.3s;\n  -webkit-tap-highlight-color: transparent;\n  overflow-y: scroll;\n}\n#__vconsole .vc-panel {\n  display: none;\n  position: fixed;\n  min-height: 85%;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 10002;\n  background-color: #EFEFF4;\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n  -webkit-transform: translate(0, 100%);\n  transform: translate(0, 100%);\n}\n#__vconsole .vc-tabbar {\n  border-bottom: 1px solid #D9D9D9;\n  overflow-x: auto;\n  height: 3em;\n  width: auto;\n  white-space: nowrap;\n}\n#__vconsole .vc-tabbar .vc-tab {\n  display: inline-block;\n  line-height: 3em;\n  padding: 0 1.15384615em;\n  border-right: 1px solid #D9D9D9;\n  text-decoration: none;\n  color: #000;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n#__vconsole .vc-tabbar .vc-tab:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n#__vconsole .vc-tabbar .vc-tab.vc-actived {\n  background-color: #FFF;\n}\n#__vconsole .vc-content {\n  background-color: #FFF;\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: absolute;\n  top: 3.07692308em;\n  left: 0;\n  right: 0;\n  bottom: 3.07692308em;\n  -webkit-overflow-scrolling: touch;\n  margin-bottom: constant(safe-area-inset-bottom);\n  margin-bottom: env(safe-area-inset-bottom);\n}\n#__vconsole .vc-content.vc-has-topbar {\n  top: 5.46153846em;\n}\n#__vconsole .vc-topbar {\n  background-color: #FBF9FE;\n  display: flex;\n  display: -webkit-box;\n  flex-direction: row;\n  flex-wrap: wrap;\n  -webkit-box-direction: row;\n  -webkit-flex-wrap: wrap;\n  width: 100%;\n}\n#__vconsole .vc-topbar .vc-toptab {\n  display: none;\n  flex: 1;\n  -webkit-box-flex: 1;\n  line-height: 2.30769231em;\n  padding: 0 1.15384615em;\n  border-bottom: 1px solid #D9D9D9;\n  text-decoration: none;\n  text-align: center;\n  color: #000;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n#__vconsole .vc-topbar .vc-toptab.vc-toggle {\n  display: block;\n}\n#__vconsole .vc-topbar .vc-toptab:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n#__vconsole .vc-topbar .vc-toptab.vc-actived {\n  border-bottom: 1px solid #3e82f7;\n}\n#__vconsole .vc-logbox {\n  display: none;\n  position: relative;\n  min-height: 100%;\n}\n#__vconsole .vc-logbox i {\n  font-style: normal;\n}\n#__vconsole .vc-logbox .vc-log {\n  padding-bottom: 3em;\n  -webkit-tap-highlight-color: transparent;\n}\n#__vconsole .vc-logbox .vc-log:empty:before {\n  content: "Empty";\n  color: #999;\n  position: absolute;\n  top: 45%;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  font-size: 1.15384615em;\n  text-align: center;\n}\n#__vconsole .vc-logbox .vc-item {\n  margin: 0;\n  padding: 0.46153846em 0.61538462em;\n  overflow: hidden;\n  line-height: 1.3;\n  border-bottom: 1px solid #EEE;\n  word-break: break-word;\n}\n#__vconsole .vc-logbox .vc-item-info {\n  color: #6A5ACD;\n}\n#__vconsole .vc-logbox .vc-item-debug {\n  color: #DAA520;\n}\n#__vconsole .vc-logbox .vc-item-warn {\n  color: #FFA500;\n  border-color: #FFB930;\n  background-color: #FFFACD;\n}\n#__vconsole .vc-logbox .vc-item-error {\n  color: #DC143C;\n  border-color: #F4A0AB;\n  background-color: #FFE4E1;\n}\n#__vconsole .vc-logbox .vc-log.vc-log-partly .vc-item {\n  display: none;\n}\n#__vconsole .vc-logbox .vc-log.vc-log-partly-log .vc-item-log,\n#__vconsole .vc-logbox .vc-log.vc-log-partly-info .vc-item-info,\n#__vconsole .vc-logbox .vc-log.vc-log-partly-warn .vc-item-warn,\n#__vconsole .vc-logbox .vc-log.vc-log-partly-error .vc-item-error {\n  display: block;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-content {\n  margin-right: 4.61538462em;\n  display: block;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-meta {\n  color: #888;\n  float: right;\n  width: 4.61538462em;\n  text-align: right;\n}\n#__vconsole .vc-logbox .vc-item.vc-item-nometa .vc-item-content {\n  margin-right: 0;\n}\n#__vconsole .vc-logbox .vc-item.vc-item-nometa .vc-item-meta {\n  display: none;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-code {\n  display: block;\n  white-space: pre-wrap;\n  overflow: auto;\n  position: relative;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-input,\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output {\n  padding-left: 0.92307692em;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-input:before,\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output:before {\n  content: "鈥�";\n  position: absolute;\n  top: -0.23076923em;\n  left: 0;\n  font-size: 1.23076923em;\n  color: #6A5ACD;\n}\n#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output:before {\n  content: "鈥�";\n}\n#__vconsole .vc-logbox .vc-item .vc-fold {\n  display: block;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer {\n  display: block;\n  font-style: italic;\n  padding-left: 0.76923077em;\n  position: relative;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:active {\n  background-color: #E6E6E6;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:before {\n  content: "";\n  position: absolute;\n  top: 0.30769231em;\n  left: 0.15384615em;\n  width: 0;\n  height: 0;\n  border: transparent solid 0.30769231em;\n  border-left-color: #000;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer.vc-toggle:before {\n  top: 0.46153846em;\n  left: 0;\n  border-top-color: #000;\n  border-left-color: transparent;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner {\n  display: none;\n  margin-left: 0.76923077em;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner.vc-toggle {\n  display: block;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner .vc-code-key {\n  margin-left: 0.76923077em;\n}\n#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer .vc-code-key {\n  margin-left: 0;\n}\n#__vconsole .vc-logbox .vc-code-key {\n  color: #905;\n}\n#__vconsole .vc-logbox .vc-code-private-key {\n  color: #D391B5;\n}\n#__vconsole .vc-logbox .vc-code-function {\n  color: #905;\n  font-style: italic;\n}\n#__vconsole .vc-logbox .vc-code-number,\n#__vconsole .vc-logbox .vc-code-boolean {\n  color: #0086B3;\n}\n#__vconsole .vc-logbox .vc-code-string {\n  color: #183691;\n}\n#__vconsole .vc-logbox .vc-code-null,\n#__vconsole .vc-logbox .vc-code-undefined {\n  color: #666;\n}\n#__vconsole .vc-logbox .vc-cmd {\n  position: absolute;\n  height: 3.07692308em;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-top: 1px solid #D9D9D9;\n  display: block!important;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-input-wrap {\n  display: block;\n  height: 2.15384615em;\n  margin-right: 3.07692308em;\n  padding: 0.46153846em 0.61538462em;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-input {\n  width: 100%;\n  border: none;\n  resize: none;\n  outline: none;\n  padding: 0;\n  font-size: 0.92307692em;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-input::-webkit-input-placeholder {\n  line-height: 2.15384615em;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-btn {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 3.07692308em;\n  border: none;\n  background-color: #EFEFF4;\n  outline: none;\n  -webkit-touch-callout: none;\n  font-size: 1em;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-btn:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-prompted {\n  position: fixed;\n  width: 100%;\n  background-color: #FBF9FE;\n  border: 1px solid #D9D9D9;\n  overflow-x: scroll;\n  display: none;\n}\n#__vconsole .vc-logbox .vc-cmd .vc-cmd-prompted li {\n  list-style: none;\n  line-height: 30px;\n  padding: 0 0.46153846em;\n  border-bottom: 1px solid #D9D9D9;\n}\n#__vconsole .vc-logbox .vc-group .vc-group-preview {\n  -webkit-touch-callout: none;\n}\n#__vconsole .vc-logbox .vc-group .vc-group-preview:active {\n  background-color: #E6E6E6;\n}\n#__vconsole .vc-logbox .vc-group .vc-group-detail {\n  display: none;\n  padding: 0 0 0.76923077em 1.53846154em;\n  border-bottom: 1px solid #EEE;\n}\n#__vconsole .vc-logbox .vc-group.vc-actived .vc-group-detail {\n  display: block;\n  background-color: #FBF9FE;\n}\n#__vconsole .vc-logbox .vc-group.vc-actived .vc-table-row {\n  background-color: #FFF;\n}\n#__vconsole .vc-logbox .vc-group.vc-actived .vc-group-preview {\n  background-color: #FBF9FE;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-row {\n  display: flex;\n  display: -webkit-flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  -webkit-box-direction: row;\n  -webkit-flex-wrap: wrap;\n  overflow: hidden;\n  border-bottom: 1px solid #EEE;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-row.vc-left-border {\n  border-left: 1px solid #EEE;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col {\n  flex: 1;\n  -webkit-box-flex: 1;\n  padding: 0.23076923em 0.30769231em;\n  border-left: 1px solid #EEE;\n  overflow: auto;\n  white-space: pre-wrap;\n  word-break: break-word;\n  /*white-space: nowrap;\n        text-overflow: ellipsis;*/\n  -webkit-overflow-scrolling: touch;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col:first-child {\n  border: none;\n}\n#__vconsole .vc-logbox .vc-table .vc-small .vc-table-col {\n  padding: 0 0.30769231em;\n  font-size: 0.92307692em;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-2 {\n  flex: 2;\n  -webkit-box-flex: 2;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-3 {\n  flex: 3;\n  -webkit-box-flex: 3;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-4 {\n  flex: 4;\n  -webkit-box-flex: 4;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-5 {\n  flex: 5;\n  -webkit-box-flex: 5;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-6 {\n  flex: 6;\n  -webkit-box-flex: 6;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-row-error {\n  border-color: #F4A0AB;\n  background-color: #FFE4E1;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-row-error .vc-table-col {\n  color: #DC143C;\n  border-color: #F4A0AB;\n}\n#__vconsole .vc-logbox .vc-table .vc-table-col-title {\n  font-weight: bold;\n}\n#__vconsole .vc-logbox.vc-actived {\n  display: block;\n}\n#__vconsole .vc-toolbar {\n  border-top: 1px solid #D9D9D9;\n  line-height: 3em;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  display: -webkit-box;\n  flex-direction: row;\n  -webkit-box-direction: row;\n}\n#__vconsole .vc-toolbar .vc-tool {\n  display: none;\n  text-decoration: none;\n  color: #000;\n  width: 50%;\n  flex: 1;\n  -webkit-box-flex: 1;\n  text-align: center;\n  position: relative;\n  -webkit-touch-callout: none;\n}\n#__vconsole .vc-toolbar .vc-tool.vc-toggle,\n#__vconsole .vc-toolbar .vc-tool.vc-global-tool {\n  display: block;\n}\n#__vconsole .vc-toolbar .vc-tool:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n#__vconsole .vc-toolbar .vc-tool:after {\n  content: " ";\n  position: absolute;\n  top: 0.53846154em;\n  bottom: 0.53846154em;\n  right: 0;\n  border-left: 1px solid #D9D9D9;\n}\n#__vconsole .vc-toolbar .vc-tool-last:after {\n  border: none;\n}\n@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {\n  #__vconsole .vc-toolbar,\n  #__vconsole .vc-switch {\n    bottom: constant(safe-area-inset-bottom);\n    bottom: env(safe-area-inset-bottom);\n  }\n}\n#__vconsole.vc-toggle .vc-switch {\n  display: none;\n}\n#__vconsole.vc-toggle .vc-mask {\n  background: rgba(0, 0, 0, 0.6);\n  display: block;\n}\n#__vconsole.vc-toggle .vc-panel {\n  -webkit-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n',
        ""
      ]);
    },
    function(e, t) {
      e.exports = function(e) {
        var t = "undefined" != typeof window && window.location;
        if (!t) throw new Error("fixUrls requires window.location");
        if (!e || "string" != typeof e) return e;
        var o = t.protocol + "//" + t.host,
          n = o + t.pathname.replace(/\/[^\/]*$/, "/");
        return e.replace(
          /url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,
          function(e, t) {
            var r,
              i = t
                .trim()
                .replace(/^"(.*)"$/, function(e, t) {
                  return t;
                })
                .replace(/^'(.*)'$/, function(e, t) {
                  return t;
                });
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)
              ? e
              : ((r =
                  0 === i.indexOf("//")
                    ? i
                    : 0 === i.indexOf("/")
                    ? o + i
                    : n + i.replace(/^\.\//, "")),
                "url(" + JSON.stringify(r) + ")");
          }
        );
      };
    },
    function(e, t) {
      e.exports =
        '<div id="__vconsole" class="">\n  <div class="vc-switch">vConsole</div>\n  <div class="vc-mask">\n  </div>\n  <div class="vc-panel">\n    <div class="vc-tabbar">\n    </div>\n    <div class="vc-topbar">\n    </div>\n    <div class="vc-content">\n    </div>\n    <div class="vc-toolbar">\n      <a class="vc-tool vc-global-tool vc-tool-last vc-hide">Hide</a>\n    </div>\n  </div>\n</div>';
    },
    function(e, t) {
      e.exports =
        '<a class="vc-tab" data-tab="{{id}}" id="__vc_tab_{{id}}">{{name}}</a>';
    },
    function(e, t) {
      e.exports = '<div class="vc-logbox" id="__vc_log_{{id}}">\n  \n</div>';
    },
    function(e, t) {
      e.exports =
        '<a class="vc-toptab vc-topbar-{{pluginID}}{{if (className)}} {{className}}{{/if}}">{{name}}</a>';
    },
    function(e, t) {
      e.exports = '<a class="vc-tool vc-tool-{{pluginID}}">{{name}}</a>';
    },
    function(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__,
        __WEBPACK_AMD_DEFINE_ARRAY__,
        __WEBPACK_AMD_DEFINE_RESULT__,
        factory;
      (factory = function(
        _exports,
        _query,
        tool,
        _log,
        _tabbox_default,
        _item_code
      ) {
        "use strict";
        function _interopRequireWildcard(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var o in e)
              if (Object.prototype.hasOwnProperty.call(e, o)) {
                var n =
                  Object.defineProperty && Object.getOwnPropertyDescriptor
                    ? Object.getOwnPropertyDescriptor(e, o)
                    : {};
                n.get || n.set ? Object.defineProperty(t, o, n) : (t[o] = e[o]);
              }
          return (t.default = e), t;
        }
        function _interopRequireDefault(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function _typeof(e) {
          return (_typeof =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        function _classCallCheck(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function _defineProperties(e, t) {
          for (var o = 0; o < t.length; o++) {
            var n = t[o];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        function _createClass(e, t, o) {
          return (
            t && _defineProperties(e.prototype, t),
            o && _defineProperties(e, o),
            e
          );
        }
        function _possibleConstructorReturn(e, t) {
          return !t || ("object" !== _typeof(t) && "function" != typeof t)
            ? _assertThisInitialized(e)
            : t;
        }
        function _assertThisInitialized(e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        }
        function _get(e, t, o) {
          return (_get =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function(e, t, o) {
                  var n = _superPropBase(e, t);
                  if (n) {
                    var r = Object.getOwnPropertyDescriptor(n, t);
                    return r.get ? r.get.call(o) : r.value;
                  }
                })(e, t, o || e);
        }
        function _superPropBase(e, t) {
          for (
            ;
            !Object.prototype.hasOwnProperty.call(e, t) &&
            null !== (e = _getPrototypeOf(e));

          );
          return e;
        }
        function _getPrototypeOf(e) {
          return (_getPrototypeOf = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              })(e);
        }
        function _inherits(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 }
          })),
            t && _setPrototypeOf(e, t);
        }
        function _setPrototypeOf(e, t) {
          return (_setPrototypeOf =
            Object.setPrototypeOf ||
            function(e, t) {
              return (e.__proto__ = t), e;
            })(e, t);
        }
        Object.defineProperty(_exports, "__esModule", { value: !0 }),
          (_exports.default = void 0),
          (_query = _interopRequireDefault(_query)),
          (tool = _interopRequireWildcard(tool)),
          (_log = _interopRequireDefault(_log)),
          (_tabbox_default = _interopRequireDefault(_tabbox_default)),
          (_item_code = _interopRequireDefault(_item_code));
        var VConsoleDefaultTab = (function(_VConsoleLogTab) {
            function VConsoleDefaultTab() {
              var e, t;
              _classCallCheck(this, VConsoleDefaultTab);
              for (
                var o = arguments.length, n = new Array(o), r = 0;
                r < o;
                r++
              )
                n[r] = arguments[r];
              return (
                ((t = _possibleConstructorReturn(
                  this,
                  (e = _getPrototypeOf(VConsoleDefaultTab)).call.apply(
                    e,
                    [this].concat(n)
                  )
                )).tplTabbox = _tabbox_default.default),
                t
              );
            }
            return (
              _inherits(VConsoleDefaultTab, _VConsoleLogTab),
              _createClass(VConsoleDefaultTab, [
                {
                  key: "onReady",
                  value: function onReady() {
                    var that = this;
                    _get(
                      _getPrototypeOf(VConsoleDefaultTab.prototype),
                      "onReady",
                      this
                    ).call(this),
                      (window.winKeys = Object.getOwnPropertyNames(
                        window
                      ).sort()),
                      (window.keyTypes = {});
                    for (var i = 0; i < winKeys.length; i++)
                      keyTypes[winKeys[i]] = _typeof(window[winKeys[i]]);
                    var cacheObj = {},
                      ID_REGEX = /[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/,
                      retrievePrecedingIdentifier = function(e, t, o) {
                        o = o || ID_REGEX;
                        for (var n = [], r = t - 1; r >= 0 && o.test(e[r]); r--)
                          n.push(e[r]);
                        if (0 == n.length) {
                          o = /\./;
                          for (var i = t - 1; i >= 0 && o.test(e[i]); i--)
                            n.push(e[i]);
                        }
                        if (0 === n.length) {
                          var a = e.match(/[\(\)\[\]\{\}]/gi) || [];
                          return a[a.length - 1];
                        }
                        return n.reverse().join("");
                      };
                    _query.default.bind(
                      _query.default.one(".vc-cmd-input"),
                      "keyup",
                      function(e) {
                        var isDeleteKeyCode =
                            8 === e.keyCode || 46 === e.keyCode,
                          $prompted = _query.default.one(".vc-cmd-prompted");
                        ($prompted.style.display = "none"),
                          ($prompted.innerHTML = "");
                        var tempValue = this.value,
                          value = retrievePrecedingIdentifier(
                            this.value,
                            this.value.length
                          );
                        if (value && value.length > 0) {
                          if (/\(/.test(value) && !isDeleteKeyCode)
                            return void (_query.default.one(
                              ".vc-cmd-input"
                            ).value += ")");
                          if (/\[/.test(value) && !isDeleteKeyCode)
                            return void (_query.default.one(
                              ".vc-cmd-input"
                            ).value += "]");
                          if (/\{/.test(value) && !isDeleteKeyCode)
                            return void (_query.default.one(
                              ".vc-cmd-input"
                            ).value += "}");
                          if ("." === value) {
                            var key = retrievePrecedingIdentifier(
                              tempValue,
                              tempValue.length - 1
                            );
                            if (!cacheObj[key])
                              try {
                                cacheObj[key] = Object.getOwnPropertyNames(
                                  eval("(" + key + ")")
                                ).sort();
                              } catch (e) {}
                            try {
                              for (
                                var _i3 = 0;
                                _i3 < cacheObj[key].length;
                                _i3++
                              ) {
                                var $li = document.createElement("li"),
                                  _key = cacheObj[key][_i3];
                                ($li.innerHTML = _key),
                                  ($li.onclick = function() {
                                    (_query.default.one(".vc-cmd-input").value =
                                      ""),
                                      (_query.default.one(
                                        ".vc-cmd-input"
                                      ).value = tempValue + this.innerHTML),
                                      ($prompted.style.display = "none");
                                  }),
                                  $prompted.appendChild($li);
                              }
                            } catch (e) {}
                          } else if (
                            "." !== value.substring(value.length - 1) &&
                            value.indexOf(".") < 0
                          ) {
                            for (var _i4 = 0; _i4 < winKeys.length; _i4++)
                              if (
                                winKeys[_i4]
                                  .toLowerCase()
                                  .indexOf(value.toLowerCase()) >= 0
                              ) {
                                var _$li = document.createElement("li");
                                (_$li.innerHTML = winKeys[_i4]),
                                  (_$li.onclick = function() {
                                    (_query.default.one(".vc-cmd-input").value =
                                      ""),
                                      (_query.default.one(
                                        ".vc-cmd-input"
                                      ).value = this.innerHTML),
                                      "function" == keyTypes[this.innerHTML] &&
                                        (_query.default.one(
                                          ".vc-cmd-input"
                                        ).value += "()"),
                                      ($prompted.style.display = "none");
                                  }),
                                  $prompted.appendChild(_$li);
                              }
                          } else {
                            var arr = value.split(".");
                            if (cacheObj[arr[0]]) {
                              cacheObj[arr[0]].sort();
                              for (
                                var _i5 = 0;
                                _i5 < cacheObj[arr[0]].length;
                                _i5++
                              ) {
                                var _$li2 = document.createElement("li"),
                                  _key3 = cacheObj[arr[0]][_i5];
                                _key3.indexOf(arr[1]) >= 0 &&
                                  ((_$li2.innerHTML = _key3),
                                  (_$li2.onclick = function() {
                                    (_query.default.one(".vc-cmd-input").value =
                                      ""),
                                      (_query.default.one(
                                        ".vc-cmd-input"
                                      ).value = tempValue + this.innerHTML),
                                      ($prompted.style.display = "none");
                                  }),
                                  $prompted.appendChild(_$li2));
                              }
                            }
                          }
                          if ($prompted.children.length > 0) {
                            var m = Math.min(
                              200,
                              31 * $prompted.children.length
                            );
                            ($prompted.style.display = "block"),
                              ($prompted.style.height = m + "px"),
                              ($prompted.style.marginTop = -m + "px");
                          }
                        } else $prompted.style.display = "none";
                      }
                    ),
                      _query.default.bind(
                        _query.default.one(".vc-cmd", this.$tabbox),
                        "submit",
                        function(e) {
                          e.preventDefault();
                          var t = _query.default.one(".vc-cmd-input", e.target),
                            o = t.value;
                          (t.value = ""), "" !== o && that.evalCommand(o);
                          var n = _query.default.one(".vc-cmd-prompted");
                          n && (n.style.display = "none");
                        }
                      );
                    var code = "";
                    (code += "if (!!window) {"),
                      (code += "window.__vConsole_cmd_result = undefined;"),
                      (code += "window.__vConsole_cmd_error = false;"),
                      (code += "}");
                    var scriptList = document.getElementsByTagName("script"),
                      nonce = "";
                    scriptList.length > 0 &&
                      (nonce = scriptList[0].nonce || "");
                    var script = document.createElement("SCRIPT");
                    (script.innerHTML = code),
                      script.setAttribute("nonce", nonce),
                      document.documentElement.appendChild(script),
                      document.documentElement.removeChild(script);
                  }
                },
                {
                  key: "mockConsole",
                  value: function() {
                    _get(
                      _getPrototypeOf(VConsoleDefaultTab.prototype),
                      "mockConsole",
                      this
                    ).call(this);
                    var e = this;
                    tool.isFunction(window.onerror) &&
                      (this.windowOnError = window.onerror),
                      (window.onerror = function(t, o, n, r, i) {
                        var a = t;
                        o && (a += "\n" + o.replace(location.origin, "")),
                          (n || r) && (a += ":" + n + ":" + r);
                        var l = (!!i && !!i.stack && i.stack.toString()) || "";
                        e.printLog({
                          logType: "error",
                          logs: [a, l],
                          noOrigin: !0
                        }),
                          tool.isFunction(e.windowOnError) &&
                            e.windowOnError.call(window, t, o, n, r, i);
                      });
                  }
                },
                {
                  key: "evalCommand",
                  value: function(e) {
                    this.printLog({
                      logType: "log",
                      content: _query.default.render(_item_code.default, {
                        content: e,
                        type: "input"
                      }),
                      noMeta: !0,
                      style: ""
                    });
                    var t,
                      o = void 0;
                    try {
                      o = eval.call(window, "(" + e + ")");
                    } catch (t) {
                      try {
                        o = eval.call(window, e);
                      } catch (e) {}
                    }
                    tool.isArray(o) || tool.isObject(o)
                      ? (t = this.getFoldedLine(o))
                      : (tool.isNull(o)
                          ? (o = "null")
                          : tool.isUndefined(o)
                          ? (o = "undefined")
                          : tool.isFunction(o)
                          ? (o = "function()")
                          : tool.isString(o) && (o = '"' + o + '"'),
                        (t = _query.default.render(_item_code.default, {
                          content: o,
                          type: "output"
                        }))),
                      this.printLog({
                        logType: "log",
                        content: t,
                        noMeta: !0,
                        style: ""
                      }),
                      (window.winKeys = Object.getOwnPropertyNames(
                        window
                      ).sort());
                  }
                }
              ]),
              VConsoleDefaultTab
            );
          })(_log.default),
          _default = VConsoleDefaultTab;
        (_exports.default = _default), (module.exports = exports.default);
      }),
        (__WEBPACK_AMD_DEFINE_ARRAY__ = [
          exports,
          __webpack_require__(1),
          __webpack_require__(0),
          __webpack_require__(5),
          __webpack_require__(23),
          __webpack_require__(24)
        ]),
        void 0 ===
          (__WEBPACK_AMD_DEFINE_RESULT__ =
            "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory)
              ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                  exports,
                  __WEBPACK_AMD_DEFINE_ARRAY__
                )
              : __WEBPACK_AMD_DEFINE_FACTORY__) ||
          (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    },
    function(e, t) {
      e.exports =
        '<div class="vc-item vc-item-{{logType}} {{if (!noMeta)}}vc-item-nometa{{/if}} {{style}}">\n\t<span class="vc-item-meta">{{if (!noMeta)}}{{meta}}{{/if}}</span>\n\t<div class="vc-item-content"></div>\n</div>';
    },
    function(e, t) {
      e.exports =
        '<div class="vc-fold">\n  {{if (lineType == \'obj\')}}\n    <i class="vc-fold-outer">{{outer}}</i>\n    <div class="vc-fold-inner"></div>\n  {{else if (lineType == \'value\')}}\n    <i class="vc-code-{{valueType}}">{{value}}</i>\n  {{else if (lineType == \'kv\')}}\n    <i class="vc-code-key{{if (keyType)}} vc-code-{{keyType}}-key{{/if}}">{{key}}</i>: <i class="vc-code-{{valueType}}">{{value}}</i>\n  {{/if}}\n</div>';
    },
    function(e, t) {
      e.exports =
        '<span>\n  <i class="vc-code-key{{if (keyType)}} vc-code-{{keyType}}-key{{/if}}">{{key}}</i>: <i class="vc-code-{{valueType}}">{{value}}</i>\n</span>';
    },
    function(e, t) {
      e.exports =
        '<div>\n  <div class="vc-log"></div>\n  <form class="vc-cmd">\n    <button class="vc-cmd-btn" type="submit">OK</button>\n    <ul class=\'vc-cmd-prompted\'></ul>\n    <div class="vc-cmd-input-wrap">\n      <textarea class="vc-cmd-input" placeholder="command..."></textarea>\n    </div>\n  </form>\n</div>';
    },
    function(e, t) {
      e.exports =
        '<pre class="vc-item-code vc-item-code-{{type}}">{{content}}</pre>';
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t, o(0), o(5), o(26)]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o, n, r, i) {
              "use strict";
              function a(e) {
                return e && e.__esModule ? e : { default: e };
              }
              function l(e) {
                return (l =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function(e) {
                        return typeof e;
                      }
                    : function(e) {
                        return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                      })(e);
              }
              function c(e, t) {
                for (var o = 0; o < t.length; o++) {
                  var n = t[o];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n);
                }
              }
              function s(e, t) {
                return !t || ("object" !== l(t) && "function" != typeof t)
                  ? (function(e) {
                      if (void 0 === e)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called"
                        );
                      return e;
                    })(e)
                  : t;
              }
              function d(e, t, o) {
                return (d =
                  "undefined" != typeof Reflect && Reflect.get
                    ? Reflect.get
                    : function(e, t, o) {
                        var n = (function(e, t) {
                          for (
                            ;
                            !Object.prototype.hasOwnProperty.call(e, t) &&
                            null !== (e = u(e));

                          );
                          return e;
                        })(e, t);
                        if (n) {
                          var r = Object.getOwnPropertyDescriptor(n, t);
                          return r.get ? r.get.call(o) : r.value;
                        }
                      })(e, t, o || e);
              }
              function u(e) {
                return (u = Object.setPrototypeOf
                  ? Object.getPrototypeOf
                  : function(e) {
                      return e.__proto__ || Object.getPrototypeOf(e);
                    })(e);
              }
              function f(e, t) {
                return (f =
                  Object.setPrototypeOf ||
                  function(e, t) {
                    return (e.__proto__ = t), e;
                  })(e, t);
              }
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0),
                (n = (function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e)
                    for (var o in e)
                      if (Object.prototype.hasOwnProperty.call(e, o)) {
                        var n =
                          Object.defineProperty &&
                          Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(e, o)
                            : {};
                        n.get || n.set
                          ? Object.defineProperty(t, o, n)
                          : (t[o] = e[o]);
                      }
                  return (t.default = e), t;
                })(n)),
                (r = a(r)),
                (i = a(i));
              var v = (function(e) {
                function t() {
                  var e, o;
                  !(function(e, t) {
                    if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, t);
                  for (
                    var n = arguments.length, r = new Array(n), a = 0;
                    a < n;
                    a++
                  )
                    r[a] = arguments[a];
                  return (
                    ((o = s(
                      this,
                      (e = u(t)).call.apply(e, [this].concat(r))
                    )).tplTabbox = i.default),
                    (o.allowUnformattedLog = !1),
                    o
                  );
                }
                return (
                  (function(e, t) {
                    if ("function" != typeof t && null !== t)
                      throw new TypeError(
                        "Super expression must either be null or a function"
                      );
                    (e.prototype = Object.create(t && t.prototype, {
                      constructor: { value: e, writable: !0, configurable: !0 }
                    })),
                      t && f(e, t);
                  })(t, e),
                  (o = t),
                  (n = [
                    {
                      key: "onInit",
                      value: function() {
                        d(u(t.prototype), "onInit", this).call(this),
                          this.printSystemInfo();
                      }
                    },
                    {
                      key: "printSystemInfo",
                      value: function() {
                        var e = navigator.userAgent,
                          t = "",
                          o = e.match(/(ipod).*\s([\d_]+)/i),
                          n = e.match(/(ipad).*\s([\d_]+)/i),
                          r = e.match(/(iphone)\sos\s([\d_]+)/i),
                          i = e.match(/(android)\s([\d\.]+)/i);
                        (t = "Unknown"),
                          i
                            ? (t = "Android " + i[2])
                            : r
                            ? (t = "iPhone, iOS " + r[2].replace(/_/g, "."))
                            : n
                            ? (t = "iPad, iOS " + n[2].replace(/_/g, "."))
                            : o && (t = "iPod, iOS " + o[2].replace(/_/g, "."));
                        var a = t,
                          l = e.match(/MicroMessenger\/([\d\.]+)/i);
                        (t = "Unknown"),
                          l && l[1]
                            ? ((t = l[1]),
                              (a += ", WeChat " + t),
                              console.info("[system]", "System:", a))
                            : console.info("[system]", "System:", a),
                          (t = "Unknown"),
                          (t =
                            "https:" == location.protocol
                              ? "HTTPS"
                              : "http:" == location.protocol
                              ? "HTTP"
                              : location.protocol.replace(":", "")),
                          (a = t);
                        var c = e.toLowerCase().match(/ nettype\/([^ ]+)/g);
                        (t = "Unknown"),
                          c && c[0]
                            ? ((c = c[0].split("/")),
                              (t = c[1]),
                              (a += ", " + t),
                              console.info("[system]", "Network:", a))
                            : console.info("[system]", "Protocol:", a),
                          console.info("[system]", "UA:", e),
                          setTimeout(function() {
                            var e =
                              window.performance ||
                              window.msPerformance ||
                              window.webkitPerformance;
                            if (e && e.timing) {
                              var t = e.timing;
                              t.navigationStart &&
                                console.info(
                                  "[system]",
                                  "navigationStart:",
                                  t.navigationStart
                                ),
                                t.navigationStart &&
                                  t.domainLookupStart &&
                                  console.info(
                                    "[system]",
                                    "navigation:",
                                    t.domainLookupStart -
                                      t.navigationStart +
                                      "ms"
                                  ),
                                t.domainLookupEnd &&
                                  t.domainLookupStart &&
                                  console.info(
                                    "[system]",
                                    "dns:",
                                    t.domainLookupEnd -
                                      t.domainLookupStart +
                                      "ms"
                                  ),
                                t.connectEnd &&
                                  t.connectStart &&
                                  (t.connectEnd && t.secureConnectionStart
                                    ? console.info(
                                        "[system]",
                                        "tcp (ssl):",
                                        t.connectEnd -
                                          t.connectStart +
                                          "ms (" +
                                          (t.connectEnd -
                                            t.secureConnectionStart) +
                                          "ms)"
                                      )
                                    : console.info(
                                        "[system]",
                                        "tcp:",
                                        t.connectEnd - t.connectStart + "ms"
                                      )),
                                t.responseStart &&
                                  t.requestStart &&
                                  console.info(
                                    "[system]",
                                    "request:",
                                    t.responseStart - t.requestStart + "ms"
                                  ),
                                t.responseEnd &&
                                  t.responseStart &&
                                  console.info(
                                    "[system]",
                                    "response:",
                                    t.responseEnd - t.responseStart + "ms"
                                  ),
                                t.domComplete &&
                                  t.domLoading &&
                                  (t.domContentLoadedEventStart && t.domLoading
                                    ? console.info(
                                        "[system]",
                                        "domComplete (domLoaded):",
                                        t.domComplete -
                                          t.domLoading +
                                          "ms (" +
                                          (t.domContentLoadedEventStart -
                                            t.domLoading) +
                                          "ms)"
                                      )
                                    : console.info(
                                        "[system]",
                                        "domComplete:",
                                        t.domComplete - t.domLoading + "ms"
                                      )),
                                t.loadEventEnd &&
                                  t.loadEventStart &&
                                  console.info(
                                    "[system]",
                                    "loadEvent:",
                                    t.loadEventEnd - t.loadEventStart + "ms"
                                  ),
                                t.navigationStart &&
                                  t.loadEventEnd &&
                                  console.info(
                                    "[system]",
                                    "total (DOM):",
                                    t.loadEventEnd -
                                      t.navigationStart +
                                      "ms (" +
                                      (t.domComplete - t.navigationStart) +
                                      "ms)"
                                  );
                            }
                          }, 0);
                      }
                    }
                  ]) && c(o.prototype, n),
                  r && c(o, r),
                  t
                );
                var o, n, r;
              })(r.default);
              (o.default = v), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t) {
      e.exports = '<div>\n  <div class="vc-log"></div>\n</div>';
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t, o(1), o(0), o(2), o(28), o(29), o(30)]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o, n, r, i, a, l, c) {
              "use strict";
              function s(e) {
                return e && e.__esModule ? e : { default: e };
              }
              function d(e) {
                return (d =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function(e) {
                        return typeof e;
                      }
                    : function(e) {
                        return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                      })(e);
              }
              function u(e, t) {
                for (var o = 0; o < t.length; o++) {
                  var n = t[o];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n);
                }
              }
              function f(e, t) {
                return !t || ("object" !== d(t) && "function" != typeof t)
                  ? (function(e) {
                      if (void 0 === e)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called"
                        );
                      return e;
                    })(e)
                  : t;
              }
              function v(e) {
                return (v = Object.setPrototypeOf
                  ? Object.getPrototypeOf
                  : function(e) {
                      return e.__proto__ || Object.getPrototypeOf(e);
                    })(e);
              }
              function p(e, t) {
                return (p =
                  Object.setPrototypeOf ||
                  function(e, t) {
                    return (e.__proto__ = t), e;
                  })(e, t);
              }
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0),
                (n = s(n)),
                (r = (function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e)
                    for (var o in e)
                      if (Object.prototype.hasOwnProperty.call(e, o)) {
                        var n =
                          Object.defineProperty &&
                          Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(e, o)
                            : {};
                        n.get || n.set
                          ? Object.defineProperty(t, o, n)
                          : (t[o] = e[o]);
                      }
                  return (t.default = e), t;
                })(r)),
                (i = s(i)),
                (a = s(a)),
                (l = s(l)),
                (c = s(c));
              var b = (function(e) {
                function t() {
                  var e, o;
                  !(function(e, t) {
                    if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, t);
                  for (
                    var r = arguments.length, i = new Array(r), l = 0;
                    l < r;
                    l++
                  )
                    i[l] = arguments[l];
                  return (
                    ((o = f(
                      this,
                      (e = v(t)).call.apply(e, [this].concat(i))
                    )).$tabbox = n.default.render(a.default, {})),
                    (o.$header = null),
                    (o.reqList = {}),
                    (o.domList = {}),
                    (o.isReady = !1),
                    (o.isShow = !1),
                    (o.isInBottom = !0),
                    (o._open = void 0),
                    (o._send = void 0),
                    o.mockAjax(),
                    o
                  );
                }
                return (
                  (function(e, t) {
                    if ("function" != typeof t && null !== t)
                      throw new TypeError(
                        "Super expression must either be null or a function"
                      );
                    (e.prototype = Object.create(t && t.prototype, {
                      constructor: { value: e, writable: !0, configurable: !0 }
                    })),
                      t && p(e, t);
                  })(t, e),
                  (o = t),
                  (i = [
                    {
                      key: "onRenderTab",
                      value: function(e) {
                        e(this.$tabbox);
                      }
                    },
                    {
                      key: "onAddTool",
                      value: function(e) {
                        var t = this,
                          o = [
                            {
                              name: "Clear",
                              global: !1,
                              onClick: function(e) {
                                t.clearLog();
                              }
                            }
                          ];
                        e(o);
                      }
                    },
                    {
                      key: "onReady",
                      value: function() {
                        var e = this;
                        (e.isReady = !0),
                          this.renderHeader(),
                          n.default.delegate(
                            n.default.one(".vc-log", this.$tabbox),
                            "click",
                            ".vc-group-preview",
                            function(t) {
                              var o = this.dataset.reqid,
                                r = this.parentNode;
                              n.default.hasClass(r, "vc-actived")
                                ? (n.default.removeClass(r, "vc-actived"),
                                  e.updateRequest(o, { actived: !1 }))
                                : (n.default.addClass(r, "vc-actived"),
                                  e.updateRequest(o, { actived: !0 })),
                                t.preventDefault();
                            }
                          );
                        var t = n.default.one(".vc-content");
                        for (var o in (n.default.bind(t, "scroll", function(o) {
                          e.isShow &&
                            (t.scrollTop + t.offsetHeight >= t.scrollHeight
                              ? (e.isInBottom = !0)
                              : (e.isInBottom = !1));
                        }),
                        e.reqList))
                          e.updateRequest(o, {});
                      }
                    },
                    {
                      key: "onRemove",
                      value: function() {
                        window.XMLHttpRequest &&
                          ((window.XMLHttpRequest.prototype.open = this._open),
                          (window.XMLHttpRequest.prototype.send = this._send),
                          (this._open = void 0),
                          (this._send = void 0));
                      }
                    },
                    {
                      key: "onShow",
                      value: function() {
                        (this.isShow = !0),
                          1 == this.isInBottom && this.scrollToBottom();
                      }
                    },
                    {
                      key: "onHide",
                      value: function() {
                        this.isShow = !1;
                      }
                    },
                    {
                      key: "onShowConsole",
                      value: function() {
                        1 == this.isInBottom && this.scrollToBottom();
                      }
                    },
                    {
                      key: "scrollToBottom",
                      value: function() {
                        var e = n.default.one(".vc-content");
                        e.scrollTop = e.scrollHeight - e.offsetHeight;
                      }
                    },
                    {
                      key: "clearLog",
                      value: function() {
                        for (var e in ((this.reqList = {}), this.domList))
                          this.domList[e].remove(), (this.domList[e] = void 0);
                        (this.domList = {}), this.renderHeader();
                      }
                    },
                    {
                      key: "renderHeader",
                      value: function() {
                        var e = Object.keys(this.reqList).length,
                          t = n.default.render(l.default, { count: e }),
                          o = n.default.one(".vc-log", this.$tabbox);
                        this.$header
                          ? this.$header.parentNode.replaceChild(
                              t,
                              this.$header
                            )
                          : o.parentNode.insertBefore(t, o),
                          (this.$header = t);
                      }
                    },
                    {
                      key: "updateRequest",
                      value: function(e, t) {
                        var o = Object.keys(this.reqList).length,
                          i = this.reqList[e] || {};
                        for (var a in t) i[a] = t[a];
                        if (((this.reqList[e] = i), this.isReady)) {
                          var l = {
                            id: e,
                            url: i.url,
                            status: i.status,
                            method: i.method || "-",
                            costTime: i.costTime > 0 ? i.costTime + "ms" : "-",
                            header: i.header || null,
                            getData: i.getData || null,
                            postData: i.postData || null,
                            response: null,
                            actived: !!i.actived
                          };
                          switch (i.responseType) {
                            case "":
                            case "text":
                              if (r.isString(i.response))
                                try {
                                  (l.response = JSON.parse(i.response)),
                                    (l.response = JSON.stringify(
                                      l.response,
                                      null,
                                      1
                                    )),
                                    (l.response = r.htmlEncode(l.response));
                                } catch (e) {
                                  l.response = r.htmlEncode(i.response);
                                }
                              else
                                void 0 !== i.response &&
                                  (l.response = Object.prototype.toString.call(
                                    i.response
                                  ));
                              break;
                            case "json":
                              void 0 !== i.response &&
                                ((l.response = JSON.stringify(
                                  i.response,
                                  null,
                                  1
                                )),
                                (l.response = r.htmlEncode(l.response)));
                              break;
                            case "blob":
                            case "document":
                            case "arraybuffer":
                            default:
                              void 0 !== i.response &&
                                (l.response = Object.prototype.toString.call(
                                  i.response
                                ));
                          }
                          0 == i.readyState || 1 == i.readyState
                            ? (l.status = "Pending")
                            : 2 == i.readyState || 3 == i.readyState
                            ? (l.status = "Loading")
                            : 4 == i.readyState || (l.status = "Unknown");
                          var s = n.default.render(c.default, l),
                            d = this.domList[e];
                          i.status >= 400 &&
                            n.default.addClass(
                              n.default.one(".vc-group-preview", s),
                              "vc-table-row-error"
                            ),
                            d
                              ? d.parentNode.replaceChild(s, d)
                              : n.default
                                  .one(".vc-log", this.$tabbox)
                                  .insertAdjacentElement("beforeend", s),
                            (this.domList[e] = s);
                          var u = Object.keys(this.reqList).length;
                          u != o && this.renderHeader(),
                            this.isInBottom && this.scrollToBottom();
                        }
                      }
                    },
                    {
                      key: "mockAjax",
                      value: function() {
                        var e = window.XMLHttpRequest;
                        if (e) {
                          var t = this,
                            o = window.XMLHttpRequest.prototype.open,
                            n = window.XMLHttpRequest.prototype.send;
                          (t._open = o),
                            (t._send = n),
                            (window.XMLHttpRequest.prototype.open = function() {
                              var e = this,
                                n = [].slice.call(arguments),
                                r = n[0],
                                i = n[1],
                                a = t.getUniqueID(),
                                l = null;
                              (e._requestID = a), (e._method = r), (e._url = i);
                              var c = e.onreadystatechange || function() {},
                                s = function() {
                                  var o = t.reqList[a] || {};
                                  if (
                                    ((o.readyState = e.readyState),
                                    (o.status = 0),
                                    e.readyState > 1 && (o.status = e.status),
                                    (o.responseType = e.responseType),
                                    0 == e.readyState)
                                  )
                                    o.startTime || (o.startTime = +new Date());
                                  else if (1 == e.readyState)
                                    o.startTime || (o.startTime = +new Date());
                                  else if (2 == e.readyState) {
                                    o.header = {};
                                    for (
                                      var n = e.getAllResponseHeaders() || "",
                                        r = n.split("\n"),
                                        i = 0;
                                      i < r.length;
                                      i++
                                    ) {
                                      var s = r[i];
                                      if (s) {
                                        var d = s.split(": "),
                                          u = d[0],
                                          f = d.slice(1).join(": ");
                                        o.header[u] = f;
                                      }
                                    }
                                  } else
                                    3 == e.readyState ||
                                      (4 == e.readyState
                                        ? (clearInterval(l),
                                          (o.endTime = +new Date()),
                                          (o.costTime =
                                            o.endTime -
                                            (o.startTime || o.endTime)),
                                          (o.response = e.response))
                                        : clearInterval(l));
                                  return (
                                    e._noVConsole || t.updateRequest(a, o),
                                    c.apply(e, arguments)
                                  );
                                };
                              e.onreadystatechange = s;
                              var d = -1;
                              return (
                                (l = setInterval(function() {
                                  d != e.readyState &&
                                    ((d = e.readyState), s.call(e));
                                }, 10)),
                                o.apply(e, n)
                              );
                            }),
                            (window.XMLHttpRequest.prototype.send = function() {
                              var e = [].slice.call(arguments),
                                o = e[0],
                                i = t.reqList[this._requestID] || {};
                              i.method = this._method.toUpperCase();
                              var a = this._url.split("?");
                              if (((i.url = a.shift()), a.length > 0)) {
                                (i.getData = {}),
                                  (a = (a = a.join("?")).split("&"));
                                var l = !0,
                                  c = !1,
                                  s = void 0;
                                try {
                                  for (
                                    var d, u = a[Symbol.iterator]();
                                    !(l = (d = u.next()).done);
                                    l = !0
                                  ) {
                                    var f = d.value;
                                    (f = f.split("=")),
                                      (i.getData[f[0]] = f[1]);
                                  }
                                } catch (e) {
                                  (c = !0), (s = e);
                                } finally {
                                  try {
                                    l || null == u.return || u.return();
                                  } finally {
                                    if (c) throw s;
                                  }
                                }
                              }
                              if ("POST" == i.method)
                                if (r.isString(o)) {
                                  var v = o.split("&");
                                  i.postData = {};
                                  var p = !0,
                                    b = !1,
                                    h = void 0;
                                  try {
                                    for (
                                      var m, g = v[Symbol.iterator]();
                                      !(p = (m = g.next()).done);
                                      p = !0
                                    ) {
                                      var y = m.value;
                                      (y = y.split("=")),
                                        (i.postData[y[0]] = y[1]);
                                    }
                                  } catch (e) {
                                    (b = !0), (h = e);
                                  } finally {
                                    try {
                                      p || null == g.return || g.return();
                                    } finally {
                                      if (b) throw h;
                                    }
                                  }
                                } else r.isPlainObject(o) && (i.postData = o);
                              return (
                                this._noVConsole ||
                                  t.updateRequest(this._requestID, i),
                                n.apply(this, e)
                              );
                            });
                        }
                      }
                    },
                    {
                      key: "getUniqueID",
                      value: function() {
                        var e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                          /[xy]/g,
                          function(e) {
                            var t = (16 * Math.random()) | 0,
                              o = "x" == e ? t : (3 & t) | 8;
                            return o.toString(16);
                          }
                        );
                        return e;
                      }
                    }
                  ]) && u(o.prototype, i),
                  s && u(o, s),
                  t
                );
                var o, i, s;
              })(i.default);
              (o.default = b), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t) {
      e.exports =
        '<div class="vc-table">\n  <div class="vc-log"></div>\n</div>';
    },
    function(e, t) {
      e.exports =
        '<dl class="vc-table-row">\n  <dd class="vc-table-col vc-table-col-4">Name {{if (count > 0)}}({{count}}){{/if}}</dd>\n  <dd class="vc-table-col">Method</dd>\n  <dd class="vc-table-col">Status</dd>\n  <dd class="vc-table-col">Time</dd>\n</dl>';
    },
    function(e, t) {
      e.exports =
        '<div class="vc-group {{actived ? \'vc-actived\' : \'\'}}">\n  <dl class="vc-table-row vc-group-preview" data-reqid="{{id}}">\n    <dd class="vc-table-col vc-table-col-4">{{url}}</dd>\n    <dd class="vc-table-col">{{method}}</dd>\n    <dd class="vc-table-col">{{status}}</dd>\n    <dd class="vc-table-col">{{costTime}}</dd>\n  </dl>\n  <div class="vc-group-detail">\n    {{if (header !== null)}}\n    <div>\n      <dl class="vc-table-row vc-left-border">\n        <dt class="vc-table-col vc-table-col-title">Headers</dt>\n      </dl>\n      {{for (var key in header)}}\n      <div class="vc-table-row vc-left-border vc-small">\n        <div class="vc-table-col vc-table-col-2">{{key}}</div>\n        <div class="vc-table-col vc-table-col-4 vc-max-height-line">{{header[key]}}</div>\n      </div>\n      {{/for}}\n    </div>\n    {{/if}}\n    {{if (getData !== null)}}\n    <div>\n      <dl class="vc-table-row vc-left-border">\n        <dt class="vc-table-col vc-table-col-title">Query String Parameters</dt>\n      </dl>\n      {{for (var key in getData)}}\n      <div class="vc-table-row vc-left-border vc-small">\n        <div class="vc-table-col vc-table-col-2">{{key}}</div>\n        <div class="vc-table-col vc-table-col-4 vc-max-height-line">{{getData[key]}}</div>\n      </div>\n      {{/for}}\n    </div>\n    {{/if}}\n    {{if (postData !== null)}}\n    <div>\n      <dl class="vc-table-row vc-left-border">\n        <dt class="vc-table-col vc-table-col-title">Form Data</dt>\n      </dl>\n      {{for (var key in postData)}}\n      <div class="vc-table-row vc-left-border vc-small">\n        <div class="vc-table-col vc-table-col-2">{{key}}</div>\n        <div class="vc-table-col vc-table-col-4 vc-max-height-line">{{postData[key]}}</div>\n      </div>\n      {{/for}}\n    </div>\n    {{/if}}\n    <div>\n      <dl class="vc-table-row vc-left-border">\n        <dt class="vc-table-col vc-table-col-title">Response</dt>\n      </dl>\n      <div class="vc-table-row vc-left-border vc-small">\n        <pre class="vc-table-col vc-max-height vc-min-height">{{response || \'\'}}</pre>\n      </div>\n    </div>\n  </div>\n</div>';
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t, o(32), o(2), o(34), o(35), o(0), o(1)]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o, n, r, i, a, l, c) {
              "use strict";
              function s(e) {
                return e && e.__esModule ? e : { default: e };
              }
              function d(e) {
                return (d =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function(e) {
                        return typeof e;
                      }
                    : function(e) {
                        return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                      })(e);
              }
              function u(e, t) {
                for (var o = 0; o < t.length; o++) {
                  var n = t[o];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n);
                }
              }
              function f(e) {
                return (f = Object.setPrototypeOf
                  ? Object.getPrototypeOf
                  : function(e) {
                      return e.__proto__ || Object.getPrototypeOf(e);
                    })(e);
              }
              function v(e, t) {
                return (v =
                  Object.setPrototypeOf ||
                  function(e, t) {
                    return (e.__proto__ = t), e;
                  })(e, t);
              }
              function p(e) {
                if (void 0 === e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return e;
              }
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0),
                (r = s(r)),
                (i = s(i)),
                (a = s(a)),
                (l = (function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e)
                    for (var o in e)
                      if (Object.prototype.hasOwnProperty.call(e, o)) {
                        var n =
                          Object.defineProperty &&
                          Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(e, o)
                            : {};
                        n.get || n.set
                          ? Object.defineProperty(t, o, n)
                          : (t[o] = e[o]);
                      }
                  return (t.default = e), t;
                })(l)),
                (c = s(c));
              var b = (function(e) {
                function t() {
                  var e, o, n, r;
                  !(function(e, t) {
                    if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, t);
                  for (
                    var a = arguments.length, l = new Array(a), s = 0;
                    s < a;
                    s++
                  )
                    l[s] = arguments[s];
                  (n = this),
                    (r = (e = f(t)).call.apply(e, [this].concat(l))),
                    (o =
                      !r || ("object" !== d(r) && "function" != typeof r)
                        ? p(n)
                        : r);
                  var u = p(p(o));
                  (u.isInited = !1),
                    (u.node = {}),
                    (u.$tabbox = c.default.render(i.default, {})),
                    (u.nodes = []),
                    (u.activedElem = {});
                  var v =
                    window.MutationObserver ||
                    window.WebKitMutationObserver ||
                    window.MozMutationObserver;
                  return (
                    (u.observer = new v(function(e) {
                      for (var t = 0; t < e.length; t++) {
                        var o = e[t];
                        u._isInVConsole(o.target) || u.onMutation(o);
                      }
                    })),
                    o
                  );
                }
                return (
                  (function(e, t) {
                    if ("function" != typeof t && null !== t)
                      throw new TypeError(
                        "Super expression must either be null or a function"
                      );
                    (e.prototype = Object.create(t && t.prototype, {
                      constructor: { value: e, writable: !0, configurable: !0 }
                    })),
                      t && v(e, t);
                  })(t, e),
                  (o = t),
                  (n = [
                    {
                      key: "onRenderTab",
                      value: function(e) {
                        e(this.$tabbox);
                      }
                    },
                    {
                      key: "onAddTool",
                      value: function(e) {
                        var t = this,
                          o = [
                            {
                              name: "Expand",
                              global: !1,
                              onClick: function(e) {
                                if (t.activedElem)
                                  if (
                                    c.default.hasClass(
                                      t.activedElem,
                                      "vc-toggle"
                                    )
                                  )
                                    for (
                                      var o = 0;
                                      o < t.activedElem.childNodes.length;
                                      o++
                                    ) {
                                      var n = t.activedElem.childNodes[o];
                                      if (
                                        c.default.hasClass(n, "vcelm-l") &&
                                        !c.default.hasClass(n, "vcelm-noc") &&
                                        !c.default.hasClass(n, "vc-toggle")
                                      ) {
                                        c.default.one(".vcelm-node", n).click();
                                        break;
                                      }
                                    }
                                  else
                                    c.default
                                      .one(".vcelm-node", t.activedElem)
                                      .click();
                              }
                            },
                            {
                              name: "Collapse",
                              global: !1,
                              onClick: function(e) {
                                t.activedElem &&
                                  (c.default.hasClass(
                                    t.activedElem,
                                    "vc-toggle"
                                  )
                                    ? c.default
                                        .one(".vcelm-node", t.activedElem)
                                        .click()
                                    : t.activedElem.parentNode &&
                                      c.default.hasClass(
                                        t.activedElem.parentNode,
                                        "vcelm-l"
                                      ) &&
                                      c.default
                                        .one(
                                          ".vcelm-node",
                                          t.activedElem.parentNode
                                        )
                                        .click());
                              }
                            }
                          ];
                        e(o);
                      }
                    },
                    {
                      key: "onShow",
                      value: function() {
                        if (!this.isInited) {
                          (this.isInited = !0),
                            (this.node = this.getNode(
                              document.documentElement
                            ));
                          var e = this.renderView(
                              this.node,
                              c.default.one(".vc-log", this.$tabbox)
                            ),
                            t = c.default.one(".vcelm-node", e);
                          t && t.click(),
                            this.observer.observe(document.documentElement, {
                              attributes: !0,
                              childList: !0,
                              characterData: !0,
                              subtree: !0
                            });
                        }
                      }
                    },
                    {
                      key: "onRemove",
                      value: function() {
                        this.observer.disconnect();
                      }
                    },
                    {
                      key: "onMutation",
                      value: function(e) {
                        switch (e.type) {
                          case "childList":
                            e.removedNodes.length > 0 && this.onChildRemove(e),
                              e.addedNodes.length > 0 && this.onChildAdd(e);
                            break;
                          case "attributes":
                            this.onAttributesChange(e);
                            break;
                          case "characterData":
                            this.onCharacterDataChange(e);
                        }
                      }
                    },
                    {
                      key: "onChildRemove",
                      value: function(e) {
                        var t = e.target,
                          o = t.__vconsole_node;
                        if (o) {
                          for (var n = 0; n < e.removedNodes.length; n++) {
                            var r = e.removedNodes[n],
                              i = r.__vconsole_node;
                            i &&
                              i.view &&
                              i.view.parentNode.removeChild(i.view);
                          }
                          this.getNode(t);
                        }
                      }
                    },
                    {
                      key: "onChildAdd",
                      value: function(e) {
                        var t = e.target,
                          o = t.__vconsole_node;
                        if (o) {
                          this.getNode(t),
                            o.view &&
                              c.default.removeClass(o.view, "vcelm-noc");
                          for (var n = 0; n < e.addedNodes.length; n++) {
                            var r = e.addedNodes[n],
                              i = r.__vconsole_node;
                            if (i)
                              if (null !== e.nextSibling) {
                                var a = e.nextSibling.__vconsole_node;
                                a.view &&
                                  this.renderView(i, a.view, "insertBefore");
                              } else
                                o.view &&
                                  (o.view.lastChild
                                    ? this.renderView(
                                        i,
                                        o.view.lastChild,
                                        "insertBefore"
                                      )
                                    : this.renderView(i, o.view));
                          }
                        }
                      }
                    },
                    {
                      key: "onAttributesChange",
                      value: function(e) {
                        var t = e.target.__vconsole_node;
                        t &&
                          (t = this.getNode(e.target)).view &&
                          this.renderView(t, t.view, !0);
                      }
                    },
                    {
                      key: "onCharacterDataChange",
                      value: function(e) {
                        var t = e.target.__vconsole_node;
                        t &&
                          (t = this.getNode(e.target)).view &&
                          this.renderView(t, t.view, !0);
                      }
                    },
                    {
                      key: "renderView",
                      value: function(e, t, o) {
                        var n = this,
                          r = new a.default(e).get();
                        switch (
                          ((e.view = r),
                          c.default.delegate(
                            r,
                            "click",
                            ".vcelm-node",
                            function(t) {
                              t.stopPropagation();
                              var o = this.parentNode;
                              if (!c.default.hasClass(o, "vcelm-noc")) {
                                (n.activedElem = o),
                                  c.default.hasClass(o, "vc-toggle")
                                    ? c.default.removeClass(o, "vc-toggle")
                                    : c.default.addClass(o, "vc-toggle");
                                for (
                                  var r = -1, i = 0;
                                  i < o.children.length;
                                  i++
                                ) {
                                  var a = o.children[i];
                                  c.default.hasClass(a, "vcelm-l") &&
                                    (r++,
                                    a.children.length > 0 ||
                                      (e.childNodes[r]
                                        ? n.renderView(
                                            e.childNodes[r],
                                            a,
                                            "replace"
                                          )
                                        : (a.style.display = "none")));
                                }
                              }
                            }
                          ),
                          o)
                        ) {
                          case "replace":
                            t.parentNode.replaceChild(r, t);
                            break;
                          case "insertBefore":
                            t.parentNode.insertBefore(r, t);
                            break;
                          default:
                            t.appendChild(r);
                        }
                        return r;
                      }
                    },
                    {
                      key: "getNode",
                      value: function(e) {
                        if (!this._isIgnoredElement(e)) {
                          var t = e.__vconsole_node || {};
                          if (
                            ((t.nodeType = e.nodeType),
                            (t.nodeName = e.nodeName),
                            (t.tagName = e.tagName || ""),
                            (t.textContent = ""),
                            (t.nodeType != e.TEXT_NODE &&
                              t.nodeType != e.DOCUMENT_TYPE_NODE) ||
                              (t.textContent = e.textContent),
                            (t.id = e.id || ""),
                            (t.className = e.className || ""),
                            (t.attributes = []),
                            e.hasAttributes && e.hasAttributes())
                          )
                            for (var o = 0; o < e.attributes.length; o++)
                              t.attributes.push({
                                name: e.attributes[o].name,
                                value: e.attributes[o].value || ""
                              });
                          if (((t.childNodes = []), e.childNodes.length > 0))
                            for (var n = 0; n < e.childNodes.length; n++) {
                              var r = this.getNode(e.childNodes[n]);
                              r && t.childNodes.push(r);
                            }
                          return (e.__vconsole_node = t), t;
                        }
                      }
                    },
                    {
                      key: "_isIgnoredElement",
                      value: function(e) {
                        return (
                          e.nodeType == e.TEXT_NODE &&
                          "" ==
                            e.textContent.replace(
                              /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$|\n+/g,
                              ""
                            )
                        );
                      }
                    },
                    {
                      key: "_isInVConsole",
                      value: function(e) {
                        for (var t = e; null != t; ) {
                          if ("__vconsole" == t.id) return !0;
                          t = t.parentNode || void 0;
                        }
                        return !1;
                      }
                    }
                  ]) && u(o.prototype, n),
                  r && u(o, r),
                  t
                );
                var o, n, r;
              })(r.default);
              (o.default = b), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t, o) {
      var n = o(33);
      "string" == typeof n && (n = [[e.i, n, ""]]);
      var r = { hmr: !0, transform: void 0, insertInto: void 0 };
      o(4)(n, r);
      n.locals && (e.exports = n.locals);
    },
    function(e, t, o) {
      (e.exports = o(3)(!1)).push([
        e.i,
        '/* color */\n.vcelm-node {\n  color: #183691;\n}\n.vcelm-k {\n  color: #0086B3;\n}\n.vcelm-v {\n  color: #905;\n}\n/* layout */\n.vcelm-l {\n  padding-left: 8px;\n  position: relative;\n  word-wrap: break-word;\n  line-height: 1;\n}\n/*.vcelm-l.vcelm-noc {\n  padding-left: 0;\n}*/\n.vcelm-l.vc-toggle > .vcelm-node {\n  display: block;\n}\n.vcelm-l .vcelm-node:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n.vcelm-l.vcelm-noc .vcelm-node:active {\n  background-color: transparent;\n}\n.vcelm-t {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n/* level */\n.vcelm-l .vcelm-l {\n  display: none;\n}\n.vcelm-l.vc-toggle > .vcelm-l {\n  margin-left: 4px;\n  display: block;\n}\n/* arrow */\n.vcelm-l:before {\n  content: "";\n  display: block;\n  position: absolute;\n  top: 6px;\n  left: 3px;\n  width: 0;\n  height: 0;\n  border: transparent solid 3px;\n  border-left-color: #000;\n}\n.vcelm-l.vc-toggle:before {\n  display: block;\n  top: 6px;\n  left: 0;\n  border-top-color: #000;\n  border-left-color: transparent;\n}\n.vcelm-l.vcelm-noc:before {\n  display: none;\n}\n',
        ""
      ]);
    },
    function(e, t) {
      e.exports = '<div>\n  <div class="vc-log"></div>\n</div>';
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t, o(36), o(37), o(0), o(1)]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o, n, r, i, a) {
              "use strict";
              function l(e) {
                return e && e.__esModule ? e : { default: e };
              }
              function c(e, t) {
                for (var o = 0; o < t.length; o++) {
                  var n = t[o];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n);
                }
              }
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0),
                (n = l(n)),
                (r = l(r)),
                (i = (function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e)
                    for (var o in e)
                      if (Object.prototype.hasOwnProperty.call(e, o)) {
                        var n =
                          Object.defineProperty &&
                          Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(e, o)
                            : {};
                        n.get || n.set
                          ? Object.defineProperty(t, o, n)
                          : (t[o] = e[o]);
                      }
                  return (t.default = e), t;
                })(i)),
                (a = l(a));
              var s = (function() {
                function e(t) {
                  !(function(e, t) {
                    if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, e),
                    (this.node = t),
                    (this.view = this._create(this.node));
                }
                return (
                  (t = e),
                  (o = [
                    {
                      key: "get",
                      value: function() {
                        return this.view;
                      }
                    },
                    {
                      key: "_create",
                      value: function(e, t) {
                        var o = document.createElement("DIV");
                        switch (
                          (a.default.addClass(o, "vcelm-l"), e.nodeType)
                        ) {
                          case o.ELEMENT_NODE:
                            this._createElementNode(e, o);
                            break;
                          case o.TEXT_NODE:
                            this._createTextNode(e, o);
                            break;
                          case o.COMMENT_NODE:
                          case o.DOCUMENT_NODE:
                          case o.DOCUMENT_TYPE_NODE:
                          case o.DOCUMENT_FRAGMENT_NODE:
                        }
                        return o;
                      }
                    },
                    {
                      key: "_createTextNode",
                      value: function(e, t) {
                        a.default.addClass(t, "vcelm-t vcelm-noc"),
                          e.textContent &&
                            t.appendChild(
                              (function(e) {
                                return document.createTextNode(e);
                              })(
                                e.textContent.replace(
                                  /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                                  ""
                                )
                              )
                            );
                      }
                    },
                    {
                      key: "_createElementNode",
                      value: function(e, t) {
                        var o,
                          i = ((o = (o = e.tagName) ? o.toLowerCase() : ""),
                          ["br", "hr", "img", "input", "link", "meta"].indexOf(
                            o
                          ) > -1),
                          l = i;
                        0 == e.childNodes.length && (l = !0);
                        var c = a.default.render(n.default, { node: e }),
                          s = a.default.render(r.default, { node: e });
                        if (l)
                          a.default.addClass(t, "vcelm-noc"),
                            t.appendChild(c),
                            i || t.appendChild(s);
                        else {
                          t.appendChild(c);
                          for (var d = 0; d < e.childNodes.length; d++) {
                            var u = document.createElement("DIV");
                            a.default.addClass(u, "vcelm-l"), t.appendChild(u);
                          }
                          i || t.appendChild(s);
                        }
                      }
                    }
                  ]) && c(t.prototype, o),
                  i && c(t, i),
                  e
                );
                var t, o, i;
              })();
              (o.default = s), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t) {
      e.exports =
        '<span class="vcelm-node">&lt;{{node.tagName.toLowerCase()}}{{if (node.className || node.attributes.length)}}\n  <i class="vcelm-k">\n    {{for (var i = 0; i < node.attributes.length; i++)}}\n      {{if (node.attributes[i].value !== \'\')}}\n        {{node.attributes[i].name}}="<i class="vcelm-v">{{node.attributes[i].value}}</i>"{{else}}\n        {{node.attributes[i].name}}{{/if}}{{/for}}</i>{{/if}}&gt;</span>';
    },
    function(e, t) {
      e.exports =
        '<span class="vcelm-node">&lt;/{{node.tagName.toLowerCase()}}&gt;</span>';
    },
    function(e, t, o) {
      var n, r, i;
      (r = [t, o(2), o(39), o(40), o(0), o(1)]),
        void 0 ===
          (i =
            "function" ==
            typeof (n = function(o, n, r, i, a, l) {
              "use strict";
              function c(e) {
                return e && e.__esModule ? e : { default: e };
              }
              function s(e) {
                return (s =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function(e) {
                        return typeof e;
                      }
                    : function(e) {
                        return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                      })(e);
              }
              function d(e, t) {
                for (var o = 0; o < t.length; o++) {
                  var n = t[o];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n);
                }
              }
              function u(e, t) {
                return !t || ("object" !== s(t) && "function" != typeof t)
                  ? (function(e) {
                      if (void 0 === e)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called"
                        );
                      return e;
                    })(e)
                  : t;
              }
              function f(e) {
                return (f = Object.setPrototypeOf
                  ? Object.getPrototypeOf
                  : function(e) {
                      return e.__proto__ || Object.getPrototypeOf(e);
                    })(e);
              }
              function v(e, t) {
                return (v =
                  Object.setPrototypeOf ||
                  function(e, t) {
                    return (e.__proto__ = t), e;
                  })(e, t);
              }
              Object.defineProperty(o, "__esModule", { value: !0 }),
                (o.default = void 0),
                (n = c(n)),
                (r = c(r)),
                (i = c(i)),
                (a = (function(e) {
                  if (e && e.__esModule) return e;
                  var t = {};
                  if (null != e)
                    for (var o in e)
                      if (Object.prototype.hasOwnProperty.call(e, o)) {
                        var n =
                          Object.defineProperty &&
                          Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(e, o)
                            : {};
                        n.get || n.set
                          ? Object.defineProperty(t, o, n)
                          : (t[o] = e[o]);
                      }
                  return (t.default = e), t;
                })(a)),
                (l = c(l));
              var p = (function(e) {
                function t() {
                  var e, o;
                  !(function(e, t) {
                    if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, t);
                  for (
                    var n = arguments.length, i = new Array(n), a = 0;
                    a < n;
                    a++
                  )
                    i[a] = arguments[a];
                  return (
                    ((o = u(
                      this,
                      (e = f(t)).call.apply(e, [this].concat(i))
                    )).$tabbox = l.default.render(r.default, {})),
                    (o.currentType = ""),
                    (o.typeNameMap = {
                      cookies: "Cookies",
                      localstorage: "LocalStorage",
                      sessionstorage: "SessionStorage"
                    }),
                    o
                  );
                }
                return (
                  (function(e, t) {
                    if ("function" != typeof t && null !== t)
                      throw new TypeError(
                        "Super expression must either be null or a function"
                      );
                    (e.prototype = Object.create(t && t.prototype, {
                      constructor: { value: e, writable: !0, configurable: !0 }
                    })),
                      t && v(e, t);
                  })(t, e),
                  (o = t),
                  (n = [
                    {
                      key: "onRenderTab",
                      value: function(e) {
                        e(this.$tabbox);
                      }
                    },
                    {
                      key: "onAddTopBar",
                      value: function(e) {
                        for (
                          var t = this,
                            o = ["Cookies", "LocalStorage", "SessionStorage"],
                            n = [],
                            r = 0;
                          r < o.length;
                          r++
                        )
                          n.push({
                            name: o[r],
                            data: { type: o[r].toLowerCase() },
                            className: "",
                            onClick: function() {
                              if (l.default.hasClass(this, "vc-actived"))
                                return !1;
                              (t.currentType = this.dataset.type),
                                t.renderStorage();
                            }
                          });
                        (n[0].className = "vc-actived"), e(n);
                      }
                    },
                    {
                      key: "onAddTool",
                      value: function(e) {
                        var t = this,
                          o = [
                            {
                              name: "Refresh",
                              global: !1,
                              onClick: function(e) {
                                t.renderStorage();
                              }
                            },
                            {
                              name: "Clear",
                              global: !1,
                              onClick: function(e) {
                                t.clearLog();
                              }
                            }
                          ];
                        e(o);
                      }
                    },
                    { key: "onReady", value: function() {} },
                    {
                      key: "onShow",
                      value: function() {
                        "" == this.currentType &&
                          ((this.currentType = "cookies"),
                          this.renderStorage());
                      }
                    },
                    {
                      key: "clearLog",
                      value: function() {
                        if (this.currentType && window.confirm) {
                          var e = window.confirm(
                            "Remove all " +
                              this.typeNameMap[this.currentType] +
                              "?"
                          );
                          if (!e) return !1;
                        }
                        switch (this.currentType) {
                          case "cookies":
                            this.clearCookieList();
                            break;
                          case "localstorage":
                            this.clearLocalStorageList();
                            break;
                          case "sessionstorage":
                            this.clearSessionStorageList();
                            break;
                          default:
                            return !1;
                        }
                        this.renderStorage();
                      }
                    },
                    {
                      key: "renderStorage",
                      value: function() {
                        var e = [];
                        switch (this.currentType) {
                          case "cookies":
                            e = this.getCookieList();
                            break;
                          case "localstorage":
                            e = this.getLocalStorageList();
                            break;
                          case "sessionstorage":
                            e = this.getSessionStorageList();
                            break;
                          default:
                            return !1;
                        }
                        var t = l.default.one(".vc-log", this.$tabbox);
                        if (0 == e.length) t.innerHTML = "";
                        else {
                          for (var o = 0; o < e.length; o++)
                            (e[o].name = a.htmlEncode(e[o].name)),
                              (e[o].value = a.htmlEncode(e[o].value));
                          t.innerHTML = l.default.render(
                            i.default,
                            { list: e },
                            !0
                          );
                        }
                      }
                    },
                    {
                      key: "getCookieList",
                      value: function() {
                        if (!document.cookie || !navigator.cookieEnabled)
                          return [];
                        for (
                          var e = [], t = document.cookie.split(";"), o = 0;
                          o < t.length;
                          o++
                        ) {
                          var n = t[o].split("="),
                            r = n.shift().replace(/^ /, ""),
                            i = n.join("=");
                          try {
                            (r = decodeURIComponent(r)),
                              (i = decodeURIComponent(i));
                          } catch (e) {
                            console.log(e, r, i);
                          }
                          e.push({ name: r, value: i });
                        }
                        return e;
                      }
                    },
                    {
                      key: "getLocalStorageList",
                      value: function() {
                        if (!window.localStorage) return [];
                        try {
                          for (
                            var e = [], t = 0;
                            t < localStorage.length;
                            t++
                          ) {
                            var o = localStorage.key(t),
                              n = localStorage.getItem(o);
                            e.push({ name: o, value: n });
                          }
                          return e;
                        } catch (e) {
                          return [];
                        }
                      }
                    },
                    {
                      key: "getSessionStorageList",
                      value: function() {
                        if (!window.sessionStorage) return [];
                        try {
                          for (
                            var e = [], t = 0;
                            t < sessionStorage.length;
                            t++
                          ) {
                            var o = sessionStorage.key(t),
                              n = sessionStorage.getItem(o);
                            e.push({ name: o, value: n });
                          }
                          return e;
                        } catch (e) {
                          return [];
                        }
                      }
                    },
                    {
                      key: "clearCookieList",
                      value: function() {
                        if (document.cookie && navigator.cookieEnabled) {
                          for (
                            var e = this.getCookieList(), t = 0;
                            t < e.length;
                            t++
                          )
                            document.cookie =
                              e[t].name +
                              "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                          this.renderStorage();
                        }
                      }
                    },
                    {
                      key: "clearLocalStorageList",
                      value: function() {
                        if (window.localStorage)
                          try {
                            localStorage.clear(), this.renderStorage();
                          } catch (e) {
                            alert("localStorage.clear() fail.");
                          }
                      }
                    },
                    {
                      key: "clearSessionStorageList",
                      value: function() {
                        if (window.sessionStorage)
                          try {
                            sessionStorage.clear(), this.renderStorage();
                          } catch (e) {
                            alert("sessionStorage.clear() fail.");
                          }
                      }
                    }
                  ]) && d(o.prototype, n),
                  c && d(o, c),
                  t
                );
                var o, n, c;
              })(n.default);
              (o.default = p), (e.exports = t.default);
            })
              ? n.apply(t, r)
              : n) || (e.exports = i);
    },
    function(e, t) {
      e.exports =
        '<div class="vc-table">\n  <div class="vc-log"></div>\n</div>';
    },
    function(e, t) {
      e.exports =
        '<div>\n  <dl class="vc-table-row">\n    <dd class="vc-table-col">Name</dd>\n    <dd class="vc-table-col vc-table-col-2">Value</dd>\n  </dl>\n  {{for (var i = 0; i < list.length; i++)}}\n  <dl class="vc-table-row">\n    <dd class="vc-table-col">{{list[i].name}}</dd>\n    <dd class="vc-table-col vc-table-col-2">{{list[i].value}}</dd>\n  </dl>\n  {{/for}}\n</div>';
    }
  ]);
});
