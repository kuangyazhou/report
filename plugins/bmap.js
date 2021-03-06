! function(t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e(require("echarts")) : "function" == typeof define && define.amd ? define(["echarts"], e) : "object" == typeof exports ? exports.bmap = e(require("echarts")) : (t.echarts = t.echarts || {}, t.echarts.bmap = e(t.echarts)) }(this, function(t) {
    return function(t) {
        function e(n) { if (o[n]) return o[n].exports; var r = o[n] = { exports: {}, id: n, loaded: !1 }; return t[n].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports }
        var o = {};
        return e.m = t, e.c = o, e.p = "", e(0)
    }([function(t, e, o) {
        var n;
        n = function(t) {
            return o(1).registerCoordinateSystem("bmap", o(2)), o(3), o(4), o(1).registerAction({ type: "bmapRoam", event: "bmapRoam", update: "updateLayout" }, function(t, e) {
                e.eachComponent("bmap", function(t) {
                    var e = t.getBMap(),
                        o = e.getCenter();
                    t.setCenterAndZoom([o.lng, o.lat], e.getZoom())
                })
            }), { version: "1.0.0" }
        }.call(e, o, e, t), !(void 0 !== n && (t.exports = n))
    }, function(e, o) { e.exports = t }, function(t, e, o) {
        var n;
        n = function(t) {
            function e(t, e) { this._bmap = t, this.dimensions = ["lng", "lat"], this._mapOffset = [0, 0], this._api = e, this._projection = new BMap.MercatorProjection }

            function n(t, e) {
                return e = e || [0, 0], a.map([0, 1], function(o) {
                    var n = e[o],
                        r = t[o] / 2,
                        i = [],
                        a = [];
                    return i[o] = n - r, a[o] = n + r, i[1 - o] = a[1 - o] = e[1 - o], Math.abs(this.dataToPoint(i)[o] - this.dataToPoint(a)[o])
                }, this)
            }

            function r() {
                function t(t) { this._root = t }
                return t.prototype = new BMap.Overlay, t.prototype.initialize = function(t) { return t.getPanes().labelPane.appendChild(this._root), this._root }, t.prototype.draw = function() {}, t
            }
            var i = o(1),
                a = i.util;
            e.prototype.dimensions = ["lng", "lat"], e.prototype.setZoom = function(t) { this._zoom = t }, e.prototype.setCenter = function(t) { this._center = this._projection.lngLatToPoint(new BMap.Point(t[0], t[1])) }, e.prototype.setMapOffset = function(t) { this._mapOffset = t }, e.prototype.getBMap = function() { return this._bmap }, e.prototype.dataToPoint = function(t) {
                var e = new BMap.Point(t[0], t[1]),
                    o = this._bmap.pointToOverlayPixel(e),
                    n = this._mapOffset;
                return [o.x - n[0], o.y - n[1]]
            }, e.prototype.pointToData = function(t) {
                var e = this._mapOffset,
                    t = this._bmap.overlayPixelToPoint({ x: t[0] + e[0], y: t[1] + e[1] });
                return [t.lng, t.lat]
            }, e.prototype.getViewRect = function() { var t = this._api; return new i.graphic.BoundingRect(0, 0, t.getWidth(), t.getHeight()) }, e.prototype.getRoamTransform = function() { return i.matrix.create() }, e.prototype.prepareCustoms = function(t) { var e = this.getViewRect(); return { coordSys: { type: "bmap", x: e.x, y: e.y, width: e.width, height: e.height }, api: { coord: a.bind(this.dataToPoint, this), size: a.bind(n, this) } } };
            var p;
            return e.dimensions = e.prototype.dimensions, e.create = function(t, o) {
                var n, i = o.getDom();
                t.eachComponent("bmap", function(t) {
                    var a = o.getZr().painter,
                        s = a.getViewportRoot();
                    if ("undefined" == typeof BMap) throw new Error("BMap api is not loaded");
                    if (p = p || r(), n) throw new Error("Only one bmap component can exist");
                    if (!t.__bmap) {
                        var c = i.querySelector(".ec-extension-bmap");
                        c && (s.style.left = "0px", s.style.top = "0px", i.removeChild(c)), c = document.createElement("div"), c.style.cssText = "width:100%;height:100%", c.classList.add("ec-extension-bmap"), i.appendChild(c);
                        var m = t.__bmap = new BMap.Map(c),
                            f = new p(s);
                        m.addOverlay(f), a.getViewportRootOffset = function() { return { offsetLeft: 0, offsetTop: 0 } }
                    }
                    var m = t.__bmap,
                        d = t.get("center"),
                        l = t.get("zoom");
                    if (d && l) {
                        var u = new BMap.Point(d[0], d[1]);
                        m.centerAndZoom(u, l)
                    }
                    n = new e(m, o), n.setMapOffset(t.__mapOffset || [0, 0]), n.setZoom(l), n.setCenter(d), t.coordinateSystem = n
                }), t.eachSeries(function(t) { "bmap" === t.get("coordinateSystem") && (t.coordinateSystem = n) })
            }, e
        }.call(e, o, e, t), !(void 0 !== n && (t.exports = n))
    }, function(t, e, o) {
        var n;
        n = function(t) {
            function e(t, e) { return t && e && t[0] === e[0] && t[1] === e[1] }
            return o(1).extendComponentModel({ type: "bmap", getBMap: function() { return this.__bmap }, setCenterAndZoom: function(t, e) { this.option.center = t, this.option.zoom = e }, centerOrZoomChanged: function(t, o) { var n = this.option; return !(e(t, n.center) && o === n.zoom) }, defaultOption: { center: [104.114129, 37.550339], zoom: 5, mapStyle: {}, roam: !1 } })
        }.call(e, o, e, t), !(void 0 !== n && (t.exports = n))
    }, function(t, e, o) {
        var n;
        n = function(t) {
            return o(1).extendComponentView({
                type: "bmap",
                render: function(t, e, o) {
                    function n() { r || o.dispatchAction({ type: "bmapRoam" }) }
                    var r = !0,
                        i = t.getBMap(),
                        a = o.getZr().painter.getViewportRoot(),
                        p = t.coordinateSystem,
                        s = function(e, n) {
                            if (!r) {
                                var i = a.parentNode.parentNode.parentNode,
                                    s = [-parseInt(i.style.left, 10) || 0, -parseInt(i.style.top, 10) || 0];
                                a.style.left = s[0] + "px", a.style.top = s[1] + "px", p.setMapOffset(s), t.__mapOffset = s, o.dispatchAction({ type: "bmapRoam" })
                            }
                        };
                    i.removeEventListener("moving", this._oldMoveHandler), i.removeEventListener("zoomend", this._oldZoomEndHandler), i.addEventListener("moving", s), i.addEventListener("zoomend", n), this._oldMoveHandler = s, this._oldZoomEndHandler = n;
                    var c = t.get("roam");
                    c && "scale" !== c ? i.enableDragging() : i.disableDragging(), c && "move" !== c ? (i.enableScrollWheelZoom(), i.enableDoubleClickZoom(), i.enablePinchToZoom()) : (i.disableScrollWheelZoom(), i.disableDoubleClickZoom(), i.disablePinchToZoom());
                    var m = t.__mapStyle,
                        f = t.get("mapStyle") || {},
                        d = JSON.stringify(f);
                    JSON.stringify(m) !== d && (Object.keys(f).length && i.setMapStyle(f), t.__mapStyle = JSON.parse(d)), r = !1
                }
            })
        }.call(e, o, e, t), !(void 0 !== n && (t.exports = n))
    }])
});