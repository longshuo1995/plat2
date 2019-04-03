var e = require("../../../489D67D23FACD8FF2EFB0FD52770D606.js"), t = require("../../../A30975103FACD8FFC56F1D17A6EFC606.js"), a = getApp(), o = void 0;

Page({
    data: {
        imgHost: a.globalData.imgHost,
        wxUser: {},
        menus: [],
        menuChecked: -1,
        menuScrollLeft: 0,
        menuCheckedWidth: 75,
        subMenus: [],
        subMenuToLeft: 0,
        subMenuChecked: null,
        sortFixed: !1,
        goodsList: [],
        recommendGoodsList: [],
        pageNum: 1,
        reach: !0,
        bannerList: [],
        navList: [],
        youPin: null,
        meiRiHaoDian: null,
        pinPaiQingChang: null,
        promotionGroup: [],
        dkNews: [],
        shareText: {},
        pgDialogShow: !1,
        pgDialogInfo: null,
        newsDialogShow: !1,
        newsCount: null,
        newsDialogInfo: null,
        stor: [ {
            index: 1,
            active: !0,
            name: "综合",
            sortType: ""
        }, {
            index: 2,
            active: !1,
            name: "佣金",
            sortType: "sort-icon",
            codeUp: 1,
            codeDwn: 2
        }, {
            index: 3,
            active: !1,
            name: "价格",
            sortType: "sort-icon",
            codeUp: 3,
            codeDwn: 4
        }, {
            index: 4,
            active: !1,
            name: "销量",
            sortType: "sort-icon",
            codeUp: 5,
            codeDwn: 6
        } ],
        storChecked: 0
    },
    onLoad: function(e) {
        o = this;
        var t = wx.getStorageSync("wxUser"), a = wx.getStorageSync("blacks");
        a && a.list.forEach(function(e) {
            e == t.id && wx.reLaunch({
                url: "/pages/common/blacklist/blacklist"
            });
        }), e.pid && o.setData({
            pid: e.pid
        }), t ? (t.mcode && t.pid && o.setData({
            pid: t.pid
        }), o.setData({
            wxUser: t
        })) : wx.navigateTo({
            url: "/pages/common/login/login?pid=" + e.pid
        }), o.getMenus(), o.getBanner(), o.getShareText();
    },
    onShow: function() {
        o.data.wxUser.id && (0 != o.data.wxUser.role && (o.haveRead(), o.getExtensionGoods()), 
        o.getDkNews(), setTimeout(function() {
            o.data.pgDialogInfo && o.data.newsDialogInfo ? o.setData({
                newsDialogShow: !1,
                pgDialogShow: !0
            }) : o.data.pgDialogInfo ? o.setData({
                pgDialogShow: !0
            }) : o.data.newsDialogInfo && o.setData({
                newsDialogShow: !0
            });
        }, 1e3), 0 == o.data.goodsList.length && (o.getGoodsList(), 0 != o.data.wxUser.role && o.getNav(), 
        o.getYouPin(), o.getMeiRiHaoDian(), o.getPinPaiQingChang(), o.getRecommendGoodsList(), 
        o.getPromotionGroup()));
    },
    onTabItemTap: function(e) {
        wx.setStorageSync("isFirst", !1);
    },
    haveRead: function() {
        e.request(t.home.news.haveRead, {
            uid: o.data.wxUser.id,
            type: 3
        }, function(e) {
            e.data.notice ? o.setData({
                newsDialogInfo: e.data.notice
            }) : o.setData({
                newsDialogInfo: null
            }), o.setData({
                newsCount: e.data.count
            });
        }, function(e) {
            wx.showToast({
                title: "消息获取失败",
                image: a.globalData.errorImg
            });
        });
    },
    menuChange: function(e) {
        var t = void 0, a = void 0, n = void 0;
        e.target.dataset.key != o.data.menuChecked && (wx.createSelectorQuery().select("#" + e.target.id).boundingClientRect(function(e) {
            o.setData({
                menuCheckedWidth: e.width
            });
        }).exec(), wx.getSystemInfo({
            success: function(e) {
                t = e.windowWidth, n = t / 686;
            }
        }), a = e.target.offsetLeft + o.data.menuCheckedWidth / 2 + 32 * n - t / 2, o.setData({
            menuChecked: e.target.dataset.key,
            menuScrollLeft: a
        }), o.scrollTop(), o.getSubMenus(), o.setData({
            pageNum: 1,
            reach: !0,
            goodsList: [],
            subMenuChecked: null
        }), o.getGoodsList());
    },
    subMenuChange: function(e) {
        var t = e.currentTarget.dataset.key;
        o.setData({
            subMenuChecked: t
        }), o.setData({
            pageNum: 1,
            reach: !0,
            goodsList: []
        }), o.getGoodsList();
    },
    getBanner: function() {
        e.request(t.home.index.getBannerList, {
            bannerType: 1
        }, function(e) {
            var t = e.data;
            0 == t.code ? o.setData({
                bannerList: t.data
            }) : wx.showToast({
                title: t.msg,
                image: a.globalData.errorImg
            });
        });
    },
    getNav: function() {
        e.request(t.home.index.getNav, {
            role: o.data.wxUser.role,
            buttonType: 2
        }, function(e) {
            for (var t = e.data, n = t.data, s = [], i = n.length, r = Math.ceil(i / 8), d = 0; d < r; d++) s[d] = n.slice(8 * d, 8 * (d + 1));
            0 == t.code ? o.setData({
                navList: s
            }) : wx.showToast({
                title: t.msg,
                image: a.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取快捷导航",
                image: a.globalData.errorImg
            });
        });
    },
    getYouPin: function() {
        e.request(t.home.index.getNav, {
            role: o.data.wxUser.role,
            buttonType: 3
        }, function(e) {
            var t = e.data;
            0 == t.code ? o.setData({
                youPin: t.data[0]
            }) : wx.showToast({
                title: t.msg,
                image: a.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取优品",
                image: a.globalData.errorImg
            });
        });
    },
    getMeiRiHaoDian: function() {
        e.request(t.home.index.getNav, {
            role: o.data.wxUser.role,
            buttonType: 4
        }, function(e) {
            var t = e.data;
            0 == t.code ? o.setData({
                meiRiHaoDian: t.data[0]
            }) : wx.showToast({
                title: t.msg,
                image: a.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取每日好店",
                image: a.globalData.errorImg
            });
        });
    },
    getPinPaiQingChang: function() {
        e.request(t.home.index.getNav, {
            role: o.data.wxUser.role,
            buttonType: 5
        }, function(e) {
            var t = e.data;
            0 == t.code ? o.setData({
                pinPaiQingChang: t.data[0]
            }) : wx.showToast({
                title: t.msg,
                image: a.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取每日好店",
                image: a.globalData.errorImg
            });
        });
    },
    getPromotionGroup: function() {
        e.request(t.home.index.getNav, {
            role: o.data.wxUser.role,
            buttonType: 6
        }, function(e) {
            var t = e.data;
            0 == t.code ? o.setData({
                promotionGroup: t.data
            }) : wx.showToast({
                title: t.msg,
                image: a.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取每日好店",
                image: a.globalData.errorImg
            });
        });
    },
    goodsDetails: function(e) {
        var t = e.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/main/goodsDetails/goodsDetails?goods_id=" + t
        });
    },
    getMenus: function() {
        e.request(t.home.index.getMenu, {
            menuType: 1
        }, function(t) {
            var n = t.data;
            if (0 == n.code) {
                var s = e.encrypt(n.menuList);
                o.setData({
                    menus: s
                });
            } else wx.showToast({
                title: n.msg,
                image: a.globalData.errorImg
            });
        });
    },
    getSubMenus: function() {
        e.request(t.home.index.getMenu, {
            menuType: 1,
            pid: o.data.menuChecked,
            mcode: o.data.wxUser.mcode
        }, function(t) {
            var n = t.data;
            if (0 == n.code) {
                var s = e.encrypt(n.menuList);
                s = s, o.setData({
                    subMenus: s,
                    subMenuToLeft: 0
                });
            } else wx.showToast({
                title: n.msg,
                image: a.globalData.errorImg
            });
        });
    },
    getGoodsList: function() {
        var n = o.data.menuChecked, s = o.data.subMenuChecked;
        s && (n = s), e.request(t.home.index.getGoodsList, {
            category_id: n,
            sort_type: o.data.storChecked,
            role: o.data.wxUser.role,
            goodsType: 1,
            pageNum: o.data.pageNum,
            version: 1
        }, function(t) {
            var n = t.data;
            if (0 == n.code) {
                var s = o.data.pageNum + 1, i = e.encrypt(n.data), r = o.data.goodsList.concat(i);
                i.length <= 0 ? o.setData({
                    reach: !1
                }) : o.setData({
                    goodsList: r,
                    pageNum: s
                });
            } else wx.showToast({
                title: n.msg,
                image: a.globalData.errorImg
            });
        });
    },
    getRecommendGoodsList: function() {
        e.request(t.home.index.getGoodsList, {
            category_id: o.data.menuChecked,
            sort_type: o.data.storChecked,
            role: o.data.wxUser.role,
            goodsType: 2,
            pageNum: 1
        }, function(t) {
            var n = t.data;
            if (0 == n.code) {
                var s = e.encrypt(n.data);
                o.setData({
                    recommendGoodsList: s
                });
            } else wx.showToast({
                title: n.msg,
                image: a.globalData.errorImg
            });
        });
    },
    headLine: function() {
        wx.navigateTo({
            url: "/pages/home/headline/index/index"
        });
    },
    headLineDetail: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/home/headline/details/details?id=" + t
        });
    },
    getDkNews: function() {
        e.request(t.home.headLine.getDkNews, {
            type: 1
        }, function(e) {
            var t = e.data;
            0 == t.code ? o.setData({
                dkNews: t.data
            }) : wx.showToast({
                title: t.msg,
                image: a.globalData.errorImg
            });
        });
    },
    sortChange: function(e) {
        var t = e.target.dataset.index, a = o.data.stor;
        a.forEach(function(e) {
            e.index == t ? (e.active = !0, 1 != e.index ? "sort-icon" == e.sortType || "sort-icon-dwn" == e.sortType ? (e.sortType = "sort-icon-up", 
            o.setData({
                storChecked: e.codeUp
            })) : (e.sortType = "sort-icon-dwn", o.setData({
                storChecked: e.codeDwn
            })) : o.setData({
                storChecked: 0
            })) : (e.active = !1, 1 != e.index && (e.sortType = "sort-icon"));
        }), o.scrollTop(), o.setData({
            stor: a,
            pageNum: 1,
            reach: !0,
            goodsList: []
        }), o.getGoodsList();
    },
    scrollTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        });
    },
    goPDDApp: function(t) {
        var n = t.target.dataset.item, s = o.data.wxUser.pid;
        s && "undefined" != s || (s = o.data.wxUser.bind_pid) && "undefined" != s || (s = a.globalData.default_pid), 
        e.goPDDApp(o.data.wxUser.id, s, n.goods_id);
    },
    newsDialogClose: function() {
        o.setData({
            newsDialogShow: !1
        });
    },
    newsDialogDetails: function(e) {
        var t = e.target.dataset.id, a = e.target.dataset.type;
        2 == a && (a = 4), o.setData({
            newsDialogShow: !1
        }), wx.navigateTo({
            url: "/pages/home/news/details/details?id=" + t + "&type=" + a
        });
    },
    pgDialogClose: function(e) {
        var t = e.currentTarget.dataset.id;
        o.readRecord(t), o.setData({
            pgDialogShow: !1
        }), o.data.newsDialogInfo && setTimeout(function() {
            o.data.newsDialogInfo && o.setData({
                newsDialogShow: !0
            });
        }, 300);
    },
    getExtensionGoods: function() {
        e.request(t.home.index.getExtensionGoods, {
            uid: o.data.wxUser.id,
            role: o.data.wxUser.role
        }, function(e) {
            var t = e.data;
            0 == t.code ? o.setData({
                pgDialogInfo: t.data
            }) : (o.setData({
                pgDialogInfo: null
            }), wx.showToast({
                title: t.msg,
                image: a.globalData.errorImg
            }));
        }, function(e) {
            wx.showToast({
                title: "未获取推广商品",
                image: a.globalData.errorImg
            });
        });
    },
    extensionGoodsDetails: function(e) {
        var t = e.currentTarget.dataset.goodsid, a = e.currentTarget.dataset.id;
        o.readRecord(a), wx.navigateTo({
            url: "/pages/main/goodsDetails/goodsDetails?goods_id=" + t
        });
    },
    readRecord: function(a) {
        e.request(t.home.news.read, {
            uid: o.data.wxUser.id,
            id: a,
            type: 2
        });
    },
    onPageScroll: function(e) {
        e.scrollTop >= 1190 && -1 == o.data.menuChecked ? o.setData({
            sortFixed: !0
        }) : e.scrollTop >= 100 && -1 != o.data.menuChecked ? o.setData({
            sortFixed: !0
        }) : o.setData({
            sortFixed: !1
        });
    },
    onReachBottom: function() {
        o.data.reach && o.getGoodsList();
    },
    onPullDownRefresh: function() {
        wx.reLaunch({
            url: "/pages/main/home/home"
        }), wx.stopPullDownRefresh();
    },
    getShareText: function() {
        e.request(t.home.index.getShareText, {
            type: 1
        }, function(e) {
            var t = e.data;
            0 == t.code ? o.setData({
                shareText: t.content
            }) : wx.showToast({
                title: t.msg,
                image: a.globalData.errorImg
            });
        });
    },
    onShareAppMessage: function(t) {
        var n = o.data.wxUser.pid;
        if (n && "undefined" != n || (n = o.data.wxUser.bind_pid) && "undefined" != n || (n = a.globalData.default_pid), 
        t.target) {
            var s = t.target.dataset.item, i = "【拼多多】优惠券" + String(s.coupon_discount) + "元\n原价￥" + s.min_group_price + "  券后价￥" + s.quanhoujia;
            return t.target.dataset.type && o.readRecord(t.target.dataset.item.id), e.shareGoodsCount(s.goods_id), 
            {
                title: i,
                path: "/pages/main/goodsDetails/goodsDetails?goods_id=" + s.goods_id + "&pid=" + n + "&goFlag=" + !0,
                imageUrl: s.goods_thumbnail_url
            };
        }
        return {
            title: o.data.shareText.desc,
            path: "/pages/main/home/home?pid=" + n,
            imageUrl: o.data.shareText.imgUrl
        };
    },
    obstacle: function() {}
});