function e(e) {
    var a = {}, t = e.toString(), n = "";
    a["'"] = '"', a["("] = "(", a[")"] = ")", a["*"] = "*", a["~"] = "~", a["!"] = "!", 
    a[" "] = " ", a["Ü"] = "�", a["ü"] = "�", a["Ä"] = "�", a["ä"] = "�", a["Ö"] = "�", 
    a["ö"] = "�", a["ß"] = "�", a["€"] = "�", a[""] = "�", a["‚"] = "�", a["ƒ"] = "�", 
    a["„"] = "�", a["…"] = "�", a["†"] = "�", a["‡"] = "�", a["ˆ"] = "�", a["‰"] = "�", 
    a["Š"] = "�", a["‹"] = "�", a["Œ"] = "�", a[""] = "�", a["Ž"] = "�", a[""] = "�", 
    a[""] = "�", a["‘"] = "�", a["’"] = "�", a["“"] = "�", a["”"] = "�", a["•"] = "�", 
    a["–"] = "�", a["—"] = "�", a["˜"] = "�", a["™"] = "�", a["š"] = "�", a["›"] = "�", 
    a["œ"] = "�", a[""] = "�", a["ž"] = "�", a["Ÿ"] = "�", a["Æ"] = "Æ", a["Ø"] = "Ø", 
    a["Å"] = "Å";
    for (n in a) t = function(e, a, t) {
        return t.split(e).join(a);
    }(a[n], "", t);
    return t = decodeURIComponent(t);
}

