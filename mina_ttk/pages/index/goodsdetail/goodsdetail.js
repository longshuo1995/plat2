function o(o, e) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), console.log("getGoodsDetail_real_code", g), wx.request({
        url: p.globalData.appUrl + "/goods",
        data: {
            goods_id: e,
            code: wx.getStorageSync("real_code"),
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            goods_type: g,
            goods_type_prop: m
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            if (0 == e.data.code) {
                var a = e.data.data;
                r = e.data.data, console.log("GoodsDetail", a);
                var n = t(String(a.promotion_price)), s = t(String(a.promotion_price)), i = t(String(a.act_promotion_price));
                h = a.page_path;
                var c = "";
                c = c + a.goods_name + "\n原价：" + a.price + "\n券后价：" + a.final_price + "\n下单地址：" + v;
                0 == a.type ? (!0, getApp().globalData.isBuyerLocal = !0) : (!1, getApp().globalData.isBuyerLocal = !1);
                var d = "";
                d = a.bu_type > 0 || o.data.isFreeorder ? "yellow_text_part" : "yellow_text_part_two";
                var l = parseFloat(e.data.data.promotion_price) + parseFloat(e.data.data.act_promotion_price);
                l = l.toFixed(2), o.setData({
                    goods_images: e.data.data.goods_gallery_urls,
                    goods: e.data.data,
                    isLoadFinish: !0,
                    lengthLeft: n,
                    lengthMiddle: s,
                    lengthRight: i,
                    shareText: c,
                    isBuyer: getApp().globalData.isBuyerLocal,
                    yellowPartClass: d,
                    zhuan: l
                }, function() {
                    wx.hideToast();
                });
            } else wx.showToast({
                title: String(e.data.errorMsg),
                icon: "none",
                mask: !0
            });
        }
    });
}

function e(o) {
    return o / 750 * wx.getSystemInfoSync().windowWidth;
}

function t(o) {
    for (var e = o.length, t = 0, a = 0; a < e; a++) 0 != (65280 & o.charCodeAt(a)) && t++, 
    t++;
    return t;
}

function a(o) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), console.log("code: " + wx.getStorageSync("real_code") + ",goods_id:" + o.data.goods.goods_id + ",openId:" + wx.getStorageSync("openId") + ",channelId:" + getApp().globalData.channelId), 
    "null" != wx.getStorageSync("real_code") && null != wx.getStorageSync("real_code") || (console.log("real_code"), 
    wx.setStorageSync("real_code", "")), wx.request({
        url: p.globalData.appUrl + "/pddCode",
        data: {
            code: wx.getStorageSync("real_code"),
            goods_id: o.data.goods.goods_id,
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            goods_type: g,
            goods_type_prop: m
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            console.log("getMiniPQR", e), "" != (f = e.data.data.url) ? ("" != S ? wx.downloadFile({
                url: f,
                success: function(e) {
                    console.log(e), 200 === e.statusCode && (f = e.tempFilePath, i(o, o.data.goods, 1));
                }
            }) : (wx.showToast({
                title: "获取信息失败,请重试",
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(o) {},
                fail: function(o) {},
                complete: function(o) {}
            }), o.setData({
                showModalStatus: !1
            })), wx.hideToast()) : wx.showToast({
                title: "微信调用超限，请稍后再试",
                icon: "none",
                duration: 2e3,
                mask: !0,
                success: function(o) {},
                fail: function(o) {},
                complete: function(o) {}
            });
        },
        fail: function(o) {
            wx.showToast({
                title: String(o),
                mask: !0
            });
        }
    });
}

function n(o) {
    var e = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-in-out",
        delay: 0
    });
    o.animation = e, e.translateY(300).step(), o.setData({
        animationData: e.export(),
        showModalStatus: !0
    }), setTimeout(function() {
        e.translateY(0).step(), o.setData({
            animationData: e.export()
        });
    }.bind(o), 0);
}

