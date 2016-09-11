! function(a, b) {
    "use strict";
    var c, d = [],
        e = /@-skrollr-keyframes\s+([\w-]+)/g,
        f = /\s*\{\s*((?:[^{]+\{[^}]*\}\s*)+?)\s*\}/g,
        g = /([\w\-]+)\s*\{([^}]+)\}/g,
        h = /-skrollr-animation-name\s*:\s*([\w-]+)/g,
        i = function(b) {
            var c = new XMLHttpRequest;
            try {
                c.open("GET", b, !1), c.send(null)
            } catch (d) {
                a.XDomainRequest && (c = new XDomainRequest, c.open("GET", b, !1), c.send(null))
            }
            return c.responseText
        },
        j = function(b) {
            for (var e = 0; b.length > e; e++) {
                var f = b[e];
                if ("LINK" === f.tagName) {
                    if (null === f.getAttribute("data-skrollr-stylesheet")) continue;
                    if (a.matchMedia) {
                        var g = f.getAttribute("media");
                        if (g && !matchMedia(g).matches) continue
                    }
                    c = i(f.href)
                } else c = f.textContent || f.innerText || f.innerHTML;
                c && d.push(c)
            }
            d.reverse();
            for (var h = {}, j = [], n = 0; d.length > n; n++) c = d[n], k(c, h), l(c, j);
            m(h, j)
        },
        k = function(a, b) {
            e.lastIndex = 0;
            for (var c, d, h, i; null !== (c = e.exec(a));)
                for (f.lastIndex = e.lastIndex, d = f.exec(a), g.lastIndex = 0, i = b[c[1]] = {}; null !== (h = g.exec(d[1]));) i[h[1]] = h[2].replace(/[\n\r\t]/g, "")
        },
        l = function(a, b) {
            h.lastIndex = 0;
            for (var c, d, e; null !== (c = h.exec(a));) {
                for (e = h.lastIndex; e-- && "{" !== a.charAt(e););
                for (d = e; d-- && "}" !== a.charAt(d - 1););
                b.push([a.substring(d, e).replace(/[\n\r\t]/g, ""), c[1]])
            }
        },
        m = function(a, c) {
            for (var d, e, f, g, h, i, j, k = 0; c.length > k; k++)
                if (d = b.querySelectorAll(c[k][0])) {
                    e = a[c[k][1]];
                    for (f in e)
                        for (g = 0; d.length > g; g++) j = d[g], h = "data-" + f, i = e[f], j.hasAttribute(h) && (i += j.getAttribute(h)), d[g].setAttribute(h, i)
                }
        };
    j(b.querySelectorAll("link, style"))
}(window, document),
function(a, b, c) {
    "use strict";

    function d(c) {
        if (e = b.documentElement, f = b.body, S(), gb = this, c = c || {}, lb = c.constants || {}, c.easing)
            for (var d in c.easing) V[d] = c.easing[d];
        sb = c.edgeStrategy || "set", jb = {
            beforerender: c.beforerender,
            render: c.render
        }, kb = c.forceHeight !== !1, kb && (Ib = c.scale || 1), mb = c.mobileDeceleration || y, ob = c.smoothScrolling !== !1, pb = c.smoothScrollingDuration || z, qb = {
            targetTop: gb.getScrollTop()
        }, Qb = (c.mobileCheck || function() {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || a.opera)
        })(), Qb ? (ib = b.getElementById("skrollr-body"), ib && fb(), W(), Cb(e, [s, v], [t])) : Cb(e, [s, u], [t]), gb.refresh(), vb(a, "resize orientationchange", function() {
            var a = e.clientWidth,
                b = e.clientHeight;
            (b !== Nb || a !== Mb) && (Nb = b, Mb = a, Ob = !0)
        });
        var g = T();
        return function h() {
            Z(), ub = g(h)
        }(), gb
    }
    var e, f, g = a.skrollr = {
            get: function() {
                return gb
            },
            init: function(a) {
                return gb || new d(a)
            },
            VERSION: "0.6.21"
        },
        h = Object.prototype.hasOwnProperty,
        i = a.Math,
        j = a.getComputedStyle,
        k = "touchstart",
        l = "touchmove",
        m = "touchcancel",
        n = "touchend",
        o = "skrollable",
        p = o + "-before",
        q = o + "-between",
        r = o + "-after",
        s = "skrollr",
        t = "no-" + s,
        u = s + "-desktop",
        v = s + "-mobile",
        w = "linear",
        x = 1e3,
        y = .004,
        z = 200,
        A = "start",
        B = "end",
        C = "center",
        D = "bottom",
        E = "___skrollable_id",
        F = /^(?:input|textarea|button|select)$/i,
        G = /^\s+|\s+$/g,
        H = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
        I = /\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
        J = /^([a-z\-]+)\[(\w+)\]$/,
        K = /-([a-z])/g,
        L = function(a, b) {
            return b.toUpperCase()
        },
        M = /[\-+]?[\d]*\.?[\d]+/g,
        N = /\{\?\}/g,
        O = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
        P = /[a-z\-]+-gradient/g,
        Q = "",
        R = "",
        S = function() {
            var a = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            if (j) {
                var b = j(f, null);
                for (var d in b)
                    if (Q = d.match(a) || +d == d && b[d].match(a)) break;
                if (!Q) return Q = R = "", c;
                Q = Q[0], "-" === Q.slice(0, 1) ? (R = Q, Q = {
                    "-webkit-": "webkit",
                    "-moz-": "Moz",
                    "-ms-": "ms",
                    "-o-": "O"
                }[Q]) : R = "-" + Q.toLowerCase() + "-"
            }
        },
        T = function() {
            var b = a.requestAnimationFrame || a[Q.toLowerCase() + "RequestAnimationFrame"],
                c = Fb();
            return (Qb || !b) && (b = function(b) {
                var d = Fb() - c,
                    e = i.max(0, 1e3 / 60 - d);
                return a.setTimeout(function() {
                    c = Fb(), b()
                }, e)
            }), b
        },
        U = function() {
            var b = a.cancelAnimationFrame || a[Q.toLowerCase() + "CancelAnimationFrame"];
            return (Qb || !b) && (b = function(b) {
                return a.clearTimeout(b)
            }), b
        },
        V = {
            begin: function() {
                return 0
            },
            end: function() {
                return 1
            },
            linear: function(a) {
                return a
            },
            quadratic: function(a) {
                return a * a
            },
            cubic: function(a) {
                return a * a * a
            },
            swing: function(a) {
                return -i.cos(a * i.PI) / 2 + .5
            },
            sqrt: function(a) {
                return i.sqrt(a)
            },
            outCubic: function(a) {
                return i.pow(a - 1, 3) + 1
            },
            bounce: function(a) {
                var b;
                if (.5083 >= a) b = 3;
                else if (.8489 >= a) b = 9;
                else if (.96208 >= a) b = 27;
                else {
                    if (!(.99981 >= a)) return 1;
                    b = 91
                }
                return 1 - i.abs(3 * i.cos(1.028 * a * b) / b)
            }
        };
    d.prototype.refresh = function(a) {
        var d, e, f = !1;
        for (a === c ? (f = !0, hb = [], Pb = 0, a = b.getElementsByTagName("*")) : a = [].concat(a), d = 0, e = a.length; e > d; d++) {
            var g = a[d],
                h = g,
                i = [],
                j = ob,
                k = sb;
            if (g.attributes) {
                for (var l = 0, m = g.attributes.length; m > l; l++) {
                    var n = g.attributes[l];
                    if ("data-anchor-target" !== n.name)
                        if ("data-smooth-scrolling" !== n.name)
                            if ("data-edge-strategy" !== n.name) {
                                var p = n.name.match(H);
                                if (null !== p) {
                                    var q = {
                                        props: n.value,
                                        element: g
                                    };
                                    i.push(q);
                                    var r = p[1];
                                    r && (q.constant = r.substr(1));
                                    var s = p[2];
                                    /p$/.test(s) ? (q.isPercentage = !0, q.offset = (0 | s.slice(0, -1)) / 100) : q.offset = 0 | s;
                                    var t = p[3],
                                        u = p[4] || t;
                                    t && t !== A && t !== B ? (q.mode = "relative", q.anchors = [t, u]) : (q.mode = "absolute", t === B ? q.isEnd = !0 : q.isPercentage || (q.offset = q.offset * Ib))
                                }
                            } else k = n.value;
                    else j = "off" !== n.value;
                    else if (h = b.querySelector(n.value), null === h) throw 'Unable to find anchor target "' + n.value + '"'
                }
                if (i.length) {
                    var v, w, x;
                    !f && E in g ? (x = g[E], v = hb[x].styleAttr, w = hb[x].classAttr) : (x = g[E] = Pb++, v = g.style.cssText, w = Bb(g)), hb[x] = {
                        element: g,
                        styleAttr: v,
                        classAttr: w,
                        anchorTarget: h,
                        keyFrames: i,
                        smoothScrolling: j,
                        edgeStrategy: k
                    }, Cb(g, [o], [])
                }
            }
        }
        for (yb(), d = 0, e = a.length; e > d; d++) {
            var y = hb[a[d][E]];
            y !== c && ($(y), ab(y))
        }
        return gb
    }, d.prototype.relativeToAbsolute = function(a, b, c) {
        var d = e.clientHeight,
            f = a.getBoundingClientRect(),
            g = f.top,
            h = f.bottom - f.top;
        return b === D ? g -= d : b === C && (g -= d / 2), c === D ? g += h : c === C && (g += h / 2), g += gb.getScrollTop(), 0 | g + .5
    }, d.prototype.animateTo = function(a, b) {
        b = b || {};
        var d = Fb(),
            e = gb.getScrollTop();
        return nb = {
            startTop: e,
            topDiff: a - e,
            targetTop: a,
            duration: b.duration || x,
            startTime: d,
            endTime: d + (b.duration || x),
            easing: V[b.easing || w],
            done: b.done
        }, nb.topDiff || (nb.done && nb.done.call(gb, !1), nb = c), gb
    }, d.prototype.stopAnimateTo = function() {
        nb && nb.done && nb.done.call(gb, !0), nb = c
    }, d.prototype.isAnimatingTo = function() {
        return !!nb
    }, d.prototype.setScrollTop = function(b, c) {
        return rb = c === !0, Qb ? Rb = i.min(i.max(b, 0), Hb) : a.scrollTo(0, b), gb
    }, d.prototype.getScrollTop = function() {
        return Qb ? Rb : a.pageYOffset || e.scrollTop || f.scrollTop || 0
    }, d.prototype.getMaxScrollTop = function() {
        return Hb
    }, d.prototype.on = function(a, b) {
        return jb[a] = b, gb
    }, d.prototype.off = function(a) {
        return delete jb[a], gb
    }, d.prototype.destroy = function() {
        var a = U();
        a(ub), xb(), Cb(e, [t], [s, u, v]);
        for (var b = 0, d = hb.length; d > b; b++) eb(hb[b].element);
        e.style.overflow = f.style.overflow = "auto", e.style.height = f.style.height = "auto", ib && g.setStyle(ib, "transform", "none"), gb = c, ib = c, jb = c, kb = c, Hb = 0, Ib = 1, lb = c, mb = c, Jb = "down", Kb = -1, Mb = 0, Nb = 0, Ob = !1, nb = c, ob = c, pb = c, qb = c, rb = c, Pb = 0, sb = c, Qb = !1, Rb = 0, tb = c
    };
    var W = function() {
            var d, g, h, j, o, p, q, r, s, t, u, v;
            vb(e, [k, l, m, n].join(" "), function(a) {
                var e = a.changedTouches[0];
                for (j = a.target; 3 === j.nodeType;) j = j.parentNode;
                switch (o = e.clientY, p = e.clientX, t = a.timeStamp, F.test(j.tagName) || a.preventDefault(), a.type) {
                    case k:
                        d && d.blur(), gb.stopAnimateTo(), d = j, g = q = o, h = p, s = t;
                        break;
                    case l:
                        F.test(j.tagName) && b.activeElement !== j && a.preventDefault(), r = o - q, v = t - u, gb.setScrollTop(Rb - r, !0), q = o, u = t;
                        break;
                    default:
                    case m:
                    case n:
                        var f = g - o,
                            w = h - p,
                            x = w * w + f * f;
                        if (49 > x) {
                            if (!F.test(d.tagName)) {
                                d.focus();
                                var y = b.createEvent("MouseEvents");
                                y.initMouseEvent("click", !0, !0, a.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), d.dispatchEvent(y)
                            }
                            return
                        }
                        d = c;
                        var z = r / v;
                        z = i.max(i.min(z, 3), -3);
                        var A = i.abs(z / mb),
                            B = z * A + .5 * mb * A * A,
                            C = gb.getScrollTop() - B,
                            D = 0;
                        C > Hb ? (D = (Hb - C) / B, C = Hb) : 0 > C && (D = -C / B, C = 0), A *= 1 - D, gb.animateTo(0 | C + .5, {
                            easing: "outCubic",
                            duration: A
                        })
                }
            }), a.scrollTo(0, 0), e.style.overflow = f.style.overflow = "hidden"
        },
        X = function() {
            var a, b, c, d, f, g, h, j, k, l, m, n = e.clientHeight,
                o = zb();
            for (j = 0, k = hb.length; k > j; j++)
                for (a = hb[j], b = a.element, c = a.anchorTarget, d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], l = h.offset, m = o[h.constant] || 0, h.frame = l, h.isPercentage && (l *= n, h.frame = l), "relative" === h.mode && (eb(b), h.frame = gb.relativeToAbsolute(c, h.anchors[0], h.anchors[1]) - l, eb(b, !0)), h.frame += m, kb && !h.isEnd && h.frame > Hb && (Hb = h.frame);
            for (Hb = i.max(Hb, Ab()), j = 0, k = hb.length; k > j; j++) {
                for (a = hb[j], d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], m = o[h.constant] || 0, h.isEnd && (h.frame = Hb - h.offset + m);
                a.keyFrames.sort(Gb)
            }
        },
        Y = function(a, b) {
            for (var c = 0, d = hb.length; d > c; c++) {
                var e, f, i = hb[c],
                    j = i.element,
                    k = i.smoothScrolling ? a : b,
                    l = i.keyFrames,
                    m = l[0].frame,
                    n = l[l.length - 1].frame,
                    s = m > k,
                    t = k > n,
                    u = l[s ? 0 : l.length - 1];
                if (s || t) {
                    if (s && -1 === i.edge || t && 1 === i.edge) continue;
                    switch (Cb(j, [s ? p : r], [p, q, r]), i.edge = s ? -1 : 1, i.edgeStrategy) {
                        case "reset":
                            eb(j);
                            continue;
                        case "ease":
                            k = u.frame;
                            break;
                        default:
                        case "set":
                            var v = u.props;
                            for (e in v) h.call(v, e) && (f = db(v[e].value), g.setStyle(j, e, f));
                            continue
                    }
                } else 0 !== i.edge && (Cb(j, [o, q], [p, r]), i.edge = 0);
                for (var w = 0, x = l.length - 1; x > w; w++)
                    if (k >= l[w].frame && l[w + 1].frame >= k) {
                        var y = l[w],
                            z = l[w + 1];
                        for (e in y.props)
                            if (h.call(y.props, e)) {
                                var A = (k - y.frame) / (z.frame - y.frame);
                                A = y.props[e].easing(A), f = cb(y.props[e].value, z.props[e].value, A), f = db(f), g.setStyle(j, e, f)
                            }
                        break
                    }
            }
        },
        Z = function() {
            Ob && (Ob = !1, yb());
            var a, b, d = gb.getScrollTop(),
                e = Fb();
            if (nb) e >= nb.endTime ? (d = nb.targetTop, a = nb.done, nb = c) : (b = nb.easing((e - nb.startTime) / nb.duration), d = 0 | nb.startTop + b * nb.topDiff), gb.setScrollTop(d, !0);
            else if (!rb) {
                var f = qb.targetTop - d;
                f && (qb = {
                    startTop: Kb,
                    topDiff: d - Kb,
                    targetTop: d,
                    startTime: Lb,
                    endTime: Lb + pb
                }), qb.endTime >= e && (b = V.sqrt((e - qb.startTime) / pb), d = 0 | qb.startTop + b * qb.topDiff)
            }
            if (Qb && ib && g.setStyle(ib, "transform", "translate(0, " + -Rb + "px) " + tb), rb || Kb !== d) {
                Jb = d > Kb ? "down" : Kb > d ? "up" : Jb, rb = !1;
                var h = {
                        curTop: d,
                        lastTop: Kb,
                        maxTop: Hb,
                        direction: Jb
                    },
                    i = jb.beforerender && jb.beforerender.call(gb, h);
                i !== !1 && (Y(d, gb.getScrollTop()), Kb = d, jb.render && jb.render.call(gb, h)), a && a.call(gb, !1)
            }
            Lb = e
        },
        $ = function(a) {
            for (var b = 0, c = a.keyFrames.length; c > b; b++) {
                for (var d, e, f, g, h = a.keyFrames[b], i = {}; null !== (g = I.exec(h.props));) f = g[1], e = g[2], d = f.match(J), null !== d ? (f = d[1], d = d[2]) : d = w, e = e.indexOf("!") ? _(e) : [e.slice(1)], i[f] = {
                    value: e,
                    easing: V[d]
                };
                h.props = i
            }
        },
        _ = function(a) {
            var b = [];
            return O.lastIndex = 0, a = a.replace(O, function(a) {
                return a.replace(M, function(a) {
                    return 100 * (a / 255) + "%"
                })
            }), R && (P.lastIndex = 0, a = a.replace(P, function(a) {
                return R + a
            })), a = a.replace(M, function(a) {
                return b.push(+a), "{?}"
            }), b.unshift(a), b
        },
        ab = function(a) {
            var b, c, d = {};
            for (b = 0, c = a.keyFrames.length; c > b; b++) bb(a.keyFrames[b], d);
            for (d = {}, b = a.keyFrames.length - 1; b >= 0; b--) bb(a.keyFrames[b], d)
        },
        bb = function(a, b) {
            var c;
            for (c in b) h.call(a.props, c) || (a.props[c] = b[c]);
            for (c in a.props) b[c] = a.props[c]
        },
        cb = function(a, b, c) {
            var d, e = a.length;
            if (e !== b.length) throw "Can't interpolate between \"" + a[0] + '" and "' + b[0] + '"';
            var f = [a[0]];
            for (d = 1; e > d; d++) f[d] = a[d] + (b[d] - a[d]) * c;
            return f
        },
        db = function(a) {
            var b = 1;
            return N.lastIndex = 0, a[0].replace(N, function() {
                return a[b++]
            })
        },
        eb = function(a, b) {
            a = [].concat(a);
            for (var c, d, e = 0, f = a.length; f > e; e++) d = a[e], c = hb[d[E]], c && (b ? (d.style.cssText = c.dirtyStyleAttr, Cb(d, c.dirtyClassAttr)) : (c.dirtyStyleAttr = d.style.cssText, c.dirtyClassAttr = Bb(d), d.style.cssText = c.styleAttr, Cb(d, c.classAttr)))
        },
        fb = function() {
            tb = "translateZ(0)", g.setStyle(ib, "transform", tb);
            var a = j(ib),
                b = a.getPropertyValue("transform"),
                c = a.getPropertyValue(R + "transform"),
                d = b && "none" !== b || c && "none" !== c;
            d || (tb = "")
        };
    g.setStyle = function(a, b, c) {
        var d = a.style;
        if (b = b.replace(K, L).replace("-", ""), "zIndex" === b) d[b] = isNaN(c) ? c : "" + (0 | c);
        else if ("float" === b) d.styleFloat = d.cssFloat = c;
        else try {
            Q && (d[Q + b.slice(0, 1).toUpperCase() + b.slice(1)] = c), d[b] = c
        } catch (e) {}
    };
    var gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb, sb, tb, ub, vb = g.addEvent = function(b, c, d) {
            var e = function(b) {
                return b = b || a.event, b.target || (b.target = b.srcElement), b.preventDefault || (b.preventDefault = function() {
                    b.returnValue = !1
                }), d.call(this, b)
            };
            c = c.split(" ");
            for (var f, g = 0, h = c.length; h > g; g++) f = c[g], b.addEventListener ? b.addEventListener(f, d, !1) : b.attachEvent("on" + f, e), Sb.push({
                element: b,
                name: f,
                listener: d
            })
        },
        wb = g.removeEvent = function(a, b, c) {
            b = b.split(" ");
            for (var d = 0, e = b.length; e > d; d++) a.removeEventListener ? a.removeEventListener(b[d], c, !1) : a.detachEvent("on" + b[d], c)
        },
        xb = function() {
            for (var a, b = 0, c = Sb.length; c > b; b++) a = Sb[b], wb(a.element, a.name, a.listener);
            Sb = []
        },
        yb = function() {
            var a = gb.getScrollTop();
            Hb = 0, kb && !Qb && (f.style.height = "auto"), X(), kb && !Qb && (f.style.height = Hb + e.clientHeight + "px"), Qb ? gb.setScrollTop(i.min(gb.getScrollTop(), Hb)) : gb.setScrollTop(a, !0), rb = !0
        },
        zb = function() {
            var a, b, c = e.clientHeight,
                d = {};
            for (a in lb) b = lb[a], "function" == typeof b ? b = b.call(gb) : /p$/.test(b) && (b = b.slice(0, -1) / 100 * c), d[a] = b;
            return d
        },
        Ab = function() {
            var a = ib && ib.offsetHeight || 0,
                b = i.max(a, f.scrollHeight, f.offsetHeight, e.scrollHeight, e.offsetHeight, e.clientHeight);
            return b - e.clientHeight
        },
        Bb = function(b) {
            var c = "className";
            return a.SVGElement && b instanceof a.SVGElement && (b = b[c], c = "baseVal"), b[c]
        },
        Cb = function(b, d, e) {
            var f = "className";
            if (a.SVGElement && b instanceof a.SVGElement && (b = b[f], f = "baseVal"), e === c) return b[f] = d, c;
            for (var g = b[f], h = 0, i = e.length; i > h; h++) g = Eb(g).replace(Eb(e[h]), " ");
            g = Db(g);
            for (var j = 0, k = d.length; k > j; j++) - 1 === Eb(g).indexOf(Eb(d[j])) && (g += " " + d[j]);
            b[f] = Db(g)
        },
        Db = function(a) {
            return a.replace(G, "")
        },
        Eb = function(a) {
            return " " + a + " "
        },
        Fb = Date.now || function() {
            return +new Date
        },
        Gb = function(a, b) {
            return a.frame - b.frame
        },
        Hb = 0,
        Ib = 1,
        Jb = "down",
        Kb = -1,
        Lb = Fb(),
        Mb = 0,
        Nb = 0,
        Ob = !1,
        Pb = 0,
        Qb = !1,
        Rb = 0,
        Sb = []
}(window, document),
function(a, b) {
    "use strict";
    var c = 500,
        d = "sqrt",
        e = 1,
        f = "data-menu-offset",
        g = b.skrollr,
        h = b.history,
        i = !!h.pushState,
        j = function(b) {
            return "A" === b.tagName || "text" === b.tagName ? b : b === a ? !1 : j(b.parentNode)
        },
        k = function(a) {
            if (1 === a.which || 0 === a.button) {
                var b = j(a.target);
                b && l(b) && a.preventDefault()
            }
        },
        l = function(b, c) {
            var d = new RegExp("sc-menu[0-9]"),
                e = d.test(b.id);
            if (!e) return !1;
            var g, h, i = b.id.replace("sc-menu", "scene"),
                j = "#" + i;
            if (h = s ? s(b) : u[i].begin + u[i].menuoffset, null !== h) g = /p$/.test(h) ? h.slice(0, -1) / 100 * a.documentElement.clientHeight : +h * t;
            else {
                var k = a.getElementById(j.substr(1));
                if (!k) return !1;
                g = o.relativeToAbsolute(k, "top", "top");
                var l = k.getAttribute(f);
                null !== l && (g += +l)
            }
            return r && !c ? o.animateTo(g, {
                duration: q(o.getScrollTop(), g),
                easing: p
            }) : n(function() {
                o.setScrollTop(g)
            }), !0
        },
        m = function() {
            if (b.location.hash && a.querySelector) {
                var c = a.querySelector('a[href="' + b.location.hash + '"]');
                c && l(c, !0)
            }
        },
        n = function(a) {
            b.setTimeout(a, 1)
        };
    g.menu = {}, g.menu.init = function(f, h) {
        o = f, h = h || {}, u = h.scenes || {}, p = h.easing || d, r = h.animate !== !1, q = h.duration || c, s = h.handleLink, t = h.scale || e, "number" == typeof q && (q = function(a) {
            return function() {
                return a
            }
        }(q)), g.addEvent(a, "click", k), i && g.addEvent(b, "popstate", function(a) {
            var b = a.state || {},
                c = b.top || 0;
            n(function() {
                o.setScrollTop(c)
            })
        }, !1), m()
    };
    var o, p, q, r, s, t, u;
    n(function() {
        b.location.hash && b.scrollTo(0, 0)
    })
}(document, window),
function(a, b) {
    "use strict";
    var c = b.setStyle;
    b.setStyle = function(a, b, d) {
        c.apply(this, arguments);
        a.style;
        "transform" === b && a.setAttribute("transform", d.replace(/(deg|px)/gi, "")), "d" === b && a.setAttribute("d", d)
    }
}(document, window.skrollr);