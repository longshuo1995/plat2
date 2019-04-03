var e = require("A30975103FACD8FFC56F1D17A6EFC606.js"), t = require("A1AF58153FACD8FFC7C9301265BFC606.js"), o = require("47F150003FACD8FF21973807D950D606.js"), n = getApp(), i = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    userLogin: function(t, o, i) {
        var s = this, a = null, r = null;
        wx.login({
            success: function(u) {
                (a = u.code) && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(u) {
                        r = u.userInfo, s.request(e.system.login, {
                            code: a,
                            user: r,
                            encryptedData: u.encryptedData,
                            appid: n.globalData.app_id,
                            iv: u.iv,
                            source_pid: i
                        }, function(e) {
                            var n = e.data;
                            if (0 == n.code) {
                                var i = s.encrypt(n.userStr);
                                i.role || (i.role = 0), i.mcode || (i.mcode = ""), i.uid || (i.uid = 0), i.pid = i.pid2, 
                                wx.setStorageSync("wxUser", i), "function" == typeof t && t();
                            } else "function" == typeof o && o(n.msg);
                        }, function(e) {
                            "function" == typeof o && o("请求超时");
                        });
                    },
                    fail: function() {
                        "function" == typeof o && o("未获取用户信息");
                    }
                });
            },
            fail: function() {
                "function" == typeof o && o("登陆失败");
            }
        });
    },
    encrypt: function(e) {
        var o = t.enc.Utf8.parse("!QA2Z@w1sxO*(-8L"), n = t.enc.Utf8.parse("!WFNZFU_{H%M(S|a"), i = t.AES.decrypt(e, o, {
            iv: n,
            mode: t.mode.CBC,
            padding: t.pad.Pkcs7
        });
        return JSON.parse(t.enc.Utf8.stringify(i));
    },
    request: function(e, t, n, i) {
        for (var s = new Date().getTime(), a = String(s - 1539328140705), r = "", u = 0; u < a.length; u++) {
            var c = a.charAt(u);
            r += "aRHAbMQYiO".charAt(c);
        }
        t.ranNum = r;
        var p = o.sort("4@vq2Qia1TJiPd0V$a7diuw5cPgtwO" + s);
        t.sign = p, wx.request({
            url: e,
            data: t,
            success: function(e) {
                "function" == typeof n && n(e);
            },
            fail: function(e) {
                "function" == typeof i && i();
            }
        });
    },
    getAlbumInfo: function() {
        wx.getSetting({
            success: function(e) {
                var t = e.authSetting["scope.writePhotosAlbum"];
                if (void 0 == t || t) return "undefined";
                wx.openSetting({
                    success: function(e) {
                        return e.authSetting["scope.writePhotosAlbum"] ? (wx.showToast({
                            title: "相册授权成功"
                        }), !0) : (wx.showToast({
                            title: "相册授权失败",
                            image: n.globalData.errorImg
                        }), !1);
                    }
                });
            }
        });
    },
    shareGoodsCount: function(t) {
        this.request(e.system.shareGoodsCount, {
            goods_id: t
        });
    },
    getGoodsComment: function(e, t, o, n) {
        var i = "https://apiv4.yangkeduo.com/reviews/" + e;
        this.request(i, {
            page: t,
            size: o
        }, function(e) {
            "function" == typeof n && n(e);
        });
    },
    formatTime3: function(e, t) {
        var o = [ "Y", "M", "D", "h", "m", "s" ], n = [], s = new Date(1e3 * e);
        n.push(s.getFullYear()), n.push(i(s.getMonth() + 1)), n.push(i(s.getDate())), n.push(i(s.getHours())), 
        n.push(i(s.getMinutes())), n.push(i(s.getSeconds()));
        for (var a in n) t = t.replace(o[a], n[a]);
        return t;
    },
    add_source_pid: function(t, o, i) {
        console.log("add_source_pid:" + o), this.request(e.system.addSourcePid, {
            uid: t,
            source_pid: o
        }, function(e) {
            var t = e.data;
            if (0 == t.code) {
                var o = t.wxUser;
                o.pid = o.pid2, "function" == typeof i && i(o);
            } else wx.showToast({
                title: t.msg,
                image: n.globalData.errorImg
            });
        });
    },
    refreshUser: function(t, o) {
        this.request(e.mine.settings.refreshUser, {
            uid: t
        }, function(e) {
            0 == e.data.code ? "function" == typeof o && o(e) : wx.showToast({
                title: e.data.msg,
                image: n.globalData.errorImg
            });
        });
    },
    appUser: function(e) {
        var t = null, o = {};
        wx.login({
            success: function(i) {
                (t = i.code) && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(n) {
                        o.code = t, o.encryptedData = n.encryptedData, o.iv = n.iv, "function" == typeof e && e(o);
                    },
                    fail: function() {
                        wx.showToast({
                            title: "未获取用户信息",
                            image: n.globalData.errorImg
                        });
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "获取用户信息fail",
                    image: n.globalData.errorImg
                });
            }
        });
    },
    goPDDApp: function(t, o, i) {
        var s = this;
        s.request(e.system.getPddMinAppParam, {
            pid: o,
            goods_id: i
        }, function(a) {
            var r = a.data;
            0 == r.code ? (console.log(r.pddMinApp.page_path), wx.navigateToMiniProgram({
                appId: r.pddMinApp.appid,
                path: r.pddMinApp.page_path,
                extraData: {
                    goods_id: i,
                    pid: o
                },
                envVersion: "release",
                success: function(e) {}
            }), s.request(e.system.buyLog, {
                uid: t,
                pid: o,
                url: r.pddMinApp.page_path,
                goods_id: i,
                type: 1
            })) : wx.showToast({
                title: r.msg,
                image: n.globalData.errorImg
            });
        });
    }
};