function a(e) {
    return null != e && (e = e.replace(/##/g, "\r\n")), e;
}

require("../../utils/qrcode.js");

var t = getApp();

Page({
    data: {
        xinshou_url: "",
        app_url: "",
        rights: "",
        avatar: "../../images/icon_head.png",
        nickname: "未授权的访客",
        phone: "",
        reg_time: "",
        withdraw: {},
        shareMsg: "",
        shareMsgUrl: "",
        isWarrant: t.globalData.isScopeUserInfo,
        isBuyer: t.globalData.isBuyerLocal,
        showModal: !1,
        canIUse: wx.canIUse("web-view"),
        parentCode: "",
        tixian_msg: "",
        team_nums: "",
        son_nums: "",
        grandson_nums: "",
        my_order_today: "",
        team_order_today: "",
        my_money_today: "",
        team_money_today: "",
        all_money_back: "",
        share_help: "",
        all_money_back_income: "",
        share_help_income: "",
        quanyi_faq: "",
        leader_mini_name: "",
        leader_mobile: "",
        leader_img: "",
        auth_time: "",
        weixin_tixian_msg: "",
        weixin_tixian_flag: "",
        weixin_tixian_tax: "",
        weixin_tixian_realMoney: "",
        current_month_add: "",
        isC: !0,
        isGo: !1
    },
    goJieSuan: function(e) {
        var a = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: "tixian/mingxi/mingxi?intoType=" + a,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    tixian: function(e) {
        var a = this;
        wx.navigateTo({
            url: "tixian/tixian?keditian=" + a.data.withdraw.keditian + "&weixin_tixian_flag=" + a.data.weixin_tixian_flag + "&weixin_tixian_tax=" + a.data.weixin_tixian_tax + "&weixin_tixian_realMoney=" + a.data.weixin_tixian_realMoney + "&weixin_tixian_msg=" + a.data.weixin_tixian_msg,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    toAbout: function(e) {
        wx.navigateTo({
            url: "about/about",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    toMyteam: function(e) {
        var a = this;
        wx.navigateTo({
            url: "friend/friend?rights=" + a.data.rights + "&leader_mini_name=" + a.data.leader_mini_name + "&leader_mobile=" + a.data.leader_mobile + "&leader_img=" + a.data.leader_img + "&type=" + e.currentTarget.dataset.type + "&leader_rights=" + a.data.leader_rights
        });
    },
    toGetSetting: function(e) {
        wx.openSetting({});
    },
    shareTo: function(e) {
        wx.navigateTo({
            url: "sharepost_thire/sharepost_thire",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    toZhuLi: function(e) {
        var a = this;
        wx.navigateTo({
            url: "orderlist/orderlist?intoType=4&isBuyer=" + a.data.isBuyer,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    toBuyerOrder: function(e) {
        var a = this;
        wx.navigateTo({
            url: "orderlist/orderlist?intoType=3&isBuyer=" + a.data.isBuyer,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    toMyOrder: function(e) {
        var a = this;
        wx.navigateTo({
            url: "orderlist/orderlist?intoType=0&isGo=false&isBuyer=" + a.data.isBuyer,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    toTeamOrder: function(e) {
        var a = this;
        wx.navigateTo({
            url: "orderlist/orderlist?intoType=1&isGo=true&isBuyer=" + a.data.isBuyer,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    filterMoney: function(e) {
        return e.toFixed(2);
    },
    getmyInfo: function() {
        var n = this, o = wx.getStorageSync("real_code");
        "undefined" != o && null != o || (o = ""), wx.request({
            url: t.globalData.appUrl + "/myinfo",
            data: {
                code: o,
                openId: wx.getStorageSync("uid"),
                channelId: String(getApp().globalData.channelId)
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(o) {
                if (console.log("myinfo", o.data.data), 0 == o.data.code && null != o.data.data) {
                    var i = o.data.data, s = Number(o.data.data.keditian).toFixed(2), r = Number(o.data.data.tixian).toFixed(2), c = Number(o.data.data.daijiesuan).toFixed(2), l = Number(o.data.data.jiesuan).toFixed(2), u = new Object();
                    u.keditian = s, u.tixian = r, u.daijiesuan = c, u.jiesuan = l, u.jiesuan = l, console.log("numobj", u);
                    var d = !1;
                    d = 0 == i.weixin_tixian_flag;
                    var g = a(i.tixian_msg), f = a(i.weixin_tixian_msg);
                    n.setData({
                        withdraw: u,
                        xinshou_url: i.xinshou_url,
                        shareMsg: i.share_msg,
                        shareMsgUrl: i.share_img_url,
                        phone: i.mobile,
                        reg_time: i.reg_time,
                        parentCode: i.parentCode,
                        tixian_msg: g,
                        team_nums: i.team_nums,
                        son_nums: i.son_nums,
                        grandson_nums: i.grandson_nums,
                        my_order_today: i.my_order_today,
                        team_order_today: i.team_order_today,
                        my_money_today: i.my_money_today,
                        team_money_today: i.team_money_today,
                        all_money_back: i.all_money_back,
                        share_help: i.share_help,
                        all_money_back_income: i.all_money_back_income,
                        share_help_income: i.share_help_income,
                        quanyi_faq: i.quanyi_faq,
                        leader_mini_name: i.leader_mini_name,
                        leader_mobile: i.leader_mobile,
                        leader_img: i.leader_img,
                        auth_time: i.auth_time,
                        leader_rights: i.leader_rights,
                        weixin_tixian_msg: f,
                        weixin_tixian_flag: d,
                        weixin_tixian_tax: i.weixin_tixian_tax,
                        weixin_tixian_realMoney: i.weixin_tixian_realMoney,
                        current_month_add: i.current_month_add,
                        memberName: i.memberName,
                        memberType: i.memberType
                    }), console.log("withdraw", n.data.withdraw), 0 == i.type ? (t.globalData.isBuyerLocal = !0, 
                    t.globalData.isScopeUserInfo = !0, n.setData({
                        isBuyer: !0
                    }), wx.getSetting({
                        success: function(a) {
                            a.authSetting["scope.userInfo"] ? (t.globalData.isScopeUserInfo = !0, n.setData({
                                isWarrant: !0
                            }), wx.getUserInfo({
                                success: function(a) {
                                    var t = e(a.userInfo.nickName), o = "../../images/icon_head.png";
                                    "" != a.userInfo.avatarUrl && (o = a.userInfo.avatarUrl), n.setData({
                                        nickname: t,
                                        avatar: o
                                    });
                                }
                            })) : (n.setData({
                                isWarrant: !1
                            }), t.globalData.isScopeUserInfo = !1);
                        }
                    })) : 1 == i.type ? (t.globalData.isScopeUserInfo = !0, t.globalData.isBuyerLocal = !1, 
                    n.setData({
                        isBuyer: !1
                    }), wx.getSetting({
                        success: function(a) {
                            a.authSetting["scope.userInfo"] ? (t.globalData.isScopeUserInfo = !0, n.setData({
                                isWarrant: !0
                            }), wx.getUserInfo({
                                success: function(a) {
                                    var t = e(a.userInfo.nickName), o = "../../images/icon_head.png";
                                    "" != a.userInfo.avatarUrl && (o = a.userInfo.avatarUrl), n.setData({
                                        nickname: t,
                                        avatar: o
                                    });
                                }
                            })) : (n.setData({
                                isWarrant: !1
                            }), t.globalData.isScopeUserInfo = !1);
                        }
                    }), 1 == i.rights ? n.setData({
                        rights: 1,
                        isBuyer: !1
                    }) : 2 == i.rights ? n.setData({
                        rights: 2,
                        isBuyer: !1
                    }) : 3 == i.rights ? n.setData({
                        rights: 3,
                        isBuyer: !1
                    }) : n.setData({
                        rights: "普通用户"
                    })) : 2 == i.type && (n.setData({
                        isWarrant: !1,
                        isBuyer: !0
                    }), t.globalData.isScopeUserInfo = !1), console.log(n.data.isBuyer);
                } else wx.showToast({
                    title: String(o.data.errorMsg),
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                });
            }
        });
    },
    onLoad: function(e) {
        console.log("my", wx.getStorageSync("real_code"));
    },
    wxauthorize: function(a) {
        console.log(a.detail);
        var n = this;
        a.detail;
        wx.login({
            success: function(a) {
                wx.getUserInfo({
                    success: function(o) {
                        var i = a.code, s = wx.getStorageSync("real_code");
                        console.log("real_code", wx.getStorageSync("real_code")), null != wx.getStorageSync("real_code") && "" != wx.getStorageSync("real_code") && void 0 != wx.getStorageSync("real_code") && "undefined" != wx.getStorageSync("real_code") || (s = ""), 
                        wx.request({
                            url: t.globalData.appUrl + "/weixinAuth",
                            data: {
                                js_code: i,
                                encryptedData: o.encryptedData,
                                code: s,
                                siv: o.iv,
                                openId: wx.getStorageSync("uid"),
                                channelId: getApp().globalData.channelId
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(a) {
                                console.log("weixinAuth", a), 0 == a.data.code ? ("" == a.data.data.uid && void 0 === a.data.data.uid || wx.setStorageSync("uid", a.data.data.uid), 
                                "" == a.data.data.real_code && void 0 === a.data.data.real_code || wx.setStorageSync("real_code", a.data.data.real_code), 
                                console.log(wx.getStorageSync("real_code")), t.globalData.isScopeUserInfo = !0, 
                                n.setData({
                                    isWarrant: !0
                                }), 1 == a.data.data.type && (n.setData({
                                    isBuyer: !1
                                }), t.globalData.isBuyerLocal = !1), 0 == a.data.data.type && (n.setData({
                                    isBuyer: !0
                                }), t.globalData.isBuyerLocal = !0), wx.getUserInfo({
                                    success: function(a) {
                                        "" != data.userInfo.avatarUrl && data.userInfo.avatarUrl;
                                        var t = e(a.userInfo.nickName);
                                        n.setData({
                                            nickname: t,
                                            avatar: a.userInfo.avatarUrlStr
                                        });
                                    }
                                }), n.getmyInfo(), console.log(n.data.isWarrant), console.log(n.data.isBuyer), console.log(n.data.rights)) : (wx.showToast({
                                    title: a.data.errMsg,
                                    icon: "none",
                                    duration: 1e3,
                                    mask: !0,
                                    success: function(e) {},
                                    fail: function(e) {},
                                    complete: function(e) {}
                                }), t.globalData.isScopeUserInfo = !1);
                            }
                        });
                    },
                    fail: function() {
                        console.log("获取用户信息失败"), t.globalData.isScopeUserInfo = !1;
                    }
                });
            },
            fail: function(e) {
                console.log(e.data.data.errorMsg);
            }
        });
    },
    showDialogBtn: function() {
        this.setData({
            showModal: !0
        });
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.setData({
            showModal: !1
        });
    },
    onCancel: function() {
        this.hideModal();
    },
    onConfirm: function() {
        wx.saveImageToPhotosAlbum ? wx.downloadFile({
            url: "https://minipdd.taokebon.com/h5/img/dwn_code.png",
            success: function(e) {
                console.log(e), wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        console.log(e), wx.showToast({
                            title: "图片已保存至相册",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(e) {
                        console.log(e), wx.getSetting({
                            success: function(e) {
                                e.authSetting["scope.writePhotosAlbum"] ? console.log("保存图片已授权") : wx.showModal({
                                    title: "权限",
                                    content: "您还没有授权保存图片权限",
                                    confirmText: "去授权",
                                    cancelText: "取消",
                                    success: function(e) {
                                        console.log(e), e.confirm && wx.openSetting({
                                            success: function(e) {
                                                e.authSetting["scope.writePhotosAlbum"] && (console.log("开启权限成功"), wx.saveImageToPhotosAlbum({
                                                    filePath: e.tempFilePath,
                                                    success: function(e) {
                                                        console.log(e), wx.showToast({
                                                            title: "图片已保存",
                                                            icon: "success",
                                                            duration: 2e3
                                                        });
                                                    }
                                                }));
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "图片下载失败",
                    icon: "none",
                    duration: 1500
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    toNovice: function(e) {
        var a = this;
        this.data.canIUse ? wx.navigateTo({
            url: "novice/novice?xinsourl=" + a.data.xinshou_url
        }) : wx.showToast({
            title: "您的微信版本太低！建议您升级到最新版本",
            icon: "none",
            duration: 2e3
        });
    },
    onShareAppMessage: function(e) {
        var a = this;
        if ("button" === e.from && (console.log(e), "sh1" == e.target.id)) return {
            title: "222",
            path: "/pages/index/index?type=5&real_code=" + wx.getStorageSync("real_code"),
            imageUrl: a.data.shareMsgUrl
        };
        wx.getStorageInfoSync("uid");
        var t = wx.getStorageSync("real_code");
        return "undefined" != t && null != t || (t = ""), console.log(t), console.log("分享卡片的图片", a.data.shareMsgUrl), 
        {
            title: a.data.shareMsg,
            path: "/pages/index/index?type=0&real_code=" + t,
            imageUrl: a.data.shareMsgUrl
        };
    },
    personalClick: function() {
        var e = this;
        console.log(e.data.quanyi_faq), wx.navigateTo({
            url: "personalinfo/personalinfo?name=" + e.data.nickname + "&phone=" + e.data.phone + "&reg_time=" + e.data.reg_time + "&parentCode=" + e.data.parentCode + "&isBuyer=" + t.globalData.isBuyerLocal + "&auth_time=" + e.data.auth_time + "&quanyi_faq=" + e.data.quanyi_faq + "&leader_rights=" + e.data.leader_rights + "&rights=" + e.data.rights + "&memberName=" + e.data.memberName
        });
    },
    toMyfriend: function() {
        wx.navigateTo({
            url: "friend/friend"
        });
    },
    bindAccount: function() {
        wx.navigateTo({
            url: "bindaccount/bindaccount?into_type=0"
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getmyInfo(), getApp().globalData.cuTabBarPos = 2, getApp().globalData.isTestCode && wx.setNavigationBarTitle({
            title: "我的(" + wx.getStorageSync("real_code") + ")",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? (console.log("userInfotrue"), getApp().globalData.isScopeUserInfo = !0, 
                wx.getStorageSync("isScope") && "" != wx.getStorageSync("isScope") && void 0 !== wx.getStorageSync("isScope") || wx.navigateTo({
                    url: "../scope/scope",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                })) : (console.log("userInfofalse"), getApp().globalData.isScopeUserInfo = !1, wx.navigateTo({
                    url: "../scope/scope",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }));
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onPageScroll: function(e) {}
});