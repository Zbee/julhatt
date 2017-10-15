/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */

!function (a) {
  "use strict";
  a.matchMedia = a.matchMedia || function (a) {
    var b, c = a.documentElement, d = c.firstElementChild || c.firstChild,
      e = a.createElement("body"), f = a.createElement("div");
    return f.id = "mq-test-1", f.style.cssText = "position:absolute;top:-100em", e.style.background = "none", e.appendChild(
      f), function (a) {
      return f.innerHTML = '&shy;<style media="'
                           + a
                           + '"> #mq-test-1 { width: 42px; }</style>', c.insertBefore(
        e,
        d
      ), b = 42===f.offsetWidth, c.removeChild(e), {matches: b, media: a}
    }
  }(a.document)
}(this), function (a) {
  "use strict";

  function b() {v(!0)}

  var c = {};
  a.respond = c, c.update = function () {};
  var d = [], e = function () {
    var b = !1;
    try {
      b = new a.XMLHttpRequest
    } catch (c) {
      b = new a.ActiveXObject("Microsoft.XMLHTTP")
    }
    return function () {return b}
  }(), f = function (a, b) {
    var c = e();
    c && (
      c.open("GET", a, !0), c.onreadystatechange = function () {
        4
        !==c.readyState
        || 200
           !==c.status
           && 304
              !==c.status
        || b(c.responseText)
      }, 4!==c.readyState && c.send(null)
    )
  }, g = function (a) {
    return a.replace(c.regex.minmaxwh, "")
            .match(c.regex.other)
  };
  if (c.ajax = f, c.queue = d, c.unsupportedmq = g, c.regex = {
      media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
      keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
      comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
      urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
      findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
      only: /(only\s+)?([a-zA-Z]+)\s?/,
      minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
      maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
      minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
      other: /\([^\)]*\)/g
    }, c.mediaQueriesSupported = a.matchMedia
                                 && null
                                 !==a.matchMedia("only all")
                                 && a.matchMedia("only all").matches, !c.mediaQueriesSupported) {
    var h, i, j, k = a.document, l = k.documentElement, m = [], n = [], o = [],
      p = {}, q = 30, r = k.getElementsByTagName("head")[0] || l,
      s = k.getElementsByTagName("base")[0], t = r.getElementsByTagName("link"),
      u = function () {
        var a, b = k.createElement("div"), c = k.body, d = l.style.fontSize,
          e = c && c.style.fontSize, f = !1;
        return b.style.cssText = "position:absolute;font-size:1em;width:1em", c
                                                                              || (
                                                                                c = f = k.createElement(
                                                                                  "body"), c.style.background = "none"
                                                                              ), l.style.fontSize = "100%", c.style.fontSize = "100%", c.appendChild(
          b), f && l.insertBefore(c, l.firstChild), a = b.offsetWidth, f
          ? l.removeChild(c)
          : c.removeChild(b), l.style.fontSize = d, e && (
          c.style.fontSize = e
        ), a = j = parseFloat(a)
      }, v = function (b) {
        var c = "clientWidth", d = l[c],
          e = "CSS1Compat"===k.compatMode && d || k.body[c] || d, f = {},
          g = t[t.length - 1], p = (
            new Date
          ).getTime();
        if (b && h && q > p - h) {
          return a.clearTimeout(i), i = a.setTimeout(
            v,
            q
          ), void 0;
        }
        h = p;
        for (var s in m) {
          if (m.hasOwnProperty(s)) {
            var w = m[s], x = w.minw, y = w.maxw, z = null===x, A = null===y,
              B = "em";
            x && (
              x = parseFloat(x) * (
                x.indexOf(B) > -1 ? j || u() : 1
              )
            ), y && (
              y = parseFloat(y) * (
                y.indexOf(B) > -1 ? j || u() : 1
              )
            ), w.hasquery && (
              z && A || !(
              z || e >= x
              ) || !(
              A || y >= e
              )
            ) || (
               f[w.media] || (
                 f[w.media] = []
               ), f[w.media].push(n[w.rules])
               )
          }
        }
        for (var C in o) {
          o.hasOwnProperty(C)
          && o[C]
          && o[C].parentNode
             ===r
          && r.removeChild(o[C]);
        }
        o.length = 0;
        for (var D in f) {
          if (f.hasOwnProperty(D)) {
            var E = k.createElement("style"), F = f[D].join("\n");
            E.type = "text/css", E.media = D, r.insertBefore(
              E,
              g.nextSibling
            ), E.styleSheet
              ? E.styleSheet.cssText = F
              : E.appendChild(k.createTextNode(F)), o.push(E)
          }
        }
      }, w = function (a, b, d) {
        var e = a.replace(c.regex.comments, "")
                 .replace(c.regex.keyframes, "")
                 .match(c.regex.media), f = e && e.length || 0;
        b = b.substring(0, b.lastIndexOf("/"));
        var h = function (a) {return a.replace(c.regex.urls, "$1" + b + "$2$3")},
          i = !f && d;
        b.length && (
          b += "/"
        ), i && (
          f = 1
        );
        for (var j = 0; f > j; j++) {
          var k, l, o, p;
          i ? (
            k = d, n.push(h(a))
          ) : (
            k = e[j].match(c.regex.findStyles) && RegExp.$1, n.push(RegExp.$2
                                                                    && h(RegExp.$2))
          ), o = k.split(","), p = o.length;
          for (var q = 0; p > q; q++) {
            l = o[q], g(l)
                      || m.push({
                                  media: l.split("(")[0].match(
                                    c.regex.only)
                                         && RegExp.$2
                                         || "all",
                                  rules: n.length - 1,
                                  hasquery: l.indexOf(
                                    "(") > -1,
                                  minw: l.match(c.regex.minw)
                                        && parseFloat(
                                    RegExp.$1)
                                           + (
                                             RegExp.$2
                                             || ""
                                           ),
                                  maxw: l.match(c.regex.maxw)
                                        && parseFloat(
                                    RegExp.$1)
                                           + (
                                             RegExp.$2
                                             || ""
                                           )
                                })
          }
        }
        v()
      }, x = function () {
        if (d.length) {
          var b = d.shift();
          f(
            b.href,
            function (c) {
              w(c, b.href, b.media), p[b.href] = !0, a.setTimeout(
                function () {x()},
                0
              )
            }
          )
        }
      }, y = function () {
        for (var b = 0; b < t.length; b++) {
          var c = t[b], e = c.href, f = c.media,
            g = c.rel && "stylesheet"===c.rel.toLowerCase();
          e && g && !p[e] && (
          c.styleSheet && c.styleSheet.rawCssText ? (
            w(c.styleSheet.rawCssText, e, f), p[e] = !0
          ) : (
            !/^([a-zA-Z:]*\/\/)/.test(e)
            && !s
            || e.replace(RegExp.$1, "")
                .split("/")[0]
               ===a.location.host
          ) && (
          "//"===e.substring(0, 2) && (
            e = a.location.protocol + e
          ), d.push({href: e, media: f})
          )
          )
        }
        x()
      };
    y(), c.update = y, c.getEmValue = u, a.addEventListener
      ? a.addEventListener("resize", b, !1)
      : a.attachEvent
        && a.attachEvent("onresize", b)
  }
}(this);