function s(o) {
    var e = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-in-out",
        delay: 0
    });
    o.animation = e, e.translateY(300).step(), o.setData({
        animationData: e.export()
    }), setTimeout(function() {
        e.translateY(0).step(), o.setData({
            animationData: e.export(),
            showModalStatus: !1
        });
    }.bind(o), 0);
}

function i(o, t, a) {
    wx.showLoading({
        title: "正在生成图片...",
        mask: !0
    }), o.setData({
        canvasShow: "",
        isShareDialogShow: !1
    });
    wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight;
    var n = wx.createCanvasContext("shareCanvas");
    n.rect(0, 0, e(750), e(1044)), n.setFillStyle("white"), n.fill(), wx.getImageInfo({
        src: S,
        success: function(s) {
            console.log("success", s);
            var c = s.path;
            o.setData({
                localImageUrl: c,
                showModalStatus: !1
            }), n.drawImage(c, 0, 0, e(750), e(724));
            var d = t.goods_name.split(""), l = "", r = [];
            n.setFontSize(e(30)), n.setFillStyle("#111111");
            for (S = 0; S < d.length; S++) n.measureText(l).width < e(372) ? l += d[S] : (S--, 
            r.push(l), l = "");
            if (r.push(l), r.length > 3) {
                for (var g = r.slice(0, 3), p = g[2], w = "", h = [], S = 0; S < p.length && n.measureText(w).width < e(372); S++) w += p[S];
                h.push(w);
                var x = h[0] + "...";
                g.splice(2, 2, x), r = g;
            }
            for (var _ = 0; _ < r.length; _++) n.fillText(r[_], e(30), e(840) + _ * e(50));
            n.save(), t.coupon_discount > 0 && n.drawImage("../../../images/quanhoujia.png", e(30), e(750), e(112), e(38)), 
            t.coupon_discount > 0 ? (n.beginPath(), n.setFillStyle("#000"), n.setFontSize(e(48)), 
            n.closePath(), n.fillText("¥" + t.final_price, e(150), e(785))) : (n.beginPath(), 
            n.setFillStyle("#000"), n.setFontSize(e(48)), n.closePath(), n.fillText("¥" + t.final_price, e(30), e(785))), 
            t.coupon_discount > 0 && (n.drawImage("../../../images/bk_youhuiquan.png", e(30), e(979), e(177), e(40)), 
            n.beginPath(), n.setFillStyle("#000"), n.setFontSize(e(24)), n.closePath(), n.fillText(t.coupon_discount + "元", e(50), e(1005))), 
            0 == a ? u.api.draw(v, n, e(254), e(254), this, "", e(465), e(735)) : n.drawImage(f, e(465), e(735), e(254), e(254)), 
            n.beginPath(), n.setFillStyle("#4E4E4E"), n.setFontSize(e(30)), n.closePath(), n.fillText("长按识别二维码购买", e(455), e(1010)), 
            n.draw(), setTimeout(function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    canvasId: "shareCanvas",
                    quality: 1,
                    success: function(e) {
                        wx.getSystemInfoSync();
                        wx.saveImageToPhotosAlbum({
                            filePath: e.tempFilePath,
                            success: function(e) {
                                wx.showToast({
                                    title: "图片已保存",
                                    icon: "success",
                                    duration: 2e3,
                                    mask: !0,
                                    success: function(o) {},
                                    fail: function(o) {},
                                    complete: function(o) {}
                                }), o.setData({
                                    canvasShow: "none",
                                    showModalStatus: !1
                                });
                            },
                            fail: function(e) {
                                console.log("fail", e), o.setData({
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
                                                        e.authSetting["scope.writePhotosAlbum"] && (console.log("开启权限成功"), i(o, t, a));
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }), o.setData({
                            shareImage: e.tempFilePath,
                            showSharePic: !0
                        }), wx.hideLoading();
                    },
                    fail: function(o) {
                        wx.hideLoading(), console.log("resFail", o);
                    }
                });
            }, 2e3);
        },
        fail: function(e) {
            console.log("fail", e), wx.hideLoading(), o.setData({
                canvasShow: "none",
                showModalStatus: !1
            }), wx.showToast({
                title: "获取信息失败",
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(o) {},
                fail: function(o) {},
                complete: function(o) {}
            });
        }
    });
}

