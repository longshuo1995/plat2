App({
    onLaunch: function() {
        var a = wx.getUpdateManager();
        a.onCheckForUpdate(function(a) {
            a.hasUpdate && wx.showToast({
                title: "发现新版本，立即更新请稍后",
                icon: "none",
                duration: 2e4
            });
        }), a.onUpdateReady(function() {
            a.applyUpdate(), console.log("onUpdateReady", " ");
        }), a.onUpdateFailed(function() {});
        var e = wx.getStorageSync("logs") || [];
        e.unshift(Date.now()), wx.setStorageSync("logs", e);
    },
    globalData: {
        appUrl: "https://small.mijian88.com",
        appUrlJi: "https://small.mijian88.com.cn",
        miandanUrl: "https://md.mijian88.com.cn/md",
        zhuliUrl: "https://small.mijian88.com.cn/h5/zhuliIndex",
        isScopeUserInfo: !1,
        channelId: 1001,
        isBuyerLocal: !0,
        shareTitle: "",
        shareImageUrl: "",
        isIphoneX: !1,
        isIphoneXForGoods: !1,
        cuTabBarPos: 0,
        isWebViewOut: !1,
        isFreeback: 0,
        isTestCode: !1,
        isX5S: !1,
        miniVer: "2.0.2"
    }
});