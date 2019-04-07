var e, o = "", n = 0, t = "", i = 0;

Page({
    data: {
        xinshou_url: ""
    },
    onLoad: function(a) {
        e = decodeURIComponent(a.xinsourl), o = e, t = a.banner_id, console.log("web121111", a), 
        "" != a.theme_title && void 0 !== a.theme_title && wx.setNavigationBarTitle({
            title: a.theme_title,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }), "" != a.intoType && void 0 !== a.intoType && (n = a.intoType), console.log("isShareBtn", o.search("isShareBtn=1")), 
        i = -1 != o.search("isShareBtn=1") ? 1 : 0, console.log("intoType", n), console.log("isShareBtn", i), 
        4 == n || 1 == i || 5 == n ? wx.hideShareMenu({
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : (console.log("11111111111111111", i), wx.showShareMenu({
            withShareTicket: !0,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }));
    },
    onReady: function() {},
    onShow: function() {
        var n = this;
        console.log("webview", o);
        var t = o.split("uid=");
        console.log("sss", t), "" == t[1] && (o += wx.getStorageSync("uid")), getApp().globalData.isTestCode, 
        n.setData({
            xinshou_url: e
        });
    },
    onHide: function() {
        var e = this;
        console.log("intoType", n), 4 == n && e.setData({
            xinshou_url: ""
        });
    },
    onUnload: function() {
        4 == n && (getApp().globalData.isWebViewOut = !0);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        return console.log("banner_id", n), e.from, {
            title: getApp().globalData.shareTitle,
            path: "pages/index/index?real_code=" + wx.getStorageSync("real_code") + "&type=0",
            imageUrl: getApp().globalData.shareImageUrl
        };
    }
});