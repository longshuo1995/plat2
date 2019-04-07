function e(e) {
    wx.showLoading({
        title: "正在生成图片...",
        mask: !0
    }), e.setData({
        canvasShow: "",
        isShareDialogShow: !1
    });
    var t = wx.createCanvasContext("shareCanvas"), a = u.goods[0];
    t.rect(0, 0, c(600), c(1075)), t.setFillStyle("white"), t.fill(), wx.getImageInfo({
        src: a.goods_thumbnail_url,
        success: function(n) {
            var i = n.path;
            t.drawImage(i, 0, 0, c(750) * m, c(678) * m);
            var s = (v = a.goods_name).split(""), r = "", f = [];
            t.setFontSize(c(30) * m), t.setFillStyle("#111111");
            for (p = 0; p < s.length; p++) t.measureText(r).width < c(466) * m ? r += s[p] : (p--, 
            f.push(r), r = "");
            f.push(r);
            var g = f.slice(0, 1)[0];
            t.fillText(g, c(240) * m, c(730) * m);
            for (var d = v.replace(g, "").split(""), w = "", x = [], p = 0; p < d.length; p++) t.measureText(w).width < c(646) * m ? w += d[p] : (p--, 
            x.push(w), w = "");
            x.push(w);
            var S = x.slice(0, 1)[0];
            t.fillText(S + "...", c(30) * m, c(785) * m), t.save(), t.drawImage("../../images/zhuanxiang.png", c(30) * m, c(695) * m, c(210) * m, c(46) * m), 
            t.beginPath(), t.setFillStyle("#4a4a4a"), t.setFontSize(c(40) * m), t.closePath(), 
            t.fillText("¥", c(220) * m, c(905) * m), t.beginPath(), t.setFillStyle("#4a4a4a"), 
            t.setFontSize(c(90) * m), t.closePath(), t.fillText(a.final_price, c(245) * m, c(908) * m), 
            t.drawImage("../../images/quanefanxian_text.png", c(32) * m, c(865) * m, c(160) * m, c(44) * m);
            F = u.start + "开启返现抢购";
            t.beginPath(), t.setFillStyle("#000"), t.setFontSize(c(26) * m), t.closePath(), 
            t.fillText(F, c(32) * m, c(970) * m), t.beginPath(), t.rect(c(32) * m, c(1e3) * m, c(686) * m, c(2)), 
            t.setFillStyle("#adadad"), t.closePath(), t.fill();
            var v = u.good_wenan;
            t.beginPath(), t.setFillStyle("#ff0000"), t.setFontSize(c(28) * m), t.closePath(), 
            o(t, v, c(32) * m, c(1080) * m);
            var F = "识别右边小程序二维码参与活动";
            t.beginPath(), t.setFillStyle("#000"), t.setFontSize(c(28) * m), t.closePath(), 
            t.fillText(F, c(32) * m, c(1245) * m), t.drawImage(h, c(395), c(835), c(180), c(180)), 
            t.draw(), l(e);
        }
    });
}

