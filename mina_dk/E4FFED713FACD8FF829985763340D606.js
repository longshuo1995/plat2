function e(e, n, t) {
    if (e[n]) {
        var i = e[n];
        e[n] = function(e) {
            t.call(this, e, n), i.call(this, e);
        };
    } else e[n] = function(e) {
        t.call(this, e, n);
    };
}

var n = require("B81F24B23FACD8FFDE794CB5B330D606.js"), t = {
    appid: n.appid,
    accountid: n.accountid,
    pagenum: 0,
    vid: 0
}, i = {}, s = App;

App = function(n) {
    e(n, "onLaunch", a), e(n, "onShow", c), s(n);
};

var o = Page;

Page = function(n) {
    e(n, "onLoad", r), e(n, "onShow", d), e(n, "clickclose", g), o(n);
};

var u = function(e, t) {
    wx.request({
        url: n.request + "/api/Client/xcxmonitor.ashx",
        data: {
            subinfo: encodeURIComponent(JSON.stringify(e)),
            act: t
        },
        header: {
            "content-type": "text/plain;charset=utf-8"
        },
        method: "GET",
        success: function(e) {
            return e;
        },
        fail: function(e) {
            return e;
        }
    });
}, a = function(e) {
    if (1011 != e.scene && 1013 != e.scene && 1012 != e.scene || (void 0 != e.query._m_ ? t.query = e.query._m_ : t.query = ""), 
    1047 == e.scene || 1049 == e.scene || 1048 == e.scene) {
        var s = decodeURIComponent(e.query.scene), o = new Array();
        o = s.split("&"), t.query = "";
        for (var a = 0; a < o.length; a++) {
            var c = o[a].split("=")[0], r = o[a].split("=")[1];
            "_m_" == c && (t.query = r);
        }
    }
    var f = "";
    try {
        f = wx.getStorageSync("mdk_sid"), t.sid = f;
    } catch (e) {
        f = "";
    }
    t.scene = e.scene, t.url = e.path, t.refer = "", t.isfirstpage = 0;
    var d = function() {
        wx.getSystemInfo({
            success: function(e) {
                t.os = e.system, t.screenbitdepth = e.pixelRatio, t.resolution = e.screenWidth + "*" + e.screenHeight, 
                t.useragent = e.system + ";" + e.brand + ";" + e.model + ";" + e.platform, u(t, "updatesysteminfo");
            },
            complete: function() {}
        });
    }, p = function() {
        wx.getSetting && wx.getSetting({
            success: function(e) {
                n.location && l(t);
            }
        });
    }, l = function() {
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                t.geographic = e.longitude + "," + e.latitude, u(t, "updatelocation");
            },
            complete: function() {}
        });
    };
    wx.login({
        success: function(e) {
            e.code && (t.logincode = e.code, wx.getUserInfo({
                withCredentials: !0,
                lang: "zh_CN",
                success: function(e) {
                    t.encryptedData = e.encryptedData, t.iv = e.iv, t.isauth = 1;
                },
                fail: function(e) {
                    t.isauth = 2;
                },
                complete: function() {
                    wx.request({
                        url: n.request + "/api/Client/xcxmonitor.ashx",
                        data: {
                            subinfo: encodeURIComponent(JSON.stringify(t)),
                            act: "loadsession"
                        },
                        header: {
                            "content-type": "text/plain;charset=utf-8"
                        },
                        method: "GET",
                        success: function(e) {
                            if (!e.data.IsError) {
                                var n = e.data.Data;
                                t.vid = n.vid;
                                var s = "";
                                try {
                                    s = wx.getStorageSync("mdk_sid");
                                } catch (e) {
                                    s = "";
                                }
                                s != n.sid && wx.setStorageSync("mdk_sid", n.sid), i.open = n.open, i.imgurl = n.imgurl, 
                                i.enternum = n.enternum, i.refusenum = n.refusenum, p(), d();
                            }
                        }
                    });
                }
            }));
        }
    }), this.subinfo = t, this.invite = i;
}, c = function(e) {
    void 0 !== e && (this.subinfo.path = e.path, this.subinfo.scene = e.scene);
}, r = function(e, n) {
    var t = getApp(), i = this;
    t.subinfo && t.subinfo.pagenum++;
    var s = "";
    try {
        s = wx.getStorageSync("mdk_sid");
    } catch (e) {
        s = "";
    }
    if (t.subinfo && (t.subinfo.url = i.route), t.subinfo && t.subinfo.page_last_page && (i.lp = t.subinfo.page_last_page, 
    t.subinfo.refer = i.lp), t.subinfo && (t.subinfo.page_last_page = i.route), "" != s && t.subinfo.pagenum > 1 && 0 != t.subinfo.vid) {
        var o = {
            accountid: t.subinfo.accountid,
            appid: t.subinfo.appid,
            vid: t.subinfo.vid,
            url: t.subinfo.url,
            refer: t.subinfo.refer,
            scene: t.subinfo.scene
        };
        u(o, "trackinfo");
    }
}, f = 0, d = function() {
    0 != f && clearTimeout(f);
    var e = this;
    i.open ? p(e) : f = setInterval(function() {
        void 0 != i.open && (clearInterval(f), p(e));
    }, 200);
}, p = function(e) {
    "1" == i.open && (e.setData({
        isshow: "hide",
        inviteimage: "background-image: url('" + i.imgurl + "');"
    }), setTimeout(function() {
        e.setData({
            isshow: "show"
        });
    }, 1e3 * i.enternum));
}, l = 0, g = function() {
    var e = this;
    e.setData({
        isshow: "hide"
    }), 0 != l && clearTimeout(l), i.refusenum > 0 && (l = setTimeout(function() {
        e.setData({
            isshow: "show"
        });
    }, 1e3 * i.refusenum));
};