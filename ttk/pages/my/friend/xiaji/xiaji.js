function t(t, e) {
    console.log("xuid", e), console.log("id", n), wx.request({
        url: getApp().globalData.appUrl + "/myNextlevel",
        data: {
            openId: e,
            channelId: String(getApp().globalData.channelId),
            page: a,
            type: 1,
            duokeId: n
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(a) {
            if (console.log("getOrtherXiaji", a), null != a.data.data && "" != a.data.data && a.data.data.details.length > 0) {
                var e = [];
                e = t.data.friendArr, console.log("friend_list.length", a.data.data.details.length < 10), 
                a.data.data.details.length < 10 && (o = "没有更多好友了", t.setData({
                    scrolltip: o
                }), console.log("scrolltip", o));
                for (var n = 0; n < a.data.data.details.length; n++) e.push(a.data.data.details[n]);
                t.setData({
                    friendArr: e,
                    leftpage: t.data.leftpage + 1
                });
            }
            console.log(a.data.data);
        },
        complete: function(t) {}
    });
}

var a = 1, e = "", n = "", o = "";

Page({
    data: {
        friendArr: []
    },
    onLoad: function(a) {
        e = a.xuid, n = a.id, wx.hideShareMenu({
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), t(this, a.xuid);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        a = 0, t(this, options.xuid);
    },
    onReachBottom: function() {
        a++, t(this, e);
    },
    onShareAppMessage: function() {}
});