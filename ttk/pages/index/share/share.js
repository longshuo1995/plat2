function e(e) {
    wx.showLoading({
        title: "加载中"
    }), wx.request({
        url: getApp().globalData.appUrl + "/shareTheme",
        data: {
            openId: wx.getStorageSync("uid"),
            bannerId: r
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            wx.hideLoading(), console.log("shareTheme", e), 0 == e.data.code ? (c = e.data.data.poster_url, 
            l = e.data.data.card_url, c = e.data.data.poster_url, d = e.data.data.card_title, 
            wx.setStorageSync("real_code", e.data.data.code)) : wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            });
        },
        fail: function(e) {
            wx.hideLoading();
        }
    });
}

function t(e) {
    wx.showLoading({
        title: "加载中"
    }), wx.request({
        url: getApp().globalData.appUrl + "/shareAllMoneyBack",
        data: {
            openId: wx.getStorageSync("uid"),
            bannerId: r
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            wx.hideLoading(), console.log("shareAllMoneyBack", e), 0 == e.data.code ? (c = e.data.data.poster_url, 
            l = e.data.data.card_url, c = e.data.data.poster_url, d = e.data.data.card_title, 
            wx.setStorageSync("real_code", e.data.data.code)) : wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            });
        },
        fail: function(e) {
            wx.hideLoading();
        }
    });
}

function a(e) {
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
            console.log("res.data.access_token", t), 0 == t.data.code ? (u = t.data.data, console.log("111", u), 
            n(e)) : wx.showToast({
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

function n(e) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), console.log("access_tokenThis", wx.getStorageSync("real_code"));
    var t = 0, a = "no";
    0 == h ? t = 9 : (t = 6, a = r), wx.request({
        url: getApp().globalData.appUrl + "/getMiniMa",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId),
            scene: wx.getStorageSync("real_code") + "#" + t + "##" + a + "#" + e.data.cIntoType,
            page: "page/index/index",
            access_token: u
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            console.log("getMiniMa", t), wx.hideToast(), 0 == t.data.code ? (g = t.data.data, 
            o(e)) : wx.showToast({
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

function o(e) {
    wx.showLoading({
        title: "正在生成图片...",
        mask: !0
    }), e.setData({
        canvasShow: ""
    });
    var t = wx.createCanvasContext("shareCanvas");
    t.rect(0, 0, i(750) * w, i(1344) * w), t.setFillStyle("white"), t.fill();
    var a = c;
    0 == h ? a = l : 1 == h && (a = c), wx.getImageInfo({
        src: a,
        success: function(a) {
            var n = a.path;
            t.drawImage(n, -20, 0, i(850) * w, i(721) * w), wx.getImageInfo({
                src: g,
                success: function(a) {
                    var n = a.path;
                    t.drawImage(n, i(350), i(630), i(200), i(200)), t.beginPath(), t.setFillStyle("#4E4E4E"), 
                    t.setFontSize(i(30)), t.closePath(), t.fillText("长按识别二维码购买", i(305), i(900)), 0 == h ? (t.beginPath(), 
                    t.setFillStyle("#4E4E4E"), t.setFontSize(i(30)), t.closePath(), t.fillText("送你一个免单机会，", i(30), i(700)), 
                    t.beginPath(), t.setFillStyle("#4E4E4E"), t.setFontSize(i(30)), t.closePath(), t.fillText("爆款商品免费拿!", i(30), i(750))) : (t.beginPath(), 
                    t.setFillStyle("#4E4E4E"), t.setFontSize(i(30)), t.closePath(), t.fillText(d.substring(0, 8), i(30), i(700)), 
                    t.beginPath(), t.setFillStyle("#4E4E4E"), t.setFontSize(i(30)), t.closePath(), t.fillText(d.substring(8, 17), i(30), i(750)), 
                    t.beginPath(), t.setFillStyle("#4E4E4E"), t.setFontSize(i(30)), t.closePath(), t.fillText(d.substring(17, 26), i(30), i(800))), 
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
                                                                t.authSetting["scope.writePhotosAlbum"] && (console.log("开启权限成功"), o(e, goods, draw_type));
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

function i(e) {
    return e * s;
}

var s, c = "", l = "", d = "", r = "", u = "", g = "", h = 0;

Page({
    data: {
        canvasShow: "none",
        isShareBtnShow: !0
    },
    shareImg: function(e) {
        a(this);
    },
    onLoad: function(a) {
        var n = this;
        console.log("share", a), wx.hideShareMenu({
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }), wx.getSystemInfo({
            success: function(e) {
                s = e.windowWidth / 750, n.setData({
                    winWidth: e.windowWidth,
                    winHeight: e.windowHeight
                });
            }
        }), 0 == (h = a.type) ? (n.setData({
            isShareBtnShow: !1
        }), t()) : 1 == h ? (r = a.banner_id, e(), n.setData({
            isShareBtnShow: !0
        })) : (r = a.banner_id, e(), n.setData({
            isShareBtnShow: !0,
            cIntoType: a.intoType
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = 6;
        t = 0 == h ? 9 : 6, console.log("card_url", l);
        return console.log("shareUrl", "pages/index/index?real_code=" + wx.getStorageSync("real_code") + "&type=" + t + "&banner_id=" + r), 
        e.from, {
            title: d,
            path: "pages/index/index?real_code=" + wx.getStorageSync("real_code") + "&type=" + t + "&banner_id=" + r,
            imageUrl: l
        };
    }
});

var w = .8;