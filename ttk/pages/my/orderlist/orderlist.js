function a(a, t) {
    a.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "left top 0",
        success: function(a) {}
    }), a.animation.translate(t.currentTarget.offsetLeft, 0).step(), a.setData({
        animation: a.animation.export()
    });
}

function t(a, t) {
    a.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "left top 0",
        success: function(a) {}
    }), a.animation.translate(t.currentTarget.offsetLeft - n(25), 0).step(), a.setData({
        animation1: a.animation.export()
    });
}

function e(a, t) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.getNetworkType({
        success: function(e) {
            var o = !0;
            (o = "none" != e.networkType) ? wx.request({
                url: getApp().globalData.appUrl + "/findOrder",
                data: {
                    openId: wx.getStorageSync("uid"),
                    channelId: getApp().globalData.channelId,
                    order_code: t
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    if (console.log("111111111111111111", t), 0 == t.data.code) if (_ = 1, null != t.data.data.orders) {
                        if (console.log("that.intoType", m), m != t.data.data.orders.type) return a.setData({
                            orderList: [],
                            isFind: !0
                        }), void wx.hideToast();
                        console.log("findOrderByCode", t), a.setData({
                            intoType: t.data.data.orders.type,
                            isFind: !0
                        }), s(a, t.data.data.orders.type, t);
                    } else a.setData({
                        orderList: [],
                        isFind: !0
                    }), wx.hideToast(); else wx.showToast({
                        title: String(t.errorMsg),
                        icon: "none",
                        duration: 0,
                        mask: !0,
                        success: function(a) {},
                        fail: function(a) {},
                        complete: function(a) {}
                    });
                }
            }) : wx.showToast({
                title: "当前网络状态不佳",
                icon: "none",
                duration: 0,
                mask: !0,
                success: function(a) {},
                fail: function(a) {},
                complete: function(a) {}
            }), a.setData({
                networkType: o
            });
        }
    });
}

function o(a) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.getNetworkType({
        success: function(t) {
            var e = !0;
            e = "none" != t.networkType, console.log("iPage", _), console.log("order_status", p), 
            console.log("data_tab", g);
            var o = 0;
            4 == m ? (o = 0, a.setData({
                lrStyle: "transition: transform 200ms ease 0ms; transform: translate(360rpx, 0px); transform-origin: left top 0px;",
                intoType: 4
            })) : (o = 1, a.setData({
                lrStyle: "transition: transform 200ms ease 0ms; transform: translate(0, 0px); transform-origin: left top 0px;",
                intoType: 3
            })), console.log("goType", o), e ? wx.request({
                url: getApp().globalData.appUrl + "/buyerOrder",
                data: {
                    openId: wx.getStorageSync("uid"),
                    channelId: getApp().globalData.channelId,
                    page: _,
                    order_status: p,
                    data_tab: g,
                    type: o
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    if (console.log("getBuyerOrderList", t), 0 == t.data.code) {
                        1 == _ && (c = new Array()), h = new Array();
                        for (var e = 0; e < t.data.data.orders.length; e++) {
                            var o = 0;
                            0 == m || 1 == m ? o = parseFloat(t.data.data.orders[e].promotion_price) : 3 != m && 4 != m || (o = parseFloat(t.data.data.orders[e].money));
                            var r = "";
                            switch (t.data.data.orders[e].order_status) {
                              case 0:
                                r = "待结算";
                                break;

                              case 1:
                                r = "已结算";
                                break;

                              case 2:
                                r = "结算失败";
                            }
                            var d = "【小程序】";
                            d = 1 == t.data.data.orders[e].mini_order_flag ? "true" == a.data.isBuyer ? "【小程序】分享助力" : "【小程序】自主推广" : "true" == a.data.isBuyer ? "分享助力" : "自主推广";
                            var s = {
                                goods_id: t.data.data.orders[e].goods_id,
                                goods_name: t.data.data.orders[e].goods_name,
                                goods_thumbnail_url: t.data.data.orders[e].goods_thumbnail_url,
                                goods_price: t.data.data.orders[e].goods_price,
                                order_amount: t.data.data.orders[e].order_amount,
                                promotion_price: t.data.data.orders[e].promotion_price,
                                order_time: t.data.data.orders[e].order_time,
                                order_code: t.data.data.orders[e].order_code,
                                order_status: t.data.data.orders[e].order_status,
                                act_promotion_price: t.data.data.orders[e].act_promotion_price,
                                order_receive_time: t.data.data.orders[e].order_receive_time,
                                pdd_source: t.data.data.orders[e].pdd_source,
                                pdd_source_str: d,
                                is_free: t.data.data.orders[e].is_free,
                                order_pay_time: t.data.data.orders[e].order_pay_time,
                                zhuan: o.toFixed(2),
                                order_status_str: r,
                                dingdan_type: t.data.data.orders[e].dingdan_type,
                                isFirst: !1,
                                dingxiang_type: t.data.data.orders[e].dingxiang_type,
                                order_price: t.data.data.orders[e].order_price
                            };
                            c.push(s), h.push(s);
                        }
                        a.setData({
                            orderList: c,
                            orderListThisTime: h,
                            dataLength: t.data.data.count,
                            isSreach: !0
                        }, function() {
                            wx.stopPullDownRefresh(), wx.hideToast();
                        });
                    } else wx.showToast({
                        title: String(t.errorMsg),
                        icon: "none",
                        duration: 0,
                        mask: !0,
                        success: function(a) {},
                        fail: function(a) {},
                        complete: function(a) {}
                    });
                }
            }) : wx.showToast({
                title: "当前网络状态不佳",
                icon: "none",
                duration: 0,
                mask: !0,
                success: function(a) {},
                fail: function(a) {},
                complete: function(a) {}
            }), a.setData({
                networkType: e
            });
        }
    });
}

