// ==UserScript==
// @name         GG++
// @namespace    ggpp
// @version      0.2.0
// @description  A plugin-first mod for Gemini on the web (Userscript++).
// @author       GG++
// @license      GPL-3.0-or-later
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NiIgaGVpZ2h0PSI2NiIgdmlld0JveD0iMCAwIDY2IDY2IiBmaWxsPSJub25lIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ2dwcFNwYXJrIiB4MT0iMTguNDUiIHkxPSI0My40MiIgeDI9IjUyLjE1IiB5Mj0iMTUuMDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzQ4OTNGQyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuMjciIHN0b3AtY29sb3I9IiM0ODkzRkMiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjc3NyIgc3RvcC1jb2xvcj0iIzk2OURGRiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNCRDk5RkUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDwhLS0gR0crKyByZXZpZXcgKGJveCBvbmx5KS4gU3RhciBwYXRoIGQ9IGlkZW50aWNhbCB0byBDRE4gb3JpZ2luYWwuICsrIHZpYSBldmVub2RkIGhvbGVzLiAtLT4KICA8cGF0aCBmaWxsPSJ1cmwoI2dncHBTcGFyaykiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTU4LjY4MTkgMjkuNDE5NUM1My42MTE2IDI3LjIzNjkgNDkuMTc1MyAyNC4yNDI2IDQ1LjM3MTEgMjAuNDQwM0M0MS41Njg4IDE2LjYzOCAzOC41NzQ1IDEyLjE5OTggMzYuMzkxOSA3LjEyOTUxQzM1LjU1NCA1LjE4NjI5IDM0Ljg4MDcgMy4xODg4MyAzNC4zNjQ1IDEuMTQwODdDMzQuMTk2MiAwLjQ3MTMxMSAzMy41OTU4IDAgMzIuOTA1NyAwQzMyLjIxNTYgMCAzMS42MTUyIDAuNDcxMzExIDMxLjQ0NjkgMS4xNDA4N0MzMC45MzA3IDMuMTg4ODMgMzAuMjU3NCA1LjE4NDQyIDI5LjQxOTUgNy4xMjk1MUMyNy4yMzY5IDEyLjE5OTggMjQuMjQyNiAxNi42MzggMjAuNDQwMyAyMC40NDAzQzE2LjYzOCAyNC4yNDI2IDEyLjE5OTggMjcuMjM2OSA3LjEyOTUxIDI5LjQxOTVDNS4xODYyOSAzMC4yNTc0IDMuMTg4ODMgMzAuOTMwNyAxLjE0MDg3IDMxLjQ0NjlDMC40NzEzMTEgMzEuNjE1MiAwIDMyLjIxNTYgMCAzMi45MDU3QzAgMzMuNTk1OCAwLjQ3MTMxMSAzNC4xOTYyIDEuMTQwODcgMzQuMzY0NUMzLjE4ODgzIDM0Ljg4MDcgNS4xODQ0MiAzNS41NTQgNy4xMjk1MSAzNi4zOTE5QzEyLjE5OTggMzguNTc0NSAxNi42MzYxIDQxLjU2ODggMjAuNDQwMyA0NS4zNzExQzI0LjI0NDQgNDkuMTczNCAyNy4yMzY5IDUzLjYxMTYgMjkuNDE5NSA1OC42ODE5QzMwLjI1NzQgNjAuNjI1MSAzMC45MzA3IDYyLjYyMjYgMzEuNDQ2OSA2NC42NzA1QzMxLjYxNTIgNjUuMzQwMSAzMi4yMTU2IDY1LjgxMTQgMzIuOTA1NyA2NS44MTE0QzMzLjU5NTggNjUuODExNCAzNC4xOTYyIDY1LjM0MDEgMzQuMzY0NSA2NC42NzA1QzM0Ljg4MDcgNjIuNjIyNiAzNS41NTQgNjAuNjI3IDM2LjM5MTkgNTguNjgxOUMzOC41NzQ1IDUzLjYxMTYgNDEuNTY4OCA0OS4xNzUzIDQ1LjM3MTEgNDUuMzcxMUM0OS4xNzM0IDQxLjU2ODggNTMuNjExNiAzOC41NzQ1IDU4LjY4MTkgMzYuMzkxOUM2MC42MjUxIDM1LjU1NCA2Mi42MjI2IDM0Ljg4MDcgNjQuNjcwNSAzNC4zNjQ1QzY1LjM0MDEgMzQuMTk2MiA2NS44MTE0IDMzLjU5NTggNjUuODExNCAzMi45MDU3QzY1LjgxMTQgMzIuMjE1NiA2NS4zNDAxIDMxLjYxNTIgNjQuNjcwNSAzMS40NDY5QzYyLjYyMjYgMzAuOTMwNyA2MC42MjcgMzAuMjU3NCA1OC42ODE5IDI5LjQxOTVaIE0yMS4yMDAsMjYuMzAwIEgyNi4wMDAgVjMwLjUwMCBIMzAuMjAwIFYzNS4zMDAgSDI2LjAwMCBWMzkuNTAwIEgyMS4yMDAgVjM1LjMwMCBIMTcuMDAwIFYzMC41MDAgSDIxLjIwMCBaIE0zOS44MDAsMjYuMzAwIEg0NC42MDAgVjMwLjUwMCBINDguODAwIFYzNS4zMDAgSDQ0LjYwMCBWMzkuNTAwIEgzOS44MDAgVjM1LjMwMCBIMzUuNjAwIFYzMC41MDAgSDM5LjgwMCBaIi8+Cjwvc3ZnPgo=
// @match        https://gemini.google.com/*
// @run-at       document-start
// @inject-into  auto
// @sandbox      JavaScript
// @noframes
// @grant        unsafeWindow
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_removeValueChangeListener
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM.setClipboard
// @grant        GM.notification
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @grant        GM.listValues
// @grant        GM.xmlHttpRequest
// @grant        GM.registerMenuCommand
// @connect      *
// ==/UserScript==

(() => {
  var __defProp = Object.defineProperty;
  var __export = (target2, all) => {
    for (var name in all)
      __defProp(target2, name, { get: all[name], enumerable: true });
  };

  // <define:__USPP_CHANGELOG__>
  var define_USPP_CHANGELOG_default = [];

  // <define:__USPP_CONNECT__>
  var define_USPP_CONNECT_default = ["*"];

  // <define:__USPP_SCRIPT__>
  var define_USPP_SCRIPT_default = { id: "ggpp", name: "GG++", global: "GGPP", supportURL: null };

  // <define:__USPP_SITES__>
  var define_USPP_SITES_default = ["gemini"];

  // ../uspp-publish/repo/node_modules/preact/compat/dist/compat.module.js
  var compat_module_exports = {};
  __export(compat_module_exports, {
    Children: () => L2,
    Component: () => C,
    Fragment: () => S,
    PureComponent: () => M2,
    StrictMode: () => S,
    Suspense: () => P3,
    SuspenseList: () => B3,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => an,
    cloneElement: () => mn,
    createContext: () => X,
    createElement: () => k,
    createFactory: () => sn,
    createPortal: () => $2,
    createRef: () => M,
    default: () => gn,
    findDOMNode: () => yn,
    flushSync: () => bn,
    forwardRef: () => D3,
    hydrate: () => tn,
    isElement: () => Sn,
    isFragment: () => vn,
    isMemo: () => dn,
    isValidElement: () => hn,
    lazy: () => z3,
    memo: () => N2,
    render: () => nn,
    startTransition: () => x3,
    unmountComponentAtNode: () => pn,
    unstable_batchedUpdates: () => _n,
    useCallback: () => q2,
    useContext: () => x2,
    useDebugValue: () => P2,
    useDeferredValue: () => w3,
    useEffect: () => h3,
    useErrorBoundary: () => b2,
    useId: () => g2,
    useImperativeHandle: () => F2,
    useInsertionEffect: () => I2,
    useLayoutEffect: () => _2,
    useMemo: () => T2,
    useReducer: () => y2,
    useRef: () => A2,
    useState: () => d2,
    useSyncExternalStore: () => C3,
    useTransition: () => k3,
    version: () => cn
  });

  // ../uspp-publish/repo/node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var a;
  var s;
  var h2;
  var p;
  var v;
  var y;
  var d = {};
  var w = [];
  var _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var g = Array.isArray;
  function m(n2, l3) {
    for (var u3 in l3) n2[u3] = l3[u3];
    return n2;
  }
  function b(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function k(l3, u3, t3) {
    var i3, r3, o3, e3 = {};
    for (o3 in u3) "key" == o3 ? i3 = u3[o3] : "ref" == o3 ? r3 = u3[o3] : e3[o3] = u3[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return x(l3, e3, i3, r3, null);
  }
  function x(n2, t3, i3, r3, o3) {
    var e3 = { type: n2, props: t3, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function M() {
    return { current: null };
  }
  function S(n2) {
    return n2.children;
  }
  function C(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function $(n2, l3) {
    if (null == l3) return n2.__ ? $(n2.__, n2.__i + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++) if (null != (u3 = n2.__k[l3]) && null != u3.__e) return u3.__e;
    return "function" == typeof n2.type ? $(n2) : null;
  }
  function I(n2) {
    if (n2.__P && n2.__d) {
      var u3 = n2.__v, t3 = u3.__e, i3 = [], r3 = [], o3 = m({}, u3);
      o3.__v = u3.__v + 1, l.vnode && l.vnode(o3), q(n2.__P, o3, u3, n2.__n, n2.__P.namespaceURI, 32 & u3.__u ? [t3] : null, i3, null == t3 ? $(u3) : t3, !!(32 & u3.__u), r3), o3.__v = u3.__v, o3.__.__k[o3.__i] = o3, D(i3, o3, r3), u3.__e = u3.__ = null, o3.__e != t3 && P(o3);
    }
  }
  function P(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l3) {
      if (null != l3 && null != l3.__e) return n2.__e = n2.__c.base = l3.__e;
    }), P(n2);
  }
  function A(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(H);
  }
  function H() {
    try {
      for (var n2, l3 = 1; i.length; ) i.length > l3 && i.sort(e), n2 = i.shift(), l3 = i.length, I(n2);
    } finally {
      i.length = H.__r = 0;
    }
  }
  function L(n2, l3, u3, t3, i3, r3, o3, e3, f3, c3, a3) {
    var s3, h5, p3, v3, y3, _3, g5 = t3 && t3.__k || w, m3 = l3.length;
    for (f3 = T(u3, l3, g5, f3, m3), s3 = 0; s3 < m3; s3++) null != (p3 = u3.__k[s3]) && (h5 = -1 != p3.__i && g5[p3.__i] || d, p3.__i = s3, _3 = q(n2, p3, h5, i3, r3, o3, e3, f3, c3, a3), v3 = p3.__e, p3.ref && h5.ref != p3.ref && (h5.ref && J(h5.ref, null, p3), a3.push(p3.ref, p3.__c || v3, p3)), null == y3 && null != v3 && (y3 = v3), 4 & p3.__u ? (f3 = j(p3, f3, n2), h5.__e && (h5.__e = null)) : "function" == typeof p3.type && void 0 !== _3 ? f3 = _3 : v3 && (f3 = v3.nextSibling), p3.__u &= -7);
    return u3.__e = y3, f3;
  }
  function T(n2, l3, u3, t3, i3) {
    var r3, o3, e3, f3, c3, a3 = u3.length, s3 = a3, h5 = 0;
    for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? ("string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? o3 = n2.__k[r3] = x(null, o3, null, null, null) : g(o3) ? o3 = n2.__k[r3] = x(S, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? o3 = n2.__k[r3] = x(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : n2.__k[r3] = o3, f3 = r3 + h5, o3.__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = O(o3, u3, f3, s3)) && (s3--, (e3 = u3[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i3 > a3 ? h5-- : i3 < a3 && h5++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f3 && (c3 == f3 - 1 ? h5-- : c3 == f3 + 1 ? h5++ : (c3 > f3 ? h5-- : h5++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (s3) for (r3 = 0; r3 < a3; r3++) null != (e3 = u3[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = $(e3)), K(e3, e3));
    return t3;
  }
  function j(n2, l3, u3) {
    var t3, i3;
    if ("function" == typeof n2.type) {
      for (t3 = n2.__k, i3 = 0; t3 && i3 < t3.length; i3++) t3[i3] && (t3[i3].__ = n2, l3 = j(t3[i3], l3, u3));
      return l3;
    }
    n2.__e != l3 && (l3 && n2.type && !l3.parentNode && (l3 = $(n2)), l3 = u3.insertBefore(n2.__e, l3 || null));
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function F(n2, l3) {
    return l3 = l3 || [], null == n2 || "boolean" == typeof n2 || (g(n2) ? n2.some(function(n3) {
      F(n3, l3);
    }) : l3.push(n2)), l3;
  }
  function O(n2, l3, u3, t3) {
    var i3, r3, o3, e3 = n2.key, f3 = n2.type, c3 = l3[u3], a3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == e3 || a3 && e3 == c3.key && f3 == c3.type) return u3;
    if (t3 > (a3 ? 1 : 0)) {
      for (i3 = u3 - 1, r3 = u3 + 1; i3 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i3 >= 0 ? i3-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f3 == c3.type) return o3;
    }
    return -1;
  }
  function z(n2, l3, u3) {
    "-" == l3[0] ? n2.setProperty(l3, null == u3 ? "" : u3) : n2[l3] = null == u3 ? "" : "number" != typeof u3 || _.test(l3) ? u3 : u3 + "px";
  }
  function N(n2, l3, u3, t3, i3) {
    var r3, o3;
    n: if ("style" == l3) if ("string" == typeof u3) n2.style.cssText = u3;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u3 && l3 in u3 || z(n2.style, l3, "");
      if (u3) for (l3 in u3) t3 && u3[l3] == t3[l3] || z(n2.style, l3, u3[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(s, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u3, u3 ? t3 ? u3[a] = t3[a] : (u3[a] = h2, n2.addEventListener(l3, r3 ? v : p, r3)) : n2.removeEventListener(l3, r3 ? v : p, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u3 ? "" : u3;
        break n;
      } catch (n3) {
      }
      "function" == typeof u3 || (null == u3 || false === u3 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u3 ? "" : u3));
    }
  }
  function V(n2) {
    return function(u3) {
      if (this.l) {
        var t3 = this.l[u3.type + n2];
        if (null == u3[c]) u3[c] = h2++;
        else if (u3[c] < t3[a]) return;
        return t3(l.event ? l.event(u3) : u3);
      }
    };
  }
  function q(n2, u3, t3, i3, r3, o3, e3, f3, c3, a3) {
    var s3, h5, p3, v3, y3, d3, _3, k4, x4, M3, I4, P4, A4, H3, T4, j4, F4 = u3.type;
    if (void 0 !== u3.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f3 = u3.__e = t3.__e]), (s3 = l.__b) && s3(u3);
    n: if ("function" == typeof F4) {
      h5 = e3.length;
      try {
        if (x4 = u3.props, M3 = F4.prototype && F4.prototype.render, I4 = (s3 = F4.contextType) && i3[s3.__c], P4 = s3 ? I4 ? I4.props.value : s3.__ : i3, t3.__c ? k4 = (p3 = u3.__c = t3.__c).__ = p3.__E : (M3 ? u3.__c = p3 = new F4(x4, P4) : (u3.__c = p3 = new C(x4, P4), p3.constructor = F4, p3.render = Q), I4 && I4.sub(p3), p3.state || (p3.state = {}), p3.__n = i3, v3 = p3.__d = true, p3.__h = [], p3._sb = []), M3 && null == p3.__s && (p3.__s = p3.state), M3 && null != F4.getDerivedStateFromProps && (p3.__s == p3.state && (p3.__s = m({}, p3.__s)), m(p3.__s, F4.getDerivedStateFromProps(x4, p3.__s))), y3 = p3.props, d3 = p3.state, p3.__v = u3, v3) M3 && null == F4.getDerivedStateFromProps && null != p3.componentWillMount && p3.componentWillMount(), M3 && null != p3.componentDidMount && p3.__h.push(p3.componentDidMount);
        else {
          if (M3 && null == F4.getDerivedStateFromProps && x4 !== y3 && null != p3.componentWillReceiveProps && p3.componentWillReceiveProps(x4, P4), u3.__v == t3.__v || !p3.__e && null != p3.shouldComponentUpdate && false === p3.shouldComponentUpdate(x4, p3.__s, P4)) {
            u3.__v != t3.__v && (p3.props = x4, p3.state = p3.__s, p3.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.some(function(n3) {
              n3 && (n3.__ = u3);
            }), w.push.apply(p3.__h, p3._sb), p3._sb = [], p3.__h.length && e3.push(p3), f3 = $(t3);
            break n;
          }
          null != p3.componentWillUpdate && p3.componentWillUpdate(x4, p3.__s, P4), M3 && null != p3.componentDidUpdate && p3.__h.push(function() {
            p3.componentDidUpdate(y3, d3, _3);
          });
        }
        if (p3.context = P4, p3.props = x4, p3.__P = n2, p3.__e = false, A4 = l.__r, H3 = 0, M3) p3.state = p3.__s, p3.__d = false, A4 && A4(u3), s3 = p3.render(p3.props, p3.state, p3.context), w.push.apply(p3.__h, p3._sb), p3._sb = [];
        else do {
          p3.__d = false, A4 && A4(u3), s3 = p3.render(p3.props, p3.state, p3.context), p3.state = p3.__s;
        } while (p3.__d && ++H3 < 25);
        p3.state = p3.__s, null != p3.getChildContext && (i3 = m(m({}, i3), p3.getChildContext())), M3 && !v3 && null != p3.getSnapshotBeforeUpdate && (_3 = p3.getSnapshotBeforeUpdate(y3, d3)), T4 = null != s3 && s3.type === S && null == s3.key ? E(s3.props.children) : s3, f3 = L(n2, g(T4) ? T4 : [T4], u3, t3, i3, r3, o3, e3, f3, c3, a3), p3.base = u3.__e, u3.__u &= -161, p3.__h.length && e3.push(p3), k4 && (p3.__E = p3.__ = null);
      } catch (n3) {
        if (e3.length = h5, u3.__v = null, c3 || null != o3) {
          if (n3.then) {
            for (u3.__u |= c3 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
            null != o3 && (o3[o3.indexOf(f3)] = null), u3.__e = f3;
          } else if (null != o3) for (j4 = o3.length; j4--; ) b(o3[j4]);
        } else u3.__e = t3.__e;
        null == u3.__k && (u3.__k = t3.__k || []), n3.then || B(u3), l.__e(n3, u3, t3);
      }
    } else null == o3 && u3.__v == t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : f3 = u3.__e = G(t3.__e, u3, t3, i3, r3, o3, e3, c3, a3);
    return (s3 = l.diffed) && s3(u3), 128 & u3.__u ? void 0 : f3;
  }
  function B(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B));
  }
  function D(n2, u3, t3) {
    for (var i3 = 0; i3 < t3.length; i3++) J(t3[i3], t3[++i3], t3[++i3]);
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function E(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g(n2) ? n2.map(E) : void 0 !== n2.constructor ? null : m({}, n2);
  }
  function G(u3, t3, i3, r3, o3, e3, f3, c3, a3) {
    var s3, h5, p3, v3, y3, w4, _3, m3 = i3.props || d, k4 = t3.props, x4 = t3.type;
    if ("svg" == x4 ? o3 = "http://www.w3.org/2000/svg" : "math" == x4 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (s3 = 0; s3 < e3.length; s3++) if ((y3 = e3[s3]) && "setAttribute" in y3 == !!x4 && (x4 ? y3.localName == x4 : 3 == y3.nodeType)) {
        u3 = y3, e3[s3] = null;
        break;
      }
    }
    if (null == u3) {
      if (null == x4) return document.createTextNode(k4);
      u3 = document.createElementNS(o3, x4, k4.is && k4), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null == x4) m3 === k4 || c3 && u3.data == k4 || (u3.data = k4);
    else {
      if (e3 = "textarea" == x4 && null != k4.defaultValue ? null : e3 && n.call(u3.childNodes), !c3 && null != e3) for (m3 = {}, s3 = 0; s3 < u3.attributes.length; s3++) m3[(y3 = u3.attributes[s3]).name] = y3.value;
      for (s3 in m3) y3 = m3[s3], "dangerouslySetInnerHTML" == s3 ? p3 = y3 : "children" == s3 || s3 in k4 || "value" == s3 && "defaultValue" in k4 || "checked" == s3 && "defaultChecked" in k4 || N(u3, s3, null, y3, o3);
      for (s3 in k4) y3 = k4[s3], "children" == s3 ? v3 = y3 : "dangerouslySetInnerHTML" == s3 ? h5 = y3 : "value" == s3 ? w4 = y3 : "checked" == s3 ? _3 = y3 : c3 && "function" != typeof y3 || m3[s3] === y3 || N(u3, s3, y3, m3[s3], o3);
      if (h5) c3 || p3 && (h5.__html == p3.__html || h5.__html == u3.innerHTML) || (u3.innerHTML = h5.__html), t3.__k = [];
      else if (p3 && (u3.innerHTML = ""), L("template" == t3.type ? u3.content : u3, g(v3) ? v3 : [v3], t3, i3, r3, "foreignObject" == x4 ? "http://www.w3.org/1999/xhtml" : o3, e3, f3, e3 ? e3[0] : i3.__k && $(i3, 0), c3, a3), null != e3) for (s3 = e3.length; s3--; ) b(e3[s3]);
      c3 && "textarea" != x4 || (s3 = "value", "progress" == x4 && null == w4 ? u3.removeAttribute("value") : null != w4 && (w4 !== u3[s3] || "progress" == x4 && !w4 || "option" == x4 && w4 != m3[s3]) && N(u3, s3, w4, m3[s3], o3), s3 = "checked", null != _3 && _3 != u3[s3] && N(u3, s3, _3, m3[s3], o3));
    }
    return u3;
  }
  function J(n2, u3, t3) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u3 || (n2.__u = n2(u3));
      } else n2.current = u3;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function K(n2, u3, t3) {
    var i3, r3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || J(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
      i3.base = i3.__P = i3.__n = null;
    }
    if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && K(i3[r3], u3, t3 || "function" != typeof n2.type);
    t3 || b(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function Q(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function R(u3, t3, i3) {
    var r3, o3, e3, f3;
    t3 == document && (t3 = document.documentElement), l.__ && l.__(u3, t3), o3 = (r3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, e3 = [], f3 = [], q(t3, u3 = (!r3 && i3 || t3).__k = k(S, null, [u3]), o3 || d, d, t3.namespaceURI, !r3 && i3 ? [i3] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i3 ? i3 : o3 ? o3.__e : t3.firstChild, r3, f3), D(e3, u3, f3), u3.props.children = null;
  }
  function U(n2, l3) {
    R(n2, l3, U);
  }
  function W(l3, u3, t3) {
    var i3, r3, o3, e3, f3 = m({}, l3.props);
    for (o3 in l3.type && l3.type.defaultProps && (e3 = l3.type.defaultProps), u3) "key" == o3 ? i3 = u3[o3] : "ref" == o3 ? r3 = u3[o3] : f3[o3] = void 0 === u3[o3] && null != e3 ? e3[o3] : u3[o3];
    return arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), x(l3.type, f3, i3 || l3.key, r3 || l3.ref, null);
  }
  function X(n2) {
    function l3(n3) {
      var u3, t3;
      return this.getChildContext || (u3 = /* @__PURE__ */ new Set(), (t3 = {})[l3.__c] = this, this.getChildContext = function() {
        return t3;
      }, this.componentWillUnmount = function() {
        u3 = null;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value != n4.value && u3.forEach(function(n5) {
          n5.__e = true, A(n5);
        });
      }, this.sub = function(n4) {
        u3.add(n4);
        var l4 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u3 && u3.delete(n4), l4 && l4.call(n4);
        };
      }), n3.children;
    }
    return l3.__c = "__cC" + y++, l3.__ = n2, l3.Provider = l3.__l = (l3.Consumer = function(n3, l4) {
      return n3.children(l4);
    }).contextType = l3, l3;
  }
  n = w.slice, l = { __e: function(n2, l3, u3, t3) {
    for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
      if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, C.prototype.setState = function(n2, l3) {
    var u3;
    u3 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m({}, this.state), "function" == typeof n2 && (n2 = n2(m({}, u3), this.props)), n2 && m(u3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), A(this));
  }, C.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), A(this));
  }, C.prototype.render = S, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, H.__r = 0, f = Math.random().toString(8), c = "__d" + f, a = "__a" + f, s = /(PointerCapture)$|Capture$/i, h2 = 0, p = V(false), v = V(true), y = 0;

  // ../uspp-publish/repo/node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = l;
  var e2 = c2.__b;
  var a2 = c2.__r;
  var v2 = c2.diffed;
  var l2 = c2.__c;
  var m2 = c2.unmount;
  var p2 = c2.__;
  function s2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u3.__.length && u3.__.push({}), u3.__[n2];
  }
  function d2(n2) {
    return o2 = 1, y2(D2, n2);
  }
  function y2(n2, u3, i3) {
    var o3 = s2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u3) : D2(void 0, u3), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.__f)) {
      var f3 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u4 = false, i4 = o3.__c.props !== n3;
        if (o3.__c.__H.__.some(function(n4) {
          if (n4.__N) {
            u4 = true;
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
          }
        }), c3) {
          var f4 = c3.call(this, n3, t3, r3);
          return u4 ? f4 || i4 : f4;
        }
        return !u4 || i4;
      };
      r2.__f = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u4 = c3;
          c3 = void 0, f3(n3, t3, r3), c3 = u4;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f3;
    }
    return o3.__N || o3.__;
  }
  function h3(n2, u3) {
    var i3 = s2(t2++, 3);
    !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.u = u3, r2.__H.__h.push(i3));
  }
  function _2(n2, u3) {
    var i3 = s2(t2++, 4);
    !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.u = u3, r2.__h.push(i3));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function F2(n2, t3, r3) {
    o2 = 6, _2(function() {
      if ("function" == typeof n2) {
        var r4 = n2(t3());
        return function() {
          n2(null), r4 && "function" == typeof r4 && r4();
        };
      }
      if (n2) return n2.current = t3(), function() {
        return n2.current = null;
      };
    }, null == r3 ? r3 : r3.concat(n2));
  }
  function T2(n2, r3) {
    var u3 = s2(t2++, 7);
    return C2(u3.__H, r3) && (u3.__ = n2(), u3.__H = r3, u3.__h = n2), u3.__;
  }
  function q2(n2, t3) {
    return o2 = 8, T2(function() {
      return n2;
    }, t3);
  }
  function x2(n2) {
    var u3 = r2.context[n2.__c], i3 = s2(t2++, 9);
    return i3.c = n2, u3 ? (null == i3.__ && (i3.__ = true, u3.sub(r2)), u3.props.value) : n2.__;
  }
  function P2(n2, t3) {
    c2.useDebugValue && c2.useDebugValue(t3 ? t3(n2) : n2);
  }
  function b2(n2) {
    var u3 = s2(t2++, 10), i3 = d2();
    return u3.__ = n2, r2.componentDidCatch || (r2.componentDidCatch = function(n3, t3) {
      u3.__ && u3.__(n3, t3), i3[1](n3);
    }), [i3[0], function() {
      i3[1](void 0);
    }];
  }
  function g2() {
    var n2 = s2(t2++, 11);
    if (!n2.__) {
      for (var u3 = r2.__v; null !== u3 && !u3.__m && null !== u3.__; ) u3 = u3.__;
      var i3 = u3.__m || (u3.__m = [0, 0]);
      n2.__ = "P" + i3[0] + "-" + i3[1]++;
    }
    return n2.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) {
      var t3 = n2.__H;
      if (n2.__P && t3) try {
        t3.__h.some(z2), t3.__h.some(B2), t3.__h = [];
      } catch (r3) {
        t3.__h = [], c2.__e(r3, n2.__v);
      }
    }
  }
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), p2 && p2(n2, t3);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i3.__h.some(z2), i3.__h.some(B2), i3.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u, n3.u = void 0);
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.some(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], c2.__e(r3, n3.__v);
      }
    }), l2 && l2(n2, t3);
  }, c2.unmount = function(n2) {
    m2 && m2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.some(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u3), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r3, 35);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // ../uspp-publish/repo/node_modules/preact/compat/dist/compat.module.js
  function g3(n2, t3) {
    for (var e3 in t3) n2[e3] = t3[e3];
    return n2;
  }
  function E2(n2, t3) {
    for (var e3 in n2) if ("__source" !== e3 && !(e3 in t3)) return true;
    for (var r3 in t3) if ("__source" !== r3 && n2[r3] !== t3[r3]) return true;
    return false;
  }
  function C3(n2, t3) {
    var e3 = t3(), r3 = d2({ t: { __: e3, u: t3 } }), u3 = r3[0].t, o3 = r3[1];
    return _2(function() {
      u3.__ = e3, u3.u = t3, R2(u3) && o3({ t: u3 });
    }, [n2, e3, t3]), h3(function() {
      return R2(u3) && o3({ t: u3 }), n2(function() {
        R2(u3) && o3({ t: u3 });
      });
    }, [n2]), e3;
  }
  function R2(n2) {
    try {
      return !((t3 = n2.__) === (e3 = n2.u()) && (0 !== t3 || 1 / t3 == 1 / e3) || t3 != t3 && e3 != e3);
    } catch (n3) {
      return true;
    }
    var t3, e3;
  }
  function x3(n2) {
    n2();
  }
  function w3(n2) {
    return n2;
  }
  function k3() {
    return [false, x3];
  }
  var I2 = _2;
  function M2(n2, t3) {
    this.props = n2, this.context = t3;
  }
  function N2(n2, e3) {
    function r3(n3) {
      var t3 = this.props.ref;
      return t3 != n3.ref && t3 && ("function" == typeof t3 ? t3(null) : t3.current = null), e3 ? !e3(this.props, n3) || t3 != n3.ref : E2(this.props, n3);
    }
    function u3(e4) {
      return this.shouldComponentUpdate = r3, k(n2, e4);
    }
    return u3.displayName = "Memo(" + (n2.displayName || n2.name) + ")", u3.__f = u3.prototype.isReactComponent = true, u3.type = n2, u3;
  }
  (M2.prototype = new C()).isPureReactComponent = true, M2.prototype.shouldComponentUpdate = function(n2, t3) {
    return E2(this.props, n2) || E2(this.state, t3);
  };
  var T3 = l.__b;
  l.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T3 && T3(n2);
  };
  var A3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  function D3(n2) {
    function t3(t4) {
      var e3 = g3({}, t4);
      return delete e3.ref, n2(e3, t4.ref || null);
    }
    return t3.$$typeof = A3, t3.render = n2, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t3;
  }
  var F3 = function(n2, t3) {
    return null == n2 ? null : F(F(n2).map(t3));
  };
  var L2 = { map: F3, forEach: F3, count: function(n2) {
    return n2 ? F(n2).length : 0;
  }, only: function(n2) {
    var t3 = F(n2);
    if (1 !== t3.length) throw "Children.only";
    return t3[0];
  }, toArray: F };
  var O2 = l.__e;
  l.__e = function(n2, t3, e3, r3) {
    if (n2.then) {
      for (var u3, o3 = t3; o3 = o3.__; ) if ((u3 = o3.__c) && u3.__c) return null == t3.__e && (t3.__e = e3.__e, t3.__k = e3.__k || []), u3.__c(n2, t3);
    }
    O2(n2, t3, e3, r3);
  };
  var U2 = l.unmount;
  function V2(n2, t3, e3) {
    return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
      "function" == typeof n3.__c && n3.__c();
    }), n2.__c.__H = null), null != (n2 = g3({}, n2)).__c && (n2.__c.__P === e3 && (n2.__c.__P = t3), n2.__c.__e = true, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
      return V2(n3, t3, e3);
    })), n2;
  }
  function W2(n2, t3, e3) {
    return n2 && e3 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
      return W2(n3, t3, e3);
    }), n2.__c && n2.__c.__P === t3 && (n2.__e && e3.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e3)), n2;
  }
  function P3() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j3(n2) {
    var t3 = n2.__ && n2.__.__c;
    return t3 && t3.__a && t3.__a(n2);
  }
  function z3(n2) {
    var e3, r3, u3, o3 = null;
    function i3(i4) {
      if (e3 || (e3 = n2()).then(function(n3) {
        n3 && (o3 = n3.default || n3), u3 = true;
      }, function(n3) {
        r3 = n3, u3 = true;
      }), r3) throw r3;
      if (!u3) throw e3;
      return o3 ? k(o3, i4) : null;
    }
    return i3.displayName = "Lazy", i3.__f = true, i3;
  }
  function B3() {
    this.i = null, this.l = null;
  }
  l.unmount = function(n2) {
    var t3 = n2.__c;
    t3 && (t3.__z = true), t3 && t3.__R && t3.__R(), t3 && 32 & n2.__u && (n2.type = null), U2 && U2(n2);
  }, (P3.prototype = new C()).__c = function(n2, t3) {
    var e3 = t3.__c, r3 = this;
    null == r3.o && (r3.o = []), r3.o.push(e3);
    var u3 = j3(r3.__v), o3 = false, i3 = function() {
      o3 || r3.__z || (o3 = true, e3.__R = null, u3 ? u3(f3) : f3());
    };
    e3.__R = i3;
    var l3 = e3.__P;
    e3.__P = null;
    var f3 = function() {
      if (!--r3.__u) {
        if (r3.state.__a) {
          var n3 = r3.state.__a;
          r3.__v.__k[0] = W2(n3, n3.__c.__P, n3.__c.__O);
        }
        var t4;
        for (r3.setState({ __a: r3.__b = null }); t4 = r3.o.pop(); ) t4.__P = l3, t4.forceUpdate();
      }
    };
    r3.__u++ || 32 & t3.__u || r3.setState({ __a: r3.__b = r3.__v.__k[0] }), n2.then(i3, i3);
  }, P3.prototype.componentWillUnmount = function() {
    this.o = [];
  }, P3.prototype.render = function(n2, e3) {
    if (this.__b) {
      if (this.__v.__k) {
        var r3 = document.createElement("div"), o3 = this.__v.__k[0].__c;
        this.__v.__k[0] = V2(this.__b, r3, o3.__O = o3.__P);
      }
      this.__b = null;
    }
    var i3 = e3.__a && k(S, null, n2.fallback);
    return i3 && (i3.__u &= -33), [k(S, null, e3.__a ? null : n2.children), i3];
  };
  var H2 = function(n2, t3, e3) {
    if (++e3[1] === e3[0] && n2.l.delete(t3), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e3 = n2.i; e3; ) {
      for (; e3.length > 3; ) e3.pop()();
      if (e3[1] < e3[0]) break;
      n2.i = e3 = e3[2];
    }
  };
  function Z(n2) {
    return this.getChildContext = function() {
      return n2.context;
    }, n2.children;
  }
  function Y(n2) {
    var e3 = this, r3 = n2.h;
    if (e3.componentWillUnmount = function() {
      R(null, e3.v), e3.v = null, e3.h = null;
    }, e3.h && e3.h !== r3 && e3.componentWillUnmount(), !e3.v) {
      for (var u3 = e3.__v; null !== u3 && !u3.__m && null !== u3.__; ) u3 = u3.__;
      e3.h = r3, e3.v = { nodeType: 1, parentNode: r3, childNodes: [], __k: { __m: u3.__m }, contains: function() {
        return true;
      }, namespaceURI: r3.namespaceURI, insertBefore: function(n3, t3) {
        this.childNodes.push(n3), e3.h.insertBefore(n3, t3);
      }, removeChild: function(n3) {
        this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), e3.h.removeChild(n3);
      } };
    }
    R(k(Z, { context: e3.context }, n2.__v), e3.v);
  }
  function $2(n2, e3) {
    var r3 = k(Y, { __v: n2, h: e3 });
    return r3.containerInfo = e3, r3;
  }
  (B3.prototype = new C()).__a = function(n2) {
    var t3 = this, e3 = j3(t3.__v), r3 = t3.l.get(n2);
    return r3[0]++, function(u3) {
      var o3 = function() {
        t3.props.revealOrder ? (r3.push(u3), H2(t3, n2, r3)) : u3();
      };
      e3 ? e3(o3) : o3();
    };
  }, B3.prototype.render = function(n2) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var t3 = F(n2.children);
    n2.revealOrder && "b" === n2.revealOrder[0] && t3.reverse();
    for (var e3 = t3.length; e3--; ) this.l.set(t3[e3], this.i = [1, 0, this.i]);
    return n2.children;
  }, B3.prototype.componentDidUpdate = B3.prototype.componentDidMount = function() {
    var n2 = this;
    this.l.forEach(function(t3, e3) {
      H2(n2, e3, t3);
    });
  };
  var q3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
  var G2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
  var J2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
  var K2 = /[A-Z0-9]/g;
  var Q2 = "undefined" != typeof document;
  var X2 = function(n2) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
  };
  function nn(n2, t3, e3) {
    return null == t3.__k && (t3.textContent = ""), R(n2, t3), "function" == typeof e3 && e3(), n2 ? n2.__c : null;
  }
  function tn(n2, t3, e3) {
    return U(n2, t3), "function" == typeof e3 && e3(), n2 ? n2.__c : null;
  }
  C.prototype.isReactComponent = true, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
    Object.defineProperty(C.prototype, t3, { configurable: true, get: function() {
      return this["UNSAFE_" + t3];
    }, set: function(n2) {
      Object.defineProperty(this, t3, { configurable: true, writable: true, value: n2 });
    } });
  });
  var en = l.event;
  l.event = function(n2) {
    return en && (n2 = en(n2)), n2.persist = function() {
    }, n2.isPropagationStopped = function() {
      return this.cancelBubble;
    }, n2.isDefaultPrevented = function() {
      return this.defaultPrevented;
    }, n2.nativeEvent = n2;
  };
  var rn;
  var un = { configurable: true, get: function() {
    return this.class;
  } };
  var on = l.vnode;
  l.vnode = function(n2) {
    "string" == typeof n2.type && (function(n3) {
      var t3 = n3.props, e3 = n3.type, u3 = {}, o3 = -1 == e3.indexOf("-");
      for (var i3 in t3) {
        var l3 = t3[i3];
        if (!("value" === i3 && "defaultValue" in t3 && null == l3 || Q2 && "children" === i3 && "noscript" === e3 || "class" === i3 || "className" === i3)) {
          var f3 = i3.toLowerCase();
          "defaultValue" === i3 && "value" in t3 && null == t3.value ? i3 = "value" : "download" === i3 && true === l3 ? l3 = "" : "translate" === f3 && "no" === l3 ? l3 = false : "o" === f3[0] && "n" === f3[1] ? "ondoubleclick" === f3 ? i3 = "ondblclick" : "onchange" !== f3 || "input" !== e3 && "textarea" !== e3 || X2(t3.type) ? "onfocus" === f3 ? i3 = "onfocusin" : "onblur" === f3 ? i3 = "onfocusout" : J2.test(i3) && (i3 = f3) : f3 = i3 = "oninput" : o3 && G2.test(i3) ? i3 = i3.replace(K2, "-$&").toLowerCase() : null === l3 && (l3 = void 0), "oninput" === f3 && u3[i3 = f3] && (i3 = "oninputCapture"), u3[i3] = l3;
        }
      }
      "select" == e3 && (u3.multiple && Array.isArray(u3.value) && (u3.value = F(t3.children).forEach(function(n4) {
        n4.props.selected = -1 != u3.value.indexOf(n4.props.value);
      })), null != u3.defaultValue && (u3.value = F(t3.children).forEach(function(n4) {
        n4.props.selected = u3.multiple ? -1 != u3.defaultValue.indexOf(n4.props.value) : u3.defaultValue == n4.props.value;
      }))), t3.class && !t3.className ? (u3.class = t3.class, Object.defineProperty(u3, "className", un)) : t3.className && (u3.class = u3.className = t3.className), n3.props = u3;
    })(n2), n2.$$typeof = q3, on && on(n2);
  };
  var ln = l.__r;
  l.__r = function(n2) {
    ln && ln(n2), rn = n2.__c;
  };
  var fn = l.diffed;
  l.diffed = function(n2) {
    fn && fn(n2);
    var t3 = n2.props, e3 = n2.__e;
    null != e3 && "textarea" === n2.type && "value" in t3 && t3.value !== e3.value && (e3.value = null == t3.value ? "" : t3.value), rn = null;
  };
  var an = { ReactCurrentDispatcher: { current: { readContext: function(n2) {
    return rn.__n[n2.__c].props.value;
  }, useCallback: q2, useContext: x2, useDebugValue: P2, useDeferredValue: w3, useEffect: h3, useId: g2, useImperativeHandle: F2, useInsertionEffect: I2, useLayoutEffect: _2, useMemo: T2, useReducer: y2, useRef: A2, useState: d2, useSyncExternalStore: C3, useTransition: k3 } } };
  var cn = "18.3.1";
  function sn(n2) {
    return k.bind(null, n2);
  }
  function hn(n2) {
    return !!n2 && n2.$$typeof === q3;
  }
  function vn(n2) {
    return hn(n2) && n2.type === S;
  }
  function dn(n2) {
    return !!n2 && "string" == typeof n2.displayName && 0 == n2.displayName.indexOf("Memo(");
  }
  function mn(n2) {
    return hn(n2) ? W.apply(null, arguments) : n2;
  }
  function pn(n2) {
    return !!n2.__k && (R(null, n2), true);
  }
  function yn(n2) {
    return n2 && (n2.base || 1 === n2.nodeType && n2) || null;
  }
  var _n = function(n2, t3) {
    return n2(t3);
  };
  var bn = function(n2, t3) {
    var r3, u3 = l.debounceRendering;
    l.debounceRendering = function(n3) {
      r3 = n3;
    };
    try {
      var o3 = n2(t3);
      return r3 && r3(), o3;
    } finally {
      l.debounceRendering = u3;
    }
  };
  var Sn = hn;
  var gn = { useState: d2, useId: g2, useReducer: y2, useEffect: h3, useLayoutEffect: _2, useInsertionEffect: I2, useTransition: k3, useDeferredValue: w3, useSyncExternalStore: C3, startTransition: x3, useRef: A2, useImperativeHandle: F2, useMemo: T2, useCallback: q2, useContext: x2, useDebugValue: P2, version: "18.3.1", Children: L2, render: nn, hydrate: tn, unmountComponentAtNode: pn, createPortal: $2, createElement: k, createContext: X, createFactory: sn, cloneElement: mn, createRef: M, Fragment: S, isValidElement: hn, isElement: Sn, isFragment: vn, isMemo: dn, findDOMNode: yn, Component: C, PureComponent: M2, memo: N2, forwardRef: D3, flushSync: bn, unstable_batchedUpdates: _n, StrictMode: S, Suspense: P3, SuspenseList: B3, lazy: z3, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: an };

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/gm-object.js
  var GM_OBJECT = typeof GM !== "undefined" && GM && typeof GM === "object" ? GM : null;

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/env.js
  var W3 = typeof unsafeWindow !== "undefined" && unsafeWindow ? unsafeWindow : window;
  var GM2 = {
    get: typeof GM_getValue === "function" ? GM_getValue : null,
    set: typeof GM_setValue === "function" ? GM_setValue : null,
    del: typeof GM_deleteValue === "function" ? GM_deleteValue : null,
    xhr: typeof GM_xmlhttpRequest === "function" ? GM_xmlhttpRequest : null,
    addListener: typeof GM_addValueChangeListener === "function" ? GM_addValueChangeListener : null,
    removeListener: typeof GM_removeValueChangeListener === "function" ? GM_removeValueChangeListener : null,
    menu: typeof GM_registerMenuCommand === "function" ? GM_registerMenuCommand : null,
    unmenu: typeof GM_unregisterMenuCommand === "function" ? GM_unregisterMenuCommand : null,
    clipboard: typeof GM_setClipboard === "function" ? GM_setClipboard : g4("setClipboard"),
    // AdGuard 只有 GM.notification
    notification: typeof GM_notification === "function" ? GM_notification : g4("notification"),
    info: typeof GM_info !== "undefined" ? GM_info : GM_OBJECT?.info ?? null
  };
  function g4(name) {
    const f3 = GM_OBJECT && GM_OBJECT[name];
    return typeof f3 === "function" ? (...a3) => f3.apply(GM_OBJECT, a3) : null;
  }
  var MANAGER = (() => {
    const n2 = String(GM2.info?.scriptHandler || "").toLowerCase();
    if (!n2) return "unknown";
    for (const k4 of ["tampermonkey", "violentmonkey", "scriptcat", "adguard"]) if (n2.includes(k4)) return k4;
    return n2;
  })();
  var missingCapabilities = () => [
    ["storage", GM2.get && GM2.set],
    ["menu", GM2.menu],
    ["crossTabSync", GM2.addListener],
    ["xhr", GM2.xhr],
    ["notification", GM2.notification],
    ["clipboard", GM2.clipboard],
    ["unsafeWindow", typeof unsafeWindow !== "undefined"]
  ].filter(([, ok]) => !ok).map(([k4]) => k4);
  var FRAMEWORK_VERSION = true ? "0.1.0" : "0.0.0";
  var VERSION = true ? "0.2.0" : "0.0.0";
  var IS_DEV = true ? false : false;
  var BUILD_TYPE = IS_DEV ? "development" : "production";
  var isChromium = () => !!W3.chrome;
  var SCRIPT = typeof define_USPP_SCRIPT_default !== "undefined" ? define_USPP_SCRIPT_default : { id: "dev", name: "Userscript++ script", global: null };
  var SCRIPT_ID = SCRIPT.id;
  var SCRIPT_NAME = SCRIPT.name;
  var GLOBAL_NAME = SCRIPT.global || null;
  var SUPPORT_URL = SCRIPT.supportURL || null;
  var INSTANCE_KEY = Symbol.for(`uspp:${SCRIPT_ID}`);
  var INSTANCE_EXPR = `window[Symbol.for(${JSON.stringify(`uspp:${SCRIPT_ID}`)})]`;
  var API_VERSION = 1;

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/diag.js
  var DIAG_KEY = `UserscriptPP:${SCRIPT_ID}:diag`;
  var cfg = {};
  if (false) {
    try {
      cfg = JSON.parse(W3.localStorage.getItem(DIAG_KEY) || "{}") || {};
    } catch {
      cfg = {};
    }
  }
  var diag = Object.freeze({ ...cfg, disablePlugins: Array.isArray(cfg.disablePlugins) ? cfg.disablePlugins.slice() : [] });
  var diagOn = Object.keys(cfg).length > 0;
  var events = [];
  var counters = /* @__PURE__ */ Object.create(null);
  var now = () => Math.round(typeof performance !== "undefined" ? performance.now() : Date.now());
  function trace(kind, data) {
    if (!diag.log) return;
    if (events.length < 2e4) events.push(data === void 0 ? [now(), kind] : [now(), kind, data]);
  }
  function count(kind) {
    if (!diag.log) return;
    counters[kind] = (counters[kind] || 0) + 1;
  }
  if (diag.log) {
    try {
      new PerformanceObserver((list2) => {
        for (const e3 of list2.getEntries()) if (e3.initiatorType === "script" || /\.js(\?|$)/.test(e3.name)) {
          let name = e3.name;
          try {
            name = new URL(e3.name).pathname;
          } catch {
          }
          trace("page.script", { name, start: Math.round(e3.startTime) });
        }
      }).observe({ type: "resource", buffered: true });
    } catch {
    }
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/logger.js
  var COLORS = { log: "#a78bfa", info: "#38bdf8", warn: "#f59e0b", error: "#ef4444", debug: "#9ca3af" };
  var debugOn = false;
  function setDebugLogs(on3) {
    debugOn = !!on3;
  }
  var recent = [];
  var recentLogs = () => recent.slice();
  var brief = (a3) => {
    try {
      return a3 instanceof Error ? `${a3.name}: ${a3.message}` : typeof a3 === "string" ? a3 : JSON.stringify(a3)?.slice(0, 300) ?? String(a3);
    } catch {
      return String(a3);
    }
  };
  var Logger = class {
    constructor(name, color = "#a78bfa") {
      this.name = name;
      this.color = color;
    }
    _out(level, args) {
      if (level === "debug" && !debugOn) return;
      if (level === "warn" || level === "error") {
        recent.push({ at: (/* @__PURE__ */ new Date()).toISOString(), level, source: this.name, text: args.map(brief).join(" ").slice(0, 500) });
        if (recent.length > 20) recent.shift();
      }
      const fn2 = console[level] || console.log;
      fn2.call(
        console,
        `%c ${SCRIPT_NAME} %c %c ${this.name} `,
        `background:${COLORS[level]};color:#000;border-radius:4px 0 0 4px;font-weight:bold`,
        "",
        `background:${this.color};color:#000;border-radius:0 4px 4px 0`,
        ...args
      );
    }
    log(...a3) {
      this._out("log", a3);
    }
    info(...a3) {
      this._out("info", a3);
    }
    warn(...a3) {
      this._out("warn", a3);
    }
    error(...a3) {
      this._out("error", a3);
    }
    debug(...a3) {
      this._out("debug", a3);
    }
  };

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/match.js
  var reCache = /* @__PURE__ */ new Map();
  var globToRe = (s3, any) => s3.split("*").map((x4) => x4.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(any);
  function compile(pattern) {
    const p3 = String(pattern || "").trim();
    if (!p3) return null;
    if (p3 === "*" || p3 === "<all_urls>" || p3 === "*://*/*") return /^/;
    const m3 = /^(\*|https?|file):\/\/([^/]*)(\/.*)?$/.exec(p3);
    if (!m3) {
      const h5 = p3.replace(/^\*\./, "");
      return new RegExp(`^https?://([^/]*\\.)?${globToRe(h5, "[^/]*")}(?::\\d+)?(/|$)`, "i");
    }
    const [, scheme, hostPat, path = "/*"] = m3;
    const sch = scheme === "*" ? "https?" : scheme;
    let hostRe;
    if (hostPat === "*") hostRe = "[^/]*";
    else if (hostPat.startsWith("*.")) hostRe = `([^/]*\\.)?${globToRe(hostPat.slice(2), "[^/]*")}`;
    else hostRe = globToRe(hostPat, "[^/]*");
    return new RegExp(`^${sch}://${hostRe}(?::\\d+)?${globToRe(path, ".*")}$`, "i");
  }
  function matchPattern(pattern, url = location.href) {
    let re = reCache.get(pattern);
    if (re === void 0) {
      re = compile(pattern);
      reCache.set(pattern, re);
    }
    return !!re && re.test(url);
  }
  function matchesUrl(patterns, url = location.href) {
    const list2 = Array.isArray(patterns) ? patterns : typeof patterns === "string" ? [patterns] : [];
    return list2.some((p3) => matchPattern(p3, url));
  }
  function specificity(pattern) {
    const p3 = String(pattern || "");
    if (p3 === "*" || p3 === "<all_urls>") return 0;
    const m3 = /^[^:]+:\/\/([^/]*)(\/.*)?$/.exec(p3);
    const host2 = m3 ? m3[1] : p3;
    const path = m3 ? m3[2] || "" : "";
    return (host2.includes("*") ? 0 : 1e4) + host2.replace(/\*/g, "").length * 10 + path.replace(/\*/g, "").length;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/sites.js
  var logger = new Logger("Sites", "#5eead4");
  var GENERIC = Object.freeze({ id: "generic", name: "Generic", matches: [], generic: true });
  var registry = /* @__PURE__ */ new Map();
  var current = null;
  var runtimeSwitchListeners = /* @__PURE__ */ new Set();
  var ID_RE = /^[a-z0-9-]+$/;
  function defineSite(def) {
    if (!def || typeof def !== "object") throw new Error("defineSite 需要一个对象");
    if (!ID_RE.test(def.id || "")) throw new Error(`站点 ID 只能是小写字母、数字和 -:${def.id}`);
    if (def.id === GENERIC.id) throw new Error("generic 是保留的站点 ID");
    if (!def.name) throw new Error(`站点 ${def.id} 缺少 name`);
    if (!Array.isArray(def.matches) || !def.matches.length) throw new Error(`站点 ${def.id} 缺少 matches`);
    return def;
  }
  function addSite(def, { runtime: runtime2 = false } = {}) {
    defineSite(def);
    if (registry.has(def.id)) {
      logger.warn(`站点 ${def.id} 已注册,忽略`);
      return false;
    }
    if (runtime2 && def.driver) {
      logger.warn(`运行时注册的站点 ${def.id} 不能使用打包器驱动,已忽略 driver`);
      def = { ...def, driver: void 0 };
    }
    registry.set(def.id, def);
    return true;
  }
  var score = (def, url) => {
    if (!matchesUrl(def.matches, url)) return -1;
    if (def.excludeMatches && matchesUrl(def.excludeMatches, url)) return -1;
    return Math.max(...def.matches.filter((p3) => matchesUrl([p3], url)).map(specificity));
  };
  function pickSite(url = location.href, candidates2 = [...registry.values()]) {
    let best = null, bestScore = -1, tie = false;
    for (const def of candidates2) {
      const s3 = score(def, url);
      if (s3 < 0) continue;
      if (s3 > bestScore) {
        best = def;
        bestScore = s3;
        tie = false;
      } else if (s3 === bestScore) tie = true;
    }
    if (best && tie) logger.warn(`多个站点同样匹配当前网址,使用 ${best.id}`);
    return best;
  }
  function selectSite(url = location.href) {
    current = pickSite(url) || GENERIC;
    return current;
  }
  var getSite = () => current || GENERIC;
  var isGeneric = () => getSite() === GENERIC;
  var isSite = (id) => getSite().id === id;
  var getSites = () => [...registry.values()];
  var getSiteById = (id) => registry.get(id) || (id === GENERIC.id ? GENERIC : null);
  var siteKey = () => isGeneric() ? location.hostname || "local" : getSite().id;
  function switchTo(def) {
    if (!isGeneric() || current === def) return false;
    if (pickSite(location.href, [def]) !== def) return false;
    current = def;
    for (const fn2 of [...runtimeSwitchListeners]) {
      try {
        fn2(def);
      } catch (e3) {
        logger.error("站点切换监听者出错", e3);
      }
    }
    return true;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/react.js
  var bundled = Object.freeze({
    name: "preact",
    site: false,
    React: compat_module_exports,
    createRoot: (container3) => ({ render: (v3) => nn(v3, container3), unmount: () => nn(null, container3) }),
    createPortal: $2,
    flushSync: bn ?? ((fn2) => fn2())
  });
  var locked = null;
  var siteReadyFlag = false;
  function markSiteReady() {
    siteReadyFlag = true;
  }
  var INTERACTIVE_WAIT_MS = 1500;
  var wantedAt = 0;
  function wantUi() {
    if (!wantedAt) wantedAt = Date.now();
  }
  function getRenderer() {
    if (locked) return locked;
    const site = getSite();
    if (typeof site.renderer === "function") {
      let r3 = null;
      try {
        r3 = site.renderer();
      } catch {
        r3 = null;
      }
      if (r3 && r3.React && typeof r3.createRoot === "function") return locked = Object.freeze({ name: "site", site: true, flushSync: (fn2) => fn2(), ...r3 });
      if (!siteReadyFlag && !(wantedAt && Date.now() - wantedAt >= INTERACTIVE_WAIT_MS)) return null;
      if (!siteReadyFlag) console.info(`[Userscript++] 站点渲染器 ${INTERACTIVE_WAIT_MS} ms 内没就绪,界面改用内置渲染器`);
    }
    return locked = bundled;
  }
  var getReact = () => getRenderer()?.React ?? null;
  var usingSiteRenderer = () => !!getRenderer()?.site;
  function siteComponent(name) {
    if (!usingSiteRenderer() || diag.noSiteComponents) return null;
    const c3 = getSite().components;
    try {
      return (typeof c3 === "function" ? c3(name) : c3?.[name]) ?? null;
    } catch {
      return null;
    }
  }
  var Fragment = Symbol.for("react.fragment");
  function h(type, props, ...children) {
    const R3 = getReact();
    if (!R3) throw new Error("Userscript++: 渲染器尚未就绪");
    if (type === Fragment) type = R3.Fragment;
    return R3.createElement(type, props, ...children);
  }
  var hook = (name) => (...args) => getReact()[name](...args);
  var useState = hook("useState");
  var useEffect = hook("useEffect");
  var useLayoutEffect = hook("useLayoutEffect");
  var useMemo = hook("useMemo");
  var useRef = hook("useRef");
  var useCallback = hook("useCallback");
  var useReducer = hook("useReducer");
  var useContext = hook("useContext");
  var useId = hook("useId");
  var useSyncExternalStore = hook("useSyncExternalStore");
  function useForceUpdate() {
    const [, f3] = useReducer((x4) => x4 + 1, 0);
    return f3;
  }
  function useSubscription(subscribe6) {
    const force = useForceUpdate();
    useEffect(() => subscribe6(() => force()), []);
  }
  var EBs = /* @__PURE__ */ new WeakMap();
  function getErrorBoundary() {
    const R3 = getReact();
    if (!R3) return null;
    if (EBs.has(R3)) return EBs.get(R3);
    class ErrorBoundary2 extends R3.Component {
      constructor(props) {
        super(props);
        this.state = { error: null };
      }
      static getDerivedStateFromError(error) {
        return { error };
      }
      componentDidCatch(error, info) {
        console.error("[Userscript++] 组件渲染出错", this.props.label || "", error, info?.componentStack);
        this.props.onError?.(error);
      }
      render() {
        if (this.state.error) {
          const fb = this.props.fallback;
          return typeof fb === "function" ? fb(this.state.error) : fb ?? null;
        }
        return this.props.children ?? null;
      }
    }
    EBs.set(R3, ErrorBoundary2);
    return ErrorBoundary2;
  }
  function ErrorBoundary(props) {
    const C4 = getErrorBoundary();
    return C4 ? h(C4, props) : props.children;
  }
  ErrorBoundary.wrap = (Component, fallback = null) => {
    const Wrapped = (props) => h(ErrorBoundary, { fallback, label: Component.displayName || Component.name }, h(Component, props));
    Wrapped.displayName = `UsppBoundary(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
  };

  // src/kernel/logger.ts
  var STYLE = "background:#1a73e8;color:#fff;border-radius:3px;padding:0 4px;font-weight:600";
  function createLogger(scope) {
    const tag = [`%cGG++%c ${scope}`, STYLE, ""];
    return {
      info: (...a3) => console.info(...tag, ...a3),
      warn: (...a3) => console.warn(...tag, ...a3),
      error: (...a3) => console.error(...tag, ...a3),
      debug: (...a3) => {
        if (localStorage.getItem("ggpp:debug") === "1") console.info(...tag, "[debug]", ...a3);
      }
    };
  }

  // sites/gemini/runtime.ts
  var Uref = null;
  var facade = null;
  var services = /* @__PURE__ */ new Map();
  var listeners = /* @__PURE__ */ new Map();
  var ggSchemas = /* @__PURE__ */ new Map();
  function registerGgSchema(def) {
    if (def?.id && def.settings) ggSchemas.set(def.id, def.settings);
  }
  function coerceListSetting(value) {
    if (Array.isArray(value)) return value.map((v3) => String(v3 ?? ""));
    if (value == null) return [];
    if (typeof value === "string") {
      if (!value) return [];
      return value.split(/\r?\n/).map((s3) => s3);
    }
    return [String(value)];
  }
  function serializeListSetting(value) {
    if (Array.isArray(value)) return value.map((v3) => String(v3 ?? "")).join("\n");
    if (value == null) return "";
    return String(value);
  }
  function isListKey(pluginId, key, defSettings) {
    const schema = defSettings ?? ggSchemas.get(pluginId);
    return schema?.[key]?.type === "list";
  }
  function whenDocumentBody(fn2) {
    let clean;
    let cancelled = false;
    const run = (body) => {
      if (cancelled) return;
      try {
        clean = fn2(body);
      } catch (e3) {
        console.error("[GG++] whenDocumentBody callback failed", e3);
      }
    };
    if (document.body) {
      run(document.body);
      return () => {
        cancelled = true;
        if (typeof clean === "function") clean();
      };
    }
    const onReady = () => {
      document.removeEventListener("DOMContentLoaded", onReady);
      if (document.body) run(document.body);
    };
    document.addEventListener("DOMContentLoaded", onReady);
    return () => {
      cancelled = true;
      document.removeEventListener("DOMContentLoaded", onReady);
      if (typeof clean === "function") clean();
    };
  }
  function bindApi(U3) {
    if (Uref === U3) return;
    Uref = U3;
    facade = new KernelFacade(U3);
    services.set("kernel", { api: facade, owner: "kernel" });
  }
  function getU() {
    if (!Uref) throw new Error("GG++ runtime: U not bound yet");
    return Uref;
  }
  function getKernelFacade() {
    return facade;
  }
  function emit(event, payload) {
    for (const fn2 of listeners.get(event) ?? []) {
      try {
        fn2(payload);
      } catch (e3) {
        console.error("[GG++] listener failed", event, e3);
      }
    }
  }
  function on2(event, fn2) {
    let set = listeners.get(event);
    if (!set) listeners.set(event, set = /* @__PURE__ */ new Set());
    set.add(fn2);
    return () => set.delete(fn2);
  }
  var KernelFacade = class {
    constructor(U3) {
      this.U = U3;
    }
    get version() {
      return String(this.U.scriptVersion ?? this.U.version ?? "0.0.0");
    }
    ggDef(p3) {
      const name = p3.name;
      const schema = ggSchemas.get(name);
      return {
        id: name,
        name: p3.ggDisplayName || p3.name,
        description: p3.description || "",
        tags: p3.ggTags || p3.tags || [],
        authors: p3.authors,
        icon: p3.ggIcon,
        enabledByDefault: p3.enabledByDefault,
        required: p3.required,
        hidden: p3.hidden,
        requiresRestart: p3.requiresRestart,
        dependencies: p3.dependencies,
        settings: p3.settings?.def ? Object.fromEntries(
          Object.entries(p3.settings.def).map(([k4, s3]) => {
            const ggType = schema?.[k4]?.type;
            const isList = ggType === "list" || !!s3.ggList;
            let type = s3.type === this.U.OptionType.BOOLEAN ? "boolean" : s3.type === this.U.OptionType.NUMBER || s3.type === this.U.OptionType.SLIDER ? "number" : s3.type === this.U.OptionType.SELECT ? "select" : "string";
            if (isList) type = "list";
            const defVal = isList ? coerceListSetting(schema?.[k4]?.default ?? s3.default) : s3.default;
            return [
              k4,
              {
                type,
                label: schema?.[k4]?.label || s3.description || k4,
                description: s3.description,
                default: defVal,
                min: s3.min,
                max: s3.max,
                step: s3.step,
                slider: s3.type === this.U.OptionType.SLIDER,
                unit: s3.units,
                options: s3.options,
                restartNeeded: s3.restartNeeded,
                placeholder: s3.placeholder ?? schema?.[k4]?.placeholder,
                multiline: !!s3.multiline
              }
            ];
          })
        ) : schema ? { ...schema } : void 0,
        liveSettings: !!p3.ggLiveSettings,
        start: () => {
        }
      };
    }
    plugins() {
      const all = Object.values(this.U.plugins || {});
      return all.filter((p3) => p3 && p3.name && p3.name !== "Settings").map((p3) => {
        const phase = this.U.pluginPhase?.(p3.name) ?? (p3.started ? "running" : "idle");
        const neededBy = all.filter((o3) => Array.isArray(o3.dependencies) && o3.dependencies.includes(p3.name) && this.U.isPluginEnabled?.(o3.name)).map((o3) => o3.name);
        return {
          def: this.ggDef(p3),
          state: phase === "running" || phase === "starting" ? "running" : phase === "failed" || phase === "tripped" ? "error" : "stopped",
          enabled: !!this.U.isPluginEnabled?.(p3.name),
          implicit: false,
          error: p3.startError ? String(p3.startError?.message || p3.startError) : void 0,
          neededBy
        };
      });
    }
    plugin(id) {
      return this.plugins().find((p3) => p3.def.id === id);
    }
    isEnabled(id) {
      return !!this.U.isPluginEnabled?.(id);
    }
    isRunning(id) {
      const phase = this.U.pluginPhase?.(id);
      return phase === "running" || phase === "starting";
    }
    values(id) {
      const p3 = this.U.plugins?.[id];
      const store = p3?.settings?.store;
      if (!store || typeof store !== "object") return {};
      const out = { ...store };
      const schema = ggSchemas.get(id);
      if (schema) {
        for (const [k4, s3] of Object.entries(schema)) {
          if (s3.type === "list") out[k4] = coerceListSetting(out[k4]);
        }
      } else if (p3?.settings?.def) {
        for (const [k4, s3] of Object.entries(p3.settings.def)) {
          if (s3?.ggList) out[k4] = coerceListSetting(out[k4]);
        }
      }
      return out;
    }
    setEnabled(id, enabled) {
      this.U.setPluginEnabled?.(id, enabled);
      emit("kernel:changed", id);
      return Promise.resolve();
    }
    setSetting(id, key, value) {
      const p3 = this.U.plugins?.[id];
      if (p3?.settings?.store) {
        const write2 = isListKey(id, key) || !!p3.settings.def?.[key]?.ggList ? serializeListSetting(value) : value;
        p3.settings.store[key] = write2;
      }
      emit(`settings:${id}`, this.values(id));
      emit("kernel:changed", id);
    }
    resetSettings(id) {
      const p3 = this.U.plugins?.[id];
      const def = p3?.settings?.def;
      if (p3?.settings?.store && def) {
        for (const [k4, s3] of Object.entries(def)) {
          const d3 = s3.type === this.U.OptionType.SELECT ? s3.options?.find((o3) => o3.default)?.value : s3.default;
          p3.settings.store[k4] = d3;
        }
      }
      emit(`settings:${id}`, this.values(id));
      emit("kernel:changed", id);
    }
    service(name) {
      return services.get(name)?.api;
    }
    on(event, fn2) {
      return on2(event, fn2);
    }
    emit(event, payload) {
      emit(event, payload);
    }
  };
  function createGgContext(U3, usppCtx, def, settings2) {
    const log = createLogger(def.id);
    const store = settings2?.store;
    registerGgSchema(def);
    const readSetting = (prop) => {
      const raw2 = store ? store[prop] : def.settings?.[prop]?.default;
      if (def.settings?.[prop]?.type === "list") return coerceListSetting(raw2);
      return raw2;
    };
    const writeSetting = (prop, value) => {
      const v3 = def.settings?.[prop]?.type === "list" ? serializeListSetting(value) : value;
      if (store) store[prop] = v3;
    };
    const settingsProxy = new Proxy({}, {
      get(_t, prop) {
        return readSetting(prop);
      },
      set(_t, prop, value) {
        writeSetting(prop, value);
        return true;
      },
      ownKeys() {
        return Reflect.ownKeys(store ?? def.settings ?? {});
      },
      getOwnPropertyDescriptor(_t, prop) {
        return { configurable: true, enumerable: true, value: readSetting(prop) };
      }
    });
    const ctx = {
      id: def.id,
      settings: settingsProxy,
      setSetting(key, value) {
        if (store) writeSetting(key, value);
        else getKernelFacade()?.setSetting(def.id, key, value);
      },
      signal: usppCtx.signal,
      cleanup(fn2) {
        usppCtx.register(fn2);
      },
      css(text) {
        const el = document.createElement("style");
        el.setAttribute("data-ggpp-style", def.id);
        el.textContent = text;
        (document.documentElement || document.head).appendChild(el);
        usppCtx.register(() => el.remove());
        return el;
      },
      use(service) {
        const api = services.get(service)?.api;
        if (api === void 0) throw new Error(`Service "${service}" is not available`);
        return api;
      },
      tryUse(service) {
        return services.get(service)?.api;
      },
      provide(service, api) {
        services.set(service, { api, owner: def.id });
        usppCtx.register(() => {
          const cur = services.get(service);
          if (cur?.owner === def.id) services.delete(service);
        });
      },
      on(event, fn2) {
        const off = on2(event, fn2);
        usppCtx.register(off);
      },
      emit(event, payload) {
        emit(event, payload);
      },
      data: {
        async get(key, fallback) {
          try {
            const v3 = await usppCtx.data.get(key);
            return v3 === void 0 || v3 === null ? fallback : v3;
          } catch {
            return fallback;
          }
        },
        async set(key, value) {
          await usppCtx.data.set(key, value);
          emit("data:changed", { key: `${def.id}:${key}`, value });
        },
        global: {
          async get(key, fallback) {
            try {
              const g5 = usppCtx.data?.global;
              if (!g5?.get) return fallback;
              const v3 = await g5.get(key, fallback);
              return v3 === void 0 || v3 === null ? fallback : v3;
            } catch {
              return fallback;
            }
          },
          async set(key, value) {
            const g5 = usppCtx.data?.global;
            if (g5?.set) await g5.set(key, value);
            emit("data:changed", { key: `${def.id}:${key}`, value });
          }
        }
      },
      setInterval(fn2, ms) {
        usppCtx.setInterval(fn2, ms);
      },
      setTimeout(fn2, ms) {
        usppCtx.setTimeout(fn2, ms);
      },
      log
    };
    return ctx;
  }

  // sites/gemini/migrate.ts
  var LEGACY_GM = "ggpp:settings";
  var LEGACY_LS = "ggpp:settings";
  var FLAG = "ggpp:migrated-to-uspp";
  function migrateGgSettings() {
    const U3 = getU();
    try {
      if (localStorage.getItem(FLAG) === "1") return;
    } catch {
    }
    let raw2 = null;
    try {
      const gm = globalThis.GM;
    } catch {
    }
    try {
      const s3 = localStorage.getItem(LEGACY_LS);
      if (s3) raw2 = JSON.parse(s3);
    } catch {
    }
    if (!raw2 || typeof raw2 !== "object") {
      const gm = globalThis.GM;
      if (gm?.getValue) {
        void gm.getValue(LEGACY_GM).then((v3) => {
          if (v3 == null) return;
          try {
            const bag = typeof v3 === "string" ? JSON.parse(v3) : v3;
            applyLegacy(bag);
            try {
              localStorage.setItem(FLAG, "1");
            } catch {
            }
          } catch {
          }
        });
      }
      return;
    }
    applyLegacy(raw2);
    try {
      localStorage.setItem(FLAG, "1");
    } catch {
    }
  }
  function applyLegacy(bag) {
    const U3 = getU();
    const plugins2 = {};
    for (const [id, entry] of Object.entries(bag)) {
      if (!entry || typeof entry !== "object") continue;
      const out = {};
      if (typeof entry.enabled === "boolean") out.enabled = entry.enabled;
      const values = entry.values;
      if (values && typeof values === "object") Object.assign(out, values);
      if (Object.keys(out).length) plugins2[id] = out;
    }
    if (!Object.keys(plugins2).length) return;
    try {
      U3.importSettings?.({ plugins: plugins2 }, { merge: true });
    } catch {
      try {
        for (const [id, entry] of Object.entries(plugins2)) {
          const p3 = U3.plugins?.[id];
          if (!p3) continue;
          if (typeof entry.enabled === "boolean") U3.setPluginEnabled?.(id, entry.enabled);
          if (p3.settings?.store) {
            for (const [k4, v3] of Object.entries(entry)) {
              if (k4 === "enabled") continue;
              p3.settings.store[k4] = v3;
            }
          }
        }
      } catch {
      }
    }
  }

  // sites/gemini/netHook.ts
  function resolveNetHookWindow() {
    try {
      if (typeof unsafeWindow !== "undefined" && unsafeWindow) return unsafeWindow;
    } catch {
    }
    try {
      if (typeof window !== "undefined" && window) return window;
    } catch {
    }
    return globalThis;
  }
  function toPageFn(page2, fn2) {
    try {
      if (typeof exportFunction === "function" && page2 && page2 !== (typeof window !== "undefined" ? window : null)) {
        return exportFunction(fn2, page2);
      }
    } catch {
    }
    return fn2;
  }
  function installNetHook() {
    const w4 = resolveNetHookWindow();
    if (w4.__ggppNetHook) return;
    try {
      Object.defineProperty(w4, "__ggppNetHook", { value: true });
    } catch {
      try {
        w4.__ggppNetHook = true;
      } catch {
        return;
      }
    }
    const REPLY = /\/processSession\b|StreamGenerate/i;
    const WATCH = /gemini\.google\.com|clients6\.google\.com|googleapis\.com/i;
    const CONV = /(?<![a-z0-9_])c_([0-9a-f]{12,})/gi;
    let seq4 = 0;
    const emit12 = (detail) => {
      const payload = JSON.stringify(detail);
      try {
        window.dispatchEvent(new CustomEvent("ggpp:net", { detail: payload }));
      } catch {
      }
      try {
        if (w4 !== window) w4.dispatchEvent(new CustomEvent("ggpp:net", { detail: payload }));
      } catch {
      }
      try {
        window.postMessage({ source: "ggpp-net", detail: payload }, location.origin);
      } catch {
      }
    };
    const idsIn = (text) => [...new Set([...String(text).matchAll(CONV)].map((m3) => m3[1]))];
    const short = (url) => {
      try {
        const u3 = new URL(url, location.href);
        return `${u3.host}${u3.pathname}`;
      } catch {
        return String(url).slice(0, 80);
      }
    };
    const bodyText2 = (body) => {
      try {
        if (typeof body === "string") return body;
        if (body instanceof URLSearchParams) return body.toString();
        if (typeof FormData !== "undefined" && body instanceof FormData) return String(body.get("f.req") ?? "");
        if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) return new TextDecoder().decode(body);
      } catch {
      }
      return "";
    };
    const convOfBody = (body) => {
      let raw2 = bodyText2(body);
      if (raw2.includes("f.req=")) {
        try {
          raw2 = decodeURIComponent(new URLSearchParams(raw2).get("f.req") ?? "");
        } catch {
        }
      }
      return idsIn(raw2)[0] ?? null;
    };
    const log = [];
    const entry = (kind, url) => {
      const e3 = { kind, url: short(url), start: Date.now(), end: 0, chunks: 0, bytes: 0, ids: [] };
      log.push(e3);
      if (log.length > 60) log.shift();
      return e3;
    };
    window.addEventListener(
      "ggpp:net-log-request",
      () => emit12({
        phase: "log",
        entries: log.map(
          (e3) => `${e3.kind} ${e3.url} ${e3.end ? `${e3.end - e3.start}ms` : `open ${Date.now() - e3.start}ms`} chunks=${e3.chunks} bytes=${e3.bytes}${e3.ids.length ? ` ids=${e3.ids.join(",")}` : ""}`
        )
      })
    );
    const onReplyStart = (url, body) => {
      const requestId = `r${++seq4}`;
      emit12({ phase: "start", requestId, conversationId: convOfBody(body), url: short(url) });
      return requestId;
    };
    const onReplyEnd = (requestId, error = false) => emit12({ phase: "end", requestId, error });
    const wrapFetch2 = () => {
      const orig = w4.fetch;
      if (typeof orig !== "function") return;
      w4.fetch = toPageFn(w4, async function(input, init) {
        const url = String(input?.url ?? input);
        const method = (init?.method || "GET").toUpperCase();
        const watched2 = WATCH.test(url);
        const reply = REPLY.test(url) && method !== "GET";
        const e3 = watched2 ? entry("fetch", url) : null;
        let requestId = null;
        if (reply) requestId = onReplyStart(url, init?.body);
        try {
          const res = await orig.apply(this, arguments);
          if (e3) {
            e3.end = Date.now();
            try {
              const clone3 = res.clone();
              const reader = clone3.body?.getReader?.();
              if (reader) {
                (async () => {
                  try {
                    for (; ; ) {
                      const { done, value } = await reader.read();
                      if (done) break;
                      e3.chunks++;
                      e3.bytes += value?.byteLength || 0;
                      const text = value ? new TextDecoder().decode(value) : "";
                      const ids = idsIn(text);
                      if (ids.length) {
                        e3.ids = [.../* @__PURE__ */ new Set([...e3.ids, ...ids])];
                        emit12({ phase: "chunk", ids, bytes: e3.bytes, url: e3.url });
                      }
                    }
                  } catch {
                  }
                })();
              }
            } catch {
            }
          }
          if (requestId) onReplyEnd(requestId, !res.ok);
          return res;
        } catch (err) {
          if (e3) e3.end = Date.now();
          if (requestId) onReplyEnd(requestId, true);
          throw err;
        }
      });
    };
    const wrapXhr2 = () => {
      const XO = w4.XMLHttpRequest;
      if (!XO) return;
      const open = XO.prototype.open;
      const send = XO.prototype.send;
      XO.prototype.open = toPageFn(w4, function(method, url) {
        this.__ggpp = { method: String(method || "GET").toUpperCase(), url: String(url) };
        return open.apply(this, arguments);
      });
      XO.prototype.send = toPageFn(w4, function(body) {
        const meta2 = this.__ggpp || {};
        const watched2 = WATCH.test(meta2.url || "");
        const reply = REPLY.test(meta2.url || "") && meta2.method !== "GET";
        const e3 = watched2 ? entry("xhr", meta2.url) : null;
        let requestId = null;
        if (reply) requestId = onReplyStart(meta2.url, body);
        this.addEventListener("loadend", () => {
          if (e3) e3.end = Date.now();
          if (requestId) onReplyEnd(requestId, this.status >= 400);
        });
        if (e3) {
          this.addEventListener("progress", (ev) => {
            e3.bytes = ev.loaded || e3.bytes;
            e3.chunks++;
          });
        }
        return send.apply(this, arguments);
      });
    };
    wrapFetch2();
    wrapXhr2();
  }

  // sites/gemini/usageDiag.ts
  function emptyUsageDiagnostics() {
    return {
      bridgeReady: false,
      bridgeMode: "none",
      lastAttemptAt: null,
      lastResult: "none",
      rpcid: null,
      source: "none",
      dailyParsed: false,
      weeklyParsed: false,
      errorCode: "none",
      chatBarButtonPresent: false,
      attemptCount: 0
    };
  }
  var KNOWN_CODES = /* @__PURE__ */ new Set([
    "none",
    "ok",
    "timeout",
    "no-token",
    "parse-miss",
    "empty",
    "account-mismatch",
    "stale-generation",
    "generation-bump",
    "hidden",
    "busy",
    "bridge-not-ready",
    "unknown"
  ]);
  function mapUsageErrorCode(error) {
    if (error == null || error === "") return "none";
    const e3 = String(error);
    if (KNOWN_CODES.has(e3)) return e3;
    if (e3.endsWith(":timeout")) return "timeout";
    if (e3.includes("no-token")) return "no-token";
    return "unknown";
  }
  function mapDiagSource(tag) {
    if (!tag) return "none";
    if (tag === "capture" || tag.startsWith("capture")) return "capture";
    if (tag === "dom" || tag.startsWith("dom")) return "dom";
    if (tag === "replay" || tag.startsWith("rpc") || tag.startsWith("replay")) return "rpc";
    return "none";
  }
  function sanitizeUsageDiagnostics(input) {
    const base = emptyUsageDiagnostics();
    const mode = input.bridgeMode;
    const bridgeMode2 = mode === "inject" || mode === "exportFunction" || mode === "same-world" || mode === "none" ? mode : "none";
    const lastResult = input.lastResult === "ok" || input.lastResult === "fail" || input.lastResult === "none" ? input.lastResult : "none";
    const source = mapDiagSource(typeof input.source === "string" ? input.source : "none");
    const errorCode = mapUsageErrorCode(typeof input.errorCode === "string" ? input.errorCode : "none");
    const rpcid = typeof input.rpcid === "string" && /^[A-Za-z0-9_-]{1,32}$/.test(input.rpcid) ? input.rpcid : null;
    return {
      bridgeReady: !!input.bridgeReady,
      bridgeMode: bridgeMode2,
      lastAttemptAt: typeof input.lastAttemptAt === "number" && Number.isFinite(input.lastAttemptAt) ? input.lastAttemptAt : null,
      lastResult,
      rpcid,
      source,
      dailyParsed: !!input.dailyParsed,
      weeklyParsed: !!input.weeklyParsed,
      errorCode: errorCode === "none" && lastResult === "ok" ? "ok" : errorCode,
      chatBarButtonPresent: !!input.chatBarButtonPresent,
      attemptCount: typeof input.attemptCount === "number" && input.attemptCount >= 0 ? Math.floor(input.attemptCount) : 0
    };
  }
  function usageDiagDisplayRows(d3) {
    const s3 = sanitizeUsageDiagnostics(d3);
    return [
      { key: "bridgeReady", label: "bridgeReady", value: s3.bridgeReady ? "true" : "false" },
      { key: "bridgeMode", label: "bridgeMode", value: s3.bridgeMode },
      {
        key: "lastAttemptAt",
        label: "lastAttemptAt",
        value: s3.lastAttemptAt == null ? "never" : String(s3.lastAttemptAt)
      },
      { key: "lastResult", label: "lastResult", value: s3.lastResult },
      { key: "rpcid", label: "rpcid", value: s3.rpcid ?? "—" },
      { key: "source", label: "source", value: s3.source },
      { key: "dailyParsed", label: "dailyParsed", value: s3.dailyParsed ? "true" : "false" },
      { key: "weeklyParsed", label: "weeklyParsed", value: s3.weeklyParsed ? "true" : "false" },
      { key: "errorCode", label: "errorCode", value: s3.errorCode },
      { key: "chatBarButtonPresent", label: "chatBarButtonPresent", value: s3.chatBarButtonPresent ? "true" : "false" },
      { key: "attemptCount", label: "attemptCount", value: String(s3.attemptCount) }
    ];
  }

  // sites/gemini/usageObserver.ts
  var DEFAULT_USAGE_RECIPE = { rpcid: "jSf9Qc", args: "[]" };
  var RECIPE_KEY = "ggpp:usageRecipe";
  var PAGE_SRC = "ggpp-usage";
  var PAGE_CMD = "ggpp-usage-cmd";
  var listeners2 = /* @__PURE__ */ new Set();
  var replaySeq = 0;
  var pendingReplay = /* @__PURE__ */ new Map();
  var bridgeStartedAt = 0;
  var sessionGeneration = 0;
  var bridgeMode = "none";
  var pageObserverReady = false;
  var pageOrigFetch = null;
  var pageWindowRef = null;
  function accountKeyFromPath(pathname = typeof location !== "undefined" ? location.pathname : "/") {
    const m3 = pathname.match(/^\/u\/(\d+)(?:\/|$)/);
    return m3 ? `u/${m3[1]}` : "default";
  }
  function normalizeRecipeArgs(args) {
    if (typeof args === "string") return args;
    if (args == null) return DEFAULT_USAGE_RECIPE.args;
    try {
      return JSON.stringify(args);
    } catch {
      return DEFAULT_USAGE_RECIPE.args;
    }
  }
  function recipeStorageKey(account = accountKeyFromPath()) {
    return `${RECIPE_KEY}:${account}`;
  }
  function loadRecipe(account = accountKeyFromPath()) {
    try {
      const raw2 = localStorage.getItem(recipeStorageKey(account)) ?? localStorage.getItem(RECIPE_KEY);
      if (raw2) {
        const j4 = JSON.parse(raw2);
        if (j4 && typeof j4.rpcid === "string") {
          return { rpcid: j4.rpcid, args: normalizeRecipeArgs(j4.args) };
        }
      }
    } catch {
    }
    return { ...DEFAULT_USAGE_RECIPE };
  }
  function saveRecipe(r3, account = accountKeyFromPath()) {
    try {
      const normalized = { rpcid: r3.rpcid, args: normalizeRecipeArgs(r3.args) };
      localStorage.setItem(recipeStorageKey(account), JSON.stringify(normalized));
    } catch {
    }
  }
  function matchArrayEnd(s3, from) {
    let depth = 0;
    let inStr = false;
    let esc3 = false;
    for (let i3 = from; i3 < s3.length; i3++) {
      const c3 = s3[i3];
      if (inStr) {
        if (esc3) esc3 = false;
        else if (c3 === "\\") esc3 = true;
        else if (c3 === '"') inStr = false;
      } else if (c3 === '"') inStr = true;
      else if (c3 === "[") depth++;
      else if (c3 === "]") {
        depth--;
        if (depth === 0) return i3;
      }
    }
    return -1;
  }
  function extractWrbPayloads(body) {
    const out = [];
    let n2 = 0;
    while (n2 < body.length) {
      const r3 = body.indexOf('[["wrb.fr"', n2);
      if (r3 < 0) break;
      const o3 = matchArrayEnd(body, r3);
      if (o3 < 0) break;
      try {
        const i3 = JSON.parse(body.slice(r3, o3 + 1));
        for (const s3 of i3) {
          if (Array.isArray(s3) && s3[0] === "wrb.fr" && typeof s3[1] === "string" && typeof s3[2] === "string") {
            try {
              out.push({ rpcid: s3[1], payload: JSON.parse(s3[2]) });
            } catch {
            }
          }
        }
      } catch {
      }
      n2 = o3 + 1;
    }
    return out;
  }
  function parseMetricRow(e3) {
    if (!Array.isArray(e3) || e3.length < 4) return null;
    const t3 = e3[1];
    const n2 = e3[2];
    const r3 = e3[3];
    if (typeof t3 !== "number" || t3 < 0 || t3 > 1.5 || typeof n2 !== "number" || !Array.isArray(r3) || !Array.isArray(r3[0])) return null;
    const o3 = r3[0][0];
    if (typeof o3 !== "number" || o3 < 16e8) return null;
    return { metric: { percent: Math.round(t3 * 100), resetEpoch: o3 }, period: n2 };
  }
  function metricsFromPayload(payload) {
    if (!Array.isArray(payload)) return null;
    const t3 = payload.find((i3) => Array.isArray(i3) && i3.some((s3) => parseMetricRow(s3) !== null));
    if (!t3 || !Array.isArray(t3)) return null;
    const n2 = t3.map(parseMetricRow).filter((i3) => i3 !== null);
    if (!n2.length) return null;
    const daily = n2.find((i3) => i3.period === 1)?.metric ?? void 0;
    const weekly = n2.find((i3) => i3.period === 2)?.metric ?? void 0;
    return daily || weekly ? { daily, weekly } : null;
  }
  function parseUsageBatchexecute(body, opts) {
    const hits = [];
    for (const { rpcid, payload } of extractWrbPayloads(body)) {
      const r3 = metricsFromPayload(payload);
      if (r3 && (r3.daily || r3.weekly)) hits.push({ rpcid, ...r3 });
    }
    if (!hits.length) return null;
    if (opts?.expectRpcid) {
      return hits.find((h5) => h5.rpcid === opts.expectRpcid) ?? null;
    }
    return hits[0];
  }
  function emit2(ev) {
    for (const fn2 of listeners2) {
      try {
        fn2(ev);
      } catch (e3) {
        console.error("[GG++] usage listener failed", e3);
      }
    }
  }
  function getPageWindow() {
    try {
      if (typeof unsafeWindow !== "undefined" && unsafeWindow) return unsafeWindow;
    } catch {
    }
    return window;
  }
  function resolveUsageHookWindow() {
    try {
      if (typeof unsafeWindow !== "undefined" && unsafeWindow) {
        return { page: unsafeWindow, viaUnsafe: true };
      }
    } catch {
    }
    try {
      if (typeof window !== "undefined" && window) {
        return { page: window, viaUnsafe: false };
      }
    } catch {
    }
    return { page: globalThis, viaUnsafe: false };
  }
  function bumpUsageGeneration() {
    sessionGeneration += 1;
    for (const [id, p3] of pendingReplay) {
      clearTimeout(p3.timer);
      pendingReplay.delete(id);
      p3.resolve({ id, error: "generation-bump" });
    }
    return sessionGeneration;
  }
  var usageDiag = emptyUsageDiagnostics();
  function syncBridgeIntoDiag() {
    usageDiag = sanitizeUsageDiagnostics({
      ...usageDiag,
      bridgeReady: pageObserverReady || bridgeMode === "same-world" || bridgeMode === "exportFunction",
      bridgeMode
    });
  }
  function getUsageDiagnostics(extras) {
    syncBridgeIntoDiag();
    const snap = sanitizeUsageDiagnostics({
      ...usageDiag,
      chatBarButtonPresent: extras?.chatBarButtonPresent ?? usageDiag.chatBarButtonPresent
    });
    return snap;
  }
  var diagAttemptId = 0;
  var diagAttemptOpen = false;
  function bridgeLooksReady() {
    return pageObserverReady || bridgeMode === "same-world" || bridgeMode === "exportFunction" || bridgeMode === "inject";
  }
  function noteUsageDiagSkip(code) {
    syncBridgeIntoDiag();
    diagAttemptId += 1;
    diagAttemptOpen = false;
    usageDiag = sanitizeUsageDiagnostics({
      ...usageDiag,
      lastAttemptAt: Date.now(),
      attemptCount: usageDiag.attemptCount + 1,
      lastResult: "fail",
      errorCode: code,
      source: "none",
      dailyParsed: false,
      weeklyParsed: false
      // keep rpcid as last known recipe id (non-secret) for operators
    });
  }
  function noteUsageDiagAttempt(rpcid) {
    syncBridgeIntoDiag();
    diagAttemptId += 1;
    diagAttemptOpen = true;
    usageDiag = sanitizeUsageDiagnostics({
      ...usageDiag,
      lastAttemptAt: Date.now(),
      attemptCount: usageDiag.attemptCount + 1,
      rpcid,
      lastResult: "none",
      errorCode: bridgeLooksReady() ? "none" : "bridge-not-ready",
      source: "none",
      dailyParsed: false,
      weeklyParsed: false
    });
    return diagAttemptId;
  }
  function noteUsageDiagResult(opts) {
    const id = opts.attemptId ?? diagAttemptId;
    if (id !== diagAttemptId || !diagAttemptOpen) {
      return false;
    }
    diagAttemptOpen = false;
    syncBridgeIntoDiag();
    const source = mapDiagSource(opts.source);
    const errorCode = opts.ok ? "ok" : mapUsageErrorCode(opts.error);
    usageDiag = sanitizeUsageDiagnostics({
      ...usageDiag,
      lastAttemptAt: usageDiag.lastAttemptAt ?? Date.now(),
      lastResult: opts.ok ? "ok" : "fail",
      rpcid: opts.rpcid ?? usageDiag.rpcid,
      source,
      dailyParsed: !!opts.dailyParsed,
      weeklyParsed: !!opts.weeklyParsed,
      errorCode
    });
    return true;
  }
  function pageObserverSource() {
    return `(() => {
  if (window.__ggppUsageObserverInstalled) return;
  window.__ggppUsageObserverInstalled = true;
  var SRC = ${JSON.stringify(PAGE_SRC)};
  var CMD = ${JSON.stringify(PAGE_CMD)};
  var origFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;

  function onUsagePath() {
    return /^\\/(?:u\\/\\d+\\/)?usage(?:\\/|$)/.test(location.pathname);
  }
  function usageSource() {
    var sourcePath = location.pathname;
    var account = sourcePath.match(/^\\/u\\/(\\d+)(?:\\/|$)/);
    return {
      accountKey: account ? "u/" + account[1] : "default",
      sourcePath: sourcePath,
      sourceStartedAt: Date.now(),
    };
  }
  function isGenRequest(url, body) {
    var urlText = String(url || "").toLowerCase();
    if (urlText.indexOf("streamgenerate") > -1) return true;
    if (urlText.indexOf("batchexecute") > -1) return false;
    var hay = (urlText + "\\n" + (typeof body === "string" ? body : "")).toLowerCase();
    return hay.indexOf("bardfrontendservice") > -1 || hay.indexOf("assistant.lamda") > -1;
  }
  function isSessionPromptSend(method, url, body) {
    return (
      String(method || "").toUpperCase() === "POST" &&
      String(url || "").indexOf("/v1/processSession") > -1 &&
      typeof body === "string" &&
      body.length >= 1000
    );
  }
  function rpcOf(url) {
    try {
      var u = new URL(url, location.href);
      return u.searchParams.get("rpcids") || null;
    } catch (e) {
      return null;
    }
  }
  function parseReqTuple(body) {
    try {
      if (typeof body === "string") {
        var m = body.match(/f\\.req=([^&]*)/);
        if (m) {
          var arr = JSON.parse(decodeURIComponent(m[1]));
          return arr && arr[0] && arr[0][0] ? arr[0][0] : null;
        }
      }
    } catch (e) {}
    return null;
  }
  function post(type, payload) {
    try {
      window.postMessage({ source: SRC, type: type, payload: payload }, location.origin);
    } catch (e) {}
  }
  function capture(url, reqBody, respText, source) {
    if (location.pathname !== source.sourcePath) return;
    if (!onUsagePath()) return;
    if (String(url).indexOf("batchexecute") < 0) return;
    var tuple = parseReqTuple(reqBody);
    var args = tuple ? tuple[1] : null;
    if (args != null && typeof args !== "string") {
      try { args = JSON.stringify(args); } catch (e) { args = "[]"; }
    }
    post("capture", {
      rpcid: rpcOf(url),
      args: args,
      body: typeof respText === "string" ? respText : "",
      accountKey: source.accountKey,
      sourcePath: source.sourcePath,
      sourceStartedAt: source.sourceStartedAt,
    });
  }
  function notifyGenComplete() {
    post("generation-complete", {});
  }

  if (origFetch) {
    window.fetch = function (input, init) {
      var url = typeof input === "string" ? input : (input && input.url) || "";
      var body = init && init.body;
      var source = url.indexOf("batchexecute") > -1 && onUsagePath() ? usageSource() : null;
      var p = origFetch.apply(this, arguments);
      if (source) {
        p.then(
          function (r) {
            try {
              if (r && typeof r.clone === "function") {
                r.clone().text().then(function (t) { capture(url, body, t, source); }, function () {});
              }
            } catch (e) {}
            return r;
          },
          function () {},
        );
      } else if (isGenRequest(url, body)) {
        p.then(
          function (r) {
            try {
              if (r && typeof r.clone === "function") {
                r.clone().arrayBuffer().then(notifyGenComplete, notifyGenComplete);
              } else notifyGenComplete();
            } catch (e) {
              notifyGenComplete();
            }
            return r;
          },
          function () {},
        );
      }
      return p;
    };
  }

  if (typeof window.XMLHttpRequest === "function") {
    var OrigXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function () {
      var xhr = new OrigXHR();
      var reqMethod = "";
      var reqUrl = "";
      var reqBody = null;
      var origOpen = xhr.open;
      xhr.open = function (method, url) {
        reqMethod = method;
        reqUrl = url;
        return origOpen.apply(xhr, arguments);
      };
      var origSend = xhr.send;
      xhr.send = function (body) {
        reqBody = body;
        if (typeof reqUrl === "string" && reqUrl.indexOf("batchexecute") > -1 && onUsagePath()) {
          var source = usageSource();
          xhr.addEventListener(
            "load",
            function () {
              try {
                capture(reqUrl, reqBody, xhr.responseText, source);
              } catch (e) {}
            },
            { once: true },
          );
        } else if (isGenRequest(reqUrl, body)) {
          xhr.addEventListener("loadend", notifyGenComplete, { once: true });
        } else if (isSessionPromptSend(reqMethod, reqUrl, body)) {
          notifyGenComplete();
        }
        return origSend.apply(xhr, arguments);
      };
      return xhr;
    };
    Object.setPrototypeOf(window.XMLHttpRequest, OrigXHR);
    window.XMLHttpRequest.prototype = OrigXHR.prototype;
  }

  window.addEventListener("message", function (ev) {
    if (ev.source !== window) return;
    var d = ev.data;
    if (!d || d.source !== CMD) return;
    if (d.type === "ping") {
      post("ready", {});
      return;
    }
    if (d.type !== "replay" || !d.payload) return;
    var id = d.payload.id;
    try {
      var wiz = window.WIZ_global_data || {};
      var at = wiz.SNlM0e,
        bl = wiz.cfb2h,
        fsid = wiz.FdrFJe;
      if (!at || !origFetch) {
        post("replay-result", { id: id, error: "no-token" });
        return;
      }
      var rpcid = d.payload.rpcid;
      var args = d.payload.args;
      var requestedSourcePath =
        typeof d.payload.sourcePath === "string" && d.payload.sourcePath
          ? d.payload.sourcePath
          : location.pathname || "/usage";
      var freq = JSON.stringify([[[rpcid, args, null, "generic"]]]);
      var reqBody = "f.req=" + encodeURIComponent(freq) + "&at=" + encodeURIComponent(at) + "&";
      var reqid = 100000 + (Math.floor(performance.now()) % 800000);
      var match = requestedSourcePath.match(/^\\/u\\/\\d+(?=\\/|$)/);
      var accountPrefix = match ? match[0] : "";
      var sourcePath = accountPrefix + "/usage";
      var account = accountPrefix.match(/^\\/u\\/(\\d+)/);
      var accountKey = account ? "u/" + account[1] : "default";
      var url =
        location.origin +
        accountPrefix +
        "/_/BardChatUi/data/batchexecute?rpcids=" +
        encodeURIComponent(rpcid) +
        "&source-path=" +
        encodeURIComponent(sourcePath) +
        "&bl=" +
        encodeURIComponent(bl || "") +
        "&f.sid=" +
        encodeURIComponent(fsid || "") +
        "&hl=en&_reqid=" +
        reqid +
        "&rt=c";
      origFetch
        .call(window, url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: reqBody,
          credentials: "include",
        })
        .then(function (r) {
          return r.text();
        })
        .then(function (t) {
          post("replay-result", { id: id, body: t, accountKey: accountKey });
        })
        .catch(function (e) {
          post("replay-result", { id: id, error: String(e), accountKey: accountKey });
        });
    } catch (e) {
      post("replay-result", { id: id, error: String(e) });
    }
  });

  post("ready", {});
})();`;
  }
  function injectPageObserver() {
    const code = pageObserverSource();
    const parent = document.documentElement || document.head || document.body;
    if (!parent) return false;
    try {
      const s3 = document.createElement("script");
      s3.textContent = code;
      parent.appendChild(s3);
      s3.remove();
      return true;
    } catch {
    }
    try {
      const url = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
      const s3 = document.createElement("script");
      s3.src = url;
      s3.onload = () => {
        try {
          URL.revokeObjectURL(url);
        } catch {
        }
      };
      parent.appendChild(s3);
      return true;
    } catch (e3) {
      console.warn("[GG++] failed to inject usage observer into page", e3);
      return false;
    }
  }
  function onUsagePath(pathname = location.pathname) {
    return /^\/(?:u\/\d+\/)?usage(?:\/|$)/.test(pathname);
  }
  function makeUsageSource() {
    const sourcePath = location.pathname;
    return {
      accountKey: accountKeyFromPath(sourcePath),
      sourcePath,
      sourceStartedAt: Date.now()
    };
  }
  function isGenRequest(url, body) {
    const urlText = String(url || "").toLowerCase();
    if (urlText.indexOf("streamgenerate") > -1) return true;
    if (urlText.indexOf("batchexecute") > -1) return false;
    const hay = (urlText + "\n" + (typeof body === "string" ? body : "")).toLowerCase();
    return hay.indexOf("bardfrontendservice") > -1 || hay.indexOf("assistant.lamda") > -1;
  }
  function isSessionPromptSend(method, url, body) {
    return String(method || "").toUpperCase() === "POST" && String(url || "").indexOf("/v1/processSession") > -1 && typeof body === "string" && body.length >= 1e3;
  }
  function rpcOf(url) {
    try {
      return new URL(url, location.href).searchParams.get("rpcids");
    } catch {
      return null;
    }
  }
  function parseReqTuple(body) {
    try {
      if (typeof body === "string") {
        const m3 = body.match(/f\.req=([^&]*)/);
        if (m3) {
          const arr = JSON.parse(decodeURIComponent(m3[1]));
          return arr && arr[0] && arr[0][0] ? arr[0][0] : null;
        }
      }
    } catch {
    }
    return null;
  }
  function handleCapture(payload) {
    if (!payload || typeof payload.body !== "string") return;
    if (payload.accountKey !== accountKeyFromPath()) return;
    if (payload.sourcePath !== location.pathname) return;
    if (typeof payload.sourceStartedAt === "number" && bridgeStartedAt && payload.sourceStartedAt < bridgeStartedAt) return;
    const metrics = parseUsageBatchexecute(payload.body || "");
    let recipe = null;
    if (metrics && (metrics.daily || metrics.weekly)) {
      const rpcid = typeof payload.rpcid === "string" && payload.rpcid || metrics.rpcid || DEFAULT_USAGE_RECIPE.rpcid;
      const args = normalizeRecipeArgs(payload.args);
      recipe = { rpcid, args };
      saveRecipe(recipe, payload.accountKey);
    }
    emit2({ kind: "capture", metrics, recipe, raw: payload.body, accountKey: payload.accountKey });
    {
      const aid = noteUsageDiagAttempt(typeof payload.rpcid === "string" && payload.rpcid || metrics?.rpcid || null);
      if (metrics && (metrics.daily || metrics.weekly)) {
        noteUsageDiagResult({
          attemptId: aid,
          ok: true,
          source: "capture",
          rpcid: recipe?.rpcid ?? metrics.rpcid ?? null,
          dailyParsed: !!metrics.daily,
          weeklyParsed: !!metrics.weekly
        });
      } else {
        noteUsageDiagResult({
          attemptId: aid,
          ok: false,
          source: "capture",
          error: "parse-miss",
          dailyParsed: false,
          weeklyParsed: false
        });
      }
    }
  }
  function toPageFn2(page2, fn2, required = false) {
    if (typeof exportFunction === "function") {
      try {
        return exportFunction(fn2, page2);
      } catch (e3) {
        if (required) throw e3;
      }
    } else if (required) {
      throw new Error("exportFunction unavailable");
    }
    return fn2;
  }
  function installDirectPageHooks(page2, opts) {
    if (page2.__ggppUsageObserverInstalled) return false;
    const needExport = !!opts?.requireExport;
    if (needExport && typeof exportFunction !== "function") return false;
    try {
      Object.defineProperty(page2, "__ggppUsageObserverInstalled", { value: true, configurable: true });
    } catch {
      try {
        page2.__ggppUsageObserverInstalled = true;
      } catch {
        return false;
      }
    }
    const origFetch = typeof page2.fetch === "function" ? page2.fetch.bind(page2) : null;
    pageOrigFetch = origFetch;
    pageWindowRef = page2;
    const captureFromHook = (url, reqBody, respText, source) => {
      if (location.pathname !== source.sourcePath) return;
      if (!onUsagePath()) return;
      if (String(url).indexOf("batchexecute") < 0) return;
      const tuple = parseReqTuple(reqBody);
      handleCapture({
        rpcid: rpcOf(url),
        args: tuple ? normalizeRecipeArgs(tuple[1]) : null,
        body: typeof respText === "string" ? respText : "",
        accountKey: source.accountKey,
        sourcePath: source.sourcePath,
        sourceStartedAt: source.sourceStartedAt
      });
    };
    if (origFetch) {
      const hookedFetch = function(input, init) {
        const url = typeof input === "string" ? input : input && input.url || "";
        const body = init && init.body;
        const source = url.indexOf("batchexecute") > -1 && onUsagePath() ? makeUsageSource() : null;
        const p3 = origFetch.apply(page2, arguments);
        if (source) {
          p3.then(
            (r3) => {
              try {
                if (r3 && typeof r3.clone === "function") {
                  r3.clone().text().then((t3) => captureFromHook(url, body, t3, source), () => {
                  });
                }
              } catch {
              }
              return r3;
            },
            () => {
            }
          );
        } else if (isGenRequest(url, body)) {
          p3.then(
            (r3) => {
              try {
                if (r3 && typeof r3.clone === "function") {
                  r3.clone().arrayBuffer().then(
                    () => emit2({ kind: "generation-complete", metrics: null }),
                    () => emit2({ kind: "generation-complete", metrics: null })
                  );
                } else emit2({ kind: "generation-complete", metrics: null });
              } catch {
                emit2({ kind: "generation-complete", metrics: null });
              }
              return r3;
            },
            () => {
            }
          );
        }
        return p3;
      };
      page2.fetch = toPageFn2(page2, hookedFetch, needExport);
    }
    if (typeof page2.XMLHttpRequest === "function") {
      const OrigXHR = page2.XMLHttpRequest;
      const HookedXHR = function() {
        const xhr = new OrigXHR();
        let reqMethod = "";
        let reqUrl = "";
        let reqBody = null;
        const origOpen = xhr.open;
        xhr.open = function(method, url) {
          reqMethod = method;
          reqUrl = url;
          return origOpen.apply(xhr, arguments);
        };
        const origSend = xhr.send;
        xhr.send = function(body) {
          reqBody = body;
          if (typeof reqUrl === "string" && reqUrl.indexOf("batchexecute") > -1 && onUsagePath()) {
            const source = makeUsageSource();
            xhr.addEventListener(
              "load",
              () => {
                try {
                  captureFromHook(reqUrl, reqBody, xhr.responseText, source);
                } catch {
                }
              },
              { once: true }
            );
          } else if (isGenRequest(reqUrl, body)) {
            xhr.addEventListener("loadend", () => emit2({ kind: "generation-complete", metrics: null }), { once: true });
          } else if (isSessionPromptSend(reqMethod, reqUrl, body)) {
            emit2({ kind: "generation-complete", metrics: null });
          }
          return origSend.apply(xhr, arguments);
        };
        return xhr;
      };
      page2.XMLHttpRequest = toPageFn2(page2, HookedXHR, needExport);
      try {
        Object.setPrototypeOf(page2.XMLHttpRequest, OrigXHR);
        page2.XMLHttpRequest.prototype = OrigXHR.prototype;
      } catch {
      }
    }
    return true;
  }
  async function replayViaPageWindow(recipe, accountKey) {
    if (accountKey && accountKeyFromPath() !== accountKey) return { error: "account-mismatch" };
    const page2 = pageWindowRef || getPageWindow();
    const orig = pageOrigFetch || (typeof page2.fetch === "function" ? page2.fetch.bind(page2) : null);
    const wiz = page2.WIZ_global_data || {};
    const at = wiz.SNlM0e;
    const bl = wiz.cfb2h;
    const fsid = wiz.FdrFJe;
    if (!at || !orig) return { error: "no-token" };
    const rpcid = recipe.rpcid;
    const args = normalizeRecipeArgs(recipe.args);
    const requestedSourcePath = location.pathname || "/usage";
    const freq = JSON.stringify([[[rpcid, args, null, "generic"]]]);
    const reqBody = "f.req=" + encodeURIComponent(freq) + "&at=" + encodeURIComponent(at) + "&";
    const reqid = 1e5 + Math.floor(performance.now()) % 8e5;
    const match = requestedSourcePath.match(/^\/u\/\d+(?=\/|$)/);
    const accountPrefix = match ? match[0] : "";
    const sourcePath = accountPrefix + "/usage";
    const url = location.origin + accountPrefix + "/_/BardChatUi/data/batchexecute?rpcids=" + encodeURIComponent(rpcid) + "&source-path=" + encodeURIComponent(sourcePath) + "&bl=" + encodeURIComponent(bl || "") + "&f.sid=" + encodeURIComponent(fsid || "") + "&hl=en&_reqid=" + reqid + "&rt=c";
    try {
      const r3 = await orig.call(page2, url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: reqBody,
        credentials: "include"
      });
      const t3 = await r3.text();
      return { body: t3 };
    } catch (e3) {
      return { error: String(e3) };
    }
  }
  function installUsageObserver() {
    const w4 = window;
    if (w4.__ggppUsageBridge) return;
    w4.__ggppUsageBridge = true;
    bridgeStartedAt = Date.now();
    pageObserverReady = false;
    bridgeMode = "none";
    const { page: page2, viaUnsafe } = resolveUsageHookWindow();
    const sameWorld = !viaUnsafe || page2 === window;
    window.addEventListener("message", (ev) => {
      if (ev.source !== window && ev.source !== pageWindowRef && ev.source !== page2) return;
      const d3 = ev.data;
      if (!d3 || d3.source !== PAGE_SRC) return;
      if (d3.type === "ready") {
        pageObserverReady = true;
        if (bridgeMode === "none") bridgeMode = "inject";
        syncBridgeIntoDiag();
        syncBridgeIntoDiag();
        return;
      }
      if (d3.type === "capture" && d3.payload) handleCapture(d3.payload);
      else if (d3.type === "generation-complete") emit2({ kind: "generation-complete", metrics: null });
      else if (d3.type === "replay-result" && d3.payload) {
        const r3 = d3.payload;
        const p3 = pendingReplay.get(r3.id);
        if (!p3) return;
        if (p3.generation !== sessionGeneration) {
          clearTimeout(p3.timer);
          pendingReplay.delete(r3.id);
          p3.resolve({ ...r3, error: "stale-generation" });
          return;
        }
        if (r3.accountKey && r3.accountKey !== p3.accountKey) return;
        if (p3.accountKey !== accountKeyFromPath()) {
          clearTimeout(p3.timer);
          pendingReplay.delete(r3.id);
          p3.resolve({ ...r3, error: r3.error || "account-mismatch" });
          return;
        }
        clearTimeout(p3.timer);
        pendingReplay.delete(r3.id);
        p3.resolve(r3);
      }
    });
    if (sameWorld) {
      try {
        if (installDirectPageHooks(page2)) {
          bridgeMode = "same-world";
          pageObserverReady = true;
          syncBridgeIntoDiag();
        }
      } catch (e3) {
        console.warn("[GG++] same-world usage hooks failed", e3);
      }
    }
    if (bridgeMode === "none") {
      pageOrigFetch = null;
      pageWindowRef = null;
      if (injectPageObserver()) {
        bridgeMode = "inject";
      }
    }
    if (bridgeMode === "none" && viaUnsafe && typeof exportFunction === "function") {
      try {
        if (installDirectPageHooks(page2, { requireExport: true })) {
          bridgeMode = "exportFunction";
          pageObserverReady = true;
          syncBridgeIntoDiag();
        }
      } catch (e3) {
        console.warn("[GG++] exportFunction usage hooks failed", e3);
        pageOrigFetch = null;
        pageWindowRef = null;
      }
    }
    try {
      window.postMessage({ source: PAGE_CMD, type: "ping" }, location.origin);
    } catch {
    }
  }
  function onUsageEvent(fn2) {
    listeners2.add(fn2);
    return () => listeners2.delete(fn2);
  }
  function replayUsage(recipe, timeoutMs = 12e3) {
    const accountKey = accountKeyFromPath();
    const r3 = recipe || loadRecipe(accountKey);
    const id = ++replaySeq;
    const generation = sessionGeneration;
    const expectRpcid = r3.rpcid;
    const attemptId = noteUsageDiagAttempt(expectRpcid);
    let settled2 = false;
    const finish = (res) => {
      if (settled2) {
        return { error: res.error || "late", metrics: null, body: res.body };
      }
      settled2 = true;
      if (generation !== sessionGeneration) {
        noteUsageDiagResult({ attemptId, ok: false, source: "rpc", rpcid: expectRpcid, error: "stale-generation" });
        return { error: "stale-generation", metrics: null };
      }
      if (accountKeyFromPath() !== accountKey) {
        noteUsageDiagResult({ attemptId, ok: false, source: "rpc", rpcid: expectRpcid, error: "account-mismatch" });
        return { error: "account-mismatch", metrics: null };
      }
      if (res.error || !res.body) {
        const code = mapUsageErrorCode(res.error || "empty");
        noteUsageDiagResult({ attemptId, ok: false, source: "rpc", rpcid: expectRpcid, error: code });
        return { error: res.error || "empty", metrics: null, body: res.body };
      }
      const metrics = parseUsageBatchexecute(res.body, { expectRpcid });
      if (metrics && (metrics.daily || metrics.weekly)) saveRecipe(r3, accountKey);
      const ok = !!(metrics && (metrics.daily || metrics.weekly));
      noteUsageDiagResult({
        attemptId,
        ok,
        source: "rpc",
        rpcid: expectRpcid,
        dailyParsed: !!metrics?.daily,
        weeklyParsed: !!metrics?.weekly,
        error: ok ? "ok" : "parse-miss"
      });
      emit2({
        kind: "replay",
        metrics,
        recipe: r3,
        raw: res.body,
        error: metrics ? void 0 : "parse-miss",
        accountKey
      });
      return { body: res.body, metrics, error: metrics ? void 0 : "parse-miss" };
    };
    if (pageOrigFetch && pageWindowRef && (bridgeMode === "same-world" || bridgeMode === "exportFunction")) {
      return new Promise((resolve) => {
        const timer2 = setTimeout(() => {
          resolve(finish({ error: "timeout" }));
        }, timeoutMs);
        void replayViaPageWindow(r3, accountKey).then((res) => {
          clearTimeout(timer2);
          resolve(finish(res));
        });
      });
    }
    return new Promise((resolve) => {
      const timer2 = setTimeout(() => {
        pendingReplay.delete(id);
        resolve(finish({ error: "timeout" }));
      }, timeoutMs);
      pendingReplay.set(id, {
        timer: timer2,
        accountKey,
        generation,
        resolve: (res) => {
          clearTimeout(timer2);
          resolve(finish(res));
        }
      });
      try {
        window.postMessage(
          {
            source: PAGE_CMD,
            type: "replay",
            payload: {
              id,
              rpcid: r3.rpcid,
              args: normalizeRecipeArgs(r3.args),
              sourcePath: location.pathname
            }
          },
          location.origin
        );
      } catch {
        clearTimeout(timer2);
        pendingReplay.delete(id);
        resolve(finish({ error: "unknown" }));
      }
    });
  }

  // sites/gemini/settingsHost.ts
  function createSettingsHost(getUi) {
    let nextRequestId = 0;
    let latestRequest;
    const failed2 = () => ({ protocol: "ggpp-settings-request@1", accepted: false, status: () => "failed" });
    return {
      // Undefined means unsupported, NOT an accepted request or a visibility claim.
      ggppOpenRequest(opts = {}) {
        const token = { id: ++nextRequestId, superseded: false };
        try {
          const ui = getUi();
          if (typeof ui?.openRequest !== "function") return void 0;
          if (typeof ui.isOpen !== "function") return failed2();
          const request2 = ui.openRequest(opts.tab, opts.plugin);
          if (request2?.protocol !== "ggpp-settings-request@1" || request2.accepted !== true || typeof request2.status !== "function") return failed2();
          if (!latestRequest || latestRequest.id < token.id) {
            if (latestRequest) latestRequest.superseded = true;
            latestRequest = token;
          } else token.superseded = true;
          return {
            protocol: "ggpp-settings-request@1",
            accepted: true,
            status: () => token.superseded ? "superseded" : request2.status()
          };
        } catch {
          return failed2();
        }
      },
      open(opts = {}) {
        try {
          const ui = getUi();
          if (typeof ui?.open !== "function" || typeof ui.isOpen !== "function") return false;
          ui.open(opts.tab, opts.plugin);
          return true;
        } catch {
          return false;
        }
      },
      isOpen() {
        try {
          return getUi()?.isOpen() === true;
        } catch {
          return false;
        }
      }
    };
  }

  // sites/gemini/index.ts
  var gemini_default = (U3) => {
    bindApi(U3);
    return U3.defineSite({
      id: "gemini",
      name: "Gemini",
      matches: ["*://gemini.google.com/*"],
      ready: {
        element: ":is(bard-sidenav-content, main.chat-app, [role='main'], chat-window, side-navigation-content)",
        timeout: 2e4
      },
      styleHost: "adopted",
      legacySettings: true,
      theme: () => {
        try {
          if (document.documentElement.getAttribute("data-color-scheme") === "dark") return "dark";
          if (document.body?.classList.contains("dark-theme")) return "dark";
          if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
        } catch {
        }
        return "light";
      },
      slots: [
        { name: "chatBar", kind: "button", context: "composer trailing actions" },
        { name: "conversationMenu", kind: "menu", context: "{ conversationId }" },
        { name: "messageMenu", kind: "menu", context: "{ response }" },
        { name: "settingsMenu", kind: "menu", context: "{}" }
      ],
      // Route USPP openSettings / menu / floating into GG++ settings modal (not the framework panel).
      // open() looks up settingsUI at call time — the settings plugin provides it after start.
      settingsHost: createSettingsHost(() => getKernelFacade()?.service("settingsUI")),
      start() {
        migrateGgSettings();
        installNetHook();
        installUsageObserver();
        const kernel = getKernelFacade();
        window.addEventListener("ggpp:net", (e3) => {
          try {
            const d3 = JSON.parse(String(e3.detail));
            if (d3.phase === "start" || d3.phase === "end") {
              kernel?.emit(`net:stream-${d3.phase}`, {
                conversationId: d3.conversationId ?? null,
                requestId: String(d3.requestId),
                error: !!d3.error
              });
            } else if (d3.phase === "chunk") {
              kernel?.emit("net:chunk", {
                ids: Array.isArray(d3.ids) ? d3.ids.map(String) : [],
                bytes: Number(d3.bytes) || 0,
                url: String(d3.url ?? "")
              });
            } else if (d3.phase === "log") {
              kernel?.emit("net:log", Array.isArray(d3.entries) ? d3.entries.map(String) : []);
            }
          } catch {
          }
        });
        window.addEventListener(
          "keydown",
          (e3) => {
            kernel?.emit("key:early", e3);
          },
          { capture: true }
        );
        try {
          const g5 = globalThis.GGPP;
          if (g5 && typeof g5 === "object") {
            Object.defineProperty(g5, "kernel", { value: kernel, configurable: true });
          }
        } catch {
        }
      }
    });
  };

  // sites/gemini/shims/types.ts
  var TAGS = [
    "Composer",
    "Messages",
    "Chats",
    "Media",
    "Navigation",
    "Notifications",
    "Appearance",
    "Declutter",
    "Privacy",
    "Developer"
  ];
  function convertSettings(U3, schema) {
    if (!schema || !Object.keys(schema).length) return void 0;
    const def = {};
    for (const [key, s3] of Object.entries(schema)) {
      const base = {
        description: s3.description || s3.label || key,
        default: s3.default
      };
      if (s3.restartNeeded) base.restartNeeded = true;
      if (s3.showIf) {
        base.disabled = (cfg2) => !s3.showIf(cfg2);
      }
      switch (s3.type) {
        case "boolean":
          base.type = U3.OptionType.BOOLEAN;
          break;
        case "number":
          base.type = s3.slider ? U3.OptionType.SLIDER : U3.OptionType.NUMBER;
          if (s3.min != null) base.min = s3.min;
          if (s3.max != null) base.max = s3.max;
          if (s3.step != null) base.step = s3.step;
          if (s3.unit) base.units = s3.unit;
          break;
        case "select":
          base.type = U3.OptionType.SELECT;
          base.options = (s3.options || []).map((o3) => ({
            label: o3.label,
            value: o3.value,
            default: o3.value === s3.default
          }));
          break;
        case "list":
          base.type = U3.OptionType.STRING;
          base.multiline = true;
          base.ggList = true;
          if (s3.placeholder) base.placeholder = s3.placeholder;
          base.default = Array.isArray(s3.default) ? s3.default.join("\n") : s3.default;
          break;
        case "string":
        default:
          base.type = U3.OptionType.STRING;
          if (s3.placeholder) base.placeholder = s3.placeholder;
          if (s3.multiline) base.multiline = true;
          break;
      }
      def[key] = base;
    }
    return U3.definePluginSettings(def);
  }
  function updatedAt(updated) {
    if (!updated) return void 0;
    const t3 = Date.parse(updated.length === 10 ? `${updated}T00:00:00Z` : updated);
    return Number.isFinite(t3) ? t3 : void 0;
  }
  function definePlugin(def) {
    return (U3) => {
      bindApi(U3);
      registerGgSchema(def);
      const settings2 = convertSettings(U3, def.settings);
      const startAt = def.required || def.id === "gemini" || def.id === "ui" || def.id === "menus" || def.id === "chatBar" || def.id === "settings" ? U3.StartAt.Init : U3.StartAt.SiteReady;
      return U3.definePlugin({
        name: def.id,
        description: def.description,
        authors: def.authors?.length ? def.authors : ["GG++"],
        tags: def.tags?.length ? def.tags : void 0,
        enabledByDefault: def.enabledByDefault ?? false,
        required: def.required,
        hidden: def.hidden,
        requiresRestart: def.requiresRestart,
        dependencies: def.dependencies,
        startAt,
        settings: settings2,
        updatedAt: updatedAt(def.updated),
        ggDisplayName: def.name,
        ggIcon: def.icon,
        ggLiveSettings: !!def.liveSettings,
        ggTags: def.tags ?? [],
        onSettingsChange: def.liveSettings ? () => {
          getKernelFacade()?.emit(`settings:${def.id}`, getKernelFacade().values(def.id));
          getKernelFacade()?.emit("kernel:changed", def.id);
        } : void 0,
        start(usppCtx) {
          const ctx = createGgContext(U3, usppCtx, def, settings2);
          return def.start(ctx);
        },
        stop(usppCtx) {
          const ctx = createGgContext(U3, usppCtx, def, settings2);
          def.stop?.(ctx);
        }
      });
    };
  }

  // src/lib/dom.ts
  var OWN = "data-ggpp-own";
  function append(el, child) {
    if (child === null || child === void 0 || child === false) return;
    if (Array.isArray(child)) child.forEach((c3) => append(el, c3));
    else el.append(child instanceof Node ? child : String(child));
  }
  function applyProps(el, props) {
    for (const [key, value] of Object.entries(props)) {
      if (value === void 0 || value === null || value === false) continue;
      if (key === "class") el.setAttribute("class", value);
      else if (key === "style") {
        for (const [k4, v3] of Object.entries(value)) {
          if (k4.startsWith("--")) el.style.setProperty(k4, v3);
          else el.style[k4] = v3;
        }
      } else if (key === "dataset") Object.assign(el.dataset, value);
      else if (key.startsWith("on") && typeof value === "function") {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key in el && !(el instanceof SVGElement)) el[key] = value;
      else el.setAttribute(key, value === true ? "" : String(value));
    }
  }
  function h4(tag, props, ...children) {
    const el = document.createElement(tag);
    el.setAttribute(OWN, "");
    if (props) applyProps(el, props);
    children.forEach((c3) => append(el, c3));
    return el;
  }
  var SVG_NS = "http://www.w3.org/2000/svg";
  function svg(tag, props, ...children) {
    const el = document.createElementNS(SVG_NS, tag);
    if (props) applyProps(el, props);
    children.forEach((c3) => append(el, c3));
    return el;
  }
  function icon(paths, size = 18, extra) {
    return svg(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "aria-hidden": "true",
        class: "ggpp-icon",
        ...extra
      },
      paths.map((d3) => svg("path", { d: d3 }))
    );
  }
  function debounce(fn2, ms) {
    let t3;
    const wrapped2 = (...a3) => {
      clearTimeout(t3);
      t3 = setTimeout(() => fn2(...a3), ms);
    };
    wrapped2.cancel = () => clearTimeout(t3);
    return wrapped2;
  }
  function isVisible(el) {
    if (!el || !el.isConnected) return false;
    const r3 = el.getBoundingClientRect();
    return r3.width > 0 && r3.height > 0;
  }
  function isEditable(target2) {
    const el = target2;
    if (!el) return false;
    return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
  }
  function download(filename, content, type = "text/plain") {
    const blob = content instanceof Blob ? content : new Blob([content], { type: `${type};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a3 = h4("a", { href: url, download: filename, style: { display: "none" } });
    document.body.append(a3);
    a3.click();
    a3.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  function uid(prefix = "id") {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }
  function nextFrame(fn2) {
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      fn2();
    };
    requestAnimationFrame(run);
    setTimeout(run, 100);
  }

  // src/lib/icons.ts
  var I3 = {
    x: ["M18 6 6 18", "M6 6l12 12"],
    check: ["M20 6 9 17l-5-5"],
    plus: ["M12 5v14", "M5 12h14"],
    settings: [
      "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
    ],
    search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.3-4.3"],
    star: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"],
    pin: ["M12 17v5", "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"],
    puzzle: ["M15.39 4.39a1 1 0 0 0 1.68-.47 2.5 2.5 0 1 1 3.01 3.01 1 1 0 0 0-.47 1.68l1.57 1.57a2.41 2.41 0 0 1 0 3.41l-1.57 1.57a1 1 0 0 1-1.68-.47 2.5 2.5 0 1 0-3.01 3.01 1 1 0 0 1 .47 1.68l-1.57 1.57a2.41 2.41 0 0 1-3.41 0l-1.57-1.57a1 1 0 0 0-1.68.47 2.5 2.5 0 1 1-3.01-3.01 1 1 0 0 0 .47-1.68l-1.57-1.57a2.41 2.41 0 0 1 0-3.41l1.57-1.57a1 1 0 0 1 1.68.47 2.5 2.5 0 1 0 3.01-3.01 1 1 0 0 1-.47-1.68l1.57-1.57a2.41 2.41 0 0 1 3.41 0z"],
    palette: ["M12 22a10 10 0 1 1 10-10c0 2.5-2 3-3.5 3H16a2 2 0 0 0-1.5 3.3A2 2 0 0 1 12 22z", "M7.5 10.5h.01", "M10.5 7.5h.01", "M15.5 7.5h.01", "M17.5 11.5h.01"],
    code: ["M16 18l6-6-6-6", "M8 6l-6 6 6 6"],
    info: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 16v-4", "M12 8h.01"],
    history: ["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5", "M12 7v5l4 2"],
    download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
    upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"],
    reset: ["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5"],
    trash: ["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],
    copy: ["M8 8h12v12H8z", "M4 16V4h12"],
    edit: ["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"],
    bell: ["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"],
    list: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    sidebar: ["M3 3h18v18H3z", "M9 3v18"],
    eyeOff: ["M9.88 9.88a3 3 0 1 0 4.24 4.24", "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68", "M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61", "M2 2l20 20"],
    brush: ["M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08", "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"],
    width: ["M21 12H3", "M7 8l-4 4 4 4", "M17 8l4 4-4 4"],
    blend: ["M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M15 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"],
    message: ["M7.9 20A9 9 0 1 0 4 16.1L2 22z"],
    quote: ["M3 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .01-1 1.03V20c0 1 0 1 1 1z", "M15 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"],
    link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
    chevronDown: ["M6 9l6 6 6-6"],
    chevronRight: ["M9 18l6-6-6-6"],
    fold: ["M7 20l5-5 5 5", "M7 4l5 5 5-5"],
    scroll: ["M15 12h-5", "M15 8h-5", "M19 17V5a2 2 0 0 0-2-2H4", "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"],
    clock: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 6v6l4 2"],
    favicon: ["M3 4h18v14H3z", "M3 8h18", "M8 21h8"],
    grid: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"],
    micOff: ["M2 2l20 20", "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", "M5 10v2a7 7 0 0 0 12 5", "M15 9.34V5a3 3 0 0 0-5.68-1.33", "M9 9v3a3 3 0 0 0 5.12 2.12", "M12 19v3"],
    share: ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "M16 6l-4-4-4 4", "M12 2v13"],
    user: ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
    userX: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M17 8l5 5", "M22 8l-5 5"],
    sparkles: ["M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"],
    sun: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M12 2v2", "M12 20v2", "M4.93 4.93l1.41 1.41", "M17.66 17.66l1.41 1.41", "M2 12h2", "M20 12h2"],
    cat: ["M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5z", "M8 14v.5", "M16 14v.5", "M11.25 16.25h1.5L12 17z"],
    bug: ["M8 2l1.88 1.88", "M14.12 3.88L16 2", "M9 7.13v-1a3 3 0 1 1 6 0v1", "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6", "M12 20v-9", "M6.53 9C4.6 8.8 3 7.1 3 5", "M6 13H2", "M3 21c0-2.1 1.7-3.9 3.8-4", "M20.97 5c0 2.1-1.6 3.8-3.5 4", "M22 13h-4", "M17.2 17c2.1.1 3.8 1.9 3.8 4"],
    keyboard: ["M2 6h20v12H2z", "M6 10h.01", "M10 10h.01", "M14 10h.01", "M18 10h.01", "M8 14h8"],
    external: ["M15 3h6v6", "M10 14L21 3", "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"],
    retry: ["M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5", "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", "M16 16h5v5"],
    layers: ["M12 2l10 5-10 5L2 7z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
    brain: ["M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18z", "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18z", "M12 5v13"],
    ban: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M4.9 4.9l14.2 14.2"],
    incognito: ["M2 12h20", "M5 12l2-7h10l2 7", "M7 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M17 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M10 16h4"],
    ggpp: ["M4 7h6", "M7 4v6", "M14 7h6", "M17 4v6", "M12 13a5 5 0 1 0 5 5h-5"]
  };

  // sites/gemini/plugins/accountSwitcher/index.ts
  var slotOf = () => Number(location.pathname.match(/^\/u\/(\d+)/)?.[1] ?? 0);
  var accountSwitcher_default = definePlugin({
    id: "accountSwitcher",
    name: "AccountSwitcher",
    description: "Switch between your signed-in Google accounts from Gemini's settings menu.",
    tags: ["Navigation"],
    icon: I3.user,
    updated: "2026-10-14",
    dependencies: ["gemini", "menus", "ui"],
    async start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      let accounts = await ctx.data.get("accounts", []);
      const learn = () => {
        const link = gemini.q(`${gemini.SEL.accountFooter} a[aria-label^='Google Account']`);
        const label = link?.dataset.ggppLabel ?? link?.getAttribute("aria-label") ?? "";
        const m3 = label.match(/^Google Account:\s*(.*?)\s*\(([^)]+@[^)]+)\)/);
        if (!m3) return;
        const slot = slotOf();
        const avatar = link?.querySelector("img")?.src ?? "";
        const next = { slot, name: m3[1], email: m3[2], avatar, seen: Date.now() };
        const prev = accounts.find((a3) => a3.slot === slot);
        if (prev && prev.email === next.email && prev.avatar === next.avatar) return;
        accounts = [...accounts.filter((a3) => a3.slot !== slot && a3.email !== next.email), next].sort((a3, b3) => a3.slot - b3.slot);
        void ctx.data.set("accounts", accounts);
      };
      ctx.cleanup(gemini.watch(gemini.SEL.accountFooter, () => void setTimeout(learn, 500)));
      const go = (slot) => {
        const rest = location.pathname.replace(/^\/u\/\d+/, "").replace(/^\/app\/.*/, "/app");
        location.assign(`/u/${slot}${rest || "/app"}`);
      };
      function open() {
        learn();
        const current3 = slotOf();
        const maxSlot = Math.max(3, ...accounts.map((a3) => a3.slot + 1));
        const rows = Array.from({ length: maxSlot + 1 }, (_3, slot) => {
          const a3 = accounts.find((x4) => x4.slot === slot);
          return h4(
            "button",
            { class: "ggpp-menu-item", type: "button", style: { height: "52px" }, onclick: () => (m3.close(), slot !== current3 && go(slot)) },
            a3?.avatar ? h4("img", { src: a3.avatar, alt: "", style: { width: "28px", height: "28px", borderRadius: "50%" } }) : h4("span", { style: { width: "28px", height: "28px", borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--ggpp-surface-2)" } }, String(slot)),
            h4(
              "span",
              { style: { flex: "1", minWidth: "0", lineHeight: "18px" } },
              h4("div", null, a3 ? a3.name : `Account slot ${slot}`),
              h4("div", { class: "ggpp-field-desc" }, a3 ? a3.email : "Not visited yet")
            ),
            slot === current3 && h4("span", { class: "ggpp-pill" }, "Current")
          );
        });
        const m3 = ui.modal({
          title: "Switch account",
          icon: I3.user,
          width: 420,
          content: [
            h4("p", { class: "ggpp-muted" }, "Accounts are listed by Google's sign-in slot. Use Google's account menu to add another account."),
            h4("div", { style: { display: "flex", flexDirection: "column" } }, rows)
          ]
        });
      }
      ctx.cleanup(
        ctx.use("menus").register({ id: "accountSwitcher", location: "settings", label: "Switch account", icon: I3.user, order: -50, onSelect: open })
      );
    }
  });

  // sites/gemini/plugins/autoCollapse/index.ts
  var autoCollapse_default = definePlugin({
    id: "autoCollapse",
    name: "AutoCollapse",
    description: "Start code blocks in replies collapsed, with a button to expand them.",
    tags: ["Messages"],
    icon: I3.fold,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      minLines: { type: "number", label: "Collapse after", description: "Only collapse blocks longer than this many lines.", default: 8, min: 1, max: 200, unit: "lines" },
      previewLines: { type: "number", label: "Preview", description: "Lines left visible while collapsed.", default: 4, min: 0, max: 50, unit: "lines" }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const { minLines, previewLines } = ctx.settings;
      ctx.css(`
      code-block.ggpp-collapsed pre { max-height: calc(${previewLines} * 1.5em + 24px); overflow: hidden !important; mask-image: linear-gradient(#000 60%, transparent); }
      .ggpp-cb-toggle {
        all: unset; display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 6px 0;
        font: 500 12px/16px var(--ggpp-font); color: var(--gem-sys-color--on-surface-variant, currentColor); cursor: pointer;
      }
      .ggpp-cb-toggle:hover { text-decoration: underline; }
      code-block:not(.ggpp-collapsed) .ggpp-cb-toggle svg { transform: rotate(180deg); }
    `);
      const done = /* @__PURE__ */ new WeakSet();
      function setup(block) {
        if (done.has(block)) return;
        const lines = (block.querySelector("pre")?.textContent ?? "").split("\n").length;
        if (lines <= minLines) return;
        done.add(block);
        block.classList.add("ggpp-collapsed");
        const label = h4("span");
        const sync3 = () => label.textContent = block.classList.contains("ggpp-collapsed") ? `Show all ${lines} lines` : "Collapse";
        const btn = h4("button", { class: "ggpp-cb-toggle", type: "button", onclick: () => (block.classList.toggle("ggpp-collapsed"), sync3()) }, icon(I3.chevronDown, 14), label);
        sync3();
        block.append(btn);
        return () => {
          btn.remove();
          block.classList.remove("ggpp-collapsed");
        };
      }
      const scan2 = () => {
        if (gemini.isGenerating()) return;
        for (const b3 of gemini.qa(`${gemini.SEL.modelResponse} ${gemini.SEL.codeBlock}`)) {
          const undo = setup(b3);
          if (undo) undos.push(undo);
        }
      };
      const undos = [];
      ctx.cleanup(() => undos.forEach((u3) => u3()));
      ctx.cleanup(gemini.watch(`${gemini.SEL.modelResponse} ${gemini.SEL.codeBlock}`, () => void setTimeout(scan2, 200)));
      ctx.on("gemini:response-end", () => setTimeout(scan2, 300));
    }
  });

  // sites/gemini/plugins/autoRetry/index.ts
  var RETRY = "[data-test-id='regenerate-button'] button, button[data-test-id='regenerate-button'], button[aria-label='Redo'], button[aria-label*='Retry' i], button[aria-label*='Try again' i], button[aria-label*='重试']";
  var MENU_ITEM = "gem-menu-item, [role='menuitem']";
  var autoRetry_default = definePlugin({
    id: "autoRetry",
    name: "AutoRetry",
    description: "Automatically retry a reply that failed with an error.",
    tags: ["Messages"],
    icon: I3.retry,
    updated: "2026-10-14",
    dependencies: ["gemini", "ui"],
    settings: {
      maxRetries: { type: "number", label: "Maximum retries", description: "Maximum consecutive retries per conversation.", default: 3, min: 1, max: 10 },
      delay: { type: "number", label: "Delay", description: "Seconds to wait before retrying.", default: 2, min: 0, max: 30, unit: "s" }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      const counts = /* @__PURE__ */ new Map();
      let timer2;
      ctx.cleanup(() => clearTimeout(timer2));
      ctx.on("gemini:response-end", (e3) => {
        const key = e3.conversationId ?? "new";
        if (!e3.error) {
          counts.delete(key);
          return;
        }
        if (e3.interrupted) return;
        const n2 = (counts.get(key) ?? 0) + 1;
        if (n2 > ctx.settings.maxRetries) {
          counts.delete(key);
          ui.toast({ title: "Max retries reached.", icon: I3.x });
          return;
        }
        counts.set(key, n2);
        ui.toast({ title: `Retrying… (${n2}/${ctx.settings.maxRetries})`, icon: I3.retry, duration: ctx.settings.delay * 1e3 + 1500 });
        clearTimeout(timer2);
        timer2 = setTimeout(() => {
          if (gemini.isGenerating() || gemini.route().conversationId !== e3.conversationId) return;
          const last2 = gemini.qa(gemini.SEL.modelResponse).pop();
          const btn = last2?.querySelector(RETRY) ?? gemini.qa(RETRY).pop();
          if (!btn) {
            ui.toast({ title: "Couldn't find Gemini's retry button." });
            return;
          }
          const before = new Set(document.querySelectorAll(MENU_ITEM));
          btn.click();
          setTimeout(() => {
            const opened = [...document.querySelectorAll(MENU_ITEM)].filter((el) => !before.has(el) && el.offsetParent);
            if (!opened.length) return;
            (opened.find((el) => /try again|redo|regenerate|重试|重新生成/i.test(el.innerText)) ?? opened[0]).click();
          }, 350);
        }, ctx.settings.delay * 1e3);
      });
    }
  });

  // sites/gemini/plugins/betterLinks/index.ts
  var TLDS = "com|org|net|io|dev|app|co|ai|gov|edu|me|xyz|gg|tv|cc|so|is|info|tech|pro|site|store|cloud|online|icu|top|be|ly|sh|to|fm|am|us|uk|ca|de|fr|es|it|nl|jp|cn|ru|br|au|in|eu";
  var DOMAIN = new RegExp(`(?<![\\w@/:.#-])((?:www\\.)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+(?:${TLDS})(?:/[^\\s<>"'\`)\\]},，。]*)?)(?![\\w-])`, "gi");
  var HAS_DOMAIN = new RegExp(DOMAIN.source, "i");
  var HEX = /^#[0-9a-f]{6}$/i;
  var betterLinks_default = definePlugin({
    id: "betterLinks",
    name: "BetterLinks",
    description: "Colour links in replies and make bare domains like example.com clickable.",
    tags: ["Messages"],
    icon: I3.link,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      linkifyDomains: { type: "boolean", label: "Linkify domains", description: "Detect bare domains in messages and make them clickable.", default: true },
      linkColor: { type: "color", label: "Link color", default: "#4a9eff" },
      enableVisitedColor: { type: "boolean", label: "Visited color", description: "Use a different color for links you already visited.", default: false },
      visitedColor: { type: "color", label: "Visited link color", default: "#9b59b6", showIf: (v3) => !!v3.enableVisitedColor }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const link = HEX.test(ctx.settings.linkColor) ? ctx.settings.linkColor : "#4a9eff";
      const visited = HEX.test(ctx.settings.visitedColor) ? ctx.settings.visitedColor : "#9b59b6";
      ctx.css(`
      :is(message-content, user-query) a[href] { color: ${link} !important; text-decoration-color: ${link} !important; }
      ${ctx.settings.enableVisitedColor ? `:is(message-content, user-query) a[href]:visited { color: ${visited} !important; text-decoration-color: ${visited} !important; }` : ""}
    `);
      if (!ctx.settings.linkifyDomains) return;
      const made = [];
      function linkify(root2) {
        const walker = document.createTreeWalker(root2, NodeFilter.SHOW_TEXT, {
          acceptNode: (n2) => n2.parentElement?.closest("a, code, pre, button, .ggpp-bl") ? NodeFilter.FILTER_REJECT : HAS_DOMAIN.test(n2.textContent ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        });
        const nodes = [];
        for (let n2 = walker.nextNode(); n2; n2 = walker.nextNode()) nodes.push(n2);
        for (const node of nodes) {
          const text = node.textContent ?? "";
          const frag = document.createDocumentFragment();
          let last2 = 0;
          for (const m3 of text.matchAll(DOMAIN)) {
            frag.append(text.slice(last2, m3.index));
            const a3 = h4("a", { href: `https://${m3[1]}`, target: "_blank", rel: "noopener noreferrer", class: "ggpp-bl" }, m3[1]);
            made.push(a3);
            frag.append(a3);
            last2 = m3.index + m3[1].length;
          }
          frag.append(text.slice(last2));
          node.replaceWith(frag);
        }
      }
      const pass = () => {
        if (gemini.isGenerating()) return;
        for (const el of gemini.qa(`${gemini.SEL.modelResponse} ${gemini.SEL.modelText}, ${gemini.SEL.userQuery} ${gemini.SEL.userText}`)) linkify(el);
      };
      ctx.on("gemini:response-end", () => [300, 1500, 4e3].forEach((ms) => ctx.setTimeout(pass, ms)));
      ctx.on("gemini:generating", (on3) => !on3 && ctx.setTimeout(pass, 1200));
      ctx.setInterval(pass, 5e3);
      ctx.cleanup(gemini.watch(gemini.SEL.modelResponse, () => void setTimeout(pass, 500)));
      ctx.cleanup(() => {
        for (const a3 of made) if (a3.isConnected) a3.replaceWith(a3.textContent ?? "");
      });
    }
  });

  // sites/gemini/plugins/betterModeSelect/index.ts
  var OPTION = "[data-test-id^='bard-mode-option-']";
  var sleep = (ms) => new Promise((r3) => setTimeout(r3, ms));
  var betterModeSelect_default = definePlugin({
    id: "betterModeSelect",
    name: "BetterModeSelect",
    description: "Pin models as one-click chips next to the model picker. Ctrl+M cycles the pinned models.",
    tags: ["Composer"],
    icon: I3.layers,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini", "ui"],
    liveSettings: true,
    settings: {
      hideNativeTrigger: { type: "boolean", label: "Hide model picker", description: "Hide Gemini's own model button when chips are shown. Thinking level stays reachable only through it.", default: false },
      shortcut: { type: "boolean", label: "Ctrl+M", description: "Cycle pinned models with Ctrl+M.", default: true }
    },
    async start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      let catalog = await ctx.data.get("catalog", []);
      let pins = await ctx.data.get("pins", []);
      const bars = /* @__PURE__ */ new Set();
      ctx.css(`
      body.ggpp-ms-silent :is(.cdk-overlay-container, .cdk-overlay-pane, gem-menu) { opacity: 0 !important; pointer-events: none !important; }
      .ggpp-ms { display: inline-flex; align-items: center; gap: 2px; margin-inline: 2px; }
      .ggpp-ms:empty { display: none; }
      .ggpp-ms-chip {
        all: unset; box-sizing: border-box; height: 32px; padding: 0 10px; border-radius: 16px; cursor: pointer; white-space: nowrap;
        font: 500 13px/32px "Google Sans", var(--ggpp-font); color: var(--gem-sys-color--on-surface-variant, currentColor);
      }
      .ggpp-ms-chip:hover { background: rgb(127 127 127 / 14%); }
      .ggpp-ms-chip[aria-pressed='true'] { color: #ff7a17; }
      .ggpp-ms-chip:focus-visible { outline: 2px solid var(--ggpp-accent); }
      body.ggpp-ms-hide bard-mode-switcher { display: none !important; }
      .ggpp-ms-row { display: flex; align-items: center; gap: 8px; padding: 6px 0; }
      .ggpp-ms-row > span { flex: 1; min-width: 0; }
      .ggpp-ms-row small { display: block; color: var(--ggpp-fg-3); }
    `);
      const trigger = () => gemini.q(gemini.SEL.modeButton);
      const currentName = () => trigger()?.getAttribute("aria-label")?.match(/currently\s+(.+)$/i)?.[1]?.trim() ?? trigger()?.innerText.trim() ?? "";
      const isCurrent = (m3) => {
        const cur = currentName().toLowerCase();
        return !!cur && (m3.name.toLowerCase() === cur || m3.name.toLowerCase().endsWith(` ${cur}`));
      };
      function learn(items) {
        const found = items.map((el) => {
          const lines = el.innerText.split("\n").map((l3) => l3.trim()).filter(Boolean);
          return { id: el.dataset.testId.replace("bard-mode-option-", ""), name: lines[0] ?? "", hint: lines.slice(1).join(" ") };
        });
        if (!found.length || JSON.stringify(found) === JSON.stringify(catalog)) return;
        catalog = found;
        pins = pins.filter((p3) => catalog.some((m3) => m3.id === p3));
        void ctx.data.set("catalog", catalog);
        render();
      }
      ctx.cleanup(gemini.watch(OPTION, () => void nextFrame(() => learn(gemini.qa(OPTION)))));
      async function silently(fn2) {
        const btn = trigger();
        if (!btn) return void 0;
        document.body.classList.add("ggpp-ms-silent");
        try {
          btn.click();
          return await fn2();
        } finally {
          await sleep(30);
          if (document.querySelector(OPTION)) {
            document.querySelector(".cdk-overlay-backdrop")?.click();
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
          }
          await sleep(200);
          document.body.classList.remove("ggpp-ms-silent");
        }
      }
      async function waitOptions() {
        for (let i3 = 0; i3 < 30; i3++) {
          const items = gemini.qa(OPTION);
          if (items.length) return items;
          await sleep(50);
        }
        return [];
      }
      async function pick(id) {
        await silently(async () => {
          const items = await waitOptions();
          learn(items);
          items.find((el) => el.dataset.testId === `bard-mode-option-${id}`)?.click();
        });
        setTimeout(render, 300);
      }
      function syncActive() {
        for (const chip of document.querySelectorAll(".ggpp-ms-chip")) {
          const m3 = catalog.find((x4) => x4.id === chip.dataset.mode);
          if (m3) chip.setAttribute("aria-pressed", String(isCurrent(m3)));
        }
      }
      ctx.setInterval(syncActive, 1500);
      function render() {
        const list2 = pins.map((p3) => catalog.find((m3) => m3.id === p3)).filter((m3) => !!m3);
        document.body.classList.toggle("ggpp-ms-hide", ctx.settings.hideNativeTrigger && list2.length > 0);
        bars.forEach(
          (bar) => bar.replaceChildren(
            ...list2.map(
              (m3) => h4(
                "button",
                {
                  class: "ggpp-ms-chip",
                  type: "button",
                  title: m3.hint ? `${m3.name} — ${m3.hint}` : m3.name,
                  "aria-pressed": String(isCurrent(m3)),
                  dataset: { mode: m3.id },
                  onclick: (e3) => {
                    e3.stopPropagation();
                    if (!isCurrent(m3)) void pick(m3.id);
                  }
                },
                m3.name
              )
            )
          )
        );
      }
      ctx.cleanup(
        gemini.watch("bard-mode-switcher", (sw) => {
          const host2 = sw.closest(".model-picker-container") ?? sw;
          const bar = h4("span", { class: "ggpp-ms" });
          host2.before(bar);
          bars.add(bar);
          render();
          const mo3 = new MutationObserver(() => nextFrame(syncActive));
          mo3.observe(sw, { attributes: true, attributeFilter: ["aria-label"], childList: true, subtree: true, characterData: true });
          return () => {
            mo3.disconnect();
            bar.remove();
            bars.delete(bar);
          };
        })
      );
      ctx.cleanup(() => document.body.classList.remove("ggpp-ms-hide", "ggpp-ms-silent"));
      ctx.on("settings:betterModeSelect", render);
      ctx.provide("models", {
        current: () => catalog.find(isCurrent)?.name ?? currentName(),
        list: () => catalog,
        async pickByName(name) {
          const m3 = catalog.find((x4) => x4.name === name);
          if (!m3 || isCurrent(m3)) return !!m3;
          await pick(m3.id);
          return true;
        }
      });
      window.addEventListener(
        "keydown",
        (e3) => {
          if (!ctx.settings.shortcut || e3.key.toLowerCase() !== "m" || !e3.ctrlKey || e3.metaKey || e3.altKey || e3.shiftKey || e3.repeat || e3.isComposing) return;
          if (isEditable(e3.target) && !gemini.editor()?.contains(e3.target)) return;
          const list2 = pins.map((p3) => catalog.find((m3) => m3.id === p3)).filter((m3) => !!m3);
          if (list2.length < 2 || !trigger()) return;
          e3.preventDefault();
          e3.stopPropagation();
          const i3 = list2.findIndex(isCurrent);
          void pick(list2[(i3 + 1) % list2.length].id);
        },
        { capture: true, signal: ctx.signal }
      );
      ctx.provide("panel:betterModeSelect", (el) => {
        const draw = () => {
          if (!catalog.length) {
            el.replaceChildren(
              h4("p", { class: "ggpp-muted" }, "Open Gemini's model picker once so GG++ can learn your models, or:"),
              ui.button("Learn models now", () => void silently(async () => learn(await waitOptions())).then(draw))
            );
            return;
          }
          const ordered = [...pins.map((p3) => catalog.find((m3) => m3.id === p3)).filter(Boolean), ...catalog.filter((m3) => !pins.includes(m3.id))];
          el.replaceChildren(
            h4("div", { class: "ggpp-section-label" }, "Pinned models"),
            ...ordered.map((m3) => {
              const i3 = pins.indexOf(m3.id);
              const move2 = (d3) => {
                const j4 = i3 + d3;
                if (i3 < 0 || j4 < 0 || j4 >= pins.length) return;
                [pins[i3], pins[j4]] = [pins[j4], pins[i3]];
                void ctx.data.set("pins", pins);
                draw();
                render();
              };
              return h4(
                "div",
                { class: "ggpp-ms-row" },
                h4("span", null, m3.name, m3.hint && h4("small", null, m3.hint)),
                ui.iconButton(I3.chevronDown, "Move down", () => move2(1)),
                ui.iconButton(["M18 15l-6-6-6 6"], "Move up", () => move2(-1)),
                ui.switch(i3 >= 0, (on3) => {
                  pins = on3 ? [...pins, m3.id] : pins.filter((p3) => p3 !== m3.id);
                  void ctx.data.set("pins", pins);
                  draw();
                  render();
                })
              );
            })
          );
        };
        draw();
      });
    }
  });

  // src/lib/text.ts
  function preview(text, max = 120) {
    const plain = text.replace(/```[\s\S]*?```/g, " ").replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`#>~|]+/g, "").replace(/\s+/g, " ").trim();
    return truncate(plain, max);
  }
  function truncate(text, max) {
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  }

  // sites/gemini/plugins/betterNavigator/index.ts
  var READ_LINE = 0.28;
  var LOCK_MS = 1e3;
  var TOP_OFFSET = 72;
  var betterNavigator_default = definePlugin({
    id: "betterNavigator",
    name: "BetterNavigator",
    description: "An outline rail for long chats: hover to see every message, click or use ↑ / ↓ to jump.",
    tags: ["Navigation"],
    icon: I3.scroll,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      showAssistant: { type: "boolean", label: "Show replies", description: "List Gemini's replies in the outline, not only your messages.", default: true },
      jumpEffect: {
        type: "select",
        label: "Jump effect",
        description: "Highlight the message after jumping to it.",
        default: "border",
        options: [
          { value: "border", label: "Highlight border" },
          { value: "none", label: "None" }
        ]
      },
      keyboard: { type: "boolean", label: "Keyboard navigation", description: "↑ / ↓ / Home / End jump between messages when the message box is not focused; Ctrl/⌘ + ↑ / ↓ go to the top or bottom.", default: true }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const { showAssistant, jumpEffect } = ctx.settings;
      let items = [];
      let current3 = -1;
      let lockUntil = 0;
      let marks = /* @__PURE__ */ new Set();
      const labels = /* @__PURE__ */ new WeakMap();
      ctx.css(`
      .ggpp-nav-rail {
        position: fixed; z-index: 30; display: flex; flex-direction: column; justify-content: center; align-items: flex-end;
        width: 2.5rem; transform: translateY(-50%);
      }
      .ggpp-nav-rail[hidden] { display: none; }
      .ggpp-nav-tick { all: unset; box-sizing: border-box; display: flex; justify-content: flex-end; align-items: center; width: 2.5rem; height: var(--ggpp-tick-h, .75rem); cursor: pointer; flex: none; }
      .ggpp-nav-tick::after { content: ""; height: 1px; width: .375rem; background: var(--ggpp-fg-3); transition: width .15s, background .15s; }
      .ggpp-nav-tick[data-role="model"]::after { width: .75rem; }
      .ggpp-nav-tick.ggpp-cur::after { width: 1rem; height: 2px; background: var(--ggpp-accent); }
      .ggpp-nav-tick.ggpp-live::after { background: none; border-top: 1px dashed var(--ggpp-fg-2); }
      .ggpp-nav-tick.ggpp-marked::after { background: #f59e0b; height: 2px; }
      .ggpp-nav-tick:focus-visible { outline: 2px solid var(--ggpp-accent); }
      .ggpp-nav-menu {
        position: absolute; right: 2.75rem; top: 50%; width: min(18rem, 70vw); max-height: 70vh; overflow: auto;
        padding: 8px; border-radius: 12px; background: var(--ggpp-surface); color: var(--ggpp-fg); box-shadow: var(--ggpp-shadow);
        font: 13px/18px var(--ggpp-font); opacity: 0; pointer-events: none; transform: translate(6px, -50%); transition: opacity .2s, transform .2s;
      }
      .ggpp-nav-rail:hover .ggpp-nav-menu, .ggpp-nav-rail:focus-within .ggpp-nav-menu, .ggpp-nav-rail.ggpp-open .ggpp-nav-menu { opacity: 1; pointer-events: auto; transform: translate(0, -50%); }
      .ggpp-nav-head { padding: 2px 8px 6px; color: var(--ggpp-fg-3); font-variant-numeric: tabular-nums; }
      .ggpp-nav-row { all: unset; box-sizing: border-box; display: flex; gap: 8px; width: 100%; padding: 5px 8px; border-radius: 8px; border: 1px solid transparent; cursor: pointer; }
      .ggpp-nav-row:hover, .ggpp-nav-row.ggpp-aim { background: var(--ggpp-hover); }
      .ggpp-nav-row.ggpp-cur { border-color: var(--ggpp-accent); }
      .ggpp-nav-row span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-nav-flash { outline: 2px solid var(--ggpp-accent) !important; outline-offset: 4px; border-radius: 12px; transition: outline-color .3s; }
      @media (prefers-reduced-motion: reduce) {
        .ggpp-nav-tick::after, .ggpp-nav-menu { transition: none; }
        .ggpp-nav-flash { outline: none !important; background: color-mix(in srgb, var(--ggpp-accent) 12%, transparent); }
      }
    `);
      const head = h4("div", { class: "ggpp-nav-head" });
      const list2 = h4("div", { role: "list" });
      const menu = h4("div", { class: "ggpp-nav-menu" }, head, list2);
      const ticks = h4("div", { style: { display: "contents" } });
      const rail = h4("nav", { class: "ggpp-nav-rail", "aria-label": "Conversation outline", hidden: true }, ticks, menu);
      document.body.append(rail);
      ctx.cleanup(() => rail.remove());
      function label(m3) {
        const cached = labels.get(m3.el);
        if (cached && !(m3.role === "model" && gemini.isGenerating())) return cached;
        let text = m3.text.replace(/\s+/g, " ").trim();
        if (!text) text = m3.el.querySelector("img") ? "Image" : m3.el.querySelector("uploader-file-preview, .file-preview-container *") ? "Attachment" : m3.role === "model" && gemini.isGenerating() ? "Writing…" : "…";
        const out = truncate(text, 61);
        labels.set(m3.el, out);
        return out;
      }
      function collect2() {
        items = gemini.messages().filter((m3) => showAssistant || m3.role === "user");
      }
      function render() {
        collect2();
        rail.hidden = items.length < 2;
        if (rail.hidden) return;
        const live = gemini.isGenerating() ? items.findLast((m3) => m3.role === "model") : void 0;
        ticks.replaceChildren(
          ...items.map(
            (m3, i3) => h4("button", {
              class: `ggpp-nav-tick${i3 === current3 ? " ggpp-cur" : ""}${m3 === live ? " ggpp-live" : ""}${marks.has(m3.el) ? " ggpp-marked" : ""}`,
              type: "button",
              dataset: { role: m3.role, i: String(i3) },
              "aria-label": `Go to message ${i3 + 1} of ${items.length}`,
              onclick: () => jumpIndex(i3),
              onmouseenter: () => aim(i3)
            })
          )
        );
        list2.replaceChildren(
          ...items.map(
            (m3, i3) => h4(
              "button",
              { class: `ggpp-nav-row${i3 === current3 ? " ggpp-cur" : ""}`, type: "button", role: "listitem", dataset: { i: String(i3) }, onclick: () => jumpIndex(i3) },
              h4("span", null, m3.role === "user" ? "❓" : "🤖"),
              h4("span", null, label(m3))
            )
          )
        );
        head.textContent = `${Math.max(current3, 0) + 1} / ${items.length}`;
        place();
      }
      function place() {
        const scroller = gemini.scroller();
        if (!scroller || rail.hidden) return;
        const r3 = scroller.getBoundingClientRect();
        const composer = gemini.composer()?.getBoundingClientRect();
        const bottom = composer && composer.top > r3.top ? composer.top : r3.bottom;
        const height = bottom - Math.max(r3.top, 0);
        const per = items.length > 16 ? 0.45 : 0.75;
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const fit = Math.max(2, Math.min(per * rem, (height - 32) / items.length));
        rail.dataset.ticks = String(items.length);
        rail.style.setProperty("--ggpp-tick-h", `${fit}px`);
        let left = r3.right - 2.5 * rem - 0.75 * rem;
        for (const other of document.querySelectorAll(".gemini-timeline-bar, [class*='timeline-bar']")) {
          if (rail.contains(other)) continue;
          const o3 = other.getBoundingClientRect();
          if (o3.width && o3.left < left + 2.5 * rem && o3.right > left) left = o3.left - 2.5 * rem - 8;
        }
        rail.style.left = `${left}px`;
        const total = fit * items.length;
        const lo = Math.max(r3.top, 0) + total / 2 + 8;
        const hi = Math.min(bottom, innerHeight || bottom) - total / 2 - 8;
        rail.style.top = `${Math.min(Math.max((Math.max(r3.top, 0) + bottom) / 2, lo), Math.max(lo, hi))}px`;
      }
      function aim(i3) {
        list2.querySelector(".ggpp-aim")?.classList.remove("ggpp-aim");
        const row = list2.children[i3];
        row?.classList.add("ggpp-aim");
        row?.scrollIntoView({ block: "nearest" });
      }
      function setCurrent(i3) {
        if (i3 === current3) return;
        current3 = i3;
        ticks.querySelector(".ggpp-cur")?.classList.remove("ggpp-cur");
        list2.querySelector(".ggpp-cur")?.classList.remove("ggpp-cur");
        ticks.children[i3]?.classList.add("ggpp-cur");
        list2.children[i3]?.classList.add("ggpp-cur");
        head.textContent = `${i3 + 1} / ${items.length}`;
      }
      function track2() {
        if (Date.now() < lockUntil || !items.length) return;
        const scroller = gemini.scroller();
        if (!scroller) return;
        if (scroller.scrollTop <= 4) return setCurrent(0);
        if (scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <= 8) return setCurrent(items.length - 1);
        const r3 = scroller.getBoundingClientRect();
        const line = r3.top + r3.height * READ_LINE;
        let idx = 0;
        items.forEach((m3, i3) => {
          if (m3.el.getBoundingClientRect().top <= line) idx = i3;
        });
        setCurrent(idx);
      }
      function flash(el) {
        if (jumpEffect === "none") return;
        const target2 = el.querySelector(".user-query-bubble-with-background, .markdown-main-panel") ?? el;
        target2.classList.add("ggpp-nav-flash");
        const ms = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1e3 : 2e3;
        setTimeout(() => target2.classList.remove("ggpp-nav-flash"), ms);
      }
      function jump(el) {
        const scroller = gemini.scroller();
        if (!scroller || !el.isConnected) return;
        const i3 = items.findIndex((m3) => m3.el === el);
        if (i3 >= 0) setCurrent(i3);
        lockUntil = Date.now() + LOCK_MS;
        const go = () => {
          const sr = scroller.getBoundingClientRect();
          const tall = el.getBoundingClientRect().height > sr.height * 0.6;
          el.scrollIntoView({ block: tall ? "start" : "center", behavior: "auto" });
          if (tall) {
            const delta = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top - TOP_OFFSET;
            if (Math.abs(delta) > 16) scroller.scrollBy({ top: delta });
          }
        };
        go();
        setTimeout(go, 120);
        setTimeout(go, 400);
        flash(el);
      }
      const jumpIndex = (i3) => items[i3] && jump(items[i3].el);
      let pendingRender = false;
      const scheduleRender = () => {
        if (pendingRender) return;
        pendingRender = true;
        setTimeout(() => {
          pendingRender = false;
          render();
          track2();
        }, 150);
      };
      ctx.cleanup(gemini.watch(`${gemini.SEL.userQuery}, ${gemini.SEL.modelResponse}`, () => (scheduleRender(), scheduleRender)));
      ctx.on("gemini:route", () => {
        current3 = -1;
        scheduleRender();
      });
      ctx.on("gemini:generating", scheduleRender);
      ctx.on("gemini:response-end", () => setTimeout(render, 300));
      document.addEventListener("scroll", () => nextFrame(track2), { capture: true, passive: true, signal: ctx.signal });
      window.addEventListener("resize", place, { signal: ctx.signal });
      ctx.setInterval(place, 1e3);
      async function toEdge(top) {
        const scroller = gemini.scroller();
        if (!scroller) return;
        let cancelled = false;
        const cancel = () => cancelled = true;
        for (const ev of ["wheel", "pointerdown", "touchstart"]) scroller.addEventListener(ev, cancel, { once: true, passive: true });
        if (!top) {
          scroller.scrollTop = scroller.scrollHeight;
          return;
        }
        for (let tries = 0; tries < 40 && !cancelled; tries++) {
          const before = scroller.scrollHeight;
          scroller.scrollTop = 0;
          await new Promise((r3) => setTimeout(r3, 400));
          if (scroller.scrollHeight === before) break;
        }
      }
      document.addEventListener(
        "keydown",
        (e3) => {
          if (!ctx.settings.keyboard || rail.hidden || isEditable(e3.target) || e3.isComposing) return;
          if (document.querySelector("#ggpp-layer .ggpp-backdrop")) return;
          if (e3.key === "Escape") {
            rail.classList.remove("ggpp-open");
            return;
          }
          if ((e3.ctrlKey || e3.metaKey) && !e3.altKey && (e3.key === "ArrowUp" || e3.key === "ArrowDown")) {
            e3.preventDefault();
            void toEdge(e3.key === "ArrowUp");
            return;
          }
          if (e3.ctrlKey || e3.metaKey || e3.altKey || e3.shiftKey) return;
          const map = { ArrowUp: current3 - 1, ArrowDown: current3 + 1, Home: 0, End: items.length - 1 };
          if (!(e3.key in map)) return;
          const i3 = Math.min(items.length - 1, Math.max(0, map[e3.key]));
          e3.preventDefault();
          jumpIndex(i3);
          aim(i3);
        },
        { signal: ctx.signal }
      );
      ctx.provide("navigator", {
        jump,
        setMarks(m3) {
          marks = m3;
          render();
        }
      });
      render();
    }
  });

  // sites/gemini/plugins/betterQueue/store.ts
  var MAX_ITEMS = 30;
  var MAX_AGE = 24 * 60 * 6e4;
  var MAX_TEXT = 1e5;
  function prune(q4, now2) {
    const out = {};
    for (const [key, items] of Object.entries(q4)) {
      if (key === "new" || !Array.isArray(items)) continue;
      const fresh = items.filter((i3) => i3 && typeof i3.text === "string" && now2 - i3.at < MAX_AGE).slice(0, MAX_ITEMS);
      if (fresh.length) out[key] = fresh;
    }
    return out;
  }
  function move(items, id, to) {
    const from = items.findIndex((i3) => i3.id === id);
    if (from < 0) return items;
    const next = [...items];
    const [it] = next.splice(from, 1);
    next.splice(Math.max(0, Math.min(to, next.length)), 0, it);
    return next;
  }
  function adopt(q4, id) {
    if (!q4.new?.length) return q4;
    const { new: fresh, ...rest } = q4;
    return { ...rest, [id]: [...rest[id] ?? [], ...fresh] };
  }

  // sites/gemini/plugins/betterQueue/index.ts
  var sleep2 = (ms) => new Promise((r3) => setTimeout(r3, ms));
  var betterQueue_default = definePlugin({
    id: "betterQueue",
    name: "BetterQueue",
    description: "Press Enter while Gemini is replying to queue your next message. Queued messages are sent in order as each reply finishes.",
    tags: ["Composer"],
    icon: I3.list,
    enabledByDefault: true,
    updated: "2026-10-21",
    dependencies: ["gemini", "ui"],
    liveSettings: true,
    settings: {
      showQueueMode: {
        type: "boolean",
        label: "Model per message",
        description: "Remember the model selected when a message is queued, show it on the message, and send with it. Needs BetterModeSelect.",
        default: true
      },
      persistAcrossRefresh: {
        type: "boolean",
        label: "Keep after refresh",
        description: "Restore unsent queued messages in this browser after a reload (for 24 hours).",
        default: true
      }
    },
    async start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      const models = () => ctx.settings.showQueueMode ? ctx.tryUse("models") : void 0;
      let queues = ctx.settings.persistAcrossRefresh ? prune(await ctx.data.get("queues", {}), Date.now()) : {};
      const paused = /* @__PURE__ */ new Set();
      let sending = false;
      let collapsed = false;
      const trays = /* @__PURE__ */ new Set();
      const keyOf = (r3) => r3.conversationId ?? (r3.isHome ? "new" : null);
      const key = () => keyOf(gemini.route());
      const list2 = (k4 = key()) => k4 ? queues[k4] ?? [] : [];
      const setList = (k4, items) => {
        if (items.length) queues = { ...queues, [k4]: items };
        else {
          const { [k4]: _3, ...rest } = queues;
          queues = rest;
          paused.delete(k4);
        }
        save2();
        render();
      };
      const save2 = debounce(() => void ctx.data.set("queues", ctx.settings.persistAcrossRefresh ? prune(queues, Date.now()) : {}), 300);
      ctx.cleanup(() => save2.cancel());
      ctx.on("data:changed", ({ key: k4, value }) => {
        if (k4 !== "betterQueue:queues" || sending || !value || typeof value !== "object") return;
        queues = { ...value, ...queues.new ? { new: queues.new } : {} };
        render();
      });
      const replying = () => gemini.isGenerating() || gemini.qa(gemini.SEL.stop).some(isVisible);
      window.addEventListener(
        "keydown",
        (e3) => {
          if (e3.key !== "Enter" || e3.shiftKey || e3.altKey || e3.ctrlKey || e3.metaKey || e3.isComposing) return;
          if (!gemini.editor()?.contains(e3.target) || !replying()) return;
          const k4 = key();
          const text = gemini.editorText().trim();
          if (!k4 || !text) return;
          e3.preventDefault();
          e3.stopImmediatePropagation();
          if (list2(k4).length >= MAX_ITEMS) {
            ui.toast({ title: "Queue is full", body: `At most ${MAX_ITEMS} messages can wait in one chat.`, icon: I3.list });
            return;
          }
          setList(k4, [...list2(k4), { id: uid("q"), text: text.slice(0, MAX_TEXT), model: models()?.current() ?? "", at: Date.now() }]);
          gemini.setEditorText("");
        },
        { capture: true, signal: ctx.signal }
      );
      async function until(test2, ms) {
        for (const end = Date.now() + ms; Date.now() < end; await sleep2(100)) if (test2()) return true;
        return test2();
      }
      async function sendItem(k4, it) {
        if (sending || key() !== k4) return;
        sending = true;
        render();
        const draft = gemini.editorText().trim();
        const m3 = models();
        const before = m3?.current() ?? "";
        try {
          if (m3 && it.model && it.model !== before) {
            await m3.pickByName(it.model);
            await sleep2(300);
          }
          gemini.setEditorText(it.text);
          const ready2 = () => {
            const b3 = gemini.sendButton();
            return !!b3 && !b3.matches(".stop, [disabled]") && !b3.closest(".stop") && !replying();
          };
          const sent = gemini.qa(gemini.SEL.userQuery).length;
          const started = await until(ready2, 3e3) && gemini.send() && await until(() => replying() || gemini.qa(gemini.SEL.userQuery).length > sent, 6e3);
          if (!started) {
            gemini.setEditorText(draft);
            paused.add(k4);
            ui.toast({ title: "Queued message not sent", body: "Gemini didn't accept it. The queue is paused; press Resume to try again.", icon: I3.list });
            return;
          }
          setList(
            k4,
            list2(k4).filter((x4) => x4.id !== it.id)
          );
          if (draft) setTimeout(() => !gemini.editorText().trim() && gemini.setEditorText(draft), 400);
          if (m3 && it.model && before && before !== it.model) await m3.pickByName(before);
        } catch (e3) {
          ctx.log.error("sending a queued message failed", e3);
          paused.add(k4);
        } finally {
          sending = false;
          render();
        }
      }
      function next(k4) {
        const first = list2(k4)[0];
        if (first && !paused.has(k4) && !replying()) void sendItem(k4, first);
      }
      let stoppedAt = 0;
      document.addEventListener(
        "click",
        (e3) => {
          if (e3.target.closest?.(gemini.SEL.stop)) stoppedAt = Date.now();
        },
        { capture: true, signal: ctx.signal }
      );
      ctx.on("gemini:response-end", (e3) => {
        const k4 = e3.conversationId ?? key();
        if (!k4 || !list2(k4).length) return;
        if (e3.interrupted || e3.error || Date.now() - stoppedAt < 5e3) {
          paused.add(k4);
          render();
          return;
        }
        setTimeout(() => next(k4), 800);
      });
      ctx.on("gemini:route", ({ route, prev }) => {
        if (prev.conversationId === null && route.conversationId && queues.new?.length) {
          queues = adopt(queues, route.conversationId);
          save2();
        }
        render();
      });
      ctx.css(`
      .ggpp-q { box-sizing: border-box; width: 100%; max-width: var(--ggpp-q-width, 100%); margin: 0 auto 8px; border-radius: 20px; background: var(--ggpp-surface); color: var(--ggpp-fg); font: 400 14px/20px var(--ggpp-font); box-shadow: 0 0 0 1px var(--ggpp-border-soft); }
      .ggpp-q[hidden] { display: none; }
      .ggpp-q-head { display: flex; align-items: center; gap: 8px; padding: 6px 8px 6px 16px; }
      .ggpp-q-title { font-weight: 500; }
      .ggpp-q-state { color: var(--ggpp-fg-2); font-size: 13px; }
      .ggpp-q-head .ggpp-spacer { flex: 1; }
      .ggpp-q-list { display: grid; gap: 2px; padding: 0 8px 8px; max-height: 40vh; overflow: auto; }
      .ggpp-q-row { display: flex; align-items: center; gap: 4px; padding: 4px 4px 4px 12px; border-radius: 14px; background: var(--ggpp-bg); cursor: grab; }
      .ggpp-q-row.ggpp-drag { opacity: .4; }
      .ggpp-q-row.ggpp-over { box-shadow: inset 0 2px 0 var(--ggpp-accent); }
      .ggpp-q-text { flex: 1; min-width: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; white-space: pre-wrap; word-break: break-word; }
      .ggpp-q-num { color: var(--ggpp-fg-3); font-size: 12px; min-width: 1.5em; }
      .ggpp-q-chip { all: unset; box-sizing: border-box; height: 24px; padding: 0 8px; border-radius: 12px; font-size: 12px; color: var(--ggpp-fg-2); box-shadow: inset 0 0 0 1px var(--ggpp-border); cursor: pointer; white-space: nowrap; max-width: 9rem; overflow: hidden; text-overflow: ellipsis; }
      .ggpp-q-chip:hover { background: var(--ggpp-hover); }
      .ggpp-q .ggpp-icon-btn { width: 32px; height: 32px; }
    `);
      function row(k4, it, i3, items) {
        const m3 = models();
        const el = h4(
          "div",
          { class: "ggpp-q-row", draggable: "true", dataset: { id: it.id } },
          h4("span", { class: "ggpp-q-num" }, String(i3 + 1)),
          h4("span", { class: "ggpp-q-text", title: it.text }, it.text),
          m3 && it.model && h4(
            "button",
            {
              class: "ggpp-q-chip",
              type: "button",
              title: `Sent with ${it.model}. Click to change.`,
              onclick: (e3) => {
                const choices = m3.list();
                if (!choices.length) return;
                ui.menu(
                  e3.currentTarget,
                  choices.map((c3) => ({
                    label: c3.name,
                    checked: c3.name === it.model,
                    onClick: () => setList(k4, list2(k4).map((x4) => x4.id === it.id ? { ...x4, model: c3.name } : x4))
                  }))
                );
              }
            },
            it.model
          ),
          ui.iconButton(I3.edit, "Edit queued message", async () => {
            const text = await ui.prompt({ title: "Edit queued message", value: it.text, multiline: true });
            if (text === null) return;
            const t3 = text.trim().slice(0, MAX_TEXT);
            setList(k4, t3 ? list2(k4).map((x4) => x4.id === it.id ? { ...x4, text: t3 } : x4) : list2(k4).filter((x4) => x4.id !== it.id));
          }),
          ui.iconButton(replying() ? ["M12 19V5", "M5 12l7-7 7 7"] : ["M5 12h14", "M12 5l7 7-7 7"], replying() ? "Send next" : "Send now", () => {
            paused.delete(k4);
            if (replying()) setList(k4, move(list2(k4), it.id, 0));
            else void sendItem(k4, it);
          }),
          ui.iconButton(I3.x, "Remove from queue", () => setList(k4, list2(k4).filter((x4) => x4.id !== it.id)))
        );
        el.addEventListener("dragstart", (e3) => {
          e3.dataTransfer?.setData("text/x-ggpp-queue", it.id);
          if (e3.dataTransfer) e3.dataTransfer.effectAllowed = "move";
          el.classList.add("ggpp-drag");
        });
        el.addEventListener("dragend", () => el.classList.remove("ggpp-drag"));
        el.addEventListener("dragover", (e3) => {
          if (!e3.dataTransfer?.types.includes("text/x-ggpp-queue")) return;
          e3.preventDefault();
          el.classList.add("ggpp-over");
        });
        el.addEventListener("dragleave", () => el.classList.remove("ggpp-over"));
        el.addEventListener("drop", (e3) => {
          e3.preventDefault();
          el.classList.remove("ggpp-over");
          const id = e3.dataTransfer?.getData("text/x-ggpp-queue");
          if (id && id !== it.id) setList(k4, move(list2(k4), id, items.findIndex((x4) => x4.id === it.id)));
        });
        return el;
      }
      function render() {
        const k4 = key();
        const items = list2(k4);
        const busy2 = replying();
        const stalled = !!k4 && items.length > 0 && !busy2 && !sending;
        for (const tray of trays) {
          tray.hidden = !items.length;
          if (!items.length || !k4) {
            tray.replaceChildren();
            continue;
          }
          const state3 = sending ? "Sending…" : paused.has(k4) ? "Paused" : busy2 ? "Sends when this reply finishes" : "Waiting";
          tray.replaceChildren(
            h4(
              "div",
              { class: "ggpp-q-head" },
              icon(I3.list, 16),
              h4("span", { class: "ggpp-q-title" }, `${items.length} queued`),
              h4("span", { class: "ggpp-q-state" }, state3),
              h4("span", { class: "ggpp-spacer" }),
              (stalled || paused.has(k4) && !sending) && ui.button(
                stalled ? "Send next" : "Resume",
                () => {
                  paused.delete(k4);
                  render();
                  next(k4);
                },
                "primary"
              ),
              ui.iconButton(I3.trash, "Clear queue", async () => {
                if (await ui.confirm({ title: "Clear queue", body: `Remove ${items.length} queued message(s)?`, confirm: "Clear", danger: true })) setList(k4, []);
              }),
              ui.iconButton(collapsed ? ["M18 15l-6-6-6 6"] : I3.chevronDown, "Toggle queued messages", () => {
                collapsed = !collapsed;
                render();
              })
            ),
            ...collapsed ? [] : [h4("div", { class: "ggpp-q-list" }, items.map((it, i3) => row(k4, it, i3, items)))]
          );
        }
      }
      ctx.cleanup(
        gemini.watch(gemini.SEL.composer, (composer) => {
          const tray = h4("div", { class: "ggpp-q", hidden: true, role: "region", "aria-label": "Queued messages" });
          composer.before(tray);
          tray.style.setProperty("--ggpp-q-width", `${composer.offsetWidth || 760}px`);
          trays.add(tray);
          render();
          const ro = new ResizeObserver(() => composer.offsetWidth && tray.style.setProperty("--ggpp-q-width", `${composer.offsetWidth}px`));
          ro.observe(composer);
          return () => {
            ro.disconnect();
            tray.remove();
            trays.delete(tray);
          };
        })
      );
      ctx.on("gemini:generating", () => render());
      ctx.on("settings:betterQueue", () => {
        save2();
        render();
      });
    }
  });

  // sites/gemini/plugins/betterQuotes/index.ts
  var HIGHLIGHT_MS = 1800;
  var norm = (s3) => s3.replace(/^[\s>*\-•\d.]+/gm, "").replace(/\s+/g, " ").trim().toLowerCase();
  var betterQuotes_default = definePlugin({
    id: "betterQuotes",
    name: "BetterQuotes",
    description: "Quote selected reply text into your message, and click quoted lines to jump back to the passage.",
    tags: ["Messages", "Composer"],
    icon: I3.quote,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      quoteButton: { type: "boolean", label: "Quote button", description: "Show a Quote button when you select text in a reply.", default: true },
      jumpToPassage: { type: "boolean", label: "Jump to passage", description: "Click a quoted line in your message to jump to where it came from.", default: true }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const supportsHighlights = typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight !== "undefined";
      ctx.css(`
      .ggpp-quote-btn {
        position: fixed; z-index: 2147482500; display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px;
        border: 0; border-radius: 16px; background: var(--ggpp-fg); color: var(--ggpp-bg); box-shadow: var(--ggpp-shadow);
        font: 500 13px/18px var(--ggpp-font); cursor: pointer;
      }
      .ggpp-quote-btn[hidden] { display: none; }
      ::highlight(ggpp-quote) { background-color: color-mix(in srgb, #f59e0b 45%, transparent); }
      .ggpp-quote-box { outline: 2px solid #f59e0b; outline-offset: 3px; border-radius: 6px; }
      @media (prefers-reduced-motion: reduce) { .ggpp-quote-box { outline: none; background: rgb(127 127 127 / 14%); } }
      ${ctx.settings.jumpToPassage ? "user-query :is(.ggpp-uq, .ggpp-quote-line) { cursor: pointer; }" : ""}
    `);
      if (ctx.settings.quoteButton) {
        const btn = h4("button", { class: "ggpp-quote-btn", type: "button", hidden: true }, icon(I3.quote, 14), "Quote");
        document.body.append(btn);
        ctx.cleanup(() => btn.remove());
        let pending = "";
        const place = () => {
          const sel = getSelection();
          const text = sel?.toString().trim() ?? "";
          const node = sel?.rangeCount ? sel.getRangeAt(0).commonAncestorContainer : null;
          const inReply = (node instanceof Element ? node : node?.parentElement)?.closest(gemini.SEL.modelResponse);
          if (!text || !inReply || sel.isCollapsed) {
            btn.hidden = true;
            return;
          }
          pending = text;
          const r3 = sel.getRangeAt(0).getBoundingClientRect();
          btn.hidden = false;
          btn.style.left = `${Math.min(innerWidth - 100, Math.max(8, r3.left + r3.width / 2 - 40))}px`;
          btn.style.top = `${r3.top > 48 ? r3.top - 40 : r3.bottom + 8}px`;
        };
        document.addEventListener("mouseup", () => setTimeout(place, 10), { signal: ctx.signal });
        document.addEventListener("keyup", (e3) => e3.shiftKey && place(), { signal: ctx.signal });
        document.addEventListener("scroll", () => btn.hidden = true, { capture: true, passive: true, signal: ctx.signal });
        btn.addEventListener("mousedown", (e3) => e3.preventDefault());
        btn.addEventListener("click", () => {
          const quoted = pending.split("\n").map((l3) => l3.trim()).filter(Boolean).map((l3) => `> ${l3}`).join("\n");
          const existing = gemini.editorText().trim();
          gemini.setEditorText(`${existing ? `${existing}

` : ""}${quoted}

`);
          btn.hidden = true;
          getSelection()?.removeAllRanges();
        });
      }
      if (!ctx.settings.jumpToPassage) return;
      ctx.cleanup(
        gemini.watch(`${gemini.SEL.userQuery} ${gemini.SEL.userLine}`, (line) => {
          if (/^\s*>/.test(line.textContent ?? "")) line.classList.add("ggpp-quote-line");
          return () => line.classList.remove("ggpp-quote-line");
        })
      );
      function highlight(target2, needle) {
        const scroller = gemini.scroller();
        const ranges = [];
        if (supportsHighlights) {
          const key = norm(needle).slice(0, 48);
          const walker = document.createTreeWalker(target2, NodeFilter.SHOW_TEXT);
          for (let n2 = walker.nextNode(); n2; n2 = walker.nextNode()) {
            const text = n2.textContent ?? "";
            if (text.trim().length < 3) continue;
            const t3 = norm(text);
            if (t3 && (key.includes(t3.slice(0, 24)) || t3.includes(key.slice(0, 24)))) {
              const r3 = document.createRange();
              r3.selectNodeContents(n2);
              ranges.push(r3);
            }
          }
        }
        const anchor = ranges[0]?.startContainer.parentElement ?? target2;
        anchor.scrollIntoView({ block: "center" });
        if (scroller) {
          const sr = scroller.getBoundingClientRect();
          const composerTop = gemini.composer()?.getBoundingClientRect().top ?? sr.bottom;
          const mid = (sr.top + Math.min(sr.bottom, composerTop)) / 2;
          const ar = anchor.getBoundingClientRect();
          const delta = ar.top + ar.height / 2 - mid;
          if (Math.abs(delta) > 24) scroller.scrollBy({ top: delta });
        }
        if (ranges.length) {
          const hl = new Highlight(...ranges);
          CSS.highlights.set("ggpp-quote", hl);
          setTimeout(() => CSS.highlights.get("ggpp-quote") === hl && CSS.highlights.delete("ggpp-quote"), HIGHLIGHT_MS);
        } else {
          anchor.classList.add("ggpp-quote-box");
          setTimeout(() => anchor.classList.remove("ggpp-quote-box"), HIGHLIGHT_MS);
        }
      }
      function jump(fromUser, needle) {
        const key = norm(needle).slice(0, 48);
        if (key.length < 6) return false;
        const msgs = gemini.messages();
        const upto = msgs.findIndex((m3) => m3.el === fromUser);
        let best = null;
        for (const m3 of msgs.slice(0, upto < 0 ? msgs.length : upto)) {
          if (m3.role !== "model") continue;
          const text = norm(m3.text);
          let score2 = 0;
          for (let len = key.length; len >= 6; len = Math.floor(len * 0.75)) {
            if (text.includes(key.slice(0, len))) {
              score2 = len;
              break;
            }
          }
          if (score2 && (!best || score2 >= best.score)) best = { el: m3.el, score: score2 };
        }
        if (!best) return false;
        highlight(best.el, needle);
        return true;
      }
      document.addEventListener(
        "click",
        (e3) => {
          if (e3.button !== 0 || getSelection()?.toString()) return;
          const line = e3.target.closest?.("user-query :is(.ggpp-uq, .ggpp-quote-line, blockquote)");
          const user = line?.closest(gemini.SEL.userQuery);
          if (!line || !user) return;
          if (jump(user, line.textContent ?? "")) {
            e3.preventDefault();
            e3.stopPropagation();
          }
        },
        { capture: true, signal: ctx.signal }
      );
      ctx.cleanup(() => supportsHighlights && CSS.highlights.delete("ggpp-quote"));
    }
  });

  // sites/gemini/plugins/betterSidebar/index.ts
  var SECTION = (key) => `expandable-section[storagekey='${key}']`;
  var sleep3 = (ms) => new Promise((r3) => setTimeout(r3, ms));
  async function waitFor(find2, ms = 3e3) {
    const end = Date.now() + ms;
    for (; ; ) {
      const el = find2();
      if (el) return el;
      if (Date.now() > end) return null;
      await sleep3(80);
    }
  }
  var betterSidebar_default = definePlugin({
    id: "betterSidebar",
    name: "BetterSidebar",
    description: "Side panel tweaks: hover-only header actions, a new-chat plus, default section states, and bulk delete of chats.",
    tags: ["Navigation", "Chats"],
    icon: I3.sidebar,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini", "ui"],
    settings: {
      titleRowHover: { type: "boolean", label: "Header actions on hover", description: "Show section header buttons (filter, add) only when hovering that section.", default: true },
      chatsPlus: { type: "boolean", label: "New chat plus", description: "Add a + to the chats header that starts a new chat.", default: true },
      notebooksDefaultCollapsed: { type: "boolean", label: "Collapse Notebooks", description: "Start with the Notebooks section collapsed on page load.", default: true },
      chatsDefaultExpanded: { type: "boolean", label: "Expand chats", description: "Start with the chats section expanded on page load.", default: false },
      clickToToggle: { type: "boolean", label: "Click to toggle", description: "Click empty space in the side panel to collapse or expand it.", default: false },
      batchSelect: { type: "boolean", label: "Bulk delete", description: "Checkboxes on chats for selecting several and deleting them together. Ctrl/⌘-click a chat to select it.", default: true }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      const s3 = ctx.settings;
      ctx.css(`
      ${s3.titleRowHover ? `@media (min-width: 48rem) {
        side-navigation-content .expandable-section-header-actions { opacity: 0; transition: opacity .15s; }
        side-navigation-content expandable-section:is(:hover, :focus-within) .expandable-section-header-actions,
        side-navigation-content .expandable-section-header-actions:has([aria-expanded='true']) { opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) { side-navigation-content .expandable-section-header-actions { transition: none; } }` : ""}
      .ggpp-sb-plus { all: unset; display: inline-grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; color: inherit; }
      .ggpp-sb-plus:hover { background: rgb(127 127 127 / 16%); }
      .ggpp-sb-check {
        position: absolute; left: 4px; top: 50%; transform: translateY(-50%); z-index: 2; width: 16px; height: 16px; margin: 0;
        accent-color: var(--ggpp-accent); cursor: pointer; opacity: 0;
      }
      gem-nav-list-item[data-test-id='conversation'] { position: relative; }
      gem-nav-list-item[data-test-id='conversation']:hover .ggpp-sb-check, .ggpp-sb-check:checked, .ggpp-sb-selecting .ggpp-sb-check { opacity: 1; }
      gem-nav-list-item.ggpp-sb-selected > a { background: color-mix(in srgb, var(--ggpp-accent) 14%, transparent) !important; }
      .ggpp-sb-bar {
        display: flex; align-items: center; gap: 6px; margin: 4px 8px; padding: 6px 6px 6px 12px; border-radius: 18px;
        background: var(--ggpp-surface-2); color: var(--ggpp-fg); font: 500 12px/16px var(--ggpp-font);
      }
      .ggpp-sb-bar span { flex: 1; }
      .ggpp-sb-bar .ggpp-btn { height: 28px; padding: 0 12px; font-size: 12px; }
    `);
      const once = (key, want) => {
        const end = Date.now() + 1e4;
        const tick = () => {
          const btn = gemini.q(`${SECTION(key)} [data-test-id='expandable-section-toggle']`);
          if (btn) {
            if (btn.getAttribute("aria-expanded") === "true" !== want) btn.click();
            return;
          }
          if (Date.now() < end) ctx.setTimeout(tick, 300);
        };
        tick();
      };
      if (s3.notebooksDefaultCollapsed) once("notebooks", false);
      if (s3.chatsDefaultExpanded) once("chats", true);
      if (s3.chatsPlus) {
        ctx.cleanup(
          gemini.watch(`${SECTION("chats")} .expandable-section-header-actions`, (actions) => {
            const btn = h4(
              "button",
              {
                class: "ggpp-sb-plus",
                type: "button",
                title: "New chat",
                "aria-label": "New chat",
                onclick: (e3) => {
                  e3.stopPropagation();
                  gemini.navigate(gemini.newChatUrl());
                }
              },
              icon(I3.plus, 16)
            );
            actions.prepend(btn);
            return () => btn.remove();
          })
        );
      }
      if (s3.clickToToggle) {
        document.addEventListener(
          "click",
          (e3) => {
            const t3 = e3.target;
            const nav = t3.closest?.(gemini.SEL.sidenav);
            if (!nav || t3.closest("a, button, input, textarea, [role='button'], [role='menuitem'], sidenav-mavatar-footer, .ggpp-sb-bar")) return;
            if (getSelection()?.toString()) return;
            gemini.toggleSidenav();
          },
          { signal: ctx.signal }
        );
      }
      if (!s3.batchSelect) return;
      const selected = /* @__PURE__ */ new Set();
      let bar = null;
      const rowId = (row) => row.querySelector(gemini.SEL.conversationLink)?.href.match(/\/([0-9a-f]{8,})(?:[/?#]|$)/i)?.[1] ?? null;
      const rowFor = (id) => gemini.qa(gemini.SEL.conversationRow).find((r3) => rowId(r3) === id) ?? null;
      function sync3() {
        for (const row of gemini.qa(gemini.SEL.conversationRow)) {
          const id = rowId(row);
          const on3 = !!id && selected.has(id);
          row.classList.toggle("ggpp-sb-selected", on3);
          const box = row.querySelector(".ggpp-sb-check");
          if (box) box.checked = on3;
        }
        gemini.sidenav()?.classList.toggle("ggpp-sb-selecting", selected.size > 0);
        if (!selected.size) {
          bar?.remove();
          bar = null;
          return;
        }
        if (!bar) {
          bar = h4(
            "div",
            { class: "ggpp-sb-bar", role: "toolbar" },
            h4("span"),
            ui.button("Cancel", () => (selected.clear(), sync3()), "ghost"),
            ui.button("Delete", () => void remove(), "danger")
          );
        }
        bar.querySelector("span").textContent = `Selected · ${selected.size}`;
        const header = gemini.q(`${SECTION("chats")} .expandable-section-header-row`);
        if (header && bar.nextElementSibling !== header) header.before(bar);
      }
      function toggle(id) {
        if (selected.has(id)) selected.delete(id);
        else selected.add(id);
        sync3();
      }
      async function remove() {
        const ids = [...selected];
        const n2 = ids.length;
        if (!await ui.confirm({
          title: "Delete conversations",
          body: `Are you sure you want to delete ${n2} conversation${n2 === 1 ? "" : "s"}? This cannot be undone.`,
          confirm: "Delete",
          danger: true
        }))
          return;
        selected.clear();
        sync3();
        if (ids.includes(gemini.route().conversationId ?? "")) gemini.navigate(gemini.newChatUrl());
        let failed2 = 0;
        for (const id of ids) {
          try {
            const row = await waitFor(() => rowFor(id));
            const menuBtn = row?.querySelector(`${gemini.SEL.rowMenuButton} button, ${gemini.SEL.rowMenuButton}`);
            if (!menuBtn) throw new Error("row menu not found");
            menuBtn.click();
            const del = await waitFor(() => document.querySelector("gem-menu-item[data-test-id='delete-button'], [role='menuitem'][data-test-id='delete-button']"));
            if (!del) throw new Error("delete item not found");
            del.click();
            const confirm = await waitFor(() => document.querySelector("[data-test-id='confirm-button']"));
            if (!confirm) throw new Error("confirm button not found");
            confirm.click();
            await waitFor(() => rowFor(id) ? null : document.body, 4e3);
          } catch (e3) {
            failed2++;
            ctx.log.warn(`could not delete ${id}`, e3);
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
            await sleep3(300);
          }
        }
        ui.toast({ title: failed2 ? `Deleted ${n2 - failed2} of ${n2}` : `Deleted ${n2} conversation${n2 === 1 ? "" : "s"}`, icon: failed2 ? I3.x : I3.trash });
      }
      ctx.cleanup(
        gemini.watch(gemini.SEL.conversationRow, (row) => {
          const box = h4("input", {
            type: "checkbox",
            class: "ggpp-sb-check",
            "aria-label": "Select conversation",
            onclick: (e3) => {
              e3.stopPropagation();
              const id = rowId(row);
              if (id) toggle(id);
            }
          });
          row.append(box);
          sync3();
          return () => box.remove();
        })
      );
      document.addEventListener(
        "click",
        (e3) => {
          if (!(e3.ctrlKey || e3.metaKey)) return;
          const row = e3.target.closest?.(gemini.SEL.conversationRow);
          const id = row && rowId(row);
          if (!id) return;
          e3.preventDefault();
          e3.stopPropagation();
          toggle(id);
        },
        { capture: true, signal: ctx.signal }
      );
      ctx.cleanup(() => {
        selected.clear();
        bar?.remove();
        gemini.qa(".ggpp-sb-selected").forEach((r3) => r3.classList.remove("ggpp-sb-selected"));
        gemini.sidenav()?.classList.remove("ggpp-sb-selecting");
      });
    }
  });

  // sites/gemini/plugins/chatBar/index.ts
  var MODE_BUTTON = "[data-test-id='bard-mode-menu-button']";
  var chatBar_default = definePlugin({
    id: "chatBar",
    name: "Composer Buttons",
    description: "Lets plugins add buttons to the message box toolbar.",
    tags: [],
    required: true,
    hidden: true,
    dependencies: ["gemini"],
    start(ctx) {
      const gemini = ctx.use("gemini");
      const buttons = /* @__PURE__ */ new Map();
      const bars = /* @__PURE__ */ new Set();
      ctx.css(`
      .ggpp-chatbar { display: inline-flex; align-items: center; gap: 2px; margin-inline: 4px; }
      .ggpp-chatbar:empty { display: none; }
      .ggpp-chatbar-btn {
        all: unset; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: 4px;
        min-width: 36px; height: 36px; padding: 0 8px; border-radius: 18px; cursor: pointer;
        color: var(--gem-sys-color--on-surface-variant, currentColor); font: 500 13px/1 "Google Sans", sans-serif;
      }
      .ggpp-chatbar-btn:hover, .ggpp-chatbar-btn.ggpp-active { background: rgb(127 127 127 / 14%); }
      .ggpp-chatbar-btn:focus-visible { outline: 2px solid #0b57d0; }
      .ggpp-chatbar-btn span:empty { display: none; }
    `);
      function render(bar) {
        const list2 = [...buttons.values()].sort((a3, b3) => (a3.order ?? 0) - (b3.order ?? 0));
        bar.replaceChildren(
          ...list2.map((b3) => {
            const el = h4(
              "button",
              {
                class: `ggpp-chatbar-btn${b3.active?.() ? " ggpp-active" : ""}`,
                type: "button",
                title: typeof b3.title === "string" ? b3.title : "",
                "aria-label": b3.title,
                dataset: { ggppButton: b3.id },
                onclick: (e3) => {
                  e3.preventDefault();
                  e3.stopPropagation();
                  try {
                    b3.onClick(e3, el);
                  } catch (err) {
                    ctx.log.error(`button ${b3.id} failed`, err);
                  }
                }
              },
              b3.render ? b3.render() : icon(b3.icon, 20),
              h4("span", null, b3.text?.() ?? "")
            );
            return el;
          })
        );
      }
      const refresh = () => bars.forEach(render);
      ctx.cleanup(
        gemini.watch(gemini.SEL.composer, (composer) => {
          if (composer.parentElement?.closest(gemini.SEL.composer)) return;
          const bar = h4("div", { class: "ggpp-chatbar" });
          const place = () => {
            const mode = composer.querySelector(MODE_BUTTON);
            const host2 = mode ? mode.closest("bard-mode-switcher, .model-picker-container") ?? mode : null;
            if (host2) {
              if (host2.previousElementSibling !== bar) host2.before(bar);
            } else if (!bar.isConnected) {
              composer.querySelector(gemini.SEL.trailingActions)?.prepend(bar);
            }
          };
          place();
          bars.add(bar);
          render(bar);
          const mo3 = new MutationObserver(place);
          mo3.observe(composer, { childList: true, subtree: true });
          return () => {
            mo3.disconnect();
            bars.delete(bar);
            bar.remove();
          };
        })
      );
      ctx.cleanup(() => {
        bars.forEach((b3) => b3.remove());
        bars.clear();
      });
      ctx.provide("chatBar", {
        register(b3) {
          buttons.set(b3.id, b3);
          refresh();
          return () => {
            buttons.delete(b3.id);
            refresh();
          };
        },
        refresh
      });
    }
  });

  // sites/gemini/plugins/chatListStatus/index.ts
  var chatListStatus_default = definePlugin({
    id: "chatListStatus",
    name: "ChatListStatus",
    description: "Mark chats in the side panel that are replying, finished while you were away, or ended with an error.",
    tags: ["Chats", "Notifications"],
    icon: I3.list,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    start(ctx) {
      const gemini = ctx.use("gemini");
      const status = /* @__PURE__ */ new Map();
      ctx.css(`
      .ggpp-cls { position: absolute; right: 36px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; border-radius: 50%; pointer-events: none; z-index: 1; }
      .ggpp-cls[data-s="done"] { background: #3b82f6; }
      .ggpp-cls[data-s="error"] { background: #ef4444; }
      .ggpp-cls[data-s="live"] { width: 10px; height: 10px; border: 2px solid #3b82f6; border-right-color: transparent; animation: ggpp-cls-spin .8s linear infinite; }
      gem-nav-list-item[data-test-id='conversation']:hover .ggpp-cls { display: none; }
      @keyframes ggpp-cls-spin { to { transform: translateY(-50%) rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) { .ggpp-cls[data-s="live"] { animation: none; border-right-color: #3b82f6; } }
    `);
      const idOf = (row) => row.querySelector(gemini.SEL.conversationLink)?.href.match(/\/([0-9a-f]{8,})(?:[/?#]|$)/i)?.[1] ?? null;
      function paint() {
        for (const row of gemini.qa(gemini.SEL.conversationRow)) {
          const id = idOf(row);
          const s3 = id ? status.get(id) : void 0;
          let mark = row.querySelector(":scope > .ggpp-cls");
          if (!s3) {
            mark?.remove();
            continue;
          }
          if (!mark) {
            mark = h4("span", { class: "ggpp-cls", "aria-hidden": "true" });
            row.append(mark);
          }
          mark.dataset.s = s3;
          mark.title = s3 === "live" ? "Replying…" : s3 === "done" ? "New reply" : "Ended with an error";
        }
      }
      const set = (id, s3) => {
        if (!id) return;
        if (s3) status.set(id, s3);
        else status.delete(id);
        paint();
      };
      ctx.on("gemini:response-start", (e3) => set(e3.conversationId, "live"));
      ctx.on("gemini:stream-start", (e3) => e3.conversationId !== gemini.route().conversationId && set(e3.conversationId, "live"));
      ctx.on("gemini:response-left", (e3) => set(e3.conversationId, "live"));
      ctx.on("gemini:response-lost", (e3) => status.get(e3.conversationId ?? "") === "live" && set(e3.conversationId, null));
      ctx.on("gemini:response-elsewhere", (e3) => set(e3.conversationId, e3.error ? "error" : "done"));
      ctx.on("gemini:response-end", (e3) => {
        const open = e3.conversationId === gemini.route().conversationId && !e3.hidden;
        set(e3.conversationId, e3.error ? "error" : open || e3.interrupted ? null : "done");
      });
      ctx.on("gemini:route", () => {
        const id = gemini.route().conversationId;
        if (id && status.get(id) !== "live") set(id, null);
      });
      ctx.setInterval(() => {
        const id = gemini.route().conversationId;
        if (id && status.get(id) === "live" && !gemini.isGenerating()) set(id, null);
      }, 2e3);
      document.addEventListener(
        "visibilitychange",
        () => {
          const id = gemini.route().conversationId;
          if (!document.hidden && id && status.get(id) === "done") set(id, null);
        },
        { signal: ctx.signal }
      );
      ctx.cleanup(gemini.watch(gemini.SEL.conversationRow, () => void nextFrame(paint)));
      ctx.cleanup(() => document.querySelectorAll(".ggpp-cls").forEach((n2) => n2.remove()));
    }
  });

  // sites/gemini/plugins/chatStateFavicons/index.ts
  var COLORS2 = {
    rotate: "#3B82F6",
    done: "#22C55E",
    ready: "#F59E0B",
    error: "#EF4444"
  };
  var EMOJI = { rotate: "🔄", done: "✔️", ready: "👍", error: "🚫" };
  var SPARK = "M32 6C32 21 43 32 58 32C43 32 32 43 32 58C32 43 21 32 6 32C21 32 32 21 32 6Z";
  var GRADIENT = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".6" stop-color="#9B72CB"/><stop offset="1" stop-color="#D96570"/></linearGradient>`;
  var GLYPH = {
    rotate: `<path d="M45 49a6 6 0 1 0 6-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 51 49" to="360 51 49" dur=".85s" repeatCount="indefinite"/></path>`,
    done: `<path d="M46 49l4 4 7-8" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`,
    ready: `<path d="M51 56V43M45.5 48.5L51 43l5.5 5.5" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`,
    error: `<path d="M46.5 44.5l9 9M55.5 44.5l-9 9" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>`
  };
  function svgFor(style, state3) {
    const wrap2 = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs>${GRADIENT}</defs>${body}</svg>`;
    if (style === "original") {
      return state3 === "idle" ? null : wrap2(`<text x="32" y="50" font-size="48" text-anchor="middle">${EMOJI[state3]}</text>`);
    }
    const color = state3 === "idle" ? "" : COLORS2[state3];
    const tile = (fill) => `<rect width="64" height="64" rx="16" fill="${fill}"/>`;
    switch (style) {
      case "hole":
        return wrap2(`${tile("#131314")}<path d="${SPARK}" fill="${color || "url(#g)"}" transform="translate(6 6) scale(.81)"/>`);
      case "bg":
        return wrap2(`${tile(color || "#131314")}<path d="${SPARK}" fill="${color ? "#fff" : "url(#g)"}" transform="translate(6 6) scale(.81)"/>`);
      case "dot":
        return wrap2(
          `<path d="${SPARK}" fill="url(#g)"/>${color ? `<circle cx="50" cy="50" r="11" fill="#131314"/><circle cx="50" cy="50" r="8" fill="${color}"/>` : ""}`
        );
      case "badge":
        return wrap2(
          `<path d="${SPARK}" fill="url(#g)"/>${state3 === "idle" ? "" : `<circle cx="51" cy="49" r="13" fill="#131314"/><circle cx="51" cy="49" r="10.5" fill="${color}"/>${GLYPH[state3]}`}`
        );
      default:
        return null;
    }
  }
  var chatStateFavicons_default = definePlugin({
    id: "chatStateFavicons",
    name: "ChatStateFavicons",
    description: "The tab icon shows the chat's state: generating, done, draft ready or error.",
    tags: ["Notifications"],
    icon: I3.favicon,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      style: {
        type: "select",
        label: "Style",
        description: "How the state is drawn on the Gemini spark.",
        default: "badge",
        options: [
          { value: "badge", label: "Badge + glyph" },
          { value: "dot", label: "Color dot" },
          { value: "hole", label: "Spark tint" },
          { value: "bg", label: "Background tint" },
          { value: "original", label: "Emoji only" }
        ]
      }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const style = ctx.settings.style;
      let conversation = gemini.route().conversationId;
      let typedSinceSwitch = true;
      let justFinished = false;
      let lastError = false;
      let interrupted = false;
      let current3 = null;
      let link = null;
      const original = [...document.querySelectorAll("link[rel~='icon']")].map((l3) => ({ el: l3, href: l3.href }));
      const hasDraft = () => !!gemini.editorText().replace(/​/g, "").trim();
      function compute() {
        const generating = gemini.isGenerating();
        const draft = hasDraft() && typedSinceSwitch;
        if (interrupted && !generating) return draft ? "ready" : "idle";
        if (lastError && !generating) return "error";
        if (generating) return draft ? "ready" : "rotate";
        if (justFinished) {
          if (!hasDraft()) return "done";
          justFinished = false;
          return "ready";
        }
        return draft ? "ready" : "idle";
      }
      function apply2(state3) {
        if (state3 === current3 && link?.isConnected) return;
        current3 = state3;
        const svg3 = svgFor(style, state3);
        if (!svg3) {
          link?.remove();
          link = null;
          for (const o3 of original) {
            o3.el.href = o3.href;
            if (!o3.el.isConnected) document.head.append(o3.el);
          }
          return;
        }
        for (const l3 of document.querySelectorAll("link[rel~='icon']")) if (l3 !== link) l3.remove();
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          link.type = "image/svg+xml";
          link.dataset.ggpp = "favicon";
        }
        link.dataset.href = `data:image/svg+xml,${encodeURIComponent(svg3)}`;
        link.setAttribute("href", link.dataset.href);
        if (!link.isConnected) document.head.append(link);
      }
      let queued = false;
      const update = () => {
        if (queued) return;
        queued = true;
        nextFrame(() => {
          queued = false;
          apply2(compute());
        });
      };
      ctx.on("gemini:generating", (on3) => {
        if (on3) {
          lastError = false;
          interrupted = false;
          justFinished = false;
        }
        update();
      });
      ctx.on("gemini:response-end", (e3) => {
        if (e3.conversationId !== gemini.route().conversationId) return;
        lastError = !!e3.error;
        interrupted = !!e3.interrupted;
        justFinished = !e3.error && !e3.interrupted;
        apply2(compute());
      });
      ctx.on("gemini:route", () => {
        const id = gemini.route().conversationId;
        if (id === conversation) return;
        conversation = id;
        typedSinceSwitch = false;
        justFinished = false;
        lastError = false;
        interrupted = false;
        update();
      });
      const onInput = (e3) => {
        if (!gemini.editor()?.contains(e3.target)) return;
        typedSinceSwitch = true;
        update();
      };
      document.addEventListener("input", onInput, { capture: true, signal: ctx.signal });
      document.addEventListener("compositionend", onInput, { capture: true, signal: ctx.signal });
      const mo3 = new MutationObserver(() => {
        const ours = link?.dataset.href;
        if (link && (!link.isConnected || link.getAttribute("href") !== ours || document.querySelectorAll("link[rel~='icon']").length > 1)) {
          current3 = null;
          update();
        }
      });
      mo3.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "rel"] });
      ctx.cleanup(() => mo3.disconnect());
      ctx.setInterval(() => document.hidden && apply2(compute()), 1e3);
      apply2(compute());
      ctx.cleanup(() => {
        link?.remove();
        for (const o3 of original) {
          o3.el.href = o3.href;
          if (!o3.el.isConnected) document.head.append(o3.el);
        }
      });
    }
  });

  // sites/gemini/plugins/cleaner/index.ts
  var RULES = {
    hideUpgrade: [
      "[data-test-id='desktop-upgrade-tier2-button']",
      "[data-test-id*='upgrade' i]",
      "[data-test-id*='upsell' i]",
      "top-bar-actions .buttons-container.adv-upsell"
    ],
    hidePromoGreeting: ["new-model-promo-greeting .greeting-container > :not(.ggpp-greeting)"],
    hideGetApp: ["desktop-get-app-button", "[data-test-id='desktop-get-app-button']"],
    hideBanners: ["remy-access-restricted-banner", "condensed-tos-disclaimer", "[data-test-id*='promo' i]", ".promo-banner"],
    hideLockedModels: [
      "[data-test-id^='bard-mode-option-']:has([data-test-id*='upsell' i], [fonticon='lock'])",
      "[data-test-id^='bard-mode-option-'][aria-disabled='true']"
    ],
    /** Composer-only (acceptance/dom: tag under input-container). */
    hideDisclaimer: ["input-container hallucination-disclaimer"]
  };
  function buildCleanerHideCss(settings2) {
    const on3 = Object.keys(RULES).filter((k4) => settings2[k4]);
    if (!on3.length) return null;
    return `${on3.flatMap((k4) => RULES[k4]).join(",\n")} { display: none !important; }`;
  }
  function installCleanerStyles(ctx) {
    const style = ctx.css("");
    const apply2 = () => {
      style.textContent = buildCleanerHideCss(ctx.settings) ?? "";
    };
    apply2();
    ctx.on("settings:cleaner", apply2);
    return { style, apply: apply2 };
  }
  var cleaner_default = definePlugin({
    id: "cleaner",
    name: "Cleaner",
    description: "Hide upgrade prompts, promo banners and locked models.",
    tags: ["Declutter"],
    icon: I3.brush,
    enabledByDefault: true,
    updated: "2026-10-14",
    liveSettings: true,
    settings: {
      hideUpgrade: { type: "boolean", label: "Upgrade buttons", description: "The Upgrade / Google AI plan buttons and links.", default: true },
      hidePromoGreeting: { type: "boolean", label: "Home promo", description: `The new-model promo headline and "Let's go" button on the home screen.`, default: true },
      hideGetApp: { type: "boolean", label: "Get app button", description: 'The "Get app" promo in the top bar.', default: true },
      hideBanners: { type: "boolean", label: "Promo banners", description: "Promotional banners and cards.", default: true },
      hideLockedModels: { type: "boolean", label: "Locked models", description: "Models you cannot use (upgrade gated) in the model picker.", default: true },
      hideDisclaimer: { type: "boolean", label: "Disclaimer line", description: 'The "Gemini is AI and can make mistakes" line under the message box.', default: true }
    },
    start(ctx) {
      installCleanerStyles(ctx);
    }
  });

  // sites/gemini/plugins/completeToast/index.ts
  var completeToast_default = definePlugin({
    id: "completeToast",
    name: "CompleteToast",
    description: "Show a toast when a reply finishes in a chat you left or while the tab was hidden. Click it to open the chat.",
    tags: ["Notifications"],
    icon: I3.check,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini", "ui"],
    settings: {
      keepUntilDismissed: { type: "boolean", label: "Keep until dismissed", description: "Don't auto-close the toast. Dismiss with ×, or by opening the chat.", default: false },
      duration: {
        type: "number",
        label: "Duration",
        description: "Seconds before the toast closes.",
        default: 6,
        min: 1,
        max: 20,
        slider: true,
        unit: "s",
        showIf: (v3) => !v3.keepUntilDismissed
      },
      showPreview: { type: "boolean", label: "Show preview", description: "Show a short preview of the finished reply.", default: true },
      whenHidden: { type: "boolean", label: "Hidden tab", description: "Also toast when the open chat finishes while this tab is in the background.", default: true }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      let card = null;
      ctx.css(`
      .ggpp-ct {
        position: fixed; top: 3.5rem; right: 1rem; z-index: 2147482500; width: min(22rem, calc(100vw - 1.5rem));
        display: flex; align-items: stretch; border: 1px solid var(--ggpp-border-soft); border-radius: .75rem;
        background: var(--ggpp-bg); color: var(--ggpp-fg); box-shadow: var(--ggpp-shadow); font-family: var(--ggpp-font);
        animation: ggpp-ct-in .18s ease-out;
      }
      .ggpp-ct:hover, .ggpp-ct:focus-within { background: var(--ggpp-surface); }
      .ggpp-ct-main { all: unset; flex: 1; min-width: 0; display: flex; gap: 10px; padding: 12px 4px 12px 14px; cursor: pointer; }
      .ggpp-ct-main .ggpp-icon { color: var(--ggpp-ok); margin-top: 2px; }
      .ggpp-ct-text { min-width: 0; flex: 1; }
      .ggpp-ct-title { font: 600 .875rem/1.25rem var(--ggpp-font); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-ct-body { font-size: .75rem; line-height: 1rem; color: var(--ggpp-fg-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-ct-x { all: unset; padding: 8px; cursor: pointer; opacity: .55; align-self: flex-start; }
      .ggpp-ct-x:hover { opacity: 1; }
      @keyframes ggpp-ct-in { from { opacity: 0; transform: translateY(-.4rem); } }
      @media (prefers-reduced-motion: reduce) { .ggpp-ct { animation: none; } }
    `);
      function hide() {
        if (!card) return;
        clearTimeout(card.timer);
        card.el.remove();
        card = null;
      }
      ctx.cleanup(hide);
      function arm() {
        if (!card) return;
        clearTimeout(card.timer);
        if (ctx.settings.keepUntilDismissed) return;
        card.started = Date.now();
        card.timer = setTimeout(hide, card.remaining);
      }
      function show(id, title, text) {
        const body = ctx.settings.showPreview && preview(text) || "Response ready";
        const name = truncate(title.replace(/\s+/g, " ").trim(), 48) || "Chat";
        if (card && card.id === id) {
          card.el.querySelector(".ggpp-ct-title").textContent = name;
          card.el.querySelector(".ggpp-ct-body").textContent = body;
          return;
        }
        hide();
        const el = h4(
          "div",
          { class: "ggpp-ct", role: "status", "aria-live": "polite" },
          h4(
            "button",
            {
              class: "ggpp-ct-main",
              type: "button",
              onclick: () => {
                hide();
                if (id) gemini.navigate(`${gemini.newChatUrl()}/${id}`);
              }
            },
            icon(I3.check, 16),
            h4("span", { class: "ggpp-ct-text" }, h4("div", { class: "ggpp-ct-title" }, name), h4("div", { class: "ggpp-ct-body" }, body))
          ),
          h4("button", { class: "ggpp-ct-x", type: "button", "aria-label": "Dismiss", onclick: hide }, icon(I3.x, 14))
        );
        el.addEventListener("mouseenter", () => {
          if (!card?.timer) return;
          clearTimeout(card.timer);
          card.remaining -= Date.now() - card.started;
        });
        el.addEventListener("mouseleave", () => {
          if (!card || ctx.settings.keepUntilDismissed) return;
          if (card.remaining <= 0) hide();
          else arm();
        });
        document.body.append(el);
        card = { el, id, remaining: ctx.settings.duration * 1e3, started: Date.now() };
        arm();
      }
      ctx.on("gemini:response-elsewhere", (e3) => {
        if (e3.error || !e3.conversationId) return;
        show(e3.conversationId, e3.title, "");
      });
      ctx.on("gemini:response-end", (e3) => {
        if (!ctx.settings.whenHidden || !e3.hidden || e3.error || e3.interrupted) return;
        show(e3.conversationId, e3.title, e3.text ?? "");
      });
      ctx.on("gemini:route", () => {
        const id = gemini.route().conversationId;
        if (card && card.id === id) hide();
      });
    }
  });

  // sites/gemini/plugins/composerOpacity/index.ts
  var composerOpacity_default = definePlugin({
    id: "composerOpacity",
    name: "ComposerOpacity",
    description: "Make the message box see-through with an optional frosted blur.",
    tags: ["Composer", "Appearance"],
    dependencies: ["gemini"],
    icon: I3.blend,
    enabledByDefault: true,
    updated: "2026-10-14",
    settings: {
      opacity: { type: "number", label: "Opacity", description: "Background opacity of the message box. 100 is fully opaque.", default: 100, min: 0, max: 100, slider: true, unit: "%" },
      blur: { type: "number", label: "Blur", description: "Backdrop blur in pixels; used when opacity is below 100.", default: 16, min: 0, max: 40, slider: true, unit: "px" }
    },
    start(ctx) {
      const { opacity, blur } = ctx.settings;
      if (opacity >= 100) return;
      const gemini = ctx.use("gemini");
      ctx.cleanup(
        gemini.watch("input-area-v2", (box) => {
          const r3 = getComputedStyle(box).borderTopLeftRadius;
          if (r3 && r3 !== "0px") box.style.setProperty("--ggpp-composer-radius", r3);
          return () => box.style.removeProperty("--ggpp-composer-radius");
        })
      );
      ctx.css(`
      input-container.input-gradient, input-container, input-container .input-area-container, input-area-v2 { background: transparent !important; box-shadow: none !important; }
      input-container::before, input-container::after { background: none !important; }
      input-area-v2 { overflow: clip; }
      input-area-v2 .input-area {
        border-radius: var(--ggpp-composer-radius, 32px) !important;
        background-color: color-mix(in srgb, var(--gem-sys-color--surface-container, var(--ggpp-surface)) ${opacity}%, transparent) !important;
        ${blur > 0 ? `backdrop-filter: blur(${blur}px) !important;` : ""}
      }
    `);
    }
  });

  // sites/gemini/plugins/customGreeting/index.ts
  var customGreeting_default = definePlugin({
    id: "customGreeting",
    name: "CustomGreeting",
    description: "Replace the home greeting with your own phrases, rotating per visit, on a timer, or on click.",
    tags: ["Appearance"],
    icon: I3.message,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      phrases: {
        type: "list",
        label: "Phrases",
        description: "One greeting per row. Empty keeps Gemini's own.",
        placeholder: "What are we making today?",
        default: ["Stay hungry, stay foolish.", "The best way to predict the future is to invent it.", "Simplicity is the ultimate sophistication."]
      },
      mode: {
        type: "select",
        label: "Rotate",
        description: "When the greeting changes to the next phrase.",
        default: "refresh",
        options: [
          { value: "refresh", label: "Each visit to home" },
          { value: "interval", label: "On a timer" },
          { value: "manual", label: "When I click it" }
        ]
      },
      order: {
        type: "select",
        label: "Order",
        default: "sequential",
        options: [
          { value: "sequential", label: "Sequential" },
          { value: "random", label: "Random" }
        ]
      },
      intervalSec: { type: "number", label: "Timer", description: "Seconds between changes.", default: 10, min: 1, max: 3600, unit: "s", showIf: (v3) => v3.mode === "interval" },
      placeholder: { type: "boolean", label: "Message box placeholder", description: "Also show the current phrase as the message box placeholder.", default: false }
    },
    async start(ctx) {
      const gemini = ctx.use("gemini");
      const phrases = coerceListSetting(ctx.settings.phrases).map((p3) => p3.trim()).filter(Boolean);
      if (!phrases.length) return;
      let index = await ctx.data.get("index", -1);
      ctx.css(`
      .ggpp-greet-hidden { display: none !important; }
      .ggpp-greeting { margin: 0; text-align: center; white-space: pre-wrap; overflow-wrap: anywhere; }
      .ggpp-greeting.ggpp-clickable { cursor: pointer; user-select: text; }
    `);
      const next = () => {
        if (phrases.length === 1) index = 0;
        else if (ctx.settings.order === "random") {
          let n2 = index;
          while (n2 === index) n2 = Math.floor(Math.random() * phrases.length);
          index = n2;
        } else index = (index + 1) % phrases.length;
        void ctx.data.set("index", index);
        paint();
      };
      const views = /* @__PURE__ */ new Set();
      function paint() {
        const text = phrases[Math.max(0, index) % phrases.length];
        views.forEach((v3) => v3.textContent = text);
        if (ctx.settings.placeholder) {
          const ed = gemini.editor();
          if (ed && ed.dataset.placeholder !== text) {
            ed.dataset.ggppPlaceholder ??= ed.dataset.placeholder ?? "";
            ed.dataset.placeholder = text;
          }
        }
      }
      ctx.cleanup(
        gemini.watch(gemini.SEL.greeting, (orig) => {
          if (orig.classList.contains("ggpp-greeting") || orig.previousElementSibling?.classList.contains("ggpp-greeting")) return;
          const classes2 = [...orig.classList].filter((c3) => !c3.startsWith("ggpp-") && c3 !== "greeting-headline").join(" ");
          const view = h4("h1", {
            class: `ggpp-greeting ${classes2}${ctx.settings.mode === "manual" && phrases.length > 1 ? " ggpp-clickable" : ""}`,
            onclick: () => {
              if (ctx.settings.mode !== "manual" || getSelection()?.toString()) return;
              next();
            }
          });
          const cs = getComputedStyle(orig);
          Object.assign(view.style, { font: cs.font, color: cs.color, letterSpacing: cs.letterSpacing, margin: cs.margin });
          orig.classList.add("ggpp-greet-hidden");
          orig.before(view);
          views.add(view);
          paint();
          return () => {
            view.remove();
            views.delete(view);
            orig.classList.remove("ggpp-greet-hidden");
          };
        })
      );
      ctx.cleanup(() => {
        const ed = gemini.editor();
        if (ed?.dataset.ggppPlaceholder !== void 0) {
          ed.dataset.placeholder = ed.dataset.ggppPlaceholder;
          delete ed.dataset.ggppPlaceholder;
        }
      });
      if (index < 0 || ctx.settings.mode === "refresh") next();
      ctx.on("gemini:route", ({ route, prev }) => {
        if (ctx.settings.mode === "refresh" && route.isHome && !prev.isHome) next();
        else paint();
      });
      if (ctx.settings.mode === "interval" && phrases.length > 1) {
        ctx.setInterval(() => gemini.route().isHome && !document.hidden && next(), ctx.settings.intervalSec * 1e3);
      }
    }
  });

  // sites/gemini/plugins/customInstructions/index.ts
  var LIMIT = 4e3;
  var customInstructions_default = definePlugin({
    id: "customInstructions",
    name: "CustomInstructions",
    description: "Instruction presets you assign per conversation; the preset is sent in front of your messages there.",
    tags: ["Chats", "Composer"],
    icon: I3.scroll,
    updated: "2026-10-14",
    dependencies: ["gemini", "menus", "ui", "chatBar"],
    settings: {
      scope: {
        type: "select",
        label: "Send preset with",
        default: "first",
        options: [
          { value: "first", label: "The first message of the chat" },
          { value: "every", label: "Every message" }
        ]
      }
    },
    async start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      let presets = await ctx.data.get("presets", []);
      let assigned = await ctx.data.get("assigned", {});
      const save2 = () => Promise.all([ctx.data.set("presets", presets), ctx.data.set("assigned", assigned)]);
      const keyFor2 = () => gemini.route().conversationId ?? "new";
      const presetFor = (key) => presets.find((p3) => p3.id === assigned[key]);
      ctx.on("gemini:route", ({ route, prev }) => {
        if (prev.conversationId === null && route.conversationId && assigned.new) {
          assigned[route.conversationId] = assigned.new;
          delete assigned.new;
          void save2();
        }
      });
      let bypass = false;
      function intercept(e3) {
        if (bypass) return false;
        const preset = presetFor(keyFor2());
        if (!preset?.prompt.trim()) return false;
        if (ctx.settings.scope === "first" && gemini.messages().some((m3) => m3.role === "user")) return false;
        const text = gemini.editorText().trim();
        if (!text || text.startsWith(preset.prompt.trim())) return false;
        e3.preventDefault();
        e3.stopImmediatePropagation();
        gemini.setEditorText(`${preset.prompt.trim()}

---

${text}`);
        setTimeout(() => {
          bypass = true;
          gemini.send();
          bypass = false;
        }, 60);
        return true;
      }
      document.addEventListener(
        "keydown",
        (e3) => {
          if (e3.key !== "Enter" || e3.shiftKey || e3.altKey || e3.isComposing || !gemini.editor()?.contains(e3.target)) return;
          intercept(e3);
        },
        { capture: true, signal: ctx.signal }
      );
      document.addEventListener(
        "click",
        (e3) => {
          const btn = e3.target.closest?.("[data-test-id='send-button-container'] button");
          if (btn && !btn.closest(".stop")) intercept(e3);
        },
        { capture: true, signal: ctx.signal }
      );
      function chooser(key) {
        const list2 = h4("div", { style: { display: "flex", flexDirection: "column", gap: "4px" } });
        const draw = () => list2.replaceChildren(
          ...[{ id: "", name: "None" }, ...presets].map(
            (p3) => h4(
              "button",
              {
                class: "ggpp-menu-item",
                type: "button",
                onclick: () => {
                  if (p3.id) assigned[key] = p3.id;
                  else delete assigned[key];
                  void save2();
                  bar.refresh();
                  m3.close();
                  ui.toast({ title: p3.id ? `Instructions: ${p3.name}` : "Instructions removed", icon: I3.scroll, duration: 2500 });
                }
              },
              h4("span", { style: { flex: "1" } }, p3.name || "Untitled"),
              (assigned[key] ?? "") === p3.id && icon(I3.check, 16)
            )
          )
        );
        draw();
        const m3 = ui.modal({
          title: "Instructions for this chat",
          icon: I3.scroll,
          width: 380,
          content: presets.length ? list2 : h4("p", { class: "ggpp-muted" }, "No presets yet. Create one in GG++ settings → CustomInstructions.")
        });
      }
      const menus = ctx.use("menus");
      ctx.cleanup(
        menus.register({
          id: "customInstructions",
          location: "conversation",
          label: (c3) => {
            const p3 = presetFor(c3.conversationId ?? keyFor2());
            return p3 ? `Instructions: ${p3.name}` : "Instructions…";
          },
          icon: I3.scroll,
          when: () => presets.length > 0,
          onSelect: (c3) => chooser(c3.conversationId ?? keyFor2())
        })
      );
      const bar = ctx.use("chatBar");
      ctx.cleanup(
        bar.register({
          id: "customInstructions",
          icon: I3.scroll,
          title: "Instructions for this chat",
          order: 10,
          active: () => !!presetFor(keyFor2()),
          onClick: () => chooser(keyFor2())
        })
      );
      ctx.on("gemini:route", () => bar.refresh());
      ctx.provide("panel:customInstructions", (el) => {
        const draw = () => {
          el.replaceChildren(
            h4("div", { class: "ggpp-section-label" }, "Presets"),
            ...presets.map((p3) => {
              const name = h4("input", { class: "ggpp-input", value: p3.name, placeholder: "Preset name" });
              const body = h4("textarea", { class: "ggpp-input", rows: 5, value: p3.prompt, placeholder: "How should Gemini behave?" });
              const count2 = h4("div", { class: "ggpp-field-desc" });
              const sync3 = () => {
                count2.textContent = `${body.value.length}/${LIMIT}`;
                count2.style.color = body.value.length > LIMIT ? "var(--ggpp-danger)" : "";
              };
              sync3();
              name.addEventListener("change", () => (p3.name = name.value, void save2()));
              body.addEventListener("input", sync3);
              body.addEventListener("change", () => (p3.prompt = body.value, void save2()));
              return h4(
                "div",
                { class: "ggpp-card", style: { padding: "10px", gap: "6px", minHeight: "0" } },
                h4(
                  "div",
                  { style: { display: "flex", gap: "6px", alignItems: "center" } },
                  name,
                  ui.iconButton(I3.trash, "Delete", () => {
                    presets = presets.filter((x4) => x4 !== p3);
                    for (const k4 of Object.keys(assigned)) if (assigned[k4] === p3.id) delete assigned[k4];
                    void save2();
                    draw();
                  })
                ),
                body,
                count2
              );
            }),
            ui.button(
              h4("span", { style: { display: "inline-flex", gap: "6px", alignItems: "center" } }, icon(I3.plus, 16), "New preset"),
              () => {
                presets.push({ id: uid("preset"), name: "", prompt: "" });
                void save2();
                draw();
              },
              "ghost"
            ),
            h4(
              "p",
              { class: "ggpp-field-desc" },
              "Assign a preset with the scroll button in the message box, or from a conversation's ⋮ menu → Instructions…"
            )
          );
        };
        draw();
      });
    }
  });

  // sites/gemini/plugins/customSidebarIdentity/index.ts
  var SIZE = 256;
  async function toSquare(file) {
    const bmp = await createImageBitmap(file);
    const side = Math.min(bmp.width, bmp.height);
    const c3 = document.createElement("canvas");
    c3.width = c3.height = SIZE;
    c3.getContext("2d").drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, SIZE, SIZE);
    return c3.toDataURL("image/png");
  }
  var customSidebarIdentity_default = definePlugin({
    id: "customSidebarIdentity",
    name: "CustomSidebarIdentity",
    description: "Replace the side panel's account name and picture with your own.",
    tags: ["Appearance", "Privacy"],
    icon: I3.user,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      displayName: { type: "string", label: "Display name", description: "Empty keeps your Google name.", placeholder: "Your name", default: "" },
      avatarUrl: { type: "string", label: "Avatar URL", description: "An https:// or data:image URL. Or paste / drop an image below. Empty keeps your Google picture.", placeholder: "https://…", default: "" },
      avatarSize: { type: "number", label: "Avatar size", default: 32, min: 24, max: 64, slider: true, unit: "px" }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const { displayName, avatarUrl, avatarSize } = ctx.settings;
      const name = displayName.trim();
      const url = /^(https:|data:image\/)/.test(avatarUrl.trim()) ? avatarUrl.trim() : "";
      ctx.css(`
      sidenav-mavatar-footer .mavatar-container { width: ${avatarSize}px !important; height: ${avatarSize}px !important; }
      sidenav-mavatar-footer .mavatar-container img { width: 100% !important; height: 100% !important; object-fit: cover; border-radius: 50%; }
      side-navigation-content.rail sidenav-mavatar-footer .mavatar-container { width: 32px !important; height: 32px !important; }
      ${name ? `sidenav-mavatar-footer .mavatar-user-name { font-size: 0 !important; }
      sidenav-mavatar-footer .mavatar-user-name::after { content: ${JSON.stringify(name)}; font-size: var(--gem-sys-typography-type-scale--body-m-font-size, 14px); }` : ""}
    `);
      ctx.cleanup(
        gemini.watch(`${gemini.SEL.accountFooter} .mavatar-container img`, (img) => {
          if (!url) return;
          const original = img.src;
          const swap = () => {
            if (img.src !== url) img.src = url;
          };
          img.classList.add("ggpp-custom-avatar");
          swap();
          img.addEventListener(
            "error",
            () => {
              img.dataset.ggppFailed = "1";
              img.src = original;
            },
            { once: true }
          );
          const mo3 = new MutationObserver(swap);
          mo3.observe(img, { attributes: true, attributeFilter: ["src"] });
          return () => {
            mo3.disconnect();
            img.classList.remove("ggpp-custom-avatar");
            img.src = original;
          };
        })
      );
      if (url) {
        ctx.setInterval(() => {
          for (const img of gemini.qa(`${gemini.SEL.accountFooter} .mavatar-container img`)) {
            if (img.src !== url && !img.dataset.ggppFailed) {
              img.dataset.ggppOriginal ??= img.src;
              img.src = url;
            }
          }
        }, 1500);
      }
      ctx.provide("panel:customSidebarIdentity", (panel) => {
        const preview2 = h4("img", { alt: "", src: url, style: { width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", display: url ? "block" : "none" } });
        const drop = h4(
          "div",
          {
            tabindex: 0,
            style: { border: "1px dashed var(--ggpp-border)", borderRadius: "12px", padding: "16px", textAlign: "center", color: "var(--ggpp-fg-2)", cursor: "pointer" }
          },
          "Paste or drop an image here, or click to choose a file"
        );
        const use = async (file) => {
          if (!file?.type.startsWith("image/")) return;
          ctx.setSetting("avatarUrl", await toSquare(file));
        };
        const picker = h4("input", { type: "file", accept: "image/*", style: { display: "none" }, onchange: () => void use(picker.files?.[0]) });
        drop.addEventListener("click", () => picker.click());
        drop.addEventListener("paste", (e3) => void use([...e3.clipboardData?.files ?? []][0]));
        drop.addEventListener("dragover", (e3) => e3.preventDefault());
        drop.addEventListener("drop", (e3) => {
          e3.preventDefault();
          void use(e3.dataTransfer?.files[0]);
        });
        panel.append(h4("div", { style: { display: "flex", gap: "12px", alignItems: "center" } }, preview2, drop), picker);
      });
    }
  });

  // sites/gemini/plugins/diagnostics/index.ts
  var ANCHORS = ["sidenav", "conversationRow", "accountFooter", "topBar", "conversationMenuButton", "composer", "editor", "modeButton", "mic", "userQuery", "modelResponse", "scroller", "greeting"];
  var diagnostics_default = definePlugin({
    id: "diagnostics",
    name: "Diagnostics",
    description: "Log GG++ events to the console and check which parts of Gemini GG++ can find.",
    tags: ["Developer"],
    icon: I3.bug,
    updated: "2026-10-14",
    dependencies: ["gemini", "ui"],
    settings: {
      logEvents: { type: "boolean", label: "Log events", description: "Print route and reply events to the console.", default: true }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      const kernel = ctx.use("kernel");
      if (ctx.settings.logEvents) {
        for (const ev of [
          "gemini:route",
          "gemini:response-start",
          "gemini:response-end",
          "gemini:response-left",
          "gemini:response-elsewhere",
          "gemini:response-lost",
          "net:stream-start",
          "net:stream-end",
          "plugin:started",
          "plugin:stopped"
        ]) {
          ctx.on(ev, (p3) => ctx.log.info(ev, p3));
        }
      }
      const keys = [];
      ctx.on("key:early", (e3) => {
        keys.push(`${(/* @__PURE__ */ new Date()).toLocaleTimeString()} ${e3.key} on ${e3.target?.tagName?.toLowerCase() ?? "?"}`);
        if (keys.length > 15) keys.shift();
      });
      const report = () => ({
        lastKeys: keys,
        version: kernel.version,
        url: location.href,
        theme: gemini.theme(),
        generating: gemini.isGenerating(),
        title: gemini.title(),
        messages: gemini.messages().length,
        anchors: Object.fromEntries(ANCHORS.map((k4) => [k4, gemini.qa(gemini.SEL[k4]).length])),
        network: netLog,
        pageNetwork: pageNet,
        plugins: kernel.plugins().map((p3) => `${p3.def.id}:${p3.state}${p3.error ? ` (${p3.error})` : ""}`)
      });
      let netLog = [];
      let pageNet = [];
      ctx.on("net:log", (entries2) => pageNet = entries2);
      const pullNet = async () => {
        if (true) return;
        try {
          netLog = await globalThis.browser.runtime.sendMessage({ type: "ggpp:net-log" });
        } catch (e3) {
          netLog = [`unavailable: ${e3}`];
        }
      };
      ctx.provide("panel:diagnostics", async (el) => {
        window.dispatchEvent(new CustomEvent("ggpp:net-log-request"));
        await pullNet();
        await new Promise((r3) => setTimeout(r3, 150));
        const pre = h4("pre", { style: { whiteSpace: "pre-wrap", fontSize: "12px", maxHeight: "40vh", overflow: "auto", margin: "0" } }, JSON.stringify(report(), null, 2));
        el.append(
          h4("div", { class: "ggpp-section-label" }, "Report"),
          pre,
          ui.button("Copy report", () => {
            void navigator.clipboard.writeText(JSON.stringify(report(), null, 2));
            ui.toast({ title: "Copied", duration: 1500, icon: I3.copy });
          })
        );
      });
    }
  });

  // src/lib/markdown.ts
  var SKIP = /* @__PURE__ */ new Set(["BUTTON", "MAT-ICON", "GEM-ICON", "SVG", "STYLE", "SCRIPT", "SOURCES-CAROUSEL-INLINE", "SOURCE-FOOTNOTE"]);
  function inline(node) {
    let out = "";
    for (const child of node.childNodes) out += convert(child, 0);
    return out;
  }
  function convert(node, depth) {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    const el = node;
    if (SKIP.has(el.tagName) || el.classList.contains("cdk-visually-hidden") || el.getAttribute("aria-hidden") === "true") return "";
    const tag = el.tagName;
    switch (tag) {
      case "H1":
      case "H2":
      case "H3":
      case "H4":
      case "H5":
      case "H6":
        return `

${"#".repeat(Number(tag[1]))} ${inline(el).trim()}

`;
      case "P":
        return `

${inline(el).trim()}

`;
      case "BR":
        return "\n";
      case "HR":
        return "\n\n---\n\n";
      case "STRONG":
      case "B":
        return `**${inline(el)}**`;
      case "EM":
      case "I":
        return `*${inline(el)}*`;
      case "DEL":
      case "S":
        return `~~${inline(el)}~~`;
      case "CODE":
        return el.closest("pre") ? el.textContent ?? "" : `\`${el.textContent ?? ""}\``;
      case "PRE": {
        const lang = el.closest("code-block")?.querySelector(".code-block-decoration span, .code-block-decoration")?.textContent?.trim().toLowerCase() ?? "";
        return `

\`\`\`${/^[\w+#-]{1,20}$/.test(lang) ? lang : ""}
${(el.textContent ?? "").replace(/\n$/, "")}
\`\`\`

`;
      }
      case "A": {
        const href = el.getAttribute("href");
        const text = inline(el).trim();
        return href && /^https?:/.test(href) ? `[${text || href}](${href})` : text;
      }
      case "IMG": {
        const src = el.getAttribute("src");
        return src && /^https?:/.test(src) ? `![${el.getAttribute("alt") ?? "image"}](${src})` : "";
      }
      case "BLOCKQUOTE":
        return `

${inline(el).trim().split("\n").map((l3) => `> ${l3}`).join("\n")}

`;
      case "UL":
      case "OL": {
        const items = [...el.children].filter((c3) => c3.tagName === "LI");
        const lines = items.map((li, i3) => {
          const marker = tag === "OL" ? `${i3 + 1}.` : "-";
          const body = [...li.childNodes].map((c3) => convert(c3, depth + 1)).join("").trim().replace(/\n{2,}/g, "\n");
          return `${"  ".repeat(depth)}${marker} ${body.replace(/\n/g, `
${"  ".repeat(depth + 1)}`)}`;
        });
        return `

${lines.join("\n")}

`;
      }
      case "TABLE": {
        const rows = [...el.querySelectorAll("tr")].map((tr) => [...tr.children].map((c3) => inline(c3).trim().replace(/\|/g, "\\|")));
        if (!rows.length) return "";
        const head = `| ${rows[0].join(" | ")} |
| ${rows[0].map(() => "---").join(" | ")} |`;
        return `

${[head, ...rows.slice(1).map((r3) => `| ${r3.join(" | ")} |`)].join("\n")}

`;
      }
      default:
        return [...el.childNodes].map((c3) => convert(c3, depth)).join("");
    }
  }
  function toMarkdown(root2) {
    return convert(root2, 0).replace(/\n{3,}/g, "\n\n").trim();
  }

  // sites/gemini/plugins/exportChat/index.ts
  var MIME = { json: "application/json", md: "text/markdown", txt: "text/plain", html: "text/html" };
  var fileName = (title) => title.replace(/[<>:"/\\|?*\x00-\x1f]/g, "").trim().replace(/\s+/g, "-") || "chat";
  var esc = (s3) => s3.replace(/[&<>"']/g, (c3) => `&#${c3.charCodeAt(0)};`);
  var safeUrl = (u3) => /^(https?:|mailto:)/i.test(u3);
  var exportChat_default = definePlugin({
    id: "exportChat",
    name: "ExportChat",
    description: "Export the open conversation as JSON, Markdown, plain text or HTML from the conversation menu.",
    tags: ["Chats"],
    icon: I3.download,
    updated: "2026-10-14",
    dependencies: ["gemini", "menus", "ui"],
    settings: {
      includeThinking: { type: "boolean", label: "Include thinking", description: "Include the thinking steps when Gemini shows them.", default: true }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      function collect2() {
        return gemini.messages().map((m3) => {
          if (m3.role === "user") return { role: "user", text: m3.text, markdown: m3.text, images: [...m3.el.querySelectorAll("img")].map((i3) => i3.src).filter(safeUrl) };
          const body = m3.el.querySelector(gemini.SEL.modelText);
          const thoughts = m3.el.querySelector(gemini.SEL.thoughts);
          return {
            role: "model",
            text: m3.text,
            markdown: body ? toMarkdown(body) : m3.text,
            thinking: ctx.settings.includeThinking ? thoughts?.innerText.trim() || void 0 : void 0,
            images: [...body?.querySelectorAll("img") ?? []].map((i3) => i3.src).filter(safeUrl)
          };
        });
      }
      function render(format, title, turns) {
        const who = (t3) => t3.role === "user" ? "You" : "Gemini";
        const model = gemini.q(gemini.SEL.modeButton)?.innerText.trim();
        switch (format) {
          case "json":
            return JSON.stringify(
              { conversationId: gemini.route().conversationId, title, model, url: location.href, exportedAt: (/* @__PURE__ */ new Date()).toISOString(), messages: turns },
              null,
              2
            );
          case "md":
            return [
              `# ${title}`,
              "",
              ...turns.flatMap((t3) => [
                `## ${who(t3)}`,
                "",
                ...t3.thinking ? ["<details><summary>Thinking</summary>", "", t3.thinking, "", "</details>", ""] : [],
                t3.markdown,
                "",
                ...t3.images.map((u3) => `![image](${u3})`),
                "---",
                ""
              ])
            ].join("\n");
          case "txt":
            return [
              title,
              "=".repeat(title.length),
              "",
              ...turns.flatMap((t3) => [who(t3), "", ...t3.thinking ? ["[Thinking]", t3.thinking, ""] : [], t3.text, "", ...t3.images.map((u3) => `  ${u3}`), "-".repeat(40), ""])
            ].join("\n");
          case "html":
            return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
body{font-family:system-ui,sans-serif;max-width:50rem;margin:0 auto;padding:0 1rem;background:#131314;color:#e3e3e3;line-height:1.55}
.m{margin:1.5rem 0;padding:1rem;border-radius:.75rem;border:1px solid #2a2a2a}.user{background:#1e1f20}.model{background:#131314}
.who{font-weight:600;color:#aaa;margin-bottom:.5rem}details{padding:.5rem;background:#1a1a1a;border-left:3px solid #444;color:#999;font-size:.9rem;margin-bottom:.5rem}
a{color:#a8c7fa}img{max-width:100%}pre{white-space:pre-wrap}
</style></head><body><h1>${esc(title)}</h1>${turns.map(
              (t3) => `<div class="m ${t3.role}"><div class="who">${who(t3)}</div>${t3.thinking ? `<details><summary>Thinking</summary><pre>${esc(t3.thinking)}</pre></details>` : ""}<div>${esc(t3.text).replace(/\n/g, "<br>")}</div>${t3.images.map((u3) => `<img src="${esc(u3)}" alt="">`).join("")}</div>`
            ).join("")}</body></html>`;
          default: {
            const never = format;
            return never;
          }
        }
      }
      function exportAs(format) {
        const turns = collect2();
        if (!turns.length) {
          ui.toast({ title: "Nothing to export", body: "Open a conversation first." });
          return;
        }
        const title = gemini.title() || "Untitled Chat";
        download(`${fileName(title)}.${format}`, render(format, title, turns), MIME[format]);
      }
      function dialog() {
        const m3 = ui.modal({
          title: "Export conversation",
          icon: I3.download,
          width: 420,
          content: [
            h4("p", { class: "ggpp-muted" }, "Exports the messages currently loaded on the page. Scroll to the top first to include older turns."),
            h4(
              "div",
              { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" } },
              [
                ["md", "Markdown"],
                ["json", "JSON"],
                ["txt", "Plain text"],
                ["html", "HTML"]
              ].map(([f3, label]) => ui.button(label, () => (exportAs(f3), m3.close())))
            )
          ]
        });
      }
      const menus = ctx.use("menus");
      ctx.cleanup(
        menus.register({
          id: "exportChat",
          location: "conversation",
          label: "Export…",
          icon: I3.download,
          // Only the open conversation is on the page to export.
          when: (c3) => !gemini.isGenerating() && (!c3.conversationId || c3.conversationId === gemini.route().conversationId),
          onSelect: dialog
        })
      );
    }
  });

  // sites/gemini/plugins/gemini/index.ts
  var SEL = {
    main: ":is(bard-sidenav-content, main.chat-app, [role='main'])",
    chatWindow: "chat-window",
    scroller: ":is(infinite-scroller.chat-history, #chat-history, .chat-history-scroll-container)",
    conversationTurn: ".conversation-container",
    userQuery: "user-query",
    userText: ".query-text",
    userLine: ":is(.query-text-line, .query-bullet-item)",
    userBubble: ".user-query-bubble-with-background",
    modelResponse: "model-response",
    modelText: ":is(message-content .markdown-main-panel, message-content .markdown)",
    messageContent: "message-content",
    thoughts: ":is(thinking-overlay, model-thoughts)",
    responseActions: "message-actions",
    composer: "input-container",
    inputArea: ":is(input-area-v2 .input-area, input-area-v2)",
    editor: "rich-textarea .ql-editor[contenteditable='true']",
    leadingActions: ".leading-actions-wrapper",
    trailingActions: ".trailing-actions-wrapper",
    modeButton: "[data-test-id='bard-mode-menu-button']",
    sendButton: ":is([data-test-id='send-button-container'] gem-icon-button.send-button button, [data-test-id='send-button-container'] button)",
    stop: ":is([data-test-id='send-button-container'] gem-icon-button.send-button.stop, button[aria-label='Stop response'])",
    mic: "speech-dictation-mic-button",
    sidenav: "side-navigation-content",
    sidenavToggle: ":is(side-navigation-content button[aria-label='Close sidebar'], button[aria-label='Open sidebar'], button[aria-label='Main menu'])",
    conversationRow: "gem-nav-list-item[data-test-id='conversation']",
    conversationTitle: ".title-text",
    conversationLink: ":is(a[href*='/app/'], a[href*='/gem/'])",
    rowMenuButton: "[data-test-id='actions-menu-button']",
    accountFooter: "sidenav-mavatar-footer",
    topBar: "top-bar-actions",
    conversationMenuButton: "conversation-actions-icon",
    tempChatButton: "gem-icon-button.temp-chat-button",
    zeroState: ":is(modular-zero-state, zero-state-block-picker)",
    greeting: ":is(.greeting-container h1.greeting-headline, h1.greeting-headline)",
    overlay: ".cdk-overlay-container",
    error: ":is(response-container .error-message, .response-error, [data-test-id='error-message'])",
    codeBlock: "code-block"
  };
  var INTERRUPT = /you stopped this response|response (was )?stopped|你已让系统停止|已停止(生成|回答)/i;
  var ERROR_TEXT = /^(something went wrong|an error occurred|i encountered an error|出了点问题|发生错误|我遇到了错误|出错了)/i;
  function parseRoute() {
    const path = location.pathname.replace(/^\/u\/\d+/, "");
    const m3 = path.match(/\/(?:app|gem\/[^/]+|chat)\/([0-9a-f]{8,})/i);
    return {
      href: location.href,
      path,
      conversationId: m3 ? m3[1] : null,
      isHome: /^\/(app|gem\/[^/]+)?\/?$/.test(path)
    };
  }
  function textOf(el) {
    return el?.innerText?.trim() ?? el?.textContent?.trim() ?? "";
  }
  var gemini_default2 = definePlugin({
    id: "gemini",
    name: "Gemini Adapter",
    description: "Finds Gemini's page parts and reports chat events to other plugins.",
    tags: [],
    required: true,
    hidden: true,
    icon: ["M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"],
    start(ctx) {
      const watchers = /* @__PURE__ */ new Set();
      let route = parseRoute();
      let generating = false;
      let generatingSince = 0;
      let generatingIn = null;
      let generatingTitle = "";
      let scheduled2 = false;
      const q4 = (s3, root2 = document) => root2.querySelector(s3);
      const qa = (s3, root2 = document) => [...root2.querySelectorAll(s3)];
      function runWatchers() {
        if (!watchers.size) return;
        const selectors = [...new Set([...watchers].map((w4) => w4.selector))];
        let found;
        try {
          found = qa(selectors.join(", "));
        } catch {
          found = selectors.flatMap((sel) => {
            try {
              return qa(sel);
            } catch {
              return [];
            }
          });
        }
        for (const w4 of watchers) {
          for (const el of found) {
            try {
              if (!el.matches(w4.selector)) continue;
            } catch {
              continue;
            }
            if (w4.seen.has(el)) continue;
            let dispose = void 0;
            try {
              dispose = w4.fn(el);
            } catch (e3) {
              ctx.log.error("watcher failed", w4.selector, e3);
            }
            w4.seen.set(el, dispose);
          }
          for (const [el, dispose] of w4.seen) {
            if (el.isConnected) continue;
            w4.seen.delete(el);
            try {
              dispose?.();
            } catch (e3) {
              ctx.log.error("watcher cleanup failed", e3);
            }
          }
        }
      }
      function checkRoute() {
        if (location.href === route.href) return;
        const prev = route;
        route = parseRoute();
        if (generating && generatingIn === null && prev.conversationId === null) generatingIn = route.conversationId;
        ctx.emit("gemini:route", { route, prev });
      }
      function editor() {
        const all = qa(SEL.editor);
        return all.find(isVisible) ?? all[0] ?? null;
      }
      function isGenerating() {
        return qa(SEL.stop).some(isVisible);
      }
      function title() {
        const active2 = q4(`${SEL.conversationRow} a[aria-current='page'], ${SEL.conversationRow} a.is-active`);
        const fromRow = textOf(active2?.querySelector(".title-text") ?? active2);
        if (fromRow) return fromRow;
        const t3 = document.title.replace(/\s*[-–|]\s*(Google\s+)?Gemini\s*$/i, "").trim();
        if (t3 && !/^(Google )?Gemini$/i.test(t3)) return t3;
        const first = q4(SEL.userQuery);
        return first ? messageText(first, "user").replace(/\s+/g, " ").trim().slice(0, 60) || "Gemini" : "Gemini";
      }
      let endTimer;
      ctx.cleanup(() => clearTimeout(endTimer));
      const SETTLE_MS2 = 700;
      function checkGenerating() {
        const now2 = isGenerating();
        if (now2 === generating) {
          if (now2 && route.conversationId !== generatingIn && generatingIn !== null) leave();
          return;
        }
        generating = now2;
        if (now2) {
          if (endTimer) {
            clearTimeout(endTimer);
            endTimer = void 0;
            if (route.conversationId === generatingIn) return;
          }
          generatingSince = Date.now();
          generatingIn = route.conversationId;
          generatingTitle = title();
          ctx.emit("gemini:response-start", { conversationId: generatingIn, title: generatingTitle, hidden: document.hidden });
          ctx.emit("gemini:generating", true);
          return;
        }
        if (route.conversationId !== generatingIn && generatingIn !== null) {
          leave();
          ctx.emit("gemini:generating", false);
          return;
        }
        clearTimeout(endTimer);
        endTimer = setTimeout(() => {
          endTimer = void 0;
          checkRoute();
          if (generating) return;
          if (route.conversationId !== generatingIn && generatingIn !== null) leave();
          else finish();
          ctx.emit("gemini:generating", false);
        }, SETTLE_MS2);
      }
      function finish() {
        const last2 = qa(SEL.modelResponse).pop();
        const lastText = last2 ? messageText(last2, "model") : "";
        const interrupted = INTERRUPT.test(lastText.slice(-200)) || !!last2 && INTERRUPT.test(last2.querySelector(".info-content")?.textContent ?? "");
        const error = !interrupted && !!last2 && (last2.querySelector(SEL.error) !== null || lastText.length < 400 && ERROR_TEXT.test(lastText.trim()));
        ctx.emit("gemini:response-end", {
          conversationId: route.conversationId,
          title: title(),
          hidden: document.hidden,
          responseId: last2 ? responseId(last2) : null,
          text: lastText,
          error,
          interrupted,
          duration: Date.now() - generatingSince
        });
      }
      function leave() {
        if (generatingIn === null) return;
        const left = generatingIn;
        const leftTitle = generatingTitle;
        ctx.emit("gemini:response-left", { conversationId: left, title: leftTitle, hidden: document.hidden });
        generatingIn = route.conversationId;
        generatingTitle = title();
        away.set(left, { title: leftTitle, leftAt: Date.now(), lastData: 0, endedAt: 0 });
      }
      function tick() {
        scheduled2 = false;
        lastTick = Date.now();
        checkRoute();
        checkGenerating();
        runWatchers();
      }
      let lastTick = 0;
      const schedule = () => {
        if (scheduled2) return;
        scheduled2 = true;
        const wait = 120 - (Date.now() - lastTick);
        if (wait > 0) setTimeout(() => nextFrame(tick), wait);
        else nextFrame(tick);
      };
      const mo3 = new MutationObserver(schedule);
      mo3.observe(document.documentElement, { childList: true, subtree: true });
      ctx.cleanup(() => mo3.disconnect());
      window.addEventListener("popstate", schedule, { signal: ctx.signal });
      ctx.setInterval(() => {
        checkRoute();
        checkGenerating();
        runWatchers();
      }, 700);
      ctx.cleanup(() => {
        for (const w4 of watchers) for (const d3 of w4.seen.values()) d3?.();
        watchers.clear();
      });
      const responseId = (el) => q4(SEL.messageContent, el)?.id.replace(/^message-content-id-/, "") ?? null;
      function messages() {
        return qa(`${SEL.userQuery}, ${SEL.modelResponse}`).map((el, index) => {
          const role = el.matches(SEL.userQuery) ? "user" : "model";
          return { role, el, index, text: messageText(el, role) };
        });
      }
      function messageText(el, role = el.matches(SEL.userQuery) ? "user" : "model") {
        if (role === "user") {
          const lines = qa(SEL.userLine, el);
          if (lines.length) return lines.map((l3) => (l3.textContent ?? "").trim()).join("\n").trim();
          const box = q4(SEL.userText, el);
          if (!box) return textOf(el);
          const clone3 = box.cloneNode(true);
          clone3.querySelectorAll(".cdk-visually-hidden").forEach((n2) => n2.remove());
          return clone3.textContent?.trim() ?? "";
        }
        return textOf(q4(SEL.modelText, el) ?? el);
      }
      function setEditorText(text, append2 = false) {
        const ed = editor();
        if (!ed) return false;
        ed.focus();
        const sel = getSelection();
        if (sel) {
          const range = document.createRange();
          range.selectNodeContents(ed);
          if (append2) range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        if (!text) {
          document.execCommand("delete");
        } else if (!document.execCommand("insertText", false, text)) {
          ed.textContent = text;
          ed.dispatchEvent(new InputEvent("input", { bubbles: true }));
        }
        return true;
      }
      function theme() {
        const body = document.body;
        if (body?.classList.contains("dark-theme")) return "dark";
        if (body?.classList.contains("light-theme")) return "light";
        const bg = body ? getComputedStyle(body).backgroundColor : "";
        const m3 = bg.match(/\d+(\.\d+)?/g);
        if (m3 && m3.length >= 3 && (m3[3] === void 0 || Number(m3[3]) > 0)) {
          const [r3, g5, b3] = m3.map(Number);
          return 0.2126 * r3 + 0.7152 * g5 + 0.0722 * b3 < 128 ? "dark" : "light";
        }
        return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      const streams = /* @__PURE__ */ new Map();
      const requests = /* @__PURE__ */ new Map();
      const away = /* @__PURE__ */ new Map();
      const QUIET_MS = 5e3;
      const CONFIRM_MS = 3e3;
      let lastAnyStart = 0;
      const GIVE_UP_MS = 15 * 6e4;
      let lastAnyData = 0;
      ctx.on("net:chunk", (e3) => {
        if (!e3.bytes) return;
        const now2 = Date.now();
        lastAnyData = now2;
        for (const id of e3.ids) {
          const a3 = away.get(id);
          if (a3) a3.lastData = now2;
        }
      });
      ctx.setInterval(() => {
        const now2 = Date.now();
        for (const [id, a3] of away) {
          if (id === route.conversationId) {
            away.delete(id);
            continue;
          }
          const inFlight = [...requests.values()].includes(id);
          const confirmed = a3.endedAt > 0 && now2 - a3.endedAt >= CONFIRM_MS && now2 - lastAnyData >= 2e3 && lastAnyStart <= a3.endedAt;
          const lastSeen = a3.lastData || Math.max(lastAnyData, a3.leftAt);
          const quiet = now2 - a3.leftAt >= QUIET_MS && now2 - lastSeen >= QUIET_MS && now2 - lastAnyStart >= QUIET_MS && !inFlight;
          if (!confirmed && !quiet && now2 - a3.leftAt < GIVE_UP_MS) continue;
          away.delete(id);
          if (now2 - a3.leftAt > GIVE_UP_MS) continue;
          ctx.emit("gemini:response-elsewhere", { conversationId: id, title: rowTitle(id) ?? a3.title, hidden: document.hidden, error: false });
        }
      }, 1e3);
      const rowTitle = (id) => qa(SEL.conversationRow).find((r3) => r3.querySelector(SEL.conversationLink)?.href.includes(id))?.querySelector(SEL.conversationTitle)?.textContent?.trim();
      let sentAt = 0;
      const onSend = () => sentAt = Date.now();
      document.addEventListener(
        "keydown",
        (e3) => {
          if (e3.key === "Enter" && !e3.shiftKey && !e3.isComposing && editor()?.contains(e3.target)) onSend();
        },
        { capture: true, signal: ctx.signal }
      );
      document.addEventListener(
        "click",
        (e3) => {
          if (e3.target.closest?.("[data-test-id='send-button-container'] button")) onSend();
        },
        { capture: true, signal: ctx.signal }
      );
      ctx.on("net:stream-start", (e3) => {
        if (Date.now() - sentAt > 1500) {
          lastAnyStart = Date.now();
          for (const a3 of away.values()) a3.endedAt = 0;
        }
        if (Date.now() - sentAt > 5e3 && !generating) return;
        const id = e3.conversationId ?? route.conversationId ?? "new";
        if (e3.requestId) requests.set(e3.requestId, id);
        streams.set(id, { title: rowTitle(id) ?? title() });
        ctx.emit("gemini:stream-start", { conversationId: id === "new" ? null : id, title: streams.get(id).title, hidden: document.hidden });
      });
      ctx.on("gemini:route", ({ route: r3, prev }) => {
        if (prev.conversationId === null && r3.conversationId && streams.has("new")) {
          streams.set(r3.conversationId, streams.get("new"));
          streams.delete("new");
        }
        if (prev.conversationId === null && r3.conversationId) {
          for (const [rid, owner] of requests) if (owner === "new") requests.set(rid, r3.conversationId);
        }
      });
      ctx.on("net:stream-end", (e3) => {
        const id = requests.get(e3.requestId);
        requests.delete(e3.requestId);
        if (!id) return;
        const info = streams.get(id);
        streams.delete(id);
        if (id === route.conversationId) return;
        const a3 = away.get(id);
        if (!a3 || [...requests.values()].includes(id)) return;
        if (e3.error) {
          away.delete(id);
          ctx.emit("gemini:response-lost", { conversationId: id, title: a3.title, hidden: document.hidden });
          return;
        }
        a3.endedAt = Date.now();
        if (info?.title) a3.title = info.title;
      });
      ctx.provide("gemini", {
        SEL,
        q: q4,
        qa,
        /** Call fn for every current and future element matching selector; its return value runs on removal. */
        watch(selector, fn2) {
          const w4 = { selector, fn: fn2, seen: /* @__PURE__ */ new Map() };
          watchers.add(w4);
          schedule();
          return () => {
            watchers.delete(w4);
            for (const d3 of w4.seen.values()) d3?.();
          };
        },
        route: () => route,
        title,
        editor,
        editorText: () => textOf(editor()),
        setEditorText,
        composer: () => editor()?.closest(SEL.composer) ?? q4(SEL.composer),
        responseId,
        sendButton: () => qa(SEL.sendButton).find(isVisible) ?? null,
        send() {
          const btn = qa(SEL.sendButton).find(isVisible);
          if (btn && !btn.matches(".stop") && !btn.hasAttribute("disabled")) btn.click();
          return !!btn;
        },
        isGenerating: () => generating,
        messages,
        messageText,
        scroller: () => {
          const all = qa(SEL.scroller);
          return all.find((el) => el.scrollHeight > el.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(el).overflowY)) ?? all[0] ?? null;
        },
        sidenav: () => q4(SEL.sidenav),
        toggleSidenav: () => q4(SEL.sidenavToggle)?.click(),
        theme,
        newChatUrl: () => {
          const prefix = location.pathname.match(/^\/u\/\d+/)?.[0] ?? "";
          return `${prefix}/app`;
        },
        navigate(url) {
          const target2 = new URL(url, location.href);
          if (target2.href === location.href) return;
          const link = qa("a[href]").find((l3) => l3.href === target2.href);
          if (link) return link.click();
          if (/^(\/u\/\d+)?\/app\/?$/.test(target2.pathname)) {
            const newChat = q4("[data-test-id='new-chat-button'] a, [data-test-id='new-chat-button'] button, [data-test-id='new-chat-button']");
            if (newChat) return newChat.click();
          }
          location.assign(target2.href);
        }
      });
    }
  });

  // sites/gemini/plugins/hideBlueBackground/index.ts
  var HIDE_BLUE_BACKGROUND_SELECTOR = "modular-zero-state .blur-bg";
  var HIDE_BLUE_LM_GLOW_BEFORE_SELECTOR = "chat-window.show-lm-background > div.lm-glow::before";
  var HIDE_BLUE_BACKGROUND_CSS = [
    `${HIDE_BLUE_BACKGROUND_SELECTOR} { display: none !important; }`,
    `${HIDE_BLUE_LM_GLOW_BEFORE_SELECTOR} { background-image: none !important; }`
  ].join("\n");
  var hideBlueBackground_default = definePlugin({
    id: "hideBlueBackground",
    name: "HideBlueBackground",
    description: "Hide Gemini blue decorative wash: home zero-state .blur-bg, and chat-window lm-glow ::before radial glow. Does not change message box layout, ::after, textarea, or voice controls.",
    tags: ["Composer", "Appearance"],
    icon: I3.eyeOff,
    enabledByDefault: true,
    updated: "2026-11-18",
    start(ctx) {
      ctx.css(HIDE_BLUE_BACKGROUND_CSS);
    }
  });

  // sites/gemini/plugins/incognito/index.ts
  var ENTRY = "temp-chat-button gem-icon-button.temp-chat-entry button, temp-chat-button button[aria-label='Temporary chat']";
  var incognito_default = definePlugin({
    id: "incognito",
    name: "Incognito",
    description: "Turn on Temporary chat automatically whenever you start a new chat.",
    tags: ["Privacy"],
    icon: I3.incognito,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    start(ctx) {
      const gemini = ctx.use("gemini");
      let doneFor = "";
      const tryEnable = () => {
        const r3 = gemini.route();
        if (!r3.isHome || doneFor === r3.href) return;
        const btn = gemini.q(ENTRY);
        if (!btn) return;
        doneFor = r3.href;
        btn.click();
      };
      ctx.cleanup(gemini.watch(ENTRY, () => void setTimeout(tryEnable, 150)));
      ctx.on("gemini:route", ({ route }) => {
        if (!route.isHome) doneFor = "";
        setTimeout(tryEnable, 300);
      });
    }
  });

  // sites/gemini/plugins/inputHistory/index.ts
  var DEDUPE_MS = 2e3;
  var SETTLE_MS = 120;
  var normalize = (t3) => t3.replace(/​/g, "").replace(/\r\n?/g, "\n").trim();
  var inputHistory_default = definePlugin({
    id: "inputHistory",
    name: "InputHistory",
    description: "Recall earlier prompts with ↑ / ↓ in the message box, like a terminal. Esc restores your draft.",
    tags: ["Composer"],
    icon: I3.history,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini", "ui"],
    liveSettings: true,
    settings: {
      maxEntries: { type: "number", label: "Maximum stored prompts", default: 100, min: 10, max: 500, step: 10, slider: true }
    },
    async start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      let list2 = await ctx.data.get("history", []);
      ctx.on("data:changed", ({ key, value }) => {
        if (key === "inputHistory:history" && Array.isArray(value) && cursor < 0) list2 = value;
      });
      const save2 = () => ctx.data.set("history", list2);
      let cursor = -1;
      let draft = "";
      let shown2 = "";
      let lastCapture = { text: "", at: 0 };
      let modalOpen = false;
      let settleUntil = 0;
      let userMovedCaret = false;
      const trim = () => {
        const max = ctx.settings.maxEntries;
        if (list2.length > max) list2 = list2.slice(list2.length - max);
      };
      ctx.on("settings:inputHistory", () => {
        trim();
        void save2();
      });
      let pendingSend = "";
      function capture() {
        const text = normalize(gemini.editorText());
        if (text) pendingSend = text;
        endBrowsing();
      }
      function commit() {
        const text = pendingSend;
        pendingSend = "";
        if (!text) return;
        const now2 = Date.now();
        if (text === lastCapture.text && now2 - lastCapture.at < DEDUPE_MS) return;
        lastCapture = { text, at: now2 };
        if (list2[list2.length - 1] === text) return;
        list2.push(text);
        trim();
        void save2();
      }
      const counter = h4("button", { class: "ggpp-ih-count", type: "button", onclick: () => openHistory() });
      const hud = h4(
        "div",
        { class: "ggpp-ih-hud", hidden: true },
        counter,
        h4("button", { class: "ggpp-ih-x", type: "button", title: "Exit history", "aria-label": "Exit history", onclick: () => restoreDraft() }, icon(I3.x, 14))
      );
      document.body.append(hud);
      ctx.cleanup(() => hud.remove());
      function placeHud() {
        if (cursor < 0 || modalOpen) {
          hud.hidden = true;
          return;
        }
        const box = gemini.q(gemini.SEL.inputArea) ?? gemini.composer();
        if (!box) return;
        const r3 = box.getBoundingClientRect();
        counter.textContent = `${cursor + 1} / ${list2.length}`;
        counter.setAttribute("aria-label", `Show input history (${cursor + 1} / ${list2.length})`);
        hud.hidden = false;
        hud.style.left = `${r3.left + r3.width / 2}px`;
        hud.style.top = `${r3.top - 8}px`;
      }
      window.addEventListener("resize", placeHud, { signal: ctx.signal });
      ctx.css(`
      .ggpp-ih-hud {
        position: fixed; z-index: 2147482000; transform: translate(-50%, -100%);
        display: flex; align-items: center; gap: 2px; padding: 2px 4px 2px 10px; border-radius: 14px;
        background: var(--ggpp-surface-2); color: var(--ggpp-fg-2); box-shadow: var(--ggpp-shadow);
        font: 500 12px/20px var(--ggpp-font); animation: ggpp-ih-in .12s ease-out;
      }
      .ggpp-ih-hud[hidden] { display: none; }
      .ggpp-ih-hud button { all: unset; cursor: pointer; border-radius: 10px; padding: 0 4px; display: inline-grid; place-items: center; }
      .ggpp-ih-hud button:hover { background: var(--ggpp-hover); color: var(--ggpp-fg); }
      .ggpp-ih-count { font-variant-numeric: tabular-nums; }
      @keyframes ggpp-ih-in { from { opacity: 0; } }
      .ggpp-ih-list { display: flex; flex-direction: column; gap: 4px; max-height: 50vh; overflow: auto; }
      .ggpp-ih-row { display: flex; gap: 8px; align-items: flex-start; padding: 8px 8px 8px 12px; border-radius: 10px; background: var(--ggpp-surface); cursor: pointer; }
      .ggpp-ih-row.ggpp-live { outline: 2px solid var(--ggpp-accent); }
      .ggpp-ih-idx { color: var(--ggpp-fg-3); font-variant-numeric: tabular-nums; min-width: 2.5em; }
      .ggpp-ih-text { flex: 1; min-width: 0; white-space: pre-wrap; overflow-wrap: anywhere; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .ggpp-ih-row.ggpp-open .ggpp-ih-text { -webkit-line-clamp: unset; display: block; }
      .ggpp-ih-actions { display: flex; gap: 2px; }
      .ggpp-ih-actions .ggpp-icon-btn { width: 28px; height: 28px; }
      .ggpp-ih-meta { display: flex; align-items: center; gap: 8px; color: var(--ggpp-fg-2); font-size: 13px; }
      .ggpp-ih-meta span { flex: 1; }
    `);
      function show(index, caretAtStart) {
        cursor = index;
        shown2 = list2[index];
        gemini.setEditorText(shown2);
        settleUntil = Date.now() + SETTLE_MS;
        userMovedCaret = false;
        setTimeout(() => {
          if (userMovedCaret) return;
          const ed = gemini.editor();
          if (!ed) return;
          const range = document.createRange();
          range.selectNodeContents(ed);
          range.collapse(caretAtStart);
          const sel = getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }, 0);
        placeHud();
      }
      function endBrowsing() {
        cursor = -1;
        shown2 = "";
        placeHud();
      }
      function restoreDraft() {
        gemini.setEditorText(draft);
        endBrowsing();
      }
      function caretAtEdge(ed, up) {
        const sel = getSelection();
        if (!sel?.rangeCount || !sel.isCollapsed) return false;
        if (ed.classList.contains("ql-blank") || !normalize(ed.innerText)) return true;
        const range = sel.getRangeAt(0);
        let rect = range.getClientRects()[0];
        if (!rect) {
          const probe = range.startContainer.nodeType === Node.ELEMENT_NODE ? range.startContainer : range.startContainer.parentElement;
          rect = probe?.getBoundingClientRect();
        }
        if (!rect) return true;
        const box = ed.getBoundingClientRect();
        const line = parseFloat(getComputedStyle(ed).lineHeight) || 24;
        return up ? rect.top - box.top < line * 0.8 : box.bottom - rect.bottom < line * 0.8;
      }
      function onKey(e3) {
        const ed = gemini.editor();
        if (!ed || e3.isComposing || e3.keyCode === 229) return;
        if (e3.key === "Escape" && cursor >= 0 && !modalOpen && !e3.ctrlKey && !e3.metaKey && !e3.shiftKey && !e3.altKey) {
          ctx.log.debug("restore draft via keydown");
          e3.preventDefault();
          e3.stopImmediatePropagation();
          restoreDraft();
          ed.focus();
          return;
        }
        if (!ed.contains(e3.target)) return;
        if (e3.key === "Enter" && !e3.shiftKey && !e3.altKey) {
          capture();
          return;
        }
        if (cursor >= 0 && Date.now() < settleUntil && /^(Home|End|ArrowLeft|ArrowRight)$/.test(e3.key)) userMovedCaret = true;
        if (e3.key === "Escape" && cursor >= 0 && !e3.ctrlKey && !e3.metaKey && !e3.shiftKey && !e3.altKey) {
          if (modalOpen) return;
          e3.preventDefault();
          e3.stopPropagation();
          restoreDraft();
          return;
        }
        if (e3.key !== "ArrowUp" && e3.key !== "ArrowDown" || e3.shiftKey || e3.ctrlKey || e3.metaKey || modalOpen) return;
        const up = e3.key === "ArrowUp";
        if (!e3.altKey && !caretAtEdge(ed, up)) return;
        if (up) {
          if (!list2.length) return;
          if (cursor < 0) {
            draft = gemini.editorText();
            e3.preventDefault();
            show(list2.length - 1, true);
          } else if (cursor > 0) {
            e3.preventDefault();
            show(cursor - 1, true);
          }
        } else if (cursor >= 0) {
          e3.preventDefault();
          if (cursor < list2.length - 1) show(cursor + 1, false);
          else restoreDraft();
        }
      }
      ctx.on("key:early", onKey);
      let escAt = 0;
      const restoreFromEsc = (why) => {
        if (cursor < 0 || modalOpen) return;
        ctx.log.debug("restore draft via", why);
        restoreDraft();
        gemini.editor()?.focus();
      };
      ctx.on("key:early", (e3) => {
        if (e3.key === "Escape") escAt = Date.now();
      });
      window.addEventListener("keyup", (e3) => e3.key === "Escape" && restoreFromEsc("keyup"), { capture: true, signal: ctx.signal });
      let pointerAt = 0;
      let windowBlurAt = 0;
      document.addEventListener("pointerdown", () => pointerAt = Date.now(), { capture: true, signal: ctx.signal });
      window.addEventListener("blur", (e3) => e3.target === window && (windowBlurAt = Date.now()), { signal: ctx.signal });
      document.addEventListener(
        "focusout",
        (e3) => {
          if (cursor < 0 || !gemini.editor()?.contains(e3.target)) return;
          const fe = e3;
          const viaEsc = Date.now() - escAt < 500;
          if (!viaEsc && (fe.relatedTarget || Date.now() - pointerAt < 400)) return;
          setTimeout(() => {
            if (!viaEsc && Date.now() - windowBlurAt < 150) return;
            const active2 = document.activeElement;
            if (!viaEsc && active2 && active2 !== document.body && !gemini.editor()?.contains(active2)) return;
            restoreFromEsc(viaEsc ? "blur after Esc" : "blur to nowhere");
          }, 50);
        },
        { capture: true, signal: ctx.signal }
      );
      document.addEventListener(
        "input",
        (e3) => {
          if (cursor < 0 || e3.isComposing) return;
          const ed = gemini.editor();
          if (!ed?.contains(e3.target)) return;
          if (normalize(gemini.editorText()) !== normalize(shown2)) {
            draft = gemini.editorText();
            endBrowsing();
          }
        },
        { capture: true, signal: ctx.signal }
      );
      document.addEventListener(
        "mousedown",
        (e3) => {
          if (cursor >= 0 && gemini.editor()?.contains(e3.target)) userMovedCaret = true;
        },
        { capture: true, signal: ctx.signal }
      );
      document.addEventListener(
        "click",
        (e3) => {
          const btn = e3.target.closest?.("[data-test-id='send-button-container'] button");
          if (btn && !btn.closest(".stop")) capture();
        },
        { capture: true, signal: ctx.signal }
      );
      ctx.on("gemini:route", () => endBrowsing());
      ctx.on("gemini:response-start", commit);
      ctx.on("gemini:stream-start", commit);
      ctx.cleanup(gemini.watch(gemini.SEL.userQuery, () => void (pendingSend && setTimeout(commit, 50))));
      function historyView(container3, inModal) {
        let query = "";
        const meta2 = h4("div", { class: "ggpp-ih-meta" });
        const rows = h4("div", { class: "ggpp-ih-list" });
        const search2 = h4("input", { class: "ggpp-input", type: "search", placeholder: "Search prompts", oninput: () => (query = search2.value, render()) });
        container3.append(search2, meta2, rows);
        function render() {
          search2.hidden = !list2.length;
          const q4 = query.trim().toLowerCase();
          const items = list2.map((text, i3) => ({ text, i: i3 })).reverse().filter((x4) => !q4 || x4.text.toLowerCase().includes(q4));
          meta2.replaceChildren(
            h4("span", null, q4 ? `${items.length} match${items.length === 1 ? "" : "es"}` : `${list2.length} stored prompt${list2.length === 1 ? "" : "s"}`),
            ...list2.length ? [ui.button(
              "Clear history",
              async () => {
                if (!await ui.confirm({ title: "Clear input history", body: "Delete all stored prompts? This cannot be undone.", confirm: "Clear", danger: true })) return;
                list2 = [];
                endBrowsing();
                void save2();
                render();
              },
              "ghost"
            )] : []
          );
          if (!items.length) {
            rows.replaceChildren(h4("p", { class: "ggpp-muted" }, q4 ? "No matches." : "No stored prompts."));
            return;
          }
          rows.replaceChildren(
            ...items.map(({ text, i: i3 }) => {
              const row = h4(
                "div",
                { class: `ggpp-ih-row${inModal && i3 === cursor ? " ggpp-live" : ""}`, tabindex: 0, role: "button" },
                h4("span", { class: "ggpp-ih-idx" }, String(i3 + 1)),
                h4("span", { class: "ggpp-ih-text" }, text),
                h4(
                  "span",
                  { class: "ggpp-ih-actions", onclick: (e3) => e3.stopPropagation() },
                  inModal && ui.iconButton(I3.check, "Use", () => {
                    if (cursor < 0) draft = gemini.editorText();
                    inModal.close();
                    show(i3, false);
                  }),
                  ui.iconButton(I3.copy, "Copy", () => void navigator.clipboard.writeText(text)),
                  ui.iconButton(I3.trash, "Delete", () => {
                    list2.splice(i3, 1);
                    if (cursor >= list2.length) endBrowsing();
                    void save2();
                    render();
                  })
                )
              );
              const toggle = () => row.classList.toggle("ggpp-open");
              row.addEventListener("click", toggle);
              row.addEventListener("keydown", (e3) => (e3.key === "Enter" || e3.key === " ") && (e3.preventDefault(), toggle()));
              return row;
            })
          );
          rows.querySelector(".ggpp-live")?.scrollIntoView({ block: "nearest" });
        }
        render();
      }
      function openHistory() {
        modalOpen = true;
        placeHud();
        const body = h4("div", { style: { display: "flex", flexDirection: "column", gap: "10px" } });
        const m3 = ui.modal({
          title: "Input history",
          icon: I3.history,
          width: 620,
          content: [h4("p", { class: "ggpp-muted" }, "Stored on this device."), body],
          onClose: () => {
            modalOpen = false;
            placeHud();
          }
        });
        historyView(body, m3);
      }
      ctx.provide("panel:inputHistory", (el) => historyView(el, null));
      ctx.on("gemini:route", () => {
        if (modalOpen) document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      });
    }
  });

  // sites/gemini/plugins/menus/index.ts
  function classify(trigger, sel) {
    const label = `${trigger.getAttribute("aria-label") ?? ""} ${trigger.getAttribute("mattooltip") ?? ""} ${trigger.dataset.testId ?? ""}`;
    const iconName = trigger.querySelector("mat-icon")?.getAttribute("fonticon") ?? trigger.querySelector("mat-icon")?.textContent?.trim() ?? "";
    if (trigger.closest(sel.modelResponse)) {
      return { location: "message", trigger, message: trigger.closest(sel.modelResponse) };
    }
    const row = trigger.closest(sel.conversationRow);
    if (row) {
      const href = row.querySelector(sel.conversationLink)?.href ?? "";
      return { location: "conversation", trigger, conversationId: href.match(/\/([0-9a-f]{8,})(?:[/?#]|$)/i)?.[1] ?? null };
    }
    if (trigger.closest(sel.conversationMenuButton) || /conversation actions/i.test(label)) {
      return { location: "conversation", trigger, conversationId: location.pathname.match(/\/([0-9a-f]{8,})(?:[/?#]|$)/i)?.[1] ?? null };
    }
    if (trigger.matches("[data-test-id='bard-mode-menu-button']") || trigger.closest("bard-mode-switcher")) {
      return { location: "model", trigger };
    }
    if (iconName === "settings" || /settings|设置|設定/i.test(label)) return { location: "settings", trigger };
    return { location: "other", trigger };
  }
  var menus_default = definePlugin({
    id: "menus",
    name: "Menu Items",
    description: "Lets plugins add entries to Gemini's conversation, response and settings menus.",
    tags: [],
    required: true,
    hidden: true,
    dependencies: ["gemini", "ui"],
    start(ctx) {
      const gemini = ctx.use("gemini");
      const ui = ctx.use("ui");
      let closeSub = null;
      const dropSub = () => {
        const close = closeSub;
        closeSub = null;
        close?.();
      };
      ctx.cleanup(dropSub);
      const items = /* @__PURE__ */ new Map();
      let lastTrigger = null;
      const PANEL = "gem-menu, .mat-mdc-menu-panel, [role='menu']";
      const ITEM = "gem-menu-item, [role^='menuitem']";
      const inMenu = (el) => !!el.closest(`${PANEL}, .cdk-overlay-container`);
      const remember = (e3) => {
        const t3 = e3.target?.closest?.("button, [role='button'], a, gem-icon-button");
        if (t3 && !inMenu(t3)) lastTrigger = t3;
      };
      for (const ev of ["pointerdown", "click", "keydown"]) document.addEventListener(ev, remember, { capture: true, signal: ctx.signal });
      function closeMenu(panel) {
        const esc3 = () => new KeyboardEvent("keydown", { key: "Escape", code: "Escape", keyCode: 27, bubbles: true });
        panel.dispatchEvent(esc3());
        document.querySelector(".cdk-overlay-backdrop")?.click();
        document.dispatchEvent(esc3());
      }
      function makeItem(template, item, c3, panel) {
        const label = typeof item.label === "function" ? item.label(c3) : item.label;
        const svgIcon = icon(item.icon ?? I3.puzzle, 20);
        let el;
        if (template) {
          el = template.cloneNode(true);
          for (const n2 of [el, ...el.querySelectorAll("*")]) {
            for (const attr of ["data-test-id", "href", "id", "value", "leadingicon", "aria-describedby", "jslog", "target"]) n2.removeAttribute(attr);
          }
          el.classList.remove("mat-mdc-menu-item-highlighted", "cdk-focused", "cdk-mouse-focused", "cdk-keyboard-focused");
          el.setAttribute("data-active", "false");
          el.querySelectorAll(".trailing-container > *, .gem-menu-item-trailing-icon").forEach((n2) => n2.remove());
          const iconBox = el.querySelector("gem-icon");
          if (iconBox) iconBox.replaceChildren(h4("span", { class: "ggpp-native-icon" }, svgIcon));
          else el.prepend(h4("span", { class: "ggpp-native-icon ggpp-native-icon-pad" }, svgIcon));
          el.querySelectorAll("mat-icon").forEach((n2) => n2.remove());
          const text = [".label span", ".label", ".gem-menu-item-label", ".mat-mdc-menu-item-text"].map((sel) => el.querySelector(sel)).find(Boolean) ?? el;
          text.textContent = label;
        } else {
          el = h4("button", { class: "mat-mdc-menu-item mat-focus-indicator", type: "button" }, h4("span", { class: "ggpp-native-icon" }, svgIcon), h4("span", null, label));
        }
        el.classList.add("ggpp-native-item");
        el.setAttribute("role", "menuitem");
        el.dataset.ggppItem = item.id;
        if (item.submenu) {
          el.setAttribute("aria-haspopup", "menu");
          el.append(h4("span", { class: "ggpp-native-more" }, icon(I3.chevronRight, 18)));
          const wrap2 = (entries2) => entries2.map((en2) => {
            if ("submenu" in en2 && en2.submenu) {
              const inner = en2.submenu;
              return { ...en2, submenu: () => wrap2(inner()) };
            }
            if ("onClick" in en2 && en2.onClick) {
              const run = en2.onClick;
              return {
                ...en2,
                onClick: () => {
                  closeSub = null;
                  closeMenu(panel);
                  try {
                    run();
                  } catch (err) {
                    ctx.log.error(`menu item ${item.id} failed`, err);
                  }
                }
              };
            }
            return en2;
          });
          const show = () => {
            if (closeSub) return;
            closeSub = ui.menu(el, wrap2(item.submenu(c3)), { side: "right", onClose: () => closeSub = null });
          };
          el.addEventListener("pointerenter", show);
          el.addEventListener(
            "click",
            (e3) => {
              e3.preventDefault();
              e3.stopImmediatePropagation();
              show();
            },
            true
          );
          el.addEventListener("keydown", (e3) => {
            if (e3.key !== "ArrowRight" && e3.key !== "Enter" && e3.key !== " ") return;
            e3.preventDefault();
            e3.stopImmediatePropagation();
            show();
            document.querySelector("#ggpp-layer .ggpp-menu:last-of-type .ggpp-menu-item")?.focus();
          }, true);
          return el;
        }
        el.addEventListener(
          "click",
          (e3) => {
            e3.preventDefault();
            e3.stopImmediatePropagation();
            closeMenu(panel);
            try {
              item.onSelect?.(c3);
            } catch (err) {
              ctx.log.error(`menu item ${item.id} failed`, err);
            }
          },
          true
        );
        return el;
      }
      function fill(panel, trigger) {
        if (!trigger) return;
        const c3 = classify(trigger, gemini.SEL);
        const list2 = [...items.values()].filter((i3) => i3.location === c3.location && (!i3.when || i3.when(c3))).sort((a3, b3) => (a3.order ?? 0) - (b3.order ?? 0));
        if (!list2.length) return;
        const native = [...panel.querySelectorAll(ITEM)].filter((n2) => !n2.closest(".ggpp-native-item") && n2.parentElement?.closest(ITEM) === null);
        if (!native.length) return;
        const anchor = c3.location === "conversation" && native.length > 1 ? native[native.length - 1] : null;
        const template = (anchor ? native[native.length - 2] : native[native.length - 1]) ?? native[0];
        const nodes = list2.map((item) => makeItem(template, item, c3, panel));
        if (anchor) anchor.before(...nodes);
        else native[native.length - 1].after(h4("div", { class: "ggpp-native-item ggpp-native-sep", role: "separator" }), ...nodes);
      }
      ctx.css(`
      .ggpp-native-icon { display: inline-grid; place-items: center; width: 100%; height: 100%; min-width: 20px; min-height: 20px; color: var(--mat-menu-item-icon-color, currentColor); }
      .ggpp-native-icon-pad { width: 24px; height: 24px; flex: none; margin-inline-end: 12px; }
      .ggpp-native-item { cursor: pointer; }
      .ggpp-native-more { display: inline-grid; place-items: center; margin-inline-start: auto; padding-inline-start: 12px; color: var(--mat-menu-item-icon-color, currentColor); }
      .ggpp-native-sep { height: 1px; margin: 8px 0; background: var(--gem-sys-color--outline-variant, rgb(127 127 127 / 25%)); cursor: default; }
    `);
      ctx.cleanup(
        gemini.watch(PANEL, (panel) => {
          if (panel.parentElement?.closest(PANEL) || panel.closest("#ggpp-layer")) return;
          const run = () => {
            if (!panel.querySelector(".ggpp-native-item")) fill(panel, lastTrigger);
          };
          nextFrame(run);
          const offHover = (e3) => {
            const t3 = e3.target.closest?.(ITEM);
            if (t3 && !t3.closest(".ggpp-native-item")) dropSub();
          };
          panel.addEventListener("pointerover", offHover);
          const mo3 = new MutationObserver((records2) => {
            if (records2.some((r3) => r3.type === "attributes" && panel.getAttribute("data-visible") === "true")) {
              panel.querySelectorAll(".ggpp-native-item").forEach((n2) => n2.remove());
            }
            if (panel.getAttribute("data-visible") === "false") dropSub();
            run();
          });
          mo3.observe(panel, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-visible"] });
          return () => {
            mo3.disconnect();
            panel.removeEventListener("pointerover", offHover);
            dropSub();
          };
        })
      );
      ctx.cleanup(() => document.querySelectorAll(".ggpp-native-item").forEach((n2) => n2.remove()));
      ctx.provide("menus", {
        register(item) {
          items.set(item.id, item);
          return () => items.delete(item.id);
        }
      });
    }
  });

  // sites/gemini/plugins/messageStars/index.ts
  var ORANGE = "#ff7a17";
  function pickModelStarHost(row) {
    return row.querySelector(".buttons-container-v2") ?? row.querySelector(".actions-container-v2, .response-actions") ?? row.firstElementChild ?? row;
  }
  function pickUserStarHost(row) {
    return row.querySelector(".luminous-actions-container") ?? row.querySelector(".query-content-actions") ?? row;
  }
  function releaseStarButton(buttons, msg, btn) {
    btn.remove();
    if (buttons.get(msg) === btn) buttons.delete(msg);
  }
  var messageStars_default = definePlugin({
    id: "messageStars",
    name: "MessageStars",
    description: "Star any message from its hover toolbar, then open this chat's starred list from the top bar to jump back.",
    tags: ["Messages"],
    icon: I3.star,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      showInHeader: { type: "boolean", label: "Starred list in top bar", description: "Show a star next to the conversation menu that opens this chat's starred messages.", default: true }
    },
    async start(ctx) {
      const gemini = ctx.use("gemini");
      let stars = await ctx.data.get("stars", []);
      ctx.on("data:changed", ({ key, value }) => {
        if (key !== "messageStars:stars" || !Array.isArray(value)) return;
        stars = value;
        refresh();
      });
      const save2 = () => ctx.data.set("stars", stars);
      const nav = () => ctx.tryUse("navigator");
      ctx.css(`
      .ggpp-star-btn { all: unset; box-sizing: border-box; display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; color: var(--gem-sys-color--on-surface-variant, currentColor); }
      .ggpp-star-btn:hover, .ggpp-star-btn:focus-visible { background: rgb(127 127 127 / 14%); }
      .ggpp-star-btn[aria-pressed="true"] { color: ${ORANGE}; background: color-mix(in srgb, ${ORANGE} 14%, transparent); }
      .ggpp-star-btn[aria-pressed="true"] svg { fill: currentColor; }
      .ggpp-stars-wrap { position: relative; display: inline-flex; align-items: center; }
      .ggpp-stars-wrap.ggpp-has .ggpp-star-btn { color: ${ORANGE}; }
      .ggpp-stars-list {
        position: fixed; z-index: 2147482600; width: min(18rem, 70vw); max-height: 60vh; overflow: auto; padding: 8px;
        border-radius: 12px; background: var(--ggpp-surface); color: var(--ggpp-fg); box-shadow: var(--ggpp-shadow); font: 13px/18px var(--ggpp-font);
      }
      .ggpp-stars-list[hidden] { display: none; }
      .ggpp-stars-head { display: flex; align-items: center; gap: 6px; padding: 4px 8px 8px; font-weight: 500; color: ${ORANGE}; }
      .ggpp-stars-row { display: flex; align-items: center; gap: 8px; padding: 6px 4px 6px 8px; border-radius: 8px; cursor: pointer; }
      .ggpp-stars-row:hover { background: var(--ggpp-hover); }
      .ggpp-stars-role { color: var(--ggpp-fg-3); flex: none; width: 3.6em; }
      .ggpp-stars-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-stars-row .ggpp-star-btn { width: 26px; height: 26px; }
      .ggpp-stars-empty { padding: 8px; color: var(--ggpp-fg-2); }
    `);
      const conv = () => gemini.route().conversationId;
      const idOf = (el) => {
        if (el.matches(gemini.SEL.modelResponse)) return gemini.responseId(el);
        const turn = el.closest(gemini.SEL.conversationTurn);
        return turn?.id ? `${turn.id}:u` : null;
      };
      const isStarred = (mid) => stars.some((s3) => s3.conversationId === conv() && s3.messageId === mid);
      function toggle(el) {
        const c3 = conv();
        const mid = idOf(el);
        if (!c3 || !mid) return;
        if (isStarred(mid)) stars = stars.filter((s3) => !(s3.conversationId === c3 && s3.messageId === mid));
        else {
          const role = el.matches(gemini.SEL.modelResponse) ? "model" : "user";
          stars.push({
            conversationId: c3,
            messageId: mid,
            role,
            snippet: truncate(gemini.messageText(el, role).replace(/\s+/g, " ").trim(), 61) || "Starred",
            title: gemini.title(),
            at: Date.now()
          });
        }
        void save2();
        refresh();
      }
      const buttons = /* @__PURE__ */ new Map();
      function starButton(msg) {
        const btn = h4(
          "button",
          {
            class: "ggpp-star-btn",
            type: "button",
            onclick: (e3) => {
              e3.stopPropagation();
              toggle(msg);
            }
          },
          icon(I3.star, 18)
        );
        buttons.set(msg, btn);
        syncButton(msg, btn);
        return btn;
      }
      function syncButton(msg, btn) {
        const mid = idOf(msg);
        const on3 = !!mid && isStarred(mid);
        btn.setAttribute("aria-pressed", String(on3));
        btn.title = on3 ? "Unstar" : "Star";
        btn.setAttribute("aria-label", btn.title);
      }
      ctx.cleanup(
        gemini.watch(`${gemini.SEL.modelResponse} message-actions`, (row) => {
          const msg = row.closest(gemini.SEL.modelResponse);
          const host2 = pickModelStarHost(row);
          const btn = starButton(msg);
          const spacer = host2.querySelector(".spacer");
          if (spacer) spacer.before(btn);
          else host2.append(btn);
          return () => releaseStarButton(buttons, msg, btn);
        })
      );
      ctx.cleanup(
        gemini.watch(`${gemini.SEL.userQuery} .luminous-actions-container, ${gemini.SEL.userQuery} .query-content-actions`, (row) => {
          const msg = row.closest(gemini.SEL.userQuery);
          if (buttons.has(msg)) return;
          const host2 = pickUserStarHost(row);
          const btn = starButton(msg);
          const spacer = host2.querySelector(".spacer");
          if (spacer) spacer.before(btn);
          else host2.append(btn);
          return () => releaseStarButton(buttons, msg, btn);
        })
      );
      const list2 = h4("div", { class: "ggpp-stars-list", hidden: true, role: "dialog", "aria-label": "Starred messages" });
      document.body.append(list2);
      ctx.cleanup(() => list2.remove());
      let wrap2 = null;
      let pinned = false;
      let hoverTimer;
      function renderList() {
        const mine = stars.filter((s3) => s3.conversationId === conv());
        const order = gemini.messages().map((m3) => idOf(m3.el));
        mine.sort((a3, b3) => {
          const ia = order.indexOf(a3.messageId);
          const ib = order.indexOf(b3.messageId);
          if (ia >= 0 && ib >= 0) return ia - ib;
          if (ia >= 0) return -1;
          if (ib >= 0) return 1;
          return b3.at - a3.at;
        });
        list2.replaceChildren(
          h4("div", { class: "ggpp-stars-head" }, icon(I3.star, 16), "Starred"),
          ...mine.length ? mine.map(
            (s3) => h4(
              "div",
              {
                class: "ggpp-stars-row",
                onclick: () => {
                  closeList();
                  const target2 = gemini.messages().find((m3) => idOf(m3.el) === s3.messageId);
                  if (!target2) return;
                  const n2 = nav();
                  if (n2) n2.jump(target2.el);
                  else target2.el.scrollIntoView({ block: "start" });
                }
              },
              h4("span", { class: "ggpp-stars-role" }, s3.role === "user" ? "You" : "Gemini"),
              h4("span", { class: "ggpp-stars-text", title: s3.snippet }, s3.snippet),
              h4(
                "button",
                {
                  class: "ggpp-star-btn",
                  type: "button",
                  "aria-pressed": "true",
                  title: "Unstar",
                  onclick: (e3) => {
                    e3.stopPropagation();
                    stars = stars.filter((x4) => x4 !== s3);
                    void save2();
                    refresh();
                  }
                },
                icon(I3.star, 16)
              )
            )
          ) : [h4("div", { class: "ggpp-stars-empty" }, "No starred messages in this chat")]
        );
      }
      function openList() {
        if (!wrap2) return;
        renderList();
        list2.hidden = false;
        const r3 = wrap2.getBoundingClientRect();
        const below = r3.bottom + 6;
        list2.style.left = `${Math.max(8, r3.right - list2.offsetWidth)}px`;
        list2.style.top = below + list2.offsetHeight > innerHeight ? `${Math.max(8, r3.top - 6 - list2.offsetHeight)}px` : `${below}px`;
      }
      function closeList() {
        list2.hidden = true;
        pinned = false;
      }
      if (ctx.settings.showInHeader) {
        ctx.cleanup(
          gemini.watch(`${gemini.SEL.topBar} ${gemini.SEL.conversationMenuButton}`, (more) => {
            const btn = h4("button", { class: "ggpp-star-btn", type: "button", title: "Starred messages", "aria-label": "Starred messages" }, icon(I3.star, 18));
            wrap2 = h4("span", { class: "ggpp-stars-wrap" }, btn);
            const w4 = wrap2;
            more.before(w4);
            const fine = matchMedia("(pointer: fine)").matches;
            w4.addEventListener("mouseenter", () => {
              if (!fine) return;
              clearTimeout(hoverTimer);
              hoverTimer = setTimeout(openList, 120);
            });
            const leave = () => {
              clearTimeout(hoverTimer);
              if (!pinned) hoverTimer = setTimeout(() => !list2.matches(":hover") && !w4.matches(":hover") && closeList(), 180);
            };
            w4.addEventListener("mouseleave", leave);
            list2.addEventListener("mouseleave", leave);
            list2.addEventListener("mouseenter", () => clearTimeout(hoverTimer));
            btn.addEventListener("click", () => {
              if (pinned) closeList();
              else {
                pinned = true;
                openList();
              }
            });
            btn.addEventListener("focus", openList);
            syncHeader();
            return () => {
              w4.remove();
              if (wrap2 === w4) wrap2 = null;
            };
          })
        );
        document.addEventListener(
          "pointerdown",
          (e3) => {
            if (list2.hidden) return;
            const t3 = e3.target;
            if (!list2.contains(t3) && !wrap2?.contains(t3)) closeList();
          },
          { capture: true, signal: ctx.signal }
        );
        document.addEventListener("keydown", (e3) => e3.key === "Escape" && !list2.hidden && closeList(), { signal: ctx.signal });
      }
      function syncHeader() {
        wrap2?.classList.toggle("ggpp-has", stars.some((s3) => s3.conversationId === conv()));
      }
      function refresh() {
        buttons.forEach((btn, msg) => syncButton(msg, btn));
        syncHeader();
        if (!list2.hidden) renderList();
        const marked = new Set(gemini.messages().filter((m3) => {
          const id = idOf(m3.el);
          return !!id && isStarred(id);
        }).map((m3) => m3.el));
        nav()?.setMarks(marked);
      }
      ctx.on("gemini:route", () => {
        closeList();
        setTimeout(refresh, 300);
      });
      ctx.on("plugin:started", (id) => id === "betterNavigator" && refresh());
      setTimeout(refresh, 500);
      ctx.cleanup(() => nav()?.setMarks(/* @__PURE__ */ new Set()));
    }
  });

  // sites/gemini/plugins/messageTimestamps/index.ts
  var MAX = 5e3;
  var messageTimestamps_default = definePlugin({
    id: "messageTimestamps",
    name: "MessageTimestamps",
    description: "Show when each message was sent. Gemini doesn't keep times, so only messages sent while this is on get one.",
    tags: ["Messages"],
    icon: I3.clock,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      showDate: { type: "boolean", label: "Show date", description: "Show the full date for messages older than today.", default: true },
      hideOwnMessages: { type: "boolean", label: "Hide on my messages", description: "Hide timestamps on your own messages.", default: false }
    },
    async start(ctx) {
      const gemini = ctx.use("gemini");
      const stamps = await ctx.data.get("stamps", {});
      let saveTimer;
      const save2 = () => {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
          const keys = Object.keys(stamps);
          if (keys.length > MAX) keys.sort((a3, b3) => stamps[a3] - stamps[b3]).slice(0, keys.length - MAX).forEach((k4) => delete stamps[k4]);
          void ctx.data.set("stamps", stamps);
        }, 400);
      };
      ctx.css(`
      :is(user-query, model-response)[data-ggpp-ts]::before {
        content: attr(data-ggpp-ts); display: block; font: 400 11px/16px var(--ggpp-font);
        color: var(--gem-sys-color--on-surface-variant, #888); opacity: .8; margin-bottom: .125rem;
      }
      /* Prompts: pinned just above the right edge of the bubble, whatever layout the host uses. */
      user-query[data-ggpp-ts] { position: relative; }
      user-query[data-ggpp-ts]::before { position: absolute; right: var(--ggpp-ts-end, 0px); top: var(--ggpp-ts-top, -16px); margin: 0; white-space: nowrap; }
      model-response[data-ggpp-ts]::before { padding-inline-start: var(--ggpp-ts-start, 0px); }
      @media print { :is(user-query, model-response)[data-ggpp-ts]::before { display: none; } }
    `);
      const keyOf = (el) => {
        const turn = el.closest(gemini.SEL.conversationTurn)?.id;
        if (el.matches(gemini.SEL.modelResponse)) return turn ? `${turn}:m` : gemini.responseId(el);
        if (turn) return `${turn}:u`;
        const text = gemini.messageText(el, "user").slice(0, 240);
        let hash = 0;
        for (const ch of text) hash = hash * 31 + ch.charCodeAt(0) | 0;
        return text ? `${gemini.route().conversationId}:u:${hash}` : null;
      };
      const fmt = (t3) => {
        const d3 = new Date(t3);
        const today = (/* @__PURE__ */ new Date()).toDateString() === d3.toDateString();
        const time2 = d3.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
        return today || !ctx.settings.showDate ? time2 : `${d3.toLocaleDateString(void 0, { month: "short", day: "numeric" })} ${time2}`;
      };
      function label(el) {
        const key = keyOf(el);
        const t3 = key ? stamps[key] : void 0;
        if (!t3 || ctx.settings.hideOwnMessages && el.matches(gemini.SEL.userQuery)) {
          el.removeAttribute("data-ggpp-ts");
          return;
        }
        const text = fmt(t3);
        if (el.dataset.ggppTs !== text) el.dataset.ggppTs = text;
        const box = el.getBoundingClientRect();
        if (el.matches(gemini.SEL.modelResponse)) {
          const block = el.querySelector(`${gemini.SEL.modelText} > *`);
          if (block) el.style.setProperty("--ggpp-ts-start", `${Math.max(0, block.getBoundingClientRect().left - box.left)}px`);
        } else {
          const bubble = el.querySelector(gemini.SEL.userBubble);
          if (bubble) {
            const b3 = bubble.getBoundingClientRect();
            el.style.setProperty("--ggpp-ts-end", `${Math.max(0, box.right - b3.right + 4)}px`);
            el.style.setProperty("--ggpp-ts-top", `${b3.top - box.top - 17}px`);
          }
        }
      }
      let unstampedReplyAt = 0;
      let unstampedIn = null;
      const relabel = () => {
        const msgs = gemini.messages();
        if (unstampedReplyAt && !gemini.isGenerating() && gemini.route().conversationId === unstampedIn) {
          stamp(msgs.findLast((m3) => m3.role === "model")?.el, unstampedReplyAt);
          unstampedReplyAt = 0;
        }
        msgs.forEach((m3) => label(m3.el));
      };
      const stamp = (el, t3) => {
        const key = el && keyOf(el);
        if (!el || !key || stamps[key]) return;
        stamps[key] = t3;
        label(el);
        save2();
      };
      let sentAt = 0;
      const onSend = () => sentAt = Date.now();
      document.addEventListener(
        "keydown",
        (e3) => {
          if (e3.key === "Enter" && !e3.shiftKey && !e3.isComposing && gemini.editor()?.contains(e3.target)) onSend();
        },
        { capture: true, signal: ctx.signal }
      );
      document.addEventListener(
        "click",
        (e3) => {
          if (e3.target.closest?.("[data-test-id='send-button-container'] button")) onSend();
        },
        { capture: true, signal: ctx.signal }
      );
      let replyStart = 0;
      ctx.on("gemini:response-start", () => {
        replyStart = Date.now();
        unstampedReplyAt = replyStart;
        unstampedIn = gemini.route().conversationId;
        if (!sentAt) sentAt = replyStart - 1e3;
      });
      ctx.on("gemini:response-end", (e3) => {
        const start = replyStart || Date.now() - (e3.duration ?? 0);
        const sent = sentAt || start - 1e3;
        sentAt = 0;
        replyStart = 0;
        setTimeout(() => {
          const msgs = gemini.messages();
          stamp(msgs.findLast((m3) => m3.role === "model")?.el, start);
          unstampedReplyAt = 0;
          stamp(msgs.findLast((m3) => m3.role === "user")?.el, sent);
        }, 300);
      });
      ctx.cleanup(
        gemini.watch(gemini.SEL.userQuery, (el) => {
          if (sentAt && Date.now() - sentAt < 15e3) stamp(el, sentAt);
          label(el);
        })
      );
      ctx.cleanup(gemini.watch(gemini.SEL.modelResponse, (el) => label(el)));
      ctx.on("gemini:route", () => ctx.setTimeout(relabel, 600));
      ctx.setInterval(relabel, 2e3);
      window.addEventListener("resize", relabel, { signal: ctx.signal });
      ctx.cleanup(() => {
        clearTimeout(saveTimer);
        document.querySelectorAll("[data-ggpp-ts]").forEach((n2) => {
          n2.removeAttribute("data-ggpp-ts");
          n2.style.removeProperty("--ggpp-ts-start");
          n2.style.removeProperty("--ggpp-ts-end");
        });
      });
    }
  });

  // sites/gemini/plugins/noDictation/index.ts
  var NO_DICTATION_CSS = `input-container :is(speech-dictation-mic-button, .mic-button-container) { display: none !important; }
input-container .input-buttons-wrapper-bottom:has(> .mic-button-container:only-child) { min-width: 0 !important; }`;
  var noDictation_default = definePlugin({
    id: "noDictation",
    name: "NoDictation",
    description: "Hide the microphone (voice input) button in the message box.",
    tags: ["Declutter"],
    icon: I3.micOff,
    enabledByDefault: true,
    updated: "2026-10-14",
    start(ctx) {
      ctx.css(NO_DICTATION_CSS);
    }
  });

  // sites/gemini/plugins/noShareLink/index.ts
  var noShareLink_default = definePlugin({
    id: "noShareLink",
    name: "NoShareLink",
    description: "Hide the buttons that create public share links.",
    tags: ["Declutter", "Privacy"],
    icon: I3.share,
    enabledByDefault: true,
    updated: "2026-10-14",
    settings: {
      hideChatShare: { type: "boolean", label: "Share conversation", description: '"Share conversation" in the conversation menu.', default: true },
      hidePublicLinks: { type: "boolean", label: "Your public links", description: '"Your public links" in the settings menu.', default: false }
    },
    start(ctx) {
      const rules = [];
      if (ctx.settings.hideChatShare) rules.push("[role='menuitem'][data-test-id='share-button'], gem-menu-item[data-test-id='share-button']");
      if (ctx.settings.hidePublicLinks) rules.push("[role='menuitem'][data-test-id='toggle-shared-links-button']");
      if (rules.length) ctx.css(`${rules.join(",\n")} { display: none !important; }`);
    }
  });

  // sites/gemini/plugins/noSidebarIdentity/index.ts
  var ACCOUNT = "sidenav-mavatar-footer";
  var noSidebarIdentity_default = definePlugin({
    id: "noSidebarIdentity",
    name: "NoSidebarIdentity",
    description: "Hide your name, email and plan in the side panel; the avatar stays clickable.",
    tags: ["Privacy"],
    icon: I3.userX,
    enabledByDefault: true,
    updated: "2026-10-14",
    settings: {
      hideName: { type: "boolean", label: "Name", description: "Your name next to the side-panel avatar.", default: true },
      hideEmail: { type: "boolean", label: "Email", description: "Your email in the account link's tooltip and label.", default: true },
      hidePlan: { type: "boolean", label: "Plan label", description: "The plan label (Pro, Ultra…) under your name.", default: false }
    },
    start(ctx) {
      const r3 = [];
      const { hideName, hidePlan } = ctx.settings;
      if (hideName) r3.push(`${ACCOUNT} .mavatar-user-name`, ".ggpp-custom-name");
      if (hidePlan) r3.push(`${ACCOUNT} .mavatar-tier-enterprise-labels`);
      if (hideName && hidePlan) r3.push(`${ACCOUNT} .mavatar-user-info`);
      if (ctx.settings.hideEmail) {
        const link = () => document.querySelector(`${ACCOUNT} a[aria-label^='Google Account']`);
        const scrub = () => {
          const a3 = link();
          const label = a3?.getAttribute("aria-label");
          if (a3 && label && /\(.+@.+\)/.test(label)) {
            a3.dataset.ggppLabel = label;
            a3.setAttribute("aria-label", label.replace(/\s*\(.+@.+\)/, ""));
          }
        };
        scrub();
        ctx.setInterval(scrub, 2e3);
        ctx.cleanup(() => {
          const a3 = link();
          if (a3?.dataset.ggppLabel) {
            a3.setAttribute("aria-label", a3.dataset.ggppLabel);
            delete a3.dataset.ggppLabel;
          }
        });
      }
      if (r3.length) ctx.css(`${r3.join(",\n")} { display: none !important; }`);
    }
  });

  // sites/gemini/plugins/noStarters/index.ts
  var noStarters_default = definePlugin({
    id: "noStarters",
    name: "NoStarters",
    description: "Hide suggested prompts and promo cards on the home screen.",
    tags: ["Declutter"],
    icon: I3.sparkles,
    enabledByDefault: true,
    updated: "2026-10-14",
    start(ctx) {
      ctx.css(`
      modular-zero-state :is(zero-state-block-picker ~ *, .zero-state-suggestions, [data-test-id*='suggestion' i], intent-card, card-zero-state, .greeting-container button),
      prompt-flow-bar:not(.in-conversation) { display: none !important; }
    `);
    }
  });

  // sites/gemini/plugins/oneko/index.ts
  var oneko_default = definePlugin({
    id: "oneko",
    name: "Oneko",
    description: "A small cat follows your mouse cursor and naps when you stop.",
    tags: ["Appearance"],
    icon: I3.cat,
    updated: "2026-10-14",
    settings: {
      speed: { type: "number", label: "Speed", default: 10, min: 4, max: 24, slider: true, unit: "px" }
    },
    start(ctx) {
      const cat = h4("div", { id: "ggpp-oneko", "aria-hidden": "true" }, "🐈");
      const zz = h4("span", { class: "ggpp-oneko-z" }, "💤");
      cat.append(zz);
      document.body.append(cat);
      ctx.cleanup(() => cat.remove());
      ctx.css(`
      #ggpp-oneko { position: fixed; left: 0; top: 0; z-index: 2147482000; pointer-events: none; font-size: 26px; line-height: 1; width: 32px; height: 32px; text-align: center; image-rendering: pixelated; transition: transform .05s linear; }
      #ggpp-oneko.ggpp-run { animation: ggpp-hop .25s steps(2) infinite; }
      #ggpp-oneko .ggpp-oneko-z { position: absolute; left: 18px; top: -14px; font-size: 14px; opacity: 0; transition: opacity .4s; }
      #ggpp-oneko.ggpp-sleep .ggpp-oneko-z { opacity: 1; }
      @keyframes ggpp-hop { 50% { margin-top: -3px; } }
    `);
      let x4 = 32;
      let y3 = 32;
      let mx = x4;
      let my = y3;
      let idle = 0;
      let flip = 1;
      window.addEventListener("mousemove", (e3) => (mx = e3.clientX, my = e3.clientY), { passive: true, signal: ctx.signal });
      const step2 = () => {
        const dx = mx - x4;
        const dy = my - y3;
        const d3 = Math.hypot(dx, dy);
        const speed = ctx.settings.speed;
        if (d3 < 48) {
          idle++;
          cat.classList.remove("ggpp-run");
          cat.classList.toggle("ggpp-sleep", idle > 40);
        } else {
          idle = 0;
          cat.classList.remove("ggpp-sleep");
          cat.classList.add("ggpp-run");
          x4 += dx / d3 * speed;
          y3 += dy / d3 * speed;
          if (Math.abs(dx) > 2) flip = dx > 0 ? -1 : 1;
        }
        x4 = Math.min(Math.max(16, x4), innerWidth - 16);
        y3 = Math.min(Math.max(16, y3), innerHeight - 16);
        cat.style.transform = `translate(${x4 - 16}px, ${y3 - 16}px) scaleX(${flip})`;
        zz.style.transform = `scaleX(${flip})`;
      };
      ctx.setInterval(step2, 100);
    }
  });

  // src/lib/cssEditor.ts
  function formatCss(css) {
    let out = "";
    let depth = 0;
    const pad = () => "    ".repeat(depth);
    for (const raw2 of css.split(/(?<=[{};])/)) {
      const part = raw2.trim();
      if (!part) continue;
      if (part.endsWith("{")) {
        out += `${pad()}${part.slice(0, -1).trim()} {
`;
        depth++;
      } else if (part.endsWith("}")) {
        const decl = part.slice(0, -1).trim();
        if (decl) out += `${pad()}${decl}${decl.endsWith(";") ? "" : ";"}
`;
        depth = Math.max(0, depth - 1);
        out += `${pad()}}
${depth === 0 ? "\n" : ""}`;
      } else {
        out += `${pad()}${part}
`;
      }
    }
    return out.trimEnd();
  }
  function cssEditor(value, onInput, placeholder = "Paste your CSS here...") {
    const ta = h4("textarea", {
      class: "ggpp-input ggpp-css-editor",
      spellcheck: false,
      autocapitalize: "off",
      autocomplete: "off",
      placeholder,
      value
    });
    ta.addEventListener("input", () => onInput(ta.value));
    ta.addEventListener("keydown", (e3) => {
      if (e3.key !== "Tab" || e3.shiftKey) return;
      e3.preventDefault();
      document.execCommand("insertText", false, "    ");
    });
    ta.addEventListener("paste", (e3) => {
      const text = e3.clipboardData?.getData("text/plain") ?? "";
      if (!text.includes("{") || text.includes("\n")) return;
      e3.preventDefault();
      document.execCommand("insertText", false, formatCss(text));
    });
    return ta;
  }

  // sites/gemini/plugins/quickCss/index.ts
  var quickCss_default = definePlugin({
    id: "quickCss",
    name: "QuickCSS",
    description: "Write CSS that applies to Gemini instantly as you type. Adds the Quick CSS tab.",
    tags: ["Appearance"],
    icon: I3.code,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["settings", "ui"],
    async start(ctx) {
      const ui = ctx.use("ui");
      let css = await ctx.data.get("css", "");
      let on3 = await ctx.data.get("enabled", true);
      const style = ctx.css("");
      const apply2 = () => style.textContent = on3 ? css : "";
      apply2();
      ctx.cleanup(
        ctx.use("settingsUI").registerTab({
          id: "quickcss",
          label: "Quick CSS",
          icon: I3.code,
          order: 20,
          render(body) {
            const editor = cssEditor(css, (v3) => {
              css = v3;
              apply2();
              void ctx.data.set("css", css);
            });
            editor.disabled = !on3;
            body.append(
              h4(
                "div",
                { class: "ggpp-field ggpp-field-inline" },
                h4(
                  "div",
                  { class: "ggpp-field-head" },
                  h4("div", { class: "ggpp-field-label" }, "Enable Quick CSS"),
                  h4("div", { class: "ggpp-field-desc" }, "Applies instantly as you type. Stored only on this device. Turn off to keep the code without applying it.")
                ),
                ui.switch(on3, (v3) => {
                  on3 = v3;
                  editor.disabled = !v3;
                  apply2();
                  void ctx.data.set("enabled", v3);
                })
              ),
              editor
            );
          }
        })
      );
    }
  });

  // sites/gemini/plugins/recentTopics/index.ts
  var ACCENTS = ["#2563eb", "#0ea5e9", "#14b8a6", "#f97316", "#64748b"];
  var TRIGGER_CODES = /* @__PURE__ */ new Set(["Backquote", "IntlBackslash"]);
  var TRIGGER_CHARS = /* @__PURE__ */ new Set(["`", "~", "·", "｀", "～"]);
  var BAD_TITLES = /^(gemini|google gemini|new chat|gg\+\+|recent|chats?|history)$/i;
  var accent = (key) => ACCENTS[[...key].reduce((a3, c3) => a3 * 31 + c3.charCodeAt(0) >>> 0, 7) % ACCENTS.length];
  var recentTopics_default = definePlugin({
    id: "recentTopics",
    name: "RecentTopics",
    description: "Hold Ctrl and press ` to flip between recently opened chats, like Alt-Tab.",
    tags: ["Navigation"],
    icon: I3.grid,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      maxRecent: {
        type: "select",
        label: "Chats to show",
        description: "How many recently opened chats to keep.",
        default: "5",
        options: Array.from({ length: 10 }, (_3, i3) => ({ value: String(i3 + 3), label: String(i3 + 3) }))
      },
      includeHome: { type: "boolean", label: "Include new chat", description: "Include the new-chat page in the switcher.", default: true }
    },
    async start(ctx) {
      const gemini = ctx.use("gemini");
      const max = Number(ctx.settings.maxRecent);
      let entries2 = await ctx.data.get("recent", []);
      ctx.on("data:changed", ({ key, value }) => {
        if (key === "recentTopics:recent" && Array.isArray(value) && !panel) entries2 = value;
      });
      const save2 = () => ctx.data.set("recent", entries2);
      const keyOf = () => gemini.route().conversationId ?? (gemini.route().isHome ? "home" : null);
      function snapshot(e3) {
        const msgs = gemini.messages();
        const lastUser = msgs.findLastIndex((m3) => m3.role === "user");
        if (lastUser < 0) return;
        const reply = msgs.slice(lastUser + 1).find((m3) => m3.role === "model");
        e3.user = truncate(msgs[lastUser].text.replace(/\s+/g, " ").trim(), 72);
        const model = reply ? preview(reply.text, 140) : "";
        if (model || !e3.model) e3.model = model;
        e3.theme = gemini.theme();
      }
      function record2() {
        const key = keyOf();
        if (!key || key === "home" && !ctx.settings.includeHome) return;
        const prev = entries2.find((e3) => e3.key === key);
        const title = key === "home" ? "New chat" : gemini.title();
        const entry = { ...prev, key, at: Date.now(), title: !BAD_TITLES.test(title) ? title : prev?.title ?? "Untitled" };
        if (key !== "home") snapshot(entry);
        entries2 = [entry, ...entries2.filter((e3) => e3.key !== key)].slice(0, max);
        void save2();
      }
      let settle2;
      const visit = () => {
        clearTimeout(settle2);
        settle2 = setTimeout(record2, 1200);
      };
      ctx.cleanup(() => clearTimeout(settle2));
      ctx.on("gemini:route", visit);
      ctx.on("gemini:response-end", () => !panel && record2());
      visit();
      ctx.css(`
      .ggpp-rt-overlay { position: fixed; inset: 0; z-index: 2147483100; display: grid; place-items: center; font-family: var(--ggpp-font); }
      .ggpp-rt-panel {
        display: flex; gap: 8px; max-width: calc(100vw - 24px); overflow-x: auto; scrollbar-width: none; padding: 12px;
        border: 1px solid var(--ggpp-border-soft); border-radius: 16px; background: var(--ggpp-surface-2); box-shadow: var(--ggpp-shadow);
        animation: ggpp-fade .09s;
      }
      .ggpp-rt-card {
        all: unset; box-sizing: border-box; flex: none; width: clamp(136px, calc((100vw - 68px) / 5), 204px); padding: 8px;
        border: 1px solid transparent; border-radius: 12px; cursor: pointer; color: var(--ggpp-fg);
      }
      .ggpp-rt-card[aria-selected="true"] { border-color: var(--acc); box-shadow: 0 0 0 1px var(--acc); }
      .ggpp-rt-thumb {
        aspect-ratio: 16 / 9; border-radius: 8px; padding: 8px; overflow: hidden; display: flex; flex-direction: column; gap: 6px;
        background: color-mix(in srgb, var(--acc) 14%, var(--ggpp-bg)); font-size: 11px; line-height: 14px;
      }
      .ggpp-rt-u { align-self: flex-end; max-width: 78%; padding: 4px 8px; border-radius: 14px 14px 4px 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .ggpp-rt-m { max-width: 94%; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
      .ggpp-rt-thumb[data-theme="light"] .ggpp-rt-u { background: #e9eef6; color: #1f1f1f; }
      .ggpp-rt-thumb[data-theme="light"] .ggpp-rt-m { color: #444746; }
      .ggpp-rt-thumb[data-theme="dark"] .ggpp-rt-u { background: #333537; color: #fff; }
      .ggpp-rt-thumb[data-theme="dark"] .ggpp-rt-m { color: #c4c7c5; }
      .ggpp-rt-thumb.ggpp-rt-empty { align-items: center; justify-content: center; font-size: 30px; }
      .ggpp-rt-title { margin-top: 6px; font-size: 12px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-rt-none { padding: 16px 24px; color: var(--ggpp-fg-2); }
    `);
      let panel = null;
      let ctrlDown = false;
      function select(i3) {
        if (!panel || !panel.cards.length) return;
        panel.index = (i3 + panel.cards.length) % panel.cards.length;
        panel.cards.forEach((c3, j4) => c3.setAttribute("aria-selected", String(j4 === panel.index)));
        panel.cards[panel.index].scrollIntoView({ inline: "nearest", block: "nearest" });
      }
      function close(commit) {
        if (!panel) return;
        const target2 = commit ? entries2[panel.index] : void 0;
        panel.overlay.remove();
        panel = null;
        if (!target2 || target2.key === keyOf()) return;
        const base = gemini.newChatUrl();
        gemini.navigate(target2.key === "home" ? base : `${base}/${target2.key}`);
      }
      ctx.cleanup(() => close(false));
      function open(backwards) {
        record2();
        const shown2 = entries2.filter((e3) => e3.key !== "home" || ctx.settings.includeHome);
        entries2 = shown2;
        const cards = shown2.map(
          (e3, i3) => h4(
            "button",
            {
              class: "ggpp-rt-card",
              role: "option",
              type: "button",
              style: { "--acc": accent(e3.key) },
              "aria-label": e3.title,
              onclick: (ev) => {
                ev.stopPropagation();
                select(i3);
                close(true);
              },
              onmousemove: (ev) => {
                if (!panel) return;
                if (!panel.origin) {
                  panel.origin = [ev.clientX, ev.clientY];
                  return;
                }
                if (!panel.moved && Math.hypot(ev.clientX - panel.origin[0], ev.clientY - panel.origin[1]) < 4) return;
                panel.moved = true;
                if (panel.index !== i3) select(i3);
              }
            },
            e3.user || e3.model ? h4(
              "div",
              { class: "ggpp-rt-thumb", dataset: { theme: e3.theme ?? gemini.theme() } },
              e3.user && h4("div", { class: "ggpp-rt-u" }, e3.user),
              e3.model && h4("div", { class: "ggpp-rt-m" }, e3.model)
            ) : h4("div", { class: "ggpp-rt-thumb ggpp-rt-empty", dataset: { theme: gemini.theme() } }, "✦"),
            h4("div", { class: "ggpp-rt-title" }, e3.key === "home" ? "New chat" : e3.title || "Untitled")
          )
        );
        const list2 = h4(
          "div",
          { class: "ggpp-rt-panel", role: "listbox", "aria-label": "Recent conversations" },
          cards.length ? cards : h4("div", { class: "ggpp-rt-none" }, "Open a few chats, then hold Ctrl+` to switch.")
        );
        const overlay = h4("div", { class: "ggpp-rt-overlay" }, list2);
        overlay.addEventListener("mousedown", (ev) => !list2.contains(ev.target) && close(false));
        document.body.append(overlay);
        panel = { overlay, cards, index: 0, moved: false, origin: null };
        select(backwards ? cards.length - 1 : Math.min(1, cards.length - 1));
      }
      const isTrigger = (e3) => TRIGGER_CODES.has(e3.code) || TRIGGER_CHARS.has(e3.key);
      window.addEventListener(
        "keydown",
        (e3) => {
          if (e3.key === "Control") ctrlDown = true;
          if (panel && e3.key === "Escape") {
            e3.preventDefault();
            e3.stopPropagation();
            close(false);
            return;
          }
          if (panel && e3.ctrlKey && e3.key === "Tab") {
            e3.preventDefault();
            e3.stopPropagation();
            select(panel.index + (e3.shiftKey ? -1 : 1));
            return;
          }
          if (!isTrigger(e3) || !e3.ctrlKey || e3.altKey || e3.metaKey) return;
          e3.preventDefault();
          e3.stopPropagation();
          if (e3.repeat) return;
          if (panel) select(panel.index + (e3.shiftKey ? -1 : 1));
          else open(e3.shiftKey);
        },
        { capture: true, signal: ctx.signal }
      );
      window.addEventListener(
        "keyup",
        (e3) => {
          if (e3.key !== "Control") return;
          ctrlDown = false;
          if (panel) close(true);
        },
        { capture: true, signal: ctx.signal }
      );
      window.addEventListener(
        "beforeinput",
        (e3) => {
          if ((panel || ctrlDown) && e3.data && TRIGGER_CHARS.has(e3.data)) e3.preventDefault();
        },
        { capture: true, signal: ctx.signal }
      );
      window.addEventListener("blur", () => ctrlDown = false, { signal: ctx.signal });
      document.addEventListener("visibilitychange", () => document.hidden && close(false), { signal: ctx.signal });
    }
  });

  // sites/gemini/plugins/responseNotification/index.ts
  var responseNotification_default = definePlugin({
    id: "responseNotification",
    name: "ResponseNotification",
    description: "Play a sound and show a system notification when Gemini finishes a reply.",
    tags: ["Notifications"],
    icon: I3.bell,
    updated: "2026-10-14",
    dependencies: ["gemini", "ui"],
    settings: {
      sound: { type: "boolean", label: "Sound", description: "Play a notification sound.", default: true },
      soundUrl: {
        type: "string",
        label: "Custom sound URL",
        description: "Leave empty for the built-in chime.",
        placeholder: "https://example.com/sound.mp3",
        default: "",
        showIf: (v3) => !!v3.sound
      },
      volume: { type: "number", label: "Volume", default: 50, min: 0, max: 100, slider: true, unit: "%", showIf: (v3) => !!v3.sound },
      browserNotification: { type: "boolean", label: "System notification", description: "Show a browser notification.", default: true },
      onlyWhenHidden: { type: "boolean", label: "Only when hidden", description: "Only notify when the tab is in the background.", default: true }
    },
    start(ctx) {
      const ui = ctx.use("ui");
      const notified = /* @__PURE__ */ new Set();
      let audio = null;
      let gestured = false;
      const onGesture = () => {
        gestured = true;
        if (ctx.settings.browserNotification && "Notification" in window && Notification.permission === "default") {
          void Notification.requestPermission();
        }
      };
      for (const ev of ["pointerdown", "keydown", "touchstart"]) window.addEventListener(ev, onGesture, { capture: true, once: true, signal: ctx.signal });
      ctx.cleanup(() => void audio?.close());
      function chime() {
        audio ??= new AudioContext();
        const vol = ctx.settings.volume / 100;
        const t3 = audio.currentTime;
        for (const [i3, freq] of [880, 1318.5].entries()) {
          const osc = audio.createOscillator();
          const gain = audio.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          const start = t3 + i3 * 0.12;
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.25 * vol, start + 0.02);
          gain.gain.exponentialRampToValueAtTime(1e-4, start + 0.5);
          osc.connect(gain).connect(audio.destination);
          osc.start(start);
          osc.stop(start + 0.55);
        }
      }
      function play() {
        if (!gestured) return;
        const url = ctx.settings.soundUrl.trim();
        if (!url) return chime();
        const el = new Audio(url);
        el.volume = ctx.settings.volume / 100;
        el.play().catch(() => chime());
      }
      function notify3(e3) {
        if (!ctx.settings.browserNotification || !("Notification" in window) || Notification.permission !== "granted") return;
        const n2 = new Notification(e3.title && e3.title !== "Gemini" ? e3.title : "Gemini", {
          body: preview(e3.text ?? "", 140) || "Response complete.",
          icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_4g_512_lt_f94943af3be039176192d.png",
          tag: `ggpp-${e3.conversationId ?? "new"}`
        });
        n2.onclick = () => {
          window.focus();
          n2.close();
        };
      }
      ctx.on("gemini:response-end", (e3) => {
        if (e3.error) return;
        const key = e3.responseId ?? `${e3.conversationId}:${Date.now()}`;
        if (notified.has(key)) return;
        if (notified.size > 80) notified.clear();
        notified.add(key);
        if (ctx.settings.onlyWhenHidden && !document.hidden) return;
        if (ctx.settings.sound) play();
        notify3(e3);
      });
      ctx.provide("panel:responseNotification", (el) => {
        el.append(
          h4(
            "div",
            { class: "ggpp-field ggpp-field-inline" },
            h4("div", { class: "ggpp-field-head" }, h4("div", { class: "ggpp-field-desc" }, "Preview the notification sound.")),
            ui.button("Play preview", () => {
              gestured = true;
              play();
            })
          )
        );
      });
    }
  });

  // sites/gemini/plugins/settings/fields.ts
  function settingField(ui, key, def, value, onChange) {
    const head = h4(
      "div",
      { class: "ggpp-field-head" },
      h4("div", { class: "ggpp-field-label" }, def.label, def.restartNeeded && h4("span", { class: "ggpp-pill ggpp-pill-warn", title: "Takes effect after a reload" }, "reload")),
      def.description && h4("div", { class: "ggpp-field-desc" }, def.description)
    );
    const row = h4("div", { class: `ggpp-field ggpp-field-${def.type}`, dataset: { key } }, head);
    switch (def.type) {
      case "boolean": {
        row.classList.add("ggpp-field-inline");
        row.append(ui.switch(value, onChange));
        break;
      }
      case "number": {
        const n2 = value;
        if (def.slider && def.min !== void 0 && def.max !== void 0) {
          const out = h4("output", { class: "ggpp-slider-value" }, `${n2}${def.unit ?? ""}`);
          const input = h4("input", {
            type: "range",
            class: "ggpp-slider",
            min: def.min,
            max: def.max,
            step: def.step ?? 1,
            value: n2,
            oninput: () => out.textContent = `${input.value}${def.unit ?? ""}`,
            onchange: () => onChange(Number(input.value))
          });
          row.append(h4("div", { class: "ggpp-slider-row" }, input, out));
        } else {
          const input = h4("input", {
            type: "number",
            class: "ggpp-input ggpp-number",
            min: def.min,
            max: def.max,
            step: def.step ?? 1,
            value: n2,
            onchange: () => {
              let v3 = Number(input.value);
              if (Number.isNaN(v3)) v3 = def.default;
              if (def.min !== void 0) v3 = Math.max(def.min, v3);
              if (def.max !== void 0) v3 = Math.min(def.max, v3);
              input.value = String(v3);
              onChange(v3);
            }
          });
          row.classList.add("ggpp-field-inline");
          row.append(h4("div", { class: "ggpp-number-wrap" }, input, def.unit && h4("span", { class: "ggpp-unit" }, def.unit)));
        }
        break;
      }
      case "select": {
        const select = h4(
          "select",
          { class: "ggpp-input", onchange: () => onChange(select.value) },
          def.options.map((o3) => h4("option", { value: o3.value, selected: o3.value === value }, o3.label))
        );
        row.append(select);
        break;
      }
      case "string": {
        const input = def.multiline ? h4("textarea", { class: "ggpp-input", rows: 4, placeholder: def.placeholder ?? "", value }) : h4("input", { class: "ggpp-input", placeholder: def.placeholder ?? "", value });
        input.addEventListener("change", () => onChange(input.value));
        row.append(input);
        break;
      }
      case "color": {
        const input = h4("input", { type: "color", class: "ggpp-color", value, onchange: () => onChange(input.value) });
        row.classList.add("ggpp-field-inline");
        row.append(input);
        break;
      }
      case "list": {
        const items = [...coerceListSetting(value)];
        const list2 = h4("div", { class: "ggpp-list" });
        const commit = () => onChange(items.filter((s3) => s3.trim()));
        const render = () => {
          list2.replaceChildren(
            ...items.map((item, i3) => {
              const input = h4("input", {
                class: "ggpp-input",
                value: item,
                placeholder: def.placeholder ?? "",
                onchange: () => (items[i3] = input.value, commit())
              });
              return h4(
                "div",
                { class: "ggpp-list-row" },
                input,
                ui.iconButton(I3.trash, "Remove", () => {
                  items.splice(i3, 1);
                  commit();
                  render();
                })
              );
            }),
            h4(
              "button",
              {
                class: "ggpp-btn ggpp-btn-ghost ggpp-list-add",
                type: "button",
                onclick: () => {
                  items.push("");
                  render();
                  list2.querySelector(".ggpp-list-row:last-of-type input")?.focus();
                }
              },
              icon(I3.plus, 16),
              "Add"
            )
          );
        };
        render();
        row.append(list2);
        break;
      }
      default: {
        const never = def;
        throw new Error(`Unknown setting type ${never.type}`);
      }
    }
    return row;
  }

  // sites/gemini/plugins/settings/runtimeFingerprint.ts
  var RUNTIME_FINGERPRINT_BUILD = "GGPP-HB-20261118-R1";
  var HIDE_BLUE_ID = "hideBlueBackground";
  var STATE_SET = /* @__PURE__ */ new Set(["running", "stopped", "error"]);
  function mapState(raw2) {
    if (raw2 && STATE_SET.has(raw2)) return raw2;
    return "stopped";
  }
  function buildRuntimeFingerprint(plugins2, build = RUNTIME_FINGERPRINT_BUILD) {
    let has = false;
    let state3 = "missing";
    for (const p3 of plugins2) {
      if (p3?.def?.id !== HIDE_BLUE_ID) continue;
      has = true;
      state3 = mapState(p3.state);
      break;
    }
    return {
      build,
      pluginCount: plugins2.length,
      hasHideBlueBackground: has,
      hideBlueBackgroundState: state3
    };
  }
  function readRuntimeFingerprint(pluginsOnce, build = RUNTIME_FINGERPRINT_BUILD) {
    return buildRuntimeFingerprint(pluginsOnce(), build);
  }
  function formatRuntimeFingerprint(fp) {
    return `${fp.build} · count:${fp.pluginCount} · hideBlue:${fp.hasHideBlueBackground} · state:${fp.hideBlueBackgroundState}`;
  }

  // sites/gemini/plugins/settings/settings.css
  var settings_default = ".ggpp-settings { height: min(760px, calc(100vh - 48px)); }\n.ggpp-settings .ggpp-modal-body { flex: 1; padding: 0; overflow: hidden; }\n.ggpp-shell { display: flex; height: 100%; min-height: 0; border-top: 1px solid var(--ggpp-border-soft); }\n\n.ggpp-nav {\n  flex: none;\n  width: 200px;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  border-right: 1px solid var(--ggpp-border-soft);\n}\n\n.ggpp-nav-item {\n  all: unset;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  height: 40px;\n  padding: 0 16px;\n  border-radius: 20px;\n  font: 500 14px/20px var(--ggpp-font);\n  color: var(--ggpp-fg-2);\n  cursor: pointer;\n}\n\n.ggpp-nav-item:hover { background: var(--ggpp-hover); }\n.ggpp-nav-item.ggpp-on { background: var(--ggpp-accent-soft); color: var(--ggpp-fg); }\n.ggpp-nav-item:focus-visible { outline: 2px solid var(--ggpp-accent); }\n\n.ggpp-version {\n  margin-top: auto;\n  padding: 8px 16px;\n  font-size: 11px;\n  line-height: 16px;\n  color: var(--ggpp-fg-3);\n  opacity: 0.7;\n}\n\n.ggpp-pane { flex: 1; min-width: 0; display: flex; flex-direction: column; }\n.ggpp-pane-head { display: flex; align-items: center; gap: 8px; padding: 16px 24px 8px; }\n.ggpp-pane-head h3 { margin: 0; font: 400 18px/24px var(--ggpp-font); }\n.ggpp-hint { color: var(--ggpp-fg-3); cursor: help; }\n.ggpp-pane-body { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 12px; padding: 4px 24px 20px; overflow: auto; }\n\n.ggpp-banner {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 8px 8px 8px 16px;\n  border-radius: 12px;\n  background: color-mix(in srgb, var(--ggpp-warn) 16%, transparent);\n  color: var(--ggpp-fg);\n}\n\n.ggpp-banner span { flex: 1; }\n.ggpp-banner[hidden] { display: none; }\n\n.ggpp-cats {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px 16px;\n  border-bottom: 1px solid var(--ggpp-border-soft);\n}\n\n.ggpp-cat {\n  all: unset;\n  padding: 6px 0;\n  margin-bottom: -1px;\n  font: 500 13px/20px var(--ggpp-font);\n  color: var(--ggpp-fg-3);\n  border-bottom: 2px solid transparent;\n  cursor: pointer;\n}\n\n.ggpp-cat:hover { color: var(--ggpp-fg); }\n.ggpp-cat.ggpp-on { color: var(--ggpp-fg); border-bottom-color: var(--ggpp-accent); }\n.ggpp-cat:focus-visible { outline: 2px solid var(--ggpp-accent); }\n\n.ggpp-searchbar { display: flex; gap: 8px; }\n.ggpp-search { flex: 1; }\n.ggpp-filter { width: 8rem; flex: none; }\n\n.ggpp-plugin-scroll {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n  padding: 8px 2px 16px;\n  mask-image: linear-gradient(transparent, #000 8px, #000 calc(100% - 16px), transparent);\n}\n\n.ggpp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px; }\n\n.ggpp-grid-sep {\n  margin: 20px 0 10px;\n  padding-top: 12px;\n  border-top: 1px solid var(--ggpp-border-soft);\n  font: 500 12px/16px var(--ggpp-font);\n  color: var(--ggpp-fg-3);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.ggpp-empty { padding: 32px 0; text-align: center; color: var(--ggpp-fg-2); }\n\n.ggpp-card {\n  display: flex;\n  flex-direction: column;\n  min-height: 112px;\n  border: 1px solid var(--ggpp-border-soft);\n  border-radius: 12px;\n  background: var(--ggpp-surface);\n  overflow: hidden;\n}\n\n.ggpp-card.ggpp-required { opacity: 0.55; }\n.ggpp-card.ggpp-crashed { opacity: 0.7; border-color: var(--ggpp-danger); }\n.ggpp-card-head { display: flex; align-items: center; gap: 6px; padding: 10px 10px 4px 12px; min-width: 0; }\n\n.ggpp-card-icon {\n  display: grid;\n  place-items: center;\n  flex: none;\n  width: 28px;\n  height: 28px;\n  border-radius: 8px;\n  background: var(--ggpp-accent-soft);\n  color: var(--ggpp-fg);\n}\n\n.ggpp-card-name { font: 500 14px/20px var(--ggpp-font); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }\n.ggpp-spacer { flex: 1; }\n.ggpp-card .ggpp-icon-btn { width: 28px; height: 28px; color: var(--ggpp-fg-3); }\n.ggpp-card .ggpp-icon-btn.ggpp-active { color: var(--ggpp-accent); }\n.ggpp-card .ggpp-icon-btn.ggpp-active svg { fill: currentColor; }\n.ggpp-card .ggpp-switch { transform: scale(0.8); margin-left: -4px; }\n\n.ggpp-card-desc {\n  margin: 0;\n  padding: 0 12px 10px;\n  font-size: 13px;\n  line-height: 18px;\n  color: var(--ggpp-fg-2);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.ggpp-card-foot { margin-top: auto; padding: 6px 12px; border-top: 1px solid var(--ggpp-border-soft); font-size: 11px; color: var(--ggpp-fg-3); }\n.ggpp-badge { display: inline-grid; color: var(--ggpp-fg-3); cursor: help; }\n.ggpp-badge-err { color: var(--ggpp-danger); }\n\n.ggpp-pill {\n  padding: 0 8px;\n  border-radius: 10px;\n  background: var(--ggpp-accent);\n  color: var(--ggpp-accent-fg);\n  font: 500 11px/18px var(--ggpp-font);\n  margin-left: 6px;\n}\n\n.ggpp-pill-warn { background: color-mix(in srgb, var(--ggpp-warn) 25%, transparent); color: var(--ggpp-fg); }\n.ggpp-error-text { color: var(--ggpp-danger); margin: 0; }\n\n.ggpp-section-label {\n  margin-top: 4px;\n  font: 500 12px/16px var(--ggpp-font);\n  color: var(--ggpp-fg-3);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n/* fields */\n.ggpp-fields { display: flex; flex-direction: column; gap: 14px; }\n.ggpp-field { display: flex; flex-direction: column; gap: 8px; }\n.ggpp-field-inline { flex-direction: row; align-items: center; gap: 16px; }\n.ggpp-field-head { flex: 1; min-width: 0; }\n.ggpp-field-label { font-weight: 500; display: flex; align-items: center; }\n.ggpp-field-desc { font-size: 13px; line-height: 18px; color: var(--ggpp-fg-2); margin-top: 2px; }\n.ggpp-number-wrap { display: flex; align-items: center; gap: 6px; }\n.ggpp-number { width: 96px; }\n.ggpp-unit { color: var(--ggpp-fg-3); }\n.ggpp-slider-row { display: flex; align-items: center; gap: 12px; }\n.ggpp-slider { flex: 1; accent-color: var(--ggpp-accent); }\n.ggpp-slider-value { min-width: 48px; text-align: right; font-variant-numeric: tabular-nums; color: var(--ggpp-fg-2); }\n.ggpp-color { width: 48px; height: 32px; border: 1px solid var(--ggpp-border); border-radius: 8px; background: none; padding: 2px; cursor: pointer; }\n.ggpp-list { display: flex; flex-direction: column; gap: 6px; }\n.ggpp-list-row { display: flex; gap: 6px; align-items: center; }\n.ggpp-list-add { align-self: flex-start; }\n\n@media (width <= 720px) {\n  .ggpp-shell { flex-direction: column; }\n  .ggpp-nav { width: auto; flex-direction: row; overflow-x: auto; border-right: 0; border-bottom: 1px solid var(--ggpp-border-soft); }\n  .ggpp-version { display: none; }\n}\n\n.ggpp-css-editor {\n  flex: 1;\n  min-height: 260px;\n  font: 13px/20px var(--ggpp-mono);\n  tab-size: 4;\n  white-space: pre;\n  overflow: auto;\n  background: var(--ggpp-surface);\n}\n\n.ggpp-css-editor:disabled { opacity: 0.5; }\n.ggpp-theme-section { padding-bottom: 12px; border-bottom: 1px solid var(--ggpp-border-soft); }\n.ggpp-searchbar[hidden] { display: none; }\n";

  // sites/gemini/plugins/settings/index.ts
  var RECENT_DAYS = 7;
  var NEW_DAYS = 2;
  var DAY = 864e5;
  var settings_default2 = definePlugin({
    id: "settings",
    name: "Settings",
    description: "The GG++ settings screen: plugins, themes and custom CSS.",
    tags: [],
    required: true,
    dependencies: ["ui", "gemini", "menus"],
    icon: I3.settings,
    liveSettings: true,
    settings: {
      shortcut: {
        type: "boolean",
        label: "Keyboard shortcut",
        description: "Open GG++ settings with Ctrl/⌘ + Shift + , (comma).",
        default: true
      }
    },
    async start(ctx) {
      const kernel = ctx.use("kernel");
      const ui = ctx.use("ui");
      ctx.css(settings_default);
      const tabs = /* @__PURE__ */ new Map();
      const settingsUIApi = {};
      ctx.provide("settingsUI", settingsUIApi);
      let favorites = await ctx.data.get("favorites", []);
      let pins = await ctx.data.get("pins", []);
      const firstSeen = await ctx.data.get("firstSeen", {});
      const fresh = Object.keys(firstSeen).length === 0;
      let seenChanged = false;
      for (const p3 of kernel.plugins()) {
        if (p3.def.required || p3.def.hidden || firstSeen[p3.def.id]) continue;
        firstSeen[p3.def.id] = Date.now();
        seenChanged = true;
      }
      if (seenChanged) void ctx.data.set("firstSeen", firstSeen);
      const bootState = new Map(kernel.plugins().map((p3) => [p3.def.id, p3.enabled]));
      const pendingReload2 = /* @__PURE__ */ new Set();
      let reloadPrompted = false;
      let open = null;
      let lastTab = "plugins";
      const visible = () => kernel.plugins().filter((p3) => !p3.def.hidden);
      const isNew = (p3) => !fresh && !p3.def.required && Date.now() - (firstSeen[p3.def.id] ?? 0) < NEW_DAYS * DAY;
      const hasVisibleSettings = (p3) => {
        if (kernel.service(`panel:${p3.def.id}`)) return true;
        const values = kernel.values(p3.def.id);
        return Object.values(p3.def.settings ?? {}).some((s3) => !s3.showIf || s3.showIf(values));
      };
      async function noteRestart(id, permanent = false) {
        const p3 = kernel.plugin(id);
        if (!p3) return;
        if (permanent) pendingReload2.add(`${id}:setting`);
        else if (p3.enabled === bootState.get(id)) pendingReload2.delete(id);
        else pendingReload2.add(id);
        ctx.emit("settings:reload-changed", pendingReload2.size);
        if (!pendingReload2.size || reloadPrompted) return;
        reloadPrompted = true;
        if (await ui.confirm({
          title: "Reload required",
          body: "This change only fully applies after the Gemini page is reloaded.",
          confirm: "Reload"
        }))
          location.reload();
      }
      function openPluginDialog(id) {
        const p3 = kernel.plugin(id);
        if (!p3) return;
        const schema = p3.def.settings ?? {};
        const list2 = h4("div", { class: "ggpp-fields" });
        const render = () => {
          const values = kernel.values(id);
          const fields = Object.entries(schema).filter(([, s3]) => !s3.showIf || s3.showIf(values)).map(
            ([key, s3]) => settingField(ui, key, s3, values[key], (v3) => {
              kernel.setSetting(id, key, v3);
              if (s3.restartNeeded) void noteRestart(id, true);
              if (Object.values(schema).some((d3) => d3.showIf)) queueMicrotask(render);
            })
          );
          list2.replaceChildren(...fields.length ? fields : [h4("p", { class: "ggpp-muted" }, "No configurable settings.")]);
        };
        render();
        const authors = p3.def.authors?.length ? p3.def.authors.join(", ") : "";
        ui.modal({
          title: p3.def.name,
          icon: p3.def.icon ?? I3.puzzle,
          width: 520,
          className: "ggpp-plugin-dialog",
          content: [
            h4("p", { class: "ggpp-muted" }, p3.def.description),
            p3.error && h4("p", { class: "ggpp-error-text" }, `Failed to start: ${p3.error}`),
            authors && h4("div", { class: "ggpp-section-label" }, "Authors"),
            authors && h4("div", { class: "ggpp-muted" }, authors),
            h4("div", { class: "ggpp-section-label" }, "Settings"),
            list2,
            panel(id)
          ].filter(Boolean),
          footer: Object.keys(schema).length ? [
            ui.button(
              "Reset",
              async () => {
                if (!await ui.confirm({
                  title: "Reset settings",
                  body: "Reset this plugin's settings to defaults? This cannot be undone.",
                  confirm: "Reset",
                  danger: true
                }))
                  return;
                kernel.resetSettings(id);
                render();
              },
              "default"
            )
          ] : void 0
        });
      }
      function panel(id) {
        const render = kernel.service(`panel:${id}`);
        if (!render) return null;
        const el = h4("div", { class: "ggpp-plugin-panel" });
        try {
          render(el);
        } catch (e3) {
          ctx.log.error(`panel for ${id} failed`, e3);
        }
        return el;
      }
      function pluginsTab(container3, signal) {
        let category = favorites.length ? "Favorites" : "All";
        let filter = "all";
        let query = "";
        const banner = h4(
          "div",
          { class: "ggpp-banner", hidden: true },
          icon(I3.info, 18),
          h4("span", null, "Reload the page to apply plugin changes."),
          ui.button("Reload", () => location.reload(), "primary")
        );
        const strip = h4("div", { class: "ggpp-cats", role: "tablist" });
        const search2 = h4("input", {
          class: "ggpp-input ggpp-search",
          type: "search",
          oninput: () => (query = search2.value, renderList())
        });
        const filterSel = h4(
          "select",
          { class: "ggpp-input ggpp-filter", onchange: () => (filter = filterSel.value, renderList()) },
          h4("option", { value: "all" }, "All"),
          h4("option", { value: "enabled" }, "Enabled"),
          h4("option", { value: "disabled" }, "Disabled")
        );
        const listEl = h4("div", { class: "ggpp-plugin-scroll" });
        const fpEl = h4("div", {
          class: "ggpp-runtime-fp",
          role: "status",
          style: {
            fontSize: "11px",
            lineHeight: "16px",
            color: "var(--ggpp-fg-3)",
            padding: "0 0 8px",
            fontFamily: "var(--ggpp-font)",
            wordBreak: "break-all"
          }
        });
        const syncFingerprint = () => {
          const fp = readRuntimeFingerprint(() => kernel.plugins());
          fpEl.dataset.ggppFpBuild = fp.build;
          fpEl.dataset.ggppFpPluginCount = String(fp.pluginCount);
          fpEl.dataset.ggppFpHasHideBlue = String(fp.hasHideBlueBackground);
          fpEl.dataset.ggppFpHideBlueState = fp.hideBlueBackgroundState;
          fpEl.textContent = formatRuntimeFingerprint(fp);
        };
        container3.append(fpEl, banner, strip, h4("div", { class: "ggpp-searchbar" }, search2, filterSel), listEl);
        const syncBanner = () => banner.hidden = !(pendingReload2.size && reloadPrompted);
        syncBanner();
        function renderStrip() {
          const all = visible();
          const cats = [
            "Favorites",
            "Recent",
            "All",
            ...TAGS.filter((t3) => all.some((p3) => p3.def.tags.includes(t3)))
          ];
          strip.replaceChildren(
            ...cats.map(
              (c3) => h4(
                "button",
                {
                  class: `ggpp-cat${c3 === category ? " ggpp-on" : ""}`,
                  role: "tab",
                  "aria-selected": String(c3 === category),
                  onclick: () => {
                    category = c3;
                    renderStrip();
                    renderList();
                  }
                },
                c3
              )
            )
          );
        }
        const byName = (a3, b3) => a3.def.name.localeCompare(b3.def.name, void 0, { sensitivity: "base" });
        const passes = (p3) => filter === "all" || (filter === "enabled" ? p3.enabled || p3.implicit : !(p3.enabled || p3.implicit));
        const pinFirst = (list2) => {
          const pinned = pins.map((id) => list2.find((p3) => p3.def.id === id)).filter((p3) => !!p3);
          return [...pinned, ...list2.filter((p3) => !pins.includes(p3.def.id))];
        };
        function sections() {
          const all = visible().sort(byName).filter(passes);
          switch (category) {
            case "Favorites":
              return [{ items: favorites.map((id) => all.find((p3) => p3.def.id === id)).filter((p3) => !!p3) }];
            case "Recent": {
              const cutoff = Date.now() - RECENT_DAYS * DAY;
              const stamp = (p3) => p3.def.updated ? Date.parse(p3.def.updated) : 0;
              return [{ items: all.filter((p3) => stamp(p3) >= cutoff).sort((a3, b3) => stamp(b3) - stamp(a3) || byName(a3, b3)) }];
            }
            case "All":
              return [
                { items: pinFirst(all.filter((p3) => !p3.def.required)) },
                { title: "Required", items: all.filter((p3) => p3.def.required) }
              ];
            default:
              return [{ items: pinFirst(all.filter((p3) => p3.def.tags.includes(category))) }];
          }
        }
        function renderList() {
          const secs = sections();
          const count2 = secs.reduce((n2, s3) => n2 + s3.items.length, 0);
          search2.placeholder = `Search ${count2} plugins...`;
          const q4 = query.trim().toLowerCase();
          const match = (p3) => !q4 || `${p3.def.name} ${p3.def.description}`.toLowerCase().includes(q4);
          const nodes = [];
          for (const s3 of secs) {
            const items = s3.items.filter(match);
            if (!items.length) continue;
            if (s3.title) nodes.push(h4("div", { class: "ggpp-grid-sep" }, s3.title));
            nodes.push(h4("div", { class: "ggpp-grid" }, items.map(card)));
          }
          if (!nodes.length) {
            const msg = q4 ? "No plugins match your search." : category === "Favorites" ? "No favorites yet. Star a plugin to see it here." : category === "Recent" ? `No plugins updated in the last ${RECENT_DAYS} days.` : "No plugins available.";
            nodes.push(h4("div", { class: "ggpp-empty" }, msg));
          }
          const top = listEl.scrollTop;
          listEl.replaceChildren(...nodes);
          listEl.scrollTop = top;
        }
        const active2 = (btn, on3) => (btn.classList.toggle("ggpp-active", on3), btn);
        function card(p3) {
          const id = p3.def.id;
          const starred = favorites.includes(id);
          const pinned = pins.includes(id);
          const crashed = p3.enabled && p3.state !== "running" && !p3.def.required;
          const locked2 = p3.def.required || p3.neededBy.length > 0;
          const lockReason = p3.def.required ? "Required for GG++ to work" : p3.neededBy.length ? `Needed by ${p3.neededBy.map((n2) => kernel.plugin(n2)?.def.name ?? n2).join(", ")}` : "";
          const badge = (paths, title, cls = "") => h4("span", { class: `ggpp-badge ${cls}`, title }, icon(paths, 14));
          const toggle = (on3) => {
            void kernel.setEnabled(id, on3).then(() => {
              if (p3.def.requiresRestart) void noteRestart(id);
            });
          };
          return h4(
            "article",
            {
              class: `ggpp-card${p3.def.required ? " ggpp-required" : ""}${crashed ? " ggpp-crashed" : ""}`,
              dataset: { plugin: id }
            },
            h4(
              "div",
              { class: "ggpp-card-head" },
              h4("span", { class: "ggpp-card-icon" }, icon(p3.def.icon ?? I3.puzzle, 16)),
              h4("span", { class: "ggpp-card-name", title: p3.def.name }, p3.def.name),
              crashed && badge(I3.ban, `This plugin failed to start${p3.error ? `: ${p3.error}` : ""}`, "ggpp-badge-err"),
              p3.def.required && badge(I3.info, "This plugin is required for GG++ to work"),
              p3.def.requiresRestart && badge(I3.reset, "Needs a page reload to fully apply"),
              isNew(p3) && h4("span", { class: "ggpp-pill" }, "New"),
              h4("span", { class: "ggpp-spacer" }),
              active2(
                ui.iconButton(I3.star, starred ? "Remove from favorites" : "Add to favorites", () => {
                  favorites = starred ? favorites.filter((f3) => f3 !== id) : [id, ...favorites];
                  void ctx.data.set("favorites", favorites);
                  renderList();
                }),
                starred
              ),
              !p3.def.required && active2(
                ui.iconButton(I3.pin, pinned ? "Unpin from top" : "Pin to top", () => {
                  pins = pinned ? pins.filter((f3) => f3 !== id) : [id, ...pins];
                  void ctx.data.set("pins", pins);
                  renderList();
                }),
                pinned
              ),
              hasVisibleSettings(p3) && ui.iconButton(I3.settings, "Settings", () => openPluginDialog(id)),
              h4("span", { title: lockReason }, ui.switch(p3.enabled || p3.implicit, toggle, locked2))
            ),
            h4("p", { class: "ggpp-card-desc", title: p3.def.description }, p3.def.description),
            p3.def.authors?.length && h4("footer", { class: "ggpp-card-foot" }, p3.def.authors.join(", "))
          );
        }
        const refresh = () => {
          syncFingerprint();
          renderStrip();
          renderList();
          syncBanner();
        };
        const offChange = kernel.on("kernel:changed", refresh);
        const offReload = kernel.on("settings:reload-changed", syncBanner);
        signal.addEventListener("abort", () => (offChange(), offReload()));
        refresh();
        setTimeout(() => search2.focus());
      }
      const allTabs = () => [{ id: "plugins", label: "Plugins", icon: I3.puzzle, order: 0, hint: "Toggle features. Click the gear to configure.", render: pluginsTab }, ...tabs.values()].sort(
        (a3, b3) => (a3.order ?? 50) - (b3.order ?? 50)
      );
      function showSettings(tabId = lastTab, pluginId) {
        if (open) {
          const current3 = open;
          current3.select(tabId);
          if (pluginId) openPluginDialog(pluginId);
          return current3;
        }
        const session = { closed: false, failed: false };
        const nav = h4("nav", { class: "ggpp-nav" });
        const pane = h4("section", { class: "ggpp-pane" });
        let paneAbort = null;
        const select = (id) => {
          const tab = allTabs().find((t3) => t3.id === id) ?? allTabs()[0];
          lastTab = tab.id;
          paneAbort?.abort();
          paneAbort = new AbortController();
          for (const b3 of nav.querySelectorAll(".ggpp-nav-item")) b3.classList.toggle("ggpp-on", b3.dataset.tab === tab.id);
          const body = h4("div", { class: "ggpp-pane-body" });
          pane.replaceChildren(
            h4("header", { class: "ggpp-pane-head" }, h4("h3", null, tab.label), tab.hint && h4("span", { class: "ggpp-hint", title: tab.hint }, icon(I3.info, 16))),
            body
          );
          try {
            tab.render(body, paneAbort.signal);
          } catch (e3) {
            ctx.log.error(`tab ${tab.id} failed`, e3);
            body.replaceChildren(h4("p", { class: "ggpp-error-text" }, `This tab failed to load: ${e3}`));
          }
        };
        const renderNav = () => {
          nav.replaceChildren(
            ...allTabs().map(
              (t3) => h4(
                "button",
                { class: "ggpp-nav-item", dataset: { tab: t3.id }, onclick: () => select(t3.id) },
                icon(t3.icon, 18),
                h4("span", null, t3.label)
              )
            ),
            h4("div", { class: "ggpp-version" }, `GG++ ${kernel.version}`, h4("br"), "userscript")
          );
        };
        renderNav();
        const offTabs = kernel.on("settings:tabs-changed", () => {
          renderNav();
          select(lastTab);
        });
        const modal = ui.modal({
          title: "GG++",
          icon: I3.ggpp,
          width: 960,
          className: "ggpp-settings",
          content: h4("div", { class: "ggpp-shell" }, nav, pane),
          onClose: (reason2) => {
            if (session.closed) return;
            session.failed ||= ctx.signal.aborted || reason2 !== "user";
            session.closed = true;
            paneAbort?.abort();
            offTabs();
            if (open?.session === session) open = null;
          }
        });
        const view = { root: modal.root, close: modal.close, select, session };
        if (!session.closed) {
          open = view;
          select(tabId);
          if (pluginId) openPluginDialog(pluginId);
        }
        return view;
      }
      function openSettings3(tabId = lastTab, pluginId) {
        showSettings(tabId, pluginId);
      }
      function openRequest(tabId = lastTab, pluginId) {
        let view;
        try {
          view = showSettings(tabId, pluginId);
        } catch {
          return { protocol: "ggpp-settings-request@1", accepted: false, status: () => "failed" };
        }
        return {
          protocol: "ggpp-settings-request@1",
          accepted: true,
          status: () => view.session.failed ? "failed" : view.session.closed ? "dismissed" : ctx.signal.aborted ? "failed" : view.root.isConnected === true ? "open" : "pending"
        };
      }
      Object.assign(settingsUIApi, {
        open: openSettings3,
        openRequest,
        isOpen: () => open?.root.isConnected === true,
        close: (reason2) => open?.close(reason2),
        openPluginDialog,
        tabs: () => allTabs().map(({ id, label, icon: icon2 }) => ({ id, label, icon: icon2 })),
        configurable: () => visible().filter((p3) => !p3.def.required && hasVisibleSettings(p3)).sort((a3, b3) => a3.def.name.localeCompare(b3.def.name, void 0, { sensitivity: "base" })),
        registerTab(tab) {
          tabs.set(tab.id, tab);
          kernel.emit("settings:tabs-changed", tab.id);
          return () => {
            tabs.delete(tab.id);
            kernel.emit("settings:tabs-changed", tab.id);
          };
        }
      });
      ctx.cleanup(() => {
        if (open) {
          open.session.failed = true;
          open.close("dispose");
        }
      });
      ctx.cleanup(
        ctx.use("menus").register({
          id: "ggpp-settings",
          location: "settings",
          label: "GG++",
          icon: I3.ggpp,
          order: -100,
          // SettingsFlyout puts its own GG++ entry, with a submenu, in this place.
          when: () => !kernel.service("settingsFlyout"),
          onSelect: () => openSettings3()
        })
      );
      try {
        const U3 = getU();
        const offFloat = U3.addSlotItem?.("floating", "ggpp.settingsFloating", {
          label: "GG++",
          showLabel: true,
          order: -1e3,
          onSelect: () => openSettings3()
        });
        if (typeof offFloat === "function") ctx.cleanup(offFloat);
        else ctx.cleanup(() => U3.removeSlotItem?.("floating", "ggpp.settingsFloating"));
      } catch (e3) {
        ctx.log.warn("failed to register GG++ floating settings entry", e3);
      }
      ctx.on("ggpp:open-settings", (p3) => openSettings3(p3?.tab, p3?.plugin));
      window.addEventListener(
        "keydown",
        (e3) => {
          if (!ctx.settings.shortcut) return;
          if (!(e3.ctrlKey || e3.metaKey) || !e3.shiftKey || e3.key !== "," && e3.code !== "Comma") return;
          if (isEditable(e3.target) && !e3.target.closest?.("rich-textarea")) return;
          e3.preventDefault();
          e3.stopPropagation();
          if (open) open.close("user");
          else openSettings3();
        },
        { capture: true, signal: ctx.signal }
      );
    }
  });

  // sites/gemini/plugins/settingsFlyout/index.ts
  var settingsFlyout_default = definePlugin({
    id: "settingsFlyout",
    name: "SettingsFlyout",
    description: "Hover GG++ in Gemini's Settings menu for shortcuts to each settings tab and to chosen plugins' settings.",
    tags: ["Navigation"],
    icon: I3.settings,
    enabledByDefault: true,
    updated: "2026-10-21",
    dependencies: ["settings", "menus", "ui"],
    liveSettings: true,
    settings: {
      showOpenSettings: { type: "boolean", label: "Open Settings", description: "Show an item that opens GG++ settings on the last tab you used.", default: true },
      tabShortcuts: { type: "boolean", label: "Tab shortcuts", description: "Show one item per settings tab (Plugins, Themes, Quick CSS…).", default: true },
      pluginShortcuts: { type: "boolean", label: "Plugin settings", description: "Show a submenu that opens a plugin's settings directly. Pick the plugins below.", default: true }
    },
    async start(ctx) {
      let settingsUI = ctx.tryUse("settingsUI");
      while (!(settingsUI && typeof settingsUI.open === "function")) {
        if (ctx.signal.aborted) throw new Error(`Service "settingsUI" is not available`);
        await new Promise((resolve) => ctx.setTimeout(resolve, 0));
        settingsUI = ctx.tryUse("settingsUI");
      }
      const ui = ctx.use("ui");
      let chosen = await ctx.data.get("menuPlugins", {});
      const inMenu = () => settingsUI.configurable().filter((p3) => chosen[p3.def.id] ?? true);
      function entries2() {
        const s3 = ctx.settings;
        const tabs = s3.tabShortcuts ? settingsUI.tabs().map((t3) => ({ label: t3.label, icon: t3.icon, onClick: () => settingsUI.open(t3.id) })) : [];
        const plugins2 = s3.pluginShortcuts ? inMenu() : [];
        const out = [];
        if (s3.showOpenSettings || !tabs.length && !plugins2.length) out.push({ label: "Open Settings", icon: I3.settings, onClick: () => settingsUI.open() });
        if (tabs.length) {
          if (out.length) out.push({ separator: true });
          out.push(...tabs);
        }
        if (plugins2.length) {
          if (out.length) out.push({ separator: true });
          out.push({
            label: "Plugin settings",
            icon: I3.puzzle,
            submenu: () => inMenu().map((p3) => ({ label: p3.def.name, icon: p3.def.icon ?? I3.puzzle, onClick: () => settingsUI.open("plugins", p3.def.id) }))
          });
        }
        return out;
      }
      ctx.provide("settingsFlyout", { entries: entries2 });
      ctx.cleanup(
        ctx.use("menus").register({
          id: "ggpp-settings-flyout",
          location: "settings",
          label: "GG++",
          icon: I3.ggpp,
          order: -100,
          submenu: entries2
        })
      );
      ctx.provide("panel:settingsFlyout", (el) => {
        el.replaceChildren(
          h4("div", { class: "ggpp-section-label" }, "Plugins in the menu"),
          ...settingsUI.configurable().map(
            (p3) => h4(
              "div",
              { class: "ggpp-field ggpp-field-inline" },
              h4("div", { class: "ggpp-field-head" }, h4("div", { class: "ggpp-field-label" }, icon(p3.def.icon ?? I3.puzzle, 16), " ", p3.def.name)),
              ui.switch(chosen[p3.def.id] ?? true, (on3) => {
                chosen = { ...chosen, [p3.def.id]: on3 };
                void ctx.data.set("menuPlugins", chosen);
              })
            )
          )
        );
      });
      ctx.on("data:changed", ({ key, value }) => {
        if (key === "settingsFlyout:menuPlugins" && value && typeof value === "object") chosen = value;
      });
    }
  });

  // sites/gemini/plugins/skillBlocker/index.ts
  var ROW = "gem-menu-item, [role='menuitem'], [role='option'], [role='listitem'], mat-list-item, gem-nav-list-item, mat-card, li, tr, a";
  var CARDISH = /card|item|tile|row|chip|skill|gem/i;
  function container(el) {
    for (let cur = el, depth = 0; cur && cur !== document.body && depth < 10; cur = cur.parentElement, depth++) {
      const r3 = cur.getBoundingClientRect();
      const vw = document.documentElement.clientWidth || innerWidth || Number.POSITIVE_INFINITY;
      if (r3.height > 420 || r3.width > vw * 0.8) return null;
      if (cur.matches(ROW) || CARDISH.test(cur.tagName) || CARDISH.test(cur.className.toString())) return cur;
    }
    return null;
  }
  var skillBlocker_default = definePlugin({
    id: "skillBlocker",
    name: "SkillBlocker",
    description: "Hide the skills or Gems you name from Gemini's lists and menus.",
    tags: ["Privacy", "Declutter"],
    icon: I3.ban,
    enabledByDefault: true,
    updated: "2026-10-14",
    settings: {
      blocked: { type: "list", label: "Names to hide", description: "Exact names, one per row.", placeholder: "Skill or Gem name", default: [] }
    },
    start(ctx) {
      const names = new Set(coerceListSetting(ctx.settings.blocked).map((n2) => n2.trim().toLowerCase()).filter(Boolean));
      if (!names.size) return;
      const hidden = /* @__PURE__ */ new Set();
      const scan2 = () => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n2 = walker.nextNode(); n2; n2 = walker.nextNode()) {
          const text = n2.textContent?.trim().toLowerCase();
          if (!text || !names.has(text)) continue;
          const row = container(n2.parentElement);
          if (!row || hidden.has(row)) continue;
          row.style.setProperty("display", "none", "important");
          row.dataset.ggppBlocked = "1";
          hidden.add(row);
        }
      };
      let timer2;
      const mo3 = new MutationObserver(() => {
        clearTimeout(timer2);
        timer2 = setTimeout(scan2, 150);
      });
      mo3.observe(document.body, { childList: true, subtree: true, characterData: true });
      scan2();
      ctx.cleanup(() => {
        mo3.disconnect();
        clearTimeout(timer2);
        for (const el of hidden) {
          el.style.removeProperty("display");
          delete el.dataset.ggppBlocked;
        }
      });
    }
  });

  // sites/gemini/plugins/starry/index.ts
  var HEX2 = /^#[0-9a-f]{6}$/i;
  var starry_default = definePlugin({
    id: "starry",
    name: "Starry",
    description: "A softly twinkling star field behind the page.",
    tags: ["Appearance"],
    icon: I3.sparkles,
    updated: "2026-10-14",
    settings: {
      starColor: { type: "color", label: "Star color", default: "#ffffff" },
      density: { type: "number", label: "Density", description: "Stars per 10,000 px².", default: 1.2, min: 0.2, max: 5, step: 0.1, slider: true },
      darkOnly: { type: "boolean", label: "Dark theme only", description: "Hide the stars in light theme.", default: true }
    },
    start(ctx) {
      const color = HEX2.test(ctx.settings.starColor) ? ctx.settings.starColor : "#ffffff";
      const [r3, g5, b3] = [1, 3, 5].map((i3) => parseInt(color.slice(i3, i3 + 2), 16));
      const canvas = document.createElement("canvas");
      canvas.className = "ggpp-starry";
      canvas.setAttribute("data-ggpp-own", "");
      document.body.prepend(canvas);
      ctx.cleanup(() => canvas.remove());
      ctx.css(`
      .ggpp-starry { position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; mix-blend-mode: screen; }
      ${ctx.settings.darkOnly ? `:root:not([data-ggpp-theme="dark"]) .ggpp-starry { display: none; }` : ""}
      @media (prefers-reduced-motion: reduce) { .ggpp-starry { opacity: .6; } }
    `);
      const g22 = canvas.getContext("2d");
      let stars = [];
      const resize = () => {
        const dpr = devicePixelRatio || 1;
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
        g22.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n2 = Math.round(innerWidth * innerHeight * ctx.settings.density / 1e4);
        stars = Array.from({ length: n2 }, () => ({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          r: Math.random() * 1.1 + 0.3,
          p: Math.random() * Math.PI * 2,
          s: Math.random() * 15e-4 + 5e-4
        }));
      };
      resize();
      window.addEventListener("resize", resize, { signal: ctx.signal });
      const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
      let raf2 = 0;
      const draw = (t3) => {
        g22.clearRect(0, 0, innerWidth, innerHeight);
        for (const st of stars) {
          const a3 = still ? 0.6 : 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(st.p + t3 * st.s));
          g22.fillStyle = `rgba(${r3},${g5},${b3},${a3.toFixed(3)})`;
          g22.beginPath();
          g22.arc(st.x, st.y, st.r, 0, Math.PI * 2);
          g22.fill();
        }
        if (!still) raf2 = requestAnimationFrame(draw);
      };
      raf2 = requestAnimationFrame(draw);
      ctx.cleanup(() => cancelAnimationFrame(raf2));
    }
  });

  // sites/gemini/plugins/streamerMode/index.ts
  var AREAS = {
    avatar: [`${ACCOUNT} .mavatar-container`, ".ggpp-custom-avatar"],
    name: [`${ACCOUNT} .mavatar-user-info`, ".ggpp-custom-name"],
    conversations: ["conversations-list .title-text", "top-bar-actions .conversation-title"],
    gems: ["side-navigation-content :is(.gem-title, .bot-name, project-item-button-gem .title-text)"],
    greeting: [".greeting-container", "h1.greeting-headline"]
  };
  var streamerMode_default = definePlugin({
    id: "streamerMode",
    name: "StreamerMode",
    description: "Blur personal details while screen sharing. Hover an item to reveal it.",
    tags: ["Privacy"],
    icon: I3.eyeOff,
    updated: "2026-10-14",
    settings: {
      avatar: { type: "boolean", label: "Avatar", default: true },
      name: { type: "boolean", label: "Name", default: true },
      conversations: { type: "boolean", label: "Conversation titles", description: "Titles in the recent chats list.", default: true },
      gems: { type: "boolean", label: "Gem names", default: true },
      greeting: { type: "boolean", label: "Home greeting", description: "The greeting that contains your first name.", default: true },
      strength: { type: "number", label: "Blur strength", default: 6, min: 2, max: 16, slider: true, unit: "px" }
    },
    start(ctx) {
      const sel = Object.keys(AREAS).filter((k4) => ctx.settings[k4]).flatMap((k4) => AREAS[k4]);
      if (!sel.length) return;
      const list2 = sel.join(",\n");
      ctx.css(`
      ${list2} { filter: blur(${ctx.settings.strength}px) !important; transition: filter .2s ease; }
      :is(${sel.map((s3) => `${s3}:hover`).join(", ")}) { filter: none !important; }
      @media (prefers-reduced-motion: reduce) { ${list2} { transition: none !important; } }
    `);
    }
  });

  // src/lib/net.ts
  async function fetchText(url, withSession = false, timeoutMs = 3e4) {
    if (false) {
      const r4 = await browser.runtime.sendMessage({ type: "ggpp:fetch", url, withSession, timeoutMs });
      if (!r4?.ok) throw new Error(r4?.error ?? `Failed to fetch (${r4?.status ?? "?"}).`);
      return r4.text;
    }
    if (typeof GM !== "undefined" && GM.xmlHttpRequest) {
      return new Promise(
        (resolve, reject) => GM.xmlHttpRequest({
          method: "GET",
          url,
          timeout: 3e4,
          onload: (r4) => r4.status >= 200 && r4.status < 300 ? resolve(r4.responseText) : reject(new Error(`Failed to fetch (${r4.status}).`)),
          onerror: () => reject(new Error("Network error.")),
          ontimeout: () => reject(new Error("Timed out."))
        })
      );
    }
    const r3 = await fetch(url, { signal: AbortSignal.timeout(3e4) });
    if (!r3.ok) throw new Error(`Failed to fetch (${r3.status}).`);
    return r3.text();
  }

  // sites/gemini/plugins/themes/index.ts
  function meta(css) {
    const block = css.match(/^\s*\/\*\*?([\s\S]*?)\*\//)?.[1] ?? "";
    const tag = (t3) => block.match(new RegExp(`@${t3}\\s+(.+)`))?.[1]?.trim() ?? "";
    return { name: tag("name"), author: tag("author"), description: tag("description") };
  }
  var themes_default = definePlugin({
    id: "themes",
    name: "Themes",
    description: "Load CSS themes from a URL or keep local ones. Adds the Themes tab.",
    tags: ["Appearance"],
    icon: I3.palette,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["settings", "ui"],
    async start(ctx) {
      const ui = ctx.use("ui");
      let themes = await ctx.data.get("themes", []);
      const styles2 = /* @__PURE__ */ new Map();
      const save2 = () => ctx.data.set("themes", themes);
      async function apply2(t3) {
        let style = styles2.get(t3.id);
        if (!t3.enabled) {
          if (style) style.textContent = "";
          return;
        }
        if (!style) {
          style = ctx.css("");
          style.dataset.ggppTheme = t3.id;
          styles2.set(t3.id, style);
        }
        if (t3.css !== void 0) style.textContent = t3.css;
        else if (t3.url) {
          try {
            const css = await fetchText(t3.url);
            if (themes.find((x4) => x4.id === t3.id)?.enabled) style.textContent = css;
          } catch (e3) {
            ctx.log.warn(`Failed to load theme "${t3.name}"`, e3);
          }
        }
      }
      themes.forEach((t3) => void apply2(t3));
      ctx.cleanup(() => styles2.clear());
      function remove(t3) {
        styles2.get(t3.id)?.remove();
        styles2.delete(t3.id);
        themes = themes.filter((x4) => x4.id !== t3.id);
        void save2();
      }
      function onlineDialog(done) {
        const input = h4("input", { class: "ggpp-input", placeholder: "https://raw.githubusercontent.com/...", type: "url" });
        const err = h4("p", { class: "ggpp-error-text" });
        const go = ui.button("Import", () => void submit(), "primary");
        const sync3 = () => go.disabled = !input.value.trim();
        input.addEventListener("input", () => (err.textContent = "", sync3()));
        input.addEventListener("keydown", (e3) => e3.key === "Enter" && void submit());
        sync3();
        const m3 = ui.modal({
          title: "Add online theme",
          width: 460,
          content: [h4("label", { class: "ggpp-label" }, "URL"), input, err],
          footer: [ui.button("Cancel", () => m3.close(), "ghost"), go]
        });
        setTimeout(() => input.focus());
        async function submit() {
          const url = input.value.trim();
          let u3;
          try {
            u3 = new URL(url);
            if (u3.protocol !== "https:") throw 0;
          } catch {
            err.textContent = "Enter a valid https URL.";
            return;
          }
          if (!/\.css$/i.test(u3.pathname)) return void (err.textContent = "URL must point to a .css file.");
          if (themes.some((t3) => t3.url === url)) return void (err.textContent = "This theme is already added.");
          go.disabled = true;
          go.textContent = "Importing...";
          try {
            const css = await fetchText(url);
            if (!css.trim()) throw new Error("Theme file is empty.");
            if (themes.some((t3) => t3.url === url)) throw new Error("This theme is already added.");
            const m22 = meta(css);
            const fallback = decodeURIComponent(u3.pathname.split("/").pop() ?? url).replace(/\.css$/i, "").replace(/[-_]+/g, " ");
            themes.push({ id: uid("theme"), url, name: m22.name || fallback, author: m22.author, description: m22.description, enabled: false });
            await save2();
            m3.close();
            done();
          } catch (e3) {
            err.textContent = e3 instanceof Error ? e3.message : String(e3);
            go.textContent = "Import";
            sync3();
          }
        }
      }
      function localDialog(done, existing) {
        const name = h4("input", { class: "ggpp-input", placeholder: "My Theme", value: existing?.name ?? "" });
        let css = existing?.css ?? "";
        const editor = cssEditor(css, (v3) => (css = v3, sync3()));
        editor.rows = 14;
        const go = ui.button(existing ? "Save" : "Create", () => submit(), "primary");
        const sync3 = () => go.disabled = !name.value.trim() || !css.trim();
        name.addEventListener("input", sync3);
        sync3();
        const m3 = ui.modal({
          title: existing ? "Edit local theme" : "New local theme",
          width: 640,
          content: [h4("label", { class: "ggpp-label" }, "Name"), name, h4("label", { class: "ggpp-label" }, "CSS"), editor],
          footer: [ui.button("Cancel", () => m3.close(), "ghost"), go]
        });
        function submit() {
          const m22 = meta(css);
          if (existing) Object.assign(existing, { name: name.value.trim(), css, description: m22.description });
          else themes.push({ id: uid("local"), name: name.value.trim(), author: m22.author || "Local", description: m22.description, enabled: false, css });
          void save2();
          if (existing) void apply2(existing);
          m3.close();
          done();
        }
      }
      ctx.cleanup(
        ctx.use("settingsUI").registerTab({
          id: "themes",
          label: "Themes",
          icon: I3.palette,
          order: 10,
          render(body) {
            const list2 = h4("div", { class: "ggpp-theme-list" });
            let query = "";
            let filter = "all";
            const search2 = h4("input", { class: "ggpp-input ggpp-search", type: "search", oninput: () => (query = search2.value, render()) });
            const sel = h4(
              "select",
              { class: "ggpp-input ggpp-filter", onchange: () => (filter = sel.value, render()) },
              ["All", "Enabled", "Disabled", "Online", "Local"].map((o3) => h4("option", { value: o3.toLowerCase() }, o3))
            );
            const bar = h4("div", { class: "ggpp-searchbar" }, search2, sel);
            const section = (title, desc, onManage) => h4(
              "div",
              { class: "ggpp-field ggpp-field-inline ggpp-theme-section" },
              h4("div", { class: "ggpp-field-head" }, h4("div", { class: "ggpp-field-label" }, title), h4("div", { class: "ggpp-field-desc" }, desc)),
              ui.button("Add", onManage)
            );
            body.append(
              section("Online themes", "Load a theme from a URL. It is fetched again on every page load, so updates apply automatically.", () => onlineDialog(render)),
              section("Local themes", "CSS stored only on this device, for private tweaks or drafts.", () => localDialog(render)),
              bar,
              list2
            );
            function render() {
              bar.hidden = !themes.length;
              search2.placeholder = `Search ${themes.length} themes...`;
              const q4 = query.trim().toLowerCase();
              const shown2 = themes.filter(
                (t3) => (filter === "all" || filter === "enabled" && t3.enabled || filter === "disabled" && !t3.enabled || filter === "online" && !!t3.url || filter === "local" && !t3.url) && (!q4 || `${t3.name} ${t3.description} ${t3.author}`.toLowerCase().includes(q4))
              );
              if (!themes.length) return void list2.replaceChildren();
              if (!shown2.length) return void list2.replaceChildren(h4("div", { class: "ggpp-empty" }, "No themes match your search."));
              list2.replaceChildren(
                h4(
                  "div",
                  { class: "ggpp-grid" },
                  shown2.map(
                    (t3) => h4(
                      "article",
                      { class: "ggpp-card" },
                      h4(
                        "div",
                        { class: "ggpp-card-head" },
                        h4("span", { class: "ggpp-card-icon" }, icon(I3.palette, 16)),
                        h4("span", { class: "ggpp-card-name", title: t3.url ?? t3.name }, t3.name || t3.url),
                        h4("span", { class: "ggpp-spacer" }),
                        t3.url ? ui.iconButton(I3.copy, "Copy URL", () => void navigator.clipboard.writeText(t3.url)) : ui.iconButton(I3.edit, "Edit", () => localDialog(render, t3)),
                        ui.iconButton(I3.trash, "Remove", async () => {
                          if (await ui.confirm({ title: "Remove theme", body: `Remove "${t3.name}"?`, confirm: "Remove", danger: true })) {
                            remove(t3);
                            render();
                          }
                        }),
                        ui.switch(t3.enabled, (v3) => {
                          t3.enabled = v3;
                          void save2();
                          void apply2(t3);
                        })
                      ),
                      h4("p", { class: "ggpp-card-desc" }, t3.description),
                      h4("footer", { class: "ggpp-card-foot" }, `${t3.url ? "Online" : "Local"}${t3.author ? ` · ${t3.author}` : ""}`)
                    )
                  )
                )
              );
            }
            render();
          }
        })
      );
    }
  });

  // sites/gemini/plugins/ui/ui.css
  var ui_default = ':root {\n  --ggpp-font: "Google Sans Text", "Google Sans", Roboto, system-ui, sans-serif;\n  --ggpp-mono: "Google Sans Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  --ggpp-bg: #fff;\n  --ggpp-surface: #f0f4f9;\n  --ggpp-surface-2: #e9eef6;\n  --ggpp-hover: rgb(68 71 70 / 8%);\n  --ggpp-fg: #1f1f1f;\n  --ggpp-fg-2: #444746;\n  --ggpp-fg-3: #747775;\n  --ggpp-border: #c4c7c5;\n  --ggpp-border-soft: #e1e3e1;\n  --ggpp-accent: #0b57d0;\n  --ggpp-accent-fg: #fff;\n  --ggpp-accent-soft: #d3e3fd;\n  --ggpp-danger: #b3261e;\n  --ggpp-warn: #b06000;\n  --ggpp-ok: #146c2e;\n  --ggpp-shadow: 0 4px 8px 3px rgb(0 0 0 / 15%), 0 1px 3px rgb(0 0 0 / 30%);\n  --ggpp-radius: 16px;\n}\n\n:root[data-ggpp-theme="dark"] {\n  --ggpp-bg: #1e1f20;\n  --ggpp-surface: #282a2c;\n  --ggpp-surface-2: #333537;\n  --ggpp-hover: rgb(227 227 227 / 8%);\n  --ggpp-fg: #e3e3e3;\n  --ggpp-fg-2: #c4c7c5;\n  --ggpp-fg-3: #8e918f;\n  --ggpp-border: #444746;\n  --ggpp-border-soft: #333537;\n  --ggpp-accent: #a8c7fa;\n  --ggpp-accent-fg: #062e6f;\n  --ggpp-accent-soft: #0842a0;\n  --ggpp-danger: #f2b8b5;\n  --ggpp-warn: #fdd663;\n  --ggpp-ok: #6dd58c;\n  --ggpp-shadow: 0 4px 8px 3px rgb(0 0 0 / 30%), 0 1px 3px rgb(0 0 0 / 50%);\n}\n\n#ggpp-layer {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  pointer-events: none;\n  font-family: var(--ggpp-font);\n  color: var(--ggpp-fg);\n}\n\n#ggpp-layer > * { pointer-events: auto; }\n#ggpp-layer *, #ggpp-layer *::before, #ggpp-layer *::after { box-sizing: border-box; }\n.ggpp-icon { flex: none; display: block; }\n.ggpp-muted { color: var(--ggpp-fg-2); margin: 0; line-height: 1.5; }\n\n/* toasts */\n#ggpp-layer .ggpp-toasts {\n  position: fixed;\n  right: 16px;\n  bottom: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  pointer-events: none;\n  max-width: min(380px, calc(100vw - 32px));\n}\n\n.ggpp-toast {\n  pointer-events: auto;\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n  padding: 12px 12px 12px 16px;\n  border-radius: 12px;\n  background: var(--ggpp-fg);\n  color: var(--ggpp-bg);\n  box-shadow: var(--ggpp-shadow);\n  font-size: 14px;\n  line-height: 20px;\n  animation: ggpp-in 0.18s ease-out;\n}\n\n.ggpp-toast.ggpp-clickable { cursor: pointer; }\n.ggpp-toast.ggpp-out { opacity: 0; transform: translateY(6px); transition: 0.18s; }\n.ggpp-toast-icon { margin-top: 1px; }\n.ggpp-toast-text { flex: 1; min-width: 0; }\n.ggpp-toast-title { font-weight: 500; }\n.ggpp-toast-body { opacity: 0.8; overflow-wrap: anywhere; white-space: pre-line; }\n.ggpp-toast-actions { margin-top: 6px; display: flex; gap: 12px; }\n.ggpp-toast .ggpp-link { all: unset; cursor: pointer; color: inherit; font-weight: 500; text-decoration: underline; }\n\n.ggpp-toast-x {\n  all: unset;\n  cursor: pointer;\n  opacity: 0.7;\n  padding: 2px;\n  border-radius: 50%;\n}\n\n.ggpp-toast-x:hover { opacity: 1; }\n\n@keyframes ggpp-in {\n  from { opacity: 0; transform: translateY(8px); }\n}\n\n/* modal */\n.ggpp-backdrop {\n  position: fixed;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  background: rgb(0 0 0 / 40%);\n  animation: ggpp-fade 0.15s;\n}\n\n.ggpp-backdrop + .ggpp-backdrop { background: transparent; }\n\n@keyframes ggpp-fade {\n  from { opacity: 0; }\n}\n\n.ggpp-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: calc(100vh - 48px);\n  background: var(--ggpp-bg);\n  color: var(--ggpp-fg);\n  border-radius: 28px;\n  box-shadow: var(--ggpp-shadow);\n  overflow: hidden;\n  animation: ggpp-pop 0.18s cubic-bezier(0.2, 0, 0, 1);\n}\n\n@keyframes ggpp-pop {\n  from { opacity: 0; transform: scale(0.96); }\n}\n\n.ggpp-modal-head {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px 16px 12px 24px;\n}\n\n.ggpp-modal-head h2 {\n  flex: 1;\n  margin: 0;\n  font: 400 22px/28px var(--ggpp-font);\n  color: var(--ggpp-fg);\n}\n\n.ggpp-modal-body {\n  padding: 4px 24px 20px;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  font-size: 14px;\n}\n\n.ggpp-modal-foot {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  padding: 12px 24px 20px;\n}\n\n/* controls */\n.ggpp-btn {\n  all: unset;\n  box-sizing: border-box;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  height: 36px;\n  padding: 0 16px;\n  border-radius: 18px;\n  font: 500 14px/20px var(--ggpp-font);\n  cursor: pointer;\n  color: var(--ggpp-accent);\n  border: 1px solid var(--ggpp-border);\n  white-space: nowrap;\n}\n\n.ggpp-btn:hover { background: var(--ggpp-hover); }\n.ggpp-btn:focus-visible { outline: 2px solid var(--ggpp-accent); outline-offset: 2px; }\n.ggpp-btn[disabled] { opacity: 0.4; pointer-events: none; }\n.ggpp-btn-ghost { border-color: transparent; }\n.ggpp-btn-primary { background: var(--ggpp-accent); color: var(--ggpp-accent-fg); border-color: transparent; }\n.ggpp-btn-primary:hover { background: var(--ggpp-accent); filter: brightness(1.08); }\n.ggpp-btn-danger { background: var(--ggpp-danger); color: var(--ggpp-bg); border-color: transparent; }\n\n.ggpp-icon-btn {\n  all: unset;\n  box-sizing: border-box;\n  display: inline-grid;\n  place-items: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  color: var(--ggpp-fg-2);\n  cursor: pointer;\n  flex: none;\n}\n\n.ggpp-icon-btn:hover { background: var(--ggpp-hover); color: var(--ggpp-fg); }\n.ggpp-icon-btn:focus-visible { outline: 2px solid var(--ggpp-accent); }\n.ggpp-icon-btn.ggpp-active { color: var(--ggpp-accent); }\n\n.ggpp-switch {\n  all: unset;\n  box-sizing: border-box;\n  position: relative;\n  flex: none;\n  width: 52px;\n  height: 32px;\n  border-radius: 16px;\n  border: 2px solid var(--ggpp-fg-3);\n  background: var(--ggpp-surface-2);\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\n\n.ggpp-switch::after {\n  content: "";\n  position: absolute;\n  top: 6px;\n  left: 6px;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: var(--ggpp-fg-3);\n  transition: 0.15s cubic-bezier(0.2, 0, 0, 1);\n}\n\n.ggpp-switch[aria-checked="true"] { background: var(--ggpp-accent); border-color: var(--ggpp-accent); }\n.ggpp-switch[aria-checked="true"]::after { left: 22px; top: 2px; width: 24px; height: 24px; background: var(--ggpp-accent-fg); }\n.ggpp-switch:focus-visible { outline: 2px solid var(--ggpp-accent); outline-offset: 2px; }\n.ggpp-switch[disabled] { opacity: 0.38; cursor: default; }\n\n.ggpp-input {\n  all: unset;\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 40px;\n  padding: 8px 12px;\n  border-radius: 8px;\n  border: 1px solid var(--ggpp-border);\n  background: transparent;\n  color: var(--ggpp-fg);\n  font: 400 14px/20px var(--ggpp-font);\n  white-space: pre-wrap;\n}\n\ntextarea.ggpp-input { resize: vertical; font-family: var(--ggpp-mono); font-size: 13px; }\n.ggpp-input:focus { border-color: var(--ggpp-accent); outline: 1px solid var(--ggpp-accent); }\n.ggpp-input::placeholder { color: var(--ggpp-fg-3); }\nselect.ggpp-input { appearance: auto; cursor: pointer; }\nselect.ggpp-input option { background: var(--ggpp-bg); color: var(--ggpp-fg); }\n.ggpp-label { font-weight: 500; color: var(--ggpp-fg); }\n\n/* menu */\n.ggpp-menu {\n  position: fixed;\n  min-width: 180px;\n  max-height: 60vh;\n  overflow: auto;\n  padding: 8px 0;\n  border-radius: 8px;\n  background: var(--ggpp-surface);\n  box-shadow: var(--ggpp-shadow);\n  animation: ggpp-fade 0.12s;\n}\n\n.ggpp-menu-item {\n  all: unset;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  height: 40px;\n  padding: 0 16px;\n  font: 400 14px/20px var(--ggpp-font);\n  color: var(--ggpp-fg);\n  cursor: pointer;\n}\n\n.ggpp-menu-item:hover, .ggpp-menu-item:focus-visible { background: var(--ggpp-hover); }\n.ggpp-menu-item.ggpp-danger { color: var(--ggpp-danger); }\n.ggpp-menu-gap { width: 16px; }\n.ggpp-menu-check { margin-left: auto; color: var(--ggpp-accent); }\n.ggpp-menu-more { color: var(--ggpp-fg-2); }\n.ggpp-menu-sep { height: 1px; margin: 8px 0; background: var(--ggpp-border-soft); }\n.ggpp-menu-heading { padding: 8px 16px 4px; font: 500 12px/16px var(--ggpp-font); color: var(--ggpp-fg-2); }\n';

  // sites/gemini/plugins/ui/index.ts
  var ui_default2 = definePlugin({
    id: "ui",
    name: "UI Kit",
    description: "Toasts, dialogs and theme colors shared by all GG++ plugins.",
    tags: [],
    required: true,
    hidden: true,
    dependencies: ["gemini"],
    start(ctx) {
      const gemini = ctx.use("gemini");
      ctx.css(ui_default);
      const root2 = h4("div", { id: "ggpp-layer" });
      const toasts = h4("div", { class: "ggpp-toasts" });
      root2.append(toasts);
      const syncTheme = () => {
        document.documentElement.dataset.ggppTheme = gemini.theme();
      };
      syncTheme();
      ctx.cleanup(
        whenDocumentBody((body) => {
          body.append(root2);
          const mo3 = new MutationObserver(syncTheme);
          mo3.observe(body, { attributes: true, attributeFilter: ["class", "style"] });
          return () => {
            mo3.disconnect();
            root2.remove();
          };
        })
      );
      matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncTheme, { signal: ctx.signal });
      ctx.cleanup(() => {
        delete document.documentElement.dataset.ggppTheme;
      });
      function toast(o3) {
        const close = () => {
          el.classList.add("ggpp-out");
          setTimeout(() => el.remove(), 180);
        };
        const el = h4(
          "div",
          { class: `ggpp-toast${o3.onClick ? " ggpp-clickable" : ""}`, role: "status" },
          o3.icon && h4("span", { class: "ggpp-toast-icon" }, icon(o3.icon, 18)),
          h4(
            "div",
            { class: "ggpp-toast-text" },
            o3.title && h4("div", { class: "ggpp-toast-title" }, o3.title),
            o3.body && h4("div", { class: "ggpp-toast-body" }, o3.body),
            o3.actions?.length && h4(
              "div",
              { class: "ggpp-toast-actions" },
              o3.actions.map(
                (a3) => h4("button", { class: "ggpp-link", onclick: (e3) => (e3.stopPropagation(), a3.onClick(), close()) }, a3.label)
              )
            )
          ),
          h4(
            "button",
            { class: "ggpp-toast-x", title: "Dismiss", onclick: (e3) => (e3.stopPropagation(), close()) },
            icon(I3.x, 14)
          )
        );
        if (o3.onClick) el.addEventListener("click", () => (o3.onClick(), close()));
        toasts.append(el);
        const duration = o3.duration ?? 5e3;
        if (duration > 0) setTimeout(close, duration);
        return { close };
      }
      function modal(o3) {
        const body = h4("div", { class: "ggpp-modal-body" }, o3.content);
        let closed = false;
        const close = (reason2 = "unknown") => {
          if (closed) return;
          closed = true;
          backdrop.remove();
          window.removeEventListener("keydown", onKey, true);
          o3.onClose?.(reason2 === "user" || reason2 === "dispose" ? reason2 : "unknown");
        };
        const onKey = (e3) => {
          if (e3.key !== "Escape" || root2.lastElementChild !== backdrop) return;
          e3.stopPropagation();
          close("user");
        };
        const dialog = h4(
          "div",
          {
            class: `ggpp-modal ${o3.className ?? ""}`,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": o3.title,
            style: { width: `min(${o3.width ?? 560}px, calc(100vw - 32px))` }
          },
          h4(
            "header",
            { class: "ggpp-modal-head" },
            o3.icon && icon(o3.icon, 20),
            h4("h2", null, o3.title),
            h4("button", { class: "ggpp-icon-btn", title: "Close", onclick: () => close("user") }, icon(I3.x, 18))
          ),
          body,
          o3.footer && h4("footer", { class: "ggpp-modal-foot" }, o3.footer)
        );
        const backdrop = h4("div", { class: "ggpp-backdrop" }, dialog);
        backdrop.addEventListener("mousedown", (e3) => {
          if (e3.target === backdrop) close("user");
        });
        window.addEventListener("keydown", onKey, true);
        root2.append(backdrop);
        ctx.cleanup(() => close("dispose"));
        return { root: dialog, body, close };
      }
      function button(label, onClick, kind = "default") {
        return h4("button", { class: `ggpp-btn ggpp-btn-${kind}`, type: "button", onclick: onClick }, label);
      }
      const menus = [];
      const closeFrom = (level) => {
        for (const m3 of menus.splice(level)) {
          m3.el.remove();
          m3.onClose?.();
        }
        if (!menus.length) window.removeEventListener("mousedown", outside, true);
      };
      const outside = (e3) => {
        if (!menus.some((m3) => m3.el.contains(e3.target))) closeFrom(0);
      };
      ctx.cleanup(() => closeFrom(0));
      function openMenu(anchor, items, opts = {}) {
        const level = Math.min(opts.level ?? 0, menus.length);
        closeFrom(level);
        const sub = (el, entries2) => {
          const show = () => {
            if (menus[level + 1]?.el.dataset.owner === el.dataset.key) return;
            openMenu(el, entries2(), { side: "right", level: level + 1 });
            menus[level + 1].el.dataset.owner = el.dataset.key;
          };
          el.addEventListener("pointerenter", show);
          el.addEventListener("click", (e3) => (e3.stopPropagation(), show()));
          el.addEventListener("keydown", (e3) => {
            if (e3.key !== "ArrowRight") return;
            e3.preventDefault();
            show();
            menus[level + 1]?.el.querySelector(".ggpp-menu-item")?.focus();
          });
        };
        const menu = h4(
          "div",
          { class: "ggpp-menu", role: "menu" },
          items.map((it, i3) => {
            if ("separator" in it) return h4("div", { class: "ggpp-menu-sep", role: "separator" });
            if ("heading" in it) return h4("div", { class: "ggpp-menu-heading" }, it.heading);
            const el = h4(
              "button",
              {
                class: `ggpp-menu-item${"danger" in it && it.danger ? " ggpp-danger" : ""}`,
                role: "menuitem",
                type: "button",
                dataset: { key: `${level}-${i3}` },
                "aria-haspopup": it.submenu ? "menu" : void 0
              },
              it.icon ? icon(it.icon, 16) : h4("span", { class: "ggpp-menu-gap" }),
              h4("span", null, it.label),
              it.submenu ? icon(I3.chevronRight, 16, { class: "ggpp-icon ggpp-menu-check ggpp-menu-more" }) : it.checked && icon(I3.check, 16, { class: "ggpp-icon ggpp-menu-check" })
            );
            if (it.submenu) sub(el, it.submenu);
            else {
              const run = it.onClick;
              el.addEventListener("click", () => (closeFrom(0), run()));
              el.addEventListener("pointerenter", () => closeFrom(level + 1));
            }
            return el;
          })
        );
        menu.addEventListener("keydown", (e3) => {
          const all = [...menu.querySelectorAll(".ggpp-menu-item")];
          const i3 = all.indexOf(document.activeElement);
          if (e3.key === "ArrowDown" || e3.key === "ArrowUp") {
            e3.preventDefault();
            all[(i3 + (e3.key === "ArrowDown" ? 1 : all.length - 1)) % all.length]?.focus();
          } else if (e3.key === "Escape" || e3.key === "ArrowLeft" && level > 0) {
            e3.preventDefault();
            e3.stopPropagation();
            closeFrom(level);
            if (level > 0) anchor.focus();
          }
        });
        root2.append(menu);
        menus.push({ el: menu, onClose: opts.onClose });
        const r3 = anchor.getBoundingClientRect();
        const mh = menu.offsetHeight;
        const mw = menu.offsetWidth;
        let top, left;
        if (opts.side === "right") {
          left = r3.right + 4 + mw > innerWidth ? Math.max(8, r3.left - mw - 4) : r3.right + 4;
          top = Math.min(Math.max(8, r3.top - 8), innerHeight - mh - 8);
        } else {
          top = r3.bottom + 4 + mh > innerHeight ? Math.max(8, r3.top - mh - 4) : r3.bottom + 4;
          left = Math.min(Math.max(8, r3.left), innerWidth - mw - 8);
        }
        Object.assign(menu.style, { top: `${top}px`, left: `${left}px` });
        if (menus.length === 1) setTimeout(() => menus.length && window.addEventListener("mousedown", outside, true));
        return () => closeFrom(menus.findIndex((m3) => m3.el === menu) === -1 ? menus.length : menus.findIndex((m3) => m3.el === menu));
      }
      const api = {
        toast,
        modal,
        confirm: (o3) => new Promise((resolve) => {
          let done = false;
          const finish = (v3) => {
            if (done) return;
            done = true;
            m3.close();
            resolve(v3);
          };
          const m3 = modal({
            title: o3.title,
            width: 420,
            content: o3.body ? h4("p", { class: "ggpp-muted" }, o3.body) : [],
            footer: [
              button("Cancel", () => finish(false), "ghost"),
              button(o3.confirm ?? "OK", () => finish(true), o3.danger ? "danger" : "primary")
            ],
            onClose: () => finish(false)
          });
        }),
        prompt: (o3) => new Promise((resolve) => {
          let done = false;
          const input = o3.multiline ? h4("textarea", { class: "ggpp-input", rows: 6, value: o3.value ?? "" }) : h4("input", { class: "ggpp-input", value: o3.value ?? "" });
          const finish = (v3) => {
            if (done) return;
            done = true;
            m3.close();
            resolve(v3);
          };
          input.addEventListener("keydown", (e3) => {
            const k4 = e3;
            if (k4.key === "Enter" && (!o3.multiline || k4.metaKey || k4.ctrlKey)) finish(input.value);
          });
          const m3 = modal({
            title: o3.title,
            width: 460,
            content: [o3.label ? h4("label", { class: "ggpp-label" }, o3.label) : document.createTextNode(""), input],
            footer: [button("Cancel", () => finish(null), "ghost"), button("Save", () => finish(input.value), "primary")],
            onClose: () => finish(null)
          });
          setTimeout(() => input.focus());
        }),
        switch(checked, onChange, disabled) {
          const el = h4("button", {
            class: "ggpp-switch",
            role: "switch",
            type: "button",
            "aria-checked": String(checked),
            disabled: !!disabled,
            onclick: (e3) => {
              e3.stopPropagation();
              const next = el.getAttribute("aria-checked") !== "true";
              el.setAttribute("aria-checked", String(next));
              onChange(next);
            }
          });
          return el;
        },
        button,
        iconButton: (paths, title, onClick) => h4("button", { class: "ggpp-icon-btn", type: "button", title, "aria-label": title, onclick: onClick }, icon(paths, 18)),
        menu: openMenu,
        theme: gemini.theme
      };
      ctx.provide("ui", api);
    }
  });

  // sites/gemini/plugins/usageDisplay/stats.ts
  var dayKey = (t3) => {
    const d3 = new Date(t3);
    return `${d3.getFullYear()}-${String(d3.getMonth() + 1).padStart(2, "0")}-${String(d3.getDate()).padStart(2, "0")}`;
  };
  function isReset(prevPct, prevReset, pct, reset) {
    if (prevReset !== void 0 && reset !== void 0 && Math.abs(reset - prevReset) >= 6e4) return true;
    return pct < prevPct - 5;
  }
  function record(log, pct, resetAt, at, retainDays) {
    const key = dayKey(at);
    const days = log.filter((d3) => d3.date !== key);
    let today = log.find((d3) => d3.date === key);
    if (today) {
      today = { ...today };
      if (isReset(today.last, today.resetAt, pct, resetAt)) {
        today.before = { start: today.start, end: today.last };
        today.accrued += Math.max(0, today.last - today.start);
        today.start = 0;
      }
      today.last = pct;
      today.resetAt = resetAt ?? today.resetAt;
    } else {
      const prev = [...days].filter((d3) => d3.date < key).pop();
      const start = !prev ? pct : isReset(prev.last, prev.resetAt, pct, resetAt) ? 0 : Math.min(prev.last, pct);
      today = { date: key, start, last: pct, resetAt, accrued: 0 };
    }
    days.push(today);
    days.sort((a3, b3) => a3.date.localeCompare(b3.date));
    const cutoff = dayKey(at - retainDays * 864e5);
    return days.filter((d3) => d3.date > cutoff);
  }
  var used = (d3) => d3.accrued + Math.max(0, d3.last - d3.start);
  function calendar(log, now2) {
    const byDate = new Map(log.map((d3) => [d3.date, d3]));
    const today = new Date(now2);
    today.setHours(12, 0, 0, 0);
    const first = new Date(today);
    first.setDate(first.getDate() - 6);
    if (log.length) {
      const [y3, m3, d3] = log[0].date.split("-").map(Number);
      const oldest = new Date(y3, m3 - 1, d3, 12);
      if (oldest < first) first.setTime(oldest.getTime());
    }
    const out = [];
    for (const t3 = new Date(first); t3 <= today; t3.setDate(t3.getDate() + 1)) {
      const key = dayKey(t3.getTime());
      out.push({ date: key, day: byDate.get(key) });
    }
    return out;
  }
  var signed = (v3) => v3 === void 0 ? "—" : `+${Math.round(v3 * 10) / 10}%`;

  // sites/gemini/composerAppearanceDiagnostics.ts
  var CSS_REDACTED = "[redacted]";
  var COMPOSER_LAYER_IDS = [
    "inputContainer",
    "before",
    "after",
    "inputAreaContainer",
    "inputAreaV2",
    "inputArea"
  ];
  var COMPOSER_BUTTON_ROLES = [
    "voice",
    "submit",
    "stop",
    "buttonsWrapper"
  ];
  var SEL_VOICE_CONTAINER = ".mic-button-container";
  var SEL_VOICE_CONTROL = "speech-dictation-mic-button";
  var SEL_SEND_CONTAINER = "[data-test-id='send-button-container']";
  var SEL_STOP_MARK = ".stop";
  var SEL_BUTTONS_WRAPPER = ".input-buttons-wrapper-bottom";
  var MAX_CSS_VALUE_LEN = 384;
  var SAFE_TOKEN = /^(?:none|inset|at|to|from|left|right|top|bottom|center|closest-side|closest-corner|farthest-side|farthest-corner|circle|ellipse|in|srgb|display-p3|rec2020|a98-rgb|prophoto-rgb|xyz|xyz-d50|xyz-d65|transparent|currentcolor|[-+]?(?:\d+\.?\d*|\.\d+)(?:%|px|em|rem|vh|vw|vmin|vmax|pt|pc|cm|mm|in|deg|rad|grad|turn|s|ms|fr)?)$/i;
  var SAFE_DISPLAY = /* @__PURE__ */ new Set([
    "none",
    "block",
    "inline",
    "inline-block",
    "flex",
    "inline-flex",
    "grid",
    "inline-grid",
    "contents",
    "flow-root",
    "table",
    "table-cell",
    "list-item"
  ]);
  function emptyLayer(present = false) {
    return {
      present,
      backgroundColor: null,
      backgroundImage: null,
      background: null,
      boxShadow: null,
      filter: null,
      opacity: null,
      borderRadius: null
    };
  }
  function emptyLayers() {
    return {
      inputContainer: emptyLayer(),
      before: emptyLayer(),
      after: emptyLayer(),
      inputAreaContainer: emptyLayer(),
      inputAreaV2: emptyLayer(),
      inputArea: emptyLayer()
    };
  }
  function emptyButton() {
    return {
      present: false,
      visible: false,
      display: null,
      width: null,
      height: null,
      top: null,
      left: null
    };
  }
  function emptyButtons() {
    return {
      voice: emptyButton(),
      submit: emptyButton(),
      stop: emptyButton(),
      buttonsWrapper: emptyButton()
    };
  }
  function emptyComposerAppearanceDiagnostics(errorCode = "ok") {
    return {
      errorCode,
      hasInputGradient: false,
      layers: emptyLayers(),
      buttons: emptyButtons()
    };
  }
  function sanitizeCssVisualValue(raw2) {
    if (raw2 == null) return null;
    if (typeof raw2 !== "string") return CSS_REDACTED;
    const s3 = raw2.trim();
    if (!s3) return null;
    if (s3.length > MAX_CSS_VALUE_LEN) return CSS_REDACTED;
    if (s3.includes("\\") || /["']/.test(s3) || /\burl\s*\(/i.test(s3)) return CSS_REDACTED;
    if (/[@<>]|data:|javascript:/i.test(s3)) return CSS_REDACTED;
    if (!/^[\w\s.,%+\-#()/]+$/i.test(s3)) return CSS_REDACTED;
    const SAFE_FN_NAMES = new Set(
      [
        "rgb",
        "rgba",
        "hsl",
        "hsla",
        "hwb",
        "lab",
        "lch",
        "oklab",
        "oklch",
        "color",
        "color-mix",
        "light-dark",
        "linear-gradient",
        "radial-gradient",
        "conic-gradient",
        "repeating-linear-gradient",
        "repeating-radial-gradient",
        "repeating-conic-gradient",
        "blur",
        "brightness",
        "contrast",
        "grayscale",
        "hue-rotate",
        "invert",
        "opacity",
        "saturate",
        "sepia",
        "drop-shadow",
        "matrix",
        "matrix3d",
        "translate",
        "translate3d",
        "translatex",
        "translatey",
        "translatez",
        "scale",
        "scale3d",
        "scalex",
        "scaley",
        "scalez",
        "rotate",
        "rotate3d",
        "rotatex",
        "rotatey",
        "rotatez",
        "skew",
        "skewx",
        "skewy",
        "perspective",
        "cubic-bezier",
        "steps",
        "calc",
        "min",
        "max",
        "clamp",
        "abs",
        "sign",
        "mod",
        "rem",
        "round",
        "hypot",
        "sqrt",
        "pow",
        "exp",
        "log"
      ].map((x4) => x4.toLowerCase())
    );
    let i3 = 0;
    const n2 = s3.length;
    while (i3 < n2) {
      while (i3 < n2 && /[\s,]/.test(s3[i3])) i3++;
      if (i3 >= n2) break;
      if (s3[i3] === "(" || s3[i3] === ")") {
        i3++;
        continue;
      }
      const fn2 = /^([A-Za-z_][\w-]*)\s*\(/.exec(s3.slice(i3));
      if (fn2) {
        if (!SAFE_FN_NAMES.has(fn2[1].toLowerCase())) return CSS_REDACTED;
        i3 += fn2[0].length;
        continue;
      }
      const tm = /^[^\s,()]+/.exec(s3.slice(i3));
      if (!tm) return CSS_REDACTED;
      const tok = tm[0];
      if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(tok)) {
        i3 += tok.length;
        continue;
      }
      if (!SAFE_TOKEN.test(tok)) return CSS_REDACTED;
      i3 += tok.length;
    }
    return s3;
  }
  function sanitizeDisplay(raw2) {
    if (raw2 == null) return null;
    if (typeof raw2 !== "string") return CSS_REDACTED;
    const s3 = raw2.trim().toLowerCase();
    if (!s3) return null;
    if (SAFE_DISPLAY.has(s3)) return s3;
    return CSS_REDACTED;
  }
  function finiteOrNull(n2) {
    return typeof n2 === "number" && Number.isFinite(n2) ? Math.round(n2 * 100) / 100 : null;
  }
  function readProp(cs, name) {
    try {
      const v3 = cs.getPropertyValue?.(name) ?? cs[name];
      if (v3 == null) return null;
      return String(v3);
    } catch {
      return null;
    }
  }
  function snapshotFromStyle(cs) {
    const backgroundColor = sanitizeCssVisualValue(readProp(cs, "background-color") ?? cs.backgroundColor);
    const backgroundImage = sanitizeCssVisualValue(readProp(cs, "background-image") ?? cs.backgroundImage);
    const background = sanitizeCssVisualValue(readProp(cs, "background") ?? cs.background);
    const boxShadow = sanitizeCssVisualValue(readProp(cs, "box-shadow") ?? cs.boxShadow);
    const filter = sanitizeCssVisualValue(readProp(cs, "filter") ?? cs.filter);
    const opacity = sanitizeCssVisualValue(readProp(cs, "opacity") ?? cs.opacity);
    const borderRadius = sanitizeCssVisualValue(readProp(cs, "border-radius") ?? cs.borderRadius);
    return { backgroundColor, backgroundImage, background, boxShadow, filter, opacity, borderRadius };
  }
  function isCssVisible(display, visibilityRaw, opacityRaw) {
    if (display === "none") return false;
    const vis = (visibilityRaw || "").trim().toLowerCase();
    if (vis === "hidden" || vis === "collapse") return false;
    const op = parseFloat(opacityRaw || "1");
    if (Number.isFinite(op) && op <= 0) return false;
    return true;
  }
  function snapshotButton(el, gcs) {
    const snap = emptyButton();
    snap.present = true;
    try {
      const cs = gcs(el, null);
      const display = sanitizeDisplay(readProp(cs, "display") ?? cs.display);
      const visibility = readProp(cs, "visibility") ?? cs.visibility;
      const opacity = readProp(cs, "opacity") ?? cs.opacity;
      snap.display = display;
      snap.visible = isCssVisible(display, typeof visibility === "string" ? visibility : null, typeof opacity === "string" ? opacity : null);
    } catch {
      snap.display = null;
      snap.visible = false;
    }
    try {
      const r3 = el.getBoundingClientRect?.();
      if (r3) {
        snap.width = finiteOrNull(r3.width);
        snap.height = finiteOrNull(r3.height);
        snap.top = finiteOrNull(r3.top);
        snap.left = finiteOrNull(r3.left);
      }
    } catch {
    }
    return snap;
  }
  function mapError(_e) {
    return "computed-style-failed";
  }
  function collectComposerAppearanceDiagnostics(deps = {}) {
    const out = emptyComposerAppearanceDiagnostics("ok");
    try {
      const doc = deps.getDocument ? deps.getDocument() : typeof document !== "undefined" ? document : null;
      if (!doc || typeof doc.querySelector !== "function") {
        out.errorCode = "no-document";
        return out;
      }
      const gcs = deps.getComputedStyle ?? (typeof getComputedStyle === "function" ? (elt, pseudo) => getComputedStyle(elt, pseudo ?? void 0) : null);
      if (!gcs) {
        out.errorCode = "no-document";
        return out;
      }
      let box = null;
      try {
        box = doc.querySelector("input-container");
      } catch {
        out.errorCode = "unknown";
        return out;
      }
      if (!box) {
        out.errorCode = "no-composer";
        return out;
      }
      try {
        out.hasInputGradient = !!box.classList?.contains?.("input-gradient");
      } catch {
        out.hasInputGradient = false;
      }
      const resolve = (id) => {
        switch (id) {
          case "inputContainer":
            return { el: box, pseudo: null };
          case "before":
            return { el: box, pseudo: "::before" };
          case "after":
            return { el: box, pseudo: "::after" };
          case "inputAreaContainer":
            return { el: box.querySelector?.(".input-area-container") ?? null, pseudo: null };
          case "inputAreaV2":
            return { el: box.querySelector?.("input-area-v2") ?? null, pseudo: null };
          case "inputArea":
            return {
              el: box.querySelector?.("input-area-v2 .input-area") ?? box.querySelector?.(".input-area") ?? null,
              pseudo: null
            };
        }
      };
      let anyStyleFailed = false;
      for (const id of COMPOSER_LAYER_IDS) {
        const { el, pseudo } = resolve(id);
        if (!el) {
          out.layers[id] = emptyLayer(false);
          continue;
        }
        try {
          const cs = gcs(el, pseudo);
          out.layers[id] = { present: true, ...snapshotFromStyle(cs) };
        } catch {
          anyStyleFailed = true;
          out.layers[id] = emptyLayer(true);
        }
      }
      const resolveButton = (role) => {
        try {
          switch (role) {
            case "voice":
              return box.querySelector?.(SEL_VOICE_CONTAINER) ?? box.querySelector?.(SEL_VOICE_CONTROL) ?? null;
            case "buttonsWrapper":
              return box.querySelector?.(SEL_BUTTONS_WRAPPER) ?? null;
            case "stop": {
              const mark = box.querySelector?.(SEL_SEND_CONTAINER + " " + SEL_STOP_MARK) ?? null;
              if (mark) return mark;
              const wrap2 = box.querySelector?.(SEL_SEND_CONTAINER) ?? null;
              if (wrap2?.querySelector?.(SEL_STOP_MARK)) return wrap2;
              return null;
            }
            case "submit": {
              const wrap2 = box.querySelector?.(SEL_SEND_CONTAINER) ?? null;
              if (!wrap2) return null;
              if (wrap2.querySelector?.(SEL_STOP_MARK)) return null;
              return wrap2;
            }
          }
        } catch {
          return null;
        }
      };
      for (const role of COMPOSER_BUTTON_ROLES) {
        const el = resolveButton(role);
        if (!el) {
          out.buttons[role] = emptyButton();
          continue;
        }
        try {
          out.buttons[role] = snapshotButton(el, gcs);
        } catch {
          anyStyleFailed = true;
          out.buttons[role] = { ...emptyButton(), present: true, visible: false };
        }
      }
      if (anyStyleFailed) out.errorCode = "computed-style-failed";
      return out;
    } catch (e3) {
      return emptyComposerAppearanceDiagnostics(mapError(e3));
    }
  }

  // sites/gemini/plugins/usageDisplay/composerAppearanceView.ts
  var DISPLAY_ALLOW = /* @__PURE__ */ new Set([
    "none",
    "inline",
    "block",
    "inline-block",
    "flex",
    "inline-flex",
    "grid",
    "inline-grid",
    "contents",
    "flow-root",
    "table",
    "table-row",
    "table-cell",
    "list-item",
    "run-in"
  ]);
  var LAYER_STYLE_KEYS = [
    "backgroundColor",
    "backgroundImage",
    "background",
    "boxShadow",
    "filter",
    "opacity",
    "borderRadius"
  ];
  function finiteOrNull2(v3) {
    return typeof v3 === "number" && Number.isFinite(v3) ? v3 : null;
  }
  function sanitizeDisplayForView(raw2) {
    if (raw2 == null) return CSS_REDACTED;
    if (typeof raw2 !== "string") return CSS_REDACTED;
    const s3 = raw2.trim().toLowerCase();
    if (!s3) return CSS_REDACTED;
    if (s3 === CSS_REDACTED.toLowerCase() || s3 === "[redacted]") return CSS_REDACTED;
    const tok = s3.split(/\s+/)[0] ?? "";
    if (DISPLAY_ALLOW.has(tok)) return tok;
    return CSS_REDACTED;
  }
  function sanitizeComposerButtonForView(raw2) {
    const o3 = raw2 && typeof raw2 === "object" && !Array.isArray(raw2) ? raw2 : {};
    return {
      present: o3.present === true,
      visible: o3.visible === true,
      display: sanitizeDisplayForView(o3.display),
      width: finiteOrNull2(o3.width),
      height: finiteOrNull2(o3.height),
      top: finiteOrNull2(o3.top),
      left: finiteOrNull2(o3.left)
    };
  }
  function sanitizeLayerForView(raw2) {
    const o3 = raw2 && typeof raw2 === "object" && !Array.isArray(raw2) ? raw2 : {};
    const out = { present: o3.present === true };
    for (const key of LAYER_STYLE_KEYS) {
      const cleaned = sanitizeCssVisualValue(o3[key]);
      if (cleaned == null) continue;
      out[key] = cleaned;
    }
    return out;
  }
  var ERROR_ALLOW = /* @__PURE__ */ new Set(["ok", "no-document", "no-composer", "computed-style-failed", "unknown"]);
  function sanitizeComposerAppearanceForView(raw2) {
    const o3 = raw2 && typeof raw2 === "object" && !Array.isArray(raw2) ? raw2 : {};
    const err = typeof o3.errorCode === "string" && ERROR_ALLOW.has(o3.errorCode) ? o3.errorCode : "unknown";
    const layersIn = o3.layers && typeof o3.layers === "object" && !Array.isArray(o3.layers) ? o3.layers : {};
    const buttonsIn = o3.buttons && typeof o3.buttons === "object" && !Array.isArray(o3.buttons) ? o3.buttons : {};
    const layers2 = {};
    for (const id of COMPOSER_LAYER_IDS) {
      layers2[id] = sanitizeLayerForView(layersIn[id]);
    }
    const buttons = {};
    for (const role of COMPOSER_BUTTON_ROLES) {
      buttons[role] = sanitizeComposerButtonForView(buttonsIn[role]);
    }
    return {
      errorCode: err,
      hasInputGradient: o3.hasInputGradient === true,
      layers: layers2,
      buttons
    };
  }
  function composerButtonViewRows(b3) {
    return [
      { key: "present", value: b3.present ? "true" : "false" },
      { key: "visible", value: b3.visible ? "true" : "false" },
      { key: "display", value: b3.display },
      { key: "width", value: b3.width == null ? "null" : String(b3.width) },
      { key: "height", value: b3.height == null ? "null" : String(b3.height) },
      { key: "top", value: b3.top == null ? "null" : String(b3.top) },
      { key: "left", value: b3.left == null ? "null" : String(b3.left) }
    ];
  }

  // sites/gemini/plugins/usageDisplay/usageCopy.ts
  function resolveUsageUiLang(opts) {
    const html = (opts?.htmlLang ?? "").trim().toLowerCase();
    if (html.startsWith("zh")) return "zh";
    const nav = (opts?.navigatorLang ?? "").trim().toLowerCase();
    if (nav.startsWith("zh")) return "zh";
    return "en";
  }
  function detectUsageUiLang() {
    const html = typeof document !== "undefined" ? document.documentElement?.getAttribute?.("lang") ?? document.documentElement?.lang : "";
    const nav = typeof navigator !== "undefined" ? navigator.language : "";
    return resolveUsageUiLang({ htmlLang: html, navigatorLang: nav });
  }
  function formatUsagePct(v3) {
    if (v3 === void 0 || v3 === null || !Number.isFinite(v3)) return "—";
    return `${Math.round(v3 * 10) / 10}%`;
  }
  function formatSignedDelta(v3) {
    if (v3 === void 0 || v3 === null || !Number.isFinite(v3)) return "—";
    return `+${Math.round(v3 * 10) / 10}%`;
  }
  var MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  function resetTime(text, from) {
    const m3 = text?.match(/(?:([a-z]{3})[a-z]*\s+(\d{1,2})\s+)?at\s+(\d{1,2}):(\d{2})\s*(am|pm)?/i);
    if (!m3) return void 0;
    let hour = Number(m3[3]) % 12;
    if (m3[5]?.toLowerCase() === "pm") hour += 12;
    if (!m3[5] && Number(m3[3]) === 12) hour = 12;
    const d3 = new Date(from);
    if (m3[1]) {
      const month = MONTHS.indexOf(m3[1].toLowerCase());
      if (month < 0) return void 0;
      d3.setMonth(month, Number(m3[2]));
    }
    d3.setHours(hour, Number(m3[4]), 0, 0);
    if (d3.getTime() < from - 6e4) {
      if (m3[1]) d3.setFullYear(d3.getFullYear() + 1);
      else d3.setDate(d3.getDate() + 1);
    }
    return d3.getTime();
  }
  function calendarDayKey(ms, timeZone) {
    if (!timeZone) {
      const d3 = new Date(ms);
      return `${d3.getFullYear()}-${d3.getMonth() + 1}-${d3.getDate()}`;
    }
    return new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date(ms));
  }
  function formatResetLocal(epochSec, nowMs, lang, opts) {
    if (typeof epochSec !== "number" || !Number.isFinite(epochSec) || epochSec < 16e8) return void 0;
    try {
      const rMs = epochSec * 1e3;
      const r3 = new Date(rMs);
      if (!Number.isFinite(r3.getTime())) return void 0;
      const sameDay = calendarDayKey(rMs, opts?.timeZone) === calendarDayKey(nowMs, opts?.timeZone);
      const loc = lang === "zh" ? "zh-CN" : "en";
      const tzOpt = opts?.timeZone ? { timeZone: opts.timeZone } : {};
      if (sameDay) {
        const time2 = r3.toLocaleTimeString(loc, { hour: "numeric", minute: "2-digit", ...tzOpt });
        return lang === "zh" ? `重置 ${time2}` : `Resets ${time2}`;
      }
      const stamp = r3.toLocaleString(loc, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        ...tzOpt
      });
      return lang === "zh" ? `重置 ${stamp}` : `Resets ${stamp}`;
    } catch {
      return void 0;
    }
  }
  function resolveResetDisplayPhrase(opts) {
    const { nowMs, lang, formatOpts } = opts;
    if (typeof opts.epochMs === "number" && Number.isFinite(opts.epochMs) && opts.epochMs >= 16e8 * 1e3) {
      return formatResetLocal(opts.epochMs / 1e3, nowMs, lang, formatOpts);
    }
    if (typeof opts.epochMs === "number" && Number.isFinite(opts.epochMs) && opts.epochMs >= 16e8 && opts.epochMs < 16e8 * 1e3) {
      return formatResetLocal(opts.epochMs, nowMs, lang, formatOpts);
    }
    const parsed = resetTime(opts.rawText ?? void 0, nowMs);
    if (parsed != null) return formatResetLocal(parsed / 1e3, nowMs, lang, formatOpts);
    return void 0;
  }
  function formatTodayHoverLine(delta, lang, opts) {
    if (opts && !opts.statsEnabled) return null;
    const n2 = formatSignedDelta(delta);
    return lang === "zh" ? `今日 ${n2}（本机记录增量）` : `Today ${n2} (local log delta)`;
  }
  function formatWindowHoverLine(usedPct, hadValue, resetPhrase, lang) {
    if (usedPct === void 0 && hadValue) {
      return lang === "zh" ? "5小时已用：自上次读取后已重置" : "5-hour used: reset since last read";
    }
    const pct = formatUsagePct(usedPct);
    const tail = resetPhrase ? ` · ${resetPhrase}` : "";
    return lang === "zh" ? `5小时已用 ${pct}${tail}` : `5-hour used ${pct}${tail}`;
  }
  function formatWeeklyHoverLine(usedPct, hadValue, resetPhrase, lang) {
    if (usedPct === void 0 && hadValue) {
      return lang === "zh" ? "每周已用：自上次读取后已重置" : "Weekly used: reset since last read";
    }
    const pct = formatUsagePct(usedPct);
    const tail = resetPhrase ? ` · ${resetPhrase}` : "";
    return lang === "zh" ? `每周已用 ${pct}${tail}` : `Weekly used ${pct}${tail}`;
  }
  function staleHint(lang) {
    return lang === "zh" ? "请打开用量页刷新。" : "Open the usage page to refresh.";
  }
  function hoverFooter(lang) {
    return lang === "zh" ? "点击查看详情 / 刷新" : "Click for details / refresh";
  }
  function hoverWaiting(lang) {
    return lang === "zh" ? "用量 — 等待本会话实时读取（不显示缓存）" : "Usage — waiting for a live read this session (cache hidden)";
  }
  function hoverTitle(lang) {
    return lang === "zh" ? "用量" : "Usage";
  }
  function todayBaselineExplain(lang) {
    if (lang === "zh") {
      return "「今日」是本机从当日首次采样起算的周额度记录增量，不是服务端「今日总量」。无前日基线时首次记为 +0%；跨日本地日历日切分。百分点来自 RPC 整数四舍五入；展示最多一位小数。重置时间按浏览器本地时区，非固定 Asia/Shanghai。";
    }
    return "“Today” is this device’s recorded weekly-limit delta since the first sample today — not a server “today total.” With no prior baseline the first sample is +0%. Day boundaries use the browser’s local calendar. Percents are integer-rounded from RPC; display uses at most one decimal. Reset times use the browser’s local timezone (not a hard-coded Asia/Shanghai).";
  }
  function modalTitle(lang) {
    return lang === "zh" ? "Gemini 用量" : "Gemini usage";
  }
  function modalNoLive(lang) {
    return lang === "zh" ? "本会话尚无实时用量读取。打开 /usage 或等待 RPC 回放。" : "No live usage read yet this session. Open /usage or wait for RPC replay.";
  }
  function detailTermBefore(lang) {
    return lang === "zh" ? "重置前" : "Before";
  }
  function detailTermAfter(lang) {
    return lang === "zh" ? "重置后" : "After";
  }
  function detailTermUsed(lang) {
    return lang === "zh" ? "已用增量" : "Used";
  }
  function detailTermCurrent(lang) {
    return lang === "zh" ? "当前" : "Current";
  }
  function detailTermLast(lang) {
    return lang === "zh" ? "末日值" : "Last";
  }
  function detailTermStart(lang) {
    return lang === "zh" ? "日起点" : "Start";
  }
  function weeklyResetCaption(lang, beforeStart, beforeEnd, afterLast) {
    if (lang === "zh") {
      return `周额度重置：${beforeStart} → ${beforeEnd}  +  0% → ${afterLast}`;
    }
    return `Weekly limit reset: ${beforeStart} → ${beforeEnd}  +  0% → ${afterLast}`;
  }
  function buildHoverTooltip(opts) {
    const { lang } = opts;
    if (!opts.liveVerified || !opts.hasUsage) return hoverWaiting(lang);
    const wReset = resolveResetDisplayPhrase({
      epochMs: opts.windowResetEpochMs,
      rawText: opts.windowResetRaw,
      nowMs: opts.nowMs,
      lang,
      formatOpts: opts.formatOpts
    });
    const kReset = resolveResetDisplayPhrase({
      epochMs: opts.weeklyResetEpochMs,
      rawText: opts.weeklyResetRaw,
      nowMs: opts.nowMs,
      lang,
      formatOpts: opts.formatOpts
    });
    const rows = [hoverTitle(lang)];
    const today = formatTodayHoverLine(opts.todayDelta, lang, { statsEnabled: opts.statsEnabled });
    if (today) rows.push(today);
    rows.push(formatWindowHoverLine(opts.windowUsed, opts.hadWindow, wReset, lang));
    rows.push(formatWeeklyHoverLine(opts.weeklyUsed, opts.hadWeekly, kReset, lang));
    if (opts.stale) rows.push(staleHint(lang));
    rows.push(hoverFooter(lang));
    return rows.join("\n");
  }
  function dayLabelToday(lang) {
    return lang === "zh" ? "今日" : "Today";
  }
  function statsToggleTitle(lang) {
    return lang === "zh" ? "每日用量统计" : "Daily usage stats";
  }
  function statsToggleHint(lang) {
    return lang === "zh" ? "在本机记录每日周额度增量。" : "Record local daily usage on this device.";
  }
  function statsOffHint(lang) {
    return lang === "zh" ? "打开每日用量统计后，将按本机日志记录周额度增量。" : "Turn on daily usage stats to keep a per-day log of the weekly limit.";
  }
  function statsEmptyHint(lang) {
    return lang === "zh" ? "尚无记录。统计从开启后的首次用量读取起算。" : "No days recorded yet. Stats start from the moment you enable tracking, each time usage is read.";
  }
  function nothingThatDay(lang) {
    return lang === "zh" ? "该日无记录。" : "Nothing recorded on this day.";
  }

  // sites/gemini/plugins/usageDisplay/index.ts
  var REFRESH_MS = 6e4;
  function parse(text) {
    const lines = text.split("\n").map((l3) => l3.trim()).filter(Boolean);
    const pick = (label) => {
      const i3 = lines.findIndex((l3) => label.test(l3));
      if (i3 < 0) return {};
      const near = lines.slice(i3, i3 + 6);
      const pct = near.map((l3) => l3.match(/(\d+(?:\.\d+)?)\s*%/)).find(Boolean);
      const reset = near.find((l3) => /reset|重置/i.test(l3));
      return { pct: pct ? Number(pct[1]) : void 0, reset };
    };
    const cur = pick(/current usage|5[- ]?hour|当前用量/i);
    const week = pick(/weekly|每周/i);
    const now2 = Date.now();
    return {
      window: cur.pct,
      windowReset: cur.reset,
      windowResetAt: resetTime(cur.reset, now2),
      weekly: week.pct,
      weeklyReset: week.reset,
      weeklyResetAt: resetTime(week.reset, now2),
      at: now2
    };
  }
  function formatResetEpoch(epoch, now2, lang = detectUsageUiLang()) {
    return formatResetLocal(epoch, now2, lang);
  }
  function fromMetrics(m3) {
    if (!m3.daily && !m3.weekly) return null;
    const now2 = Date.now();
    const windowReset = formatResetEpoch(m3.daily?.resetEpoch, now2);
    const weeklyReset = formatResetEpoch(m3.weekly?.resetEpoch, now2);
    return {
      window: m3.daily?.percent,
      windowReset,
      windowResetAt: m3.daily ? m3.daily.resetEpoch * 1e3 : void 0,
      weekly: m3.weekly?.percent,
      weeklyReset,
      weeklyResetAt: m3.weekly ? m3.weekly.resetEpoch * 1e3 : void 0,
      accountKey: accountKeyFromPath(),
      at: now2
    };
  }
  function fillComposerAppearanceSlot(slot) {
    let raw2;
    try {
      raw2 = collectComposerAppearanceDiagnostics();
    } catch {
      slot.replaceChildren(h4("p", { class: "ggpp-muted" }, "Composer appearance diagnostics: sample failed."));
      return;
    }
    const data = sanitizeComposerAppearanceForView(raw2);
    const kids = [
      h4("div", { class: "ggpp-ud-strong" }, "Composer appearance"),
      h4("p", { class: "ggpp-muted" }, "只读取样（打开本面板时）。不含 URL / 路径 / 聊天内容 / 按钮文案。"),
      h4(
        "div",
        { class: "ggpp-ud-diag-dl", role: "group", "aria-label": "composer summary" },
        h4("dt", null, "errorCode"),
        h4("dd", null, data.errorCode),
        h4("dt", null, "hasInputGradient"),
        h4("dd", null, data.hasInputGradient ? "true" : "false")
      )
    ];
    for (const id of Object.keys(data.layers)) {
      const layer = data.layers[id];
      const fields = [{ k: "present", v: layer.present ? "true" : "false" }];
      for (const [k4, v3] of Object.entries(layer)) {
        if (k4 === "present" || typeof v3 !== "string") continue;
        fields.push({ k: k4, v: v3 });
      }
      kids.push(
        h4(
          "div",
          { class: "ggpp-ud-composer-layer", "data-layer": id },
          h4("div", { class: "ggpp-ud-strong" }, id),
          h4(
            "dl",
            { class: "ggpp-ud-diag-dl" },
            ...fields.flatMap((f3) => [h4("dt", null, f3.k), h4("dd", null, f3.v)])
          )
        )
      );
    }
    kids.push(h4("div", { class: "ggpp-ud-strong" }, "Composer buttons"));
    for (const role of COMPOSER_BUTTON_ROLES) {
      const rows = composerButtonViewRows(data.buttons[role]);
      kids.push(
        h4(
          "div",
          { class: "ggpp-ud-composer-layer", "data-button": role },
          h4("div", { class: "ggpp-ud-strong" }, role),
          h4(
            "dl",
            { class: "ggpp-ud-diag-dl", "aria-label": `composer button ${role}` },
            ...rows.flatMap((f3) => [h4("dt", null, f3.key), h4("dd", null, f3.value)])
          )
        )
      );
    }
    slot.replaceChildren(...kids);
  }
  var usageDisplay_default = definePlugin({
    id: "usageDisplay",
    name: "UsageDisplay",
    description: "Show your Gemini usage limits (5-hour and weekly) as a ring in the message box.",
    tags: ["Composer"],
    icon: I3.clock,
    enabledByDefault: true,
    updated: "2026-10-21",
    dependencies: ["gemini", "chatBar", "ui"],
    liveSettings: true,
    settings: {
      showPercent: { type: "boolean", label: "Show percent", description: "Show the used percent next to the ring.", default: false },
      source: {
        type: "select",
        label: "Ring shows",
        default: "max",
        options: [
          { value: "max", label: "Whichever is higher" },
          { value: "window", label: "5-hour window" },
          { value: "weekly", label: "Weekly limit" }
        ]
      },
      usageStats: {
        type: "boolean",
        label: "Daily usage stats",
        description: "Record how much of the weekly limit each day uses, on this device. Click the ring for the history.",
        default: false
      },
      retainDays: {
        type: "number",
        label: "Keep history for",
        description: "Days of usage history to keep.",
        default: 90,
        min: 7,
        max: 180,
        slider: true,
        unit: " days",
        showIf: (v3) => !!v3.usageStats
      }
    },
    async start(ctx) {
      const gemini = ctx.use("gemini");
      const bar = ctx.use("chatBar");
      const ui = ctx.use("ui");
      const slotOf2 = () => location.pathname.match(/^\/u\/(\d+)/)?.[1] ?? "0";
      const usageKey = () => `usage:${slotOf2()}`;
      const belongsHere = (u3) => !u3 || !u3.accountKey || u3.accountKey === accountKeyFromPath();
      let liveAccount = accountKeyFromPath();
      let liveVerified = false;
      let usage = null;
      const live = (v3, resetAt) => resetAt && Date.now() > resetAt ? void 0 : v3;
      const stale = () => !!usage && [usage.windowResetAt, usage.weeklyResetAt].some((t3) => t3 && Date.now() > t3);
      const value = () => {
        if (!usage) return void 0;
        const w4 = live(usage.window, usage.windowResetAt);
        const k4 = live(usage.weekly, usage.weeklyResetAt);
        switch (ctx.settings.source) {
          case "window":
            return w4;
          case "weekly":
            return k4;
          default:
            return w4 === void 0 ? k4 : k4 === void 0 ? w4 : Math.max(w4, k4);
        }
      };
      function ring() {
        const v3 = value();
        const tone = v3 === void 0 ? "currentColor" : v3 >= 90 ? "var(--ggpp-danger)" : v3 >= 70 ? "var(--ggpp-warn)" : "currentColor";
        const c3 = 2 * Math.PI * 7;
        return svg(
          "svg",
          { width: 18, height: 18, viewBox: "0 0 18 18", "aria-hidden": "true" },
          svg("circle", { cx: 9, cy: 9, r: 7, fill: "none", stroke: "currentColor", "stroke-opacity": 0.35, "stroke-width": 2 }),
          v3 !== void 0 && svg("circle", {
            cx: 9,
            cy: 9,
            r: 7,
            fill: "none",
            stroke: tone,
            "stroke-width": 2,
            "stroke-linecap": "round",
            "stroke-dasharray": `${c3 * Math.min(100, v3) / 100} ${c3}`,
            transform: "rotate(-90 9 9)"
          })
        );
      }
      const uiLang = () => detectUsageUiLang();
      const fmt = (v3) => formatUsagePct(v3);
      const lines = () => {
        if (!usage) return [];
        const lang = uiLang();
        const now2 = Date.now();
        const w4 = live(usage.window, usage.windowResetAt);
        const k4 = live(usage.weekly, usage.weeklyResetAt);
        const wReset = resolveResetDisplayPhrase({
          epochMs: usage.windowResetAt,
          rawText: usage.windowReset,
          nowMs: now2,
          lang
        });
        const kReset = resolveResetDisplayPhrase({
          epochMs: usage.weeklyResetAt,
          rawText: usage.weeklyReset,
          nowMs: now2,
          lang
        });
        return [
          formatWindowHoverLine(w4, usage.window !== void 0, wReset, lang),
          formatWeeklyHoverLine(k4, usage.weekly !== void 0, kReset, lang),
          ...stale() ? [staleHint(lang)] : []
        ];
      };
      const statsKey = () => `stats:${location.pathname.match(/^\/u\/(\d+)/)?.[1] ?? "0"}`;
      let log = await ctx.data.get(statsKey(), []);
      const todayDelta = () => {
        if (!ctx.settings.usageStats) return void 0;
        const today = log.find((d3) => d3.date === dayKey(Date.now()));
        if (today) return used(today);
        return usage?.weekly === void 0 ? void 0 : 0;
      };
      async function snapshot(u3) {
        if (!ctx.settings.usageStats || u3.weekly === void 0) return;
        log = record(await ctx.data.get(statsKey(), []), u3.weekly, u3.weeklyResetAt, u3.at, ctx.settings.retainDays);
        await ctx.data.set(statsKey(), log);
      }
      const tooltip = () => {
        const lang = uiLang();
        const now2 = Date.now();
        return buildHoverTooltip({
          lang,
          liveVerified,
          hasUsage: !!usage,
          todayDelta: todayDelta(),
          statsEnabled: !!ctx.settings.usageStats,
          windowUsed: usage ? live(usage.window, usage.windowResetAt) : void 0,
          weeklyUsed: usage ? live(usage.weekly, usage.weeklyResetAt) : void 0,
          hadWindow: !!usage && usage.window !== void 0,
          hadWeekly: !!usage && usage.weekly !== void 0,
          windowResetEpochMs: usage?.windowResetAt,
          weeklyResetEpochMs: usage?.weeklyResetAt,
          windowResetRaw: usage?.windowReset,
          weeklyResetRaw: usage?.weeklyReset,
          nowMs: now2,
          stale: stale()
        });
      };
      ctx.cleanup(
        bar.register({
          id: "usageDisplay",
          icon: I3.clock,
          // Accessible name must stay explicit — not an anonymous icon.
          get title() {
            return tooltip();
          },
          order: 1,
          render: ring,
          text: () => ctx.settings.showPercent ? fmt(value()) : "",
          onClick: () => void refresh().then(openHistory)
        })
      );
      const usageUrl = () => `${gemini.newChatUrl().replace(/\/app$/, "")}/usage`;
      ctx.on("settings:usageDisplay", () => {
        if (usage && Date.now() - usage.at < 36e5 && !log.some((d3) => d3.date === dayKey(Date.now()))) void snapshot(usage).then(() => historyView?.());
        bar.refresh();
        historyView?.();
      });
      const label = (date, short = false) => {
        if (date === dayKey(Date.now())) return dayLabelToday(uiLang());
        const [y3, m3, d3] = date.split("-").map(Number);
        const t3 = new Date(y3, m3 - 1, d3);
        return short ? String(d3) : t3.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      };
      let historyView = null;
      function openHistory() {
        let selected = dayKey(Date.now());
        let pinRight = true;
        const current3 = h4("div", { class: "ggpp-ud-now" });
        const body = h4("div", { class: "ggpp-ud-stats" });
        const toggle = h4(
          "div",
          { class: "ggpp-ud-toggle" },
          h4("div", null, h4("div", { class: "ggpp-ud-strong" }, statsToggleTitle(uiLang())), h4("div", { class: "ggpp-muted" }, statsToggleHint(uiLang()))),
          ui.switch(ctx.settings.usageStats, (on3) => ctx.setSetting("usageStats", on3))
        );
        const render = () => {
          current3.replaceChildren(
            ...(liveVerified && usage ? lines() : [modalNoLive(uiLang())]).map((l3) => h4("div", null, l3)),
            h4("div", null, ui.button("Open usage page", () => (m3.close(), gemini.navigate(usageUrl())), "ghost"))
          );
          if (!ctx.settings.usageStats) {
            body.replaceChildren(h4("p", { class: "ggpp-muted" }, statsOffHint(uiLang())));
            return;
          }
          if (!log.length) {
            body.replaceChildren(h4("p", { class: "ggpp-muted" }, statsEmptyHint(uiLang())));
            return;
          }
          const days = calendar(log, Date.now());
          if (!days.some((d3) => d3.date === selected)) selected = days[days.length - 1].date;
          const peak = Math.max(...days.map((d3) => d3.day ? used(d3.day) : 0));
          const scale = Math.max(20, Math.ceil(peak / 10) * 10);
          const chart = h4("div", { class: "ggpp-ud-chart", role: "listbox", tabindex: 0, "aria-label": "Usage by day" });
          for (const d3 of days) {
            const v3 = d3.day ? used(d3.day) : void 0;
            const on3 = d3.date === selected;
            chart.append(
              h4(
                "button",
                {
                  class: `ggpp-ud-bar${on3 ? " ggpp-on" : ""}`,
                  type: "button",
                  role: "option",
                  tabindex: -1,
                  "aria-selected": String(on3),
                  "aria-label": `${label(d3.date)}, ${signed(v3)}`,
                  dataset: { date: d3.date },
                  onclick: () => select(d3.date)
                },
                h4("span", { class: "ggpp-ud-val" }, v3 === void 0 ? "" : signed(v3)),
                h4("span", { class: "ggpp-ud-track" }, h4("span", { class: "ggpp-ud-fill", style: { height: v3 === void 0 ? "0" : `max(2px, ${v3 / scale * 100}%)` } })),
                h4("span", { class: "ggpp-ud-day" }, label(d3.date, true))
              )
            );
          }
          chart.addEventListener("keydown", (e3) => {
            if (e3.key !== "ArrowLeft" && e3.key !== "ArrowRight") return;
            e3.preventDefault();
            const i3 = days.findIndex((d3) => d3.date === selected) + (e3.key === "ArrowLeft" ? -1 : 1);
            if (days[i3]) select(days[i3].date, true);
          });
          const stopPin = () => pinRight = false;
          chart.addEventListener("pointerdown", stopPin);
          chart.addEventListener("wheel", stopPin, { passive: true });
          body.replaceChildren(chart, detail(days.find((d3) => d3.date === selected)));
          const last2 = selected === days[days.length - 1].date;
          const place = () => {
            if (last2 && pinRight) chart.scrollLeft = chart.scrollWidth;
            else chart.querySelector(".ggpp-on")?.scrollIntoView({ block: "nearest", inline: "nearest" });
          };
          for (const t3 of [0, 50, 200, 600]) setTimeout(place, t3);
        };
        const select = (date, focus = false) => {
          selected = date;
          render();
          if (focus) body.querySelector(".ggpp-ud-chart")?.focus();
        };
        function detail({ date, day }) {
          const term = (name, v3) => h4("div", { class: "ggpp-ud-term" }, h4("small", null, name), h4("span", null, v3));
          const pct = (v3) => `${Math.round(v3 * 10) / 10}%`;
          const isToday = date === dayKey(Date.now());
          if (!day) return h4("div", { class: "ggpp-ud-detail" }, h4("div", { class: "ggpp-ud-strong" }, label(date)), h4("p", { class: "ggpp-muted" }, nothingThatDay(uiLang())));
          const lang = uiLang();
          const formula = day.before ? [
            term(detailTermBefore(lang), signed(day.accrued)),
            h4("span", null, "+"),
            term(detailTermAfter(lang), signed(Math.max(0, day.last - day.start))),
            h4("span", null, "="),
            term(detailTermUsed(lang), signed(used(day)))
          ] : [
            term(isToday ? detailTermCurrent(lang) : detailTermLast(lang), pct(day.last)),
            h4("span", null, "−"),
            term(detailTermStart(lang), pct(day.start)),
            h4("span", null, "="),
            term(detailTermUsed(lang), signed(used(day)))
          ];
          return h4(
            "div",
            { class: "ggpp-ud-detail" },
            h4("div", { class: "ggpp-ud-strong" }, label(date)),
            h4("div", { class: "ggpp-ud-formula" }, formula),
            day.before && h4(
              "div",
              { class: "ggpp-muted" },
              weeklyResetCaption(lang, pct(day.before.start), pct(day.before.end), pct(day.last))
            ),
            isToday && h4("p", { class: "ggpp-muted" }, todayBaselineExplain(lang))
          );
        }
        const m3 = ui.modal({
          title: modalTitle(uiLang()),
          icon: I3.clock,
          width: 460,
          content: [current3, toggle, body],
          onClose: () => historyView = null
        });
        historyView = render;
        render();
      }
      ctx.css(`
      .ggpp-ud-now { display: grid; gap: 4px; margin-bottom: 12px; }
      .ggpp-ud-now > div:last-child { margin-top: 4px; }
      .ggpp-ud-toggle { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 0; border-top: 1px solid var(--ggpp-border-soft); }
      .ggpp-ud-strong { font-weight: 600; }
      .ggpp-ud-stats { display: grid; gap: 12px; }
      .ggpp-ud-chart { display: flex; gap: 4px; height: 9.25rem; overflow-x: auto; padding: 4px 2px; border-radius: 12px; outline: none; }
      .ggpp-ud-chart:focus-visible { box-shadow: 0 0 0 2px var(--ggpp-accent); }
      .ggpp-ud-bar { all: unset; box-sizing: border-box; flex: 0 0 2.25rem; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 4px 0; border-radius: 10px; cursor: pointer; color: var(--ggpp-fg-2); font-size: 11px; }
      .ggpp-ud-bar:hover { background: var(--ggpp-hover); }
      .ggpp-ud-bar.ggpp-on { background: var(--ggpp-accent-soft); color: var(--ggpp-fg); font-weight: 700; }
      .ggpp-ud-val { height: 14px; opacity: .6; white-space: nowrap; }
      .ggpp-ud-bar.ggpp-on .ggpp-ud-val { opacity: 1; }
      .ggpp-ud-track { flex: 1; width: 12px; display: flex; align-items: flex-end; }
      .ggpp-ud-fill { width: 100%; border-radius: 4px 4px 2px 2px; background: var(--ggpp-accent); opacity: .55; }
      .ggpp-ud-bar.ggpp-on .ggpp-ud-fill { opacity: 1; }
      .ggpp-ud-detail { display: grid; gap: 8px; }
      .ggpp-ud-formula { display: flex; align-items: flex-end; gap: 10px; }
      .ggpp-ud-term { display: grid; gap: 2px; }
      .ggpp-ud-term small { color: var(--ggpp-fg-2); font-size: 11px; }
      .ggpp-ud-term span { font-size: 18px; font-weight: 600; }
      .ggpp-ud-diag { display: grid; gap: 8px; padding: 12px 0; border-top: 1px solid var(--ggpp-border-soft); }
      .ggpp-ud-diag-dl { display: grid; grid-template-columns: minmax(8rem, 12rem) 1fr; gap: 4px 12px; margin: 0; font-size: 12px; }
      .ggpp-ud-diag-dl dt { margin: 0; color: var(--ggpp-fg-2); }
      .ggpp-ud-diag-dl dd { margin: 0; font-family: ui-monospace, monospace; word-break: break-all; }
      .ggpp-ud-diag-actions { display: flex; gap: 8px; flex-wrap: wrap; }
      .ggpp-ud-composer-diag { display: grid; gap: 6px; padding: 8px 0 4px; border-top: 1px solid var(--ggpp-border-soft); }
    `);
      async function applyUsage(next, source) {
        const stamped = { ...next, accountKey: next.accountKey ?? accountKeyFromPath() };
        if (!belongsHere(stamped)) return;
        const same = usage && liveVerified && usage.window === stamped.window && usage.weekly === stamped.weekly && usage.windowResetAt === stamped.windowResetAt && usage.weeklyResetAt === stamped.weeklyResetAt;
        if (same && Date.now() - usage.at < 6e4) return;
        usage = stamped;
        liveVerified = true;
        if (source === "dom" || source.startsWith("dom")) {
          const aid = noteUsageDiagAttempt(null);
          noteUsageDiagResult({
            attemptId: aid,
            ok: true,
            source: "dom",
            dailyParsed: stamped.window !== void 0,
            weeklyParsed: stamped.weekly !== void 0
          });
        }
        try {
          await ctx.data.set(usageKey(), usage);
        } catch {
        }
        void snapshot(stamped);
        ctx.log.info(`usage from ${source}: 5-hour ${stamped.window ?? "?"}%, weekly ${stamped.weekly ?? "?"}%`);
        bar.refresh();
        historyView?.();
        diagPanelDraw?.();
      }
      let replaying = false;
      let diagPanelDraw = null;
      async function refreshFromRpc(reason2) {
        if (replaying) {
          noteUsageDiagSkip("busy");
          diagPanelDraw?.();
          return;
        }
        if (document.hidden) {
          noteUsageDiagSkip("hidden");
          diagPanelDraw?.();
          return;
        }
        replaying = true;
        diagPanelDraw?.();
        try {
          const { metrics, error } = await replayUsage();
          if (metrics) {
            const next = fromMetrics(metrics);
            if (next) await applyUsage(next, `rpc:${reason2}`);
          } else if (error && error !== "parse-miss") {
            ctx.log.debug(`usage rpc refresh (${reason2}): ${error}`);
          }
        } finally {
          replaying = false;
          diagPanelDraw?.();
        }
      }
      async function refresh() {
        log = await ctx.data.get(statsKey(), []);
        await refreshFromRpc("refresh");
      }
      ctx.provide("panel:usageDisplay", (el) => {
        const draw = () => {
          const chatBarButtonPresent = !!document.querySelector('button.ggpp-chatbar-btn[data-ggpp-button="usageDisplay"]');
          const diag2 = getUsageDiagnostics({ chatBarButtonPresent });
          const rows = usageDiagDisplayRows(diag2);
          const refreshBtn = h4(
            "button",
            {
              class: "ggpp-btn ggpp-btn-primary",
              type: "button",
              title: "刷新用量",
              "aria-label": "刷新用量",
              disabled: replaying || void 0,
              onclick: () => {
                void refreshFromRpc("settings-refresh");
              }
            },
            "刷新用量"
          );
          const clear = ui.button(
            "Clear usage history",
            async () => {
              const ok = await ui.confirm({
                title: "Clear usage history",
                body: "Delete all locally recorded daily usage? This cannot be undone.",
                confirm: "Clear",
                danger: true
              });
              if (!ok) return;
              log = [];
              await ctx.data.set(statsKey(), log);
              draw();
            },
            "default"
          );
          clear.disabled = !log.length;
          clear.title = "Clear usage history";
          clear.setAttribute("aria-label", "Clear usage history");
          const diagTable = h4(
            "div",
            {
              class: "ggpp-ud-diag",
              role: "table",
              "aria-label": "用量只读诊断"
            },
            h4("div", { class: "ggpp-ud-strong" }, "用量只读诊断"),
            h4(
              "p",
              { class: "ggpp-muted" },
              "打开本面板不会发起 RPC。仅点「刷新用量」会走原 refresh 一次。字段为白名单；解析 false 表示未验证。"
            ),
            h4(
              "dl",
              { class: "ggpp-ud-diag-dl" },
              ...rows.flatMap((r3) => [h4("dt", { dataset: { diagKey: r3.key } }, r3.label), h4("dd", { dataset: { diagKey: r3.key } }, r3.value)])
            ),
            h4("div", { class: "ggpp-ud-diag-actions" }, refreshBtn)
          );
          const composerSlot = h4("div", {
            class: "ggpp-ud-composer-diag",
            "aria-label": "Composer appearance diagnostics slot"
          });
          fillComposerAppearanceSlot(composerSlot);
          const hist = h4(
            "div",
            { class: "ggpp-ud-toggle" },
            h4("span", { class: "ggpp-muted" }, `${log.length} recorded day(s).`),
            clear
          );
          el.replaceChildren(diagTable, composerSlot, hist);
        };
        diagPanelDraw = draw;
        draw();
      });
      async function onAccountMaybeChanged() {
        const next = accountKeyFromPath();
        if (next === liveAccount) return;
        liveAccount = next;
        bumpUsageGeneration();
        liveVerified = false;
        usage = null;
        log = await ctx.data.get(statsKey(), []);
        bar.refresh();
        historyView?.();
        void refreshFromRpc("account-switch");
      }
      ctx.cleanup(
        // Older pages wrap the numbers in usage-metrics-window; since 2026-10 the page is a "route island"
        // with generated class names, so only its text can be relied on.
        gemini.watch("usage-metrics-window, declared-route-island-page", (box) => {
          const read2 = () => {
            if (!/\/usage\/?$/.test(location.pathname)) return false;
            const next = parse(box.innerText);
            if (next.window === void 0 && next.weekly === void 0) return false;
            void applyUsage(next, "dom");
            return true;
          };
          const t3 = setInterval(read2, 1e3);
          return () => {
            clearInterval(t3);
            read2();
          };
        })
      );
      ctx.cleanup(
        onUsageEvent((ev) => {
          if (ev.accountKey && ev.accountKey !== accountKeyFromPath()) return;
          if (ev.kind === "capture" || ev.kind === "replay") {
            if (!ev.metrics) return;
            const next = fromMetrics(ev.metrics);
            if (next) void applyUsage(next, ev.kind);
            return;
          }
          if (ev.kind === "generation-complete") {
            void refreshFromRpc("generation-complete");
          }
        })
      );
      ctx.on("data:changed", ({ key, value: value2 }) => {
        if (key === `usageDisplay:${statsKey()}` && Array.isArray(value2)) {
          log = value2;
          historyView?.();
          return;
        }
        void value2;
        void key;
      });
      document.addEventListener("visibilitychange", () => !document.hidden && void refresh(), { signal: ctx.signal });
      ctx.setInterval(() => {
        void onAccountMaybeChanged();
        if (!document.hidden) void refresh();
      }, REFRESH_MS);
      void refreshFromRpc("start");
    }
  });

  // sites/gemini/plugins/userQuotes/index.ts
  var userQuotes_default = definePlugin({
    id: "userQuotes",
    name: "UserQuotes",
    description: 'Show "> quoted" lines in your own messages as a left-bar quote.',
    tags: ["Messages"],
    icon: I3.quote,
    enabledByDefault: true,
    updated: "2026-10-14",
    dependencies: ["gemini"],
    settings: {
      italic: { type: "boolean", label: "Italic", description: "Render quoted lines in italic.", default: true }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      ctx.css(`
      .ggpp-uq {
        display: block;
        border-inline-start: 0.25rem solid var(--gem-sys-color--on-surface-variant, currentColor);
        padding-inline-start: 0.75rem;
        opacity: .85;
        ${ctx.settings.italic ? "font-style: italic;" : ""}
      }
    `);
      const QUOTE = /^\s*>\s?/;
      ctx.cleanup(
        gemini.watch(`${gemini.SEL.userQuery} :is(.query-text-line, p)`, (line) => {
          if (!QUOTE.test(line.textContent ?? "")) return;
          line.classList.add("ggpp-uq");
          const first = [...line.childNodes].find((n2) => n2.nodeType === Node.TEXT_NODE && n2.textContent?.trim());
          const original = first?.textContent ?? null;
          if (first && original) first.textContent = original.replace(QUOTE, "");
          return () => {
            line.classList.remove("ggpp-uq");
            if (first && original !== null) first.textContent = original;
          };
        })
      );
    }
  });

  // sites/gemini/plugins/widerChat/index.ts
  var widerChat_default = definePlugin({
    id: "widerChat",
    name: "WiderChat",
    description: "Let the conversation column and message box use more of a wide screen.",
    tags: ["Appearance"],
    icon: I3.width,
    dependencies: ["gemini"],
    updated: "2026-10-14",
    settings: {
      width: { type: "number", label: "Maximum width", description: "Maximum chat width in rem.", default: 64, min: 40, max: 200, unit: "rem" },
      fullUserBubble: { type: "boolean", label: "Wide user bubbles", description: "Let your own messages use the full column width.", default: true }
    },
    start(ctx) {
      const gemini = ctx.use("gemini");
      const w4 = `${ctx.settings.width}rem`;
      ctx.css(`
      .ggpp-wide { max-width: ${w4} !important; }
      /* Gemini also caps each block inside a reply (paragraphs, lists, code) and centers it. */
      model-response message-content .markdown > *,
      model-response message-content .markdown :is(p, ul, ol, h1, h2, h3, h4, h5, h6, blockquote, table, pre, code-block, hr, response-element, .table-block-component) {
        max-width: 100% !important;
      }
      ${ctx.settings.fullUserBubble ? "user-query :is(.user-query-container, .query-content, .user-query-bubble-with-background) { max-width: 100% !important; }" : ""}
    `);
      const marked = /* @__PURE__ */ new Set();
      const widen = (from, stop) => {
        for (let el = from; el && !el.matches(stop); el = el.parentElement) {
          if (marked.has(el)) continue;
          const max = getComputedStyle(el).maxWidth;
          if (max !== "none" && max !== "100%") {
            el.classList.add("ggpp-wide");
            marked.add(el);
          }
        }
      };
      const scan2 = () => {
        for (const turn of gemini.qa(gemini.SEL.conversationTurn).slice(-3)) {
          widen(turn.querySelector(`${gemini.SEL.modelResponse} message-content`), "chat-window");
          widen(turn.querySelector(gemini.SEL.userQuery), "chat-window");
        }
        widen(gemini.q("input-area-v2"), "input-container");
      };
      ctx.cleanup(gemini.watch(`${gemini.SEL.conversationTurn}, input-area-v2`, () => void nextFrame(scan2)));
      ctx.cleanup(() => marked.forEach((el) => el.classList.remove("ggpp-wide")));
    }
  });

  // uspp:sites
  var sites_default = [{ id: "gemini", site: gemini_default, plugins: [((U3) => {
    const d3 = typeof accountSwitcher_default === "function" ? accountSwitcher_default(U3) : accountSwitcher_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof autoCollapse_default === "function" ? autoCollapse_default(U3) : autoCollapse_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof autoRetry_default === "function" ? autoRetry_default(U3) : autoRetry_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof betterLinks_default === "function" ? betterLinks_default(U3) : betterLinks_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof betterModeSelect_default === "function" ? betterModeSelect_default(U3) : betterModeSelect_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof betterNavigator_default === "function" ? betterNavigator_default(U3) : betterNavigator_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof betterQueue_default === "function" ? betterQueue_default(U3) : betterQueue_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof betterQuotes_default === "function" ? betterQuotes_default(U3) : betterQuotes_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof betterSidebar_default === "function" ? betterSidebar_default(U3) : betterSidebar_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof chatBar_default === "function" ? chatBar_default(U3) : chatBar_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof chatListStatus_default === "function" ? chatListStatus_default(U3) : chatListStatus_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof chatStateFavicons_default === "function" ? chatStateFavicons_default(U3) : chatStateFavicons_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof cleaner_default === "function" ? cleaner_default(U3) : cleaner_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof completeToast_default === "function" ? completeToast_default(U3) : completeToast_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof composerOpacity_default === "function" ? composerOpacity_default(U3) : composerOpacity_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof customGreeting_default === "function" ? customGreeting_default(U3) : customGreeting_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof customInstructions_default === "function" ? customInstructions_default(U3) : customInstructions_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof customSidebarIdentity_default === "function" ? customSidebarIdentity_default(U3) : customSidebarIdentity_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof diagnostics_default === "function" ? diagnostics_default(U3) : diagnostics_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof exportChat_default === "function" ? exportChat_default(U3) : exportChat_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof gemini_default2 === "function" ? gemini_default2(U3) : gemini_default2;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof hideBlueBackground_default === "function" ? hideBlueBackground_default(U3) : hideBlueBackground_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof incognito_default === "function" ? incognito_default(U3) : incognito_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof inputHistory_default === "function" ? inputHistory_default(U3) : inputHistory_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof menus_default === "function" ? menus_default(U3) : menus_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof messageStars_default === "function" ? messageStars_default(U3) : messageStars_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof messageTimestamps_default === "function" ? messageTimestamps_default(U3) : messageTimestamps_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof noDictation_default === "function" ? noDictation_default(U3) : noDictation_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof noShareLink_default === "function" ? noShareLink_default(U3) : noShareLink_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof noSidebarIdentity_default === "function" ? noSidebarIdentity_default(U3) : noSidebarIdentity_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof noStarters_default === "function" ? noStarters_default(U3) : noStarters_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof oneko_default === "function" ? oneko_default(U3) : oneko_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof quickCss_default === "function" ? quickCss_default(U3) : quickCss_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof recentTopics_default === "function" ? recentTopics_default(U3) : recentTopics_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof responseNotification_default === "function" ? responseNotification_default(U3) : responseNotification_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof settings_default2 === "function" ? settings_default2(U3) : settings_default2;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof settingsFlyout_default === "function" ? settingsFlyout_default(U3) : settingsFlyout_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof skillBlocker_default === "function" ? skillBlocker_default(U3) : skillBlocker_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof starry_default === "function" ? starry_default(U3) : starry_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof streamerMode_default === "function" ? streamerMode_default(U3) : streamerMode_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof themes_default === "function" ? themes_default(U3) : themes_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof ui_default2 === "function" ? ui_default2(U3) : ui_default2;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof usageDisplay_default === "function" ? usageDisplay_default(U3) : usageDisplay_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof userQuotes_default === "function" ? userQuotes_default(U3) : userQuotes_default;
    d3.site = "gemini";
    return d3;
  }), ((U3) => {
    const d3 = typeof widerChat_default === "function" ? widerChat_default(U3) : widerChat_default;
    d3.site = "gemini";
    return d3;
  })] }];

  // uspp:plugins
  var plugins_default = [];

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/utils.js
  var sleep4 = (ms) => new Promise((r3) => setTimeout(r3, ms));
  function debounce2(fn2, ms = 100) {
    let t3;
    const d3 = function(...args) {
      clearTimeout(t3);
      t3 = setTimeout(() => fn2.apply(this, args), ms);
    };
    d3.flush = () => {
      clearTimeout(t3);
      fn2();
    };
    d3.cancel = () => clearTimeout(t3);
    return d3;
  }
  function onlyOnce(fn2) {
    let done = false, result;
    return function(...args) {
      if (done) return result;
      done = true;
      return result = fn2.apply(this, args);
    };
  }
  var escapeRegExp = (s3) => String(s3).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  function humanizeKey(key) {
    return String(key).replace(/[-_]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").trim().split(/\s+/).map((w4) => w4.charAt(0).toUpperCase() + w4.slice(1)).join(" ");
  }
  function classNameFactory(prefix = "") {
    return (...names) => names.flat(Infinity).filter(Boolean).map((n2) => prefix + n2).join(" ");
  }
  function classes(...names) {
    const out = [];
    for (const n2 of names.flat(Infinity)) {
      if (!n2) continue;
      if (typeof n2 === "object") {
        for (const k4 in n2) if (n2[k4]) out.push(k4);
      } else out.push(String(n2));
    }
    return out.join(" ");
  }
  async function copyToClipboard(text) {
    if (GM2.clipboard) {
      try {
        const r3 = GM2.clipboard(String(text), "text");
        if (r3 && typeof r3.then === "function") await r3;
        return true;
      } catch {
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
      }
      ta.remove();
      return ok;
    }
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/lazy.js
  function makeLazy(factory, attempts = 5) {
    let tries = 0, cache;
    return () => {
      if (cache == null && tries++ < attempts) cache = factory();
      return cache;
    };
  }
  function proxyLazy(factory, shouldRetry = () => true) {
    let resolved = false, value;
    const resolve = () => {
      if (!resolved && shouldRetry()) {
        value = factory();
        if (value != null) resolved = true;
      }
      return value;
    };
    const target2 = () => {
    };
    return new Proxy(target2, {
      get(_3, key) {
        if (key === "$$uspp_ggpp_Resolve") return resolve;
        const real = resolve();
        if (real == null) return void 0;
        return Reflect.get(real, key);
      },
      set(_3, key, v3) {
        const real = resolve();
        if (real == null) return false;
        return Reflect.set(real, key, v3);
      },
      has(_3, key) {
        const real = resolve();
        return real != null && Reflect.has(real, key);
      },
      ownKeys() {
        const real = resolve();
        const keys = real == null ? [] : Reflect.ownKeys(real).filter((k4) => k4 !== "length" && k4 !== "name");
        return [...keys, "length", "name"];
      },
      getOwnPropertyDescriptor(_3, key) {
        if (key === "length" || key === "name") return Reflect.getOwnPropertyDescriptor(target2, key);
        const real = resolve();
        if (real == null) return void 0;
        const d3 = Reflect.getOwnPropertyDescriptor(real, key);
        if (d3) d3.configurable = true;
        return d3;
      },
      deleteProperty(_3, key) {
        const real = resolve();
        return real != null && Reflect.deleteProperty(real, key);
      },
      apply(_3, thisArg, args) {
        const real = resolve();
        if (typeof real !== "function") throw new Error("Userscript++: 懒加载的值尚未找到");
        return Reflect.apply(real, thisArg, args);
      },
      getPrototypeOf() {
        const real = resolve();
        return real == null ? Function.prototype : Reflect.getPrototypeOf(real);
      }
    });
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/events.js
  var logger2 = new Logger("Events", "#fde68a");
  var handlers = /* @__PURE__ */ new Map();
  var Events = Object.freeze({
    PLUGIN_TOGGLE: "pluginToggle",
    /** 插件阶段变了:{ changes: [{ name, from, to }] }(收敛结束、熔断、async start 完成或失败时发) */
    PLUGIN_PHASE: "pluginPhase",
    PLUGIN_PIN: "pluginPin",
    PLUGIN_STAR: "pluginStar",
    RELOAD_NEEDED: "reloadNeeded",
    SETTINGS_SYNC: "settingsSync",
    SITE_READY: "siteReady",
    ROUTE_CHANGE: "routeChange"
  });
  var CORE = new Set(Object.values(Events));
  var siteEvents = /* @__PURE__ */ new Set();
  function setSiteEvents(list2) {
    siteEvents = new Set(Array.isArray(list2) ? list2 : []);
  }
  var isKnownEvent = (name) => CORE.has(name) || siteEvents.has(name);
  function subscribe(event, handler) {
    if (!isKnownEvent(event)) logger2.debug(`订阅了当前站点没有声明的事件 ${event}`);
    let set = handlers.get(event);
    if (!set) handlers.set(event, set = /* @__PURE__ */ new Set());
    set.add(handler);
    return () => set.delete(handler);
  }
  function dispatch(event, data) {
    const set = handlers.get(event);
    if (!set) return;
    for (const h5 of [...set]) {
      try {
        h5(data);
      } catch (e3) {
        logger2.error(`事件 ${event} 的处理函数出错`, e3);
      }
    }
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/settings.js
  var logger3 = new Logger("Settings", "#86efac");
  var STORAGE_KEY = "UserscriptPPSettings";
  var SITE_STORAGE_KEY = `UserscriptPP:${SCRIPT_ID}:settings`;
  var IDB_NAME = `UserscriptPP:${SCRIPT_ID}`;
  var IDB_STORE = "kv";
  var BIGINT_TAG = "$usppBigint";
  var PlainSettings = { plugins: {} };
  var defaultResolver = () => void 0;
  function setDefaultResolver(fn2) {
    defaultResolver = fn2;
  }
  var isRegisteredPlugin = () => false;
  function setPluginRegistry(fn2) {
    isRegisteredPlugin = fn2;
  }
  var ready = false;
  var globalListeners = /* @__PURE__ */ new Set();
  var pathListeners = /* @__PURE__ */ new Map();
  var prefixListeners = /* @__PURE__ */ new Map();
  function addTo(map, key, fn2) {
    let s3 = map.get(key);
    if (!s3) map.set(key, s3 = /* @__PURE__ */ new Set());
    s3.add(fn2);
  }
  function callSafe(fn2, ...args) {
    try {
      fn2(...args);
    } catch (e3) {
      logger3.error("设置监听者出错", e3);
    }
  }
  var dirty = /* @__PURE__ */ new Set();
  function emitChange(path, value) {
    for (const fn2 of [...globalListeners]) callSafe(fn2, value, path);
    const exact = pathListeners.get(path);
    if (exact) for (const fn2 of [...exact]) callSafe(fn2, value, path);
    for (const [prefix, set] of prefixListeners) {
      if (path.startsWith(prefix)) {
        for (const fn2 of [...set]) callSafe(fn2, value, path);
      }
    }
  }
  var explicit = /* @__PURE__ */ new Set();
  function markExplicit(path, value) {
    const parts = path.split(".");
    if (parts[0] !== "plugins") return;
    if (parts.length === 1) {
      markExplicitFrom({ plugins: value });
      return;
    }
    if (parts.length === 2) {
      const prefix = path + ".";
      for (const k4 of [...explicit]) if (k4.startsWith(prefix)) explicit.delete(k4);
      if (value && typeof value === "object" && !Array.isArray(value)) for (const k4 of Object.keys(value)) explicit.add(prefix + k4);
      return;
    }
    const key = parts.slice(0, 3).join(".");
    if (parts.length === 3 && value === void 0) explicit.delete(key);
    else explicit.add(key);
  }
  function markExplicitFrom(data) {
    explicit.clear();
    const plugins2 = data?.plugins;
    if (!plugins2 || typeof plugins2 !== "object") return;
    for (const [name, entry] of Object.entries(plugins2)) {
      if (entry && typeof entry === "object" && !Array.isArray(entry)) for (const k4 of Object.keys(entry)) explicit.add(`plugins.${name}.${k4}`);
    }
  }
  function notify(path, value) {
    markExplicit(path, value);
    emitChange(path, value);
    if (ready) dirty.add(path);
    scheduleSave();
  }
  var SettingsStore = {
    addChangeListener(path, fn2) {
      addTo(pathListeners, path, fn2);
    },
    removeChangeListener(path, fn2) {
      pathListeners.get(path)?.delete(fn2);
    },
    addPrefixChangeListener(prefix, fn2) {
      addTo(prefixListeners, prefix, fn2);
    },
    removePrefixChangeListener(prefix, fn2) {
      prefixListeners.get(prefix)?.delete(fn2);
    },
    addGlobalChangeListener(fn2) {
      globalListeners.add(fn2);
    },
    removeGlobalChangeListener(fn2) {
      globalListeners.delete(fn2);
    },
    /** 直接改了 PlainSettings 之后调用:给出改动的路径时按普通写入处理(记为本页未落盘的改动,不会被别的标签页的同步盖掉) */
    markAsChanged(path) {
      if (typeof path === "string" && path) {
        const v3 = getPath(PlainSettings, path);
        markExplicit(path, v3);
        if (ready) dirty.add(path);
        emitChange(path, v3);
      } else for (const fn2 of [...globalListeners]) callSafe(fn2, PlainSettings, "");
      scheduleSave();
    }
  };
  var getPath = (obj, path) => path.split(".").reduce((o3, k4) => o3 == null ? void 0 : o3[k4], obj);
  var RAW = Symbol("uspp.raw");
  var proxyCache = /* @__PURE__ */ new WeakMap();
  function makeProxy(obj, path) {
    let byPath = proxyCache.get(obj);
    if (!byPath) proxyCache.set(obj, byPath = /* @__PURE__ */ new Map());
    const cached = byPath.get(path);
    if (cached) return cached;
    const proxy = new Proxy(obj, {
      get(target2, key, receiver) {
        if (key === RAW) return target2;
        if (typeof key === "symbol") return Reflect.get(target2, key, receiver);
        let v3 = target2[key];
        const full = path ? `${path}.${key}` : key;
        if (v3 === void 0) {
          const parts = full.split(".");
          if (parts.length === 3 && parts[0] === "plugins") {
            const def = defaultOf(parts[1], parts[2]);
            if (def !== void 0) {
              target2[key] = def;
              v3 = def;
            }
          }
        }
        if (v3 !== null && typeof v3 === "object" && !(v3 instanceof Date)) return makeProxy(v3, full);
        return v3;
      },
      set(target2, key, value) {
        if (typeof key === "symbol") return Reflect.set(target2, key, value);
        if (value && typeof value === "object" && value[RAW]) value = value[RAW];
        if (Object.is(target2[key], value) && key in target2) return true;
        target2[key] = value;
        notify(path ? `${path}.${key}` : key, value);
        return true;
      },
      deleteProperty(target2, key) {
        if (!(key in target2)) return true;
        delete target2[key];
        if (typeof key !== "symbol") notify(path ? `${path}.${key}` : key, void 0);
        return true;
      }
    });
    byPath.set(path, proxy);
    return proxy;
  }
  var Settings = makeProxy(PlainSettings, "");
  function replacer(_3, v3) {
    return typeof v3 === "bigint" ? { [BIGINT_TAG]: v3.toString() } : v3;
  }
  function reviver(_3, v3) {
    if (v3 && typeof v3 === "object" && typeof v3[BIGINT_TAG] === "string" && Object.keys(v3).length === 1) {
      try {
        return BigInt(v3[BIGINT_TAG]);
      } catch {
        return 0n;
      }
    }
    return v3;
  }
  var serialize = (obj) => JSON.stringify(obj, replacer);
  function defaultOf(plugin, key) {
    const def = defaultResolver(plugin, key);
    return def !== null && typeof def === "object" ? JSON.parse(serialize(def), reviver) : def;
  }
  var isDefault = (plugin, key, value) => {
    const def = defaultResolver(plugin, key);
    return def !== void 0 && serialize(def) === serialize(value);
  };
  function persistable() {
    const out = { ...PlainSettings };
    const plugins2 = PlainSettings.plugins;
    if (plugins2 && typeof plugins2 === "object") {
      out.plugins = {};
      for (const [name, entry] of Object.entries(plugins2)) {
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
          out.plugins[name] = entry;
          continue;
        }
        const kept = {};
        for (const [k4, v3] of Object.entries(entry)) if (explicit.has(`plugins.${name}.${k4}`) || !isDefault(name, k4, v3)) kept[k4] = v3;
        out.plugins[name] = kept;
      }
    }
    return out;
  }
  var SAVED_AT = "$savedAt";
  var REV = "$rev";
  var WRITER = "$writer";
  var META_KEYS = [SAVED_AT, REV, WRITER];
  var savedAtOf = (data) => data && Number(data[SAVED_AT]) || 0;
  var revOf = (data) => data && Number(data[REV]) || 0;
  var cmpVer = (a3, b3) => a3.rev - b3.rev || (a3.writer < b3.writer ? -1 : a3.writer > b3.writer ? 1 : 0);
  var TAB_WRITER = (() => {
    try {
      if (W3.crypto?.randomUUID) return W3.crypto.randomUUID().replace(/-/g, "").slice(0, 16);
    } catch {
    }
    return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
  })();
  function parseStored(raw2) {
    try {
      let v3 = raw2;
      for (let i3 = 0; i3 < 3 && typeof v3 === "string"; i3++) v3 = JSON.parse(v3, reviver);
      if (v3 && typeof v3 === "object" && !Array.isArray(v3)) {
        v3 = JSON.parse(JSON.stringify(v3), reviver);
        for (const k4 of META_KEYS) {
          const n2 = k4 === WRITER ? typeof v3[k4] === "string" ? v3[k4] : "" : Number(v3[k4]) || 0;
          delete v3[k4];
          Object.defineProperty(v3, k4, { value: n2, enumerable: false, configurable: true });
        }
        delete v3.$mirror;
        if (v3.plugins && typeof v3.plugins === "object" && Object.keys(v3.plugins).length > 0) return v3;
      }
    } catch {
    }
    return null;
  }
  function idbOpen() {
    return new Promise((resolve, reject) => {
      const idb = W3.indexedDB || window.indexedDB;
      if (!idb) return reject(new Error("no indexedDB"));
      const req = idb.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(IDB_STORE)) req.result.createObjectStore(IDB_STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  async function idbGet(key) {
    const db2 = await idbOpen();
    try {
      return await new Promise((resolve, reject) => {
        const r3 = db2.transaction(IDB_STORE, "readonly").objectStore(IDB_STORE).get(key);
        r3.onsuccess = () => resolve(r3.result);
        r3.onerror = () => reject(r3.error);
      });
    } finally {
      db2.close();
    }
  }
  async function idbSet(key, value) {
    const db2 = await idbOpen();
    try {
      await new Promise((resolve, reject) => {
        const tx2 = db2.transaction(IDB_STORE, "readwrite");
        tx2.objectStore(IDB_STORE).put(value, key);
        tx2.oncomplete = () => resolve();
        tx2.onerror = () => reject(tx2.error);
      });
    } finally {
      db2.close();
    }
  }
  function lsGet() {
    try {
      return (W3.localStorage || localStorage).getItem(SITE_STORAGE_KEY);
    } catch {
      return null;
    }
  }
  function replaceContents(data) {
    for (const k4 of Object.keys(PlainSettings)) delete PlainSettings[k4];
    Object.assign(PlainSettings, data);
    if (!PlainSettings.plugins || typeof PlainSettings.plugins !== "object") PlainSettings.plugins = {};
  }
  function mergeMissing(into, from) {
    for (const k4 of Object.keys(from)) {
      if (!(k4 in into)) into[k4] = from[k4];
      else if (into[k4] && from[k4] && typeof into[k4] === "object" && typeof from[k4] === "object" && !Array.isArray(into[k4])) mergeMissing(into[k4], from[k4]);
    }
    return into;
  }
  var syncBase = null;
  function withoutSame(from, base) {
    if (!base || typeof base !== "object") return from;
    for (const k4 of Object.keys(from)) {
      if (!(k4 in base)) continue;
      const a3 = from[k4], b3 = base[k4];
      if (a3 && b3 && typeof a3 === "object" && typeof b3 === "object" && !Array.isArray(a3) && !Array.isArray(b3)) {
        withoutSame(a3, b3);
        if (Object.keys(a3).length === 0) delete from[k4];
      } else if (JSON.stringify(a3, replacer) === JSON.stringify(b3, replacer)) delete from[k4];
    }
    return from;
  }
  var asyncOnlyGm = false;
  var BOOT_KEY = `${SITE_STORAGE_KEY}:boot`;
  function loadSync() {
    if (!GM2.get) {
      asyncOnlyGm = true;
      return false;
    }
    try {
      const probe = GM2.get(META_KEY);
      if (probe && typeof probe.then === "function") {
        asyncOnlyGm = true;
        return false;
      }
      const v22 = readV2();
      let data = null;
      if (v22) {
        data = v22.data;
        adoptV2(v22);
      } else {
        const raw2 = GM2.get(STORAGE_KEY);
        if (raw2 && typeof raw2.then === "function") {
          asyncOnlyGm = true;
          return false;
        }
        data = parseStored(raw2);
        if (data) migrate = true;
      }
      if (data && data.plugins && Object.keys(data.plugins).length) {
        syncBase = JSON.parse(serialize(data), reviver);
        const pre = [...explicit];
        replaceContents(data);
        markExplicitFrom(data);
        for (const k4 of pre) explicit.add(k4);
        return true;
      }
    } catch (e3) {
      logger3.warn("同步读取设置失败", e3);
    }
    return false;
  }
  function applyBootSnapshot() {
    if (!useSiteStorage()) return false;
    let snap;
    try {
      snap = JSON.parse((W3.localStorage || localStorage).getItem(BOOT_KEY) || "null");
    } catch {
      return false;
    }
    const enabled = snap && typeof snap.enabled === "object" ? snap.enabled : null;
    if (!enabled) return false;
    const base = { plugins: {} };
    for (const [name, on3] of Object.entries(enabled)) {
      if (typeof on3 !== "boolean") continue;
      (PlainSettings.plugins[name] ??= {}).enabled = on3;
      base.plugins[name] = { enabled: on3 };
    }
    syncBase = base;
    return true;
  }
  function writeBootSnapshot() {
    if (!ready || !asyncOnlyGm || !useSiteStorage()) return;
    const enabled = {};
    for (const [name, entry] of Object.entries(PlainSettings.plugins || {})) {
      if (typeof entry?.enabled === "boolean") enabled[name] = entry.enabled;
    }
    try {
      (W3.localStorage || localStorage).setItem(BOOT_KEY, JSON.stringify({ enabled }));
    } catch {
    }
  }
  function richness(v3, key) {
    if (key === "enabled") return 0;
    if (Array.isArray(v3)) return 1 + v3.reduce((n2, x4) => n2 + richness(x4), 0);
    if (v3 && typeof v3 === "object") return 1 + Object.keys(v3).reduce((n2, k4) => n2 + richness(v3[k4], k4), 0);
    if (v3 === "" || v3 == null) return 0;
    return 1;
  }
  var isEmpty = (v3) => v3 == null || v3 === "" || Array.isArray(v3) && v3.length === 0 || typeof v3 === "object" && !Array.isArray(v3) && Object.keys(v3).length === 0;
  function fillFrom(into, from) {
    for (const k4 of Object.keys(from)) {
      const a3 = into[k4], b3 = from[k4];
      if (!(k4 in into) || isEmpty(a3) && !isEmpty(b3)) into[k4] = b3;
      else if (a3 && b3 && typeof a3 === "object" && typeof b3 === "object" && !Array.isArray(a3) && !Array.isArray(b3)) fillFrom(a3, b3);
    }
    return into;
  }
  var useSiteStorage = () => !isGeneric();
  async function loadAsync() {
    let v22 = null, legacy = null;
    try {
      v22 = await awaitMaybe(readV2());
      if (!v22 && GM2.get) legacy = parseStored(await awaitMaybe(GM2.get(STORAGE_KEY)));
    } catch (e3) {
      logger3.debug("从 GM 读取失败", e3);
    }
    if (v22 && !Object.keys(v22.data.plugins).length) v22 = null;
    const stamped = (d3) => !!(revOf(d3) || savedAtOf(d3));
    let chosen = null, restored = false;
    if (v22) {
      adoptV2(v22);
      chosen = { name: "GM", data: v22.data };
      const m3 = readMirror();
      if (m3) for (const [part, ver] of m3.vers) {
        const gmVer = v22.vers.get(part) || noVer;
        const base = m3.base.get(part);
        if (!base || cmpVer(ver, gmVer) <= 0 || cmpVer(base, gmVer) !== 0) continue;
        if (part === META) Object.assign(chosen.data, metaContentOf(m3.doc));
        else if (m3.doc.plugins[part] !== void 0) chosen.data.plugins[part] = m3.doc.plugins[part];
        else delete chosen.data.plugins[part];
        forceParts.add(part);
        lastBody.delete(part);
        restored = true;
        logger3.info(`本页上次写入的 ${part === META ? "顶层设置" : part} 没落到脚本管理器存储里,已从本站镜像补回`);
      }
    } else if (legacy && stamped(legacy)) {
      chosen = { name: "GM", data: legacy };
      migrate = true;
    } else {
      const found = legacy ? [{ name: "GM", data: legacy, rev: revOf(legacy), at: savedAtOf(legacy), score: richness(legacy) }] : [];
      if (useSiteStorage()) {
        for (const [name, read2] of [["IndexedDB", () => idbGet(SITE_STORAGE_KEY)], ["localStorage", lsGet]]) {
          try {
            const data = parseStored(await read2());
            if (data) found.push({ name, data, rev: revOf(data), at: savedAtOf(data), score: richness(data) });
          } catch (e3) {
            logger3.debug(`从 ${name} 读取失败`, e3);
          }
        }
      }
      if (found.length) {
        found.sort((a3, b3) => b3.rev - a3.rev || b3.at - a3.at || b3.score - a3.score);
        chosen = found[0];
        if (!chosen.at && !chosen.rev) for (const f3 of found.slice(1)) fillFrom(chosen.data, f3.data);
        restored = chosen.name !== "GM";
        migrate = true;
      }
    }
    if (chosen) {
      const data = chosen.data;
      const memory2 = withoutSame(JSON.parse(serialize(PlainSettings), reviver), syncBase);
      syncBase = null;
      const pre = [...explicit];
      markExplicitFrom(data);
      for (const k4 of pre) explicit.add(k4);
      replaceContents(mergeMissing(data, memory2));
      logger3.info(`设置已从 ${chosen.name} 读取`);
    }
    ready = true;
    writeBootSnapshot();
    if ((restored || migrate) && GM2.set) {
      if (restored) logger3.info(`已从本站的 ${chosen.name === "GM" ? "镜像" : chosen.name} 救回设置并写回脚本管理器存储`);
      scheduleSave();
    }
    for (const [part, x4] of [...pendingParts]) {
      pendingParts.delete(part);
      applyRemotePart(part, x4.content, x4.ver, x4.extra);
    }
    return !!chosen;
  }
  var META_KEY = `${STORAGE_KEY}:meta`;
  var PART_PREFIX = `${STORAGE_KEY}:p:`;
  var META = "$meta";
  var FORMAT = 2;
  var partKey = (part) => part === META ? META_KEY : PART_PREFIX + part;
  function partsOfPath(path) {
    const parts = path.split(".");
    if (parts[0] !== "plugins") return [META];
    if (parts.length === 1) return Object.keys(PlainSettings.plugins || {});
    return [parts[1]];
  }
  var noVer = { rev: 0, writer: "" };
  var partVer = /* @__PURE__ */ new Map();
  var lastBody = /* @__PURE__ */ new Map();
  var knownParts = /* @__PURE__ */ new Set();
  var migrate = false;
  function parsePart(raw2) {
    try {
      let v3 = raw2;
      for (let i3 = 0; i3 < 3 && typeof v3 === "string"; i3++) v3 = JSON.parse(v3, reviver);
      if (!v3 || typeof v3 !== "object" || Array.isArray(v3)) return null;
      v3 = JSON.parse(JSON.stringify(v3), reviver);
      const ver = { rev: Number(v3[REV]) || 0, writer: typeof v3[WRITER] === "string" ? v3[WRITER] : "" };
      const out = { content: v3, ver, savedAt: Number(v3[SAVED_AT]) || 0, parts: Array.isArray(v3.$parts) ? v3.$parts.filter((x4) => typeof x4 === "string") : [], deleted: v3.$deleted === true };
      for (const k4 of [...META_KEYS, "$parts", "$v", "$deleted"]) delete v3[k4];
      if (Object.keys(v3).length === 1 && "$value" in v3) out.content = v3.$value;
      return out;
    } catch {
      return null;
    }
  }
  function readPart(part) {
    if (!GM2.get) return null;
    try {
      const raw2 = GM2.get(partKey(part));
      if (raw2 && typeof raw2.then === "function") return raw2.then(parsePart, () => null);
      return parsePart(raw2);
    } catch {
      return null;
    }
  }
  var awaitMaybe = async (v3) => v3 && typeof v3.then === "function" ? await v3 : v3;
  function readV2() {
    const meta2 = readPart(META);
    const build = async (metaV) => {
      if (!metaV) return null;
      const data2 = { ...metaV.content, plugins: {} };
      const vers2 = /* @__PURE__ */ new Map([[META, metaV.ver]]);
      const parts2 = new Set(metaV.parts);
      for (const name of parts2) {
        const p3 = await awaitMaybe(readPart(name));
        if (!p3) continue;
        vers2.set(name, p3.ver);
        if (!p3.deleted) data2.plugins[name] = p3.content;
      }
      return { data: data2, vers: vers2, parts: parts2, savedAt: metaV.savedAt };
    };
    if (meta2 && typeof meta2.then === "function") return meta2.then(build);
    if (!meta2) return null;
    const data = { ...meta2.content, plugins: {} };
    const vers = /* @__PURE__ */ new Map([[META, meta2.ver]]);
    const parts = new Set(meta2.parts);
    for (const name of parts) {
      const p3 = readPart(name);
      if (!p3 || typeof p3.then === "function") continue;
      vers.set(name, p3.ver);
      if (!p3.deleted) data.plugins[name] = p3.content;
    }
    return { data, vers, parts, savedAt: meta2.savedAt };
  }
  function adoptV2(v22) {
    for (const [k4, v3] of v22.vers) partVer.set(k4, v3);
    for (const n2 of v22.parts) knownParts.add(n2);
    lastBody.clear();
    lastBody.set(META, serialize(metaContentOf(v22.data)));
    for (const n2 of v22.parts) if (v22.data.plugins[n2]) lastBody.set(n2, serialize(v22.data.plugins[n2]));
  }
  var metaContentOf = (data) => {
    const out = { ...data };
    delete out.plugins;
    return out;
  };
  function persistablePart(part) {
    if (part === META) return metaContentOf(PlainSettings);
    const entry = PlainSettings.plugins?.[part];
    if (entry === void 0) return void 0;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return entry;
    const kept = {};
    for (const [k4, v3] of Object.entries(entry)) if (explicit.has(`plugins.${part}.${k4}`) || !isDefault(part, k4, v3)) kept[k4] = v3;
    return kept;
  }
  var sortedParts = () => [...knownParts].sort();
  var bodyOf = (part, content) => part === META ? serialize({ ...content, $parts: sortedParts() }) : content === void 0 ? "$deleted" : serialize(content);
  var under = (set, path) => {
    for (const d3 of set) if (d3 === path || d3.startsWith(path + ".") || path.startsWith(d3 + ".")) return true;
    return false;
  };
  var getRel = (obj, rel) => rel === "" ? obj : getPath(obj, rel);
  var prefixOf = (part) => part === META ? "" : `plugins.${part}`;
  var relOf = (part, p3) => {
    const pre = prefixOf(part);
    return pre === "" ? p3 : p3 === pre ? "" : p3.slice(pre.length + 1);
  };
  var inflight = /* @__PURE__ */ new Map();
  var forceParts = /* @__PURE__ */ new Set();
  var reasserts = 0;
  var MAX_REASSERTS = 3;
  var VERIFY_MS = 400;
  var verifyTimer = 0;
  var pendingParts = /* @__PURE__ */ new Map();
  function protectAndReassert(paths) {
    if (!paths.length) {
      reasserts = 0;
      return;
    }
    if (++reasserts > MAX_REASSERTS) {
      logger3.warn(`设置和别的标签页反复冲突,已放弃重写:${paths.join(", ")}`);
      reasserts = 0;
      return;
    }
    for (const p3 of paths) {
      dirty.add(p3);
      for (const part of partsOfPath(p3)) lastBody.delete(part);
    }
    scheduleSave();
  }
  var staleTimers = /* @__PURE__ */ new Map();
  function staleSeen(part) {
    if (staleTimers.has(part)) return;
    staleTimers.set(part, setTimeout(async () => {
      staleTimers.delete(part);
      const cur = partVer.get(part) || noVer;
      let r3;
      try {
        r3 = await awaitMaybe(readPart(part));
      } catch {
        r3 = null;
      }
      if (r3 && cmpVer(r3.ver, cur) >= 0) {
        if (cmpVer(r3.ver, cur) > 0) applyRemotePart(part, r3.deleted ? void 0 : r3.content, r3.ver, { parts: r3.parts, deleted: r3.deleted });
        return;
      }
      forceParts.add(part);
      lastBody.delete(part);
      scheduleSave();
    }, VERIFY_MS));
  }
  function applyRemotePart(part, content, ver, extra = {}) {
    if (!part || !ver) return 0;
    if (!ready) {
      const prev = pendingParts.get(part);
      if (!prev || cmpVer(ver, prev.ver) > 0) pendingParts.set(part, { content, ver, extra });
      return 0;
    }
    const discovered = [];
    if (part === META && Array.isArray(extra.parts)) {
      for (const n2 of extra.parts) if (!knownParts.has(n2)) {
        knownParts.add(n2);
        discovered.push(n2);
      }
    }
    const cur = partVer.get(part) || noVer;
    const fromOther = ver.writer !== TAB_WRITER;
    const fl = inflight.get(part);
    const sibling = !!(fl && fromOther && ver.rev && ver.rev === fl.ver.rev);
    const c3 = cmpVer(ver, cur);
    let changed = 0;
    if (sibling || c3 > 0) changed = mergePart(part, content, ver, extra, fl, sibling);
    else if (c3 < 0 && fromOther) staleSeen(part);
    for (const n2 of discovered) {
      watchPart(n2);
      catchUpPart(n2);
    }
    return changed;
  }
  function mergePart(part, content, ver, extra, fl, sibling) {
    if (fl && !sibling && ver.rev > fl.ver.rev) inflight.delete(part);
    const protect = new Set(dirty);
    const keep = [];
    if (sibling) {
      const theirsWin = cmpVer(ver, fl.ver) > 0;
      for (const [p3, ours] of fl.paths) {
        const rel = relOf(part, p3);
        const theirs = content == null ? void 0 : getRel(content, rel);
        const changedByThem = !fl.base || serialize(theirs ?? null) !== serialize((fl.base && getRel(fl.base, rel)) ?? null);
        if (changedByThem && theirsWin) continue;
        protect.add(p3);
        if (serialize(theirs ?? null) !== serialize(ours ?? null)) keep.push(p3);
      }
      inflight.delete(part);
    }
    const cur = partVer.get(part) || noVer;
    if (cmpVer(ver, cur) > 0) partVer.set(part, ver);
    const deleted = !!extra.deleted || part !== META && content == null;
    if (part === META) lastBody.set(META, serialize({ ...content, $parts: [...new Set(extra.parts || [])].sort() }));
    else lastBody.set(part, deleted ? "$deleted" : serialize(content));
    const changedPaths = [];
    const removed = (full, gone) => {
      if (gone && typeof gone === "object" && !Array.isArray(gone) && Object.keys(gone).length) {
        for (const k4 of Object.keys(gone)) removed(`${full}.${k4}`, gone[k4]);
        return;
      }
      changedPaths.push(full);
      emitChange(full, void 0);
    };
    const walk = (target2, src, path) => {
      for (const k4 of Object.keys(src)) {
        if (path === "" && k4 === "plugins") continue;
        const full = path ? `${path}.${k4}` : k4;
        const a3 = target2[k4], b3 = src[k4];
        if (a3 && b3 && typeof a3 === "object" && typeof b3 === "object" && !Array.isArray(a3) && !Array.isArray(b3)) {
          walk(a3, b3, full);
          continue;
        }
        if (under(protect, full)) continue;
        markExplicit(full, b3);
        if (JSON.stringify(a3, replacer) === JSON.stringify(b3, replacer)) continue;
        target2[k4] = b3;
        changedPaths.push(full);
        emitChange(full, b3);
      }
      for (const k4 of Object.keys(target2)) {
        if (Object.prototype.hasOwnProperty.call(src, k4)) continue;
        if (path === "" && k4 === "plugins") continue;
        const full = path ? `${path}.${k4}` : k4;
        if (under(protect, full)) continue;
        const parts = full.split(".");
        if (parts.length === 3 && parts[0] === "plugins") {
          explicit.delete(full);
          const def = defaultOf(parts[1], parts[2]);
          if (def !== void 0) {
            if (serialize(target2[k4]) === serialize(def)) continue;
            target2[k4] = def;
            changedPaths.push(full);
            emitChange(full, def);
            continue;
          }
        }
        const gone = target2[k4];
        delete target2[k4];
        removed(full, gone);
      }
    };
    if (part === META) walk(PlainSettings, content || {}, "");
    else {
      const full = `plugins.${part}`;
      const plugins2 = PlainSettings.plugins;
      if (deleted && !isRegisteredPlugin(part)) {
        if (plugins2[part] !== void 0 && !under(protect, full)) {
          const gone = plugins2[part];
          delete plugins2[part];
          markExplicit(full, void 0);
          removed(full, gone);
        }
      } else {
        const target2 = plugins2[part] && typeof plugins2[part] === "object" && !Array.isArray(plugins2[part]) ? plugins2[part] : plugins2[part] = {};
        const src = deleted ? {} : content;
        if (src && typeof src === "object" && !Array.isArray(src)) walk(target2, src, full);
        else if (!under(protect, full) && JSON.stringify(plugins2[part], replacer) !== JSON.stringify(src, replacer)) {
          plugins2[part] = src;
          changedPaths.push(full);
          emitChange(full, src);
        }
      }
    }
    if (changedPaths.length) {
      logger3.debug(`已从其他标签页同步 ${changedPaths.length} 项设置`);
      dispatch(Events.SETTINGS_SYNC, { paths: changedPaths });
    }
    if (sibling) {
      if (keep.length) logger3.debug(`和别的标签页同时保存,重写本页的 ${keep.length} 项`);
      protectAndReassert(keep);
    }
    writeBootSnapshot();
    return changedPaths.length;
  }
  function replaceAll(data) {
    const before = JSON.parse(serialize(PlainSettings), reviver);
    replaceContents(data);
    markExplicitFrom(PlainSettings);
    const paths = [];
    const diff = (a3, b3, path) => {
      const isObj = (v3) => v3 && typeof v3 === "object" && !Array.isArray(v3);
      if (isObj(a3) && isObj(b3)) {
        for (const k4 of /* @__PURE__ */ new Set([...Object.keys(a3), ...Object.keys(b3)])) diff(a3[k4], b3[k4], path ? `${path}.${k4}` : k4);
        return;
      }
      if (JSON.stringify(a3, replacer) !== JSON.stringify(b3, replacer)) paths.push(path);
    };
    diff(before, PlainSettings, "");
    for (const path of paths) {
      const v3 = path.split(".").reduce((o3, k4) => o3 == null ? void 0 : o3[k4], PlainSettings);
      emitChange(path, v3);
      if (ready) dirty.add(path);
    }
    scheduleSave();
    return paths.length;
  }
  var CHANNEL = `uspp-ggpp-settings:${SCRIPT_ID}`;
  var channel = null;
  var openWriters = /* @__PURE__ */ new Map();
  function getChannel() {
    if (channel !== null) return channel || null;
    channel = false;
    try {
      const BC = W3.BroadcastChannel || (typeof BroadcastChannel !== "undefined" ? BroadcastChannel : null);
      if (!BC) return null;
      channel = new BC(CHANNEL);
      channel.onmessage = (e3) => onChannel(e3.data);
    } catch {
      channel = false;
    }
    return channel || null;
  }
  function post(msg) {
    try {
      getChannel()?.postMessage({ ...msg, w: TAB_WRITER });
    } catch {
    }
  }
  function onChannel(m3) {
    if (!m3 || typeof m3 !== "object" || m3.w === TAB_WRITER) return;
    if (m3.t === "begin") {
      openWriters.set(m3.w, Date.now());
      return;
    }
    if (m3.t !== "done") return;
    openWriters.delete(m3.w);
    for (const x4 of Array.isArray(m3.parts) ? m3.parts : []) {
      if (!x4 || typeof x4.part !== "string" || !x4.ver) continue;
      let content;
      try {
        content = x4.body == null ? void 0 : JSON.parse(x4.body, reviver);
      } catch {
        continue;
      }
      applyRemotePart(x4.part, content, { rev: Number(x4.ver.rev) || 0, writer: String(x4.ver.writer || "") }, { parts: x4.parts, deleted: !!x4.deleted });
    }
  }
  var sleep5 = (ms) => new Promise((r3) => setTimeout(r3, ms));
  async function waitOpenWriters() {
    const t0 = Date.now();
    for (; ; ) {
      const now2 = Date.now();
      for (const [w4, at] of openWriters) if (now2 - at > 1500) openWriters.delete(w4);
      if (!openWriters.size || now2 - t0 > 300) return;
      await sleep5(10);
    }
  }
  var LOCK = `uspp-ggpp-settings:${SCRIPT_ID}`;
  var lockManager = () => {
    try {
      return W3.navigator?.locks?.request ? W3.navigator.locks : null;
    } catch {
      return null;
    }
  };
  async function withLock(fn2) {
    const L3 = lockManager();
    if (!L3) return fn2(false);
    let granted = false;
    const ac = typeof AbortController === "function" ? new AbortController() : null;
    const timer2 = ac ? setTimeout(() => {
      if (!granted) ac.abort();
    }, 3e3) : 0;
    try {
      return await L3.request(LOCK, ac ? { signal: ac.signal } : {}, async () => {
        granted = true;
        clearTimeout(timer2);
        return fn2(true);
      });
    } catch (e3) {
      if (granted) throw e3;
      logger3.debug("拿不到设置写入锁,直接写", e3);
      return fn2(false);
    } finally {
      clearTimeout(timer2);
    }
  }
  var MIRROR = "$mirror";
  function readMirror() {
    if (!useSiteStorage()) return null;
    try {
      const raw2 = (W3.localStorage || localStorage).getItem(SITE_STORAGE_KEY);
      if (!raw2) return null;
      const v3 = JSON.parse(raw2, reviver);
      const m3 = v3 && v3[MIRROR];
      if (!m3 || m3.v !== FORMAT || typeof m3.vers !== "object") return null;
      const doc = { ...v3 };
      for (const k4 of [...META_KEYS, MIRROR]) delete doc[k4];
      if (!doc.plugins || typeof doc.plugins !== "object") doc.plugins = {};
      const ver = (x4) => Array.isArray(x4) ? { rev: Number(x4[0]) || 0, writer: String(x4[1] || "") } : null;
      const vers = new Map(Object.entries(m3.vers).map(([k4, x4]) => [k4, ver(x4)]).filter(([, x4]) => x4));
      const base = new Map(Object.entries(m3.base || {}).map(([k4, x4]) => [k4, ver(x4)]).filter(([, x4]) => x4));
      return { doc, vers, base, parts: Array.isArray(m3.parts) ? m3.parts : [] };
    } catch {
      return null;
    }
  }
  function writeMirror(bases) {
    if (!useSiteStorage()) return;
    const vers = {}, base = {};
    for (const [k4, v3] of partVer) vers[k4] = [v3.rev, v3.writer];
    for (const [k4, v3] of bases) base[k4] = [v3.rev, v3.writer];
    for (const k4 of Object.keys(vers)) if (!(k4 in base)) base[k4] = vers[k4];
    try {
      const doc = persistable();
      const rev = Math.max(0, ...[...partVer.values()].map((v3) => v3.rev));
      (W3.localStorage || localStorage).setItem(SITE_STORAGE_KEY, serialize({ ...doc, [SAVED_AT]: Date.now(), [REV]: rev, [WRITER]: TAB_WRITER, [MIRROR]: { v: FORMAT, vers, base, parts: sortedParts() } }));
    } catch (e3) {
      logger3.debug("写入 localStorage 镜像失败", e3);
    }
  }
  function applyMirror(m3) {
    if (!m3) return;
    for (const [part, ver] of m3.vers) {
      if (cmpVer(ver, partVer.get(part) || noVer) <= 0) continue;
      if (part === META) applyRemotePart(META, metaContentOf(m3.doc), ver, { parts: m3.parts });
      else applyRemotePart(part, m3.doc.plugins[part], ver, { deleted: m3.doc.plugins[part] === void 0 });
    }
  }
  var SITE_BACKUP_DELAY = 2e3;
  var siteTimer = 0;
  var siteJson = null;
  var lastSiteBody = null;
  function setPart(part, value) {
    const json = serialize(value);
    try {
      return GM2.set(partKey(part), JSON.parse(json));
    } catch {
      return GM2.set(partKey(part), json);
    }
  }
  function planWrites(wrote) {
    const touched = new Set(forceParts);
    if (migrate) {
      touched.add(META);
      for (const n2 of Object.keys(PlainSettings.plugins || {})) touched.add(n2);
    }
    for (const p3 of wrote) for (const part of partsOfPath(p3)) touched.add(part);
    const out = [];
    const order = [...touched].filter((p3) => p3 !== META).concat(touched.has(META) ? [META] : []);
    for (const part of order) {
      const content = persistablePart(part);
      if (part !== META && !knownParts.has(part) && (content === void 0 || content && typeof content === "object" && !Array.isArray(content) && !Object.keys(content).length)) continue;
      if (part !== META && !knownParts.has(part)) {
        knownParts.add(part);
        watchPart(part);
      }
      out.push({ part, content });
    }
    if (!touched.has(META) && bodyOf(META, persistablePart(META)) !== lastBody.get(META)) out.push({ part: META, content: persistablePart(META) });
    return out.filter((w4) => forceParts.has(w4.part) || bodyOf(w4.part, w4.content) !== lastBody.get(w4.part));
  }
  function writeOne(w4, wrote) {
    const prev = partVer.get(w4.part) || noVer;
    const ver = { rev: prev.rev + 1, writer: TAB_WRITER };
    const meta2 = { [REV]: ver.rev, [WRITER]: ver.writer };
    let value;
    if (w4.part === META) value = { ...w4.content, ...meta2, [SAVED_AT]: Date.now(), $v: FORMAT, $parts: sortedParts() };
    else if (w4.content === void 0) value = { ...meta2, $deleted: true };
    else if (w4.content && typeof w4.content === "object" && !Array.isArray(w4.content)) value = { ...w4.content, ...meta2 };
    else value = { $value: w4.content, ...meta2 };
    const r3 = setPart(w4.part, value);
    const base = w4.part === META ? (() => {
      try {
        return JSON.parse(lastBody.get(META) || "null", reviver);
      } catch {
        return null;
      }
    })() : (() => {
      const b3 = lastBody.get(w4.part);
      if (!b3 || b3 === "$deleted") return null;
      try {
        return JSON.parse(b3, reviver);
      } catch {
        return null;
      }
    })();
    const commit = () => {
      partVer.set(w4.part, ver);
      lastBody.set(w4.part, bodyOf(w4.part, w4.content));
      forceParts.delete(w4.part);
      const mine = wrote.filter((p3) => partsOfPath(p3).includes(w4.part));
      const stored = w4.content === void 0 ? void 0 : JSON.parse(serialize({ v: w4.content }), reviver).v;
      inflight.set(w4.part, { ver, base, paths: new Map(mine.map((p3) => [p3, stored === void 0 ? null : getRel(stored, relOf(w4.part, p3)) ?? null])) });
      return { part: w4.part, ver, prev };
    };
    return { r: r3, commit };
  }
  function armVerify() {
    clearTimeout(verifyTimer);
    verifyTimer = setTimeout(async () => {
      verifyTimer = 0;
      for (const [part, fl] of [...inflight]) {
        const r3 = await awaitMaybe(readPart(part));
        if (inflight.get(part) !== fl) continue;
        if (!r3 || r3.ver.writer === TAB_WRITER && r3.ver.rev === fl.ver.rev) {
          inflight.delete(part);
          continue;
        }
        applyRemotePart(part, r3.deleted ? void 0 : r3.content, r3.ver, { parts: r3.parts, deleted: r3.deleted });
        if (inflight.get(part) === fl && r3.ver.rev > fl.ver.rev) inflight.delete(part);
      }
      if (!inflight.size) reasserts = 0;
    }, VERIFY_MS);
  }
  async function refreshFromStores() {
    applyMirror(readMirror());
    if (!GM2.get) return;
    for (const part of [META, ...knownParts]) {
      const r3 = await awaitMaybe(readPart(part));
      if (r3 && cmpVer(r3.ver, partVer.get(part) || noVer) > 0) applyRemotePart(part, r3.deleted ? void 0 : r3.content, r3.ver, { parts: r3.parts, deleted: r3.deleted });
    }
  }
  function noteSiteBackup() {
    if (!useSiteStorage()) return;
    let body;
    try {
      body = serialize(persistable());
    } catch {
      return;
    }
    if (body === lastSiteBody) return;
    const rev = Math.max(0, ...[...partVer.values()].map((v3) => v3.rev));
    siteJson = { body, json: serialize({ ...persistable(), [SAVED_AT]: Date.now(), [REV]: rev, [WRITER]: TAB_WRITER }) };
  }
  var pendingSave = false;
  var saving = null;
  var saveAgain = false;
  var flushWanted = false;
  function saveNow({ flushBackup = false } = {}) {
    if (flushBackup) flushWanted = true;
    if (saving) {
      saveAgain = true;
      return saving;
    }
    saving = (async () => {
      try {
        do {
          saveAgain = false;
          await saveOnce();
        } while (saveAgain);
        if (flushWanted) {
          flushWanted = false;
          await flushSiteBackup();
        }
      } finally {
        saving = null;
      }
    })();
    return saving;
  }
  async function saveOnce() {
    if (!ready) return;
    if (!PlainSettings.plugins || Object.keys(PlainSettings.plugins).length === 0) return;
    pendingSave = false;
    await withLock(async (locked2) => {
      if (locked2) {
        post({ t: "begin" });
        await waitOpenWriters();
      }
      try {
        await refreshFromStores();
        writeBootSnapshot();
        const wrote = [...dirty];
        dirty.clear();
        let plan;
        try {
          plan = planWrites(wrote);
        } catch (e3) {
          logger3.warn("设置序列化失败", e3);
          for (const p3 of wrote) dirty.add(p3);
          return;
        }
        const done = [], bases = /* @__PURE__ */ new Map();
        if (GM2.set) {
          for (const w4 of plan) {
            let job;
            try {
              job = writeOne(w4, wrote);
              if (job.r && typeof job.r.then === "function") await job.r;
            } catch (e3) {
              logger3.warn("写入设置失败", e3);
              for (const p3 of wrote) if (partsOfPath(p3).includes(w4.part)) dirty.add(p3);
              pendingSave = true;
              continue;
            }
            const c3 = job.commit();
            bases.set(c3.part, c3.prev);
            done.push(c3);
          }
        }
        if (done.length) {
          migrate = false;
          writeMirror(bases);
          post({ t: "done", parts: done.map((c3) => {
            const content = persistablePart(c3.part);
            return { part: c3.part, ver: c3.ver, body: content === void 0 ? null : serialize(content), deleted: c3.part !== META && content === void 0, parts: c3.part === META ? sortedParts() : void 0 };
          }) });
          armVerify();
        } else if (locked2) post({ t: "done", parts: [] });
        noteSiteBackup();
      } catch (e3) {
        if (locked2) post({ t: "done", parts: [] });
        throw e3;
      }
    });
    if (siteJson && !siteTimer) siteTimer = setTimeout(() => {
      flushSiteBackup();
    }, SITE_BACKUP_DELAY);
  }
  function flushSync() {
    if (!ready || !GM2.set) return;
    const wrote = [...dirty];
    dirty.clear();
    pendingSave = false;
    let plan;
    try {
      plan = planWrites(wrote);
    } catch {
      return;
    }
    const bases = /* @__PURE__ */ new Map(), done = [];
    for (const w4 of plan) {
      try {
        const job = writeOne(w4, wrote);
        if (job.r && typeof job.r.then === "function") job.r.catch(() => {
        });
        const c3 = job.commit();
        bases.set(c3.part, c3.prev);
        done.push(c3);
      } catch (e3) {
        logger3.warn("写入设置失败", e3);
      }
    }
    if (done.length) {
      writeMirror(bases);
      post({ t: "done", parts: done.map((c3) => {
        const content = persistablePart(c3.part);
        return { part: c3.part, ver: c3.ver, body: content === void 0 ? null : serialize(content), deleted: c3.part !== META && content === void 0, parts: c3.part === META ? sortedParts() : void 0 };
      }) });
    }
    noteSiteBackup();
    flushSiteBackup();
  }
  async function flushSiteBackup() {
    clearTimeout(siteTimer);
    siteTimer = 0;
    const pending = siteJson;
    siteJson = null;
    if (!pending) return;
    try {
      await idbSet(SITE_STORAGE_KEY, pending.json);
      lastSiteBody = pending.body;
    } catch (e3) {
      logger3.debug("写入 IndexedDB 备份失败", e3);
    }
  }
  var debouncedSave = debounce2(() => {
    saveNow();
  }, 100);
  var scheduleSave = Object.assign(() => {
    pendingSave = true;
    debouncedSave();
  }, { cancel: () => debouncedSave.cancel() });
  function installUnloadSave() {
    const flush2 = () => {
      if (!pendingSave && !siteJson && !dirty.size) return;
      scheduleSave.cancel();
      flushSync();
    };
    W3.addEventListener("beforeunload", flush2);
    W3.addEventListener("pagehide", flush2);
  }
  var watched = /* @__PURE__ */ new Set();
  function watchPart(part) {
    if (!syncInstalled || !GM2.addListener || watched.has(part)) return;
    watched.add(part);
    try {
      GM2.addListener(partKey(part), (_name, _old, value, remote) => {
        if (!remote) return;
        const r3 = parsePart(value);
        if (!r3) return;
        applyRemotePart(part, r3.deleted ? void 0 : r3.content, r3.ver, { parts: r3.parts, deleted: r3.deleted });
      });
    } catch (e3) {
      logger3.debug("监听脚本管理器存储失败", e3);
    }
  }
  function catchUpPart(part) {
    const r3 = readPart(part);
    if (!r3 || typeof r3.then === "function") {
      if (r3) r3.then((x4) => {
        if (x4 && cmpVer(x4.ver, partVer.get(part) || noVer) > 0) applyRemotePart(part, x4.deleted ? void 0 : x4.content, x4.ver, { parts: x4.parts, deleted: x4.deleted });
      });
      return;
    }
    if (cmpVer(r3.ver, partVer.get(part) || noVer) > 0) applyRemotePart(part, r3.deleted ? void 0 : r3.content, r3.ver, { parts: r3.parts, deleted: r3.deleted });
  }
  var syncInstalled = false;
  function installCrossTabSync() {
    if (syncInstalled) return;
    syncInstalled = true;
    getChannel();
    for (const part of [META, ...knownParts]) {
      watchPart(part);
      catchUpPart(part);
    }
    if (useSiteStorage()) {
      W3.addEventListener("storage", (e3) => {
        if (e3.key !== SITE_STORAGE_KEY || e3.newValue == null) return;
        applyMirror(readMirror());
      });
    }
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/net.js
  var CONNECT = typeof define_USPP_CONNECT_default !== "undefined" ? define_USPP_CONNECT_default : ["*"];
  var allowedHosts = () => CONNECT.slice();
  function hostAllowed(host2, list2 = CONNECT) {
    const hn2 = String(host2 || "").toLowerCase();
    if (!hn2) return false;
    const self = (() => {
      try {
        return W3.location.hostname.toLowerCase();
      } catch {
        return "";
      }
    })();
    if (hn2 === self) return true;
    return list2.some((raw2) => {
      const h5 = String(raw2).toLowerCase();
      return h5 === "*" || h5 === "self" && hn2 === self || hn2 === h5 || hn2.endsWith("." + h5);
    });
  }
  var blocked = [];
  var blockedRequests = () => blocked.slice();
  function denyReason(url, plugin, pluginHosts) {
    let u3, base;
    try {
      base = W3.location.href;
    } catch {
    }
    try {
      u3 = new URL(url, base);
    } catch {
      return `invalid URL: ${String(url).slice(0, 100)}`;
    }
    if (!/^https?:$/.test(u3.protocol)) return `only http(s) URLs are allowed (${u3.protocol})`;
    const host2 = u3.hostname;
    let why = null;
    if (!hostAllowed(host2)) why = `${host2} is not in this script's allowed hosts (${CONNECT.join(", ") || "none"})`;
    else if (plugin && pluginHosts && !hostAllowed(host2, pluginHosts)) why = `${host2} is not in ${plugin}'s declared hosts (${pluginHosts.join(", ") || "none"})`;
    if (why) {
      if (blocked.length >= 50) blocked.shift();
      blocked.push({ host: host2, plugin: plugin || null, at: (/* @__PURE__ */ new Date()).toISOString() });
    }
    return why;
  }
  function fetchExternalFor(plugin, hosts2) {
    const list2 = Array.isArray(hosts2) ? hosts2.map(String) : null;
    return (url, opts) => request(url, opts, plugin, list2);
  }
  function fetchExternal(url, opts) {
    return request(url, opts, null, null);
  }
  function request(url, { timeout = 3e4 } = {}, plugin, pluginHosts) {
    const why = denyReason(url, plugin, pluginHosts);
    if (why) return Promise.reject(new Error(`Request blocked: ${why}`));
    if (!GM2.xhr) return W3.fetch(url);
    return new Promise((resolve, reject) => {
      GM2.xhr({
        method: "GET",
        url,
        timeout,
        responseType: "text",
        onload: (r3) => {
          const headers = new Headers();
          for (const line of String(r3.responseHeaders || "").split(/\r?\n/)) {
            const i3 = line.indexOf(":");
            if (i3 > 0) {
              try {
                headers.append(line.slice(0, i3).trim(), line.slice(i3 + 1).trim());
              } catch {
              }
            }
          }
          const status = r3.status || 200;
          const body = status === 204 || status === 304 ? null : r3.responseText ?? r3.response ?? "";
          try {
            resolve(new Response(body, { status: status < 200 || status > 599 ? 200 : status, statusText: r3.statusText || "", headers }));
          } catch (e3) {
            reject(e3);
          }
        },
        onerror: () => reject(new Error("网络错误")),
        ontimeout: () => reject(new Error("请求超时")),
        onabort: () => reject(new Error("请求被中止"))
      });
    });
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/bridge.js
  var allowed = /* @__PURE__ */ new Map();
  var resolvers = /* @__PURE__ */ new Map();
  var pluginResolver = () => null;
  var facades = /* @__PURE__ */ new Map();
  var boundCache = /* @__PURE__ */ new WeakMap();
  var SELF_REF = /\$self\.([A-Za-z_$][\w$]*)/g;
  var pluginSelfKey = (name) => `plugin:${name}`;
  function allowSelfRefs(key, code) {
    if (typeof code !== "string") return;
    let set = allowed.get(key);
    for (const m3 of code.matchAll(SELF_REF)) {
      if (!set) allowed.set(key, set = /* @__PURE__ */ new Set());
      set.add(m3[1]);
    }
  }
  function setPluginResolver(fn2) {
    pluginResolver = typeof fn2 === "function" ? fn2 : () => null;
  }
  var pluginDead = () => false;
  function setPluginDeadCheck(fn2) {
    pluginDead = typeof fn2 === "function" ? fn2 : () => false;
  }
  var PASS = (a3) => a3;
  var deadHits = /* @__PURE__ */ new Map();
  var deadSelfHits = () => Object.fromEntries(deadHits);
  function setSelfTarget(key, getTarget) {
    resolvers.set(key, getTarget);
  }
  var invoke = (t3, fn2, a3) => fn2.apply(t3, a3);
  function setSelfInvoker(fn2) {
    invoke = typeof fn2 === "function" ? fn2 : (t3, f3, a3) => f3.apply(t3, a3);
  }
  var targetOf = (key) => key.startsWith("plugin:") ? pluginResolver(key.slice(7)) : resolvers.get(key)?.() ?? null;
  function bound(target2, fn2) {
    let byFn = boundCache.get(target2);
    if (!byFn) boundCache.set(target2, byFn = /* @__PURE__ */ new Map());
    let b3 = byFn.get(fn2);
    if (!b3) byFn.set(fn2, b3 = function(...a3) {
      return invoke(target2, fn2, a3);
    });
    return b3;
  }
  function selfFacade(key) {
    let f3 = facades.get(key);
    if (f3) return f3;
    f3 = new Proxy(Object.freeze(/* @__PURE__ */ Object.create(null)), {
      get(_3, prop) {
        if (typeof prop !== "string" || !allowed.get(key)?.has(prop)) return void 0;
        const t3 = targetOf(key);
        if (!t3) return void 0;
        const v3 = t3[prop];
        if (key.startsWith("plugin:") && pluginDead(t3)) {
          deadHits.set(t3.name, (deadHits.get(t3.name) || 0) + 1);
          const fb = t3.selfFallback && Object.prototype.hasOwnProperty.call(t3.selfFallback, prop) ? t3.selfFallback[prop] : void 0;
          if (typeof v3 === "function") return typeof fb === "function" ? fb : PASS;
          return fb;
        }
        return typeof v3 === "function" ? bound(t3, v3) : v3;
      },
      has(_3, prop) {
        return typeof prop === "string" && !!allowed.get(key)?.has(prop);
      },
      set() {
        return false;
      },
      defineProperty() {
        return false;
      },
      deleteProperty() {
        return false;
      },
      setPrototypeOf() {
        return false;
      }
    });
    facades.set(key, f3);
    return f3;
  }
  var bridge = /* @__PURE__ */ Object.create(null);
  Object.defineProperties(bridge, {
    scriptId: { value: SCRIPT_ID, enumerable: true },
    version: { value: VERSION, enumerable: true },
    // bridge.plugins[名字] -> 该插件的门面(补丁里 $self 展开成这个)
    plugins: { enumerable: true, value: new Proxy(Object.freeze(/* @__PURE__ */ Object.create(null)), { get: (_3, name) => typeof name === "string" ? selfFacade(pluginSelfKey(name)) : void 0, set: () => false, defineProperty: () => false }) },
    site: { enumerable: true, value: Object.freeze({ get settingsHost() {
      return selfFacade("settingsHost");
    } }) },
    // 编译用的临时槽:内联 <script> 把编译结果放进来,compile() 立刻取走
    [Symbol.for("uspp.ggpp.compiled")]: { value: /* @__PURE__ */ Object.create(null) }
  });
  function installBridge(W4, api) {
    if (false) Object.defineProperty(bridge, "api", { value: api });
    Object.preventExtensions(bridge);
    Object.defineProperty(W4, INSTANCE_KEY, { value: bridge, writable: false, configurable: true, enumerable: false });
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/patches.js
  var logger4 = new Logger("Patcher", "#c4b5fd");
  var IDENT = "(?:[A-Za-z_$][\\w$]*)";
  function expandIdent(source) {
    let out = "";
    for (let i3 = 0; i3 < source.length; i3++) {
      const c3 = source[i3];
      if (c3 === "\\") {
        const n2 = source[i3 + 1];
        if (n2 === "i") out += IDENT;
        else out += c3 + (n2 ?? "");
        i3++;
      } else out += c3;
    }
    return out;
  }
  function canonicalizeRegex(re) {
    if (!(re instanceof RegExp)) return re;
    if (re.$$uspp_ggpp_Canonical) return re;
    const expanded = new RegExp(expandIdent(re.source), re.flags);
    const original = re.toString();
    Object.defineProperty(expanded, "toString", { value: () => original, configurable: true });
    Object.defineProperty(expanded, "$$uspp_ggpp_Canonical", { value: true });
    return expanded;
  }
  function canonicalizeFind(find2) {
    if (Array.isArray(find2)) return find2.map(canonicalizeRegex);
    return canonicalizeRegex(find2);
  }
  function matchesOne(code, f3) {
    if (typeof f3 === "string") return code.includes(f3);
    if (f3 instanceof RegExp) {
      f3.lastIndex = 0;
      return f3.test(code);
    }
    return false;
  }
  function matchesFind(code, find2) {
    if (Array.isArray(find2)) return find2.length > 0 && find2.every((f3) => matchesOne(code, f3));
    return matchesOne(code, find2);
  }
  var describeFind = (find2) => Array.isArray(find2) ? find2.map(String).join(" & ") : String(find2);
  var selfExpr = (name) => `${INSTANCE_EXPR}.plugins[${JSON.stringify(name)}]`;
  var pluginSelf = (name) => ({ key: pluginSelfKey(name), expr: selfExpr(name) });
  function canonicalizeReplacement(r3, pluginName, self = pluginSelf(pluginName)) {
    const match = canonicalizeRegex(r3.match);
    let replace = r3.replace;
    if (typeof replace === "string") {
      if (false) {
        const refs = [...replace.matchAll(/\$(\d+)/g)].map((m3) => +m3[1]);
        const max = refs.length ? Math.max(...refs) : 0;
        if (max > countGroups(match)) logger4.warn(`${pluginName}: 替换引用了 $${max},但 match 只有 ${countGroups(match)} 个捕获组`, String(match));
      }
      allowSelfRefs(self.key, replace);
      replace = replace.replaceAll("$self", self.expr);
    } else if (typeof replace === "function") {
      const fn2 = replace;
      replace = (...args) => {
        const out = String(fn2(...args));
        allowSelfRefs(self.key, out);
        return out.replaceAll("$self", self.expr);
      };
    }
    return { ...r3, match, replace };
  }
  var seq = 0;
  function canonicalizePatch(patch, pluginName, checkOnly = false, self) {
    const reps = Array.isArray(patch.replacement) ? patch.replacement : patch.replacement ? [patch.replacement] : [];
    return {
      id: ++seq,
      plugin: pluginName,
      find: canonicalizeFind(patch.find),
      rawFind: patch.find,
      replacement: reps.map((r3) => canonicalizeReplacement(r3, pluginName, self)),
      all: !!patch.all,
      group: !!patch.group,
      noWarn: !!patch.noWarn,
      predicate: patch.predicate,
      checkOnly,
      consumed: false
    };
  }
  function runPredicate(pred, label) {
    if (typeof pred !== "function") return true;
    try {
      return !!pred();
    } catch (e3) {
      logger4.error(`${label} 的 predicate 抛出异常`, e3);
      return false;
    }
  }
  function requiredLiteral(re) {
    if (!(re instanceof RegExp) || re.flags.includes("i")) return null;
    const src = re.source;
    let best = "", run = "", depth = 0;
    const flush2 = () => {
      if (run.length > best.length) best = run;
      run = "";
    };
    for (let i3 = 0; i3 < src.length; i3++) {
      const c3 = src[i3];
      if (c3 === "\\") {
        const n2 = src[i3 + 1];
        i3++;
        if (n2 === void 0) break;
        if (depth === 0 && /[^\w]/.test(n2)) {
          if ("?*{".includes(src[i3 + 1])) flush2();
          else run += n2;
        } else {
          if (depth === 0) flush2();
          const skip = { x: /^[0-9a-fA-F]{0,2}/, u: /^(\{[^}]*\}|[0-9a-fA-F]{0,4})/, c: /^[A-Za-z]?/, k: /^<[^>]*>/, p: /^\{[^}]*\}/, P: /^\{[^}]*\}/ }[n2] ?? (/\d/.test(n2) ? /^\d*/ : null);
          if (skip) i3 += skip.exec(src.slice(i3 + 1))[0].length;
        }
        continue;
      }
      if (c3 === "[") {
        flush2();
        for (i3++; i3 < src.length && src[i3] !== "]"; i3++) if (src[i3] === "\\") i3++;
        continue;
      }
      if (c3 === "(") {
        if (depth === 0) flush2();
        depth++;
        continue;
      }
      if (c3 === ")") {
        depth = Math.max(0, depth - 1);
        continue;
      }
      if (depth > 0) continue;
      if (c3 === "|") return null;
      if (c3 === "?" || c3 === "*" || c3 === "{") {
        run = run.slice(0, -1);
        flush2();
        if (c3 === "{") {
          while (i3 < src.length && src[i3] !== "}") i3++;
        }
        continue;
      }
      if (c3 === "+") {
        flush2();
        continue;
      }
      if (c3 === "." || c3 === "^" || c3 === "$") {
        flush2();
        continue;
      }
      run += c3;
    }
    flush2();
    return best.length >= 3 ? best : null;
  }
  function literalOfFind(find2) {
    const one = (f3) => typeof f3 === "string" ? f3.length ? f3 : null : requiredLiteral(f3);
    if (!Array.isArray(find2)) return one(find2);
    let best = null;
    for (const f3 of find2) {
      const l3 = one(f3);
      if (l3 && (!best || l3.length > best.length)) best = l3;
    }
    return best;
  }
  var escapeRe = (s3) => s3.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  var prefilters = /* @__PURE__ */ new WeakMap();
  function prefilterOf(patchList) {
    let pf = prefilters.get(patchList);
    if (pf && pf.length === patchList.length) return pf;
    const members = /* @__PURE__ */ new Set(), lits = /* @__PURE__ */ new Set();
    for (const p3 of patchList) {
      const lit = literalOfFind(p3.find);
      if (!lit) continue;
      members.add(p3);
      lits.add(lit);
    }
    pf = { length: patchList.length, members, re: lits.size ? new RegExp([...lits].map(escapeRe).join("|")) : null };
    prefilters.set(patchList, pf);
    return pf;
  }
  function applyPatches(moduleId, source, patchList, stats2) {
    let code = source;
    const appliedPlugins = /* @__PURE__ */ new Set();
    const results = [];
    const mismatches = [];
    const pf = prefilterOf(patchList);
    const skipMembers = !!pf.re && !pf.re.test(source);
    for (const p3 of patchList) {
      if (p3.consumed) continue;
      if (skipMembers && code === source && pf.members.has(p3)) continue;
      if (!runPredicate(p3.predicate, p3.plugin)) continue;
      let hit;
      const t0 = false ? now() : 0;
      try {
        hit = matchesFind(code, p3.find);
      } catch (e3) {
        logger4.error(`${p3.plugin}: find 出错`, e3);
        continue;
      }
      if (false) p3.ms = (p3.ms || 0) + (now() - t0);
      if (!hit) continue;
      if (!p3.all) p3.consumed = true;
      if (p3.checkOnly) {
        for (const r3 of p3.replacement) {
          if (!matchesOne(code, r3.match)) mismatches.push({ plugin: p3.plugin, find: describeFind(p3.rawFind), match: String(r3.match), moduleId });
        }
        continue;
      }
      const before = code;
      const statuses = [];
      let failed2 = false;
      for (const r3 of p3.replacement) {
        if (!runPredicate(r3.predicate, p3.plugin)) {
          statuses.push({ match: String(r3.match), status: "skipped" });
          continue;
        }
        try {
          if (r3.match instanceof RegExp) r3.match.lastIndex = 0;
          const next = code.replace(r3.match, r3.replace);
          if (next === code) {
            statuses.push({ match: String(r3.match), status: "noEffect" });
            stats2.noEffect++;
            failed2 = true;
            if (!p3.noWarn && !r3.noWarn) logger4.warn(`${p3.plugin}: 替换无效果(模块 ${moduleId})`, describeFind(p3.rawFind), String(r3.match));
          } else {
            code = next;
            statuses.push({ match: String(r3.match), status: "applied" });
          }
        } catch (e3) {
          statuses.push({ match: String(r3.match), status: "error", error: String(e3) });
          stats2.errors++;
          failed2 = true;
          logger4.error(`${p3.plugin}: 替换出错(模块 ${moduleId})`, describeFind(p3.rawFind), e3);
        }
      }
      if (p3.group && failed2) {
        code = before;
        for (const s3 of statuses) if (s3.status === "applied" || s3.status === "noEffect") s3.status = "reverted";
        if (!p3.noWarn) logger4.warn(`${p3.plugin}: 成组补丁未全部生效,已撤销(模块 ${moduleId})`, describeFind(p3.rawFind));
      }
      const appliedCount = statuses.filter((s3) => s3.status === "applied").length;
      if (appliedCount) appliedPlugins.add(p3.plugin);
      results.push({ plugin: p3.plugin, find: describeFind(p3.rawFind), moduleId, replacements: statuses });
    }
    return { code, applied: [...appliedPlugins], results, mismatches };
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/turbopack.js
  var logger5 = new Logger("Turbopack", "#93c5fd");
  var fnToString = Function.prototype.toString;
  var META2 = Symbol.for("uspp.ggpp.factory");
  var patches = [];
  var patchResults = [];
  var patchStats = { applied: 0, bypassed: 0, noEffect: 0, errors: 0, runtimeFallbacks: 0, patchedModules: /* @__PURE__ */ new Set(), injectionFallbacks: /* @__PURE__ */ new Set() };
  var checkOnlyMismatches = [];
  var moduleCache = /* @__PURE__ */ new Map();
  var factories = /* @__PURE__ */ new Map();
  var chunkPaths = /* @__PURE__ */ new Set();
  var wrapperOf = /* @__PURE__ */ new WeakMap();
  var wrappers = /* @__PURE__ */ new WeakSet();
  var metaById = /* @__PURE__ */ new Map();
  var loadListeners = /* @__PURE__ */ new Set();
  var cacheVersion = 0;
  var getCacheVersion = () => cacheVersion;
  var resetVersion = 0;
  var getResetVersion = () => resetVersion;
  var runtime = { registry: null, cache: null, ctx: null };
  var hasOwnToString = (f3) => {
    try {
      return Object.prototype.hasOwnProperty.call(f3, "toString");
    } catch {
      return false;
    }
  };
  function isForeignWrapper(f3) {
    try {
      if (!Object.prototype.hasOwnProperty.call(f3, "toString")) return false;
      return fnToString.call(f3) !== String(f3.toString());
    } catch {
      return false;
    }
  }
  var lostListeners = /* @__PURE__ */ new Set();
  var lostModules = /* @__PURE__ */ new Set();
  var onPatchLost = (cb) => {
    lostListeners.add(cb);
    for (const id of lostModules) safeLost(cb, id);
    return () => lostListeners.delete(cb);
  };
  function onPatchBypassed(pluginName, cb) {
    return onPatchLost((id, _plugins, results) => {
      const mine = results.filter((r3) => r3.plugin === pluginName);
      if (mine.length) cb(mine, id);
    });
  }
  function safeLost(cb, id) {
    if (diag.noFallback) {
      trace("fallback.suppressed", String(id));
      return;
    }
    const meta2 = metaById.get(id);
    try {
      cb(id, meta2 ? meta2.plugins.slice() : [], meta2 ? meta2.results.filter((r3) => r3.replacements.some((x4) => x4.status === "bypassed")) : []);
    } catch (e3) {
      logger5.error("补丁失效监听者出错", e3);
    }
  }
  var appliedEntries = (meta2) => meta2.results.flatMap((r3) => r3.replacements.filter((x4) => x4.status === "applied"));
  function markRan(meta2) {
    if (meta2.ranPatched) return;
    meta2.ranPatched = true;
    patchStats.applied += appliedEntries(meta2).length;
  }
  function markLost(id, why) {
    if (lostModules.has(id)) return;
    lostModules.add(id);
    const meta2 = metaById.get(id);
    if (meta2) {
      const entries2 = appliedEntries(meta2);
      for (const e3 of entries2) {
        e3.status = "bypassed";
        e3.reason = why;
      }
      patchStats.bypassed += entries2.length;
    }
    logger5.warn(`模块 ${id} 的补丁没有生效(${why}),相关插件改用运行时兜底:${meta2 ? meta2.plugins.join(", ") : ""}`);
    trace("patch.lost", { id, why, plugins: meta2 ? meta2.plugins : [] });
    for (const cb of [...lostListeners]) safeLost(cb, id);
  }
  function registerInjectionFallback(pluginName, detail) {
    if (patchStats.injectionFallbacks.has(pluginName)) return;
    patchStats.injectionFallbacks.add(pluginName);
    trace("fallback.enabled", { plugin: pluginName, detail });
    logger5.info(`${pluginName} 的补丁被绕过,已启用运行时兜底${detail ? `(${detail})` : ""}`);
  }
  function checkLostPatches() {
    const c3 = runtime.cache;
    if (!c3) return;
    for (const [id, meta2] of metaById) {
      if (meta2.ranPatched || lostModules.has(id)) continue;
      const m0 = c3[id];
      if (!(m0 && m0.exports != null)) continue;
      meta2.resolve?.();
      if (!meta2.patched) continue;
      const m3 = c3[id];
      if (m3 && m3.exports != null && !meta2.executing) markLost(id, "被其他脚本的包装绕过");
    }
  }
  var registeredKeys = /* @__PURE__ */ new Set();
  function addPatch(patch, pluginName, { checkOnly = false, key, self } = {}) {
    if (key) {
      if (registeredKeys.has(key)) return null;
      registeredKeys.add(key);
    }
    if (!runPredicate(patch.predicate, pluginName)) return null;
    const p3 = canonicalizePatch(patch, pluginName, checkOnly, self);
    patches.push(p3);
    if (replacedByOther || yieldedTo) queueMicrotask(bypassPending);
    return p3;
  }
  function onModuleLoad(cb) {
    loadListeners.add(cb);
    return () => loadListeners.delete(cb);
  }
  function registerExports(id, exports) {
    if (exports == null) return;
    applyInjections(id, exports);
    if (moduleCache.has(id)) resetVersion++;
    moduleCache.set(id, exports);
    cacheVersion++;
    for (const cb of [...loadListeners]) {
      try {
        cb(exports, id);
      } catch (e3) {
        logger5.error("模块加载监听者出错", e3);
      }
    }
  }
  function rescanRuntimeCache() {
    const c3 = runtime.cache;
    if (!c3) return 0;
    const fresh = [];
    for (const id of Object.keys(c3)) {
      const key = isNaN(+id) ? id : +id;
      if (moduleCache.has(key)) continue;
      const m3 = c3[id];
      if (m3 && !m3.error && m3.exports != null) {
        applyInjections(key, m3.exports);
        moduleCache.set(key, m3.exports);
        fresh.push([key, m3.exports]);
      }
    }
    if (fresh.length) cacheVersion++;
    for (const [key, exports] of fresh) {
      for (const cb of [...loadListeners]) {
        try {
          cb(exports, key);
        } catch (e3) {
          logger5.error("模块加载监听者出错", e3);
        }
      }
    }
    return fresh.length;
  }
  var lastRuntimeCount = -1;
  function syncRuntimeCache() {
    const c3 = runtime.cache;
    if (!c3) return 0;
    let n2;
    try {
      n2 = Object.keys(c3).length;
    } catch {
      return 0;
    }
    if (n2 === lastRuntimeCount) return 0;
    lastRuntimeCount = n2;
    return rescanRuntimeCache();
  }
  var injections = [];
  function sourceOf(id) {
    const f3 = factories.get(id) ?? factories.get(+id) ?? runtime.registry?.get?.(id) ?? runtime.registry?.get?.(+id);
    if (typeof f3 !== "function") return null;
    try {
      const o3 = f3[META2]?.original ?? f3;
      return isForeignWrapper(o3) ? String(o3.toString()) : fnToString.call(o3);
    } catch {
      return null;
    }
  }
  function applyInjection(inj, id, exports) {
    if (inj.removed || inj.targets.has(exports)) return false;
    let added = false;
    for (const [name, get] of Object.entries(inj.exports)) {
      if (name in exports) {
        if (!inj.warned) {
          inj.warned = true;
          logger5.warn(`injectExports:模块 ${id} 已有导出 ${name},不覆盖`);
        }
        continue;
      }
      try {
        Object.defineProperty(exports, name, { get: () => get(exports), enumerable: true, configurable: true });
        inj.added.push([exports, name]);
        added = true;
      } catch (e3) {
        logger5.warn(`injectExports:模块 ${id} 的导出对象不能追加属性`, e3);
      }
    }
    inj.targets.add(exports);
    if (added) inj.modules.add(id);
    return added;
  }
  function applyInjections(id, exports) {
    if (!injections.length || exports == null || typeof exports !== "object" && typeof exports !== "function") return;
    let src;
    for (const inj of injections) {
      if (inj.removed) continue;
      src ??= sourceOf(id) ?? "";
      if (src && matchesFind(src, inj.find)) applyInjection(inj, id, exports);
    }
  }
  function injectExports(find2, exports) {
    const inj = { find: canonicalizeFind(find2), exports: exports || {}, targets: /* @__PURE__ */ new WeakSet(), added: [], modules: /* @__PURE__ */ new Set(), removed: false, warned: false };
    injections.push(inj);
    let changed = false;
    for (const [id] of findInRegistry((src) => matchesFind(src, inj.find))) {
      const ex = moduleCache.get(id) ?? (runtime.cache && runtime.cache[id] && !runtime.cache[id].error ? runtime.cache[id].exports : null);
      if (ex != null && applyInjection(inj, id, ex)) changed = true;
    }
    if (changed) {
      cacheVersion++;
      resetVersion++;
    }
    const undo = () => {
      if (inj.removed) return;
      inj.removed = true;
      for (const [ex, name] of inj.added) {
        try {
          delete ex[name];
        } catch {
        }
      }
      injections.splice(injections.indexOf(inj), 1);
      cacheVersion++;
      resetVersion++;
    };
    undo.modules = inj.modules;
    return undo;
  }
  var COMPILED = Symbol.for("uspp.ggpp.compiled");
  function getNonce() {
    const s3 = document.querySelector("script[nonce]");
    return s3 ? s3.nonce || s3.getAttribute("nonce") || "" : "";
  }
  function compile2(id, code, kind = "turbopack") {
    const sourceURL = `
//# sourceURL=uspp:///${kind}/module-${String(id).replace(/[^\w.-]/g, "_")}.js`;
    const ns = W3[INSTANCE_KEY];
    try {
      if (ns && document.documentElement) {
        const bag = ns[COMPILED];
        if (!bag) throw new Error("页面桥上没有编译槽");
        const key = "m" + String(id).replace(/[^\w]/g, "_");
        delete bag[key];
        const el = document.createElement("script");
        const nonce = getNonce();
        if (nonce) el.nonce = nonce;
        el.textContent = `${INSTANCE_EXPR}[Symbol.for("uspp.ggpp.compiled")][${JSON.stringify(key)}]=(${code}
);${sourceURL}`;
        (document.head || document.documentElement).appendChild(el);
        el.remove();
        const fn2 = bag[key];
        delete bag[key];
        if (typeof fn2 === "function") return fn2;
      }
    } catch (e3) {
      logger5.debug("内联 script 编译失败,改用 Function", e3);
    }
    const F4 = W3.Function || Function;
    return new F4(`return (${code}
);${sourceURL}`)();
  }
  function captureRuntime(ctx) {
    if (runtime.registry || !ctx || typeof ctx !== "object") return;
    try {
      const proto = Object.getPrototypeOf(ctx);
      const reg = proto && proto.M;
      const cache = proto && proto.c;
      if (!(reg instanceof W3.Map || reg instanceof Map) || !cache || typeof cache !== "object") return;
      runtime.registry = reg;
      runtime.cache = cache;
      runtime.ctx = ctx;
      trace("runtime.captured", { registry: reg.size, cache: Object.keys(cache).length });
      if (diag.noRegistry) trace("registry.skipped");
      else hookRegistry(reg);
      rescanRuntimeCache();
    } catch (e3) {
      logger5.error("获取运行时注册表失败", e3);
    }
  }
  var nativeMapSet = Map.prototype.set;
  var seenModule = (id) => metaById.has(id) || metaById.has(String(id)) || metaById.has(+id);
  function hookRegistry(reg) {
    const prevSet = reg.set;
    for (const [id, f3] of reg) {
      if (typeof f3 !== "function" || wrappers.has(f3) || seenModule(id)) continue;
      if (runtime.cache && runtime.cache[id]) {
        if (!factories.has(id)) factories.set(id, f3);
        continue;
      }
      try {
        nativeMapSet.call(reg, id, wrapFactory(id, f3));
        trace("registry.rewrap", id);
      } catch {
      }
    }
    trace("registry.hooked", { size: reg.size });
    reg.set = function(id, f3) {
      count("registry.set");
      if (typeof f3 === "function" && !wrappers.has(f3) && !seenModule(id)) {
        f3 = wrapFactory(id, f3);
        trace("registry.wrapOnSet", id);
      }
      return prevSet.call(this, id, f3);
    };
  }
  var TURBOPACK_ADAPTER = {
    kind: "turbopack",
    capture: (a3) => captureRuntime(a3[0]),
    exportsOf: (a3) => a3[1] && a3[1].exports,
    fresh: (self, original, a3) => runOriginalFresh(self, original, a3[0], a3[1], a3[2], a3)
  };
  function wrapFactory(id, original, adapter = TURBOPACK_ADAPTER) {
    if (wrappers.has(original)) return original;
    const existing = wrapperOf.get(original);
    if (existing) return existing;
    if (!factories.has(id)) factories.set(id, original);
    const lazy = hasOwnToString(original);
    let foreign = false;
    let source = null;
    let resolved = false;
    trace("factory.wrap", { id, lazy });
    const meta2 = { id, original, patched: false, plugins: [], results: [], code: null, compiled: null, compileFailed: false, deferred: false, ranPatched: false, executing: false };
    const resolve = () => {
      if (resolved) return;
      resolved = true;
      try {
        if (lazy) {
          const own = String(original.toString());
          foreign = own !== fnToString.call(original);
          source = own;
        } else source = fnToString.call(original);
      } catch {
      }
      if (!source) return;
      if (adapter.normalize) source = adapter.normalize(source);
      const res = applyPatches(id, source, patches, patchStats);
      if (res.results.length) patchResults.push(...res.results);
      if (res.mismatches.length) checkOnlyMismatches.push(...res.mismatches);
      if (res.code !== source) {
        meta2.patched = true;
        meta2.results = res.results;
        meta2.plugins = res.applied;
        meta2.code = res.code;
        patchStats.patchedModules.add(id);
        meta2.deferred = foreign;
      }
    };
    meta2.resolve = resolve;
    if (!lazy) resolve();
    const wrapper = function(a0, a1, a22) {
      adapter.capture(arguments);
      resolve();
      trace("factory.run", { id, patched: meta2.patched, deferred: meta2.deferred });
      let fn2 = original;
      if (meta2.patched && meta2.deferred) {
        markLost(id, "内层是其他脚本的包装");
      } else if (meta2.patched && !meta2.compileFailed) {
        if (!meta2.compiled) {
          try {
            meta2.compiled = compile2(id, meta2.code, adapter.kind);
          } catch (e3) {
            meta2.compileFailed = true;
            patchStats.errors++;
            logger5.error(`模块 ${id} 补丁后编译失败,改用原始代码(${meta2.plugins.join(", ")})`, e3);
          }
        }
        if (meta2.compiled) fn2 = meta2.compiled;
        else markLost(id, "编译失败");
      }
      let ret;
      meta2.executing = true;
      try {
        ret = fn2.apply(this, arguments);
        if (fn2 !== original) markRan(meta2);
      } catch (e3) {
        if (fn2 === original) throw e3;
        meta2.ranPatched = false;
        markLost(id, "运行出错");
        patchStats.runtimeFallbacks++;
        logger5.error(`模块 ${id} 补丁后运行出错,改用原始代码重新执行(${meta2.plugins.join(", ")})`, e3);
        ret = adapter.fresh(this, original, arguments);
      } finally {
        meta2.executing = false;
      }
      try {
        registerExports(id, adapter.exportsOf(arguments));
      } catch (e3) {
        logger5.error(e3);
      }
      return ret;
    };
    Object.defineProperty(wrapper, "toString", { value: () => {
      resolve();
      return source != null ? source : fnToString.call(original);
    }, configurable: true, writable: true });
    Object.defineProperty(wrapper, "name", { value: original.name, configurable: true });
    Object.defineProperty(wrapper, META2, { value: meta2 });
    wrappers.add(wrapper);
    wrapperOf.set(original, wrapper);
    if (!metaById.has(id)) metaById.set(id, meta2);
    return wrapper;
  }
  function runOriginalFresh(self, original, ctx, mod, exp, args) {
    try {
      if (mod && ctx && typeof ctx === "object") {
        const fresh = {};
        mod.exports = fresh;
        mod.namespaceObject = void 0;
        mod.error = void 0;
        const Ctor = Object.getPrototypeOf(ctx).constructor;
        const freshCtx = new Ctor(mod, fresh);
        return original.call(self, freshCtx, mod, fresh);
      }
    } catch (e3) {
      if (!(e3 instanceof TypeError)) throw e3;
    }
    return original.apply(self, args);
  }
  function getPatchedCode(id) {
    const meta2 = metaById.get(id) ?? metaById.get(+id) ?? metaById.get(String(id));
    meta2?.resolve?.();
    return meta2 && meta2.patched ? meta2.code : null;
  }
  function chunkName(head) {
    try {
      if (typeof head === "string") return head;
      if (head && typeof head.getAttribute === "function") return head.getAttribute("src") || "";
      if (head && typeof head.src === "string") return head.src;
    } catch {
    }
    return "";
  }
  var seenChunks = /* @__PURE__ */ new WeakSet();
  function handleChunk(chunk) {
    if (!Array.isArray(chunk) || seenChunks.has(chunk)) return;
    seenChunks.add(chunk);
    const name = chunkName(chunk[0]);
    if (name) chunkPaths.add(name);
    trace("chunk", { name, length: chunk.length });
    let ids = [];
    for (let i3 = 1; i3 < chunk.length; i3++) {
      const v3 = chunk[i3];
      if (typeof v3 === "function") {
        if (ids.length) {
          if (diag.noOwnWrap || diag.noForeignWrap && hasOwnToString(v3)) {
            if (!factories.has(ids[0])) factories.set(ids[0], v3);
            trace("factory.foreignLeft", ids[0]);
          } else {
            try {
              chunk[i3] = wrapFactory(ids[0], v3);
            } catch (e3) {
              logger5.error("包装工厂失败", e3);
            }
          }
        }
        ids = [];
      } else if (typeof v3 === "number" || typeof v3 === "string") {
        ids.push(v3);
      } else {
        ids = [];
      }
    }
  }
  var instrumented = /* @__PURE__ */ new WeakSet();
  var pushWrapperOf = /* @__PURE__ */ new WeakMap();
  var chainedPushOf = /* @__PURE__ */ new WeakMap();
  var pushCalls = 0;
  var isNativePush = (f3) => {
    try {
      return f3 === Array.prototype.push || f3 === W3.Array?.prototype?.push;
    } catch {
      return false;
    }
  };
  var probed = 0;
  function instrument(value, { existing = false } = {}) {
    if (!value || typeof value !== "object" && typeof value !== "function" || instrumented.has(value)) return value;
    const origPush = value.push;
    const after = diag.pushAfter || existing && Array.isArray(value) && typeof origPush === "function" && !isNativePush(origPush);
    if (after) trace("push.after", { existing, array: Array.isArray(value) });
    if (Array.isArray(value)) {
      for (const c3 of value) handleChunk(c3);
    }
    if (typeof origPush === "function") {
      const mine = function(...chunks) {
        pushCalls++;
        count("push");
        try {
          const outer = value.push;
          if (outer !== mine) chainedPushOf.set(value, outer);
        } catch {
        }
        if (diag.noRead) return origPush.apply(this, chunks);
        if (diag.probeChunks && probed < 5) {
          probed++;
          const desc = (c3) => {
            try {
              return [0, 1, 2].map((i3) => {
                const d3 = Object.getOwnPropertyDescriptor(c3, i3);
                return d3 ? "get" in d3 ? "get" : typeof d3.value : "none";
              });
            } catch (e3) {
              return "err:" + e3.message;
            }
          };
          trace("chunk.probe", { phase: Array.isArray(value) ? "array" : "runtime", after, n: chunks.length, isArray: chunks.map((c3) => Array.isArray(c3)), desc: chunks.map(desc), protoNative: chunks.map((c3) => {
            try {
              return Object.getPrototypeOf(c3) === Array.prototype;
            } catch {
              return null;
            }
          }) });
        }
        if (after) {
          const r3 = origPush.apply(this, chunks);
          for (const c3 of chunks) {
            try {
              handleChunk(c3);
            } catch (e3) {
              logger5.error("处理分块失败", e3);
            }
          }
          return r3;
        }
        for (const c3 of chunks) {
          try {
            handleChunk(c3);
          } catch (e3) {
            logger5.error("处理分块失败", e3);
          }
        }
        return origPush.apply(this, chunks);
      };
      try {
        value.push = mine;
      } catch (e3) {
        logger5.warn("无法包装 TURBOPACK.push", e3);
      }
      if (value.push === mine) pushWrapperOf.set(value, mine);
    }
    instrumented.add(value);
    return value;
  }
  var installed = false;
  var ourGetter = null;
  var yieldedTo = null;
  function installInterceptor() {
    if (installed) return;
    installed = true;
    const desc = Object.getOwnPropertyDescriptor(W3, "TURBOPACK");
    const pre = desc && ("get" in desc || "set" in desc) ? "TURBOPACK 已是别的脚本装的访问器" : desc && Array.isArray(desc.value) && typeof desc.value.push === "function" && !isNativePush(desc.value.push) ? "TURBOPACK.push 已被别的脚本换过" : null;
    if (pre && !diag.coexistActive) {
      yieldedTo = pre;
      trace("turbopack.yield", pre);
      logger5.info(`${pre},本脚本不再挂接,以免改变对方的行为;依赖补丁的功能改用渲染兜底或停用`);
      setTimeout(() => {
        bypassPending();
        notifyInactive();
      }, 0);
      return;
    }
    let current3;
    let chainGet = null, chainSet = null;
    if (desc && ("get" in desc || "set" in desc)) {
      chainGet = desc.get;
      chainSet = desc.set;
      try {
        instrument(chainGet ? chainGet.call(W3) : void 0, { existing: true });
      } catch (e3) {
        logger5.warn(e3);
      }
    } else if (desc) {
      current3 = instrument(desc.value, { existing: true });
    }
    if (diag.noSet) {
      try {
        instrument(W3.TURBOPACK, { existing: true });
      } catch {
      }
      trace("turbopack.install", { existing: desc ? "get" in desc || "set" in desc ? "accessor" : "value" : "none", noSet: true });
      return;
    }
    if (desc && !desc.configurable) {
      logger5.warn("TURBOPACK 不可配置,只能包装其 push");
      try {
        instrument(W3.TURBOPACK, { existing: true });
      } catch {
      }
      return;
    }
    Object.defineProperty(W3, "TURBOPACK", {
      configurable: true,
      enumerable: desc ? desc.enumerable : true,
      get: ourGetter = function() {
        count("turbopack.get");
        if (chainGet) {
          const v3 = chainGet.call(this);
          return instrument(v3, { existing: true });
        }
        return current3;
      },
      set: function(v3) {
        trace("turbopack.set", Array.isArray(v3) ? "array" : typeof v3);
        v3 = instrument(v3);
        if (chainSet) chainSet.call(this, v3);
        else if (!chainGet) current3 = v3;
      }
    });
    logger5.debug("已安装打包器拦截");
    trace("turbopack.install", { existing: desc ? "get" in desc || "set" in desc ? "accessor" : "value" : "none" });
  }
  function findInRegistry(test2) {
    const out = [];
    const seen = /* @__PURE__ */ new Set();
    const consider = (id, f3) => {
      if (seen.has(id) || typeof f3 !== "function") return;
      seen.add(id);
      let src;
      try {
        const o3 = f3[META2]?.original ?? f3;
        src = isForeignWrapper(o3) ? String(o3.toString()) : fnToString.call(o3);
      } catch {
        return;
      }
      if (test2(src, id)) out.push([id, f3]);
    };
    const reg = runtime.registry;
    if (reg instanceof Map || reg instanceof W3.Map) for (const [id, f3] of reg) consider(id, f3);
    else if (reg && typeof reg === "object") for (const id of Object.keys(reg)) consider(isNaN(+id) ? id : +id, reg[id]);
    for (const [id, f3] of factories) consider(id, f3);
    return out;
  }
  function buildReport() {
    const orphaned = [], pending = [];
    for (const p3 of patches) {
      if (p3.consumed || p3.all || p3.checkOnly) continue;
      const pend = findInRegistry((src) => {
        try {
          return matchesFind(src, p3.find);
        } catch {
          return false;
        }
      });
      const entry = `${p3.plugin}: ${describeFind(p3.rawFind)}`;
      if (pend.length) pending.push(entry);
      else if (!p3.noWarn) orphaned.push(entry);
    }
    return { orphaned, pending };
  }
  function patchReport() {
    const { orphaned, pending } = buildReport();
    return {
      stats: { ...patchStats, patchedModules: [...patchStats.patchedModules], injectionFallbacks: [...patchStats.injectionFallbacks], takenOver: replacedByOther, yielded: !!yieldedTo },
      results: patchResults.slice(),
      orphaned,
      pending,
      // 已停用插件的补丁只校验不应用(开发构建):find 命中了但 match 失配的
      validateMisses: checkOnlyMismatches.slice(),
      ...false ? { timings: patchTimings() } : {}
    };
  }
  function logHealthReport() {
    const { orphaned } = buildReport();
    if (replacedByOther || yieldedTo) {
      logger5.info(`补丁统计:${yieldedTo ? "TURBOPACK 让给了先装的脚本" : "TURBOPACK 已被其他脚本接管"},${patchStats.bypassed} 条补丁记为 bypassed,依赖它的功能改用渲染兜底或停用`);
      return { siteChanged: false };
    }
    if (orphaned.length) logger5.warn(`以下补丁找不到对应模块(孤儿):
${orphaned.join("\n")}`);
    const noEffect = patchResults.some((r3) => r3.replacements.some((s3) => s3.status === "noEffect"));
    const siteChanged = patchStats.applied === 0 && (orphaned.length > 0 || noEffect);
    if (siteChanged) logger5.warn("本次没有任何补丁生效,站点构建很可能已变化");
    if (false) {
      logger5.warn("已禁用插件中失配的补丁:", checkOnlyMismatches);
    }
    if (false) {
      const slow = patchTimings().filter((t3) => t3.ms >= 5).slice(0, 5);
      if (slow.length) logger5.debug(`最慢的 find:${slow.map((t3) => `${t3.plugin} ${t3.ms}ms`).join(",")}`);
    }
    logger5.info(`补丁统计:applied ${patchStats.applied},bypassed ${patchStats.bypassed},noEffect ${patchStats.noEffect},errors ${patchStats.errors},运行时回退 ${patchStats.runtimeFallbacks},被补丁模块 ${patchStats.patchedModules.size}`);
    return { siteChanged };
  }
  var lostCheckTimer = 0;
  onModuleLoad(() => {
    if (lostCheckTimer) return;
    lostCheckTimer = setTimeout(() => {
      lostCheckTimer = 0;
      checkLostPatches();
    }, 300);
  });
  var replacedByOther = false;
  var takeoverListeners = /* @__PURE__ */ new Set();
  function onTakeover(cb) {
    if (replacedByOther || yieldedTo && inactiveNotified) {
      try {
        cb();
      } catch (e3) {
        logger5.error(e3);
      }
      return () => {
      };
    }
    takeoverListeners.add(cb);
    return () => takeoverListeners.delete(cb);
  }
  var TAKEOVER_GRACE_MS = 1e3;
  var suspect = null;
  var chainedValue = null;
  function takeoverReason() {
    const d3 = Object.getOwnPropertyDescriptor(W3, "TURBOPACK");
    if (!d3) return null;
    const v3 = "value" in d3 ? d3.value : (() => {
      try {
        return W3.TURBOPACK;
      } catch {
        return void 0;
      }
    })();
    if (v3 == null) return null;
    if (!instrumented.has(v3)) {
      if (v3 === chainedValue) return null;
      return d3.get && d3.get !== ourGetter ? "属性被重定义成别人的访问器,取到的值没经过本脚本" : "值被换掉,没经过本脚本";
    }
    const mine = pushWrapperOf.get(v3);
    if (!mine) return null;
    const push = v3.push;
    if (push === mine || chainedPushOf.get(v3) === push) return null;
    return "push 被换掉";
  }
  function declareTakeover(why) {
    replacedByOther = true;
    trace("takeover", why);
    logger5.warn(`TURBOPACK 被其他脚本接管且没有串联本脚本的处理(${why}),不再争夺;之后加载的模块不打补丁,依赖补丁的功能改用渲染兜底或停用`);
    bypassPending();
    notifyInactive();
  }
  var inactiveNotified = false;
  function notifyInactive() {
    inactiveNotified = true;
    for (const cb of [...takeoverListeners]) {
      try {
        cb();
      } catch (e3) {
        logger5.error(e3);
      }
    }
    if (!runtime.registry) (yieldedTo ? logger5.info : logger5.warn).call(logger5, "没取到打包器的运行时,依赖站点模块的界面入口(渲染兜底等)无法启用;框架设置从脚本管理器菜单打开");
  }
  var takeoverSeq = 0;
  function bypassPending() {
    const results = [];
    for (const p3 of patches) {
      if (p3.consumed || p3.checkOnly || p3.all) continue;
      p3.consumed = true;
      const replacements = p3.replacement.map((r3) => ({ match: String(r3.match), status: "bypassed", reason: yieldedTo ? "TURBOPACK 让给先装的脚本" : "TURBOPACK 被接管" }));
      patchStats.bypassed += replacements.length;
      results.push({ plugin: p3.plugin, find: describeFind(p3.rawFind), moduleId: null, replacements });
    }
    patchResults.push(...results);
    if (!results.length) return;
    const id = `(${yieldedTo ? "TURBOPACK 让给先装的脚本" : "TURBOPACK 被接管"} #${++takeoverSeq})`;
    metaById.set(id, { id, patched: true, plugins: [...new Set(results.map((r3) => r3.plugin))], results, ranPatched: false });
    lostModules.add(id);
    for (const cb of [...lostListeners]) safeLost(cb, id);
  }
  function watchInstrumentation(durationMs = 2e4) {
    if (!installed || yieldedTo) return;
    const until = Date.now() + durationMs;
    const tick = () => {
      if (replacedByOther) return;
      try {
        const why = takeoverReason();
        if (!why) suspect = null;
        else if (!suspect) suspect = { why, since: Date.now(), calls: pushCalls };
        else if (pushCalls > suspect.calls) {
          if (why !== "push 被换掉") {
            try {
              chainedValue = W3.TURBOPACK;
            } catch {
            }
          }
          suspect = null;
        } else if (Date.now() - suspect.since >= TAKEOVER_GRACE_MS) {
          declareTakeover(why);
          return;
        }
      } catch {
      }
      if (Date.now() < until || suspect) setTimeout(tick, 50);
    };
    tick();
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/styles.js
  var logger6 = new Logger("Styles", "#f9a8d4");
  var styles = /* @__PURE__ */ new Map();
  var container2 = null;
  var pendingDom = false;
  var useSheets = /* @__PURE__ */ (() => {
    let v3 = null;
    return () => {
      if (v3 === null) {
        try {
          v3 = getSite().styleHost !== "element" && "adoptedStyleSheets" in Document.prototype && typeof CSSStyleSheet.prototype.replaceSync === "function";
        } catch {
          v3 = false;
        }
      }
      return v3;
    };
  })();
  var ourSheets = /* @__PURE__ */ new WeakSet();
  function syncSheet(name) {
    const s3 = styles.get(name);
    const doc = document;
    if (s3) {
      if (!s3.sheet) {
        s3.sheet = new CSSStyleSheet();
        ourSheets.add(s3.sheet);
      }
      if (s3.sheetCss !== s3.css) {
        try {
          s3.sheet.replaceSync(s3.css);
        } catch (e3) {
          logger6.warn(`样式 ${name} 解析失败`, e3);
        }
        s3.sheetCss = s3.css;
      }
    }
    const others = doc.adoptedStyleSheets.filter((x4) => !ourSheets.has(x4));
    const ours = [...styles.values()].filter((x4) => x4.enabled && x4.sheet).map((x4) => x4.sheet);
    doc.adoptedStyleSheets = [...others, ...ours];
  }
  function ensureContainer() {
    if (!document.head) {
      if (!pendingDom) {
        pendingDom = true;
        const go = () => {
          pendingDom = false;
          rebuild();
        };
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go, { once: true });
        else queueMicrotask(go);
        const mo3 = new MutationObserver(() => {
          if (document.head) {
            mo3.disconnect();
            go();
          }
        });
        mo3.observe(document.documentElement || document, { childList: true, subtree: true });
      }
      return null;
    }
    if (container2 && container2.isConnected) return container2;
    container2 = document.createElement("uspp-ggpp-styles");
    container2.style.display = "none";
    document.head.appendChild(container2);
    return container2;
  }
  function rebuild() {
    const c3 = ensureContainer();
    if (!c3) return;
    for (const [name, s3] of styles) {
      if (!s3.enabled) {
        s3.el?.remove();
        continue;
      }
      if (!s3.el || s3.el.parentNode !== c3) {
        s3.el = document.createElement("style");
        s3.el.setAttribute("data-uspp-ggpp", name);
        s3.el.textContent = s3.css;
        c3.appendChild(s3.el);
      }
    }
  }
  function sync(name) {
    if (useSheets()) return syncSheet(name);
    const s3 = styles.get(name);
    if (!s3) return;
    const c3 = ensureContainer();
    if (!c3) return;
    if (!container2.isConnected) return rebuild();
    if (!s3.enabled) {
      s3.el?.remove();
      return;
    }
    if (!s3.el || s3.el.parentNode !== c3) {
      if (s3.el && s3.el.parentNode !== c3) return rebuild();
      s3.el = document.createElement("style");
      s3.el.setAttribute("data-uspp-ggpp", name);
      c3.appendChild(s3.el);
    }
    if (s3.el.textContent !== s3.css) s3.el.textContent = s3.css;
  }
  var shadows = /* @__PURE__ */ new Set();
  function syncShadows() {
    if (!shadows.size) return;
    const enabled = [...styles.entries()].filter(([, s3]) => s3.enabled);
    for (const sr of shadows) {
      if (!sr.host?.isConnected) continue;
      if (useSheets()) {
        for (const [name, s3] of enabled) if (!s3.sheet) {
          s3.sheet = new CSSStyleSheet();
          ourSheets.add(s3.sheet);
          try {
            s3.sheet.replaceSync(s3.css);
            s3.sheetCss = s3.css;
          } catch (e3) {
            logger6.warn(`样式 ${name} 解析失败`, e3);
          }
        }
        sr.adoptedStyleSheets = enabled.map(([, s3]) => s3.sheet).filter(Boolean);
      } else {
        let el = sr.querySelector("style[data-uspp-ggpp-shadow]");
        if (!el) {
          el = document.createElement("style");
          el.setAttribute("data-uspp-ggpp-shadow", "");
          sr.prepend(el);
        }
        const css = enabled.map(([, s3]) => s3.css).join("\n");
        if (el.textContent !== css) el.textContent = css;
      }
    }
  }
  function attachShadowStyles(sr) {
    shadows.add(sr);
    syncShadows();
    return () => shadows.delete(sr);
  }
  function registerStyle(name, css, enabled = true) {
    const s3 = styles.get(name);
    if (s3) {
      s3.css = css;
      if (enabled) s3.enabled = true;
    } else styles.set(name, { css, enabled, el: null });
    if (!useSheets() && container2 && !container2.isConnected) {
      container2 = null;
      rebuild();
    } else sync(name);
    syncShadows();
  }
  function enableStyle(name) {
    const s3 = styles.get(name);
    if (!s3) {
      logger6.warn(`样式 ${name} 未注册`);
      return false;
    }
    if (s3.enabled) return false;
    s3.enabled = true;
    sync(name);
    syncShadows();
    return true;
  }
  function disableStyle(name) {
    const s3 = styles.get(name);
    if (!s3 || !s3.enabled) return false;
    s3.enabled = false;
    s3.el?.remove();
    s3.el = null;
    if (useSheets()) syncSheet(name);
    syncShadows();
    return true;
  }
  function unregisterStyle(name) {
    const s3 = styles.get(name);
    if (!s3) return false;
    s3.el?.remove();
    styles.delete(name);
    if (useSheets()) syncSheet(null);
    syncShadows();
    return true;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/finders.js
  var logger7 = new Logger("Finders", "#67e8f9");
  var fnToString2 = Function.prototype.toString;
  var REACT_MEMO = Symbol.for("react.memo");
  var REACT_FORWARD_REF = Symbol.for("react.forward_ref");
  function isSkippable(v3) {
    if (v3 == null) return true;
    const t3 = typeof v3;
    if (t3 !== "object" && t3 !== "function") return true;
    try {
      if (v3 === W3 || v3 === window || v3 === W3.document || v3 === document) return true;
      if (typeof W3.Node === "function" && v3 instanceof W3.Node) return true;
      if (v3 instanceof Map || v3 instanceof Set || v3 instanceof WeakMap || v3 instanceof WeakSet) return true;
      if (W3.Map && (v3 instanceof W3.Map || v3 instanceof W3.Set || v3 instanceof W3.WeakMap || v3 instanceof W3.WeakSet)) return true;
      if (v3 instanceof ArrayBuffer || ArrayBuffer.isView(v3)) return true;
      if (W3.ArrayBuffer && (v3 instanceof W3.ArrayBuffer || W3.ArrayBuffer.isView(v3))) return true;
      if (W3.WebSocket && v3 instanceof W3.WebSocket) return true;
      if (W3.MessagePort && v3 instanceof W3.MessagePort) return true;
      if (W3.EventTarget && v3 instanceof W3.EventTarget && !(t3 === "function")) return true;
      if (W3.Promise && v3 instanceof W3.Promise) return true;
      if (t3 === "function" || t3 === "object") {
        const probe = v3["$$uspp_probe_x"];
        if (probe != null) return true;
      }
    } catch {
      return true;
    }
    return false;
  }
  function quietly(fn2) {
    const c3 = W3.console || console;
    const ow = c3.warn, oe = c3.error;
    c3.warn = () => {
    };
    c3.error = () => {
    };
    try {
      return fn2();
    } finally {
      c3.warn = ow;
      c3.error = oe;
    }
  }
  function testSafe(filter, v3) {
    try {
      return !!filter(v3);
    } catch {
      return false;
    }
  }
  var SKIP_KEYS = /* @__PURE__ */ new Set(["default"]);
  function* candidates(exports) {
    yield exports;
    if (isSkippable(exports)) return;
    let keys;
    try {
      keys = Object.keys(exports);
    } catch {
      return;
    }
    for (const k4 of keys) {
      if (k4.startsWith("__") || k4.startsWith("unstable_") || k4.startsWith("UNSAFE_")) continue;
      let v3;
      try {
        v3 = exports[k4];
      } catch {
        continue;
      }
      if (v3 == null || SKIP_KEYS.has(k4) && v3 === exports) continue;
      yield v3;
    }
  }
  function scan(filter, { all = false, start = 0 } = {}) {
    const found = [];
    const seen = /* @__PURE__ */ new Set();
    let i3 = 0, hit = null;
    for (const exports of moduleCache.values()) {
      if (i3++ < start) continue;
      for (const v3 of candidates(exports)) {
        if (v3 == null || typeof v3 !== "object" && typeof v3 !== "function") continue;
        if (seen.has(v3)) continue;
        if (v3 !== exports && isSkippable(v3)) continue;
        if (testSafe(filter, v3)) {
          if (!all) {
            hit = v3;
            return { hit, end: i3 };
          }
          seen.add(v3);
          found.push(v3);
        }
      }
    }
    return { hit: all ? found : null, end: i3 };
  }
  function find(filter, { all = false } = {}) {
    if (typeof filter !== "function") throw new TypeError("filter 必须是函数");
    return quietly(() => {
      syncRuntimeCache();
      return scan(filter, { all }).hit;
    });
  }
  var findAll = (filter) => find(filter, { all: true });
  var codeCache = /* @__PURE__ */ new WeakMap();
  var codeOf = (f3) => {
    let c3 = codeCache.get(f3);
    if (c3 === void 0) {
      try {
        c3 = fnToString2.call(f3);
      } catch {
        c3 = "";
      }
      codeCache.set(f3, c3);
    }
    return c3;
  };
  var toPatterns = (ps) => ps.map(canonicalizeRegex);
  var isZustandStore = (v3) => typeof v3 === "function" && typeof v3.getState === "function" && typeof v3.subscribe === "function" && typeof v3.setState === "function";
  var storeKey = (name) => "use" + (name.startsWith("use") ? name.slice(3) : name).replace(/Store$/, "") + "Store";
  var filters = {
    byProps: (...keys) => (v3) => keys.every((k4) => v3[k4] != null),
    byCode: (...patterns) => {
      const ps = toPatterns(patterns);
      return (v3) => typeof v3 === "function" && ps.every((p3) => matchesOne(codeOf(v3), p3));
    },
    byDisplayName: (name) => (v3) => v3.displayName === name || v3.render?.displayName === name || v3.type?.displayName === name,
    // CSS 模块:导出对象的值是混淆后的类名字符串,每个类名都能在某个值里找到
    byClassName: (...classes2) => {
      const res = classes2.map((c3) => new RegExp(`(?:\\b|_)${escapeRegExp(c3)}(?:\\b|_)`));
      return (v3) => {
        if (!v3 || typeof v3 !== "object") return false;
        const vals = Object.values(v3);
        return vals.length > 0 && vals.every((x4) => typeof x4 === "string") && res.every((re) => vals.some((x4) => re.test(x4)));
      };
    },
    byStoreName: (name) => {
      const key = storeKey(name);
      return (v3) => isZustandStore(v3[key]);
    },
    componentByCode: (...patterns) => {
      const ps = toPatterns(patterns);
      const check2 = (f3) => typeof f3 === "function" && ps.every((p3) => matchesOne(codeOf(f3), p3));
      return (v3) => {
        if (check2(v3)) return true;
        if (v3.$$typeof === REACT_MEMO) return check2(v3.type) || check2(v3.type?.render);
        if (v3.$$typeof === REACT_FORWARD_REF) return check2(v3.render);
        return false;
      };
    }
  };
  var findByProps = (...keys) => find(filters.byProps(...keys));
  var findByCode = (...ps) => find(filters.byCode(...ps));
  var findByDisplayName = (name) => find(filters.byDisplayName(name));
  var findComponentByCode = (...ps) => find(filters.componentByCode(...ps));
  function findExportedComponent(...names) {
    const m3 = find(exportedComponentFilter(names));
    return m3 ? pickExported(names)(m3) : null;
  }
  function findStore(name) {
    const key = storeKey(name);
    const m3 = find((v3) => isZustandStore(v3[key]));
    return m3 ? m3[key] : null;
  }
  function mapMangledCssClasses(mod, classes2) {
    const out = {};
    if (!mod) return out;
    for (const name of classes2) {
      const re = new RegExp(`(?:\\b|_)${escapeRegExp(name)}(?:\\b|_)`);
      for (const k4 of Object.keys(mod)) {
        const v3 = mod[k4];
        if (typeof v3 === "string" && re.test(v3)) {
          out[name] = v3;
          break;
        }
      }
      if (!(name in out)) logger7.debug(`mapMangledCssClasses:模块里没有类名 ${name}`);
    }
    return out;
  }
  function findCssClasses(...classes2) {
    const mod = find(filters.byClassName(...classes2));
    return mod ? mapMangledCssClasses(mod, classes2) : {};
  }
  function findBulk(...filterFns) {
    const results = new Array(filterFns.length).fill(null);
    let left = filterFns.length;
    if (!left) return results;
    quietly(() => {
      syncRuntimeCache();
      outer: for (const exports of moduleCache.values()) {
        for (const v3 of candidates(exports)) {
          if (v3 == null || typeof v3 !== "object" && typeof v3 !== "function") continue;
          if (v3 !== exports && isSkippable(v3)) continue;
          for (let i3 = 0; i3 < filterFns.length; i3++) {
            if (results[i3] === null && testSafe(filterFns[i3], v3)) {
              results[i3] = v3;
              if (--left === 0) break outer;
            }
          }
        }
      }
    });
    if (left) logger7.debug(`findBulk:${filterFns.length} 个过滤器只找到 ${filterFns.length - left} 个`);
    return results;
  }
  function incremental(filter, pick = (v3) => v3) {
    let cursor = 0, reset = -1, last2 = -1;
    return () => {
      const v3 = getCacheVersion();
      if (v3 === last2) return null;
      last2 = v3;
      const r3 = getResetVersion();
      if (r3 !== reset) {
        reset = r3;
        cursor = 0;
      }
      return quietly(() => {
        syncRuntimeCache();
        const res = scan(filter, { start: cursor });
        cursor = res.hit ? res.end - 1 : res.end;
        return res.hit ? pick(res.hit) : null;
      });
    };
  }
  var lazyFind = (filter, pick) => proxyLazy(incremental(filter, pick));
  function lazyComponent(resolveFn, label) {
    let cached = null;
    const get = () => {
      if (cached) return cached;
      cached = resolveFn() ?? null;
      return cached;
    };
    const Lazy = (props) => {
      const C4 = get();
      if (!C4) return null;
      const React = getReact2();
      return React ? React.createElement(C4, props) : null;
    };
    Lazy.displayName = `UsppLazy(${label})`;
    Lazy.$$uspp_ggpp_Resolve = get;
    return Lazy;
  }
  var exportedComponentFilter = (names) => (v3) => names.some((n2) => v3[n2] != null && (typeof v3[n2] === "function" || typeof v3[n2] === "object"));
  var pickExported = (names) => (m3) => {
    for (const n2 of names) if (m3[n2] != null) return m3[n2];
    return null;
  };
  var findLazy = (filter) => lazyFind(filter);
  var findByPropsLazy = (...keys) => lazyFind(filters.byProps(...keys));
  var findByCodeLazy = (...ps) => lazyFind(filters.byCode(...ps));
  var findByDisplayNameLazy = (name) => lazyComponent(incremental(filters.byDisplayName(name)), name);
  var findComponentByCodeLazy = (...ps) => lazyComponent(incremental(filters.componentByCode(...ps)), String(ps[0]));
  var findExportedComponentLazy = (...names) => lazyComponent(incremental(exportedComponentFilter(names), pickExported(names)), names[0]);
  var findStoreLazy = (name) => {
    const key = storeKey(name);
    return lazyFind((v3) => isZustandStore(v3[key]), (m3) => m3[key]);
  };
  var findCssClassesLazy = (...classes2) => lazyFind(filters.byClassName(...classes2), (m3) => {
    const r3 = mapMangledCssClasses(m3, classes2);
    return Object.keys(r3).length ? r3 : null;
  });
  var retryOnChange = () => {
    let last2 = -1;
    return () => {
      const v3 = getCacheVersion();
      if (v3 === last2) return false;
      last2 = v3;
      return true;
    };
  };
  var mapMangledModuleLazy = (patterns, mappers) => proxyLazy(() => {
    const r3 = mapMangledModule(patterns, mappers);
    return Object.keys(r3).length ? r3 : null;
  }, retryOnChange());
  function srcMatcher(patterns) {
    const ps = toPatterns(patterns);
    return (src) => ps.every((p3) => matchesOne(src, p3));
  }
  function findModuleFactory(...patterns) {
    const hit = findInRegistry(srcMatcher(patterns))[0];
    return hit ?? null;
  }
  function findModuleId(...patterns) {
    const hit = findModuleFactory(...patterns);
    return hit ? hit[0] : null;
  }
  function search(...patterns) {
    const out = {};
    for (const [id, f3] of findInRegistry(srcMatcher(patterns))) out[id] = f3;
    return out;
  }
  function requireModule(id) {
    if (moduleCache.has(id)) return moduleCache.get(id);
    if (moduleCache.has(+id)) return moduleCache.get(+id);
    try {
      const c3 = runtime.cache;
      if (c3 && c3[id] && !c3[id].error) return c3[id].exports;
      if (runtime.ctx && typeof runtime.ctx.r === "function") return runtime.ctx.r(isNaN(+id) ? id : +id);
      if (typeof runtime.require === "function" && runtime.registry && Object.prototype.hasOwnProperty.call(runtime.registry, id)) return runtime.require(isNaN(+id) ? id : +id);
    } catch (e3) {
      logger7.debug(`加载模块 ${id} 失败`, e3);
    }
    return null;
  }
  function mapMangledModule(patterns, mappers) {
    const out = {};
    const id = findModuleId(...Array.isArray(patterns) ? patterns : [patterns]);
    if (id == null) return out;
    const exports = requireModule(id);
    if (!exports) return out;
    quietly(() => {
      for (const k4 of Object.keys(exports)) {
        let v3;
        try {
          v3 = exports[k4];
        } catch {
          continue;
        }
        if (v3 == null) continue;
        for (const [name, filter] of Object.entries(mappers)) {
          if (out[name] === void 0 && testSafe(filter, v3)) out[name] = v3;
        }
      }
    });
    return out;
  }
  var IDENT2 = "[A-Za-z_$][\\w$]*";
  var DefaultChunkLoadRegex = new RegExp(`Promise\\.all\\(\\[([^\\]]*)\\]\\.map\\(\\(?${IDENT2}\\)?=>${IDENT2}\\.[lL]\\(${IDENT2}\\)\\)\\)\\.then\\(\\(\\)=>${IDENT2}\\((\\d+|"[^"]+")\\)\\)`);
  var WebpackChunkLoadRegex = new RegExp(`((?:Promise\\.all\\(\\[(?:${IDENT2}\\.e\\((?:\\d+|"[^"]+")\\),?)+\\]\\))|${IDENT2}\\.e\\((?:\\d+|"[^"]+")\\))\\.then\\(${IDENT2}\\.bind\\(${IDENT2},(\\d+|"[^"]+")\\)\\)`);
  var WEBPACK_CHUNK_ID = /\.e\((\d+|"[^"]+")\)/g;
  var isWebpack = () => typeof runtime.require === "function";
  var CHUNK_IN_LIST = /["'`]((?:\/?_next\/)?static\/chunks\/[^"'`]+?\.js)["'`]/g;
  var chunkPrefix = "/_next/";
  function setChunkPrefix(chunkPath) {
    if (typeof chunkPath === "string" && chunkPath) chunkPrefix = chunkPath.replace(/static\/chunks\/?$/, "") || "/";
  }
  var loadingChunks = /* @__PURE__ */ new Map();
  function loadChunk(path) {
    if (isWebpack()) {
      const e3 = runtime.require.e;
      if (typeof e3 !== "function") return Promise.reject(new Error("webpack 运行时没有分块加载函数(__webpack_require__.e)"));
      const key = String(path);
      if (!loadingChunks.has(key)) loadingChunks.set(key, Promise.resolve(e3(/^\d+$/.test(key) ? +key : key)).then(() => true, (err) => {
        loadingChunks.delete(key);
        throw err;
      }));
      return loadingChunks.get(key);
    }
    const p3 = String(path).replace(/^\/?_next\//, "");
    if (chunkPaths.has(p3) || [...chunkPaths].some((x4) => String(x4).endsWith(p3))) return Promise.resolve(true);
    if (loadingChunks.has(p3)) return loadingChunks.get(p3);
    const ctx = runtime.ctx;
    let promise;
    if (ctx && typeof ctx.l === "function") promise = Promise.resolve(ctx.l(p3)).then(() => true);
    else {
      promise = new Promise((resolve, reject) => {
        const el = document.createElement("script");
        el.src = new URL(chunkPrefix + p3, location.origin).href;
        el.async = true;
        el.onload = () => {
          el.remove();
          resolve(true);
        };
        el.onerror = () => {
          el.remove();
          reject(new Error(`加载分块失败:${p3}`));
        };
        (document.head || document.documentElement).appendChild(el);
      });
    }
    promise = promise.catch((e3) => {
      loadingChunks.delete(p3);
      throw e3;
    });
    loadingChunks.set(p3, promise);
    return promise;
  }
  var sleep6 = (ms) => new Promise((r3) => setTimeout(r3, ms));
  async function waitRegistered(id, ms = 5e3) {
    const inObject = () => {
      const r3 = runtime.registry;
      return !!r3 && !(r3 instanceof Map) && typeof r3.has !== "function" && Object.prototype.hasOwnProperty.call(r3, id);
    };
    const has = () => !!(inObject() || runtime.registry?.has?.(id) || runtime.registry?.has?.(String(id)) || moduleCache.has(id) || findInRegistry((_3, x4) => x4 == id).length);
    for (let t3 = 0; !has() && t3 < ms; t3 += 50) await sleep6(50);
    return has();
  }
  async function extractAndLoadChunks(code, matcher) {
    matcher ??= isWebpack() ? WebpackChunkLoadRegex : DefaultChunkLoadRegex;
    const patterns = Array.isArray(code) ? code : [code];
    const hit = findInRegistry(srcMatcher(patterns))[0];
    if (!hit) {
      logger7.warn("extractAndLoadChunks:没有找到匹配的模块", patterns.map(String));
      return false;
    }
    let src = "";
    try {
      src = String(hit[1].toString());
    } catch {
    }
    const re = matcher instanceof RegExp ? new RegExp(matcher.source, matcher.flags.replace("g", "")) : canonicalizeRegex(matcher);
    const m3 = re.exec(src);
    if (!m3) {
      logger7.warn("extractAndLoadChunks:模块里没有加载分块的写法", patterns.map(String));
      return false;
    }
    const paths = isWebpack() ? [...String(m3[1] || "").matchAll(WEBPACK_CHUNK_ID)].map((x4) => x4[1].replace(/^"|"$/g, "")) : [...String(m3[1] || "").matchAll(CHUNK_IN_LIST)].map((x4) => x4[1]);
    try {
      await Promise.all(paths.map(loadChunk));
    } catch (e3) {
      logger7.warn("extractAndLoadChunks:加载分块失败", e3);
      return false;
    }
    if (m3[2] == null) return true;
    const id = /^\d+$/.test(m3[2]) ? +m3[2] : m3[2].replace(/^"|"$/g, "");
    if (!await waitRegistered(id)) {
      logger7.warn(`extractAndLoadChunks:入口模块 ${id} 没有注册`);
      return false;
    }
    const exports = requireModule(id);
    if (exports == null) {
      logger7.warn(`extractAndLoadChunks:入口模块 ${id} 执行失败`);
      return false;
    }
    rescanRuntimeCache();
    return true;
  }
  function extractAndLoadChunksLazy(code, matcher) {
    let cache = null;
    return () => {
      if (cache) return cache;
      cache = extractAndLoadChunks(code, matcher).then((ok) => {
        if (!ok) cache = null;
        return ok;
      }, (e3) => {
        cache = null;
        throw e3;
      });
      return cache;
    };
  }
  async function importModule(id) {
    const now2 = requireModule(id);
    if (now2 != null) return now2;
    const ctx = runtime.ctx;
    if (ctx && typeof ctx.A === "function") return ctx.A(id);
    if (await waitRegistered(id, 3e3)) return requireModule(id);
    throw new Error(`importModule:模块 ${id} 不可用`);
  }
  function waitFor2(filter, callback, timeoutMs) {
    const existing = find(filter);
    if (existing) {
      try {
        callback(existing);
      } catch (e3) {
        logger7.error("waitFor 回调出错", e3);
      }
      return () => {
      };
    }
    let timer2;
    const unsub = onModuleLoad((exports) => {
      let hit = null;
      quietly(() => {
        for (const v3 of candidates(exports)) {
          if (v3 == null || typeof v3 !== "object" && typeof v3 !== "function") continue;
          if (v3 !== exports && isSkippable(v3)) continue;
          if (testSafe(filter, v3)) {
            hit = v3;
            break;
          }
        }
      });
      if (hit) {
        cancel();
        try {
          callback(hit);
        } catch (e3) {
          logger7.error("waitFor 回调出错", e3);
        }
      }
    });
    const cancel = () => {
      unsub();
      clearTimeout(timer2);
    };
    if (timeoutMs) timer2 = setTimeout(() => {
      unsub();
      logger7.warn(`waitFor 超时(${timeoutMs} ms)`, filter);
    }, timeoutMs);
    return cancel;
  }
  function getAllStores() {
    const out = /* @__PURE__ */ new Map();
    quietly(() => {
      syncRuntimeCache();
      for (const exports of moduleCache.values()) {
        if (isSkippable(exports)) continue;
        let keys;
        try {
          keys = Object.keys(exports);
        } catch {
          continue;
        }
        for (const k4 of keys) {
          if (!k4.startsWith("use") || out.has(k4)) continue;
          let v3;
          try {
            v3 = exports[k4];
          } catch {
            continue;
          }
          if (isZustandStore(v3)) out.set(k4, v3);
        }
      }
    });
    return out;
  }
  var reactCache = null;
  function getReact2() {
    if (reactCache) return reactCache;
    reactCache = find((v3) => typeof v3.createElement === "function" && typeof v3.useState === "function" && typeof v3.Component === "function" && typeof v3.Fragment !== "undefined" && v3.version != null) || null;
    return reactCache;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/dom.js
  var logger8 = new Logger("DOM", "#a7f3d0");
  var subs = /* @__PURE__ */ new Set();
  var mo = null;
  var pendingAdded = /* @__PURE__ */ new Set();
  var pendingRemoved = /* @__PURE__ */ new Set();
  var scheduled = false;
  var selfNodes = /* @__PURE__ */ new WeakSet();
  var selfWrites = /* @__PURE__ */ new WeakMap();
  var raf = (cb) => typeof requestAnimationFrame === "function" ? requestAnimationFrame(cb) : setTimeout(cb, 16);
  function isSelfRecord(r3) {
    if (r3.type === "childList") {
      const nodes = [...r3.addedNodes, ...r3.removedNodes];
      return nodes.length > 0 && nodes.every((n2) => selfNodes.has(n2));
    }
    const set = selfWrites.get(r3.target);
    if (!set) return false;
    if (r3.type === "attributes") return set.has(r3.attributeName);
    return set.has("#text");
  }
  function collect(records2) {
    for (const r3 of records2) {
      if (isSelfRecord(r3)) continue;
      if (r3.type !== "childList") continue;
      for (const n2 of r3.addedNodes) if (n2.nodeType === 1) pendingAdded.add(n2);
      for (const n2 of r3.removedNodes) if (n2.nodeType === 1) pendingRemoved.add(n2);
    }
    if ((pendingAdded.size || pendingRemoved.size) && !scheduled) {
      scheduled = true;
      raf(flush);
    }
  }
  function matchesIn(node, selector) {
    const out = [];
    try {
      if (node.matches?.(selector)) out.push(node);
      if (node.querySelectorAll) out.push(...node.querySelectorAll(selector));
    } catch {
    }
    return out;
  }
  function flush() {
    scheduled = false;
    const added = [...pendingAdded].filter((n2) => n2.isConnected), removed = [...pendingRemoved].filter((n2) => !n2.isConnected);
    pendingAdded = /* @__PURE__ */ new Set();
    pendingRemoved = /* @__PURE__ */ new Set();
    for (const s3 of [...subs]) {
      if (s3.added) {
        const hits = /* @__PURE__ */ new Set();
        for (const n2 of added) for (const m3 of matchesIn(n2, s3.selector)) if (!s3.root || s3.root.contains(m3)) hits.add(m3);
        for (const el of hits) {
          try {
            s3.added(el);
          } catch (e3) {
            logger8.error("observe 回调出错", e3);
          }
        }
      }
      if (s3.removed) {
        const hits = /* @__PURE__ */ new Set();
        for (const n2 of removed) for (const m3 of matchesIn(n2, s3.selector)) hits.add(m3);
        for (const el of hits) {
          try {
            s3.removed(el);
          } catch (e3) {
            logger8.error("observe 回调出错", e3);
          }
        }
      }
    }
  }
  function ensureObserver() {
    if (mo) return;
    const target2 = document.documentElement || document;
    mo = new MutationObserver(collect);
    mo.observe(target2, { childList: true, subtree: true });
  }
  function observe(selector, { added, removed, root: root2 } = {}) {
    const s3 = { selector, added, removed, root: root2 };
    subs.add(s3);
    ensureObserver();
    if (added) raf(() => {
      if (!subs.has(s3)) return;
      for (const el of matchesIn(root2 || document, selector)) {
        try {
          added(el);
        } catch (e3) {
          logger8.error("observe 回调出错", e3);
        }
      }
    });
    return () => subs.delete(s3);
  }
  function waitForElement(selector, { root: root2, timeout = 0 } = {}) {
    const now2 = (root2 || document).querySelector?.(selector);
    if (now2) return Promise.resolve(now2);
    return new Promise((resolve) => {
      let timer2 = 0;
      const off = observe(selector, { root: root2, added: (el) => {
        off();
        clearTimeout(timer2);
        resolve(el);
      } });
      if (timeout > 0) timer2 = setTimeout(() => {
        off();
        resolve(null);
      }, timeout);
    });
  }
  function markWrite(el, key) {
    let set = selfWrites.get(el);
    if (!set) selfWrites.set(el, set = /* @__PURE__ */ new Set());
    set.add(key);
    if (mo) collect(mo.takeRecords());
  }
  function setAttr(el, name, value) {
    if (!el) return false;
    if (value == null || value === false) {
      if (!el.hasAttribute(name)) return false;
      el.removeAttribute(name);
    } else {
      const v3 = value === true ? "" : String(value);
      if (el.getAttribute(name) === v3) return false;
      el.setAttribute(name, v3);
    }
    markWrite(el, name);
    return true;
  }
  function setText(el, text) {
    if (!el) return false;
    const v3 = String(text ?? "");
    if (el.textContent === v3) return false;
    el.textContent = v3;
    markWrite(el, "#text");
    for (const n2 of el.childNodes) selfNodes.add(n2);
    return true;
  }
  function toggleClass(el, name, force) {
    if (!el) return false;
    const has = el.classList.contains(name);
    const want = force === void 0 ? !has : !!force;
    if (has === want) return false;
    el.classList.toggle(name, want);
    markWrite(el, "class");
    return true;
  }
  function setStyle(el, prop, value) {
    if (!el) return false;
    const v3 = value == null ? "" : String(value);
    if (el.style.getPropertyValue(prop) === v3) return false;
    if (v3) el.style.setProperty(prop, v3);
    else el.style.removeProperty(prop);
    markWrite(el, "style");
    return true;
  }
  function mount(parent, node, before = null) {
    if (!parent || !node) return node;
    selfNodes.add(node);
    if (node.parentNode === parent && (before == null ? node === parent.lastChild || node.nextSibling == null : node.nextSibling === before)) return node;
    parent.insertBefore(node, before);
    if (mo) collect(mo.takeRecords());
    return node;
  }
  function unmount(node) {
    if (!node?.parentNode) return;
    selfNodes.add(node);
    node.remove();
    if (mo) collect(mo.takeRecords());
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/route.js
  var installed2 = false;
  var last = null;
  var parser = null;
  function setRouteParser(fn2) {
    parser = typeof fn2 === "function" ? fn2 : null;
  }
  function check() {
    const url = location.href;
    if (url === last) return;
    const prev = last;
    last = url;
    let info;
    if (parser) {
      try {
        info = parser(new URL(url));
      } catch {
        info = void 0;
      }
    }
    dispatch(Events.ROUTE_CHANGE, { url, previous: prev, info });
  }
  function installRouteWatcher() {
    if (installed2) return;
    installed2 = true;
    last = location.href;
    const H3 = W3.history;
    for (const name of ["pushState", "replaceState"]) {
      const orig = H3[name];
      if (typeof orig !== "function") continue;
      const wrapped2 = function(...args) {
        const r3 = orig.apply(this, args);
        try {
          check();
        } catch {
        }
        return r3;
      };
      try {
        H3[name] = wrapped2;
      } catch {
      }
    }
    W3.addEventListener("popstate", check);
    W3.addEventListener("hashchange", check);
  }
  function onRouteChange(fn2) {
    installRouteWatcher();
    return subscribe(Events.ROUTE_CHANGE, fn2);
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/network.js
  var logger9 = new Logger("Network", "#c4b5fd");
  var reqSubs = /* @__PURE__ */ new Set();
  var resSubs = /* @__PURE__ */ new Set();
  var reqRw = /* @__PURE__ */ new Set();
  var resRw = /* @__PURE__ */ new Set();
  var wsSubs = /* @__PURE__ */ new Set();
  var esSubs = /* @__PURE__ */ new Set();
  var installed3 = false;
  var wsInstalled = false;
  var esInstalled = false;
  var test = (matcher, url, method) => {
    try {
      if (!matcher) return true;
      if (typeof matcher === "string") return url.includes(matcher);
      if (matcher instanceof RegExp) {
        matcher.lastIndex = 0;
        return matcher.test(url);
      }
      if (typeof matcher === "function") return !!matcher(url, method);
    } catch {
    }
    return false;
  };
  var call = (fn2, ctx) => {
    try {
      const r3 = fn2(ctx);
      r3?.catch?.((e3) => logger9.error("网络回调出错", e3));
    } catch (e3) {
      logger9.error("网络回调出错", e3);
    }
  };
  var isResponse = (r3) => !!r3 && typeof r3 === "object" && typeof r3.clone === "function" && typeof r3.text === "function" && "status" in r3;
  var absUrl = (u3) => {
    try {
      return new URL(u3, location.href).href;
    } catch {
      return String(u3);
    }
  };
  function makeResponse(body, init = {}) {
    const R3 = W3.Response || Response;
    if (body != null && typeof body === "object" && !(body instanceof ArrayBuffer) && !ArrayBuffer.isView(body) && !(typeof Blob !== "undefined" && body instanceof Blob) && typeof body.getReader !== "function") {
      const headers = new (W3.Headers || Headers)(init.headers || {});
      if (!headers.has("content-type")) headers.set("content-type", "application/json");
      return new R3(JSON.stringify(body), { status: 200, ...init, headers });
    }
    return new R3(body, { status: 200, ...init });
  }
  async function readChunks(res, onChunk) {
    const reader = res.body?.getReader?.();
    if (!reader) {
      onChunk(await res.text(), true);
      return;
    }
    const dec = new TextDecoder();
    for (; ; ) {
      const { value, done } = await reader.read();
      if (done) {
        onChunk("", true);
        break;
      }
      onChunk(dec.decode(value, { stream: true }), false);
    }
  }
  var resCtx = (res, url, method) => ({
    url,
    method,
    status: res.status,
    headers: res.headers,
    type: "fetch",
    clone: () => res.clone(),
    text: () => res.clone().text(),
    json: () => res.clone().json(),
    onChunk: (cb) => readChunks(res.clone(), cb)
  });
  var bodyText = (b3) => typeof b3 === "string" ? b3 : null;
  function wrapFetch() {
    const orig = W3.fetch;
    if (typeof orig !== "function") return;
    const fireRead = (res, url, method) => {
      for (const s3 of resSubs) if (test(s3.matcher, url, method)) call(s3.handler, resCtx(res, url, method));
    };
    const wrapped2 = function(input, init) {
      let url = "", method = "GET";
      try {
        url = typeof input === "string" ? input : input?.url ?? String(input);
        method = (init?.method || input?.method || "GET").toUpperCase();
      } catch {
      }
      for (const s3 of reqSubs) if (test(s3.matcher, url, method)) call(s3.handler, { url, method, init, input, type: "fetch" });
      const rq = [...reqRw].filter((s3) => test(s3.matcher, url, method));
      const rs = [...resRw].filter((s3) => test(s3.matcher, url, method));
      const self = this;
      if (!rq.length && !rs.length) {
        const p3 = orig.apply(self, arguments);
        if (resSubs.size) p3.then((res) => fireRead(res, url, method), () => {
        });
        return p3;
      }
      return (async () => {
        let curInput = input, curInit = init, curUrl = url, early = null;
        for (const s3 of rq) {
          const ctx = {
            url: curUrl,
            method,
            init: curInit,
            input: curInput,
            type: "fetch",
            body: bodyText(curInit?.body),
            json: () => JSON.parse(bodyText(curInit?.body) ?? "null"),
            respond: makeResponse
          };
          let r3;
          try {
            r3 = await s3.handler(ctx);
          } catch (e3) {
            logger9.error("请求改写出错,跳过", e3);
            continue;
          }
          if (!r3) continue;
          if (isResponse(r3)) {
            early = r3;
            break;
          }
          if (r3.block) throw new TypeError("Failed to fetch");
          if (r3.url != null && String(r3.url) !== curUrl) {
            curUrl = String(r3.url);
            curInput = typeof curInput === "string" || curInput instanceof URL || !curInput?.url ? curUrl : new (W3.Request || Request)(curUrl, curInput);
          }
          if (r3.body !== void 0) curInit = { ...curInit || {}, body: typeof r3.body === "string" ? r3.body : JSON.stringify(r3.body) };
          if (r3.init) curInit = { ...curInit || {}, ...r3.init };
        }
        let res = early ?? await orig.call(self, curInput, curInit);
        for (const s3 of rs) {
          let r3;
          try {
            r3 = await s3.handler({ ...resCtx(res, curUrl, method), respond: makeResponse });
          } catch (e3) {
            logger9.error("响应改写出错,跳过", e3);
            continue;
          }
          if (isResponse(r3)) res = r3;
        }
        if (resSubs.size) fireRead(res, curUrl, method);
        return res;
      })();
    };
    try {
      W3.fetch = wrapped2;
    } catch (e3) {
      logger9.warn("无法包装 fetch", e3);
    }
  }
  function wrapXhr() {
    const X3 = W3.XMLHttpRequest;
    if (!X3?.prototype) return;
    const open = X3.prototype.open, send = X3.prototype.send;
    X3.prototype.open = function(method, url, ...rest) {
      const info = { method: String(method || "GET").toUpperCase(), url: String(url), blocked: false };
      for (const s3 of reqRw) {
        if (!test(s3.matcher, info.url, info.method)) continue;
        let r3;
        try {
          r3 = s3.handler({ url: info.url, method: info.method, type: "xhr", phase: "open", respond: makeResponse });
        } catch (e3) {
          logger9.error("请求改写出错,跳过", e3);
          continue;
        }
        if (r3?.then) {
          logger9.warn("XHR 请求的改写函数必须同步返回,已忽略");
          continue;
        }
        if (r3?.block) info.blocked = true;
        else if (r3?.url != null) info.url = String(r3.url);
      }
      this.__uspp_ggpp_Req = info;
      return open.call(this, method, info.url, ...rest);
    };
    X3.prototype.send = function(body) {
      const info = this.__uspp_ggpp_Req;
      if (info) {
        if (info.blocked) {
          const xhr = this;
          setTimeout(() => {
            try {
              xhr.abort();
            } catch {
            }
            try {
              xhr.dispatchEvent(new (W3.ProgressEvent || Event)("error"));
              xhr.dispatchEvent(new (W3.ProgressEvent || Event)("loadend"));
            } catch {
            }
          }, 0);
          return void 0;
        }
        for (const s3 of reqRw) {
          if (!test(s3.matcher, info.url, info.method) || typeof body !== "string") continue;
          let r3;
          try {
            r3 = s3.handler({ url: info.url, method: info.method, type: "xhr", phase: "send", body, json: () => JSON.parse(body), respond: makeResponse });
          } catch (e3) {
            logger9.error("请求改写出错,跳过", e3);
            continue;
          }
          if (r3?.then) continue;
          if (r3?.body !== void 0) body = typeof r3.body === "string" ? r3.body : JSON.stringify(r3.body);
        }
        for (const s3 of reqSubs) if (test(s3.matcher, info.url, info.method)) call(s3.handler, { ...info, body, type: "xhr" });
        const rs = [...resRw].filter((s3) => test(s3.matcher, info.url, info.method));
        if (rs.length) installXhrRewrite(this, info, rs);
        if (resSubs.size) this.addEventListener("load", () => {
          for (const s3 of resSubs) if (test(s3.matcher, info.url, info.method)) {
            const rt = this.responseType;
            const text = () => Promise.resolve(rt === "" || rt === "text" ? this.responseText : rt === "json" ? JSON.stringify(this.response) : "");
            const json = () => rt === "json" ? Promise.resolve(this.response) : text().then(JSON.parse);
            call(s3.handler, { ...info, status: this.status, type: "xhr", text, json, clone: () => null, onChunk: (cb) => text().then((t3) => cb(t3, true)) });
          }
        });
      }
      return send.call(this, body);
    };
  }
  function installXhrRewrite(xhr, info, subs2) {
    const proto = Object.getPrototypeOf(xhr);
    const getText = Object.getOwnPropertyDescriptor(W3.XMLHttpRequest.prototype, "responseText")?.get;
    const getResp = Object.getOwnPropertyDescriptor(W3.XMLHttpRequest.prototype, "response")?.get;
    if (!getText || !getResp) return;
    let computed = null;
    const compute = () => {
      if (computed) return computed;
      if (xhr.readyState !== 4) return null;
      const rt = xhr.responseType;
      if (rt !== "" && rt !== "text" && rt !== "json") return null;
      let text = rt === "json" ? JSON.stringify(getResp.call(xhr)) : getText.call(xhr);
      for (const s3 of subs2) {
        let r3;
        try {
          r3 = s3.handler({ ...info, status: xhr.status, type: "xhr", text: () => text, json: () => JSON.parse(text) });
        } catch (e3) {
          logger9.error("响应改写出错,跳过", e3);
          continue;
        }
        if (r3?.then) {
          logger9.warn("XHR 响应的改写函数必须同步返回,已忽略");
          continue;
        }
        if (r3 === void 0 || r3 === null) continue;
        text = typeof r3 === "string" ? r3 : JSON.stringify(r3);
      }
      return computed = { text, rt };
    };
    try {
      Object.defineProperty(xhr, "responseText", { configurable: true, get() {
        const c3 = compute();
        return c3 && c3.rt !== "json" ? c3.text : getText.call(this);
      } });
      Object.defineProperty(xhr, "response", { configurable: true, get() {
        const c3 = compute();
        if (!c3) return getResp.call(this);
        try {
          return c3.rt === "json" ? JSON.parse(c3.text) : c3.text;
        } catch {
          return null;
        }
      } });
    } catch (e3) {
      logger9.debug("无法改写 XHR 响应", e3, proto);
    }
  }
  function installNetworkHooks() {
    if (installed3) return;
    installed3 = true;
    wrapFetch();
    wrapXhr();
  }
  var addSub = (set, matcher, handler) => {
    installNetworkHooks();
    const s3 = { matcher, handler };
    set.add(s3);
    return () => set.delete(s3);
  };
  var onRequest = (matcher, handler) => addSub(reqSubs, matcher, handler);
  var onResponse = (matcher, handler) => addSub(resSubs, matcher, handler);
  var rewriteRequest = (matcher, handler) => addSub(reqRw, matcher, handler);
  var rewriteResponse = (matcher, handler) => addSub(resRw, matcher, handler);
  var liveSubs = (set, url, kind, hook2) => {
    const out = [];
    for (const s3 of set) if (s3.hooks[hook2] && test(s3.matcher, url, kind)) out.push(s3);
    return out;
  };
  function hookMessages(target2, url, subsSet, kind) {
    target2.addEventListener("message", (e3) => {
      let data = e3.data, changed = false;
      for (const s3 of liveSubs(subsSet, url, kind, "message")) {
        if (!s3.hooks.message) continue;
        let r3;
        try {
          r3 = s3.hooks.message(data, target2);
        } catch (err) {
          logger9.error(`${kind} 消息处理出错`, err);
          continue;
        }
        if (r3 === false) {
          e3.stopImmediatePropagation();
          return;
        }
        if (r3 !== void 0) {
          data = r3;
          changed = true;
        }
      }
      if (changed) {
        try {
          Object.defineProperty(e3, "data", { value: data, configurable: true });
        } catch {
        }
      }
    });
  }
  function wrapConstructor(name, subsSet, onCreate) {
    const Orig = W3[name];
    if (typeof Orig !== "function") return false;
    const P4 = new Proxy(Orig, {
      construct(target2, args, newTarget) {
        const obj = Reflect.construct(target2, args, newTarget === P4 ? target2 : newTarget);
        try {
          onCreate(obj, absUrl(args[0]));
        } catch (e3) {
          logger9.error(`${name} 包装出错`, e3);
        }
        return obj;
      }
    });
    try {
      W3[name] = P4;
      return true;
    } catch (e3) {
      logger9.warn(`无法包装 ${name}`, e3);
      return false;
    }
  }
  function onWebSocket(matcher, hooks2 = {}) {
    if (!wsInstalled) {
      wsInstalled = true;
      wrapConstructor("WebSocket", wsSubs, (ws, url) => {
        hookMessages(ws, url, wsSubs, "WebSocket");
        const send = ws.send;
        Object.defineProperty(ws, "send", {
          configurable: true,
          writable: true,
          value: function(data) {
            for (const s4 of liveSubs(wsSubs, url, "WebSocket", "send")) {
              let r3;
              try {
                r3 = s4.hooks.send(data, ws);
              } catch (e3) {
                logger9.error("WebSocket 发送处理出错", e3);
                continue;
              }
              if (r3 === false) return void 0;
              if (r3 !== void 0) data = r3;
            }
            return send.call(this, data);
          }
        });
        for (const s4 of liveSubs(wsSubs, url, "WebSocket", "open")) {
          try {
            s4.hooks.open(ws, url);
          } catch (e3) {
            logger9.error("WebSocket open 处理出错", e3);
          }
        }
      });
    }
    const s3 = { matcher, hooks: hooks2 };
    wsSubs.add(s3);
    return () => wsSubs.delete(s3);
  }
  function onEventSource(matcher, hooks2 = {}) {
    if (!esInstalled) {
      esInstalled = true;
      wrapConstructor("EventSource", esSubs, (es, url) => {
        hookMessages(es, url, esSubs, "EventSource");
        for (const s4 of liveSubs(esSubs, url, "EventSource", "open")) {
          try {
            s4.hooks.open(es, url);
          } catch (e3) {
            logger9.error("EventSource open 处理出错", e3);
          }
        }
      });
    }
    const s3 = { matcher, hooks: hooks2 };
    esSubs.add(s3);
    return () => esSubs.delete(s3);
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/jsxhook.js
  var logger10 = new Logger("RenderHook", "#fca5a5");
  var hooks = /* @__PURE__ */ new Map();
  var stringHooks = /* @__PURE__ */ new Map();
  var installed4 = false;
  var target = null;
  function isWritableJsx(exp) {
    try {
      if (!exp || typeof exp !== "object") return false;
      const d3 = Object.getOwnPropertyDescriptor(exp, "jsx");
      const d22 = Object.getOwnPropertyDescriptor(exp, "jsxs");
      return !!(d3 && d22 && "value" in d3 && d3.writable && typeof d3.value === "function" && typeof d22.value === "function" && exp.Fragment);
    } catch {
      return false;
    }
  }
  function locate() {
    const c3 = runtime.cache;
    if (c3) for (const id of Object.keys(c3)) {
      const exp = c3[id]?.exports;
      if (isWritableJsx(exp)) return exp;
    }
    for (const exp of moduleCache.values()) if (isWritableJsx(exp)) return exp;
    return null;
  }
  var busy = false;
  function wrap(orig) {
    const wrapped2 = function(type, props, key) {
      const set = typeof type === "string" ? stringHooks.get(type) : hooks.get(type);
      if (!set || busy || !props) return orig.apply(this, arguments);
      busy = true;
      try {
        for (const fn2 of set) {
          try {
            const out = fn2(props, key, (p3 = props) => orig.call(this, type, p3, key));
            if (out !== void 0) return out;
          } catch (e3) {
            logger10.error("渲染兜底钩子出错", e3);
          }
        }
      } finally {
        busy = false;
      }
      return orig.apply(this, arguments);
    };
    wrapped2.$$uspp_ggpp_Original = orig;
    return wrapped2;
  }
  function install() {
    if (installed4) return true;
    target = locate();
    if (!target) return false;
    try {
      target.jsx = wrap(target.jsx);
      target.jsxs = wrap(target.jsxs);
      installed4 = true;
      logger10.debug("已挂接 jsx 运行时");
      return true;
    } catch (e3) {
      logger10.warn("挂接 jsx 运行时失败", e3);
      return false;
    }
  }
  var waiting = false;
  function ensureInstalled() {
    if (install() || waiting) return;
    waiting = true;
    const off = onModuleLoad(() => {
      if (install()) {
        off();
        waiting = false;
      }
    });
  }
  function addRenderHook(type, fn2) {
    if (!type) return () => {
    };
    const map = typeof type === "string" ? stringHooks : hooks;
    let set = map.get(type);
    if (!set) map.set(type, set = /* @__PURE__ */ new Set());
    set.add(fn2);
    ensureInstalled();
    return () => set.delete(fn2);
  }
  var asArray = (c3) => c3 == null ? [] : Array.isArray(c3) ? c3 : [c3];
  function treeHas(node, test2, depth = 6) {
    if (node == null || depth < 0) return false;
    if (Array.isArray(node)) return node.some((n2) => treeHas(n2, test2, depth));
    if (typeof node !== "object") return false;
    if (test2(node)) return true;
    return treeHas(node.props?.children, test2, depth - 1);
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/slots.js
  var logger11 = new Logger("Slots", "#fdba74");
  var slots = /* @__PURE__ */ new Map();
  var listeners3 = /* @__PURE__ */ new Map();
  var anyListeners = /* @__PURE__ */ new Set();
  var version = 0;
  function emit3(slot) {
    version++;
    for (const fn2 of [...listeners3.get(slot) || [], ...anyListeners]) {
      try {
        fn2(slot);
      } catch (e3) {
        logger11.error("注入点监听者出错", e3);
      }
    }
  }
  function addSlotItem(slot, id, def) {
    if (!slot || id == null) throw new Error("addSlotItem 需要注入点名和 ID");
    let m3 = slots.get(slot);
    if (!m3) slots.set(slot, m3 = /* @__PURE__ */ new Map());
    m3.set(String(id), { ...def, id: String(id) });
    emit3(slot);
  }
  function removeSlotItem(slot, id) {
    if (slots.get(slot)?.delete(String(id))) emit3(slot);
  }
  function getSlotItems(slot, { all = false } = {}) {
    const list2 = [...slots.get(slot)?.values() ?? []].sort((a3, b3) => (a3.order ?? 0) - (b3.order ?? 0));
    return all ? list2 : list2.filter((d3) => !isPatchOnly(d3));
  }
  function onSlotChange(slot, fn2) {
    const set = slot === "*" ? anyListeners : listeners3.get(slot) || (listeners3.set(slot, /* @__PURE__ */ new Set()), listeners3.get(slot));
    set.add(fn2);
    return () => set.delete(fn2);
  }
  var getSlotVersion = () => version;
  var slotValue = (v3, ctx) => typeof v3 === "function" ? !!v3(ctx) : !!v3;
  function applyMenuPatches(slot, items, ctx) {
    let cur = Array.isArray(items) ? items.slice() : [];
    for (const def of getSlotItems(slot, { all: true })) {
      if (typeof def.patch !== "function") continue;
      try {
        const r3 = def.patch(cur, ctx);
        if (Array.isArray(r3)) cur = r3;
      } catch (e3) {
        logger11.error(`菜单补丁 ${def.id} 出错,已跳过`, e3);
      }
    }
    return cur;
  }
  var isPatchOnly = (def) => typeof def.patch === "function" && def.label == null && def.render == null;

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/patcher.js
  var logger12 = new Logger("Patcher", "#f9a8d4");
  var records = /* @__PURE__ */ new WeakMap();
  var safe = (label, fn2) => {
    try {
      return fn2();
    } catch (e3) {
      logger12.error(`${label} 出错`, e3);
      return void 0;
    }
  };
  function install2(obj, name) {
    const orig = obj[name];
    if (typeof orig !== "function") throw new TypeError(`patchMethod:${String(name)} 不是函数`);
    const own = Object.prototype.hasOwnProperty.call(obj, name);
    const desc = own ? Object.getOwnPropertyDescriptor(obj, name) : null;
    const rec = { orig, own, desc, hooks: [], wrapper: null, installed: true };
    const wrapper = function(...args) {
      const self = this;
      const call2 = (a3) => new.target ? Reflect.construct(rec.orig, a3, new.target) : rec.orig.apply(self, a3);
      if (!rec.hooks.length) return call2(args);
      let skip = false;
      for (const hk of rec.hooks) {
        if (!hk.before) continue;
        const r3 = safe(`before 补丁(${hk.label})`, () => hk.before(args, self));
        if (r3 === false) skip = true;
      }
      let result;
      if (!skip) {
        let next = call2;
        for (const hk of rec.hooks) {
          if (!hk.instead) continue;
          const inner = next;
          next = (a3) => {
            let innerThrew = false;
            const callInner = (x4) => {
              try {
                return inner(x4);
              } catch (e3) {
                innerThrew = true;
                throw e3;
              }
            };
            try {
              return hk.instead(a3, (...x4) => callInner(x4.length ? x4 : a3), self);
            } catch (e3) {
              if (innerThrew) throw e3;
              logger12.error(`instead 补丁(${hk.label})出错,改用原方法`, e3);
              return inner(a3);
            }
          };
        }
        result = next(args);
      }
      for (const hk of rec.hooks) {
        if (!hk.after) continue;
        const r3 = safe(`after 补丁(${hk.label})`, () => hk.after(args, result, self));
        if (r3 !== void 0) result = r3;
      }
      return result;
    };
    try {
      Object.defineProperty(wrapper, "name", { value: orig.name, configurable: true });
      Object.defineProperty(wrapper, "length", { value: orig.length, configurable: true });
      Object.defineProperty(wrapper, "toString", { value: function toString() {
        return Function.prototype.toString.call(rec.orig);
      }, configurable: true, writable: true });
      if (orig.prototype) wrapper.prototype = orig.prototype;
    } catch {
    }
    rec.wrapper = wrapper;
    if (desc && !desc.writable && !desc.set && !desc.configurable) throw new TypeError(`patchMethod:${String(name)} 只读,无法补丁`);
    if (desc && "value" in desc) Object.defineProperty(obj, name, { ...desc, value: wrapper });
    else obj[name] = wrapper;
    return rec;
  }
  function patchMethod(obj, name, hooks2 = {}, label = "") {
    if (!obj || typeof obj !== "object" && typeof obj !== "function") throw new TypeError("patchMethod 需要对象");
    let map = records.get(obj);
    if (!map) records.set(obj, map = /* @__PURE__ */ new Map());
    let rec = map.get(name);
    if (!rec || !rec.installed) {
      rec = install2(obj, name);
      map.set(name, rec);
    }
    const hk = { before: hooks2.before, instead: hooks2.instead, after: hooks2.after, label: label || hooks2.label || String(name) };
    rec.hooks.push(hk);
    let done = false;
    return () => {
      if (done) return;
      done = true;
      const i3 = rec.hooks.indexOf(hk);
      if (i3 >= 0) rec.hooks.splice(i3, 1);
      if (rec.hooks.length || !rec.installed) return;
      let currentValue;
      try {
        currentValue = obj[name];
      } catch {
        return;
      }
      if (currentValue !== rec.wrapper) return;
      try {
        if (rec.own) Object.defineProperty(obj, name, { ...rec.desc, value: rec.orig });
        else delete obj[name];
        rec.installed = false;
        map.delete(name);
      } catch (e3) {
        logger12.debug("还原方法失败,保留透传", e3);
      }
    };
  }
  var isPatched = (obj, name) => !!records.get(obj)?.get(name)?.hooks.length;

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/datastore.js
  var logger13 = new Logger("DataStore", "#99f6e4");
  var DATA_DB = `UserscriptPP:${SCRIPT_ID}:data`;
  var STORE = "kv";
  var SEP = "\0";
  var GM_PREFIX = "data:";
  var dbp = null;
  var memory = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      const idb = W3.indexedDB || (typeof indexedDB !== "undefined" ? indexedDB : null);
      if (!idb) return reject(new Error("no indexedDB"));
      const req = idb.open(DATA_DB, 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error("blocked"));
    }).catch((e3) => {
      logger13.warn("IndexedDB 不可用,插件数据只保存在本次页面的内存里", e3?.message ?? e3);
      memory ??= /* @__PURE__ */ new Map();
      return null;
    });
    return dbp;
  }
  var tx = async (mode, fn2) => {
    const d3 = await db();
    return new Promise((resolve, reject) => {
      const t3 = d3.transaction(STORE, mode);
      fn2(t3.objectStore(STORE));
      t3.oncomplete = () => resolve();
      t3.onerror = () => reject(t3.error);
      t3.onabort = () => reject(t3.error);
    });
  };
  var reqValue = (r3) => new Promise((resolve, reject) => {
    r3.onsuccess = () => resolve(r3.result);
    r3.onerror = () => reject(r3.error);
  });
  async function idbGet2(k4) {
    const d3 = await db();
    if (!d3) return memory.get(k4);
    return reqValue(d3.transaction(STORE, "readonly").objectStore(STORE).get(k4));
  }
  async function idbSet2(k4, v3) {
    const d3 = await db();
    if (!d3) {
      memory.set(k4, v3);
      return;
    }
    await tx("readwrite", (s3) => {
      s3.put(v3, k4);
    });
  }
  async function idbDel(k4) {
    const d3 = await db();
    if (!d3) {
      memory.delete(k4);
      return;
    }
    await tx("readwrite", (s3) => {
      s3.delete(k4);
    });
  }
  async function idbKeys() {
    const d3 = await db();
    if (!d3) return [...memory.keys()];
    return reqValue(d3.transaction(STORE, "readonly").objectStore(STORE).getAllKeys());
  }
  var gmIndexKey = (plugin) => `${GM_PREFIX}${plugin}${SEP}__keys`;
  var gmKey = (plugin, key) => `${GM_PREFIX}${plugin}${SEP}${key}`;
  var gmMem = /* @__PURE__ */ new Map();
  var gmGet = (k4, d3) => GM2.get ? GM2.get(k4, d3) : gmMem.has(k4) ? gmMem.get(k4) : d3;
  var gmSet = (k4, v3) => GM2.set ? GM2.set(k4, v3) : gmMem.set(k4, v3);
  var gmDel = (k4) => GM2.del ? GM2.del(k4) : gmMem.delete(k4);
  var gmIndex = (plugin) => {
    const v3 = gmGet(gmIndexKey(plugin), []);
    return Array.isArray(v3) ? v3 : [];
  };
  var clone = (v3) => v3 === void 0 ? void 0 : typeof structuredClone === "function" ? structuredClone(v3) : JSON.parse(JSON.stringify(v3));
  var stores = /* @__PURE__ */ new Map();
  function dataStoreFor(plugin) {
    if (stores.has(plugin)) return stores.get(plugin);
    const k4 = (key) => `${plugin}${SEP}${String(key)}`;
    const global = Object.freeze({
      async get(key, fallback) {
        const v3 = gmGet(gmKey(plugin, key), void 0);
        return v3 === void 0 ? fallback : clone(v3);
      },
      async set(key, value) {
        gmSet(gmKey(plugin, key), clone(value));
        const idx = gmIndex(plugin);
        if (!idx.includes(String(key))) gmSet(gmIndexKey(plugin), [...idx, String(key)]);
      },
      async del(key) {
        gmDel(gmKey(plugin, key));
        gmSet(gmIndexKey(plugin), gmIndex(plugin).filter((x4) => x4 !== String(key)));
      },
      async keys() {
        return gmIndex(plugin);
      },
      async clear() {
        for (const key of gmIndex(plugin)) gmDel(gmKey(plugin, key));
        gmDel(gmIndexKey(plugin));
      }
    });
    const store = Object.freeze({
      async get(key, fallback) {
        try {
          const v3 = await idbGet2(k4(key));
          return v3 === void 0 ? fallback : v3;
        } catch (e3) {
          logger13.error(`${plugin} 读取数据失败`, e3);
          return fallback;
        }
      },
      async set(key, value) {
        await idbSet2(k4(key), value);
      },
      async del(key) {
        await idbDel(k4(key));
      },
      async keys() {
        const p3 = `${plugin}${SEP}`;
        return (await idbKeys()).filter((x4) => typeof x4 === "string" && x4.startsWith(p3)).map((x4) => x4.slice(p3.length));
      },
      async clear() {
        for (const key of await this.keys()) await idbDel(k4(key));
      },
      global
    });
    stores.set(plugin, store);
    return store;
  }
  async function exportData(pluginNames) {
    const out = {};
    for (const name of pluginNames) {
      const s3 = dataStoreFor(name);
      const site = {}, glob = {};
      for (const key of await s3.keys()) site[key] = await s3.get(key);
      for (const key of await s3.global.keys()) glob[key] = await s3.global.get(key);
      if (Object.keys(site).length || Object.keys(glob).length) out[name] = { site, global: glob };
    }
    return out;
  }
  async function importData(data) {
    if (!data || typeof data !== "object") return;
    for (const [name, v3] of Object.entries(data)) {
      const s3 = dataStoreFor(name);
      await s3.clear();
      await s3.global.clear();
      for (const [key, val] of Object.entries(v3?.site || {})) await s3.set(key, val);
      for (const [key, val] of Object.entries(v3?.global || {})) await s3.global.set(key, val);
    }
  }
  async function pruneData(keepNames) {
    const keep = new Set(keepNames);
    const idb = W3.indexedDB || (typeof indexedDB !== "undefined" ? indexedDB : null);
    if (typeof idb?.databases !== "function") return;
    try {
      if (!(await idb.databases()).some((d3) => d3.name === DATA_DB)) return;
    } catch {
      return;
    }
    try {
      for (const key of await idbKeys()) {
        if (typeof key !== "string") continue;
        const name = key.split(SEP)[0];
        if (!keep.has(name)) await idbDel(key);
      }
    } catch (e3) {
      logger13.debug("清理插件数据失败", e3);
    }
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/plugin-errors.js
  var logger14 = new Logger("Plugins", "#a7f3d0");
  var stats = /* @__PURE__ */ new Map();
  var listeners4 = /* @__PURE__ */ new Set();
  var BREAKER_LIMIT = 10;
  var BREAKER_WINDOW_MS = 3e4;
  var breaker = null;
  var setBreaker = (fn2) => {
    breaker = fn2;
  };
  var onPluginError = (fn2) => {
    listeners4.add(fn2);
    return () => listeners4.delete(fn2);
  };
  var tripListeners = /* @__PURE__ */ new Set();
  var onPluginTripped = (fn2) => {
    tripListeners.add(fn2);
    return () => tripListeners.delete(fn2);
  };
  function reportPluginError(plugin, where, err) {
    if (!plugin) {
      logger14.error(`${where} 出错`, err);
      return;
    }
    let s3 = stats.get(plugin);
    if (!s3) stats.set(plugin, s3 = { count: 0, last: null, recent: [], tripped: false });
    const now2 = Date.now();
    s3.count++;
    s3.last = { where, message: String(err?.message ?? err).slice(0, 300), at: now2 };
    s3.recent = [...s3.recent.filter((t3) => now2 - t3 < BREAKER_WINDOW_MS), now2];
    logger14.error(`${plugin}(${where})出错`, err);
    for (const fn2 of [...listeners4]) {
      try {
        fn2(plugin, s3);
      } catch {
      }
    }
    if (!s3.tripped && s3.recent.length >= BREAKER_LIMIT && breaker) {
      s3.tripped = true;
      let stopped = false;
      try {
        stopped = breaker(plugin, s3) !== false;
      } catch (e3) {
        logger14.error(`停用 ${plugin} 失败`, e3);
      }
      if (stopped) {
        logger14.warn(`${plugin} 在 ${BREAKER_WINDOW_MS / 1e3} 秒内出错 ${BREAKER_LIMIT} 次,本页已停用`);
        for (const fn2 of [...tripListeners]) {
          try {
            fn2(plugin, s3);
          } catch {
          }
        }
      } else s3.tripped = false;
    }
  }
  function guard(plugin, where, fn2, rethrow = false, live = null) {
    if (typeof fn2 !== "function" || !plugin) return fn2;
    return function(...a3) {
      if (live && !live()) return void 0;
      let r3;
      try {
        r3 = fn2.apply(this, a3);
      } catch (e3) {
        reportPluginError(plugin, where, e3);
        if (rethrow) throw e3;
        return void 0;
      }
      if (r3 && typeof r3.then === "function") {
        const report = (e3) => {
          if (!live || live()) reportPluginError(plugin, where, e3);
        };
        return rethrow ? r3.then(void 0, (e3) => {
          report(e3);
          throw e3;
        }) : r3.then(void 0, report);
      }
      return r3;
    };
  }
  function pluginErrorStats() {
    return [...stats.entries()].map(([name, s3]) => ({ name, count: s3.count, last: s3.last, tripped: s3.tripped })).sort((a3, b3) => b3.count - a3.count);
  }
  var pluginErrorsOf = (name) => {
    const s3 = stats.get(name);
    return s3 ? { count: s3.count, last: s3.last, tripped: s3.tripped } : null;
  };
  function resetBreaker(name) {
    const s3 = stats.get(name);
    if (s3) {
      s3.recent = [];
      s3.tripped = false;
    }
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/scope.js
  var logger15 = new Logger("Scope", "#a5b4fc");
  var scopes = /* @__PURE__ */ new Map();
  var current2 = null;
  var currentOwner = () => current2;
  function runAs(name, fn2) {
    const prev = current2;
    current2 = name;
    try {
      return fn2();
    } finally {
      current2 = prev;
    }
  }
  var runUnowned = (fn2) => runAs(null, fn2);
  function bindTo(name, where, fn2, rethrow = false) {
    if (typeof fn2 !== "function") return fn2;
    const s3 = scopes.get(name);
    const live = s3 ? s3.live : () => false;
    return guard(name, where, function(...a3) {
      const prev = current2;
      current2 = name;
      try {
        return fn2.apply(this, a3);
      } finally {
        current2 = prev;
      }
    }, rethrow, live);
  }
  function adopt2(fn2, fallback) {
    if (typeof fn2 !== "function") return fn2;
    const owner = current2;
    const scope = owner ? scopes.get(owner) : null;
    return function(...a3) {
      if (scope && !scope.live()) return fallback ? fallback.apply(this, a3) : void 0;
      const prev = current2;
      current2 = owner;
      try {
        return fn2.apply(this, a3);
      } finally {
        current2 = prev;
      }
    };
  }
  function createScope(name) {
    const list2 = /* @__PURE__ */ new Set();
    const ac = typeof AbortController === "function" ? new AbortController() : null;
    let disposed = false, suspended = false;
    const live = () => !disposed && !suspended;
    const register = (fn2) => {
      if (typeof fn2 !== "function") return fn2;
      if (disposed) {
        try {
          fn2();
        } catch (e3) {
          logger15.error(`${name} 清理出错`, e3);
        }
        return fn2;
      }
      list2.add(fn2);
      return fn2;
    };
    const unregister = (fn2) => list2.delete(fn2);
    const own = (off) => {
      if (typeof off !== "function") return off;
      let done = false;
      const once = () => {
        if (done) return;
        done = true;
        list2.delete(once);
        off();
      };
      register(once);
      return once;
    };
    const as = (fn2) => typeof fn2 === "function" ? function(...a3) {
      const prev = current2;
      current2 = name;
      try {
        return fn2.apply(this, a3);
      } finally {
        current2 = prev;
      }
    } : fn2;
    const g5 = (where, fn2) => guard(name, where, as(fn2), false, live);
    const t3 = (where, fn2) => guard(name, where, as(fn2), true, live);
    const unownedNext = (next) => (...x4) => runUnowned(() => next(...x4));
    const insteadOf = (fn2) => typeof fn2 === "function" ? guard(name, "patch:instead", as((args, next, self) => live() ? fn2(args, unownedNext(next), self) : runUnowned(() => next(...args))), true) : fn2;
    const wrapHooks = (kind, hooks2) => hooks2 && typeof hooks2 === "object" ? Object.fromEntries(Object.entries(hooks2).map(([k4, v3]) => [k4, t3(`${kind}:${k4}`, v3)])) : hooks2;
    const wrapItem = (slot, def) => def && typeof def === "object" ? {
      ...def,
      ...Object.fromEntries(["onClick", "onSelect"].filter((k4) => typeof def[k4] === "function").map((k4) => [k4, g5(`${slot}:${k4}`, def[k4])])),
      ...Object.fromEntries(["render", "patch"].filter((k4) => typeof def[k4] === "function" && !(def[k4].prototype && def[k4].prototype.isReactComponent)).map((k4) => [k4, as(def[k4])]))
    } : def;
    const slotGen = /* @__PURE__ */ new Map();
    const addOwnSlotItem = (slot, id, def) => {
      const k4 = `${slot}\0${id}`;
      const prev = slotGen.get(k4);
      if (prev) unregister(prev.once);
      addSlotItem(slot, id, wrapItem(slot, def));
      const rec = {};
      rec.once = own(() => {
        if (slotGen.get(k4) !== rec) return;
        slotGen.delete(k4);
        removeSlotItem(slot, id);
      });
      slotGen.set(k4, rec);
      return rec.once;
    };
    const ctx = {
      plugin: name,
      get signal() {
        return ac?.signal;
      },
      get disposed() {
        return disposed;
      },
      /** 插件是否还在运行(没停止、没被熔断);异步工作完成后可以据此决定要不要继续 */
      get live() {
        return live();
      },
      get pending() {
        return list2.size;
      },
      register,
      // 插件给的回调都包一层,出错记到本插件名下(见 plugin-errors.js)。返回值有意义的(网络改写、渲染钩子、方法补丁)照常抛给调用方
      observe: (selector, opts = {}) => own(observe(selector, { ...opts, added: g5("observe", opts.added), removed: g5("observe", opts.removed) })),
      onRouteChange: (fn2) => own(onRouteChange(g5("route", fn2))),
      onRequest: (m3, fn2) => own(onRequest(m3, g5("onRequest", fn2))),
      onResponse: (m3, fn2) => own(onResponse(m3, g5("onResponse", fn2))),
      rewriteRequest: (m3, fn2) => own(rewriteRequest(m3, t3("rewriteRequest", fn2))),
      rewriteResponse: (m3, fn2) => own(rewriteResponse(m3, t3("rewriteResponse", fn2))),
      onWebSocket: (m3, hooks2) => own(onWebSocket(m3, wrapHooks("WebSocket", hooks2))),
      onEventSource: (m3, hooks2) => own(onEventSource(m3, wrapHooks("EventSource", hooks2))),
      addRenderHook: (type, fn2) => own(addRenderHook(type, t3("renderHook", fn2))),
      subscribe: (ev, fn2) => own(subscribe(ev, g5(`event:${ev}`, fn2))),
      onSlotChange: (slot, fn2) => own(onSlotChange(slot, g5(`slot:${slot}`, fn2))),
      addSlotItem: addOwnSlotItem,
      patch: (obj, method, hooks2) => own(patchMethod(obj, method, hooks2 && typeof hooks2 === "object" ? Object.fromEntries(Object.entries(hooks2).map(([k4, v3]) => [k4, k4 === "instead" ? insteadOf(v3) : t3(`patch:${method}`, v3)])) : hooks2)),
      listen: (target2, type, fn2, opts) => {
        if (!target2?.addEventListener) return () => {
        };
        const wrapped2 = typeof fn2 === "function" ? g5(`listen:${type}`, fn2) : fn2;
        target2.addEventListener(type, wrapped2, opts);
        return own(() => target2.removeEventListener(type, wrapped2, opts));
      },
      setTimeout: (fn2, ms, ...a3) => {
        let off = null;
        const run = g5("timer", fn2);
        const id = W3.setTimeout(() => {
          off?.();
          run(...a3);
        }, ms);
        off = own(() => W3.clearTimeout(id));
        return off;
      },
      setInterval: (fn2, ms, ...a3) => {
        const run = g5("interval", fn2);
        const id = W3.setInterval(() => run(...a3), ms);
        return own(() => W3.clearInterval(id));
      },
      /** 插件自己捕获的错误也可以记到自己名下 */
      reportError: (err, where = "reported") => reportPluginError(name, where, err),
      get data() {
        return dataStoreFor(name);
      }
    };
    const dispose = () => {
      if (disposed) return;
      disposed = true;
      try {
        ac?.abort();
      } catch {
      }
      const fns = [...list2].reverse();
      list2.clear();
      runUnowned(() => {
        for (const fn2 of fns) {
          try {
            fn2();
          } catch (e3) {
            logger15.error(`${name} 清理出错`, e3);
          }
        }
      });
    };
    const suspend = () => {
      suspended = true;
    };
    return { ctx, dispose, register, unregister, suspend, live, addSlotItem: addOwnSlotItem };
  }
  function openScope(name) {
    scopes.get(name)?.dispose();
    const s3 = createScope(name);
    scopes.set(name, s3);
    return s3.ctx;
  }
  function closeScope(name) {
    const s3 = scopes.get(name);
    if (!s3) return;
    scopes.delete(name);
    s3.dispose();
  }
  var getScope = (name) => scopes.get(name)?.ctx ?? null;
  var addScopedSlotItem = (name, slot, id, def) => scopes.get(name)?.addSlotItem(slot, id, def) ?? null;
  var suspendScope = (name) => scopes.get(name)?.suspend();
  function ownByCurrent(off) {
    if (!current2 || typeof off !== "function") return off;
    const s3 = scopes.get(current2);
    if (!s3) return off;
    let done = false;
    const once = () => {
      if (done) return;
      done = true;
      s3.unregister(once);
      off();
    };
    s3.register(once);
    return once;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/commands.js
  var logger16 = new Logger("Commands", "#bef264");
  var commands = /* @__PURE__ */ new Map();
  var listeners5 = /* @__PURE__ */ new Set();
  var emit4 = () => {
    for (const l3 of [...listeners5]) {
      try {
        l3();
      } catch {
      }
    }
  };
  var subscribeCommands = (fn2) => {
    listeners5.add(fn2);
    return () => listeners5.delete(fn2);
  };
  function registerCommand(def) {
    if (!def?.id || typeof def.run !== "function") throw new Error("registerCommand 需要 id 和 run");
    const id = String(def.id);
    commands.set(id, { ...def, id, name: def.name || id });
    emit4();
    return () => {
      if (commands.get(id)?.run === def.run) {
        commands.delete(id);
        emit4();
      }
    };
  }
  var getCommands = () => [...commands.values()].filter((c3) => {
    try {
      return c3.when ? !!c3.when() : true;
    } catch {
      return false;
    }
  });
  var getCommand = (id) => commands.get(id) ?? null;
  var sys = () => PlainSettings.plugins.Settings ??= {};
  var userKeybinds = () => sys().keybinds && typeof sys().keybinds === "object" ? sys().keybinds : {};
  function keyFor(id) {
    const u3 = userKeybinds();
    if (Object.prototype.hasOwnProperty.call(u3, id)) return u3[id] || "";
    return normalizeCombo(commands.get(id)?.defaultKey || "");
  }
  function setKeybind(id, combo) {
    Settings.plugins.Settings.keybinds = { ...userKeybinds(), [id]: normalizeCombo(combo || "") };
  }
  function resetKeybind(id) {
    const next = { ...userKeybinds() };
    delete next[id];
    Settings.plugins.Settings.keybinds = next;
  }
  function conflictsOf(id) {
    const k4 = keyFor(id);
    if (!k4) return [];
    return getCommands().filter((c3) => c3.id !== id && keyFor(c3.id) === k4).map((c3) => c3.id);
  }
  async function runCommand(id) {
    const c3 = commands.get(id);
    if (!c3) return false;
    try {
      await c3.run();
      const usage = { ...sys().commandUsage || {} };
      usage[id] = (usage[id] || 0) + 1;
      Settings.plugins.Settings.commandUsage = usage;
      return true;
    } catch (e3) {
      logger16.error(`命令 ${c3.name} 出错`, e3);
      return false;
    }
  }
  var usageOf = (id) => sys().commandUsage?.[id] || 0;
  var MODS = ["Ctrl", "Alt", "Shift", "Meta"];
  var keyName = (k4) => k4 === " " ? "Space" : k4.length === 1 ? k4.toUpperCase() : k4;
  function normalizeCombo(s3) {
    if (!s3) return "";
    const parts = String(s3).split("+").map((x4) => x4.trim()).filter(Boolean);
    const mods = MODS.filter((m3) => parts.some((p3) => p3.toLowerCase() === m3.toLowerCase() || m3 === "Meta" && /^(cmd|command)$/i.test(p3) || m3 === "Ctrl" && /^control$/i.test(p3)));
    const key = parts.find((p3) => !MODS.some((m3) => m3.toLowerCase() === p3.toLowerCase()) && !/^(cmd|command|control)$/i.test(p3));
    return key ? [...mods, keyName(key)].join("+") : "";
  }
  function comboOf(e3) {
    if (["Control", "Alt", "Shift", "Meta"].includes(e3.key)) return "";
    let key = e3.code?.startsWith("Key") ? e3.code.slice(3) : e3.code?.startsWith("Digit") ? e3.code.slice(5) : e3.key;
    if (!key) return "";
    const mods = [e3.ctrlKey && "Ctrl", e3.altKey && "Alt", e3.shiftKey && "Shift", e3.metaKey && "Meta"].filter(Boolean);
    return [...mods, keyName(key)].join("+");
  }
  var isEditable2 = (el) => !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  var installed5 = false;
  var recording = null;
  function recordNextKey(cb) {
    recording = cb;
    return () => {
      if (recording === cb) recording = null;
    };
  }
  function installKeybinds() {
    if (installed5) return;
    installed5 = true;
    W3.document.addEventListener("keydown", (e3) => {
      const combo = comboOf(e3);
      if (!combo) return;
      if (recording) {
        const cb = recording;
        recording = null;
        e3.preventDefault();
        e3.stopPropagation();
        cb(combo === "Escape" ? null : combo);
        return;
      }
      const hasMod = e3.ctrlKey || e3.altKey || e3.metaKey;
      if (!hasMod && isEditable2(e3.composedPath?.()[0] || e3.target)) return;
      const hit = getCommands().find((c3) => keyFor(c3.id) === combo);
      if (!hit) return;
      e3.preventDefault();
      e3.stopPropagation();
      runCommand(hit.id);
    }, true);
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/interceptors.js
  var logger17 = new Logger("Interceptors", "#fca5a5");
  var chains = /* @__PURE__ */ new Map();
  var declared = /* @__PURE__ */ new Set();
  function setSiteInterceptors(list2) {
    declared = new Set(Array.isArray(list2) ? list2 : []);
  }
  function addInterceptor(name, fn2, { id = "", order = 0 } = {}) {
    if (typeof fn2 !== "function") return () => {
    };
    if (!declared.has(name)) logger17.debug(`登记了当前站点没有声明的拦截器 ${name}`);
    let list2 = chains.get(name);
    if (!list2) chains.set(name, list2 = []);
    const entry = { id, fn: fn2, order };
    list2.push(entry);
    list2.sort((a3, b3) => a3.order - b3.order);
    return () => {
      const i3 = list2.indexOf(entry);
      if (i3 >= 0) list2.splice(i3, 1);
    };
  }
  var hasInterceptors = (name) => !!chains.get(name)?.length;
  var withTimeout = (p3, ms) => new Promise((resolve, reject) => {
    const t3 = setTimeout(() => reject(new Error(`超过 ${ms} 毫秒`)), ms);
    Promise.resolve(p3).then((v3) => {
      clearTimeout(t3);
      resolve(v3);
    }, (e3) => {
      clearTimeout(t3);
      reject(e3);
    });
  });
  async function runInterceptors(name, value, { timeout = 3e3 } = {}) {
    let cur = value;
    for (const { id, fn: fn2 } of [...chains.get(name) || []]) {
      let r3;
      try {
        r3 = await withTimeout(fn2(cur), timeout);
      } catch (e3) {
        logger17.error(`拦截器 ${name}(${id})出错或超时,已跳过`, e3);
        continue;
      }
      if (r3 === void 0) continue;
      if (r3 && typeof r3 === "object" && r3.cancel === true) return { value: cur, cancelled: true, by: id };
      cur = r3;
    }
    return { value: cur, cancelled: false, by: null };
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/settings-pages.js
  var pages = /* @__PURE__ */ new Map();
  var listeners6 = /* @__PURE__ */ new Set();
  var emit5 = () => {
    for (const l3 of [...listeners6]) {
      try {
        l3();
      } catch {
      }
    }
  };
  var subscribeSettingsPages = (fn2) => {
    listeners6.add(fn2);
    return () => listeners6.delete(fn2);
  };
  function registerSettingsPage(def) {
    if (!def?.id || !def.component) throw new Error("registerSettingsPage 需要 id 和 component");
    const key = String(def.id);
    const entry = { order: 0, ...def, key, id: `uspp_ggpp_page_${key.replace(/[^\w-]/g, "_")}`, label: def.label || key, custom: true };
    pages.set(key, entry);
    emit5();
    return () => {
      if (pages.get(key) === entry) {
        pages.delete(key);
        emit5();
      }
    };
  }
  var getRegisteredPages = () => [...pages.values()].sort((a3, b3) => (a3.order ?? 0) - (b3.order ?? 0));

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/safemode.js
  var logger18 = new Logger("SafeMode", "#fca5a5");
  var LEGACY_BOOT_KEY = "UserscriptPPBoot";
  var BOOT_KEY2 = `UserscriptPPBoot:${SCRIPT_ID}`;
  var RAPID_MS = 2 * 60 * 1e3;
  var mem = /* @__PURE__ */ new Map();
  var storageOk = true;
  var ss = () => {
    try {
      return W3.sessionStorage || null;
    } catch {
      return null;
    }
  };
  var read = () => {
    try {
      const s3 = ss();
      if (!s3) {
        storageOk = false;
        return mem.get(BOOT_KEY2) || {};
      }
      const v3 = JSON.parse(s3.getItem(BOOT_KEY2) || "null");
      return v3 && typeof v3 === "object" ? v3 : {};
    } catch {
      storageOk = false;
      return mem.get(BOOT_KEY2) || {};
    }
  };
  var write = (v3) => {
    mem.set(BOOT_KEY2, v3);
    try {
      const s3 = ss();
      if (s3) s3.setItem(BOOT_KEY2, JSON.stringify(v3));
      else storageOk = false;
    } catch {
      storageOk = false;
    }
  };
  var bootTrackingAvailable = () => storageOk;
  var active = false;
  var reason = null;
  var previous = {};
  var state = {};
  var failedThisBoot = false;
  var healthy = false;
  var isSafeMode = () => active;
  var safeModeReason = () => reason;
  var lastBootInfo = () => ({ lastPlugin: previous.lastPlugin ?? null, failed: previous.failed ?? [] });
  var save = (v3) => {
    state = v3;
    write(v3);
  };
  function beginBoot() {
    previous = read();
    try {
      if (GM2.del && GM2.get && GM2.get(LEGACY_BOOT_KEY, null) != null) GM2.del(LEGACY_BOOT_KEY);
    } catch {
    }
    const now2 = Date.now();
    const hash = (() => {
      try {
        return W3.location.hash.includes("uspp-ggpp-safe");
      } catch {
        return false;
      }
    })();
    const rapid = previous.pending && now2 - (previous.at || 0) < RAPID_MS;
    const pending = rapid ? previous.pending || 0 : 0;
    if (previous.force) {
      active = true;
      reason = "manual";
    } else if (hash) {
      active = true;
      reason = "url";
    } else if (pending >= 2) {
      active = true;
      reason = "crash";
    }
    save({ pending: active ? 0 : pending + 1, at: now2, lastPlugin: null, failed: [] });
    if (active) logger18.warn(`已进入安全模式(${reason}):只启动必需插件`);
  }
  function markBootHealthy(delay = 1e4) {
    const done = () => {
      if (healthy) return;
      healthy = true;
      if (state.pending) save({ ...state, pending: 0 });
    };
    setTimeout(done, delay);
    try {
      W3.addEventListener("pagehide", () => {
        if (!failedThisBoot) done();
      }, { once: true });
    } catch {
    }
  }
  function noteStarting(name) {
    if (!state.pending || state.lastPlugin === name) return;
    save({ ...state, lastPlugin: name });
  }
  function noteFailed(name) {
    failedThisBoot = true;
    save({ ...state, failed: [.../* @__PURE__ */ new Set([...state.failed || [], name])].slice(-10) });
  }
  function reloadInSafeMode() {
    save({ ...state, force: true });
    W3.location.reload();
  }
  function exitSafeMode() {
    write({ pending: 0, at: Date.now() });
    try {
      if (W3.location.hash.includes("uspp-ggpp-safe")) W3.location.hash = "";
    } catch {
    }
    W3.location.reload();
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/plugins.js
  var perfNow = () => typeof performance !== "undefined" ? performance.now() : Date.now();
  var logger19 = new Logger("PluginManager", "#a5b4fc");
  var StartAt = Object.freeze({
    Init: "Init",
    DOMContentLoaded: "DOMContentLoaded",
    SiteReady: "SiteReady",
    // 旧名:Turbopack 站点上"模块稳定"就是站点就绪
    TurbopackReady: "SiteReady"
  });
  var OptionType = Object.freeze({
    STRING: 0,
    NUMBER: 1,
    BIGINT: 2,
    BOOLEAN: 3,
    SELECT: 4,
    SLIDER: 5,
    COMPONENT: 6,
    CUSTOM: 7
  });
  var plugins = {};
  var reachedStages = /* @__PURE__ */ new Set();
  var runtimeRegistered = /* @__PURE__ */ new Set();
  var otherSites = /* @__PURE__ */ new Set();
  var cleanup = /* @__PURE__ */ new Map();
  var definePlugin2 = (def) => def;
  function definePluginSettings(def, checks) {
    const ds = {
      def,
      checks: checks ?? {},
      pluginName: null,
      get store() {
        if (!this.pluginName) throw new Error("插件注册前不能访问 settings.store");
        return Settings.plugins[this.pluginName];
      },
      get plain() {
        if (!this.pluginName) throw new Error("插件注册前不能访问 settings.plain");
        return PlainSettings.plugins[this.pluginName] ??= {};
      },
      use(keys) {
        const React = getReact();
        const [, force] = React.useReducer((x4) => x4 + 1, 0);
        const name = this.pluginName;
        React.useEffect(() => {
          const prefix = `plugins.${name}.`;
          const fn2 = (_3, path) => {
            const key = path.slice(prefix.length).split(".")[0];
            if (!keys || keys.includes(key)) force();
          };
          SettingsStore.addPrefixChangeListener(prefix, fn2);
          return () => SettingsStore.removePrefixChangeListener(prefix, fn2);
        }, [name]);
        return this.store;
      },
      withPrivateSettings() {
        return this;
      }
    };
    return ds;
  }
  function getSettingDefault(setting) {
    if (!setting) return void 0;
    if (setting.type === OptionType.SELECT) return setting.options?.find((o3) => o3.default)?.value;
    return setting.default;
  }
  setPluginRegistry((name) => !!plugins[name]);
  setDefaultResolver((pluginName, key) => {
    if (key === "enabled") return void 0;
    const s3 = plugins[pluginName]?.settings?.def?.[key];
    return getSettingDefault(s3);
  });
  var supported = (p3) => !(p3.chromiumOnly && !isChromium());
  function intentOn(name) {
    const p3 = plugins[name];
    if (!p3 || !supported(p3)) return false;
    if (p3.required) return true;
    const stored = PlainSettings.plugins[name]?.enabled;
    if (typeof stored === "boolean") return stored;
    return !!p3.enabledByDefault;
  }
  function dependencyClosure() {
    const need = /* @__PURE__ */ new Set();
    const visit = (name) => {
      for (const d3 of plugins[name]?.dependencies || []) {
        if (!plugins[d3] || need.has(d3)) continue;
        need.add(d3);
        visit(d3);
      }
    };
    for (const name of Object.keys(plugins)) if (intentOn(name)) visit(name);
    return need;
  }
  function isPluginEnabled(name) {
    const p3 = plugins[name];
    if (!p3 || !supported(p3)) return false;
    return intentOn(name) || dependencyClosure().has(name);
  }
  var isEnabledAsDependency = (name) => !!plugins[name] && supported(plugins[name]) && !intentOn(name) && dependencyClosure().has(name);
  function dependentsOf(name) {
    const out = [];
    for (const p3 of Object.values(plugins)) {
      if (p3.name === name || !isPluginEnabled(p3.name)) continue;
      if (allDependencies(p3).has(name)) out.push(p3.name);
    }
    return out;
  }
  function allDependencies(p3, seen = /* @__PURE__ */ new Set()) {
    for (const d3 of p3.dependencies || []) {
      if (seen.has(d3) || !plugins[d3]) continue;
      seen.add(d3);
      allDependencies(plugins[d3], seen);
    }
    return seen;
  }
  var pluginHasPatches = (p3) => Array.isArray(p3.patches) && p3.patches.length > 0;
  function bindMethods(p3) {
    for (const k4 of Object.keys(p3)) {
      if (k4 === "start" || k4 === "stop") continue;
      const v3 = p3[k4];
      if (typeof v3 === "function" && !v3.$$uspp_ggpp_Bound && !(v3.prototype && v3.prototype.isReactComponent) && k4 !== "icon") {
        const bound2 = v3.bind(p3);
        Object.defineProperty(bound2, "$$uspp_ggpp_Bound", { value: true });
        p3[k4] = bound2;
      }
    }
  }
  function addPlugin(def, { runtime: runtime2 = false } = {}) {
    if (!def || !def.name) throw new Error("插件必须有 name");
    if (plugins[def.name]) return false;
    if (def.dev && true) return false;
    if (def.site == null) def.site = runtime2 ? getSite().id : "*";
    if (def.site !== "*" && def.site !== getSite().id) {
      otherSites.add(def.name);
      if (runtime2) logger19.warn(`${def.name} 属于站点 ${def.site},不是当前站点,未注册`);
      return false;
    }
    const p3 = def;
    p3.started = false;
    if (p3.settings) p3.settings.pluginName = p3.name;
    bindMethods(p3);
    PlainSettings.plugins[p3.name] ??= {};
    plugins[p3.name] = p3;
    if (runtime2) runtimeRegistered.add(p3.name);
    return true;
  }
  var patchesNotApplicable = /* @__PURE__ */ new Set();
  var siteHasDriver = () => !!getSite().driver;
  function patchPlan() {
    const plan = {};
    if (!siteHasDriver()) return plan;
    for (const p3 of Object.values(plugins)) {
      if (!pluginHasPatches(p3) || runtimeRegistered.has(p3.name)) continue;
      const on3 = isPluginEnabled(p3.name) && (!isSafeMode() || !!p3.required);
      if (on3 || false) plan[p3.name] = on3;
    }
    return plan;
  }
  var bootPlan = null;
  var pendingReload = /* @__PURE__ */ new Set();
  function registerPatches() {
    if (bootPlan) return;
    for (const p3 of Object.values(plugins)) {
      if (pluginHasPatches(p3) && !runtimeRegistered.has(p3.name) && !siteHasDriver()) patchesNotApplicable.add(p3.name);
    }
    bootPlan = patchPlan();
    for (const [name, enabled] of Object.entries(bootPlan)) {
      const p3 = plugins[name];
      p3.patches.forEach((patch, i3) => {
        try {
          addPatch(patch, p3.name, { checkOnly: !enabled, key: `${p3.name}#${i3}` });
        } catch (e3) {
          logger19.error(`登记 ${p3.name} 的第 ${i3} 条补丁失败`, e3);
        }
      });
    }
  }
  var patchGated = (p3) => !!bootPlan && siteHasDriver() && pluginHasPatches(p3) && !runtimeRegistered.has(p3.name);
  var patchesLive = (p3) => bootPlan?.[p3.name] === true;
  var bootChecked = false;
  var bootEnabled = /* @__PURE__ */ new Map();
  var bootSettings = /* @__PURE__ */ new Map();
  function computeReload() {
    const out = /* @__PURE__ */ new Set();
    if (bootPlan) {
      const now2 = patchPlan();
      for (const name of /* @__PURE__ */ new Set([...Object.keys(bootPlan), ...Object.keys(now2)])) if (!!bootPlan[name] !== !!now2[name]) out.add(name);
    }
    for (const [name, was] of bootEnabled) if (plugins[name] && was !== isPluginEnabled(name)) out.add(name);
    for (const [k4, was] of bootSettings) {
      const i3 = k4.indexOf(".");
      const name = k4.slice(0, i3), key = k4.slice(i3 + 1);
      if (plugins[name] && JSON.stringify(PlainSettings.plugins[name]?.[key] ?? null) !== JSON.stringify(was ?? null)) out.add(name);
    }
    return out;
  }
  function refreshReload() {
    if (!bootChecked) return [];
    const next = computeReload();
    const added = [...next].filter((n2) => !pendingReload.has(n2));
    const changed = added.length || [...pendingReload].some((n2) => !next.has(n2));
    pendingReload.clear();
    for (const n2 of next) pendingReload.add(n2);
    if (changed) dispatch(Events.RELOAD_NEEDED, { reason: "settings", plugins: [...pendingReload], added });
    return added;
  }
  var restartKeys = (p3) => Object.entries(p3?.settings?.def || {}).filter(([, s3]) => s3 && s3.restartNeeded).map(([k4]) => k4);
  function bootSnapshot() {
    if (bootChecked) return;
    for (const p3 of Object.values(plugins)) {
      if (p3.requiresRestart) bootEnabled.set(p3.name, isPluginEnabled(p3.name));
      for (const k4 of restartKeys(p3)) bootSettings.set(`${p3.name}.${k4}`, JSON.parse(JSON.stringify(PlainSettings.plugins[p3.name]?.[k4] ?? null)));
    }
    bootChecked = true;
  }
  var checkReload = () => refreshReload();
  function noteRestartSetting(name, key, before) {
    const k4 = `${name}.${key}`;
    if (!bootSettings.has(k4)) bootSettings.set(k4, before);
    return refreshReload();
  }
  function checkPatchPlan() {
    bootSnapshot();
    const added = [...computeReload()].filter((n2) => !pendingReload.has(n2));
    for (const n2 of computeReload()) pendingReload.add(n2);
    if (added.length) logger19.info(`补丁要重新加载页面才生效:${added.join(", ")}`);
    return added;
  }
  function pluginSlots(p3) {
    const out = { ...p3.slots || {} };
    const aliases = getSite().pluginAliases || {};
    for (const [field, map] of Object.entries(aliases)) {
      if (p3[field] == null || typeof map !== "function") continue;
      let extra = null;
      try {
        extra = map(p3[field], p3);
      } catch (e3) {
        logger19.error(`${p3.name}.${field} 转换失败`, e3);
      }
      for (const [slot, v3] of Object.entries(extra || {})) {
        if (v3 == null) continue;
        out[slot] = out[slot] ? [].concat(out[slot], v3) : v3;
      }
    }
    return out;
  }
  function track(name, fn2) {
    let list2 = cleanup.get(name);
    if (!list2) cleanup.set(name, list2 = []);
    list2.push(fn2);
  }
  function runCleanup(name) {
    const list2 = cleanup.get(name) || [];
    cleanup.delete(name);
    for (const fn2 of list2.reverse()) {
      try {
        fn2();
      } catch (e3) {
        logger19.error(`${name} 清理出错`, e3);
      }
    }
  }
  function subscribeZustand(p3) {
    for (const [storeName, conf] of Object.entries(p3.zustand || {})) {
      let unsub = null, cancelled = false;
      const attach = (store2) => {
        if (cancelled) return;
        const handler = bindTo(p3.name, `zustand:${storeName}`, (cur, prev) => conf.handler.call(p3, cur, prev));
        if (conf.selector) {
          if (store2.subscribe.length >= 2) {
            try {
              unsub = store2.subscribe(conf.selector, handler);
              if (typeof unsub === "function") return;
            } catch {
            }
          }
          let last2 = conf.selector(store2.getState());
          unsub = store2.subscribe((state3) => {
            const next = conf.selector(state3);
            if (Object.is(next, last2)) return;
            const prev = last2;
            last2 = next;
            handler(next, prev);
          });
        } else {
          unsub = store2.subscribe(handler);
        }
      };
      const store = findStore(storeName);
      let cancelWait = null;
      if (store) attach(store);
      else cancelWait = waitFor2(filters.byStoreName(storeName), (m3) => {
        const key = "use" + storeName.replace(/^use/, "").replace(/Store$/, "") + "Store";
        attach(m3[key]);
      });
      track(p3.name, () => {
        cancelled = true;
        cancelWait?.();
        if (typeof unsub === "function") unsub();
      });
    }
  }
  function startPlugin(p3, stack = []) {
    if (typeof p3 === "string") p3 = plugins[p3];
    if (!p3) return false;
    if (p3.started) return true;
    if (diag.disablePlugins.includes(p3.name)) {
      trace("plugin.start.skipped", p3.name);
      return false;
    }
    trace("plugin.start", p3.name);
    if (stack.includes(p3.name)) {
      logger19.error(`发现循环依赖:${[...stack, p3.name].join(" -> ")}`);
      return false;
    }
    for (const dep of p3.dependencies || []) {
      const d3 = plugins[dep];
      if (!d3) {
        logger19.warn(`${p3.name} 依赖的插件 ${dep} 不存在`);
        return false;
      }
      if (!d3.started) {
        logger19.debug(`${p3.name} 依赖的插件 ${dep} 没在运行,暂不启动`);
        return false;
      }
    }
    noteStarting(p3.name);
    p3.startError = null;
    resetBreaker(p3.name);
    const t0 = perfNow();
    const ctx = openScope(p3.name);
    p3.suspended = false;
    let finishStart;
    p3.startSettled = new Promise((r3) => {
      finishStart = r3;
    });
    p3.finishStart = finishStart;
    ctx.fetchExternal = fetchExternalFor(p3.name, p3.connect);
    try {
      if (p3.managedStyle) {
        enableStyle(p3.managedStyle);
        if (!pluginHasPatches(p3)) track(p3.name, () => disableStyle(p3.managedStyle));
      }
      const started = runAs(p3.name, () => p3.start?.(ctx));
      if (started && typeof started.then === "function") {
        const pr = p3.startPromise = Promise.resolve(started).then(() => {
          if (p3.startPromise !== pr) return;
          const from = pluginPhase(p3);
          p3.startPromise = null;
          resetBreaker(p3.name);
          finishStart();
          phaseChanged([{ name: p3.name, from, to: pluginPhase(p3) }]);
        }, (e3) => {
          if (p3.startPromise !== pr) return;
          p3.startPromise = null;
          logger19.error(`启动 ${p3.name} 失败(async start)`, e3);
          afterReconcile(() => {
            if (!p3.started || p3.startPromise) return;
            const from = pluginPhase(p3);
            stopPlugin(p3);
            p3.startError = e3;
            p3.startFailedAsync = true;
            noteFailed(p3.name);
            phaseChanged([{ name: p3.name, from, to: pluginPhase(p3) }]);
            reconcile(affectedBy(p3.name));
          });
        });
      } else finishStart();
      for (const c3 of p3.commands || []) {
        if (!c3) continue;
        track(p3.name, registerCommand({ ...c3, run: bindTo(p3.name, `command:${c3.id ?? c3.name}`, c3.run, true), id: String(c3.id ?? c3.name).includes(".") ? String(c3.id ?? c3.name) : `${p3.name}.${c3.id ?? c3.name}`, plugin: p3.name }));
      }
      for (const [name, fn2] of Object.entries(p3.interceptors || {})) {
        if (typeof fn2 === "function") track(p3.name, addInterceptor(name, bindTo(p3.name, `interceptor:${name}`, fn2.bind(p3), true), { id: p3.name }));
      }
      for (const page2 of p3.settingsPages || []) {
        if (page2) track(p3.name, registerSettingsPage({ ...page2, plugin: p3.name }));
      }
      const addDefSlots = () => {
        for (const [slot, value] of Object.entries(pluginSlots(p3))) {
          const list2 = Array.isArray(value) ? value : [value];
          list2.forEach((item, i3) => {
            if (!item) return;
            addScopedSlotItem(p3.name, slot, list2.length > 1 ? `${p3.name}:${i3}` : p3.name, item);
          });
        }
      };
      if (p3.startPromise) p3.startPromise.then(() => {
        if (p3.started && !p3.startPromise && getScope(p3.name) === ctx) addDefSlots();
      });
      else addDefSlots();
      for (const [ev, handler] of Object.entries(p3.events || {})) {
        const off = subscribe(ev, bindTo(p3.name, `event:${ev}`, (data) => handler.call(p3, data)));
        track(p3.name, off);
      }
      if (p3.zustand) subscribeZustand(p3);
      if (typeof p3.onSettingsChange === "function") {
        const prefix = `plugins.${p3.name}.`;
        const call2 = bindTo(p3.name, "onSettingsChange", (v3, path) => p3.onSettingsChange(v3, path));
        const fn2 = (v3, path) => {
          if (path !== `${prefix}enabled`) call2(v3, path);
        };
        SettingsStore.addPrefixChangeListener(prefix, fn2);
        track(p3.name, () => SettingsStore.removePrefixChangeListener(prefix, fn2));
      }
      p3.started = true;
      p3.tripped = false;
      resetBreaker(p3.name);
      p3.startMs = Math.round((perfNow() - t0) * 10) / 10;
      logger19.debug(`已启动 ${p3.name}(${p3.startMs} ms)`);
      return true;
    } catch (e3) {
      logger19.error(`启动 ${p3.name} 失败`, e3);
      p3.startError = e3;
      p3.startFailedAsync = false;
      noteFailed(p3.name);
      finishStart();
      try {
        runAs(p3.name, () => p3.stop?.(ctx));
      } catch (e22) {
        logger19.error(`${p3.name}.stop 出错`, e22);
      }
      runCleanup(p3.name);
      closeScope(p3.name);
      if (p3.managedStyle && !pluginHasPatches(p3)) disableStyle(p3.managedStyle);
      p3.started = false;
      return false;
    }
  }
  setBreaker((name) => {
    const p3 = plugins[name];
    if (!p3 || p3.required || !p3.started) return false;
    const before = phasesOf([name, ...dependentsOf(name)]);
    p3.tripped = true;
    const names = [name, ...dependentsOf(name)];
    for (const n2 of names) {
      suspendScope(n2);
      if (plugins[n2]) plugins[n2].suspended = true;
    }
    phaseChanged(diffPhases(before));
    queueMicrotask(() => reconcile(names));
    return true;
  });
  function slowestStarts(limit = 5) {
    return Object.values(plugins).filter((p3) => p3.started && typeof p3.startMs === "number").sort((a3, b3) => b3.startMs - a3.startMs).slice(0, limit).map((p3) => ({ name: p3.name, ms: p3.startMs }));
  }
  function stopPlugin(p3) {
    if (typeof p3 === "string") p3 = plugins[p3];
    if (!p3) return false;
    if (!p3.started) return true;
    try {
      runAs(p3.name, () => p3.stop?.(getScope(p3.name) ?? void 0));
    } catch (e3) {
      logger19.error(`${p3.name}.stop 出错`, e3);
    }
    runCleanup(p3.name);
    closeScope(p3.name);
    if (p3.managedStyle && !pluginHasPatches(p3)) {
      try {
        disableStyle(p3.managedStyle);
      } catch (e3) {
        logger19.error(e3);
      }
    }
    for (const sel of p3.cleanupSelectors || []) {
      try {
        document.querySelectorAll(sel).forEach((el) => el.remove());
      } catch (e3) {
        logger19.error(`${p3.name} 清理选择器 ${sel} 出错`, e3);
      }
    }
    p3.started = false;
    p3.startPromise = null;
    p3.suspended = false;
    p3.finishStart?.();
    logger19.debug(`已停止 ${p3.name}`);
    return true;
  }
  function shouldRun(p3, seen = /* @__PURE__ */ new Set()) {
    if (!isPluginEnabled(p3.name)) return false;
    if (patchGated(p3) && !patchesLive(p3)) return false;
    if (isSafeMode() && !p3.required) return false;
    if (!reachedStages.has(p3.startAt ?? StartAt.Init)) return false;
    if (p3.tripped) return false;
    for (const d3 of p3.dependencies || []) {
      const q4 = plugins[d3];
      if (!q4 || seen.has(d3)) return false;
      if (q4.startError && !q4.started) return false;
      if (!shouldRun(q4, /* @__PURE__ */ new Set([...seen, p3.name]))) return false;
    }
    return true;
  }
  var depsRunning = (p3) => (p3.dependencies || []).every((d3) => plugins[d3]?.started);
  function withRelated(names) {
    const out = new Set(names);
    for (let grew = true; grew; ) {
      grew = false;
      for (const n2 of [...out]) {
        const p3 = plugins[n2];
        if (!p3) continue;
        for (const d3 of allDependencies(p3)) if (!out.has(d3)) {
          out.add(d3);
          grew = true;
        }
      }
      for (const q4 of Object.values(plugins)) {
        if (out.has(q4.name)) continue;
        for (const d3 of allDependencies(q4)) if (out.has(d3)) {
          out.add(q4.name);
          grew = true;
          break;
        }
      }
    }
    return out;
  }
  function pluginPhase(p3) {
    if (typeof p3 === "string") p3 = plugins[p3];
    if (!p3) return "missing";
    if (p3.tripped) return "tripped";
    if (p3.started && p3.suspended) return "blocked";
    if (p3.started) return p3.startPromise ? "starting" : "running";
    if (p3.startError) return "failed";
    if (!isPluginEnabled(p3.name)) return patchGated(p3) && patchesLive(p3) ? "reloadToDisable" : "idle";
    if (patchGated(p3) && !patchesLive(p3)) return "reloadToEnable";
    if (isSafeMode() && !p3.required) return "safeMode";
    if (!reachedStages.has(p3.startAt ?? StartAt.Init)) return "waiting";
    if ((p3.dependencies || []).some((d3) => !plugins[d3]?.started)) return "blocked";
    return "idle";
  }
  function pluginStatus(p3) {
    if (typeof p3 === "string") p3 = plugins[p3];
    const phase = pluginPhase(p3);
    if (!p3) return { phase, reason: "missing", detail: null };
    if (phase === "failed") return { phase, reason: p3.startFailedAsync ? "startRejected" : "startThrew", detail: String(p3.startError?.message ?? p3.startError ?? "") };
    if (phase === "tripped") return { phase, reason: "tooManyErrors", detail: null };
    if (phase === "idle") return { phase, reason: isPluginEnabled(p3.name) && diag.disablePlugins.includes(p3.name) ? "debugDisabled" : "off", detail: null };
    if (phase !== "blocked") return { phase, reason: phase, detail: null };
    const walk = (q4, seen) => {
      for (const d3 of q4.dependencies || []) {
        const dep = plugins[d3];
        if (!dep) return { reason: "depMissing", detail: d3 };
        if (seen.has(d3)) return { reason: "depCycle", detail: d3 };
        if (dep.started && !dep.suspended) {
          const r4 = walk(dep, /* @__PURE__ */ new Set([...seen, q4.name]));
          if (r4) return r4;
          continue;
        }
        if (diag.disablePlugins.includes(d3)) return { reason: "depDisabled", detail: d3 };
        const ph = pluginPhase(dep);
        if (ph === "waiting") return { reason: "depWaiting", detail: d3 };
        if (ph === "reloadToEnable") return { reason: "depReload", detail: d3 };
        if (ph === "safeMode") return { reason: "depSafeMode", detail: d3 };
        if (ph === "blocked") return walk(dep, /* @__PURE__ */ new Set([...seen, q4.name])) || { reason: "depStopped", detail: d3 };
        return { reason: "depStopped", detail: d3 };
      }
      return null;
    };
    const r3 = (p3.started && p3.suspended ? { reason: "depStopped", detail: (p3.dependencies || []).find((d3) => plugins[d3]?.tripped || plugins[d3]?.suspended) ?? null } : null) || walk(p3, /* @__PURE__ */ new Set()) || { reason: "depStopped", detail: null };
    return { phase, ...r3 };
  }
  var canRestartPlugin = (p3) => {
    const s3 = pluginStatus(p3);
    return s3.phase === "tripped" || s3.phase === "failed" || s3.phase === "blocked" && s3.reason === "depStopped";
  };
  var phasesOf = (names) => new Map([...names].filter((n2) => plugins[n2]).map((n2) => [n2, pluginPhase(n2)]));
  var diffPhases = (before) => [...before].map(([name, from]) => ({ name, from, to: pluginPhase(name) })).filter((c3) => c3.from !== c3.to);
  function phaseChanged(changes) {
    if (!changes.length) return;
    try {
      dispatch(Events.PLUGIN_PHASE, { changes });
    } catch (e3) {
      logger19.error("阶段通知出错", e3);
    }
  }
  var reconciling = false;
  var reconcileAgain = null;
  var settled = [];
  function afterReconcile(fn2) {
    if (reconciling) settled.push(fn2);
    else fn2();
  }
  function reconcile(names) {
    const set = names ? withRelated(names) : new Set(Object.keys(plugins));
    if (reconciling) {
      for (const n2 of set) (reconcileAgain ??= /* @__PURE__ */ new Set()).add(n2);
      return [];
    }
    reconciling = true;
    const failed2 = [];
    const before = phasesOf(set);
    try {
      let todo = set;
      while (todo) {
        reconcileAgain = null;
        const list2 = [...todo].map((n2) => plugins[n2]).filter(Boolean);
        const toStop = list2.filter((p3) => p3.started && (p3.suspended || !shouldRun(p3)));
        toStop.sort((a3, b3) => allDependencies(b3).size - allDependencies(a3).size);
        for (const p3 of toStop) stopPlugin(p3);
        list2.sort((a3, b3) => allDependencies(a3).size - allDependencies(b3).size);
        for (const p3 of list2) {
          if (p3.started || p3.startError || !shouldRun(p3) || !depsRunning(p3)) continue;
          if (!startPlugin(p3)) failed2.push(p3);
        }
        if (reconcileAgain) {
          for (const n2 of reconcileAgain) if (!before.has(n2) && plugins[n2]) before.set(n2, pluginPhase(n2));
        }
        todo = reconcileAgain;
      }
    } finally {
      reconciling = false;
      reconcileAgain = null;
    }
    phaseChanged(diffPhases(before));
    try {
      refreshReload();
    } catch (e3) {
      logger19.error("重算要刷新的插件出错", e3);
    }
    while (settled.length && !reconciling) {
      try {
        settled.shift()();
      } catch (e3) {
        logger19.error("收敛后续步骤出错", e3);
      }
    }
    return failed2;
  }
  function retryPlugins(names) {
    for (const n2 of names) if (plugins[n2]?.startError) plugins[n2].startError = null;
    reconcile(names);
    return names.filter((n2) => plugins[n2] && isPluginEnabled(n2) && !plugins[n2].started);
  }
  var affectedBy = (name) => {
    const p3 = plugins[name];
    if (!p3) return [];
    const out = /* @__PURE__ */ new Set([name, ...allDependencies(p3)]);
    for (const q4 of Object.values(plugins)) if (allDependencies(q4).has(name)) out.add(q4.name);
    return [...out];
  };
  SettingsStore.addPrefixChangeListener("plugins.", (_3, path) => {
    const parts = path.split(".");
    if (parts.length < 3 || !plugins[parts[1]]) return;
    if (parts[2] !== "enabled") {
      if (parts.length === 3 && restartKeys(plugins[parts[1]]).includes(parts[2])) refreshReload();
      return;
    }
    if (parts.length !== 3) return;
    const p3 = plugins[parts[1]];
    if (!isPluginEnabled(p3.name) && (p3.startError || p3.tripped)) clearFailure(p3);
    reconcile(affectedBy(parts[1]));
  });
  function clearFailure(p3) {
    p3.startError = null;
    if (p3.tripped) {
      p3.tripped = false;
      resetBreaker(p3.name);
    }
  }
  function setIntent(p3, on3) {
    clearFailure(p3);
    if (intentOn(p3.name) === on3) {
      reconcile(affectedBy(p3.name));
      return;
    }
    Settings.plugins[p3.name].enabled = on3;
  }
  function startPluginApi(p3) {
    if (typeof p3 === "string") p3 = plugins[p3];
    if (!p3) return false;
    const was = isPluginEnabled(p3.name);
    setIntent(p3, true);
    if (!was && isPluginEnabled(p3.name)) dispatch(Events.PLUGIN_TOGGLE, { name: p3.name, enabled: true });
    return !!p3.started;
  }
  function stopPluginApi(p3) {
    if (typeof p3 === "string") p3 = plugins[p3];
    if (!p3 || p3.required) return false;
    const was = isPluginEnabled(p3.name);
    setIntent(p3, false);
    if (was && !isPluginEnabled(p3.name)) dispatch(Events.PLUGIN_TOGGLE, { name: p3.name, enabled: false });
    return !p3.started;
  }
  var settle = (name) => new Promise((resolve) => afterReconcile(() => {
    const p3 = plugins[name];
    const pending = p3?.startPromise ? p3.startSettled : null;
    (pending || Promise.resolve()).then(() => new Promise((r3) => setTimeout(r3, 0))).then(() => afterReconcile(() => resolve(pluginPhase(name))));
  }));
  function startPluginAsync(p3) {
    const name = typeof p3 === "string" ? p3 : p3?.name;
    startPluginApi(name);
    return settle(name);
  }
  function stopPluginAsync(p3) {
    const name = typeof p3 === "string" ? p3 : p3?.name;
    stopPluginApi(name);
    return settle(name);
  }
  function setPluginEnabled(name, on3) {
    const p3 = plugins[name];
    if (!p3 || p3.required) return false;
    on3 = !!on3;
    const was = isPluginEnabled(name);
    const before = new Set(pendingReload);
    setIntent(p3, on3);
    if (was !== isPluginEnabled(name)) dispatch(Events.PLUGIN_TOGGLE, { name, enabled: isPluginEnabled(name) });
    return pendingReload.has(name) || [...pendingReload].some((n2) => !before.has(n2));
  }
  function restartPlugin(name) {
    const p3 = plugins[name];
    if (!p3) return false;
    for (const n2 of [name, ...allDependencies(p3)]) if (plugins[n2]) clearFailure(plugins[n2]);
    reconcile(affectedBy(name));
    dispatch(Events.PLUGIN_TOGGLE, { name, enabled: isPluginEnabled(name) });
    return !!p3.started;
  }
  function togglePlugin(name, enabled) {
    if (typeof enabled === "boolean") return setPluginEnabled(name, enabled);
    const p3 = plugins[name];
    if (!p3) return false;
    if (p3.required || isEnabledAsDependency(name)) return false;
    if (p3.tripped && intentOn(name)) {
      clearFailure(p3);
      reconcile(affectedBy(name));
      dispatch(Events.PLUGIN_TOGGLE, { name, enabled: true });
      return false;
    }
    return setPluginEnabled(name, !intentOn(name));
  }
  function registerPlugin(def) {
    if (!addPlugin(def, { runtime: true })) return false;
    const known = Settings.plugins.Settings?.knownPlugins;
    if (known && known[def.name] == null) {
      const now2 = Date.now();
      known[def.name] = now2 - now2 % DAY_MS;
    }
    reconcile([def.name]);
    return true;
  }
  var STALE_MS = 90 * 24 * 60 * 60 * 1e3;
  var DAY_MS = 24 * 60 * 60 * 1e3;
  function cleanStaleSettings(now2 = Date.now()) {
    const sys4 = Settings.plugins.Settings;
    if (!PlainSettings.plugins.Settings?.pluginsLastSeen || typeof PlainSettings.plugins.Settings.pluginsLastSeen !== "object") sys4.pluginsLastSeen = {};
    const seen = sys4.pluginsLastSeen;
    const plain = PlainSettings.plugins.Settings.pluginsLastSeen;
    const present = (name) => !!plugins[name] || otherSites.has(name);
    const today = now2 - now2 % DAY_MS;
    for (const name of Object.keys(plugins)) if (!(now2 - (plain[name] || 0) < DAY_MS)) seen[name] = today;
    const keep = /* @__PURE__ */ new Set([...Object.keys(plugins), ...otherSites]);
    for (const name of Object.keys(PlainSettings.plugins)) {
      if (present(name)) continue;
      const at = plain[name];
      if (!at) {
        seen[name] = today;
        keep.add(name);
        continue;
      }
      if (now2 - at < STALE_MS) {
        keep.add(name);
        continue;
      }
      delete Settings.plugins[name];
      delete seen[name];
      logger19.info(`插件 ${name} 已 ${Math.round((now2 - at) / DAY_MS)} 天没出现,删除它的设置和数据`);
    }
    for (const name of Object.keys(plain)) if (!present(name) && now2 - plain[name] < STALE_MS) keep.add(name);
    return [...keep];
  }
  function recordKnownPlugins() {
    const s3 = Settings.plugins.Settings;
    if (!s3) return;
    if (!PlainSettings.plugins.Settings.knownPlugins || typeof PlainSettings.plugins.Settings.knownPlugins !== "object") s3.knownPlugins = {};
    const known = s3.knownPlugins;
    const now2 = Date.now();
    const today = now2 - now2 % DAY_MS;
    for (const name of Object.keys(plugins)) if (known[name] == null) known[name] = today;
  }
  function enforceDependencies() {
    for (const p3 of Object.values(plugins)) {
      if (!isPluginEnabled(p3.name)) continue;
      for (const d3 of p3.dependencies || []) if (!plugins[d3]) logger19.warn(`${p3.name} 依赖的插件 ${d3} 不在当前站点`);
    }
    if (PlainSettings.plugins.Settings && PlainSettings.plugins.Settings.enabled === false) Settings.plugins.Settings.enabled = true;
  }
  function startAllAt(stage) {
    reachedStages.add(stage);
    return reconcile(Object.values(plugins).filter((p3) => (p3.startAt ?? StartAt.Init) === stage).map((p3) => p3.name));
  }
  function sensitiveKeys(name) {
    const def = plugins[name]?.settings?.def;
    return def ? Object.keys(def).filter((k4) => def[k4]?.sensitive) : [];
  }
  function getVisibleSettings(p3) {
    const def = p3?.settings?.def;
    if (!def) return [];
    return Object.entries(def).filter(([, s3]) => s3 && !s3.hidden && s3.type !== OptionType.CUSTOM);
  }
  function migratePluginSettings(name, ...oldNames) {
    const all = PlainSettings.plugins;
    const cur = all[name];
    if (cur && Object.keys(cur).length) return false;
    for (const old of oldNames) {
      if (old !== name && all[old] && typeof all[old] === "object") {
        Settings.plugins[name] = { ...all[old] };
        delete Settings.plugins[old];
        logger19.info(`已把插件设置 ${old} 迁移到 ${name}`);
        return true;
      }
    }
    return false;
  }
  function migratePluginSetting(pluginName, newKey, oldKey) {
    const s3 = PlainSettings.plugins[pluginName];
    if (!s3 || !(oldKey in s3) || newKey in s3) return false;
    Settings.plugins[pluginName][newKey] = s3[oldKey];
    delete Settings.plugins[pluginName][oldKey];
    return true;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/backup.js
  var logger20 = new Logger("Backup", "#93c5fd");
  var BACKUP_FORMAT = "userscript-pp-settings";
  var clone2 = (v3) => parseStored(serialize(v3)) ?? JSON.parse(serialize(v3));
  function exportSettings({ includeSensitive = false } = {}) {
    const settings2 = clone2(PlainSettings);
    if (!includeSensitive) {
      for (const name of Object.keys(settings2.plugins || {})) {
        for (const k4 of sensitiveKeys(name)) if (settings2.plugins[name] && k4 in settings2.plugins[name]) delete settings2.plugins[name][k4];
      }
    }
    return { format: BACKUP_FORMAT, version: VERSION, exportedAt: (/* @__PURE__ */ new Date()).toISOString(), settings: settings2 };
  }
  async function exportSettingsWithData(opts = {}) {
    const out = exportSettings(opts);
    out.data = await exportData(Object.keys(plugins));
    return out;
  }
  function parseBackup(text) {
    let obj;
    try {
      obj = typeof text === "string" ? JSON.parse(text) : text;
    } catch {
      throw new Error("This file is not valid JSON.");
    }
    const settings2 = obj && obj.format === BACKUP_FORMAT ? obj.settings : obj;
    const data = parseStored(settings2);
    if (!data) throw new Error("No Userscript++ settings found in this file.");
    const names = Object.keys(data.plugins);
    const s3 = data.plugins.Settings || {};
    const parts = s3.sites && typeof s3.sites === "object" ? Object.values(s3.sites) : [];
    const themes = parts.reduce((n2, p3) => n2 + (Array.isArray(p3?.themes) ? p3.themes.length : 0), Array.isArray(s3.themes) ? s3.themes.length : 0);
    const pluginData = obj && obj.format === BACKUP_FORMAT && obj.data && typeof obj.data === "object" ? obj.data : null;
    return {
      settings: data,
      data: pluginData,
      summary: {
        dataPlugins: pluginData ? Object.keys(pluginData).length : 0,
        plugins: names.length,
        enabled: names.filter((n2) => data.plugins[n2]?.enabled === true).length,
        themes,
        sites: parts.length,
        quickCss: parts.some((p3) => typeof p3?.customCSS === "string" && p3.customCSS.length > 0) || typeof s3.customCSS === "string" && s3.customCSS.length > 0,
        version: obj?.version ?? null,
        exportedAt: obj?.exportedAt ?? null
      }
    };
  }
  function checkValue(def, check2, v3) {
    if (!def) return null;
    const t3 = def.type;
    if (t3 === OptionType.BOOLEAN && typeof v3 !== "boolean") return "expected true or false";
    if ((t3 === OptionType.NUMBER || t3 === OptionType.SLIDER) && !(typeof v3 === "number" && Number.isFinite(v3))) return "expected a number";
    if (t3 === OptionType.SLIDER && (v3 < def.min || v3 > def.max)) return `expected ${def.min}–${def.max}`;
    if (t3 === OptionType.BIGINT && typeof v3 !== "bigint") return "expected an integer";
    if (t3 === OptionType.STRING && typeof v3 !== "string") return "expected text";
    if (t3 === OptionType.SELECT && !(def.options || []).some((o3) => o3.value === v3)) return "not one of the options";
    if (typeof check2?.isValid === "function") {
      let r3;
      try {
        r3 = check2.isValid(v3);
      } catch (e3) {
        return e3?.message || "invalid value";
      }
      if (r3 === false) return "invalid value";
      if (typeof r3 === "string") return r3;
    }
    return null;
  }
  function sanitizeImport(data) {
    const invalid = [];
    for (const [name, conf] of Object.entries(data?.plugins || {})) {
      if (!conf || typeof conf !== "object" || Array.isArray(conf)) {
        delete data.plugins[name];
        invalid.push({ plugin: name, key: "*", reason: "not an object" });
        continue;
      }
      const p3 = plugins[name];
      if (!p3) continue;
      if ("enabled" in conf && typeof conf.enabled !== "boolean") {
        delete conf.enabled;
        invalid.push({ plugin: name, key: "enabled", reason: "expected true or false" });
      }
      const def = p3.settings?.def || {};
      const checks = p3.settings?.checks || {};
      for (const key of Object.keys(conf)) {
        if (key === "enabled" || !(key in def)) continue;
        const why = checkValue(def[key], checks[key], conf[key]);
        if (why) {
          delete conf[key];
          invalid.push({ plugin: name, key, reason: why });
        }
      }
    }
    return invalid;
  }
  function previewImport(settings2) {
    const data = clone2(settings2);
    const invalid = sanitizeImport(data);
    const turnOn = [], turnOff = [];
    let changed = 0;
    for (const [name, p3] of Object.entries(plugins)) {
      if (p3.required || p3.hidden) continue;
      const inc = data.plugins?.[name];
      const next = typeof inc?.enabled === "boolean" ? inc.enabled : !!p3.enabledByDefault;
      const now2 = isPluginEnabled(name);
      if (next !== now2) (next ? turnOn : turnOff).push(name);
      for (const key of Object.keys(p3.settings?.def || {})) {
        if (inc && key in inc && serialize(inc[key]) !== serialize(PlainSettings.plugins[name]?.[key])) changed++;
      }
    }
    return { turnOn, turnOff, changed, invalid };
  }
  var UNDO_KEY = "UserscriptPPImportUndo";
  var UNDO_MS = 7 * 24 * 60 * 60 * 1e3;
  var undoCache;
  async function readUndo() {
    if (undoCache !== void 0) return undoCache;
    let v3 = null;
    try {
      v3 = GM2.get ? await GM2.get(UNDO_KEY) : null;
    } catch {
      v3 = null;
    }
    if (typeof v3 === "string") {
      try {
        v3 = JSON.parse(v3);
      } catch {
        v3 = null;
      }
    }
    undoCache = v3 && typeof v3 === "object" && Date.now() - (v3.at || 0) < UNDO_MS ? v3 : null;
    return undoCache;
  }
  async function writeUndo(v3) {
    undoCache = v3;
    try {
      if (!GM2.set) return;
      const r3 = v3 ? GM2.set(UNDO_KEY, JSON.stringify(v3)) : GM2.del ? GM2.del(UNDO_KEY) : GM2.set(UNDO_KEY, "");
      if (r3 && typeof r3.then === "function") await r3;
    } catch (e3) {
      logger20.warn("保存导入前的设置失败", e3);
    }
  }
  var canUndoImport = () => !!undoCache;
  async function lastImport() {
    const u3 = await readUndo();
    return u3 ? { at: u3.at } : null;
  }
  async function apply(data, pluginData) {
    const before = Object.fromEntries(Object.keys(plugins).map((n2) => [n2, isPluginEnabled(n2)]));
    const reloadBefore = new Set(pendingReload);
    for (const name of Object.keys(plugins)) data.plugins[name] ??= {};
    replaceAll(data);
    for (const [name, was] of Object.entries(before)) {
      const now2 = isPluginEnabled(name);
      if (was !== now2) dispatch(Events.PLUGIN_TOGGLE, { name, enabled: now2 });
    }
    try {
      reconcile();
    } catch (e3) {
      logger20.error("导入后启停插件失败", e3);
    }
    try {
      checkReload();
    } catch (e3) {
      logger20.error("重算要刷新的插件出错", e3);
    }
    const reload = [...pendingReload].some((n2) => !reloadBefore.has(n2));
    await saveNow({ flushBackup: true });
    if (pluginData) {
      try {
        await importData(pluginData);
      } catch (e3) {
        logger20.error("导入插件数据失败", e3);
      }
    }
    return reload;
  }
  var lastInvalid = [];
  var lastImportInvalid = () => lastInvalid.slice();
  async function importSettings(settings2, { data: pluginData } = {}) {
    const data = clone2(settings2);
    data.plugins ??= {};
    lastInvalid = sanitizeImport(data);
    if (lastInvalid.length) logger20.warn(`导入时丢掉了 ${lastInvalid.length} 个不合法的设置项`, lastInvalid);
    for (const name of Object.keys(PlainSettings.plugins)) {
      for (const k4 of sensitiveKeys(name)) {
        const cur = PlainSettings.plugins[name]?.[k4];
        const inc = data.plugins[name]?.[k4];
        if ((inc == null || inc === "") && cur != null && cur !== "") (data.plugins[name] ??= {})[k4] = cur;
      }
    }
    let prevData = null;
    if (pluginData) {
      try {
        prevData = await exportData(Object.keys(pluginData));
      } catch {
        prevData = null;
      }
    }
    await writeUndo({ at: Date.now(), settings: serialize(PlainSettings), data: prevData });
    return apply(data, pluginData);
  }
  async function undoImport() {
    const u3 = await readUndo();
    if (!u3) return null;
    const data = parseStored(u3.settings);
    if (!data) {
      await writeUndo(null);
      return null;
    }
    const reload = await apply(data, u3.data || null);
    await writeUndo(null);
    lastInvalid = [];
    return reload;
  }
  function downloadJson(obj, filename) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a3 = document.createElement("a");
    a3.href = url;
    a3.download = filename;
    a3.style.display = "none";
    (document.body || document.documentElement).appendChild(a3);
    a3.click();
    setTimeout(() => {
      a3.remove();
      URL.revokeObjectURL(url);
    }, 1e3);
  }
  var backupFilename = () => `userscript-pp-settings-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
  function pickJsonFile() {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";
      input.style.display = "none";
      input.onchange = () => {
        const f3 = input.files?.[0];
        input.remove();
        if (!f3) return resolve(null);
        f3.text().then(resolve, () => resolve(null));
      };
      (document.body || document.documentElement).appendChild(input);
      input.click();
    });
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/themes.js
  var CONNECT2 = allowedHosts();
  var logger21 = new Logger("Themes", "#fcd34d");
  var cssCache = /* @__PURE__ */ new Map();
  var applied = /* @__PURE__ */ new Set();
  var CACHE_KEY = "UserscriptPPThemeCache";
  var REFRESH_MS2 = 24 * 60 * 60 * 1e3;
  var diskCache = null;
  function readDisk() {
    if (diskCache) return diskCache;
    diskCache = {};
    try {
      const v3 = GM2.get ? GM2.get(CACHE_KEY) : null;
      if (v3 && typeof v3 === "object" && typeof v3.then !== "function") diskCache = { ...v3 };
      else if (typeof v3 === "string") diskCache = JSON.parse(v3) || {};
    } catch {
      diskCache = {};
    }
    return diskCache;
  }
  function writeDisk() {
    try {
      const r3 = GM2.set?.(CACHE_KEY, diskCache || {});
      r3?.catch?.(() => {
      });
    } catch (e3) {
      logger21.debug("写入主题缓存失败", e3);
    }
  }
  function cacheCss(url, css) {
    cssCache.set(url, css);
    readDisk()[url] = { css, at: Date.now() };
    writeDisk();
  }
  function dropCache(url) {
    cssCache.delete(url);
    if (readDisk()[url]) {
      delete diskCache[url];
      writeDisk();
    }
  }
  var SITES_PATH = "plugins.Settings.sites";
  var EMPTY = Object.freeze({});
  function readPartition(key = siteKey()) {
    const p3 = raw().sites?.[key];
    return p3 && typeof p3 === "object" ? p3 : EMPTY;
  }
  function writePartition(key = siteKey()) {
    const r3 = raw();
    if (!r3.sites || typeof r3.sites !== "object" || Array.isArray(r3.sites)) S2().sites = {};
    if (!r3.sites[key] || typeof r3.sites[key] !== "object") S2().sites[key] = {};
    return S2().sites[key];
  }
  var themesOf = (part) => Array.isArray(part?.themes) ? part.themes : [];
  var listeners7 = /* @__PURE__ */ new Set();
  var emit6 = () => {
    for (const l3 of [...listeners7]) {
      try {
        l3();
      } catch {
      }
    }
  };
  var subscribeThemes = (fn2) => {
    listeners7.add(fn2);
    return () => listeners7.delete(fn2);
  };
  var S2 = () => Settings.plugins.Settings;
  var raw = () => PlainSettings.plugins.Settings ??= {};
  var styleName = (id) => `theme:${id}`;
  function themesList() {
    return themesOf(readPartition());
  }
  var getThemes = () => themesList().map((t3) => ({ ...t3 }));
  function foreignAllSiteThemes() {
    const key = siteKey(), out = [];
    for (const [k4, part] of Object.entries(raw().sites || {})) if (k4 !== key) {
      for (const t3 of themesOf(part)) if (t3?.allSites) out.push(t3);
    }
    return out;
  }
  var isThemesEnabled = () => raw().themesEnabled !== false;
  var isOnlineThemesEnabled = () => raw().onlineThemesEnabled !== false;
  function saveThemes(list2) {
    writePartition().themes = list2.map((t3) => ({ ...t3 }));
    emit6();
  }
  function parseThemeMeta(css) {
    const meta2 = {};
    const m3 = /\/\*\*([\s\S]*?)\*\//.exec(css);
    if (m3) {
      for (const line of m3[1].split(/\r?\n/)) {
        const mm = /@(name|author|description)\s+(.+)$/.exec(line.replace(/^\s*\*?\s*/, ""));
        if (mm) meta2[mm[1]] = mm[2].trim();
      }
    }
    return meta2;
  }
  function nameFromUrl(url) {
    try {
      const file = decodeURIComponent(new URL(url).pathname.split("/").pop() || "");
      return file.replace(/\.css$/i, "").replace(/[-_]+/g, " ").trim() || url;
    } catch {
      return url;
    }
  }
  function validateThemeUrl(url) {
    let u3;
    try {
      u3 = new URL(String(url).trim());
    } catch {
      return "Enter a valid URL.";
    }
    if (u3.protocol !== "https:") return "Enter a valid URL.";
    if (!/\.css$/i.test(u3.pathname)) return "URL must point to a .css file.";
    return null;
  }
  async function fetchCss(url) {
    let res;
    try {
      res = await fetchExternal(url, { timeout: 3e4 });
    } catch (e3) {
      const host2 = (() => {
        try {
          return new URL(url).hostname;
        } catch {
          return "";
        }
      })();
      const allowed2 = hostAllowed(host2);
      if (host2 && !allowed2) throw new Error(`Failed to fetch theme: ${host2} is not in this script's allowed hosts (${CONNECT2.join(", ")}). Host the CSS there, or ask the script's developer to add the host.`);
      throw new Error(`Failed to fetch theme (${e3?.message || "network error"}).`);
    }
    if (!res.ok) throw new Error(`Failed to fetch theme (${res.status}).`);
    const css = await res.text();
    if (!css.trim()) throw new Error("Theme file is empty.");
    return css;
  }
  function applyTheme(t3) {
    const name = styleName(t3.url);
    if (!isThemesEnabled() || !t3.enabled) {
      disableStyle(name);
      return;
    }
    applied.add(t3.url);
    if (t3.local) {
      registerStyle(name, t3.css || "");
      return;
    }
    if (!isOnlineThemesEnabled()) {
      disableStyle(name);
      return;
    }
    const mem2 = cssCache.get(t3.url);
    if (mem2 != null) {
      registerStyle(name, mem2);
      return;
    }
    const disk = readDisk()[t3.url];
    if (disk && typeof disk.css === "string") {
      cssCache.set(t3.url, disk.css);
      registerStyle(name, disk.css);
      if (Date.now() - (disk.at || 0) < REFRESH_MS2) return;
    }
    fetchCss(t3.url).then((css) => {
      cacheCss(t3.url, css);
      const cur = [...themesList(), ...foreignAllSiteThemes()].find((x4) => x4.url === t3.url);
      if (!cur || !cur.enabled || !isThemesEnabled() || !isOnlineThemesEnabled()) return;
      registerStyle(name, css);
    }).catch((e3) => logger21.warn(`加载在线主题失败${disk ? "(继续使用缓存)" : ""}:${t3.url}`, e3.message));
  }
  function applyAllThemes() {
    const list2 = [...themesList(), ...foreignAllSiteThemes()];
    const ids = new Set(list2.map((t3) => t3.url));
    for (const id of [...applied]) if (!ids.has(id)) {
      unregisterStyle(styleName(id));
      applied.delete(id);
    }
    for (const t3 of list2) applyTheme(t3);
  }
  async function addTheme(url) {
    url = String(url || "").trim();
    const err = validateThemeUrl(url);
    if (err) throw new Error(err);
    if (themesList().some((t3) => t3.url === url)) throw new Error("This theme is already added.");
    const css = await fetchCss(url);
    cacheCss(url, css);
    const meta2 = parseThemeMeta(css);
    const theme = { url, name: meta2.name || nameFromUrl(url), author: meta2.author || "", description: meta2.description || "", enabled: false };
    if (themesList().some((t3) => t3.url === url)) throw new Error("This theme is already added.");
    saveThemes([...themesList(), theme]);
    return { ...theme };
  }
  var randomId = () => "local-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  function addLocalTheme(name, css) {
    const meta2 = parseThemeMeta(css || "");
    const theme = {
      url: randomId(),
      name: String(name || "").trim() || meta2.name || "Untitled",
      author: meta2.author || "Local",
      description: meta2.description || "",
      enabled: false,
      local: true,
      css: String(css || "")
    };
    saveThemes([...themesList(), theme]);
    return { ...theme };
  }
  function updateLocalTheme(id, { name, css } = {}) {
    const list2 = themesList().map((t4) => ({ ...t4 }));
    const t3 = list2.find((x4) => x4.url === id && x4.local);
    if (!t3) return false;
    if (name != null) t3.name = String(name);
    if (css != null) {
      t3.css = String(css);
      const meta2 = parseThemeMeta(t3.css);
      if (meta2.description != null) t3.description = meta2.description;
      if (meta2.author) t3.author = meta2.author;
    }
    saveThemes(list2);
    applyTheme(t3);
    return true;
  }
  function removeTheme(id) {
    const list2 = themesList();
    if (!list2.some((t3) => t3.url === id)) return false;
    unregisterStyle(styleName(id));
    applied.delete(id);
    dropCache(id);
    saveThemes(list2.filter((t3) => t3.url !== id));
    return true;
  }
  function setEnabled(id, enabled) {
    const list2 = themesList().map((t4) => ({ ...t4 }));
    const t3 = list2.find((x4) => x4.url === id);
    if (!t3) return false;
    t3.enabled = enabled;
    saveThemes(list2);
    if (enabled) applyTheme(t3);
    else disableStyle(styleName(id));
    return true;
  }
  var enableTheme = (id) => setEnabled(id, true);
  var disableTheme = (id) => setEnabled(id, false);
  function setThemeAllSites(id, allSites) {
    const list2 = themesList().map((t4) => ({ ...t4 }));
    const t3 = list2.find((x4) => x4.url === id);
    if (!t3) return false;
    if (allSites) t3.allSites = true;
    else delete t3.allSites;
    saveThemes(list2);
    applyTheme(t3);
    return true;
  }
  function setThemesEnabled(b3) {
    S2().themesEnabled = !!b3;
    if (b3) applyAllThemes();
    else for (const t3 of [...themesList(), ...foreignAllSiteThemes()]) disableStyle(styleName(t3.url));
    emit6();
  }
  function setOnlineThemesEnabled(b3) {
    S2().onlineThemesEnabled = !!b3;
    for (const t3 of [...themesList(), ...foreignAllSiteThemes()]) if (!t3.local) {
      if (b3) applyTheme(t3);
      else disableStyle(styleName(t3.url));
    }
    emit6();
  }
  var QUICK_CSS = "quick-css";
  function getQuickCss() {
    const p3 = readPartition();
    return { css: p3.customCSS || "", enabled: p3.customCSSEnabled !== false };
  }
  function setQuickCss({ css, enabled } = {}) {
    const st = writePartition();
    if (css != null) st.customCSS = String(css);
    if (enabled != null) st.customCSSEnabled = !!enabled;
  }
  function applyQuickCss() {
    const { css, enabled } = getQuickCss();
    if (enabled && css) registerStyle(QUICK_CSS, css);
    else disableStyle(QUICK_CSS);
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/menu.js
  var logger22 = new Logger("Menu", "#fcd34d");
  var registered = /* @__PURE__ */ new Map();
  function sync2() {
    if (!GM2.menu) return;
    const items = getSlotItems("menuCommand");
    const ids = new Set(items.map((d3) => d3.id));
    for (const [id, r3] of registered) {
      if (ids.has(id)) continue;
      try {
        GM2.unmenu?.(r3.handle);
      } catch {
      }
      registered.delete(id);
    }
    for (const d3 of items) {
      const label = String(d3.label ?? d3.id);
      const r3 = registered.get(d3.id);
      if (r3 && r3.label === label) {
        r3.def = d3;
        continue;
      }
      if (r3) {
        try {
          GM2.unmenu?.(r3.handle);
        } catch {
        }
      }
      const entry = { label, def: d3, handle: null };
      try {
        entry.handle = GM2.menu(label, () => {
          try {
            (entry.def.onSelect || entry.def.onClick)?.({});
          } catch (e3) {
            logger22.error(`菜单命令 ${label} 出错`, e3);
          }
        });
      } catch (e3) {
        logger22.debug("注册菜单命令失败", e3);
      }
      registered.set(d3.id, entry);
    }
  }
  var installed6 = false;
  function installMenuCommands() {
    if (installed6) return;
    installed6 = true;
    onSlotChange("menuCommand", sync2);
    sync2();
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/fiber.js
  function getFiber(el) {
    if (!el) return null;
    for (const k4 of Object.keys(el)) {
      if (k4.startsWith("__reactFiber$") || k4.startsWith("__reactInternalInstance$")) return el[k4];
    }
    return null;
  }
  function getProps(el) {
    if (!el) return null;
    for (const k4 of Object.keys(el)) if (k4.startsWith("__reactProps$")) return el[k4];
    return null;
  }
  function walkFiberUp(fiber, predicate, max = 200) {
    for (let f3 = fiber, i3 = 0; f3 && i3 < max; f3 = f3.return, i3++) {
      try {
        if (predicate(f3)) return f3;
      } catch {
      }
    }
    return null;
  }
  function findFiberProps(el, key, max = 200) {
    const f3 = walkFiberUp(getFiber(el), (f4) => f4.memoizedProps && key in f4.memoizedProps, max);
    return f3 ? f3.memoizedProps : null;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/components.js
  var components_exports = {};
  __export(components_exports, {
    Button: () => Button,
    CodeEditor: () => CodeEditor,
    Fragment: () => Fragment,
    IconButton: () => IconButton,
    Input: () => Input,
    Row: () => Row,
    Select: () => Select,
    Switch: () => Switch,
    Textarea: () => Textarea,
    Tooltip: () => Tooltip
  });

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/highlight.js
  var esc2 = (s3) => s3.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  var span = (k4, t3) => `<span class="uspp-ggpp-hl-${k4}">${esc2(t3)}</span>`;
  var TOKEN = /\/\*[\s\S]*?(?:\*\/|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|@[\w-]+|#[\da-fA-F]{3,8}\b|-?(?:\d+\.?\d*|\.\d+)(?:%|[a-zA-Z]+)?|!important\b|--[\w-]+|[\w-]+|[{}:;,()]/g;
  function highlightCss(css) {
    let out = "", last2 = 0, depth = 0, afterColon = false, inParen = 0;
    const src = String(css ?? "");
    for (const m3 of src.matchAll(TOKEN)) {
      const t3 = m3[0], i3 = m3.index;
      if (i3 > last2) out += esc2(src.slice(last2, i3));
      last2 = i3 + t3.length;
      const c3 = t3[0];
      if (t3.startsWith("/*")) out += span("comment", t3);
      else if (c3 === '"' || c3 === "'") out += span("string", t3);
      else if (c3 === "@") out += span("at", t3);
      else if (t3 === "{") {
        depth++;
        afterColon = false;
        out += span("punct", t3);
      } else if (t3 === "}") {
        depth = Math.max(0, depth - 1);
        afterColon = false;
        out += span("punct", t3);
      } else if (t3 === ";") {
        afterColon = false;
        out += span("punct", t3);
      } else if (t3 === ":") {
        if (depth > 0 && !inParen) afterColon = true;
        out += span("punct", t3);
      } else if (t3 === "(") {
        inParen++;
        out += span("punct", t3);
      } else if (t3 === ")") {
        inParen = Math.max(0, inParen - 1);
        out += span("punct", t3);
      } else if (t3 === ",") out += span("punct", t3);
      else if (c3 === "#" && afterColon) out += span("color", t3);
      else if (t3 === "!important") out += span("important", t3);
      else if (/^-?[\d.]/.test(t3)) out += span(afterColon || depth === 0 ? "number" : "selector", t3);
      else if (t3.startsWith("--")) out += span(afterColon ? "value" : "variable", t3);
      else if (depth > 0 && !afterColon) out += span(inParen ? "value" : "property", t3);
      else if (afterColon) out += span(src[last2] === "(" ? "function" : "value", t3);
      else out += span("selector", t3);
    }
    if (last2 < src.length) out += esc2(src.slice(last2));
    return out;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/components.js
  function withFallback(nativeRender, fallbackRender, label) {
    return (props) => {
      const fb = fallbackRender(props);
      let g5 = null;
      try {
        g5 = nativeRender(props);
      } catch {
        g5 = null;
      }
      if (!g5) return fb;
      return h(ErrorBoundary, { fallback: fb, label }, g5);
    };
  }
  var Button = withFallback(
    ({ variant = "outline", size = "md", onClick, disabled, children, title, className, type = "button" }) => {
      const B4 = siteComponent("Button");
      if (!B4) return null;
      const v3 = variant === "danger" ? "danger" : variant;
      return h(B4, { variant: v3, size, shape: "pill", onClick, disabled, title, className, type }, children);
    },
    ({ variant = "outline", size, onClick, disabled, children, title, className, type = "button" }) => h("button", {
      type,
      onClick,
      disabled,
      title,
      className: classes("uspp-ggpp-btn", variant === "primary" && "uspp-ggpp-btn-primary", variant === "danger" && "uspp-ggpp-btn-danger", variant === "ghost" && "uspp-ggpp-btn-ghost", size === "sm" && "uspp-ggpp-btn-sm", className)
    }, children),
    "Button"
  );
  function IconButton({ icon: Icon, label, onClick, active: active2, disabled, className, size = 4 }) {
    return h("button", {
      type: "button",
      "aria-label": label,
      title: label,
      onClick,
      disabled,
      className: classes("uspp-ggpp-btn", "uspp-ggpp-btn-icon", active2 && "uspp-ggpp-active", className)
    }, h(Icon, { size }));
  }
  var Switch = withFallback(
    ({ checked, onChange, disabled, label }) => {
      const S3 = siteComponent("Switch");
      if (!S3) return null;
      return h(S3, { checked: !!checked, onCheckedChange: (v3) => onChange?.(!!v3), disabled: !!disabled, "aria-label": label });
    },
    ({ checked, onChange, disabled, label }) => h("button", {
      type: "button",
      role: "switch",
      "aria-checked": !!checked,
      "aria-label": label,
      "data-checked": String(!!checked),
      className: "uspp-ggpp-switch",
      disabled: !!disabled,
      onClick: () => onChange?.(!checked)
    }),
    "Switch"
  );
  var Select = withFallback(
    ({ value, options, onChange, label }) => {
      const [S3, SelectTrigger, SelectValue, SelectContent, SelectItem] = ["Select", "SelectTrigger", "SelectValue", "SelectContent", "SelectItem"].map(siteComponent);
      if (!S3 || !SelectTrigger || !SelectValue || !SelectContent || !SelectItem) return null;
      const idx = options.findIndex((o3) => Object.is(o3.value, value));
      return h(
        S3,
        { value: idx >= 0 ? String(idx) : void 0, onValueChange: (v3) => onChange?.(options[+v3]?.value) },
        h(SelectTrigger, { "aria-label": label, style: { minWidth: 140 } }, h(SelectValue, null)),
        h(SelectContent, null, options.map((o3, i3) => h(SelectItem, { key: i3, value: String(i3) }, o3.label)))
      );
    },
    ({ value, options, onChange, label }) => {
      const idx = options.findIndex((o3) => Object.is(o3.value, value));
      return h(
        "select",
        { className: "uspp-ggpp-select", "aria-label": label, value: idx >= 0 ? String(idx) : "", onChange: (e3) => onChange?.(options[+e3.target.value]?.value) },
        idx < 0 && h("option", { value: "" }, ""),
        options.map((o3, i3) => h("option", { key: i3, value: String(i3) }, o3.label))
      );
    },
    "Select"
  );
  function Input(props) {
    const { className, onEnter, ...rest } = props;
    return h("input", {
      ...rest,
      className: classes("uspp-ggpp-input", className),
      onKeyDown: (e3) => {
        if (e3.key === "Enter" && onEnter) {
          e3.preventDefault();
          onEnter(e3);
        }
        rest.onKeyDown?.(e3);
      }
    });
  }
  function CodeEditor({ value, onChange, placeholder, readOnly, minHeight = 240, language }) {
    const pre = useRef(null);
    const sync3 = (t3) => {
      if (pre.current) {
        pre.current.scrollTop = t3.scrollTop;
        pre.current.scrollLeft = t3.scrollLeft;
      }
    };
    const area = h("textarea", {
      className: classes("uspp-ggpp-textarea", language && "uspp-ggpp-code-input"),
      value,
      placeholder,
      readOnly: !!readOnly,
      spellCheck: false,
      style: { minHeight },
      "data-language": language || void 0,
      onChange: (e3) => onChange?.(e3.target.value),
      onScroll: (e3) => sync3(e3.target),
      onKeyDown: (e3) => {
        if (e3.key === "Tab" && !readOnly) {
          e3.preventDefault();
          const t3 = e3.target, s3 = t3.selectionStart, en2 = t3.selectionEnd;
          const next = t3.value.slice(0, s3) + "    " + t3.value.slice(en2);
          onChange?.(next);
          requestAnimationFrame(() => {
            t3.selectionStart = t3.selectionEnd = s3 + 4;
          });
        }
      }
    });
    if (language !== "css") return area;
    return h(
      "div",
      { className: classes("uspp-ggpp-code", readOnly && "uspp-ggpp-code-readonly") },
      h("pre", { ref: pre, className: "uspp-ggpp-code-hl", "aria-hidden": "true", dangerouslySetInnerHTML: { __html: highlightCss(value || "") + "\n" } }),
      area
    );
  }
  var Tooltip = withFallback(
    ({ content, children }) => {
      const [T4, TooltipTrigger, TooltipContent] = ["Tooltip", "TooltipTrigger", "TooltipContent"].map(siteComponent);
      if (!T4 || !TooltipTrigger || !TooltipContent || !content) return null;
      return h(T4, null, h(TooltipTrigger, { asChild: true }, children), h(TooltipContent, null, content));
    },
    ({ content, children }) => h("span", { title: typeof content === "string" ? content : void 0, style: { display: "inline-flex" } }, children),
    "Tooltip"
  );
  function Textarea(props) {
    const { className, rows = 4, ...rest } = props;
    return h("textarea", { ...rest, rows, className: classes("uspp-ggpp-input", "uspp-ggpp-textarea-plain", className) });
  }
  function Row({ title, description, children }) {
    return h(
      "div",
      { className: "uspp-ggpp-row" },
      h(
        "div",
        { className: "uspp-ggpp-row-text" },
        h("div", { className: "uspp-ggpp-row-title" }, title),
        description && h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, description)
      ),
      children
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/kit.js
  var kit_exports = {};
  __export(kit_exports, {
    ColorSettingRow: () => ColorSettingRow,
    ErrorCard: () => ErrorCard,
    Flex: () => Flex,
    Grid: () => Grid,
    InfoHint: () => InfoHint,
    Paragraph: () => Paragraph,
    SectionHeader: () => SectionHeader,
    SelectionActionBar: () => SelectionActionBar,
    SelectionCheckbox: () => SelectionCheckbox,
    Text: () => Text,
    useAsyncAction: () => useAsyncAction,
    useExternalStore: () => useExternalStore,
    useFiltered: () => useFiltered
  });
  var gap = (v3) => typeof v3 === "number" ? `${v3}px` : v3;
  function Flex({ direction = "row", gap: g5 = 8, align, justify, wrap: wrap2, className, style, children, ...rest }) {
    return h("div", {
      ...rest,
      className: classes("uspp-ggpp-flex", className),
      style: { display: "flex", flexDirection: direction, gap: gap(g5), alignItems: align, justifyContent: justify, flexWrap: wrap2 ? "wrap" : void 0, ...style }
    }, children);
  }
  function Grid({ columns = 2, minWidth, gap: g5 = 12, className, style, children, ...rest }) {
    const tpl = minWidth ? `repeat(auto-fill, minmax(${gap(minWidth)}, 1fr))` : typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns;
    return h("div", { ...rest, className: classes("uspp-ggpp-grid", className), style: { display: "grid", gridTemplateColumns: tpl, gap: gap(g5), ...style } }, children);
  }
  var SIZES = { xs: 11, sm: 12, md: 14, lg: 16, xl: 20 };
  var WEIGHTS = { normal: 400, medium: 500, semibold: 600, bold: 700 };
  var COLORS3 = { primary: "var(--uspp-ggpp-fg-primary)", secondary: "var(--uspp-ggpp-fg-secondary)", tertiary: "var(--uspp-ggpp-fg-tertiary)", danger: "var(--uspp-ggpp-fg-danger)" };
  function Text({ as = "span", size = "md", weight = "normal", color = "primary", mono, className, style, children, ...rest }) {
    return h(as, {
      ...rest,
      className: classes("uspp-ggpp-text", className),
      style: { fontSize: SIZES[size] ?? size, fontWeight: WEIGHTS[weight] ?? weight, color: COLORS3[color] ?? color, fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" : void 0, ...style }
    }, children);
  }
  function Paragraph({ size = "sm", color = "secondary", children, ...rest }) {
    return h(Text, { as: "p", size, color, style: { margin: 0, lineHeight: 1.5 }, ...rest }, children);
  }
  function SectionHeader({ title, description, action, className }) {
    return h(
      "div",
      { className: classes("uspp-ggpp-section-header", className) },
      h(
        "div",
        { className: "uspp-ggpp-row-text" },
        h(Text, { as: "h3", size: "lg", weight: "semibold", style: { margin: 0 } }, title),
        description && h(Paragraph, null, description)
      ),
      action || null
    );
  }
  function InfoHint({ type = "info", title, children, className }) {
    return h(
      "div",
      { className: classes("uspp-ggpp-hint", className), "data-type": type, role: type === "danger" ? "alert" : "note" },
      title && h("div", { className: "uspp-ggpp-hint-title" }, title),
      children && h("div", null, children)
    );
  }
  function ErrorCard({ title = "Something went wrong", error, onRetry, className }) {
    const [open, setOpen] = useState(false);
    const detail = error == null ? "" : error instanceof Error ? error.stack || String(error) : String(error);
    return h(
      "div",
      { className: classes("uspp-ggpp-hint", "uspp-ggpp-error-card", className), "data-type": "danger", role: "alert" },
      h("div", { className: "uspp-ggpp-hint-title" }, title),
      error != null && h("div", { className: "uspp-ggpp-small" }, error instanceof Error ? error.message : String(error).split("\n")[0]),
      h(
        "div",
        { style: { display: "flex", gap: 8, marginTop: 6 } },
        onRetry && h("button", { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-sm", onClick: onRetry }, "Retry"),
        detail && h("button", { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-sm uspp-ggpp-btn-ghost", onClick: () => setOpen(!open) }, open ? "Hide details" : "Details")
      ),
      open && h("pre", { className: "uspp-ggpp-error-detail" }, detail)
    );
  }
  var HEX3 = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
  function ColorSettingRow({ title, description, value, onChange, allowClear = true }) {
    const [text, setText2] = useState(value || "");
    useEffect(() => {
      setText2(value || "");
    }, [value]);
    const commit = (v3) => {
      const t3 = String(v3).trim();
      if (!t3 && allowClear) return onChange?.(null);
      if (HEX3.test(t3)) onChange?.(t3.length === 4 ? `#${[...t3.slice(1)].map((c3) => c3 + c3).join("")}`.toLowerCase() : t3.toLowerCase());
      else setText2(value || "");
    };
    return h(
      "div",
      { className: "uspp-ggpp-row" },
      h("div", { className: "uspp-ggpp-row-text" }, h("div", { className: "uspp-ggpp-row-title" }, title), description && h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, description)),
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 8 } },
        h("input", { type: "color", className: "uspp-ggpp-color-swatch", "aria-label": title, value: HEX3.test(value || "") ? value : "#000000", onChange: (e3) => {
          setText2(e3.target.value);
          onChange?.(e3.target.value);
        } }),
        h("input", { type: "text", className: "uspp-ggpp-input", style: { width: 96 }, value: text, placeholder: allowClear ? "default" : "#000000", "aria-label": `${title} hex`, onChange: (e3) => setText2(e3.target.value), onBlur: (e3) => commit(e3.target.value), onKeyDown: (e3) => {
          if (e3.key === "Enter") commit(e3.target.value);
        } })
      )
    );
  }
  function useExternalStore(store) {
    const [, force] = useReducer((x4) => x4 + 1, 0);
    useEffect(() => store.subscribe(() => force()), [store]);
    return store;
  }
  function SelectionCheckbox({ selection, id, label }) {
    useExternalStore(selection);
    return h("input", { type: "checkbox", className: "uspp-ggpp-checkbox", "aria-label": label || "Select", checked: selection.has(id), onChange: () => selection.toggle(id), onClick: (e3) => e3.stopPropagation() });
  }
  function SelectionActionBar({ selection, noun = "item", allIds, actions = [], onDelete }) {
    useExternalStore(selection);
    const n2 = selection.size;
    if (!n2) return null;
    const list2 = [...actions, ...onDelete ? [{ label: "Delete", danger: true, onClick: onDelete }] : []];
    return h(
      "div",
      { className: "uspp-ggpp-selection-bar", role: "toolbar" },
      h("span", { className: "uspp-ggpp-small" }, `${n2} ${noun}${n2 === 1 ? "" : "s"} selected`),
      h(
        "div",
        { style: { display: "flex", gap: 8, marginInlineStart: "auto" } },
        allIds && n2 < allIds.length && h("button", { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-sm uspp-ggpp-btn-ghost", onClick: () => selection.setAll(allIds) }, "Select all"),
        h("button", { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-sm uspp-ggpp-btn-ghost", onClick: () => selection.clear() }, "Clear"),
        list2.map((a3, i3) => h("button", { key: i3, type: "button", className: classes("uspp-ggpp-btn", "uspp-ggpp-btn-sm", a3.danger && "uspp-ggpp-btn-danger"), onClick: () => a3.onClick(selection.values()) }, a3.label))
      )
    );
  }
  function useFiltered(list2, search2, getKey = String) {
    return useMemo(() => {
      const words = String(search2 || "").toLowerCase().split(/\s+/).filter(Boolean);
      if (!words.length) return list2;
      return list2.filter((item) => {
        const k4 = String(getKey(item)).toLowerCase();
        return words.every((w4) => k4.includes(w4));
      });
    }, [list2, search2]);
  }
  function useAsyncAction(fn2) {
    const [busy2, setBusy] = useState(false);
    const ref = useRef(false);
    const run = async (...args) => {
      if (ref.current) return;
      ref.current = true;
      setBusy(true);
      try {
        await fn2(...args);
      } finally {
        ref.current = false;
        setBusy(false);
      }
    };
    return [busy2, run];
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/stores.js
  function createExternalStore() {
    const listeners12 = /* @__PURE__ */ new Set();
    let version2 = 0;
    return {
      subscribe(fn2) {
        listeners12.add(fn2);
        return () => listeners12.delete(fn2);
      },
      emit() {
        version2++;
        for (const fn2 of [...listeners12]) {
          try {
            fn2();
          } catch (e3) {
            console.error(e3);
          }
        }
      },
      getVersion: () => version2
    };
  }
  function createSelectionStore() {
    const base = createExternalStore();
    const set = /* @__PURE__ */ new Set();
    const changed = (fn2) => (...a3) => {
      const before = set.size;
      const r3 = fn2(...a3);
      if (r3 !== false || set.size !== before) base.emit();
      return r3;
    };
    return {
      ...base,
      has: (id) => set.has(id),
      get size() {
        return set.size;
      },
      values: () => [...set],
      add: changed((id) => {
        if (set.has(id)) return false;
        set.add(id);
      }),
      delete: changed((id) => {
        if (!set.has(id)) return false;
        set.delete(id);
      }),
      toggle: changed((id) => {
        if (set.has(id)) set.delete(id);
        else set.add(id);
      }),
      setAll: changed((ids) => {
        set.clear();
        for (const id of ids) set.add(id);
      }),
      clear: changed(() => {
        if (!set.size) return false;
        set.clear();
      })
    };
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/icons.js
  var icons_exports = {};
  __export(icons_exports, {
    ArchiveIcon: () => ArchiveIcon,
    BellIcon: () => BellIcon,
    CheckIcon: () => CheckIcon,
    ChevronRightIcon: () => ChevronRightIcon,
    ChromiumIcon: () => ChromiumIcon,
    CircleAlertIcon: () => CircleAlertIcon,
    CloseIcon: () => CloseIcon,
    CodeIcon: () => CodeIcon,
    CopyIcon: () => CopyIcon,
    EditIcon: () => EditIcon,
    EyeIcon: () => EyeIcon,
    InfoIcon: () => InfoIcon,
    KeyboardIcon: () => KeyboardIcon,
    LockIcon: () => LockIcon,
    LogoIcon: () => LogoIcon,
    PaletteIcon: () => PaletteIcon,
    PinFillIcon: () => PinFillIcon,
    PinIcon: () => PinIcon,
    PlugIcon: () => PlugIcon,
    PuzzleIcon: () => PuzzleIcon,
    ReloadIcon: () => ReloadIcon,
    SearchIcon: () => SearchIcon,
    SlidersIcon: () => SlidersIcon,
    StarFillIcon: () => StarFillIcon,
    StarIcon: () => StarIcon,
    TrashIcon: () => TrashIcon,
    WarningIcon: () => WarningIcon,
    WrenchIcon: () => WrenchIcon
  });
  function svg2(paths, { viewBox = "0 0 24 24", fill = "none" } = {}) {
    const Icon = ({ size = 4, className, color, style }) => h("svg", {
      width: size * 4,
      height: size * 4,
      viewBox,
      fill,
      className,
      stroke: fill === "none" ? color || "currentColor" : void 0,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { flexShrink: 0, color, ...style },
      "aria-hidden": true
    }, ...paths.map((d3, i3) => typeof d3 === "string" ? h("path", { d: d3, key: i3 }) : { ...d3, key: i3 }));
    return Icon;
  }
  var PlugIcon = svg2(["M9 2v6", "M15 2v6", "M6 8h12v3a6 6 0 0 1-12 0V8z", "M12 17v5"]);
  var PuzzleIcon = svg2(["M19.4 13a2 2 0 1 0 0-4H18V6a2 2 0 0 0-2-2h-3v1.6a2 2 0 1 1-4 0V4H6a2 2 0 0 0-2 2v3h1.6a2 2 0 1 1 0 4H4v3a2 2 0 0 0 2 2h3v-1.6a2 2 0 1 1 4 0V18h3a2 2 0 0 0 2-2v-3h1.4z"]);
  var PaletteIcon = svg2(["M12 22a10 10 0 1 1 10-10c0 2.8-2.2 4-4 4h-2a2 2 0 0 0-1.4 3.4A1.5 1.5 0 0 1 12 22z", "M7.5 10.5h.01", "M10.5 7h.01", "M15 7.5h.01"]);
  var CodeIcon = svg2(["M16 18l6-6-6-6", "M8 6l-6 6 6 6"]);
  var InfoIcon = svg2(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 16v-4", "M12 8h.01"]);
  var StarIcon = svg2(["M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"]);
  var StarFillIcon = svg2(["M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"], { fill: "currentColor" });
  var PinIcon = svg2(["M12 17v5", "M9 3h6l-1 6 4 4H6l4-4z"]);
  var PinFillIcon = svg2(["M12 17v5", "M9 3h6l-1 6 4 4H6l4-4z"], { fill: "currentColor" });
  var SlidersIcon = svg2(["M4 6h10", "M18 6h2", "M4 12h4", "M12 12h8", "M4 18h12", "M20 18h0", "M16 4v4", "M10 10v4", "M18 16v4"]);
  var WarningIcon = svg2(["M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z", "M12 9v4", "M12 17h.01"]);
  var LockIcon = svg2(["M5 11h14v10H5z", "M8 11V7a4 4 0 0 1 8 0v4"]);
  var CloseIcon = svg2(["M18 6L6 18", "M6 6l12 12"]);
  var ChromiumIcon = svg2(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M21.2 8H12", "M3.9 6.1l4.6 7.9", "M10.9 21.9l4.6-7.9"]);
  var WrenchIcon = svg2(["M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8z", "M14.7 6.3L10 2 2 10l4.3 4.7"]);
  var TrashIcon = svg2(["M3 6h18", "M8 6V4h8v2", "M19 6l-1 14H6L5 6"]);
  var EditIcon = svg2(["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"]);
  var CopyIcon = svg2(["M9 9h11v11H9z", "M5 15H4V4h11v1"]);
  var CheckIcon = svg2(["M20 6L9 17l-5-5"]);
  var ReloadIcon = svg2(["M21 12a9 9 0 1 1-3-6.7", "M21 3v6h-6"]);
  var ChevronRightIcon = svg2(["M9 6l6 6-6 6"]);
  var LogoIcon = svg2(["M12 3l8 4.5v9L12 21l-8-4.5v-9z", "M12 8v8", "M8 12h8"]);
  var CircleAlertIcon = svg2(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 8v4", "M12 16h.01"]);
  var EyeIcon = svg2(["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"]);
  var ArchiveIcon = svg2(["M3 4h18v4H3z", "M5 8v12h14V8", "M10 12h4"]);
  var KeyboardIcon = svg2(["M2 6h20v12H2z", "M6 10h.01", "M10 10h.01", "M14 10h.01", "M18 10h.01", "M7 14h10"]);
  var BellIcon = svg2(["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.9 1.9 0 0 0 3.4 0"]);
  var SearchIcon = svg2(["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.3-4.3"]);

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/theme.js
  function luminance(color) {
    const m3 = /rgba?\(([^)]+)\)/.exec(color || "");
    if (!m3) return null;
    const [r3, g5, b3, a3 = 1] = m3[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    if (!(a3 > 0)) return null;
    return (0.2126 * r3 + 0.7152 * g5 + 0.0722 * b3) / 255;
  }
  function detectTheme() {
    const site = getSite();
    if (typeof site.theme === "function") {
      try {
        const t3 = site.theme();
        if (t3 === "dark" || t3 === "light") return t3;
      } catch {
      }
    }
    for (const el of [document.body, document.documentElement]) {
      if (!el) continue;
      const l3 = luminance(getComputedStyle(el).backgroundColor);
      if (l3 != null) return l3 < 0.5 ? "dark" : "light";
    }
    try {
      return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "light";
    }
  }
  var currentTheme = () => document.documentElement?.getAttribute("data-uspp-ggpp-theme") || detectTheme();
  var installed7 = false;
  function installThemeWatcher() {
    if (installed7) return;
    installed7 = true;
    const update = () => {
      if (document.documentElement) setAttr(document.documentElement, "data-uspp-ggpp-theme", detectTheme());
    };
    update();
    try {
      matchMedia("(prefers-color-scheme: dark)").addEventListener("change", update);
    } catch {
    }
    let t3 = 0;
    const later = () => {
      clearTimeout(t3);
      t3 = setTimeout(update, 50);
    };
    const mo3 = new MutationObserver((recs) => {
      if (recs.some((r3) => r3.attributeName !== "data-uspp-ggpp-theme")) later();
    });
    const watch = () => {
      mo3.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme", "data-color-mode"] });
      if (document.body) mo3.observe(document.body, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
    };
    if (document.body) watch();
    else document.addEventListener("DOMContentLoaded", () => {
      watch();
      update();
    }, { once: true });
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/root.js
  var logger23 = new Logger("UI", "#fbcfe8");
  var root = null;
  var host = null;
  var shadow = null;
  var retry = 0;
  var layers = /* @__PURE__ */ new Map();
  var listeners8 = /* @__PURE__ */ new Set();
  var emit7 = () => {
    for (const l3 of [...listeners8]) l3();
  };
  var subscribe2 = (fn2) => {
    listeners8.add(fn2);
    return () => listeners8.delete(fn2);
  };
  function addLayer(key, Component) {
    layers.set(key, Component);
    emit7();
  }
  function Root() {
    useSubscription(subscribe2);
    return h(Fragment, null, [...layers].map(([key, C4]) => h(ErrorBoundary, { key, label: key }, h(C4, null))));
  }
  var STOP = ["pointerdown", "mousedown", "touchstart", "focusin", "focusout", "wheel"];
  function ensureRoot({ interactive = false } = {}) {
    if (interactive) wantUi();
    if (root) {
      if (host && !host.isConnected && document.body) document.body.appendChild(host);
      return true;
    }
    const R3 = getRenderer();
    if (!R3 || !document.body) {
      if (!retry) retry = setTimeout(() => {
        retry = 0;
        ensureRoot();
      }, 300);
      return false;
    }
    installThemeWatcher();
    try {
      host = document.createElement("uspp-ggpp-root");
      for (const t3 of STOP) host.addEventListener(t3, (e3) => e3.stopPropagation());
      document.body.appendChild(host);
      let mount2 = host;
      if (getSite()?.uiShadow !== false && typeof host.attachShadow === "function") {
        shadow = host.attachShadow({ mode: "open" });
        mount2 = document.createElement("div");
        mount2.className = "uspp-ggpp-shadow-mount";
        shadow.appendChild(mount2);
        attachShadowStyles(shadow);
      }
      root = R3.createRoot(mount2);
      root.render(h(Root, null));
      return true;
    } catch (e3) {
      logger23.error("创建界面根失败", e3);
      host?.remove();
      root = null;
      host = null;
      shadow = null;
      return false;
    }
  }
  var queryUi = (sel) => shadow && shadow.querySelector(sel) || document.querySelector(sel);
  function activeElement() {
    let a3 = document.activeElement;
    while (a3 && a3.shadowRoot && a3.shadowRoot.activeElement) a3 = a3.shadowRoot.activeElement;
    return a3;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/modal.js
  var logger24 = new Logger("Modal", "#fbcfe8");
  var modals = [];
  var listeners9 = /* @__PURE__ */ new Set();
  var emit8 = () => {
    for (const l3 of [...listeners9]) l3();
  };
  var subscribe3 = (fn2) => {
    listeners9.add(fn2);
    return () => listeners9.delete(fn2);
  };
  var seq2 = 0;
  function topHostDialog() {
    const list2 = [...document.querySelectorAll('[role="dialog"][data-state="open"], [role="alertdialog"][data-state="open"]')].filter((el) => !el.closest("uspp-ggpp-root") && !el.closest(".uspp-ggpp-overlay"));
    return list2[list2.length - 1] || null;
  }
  function openModal(render, { modalKey } = {}) {
    const key = modalKey ?? `uspp-ggpp-modal-${++seq2}`;
    modals = modals.filter((m3) => m3.key !== key);
    modals.push({ key, render, container: topHostDialog() });
    if (!ensureRoot({ interactive: true })) logger24.debug("界面根尚未就绪,弹窗会在就绪后显示");
    emit8();
    return key;
  }
  function closeModal(key) {
    const before = modals.length;
    modals = modals.filter((m3) => m3.key !== key);
    if (modals.length !== before) emit8();
  }
  function closeAllModals() {
    if (!modals.length) return;
    modals = [];
    emit8();
  }
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';
  var focusables = (el) => [...el.querySelectorAll(FOCUSABLE)].filter((x4) => x4.offsetParent !== null || x4.getClientRects().length > 0);
  var focusSafe = (el) => {
    try {
      el?.focus({ preventScroll: true });
    } catch {
    }
  };
  function ModalFrame({ entry, isTop }) {
    const onClose = () => closeModal(entry.key);
    const ref = useRef(null);
    useEffect(() => {
      const prev = activeElement();
      const el = ref.current;
      if (el && !el.contains(activeElement())) focusSafe(el.querySelector("[autofocus]") || el.querySelector('[role="dialog"]') || focusables(el)[0]);
      return () => {
        const now2 = activeElement();
        if (prev && prev.isConnected && (!now2 || now2 === document.body || el?.contains(now2) || !now2.isConnected)) focusSafe(prev);
      };
    }, []);
    useEffect(() => {
      if (!isTop) return;
      const onKey = (e3) => {
        if (e3.key === "Tab") {
          const el = ref.current;
          if (!el) return;
          const list2 = focusables(el);
          if (!list2.length) {
            e3.preventDefault();
            return;
          }
          const first = list2[0], last2 = list2[list2.length - 1], cur = activeElement();
          if (!el.contains(cur)) {
            e3.preventDefault();
            focusSafe(e3.shiftKey ? last2 : first);
          } else if (e3.shiftKey && (cur === first || !list2.includes(cur))) {
            e3.preventDefault();
            focusSafe(last2);
          } else if (!e3.shiftKey && cur === last2) {
            e3.preventDefault();
            focusSafe(first);
          }
          return;
        }
        if (e3.key !== "Escape") return;
        e3.stopImmediatePropagation();
        e3.preventDefault();
        onClose();
      };
      window.addEventListener("keydown", onKey, true);
      return () => window.removeEventListener("keydown", onKey, true);
    }, [isTop]);
    let content;
    try {
      content = entry.render({ onClose, modalKey: entry.key });
    } catch (e3) {
      logger24.error("弹窗渲染出错", e3);
      content = null;
    }
    const overlay = h("div", {
      ref,
      className: "uspp-ggpp-overlay",
      style: entry.container ? { position: "fixed", zIndex: 2147483e3 } : void 0,
      onMouseDown: (e3) => {
        if (e3.target === e3.currentTarget) e3.currentTarget.dataset.down = "1";
      },
      onClick: (e3) => {
        if (e3.target === e3.currentTarget && e3.currentTarget.dataset.down === "1") onClose();
        e3.currentTarget.dataset.down = "";
      },
      onKeyDown: (e3) => e3.stopPropagation()
    }, h(ErrorBoundary, { fallback: null, label: "modal" }, content));
    const R3 = getRenderer();
    if (entry.container && entry.container.isConnected && R3?.createPortal) return R3.createPortal(overlay, entry.container);
    return overlay;
  }
  function ModalHost() {
    useSubscription(subscribe3);
    return h(Fragment, null, modals.map((m3, i3) => h(ModalFrame, { key: m3.key, entry: m3, isTop: i3 === modals.length - 1 })));
  }
  addLayer("modals", ModalHost);
  function ModalCard({ title, subtitle, children, footer, onClose, width }) {
    return h(
      "div",
      { className: "uspp-ggpp-modal", role: "dialog", "aria-modal": "true", "aria-label": typeof title === "string" ? title : void 0, tabIndex: -1, style: width ? { width: `min(${width}px, 100%)` } : void 0, onClick: (e3) => e3.stopPropagation() },
      h("button", { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-icon uspp-ggpp-modal-close", "aria-label": "Close", onClick: onClose }, h(CloseIcon, { size: 4 })),
      (title || subtitle) && h(
        "div",
        { className: "uspp-ggpp-modal-header" },
        title && h("h2", { className: "uspp-ggpp-modal-title" }, title),
        subtitle && h("div", { className: "uspp-ggpp-modal-subtitle" }, subtitle)
      ),
      h("div", { className: "uspp-ggpp-modal-body" }, children),
      footer && h("div", { className: "uspp-ggpp-modal-footer" }, footer)
    );
  }
  function confirmDialog({ title, body, confirmText = "Confirm", cancelText = "Cancel", danger = false }) {
    return new Promise((resolve) => {
      let done = false;
      const finish = (v3) => {
        if (!done) {
          done = true;
          resolve(v3);
        }
      };
      const key = openModal(({ onClose }) => h(ModalCard, {
        title,
        width: 420,
        onClose: () => {
          finish(false);
          onClose();
        },
        footer: [
          h("button", { key: "c", type: "button", className: "uspp-ggpp-btn", onClick: () => {
            finish(false);
            onClose();
          } }, cancelText),
          h("button", { key: "o", type: "button", className: `uspp-ggpp-btn ${danger ? "uspp-ggpp-btn-danger" : "uspp-ggpp-btn-primary"}`, onClick: () => {
            finish(true);
            onClose();
          } }, confirmText)
        ]
      }, h("div", { className: "uspp-ggpp-muted" }, body)));
      const off = subscribe3(() => {
        if (!modals.some((m3) => m3.key === key)) {
          off();
          finish(false);
        }
      });
    });
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/toast.js
  var logger25 = new Logger("Toast", "#fbcfe8");
  var ToastType = Object.freeze({
    MESSAGE: "MESSAGE",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    INFO: "INFO",
    WARNING: "WARNING",
    LOADING: "LOADING"
  });
  function showToast(message, type = ToastType.MESSAGE, options = {}) {
    const toast = siteToast();
    if (!toast) return fallbackToast(message, type, options);
    try {
      const fn2 = {
        SUCCESS: toast.success,
        ERROR: toast.error,
        INFO: toast.info,
        WARNING: toast.warning,
        LOADING: toast.loading,
        MESSAGE: toast.message
      }[String(type).toUpperCase()] || toast;
      return fn2.call(toast, message, options);
    } catch (e3) {
      logger25.warn("显示 toast 失败", e3);
      return -1;
    }
  }
  function dismissToast(id) {
    if (id && typeof id === "object" && typeof id.remove === "function") {
      id.remove();
      return;
    }
    try {
      siteToast()?.dismiss?.(id);
    } catch {
    }
  }
  function siteToast() {
    const c3 = getSite().components;
    try {
      return (typeof c3 === "function" ? c3("toast") : c3?.toast) ?? null;
    } catch {
      return null;
    }
  }
  var notice = null;
  var listeners10 = /* @__PURE__ */ new Set();
  var emit9 = () => {
    for (const l3 of [...listeners10]) l3();
  };
  var subscribe4 = (fn2) => {
    listeners10.add(fn2);
    return () => listeners10.delete(fn2);
  };
  var timer = 0;
  function showNotice({ message, type = "INFO", action, duration } = {}) {
    clearTimeout(timer);
    notice = { message, type: String(type).toUpperCase(), action, id: Date.now() };
    ensureRoot({ interactive: true });
    emit9();
    if (duration > 0) timer = setTimeout(closeNotice, duration);
  }
  function closeNotice() {
    clearTimeout(timer);
    if (!notice) return;
    notice = null;
    emit9();
  }
  var ICONS = { ERROR: WarningIcon, WARNING: WarningIcon, SUCCESS: CheckIcon };
  function NoticeHost() {
    useSubscription(subscribe4);
    if (!notice) return null;
    const Icon = ICONS[notice.type] || InfoIcon;
    const { action } = notice;
    return h(
      "div",
      { className: "uspp-ggpp-notice", "data-type": notice.type, role: "status" },
      h(Icon, { size: 4.5 }),
      h("div", { className: "uspp-ggpp-notice-msg" }, notice.message),
      action && h("button", { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-sm", onClick: () => {
        try {
          action.onClick?.();
        } finally {
          if (action.close !== false) closeNotice();
        }
      } }, action.label),
      h("button", { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-icon", "aria-label": "Close", onClick: closeNotice }, h(CloseIcon, { size: 4 }))
    );
  }
  addLayer("notice", NoticeHost);
  var toastHost = null;
  function fallbackToast(message, type = "MESSAGE", { duration = 3500 } = {}) {
    if (!document.body && !document.documentElement) return -1;
    if (!toastHost || !toastHost.isConnected) {
      toastHost = document.createElement("uspp-ggpp-toasts");
      const r3 = toastHost.attachShadow({ mode: "open" });
      try {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(`:host{all:initial}.list{position:fixed;right:16px;bottom:16px;z-index:2147483647;display:flex;flex-direction:column;gap:8px;font:13px/1.4 system-ui,sans-serif}
.t{background:#222;color:#fff;padding:9px 14px;border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,.3);max-width:360px}.t[data-type=ERROR]{background:#b3261e}.t[data-type=SUCCESS]{background:#1b5e20}`);
        r3.adoptedStyleSheets = [sheet];
      } catch {
      }
      const list2 = document.createElement("div");
      list2.className = "list";
      r3.append(list2);
      (document.body || document.documentElement).appendChild(toastHost);
    }
    const t3 = document.createElement("div");
    t3.className = "t";
    t3.dataset.type = String(type).toUpperCase();
    t3.setAttribute("role", "status");
    t3.textContent = String(message);
    toastHost.shadowRoot.querySelector(".list").append(t3);
    setTimeout(() => t3.remove(), duration);
    return t3;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/floating.js
  var subscribe5 = (fn2) => {
    const off = onSlotChange("floating", fn2);
    SettingsStore.addChangeListener("plugins.Settings.floatingPosition", fn2);
    return () => {
      off();
      SettingsStore.removeChangeListener("plugins.Settings.floatingPosition", fn2);
    };
  };
  function FloatingHost() {
    useSubscription(subscribe5);
    const items = getSlotItems("floating");
    if (!items.length) return null;
    const pos = String(PlainSettings.plugins.Settings?.floatingPosition || "bottom-right");
    return h("div", { className: "uspp-ggpp-floating", "data-pos": pos, "data-uspp-ggpp-floating": "" }, items.map((d3) => {
      const ctx = {};
      return h(
        ErrorBoundary,
        { key: d3.id, fallback: null, label: `floating:${d3.id}` },
        d3.render ? h(d3.render, ctx) : h("button", {
          type: "button",
          className: "uspp-ggpp-floating-btn " + (d3.className || ""),
          title: d3.tooltip ?? d3.label,
          "aria-label": d3.label ?? d3.id,
          disabled: slotValue(d3.disabled, ctx),
          "data-active": String(slotValue(d3.active, ctx)),
          "data-uspp-ggpp-floating-item": d3.id,
          onClick: () => {
            try {
              (d3.onSelect || d3.onClick)?.(ctx);
            } catch (e3) {
              console.error("[Userscript++] 悬浮按钮出错", e3);
            }
          }
        }, typeof d3.icon === "function" ? h(d3.icon, { size: 4 }) : d3.icon, d3.icon != null && d3.label ? " " : null, d3.icon == null || d3.showLabel ? d3.label : null)
      );
    }));
  }
  var installed8 = false;
  function installFloating() {
    if (installed8) return;
    installed8 = true;
    addLayer("floating", FloatingHost);
    const tryMount = () => {
      if (getSlotItems("floating").length && !ensureRoot()) setTimeout(tryMount, 500);
    };
    onSlotChange("floating", tryMount);
    tryMount();
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/styles.css.js
  var LIGHT = `--uspp-ggpp-surface-base:#fff;--uspp-ggpp-surface-l1:#fff;--uspp-ggpp-surface-l2:#f4f4f5;--uspp-ggpp-surface-l3:#d4d4d8;--uspp-ggpp-fg-primary:#111;--uspp-ggpp-fg-secondary:#5f5f66;--uspp-ggpp-fg-tertiary:#8a8a93;--uspp-ggpp-fg-danger:#e5484d;--uspp-ggpp-border-l1:rgb(0 0 0 / .1);--uspp-ggpp-border-l2:rgb(0 0 0 / .16);--uspp-ggpp-ring:#888;--uspp-ggpp-button-ghost-hover:rgb(0 0 0 / .06);`;
  var DARK = `--uspp-ggpp-surface-base:#151517;--uspp-ggpp-surface-l1:#1c1c1f;--uspp-ggpp-surface-l2:#26262a;--uspp-ggpp-surface-l3:#3f3f46;--uspp-ggpp-fg-primary:#f4f4f5;--uspp-ggpp-fg-secondary:#a1a1aa;--uspp-ggpp-fg-tertiary:#71717a;--uspp-ggpp-fg-danger:#f06a6e;--uspp-ggpp-border-l1:rgb(255 255 255 / .1);--uspp-ggpp-border-l2:rgb(255 255 255 / .16);--uspp-ggpp-ring:#a1a1aa;--uspp-ggpp-button-ghost-hover:rgb(255 255 255 / .08);`;
  var UI_CSS = `
:root { ${LIGHT} }
:root[data-uspp-ggpp-theme="dark"] { ${DARK} }
uspp-ggpp-root { color-scheme: light dark; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
uspp-ggpp-root { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; }
uspp-ggpp-root > *, .uspp-ggpp-shadow-mount > * { pointer-events: auto; }
.uspp-ggpp-shadow-mount { display: contents; }
.uspp-ggpp-overlay { position: fixed; inset: 0; background: rgb(0 0 0 / 0.5); display: flex; align-items: center; justify-content: center; padding: 16px; pointer-events: auto; animation: uspp-ggpp-fade .12s ease-out; }
.uspp-ggpp-modal { position: relative; background: var(--uspp-ggpp-surface-l1); color: var(--uspp-ggpp-fg-primary); border: 1px solid var(--uspp-ggpp-border-l1); border-radius: 24px; box-shadow: 0 16px 48px rgb(0 0 0 / .35); width: min(560px, 100%); max-height: min(85vh, 760px); display: flex; flex-direction: column; overflow: hidden; font-size: 14px; animation: uspp-ggpp-pop .14s ease-out; }
.uspp-ggpp-modal-header { padding: 20px 56px 8px 24px; }
.uspp-ggpp-modal-title { font-size: 18px; font-weight: 600; margin: 0; }
.uspp-ggpp-modal-subtitle { color: var(--uspp-ggpp-fg-secondary); margin-top: 4px; }
.uspp-ggpp-modal-body { padding: 8px 24px 16px; overflow-y: auto; }
.uspp-ggpp-modal-footer { padding: 12px 24px 20px; display: flex; gap: 8px; justify-content: flex-end; border-top: 1px solid var(--uspp-ggpp-border-l1); }
.uspp-ggpp-modal-close { position: absolute; top: 14px; right: 14px; }
@keyframes uspp-ggpp-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes uspp-ggpp-pop { from { opacity: 0; transform: scale(.97) } to { opacity: 1; transform: none } }

.uspp-ggpp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 36px; padding: 0 14px; border-radius: 9999px; border: 1px solid var(--uspp-ggpp-border-l2); background: transparent; color: var(--uspp-ggpp-fg-primary); font: inherit; font-weight: 500; cursor: pointer; white-space: nowrap; }
.uspp-ggpp-btn:hover:not(:disabled) { background: var(--uspp-ggpp-button-ghost-hover); }
.uspp-ggpp-btn:disabled { opacity: .5; cursor: default; }
.uspp-ggpp-btn-primary { background: var(--uspp-ggpp-fg-primary); color: var(--uspp-ggpp-surface-base); border-color: transparent; }
.uspp-ggpp-btn-primary:hover:not(:disabled) { background: var(--uspp-ggpp-fg-primary); opacity: .88; }
.uspp-ggpp-btn-danger { background: var(--uspp-ggpp-fg-danger); color: #fff; border-color: transparent; }
.uspp-ggpp-btn-danger:hover:not(:disabled) { background: var(--uspp-ggpp-fg-danger); opacity: .88; }
.uspp-ggpp-btn-ghost { border-color: transparent; }
.uspp-ggpp-btn-icon { width: 32px; height: 32px; padding: 0; border-color: transparent; color: var(--uspp-ggpp-fg-secondary); }
.uspp-ggpp-btn-icon:hover:not(:disabled) { color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-btn-icon.uspp-ggpp-active { color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-btn-sm { height: 30px; padding: 0 10px; font-size: 13px; }

.uspp-ggpp-switch { position: relative; width: 44px; height: 24px; border-radius: 9999px; background: var(--uspp-ggpp-surface-l3); border: none; cursor: pointer; flex-shrink: 0; padding: 0; transition: background .15s; }
.uspp-ggpp-switch[data-checked="true"] { background: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%; background: var(--uspp-ggpp-surface-base); transition: transform .15s; }
.uspp-ggpp-switch[data-checked="true"]::after { transform: translateX(20px); }
.uspp-ggpp-switch:disabled { opacity: .5; cursor: not-allowed; }

.uspp-ggpp-input, .uspp-ggpp-textarea, .uspp-ggpp-select { width: 100%; box-sizing: border-box; background: var(--uspp-ggpp-surface-l2); color: var(--uspp-ggpp-fg-primary); border: 1px solid var(--uspp-ggpp-border-l1); border-radius: 12px; padding: 8px 12px; font: inherit; outline: none; }
.uspp-ggpp-input:focus, .uspp-ggpp-textarea:focus, .uspp-ggpp-select:focus { border-color: var(--uspp-ggpp-ring); }
.uspp-ggpp-select { width: auto; min-width: 140px; }
.uspp-ggpp-textarea { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13px; line-height: 1.5; resize: vertical; min-height: 240px; white-space: pre; tab-size: 4; }
.uspp-ggpp-textarea[readonly] { opacity: .6; }

.uspp-ggpp-page { display: flex; flex-direction: column; gap: 16px; padding-bottom: 24px; padding-inline-end: 24px; color: var(--uspp-ggpp-fg-primary); font-size: 14px; }
.uspp-ggpp-row { display: flex; align-items: center; gap: 12px; justify-content: space-between; }
.uspp-ggpp-row-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.uspp-ggpp-row-title { font-weight: 500; }
.uspp-ggpp-muted { color: var(--uspp-ggpp-fg-secondary); }
.uspp-ggpp-small { font-size: 12px; }
.uspp-ggpp-section { display: flex; flex-direction: column; gap: 10px; padding: 16px; border: 1px solid var(--uspp-ggpp-border-l1); border-radius: 16px; background: var(--uspp-ggpp-surface-l1); }
.uspp-ggpp-tabs { display: flex; flex-wrap: nowrap; gap: 2px; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; flex-shrink: 0; border-bottom: 1px solid var(--uspp-ggpp-border-l1); }
.uspp-ggpp-tabs::-webkit-scrollbar { display: none; }
.uspp-ggpp-chip { position: relative; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; height: 32px; padding: 0 10px; border: none; border-radius: 8px; background: transparent; color: var(--uspp-ggpp-fg-secondary); font: inherit; font-size: 14px; font-weight: 500; white-space: nowrap; cursor: pointer; }
.uspp-ggpp-chip:hover { background: var(--uspp-ggpp-button-ghost-hover); color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-chip[aria-selected="true"] { color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-chip[aria-selected="true"]::after { content: ""; position: absolute; inset-inline: 8px; bottom: -1px; height: 2px; border-radius: 1px; background: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-toolbar { display: flex; flex-wrap: nowrap; gap: 8px; align-items: center; }
.uspp-ggpp-toolbar > :not(.uspp-ggpp-input) { flex-shrink: 0; width: auto; }
.uspp-ggpp-toolbar .uspp-ggpp-input { flex: 1; min-width: 0; }
.uspp-ggpp-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.uspp-ggpp-divider { display: flex; align-items: center; gap: 8px; color: var(--uspp-ggpp-fg-tertiary); font-size: 12px; margin: 4px 0; }
.uspp-ggpp-divider::before, .uspp-ggpp-divider::after { content: ""; flex: 1; height: 1px; background: var(--uspp-ggpp-border-l1); }
.uspp-ggpp-card { display: flex; flex-direction: column; padding: 0; min-height: 120px; min-width: 0; overflow: hidden; contain: content; border: 1px solid var(--uspp-ggpp-border-l1); border-radius: 8px; background: var(--uspp-ggpp-surface-l1); }
.uspp-ggpp-switch-lock { display: inline-flex; cursor: not-allowed; }
.uspp-ggpp-switch-lock button, .uspp-ggpp-switch-lock [role="switch"] { opacity: 1 !important; pointer-events: none; }
.uspp-ggpp-card[data-failed="true"] { opacity: .5; border-color: color-mix(in srgb, var(--uspp-ggpp-fg-danger) 45%, transparent); }
.uspp-ggpp-card-body { flex: 1; display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; }
.uspp-ggpp-card-head { display: flex; flex-wrap: nowrap; align-items: center; justify-content: space-between; gap: 8px; min-width: 0; }
.uspp-ggpp-card-title { flex: 1; display: flex; align-items: center; gap: 6px; min-width: 0; overflow: hidden; }
.uspp-ggpp-card-icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; width: 24px; height: 24px; border-radius: 8px; line-height: 0; color: var(--uspp-ggpp-fg-primary); background: color-mix(in srgb, var(--uspp-ggpp-fg-primary) 10%, transparent); }
.uspp-ggpp-card-icon svg { width: 14px; height: 14px; }
.uspp-ggpp-card-name { flex-shrink: 1; min-width: 56px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; font-weight: 500; }
.uspp-ggpp-card-controls { flex-shrink: 0; display: flex; align-items: center; gap: 6px; }
.uspp-ggpp-card-btn { width: 28px; height: 28px; border-radius: 8px; color: var(--uspp-ggpp-fg-tertiary); }
.uspp-ggpp-card-btn.uspp-ggpp-active { color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-card-desc { margin-top: 4px; font-size: 13px; line-height: 1.5; color: var(--uspp-ggpp-fg-secondary); display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.uspp-ggpp-card-sep { height: 1px; background: var(--uspp-ggpp-border-l1); }
.uspp-ggpp-card-foot { display: flex; flex-wrap: nowrap; align-items: center; gap: 6px; padding: 6px 12px; min-height: 22px; }
.uspp-ggpp-card-authors { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; color: var(--uspp-ggpp-fg-tertiary); }
.uspp-ggpp-card-foot .uspp-ggpp-sites { margin-top: 0; flex-shrink: 0; }
.uspp-ggpp-card-preview { display: inline-flex; align-items: center; gap: 4px; height: 22px; padding: 0 8px; border-radius: 6px; border: none; background: transparent; color: var(--uspp-ggpp-fg-tertiary); font: inherit; font-size: 11px; cursor: pointer; flex-shrink: 0; }
.uspp-ggpp-card-preview:hover { color: var(--uspp-ggpp-fg-primary); background: var(--uspp-ggpp-button-ghost-hover); }
.uspp-ggpp-badge { flex-shrink: 0; white-space: nowrap; display: inline-flex; align-items: center; height: 18px; padding: 0 6px; border-radius: 6px; font-size: 11px; font-weight: 600; background: var(--uspp-ggpp-fg-primary); color: var(--uspp-ggpp-surface-base); }
.uspp-ggpp-icon-badge { display: inline-flex; align-items: center; flex-shrink: 0; line-height: 0; color: var(--uspp-ggpp-fg-tertiary); }
.uspp-ggpp-icon-badge.uspp-ggpp-warn { color: var(--uspp-ggpp-fg-danger); }
.uspp-ggpp-empty { padding: 32px 8px; text-align: center; color: var(--uspp-ggpp-fg-secondary); }
.uspp-ggpp-banner { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 14px; background: var(--uspp-ggpp-surface-l2); }
.uspp-ggpp-backup { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; margin-top: 18px; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--uspp-ggpp-border-l1); }
.uspp-ggpp-backup-text { flex: 1 1 220px; display: flex; flex-direction: column; gap: 2px; }
.uspp-ggpp-sites { white-space: nowrap; display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.uspp-ggpp-card-timing { flex-shrink: 0; font-size: 11px; color: var(--uspp-ggpp-fg-secondary); white-space: nowrap; font-variant-numeric: tabular-nums; }
.uspp-ggpp-card-timing[data-error="true"] { color: var(--uspp-ggpp-fg-danger); }
.uspp-ggpp-site-badge { flex-shrink: 0; font-size: 11px; padding: 0 6px; border-radius: 6px; color: var(--uspp-ggpp-fg-secondary); border: 1px solid var(--uspp-ggpp-border-l1); white-space: nowrap; }
.uspp-ggpp-panel { display: grid; grid-template-columns: 168px minmax(0, 1fr); gap: 20px; align-items: start; }
.uspp-ggpp-panel-nav { position: sticky; top: 0; display: flex; flex-direction: column; gap: 2px; }
.uspp-ggpp-panel-nav-item { display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 10px; border: none; border-radius: 10px; background: transparent; color: var(--uspp-ggpp-fg-secondary); font: inherit; font-size: 14px; font-weight: 500; white-space: nowrap; text-align: start; cursor: pointer; }
.uspp-ggpp-panel-nav-item:hover { background: var(--uspp-ggpp-button-ghost-hover); color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-panel-nav-item[aria-selected="true"] { background: var(--uspp-ggpp-surface-l2); color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-panel-nav-item span { overflow: hidden; text-overflow: ellipsis; }
.uspp-ggpp-panel-content { min-width: 0; }
.uspp-ggpp-modal:has(.uspp-ggpp-panel) { container-type: inline-size; }
@container (max-width: 760px) {
  .uspp-ggpp-panel { grid-template-columns: 44px minmax(0, 1fr); gap: 14px; }
  .uspp-ggpp-panel-nav-item { justify-content: center; padding: 0; }
  .uspp-ggpp-panel-nav-item span { display: none; }
}
.uspp-ggpp-panel .uspp-ggpp-page { padding-inline-end: 0; }
.uspp-ggpp-floating { position: fixed; z-index: 2147482000; display: flex; flex-direction: column; gap: 8px; pointer-events: auto; }
.uspp-ggpp-floating[data-pos="bottom-right"] { right: 16px; bottom: 16px; }
.uspp-ggpp-floating[data-pos="bottom-left"] { left: 16px; bottom: 16px; }
.uspp-ggpp-floating[data-pos="top-right"] { right: 16px; top: 16px; }
.uspp-ggpp-floating[data-pos="top-left"] { left: 16px; top: 16px; }
.uspp-ggpp-floating-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-width: 40px; height: 40px; padding: 0 12px; border-radius: 9999px; border: 1px solid var(--uspp-ggpp-border-l2); background: var(--uspp-ggpp-surface-l1); color: var(--uspp-ggpp-fg-primary); box-shadow: 0 4px 16px rgb(0 0 0 / .18); font: inherit; cursor: pointer; }
.uspp-ggpp-floating-btn:hover:not(:disabled) { background: var(--uspp-ggpp-surface-l2); }
.uspp-ggpp-floating-btn[data-active="true"] { background: var(--uspp-ggpp-fg-primary); color: var(--uspp-ggpp-surface-base); }
.uspp-ggpp-error { color: var(--uspp-ggpp-fg-danger); font-size: 13px; }
.uspp-ggpp-setting { display: flex; flex-direction: column; gap: 6px; padding: 12px 0; border-bottom: 1px solid var(--uspp-ggpp-border-l1); }
.uspp-ggpp-setting:last-child { border-bottom: none; }
.uspp-ggpp-slider-row { display: flex; gap: 12px; align-items: center; }
.uspp-ggpp-slider-row input[type=range] { flex: 1; }
.uspp-ggpp-tip { display: inline-flex; align-items: center; color: var(--uspp-ggpp-fg-secondary); cursor: help; margin-left: 4px; }

.uspp-ggpp-notice { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); display: flex; align-items: center; gap: 10px; max-width: min(640px, calc(100vw - 32px)); padding: 10px 12px 10px 16px; border-radius: 16px; background: var(--uspp-ggpp-surface-l2); color: var(--uspp-ggpp-fg-primary); border: 1px solid var(--uspp-ggpp-border-l2); box-shadow: 0 8px 32px rgb(0 0 0 / .3); font-size: 14px; pointer-events: auto; }
.uspp-ggpp-notice[data-type="ERROR"] { border-color: var(--uspp-ggpp-fg-danger); }
.uspp-ggpp-notice-msg { flex: 1; }

.uspp-ggpp-menu-icon { display: inline-flex; margin-inline-end: 8px; color: var(--uspp-ggpp-fg-secondary); }
.uspp-ggpp-preview { display: flex; flex-direction: column; gap: 8px; margin: 4px 0 12px; }
.uspp-ggpp-preview-head { display: flex; align-items: center; gap: 8px; min-height: 32px; }
.uspp-ggpp-preview-title { font-weight: 600; }
.uspp-ggpp-preview-nav { margin-left: auto; display: flex; align-items: center; gap: 2px; }
.uspp-ggpp-preview-img { display: block; max-width: 100%; max-height: 300px; margin: 0 auto; border-radius: 12px; border: 1px solid var(--uspp-ggpp-border-l1); object-fit: contain; background: var(--uspp-ggpp-surface-l2); }
.uspp-ggpp-preview-live { padding: 14px; border-radius: 14px; border: 1px dashed var(--uspp-ggpp-border-l2); background: var(--uspp-ggpp-surface-l2); overflow: auto; max-height: 320px; }
.uspp-ggpp-preview-empty { padding: 24px 8px; text-align: center; border-radius: 14px; background: var(--uspp-ggpp-surface-l2); }
.uspp-ggpp-preview-compare { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
.uspp-ggpp-preview-compare figure { margin: 0; display: flex; flex-direction: column; gap: 4px; }
.uspp-ggpp-preview-compare figcaption { text-align: center; font-size: 12px; color: var(--uspp-ggpp-fg-secondary); }
.uspp-ggpp-preview-caption { text-align: center; }
.uspp-ggpp-preview-slots { display: flex; flex-direction: column; gap: 8px; border-style: solid; }
.uspp-ggpp-preview-slot { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.uspp-ggpp-preview-chip { display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px; border-radius: 9999px; border: 1px solid var(--uspp-ggpp-border-l2); background: var(--uspp-ggpp-surface-l1); font-weight: 500; font-size: 13px; }
.uspp-ggpp-code { position: relative; }
.uspp-ggpp-code-hl { position: absolute; inset: 0; margin: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; border: 1px solid transparent; border-radius: 12px; padding: 8px 12px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13px; line-height: 1.5; white-space: pre; tab-size: 4; color: var(--uspp-ggpp-fg-primary); background: var(--uspp-ggpp-surface-l2); }
.uspp-ggpp-code .uspp-ggpp-code-input { position: relative; background: transparent; color: transparent; caret-color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-code .uspp-ggpp-code-input::selection { background: color-mix(in srgb, var(--uspp-ggpp-ring) 40%, transparent); color: transparent; }
.uspp-ggpp-code .uspp-ggpp-code-input::placeholder { color: var(--uspp-ggpp-fg-tertiary); }
.uspp-ggpp-code-readonly .uspp-ggpp-code-hl { opacity: .6; }
.uspp-ggpp-code .uspp-ggpp-code-input[readonly] { opacity: 1; }
.uspp-ggpp-hl-comment { color: var(--uspp-ggpp-fg-tertiary); font-style: italic; }
.uspp-ggpp-hl-string { color: #16a34a; }
.uspp-ggpp-hl-at, .uspp-ggpp-hl-important { color: #c026d3; }
.uspp-ggpp-hl-selector { color: #2563eb; }
.uspp-ggpp-hl-property, .uspp-ggpp-hl-variable { color: #0891b2; }
.uspp-ggpp-hl-value, .uspp-ggpp-hl-function { color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-hl-number, .uspp-ggpp-hl-color { color: #ea580c; }
.uspp-ggpp-hl-punct { color: var(--uspp-ggpp-fg-secondary); }
[data-uspp-ggpp-theme="dark"] .uspp-ggpp-hl-string { color: #4ade80; }
[data-uspp-ggpp-theme="dark"] .uspp-ggpp-hl-at, [data-uspp-ggpp-theme="dark"] .uspp-ggpp-hl-important { color: #e879f9; }
[data-uspp-ggpp-theme="dark"] .uspp-ggpp-hl-selector { color: #60a5fa; }
[data-uspp-ggpp-theme="dark"] .uspp-ggpp-hl-property, [data-uspp-ggpp-theme="dark"] .uspp-ggpp-hl-variable { color: #22d3ee; }
[data-uspp-ggpp-theme="dark"] .uspp-ggpp-hl-number, [data-uspp-ggpp-theme="dark"] .uspp-ggpp-hl-color { color: #fb923c; }
.uspp-ggpp-textarea-plain { resize: vertical; min-height: 72px; line-height: 1.5; }
.uspp-ggpp-section-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.uspp-ggpp-hint { display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--uspp-ggpp-border-l1); background: var(--uspp-ggpp-surface-l2); font-size: 13px; color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-hint[data-type="warn"] { border-color: color-mix(in srgb, #f59e0b 45%, transparent); background: color-mix(in srgb, #f59e0b 10%, var(--uspp-ggpp-surface-l1)); }
.uspp-ggpp-hint[data-type="danger"] { border-color: color-mix(in srgb, var(--uspp-ggpp-fg-danger) 45%, transparent); background: color-mix(in srgb, var(--uspp-ggpp-fg-danger) 8%, var(--uspp-ggpp-surface-l1)); }
.uspp-ggpp-hint[data-type="success"] { border-color: color-mix(in srgb, #22c55e 45%, transparent); background: color-mix(in srgb, #22c55e 8%, var(--uspp-ggpp-surface-l1)); }
.uspp-ggpp-hint-title { font-weight: 600; }
.uspp-ggpp-error-detail { margin: 6px 0 0; max-height: 200px; overflow: auto; font-size: 12px; white-space: pre-wrap; word-break: break-word; color: var(--uspp-ggpp-fg-secondary); }
.uspp-ggpp-color-swatch { width: 32px; height: 32px; padding: 0; border: 1px solid var(--uspp-ggpp-border-l2); border-radius: 8px; background: none; cursor: pointer; }
.uspp-ggpp-checkbox { width: 16px; height: 16px; accent-color: var(--uspp-ggpp-fg-primary); cursor: pointer; }
.uspp-ggpp-selection-bar { position: sticky; bottom: 0; display: flex; align-items: center; gap: 12px; padding: 8px 12px; border: 1px solid var(--uspp-ggpp-border-l2); border-radius: 12px; background: var(--uspp-ggpp-surface-l1); box-shadow: 0 6px 20px rgb(0 0 0 / .15); }
.uspp-ggpp-setting-fieldset { border: 0; margin: 0; padding: 0; min-width: 0; }
.uspp-ggpp-setting-disabled { opacity: .5; }
.uspp-ggpp-setting-error { margin-top: 6px; font-size: 12px; color: var(--uspp-ggpp-fg-danger); }
.uspp-ggpp-setting-flash { outline: 2px solid var(--uspp-ggpp-ring); outline-offset: 4px; border-radius: 8px; transition: outline-color .4s; }
.uspp-ggpp-plugin-about { margin-bottom: 12px; }
.uspp-ggpp-notify-stack { position: fixed; right: 16px; bottom: 16px; z-index: 2147483600; display: flex; flex-direction: column; gap: 8px; width: min(360px, calc(100vw - 32px)); pointer-events: none; }
.uspp-ggpp-notify { display: flex; align-items: flex-start; gap: 10px; padding: 10px 8px 10px 14px; border-radius: 14px; background: var(--uspp-ggpp-surface-l2); color: var(--uspp-ggpp-fg-primary); border: 1px solid var(--uspp-ggpp-border-l2); box-shadow: 0 8px 32px rgb(0 0 0 / .3); font-size: 14px; pointer-events: auto; animation: uspp-ggpp-fade .12s ease-out; }
.uspp-ggpp-notify[data-clickable] { cursor: pointer; }
.uspp-ggpp-notify[data-type="ERROR"] { border-color: var(--uspp-ggpp-fg-danger); }
.uspp-ggpp-notify-text { flex: 1; min-width: 0; }
.uspp-ggpp-notify-title { font-weight: 600; }
.uspp-ggpp-notify-body { color: var(--uspp-ggpp-fg-secondary); font-size: 13px; margin-top: 2px; word-break: break-word; }
.uspp-ggpp-notify-log[data-clickable] { cursor: pointer; }
.uspp-ggpp-palette { width: min(640px, calc(100vw - 32px)); max-height: min(520px, calc(100vh - 96px)); align-self: flex-start; margin-top: 10vh; display: flex; flex-direction: column; border-radius: 16px; background: var(--uspp-ggpp-surface-l1); color: var(--uspp-ggpp-fg-primary); border: 1px solid var(--uspp-ggpp-border-l2); box-shadow: 0 16px 48px rgb(0 0 0 / .35); overflow: hidden; }
.uspp-ggpp-palette-input { margin: 10px; width: auto; }
.uspp-ggpp-palette-list { overflow: auto; padding: 0 6px 6px; }
.uspp-ggpp-palette-item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 10px; cursor: pointer; }
.uspp-ggpp-palette-item[aria-selected="true"] { background: var(--uspp-ggpp-button-ghost-hover); }
.uspp-ggpp-palette-kind { flex: none; width: 64px; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: var(--uspp-ggpp-fg-tertiary); }
.uspp-ggpp-palette-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.uspp-ggpp-palette-text > * { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.uspp-ggpp-kbd { display: inline-block; min-width: 48px; padding: 2px 8px; border-radius: 6px; border: 1px solid var(--uspp-ggpp-border-l2); background: var(--uspp-ggpp-surface-l2); font: 12px ui-monospace, monospace; text-align: center; color: var(--uspp-ggpp-fg-primary); }
.uspp-ggpp-kbd[data-empty] { color: var(--uspp-ggpp-fg-tertiary); }
.uspp-ggpp-keybind { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 6px; }
.uspp-ggpp-keybind .uspp-ggpp-setting-error { flex-basis: 100%; text-align: right; }
.uspp-ggpp-stack { margin: 6px 0 0; max-height: 180px; overflow: auto; font-size: 12px; white-space: pre-wrap; word-break: break-word; color: var(--uspp-ggpp-fg-secondary); }
.uspp-ggpp-slot-button { display: inline-flex; align-items: center; gap: 4px; }
.uspp-ggpp-changelog { display: flex; flex-direction: column; gap: 10px; }
.uspp-ggpp-changelog-notes { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 4px; }
/* 弹窗本身获得焦点时(打开弹窗时焦点先放在这里)不画焦点框 */
.uspp-ggpp-modal:focus { outline: none; }
/* 系统设置了"减少动态效果"时去掉动画和过渡 */
@media (prefers-reduced-motion: reduce) {
  [class^="uspp-ggpp-"], [class*=" uspp-ggpp-"], [class^="uspp-ggpp-"]::after, [class*=" uspp-ggpp-"]::after { animation: none !important; transition: none !important; }
}
`;

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/diagnostics.js
  var patchSummary = () => null;
  function setPatchSummary(fn2) {
    patchSummary = fn2;
  }
  function collectDiagnostics() {
    const info = GM2.info;
    const ua = (() => {
      try {
        return W3.navigator.userAgent;
      } catch {
        return "?";
      }
    })();
    const all = Object.values(plugins);
    const enabled = all.filter((p3) => isPluginEnabled(p3.name));
    const failed2 = enabled.filter((p3) => pluginPhase(p3) === "failed");
    let patches2 = null;
    try {
      patches2 = patchSummary();
    } catch {
      patches2 = null;
    }
    const lines = [
      `${SCRIPT_NAME} ${VERSION} (${BUILD_TYPE}) · script ID ${SCRIPT_ID} · Userscript++ ${FRAMEWORK_VERSION} · API ${API_VERSION}`,
      `Script manager: ${`${info?.scriptHandler ?? "unknown"} ${info?.version ?? ""}`.trim()}${missingCapabilities().length ? ` · missing: ${missingCapabilities().join(", ")}` : ""}`,
      `Browser: ${ua}`,
      `Site: ${getSite().id} · ${(() => {
        try {
          return W3.location.origin + W3.location.pathname;
        } catch {
          return "?";
        }
      })()}`,
      `Safe mode: ${isSafeMode() ? `on (${safeModeReason()})` : "off"}${bootTrackingAvailable() ? "" : " · crash detection unavailable (no sessionStorage)"}`,
      `Plugins: ${enabled.length} enabled of ${all.length}`,
      `Enabled: ${enabled.map((p3) => p3.name + (p3.started ? "" : ` (${pluginPhase(p3)})`)).join(", ") || "none"}`,
      `Failed to start: ${failed2.map((p3) => `${p3.name}: ${p3.startError?.message ?? "unknown"}`).join("; ") || "none"}`
    ];
    const blocked2 = blockedRequests();
    if (blocked2.length) lines.push(`Blocked requests: ${[...new Set(blocked2.map((b3) => b3.plugin ? `${b3.host} (${b3.plugin})` : b3.host))].join(", ")}`);
    const errs = pluginErrorStats();
    if (errs.length) lines.push(`Runtime errors: ${errs.slice(0, 8).map((e3) => `${e3.name} ×${e3.count}${e3.tripped ? " (turned off)" : ""}: ${e3.last?.where ?? "?"}: ${e3.last?.message ?? ""}`.slice(0, 200)).join("; ")}`);
    const dead = Object.entries(deadSelfHits());
    if (dead.length) lines.push(`Patches calling stopped plugins: ${dead.map(([n2, c3]) => `${n2} ×${c3}`).join(", ")}`);
    const slow = slowestStarts(5);
    if (slow.length) lines.push(`Slowest starts: ${slow.map((s3) => `${s3.name} ${s3.ms} ms`).join(", ")}`);
    if (patches2) lines.push(`Patches: ${JSON.stringify(patches2)}`);
    const logs = recentLogs();
    lines.push(`Recent warnings and errors (${logs.length}):`);
    for (const l3 of logs) lines.push(`  ${l3.at} [${l3.level}] ${l3.source}: ${l3.text}`);
    return lines.join("\n");
  }
  var MAX_URL = 7e3;
  function githubIssueUrl(supportURL, title, body) {
    const m3 = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)/.exec(String(supportURL || ""));
    if (!m3) return null;
    const repo = m3[2].replace(/\.git$/, "");
    return `https://github.com/${m3[1]}/${repo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  }
  function issueBody(diagnostics) {
    return [
      "**What happened?**",
      "",
      "",
      "**Steps to reproduce**",
      "",
      "1. ",
      "",
      "<details><summary>Diagnostic info</summary>",
      "",
      "```",
      diagnostics,
      "```",
      "",
      "</details>"
    ].join("\n");
  }
  function reportIssueTarget(supportURL, diagnostics) {
    const title = `[${SCRIPT_NAME} ${VERSION}] `;
    let url = githubIssueUrl(supportURL, title, issueBody(diagnostics));
    if (!url) return { url: supportURL, copied: true, truncated: false };
    if (url.length <= MAX_URL) return { url, copied: false, truncated: false };
    let lines = diagnostics.split("\n");
    while (lines.length > 1 && url.length > MAX_URL) {
      lines = lines.slice(0, -1);
      url = githubIssueUrl(supportURL, title, issueBody([...lines, "… (truncated; the full text is on your clipboard)"].join("\n")));
    }
    return { url, copied: true, truncated: true };
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/Palette.js
  var PALETTE_KEY = "uspp-ggpp-palette";
  var openPluginFn = () => {
  };
  function setPaletteOpener(fn2) {
    openPluginFn = fn2;
  }
  function fuzzyScore(query, text) {
    const q4 = query.toLowerCase().trim(), t3 = String(text || "").toLowerCase();
    if (!q4) return 0;
    if (t3.includes(q4)) return 100 - t3.indexOf(q4) + (t3.startsWith(q4) ? 50 : 0);
    let ti = 0, score2 = 0, streak = 0;
    for (const ch of q4) {
      if (ch === " ") continue;
      const i3 = t3.indexOf(ch, ti);
      if (i3 < 0) return -1;
      streak = i3 === ti ? streak + 1 : 0;
      score2 += 1 + streak + (i3 === 0 || /[\s._-]/.test(t3[i3 - 1]) ? 3 : 0);
      ti = i3 + 1;
    }
    return score2;
  }
  function entries() {
    const out = [];
    for (const c3 of getCommands()) out.push({ kind: "Command", id: `cmd:${c3.id}`, title: c3.name, sub: c3.description || c3.plugin || "", key: keyFor(c3.id), words: [c3.name, ...c3.keywords || [], c3.plugin || ""].join(" "), usage: usageOf(c3.id), run: () => runCommand(c3.id) });
    for (const p3 of Object.values(plugins)) {
      if (p3.hidden || p3.chromiumOnly && !isChromium()) continue;
      out.push({ kind: "Plugin", id: `plugin:${p3.name}`, title: p3.name, sub: `${isPluginEnabled(p3.name) ? "Enabled" : "Disabled"} · ${p3.description || ""}`, words: [p3.name, p3.description, ...p3.tags || []].join(" "), usage: 0, run: () => openPluginFn(p3.name) });
      for (const [key, s3] of getVisibleSettings(p3)) {
        out.push({ kind: "Setting", id: `setting:${p3.name}.${key}`, title: humanizeKey(key), sub: `${p3.name}${s3.description ? ` · ${s3.description}` : ""}`, words: [key, humanizeKey(key), s3.description, p3.name].join(" "), usage: 0, run: () => openPluginFn(p3.name, key) });
      }
    }
    return out;
  }
  function Palette({ onClose }) {
    const [q4, setQ] = useState("");
    const [sel, setSel] = useState(0);
    const input = useRef(null);
    const all = useMemo(entries, []);
    const list2 = useMemo(() => {
      if (!q4.trim()) return all.filter((e3) => e3.kind === "Command").sort((a3, b3) => b3.usage - a3.usage || a3.title.localeCompare(b3.title)).slice(0, 30);
      return all.map((e3) => ({ e: e3, s: Math.max(fuzzyScore(q4, e3.title) * 2, fuzzyScore(q4, e3.words)) })).filter((x4) => x4.s >= 0).sort((a3, b3) => b3.s - a3.s || b3.e.usage - a3.e.usage).slice(0, 30).map((x4) => x4.e);
    }, [q4, all]);
    useEffect(() => {
      input.current?.focus();
    }, []);
    useEffect(() => {
      setSel(0);
    }, [q4]);
    const pick = (e3) => {
      if (!e3) return;
      onClose();
      setTimeout(() => e3.run(), 0);
    };
    const onKeyDown = (ev) => {
      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        setSel((i3) => Math.min(i3 + 1, list2.length - 1));
      } else if (ev.key === "ArrowUp") {
        ev.preventDefault();
        setSel((i3) => Math.max(i3 - 1, 0));
      } else if (ev.key === "Enter") {
        ev.preventDefault();
        pick(list2[sel]);
      } else if (ev.key === "Escape") {
        ev.preventDefault();
        onClose();
      }
    };
    return h(
      "div",
      { className: "uspp-ggpp-palette", role: "dialog", "aria-label": "Search", "data-uspp-ggpp-palette": "" },
      h("input", { ref: input, className: "uspp-ggpp-input uspp-ggpp-palette-input", placeholder: "Search commands, plugins and settings…", value: q4, onInput: (e3) => setQ(e3.target.value), onChange: (e3) => setQ(e3.target.value), onKeyDown }),
      h("div", { className: "uspp-ggpp-palette-list", role: "listbox" }, list2.length ? list2.map((e3, i3) => h(
        "div",
        {
          key: e3.id,
          role: "option",
          "aria-selected": String(i3 === sel),
          className: "uspp-ggpp-palette-item",
          "data-uspp-ggpp-palette-item": e3.id,
          onMouseEnter: () => setSel(i3),
          onClick: () => pick(e3)
        },
        h("span", { className: "uspp-ggpp-palette-kind" }, e3.kind),
        h("span", { className: "uspp-ggpp-palette-text" }, h("span", { className: "uspp-ggpp-palette-title" }, e3.title), e3.sub && h("span", { className: "uspp-ggpp-muted uspp-ggpp-small" }, e3.sub)),
        e3.key && h("kbd", { className: "uspp-ggpp-kbd" }, e3.key)
      )) : h("div", { className: "uspp-ggpp-empty" }, "No results."))
    );
  }
  function openPalette() {
    openModal(({ onClose }) => h(Palette, { onClose }), { modalKey: PALETTE_KEY });
  }
  var closePalette = () => closeModal(PALETTE_KEY);

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/notify.js
  var logger26 = new Logger("Notify", "#fbcfe8");
  var MAX_HISTORY = 50;
  var MAX_SHOWN = 4;
  var shown = [];
  var history = [];
  var listeners11 = /* @__PURE__ */ new Set();
  var emit10 = () => {
    for (const l3 of [...listeners11]) l3();
  };
  var subscribeNotifications = (fn2) => {
    listeners11.add(fn2);
    return () => listeners11.delete(fn2);
  };
  var getNotificationHistory = () => history.slice();
  function clearNotificationHistory() {
    history.length = 0;
    emit10();
  }
  var seq3 = 0;
  function notify2(opts = {}) {
    const n2 = { id: ++seq3, at: Date.now(), type: String(opts.type || "INFO").toUpperCase(), title: opts.title ?? SCRIPT_NAME, body: opts.body ?? "", icon: opts.icon, onClick: opts.onClick, plugin: opts.plugin };
    history.unshift(n2);
    if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
    shown = [n2, ...shown].slice(0, MAX_SHOWN);
    ensureRoot();
    emit10();
    const close = () => {
      if (!shown.includes(n2)) return;
      shown = shown.filter((x4) => x4 !== n2);
      emit10();
    };
    const duration = opts.duration ?? 5e3;
    if (duration > 0) setTimeout(close, duration);
    if (opts.system) sendSystem(n2);
    return close;
  }
  function sendSystem(n2) {
    const text = typeof n2.body === "string" ? n2.body : "";
    try {
      if (GM2.notification) {
        GM2.notification({ title: String(n2.title), text: text || " ", onclick: () => {
          try {
            n2.onClick?.();
          } catch (e3) {
            logger26.error(e3);
          }
        } });
        return;
      }
      const N3 = W3.Notification;
      if (N3?.permission === "granted") {
        const x4 = new N3(String(n2.title), { body: text });
        x4.onclick = () => n2.onClick?.();
      }
    } catch (e3) {
      logger26.debug("系统通知失败", e3);
    }
  }
  function NotifyHost() {
    useSubscription(subscribeNotifications);
    if (!shown.length) return null;
    return h("div", { className: "uspp-ggpp-notify-stack" }, shown.map((n2) => h(
      "div",
      {
        key: n2.id,
        className: "uspp-ggpp-notify",
        "data-type": n2.type,
        role: "status",
        "data-clickable": n2.onClick ? "" : void 0,
        onClick: () => {
          if (!n2.onClick) return;
          try {
            n2.onClick();
          } catch (e3) {
            logger26.error("通知点击处理出错", e3);
          }
          shown = shown.filter((x4) => x4 !== n2);
          emit10();
        }
      },
      n2.icon && h("div", { className: "uspp-ggpp-notify-icon" }, typeof n2.icon === "function" ? h(n2.icon, { size: 5 }) : n2.icon),
      h(
        "div",
        { className: "uspp-ggpp-notify-text" },
        h("div", { className: "uspp-ggpp-notify-title" }, n2.title),
        n2.body && h("div", { className: "uspp-ggpp-notify-body" }, n2.body)
      ),
      h("button", { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-icon", "aria-label": "Close", onClick: (e3) => {
        e3.stopPropagation();
        shown = shown.filter((x4) => x4 !== n2);
        emit10();
      } }, h(CloseIcon, { size: 4 }))
    )));
  }
  addLayer("notify", NotifyHost);

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/updater.js
  var logger27 = new Logger("Updater", "#fda4af");
  var UPDATE_INFO = true ? null : null;
  var CHANGELOG = typeof define_USPP_CHANGELOG_default !== "undefined" ? define_USPP_CHANGELOG_default : [];
  var DAY2 = 24 * 60 * 60 * 1e3;
  function compareVersions(a3, b3) {
    const split = (v3) => {
      const s3 = String(v3 ?? "").trim().replace(/^v/i, "").split("+")[0];
      const i3 = s3.indexOf("-");
      return i3 < 0 ? [s3, null] : [s3.slice(0, i3), s3.slice(i3 + 1)];
    };
    const [ma, pa] = split(a3), [mb, pb] = split(b3);
    const na = ma.split(/[^\d]+/).filter(Boolean).map(Number), nb = mb.split(/[^\d]+/).filter(Boolean).map(Number);
    for (let i3 = 0; i3 < Math.max(na.length, nb.length); i3++) {
      const x4 = na[i3] ?? 0, y3 = nb[i3] ?? 0;
      if (x4 !== y3) return x4 > y3 ? 1 : -1;
    }
    if (pa === pb) return 0;
    if (pa === null) return 1;
    if (pb === null) return -1;
    const ia = pa.split("."), ib = pb.split(".");
    for (let i3 = 0; i3 < Math.max(ia.length, ib.length); i3++) {
      const x4 = ia[i3], y3 = ib[i3];
      if (x4 === void 0) return -1;
      if (y3 === void 0) return 1;
      if (x4 === y3) continue;
      const dx = /^\d+$/.test(x4), dy = /^\d+$/.test(y3);
      if (dx && dy) return Number(x4) > Number(y3) ? 1 : -1;
      if (dx !== dy) return dx ? -1 : 1;
      return x4 > y3 ? 1 : -1;
    }
    return 0;
  }
  var parseMetaVersion = (text) => /^\/\/\s*@version\s+(\S+)/m.exec(String(text))?.[1] ?? null;
  var state2 = { checking: false, last: null, listeners: /* @__PURE__ */ new Set() };
  var emit11 = () => {
    for (const fn2 of [...state2.listeners]) {
      try {
        fn2();
      } catch {
      }
    }
  };
  var subscribeUpdates = (fn2) => {
    state2.listeners.add(fn2);
    return () => state2.listeners.delete(fn2);
  };
  var lastCheck = () => state2.last;
  var isChecking = () => state2.checking;
  var canUpdate = () => !!UPDATE_INFO?.meta;
  var sys2 = () => Settings.plugins.Settings;
  var RETRY_AFTER = [5 * 60 * 1e3, 30 * 60 * 1e3, 2 * 60 * 60 * 1e3, 6 * 60 * 60 * 1e3];
  var inflight2 = null;
  function checkForUpdate() {
    if (!canUpdate()) return Promise.resolve({ hasUpdate: false, error: "no-update-url" });
    if (inflight2) return inflight2;
    state2.checking = true;
    emit11();
    inflight2 = (async () => {
      let res;
      try {
        const r3 = await fetchExternal(`${UPDATE_INFO.meta}${UPDATE_INFO.meta.includes("?") ? "&" : "?"}t=${Date.now()}`);
        if (!r3.ok) throw new Error(`HTTP ${r3.status}`);
        const latest = parseMetaVersion(await r3.text());
        if (!latest) throw new Error("no @version in meta file");
        res = { at: Date.now(), current: VERSION, latest, hasUpdate: compareVersions(latest, VERSION) > 0, error: null };
      } catch (e3) {
        logger27.debug("检查更新失败", e3);
        res = { at: Date.now(), current: VERSION, latest: null, hasUpdate: false, error: String(e3?.message ?? e3) };
      }
      try {
        const s3 = sys2();
        if (res.error) {
          s3.updateCheckFailures = (Number(PlainSettings.plugins.Settings?.updateCheckFailures) || 0) + 1;
          s3.lastUpdateFailedAt = res.at;
        } else {
          s3.lastUpdateCheck = res.at;
          if (PlainSettings.plugins.Settings?.updateCheckFailures) s3.updateCheckFailures = 0;
        }
      } catch {
      }
      state2.last = res;
      return res;
    })();
    inflight2.finally(() => {
      inflight2 = null;
      state2.checking = false;
      emit11();
    });
    return inflight2;
  }
  function installUpdate() {
    if (!UPDATE_INFO?.download) return false;
    const url = `${UPDATE_INFO.download}${UPDATE_INFO.download.includes("?") ? "&" : "?"}t=${Date.now()}`;
    W3.open(url, "_blank", "noopener");
    return true;
  }
  function noteRunningVersion() {
    const plain = PlainSettings.plugins.Settings ??= {};
    const prev = typeof plain.lastVersion === "string" ? plain.lastVersion : null;
    if (prev !== VERSION) sys2().lastVersion = VERSION;
    if (!prev || compareVersions(VERSION, prev) <= 0) return null;
    const entries2 = CHANGELOG.filter((e3) => compareVersions(e3.version, prev) > 0 && compareVersions(e3.version, VERSION) <= 0);
    return { from: prev, to: VERSION, entries: entries2 };
  }
  async function maybeAutoCheck(onUpdate, { every = DAY2 } = {}) {
    if (!canUpdate()) return null;
    const plain = PlainSettings.plugins.Settings ?? {};
    if (plain.autoCheckUpdates === false) return null;
    const fails = Number(plain.updateCheckFailures) || 0;
    if (fails > 0) {
      const wait = Math.min(every, RETRY_AFTER[Math.min(fails, RETRY_AFTER.length) - 1]);
      if (Date.now() - (Number(plain.lastUpdateFailedAt) || 0) < wait) return null;
    } else if (Date.now() - (Number(plain.lastUpdateCheck) || 0) < every) return null;
    const res = await checkForUpdate();
    if (res?.hasUpdate) onUpdate?.(res);
    return res;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/UpdatesTab.js
  var when = (t3) => t3 ? new Date(t3).toLocaleString() : "never";
  function ChangelogList({ entries: entries2 = CHANGELOG, current: current3 = VERSION }) {
    if (!entries2.length) return h("div", { className: "uspp-ggpp-empty" }, "No changelog in this build.");
    return h("div", { className: "uspp-ggpp-changelog" }, entries2.map((e3) => h(
      "div",
      { key: e3.version, className: "uspp-ggpp-section", "data-uspp-ggpp-changelog-version": e3.version },
      h(
        "div",
        { className: "uspp-ggpp-row-title" },
        `v${e3.version}`,
        e3.date && h("span", { className: "uspp-ggpp-muted uspp-ggpp-small" }, ` · ${e3.date}`),
        compareVersions(e3.version, current3) === 0 && h("span", { className: "uspp-ggpp-muted uspp-ggpp-small" }, " · installed")
      ),
      e3.notes.length > 0 && h("ul", { className: "uspp-ggpp-changelog-notes" }, e3.notes.map((n2, i3) => h("li", { key: i3 }, n2)))
    )));
  }
  function openChangelog({ entries: entries2 = CHANGELOG, title = "What's new" } = {}) {
    const key = "uspp-ggpp-changelog";
    openModal(() => h(ModalCard, { title, subtitle: `Installed: v${VERSION}`, width: 560, onClose: () => closeModal(key) }, h(ChangelogList, { entries: entries2 })), { modalKey: key });
    return key;
  }
  var AUTO_PATH = "plugins.Settings.autoCheckUpdates";
  var subscribeAuto = (fn2) => {
    SettingsStore.addChangeListener(AUTO_PATH, fn2);
    return () => SettingsStore.removeChangeListener(AUTO_PATH, fn2);
  };
  function UpdatesTab() {
    useSubscription(subscribeUpdates);
    useSubscription(subscribeAuto);
    const last2 = lastCheck();
    const checking = isChecking();
    const plain = PlainSettings.plugins.Settings ?? {};
    const auto = plain.autoCheckUpdates !== false;
    let status = null;
    if (!canUpdate()) status = "This build has no update address; your script manager handles updates.";
    else if (checking) status = "Checking…";
    else if (last2?.error) status = `Couldn't check for updates: ${last2.error}`;
    else if (last2?.hasUpdate) status = `v${last2.latest} is available.`;
    else if (last2) status = "You're on the latest version.";
    return h(
      "div",
      { className: "uspp-ggpp-page", "data-uspp-ggpp-page": "updates" },
      h(
        "div",
        { className: "uspp-ggpp-section" },
        h(
          Row,
          { title: `Installed: v${VERSION}`, description: `${BUILD_TYPE} build · last checked ${when(last2?.at ?? plain.lastUpdateCheck)}` },
          canUpdate() && h(Button, { size: "sm", disabled: checking, onClick: () => checkForUpdate() }, "Check now")
        ),
        status && h("div", { className: "uspp-ggpp-muted uspp-ggpp-small", "data-uspp-ggpp-update-status": "" }, status),
        last2?.hasUpdate && h(Button, { variant: "primary", onClick: () => installUpdate() }, `Update to v${last2.latest}`),
        canUpdate() && h(
          Row,
          { title: "Check for updates automatically", description: "Once a day, and notify when a new version is out." },
          h(Switch, { checked: auto, label: "Check for updates automatically", onChange: (v3) => {
            Settings.plugins.Settings.autoCheckUpdates = v3;
          } })
        )
      ),
      h("h3", { className: "uspp-ggpp-row-title", style: { margin: "16px 0 8px" } }, "Changelog"),
      h(ChangelogList, {})
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/BackupTab.js
  var list = (names) => names.length > 6 ? `${names.slice(0, 6).join(", ")} and ${names.length - 6} more` : names.join(", ");
  var invalidText = (inv) => inv.map((x4) => x4.key === "*" ? x4.plugin : `${x4.plugin}.${x4.key} (${x4.reason})`);
  var reloadList = () => [...pendingReload].join(", ") || "Some plugins";
  async function runUndoImport() {
    const reload = await undoImport();
    if (reload === null) {
      showToast("There is no import to undo.", ToastType.INFO);
      return false;
    }
    showToast("Import undone. Your previous settings are back.", ToastType.SUCCESS);
    if (reload && await confirmDialog({ title: "Reload required", body: `${reloadList()} ${pendingReload.size === 1 ? "needs" : "need"} a page reload to apply the restored settings.`, confirmText: "Reload", cancelText: "Later" })) location.reload();
    return true;
  }
  async function runImport() {
    const text = await pickJsonFile();
    if (text == null) return false;
    let parsed;
    try {
      parsed = parseBackup(text);
    } catch (e3) {
      showToast(e3.message, ToastType.ERROR);
      return false;
    }
    const s3 = parsed.summary;
    const pv = previewImport(parsed.settings);
    const ok = await confirmDialog({
      title: "Import settings?",
      body: h(
        "div",
        { "data-uspp-ggpp-import-preview": "" },
        h("p", null, `This replaces all current ${SCRIPT_NAME} settings with the file's: ${s3.plugins} plugins (${s3.enabled} enabled), ${s3.themes} themes in ${s3.sites} site${s3.sites === 1 ? "" : "s"}${s3.dataPlugins ? `, and stored data for ${s3.dataPlugins} plugin${s3.dataPlugins === 1 ? "" : "s"}` : ""}${s3.exportedAt ? `, exported ${s3.exportedAt.slice(0, 10)}` : ""}.`),
        pv.turnOn.length > 0 && h("p", null, `Turns on: ${list(pv.turnOn)}.`),
        pv.turnOff.length > 0 && h("p", null, `Turns off: ${list(pv.turnOff)}.`),
        pv.changed > 0 && h("p", null, `Changes ${pv.changed} plugin setting${pv.changed === 1 ? "" : "s"}.`),
        pv.invalid.length > 0 && h("p", null, `Skips ${pv.invalid.length} invalid value${pv.invalid.length === 1 ? "" : "s"}, which keep their defaults: ${list(invalidText(pv.invalid))}.`),
        h("p", null, "You can undo the import afterwards.")
      ),
      confirmText: "Import",
      danger: true
    });
    if (!ok) return false;
    const reload = await importSettings(parsed.settings, { data: parsed.data });
    const skipped = lastImportInvalid().length;
    showNotice({
      message: `Settings imported${skipped ? ` (${skipped} invalid value${skipped === 1 ? "" : "s"} skipped)` : ""}.`,
      type: "SUCCESS",
      duration: 2e4,
      action: { label: "Undo", onClick: () => {
        runUndoImport();
      } }
    });
    if (reload && await confirmDialog({ title: "Reload required", body: `${reloadList()} ${pendingReload.size === 1 ? "needs" : "need"} a page reload to apply the imported settings.`, confirmText: "Reload", cancelText: "Later" })) location.reload();
    return true;
  }
  function UndoRow() {
    const [last2, setLast] = useState(null);
    useEffect(() => {
      let live = true;
      lastImport().then((v3) => {
        if (live) setLast(v3);
      });
      return () => {
        live = false;
      };
    }, []);
    if (!last2) return null;
    return h(
      Row,
      { title: "Undo last import", description: `Restores the settings you had before the import on ${new Date(last2.at).toLocaleString()}.` },
      h(Button, { onClick: async () => {
        if (await runUndoImport()) setLast(null);
      } }, "Undo import")
    );
  }
  function BackupTab() {
    const [secrets, setSecrets] = useState(false);
    const [withData, setWithData] = useState(false);
    const doExport = async () => downloadJson(withData ? await exportSettingsWithData({ includeSensitive: secrets }) : exportSettings({ includeSensitive: secrets }), backupFilename());
    return h(
      "div",
      { className: "uspp-ggpp-page", "data-uspp-ggpp-page": "backup" },
      h(
        "div",
        { className: "uspp-ggpp-section" },
        h(
          Row,
          { title: "Export settings", description: `Saves all ${SCRIPT_NAME} settings, for every site, to a JSON file.` },
          h(Button, { onClick: () => {
            doExport();
          } }, "Export")
        ),
        h(
          Row,
          { title: "Include sensitive values", description: "Plugin settings marked sensitive (such as keys) are left out unless this is on." },
          h(Switch, { checked: secrets, label: "Include sensitive values", onChange: setSecrets })
        ),
        h(
          Row,
          { title: "Include plugin data", description: "Also saves data plugins keep outside their settings, such as caches and history. Can make the file large." },
          h(Switch, { checked: withData, label: "Include plugin data", onChange: setWithData })
        )
      ),
      h(
        "div",
        { className: "uspp-ggpp-section" },
        h(
          Row,
          { title: "Import settings", description: "Replaces all current settings with a file you exported before. You'll be asked to confirm." },
          h(Button, { onClick: () => {
            runImport();
          } }, "Import")
        ),
        h(UndoRow, null)
      )
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/index.js
  var NAME = "Settings";
  var MENU_COMMAND_ID = "uspp-ggpp-settings";
  var MENU_SEARCH_ID = "uspp-ggpp-search";
  var MENU_SAFE_ID = "uspp-ggpp-safe-reload";
  async function reportIssue() {
    if (!SUPPORT_URL) return false;
    const text = collectDiagnostics();
    const target2 = reportIssueTarget(SUPPORT_URL, text);
    if (target2.copied) {
      const ok = await copyToClipboard(text);
      if (ok !== false) showToast(target2.truncated ? "Full diagnostic info copied: paste it into the issue." : "Diagnostic info copied: paste it into your report.", "SUCCESS");
    }
    try {
      W3.open(target2.url, "_blank", "noopener");
    } catch {
      return false;
    }
    return true;
  }
  async function copyDiagnostics() {
    const ok = await copyToClipboard(collectDiagnostics());
    showToast(ok === false ? "Couldn't copy diagnostic info." : "Diagnostic info copied.", ok === false ? "ERROR" : "SUCCESS");
    return ok;
  }
  var settings = definePluginSettings({
    showSiteEntry: {
      type: OptionType.BOOLEAN,
      default: true,
      description: "Show this script's entry in the site's own menus and settings.",
      // 只有声明了 settingsHost 的站点才有站点入口
      get hidden() {
        return !getSite().settingsHost;
      }
    },
    floatingPosition: {
      type: OptionType.SELECT,
      description: "Where floating buttons from plugins appear.",
      options: [
        { label: "Bottom right", value: "bottom-right", default: true },
        { label: "Bottom left", value: "bottom-left" },
        { label: "Top right", value: "top-right" },
        { label: "Top left", value: "top-left" }
      ]
    },
    debugLogs: {
      type: OptionType.BOOLEAN,
      default: false,
      description: "Print debug logs to the browser console (useful when reporting a problem).",
      onChange: (v3) => setDebugLogs(v3)
    }
  });
  async function checkNow() {
    const r3 = await checkForUpdate();
    if (r3?.error) showToast(`Couldn't check for updates: ${r3.error}`, "ERROR");
    else if (r3?.hasUpdate) announceUpdate(r3);
    else showToast(`${SCRIPT_NAME} is up to date (v${r3?.current}).`, "SUCCESS");
    return r3;
  }
  var announceUpdate = (r3) => notify2({ title: `${SCRIPT_NAME} v${r3.latest} is available`, body: `You have v${r3.current}. Click to update.`, type: "info", duration: 15e3, onClick: () => installUpdate() });
  function afterStart() {
    const changed = noteRunningVersion();
    if (changed) notify2({
      title: `${SCRIPT_NAME} updated to v${changed.to}`,
      body: changed.entries.length ? `${changed.entries.flatMap((e3) => e3.notes).slice(0, 2).join(" · ")}${changed.entries.flatMap((e3) => e3.notes).length > 2 ? " …" : ""} — click for details.` : `Updated from v${changed.from}.`,
      type: "success",
      duration: 12e3,
      onClick: changed.entries.length ? () => openChangelog({ entries: changed.entries, title: `What's new since v${changed.from}` }) : void 0
    });
    maybeAutoCheck(announceUpdate).catch(() => {
    });
  }
  var FLOATING_ENTRY_ID = "uspp.settingsEntry";
  function addFloatingEntry() {
    if (GM2.menu) return;
    addSlotItem("floating", FLOATING_ENTRY_ID, { label: `${SCRIPT_NAME} settings`, icon: SlidersIcon, order: -1e3, onSelect: () => openSettings() });
  }
  var openSettings = () => {
  };
  function setSettingsOpener(fn2) {
    openSettings = fn2;
  }
  var settings_default3 = definePlugin2({
    name: NAME,
    description: "Userscript++ settings panel and menu command, and loads themes and Quick CSS.",
    authors: ["Userscript++"],
    required: true,
    site: "*",
    settings,
    commands: [
      { id: "uspp.palette", name: "Search commands, plugins and settings", keywords: ["palette", "find"], defaultKey: "Alt+Shift+P", run: () => openPalette() },
      { id: "uspp.settings", name: "Open settings", keywords: ["preferences", "options"], run: () => openSettings() },
      { id: "uspp.safeReload", name: "Reload in safe mode", description: "Reload with only required plugins, no themes and no Quick CSS.", keywords: ["crash", "broken"], run: () => reloadInSafeMode() },
      { id: "uspp.checkUpdates", name: "Check for updates", keywords: ["update", "version", "upgrade"], when: () => canUpdate(), run: () => checkNow() },
      { id: "uspp.changelog", name: "Show changelog", keywords: ["what's new", "release notes", "version"], run: () => openChangelog() },
      { id: "uspp.reportIssue", name: "Report a problem", description: "Open the issue page with diagnostic info filled in. Nothing is sent until you submit it.", keywords: ["bug", "issue", "support", "feedback"], when: () => !!SUPPORT_URL, run: () => reportIssue() },
      { id: "uspp.undoImport", name: "Undo last import", description: "Restore the settings you had before the last backup import.", keywords: ["backup", "restore", "revert"], when: () => canUndoImport(), run: () => runUndoImport() },
      { id: "uspp.diagnostics", name: "Copy diagnostic info", description: "Versions, enabled plugins, patch status and recent errors, for bug reports.", keywords: ["debug", "support", "report"], run: () => copyDiagnostics() }
    ],
    start() {
      migratePluginSetting(NAME, "showSiteEntry", "showMenu");
      setDebugLogs(settings.store.debugLogs);
      lastImport().catch(() => {
      });
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", afterStart, { once: true });
      else setTimeout(afterStart, 0);
      if (isSafeMode()) {
        addSlotItem("menuCommand", MENU_COMMAND_ID, { label: `${SCRIPT_NAME} settings`, order: -1e3, onSelect: () => openSettings() });
        addSlotItem("menuCommand", MENU_SEARCH_ID, { label: `${SCRIPT_NAME}: search…`, order: -999, onSelect: () => openPalette() });
        addFloatingEntry();
        return;
      }
      applyQuickCss();
      if (isThemesEnabled()) applyAllThemes();
      let queued = false;
      this._apply = () => {
        if (queued) return;
        queued = true;
        queueMicrotask(() => {
          queued = false;
          applyQuickCss();
          applyAllThemes();
        });
      };
      for (const k4 of [SITES_PATH, "plugins.Settings.themesEnabled", "plugins.Settings.onlineThemesEnabled"]) SettingsStore.addPrefixChangeListener(k4, this._apply);
      addSlotItem("menuCommand", MENU_COMMAND_ID, { label: `${SCRIPT_NAME} settings`, order: -1e3, onSelect: () => openSettings() });
      addSlotItem("menuCommand", MENU_SEARCH_ID, { label: `${SCRIPT_NAME}: search…`, order: -999, onSelect: () => openPalette() });
      addSlotItem("menuCommand", MENU_SAFE_ID, { label: `${SCRIPT_NAME}: reload in safe mode`, order: -998, onSelect: () => reloadInSafeMode() });
      addFloatingEntry();
    },
    stop() {
      if (this._apply) for (const k4 of [SITES_PATH, "plugins.Settings.themesEnabled", "plugins.Settings.onlineThemesEnabled"]) SettingsStore.removePrefixChangeListener(k4, this._apply);
      for (const id of [MENU_COMMAND_ID, MENU_SEARCH_ID, MENU_SAFE_ID]) removeSlotItem("menuCommand", id);
      removeSlotItem("floating", FLOATING_ENTRY_ID);
    }
  });

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/PluginPreview.js
  var SLOT_LABELS = {
    toolbar: "Toolbar button",
    menuCommand: "Script menu command",
    floating: "Floating button",
    chatBar: "Composer button",
    conversationMenu: "Conversation menu item",
    messageMenu: "Message menu item",
    userMenu: "Avatar menu item",
    "settings.pluginActions": "Plugin card button"
  };
  var toSrc = (s3) => typeof s3 === "string" && /^\s*<svg[\s>]/i.test(s3) ? "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s3.trim()) : s3;
  function normalize2(v3) {
    if (v3 == null || v3 === false) return [];
    if (Array.isArray(v3)) return v3.flatMap(normalize2);
    if (typeof v3 === "function") return [{ component: v3 }];
    if (typeof v3 === "string") return v3.trim() ? [{ src: v3 }] : [];
    if (typeof v3 === "object" && (v3.component || v3.src || v3.before || v3.after)) return [v3];
    return [];
  }
  var declaredPreviews = (p3) => {
    try {
      return normalize2(p3.preview);
    } catch {
      return [];
    }
  };
  function slotSummary(p3) {
    let slots2 = {};
    try {
      slots2 = pluginSlots(p3);
    } catch {
      slots2 = p3.slots || {};
    }
    const out = [];
    for (const [slot, v3] of Object.entries(slots2 || {})) {
      for (const def of [].concat(v3)) {
        if (!def || typeof def !== "object") continue;
        const label = typeof def.label === "string" ? def.label : typeof def.tooltip === "string" ? def.tooltip : typeof def["aria-label"] === "string" ? def["aria-label"] : def.id ?? p3.name;
        out.push({ slot, label, icon: def.icon });
      }
    }
    return out;
  }
  function hasPreview(p3) {
    if (p3.preview === false) return false;
    return declaredPreviews(p3).length > 0 || slotSummary(p3).length > 0;
  }
  var failed = () => h("div", { className: "uspp-ggpp-muted uspp-ggpp-small uspp-ggpp-preview-empty" }, "Preview failed to render.");
  function Img({ src, alt }) {
    const [bad, setBad] = useState(false);
    if (bad) return h("div", { className: "uspp-ggpp-muted uspp-ggpp-small uspp-ggpp-preview-empty" }, "Image could not be loaded.");
    return h("img", { className: "uspp-ggpp-preview-img", src: toSrc(src), alt: alt || "", loading: "lazy", draggable: false, onError: () => setBad(true) });
  }
  function Frame({ item, plugin }) {
    if (item.component) {
      const ctx = { plugin, settings: Settings.plugins[plugin.name], enabled: isPluginEnabled(plugin.name) };
      return h("div", { className: "uspp-ggpp-preview-live" }, h(ErrorBoundary, { fallback: failed(), label: `preview:${plugin.name}` }, h(item.component, ctx)));
    }
    if (item.before || item.after) {
      return h("div", { className: "uspp-ggpp-preview-compare" }, [["Before", item.before], ["After", item.after]].filter(([, s3]) => s3).map(([label, s3]) => h("figure", { key: label }, h(Img, { src: s3, alt: `${plugin.name} ${label.toLowerCase()}` }), h("figcaption", null, label))));
    }
    return h(Img, { src: item.src, alt: item.alt || plugin.name });
  }
  function SlotSummary({ items }) {
    return h(
      "div",
      { className: "uspp-ggpp-preview-live uspp-ggpp-preview-slots" },
      h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, "Adds to the page:"),
      items.map((it, i3) => h(
        "div",
        { key: i3, className: "uspp-ggpp-preview-slot" },
        h(
          "span",
          { className: "uspp-ggpp-preview-chip" },
          typeof it.icon === "function" ? h(ErrorBoundary, { fallback: null }, h(it.icon, { size: 4 })) : null,
          String(it.label)
        ),
        h("span", { className: "uspp-ggpp-muted uspp-ggpp-small" }, SLOT_LABELS[it.slot] ?? humanizeKey(it.slot))
      ))
    );
  }
  function PluginPreview({ plugin }) {
    const [idx, setIdx] = useState(0);
    if (plugin.preview === false) return null;
    const items = declaredPreviews(plugin);
    const summary = items.length ? [] : slotSummary(plugin);
    if (!items.length && !summary.length) return null;
    const n2 = items.length;
    const i3 = n2 ? Math.min(idx, n2 - 1) : 0;
    const item = items[i3];
    return h(
      "section",
      { className: "uspp-ggpp-preview", "data-uspp-ggpp-preview": plugin.name, "aria-label": "Preview" },
      h(
        "div",
        { className: "uspp-ggpp-preview-head" },
        h("span", { className: "uspp-ggpp-preview-title" }, "Preview"),
        n2 > 1 && h(
          "div",
          { className: "uspp-ggpp-preview-nav" },
          h(
            "button",
            { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-icon", "aria-label": "Previous preview", onClick: () => setIdx((i3 - 1 + n2) % n2) },
            h(ChevronRightIcon, { size: 4, style: { transform: "rotate(180deg)" } })
          ),
          h("span", { className: "uspp-ggpp-muted uspp-ggpp-small" }, `${i3 + 1} / ${n2}`),
          h(
            "button",
            { type: "button", className: "uspp-ggpp-btn uspp-ggpp-btn-icon", "aria-label": "Next preview", onClick: () => setIdx((i3 + 1) % n2) },
            h(ChevronRightIcon, { size: 4 })
          )
        )
      ),
      item ? h(Frame, { key: i3, item, plugin }) : h(SlotSummary, { items: summary }),
      item?.caption && h("div", { className: "uspp-ggpp-muted uspp-ggpp-small uspp-ggpp-preview-caption" }, item.caption)
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/PluginModal.js
  function usePluginSettings(name) {
    const force = useForceUpdate();
    useEffect(() => {
      const prefix = `plugins.${name}.`;
      const fn2 = () => force();
      SettingsStore.addPrefixChangeListener(prefix, fn2);
      return () => SettingsStore.removePrefixChangeListener(prefix, fn2);
    }, [name]);
  }
  function NumberInput({ value, onCommit, bigint }) {
    const shown2 = value == null ? "" : String(value);
    const [text, setText2] = useState(shown2);
    const focused = useRef(false);
    useEffect(() => {
      if (!focused.current) setText2(shown2);
    }, [shown2]);
    return h(Input, {
      type: "text",
      inputMode: bigint ? "numeric" : "decimal",
      value: text,
      onFocus: () => {
        focused.current = true;
      },
      onBlur: () => {
        focused.current = false;
        setText2(shown2);
      },
      onChange: (e3) => {
        const raw2 = e3.target.value;
        setText2(raw2);
        const t3 = raw2.trim();
        if (bigint) {
          if (t3 === "") return onCommit(0n);
          try {
            onCommit(BigInt(t3));
          } catch {
          }
        } else if (t3 !== "" && !isNaN(Number(t3))) {
          onCommit(Number(t3));
        }
      }
    });
  }
  function TextInput({ value, onCommit, multiline, setting }) {
    const shown2 = value ?? "";
    const [text, setText2] = useState(shown2);
    const focused = useRef(false);
    useEffect(() => {
      if (!focused.current) setText2(shown2);
    }, [shown2]);
    const props = {
      value: text,
      placeholder: setting.placeholder,
      onFocus: () => {
        focused.current = true;
      },
      onBlur: () => {
        focused.current = false;
      },
      onChange: (e3) => {
        setText2(e3.target.value);
        onCommit(e3.target.value);
      }
    };
    return multiline ? h(Textarea, { rows: setting.rows ?? 4, ...props, ...setting.componentProps || {} }) : h(Input, { type: "text", ...props });
  }
  function checkOf(plugin, key) {
    return plugin.settings?.checks?.[key] ?? null;
  }
  function isDisabled(check2) {
    try {
      return !!check2?.disabled?.();
    } catch {
      return false;
    }
  }
  function validate(check2, v3) {
    if (typeof check2?.isValid !== "function") return null;
    let r3;
    try {
      r3 = check2.isValid(v3);
    } catch (e3) {
      return e3?.message || "Invalid value.";
    }
    if (r3 === true || r3 === void 0 || r3 === null) return null;
    return typeof r3 === "string" && r3 ? r3 : "Invalid value.";
  }
  function SettingControl({ plugin, keyName: keyName2, setting, onRestartChange }) {
    const store = Settings.plugins[plugin.name];
    const value = store[keyName2];
    const check2 = checkOf(plugin, keyName2);
    const disabled = isDisabled(check2);
    const [error, setError] = useState(null);
    const set = (v3) => {
      const err2 = validate(check2, v3);
      setError(err2);
      if (err2) return false;
      const before = PlainSettings.plugins[plugin.name]?.[keyName2];
      store[keyName2] = v3;
      try {
        setting.onChange?.(v3);
      } catch (e3) {
        console.error("[Userscript++] 设置 onChange 出错", e3);
      }
      if (setting.restartNeeded) onRestartChange?.(plugin.name, keyName2, before, v3);
      return true;
    };
    const title = humanizeKey(keyName2);
    const desc = setting.description && h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, setting.description);
    const err = error && h("div", { className: "uspp-ggpp-setting-error", role: "alert" }, error);
    const wrap2 = (control) => h("fieldset", { className: "uspp-ggpp-setting-fieldset", disabled }, control);
    const cls = disabled ? "uspp-ggpp-setting uspp-ggpp-setting-disabled" : "uspp-ggpp-setting";
    const inline2 = (control) => h(
      "div",
      { className: cls, "data-uspp-ggpp-setting": keyName2, "aria-disabled": disabled || void 0 },
      h("div", { className: "uspp-ggpp-row" }, h("div", { className: "uspp-ggpp-row-text" }, h("div", { className: "uspp-ggpp-row-title" }, title), desc), wrap2(control)),
      err
    );
    const stacked = (control) => h(
      "div",
      { className: cls, "data-uspp-ggpp-setting": keyName2, "aria-disabled": disabled || void 0 },
      h("div", { className: "uspp-ggpp-row-text" }, h("div", { className: "uspp-ggpp-row-title" }, title), desc),
      wrap2(control),
      err
    );
    switch (setting.type) {
      case OptionType.BOOLEAN:
        return inline2(h(Switch, { checked: !!value, onChange: set, label: title, disabled }));
      case OptionType.SELECT:
        return inline2(h(Select, { value, options: setting.options || [], onChange: set, label: title }));
      case OptionType.SLIDER: {
        const min = setting.min ?? 0, max = setting.max ?? 100;
        return stacked(h(
          "div",
          { className: "uspp-ggpp-slider-row" },
          h("input", { type: "range", min, max, step: 1, value: Number(value ?? min), onChange: (e3) => set(Number(e3.target.value)), "aria-label": title }),
          h("span", { className: "uspp-ggpp-muted", style: { minWidth: 36, textAlign: "right" } }, String(value ?? min))
        ));
      }
      case OptionType.NUMBER:
        return stacked(h(NumberInput, { value, onCommit: set }));
      case OptionType.BIGINT:
        return stacked(h(NumberInput, { value, onCommit: set, bigint: true }));
      case OptionType.STRING:
        return stacked(h(TextInput, { value, onCommit: set, multiline: !!setting.multiline, setting }));
      case OptionType.COMPONENT: {
        const C4 = setting.component;
        if (!C4) return null;
        return stacked(h(ErrorBoundary, { fallback: null }, h(C4, { setValue: set, setting, option: setting, value })));
      }
      default:
        return null;
    }
  }
  function PluginModal({ plugin, onClose, onRestartChange }) {
    usePluginSettings(plugin.name);
    const visible = getVisibleSettings(plugin);
    const reset = async () => {
      const ok = await confirmDialog({ title: "Reset settings", body: "Reset this plugin's settings to defaults? This cannot be undone.", confirmText: "Reset", danger: true });
      if (!ok) return;
      const store = Settings.plugins[plugin.name];
      for (const [key, s3] of visible) {
        const before = PlainSettings.plugins[plugin.name]?.[key];
        delete store[key];
        const after = store[key];
        try {
          s3.onChange?.(after);
        } catch {
        }
        if (s3.restartNeeded) onRestartChange?.(plugin.name, key, before, after);
      }
    };
    return h(
      ModalCard,
      {
        title: plugin.name,
        subtitle: plugin.description,
        onClose,
        footer: visible.length ? h(Button, { variant: "danger", onClick: reset }, "Reset") : null
      },
      h("div", { className: "uspp-ggpp-muted uspp-ggpp-small", style: { marginBottom: 8 } }, "Authors: ", (plugin.authors || []).join(", ") || "Unknown"),
      plugin.about && h("div", { className: "uspp-ggpp-plugin-about" }, h(ErrorBoundary, { fallback: null }, h(plugin.about, { plugin }))),
      h(ErrorBoundary, { fallback: null }, h(PluginPreview, { plugin })),
      visible.length ? visible.map(([key, s3]) => h(ErrorBoundary, { key, fallback: null }, h(SettingControl, { plugin, keyName: key, setting: s3, onRestartChange }))) : !hasPreview(plugin) && !plugin.about && h("div", { className: "uspp-ggpp-empty" }, "No configurable settings.")
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/toggle.js
  var userDependents = (name) => dependentsOf(name).filter((n2) => !isEnabledAsDependency(n2));
  async function turnOffPlugin(name, onToggled = () => {
  }) {
    if (userDependents(name).length) {
      const needs = userDependents(name);
      const ok = await confirmDialog({ title: `Turn off ${name}?`, body: `${needs.join(", ")} ${needs.length === 1 ? "needs" : "need"} it. Turn ${needs.length === 1 ? "it" : "them"} off too?`, confirmText: "Turn off all", danger: true });
      if (!ok) return false;
      for (const n2 of userDependents(name)) onToggled(plugins[n2], setPluginEnabled(n2, false));
    }
    onToggled(plugins[name], setPluginEnabled(name, false));
    return true;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/BaseCard.js
  function BaseCard({ className, attrs, name, icon: icon2, badges, description, controls, footer }) {
    return h(
      "div",
      { ...attrs, className: classes("uspp-ggpp-card", className) },
      h(
        "div",
        { className: "uspp-ggpp-card-body" },
        h(
          "div",
          { className: "uspp-ggpp-card-head" },
          h(
            "div",
            { className: "uspp-ggpp-card-title" },
            icon2 != null && h("span", { className: "uspp-ggpp-card-icon" }, icon2),
            h("span", { className: "uspp-ggpp-card-name", title: name }, name),
            badges
          ),
          h("div", { className: "uspp-ggpp-card-controls" }, controls)
        ),
        description && h("div", { className: "uspp-ggpp-card-desc", title: description }, description)
      ),
      h("div", { className: "uspp-ggpp-card-sep" }),
      h("div", { className: "uspp-ggpp-card-foot" }, footer)
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/site-label.js
  var siteLabel = () => isGeneric() ? location.hostname || "this site" : getSite().name;
  var pluginSiteLabel = (p3) => p3.site === "*" ? "All sites" : getSiteById(p3.site)?.name ?? p3.site;

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/shared.js
  var TAB_IDS = { plugins: "uspp_ggpp_plugins_tab", themes: "uspp_ggpp_themes_tab", quickCss: "uspp_ggpp_quickcss_tab", backup: "uspp_ggpp_backup_tab", keybinds: "uspp_ggpp_keybinds_tab", notifications: "uspp_ggpp_notifications_tab", updates: "uspp_ggpp_updates_tab" };
  var sys3 = () => Settings.plugins.Settings;
  var sysPlain = () => PlainSettings.plugins.Settings ??= {};
  function listSetting(key) {
    const v3 = sysPlain()[key];
    return Array.isArray(v3) ? v3.slice() : [];
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/PluginsTab.js
  var SLOW_START_MS = 10;
  var TAGS2 = [
    ["composer", "Composer"],
    ["messages", "Messages"],
    ["chats", "Chats"],
    ["media", "Media"],
    ["navigation", "Navigation"],
    ["notifications", "Notifications"],
    ["appearance", "Appearance"],
    ["declutter", "Declutter"],
    ["privacy", "Privacy"],
    ["developer", "Developer"]
  ];
  var DAY3 = 864e5;
  var MULTI_SITE = (typeof define_USPP_SITES_default !== "undefined" ? define_USPP_SITES_default : []).length > 1;
  function visiblePlugins() {
    return Object.values(plugins).filter((p3) => !p3.hidden && !(p3.chromiumOnly && !isChromium()));
  }
  function useLive() {
    const force = useForceUpdate();
    useEffect(() => {
      const offs = [Events.PLUGIN_TOGGLE, Events.PLUGIN_PIN, Events.PLUGIN_STAR, Events.PLUGIN_PHASE].map((e3) => subscribe(e3, () => force()));
      const fn2 = () => force();
      SettingsStore.addPrefixChangeListener("plugins.", fn2);
      const offSlot = onSlotChange("settings.pluginActions", fn2);
      return () => {
        offs.forEach((o3) => o3());
        offSlot();
        SettingsStore.removePrefixChangeListener("plugins.", fn2);
      };
    }, []);
  }
  function useReloadTracker() {
    const ref = useRef({ dismissed: false, prompting: false });
    const [, setTick] = useState(0);
    const t3 = ref.current;
    useEffect(() => subscribe(Events.RELOAD_NEEDED, () => {
      if (!pendingReload.size) t3.dismissed = false;
      setTick((x4) => x4 + 1);
    }), []);
    const prompt = async () => {
      setTick((x4) => x4 + 1);
      if (!pendingReload.size) {
        t3.dismissed = false;
        return;
      }
      if (t3.dismissed || t3.prompting) return;
      t3.prompting = true;
      let ok = false;
      try {
        ok = await confirmDialog({ title: "Reload required", body: `${[...pendingReload].join(", ")} ${pendingReload.size === 1 ? "changes" : "change"} the site's code or ${pendingReload.size === 1 ? "needs" : "need"} a fresh start, so reload the page to apply.`, confirmText: "Reload", cancelText: "Later" });
      } finally {
        t3.prompting = false;
      }
      if (ok) location.reload();
      else {
        t3.dismissed = true;
        setTick((x4) => x4 + 1);
      }
    };
    return {
      get showBanner() {
        return t3.dismissed && pendingReload.size > 0;
      },
      // need:这次切换新增了要刷新的插件(含连带的依赖)
      onToggled: (p3, need) => {
        if (need || pendingReload.has(p3.name)) prompt();
        else setTick((x4) => x4 + 1);
      },
      onSettingRestart: (name, key, before) => {
        noteRestartSetting(name, key, before);
        if (pendingReload.has(name)) prompt();
        else setTick((x4) => x4 + 1);
      }
    };
  }
  function blockedText(st) {
    const d3 = st.detail ?? "a plugin it needs";
    switch (st.reason) {
      case "depWaiting":
        return `Waiting for ${d3} to start`;
      case "depReload":
        return `${d3} needs a page reload first`;
      case "depSafeMode":
        return `${d3} doesn't run in safe mode`;
      case "depMissing":
        return `${d3} isn't available on this site`;
      case "depCycle":
        return `Circular dependency on ${d3}`;
      case "depDisabled":
        return `${d3} is disabled by a debug switch`;
      default:
        return null;
    }
  }
  function Badges({ p: p3 }) {
    const out = [];
    const failed2 = !p3.started && !!p3.startError;
    const icon2 = (key, tip, Icon, cls) => h(Tooltip, { key, content: tip }, h("span", { className: classes("uspp-ggpp-icon-badge", cls) }, h(Icon, { size: 3.5 })));
    if (failed2) out.push(icon2("fail", "This plugin failed to start", WarningIcon, "uspp-ggpp-warn"));
    if (pendingReload.has(p3.name)) out.push(icon2("reload", "Its settings changed after this page started; reload the page to apply them", WarningIcon));
    if (p3.required) out.push(icon2("req", `This plugin is required for ${SCRIPT_NAME} to work`, LockIcon));
    if (p3.dev) out.push(icon2("dev", "Development build only", WrenchIcon));
    if (p3.chromiumOnly) out.push(icon2("chr", "Chromium only", ChromiumIcon));
    const seen = sys3().knownPlugins?.[p3.name];
    if (seen && Date.now() - seen < 2 * DAY3) out.push(h("span", { key: "new", className: "uspp-ggpp-badge" }, "New"));
    return out;
  }
  var subscribeErrors = (fn2) => {
    const a3 = onPluginError(fn2), b3 = onPluginTripped(fn2);
    return () => {
      a3();
      b3();
    };
  };
  function PluginCard({ p: p3, tracker }) {
    useSubscription(subscribeErrors);
    const errs = pluginErrorsOf(p3.name);
    const enabled = isPluginEnabled(p3.name);
    const starred = listSetting("starredPlugins").includes(p3.name);
    const pinned = listSetting("pinnedPlugins").includes(p3.name);
    const failed2 = !p3.started && !!p3.startError;
    const byDependency = isEnabledAsDependency(p3.name);
    const status = pluginStatus(p3);
    const phase = status.phase;
    const canRestart = enabled && canRestartPlugin(p3);
    const blockedWhy = phase === "blocked" ? blockedText(status) : null;
    const onToggle = async () => {
      if (isPluginEnabled(p3.name)) await turnOffPlugin(p3.name, (q4) => tracker.onToggled(q4));
      else tracker.onToggled(p3, setPluginEnabled(p3.name, true));
    };
    const hasSettings = getVisibleSettings(p3).length > 0;
    const showPreview = hasPreview(p3);
    const Icon = p3.icon || PlugIcon;
    const toggleStar = () => {
      const list2 = listSetting("starredPlugins").filter((n2) => n2 !== p3.name);
      if (!starred) list2.push(p3.name);
      sys3().starredPlugins = list2;
      dispatch(Events.PLUGIN_STAR, { name: p3.name, starred: !starred });
    };
    const togglePin = () => {
      const list2 = listSetting("pinnedPlugins").filter((n2) => n2 !== p3.name);
      if (!pinned) list2.unshift(p3.name);
      sys3().pinnedPlugins = list2;
      dispatch(Events.PLUGIN_PIN, { name: p3.name, pinned: !pinned });
    };
    const openConfig = () => openModal(({ onClose }) => h(PluginModal, { plugin: p3, onClose, onRestartChange: tracker.onSettingRestart }), { modalKey: `uspp-ggpp-plugin-${p3.name}` });
    const btn = (key, icon2, label, onClick, active2) => h(IconButton, { key, icon: icon2, label, onClick, active: active2, size: 3.5, className: "uspp-ggpp-card-btn" });
    return h(BaseCard, {
      attrs: { "data-failed": String(failed2), "data-required": String(!!p3.required), "data-uspp-ggpp-plugin": p3.name },
      name: p3.name,
      icon: h(ErrorBoundary, { fallback: h(PlugIcon, { size: 3.5 }) }, h(Icon, { size: 3.5 })),
      badges: h(Badges, { p: p3 }),
      description: p3.description,
      controls: [
        h(PluginActions, { key: "actions", p: p3 }),
        btn("star", starred ? StarFillIcon : StarIcon, starred ? "Unstar" : "Star", toggleStar, starred),
        !p3.required && btn("pin", pinned ? PinFillIcon : PinIcon, pinned ? "Unpin" : "Pin", togglePin, pinned),
        hasSettings && h(Tooltip, { key: "cfg", content: "config" }, btn(null, SlidersIcon, "config", openConfig)),
        !canRestart && blockedWhy && h(Tooltip, { key: "blocked", content: blockedWhy }, h("span", { className: "uspp-ggpp-badge", "data-uspp-ggpp-blocked": p3.name }, "Waiting")),
        canRestart && h(
          Tooltip,
          { key: "restart", content: phase === "blocked" ? `${status.detail ?? "A plugin it needs"} was stopped; restart both` : phase === "failed" ? "Failed to start; try again" : "Turned off on this page after too many errors; start it again" },
          h(Button, { size: "sm", "data-uspp-ggpp-restart": p3.name, onClick: () => restartPlugin(p3.name) }, "Restart")
        ),
        p3.required ? h(
          Tooltip,
          { key: "switch", content: `Required for ${SCRIPT_NAME} to work, can't be turned off` },
          h(
            "span",
            { className: "uspp-ggpp-switch-lock", "data-uspp-ggpp-locked": "true" },
            h(Switch, { checked: true, disabled: true, label: p3.name })
          )
        ) : byDependency ? h(
          Tooltip,
          { key: "switch", content: `Needed by ${dependentsOf(p3.name).join(", ")}` },
          h(
            "span",
            { className: "uspp-ggpp-switch-lock", "data-uspp-ggpp-locked": "dependency" },
            h(Switch, { checked: true, disabled: true, label: p3.name })
          )
        ) : h(Switch, { key: "switch", checked: enabled, label: p3.name, onChange: onToggle })
      ],
      footer: [
        h("span", { key: "a", className: "uspp-ggpp-card-authors" }, (p3.authors || []).join(", ") || " "),
        // 插件声明会访问的外部主机,用户在卡片上就能看到
        Array.isArray(p3.connect) && p3.connect.length > 0 && h("span", { key: "c", className: "uspp-ggpp-card-timing", title: `This plugin can send requests to: ${p3.connect.join(", ")}` }, `Connects to ${p3.connect.length > 2 ? `${p3.connect.slice(0, 2).join(", ")} +${p3.connect.length - 2}` : p3.connect.join(", ")}`),
        // 启动较慢(>= 10 ms)的插件在卡片上标出启动耗时,排查页面变卡时一眼能看到
        // 运行期错误(启动之后的回调出错):数量和最近一条;出错太多被停掉时另标出
        errs && h(
          "span",
          { key: "e", className: "uspp-ggpp-card-timing", "data-uspp-ggpp-plugin-errors": p3.name, "data-error": "true", title: `Last error (${errs.last?.where ?? "?"}): ${errs.last?.message ?? ""}` },
          errs.tripped ? `Turned off after ${errs.count} errors` : `${errs.count} error${errs.count === 1 ? "" : "s"}`
        ),
        p3.started && p3.startMs >= SLOW_START_MS && h("span", { key: "t", className: "uspp-ggpp-card-timing", title: "Time this plugin took to start on this page" }, `${p3.startMs} ms`),
        MULTI_SITE && h("span", { key: "s", className: "uspp-ggpp-site-badge", "data-uspp-ggpp-plugin-site": p3.site ?? "*" }, pluginSiteLabel(p3)),
        showPreview && h(
          "button",
          { key: "p", type: "button", className: "uspp-ggpp-card-preview", "aria-label": "Preview", title: "Preview", onClick: openConfig },
          h(EyeIcon, { size: 3.5 }),
          "Preview"
        )
      ]
    });
  }
  function PluginActions({ p: p3 }) {
    const items = getSlotItems("settings.pluginActions").filter((d3) => !d3.plugin || d3.plugin === p3.name);
    const ctx = { plugin: p3 };
    return items.map((d3) => h(
      ErrorBoundary,
      { key: d3.id, fallback: null },
      d3.render ? h(d3.render, ctx) : h("button", {
        type: "button",
        className: "uspp-ggpp-btn uspp-ggpp-btn-icon " + (d3.className || ""),
        title: d3.tooltip ?? d3.label,
        "aria-label": d3.label ?? d3.id,
        disabled: slotValue(d3.disabled, ctx),
        "data-active": String(slotValue(d3.active, ctx)),
        onClick: () => {
          try {
            (d3.onSelect || d3.onClick)?.(ctx);
          } catch (e3) {
            console.error("[Userscript++] 插件卡片按钮出错", e3);
          }
        }
      }, typeof d3.icon === "function" ? h(d3.icon, { size: 4 }) : d3.icon ?? d3.label)
    ));
  }
  function sortPinned(list2) {
    const pins = listSetting("pinnedPlugins");
    const pinned = pins.map((n2) => list2.find((p3) => p3.name === n2)).filter(Boolean);
    return [...pinned, ...list2.filter((p3) => !pins.includes(p3.name)).sort((a3, b3) => a3.name.localeCompare(b3.name))];
  }
  function PluginsTab() {
    useLive();
    const tracker = useReloadTracker();
    const [cat, setCat] = useState("favorites");
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const all = visiblePlugins();
    const hasRecent = all.some((p3) => p3.updatedAt);
    const cats = [["favorites", "Favorites"], ...hasRecent ? [["recent", "Recent"]] : [], ["all", "All"], ...TAGS2.filter(([t3]) => all.some((p3) => p3.tags?.includes(t3)))];
    const q4 = query.trim().toLowerCase();
    const pass = (p3) => (!q4 || `${p3.name} ${p3.description}`.toLowerCase().includes(q4)) && (filter === "all" || filter === "enabled" === isPluginEnabled(p3.name));
    let body;
    const grid = (list2) => h("div", { className: "uspp-ggpp-grid" }, list2.map((p3) => h(ErrorBoundary, { key: p3.name, fallback: null }, h(PluginCard, { p: p3, tracker }))));
    const empty = (text) => h("div", { className: "uspp-ggpp-empty" }, text);
    if (cat === "favorites") {
      const stars = listSetting("starredPlugins").slice().reverse();
      const list2 = stars.map((n2) => all.find((p3) => p3.name === n2)).filter(Boolean).filter(pass);
      body = list2.length ? grid(list2) : empty(stars.length && q4 ? "No plugins match your search." : "No favorites yet. Star a plugin to see it here.");
    } else if (cat === "recent") {
      const list2 = all.filter((p3) => p3.updatedAt && Date.now() - p3.updatedAt < 7 * DAY3).sort((a3, b3) => b3.updatedAt - a3.updatedAt).filter(pass);
      body = list2.length ? grid(list2) : empty(q4 ? "No plugins match your search." : "No plugins updated in the last 7 days.");
    } else if (cat === "all") {
      const normal = sortPinned(all.filter((p3) => !p3.required)).filter(pass);
      const req = all.filter((p3) => p3.required).sort((a3, b3) => a3.name.localeCompare(b3.name)).filter(pass);
      body = normal.length + req.length === 0 ? empty("No plugins match your search.") : h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 10 } },
        normal.length > 0 && grid(normal),
        req.length > 0 && h("div", { className: "uspp-ggpp-divider" }, "Required"),
        req.length > 0 && grid(req)
      );
    } else {
      const list2 = sortPinned(all.filter((p3) => p3.tags?.includes(cat))).filter(pass);
      body = list2.length ? grid(list2) : empty("No plugins match your search.");
    }
    return h(
      "div",
      { className: "uspp-ggpp-page", "data-uspp-ggpp-page": "plugins" },
      tracker.showBanner && h(
        "div",
        { className: "uspp-ggpp-banner" },
        h("span", { style: { flex: 1 } }, "Reload the page to apply plugin changes."),
        h(Button, { variant: "primary", size: "sm", onClick: () => location.reload() }, "Reload")
      ),
      h("div", { className: "uspp-ggpp-tabs", role: "tablist" }, cats.map(([id, label]) => h("button", {
        key: id,
        type: "button",
        role: "tab",
        className: "uspp-ggpp-chip",
        "aria-selected": String(cat === id),
        onClick: () => setCat(id)
      }, label))),
      h(
        "div",
        { className: "uspp-ggpp-toolbar" },
        h(Input, { type: "search", placeholder: `Search ${all.length} plugins...`, value: query, onChange: (e3) => setQuery(e3.target.value) }),
        h(Select, { value: filter, label: "Filter", onChange: setFilter, options: [{ label: "All", value: "all" }, { label: "Enabled", value: "enabled" }, { label: "Disabled", value: "disabled" }] })
      ),
      body
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/ThemesTab.js
  function OnlineThemeModal({ onClose }) {
    const [url, setUrl] = useState("");
    const [busy2, setBusy] = useState(false);
    const [error, setError] = useState(null);
    const submit = async () => {
      if (busy2) return;
      setBusy(true);
      setError(null);
      try {
        await addTheme(url);
        onClose();
      } catch (e3) {
        setError(e3?.message || String(e3));
        setBusy(false);
      }
    };
    return h(
      ModalCard,
      {
        title: "Add online theme",
        subtitle: "Paste a link to a .css file.",
        onClose,
        width: 480,
        footer: [
          h(Button, { key: "c", onClick: onClose }, "Cancel"),
          h(Button, { key: "i", variant: "primary", onClick: submit, disabled: busy2 || !url.trim() }, busy2 ? "Importing..." : "Import")
        ]
      },
      h(Input, { autoFocus: true, type: "url", placeholder: "https://example.com/theme.css", value: url, onChange: (e3) => setUrl(e3.target.value), onEnter: submit, disabled: busy2 }),
      error && h("div", { className: "uspp-ggpp-error", role: "alert", style: { marginTop: 8 } }, error)
    );
  }
  function LocalThemeModal({ onClose, theme }) {
    const [name, setName] = useState(theme?.name || "");
    const [css, setCss] = useState(theme?.css || "");
    const ok = name.trim() && css.trim();
    const save2 = () => {
      if (!ok) return;
      if (theme) updateLocalTheme(theme.url, { name: name.trim(), css });
      else addLocalTheme(name.trim(), css);
      onClose();
    };
    return h(
      ModalCard,
      {
        title: theme ? "Edit local theme" : "New local theme",
        onClose,
        width: 640,
        footer: [
          h(Button, { key: "c", onClick: onClose }, "Cancel"),
          h(Button, { key: "s", variant: "primary", onClick: save2, disabled: !ok }, theme ? "Save" : "Create")
        ]
      },
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 10 } },
        h("label", { className: "uspp-ggpp-row-title" }, "Name"),
        h(Input, { autoFocus: true, placeholder: "My theme", value: name, onChange: (e3) => setName(e3.target.value) }),
        h("label", { className: "uspp-ggpp-row-title" }, "CSS"),
        h(CodeEditor, { value: css, onChange: setCss, placeholder: "/* your CSS */", minHeight: 260, language: "css" })
      )
    );
  }
  function ThemeCard({ t: t3 }) {
    const remove = async () => {
      const ok = await confirmDialog({ title: "Remove theme", body: `Are you sure you want to remove "${t3.name}"?`, confirmText: "Remove", danger: true });
      if (ok) removeTheme(t3.url);
    };
    const copy = async () => {
      const ok = await copyToClipboard(t3.url);
      showToast(ok ? "Copied URL" : "Couldn't copy URL", ok ? ToastType.SUCCESS : ToastType.ERROR);
    };
    const btn = (key, icon2, label, onClick) => h(IconButton, { key, icon: icon2, label, onClick, size: 3.5, className: "uspp-ggpp-card-btn" });
    return h(BaseCard, {
      attrs: { "data-uspp-ggpp-theme": t3.url },
      name: t3.name,
      badges: h("span", { className: "uspp-ggpp-badge" }, t3.local ? "Local" : "Online"),
      description: t3.description,
      controls: [
        t3.local ? btn("edit", EditIcon, "Edit", () => openModal(({ onClose }) => h(LocalThemeModal, { onClose, theme: t3 }), { modalKey: "uspp-ggpp-local-theme" })) : btn("copy", CopyIcon, "Copy URL", copy),
        btn("del", TrashIcon, "Delete", remove),
        h(Switch, { key: "switch", checked: t3.enabled, label: t3.name, onChange: (v3) => (v3 ? enableTheme : disableTheme)(t3.url) })
      ],
      footer: [
        h("span", { key: "a", className: "uspp-ggpp-card-authors" }, t3.author || " "),
        h(
          "label",
          { key: "s", className: "uspp-ggpp-sites uspp-ggpp-muted uspp-ggpp-small" },
          h("input", { type: "checkbox", checked: !!t3.allSites, onChange: (e3) => setThemeAllSites(t3.url, e3.target.checked), "data-uspp-ggpp-theme-all": t3.url }),
          "Use on all sites"
        )
      ]
    });
  }
  function ThemesTab() {
    const force = useForceUpdate();
    useEffect(() => subscribeThemes(() => force()), []);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const themes = getThemes();
    const q4 = query.trim().toLowerCase();
    const list2 = themes.filter((t3) => (!q4 || `${t3.name} ${t3.author || ""} ${t3.description || ""}`.toLowerCase().includes(q4)) && (filter === "all" || filter === "enabled" && t3.enabled || filter === "disabled" && !t3.enabled || filter === "online" && !t3.local || filter === "local" && t3.local));
    const section = (title, desc, onManage) => h(
      "div",
      { className: "uspp-ggpp-section" },
      h(
        "div",
        { className: "uspp-ggpp-row" },
        h(
          "div",
          { className: "uspp-ggpp-row-text" },
          h("div", { className: "uspp-ggpp-row-title" }, title),
          h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, desc)
        ),
        h(Button, { onClick: onManage }, "Manage")
      )
    );
    return h(
      "div",
      { className: "uspp-ggpp-page", "data-uspp-ggpp-page": "themes" },
      h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, `Themes for ${siteLabel()}. Turn on "Use on all sites" to apply a theme everywhere.`),
      section(
        "Online Themes",
        "Load themes from a URL. They're cached on this device and checked for updates once a day.",
        () => openModal(({ onClose }) => h(OnlineThemeModal, { onClose }), { modalKey: "uspp-ggpp-online-theme" })
      ),
      section(
        "Local Themes",
        "Custom CSS that only lives on this device.",
        () => openModal(({ onClose }) => h(LocalThemeModal, { onClose }), { modalKey: "uspp-ggpp-local-theme" })
      ),
      themes.length > 0 && h(
        "div",
        { className: "uspp-ggpp-toolbar" },
        h(Input, { type: "search", placeholder: `Search ${themes.length} themes...`, value: query, onChange: (e3) => setQuery(e3.target.value) }),
        h(Select, {
          value: filter,
          label: "Filter",
          onChange: setFilter,
          options: [["all", "All"], ["enabled", "Enabled"], ["disabled", "Disabled"], ["online", "Online"], ["local", "Local"]].map(([value, label]) => ({ value, label }))
        })
      ),
      themes.length > 0 && (list2.length ? h("div", { className: "uspp-ggpp-grid" }, list2.map((t3) => h(ErrorBoundary, { key: t3.url, fallback: null }, h(ThemeCard, { t: t3 })))) : h("div", { className: "uspp-ggpp-empty" }, "No themes match your search."))
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/QuickCssTab.js
  function QuickCssTab() {
    const force = useForceUpdate();
    useEffect(() => {
      const fn2 = () => force();
      SettingsStore.addPrefixChangeListener(SITES_PATH, fn2);
      return () => SettingsStore.removePrefixChangeListener(SITES_PATH, fn2);
    }, []);
    const { css, enabled } = getQuickCss();
    return h(
      "div",
      { className: "uspp-ggpp-page", "data-uspp-ggpp-page": "quickcss" },
      h(
        Row,
        { title: "Enable Quick CSS", description: `Applies as you type, only on ${siteLabel()}. Turning it off keeps your code but stops applying it.` },
        h(Switch, { checked: enabled, label: "Enable Quick CSS", onChange: (v3) => setQuickCss({ enabled: v3 }) })
      ),
      h(CodeEditor, { value: css, readOnly: !enabled, placeholder: "Paste your CSS here...", minHeight: 360, language: "css", onChange: (v3) => setQuickCss({ css: v3 }) })
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/KeybindsTab.js
  var subKeybinds = (fn2) => {
    const offs = [subscribeCommands(fn2)];
    const l3 = () => fn2();
    SettingsStore.addPrefixChangeListener("plugins.Settings.keybinds", l3);
    offs.push(() => SettingsStore.removePrefixChangeListener("plugins.Settings.keybinds", l3));
    return () => offs.forEach((o3) => o3());
  };
  function KeyCell({ id }) {
    const [rec, setRec] = useState(false);
    useEffect(() => {
      if (!rec) return void 0;
      return recordNextKey((combo) => {
        setRec(false);
        if (combo) setKeybind(id, combo);
      });
    }, [rec]);
    const k4 = keyFor(id);
    const conflicts = conflictsOf(id);
    const custom = Object.prototype.hasOwnProperty.call(userKeybinds(), id);
    return h(
      "div",
      { className: "uspp-ggpp-keybind" },
      h("kbd", { className: "uspp-ggpp-kbd", "data-empty": k4 ? void 0 : "" }, rec ? "Press keys…" : k4 || "None"),
      h(Button, { size: "sm", variant: "outline", onClick: () => setRec(!rec) }, rec ? "Cancel" : "Change"),
      k4 && h(Button, { size: "sm", variant: "ghost", onClick: () => setKeybind(id, "") }, "Clear"),
      custom && h(Button, { size: "sm", variant: "ghost", onClick: () => resetKeybind(id) }, "Reset"),
      conflicts.length > 0 && h("div", { className: "uspp-ggpp-setting-error" }, `Also used by: ${conflicts.map((c3) => getCommand(c3)?.name ?? c3).join(", ")}`)
    );
  }
  function KeybindsTab() {
    useSubscription(subKeybinds);
    const list2 = getCommands().sort((a3, b3) => (a3.plugin ? 1 : 0) - (b3.plugin ? 1 : 0) || a3.name.localeCompare(b3.name));
    return h(
      "div",
      { className: "uspp-ggpp-page", "data-uspp-ggpp-page": "keybinds" },
      h("div", { className: "uspp-ggpp-muted uspp-ggpp-small", style: { marginBottom: 12 } }, "Click Change, then press the keys. Esc cancels. Shortcuts without Ctrl, Alt or Meta don't fire while you're typing in a text field."),
      list2.length ? h("div", { className: "uspp-ggpp-section" }, list2.map((c3) => h(
        "div",
        { key: c3.id, className: "uspp-ggpp-row", "data-uspp-ggpp-command": c3.id },
        h(
          "div",
          { className: "uspp-ggpp-row-text" },
          h("div", { className: "uspp-ggpp-row-title" }, c3.name),
          h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, c3.description || (c3.plugin ? `From ${c3.plugin}` : "Built in"))
        ),
        h(KeyCell, { id: c3.id })
      ))) : h("div", { className: "uspp-ggpp-empty" }, "No commands.")
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/NotificationsTab.js
  var time = (t3) => new Date(t3).toLocaleTimeString();
  function NotificationsTab() {
    useSubscription(subscribeNotifications);
    const list2 = getNotificationHistory();
    return h(
      "div",
      { className: "uspp-ggpp-page", "data-uspp-ggpp-page": "notifications" },
      h(
        "div",
        { className: "uspp-ggpp-row", style: { marginBottom: 8 } },
        h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, "Notifications shown since this page was opened (latest 50)."),
        list2.length > 0 && h(Button, { size: "sm", variant: "outline", onClick: clearNotificationHistory }, "Clear")
      ),
      list2.length ? h("div", { className: "uspp-ggpp-section" }, list2.map((n2) => h(
        "div",
        {
          key: n2.id,
          className: "uspp-ggpp-row uspp-ggpp-notify-log",
          "data-type": n2.type,
          "data-clickable": n2.onClick ? "" : void 0,
          onClick: () => {
            try {
              n2.onClick?.();
            } catch {
            }
          }
        },
        h(
          "div",
          { className: "uspp-ggpp-row-text" },
          h("div", { className: "uspp-ggpp-row-title" }, n2.title),
          n2.body && h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, n2.body)
        ),
        h("span", { className: "uspp-ggpp-muted uspp-ggpp-small" }, time(n2.at))
      ))) : h("div", { className: "uspp-ggpp-empty" }, "No notifications yet.")
    );
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/pages.js
  var page = (C4, label) => {
    const P4 = () => h(ErrorBoundary, { fallback: h("div", { className: "uspp-ggpp-page uspp-ggpp-error" }, `${label} failed to render.`) }, h(C4));
    P4.displayName = `Uspp${label.replace(/\s/g, "")}Page`;
    return P4;
  };
  var BUILTIN_PAGES = Object.freeze([
    { id: TAB_IDS.plugins, key: "plugins", label: "Plugins", icon: PuzzleIcon, component: page(PluginsTab, "Plugins") },
    { id: TAB_IDS.themes, key: "themes", label: "Themes", icon: PaletteIcon, component: page(ThemesTab, "Themes") },
    { id: TAB_IDS.quickCss, key: "quickCss", label: "Quick CSS", icon: CodeIcon, component: page(QuickCssTab, "Quick CSS") },
    { id: TAB_IDS.keybinds, key: "keybinds", label: "Keybinds", icon: KeyboardIcon, component: page(KeybindsTab, "Keybinds") },
    { id: TAB_IDS.notifications, key: "notifications", label: "Notifications", icon: BellIcon, component: page(NotificationsTab, "Notifications") },
    { id: TAB_IDS.updates, key: "updates", label: "Updates", icon: ReloadIcon, component: page(UpdatesTab, "Updates") },
    { id: TAB_IDS.backup, key: "backup", label: "Backup", icon: ArchiveIcon, component: page(BackupTab, "Backup") }
  ]);
  var wrapped = /* @__PURE__ */ new WeakMap();
  var customPage = (def) => {
    let C4 = wrapped.get(def);
    if (!C4) {
      const Inner = def.component;
      C4 = () => h("div", { className: "uspp-ggpp-page", "data-uspp-ggpp-page": def.key }, h(ErrorBoundary, { fallback: h("div", { className: "uspp-ggpp-error" }, `${def.label} failed to render.`) }, h(Inner)));
      C4.displayName = `UsppCustomPage_${def.key}`;
      wrapped.set(def, C4);
    }
    return { id: def.id, key: def.key, label: def.label, icon: def.icon || SlidersIcon, component: C4, custom: true, plugin: def.plugin };
  };
  var getSettingsPages = () => [...BUILTIN_PAGES, ...getRegisteredPages().map(customPage)];
  var pageByKey = (key) => getSettingsPages().find((p3) => p3.key === key || p3.id === key) || BUILTIN_PAGES[0];

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/SettingsPanel.js
  var PANEL_KEY = "uspp-ggpp-settings-panel";
  function SettingsPanel({ tab, onClose }) {
    useSubscription(subscribeSettingsPages);
    const [cur, setCur] = useState(pageByKey(tab).key);
    const page2 = pageByKey(cur);
    return h(
      ModalCard,
      { title: SCRIPT_NAME, subtitle: `${VERSION} · ${siteLabel()}`, onClose, width: 860 },
      h(
        "div",
        { className: "uspp-ggpp-panel", "data-uspp-ggpp-panel": "" },
        // 页面导航放左侧边栏(同站点设置弹窗的布局),内容区顶部只留插件页自己的一排分类标签
        h("nav", { className: "uspp-ggpp-panel-nav", role: "tablist", "aria-orientation": "vertical" }, getSettingsPages().map((p3) => h("button", {
          key: p3.key,
          type: "button",
          role: "tab",
          className: "uspp-ggpp-panel-nav-item",
          "aria-selected": String(p3.key === cur),
          "data-uspp-ggpp-panel-tab": p3.key,
          title: p3.label,
          onClick: () => setCur(p3.key)
        }, p3.icon && h(p3.icon, { size: 4 }), h("span", null, p3.label)))),
        h("div", { className: "uspp-ggpp-panel-content" }, h(page2.component, { key: page2.key }))
      )
    );
  }
  function openSettingsPanel({ tab = "plugins", plugin } = {}) {
    openModal(({ onClose }) => h(SettingsPanel, { tab, onClose }), { modalKey: PANEL_KEY });
    const p3 = typeof plugin === "string" ? plugins[plugin] : plugin;
    if (p3) openModal(({ onClose }) => h(PluginModal, { plugin: p3, onClose }), { modalKey: `uspp-ggpp-plugin-${p3.name}` });
  }
  var closeSettingsPanel = () => closeModal(PANEL_KEY);

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/ui/slot-render.js
  var logger28 = new Logger("SlotRender", "#fdba74");
  function DefaultButton({ def, ctx }) {
    const Icon = def.icon;
    return h("button", {
      type: "button",
      className: "uspp-ggpp-btn uspp-ggpp-btn-ghost uspp-ggpp-btn-sm uspp-ggpp-slot-button",
      title: def.tooltip ?? def.label,
      "data-uspp-ggpp-slot-item": def.id,
      disabled: slotValue(def.disabled, ctx),
      onClick: (e3) => {
        try {
          (def.onClick ?? def.onSelect)?.(e3, ctx);
        } catch (err) {
          logger28.error(`注入点项 ${def.id} 出错`, err);
        }
      }
    }, Icon != null && (typeof Icon === "function" ? h(Icon, { size: 4 }) : Icon), def.label != null && h("span", null, def.label));
  }
  function SlotOutlet({ slot, ctx = {}, filter }) {
    useSubscription((fn2) => onSlotChange(slot, fn2));
    const items = getSlotItems(slot).filter((d3) => {
      if (filter && !filter(d3)) return false;
      try {
        return d3.when ? !!d3.when(ctx) : true;
      } catch {
        return false;
      }
    });
    if (!items.length) return null;
    return h(Fragment, null, items.map((def) => h(
      ErrorBoundary,
      { key: def.id, fallback: null, label: `slot:${slot}:${def.id}` },
      def.render ? h(def.render, ctx) : h(DefaultButton, { def, ctx })
    )));
  }
  var hosts = /* @__PURE__ */ new Set();
  var mo2 = null;
  function watchDetach() {
    if (mo2 || typeof MutationObserver === "undefined") return;
    let queued = false;
    mo2 = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      setTimeout(() => {
        queued = false;
        for (const x4 of [...hosts]) if (!x4.container.isConnected) x4.unmount();
        if (!hosts.size) {
          mo2?.disconnect();
          mo2 = null;
        }
      }, 100);
    });
    mo2.observe(document.documentElement, { childList: true, subtree: true });
  }
  function renderSlot(slot, container3, ctx = {}) {
    const x4 = { slot, container: container3, ctx, root: null, dead: false };
    const draw = () => {
      if (x4.dead) return;
      const R3 = getRenderer();
      if (!R3) {
        setTimeout(draw, 200);
        return;
      }
      try {
        x4.root ??= R3.createRoot(container3);
        x4.root.render(h(SlotOutlet, { slot, ctx: x4.ctx }));
      } catch (e3) {
        logger28.error(`渲染注入点 ${slot} 失败`, e3);
      }
    };
    x4.update = (next) => {
      x4.ctx = next ?? x4.ctx;
      draw();
    };
    x4.unmount = () => {
      if (x4.dead) return;
      x4.dead = true;
      hosts.delete(x4);
      try {
        x4.root?.unmount();
      } catch {
      }
    };
    hosts.add(x4);
    watchDetach();
    draw();
    return { update: x4.update, unmount: x4.unmount };
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/settings/FailedPlugins.js
  var failedPlugins = () => Object.values(plugins).filter((p3) => isPluginEnabled(p3.name) && !p3.started && p3.startError);
  async function promptReload() {
    if (!pendingReload.size) return;
    if (await confirmDialog({ title: "Reload required", body: `${[...pendingReload].join(", ")} ${pendingReload.size === 1 ? "needs" : "need"} a page reload to apply.`, confirmText: "Reload", cancelText: "Later" })) location.reload();
  }
  var errText = (e3) => e3?.stack || `${e3?.name ?? "Error"}: ${e3?.message ?? e3}`;
  function FailedList({ onClose }) {
    const [, force] = useState(0);
    const list2 = failedPlugins();
    return h(
      ModalCard,
      { title: "Plugins that failed to start", subtitle: "Each one is still enabled. Disable it if it keeps failing.", onClose, width: 720 },
      list2.length ? list2.map((p3) => h(
        "div",
        { key: p3.name, className: "uspp-ggpp-section uspp-ggpp-failed", "data-uspp-ggpp-failed": p3.name },
        h(
          "div",
          { className: "uspp-ggpp-row" },
          h(
            "div",
            { className: "uspp-ggpp-row-text" },
            h("div", { className: "uspp-ggpp-row-title" }, p3.name),
            h("div", { className: "uspp-ggpp-muted uspp-ggpp-small" }, String(p3.startError?.message ?? p3.startError))
          ),
          !p3.required && h(Button, { size: "sm", variant: "danger", onClick: async () => {
            await turnOffPlugin(p3.name, (_3, need) => {
              if (need) promptReload();
            });
            force((x4) => x4 + 1);
          } }, "Disable")
        ),
        h("pre", { className: "uspp-ggpp-stack" }, errText(p3.startError))
      )) : h("div", { className: "uspp-ggpp-empty" }, "All plugins are running now.")
    );
  }
  var openFailedList = () => openModal(({ onClose }) => h(FailedList, { onClose }), { modalKey: "uspp-ggpp-failed-plugins" });
  function showFailureSummary() {
    const list2 = failedPlugins();
    if (!list2.length) return 0;
    showNotice({
      type: "WARNING",
      message: `${list2.length} plugin${list2.length === 1 ? "" : "s"} failed to start: ${list2.map((p3) => p3.name).join(", ")}`,
      action: { label: "Details", onClick: openFailedList }
    });
    return list2.length;
  }

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/lib/webpack.js
  var fnToString3 = Function.prototype.toString;

  // ../GGPP-acceptance-backups/nethook-type-integration-20261119-cntqtbk1/tmp/ggpp-uspp-ggIACc/core/index.js
  var adoptItem = (def) => def && typeof def === "object" ? { ...def, ...Object.fromEntries(["onClick", "onSelect", "render", "patch"].filter((k4) => typeof def[k4] === "function" && !(def[k4].prototype && def[k4].prototype.isReactComponent)).map((k4) => [k4, adopt2(def[k4])])) } : def;
  var adoptHooks = (hooks2) => hooks2 && typeof hooks2 === "object" ? Object.fromEntries(Object.entries(hooks2).map(([k4, v3]) => [k4, k4 === "instead" ? adopt2(v3, (args, next) => next(...args)) : adopt2(v3)])) : hooks2;
  var logger29 = new Logger("Core", "#c4b5fd");
  var DEFAULT_READY_TIMEOUT = 15e3;
  var BUILD_SITES = typeof define_USPP_SITES_default !== "undefined" ? define_USPP_SITES_default : [];
  function step(label, fn2) {
    try {
      return fn2();
    } catch (e3) {
      logger29.error(`${label} 失败`, e3);
    }
  }
  function openPluginSettings(plugin, focusKey) {
    const p3 = typeof plugin === "string" ? plugins[plugin] : plugin;
    if (!p3) return false;
    openModal(({ onClose }) => h(PluginModal, { plugin: p3, onClose }), { modalKey: `uspp-ggpp-plugin-${p3.name}` });
    if (focusKey) setTimeout(() => {
      const el = queryUi(`[data-uspp-ggpp-setting="${String(focusKey).replace(/["\\]/g, "")}"]`);
      if (!el) return;
      try {
        el.scrollIntoView({ block: "center" });
      } catch {
      }
      el.classList.add("uspp-ggpp-setting-flash");
      setTimeout(() => el.classList.remove("uspp-ggpp-setting-flash"), 1600);
    }, 80);
    return true;
  }
  function showSafeModeNotice() {
    const info = lastBootInfo();
    const why = safeModeReason() === "crash" ? `The page may have been broken by a plugin${info.lastPlugin ? ` (last starting: ${info.lastPlugin})` : ""}${info.failed.length ? `; failed: ${info.failed.join(", ")}` : ""}.` : "Started in safe mode on request.";
    showNotice({ type: "WARNING", message: `${SCRIPT_NAME} is in safe mode: only required plugins run, no themes or Quick CSS. ${why}`, action: { label: "Exit safe mode", onClick: exitSafeMode, close: false } });
  }
  function openSettings2(opts = {}) {
    const host2 = getSite().settingsHost;
    if (host2 && typeof host2.open === "function" && PlainSettings.plugins.Settings?.showSiteEntry !== false) {
      if (typeof host2.ggppOpenRequest === "function") {
        let request2, requestError = false, accepted = false;
        try {
          request2 = host2.ggppOpenRequest(opts);
          accepted = request2?.protocol === "ggpp-settings-request@1" && request2.accepted === true && typeof request2.status === "function" && typeof host2.isOpen === "function";
        } catch (e3) {
          requestError = true;
          logger29.warn("GG++ settings request failed", e3);
        }
        if (request2 !== void 0 || requestError) {
          if (!requestError && accepted) {
            setTimeout(() => {
              let shown2 = false;
              try {
                const state3 = request2.status();
                if (state3 === "dismissed" || state3 === "superseded") return;
                shown2 = state3 === "open" && host2.isOpen() === true;
              } catch (e3) {
                logger29.warn("GG++ settings request status failed", e3);
              }
              if (!shown2) openSettingsPanel(opts);
            }, 800);
            return "site";
          }
          openSettingsPanel(opts);
          return "panel";
        }
      }
      let ok = false;
      try {
        ok = !!host2.open(opts);
      } catch (e3) {
        logger29.warn("站点设置界面打开失败", e3);
      }
      if (ok) {
        setTimeout(() => {
          const shown2 = typeof host2.isOpen === "function" ? host2.isOpen() : !!queryUi("[data-uspp-ggpp-page]");
          if (!shown2) openSettingsPanel(opts);
        }, 800);
        return "site";
      }
    }
    openSettingsPanel(opts);
    return "panel";
  }
  function countIdleMutations(ms = 8e3) {
    const ours = (n2) => n2 && n2.nodeType === 1 && (n2.tagName.toLowerCase().startsWith("uspp-ggpp-") || [...n2.attributes].some((a3) => a3.name.startsWith("data-uspp-ggpp")) || [...n2.classList].some((c3) => c3.startsWith("uspp-ggpp-")) || !!n2.querySelector?.("[data-uspp-ggpp],[class*='uspp-ggpp-'],uspp-ggpp-root"));
    return new Promise((resolve) => {
      let count2 = 0;
      const samples = [];
      const mo3 = new MutationObserver((list2) => {
        for (const m3 of list2) {
          const hit = [...m3.addedNodes, ...m3.removedNodes].some(ours) || m3.type === "attributes" && (ours(m3.target) || m3.attributeName?.startsWith("data-uspp-ggpp"));
          if (hit) {
            count2++;
            if (samples.length < 10) samples.push(m3.target?.nodeName);
          }
        }
      });
      mo3.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
      setTimeout(() => {
        mo3.disconnect();
        resolve({ count: count2, samples });
      }, ms);
    });
  }
  function installAliases(api) {
    const names = /* @__PURE__ */ new Set();
    for (const s3 of getSites()) for (const k4 of Object.keys(s3.api || {})) names.add(k4);
    for (const name of names) {
      if (name in api) continue;
      Object.defineProperty(api, name, {
        enumerable: true,
        get() {
          const own = getSite().api;
          if (own && name in own) return own[name];
          const sample = getSites().map((s3) => s3.api?.[name]).find((v3) => v3 != null);
          if (typeof sample === "function") return (...args) => {
            logger29.debug(`${name} 只在 ${siteNamesWith(name)} 上可用,当前站点忽略`, args[0]);
          };
          return {};
        }
      });
    }
  }
  var siteNamesWith = (name) => getSites().filter((s3) => s3.api && name in s3.api).map((s3) => s3.name).join("、");
  function registerHostPatches() {
    const host2 = getSite().settingsHost;
    (host2?.patches || []).forEach((patch, i3) => {
      try {
        addPatch(patch, "Settings", { key: `Settings#host${i3}`, self: { key: "settingsHost", expr: `${INSTANCE_EXPR}.site.settingsHost` } });
      } catch (e3) {
        logger29.error(`登记站点设置入口的第 ${i3} 条补丁失败`, e3);
      }
    });
  }
  function waitSiteReady(site, cb) {
    let fired = false;
    const r3 = site.ready;
    const timeoutMs = r3 && typeof r3 === "object" && r3.timeout || site.readyTimeout || DEFAULT_READY_TIMEOUT;
    const offs = [];
    const fire = () => {
      if (fired) return;
      fired = true;
      offs.forEach((o3) => {
        try {
          o3();
        } catch {
        }
      });
      clearTimeout(timer2);
      cb();
    };
    const timer2 = setTimeout(fire, r3 ? timeoutMs : 0);
    if (!r3) return;
    if (typeof r3 === "function") {
      const check2 = () => {
        try {
          if (r3()) fire();
        } catch {
        }
      };
      const iv = setInterval(check2, 200);
      offs.push(() => clearInterval(iv), onModuleLoad(check2));
      check2();
      return;
    }
    if (typeof r3.module === "function") {
      offs.push(waitFor2(r3.module, () => setTimeout(fire, 0)));
      offs.push(onTakeover(() => {
        if (!runtime.registry) fire();
      }));
      step("扫描模块缓存", rescanRuntimeCache);
    }
    if (r3.element) waitForElement(r3.element).then((el) => {
      if (el) fire();
    });
  }
  function checkFingerprint(site) {
    const chunkPath = site.driverOptions?.chunkPath;
    const base = (s3) => {
      try {
        return new URL(s3, location.href).pathname.split("/").pop();
      } catch {
        return String(s3).split("/").pop();
      }
    };
    const names = /* @__PURE__ */ new Set();
    if (site.driver === "webpack") {
      for (const s3 of document.querySelectorAll("script[src]")) {
        try {
          if (new URL(s3.src, location.href).origin === location.origin) names.add(base(s3.src));
        } catch {
        }
      }
    } else {
      if (chunkPath) for (const s3 of document.querySelectorAll(`script[src*="${chunkPath}"]`)) names.add(base(s3.src));
      for (const p3 of chunkPaths) names.add(base(p3));
    }
    const now2 = [...names].filter(Boolean).sort();
    if (!now2.length) return;
    const prev = Array.isArray(readPartition().chunkFingerprint) ? readPartition().chunkFingerprint : null;
    if (prev && prev.length) {
      const set = new Set(prev);
      const overlap = now2.filter((n2) => set.has(n2)).length;
      if (overlap / Math.max(now2.length, prev.length) < 0.5) {
        logger29.warn(`${site.name} 的构建已变化(分块文件重合不到一半),部分补丁可能失效`);
        alertSiteChange(site, `build:${now2.slice(0, 3).join(",")}`);
      }
    }
    if (!prev || prev.join("\n") !== now2.join("\n")) writePartition().chunkFingerprint = now2;
  }
  function alertSiteChange(site, reason2) {
    const key = `${VERSION}|${reason2}`;
    const part = readPartition();
    if (part.siteChangeNotice === key) return;
    writePartition().siteChangeNotice = key;
    notify2({
      title: `${site.name} has changed`,
      body: `${SCRIPT_NAME} may not work fully on this version of the site until it is updated.${SUPPORT_URL ? " Click to report it." : ""}`,
      type: "warning",
      duration: 15e3,
      onClick: SUPPORT_URL ? () => reportIssue() : void 0
    });
  }
  onPluginTripped((name, s3) => notify2({
    title: `${name} was turned off`,
    body: `It kept failing on this page (${s3.recent.length} errors in a short time). It will start again when you reload. Last error: ${s3.last?.message ?? "unknown"}`,
    type: "error",
    duration: 15e3,
    plugin: name
  }));
  function retryFailed(list2) {
    let pending = list2.map((p3) => p3.name);
    const attempt = () => {
      rescanRuntimeCache();
      pending = retryPlugins(pending);
    };
    const tick = debounce2(() => {
      attempt();
      if (!pending.length) {
        off();
        clearTimeout(last2);
        logger29.info("之前启动失败的插件已全部启动");
      }
    }, 200);
    const off = onModuleLoad(tick);
    const last2 = setTimeout(() => {
      off();
      tick.cancel?.();
      attempt();
      if (pending.length) logger29.warn(`以下插件启动失败:${pending.join(", ")}`);
      else logger29.info("之前启动失败的插件已全部启动");
      step("启动失败汇总", showFailureSummary);
    }, DEFAULT_READY_TIMEOUT);
  }
  var NAMESPACES = {
    webpack: [
      "filters",
      "find",
      "findAll",
      "findByProps",
      "findByCode",
      "findByDisplayName",
      "findComponentByCode",
      "findExportedComponent",
      "findStore",
      "findModuleId",
      "findModuleFactory",
      "mapMangledModule",
      "requireModule",
      "waitFor",
      "findCssClasses",
      "mapMangledCssClasses",
      "findBulk",
      "extractAndLoadChunks",
      "extractAndLoadChunksLazy",
      "DefaultChunkLoadRegex",
      "loadChunk",
      "importModule",
      "injectExports",
      "search",
      "onModuleLoad",
      "getAllStores",
      "isZustandStore",
      "findReact",
      "syncModuleCache",
      "moduleCacheVersion",
      "addPatch",
      "patches",
      "patchStats",
      "patchResults",
      "patchReport",
      "getPatchedCode",
      "onPatchBypassed",
      "registerInjectionFallback"
    ],
    dom: [
      "waitForElement",
      "observe",
      "setAttr",
      "setText",
      "toggleClass",
      "setStyle",
      "mount",
      "unmount",
      "getFiber",
      "getProps",
      "walkFiberUp",
      "findFiberProps",
      "addRenderHook",
      "asArray",
      "treeHas",
      "onRouteChange"
    ],
    net: ["onRequest", "onResponse", "rewriteRequest", "rewriteResponse", "onWebSocket", "onEventSource", "makeResponse", "fetchExternal"],
    ui: [
      "react",
      "components",
      "icons",
      "openModal",
      "closeModal",
      "closeAllModals",
      "ensureUiRoot",
      "showToast",
      "dismissToast",
      "ToastType",
      "showNotice",
      "closeNotice",
      "notify",
      "getNotificationHistory",
      "theme",
      "highlightCss",
      "createExternalStore",
      "createSelectionStore",
      "useExternalStore",
      "useFiltered",
      "useAsyncAction",
      "ErrorBoundary",
      "openPalette",
      "closePalette",
      "renderSlot",
      "SlotOutlet"
    ],
    settings: [
      "Settings",
      "PlainSettings",
      "SettingsStore",
      "openSettings",
      "openSettingsPanel",
      "closeSettingsPanel",
      "openPluginSettings",
      "settingsPages",
      "registerSettingsPage",
      "exportSettings",
      "importSettings",
      "previewImport",
      "undoImport",
      "lastImport",
      "parseBackup",
      "exportData",
      "importData",
      "DataStore"
    ],
    themes: [
      "getThemes",
      "addTheme",
      "addLocalTheme",
      "updateLocalTheme",
      "removeTheme",
      "enableTheme",
      "disableTheme",
      "setThemeAllSites",
      "isThemesEnabled",
      "setThemesEnabled",
      "isOnlineThemesEnabled",
      "setOnlineThemesEnabled",
      "getQuickCss",
      "setQuickCss",
      "registerStyle",
      "enableStyle",
      "disableStyle",
      "unregisterStyle"
    ]
  };
  var LAZY_NAMES = {
    find: "findLazy",
    byProps: "findByPropsLazy",
    byCode: "findByCodeLazy",
    byDisplayName: "findByDisplayNameLazy",
    componentByCode: "findComponentByCodeLazy",
    exportedComponent: "findExportedComponentLazy",
    store: "findStoreLazy",
    cssClasses: "findCssClassesLazy",
    mapMangledModule: "mapMangledModuleLazy"
  };
  function forwardTo(api, map, extra = {}) {
    const o3 = { ...extra };
    for (const [k4, name] of Object.entries(map)) {
      if (!(name in api)) continue;
      Object.defineProperty(o3, k4, { get: () => api[name], enumerable: true });
    }
    return Object.freeze(o3);
  }
  function installNamespaces(api) {
    for (const [ns, names] of Object.entries(NAMESPACES)) {
      if (ns in api) {
        logger29.warn(`接口分组 ${ns} 和已有名字冲突,跳过`);
        continue;
      }
      const map = Object.fromEntries(names.map((n2) => [n2, n2]));
      if (ns === "webpack") api[ns] = forwardTo(api, map, { lazy: forwardTo(api, LAZY_NAMES) });
      else api[ns] = forwardTo(api, map);
    }
  }
  var materialize = (entry, api) => typeof entry === "function" ? entry(api) : entry;
  function main() {
    if (W3.top !== W3.self) return;
    if (W3[INSTANCE_KEY]) {
      console.info(`[${SCRIPT_NAME}] 本脚本已在运行,跳过重复注入`);
      return;
    }
    step("安全模式判定", beginBoot);
    let resolveReady;
    const onceReady = new Promise((r3) => {
      resolveReady = r3;
    });
    let siteReadyDone = false;
    const api = {
      version: VERSION,
      frameworkVersion: FRAMEWORK_VERSION,
      apiVersion: API_VERSION,
      buildType: BUILD_TYPE,
      scriptId: SCRIPT_ID,
      scriptName: SCRIPT_NAME,
      // 本脚本页面上名字的前缀(类名、元素名、data- 标记都以它开头),站点适配拼名字时用
      prefix: "uspp-ggpp-",
      buildSites: BUILD_SITES.slice(),
      // 站点
      defineSite,
      // 运行时注册站点只作开发构建里的控制台调试手段
      registerSite: (def) => {
        if (true) {
          logger29.warn("registerSite 只在开发构建里可用");
          return false;
        }
        return registerSiteRuntime(def);
      },
      get site() {
        return getSite();
      },
      get sites() {
        return Object.fromEntries(getSites().map((s3) => [s3.id, s3]));
      },
      isSite,
      siteKey,
      // 插件
      plugins,
      registerPlugin,
      startPlugin: startPluginApi,
      stopPlugin: stopPluginApi,
      startPluginAsync,
      stopPluginAsync,
      isPluginEnabled,
      togglePlugin,
      setPluginEnabled,
      restartPlugin,
      pluginPhase,
      pluginStatus,
      reloadNeeded: () => [...pendingReload],
      definePlugin: definePlugin2,
      definePluginSettings,
      migratePluginSettings,
      migratePluginSetting,
      getVisibleSettings,
      OptionType,
      StartAt,
      // 设置
      Settings,
      PlainSettings,
      SettingsStore,
      openSettings: openSettings2,
      openSettingsPanel,
      closeSettingsPanel,
      openPluginSettings,
      get settingsPages() {
        return getSettingsPages();
      },
      registerSettingsPage: (def) => ownByCurrent(registerSettingsPage(def)),
      exportSettings,
      importSettings,
      previewImport,
      undoImport,
      lastImport,
      parseBackup,
      exportData,
      importData,
      // 打包器(只在使用打包器驱动的站点上有内容)
      addPatch: (patch, pluginName) => addPatch(patch, pluginName),
      patches,
      patchStats,
      patchResults,
      patchReport: () => ({ ...patchReport(), notApplicable: [...patchesNotApplicable] }),
      getPatchedCode,
      // 这几个登记函数的回调也以登记它的插件身份运行(站点兜底钩子在回调里装,不能归到恰好在栈上的别的插件)
      onPatchBypassed: (name, cb) => ownByCurrent(onPatchBypassed(name, adopt2(cb))),
      registerInjectionFallback,
      // 模块查找
      filters,
      find,
      findAll,
      findByProps,
      findByCode,
      findByDisplayName,
      findComponentByCode,
      findExportedComponent,
      findStore,
      findLazy,
      findByPropsLazy,
      findByCodeLazy,
      findByDisplayNameLazy,
      findComponentByCodeLazy,
      findExportedComponentLazy,
      findStoreLazy,
      findModuleId,
      findModuleFactory,
      mapMangledModule,
      mapMangledModuleLazy,
      requireModule,
      waitFor: (filter, cb, ms) => ownByCurrent(waitFor2(filter, adopt2(cb), ms)),
      findCssClasses,
      findCssClassesLazy,
      mapMangledCssClasses,
      findBulk,
      extractAndLoadChunks,
      extractAndLoadChunksLazy,
      DefaultChunkLoadRegex,
      loadChunk,
      importModule,
      injectExports,
      search,
      onModuleLoad: (cb) => ownByCurrent(onModuleLoad(adopt2(cb))),
      onceReady,
      getAllStores,
      isZustandStore,
      findReact: getReact2,
      // 被其他脚本包装执行的模块只在运行时缓存里:并入本系统的缓存;版本号在缓存变化时递增
      syncModuleCache: () => {
        try {
          syncRuntimeCache();
        } catch {
        }
      },
      moduleCacheVersion: getCacheVersion,
      // DOM / fiber / JSX
      waitForElement,
      observe: (sel, opts) => ownByCurrent(observe(sel, opts && typeof opts === "object" ? { ...opts, added: adopt2(opts.added), removed: adopt2(opts.removed) } : opts)),
      setAttr,
      setText,
      toggleClass,
      setStyle,
      mount,
      unmount,
      getFiber,
      getProps,
      walkFiberUp,
      findFiberProps,
      addRenderHook: (type, fn2) => ownByCurrent(addRenderHook(type, adopt2(fn2))),
      asArray,
      treeHas,
      // 方法补丁器
      patchMethod: (obj, name, hooks2) => ownByCurrent(patchMethod(obj, name, adoptHooks(hooks2))),
      isPatched,
      // 路由 / 网络
      onRouteChange: (fn2) => ownByCurrent(onRouteChange(adopt2(fn2))),
      onRequest: (m3, fn2) => ownByCurrent(onRequest(m3, adopt2(fn2))),
      onResponse: (m3, fn2) => ownByCurrent(onResponse(m3, adopt2(fn2))),
      rewriteRequest: (m3, fn2) => ownByCurrent(rewriteRequest(m3, adopt2(fn2))),
      rewriteResponse: (m3, fn2) => ownByCurrent(rewriteResponse(m3, adopt2(fn2))),
      onWebSocket: (m3, hooks2) => ownByCurrent(onWebSocket(m3, adoptHooks(hooks2))),
      onEventSource: (m3, hooks2) => ownByCurrent(onEventSource(m3, adoptHooks(hooks2))),
      makeResponse,
      // 插件数据
      DataStore: { for: dataStoreFor },
      // 注入点
      // 在插件里调用时归这个插件(停了自动撤掉,同 id 再加是替换);不在任何插件里调用时不归谁,回调也以无主身份运行
      addSlotItem: (slot, id, def) => {
        const owner = currentOwner();
        const own = owner ? addScopedSlotItem(owner, slot, id, def) : null;
        if (own) return own;
        addSlotItem(slot, id, adoptItem(def));
        return () => removeSlotItem(slot, id);
      },
      removeSlotItem,
      getSlotItems,
      onSlotChange: (slot, fn2) => ownByCurrent(onSlotChange(slot, adopt2(fn2))),
      getSlotVersion,
      renderSlot,
      SlotOutlet,
      applyMenuPatches,
      // 拦截器
      addInterceptor: (name, fn2, opts) => ownByCurrent(addInterceptor(name, adopt2(fn2), opts)),
      runInterceptors,
      hasInterceptors,
      // 命令、搜索栏、快捷键
      registerCommand: (def) => ownByCurrent(registerCommand(def && typeof def.run === "function" ? { ...def, run: adopt2(def.run) } : def)),
      runCommand,
      getCommands,
      keyFor,
      openPalette,
      closePalette,
      // 安全模式、诊断
      isSafeMode,
      reloadInSafeMode,
      exitSafeMode,
      collectDiagnostics,
      copyDiagnostics,
      pluginErrorStats,
      openFailedPlugins: openFailedList,
      // 更新
      checkForUpdate,
      installUpdate,
      openChangelog,
      changelog: CHANGELOG,
      // 界面
      react: {
        h,
        Fragment,
        getReact,
        getRenderer,
        usingSiteRenderer,
        useState,
        useEffect,
        useLayoutEffect,
        useMemo,
        useRef,
        useCallback,
        useReducer,
        useContext,
        useId,
        useSyncExternalStore,
        useForceUpdate,
        useSubscription
      },
      components: { ...components_exports, ...kit_exports, ModalCard, confirmDialog, SlotOutlet },
      highlightCss,
      createExternalStore,
      createSelectionStore,
      useExternalStore,
      useFiltered,
      useAsyncAction,
      icons: icons_exports,
      openModal,
      closeModal,
      closeAllModals,
      ensureUiRoot: () => diag.noEarlyUiRoot ? trace("uiRoot.early.skipped") : ensureRoot(),
      showToast,
      dismissToast,
      ToastType,
      showNotice,
      closeNotice,
      notify: notify2,
      getNotificationHistory,
      theme: currentTheme,
      // 样式与主题(作用于当前站点分区)
      registerStyle: (name, css) => registerStyle(name, css),
      enableStyle,
      disableStyle,
      unregisterStyle,
      classNameFactory,
      classes,
      getThemes,
      addTheme,
      addLocalTheme,
      updateLocalTheme,
      removeTheme,
      enableTheme,
      disableTheme,
      setThemeAllSites,
      isThemesEnabled,
      setThemesEnabled,
      isOnlineThemesEnabled,
      setOnlineThemesEnabled,
      getQuickCss,
      setQuickCss,
      // 事件
      subscribe: (ev, fn2) => ownByCurrent(subscribe(ev, adopt2(fn2))),
      dispatch,
      Events,
      // 工具
      Logger,
      ErrorBoundary,
      makeLazy,
      proxyLazy,
      fetchExternal,
      copyToClipboard,
      debounce: debounce2,
      sleep: sleep4,
      onlyOnce,
      escapeRegExp,
      humanizeKey,
      matchesUrl,
      matchPattern,
      isChromium,
      countIdleMutations
    };
    if (false) {
      api.checkPatches = checkPatchesInPage;
      api.failedFinders = failedFinders;
      api.replacePlugin = replacePlugin;
      trackFinders(api, [
        "find",
        "findAll",
        "findByProps",
        "findByCode",
        "findByDisplayName",
        "findComponentByCode",
        "findExportedComponent",
        "findStore",
        "findModuleId",
        "findModuleFactory",
        "mapMangledModule",
        "findCssClasses",
        "findLazy",
        "findByPropsLazy",
        "findByCodeLazy",
        "findByDisplayNameLazy",
        "findComponentByCodeLazy",
        "findExportedComponentLazy",
        "findStoreLazy",
        "findCssClassesLazy",
        "mapMangledModuleLazy"
      ]);
      api.diag = { key: DIAG_KEY, config: diag, report: diagReport, set: (c3) => {
        W3.localStorage.setItem(DIAG_KEY, JSON.stringify(c3));
        return "已保存,硬刷新后生效";
      }, clear: () => {
        W3.localStorage.removeItem(DIAG_KEY);
        return "已清除,硬刷新后生效";
      } };
      setDiagExtra(() => {
        const rep = patchReport();
        let cacheIds = null;
        try {
          cacheIds = runtime.cache ? Object.keys(runtime.cache) : null;
        } catch {
        }
        return {
          stats: { ...rep.stats, orphaned: rep.orphaned.length },
          plugins: Object.values(plugins).map((p3) => `${p3.name}:${p3.started}`),
          moduleCache: moduleCache.size,
          runtimeCache: cacheIds ? cacheIds.length : null,
          runtimeCacheIds: cacheIds
        };
      });
      if (diagOn) logger29.warn(`诊断开关已打开:${JSON.stringify(diag)}(${DIAG_KEY})`);
    }
    installNamespaces(api);
    setPluginResolver((name) => plugins[name] ?? null);
    setSelfInvoker((t3, fn2, a3) => t3 && plugins[t3.name] === t3 ? runAs(t3.name, () => fn2.apply(t3, a3)) : fn2.apply(t3, a3));
    setPluginDeadCheck((p3) => !["running", "starting", "waiting"].includes(pluginPhase(p3)));
    setSelfTarget("settingsHost", () => getSite().settingsHost ?? null);
    installBridge(W3, api);
    if (GLOBAL_NAME) {
      if (GLOBAL_NAME in W3) logger29.warn(`全局名字 ${GLOBAL_NAME} 已被占用,未挂调试入口`);
      else Object.defineProperty(W3, GLOBAL_NAME, { value: api, writable: false, configurable: true, enumerable: false });
    }
    const syncLoaded = step("同步读取设置", loadSync);
    step("注册核心插件", () => addPlugin(settings_default3));
    setSettingsOpener(() => openSettings2());
    setPaletteOpener((name, key) => {
      openSettingsPanel({ tab: "plugins" });
      openPluginSettings(name, key);
    });
    setPatchSummary(() => {
      const r3 = patchReport();
      return r3?.stats ? { ...r3.stats, orphaned: r3.orphaned?.length ?? 0 } : null;
    });
    const sitePlugins = [];
    for (const entry of sites_default) {
      step(`载入站点 ${entry?.id ?? ""}`, () => {
        const def = materialize(entry.site, api);
        if (!def) return;
        addSite(def);
        for (const pe of entry.plugins || []) {
          const pd = materialize(pe, api);
          if (pd) {
            pd.site = def.id;
            sitePlugins.push(pd);
          }
        }
        for (const pd of def.plugins || []) {
          pd.site ??= def.id;
          sitePlugins.push(pd);
        }
      });
    }
    const site = selectSite();
    step("站点事件", () => setSiteEvents(site.events));
    step("站点拦截器", () => setSiteInterceptors(site.interceptors));
    step("站点别名", () => installAliases(api));
    const genericPlugins = plugins_default.map((e3) => step("载入通用插件", () => materialize(e3, api))).filter(Boolean);
    for (const def of genericPlugins) {
      def.site ??= "*";
      step(`注册插件 ${def.name}`, () => addPlugin(def));
    }
    for (const def of sitePlugins) step(`注册插件 ${def.name}`, () => addPlugin(def));
    step("菜单命令", installMenuCommands);
    step("悬浮按钮", installFloating);
    step("注册界面样式", () => registerStyle("uspp-ggpp-ui", UI_CSS));
    if (typeof site.routeInfo === "function") setRouteParser(site.routeInfo);
    if (site.network) step("网络旁路", installNetworkHooks);
    if (site.route) step("路由工具", installRouteWatcher);
    function registerPatchesOnce() {
      if (!syncLoaded) step("读取启动快照", applyBootSnapshot);
      registerPatches();
    }
    if (site.driver === "turbopack") {
      setChunkPrefix(site.driverOptions?.chunkPath);
      step("登记补丁", registerPatchesOnce);
      if (diag.noHostPatches) trace("hostPatches.skipped");
      else step("登记站点设置入口补丁", registerHostPatches);
      if (diag.noTurbopack) trace("turbopack.skipped");
      else {
        step("安装打包器拦截", installInterceptor);
        step("监视打包器", () => watchInstrumentation(2e4));
      }
    } else if (site.driver === "webpack") {
      step("登记补丁", registerPatchesOnce);
      if (diag.noHostPatches) trace("hostPatches.skipped");
      else step("登记站点设置入口补丁", registerHostPatches);
      if (false) step("安装打包器拦截", () => installWebpack(site.driverOptions || {}));
    } else if (site.driver) {
      logger29.warn(`不支持的打包器驱动:${site.driver}`);
    }
    logger29.info(`${SCRIPT_NAME} ${VERSION}(${BUILD_TYPE}),脚本 ID ${SCRIPT_ID},当前站点 ${site.id},已注册 ${Object.keys(plugins).length} 个插件`);
    (async () => {
      try {
        await loadAsync();
      } catch (e3) {
        logger29.error("读取设置失败", e3);
      }
      step("安装卸载保存", installUnloadSave);
      step("多标签页同步", installCrossTabSync);
      const keepData = step("清理旧设置", () => cleanStaleSettings());
      if (keepData) step("清理旧插件数据", () => {
        pruneData(keepData);
      });
      step("快捷键", installKeybinds);
      if (false) step("热重载", () => startHotClient(HOT_URL, {
        onPlugin(ev) {
          if (!plugins[ev.name]) {
            notify2({ title: "Hot reload", body: `${ev.name} is new: reinstall the dev build to load it.`, type: "info" });
            return;
          }
          const def = evalPluginChunk(ev.code, api, ev.name);
          if (ev.dev) def.dev = true;
          if (ev.chromium) def.chromiumOnly = true;
          def.site ??= ev.site;
          const r3 = replacePlugin(def);
          trace("hot.replace", ev.name, r3);
          if (r3.reason === "patches") notify2({ title: "Hot reload", body: `${ev.name} has bundler patches: reinstall the dev build and reload.`, type: "warning" });
          else if (!r3.ok) showToast(`${ev.name} failed to restart: ${r3.error?.message ?? r3.reason}`, ToastType.ERROR);
          else if (r3.started) showToast(`Reloaded ${ev.name}`, ToastType.SUCCESS);
          else showToast(`Replaced ${ev.name} (not running: ${r3.phase})`, ToastType.INFO);
        },
        onFull(reason2) {
          notify2({ title: "Dev build rebuilt", body: `Reinstall the dev build and reload the page${reason2 ? ` (${reason2})` : ""}.`, type: "info" });
        }
      }));
      step("记录插件", recordKnownPlugins);
      step("强制依赖", enforceDependencies);
      step("记下启动配置", bootSnapshot);
      if (site.driver === "turbopack" || site.driver === "webpack") step("核对补丁计划", () => {
        const changed = checkPatchPlan();
        if (!changed.length) return;
        dispatch(Events.RELOAD_NEEDED, { reason: "patches", plugins: changed });
        notify2({ title: "Reload to apply", body: `Settings for ${changed.join(", ")} differ from what this page started with; reload the page to apply them.`, type: "info" });
      });
      step("启动 Init 插件", () => startAllAt(StartAt.Init));
      const onDom = () => {
        step("启动 DOMContentLoaded 插件", () => startAllAt(StartAt.DOMContentLoaded));
        if (isSafeMode()) step("安全模式提示", showSafeModeNotice);
        if (diag.noSiteStart) trace("site.start.skipped");
        else {
          trace("site.start");
          step("站点启动", () => site.start?.call(site, api));
        }
        waitSiteReady(site, () => onSiteReady(site));
      };
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onDom, { once: true });
      else onDom();
    })();
    function onSiteReady(s3) {
      if (siteReadyDone) return;
      siteReadyDone = true;
      trace("site.ready", s3.id);
      markSiteReady();
      if (s3.driver) step("扫描模块缓存", rescanRuntimeCache);
      step("onceReady", () => resolveReady());
      dispatch(Events.SITE_READY, { site: s3.id });
      afterReconcile(() => {
        const failed2 = step("启动 SiteReady 插件", () => startAllAt(StartAt.SiteReady)) || [];
        if (failed2.length) retryFailed(failed2);
        else setTimeout(() => step("启动失败汇总", showFailureSummary), 0);
        step("启动完成", () => markBootHealthy());
      });
      if (s3.driver) {
        logger29.info(`站点已就绪,已加载 ${moduleCache.size} 个模块`);
        setInterval(() => {
          try {
            syncRuntimeCache();
          } catch {
          }
        }, 2e3);
        setTimeout(() => step("补丁健康报告", () => {
          if (logHealthReport()?.siteChanged) alertSiteChange(s3, "patches");
        }), 5e3);
        if (false) setTimeout(() => step("查找器报告", () => {
          const bad = failedFinders();
          if (bad.length) logger29.debug(`${bad.length} 个查找器解析为空(站点改版时最先失效):`, bad.map((f3) => f3.finder));
        }), 8e3);
        setTimeout(() => step("构建指纹", () => checkFingerprint(s3)), 0);
      }
    }
    function registerSiteRuntime(entry) {
      const def = typeof entry === "function" ? entry(api) : entry;
      if (!addSite(def, { runtime: true })) return false;
      const stored = getSiteById(def.id);
      if (!switchTo(stored)) return true;
      logger29.info(`已切换到运行时注册的站点 ${stored.id}`);
      setSiteEvents(stored.events);
      setSiteInterceptors(stored.interceptors);
      installAliases(api);
      if (typeof stored.routeInfo === "function") setRouteParser(stored.routeInfo);
      if (stored.route) installRouteWatcher();
      for (const pd of stored.plugins || []) {
        pd.site ??= stored.id;
        addPlugin(pd, { runtime: true });
      }
      enforceDependencies();
      for (const stage of [StartAt.Init, StartAt.DOMContentLoaded]) startAllAt(stage);
      step("站点启动", () => stored.start?.call(stored, api));
      siteReadyDone = false;
      waitSiteReady(stored, () => onSiteReady(stored));
      return true;
    }
  }
  try {
    main();
  } catch (e3) {
    console.error(`[${SCRIPT_NAME}] 启动失败`, e3);
  }
})();
