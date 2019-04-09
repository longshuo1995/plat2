function o(o, n) {
    console.log("POST", "goods_id" + n + ",uid" + wx.getStorageSync("uid") + ",channelId" + getApp().globalData.channelId), 
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: getApp().globalData.appUrl + "/goods",
        data: {
            goods_id: n,
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(o) {
            if (console.log("GoodsDetailzzp", o), wx.hideToast(), 0 == o.data.code) {
                var n = o.data.data;
                wx.navigateToMiniProgram({
                    appId: "wx32540bd863b27570",
                    path: n.page_path,
                    envVersion: "release",
                    success: function(o) {}
                });
            }
        },
        fail: function(o) {
            console.log("GoodsDetailzzp1", goodsThis);
        }
    });
}

Page({
    data: {},
    onLoad: function(n) {
        console.log("zzp", n), "1" == n.type && o(0, n.goods_id);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});