function t(e) {
    wx.showLoading({
        title: "正在生成图片...",
        mask: !0
    }), e.setData({
        canvasShow: "",
        isShareDialogShow: !1
    });
    var t = wx.createCanvasContext("shareCanvas");
    t.rect(0, 0, c(640), c(1100)), t.setFillStyle("#F6F6F6"), t.fill();
    for (var a = c(0) * m, o = c(0) * m, i = c(750) * m, f = c(282) * m, d = c(37) * m, w = c(307) * m, x = c(391) * m, p = c(307) * m, S = c(37) * m, v = c(658) * m, F = c(391) * m, P = c(658) * m, y = c(318) * m, _ = c(318) * m, T = c(36) * m, I = c(676) * m, b = c(686) * m, k = c(306) * m, L = [ d, x, S, F ], D = [ w, p, v, P ], A = c(33) * m, z = c(304) * m, B = c(387) * m, C = c(304) * m, M = c(33) * m, q = c(655) * m, U = c(387) * m, H = c(655) * m, R = c(326) * m, W = c(325) * m, O = [ A, B, M, U ], G = [ z, C, q, H ], j = [], E = 0; E < r.length; E++) j.push(r[E].goods_thumbnail_url);
    console.log("imgUrls", j), wx.getSavedFileList({
        success: function(d) {
            for (var w = 0; w < d.fileList.length; w++) wx.removeSavedFile({
                filePath: d.fileList[w].filePath
            });
            console.log("getSavedFileList", d), s({
                urls: j,
                success: function(s) {
                    console.info("draw", u), t.drawImage(g, a, o, i, f);
                    for (var d = 0; d < r.length; d++) t.beginPath(), t.rect(O[d], G[d], R, W), t.setFillStyle("#f9e276"), 
                    t.fill(), t.closePath(), t.drawImage(s[d].savedFilePath, L[d], D[d], y, _), t.drawImage("../../images/quanexianfan.png", L[d] + y - c(80), D[d], c(80), c(80));
                    var w = "";
                    r.length < 4 && (2 == r.length ? (b = c(686) * m, k = c(306) * m, T = c(33) * m, 
                    I = c(666) * m, w = "../../images/btm_ban_long.png") : 3 == r.length && (b = c(338) * m, 
                    k = c(338) * m, T = c(380) * m, I = c(650) * m, w = "../../images/btm_ban_short.png"), 
                    t.drawImage(w, T, I, b, k)), t.beginPath(), t.rect(c(32) * m, c(1030) * m, c(686) * m, c(2)), 
                    t.setFillStyle("#adadad"), t.closePath(), t.fill();
                    var x = u.list_wenan;
                    t.beginPath(), t.setFillStyle("#ff0000"), t.setFontSize(c(28) * m), t.closePath(), 
                    n(t, x, c(32) * m, c(1130) * m);
                    var p = u.start + "开启返现抢购识别右边小程序二维码参与活动";
                    t.beginPath(), t.setFillStyle("#000"), t.setFontSize(c(28) * m), t.closePath(), 
                    n(t, p, c(32) * m, c(1230) * m), t.drawImage(h, c(415), c(870), c(160), c(160)), 
                    t.draw(), l(e);
                },
                fail: function(e) {
                    console.info("下载失败"), wx.hideLoading(), wx.showToast({
                        title: "分享失败，请重试",
                        icon: "none",
                        duration: 0,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    });
                }
            });
        }
    });
}

