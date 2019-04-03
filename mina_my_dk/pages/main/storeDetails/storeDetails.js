var t = require("../../../489D67D23FACD8FF2EFB0FD52770D606.js"), a = require("../../../A30975103FACD8FFC56F1D17A6EFC606.js"), e = require("../../../633DD3443FACD8FF055BBB430C40D606.js"), o = getApp(), i = void 0, s = void 0, l = wx.createCanvasContext("share");

Page({
    data: {
        imgHost: o.globalData.imgHost,
        wxUser: {},
        mall_id: "",
        pid: "",
        storeInfo: null,
        storeGoodsList: [],
        pageNum: 1,
        reach: !0,
        shareBj: "../../../img/store-share-bg.png"
    },
    onLoad: function(t) {
        i = this;
        var a = wx.getStorageSync("wxUser");
        t.pid && i.setData({
            pid: t.pid
        }), a ? (a.mcode && a.pid && i.setData({
            pid: a.pid
        }), i.setData({
            wxUser: a
        })) : wx.navigateTo({
            url: "/pages/common/login/login?pid=" + t.pid
        }), wx.getSystemInfo({
            success: function(t) {
                s = t.windowWidth / 750;
            }
        }), t.mall_id && i.setData({
            mall_id: t.mall_id
        }), t && t.pid && i.setData({
            source_pid: t.pid
        }), a && a.mcode && a.pid && i.setData({
            pid: a.pid
        }), i.setData({
            wxUser: a
        }), i.storeInfo();
    },
    onShow: function() {
        i.data.wxUser.id && i.data.storeGoodsList.length < 1 && i.storeGoodsList();
    },
    goodsDetails: function(t) {
        var a = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/main/goodsDetails/goodsDetails?goods_id=" + a
        });
    },
    storeInfo: function() {
        wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), t.request(a.home.store.merchantList, {
            mall_id: i.data.mall_id
        }, function(t) {
            console.log(t);
            var a = t.data, e = a.data[0];
            1 == a.code ? (i.setData({
                storeInfo: e
            }), e.mall_coupon_info_list && i.mallUrlGen(), wx.hideLoading()) : (wx.showToast({
                title: a.msg,
                image: o.globalData.errorImg
            }), wx.hideLoading());
        }, function(t) {
            wx.showToast({
                title: "未获取店铺详情",
                image: o.globalData.errorImg
            });
        });
    },
    storeGoodsList: function() {
        i.data.mall_id ? (wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), t.request(a.home.store.mallGoodsList, {
            role: i.data.wxUser.role,
            pageNumber: i.data.pageNum,
            mall_id: i.data.mall_id
        }, function(t) {
            var a = t.data;
            if (1 == a.code) {
                var e = i.data.pageNum + 1, s = a.data, l = i.data.storeGoodsList.concat(s);
                s.length <= 0 ? (i.setData({
                    reach: !1
                }), wx.hideLoading()) : (i.setData({
                    storeGoodsList: l,
                    pageNum: e
                }), wx.hideLoading());
            } else wx.showToast({
                title: a.msg,
                image: o.globalData.errorImg
            });
        }, function(t) {
            wx.showToast({
                title: "未获取店铺商品",
                image: o.globalData.errorImg
            });
        })) : wx.showToast({
            title: "店铺ID为空",
            image: o.globalData.errorImg
        });
    },
    mallUrlGen: function() {
        var e = i.data.pid;
        e && "undefined" != e || (e = i.data.wxUser.bind_pid) && "undefined" != e || (e = o.globalData.default_pid), 
        e && "undefined" != e && "" != e || (e = o.globalData.default_pid), t.request(a.home.store.mallUrlGen, {
            mall_id: i.data.mall_id,
            pid: e,
            couponType: i.data.storeInfo.mall_coupon_info_list.coupon_type
        }, function(t) {
            i.setData({
                merchantUrl: t.data.data
            });
        });
    },
    copyMerchantUrl: function() {
        var t = "【全场";
        t += 224 == i.data.storeInfo.mall_coupon_info_list.coupon_type ? "满减】" : i.data.storeInfo.mall_coupon_info_list.discount / 10 + "折】", 
        t += i.data.storeInfo.mall_name, t += "周年庆活动\n", t += "店铺类型：" + i.data.storeInfo.merchant_type_str + "\n", 
        t += "活动日期：" + i.data.storeInfo.mall_coupon_info_list.coupon_start_time_str + "至" + i.data.storeInfo.mall_coupon_info_list.coupon_end_time_str + "\n", 
        t += "活动链接：" + i.data.merchantUrl, wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "店铺链接已复制"
                        });
                    }
                });
            }
        });
    },
    shareImg: function() {
        if (0 != t.getAlbumInfo()) {
            wx.showLoading({
                title: "图片保存中...",
                mask: !0
            });
            var a, e, o;
            switch (i.data.storeInfo.mall_coupon_info_list.coupon_type) {
              case "225":
                a = i.data.storeInfo.mall_coupon_info_list.discount / 10, e = "全场折扣券", o = "折";
                break;

              case "224":
                a = i.data.storeInfo.mall_coupon_info_list.discount / 100, e = "全场满减券", o = "元";
            }
            var s = "", l = "", n = "", d = "";
            wx.downloadFile({
                url: i.data.storeGoodsList[0].goods_thumbnail_url,
                success: function(t) {
                    200 === t.statusCode && (s = t.tempFilePath);
                }
            }), wx.downloadFile({
                url: i.data.storeGoodsList[1].goods_thumbnail_url,
                success: function(t) {
                    200 === t.statusCode && (l = t.tempFilePath);
                }
            }), wx.downloadFile({
                url: i.data.storeGoodsList[2].goods_thumbnail_url,
                success: function(t) {
                    200 === t.statusCode && (n = t.tempFilePath);
                }
            }), wx.downloadFile({
                url: i.data.storeInfo.img_url,
                success: function(t) {
                    200 === t.statusCode && (d = t.tempFilePath);
                }
            });
            var r = setInterval(function() {
                "" != s && "" != l && "" != n && "" != d && (i.drawImage({
                    discount: a,
                    img1: s,
                    img2: l,
                    img3: n,
                    logo: d,
                    name: i.data.storeInfo.mall_name,
                    level: i.data.storeInfo.merchant_type_str,
                    type: i.data.storeInfo.goods_detail_vo_list[0].category_name,
                    couponType: e,
                    units: o
                }), clearInterval(r));
            }, 500);
        }
    },
    onReachBottom: function() {
        i.data.reach && i.storeGoodsList();
    },
    onShareAppMessage: function(t) {
        var a = i.data.wxUser.pid;
        a && "undefined" != a || (a = i.data.wxUser.bind_pid) && "undefined" != a || (a = o.globalData.default_pid);
        var e = i.data.mall_id, s = i.data.storeInfo.mall_coupon_info_list.coupon_type, l = i.data.storeInfo.img_url, n = "/pages/main/storeDetails/storeDetails?mall_id=" + e + "&pid=" + a, d = "【" + i.data.storeInfo.mall_name + "】";
        return d += 224 == s ? "全场" + i.data.storeInfo.mall_coupon_info_list.discount / 100 + "元满减" : "全场" + i.data.storeInfo.mall_coupon_info_list.discount / 10 + "折", 
        {
            title: d,
            path: n,
            imageUrl: l
        };
    },
    drawImage: function(t) {
        l.clearRect(0, 0, 750 * s, 1200 * s), l.drawImage(i.data.shareBj, 0, 0, 750 * s, 1200 * s), 
        l.drawImage(t.img1, 26 * s, 250 * s, 442 * s, 520 * s), l.drawImage(t.img2, 482 * s, 250 * s, 245 * s, 250 * s), 
        l.drawImage(t.img3, 482 * s, 520 * s, 245 * s, 250 * s), l.drawImage(t.logo, 30 * s, 865 * s, 90 * s, 90 * s), 
        l.setFontSize(32 * s), l.setFillStyle("#feb04c"), l.setTextAlign("center"), l.fillText(t.couponType + " " + t.discount + " " + t.units + "，限时火爆抢购中", 375 * s, 210 * s), 
        l.setFontSize(30 * s), l.setFillStyle("#1f1f1f"), l.setTextAlign("left"), l.fillText(t.name, 150 * s, 900 * s, 340 * s), 
        l.setFontSize(22 * s);
        var a = l.measureText(t.level).width + 10;
        l.setFillStyle("#feb04c"), l.rect(150 * s, 924 * s, a, 30 * s), l.fill(), l.setFillStyle("#ffffff"), 
        l.setTextAlign("left"), l.fillText(t.level, 160 * s, 948 * s), l.beginPath(), l.setFontSize(22 * s);
        var o = l.measureText(t.type).width + 10;
        l.setFillStyle("#1f1f1f"), l.rect(180 * s + a, 924 * s, o, 30 * s), l.stroke(), 
        l.setFillStyle("#1f1f1f"), l.setTextAlign("left"), l.fillText(t.type, 190 * s + a, 948 * s), 
        l.setFontSize(56 * s), l.setFillStyle("#ffffff"), l.setTextAlign("left"), l.fillText(t.discount, 56 * s, 1060 * s), 
        l.setFontSize(38 * s), l.setFillStyle("#ffffff"), l.setTextAlign("left"), l.fillText(t.units, 100 * s, 1055 * s), 
        l.setFontSize(26 * s), l.setFillStyle("#ffffff"), l.setTextAlign("left"), l.fillText(t.couponType, 200 * s, 1050 * s), 
        e.api.draw(i.data.merchantUrl, l, Math.floor(200 * s), Math.floor(200 * s), Math.floor(516 * s), Math.floor(857 * s)), 
        l.drawImage("../../../img/share-bg-2-logo.png", 595 * s, 940 * s, 40 * s, 40 * s), 
        l.draw(!1, function() {
            setTimeout(function() {
                i.downloadCanvas();
            }, 1e3);
        });
    },
    downloadCanvas: function() {
        wx.canvasToTempFilePath({
            fileType: "jpg",
            canvasId: "share",
            success: function(t) {
                var a = t.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "图片保存成功"
                        }), setTimeout(function() {
                            wx.hideLoading(), wx.previewImage({
                                urls: [ a ]
                            });
                        }, 1e3);
                    },
                    fail: function() {
                        wx.showToast({
                            title: "图片保存失败",
                            image: o.globalData.errorImg
                        });
                    }
                });
            }
        });
    }
});