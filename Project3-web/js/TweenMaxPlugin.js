//gsap
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
        var d = function (a) {
            var b, c = [], d = a.length;
            for (b = 0; b !== d; c.push(a[b++]))
                ;
            return c
        }
            , e = function (a, b, c) {
                var d, e, f = a.cycle;
                for (d in f)
                    e = f[d],
                        a[d] = "function" == typeof e ? e(c, b[c], b) : e[c % e.length];
                delete a.cycle
            }
            , f = function (a) {
                if ("function" == typeof a)
                    return a;
                var b = "object" == typeof a ? a : {
                    each: a
                }
                    , c = b.ease
                    , d = b.from || 0
                    , e = b.base || 0
                    , f = {}
                    , g = isNaN(d)
                    , h = b.axis
                    , i = {
                        center: .5,
                        end: 1
                    }[d] || 0;
                return function (a, j, k) {
                    var l, m, n, o, p, q, r, s, t, u = (k || b).length, v = f[u];
                    if (!v) {
                        if (t = "auto" === b.grid ? 0 : (b.grid || [1 / 0])[0],
                            !t) {
                            for (r = -(1 / 0); r < (r = k[t++].getBoundingClientRect().left) && u > t;)
                                ;
                            t--
                        }
                        for (v = f[u] = [],
                            l = g ? Math.min(t, u) * i - .5 : d % t,
                            m = g ? u * i / t - .5 : d / t | 0,
                            r = 0,
                            s = 1 / 0,
                            q = 0; u > q; q++)
                            n = q % t - l,
                                o = m - (q / t | 0),
                                v[q] = p = h ? Math.abs("y" === h ? o : n) : Math.sqrt(n * n + o * o),
                                p > r && (r = p),
                                s > p && (s = p);
                        v.max = r - s,
                            v.min = s,
                            v.v = u = b.amount || b.each * (t > u ? u : h ? "y" === h ? u / t : t : Math.max(t, u / t)) || 0,
                            v.b = 0 > u ? e - u : e
                    }
                    return u = (v[a] - v.min) / v.max,
                        v.b + (c ? c.getRatio(u) : u) * v.v
                }
            }
            , g = function (a, b, d) {
                c.call(this, a, b, d),
                    this._cycle = 0,
                    this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase,
                    this._repeat = this.vars.repeat || 0,
                    this._repeatDelay = this.vars.repeatDelay || 0,
                    this._repeat && this._uncache(!0),
                    this.render = g.prototype.render
            }
            , h = 1e-8
            , i = c._internals
            , j = i.isSelector
            , k = i.isArray
            , l = g.prototype = c.to({}, .1, {})
            , m = [];
        g.version = "2.1.2",
            l.constructor = g,
            l.kill()._gc = !1,
            g.killTweensOf = g.killDelayedCallsTo = c.killTweensOf,
            g.getTweensOf = c.getTweensOf,
            g.lagSmoothing = c.lagSmoothing,
            g.ticker = c.ticker,
            g.render = c.render,
            g.distribute = f,
            l.invalidate = function () {
                return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase,
                    this._repeat = this.vars.repeat || 0,
                    this._repeatDelay = this.vars.repeatDelay || 0,
                    this._yoyoEase = null,
                    this._uncache(!0),
                    c.prototype.invalidate.call(this)
            }
            ,
            l.updateTo = function (a, b) {
                var d, e = this, f = e.ratio, g = e.vars.immediateRender || a.immediateRender;
                b && e._startTime < e._timeline._time && (e._startTime = e._timeline._time,
                    e._uncache(!1),
                    e._gc ? e._enabled(!0, !1) : e._timeline.insert(e, e._startTime - e._delay));
                for (d in a)
                    e.vars[d] = a[d];
                if (e._initted || g)
                    if (b)
                        e._initted = !1,
                            g && e.render(0, !0, !0);
                    else if (e._gc && e._enabled(!0, !1),
                        e._notifyPluginsOfEnabled && e._firstPT && c._onPluginEvent("_onDisable", e),
                        e._time / e._duration > .998) {
                        var h = e._totalTime;
                        e.render(0, !0, !1),
                            e._initted = !1,
                            e.render(h, !0, !1)
                    } else if (e._initted = !1,
                        e._init(),
                        e._time > 0 || g)
                        for (var i, j = 1 / (1 - f), k = e._firstPT; k;)
                            i = k.s + k.c,
                                k.c *= j,
                                k.s = i - k.c,
                                k = k._next;
                return e
            }
            ,
            l.render = function (a, b, d) {
                this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                var e, f, g, j, k, l, m, n, o, p = this, q = p._dirty ? p.totalDuration() : p._totalDuration, r = p._time, s = p._totalTime, t = p._cycle, u = p._duration, v = p._rawPrevTime;
                if (a >= q - h && a >= 0 ? (p._totalTime = q,
                    p._cycle = p._repeat,
                    p._yoyo && 0 !== (1 & p._cycle) ? (p._time = 0,
                        p.ratio = p._ease._calcEnd ? p._ease.getRatio(0) : 0) : (p._time = u,
                            p.ratio = p._ease._calcEnd ? p._ease.getRatio(1) : 1),
                    p._reversed || (e = !0,
                        f = "onComplete",
                        d = d || p._timeline.autoRemoveChildren),
                    0 === u && (p._initted || !p.vars.lazy || d) && (p._startTime === p._timeline._duration && (a = 0),
                        (0 > v || 0 >= a && a >= -h || v === h && "isPause" !== p.data) && v !== a && (d = !0,
                            v > h && (f = "onReverseComplete")),
                        p._rawPrevTime = n = !b || a || v === a ? a : h)) : h > a ? (p._totalTime = p._time = p._cycle = 0,
                            p.ratio = p._ease._calcEnd ? p._ease.getRatio(0) : 0,
                            (0 !== s || 0 === u && v > 0) && (f = "onReverseComplete",
                                e = p._reversed),
                            a > -h ? a = 0 : 0 > a && (p._active = !1,
                                0 === u && (p._initted || !p.vars.lazy || d) && (v >= 0 && (d = !0),
                                    p._rawPrevTime = n = !b || a || v === a ? a : h)),
                            p._initted || (d = !0)) : (p._totalTime = p._time = a,
                                0 !== p._repeat && (j = u + p._repeatDelay,
                                    p._cycle = p._totalTime / j >> 0,
                                    0 !== p._cycle && p._cycle === p._totalTime / j && a >= s && p._cycle--,
                                    p._time = p._totalTime - p._cycle * j,
                                    p._yoyo && 0 !== (1 & p._cycle) && (p._time = u - p._time,
                                        o = p._yoyoEase || p.vars.yoyoEase,
                                        o && (p._yoyoEase || (o !== !0 || p._initted ? p._yoyoEase = o = o === !0 ? p._ease : o instanceof Ease ? o : Ease.map[o] : (o = p.vars.ease,
                                            p._yoyoEase = o = o ? o instanceof Ease ? o : "function" == typeof o ? new Ease(o, p.vars.easeParams) : Ease.map[o] || c.defaultEase : c.defaultEase)),
                                            p.ratio = o ? 1 - o.getRatio((u - p._time) / u) : 0)),
                                    p._time > u ? p._time = u : p._time < 0 && (p._time = 0)),
                                p._easeType && !o ? (k = p._time / u,
                                    l = p._easeType,
                                    m = p._easePower,
                                    (1 === l || 3 === l && k >= .5) && (k = 1 - k),
                                    3 === l && (k *= 2),
                                    1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k * k * k * k),
                                    p.ratio = 1 === l ? 1 - k : 2 === l ? k : p._time / u < .5 ? k / 2 : 1 - k / 2) : o || (p.ratio = p._ease.getRatio(p._time / u))),
                    r === p._time && !d && t === p._cycle)
                    return void (s !== p._totalTime && p._onUpdate && (b || p._callback("onUpdate")));
                if (!p._initted) {
                    if (p._init(),
                        !p._initted || p._gc)
                        return;
                    if (!d && p._firstPT && (p.vars.lazy !== !1 && p._duration || p.vars.lazy && !p._duration))
                        return p._time = r,
                            p._totalTime = s,
                            p._rawPrevTime = v,
                            p._cycle = t,
                            i.lazyTweens.push(p),
                            void (p._lazy = [a, b]);
                    !p._time || e || o ? e && this._ease._calcEnd && !o && (p.ratio = p._ease.getRatio(0 === p._time ? 0 : 1)) : p.ratio = p._ease.getRatio(p._time / u)
                }
                for (p._lazy !== !1 && (p._lazy = !1),
                    p._active || !p._paused && p._time !== r && a >= 0 && (p._active = !0),
                    0 === s && (2 === p._initted && a > 0 && p._init(),
                        p._startAt && (a >= 0 ? p._startAt.render(a, !0, d) : f || (f = "_dummyGS")),
                        p.vars.onStart && (0 !== p._totalTime || 0 === u) && (b || p._callback("onStart"))),
                    g = p._firstPT; g;)
                    g.f ? g.t[g.p](g.c * p.ratio + g.s) : g.t[g.p] = g.c * p.ratio + g.s,
                        g = g._next;
                p._onUpdate && (0 > a && p._startAt && p._startTime && p._startAt.render(a, !0, d),
                    b || (p._totalTime !== s || f) && p._callback("onUpdate")),
                    p._cycle !== t && (b || p._gc || p.vars.onRepeat && p._callback("onRepeat")),
                    f && (!p._gc || d) && (0 > a && p._startAt && !p._onUpdate && p._startTime && p._startAt.render(a, !0, d),
                        e && (p._timeline.autoRemoveChildren && p._enabled(!1, !1),
                            p._active = !1),
                        !b && p.vars[f] && p._callback(f),
                        0 === u && p._rawPrevTime === h && n !== h && (p._rawPrevTime = 0))
            }
            ,
            g.to = function (a, b, c) {
                return new g(a, b, c)
            }
            ,
            g.from = function (a, b, c) {
                return c.runBackwards = !0,
                    c.immediateRender = 0 != c.immediateRender,
                    new g(a, b, c)
            }
            ,
            g.fromTo = function (a, b, c, d) {
                return d.startAt = c,
                    d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender,
                    new g(a, b, d)
            }
            ,
            g.staggerTo = g.allTo = function (a, b, h, i, l, n, o) {
                var p, q, r, s, t = [], u = f(h.stagger || i), v = h.cycle, w = (h.startAt || m).cycle;
                for (k(a) || ("string" == typeof a && (a = c.selector(a) || a),
                    j(a) && (a = d(a))),
                    a = a || [],
                    p = a.length - 1,
                    r = 0; p >= r; r++) {
                    q = {};
                    for (s in h)
                        q[s] = h[s];
                    if (v && (e(q, a, r),
                        null != q.duration && (b = q.duration,
                            delete q.duration)),
                        w) {
                        w = q.startAt = {};
                        for (s in h.startAt)
                            w[s] = h.startAt[s];
                        e(q.startAt, a, r)
                    }
                    q.delay = u(r, a[r], a) + (q.delay || 0),
                        r === p && l && (q.onComplete = function () {
                            h.onComplete && h.onComplete.apply(h.onCompleteScope || this, arguments),
                                l.apply(o || h.callbackScope || this, n || m)
                        }
                        ),
                        t[r] = new g(a[r], b, q)
                }
                return t
            }
            ,
            g.staggerFrom = g.allFrom = function (a, b, c, d, e, f, h) {
                return c.runBackwards = !0,
                    c.immediateRender = 0 != c.immediateRender,
                    g.staggerTo(a, b, c, d, e, f, h)
            }
            ,
            g.staggerFromTo = g.allFromTo = function (a, b, c, d, e, f, h, i) {
                return d.startAt = c,
                    d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender,
                    g.staggerTo(a, b, d, e, f, h, i)
            }
            ,
            g.delayedCall = function (a, b, c, d, e) {
                return new g(b, 0, {
                    delay: a,
                    onComplete: b,
                    onCompleteParams: c,
                    callbackScope: d,
                    onReverseComplete: b,
                    onReverseCompleteParams: c,
                    immediateRender: !1,
                    useFrames: e,
                    overwrite: 0
                })
            }
            ,
            g.set = function (a, b) {
                return new g(a, 0, b)
            }
            ,
            g.isTweening = function (a) {
                return c.getTweensOf(a, !0).length > 0
            }
            ;
        var n = function (a, b) {
            for (var d = [], e = 0, f = a._first; f;)
                f instanceof c ? d[e++] = f : (b && (d[e++] = f),
                    d = d.concat(n(f, b)),
                    e = d.length),
                    f = f._next;
            return d
        }
            , o = g.getAllTweens = function (b) {
                return n(a._rootTimeline, b).concat(n(a._rootFramesTimeline, b))
            }
            ;
        g.killAll = function (a, c, d, e) {
            null == c && (c = !0),
                null == d && (d = !0);
            var f, g, h, i = o(0 != e), j = i.length, k = c && d && e;
            for (h = 0; j > h; h++)
                g = i[h],
                    (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1))
        }
            ,
            g.killChildTweensOf = function (a, b) {
                if (null != a) {
                    var e, f, h, l, m, n = i.tweenLookup;
                    if ("string" == typeof a && (a = c.selector(a) || a),
                        j(a) && (a = d(a)),
                        k(a))
                        for (l = a.length; --l > -1;)
                            g.killChildTweensOf(a[l], b);
                    else {
                        e = [];
                        for (h in n)
                            for (f = n[h].target.parentNode; f;)
                                f === a && (e = e.concat(n[h].tweens)),
                                    f = f.parentNode;
                        for (m = e.length,
                            l = 0; m > l; l++)
                            b && e[l].totalTime(e[l].totalDuration()),
                                e[l]._enabled(!1, !1)
                    }
                }
            }
            ;
        var p = function (a, c, d, e) {
            c = c !== !1,
                d = d !== !1,
                e = e !== !1;
            for (var f, g, h = o(e), i = c && d && e, j = h.length; --j > -1;)
                g = h[j],
                    (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
        };
        return g.pauseAll = function (a, b, c) {
            p(!0, a, b, c)
        }
            ,
            g.resumeAll = function (a, b, c) {
                p(!1, a, b, c)
            }
            ,
            g.globalTimeScale = function (b) {
                var d = a._rootTimeline
                    , e = c.ticker.time;
                return arguments.length ? (b = b || h,
                    d._startTime = e - (e - d._startTime) * d._timeScale / b,
                    d = a._rootFramesTimeline,
                    e = c.ticker.frame,
                    d._startTime = e - (e - d._startTime) * d._timeScale / b,
                    d._timeScale = a._rootTimeline._timeScale = b,
                    b) : d._timeScale
            }
            ,
            l.progress = function (a, b) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
            }
            ,
            l.totalProgress = function (a, b) {
                return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
            }
            ,
            l.time = function (a, b) {
                if (!arguments.length)
                    return this._time;
                this._dirty && this.totalDuration();
                var c = this._duration
                    , d = this._cycle
                    , e = d * (c + this._repeatDelay);
                return a > c && (a = c),
                    this.totalTime(this._yoyo && 1 & d ? c - a + e : this._repeat ? a + e : a, b)
            }
            ,
            l.duration = function (b) {
                return arguments.length ? a.prototype.duration.call(this, b) : this._duration
            }
            ,
            l.totalDuration = function (a) {
                return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat,
                    this._dirty = !1),
                    this._totalDuration)
            }
            ,
            l.repeat = function (a) {
                return arguments.length ? (this._repeat = a,
                    this._uncache(!0)) : this._repeat
            }
            ,
            l.repeatDelay = function (a) {
                return arguments.length ? (this._repeatDelay = a,
                    this._uncache(!0)) : this._repeatDelay
            }
            ,
            l.yoyo = function (a) {
                return arguments.length ? (this._yoyo = a,
                    this) : this._yoyo
            }
            ,
            g
    }, !0),
        _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
            var d = function (a) {
                b.call(this, a);
                var c, d, e = this, f = e.vars;
                e._labels = {},
                    e.autoRemoveChildren = !!f.autoRemoveChildren,
                    e.smoothChildTiming = !!f.smoothChildTiming,
                    e._sortChildren = !0,
                    e._onUpdate = f.onUpdate;
                for (d in f)
                    c = f[d],
                        i(c) && -1 !== c.join("").indexOf("{self}") && (f[d] = e._swapSelfInParams(c));
                i(f.tweens) && e.add(f.tweens, 0, f.align, f.stagger)
            }
                , e = 1e-8
                , f = c._internals
                , g = d._internals = {}
                , h = f.isSelector
                , i = f.isArray
                , j = f.lazyTweens
                , k = f.lazyRender
                , l = _gsScope._gsDefine.globals
                , m = function (a) {
                    var b, c = {};
                    for (b in a)
                        c[b] = a[b];
                    return c
                }
                , n = function (a, b, c) {
                    var d, e, f = a.cycle;
                    for (d in f)
                        e = f[d],
                            a[d] = "function" == typeof e ? e(c, b[c], b) : e[c % e.length];
                    delete a.cycle
                }
                , o = g.pauseCallback = function () { }
                , p = function (a) {
                    var b, c = [], d = a.length;
                    for (b = 0; b !== d; c.push(a[b++]))
                        ;
                    return c
                }
                , q = function (a, b, c, d) {
                    var e = "immediateRender";
                    return e in b || (b[e] = !(c && c[e] === !1 || d)),
                        b
                }
                , r = function (a) {
                    if ("function" == typeof a)
                        return a;
                    var b = "object" == typeof a ? a : {
                        each: a
                    }
                        , c = b.ease
                        , d = b.from || 0
                        , e = b.base || 0
                        , f = {}
                        , g = isNaN(d)
                        , h = b.axis
                        , i = {
                            center: .5,
                            end: 1
                        }[d] || 0;
                    return function (a, j, k) {
                        var l, m, n, o, p, q, r, s, t, u = (k || b).length, v = f[u];
                        if (!v) {
                            if (t = "auto" === b.grid ? 0 : (b.grid || [1 / 0])[0],
                                !t) {
                                for (r = -(1 / 0); r < (r = k[t++].getBoundingClientRect().left) && u > t;)
                                    ;
                                t--
                            }
                            for (v = f[u] = [],
                                l = g ? Math.min(t, u) * i - .5 : d % t,
                                m = g ? u * i / t - .5 : d / t | 0,
                                r = 0,
                                s = 1 / 0,
                                q = 0; u > q; q++)
                                n = q % t - l,
                                    o = m - (q / t | 0),
                                    v[q] = p = h ? Math.abs("y" === h ? o : n) : Math.sqrt(n * n + o * o),
                                    p > r && (r = p),
                                    s > p && (s = p);
                            v.max = r - s,
                                v.min = s,
                                v.v = u = b.amount || b.each * (t > u ? u : h ? "y" === h ? u / t : t : Math.max(t, u / t)) || 0,
                                v.b = 0 > u ? e - u : e
                        }
                        return u = (v[a] - v.min) / v.max,
                            v.b + (c ? c.getRatio(u) : u) * v.v
                    }
                }
                , s = d.prototype = new b;
            return d.version = "2.1.2",
                d.distribute = r,
                s.constructor = d,
                s.kill()._gc = s._forcingPlayhead = s._hasPause = !1,
                s.to = function (a, b, d, e) {
                    var f = d.repeat && l.TweenMax || c;
                    return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
                }
                ,
                s.from = function (a, b, d, e) {
                    return this.add((d.repeat && l.TweenMax || c).from(a, b, q(this, d)), e)
                }
                ,
                s.fromTo = function (a, b, d, e, f) {
                    var g = e.repeat && l.TweenMax || c;
                    return e = q(this, e, d),
                        b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
                }
                ,
                s.staggerTo = function (a, b, e, f, g, i, j, k) {
                    var l, o, q = new d({
                        onComplete: i,
                        onCompleteParams: j,
                        callbackScope: k,
                        smoothChildTiming: this.smoothChildTiming
                    }), s = r(e.stagger || f), t = e.startAt, u = e.cycle;
                    for ("string" == typeof a && (a = c.selector(a) || a),
                        a = a || [],
                        h(a) && (a = p(a)),
                        o = 0; o < a.length; o++)
                        l = m(e),
                            t && (l.startAt = m(t),
                                t.cycle && n(l.startAt, a, o)),
                            u && (n(l, a, o),
                                null != l.duration && (b = l.duration,
                                    delete l.duration)),
                            q.to(a[o], b, l, s(o, a[o], a));
                    return this.add(q, g)
                }
                ,
                s.staggerFrom = function (a, b, c, d, e, f, g, h) {
                    return c.runBackwards = !0,
                        this.staggerTo(a, b, q(this, c), d, e, f, g, h)
                }
                ,
                s.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
                    return d.startAt = c,
                        this.staggerTo(a, b, q(this, d, c), e, f, g, h, i)
                }
                ,
                s.call = function (a, b, d, e) {
                    return this.add(c.delayedCall(0, a, b, d), e)
                }
                ,
                s.set = function (a, b, d) {
                    return this.add(new c(a, 0, q(this, b, null, !0)), d)
                }
                ,
                d.exportRoot = function (a, b) {
                    a = a || {},
                        null == a.smoothChildTiming && (a.smoothChildTiming = !0);
                    var e, f, g, h, i = new d(a), j = i._timeline;
                    for (null == b && (b = !0),
                        j._remove(i, !0),
                        i._startTime = 0,
                        i._rawPrevTime = i._time = i._totalTime = j._time,
                        g = j._first; g;)
                        h = g._next,
                            b && g instanceof c && g.target === g.vars.onComplete || (f = g._startTime - g._delay,
                                0 > f && (e = 1),
                                i.add(g, f)),
                            g = h;
                    return j.add(i, 0),
                        e && i.totalDuration(),
                        i
                }
                ,
                s.add = function (e, f, g, h) {
                    var j, k, l, m, n, o, p = this;
                    if ("number" != typeof f && (f = p._parseTimeOrLabel(f, 0, !0, e)),
                        !(e instanceof a)) {
                        if (e instanceof Array || e && e.push && i(e)) {
                            for (g = g || "normal",
                                h = h || 0,
                                j = f,
                                k = e.length,
                                l = 0; k > l; l++)
                                i(m = e[l]) && (m = new d({
                                    tweens: m
                                })),
                                    p.add(m, j),
                                    "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())),
                                    j += h;
                            return p._uncache(!0)
                        }
                        if ("string" == typeof e)
                            return p.addLabel(e, f);
                        if ("function" != typeof e)
                            throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                        e = c.delayedCall(0, e)
                    }
                    if (b.prototype.add.call(p, e, f),
                        (e._time || !e._duration && e._initted) && (j = (p.rawTime() - e._startTime) * e._timeScale,
                            (!e._duration || Math.abs(Math.max(0, Math.min(e.totalDuration(), j))) - e._totalTime > 1e-5) && e.render(j, !1, !1)),
                        (p._gc || p._time === p._duration) && !p._paused && p._duration < p.duration())
                        for (n = p,
                            o = n.rawTime() > e._startTime; n._timeline;)
                            o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1),
                                n = n._timeline;
                    return p
                }
                ,
                s.remove = function (b) {
                    if (b instanceof a) {
                        this._remove(b, !1);
                        var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
                        return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale,
                            this
                    }
                    if (b instanceof Array || b && b.push && i(b)) {
                        for (var d = b.length; --d > -1;)
                            this.remove(b[d]);
                        return this
                    }
                    return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
                }
                ,
                s._remove = function (a, c) {
                    b.prototype._remove.call(this, a, c);
                    var d = this._last;
                    return d ? this._time > this.duration() && (this._time = this._duration,
                        this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
                        this
                }
                ,
                s.append = function (a, b) {
                    return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
                }
                ,
                s.insert = s.insertMultiple = function (a, b, c, d) {
                    return this.add(a, b || 0, c, d)
                }
                ,
                s.appendMultiple = function (a, b, c, d) {
                    return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
                }
                ,
                s.addLabel = function (a, b) {
                    return this._labels[a] = this._parseTimeOrLabel(b),
                        this
                }
                ,
                s.addPause = function (a, b, d, e) {
                    var f = c.delayedCall(0, o, d, e || this);
                    return f.vars.onComplete = f.vars.onReverseComplete = b,
                        f.data = "isPause",
                        this._hasPause = !0,
                        this.add(f, a)
                }
                ,
                s.removeLabel = function (a) {
                    return delete this._labels[a],
                        this
                }
                ,
                s.getLabelTime = function (a) {
                    return null != this._labels[a] ? this._labels[a] : -1
                }
                ,
                s._parseTimeOrLabel = function (b, c, d, e) {
                    var f, g;
                    if (e instanceof a && e.timeline === this)
                        this.remove(e);
                    else if (e && (e instanceof Array || e.push && i(e)))
                        for (g = e.length; --g > -1;)
                            e[g] instanceof a && e[g].timeline === this && this.remove(e[g]);
                    if (f = "number" != typeof b || c ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0,
                        "string" == typeof c)
                        return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - f : 0, d);
                    if (c = c || 0,
                        "string" != typeof b || !isNaN(b) && null == this._labels[b])
                        null == b && (b = f);
                    else {
                        if (g = b.indexOf("="),
                            -1 === g)
                            return null == this._labels[b] ? d ? this._labels[b] = f + c : c : this._labels[b] + c;
                        c = parseInt(b.charAt(g - 1) + "1", 10) * Number(b.substr(g + 1)),
                            b = g > 1 ? this._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f
                    }
                    return Number(b) + c
                }
                ,
                s.seek = function (a, b) {
                    return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
                }
                ,
                s.stop = function () {
                    return this.paused(!0)
                }
                ,
                s.gotoAndPlay = function (a, b) {
                    return this.play(a, b)
                }
                ,
                s.gotoAndStop = function (a, b) {
                    return this.pause(a, b)
                }
                ,
                s.render = function (a, b, c) {
                    this._gc && this._enabled(!0, !1);
                    var d, f, g, h, i, l, m, n, o = this, p = o._time, q = o._dirty ? o.totalDuration() : o._totalDuration, r = o._startTime, s = o._timeScale, t = o._paused;
                    if (p !== o._time && (a += o._time - p),
                        a >= q - e && a >= 0)
                        o._totalTime = o._time = q,
                            o._reversed || o._hasPausedChild() || (f = !0,
                                h = "onComplete",
                                i = !!o._timeline.autoRemoveChildren,
                                0 === o._duration && (0 >= a && a >= -e || o._rawPrevTime < 0 || o._rawPrevTime === e) && o._rawPrevTime !== a && o._first && (i = !0,
                                    o._rawPrevTime > e && (h = "onReverseComplete"))),
                            o._rawPrevTime = o._duration || !b || a || o._rawPrevTime === a ? a : e,
                            a = q + 1e-4;
                    else if (e > a)
                        if (o._totalTime = o._time = 0,
                            a > -e && (a = 0),
                            (0 !== p || 0 === o._duration && o._rawPrevTime !== e && (o._rawPrevTime > 0 || 0 > a && o._rawPrevTime >= 0)) && (h = "onReverseComplete",
                                f = o._reversed),
                            0 > a)
                            o._active = !1,
                                o._timeline.autoRemoveChildren && o._reversed ? (i = f = !0,
                                    h = "onReverseComplete") : o._rawPrevTime >= 0 && o._first && (i = !0),
                                o._rawPrevTime = a;
                        else {
                            if (o._rawPrevTime = o._duration || !b || a || o._rawPrevTime === a ? a : e,
                                0 === a && f)
                                for (d = o._first; d && 0 === d._startTime;)
                                    d._duration || (f = !1),
                                        d = d._next;
                            a = 0,
                                o._initted || (i = !0)
                        }
                    else {
                        if (o._hasPause && !o._forcingPlayhead && !b) {
                            if (a >= p)
                                for (d = o._first; d && d._startTime <= a && !l;)
                                    d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === o._rawPrevTime || (l = d),
                                        d = d._next;
                            else
                                for (d = o._last; d && d._startTime >= a && !l;)
                                    d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d),
                                        d = d._prev;
                            l && (o._time = o._totalTime = a = l._startTime,
                                n = o._startTime + a / o._timeScale)
                        }
                        o._totalTime = o._time = o._rawPrevTime = a
                    }
                    if (o._time !== p && o._first || c || i || l) {
                        if (o._initted || (o._initted = !0),
                            o._active || !o._paused && o._time !== p && a > 0 && (o._active = !0),
                            0 === p && o.vars.onStart && (0 === o._time && o._duration || b || o._callback("onStart")),
                            m = o._time,
                            m >= p)
                            for (d = o._first; d && (g = d._next,
                                m === o._time && (!o._paused || t));)
                                (d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && (o.pause(),
                                    o._pauseTime = n),
                                    d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)),
                                    d = g;
                        else
                            for (d = o._last; d && (g = d._prev,
                                m === o._time && (!o._paused || t));) {
                                if (d._active || d._startTime <= p && !d._paused && !d._gc) {
                                    if (l === d) {
                                        for (l = d._prev; l && l.endTime() > o._time;)
                                            l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c),
                                                l = l._prev;
                                        l = null,
                                            o.pause(),
                                            o._pauseTime = n
                                    }
                                    d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                                }
                                d = g
                            }
                        o._onUpdate && (b || (j.length && k(),
                            o._callback("onUpdate"))),
                            h && (o._gc || (r === o._startTime || s !== o._timeScale) && (0 === o._time || q >= o.totalDuration()) && (f && (j.length && k(),
                                o._timeline.autoRemoveChildren && o._enabled(!1, !1),
                                o._active = !1),
                                !b && o.vars[h] && o._callback(h)))
                    }
                }
                ,
                s._hasPausedChild = function () {
                    for (var a = this._first; a;) {
                        if (a._paused || a instanceof d && a._hasPausedChild())
                            return !0;
                        a = a._next
                    }
                    return !1
                }
                ,
                s.getChildren = function (a, b, d, e) {
                    e = e || -9999999999;
                    for (var f = [], g = this._first, h = 0; g;)
                        g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g),
                            a !== !1 && (f = f.concat(g.getChildren(!0, b, d)),
                                h = f.length))),
                            g = g._next;
                    return f
                }
                ,
                s.getTweensOf = function (a, b) {
                    var d, e, f = this._gc, g = [], h = 0;
                    for (f && this._enabled(!0, !0),
                        d = c.getTweensOf(a),
                        e = d.length; --e > -1;)
                        (d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
                    return f && this._enabled(!1, !0),
                        g
                }
                ,
                s.recent = function () {
                    return this._recent
                }
                ,
                s._contains = function (a) {
                    for (var b = a.timeline; b;) {
                        if (b === this)
                            return !0;
                        b = b.timeline
                    }
                    return !1
                }
                ,
                s.shiftChildren = function (a, b, c) {
                    c = c || 0;
                    for (var d, e = this._first, f = this._labels; e;)
                        e._startTime >= c && (e._startTime += a),
                            e = e._next;
                    if (b)
                        for (d in f)
                            f[d] >= c && (f[d] += a);
                    return this._uncache(!0)
                }
                ,
                s._kill = function (a, b) {
                    if (!a && !b)
                        return this._enabled(!1, !1);
                    for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;)
                        c[d]._kill(a, b) && (e = !0);
                    return e
                }
                ,
                s.clear = function (a) {
                    var b = this.getChildren(!1, !0, !0)
                        , c = b.length;
                    for (this._time = this._totalTime = 0; --c > -1;)
                        b[c]._enabled(!1, !1);
                    return a !== !1 && (this._labels = {}),
                        this._uncache(!0)
                }
                ,
                s.invalidate = function () {
                    for (var b = this._first; b;)
                        b.invalidate(),
                            b = b._next;
                    return a.prototype.invalidate.call(this)
                }
                ,
                s._enabled = function (a, c) {
                    if (a === this._gc)
                        for (var d = this._first; d;)
                            d._enabled(a, !0),
                                d = d._next;
                    return b.prototype._enabled.call(this, a, c)
                }
                ,
                s.totalTime = function (b, c, d) {
                    this._forcingPlayhead = !0;
                    var e = a.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1,
                        e
                }
                ,
                s.duration = function (a) {
                    return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a),
                        this) : (this._dirty && this.totalDuration(),
                            this._duration)
                }
                ,
                s.totalDuration = function (a) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var b, c, d = 0, e = this, f = e._last, g = 999999999999; f;)
                                b = f._prev,
                                    f._dirty && f.totalDuration(),
                                    f._startTime > g && e._sortChildren && !f._paused && !e._calculatingDuration ? (e._calculatingDuration = 1,
                                        e.add(f, f._startTime - f._delay),
                                        e._calculatingDuration = 0) : g = f._startTime,
                                    f._startTime < 0 && !f._paused && (d -= f._startTime,
                                        e._timeline.smoothChildTiming && (e._startTime += f._startTime / e._timeScale,
                                            e._time -= f._startTime,
                                            e._totalTime -= f._startTime,
                                            e._rawPrevTime -= f._startTime),
                                        e.shiftChildren(-f._startTime, !1, -9999999999),
                                        g = 0),
                                    c = f._startTime + f._totalDuration / f._timeScale,
                                    c > d && (d = c),
                                    f = b;
                            e._duration = e._totalDuration = d,
                                e._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
                }
                ,
                s.paused = function (b) {
                    if (b === !1 && this._paused)
                        for (var c = this._first; c;)
                            c._startTime === this._time && "isPause" === c.data && (c._rawPrevTime = 0),
                                c = c._next;
                    return a.prototype.paused.apply(this, arguments)
                }
                ,
                s.usesFrames = function () {
                    for (var b = this._timeline; b._timeline;)
                        b = b._timeline;
                    return b === a._rootFramesTimeline
                }
                ,
                s.rawTime = function (a) {
                    return a && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(a) - this._startTime) * this._timeScale
                }
                ,
                d
        }, !0),
        _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (a, b, c) {
            var d = function (b) {
                a.call(this, b),
                    this._repeat = this.vars.repeat || 0,
                    this._repeatDelay = this.vars.repeatDelay || 0,
                    this._cycle = 0,
                    this._yoyo = !!this.vars.yoyo,
                    this._dirty = !0
            }
                , e = 1e-8
                , f = b._internals
                , g = f.lazyTweens
                , h = f.lazyRender
                , i = _gsScope._gsDefine.globals
                , j = new c(null, null, 1, 0)
                , k = d.prototype = new a;
            return k.constructor = d,
                k.kill()._gc = !1,
                d.version = "2.1.2",
                k.invalidate = function () {
                    return this._yoyo = !!this.vars.yoyo,
                        this._repeat = this.vars.repeat || 0,
                        this._repeatDelay = this.vars.repeatDelay || 0,
                        this._uncache(!0),
                        a.prototype.invalidate.call(this)
                }
                ,
                k.addCallback = function (a, c, d, e) {
                    return this.add(b.delayedCall(0, a, d, e), c)
                }
                ,
                k.removeCallback = function (a, b) {
                    if (a)
                        if (null == b)
                            this._kill(null, a);
                        else
                            for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;)
                                c[d]._startTime === e && c[d]._enabled(!1, !1);
                    return this
                }
                ,
                k.removePause = function (b) {
                    return this.removeCallback(a._internals.pauseCallback, b)
                }
                ,
                k.tweenTo = function (a, c) {
                    c = c || {};
                    var d, e, f, g = {
                        ease: j,
                        useFrames: this.usesFrames(),
                        immediateRender: !1,
                        lazy: !1
                    }, h = c.repeat && i.TweenMax || b;
                    for (e in c)
                        g[e] = c[e];
                    return g.time = this._parseTimeOrLabel(a),
                        d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001,
                        f = new h(this, d, g),
                        g.onStart = function () {
                            f.target.paused(!0),
                                f.vars.time === f.target.time() || d !== f.duration() || f.isFromTo || f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale).render(f.time(), !0, !0),
                                c.onStart && c.onStart.apply(c.onStartScope || c.callbackScope || f, c.onStartParams || [])
                        }
                        ,
                        f
                }
                ,
                k.tweenFromTo = function (a, b, c) {
                    c = c || {},
                        a = this._parseTimeOrLabel(a),
                        c.startAt = {
                            onComplete: this.seek,
                            onCompleteParams: [a],
                            callbackScope: this
                        },
                        c.immediateRender = c.immediateRender !== !1;
                    var d = this.tweenTo(b, c);
                    return d.isFromTo = 1,
                        d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
                }
                ,
                k.render = function (a, b, c) {
                    this._gc && this._enabled(!0, !1);
                    var d, f, i, j, k, l, m, n, o, p = this, q = p._time, r = p._dirty ? p.totalDuration() : p._totalDuration, s = p._duration, t = p._totalTime, u = p._startTime, v = p._timeScale, w = p._rawPrevTime, x = p._paused, y = p._cycle;
                    if (q !== p._time && (a += p._time - q),
                        a >= r - e && a >= 0)
                        p._locked || (p._totalTime = r,
                            p._cycle = p._repeat),
                            p._reversed || p._hasPausedChild() || (f = !0,
                                j = "onComplete",
                                k = !!p._timeline.autoRemoveChildren,
                                0 === p._duration && (0 >= a && a >= -e || 0 > w || w === e) && w !== a && p._first && (k = !0,
                                    w > e && (j = "onReverseComplete"))),
                            p._rawPrevTime = p._duration || !b || a || p._rawPrevTime === a ? a : e,
                            p._yoyo && 1 & p._cycle ? p._time = a = 0 : (p._time = s,
                                a = s + 1e-4);
                    else if (e > a)
                        if (p._locked || (p._totalTime = p._cycle = 0),
                            p._time = 0,
                            a > -e && (a = 0),
                            (0 !== q || 0 === s && w !== e && (w > 0 || 0 > a && w >= 0) && !p._locked) && (j = "onReverseComplete",
                                f = p._reversed),
                            0 > a)
                            p._active = !1,
                                p._timeline.autoRemoveChildren && p._reversed ? (k = f = !0,
                                    j = "onReverseComplete") : w >= 0 && p._first && (k = !0),
                                p._rawPrevTime = a;
                        else {
                            if (p._rawPrevTime = s || !b || a || p._rawPrevTime === a ? a : e,
                                0 === a && f)
                                for (d = p._first; d && 0 === d._startTime;)
                                    d._duration || (f = !1),
                                        d = d._next;
                            a = 0,
                                p._initted || (k = !0)
                        }
                    else if (0 === s && 0 > w && (k = !0),
                        p._time = p._rawPrevTime = a,
                        p._locked || (p._totalTime = a,
                            0 !== p._repeat && (l = s + p._repeatDelay,
                                p._cycle = p._totalTime / l >> 0,
                                p._cycle && p._cycle === p._totalTime / l && a >= t && p._cycle--,
                                p._time = p._totalTime - p._cycle * l,
                                p._yoyo && 1 & p._cycle && (p._time = s - p._time),
                                p._time > s ? (p._time = s,
                                    a = s + 1e-4) : p._time < 0 ? p._time = a = 0 : a = p._time)),
                        p._hasPause && !p._forcingPlayhead && !b) {
                        if (a = p._time,
                            a >= q || p._repeat && y !== p._cycle)
                            for (d = p._first; d && d._startTime <= a && !m;)
                                d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === p._rawPrevTime || (m = d),
                                    d = d._next;
                        else
                            for (d = p._last; d && d._startTime >= a && !m;)
                                d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d),
                                    d = d._prev;
                        m && (o = p._startTime + m._startTime / p._timeScale,
                            m._startTime < s && (p._time = p._rawPrevTime = a = m._startTime,
                                p._totalTime = a + p._cycle * (p._totalDuration + p._repeatDelay)))
                    }
                    if (p._cycle !== y && !p._locked) {
                        var z = p._yoyo && 0 !== (1 & y)
                            , A = z === (p._yoyo && 0 !== (1 & p._cycle))
                            , B = p._totalTime
                            , C = p._cycle
                            , D = p._rawPrevTime
                            , E = p._time;
                        if (p._totalTime = y * s,
                            p._cycle < y ? z = !z : p._totalTime += s,
                            p._time = q,
                            p._rawPrevTime = 0 === s ? w - 1e-4 : w,
                            p._cycle = y,
                            p._locked = !0,
                            q = z ? 0 : s,
                            p.render(q, b, 0 === s),
                            b || p._gc || p.vars.onRepeat && (p._cycle = C,
                                p._locked = !1,
                                p._callback("onRepeat")),
                            q !== p._time)
                            return;
                        if (A && (p._cycle = y,
                            p._locked = !0,
                            q = z ? s + 1e-4 : -1e-4,
                            p.render(q, !0, !1)),
                            p._locked = !1,
                            p._paused && !x)
                            return;
                        p._time = E,
                            p._totalTime = B,
                            p._cycle = C,
                            p._rawPrevTime = D
                    }
                    if (!(p._time !== q && p._first || c || k || m))
                        return void (t !== p._totalTime && p._onUpdate && (b || p._callback("onUpdate")));
                    if (p._initted || (p._initted = !0),
                        p._active || !p._paused && p._totalTime !== t && a > 0 && (p._active = !0),
                        0 === t && p.vars.onStart && (0 === p._totalTime && p._totalDuration || b || p._callback("onStart")),
                        n = p._time,
                        n >= q)
                        for (d = p._first; d && (i = d._next,
                            n === p._time && (!p._paused || x));)
                            (d._active || d._startTime <= p._time && !d._paused && !d._gc) && (m === d && (p.pause(),
                                p._pauseTime = o),
                                d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)),
                                d = i;
                    else
                        for (d = p._last; d && (i = d._prev,
                            n === p._time && (!p._paused || x));) {
                            if (d._active || d._startTime <= q && !d._paused && !d._gc) {
                                if (m === d) {
                                    for (m = d._prev; m && m.endTime() > p._time;)
                                        m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c),
                                            m = m._prev;
                                    m = null,
                                        p.pause(),
                                        p._pauseTime = o
                                }
                                d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                            }
                            d = i
                        }
                    p._onUpdate && (b || (g.length && h(),
                        p._callback("onUpdate"))),
                        j && (p._locked || p._gc || (u === p._startTime || v !== p._timeScale) && (0 === p._time || r >= p.totalDuration()) && (f && (g.length && h(),
                            p._timeline.autoRemoveChildren && p._enabled(!1, !1),
                            p._active = !1),
                            !b && p.vars[j] && p._callback(j)))
                }
                ,
                k.getActive = function (a, b, c) {
                    var d, e, f = [], g = this.getChildren(a || null == a, b || null == a, !!c), h = 0, i = g.length;
                    for (d = 0; i > d; d++)
                        e = g[d],
                            e.isActive() && (f[h++] = e);
                    return f
                }
                ,
                k.getLabelAfter = function (a) {
                    a || 0 !== a && (a = this._time);
                    var b, c = this.getLabelsArray(), d = c.length;
                    for (b = 0; d > b; b++)
                        if (c[b].time > a)
                            return c[b].name;
                    return null
                }
                ,
                k.getLabelBefore = function (a) {
                    null == a && (a = this._time);
                    for (var b = this.getLabelsArray(), c = b.length; --c > -1;)
                        if (b[c].time < a)
                            return b[c].name;
                    return null
                }
                ,
                k.getLabelsArray = function () {
                    var a, b = [], c = 0;
                    for (a in this._labels)
                        b[c++] = {
                            time: this._labels[a],
                            name: a
                        };
                    return b.sort(function (a, b) {
                        return a.time - b.time
                    }),
                        b
                }
                ,
                k.invalidate = function () {
                    return this._locked = !1,
                        a.prototype.invalidate.call(this)
                }
                ,
                k.progress = function (a, b) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration() || 0
                }
                ,
                k.totalProgress = function (a, b) {
                    return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration() || 0
                }
                ,
                k.totalDuration = function (b) {
                    return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this),
                        this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
                        this._totalDuration)
                }
                ,
                k.time = function (a, b) {
                    if (!arguments.length)
                        return this._time;
                    this._dirty && this.totalDuration();
                    var c = this._duration
                        , d = this._cycle
                        , e = d * (c + this._repeatDelay);
                    return a > c && (a = c),
                        this.totalTime(this._yoyo && 1 & d ? c - a + e : this._repeat ? a + e : a, b)
                }
                ,
                k.repeat = function (a) {
                    return arguments.length ? (this._repeat = a,
                        this._uncache(!0)) : this._repeat
                }
                ,
                k.repeatDelay = function (a) {
                    return arguments.length ? (this._repeatDelay = a,
                        this._uncache(!0)) : this._repeatDelay
                }
                ,
                k.yoyo = function (a) {
                    return arguments.length ? (this._yoyo = a,
                        this) : this._yoyo
                }
                ,
                k.currentLabel = function (a) {
                    return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + e)
                }
                ,
                d
        }, !0),
        function () {
            var a = 180 / Math.PI
                , b = []
                , c = []
                , d = []
                , e = {}
                , f = _gsScope._gsDefine.globals
                , g = function (a, b, c, d) {
                    c === d && (c = d - (d - b) / 1e6),
                        a === b && (b = a + (c - a) / 1e6),
                        this.a = a,
                        this.b = b,
                        this.c = c,
                        this.d = d,
                        this.da = d - a,
                        this.ca = c - a,
                        this.ba = b - a
                }
                , h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,"
                , i = function (a, b, c, d) {
                    var e = {
                        a: a
                    }
                        , f = {}
                        , g = {}
                        , h = {
                            c: d
                        }
                        , i = (a + b) / 2
                        , j = (b + c) / 2
                        , k = (c + d) / 2
                        , l = (i + j) / 2
                        , m = (j + k) / 2
                        , n = (m - l) / 8;
                    return e.b = i + (a - i) / 4,
                        f.b = l + n,
                        e.c = f.a = (e.b + f.b) / 2,
                        f.c = g.a = (l + m) / 2,
                        g.b = m - n,
                        h.b = k + (d - k) / 4,
                        g.c = h.a = (g.b + h.b) / 2,
                        [e, f, g, h]
                }
                , j = function (a, e, f, g, h) {
                    var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1, x = 0, y = a[0].a;
                    for (j = 0; w > j; j++)
                        n = a[x],
                            k = n.a,
                            l = n.d,
                            m = a[x + 1].d,
                            h ? (t = b[j],
                                u = c[j],
                                v = (u + t) * e * .25 / (g ? .5 : d[j] || .5),
                                o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0),
                                p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0),
                                q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5,
                                    p = l + (m - l) * e * .5,
                                    q = l - (o + p) / 2),
                            o += q,
                            p += q,
                            n.c = r = o,
                            0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a),
                            n.da = l - k,
                            n.ca = r - k,
                            n.ba = y - k,
                            f ? (s = i(k, y, r, l),
                                a.splice(x, 1, s[0], s[1], s[2], s[3]),
                                x += 4) : x++,
                            y = p;
                    n = a[x],
                        n.b = y,
                        n.c = y + .4 * (n.d - y),
                        n.da = n.d - n.a,
                        n.ca = n.c - n.a,
                        n.ba = y - n.a,
                        f && (s = i(n.a, y, n.c, n.d),
                            a.splice(x, 1, s[0], s[1], s[2], s[3]))
                }
                , k = function (a, d, e, f) {
                    var h, i, j, k, l, m, n = [];
                    if (f)
                        for (a = [f].concat(a),
                            i = a.length; --i > -1;)
                            "string" == typeof (m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
                    if (h = a.length - 2,
                        0 > h)
                        return n[0] = new g(a[0][d], 0, 0, a[0][d]),
                            n;
                    for (i = 0; h > i; i++)
                        j = a[i][d],
                            k = a[i + 1][d],
                            n[i] = new g(j, 0, 0, k),
                            e && (l = a[i + 2][d],
                                b[i] = (b[i] || 0) + (k - j) * (k - j),
                                c[i] = (c[i] || 0) + (l - k) * (l - k));
                    return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]),
                        n
                }
                , l = function (a, f, g, i, l, m) {
                    var n, o, p, q, r, s, t, u, v = {}, w = [], x = m || a[0];
                    l = "string" == typeof l ? "," + l + "," : h,
                        null == f && (f = 1);
                    for (o in a[0])
                        w.push(o);
                    if (a.length > 1) {
                        for (u = a[a.length - 1],
                            t = !0,
                            n = w.length; --n > -1;)
                            if (o = w[n],
                                Math.abs(x[o] - u[o]) > .05) {
                                t = !1;
                                break
                            }
                        t && (a = a.concat(),
                            m && a.unshift(m),
                            a.push(a[1]),
                            m = a[a.length - 3])
                    }
                    for (b.length = c.length = d.length = 0,
                        n = w.length; --n > -1;)
                        o = w[n],
                            e[o] = -1 !== l.indexOf("," + o + ","),
                            v[o] = k(a, o, e[o], m);
                    for (n = b.length; --n > -1;)
                        b[n] = Math.sqrt(b[n]),
                            c[n] = Math.sqrt(c[n]);
                    if (!i) {
                        for (n = w.length; --n > -1;)
                            if (e[o])
                                for (p = v[w[n]],
                                    s = p.length - 1,
                                    q = 0; s > q; q++)
                                    r = p[q + 1].da / c[q] + p[q].da / b[q] || 0,
                                        d[q] = (d[q] || 0) + r * r;
                        for (n = d.length; --n > -1;)
                            d[n] = Math.sqrt(d[n]);
                    }
                    for (n = w.length,
                        q = g ? 4 : 1; --n > -1;)
                        o = w[n],
                            p = v[o],
                            j(p, f, g, i, e[o]),
                            t && (p.splice(0, q),
                                p.splice(p.length - q, q));
                    return v
                }
                , m = function (a, b, c) {
                    b = b || "soft";
                    var d, e, f, h, i, j, k, l, m, n, o, p = {}, q = "cubic" === b ? 3 : 2, r = "soft" === b, s = [];
                    if (r && c && (a = [c].concat(a)),
                        null == a || a.length < q + 1)
                        throw "invalid Bezier data";
                    for (m in a[0])
                        s.push(m);
                    for (j = s.length; --j > -1;) {
                        for (m = s[j],
                            p[m] = i = [],
                            n = 0,
                            l = a.length,
                            k = 0; l > k; k++)
                            d = null == c ? a[k][m] : "string" == typeof (o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o),
                                r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2),
                                i[n++] = d;
                        for (l = n - q + 1,
                            n = 0,
                            k = 0; l > k; k += q)
                            d = i[k],
                                e = i[k + 1],
                                f = i[k + 2],
                                h = 2 === q ? 0 : i[k + 3],
                                i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
                        i.length = n
                    }
                    return p
                }
                , n = function (a, b, c) {
                    for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)
                        for (m = a[p],
                            f = m.a,
                            g = m.d - f,
                            h = m.c - f,
                            i = m.b - f,
                            d = e = 0,
                            k = 1; c >= k; k++)
                            j = o * k,
                                l = 1 - j,
                                d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j),
                                n = p * c + k - 1,
                                b[n] = (b[n] || 0) + d * d
                }
                , o = function (a, b) {
                    b = b >> 0 || 6;
                    var c, d, e, f, g = [], h = [], i = 0, j = 0, k = b - 1, l = [], m = [];
                    for (c in a)
                        n(a[c], g, b);
                    for (e = g.length,
                        d = 0; e > d; d++)
                        i += Math.sqrt(g[d]),
                            f = d % b,
                            m[f] = i,
                            f === k && (j += i,
                                f = d / b >> 0,
                                l[f] = m,
                                h[f] = j,
                                i = 0,
                                m = []);
                    return {
                        length: j,
                        lengths: h,
                        segments: l
                    }
                }
                , p = _gsScope._gsDefine.plugin({
                    propName: "bezier",
                    priority: -1,
                    version: "1.3.8",
                    API: 2,
                    global: !0,
                    init: function (a, b, c) {
                        this._target = a,
                            b instanceof Array && (b = {
                                values: b
                            }),
                            this._func = {},
                            this._mod = {},
                            this._props = [],
                            this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
                        var d, e, f, g, h, i = b.values || [], j = {}, k = i[0], n = b.autoRotate || c.vars.orientToBezier;
                        this._autoRotate = n ? n instanceof Array ? n : [["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]] : null;
                        for (d in k)
                            this._props.push(d);
                        for (f = this._props.length; --f > -1;)
                            d = this._props[f],
                                this._overwriteProps.push(d),
                                e = this._func[d] = "function" == typeof a[d],
                                j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]),
                                h || j[d] !== i[0][d] && (h = j);
                        if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j),
                            this._segCount = this._beziers[d].length,
                            this._timeRes) {
                            var p = o(this._beziers, this._timeRes);
                            this._length = p.length,
                                this._lengths = p.lengths,
                                this._segments = p.segments,
                                this._l1 = this._li = this._s1 = this._si = 0,
                                this._l2 = this._lengths[0],
                                this._curSeg = this._segments[0],
                                this._s2 = this._curSeg[0],
                                this._prec = 1 / this._curSeg.length
                        }
                        if (n = this._autoRotate)
                            for (this._initialRotations = [],
                                n[0] instanceof Array || (this._autoRotate = n = [n]),
                                f = n.length; --f > -1;) {
                                for (g = 0; 3 > g; g++)
                                    d = n[f][g],
                                        this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
                                d = n[f][2],
                                    this._initialRotations[f] = (this._func[d] ? this._func[d].call(this._target) : this._target[d]) || 0,
                                    this._overwriteProps.push(d)
                            }
                        return this._startRatio = c.vars.runBackwards ? 1 : 0,
                            !0
                    },
                    set: function (b) {
                        var c, d, e, f, g, h, i, j, k, l, m = this._segCount, n = this._func, o = this._target, p = b !== this._startRatio;
                        if (this._timeRes) {
                            if (k = this._lengths,
                                l = this._curSeg,
                                b *= this._length,
                                e = this._li,
                                b > this._l2 && m - 1 > e) {
                                for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;)
                                    ;
                                this._l1 = k[e - 1],
                                    this._li = e,
                                    this._curSeg = l = this._segments[e],
                                    this._s2 = l[this._s1 = this._si = 0]
                            } else if (b < this._l1 && e > 0) {
                                for (; e > 0 && (this._l1 = k[--e]) >= b;)
                                    ;
                                0 === e && b < this._l1 ? this._l1 = 0 : e++,
                                    this._l2 = k[e],
                                    this._li = e,
                                    this._curSeg = l = this._segments[e],
                                    this._s1 = l[(this._si = l.length - 1) - 1] || 0,
                                    this._s2 = l[this._si]
                            }
                            if (c = e,
                                b -= this._l1,
                                e = this._si,
                                b > this._s2 && e < l.length - 1) {
                                for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;)
                                    ;
                                this._s1 = l[e - 1],
                                    this._si = e
                            } else if (b < this._s1 && e > 0) {
                                for (; e > 0 && (this._s1 = l[--e]) >= b;)
                                    ;
                                0 === e && b < this._s1 ? this._s1 = 0 : e++,
                                    this._s2 = l[e],
                                    this._si = e
                            }
                            h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                        } else
                            c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0,
                                h = (b - c * (1 / m)) * m;
                        for (d = 1 - h,
                            e = this._props.length; --e > -1;)
                            f = this._props[e],
                                g = this._beziers[f][c],
                                i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a,
                                this._mod[f] && (i = this._mod[f](i, o)),
                                n[f] ? o[f](i) : o[f] = i;
                        if (this._autoRotate) {
                            var q, r, s, t, u, v, w, x = this._autoRotate;
                            for (e = x.length; --e > -1;)
                                f = x[e][2],
                                    v = x[e][3] || 0,
                                    w = x[e][4] === !0 ? 1 : a,
                                    g = this._beziers[x[e][0]],
                                    q = this._beziers[x[e][1]],
                                    g && q && (g = g[c],
                                        q = q[c],
                                        r = g.a + (g.b - g.a) * h,
                                        t = g.b + (g.c - g.b) * h,
                                        r += (t - r) * h,
                                        t += (g.c + (g.d - g.c) * h - t) * h,
                                        s = q.a + (q.b - q.a) * h,
                                        u = q.b + (q.c - q.b) * h,
                                        s += (u - s) * h,
                                        u += (q.c + (q.d - q.c) * h - u) * h,
                                        i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e],
                                        this._mod[f] && (i = this._mod[f](i, o)),
                                        n[f] ? o[f](i) : o[f] = i)
                        }
                    }
                })
                , q = p.prototype;
            p.bezierThrough = l,
                p.cubicToQuadratic = i,
                p._autoCSS = !0,
                p.quadraticToCubic = function (a, b, c) {
                    return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
                }
                ,
                p._cssRegister = function () {
                    var a = f.CSSPlugin;
                    if (a) {
                        var b = a._internals
                            , c = b._parseToProxy
                            , d = b._setPluginRatio
                            , e = b.CSSPropTween;
                        b._registerComplexSpecialProp("bezier", {
                            parser: function (a, b, f, g, h, i) {
                                b instanceof Array && (b = {
                                    values: b
                                }),
                                    i = new p;
                                var j, k, l, m = b.values, n = m.length - 1, o = [], q = {};
                                if (0 > n)
                                    return h;
                                for (j = 0; n >= j; j++)
                                    l = c(a, m[j], g, h, i, n !== j),
                                        o[j] = l.end;
                                for (k in b)
                                    q[k] = b[k];
                                return q.values = o,
                                    h = new e(a, "bezier", 0, 0, l.pt, 2),
                                    h.data = l,
                                    h.plugin = i,
                                    h.setRatio = d,
                                    0 === q.autoRotate && (q.autoRotate = !0),
                                    !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate),
                                        q.autoRotate = null != l.end.left ? [["left", "top", "rotation", j, !1]] : null != l.end.x ? [["x", "y", "rotation", j, !1]] : !1),
                                    q.autoRotate && (g._transform || g._enableTransforms(!1),
                                        l.autoRotate = g._target._gsTransform,
                                        l.proxy.rotation = l.autoRotate.rotation || 0,
                                        g._overwriteProps.push("rotation")),
                                    i._onInitTween(l.proxy, q, g._tween),
                                    h
                            }
                        })
                    }
                }
                ,
                q._mod = function (a) {
                    for (var b, c = this._overwriteProps, d = c.length; --d > -1;)
                        b = a[c[d]],
                            b && "function" == typeof b && (this._mod[c[d]] = b)
                }
                ,
                q._kill = function (a) {
                    var b, c, d = this._props;
                    for (b in this._beziers)
                        if (b in a)
                            for (delete this._beziers[b],
                                delete this._func[b],
                                c = d.length; --c > -1;)
                                d[c] === b && d.splice(c, 1);
                    if (d = this._autoRotate)
                        for (c = d.length; --c > -1;)
                            a[d[c][2]] && d.splice(c, 1);
                    return this._super._kill.call(this, a)
                }
        }(),
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b) {
            var c, d, e, f, g = function () {
                a.call(this, "css"),
                    this._overwriteProps.length = 0,
                    this.setRatio = g.prototype.setRatio
            }, h = _gsScope._gsDefine.globals, i = {}, j = g.prototype = new a("css");
            j.constructor = g,
                g.version = "2.1.0",
                g.API = 2,
                g.defaultTransformPerspective = 0,
                g.defaultSkewType = "compensated",
                g.defaultSmoothOrigin = !0,
                j = "px",
                g.suffixMap = {
                    top: j,
                    right: j,
                    bottom: j,
                    left: j,
                    width: j,
                    height: j,
                    fontSize: j,
                    padding: j,
                    margin: j,
                    perspective: j,
                    lineHeight: ""
                };
            var k, l, m, n, o, p, q, r, s = /(?:\-|\.|\b)(\d|\.|e\-)+/g, t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, w = /(?:\d|\-|\+|=|#|\.)*/g, x = /opacity *= *([^)]*)/i, y = /opacity:([^;]*)/i, z = /alpha\(opacity *=.+?\)/i, A = /^(rgb|hsl)/, B = /([A-Z])/g, C = /-([a-z])/gi, D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, E = function (a, b) {
                return b.toUpperCase()
            }, F = /(?:Left|Right|Width)/i, G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, I = /,(?=[^\)]*(?:\(|$))/gi, J = /[\s,\(]/i, K = Math.PI / 180, L = 180 / Math.PI, M = {}, N = {
                style: {}
            }, O = _gsScope.document || {
                createElement: function () {
                    return N
                }
            }, P = function (a, b) {
                return b && O.createElementNS ? O.createElementNS(b, a) : O.createElement(a)
            }, Q = P("div"), R = P("img"), S = g._internals = {
                _specialProps: i
            }, T = (_gsScope.navigator || {}).userAgent || "", U = function () {
                var a = T.indexOf("Android")
                    , b = P("a");
                return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3),
                    o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6,
                    n = -1 !== T.indexOf("Firefox"),
                    (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) && (p = parseFloat(RegExp.$1)),
                    b ? (b.style.cssText = "top:1px;opacity:.55;",
                        /^0.55/.test(b.style.opacity)) : !1
            }(), V = function (a) {
                return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            }, W = function (a) {
                _gsScope.console && console.log(a)
            }, X = "", Y = "", Z = function (a, b) {
                b = b || Q;
                var c, d, e = b.style;
                if (void 0 !== e[a])
                    return a;
                for (a = a.charAt(0).toUpperCase() + a.substr(1),
                    c = ["O", "Moz", "ms", "Ms", "Webkit"],
                    d = 5; --d > -1 && void 0 === e[c[d] + a];)
                    ;
                return d >= 0 ? (Y = 3 === d ? "ms" : c[d],
                    X = "-" + Y.toLowerCase() + "-",
                    Y + a) : null
            }, $ = "undefined" != typeof window ? window : O.defaultView || {
                getComputedStyle: function () { }
            }, _ = function (a) {
                return $.getComputedStyle(a)
            }, aa = g.getStyle = function (a, b, c, d, e) {
                var f;
                return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || _(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]),
                    null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a)
            }
                , ba = S.convertToPixels = function (a, c, d, e, f) {
                    if ("px" === e || !e && "lineHeight" !== c)
                        return d;
                    if ("auto" === e || !d)
                        return 0;
                    var h, i, j, k = F.test(c), l = a, m = Q.style, n = 0 > d, o = 1 === d;
                    if (n && (d = -d),
                        o && (d *= 100),
                        "lineHeight" !== c || e)
                        if ("%" === e && -1 !== c.indexOf("border"))
                            h = d / 100 * (k ? a.clientWidth : a.clientHeight);
                        else {
                            if (m.cssText = "border:0 solid red;position:" + aa(a, "position") + ";line-height:0;",
                                "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e)
                                m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
                            else {
                                if (l = a.parentNode || O.body,
                                    -1 !== aa(l, "display").indexOf("flex") && (m.position = "absolute"),
                                    i = l._gsCache,
                                    j = b.ticker.frame,
                                    i && k && i.time === j)
                                    return i.width * d / 100;
                                m[k ? "width" : "height"] = d + e
                            }
                            l.appendChild(Q),
                                h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]),
                                l.removeChild(Q),
                                k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {},
                                    i.time = j,
                                    i.width = h / d * 100),
                                0 !== h || f || (h = ba(a, c, d, e, !0))
                        }
                    else
                        i = _(a).lineHeight,
                            a.style.lineHeight = d,
                            h = parseFloat(_(a).lineHeight),
                            a.style.lineHeight = i;
                    return o && (h /= 100),
                        n ? -h : h
                }
                , ca = S.calculateOffset = function (a, b, c) {
                    if ("absolute" !== aa(a, "position", c))
                        return 0;
                    var d = "left" === b ? "Left" : "Top"
                        , e = aa(a, "margin" + d, c);
                    return a["offset" + d] - (ba(a, b, parseFloat(e), e.replace(w, "")) || 0)
                }
                , da = function (a, b) {
                    var c, d, e, f = {};
                    if (b = b || _(a, null))
                        if (c = b.length)
                            for (; --c > -1;)
                                e = b[c],
                                    (-1 === e.indexOf("-transform") || Ea === e) && (f[e.replace(C, E)] = b.getPropertyValue(e));
                        else
                            for (c in b)
                                (-1 === c.indexOf("Transform") || Da === c) && (f[c] = b[c]);
                    else if (b = a.currentStyle || a.style)
                        for (c in b)
                            "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]);
                    return U || (f.opacity = V(a)),
                        d = Sa(a, b, !1),
                        f.rotation = d.rotation,
                        f.skewX = d.skewX,
                        f.scaleX = d.scaleX,
                        f.scaleY = d.scaleY,
                        f.x = d.x,
                        f.y = d.y,
                        Ga && (f.z = d.z,
                            f.rotationX = d.rotationX,
                            f.rotationY = d.rotationY,
                            f.scaleZ = d.scaleZ),
                        f.filters && delete f.filters,
                        f
                }, ea = function (a, b, c, d, e) {
                    var f, g, h, i = {}, j = a.style;
                    for (g in c)
                        "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : ca(a, g),
                            void 0 !== j[g] && (h = new ta(j, g, j[g], h)));
                    if (d)
                        for (g in d)
                            "className" !== g && (i[g] = d[g]);
                    return {
                        difs: i,
                        firstMPT: h
                    }
                }, fa = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                }, ga = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ha = function (a, b, c) {
                    if ("svg" === (a.nodeName + "").toLowerCase())
                        return (c || _(a))[b] || 0;
                    if (a.getCTM && Pa(a))
                        return a.getBBox()[b] || 0;
                    var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight)
                        , e = fa[b]
                        , f = e.length;
                    for (c = c || _(a, null); --f > -1;)
                        d -= parseFloat(aa(a, "padding" + e[f], c, !0)) || 0,
                            d -= parseFloat(aa(a, "border" + e[f] + "Width", c, !0)) || 0;
                    return d
                }, ia = function (a, b) {
                    if ("contain" === a || "auto" === a || "auto auto" === a)
                        return a + " ";
                    (null == a || "" === a) && (a = "0 0");
                    var c, d = a.split(" "), e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0], f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];
                    if (d.length > 3 && !b) {
                        for (d = a.split(", ").join(",").split(","),
                            a = [],
                            c = 0; c < d.length; c++)
                            a.push(ia(d[c]));
                        return a.join(",")
                    }
                    return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"),
                        ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"),
                        a = e + " " + f + (d.length > 2 ? " " + d[2] : ""),
                        b && (b.oxp = -1 !== e.indexOf("%"),
                            b.oyp = -1 !== f.indexOf("%"),
                            b.oxr = "=" === e.charAt(1),
                            b.oyr = "=" === f.charAt(1),
                            b.ox = parseFloat(e.replace(v, "")),
                            b.oy = parseFloat(f.replace(v, "")),
                            b.v = a),
                        b || a
                }, ja = function (a, b) {
                    return "function" == typeof a && (a = a(r, q)),
                        "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0
                }, ka = function (a, b) {
                    "function" == typeof a && (a = a(r, q));
                    var c = "string" == typeof a && "=" === a.charAt(1);
                    return "string" == typeof a && "v" === a.charAt(a.length - 2) && (a = (c ? a.substr(0, 2) : 0) + window["inner" + ("vh" === a.substr(-2) ? "Height" : "Width")] * (parseFloat(c ? a.substr(2) : a) / 100)),
                        null == a ? b : c ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0
                }, la = function (a, b, c, d) {
                    var e, f, g, h, i, j = 1e-6;
                    return "function" == typeof a && (a = a(r, q)),
                        null == a ? h = b : "number" == typeof a ? h = a : (e = 360,
                            f = a.split("_"),
                            i = "=" === a.charAt(1),
                            g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b),
                            f.length && (d && (d[c] = b + g),
                                -1 !== a.indexOf("short") && (g %= e,
                                    g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)),
                                -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)),
                            h = b + g),
                        j > h && h > -j && (h = 0),
                        h
                }, ma = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                }, na = function (a, b, c) {
                    return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a,
                        255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
                }, oa = g.parseColor = function (a, b) {
                    var c, d, e, f, g, h, i, j, k, l, m;
                    if (a)
                        if ("number" == typeof a)
                            c = [a >> 16, a >> 8 & 255, 255 & a];
                        else {
                            if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)),
                                ma[a])
                                c = ma[a];
                            else if ("#" === a.charAt(0))
                                4 === a.length && (d = a.charAt(1),
                                    e = a.charAt(2),
                                    f = a.charAt(3),
                                    a = "#" + d + d + e + e + f + f),
                                    a = parseInt(a.substr(1), 16),
                                    c = [a >> 16, a >> 8 & 255, 255 & a];
                            else if ("hsl" === a.substr(0, 3))
                                if (c = m = a.match(s),
                                    b) {
                                    if (-1 !== a.indexOf("="))
                                        return a.match(t)
                                } else
                                    g = Number(c[0]) % 360 / 360,
                                        h = Number(c[1]) / 100,
                                        i = Number(c[2]) / 100,
                                        e = .5 >= i ? i * (h + 1) : i + h - i * h,
                                        d = 2 * i - e,
                                        c.length > 3 && (c[3] = Number(c[3])),
                                        c[0] = na(g + 1 / 3, d, e),
                                        c[1] = na(g, d, e),
                                        c[2] = na(g - 1 / 3, d, e);
                            else
                                c = a.match(s) || ma.transparent;
                            c[0] = Number(c[0]),
                                c[1] = Number(c[1]),
                                c[2] = Number(c[2]),
                                c.length > 3 && (c[3] = Number(c[3]))
                        }
                    else
                        c = ma.black;
                    return b && !m && (d = c[0] / 255,
                        e = c[1] / 255,
                        f = c[2] / 255,
                        j = Math.max(d, e, f),
                        k = Math.min(d, e, f),
                        i = (j + k) / 2,
                        j === k ? g = h = 0 : (l = j - k,
                            h = i > .5 ? l / (2 - j - k) : l / (j + k),
                            g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4,
                            g *= 60),
                        c[0] = g + .5 | 0,
                        c[1] = 100 * h + .5 | 0,
                        c[2] = 100 * i + .5 | 0),
                        c
                }
                , pa = function (a, b) {
                    var c, d, e, f = a.match(qa) || [], g = 0, h = "";
                    if (!f.length)
                        return a;
                    for (c = 0; c < f.length; c++)
                        d = f[c],
                            e = a.substr(g, a.indexOf(d, g) - g),
                            g += e.length + d.length,
                            d = oa(d, b),
                            3 === d.length && d.push(1),
                            h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
                    return h + a.substr(g)
                }, qa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (j in ma)
                qa += "|" + j + "\\b";
            qa = new RegExp(qa + ")", "gi"),
                g.colorStringFilter = function (a) {
                    var b, c = a[0] + " " + a[1];
                    qa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("),
                        a[0] = pa(a[0], b),
                        a[1] = pa(a[1], b)),
                        qa.lastIndex = 0
                }
                ,
                b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
            var ra = function (a, b, c, d) {
                if (null == a)
                    return function (a) {
                        return a
                    }
                        ;
                var e, f = b ? (a.match(qa) || [""])[0] : "", g = a.split(f).join("").match(u) || [], h = a.substr(0, a.indexOf(g[0])), i = ")" === a.charAt(a.length - 1) ? ")" : "", j = -1 !== a.indexOf(" ") ? " " : ",", k = g.length, l = k > 0 ? g[0].replace(s, "") : "";
                return k ? e = b ? function (a) {
                    var b, m, n, o;
                    if ("number" == typeof a)
                        a += l;
                    else if (d && I.test(a)) {
                        for (o = a.replace(I, "|").split("|"),
                            n = 0; n < o.length; n++)
                            o[n] = e(o[n]);
                        return o.join(",")
                    }
                    if (b = (a.match(qa) || [f])[0],
                        m = a.split(b).join("").match(u) || [],
                        n = m.length,
                        k > n--)
                        for (; ++n < k;)
                            m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
                    return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
                }
                    : function (a) {
                        var b, f, m;
                        if ("number" == typeof a)
                            a += l;
                        else if (d && I.test(a)) {
                            for (f = a.replace(I, "|").split("|"),
                                m = 0; m < f.length; m++)
                                f[m] = e(f[m]);
                            return f.join(",")
                        }
                        if (b = a.match(u) || [],
                            m = b.length,
                            k > m--)
                            for (; ++m < k;)
                                b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
                        return h + b.join(j) + i
                    }
                    : function (a) {
                        return a
                    }
            }
                , sa = function (a) {
                    return a = a.split(","),
                        function (b, c, d, e, f, g, h) {
                            var i, j = (c + "").split(" ");
                            for (h = {},
                                i = 0; 4 > i; i++)
                                h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                            return e.parse(b, h, f, g)
                        }
                }
                , ta = (S._setPluginRatio = function (a) {
                    this.plugin.setRatio(a);
                    for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;)
                        b = h[i.v],
                            i.r ? b = i.r(b) : j > b && b > -j && (b = 0),
                            i.t[i.p] = b,
                            i = i._next;
                    if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod.call(this._tween, h.rotation, this.t, this._tween) : h.rotation),
                        1 === a || 0 === a)
                        for (i = g.firstMPT,
                            f = 1 === a ? "e" : "b"; i;) {
                            if (c = i.t,
                                c.type) {
                                if (1 === c.type) {
                                    for (e = c.xs0 + c.s + c.xs1,
                                        d = 1; d < c.l; d++)
                                        e += c["xn" + d] + c["xs" + (d + 1)];
                                    c[f] = e
                                }
                            } else
                                c[f] = c.s + c.xs0;
                            i = i._next
                        }
                }
                    ,
                    function (a, b, c, d, e) {
                        this.t = a,
                            this.p = b,
                            this.v = c,
                            this.r = e,
                            d && (d._prev = this,
                                this._next = d)
                    }
                )
                , ua = (S._parseToProxy = function (a, b, c, d, e, f) {
                    var g, h, i, j, k, l = d, m = {}, n = {}, o = c._transform, p = M;
                    for (c._transform = null,
                        M = b,
                        d = k = c.parse(a, b, d, e),
                        M = p,
                        f && (c._transform = o,
                            l && (l._prev = null,
                                l._prev && (l._prev._next = null))); d && d !== l;) {
                        if (d.type <= 1 && (h = d.p,
                            n[h] = d.s + d.c,
                            m[h] = d.s,
                            f || (j = new ta(d, "s", h, j, d.r),
                                d.c = 0),
                            1 === d.type))
                            for (g = d.l; --g > 0;)
                                i = "xn" + g,
                                    h = d.p + "_" + i,
                                    n[h] = d.data[i],
                                    m[h] = d[i],
                                    f || (j = new ta(d, i, h, j, d.rxp[i]));
                        d = d._next
                    }
                    return {
                        proxy: m,
                        end: n,
                        firstMPT: j,
                        pt: k
                    }
                }
                    ,
                    S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
                        this.t = a,
                            this.p = b,
                            this.s = d,
                            this.c = e,
                            this.n = i || b,
                            a instanceof ua || f.push(this.n),
                            this.r = j ? "function" == typeof j ? j : Math.round : j,
                            this.type = h || 0,
                            k && (this.pr = k,
                                c = !0),
                            this.b = void 0 === l ? d : l,
                            this.e = void 0 === m ? d + e : m,
                            g && (this._next = g,
                                g._prev = this)
                    }
                )
                , va = function (a, b, c, d, e, f) {
                    var g = new ua(a, b, c, d - c, e, -1, f);
                    return g.b = c,
                        g.e = g.xs0 = d,
                        g
                }
                , wa = g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
                    c = c || f || "",
                        "function" == typeof d && (d = d(r, q)),
                        h = new ua(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d),
                        d += "",
                        e && qa.test(d + c) && (d = [c, d],
                            g.colorStringFilter(d),
                            c = d[0],
                            d = d[1]);
                    var m, n, o, p, u, v, w, x, y, z, A, B, C, D = c.split(", ").join(",").split(" "), E = d.split(", ").join(",").split(" "), F = D.length, G = k !== !1;
                    for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (-1 !== (d + c).indexOf("rgb") || -1 !== (d + c).indexOf("hsl") ? (D = D.join(" ").replace(I, ", ").split(" "),
                        E = E.join(" ").replace(I, ", ").split(" ")) : (D = D.join(" ").split(",").join(", ").split(" "),
                            E = E.join(" ").split(",").join(", ").split(" ")),
                        F = D.length),
                        F !== E.length && (D = (f || "").split(" "),
                            F = D.length),
                        h.plugin = j,
                        h.setRatio = l,
                        qa.lastIndex = 0,
                        m = 0; F > m; m++)
                        if (p = D[m],
                            u = E[m] + "",
                            x = parseFloat(p),
                            x || 0 === x)
                            h.appendXtra("", x, ja(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px") ? Math.round : !1, !0);
                        else if (e && qa.test(p))
                            B = u.indexOf(")") + 1,
                                B = ")" + (B ? u.substr(B) : ""),
                                C = -1 !== u.indexOf("hsl") && U,
                                z = u,
                                p = oa(p, C),
                                u = oa(u, C),
                                y = p.length + u.length > 6,
                                y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent",
                                    h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1),
                                        C ? h.appendXtra(z.substr(0, z.indexOf("hsl")) + (y ? "hsla(" : "hsl("), p[0], ja(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ja(u[1], p[1]), "%,", !1).appendXtra("", p[2], ja(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(z.substr(0, z.indexOf("rgb")) + (y ? "rgba(" : "rgb("), p[0], u[0] - p[0], ",", Math.round, !0).appendXtra("", p[1], u[1] - p[1], ",", Math.round).appendXtra("", p[2], u[2] - p[2], y ? "," : B, Math.round),
                                        y && (p = p.length < 4 ? 1 : p[3],
                                            h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))),
                                qa.lastIndex = 0;
                        else if (v = p.match(s)) {
                            if (w = u.match(t),
                                !w || w.length !== v.length)
                                return h;
                            for (o = 0,
                                n = 0; n < v.length; n++)
                                A = v[n],
                                    z = p.indexOf(A, o),
                                    h.appendXtra(p.substr(o, z - o), Number(A), ja(w[n], A), "", G && "px" === p.substr(z + A.length, 2) ? Math.round : !1, 0 === n),
                                    o = z + A.length;
                            h["xs" + h.l] += p.substr(o)
                        } else
                            h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
                    if (-1 !== d.indexOf("=") && h.data) {
                        for (B = h.xs0 + h.data.s,
                            m = 1; m < h.l; m++)
                            B += h["xs" + m] + h.data["xn" + m];
                        h.e = B + h["xs" + m]
                    }
                    return h.l || (h.type = -1,
                        h.xs0 = h.e),
                        h.xfirst || h
                }
                , xa = 9;
            for (j = ua.prototype,
                j.l = j.pr = 0; --xa > 0;)
                j["xn" + xa] = 0,
                    j["xs" + xa] = "";
            j.xs0 = "",
                j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null,
                j.appendXtra = function (a, b, c, d, e, f) {
                    var g = this
                        , h = g.l;
                    return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "",
                        c || 0 === h || g.plugin ? (g.l++,
                            g.type = g.setRatio ? 2 : 1,
                            g["xs" + g.l] = d || "",
                            h > 0 ? (g.data["xn" + h] = b + c,
                                g.rxp["xn" + h] = e,
                                g["xn" + h] = b,
                                g.plugin || (g.xfirst = new ua(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr),
                                    g.xfirst.xs0 = 0),
                                g) : (g.data = {
                                    s: b + c
                                },
                                    g.rxp = {},
                                    g.s = b,
                                    g.c = c,
                                    g.r = e,
                                    g)) : (g["xs" + h] += b + (d || ""),
                                        g)
                }
                ;
            var ya = function (a, b) {
                b = b || {},
                    this.p = b.prefix ? Z(a) || a : a,
                    i[a] = i[this.p] = this,
                    this.format = b.formatter || ra(b.defaultValue, b.color, b.collapsible, b.multi),
                    b.parser && (this.parse = b.parser),
                    this.clrs = b.color,
                    this.multi = b.multi,
                    this.keyword = b.keyword,
                    this.dflt = b.defaultValue,
                    this.allowFunc = b.allowFunc,
                    this.pr = b.priority || 0
            }
                , za = S._registerComplexSpecialProp = function (a, b, c) {
                    "object" != typeof b && (b = {
                        parser: c
                    });
                    var d, e, f = a.split(","), g = b.defaultValue;
                    for (c = c || [g],
                        d = 0; d < f.length; d++)
                        b.prefix = 0 === d && b.prefix,
                            b.defaultValue = c[d] || g,
                            e = new ya(f[d], b)
                }
                , Aa = S._registerPluginProp = function (a) {
                    if (!i[a]) {
                        var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                        za(a, {
                            parser: function (a, c, d, e, f, g, j) {
                                var k = h.com.greensock.plugins[b];
                                return k ? (k._cssRegister(),
                                    i[d].parse(a, c, d, e, f, g, j)) : (W("Error: " + b + " js file not loaded."),
                                        f)
                            }
                        })
                    }
                }
                ;
            j = ya.prototype,
                j.parseComplex = function (a, b, c, d, e, f) {
                    var g, h, i, j, k, l, m = this.keyword;
                    if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"),
                        i = c.replace(I, "|").split("|")) : m && (h = [b],
                            i = [c])),
                        i) {
                        for (j = i.length > h.length ? i.length : h.length,
                            g = 0; j > g; g++)
                            b = h[g] = h[g] || this.dflt,
                                c = i[g] = i[g] || this.dflt,
                                m && (k = b.indexOf(m),
                                    l = c.indexOf(m),
                                    k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
                        b = h.join(", "),
                            c = i.join(", ")
                    }
                    return wa(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
                }
                ,
                j.parse = function (a, b, c, d, f, g, h) {
                    return this.parseComplex(a.style, this.format(aa(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
                }
                ,
                g.registerSpecialProp = function (a, b, c) {
                    za(a, {
                        parser: function (a, d, e, f, g, h, i) {
                            var j = new ua(a, e, 0, 0, g, 2, e, !1, c);
                            return j.plugin = h,
                                j.setRatio = b(a, d, f._tween, e),
                                j
                        },
                        priority: c
                    })
                }
                ,
                g.useSVGTransformAttr = !0;
            var Ba, Ca = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), Da = Z("transform"), Ea = X + "transform", Fa = Z("transformOrigin"), Ga = null !== Z("perspective"), Ha = S.Transform = function () {
                this.perspective = parseFloat(g.defaultTransformPerspective) || 0,
                    this.force3D = g.defaultForce3D !== !1 && Ga ? g.defaultForce3D || "auto" : !1
            }
                , Ia = _gsScope.SVGElement, Ja = function (a, b, c) {
                    var d, e = O.createElementNS("http://www.w3.org/2000/svg", a), f = /([a-z])([A-Z])/g;
                    for (d in c)
                        e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
                    return b.appendChild(e),
                        e
                }, Ka = O.documentElement || {}, La = function () {
                    var a, b, c, d = p || /Android/i.test(T) && !_gsScope.chrome;
                    return O.createElementNS && !d && (a = Ja("svg", Ka),
                        b = Ja("rect", a, {
                            width: 100,
                            height: 50,
                            x: 100
                        }),
                        c = b.getBoundingClientRect().width,
                        b.style[Fa] = "50% 50%",
                        b.style[Da] = "scaleX(0.5)",
                        d = c === b.getBoundingClientRect().width && !(n && Ga),
                        Ka.removeChild(a)),
                        d
                }(), Ma = function (a, b, c, d, e, f) {
                    var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform, w = Ra(a, !0);
                    v && (t = v.xOrigin,
                        u = v.yOrigin),
                        (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(),
                            0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = {
                                x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0,
                                y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0,
                                width: 0,
                                height: 0
                            }),
                            b = ia(b).split(" "),
                            h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]),
                        c.xOrigin = k = parseFloat(h[0]),
                        c.yOrigin = l = parseFloat(h[1]),
                        d && w !== Qa && (m = w[0],
                            n = w[1],
                            o = w[2],
                            p = w[3],
                            q = w[4],
                            r = w[5],
                            s = m * p - n * o,
                            s && (i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s,
                                j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s,
                                k = c.xOrigin = h[0] = i,
                                l = c.yOrigin = h[1] = j)),
                        v && (f && (c.xOffset = v.xOffset,
                            c.yOffset = v.yOffset,
                            v = c),
                            e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t,
                                j = l - u,
                                v.xOffset += i * w[0] + j * w[2] - i,
                                v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0),
                        f || a.setAttribute("data-svg-origin", h.join(" "))
                }, Na = function (a) {
                    var b, c = P("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), d = this.parentNode, e = this.nextSibling, f = this.style.cssText;
                    if (Ka.appendChild(c),
                        c.appendChild(this),
                        this.style.display = "block",
                        a)
                        try {
                            b = this.getBBox(),
                                this._originalGetBBox = this.getBBox,
                                this.getBBox = Na
                        } catch (g) { }
                    else
                        this._originalGetBBox && (b = this._originalGetBBox());
                    return e ? d.insertBefore(this, e) : d.appendChild(this),
                        Ka.removeChild(c),
                        this.style.cssText = f,
                        b
                }, Oa = function (a) {
                    try {
                        return a.getBBox()
                    } catch (b) {
                        return Na.call(a, !0)
                    }
                }, Pa = function (a) {
                    return !(!Ia || !a.getCTM || a.parentNode && !a.ownerSVGElement || !Oa(a))
                }, Qa = [1, 0, 0, 1, 0, 0], Ra = function (a, b) {
                    var c, d, e, f, g, h, i, j = a._gsTransform || new Ha, k = 1e5, l = a.style;
                    if (Da ? d = aa(a, Ea, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G),
                        d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), j.x || 0, j.y || 0].join(",") : ""),
                        c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d,
                        Da && c && !a.offsetParent && (f = l.display,
                            l.display = "block",
                            i = a.parentNode,
                            i && a.offsetParent || (g = 1,
                                h = a.nextSibling,
                                Ka.appendChild(a)),
                            d = aa(a, Ea, null, !0),
                            c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d,
                            f ? l.display = f : Wa(l, "display"),
                            g && (h ? i.insertBefore(a, h) : i ? i.appendChild(a) : Ka.removeChild(a))),
                        (j.svg || a.getCTM && Pa(a)) && (c && -1 !== (l[Da] + "").indexOf("matrix") && (d = l[Da],
                            c = 0),
                            e = a.getAttribute("transform"),
                            c && e && (e = a.transform.baseVal.consolidate().matrix,
                                d = "matrix(" + e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.e + "," + e.f + ")",
                                c = 0)),
                        c)
                        return Qa;
                    for (e = (d || "").match(s) || [],
                        xa = e.length; --xa > -1;)
                        f = Number(e[xa]),
                            e[xa] = (g = f - (f |= 0)) ? (g * k + (0 > g ? -.5 : .5) | 0) / k + f : f;
                    return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
                }, Sa = S.getTransform = function (a, c, d, e) {
                    if (a._gsTransform && d && !e)
                        return a._gsTransform;
                    var f, h, i, j, k, l, m = d ? a._gsTransform || new Ha : new Ha, n = m.scaleX < 0, o = 2e-5, p = 1e5, q = Ga ? parseFloat(aa(a, Fa, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0, r = parseFloat(g.defaultTransformPerspective) || 0;
                    if (m.svg = !(!a.getCTM || !Pa(a)),
                        m.svg && (Ma(a, aa(a, Fa, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")),
                            Ba = g.useSVGTransformAttr || La),
                        f = Ra(a),
                        f !== Qa) {
                        if (16 === f.length) {
                            var s, t, u, v, w, x = f[0], y = f[1], z = f[2], A = f[3], B = f[4], C = f[5], D = f[6], E = f[7], F = f[8], G = f[9], H = f[10], I = f[12], J = f[13], K = f[14], M = f[11], N = Math.atan2(D, H);
                            m.zOrigin && (K = -m.zOrigin,
                                I = F * K - f[12],
                                J = G * K - f[13],
                                K = H * K + m.zOrigin - f[14]),
                                m.rotationX = N * L,
                                N && (v = Math.cos(-N),
                                    w = Math.sin(-N),
                                    s = B * v + F * w,
                                    t = C * v + G * w,
                                    u = D * v + H * w,
                                    F = B * -w + F * v,
                                    G = C * -w + G * v,
                                    H = D * -w + H * v,
                                    M = E * -w + M * v,
                                    B = s,
                                    C = t,
                                    D = u),
                                N = Math.atan2(-z, H),
                                m.rotationY = N * L,
                                N && (v = Math.cos(-N),
                                    w = Math.sin(-N),
                                    s = x * v - F * w,
                                    t = y * v - G * w,
                                    u = z * v - H * w,
                                    G = y * w + G * v,
                                    H = z * w + H * v,
                                    M = A * w + M * v,
                                    x = s,
                                    y = t,
                                    z = u),
                                N = Math.atan2(y, x),
                                m.rotation = N * L,
                                N && (v = Math.cos(N),
                                    w = Math.sin(N),
                                    s = x * v + y * w,
                                    t = B * v + C * w,
                                    u = F * v + G * w,
                                    y = y * v - x * w,
                                    C = C * v - B * w,
                                    G = G * v - F * w,
                                    x = s,
                                    B = t,
                                    F = u),
                                m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0,
                                    m.rotationY = 180 - m.rotationY),
                                N = Math.atan2(B, C),
                                m.scaleX = (Math.sqrt(x * x + y * y + z * z) * p + .5 | 0) / p,
                                m.scaleY = (Math.sqrt(C * C + D * D) * p + .5 | 0) / p,
                                m.scaleZ = (Math.sqrt(F * F + G * G + H * H) * p + .5 | 0) / p,
                                x /= m.scaleX,
                                B /= m.scaleY,
                                y /= m.scaleX,
                                C /= m.scaleY,
                                Math.abs(N) > o ? (m.skewX = N * L,
                                    B = 0,
                                    "simple" !== m.skewType && (m.scaleY *= 1 / Math.cos(N))) : m.skewX = 0,
                                m.perspective = M ? 1 / (0 > M ? -M : M) : 0,
                                m.x = I,
                                m.y = J,
                                m.z = K,
                                m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B),
                                    m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C))
                        } else if (!Ga || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) {
                            var O = f.length >= 6
                                , P = O ? f[0] : 1
                                , Q = f[1] || 0
                                , R = f[2] || 0
                                , S = O ? f[3] : 1;
                            m.x = f[4] || 0,
                                m.y = f[5] || 0,
                                i = Math.sqrt(P * P + Q * Q),
                                j = Math.sqrt(S * S + R * R),
                                k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0,
                                l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0,
                                m.scaleX = i,
                                m.scaleY = j,
                                m.rotation = k,
                                m.skewX = l,
                                Ga && (m.rotationX = m.rotationY = m.z = 0,
                                    m.perspective = r,
                                    m.scaleZ = 1),
                                m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R),
                                    m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S))
                        }
                        Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1,
                            m.skewX += m.rotation <= 0 ? 180 : -180,
                            m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1,
                                m.skewX += m.skewX <= 0 ? 180 : -180)),
                            m.zOrigin = q;
                        for (h in m)
                            m[h] < o && m[h] > -o && (m[h] = 0)
                    }
                    return d && (a._gsTransform = m,
                        m.svg && (Ba && a.style[Da] ? b.delayedCall(.001, function () {
                            Wa(a.style, Da)
                        }) : !Ba && a.getAttribute("transform") && b.delayedCall(.001, function () {
                            a.removeAttribute("transform")
                        }))),
                        m
                }
                , Ta = function (a) {
                    var b, c, d = this.data, e = -d.rotation * K, f = e + d.skewX * K, g = 1e5, h = (Math.cos(e) * d.scaleX * g | 0) / g, i = (Math.sin(e) * d.scaleX * g | 0) / g, j = (Math.sin(f) * -d.scaleY * g | 0) / g, k = (Math.cos(f) * d.scaleY * g | 0) / g, l = this.t.style, m = this.t.currentStyle;
                    if (m) {
                        c = i,
                            i = -j,
                            j = -c,
                            b = m.filter,
                            l.filter = "";
                        var n, o, q = this.t.offsetWidth, r = this.t.offsetHeight, s = "absolute" !== m.position, t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k, u = d.x + q * d.xPercent / 100, v = d.y + r * d.yPercent / 100;
                        if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2,
                            o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2,
                            u += n - (n * h + o * i),
                            v += o - (n * j + o * k)),
                            s ? (n = q / 2,
                                o = r / 2,
                                t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')",
                            -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b,
                            (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")),
                            !s) {
                            var y, z, A, B = 8 > p ? 1 : -1;
                            for (n = d.ieOffsetX || 0,
                                o = d.ieOffsetY || 0,
                                d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u),
                                d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v),
                                xa = 0; 4 > xa; xa++)
                                z = ga[xa],
                                    y = m[z],
                                    c = -1 !== y.indexOf("px") ? parseFloat(y) : ba(this.t, z, parseFloat(y), y.replace(w, "")) || 0,
                                    A = c !== d[z] ? 2 > xa ? -d.ieOffsetX : -d.ieOffsetY : 2 > xa ? n - d.ieOffsetX : o - d.ieOffsetY,
                                    l[z] = (d[z] = Math.round(c - A * (0 === xa || 2 === xa ? 1 : B))) + "px"
                        }
                    }
                }, Ua = S.set3DTransformRatio = S.setTransformRatio = function (a) {
                    var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data, A = this.t.style, B = z.rotation, C = z.rotationX, D = z.rotationY, E = z.scaleX, F = z.scaleY, G = z.scaleZ, H = z.x, I = z.y, J = z.z, L = z.svg, M = z.perspective, N = z.force3D, O = z.skewY, P = z.skewX;
                    if (O && (P += O,
                        B += O),
                        ((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || Ba && L || !Ga)
                        return void (B || P || L ? (B *= K,
                            x = P * K,
                            y = 1e5,
                            c = Math.cos(B) * E,
                            f = Math.sin(B) * E,
                            d = Math.sin(B - x) * -F,
                            g = Math.cos(B - x) * F,
                            x && "simple" === z.skewType && (b = Math.tan(x - O * K),
                                b = Math.sqrt(1 + b * b),
                                d *= b,
                                g *= b,
                                O && (b = Math.tan(O * K),
                                    b = Math.sqrt(1 + b * b),
                                    c *= b,
                                    f *= b)),
                            L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset,
                                I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset,
                                Ba && (z.xPercent || z.yPercent) && (q = this.t.getBBox(),
                                    H += .01 * z.xPercent * q.width,
                                    I += .01 * z.yPercent * q.height),
                                q = 1e-6,
                                q > H && H > -q && (H = 0),
                                q > I && I > -q && (I = 0)),
                            u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")",
                            L && Ba ? this.t.setAttribute("transform", "matrix(" + u) : A[Da] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Da] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")");
                    if (n && (q = 1e-4,
                        q > E && E > -q && (E = G = 2e-5),
                        q > F && F > -q && (F = G = 2e-5),
                        !M || z.z || z.rotationX || z.rotationY || (M = 0)),
                        B || P)
                        B *= K,
                            r = c = Math.cos(B),
                            s = f = Math.sin(B),
                            P && (B -= P * K,
                                r = Math.cos(B),
                                s = Math.sin(B),
                                "simple" === z.skewType && (b = Math.tan((P - O) * K),
                                    b = Math.sqrt(1 + b * b),
                                    r *= b,
                                    s *= b,
                                    z.skewY && (b = Math.tan(O * K),
                                        b = Math.sqrt(1 + b * b),
                                        c *= b,
                                        f *= b))),
                            d = -s,
                            g = r;
                    else {
                        if (!(D || C || 1 !== G || M || L))
                            return void (A[Da] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
                        c = g = 1,
                            d = f = 0
                    }
                    k = 1,
                        e = h = i = j = l = m = 0,
                        o = M ? -1 / M : 0,
                        p = z.zOrigin,
                        q = 1e-6,
                        v = ",",
                        w = "0",
                        B = D * K,
                        B && (r = Math.cos(B),
                            s = Math.sin(B),
                            i = -s,
                            l = o * -s,
                            e = c * s,
                            h = f * s,
                            k = r,
                            o *= r,
                            c *= r,
                            f *= r),
                        B = C * K,
                        B && (r = Math.cos(B),
                            s = Math.sin(B),
                            b = d * r + e * s,
                            t = g * r + h * s,
                            j = k * s,
                            m = o * s,
                            e = d * -s + e * r,
                            h = g * -s + h * r,
                            k *= r,
                            o *= r,
                            d = b,
                            g = t),
                        1 !== G && (e *= G,
                            h *= G,
                            k *= G,
                            o *= G),
                        1 !== F && (d *= F,
                            g *= F,
                            j *= F,
                            m *= F),
                        1 !== E && (c *= E,
                            f *= E,
                            i *= E,
                            l *= E),
                        (p || L) && (p && (H += e * -p,
                            I += h * -p,
                            J += k * -p + p),
                            L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset,
                                I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset),
                            q > H && H > -q && (H = w),
                            q > I && I > -q && (I = w),
                            q > J && J > -q && (J = 0)),
                        u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(",
                        u += (q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -q ? w : i),
                        u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) + v + (q > g && g > -q ? w : g),
                        C || D || 1 !== G ? (u += v + (q > j && j > -q ? w : j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e),
                            u += v + (q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -q ? w : o) + v) : u += ",0,0,0,0,1,0,",
                        u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")",
                        A[Da] = u
                }
                ;
            j = Ha.prototype,
                j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0,
                j.scaleX = j.scaleY = j.scaleZ = 1,
                za("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function (a, b, c, d, f, h, i) {
                        if (d._lastParsedTransform === i)
                            return f;
                        d._lastParsedTransform = i;
                        var j = i.scale && "function" == typeof i.scale ? i.scale : 0;
                        j && (i.scale = j(r, a));
                        var k, l, m, n, o, p, s, t, u, v = a._gsTransform, w = a.style, x = 1e-6, y = Ca.length, z = i, A = {}, B = "transformOrigin", C = Sa(a, e, !0, z.parseTransform), D = z.transform && ("function" == typeof z.transform ? z.transform(r, q) : z.transform);
                        if (C.skewType = z.skewType || C.skewType || g.defaultSkewType,
                            d._transform = C,
                            "rotationZ" in z && (z.rotation = z.rotationZ),
                            D && "string" == typeof D && Da)
                            l = Q.style,
                                l[Da] = D,
                                l.display = "block",
                                l.position = "absolute",
                                -1 !== D.indexOf("%") && (l.width = aa(a, "width"),
                                    l.height = aa(a, "height")),
                                O.body.appendChild(Q),
                                k = Sa(Q, null, !1),
                                "simple" === C.skewType && (k.scaleY *= Math.cos(k.skewX * K)),
                                C.svg && (p = C.xOrigin,
                                    s = C.yOrigin,
                                    k.x -= C.xOffset,
                                    k.y -= C.yOffset,
                                    (z.transformOrigin || z.svgOrigin) && (D = {},
                                        Ma(a, ia(z.transformOrigin), D, z.svgOrigin, z.smoothOrigin, !0),
                                        p = D.xOrigin,
                                        s = D.yOrigin,
                                        k.x -= D.xOffset - C.xOffset,
                                        k.y -= D.yOffset - C.yOffset),
                                    (p || s) && (t = Ra(Q, !0),
                                        k.x -= p - (p * t[0] + s * t[2]),
                                        k.y -= s - (p * t[1] + s * t[3]))),
                                O.body.removeChild(Q),
                                k.perspective || (k.perspective = C.perspective),
                                null != z.xPercent && (k.xPercent = ka(z.xPercent, C.xPercent)),
                                null != z.yPercent && (k.yPercent = ka(z.yPercent, C.yPercent));
                        else if ("object" == typeof z) {
                            if (k = {
                                scaleX: ka(null != z.scaleX ? z.scaleX : z.scale, C.scaleX),
                                scaleY: ka(null != z.scaleY ? z.scaleY : z.scale, C.scaleY),
                                scaleZ: ka(z.scaleZ, C.scaleZ),
                                x: ka(z.x, C.x),
                                y: ka(z.y, C.y),
                                z: ka(z.z, C.z),
                                xPercent: ka(z.xPercent, C.xPercent),
                                yPercent: ka(z.yPercent, C.yPercent),
                                perspective: ka(z.transformPerspective, C.perspective)
                            },
                                o = z.directionalRotation,
                                null != o)
                                if ("object" == typeof o)
                                    for (l in o)
                                        z[l] = o[l];
                                else
                                    z.rotation = o;
                            "string" == typeof z.x && -1 !== z.x.indexOf("%") && (k.x = 0,
                                k.xPercent = ka(z.x, C.xPercent)),
                                "string" == typeof z.y && -1 !== z.y.indexOf("%") && (k.y = 0,
                                    k.yPercent = ka(z.y, C.yPercent)),
                                k.rotation = la("rotation" in z ? z.rotation : "shortRotation" in z ? z.shortRotation + "_short" : C.rotation, C.rotation, "rotation", A),
                                Ga && (k.rotationX = la("rotationX" in z ? z.rotationX : "shortRotationX" in z ? z.shortRotationX + "_short" : C.rotationX || 0, C.rotationX, "rotationX", A),
                                    k.rotationY = la("rotationY" in z ? z.rotationY : "shortRotationY" in z ? z.shortRotationY + "_short" : C.rotationY || 0, C.rotationY, "rotationY", A)),
                                k.skewX = la(z.skewX, C.skewX),
                                k.skewY = la(z.skewY, C.skewY)
                        }
                        for (Ga && null != z.force3D && (C.force3D = z.force3D,
                            n = !0),
                            m = C.force3D || C.z || C.rotationX || C.rotationY || k.z || k.rotationX || k.rotationY || k.perspective,
                            m || null == z.scale || (k.scaleZ = 1); --y > -1;)
                            u = Ca[y],
                                D = k[u] - C[u],
                                (D > x || -x > D || null != z[u] || null != M[u]) && (n = !0,
                                    f = new ua(C, u, C[u], D, f),
                                    u in A && (f.e = A[u]),
                                    f.xs0 = 0,
                                    f.plugin = h,
                                    d._overwriteProps.push(f.n));
                        return D = "function" == typeof z.transformOrigin ? z.transformOrigin(r, q) : z.transformOrigin,
                            C.svg && (D || z.svgOrigin) && (p = C.xOffset,
                                s = C.yOffset,
                                Ma(a, ia(D), k, z.svgOrigin, z.smoothOrigin),
                                f = va(C, "xOrigin", (v ? C : k).xOrigin, k.xOrigin, f, B),
                                f = va(C, "yOrigin", (v ? C : k).yOrigin, k.yOrigin, f, B),
                                (p !== C.xOffset || s !== C.yOffset) && (f = va(C, "xOffset", v ? p : C.xOffset, C.xOffset, f, B),
                                    f = va(C, "yOffset", v ? s : C.yOffset, C.yOffset, f, B)),
                                D = "0px 0px"),
                            (D || Ga && m && C.zOrigin) && (Da ? (n = !0,
                                u = Fa,
                                D || (D = (aa(a, u, e, !1, "50% 50%") + "").split(" "),
                                    D = D[0] + " " + D[1] + " " + C.zOrigin + "px"),
                                D += "",
                                f = new ua(w, u, 0, 0, f, -1, B),
                                f.b = w[u],
                                f.plugin = h,
                                Ga ? (l = C.zOrigin,
                                    D = D.split(" "),
                                    C.zOrigin = (D.length > 2 ? parseFloat(D[2]) : l) || 0,
                                    f.xs0 = f.e = D[0] + " " + (D[1] || "50%") + " 0px",
                                    f = new ua(C, "zOrigin", 0, 0, f, -1, f.n),
                                    f.b = l,
                                    f.xs0 = f.e = C.zOrigin) : f.xs0 = f.e = D) : ia(D + "", C)),
                            n && (d._transformType = C.svg && Ba || !m && 3 !== this._transformType ? 2 : 3),
                            j && (i.scale = j),
                            f
                    },
                    allowFunc: !0,
                    prefix: !0
                }),
                za("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }),
                za("clipPath", {
                    defaultValue: "inset(0px)",
                    prefix: !0,
                    multi: !0,
                    formatter: ra("inset(0px 0px 0px 0px)", !1, !0)
                }),
                za("borderRadius", {
                    defaultValue: "0px",
                    parser: function (a, b, c, f, g, h) {
                        b = this.format(b);
                        var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], z = a.style;
                        for (q = parseFloat(a.offsetWidth),
                            r = parseFloat(a.offsetHeight),
                            i = b.split(" "),
                            j = 0; j < y.length; j++)
                            this.p.indexOf("border") && (y[j] = Z(y[j])),
                                m = l = aa(a, y[j], e, !1, "0px"),
                                -1 !== m.indexOf(" ") && (l = m.split(" "),
                                    m = l[0],
                                    l = l[1]),
                                n = k = i[j],
                                o = parseFloat(m),
                                t = m.substr((o + "").length),
                                u = "=" === n.charAt(1),
                                u ? (p = parseInt(n.charAt(0) + "1", 10),
                                    n = n.substr(2),
                                    p *= parseFloat(n),
                                    s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n),
                                        s = n.substr((p + "").length)),
                                "" === s && (s = d[c] || t),
                                s !== t && (v = ba(a, "borderLeft", o, t),
                                    w = ba(a, "borderTop", o, t),
                                    "%" === s ? (m = v / q * 100 + "%",
                                        l = w / r * 100 + "%") : "em" === s ? (x = ba(a, "borderLeft", 1, "em"),
                                            m = v / x + "em",
                                            l = w / x + "em") : (m = v + "px",
                                                l = w + "px"),
                                    u && (n = parseFloat(m) + p + s,
                                        k = parseFloat(l) + p + s)),
                                g = wa(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
                        return g
                    },
                    prefix: !0,
                    formatter: ra("0px 0px 0px 0px", !1, !0)
                }),
                za("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                    defaultValue: "0px",
                    parser: function (a, b, c, d, f, g) {
                        return wa(a.style, c, this.format(aa(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f)
                    },
                    prefix: !0,
                    formatter: ra("0px 0px", !1, !0)
                }),
                za("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function (a, b, c, d, f, g) {
                        var h, i, j, k, l, m, n = "background-position", o = e || _(a, null), q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"), r = this.format(b);
                        if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = aa(a, "backgroundImage").replace(D, ""),
                            m && "none" !== m)) {
                            for (h = q.split(" "),
                                i = r.split(" "),
                                R.setAttribute("src", m),
                                j = 2; --j > -1;)
                                q = h[j],
                                    k = -1 !== q.indexOf("%"),
                                    k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a.offsetHeight - R.height,
                                        h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
                            q = h.join(" ")
                        }
                        return this.parseComplex(a.style, q, r, f, g)
                    },
                    formatter: ia
                }),
                za("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: function (a) {
                        return a += "",
                            "co" === a.substr(0, 2) ? a : ia(-1 === a.indexOf(" ") ? a + " " + a : a)
                    }
                }),
                za("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }),
                za("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }),
                za("transformStyle", {
                    prefix: !0
                }),
                za("backfaceVisibility", {
                    prefix: !0
                }),
                za("userSelect", {
                    prefix: !0
                }),
                za("margin", {
                    parser: sa("marginTop,marginRight,marginBottom,marginLeft")
                }),
                za("padding", {
                    parser: sa("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }),
                za("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function (a, b, c, d, f, g) {
                        var h, i, j;
                        return 9 > p ? (i = a.currentStyle,
                            j = 8 > p ? " " : ",",
                            h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")",
                            b = this.format(b).split(",").join(j)) : (h = this.format(aa(a, this.p, e, !1, this.dflt)),
                                b = this.format(b)),
                            this.parseComplex(a.style, h, b, f, g)
                    }
                }),
                za("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }),
                za("autoRound,strictUnits", {
                    parser: function (a, b, c, d, e) {
                        return e
                    }
                }),
                za("border", {
                    defaultValue: "0px solid #000",
                    parser: function (a, b, c, d, f, g) {
                        var h = aa(a, "borderTopWidth", e, !1, "0px")
                            , i = this.format(b).split(" ")
                            , j = i[0].replace(w, "");
                        return "px" !== j && (h = parseFloat(h) / ba(a, "borderTopWidth", 1, j) + j),
                            this.parseComplex(a.style, this.format(h + " " + aa(a, "borderTopStyle", e, !1, "solid") + " " + aa(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g)
                    },
                    color: !0,
                    formatter: function (a) {
                        var b = a.split(" ");
                        return b[0] + " " + (b[1] || "solid") + " " + (a.match(qa) || ["#000"])[0]
                    }
                }),
                za("borderWidth", {
                    parser: sa("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }),
                za("float,cssFloat,styleFloat", {
                    parser: function (a, b, c, d, e, f) {
                        var g = a.style
                            , h = "cssFloat" in g ? "cssFloat" : "styleFloat";
                        return new ua(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
                    }
                });
            var Va = function (a) {
                var b, c = this.t, d = c.filter || aa(this.data, "filter") || "", e = this.s + this.c * a | 0;
                100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"),
                    b = !aa(this.data, "filter")) : (c.filter = d.replace(z, ""),
                        b = !0)),
                    b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"),
                        -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e))
            };
            za("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function (a, b, c, d, f, g) {
                    var h = parseFloat(aa(a, "opacity", e, !1, "1"))
                        , i = a.style
                        , j = "autoAlpha" === c;
                    return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h),
                        j && 1 === h && "hidden" === aa(a, "visibility", e) && 0 !== b && (h = 0),
                        U ? f = new ua(i, "opacity", h, b - h, f) : (f = new ua(i, "opacity", 100 * h, 100 * (b - h), f),
                            f.xn1 = j ? 1 : 0,
                            i.zoom = 1,
                            f.type = 2,
                            f.b = "alpha(opacity=" + f.s + ")",
                            f.e = "alpha(opacity=" + (f.s + f.c) + ")",
                            f.data = a,
                            f.plugin = g,
                            f.setRatio = Va),
                        j && (f = new ua(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"),
                            f.xs0 = "inherit",
                            d._overwriteProps.push(f.n),
                            d._overwriteProps.push(c)),
                        f
                }
            });
            var Wa = function (a, b) {
                b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b),
                    a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b))
            }
                , Xa = function (a) {
                    if (this.t._gsClassPT = this,
                        1 === a || 0 === a) {
                        this.t.setAttribute("class", 0 === a ? this.b : this.e);
                        for (var b = this.data, c = this.t.style; b;)
                            b.v ? c[b.p] = b.v : Wa(c, b.p),
                                b = b._next;
                        1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else
                        this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            za("className", {
                parser: function (a, b, d, f, g, h, i) {
                    var j, k, l, m, n, o = a.getAttribute("class") || "", p = a.style.cssText;
                    if (g = f._classNamePT = new ua(a, d, 0, 0, g, 2),
                        g.setRatio = Xa,
                        g.pr = -11,
                        c = !0,
                        g.b = o,
                        k = da(a, e),
                        l = a._gsClassPT) {
                        for (m = {},
                            n = l.data; n;)
                            m[n.p] = 1,
                                n = n._next;
                        l.setRatio(1)
                    }
                    return a._gsClassPT = g,
                        g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""),
                        a.setAttribute("class", g.e),
                        j = ea(a, k, da(a), i, m),
                        a.setAttribute("class", o),
                        g.data = j.firstMPT,
                        a.style.cssText = p,
                        g = g.xfirst = f.parse(a, j.difs, g, h)
                }
            });
            var Ya = function (a) {
                if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var b, c, d, e, f, g = this.t.style, h = i.transform.parse;
                    if ("all" === this.e)
                        g.cssText = "",
                            e = !0;
                    else
                        for (b = this.e.split(" ").join("").split(","),
                            d = b.length; --d > -1;)
                            c = b[d],
                                i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Fa : i[c].p),
                                Wa(g, c);
                    e && (Wa(g, Da),
                        f = this.t._gsTransform,
                        f && (f.svg && (this.t.removeAttribute("data-svg-origin"),
                            this.t.removeAttribute("transform")),
                            delete this.t._gsTransform))
                }
            };
            for (za("clearProps", {
                parser: function (a, b, d, e, f) {
                    return f = new ua(a, d, 0, 0, f, 2),
                        f.setRatio = Ya,
                        f.e = b,
                        f.pr = -10,
                        f.data = e._tween,
                        c = !0,
                        f
                }
            }),
                j = "bezier,throwProps,physicsProps,physics2D".split(","),
                xa = j.length; xa--;)
                Aa(j[xa]);
            j = g.prototype,
                j._firstPT = j._lastParsedTransform = j._transform = null,
                j._onInitTween = function (a, b, h, j) {
                    if (!a.nodeType)
                        return !1;
                    this._target = q = a,
                        this._tween = h,
                        this._vars = b,
                        r = j,
                        k = b.autoRound,
                        c = !1,
                        d = b.suffixMap || g.suffixMap,
                        e = _(a, ""),
                        f = this._overwriteProps;
                    var n, p, s, t, u, v, w, x, z, A = a.style;
                    if (l && "" === A.zIndex && (n = aa(a, "zIndex", e),
                        ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)),
                        "string" == typeof b && (t = A.cssText,
                            n = da(a, e),
                            A.cssText = t + ";" + b,
                            n = ea(a, n, da(a)).difs,
                            !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)),
                            b = n,
                            A.cssText = t),
                        b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null),
                        this._transformType) {
                        for (z = 3 === this._transformType,
                            Da ? m && (l = !0,
                                "" === A.zIndex && (w = aa(a, "zIndex", e),
                                    ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)),
                                o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1,
                            s = p; s && s._next;)
                            s = s._next;
                        x = new ua(a, "transform", 0, 0, null, 2),
                            this._linkCSSP(x, null, s),
                            x.setRatio = Da ? Ua : Ta,
                            x.data = this._transform || Sa(a, e, !0),
                            x.tween = h,
                            x.pr = -1,
                            f.pop()
                    }
                    if (c) {
                        for (; p;) {
                            for (v = p._next,
                                s = t; s && s.pr > p.pr;)
                                s = s._next;
                            (p._prev = s ? s._prev : u) ? p._prev._next = p : t = p,
                                (p._next = s) ? s._prev = p : u = p,
                                p = v
                        }
                        this._firstPT = t
                    }
                    return !0
                }
                ,
                j.parse = function (a, b, c, f) {
                    var g, h, j, l, m, n, o, p, s, t, u = a.style;
                    for (g in b) {
                        if (n = b[g],
                            h = i[g],
                            "function" != typeof n || h && h.allowFunc || (n = n(r, q)),
                            h)
                            c = h.parse(a, n, g, this, c, f, b);
                        else {
                            if ("--" === g.substr(0, 2)) {
                                this._tween._propLookup[g] = this._addTween.call(this._tween, a.style, "setProperty", _(a).getPropertyValue(g) + "", n + "", g, !1, g);
                                continue
                            }
                            m = aa(a, g, e) + "",
                                s = "string" == typeof n,
                                "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = oa(n),
                                    n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"),
                                    c = wa(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = wa(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m),
                                        o = j || 0 === j ? m.substr((j + "").length) : "",
                                        ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ha(a, g, e),
                                            o = "px") : "left" === g || "top" === g ? (j = ca(a, g, e),
                                                o = "px") : (j = "opacity" !== g ? 0 : 1,
                                                    o = "")),
                                        t = s && "=" === n.charAt(1),
                                        t ? (l = parseInt(n.charAt(0) + "1", 10),
                                            n = n.substr(2),
                                            l *= parseFloat(n),
                                            p = n.replace(w, "")) : (l = parseFloat(n),
                                                p = s ? n.replace(w, "") : ""),
                                        "" === p && (p = g in d ? d[g] : o),
                                        n = l || 0 === l ? (t ? l + j : l) + p : b[g],
                                        o !== p && ("" !== p || "lineHeight" === g) && (l || 0 === l) && j && (j = ba(a, g, j, o),
                                            "%" === p ? (j /= ba(a, g, 100, "%") / 100,
                                                b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= ba(a, g, 1, p) : "px" !== p && (l = ba(a, g, l, p),
                                                    p = "px"),
                                            t && (l || 0 === l) && (n = l + j + p)),
                                        t && (l += j),
                                        !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new ua(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n),
                                            c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : W("invalid " + g + " tween value: " + b[g]) : (c = new ua(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n),
                                                c.xs0 = p))
                        }
                        f && c && !c.plugin && (c.plugin = f)
                    }
                    return c
                }
                ,
                j.setRatio = function (a) {
                    var b, c, d, e = this._firstPT, f = 1e-6;
                    if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; e;) {
                                if (b = e.c * a + e.s,
                                    e.r ? b = e.r(b) : f > b && b > -f && (b = 0),
                                    e.type)
                                    if (1 === e.type)
                                        if (d = e.l,
                                            2 === d)
                                            e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                        else if (3 === d)
                                            e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                                        else if (4 === d)
                                            e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                                        else if (5 === d)
                                            e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                                        else {
                                            for (c = e.xs0 + b + e.xs1,
                                                d = 1; d < e.l; d++)
                                                c += e["xn" + d] + e["xs" + (d + 1)];
                                            e.t[e.p] = c
                                        }
                                    else
                                        -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                                else
                                    e.t[e.p] = b + e.xs0;
                                e = e._next
                            }
                        else
                            for (; e;)
                                2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a),
                                    e = e._next;
                    else
                        for (; e;) {
                            if (2 !== e.type)
                                if (e.r && -1 !== e.type)
                                    if (b = e.r(e.s + e.c),
                                        e.type) {
                                        if (1 === e.type) {
                                            for (d = e.l,
                                                c = e.xs0 + b + e.xs1,
                                                d = 1; d < e.l; d++)
                                                c += e["xn" + d] + e["xs" + (d + 1)];
                                            e.t[e.p] = c
                                        }
                                    } else
                                        e.t[e.p] = b + e.xs0;
                                else
                                    e.t[e.p] = e.e;
                            else
                                e.setRatio(a);
                            e = e._next
                        }
                }
                ,
                j._enableTransforms = function (a) {
                    this._transform = this._transform || Sa(this._target, e, !0),
                        this._transformType = this._transform.svg && Ba || !a && 3 !== this._transformType ? 2 : 3
                }
                ;
            var Za = function (a) {
                this.t[this.p] = this.e,
                    this.data._linkCSSP(this, this._next, null, !0)
            };
            j._addLazySet = function (a, b, c) {
                var d = this._firstPT = new ua(a, b, 0, 0, this._firstPT, 2);
                d.e = c,
                    d.setRatio = Za,
                    d.data = this
            }
                ,
                j._linkCSSP = function (a, b, c, d) {
                    return a && (b && (b._prev = a),
                        a._next && (a._next._prev = a._prev),
                        a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next,
                            d = !0),
                        c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a),
                        a._next = b,
                        a._prev = c),
                        a
                }
                ,
                j._mod = function (a) {
                    for (var b = this._firstPT; b;)
                        "function" == typeof a[b.p] && (b.r = a[b.p]),
                            b = b._next
                }
                ,
                j._kill = function (b) {
                    var c, d, e, f = b;
                    if (b.autoAlpha || b.alpha) {
                        f = {};
                        for (d in b)
                            f[d] = b[d];
                        f.opacity = 1,
                            f.autoAlpha && (f.visibility = 1)
                    }
                    for (b.className && (c = this._classNamePT) && (e = c.xfirst,
                        e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next),
                        c._next && this._linkCSSP(c._next, c._next._next, e._prev),
                        this._classNamePT = null),
                        c = this._firstPT; c;)
                        c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b),
                            d = c.plugin),
                            c = c._next;
                    return a.prototype._kill.call(this, f)
                }
                ;
            var $a = function (a, b, c) {
                var d, e, f, g;
                if (a.slice)
                    for (e = a.length; --e > -1;)
                        $a(a[e], b, c);
                else
                    for (d = a.childNodes,
                        e = d.length; --e > -1;)
                        f = d[e],
                            g = f.type,
                            f.style && (b.push(da(f)),
                                c && c.push(f)),
                            1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || $a(f, b, c)
            };
            return g.cascadeTo = function (a, c, d) {
                var e, f, g, h, i = b.to(a, c, d), j = [i], k = [], l = [], m = [], n = b._internals.reservedProps;
                for (a = i._targets || i.target,
                    $a(a, k, m),
                    i.render(c, !0, !0),
                    $a(a, l),
                    i.render(0, !0, !0),
                    i._enabled(!0),
                    e = m.length; --e > -1;)
                    if (f = ea(m[e], k[e], l[e]),
                        f.firstMPT) {
                        f = f.difs;
                        for (g in d)
                            n[g] && (f[g] = d[g]);
                        h = {};
                        for (g in f)
                            h[g] = k[e][g];
                        j.push(b.fromTo(m[e], c, h, f))
                    }
                return j
            }
                ,
                a.activate([g]),
                g
        }, !0),
        function () {
            var a = _gsScope._gsDefine.plugin({
                propName: "roundProps",
                version: "1.7.0",
                priority: -1,
                API: 2,
                init: function (a, b, c) {
                    return this._tween = c,
                        !0
                }
            })
                , b = function (a) {
                    var b = 1 > a ? Math.pow(10, (a + "").length - 2) : 1;
                    return function (c) {
                        return (Math.round(c / a) * a * b | 0) / b
                    }
                }
                , c = function (a, b) {
                    for (; a;)
                        a.f || a.blob || (a.m = b || Math.round),
                            a = a._next
                }
                , d = a.prototype;
            d._onInitAllProps = function () {
                var a, d, e, f, g = this._tween, h = g.vars.roundProps, i = {}, j = g._propLookup.roundProps;
                if ("object" != typeof h || h.push)
                    for ("string" == typeof h && (h = h.split(",")),
                        e = h.length; --e > -1;)
                        i[h[e]] = Math.round;
                else
                    for (f in h)
                        i[f] = b(h[f]);
                for (f in i)
                    for (a = g._firstPT; a;)
                        d = a._next,
                            a.pg ? a.t._mod(i) : a.n === f && (2 === a.f && a.t ? c(a.t._firstPT, i[f]) : (this._add(a.t, f, a.s, a.c, i[f]),
                                d && (d._prev = a._prev),
                                a._prev ? a._prev._next = d : g._firstPT === a && (g._firstPT = d),
                                a._next = a._prev = null,
                                g._propLookup[f] = j)),
                            a = d;
                return !1
            }
                ,
                d._add = function (a, b, c, d, e) {
                    this._addTween(a, b, c, c + d, b, e || Math.round),
                        this._overwriteProps.push(b)
                }
        }(),
        function () {
            _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.6.1",
                init: function (a, b, c, d) {
                    var e, f;
                    if ("function" != typeof a.setAttribute)
                        return !1;
                    for (e in b)
                        f = b[e],
                            "function" == typeof f && (f = f(d, a)),
                            this._addTween(a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e),
                            this._overwriteProps.push(e);
                    return !0
                }
            })
        }(),
        _gsScope._gsDefine.plugin({
            propName: "directionalRotation",
            version: "0.3.1",
            API: 2,
            init: function (a, b, c, d) {
                "object" != typeof b && (b = {
                    rotation: b
                }),
                    this.finals = {};
                var e, f, g, h, i, j, k = b.useRadians === !0 ? 2 * Math.PI : 360, l = 1e-6;
                for (e in b)
                    "useRadians" !== e && (h = b[e],
                        "function" == typeof h && (h = h(d, a)),
                        j = (h + "").split("_"),
                        f = j[0],
                        g = parseFloat("function" != typeof a[e] ? a[e] : a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)]()),
                        h = this.finals[e] = "string" == typeof f && "=" === f.charAt(1) ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2)) : Number(f) || 0,
                        i = h - g,
                        j.length && (f = j.join("_"),
                            -1 !== f.indexOf("short") && (i %= k,
                                i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)),
                            -1 !== f.indexOf("_cw") && 0 > i ? i = (i + 9999999999 * k) % k - (i / k | 0) * k : -1 !== f.indexOf("ccw") && i > 0 && (i = (i - 9999999999 * k) % k - (i / k | 0) * k)),
                        (i > l || -l > i) && (this._addTween(a, e, g, g + i, e),
                            this._overwriteProps.push(e)));
                return !0
            },
            set: function (a) {
                var b;
                if (1 !== a)
                    this._super.setRatio.call(this, a);
                else
                    for (b = this._firstPT; b;)
                        b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p],
                            b = b._next
            }
        })._autoCSS = !0,
        _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a) {
            var b, c, d, e, f = _gsScope.GreenSockGlobals || _gsScope, g = f.com.greensock, h = 2 * Math.PI, i = Math.PI / 2, j = g._class, k = function (b, c) {
                var d = j("easing." + b, function () { }, !0)
                    , e = d.prototype = new a;
                return e.constructor = d,
                    e.getRatio = c,
                    d
            }, l = a.register || function () { }
                , m = function (a, b, c, d, e) {
                    var f = j("easing." + a, {
                        easeOut: new b,
                        easeIn: new c,
                        easeInOut: new d
                    }, !0);
                    return l(f, a),
                        f
                }, n = function (a, b, c) {
                    this.t = a,
                        this.v = b,
                        c && (this.next = c,
                            c.prev = this,
                            this.c = c.v - b,
                            this.gap = c.t - a)
                }, o = function (b, c) {
                    var d = j("easing." + b, function (a) {
                        this._p1 = a || 0 === a ? a : 1.70158,
                            this._p2 = 1.525 * this._p1
                    }, !0)
                        , e = d.prototype = new a;
                    return e.constructor = d,
                        e.getRatio = c,
                        e.config = function (a) {
                            return new d(a)
                        }
                        ,
                        d
                }, p = m("Back", o("BackOut", function (a) {
                    return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
                }), o("BackIn", function (a) {
                    return a * a * ((this._p1 + 1) * a - this._p1)
                }), o("BackInOut", function (a) {
                    return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
                })), q = j("easing.SlowMo", function (a, b, c) {
                    b = b || 0 === b ? b : .7,
                        null == a ? a = .7 : a > 1 && (a = 1),
                        this._p = 1 !== a ? b : 0,
                        this._p1 = (1 - a) / 2,
                        this._p2 = a,
                        this._p3 = this._p1 + this._p2,
                        this._calcEnd = c === !0
                }, !0), r = q.prototype = new a;
            return r.constructor = q,
                r.getRatio = function (a) {
                    var b = a + (.5 - a) * this._p;
                    return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 === a ? 0 : 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
                }
                ,
                q.ease = new q(.7, .7),
                r.config = q.config = function (a, b, c) {
                    return new q(a, b, c)
                }
                ,
                b = j("easing.SteppedEase", function (a, b) {
                    a = a || 1,
                        this._p1 = 1 / a,
                        this._p2 = a + (b ? 0 : 1),
                        this._p3 = b ? 1 : 0
                }, !0),
                r = b.prototype = new a,
                r.constructor = b,
                r.getRatio = function (a) {
                    return 0 > a ? a = 0 : a >= 1 && (a = .999999999),
                        ((this._p2 * a | 0) + this._p3) * this._p1
                }
                ,
                r.config = b.config = function (a, c) {
                    return new b(a, c)
                }
                ,
                c = j("easing.ExpoScaleEase", function (a, b, c) {
                    this._p1 = Math.log(b / a),
                        this._p2 = b - a,
                        this._p3 = a,
                        this._ease = c
                }, !0),
                r = c.prototype = new a,
                r.constructor = c,
                r.getRatio = function (a) {
                    return this._ease && (a = this._ease.getRatio(a)),
                        (this._p3 * Math.exp(this._p1 * a) - this._p3) / this._p2
                }
                ,
                r.config = c.config = function (a, b, d) {
                    return new c(a, b, d)
                }
                ,
                d = j("easing.RoughEase", function (b) {
                    b = b || {};
                    for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), m = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --m > -1;)
                        c = o ? Math.random() : 1 / l * m,
                            d = q ? q.getRatio(c) : c,
                            "none" === i ? e = r : "out" === i ? (f = 1 - c,
                                e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c,
                                    e = f * f * .5 * r) : (f = 2 * (1 - c),
                                        e = f * f * .5 * r),
                            o ? d += Math.random() * e - .5 * e : m % 2 ? d += .5 * e : d -= .5 * e,
                            p && (d > 1 ? d = 1 : 0 > d && (d = 0)),
                            j[k++] = {
                                x: c,
                                y: d
                            };
                    for (j.sort(function (a, b) {
                        return a.x - b.x
                    }),
                        h = new n(1, 1, null),
                        m = l; --m > -1;)
                        g = j[m],
                            h = new n(g.x, g.y, h);
                    this._prev = new n(0, 0, 0 !== h.t ? h : h.next)
                }, !0),
                r = d.prototype = new a,
                r.constructor = d,
                r.getRatio = function (a) {
                    var b = this._prev;
                    if (a > b.t) {
                        for (; b.next && a >= b.t;)
                            b = b.next;
                        b = b.prev
                    } else
                        for (; b.prev && a <= b.t;)
                            b = b.prev;
                    return this._prev = b,
                        b.v + (a - b.t) / b.gap * b.c
                }
                ,
                r.config = function (a) {
                    return new d(a)
                }
                ,
                d.ease = new d,
                m("Bounce", k("BounceOut", function (a) {
                    return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                }), k("BounceIn", function (a) {
                    return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
                }), k("BounceInOut", function (a) {
                    var b = .5 > a;
                    return a = b ? 1 - 2 * a : 2 * a - 1,
                        a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375,
                        b ? .5 * (1 - a) : .5 * a + .5
                })),
                m("Circ", k("CircOut", function (a) {
                    return Math.sqrt(1 - (a -= 1) * a)
                }), k("CircIn", function (a) {
                    return -(Math.sqrt(1 - a * a) - 1)
                }), k("CircInOut", function (a) {
                    return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
                })),
                e = function (b, c, d) {
                    var e = j("easing." + b, function (a, b) {
                        this._p1 = a >= 1 ? a : 1,
                            this._p2 = (b || d) / (1 > a ? a : 1),
                            this._p3 = this._p2 / h * (Math.asin(1 / this._p1) || 0),
                            this._p2 = h / this._p2
                    }, !0)
                        , f = e.prototype = new a;
                    return f.constructor = e,
                        f.getRatio = c,
                        f.config = function (a, b) {
                            return new e(a, b)
                        }
                        ,
                        e
                }
                ,
                m("Elastic", e("ElasticOut", function (a) {
                    return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
                }, .3), e("ElasticIn", function (a) {
                    return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
                }, .3), e("ElasticInOut", function (a) {
                    return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
                }, .45)),
                m("Expo", k("ExpoOut", function (a) {
                    return 1 - Math.pow(2, -10 * a)
                }), k("ExpoIn", function (a) {
                    return Math.pow(2, 10 * (a - 1)) - .001
                }), k("ExpoInOut", function (a) {
                    return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
                })),
                m("Sine", k("SineOut", function (a) {
                    return Math.sin(a * i)
                }), k("SineIn", function (a) {
                    return -Math.cos(a * i) + 1
                }), k("SineInOut", function (a) {
                    return -.5 * (Math.cos(Math.PI * a) - 1)
                })),
                j("easing.EaseLookup", {
                    find: function (b) {
                        return a.map[b]
                    }
                }, !0),
                l(f.SlowMo, "SlowMo", "ease,"),
                l(d, "RoughEase", "ease,"),
                l(b, "SteppedEase", "ease,"),
                p
        }, !0)
}),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function (a, b) {
        "use strict";
        var c = {}
            , d = a.document
            , e = a.GreenSockGlobals = a.GreenSockGlobals || a
            , f = e[b];
        if (f)
            return "undefined" != typeof module && module.exports && (module.exports = f),
                f;
        var g, h, i, j, k, l = function (a) {
            var b, c = a.split("."), d = e;
            for (b = 0; b < c.length; b++)
                d[c[b]] = d = d[c[b]] || {};
            return d
        }, m = l("com.greensock"), n = 1e-8, o = function (a) {
            var b, c = [], d = a.length;
            for (b = 0; b !== d; c.push(a[b++]))
                ;
            return c
        }, p = function () { }, q = function () {
            var a = Object.prototype.toString
                , b = a.call([]);
            return function (c) {
                return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
            }
        }(), r = {}, s = function (d, f, g, h) {
            this.sc = r[d] ? r[d].sc : [],
                r[d] = this,
                this.gsClass = null,
                this.func = g;
            var i = [];
            this.check = function (j) {
                for (var k, m, n, o, p = f.length, q = p; --p > -1;)
                    (k = r[f[p]] || new s(f[p], [])).gsClass ? (i[p] = k.gsClass,
                        q--) : j && k.sc.push(this);
                if (0 === q && g) {
                    if (m = ("com.greensock." + d).split("."),
                        n = m.pop(),
                        o = l(m.join("."))[n] = this.gsClass = g.apply(g, i),
                        h)
                        if (e[n] = c[n] = o,
                            "undefined" != typeof module && module.exports)
                            if (d === b) {
                                module.exports = c[b] = o;
                                for (p in c)
                                    o[p] = c[p]
                            } else
                                c[b] && (c[b][n] = o);
                        else
                            "function" == typeof define && define.amd && define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function () {
                                return o
                            });
                    for (p = 0; p < this.sc.length; p++)
                        this.sc[p].check()
                }
            }
                ,
                this.check(!0)
        }, t = a._gsDefine = function (a, b, c, d) {
            return new s(a, b, c, d)
        }
            , u = m._class = function (a, b, c) {
                return b = b || function () { }
                    ,
                    t(a, [], function () {
                        return b
                    }, c),
                    b
            }
            ;
        t.globals = e;
        var v = [0, 0, 1, 1]
            , w = u("easing.Ease", function (a, b, c, d) {
                this._func = a,
                    this._type = c || 0,
                    this._power = d || 0,
                    this._params = b ? v.concat(b) : v
            }, !0)
            , x = w.map = {}
            , y = w.register = function (a, b, c, d) {
                for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;)
                    for (f = i[j],
                        e = d ? u("easing." + f, null, !0) : m.easing[f] || {},
                        g = k.length; --g > -1;)
                        h = k[g],
                            x[f + "." + h] = x[h + f] = e[h] = a.getRatio ? a : a[h] || new a
            }
            ;
        for (i = w.prototype,
            i._calcEnd = !1,
            i.getRatio = function (a) {
                if (this._func)
                    return this._params[0] = a,
                        this._func.apply(null, this._params);
                var b = this._type
                    , c = this._power
                    , d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
                return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d),
                    1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
            }
            ,
            g = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
            h = g.length; --h > -1;)
            i = g[h] + ",Power" + h,
                y(new w(null, null, 1, h), i, "easeOut", !0),
                y(new w(null, null, 2, h), i, "easeIn" + (0 === h ? ",easeNone" : "")),
                y(new w(null, null, 3, h), i, "easeInOut");
        x.linear = m.easing.Linear.easeIn,
            x.swing = m.easing.Quad.easeInOut;
        var z = u("events.EventDispatcher", function (a) {
            this._listeners = {},
                this._eventTarget = a || this
        });
        i = z.prototype,
            i.addEventListener = function (a, b, c, d, e) {
                e = e || 0;
                var f, g, h = this._listeners[a], i = 0;
                for (this !== j || k || j.wake(),
                    null == h && (this._listeners[a] = h = []),
                    g = h.length; --g > -1;)
                    f = h[g],
                        f.c === b && f.s === c ? h.splice(g, 1) : 0 === i && f.pr < e && (i = g + 1);
                h.splice(i, 0, {
                    c: b,
                    s: c,
                    up: d,
                    pr: e
                })
            }
            ,
            i.removeEventListener = function (a, b) {
                var c, d = this._listeners[a];
                if (d)
                    for (c = d.length; --c > -1;)
                        if (d[c].c === b)
                            return void d.splice(c, 1)
            }
            ,
            i.dispatchEvent = function (a) {
                var b, c, d, e = this._listeners[a];
                if (e)
                    for (b = e.length,
                        b > 1 && (e = e.slice(0)),
                        c = this._eventTarget; --b > -1;)
                        d = e[b],
                            d && (d.up ? d.c.call(d.s || c, {
                                type: a,
                                target: c
                            }) : d.c.call(d.s || c))
            }
            ;
        var A = a.requestAnimationFrame
            , B = a.cancelAnimationFrame
            , C = Date.now || function () {
                return (new Date).getTime()
            }
            , D = C();
        for (g = ["ms", "moz", "webkit", "o"],
            h = g.length; --h > -1 && !A;)
            A = a[g[h] + "RequestAnimationFrame"],
                B = a[g[h] + "CancelAnimationFrame"] || a[g[h] + "CancelRequestAnimationFrame"];
        u("Ticker", function (a, b) {
            var c, e, f, g, h, i = this, l = C(), m = b !== !1 && A ? "auto" : !1, o = 500, q = 33, r = "tick", s = function (a) {
                var b, d, j = C() - D;
                j > o && (l += j - q),
                    D += j,
                    i.time = (D - l) / 1e3,
                    b = i.time - h,
                    (!c || b > 0 || a === !0) && (i.frame++,
                        h += b + (b >= g ? .004 : g - b),
                        d = !0),
                    a !== !0 && (f = e(s)),
                    d && i.dispatchEvent(r)
            };
            z.call(i),
                i.time = i.frame = 0,
                i.tick = function () {
                    s(!0)
                }
                ,
                i.lagSmoothing = function (a, b) {
                    return arguments.length ? (o = a || 1 / n,
                        void (q = Math.min(b, o, 0))) : 1 / n > o
                }
                ,
                i.sleep = function () {
                    null != f && (m && B ? B(f) : clearTimeout(f),
                        e = p,
                        f = null,
                        i === j && (k = !1))
                }
                ,
                i.wake = function (a) {
                    null !== f ? i.sleep() : a ? l += -D + (D = C()) : i.frame > 10 && (D = C() - o + 5),
                        e = 0 === c ? p : m && A ? A : function (a) {
                            return setTimeout(a, 1e3 * (h - i.time) + 1 | 0)
                        }
                        ,
                        i === j && (k = !0),
                        s(2)
                }
                ,
                i.fps = function (a) {
                    return arguments.length ? (c = a,
                        g = 1 / (c || 60),
                        h = this.time + g,
                        void i.wake()) : c
                }
                ,
                i.useRAF = function (a) {
                    return arguments.length ? (i.sleep(),
                        m = a,
                        void i.fps(c)) : m
                }
                ,
                i.fps(a),
                setTimeout(function () {
                    "auto" === m && i.frame < 5 && "hidden" !== (d || {}).visibilityState && i.useRAF(!1)
                }, 1500)
        }),
            i = m.Ticker.prototype = new m.events.EventDispatcher,
            i.constructor = m.Ticker;
        var E = u("core.Animation", function (a, b) {
            if (this.vars = b = b || {},
                this._duration = this._totalDuration = a || 0,
                this._delay = Number(b.delay) || 0,
                this._timeScale = 1,
                this._active = !!b.immediateRender,
                this.data = b.data,
                this._reversed = !!b.reversed,
                Z) {
                k || j.wake();
                var c = this.vars.useFrames ? Y : Z;
                c.add(this, c._time),
                    this.vars.paused && this.paused(!0)
            }
        });
        j = E.ticker = new m.Ticker,
            i = E.prototype,
            i._dirty = i._gc = i._initted = i._paused = !1,
            i._totalTime = i._time = 0,
            i._rawPrevTime = -1,
            i._next = i._last = i._onUpdate = i._timeline = i.timeline = null,
            i._paused = !1;
        var F = function () {
            k && C() - D > 2e3 && ("hidden" !== (d || {}).visibilityState || !j.lagSmoothing()) && j.wake();
            var a = setTimeout(F, 2e3);
            a.unref && a.unref()
        };
        F(),
            i.play = function (a, b) {
                return null != a && this.seek(a, b),
                    this.reversed(!1).paused(!1)
            }
            ,
            i.pause = function (a, b) {
                return null != a && this.seek(a, b),
                    this.paused(!0)
            }
            ,
            i.resume = function (a, b) {
                return null != a && this.seek(a, b),
                    this.paused(!1)
            }
            ,
            i.seek = function (a, b) {
                return this.totalTime(Number(a), b !== !1)
            }
            ,
            i.restart = function (a, b) {
                return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
            }
            ,
            i.reverse = function (a, b) {
                return null != a && this.seek(a || this.totalDuration(), b),
                    this.reversed(!0).paused(!1)
            }
            ,
            i.render = function (a, b, c) { }
            ,
            i.invalidate = function () {
                return this._time = this._totalTime = 0,
                    this._initted = this._gc = !1,
                    this._rawPrevTime = -1,
                    (this._gc || !this.timeline) && this._enabled(!0),
                    this
            }
            ,
            i.isActive = function () {
                var a, b = this._timeline, c = this._startTime;
                return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this.totalDuration() / this._timeScale - n
            }
            ,
            i._enabled = function (a, b) {
                return k || j.wake(),
                    this._gc = !a,
                    this._active = this.isActive(),
                    b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)),
                    !1
            }
            ,
            i._kill = function (a, b) {
                return this._enabled(!1, !1)
            }
            ,
            i.kill = function (a, b) {
                return this._kill(a, b),
                    this
            }
            ,
            i._uncache = function (a) {
                for (var b = a ? this : this.timeline; b;)
                    b._dirty = !0,
                        b = b.timeline;
                return this
            }
            ,
            i._swapSelfInParams = function (a) {
                for (var b = a.length, c = a.concat(); --b > -1;)
                    "{self}" === a[b] && (c[b] = this);
                return c
            }
            ,
            i._callback = function (a) {
                var b = this.vars
                    , c = b[a]
                    , d = b[a + "Params"]
                    , e = b[a + "Scope"] || b.callbackScope || this
                    , f = d ? d.length : 0;
                switch (f) {
                    case 0:
                        c.call(e);
                        break;
                    case 1:
                        c.call(e, d[0]);
                        break;
                    case 2:
                        c.call(e, d[0], d[1]);
                        break;
                    default:
                        c.apply(e, d)
                }
            }
            ,
            i.eventCallback = function (a, b, c, d) {
                if ("on" === (a || "").substr(0, 2)) {
                    var e = this.vars;
                    if (1 === arguments.length)
                        return e[a];
                    null == b ? delete e[a] : (e[a] = b,
                        e[a + "Params"] = q(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c,
                        e[a + "Scope"] = d),
                        "onUpdate" === a && (this._onUpdate = b)
                }
                return this
            }
            ,
            i.delay = function (a) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay),
                    this._delay = a,
                    this) : this._delay
            }
            ,
            i.duration = function (a) {
                return arguments.length ? (this._duration = this._totalDuration = a,
                    this._uncache(!0),
                    this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0),
                    this) : (this._dirty = !1,
                        this._duration)
            }
            ,
            i.totalDuration = function (a) {
                return this._dirty = !1,
                    arguments.length ? this.duration(a) : this._totalDuration
            }
            ,
            i.time = function (a, b) {
                return arguments.length ? (this._dirty && this.totalDuration(),
                    this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
            }
            ,
            i.totalTime = function (a, b, c) {
                if (k || j.wake(),
                    !arguments.length)
                    return this._totalTime;
                if (this._timeline) {
                    if (0 > a && !c && (a += this.totalDuration()),
                        this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var d = this._totalDuration
                            , e = this._timeline;
                        if (a > d && !c && (a = d),
                            this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale,
                            e._dirty || this._uncache(!1),
                            e._timeline)
                            for (; e._timeline;)
                                e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0),
                                    e = e._timeline
                    }
                    this._gc && this._enabled(!0, !1),
                        (this._totalTime !== a || 0 === this._duration) && (K.length && _(),
                            this.render(a, b, !1),
                            K.length && _())
                }
                return this
            }
            ,
            i.progress = i.totalProgress = function (a, b) {
                var c = this.duration();
                return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio;
            }
            ,
            i.startTime = function (a) {
                return arguments.length ? (a !== this._startTime && (this._startTime = a,
                    this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)),
                    this) : this._startTime
            }
            ,
            i.endTime = function (a) {
                return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
            }
            ,
            i.timeScale = function (a) {
                if (!arguments.length)
                    return this._timeScale;
                var b, c;
                for (a = a || n,
                    this._timeline && this._timeline.smoothChildTiming && (b = this._pauseTime,
                        c = b || 0 === b ? b : this._timeline.totalTime(),
                        this._startTime = c - (c - this._startTime) * this._timeScale / a),
                    this._timeScale = a,
                    c = this.timeline; c && c.timeline;)
                    c._dirty = !0,
                        c.totalDuration(),
                        c = c.timeline;
                return this
            }
            ,
            i.reversed = function (a) {
                return arguments.length ? (a != this._reversed && (this._reversed = a,
                    this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
                    this) : this._reversed
            }
            ,
            i.paused = function (a) {
                if (!arguments.length)
                    return this._paused;
                var b, c, d = this._timeline;
                return a != this._paused && d && (k || a || j.wake(),
                    b = d.rawTime(),
                    c = b - this._pauseTime,
                    !a && d.smoothChildTiming && (this._startTime += c,
                        this._uncache(!1)),
                    this._pauseTime = a ? b : null,
                    this._paused = a,
                    this._active = this.isActive(),
                    !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale,
                        this.render(b, b === this._totalTime, !0))),
                    this._gc && !a && this._enabled(!0, !1),
                    this
            }
            ;
        var G = u("core.SimpleTimeline", function (a) {
            E.call(this, 0, a),
                this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        i = G.prototype = new E,
            i.constructor = G,
            i.kill()._gc = !1,
            i._first = i._last = i._recent = null,
            i._sortChildren = !1,
            i.add = i.insert = function (a, b, c, d) {
                var e, f;
                if (a._startTime = Number(b || 0) + a._delay,
                    a._paused && this !== a._timeline && (a._pauseTime = this.rawTime() - (a._timeline.rawTime() - a._pauseTime)),
                    a.timeline && a.timeline._remove(a, !0),
                    a.timeline = a._timeline = this,
                    a._gc && a._enabled(!0, !0),
                    e = this._last,
                    this._sortChildren)
                    for (f = a._startTime; e && e._startTime > f;)
                        e = e._prev;
                return e ? (a._next = e._next,
                    e._next = a) : (a._next = this._first,
                        this._first = a),
                    a._next ? a._next._prev = a : this._last = a,
                    a._prev = e,
                    this._recent = a,
                    this._timeline && this._uncache(!0),
                    this
            }
            ,
            i._remove = function (a, b) {
                return a.timeline === this && (b || a._enabled(!1, !0),
                    a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next),
                    a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev),
                    a._next = a._prev = a.timeline = null,
                    a === this._recent && (this._recent = this._last),
                    this._timeline && this._uncache(!0)),
                    this
            }
            ,
            i.render = function (a, b, c) {
                var d, e = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = a; e;)
                    d = e._next,
                        (e._active || a >= e._startTime && !e._paused && !e._gc) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)),
                        e = d
            }
            ,
            i.rawTime = function () {
                return k || j.wake(),
                    this._totalTime
            }
            ;
        var H = u("TweenLite", function (b, c, d) {
            if (E.call(this, c, d),
                this.render = H.prototype.render,
                null == b)
                throw "Cannot tween a null target.";
            this.target = b = "string" != typeof b ? b : H.selector(b) || b;
            var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType), i = this.vars.overwrite;
            if (this._overwrite = i = null == i ? X[H.defaultOverwrite] : "number" == typeof i ? i >> 0 : X[i],
                (h || b instanceof Array || b.push && q(b)) && "number" != typeof b[0])
                for (this._targets = g = o(b),
                    this._propLookup = [],
                    this._siblings = [],
                    e = 0; e < g.length; e++)
                    f = g[e],
                        f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1),
                            this._targets = g = g.concat(o(f))) : (this._siblings[e] = aa(f, this, !1),
                                1 === i && this._siblings[e].length > 1 && ca(f, this, null, 1, this._siblings[e])) : (f = g[e--] = H.selector(f),
                                    "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
            else
                this._propLookup = {},
                    this._siblings = aa(b, this, !1),
                    1 === i && this._siblings.length > 1 && ca(b, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -n,
                this.render(Math.min(0, -this._delay)))
        }, !0)
            , I = function (b) {
                return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
            }
            , J = function (a, b) {
                var c, d = {};
                for (c in a)
                    W[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!T[c] || T[c] && T[c]._autoCSS) || (d[c] = a[c],
                        delete a[c]);
                a.css = d
            };
        i = H.prototype = new E,
            i.constructor = H,
            i.kill()._gc = !1,
            i.ratio = 0,
            i._firstPT = i._targets = i._overwrittenProps = i._startAt = null,
            i._notifyPluginsOfEnabled = i._lazy = !1,
            H.version = "2.1.2",
            H.defaultEase = i._ease = new w(null, null, 1, 1),
            H.defaultOverwrite = "auto",
            H.ticker = j,
            H.autoSleep = 120,
            H.lagSmoothing = function (a, b) {
                j.lagSmoothing(a, b)
            }
            ,
            H.selector = a.$ || a.jQuery || function (b) {
                var c = a.$ || a.jQuery;
                return c ? (H.selector = c,
                    c(b)) : (d || (d = a.document),
                        d ? d.querySelectorAll ? d.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b) : b)
            }
            ;
        var K = []
            , L = {}
            , M = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
            , N = /[\+-]=-?[\.\d]/
            , O = function (a) {
                for (var b, c = this._firstPT, d = 1e-6; c;)
                    b = c.blob ? 1 === a && null != this.end ? this.end : a ? this.join("") : this.start : c.c * a + c.s,
                        c.m ? b = c.m.call(this._tween, b, this._target || c.t, this._tween) : d > b && b > -d && !c.blob && (b = 0),
                        c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b,
                        c = c._next
            }
            , P = function (a) {
                return (1e3 * a | 0) / 1e3 + ""
            }
            , Q = function (a, b, c, d) {
                var e, f, g, h, i, j, k, l = [], m = 0, n = "", o = 0;
                for (l.start = a,
                    l.end = b,
                    a = l[0] = a + "",
                    b = l[1] = b + "",
                    c && (c(l),
                        a = l[0],
                        b = l[1]),
                    l.length = 0,
                    e = a.match(M) || [],
                    f = b.match(M) || [],
                    d && (d._next = null,
                        d.blob = 1,
                        l._firstPT = l._applyPT = d),
                    i = f.length,
                    h = 0; i > h; h++)
                    k = f[h],
                        j = b.substr(m, b.indexOf(k, m) - m),
                        n += j || !h ? j : ",",
                        m += j.length,
                        o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1),
                        k === e[h] || e.length <= h ? n += k : (n && (l.push(n),
                            n = ""),
                            g = parseFloat(e[h]),
                            l.push(g),
                            l._firstPT = {
                                _next: l._firstPT,
                                t: l,
                                p: l.length - 1,
                                s: g,
                                c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
                                f: 0,
                                m: o && 4 > o ? Math.round : P
                            }),
                        m += k.length;
                return n += b.substr(m),
                    n && l.push(n),
                    l.setRatio = O,
                    N.test(b) && (l.end = null),
                    l
            }
            , R = function (a, b, c, d, e, f, g, h, i) {
                "function" == typeof d && (d = d(i || 0, a));
                var j, k = typeof a[b], l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3), m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b], n = "string" == typeof d && "=" === d.charAt(1), o = {
                    t: a,
                    p: b,
                    s: m,
                    f: "function" === k,
                    pg: 0,
                    n: e || b,
                    m: f ? "function" == typeof f ? f : Math.round : 0,
                    pr: 0,
                    c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0
                };
                return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) || "boolean" == typeof m || "boolean" == typeof d ? (o.fp = g,
                    j = Q(m, n ? parseFloat(o.s) + o.c + (o.s + "").replace(/[0-9\-\.]/g, "") : d, h || H.defaultStringFilter, o),
                    o = {
                        t: j,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: e || b,
                        pr: 0,
                        m: 0
                    }) : (o.s = parseFloat(m),
                        n || (o.c = parseFloat(d) - o.s || 0))),
                    o.c ? ((o._next = this._firstPT) && (o._next._prev = o),
                        this._firstPT = o,
                        o) : void 0
            }
            , S = H._internals = {
                isArray: q,
                isSelector: I,
                lazyTweens: K,
                blobDif: Q
            }
            , T = H._plugins = {}
            , U = S.tweenLookup = {}
            , V = 0
            , W = S.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1,
                callbackScope: 1,
                stringFilter: 1,
                id: 1,
                yoyoEase: 1,
                stagger: 1
            }
            , X = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            }
            , Y = E._rootFramesTimeline = new G
            , Z = E._rootTimeline = new G
            , $ = 30
            , _ = S.lazyRender = function () {
                var a, b, c = K.length;
                for (L = {},
                    a = 0; c > a; a++)
                    b = K[a],
                        b && b._lazy !== !1 && (b.render(b._lazy[0], b._lazy[1], !0),
                            b._lazy = !1);
                K.length = 0
            }
            ;
        Z._startTime = j.time,
            Y._startTime = j.frame,
            Z._active = Y._active = !0,
            setTimeout(_, 1),
            E._updateRoot = H.render = function () {
                var a, b, c;
                if (K.length && _(),
                    Z.render((j.time - Z._startTime) * Z._timeScale, !1, !1),
                    Y.render((j.frame - Y._startTime) * Y._timeScale, !1, !1),
                    K.length && _(),
                    j.frame >= $) {
                    $ = j.frame + (parseInt(H.autoSleep, 10) || 120);
                    for (c in U) {
                        for (b = U[c].tweens,
                            a = b.length; --a > -1;)
                            b[a]._gc && b.splice(a, 1);
                        0 === b.length && delete U[c]
                    }
                    if (c = Z._first,
                        (!c || c._paused) && H.autoSleep && !Y._first && 1 === j._listeners.tick.length) {
                        for (; c && c._paused;)
                            c = c._next;
                        c || j.sleep()
                    }
                }
            }
            ,
            j.addEventListener("tick", E._updateRoot);
        var aa = function (a, b, c) {
            var d, e, f = a._gsTweenID;
            if (U[f || (a._gsTweenID = f = "t" + V++)] || (U[f] = {
                target: a,
                tweens: []
            }),
                b && (d = U[f].tweens,
                    d[e = d.length] = b,
                    c))
                for (; --e > -1;)
                    d[e] === b && d.splice(e, 1);
            return U[f].tweens
        }
            , ba = function (a, b, c, d) {
                var e, f, g = a.vars.onOverwrite;
                return g && (e = g(a, b, c, d)),
                    g = H.onOverwrite,
                    g && (f = g(a, b, c, d)),
                    e !== !1 && f !== !1
            }
            , ca = function (a, b, c, d, e) {
                var f, g, h, i;
                if (1 === d || d >= 4) {
                    for (i = e.length,
                        f = 0; i > f; f++)
                        if ((h = e[f]) !== b)
                            h._gc || h._kill(null, a, b) && (g = !0);
                        else if (5 === d)
                            break;
                    return g
                }
                var j, k = b._startTime + n, l = [], m = 0, o = 0 === b._duration;
                for (f = e.length; --f > -1;)
                    (h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || da(b, 0, o),
                        0 === da(h, j, o) && (l[m++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2 * n || (l[m++] = h)));
                for (f = m; --f > -1;)
                    if (h = l[f],
                        i = h._firstPT,
                        2 === d && h._kill(c, a, b) && (g = !0),
                        2 !== d || !h._firstPT && h._initted && i) {
                        if (2 !== d && !ba(h, b))
                            continue;
                        h._enabled(!1, !1) && (g = !0)
                    }
                return g
            }
            , da = function (a, b, c) {
                for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                    if (f += d._startTime,
                        e *= d._timeScale,
                        d._paused)
                        return -100;
                    d = d._timeline
                }
                return f /= e,
                    f > b ? f - b : c && f === b || !a._initted && 2 * n > f - b ? n : (f += a.totalDuration() / a._timeScale / e) > b + n ? 0 : f - b - n
            };
        i._init = function () {
            var a, b, c, d, e, f, g = this.vars, h = this._overwrittenProps, i = this._duration, j = !!g.immediateRender, k = g.ease, l = this._startAt;
            if (g.startAt) {
                l && (l.render(-1, !0),
                    l.kill()),
                    e = {};
                for (d in g.startAt)
                    e[d] = g.startAt[d];
                if (e.data = "isStart",
                    e.overwrite = !1,
                    e.immediateRender = !0,
                    e.lazy = j && g.lazy !== !1,
                    e.startAt = e.delay = null,
                    e.onUpdate = g.onUpdate,
                    e.onUpdateParams = g.onUpdateParams,
                    e.onUpdateScope = g.onUpdateScope || g.callbackScope || this,
                    this._startAt = H.to(this.target || {}, 0, e),
                    j)
                    if (this._time > 0)
                        this._startAt = null;
                    else if (0 !== i)
                        return
            } else if (g.runBackwards && 0 !== i)
                if (l)
                    l.render(-1, !0),
                        l.kill(),
                        this._startAt = null;
                else {
                    0 !== this._time && (j = !1),
                        c = {};
                    for (d in g)
                        W[d] && "autoCSS" !== d || (c[d] = g[d]);
                    if (c.overwrite = 0,
                        c.data = "isFromStart",
                        c.lazy = j && g.lazy !== !1,
                        c.immediateRender = j,
                        this._startAt = H.to(this.target, 0, c),
                        j) {
                        if (0 === this._time)
                            return
                    } else
                        this._startAt._init(),
                            this._startAt._enabled(!1),
                            this.vars.immediateRender && (this._startAt = null)
                }
            if (this._ease = k = k ? k instanceof w ? k : "function" == typeof k ? new w(k, g.easeParams) : x[k] || H.defaultEase : H.defaultEase,
                g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)),
                this._easeType = this._ease._type,
                this._easePower = this._ease._power,
                this._firstPT = null,
                this._targets)
                for (f = this._targets.length,
                    a = 0; f > a; a++)
                    this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0);
            else
                b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);
            if (b && H._onPluginEvent("_onInitAllProps", this),
                h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
                g.runBackwards)
                for (c = this._firstPT; c;)
                    c.s += c.c,
                        c.c = -c.c,
                        c = c._next;
            this._onUpdate = g.onUpdate,
                this._initted = !0
        }
            ,
            i._initProps = function (b, c, d, e, f) {
                var g, h, i, j, k, l;
                if (null == b)
                    return !1;
                L[b._gsTweenID] && _(),
                    this.vars.css || b.style && b !== a && b.nodeType && T.css && this.vars.autoCSS !== !1 && J(this.vars, b);
                for (g in this.vars)
                    if (l = this.vars[g],
                        W[g])
                        l && (l instanceof Array || l.push && q(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this));
                    else if (T[g] && (j = new T[g])._onInitTween(b, this.vars[g], this, f)) {
                        for (this._firstPT = k = {
                            _next: this._firstPT,
                            t: j,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: g,
                            pg: 1,
                            pr: j._priority,
                            m: 0
                        },
                            h = j._overwriteProps.length; --h > -1;)
                            c[j._overwriteProps[h]] = this._firstPT;
                        (j._priority || j._onInitAllProps) && (i = !0),
                            (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0),
                            k._next && (k._next._prev = k)
                    } else
                        c[g] = R.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f);
                return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && ca(b, this, c, this._overwrite, d) ? (this._kill(c, b),
                    this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (L[b._gsTweenID] = !0),
                        i)
            }
            ,
            i.render = function (a, b, c) {
                var d, e, f, g, h = this, i = h._time, j = h._duration, k = h._rawPrevTime;
                if (a >= j - n && a >= 0)
                    h._totalTime = h._time = j,
                        h.ratio = h._ease._calcEnd ? h._ease.getRatio(1) : 1,
                        h._reversed || (d = !0,
                            e = "onComplete",
                            c = c || h._timeline.autoRemoveChildren),
                        0 === j && (h._initted || !h.vars.lazy || c) && (h._startTime === h._timeline._duration && (a = 0),
                            (0 > k || 0 >= a && a >= -n || k === n && "isPause" !== h.data) && k !== a && (c = !0,
                                k > n && (e = "onReverseComplete")),
                            h._rawPrevTime = g = !b || a || k === a ? a : n);
                else if (n > a)
                    h._totalTime = h._time = 0,
                        h.ratio = h._ease._calcEnd ? h._ease.getRatio(0) : 0,
                        (0 !== i || 0 === j && k > 0) && (e = "onReverseComplete",
                            d = h._reversed),
                        a > -n ? a = 0 : 0 > a && (h._active = !1,
                            0 === j && (h._initted || !h.vars.lazy || c) && (k >= 0 && (k !== n || "isPause" !== h.data) && (c = !0),
                                h._rawPrevTime = g = !b || a || k === a ? a : n)),
                        (!h._initted || h._startAt && h._startAt.progress()) && (c = !0);
                else if (h._totalTime = h._time = a,
                    h._easeType) {
                    var l = a / j
                        , m = h._easeType
                        , o = h._easePower;
                    (1 === m || 3 === m && l >= .5) && (l = 1 - l),
                        3 === m && (l *= 2),
                        1 === o ? l *= l : 2 === o ? l *= l * l : 3 === o ? l *= l * l * l : 4 === o && (l *= l * l * l * l),
                        h.ratio = 1 === m ? 1 - l : 2 === m ? l : .5 > a / j ? l / 2 : 1 - l / 2
                } else
                    h.ratio = h._ease.getRatio(a / j);
                if (h._time !== i || c) {
                    if (!h._initted) {
                        if (h._init(),
                            !h._initted || h._gc)
                            return;
                        if (!c && h._firstPT && (h.vars.lazy !== !1 && h._duration || h.vars.lazy && !h._duration))
                            return h._time = h._totalTime = i,
                                h._rawPrevTime = k,
                                K.push(h),
                                void (h._lazy = [a, b]);
                        h._time && !d ? h.ratio = h._ease.getRatio(h._time / j) : d && h._ease._calcEnd && (h.ratio = h._ease.getRatio(0 === h._time ? 0 : 1))
                    }
                    for (h._lazy !== !1 && (h._lazy = !1),
                        h._active || !h._paused && h._time !== i && a >= 0 && (h._active = !0),
                        0 === i && (h._startAt && (a >= 0 ? h._startAt.render(a, !0, c) : e || (e = "_dummyGS")),
                            h.vars.onStart && (0 !== h._time || 0 === j) && (b || h._callback("onStart"))),
                        f = h._firstPT; f;)
                        f.f ? f.t[f.p](f.c * h.ratio + f.s) : f.t[f.p] = f.c * h.ratio + f.s,
                            f = f._next;
                    h._onUpdate && (0 > a && h._startAt && a !== -1e-4 && h._startAt.render(a, !0, c),
                        b || (h._time !== i || d || c) && h._callback("onUpdate")),
                        e && (!h._gc || c) && (0 > a && h._startAt && !h._onUpdate && a !== -1e-4 && h._startAt.render(a, !0, c),
                            d && (h._timeline.autoRemoveChildren && h._enabled(!1, !1),
                                h._active = !1),
                            !b && h.vars[e] && h._callback(e),
                            0 === j && h._rawPrevTime === n && g !== n && (h._rawPrevTime = 0))
                }
            }
            ,
            i._kill = function (a, b, c) {
                if ("all" === a && (a = null),
                    null == a && (null == b || b === this.target))
                    return this._lazy = !1,
                        this._enabled(!1, !1);
                b = "string" != typeof b ? b || this._targets || this.target : H.selector(b) || b;
                var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline, n = this._firstPT;
                if ((q(b) || I(b)) && "number" != typeof b[0])
                    for (d = b.length; --d > -1;)
                        this._kill(a, b[d], c) && (i = !0);
                else {
                    if (this._targets) {
                        for (d = this._targets.length; --d > -1;)
                            if (b === this._targets[d]) {
                                h = this._propLookup[d] || {},
                                    this._overwrittenProps = this._overwrittenProps || [],
                                    e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
                                break
                            }
                    } else {
                        if (b !== this.target)
                            return !1;
                        h = this._propLookup,
                            e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                    }
                    if (h) {
                        if (j = a || h,
                            k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill),
                            c && (H.onOverwrite || this.vars.onOverwrite)) {
                            for (f in j)
                                h[f] && (l || (l = []),
                                    l.push(f));
                            if ((l || !a) && !ba(this, c, b, l))
                                return !1
                        }
                        for (f in j)
                            (g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s,
                                i = !0),
                                g.pg && g.t._kill(j) && (i = !0),
                                g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next),
                                    g._next && (g._next._prev = g._prev),
                                    g._next = g._prev = null),
                                delete h[f]),
                                k && (e[f] = 1);
                        !this._firstPT && this._initted && n && this._enabled(!1, !1)
                    }
                }
                return i
            }
            ,
            i.invalidate = function () {
                this._notifyPluginsOfEnabled && H._onPluginEvent("_onDisable", this);
                var a = this._time;
                return this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
                    this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
                    this._propLookup = this._targets ? {} : [],
                    E.prototype.invalidate.call(this),
                    this.vars.immediateRender && (this._time = -n,
                        this.render(a, !1, this.vars.lazy !== !1)),
                    this
            }
            ,
            i._enabled = function (a, b) {
                if (k || j.wake(),
                    a && this._gc) {
                    var c, d = this._targets;
                    if (d)
                        for (c = d.length; --c > -1;)
                            this._siblings[c] = aa(d[c], this, !0);
                    else
                        this._siblings = aa(this.target, this, !0)
                }
                return E.prototype._enabled.call(this, a, b),
                    this._notifyPluginsOfEnabled && this._firstPT ? H._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
            }
            ,
            H.to = function (a, b, c) {
                return new H(a, b, c)
            }
            ,
            H.from = function (a, b, c) {
                return c.runBackwards = !0,
                    c.immediateRender = 0 != c.immediateRender,
                    new H(a, b, c)
            }
            ,
            H.fromTo = function (a, b, c, d) {
                return d.startAt = c,
                    d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender,
                    new H(a, b, d)
            }
            ,
            H.delayedCall = function (a, b, c, d, e) {
                return new H(b, 0, {
                    delay: a,
                    onComplete: b,
                    onCompleteParams: c,
                    callbackScope: d,
                    onReverseComplete: b,
                    onReverseCompleteParams: c,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: e,
                    overwrite: 0
                })
            }
            ,
            H.set = function (a, b) {
                return new H(a, 0, b)
            }
            ,
            H.getTweensOf = function (a, b) {
                if (null == a)
                    return [];
                a = "string" != typeof a ? a : H.selector(a) || a;
                var c, d, e, f;
                if ((q(a) || I(a)) && "number" != typeof a[0]) {
                    for (c = a.length,
                        d = []; --c > -1;)
                        d = d.concat(H.getTweensOf(a[c], b));
                    for (c = d.length; --c > -1;)
                        for (f = d[c],
                            e = c; --e > -1;)
                            f === d[e] && d.splice(c, 1)
                } else if (a._gsTweenID)
                    for (d = aa(a).concat(),
                        c = d.length; --c > -1;)
                        (d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
                return d || []
            }
            ,
            H.killTweensOf = H.killDelayedCallsTo = function (a, b, c) {
                "object" == typeof b && (c = b,
                    b = !1);
                for (var d = H.getTweensOf(a, b), e = d.length; --e > -1;)
                    d[e]._kill(c, a)
            }
            ;
        var ea = u("plugins.TweenPlugin", function (a, b) {
            this._overwriteProps = (a || "").split(","),
                this._propName = this._overwriteProps[0],
                this._priority = b || 0,
                this._super = ea.prototype
        }, !0);
        if (i = ea.prototype,
            ea.version = "1.19.0",
            ea.API = 2,
            i._firstPT = null,
            i._addTween = R,
            i.setRatio = O,
            i._kill = function (a) {
                var b, c = this._overwriteProps, d = this._firstPT;
                if (null != a[this._propName])
                    this._overwriteProps = [];
                else
                    for (b = c.length; --b > -1;)
                        null != a[c[b]] && c.splice(b, 1);
                for (; d;)
                    null != a[d.n] && (d._next && (d._next._prev = d._prev),
                        d._prev ? (d._prev._next = d._next,
                            d._prev = null) : this._firstPT === d && (this._firstPT = d._next)),
                        d = d._next;
                return !1
            }
            ,
            i._mod = i._roundProps = function (a) {
                for (var b, c = this._firstPT; c;)
                    b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")],
                        b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b),
                        c = c._next
            }
            ,
            H._onPluginEvent = function (a, b) {
                var c, d, e, f, g, h = b._firstPT;
                if ("_onInitAllProps" === a) {
                    for (; h;) {
                        for (g = h._next,
                            d = e; d && d.pr > h.pr;)
                            d = d._next;
                        (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h,
                            (h._next = d) ? d._prev = h : f = h,
                            h = g
                    }
                    h = b._firstPT = e
                }
                for (; h;)
                    h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0),
                        h = h._next;
                return c
            }
            ,
            ea.activate = function (a) {
                for (var b = a.length; --b > -1;)
                    a[b].API === ea.API && (T[(new a[b])._propName] = a[b]);
                return !0
            }
            ,
            t.plugin = function (a) {
                if (!(a && a.propName && a.init && a.API))
                    throw "illegal plugin definition.";
                var b, c = a.propName, d = a.priority || 0, e = a.overwriteProps, f = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_mod",
                    mod: "_mod",
                    initAll: "_onInitAllProps"
                }, g = u("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function () {
                    ea.call(this, c, d),
                        this._overwriteProps = e || []
                }, a.global === !0), h = g.prototype = new ea(c);
                h.constructor = g,
                    g.API = a.API;
                for (b in f)
                    "function" == typeof a[b] && (h[f[b]] = a[b]);
                return g.version = a.version,
                    ea.activate([g]),
                    g
            }
            ,
            g = a._gsQueue) {
            for (h = 0; h < g.length; h++)
                g[h]();
            for (i in r)
                r[i].func || a.console.log("GSAP encountered missing dependency: " + i)
        }
        k = !1
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
//

/*! medium-zoom 1.0.4 | MIT License | https://github.com/francoischalifour/medium-zoom */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.mediumZoom = t()
}(this, function () {
    "use strict";
    var H = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var n in o)
                Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n])
        }
        return e
    }
        , o = function (e) {
            return "IMG" === e.tagName
        }
        , C = function (e) {
            return e && 1 === e.nodeType
        }
        , O = function (e) {
            return ".svg" === (e.currentSrc || e.src).substr(-4).toLowerCase()
        }
        , c = function (e) {
            try {
                return Array.isArray(e) ? e.filter(o) : (t = e,
                    NodeList.prototype.isPrototypeOf(t) ? [].slice.call(e).filter(o) : C(e) ? [e].filter(o) : "string" == typeof e ? [].slice.call(document.querySelectorAll(e)).filter(o) : [])
            } catch (e) {
                throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom")
            }
            var t
        }
        , x = function (e, t) {
            var o = H({
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            }, t);
            if ("function" == typeof window.CustomEvent)
                return new CustomEvent(e, o);
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, o.bubbles, o.cancelable, o.detail),
                n
        };
    return function (e, t) {
        void 0 === t && (t = {});
        var o = t.insertAt;
        if (e && "undefined" != typeof document) {
            var n = document.head || document.getElementsByTagName("head")[0]
                , i = document.createElement("style");
            i.type = "text/css",
                "top" === o && n.firstChild ? n.insertBefore(i, n.firstChild) : n.appendChild(i),
                i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e))
        }
    }(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}"),
        function t(e) {
            var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
                , n = window.Promise || function (e) {
                    function t() { }
                    e(t, t)
                }
                , i = function () {
                    for (var e = arguments.length, t = Array(e), o = 0; o < e; o++)
                        t[o] = arguments[o];
                    var i = t.reduce(function (e, t) {
                        return [].concat(e, c(t))
                    }, []);
                    return i.filter(function (e) {
                        return -1 === v.indexOf(e)
                    }).forEach(function (e) {
                        v.push(e),
                            e.classList.add("medium-zoom-image")
                    }),
                        m.forEach(function (e) {
                            var t = e.type
                                , o = e.listener
                                , n = e.options;
                            i.forEach(function (e) {
                                e.addEventListener(t, o, n)
                            })
                        }),
                        L
                }
                , d = function () {
                    var p = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).target
                        , g = function () {
                            var e = {
                                width: document.documentElement.clientWidth,
                                height: document.documentElement.clientHeight,
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0
                            }
                                , t = void 0
                                , o = void 0;
                            if (b.container)
                                if (b.container instanceof Object)
                                    t = (e = H({}, e, b.container)).width - e.left - e.right - 2 * b.margin,
                                        o = e.height - e.top - e.bottom - 2 * b.margin;
                                else {
                                    var n = (C(b.container) ? b.container : document.querySelector(b.container)).getBoundingClientRect()
                                        , i = n.width
                                        , d = n.height
                                        , r = n.left
                                        , m = n.top;
                                    e = H({}, e, {
                                        width: i,
                                        height: d,
                                        left: r,
                                        top: m
                                    })
                                }
                            t = t || e.width - 2 * b.margin,
                                o = o || e.height - 2 * b.margin;
                            var a = E.zoomedHd || E.original
                                , l = O(a) ? t : a.naturalWidth || t
                                , c = O(a) ? o : a.naturalHeight || o
                                , u = a.getBoundingClientRect()
                                , s = u.top
                                , f = u.left
                                , p = u.width
                                , g = u.height
                                , h = Math.min(l, t) / p
                                , v = Math.min(c, o) / g
                                , z = Math.min(h, v)
                                , y = "scale(" + z + ") translate3d(" + ((t - p) / 2 - f + b.margin + e.left) / z + "px, " + ((o - g) / 2 - s + b.margin + e.top) / z + "px, 0)";
                            E.zoomed.style.transform = y,
                                E.zoomedHd && (E.zoomedHd.style.transform = y)
                        };
                    return new n(function (t) {
                        if (p && -1 === v.indexOf(p))
                            t(L);
                        else if (E.zoomed)
                            t(L);
                        else {
                            if (p)
                                E.original = p;
                            else {
                                if (!(0 < v.length))
                                    return void t(L);
                                var e = v;
                                E.original = e[0]
                            }
                            var o, n, i, d, r, m, a, l, c;
                            if (E.original.dispatchEvent(x("medium-zoom:open", {
                                detail: {
                                    zoom: L
                                }
                            })),
                                y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                                z = !0,
                                E.zoomed = (o = E.original,
                                    n = o.getBoundingClientRect(),
                                    i = n.top,
                                    d = n.left,
                                    r = n.width,
                                    m = n.height,
                                    a = o.cloneNode(),
                                    l = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                                    c = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                                    a.removeAttribute("id"),
                                    a.style.position = "absolute",
                                    a.style.top = i + l + "px",
                                    a.style.left = d + c + "px",
                                    a.style.width = r + "px",
                                    a.style.height = m + "px",
                                    a.style.transform = "",
                                    a),
                                document.body.appendChild(w),
                                b.template) {
                                var u = C(b.template) ? b.template : document.querySelector(b.template);
                                E.template = document.createElement("div"),
                                    E.template.appendChild(u.content.cloneNode(!0)),
                                    document.body.appendChild(E.template)
                            }
                            if (document.body.appendChild(E.zoomed),
                                window.requestAnimationFrame(function () {
                                    document.body.classList.add("medium-zoom--opened")
                                }),
                                E.original.classList.add("medium-zoom-image--hidden"),
                                E.zoomed.classList.add("medium-zoom-image--opened"),
                                E.zoomed.addEventListener("click", h),
                                E.zoomed.addEventListener("transitionend", function e() {
                                    z = !1,
                                        E.zoomed.removeEventListener("transitionend", e),
                                        E.original.dispatchEvent(x("medium-zoom:opened", {
                                            detail: {
                                                zoom: L
                                            }
                                        })),
                                        t(L)
                                }),
                                E.original.getAttribute("data-zoom-src")) {
                                E.zoomedHd = E.zoomed.cloneNode(),
                                    E.zoomedHd.removeAttribute("srcset"),
                                    E.zoomedHd.removeAttribute("sizes"),
                                    E.zoomedHd.src = E.zoomed.getAttribute("data-zoom-src"),
                                    E.zoomedHd.onerror = function () {
                                        clearInterval(s),
                                            console.warn("Unable to reach the zoom image target " + E.zoomedHd.src),
                                            E.zoomedHd = null,
                                            g()
                                    }
                                    ;
                                var s = setInterval(function () {
                                    E.zoomedHd.complete && (clearInterval(s),
                                        E.zoomedHd.classList.add("medium-zoom-image--opened"),
                                        E.zoomedHd.addEventListener("click", h),
                                        document.body.appendChild(E.zoomedHd),
                                        g())
                                }, 10)
                            } else if (E.original.hasAttribute("srcset")) {
                                E.zoomedHd = E.zoomed.cloneNode(),
                                    E.zoomedHd.removeAttribute("sizes");
                                var f = E.zoomedHd.addEventListener("load", function () {
                                    E.zoomedHd.removeEventListener("load", f),
                                        E.zoomedHd.classList.add("medium-zoom-image--opened"),
                                        E.zoomedHd.addEventListener("click", h),
                                        document.body.appendChild(E.zoomedHd),
                                        g()
                                })
                            } else
                                g()
                        }
                    }
                    )
                }
                , h = function () {
                    return new n(function (t) {
                        !z && E.original ? (z = !0,
                            document.body.classList.remove("medium-zoom--opened"),
                            E.zoomed.style.transform = "",
                            E.zoomedHd && (E.zoomedHd.style.transform = ""),
                            E.template && (E.template.style.transition = "opacity 150ms",
                                E.template.style.opacity = 0),
                            E.original.dispatchEvent(x("medium-zoom:close", {
                                detail: {
                                    zoom: L
                                }
                            })),
                            E.zoomed.addEventListener("transitionend", function e() {
                                E.original.classList.remove("medium-zoom-image--hidden"),
                                    document.body.removeChild(E.zoomed),
                                    E.zoomedHd && document.body.removeChild(E.zoomedHd),
                                    document.body.removeChild(w),
                                    E.zoomed.classList.remove("medium-zoom-image--opened"),
                                    E.template && document.body.removeChild(E.template),
                                    z = !1,
                                    E.zoomed.removeEventListener("transitionend", e),
                                    E.original.dispatchEvent(x("medium-zoom:closed", {
                                        detail: {
                                            zoom: L
                                        }
                                    })),
                                    E.original = null,
                                    E.zoomed = null,
                                    E.zoomedHd = null,
                                    E.template = null,
                                    t(L)
                            })) : t(L)
                    }
                    )
                }
                , r = function () {
                    var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).target;
                    return E.original ? h() : d({
                        target: e
                    })
                }
                , v = []
                , m = []
                , z = !1
                , y = 0
                , b = o
                , E = {
                    original: null,
                    zoomed: null,
                    zoomedHd: null,
                    template: null
                };
            "[object Object]" === Object.prototype.toString.call(e) ? b = e : (e || "string" == typeof e) && i(e),
                b = H({
                    margin: 0,
                    background: "#fff",
                    scrollOffset: 40,
                    container: null,
                    template: null
                }, b);
            var a, l, w = (a = b.background,
                (l = document.createElement("div")).classList.add("medium-zoom-overlay"),
                l.style.background = a,
                l);
            document.addEventListener("click", function (e) {
                var t = e.target;
                t !== w ? -1 !== v.indexOf(t) && r({
                    target: t
                }) : h()
            }),
                document.addEventListener("keyup", function (e) {
                    27 === (e.keyCode || e.which) && h()
                }),
                document.addEventListener("scroll", function () {
                    if (!z && E.original) {
                        var e = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                        Math.abs(y - e) > b.scrollOffset && setTimeout(h, 150)
                    }
                }),
                window.addEventListener("resize", h);
            var L = {
                open: d,
                close: h,
                toggle: r,
                update: function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
                        , t = e;
                    if (e.background && (w.style.background = e.background),
                        e.container && e.container instanceof Object && (t.container = H({}, b.container, e.container)),
                        e.template) {
                        var o = C(e.template) ? e.template : document.querySelector(e.template);
                        t.template = o
                    }
                    return b = H({}, b, t),
                        v.forEach(function (e) {
                            e.dispatchEvent(x("medium-zoom:update", {
                                detail: {
                                    zoom: L
                                }
                            }))
                        }),
                        L
                },
                clone: function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                    return t(H({}, b, e))
                },
                attach: i,
                detach: function () {
                    for (var e = arguments.length, t = Array(e), o = 0; o < e; o++)
                        t[o] = arguments[o];
                    E.zoomed && h();
                    var n = 0 < t.length ? t.reduce(function (e, t) {
                        return [].concat(e, c(t))
                    }, []) : v;
                    return n.forEach(function (e) {
                        e.classList.remove("medium-zoom-image"),
                            e.dispatchEvent(x("medium-zoom:detach", {
                                detail: {
                                    zoom: L
                                }
                            }))
                    }),
                        v = v.filter(function (e) {
                            return -1 === n.indexOf(e)
                        }),
                        L
                },
                on: function (t, o) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                    return v.forEach(function (e) {
                        e.addEventListener("medium-zoom:" + t, o, n)
                    }),
                        m.push({
                            type: "medium-zoom:" + t,
                            listener: o,
                            options: n
                        }),
                        L
                },
                off: function (t, o) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                    return v.forEach(function (e) {
                        e.removeEventListener("medium-zoom:" + t, o, n)
                    }),
                        m = m.filter(function (e) {
                            return !(e.type === "medium-zoom:" + t && e.listener.toString() === o.toString())
                        }),
                        L
                },
                getOptions: function () {
                    return b
                },
                getImages: function () {
                    return v
                },
                getZoomedImage: function () {
                    return E.original
                }
            };
            return L
        }
});

!function (t) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Parallax = t()
    }
}(function () {
    return function t(e, i, n) {
        function o(r, a) {
            if (!i[r]) {
                if (!e[r]) {
                    var l = "function" == typeof require && require;
                    if (!a && l)
                        return l(r, !0);
                    if (s)
                        return s(r, !0);
                    var h = new Error("Cannot find module '" + r + "'");
                    throw h.code = "MODULE_NOT_FOUND",
                    h
                }
                var u = i[r] = {
                    exports: {}
                };
                e[r][0].call(u.exports, function (t) {
                    var i = e[r][1][t];
                    return o(i || t)
                }, u, u.exports, t, e, i, n)
            }
            return i[r].exports
        }
        for (var s = "function" == typeof require && require, r = 0; r < n.length; r++)
            o(n[r]);
        return o
    }({
        1: [function (t, e, i) {
            "use strict";
            function n(t) {
                if (null === t || void 0 === t)
                    throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }
            var o = Object.getOwnPropertySymbols
                , s = Object.prototype.hasOwnProperty
                , r = Object.prototype.propertyIsEnumerable;
            e.exports = function () {
                try {
                    if (!Object.assign)
                        return !1;
                    var t = new String("abc");
                    if (t[5] = "de",
                        "5" === Object.getOwnPropertyNames(t)[0])
                        return !1;
                    for (var e = {}, i = 0; i < 10; i++)
                        e["_" + String.fromCharCode(i)] = i;
                    if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
                        return e[t]
                    }).join(""))
                        return !1;
                    var n = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function (t) {
                        n[t] = t
                    }),
                        "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
                } catch (t) {
                    return !1
                }
            }() ? Object.assign : function (t, e) {
                for (var i, a, l = n(t), h = 1; h < arguments.length; h++) {
                    i = Object(arguments[h]);
                    for (var u in i)
                        s.call(i, u) && (l[u] = i[u]);
                    if (o) {
                        a = o(i);
                        for (var c = 0; c < a.length; c++)
                            r.call(i, a[c]) && (l[a[c]] = i[a[c]])
                    }
                }
                return l
            }
        }
            , {}],
        2: [function (t, e, i) {
            (function (t) {
                (function () {
                    var i, n, o, s, r, a;
                    "undefined" != typeof performance && null !== performance && performance.now ? e.exports = function () {
                        return performance.now()
                    }
                        : void 0 !== t && null !== t && t.hrtime ? (e.exports = function () {
                            return (i() - r) / 1e6
                        }
                            ,
                            n = t.hrtime,
                            s = (i = function () {
                                var t;
                                return 1e9 * (t = n())[0] + t[1]
                            }
                            )(),
                            a = 1e9 * t.uptime(),
                            r = s - a) : Date.now ? (e.exports = function () {
                                return Date.now() - o
                            }
                                ,
                                o = Date.now()) : (e.exports = function () {
                                    return (new Date).getTime() - o
                                }
                                    ,
                                    o = (new Date).getTime())
                }
                ).call(this)
            }
            ).call(this, t("_process"))
        }
            , {
            _process: 3
        }],
        3: [function (t, e, i) {
            function n() {
                throw new Error("setTimeout has not been defined")
            }
            function o() {
                throw new Error("clearTimeout has not been defined")
            }
            function s(t) {
                if (c === setTimeout)
                    return setTimeout(t, 0);
                if ((c === n || !c) && setTimeout)
                    return c = setTimeout,
                        setTimeout(t, 0);
                try {
                    return c(t, 0)
                } catch (e) {
                    try {
                        return c.call(null, t, 0)
                    } catch (e) {
                        return c.call(this, t, 0)
                    }
                }
            }
            function r(t) {
                if (d === clearTimeout)
                    return clearTimeout(t);
                if ((d === o || !d) && clearTimeout)
                    return d = clearTimeout,
                        clearTimeout(t);
                try {
                    return d(t)
                } catch (e) {
                    try {
                        return d.call(null, t)
                    } catch (e) {
                        return d.call(this, t)
                    }
                }
            }
            function a() {
                v && p && (v = !1,
                    p.length ? f = p.concat(f) : y = -1,
                    f.length && l())
            }
            function l() {
                if (!v) {
                    var t = s(a);
                    v = !0;
                    for (var e = f.length; e;) {
                        for (p = f,
                            f = []; ++y < e;)
                            p && p[y].run();
                        y = -1,
                            e = f.length
                    }
                    p = null,
                        v = !1,
                        r(t)
                }
            }
            function h(t, e) {
                this.fun = t,
                    this.array = e
            }
            function u() { }
            var c, d, m = e.exports = {};
            !function () {
                try {
                    c = "function" == typeof setTimeout ? setTimeout : n
                } catch (t) {
                    c = n
                }
                try {
                    d = "function" == typeof clearTimeout ? clearTimeout : o
                } catch (t) {
                    d = o
                }
            }();
            var p, f = [], v = !1, y = -1;
            m.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var i = 1; i < arguments.length; i++)
                        e[i - 1] = arguments[i];
                f.push(new h(t, e)),
                    1 !== f.length || v || s(l)
            }
                ,
                h.prototype.run = function () {
                    this.fun.apply(null, this.array)
                }
                ,
                m.title = "browser",
                m.browser = !0,
                m.env = {},
                m.argv = [],
                m.version = "",
                m.versions = {},
                m.on = u,
                m.addListener = u,
                m.once = u,
                m.off = u,
                m.removeListener = u,
                m.removeAllListeners = u,
                m.emit = u,
                m.prependListener = u,
                m.prependOnceListener = u,
                m.listeners = function (t) {
                    return []
                }
                ,
                m.binding = function (t) {
                    throw new Error("process.binding is not supported")
                }
                ,
                m.cwd = function () {
                    return "/"
                }
                ,
                m.chdir = function (t) {
                    throw new Error("process.chdir is not supported")
                }
                ,
                m.umask = function () {
                    return 0
                }
        }
            , {}],
        4: [function (t, e, i) {
            (function (i) {
                for (var n = t("performance-now"), o = "undefined" == typeof window ? i : window, s = ["moz", "webkit"], r = "AnimationFrame", a = o["request" + r], l = o["cancel" + r] || o["cancelRequest" + r], h = 0; !a && h < s.length; h++)
                    a = o[s[h] + "Request" + r],
                        l = o[s[h] + "Cancel" + r] || o[s[h] + "CancelRequest" + r];
                if (!a || !l) {
                    var u = 0
                        , c = 0
                        , d = [];
                    a = function (t) {
                        if (0 === d.length) {
                            var e = n()
                                , i = Math.max(0, 1e3 / 60 - (e - u));
                            u = i + e,
                                setTimeout(function () {
                                    var t = d.slice(0);
                                    d.length = 0;
                                    for (var e = 0; e < t.length; e++)
                                        if (!t[e].cancelled)
                                            try {
                                                t[e].callback(u)
                                            } catch (t) {
                                                setTimeout(function () {
                                                    throw t
                                                }, 0)
                                            }
                                }, Math.round(i))
                        }
                        return d.push({
                            handle: ++c,
                            callback: t,
                            cancelled: !1
                        }),
                            c
                    }
                        ,
                        l = function (t) {
                            for (var e = 0; e < d.length; e++)
                                d[e].handle === t && (d[e].cancelled = !0)
                        }
                }
                e.exports = function (t) {
                    return a.call(o, t)
                }
                    ,
                    e.exports.cancel = function () {
                        l.apply(o, arguments)
                    }
                    ,
                    e.exports.polyfill = function () {
                        o.requestAnimationFrame = a,
                            o.cancelAnimationFrame = l
                    }
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
            , {
            "performance-now": 2
        }],
        5: [function (t, e, i) {
            "use strict";
            function n(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(t, n.key, n)
                    }
                }
                return function (e, i, n) {
                    return i && t(e.prototype, i),
                        n && t(e, n),
                        e
                }
            }()
                , s = t("raf")
                , r = t("object-assign")
                , a = {
                    propertyCache: {},
                    vendors: [null, ["-webkit-", "webkit"], ["-moz-", "Moz"], ["-o-", "O"], ["-ms-", "ms"]],
                    clamp: function (t, e, i) {
                        return e < i ? t < e ? e : t > i ? i : t : t < i ? i : t > e ? e : t
                    },
                    data: function (t, e) {
                        return a.deserialize(t.getAttribute("data-" + e))
                    },
                    deserialize: function (t) {
                        return "true" === t || "false" !== t && ("null" === t ? null : !isNaN(parseFloat(t)) && isFinite(t) ? parseFloat(t) : t)
                    },
                    camelCase: function (t) {
                        return t.replace(/-+(.)?/g, function (t, e) {
                            return e ? e.toUpperCase() : ""
                        })
                    },
                    accelerate: function (t) {
                        a.css(t, "transform", "translate3d(0,0,0) rotate(0.0001deg)"),
                            a.css(t, "transform-style", "preserve-3d"),
                            a.css(t, "backface-visibility", "hidden")
                    },
                    transformSupport: function (t) {
                        for (var e = document.createElement("div"), i = !1, n = null, o = !1, s = null, r = null, l = 0, h = a.vendors.length; l < h; l++)
                            if (null !== a.vendors[l] ? (s = a.vendors[l][0] + "transform",
                                r = a.vendors[l][1] + "Transform") : (s = "transform",
                                    r = "transform"),
                                void 0 !== e.style[r]) {
                                i = !0;
                                break
                            }
                        switch (t) {
                            case "2D":
                                o = i;
                                break;
                            case "3D":
                                if (i) {
                                    var u = document.body || document.createElement("body")
                                        , c = document.documentElement
                                        , d = c.style.overflow
                                        , m = !1;
                                    document.body || (m = !0,
                                        c.style.overflow = "hidden",
                                        c.appendChild(u),
                                        u.style.overflow = "hidden",
                                        u.style.background = ""),
                                        u.appendChild(e),
                                        e.style[r] = "translate3d(1px,1px,1px)",
                                        o = void 0 !== (n = window.getComputedStyle(e).getPropertyValue(s)) && n.length > 0 && "none" !== n,
                                        c.style.overflow = d,
                                        u.removeChild(e),
                                        m && (u.removeAttribute("style"),
                                            u.parentNode.removeChild(u))
                                }
                        }
                        return o
                    },
                    css: function (t, e, i) {
                        var n = a.propertyCache[e];
                        if (!n)
                            for (var o = 0, s = a.vendors.length; o < s; o++)
                                if (n = null !== a.vendors[o] ? a.camelCase(a.vendors[o][1] + "-" + e) : e,
                                    void 0 !== t.style[n]) {
                                    a.propertyCache[e] = n;
                                    break
                                }
                        t.style[n] = i
                    }
                }
                , l = {
                    relativeInput: !1,
                    clipRelativeInput: !1,
                    inputElement: null,
                    hoverOnly: !1,
                    calibrationThreshold: 100,
                    calibrationDelay: 500,
                    supportDelay: 500,
                    calibrateX: !1,
                    calibrateY: !0,
                    invertX: !0,
                    invertY: !0,
                    limitX: !1,
                    limitY: !1,
                    scalarX: 10,
                    scalarY: 10,
                    frictionX: .1,
                    frictionY: .1,
                    originX: .5,
                    originY: .5,
                    pointerEvents: !1,
                    precision: 1,
                    onReady: null,
                    selector: null
                }
                , h = function () {
                    function t(e, i) {
                        n(this, t),
                            this.element = e;
                        var o = {
                            calibrateX: a.data(this.element, "calibrate-x"),
                            calibrateY: a.data(this.element, "calibrate-y"),
                            invertX: a.data(this.element, "invert-x"),
                            invertY: a.data(this.element, "invert-y"),
                            limitX: a.data(this.element, "limit-x"),
                            limitY: a.data(this.element, "limit-y"),
                            scalarX: a.data(this.element, "scalar-x"),
                            scalarY: a.data(this.element, "scalar-y"),
                            frictionX: a.data(this.element, "friction-x"),
                            frictionY: a.data(this.element, "friction-y"),
                            originX: a.data(this.element, "origin-x"),
                            originY: a.data(this.element, "origin-y"),
                            pointerEvents: a.data(this.element, "pointer-events"),
                            precision: a.data(this.element, "precision"),
                            relativeInput: a.data(this.element, "relative-input"),
                            clipRelativeInput: a.data(this.element, "clip-relative-input"),
                            hoverOnly: a.data(this.element, "hover-only"),
                            inputElement: document.querySelector(a.data(this.element, "input-element")),
                            selector: a.data(this.element, "selector")
                        };
                        for (var s in o)
                            null === o[s] && delete o[s];
                        r(this, l, o, i),
                            this.inputElement || (this.inputElement = this.element),
                            this.calibrationTimer = null,
                            this.calibrationFlag = !0,
                            this.enabled = !1,
                            this.depthsX = [],
                            this.depthsY = [],
                            this.raf = null,
                            this.bounds = null,
                            this.elementPositionX = 0,
                            this.elementPositionY = 0,
                            this.elementWidth = 0,
                            this.elementHeight = 0,
                            this.elementCenterX = 0,
                            this.elementCenterY = 0,
                            this.elementRangeX = 0,
                            this.elementRangeY = 0,
                            this.calibrationX = 0,
                            this.calibrationY = 0,
                            this.inputX = 0,
                            this.inputY = 0,
                            this.motionX = 0,
                            this.motionY = 0,
                            this.velocityX = 0,
                            this.velocityY = 0,
                            this.onMouseMove = this.onMouseMove.bind(this),
                            this.onDeviceOrientation = this.onDeviceOrientation.bind(this),
                            this.onDeviceMotion = this.onDeviceMotion.bind(this),
                            this.onOrientationTimer = this.onOrientationTimer.bind(this),
                            this.onMotionTimer = this.onMotionTimer.bind(this),
                            this.onCalibrationTimer = this.onCalibrationTimer.bind(this),
                            this.onAnimationFrame = this.onAnimationFrame.bind(this),
                            this.onWindowResize = this.onWindowResize.bind(this),
                            this.windowWidth = null,
                            this.windowHeight = null,
                            this.windowCenterX = null,
                            this.windowCenterY = null,
                            this.windowRadiusX = null,
                            this.windowRadiusY = null,
                            this.portrait = !1,
                            this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
                            this.motionSupport = !!window.DeviceMotionEvent && !this.desktop,
                            this.orientationSupport = !!window.DeviceOrientationEvent && !this.desktop,
                            this.orientationStatus = 0,
                            this.motionStatus = 0,
                            this.initialise()
                    }
                    return o(t, [{
                        key: "initialise",
                        value: function () {
                            void 0 === this.transform2DSupport && (this.transform2DSupport = a.transformSupport("2D"),
                                this.transform3DSupport = a.transformSupport("3D")),
                                this.transform3DSupport && a.accelerate(this.element),
                                "static" === window.getComputedStyle(this.element).getPropertyValue("position") && (this.element.style.position = "relative"),
                                this.pointerEvents || (this.element.style.pointerEvents = "none"),
                                this.updateLayers(),
                                this.updateDimensions(),
                                this.enable(),
                                this.queueCalibration(this.calibrationDelay)
                        }
                    }, {
                        key: "doReadyCallback",
                        value: function () {
                            this.onReady && this.onReady()
                        }
                    }, {
                        key: "updateLayers",
                        value: function () {
                            this.selector ? this.layers = this.element.querySelectorAll(this.selector) : this.layers = this.element.children,
                                this.layers.length || console.warn("ParallaxJS: Your scene does not have any layers."),
                                this.depthsX = [],
                                this.depthsY = [];
                            for (var t = 0; t < this.layers.length; t++) {
                                var e = this.layers[t];
                                this.transform3DSupport && a.accelerate(e),
                                    e.style.position = t ? "absolute" : "relative",
                                    e.style.display = "block",
                                    e.style.left = 0,
                                    e.style.top = 0;
                                var i = a.data(e, "depth") || 0;
                                this.depthsX.push(a.data(e, "depth-x") || i),
                                    this.depthsY.push(a.data(e, "depth-y") || i)
                            }
                        }
                    }, {
                        key: "updateDimensions",
                        value: function () {
                            this.windowWidth = window.innerWidth,
                                this.windowHeight = window.innerHeight,
                                this.windowCenterX = this.windowWidth * this.originX,
                                this.windowCenterY = this.windowHeight * this.originY,
                                this.windowRadiusX = Math.max(this.windowCenterX, this.windowWidth - this.windowCenterX),
                                this.windowRadiusY = Math.max(this.windowCenterY, this.windowHeight - this.windowCenterY)
                        }
                    }, {
                        key: "updateBounds",
                        value: function () {
                            this.bounds = this.inputElement.getBoundingClientRect(),
                                this.elementPositionX = this.bounds.left,
                                this.elementPositionY = this.bounds.top,
                                this.elementWidth = this.bounds.width,
                                this.elementHeight = this.bounds.height,
                                this.elementCenterX = this.elementWidth * this.originX,
                                this.elementCenterY = this.elementHeight * this.originY,
                                this.elementRangeX = Math.max(this.elementCenterX, this.elementWidth - this.elementCenterX),
                                this.elementRangeY = Math.max(this.elementCenterY, this.elementHeight - this.elementCenterY)
                        }
                    }, {
                        key: "queueCalibration",
                        value: function (t) {
                            clearTimeout(this.calibrationTimer),
                                this.calibrationTimer = setTimeout(this.onCalibrationTimer, t)
                        }
                    }, {
                        key: "enable",
                        value: function () {
                            this.enabled || (this.enabled = !0,
                                this.orientationSupport ? (this.portrait = !1,
                                    window.addEventListener("deviceorientation", this.onDeviceOrientation),
                                    this.detectionTimer = setTimeout(this.onOrientationTimer, this.supportDelay)) : this.motionSupport ? (this.portrait = !1,
                                        window.addEventListener("devicemotion", this.onDeviceMotion),
                                        this.detectionTimer = setTimeout(this.onMotionTimer, this.supportDelay)) : (this.calibrationX = 0,
                                            this.calibrationY = 0,
                                            this.portrait = !1,
                                            window.addEventListener("mousemove", this.onMouseMove),
                                            this.doReadyCallback()),
                                window.addEventListener("resize", this.onWindowResize),
                                this.raf = s(this.onAnimationFrame))
                        }
                    }, {
                        key: "disable",
                        value: function () {
                            this.enabled && (this.enabled = !1,
                                this.orientationSupport ? window.removeEventListener("deviceorientation", this.onDeviceOrientation) : this.motionSupport ? window.removeEventListener("devicemotion", this.onDeviceMotion) : window.removeEventListener("mousemove", this.onMouseMove),
                                window.removeEventListener("resize", this.onWindowResize),
                                s.cancel(this.raf))
                        }
                    }, {
                        key: "calibrate",
                        value: function (t, e) {
                            this.calibrateX = void 0 === t ? this.calibrateX : t,
                                this.calibrateY = void 0 === e ? this.calibrateY : e
                        }
                    }, {
                        key: "invert",
                        value: function (t, e) {
                            this.invertX = void 0 === t ? this.invertX : t,
                                this.invertY = void 0 === e ? this.invertY : e
                        }
                    }, {
                        key: "friction",
                        value: function (t, e) {
                            this.frictionX = void 0 === t ? this.frictionX : t,
                                this.frictionY = void 0 === e ? this.frictionY : e
                        }
                    }, {
                        key: "scalar",
                        value: function (t, e) {
                            this.scalarX = void 0 === t ? this.scalarX : t,
                                this.scalarY = void 0 === e ? this.scalarY : e
                        }
                    }, {
                        key: "limit",
                        value: function (t, e) {
                            this.limitX = void 0 === t ? this.limitX : t,
                                this.limitY = void 0 === e ? this.limitY : e
                        }
                    }, {
                        key: "origin",
                        value: function (t, e) {
                            this.originX = void 0 === t ? this.originX : t,
                                this.originY = void 0 === e ? this.originY : e
                        }
                    }, {
                        key: "setInputElement",
                        value: function (t) {
                            this.inputElement = t,
                                this.updateDimensions()
                        }
                    }, {
                        key: "setPosition",
                        value: function (t, e, i) {
                            e = e.toFixed(this.precision) + "px",
                                i = i.toFixed(this.precision) + "px",
                                this.transform3DSupport ? a.css(t, "transform", "translate3d(" + e + "," + i + ",0)") : this.transform2DSupport ? a.css(t, "transform", "translate(" + e + "," + i + ")") : (t.style.left = e,
                                    t.style.top = i)
                        }
                    }, {
                        key: "onOrientationTimer",
                        value: function () {
                            this.orientationSupport && 0 === this.orientationStatus ? (this.disable(),
                                this.orientationSupport = !1,
                                this.enable()) : this.doReadyCallback()
                        }
                    }, {
                        key: "onMotionTimer",
                        value: function () {
                            this.motionSupport && 0 === this.motionStatus ? (this.disable(),
                                this.motionSupport = !1,
                                this.enable()) : this.doReadyCallback()
                        }
                    }, {
                        key: "onCalibrationTimer",
                        value: function () {
                            this.calibrationFlag = !0
                        }
                    }, {
                        key: "onWindowResize",
                        value: function () {
                            this.updateDimensions()
                        }
                    }, {
                        key: "onAnimationFrame",
                        value: function () {
                            this.updateBounds();
                            var t = this.inputX - this.calibrationX
                                , e = this.inputY - this.calibrationY;
                            (Math.abs(t) > this.calibrationThreshold || Math.abs(e) > this.calibrationThreshold) && this.queueCalibration(0),
                                this.portrait ? (this.motionX = this.calibrateX ? e : this.inputY,
                                    this.motionY = this.calibrateY ? t : this.inputX) : (this.motionX = this.calibrateX ? t : this.inputX,
                                        this.motionY = this.calibrateY ? e : this.inputY),
                                this.motionX *= this.elementWidth * (this.scalarX / 100),
                                this.motionY *= this.elementHeight * (this.scalarY / 100),
                                isNaN(parseFloat(this.limitX)) || (this.motionX = a.clamp(this.motionX, -this.limitX, this.limitX)),
                                isNaN(parseFloat(this.limitY)) || (this.motionY = a.clamp(this.motionY, -this.limitY, this.limitY)),
                                this.velocityX += (this.motionX - this.velocityX) * this.frictionX,
                                this.velocityY += (this.motionY - this.velocityY) * this.frictionY;
                            for (var i = 0; i < this.layers.length; i++) {
                                var n = this.layers[i]
                                    , o = this.depthsX[i]
                                    , r = this.depthsY[i]
                                    , l = this.velocityX * (o * (this.invertX ? -1 : 1))
                                    , h = this.velocityY * (r * (this.invertY ? -1 : 1));
                                this.setPosition(n, l, h)
                            }
                            this.raf = s(this.onAnimationFrame)
                        }
                    }, {
                        key: "rotate",
                        value: function (t, e) {
                            var i = (t || 0) / 30
                                , n = (e || 0) / 30
                                , o = this.windowHeight > this.windowWidth;
                            this.portrait !== o && (this.portrait = o,
                                this.calibrationFlag = !0),
                                this.calibrationFlag && (this.calibrationFlag = !1,
                                    this.calibrationX = i,
                                    this.calibrationY = n),
                                this.inputX = i,
                                this.inputY = n
                        }
                    }, {
                        key: "onDeviceOrientation",
                        value: function (t) {
                            var e = t.beta
                                , i = t.gamma;
                            null !== e && null !== i && (this.orientationStatus = 1,
                                this.rotate(e, i))
                        }
                    }, {
                        key: "onDeviceMotion",
                        value: function (t) {
                            var e = t.rotationRate.beta
                                , i = t.rotationRate.gamma;
                            null !== e && null !== i && (this.motionStatus = 1,
                                this.rotate(e, i))
                        }
                    }, {
                        key: "onMouseMove",
                        value: function (t) {
                            var e = t.clientX
                                , i = t.clientY;
                            if (this.hoverOnly && (e < this.elementPositionX || e > this.elementPositionX + this.elementWidth || i < this.elementPositionY || i > this.elementPositionY + this.elementHeight))
                                return this.inputX = 0,
                                    void (this.inputY = 0);
                            this.relativeInput ? (this.clipRelativeInput && (e = Math.max(e, this.elementPositionX),
                                e = Math.min(e, this.elementPositionX + this.elementWidth),
                                i = Math.max(i, this.elementPositionY),
                                i = Math.min(i, this.elementPositionY + this.elementHeight)),
                                this.elementRangeX && this.elementRangeY && (this.inputX = (e - this.elementPositionX - this.elementCenterX) / this.elementRangeX,
                                    this.inputY = (i - this.elementPositionY - this.elementCenterY) / this.elementRangeY)) : this.windowRadiusX && this.windowRadiusY && (this.inputX = (e - this.windowCenterX) / this.windowRadiusX,
                                        this.inputY = (i - this.windowCenterY) / this.windowRadiusY)
                        }
                    }, {
                        key: "destroy",
                        value: function () {
                            this.disable(),
                                clearTimeout(this.calibrationTimer),
                                clearTimeout(this.detectionTimer),
                                this.element.removeAttribute("style");
                            for (var t = 0; t < this.layers.length; t++)
                                this.layers[t].removeAttribute("style");
                            delete this.element,
                                delete this.layers
                        }
                    }, {
                        key: "version",
                        value: function () {
                            return "3.1.0"
                        }
                    }]),
                        t
                }();
            e.exports = h
        }
            , {
            "object-assign": 1,
            raf: 4
        }]
    }, {}, [5])(5)
});
//# sourceMappingURL=parallax.min.js.map

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function (a, b, c, d) {
    function e(b, c) {
        this.settings = null,
            this.options = a.extend({}, e.Defaults, c),
            this.$element = a(b),
            this._handlers = {},
            this._plugins = {},
            this._supress = {},
            this._current = null,
            this._speed = null,
            this._coordinates = [],
            this._breakpoint = null,
            this._width = null,
            this._items = [],
            this._clones = [],
            this._mergers = [],
            this._widths = [],
            this._invalidated = {},
            this._pipe = [],
            this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {
                    start: null,
                    current: null
                },
                direction: null
            },
            this._states = {
                current: {},
                tags: {
                    initializing: ["busy"],
                    animating: ["busy"],
                    dragging: ["interacting"]
                }
            },
            a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
                this._handlers[c] = a.proxy(this[c], this)
            }, this)),
            a.each(e.Plugins, a.proxy(function (a, b) {
                this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
            }, this)),
            a.each(e.Workers, a.proxy(function (b, c) {
                this._pipe.push({
                    filter: c.filter,
                    run: a.proxy(c.run, this)
                })
            }, this)),
            this.setup(),
            this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    },
        e.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        },
        e.Type = {
            Event: "event",
            State: "state"
        },
        e.Plugins = {},
        e.Workers = [{
            filter: ["width", "settings"],
            run: function () {
                this._width = this.$element.width()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                a.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"],
            run: function () {
                this.$stage.children(".cloned").remove()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                var b = this.settings.margin || ""
                    , c = !this.settings.autoWidth
                    , d = this.settings.rtl
                    , e = {
                        width: "auto",
                        "margin-left": d ? b : "",
                        "margin-right": d ? "" : b
                    };
                !c && this.$stage.children().css(e),
                    a.css = e
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin
                    , c = null
                    , d = this._items.length
                    , e = !this.settings.autoWidth
                    , f = [];
                for (a.items = {
                    merge: !1,
                    width: b
                }; d--;)
                    c = this._mergers[d],
                        c = this.settings.mergeFit && Math.min(c, this.settings.items) || c,
                        a.items.merge = c > 1 || a.items.merge,
                        f[d] = e ? b * c : this._items[d].width();
                this._widths = f
            }
        }, {
            filter: ["items", "settings"],
            run: function () {
                var b = []
                    , c = this._items
                    , d = this.settings
                    , e = Math.max(2 * d.items, 4)
                    , f = 2 * Math.ceil(c.length / 2)
                    , g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0
                    , h = ""
                    , i = "";
                for (g /= 2; g > 0;)
                    b.push(this.normalize(b.length / 2, !0)),
                        h += c[b[b.length - 1]][0].outerHTML,
                        b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
                        i = c[b[b.length - 1]][0].outerHTML + i,
                        g -= 1;
                this._clones = b,
                    a(h).addClass("cloned").appendTo(this.$stage),
                    a(i).addClass("cloned").prependTo(this.$stage)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function () {
                for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;)
                    d = f[c - 1] || 0,
                        e = this._widths[this.relative(c)] + this.settings.margin,
                        f.push(d + e * a);
                this._coordinates = f
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function () {
                var a = this.settings.stagePadding
                    , b = this._coordinates
                    , c = {
                        width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                        "padding-left": a || "",
                        "padding-right": a || ""
                    };
                this.$stage.css(c)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                var b = this._coordinates.length
                    , c = !this.settings.autoWidth
                    , d = this.$stage.children();
                if (c && a.items.merge)
                    for (; b--;)
                        a.css.width = this._widths[this.relative(b)],
                            d.eq(b).css(a.css);
                else
                    c && (a.css.width = a.items.width,
                        d.css(a.css))
            }
        }, {
            filter: ["items"],
            run: function () {
                this._coordinates.length < 1 && this.$stage.removeAttr("style")
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (a) {
                a.current = a.current ? this.$stage.children().index(a.current) : 0,
                    a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)),
                    this.reset(a.current)
            }
        }, {
            filter: ["position"],
            run: function () {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"],
            run: function () {
                var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding, g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = [];
                for (c = 0,
                    d = this._coordinates.length; c < d; c++)
                    a = this._coordinates[c - 1] || 0,
                        b = Math.abs(this._coordinates[c]) + f * e,
                        (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
                this.$stage.children(".active").removeClass("active"),
                    this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"),
                    this.$stage.children(".center").removeClass("center"),
                    this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
            }
        }],
        e.prototype.initializeStage = function () {
            this.$stage = this.$element.find("." + this.settings.stageClass),
                this.$stage.length || (this.$element.addClass(this.options.loadingClass),
                    this.$stage = a("<" + this.settings.stageElement + ">", {
                        class: this.settings.stageClass
                    }).wrap(a("<div/>", {
                        class: this.settings.stageOuterClass
                    })),
                    this.$element.append(this.$stage.parent()))
        }
        ,
        e.prototype.initializeItems = function () {
            var b = this.$element.find(".owl-item");
            if (b.length)
                return this._items = b.get().map(function (b) {
                    return a(b)
                }),
                    this._mergers = this._items.map(function () {
                        return 1
                    }),
                    void this.refresh();
            this.replace(this.$element.children().not(this.$stage.parent())),
                this.isVisible() ? this.refresh() : this.invalidate("width"),
                this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
        }
        ,
        e.prototype.initialize = function () {
            if (this.enter("initializing"),
                this.trigger("initialize"),
                this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
                this.settings.autoWidth && !this.is("pre-loading")) {
                var a, b, c;
                a = this.$element.find("img"),
                    b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d,
                    c = this.$element.children(b).width(),
                    a.length && c <= 0 && this.preloadAutoWidthImages(a)
            }
            this.initializeStage(),
                this.initializeItems(),
                this.registerEventHandlers(),
                this.leave("initializing"),
                this.trigger("initialized")
        }
        ,
        e.prototype.isVisible = function () {
            return !this.settings.checkVisibility || this.$element.is(":visible")
        }
        ,
        e.prototype.setup = function () {
            var b = this.viewport()
                , c = this.options.responsive
                , d = -1
                , e = null;
            c ? (a.each(c, function (a) {
                a <= b && a > d && (d = Number(a))
            }),
                e = a.extend({}, this.options, c[d]),
                "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()),
                delete e.responsive,
                e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options),
                this.trigger("change", {
                    property: {
                        name: "settings",
                        value: e
                    }
                }),
                this._breakpoint = d,
                this.settings = e,
                this.invalidate("settings"),
                this.trigger("changed", {
                    property: {
                        name: "settings",
                        value: this.settings
                    }
                })
        }
        ,
        e.prototype.optionsLogic = function () {
            this.settings.autoWidth && (this.settings.stagePadding = !1,
                this.settings.merge = !1)
        }
        ,
        e.prototype.prepare = function (b) {
            var c = this.trigger("prepare", {
                content: b
            });
            return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)),
                this.trigger("prepared", {
                    content: c.data
                }),
                c.data
        }
        ,
        e.prototype.update = function () {
            for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
                return this[a]
            }, this._invalidated), e = {}; b < c;)
                (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e),
                    b++;
            this._invalidated = {},
                !this.is("valid") && this.enter("valid")
        }
        ,
        e.prototype.width = function (a) {
            switch (a = a || e.Width.Default) {
                case e.Width.Inner:
                case e.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }
        ,
        e.prototype.refresh = function () {
            this.enter("refreshing"),
                this.trigger("refresh"),
                this.setup(),
                this.optionsLogic(),
                this.$element.addClass(this.options.refreshClass),
                this.update(),
                this.$element.removeClass(this.options.refreshClass),
                this.leave("refreshing"),
                this.trigger("refreshed")
        }
        ,
        e.prototype.onThrottledResize = function () {
            b.clearTimeout(this.resizeTimer),
                this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
        }
        ,
        e.prototype.onResize = function () {
            return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"),
                this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"),
                    !1) : (this.invalidate("width"),
                        this.refresh(),
                        this.leave("resizing"),
                        void this.trigger("resized")))))
        }
        ,
        e.prototype.registerEventHandlers = function () {
            a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)),
                !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize),
                this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass),
                    this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
                    this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                        return !1
                    })),
                this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)),
                    this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
        }
        ,
        e.prototype.onDragStart = function (b) {
            var d = null;
            3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","),
                d = {
                    x: d[16 === d.length ? 12 : 4],
                    y: d[16 === d.length ? 13 : 5]
                }) : (d = this.$stage.position(),
                    d = {
                        x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
                        y: d.top
                    }),
                this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
                    this.invalidate("position")),
                this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type),
                this.speed(0),
                this._drag.time = (new Date).getTime(),
                this._drag.target = a(b.target),
                this._drag.stage.start = d,
                this._drag.stage.current = d,
                this._drag.pointer = this.pointer(b),
                a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)),
                a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
                    var d = this.difference(this._drag.pointer, this.pointer(b));
                    a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)),
                        Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(),
                            this.enter("dragging"),
                            this.trigger("drag"))
                }, this)))
        }
        ,
        e.prototype.onDragMove = function (a) {
            var b = null
                , c = null
                , d = null
                , e = this.difference(this._drag.pointer, this.pointer(a))
                , f = this.difference(this._drag.stage.start, e);
            this.is("dragging") && (a.preventDefault(),
                this.settings.loop ? (b = this.coordinates(this.minimum()),
                    c = this.coordinates(this.maximum() + 1) - b,
                    f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()),
                        c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()),
                        d = this.settings.pullDrag ? -1 * e.x / 5 : 0,
                        f.x = Math.max(Math.min(f.x, b + d), c + d)),
                this._drag.stage.current = f,
                this.animate(f.x))
        }
        ,
        e.prototype.onDragEnd = function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b))
                , e = this._drag.stage.current
                , f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
            a(c).off(".owl.core"),
                this.$element.removeClass(this.options.grabClass),
                (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                    this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
                    this.invalidate("position"),
                    this.update(),
                    this._drag.direction = f,
                    (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
                        return !1
                    })),
                this.is("dragging") && (this.leave("dragging"),
                    this.trigger("dragged"))
        }
        ,
        e.prototype.closest = function (b, c) {
            var e = -1
                , f = 30
                , g = this.width()
                , h = this.coordinates();
            return this.settings.freeDrag || a.each(h, a.proxy(function (a, i) {
                return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a),
                    -1 === e
            }, this)),
                this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())),
                e
        }
        ,
        e.prototype.animate = function (b) {
            var c = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(),
                c && (this.enter("animating"),
                    this.trigger("translate")),
                a.support.transform3d && a.support.transition ? this.$stage.css({
                    transform: "translate3d(" + b + "px,0px,0px)",
                    transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
                }) : c ? this.$stage.animate({
                    left: b + "px"
                }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
                    left: b + "px"
                })
        }
        ,
        e.prototype.is = function (a) {
            return this._states.current[a] && this._states.current[a] > 0
        }
        ,
        e.prototype.current = function (a) {
            if (a === d)
                return this._current;
            if (0 === this._items.length)
                return d;
            if (a = this.normalize(a),
                this._current !== a) {
                var b = this.trigger("change", {
                    property: {
                        name: "position",
                        value: a
                    }
                });
                b.data !== d && (a = this.normalize(b.data)),
                    this._current = a,
                    this.invalidate("position"),
                    this.trigger("changed", {
                        property: {
                            name: "position",
                            value: this._current
                        }
                    })
            }
            return this._current
        }
        ,
        e.prototype.invalidate = function (b) {
            return "string" === a.type(b) && (this._invalidated[b] = !0,
                this.is("valid") && this.leave("valid")),
                a.map(this._invalidated, function (a, b) {
                    return b
                })
        }
        ,
        e.prototype.reset = function (a) {
            (a = this.normalize(a)) !== d && (this._speed = 0,
                this._current = a,
                this.suppress(["translate", "translated"]),
                this.animate(this.coordinates(a)),
                this.release(["translate", "translated"]))
        }
        ,
        e.prototype.normalize = function (a, b) {
            var c = this._items.length
                , e = b ? 0 : this._clones.length;
            return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2),
                a
        }
        ,
        e.prototype.relative = function (a) {
            return a -= this._clones.length / 2,
                this.normalize(a, !0)
        }
        ,
        e.prototype.maximum = function (a) {
            var b, c, d, e = this.settings, f = this._coordinates.length;
            if (e.loop)
                f = this._clones.length / 2 + this._items.length - 1;
            else if (e.autoWidth || e.merge) {
                if (b = this._items.length)
                    for (c = this._items[--b].width(),
                        d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d);)
                        ;
                f = b + 1
            } else
                f = e.center ? this._items.length - 1 : this._items.length - e.items;
            return a && (f -= this._clones.length / 2),
                Math.max(f, 0)
        }
        ,
        e.prototype.minimum = function (a) {
            return a ? 0 : this._clones.length / 2
        }
        ,
        e.prototype.items = function (a) {
            return a === d ? this._items.slice() : (a = this.normalize(a, !0),
                this._items[a])
        }
        ,
        e.prototype.mergers = function (a) {
            return a === d ? this._mergers.slice() : (a = this.normalize(a, !0),
                this._mergers[a])
        }
        ,
        e.prototype.clones = function (b) {
            var c = this._clones.length / 2
                , e = c + this._items.length
                , f = function (a) {
                    return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2
                };
            return b === d ? a.map(this._clones, function (a, b) {
                return f(b)
            }) : a.map(this._clones, function (a, c) {
                return a === b ? f(c) : null
            })
        }
        ,
        e.prototype.speed = function (a) {
            return a !== d && (this._speed = a),
                this._speed
        }
        ,
        e.prototype.coordinates = function (b) {
            var c, e = 1, f = b - 1;
            return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
                return this.coordinates(b)
            }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1,
                f = b + 1),
                c = this._coordinates[b],
                c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0,
                c = Math.ceil(c))
        }
        ,
        e.prototype.duration = function (a, b, c) {
            return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
        }
        ,
        e.prototype.to = function (a, b) {
            var c = this.current()
                , d = null
                , e = a - this.relative(c)
                , f = (e > 0) - (e < 0)
                , g = this._items.length
                , h = this.minimum()
                , i = this.maximum();
            this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g),
                a = c + e,
                (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e,
                    a = d,
                    this.reset(c))) : this.settings.rewind ? (i += 1,
                        a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)),
                this.speed(this.duration(c, a, b)),
                this.current(a),
                this.isVisible() && this.update()
        }
        ,
        e.prototype.next = function (a) {
            a = a || !1,
                this.to(this.relative(this.current()) + 1, a)
        }
        ,
        e.prototype.prev = function (a) {
            a = a || !1,
                this.to(this.relative(this.current()) - 1, a)
        }
        ,
        e.prototype.onTransitionEnd = function (a) {
            if (a !== d && (a.stopPropagation(),
                (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)))
                return !1;
            this.leave("animating"),
                this.trigger("translated")
        }
        ,
        e.prototype.viewport = function () {
            var d;
            return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."),
                d
        }
        ,
        e.prototype.replace = function (b) {
            this.$stage.empty(),
                this._items = [],
                b && (b = b instanceof jQuery ? b : a(b)),
                this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)),
                b.filter(function () {
                    return 1 === this.nodeType
                }).each(a.proxy(function (a, b) {
                    b = this.prepare(b),
                        this.$stage.append(b),
                        this._items.push(b),
                        this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
                }, this)),
                this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                this.invalidate("items")
        }
        ,
        e.prototype.add = function (b, c) {
            var e = this.relative(this._current);
            c = c === d ? this._items.length : this.normalize(c, !0),
                b = b instanceof jQuery ? b : a(b),
                this.trigger("add", {
                    content: b,
                    position: c
                }),
                b = this.prepare(b),
                0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b),
                    0 !== this._items.length && this._items[c - 1].after(b),
                    this._items.push(b),
                    this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b),
                        this._items.splice(c, 0, b),
                        this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                this._items[e] && this.reset(this._items[e].index()),
                this.invalidate("items"),
                this.trigger("added", {
                    content: b,
                    position: c
                })
        }
        ,
        e.prototype.remove = function (a) {
            (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
                content: this._items[a],
                position: a
            }),
                this._items[a].remove(),
                this._items.splice(a, 1),
                this._mergers.splice(a, 1),
                this.invalidate("items"),
                this.trigger("removed", {
                    content: null,
                    position: a
                }))
        }
        ,
        e.prototype.preloadAutoWidthImages = function (b) {
            b.each(a.proxy(function (b, c) {
                this.enter("pre-loading"),
                    c = a(c),
                    a(new Image).one("load", a.proxy(function (a) {
                        c.attr("src", a.target.src),
                            c.css("opacity", 1),
                            this.leave("pre-loading"),
                            !this.is("pre-loading") && !this.is("initializing") && this.refresh()
                    }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
            }, this))
        }
        ,
        e.prototype.destroy = function () {
            this.$element.off(".owl.core"),
                this.$stage.off(".owl.core"),
                a(c).off(".owl.core"),
                !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer),
                    this.off(b, "resize", this._handlers.onThrottledResize));
            for (var d in this._plugins)
                this._plugins[d].destroy();
            this.$stage.children(".cloned").remove(),
                this.$stage.unwrap(),
                this.$stage.children().contents().unwrap(),
                this.$stage.children().unwrap(),
                this.$stage.remove(),
                this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
        }
        ,
        e.prototype.op = function (a, b, c) {
            var d = this.settings.rtl;
            switch (b) {
                case "<":
                    return d ? a > c : a < c;
                case ">":
                    return d ? a < c : a > c;
                case ">=":
                    return d ? a <= c : a >= c;
                case "<=":
                    return d ? a >= c : a <= c
            }
        }
        ,
        e.prototype.on = function (a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
        }
        ,
        e.prototype.off = function (a, b, c, d) {
            a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
        }
        ,
        e.prototype.trigger = function (b, c, d, f, g) {
            var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            }
                , i = a.camelCase(a.grep(["on", b, d], function (a) {
                    return a
                }).join("-").toLowerCase())
                , j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                    relatedTarget: this
                }, h, c));
            return this._supress[b] || (a.each(this._plugins, function (a, b) {
                b.onTrigger && b.onTrigger(j)
            }),
                this.register({
                    type: e.Type.Event,
                    name: b
                }),
                this.$element.trigger(j),
                this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)),
                j
        }
        ,
        e.prototype.enter = function (b) {
            a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
                this._states.current[b] === d && (this._states.current[b] = 0),
                    this._states.current[b]++
            }, this))
        }
        ,
        e.prototype.leave = function (b) {
            a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
                this._states.current[b]--
            }, this))
        }
        ,
        e.prototype.register = function (b) {
            if (b.type === e.Type.Event) {
                if (a.event.special[b.name] || (a.event.special[b.name] = {}),
                    !a.event.special[b.name].owl) {
                    var c = a.event.special[b.name]._default;
                    a.event.special[b.name]._default = function (a) {
                        return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                    }
                        ,
                        a.event.special[b.name].owl = !0
                }
            } else
                b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags,
                    this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
                        return a.inArray(c, this._states.tags[b.name]) === d
                    }, this)))
        }
        ,
        e.prototype.suppress = function (b) {
            a.each(b, a.proxy(function (a, b) {
                this._supress[b] = !0
            }, this))
        }
        ,
        e.prototype.release = function (b) {
            a.each(b, a.proxy(function (a, b) {
                delete this._supress[b]
            }, this))
        }
        ,
        e.prototype.pointer = function (a) {
            var c = {
                x: null,
                y: null
            };
            return a = a.originalEvent || a || b.event,
                a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a,
                a.pageX ? (c.x = a.pageX,
                    c.y = a.pageY) : (c.x = a.clientX,
                        c.y = a.clientY),
                c
        }
        ,
        e.prototype.isNumeric = function (a) {
            return !isNaN(parseFloat(a))
        }
        ,
        e.prototype.difference = function (a, b) {
            return {
                x: a.x - b.x,
                y: a.y - b.y
            }
        }
        ,
        a.fn.owlCarousel = function (b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var d = a(this)
                    , f = d.data("owl.carousel");
                f || (f = new e(this, "object" == typeof b && b),
                    d.data("owl.carousel", f),
                    a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
                        f.register({
                            type: e.Type.Event,
                            name: c
                        }),
                            f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
                                a.namespace && a.relatedTarget !== this && (this.suppress([c]),
                                    f[c].apply(this, [].slice.call(arguments, 1)),
                                    this.release([c]))
                            }, f))
                    })),
                    "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
            })
        }
        ,
        a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this._core = b,
                this._interval = null,
                this._visible = null,
                this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoRefresh && this.watch()
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            autoRefresh: !0,
            autoRefreshInterval: 500
        },
            e.prototype.watch = function () {
                this._interval || (this._visible = this._core.isVisible(),
                    this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
            }
            ,
            e.prototype.refresh = function () {
                this._core.isVisible() !== this._visible && (this._visible = !this._visible,
                    this._core.$element.toggleClass("owl-hidden", !this._visible),
                    this._visible && this._core.invalidate("width") && this._core.refresh())
            }
            ,
            e.prototype.destroy = function () {
                var a, c;
                b.clearInterval(this._interval);
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (c in Object.getOwnPropertyNames(this))
                    "function" != typeof this[c] && (this[c] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this._core = b,
                this._loaded = [],
                this._handlers = {
                    "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
                        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                            var c = this._core.settings
                                , e = c.center && Math.ceil(c.items / 2) || c.items
                                , f = c.center && -1 * e || 0
                                , g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f
                                , h = this._core.clones().length
                                , i = a.proxy(function (a, b) {
                                    this.load(b)
                                }, this);
                            for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager,
                                c.loop && (g -= c.lazyLoadEager,
                                    e++)); f++ < e;)
                                this.load(h / 2 + this._core.relative(g)),
                                    h && a.each(this._core.clones(this._core.relative(g)), i),
                                    g++
                        }
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            lazyLoad: !1,
            lazyLoadEager: 0
        },
            e.prototype.load = function (c) {
                var d = this._core.$stage.children().eq(c)
                    , e = d && d.find(".owl-lazy");
                !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
                    var e, f = a(d), g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
                    this._core.trigger("load", {
                        element: f,
                        url: g
                    }, "lazy"),
                        f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
                            f.css("opacity", 1),
                                this._core.trigger("loaded", {
                                    element: f,
                                    url: g
                                }, "lazy")
                        }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function () {
                            this._core.trigger("loaded", {
                                element: f,
                                url: g
                            }, "lazy")
                        }, this)).attr("srcset", g) : (e = new Image,
                            e.onload = a.proxy(function () {
                                f.css({
                                    "background-image": 'url("' + g + '")',
                                    opacity: "1"
                                }),
                                    this._core.trigger("loaded", {
                                        element: f,
                                        url: g
                                    }, "lazy")
                            }, this),
                            e.src = g)
                }, this)),
                    this._loaded.push(d.get(0)))
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers)
                    this._core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Lazy = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (c) {
            this._core = c,
                this._previousHeight = null,
                this._handlers = {
                    "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoHeight && this.update()
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update()
                    }, this),
                    "loaded.owl.lazy": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this._core.$element.on(this._handlers),
                this._intervalId = null;
            var d = this;
            a(b).on("load", function () {
                d._core.settings.autoHeight && d.update()
            }),
                a(b).resize(function () {
                    d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId),
                        d._intervalId = setTimeout(function () {
                            d.update()
                        }, 250))
                })
        };
        e.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        },
            e.prototype.update = function () {
                var b = this._core._current
                    , c = b + this._core.settings.items
                    , d = this._core.settings.lazyLoad
                    , e = this._core.$stage.children().toArray().slice(b, c)
                    , f = []
                    , g = 0;
                a.each(e, function (b, c) {
                    f.push(a(c).height())
                }),
                    g = Math.max.apply(null, f),
                    g <= 1 && d && this._previousHeight && (g = this._previousHeight),
                    this._previousHeight = g,
                    this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this._core = b,
                this._videos = {},
                this._playing = null,
                this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.register({
                            type: "state",
                            name: "playing",
                            tags: ["interacting"]
                        })
                    }, this),
                    "resize.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "position" === a.property.name && this._playing && this.stop()
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        if (b.namespace) {
                            var c = a(b.content).find(".owl-video");
                            c.length && (c.css("display", "none"),
                                this.fetch(c, a(b.content)))
                        }
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this._core.$element.on(this._handlers),
                this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
                    this.play(a)
                }, this))
        };
        e.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        },
            e.prototype.fetch = function (a, b) {
                var c = function () {
                    return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
                }()
                    , d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id")
                    , e = a.attr("data-width") || this._core.settings.videoWidth
                    , f = a.attr("data-height") || this._core.settings.videoHeight
                    , g = a.attr("href");
                if (!g)
                    throw new Error("Missing video URL.");
                if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
                    d[3].indexOf("youtu") > -1)
                    c = "youtube";
                else if (d[3].indexOf("vimeo") > -1)
                    c = "vimeo";
                else {
                    if (!(d[3].indexOf("vzaar") > -1))
                        throw new Error("Video URL not supported.");
                    c = "vzaar"
                }
                d = d[6],
                    this._videos[g] = {
                        type: c,
                        id: d,
                        width: e,
                        height: f
                    },
                    b.attr("data-video", g),
                    this.thumbnail(a, this._videos[g])
            }
            ,
            e.prototype.thumbnail = function (b, c) {
                var d, e, f, g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "", h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function (c) {
                    e = '<div class="owl-video-play-icon"></div>',
                        d = k.lazyLoad ? a("<div/>", {
                            class: "owl-video-tn " + j,
                            srcType: c
                        }) : a("<div/>", {
                            class: "owl-video-tn",
                            style: "opacity:1;background-image:url(" + c + ")"
                        }),
                        b.after(d),
                        b.after(e)
                };
                if (b.wrap(a("<div/>", {
                    class: "owl-video-wrapper",
                    style: g
                })),
                    this._core.settings.lazyLoad && (i = "data-src",
                        j = "owl-lazy"),
                    h.length)
                    return l(h.attr(i)),
                        h.remove(),
                        !1;
                "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg",
                    l(f)) : "vimeo" === c.type ? a.ajax({
                        type: "GET",
                        url: "//vimeo.com/api/v2/video/" + c.id + ".json",
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function (a) {
                            f = a[0].thumbnail_large,
                                l(f)
                        }
                    }) : "vzaar" === c.type && a.ajax({
                        type: "GET",
                        url: "//vzaar.com/api/videos/" + c.id + ".json",
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function (a) {
                            f = a.framegrab_url,
                                l(f)
                        }
                    })
            }
            ,
            e.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    this._playing = null,
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video")
            }
            ,
            e.prototype.play = function (b) {
                var c, d = a(b.target), e = d.closest("." + this._core.settings.itemClass), f = this._videos[e.attr("data-video")], g = f.width || "100%", h = f.height || this._core.$stage.height();
                this._playing || (this._core.enter("playing"),
                    this._core.trigger("play", null, "video"),
                    e = this._core.items(this._core.relative(e.index())),
                    this._core.reset(e.index()),
                    c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),
                    c.attr("height", h),
                    c.attr("width", g),
                    "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"),
                    a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),
                    this._playing = e.addClass("owl-video-playing"))
            }
            ,
            e.prototype.isInFullScreen = function () {
                var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
                return b && a(b).parent().hasClass("owl-video-frame")
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                this._core.$element.off("click.owl.video");
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Video = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this.core = b,
                this.core.options = a.extend({}, e.Defaults, this.core.options),
                this.swapping = !0,
                this.previous = d,
                this.next = d,
                this.handlers = {
                    "change.owl.carousel": a.proxy(function (a) {
                        a.namespace && "position" == a.property.name && (this.previous = this.core.current(),
                            this.next = a.property.value)
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
                        a.namespace && (this.swapping = "translated" == a.type)
                    }, this),
                    "translate.owl.carousel": a.proxy(function (a) {
                        a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                    }, this)
                },
                this.core.$element.on(this.handlers)
        };
        e.Defaults = {
            animateOut: !1,
            animateIn: !1
        },
            e.prototype.swap = function () {
                if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
                    this.core.speed(0);
                    var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous), e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn, g = this.core.settings.animateOut;
                    this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
                        d.one(a.support.animation.end, c).css({
                            left: b + "px"
                        }).addClass("animated owl-animated-out").addClass(g)),
                        f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
                }
            }
            ,
            e.prototype.clear = function (b) {
                a(b.target).css({
                    left: ""
                }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
                    this.core.onTransitionEnd()
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers)
                    this.core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Animate = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        var e = function (b) {
            this._core = b,
                this._call = null,
                this._time = 0,
                this._timeout = 0,
                this._paused = !0,
                this._handlers = {
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
                    }, this),
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoplay && this.play()
                    }, this),
                    "play.owl.autoplay": a.proxy(function (a, b, c) {
                        a.namespace && this.play(b, c)
                    }, this),
                    "stop.owl.autoplay": a.proxy(function (a) {
                        a.namespace && this.stop()
                    }, this),
                    "mouseover.owl.autoplay": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                    }, this),
                    "mouseleave.owl.autoplay": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
                    }, this),
                    "touchstart.owl.core": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                    }, this),
                    "touchend.owl.core": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play()
                    }, this)
                },
                this._core.$element.on(this._handlers),
                this._core.options = a.extend({}, e.Defaults, this._core.options)
        };
        e.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        },
            e.prototype._next = function (d) {
                this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()),
                    this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed)
            }
            ,
            e.prototype.read = function () {
                return (new Date).getTime() - this._time
            }
            ,
            e.prototype.play = function (c, d) {
                var e;
                this._core.is("rotating") || this._core.enter("rotating"),
                    c = c || this._core.settings.autoplayTimeout,
                    e = Math.min(this._time % (this._timeout || c), c),
                    this._paused ? (this._time = this.read(),
                        this._paused = !1) : b.clearTimeout(this._call),
                    this._time += this.read() % c - e,
                    this._timeout = c,
                    this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
            }
            ,
            e.prototype.stop = function () {
                this._core.is("rotating") && (this._time = 0,
                    this._paused = !0,
                    b.clearTimeout(this._call),
                    this._core.leave("rotating"))
            }
            ,
            e.prototype.pause = function () {
                this._core.is("rotating") && !this._paused && (this._time = this.read(),
                    this._paused = !0,
                    b.clearTimeout(this._call))
            }
            ,
            e.prototype.destroy = function () {
                var a, b;
                this.stop();
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.autoplay = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        "use strict";
        var e = function (b) {
            this._core = b,
                this._initialized = !1,
                this._pages = [],
                this._controls = {},
                this._templates = [],
                this.$element = this._core.$element,
                this._overrides = {
                    next: this._core.next,
                    prev: this._core.prev,
                    to: this._core.to
                },
                this._handlers = {
                    "prepared.owl.carousel": a.proxy(function (b) {
                        b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
                    }, this),
                    "added.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
                    }, this),
                    "remove.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "position" == a.property.name && this.draw()
                    }, this),
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"),
                            this.initialize(),
                            this.update(),
                            this.draw(),
                            this._initialized = !0,
                            this._core.trigger("initialized", null, "navigation"))
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"),
                            this.update(),
                            this.draw(),
                            this._core.trigger("refreshed", null, "navigation"))
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this.$element.on(this._handlers)
        };
        e.Defaults = {
            nav: !1,
            navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        },
            e.prototype.initialize = function () {
                var b, c = this._core.settings;
                this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),
                    this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
                        this.prev(c.navSpeed)
                    }, this)),
                    this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
                        this.next(c.navSpeed)
                    }, this)),
                    c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),
                    this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),
                    this._controls.$absolute.on("click", "button", a.proxy(function (b) {
                        var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
                        b.preventDefault(),
                            this.to(d, c.dotsSpeed)
                    }, this));
                for (b in this._overrides)
                    this._core[b] = a.proxy(this[b], this)
            }
            ,
            e.prototype.destroy = function () {
                var a, b, c, d, e;
                e = this._core.settings;
                for (a in this._handlers)
                    this.$element.off(a, this._handlers[a]);
                for (b in this._controls)
                    "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
                for (d in this.overides)
                    this._core[d] = this._overrides[d];
                for (c in Object.getOwnPropertyNames(this))
                    "function" != typeof this[c] && (this[c] = null)
            }
            ,
            e.prototype.update = function () {
                var a, b, c, d = this._core.clones().length / 2, e = d + this._core.items().length, f = this._core.maximum(!0), g = this._core.settings, h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
                if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
                    g.dots || "page" == g.slideBy)
                    for (this._pages = [],
                        a = d,
                        b = 0,
                        c = 0; a < e; a++) {
                        if (b >= h || 0 === b) {
                            if (this._pages.push({
                                start: Math.min(f, a - d),
                                end: a - d + h - 1
                            }),
                                Math.min(f, a - d) === f)
                                break;
                            b = 0,
                                ++c
                        }
                        b += this._core.mergers(this._core.relative(a))
                    }
            }
            ,
            e.prototype.draw = function () {
                var b, c = this._core.settings, d = this._core.items().length <= c.items, e = this._core.relative(this._core.current()), f = c.loop || c.rewind;
                this._controls.$relative.toggleClass("disabled", !c.nav || d),
                    c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)),
                        this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))),
                    this._controls.$absolute.toggleClass("disabled", !c.dots || d),
                    c.dots && (b = this._pages.length - this._controls.$absolute.children().length,
                        c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(),
                        this._controls.$absolute.find(".active").removeClass("active"),
                        this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
            }
            ,
            e.prototype.onTrigger = function (b) {
                var c = this._core.settings;
                b.page = {
                    index: a.inArray(this.current(), this._pages),
                    count: this._pages.length,
                    size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
                }
            }
            ,
            e.prototype.current = function () {
                var b = this._core.relative(this._core.current());
                return a.grep(this._pages, a.proxy(function (a, c) {
                    return a.start <= b && a.end >= b
                }, this)).pop()
            }
            ,
            e.prototype.getPosition = function (b) {
                var c, d, e = this._core.settings;
                return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages),
                    d = this._pages.length,
                    b ? ++c : --c,
                    c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()),
                        d = this._core.items().length,
                        b ? c += e.slideBy : c -= e.slideBy),
                    c
            }
            ,
            e.prototype.next = function (b) {
                a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
            }
            ,
            e.prototype.prev = function (b) {
                a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
            }
            ,
            e.prototype.to = function (b, c, d) {
                var e;
                !d && this._pages.length ? (e = this._pages.length,
                    a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Navigation = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        "use strict";
        var e = function (c) {
            this._core = c,
                this._hashes = {},
                this.$element = this._core.$element,
                this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (c) {
                        c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        if (b.namespace) {
                            var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                            if (!c)
                                return;
                            this._hashes[c] = b.content
                        }
                    }, this),
                    "changed.owl.carousel": a.proxy(function (c) {
                        if (c.namespace && "position" === c.property.name) {
                            var d = this._core.items(this._core.relative(this._core.current()))
                                , e = a.map(this._hashes, function (a, b) {
                                    return a === d ? b : null
                                }).join();
                            if (!e || b.location.hash.slice(1) === e)
                                return;
                            b.location.hash = e
                        }
                    }, this)
                },
                this._core.options = a.extend({}, e.Defaults, this._core.options),
                this.$element.on(this._handlers),
                a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
                    var c = b.location.hash.substring(1)
                        , e = this._core.$stage.children()
                        , f = this._hashes[c] && e.index(this._hashes[c]);
                    f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
                }, this))
        };
        e.Defaults = {
            URLhashListener: !1
        },
            e.prototype.destroy = function () {
                var c, d;
                a(b).off("hashchange.owl.navigation");
                for (c in this._handlers)
                    this._core.$element.off(c, this._handlers[c]);
                for (d in Object.getOwnPropertyNames(this))
                    "function" != typeof this[d] && (this[d] = null)
            }
            ,
            a.fn.owlCarousel.Constructor.Plugins.Hash = e
    }(window.Zepto || window.jQuery, window, document),
    function (a, b, c, d) {
        function e(b, c) {
            var e = !1
                , f = b.charAt(0).toUpperCase() + b.slice(1);
            return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
                if (g[b] !== d)
                    return e = !c || b,
                        !1
            }),
                e
        }
        function f(a) {
            return e(a, !0)
        }
        var g = a("<support>").get(0).style
            , h = "Webkit Moz O ms".split(" ")
            , i = {
                transition: {
                    end: {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        transition: "transitionend"
                    }
                },
                animation: {
                    end: {
                        WebkitAnimation: "webkitAnimationEnd",
                        MozAnimation: "animationend",
                        OAnimation: "oAnimationEnd",
                        animation: "animationend"
                    }
                }
            }
            , j = {
                csstransforms: function () {
                    return !!e("transform")
                },
                csstransforms3d: function () {
                    return !!e("perspective")
                },
                csstransitions: function () {
                    return !!e("transition")
                },
                cssanimations: function () {
                    return !!e("animation")
                }
            };
        j.csstransitions() && (a.support.transition = new String(f("transition")),
            a.support.transition.end = i.transition.end[a.support.transition]),
            j.cssanimations() && (a.support.animation = new String(f("animation")),
                a.support.animation.end = i.animation.end[a.support.animation]),
            j.csstransforms() && (a.support.transform = new String(f("transform")),
                a.support.transform3d = j.csstransforms3d())
    }(window.Zepto || window.jQuery, window, document);

/**
 * Swiper 4.5.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 22, 2019
 */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, function () {
    "use strict";
    var f = "undefined" == typeof document ? {
        body: {},
        addEventListener: function () { },
        removeEventListener: function () { },
        activeElement: {
            blur: function () { },
            nodeName: ""
        },
        querySelector: function () {
            return null
        },
        querySelectorAll: function () {
            return []
        },
        getElementById: function () {
            return null
        },
        createEvent: function () {
            return {
                initEvent: function () { }
            }
        },
        createElement: function () {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function () { },
                getElementsByTagName: function () {
                    return []
                }
            }
        },
        location: {
            hash: ""
        }
    } : document
        , J = "undefined" == typeof window ? {
            document: f,
            navigator: {
                userAgent: ""
            },
            location: {},
            history: {},
            CustomEvent: function () {
                return this
            },
            addEventListener: function () { },
            removeEventListener: function () { },
            getComputedStyle: function () {
                return {
                    getPropertyValue: function () {
                        return ""
                    }
                }
            },
            Image: function () { },
            Date: function () { },
            screen: {},
            setTimeout: function () { },
            clearTimeout: function () { }
        } : window
        , l = function (e) {
            for (var t = 0; t < e.length; t += 1)
                this[t] = e[t];
            return this.length = e.length,
                this
        };
    function L(e, t) {
        var a = []
            , i = 0;
        if (e && !t && e instanceof l)
            return e;
        if (e)
            if ("string" == typeof e) {
                var s, r, n = e.trim();
                if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) {
                    var o = "div";
                    for (0 === n.indexOf("<li") && (o = "ul"),
                        0 === n.indexOf("<tr") && (o = "tbody"),
                        0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"),
                        0 === n.indexOf("<tbody") && (o = "table"),
                        0 === n.indexOf("<option") && (o = "select"),
                        (r = f.createElement(o)).innerHTML = n,
                        i = 0; i < r.childNodes.length; i += 1)
                        a.push(r.childNodes[i])
                } else
                    for (s = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split("#")[1])],
                        i = 0; i < s.length; i += 1)
                        s[i] && a.push(s[i])
            } else if (e.nodeType || e === J || e === f)
                a.push(e);
            else if (0 < e.length && e[0].nodeType)
                for (i = 0; i < e.length; i += 1)
                    a.push(e[i]);
        return new l(a)
    }
    function r(e) {
        for (var t = [], a = 0; a < e.length; a += 1)
            -1 === t.indexOf(e[a]) && t.push(e[a]);
        return t
    }
    L.fn = l.prototype,
        L.Class = l,
        L.Dom7 = l;
    var t = {
        addClass: function (e) {
            if (void 0 === e)
                return this;
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1)
                    void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[a]);
            return this
        },
        removeClass: function (e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1)
                    void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[a]);
            return this
        },
        hasClass: function (e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function (e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1)
                    void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[a]);
            return this
        },
        attr: function (e, t) {
            var a = arguments;
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (var i = 0; i < this.length; i += 1)
                if (2 === a.length)
                    this[i].setAttribute(e, t);
                else
                    for (var s in e)
                        this[i][s] = e[s],
                            this[i].setAttribute(s, e[s]);
            return this
        },
        removeAttr: function (e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        data: function (e, t) {
            var a;
            if (void 0 !== t) {
                for (var i = 0; i < this.length; i += 1)
                    (a = this[i]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}),
                        a.dom7ElementDataStorage[e] = t;
                return this
            }
            if (a = this[0]) {
                if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage)
                    return a.dom7ElementDataStorage[e];
                var s = a.getAttribute("data-" + e);
                return s || void 0
            }
        },
        transform: function (e) {
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransform = e,
                    a.transform = e
            }
            return this
        },
        transition: function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransitionDuration = e,
                    a.transitionDuration = e
            }
            return this
        },
        on: function () {
            for (var e, t = [], a = arguments.length; a--;)
                t[a] = arguments[a];
            var i = t[0]
                , r = t[1]
                , n = t[2]
                , s = t[3];
            function o(e) {
                var t = e.target;
                if (t) {
                    var a = e.target.dom7EventData || [];
                    if (a.indexOf(e) < 0 && a.unshift(e),
                        L(t).is(r))
                        n.apply(t, a);
                    else
                        for (var i = L(t).parents(), s = 0; s < i.length; s += 1)
                            L(i[s]).is(r) && n.apply(i[s], a)
                }
            }
            function l(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                    n.apply(this, t)
            }
            "function" == typeof t[1] && (i = (e = t)[0],
                n = e[1],
                s = e[2],
                r = void 0),
                s || (s = !1);
            for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r)
                    for (d = 0; d < p.length; d += 1) {
                        var h = p[d];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}),
                            u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []),
                            u.dom7LiveListeners[h].push({
                                listener: n,
                                proxyListener: o
                            }),
                            u.addEventListener(h, o, s)
                    }
                else
                    for (d = 0; d < p.length; d += 1) {
                        var v = p[d];
                        u.dom7Listeners || (u.dom7Listeners = {}),
                            u.dom7Listeners[v] || (u.dom7Listeners[v] = []),
                            u.dom7Listeners[v].push({
                                listener: n,
                                proxyListener: l
                            }),
                            u.addEventListener(v, l, s)
                    }
            }
            return this
        },
        off: function () {
            for (var e, t = [], a = arguments.length; a--;)
                t[a] = arguments[a];
            var i = t[0]
                , s = t[1]
                , r = t[2]
                , n = t[3];
            "function" == typeof t[1] && (i = (e = t)[0],
                r = e[1],
                n = e[2],
                s = void 0),
                n || (n = !1);
            for (var o = i.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], p = 0; p < this.length; p += 1) {
                    var c = this[p]
                        , u = void 0;
                    if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]),
                        u && u.length)
                        for (var h = u.length - 1; 0 <= h; h -= 1) {
                            var v = u[h];
                            r && v.listener === r ? (c.removeEventListener(d, v.proxyListener, n),
                                u.splice(h, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (c.removeEventListener(d, v.proxyListener, n),
                                    u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n),
                                        u.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function () {
            for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
            for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1)
                for (var r = a[s], n = 0; n < this.length; n += 1) {
                    var o = this[n]
                        , l = void 0;
                    try {
                        l = new J.CustomEvent(r, {
                            detail: i,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (e) {
                        (l = f.createEvent("Event")).initEvent(r, !0, !0),
                            l.detail = i
                    }
                    o.dom7EventData = e.filter(function (e, t) {
                        return 0 < t
                    }),
                        o.dispatchEvent(l),
                        o.dom7EventData = [],
                        delete o.dom7EventData
                }
            return this
        },
        transitionEnd: function (t) {
            var a, i = ["webkitTransitionEnd", "transitionend"], s = this;
            function r(e) {
                if (e.target === this)
                    for (t.call(this, e),
                        a = 0; a < i.length; a += 1)
                        s.off(i[a], r)
            }
            if (t)
                for (a = 0; a < i.length; a += 1)
                    s.on(i[a], r);
            return this
        },
        outerWidth: function (e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function (e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function () {
            if (0 < this.length) {
                var e = this[0]
                    , t = e.getBoundingClientRect()
                    , a = f.body
                    , i = e.clientTop || a.clientTop || 0
                    , s = e.clientLeft || a.clientLeft || 0
                    , r = e === J ? J.scrollY : e.scrollTop
                    , n = e === J ? J.scrollX : e.scrollLeft;
                return {
                    top: t.top + r - i,
                    left: t.left + n - s
                }
            }
            return null
        },
        css: function (e, t) {
            var a;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (a = 0; a < this.length; a += 1)
                        for (var i in e)
                            this[a].style[i] = e[i];
                    return this
                }
                if (this[0])
                    return J.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (a = 0; a < this.length; a += 1)
                    this[a].style[e] = t;
                return this
            }
            return this
        },
        each: function (e) {
            if (!e)
                return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t]))
                    return this;
            return this
        },
        html: function (e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function (e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function (e) {
            var t, a, i = this[0];
            if (!i || void 0 === e)
                return !1;
            if ("string" == typeof e) {
                if (i.matches)
                    return i.matches(e);
                if (i.webkitMatchesSelector)
                    return i.webkitMatchesSelector(e);
                if (i.msMatchesSelector)
                    return i.msMatchesSelector(e);
                for (t = L(e),
                    a = 0; a < t.length; a += 1)
                    if (t[a] === i)
                        return !0;
                return !1
            }
            if (e === f)
                return i === f;
            if (e === J)
                return i === J;
            if (e.nodeType || e instanceof l) {
                for (t = e.nodeType ? [e] : e,
                    a = 0; a < t.length; a += 1)
                    if (t[a] === i)
                        return !0;
                return !1
            }
            return !1
        },
        index: function () {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);)
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function (e) {
            if (void 0 === e)
                return this;
            var t, a = this.length;
            return new l(a - 1 < e ? [] : e < 0 ? (t = a + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function () {
            for (var e, t = [], a = arguments.length; a--;)
                t[a] = arguments[a];
            for (var i = 0; i < t.length; i += 1) {
                e = t[i];
                for (var s = 0; s < this.length; s += 1)
                    if ("string" == typeof e) {
                        var r = f.createElement("div");
                        for (r.innerHTML = e; r.firstChild;)
                            this[s].appendChild(r.firstChild)
                    } else if (e instanceof l)
                        for (var n = 0; n < e.length; n += 1)
                            this[s].appendChild(e[n]);
                    else
                        this[s].appendChild(e)
            }
            return this
        },
        prepend: function (e) {
            var t, a;
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var i = f.createElement("div");
                    for (i.innerHTML = e,
                        a = i.childNodes.length - 1; 0 <= a; a -= 1)
                        this[t].insertBefore(i.childNodes[a], this[t].childNodes[0])
                } else if (e instanceof l)
                    for (a = 0; a < e.length; a += 1)
                        this[t].insertBefore(e[a], this[t].childNodes[0]);
                else
                    this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        },
        next: function (e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([])
        },
        nextAll: function (e) {
            var t = []
                , a = this[0];
            if (!a)
                return new l([]);
            for (; a.nextElementSibling;) {
                var i = a.nextElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i),
                    a = i
            }
            return new l(t)
        },
        prev: function (e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([])
            }
            return new l([])
        },
        prevAll: function (e) {
            var t = []
                , a = this[0];
            if (!a)
                return new l([]);
            for (; a.previousElementSibling;) {
                var i = a.previousElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i),
                    a = i
            }
            return new l(t)
        },
        parent: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                null !== this[a].parentNode && (e ? L(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
            return L(r(t))
        },
        parents: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].parentNode; i;)
                    e ? L(i).is(e) && t.push(i) : t.push(i),
                        i = i.parentNode;
            return L(r(t))
        },
        closest: function (e) {
            var t = this;
            return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)),
                t)
        },
        find: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1)
                    t.push(i[s]);
            return new l(t)
        },
        children: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].childNodes, s = 0; s < i.length; s += 1)
                    e ? 1 === i[s].nodeType && L(i[s]).is(e) && t.push(i[s]) : 1 === i[s].nodeType && t.push(i[s]);
            return new l(r(t))
        },
        remove: function () {
            for (var e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function () {
            for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
            var a, i;
            for (a = 0; a < e.length; a += 1) {
                var s = L(e[a]);
                for (i = 0; i < s.length; i += 1)
                    this[this.length] = s[i],
                        this.length += 1
            }
            return this
        },
        styles: function () {
            return this[0] ? J.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(t).forEach(function (e) {
        L.fn[e] = t[e]
    });
    var e, a, i, s, ee = {
        deleteProps: function (e) {
            var t = e;
            Object.keys(t).forEach(function (e) {
                try {
                    t[e] = null
                } catch (e) { }
                try {
                    delete t[e]
                } catch (e) { }
            })
        },
        nextTick: function (e, t) {
            return void 0 === t && (t = 0),
                setTimeout(e, t)
        },
        now: function () {
            return Date.now()
        },
        getTranslate: function (e, t) {
            var a, i, s;
            void 0 === t && (t = "x");
            var r = J.getComputedStyle(e, null);
            return J.WebKitCSSMatrix ? (6 < (i = r.transform || r.webkitTransform).split(",").length && (i = i.split(", ").map(function (e) {
                return e.replace(",", ".")
            }).join(", ")),
                s = new J.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","),
                "x" === t && (i = J.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])),
                "y" === t && (i = J.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])),
                i || 0
        },
        parseUrlQuery: function (e) {
            var t, a, i, s, r = {}, n = e || J.location.href;
            if ("string" == typeof n && n.length)
                for (s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
                    return "" !== e
                })).length,
                    t = 0; t < s; t += 1)
                    i = a[t].replace(/#\S+/g, "").split("="),
                        r[decodeURIComponent(i[0])] = void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "";
            return r
        },
        isObject: function (e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        },
        extend: function () {
            for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
            for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
                var s = e[i];
                if (null != s)
                    for (var r = Object.keys(Object(s)), n = 0, o = r.length; n < o; n += 1) {
                        var l = r[n]
                            , d = Object.getOwnPropertyDescriptor(s, l);
                        void 0 !== d && d.enumerable && (ee.isObject(a[l]) && ee.isObject(s[l]) ? ee.extend(a[l], s[l]) : !ee.isObject(a[l]) && ee.isObject(s[l]) ? (a[l] = {},
                            ee.extend(a[l], s[l])) : a[l] = s[l])
                    }
            }
            return a
        }
    }, te = (i = f.createElement("div"),
    {
        touch: J.Modernizr && !0 === J.Modernizr.touch || !!(0 < J.navigator.maxTouchPoints || "ontouchstart" in J || J.DocumentTouch && f instanceof J.DocumentTouch),
        pointerEvents: !!(J.navigator.pointerEnabled || J.PointerEvent || "maxTouchPoints" in J.navigator && 0 < J.navigator.maxTouchPoints),
        prefixedPointerEvents: !!J.navigator.msPointerEnabled,
        transition: (a = i.style,
            "transition" in a || "webkitTransition" in a || "MozTransition" in a),
        transforms3d: J.Modernizr && !0 === J.Modernizr.csstransforms3d || (e = i.style,
            "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e),
        flexbox: function () {
            for (var e = i.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a += 1)
                if (t[a] in e)
                    return !0;
            return !1
        }(),
        observer: "MutationObserver" in J || "WebkitMutationObserver" in J,
        passiveListener: function () {
            var e = !1;
            try {
                var t = Object.defineProperty({}, "passive", {
                    get: function () {
                        e = !0
                    }
                });
                J.addEventListener("testPassiveListener", null, t)
            } catch (e) { }
            return e
        }(),
        gestures: "ongesturestart" in J
    }), I = {
        isIE: !!J.navigator.userAgent.match(/Trident/g) || !!J.navigator.userAgent.match(/MSIE/g),
        isEdge: !!J.navigator.userAgent.match(/Edge/g),
        isSafari: (s = J.navigator.userAgent.toLowerCase(),
            0 <= s.indexOf("safari") && s.indexOf("chrome") < 0 && s.indexOf("android") < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(J.navigator.userAgent)
    }, n = function (e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e,
            t.eventsListeners = {},
            t.params && t.params.on && Object.keys(t.params.on).forEach(function (e) {
                t.on(e, t.params.on[e])
            })
    }, o = {
        components: {
            configurable: !0
        }
    };
    n.prototype.on = function (e, t, a) {
        var i = this;
        if ("function" != typeof t)
            return i;
        var s = a ? "unshift" : "push";
        return e.split(" ").forEach(function (e) {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
                i.eventsListeners[e][s](t)
        }),
            i
    }
        ,
        n.prototype.once = function (a, i, e) {
            var s = this;
            if ("function" != typeof i)
                return s;
            function r() {
                for (var e = [], t = arguments.length; t--;)
                    e[t] = arguments[t];
                i.apply(s, e),
                    s.off(a, r),
                    r.f7proxy && delete r.f7proxy
            }
            return r.f7proxy = i,
                s.on(a, r, e)
        }
        ,
        n.prototype.off = function (e, i) {
            var s = this;
            return s.eventsListeners && e.split(" ").forEach(function (a) {
                void 0 === i ? s.eventsListeners[a] = [] : s.eventsListeners[a] && s.eventsListeners[a].length && s.eventsListeners[a].forEach(function (e, t) {
                    (e === i || e.f7proxy && e.f7proxy === i) && s.eventsListeners[a].splice(t, 1)
                })
            }),
                s
        }
        ,
        n.prototype.emit = function () {
            for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
            var a, i, s, r = this;
            return r.eventsListeners && ("string" == typeof e[0] || Array.isArray(e[0]) ? (a = e[0],
                i = e.slice(1, e.length),
                s = r) : (a = e[0].events,
                    i = e[0].data,
                    s = e[0].context || r),
                (Array.isArray(a) ? a : a.split(" ")).forEach(function (e) {
                    if (r.eventsListeners && r.eventsListeners[e]) {
                        var t = [];
                        r.eventsListeners[e].forEach(function (e) {
                            t.push(e)
                        }),
                            t.forEach(function (e) {
                                e.apply(s, i)
                            })
                    }
                })),
                r
        }
        ,
        n.prototype.useModulesParams = function (a) {
            var i = this;
            i.modules && Object.keys(i.modules).forEach(function (e) {
                var t = i.modules[e];
                t.params && ee.extend(a, t.params)
            })
        }
        ,
        n.prototype.useModules = function (i) {
            void 0 === i && (i = {});
            var s = this;
            s.modules && Object.keys(s.modules).forEach(function (e) {
                var a = s.modules[e]
                    , t = i[e] || {};
                a.instance && Object.keys(a.instance).forEach(function (e) {
                    var t = a.instance[e];
                    s[e] = "function" == typeof t ? t.bind(s) : t
                }),
                    a.on && s.on && Object.keys(a.on).forEach(function (e) {
                        s.on(e, a.on[e])
                    }),
                    a.create && a.create.bind(s)(t)
            })
        }
        ,
        o.components.set = function (e) {
            this.use && this.use(e)
        }
        ,
        n.installModule = function (t) {
            for (var e = [], a = arguments.length - 1; 0 < a--;)
                e[a] = arguments[a + 1];
            var i = this;
            i.prototype.modules || (i.prototype.modules = {});
            var s = t.name || Object.keys(i.prototype.modules).length + "_" + ee.now();
            return (i.prototype.modules[s] = t).proto && Object.keys(t.proto).forEach(function (e) {
                i.prototype[e] = t.proto[e]
            }),
                t.static && Object.keys(t.static).forEach(function (e) {
                    i[e] = t.static[e]
                }),
                t.install && t.install.apply(i, e),
                i
        }
        ,
        n.use = function (e) {
            for (var t = [], a = arguments.length - 1; 0 < a--;)
                t[a] = arguments[a + 1];
            var i = this;
            return Array.isArray(e) ? (e.forEach(function (e) {
                return i.installModule(e)
            }),
                i) : i.installModule.apply(i, [e].concat(t))
        }
        ,
        Object.defineProperties(n, o);
    var d = {
        updateSize: function () {
            var e, t, a = this, i = a.$el;
            e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth,
                t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight,
                0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10),
                    t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10),
                    ee.extend(a, {
                        width: e,
                        height: t,
                        size: a.isHorizontal() ? e : t
                    }))
        },
        updateSlides: function () {
            var e = this
                , t = e.params
                , a = e.$wrapperEl
                , i = e.size
                , s = e.rtlTranslate
                , r = e.wrongRTL
                , n = e.virtual && t.virtual.enabled
                , o = n ? e.virtual.slides.length : e.slides.length
                , l = a.children("." + e.params.slideClass)
                , d = n ? e.virtual.slides.length : l.length
                , p = []
                , c = []
                , u = []
                , h = t.slidesOffsetBefore;
            "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
            var v = t.slidesOffsetAfter;
            "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
            var f = e.snapGrid.length
                , m = e.snapGrid.length
                , g = t.spaceBetween
                , b = -h
                , w = 0
                , y = 0;
            if (void 0 !== i) {
                var x, T;
                "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * i),
                    e.virtualSize = -g,
                    s ? l.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : l.css({
                        marginRight: "",
                        marginBottom: ""
                    }),
                    1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn,
                        "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
                for (var E, S = t.slidesPerColumn, C = x / S, M = Math.floor(d / t.slidesPerColumn), z = 0; z < d; z += 1) {
                    T = 0;
                    var P = l.eq(z);
                    if (1 < t.slidesPerColumn) {
                        var k = void 0
                            , $ = void 0
                            , L = void 0;
                        "column" === t.slidesPerColumnFill ? (L = z - ($ = Math.floor(z / S)) * S,
                            (M < $ || $ === M && L === S - 1) && S <= (L += 1) && (L = 0,
                                $ += 1),
                            k = $ + L * x / S,
                            P.css({
                                "-webkit-box-ordinal-group": k,
                                "-moz-box-ordinal-group": k,
                                "-ms-flex-order": k,
                                "-webkit-order": k,
                                order: k
                            })) : $ = z - (L = Math.floor(z / C)) * C,
                            P.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== L && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", $).attr("data-swiper-row", L)
                    }
                    if ("none" !== P.css("display")) {
                        if ("auto" === t.slidesPerView) {
                            var I = J.getComputedStyle(P[0], null)
                                , D = P[0].style.transform
                                , O = P[0].style.webkitTransform;
                            if (D && (P[0].style.transform = "none"),
                                O && (P[0].style.webkitTransform = "none"),
                                t.roundLengths)
                                T = e.isHorizontal() ? P.outerWidth(!0) : P.outerHeight(!0);
                            else if (e.isHorizontal()) {
                                var A = parseFloat(I.getPropertyValue("width"))
                                    , H = parseFloat(I.getPropertyValue("padding-left"))
                                    , N = parseFloat(I.getPropertyValue("padding-right"))
                                    , G = parseFloat(I.getPropertyValue("margin-left"))
                                    , B = parseFloat(I.getPropertyValue("margin-right"))
                                    , X = I.getPropertyValue("box-sizing");
                                T = X && "border-box" === X ? A + G + B : A + H + N + G + B
                            } else {
                                var Y = parseFloat(I.getPropertyValue("height"))
                                    , V = parseFloat(I.getPropertyValue("padding-top"))
                                    , F = parseFloat(I.getPropertyValue("padding-bottom"))
                                    , R = parseFloat(I.getPropertyValue("margin-top"))
                                    , q = parseFloat(I.getPropertyValue("margin-bottom"))
                                    , W = I.getPropertyValue("box-sizing");
                                T = W && "border-box" === W ? Y + R + q : Y + V + F + R + q
                            }
                            D && (P[0].style.transform = D),
                                O && (P[0].style.webkitTransform = O),
                                t.roundLengths && (T = Math.floor(T))
                        } else
                            T = (i - (t.slidesPerView - 1) * g) / t.slidesPerView,
                                t.roundLengths && (T = Math.floor(T)),
                                l[z] && (e.isHorizontal() ? l[z].style.width = T + "px" : l[z].style.height = T + "px");
                        l[z] && (l[z].swiperSlideSize = T),
                            u.push(T),
                            t.centeredSlides ? (b = b + T / 2 + w / 2 + g,
                                0 === w && 0 !== z && (b = b - i / 2 - g),
                                0 === z && (b = b - i / 2 - g),
                                Math.abs(b) < .001 && (b = 0),
                                t.roundLengths && (b = Math.floor(b)),
                                y % t.slidesPerGroup == 0 && p.push(b),
                                c.push(b)) : (t.roundLengths && (b = Math.floor(b)),
                                    y % t.slidesPerGroup == 0 && p.push(b),
                                    c.push(b),
                                    b = b + T + g),
                            e.virtualSize += T + g,
                            w = T,
                            y += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, i) + v,
                    s && r && ("slide" === t.effect || "coverflow" === t.effect) && a.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }),
                    te.flexbox && !t.setWrapperSize || (e.isHorizontal() ? a.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }) : a.css({
                        height: e.virtualSize + t.spaceBetween + "px"
                    })),
                    1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x,
                        e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween,
                        e.isHorizontal() ? a.css({
                            width: e.virtualSize + t.spaceBetween + "px"
                        }) : a.css({
                            height: e.virtualSize + t.spaceBetween + "px"
                        }),
                        t.centeredSlides)) {
                    E = [];
                    for (var j = 0; j < p.length; j += 1) {
                        var U = p[j];
                        t.roundLengths && (U = Math.floor(U)),
                            p[j] < e.virtualSize + p[0] && E.push(U)
                    }
                    p = E
                }
                if (!t.centeredSlides) {
                    E = [];
                    for (var K = 0; K < p.length; K += 1) {
                        var _ = p[K];
                        t.roundLengths && (_ = Math.floor(_)),
                            p[K] <= e.virtualSize - i && E.push(_)
                    }
                    p = E,
                        1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - i)
                }
                if (0 === p.length && (p = [0]),
                    0 !== t.spaceBetween && (e.isHorizontal() ? s ? l.css({
                        marginLeft: g + "px"
                    }) : l.css({
                        marginRight: g + "px"
                    }) : l.css({
                        marginBottom: g + "px"
                    })),
                    t.centerInsufficientSlides) {
                    var Z = 0;
                    if (u.forEach(function (e) {
                        Z += e + (t.spaceBetween ? t.spaceBetween : 0)
                    }),
                        (Z -= t.spaceBetween) < i) {
                        var Q = (i - Z) / 2;
                        p.forEach(function (e, t) {
                            p[t] = e - Q
                        }),
                            c.forEach(function (e, t) {
                                c[t] = e + Q
                            })
                    }
                }
                ee.extend(e, {
                    slides: l,
                    snapGrid: p,
                    slidesGrid: c,
                    slidesSizesGrid: u
                }),
                    d !== o && e.emit("slidesLengthChange"),
                    p.length !== f && (e.params.watchOverflow && e.checkOverflow(),
                        e.emit("snapGridLengthChange")),
                    c.length !== m && e.emit("slidesGridLengthChange"),
                    (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
            }
        },
        updateAutoHeight: function (e) {
            var t, a = this, i = [], s = 0;
            if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed),
                "auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView)
                for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
                    var r = a.activeIndex + t;
                    if (r > a.slides.length)
                        break;
                    i.push(a.slides.eq(r)[0])
                }
            else
                i.push(a.slides.eq(a.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var n = i[t].offsetHeight;
                    s = s < n ? n : s
                }
            s && a.$wrapperEl.css("height", s + "px")
        },
        updateSlidesOffset: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1)
                e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        },
        updateSlidesProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this
                , a = t.params
                , i = t.slides
                , s = t.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                var r = -e;
                s && (r = e),
                    i.removeClass(a.slideVisibleClass),
                    t.visibleSlidesIndexes = [],
                    t.visibleSlides = [];
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n]
                        , l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween);
                    if (a.watchSlidesVisibility) {
                        var d = -(r - o.swiperSlideOffset)
                            , p = d + t.slidesSizesGrid[n];
                        (0 <= d && d < t.size || 0 < p && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(o),
                            t.visibleSlidesIndexes.push(n),
                            i.eq(n).addClass(a.slideVisibleClass))
                    }
                    o.progress = s ? -l : l
                }
                t.visibleSlides = L(t.visibleSlides)
            }
        },
        updateProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this
                , a = t.params
                , i = t.maxTranslate() - t.minTranslate()
                , s = t.progress
                , r = t.isBeginning
                , n = t.isEnd
                , o = r
                , l = n;
            0 === i ? n = r = !(s = 0) : (r = (s = (e - t.minTranslate()) / i) <= 0,
                n = 1 <= s),
                ee.extend(t, {
                    progress: s,
                    isBeginning: r,
                    isEnd: n
                }),
                (a.watchSlidesProgress || a.watchSlidesVisibility) && t.updateSlidesProgress(e),
                r && !o && t.emit("reachBeginning toEdge"),
                n && !l && t.emit("reachEnd toEdge"),
                (o && !r || l && !n) && t.emit("fromEdge"),
                t.emit("progress", s)
        },
        updateSlidesClasses: function () {
            var e, t = this, a = t.slides, i = t.params, s = t.$wrapperEl, r = t.activeIndex, n = t.realIndex, o = t.virtual && i.virtual.enabled;
            a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass),
                (e = o ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass),
                i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
            var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
            var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass),
                i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass),
                    d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function (e) {
            var t, a = this, i = a.rtlTranslate ? a.translate : -a.translate, s = a.slidesGrid, r = a.snapGrid, n = a.params, o = a.activeIndex, l = a.realIndex, d = a.snapIndex, p = e;
            if (void 0 === p) {
                for (var c = 0; c < s.length; c += 1)
                    void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
                n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
            }
            if ((t = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(p / n.slidesPerGroup)) >= r.length && (t = r.length - 1),
                p !== o) {
                var u = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                ee.extend(a, {
                    snapIndex: t,
                    realIndex: u,
                    previousIndex: o,
                    activeIndex: p
                }),
                    a.emit("activeIndexChange"),
                    a.emit("snapIndexChange"),
                    l !== u && a.emit("realIndexChange"),
                    a.emit("slideChange")
            } else
                t !== d && (a.snapIndex = t,
                    a.emit("snapIndexChange"))
        },
        updateClickedSlide: function (e) {
            var t = this
                , a = t.params
                , i = L(e.target).closest("." + a.slideClass)[0]
                , s = !1;
            if (i)
                for (var r = 0; r < t.slides.length; r += 1)
                    t.slides[r] === i && (s = !0);
            if (!i || !s)
                return t.clickedSlide = void 0,
                    void (t.clickedIndex = void 0);
            t.clickedSlide = i,
                t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = L(i).index(),
                a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    };
    var p = {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params
                , a = this.rtlTranslate
                , i = this.translate
                , s = this.$wrapperEl;
            if (t.virtualTranslate)
                return a ? -i : i;
            var r = ee.getTranslate(s[0], e);
            return a && (r = -r),
                r || 0
        },
        setTranslate: function (e, t) {
            var a = this
                , i = a.rtlTranslate
                , s = a.params
                , r = a.$wrapperEl
                , n = a.progress
                , o = 0
                , l = 0;
            a.isHorizontal() ? o = i ? -e : e : l = e,
                s.roundLengths && (o = Math.floor(o),
                    l = Math.floor(l)),
                s.virtualTranslate || (te.transforms3d ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)") : r.transform("translate(" + o + "px, " + l + "px)")),
                a.previousTranslate = a.translate,
                a.translate = a.isHorizontal() ? o : l;
            var d = a.maxTranslate() - a.minTranslate();
            (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e),
                a.emit("setTranslate", a.translate, t)
        },
        minTranslate: function () {
            return -this.snapGrid[0]
        },
        maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    };
    var c = {
        setTransition: function (e, t) {
            this.$wrapperEl.transition(e),
                this.emit("setTransition", e, t)
        },
        transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            var a = this
                , i = a.activeIndex
                , s = a.params
                , r = a.previousIndex;
            s.autoHeight && a.updateAutoHeight();
            var n = t;
            if (n || (n = r < i ? "next" : i < r ? "prev" : "reset"),
                a.emit("transitionStart"),
                e && i !== r) {
                if ("reset" === n)
                    return void a.emit("slideResetTransitionStart");
                a.emit("slideChangeTransitionStart"),
                    "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
            }
        },
        transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            var a = this
                , i = a.activeIndex
                , s = a.previousIndex;
            a.animating = !1,
                a.setTransition(0);
            var r = t;
            if (r || (r = s < i ? "next" : i < s ? "prev" : "reset"),
                a.emit("transitionEnd"),
                e && i !== s) {
                if ("reset" === r)
                    return void a.emit("slideResetTransitionEnd");
                a.emit("slideChangeTransitionEnd"),
                    "next" === r ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
            }
        }
    };
    var u = {
        slideTo: function (e, t, a, i) {
            void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === a && (a = !0);
            var s = this
                , r = e;
            r < 0 && (r = 0);
            var n = s.params
                , o = s.snapGrid
                , l = s.slidesGrid
                , d = s.previousIndex
                , p = s.activeIndex
                , c = s.rtlTranslate;
            if (s.animating && n.preventInteractionOnTransition)
                return !1;
            var u = Math.floor(r / n.slidesPerGroup);
            u >= o.length && (u = o.length - 1),
                (p || n.initialSlide || 0) === (d || 0) && a && s.emit("beforeSlideChangeStart");
            var h, v = -o[u];
            if (s.updateProgress(v),
                n.normalizeSlideIndex)
                for (var f = 0; f < l.length; f += 1)
                    -Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
            if (s.initialized && r !== p) {
                if (!s.allowSlideNext && v < s.translate && v < s.minTranslate())
                    return !1;
                if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r)
                    return !1
            }
            return h = p < r ? "next" : r < p ? "prev" : "reset",
                c && -v === s.translate || !c && v === s.translate ? (s.updateActiveIndex(r),
                    n.autoHeight && s.updateAutoHeight(),
                    s.updateSlidesClasses(),
                    "slide" !== n.effect && s.setTranslate(v),
                    "reset" !== h && (s.transitionStart(a, h),
                        s.transitionEnd(a, h)),
                    !1) : (0 !== t && te.transition ? (s.setTransition(t),
                        s.setTranslate(v),
                        s.updateActiveIndex(r),
                        s.updateSlidesClasses(),
                        s.emit("beforeTransitionStart", t, i),
                        s.transitionStart(a, h),
                        s.animating || (s.animating = !0,
                            s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function (e) {
                                s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
                                    s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd),
                                    s.onSlideToWrapperTransitionEnd = null,
                                    delete s.onSlideToWrapperTransitionEnd,
                                    s.transitionEnd(a, h))
                            }
                            ),
                            s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
                            s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0),
                                s.setTranslate(v),
                                s.updateActiveIndex(r),
                                s.updateSlidesClasses(),
                                s.emit("beforeTransitionStart", t, i),
                                s.transitionStart(a, h),
                                s.transitionEnd(a, h)),
                        !0)
        },
        slideToLoop: function (e, t, a, i) {
            void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === a && (a = !0);
            var s = e;
            return this.params.loop && (s += this.loopedSlides),
                this.slideTo(s, t, a, i)
        },
        slideNext: function (e, t, a) {
            void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
            var i = this
                , s = i.params
                , r = i.animating;
            return s.loop ? !r && (i.loopFix(),
                i._clientLeft = i.$wrapperEl[0].clientLeft,
                i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)
        },
        slidePrev: function (e, t, a) {
            void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
            var i = this
                , s = i.params
                , r = i.animating
                , n = i.snapGrid
                , o = i.slidesGrid
                , l = i.rtlTranslate;
            if (s.loop) {
                if (r)
                    return !1;
                i.loopFix(),
                    i._clientLeft = i.$wrapperEl[0].clientLeft
            }
            function d(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            var p, c = d(l ? i.translate : -i.translate), u = n.map(function (e) {
                return d(e)
            }), h = (o.map(function (e) {
                return d(e)
            }),
                n[u.indexOf(c)],
                n[u.indexOf(c) - 1]);
            return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1),
                i.slideTo(p, e, t, a)
        },
        slideReset: function (e, t, a) {
            return void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                this.slideTo(this.activeIndex, e, t, a)
        },
        slideToClosest: function (e, t, a) {
            void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
            var i = this
                , s = i.activeIndex
                , r = Math.floor(s / i.params.slidesPerGroup);
            if (r < i.snapGrid.length - 1) {
                var n = i.rtlTranslate ? i.translate : -i.translate
                    , o = i.snapGrid[r];
                (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup)
            }
            return i.slideTo(s, e, t, a)
        },
        slideToClickedSlide: function () {
            var e, t = this, a = t.params, i = t.$wrapperEl, s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView, r = t.clickedIndex;
            if (a.loop) {
                if (t.animating)
                    return;
                e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10),
                    a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(),
                        r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(),
                        ee.nextTick(function () {
                            t.slideTo(r)
                        })) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(),
                            r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(),
                            ee.nextTick(function () {
                                t.slideTo(r)
                            })) : t.slideTo(r)
            } else
                t.slideTo(r)
        }
    };
    var h = {
        loopCreate: function () {
            var i = this
                , e = i.params
                , t = i.$wrapperEl;
            t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
            var s = t.children("." + e.slideClass);
            if (e.loopFillGroupWithBlank) {
                var a = e.slidesPerGroup - s.length % e.slidesPerGroup;
                if (a !== e.slidesPerGroup) {
                    for (var r = 0; r < a; r += 1) {
                        var n = L(f.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                        t.append(n)
                    }
                    s = t.children("." + e.slideClass)
                }
            }
            "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = s.length),
                i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10),
                i.loopedSlides += e.loopAdditionalSlides,
                i.loopedSlides > s.length && (i.loopedSlides = s.length);
            var o = []
                , l = [];
            s.each(function (e, t) {
                var a = L(t);
                e < i.loopedSlides && l.push(t),
                    e < s.length && e >= s.length - i.loopedSlides && o.push(t),
                    a.attr("data-swiper-slide-index", e)
            });
            for (var d = 0; d < l.length; d += 1)
                t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
            for (var p = o.length - 1; 0 <= p; p -= 1)
                t.prepend(L(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass))
        },
        loopFix: function () {
            var e, t = this, a = t.params, i = t.activeIndex, s = t.slides, r = t.loopedSlides, n = t.allowSlidePrev, o = t.allowSlideNext, l = t.snapGrid, d = t.rtlTranslate;
            t.allowSlidePrev = !0,
                t.allowSlideNext = !0;
            var p = -l[i] - t.getTranslate();
            i < r ? (e = s.length - 3 * r + i,
                e += r,
                t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p)) : ("auto" === a.slidesPerView && 2 * r <= i || i >= s.length - r) && (e = -s.length + i + r,
                    e += r,
                    t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p));
            t.allowSlidePrev = n,
                t.allowSlideNext = o
        },
        loopDestroy: function () {
            var e = this.$wrapperEl
                , t = this.params
                , a = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(),
                a.removeAttr("data-swiper-slide-index")
        }
    };
    var v = {
        setGrabCursor: function (e) {
            if (!(te.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move",
                    t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
                    t.style.cursor = e ? "-moz-grabbin" : "-moz-grab",
                    t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function () {
            te.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    };
    var m = {
        appendSlide: function (e) {
            var t = this
                , a = t.$wrapperEl
                , i = t.params;
            if (i.loop && t.loopDestroy(),
                "object" == typeof e && "length" in e)
                for (var s = 0; s < e.length; s += 1)
                    e[s] && a.append(e[s]);
            else
                a.append(e);
            i.loop && t.loopCreate(),
                i.observer && te.observer || t.update()
        },
        prependSlide: function (e) {
            var t = this
                , a = t.params
                , i = t.$wrapperEl
                , s = t.activeIndex;
            a.loop && t.loopDestroy();
            var r = s + 1;
            if ("object" == typeof e && "length" in e) {
                for (var n = 0; n < e.length; n += 1)
                    e[n] && i.prepend(e[n]);
                r = s + e.length
            } else
                i.prepend(e);
            a.loop && t.loopCreate(),
                a.observer && te.observer || t.update(),
                t.slideTo(r, 0, !1)
        },
        addSlide: function (e, t) {
            var a = this
                , i = a.$wrapperEl
                , s = a.params
                , r = a.activeIndex;
            s.loop && (r -= a.loopedSlides,
                a.loopDestroy(),
                a.slides = i.children("." + s.slideClass));
            var n = a.slides.length;
            if (e <= 0)
                a.prependSlide(t);
            else if (n <= e)
                a.appendSlide(t);
            else {
                for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) {
                    var p = a.slides.eq(d);
                    p.remove(),
                        l.unshift(p)
                }
                if ("object" == typeof t && "length" in t) {
                    for (var c = 0; c < t.length; c += 1)
                        t[c] && i.append(t[c]);
                    o = e < r ? r + t.length : r
                } else
                    i.append(t);
                for (var u = 0; u < l.length; u += 1)
                    i.append(l[u]);
                s.loop && a.loopCreate(),
                    s.observer && te.observer || a.update(),
                    s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1)
            }
        },
        removeSlide: function (e) {
            var t = this
                , a = t.params
                , i = t.$wrapperEl
                , s = t.activeIndex;
            a.loop && (s -= t.loopedSlides,
                t.loopDestroy(),
                t.slides = i.children("." + a.slideClass));
            var r, n = s;
            if ("object" == typeof e && "length" in e) {
                for (var o = 0; o < e.length; o += 1)
                    r = e[o],
                        t.slides[r] && t.slides.eq(r).remove(),
                        r < n && (n -= 1);
                n = Math.max(n, 0)
            } else
                r = e,
                    t.slides[r] && t.slides.eq(r).remove(),
                    r < n && (n -= 1),
                    n = Math.max(n, 0);
            a.loop && t.loopCreate(),
                a.observer && te.observer || t.update(),
                a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
        },
        removeAllSlides: function () {
            for (var e = [], t = 0; t < this.slides.length; t += 1)
                e.push(t);
            this.removeSlide(e)
        }
    }
        , g = function () {
            var e = J.navigator.userAgent
                , t = {
                    ios: !1,
                    android: !1,
                    androidChrome: !1,
                    desktop: !1,
                    windows: !1,
                    iphone: !1,
                    ipod: !1,
                    ipad: !1,
                    cordova: J.cordova || J.phonegap,
                    phonegap: J.cordova || J.phonegap
                }
                , a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/)
                , i = e.match(/(Android);?[\s\/]+([\d.]+)?/)
                , s = e.match(/(iPad).*OS\s([\d_]+)/)
                , r = e.match(/(iPod)(.*OS\s([\d_]+))?/)
                , n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            if (a && (t.os = "windows",
                t.osVersion = a[2],
                t.windows = !0),
                i && !a && (t.os = "android",
                    t.osVersion = i[2],
                    t.android = !0,
                    t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")),
                (s || n || r) && (t.os = "ios",
                    t.ios = !0),
                n && !r && (t.osVersion = n[2].replace(/_/g, "."),
                    t.iphone = !0),
                s && (t.osVersion = s[2].replace(/_/g, "."),
                    t.ipad = !0),
                r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null,
                    t.iphone = !0),
                t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]),
                t.desktop = !(t.os || t.android || t.webView),
                t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i),
                t.os && "ios" === t.os) {
                var o = t.osVersion.split(".")
                    , l = f.querySelector('meta[name="viewport"]');
                t.minimalUi = !t.webView && (r || n) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui")
            }
            return t.pixelRatio = J.devicePixelRatio || 1,
                t
        }();
    function b() {
        var e = this
            , t = e.params
            , a = e.el;
        if (!a || 0 !== a.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var i = e.allowSlideNext
                , s = e.allowSlidePrev
                , r = e.snapGrid;
            if (e.allowSlideNext = !0,
                e.allowSlidePrev = !0,
                e.updateSize(),
                e.updateSlides(),
                t.freeMode) {
                var n = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(n),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses(),
                    t.autoHeight && e.updateAutoHeight()
            } else
                e.updateSlidesClasses(),
                    ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = s,
                e.allowSlideNext = i,
                e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }
    }
    var w = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        preventInteractionOnTransition: !1,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsInverse: !1,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0
    }
        , y = {
            update: d,
            translate: p,
            transition: c,
            slide: u,
            loop: h,
            grabCursor: v,
            manipulation: m,
            events: {
                attachEvents: function () {
                    var e = this
                        , t = e.params
                        , a = e.touchEvents
                        , i = e.el
                        , s = e.wrapperEl;
                    e.onTouchStart = function (e) {
                        var t = this
                            , a = t.touchEventsData
                            , i = t.params
                            , s = t.touches;
                        if (!t.animating || !i.preventInteractionOnTransition) {
                            var r = e;
                            if (r.originalEvent && (r = r.originalEvent),
                                a.isTouchEvent = "touchstart" === r.type,
                                (a.isTouchEvent || !("which" in r) || 3 !== r.which) && !(!a.isTouchEvent && "button" in r && 0 < r.button || a.isTouched && a.isMoved))
                                if (i.noSwiping && L(r.target).closest(i.noSwipingSelector ? i.noSwipingSelector : "." + i.noSwipingClass)[0])
                                    t.allowClick = !0;
                                else if (!i.swipeHandler || L(r).closest(i.swipeHandler)[0]) {
                                    s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX,
                                        s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
                                    var n = s.currentX
                                        , o = s.currentY
                                        , l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection
                                        , d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;
                                    if (!l || !(n <= d || n >= J.screen.width - d)) {
                                        if (ee.extend(a, {
                                            isTouched: !0,
                                            isMoved: !1,
                                            allowTouchCallbacks: !0,
                                            isScrolling: void 0,
                                            startMoving: void 0
                                        }),
                                            s.startX = n,
                                            s.startY = o,
                                            a.touchStartTime = ee.now(),
                                            t.allowClick = !0,
                                            t.updateSize(),
                                            t.swipeDirection = void 0,
                                            0 < i.threshold && (a.allowThresholdMove = !1),
                                            "touchstart" !== r.type) {
                                            var p = !0;
                                            L(r.target).is(a.formElements) && (p = !1),
                                                f.activeElement && L(f.activeElement).is(a.formElements) && f.activeElement !== r.target && f.activeElement.blur();
                                            var c = p && t.allowTouchMove && i.touchStartPreventDefault;
                                            (i.touchStartForcePreventDefault || c) && r.preventDefault()
                                        }
                                        t.emit("touchStart", r)
                                    }
                                }
                        }
                    }
                        .bind(e),
                        e.onTouchMove = function (e) {
                            var t = this
                                , a = t.touchEventsData
                                , i = t.params
                                , s = t.touches
                                , r = t.rtlTranslate
                                , n = e;
                            if (n.originalEvent && (n = n.originalEvent),
                                a.isTouched) {
                                if (!a.isTouchEvent || "mousemove" !== n.type) {
                                    var o = "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX
                                        , l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY;
                                    if (n.preventedByNestedSwiper)
                                        return s.startX = o,
                                            void (s.startY = l);
                                    if (!t.allowTouchMove)
                                        return t.allowClick = !1,
                                            void (a.isTouched && (ee.extend(s, {
                                                startX: o,
                                                startY: l,
                                                currentX: o,
                                                currentY: l
                                            }),
                                                a.touchStartTime = ee.now()));
                                    if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
                                        if (t.isVertical()) {
                                            if (l < s.startY && t.translate <= t.maxTranslate() || l > s.startY && t.translate >= t.minTranslate())
                                                return a.isTouched = !1,
                                                    void (a.isMoved = !1)
                                        } else if (o < s.startX && t.translate <= t.maxTranslate() || o > s.startX && t.translate >= t.minTranslate())
                                            return;
                                    if (a.isTouchEvent && f.activeElement && n.target === f.activeElement && L(n.target).is(a.formElements))
                                        return a.isMoved = !0,
                                            void (t.allowClick = !1);
                                    if (a.allowTouchCallbacks && t.emit("touchMove", n),
                                        !(n.targetTouches && 1 < n.targetTouches.length)) {
                                        s.currentX = o,
                                            s.currentY = l;
                                        var d, p = s.currentX - s.startX, c = s.currentY - s.startY;
                                        if (!(t.params.threshold && Math.sqrt(Math.pow(p, 2) + Math.pow(c, 2)) < t.params.threshold))
                                            if (void 0 === a.isScrolling && (t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= p * p + c * c && (d = 180 * Math.atan2(Math.abs(c), Math.abs(p)) / Math.PI,
                                                a.isScrolling = t.isHorizontal() ? d > i.touchAngle : 90 - d > i.touchAngle)),
                                                a.isScrolling && t.emit("touchMoveOpposite", n),
                                                void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)),
                                                a.isScrolling)
                                                a.isTouched = !1;
                                            else if (a.startMoving) {
                                                t.allowClick = !1,
                                                    n.preventDefault(),
                                                    i.touchMoveStopPropagation && !i.nested && n.stopPropagation(),
                                                    a.isMoved || (i.loop && t.loopFix(),
                                                        a.startTranslate = t.getTranslate(),
                                                        t.setTransition(0),
                                                        t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                                                        a.allowMomentumBounce = !1,
                                                        !i.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0),
                                                        t.emit("sliderFirstMove", n)),
                                                    t.emit("sliderMove", n),
                                                    a.isMoved = !0;
                                                var u = t.isHorizontal() ? p : c;
                                                s.diff = u,
                                                    u *= i.touchRatio,
                                                    r && (u = -u),
                                                    t.swipeDirection = 0 < u ? "prev" : "next",
                                                    a.currentTranslate = u + a.startTranslate;
                                                var h = !0
                                                    , v = i.resistanceRatio;
                                                if (i.touchReleaseOnEdges && (v = 0),
                                                    0 < u && a.currentTranslate > t.minTranslate() ? (h = !1,
                                                        i.resistance && (a.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + a.startTranslate + u, v))) : u < 0 && a.currentTranslate < t.maxTranslate() && (h = !1,
                                                            i.resistance && (a.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - a.startTranslate - u, v))),
                                                    h && (n.preventedByNestedSwiper = !0),
                                                    !t.allowSlideNext && "next" === t.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate),
                                                    !t.allowSlidePrev && "prev" === t.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate),
                                                    0 < i.threshold) {
                                                    if (!(Math.abs(u) > i.threshold || a.allowThresholdMove))
                                                        return void (a.currentTranslate = a.startTranslate);
                                                    if (!a.allowThresholdMove)
                                                        return a.allowThresholdMove = !0,
                                                            s.startX = s.currentX,
                                                            s.startY = s.currentY,
                                                            a.currentTranslate = a.startTranslate,
                                                            void (s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                                                }
                                                i.followFinger && ((i.freeMode || i.watchSlidesProgress || i.watchSlidesVisibility) && (t.updateActiveIndex(),
                                                    t.updateSlidesClasses()),
                                                    i.freeMode && (0 === a.velocities.length && a.velocities.push({
                                                        position: s[t.isHorizontal() ? "startX" : "startY"],
                                                        time: a.touchStartTime
                                                    }),
                                                        a.velocities.push({
                                                            position: s[t.isHorizontal() ? "currentX" : "currentY"],
                                                            time: ee.now()
                                                        })),
                                                    t.updateProgress(a.currentTranslate),
                                                    t.setTranslate(a.currentTranslate))
                                            }
                                    }
                                }
                            } else
                                a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n)
                        }
                            .bind(e),
                        e.onTouchEnd = function (e) {
                            var t = this
                                , a = t.touchEventsData
                                , i = t.params
                                , s = t.touches
                                , r = t.rtlTranslate
                                , n = t.$wrapperEl
                                , o = t.slidesGrid
                                , l = t.snapGrid
                                , d = e;
                            if (d.originalEvent && (d = d.originalEvent),
                                a.allowTouchCallbacks && t.emit("touchEnd", d),
                                a.allowTouchCallbacks = !1,
                                !a.isTouched)
                                return a.isMoved && i.grabCursor && t.setGrabCursor(!1),
                                    a.isMoved = !1,
                                    void (a.startMoving = !1);
                            i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                            var p, c = ee.now(), u = c - a.touchStartTime;
                            if (t.allowClick && (t.updateClickedSlide(d),
                                t.emit("tap", d),
                                u < 300 && 300 < c - a.lastClickTime && (a.clickTimeout && clearTimeout(a.clickTimeout),
                                    a.clickTimeout = ee.nextTick(function () {
                                        t && !t.destroyed && t.emit("click", d)
                                    }, 300)),
                                u < 300 && c - a.lastClickTime < 300 && (a.clickTimeout && clearTimeout(a.clickTimeout),
                                    t.emit("doubleTap", d))),
                                a.lastClickTime = ee.now(),
                                ee.nextTick(function () {
                                    t.destroyed || (t.allowClick = !0)
                                }),
                                !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate)
                                return a.isTouched = !1,
                                    a.isMoved = !1,
                                    void (a.startMoving = !1);
                            if (a.isTouched = !1,
                                a.isMoved = !1,
                                a.startMoving = !1,
                                p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate,
                                i.freeMode) {
                                if (p < -t.minTranslate())
                                    return void t.slideTo(t.activeIndex);
                                if (p > -t.maxTranslate())
                                    return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                                if (i.freeModeMomentum) {
                                    if (1 < a.velocities.length) {
                                        var h = a.velocities.pop()
                                            , v = a.velocities.pop()
                                            , f = h.position - v.position
                                            , m = h.time - v.time;
                                        t.velocity = f / m,
                                            t.velocity /= 2,
                                            Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0),
                                            (150 < m || 300 < ee.now() - h.time) && (t.velocity = 0)
                                    } else
                                        t.velocity = 0;
                                    t.velocity *= i.freeModeMomentumVelocityRatio,
                                        a.velocities.length = 0;
                                    var g = 1e3 * i.freeModeMomentumRatio
                                        , b = t.velocity * g
                                        , w = t.translate + b;
                                    r && (w = -w);
                                    var y, x, T = !1, E = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
                                    if (w < t.maxTranslate())
                                        i.freeModeMomentumBounce ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E),
                                            y = t.maxTranslate(),
                                            T = !0,
                                            a.allowMomentumBounce = !0) : w = t.maxTranslate(),
                                            i.loop && i.centeredSlides && (x = !0);
                                    else if (w > t.minTranslate())
                                        i.freeModeMomentumBounce ? (w - t.minTranslate() > E && (w = t.minTranslate() + E),
                                            y = t.minTranslate(),
                                            T = !0,
                                            a.allowMomentumBounce = !0) : w = t.minTranslate(),
                                            i.loop && i.centeredSlides && (x = !0);
                                    else if (i.freeModeSticky) {
                                        for (var S, C = 0; C < l.length; C += 1)
                                            if (l[C] > -w) {
                                                S = C;
                                                break
                                            }
                                        w = -(w = Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) || "next" === t.swipeDirection ? l[S] : l[S - 1])
                                    }
                                    if (x && t.once("transitionEnd", function () {
                                        t.loopFix()
                                    }),
                                        0 !== t.velocity)
                                        g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);
                                    else if (i.freeModeSticky)
                                        return void t.slideToClosest();
                                    i.freeModeMomentumBounce && T ? (t.updateProgress(y),
                                        t.setTransition(g),
                                        t.setTranslate(w),
                                        t.transitionStart(!0, t.swipeDirection),
                                        t.animating = !0,
                                        n.transitionEnd(function () {
                                            t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"),
                                                t.setTransition(i.speed),
                                                t.setTranslate(y),
                                                n.transitionEnd(function () {
                                                    t && !t.destroyed && t.transitionEnd()
                                                }))
                                        })) : t.velocity ? (t.updateProgress(w),
                                            t.setTransition(g),
                                            t.setTranslate(w),
                                            t.transitionStart(!0, t.swipeDirection),
                                            t.animating || (t.animating = !0,
                                                n.transitionEnd(function () {
                                                    t && !t.destroyed && t.transitionEnd()
                                                }))) : t.updateProgress(w),
                                        t.updateActiveIndex(),
                                        t.updateSlidesClasses()
                                } else if (i.freeModeSticky)
                                    return void t.slideToClosest();
                                (!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(),
                                    t.updateActiveIndex(),
                                    t.updateSlidesClasses())
                            } else {
                                for (var M = 0, z = t.slidesSizesGrid[0], P = 0; P < o.length; P += i.slidesPerGroup)
                                    void 0 !== o[P + i.slidesPerGroup] ? p >= o[P] && p < o[P + i.slidesPerGroup] && (z = o[(M = P) + i.slidesPerGroup] - o[P]) : p >= o[P] && (M = P,
                                        z = o[o.length - 1] - o[o.length - 2]);
                                var k = (p - o[M]) / z;
                                if (u > i.longSwipesMs) {
                                    if (!i.longSwipes)
                                        return void t.slideTo(t.activeIndex);
                                    "next" === t.swipeDirection && (k >= i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)),
                                        "prev" === t.swipeDirection && (k > 1 - i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M))
                                } else {
                                    if (!i.shortSwipes)
                                        return void t.slideTo(t.activeIndex);
                                    "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup),
                                        "prev" === t.swipeDirection && t.slideTo(M)
                                }
                            }
                        }
                            .bind(e),
                        e.onClick = function (e) {
                            this.allowClick || (this.params.preventClicks && e.preventDefault(),
                                this.params.preventClicksPropagation && this.animating && (e.stopPropagation(),
                                    e.stopImmediatePropagation()))
                        }
                            .bind(e);
                    var r = "container" === t.touchEventsTarget ? i : s
                        , n = !!t.nested;
                    if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                        if (te.touch) {
                            var o = !("touchstart" !== a.start || !te.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            r.addEventListener(a.start, e.onTouchStart, o),
                                r.addEventListener(a.move, e.onTouchMove, te.passiveListener ? {
                                    passive: !1,
                                    capture: n
                                } : n),
                                r.addEventListener(a.end, e.onTouchEnd, o)
                        }
                        (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !te.touch && g.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1),
                            f.addEventListener("mousemove", e.onTouchMove, n),
                            f.addEventListener("mouseup", e.onTouchEnd, !1))
                    } else
                        r.addEventListener(a.start, e.onTouchStart, !1),
                            f.addEventListener(a.move, e.onTouchMove, n),
                            f.addEventListener(a.end, e.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0),
                        e.on(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b, !0)
                },
                detachEvents: function () {
                    var e = this
                        , t = e.params
                        , a = e.touchEvents
                        , i = e.el
                        , s = e.wrapperEl
                        , r = "container" === t.touchEventsTarget ? i : s
                        , n = !!t.nested;
                    if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                        if (te.touch) {
                            var o = !("onTouchStart" !== a.start || !te.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            r.removeEventListener(a.start, e.onTouchStart, o),
                                r.removeEventListener(a.move, e.onTouchMove, n),
                                r.removeEventListener(a.end, e.onTouchEnd, o)
                        }
                        (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !te.touch && g.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1),
                            f.removeEventListener("mousemove", e.onTouchMove, n),
                            f.removeEventListener("mouseup", e.onTouchEnd, !1))
                    } else
                        r.removeEventListener(a.start, e.onTouchStart, !1),
                            f.removeEventListener(a.move, e.onTouchMove, n),
                            f.removeEventListener(a.end, e.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0),
                        e.off(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b)
                }
            },
            breakpoints: {
                setBreakpoint: function () {
                    var e = this
                        , t = e.activeIndex
                        , a = e.initialized
                        , i = e.loopedSlides;
                    void 0 === i && (i = 0);
                    var s = e.params
                        , r = s.breakpoints;
                    if (r && (!r || 0 !== Object.keys(r).length)) {
                        var n = e.getBreakpoint(r);
                        if (n && e.currentBreakpoint !== n) {
                            var o = n in r ? r[n] : void 0;
                            o && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(function (e) {
                                var t = o[e];
                                void 0 !== t && (o[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                            });
                            var l = o || e.originalParams
                                , d = l.direction && l.direction !== s.direction
                                , p = s.loop && (l.slidesPerView !== s.slidesPerView || d);
                            d && a && e.changeDirection(),
                                ee.extend(e.params, l),
                                ee.extend(e, {
                                    allowTouchMove: e.params.allowTouchMove,
                                    allowSlideNext: e.params.allowSlideNext,
                                    allowSlidePrev: e.params.allowSlidePrev
                                }),
                                e.currentBreakpoint = n,
                                p && a && (e.loopDestroy(),
                                    e.loopCreate(),
                                    e.updateSlides(),
                                    e.slideTo(t - i + e.loopedSlides, 0, !1)),
                                e.emit("breakpoint", l)
                        }
                    }
                },
                getBreakpoint: function (e) {
                    if (e) {
                        var t = !1
                            , a = [];
                        Object.keys(e).forEach(function (e) {
                            a.push(e)
                        }),
                            a.sort(function (e, t) {
                                return parseInt(e, 10) - parseInt(t, 10)
                            });
                        for (var i = 0; i < a.length; i += 1) {
                            var s = a[i];
                            this.params.breakpointsInverse ? s <= J.innerWidth && (t = s) : s >= J.innerWidth && !t && (t = s)
                        }
                        return t || "max"
                    }
                }
            },
            checkOverflow: {
                checkOverflow: function () {
                    var e = this
                        , t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length,
                        e.allowSlideNext = !e.isLocked,
                        e.allowSlidePrev = !e.isLocked,
                        t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"),
                        t && t !== e.isLocked && (e.isEnd = !1,
                            e.navigation.update())
                }
            },
            classes: {
                addClasses: function () {
                    var t = this.classNames
                        , a = this.params
                        , e = this.rtl
                        , i = this.$el
                        , s = [];
                    s.push("initialized"),
                        s.push(a.direction),
                        a.freeMode && s.push("free-mode"),
                        te.flexbox || s.push("no-flexbox"),
                        a.autoHeight && s.push("autoheight"),
                        e && s.push("rtl"),
                        1 < a.slidesPerColumn && s.push("multirow"),
                        g.android && s.push("android"),
                        g.ios && s.push("ios"),
                        (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && s.push("wp8-" + a.direction),
                        s.forEach(function (e) {
                            t.push(a.containerModifierClass + e)
                        }),
                        i.addClass(t.join(" "))
                },
                removeClasses: function () {
                    var e = this.$el
                        , t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function (e, t, a, i, s, r) {
                    var n;
                    function o() {
                        r && r()
                    }
                    e.complete && s ? o() : t ? ((n = new J.Image).onload = o,
                        n.onerror = o,
                        i && (n.sizes = i),
                        a && (n.srcset = a),
                        t && (n.src = t)) : o()
                },
                preloadImages: function () {
                    var e = this;
                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                            e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(),
                                e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                        var i = e.imagesToLoad[a];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                    }
                }
            }
        }
        , x = {}
        , T = function (u) {
            function h() {
                for (var e, t, s, a = [], i = arguments.length; i--;)
                    a[i] = arguments[i];
                1 === a.length && a[0].constructor && a[0].constructor === Object ? s = a[0] : (t = (e = a)[0],
                    s = e[1]),
                    s || (s = {}),
                    s = ee.extend({}, s),
                    t && !s.el && (s.el = t),
                    u.call(this, s),
                    Object.keys(y).forEach(function (t) {
                        Object.keys(y[t]).forEach(function (e) {
                            h.prototype[e] || (h.prototype[e] = y[t][e])
                        })
                    });
                var r = this;
                void 0 === r.modules && (r.modules = {}),
                    Object.keys(r.modules).forEach(function (e) {
                        var t = r.modules[e];
                        if (t.params) {
                            var a = Object.keys(t.params)[0]
                                , i = t.params[a];
                            if ("object" != typeof i || null === i)
                                return;
                            if (!(a in s && "enabled" in i))
                                return;
                            !0 === s[a] && (s[a] = {
                                enabled: !0
                            }),
                                "object" != typeof s[a] || "enabled" in s[a] || (s[a].enabled = !0),
                                s[a] || (s[a] = {
                                    enabled: !1
                                })
                        }
                    });
                var n = ee.extend({}, w);
                r.useModulesParams(n),
                    r.params = ee.extend({}, n, x, s),
                    r.originalParams = ee.extend({}, r.params),
                    r.passedParams = ee.extend({}, s);
                var o = (r.$ = L)(r.params.el);
                if (t = o[0]) {
                    if (1 < o.length) {
                        var l = [];
                        return o.each(function (e, t) {
                            var a = ee.extend({}, s, {
                                el: t
                            });
                            l.push(new h(a))
                        }),
                            l
                    }
                    t.swiper = r,
                        o.data("swiper", r);
                    var d, p, c = o.children("." + r.params.wrapperClass);
                    return ee.extend(r, {
                        $el: o,
                        el: t,
                        $wrapperEl: c,
                        wrapperEl: c[0],
                        classNames: [],
                        slides: L(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                            return "horizontal" === r.params.direction
                        },
                        isVertical: function () {
                            return "vertical" === r.params.direction
                        },
                        rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
                        rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
                        wrongRTL: "-webkit-box" === c.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: r.params.allowSlideNext,
                        allowSlidePrev: r.params.allowSlidePrev,
                        touchEvents: (d = ["touchstart", "touchmove", "touchend"],
                            p = ["mousedown", "mousemove", "mouseup"],
                            te.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : te.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
                            r.touchEventsTouch = {
                                start: d[0],
                                move: d[1],
                                end: d[2]
                            },
                            r.touchEventsDesktop = {
                                start: p[0],
                                move: p[1],
                                end: p[2]
                            },
                            te.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: ee.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: r.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }),
                        r.useModules(),
                        r.params.init && r.init(),
                        r
                }
            }
            u && (h.__proto__ = u);
            var e = {
                extendedDefaults: {
                    configurable: !0
                },
                defaults: {
                    configurable: !0
                },
                Class: {
                    configurable: !0
                },
                $: {
                    configurable: !0
                }
            };
            return ((h.prototype = Object.create(u && u.prototype)).constructor = h).prototype.slidesPerViewDynamic = function () {
                var e = this
                    , t = e.params
                    , a = e.slides
                    , i = e.slidesGrid
                    , s = e.size
                    , r = e.activeIndex
                    , n = 1;
                if (t.centeredSlides) {
                    for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1)
                        a[d] && !o && (n += 1,
                            s < (l += a[d].swiperSlideSize) && (o = !0));
                    for (var p = r - 1; 0 <= p; p -= 1)
                        a[p] && !o && (n += 1,
                            s < (l += a[p].swiperSlideSize) && (o = !0))
                } else
                    for (var c = r + 1; c < a.length; c += 1)
                        i[c] - i[r] < s && (n += 1);
                return n
            }
                ,
                h.prototype.update = function () {
                    var a = this;
                    if (a && !a.destroyed) {
                        var e = a.snapGrid
                            , t = a.params;
                        t.breakpoints && a.setBreakpoint(),
                            a.updateSize(),
                            a.updateSlides(),
                            a.updateProgress(),
                            a.updateSlidesClasses(),
                            a.params.freeMode ? (i(),
                                a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || i(),
                            t.watchOverflow && e !== a.snapGrid && a.checkOverflow(),
                            a.emit("update")
                    }
                    function i() {
                        var e = a.rtlTranslate ? -1 * a.translate : a.translate
                            , t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
                        a.setTranslate(t),
                            a.updateActiveIndex(),
                            a.updateSlidesClasses()
                    }
                }
                ,
                h.prototype.changeDirection = function (a, e) {
                    void 0 === e && (e = !0);
                    var t = this
                        , i = t.params.direction;
                    return a || (a = "horizontal" === i ? "vertical" : "horizontal"),
                        a === i || "horizontal" !== a && "vertical" !== a || ("vertical" === i && (t.$el.removeClass(t.params.containerModifierClass + "vertical wp8-vertical").addClass("" + t.params.containerModifierClass + a),
                            (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + a)),
                            "horizontal" === i && (t.$el.removeClass(t.params.containerModifierClass + "horizontal wp8-horizontal").addClass("" + t.params.containerModifierClass + a),
                                (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + a)),
                            t.params.direction = a,
                            t.slides.each(function (e, t) {
                                "vertical" === a ? t.style.width = "" : t.style.height = ""
                            }),
                            t.emit("changeDirection"),
                            e && t.update()),
                        t
                }
                ,
                h.prototype.init = function () {
                    var e = this;
                    e.initialized || (e.emit("beforeInit"),
                        e.params.breakpoints && e.setBreakpoint(),
                        e.addClasses(),
                        e.params.loop && e.loopCreate(),
                        e.updateSize(),
                        e.updateSlides(),
                        e.params.watchOverflow && e.checkOverflow(),
                        e.params.grabCursor && e.setGrabCursor(),
                        e.params.preloadImages && e.preloadImages(),
                        e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit),
                        e.attachEvents(),
                        e.initialized = !0,
                        e.emit("init"))
                }
                ,
                h.prototype.destroy = function (e, t) {
                    void 0 === e && (e = !0),
                        void 0 === t && (t = !0);
                    var a = this
                        , i = a.params
                        , s = a.$el
                        , r = a.$wrapperEl
                        , n = a.slides;
                    return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"),
                        a.initialized = !1,
                        a.detachEvents(),
                        i.loop && a.loopDestroy(),
                        t && (a.removeClasses(),
                            s.removeAttr("style"),
                            r.removeAttr("style"),
                            n && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")),
                        a.emit("destroy"),
                        Object.keys(a.eventsListeners).forEach(function (e) {
                            a.off(e)
                        }),
                        !1 !== e && (a.$el[0].swiper = null,
                            a.$el.data("swiper", null),
                            ee.deleteProps(a)),
                        a.destroyed = !0),
                        null
                }
                ,
                h.extendDefaults = function (e) {
                    ee.extend(x, e)
                }
                ,
                e.extendedDefaults.get = function () {
                    return x
                }
                ,
                e.defaults.get = function () {
                    return w
                }
                ,
                e.Class.get = function () {
                    return u
                }
                ,
                e.$.get = function () {
                    return L
                }
                ,
                Object.defineProperties(h, e),
                h
        }(n)
        , E = {
            name: "device",
            proto: {
                device: g
            },
            static: {
                device: g
            }
        }
        , S = {
            name: "support",
            proto: {
                support: te
            },
            static: {
                support: te
            }
        }
        , C = {
            name: "browser",
            proto: {
                browser: I
            },
            static: {
                browser: I
            }
        }
        , M = {
            name: "resize",
            create: function () {
                var e = this;
                ee.extend(e, {
                    resize: {
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"),
                                e.emit("resize"))
                        },
                        orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function () {
                    J.addEventListener("resize", this.resize.resizeHandler),
                        J.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                },
                destroy: function () {
                    J.removeEventListener("resize", this.resize.resizeHandler),
                        J.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        }
        , z = {
            func: J.MutationObserver || J.WebkitMutationObserver,
            attach: function (e, t) {
                void 0 === t && (t = {});
                var a = this
                    , i = new z.func(function (e) {
                        if (1 !== e.length) {
                            var t = function () {
                                a.emit("observerUpdate", e[0])
                            };
                            J.requestAnimationFrame ? J.requestAnimationFrame(t) : J.setTimeout(t, 0)
                        } else
                            a.emit("observerUpdate", e[0])
                    }
                    );
                i.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }),
                    a.observer.observers.push(i)
            },
            init: function () {
                var e = this;
                if (te.observer && e.params.observer) {
                    if (e.params.observeParents)
                        for (var t = e.$el.parents(), a = 0; a < t.length; a += 1)
                            e.observer.attach(t[a]);
                    e.observer.attach(e.$el[0], {
                        childList: e.params.observeSlideChildren
                    }),
                        e.observer.attach(e.$wrapperEl[0], {
                            attributes: !1
                        })
                }
            },
            destroy: function () {
                this.observer.observers.forEach(function (e) {
                    e.disconnect()
                }),
                    this.observer.observers = []
            }
        }
        , P = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            },
            create: function () {
                ee.extend(this, {
                    observer: {
                        init: z.init.bind(this),
                        attach: z.attach.bind(this),
                        destroy: z.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function () {
                    this.observer.init()
                },
                destroy: function () {
                    this.observer.destroy()
                }
            }
        }
        , k = {
            update: function (e) {
                var t = this
                    , a = t.params
                    , i = a.slidesPerView
                    , s = a.slidesPerGroup
                    , r = a.centeredSlides
                    , n = t.params.virtual
                    , o = n.addSlidesBefore
                    , l = n.addSlidesAfter
                    , d = t.virtual
                    , p = d.from
                    , c = d.to
                    , u = d.slides
                    , h = d.slidesGrid
                    , v = d.renderSlide
                    , f = d.offset;
                t.updateActiveIndex();
                var m, g, b, w = t.activeIndex || 0;
                m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top",
                    r ? (g = Math.floor(i / 2) + s + o,
                        b = Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o,
                            b = s + l);
                var y = Math.max((w || 0) - b, 0)
                    , x = Math.min((w || 0) + g, u.length - 1)
                    , T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);
                function E() {
                    t.updateSlides(),
                        t.updateProgress(),
                        t.updateSlidesClasses(),
                        t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (ee.extend(t.virtual, {
                    from: y,
                    to: x,
                    offset: T,
                    slidesGrid: t.slidesGrid
                }),
                    p === y && c === x && !e)
                    return t.slidesGrid !== h && T !== f && t.slides.css(m, T + "px"),
                        void t.updateProgress();
                if (t.params.virtual.renderExternal)
                    return t.params.virtual.renderExternal.call(t, {
                        offset: T,
                        from: y,
                        to: x,
                        slides: function () {
                            for (var e = [], t = y; t <= x; t += 1)
                                e.push(u[t]);
                            return e
                        }()
                    }),
                        void E();
                var S = []
                    , C = [];
                if (e)
                    t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var M = p; M <= c; M += 1)
                        (M < y || x < M) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + M + '"]').remove();
                for (var z = 0; z < u.length; z += 1)
                    y <= z && z <= x && (void 0 === c || e ? C.push(z) : (c < z && C.push(z),
                        z < p && S.push(z)));
                C.forEach(function (e) {
                    t.$wrapperEl.append(v(u[e], e))
                }),
                    S.sort(function (e, t) {
                        return t - e
                    }).forEach(function (e) {
                        t.$wrapperEl.prepend(v(u[e], e))
                    }),
                    t.$wrapperEl.children(".swiper-slide").css(m, T + "px"),
                    E()
            },
            renderSlide: function (e, t) {
                var a = this
                    , i = a.params.virtual;
                if (i.cache && a.virtual.cache[t])
                    return a.virtual.cache[t];
                var s = i.renderSlide ? L(i.renderSlide.call(a, e, t)) : L('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t),
                    i.cache && (a.virtual.cache[t] = s),
                    s
            },
            appendSlide: function (e) {
                if ("object" == typeof e && "length" in e)
                    for (var t = 0; t < e.length; t += 1)
                        e[t] && this.virtual.slides.push(e[t]);
                else
                    this.virtual.slides.push(e);
                this.virtual.update(!0)
            },
            prependSlide: function (e) {
                var t = this
                    , a = t.activeIndex
                    , i = a + 1
                    , s = 1;
                if (Array.isArray(e)) {
                    for (var r = 0; r < e.length; r += 1)
                        e[r] && t.virtual.slides.unshift(e[r]);
                    i = a + e.length,
                        s = e.length
                } else
                    t.virtual.slides.unshift(e);
                if (t.params.virtual.cache) {
                    var n = t.virtual.cache
                        , o = {};
                    Object.keys(n).forEach(function (e) {
                        o[parseInt(e, 10) + s] = n[e]
                    }),
                        t.virtual.cache = o
                }
                t.virtual.update(!0),
                    t.slideTo(i, 0)
            },
            removeSlide: function (e) {
                var t = this;
                if (null != e) {
                    var a = t.activeIndex;
                    if (Array.isArray(e))
                        for (var i = e.length - 1; 0 <= i; i -= 1)
                            t.virtual.slides.splice(e[i], 1),
                                t.params.virtual.cache && delete t.virtual.cache[e[i]],
                                e[i] < a && (a -= 1),
                                a = Math.max(a, 0);
                    else
                        t.virtual.slides.splice(e, 1),
                            t.params.virtual.cache && delete t.virtual.cache[e],
                            e < a && (a -= 1),
                            a = Math.max(a, 0);
                    t.virtual.update(!0),
                        t.slideTo(a, 0)
                }
            },
            removeAllSlides: function () {
                var e = this;
                e.virtual.slides = [],
                    e.params.virtual.cache && (e.virtual.cache = {}),
                    e.virtual.update(!0),
                    e.slideTo(0, 0)
            }
        }
        , $ = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function () {
                var e = this;
                ee.extend(e, {
                    virtual: {
                        update: k.update.bind(e),
                        appendSlide: k.appendSlide.bind(e),
                        prependSlide: k.prependSlide.bind(e),
                        removeSlide: k.removeSlide.bind(e),
                        removeAllSlides: k.removeAllSlides.bind(e),
                        renderSlide: k.renderSlide.bind(e),
                        slides: e.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    if (e.params.virtual.enabled) {
                        e.classNames.push(e.params.containerModifierClass + "virtual");
                        var t = {
                            watchSlidesProgress: !0
                        };
                        ee.extend(e.params, t),
                            ee.extend(e.originalParams, t),
                            e.params.initialSlide || e.virtual.update()
                    }
                },
                setTranslate: function () {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        }
        , D = {
            handle: function (e) {
                var t = this
                    , a = t.rtlTranslate
                    , i = e;
                i.originalEvent && (i = i.originalEvent);
                var s = i.keyCode || i.charCode;
                if (!t.allowSlideNext && (t.isHorizontal() && 39 === s || t.isVertical() && 40 === s))
                    return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && 37 === s || t.isVertical() && 38 === s))
                    return !1;
                if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (37 === s || 39 === s || 38 === s || 40 === s)) {
                        var r = !1;
                        if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length)
                            return;
                        var n = J.innerWidth
                            , o = J.innerHeight
                            , l = t.$el.offset();
                        a && (l.left -= t.$el[0].scrollLeft);
                        for (var d = [[l.left, l.top], [l.left + t.width, l.top], [l.left, l.top + t.height], [l.left + t.width, l.top + t.height]], p = 0; p < d.length; p += 1) {
                            var c = d[p];
                            0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0)
                        }
                        if (!r)
                            return
                    }
                    t.isHorizontal() ? (37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1),
                        (39 === s && !a || 37 === s && a) && t.slideNext(),
                        (37 === s && !a || 39 === s && a) && t.slidePrev()) : (38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1),
                            40 === s && t.slideNext(),
                            38 === s && t.slidePrev()),
                        t.emit("keyPress", s)
                }
            },
            enable: function () {
                this.keyboard.enabled || (L(f).on("keydown", this.keyboard.handle),
                    this.keyboard.enabled = !0)
            },
            disable: function () {
                this.keyboard.enabled && (L(f).off("keydown", this.keyboard.handle),
                    this.keyboard.enabled = !1)
            }
        }
        , O = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0
                }
            },
            create: function () {
                ee.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: D.enable.bind(this),
                        disable: D.disable.bind(this),
                        handle: D.handle.bind(this)
                    }
                })
            },
            on: {
                init: function () {
                    this.params.keyboard.enabled && this.keyboard.enable()
                },
                destroy: function () {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        };
    var A = {
        lastScrollTime: ee.now(),
        event: -1 < J.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function () {
            var e = "onwheel"
                , t = e in f;
            if (!t) {
                var a = f.createElement("div");
                a.setAttribute(e, "return;"),
                    t = "function" == typeof a[e]
            }
            return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature("", "") && (t = f.implementation.hasFeature("Events.wheel", "3.0")),
                t
        }() ? "wheel" : "mousewheel",
        normalize: function (e) {
            var t = 0
                , a = 0
                , i = 0
                , s = 0;
            return "detail" in e && (a = e.detail),
                "wheelDelta" in e && (a = -e.wheelDelta / 120),
                "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120),
                "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a,
                    a = 0),
                i = 10 * t,
                s = 10 * a,
                "deltaY" in e && (s = e.deltaY),
                "deltaX" in e && (i = e.deltaX),
                (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40,
                    s *= 40) : (i *= 800,
                        s *= 800)),
                i && !t && (t = i < 1 ? -1 : 1),
                s && !a && (a = s < 1 ? -1 : 1),
            {
                spinX: t,
                spinY: a,
                pixelX: i,
                pixelY: s
            }
        },
        handleMouseEnter: function () {
            this.mouseEntered = !0
        },
        handleMouseLeave: function () {
            this.mouseEntered = !1
        },
        handle: function (e) {
            var t = e
                , a = this
                , i = a.params.mousewheel;
            if (!a.mouseEntered && !i.releaseOnEdges)
                return !0;
            t.originalEvent && (t = t.originalEvent);
            var s = 0
                , r = a.rtlTranslate ? -1 : 1
                , n = A.normalize(t);
            if (i.forceToAxis)
                if (a.isHorizontal()) {
                    if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY)))
                        return !0;
                    s = n.pixelX * r
                } else {
                    if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX)))
                        return !0;
                    s = n.pixelY
                }
            else
                s = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY;
            if (0 === s)
                return !0;
            if (i.invert && (s = -s),
                a.params.freeMode) {
                a.params.loop && a.loopFix();
                var o = a.getTranslate() + s * i.sensitivity
                    , l = a.isBeginning
                    , d = a.isEnd;
                if (o >= a.minTranslate() && (o = a.minTranslate()),
                    o <= a.maxTranslate() && (o = a.maxTranslate()),
                    a.setTransition(0),
                    a.setTranslate(o),
                    a.updateProgress(),
                    a.updateActiveIndex(),
                    a.updateSlidesClasses(),
                    (!l && a.isBeginning || !d && a.isEnd) && a.updateSlidesClasses(),
                    a.params.freeModeSticky && (clearTimeout(a.mousewheel.timeout),
                        a.mousewheel.timeout = ee.nextTick(function () {
                            a.slideToClosest()
                        }, 300)),
                    a.emit("scroll", t),
                    a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(),
                    o === a.minTranslate() || o === a.maxTranslate())
                    return !0
            } else {
                if (60 < ee.now() - a.mousewheel.lastScrollTime)
                    if (s < 0)
                        if (a.isEnd && !a.params.loop || a.animating) {
                            if (i.releaseOnEdges)
                                return !0
                        } else
                            a.slideNext(),
                                a.emit("scroll", t);
                    else if (a.isBeginning && !a.params.loop || a.animating) {
                        if (i.releaseOnEdges)
                            return !0
                    } else
                        a.slidePrev(),
                            a.emit("scroll", t);
                a.mousewheel.lastScrollTime = (new J.Date).getTime()
            }
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
                !1
        },
        enable: function () {
            var e = this;
            if (!A.event)
                return !1;
            if (e.mousewheel.enabled)
                return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)),
                t.on("mouseenter", e.mousewheel.handleMouseEnter),
                t.on("mouseleave", e.mousewheel.handleMouseLeave),
                t.on(A.event, e.mousewheel.handle),
                e.mousewheel.enabled = !0
        },
        disable: function () {
            var e = this;
            if (!A.event)
                return !1;
            if (!e.mousewheel.enabled)
                return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)),
                t.off(A.event, e.mousewheel.handle),
                !(e.mousewheel.enabled = !1)
        }
    }
        , H = {
            update: function () {
                var e = this
                    , t = e.params.navigation;
                if (!e.params.loop) {
                    var a = e.navigation
                        , i = a.$nextEl
                        , s = a.$prevEl;
                    s && 0 < s.length && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass),
                        s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)),
                        i && 0 < i.length && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass),
                            i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
                }
            },
            onPrevClick: function (e) {
                e.preventDefault(),
                    this.isBeginning && !this.params.loop || this.slidePrev()
            },
            onNextClick: function (e) {
                e.preventDefault(),
                    this.isEnd && !this.params.loop || this.slideNext()
            },
            init: function () {
                var e, t, a = this, i = a.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = L(i.nextEl),
                    a.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))),
                    i.prevEl && (t = L(i.prevEl),
                        a.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))),
                    e && 0 < e.length && e.on("click", a.navigation.onNextClick),
                    t && 0 < t.length && t.on("click", a.navigation.onPrevClick),
                    ee.extend(a.navigation, {
                        $nextEl: e,
                        nextEl: e && e[0],
                        $prevEl: t,
                        prevEl: t && t[0]
                    }))
            },
            destroy: function () {
                var e = this
                    , t = e.navigation
                    , a = t.$nextEl
                    , i = t.$prevEl;
                a && a.length && (a.off("click", e.navigation.onNextClick),
                    a.removeClass(e.params.navigation.disabledClass)),
                    i && i.length && (i.off("click", e.navigation.onPrevClick),
                        i.removeClass(e.params.navigation.disabledClass))
            }
        }
        , N = {
            update: function () {
                var e = this
                    , t = e.rtl
                    , s = e.params.pagination;
                if (s.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var r, a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, i = e.pagination.$el, n = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides),
                        n - 1 < r && (r -= n),
                        r < 0 && "bullets" !== e.params.paginationType && (r = n + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0,
                        "bullets" === s.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                        var o, l, d, p = e.pagination.bullets;
                        if (s.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0),
                            i.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"),
                            1 < s.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex,
                                e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = s.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)),
                            o = r - e.pagination.dynamicBulletIndex,
                            d = ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) + o) / 2),
                            p.removeClass(s.bulletActiveClass + " " + s.bulletActiveClass + "-next " + s.bulletActiveClass + "-next-next " + s.bulletActiveClass + "-prev " + s.bulletActiveClass + "-prev-prev " + s.bulletActiveClass + "-main"),
                            1 < i.length)
                            p.each(function (e, t) {
                                var a = L(t)
                                    , i = a.index();
                                i === r && a.addClass(s.bulletActiveClass),
                                    s.dynamicBullets && (o <= i && i <= l && a.addClass(s.bulletActiveClass + "-main"),
                                        i === o && a.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"),
                                        i === l && a.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next"))
                            });
                        else if (p.eq(r).addClass(s.bulletActiveClass),
                            s.dynamicBullets) {
                            for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1)
                                p.eq(h).addClass(s.bulletActiveClass + "-main");
                            c.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"),
                                u.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next")
                        }
                        if (s.dynamicBullets) {
                            var v = Math.min(p.length, s.dynamicMainBullets + 4)
                                , f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize
                                , m = t ? "right" : "left";
                            p.css(e.isHorizontal() ? m : "top", f + "px")
                        }
                    }
                    if ("fraction" === s.type && (i.find("." + s.currentClass).text(s.formatFractionCurrent(r + 1)),
                        i.find("." + s.totalClass).text(s.formatFractionTotal(n))),
                        "progressbar" === s.type) {
                        var g;
                        g = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        var b = (r + 1) / n
                            , w = 1
                            , y = 1;
                        "horizontal" === g ? w = b : y = b,
                            i.find("." + s.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed)
                    }
                    "custom" === s.type && s.renderCustom ? (i.html(s.renderCustom(e, r + 1, n)),
                        e.emit("paginationRender", e, i[0])) : e.emit("paginationUpdate", e, i[0]),
                        i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](s.lockClass)
                }
            },
            render: function () {
                var e = this
                    , t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length
                        , i = e.pagination.$el
                        , s = "";
                    if ("bullets" === t.type) {
                        for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1)
                            t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        i.html(s),
                            e.pagination.bullets = i.find("." + t.bulletClass)
                    }
                    "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>',
                        i.html(s)),
                        "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>',
                            i.html(s)),
                        "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function () {
                var a = this
                    , e = a.params.pagination;
                if (e.el) {
                    var t = L(e.el);
                    0 !== t.length && (a.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === a.$el.find(e.el).length && (t = a.$el.find(e.el)),
                        "bullets" === e.type && e.clickable && t.addClass(e.clickableClass),
                        t.addClass(e.modifierClass + e.type),
                        "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"),
                            a.pagination.dynamicBulletIndex = 0,
                            e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                        "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass),
                        e.clickable && t.on("click", "." + e.bulletClass, function (e) {
                            e.preventDefault();
                            var t = L(this).index() * a.params.slidesPerGroup;
                            a.params.loop && (t += a.loopedSlides),
                                a.slideTo(t)
                        }),
                        ee.extend(a.pagination, {
                            $el: t,
                            el: t[0]
                        }))
                }
            },
            destroy: function () {
                var e = this
                    , t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.pagination.$el;
                    a.removeClass(t.hiddenClass),
                        a.removeClass(t.modifierClass + t.type),
                        e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass),
                        t.clickable && a.off("click", "." + t.bulletClass)
                }
            }
        }
        , G = {
            setTranslate: function () {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar
                        , a = e.rtlTranslate
                        , i = e.progress
                        , s = t.dragSize
                        , r = t.trackSize
                        , n = t.$dragEl
                        , o = t.$el
                        , l = e.params.scrollbar
                        , d = s
                        , p = (r - s) * i;
                    a ? 0 < (p = -p) ? (d = s - p,
                        p = 0) : r < -p + s && (d = r + p) : p < 0 ? (d = s + p,
                            p = 0) : r < p + s && (d = r - p),
                        e.isHorizontal() ? (te.transforms3d ? n.transform("translate3d(" + p + "px, 0, 0)") : n.transform("translateX(" + p + "px)"),
                            n[0].style.width = d + "px") : (te.transforms3d ? n.transform("translate3d(0px, " + p + "px, 0)") : n.transform("translateY(" + p + "px)"),
                                n[0].style.height = d + "px"),
                        l.hide && (clearTimeout(e.scrollbar.timeout),
                            o[0].style.opacity = 1,
                            e.scrollbar.timeout = setTimeout(function () {
                                o[0].style.opacity = 0,
                                    o.transition(400)
                            }, 1e3))
                }
            },
            setTransition: function (e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
            },
            updateSize: function () {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar
                        , a = t.$dragEl
                        , i = t.$el;
                    a[0].style.width = "",
                        a[0].style.height = "";
                    var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, n = e.size / e.virtualSize, o = n * (r / e.size);
                    s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10),
                        e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px",
                        i[0].style.display = 1 <= n ? "none" : "",
                        e.params.scrollbar.hide && (i[0].style.opacity = 0),
                        ee.extend(t, {
                            trackSize: r,
                            divider: n,
                            moveDivider: o,
                            dragSize: s
                        }),
                        t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
                }
            },
            setDragPosition: function (e) {
                var t, a = this, i = a.scrollbar, s = a.rtlTranslate, r = i.$el, n = i.dragSize, o = i.trackSize;
                t = ((a.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - r.offset()[a.isHorizontal() ? "left" : "top"] - n / 2) / (o - n),
                    t = Math.max(Math.min(t, 1), 0),
                    s && (t = 1 - t);
                var l = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
                a.updateProgress(l),
                    a.setTranslate(l),
                    a.updateActiveIndex(),
                    a.updateSlidesClasses()
            },
            onDragStart: function (e) {
                var t = this
                    , a = t.params.scrollbar
                    , i = t.scrollbar
                    , s = t.$wrapperEl
                    , r = i.$el
                    , n = i.$dragEl;
                t.scrollbar.isTouched = !0,
                    e.preventDefault(),
                    e.stopPropagation(),
                    s.transition(100),
                    n.transition(100),
                    i.setDragPosition(e),
                    clearTimeout(t.scrollbar.dragTimeout),
                    r.transition(0),
                    a.hide && r.css("opacity", 1),
                    t.emit("scrollbarDragStart", e)
            },
            onDragMove: function (e) {
                var t = this.scrollbar
                    , a = this.$wrapperEl
                    , i = t.$el
                    , s = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
                    t.setDragPosition(e),
                    a.transition(0),
                    i.transition(0),
                    s.transition(0),
                    this.emit("scrollbarDragMove", e))
            },
            onDragEnd: function (e) {
                var t = this
                    , a = t.params.scrollbar
                    , i = t.scrollbar.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1,
                    a.hide && (clearTimeout(t.scrollbar.dragTimeout),
                        t.scrollbar.dragTimeout = ee.nextTick(function () {
                            i.css("opacity", 0),
                                i.transition(400)
                        }, 1e3)),
                    t.emit("scrollbarDragEnd", e),
                    a.snapOnRelease && t.slideToClosest())
            },
            enableDraggable: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar
                        , a = e.touchEventsTouch
                        , i = e.touchEventsDesktop
                        , s = e.params
                        , r = t.$el[0]
                        , n = !(!te.passiveListener || !s.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        }
                        , o = !(!te.passiveListener || !s.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    te.touch ? (r.addEventListener(a.start, e.scrollbar.onDragStart, n),
                        r.addEventListener(a.move, e.scrollbar.onDragMove, n),
                        r.addEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.addEventListener(i.start, e.scrollbar.onDragStart, n),
                            f.addEventListener(i.move, e.scrollbar.onDragMove, n),
                            f.addEventListener(i.end, e.scrollbar.onDragEnd, o))
                }
            },
            disableDraggable: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar
                        , a = e.touchEventsTouch
                        , i = e.touchEventsDesktop
                        , s = e.params
                        , r = t.$el[0]
                        , n = !(!te.passiveListener || !s.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        }
                        , o = !(!te.passiveListener || !s.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    te.touch ? (r.removeEventListener(a.start, e.scrollbar.onDragStart, n),
                        r.removeEventListener(a.move, e.scrollbar.onDragMove, n),
                        r.removeEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n),
                            f.removeEventListener(i.move, e.scrollbar.onDragMove, n),
                            f.removeEventListener(i.end, e.scrollbar.onDragEnd, o))
                }
            },
            init: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar
                        , a = e.$el
                        , i = e.params.scrollbar
                        , s = L(i.el);
                    e.params.uniqueNavElements && "string" == typeof i.el && 1 < s.length && 1 === a.find(i.el).length && (s = a.find(i.el));
                    var r = s.find("." + e.params.scrollbar.dragClass);
                    0 === r.length && (r = L('<div class="' + e.params.scrollbar.dragClass + '"></div>'),
                        s.append(r)),
                        ee.extend(t, {
                            $el: s,
                            el: s[0],
                            $dragEl: r,
                            dragEl: r[0]
                        }),
                        i.draggable && t.enableDraggable()
                }
            },
            destroy: function () {
                this.scrollbar.disableDraggable()
            }
        }
        , B = {
            setTransform: function (e, t) {
                var a = this.rtl
                    , i = L(e)
                    , s = a ? -1 : 1
                    , r = i.attr("data-swiper-parallax") || "0"
                    , n = i.attr("data-swiper-parallax-x")
                    , o = i.attr("data-swiper-parallax-y")
                    , l = i.attr("data-swiper-parallax-scale")
                    , d = i.attr("data-swiper-parallax-opacity");
                if (n || o ? (n = n || "0",
                    o = o || "0") : this.isHorizontal() ? (n = r,
                        o = "0") : (o = r,
                            n = "0"),
                    n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * s + "%" : n * t * s + "px",
                    o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px",
                    null != d) {
                    var p = d - (d - 1) * (1 - Math.abs(t));
                    i[0].style.opacity = p
                }
                if (null == l)
                    i.transform("translate3d(" + n + ", " + o + ", 0px)");
                else {
                    var c = l - (l - 1) * (1 - Math.abs(t));
                    i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")")
                }
            },
            setTranslate: function () {
                var i = this
                    , e = i.$el
                    , t = i.slides
                    , s = i.progress
                    , r = i.snapGrid;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, t) {
                    i.parallax.setTransform(t, s)
                }),
                    t.each(function (e, t) {
                        var a = t.progress;
                        1 < i.params.slidesPerGroup && "auto" !== i.params.slidesPerView && (a += Math.ceil(e / 2) - s * (r.length - 1)),
                            a = Math.min(Math.max(a, -1), 1),
                            L(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, t) {
                                i.parallax.setTransform(t, a)
                            })
                    })
            },
            setTransition: function (s) {
                void 0 === s && (s = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, t) {
                    var a = L(t)
                        , i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
                    0 === s && (i = 0),
                        a.transition(i)
                })
            }
        }
        , X = {
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2)
                    return 1;
                var t = e.targetTouches[0].pageX
                    , a = e.targetTouches[0].pageY
                    , i = e.targetTouches[1].pageX
                    , s = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
            },
            onGestureStart: function (e) {
                var t = this
                    , a = t.params.zoom
                    , i = t.zoom
                    , s = i.gesture;
                if (i.fakeGestureTouched = !1,
                    i.fakeGestureMoved = !1,
                    !te.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                        return;
                    i.fakeGestureTouched = !0,
                        s.scaleStart = X.getDistanceBetweenTouches(e)
                }
                s.$slideEl && s.$slideEl.length || (s.$slideEl = L(e.target).closest(".swiper-slide"),
                    0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)),
                    s.$imageEl = s.$slideEl.find("img, svg, canvas"),
                    s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass),
                    s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio,
                    0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0),
                        t.zoom.isScaling = !0) : s.$imageEl = void 0
            },
            onGestureChange: function (e) {
                var t = this.params.zoom
                    , a = this.zoom
                    , i = a.gesture;
                if (!te.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                        return;
                    a.fakeGestureMoved = !0,
                        i.scaleMove = X.getDistanceBetweenTouches(e)
                }
                i.$imageEl && 0 !== i.$imageEl.length && (a.scale = te.gestures ? e.scale * a.currentScale : i.scaleMove / i.scaleStart * a.currentScale,
                    a.scale > i.maxRatio && (a.scale = i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, .5)),
                    a.scale < t.minRatio && (a.scale = t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, .5)),
                    i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
            },
            onGestureEnd: function (e) {
                var t = this.params.zoom
                    , a = this.zoom
                    , i = a.gesture;
                if (!te.gestures) {
                    if (!a.fakeGestureTouched || !a.fakeGestureMoved)
                        return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !g.android)
                        return;
                    a.fakeGestureTouched = !1,
                        a.fakeGestureMoved = !1
                }
                i.$imageEl && 0 !== i.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio),
                    i.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"),
                    a.currentScale = a.scale,
                    a.isScaling = !1,
                    1 === a.scale && (i.$slideEl = void 0))
            },
            onTouchStart: function (e) {
                var t = this.zoom
                    , a = t.gesture
                    , i = t.image;
                a.$imageEl && 0 !== a.$imageEl.length && (i.isTouched || (g.android && e.preventDefault(),
                    i.isTouched = !0,
                    i.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                    i.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function (e) {
                var t = this
                    , a = t.zoom
                    , i = a.gesture
                    , s = a.image
                    , r = a.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1,
                    s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth,
                        s.height = i.$imageEl[0].offsetHeight,
                        s.startX = ee.getTranslate(i.$imageWrapEl[0], "x") || 0,
                        s.startY = ee.getTranslate(i.$imageWrapEl[0], "y") || 0,
                        i.slideWidth = i.$slideEl[0].offsetWidth,
                        i.slideHeight = i.$slideEl[0].offsetHeight,
                        i.$imageWrapEl.transition(0),
                        t.rtl && (s.startX = -s.startX,
                            s.startY = -s.startY));
                    var n = s.width * a.scale
                        , o = s.height * a.scale;
                    if (!(n < i.slideWidth && o < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0),
                            s.maxX = -s.minX,
                            s.minY = Math.min(i.slideHeight / 2 - o / 2, 0),
                            s.maxY = -s.minY,
                            s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                            s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                            !s.isMoved && !a.isScaling) {
                            if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x))
                                return void (s.isTouched = !1);
                            if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y))
                                return void (s.isTouched = !1)
                        }
                        e.preventDefault(),
                            e.stopPropagation(),
                            s.isMoved = !0,
                            s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX,
                            s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY,
                            s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)),
                            s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)),
                            s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)),
                            s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)),
                            r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x),
                            r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y),
                            r.prevTime || (r.prevTime = Date.now()),
                            r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2,
                            r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2,
                            Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0),
                            Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0),
                            r.prevPositionX = s.touchesCurrent.x,
                            r.prevPositionY = s.touchesCurrent.y,
                            r.prevTime = Date.now(),
                            i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function () {
                var e = this.zoom
                    , t = e.gesture
                    , a = e.image
                    , i = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!a.isTouched || !a.isMoved)
                        return a.isTouched = !1,
                            void (a.isMoved = !1);
                    a.isTouched = !1,
                        a.isMoved = !1;
                    var s = 300
                        , r = 300
                        , n = i.x * s
                        , o = a.currentX + n
                        , l = i.y * r
                        , d = a.currentY + l;
                    0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)),
                        0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
                    var p = Math.max(s, r);
                    a.currentX = o,
                        a.currentY = d;
                    var c = a.width * e.scale
                        , u = a.height * e.scale;
                    a.minX = Math.min(t.slideWidth / 2 - c / 2, 0),
                        a.maxX = -a.minX,
                        a.minY = Math.min(t.slideHeight / 2 - u / 2, 0),
                        a.maxY = -a.minY,
                        a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX),
                        a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY),
                        t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
                }
            },
            onTransitionEnd: function () {
                var e = this.zoom
                    , t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
                    t.$imageWrapEl.transform("translate3d(0,0,0)"),
                    e.scale = 1,
                    e.currentScale = 1,
                    t.$slideEl = void 0,
                    t.$imageEl = void 0,
                    t.$imageWrapEl = void 0)
            },
            toggle: function (e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function (e) {
                var t, a, i, s, r, n, o, l, d, p, c, u, h, v, f, m, g = this, b = g.zoom, w = g.params.zoom, y = b.gesture, x = b.image;
                (y.$slideEl || (y.$slideEl = g.clickedSlide ? L(g.clickedSlide) : g.slides.eq(g.activeIndex),
                    y.$imageEl = y.$slideEl.find("img, svg, canvas"),
                    y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)),
                    y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass),
                        void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX,
                            a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x,
                                a = x.touchesStart.y),
                        b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio,
                        b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio,
                        e ? (f = y.$slideEl[0].offsetWidth,
                            m = y.$slideEl[0].offsetHeight,
                            i = y.$slideEl.offset().left + f / 2 - t,
                            s = y.$slideEl.offset().top + m / 2 - a,
                            o = y.$imageEl[0].offsetWidth,
                            l = y.$imageEl[0].offsetHeight,
                            d = o * b.scale,
                            p = l * b.scale,
                            h = -(c = Math.min(f / 2 - d / 2, 0)),
                            v = -(u = Math.min(m / 2 - p / 2, 0)),
                            (r = i * b.scale) < c && (r = c),
                            h < r && (r = h),
                            (n = s * b.scale) < u && (n = u),
                            v < n && (n = v)) : n = r = 0,
                        y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"),
                        y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
            },
            out: function () {
                var e = this
                    , t = e.zoom
                    , a = e.params.zoom
                    , i = t.gesture;
                i.$slideEl || (i.$slideEl = e.clickedSlide ? L(e.clickedSlide) : e.slides.eq(e.activeIndex),
                    i.$imageEl = i.$slideEl.find("img, svg, canvas"),
                    i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)),
                    i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1,
                        t.currentScale = 1,
                        i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
                        i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
                        i.$slideEl.removeClass("" + a.zoomedSlideClass),
                        i.$slideEl = void 0)
            },
            enable: function () {
                var e = this
                    , t = e.zoom;
                if (!t.enabled) {
                    t.enabled = !0;
                    var a = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    te.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, a),
                        e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, a),
                        e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a),
                            e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a),
                            e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)),
                        e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            },
            disable: function () {
                var e = this
                    , t = e.zoom;
                if (t.enabled) {
                    e.zoom.enabled = !1;
                    var a = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    te.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, a),
                        e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, a),
                        e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a),
                            e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a),
                            e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)),
                        e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            }
        }
        , Y = {
            loadInSlide: function (e, l) {
                void 0 === l && (l = !0);
                var d = this
                    , p = d.params.lazy;
                if (void 0 !== e && 0 !== d.slides.length) {
                    var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e)
                        , t = c.find("." + p.elementClass + ":not(." + p.loadedClass + "):not(." + p.loadingClass + ")");
                    !c.hasClass(p.elementClass) || c.hasClass(p.loadedClass) || c.hasClass(p.loadingClass) || (t = t.add(c[0])),
                        0 !== t.length && t.each(function (e, t) {
                            var i = L(t);
                            i.addClass(p.loadingClass);
                            var s = i.attr("data-background")
                                , r = i.attr("data-src")
                                , n = i.attr("data-srcset")
                                , o = i.attr("data-sizes");
                            d.loadImage(i[0], r || s, n, o, !1, function () {
                                if (null != d && d && (!d || d.params) && !d.destroyed) {
                                    if (s ? (i.css("background-image", 'url("' + s + '")'),
                                        i.removeAttr("data-background")) : (n && (i.attr("srcset", n),
                                            i.removeAttr("data-srcset")),
                                            o && (i.attr("sizes", o),
                                                i.removeAttr("data-sizes")),
                                            r && (i.attr("src", r),
                                                i.removeAttr("data-src"))),
                                        i.addClass(p.loadedClass).removeClass(p.loadingClass),
                                        c.find("." + p.preloaderClass).remove(),
                                        d.params.loop && l) {
                                        var e = c.attr("data-swiper-slide-index");
                                        if (c.hasClass(d.params.slideDuplicateClass)) {
                                            var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                            d.lazy.loadInSlide(t.index(), !1)
                                        } else {
                                            var a = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                            d.lazy.loadInSlide(a.index(), !1)
                                        }
                                    }
                                    d.emit("lazyImageReady", c[0], i[0])
                                }
                            }),
                                d.emit("lazyImageLoad", c[0], i[0])
                        })
                }
            },
            load: function () {
                var i = this
                    , t = i.$wrapperEl
                    , a = i.params
                    , s = i.slides
                    , e = i.activeIndex
                    , r = i.virtual && a.virtual.enabled
                    , n = a.lazy
                    , o = a.slidesPerView;
                function l(e) {
                    if (r) {
                        if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length)
                            return !0
                    } else if (s[e])
                        return !0;
                    return !1
                }
                function d(e) {
                    return r ? L(e).attr("data-swiper-slide-index") : L(e).index()
                }
                if ("auto" === o && (o = 0),
                    i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0),
                    i.params.watchSlidesVisibility)
                    t.children("." + a.slideVisibleClass).each(function (e, t) {
                        var a = r ? L(t).attr("data-swiper-slide-index") : L(t).index();
                        i.lazy.loadInSlide(a)
                    });
                else if (1 < o)
                    for (var p = e; p < e + o; p += 1)
                        l(p) && i.lazy.loadInSlide(p);
                else
                    i.lazy.loadInSlide(e);
                if (n.loadPrevNext)
                    if (1 < o || n.loadPrevNextAmount && 1 < n.loadPrevNextAmount) {
                        for (var c = n.loadPrevNextAmount, u = o, h = Math.min(e + u + Math.max(c, u), s.length), v = Math.max(e - Math.max(u, c), 0), f = e + o; f < h; f += 1)
                            l(f) && i.lazy.loadInSlide(f);
                        for (var m = v; m < e; m += 1)
                            l(m) && i.lazy.loadInSlide(m)
                    } else {
                        var g = t.children("." + a.slideNextClass);
                        0 < g.length && i.lazy.loadInSlide(d(g));
                        var b = t.children("." + a.slidePrevClass);
                        0 < b.length && i.lazy.loadInSlide(d(b))
                    }
            }
        }
        , V = {
            LinearSpline: function (e, t) {
                var a, i, s, r, n, o = function (e, t) {
                    for (i = -1,
                        a = e.length; 1 < a - i;)
                        e[s = a + i >> 1] <= t ? i = s : a = s;
                    return a
                };
                return this.x = e,
                    this.y = t,
                    this.lastIndex = e.length - 1,
                    this.interpolate = function (e) {
                        return e ? (n = o(this.x, e),
                            r = n - 1,
                            (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
                    }
                    ,
                    this
            },
            getInterpolateFunction: function (e) {
                var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new V.LinearSpline(t.slidesGrid, e.slidesGrid) : new V.LinearSpline(t.snapGrid, e.snapGrid))
            },
            setTranslate: function (e, t) {
                var a, i, s = this, r = s.controller.control;
                function n(e) {
                    var t = s.rtlTranslate ? -s.translate : s.translate;
                    "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e),
                        i = -s.controller.spline.interpolate(-t)),
                        i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()),
                            i = (t - s.minTranslate()) * a + e.minTranslate()),
                        s.params.controller.inverse && (i = e.maxTranslate() - i),
                        e.updateProgress(i),
                        e.setTranslate(i, s),
                        e.updateActiveIndex(),
                        e.updateSlidesClasses()
                }
                if (Array.isArray(r))
                    for (var o = 0; o < r.length; o += 1)
                        r[o] !== t && r[o] instanceof T && n(r[o]);
                else
                    r instanceof T && t !== r && n(r)
            },
            setTransition: function (t, e) {
                var a, i = this, s = i.controller.control;
                function r(e) {
                    e.setTransition(t, i),
                        0 !== t && (e.transitionStart(),
                            e.params.autoHeight && ee.nextTick(function () {
                                e.updateAutoHeight()
                            }),
                            e.$wrapperEl.transitionEnd(function () {
                                s && (e.params.loop && "slide" === i.params.controller.by && e.loopFix(),
                                    e.transitionEnd())
                            }))
                }
                if (Array.isArray(s))
                    for (a = 0; a < s.length; a += 1)
                        s[a] !== e && s[a] instanceof T && r(s[a]);
                else
                    s instanceof T && e !== s && r(s)
            }
        }
        , F = {
            makeElFocusable: function (e) {
                return e.attr("tabIndex", "0"),
                    e
            },
            addElRole: function (e, t) {
                return e.attr("role", t),
                    e
            },
            addElLabel: function (e, t) {
                return e.attr("aria-label", t),
                    e
            },
            disableEl: function (e) {
                return e.attr("aria-disabled", !0),
                    e
            },
            enableEl: function (e) {
                return e.attr("aria-disabled", !1),
                    e
            },
            onEnterKey: function (e) {
                var t = this
                    , a = t.params.a11y;
                if (13 === e.keyCode) {
                    var i = L(e.target);
                    t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(),
                        t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)),
                        t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(),
                            t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)),
                        t.pagination && i.is("." + t.params.pagination.bulletClass) && i[0].click()
                }
            },
            notify: function (e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""),
                    t.html(e))
            },
            updateNavigation: function () {
                var e = this;
                if (!e.params.loop) {
                    var t = e.navigation
                        , a = t.$nextEl
                        , i = t.$prevEl;
                    i && 0 < i.length && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)),
                        a && 0 < a.length && (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a))
                }
            },
            updatePagination: function () {
                var i = this
                    , s = i.params.a11y;
                i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function (e, t) {
                    var a = L(t);
                    i.a11y.makeElFocusable(a),
                        i.a11y.addElRole(a, "button"),
                        i.a11y.addElLabel(a, s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                })
            },
            init: function () {
                var e = this;
                e.$el.append(e.a11y.liveRegion);
                var t, a, i = e.params.a11y;
                e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
                    e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl),
                    t && (e.a11y.makeElFocusable(t),
                        e.a11y.addElRole(t, "button"),
                        e.a11y.addElLabel(t, i.nextSlideMessage),
                        t.on("keydown", e.a11y.onEnterKey)),
                    a && (e.a11y.makeElFocusable(a),
                        e.a11y.addElRole(a, "button"),
                        e.a11y.addElLabel(a, i.prevSlideMessage),
                        a.on("keydown", e.a11y.onEnterKey)),
                    e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
            },
            destroy: function () {
                var e, t, a = this;
                a.a11y.liveRegion && 0 < a.a11y.liveRegion.length && a.a11y.liveRegion.remove(),
                    a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl),
                    a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl),
                    e && e.off("keydown", a.a11y.onEnterKey),
                    t && t.off("keydown", a.a11y.onEnterKey),
                    a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass, a.a11y.onEnterKey)
            }
        }
        , R = {
            init: function () {
                var e = this;
                if (e.params.history) {
                    if (!J.history || !J.history.pushState)
                        return e.params.history.enabled = !1,
                            void (e.params.hashNavigation.enabled = !0);
                    var t = e.history;
                    t.initialized = !0,
                        t.paths = R.getPathValues(),
                        (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit),
                            e.params.history.replaceState || J.addEventListener("popstate", e.history.setHistoryPopState))
                }
            },
            destroy: function () {
                this.params.history.replaceState || J.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function () {
                this.history.paths = R.getPathValues(),
                    this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
            },
            getPathValues: function () {
                var e = J.location.pathname.slice(1).split("/").filter(function (e) {
                    return "" !== e
                })
                    , t = e.length;
                return {
                    key: e[t - 2],
                    value: e[t - 1]
                }
            },
            setHistory: function (e, t) {
                if (this.history.initialized && this.params.history.enabled) {
                    var a = this.slides.eq(t)
                        , i = R.slugify(a.attr("data-history"));
                    J.location.pathname.includes(e) || (i = e + "/" + i);
                    var s = J.history.state;
                    s && s.value === i || (this.params.history.replaceState ? J.history.replaceState({
                        value: i
                    }, null, i) : J.history.pushState({
                        value: i
                    }, null, i))
                }
            },
            slugify: function (e) {
                return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function (e, t, a) {
                var i = this;
                if (t)
                    for (var s = 0, r = i.slides.length; s < r; s += 1) {
                        var n = i.slides.eq(s);
                        if (R.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
                            var o = n.index();
                            i.slideTo(o, e, a)
                        }
                    }
                else
                    i.slideTo(0, e, a)
            }
        }
        , q = {
            onHashCange: function () {
                var e = this
                    , t = f.location.hash.replace("#", "");
                if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                    var a = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index();
                    if (void 0 === a)
                        return;
                    e.slideTo(a)
                }
            },
            setHash: function () {
                var e = this;
                if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                    if (e.params.hashNavigation.replaceState && J.history && J.history.replaceState)
                        J.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
                    else {
                        var t = e.slides.eq(e.activeIndex)
                            , a = t.attr("data-hash") || t.attr("data-history");
                        f.location.hash = a || ""
                    }
            },
            init: function () {
                var e = this;
                if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                    e.hashNavigation.initialized = !0;
                    var t = f.location.hash.replace("#", "");
                    if (t)
                        for (var a = 0, i = e.slides.length; a < i; a += 1) {
                            var s = e.slides.eq(a);
                            if ((s.attr("data-hash") || s.attr("data-history")) === t && !s.hasClass(e.params.slideDuplicateClass)) {
                                var r = s.index();
                                e.slideTo(r, 0, e.params.runCallbacksOnInit, !0)
                            }
                        }
                    e.params.hashNavigation.watchState && L(J).on("hashchange", e.hashNavigation.onHashCange)
                }
            },
            destroy: function () {
                this.params.hashNavigation.watchState && L(J).off("hashchange", this.hashNavigation.onHashCange)
            }
        }
        , W = {
            run: function () {
                var e = this
                    , t = e.slides.eq(e.activeIndex)
                    , a = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
                    e.autoplay.timeout = ee.nextTick(function () {
                        e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(),
                            e.slidePrev(e.params.speed, !0, !0),
                            e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                                e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0),
                                    e.emit("autoplay")) : e.params.loop ? (e.loopFix(),
                                        e.slideNext(e.params.speed, !0, !0),
                                        e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0),
                                            e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0),
                                                e.emit("autoplay"))
                    }, a)
            },
            start: function () {
                var e = this;
                return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0,
                    e.emit("autoplayStart"),
                    e.autoplay.run(),
                    !0))
            },
            stop: function () {
                var e = this;
                return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout),
                    e.autoplay.timeout = void 0),
                    e.autoplay.running = !1,
                    e.emit("autoplayStop"),
                    !0))
            },
            pause: function (e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
                    t.autoplay.paused = !0,
                    0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd),
                        t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1,
                            t.autoplay.run())))
            }
        }
        , j = {
            setTranslate: function () {
                for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                    var i = e.slides.eq(a)
                        , s = -i[0].swiperSlideOffset;
                    e.params.virtualTranslate || (s -= e.translate);
                    var r = 0;
                    e.isHorizontal() || (r = s,
                        s = 0);
                    var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({
                        opacity: n
                    }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
                }
            },
            setTransition: function (e) {
                var a = this
                    , t = a.slides
                    , i = a.$wrapperEl;
                if (t.transition(e),
                    a.params.virtualTranslate && 0 !== e) {
                    var s = !1;
                    t.transitionEnd(function () {
                        if (!s && a && !a.destroyed) {
                            s = !0,
                                a.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1)
                                i.trigger(e[t])
                        }
                    })
                }
            }
        }
        , U = {
            setTranslate: function () {
                var e, t = this, a = t.$el, i = t.$wrapperEl, s = t.slides, r = t.width, n = t.height, o = t.rtlTranslate, l = t.size, d = t.params.cubeEffect, p = t.isHorizontal(), c = t.virtual && t.params.virtual.enabled, u = 0;
                d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'),
                    i.append(e)),
                    e.css({
                        height: r + "px"
                    })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'),
                        a.append(e)));
                for (var h = 0; h < s.length; h += 1) {
                    var v = s.eq(h)
                        , f = h;
                    c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                    var m = 90 * f
                        , g = Math.floor(m / 360);
                    o && (m = -m,
                        g = Math.floor(-m / 360));
                    var b = Math.max(Math.min(v[0].progress, 1), -1)
                        , w = 0
                        , y = 0
                        , x = 0;
                    f % 4 == 0 ? (w = 4 * -g * l,
                        x = 0) : (f - 1) % 4 == 0 ? (w = 0,
                            x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l,
                                x = l) : (f - 3) % 4 == 0 && (w = -l,
                                    x = 3 * l + 4 * l * g),
                        o && (w = -w),
                        p || (y = w,
                            w = 0);
                    var T = "rotateX(" + (p ? 0 : -m) + "deg) rotateY(" + (p ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                    if (b <= 1 && -1 < b && (u = 90 * f + 90 * b,
                        o && (u = 90 * -f - 90 * b)),
                        v.transform(T),
                        d.slideShadows) {
                        var E = p ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top")
                            , S = p ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'),
                            v.append(E)),
                            0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'),
                                v.append(S)),
                            E.length && (E[0].style.opacity = Math.max(-b, 0)),
                            S.length && (S[0].style.opacity = Math.max(b, 0))
                    }
                }
                if (i.css({
                    "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                    "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                    "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                    "transform-origin": "50% 50% -" + l / 2 + "px"
                }),
                    d.shadow)
                    if (p)
                        e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else {
                        var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90)
                            , M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2)
                            , z = d.shadowScale
                            , P = d.shadowScale / M
                            , k = d.shadowOffset;
                        e.transform("scale3d(" + z + ", 1, " + P + ") translate3d(0px, " + (n / 2 + k) + "px, " + -n / 2 / P + "px) rotateX(-90deg)")
                    }
                var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)")
            },
            setTransition: function (e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                    this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        }
        , K = {
            setTranslate: function () {
                for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
                    var s = t.eq(i)
                        , r = s[0].progress;
                    e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
                    var n = -180 * r
                        , o = 0
                        , l = -s[0].swiperSlideOffset
                        , d = 0;
                    if (e.isHorizontal() ? a && (n = -n) : (d = l,
                        o = -n,
                        n = l = 0),
                        s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length,
                        e.params.flipEffect.slideShadows) {
                        var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top")
                            , c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                        0 === p.length && (p = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'),
                            s.append(p)),
                            0 === c.length && (c = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'),
                                s.append(c)),
                            p.length && (p[0].style.opacity = Math.max(-r, 0)),
                            c.length && (c[0].style.opacity = Math.max(r, 0))
                    }
                    s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                }
            },
            setTransition: function (e) {
                var a = this
                    , t = a.slides
                    , i = a.activeIndex
                    , s = a.$wrapperEl;
                if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                    a.params.virtualTranslate && 0 !== e) {
                    var r = !1;
                    t.eq(i).transitionEnd(function () {
                        if (!r && a && !a.destroyed) {
                            r = !0,
                                a.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1)
                                s.trigger(e[t])
                        }
                    })
                }
            }
        }
        , _ = {
            setTranslate: function () {
                for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.$wrapperEl, r = e.slidesSizesGrid, n = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : a / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, h = i.length; u < h; u += 1) {
                    var v = i.eq(u)
                        , f = r[u]
                        , m = (d - v[0].swiperSlideOffset - f / 2) / f * n.modifier
                        , g = o ? p * m : 0
                        , b = o ? 0 : p * m
                        , w = -c * Math.abs(m)
                        , y = o ? 0 : n.stretch * m
                        , x = o ? n.stretch * m : 0;
                    Math.abs(x) < .001 && (x = 0),
                        Math.abs(y) < .001 && (y = 0),
                        Math.abs(w) < .001 && (w = 0),
                        Math.abs(g) < .001 && (g = 0),
                        Math.abs(b) < .001 && (b = 0);
                    var T = "translate3d(" + x + "px," + y + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg)";
                    if (v.transform(T),
                        v[0].style.zIndex = 1 - Math.abs(Math.round(m)),
                        n.slideShadows) {
                        var E = o ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top")
                            , S = o ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'),
                            v.append(E)),
                            0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'),
                                v.append(S)),
                            E.length && (E[0].style.opacity = 0 < m ? m : 0),
                            S.length && (S[0].style.opacity = 0 < -m ? -m : 0)
                    }
                }
                (te.pointerEvents || te.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%")
            },
            setTransition: function (e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        }
        , Z = {
            init: function () {
                var e = this
                    , t = e.params.thumbs
                    , a = e.constructor;
                t.swiper instanceof a ? (e.thumbs.swiper = t.swiper,
                    ee.extend(e.thumbs.swiper.originalParams, {
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    }),
                    ee.extend(e.thumbs.swiper.params, {
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    })) : ee.isObject(t.swiper) && (e.thumbs.swiper = new a(ee.extend({}, t.swiper, {
                        watchSlidesVisibility: !0,
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    })),
                        e.thumbs.swiperCreated = !0),
                    e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
                    e.thumbs.swiper.on("tap", e.thumbs.onThumbClick)
            },
            onThumbClick: function () {
                var e = this
                    , t = e.thumbs.swiper;
                if (t) {
                    var a = t.clickedIndex
                        , i = t.clickedSlide;
                    if (!(i && L(i).hasClass(e.params.thumbs.slideThumbActiveClass) || null == a)) {
                        var s;
                        if (s = t.params.loop ? parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a,
                            e.params.loop) {
                            var r = e.activeIndex;
                            e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(),
                                e._clientLeft = e.$wrapperEl[0].clientLeft,
                                r = e.activeIndex);
                            var n = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index()
                                , o = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                            s = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
                        }
                        e.slideTo(s)
                    }
                }
            },
            update: function (e) {
                var t = this
                    , a = t.thumbs.swiper;
                if (a) {
                    var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView;
                    if (t.realIndex !== a.realIndex) {
                        var s, r = a.activeIndex;
                        if (a.params.loop) {
                            a.slides.eq(r).hasClass(a.params.slideDuplicateClass) && (a.loopFix(),
                                a._clientLeft = a.$wrapperEl[0].clientLeft,
                                r = a.activeIndex);
                            var n = a.slides.eq(r).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index()
                                , o = a.slides.eq(r).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                            s = void 0 === n ? o : void 0 === o ? n : o - r == r - n ? r : o - r < r - n ? o : n
                        } else
                            s = t.realIndex;
                        a.visibleSlidesIndexes.indexOf(s) < 0 && (a.params.centeredSlides ? s = r < s ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : r < s && (s = s - i + 1),
                            a.slideTo(s, e ? 0 : void 0))
                    }
                    var l = 1
                        , d = t.params.thumbs.slideThumbActiveClass;
                    if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView),
                        a.slides.removeClass(d),
                        a.params.loop)
                        for (var p = 0; p < l; p += 1)
                            a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + p) + '"]').addClass(d);
                    else
                        for (var c = 0; c < l; c += 1)
                            a.slides.eq(t.realIndex + c).addClass(d)
                }
            }
        }
        , Q = [E, S, C, M, P, $, O, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarged: "container"
                }
            },
            create: function () {
                var e = this;
                ee.extend(e, {
                    mousewheel: {
                        enabled: !1,
                        enable: A.enable.bind(e),
                        disable: A.disable.bind(e),
                        handle: A.handle.bind(e),
                        handleMouseEnter: A.handleMouseEnter.bind(e),
                        handleMouseLeave: A.handleMouseLeave.bind(e),
                        lastScrollTime: ee.now()
                    }
                })
            },
            on: {
                init: function () {
                    this.params.mousewheel.enabled && this.mousewheel.enable()
                },
                destroy: function () {
                    this.mousewheel.enabled && this.mousewheel.disable()
                }
            }
        }, {
                name: "navigation",
                params: {
                    navigation: {
                        nextEl: null,
                        prevEl: null,
                        hideOnClick: !1,
                        disabledClass: "swiper-button-disabled",
                        hiddenClass: "swiper-button-hidden",
                        lockClass: "swiper-button-lock"
                    }
                },
                create: function () {
                    var e = this;
                    ee.extend(e, {
                        navigation: {
                            init: H.init.bind(e),
                            update: H.update.bind(e),
                            destroy: H.destroy.bind(e),
                            onNextClick: H.onNextClick.bind(e),
                            onPrevClick: H.onPrevClick.bind(e)
                        }
                    })
                },
                on: {
                    init: function () {
                        this.navigation.init(),
                            this.navigation.update()
                    },
                    toEdge: function () {
                        this.navigation.update()
                    },
                    fromEdge: function () {
                        this.navigation.update()
                    },
                    destroy: function () {
                        this.navigation.destroy()
                    },
                    click: function (e) {
                        var t, a = this, i = a.navigation, s = i.$nextEl, r = i.$prevEl;
                        !a.params.navigation.hideOnClick || L(e.target).is(r) || L(e.target).is(s) || (s ? t = s.hasClass(a.params.navigation.hiddenClass) : r && (t = r.hasClass(a.params.navigation.hiddenClass)),
                            !0 === t ? a.emit("navigationShow", a) : a.emit("navigationHide", a),
                            s && s.toggleClass(a.params.navigation.hiddenClass),
                            r && r.toggleClass(a.params.navigation.hiddenClass))
                    }
                }
            }, {
                name: "pagination",
                params: {
                    pagination: {
                        el: null,
                        bulletElement: "span",
                        clickable: !1,
                        hideOnClick: !1,
                        renderBullet: null,
                        renderProgressbar: null,
                        renderFraction: null,
                        renderCustom: null,
                        progressbarOpposite: !1,
                        type: "bullets",
                        dynamicBullets: !1,
                        dynamicMainBullets: 1,
                        formatFractionCurrent: function (e) {
                            return e
                        },
                        formatFractionTotal: function (e) {
                            return e
                        },
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                        modifierClass: "swiper-pagination-",
                        currentClass: "swiper-pagination-current",
                        totalClass: "swiper-pagination-total",
                        hiddenClass: "swiper-pagination-hidden",
                        progressbarFillClass: "swiper-pagination-progressbar-fill",
                        progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                        clickableClass: "swiper-pagination-clickable",
                        lockClass: "swiper-pagination-lock"
                    }
                },
                create: function () {
                    var e = this;
                    ee.extend(e, {
                        pagination: {
                            init: N.init.bind(e),
                            render: N.render.bind(e),
                            update: N.update.bind(e),
                            destroy: N.destroy.bind(e),
                            dynamicBulletIndex: 0
                        }
                    })
                },
                on: {
                    init: function () {
                        this.pagination.init(),
                            this.pagination.render(),
                            this.pagination.update()
                    },
                    activeIndexChange: function () {
                        this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
                    },
                    snapIndexChange: function () {
                        this.params.loop || this.pagination.update()
                    },
                    slidesLengthChange: function () {
                        this.params.loop && (this.pagination.render(),
                            this.pagination.update())
                    },
                    snapGridLengthChange: function () {
                        this.params.loop || (this.pagination.render(),
                            this.pagination.update())
                    },
                    destroy: function () {
                        this.pagination.destroy()
                    },
                    click: function (e) {
                        var t = this;
                        t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !L(e.target).hasClass(t.params.pagination.bulletClass) && (!0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass) ? t.emit("paginationShow", t) : t.emit("paginationHide", t),
                            t.pagination.$el.toggleClass(t.params.pagination.hiddenClass))
                    }
                }
            }, {
                name: "scrollbar",
                params: {
                    scrollbar: {
                        el: null,
                        dragSize: "auto",
                        hide: !1,
                        draggable: !1,
                        snapOnRelease: !0,
                        lockClass: "swiper-scrollbar-lock",
                        dragClass: "swiper-scrollbar-drag"
                    }
                },
                create: function () {
                    var e = this;
                    ee.extend(e, {
                        scrollbar: {
                            init: G.init.bind(e),
                            destroy: G.destroy.bind(e),
                            updateSize: G.updateSize.bind(e),
                            setTranslate: G.setTranslate.bind(e),
                            setTransition: G.setTransition.bind(e),
                            enableDraggable: G.enableDraggable.bind(e),
                            disableDraggable: G.disableDraggable.bind(e),
                            setDragPosition: G.setDragPosition.bind(e),
                            onDragStart: G.onDragStart.bind(e),
                            onDragMove: G.onDragMove.bind(e),
                            onDragEnd: G.onDragEnd.bind(e),
                            isTouched: !1,
                            timeout: null,
                            dragTimeout: null
                        }
                    })
                },
                on: {
                    init: function () {
                        this.scrollbar.init(),
                            this.scrollbar.updateSize(),
                            this.scrollbar.setTranslate()
                    },
                    update: function () {
                        this.scrollbar.updateSize()
                    },
                    resize: function () {
                        this.scrollbar.updateSize()
                    },
                    observerUpdate: function () {
                        this.scrollbar.updateSize()
                    },
                    setTranslate: function () {
                        this.scrollbar.setTranslate()
                    },
                    setTransition: function (e) {
                        this.scrollbar.setTransition(e)
                    },
                    destroy: function () {
                        this.scrollbar.destroy()
                    }
                }
            }, {
                name: "parallax",
                params: {
                    parallax: {
                        enabled: !1
                    }
                },
                create: function () {
                    ee.extend(this, {
                        parallax: {
                            setTransform: B.setTransform.bind(this),
                            setTranslate: B.setTranslate.bind(this),
                            setTransition: B.setTransition.bind(this)
                        }
                    })
                },
                on: {
                    beforeInit: function () {
                        this.params.parallax.enabled && (this.params.watchSlidesProgress = !0,
                            this.originalParams.watchSlidesProgress = !0)
                    },
                    init: function () {
                        this.params.parallax.enabled && this.parallax.setTranslate()
                    },
                    setTranslate: function () {
                        this.params.parallax.enabled && this.parallax.setTranslate()
                    },
                    setTransition: function (e) {
                        this.params.parallax.enabled && this.parallax.setTransition(e)
                    }
                }
            }, {
                name: "zoom",
                params: {
                    zoom: {
                        enabled: !1,
                        maxRatio: 3,
                        minRatio: 1,
                        toggle: !0,
                        containerClass: "swiper-zoom-container",
                        zoomedSlideClass: "swiper-slide-zoomed"
                    }
                },
                create: function () {
                    var i = this
                        , t = {
                            enabled: !1,
                            scale: 1,
                            currentScale: 1,
                            isScaling: !1,
                            gesture: {
                                $slideEl: void 0,
                                slideWidth: void 0,
                                slideHeight: void 0,
                                $imageEl: void 0,
                                $imageWrapEl: void 0,
                                maxRatio: 3
                            },
                            image: {
                                isTouched: void 0,
                                isMoved: void 0,
                                currentX: void 0,
                                currentY: void 0,
                                minX: void 0,
                                minY: void 0,
                                maxX: void 0,
                                maxY: void 0,
                                width: void 0,
                                height: void 0,
                                startX: void 0,
                                startY: void 0,
                                touchesStart: {},
                                touchesCurrent: {}
                            },
                            velocity: {
                                x: void 0,
                                y: void 0,
                                prevPositionX: void 0,
                                prevPositionY: void 0,
                                prevTime: void 0
                            }
                        };
                    "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (e) {
                        t[e] = X[e].bind(i)
                    }),
                        ee.extend(i, {
                            zoom: t
                        });
                    var s = 1;
                    Object.defineProperty(i.zoom, "scale", {
                        get: function () {
                            return s
                        },
                        set: function (e) {
                            if (s !== e) {
                                var t = i.zoom.gesture.$imageEl ? i.zoom.gesture.$imageEl[0] : void 0
                                    , a = i.zoom.gesture.$slideEl ? i.zoom.gesture.$slideEl[0] : void 0;
                                i.emit("zoomChange", e, t, a)
                            }
                            s = e
                        }
                    })
                },
                on: {
                    init: function () {
                        this.params.zoom.enabled && this.zoom.enable()
                    },
                    destroy: function () {
                        this.zoom.disable()
                    },
                    touchStart: function (e) {
                        this.zoom.enabled && this.zoom.onTouchStart(e)
                    },
                    touchEnd: function (e) {
                        this.zoom.enabled && this.zoom.onTouchEnd(e)
                    },
                    doubleTap: function (e) {
                        this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
                    },
                    transitionEnd: function () {
                        this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
                    }
                }
            }, {
                name: "lazy",
                params: {
                    lazy: {
                        enabled: !1,
                        loadPrevNext: !1,
                        loadPrevNextAmount: 1,
                        loadOnTransitionStart: !1,
                        elementClass: "swiper-lazy",
                        loadingClass: "swiper-lazy-loading",
                        loadedClass: "swiper-lazy-loaded",
                        preloaderClass: "swiper-lazy-preloader"
                    }
                },
                create: function () {
                    ee.extend(this, {
                        lazy: {
                            initialImageLoaded: !1,
                            load: Y.load.bind(this),
                            loadInSlide: Y.loadInSlide.bind(this)
                        }
                    })
                },
                on: {
                    beforeInit: function () {
                        this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
                    },
                    init: function () {
                        this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
                    },
                    scroll: function () {
                        this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
                    },
                    resize: function () {
                        this.params.lazy.enabled && this.lazy.load()
                    },
                    scrollbarDragMove: function () {
                        this.params.lazy.enabled && this.lazy.load()
                    },
                    transitionStart: function () {
                        var e = this;
                        e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
                    },
                    transitionEnd: function () {
                        this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
                    }
                }
            }, {
                name: "controller",
                params: {
                    controller: {
                        control: void 0,
                        inverse: !1,
                        by: "slide"
                    }
                },
                create: function () {
                    var e = this;
                    ee.extend(e, {
                        controller: {
                            control: e.params.controller.control,
                            getInterpolateFunction: V.getInterpolateFunction.bind(e),
                            setTranslate: V.setTranslate.bind(e),
                            setTransition: V.setTransition.bind(e)
                        }
                    })
                },
                on: {
                    update: function () {
                        this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                            delete this.controller.spline)
                    },
                    resize: function () {
                        this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                            delete this.controller.spline)
                    },
                    observerUpdate: function () {
                        this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                            delete this.controller.spline)
                    },
                    setTranslate: function (e, t) {
                        this.controller.control && this.controller.setTranslate(e, t)
                    },
                    setTransition: function (e, t) {
                        this.controller.control && this.controller.setTransition(e, t)
                    }
                }
            }, {
                name: "a11y",
                params: {
                    a11y: {
                        enabled: !0,
                        notificationClass: "swiper-notification",
                        prevSlideMessage: "Previous slide",
                        nextSlideMessage: "Next slide",
                        firstSlideMessage: "This is the first slide",
                        lastSlideMessage: "This is the last slide",
                        paginationBulletMessage: "Go to slide {{index}}"
                    }
                },
                create: function () {
                    var t = this;
                    ee.extend(t, {
                        a11y: {
                            liveRegion: L('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                        }
                    }),
                        Object.keys(F).forEach(function (e) {
                            t.a11y[e] = F[e].bind(t)
                        })
                },
                on: {
                    init: function () {
                        this.params.a11y.enabled && (this.a11y.init(),
                            this.a11y.updateNavigation())
                    },
                    toEdge: function () {
                        this.params.a11y.enabled && this.a11y.updateNavigation()
                    },
                    fromEdge: function () {
                        this.params.a11y.enabled && this.a11y.updateNavigation()
                    },
                    paginationUpdate: function () {
                        this.params.a11y.enabled && this.a11y.updatePagination()
                    },
                    destroy: function () {
                        this.params.a11y.enabled && this.a11y.destroy()
                    }
                }
            }, {
                name: "history",
                params: {
                    history: {
                        enabled: !1,
                        replaceState: !1,
                        key: "slides"
                    }
                },
                create: function () {
                    var e = this;
                    ee.extend(e, {
                        history: {
                            init: R.init.bind(e),
                            setHistory: R.setHistory.bind(e),
                            setHistoryPopState: R.setHistoryPopState.bind(e),
                            scrollToSlide: R.scrollToSlide.bind(e),
                            destroy: R.destroy.bind(e)
                        }
                    })
                },
                on: {
                    init: function () {
                        this.params.history.enabled && this.history.init()
                    },
                    destroy: function () {
                        this.params.history.enabled && this.history.destroy()
                    },
                    transitionEnd: function () {
                        this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
                    }
                }
            }, {
                name: "hash-navigation",
                params: {
                    hashNavigation: {
                        enabled: !1,
                        replaceState: !1,
                        watchState: !1
                    }
                },
                create: function () {
                    var e = this;
                    ee.extend(e, {
                        hashNavigation: {
                            initialized: !1,
                            init: q.init.bind(e),
                            destroy: q.destroy.bind(e),
                            setHash: q.setHash.bind(e),
                            onHashCange: q.onHashCange.bind(e)
                        }
                    })
                },
                on: {
                    init: function () {
                        this.params.hashNavigation.enabled && this.hashNavigation.init()
                    },
                    destroy: function () {
                        this.params.hashNavigation.enabled && this.hashNavigation.destroy()
                    },
                    transitionEnd: function () {
                        this.hashNavigation.initialized && this.hashNavigation.setHash()
                    }
                }
            }, {
                name: "autoplay",
                params: {
                    autoplay: {
                        enabled: !1,
                        delay: 3e3,
                        waitForTransition: !0,
                        disableOnInteraction: !0,
                        stopOnLastSlide: !1,
                        reverseDirection: !1
                    }
                },
                create: function () {
                    var t = this;
                    ee.extend(t, {
                        autoplay: {
                            running: !1,
                            paused: !1,
                            run: W.run.bind(t),
                            start: W.start.bind(t),
                            stop: W.stop.bind(t),
                            pause: W.pause.bind(t),
                            onTransitionEnd: function (e) {
                                t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd),
                                    t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd),
                                    t.autoplay.paused = !1,
                                    t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
                            }
                        }
                    })
                },
                on: {
                    init: function () {
                        this.params.autoplay.enabled && this.autoplay.start()
                    },
                    beforeTransitionStart: function (e, t) {
                        this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
                    },
                    sliderFirstMove: function () {
                        this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
                    },
                    destroy: function () {
                        this.autoplay.running && this.autoplay.stop()
                    }
                }
            }, {
                name: "effect-fade",
                params: {
                    fadeEffect: {
                        crossFade: !1
                    }
                },
                create: function () {
                    ee.extend(this, {
                        fadeEffect: {
                            setTranslate: j.setTranslate.bind(this),
                            setTransition: j.setTransition.bind(this)
                        }
                    })
                },
                on: {
                    beforeInit: function () {
                        var e = this;
                        if ("fade" === e.params.effect) {
                            e.classNames.push(e.params.containerModifierClass + "fade");
                            var t = {
                                slidesPerView: 1,
                                slidesPerColumn: 1,
                                slidesPerGroup: 1,
                                watchSlidesProgress: !0,
                                spaceBetween: 0,
                                virtualTranslate: !0
                            };
                            ee.extend(e.params, t),
                                ee.extend(e.originalParams, t)
                        }
                    },
                    setTranslate: function () {
                        "fade" === this.params.effect && this.fadeEffect.setTranslate()
                    },
                    setTransition: function (e) {
                        "fade" === this.params.effect && this.fadeEffect.setTransition(e)
                    }
                }
            }, {
                name: "effect-cube",
                params: {
                    cubeEffect: {
                        slideShadows: !0,
                        shadow: !0,
                        shadowOffset: 20,
                        shadowScale: .94
                    }
                },
                create: function () {
                    ee.extend(this, {
                        cubeEffect: {
                            setTranslate: U.setTranslate.bind(this),
                            setTransition: U.setTransition.bind(this)
                        }
                    })
                },
                on: {
                    beforeInit: function () {
                        var e = this;
                        if ("cube" === e.params.effect) {
                            e.classNames.push(e.params.containerModifierClass + "cube"),
                                e.classNames.push(e.params.containerModifierClass + "3d");
                            var t = {
                                slidesPerView: 1,
                                slidesPerColumn: 1,
                                slidesPerGroup: 1,
                                watchSlidesProgress: !0,
                                resistanceRatio: 0,
                                spaceBetween: 0,
                                centeredSlides: !1,
                                virtualTranslate: !0
                            };
                            ee.extend(e.params, t),
                                ee.extend(e.originalParams, t)
                        }
                    },
                    setTranslate: function () {
                        "cube" === this.params.effect && this.cubeEffect.setTranslate()
                    },
                    setTransition: function (e) {
                        "cube" === this.params.effect && this.cubeEffect.setTransition(e)
                    }
                }
            }, {
                name: "effect-flip",
                params: {
                    flipEffect: {
                        slideShadows: !0,
                        limitRotation: !0
                    }
                },
                create: function () {
                    ee.extend(this, {
                        flipEffect: {
                            setTranslate: K.setTranslate.bind(this),
                            setTransition: K.setTransition.bind(this)
                        }
                    })
                },
                on: {
                    beforeInit: function () {
                        var e = this;
                        if ("flip" === e.params.effect) {
                            e.classNames.push(e.params.containerModifierClass + "flip"),
                                e.classNames.push(e.params.containerModifierClass + "3d");
                            var t = {
                                slidesPerView: 1,
                                slidesPerColumn: 1,
                                slidesPerGroup: 1,
                                watchSlidesProgress: !0,
                                spaceBetween: 0,
                                virtualTranslate: !0
                            };
                            ee.extend(e.params, t),
                                ee.extend(e.originalParams, t)
                        }
                    },
                    setTranslate: function () {
                        "flip" === this.params.effect && this.flipEffect.setTranslate()
                    },
                    setTransition: function (e) {
                        "flip" === this.params.effect && this.flipEffect.setTransition(e)
                    }
                }
            }, {
                name: "effect-coverflow",
                params: {
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: !0
                    }
                },
                create: function () {
                    ee.extend(this, {
                        coverflowEffect: {
                            setTranslate: _.setTranslate.bind(this),
                            setTransition: _.setTransition.bind(this)
                        }
                    })
                },
                on: {
                    beforeInit: function () {
                        var e = this;
                        "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"),
                            e.classNames.push(e.params.containerModifierClass + "3d"),
                            e.params.watchSlidesProgress = !0,
                            e.originalParams.watchSlidesProgress = !0)
                    },
                    setTranslate: function () {
                        "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
                    },
                    setTransition: function (e) {
                        "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
                    }
                }
            }, {
                name: "thumbs",
                params: {
                    thumbs: {
                        swiper: null,
                        slideThumbActiveClass: "swiper-slide-thumb-active",
                        thumbsContainerClass: "swiper-container-thumbs"
                    }
                },
                create: function () {
                    ee.extend(this, {
                        thumbs: {
                            swiper: null,
                            init: Z.init.bind(this),
                            update: Z.update.bind(this),
                            onThumbClick: Z.onThumbClick.bind(this)
                        }
                    })
                },
                on: {
                    beforeInit: function () {
                        var e = this.params.thumbs;
                        e && e.swiper && (this.thumbs.init(),
                            this.thumbs.update(!0))
                    },
                    slideChange: function () {
                        this.thumbs.swiper && this.thumbs.update()
                    },
                    update: function () {
                        this.thumbs.swiper && this.thumbs.update()
                    },
                    resize: function () {
                        this.thumbs.swiper && this.thumbs.update()
                    },
                    observerUpdate: function () {
                        this.thumbs.swiper && this.thumbs.update()
                    },
                    setTransition: function (e) {
                        var t = this.thumbs.swiper;
                        t && t.setTransition(e)
                    },
                    beforeDestroy: function () {
                        var e = this.thumbs.swiper;
                        e && this.thumbs.swiperCreated && e && e.destroy()
                    }
                }
            }];
    return void 0 === T.use && (T.use = T.Class.use,
        T.installModule = T.Class.installModule),
        T.use(Q),
        T
});
//# sourceMappingURL=swiper.min.js.map

//relax
(function (n, h) {
    "function" === typeof define && define.amd ? define([], h) : "object" === typeof module && module.exports ? module.exports = h() : n.Rellax = h()
}
)("undefined" !== typeof window ? window : global, function () {
    var n = function (h, p) {
        var a = Object.create(n.prototype)
            , l = 0
            , r = 0
            , k = 0
            , t = 0
            , c = []
            , u = !0
            , B = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (a) {
                return setTimeout(a, 1E3 / 60)
            }
            , q = null
            , C = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout
            , D = window.transformProp || function () {
                var a = document.createElement("div");
                if (null === a.style.transform) {
                    var b = ["Webkit", "Moz", "ms"], e;
                    for (e in b)
                        if (void 0 !== a.style[b[e] + "Transform"])
                            return b[e] + "Transform"
                }
                return "transform"
            }();
        a.options = {
            speed: -2,
            center: !1,
            wrapper: null,
            relativeToWrapper: !1,
            round: !0,
            vertical: !0,
            horizontal: !1,
            callback: function () { }
        };
        p && Object.keys(p).forEach(function (d) {
            a.options[d] = p[d]
        });
        h || (h = ".rellax");
        var m = "string" === typeof h ? document.querySelectorAll(h) : [h];
        if (0 < m.length) {
            a.elems = m;
            if (a.options.wrapper && !a.options.wrapper.nodeType)
                if (m = document.querySelector(a.options.wrapper))
                    a.options.wrapper = m;
                else {
                    console.warn("Rellax: The wrapper you're trying to use doesn't exist.");
                    return
                }
            var w = function () {
                for (var d = 0; d < c.length; d++)
                    a.elems[d].style.cssText = c[d].style;
                c = [];
                r = window.innerHeight;
                t = window.innerWidth;
                x();
                for (d = 0; d < a.elems.length; d++) {
                    var b = a.elems[d]
                        , e = b.getAttribute("data-rellax-percentage")
                        , g = b.getAttribute("data-rellax-speed")
                        , h = b.getAttribute("data-rellax-zindex") || 0
                        , l = b.getAttribute("data-rellax-min")
                        , n = b.getAttribute("data-rellax-max")
                        , v = a.options.wrapper ? a.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                    a.options.relativeToWrapper && (v = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) - a.options.wrapper.offsetTop);
                    var f = a.options.vertical ? e || a.options.center ? v : 0 : 0
                        , k = a.options.horizontal ? e || a.options.center ? a.options.wrapper ? a.options.wrapper.scrollLeft : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0 : 0;
                    v = f + b.getBoundingClientRect().top;
                    var m = b.clientHeight || b.offsetHeight || b.scrollHeight
                        , p = k + b.getBoundingClientRect().left
                        , q = b.clientWidth || b.offsetWidth || b.scrollWidth;
                    f = e ? e : (f - v + r) / (m + r);
                    e = e ? e : (k - p + t) / (q + t);
                    a.options.center && (f = e = .5);
                    g = g ? g : a.options.speed;
                    e = y(e, f, g);
                    b = b.style.cssText;
                    f = "";
                    0 <= b.indexOf("transform") && (f = b.indexOf("transform"),
                        f = b.slice(f),
                        f = (k = f.indexOf(";")) ? " " + f.slice(11, k).replace(/\s/g, "") : " " + f.slice(11).replace(/\s/g, ""));
                    c.push({
                        baseX: e.x,
                        baseY: e.y,
                        top: v,
                        left: p,
                        height: m,
                        width: q,
                        speed: g,
                        style: b,
                        transform: f,
                        zindex: h,
                        min: l,
                        max: n
                    })
                }
                u && (window.addEventListener("resize", w),
                    u = !1);
                z()
            }
                , x = function () {
                    var d = l
                        , b = k;
                    l = a.options.wrapper ? a.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
                    k = a.options.wrapper ? a.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset;
                    a.options.relativeToWrapper && (l = ((document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset) - a.options.wrapper.offsetTop);
                    return d != l && a.options.vertical || b != k && a.options.horizontal ? !0 : !1
                }
                , y = function (d, b, e) {
                    var c = {};
                    d = 100 * e * (1 - d);
                    b = 100 * e * (1 - b);
                    c.x = a.options.round ? Math.round(d) : Math.round(100 * d) / 100;
                    c.y = a.options.round ? Math.round(b) : Math.round(100 * b) / 100;
                    return c
                }
                , A = function () {
                    x() && !1 === u && z();
                    q = B(A)
                }
                , z = function () {
                    for (var d, b = 0; b < a.elems.length; b++) {
                        d = y((k - c[b].left + t) / (c[b].width + t), (l - c[b].top + r) / (c[b].height + r), c[b].speed);
                        var e = d.y - c[b].baseY
                            , g = d.x - c[b].baseX;
                        null !== c[b].min && (a.options.vertical && !a.options.horizontal && (e = e <= c[b].min ? c[b].min : e),
                            a.options.horizontal && !a.options.vertical && (g = g <= c[b].min ? c[b].min : g));
                        null !== c[b].max && (a.options.vertical && !a.options.horizontal && (e = e >= c[b].max ? c[b].max : e),
                            a.options.horizontal && !a.options.vertical && (g = g >= c[b].max ? c[b].max : g));
                        a.elems[b].style[D] = "translate3d(" + (a.options.horizontal ? g : "0") + "px," + (a.options.vertical ? e : "0") + "px," + c[b].zindex + "px) " + c[b].transform
                    }
                    a.options.callback(d)
                };
            a.destroy = function () {
                for (var d = 0; d < a.elems.length; d++)
                    a.elems[d].style.cssText = c[d].style;
                u || (window.removeEventListener("resize", w),
                    u = !0);
                C(q);
                q = null
            }
                ;
            w();
            A();
            a.refresh = w;
            return a
        }
        console.warn("Rellax: The elements you're trying to select don't exist.")
    };
    return n
});

/*! luxy.js v0.1.0 | (c) 2018 Mineo Okuda | MIT License | git+ssh://git@github.com:min30327/luxy.js.git */
!(function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.luxy = e()
}
)(this, (function () {
    "use strict";
    var t = {
        wrapper: "#luxy",
        targets: ".luxy-el",
        wrapperSpeed: .08,
        targetSpeed: .02,
        targetPercentage: .1
    }
        , e = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = e;
    var i = window.cancelAnimationFrame || window.mozCancelAnimationFrame
        , s = function () {
            for (var t = {}, e = 0, i = arguments.length; e < i; e++) {
                var s = arguments[e];
                !(function (e) {
                    for (var i in e)
                        e.hasOwnProperty(i) && (t[i] = e[i])
                }
                )(s)
            }
            return t
        }
        , r = function () {
            this.Targets = [],
                this.TargetsLength = 0,
                this.wrapper = "",
                this.windowHeight = 0,
                this.wapperOffset = 0
        };
    return r.prototype = {
        isAnimate: !1,
        isResize: !1,
        scrollId: "",
        resizeId: "",
        init: function (e) {
            if (this.settings = s(t, e || {}),
                this.wrapper = document.querySelector(this.settings.wrapper),
                "undefined" === this.wrapper)
                return !1;
            this.targets = document.querySelectorAll(this.settings.targets),
                document.body.style.height = this.wrapper.clientHeight + "px",
                this.windowHeight = window.clientHeight,
                this.attachEvent(),
                this.apply(this.targets, this.wrapper),
                this.animate(),
                this.resize()
        },
        apply: function (t, e) {
            this.wrapperInit(),
                this.targetsLength = t.length;
            for (var i = 0; i < this.targetsLength; i++) {
                var s = {
                    offset: t[i].getAttribute("data-offset"),
                    speedX: t[i].getAttribute("data-speed-x"),
                    speedY: t[i].getAttribute("data-speed-Y"),
                    percentage: t[i].getAttribute("data-percentage"),
                    horizontal: t[i].getAttribute("data-horizontal")
                };
                this.targetsInit(t[i], s)
            }
        },
        wrapperInit: function () {
            this.wrapper.style.width = "100%",
                this.wrapper.style.position = "fixed"
        },
        targetsInit: function (t, e) {
            this.Targets.push({
                elm: t,
                offset: e.offset ? e.offset : 0,
                horizontal: e.horizontal ? e.horizontal : 0,
                top: 0,
                left: 0,
                speedX: e.speedX ? e.speedX : 1,
                speedY: e.speedY ? e.speedY : 1,
                percentage: e.percentage ? e.percentage : 0
            })
        },
        scroll: function () {
            document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop,
                this.windowHeight;
            this.wrapperUpdate(this.scrollTop);
            for (var t = 0; t < this.Targets.length; t++)
                this.targetsUpdate(this.Targets[t])
        },
        animate: function () {
            this.scroll(),
                this.scrollId = e(this.animate.bind(this))
        },
        wrapperUpdate: function () {
            this.wapperOffset += (this.scrollTop - this.wapperOffset) * this.settings.wrapperSpeed,
                this.wrapper.style.transform = "translate3d(0," + Math.round(100 * -this.wapperOffset) / 100 + "px ,0)"
        },
        targetsUpdate: function (t) {
            t.top += (this.scrollTop * Number(this.settings.targetSpeed) * Number(t.speedY) - t.top) * this.settings.targetPercentage,
                t.left += (this.scrollTop * Number(this.settings.targetSpeed) * Number(t.speedX) - t.left) * this.settings.targetPercentage;
            var e = parseInt(t.percentage) - t.top - parseInt(t.offset)
                , i = Math.round(-100 * e) / 100
                , s = 0;
            if (t.horizontal) {
                var r = parseInt(t.percentage) - t.left - parseInt(t.offset);
                s = Math.round(-100 * r) / 100
            }
            t.elm.style.transform = "translate3d(" + s + "px ," + i + "px ,0)"
        },
        resize: function () {
            var t = this;
            t.windowHeight = window.innerHeight || document.documentElement.clientHeight || 0,
                parseInt(t.wrapper.clientHeight) != parseInt(document.body.style.height) && (document.body.style.height = t.wrapper.clientHeight + "px"),
                t.resizeId = e(t.resize.bind(t))
        },
        attachEvent: function () {
            var t = this;
            window.addEventListener("resize", (function () {
                t.isResize || (i(t.resizeId),
                    i(t.scrollId),
                    t.isResize = !0,
                    setTimeout((function () {
                        t.isResize = !1,
                            t.resizeId = e(t.resize.bind(t)),
                            t.scrollId = e(t.animate.bind(t))
                    }
                    ), 200))
            }
            ))
        }
    },
        new r
}
));
