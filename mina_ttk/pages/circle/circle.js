function n(n, t) {
    n.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "left top 0",
        success: function(n) {}
    }), n.animation.translate(t.currentTarget.offsetLeft, 0).step(), n.setData({
        animation: n.animation.export()
    });
}

Page({
    data: {
        animation: {}
    },
    tabClick: function(t) {
        var o = this;
        console.log(t), wx.getNetworkType({
            success: function(i) {
                var a = !0;
                (a = "none" != i.networkType) ? (n(o, t), wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                })) : wx.showToast({
                    title: "当前无网络",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(n) {},
                    fail: function(n) {},
                    complete: function(n) {}
                }), o.setData({
                    networkType: a
                });
            }
        });
    },
    translate: function() {
        this.animation.translate(100, 0).step(), this.setData({
            animation: this.animation.export()
        });
    },
    onLoad: function(n) {
        wx.setNavigationBarTitle({
            title: "推圈"
        }), this.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease-out",
            delay: 0
        }), wx.hideShareMenu({
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
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