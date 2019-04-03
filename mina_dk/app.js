var t = "https://pic.duoke678.com", e = "https://duoke678.com";

App({
    onLaunch: function() {
        var t = wx.getStorageSync("wxUser");
        this.getBlocks(), t && t.mcode && t.pid2 && (t.pid = t.pid2, wx.setStorageSync("wxUser", t));
        var e = wx.getUpdateManager();
        e.onCheckForUpdate(function(t) {}), e.onUpdateReady(function() {
            e.applyUpdate();
        }), e.onUpdateFailed(function() {}), this.checkFindNew();
    },
    onShow: function() {
        this.getBlocks(), 1 == wx.getStorageSync("isFirst") && this.checkFindNew();
    },
    checkFindNew: function() {
        var t = this;
        wx.request({
            url: e + "/pdd/config/getFindRead",
            data: {},
            success: function(e) {
                var a = e.data;
                if (0 == a.code) {
                    var o = wx.getStorageSync("findNew"), d = a.data, i = wx.getStorageSync("findDot");
                    i || (i = {
                        dot_fx: !0,
                        dot_tj: !0,
                        dot_yc: !0,
                        dot_sc: !0,
                        dot_xs: !0
                    }), o && (o.find_gf_id != d.find_gf_id && (i.dot_sc = !0), o.find_tj_id != d.find_tj_id && (i.dot_tj = !0), 
                    o.find_xs_id != d.find_xs_id && (i.dot_xs = !0), o.find_yc_id != d.find_yc_id && (i.dot_yc = !0), 
                    console.log(i), (i.dot_sc || i.dot_tj || i.dot_xs || i.dot_yc) && (i.dot_fx = !0)), 
                    wx.setStorageSync("findNew", d), wx.setStorageSync("findDot", i), i.dot_fx ? wx.showTabBarRedDot({
                        index: 1
                    }) : wx.hideTabBarRedDot({
                        index: 1
                    });
                } else wx.showToast({
                    title: a.msg,
                    image: t.globalData.errorImg
                });
            },
            fail: function() {
                wx.showToast({
                    title: "获取新发现fail",
                    image: t.globalData.errorImg
                });
            }
        });
    },
    getBlocks: function() {
        var t = this, a = wx.getStorageSync("blacks");
        if (a) {
            var o = a.endTime, d = new Date().getTime();
            d - o > 36e5 ? wx.request({
                url: e + "/pdd/config/blacks",
                data: {},
                success: function(e) {
                    var a = {};
                    a.list = e.data.data, a.endTime = d, wx.setStorageSync("blacks", a), t.checkBlack(a.list);
                }
            }) : this.checkBlack(a.list);
        } else wx.request({
            url: e + "/pdd/config/blacks",
            data: {},
            success: function(e) {
                var a = {};
                a.list = e.data.data, a.endTime = new Date().getTime(), wx.setStorageSync("blacks", a), 
                t.checkBlack(a.list);
            }
        });
    },
    checkBlack: function(t) {
        var e = wx.getStorageSync("wxUser");
        t.forEach(function(t) {
            t == e.id && wx.reLaunch({
                url: "/pages/common/blacklist/blacklist"
            });
        });
    },
    globalData: {
        url: e,
        pic_url: t,
        default_pid: "",
        app_id: "",
        imgHost: "https://aloss.duoke678.com/wechat/dkNew/img",
        imgHostUpload: "https://aloss.duoke678.com/wechat/dkNew/upload",
        errorImg: "/img/error.png",
        user_imgs_path: t + "/user_imgs"
    }
});