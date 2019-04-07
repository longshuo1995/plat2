function e(e) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: getApp().globalData.appUrl + "/shareList",
        data: {
            code: wx.getStorageSync("real_code"),
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            type: 4
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            0 == e.data.code ? (console.log("getShareInfo", e), o = e.data.data.title, t = e.data.data.image_url) : wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                mask: !0
            });
        }
    });
}

var o, t, n = require("../../utils/util.js");

Page({
    data: {
        openId: ""
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        var o = this;
        e(), o.setData({
            openId: wx.getStorageSync("uid")
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        return console.log("real_code", wx.getStorageSync("real_code")), e.from, {
            title: o,
            path: "pages/index/index?real_code=" + wx.getStorageSync("real_code") + "&type=8",
            imageUrl: t
        };
    },
    goto1: function() {
        var e = encodeURIComponent(getApp().globalData.zhuliUrl + "?uid=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId);
        console.log(e), wx.navigateTo({
            url: "../webview/webview?xinsourl=" + e + "&intoType=5"
        });
    },
    goto2: function() {
        n.goFree(this);
    }
});