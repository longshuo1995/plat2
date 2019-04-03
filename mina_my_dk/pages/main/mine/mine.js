var a = require("../../../489D67D23FACD8FF2EFB0FD52770D606.js"), t = require("../../../A30975103FACD8FFC56F1D17A6EFC606.js"), e = (require("../../../E4FFED713FACD8FF829985763340D606.js"), 
getApp()), o = void 0;

Page({
    data: {
        imgHost: e.globalData.imgHost,
        wxUser: {},
        accountInfo: {},
        money: null,
        vipNav: null,
        myNav: null,
        pageNum: 1,
        reach: !0,
        likeGoodsList: [],
        user: "",
        withdrawalBack: !1
    },
    onLoad: function(a) {
        o = this;
        var t = wx.getStorageSync("wxUser");
        t && o.setData({
            wxUser: t
        }), o.accountInfo(), o.getVipNav(), o.getMyNav(), t.mcode || o.getLike(), wx.getUserInfo({
            withCredentials: !0,
            success: function(a) {
                o.setData({
                    user: encodeURIComponent(JSON.stringify({
                        userinfo: a.userInfo
                    }))
                });
            },
            fail: function(a) {}
        });
    },
    onShow: function() {
        o.data.withdrawalBack && (o.accountInfo(), o.setData({
            withdrawalBack: !1
        }));
    },
    onTabItemTap: function(a) {
        wx.setStorageSync("isFirst", !1);
    },
    withdrawal: function() {
        wx.getStorageSync("wxUser");
        o.data.accountInfo.withdrawal ? a.request(t.mine.index.allowWithdrawal, {}, function(a) {
            var t = a.data;
            t.data ? 1 == t.type ? wx.navigateTo({
                url: "/pages/mine/withdrawal/index/index"
            }) : (o.getUserBank(function() {
                if (!o.data.bank || 0 == o.data.bank.status || 3 == o.data.bank.status) {
                    if (o.data.bankExamined && 2 == o.data.bankExamined.status) return void wx.showModal({
                        title: "提示",
                        content: "您的银行卡绑定申请正在审核中，请耐心等待",
                        showCancel: !1
                    });
                    o.setData({
                        showBindBank: !0
                    });
                }
            }), wx.navigateTo({
                url: "/pages/withdraw/apply/apply"
            })) : wx.showModal({
                title: "提示",
                content: "提现金额结算中，暂不可提现，请稍后再试！",
                showCancel: !1
            });
        }) : wx.showModal({
            title: "提示",
            content: "提现金额结算中，暂不可提现，请稍后再试！",
            showCancel: !1
        });
    },
    accountInfo: function() {
        wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), a.request(t.mine.index.accountInfo, {
            uid: o.data.wxUser.id
        }, function(a) {
            var t = a.data;
            0 == t.code ? (o.setData({
                accountInfo: t.teamMap
            }), t.teamMap.withdrawal ? o.setData({
                money: "¥" + t.teamMap.money
            }) : o.setData({
                money: "结算中..."
            }), wx.hideLoading()) : wx.showToast({
                title: t.msg,
                image: e.globalData.errorImg
            });
        }, function(a) {
            wx.showToast({
                title: "未获取个人信息",
                image: e.globalData.errorImg
            });
        });
    },
    copyMcode: function() {
        wx.setClipboardData({
            data: "" + o.data.wxUser.mcode,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {
                        wx.showToast({
                            title: "邀请码已复制"
                        });
                    }
                });
            }
        });
    },
    getVipNav: function() {
        a.request(t.home.index.getNav, {
            role: o.data.wxUser.role,
            buttonType: 12
        }, function(a) {
            var t = a.data;
            0 == t.code ? o.setData({
                vipNav: t.data
            }) : wx.showToast({
                title: t.msg,
                image: e.globalData.errorImg
            });
        }, function(a) {
            wx.showToast({
                title: "未获取会员服务",
                image: e.globalData.errorImg
            });
        });
    },
    getMyNav: function() {
        a.request(t.home.index.getNav, {
            role: o.data.wxUser.role,
            buttonType: 13
        }, function(a) {
            var t = a.data;
            0 == t.code ? o.setData({
                myNav: t.data
            }) : wx.showToast({
                title: t.msg,
                image: e.globalData.errorImg
            });
        }, function(a) {
            wx.showToast({
                title: "未获取我的功能",
                image: e.globalData.errorImg
            });
        });
    },
    goodsDetails: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/main/goodsDetails/goodsDetails?goods_id=" + t
        });
    },
    getLike: function() {
        wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), a.request(t.mine.index.recommendGood, {
            sort_type: 0,
            uid: o.data.wxUser.id,
            pageNum: o.data.pageNum
        }, function(a) {
            var t = a.data;
            if (0 == t.code) {
                var n = o.data.pageNum + 1, i = t.data, s = o.data.likeGoodsList.concat(i);
                i.length <= 0 ? (o.setData({
                    reach: !1
                }), wx.hideLoading()) : (o.setData({
                    likeGoodsList: s,
                    pageNum: n
                }), wx.hideLoading());
            } else wx.showToast({
                title: t.msg,
                image: e.globalData.errorImg
            });
        });
    },
    goPDDApp: function(t) {
        var n = t.target.dataset.item, i = o.data.wxUser.pid;
        i && "undefined" != i || (i = o.data.wxUser.bind_pid) && "undefined" != i || (i = e.globalData.default_pid), 
        a.goPDDApp(o.data.wxUser.id, i, n.goods_id);
    },
    onPullDownRefresh: function() {
        wx.reLaunch({
            url: "/pages/main/mine/mine"
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        o.data.reach && 0 == o.data.wxUser.role && o.getLike();
    },
    obstacle: function() {}
});