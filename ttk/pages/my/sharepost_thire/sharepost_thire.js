function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function t(e, t) {
    e.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "left top 0",
        success: function(e) {}
    }), e.animation.translate(t.currentTarget.offsetLeft, 0).step(), e.setData({
        animation: e.animation.export()
    });
}

function n(e) {
    wx.showLoading({
        title: "正在获取海报",
        mask: !0,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    }), console.log("scene", wx.getStorageSync("real_code")), console.log("access_token", u), 
    wx.request({
        url: getApp().globalData.appUrl + "/poster",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId),
            scene: wx.getStorageSync("real_code"),
            page: "page/index/index",
            access_token: u
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            if (console.log("poster", t), console.log("getPoster_real_code", wx.getStorageSync("real_code")), 
            0 == t.data.code) if (i = t.data.data, "" == t.data.data.xiaochenxu_url) wx.hideLoading(), 
            wx.showToast({
                title: "海报获取失败，请稍后再试",
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(e) {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3);
                },
                fail: function(e) {},
                complete: function(e) {}
            }); else {
                void 0 !== t.data.data.code && "" != t.data.data.code && null != t.data.data.code && wx.setStorageSync("real_code", t.data.data.code), 
                wx.hideLoading();
                var n = 0;
                i.mini_poster_list.length < 3 ? n = 0 : i.mini_poster_list.length >= 3 ? n = 1 : i.mini_poster_list.length >= 5 && (n = 2), 
                r = n, e.setData({
                    mini_poster_list: t.data.data.mini_poster_list,
                    mini_card_list: t.data.data.mini_card_list,
                    swiperIndex: n,
                    miniCode: i.xiaochenxu_url
                }, function() {});
            } else 99 == t.data.code ? wx.showToast({
                title: String(t.data.errorMsg) + "，请稍后再试",
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(e) {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3);
                },
                fail: function(e) {},
                complete: function(e) {}
            }) : wx.showToast({
                title: String(t.data.errorMsg),
                icon: "none",
                duration: 2e3,
                mask: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            });
        },
        fail: function(e) {
            wx.hideLoading(), wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                duration: 2e3,
                mask: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            });
        }
    });
}

function a(e) {
    wx.showLoading({
        title: "正在生成图片...",
        mask: !0
    }), e.setData({
        canvasShow: "",
        isShareDialogShow: !1
    });
    var t = wx.createCanvasContext("shareCanvas");
    t.rect(0, 0, o(750) * d, o(1344) * d), t.setFillStyle("white"), t.fill();
    console.log("index", r), wx.getImageInfo({
        src: i.mini_poster_list[r].mini_poster_url,
        success: function(n) {
            var c = n.path;
            t.drawImage(c, 0, 0, o(750) * d, o(1344) * d), wx.getImageInfo({
                src: i.xiaochenxu_url,
                success: function(n) {
                    g = n.path, t.drawImage(g, o(200), o(830), o(250), o(250)), t.draw(), setTimeout(function() {
                        wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            destHeight: 1920,
                            destWidth: 1080,
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
                                            title: "图片已保存至相册",
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
                                                                t.authSetting["scope.writePhotosAlbum"] && (console.log("开启权限成功"), a(e, goods, draw_type));
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

function o(e) {
    return e * c;
}

var i, c, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, l = 1, r = 0, d = .85, u = "", g = "";

Page({
    data: {
        mini_poster_list: [],
        mini_card_list: [],
        data_tab: 1,
        canvasShow: "none",
        swiperIndex: 0,
        miniCode: ""
    },
    shareImage: function(e) {
        a(this);
    },
    tabClick: function(e) {
        t(this, e), r = 0, l = e.currentTarget.dataset.tab, console.log(e);
        var n = 0;
        1 == l ? i.mini_poster_list.length < 3 ? n = 0 : i.mini_poster_list.length >= 3 ? n = 1 : i.mini_poster_list.length >= 5 && (n = 2) : (i.mini_card_list.length < 3 ? n = 0 : i.mini_card_list.length >= 3 ? n = 1 : i.mini_card_list.length >= 5 && (n = 2), 
        wx.request({
            url: getApp().globalData.appUrl + "/getInvitation",
            data: {
                openId: wx.getStorageSync("uid"),
                channelId: String(getApp().globalData.channelId),
                code: wx.getStorageSync("real_code")
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log("setRealCode", e), ("" != e.data.data || s("undefined" != e.data.data)) && wx.setStorageSync("real_code", e.data.data);
            },
            fail: function(e) {
                wx.hideLoading();
            }
        })), r = n, this.setData({
            data_tab: l,
            swiperIndex: n
        });
    },
    swiperChange: function(e) {
        var t = this;
        r = e.detail.current, console.log("cuSwiperIndex", r), t.setData({
            swiperIndex: e.detail.current
        });
    },
    onLoad: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                c = e.windowWidth / 750, t.setData({
                    winWidth: e.windowWidth,
                    winHeight: e.windowHeight
                });
            }
        }), wx.hideShareMenu({}), wx.request({
            url: getApp().globalData.appUrl + "/getAccessToken",
            data: {},
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log("res.data.access_token", e), u = e.data.data, 0 == e.data.code ? wx.request({
                    url: getApp().globalData.appUrl + "/getInvitation",
                    data: {
                        openId: wx.getStorageSync("uid"),
                        channelId: String(getApp().globalData.channelId)
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        console.log("setRealCode", e), wx.hideLoading(), n(t);
                    },
                    fail: function(e) {
                        wx.hideLoading();
                    }
                }) : wx.showToast({
                    title: String(e.data.errorMsg),
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
    onReady: function() {},
    onShow: function() {
        getApp().globalData.isTestCode && wx.setNavigationBarTitle({
            title: "邀请好友(" + wx.getStorageSync("real_code") + ")",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        console.log("cuSwiperIndex", r), console.log("onShareAppMessage", wx.getStorageSync("real_code"));
        var n = wx.getStorageSync("real_code");
        return t.from, e({
            title: i.mini_card_list[r].mini_card_title,
            path: "pages/index/index?real_code=" + n,
            imageUrl: getApp().globalData.shareImageUrl
        }, "imageUrl", i.mini_card_list[r].mini_card_url);
    }
});