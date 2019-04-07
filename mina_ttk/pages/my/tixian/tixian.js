function n(n, e, t) {
    return e in n ? Object.defineProperty(n, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[e] = t, n;
}

function e(n, e) {
    console.log(e), n.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "left top 0",
        success: function(n) {}
    }), n.animation.translate(e.currentTarget.offsetLeft, 0).step(), n.setData({
        animation: n.animation.export()
    });
}

function t(e) {
    wx.showLoading({
        title: "处理中，请稍后"
    }), wx.login({
        success: function(e) {
            console.log("login", e), wx.getUserInfo({
                success: function(t) {
                    var i = e.code;
                    console.log("getUserInfo", t), console.log("code", i);
                    var a = wx.getStorageSync("real_code");
                    console.log("real_code", wx.getStorageSync("real_code")), null != wx.getStorageSync("real_code") && "" != wx.getStorageSync("real_code") && void 0 != wx.getStorageSync("real_code") && "undefined" != wx.getStorageSync("real_code") || (a = ""), 
                    wx.request({
                        url: getApp().globalData.appUrl + "/miniTixian",
                        data: n({
                            code: a,
                            openId: wx.getStorageSync("uid"),
                            channelId: String(getApp().globalData.channelId),
                            name: o,
                            js_code: i,
                            encryptedData: t.encryptedData,
                            siv: t.iv
                        }, "code", a),
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success: function(n) {
                            console.log("doTiXian", n), 0 == n.data.code ? (wx.setStorageSync("tixian_name", o), 
                            wx.showToast({
                                title: "提现成功！",
                                icon: "none",
                                duration: 1e3,
                                mask: !0,
                                success: function(n) {
                                    setTimeout(function(n) {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 1e3);
                                },
                                fail: function(n) {},
                                complete: function(n) {}
                            })) : wx.showToast({
                                title: String(n.data.errorMsg),
                                icon: "none",
                                duration: 1e3,
                                mask: !0,
                                success: function(n) {},
                                fail: function(n) {},
                                complete: function(n) {}
                            });
                        }
                    });
                },
                fail: function() {
                    console.log("获取用户信息失败"), wx.hideLoading();
                }
            });
        },
        fail: function(n) {
            console.log(n.data.data.errorMsg), wx.hideLoading();
        }
    });
}

var o = "";

Page({
    data: {
        animation: {},
        tabType: 0,
        ketixian: 0,
        isBuyer: !0,
        isHiddenDialog: !0,
        keyWord: "",
        tixian_name: "",
        weixin_tixian_flag: "",
        weixin_tixian_msg: ""
    },
    toMingXi: function(n) {
        wx.navigateTo({
            url: "mingxi/mingxi",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    showDialog: function(n) {
        this.data.ketixian;
        console.log("jeeeee", o), "" != o ? this.setData({
            isHiddenDialog: !1
        }) : wx.showToast({
            title: "请输入姓名",
            icon: "none",
            duration: 1e3,
            mask: !0,
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    quxiao: function(n) {
        this.setData({
            isHiddenDialog: !0
        });
    },
    tixian: function(n) {
        this.setData({
            isHiddenDialog: !0
        }), t();
    },
    onConfirm: function() {
        wx.saveImageToPhotosAlbum ? wx.downloadFile({
            url: "https://minipdd.taokebon.com/h5/img/dwn_code.png",
            success: function(n) {
                console.log(n), wx.saveImageToPhotosAlbum({
                    filePath: n.tempFilePath,
                    success: function(n) {
                        console.log(n), wx.showToast({
                            title: "图片已保存",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(n) {
                        console.log(n), wx.getSetting({
                            success: function(n) {
                                n.authSetting["scope.writePhotosAlbum"] ? console.log("保存图片已授权") : wx.showModal({
                                    title: "权限",
                                    content: "您还没有授权保存图片权限",
                                    confirmText: "去授权",
                                    cancelText: "取消",
                                    success: function(n) {
                                        console.log(n), n.confirm && wx.openSetting({
                                            success: function(n) {
                                                n.authSetting["scope.writePhotosAlbum"] && (console.log("开启权限成功"), wx.saveImageToPhotosAlbum({
                                                    filePath: n.tempFilePath,
                                                    success: function(n) {
                                                        console.log(n), wx.showToast({
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
    inputWord: function(n) {
        console.log(n), o = n.detail.value, this.setData({
            keyWord: o
        });
    },
    tabClick: function(n) {
        var t = this;
        e(t, n), t.setData({
            tabType: n.currentTarget.dataset.type
        }), n.currentTarget.dataset.type;
    },
    onLoad: function(n) {
        console.log("tixian", n);
        var e = getApp().globalData.isBuyerLocal, t = !1;
        t = "true" == n.weixin_tixian_flag, this.setData({
            ketixian: n.keditian,
            weixin_tixian_realMoney: n.weixin_tixian_realMoney,
            weixin_tixian_tax: n.weixin_tixian_tax,
            isBuyer: e,
            tixian_name: wx.getStorageSync("tixian_name"),
            weixin_tixian_flag: t,
            weixin_tixian_msg: n.weixin_tixian_msg
        }), this.setData({
            keyWord: wx.getStorageSync("tixian_name")
        }), o = wx.getStorageSync("tixian_name"), wx.hideShareMenu({
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