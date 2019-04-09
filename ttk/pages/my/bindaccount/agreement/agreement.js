Page({
    data: {
        agree_url: ""
    },
    onLoad: function(n) {
        console.log(n.agreeUrl), this.setData({
            agree_url: n.agreeUrl
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