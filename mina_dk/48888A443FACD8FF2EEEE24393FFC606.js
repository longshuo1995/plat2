var r = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(t) {
        var e, o, h, a, c, n, d, C = "", i = 0;
        for (t = r._utf8_encode(t); i < t.length; ) a = (e = t.charCodeAt(i++)) >> 2, c = (3 & e) << 4 | (o = t.charCodeAt(i++)) >> 4, 
        n = (15 & o) << 2 | (h = t.charCodeAt(i++)) >> 6, d = 63 & h, isNaN(o) ? n = d = 64 : isNaN(h) && (d = 64), 
        C = C + this._keyStr.charAt(a) + this._keyStr.charAt(c) + this._keyStr.charAt(n) + this._keyStr.charAt(d);
        return C;
    },
    decode: function(t) {
        var e, o, h, a, c, n, d = "", C = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); C < t.length; ) e = this._keyStr.indexOf(t.charAt(C++)) << 2 | (a = this._keyStr.indexOf(t.charAt(C++))) >> 4, 
        o = (15 & a) << 4 | (c = this._keyStr.indexOf(t.charAt(C++))) >> 2, h = (3 & c) << 6 | (n = this._keyStr.indexOf(t.charAt(C++))), 
        d += String.fromCharCode(e), 64 != c && (d += String.fromCharCode(o)), 64 != n && (d += String.fromCharCode(h));
        return d = r._utf8_decode(d);
    },
    _utf8_encode: function(r) {
        r = r.replace(/\r\n/g, "\n");
        for (var t = "", e = 0; e < r.length; e++) {
            var o = r.charCodeAt(e);
            o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), 
            t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), 
            t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
        }
        return t;
    },
    _utf8_decode: function(r) {
        for (var t = "", e = 0, o = c1 = c2 = 0; e < r.length; ) (o = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(o), 
        e++) : o > 191 && o < 224 ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), 
        e += 2) : (c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), 
        e += 3);
        return t;
    }
};

module.exports = r;