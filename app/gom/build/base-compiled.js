var Zepto = function () {
  function t(t) {
    return null == t ? String(t) : U[X.call(t)] || "object";
  }function e(e) {
    return "function" == t(e);
  }function n(t) {
    return null != t && t == t.window;
  }function i(t) {
    return null != t && t.nodeType == t.DOCUMENT_NODE;
  }function r(e) {
    return "object" == t(e);
  }function o(t) {
    return r(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype;
  }function a(t) {
    return t instanceof Array;
  }function s(t) {
    return "number" == typeof t.length;
  }function u(t) {
    return P.call(t, function (t) {
      return null != t;
    });
  }function c(t) {
    return t.length > 0 ? j.fn.concat.apply([], t) : t;
  }function l(t) {
    return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
  }function f(t) {
    return t in _ ? _[t] : _[t] = new RegExp("(^|\\s)" + t + "(\\s|$)");
  }function h(t, e) {
    return "number" != typeof e || D[l(t)] ? e : e + "px";
  }function p(t) {
    var e, n;return Z[t] || (e = k.createElement(t), k.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), Z[t] = n), Z[t];
  }function d(t) {
    return "children" in t ? N.call(t.children) : j.map(t.childNodes, function (t) {
      return 1 == t.nodeType ? t : void 0;
    });
  }function m(t, e, n) {
    for (T in e) n && (o(e[T]) || a(e[T])) ? (o(e[T]) && !o(t[T]) && (t[T] = {}), a(e[T]) && !a(t[T]) && (t[T] = []), m(t[T], e[T], n)) : e[T] !== E && (t[T] = e[T]);
  }function v(t, e) {
    return null == e ? j(t) : j(t).filter(e);
  }function g(t, n, i, r) {
    return e(n) ? n.call(t, i, r) : n;
  }function y(t, e, n) {
    null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
  }function b(t, e) {
    var n = t.className,
        i = n && n.baseVal !== E;return e === E ? i ? n.baseVal : n : void (i ? n.baseVal = e : t.className = e);
  }function w(t) {
    var e;try {
      return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? j.parseJSON(t) : t : e) : t;
    } catch (n) {
      return t;
    }
  }function x(t, e) {
    e(t);for (var n in t.childNodes) x(t.childNodes[n], e);
  }var E,
      T,
      j,
      S,
      C,
      O,
      A = [],
      N = A.slice,
      P = A.filter,
      k = window.document,
      Z = {},
      _ = {},
      D = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 },
      $ = /^\s*<(\w+|!)[^>]*>/,
      L = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      M = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      F = /^(?:body|html)$/i,
      z = /([A-Z])/g,
      q = ["val", "css", "html", "text", "data", "width", "height", "offset"],
      R = ["after", "prepend", "before", "append"],
      I = k.createElement("table"),
      W = k.createElement("tr"),
      B = { tr: k.createElement("tbody"), tbody: I, thead: I, tfoot: I, td: W, th: W, "*": k.createElement("div") },
      V = /complete|loaded|interactive/,
      H = /^[\w-]*$/,
      U = {},
      X = U.toString,
      J = {},
      Y = k.createElement("div"),
      G = { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" };return J.matches = function (t, e) {
    if (!e || !t || 1 !== t.nodeType) return !1;var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;if (n) return n.call(t, e);var i,
        r = t.parentNode,
        o = !r;return o && (r = Y).appendChild(t), i = ~J.qsa(r, e).indexOf(t), o && Y.removeChild(t), i;
  }, C = function (t) {
    return t.replace(/-+(.)?/g, function (t, e) {
      return e ? e.toUpperCase() : "";
    });
  }, O = function (t) {
    return P.call(t, function (e, n) {
      return t.indexOf(e) == n;
    });
  }, J.fragment = function (t, e, n) {
    var i, r, a;return L.test(t) && (i = j(k.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(M, "<$1></$2>")), e === E && (e = $.test(t) && RegExp.$1), e in B || (e = "*"), a = B[e], a.innerHTML = "" + t, i = j.each(N.call(a.childNodes), function () {
      a.removeChild(this);
    })), o(n) && (r = j(i), j.each(n, function (t, e) {
      q.indexOf(t) > -1 ? r[t](e) : r.attr(t, e);
    })), i;
  }, J.Z = function (t, e) {
    return t = t || [], t.__proto__ = j.fn, t.selector = e || "", t;
  }, J.isZ = function (t) {
    return t instanceof J.Z;
  }, J.init = function (t, n) {
    var i;if (!t) return J.Z();if ("string" == typeof t) {
      if (t = t.trim(), "<" == t[0] && $.test(t)) i = J.fragment(t, RegExp.$1, n), t = null;else {
        if (n !== E) return j(n).find(t);i = J.qsa(k, t);
      }
    } else {
      if (e(t)) return j(k).ready(t);if (J.isZ(t)) return t;if (a(t)) i = u(t);else if (r(t)) i = [t], t = null;else if ($.test(t)) i = J.fragment(t.trim(), RegExp.$1, n), t = null;else {
        if (n !== E) return j(n).find(t);i = J.qsa(k, t);
      }
    }return J.Z(i, t);
  }, j = function (t, e) {
    return J.init(t, e);
  }, j.extend = function (t) {
    var e,
        n = N.call(arguments, 1);return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
      m(t, n, e);
    }), t;
  }, J.qsa = function (t, e) {
    var n,
        r = "#" == e[0],
        o = !r && "." == e[0],
        a = r || o ? e.slice(1) : e,
        s = H.test(a);return i(t) && s && r ? (n = t.getElementById(a)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : N.call(s && !r ? o ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e));
  }, j.contains = function (t, e) {
    return t !== e && t.contains(e);
  }, j.type = t, j.isFunction = e, j.isWindow = n, j.isArray = a, j.isPlainObject = o, j.isEmptyObject = function (t) {
    var e;for (e in t) return !1;return !0;
  }, j.inArray = function (t, e, n) {
    return A.indexOf.call(e, t, n);
  }, j.camelCase = C, j.trim = function (t) {
    return null == t ? "" : String.prototype.trim.call(t);
  }, j.uuid = 0, j.support = {}, j.expr = {}, j.map = function (t, e) {
    var n,
        i,
        r,
        o = [];if (s(t)) for (i = 0; i < t.length; i++) n = e(t[i], i), null != n && o.push(n);else for (r in t) n = e(t[r], r), null != n && o.push(n);return c(o);
  }, j.each = function (t, e) {
    var n, i;if (s(t)) {
      for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t;
    } else for (i in t) if (e.call(t[i], i, t[i]) === !1) return t;return t;
  }, j.grep = function (t, e) {
    return P.call(t, e);
  }, window.JSON && (j.parseJSON = JSON.parse), j.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
    U["[object " + e + "]"] = e.toLowerCase();
  }), j.fn = { forEach: A.forEach, reduce: A.reduce, push: A.push, sort: A.sort, indexOf: A.indexOf, concat: A.concat, map: function (t) {
      return j(j.map(this, function (e, n) {
        return t.call(e, n, e);
      }));
    }, slice: function () {
      return j(N.apply(this, arguments));
    }, ready: function (t) {
      return V.test(k.readyState) && k.body ? t(j) : k.addEventListener("DOMContentLoaded", function () {
        t(j);
      }, !1), this;
    }, get: function (t) {
      return t === E ? N.call(this) : this[t >= 0 ? t : t + this.length];
    }, toArray: function () {
      return this.get();
    }, size: function () {
      return this.length;
    }, remove: function () {
      return this.each(function () {
        null != this.parentNode && this.parentNode.removeChild(this);
      });
    }, each: function (t) {
      return A.every.call(this, function (e, n) {
        return t.call(e, n, e) !== !1;
      }), this;
    }, filter: function (t) {
      return e(t) ? this.not(this.not(t)) : j(P.call(this, function (e) {
        return J.matches(e, t);
      }));
    }, add: function (t, e) {
      return j(O(this.concat(j(t, e))));
    }, is: function (t) {
      return this.length > 0 && J.matches(this[0], t);
    }, not: function (t) {
      var n = [];if (e(t) && t.call !== E) this.each(function (e) {
        t.call(this, e) || n.push(this);
      });else {
        var i = "string" == typeof t ? this.filter(t) : s(t) && e(t.item) ? N.call(t) : j(t);this.forEach(function (t) {
          i.indexOf(t) < 0 && n.push(t);
        });
      }return j(n);
    }, has: function (t) {
      return this.filter(function () {
        return r(t) ? j.contains(this, t) : j(this).find(t).size();
      });
    }, eq: function (t) {
      return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
    }, first: function () {
      var t = this[0];return t && !r(t) ? t : j(t);
    }, last: function () {
      var t = this[this.length - 1];return t && !r(t) ? t : j(t);
    }, find: function (t) {
      var e,
          n = this;return e = "object" == typeof t ? j(t).filter(function () {
        var t = this;return A.some.call(n, function (e) {
          return j.contains(e, t);
        });
      }) : 1 == this.length ? j(J.qsa(this[0], t)) : this.map(function () {
        return J.qsa(this, t);
      });
    }, closest: function (t, e) {
      var n = this[0],
          r = !1;for ("object" == typeof t && (r = j(t)); n && !(r ? r.indexOf(n) >= 0 : J.matches(n, t));) n = n !== e && !i(n) && n.parentNode;return j(n);
    }, parents: function (t) {
      for (var e = [], n = this; n.length > 0;) n = j.map(n, function (t) {
        return (t = t.parentNode) && !i(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0;
      });return v(e, t);
    }, parent: function (t) {
      return v(O(this.pluck("parentNode")), t);
    }, children: function (t) {
      return v(this.map(function () {
        return d(this);
      }), t);
    }, contents: function () {
      return this.map(function () {
        return N.call(this.childNodes);
      });
    }, siblings: function (t) {
      return v(this.map(function (t, e) {
        return P.call(d(e.parentNode), function (t) {
          return t !== e;
        });
      }), t);
    }, empty: function () {
      return this.each(function () {
        this.innerHTML = "";
      });
    }, pluck: function (t) {
      return j.map(this, function (e) {
        return e[t];
      });
    }, show: function () {
      return this.each(function () {
        "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName));
      });
    }, replaceWith: function (t) {
      return this.before(t).remove();
    }, wrap: function (t) {
      var n = e(t);if (this[0] && !n) var i = j(t).get(0),
          r = i.parentNode || this.length > 1;return this.each(function (e) {
        j(this).wrapAll(n ? t.call(this, e) : r ? i.cloneNode(!0) : i);
      });
    }, wrapAll: function (t) {
      if (this[0]) {
        j(this[0]).before(t = j(t));for (var e; (e = t.children()).length;) t = e.first();j(t).append(this);
      }return this;
    }, wrapInner: function (t) {
      var n = e(t);return this.each(function (e) {
        var i = j(this),
            r = i.contents(),
            o = n ? t.call(this, e) : t;r.length ? r.wrapAll(o) : i.append(o);
      });
    }, unwrap: function () {
      return this.parent().each(function () {
        j(this).replaceWith(j(this).children());
      }), this;
    }, clone: function () {
      return this.map(function () {
        return this.cloneNode(!0);
      });
    }, hide: function () {
      return this.css("display", "none");
    }, toggle: function (t) {
      return this.each(function () {
        var e = j(this);(t === E ? "none" == e.css("display") : t) ? e.show() : e.hide();
      });
    }, prev: function (t) {
      return j(this.pluck("previousElementSibling")).filter(t || "*");
    }, next: function (t) {
      return j(this.pluck("nextElementSibling")).filter(t || "*");
    }, html: function (t) {
      return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function (e) {
        var n = this.innerHTML;j(this).empty().append(g(this, t, e, n));
      });
    }, text: function (t) {
      return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function () {
        this.textContent = t === E ? "" : "" + t;
      });
    }, attr: function (t, e) {
      var n;return "string" == typeof t && e === E ? 0 == this.length || 1 !== this[0].nodeType ? E : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : this.each(function (n) {
        if (1 === this.nodeType) if (r(t)) for (T in t) y(this, T, t[T]);else y(this, t, g(this, e, n, this.getAttribute(t)));
      });
    }, removeAttr: function (t) {
      return this.each(function () {
        1 === this.nodeType && y(this, t);
      });
    }, prop: function (t, e) {
      return t = G[t] || t, e === E ? this[0] && this[0][t] : this.each(function (n) {
        this[t] = g(this, e, n, this[t]);
      });
    }, data: function (t, e) {
      var n = this.attr("data-" + t.replace(z, "-$1").toLowerCase(), e);return null !== n ? w(n) : E;
    }, val: function (t) {
      return 0 === arguments.length ? this[0] && (this[0].multiple ? j(this[0]).find("option").filter(function () {
        return this.selected;
      }).pluck("value") : this[0].value) : this.each(function (e) {
        this.value = g(this, t, e, this.value);
      });
    }, offset: function (t) {
      if (t) return this.each(function (e) {
        var n = j(this),
            i = g(this, t, e, n.offset()),
            r = n.offsetParent().offset(),
            o = { top: i.top - r.top, left: i.left - r.left };"static" == n.css("position") && (o.position = "relative"), n.css(o);
      });if (0 == this.length) return null;var e = this[0].getBoundingClientRect();return { left: e.left + window.pageXOffset, top: e.top + window.pageYOffset, width: Math.round(e.width), height: Math.round(e.height) };
    }, css: function (e, n) {
      if (arguments.length < 2) {
        var i = this[0],
            r = getComputedStyle(i, "");if (!i) return;if ("string" == typeof e) return i.style[C(e)] || r.getPropertyValue(e);if (a(e)) {
          var o = {};return j.each(a(e) ? e : [e], function (t, e) {
            o[e] = i.style[C(e)] || r.getPropertyValue(e);
          }), o;
        }
      }var s = "";if ("string" == t(e)) n || 0 === n ? s = l(e) + ":" + h(e, n) : this.each(function () {
        this.style.removeProperty(l(e));
      });else for (T in e) e[T] || 0 === e[T] ? s += l(T) + ":" + h(T, e[T]) + ";" : this.each(function () {
        this.style.removeProperty(l(T));
      });return this.each(function () {
        this.style.cssText += ";" + s;
      });
    }, index: function (t) {
      return t ? this.indexOf(j(t)[0]) : this.parent().children().indexOf(this[0]);
    }, hasClass: function (t) {
      return t ? A.some.call(this, function (t) {
        return this.test(b(t));
      }, f(t)) : !1;
    }, addClass: function (t) {
      return t ? this.each(function (e) {
        S = [];var n = b(this),
            i = g(this, t, e, n);i.split(/\s+/g).forEach(function (t) {
          j(this).hasClass(t) || S.push(t);
        }, this), S.length && b(this, n + (n ? " " : "") + S.join(" "));
      }) : this;
    }, removeClass: function (t) {
      return this.each(function (e) {
        return t === E ? b(this, "") : (S = b(this), g(this, t, e, S).split(/\s+/g).forEach(function (t) {
          S = S.replace(f(t), " ");
        }), void b(this, S.trim()));
      });
    }, toggleClass: function (t, e) {
      return t ? this.each(function (n) {
        var i = j(this),
            r = g(this, t, n, b(this));r.split(/\s+/g).forEach(function (t) {
          (e === E ? !i.hasClass(t) : e) ? i.addClass(t) : i.removeClass(t);
        });
      }) : this;
    }, scrollTop: function (t) {
      if (this.length) {
        var e = "scrollTop" in this[0];return t === E ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
          this.scrollTop = t;
        } : function () {
          this.scrollTo(this.scrollX, t);
        });
      }
    }, scrollLeft: function (t) {
      if (this.length) {
        var e = "scrollLeft" in this[0];return t === E ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
          this.scrollLeft = t;
        } : function () {
          this.scrollTo(t, this.scrollY);
        });
      }
    }, position: function () {
      if (this.length) {
        var t = this[0],
            e = this.offsetParent(),
            n = this.offset(),
            i = F.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset();return n.top -= parseFloat(j(t).css("margin-top")) || 0, n.left -= parseFloat(j(t).css("margin-left")) || 0, i.top += parseFloat(j(e[0]).css("border-top-width")) || 0, i.left += parseFloat(j(e[0]).css("border-left-width")) || 0, { top: n.top - i.top, left: n.left - i.left };
      }
    }, offsetParent: function () {
      return this.map(function () {
        for (var t = this.offsetParent || k.body; t && !F.test(t.nodeName) && "static" == j(t).css("position");) t = t.offsetParent;return t;
      });
    } }, j.fn.detach = j.fn.remove, ["width", "height"].forEach(function (t) {
    var e = t.replace(/./, function (t) {
      return t[0].toUpperCase();
    });j.fn[t] = function (r) {
      var o,
          a = this[0];return r === E ? n(a) ? a["inner" + e] : i(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function (e) {
        a = j(this), a.css(t, g(this, r, e, a[t]()));
      });
    };
  }), R.forEach(function (e, n) {
    var i = n % 2;j.fn[e] = function () {
      var e,
          r,
          o = j.map(arguments, function (n) {
        return e = t(n), "object" == e || "array" == e || null == n ? n : J.fragment(n);
      }),
          a = this.length > 1;return o.length < 1 ? this : this.each(function (t, e) {
        r = i ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null, o.forEach(function (t) {
          if (a) t = t.cloneNode(!0);else if (!r) return j(t).remove();x(r.insertBefore(t, e), function (t) {
            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML);
          });
        });
      });
    }, j.fn[i ? e + "To" : "insert" + (n ? "Before" : "After")] = function (t) {
      return j(t)[e](this), this;
    };
  }), J.Z.prototype = j.fn, J.uniq = O, J.deserializeValue = w, j.zepto = J, j;
}();window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (t) {
  function e(t) {
    return t._zid || (t._zid = h++);
  }function n(t, n, o, a) {
    if (n = i(n), n.ns) var s = r(n.ns);return (v[e(t)] || []).filter(function (t) {
      return t && (!n.e || t.e == n.e) && (!n.ns || s.test(t.ns)) && (!o || e(t.fn) === e(o)) && (!a || t.sel == a);
    });
  }function i(t) {
    var e = ("" + t).split(".");return { e: e[0], ns: e.slice(1).sort().join(" ") };
  }function r(t) {
    return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)");
  }function o(t, e) {
    return t.del && !y && t.e in b || !!e;
  }function a(t) {
    return w[t] || y && b[t] || t;
  }function s(n, r, s, u, l, h, p) {
    var d = e(n),
        m = v[d] || (v[d] = []);r.split(/\s/).forEach(function (e) {
      if ("ready" == e) return t(document).ready(s);var r = i(e);r.fn = s, r.sel = l, r.e in w && (s = function (e) {
        var n = e.relatedTarget;return !n || n !== this && !t.contains(this, n) ? r.fn.apply(this, arguments) : void 0;
      }), r.del = h;var d = h || s;r.proxy = function (t) {
        if (t = c(t), !t.isImmediatePropagationStopped()) {
          t.data = u;var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));return e === !1 && (t.preventDefault(), t.stopPropagation()), e;
        }
      }, r.i = m.length, m.push(r), "addEventListener" in n && n.addEventListener(a(r.e), r.proxy, o(r, p));
    });
  }function u(t, i, r, s, u) {
    var c = e(t);(i || "").split(/\s/).forEach(function (e) {
      n(t, e, r, s).forEach(function (e) {
        delete v[c][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, o(e, u));
      });
    });
  }function c(e, n) {
    return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(j, function (t, i) {
      var r = n[t];e[t] = function () {
        return this[i] = x, r && r.apply(n, arguments);
      }, e[i] = E;
    }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = x)), e;
  }function l(t) {
    var e,
        n = { originalEvent: t };for (e in t) T.test(e) || t[e] === f || (n[e] = t[e]);return c(n, t);
  }var f,
      h = (t.zepto.qsa, 1),
      p = Array.prototype.slice,
      d = t.isFunction,
      m = function (t) {
    return "string" == typeof t;
  },
      v = {},
      g = {},
      y = "onfocusin" in window,
      b = { focus: "focusin", blur: "focusout" },
      w = { mouseenter: "mouseover", mouseleave: "mouseout" };g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents", t.event = { add: s, remove: u }, t.proxy = function (n, i) {
    if (d(n)) {
      var r = function () {
        return n.apply(i, arguments);
      };return r._zid = e(n), r;
    }if (m(i)) return t.proxy(n[i], n);throw new TypeError("expected function");
  }, t.fn.bind = function (t, e, n) {
    return this.on(t, e, n);
  }, t.fn.unbind = function (t, e) {
    return this.off(t, e);
  }, t.fn.one = function (t, e, n, i) {
    return this.on(t, e, n, i, 1);
  };var x = function () {
    return !0;
  },
      E = function () {
    return !1;
  },
      T = /^([A-Z]|returnValue$|layer[XY]$)/,
      j = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" };t.fn.delegate = function (t, e, n) {
    return this.on(e, t, n);
  }, t.fn.undelegate = function (t, e, n) {
    return this.off(e, t, n);
  }, t.fn.live = function (e, n) {
    return t(document.body).delegate(this.selector, e, n), this;
  }, t.fn.die = function (e, n) {
    return t(document.body).undelegate(this.selector, e, n), this;
  }, t.fn.on = function (e, n, i, r, o) {
    var a,
        c,
        h = this;return e && !m(e) ? (t.each(e, function (t, e) {
      h.on(t, n, i, e, o);
    }), h) : (m(n) || d(r) || r === !1 || (r = i, i = n, n = f), (d(i) || i === !1) && (r = i, i = f), r === !1 && (r = E), h.each(function (f, h) {
      o && (a = function (t) {
        return u(h, t.type, r), r.apply(this, arguments);
      }), n && (c = function (e) {
        var i,
            o = t(e.target).closest(n, h).get(0);return o && o !== h ? (i = t.extend(l(e), { currentTarget: o, liveFired: h }), (a || r).apply(o, [i].concat(p.call(arguments, 1)))) : void 0;
      }), s(h, e, r, i, n, c || a);
    }));
  }, t.fn.off = function (e, n, i) {
    var r = this;return e && !m(e) ? (t.each(e, function (t, e) {
      r.off(t, n, e);
    }), r) : (m(n) || d(i) || i === !1 || (i = n, n = f), i === !1 && (i = E), r.each(function () {
      u(this, e, i, n);
    }));
  }, t.fn.trigger = function (e, n) {
    return e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e), e._args = n, this.each(function () {
      "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n);
    });
  }, t.fn.triggerHandler = function (e, i) {
    var r, o;return this.each(function (a, s) {
      r = l(m(e) ? t.Event(e) : e), r._args = i, r.target = s, t.each(n(s, e.type || e), function (t, e) {
        return o = e.proxy(r), r.isImmediatePropagationStopped() ? !1 : void 0;
      });
    }), o;
  }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
    t.fn[e] = function (t) {
      return t ? this.bind(e, t) : this.trigger(e);
    };
  }), ["focus", "blur"].forEach(function (e) {
    t.fn[e] = function (t) {
      return t ? this.bind(e, t) : this.each(function () {
        try {
          this[e]();
        } catch (t) {}
      }), this;
    };
  }), t.Event = function (t, e) {
    m(t) || (e = t, t = e.type);var n = document.createEvent(g[t] || "Events"),
        i = !0;if (e) for (var r in e) "bubbles" == r ? i = !!e[r] : n[r] = e[r];return n.initEvent(t, i, !0), c(n);
  };
}(Zepto), function (t) {
  function e(e, n, i) {
    var r = t.Event(n);return t(e).trigger(r, i), !r.isDefaultPrevented();
  }function n(t, n, i, r) {
    return t.global ? e(n || y, i, r) : void 0;
  }function i(e) {
    e.global && 0 === t.active++ && n(e, null, "ajaxStart");
  }function r(e) {
    e.global && ! --t.active && n(e, null, "ajaxStop");
  }function o(t, e) {
    var i = e.context;return e.beforeSend.call(i, t, e) === !1 || n(e, i, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, i, "ajaxSend", [t, e]);
  }function a(t, e, i, r) {
    var o = i.context,
        a = "success";i.success.call(o, t, a, e), r && r.resolveWith(o, [t, a, e]), n(i, o, "ajaxSuccess", [e, i, t]), u(a, e, i);
  }function s(t, e, i, r, o) {
    var a = r.context;r.error.call(a, i, e, t), o && o.rejectWith(a, [i, e, t]), n(r, a, "ajaxError", [i, r, t || e]), u(e, i, r);
  }function u(t, e, i) {
    var o = i.context;i.complete.call(o, e, t), n(i, o, "ajaxComplete", [e, i]), r(i);
  }function c() {}function l(t) {
    return t && (t = t.split(";", 2)[0]), t && (t == T ? "html" : t == E ? "json" : w.test(t) ? "script" : x.test(t) && "xml") || "text";
  }function f(t, e) {
    return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?");
  }function h(e) {
    e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0);
  }function p(e, n, i, r) {
    var o = !t.isFunction(n);return { url: e, data: o ? n : void 0, success: o ? t.isFunction(i) ? i : void 0 : n, dataType: o ? r || i : i };
  }function d(e, n, i, r) {
    var o,
        a = t.isArray(n),
        s = t.isPlainObject(n);t.each(n, function (n, u) {
      o = t.type(u), r && (n = i ? r : r + "[" + (s || "object" == o || "array" == o ? n : "") + "]"), !r && a ? e.add(u.name, u.value) : "array" == o || !i && "object" == o ? d(e, u, i, n) : e.add(n, u);
    });
  }var m,
      v,
      g = 0,
      y = window.document,
      b = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      w = /^(?:text|application)\/javascript/i,
      x = /^(?:text|application)\/xml/i,
      E = "application/json",
      T = "text/html",
      j = /^\s*$/;t.active = 0, t.ajaxJSONP = function (e, n) {
    if (!("type" in e)) return t.ajax(e);var i,
        r,
        u = e.jsonpCallback,
        c = (t.isFunction(u) ? u() : u) || "jsonp" + ++g,
        l = y.createElement("script"),
        f = window[c],
        h = function (e) {
      t(l).triggerHandler("error", e || "abort");
    },
        p = { abort: h };return n && n.promise(p), t(l).on("load error", function (o, u) {
      clearTimeout(r), t(l).off().remove(), "error" != o.type && i ? a(i[0], p, e, n) : s(null, u || "error", p, e, n), window[c] = f, i && t.isFunction(f) && f(i[0]), f = i = void 0;
    }), o(p, e) === !1 ? (h("abort"), p) : (window[c] = function () {
      i = arguments;
    }, l.src = e.url.replace(/=\?/, "=" + c), y.head.appendChild(l), e.timeout > 0 && (r = setTimeout(function () {
      h("timeout");
    }, e.timeout)), p);
  }, t.ajaxSettings = { type: "GET", beforeSend: c, success: c, error: c, complete: c, context: null, global: !0, xhr: function () {
      return new window.XMLHttpRequest();
    }, accepts: { script: "text/javascript, application/javascript, application/x-javascript", json: E, xml: "application/xml, text/xml", html: T, text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0 }, t.ajax = function (e) {
    var n = t.extend({}, e || {}),
        r = t.Deferred && t.Deferred();for (m in t.ajaxSettings) void 0 === n[m] && (n[m] = t.ajaxSettings[m]);i(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), h(n), n.cache === !1 && (n.url = f(n.url, "_=" + Date.now()));var u = n.dataType,
        p = /=\?/.test(n.url);if ("jsonp" == u || p) return p || (n.url = f(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(n, r);var d,
        g = n.accepts[u],
        y = {},
        b = function (t, e) {
      y[t.toLowerCase()] = [t, e];
    },
        w = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol,
        x = n.xhr(),
        E = x.setRequestHeader;if (r && r.promise(x), n.crossDomain || b("X-Requested-With", "XMLHttpRequest"), b("Accept", g || "*/*"), (g = n.mimeType || g) && (g.indexOf(",") > -1 && (g = g.split(",", 2)[0]), x.overrideMimeType && x.overrideMimeType(g)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && b("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers) for (v in n.headers) b(v, n.headers[v]);if (x.setRequestHeader = b, x.onreadystatechange = function () {
      if (4 == x.readyState) {
        x.onreadystatechange = c, clearTimeout(d);var e,
            i = !1;if (x.status >= 200 && x.status < 300 || 304 == x.status || 0 == x.status && "file:" == w) {
          u = u || l(n.mimeType || x.getResponseHeader("content-type")), e = x.responseText;try {
            "script" == u ? (1, eval)(e) : "xml" == u ? e = x.responseXML : "json" == u && (e = j.test(e) ? null : t.parseJSON(e));
          } catch (o) {
            i = o;
          }i ? s(i, "parsererror", x, n, r) : a(e, x, n, r);
        } else s(x.statusText || null, x.status ? "error" : "abort", x, n, r);
      }
    }, o(x, n) === !1) return x.abort(), s(null, "abort", x, n, r), x;if (n.xhrFields) for (v in n.xhrFields) x[v] = n.xhrFields[v];var T = "async" in n ? n.async : !0;x.open(n.type, n.url, T, n.username, n.password);for (v in y) E.apply(x, y[v]);return n.timeout > 0 && (d = setTimeout(function () {
      x.onreadystatechange = c, x.abort(), s(null, "timeout", x, n, r);
    }, n.timeout)), x.send(n.data ? n.data : null), x;
  }, t.get = function (e, n, i, r) {
    return t.ajax(p.apply(null, arguments));
  }, t.post = function (e, n, i, r) {
    var o = p.apply(null, arguments);return o.type = "POST", t.ajax(o);
  }, t.getJSON = function (e, n, i) {
    var r = p.apply(null, arguments);return r.dataType = "json", t.ajax(r);
  }, t.fn.load = function (e, n, i) {
    if (!this.length) return this;var r,
        o = this,
        a = e.split(/\s/),
        s = p(e, n, i),
        u = s.success;return a.length > 1 && (s.url = a[0], r = a[1]), s.success = function (e) {
      o.html(r ? t("<div>").html(e.replace(b, "")).find(r) : e), u && u.apply(o, arguments);
    }, t.ajax(s), this;
  };var S = encodeURIComponent;t.param = function (t, e) {
    var n = [];return n.add = function (t, e) {
      this.push(S(t) + "=" + S(e));
    }, d(n, t, e), n.join("&").replace(/%20/g, "+");
  };
}(Zepto), function (t) {
  t.fn.serializeArray = function () {
    var e,
        n = [];return t([].slice.call(this.get(0).elements)).each(function () {
      e = t(this);var i = e.attr("type");"fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && n.push({ name: e.attr("name"), value: e.val() });
    }), n;
  }, t.fn.serialize = function () {
    var t = [];return this.serializeArray().forEach(function (e) {
      t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value));
    }), t.join("&");
  }, t.fn.submit = function (e) {
    if (e) this.bind("submit", e);else if (this.length) {
      var n = t.Event("submit");this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit();
    }return this;
  };
}(Zepto), function (t) {
  "__proto__" in {} || t.extend(t.zepto, { Z: function (e, n) {
      return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e;
    }, isZ: function (e) {
      return "array" === t.type(e) && "__Z" in e;
    } });try {
    getComputedStyle(void 0);
  } catch (e) {
    var n = getComputedStyle;window.getComputedStyle = function (t) {
      try {
        return n(t);
      } catch (e) {
        return null;
      }
    };
  }
}(Zepto), function (t) {
  function e(t) {
    var e = this.os = {},
        n = this.browser = {},
        i = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
        r = t.match(/(Android);?[\s\/]+([\d.]+)?/),
        o = t.match(/(iPad).*OS\s([\d_]+)/),
        a = t.match(/(iPod)(.*OS\s([\d_]+))?/),
        s = !o && t.match(/(iPhone\sOS)\s([\d_]+)/),
        u = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        c = u && t.match(/TouchPad/),
        l = t.match(/Kindle\/([\d.]+)/),
        f = t.match(/Silk\/([\d._]+)/),
        h = t.match(/(BlackBerry).*Version\/([\d.]+)/),
        p = t.match(/(BB10).*Version\/([\d.]+)/),
        d = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
        m = t.match(/PlayBook/),
        v = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
        g = t.match(/Firefox\/([\d.]+)/),
        y = t.match(/MSIE ([\d.]+)/),
        b = i && t.match(/Mobile\//) && !v,
        w = t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !v,
        y = t.match(/MSIE\s([\d.]+)/);(n.webkit = !!i) && (n.version = i[1]), r && (e.android = !0, e.version = r[2]), s && !a && (e.ios = e.iphone = !0, e.version = s[2].replace(/_/g, ".")), o && (e.ios = e.ipad = !0, e.version = o[2].replace(/_/g, ".")), a && (e.ios = e.ipod = !0, e.version = a[3] ? a[3].replace(/_/g, ".") : null), u && (e.webos = !0, e.version = u[2]), c && (e.touchpad = !0), h && (e.blackberry = !0, e.version = h[2]), p && (e.bb10 = !0, e.version = p[2]), d && (e.rimtabletos = !0, e.version = d[2]), m && (n.playbook = !0), l && (e.kindle = !0, e.version = l[1]), f && (n.silk = !0, n.version = f[1]), !f && e.android && t.match(/Kindle Fire/) && (n.silk = !0), v && (n.chrome = !0, n.version = v[1]), g && (n.firefox = !0, n.version = g[1]), y && (n.ie = !0, n.version = y[1]), b && (t.match(/Safari/) || e.ios) && (n.safari = !0), w && (n.webview = !0), y && (n.ie = !0, n.version = y[1]), e.tablet = !!(o || m || r && !t.match(/Mobile/) || g && t.match(/Tablet/) || y && !t.match(/Phone/) && t.match(/Touch/)), e.phone = !(e.tablet || e.ipod || !(r || s || u || h || p || v && t.match(/Android/) || v && t.match(/CriOS\/([\d.]+)/) || g && t.match(/Mobile/) || y && t.match(/Touch/)));
  }e.call(t, navigator.userAgent), t.__detect = e;
}(Zepto), function (t, e) {
  function n(t) {
    return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase();
  }function i(t) {
    return r ? r + t : t.toLowerCase();
  }var r,
      o,
      a,
      s,
      u,
      c,
      l,
      f,
      h,
      p,
      d = "",
      m = { Webkit: "webkit", Moz: "", O: "o" },
      v = window.document,
      g = v.createElement("div"),
      y = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
      b = {};t.each(m, function (t, n) {
    return g.style[t + "TransitionProperty"] !== e ? (d = "-" + t.toLowerCase() + "-", r = n, !1) : void 0;
  }), o = d + "transform", b[a = d + "transition-property"] = b[s = d + "transition-duration"] = b[c = d + "transition-delay"] = b[u = d + "transition-timing-function"] = b[l = d + "animation-name"] = b[f = d + "animation-duration"] = b[p = d + "animation-delay"] = b[h = d + "animation-timing-function"] = "", t.fx = { off: r === e && g.style.transitionProperty === e, speeds: { _default: 400, fast: 200, slow: 600 }, cssPrefix: d, transitionEnd: i("TransitionEnd"), animationEnd: i("AnimationEnd") }, t.fn.animate = function (n, i, r, o, a) {
    return t.isFunction(i) && (o = i, r = e, i = e), t.isFunction(r) && (o = r, r = e), t.isPlainObject(i) && (r = i.easing, o = i.complete, a = i.delay, i = i.duration), i && (i = ("number" == typeof i ? i : t.fx.speeds[i] || t.fx.speeds._default) / 1e3), a && (a = parseFloat(a) / 1e3), this.anim(n, i, r, o, a);
  }, t.fn.anim = function (i, r, d, m, v) {
    var g,
        w,
        x,
        E = {},
        T = "",
        j = this,
        S = t.fx.transitionEnd,
        C = !1;if (r === e && (r = t.fx.speeds._default / 1e3), v === e && (v = 0), t.fx.off && (r = 0), "string" == typeof i) E[l] = i, E[f] = r + "s", E[p] = v + "s", E[h] = d || "linear", S = t.fx.animationEnd;else {
      w = [];for (g in i) y.test(g) ? T += g + "(" + i[g] + ") " : (E[g] = i[g], w.push(n(g)));T && (E[o] = T, w.push(o)), r > 0 && "object" == typeof i && (E[a] = w.join(", "), E[s] = r + "s", E[c] = v + "s", E[u] = d || "linear");
    }return x = function (e) {
      if ("undefined" != typeof e) {
        if (e.target !== e.currentTarget) return;t(e.target).unbind(S, x);
      } else t(this).unbind(S, x);C = !0, t(this).css(b), m && m.call(this);
    }, r > 0 && (this.bind(S, x), setTimeout(function () {
      C || x.call(j);
    }, 1e3 * r + 25)), this.size() && this.get(0).clientLeft, this.css(E), 0 >= r && setTimeout(function () {
      j.each(function () {
        x.call(this);
      });
    }, 0), this;
  }, g = null;
}(Zepto), function (t, e) {
  function n(n, i, r, o, a) {
    "function" != typeof i || a || (a = i, i = e);var s = { opacity: r };return o && (s.scale = o, n.css(t.fx.cssPrefix + "transform-origin", "0 0")), n.animate(s, i, null, a);
  }function i(e, i, r, o) {
    return n(e, i, 0, r, function () {
      a.call(t(this)), o && o.call(this);
    });
  }var r = window.document,
      o = (r.documentElement, t.fn.show),
      a = t.fn.hide,
      s = t.fn.toggle;t.fn.show = function (t, i) {
    return o.call(this), t === e ? t = 0 : this.css("opacity", 0), n(this, t, 1, "1,1", i);
  }, t.fn.hide = function (t, n) {
    return t === e ? a.call(this) : i(this, t, "0,0", n);
  }, t.fn.toggle = function (n, i) {
    return n === e || "boolean" == typeof n ? s.call(this, n) : this.each(function () {
      var e = t(this);e["none" == e.css("display") ? "show" : "hide"](n, i);
    });
  }, t.fn.fadeTo = function (t, e, i) {
    return n(this, t, e, null, i);
  }, t.fn.fadeIn = function (t, e) {
    var n = this.css("opacity");return n > 0 ? this.css("opacity", 0) : n = 1, o.call(this).fadeTo(t, n, e);
  }, t.fn.fadeOut = function (t, e) {
    return i(this, t, null, e);
  }, t.fn.fadeToggle = function (e, n) {
    return this.each(function () {
      var i = t(this);i[0 == i.css("opacity") || "none" == i.css("display") ? "fadeIn" : "fadeOut"](e, n);
    });
  };
}(Zepto), function (t) {
  var e,
      n = [];t.fn.remove = function () {
    return this.each(function () {
      this.parentNode && ("IMG" === this.tagName && (n.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", e && clearTimeout(e), e = setTimeout(function () {
        n = [];
      }, 6e4)), this.parentNode.removeChild(this));
    });
  };
}(Zepto), function (t) {
  function e(e, i) {
    var u = e[s],
        c = u && r[u];if (void 0 === i) return c || n(e);if (c) {
      if (i in c) return c[i];var l = a(i);if (l in c) return c[l];
    }return o.call(t(e), i);
  }function n(e, n, o) {
    var u = e[s] || (e[s] = ++t.uuid),
        c = r[u] || (r[u] = i(e));return void 0 !== n && (c[a(n)] = o), c;
  }function i(e) {
    var n = {};return t.each(e.attributes || u, function (e, i) {
      0 == i.name.indexOf("data-") && (n[a(i.name.replace("data-", ""))] = t.zepto.deserializeValue(i.value));
    }), n;
  }var r = {},
      o = t.fn.data,
      a = t.camelCase,
      s = t.expando = "Zepto" + +new Date(),
      u = [];t.fn.data = function (i, r) {
    return void 0 === r ? t.isPlainObject(i) ? this.each(function (e, r) {
      t.each(i, function (t, e) {
        n(r, t, e);
      });
    }) : 0 == this.length ? void 0 : e(this[0], i) : this.each(function () {
      n(this, i, r);
    });
  }, t.fn.removeData = function (e) {
    return "string" == typeof e && (e = e.split(/\s+/)), this.each(function () {
      var n = this[s],
          i = n && r[n];i && t.each(e || i, function (t) {
        delete i[e ? a(this) : t];
      });
    });
  }, ["remove", "empty"].forEach(function (e) {
    var n = t.fn[e];t.fn[e] = function () {
      var t = this.find("*");return "remove" === e && (t = t.add(this)), t.removeData(), n.call(this);
    };
  });
}(Zepto), function (t) {
  function e(n) {
    var i = [["resolve", "done", t.Callbacks({ once: 1, memory: 1 }), "resolved"], ["reject", "fail", t.Callbacks({ once: 1, memory: 1 }), "rejected"], ["notify", "progress", t.Callbacks({ memory: 1 })]],
        r = "pending",
        o = { state: function () {
        return r;
      }, always: function () {
        return a.done(arguments).fail(arguments), this;
      }, then: function () {
        var n = arguments;return e(function (e) {
          t.each(i, function (i, r) {
            var s = t.isFunction(n[i]) && n[i];a[r[1]](function () {
              var n = s && s.apply(this, arguments);if (n && t.isFunction(n.promise)) n.promise().done(e.resolve).fail(e.reject).progress(e.notify);else {
                var i = this === o ? e.promise() : this,
                    a = s ? [n] : arguments;e[r[0] + "With"](i, a);
              }
            });
          }), n = null;
        }).promise();
      }, promise: function (e) {
        return null != e ? t.extend(e, o) : o;
      } },
        a = {};return t.each(i, function (t, e) {
      var n = e[2],
          s = e[3];o[e[1]] = n.add, s && n.add(function () {
        r = s;
      }, i[1 ^ t][2].disable, i[2][2].lock), a[e[0]] = function () {
        return a[e[0] + "With"](this === a ? o : this, arguments), this;
      }, a[e[0] + "With"] = n.fireWith;
    }), o.promise(a), n && n.call(a, a), a;
  }var n = Array.prototype.slice;t.when = function (i) {
    var r,
        o,
        a,
        s = n.call(arguments),
        u = s.length,
        c = 0,
        l = 1 !== u || i && t.isFunction(i.promise) ? u : 0,
        f = 1 === l ? i : e(),
        h = function (t, e, i) {
      return function (o) {
        e[t] = this, i[t] = arguments.length > 1 ? n.call(arguments) : o, i === r ? f.notifyWith(e, i) : --l || f.resolveWith(e, i);
      };
    };if (u > 1) for (r = new Array(u), o = new Array(u), a = new Array(u); u > c; ++c) s[c] && t.isFunction(s[c].promise) ? s[c].promise().done(h(c, a, s)).fail(f.reject).progress(h(c, o, r)) : --l;
    return l || f.resolveWith(a, s), f.promise();
  }, t.Deferred = e;
}(Zepto), function (t) {
  t.Callbacks = function (e) {
    e = t.extend({}, e);var n,
        i,
        r,
        o,
        a,
        s,
        u = [],
        c = !e.once && [],
        l = function (t) {
      for (n = e.memory && t, i = !0, s = o || 0, o = 0, a = u.length, r = !0; u && a > s; ++s) if (u[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
        n = !1;break;
      }r = !1, u && (c ? c.length && l(c.shift()) : n ? u.length = 0 : f.disable());
    },
        f = { add: function () {
        if (u) {
          var i = u.length,
              s = function (n) {
            t.each(n, function (t, n) {
              "function" == typeof n ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" != typeof n && s(n);
            });
          };s(arguments), r ? a = u.length : n && (o = i, l(n));
        }return this;
      }, remove: function () {
        return u && t.each(arguments, function (e, n) {
          for (var i; (i = t.inArray(n, u, i)) > -1;) u.splice(i, 1), r && (a >= i && --a, s >= i && --s);
        }), this;
      }, has: function (e) {
        return !(!u || !(e ? t.inArray(e, u) > -1 : u.length));
      }, empty: function () {
        return a = u.length = 0, this;
      }, disable: function () {
        return u = c = n = void 0, this;
      }, disabled: function () {
        return !u;
      }, lock: function () {
        return c = void 0, n || f.disable(), this;
      }, locked: function () {
        return !c;
      }, fireWith: function (t, e) {
        return !u || i && !c || (e = e || [], e = [t, e.slice ? e.slice() : e], r ? c.push(e) : l(e)), this;
      }, fire: function () {
        return f.fireWith(this, arguments);
      }, fired: function () {
        return !!i;
      } };return f;
  };
}(Zepto), function (t) {
  function e(e) {
    return e = t(e), !(!e.width() && !e.height()) && "none" !== e.css("display");
  }function n(t, e) {
    t = t.replace(/=#\]/g, '="#"]');var n,
        i,
        r = s.exec(t);if (r && r[2] in a && (n = a[r[2]], i = r[3], t = r[1], i)) {
      var o = Number(i);i = isNaN(o) ? i.replace(/^["']|["']$/g, "") : o;
    }return e(t, n, i);
  }var i = t.zepto,
      r = i.qsa,
      o = i.matches,
      a = t.expr[":"] = { visible: function () {
      return e(this) ? this : void 0;
    }, hidden: function () {
      return e(this) ? void 0 : this;
    }, selected: function () {
      return this.selected ? this : void 0;
    }, checked: function () {
      return this.checked ? this : void 0;
    }, parent: function () {
      return this.parentNode;
    }, first: function (t) {
      return 0 === t ? this : void 0;
    }, last: function (t, e) {
      return t === e.length - 1 ? this : void 0;
    }, eq: function (t, e, n) {
      return t === n ? this : void 0;
    }, contains: function (e, n, i) {
      return t(this).text().indexOf(i) > -1 ? this : void 0;
    }, has: function (t, e, n) {
      return i.qsa(this, n).length ? this : void 0;
    } },
      s = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),
      u = /^\s*>/,
      c = "Zepto" + +new Date();i.qsa = function (e, o) {
    return n(o, function (n, a, s) {
      try {
        var l;!n && a ? n = "*" : u.test(n) && (l = t(e).addClass(c), n = "." + c + " " + n);var f = r(e, n);
      } catch (h) {
        throw console.error("error performing selector: %o", o), h;
      } finally {
        l && l.removeClass(c);
      }return a ? i.uniq(t.map(f, function (t, e) {
        return a.call(t, e, f, s);
      })) : f;
    });
  }, i.matches = function (t, e) {
    return n(e, function (e, n, i) {
      return (!e || o(t, e)) && (!n || n.call(t, null, i) === t);
    });
  };
}(Zepto), function (t) {
  function e(t) {
    return "tagName" in t ? t : t.parentNode;
  }if (t.os.ios) {
    var n,
        i = {};t(document).bind("gesturestart", function (t) {
      var r = Date.now();r - (i.last || r);i.target = e(t.target), n && clearTimeout(n), i.e1 = t.scale, i.last = r;
    }).bind("gesturechange", function (t) {
      i.e2 = t.scale;
    }).bind("gestureend", function (e) {
      i.e2 > 0 ? (0 != Math.abs(i.e1 - i.e2) && t(i.target).trigger("pinch") && t(i.target).trigger("pinch" + (i.e1 - i.e2 > 0 ? "In" : "Out")), i.e1 = i.e2 = i.last = 0) : "last" in i && (i = {});
    }), ["pinch", "pinchIn", "pinchOut"].forEach(function (e) {
      t.fn[e] = function (t) {
        return this.bind(e, t);
      };
    });
  }
}(Zepto), function (t) {
  t.fn.end = function () {
    return this.prevObject || t();
  }, t.fn.andSelf = function () {
    return this.add(this.prevObject || t());
  }, "filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function (e) {
    var n = t.fn[e];t.fn[e] = function () {
      var t = n.apply(this, arguments);return t.prevObject = this, t;
    };
  });
}(Zepto), function (t) {
  String.prototype.trim === t && (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  }), Array.prototype.reduce === t && (Array.prototype.reduce = function (e) {
    if (void 0 === this || null === this) throw new TypeError();var n,
        i = Object(this),
        r = i.length >>> 0,
        o = 0;if ("function" != typeof e) throw new TypeError();if (0 == r && 1 == arguments.length) throw new TypeError();if (arguments.length >= 2) n = arguments[1];else for (;;) {
      if (o in i) {
        n = i[o++];break;
      }if (++o >= r) throw new TypeError();
    }for (; r > o;) o in i && (n = e.call(t, n, i[o], o, i)), o++;return n;
  });
}();
!function () {
  "use strict";
  function t(e, o) {
    function i(t, e) {
      return function () {
        return t.apply(e, arguments);
      };
    }var r;if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
      for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; u > s; s++) c[a[s]] = i(c[a[s]], c);n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, n, o) {
        var i = Node.prototype.removeEventListener;"click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o);
      }, e.addEventListener = function (t, n, o) {
        var i = Node.prototype.addEventListener;"click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function (t) {
          t.propagationStopped || n(t);
        }), o) : i.call(e, t, n, o);
      }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function (t) {
        r(t);
      }, !1), e.onclick = null);
    }
  }var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
      n = navigator.userAgent.indexOf("Android") > 0 && !e,
      o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
      i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
      r = o && /OS [6-7]_\d/.test(navigator.userAgent),
      a = navigator.userAgent.indexOf("BB10") > 0;t.prototype.needsClick = function (t) {
    switch (t.nodeName.toLowerCase()) {case "button":case "select":case "textarea":
        if (t.disabled) return !0;break;case "input":
        if (o && "file" === t.type || t.disabled) return !0;break;case "label":case "iframe":case "video":
        return !0;}return (/\bneedsclick\b/.test(t.className)
    );
  }, t.prototype.needsFocus = function (t) {
    switch (t.nodeName.toLowerCase()) {case "textarea":
        return !0;case "select":
        return !n;case "input":
        switch (t.type) {case "button":case "checkbox":case "file":case "image":case "radio":case "submit":
            return !1;}return !t.disabled && !t.readOnly;default:
        return (/\bneedsfocus\b/.test(t.className)
        );}
  }, t.prototype.sendClick = function (t, e) {
    var n, o;document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n);
  }, t.prototype.determineEventType = function (t) {
    return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click";
  }, t.prototype.focus = function (t) {
    var e;o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus();
  }, t.prototype.updateScrollParent = function (t) {
    var e, n;if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
      n = t;do {
        if (n.scrollHeight > n.offsetHeight) {
          e = n, t.fastClickScrollParent = n;break;
        }n = n.parentElement;
      } while (n);
    }e && (e.fastClickLastScrollTop = e.scrollTop);
  }, t.prototype.getTargetElementFromEventTarget = function (t) {
    return t.nodeType === Node.TEXT_NODE ? t.parentNode : t;
  }, t.prototype.onTouchStart = function (t) {
    var e, n, r;if (t.targetTouches.length > 1) return !0;if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
      if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;if (!i) {
        if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e);
      }
    }return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0;
  }, t.prototype.touchHasMoved = function (t) {
    var e = t.changedTouches[0],
        n = this.touchBoundary;return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1;
  }, t.prototype.onTouchMove = function (t) {
    return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0;
  }, t.prototype.findControl = function (t) {
    return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
  }, t.prototype.onTouchEnd = function (t) {
    var e,
        a,
        c,
        s,
        u,
        l = this.targetElement;if (!this.trackingClick) return !0;if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) {
      if (e = this.findControl(l)) {
        if (this.focus(l), n) return !1;l = e;
      }
    } else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);return o && !i && (s = l.fastClickScrollParent, s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1);
  }, t.prototype.onTouchCancel = function () {
    this.trackingClick = !1, this.targetElement = null;
  }, t.prototype.onMouse = function (t) {
    return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0;
  }, t.prototype.onClick = function (t) {
    var e;return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e);
  }, t.prototype.destroy = function () {
    var t = this.layer;n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1);
  }, t.notNeeded = function (t) {
    var e, o, i, r;if ("undefined" == typeof window.ontouchstart) return !0;if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
      if (!n) return !0;if (e = document.querySelector("meta[name=viewport]")) {
        if (-1 !== e.content.indexOf("user-scalable=no")) return !0;if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0;
      }
    }if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
      if (-1 !== e.content.indexOf("user-scalable=no")) return !0;if (document.documentElement.scrollWidth <= window.outerWidth) return !0;
    }return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1);
  }, t.attach = function (e, n) {
    return new t(e, n);
  }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
    return t;
  }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t;
}();
var requirejs, require, define;!function (global) {
  function isFunction(e) {
    return "[object Function]" === ostring.call(e);
  }function isArray(e) {
    return "[object Array]" === ostring.call(e);
  }function each(e, t) {
    if (e) {
      var i;for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1);
    }
  }function eachReverse(e, t) {
    if (e) {
      var i;for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1);
    }
  }function hasProp(e, t) {
    return hasOwn.call(e, t);
  }function getOwn(e, t) {
    return hasProp(e, t) && e[t];
  }function eachProp(e, t) {
    var i;for (i in e) if (hasProp(e, i) && t(e[i], i)) break;
  }function mixin(e, t, i, r) {
    return t && eachProp(t, function (t, n) {
      (i || !hasProp(e, n)) && (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[n] = t : (e[n] || (e[n] = {}), mixin(e[n], t, i, r)));
    }), e;
  }function bind(e, t) {
    return function () {
      return t.apply(e, arguments);
    };
  }function scripts() {
    return document.getElementsByTagName("script");
  }function defaultOnError(e) {
    throw e;
  }function getGlobal(e) {
    if (!e) return e;var t = global;return each(e.split("."), function (e) {
      t = t[e];
    }), t;
  }function makeError(e, t, i, r) {
    var n = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);return n.requireType = e, n.requireModules = r, i && (n.originalError = i), n;
  }function newContext(e) {
    function t(e) {
      var t, i;for (t = 0; t < e.length; t++) if (i = e[t], "." === i) e.splice(t, 1), t -= 1;else if (".." === i) {
        if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1]) continue;t > 0 && (e.splice(t - 1, 2), t -= 2);
      }
    }function i(e, i, r) {
      var n,
          a,
          o,
          s,
          c,
          u,
          p,
          d,
          f,
          l,
          h,
          m,
          g = i && i.split("/"),
          v = y.map,
          x = v && v["*"];if (e && (e = e.split("/"), p = e.length - 1, y.nodeIdCompat && jsSuffixRegExp.test(e[p]) && (e[p] = e[p].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && g && (m = g.slice(0, g.length - 1), e = m.concat(e)), t(e), e = e.join("/")), r && v && (g || x)) {
        o = e.split("/");e: for (s = o.length; s > 0; s -= 1) {
          if (u = o.slice(0, s).join("/"), g) for (c = g.length; c > 0; c -= 1) if (a = getOwn(v, g.slice(0, c).join("/")), a && (a = getOwn(a, u))) {
            d = a, f = s;break e;
          }!l && x && getOwn(x, u) && (l = getOwn(x, u), h = s);
        }!d && l && (d = l, f = h), d && (o.splice(0, f, d), e = o.join("/"));
      }return n = getOwn(y.pkgs, e), n ? n : e;
    }function r(e) {
      isBrowser && each(scripts(), function (t) {
        return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === q.contextName ? (t.parentNode.removeChild(t), !0) : void 0;
      });
    }function n(e) {
      var t = getOwn(y.paths, e);return t && isArray(t) && t.length > 1 ? (t.shift(), q.require.undef(e), q.makeRequire(null, { skipMap: !0 })([e]), !0) : void 0;
    }function a(e) {
      var t,
          i = e ? e.indexOf("!") : -1;return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e];
    }function o(e, t, r, n) {
      var o,
          s,
          c,
          u,
          p = null,
          d = t ? t.name : null,
          f = e,
          l = !0,
          h = "";return e || (l = !1, e = "_@r" + (A += 1)), u = a(e), p = u[0], e = u[1], p && (p = i(p, d, n), s = getOwn(j, p)), e && (p ? h = s && s.normalize ? s.normalize(e, function (e) {
        return i(e, d, n);
      }) : -1 === e.indexOf("!") ? i(e, d, n) : e : (h = i(e, d, n), u = a(h), p = u[0], h = u[1], r = !0, o = q.nameToUrl(h))), c = !p || s || r ? "" : "_unnormalized" + (T += 1), { prefix: p, name: h, parentMap: t, unnormalized: !!c, url: o, originalName: f, isDefine: l, id: (p ? p + "!" + h : h) + c };
    }function s(e) {
      var t = e.id,
          i = getOwn(S, t);return i || (i = S[t] = new q.Module(e)), i;
    }function c(e, t, i) {
      var r = e.id,
          n = getOwn(S, r);!hasProp(j, r) || n && !n.defineEmitComplete ? (n = s(e), n.error && "error" === t ? i(n.error) : n.on(t, i)) : "defined" === t && i(j[r]);
    }function u(e, t) {
      var i = e.requireModules,
          r = !1;t ? t(e) : (each(i, function (t) {
        var i = getOwn(S, t);i && (i.error = e, i.events.error && (r = !0, i.emit("error", e)));
      }), r || req.onError(e));
    }function p() {
      globalDefQueue.length && (apsp.apply(M, [M.length, 0].concat(globalDefQueue)), globalDefQueue = []);
    }function d(e) {
      delete S[e], delete k[e];
    }function f(e, t, i) {
      var r = e.map.id;e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, n) {
        var a = r.id,
            o = getOwn(S, a);!o || e.depMatched[n] || i[a] || (getOwn(t, a) ? (e.defineDep(n, j[a]), e.check()) : f(o, t, i));
      }), i[r] = !0);
    }function l() {
      var e,
          t,
          i = 1e3 * y.waitSeconds,
          a = i && q.startTime + i < new Date().getTime(),
          o = [],
          s = [],
          c = !1,
          p = !0;if (!x) {
        if (x = !0, eachProp(k, function (e) {
          var i = e.map,
              u = i.id;if (e.enabled && (i.isDefine || s.push(e), !e.error)) if (!e.inited && a) n(u) ? (t = !0, c = !0) : (o.push(u), r(u));else if (!e.inited && e.fetched && i.isDefine && (c = !0, !i.prefix)) return p = !1;
        }), a && o.length) return e = makeError("timeout", "Load timeout for modules: " + o, null, o), e.contextName = q.contextName, u(e);p && each(s, function (e) {
          f(e, {}, {});
        }), a && !t || !c || !isBrowser && !isWebWorker || w || (w = setTimeout(function () {
          w = 0, l();
        }, 50)), x = !1;
      }
    }function h(e) {
      hasProp(j, e[0]) || s(o(e[0], null, !0)).init(e[1], e[2]);
    }function m(e, t, i, r) {
      e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(i, t, !1);
    }function g(e) {
      var t = e.currentTarget || e.srcElement;return m(t, q.onScriptLoad, "load", "onreadystatechange"), m(t, q.onScriptError, "error"), { node: t, id: t && t.getAttribute("data-requiremodule") };
    }function v() {
      var e;for (p(); M.length;) {
        if (e = M.shift(), null === e[0]) return u(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));h(e);
      }
    }var x,
        b,
        q,
        E,
        w,
        y = { waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {} },
        S = {},
        k = {},
        O = {},
        M = [],
        j = {},
        P = {},
        R = {},
        A = 1,
        T = 1;return E = { require: function (e) {
        return e.require ? e.require : e.require = q.makeRequire(e.map);
      }, exports: function (e) {
        return e.usingExports = !0, e.map.isDefine ? e.exports ? j[e.map.id] = e.exports : e.exports = j[e.map.id] = {} : void 0;
      }, module: function (e) {
        return e.module ? e.module : e.module = { id: e.map.id, uri: e.map.url, config: function () {
            return getOwn(y.config, e.map.id) || {};
          }, exports: e.exports || (e.exports = {}) };
      } }, b = function (e) {
      this.events = getOwn(O, e.id) || {}, this.map = e, this.shim = getOwn(y.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0;
    }, b.prototype = { init: function (e, t, i, r) {
        r = r || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function (e) {
          this.emit("error", e);
        })), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check());
      }, defineDep: function (e, t) {
        this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t);
      }, fetch: function () {
        if (!this.fetched) {
          this.fetched = !0, q.startTime = new Date().getTime();var e = this.map;return this.shim ? void q.makeRequire(this.map, { enableBuildCallback: !0 })(this.shim.deps || [], bind(this, function () {
            return e.prefix ? this.callPlugin() : this.load();
          })) : e.prefix ? this.callPlugin() : this.load();
        }
      }, load: function () {
        var e = this.map.url;P[e] || (P[e] = !0, q.load(this.map.id, e));
      }, check: function () {
        if (this.enabled && !this.enabling) {
          var e,
              t,
              i = this.map.id,
              r = this.depExports,
              n = this.exports,
              a = this.factory;if (this.inited) {
            if (this.error) this.emit("error", this.error);else if (!this.defining) {
              if (this.defining = !0, this.depCount < 1 && !this.defined) {
                if (isFunction(a)) {
                  if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                    n = q.execCb(i, a, r, n);
                  } catch (o) {
                    e = o;
                  } else n = q.execCb(i, a, r, n);if (this.map.isDefine && void 0 === n && (t = this.module, t ? n = t.exports : this.usingExports && (n = this.exports)), e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", u(this.error = e);
                } else n = a;this.exports = n, this.map.isDefine && !this.ignore && (j[i] = n, req.onResourceLoad && req.onResourceLoad(q, this.map, this.depMaps)), d(i), this.defined = !0;
              }this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0);
            }
          } else this.fetch();
        }
      }, callPlugin: function () {
        var e = this.map,
            t = e.id,
            r = o(e.prefix);this.depMaps.push(r), c(r, "defined", bind(this, function (r) {
          var n,
              a,
              p,
              f = getOwn(R, this.map.id),
              l = this.map.name,
              h = this.map.parentMap ? this.map.parentMap.name : null,
              m = q.makeRequire(e.parentMap, { enableBuildCallback: !0 });return this.map.unnormalized ? (r.normalize && (l = r.normalize(l, function (e) {
            return i(e, h, !0);
          }) || ""), a = o(e.prefix + "!" + l, this.map.parentMap), c(a, "defined", bind(this, function (e) {
            this.init([], function () {
              return e;
            }, null, { enabled: !0, ignore: !0 });
          })), p = getOwn(S, a.id), void (p && (this.depMaps.push(a), this.events.error && p.on("error", bind(this, function (e) {
            this.emit("error", e);
          })), p.enable()))) : f ? (this.map.url = q.nameToUrl(f), void this.load()) : (n = bind(this, function (e) {
            this.init([], function () {
              return e;
            }, null, { enabled: !0 });
          }), n.error = bind(this, function (e) {
            this.inited = !0, this.error = e, e.requireModules = [t], eachProp(S, function (e) {
              0 === e.map.id.indexOf(t + "_unnormalized") && d(e.map.id);
            }), u(e);
          }), n.fromText = bind(this, function (i, r) {
            var a = e.name,
                c = o(a),
                p = useInteractive;r && (i = r), p && (useInteractive = !1), s(c), hasProp(y.config, t) && (y.config[a] = y.config[t]);try {
              req.exec(i);
            } catch (d) {
              return u(makeError("fromtexteval", "fromText eval for " + t + " failed: " + d, d, [t]));
            }p && (useInteractive = !0), this.depMaps.push(c), q.completeLoad(a), m([a], n);
          }), void r.load(e.name, m, n, y));
        })), q.enable(r, this), this.pluginMaps[r.id] = r;
      }, enable: function () {
        k[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
          var i, r, n;if ("string" == typeof e) {
            if (e = o(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, n = getOwn(E, e.id)) return void (this.depExports[t] = n(this));this.depCount += 1, c(e, "defined", bind(this, function (e) {
              this.defineDep(t, e), this.check();
            })), this.errback ? c(e, "error", bind(this, this.errback)) : this.events.error && c(e, "error", bind(this, function (e) {
              this.emit("error", e);
            }));
          }i = e.id, r = S[i], hasProp(E, i) || !r || r.enabled || q.enable(e, this);
        })), eachProp(this.pluginMaps, bind(this, function (e) {
          var t = getOwn(S, e.id);t && !t.enabled && q.enable(e, this);
        })), this.enabling = !1, this.check();
      }, on: function (e, t) {
        var i = this.events[e];i || (i = this.events[e] = []), i.push(t);
      }, emit: function (e, t) {
        each(this.events[e], function (e) {
          e(t);
        }), "error" === e && delete this.events[e];
      } }, q = { config: y, contextName: e, registry: S, defined: j, urlFetched: P, defQueue: M, Module: b, makeModuleMap: o, nextTick: req.nextTick, onError: u, configure: function (e) {
        e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");var t = y.shim,
            i = { paths: !0, bundles: !0, config: !0, map: !0 };eachProp(e, function (e, t) {
          i[t] ? (y[t] || (y[t] = {}), mixin(y[t], e, !0, !0)) : y[t] = e;
        }), e.bundles && eachProp(e.bundles, function (e, t) {
          each(e, function (e) {
            e !== t && (R[e] = t);
          });
        }), e.shim && (eachProp(e.shim, function (e, i) {
          isArray(e) && (e = { deps: e }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = q.makeShimExports(e)), t[i] = e;
        }), y.shim = t), e.packages && each(e.packages, function (e) {
          var t, i;e = "string" == typeof e ? { name: e } : e, i = e.name, t = e.location, t && (y.paths[i] = e.location), y.pkgs[i] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "");
        }), eachProp(S, function (e, t) {
          e.inited || e.map.unnormalized || (e.map = o(t));
        }), (e.deps || e.callback) && q.require(e.deps || [], e.callback);
      }, makeShimExports: function (e) {
        function t() {
          var t;return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports);
        }return t;
      }, makeRequire: function (t, n) {
        function a(i, r, c) {
          var p, d, f;return n.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof i ? isFunction(r) ? u(makeError("requireargs", "Invalid require call"), c) : t && hasProp(E, i) ? E[i](S[t.id]) : req.get ? req.get(q, i, t, a) : (d = o(i, t, !1, !0), p = d.id, hasProp(j, p) ? j[p] : u(makeError("notloaded", 'Module name "' + p + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), q.nextTick(function () {
            v(), f = s(o(null, t)), f.skipMap = n.skipMap, f.init(i, r, c, { enabled: !0 }), l();
          }), a);
        }return n = n || {}, mixin(a, { isBrowser: isBrowser, toUrl: function (e) {
            var r,
                n = e.lastIndexOf("."),
                a = e.split("/")[0],
                o = "." === a || ".." === a;return -1 !== n && (!o || n > 1) && (r = e.substring(n, e.length), e = e.substring(0, n)), q.nameToUrl(i(e, t && t.id, !0), r, !0);
          }, defined: function (e) {
            return hasProp(j, o(e, t, !1, !0).id);
          }, specified: function (e) {
            return e = o(e, t, !1, !0).id, hasProp(j, e) || hasProp(S, e);
          } }), t || (a.undef = function (e) {
          p();var i = o(e, t, !0),
              n = getOwn(S, e);r(e), delete j[e], delete P[i.url], delete O[e], eachReverse(M, function (t, i) {
            t[0] === e && M.splice(i, 1);
          }), n && (n.events.defined && (O[e] = n.events), d(e));
        }), a;
      }, enable: function (e) {
        var t = getOwn(S, e.id);t && s(e).enable();
      }, completeLoad: function (e) {
        var t,
            i,
            r,
            a = getOwn(y.shim, e) || {},
            o = a.exports;for (p(); M.length;) {
          if (i = M.shift(), null === i[0]) {
            if (i[0] = e, t) break;t = !0;
          } else i[0] === e && (t = !0);h(i);
        }if (r = getOwn(S, e), !t && !hasProp(j, e) && r && !r.inited) {
          if (!(!y.enforceDefine || o && getGlobal(o))) return n(e) ? void 0 : u(makeError("nodefine", "No define call for " + e, null, [e]));h([e, a.deps || [], a.exportsFn]);
        }l();
      }, nameToUrl: function (e, t, i) {
        var r,
            n,
            a,
            o,
            s,
            c,
            u,
            p = getOwn(y.pkgs, e);if (p && (e = p), u = getOwn(R, e)) return q.nameToUrl(u, t, i);if (req.jsExtRegExp.test(e)) s = e + (t || "");else {
          for (r = y.paths, n = e.split("/"), a = n.length; a > 0; a -= 1) if (o = n.slice(0, a).join("/"), c = getOwn(r, o)) {
            isArray(c) && (c = c[0]), n.splice(0, a, c);break;
          }s = n.join("/"), s += t || (/^data\:|\?/.test(s) || i ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : y.baseUrl) + s;
        }return y.urlArgs ? s + ((-1 === s.indexOf("?") ? "?" : "&") + y.urlArgs) : s;
      }, load: function (e, t) {
        req.load(q, e, t);
      }, execCb: function (e, t, i, r) {
        return t.apply(r, i);
      }, onScriptLoad: function (e) {
        if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
          interactiveScript = null;var t = g(e);q.completeLoad(t.id);
        }
      }, onScriptError: function (e) {
        var t = g(e);return n(t.id) ? void 0 : u(makeError("scripterror", "Script error for: " + t.id, e, [t.id]));
      } }, q.require = q.makeRequire(), q;
  }function getInteractiveScript() {
    return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (e) {
      return "interactive" === e.readyState ? interactiveScript = e : void 0;
    }), interactiveScript);
  }var req,
      s,
      head,
      baseElement,
      dataMain,
      src,
      interactiveScript,
      currentlyAddingScript,
      mainScript,
      subPath,
      version = "2.1.17",
      commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
      cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
      jsSuffixRegExp = /\.js$/,
      currDirRegExp = /^\.\//,
      op = Object.prototype,
      ostring = op.toString,
      hasOwn = op.hasOwnProperty,
      ap = Array.prototype,
      apsp = ap.splice,
      isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
      isWebWorker = !isBrowser && "undefined" != typeof importScripts,
      readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
      defContextName = "_",
      isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
      contexts = {},
      cfg = {},
      globalDefQueue = [],
      useInteractive = !1;if ("undefined" == typeof define) {
    if ("undefined" != typeof requirejs) {
      if (isFunction(requirejs)) return;cfg = requirejs, requirejs = void 0;
    }"undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (e, t, i, r) {
      var n,
          a,
          o = defContextName;return isArray(e) || "string" == typeof e || (a = e, isArray(t) ? (e = t, t = i, i = r) : e = []), a && a.context && (o = a.context), n = getOwn(contexts, o), n || (n = contexts[o] = req.s.newContext(o)), a && n.configure(a), n.require(e, t, i);
    }, req.config = function (e) {
      return req(e);
    }, req.nextTick = "undefined" != typeof setTimeout ? function (e) {
      setTimeout(e, 4);
    } : function (e) {
      e();
    }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = { contexts: contexts, newContext: newContext }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) {
      req[e] = function () {
        var t = contexts[defContextName];return t.require[e].apply(t, arguments);
      };
    }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e, t, i) {
      var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r;
    }, req.load = function (e, t, i) {
      var r,
          n = e && e.config || {};if (isBrowser) return r = req.createNode(n, t, i), r.setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = i, currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;if (isWebWorker) try {
        importScripts(i), e.completeLoad(t);
      } catch (a) {
        e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + i, a, [t]));
      }
    }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) {
      return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0;
    }), define = function (e, t, i) {
      var r, n;"string" != typeof e && (i = t, t = e, e = null), isArray(t) || (i = t, t = null), !t && isFunction(i) && (t = [], i.length && (i.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (e, i) {
        t.push(i);
      }), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), n = contexts[r.getAttribute("data-requirecontext")])), (n ? n.defQueue : globalDefQueue).push([e, t, i]);
    }, define.amd = { jQuery: !0 }, req.exec = function (text) {
      return eval(text);
    }, req(cfg);
  }
}(this);
(function () {
  var n = this,
      t = n._,
      r = Array.prototype,
      e = Object.prototype,
      u = Function.prototype,
      i = r.push,
      a = r.slice,
      o = r.concat,
      l = e.toString,
      c = e.hasOwnProperty,
      f = Array.isArray,
      s = Object.keys,
      p = u.bind,
      h = function (n) {
    return n instanceof h ? n : this instanceof h ? void (this._wrapped = n) : new h(n);
  };"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = h), exports._ = h) : n._ = h, h.VERSION = "1.7.0";var g = function (n, t, r) {
    if (void 0 === t) return n;switch (null == r ? 3 : r) {case 1:
        return function (r) {
          return n.call(t, r);
        };case 2:
        return function (r, e) {
          return n.call(t, r, e);
        };case 3:
        return function (r, e, u) {
          return n.call(t, r, e, u);
        };case 4:
        return function (r, e, u, i) {
          return n.call(t, r, e, u, i);
        };}return function () {
      return n.apply(t, arguments);
    };
  };h.iteratee = function (n, t, r) {
    return null == n ? h.identity : h.isFunction(n) ? g(n, t, r) : h.isObject(n) ? h.matches(n) : h.property(n);
  }, h.each = h.forEach = function (n, t, r) {
    if (null == n) return n;t = g(t, r);var e,
        u = n.length;if (u === +u) for (e = 0; u > e; e++) t(n[e], e, n);else {
      var i = h.keys(n);for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n);
    }return n;
  }, h.map = h.collect = function (n, t, r) {
    if (null == n) return [];t = h.iteratee(t, r);for (var e, u = n.length !== +n.length && h.keys(n), i = (u || n).length, a = Array(i), o = 0; i > o; o++) e = u ? u[o] : o, a[o] = t(n[e], e, n);return a;
  };var v = "Reduce of empty array with no initial value";h.reduce = h.foldl = h.inject = function (n, t, r, e) {
    null == n && (n = []), t = g(t, e, 4);var u,
        i = n.length !== +n.length && h.keys(n),
        a = (i || n).length,
        o = 0;if (arguments.length < 3) {
      if (!a) throw new TypeError(v);r = n[i ? i[o++] : o++];
    }for (; a > o; o++) u = i ? i[o] : o, r = t(r, n[u], u, n);return r;
  }, h.reduceRight = h.foldr = function (n, t, r, e) {
    null == n && (n = []), t = g(t, e, 4);var u,
        i = n.length !== +n.length && h.keys(n),
        a = (i || n).length;if (arguments.length < 3) {
      if (!a) throw new TypeError(v);r = n[i ? i[--a] : --a];
    }for (; a--;) u = i ? i[a] : a, r = t(r, n[u], u, n);return r;
  }, h.find = h.detect = function (n, t, r) {
    var e;return t = h.iteratee(t, r), h.some(n, function (n, r, u) {
      return t(n, r, u) ? (e = n, !0) : void 0;
    }), e;
  }, h.filter = h.select = function (n, t, r) {
    var e = [];return null == n ? e : (t = h.iteratee(t, r), h.each(n, function (n, r, u) {
      t(n, r, u) && e.push(n);
    }), e);
  }, h.reject = function (n, t, r) {
    return h.filter(n, h.negate(h.iteratee(t)), r);
  }, h.every = h.all = function (n, t, r) {
    if (null == n) return !0;t = h.iteratee(t, r);var e,
        u,
        i = n.length !== +n.length && h.keys(n),
        a = (i || n).length;for (e = 0; a > e; e++) if (u = i ? i[e] : e, !t(n[u], u, n)) return !1;return !0;
  }, h.some = h.any = function (n, t, r) {
    if (null == n) return !1;t = h.iteratee(t, r);var e,
        u,
        i = n.length !== +n.length && h.keys(n),
        a = (i || n).length;for (e = 0; a > e; e++) if (u = i ? i[e] : e, t(n[u], u, n)) return !0;return !1;
  }, h.contains = h.include = function (n, t) {
    return null == n ? !1 : (n.length !== +n.length && (n = h.values(n)), h.indexOf(n, t) >= 0);
  }, h.invoke = function (n, t) {
    var r = a.call(arguments, 2),
        e = h.isFunction(t);return h.map(n, function (n) {
      return (e ? t : n[t]).apply(n, r);
    });
  }, h.pluck = function (n, t) {
    return h.map(n, h.property(t));
  }, h.where = function (n, t) {
    return h.filter(n, h.matches(t));
  }, h.findWhere = function (n, t) {
    return h.find(n, h.matches(t));
  }, h.max = function (n, t, r) {
    var e,
        u,
        i = -(1 / 0),
        a = -(1 / 0);if (null == t && null != n) {
      n = n.length === +n.length ? n : h.values(n);for (var o = 0, l = n.length; l > o; o++) e = n[o], e > i && (i = e);
    } else t = h.iteratee(t, r), h.each(n, function (n, r, e) {
      u = t(n, r, e), (u > a || u === -(1 / 0) && i === -(1 / 0)) && (i = n, a = u);
    });return i;
  }, h.min = function (n, t, r) {
    var e,
        u,
        i = 1 / 0,
        a = 1 / 0;if (null == t && null != n) {
      n = n.length === +n.length ? n : h.values(n);for (var o = 0, l = n.length; l > o; o++) e = n[o], i > e && (i = e);
    } else t = h.iteratee(t, r), h.each(n, function (n, r, e) {
      u = t(n, r, e), (a > u || u === 1 / 0 && i === 1 / 0) && (i = n, a = u);
    });return i;
  }, h.shuffle = function (n) {
    for (var t, r = n && n.length === +n.length ? n : h.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = h.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];return u;
  }, h.sample = function (n, t, r) {
    return null == t || r ? (n.length !== +n.length && (n = h.values(n)), n[h.random(n.length - 1)]) : h.shuffle(n).slice(0, Math.max(0, t));
  }, h.sortBy = function (n, t, r) {
    return t = h.iteratee(t, r), h.pluck(h.map(n, function (n, r, e) {
      return { value: n, index: r, criteria: t(n, r, e) };
    }).sort(function (n, t) {
      var r = n.criteria,
          e = t.criteria;if (r !== e) {
        if (r > e || void 0 === r) return 1;if (e > r || void 0 === e) return -1;
      }return n.index - t.index;
    }), "value");
  };var m = function (n) {
    return function (t, r, e) {
      var u = {};return r = h.iteratee(r, e), h.each(t, function (e, i) {
        var a = r(e, i, t);n(u, e, a);
      }), u;
    };
  };h.groupBy = m(function (n, t, r) {
    h.has(n, r) ? n[r].push(t) : n[r] = [t];
  }), h.indexBy = m(function (n, t, r) {
    n[r] = t;
  }), h.countBy = m(function (n, t, r) {
    h.has(n, r) ? n[r]++ : n[r] = 1;
  }), h.sortedIndex = function (n, t, r, e) {
    r = h.iteratee(r, e, 1);for (var u = r(t), i = 0, a = n.length; a > i;) {
      var o = i + a >>> 1;r(n[o]) < u ? i = o + 1 : a = o;
    }return i;
  }, h.toArray = function (n) {
    return n ? h.isArray(n) ? a.call(n) : n.length === +n.length ? h.map(n, h.identity) : h.values(n) : [];
  }, h.size = function (n) {
    return null == n ? 0 : n.length === +n.length ? n.length : h.keys(n).length;
  }, h.partition = function (n, t, r) {
    t = h.iteratee(t, r);var e = [],
        u = [];return h.each(n, function (n, r, i) {
      (t(n, r, i) ? e : u).push(n);
    }), [e, u];
  }, h.first = h.head = h.take = function (n, t, r) {
    return null != n ? null == t || r ? n[0] : 0 > t ? [] : a.call(n, 0, t) : void 0;
  }, h.initial = function (n, t, r) {
    return a.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)));
  }, h.last = function (n, t, r) {
    return null != n ? null == t || r ? n[n.length - 1] : a.call(n, Math.max(n.length - t, 0)) : void 0;
  }, h.rest = h.tail = h.drop = function (n, t, r) {
    return a.call(n, null == t || r ? 1 : t);
  }, h.compact = function (n) {
    return h.filter(n, h.identity);
  };var y = function (n, t, r, e) {
    if (t && h.every(n, h.isArray)) return o.apply(e, n);for (var u = 0, a = n.length; a > u; u++) {
      var l = n[u];h.isArray(l) || h.isArguments(l) ? t ? i.apply(e, l) : y(l, t, r, e) : r || e.push(l);
    }return e;
  };h.flatten = function (n, t) {
    return y(n, t, !1, []);
  }, h.without = function (n) {
    return h.difference(n, a.call(arguments, 1));
  }, h.uniq = h.unique = function (n, t, r, e) {
    if (null == n) return [];h.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = h.iteratee(r, e));for (var u = [], i = [], a = 0, o = n.length; o > a; a++) {
      var l = n[a];if (t) a && i === l || u.push(l), i = l;else if (r) {
        var c = r(l, a, n);h.indexOf(i, c) < 0 && (i.push(c), u.push(l));
      } else h.indexOf(u, l) < 0 && u.push(l);
    }return u;
  }, h.union = function () {
    return h.uniq(y(arguments, !0, !0, []));
  }, h.intersection = function (n) {
    if (null == n) return [];for (var t = [], r = arguments.length, e = 0, u = n.length; u > e; e++) {
      var i = n[e];if (!h.contains(t, i)) {
        for (var a = 1; r > a && h.contains(arguments[a], i); a++);a === r && t.push(i);
      }
    }return t;
  }, h.difference = function (n) {
    var t = y(a.call(arguments, 1), !0, !0, []);return h.filter(n, function (n) {
      return !h.contains(t, n);
    });
  }, h.zip = function (n) {
    if (null == n) return [];for (var t = h.max(arguments, "length").length, r = Array(t), e = 0; t > e; e++) r[e] = h.pluck(arguments, e);return r;
  }, h.object = function (n, t) {
    if (null == n) return {};for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];return r;
  }, h.indexOf = function (n, t, r) {
    if (null == n) return -1;var e = 0,
        u = n.length;if (r) {
      if ("number" != typeof r) return e = h.sortedIndex(n, t), n[e] === t ? e : -1;e = 0 > r ? Math.max(0, u + r) : r;
    }for (; u > e; e++) if (n[e] === t) return e;return -1;
  }, h.lastIndexOf = function (n, t, r) {
    if (null == n) return -1;var e = n.length;for ("number" == typeof r && (e = 0 > r ? e + r + 1 : Math.min(e, r + 1)); --e >= 0;) if (n[e] === t) return e;return -1;
  }, h.range = function (n, t, r) {
    arguments.length <= 1 && (t = n || 0, n = 0), r = r || 1;for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;return u;
  };var d = function () {};h.bind = function (n, t) {
    var r, e;if (p && n.bind === p) return p.apply(n, a.call(arguments, 1));if (!h.isFunction(n)) throw new TypeError("Bind must be called on a function");return r = a.call(arguments, 2), e = function () {
      if (!(this instanceof e)) return n.apply(t, r.concat(a.call(arguments)));d.prototype = n.prototype;var u = new d();d.prototype = null;var i = n.apply(u, r.concat(a.call(arguments)));return h.isObject(i) ? i : u;
    };
  }, h.partial = function (n) {
    var t = a.call(arguments, 1);return function () {
      for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++) e[u] === h && (e[u] = arguments[r++]);for (; r < arguments.length;) e.push(arguments[r++]);return n.apply(this, e);
    };
  }, h.bindAll = function (n) {
    var t,
        r,
        e = arguments.length;if (1 >= e) throw new Error("bindAll must be passed function names");for (t = 1; e > t; t++) r = arguments[t], n[r] = h.bind(n[r], n);return n;
  }, h.memoize = function (n, t) {
    var r = function (e) {
      var u = r.cache,
          i = t ? t.apply(this, arguments) : e;return h.has(u, i) || (u[i] = n.apply(this, arguments)), u[i];
    };return r.cache = {}, r;
  }, h.delay = function (n, t) {
    var r = a.call(arguments, 2);return setTimeout(function () {
      return n.apply(null, r);
    }, t);
  }, h.defer = function (n) {
    return h.delay.apply(h, [n, 1].concat(a.call(arguments, 1)));
  }, h.throttle = function (n, t, r) {
    var e,
        u,
        i,
        a = null,
        o = 0;r || (r = {});var l = function () {
      o = r.leading === !1 ? 0 : h.now(), a = null, i = n.apply(e, u), a || (e = u = null);
    };return function () {
      var c = h.now();o || r.leading !== !1 || (o = c);var f = t - (c - o);return e = this, u = arguments, 0 >= f || f > t ? (clearTimeout(a), a = null, o = c, i = n.apply(e, u), a || (e = u = null)) : a || r.trailing === !1 || (a = setTimeout(l, f)), i;
    };
  }, h.debounce = function (n, t, r) {
    var e,
        u,
        i,
        a,
        o,
        l = function () {
      var c = h.now() - a;t > c && c > 0 ? e = setTimeout(l, t - c) : (e = null, r || (o = n.apply(i, u), e || (i = u = null)));
    };return function () {
      i = this, u = arguments, a = h.now();var c = r && !e;return e || (e = setTimeout(l, t)), c && (o = n.apply(i, u), i = u = null), o;
    };
  }, h.wrap = function (n, t) {
    return h.partial(t, n);
  }, h.negate = function (n) {
    return function () {
      return !n.apply(this, arguments);
    };
  }, h.compose = function () {
    var n = arguments,
        t = n.length - 1;return function () {
      for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);return e;
    };
  }, h.after = function (n, t) {
    return function () {
      return --n < 1 ? t.apply(this, arguments) : void 0;
    };
  }, h.before = function (n, t) {
    var r;return function () {
      return --n > 0 ? r = t.apply(this, arguments) : t = null, r;
    };
  }, h.once = h.partial(h.before, 2), h.keys = function (n) {
    if (!h.isObject(n)) return [];if (s) return s(n);var t = [];for (var r in n) h.has(n, r) && t.push(r);return t;
  }, h.values = function (n) {
    for (var t = h.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];return e;
  }, h.pairs = function (n) {
    for (var t = h.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];return e;
  }, h.invert = function (n) {
    for (var t = {}, r = h.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];return t;
  }, h.functions = h.methods = function (n) {
    var t = [];for (var r in n) h.isFunction(n[r]) && t.push(r);return t.sort();
  }, h.extend = function (n) {
    if (!h.isObject(n)) return n;for (var t, r, e = 1, u = arguments.length; u > e; e++) {
      t = arguments[e];for (r in t) c.call(t, r) && (n[r] = t[r]);
    }return n;
  }, h.pick = function (n, t, r) {
    var e,
        u = {};if (null == n) return u;if (h.isFunction(t)) {
      t = g(t, r);for (e in n) {
        var i = n[e];t(i, e, n) && (u[e] = i);
      }
    } else {
      var l = o.apply([], a.call(arguments, 1));n = new Object(n);for (var c = 0, f = l.length; f > c; c++) e = l[c], e in n && (u[e] = n[e]);
    }return u;
  }, h.omit = function (n, t, r) {
    if (h.isFunction(t)) t = h.negate(t);else {
      var e = h.map(o.apply([], a.call(arguments, 1)), String);t = function (n, t) {
        return !h.contains(e, t);
      };
    }return h.pick(n, t, r);
  }, h.defaults = function (n) {
    if (!h.isObject(n)) return n;for (var t = 1, r = arguments.length; r > t; t++) {
      var e = arguments[t];for (var u in e) void 0 === n[u] && (n[u] = e[u]);
    }return n;
  }, h.clone = function (n) {
    return h.isObject(n) ? h.isArray(n) ? n.slice() : h.extend({}, n) : n;
  }, h.tap = function (n, t) {
    return t(n), n;
  };var b = function (n, t, r, e) {
    if (n === t) return 0 !== n || 1 / n === 1 / t;if (null == n || null == t) return n === t;n instanceof h && (n = n._wrapped), t instanceof h && (t = t._wrapped);var u = l.call(n);if (u !== l.call(t)) return !1;switch (u) {case "[object RegExp]":case "[object String]":
        return "" + n == "" + t;case "[object Number]":
        return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;case "[object Date]":case "[object Boolean]":
        return +n === +t;}if ("object" != typeof n || "object" != typeof t) return !1;for (var i = r.length; i--;) if (r[i] === n) return e[i] === t;var a = n.constructor,
        o = t.constructor;if (a !== o && "constructor" in n && "constructor" in t && !(h.isFunction(a) && a instanceof a && h.isFunction(o) && o instanceof o)) return !1;r.push(n), e.push(t);var c, f;if ("[object Array]" === u) {
      if (c = n.length, f = c === t.length) for (; c-- && (f = b(n[c], t[c], r, e)););
    } else {
      var s,
          p = h.keys(n);if (c = p.length, f = h.keys(t).length === c) for (; c-- && (s = p[c], f = h.has(t, s) && b(n[s], t[s], r, e)););
    }return r.pop(), e.pop(), f;
  };h.isEqual = function (n, t) {
    return b(n, t, [], []);
  }, h.isEmpty = function (n) {
    if (null == n) return !0;if (h.isArray(n) || h.isString(n) || h.isArguments(n)) return 0 === n.length;for (var t in n) if (h.has(n, t)) return !1;return !0;
  }, h.isElement = function (n) {
    return !(!n || 1 !== n.nodeType);
  }, h.isArray = f || function (n) {
    return "[object Array]" === l.call(n);
  }, h.isObject = function (n) {
    var t = typeof n;return "function" === t || "object" === t && !!n;
  }, h.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (n) {
    h["is" + n] = function (t) {
      return l.call(t) === "[object " + n + "]";
    };
  }), h.isArguments(arguments) || (h.isArguments = function (n) {
    return h.has(n, "callee");
  }), "function" != typeof /./ && (h.isFunction = function (n) {
    return "function" == typeof n || !1;
  }), h.isFinite = function (n) {
    return isFinite(n) && !isNaN(parseFloat(n));
  }, h.isNaN = function (n) {
    return h.isNumber(n) && n !== +n;
  }, h.isBoolean = function (n) {
    return n === !0 || n === !1 || "[object Boolean]" === l.call(n);
  }, h.isNull = function (n) {
    return null === n;
  }, h.isUndefined = function (n) {
    return void 0 === n;
  }, h.has = function (n, t) {
    return null != n && c.call(n, t);
  }, h.noConflict = function () {
    return n._ = t, this;
  }, h.identity = function (n) {
    return n;
  }, h.constant = function (n) {
    return function () {
      return n;
    };
  }, h.noop = function () {}, h.property = function (n) {
    return function (t) {
      return t[n];
    };
  }, h.matches = function (n) {
    var t = h.pairs(n),
        r = t.length;return function (n) {
      if (null == n) return !r;n = new Object(n);for (var e = 0; r > e; e++) {
        var u = t[e],
            i = u[0];if (u[1] !== n[i] || !(i in n)) return !1;
      }return !0;
    };
  }, h.times = function (n, t, r) {
    var e = Array(Math.max(0, n));t = g(t, r, 1);for (var u = 0; n > u; u++) e[u] = t(u);return e;
  }, h.random = function (n, t) {
    return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
  }, h.now = Date.now || function () {
    return new Date().getTime();
  };var _ = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
      w = h.invert(_),
      j = function (n) {
    var t = function (t) {
      return n[t];
    },
        r = "(?:" + h.keys(n).join("|") + ")",
        e = RegExp(r),
        u = RegExp(r, "g");return function (n) {
      return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n;
    };
  };h.escape = j(_), h.unescape = j(w), h.result = function (n, t) {
    if (null != n) {
      var r = n[t];return h.isFunction(r) ? n[t]() : r;
    }
  };var x = 0;h.uniqueId = function (n) {
    var t = ++x + "";return n ? n + t : t;
  }, h.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };var A = /(.)^/,
      k = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" },
      O = /\\|'|\r|\n|\u2028|\u2029/g,
      F = function (n) {
    return "\\" + k[n];
  };h.template = function (n, t, r) {
    !t && r && (t = r), t = h.defaults({}, t, h.templateSettings);var e = RegExp([(t.escape || A).source, (t.interpolate || A).source, (t.evaluate || A).source].join("|") + "|$", "g"),
        u = 0,
        i = "__p+='";n.replace(e, function (t, r, e, a, o) {
      return i += n.slice(u, o).replace(O, F), u = o + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : a && (i += "';\n" + a + "\n__p+='"), t;
    }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";try {
      var a = new Function(t.variable || "obj", "_", i);
    } catch (o) {
      throw o.source = i, o;
    }var l = function (n) {
      return a.call(this, n, h);
    },
        c = t.variable || "obj";return l.source = "function(" + c + "){\n" + i + "}", l;
  }, h.chain = function (n) {
    var t = h(n);return t._chain = !0, t;
  };var E = function (n) {
    return this._chain ? h(n).chain() : n;
  };h.mixin = function (n) {
    h.each(h.functions(n), function (t) {
      var r = h[t] = n[t];h.prototype[t] = function () {
        var n = [this._wrapped];return i.apply(n, arguments), E.call(this, r.apply(h, n));
      };
    });
  }, h.mixin(h), h.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) {
    var t = r[n];h.prototype[n] = function () {
      var r = this._wrapped;return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], E.call(this, r);
    };
  }), h.each(["concat", "join", "slice"], function (n) {
    var t = r[n];h.prototype[n] = function () {
      return E.call(this, t.apply(this._wrapped, arguments));
    };
  }), h.prototype.value = function () {
    return this._wrapped;
  }, "function" == typeof define && define.amd && define("underscore", [], function () {
    return h;
  });
}).call(this);
!function (e, t) {
  "use strict";
  var r = e.History = e.History || {},
      a = e.Zepto;if ("undefined" != typeof r.Adapter) throw new Error("History.js Adapter has already been loaded...");r.Adapter = { bind: function (e, t, r) {
      new a(e).bind(t, r);
    }, trigger: function (e, t) {
      new a(e).trigger(t);
    }, extractEventData: function (e, r) {
      var a = r && r[e] || t;return a;
    }, onDomLoad: function (e) {
      new a(e);
    } }, "undefined" != typeof r.init && r.init();
}(window), function (e, t) {
  "use strict";
  var r = e.console || t,
      a = e.document,
      n = e.navigator,
      o = e.sessionStorage || !1,
      i = e.setTimeout,
      s = e.clearTimeout,
      u = e.setInterval,
      l = e.clearInterval,
      d = e.JSON,
      c = e.alert,
      p = e.History = e.History || {},
      f = e.history;try {
    o.setItem("TEST", "1"), o.removeItem("TEST");
  } catch (g) {
    o = !1;
  }if (d.stringify = d.stringify || d.encode, d.parse = d.parse || d.decode, "undefined" != typeof p.init) throw new Error("History.js Core has already been loaded...");p.init = function (e) {
    return "undefined" == typeof p.Adapter ? !1 : ("undefined" != typeof p.initCore && p.initCore(), "undefined" != typeof p.initHtml4 && p.initHtml4(), !0);
  }, p.initCore = function (g) {
    if ("undefined" != typeof p.initCore.initialized) return !1;if (p.initCore.initialized = !0, p.options = p.options || {}, p.options.hashChangeInterval = p.options.hashChangeInterval || 100, p.options.safariPollInterval = p.options.safariPollInterval || 500, p.options.doubleCheckInterval = p.options.doubleCheckInterval || 500, p.options.disableSuid = p.options.disableSuid || !1, p.options.storeInterval = p.options.storeInterval || 1e3, p.options.busyDelay = p.options.busyDelay || 250, p.options.debug = p.options.debug || !1, p.options.initialTitle = p.options.initialTitle || a.title, p.options.html4Mode = p.options.html4Mode || !1, p.options.delayInit = p.options.delayInit || !1, p.intervalList = [], p.clearAllIntervals = function () {
      var e,
          t = p.intervalList;if ("undefined" != typeof t && null !== t) {
        for (e = 0; e < t.length; e++) l(t[e]);p.intervalList = null;
      }
    }, p.debug = function () {
      p.options.debug && p.log.apply(p, arguments);
    }, p.log = function () {
      var e,
          t,
          n,
          o,
          i,
          s = !("undefined" == typeof r || "undefined" == typeof r.log || "undefined" == typeof r.log.apply),
          u = a.getElementById("log");for (s ? (o = Array.prototype.slice.call(arguments), e = o.shift(), "undefined" != typeof r.debug ? r.debug.apply(r, [e, o]) : r.log.apply(r, [e, o])) : e = "\n" + arguments[0] + "\n", t = 1, n = arguments.length; n > t; ++t) {
        if (i = arguments[t], "object" == typeof i && "undefined" != typeof d) try {
          i = d.stringify(i);
        } catch (l) {}e += "\n" + i + "\n";
      }return u ? (u.value += e + "\n-----\n", u.scrollTop = u.scrollHeight - u.clientHeight) : s || c(e), !0;
    }, p.getInternetExplorerMajorVersion = function () {
      var e = p.getInternetExplorerMajorVersion.cached = "undefined" != typeof p.getInternetExplorerMajorVersion.cached ? p.getInternetExplorerMajorVersion.cached : function () {
        for (var e = 3, t = a.createElement("div"), r = t.getElementsByTagName("i"); (t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && r[0];);return e > 4 ? e : !1;
      }();return e;
    }, p.isInternetExplorer = function () {
      var e = p.isInternetExplorer.cached = "undefined" != typeof p.isInternetExplorer.cached ? p.isInternetExplorer.cached : Boolean(p.getInternetExplorerMajorVersion());return e;
    }, p.options.html4Mode ? p.emulated = { pushState: !0, hashChange: !0 } : p.emulated = { pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState && !(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(n.userAgent) || /AppleWebKit\/5([0-2]|3[0-2])/i.test(n.userAgent))), hashChange: Boolean(!("onhashchange" in e || "onhashchange" in a) || p.isInternetExplorer() && p.getInternetExplorerMajorVersion() < 8) }, p.enabled = !p.emulated.pushState, p.bugs = { setHash: Boolean(!p.emulated.pushState && "Apple Computer, Inc." === n.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)), safariPoll: Boolean(!p.emulated.pushState && "Apple Computer, Inc." === n.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)), ieDoubleCheck: Boolean(p.isInternetExplorer() && p.getInternetExplorerMajorVersion() < 8), hashEscape: Boolean(p.isInternetExplorer() && p.getInternetExplorerMajorVersion() < 7) }, p.isEmptyObject = function (e) {
      for (var t in e) if (e.hasOwnProperty(t)) return !1;return !0;
    }, p.cloneObject = function (e) {
      var t, r;return e ? (t = d.stringify(e), r = d.parse(t)) : r = {}, r;
    }, p.getRootUrl = function () {
      var e = a.location.protocol + "//" + (a.location.hostname || a.location.host);return a.location.port && (e += ":" + a.location.port), e += "/";
    }, p.getBaseHref = function () {
      var e = a.getElementsByTagName("base"),
          t = null,
          r = "";return 1 === e.length && (t = e[0], r = t.href.replace(/[^\/]+$/, "")), r = r.replace(/\/+$/, ""), r && (r += "/"), r;
    }, p.getBaseUrl = function () {
      var e = p.getBaseHref() || p.getBasePageUrl() || p.getRootUrl();return e;
    }, p.getPageUrl = function () {
      var e,
          t = p.getState(!1, !1),
          r = (t || {}).url || p.getLocationHref();return e = r.replace(/\/+$/, "").replace(/[^\/]+$/, function (e, t, r) {
        return (/\./.test(e) ? e : e + "/"
        );
      });
    }, p.getBasePageUrl = function () {
      var e = p.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function (e, t, r) {
        return (/[^\/]$/.test(e) ? "" : e
        );
      }).replace(/\/+$/, "") + "/";return e;
    }, p.getFullUrl = function (e, t) {
      var r = e,
          a = e.substring(0, 1);return t = "undefined" == typeof t ? !0 : t, /[a-z]+\:\/\//.test(e) || (r = "/" === a ? p.getRootUrl() + e.replace(/^\/+/, "") : "#" === a ? p.getPageUrl().replace(/#.*/, "") + e : "?" === a ? p.getPageUrl().replace(/[\?#].*/, "") + e : t ? p.getBaseUrl() + e.replace(/^(\.\/)+/, "") : p.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), r.replace(/\#$/, "");
    }, p.getShortUrl = function (e) {
      var t = e,
          r = p.getBaseUrl(),
          a = p.getRootUrl();return p.emulated.pushState && (t = t.replace(r, "")), t = t.replace(a, "/"), p.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, "");
    }, p.getLocationHref = function (e) {
      return e = e || a, e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : -1 == e.URL.indexOf("#") && -1 != e.location.href.indexOf("#") ? e.location.href : e.URL || e.location.href;
    }, p.store = {}, p.idToState = p.idToState || {}, p.stateToId = p.stateToId || {}, p.urlToId = p.urlToId || {}, p.storedStates = p.storedStates || [], p.savedStates = p.savedStates || [], p.normalizeStore = function () {
      p.store.idToState = p.store.idToState || {}, p.store.urlToId = p.store.urlToId || {}, p.store.stateToId = p.store.stateToId || {};
    }, p.getState = function (e, t) {
      "undefined" == typeof e && (e = !0), "undefined" == typeof t && (t = !0);var r = p.getLastSavedState();return !r && t && (r = p.createStateObject()), e && (r = p.cloneObject(r), r.url = r.cleanUrl || r.url), r;
    }, p.getIdByState = function (e) {
      var t,
          r = p.extractId(e.url);if (!r) if (t = p.getStateString(e), "undefined" != typeof p.stateToId[t]) r = p.stateToId[t];else if ("undefined" != typeof p.store.stateToId[t]) r = p.store.stateToId[t];else {
        for (;;) if (r = new Date().getTime() + String(Math.random()).replace(/\D/g, ""), "undefined" == typeof p.idToState[r] && "undefined" == typeof p.store.idToState[r]) break;p.stateToId[t] = r, p.idToState[r] = e;
      }return r;
    }, p.normalizeState = function (e) {
      var t, r;return e && "object" == typeof e || (e = {}), "undefined" != typeof e.normalized ? e : (e.data && "object" == typeof e.data || (e.data = {}), t = {}, t.normalized = !0, t.title = e.title || "", t.url = p.getFullUrl(e.url ? e.url : p.getLocationHref()), t.hash = p.getShortUrl(t.url), t.data = p.cloneObject(e.data), t.id = p.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, r = !p.isEmptyObject(t.data), (t.title || r) && p.options.disableSuid !== !0 && (t.hash = p.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = p.getFullUrl(t.hash), (p.emulated.pushState || p.bugs.safariPoll) && p.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t);
    }, p.createStateObject = function (e, t, r) {
      var a = { data: e, title: t, url: r };return a = p.normalizeState(a);
    }, p.getStateById = function (e) {
      e = String(e);var r = p.idToState[e] || p.store.idToState[e] || t;return r;
    }, p.getStateString = function (e) {
      var t, r, a;return t = p.normalizeState(e), r = { data: t.data, title: e.title, url: e.url }, a = d.stringify(r);
    }, p.getStateId = function (e) {
      var t, r;return t = p.normalizeState(e), r = t.id;
    }, p.getHashByState = function (e) {
      var t, r;return t = p.normalizeState(e), r = t.hash;
    }, p.extractId = function (e) {
      var t, r, a, n;return n = -1 != e.indexOf("#") ? e.split("#")[0] : e, r = /(.*)\&_suid=([0-9]+)$/.exec(n), a = r ? r[1] || e : e, t = r ? String(r[2] || "") : "", t || !1;
    }, p.isTraditionalAnchor = function (e) {
      var t = !/[\/\?\.]/.test(e);return t;
    }, p.extractState = function (e, t) {
      var r,
          a,
          n = null;return t = t || !1, r = p.extractId(e), r && (n = p.getStateById(r)), n || (a = p.getFullUrl(e), r = p.getIdByUrl(a) || !1, r && (n = p.getStateById(r)), n || !t || p.isTraditionalAnchor(e) || (n = p.createStateObject(null, null, a))), n;
    }, p.getIdByUrl = function (e) {
      var r = p.urlToId[e] || p.store.urlToId[e] || t;return r;
    }, p.getLastSavedState = function () {
      return p.savedStates[p.savedStates.length - 1] || t;
    }, p.getLastStoredState = function () {
      return p.storedStates[p.storedStates.length - 1] || t;
    }, p.hasUrlDuplicate = function (e) {
      var t,
          r = !1;return t = p.extractState(e.url), r = t && t.id !== e.id;
    }, p.storeState = function (e) {
      return p.urlToId[e.url] = e.id, p.storedStates.push(p.cloneObject(e)), e;
    }, p.isLastSavedState = function (e) {
      var t,
          r,
          a,
          n = !1;return p.savedStates.length && (t = e.id, r = p.getLastSavedState(), a = r.id, n = t === a), n;
    }, p.saveState = function (e) {
      return p.isLastSavedState(e) ? !1 : (p.savedStates.push(p.cloneObject(e)), !0);
    }, p.getStateByIndex = function (e) {
      var t = null;return t = "undefined" == typeof e ? p.savedStates[p.savedStates.length - 1] : 0 > e ? p.savedStates[p.savedStates.length + e] : p.savedStates[e];
    }, p.getCurrentIndex = function () {
      var e = null;return e = p.savedStates.length < 1 ? 0 : p.savedStates.length - 1;
    }, p.getHash = function (e) {
      var t,
          r = p.getLocationHref(e);return t = p.getHashByUrl(r);
    }, p.unescapeHash = function (e) {
      var t = p.normalizeHash(e);return t = decodeURIComponent(t);
    }, p.normalizeHash = function (e) {
      var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");return t;
    }, p.setHash = function (e, t) {
      var r, n;return t !== !1 && p.busy() ? (p.pushQueue({ scope: p, callback: p.setHash, args: arguments, queue: t }), !1) : (p.busy(!0), r = p.extractState(e, !0), r && !p.emulated.pushState ? p.pushState(r.data, r.title, r.url, !1) : p.getHash() !== e && (p.bugs.setHash ? (n = p.getPageUrl(), p.pushState(null, null, n + "#" + e, !1)) : a.location.hash = e), p);
    }, p.escapeHash = function (t) {
      var r = p.normalizeHash(t);return r = e.encodeURIComponent(r), p.bugs.hashEscape || (r = r.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), r;
    }, p.getHashByUrl = function (e) {
      var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");return t = p.unescapeHash(t);
    }, p.setTitle = function (e) {
      var t,
          r = e.title;r || (t = p.getStateByIndex(0), t && t.url === e.url && (r = t.title || p.options.initialTitle));try {
        a.getElementsByTagName("title")[0].innerHTML = r.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ");
      } catch (n) {}return a.title = r, p;
    }, p.queues = [], p.busy = function (e) {
      if ("undefined" != typeof e ? p.busy.flag = e : "undefined" == typeof p.busy.flag && (p.busy.flag = !1), !p.busy.flag) {
        s(p.busy.timeout);var t = function () {
          var e, r, a;if (!p.busy.flag) for (e = p.queues.length - 1; e >= 0; --e) r = p.queues[e], 0 !== r.length && (a = r.shift(), p.fireQueueItem(a), p.busy.timeout = i(t, p.options.busyDelay));
        };p.busy.timeout = i(t, p.options.busyDelay);
      }return p.busy.flag;
    }, p.busy.flag = !1, p.fireQueueItem = function (e) {
      return e.callback.apply(e.scope || p, e.args || []);
    }, p.pushQueue = function (e) {
      return p.queues[e.queue || 0] = p.queues[e.queue || 0] || [], p.queues[e.queue || 0].push(e), p;
    }, p.queue = function (e, t) {
      return "function" == typeof e && (e = { callback: e }), "undefined" != typeof t && (e.queue = t), p.busy() ? p.pushQueue(e) : p.fireQueueItem(e), p;
    }, p.clearQueue = function () {
      return p.busy.flag = !1, p.queues = [], p;
    }, p.stateChanged = !1, p.doubleChecker = !1, p.doubleCheckComplete = function () {
      return p.stateChanged = !0, p.doubleCheckClear(), p;
    }, p.doubleCheckClear = function () {
      return p.doubleChecker && (s(p.doubleChecker), p.doubleChecker = !1), p;
    }, p.doubleCheck = function (e) {
      return p.stateChanged = !1, p.doubleCheckClear(), p.bugs.ieDoubleCheck && (p.doubleChecker = i(function () {
        return p.doubleCheckClear(), p.stateChanged || e(), !0;
      }, p.options.doubleCheckInterval)), p;
    }, p.safariStatePoll = function () {
      var t,
          r = p.extractState(p.getLocationHref());if (!p.isLastSavedState(r)) return t = r, t || (t = p.createStateObject()), p.Adapter.trigger(e, "popstate"), p;
    }, p.back = function (e) {
      return e !== !1 && p.busy() ? (p.pushQueue({ scope: p, callback: p.back, args: arguments, queue: e }), !1) : (p.busy(!0), p.doubleCheck(function () {
        p.back(!1);
      }), f.go(-1), !0);
    }, p.forward = function (e) {
      return e !== !1 && p.busy() ? (p.pushQueue({ scope: p, callback: p.forward, args: arguments, queue: e }), !1) : (p.busy(!0), p.doubleCheck(function () {
        p.forward(!1);
      }), f.go(1), !0);
    }, p.go = function (e, t) {
      var r;if (e > 0) for (r = 1; e >= r; ++r) p.forward(t);else {
        if (!(0 > e)) throw new Error("History.go: History.go requires a positive or negative integer passed.");for (r = -1; r >= e; --r) p.back(t);
      }return p;
    }, p.emulated.pushState) {
      var h = function () {};p.pushState = p.pushState || h, p.replaceState = p.replaceState || h;
    } else p.onPopState = function (t, r) {
      var a,
          n,
          o = !1,
          i = !1;return p.doubleCheckComplete(), (a = p.getHash()) ? (n = p.extractState(a || p.getLocationHref(), !0), n ? p.replaceState(n.data, n.title, n.url, !1) : (p.Adapter.trigger(e, "anchorchange"), p.busy(!1)), p.expectedStateId = !1, !1) : (o = p.Adapter.extractEventData("state", t, r) || !1, i = o ? p.getStateById(o) : p.expectedStateId ? p.getStateById(p.expectedStateId) : p.extractState(p.getLocationHref()), i || (i = p.createStateObject(null, null, p.getLocationHref())), p.expectedStateId = !1, p.isLastSavedState(i) ? (p.busy(!1), !1) : (p.storeState(i), p.saveState(i), p.setTitle(i), p.Adapter.trigger(e, "statechange"), p.busy(!1), !0));
    }, p.Adapter.bind(e, "popstate", p.onPopState), p.pushState = function (t, r, a, n) {
      if (p.getHashByUrl(a) && p.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if (n !== !1 && p.busy()) return p.pushQueue({ scope: p, callback: p.pushState, args: arguments, queue: n }), !1;p.busy(!0);var o = p.createStateObject(t, r, a);return p.isLastSavedState(o) ? p.busy(!1) : (p.storeState(o), p.expectedStateId = o.id, f.pushState(o.id, o.title, o.url), p.Adapter.trigger(e, "popstate")), !0;
    }, p.replaceState = function (t, r, a, n) {
      if (p.getHashByUrl(a) && p.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if (n !== !1 && p.busy()) return p.pushQueue({ scope: p, callback: p.replaceState, args: arguments, queue: n }), !1;p.busy(!0);var o = p.createStateObject(t, r, a);return p.isLastSavedState(o) ? p.busy(!1) : (p.storeState(o), p.expectedStateId = o.id, f.replaceState(o.id, o.title, o.url), p.Adapter.trigger(e, "popstate")), !0;
    };if (o) {
      try {
        p.store = d.parse(o.getItem("History.store")) || {};
      } catch (S) {
        p.store = {};
      }p.normalizeStore();
    } else p.store = {}, p.normalizeStore();p.Adapter.bind(e, "unload", p.clearAllIntervals), p.saveState(p.storeState(p.extractState(p.getLocationHref(), !0))), o && (p.onUnload = function () {
      var e, t, r;try {
        e = d.parse(o.getItem("History.store")) || {};
      } catch (a) {
        e = {};
      }e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {};for (t in p.idToState) p.idToState.hasOwnProperty(t) && (e.idToState[t] = p.idToState[t]);for (t in p.urlToId) p.urlToId.hasOwnProperty(t) && (e.urlToId[t] = p.urlToId[t]);for (t in p.stateToId) p.stateToId.hasOwnProperty(t) && (e.stateToId[t] = p.stateToId[t]);p.store = e, p.normalizeStore(), r = d.stringify(e);try {
        o.setItem("History.store", r);
      } catch (n) {
        if (n.code !== DOMException.QUOTA_EXCEEDED_ERR) throw n;o.length && (o.removeItem("History.store"), o.setItem("History.store", r));
      }
    }, p.intervalList.push(u(p.onUnload, p.options.storeInterval)), p.Adapter.bind(e, "beforeunload", p.onUnload), p.Adapter.bind(e, "unload", p.onUnload)), p.emulated.pushState || (p.bugs.safariPoll && p.intervalList.push(u(p.safariStatePoll, p.options.safariPollInterval)), ("Apple Computer, Inc." === n.vendor || "Mozilla" === (n.appCodeName || "")) && (p.Adapter.bind(e, "hashchange", function () {
      p.Adapter.trigger(e, "popstate");
    }), p.getHash() && p.Adapter.onDomLoad(function () {
      p.Adapter.trigger(e, "hashchange");
    })));
  }, p.options && p.options.delayInit || p.init();
}(window);

//# sourceMappingURL=base-compiled.js.map