function c(e) {
    wx.showLoading({
        title: "处理中，请稍后"
    }), wx.login({
        success: function(t) {
            console.log("login", t), wx.getUserInfo({
                success: function(a) {
                    var n = t.code;
                    console.log("getUserInfo", a), console.log("code", n);
                    var s = wx.getStorageSync("real_code");
                    console.log("real_code", wx.getStorageSync("real_code")), null != wx.getStorageSync("real_code") && "" != wx.getStorageSync("real_code") && void 0 != wx.getStorageSync("real_code") && "undefined" != wx.getStorageSync("real_code") || (s = ""), 
                    wx.request({
                        url: p.globalData.appUrl + "/weixinAuth",
                        data: {
                            js_code: n,
                            encryptedData: a.encryptedData,
                            siv: a.iv,
                            openId: wx.getStorageSync("uid"),
                            channelId: getApp().globalData.channelId,
                            code: s
                        },
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success: function(t) {
                            console.log("weixinAuth", t), 0 == t.data.code ? ("" == t.data.data.uid && void 0 === t.data.data.uid || wx.setStorageSync("uid", t.data.data.uid), 
                            "" == t.data.data.real_code && void 0 === t.data.data.real_code || wx.setStorageSync("real_code", t.data.data.real_code), 
                            0 == getApp().globalData.isBuyerLocal ? (getApp().globalData.isScopeUserInfo = !0, 
                            l(e)) : 0 == t.data.data.type ? (console.log("goodsdetail", wx.getStorageSync("real_code")), 
                            wx.navigateTo({
                                url: "../../my/bindaccount/bindaccount?into_type=0&goods_id=" + w + "&goods_type_prop=" + m + "&goods_type=" + g
                            })) : o(e, w), wx.hideLoading()) : (wx.hideLoading(), wx.showToast({
                                title: String(t.data.errorMsg),
                                icon: "none",
                                duration: 1e3,
                                mask: !0,
                                success: function(o) {},
                                fail: function(o) {},
                                complete: function(o) {}
                            }));
                        },
                        fail: function(o) {}
                    });
                },
                fail: function() {
                    console.log("获取用户信息失败"), wx.hideLoading();
                }
            });
        },
        fail: function(o) {
            console.log(o.data.data.errorMsg), wx.hideLoading();
        }
    });
}

function d(o) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: p.globalData.appUrl + "/shareList",
        data: {
            type: 1,
            code: wx.getStorageSync("real_code"),
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(o) {
            0 == o.data.code ? (console.log("getShareInfo", o), x = o.data.data.title, _ = o.data.data.url, 
            "" != o.data.data.code && void 0 !== o.data.data.code || wx.setStorageSync("real_code", o.data.data.code)) : wx.showToast({
                title: String(o.data.errorMsg),
                icon: "none",
                mask: !0
            });
        }
    });
}

function l(o) {
    void 0 !== m && "" != m && null != m || (m = "");
    var e = "";
    console.log("goods_id=" + w + "，goods_type_prop=" + m + "，goods_type=" + g + "，uid=" + wx.getStorageSync("uid") + "，code=" + wx.getStorageSync("real_code")), 
    wx.request({
        url: p.globalData.appUrl + "/selfPddImage",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            code: wx.getStorageSync("real_code"),
            goods_type: g,
            goods_type_prop: m,
            goods_id: r.goods_id
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            console.log("selfPddImage", t), 0 == t.data.code ? (e = t.data.data.page_path, wx.navigateToMiniProgram({
                appId: "wx32540bd863b27570",
                path: e,
                envVersion: "release",
                success: function(o) {},
                fail: function(e) {
                    wx.getNetworkType({
                        success: function(e) {
                            var t = !0;
                            (t = "none" != e.networkType) || wx.showToast({
                                title: "当前无网络,请检查网络后重试",
                                icon: "none",
                                duration: 1e3,
                                mask: !0,
                                success: function(o) {},
                                fail: function(o) {},
                                complete: function(o) {}
                            }), o.setData({
                                networkType: t
                            });
                        }
                    });
                }
            })) : wx.showToast({
                title: String(t.data.errorMsg),
                icon: "none",
                duration: 1e3,
                mask: !0,
                success: function(o) {},
                fail: function(o) {},
                complete: function(o) {}
            });
        }
    });
}