function r(a) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.getNetworkType({
        success: function(t) {
            var e = !0;
            e = "none" != t.networkType, console.log("iPage", _), console.log("order_status", p), 
            console.log("data_tab", g), e ? wx.request({
                url: getApp().globalData.appUrl + "/myOrder",
                data: {
                    openId: wx.getStorageSync("uid"),
                    channelId: getApp().globalData.channelId,
                    page: _,
                    order_status: p,
                    data_tab: g
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    if (console.log("myOrder", t), 0 == t.data.code) {
                        1 == _ && (c = new Array()), h = new Array();
                        for (var e = 0; e < t.data.data.orders.length; e++) {
                            var o = 0;
                            o = parseFloat(t.data.data.orders[e].promotion_price);
                            var r = "";
                            switch (t.data.data.orders[e].order_status) {
                              case 0:
                                r = "待结算";
                                break;

                              case 1:
                                r = "已结算";
                                break;

                              case 2:
                                r = "结算失败";
                            }
                            var d = "【小程序】";
                            d = 1 == t.data.data.orders[e].mini_order_flag ? "true" == a.data.isBuyer ? "【小程序】全额返现" : "【小程序】自主推广" : "true" == a.data.isBuyer ? "全额返现" : "自主推广";
                            var s = {
                                goods_id: t.data.data.orders[e].goods_id,
                                goods_name: t.data.data.orders[e].goods_name,
                                goods_thumbnail_url: t.data.data.orders[e].goods_thumbnail_url,
                                goods_price: t.data.data.orders[e].goods_price,
                                order_amount: t.data.data.orders[e].order_amount,
                                promotion_price: t.data.data.orders[e].promotion_price,
                                order_time: t.data.data.orders[e].order_time,
                                order_code: t.data.data.orders[e].order_code,
                                order_status: t.data.data.orders[e].order_status,
                                act_promotion_price: t.data.data.orders[e].act_promotion_price,
                                order_receive_time: t.data.data.orders[e].order_receive_time,
                                pdd_source: t.data.data.orders[e].pdd_source,
                                pdd_source_str: d,
                                is_free: t.data.data.orders[e].is_free,
                                order_pay_time: t.data.data.orders[e].order_pay_time,
                                zhuan: o.toFixed(2),
                                order_status_str: r,
                                dingdan_type: t.data.data.orders[e].dingdan_type,
                                isFirst: !1,
                                dingxiang_type: t.data.data.orders[e].dingxiang_type,
                                order_price: t.data.data.orders[e].order_price,
                                is_zhuli: t.data.data.orders[e].is_zhuli
                            };
                            c.push(s), h.push(s);
                        }
                        a.setData({
                            orderList: c,
                            orderListThisTime: h,
                            dataLength: t.data.data.count,
                            isSreach: !0
                        }, function() {
                            wx.stopPullDownRefresh(), wx.hideToast();
                        });
                    } else wx.showToast({
                        title: String(t.errorMsg),
                        icon: "none",
                        duration: 0,
                        mask: !0,
                        success: function(a) {},
                        fail: function(a) {},
                        complete: function(a) {}
                    });
                }
            }) : wx.showToast({
                title: "当前网络状态不佳",
                icon: "none",
                duration: 0,
                mask: !0,
                success: function(a) {},
                fail: function(a) {},
                complete: function(a) {}
            }), a.setData({
                networkType: e
            });
        }
    });
}

