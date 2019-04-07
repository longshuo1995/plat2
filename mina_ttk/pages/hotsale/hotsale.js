function o(o) {
    wx.getNetworkType({
        success: function(a) {
            var t = !0;
            t = "none" != a.networkType, o.setData({
                networkType: t
            });
        }
    }), a(o, l, "", 0, d);
}

function a(o, a, n, i, l) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: r.globalData.appUrl + "/hotGoodslist",
        data: {
            category_id: a,
            keyword: n,
            order: i,
            page: l,
            isgy: 0,
            openId: wx.getStorageSync("uid"),
            channelId: String(getApp().globalData.channelId)
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(a) {
            if (console.log("HotGoodList", a), 0 == a.data.code) {
                if (c = a.data.data.type, console.log("myTypeLocal", c), c == a.data.data.type && p && d > 1) return p = !1, 
                void wx.hideToast();
                l <= 1 && (e = new Array()), 0 == a.data.data.type ? getApp().globalData.isBuyerLocal = !0 : getApp().globalData.isBuyerLocal = !1, 
                o.setData({
                    isBuyer: getApp().globalData.isBuyerLocal
                });
                for (var n = new Array(), i = 0; i < a.data.data.goods.length; i++) {
                    var r = a.data.data.goods[i], g = 0;
                    g = 0 == c ? parseFloat(r.promotion_price).toFixed(2) + parseFloat(r.act_promotion_price).toFixed(2) : parseFloat(r.act_promotion_price).toFixed(2);
                    var u = !1, w = 0;
                    w = parseFloat(parseFloat(r.promotion_price).toFixed(2)) + parseFloat(parseFloat(r.act_promotion_price).toFixed(2)), 
                    parseFloat(w) > 100 ? (w = parseInt(w), u = !1) : (u = !1, w = parseFloat(w).toFixed(2)), 
                    parseFloat(w) > 1e3 && (w = parseFloat(w / 1e4).toFixed(2), u = !0);
                    var _ = r.final_price, f = !1, h = !1;
                    parseFloat(r.final_price) > 1e3 ? (_ = r.final_price / 1e4 + "", f = !0) : parseFloat(r.final_price) > 100 && (_ = parseInt(parseFloat(r.final_price).toFixed(2))), 
                    String(_).length > 4 && (h = !0), _ = parseFloat(_).toFixed(2);
                    var x, y = parseFloat(g), F = !1, m = !1;
                    g > 1e3 ? (x = g / 1e4, y = parseFloat(x).toFixed(2), F = !0) : y = parseFloat(g) > 100 ? parseInt(parseFloat(g).toFixed(2)) : parseFloat(g).toFixed(2), 
                    m = String(y).length > 4;
                    var T = {
                        act_promotion_price: r.act_promotion_price,
                        coupon_discount: r.coupon_discount,
                        final_price: _,
                        flag: r.flag,
                        goods_id: r.goods_id,
                        goods_image_url: r.goods_image_url,
                        goods_name: r.goods_name,
                        goods_thumbnail_url: r.goods_thumbnail_url,
                        price: r.price,
                        promotion_price: r.promotion_price,
                        sold_quantity: r.sold_quantity,
                        zhuan: y,
                        isZhuanWan: F,
                        isZhuanFull: m,
                        isPriceWan: f,
                        isPriceFull: h,
                        zhuan2: w,
                        isZhuan2Wan: u,
                        goods_order: 20 * (l - 1) + i + 1
                    };
                    n.push(T), e.push(T);
                }
                o.setData({
                    goodList: a.data.data.goods,
                    isLoading: !1
                }), s.init(Math.ceil(e.length / 2), 2), s.data.add("classifies", e), o.setData({
                    wxgrid: s
                }, function() {
                    wx.hideToast(), wx.stopPullDownRefresh(), t(o);
                });
            } else wx.showToast({
                title: String(a.data.errorMsg),
                icon: "none",
                mask: !0
            });
        },
        fail: function(a) {
            wx.hideToast(), wx.showToast({
                title: a,
                mask: !0
            }), o.setData({
                networkType: !1
            });
        }
    });
}

function t(o) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.request({
        url: r.globalData.appUrl + "/shareList",
        data: {
            code: wx.getStorageSync("real_code"),
            openId: wx.getStorageSync("uid"),
            channelId: getApp().globalData.channelId,
            type: 3
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(o) {
            0 == o.data.code ? (console.log("getShareInfo", o), n = o.data.data.title, i = o.data.data.image_url) : wx.showToast({
                title: String(o.data.errorMsg),
                icon: "none",
                mask: !0
            });
        }
    });
}

var e, n, i, r = getApp(), s = new (require("../../utils/grid/wxgrid.js"))(), d = 1, l = 0, c = "", p = !1;

Page({
    data: {
        goodLis: [],
        networkType: !0,
        isBuyer: !1,
        wxgrid: s,
        isGoodsBack: !1
    },
    onLoad: function(o) {},
    goodsClick: function(o) {
        var a = this;
        wx.getNetworkType({
            success: function(t) {
                var e = !0;
                e = "none" != t.networkType;
                var n = 0, i = "";
                1 == o.currentTarget.dataset.goods.flag ? (n = 1, i = 0 == l ? "index" : "category") : n = 0, 
                console.log("goods_type=" + n + "，goods_type_prop=" + i), e ? wx.navigateTo({
                    url: "../index/goodsdetail/goodsdetail?goods_id=" + o.currentTarget.dataset.goods_id + "&goods_type=" + n + "&goods_type_prop=" + i
                }) : wx.showToast({
                    title: "当前无网络,请检查网络后重试",
                    icon: "none",
                    duration: 1e3,
                    mask: !0,
                    success: function(o) {},
                    fail: function(o) {},
                    complete: function(o) {}
                }), a.setData({
                    networkType: e
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log("1111111111111111111111111111111111", this.data.isGoodsBack), this.data.isGoodsBack && wx.switchTab({
            url: "../index/index",
            success: function(o) {},
            fail: function(o) {},
            complete: function(o) {}
        }), o(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(o) {
        return console.log("real_code", wx.getStorageSync("real_code")), o.from, {
            title: n,
            path: "pages/index/index?real_code=" + wx.getStorageSync("real_code") + "&type=7",
            imageUrl: i
        };
    }
});