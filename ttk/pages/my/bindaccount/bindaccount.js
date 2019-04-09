var e = getApp(), t = null, a = "", o = "";

Page({
    data: {
        isWarrant: e.globalData.isScopeUserInfo,
        into_type: "",
        phone: "",
        smscode: "",
        checkcode: "",
        num: 1,
        codebtndisbled: !1,
        time: "获取验证码",
        currentTime: 60,
        yao_code: "",
        Agreement: 0,
        nickname: "未授权",
        agreeUrl: "",
        agreement_no: "",
        isAgreement: !1,
        bindbtndis: !1,
        goods_id: "",
        isJudge: !1,
        isFreeorder: !1
    },
    onLoad: function(t) {
        var n = this;
        0 == t.into_type && n.setData({
            into_type: t.into_type,
            isJudge: !0
        }), t.isFreeorder && (n.setData({
            isFreeorder: !0
        }), wx.setNavigationBarTitle({
            title: "注册享返现"
        })), t.goods_id && (a = t.goods_type_prop, o = t.goods_type, n.setData({
            goods_id: t.goods_id
        })), 1 == t.into_type && n.setData({
            into_type: t.into_type,
            isJudge: !0
        }), wx.request({
            url: e.globalData.appUrl + "/getServiceUrl",
            data: {},
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log("xieyi", e.data.data), n.setData({
                    agreement_no: e.data.data.agreement_no,
                    agreeUrl: e.data.data.agreement_url
                });
            }
        });
    },
    setTitle: function(e) {
        wx.setNavigationBarTitle({
            title: e
        });
    },
    wxauthorize: function(t) {
        var a = this;
        wx.login({
            success: function(t) {
                wx.getUserInfo({
                    success: function(o) {
                        var n = t.code, i = o.userInfo.nickName, s = wx.getStorageSync("real_code");
                        null != s && "undefined" != s || (s = "");
                        var d = wx.getStorageSync("uid");
                        null != d && "undefined" != d && "" != d && void 0 != d || (d = ""), console.log("js_code", n), 
                        console.log("code", s), console.log("openId", wx.getStorageSync("uid")), wx.request({
                            url: e.globalData.appUrl + "/weixinAuth",
                            data: {
                                js_code: n,
                                encryptedData: o.encryptedData,
                                code: s,
                                siv: o.iv,
                                openId: d,
                                channelId: getApp().globalData.channelId
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                if (console.log("weixinAuth", t), 0 == t.data.code) {
                                    if (wx.setStorageSync("uid", t.data.data.uid), "" == t.data.data.real_code && void 0 === t.data.data.real_code || wx.setStorageSync("real_code", t.data.data.real_code), 
                                    e.globalData.isScopeUserInfo = !0, a.setData({
                                        isWarrant: !0,
                                        nickname: i
                                    }), 1 == t.data.data.type) {
                                        a.setData({
                                            isWarrant: !0,
                                            isBuyer: !1
                                        }), e.globalData.isBuyerLocal = !1, wx.showToast({
                                            title: "您已是推手",
                                            icon: "none",
                                            duration: 1500
                                        }), console.log("isfree", a.data.isFreeorder);
                                        setTimeout(function() {
                                            a.data.isFreeorder ? wx.navigateBack({
                                                delta: 1
                                            }) : wx.switchTab({
                                                url: "../../index/index"
                                            });
                                        }, 1500);
                                    }
                                    0 == t.data.data.type && (a.setData({
                                        isWarrant: !0,
                                        isBuyer: !0
                                    }), e.globalData.isBuyerLocal = !0);
                                } else wx.showToast({
                                    title: t.data.errMsg,
                                    icon: "none",
                                    duration: 1e3,
                                    mask: !0,
                                    success: function(e) {},
                                    fail: function(e) {},
                                    complete: function(e) {}
                                }), e.globalData.isScopeUserInfo = !1;
                            }
                        });
                    },
                    fail: function() {
                        console.log("获取用户信息失败"), e.globalData.isScopeUserInfo = !1;
                    }
                });
            },
            fail: function(e) {
                console.log(e.data.data.errorMsg);
            }
        });
    },
    checkboxChange: function() {
        var e = this;
        this.setData({
            isAgreement: !e.data.isAgreement
        });
    },
    phoneInput: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    codeInput: function(e) {
        this.setData({
            smscode: e.detail.value
        });
    },
    countdown: function() {
        var e = this, a = e.data.currentTime;
        t = setInterval(function() {
            a--, e.setData({
                currentTime: a,
                time: "重新发送 " + a
            }), a <= 0 && (clearInterval(t), e.setData({
                time: "重新发送",
                currentTime: 60,
                codebtndisbled: !1
            }));
        }, 1e3);
    },
    getCode: function(t) {
        this.setData({
            codefocus: !0
        });
        var a = this;
        if ("" != this.data.phone && null != this.data.phone) {
            if (wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.userInfo"] ? (e.globalData.isScopeUserInfo = !0, a.setData({
                        isWarrant: !0
                    })) : (wx.showModal({
                        title: "需要微信授权",
                        content: "您未微信授权，无法加入推推客，请点击【微信授权】按钮，授权成功后再申请加入",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && console.log("用户点击确定");
                        }
                    }), a.setData({
                        isWarrant: !1
                    }), e.globalData.isScopeUserInfo = !1);
                }
            }), a.data.isWarrant) {
                this.countdown(), a.setData({
                    codebtndisbled: !0
                });
                var o = 1;
                a.data.num > 1 && (o = 0), wx.request({
                    url: e.globalData.appUrl + "/sendcode",
                    data: {
                        mobile: a.data.phone,
                        first: o
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        0 == e.data.code && null != e.data.data && a.setData({
                            checkcode: e.data.data
                        }), 99 == e.data.code && wx.showToast({
                            title: String(e.data.errorMsg),
                            icon: "none",
                            mask: !0
                        });
                        var t = a.data.num + 1;
                        a.setData({
                            num: t
                        }), console.log(e);
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
        } else wx.showToast({
            title: "请输入手机号",
            icon: "none",
            duration: 2e3
        });
    },
    bindAccount: function(t) {
        var a = this;
        if ("" != this.data.phone && null != this.data.phone) if ("" != this.data.smscode) if (this.data.isAgreement) if ("" != a.data.checkcode && "undefined" != a.data.checkcode) {
            a.setData({
                bindbtndis: !0
            });
            var o = wx.getStorageSync("real_code");
            "undefined" != o && null != o || (o = ""), console.log(1 == a.data.into_type), 1 == a.data.into_type ? wx.request({
                url: e.globalData.appUrl + "/myinfo",
                data: {
                    code: o,
                    openId: wx.getStorageSync("uid"),
                    channelId: String(getApp().globalData.channelId)
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    if (console.log(t.data.data), 0 == t.data.code && null != t.data.data) {
                        var o = t.data.data;
                        if (0 == o.type) e.globalData.isBuyerLocal = !0, a.bindRequest(); else if (1 == o.type) {
                            e.globalData.isBuyerLocal = !1, wx.showToast({
                                title: "您已是推手",
                                icon: "none",
                                duration: 1500
                            });
                            setTimeout(function() {
                                a.data.isFreeorder ? wx.navigateBack({
                                    delta: 1
                                }) : wx.switchTab({
                                    url: "../../index/index"
                                });
                            }, 1500);
                        } else 2 == o.type && (wx.showToast({
                            title: "您未授权",
                            icon: "none",
                            duration: 1500
                        }), a.setData({
                            isWarrant: !1,
                            isBuyer: !0
                        }), e.globalData.isScopeUserInfo = !1);
                    }
                }
            }) : this.bindRequest();
        } else wx.showToast({
            title: "验证码错误",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "未阅读和同意用户协议",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请输入验证码",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请输入手机号",
            icon: "none",
            duration: 2e3
        });
    },
    bindRequest: function() {
        var t = this;
        console.log(t.data.phone), console.log(t.data.checkcode), console.log(t.data.smscode), 
        console.log(t.data.agreement_no), console.log(wx.getStorageSync("uid")), console.log(String(getApp().globalData.channelId)), 
        wx.request({
            url: e.globalData.appUrl + "/bind",
            data: {
                mobile: t.data.phone,
                mark: t.data.checkcode,
                code: t.data.smscode,
                agreement_no: t.data.agreement_no,
                openId: wx.getStorageSync("uid"),
                channelId: String(getApp().globalData.channelId)
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                if (console.log(e.data), 0 == e.data.code) {
                    wx.setStorageSync("uid", e.data.data.uid), wx.setStorageSync("real_code", e.data.data.real_code), 
                    wx.showToast({
                        title: "绑定成功！",
                        icon: "success",
                        duration: 1e3
                    }), console.log(t.data.goods_id);
                    setTimeout(function() {
                        "" == t.data.goods_id ? (console.log("isFreeorder", t.data.isFreeorder), t.data.isFreeorder ? wx.navigateBack({
                            delta: 1
                        }) : wx.switchTab({
                            url: "../../my/my"
                        })) : wx.redirectTo({
                            url: "../../index/goodsdetail/goodsdetail?goods_id=" + t.data.goods_id + "&goods_type_prop=" + a + "&goods_type=" + o
                        });
                    }, 1e3);
                } else wx.showToast({
                    title: e.data.errorMsg,
                    icon: "none",
                    mask: !0
                });
            },
            fail: function(e) {
                console.log(e);
            },
            complete: function(e) {
                console.log(e), t.setData({
                    bindbtndis: !1
                });
            }
        });
    },
    toServiceAgree: function() {
        var e = this;
        wx.navigateTo({
            url: "agreement/agreement?agreeUrl=" + e.data.agreeUrl
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? "" == wx.getStorageSync("uid") || "undefined" == wx.getStorageSync("uid") || null == wx.getStorageSync("uid") || void 0 == wx.getStorageSync("uid") ? t.wxauthorize() : (e.globalData.isScopeUserInfo = !0, 
                wx.getUserInfo({
                    success: function(e) {
                        console.log(e), t.setData({
                            nickname: e.userInfo.nickName,
                            avatar: e.userInfo.avatarUrl,
                            isWarrant: !0
                        });
                    }
                })) : (t.setData({
                    isWarrant: !1
                }), e.globalData.isScopeUserInfo = !1);
            }
        });
    },
    onHide: function() {},
    onUnload: function() {
        console.log("isFreeorder", this.data.isFreeorder), this.data.isFreeorder && (e.globalData.isFreeback = 1);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});