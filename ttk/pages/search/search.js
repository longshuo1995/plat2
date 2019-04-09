function t(t) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: n.globalData.appUrl + "/keyword",
        data: {},
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(a) {
            console.log(a), t.setData({
                hot_search_word: a.data.data
            }), wx.hideToast();
        },
        fail: function(t) {
            wx.showToast({
                title: t,
                mask: !0
            });
        }
    });
}

function a(t, a, o, e, s) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: n.globalData.appUrl + "/goodslist",
        data: {
            category_id: a,
            keyword: o,
            order: e,
            page: s,
            isgy: "",
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(a) {
            if (console.log("getGoodList", a), c == a.data.data.type && p) return p = !1, void wx.hideToast();
            if (0 == a.data.code) {
                s <= 1 && (i = new Array()), c = a.data.data.type, 0 == a.data.data.type ? getApp().globalData.isBuyerLocal = !0 : getApp().globalData.isBuyerLocal = !1, 
                t.setData({
                    isBuyer: getApp().globalData.isBuyerLocal
                });
                for (var o = new Array(), e = 0; e < a.data.data.goods.length; e++) {
                    var n = a.data.data.goods[e], r = 0;
                    r = 0 == c ? parseFloat(n.promotion_price).toFixed(2) + parseFloat(n.act_promotion_price).toFixed(2) : parseFloat(n.act_promotion_price).toFixed(2);
                    var l = 0;
                    l = parseFloat(parseFloat(n.promotion_price).toFixed(2)) + parseFloat(parseFloat(n.act_promotion_price).toFixed(2));
                    var d = !1;
                    parseFloat(l) > 100 ? (l = parseInt(l), d = !1) : (d = !1, l = parseFloat(l).toFixed(2)), 
                    parseFloat(l) > 1e3 && (l = parseFloat(l / 1e4).toFixed(2), d = !0);
                    var u, g = n.final_price, h = !1, f = !1;
                    parseFloat(n.final_price) > 1e4 ? (u = n.final_price / 1e4, g = parseFloat(u).toFixed(2) + "", 
                    h = !0) : parseFloat(n.final_price) > 100 && (g = parseInt(parseFloat(n.final_price).toFixed(2))), 
                    String(g).length > 4 && (f = !0);
                    var _, w = parseFloat(r), m = !1, x = !1;
                    r > 1e3 ? (_ = r / 1e4, w = parseFloat(_).toFixed(2), m = !0) : w = parseFloat(r) > 100 ? parseInt(parseFloat(r).toFixed(2)) : parseFloat(r).toFixed(2), 
                    x = String(w).length > 4;
                    var F = {
                        act_promotion_price: n.act_promotion_price,
                        coupon_discount: n.coupon_discount,
                        final_price: g,
                        flag: n.flag,
                        goods_id: n.goods_id,
                        goods_image_url: n.goods_image_url,
                        goods_name: n.goods_name,
                        goods_thumbnail_url: n.goods_thumbnail_url,
                        price: n.price,
                        promotion_price: n.promotion_price,
                        sold_quantity: n.sold_quantity,
                        zhuan: w,
                        isZhuanWan: m,
                        isZhuanFull: x,
                        isPriceWan: h,
                        isPriceFull: f,
                        zhuan2: l,
                        isZhuan2Wan: d
                    };
                    o.push(F), i.push(F);
                }
                t.setData({
                    goodList: i,
                    isLoading: !1,
                    isFirst: !1
                }), t.setData({
                    pageGoodList: o,
                    goodListM: i
                }, function() {
                    wx.hideToast(), wx.stopPullDownRefresh();
                });
            } else wx.showToast({
                title: String(a.data.errorMsg),
                icon: "none",
                mask: !0
            });
        },
        fail: function(t) {
            wx.hideToast(), wx.showToast({
                title: t,
                mask: !0
            });
        }
    });
}

function o(t) {
    t.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "left top 0",
        success: function(t) {}
    }), t.animation.translate(0, 0).step(), t.setData({
        animation: t.animation.export()
    });
}

function e(t, a) {
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

!function(t) {
    t && t.__esModule;
}(require("../../utils/util.js"));

var i, n = getApp(), s = (new (require("../../utils/grid/wxgrid.js"))(), ""), r = 0, l = "", d = 1, c = "", p = !1;

Page({
    data: {
        hot_search_word: [],
        goodList: [],
        pageGoodList: [],
        animation: {},
        order: 0,
        isFirst: !0,
        searchinput: "",
        page: 1,
        goodListM: []
    },
    goTop: function(t) {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    sreach_del: function(t) {
        i = new Array(), s = "", r = 0, o(this), this.setData({
            order: r
        }), l = "", this.setData({
            searchinput: "",
            goodList: [],
            goodListM: [],
            isFirst: !0
        });
    },
    inputWord: function(t) {
        console.log(t), l = t.detail.value;
    },
    tabClick: function(t) {
        d = 1, this.setData({
            page: d
        });
        var o = t.currentTarget.dataset.value;
        e(this, t), r = 3 == o || 4 == o ? 3 == r ? 4 : 4 == r ? 3 : o : o, this.setData({
            order: r
        }), a(this, s, l, r, 1), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        });
    },
    sreachClick: function(t) {
        d = 1, this.setData({
            page: d
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), o(this), this.setData({
            order: 0
        }), a(this, s, l, 0, 1);
    },
    hotWordSreach: function(t) {
        l = t.currentTarget.dataset.value, this.setData({
            order: r,
            searchinput: l
        }), a(this, s, l, 0, 1);
    },
    goodsClick: function(t) {
        var a = 0, o = "";
        1 == t.currentTarget.dataset.goods.flag ? (a = 1, o = "" == s ? "index" : "category") : a = 0, 
        wx.navigateTo({
            url: "../index/goodsdetail/goodsdetail?goods_id=" + t.currentTarget.dataset.goods_id + "&goods_type=" + a + "&goods_type_prop=" + o
        });
    },
    translate: function() {
        this.animation.translate(100, 0).step(), this.setData({
            animation: this.animation.export()
        });
    },
    onLoad: function(a) {
        t(this), i = new Array(), l = "", r = 0, s = "";
    },
    onReady: function() {},
    onShow: function() {
        getApp().globalData.isTestCode && wx.setNavigationBarTitle({
            title: "搜索(" + wx.getStorageSync("real_code") + ")",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onHide: function() {
        p = !0, wx.hideLoading(), wx.hideToast();
    },
    onPageScroll: function(t) {
        t.scrollTop < 624 ? this.setData({
            page: 1
        }) : this.setData({
            page: 2
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        d = 1, this.setData({
            page: d
        }), a(this, s, l, r, d);
    },
    onReachBottom: function() {
        d++, this.setData({
            page: d
        }), a(this, s, l, r, d);
    }
});