function t(t) {
    wx.request({
        url: getApp().globalData.appUrl + "/getSwitch",
        data: {
            uid: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            if (console.log("getSwitch", e), 1 == e.data.data.free_flag) if (t.setData({
                free_url: e.data.data.free_url
            }), 1 == getApp().globalData.cuTabBarPos && 1 == getApp().globalData.isWebViewOut) wx.switchTab({
                url: "../index/index",
                success: function(t) {
                    getApp().globalData.isWebViewOut = !1;
                },
                fail: function(t) {},
                complete: function(t) {}
            }); else {
                var a = encodeURIComponent(t.data.free_url);
                wx.navigateTo({
                    url: "../webview/webview?xinsourl=" + a
                });
            } else wx.showToast({
                title: String(e.data.data.errorMsg),
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(t) {
                    setTimeout(function() {
                        wx.switchTab({
                            url: "../index/index",
                            success: function(t) {},
                            fail: function(t) {},
                            complete: function(t) {}
                        });
                    }, 1e3);
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        },
        fail: function(t) {}
    });
}

Page({
    data: {
        canvasShow: "none",
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        free_url: ""
    },
    drawImageSinge: function(t) {
        drawShareImage(this);
    },
    drawImage: function(t) {
        drawMultiShareImage(this);
    },
    onLoad: function(t) {},
    swichNav: function(t) {
        var e = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        e.setData({
            currentTab: t.target.dataset.current
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        getApp().globalData.cuTabBarPos = 1, t(e);
    },
    onHide: function() {
        getApp().globalData.isWebViewOut = !0;
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});