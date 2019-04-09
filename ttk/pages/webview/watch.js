function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), n = function() {
    function n(e) {
        t(this, n), this.page = e, this.observers = new Map(), this.init();
    }
    return e(n, [ {
        key: "init",
        value: function() {
            var t = this, e = this.page;
            Object.keys(e.watch).forEach(function(n) {
                t.inData(n) && t.observers.set(n, e.watch[n]);
            });
        }
    }, {
        key: "data",
        value: function(t, e) {
            this.inData(t) && this.setter(this.page.data, t, e);
        }
    }, {
        key: "setData",
        value: function(t) {
            var e = this, n = Object.assign({}, this.page.data);
            this.page.setData(t), Object.keys(t).forEach(function(r) {
                e.observers.has(r) && e.notify(r, t[r], e.getter(n, r));
            });
        }
    }, {
        key: "notify",
        value: function(t, e, n) {
            this.observers.has(t) && this.observers.get(t).call(this.page, e, n);
        }
    }, {
        key: "unSubscribe",
        value: function(t) {
            this.observers.delete(t);
        }
    }, {
        key: "setter",
        value: function(t, e, n) {
            if (this.inData(e)) {
                var r = void 0, i = this._getPathArr(e), a = i.reduce(function(t, e, a) {
                    return a === i.length - 1 && (r = t[e], t[e] = n), t[e];
                }, t);
                return this.observers.has(e) && this.notify(e, n, r), a;
            }
        }
    }, {
        key: "getter",
        value: function(t, e) {
            return this._getPathArr(e).reduce(function(t, e) {
                var n = Object.prototype.toString.call(t);
                return /String|Number|Boolean|Null|Undefined/.test(n) ? void 0 : t[e];
            }, t);
        }
    }, {
        key: "inData",
        value: function(t) {
            return void 0 !== this.getter(this.page.data, t);
        }
    }, {
        key: "_getPathArr",
        value: function(t) {
            var e = /\[((?:\S+?))\]|\./g;
            return t.toString().split(e).filter(function(t) {
                return !!t;
            });
        }
    } ]), n;
}();

exports.default = n;