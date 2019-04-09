function e(e) {
    var n = 1;
    e.data.num > 1 && (n = 0), wx.request({
        url: getApp().globalData.appUrl + "/sendcode",
        data: {
            mobile: t,
            first: n
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            0 == t.data.code && null != t.data.data && (a = t.data.data, console.log("111", a), 
            e.countdown(), e.setData({
                checkcode: t.data.data,
                codebtndisbled: !0
            })), 99 == t.data.code && wx.showToast({
                title: String(t.data.errorMsg),
                icon: "none",
                mask: !0
            });
            var n = e.data.num + 1;
            e.setData({
                num: n
            }), console.log(t);
        },
        fail: function(e) {
            console.log(e), wx.showToast({
                title: String(e),
                icon: "none",
                mask: !0
            });
        }
    });
}

var t = "", n = "", a = "", o = null;

Page({
    data: {
        name: "",
        phone: "",
        reg_time: "",
        parentCode: "",
        isBuyer: !0,
        isWarrant: getApp().globalData.isScopeUserInfo,
        hiddenmodalput: !0,
        num: 0,
        checkcode: "",
        agreement_no: "",
        agreeUrl: "",
        quanyi_faq: "",
        isB: !1,
        time: "获取验证码",
        currentTime: 60,
        codebtndisbled: !1,
        leader_rights: "",
        leader_rights_str: "",
        rights_str: "",
        inputPhone: "",
        inputSms: ""
    },
    countdown: function() {
        var e = this, t = e.data.currentTime;
        o = setInterval(function() {
            t--, e.setData({
                currentTime: t,
                time: "重新发送 " + t
            }), t <= 0 && (clearInterval(o), e.setData({
                time: "重新发送",
                currentTime: 60,
                codebtndisbled: !1
            }));
        }, 1e3);
    },
    goFaq: function(e) {
        var t = encodeURIComponent(this.data.quanyi_faq);
        wx.navigateTo({
            url: "../../webview/webview?xinsourl=" + t
        });
    },
    bindAccount: function(e) {
        var a = this;
        "" != t && null != t ? "" != this.data.smscode ? "" != n && "undefined" != n ? (a.setData({
            bindbtndis: !0
        }), this.bindRequest()) : wx.showToast({
            title: "验证码错误",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入验证码",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入手机号",
            icon: "none",
            duration: 2e3
        });
    },
    bindRequest: function() {
        var e = this;
        "" == a ? wx.showToast({
            title: "请先获取验证码",
            icon: "none",
            duration: 1e3,
            mask: !0,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : (console.log(t), console.log(a), console.log(n), console.log(e.data.agreement_no), 
        console.log(wx.getStorageSync("uid")), console.log(String(getApp().globalData.channelId)), 
        wx.request({
            url: getApp().globalData.appUrl + "/bind",
            data: {
                mobile: t,
                mark: a,
                code: n,
                agreement_no: e.data.agreement_no,
                openId: wx.getStorageSync("uid"),
                channelId: String(getApp().globalData.channelId)
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(n) {
                console.log("bindRequest", n.data), 0 == n.data.code ? (wx.showToast({
                    title: "绑定成功！",
                    icon: "success",
                    duration: 1e3
                }), e.setData({
                    hiddenmodalput: !0,
                    phone: t
                })) : wx.showToast({
                    title: n.data.errorMsg,
                    icon: "none",
                    mask: !0
                });
            },
            fail: function(e) {
                console.log(e);
            },
            complete: function(t) {
                console.log(t), e.setData({
                    bindbtndis: !1
                });
            }
        }));
    },
    inputPhone: function(e) {
        t = e.detail.value;
    },
    sendCodeClick: function(n) {
        console.log(n), "" != t ? e(this) : wx.showToast({
            title: "请输入手机号",
            icon: "none",
            duration: 1e3,
            mask: !0,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    goWeb: function(e) {
        var t = encodeURIComponent(getApp().globalData.appUrlJi + "/h5/rights?openId=" + wx.getStorageSync("uid"));
        this.data.leader_rights_str;
        wx.navigateTo({
            url: "../../webview/webview?xinsourl=" + t
        });
    },
    cancel: function() {
        this.setData({
            hiddenmodalput: !0,
            inputPhone: "",
            inputSms: ""
        }), t = "", n = "";
    },
    confirm: function() {
        this.setData({
            hiddenmodalput: !0
        });
    },
    gotoBind: function(e) {
        this.setData({
            hiddenmodalput: !1
        });
    },
    inputSms: function(e) {
        n = e.detail.value;
    },
    onLoad: function(e) {
        console.log("ddd", e);
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? (getApp().globalData.isScopeUserInfo = !0, t.setData({
                    isWarrant: !0
                }), wx.getUserInfo({
                    success: function(e) {
                        console.log("res", e);
                        var n = e.userInfo.nickName;
                        t.setData({
                            name: n,
                            avatar: e.userInfo.avatarUrl
                        });
                    }
                })) : (t.setData({
                    isWarrant: !1
                }), getApp().globalData.isScopeUserInfo = !1);
            }
        }), wx.request({
            url: getApp().globalData.appUrl + "/getServiceUrl",
            data: {},
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log("xieyi", e.data.data), t.setData({
                    agreement_no: e.data.data.agreement_no,
                    agreeUrl: e.data.data.agreement_url
                });
            }
        });
        var n = "";
        1 == e.leader_rights || 0 == e.leader_rights ? n = "超级会员" : 2 == e.leader_rights ? n = "会员" : 3 == e.leader_rights && (n = "会员"), 
        console.log("options.leader_rights", e.leader_rights);
        var a = e.memberName;
        this.setData({
            name: e.name,
            phone: e.phone,
            reg_time: e.reg_time,
            parentCode: e.parentCode,
            isBuyer: e.isBuyer,
            auth_time: e.auth_time,
            quanyi_faq: e.quanyi_faq,
            leader_rights: e.leader_rights,
            leader_rights_str: n,
            rights_str: a
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});