var r, g, u = require("../../../utils/qrcode.js"), p = getApp(), w = "", h = "", f = "", S = "", x = "", _ = "", y = 0, m = "", v = "", T = "";

Page({
    data: {
        goods_images: [],
        goods: {},
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        isBuyer: !0,
        canvasShow: "none",
        shareText: "",
        isShareDialogShow: !1,
        lengthLeft: 0,
        lengthMiddle: 0,
        lengthRight: 0,
        isLoadFinish: !1,
        localImageUrl: "",
        shareImage: "",
        animationData: {},
        showModalStatus: !1,
        yellowPartClass: "yellow_text_part_two",
        zhuan: 0,
        isIphoneX: !1,
        isFreeorder: !1,
        isX5S: !1,
        isIphoneXForGoods: !1,
        isZhuli: !1,
        goods_type_data: 0
    },
    toIndex: function(o) {
        var e = getCurrentPages(), t = (e[e.length - 1], e[e.length - 2]);
        console.log("2222222222222222222222"), t.setData({
            isGoodsBack: !0
        }), wx.navigateBack({
            delta: 100
        });
    },
    shareByPdd: function(o) {
        a(this);
    },
    buyerBur: function(o) {
        l(this);
    },
    close_dialog: function(o) {
        s(this), this.setData({
            isShareDialogShow: !1
        });
    },
    bindGetUserInfo: function(o) {
        var e = this;
        wx.getNetworkType({
            success: function(o) {
                var t = !0;
                (t = "none" != o.networkType) ? c(e) : wx.showToast({
                    title: "当前无网络,请检查网络后重试",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(o) {},
                    fail: function(o) {},
                    complete: function(o) {}
                }), e.setData({
                    networkType: t
                });
            }
        });
    },
    showShare: function(o) {
        var e = this;
        wx.getNetworkType({
            success: function(o) {
                var t = !0;
                (t = "none" != o.networkType) ? (e.setData({
                    isShareDialogShow: !0
                }), console.log("goods_id=" + w + "，goods_type_prop=" + m + "，goods_type=" + g + "，uid=" + wx.getStorageSync("uid") + "，code=" + wx.getStorageSync("real_code")), 
                wx.showLoading({
                    title: "正在获取数据"
                }), wx.request({
                    url: getApp().globalData.appUrl + "/sharePddImage",
                    data: {
                        goods_id: e.data.goods.goods_id,
                        openId: wx.getStorageSync("uid"),
                        code: wx.getStorageSync("real_code"),
                        goods_type: g,
                        goods_type_prop: m,
                        channelId: getApp().globalData.channelId
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        if (wx.hideLoading(), console.log("showShare", o), 0 == o.data.code) {
                            S = o.data.data.imageUrl, T = o.data.data.page_path, v = o.data.data.goods_h5_url;
                            var t = "";
                            t = t + r.goods_name + "\n原价：" + r.price + "\n券后价：" + r.final_price + "\n下单地址：" + v, 
                            e.setData({
                                shareText: t
                            }), getApp().globalData.isTestCode && wx.setNavigationBarTitle({
                                title: "商品详情(" + wx.getStorageSync("real_code") + ")",
                                success: function(o) {},
                                fail: function(o) {},
                                complete: function(o) {}
                            }), n(e), wx.hideLoading();
                        } else wx.showToast({
                            title: String(o.data.errorMsg),
                            icon: "none",
                            duration: 1e3,
                            mask: !0,
                            success: function(o) {},
                            fail: function(o) {},
                            complete: function(o) {}
                        });
                    },
                    fail: function(o) {
                        wx.hideLoading();
                    }
                })) : wx.showToast({
                    title: "当前无网络,请检查网络后重试",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(o) {},
                    fail: function(o) {},
                    complete: function(o) {}
                }), e.setData({
                    networkType: t
                });
            }
        });
    },
    drawSharePic: function(o) {
        var e = this, t = this.data.goods;
        console.log("image_url", S), "" != S ? i(e, t, 0) : (wx.showToast({
            title: "获取信息失败,请重试",
            icon: "none",
            duration: 1e3,
            mask: !0,
            success: function(o) {},
            fail: function(o) {},
            complete: function(o) {}
        }), e.setData({
            showModalStatus: !1
        }));
    },
    copyText: function(o) {
        var e = this;
        wx.setClipboardData({
            data: e.data.shareText,
            success: function(o) {
                wx.showToast({
                    title: "已复制文案",
                    icon: "success",
                    duration: 2e3,
                    mask: !0,
                    success: function(o) {},
                    fail: function(o) {},
                    complete: function(o) {}
                });
            }
        });
    },
    hideModal: function() {
        s(this);
    },
    onLoad: function(o) {
        y = o.h5_tab;
        var e = this;
        w = o.goods_id, g = o.goods_type, m = o.goods_type_prop, console.log("options", o);
        var t = !1;
        void 0 !== o.isFreeorder && (t = o.isFreeorder), this.setData({
            isFreeorder: t,
            goods_type_data: o.goods_type
        }), d(), 4 == g || e.data.isFreeorder ? wx.hideShareMenu({
            success: function(o) {},
            fail: function(o) {},
            complete: function(o) {}
        }) : wx.showShareMenu({
            withShareTicket: !1,
            success: function(o) {},
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    onReady: function() {},
    onShow: function(e) {
        var t = p.globalData.isIphoneX, a = p.globalData.isX5S, n = p.globalData.isIphoneXForGoods;
        this.setData({
            isLoadFinish: !1,
            isIphoneX: t,
            isX5S: a,
            isIphoneXForGoods: n
        }), o(this, w), getApp().globalData.isTestCode && wx.setNavigationBarTitle({
            title: "商品详情(" + wx.getStorageSync("real_code") + ")",
            success: function(o) {},
            fail: function(o) {},
            complete: function(o) {}
        }), wx.getSavedFileList({
            success: function(o) {
                for (var e = 0; e < o.fileList.length; e++) wx.removeSavedFile({
                    filePath: o.fileList[e].filePath
                });
            }
        });
    },
    onHide: function() {
        wx.hideLoading(), wx.hideToast();
    },
    onUnload: function() {
        this.data.isFreeorder && (p.globalData.isFreeback = 1);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(o) {
        var e = this, t = e.data.goods.goods_name;
        t = t.slice(0, 18), t += "...";
        var a = x;
        a = e.data.goods.coupon_discount > 0 ? (a = (a = x.replace("{coupon_discount}", e.data.goods.coupon_discount)).replace("{min_group_price}", e.data.goods.final_price)).replace("{cost_price}", e.data.goods.price) : "【¥" + e.data.goods.price + "】" + e.data.goods.goods_name;
        var n = wx.getStorageSync("real_code");
        return T = encodeURIComponent(T), console.log("goods_type", g), console.log("goods_type_prop", m), 
        console.log("goods_id", e.data.goods.goods_id), console.log("real_code", wx.getStorageSync("real_code")), 
        o.from, {
            title: a,
            path: "pages/index/index?goods_id=" + e.data.goods.goods_id + "&real_code=" + n + "&type=1&page_path=" + T + "&goods_type=" + g + "&goods_type_prop=" + m,
            imageUrl: e.data.goods.goods_gallery_urls[0]
        };
    }
});