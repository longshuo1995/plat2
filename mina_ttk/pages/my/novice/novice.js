Page({
    data: {
        xinshou_url: ""
    },
    onLoad: function(n) {
        console.log(n.xinsourl), this.setData({
            xinshou_url: n.xinsourl
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});