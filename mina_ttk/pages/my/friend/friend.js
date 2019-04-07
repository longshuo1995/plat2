function t(t, a) {
    wx.showLoading({
        title: "加载中"
    }), wx.request({
        url: e.globalData.appUrl + "/findUser",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId),
            keyword: a,
            type: t.data.activeIndex
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            if (console.log("findUser", e), wx.hideLoading(), 0 == t.data.activeIndex) {
                for (var a = new Array(), i = 0; i < e.data.data.length; i++) a.push(e.data.data[i]);
                t.setData({
                    sliderLeft: "25%",
                    sliderOffset: "-50%",
                    activeIndex: 0,
                    friendArr: a,
                    isFind: !0
                }), console.log("xiaji_list", t.data.friendArr);
            } else {
                for (var a = new Array(), i = 0; i < e.data.data.length; i++) a.push(e.data.data[i]);
                t.setData({
                    sliderLeft: "75%",
                    sliderOffset: "-50%",
                    activeIndex: 1,
                    xiajiArr: a,
                    isFind: !0
                });
            }
            wx.hideLoading();
        },
        complete: function(t) {
            wx.hideLoading();
        }
    });
}

var e = getApp(), a = "上拉加载更多", i = "上拉加载更多", n = "", r = "", d = "";

Page({
    data: {
        tabs: [ "我的买家", "我的成员" ],
        activeIndex: 0,
        sliderLeft: "25%",
        sliderOffset: "-50%",
        leftpage: 1,
        rightpage: 1,
        scrollHeight: "",
        friendArr: [],
        xiajiArr: [],
        scrollTop: 0,
        scrolltip: "上拉加载更多",
        scrolltipxj: "上拉加载更多",
        leader_mobile: "",
        leader_mini_name: "",
        leader_img: "",
        rights: "",
        isShow: !1,
        user_name: "",
        leader_rights: "",
        leader_rights_num: 0,
        myPlaceholder: "输入昵称进行搜索",
        isFind: !1
    },
    goXiaJi: function(t) {
        console.log(t), wx.navigateTo({
            url: "xiaji/xiaji?xuid=" + t.currentTarget.dataset.xuid + "&id=" + t.currentTarget.dataset.id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    yao: function(t) {
        var a = this;
        console.log("yao", t), wx.showToast({
            title: "加载中",
            icon: "loading",
            mask: !0
        }), console.log("buyId", t.currentTarget.dataset.buyer_id), console.log("i", t.currentTarget.dataset.index), 
        wx.request({
            url: e.globalData.appUrl + "/invitePartner",
            data: {
                code: wx.getStorageSync("real_code"),
                openId: wx.getStorageSync("uid"),
                channelId: getApp().globalData.channelId,
                buyerId: t.currentTarget.dataset.buyer_id
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log("invitePartner", e);
                var i = a.data.friendArr;
                0 == e.data.code ? (r = e.data.data.title, d = e.data.data.img_url, wx.hideToast(), 
                i[t.currentTarget.dataset.index].is_yao = 1, a.setData({
                    isShow: !0,
                    user_name: t.currentTarget.dataset.name,
                    friendArr: i
                })) : wx.showToast({
                    title: String(e.data.errorMsg),
                    icon: "none",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                });
            },
            fail: function(t) {}
        });
    },
    sreach_del: function(t) {
        var e = this;
        n = "", this.setData({
            searchinput: "",
            friendArr: [],
            xiajiArr: [],
            leftpage: 1,
            rightpage: 1,
            isFind: !1
        }, function() {
            e.getFriendData(), e.getXiajiData();
        });
    },
    inputWord: function(t) {
        n = t.detail.value;
    },
    sreachClick: function(e) {
        var a = this;
        "" == n ? this.setData({
            searchinput: "",
            friendArr: [],
            xiajiArr: [],
            leftpage: 1,
            rightpage: 1,
            isFind: !1
        }, function() {
            a.getFriendData(), a.getXiajiData();
        }) : t(this, n);
    },
    onLoad: function(t) {
        var e = this;
        console.log("options.type", t);
        var a = "";
        1 == t.leader_rights ? a = "超级会员" : 2 == t.leader_rights ? a = "会员" : 3 == t.leader_rights && (a = "会员"), 
        e.setData({
            leader_rights: a,
            leader_rights_num: t.leader_rights
        }), wx.getSystemInfo({
            success: function(t) {
                console.log(t.windowHeight / 750 * t.windowWidth - 98), e.setData({
                    sliderLeft: "25%",
                    sliderOffset: "-50%",
                    scrollHeight: t.windowHeight / 750 * t.windowWidth - 98
                });
            }
        }), this.getFriendData(), this.getXiajiData(), wx.hideShareMenu({
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), e.setData({
            leader_mobile: t.leader_mobile,
            leader_mini_name: t.leader_mini_name,
            leader_img: t.leader_img,
            rights: t.rights
        }), 0 == t.type ? e.setData({
            sliderLeft: "25%",
            sliderOffset: "-50%",
            activeIndex: 0
        }) : e.setData({
            sliderLeft: "75%",
            sliderOffset: "-50%",
            activeIndex: 1
        });
    },
    tabClick0: function(t) {
        this.setData({
            sliderLeft: "25%",
            sliderOffset: "-50%",
            activeIndex: t.currentTarget.id,
            myPlaceholder: "输入昵称进行搜索"
        });
    },
    tabClick1: function(t) {
        this.setData({
            sliderLeft: "75%",
            sliderOffset: "-50%",
            activeIndex: t.currentTarget.id,
            myPlaceholder: "输入手机号或昵称进行搜索"
        });
    },
    getFriendData: function(t) {
        var i = this;
        wx.request({
            url: e.globalData.appUrl + "/nextlevel",
            data: {
                openId: wx.getStorageSync("uid"),
                channelId: String(getApp().globalData.channelId),
                page: i.data.leftpage,
                type: 0
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (null != t.data.data && "" != t.data.data && t.data.data.details.length > 0) {
                    var e = i.data.friendArr;
                    console.log("friend_list.length", t.data.data.details.length < 10), t.data.data.details.length < 10 && (a = "没有更多好友了", 
                    i.setData({
                        scrolltip: a
                    }), console.log("scrolltip", a));
                    for (var n = 0; n < t.data.data.details.length; n++) e.push(t.data.data.details[n]);
                    i.setData({
                        friendArr: e,
                        leftpage: i.data.leftpage + 1
                    });
                }
                console.log(t.data.data);
            },
            complete: function(t) {}
        });
    },
    getXiajiData: function() {
        var t = this;
        wx.request({
            url: e.globalData.appUrl + "/nextlevel",
            data: {
                openId: wx.getStorageSync("uid"),
                channelId: String(getApp().globalData.channelId),
                page: t.data.rightpage,
                type: 1
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                if (null != e.data.data && "" != e.data.data && e.data.data.details.length > 0) {
                    var a = t.data.xiajiArr;
                    e.data.data.details.length < 10 && (i = "没有更多下级了", t.setData({
                        scrolltipxj: i
                    }));
                    for (var n = 0; n < e.data.data.details.length; n++) a.push(e.data.data.details[n]);
                    t.setData({
                        xiajiArr: a,
                        rightpage: t.data.rightpage + 1
                    });
                }
                console.log(e.data.data);
            },
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        getApp().globalData.isTestCode && wx.setNavigationBarTitle({
            title: "我的团队(" + wx.getStorageSync("real_code") + ")",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    scroll: function(t) {},
    pullupload: function(t) {},
    onReachBottom: function() {
        var t = this;
        1 == t.data.activeIndex ? (i = "没有更多下级了", t.setData({
            scrolltipxj: i
        }), t.getXiajiData(1)) : (a = "没有更多好友了", t.setData({
            scrolltip: a
        }), t.getFriendData());
    },
    onShareAppMessage: function(t) {
        return this.setData({
            isShow: !1
        }), {
            title: r,
            path: "pages/index/index?real_code=" + wx.getStorageSync("real_code"),
            imageUrl: d
        };
    },
    px2rpx: function(t) {
        return t / 750 * wx.getSystemInfoSync().windowWidth;
    }
});