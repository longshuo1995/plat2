function e(e) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: getApp().globalData.appUrl + "/shareList",
        data: {
            code: wx.getStorageSync("real_code"),
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            type: 7
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            0 == e.data.code ? (console.log("getShareInfo", e), i = e.data.data.title, c = e.data.data.image_url, 
            d = e.data.data.poster_url) : wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                mask: !0
            });
        }
    });
}

function t(e) {
    console.log("real_code", wx.getStorageSync("real_code")), console.log("uid", wx.getStorageSync("uid")), 
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
        success: function(t) {
            console.log("getAccessToken", t), 0 == t.data.code ? (l = t.data.data, console.log("111", l), 
            o(e)) : wx.showToast({
                title: String(t.data.errorMsg),
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            });
        }
    });
}

function o(e) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), void 0 === r && (r = ""), wx.request({
        url: getApp().globalData.appUrl + "/getMiniMa",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId),
            scene: wx.getStorageSync("real_code") + "#10##no###" + r,
            page: "page/index/index",
            access_token: l
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            console.log("getMiniMa", t), wx.hideToast(), 0 == t.data.code ? "" != (u = t.data.data) ? n(e) : wx.showToast({
                title: "获取信息失败",
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            }) : wx.showToast({
                title: String(t.data.errorMsg),
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

function n(e) {
    wx.showLoading({
        title: "正在生成图片...",
        mask: !0
    }), e.setData({
        canvasShow: ""
    });
    var t = wx.createCanvasContext("shareCanvas");
    t.rect(0, 0, a(750) * g, a(1344) * g), t.setFillStyle("white"), t.fill();
    wx.getImageInfo({
        src: d,
        success: function(o) {
            var s = o.path;
            t.drawImage(s, -20, 0, a(850) * g, a(721) * g), console.log("mini_img", u), wx.getImageInfo({
                src: u,
                success: function(o) {
                    var s = o.path;
                    t.drawImage(s, a(350), a(630), a(200), a(200)), t.beginPath(), t.setFillStyle("#4E4E4E"), 
                    t.setFontSize(a(30)), t.closePath(), t.fillText("长按识别二维码购买", a(305), a(900)), t.beginPath(), 
                    t.setFillStyle("#4E4E4E"), t.setFontSize(a(30)), t.closePath(), t.fillText(i.substring(0, 8), a(30), a(700)), 
                    t.beginPath(), t.setFillStyle("#4E4E4E"), t.setFontSize(a(30)), t.closePath(), t.fillText(i.substring(8, 17), a(30), a(750)), 
                    t.beginPath(), t.setFillStyle("#4E4E4E"), t.setFontSize(a(30)), t.closePath(), t.fillText(i.substring(17, 26), a(30), a(800)), 
                    t.draw(), setTimeout(function() {
                        wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            fileType: "jpg",
                            canvasId: "shareCanvas",
                            quality: 1,
                            success: function(t) {
                                wx.hideLoading();
                                wx.getSystemInfoSync();
                                wx.saveImageToPhotosAlbum({
                                    filePath: t.tempFilePath,
                                    success: function(t) {
                                        wx.showToast({
                                            title: "图片已保存",
                                            icon: "success",
                                            duration: 2e3,
                                            mask: !0,
                                            success: function(e) {},
                                            fail: function(e) {},
                                            complete: function(e) {}
                                        }), e.setData({
                                            canvasShow: "none",
                                            showModalStatus: !1
                                        });
                                    },
                                    fail: function(t) {
                                        console.log("fail", t), e.setData({
                                            canvasShow: "none",
                                            showModalStatus: !1
                                        }), wx.getSetting({
                                            success: function(t) {
                                                t.authSetting["scope.writePhotosAlbum"] ? console.log("保存图片已授权") : wx.showModal({
                                                    title: "权限",
                                                    content: "您还没有授权保存图片权限",
                                                    confirmText: "去授权",
                                                    cancelText: "取消",
                                                    success: function(t) {
                                                        console.log(t), t.cancel || wx.openSetting({
                                                            success: function(t) {
                                                                t.authSetting["scope.writePhotosAlbum"] && (console.log("开启权限成功"), n(e, goods, draw_type));
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }), e.setData({
                                    shareImage: t.tempFilePath,
                                    showSharePic: !0
                                }), wx.hideLoading();
                            },
                            fail: function(e) {
                                wx.hideLoading(), console.log("resFail", e);
                            }
                        });
                    }, 2e3);
                },
                fail: function(e) {},
                complete: function(e) {}
            });
        }
    });
}

function a(e) {
    return e * s;
}

!function(e) {
    e && e.__esModule;
}(require("../../../utils/util.js"));

var s, i = "", c = "", l = "", u = "", r = "", d = "";

Page({
    data: {
        canvasShow: "none",
        nickname: "",
        avatar: "",
        zhuliMoney: "0",
        shareBtn: "1"
    },
    shareImg: function(e) {
        t(this);
    },
    onLoad: function(t) {
        console.log("options", t);
        var o = this, n = "1";
        void 0 !== t.shareBtn && (n = t.shareBtn), r = t.zhuliId, o.setData({
            zhuliMoney: t.zhuliMoney,
            shareBtn: n
        }), wx.hideShareMenu({
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }), wx.getSystemInfo({
            success: function(e) {
                s = e.windowWidth / 750, o.setData({
                    winWidth: e.windowWidth,
                    winHeight: e.windowHeight
                });
            }
        }), e();
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.getUserInfo({
            success: function(t) {
                var o = t.userInfo.nickName, n = "../../../images/icon_head.png";
                "" != t.userInfo.avatarUrl && (n = t.userInfo.avatarUrl), e.setData({
                    nickname: o,
                    avatar: n
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        return console.log("real_code", wx.getStorageSync("uid")), console.log("zhuliId", r), 
        e.from, {
            title: i,
            path: "pages/index/index?real_code=" + wx.getStorageSync("real_code") + "&type=10&zhuliId=" + r + "&uid=" + wx.getStorageSync("uid"),
            imageUrl: c
        };
    }
});

var g = .8;