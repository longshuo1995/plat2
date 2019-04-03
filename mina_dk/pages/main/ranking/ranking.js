var a = require("../../../489D67D23FACD8FF2EFB0FD52770D606.js"), e = require("../../../A30975103FACD8FFC56F1D17A6EFC606.js"), t = getApp(), o = void 0;

Page({
    data: {
        imgHost: t.globalData.imgHost,
        wxUser: {},
        bannerType: 5,
        bannerList: null,
        tabChecked: "1",
        filterChecked: "1",
        filterFixed: !1,
        goodsList: [],
        pageNum: 1,
        reach: !0
    },
    onLoad: function(a) {
        o = this;
        var e = wx.getStorageSync("wxUser");
        e && o.setData({
            wxUser: e
        }), o.getShareText(), o.getBanner(), o.getData();
    },
    onTabItemTap: function(a) {
        wx.setStorageSync("isFirst", !1);
    },
    tabChange: function(a) {
        var e = a.target.dataset.index, t = 5;
        if (e != o.data.tabChecked) {
            switch (e) {
              case "1":
                t = 5;
                break;

              case "2":
                t = 6;
            }
            o.setData({
                tabChecked: e,
                bannerType: t,
                filterChecked: "1",
                goodsList: [],
                pageNum: 1,
                reach: !0
            }), o.getBanner(), o.getData();
        }
    },
    filterChange: function(a) {
        var e = a.target.dataset.index;
        e != o.data.filterChecked && (o.setData({
            filterChecked: e,
            goodsList: [],
            pageNum: 1,
            reach: !0
        }), o.getData());
    },
    goodsDetails: function(a) {
        var e = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/main/goodsDetails/goodsDetails?goods_id=" + e
        });
    },
    getBanner: function() {
        a.request(e.home.index.getBannerList, {
            bannerType: o.data.bannerType
        }, function(a) {
            var e = a.data;
            0 == e.code ? o.setData({
                bannerList: e.data
            }) : wx.showToast({
                title: e.msg,
                image: t.globalData.errorImg
            });
        });
    },
    getData: function() {
        var i = o.data.tabChecked, r = o.data.filterChecked, s = null;
        switch (i) {
          case "1":
            switch (r) {
              case "1":
                s = "1H";
                break;

              case "2":
                s = "4H";
                break;

              case "3":
                s = "24H";
            }
            wx.showLoading({
                title: "数据加载中···",
                mask: !0
            }), a.request(e.ranking.rankGoodsList, {
                day: s,
                role: o.data.wxUser.role,
                pageNum: o.data.pageNum
            }, function(e) {
                var i = e.data, r = o.data.pageNum + 1;
                if (0 == i.code) {
                    if (!i.data) return o.setData({
                        reach: !1
                    }), void wx.hideLoading();
                    var s = a.encrypt(i.data), n = o.data.goodsList.concat(s);
                    s.length <= 0 ? (o.setData({
                        reach: !1
                    }), wx.hideLoading()) : (o.setData({
                        goodsList: n,
                        pageNum: r
                    }), wx.hideLoading());
                } else wx.showToast({
                    title: i.msg,
                    image: t.globalData.errorImg
                });
            }, function(a) {
                wx.showToast({
                    title: "未获取多客热销",
                    image: t.globalData.errorImg
                });
            });
            break;

          case "2":
            switch (r) {
              case "1":
                s = "1";
                break;

              case "2":
                s = "2";
                break;

              case "3":
                s = "3";
            }
            wx.showLoading({
                title: "数据加载中···",
                mask: !0
            }), a.request(e.ranking.pddTopGoods, {
                sort_type: s,
                role: o.data.wxUser.role,
                pageNum: o.data.pageNum
            }, function(e) {
                var i = e.data, r = o.data.pageNum + 1;
                if (0 == i.code) {
                    var s = a.encrypt(i.data), n = o.data.goodsList.concat(s);
                    s.length <= 0 ? (o.setData({
                        reach: !1
                    }), wx.hideLoading()) : (o.setData({
                        goodsList: n,
                        pageNum: r
                    }), wx.hideLoading());
                } else wx.showToast({
                    title: i.msg,
                    image: t.globalData.errorImg
                });
            }, function(a) {
                wx.showToast({
                    title: "未获取全网热销",
                    image: t.globalData.errorImg
                });
            });
        }
    },
    goPDDApp: function(e) {
        var i = e.target.dataset.item, r = o.data.wxUser.pid;
        r && "undefined" != r || (r = o.data.wxUser.bind_pid) && "undefined" != r || (r = t.globalData.default_pid), 
        a.goPDDApp(o.data.wxUser.id, r, i.goods_id);
    },
    onPageScroll: function(a) {
        a.scrollTop >= 164 ? o.setData({
            filterFixed: !0
        }) : o.setData({
            filterFixed: !1
        });
    },
    onPullDownRefresh: function() {
        wx.reLaunch({
            url: "/pages/main/ranking/ranking"
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        o.data.reach && o.getData();
    },
    getShareText: function() {
        a.request(e.home.index.getShareText, {
            type: 1
        }, function(a) {
            var e = a.data;
            0 == e.code ? o.setData({
                shareText: e.content
            }) : wx.showToast({
                title: e.msg,
                image: t.globalData.errorImg
            });
        });
    },
    onShareAppMessage: function(e) {
        var i = o.data.wxUser.pid;
        if (i && "undefined" != i || (i = o.data.wxUser.bind_pid) && "undefined" != i || (i = t.globalData.default_pid), 
        e.target) {
            var r = e.target.dataset.item, s = "【拼多多】优惠券" + String(r.coupon_discount) + "元\n原价￥" + r.min_group_price + "  券后价￥" + r.quanhoujia;
            return a.shareGoodsCount(r.goods_id), {
                title: s,
                path: "/pages/main/goodsDetails/goodsDetails?goods_id=" + r.goods_id + "&pid=" + i + "&goFlag=" + !0,
                imageUrl: r.goods_thumbnail_url
            };
        }
        return {
            title: o.data.shareText.desc,
            path: "/pages/main/home/home?pid=" + i,
            imageUrl: o.data.shareText.imgUrl
        };
    },
    obstacle: function() {}
});