function t(t) {
    wx.showLoading({
        title: "正在获取海报",
        mask: !0,
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    }), wx.request({
        url: r.globalData.appUrl + "/poster",
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
        success: function(n) {
            if (console.log("Poster", n.data.data), 0 == n.data.code) {
                s = n.data.data;
                for (var i = new Array(), o = 0; o < n.data.data.mini_poster_list.length; o++) {
                    var c = {
                        url: n.data.data.mini_poster_list[o].mini_poster_url
                    };
                    i.push(c);
                }
                for (var r = new Array(), o = 0; o < n.data.data.mini_card_list.length; o++) {
                    var l = {
                        url: n.data.data.mini_card_list[o].mini_card_url
                    };
                    r.push(l);
                }
                var d = a(i.length), u = a(r.length), h = 0, m = 0;
                h = i.length <= 2 ? (t.data.winWidth - t.data.itemWidth) / 2 : 0 - t.data.itemWidth / 122 * 89, 
                m = r.length <= 2 ? (t.data.winWidth - t.data.itemWidth) / 2 : 0 - t.data.itemWidth / 122 * 89, 
                t.setData({
                    miniCode: n.data.data.xiaochenxu_url,
                    curIndex: d,
                    curIndex2: u,
                    leftWidth: h,
                    leftWidth2: m,
                    bannerList: i,
                    bannerList2: r,
                    allWidth: i.length * t.data.itemWidth,
                    allWidth2: r.length * t.data.itemWidth
                }), wx.hideLoading();
            } else 99 == e.data.code ? wx.showToast({
                title: String(e.data.errorMsg) + "，请稍后再试",
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(t) {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3);
                },
                fail: function(t) {},
                complete: function(t) {}
            }) : wx.showToast({
                title: n.data.errorMsg,
                icon: "none",
                duration: 2e3,
                mask: !0,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        },
        fail: function(t) {
            wx.hideLoading(), wx.showToast({
                title: t.data.errorMsg,
                icon: "none",
                duration: 2e3,
                mask: !0,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        }
    });
}

function a(t) {
    return t <= 1 ? 0 : t <= 4 ? 1 : parseInt((t - 1) / 2);
}

function n(t, a) {
    t.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "left top 0",
        success: function(t) {}
    }), t.animation.translate(a.currentTarget.offsetLeft, 0).step(), t.setData({
        animation: t.animation.export()
    });
}

function i(t) {
    wx.showLoading({
        title: "正在生成图片...",
        mask: !0
    }), t.setData({
        canvasShow: "",
        isShareDialogShow: !1
    });
    var a = wx.createCanvasContext("shareCanvas");
    a.rect(0, 0, o(750) * d, o(1044) * d), a.setFillStyle("white"), a.fill();
    wx.getImageInfo({
        src: t.data.bannerList[t.data.curIndex].url,
        success: function(n) {
            var e = n.path;
            a.drawImage(e, 0, 0, o(750) * d, o(1344) * d), wx.getImageInfo({
                src: s.xiaochenxu_url,
                success: function(n) {
                    h = n.path, a.drawImage(h, o(215), o(745), o(200), o(200)), a.draw(), setTimeout(function() {
                        wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            canvasId: "shareCanvas",
                            quality: 1,
                            success: function(a) {
                                wx.hideLoading();
                                wx.getSystemInfoSync();
                                wx.saveImageToPhotosAlbum({
                                    filePath: a.tempFilePath,
                                    success: function(a) {
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
                                    fail: function(a) {
                                        console.log("fail", a), t.setData({
                                            canvasShow: "none",
                                            showModalStatus: !1
                                        }), wx.getSetting({
                                            success: function(a) {
                                                a.authSetting["scope.writePhotosAlbum"] ? console.log("保存图片已授权") : wx.showModal({
                                                    title: "权限",
                                                    content: "您还没有授权保存图片权限",
                                                    confirmText: "去授权",
                                                    cancelText: "取消",
                                                    success: function(a) {
                                                        console.log(a), a.cancel || wx.openSetting({
                                                            success: function(a) {
                                                                a.authSetting["scope.writePhotosAlbum"] && (console.log("开启权限成功"), i(t, goods, draw_type));
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }), t.setData({
                                    shareImage: a.tempFilePath,
                                    showSharePic: !0
                                }), wx.hideLoading();
                            },
                            fail: function(t) {
                                wx.hideLoading(), console.log("resFail", t);
                            }
                        });
                    }, 2e3);
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        }
    });
}

function o(t) {
    return t * c;
}

var s, c, r = getApp(), l = 0, d = .85, u = "", h = "";

Page({
    data: {
        curIndex: 0,
        curIndex2: 0,
        winWidth: 0,
        winHeight: 0,
        itemWidth: 0,
        itemHeight: 0,
        allWidth: 0,
        allWidth2: 0,
        leftWidth: 0,
        leftWidth2: 0,
        scale: .7,
        startClinetX: "",
        startTimestamp: "",
        translateDistance: 0,
        animationToLarge: {},
        animationToSmall: {},
        startClinetX2: "",
        startTimestamp2: "",
        translateDistance2: 0,
        animationToLarge2: {},
        animationToSmall2: {},
        canvasShow: "none",
        miniCode: "",
        bannerList: {},
        bannerList2: {},
        animation: {},
        cuTypeId: 1,
        networkType: !0
    },
    tabClick: function(t) {
        var a = this;
        wx.getNetworkType({
            success: function(e) {
                var i = !0;
                (i = "none" != e.networkType) ? (l = t.target.dataset.id, n(a, t), console.log("typeId", l), 
                a.setData({
                    cuTypeId: l
                }), console.log("cuTypeId", l)) : wx.showToast({
                    title: "当前无网络,请检查网络后重试",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), a.setData({
                    networkType: i
                });
            }
        });
    },
    swiperTouchstart: function(t) {
        var a = t.changedTouches[0].clientX;
        this.setData({
            startClinetX: a,
            startTimestamp: t.timeStamp
        });
    },
    swiperTouchmove: function(t) {},
    swiperTouchend: function(t) {
        this.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease-out",
            delay: 0
        });
        var a = t.timeStamp - this.data.startTimestamp, n = t.changedTouches[0].clientX - this.data.startClinetX;
        if (a < 500 && Math.abs(n) > 10) {
            var e = this.data.curIndex, i = this.data.itemWidth, o = this.data.translateDistance, s = 0;
            if (n > 0) {
                if ((e -= 1) < 0) return e = 0, void (i = 0);
                s = o + i;
            } else {
                if ((e += 1) >= this.data.bannerList.length) return e = this.data.bannerList.length - 1, 
                void (i = 0);
                s = o - i;
            }
            this.animationToLarge(e, s), this.animationToSmall(e, s), this.setData({
                curIndex: e,
                translateDistance: s
            });
        }
    },
    animationToLarge: function(t, a) {
        this.animation.translateX(a).scale(1).step(), this.setData({
            animationToLarge: this.animation.export()
        });
    },
    animationToSmall: function(t, a) {
        this.animation.translateX(a).scale(.7).step(), this.setData({
            animationToSmall: this.animation.export()
        });
    },
    swiperTouchstart2: function(t) {
        var a = t.changedTouches[0].clientX;
        this.setData({
            startClinetX2: a,
            startTimestamp2: t.timeStamp
        });
    },
    swiperTouchmove2: function(t) {},
    swiperTouchend2: function(t) {
        this.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease-out",
            delay: 0
        });
        var a = t.timeStamp - this.data.startTimestamp2, n = t.changedTouches[0].clientX - this.data.startClinetX2;
        if (a < 500 && Math.abs(n) > 10) {
            var e = this.data.curIndex2, i = this.data.itemWidth, o = this.data.translateDistance2, s = 0;
            if (n > 0) {
                if ((e -= 1) < 0) return e = 0, void (i = 0);
                s = o + i;
            } else {
                if ((e += 1) >= this.data.bannerList2.length) return e = this.data.bannerList2.length - 1, 
                void (i = 0);
                s = o - i;
            }
            this.animationToLarge2(e, s), this.animationToSmall2(e, s), this.setData({
                curIndex2: e,
                translateDistance2: s
            });
        }
    },
    animationToLarge2: function(t, a) {
        this.animation.translateX(a).scale(1).step(), this.setData({
            animationToLarge2: this.animation.export()
        });
    },
    animationToSmall2: function(t, a) {
        this.animation.translateX(a).scale(.7).step(), this.setData({
            animationToSmall2: this.animation.export()
        });
    },
    drawSharePic: function(t) {
        i(this);
    },
    onLoad: function(a) {
        var n = this;
        wx.getSystemInfo({
            success: function(t) {
                var a = t.windowWidth, e = t.windowHeight;
                c = t.windowWidth / 750, n.setData({
                    winWidth: a,
                    winHeight: e,
                    itemWidth: .642 * a
                });
            }
        }), wx.request({
            url: "https://api.weixin.qq.com/cgi-bin/token",
            data: {
                grant_type: "client_credential",
                appid: "wx05b17bb4bb3b4fdf",
                secret: "b48fd6a55e3db8c64469ea3db845ddd5"
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                console.log("res.data.access_token", a.data.access_token), u = a.data.access_token, 
                t(n);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this;
        return console.log("imageUrl", t.data.bannerList2[t.data.curIndex].url), {
            title: r.globalData.shareTitle,
            path: "/pages/index/index?type=0&real_code=" + wx.getStorageSync("real_code"),
            imageUrl: t.data.bannerList2[t.data.curIndex].url
        };
    }
});