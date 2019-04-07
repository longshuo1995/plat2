function a(a) {
    wx.request({
        url: getApp().globalData.appUrl + "/getInvitation",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId),
            code: wx.getStorageSync("real_code")
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(a) {
            console.log("setRealCode", a), "" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || ("" != a.data.data || t("undefined" != a.data.data)) && wx.setStorageSync("real_code", a.data.data), 
            wx.navigateBack({});
        },
        fail: function(a) {
            wx.hideLoading();
        }
    });
}

var e, t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a;
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
}, o = getApp(), n = 0, c = "";

Page({
    data: {
        typeMy: ""
    },
    wxauthorize: function(t) {
        console.log(t.detail);
        var d = this;
        t.detail;
        wx.login({
            success: function(t) {
                console.log("login", t), wx.getUserInfo({
                    success: function(i) {
                        var r = t.code, l = wx.getStorageSync("real_code");
                        console.log("real_code", wx.getStorageSync("real_code")), null != wx.getStorageSync("real_code") && "" != wx.getStorageSync("real_code") && void 0 != wx.getStorageSync("real_code") && "undefined" != wx.getStorageSync("real_code") || (l = ""), 
                        wx.request({
                            url: o.globalData.appUrl + "/weixinAuth",
                            data: {
                                js_code: r,
                                encryptedData: i.encryptedData,
                                code: l,
                                siv: i.iv,
                                openId: wx.getStorageSync("uid"),
                                channelId: getApp().globalData.channelId
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                if (console.log("weixinAuth", t), 0 == t.data.code) {
                                    "" == t.data.data.uid && void 0 === t.data.data.uid || wx.setStorageSync("uid", t.data.data.uid), 
                                    "" == t.data.data.real_code && void 0 === t.data.data.real_code || wx.setStorageSync("real_code", t.data.data.real_code), 
                                    wx.setStorageSync("isScope", !0), console.log(wx.getStorageSync("real_code")), o.globalData.isScopeUserInfo = !0, 
                                    d.setData({
                                        isWarrant: !0
                                    }), 1 == t.data.data.type && (d.setData({
                                        isBuyer: !1
                                    }), o.globalData.isBuyerLocal = !1), 0 == t.data.data.type && (d.setData({
                                        isBuyer: !0
                                    }), o.globalData.isBuyerLocal = !0), wx.getUserInfo({
                                        success: function(a) {
                                            var e = a.userInfo.nickName;
                                            d.setData({
                                                nickname: e,
                                                avatar: a.userInfo.avatarUrl
                                            });
                                        }
                                    }), console.log(d.data.isWarrant), console.log(d.data.isBuyer), console.log(d.data.rights);
                                    var i = getCurrentPages(), r = (i[i.length - 1], i[i.length - 2]), l = d.data.typeMy;
                                    r.setData({
                                        isOld: t.data.data.isOld,
                                        goToType: l,
                                        goods_type: n,
                                        goods_type_prop: c,
                                        goods_id: e,
                                        isScopeFinish: !0,
                                        needGoFree: !0
                                    }), a();
                                } else 5 == t.data.code ? (wx.setStorageSync("isScope", !0), "" == t.data.data.uid && void 0 !== t.data.data.uid || wx.setStorageSync("uid", t.data.data.uid), 
                                "" == t.data.data.real_code && void 0 === t.data.data.real_code || wx.setStorageSync("real_code", t.data.data.real_code), 
                                wx.navigateBack({
                                    delta: 1
                                })) : (wx.showToast({
                                    title: String(t.data.errorMsg),
                                    icon: "none",
                                    duration: 1e3,
                                    mask: !0,
                                    success: function(a) {},
                                    fail: function(a) {},
                                    complete: function(a) {}
                                }), o.globalData.isScopeUserInfo = !1);
                            }
                        });
                    },
                    fail: function(a) {
                        console.log("获取用户信息失败"), o.globalData.isScopeUserInfo = !1, wx.showToast({
                            title: String("获取用户信息失败，请重新授权"),
                            icon: "none",
                            duration: 1e3,
                            mask: !0,
                            success: function(a) {},
                            fail: function(a) {},
                            complete: function(a) {}
                        });
                    }
                });
            },
            fail: function(a) {
                console.log(a.data.data.errorMsg), wx.showToast({
                    title: String(a.data.data.errorMsg),
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(a) {},
                    fail: function(a) {},
                    complete: function(a) {}
                });
            }
        });
    },
    onLoad: function(a) {
        e = a.goods_id, n = a.goods_type, c = a.goods_type_prop, this.setData({
            typeMy: a.typeMy
        }), wx.hideShareMenu({
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});