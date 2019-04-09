Page({
    data: {
        ver: "2.0"
    },
    onLoad: function(n) {
        wx.hideShareMenu({
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            ver: getApp().globalData.miniVer
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});