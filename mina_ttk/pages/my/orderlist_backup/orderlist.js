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
    }), a.animation.translate(t.currentTarget.offsetLeft - i(25), 0).step(), a.setData({
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
                    if (0 == t.data.code) if (l = 1, null != t.data.data.orders) {
                        if (console.log("that.intoType", g), g != t.data.data.orders.type) return a.setData({
                            orderList: [],
                            isFind: !0
                        }), void wx.hideToast();
                        console.log("findOrderByCode", t), a.setData({
                            intoType: t.data.data.orders.type,
                            isFind: !0
                        }), d(a, t.data.data.orders.type, t);
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
            e = "none" != t.networkType, console.log("iPage", l), console.log("order_status", _), 
            console.log("data_tab", p), e ? wx.request({
                url: getApp().globalData.appUrl + "/myOrder",
                data: {
                    openId: wx.getStorageSync("uid"),
                    channelId: getApp().globalData.channelId,
                    page: l,
                    order_status: _,
                    data_tab: p
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    if (console.log("myOrder", t), 0 == t.data.code) {
                        1 == l && (n = new Array()), m = new Array();
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
                            d = 1 == t.data.data.orders[e].mini_order_flag ? "【小程序】自主推广" : "自主推广";
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
                                dingxiang_type: t.data.data.orders[e].dingxiang_type
                            };
                            n.push(s), m.push(s);
                        }
                        a.setData({
                            orderList: n,
                            orderListThisTime: m,
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
            e = "none" != t.networkType, console.log("iPage", l), console.log("order_status", _), 
            console.log("data_tab", p), e ? wx.request({
                url: getApp().globalData.appUrl + "/orderlist",
                data: {
                    openId: wx.getStorageSync("uid"),
                    channelId: getApp().globalData.channelId,
                    page: l,
                    order_status: _,
                    data_tab: p
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    if (console.log("teamOrder", t), 0 == t.data.code) {
                        1 == l && (n = new Array()), m = new Array();
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
                            var d = "";
                            switch (t.data.data.orders[e].source) {
                              case 0:
                                d = "直属下级提成";
                                break;

                              case 1:
                                d = "直属下下级提成";
                                break;

                              case 2:
                                d = "团队/直属下级提成";
                                break;

                              case 3:
                                d = ":团队提成";
                                break;

                              case 4:
                                d = "下属运营商提成";
                            }
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
                                pdd_source_str: d + "(" + t.data.data.orders[e].tele + ")",
                                is_free: t.data.data.orders[e].is_free,
                                order_pay_time: t.data.data.orders[e].order_pay_time,
                                zhuan: o.toFixed(2),
                                order_status_str: r,
                                isFirst: !1,
                                dingxiang_type: t.data.data.orders[e].dingxiang_type
                            };
                            n.push(s), m.push(s);
                        }
                        a.setData({
                            orderList: n,
                            orderListThisTime: m,
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

function d(a, t, e) {
    console.log("makeSreachList1", e.data.data.orders);
    var o, r = 0, d = "";
    switch (n = new Array(), e.data.data.orders.order_status) {
      case 0:
        d = "待结算";
        break;

      case 1:
        d = "已结算";
        break;

      case 2:
        d = "结算失败";
    }
    if (0 == t) r = parseFloat(e.data.data.orders.promotion_price), console.log("makeSreachList", e.data.data.orders.order_status); else switch (r = parseFloat(e.data.data.orders.promotion_price), 
    e.data.data.orders.source) {
      case 0:
        o = "直属下级关系";
        break;

      case 1:
        o = "直属下下级关系";
        break;

      case 2:
        o = "团队/直属下级关系";
        break;

      case 3:
        o = "团队关系";
        break;

      case 4:
        o = "下属运营商关系";
    }
    var s = e.data.data.orders.pdd_source_str;
    if (1 == t) {
        o = o + "(" + e.data.data.orders.tele + ")";
        o = 1 == e.data.data.orders.mini_order_flag ? "【小程序】" + o : s;
    } else o = "自主推广", o = 1 == e.data.data.orders.mini_order_flag ? "【小程序】自主推广" : "自主推广";
    var i = {
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
        pdd_source_str: o,
        is_free: e.data.data.orders.is_free,
        order_pay_time: e.data.data.orders.order_pay_time,
        zhuan: r.toFixed(2),
        order_status_str: d,
        dingxiang_type: e.data.data.orders.dingxiang_type
    };
    n.push(i), console.log("cuOrderList", n), a.setData({
        orderList: n,
        orderListThisTime: n,
        isSreach: !0
    }, function() {
        wx.stopPullDownRefresh(), wx.hideToast();
    });
}

function s(a) {
    var t = "我的自主订单";
    console.log("intoType", g), 0 == g ? (t = "我的订单", o(a)) : (t = "我的订单", r(a)), wx.setNavigationBarTitle({
        title: t
    });
}

function i(a) {
    return a * u;
}

var n, c, u, l = 1, _ = 0, p = 1, g = 0, f = !0, m = new Array();

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
        dataLength: 0
    },
    getList: function(a) {
        g = a.currentTarget.dataset.tab, this.setData({
            intoType: a.currentTarget.dataset.tab
        }), s(this), t(this, a);
    },
    sreach_del: function(a) {
        var t = this;
        c = "", this.setData({
            searchinput: "",
            orderList: [],
            isFind: !1
        }, function() {
            l = 1, s(t);
        });
    },
    inputWord: function(a) {
        c = a.detail.value;
    },
    sreachClick: function(a) {
        console.log("cuKeyWord", c), "" == c ? wx.showToast({
            title: "请输入订单号",
            icon: "none",
            duration: 1e3,
            mask: !0,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        }) : e(this, c);
    },
    stateClick: function(a) {
        var t = this;
        console.log("stateClick", a.currentTarget.dataset.state), _ = a.currentTarget.dataset.state, 
        this.setData({
            order_status: _,
            isFind: !1
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), l = 1, s(t);
    },
    tabClick: function(t) {
        var e = this;
        a(this, t), p = t.currentTarget.dataset.tab, _ = 0, this.setData({
            data_tab: p,
            order_status: 0,
            isFind: !1
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), l = 1, s(e);
    },
    onLoad: function(a) {
        console.log("options", a);
        var t = this;
        _ = 0, p = 1, g = 0, l = 1, c = "", t.setData({
            intoType: 0,
            order_status: _,
            data_tab: p,
            isFirst: !0
        }), console.log("orderlist", a), wx.getSystemInfo({
            success: function(a) {
                u = a.windowWidth / 750, t.setData({
                    winWidth: a.windowWidth,
                    winHeight: a.windowHeight
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        s(this), f = !0;
        var a = "我的订单(" + wx.getStorageSync("real_code") + ")";
        1 == g && (a = "我的订单(" + wx.getStorageSync("real_code") + ")"), getApp().globalData.isTestCode && wx.setNavigationBarTitle({
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
        }), l = 1, s(this), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        });
    },
    onReachBottom: function() {
        this.setData({
            isFind: !1
        }), l++, s(this);
    }
});