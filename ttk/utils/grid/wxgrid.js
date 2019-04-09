var t = function() {
    this._rowsCount = 0, this.rows = [], this._colsCount = 0, this.cols = [], this._widths = 100;
}, s = function(t) {
    this.add = function(s, o) {
        if ("add" == s) return !1;
        for (var i = new Array(), h = 0; h < t._rowsCount; h++) {
            i[h] = new Array();
            for (var n = 0; n < t._colsCount; n++) {
                var r = h + n + h * (t._colsCount - 1);
                i[h][n] = o[r];
            }
        }
        return this[s] = i, !0;
    };
};

module.exports = function() {
    var o = null;
    this.rows = null, this.cols = null, this.data = null, this.init = function(i, h) {
        (o = new t())._rowsCount = i, o._colsCount = h;
        for (r = 0; r < i; r++) o.rows.push({
            index: r,
            height: 0
        });
        for (var n = 100 / h / o._widths * 100, r = 0; r < h; r++) o.cols.push({
            index: r,
            width: n
        });
        this.rows = o.rows, this.cols = o.cols, this.data = new s(o);
    }, this.setRowsHeight = function(t, s) {
        if (s) (s = parseInt(s)) > 0 && s < o.rows.length && (o.rows[s].height = t); else for (var i = 0; i < o.rows.length; i++) o.rows[i].height = t;
    }, this.setColsWidth = function(t, s) {
        var i = o.cols;
        if (s) (s = parseInt(s)) > 0 && s < i.length && (i[s].width = t); else for (h = 0; h < i.length; h++) i[h].width = t;
        o._widths = 0;
        for (h = 0; h < o.cols.length; h++) o._widths = o._widths + i[h].width;
        console.log(o._widths);
        for (var h = 0; h < o.cols.length; h++) o.cols[h].width = i[h].width / o._widths * 100, 
        console.log(h + "" + o.cols[h].width);
    };
};