function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t, e) {
    t.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "left top 0",
        success: function(t) {}
    }), t.animation.translate(e.currentTarget.offsetLeft - n(40), 0).step(), t.setData({
        animation: t.animation.export()
    });
}

function a(e, a) {
    wx.showLoading({
        title: "加载中，请稍后",
        mask: !0,
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    }), console.log("iPage", o), console.log("iType", a), wx.request({
        url: getApp().globalData.appUrl + "/moneylist",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId),
            code: wx.getStorageSync("real_code"),
            page: o,
            type: a
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(a) {
            if (wx.hideLoading(), console.log("getMoneylist", a), 0 == a.data.code) {
                1 == o && (i = new Array());
                for (var n = 0; n < a.data.data.records.length; n++) {
                    var r = a.data.data.records[n], c = t({
                        date: r.date,
                        fail_msg: r.fail_msg,
                        id: r.id,
                        koushui_money: r.koushui_money,
                        money: r.money,
                        real_money: r.real_money,
                        title: r.title,
                        tixian_money: r.tixian_money,
                        tixian_type: r.tixian_type,
                        type: r.type
                    }, "tixian_money", r.tixian_money);
                    i.push(c);
                }
                e.setData({
                    tixianArr: i
                }), console.log("mTiXianArr", e.data.tixianArr);
            } else wx.showToast({
                title: String(a.data.errorMsg),
                icon: "none",
                duration: 1e4,
                mask: !0,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        },
        fail: function(t) {
            wx.hideLoading();
        }
    });
}

function n(t) {
    return t / 750 * wx.getSystemInfoSync().windowWidth;
}

var o = 1, i = new Array(), r = 0;

Page({
    data: {
        animation: {},
        page_type: 0,
        jiesuanArr: [],
        tixianArr: [],
        move_left: "",
        isBuyer: !0
    },
    tabClick: function(t) {
        var n = this;
        console.log(t), e(n, t), o = 1, i = new Array(), n.setData({
            page_type: t.currentTarget.dataset.page_type,
            tixianArr: i
        }, function() {
            if (0 != n.data.page_type) {
                var t = 0;
                1 == n.data.page_type ? t = 0 : 2 == n.data.page_type && (t = 1), a(n, t);
            }
        });
    },
    onLoad: function(t) {
        var e = this, n = "";
        if (0 == (r = t.intoType) ? n = "transform: translate(0, 0px); transform - origin: left top 0px" : 1 == r ? n = "transform: translate(230rpx, 0px); transform-origin: left top 0px" : 2 == r && (n = "transform: translate(460rpx, 0px); transform - origin: left top 0px"), 
        e.setData({
            move_left: n,
            page_type: t.intoType,
            isBuyer: getApp().globalData.isBuyerLocal
        }, function() {}), 0 != e.data.page_type) {
            var o = 0;
            1 == e.data.page_type ? o = 0 : 2 == e.data.page_type && (o = 1), a(e, o);
        }
        wx.hideShareMenu({
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = this;
        if (o++, 0 != t.data.page_type) {
            var e = 0;
            1 == t.data.page_type ? e = 0 : 2 == t.data.page_type && (e = 1), a(t, e);
        }
    },
    onShareAppMessage: function() {}
});