function d(a) {
    wx.showToast({
        title: "加载中",
        icon: "loading",
        mask: !0
    }), wx.getNetworkType({
        success: function(t) {
            var e = !0;
            e = "none" != t.networkType, console.log("iPage", _), console.log("order_status", p), 
            console.log("data_tab", g), e ? wx.request({
                url: getApp().globalData.appUrl + "/orderlist",
                data: {
                    openId: wx.getStorageSync("uid"),
                    channelId: getApp().globalData.channelId,
                    page: _,
                    order_status: p,
                    data_tab: g
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    if (console.log("teamOrder", t), 0 == t.data.code) {
                        1 == _ && (c = new Array()), h = new Array();
                        for (var e = 0; e < t.data.data.orders.length; e++) {
                            var o = parseFloat(t.data.data.orders[e].promotion_price), r = "";
                            switch (t.data.data.orders[e].order_status) {
                              case 0:
                                r = "待结算";
                                break;

                              case 1:
                                r = "已结算";
                                break;

                              case 2:
                                r = "结算失败";
                            }
                            var d = t.data.data.orders[e].source_str;
                            d = 1 == t.data.data.orders[e].mini_order_flag ? "【小程序】" + d : d;
                            var s = {
                                goods_id: t.data.data.orders[e].goods_id,
                                goods_name: t.data.data.orders[e].goods_name,
                                goods_thumbnail_url: t.data.data.orders[e].goods_thumbnail_url,
                                goods_price: t.data.data.orders[e].goods_price,
                                order_amount: t.data.data.orders[e].order_amount,
                                promotion_price: t.data.data.orders[e].promotion_price,
                                order_time: t.data.data.orders[e].order_time,
                                order_code: t.data.data.orders[e].order_code,
                                order_status: t.data.data.orders[e].order_status,
                                act_promotion_price: t.data.data.orders[e].act_promotion_price,
                                order_receive_time: t.data.data.orders[e].order_receive_time,
                                pdd_source: t.data.data.orders[e].source,
                                pdd_source_str: d,
                                is_free: t.data.data.orders[e].is_free,
                                order_pay_time: t.data.data.orders[e].order_pay_time,
                                zhuan: o.toFixed(2),
                                order_status_str: r,
                                isFirst: !1,
                                dingxiang_type: t.data.data.orders[e].dingxiang_type,
                                order_price: t.data.data.orders[e].order_price,
                                is_zhuli: t.data.data.orders[e].is_zhuli
                            };
                            c.push(s), h.push(s);
                        }
                        a.setData({
                            orderList: c,
                            orderListThisTime: h,
                            dataLength: t.data.data.count,
                            isSreach: !0
                        }, function() {
                            wx.stopPullDownRefresh(), wx.hideToast();
                        });
                    } else wx.showToast({
                        title: String(t.errorMsg),
                        icon: "none",
                        duration: 0,
                        mask: !0,
                        success: function(a) {},
                        fail: function(a) {},
                        complete: function(a) {}
                    });
                },
                fail: function(a) {
                    console.log(a), wx.showToast({
                        title: a,
                        icon: "none",
                        duration: 0,
                        mask: !0,
                        success: function(a) {},
                        fail: function(a) {},
                        complete: function(a) {}
                    });
                }
            }) : wx.showToast({
                title: "当前网络状态不佳",
                icon: "none",
                duration: 0,
                mask: !0,
                success: function(a) {},
                fail: function(a) {},
                complete: function(a) {}
            }), a.setData({
                networkType: e
            });
        }
    });
}