/*!
 * Retina.js v1.3.0
 *
 * Copyright 2014 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
!function () {
  function a() {}

  function b(a) {return f.retinaImageSuffix + a}

  function c(a, c) {
    if (this.path = a || "", "undefined"
                             != typeof c
                             && null
                                !==c) {
      this.at_2x_path = c, this.perform_check = !1;
    } else {
      if (void 0!==document.createElement) {
        var d = document.createElement("a");
        d.href = this.path, d.pathname = d.pathname.replace(
          g,
          b
        ), this.at_2x_path = d.href
      } else {
        var e = this.path.split("?");
        e[0] = e[0].replace(g, b), this.at_2x_path = e.join("?")
      }
      this.perform_check = !0
    }
  }

  function d(a) {
    this.el = a, this.path = new c(
      this.el.getAttribute("src"),
      this.el.getAttribute("data-at2x")
    );
    var b = this;
    this.path.check_2x_variant(function (a) {a && b.swap()})
  }

  var e = "undefined"== typeof exports ? window : exports, f = {
    retinaImageSuffix: "@2x",
    check_mime_type: !0,
    force_original_dimensions: !0
  };
  e.Retina = a, a.configure = function (a) {
    null===a && (
      a = {}
    );
    for (var b in a) {
      a.hasOwnProperty(b) && (
        f[b] = a[b]
      )
    }
  }, a.init = function (a) {
    null===a && (
      a = e
    );
    var b = a.onload || function () {};
    a.onload = function () {
      var a, c, e = document.getElementsByTagName("img"), f = [];
      for (a = 0; a < e.length; a += 1) {
        c = e[a], c.getAttributeNode(
          "data-no-retina") || f.push(new d(c));
      }
      b()
    }
  }, a.isRetina = function () {
    var a = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
    return e.devicePixelRatio
           > 1
      ? !0
      : e.matchMedia
        && e.matchMedia(a).matches
             ? !0
             : !1
  };
  var g = /\.\w+$/;
  e.RetinaImagePath = c, c.confirmed_paths = [], c.prototype.is_external = function () {
    return !(
      !this.path.match(/^https?\:/i) || this.path.match("//" + document.domain)
    )
  }, c.prototype.check_2x_variant = function (a) {
    var b, d = this;
    return this.is_external()
      ? a(!1)
      : this.perform_check
        || "undefined"
           == typeof this.at_2x_path
        || null
           ===this.at_2x_path
             ? this.at_2x_path
               in c.confirmed_paths
          ? a(!0)
          : (
                 b = new XMLHttpRequest, b.open(
                   "HEAD",
                   this.at_2x_path
                 ), b.onreadystatechange = function () {
                   if (4
                       !==b.readyState) {
                     return a(!1);
                   }
                   if (b.status >= 200 && b.status <= 399) {
                     if (f.check_mime_type) {
                       var e = b.getResponseHeader("Content-Type");
                       if (null===e || !e.match(/^image/i)) return a(!1)
                     }
                     return c.confirmed_paths.push(d.at_2x_path), a(!0)
                   }
                   return a(!1)
                 }, b.send(), void 0
               )
             : a(!0)
  }, e.RetinaImage = d, d.prototype.swap = function (a) {
    function b() {
      c.el.complete
        ? (
        f.force_original_dimensions
        && (
          c.el.setAttribute(
            "width",
            c.el.offsetWidth
          ), c.el.setAttribute(
            "height",
            c.el.offsetHeight
          )
        ), c.el.setAttribute(
          "src",
          a
        )
      )
        : setTimeout(b, 5)
    }

    "undefined"== typeof a && (
      a = this.path.at_2x_path
    );
    var c = this;
    b()
  }, a.isRetina() && a.init(e)
}();

/*! skrollr 0.6.26 (2014-06-08) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(
  function (e, t, r) {
    "use strict";

    function n(r) {
      if (o = t.documentElement, a = t.body, K(), it = this, r = r
                                                                 || {}, ut = r.constants
                                                                             || {}, r.easing) {
        for (var n in
          r.easing) {
          U[n] = r.easing[n];
        }
      }
      yt = r.edgeStrategy || "set", ct = {
        beforerender: r.beforerender,
        render: r.render,
        keyframe: r.keyframe
      }, ft = r.forceHeight!== !1, ft && (
        Vt = r.scale || 1
      ), mt = r.mobileDeceleration || x, dt = r.smoothScrolling
                                              !== !1, gt = r.smoothScrollingDuration
                                                           || E, vt = {targetTop: it.getScrollTop()}, Gt = (
        r.mobileCheck
        || function () {
          return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent
                                                             || navigator.vendor
                                                             || e.opera)
        }
      )(), Gt ? (
        st = t.getElementById("skrollr-body"), st && at(), X(), Dt(
          o,
          [y, S],
          [T]
        )
      ) : Dt(o, [y, b], [T]), it.refresh(), St(
        e,
        "resize orientationchange",
        function () {
          var e = o.clientWidth, t = o.clientHeight;
          (
            t!==$t || e!==Mt
          ) && (
            $t = t, Mt = e, _t = !0
          )
        }
      );
      var i = Y();
      return function l() {Z(), bt = i(l)}(), it
    }

    var o, a, i = {
        get: function () {return it},
        init: function (e) {return it || new n(e)},
        VERSION: "0.6.26"
      }, l = Object.prototype.hasOwnProperty, s = e.Math, c = e.getComputedStyle,
      f = "touchstart", u = "touchmove", m = "touchcancel", p = "touchend",
      d = "skrollable", g = d + "-before", v = d + "-between", h = d + "-after",
      y = "skrollr", T = "no-" + y, b = y + "-desktop", S = y + "-mobile",
      k = "linear", w = 1e3, x = .004, E = 200, A = "start", F = "end",
      C = "center", D = "bottom", H = "___skrollable_id",
      I = /^(?:input|textarea|button|select)$/i, P = /^\s+|\s+$/g,
      N = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
      O = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
      V = /^(@?[a-z\-]+)\[(\w+)\]$/, z = /-([a-z0-9_])/g,
      q = function (e, t) {return t.toUpperCase()}, L = /[\-+]?[\d]*\.?[\d]+/g,
      M = /\{\?\}/g, $ = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
      _ = /[a-z\-]+-gradient/g, B = "", G = "", K = function () {
        var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
        if (c) {
          var t = c(a, null);
          for (var n in t) if (B = n.match(e) || +n==n && t[n].match(e)) break;
          if (!B) return B = G = "", r;
          B = B[0], "-"===B.slice(0, 1) ? (
            G = B, B = {
              "-webkit-": "webkit",
              "-moz-": "Moz",
              "-ms-": "ms",
              "-o-": "O"
            }[B]
          ) : G = "-" + B.toLowerCase() + "-"
        }
      }, Y = function () {
        var t = e.requestAnimationFrame || e[B.toLowerCase()
                                             + "RequestAnimationFrame"], r = Pt();
        return (
                 Gt || !t
               ) && (
                 t = function (t) {
                   var n = Pt() - r, o = s.max(0, 1e3 / 60 - n);
                   return e.setTimeout(function () {r = Pt(), t()}, o)
                 }
               ), t
      }, R = function () {
        var t = e.cancelAnimationFrame || e[B.toLowerCase()
                                            + "CancelAnimationFrame"];
        return (
                 Gt || !t
               ) && (
                 t = function (t) {return e.clearTimeout(t)}
               ), t
      }, U = {
        begin: function () {return 0},
        end: function () {return 1},
        linear: function (e) {return e},
        quadratic: function (e) {return e * e},
        cubic: function (e) {return e * e * e},
        swing: function (e) {return -s.cos(e * s.PI) / 2 + .5},
        sqrt: function (e) {return s.sqrt(e)},
        outCubic: function (e) {return s.pow(e - 1, 3) + 1},
        bounce: function (e) {
          var t;
          if (.5083 >= e) {
            t = 3;
          } else {
            if (.8489 >= e) {
              t = 9;
            } else {
              if (.96208 >= e) {
                t = 27;
              } else {
                if (!(
                    .99981 >= e
                  )) {
                  return 1;
                }
                t = 91
              }
            }
          }
          return 1 - s.abs(3 * s.cos(1.028 * e * t) / t)
        }
      };
    n.prototype.refresh = function (e) {
      var n, o, a = !1;
      for (
        e===r ? (
          a = !0, lt = [], Bt = 0, e = t.getElementsByTagName("*")
        ) : e.length===r && (
          e = [e]
        ), n = 0, o = e.length; o > n; n++
      ) {
        var i = e[n], l = i, s = [], c = dt, f = yt, u = !1;
        if (a && H in i && delete i[H], i.attributes) {
          for (var m = 0, p = i.attributes.length; p > m; m++) {
            var g = i.attributes[m];
            if ("data-anchor-target"!==g.name) {
              if ("data-smooth-scrolling"
                  !==g.name) {
                if ("data-edge-strategy"
                    !==g.name) {
                  if ("data-emit-events"
                      !==g.name) {
                    var v = g.name.match(N);
                    if (null!==v) {
                      var h = {
                        props: g.value,
                        element: i,
                        eventType: g.name.replace(z, q)
                      };
                      s.push(h);
                      var y = v[1];
                      y && (
                        h.constant = y.substr(1)
                      );
                      var T = v[2];
                      /p$/.test(T) ? (
                        h.isPercentage = !0, h.offset = (
                                                          0 | T.slice(0, -1)
                                                        ) / 100
                      ) : h.offset = 0 | T;
                      var b = v[3], S = v[4] || b;
                      b && b!==A && b!==F ? (
                        h.mode = "relative", h.anchors = [b, S]
                      ) : (
                        h.mode = "absolute", b
                                             ===F
                          ? h.isEnd = !0
                          : h.isPercentage
                            || (
                              h.offset = h.offset * Vt
                            )
                      )
                    }
                  } else {
                    u = !0;
                  }
                } else {
                  f = g.value;
                }
              } else {
                c = "off"!==g.value;
              }
            } else {
              if (l = t.querySelector(g.value), null
                                                ===l) {
                throw'Unable to find anchor target "'
                     + g.value
                     + '"'
              }
            }
          }
          if (s.length) {
            var k, w, x;
            !a && H in i ? (
              x = i[H], k = lt[x].styleAttr, w = lt[x].classAttr
            ) : (
              x = i[H] = Bt++, k = i.style.cssText, w = Ct(i)
            ), lt[x] = {
              element: i,
              styleAttr: k,
              classAttr: w,
              anchorTarget: l,
              keyFrames: s,
              smoothScrolling: c,
              edgeStrategy: f,
              emitEvents: u,
              lastFrameIndex: -1
            }, Dt(i, [d], [])
          }
        }
      }
      for (Et(), n = 0, o = e.length; o > n; n++) {
        var E = lt[e[n][H]];
        E!==r && (
          J(E), et(E)
        )
      }
      return it
    }, n.prototype.relativeToAbsolute = function (e,
                                                  t,
                                                  r) {
      var n = o.clientHeight, a = e.getBoundingClientRect(), i = a.top,
        l = a.bottom - a.top;
      return t===D ? i -= n : t===C && (
        i -= n / 2
      ), r===D ? i += l : r===C && (
        i += l / 2
      ), i += it.getScrollTop(), 0 | i + .5
    }, n.prototype.animateTo = function (e, t) {
      t = t || {};
      var n = Pt(), o = it.getScrollTop();
      return pt = {
        startTop: o,
        topDiff: e - o,
        targetTop: e,
        duration: t.duration || w,
        startTime: n,
        endTime: n + (
          t.duration || w
        ),
        easing: U[t.easing || k],
        done: t.done
      }, pt.topDiff || (
        pt.done && pt.done.call(it, !1), pt = r
      ), it
    }, n.prototype.stopAnimateTo = function () {
      pt
      && pt.done
      && pt.done.call(it, !0), pt = r
    }, n.prototype.isAnimatingTo = function () {return !!pt}, n.prototype.isMobile = function () {return Gt}, n.prototype.setScrollTop = function (t,
                                                                                                                                                   r) {
      return ht = r
                  === !0, Gt
        ? Kt = s.min(s.max(t, 0), Ot)
        : e.scrollTo(0, t), it
    }, n.prototype.getScrollTop = function () {
      return Gt
        ? Kt
        : e.pageYOffset
          || o.scrollTop
          || a.scrollTop
          || 0
    }, n.prototype.getMaxScrollTop = function () {return Ot}, n.prototype.on = function (e,
                                                                                         t) {return ct[e] = t, it}, n.prototype.off = function (e) {return delete ct[e], it}, n.prototype.destroy = function () {
      var e = R();
      e(bt), wt(), Dt(o, [T], [y, b, S]);
      for (var t = 0, n = lt.length; n > t; t++) ot(lt[t].element);
      o.style.overflow = a.style.overflow = "", o.style.height = a.style.height = "", st
                                                                                      && i.setStyle(
        st,
        "transform",
        "none"
      ), it = r, st = r, ct = r, ft = r, Ot = 0, Vt = 1, ut = r, mt = r, zt = "down", qt = -1, Mt = 0, $t = 0, _t = !1, pt = r, dt = r, gt = r, vt = r, ht = r, Bt = 0, yt = r, Gt = !1, Kt = 0, Tt = r
    };
    var X = function () {
      var n, i, l, c, d, g, v, h, y, T, b, S;
      St(o, [f, u, m, p].join(" "), function (e) {
        var o = e.changedTouches[0];
        for (c = e.target; 3===c.nodeType;) c = c.parentNode;
        switch (d = o.clientY, g = o.clientX, T = e.timeStamp, I.test(c.tagName)
                                                               || e.preventDefault(), e.type) {
          case f:
            n && n.blur(), it.stopAnimateTo(), n = c, i = v = d, l = g, y = T;
            break;
          case u:
            I.test(c.tagName)
            && t.activeElement
               !==c
            && e.preventDefault(), h = d - v, S = T - b, it.setScrollTop(
              Kt - h, !0), v = d, b = T;
            break;
          default:
          case m:
          case p:
            var a = i - d, k = l - g, w = k * k + a * a;
            if (49 > w) {
              if (!I.test(n.tagName)) {
                n.focus();
                var x = t.createEvent("MouseEvents");
                x.initMouseEvent(
                  "click",
                  !0,
                  !0,
                  e.view,
                  1,
                  o.screenX,
                  o.screenY,
                  o.clientX,
                  o.clientY,
                  e.ctrlKey,
                  e.altKey,
                  e.shiftKey,
                  e.metaKey,
                  0,
                  null
                ), n.dispatchEvent(x)
              }
              return
            }
            n = r;
            var E = h / S;
            E = s.max(s.min(E, 3), -3);
            var A = s.abs(E / mt), F = E * A + .5 * mt * A * A,
              C = it.getScrollTop() - F, D = 0;
            C > Ot ? (
              D = (
                    Ot - C
                  ) / F, C = Ot
            ) : 0 > C && (
              D = -C / F, C = 0
            ), A *= 1 - D, it.animateTo(0 | C + .5, {
                                                      easing: "outCubic",
                                                      duration: A
                                                    })
        }
      }), e.scrollTo(0, 0), o.style.overflow = a.style.overflow = "hidden"
    }, j = function () {
      var e, t, r, n, a, i, l, c, f, u, m, p = o.clientHeight, d = At();
      for (
        c = 0, f = lt.length;
        f
        > c;
        c++
      ) {
        for (
          e = lt[c], t = e.element, r = e.anchorTarget, n = e.keyFrames, a = 0, i = n.length;
          i
          > a;
          a++
        ) {
          l = n[a], u = l.offset, m = d[l.constant]
                                      || 0, l.frame = u, l.isPercentage && (
            u *= p, l.frame = u
          ), "relative"===l.mode && (
            ot(t), l.frame = it.relativeToAbsolute(
              r,
              l.anchors[0],
              l.anchors[1]
                             )
                             - u, ot(t, !0)
          ), l.frame += m, ft && !l.isEnd && l.frame > Ot && (
            Ot = l.frame
          );
        }
      }
      for (Ot = s.max(Ot, Ft()), c = 0, f = lt.length; f > c; c++) {
        for (
          e = lt[c], n = e.keyFrames, a = 0, i = n.length;
          i
          > a;
          a++
        ) {
          l = n[a], m = d[l.constant] || 0, l.isEnd && (
            l.frame = Ot - l.offset + m
          );
        }
        e.keyFrames.sort(Nt)
      }
    }, W = function (e, t) {
      for (var r = 0, n = lt.length; n > r; r++) {
        var o, a, s = lt[r], c = s.element, f = s.smoothScrolling ? e : t,
          u = s.keyFrames, m = u.length, p = u[0], y = u[u.length - 1],
          T = p.frame > f, b = f > y.frame, S = T ? p : y, k = s.emitEvents,
          w = s.lastFrameIndex;
        if (T || b) {
          if (T && -1===s.edge || b && 1===s.edge) continue;
          switch (T ? (
            Dt(c, [g], [h, v]), k && w > -1 && (
              xt(c, p.eventType, zt), s.lastFrameIndex = -1
            )
          ) : (
                    Dt(c, [h], [g, v]), k && m > w && (
                      xt(c, y.eventType, zt), s.lastFrameIndex = m
                    )
                  ), s.edge = T ? -1 : 1, s.edgeStrategy) {
            case"reset":
              ot(c);
              continue;
            case"ease":
              f = S.frame;
              break;
            default:
            case"set":
              var x = S.props;
              for (o in x) {
                l.call(x, o) && (
                  a = nt(x[o].value), 0
                                      ===o.indexOf("@")
                    ? c.setAttribute(o.substr(1), a)
                    : i.setStyle(c, o, a)
                );
              }
              continue
          }
        } else {
          0!==s.edge && (
            Dt(c, [d, v], [g, h]), s.edge = 0
          );
        }
        for (var E = 0; m - 1 > E; E++) {
          if (f
              >= u[E].frame
              && u[E + 1].frame
                 >= f) {
            var A = u[E], F = u[E + 1];
            for (o in A.props) {
              if (l.call(A.props, o)) {
                var C = (
                          f - A.frame
                        ) / (
                          F.frame - A.frame
                        );
                C = A.props[o].easing(C), a = rt(
                  A.props[o].value,
                  F.props[o].value,
                  C
                ), a = nt(a), 0
                              ===o.indexOf("@")
                  ? c.setAttribute(o.substr(1), a)
                  : i.setStyle(c, o, a)
              }
            }
            k && w!==E && (
              "down"===zt ? xt(c, A.eventType, zt) : xt(
                c,
                F.eventType,
                zt
              ), s.lastFrameIndex = E
            );
            break
          }
        }
      }
    }, Z = function () {
      _t && (
        _t = !1, Et()
      );
      var e, t, n = it.getScrollTop(), o = Pt();
      if (pt) {
        o >= pt.endTime ? (
          n = pt.targetTop, e = pt.done, pt = r
        ) : (
          t = pt.easing((
                          o - pt.startTime
                        ) / pt.duration), n = 0
                                              | pt.startTop
                                              + t
                                              * pt.topDiff
        ), it.setScrollTop(n, !0);
      } else {
        if (!ht) {
          var a = vt.targetTop - n;
          a && (
            vt = {
              startTop: qt,
              topDiff: n - qt,
              targetTop: n,
              startTime: Lt,
              endTime: Lt + gt
            }
          ), vt.endTime >= o && (
            t = U.sqrt((
                         o - vt.startTime
                       ) / gt), n = 0 | vt.startTop + t * vt.topDiff
          )
        }
      }
      if (Gt && st && i.setStyle(st, "transform", "translate(0, "
                                                  + -Kt
                                                  + "px) "
                                                  + Tt), ht || qt!==n) {
        zt = n > qt ? "down" : qt > n ? "up" : zt, ht = !1;
        var l = {curTop: n, lastTop: qt, maxTop: Ot, direction: zt},
          s = ct.beforerender && ct.beforerender.call(it, l);
        s!== !1 && (
          W(n, it.getScrollTop()), qt = n, ct.render && ct.render.call(it, l)
        ), e && e.call(it, !1)
      }
      Lt = o
    }, J = function (e) {
      for (var t = 0, r = e.keyFrames.length; r > t; t++) {
        for (
          var n, o, a, i, l = e.keyFrames[t], s = {};
          null
          !==(
            i = O.exec(l.props)
          );
        ) {
          a = i[1], o = i[2], n = a.match(V), null!==n ? (
            a = n[1], n = n[2]
          ) : n = k, o = o.indexOf("!") ? Q(o) : [o.slice(1)], s[a] = {
            value: o,
            easing: U[n]
          };
        }
        l.props = s
      }
    }, Q = function (e) {
      var t = [];
      return $.lastIndex = 0, e = e.replace(
        $,
        function (e) {
          return e.replace(
            L,
            function (e) {
              return 100 * (
                e / 255
              ) + "%"
            }
          )
        }
      ), G && (
        _.lastIndex = 0, e = e.replace(_, function (e) {return G + e})
      ), e = e.replace(
        L,
        function (e) {return t.push(+e), "{?}"}
      ), t.unshift(e), t
    }, et = function (e) {
      var t, r, n = {};
      for (t = 0, r = e.keyFrames.length; r > t; t++) tt(e.keyFrames[t], n);
      for (n = {}, t = e.keyFrames.length - 1; t >= 0; t--) {
        tt(
          e.keyFrames[t],
          n
        )
      }
    }, tt = function (e, t) {
      var r;
      for (r in t) {
        l.call(e.props, r) || (
          e.props[r] = t[r]
        );
      }
      for (r in e.props) t[r] = e.props[r]
    }, rt = function (e, t, r) {
      var n, o = e.length;
      if (o!==t.length) {
        throw"Can't interpolate between \""
             + e[0]
             + '" and "'
             + t[0]
             + '"';
      }
      var a = [e[0]];
      for (n = 1; o > n; n++) {
        a[n] = e[n] + (
          t[n] - e[n]
        ) * r;
      }
      return a
    }, nt = function (e) {
      var t = 1;
      return M.lastIndex = 0, e[0].replace(M, function () {return e[t++]})
    }, ot = function (e, t) {
      e = [].concat(e);
      for (var r, n, o = 0, a = e.length; a > o; o++) {
        n = e[o], r = lt[n[H]], r
                                && (
                                  t
                                    ? (
                                    n.style.cssText = r.dirtyStyleAttr, Dt(
                                      n,
                                      r.dirtyClassAttr
                                    )
                                  )
                                    : (
                                    r.dirtyStyleAttr = n.style.cssText, r.dirtyClassAttr = Ct(
                                      n), n.style.cssText = r.styleAttr, Dt(
                                      n,
                                      r.classAttr
                                    )
                                  )
                                )
      }
    }, at = function () {
      Tt = "translateZ(0)", i.setStyle(st, "transform", Tt);
      var e = c(st), t = e.getPropertyValue("transform"),
        r = e.getPropertyValue(G + "transform"),
        n = t && "none"!==t || r && "none"!==r;
      n || (
        Tt = ""
      )
    };
    i.setStyle = function (e, t, r) {
      var n = e.style;
      if (t = t.replace(z, q).replace("-", ""), "zIndex"===t) {
        n[t] = isNaN(r)
          ? r
          : ""
            + (
              0 | r
            );
      } else {
        if ("float"===t) {
          n.styleFloat = n.cssFloat = r;
        } else {
          try {
            B && (
              n[B + t.slice(0, 1).toUpperCase() + t.slice(1)] = r
            ), n[t] = r
          } catch (o) {
          }
        }
      }
    };
    var it, lt, st, ct, ft, ut, mt, pt, dt, gt, vt, ht, yt, Tt, bt,
      St = i.addEvent = function (t, r, n) {
        var o = function (t) {
          return t = t
                     || e.event, t.target || (
            t.target = t.srcElement
          ), t.preventDefault || (
            t.preventDefault = function () {t.returnValue = !1, t.defaultPrevented = !0}
          ), n.call(this, t)
        };
        r = r.split(" ");
        for (
          var a, i = 0, l = r.length;
          l
          > i;
          i++
        ) {
          a = r[i], t.addEventListener
            ? t.addEventListener(a, n, !1)
            : t.attachEvent("on" + a, o), Yt.push({
                                                    element: t,
                                                    name: a,
                                                    listener: n
                                                  })
        }
      }, kt = i.removeEvent = function (e, t, r) {
        t = t.split(" ");
        for (var n = 0, o = t.length; o > n; n++) {
          e.removeEventListener
            ? e.removeEventListener(t[n], r, !1)
            : e.detachEvent("on" + t[n], r)
        }
      }, wt = function () {
        for (
          var e, t = 0, r = Yt.length;
          r
          > t;
          t++
        ) {
          e = Yt[t], kt(e.element, e.name, e.listener);
        }
        Yt = []
      }, xt = function (e, t, r) {ct.keyframe && ct.keyframe.call(it, e, t, r)},
      Et = function () {
        var e = it.getScrollTop();
        Ot = 0, ft && !Gt && (
          a.style.height = ""
        ), j(), ft && !Gt && (
          a.style.height = Ot + o.clientHeight + "px"
        ), Gt ? it.setScrollTop(s.min(it.getScrollTop(), Ot)) : it.setScrollTop(
          e,
          !0
        ), ht = !0
      }, At = function () {
        var e, t, r = o.clientHeight, n = {};
        for (e in ut) {
          t = ut[e], "function"
                     == typeof t
            ? t = t.call(it)
            : /p$/.test(t)
              && (
                t = t.slice(0, -1) / 100 * r
              ), n[e] = t;
        }
        return n
      }, Ft = function () {
        var e = st && st.offsetHeight || 0, t = s.max(
          e,
          a.scrollHeight,
          a.offsetHeight,
          o.scrollHeight,
          o.offsetHeight,
          o.clientHeight
        );
        return t - o.clientHeight
      }, Ct = function (t) {
        var r = "className";
        return e.SVGElement && t instanceof e.SVGElement && (
          t = t[r], r = "baseVal"
        ), t[r]
      }, Dt = function (t, n, o) {
        var a = "className";
        if (e.SVGElement && t instanceof e.SVGElement && (
            t = t[a], a = "baseVal"
          ), o===r) {
          return t[a] = n, r;
        }
        for (var i = t[a], l = 0, s = o.length; s > l; l++) {
          i = It(i)
            .replace(It(o[l]), " ");
        }
        i = Ht(i);
        for (var c = 0, f = n.length; f > c; c++) {
          -1
          ===It(i).indexOf(It(n[c]))
          && (
            i += " " + n[c]
          );
        }
        t[a] = Ht(i)
      }, Ht = function (e) {return e.replace(P, "")},
      It = function (e) {return " " + e + " "},
      Pt = Date.now || function () {return +new Date},
      Nt = function (e, t) {return e.frame - t.frame}, Ot = 0, Vt = 1,
      zt = "down", qt = -1, Lt = Pt(), Mt = 0, $t = 0, _t = !1, Bt = 0, Gt = !1,
      Kt = 0, Yt = [];
    "function"
    == typeof define
    && define.amd
      ? define(
      "skrollr",
      function () {return i}
      )
      : "undefined"
        != typeof module
        && module.exports
      ? module.exports = i
      : e.skrollr = i
  }
)(window, document);

/*
*
*  jQuery Hide Navbar on Scroll plugin for jQuery 1.11.1 and Bootstrap 3.2.0
*  v1.0
*  ---
*  Copyright 2014, Antonio Gómez-Maldonado (http://antoniogomez.me)
*  Released under the MIT, BSD, and GPL Licenses.
*
*/