function a(a, n) {
    wx.showLoading({
        title: "正在生成图片",
        mask: !0,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    }), wx.request({
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
        success: function(o) {
            console.log("res.data.access_token", o.data.data), d = o.data.data, void 0 !== wx.getStorageSync("real_code") && "" != wx.getStorageSync("real_code") && null != wx.getStorageSync("real_code") || wx.setStorageSync("real_code", ""), 
            console.log("getMutilGood_real_code", wx.getStorageSync("real_code"));
            var i = wx.getStorageSync("real_code") + "#4";
            console.log("goodsId", i), wx.request({
                url: getApp().globalData.appUrl + "/h5/exemption/share",
                data: {
                    openId: wx.getStorageSync("uid"),
                    channelId: String(getApp().globalData.channelId),
                    scene: i,
                    page: "page/index/index",
                    access_token: d,
                    goodsId: n
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(n) {
                    if (0 == n.data.code) {
                        if (r = n.data.data.goods, "undefined" == (u = n.data.data).length || null == u.image_url) return void wx.showToast({
                            title: "获取信息失败，请稍后再试",
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
                        });
                        "" != u.image_url && wx.getImageInfo({
                            src: u.image_url,
                            success: function(n) {
                                g = n.path, "" != u.xiaochenxu_url && wx.getImageInfo({
                                    src: u.xiaochenxu_url,
                                    success: function(n) {
                                        h = n.path, wx.hideLoading(), "" != h ? 0 == w ? e(a) : 1 == w && r.length > 1 ? t(a) : r.length <= 1 && e(a) : wx.showToast({
                                            title: "图片获取失败",
                                            icon: "none",
                                            duration: 2e3,
                                            mask: !0,
                                            success: function(e) {},
                                            fail: function(e) {},
                                            complete: function(e) {}
                                        });
                                    },
                                    fail: function(e) {},
                                    complete: function(e) {}
                                });
                            },
                            fail: function(e) {},
                            complete: function(e) {}
                        });
                    } else wx.showToast({
                        title: String(n.data.errorMsg),
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
                    });
                },
                fail: function(e) {
                    wx.showToast({
                        title: "获取数据失败",
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
    });
}

function n(e, t, a, n) {
    for (var o = t.split(""), i = "", s = [], l = 0; l < o.length; l++) e.measureText(i).width * m < c(340) * m ? i += o[l] : (l--, 
    s.push(i), i = "");
    if (s.push(i), s.length > 2) {
        for (var r = s.slice(0, 2), u = r[1], f = "", g = [], l = 0; l < u.length && e.measureText(f).width * m < c(340) * m; l++) f += u[l];
        g.push(f);
        var d = g[0] + "";
        r.splice(1, 1, d), s = r;
    }
    for (var h = 0; h < s.length; h++) e.fillText(s[h], a, n + h * c(50) * m);
}

function o(e, t, a, n) {
    for (var o = t.split(""), i = "", s = [], l = 0; l < o.length; l++) e.measureText(i).width * m < c(310) * m ? i += o[l] : (l--, 
    s.push(i), i = "");
    if (s.push(i), s.length > 3) {
        for (var r = s.slice(0, 3), u = r[1], f = "", g = [], l = 0; l < u.length && e.measureText(f).width * m < c(310) * m; l++) f += u[l];
        g.push(f);
        var d = g[0] + "";
        r.splice(1, 1, d), s = r;
    }
    for (var h = 0; h < s.length; h++) e.fillText(s[h], a, n + h * c(50) * m);
}

function i(e) {
    var t = e.success, a = e.fail, n = "", o = e.url;
    n = e.id ? e.id : o, wx.downloadFile({
        url: e.url,
        success: function(e) {
            console.log("downloadFile", e), wx.saveFile({
                tempFilePath: e.tempFilePath,
                success: function(e) {
                    e.id = n, t && (console.info("成功"), t(e));
                },
                fail: function(e) {
                    console.info("保存一个文件失败", e), a && a(e);
                }
            });
        },
        fail: function(e) {
            console.info("下载一个文件失败", e), a && a(e);
        }
    });
}

function s(e) {
    console.info("准备下载。。。");
    for (var t = e.success, a = e.fail, n = e.urls, o = new Array(), s = n.length, l = 0; l < s; l++) i({
        url: n[l],
        success: function(e) {
            e.savedFilePath;
            o.push(e), console.info("savedFilePaths.size ", o.length), console.info("urlsLength ", s), 
            console.info("res.id ", e.id), o.length == s && t && t(o);
        },
        fail: function(e) {
            console.info("下载失败"), a && a(e);
        }
    });
}

function l(e) {
    setTimeout(function() {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: "shareCanvas",
            quality: 1,
            success: function(t) {
                wx.getSystemInfoSync();
                wx.hideLoading(), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "图片已保存至相册",
                            icon: "success",
                            duration: 2e3,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {
                                setTimeout(function() {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }, 2e3);
                            },
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
                            success: function(e) {
                                e.authSetting["scope.writePhotosAlbum"] ? console.log("保存图片已授权") : wx.showModal({
                                    title: "权限",
                                    content: "您还没有授权保存图片权限",
                                    confirmText: "去授权",
                                    cancelText: "取消",
                                    success: function(e) {
                                        console.log(e), e.cancel || wx.openSetting({
                                            success: function(e) {
                                                e.authSetting["scope.writePhotosAlbum"] && console.log("开启权限成功");
                                            }
                                        });
                                    },
                                    fail: function(e) {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }
                                });
                            },
                            fail: function(e) {}
                        });
                    }
                }), wx.navigateBack({
                    delta: 1
                }), e.setData({
                    shareImage: t.tempFilePath,
                    showSharePic: !0
                }), wx.hideLoading();
            },
            fail: function(e) {
                wx.hideLoading(), console.log("resFail", e), wx.navigateBack({
                    delta: 1
                });
            }
        });
    }, 2e3);
}

function c(e) {
    return e * f;
}

var r, u, f, g, d, h, w = 0, x = getApp();

Page({
    data: {
        isFreeorder: !1
    },
    drawImageSinge: function(t) {
        e(this);
    },
    drawImage: function(e) {
        t(this);
    },
    onLoad: function(e) {
        var t = this;
        w = e.h5_type, console.log("drawshareimg", e), e.isFreeorder && this.setData({
            isFreeorder: !0
        }), console.log("drawshareimg", w);
        var n = "";
        0 == e.h5_type && (n = e.goods_id), a(t, n), wx.getSystemInfo({
            success: function(e) {
                f = e.windowWidth / 750, t.setData({
                    winWidth: e.windowWidth,
                    winHeight: e.windowHeight
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.getSavedFileList({
            success: function(e) {
                for (var t = 0; t < e.fileList.length; t++) wx.removeSavedFile({
                    filePath: e.fileList[t].filePath
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {
        console.log("drawshareimg_onUnload", this.data.isFreeorder), this.data.isFreeorder && (x.globalData.isFreeback = 1);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});

var m = .8;