function s(a, t, e) {
    console.log("makeSreachList1", e.data.data.orders);
    var o = 0, r = "", d = e.data.data.orders.source_str;
    switch (c = new Array(), e.data.data.orders.order_status) {
      case 0:
        r = "待结算";
        break;

      case 1:
        r = "已结算";
        break;

      case 2:
        r = "结算失败";
    }
    0 == t ? (o = parseFloat(e.data.data.orders.promotion_price), console.log("makeSreachList", e.data.data.orders.order_status)) : o = parseFloat(e.data.data.orders.promotion_price);
    var s = e.data.data.orders.pdd_source_str;
    if (1 == t) {
        var i = "【小程序】";
        d = 1 == e.data.data.orders.mini_order_flag ? i + d : s;
    } else d = "自主推广", i = 1 == e.data.data.orders.mini_order_flag ? "true" == a.data.isBuyer ? "【小程序】全额返现" : "【小程序】自主推广" : "true" == a.data.isBuyer ? "全额返现" : "自主推广";
    var n = {
        goods_id: e.data.data.orders.goods_id,
        goods_name: e.data.data.orders.goods_name,
        goods_thumbnail_url: e.data.data.orders.goods_thumbnail_url,
        goods_price: e.data.data.orders.goods_price,
        order_amount: e.data.data.orders.order_amount,
        promotion_price: e.data.data.orders.promotion_price,
        order_time: e.data.data.orders.order_time,
        order_code: e.data.data.orders.order_code,
        order_status: e.data.data.orders.order_status,
        act_promotion_price: e.data.data.orders.act_promotion_price,
        order_receive_time: e.data.data.orders.order_receive_time,
        pdd_source: e.data.data.orders.pdd_source,
        pdd_source_str: d,
        is_free: e.data.data.orders.is_free,
        order_pay_time: e.data.data.orders.order_pay_time,
        zhuan: o.toFixed(2),
        order_status_str: r,
        dingxiang_type: e.data.data.orders.dingxiang_type,
        order_price: e.data.data.orders.order_amount
    };
    c.push(n), console.log("cuOrderList", c), a.setData({
        orderList: c,
        orderListThisTime: c,
        isSreach: !0
    }, function() {
        wx.stopPullDownRefresh(), wx.hideToast();
    });
}

function i(a) {
    var t = "我的自主订单";
    console.log("intoType", m), 0 == m ? (t = "我的订单", r(a)) : 1 == m ? (t = "我的订单", 
    d(a)) : 3 == m ? (t = "我的返现", o(a)) : 4 == m && (t = "我的助力", o(a)), wx.setNavigationBarTitle({
        title: t
    });
}

function n(a) {
    return a * l;
}

var c, u, l, _ = 1, p = 0, g = 1, m = 0, f = !0, h = new Array();

Page({
    data: {
        orderList: [],
        animation: {},
        animation1: {},
        order_status: 0,
        data_tab: 1,
        intoType: 0,
        isSreach: !1,
        isFind: !1,
        isFirst: !1,
        orderListThisTime: [],
        dataLength: 0,
        isClick: !0,
        isBuyer: !0,
        lrStyle: "transition: transform 200ms ease 0ms; transform: translate(0, 0px); transform-origin: left top 0px;"
    },
    getList: function(a) {
        m = a.currentTarget.dataset.tab, this.setData({
            intoType: a.currentTarget.dataset.tab
        }), _ = 1, i(this), t(this, a);
    },
    sreach_del: function(a) {
        var t = this;
        u = "", this.setData({
            searchinput: "",
            orderList: [],
            isFind: !1
        }, function() {
            _ = 1, i(t);
        });
    },
    inputWord: function(a) {
        u = a.detail.value;
    },
    sreachClick: function(a) {
        console.log("cuKeyWord", u), "" == u ? wx.showToast({
            title: "请输入订单号",
            icon: "none",
            duration: 1e3,
            mask: !0,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        }) : e(this, u);
    },
    stateClick: function(a) {
        var t = this;
        console.log("stateClick", a.currentTarget.dataset.state), p = a.currentTarget.dataset.state, 
        this.setData({
            order_status: p,
            isFind: !1
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), _ = 1, i(t);
    },
    tabClick: function(t) {
        var e = this;
        a(this, t), g = t.currentTarget.dataset.tab, p = 0, this.setData({
            data_tab: g,
            order_status: 0,
            isFind: !1,
            isClick: !1
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), _ = 1, i(e);
    },
    onLoad: function(a) {
        console.log("options", a);
        var t = this;
        p = 0, g = 1, m = a.intoType, _ = 1, u = "", t.setData({
            intoType: a.intoType,
            order_status: p,
            data_tab: g,
            isFirst: !0,
            isBuyer: a.isBuyer
        }), console.log("orderlist", a), wx.getSystemInfo({
            success: function(a) {
                l = a.windowWidth / 750, t.setData({
                    winWidth: a.windowWidth,
                    winHeight: a.windowHeight
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        i(this), f = !0;
        var a = "我的订单(" + wx.getStorageSync("real_code") + ")";
        3 == m && (a = "我的返现(" + wx.getStorageSync("real_code") + ")"), getApp().globalData.isTestCode && wx.setNavigationBarTitle({
            title: a,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            isFind: !1
        }), _ = 1, i(this), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        });
    },
    onReachBottom: function() {
        this.setData({
            isFind: !1
        }), _++, i(this);
    }
});