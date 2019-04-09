function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function t(e) {
    wx.request({
        url: v.globalData.appUrl + "/category",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            e.setData({
                typeList: t.data.data
            }, function() {
                a(e);
            });
        }
    });
}

function a(e) {
    console.log("app.globalData.miniVer", v.globalData.miniVer), wx.request({
        url: v.globalData.appUrl + "/ad",
        data: {
            openId: wx.getStorageSync("uid"),
            uid: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            miniVer: String(v.globalData.miniVer)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            console.log("Banner", t.data.data);
            var a = t.data.tipText;
            1 == t.data.isNewVer && "" != a && void 0 !== a && null != a ? (e.setData({
                isShowDew: !0,
                dialogText: a
            }), wx.hideTabBar({
                aniamtion: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            })) : (e.setData({
                isShowDew: !1,
                bannerList: t.data.data
            }, function() {
                s(e), o(e, A, "", e.data.order, k);
            }), wx.showTabBar({
                aniamtion: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            }));
        },
        fail: function(t) {
            wx.showToast({
                title: t
            }), e.setData({
                networkType: !1
            });
        }
    });
}

function o(e, t, a, o, n) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), console.log("uid", wx.getStorageSync("uid")), wx.request({
        url: v.globalData.appUrl + "/goodslist",
        data: {
            category_id: t,
            keyword: a,
            order: o,
            page: n,
            isgy: 0,
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            if (console.log("getGoodList", t), 0 == t.data.code) {
                if (L = t.data.data.type, console.log("myTypeLocal", L), console.log("needToBind", P), 
                0 == L && P && (P = !1), L == t.data.data.type && U && k > 1) return U = !1, void wx.hideToast();
                n <= 1 && (f = new Array()), 0 == t.data.data.type ? getApp().globalData.isBuyerLocal = !0 : getApp().globalData.isBuyerLocal = !1, 
                console.log("isBuyerLocal", getApp().globalData.isBuyerLocal), R && e.data.needGoFree && (R = !1, 
                D.default.goZhuLi(e), e.setData({
                    goType: "",
                    needGoFree: !1
                }));
                for (var a = new Array(), o = 0; o < t.data.data.goods.length; o++) {
                    var i = t.data.data.goods[o], l = 0;
                    l = parseFloat(i.promotion_price).toFixed(2) + parseFloat(i.act_promotion_price).toFixed(2);
                    var c = !1, r = 0;
                    r = parseFloat(parseFloat(i.promotion_price).toFixed(2)) + parseFloat(parseFloat(i.act_promotion_price).toFixed(2)), 
                    parseFloat(r) > 100 ? (r = parseInt(r), c = !1) : (c = !1, r = parseFloat(r).toFixed(2)), 
                    parseFloat(r) > 1e3 && (r = parseFloat(r / 1e4).toFixed(2), c = !0);
                    var s = i.final_price, d = !1, g = !1;
                    parseFloat(i.final_price) > 1e3 ? (s = i.final_price / 1e4 + "", d = !0) : parseFloat(i.final_price) > 100 && (s = parseInt(parseFloat(i.final_price).toFixed(2))), 
                    String(s).length > 4 && (g = !0), s = parseFloat(s).toFixed(2);
                    var p, u = parseFloat(l), w = !1, h = !1;
                    l > 1e3 ? (p = l / 1e4, u = parseFloat(p).toFixed(2), w = !0) : u = parseFloat(l) > 100 ? parseInt(parseFloat(l).toFixed(2)) : parseFloat(l).toFixed(2), 
                    h = String(u).length > 4;
                    var y = {
                        act_promotion_price: i.act_promotion_price,
                        coupon_discount: i.coupon_discount,
                        final_price: s,
                        flag: i.flag,
                        goods_id: i.goods_id,
                        goods_image_url: i.goods_image_url,
                        goods_name: i.goods_name,
                        goods_thumbnail_url: i.goods_thumbnail_url,
                        price: i.price,
                        promotion_price: i.promotion_price,
                        sold_quantity: i.sold_quantity,
                        zhuan: u,
                        isZhuanWan: w,
                        isZhuanFull: h,
                        isPriceWan: d,
                        isPriceFull: g,
                        zhuan2: r,
                        isZhuan2Wan: c
                    };
                    a.push(y), f.push(y);
                }
                e.setData({
                    goodListM: f,
                    isLoading: !1,
                    isBuyer: getApp().globalData.isBuyerLocal,
                    page: k
                }, function() {
                    wx.hideToast(), wx.stopPullDownRefresh();
                });
            } else wx.showToast({
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

function n(e, t) {
    console.log(t);
    var a = t.currentTarget.offsetLeft + 15;
    e.setData({
        move_left: a + "px"
    });
}

function i(e) {
    wx.request({
        url: v.globalData.appUrl + "/share",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            console.log("获取分享信息", e), 0 == e.data.code && (getApp().globalData.shareTitle = e.data.data.share_msg, 
            getApp().globalData.shareImageUrl = e.data.data.share_img_url);
        },
        fail: function(e) {}
    });
}

function l(e) {
    wx.getNetworkType({
        success: function(t) {
            var a = !0;
            a = "none" != t.networkType, e.setData({
                networkType: a
            });
        }
    }), g(e), t(e), i(e);
}

function c(e) {
    return e / wx.getSystemInfoSync().windowWidth * 750;
}

function r(e, t) {
    void 0 !== C && "" != C && null != C || (C = "");
    var a = "";
    console.log("goods_id=" + O + "，goods_type_prop=" + C + "，goods_type=" + W + "，uid=" + wx.getStorageSync("uid") + "，code=" + t), 
    wx.request({
        url: v.globalData.appUrl + "/selfPddImage",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            code: t,
            goods_type: W,
            goods_type_prop: C,
            goods_id: O
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            console.log("selfPddImage", e), 0 == e.data.code ? (a = e.data.data.page_path, console.log("goods_type=" + W + "，goods_type_prop=" + C), 
            wx.navigateTo({
                url: "../index/goodsdetail/goodsdetail?goods_id=" + O + "&goods_type=" + W + "&goods_type_prop=" + C
            })) : wx.showToast({
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
}

function s(e) {
    d(e), setTimeout(function() {
        s(e);
    }, 3e5);
}

function d(e) {
    wx.request({
        url: v.globalData.appUrl + "/getQFInfo",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            console.log("QFInfo", t), 0 == t.data.code && (X = t.data.data).length > 0 && e.setData({
                QF_list: t.data.data
            });
        }
    });
}

function g(e) {
    wx.request({
        url: v.globalData.appUrl + "/isOpenInvitePartner",
        data: {
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            console.log("isOpenInvitePartner", t), 0 == t.data.code && 1 == t.data.data.flag && e.setData({
                duoke_name: t.data.data.name,
                duoke_phone: t.data.data.mobile,
                hiddenmodalput: !1
            });
        }
    });
}

function p(e, t) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), console.log("uid", wx.getStorageSync("uid")), console.log("deal_result", t), 
    wx.request({
        url: v.globalData.appUrl + "/addPartner",
        data: {
            code: wx.getStorageSync("real_code"),
            openId: wx.getStorageSync("uid"),
            uid: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            deal_result: t
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            console.log("addPartner", t), u(e);
        },
        fail: function(e) {
            wx.showToast({
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
}

function u(e) {
    console.log("myuid11111111", wx.getStorageSync("uid")), wx.request({
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
            console.log("setRealCode", e), 0 == e.data.code && ("" != e.data.data || b("undefined" != e.data.data)) && wx.setStorageSync("real_code", e.data.data);
        },
        fail: function(e) {
            wx.hideLoading();
        }
    });
}

function w(e) {
    console.log("app.globalData.miniVer", v.globalData.miniVer), wx.request({
        url: v.globalData.appUrl + "/ad",
        data: {
            openId: wx.getStorageSync("uid"),
            uid: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            miniVer: String(v.globalData.miniVer)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            console.log("Banner", t.data.data);
            t.data.tipText, t.data.isNewVer;
            e.setData({
                bannerList: t.data.data
            }), "" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", options.real_code);
            for (var a = "", o = e.data.bannerList, n = 0; n < e.data.bannerList.length; n++) x == o[n].id && (a = encodeURIComponent(o[n].url + "&isOld=" + e.data.isOld));
            "" != a && wx.navigateTo({
                url: "../webview/webview?xinsourl=" + a
            }), e.setData({
                goToType: ""
            });
        },
        fail: function(t) {
            wx.showToast({
                title: t
            }), e.setData({
                networkType: !1
            });
        }
    });
}

function h(e) {
    if (console.log("that.data.isScopeFinish11111111111111", e.data.isScopeFinish), 
    console.log("that.data.goToType11111111111111", e.data.goToType), B = _ == wx.getStorageSync("uid") ? 1 : 0, 
    e.data.isScopeFinish) if ("6" == e.data.goToType) if ("" != x && "no" != x) w(e); else {
        if (0 == e.data.intoTypeFowWeb || 1 == e.data.intoTypeFowWeb || 2 == e.data.intoTypeFowWeb) {
            t = encodeURIComponent(getApp().globalData.appUrlJi + "/h5/channelgoodslist?page=1&channel_type=" + e.data.intoTypeFowWeb + "&openId=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId);
            wx.navigateTo({
                url: "../webview/webview?xinsourl=" + t + "&intoType=" + e.data.intoTypeFowWeb
            });
        } else if (3 == e.data.intoTypeFowWeb) {
            t = encodeURIComponent(getApp().globalData.appUrlJi + "/h5/themelist?page=1&openId=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId);
            wx.navigateTo({
                url: "../webview/webview?xinsourl=" + t + "&intoType=3"
            });
        } else 4 == e.data.intoTypeFowWeb && (console.log("-------------------------------"), 
        D.default.goFree(this));
        e.setData({
            goToType: ""
        });
    } else if ("7" == e.data.goToType) wx.switchTab({
        url: "../hotsale/hotsale",
        success: function(e) {},
        fail: function(e) {},
        complete: function(t) {
            e.setData({
                goToType: ""
            });
        }
    }); else if ("8" == e.data.goToType) wx.switchTab({
        url: "../fuli/fuli",
        success: function(e) {},
        fail: function(e) {},
        complete: function(t) {
            e.setData({
                goToType: ""
            });
        }
    }); else if ("9" == e.data.goToType) {
        t = encodeURIComponent(getApp().globalData.miandanUrl + "/h5/exemption/goodslist?uid=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId);
        wx.navigateTo({
            url: "../webview/webview?xinsourl=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(t) {
                e.setData({
                    goToType: ""
                });
            }
        });
    } else if ("10" == e.data.goToType) {
        void 0 === T && (T = "");
        var t = encodeURIComponent(getApp().globalData.zhuliUrl + "?uid=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId + "&isMe=" + B + "&isOld=" + e.data.isOld + "&zhuliId=" + T);
        console.log(t), wx.navigateTo({
            url: "../webview/webview?xinsourl=" + t + "&intoType=5",
            success: function(e) {},
            fail: function(e) {},
            complete: function(t) {
                e.setData({
                    goToType: ""
                });
            }
        });
    } else "1" == e.data.goToType ? (W = e.data.goods_type, C = e.data.goods_type_prop, 
    O = e.data.goods_id, r(e, wx.getStorageSync("real_code")), e.setData({
        goToType: ""
    })) : "5" == e.data.goToType && wx.navigateTo({
        url: "turntable/turntable",
        success: function(t) {
            e.setData({
                goToType: ""
            });
        },
        fail: function(e) {},
        complete: function(e) {}
    });
}

var y, f, S, x, _, T, m, b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, D = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/util.js")), v = getApp(), I = new (require("../../utils/grid/wxgrid.js"))(), F = [], A = 0, k = 1, L = "", U = !1, P = !1, W = 0, C = "", O = "", X = [], B = 0, R = !1;

Page({
    data: (y = {
        wxgrid: I,
        mData: F,
        curIndex: 0,
        winWidth: 0,
        itemWidth: 0,
        itemHeight: 0,
        allWidth: 0,
        scale: .7,
        startClinetX: "",
        startTimestamp: "",
        translateDistance: 0,
        animationToLarge: {},
        animationToSmall: {},
        typeList: [],
        bannerList: [],
        goodList: [],
        animation: {},
        isFixedcate: !1,
        isBuyer: !1,
        top: 0,
        cuTypeId: 0,
        networkType: !0,
        isScrollX: !0,
        scrollTop: 0,
        scrollHeight: 0,
        isX5S: !1,
        isShowDew: !1,
        dialogText: "",
        order: 0
    }, e(y, "dialogText", ""), e(y, "avatar", "../../images/icon_head.png"), e(y, "show_QF", 1), 
    e(y, "QF_list", []), e(y, "duoke_name", ""), e(y, "duoke_phone", ""), e(y, "hiddenmodalput", !0), 
    e(y, "isIphoneX", !1), e(y, "isOld", 1), e(y, "goToType", 0), e(y, "page", 1), e(y, "isC", !1), 
    e(y, "mov_top", 250), e(y, "screenHeight", 0), e(y, "screenWidth", 0), e(y, "goods_type", 0), 
    e(y, "goods_type_prop", ""), e(y, "goods_id", 0), e(y, "isScopeFinish", !1), e(y, "intoTypeFowWeb", ""), 
    e(y, "move_left", "25rpx"), e(y, "needGoFree", !1), y),
    tongyi: function(e) {
        p(this, 1), this.setData({
            hiddenmodalput: !0
        });
    },
    jujue: function(e) {
        p(this, 0), this.setData({
            hiddenmodalput: !0
        });
    },
    toFanXian: function(e) {
        D.default.goFree(this);
    },
    toZhuLi: function(e) {
        var t = this, a = encodeURIComponent(getApp().globalData.zhuliUrl + "?uid=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId + "&isOld=" + t.data.isOld);
        console.log(a), wx.navigateTo({
            url: "../webview/webview?xinsourl=" + a + "&intoType=5"
        });
    },
    goTop: function(e) {
        this.setData({
            page: 0
        }), k = 1, o(this, A, "", this.data.order, k), wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    toZhuTi: function(e) {
        var t = encodeURIComponent(getApp().globalData.appUrlJi + "/h5/themelist?page=1&openId=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId);
        wx.navigateTo({
            url: "../webview/webview?xinsourl=" + t + "&intoType=3&banner_id=no"
        });
    },
    toBaoKuan: function(e) {
        console.log(e.currentTarget.dataset.type);
        var t = encodeURIComponent(getApp().globalData.appUrlJi + "/h5/channelgoodslist?page=1&channel_type=" + e.currentTarget.dataset.type + "&openId=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId);
        wx.navigateTo({
            url: "../webview/webview?xinsourl=" + t + "&intoType=" + e.currentTarget.dataset.type + "&banner_id=no"
        });
    },
    toZhuanPan: function(e) {
        wx.navigateTo({
            url: "turntable/turntable",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    orderTabClick: function(e) {
        var t = e.currentTarget.dataset.value;
        S = 3 == t || 4 == t ? 3 == S ? 4 : 4 == S ? 3 : t : t, this.setData({
            order: S
        }), o(this, A, "", S, 1), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        });
    },
    reload: function(e) {
        l(this);
    },
    scrollTopFun: function(e) {
        this.setData({
            top: e.detail.scrollTop
        });
    },
    QFClick: function(e) {
        var t = this;
        1 == t.data.show_QF ? t.setData({
            show_QF: 2
        }) : t.setData({
            show_QF: 1
        });
    },
    bannerClick: function(e) {
        var t = this;
        console.log("bannerClick", t.data.bannerList[e.target.dataset.b_index].url);
        var a = t.data.bannerList[e.target.dataset.b_index].url;
        "" != a && (a = encodeURIComponent(a), console.log("goUrl", t.data.bannerList[e.target.dataset.b_index].id), 
        wx.navigateTo({
            url: "../webview/webview?xinsourl=" + a + "&theme_title=" + t.data.bannerList[e.target.dataset.b_index].theme_title + "&banner_id=" + t.data.bannerList[e.target.dataset.b_index].id + "&intoType=3"
        }));
    },
    tabClick: function(e) {
        var t = this;
        wx.getNetworkType({
            success: function(a) {
                var i = !0;
                (i = "none" != a.networkType) ? (A = e.target.dataset.id, n(t, e), console.log("typeId", A), 
                t.setData({
                    cuTypeId: A,
                    order: 0
                }), o(t, A, "", t.data.order, 1), wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                })) : wx.showToast({
                    title: "当前无网络,请检查网络后重试",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), t.setData({
                    networkType: i
                });
            }
        });
    },
    goodsClick: function(e) {
        var t = this;
        wx.getNetworkType({
            success: function(a) {
                var o = !0;
                o = "none" != a.networkType;
                var n = 0, i = "";
                1 == e.currentTarget.dataset.goods.flag ? (n = 1, i = 0 == A ? "index" : "category") : n = 0, 
                console.log("goods_type=" + n + "，goods_type_prop=" + i), o ? wx.navigateTo({
                    url: "../index/goodsdetail/goodsdetail?goods_id=" + e.currentTarget.dataset.goods_id + "&goods_type=" + n + "&goods_type_prop=" + i
                }) : wx.showToast({
                    title: "当前无网络,请检查网络后重试",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), t.setData({
                    networkType: o
                });
            }
        });
    },
    swiperTouchstart: function(e) {
        var t = e.changedTouches[0].clientX;
        this.setData({
            startClinetX: t,
            startTimestamp: e.timeStamp
        });
    },
    swiperTouchmove: function(e) {},
    swiperTouchend: function(e) {
        var t = e.timeStamp - this.data.startTimestamp, a = e.changedTouches[0].clientX - this.data.startClinetX;
        if (t < 500 && Math.abs(a) > 10) {
            var o = this.data.curIndex, n = this.data.itemWidth, i = this.data.translateDistance, l = 0;
            a > 0 ? ((o -= 1) < 0 && (o = 0, n = 0), l = i + n) : ((o += 1) >= this.data.bannerList.length && (o = this.data.bannerList.length - 1, 
            n = 0), l = i - n), this.animationToLarge(o, l), this.animationToSmall(o, l), this.setData({
                curIndex: o,
                translateDistance: l
            });
        }
    },
    animationToLarge: function(e, t) {
        this.animation.translateX(t).scale(1).step(), this.setData({
            animationToLarge: this.animation.export()
        });
    },
    animationToSmall: function(e, t) {
        this.animation.translateX(t).scale(.7).step(), this.setData({
            animationToSmall: this.animation.export()
        });
    },
    sreachClick: function(e) {
        var t = this;
        wx.getNetworkType({
            success: function(e) {
                var a = !0;
                (a = "none" != e.networkType) ? wx.navigateTo({
                    url: "../search/search"
                }) : wx.showToast({
                    title: "当前无网络,请检查网络后重试",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), t.setData({
                    networkType: a
                });
            }
        });
    },
    onLoad: function(e) {
        var t = this;
        console.log("onLoad", e), f = new Array(), u(), wx.getSystemInfo({
            success: function(e) {
                var a = e.windowWidth, o = (e.windowHeight, t.data.bannerList.length * (.6 * a));
                t.setData({
                    screenHeight: e.windowHeight,
                    screenWidth: e.windowWidth,
                    mov_top: c(e.windowHeight) - 200,
                    scrollHeight: e.windowHeight,
                    winWidth: a,
                    itemWidth: .6 * a,
                    allWidth: o
                });
            }
        }), this.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 500,
            timingFunction: "ease-out",
            delay: 0
        }), console.log("real_code", e.real_code), console.log("real_type", e.type), m = e.type;
        var a = e.goods_id;
        if (x = e.banner_id, _ = e.uid, T = e.zhuliId, void 0 !== e.scene && "" != e.scene && null != e.scene) for (var o = decodeURIComponent(e.scene).split("#"), n = 0; n < o.length; n++) o.length > 0 && 0 == n && "" != o[0] && void 0 !== o[0] && "" != o[0] && null != o[0] && ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", o[0])), 
        o.length > 1 && 1 == n && "" != o[1] && (m = o[1]), o.length > 2 && 2 == n && "" != o[2] && (a = o[2]), 
        o.length > 3 && 3 == n && "" != o[3] && (x = o[3]), o.length > 5 && 5 == n && "" != o[5] && (_ = o[5]), 
        o.length > 6 && 6 == n && "" != o[6] && (T = o[6]);
        R = !1, "1" == m ? (void 0 !== e.real_code && "" != e.real_code && null != e.real_code && ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", e.real_code)), 
        W = e.goods_type, C = e.goods_type_prop, O = a, r(t, e.real_code)) : "2" == m || "3" == m || "4" == m ? (void 0 !== e.real_code && "" != e.real_code && null != e.real_code && ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", e.real_code)), 
        R = !0) : "5" == m ? ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", e.real_code), 
        t.setData({
            goToType: "5"
        })) : "6" == m ? ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", e.real_code), 
        t.setData({
            goToType: "6",
            intoTypeFowWeb: e.intoType
        })) : "7" == m ? ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", e.real_code), 
        t.setData({
            goToType: "7"
        })) : "8" == m ? ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", e.real_code), 
        t.setData({
            goToType: "8"
        })) : "9" == m ? ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", e.real_code), 
        t.setData({
            goToType: "9"
        })) : "10" == m ? ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", e.real_code), 
        t.setData({
            goToType: "10"
        })) : (void 0 !== e.real_code && "" != e.real_code && null != e.real_code && ("" != wx.getStorageSync("real_code") && void 0 !== wx.getStorageSync("real_code") || wx.setStorageSync("real_code", e.real_code)), 
        R = !0);
    },
    onReady: function() {},
    translate: function() {
        this.animation.translate(100, 0).step(), this.setData({
            animation: this.animation.export()
        });
    },
    onShow: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                var a = e.model;
                console.log("手机信息res" + e.system), console.log("手机信息res" + a), -1 == a.search("iPhone X") && -1 == a.search("iPhone 6") && -1 == a.search("iPhone 7") || (getApp().globalData.isIphoneX = !0, 
                t.setData({
                    isIphoneX: !0
                })), -1 != a.search("iPhone X") && (getApp().globalData.isIphoneXForGoods = !0), 
                -1 == a.search("X5S L") && -1 == a.search("A31C") || (getApp().globalData.isX5S = !0, 
                t.setData({
                    isX5S: !0
                }));
                try {
                    var o = e.system;
                    -1 != o.search("Android") && (o = (o = o.replace("Android", "")).replace(/\s+/g, ""), 
                    parseFloat(o));
                } catch (e) {
                    console.log(e.name + ": " + e.message);
                }
            }
        }), getApp().globalData.isTestCode && (console.log("onshow_real_code", wx.getStorageSync("real_code")), 
        wx.setNavigationBarTitle({
            title: "推推客(" + wx.getStorageSync("real_code") + ")",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })), getApp().globalData.cuTabBarPos = 0, getApp().globalData.isWebViewOut = !1, 
        console.log("isScope", wx.getStorageSync("isScope")), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? wx.getStorageSync("isScope") && "" != wx.getStorageSync("isScope") && void 0 !== wx.getStorageSync("isScope") ? (getApp().globalData.isScopeUserInfo = !0, 
                console.log("onshow", wx.getStorageSync("real_code")), t.setData({
                    isScopeFinish: !0
                }, function() {
                    h(t), l(t);
                })) : wx.navigateTo({
                    url: "../scope/scope?typeMy=" + m + "&goods_type=" + W + "&goods_type_prop=" + C + "&goods_id=" + O + "&real_code=" + wx.getStorageSync("real_code"),
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : (getApp().globalData.isScopeUserInfo = !1, wx.navigateTo({
                    url: "../scope/scope?typeMy=" + m + "&goods_type=" + W + "&goods_type_prop=" + C + "&goods_id=" + O + "&real_code=" + wx.getStorageSync("real_code"),
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }));
            }
        });
    },
    onHide: function() {
        U = !0, wx.hideLoading(), wx.hideToast();
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        var e = this;
        wx.getNetworkType({
            success: function(t) {
                var a = !0;
                a = "none" != t.networkType, k = 1, e.setData({
                    page: k
                }), a ? l(e) : wx.showToast({
                    title: "当前无网络,请检查网络后重试",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), e.setData({
                    networkType: a
                });
            }
        });
    },
    onPageScroll: function(e) {},
    onReachBottom: function(e) {
        var t = this;
        wx.getNetworkType({
            success: function(e) {
                var a = !0;
                (a = "none" != e.networkType) ? (k++, console.log("翻页typeId=" + A + "，iPage=" + k), 
                o(t, A, "", t.data.order, k)) : wx.showToast({
                    title: "当前无网络,请检查网络后重试",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), t.setData({
                    networkType: a
                });
            }
        });
    },
    onShareAppMessage: function(e) {
        return console.log("real_code", wx.getStorageSync("real_code")), e.from, {
            title: getApp().globalData.shareTitle,
            path: "pages/index/index?real_code=" + wx.getStorageSync("real_code"),
            imageUrl: getApp().globalData.shareImageUrl
        };
    }
});