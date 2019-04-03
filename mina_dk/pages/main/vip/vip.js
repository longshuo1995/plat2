var e, t, a = require("../../../489D67D23FACD8FF2EFB0FD52770D606.js"), o = require("../../../A30975103FACD8FFC56F1D17A6EFC606.js"), r = require("../../../2A4F83603FACD8FF4C29EB676880D606.js"), i = getApp(), n = void 0, s = {}, d = new Array();

Page({
    data: {
        imgHost: i.globalData.imgHost,
        wxUser: {},
        slideRotateBeforeV: 0,
        slideRotateV: 0,
        slideStartV: 0,
        slideMoveV: 0,
        slideStatus: !1,
        chartTabChecked: "1",
        userMonthMoney: null,
        userMonthOrder: null,
        tabChecked: "1",
        rankingList: null,
        current: 2,
        headerHide: 1,
        videUrl: [],
        registerModal: !0
    },
    onLoad: function(e) {
        n = this;
        var t = wx.getStorageSync("wxUser");
        t && n.setData({
            wxUser: t
        }), wx.getSystemInfo({
            success: function(e) {
                n.setData({
                    systemInfo: e
                });
            }
        });
    },
    onShow: function() {
        0 == n.data.wxUser.role && n.data.registerModal && (n.setData({
            registerModal: !1
        }), wx.showModal({
            title: "系统提示",
            content: "您还不是多客会员",
            showCancel: !1,
            confirmText: "回到首页",
            confirmColor: "#000000",
            success: function(e) {
                e.confirm && (n.setData({
                    registerModal: !0
                }), wx.switchTab({
                    url: "/pages/main/home/home"
                }));
            }
        })), 2 == n.data.wxUser.role || 1 == n.data.wxUser.role ? (n.monthData(), n.ranking()) : 3 == n.data.wxUser.role && (n.getUplevelpParam(), 
        n.weDkBossTop10(), n.userVideo());
    },
    onHide: function() {
        wx.hideLoading();
    },
    onTabItemTap: function(e) {
        wx.setStorageSync("isFirst", !1);
    },
    leaderSwiperChange: function(e) {
        var t = e.detail.current;
        switch (t) {
          case 8:
            n.setData({
                current: 0
            });
            break;

          case 9:
            n.setData({
                current: 1
            });
            break;

          default:
            n.setData({
                current: t + 2
            });
        }
    },
    chartTabChange: function(e) {
        var t = e.target.dataset.index;
        t != n.data.chartTabChecked && (n.setData({
            chartTabChecked: t
        }), n.drawChart());
    },
    tabChange: function(e) {
        var t = e.target.dataset.index;
        t != n.data.tabChecked && (n.setData({
            tabChecked: t
        }), n.ranking());
    },
    havePrivilegeTouchStart: function(e) {
        n.setData({
            slideStartV: e.changedTouches[0].clientX,
            slideRotateBeforeV: n.data.slideRotateV,
            slideStatus: !0
        });
    },
    havePrivilegeTouchmove: function(e) {
        var t = n.data.slideStartV - e.changedTouches[0].clientX, a = n.data.slideRotateBeforeV;
        n.setData({
            slideRotateV: a + t / 8,
            slideMoveV: t
        });
    },
    havePrivilegeTouchEnd: function(e) {
        var t = n.data.slideStartV - e.changedTouches[0].clientX, a = n.data.slideRotateBeforeV;
        n.setData({
            slideStatus: !1
        }), t / 8 > 0 ? t / 8 > 10 && a + 20 <= 120 ? n.setData({
            slideRotateV: a + 20
        }) : n.setData({
            slideRotateV: a
        }) : t / 8 < -10 && a - 20 >= -20 ? n.setData({
            slideRotateV: a - 20
        }) : n.setData({
            slideRotateV: a
        });
    },
    personalDetail: function(e) {
        var t = e.currentTarget.dataset.mcode;
        wx.navigateTo({
            url: "/pages/mine/team/search/search?key=" + t
        });
    },
    userVideo: function() {
        n.setData({
            videUrl: []
        }), wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), a.request(o.vip.userVideo, {}, function(e) {
            var a = e.data;
            if (0 == a.code) {
                var o = a.data;
                n.setData({
                    userVideo: o
                }), t = 1, d = new Array(), s = {}, o.forEach(function(e) {
                    n.getVideoInfo(e.video_url);
                }), wx.hideLoading();
            } else wx.showToast({
                title: a.msg,
                image: i.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取用户视频",
                image: i.globalData.errorImg
            });
        });
    },
    weDkBossTop10: function() {
        wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), a.request(o.vip.weDkBossTop10, {}, function(e) {
            var t = e.data;
            0 == t.code ? (n.setData({
                weDkBossTop10: t.data
            }), wx.hideLoading()) : wx.showToast({
                title: t.msg,
                image: i.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取晋升条件",
                image: i.globalData.errorImg
            });
        });
    },
    uplevel: function() {
        wx.pageScrollTo({
            scrollTop: 460
        }), setTimeout(function() {
            n.setData({
                headerHide: 0
            });
        }, 300);
    },
    getUplevelpParam: function() {
        wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), a.request(o.vip.getUplevelpParam, {
            uid: n.data.wxUser.id
        }, function(e) {
            var t = e.data;
            0 == t.code ? (n.setData({
                uplevelpParam: t.data
            }), wx.hideLoading()) : wx.showToast({
                title: t.msg,
                image: i.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取晋升条件",
                image: i.globalData.errorImg
            });
        });
    },
    drawChart: function() {
        var e = [], t = [], a = "#cfaa71", o = n.data.userMonthMoney, i = n.data.userMonthOrder;
        1 == n.data.chartTabChecked ? (o.forEach(function(a) {
            e.push(a.month), t.push(a.money);
        }), a = "#cfaa71") : (i.forEach(function(a) {
            e.push(a.month), t.push(a.team_order_count);
        }), a = "#d84f49");
        var s = 320;
        s = wx.getSystemInfoSync().windowWidth, new r({
            canvasId: "lineCanvas",
            type: "line",
            categories: e,
            background: "#2f323b",
            legend: !1,
            width: s,
            height: 200,
            series: [ {
                color: a,
                data: t
            } ],
            xAxis: {
                fontColor: "#ffffff",
                gridColor: "#97999d",
                disableGrid: !1,
                type: "calibration"
            },
            yAxis: {
                titleFontColor: "#ffffff",
                fontColor: "#ffffff",
                gridColor: "#97999d",
                min: 0,
                format: function(e) {
                    return e > 1e3 ? e / 1e3 + "k" : e;
                }
            },
            extra: {
                lineStyle: "curve"
            }
        });
    },
    monthData: function() {
        wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), a.request(o.vip.monthData, {
            uid: n.data.wxUser.id
        }, function(e) {
            var t = e.data;
            0 == t.code ? (n.setData({
                userMonthMoney: t.userMonthMoney,
                userMonthOrder: t.userMonthOrder
            }), n.drawChart(), wx.hideLoading()) : wx.showToast({
                title: t.msg,
                image: i.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取折线图",
                image: i.globalData.errorImg
            });
        });
    },
    ranking: function() {
        wx.showLoading({
            title: "数据加载中···",
            mask: !0
        });
        var e = null;
        switch (n.data.tabChecked) {
          case "1":
            e = o.vip.teamOrderTop;
            break;

          case "2":
            e = o.vip.teamContributionIncome;
            break;

          case "3":
            e = o.vip.teamUserNumberTop;
        }
        a.request(e, {
            uid: n.data.wxUser.id
        }, function(e) {
            var t = e.data;
            0 == t.code ? (n.setData({
                rankingList: t.teamTop
            }), wx.hideLoading()) : wx.showToast({
                title: t.msg,
                image: i.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "未获取排行榜",
                image: i.globalData.errorImg
            });
        });
    },
    getVideoInfo: function(t) {
        var o = "https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=11&defnpayver=1&vid=" + t;
        a.request(o, {}, function(a) {
            var o = (a.data.replace(/QZOutputJson=/, "") + "qwe").replace(/;qwe/, ""), r = JSON.parse(o), i = r.vl.vi[0].lnk;
            e = r.vl.vi[0].ul.ui[0].url;
            var s = r.fl.fi, l = r.vl.vi[0].cl.fc;
            0 == parseInt(l) && (l = 1);
            s[s.length - 1].name;
            for (var c = s[s.length - 1].id, u = 1; u < l + 1; u++) {
                var g = i + ".p" + c % 1e4 + "." + u + ".mp4";
                d.push(u), n.requestVideoUrls(c, t, g, "index" + u);
            }
        });
    },
    requestVideoUrls: function(t, o, r, i) {
        var d = "https://vv.video.qq.com/getkey?otype=json&platform=11&format=" + t + "&vid=" + o + "&filename=" + r + "&appver=3.2.19.333";
        a.request(d, {}, function(t) {
            var a = (t.data.replace(/QZOutputJson=/, "") + "qwe").replace(/;qwe/, ""), o = JSON.parse(a);
            if (void 0 != o.key) {
                var d = o.key, l = e + r + "?vkey=" + d;
                s[i] = String(l), n.setData({
                    videUrl: n.data.videUrl.concat(s.index1)
                });
            }
        });
    },
    playEnd: function() {
        if (t > parseInt(d.length)) t = 1, n.videoContext.exitFullScreen; else {
            var e = "index" + ++t;
            n.setData({
                videUrl: s[e]
            }), n.videoContext.exitFullScreen;
        }
    },
    onPullDownRefresh: function() {
        wx.reLaunch({
            url: "/pages/main/vip/vip"
        }), wx.stopPullDownRefresh();
    },
    onPageScroll: function(e) {
        var t = .55 * n.data.systemInfo.windowHeight, a = 1 - e.scrollTop / t;
        a >= 0 && setTimeout(function() {
            n.setData({
                headerHide: a
            });
        }, 100);
    }
});