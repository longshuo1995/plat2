function t(t) {
    wx.showLoading({
        title: "加载中"
    }), wx.request({
        url: getApp().globalData.appUrl + "/getLotteryUrl",
        data: {
            openId: wx.getStorageSync("uid")
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            wx.hideLoading(), console.log("getLotteryUrl", e), 0 == e.data.code ? (l = e.data.data, 
            t.shareBtn()) : wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        },
        fail: function(t) {
            wx.hideLoading();
        }
    });
}

function e(e) {
    e.setData({
        isShowShare: !0
    }), wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: getApp().globalData.appUrl + "/shareLottery",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(a) {
            console.log("shareLottery", a), 0 == a.data.code ? (r = a.data.data.small_img_url, 
            g = a.data.data.title, u = a.data.data.big_img_url, "" != a.data.data.code && void 0 !== a.data.data.code || wx.setStorageSync("real_code", a.data.data.code), 
            t(e)) : wx.showToast({
                title: String(a.data.errorMsg),
                icon: "none",
                mask: !0
            });
        },
        fail: function(t) {
            wx.hideToast(), wx.showToast({
                title: t,
                mask: !0
            }), e.setData({
                networkType: !1
            });
        }
    });
}

function a(t) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), console.log("access_tokenThis", wx.getStorageSync("real_code")), wx.request({
        url: getApp().globalData.appUrl + "/getMiniMa",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId),
            scene: wx.getStorageSync("real_code") + "#5",
            page: "page/index/index",
            access_token: h
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            console.log("getMiniMa", e), wx.hideToast(), 0 == e.data.code ? (w = e.data.data, 
            o(t)) : wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                mask: !0
            });
        },
        fail: function(e) {
            wx.hideToast(), wx.showToast({
                title: e,
                mask: !0
            }), t.setData({
                networkType: !1
            });
        }
    });
}

function o(t) {
    wx.showLoading({
        title: "正在生成图片...",
        mask: !0
    }), t.setData({
        canvasShow: ""
    });
    var e = wx.createCanvasContext("shareCanvas");
    e.rect(0, 0, i(750) * f, i(1180) * f), e.setFillStyle("white"), e.fill();
    wx.getImageInfo({
        src: u,
        success: function(a) {
            var n = a.path;
            e.drawImage(n, 0, 0, i(750) * f, i(721) * f), d.api.draw(l, e, i(200), i(200), this, "", i(350), i(630)), 
            e.beginPath(), e.setFillStyle("#4E4E4E"), e.setFontSize(i(30)), e.closePath(), e.fillText("长按识别二维码购买", i(305), i(900)), 
            e.beginPath(), e.setFillStyle("#4E4E4E"), e.setFontSize(i(30)), e.closePath(), e.fillText(g.substring(0, 8), i(30), i(700)), 
            e.beginPath(), e.setFillStyle("#4E4E4E"), e.setFontSize(i(30)), e.closePath(), e.fillText(g.substring(8, 17), i(30), i(750)), 
            e.beginPath(), e.setFillStyle("#4E4E4E"), e.setFontSize(i(30)), e.closePath(), e.fillText(g.substring(17, 26), i(30), i(800)), 
            e.draw(), setTimeout(function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    fileType: "jpg",
                    canvasId: "shareCanvas",
                    quality: 1,
                    success: function(e) {
                        wx.hideLoading();
                        wx.getSystemInfoSync();
                        wx.saveImageToPhotosAlbum({
                            filePath: e.tempFilePath,
                            success: function(e) {
                                wx.showToast({
                                    title: "图片已保存",
                                    icon: "success",
                                    duration: 2e3,
                                    mask: !0,
                                    success: function(t) {},
                                    fail: function(t) {},
                                    complete: function(t) {}
                                }), t.setData({
                                    canvasShow: "none",
                                    showModalStatus: !1
                                });
                            },
                            fail: function(e) {
                                console.log("fail", e), t.setData({
                                    canvasShow: "none",
                                    showModalStatus: !1
                                }), wx.getSetting({
                                    success: function(e) {
                                        e.authSetting["scope.writePhotosAlbum"] ? console.log("保存图片已授权") : wx.showModal({
                                            title: "权限",
                                            content: "您还没有授权保存图片权限",
                                            confirmText: "去授权",
                                            cancelText: "取消",
                                            success: function(e) {
                                                console.log(e), e.cancel || wx.openSetting({
                                                    success: function(e) {
                                                        e.authSetting["scope.writePhotosAlbum"] && (console.log("开启权限成功"), o(t, goods, draw_type));
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }), t.setData({
                            shareImage: e.tempFilePath,
                            showSharePic: !0
                        }), wx.hideLoading();
                    },
                    fail: function(t) {
                        wx.hideLoading(), console.log("resFail", t);
                    }
                });
            }, 2e3);
        }
    });
}

function n(t) {
    wx.request({
        url: getApp().globalData.appUrl + "/getAccessToken",
        data: {
            code: wx.getStorageSync("real_code"),
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            console.log("res.data.access_token", e), 0 == e.data.code ? (h = e.data.data, console.log("111", h), 
            a(t)) : wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        }
    });
}

function s(t) {
    wx.showLoading({
        title: "加载中...",
        mask: !0,
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    }), wx.request({
        url: getApp().globalData.appUrl + "/getLotteryMoneyInfo",
        data: {
            code: wx.getStorageSync("real_code"),
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            console.log("getLotteryMoneyInfo", e), wx.hideLoading(), 0 == e.data.code ? t.setData({
                order_nums: e.data.data.order_nums,
                money: e.data.data.money,
                help_free_orders: e.data.data.help_free_orders
            }) : wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        }
    });
}

function i(t) {
    return t * c;
}

var c, l, d = require("../../../utils/qrcode.js"), r = "", u = "", g = "", h = "", w = "";

Page({
    data: {
        isBuyer: !0,
        isShowDilaog: !1,
        isShowShare: !1,
        animationData: {},
        canvasShow: "none",
        order_nums: "",
        money: "",
        help_free_orders: ""
    },
    shareBtn: function(t) {
        n(this);
    },
    otherClick: function(t) {
        this.setData({
            isShowShare: !1
        });
    },
    showshare: function(t) {
        e(this);
    },
    goPdd: function(e) {
        t(this);
    },
    dialogClose: function(t) {
        this.setData({
            isShowDilaog: !1
        });
    },
    shouru: function(t) {
        this.setData({
            isShowDilaog: !0
        }), s(this);
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            isBuyer: getApp().globalData.isBuyerLocal
        }), wx.getSystemInfo({
            success: function(t) {
                c = t.windowWidth / 750, e.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight
                });
            }
        }), wx.hideShareMenu({
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return console.log("real_code", wx.getStorageSync("real_code")), t.from, {
            title: g,
            path: "pages/index/index?real_code=" + wx.getStorageSync("real_code") + "&type=5",
            imageUrl: r
        };
    }
});

var f = .8;