(
  function ($) {

    $.fn.hideNavbarOnScroll = function (options) {

      // Plugin defaults
      var defaults = {
        deltaBeforeHide: 5,
        hideSpeed: 0.2,
        isActive: true
      }

      // Main variables
      var $window = $(window);

      var $document, $body;

      var plugin = {};
      plugin.settings = {};
      plugin.el = this.selector;
      plugin.$el = $(this.selector);

      var didUserScroll, navbarHeight, lastScrollTop;

      // Plugin init
      var init = function () {

        plugin.settings = $.extend({}, defaults, options);

        $document = $(document);
        $body = $('body');

        setNavbar();

      }

      // Setting the header function
      var setNavbar = function () {

        // Setting the header height
        navbarHeight = plugin.$el.outerHeight();

        // Creating a new css classes on the fly and appending them to the head of the page
        $('<style>')
          .prop('type', 'text/css')
          .html('\.header-up {\ top: -'
                + navbarHeight
                + 'px;\ } '
                + plugin.el
                + ' {\ transition: top '
                + plugin.settings.hideSpeed
                + 's ease-in-out; \ }')
          .appendTo('head');

        // Adding the class to the header
        plugin.$el.addClass('header-down');
      }

      // Checking if the window has scrollbar
      var windowHasScrollBar = function () {

        return $body.height() > $window.height();

      }

      // User has scrolled
      var userHasScrolled = function () {

        var currentScrollTop = $(this).scrollTop();
        var $navbarCollapse = plugin.$el.find('.navbar-collapse');

        // User scrolled less than the delta
        if (Math.abs(lastScrollTop - currentScrollTop)
            <= plugin.settings.deltaBeforeHide) {
          return;
        }

        // User scrolled down and past the header, add the class .header-up.
        if (currentScrollTop
            > lastScrollTop
            && currentScrollTop
               > navbarHeight) {

          // Closing the collapse responsive menu
          if (matchMedia('(max-width: 768px)').matches) {

            // Checking if the navbar is open
            if ($navbarCollapse.hasClass('in')) {

              $navbarCollapse.collapse('hide');

            }

          }

          // Closing all dropdowns from the menu
          plugin.$el.find('[data-toggle="dropdown"]')
                .parent()
                .removeClass('open');

          // Adding the 'header-up' class to the header to hide it
          plugin.$el.removeClass('header-down').addClass('header-up');

        } else {

          // Adding the 'header-down' class to the header to show it
          if (currentScrollTop + $window.height() < $document.height()) {

            plugin.$el.removeClass('header-up').addClass('header-down');

          }

        }

        // Setting the new scroll top value
        lastScrollTop = currentScrollTop;

      }

      // Window scroll event
      $window.scroll(function (event) {

        didUserScroll = true;

      });

      // Checking if the window has scrollbar and the user has scrolled
      setInterval(function () {

        if (windowHasScrollBar()) {

          if (didUserScroll && plugin.settings.isActive) {

            userHasScrolled();
            didUserScroll = false;

          }

        } else {

          plugin.$el.removeClass('header-up').addClass('header-down');

        }

      }, 250);

      // Starting the plugin
      init();
    }

  }
)(jQuery);