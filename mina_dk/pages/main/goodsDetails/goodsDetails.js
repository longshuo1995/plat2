var o = require("../../../489D67D23FACD8FF2EFB0FD52770D606.js"), a = require("../../../A30975103FACD8FFC56F1D17A6EFC606.js"), t = require("../../../633DD3443FACD8FF055BBB430C40D606.js"), e = getApp(), s = void 0, i = void 0, d = {}, n = wx.createCanvasContext("share");

Page({
    data: {
        imgHost: e.globalData.imgHost,
        wxUser: {},
        shareDialogShow: !1,
        goods_id: 3294434901,
        storeInfo: null,
        goodsInfo: {},
        comment: null,
        commentCount: 0,
        pageNum: 1,
        reach: !0,
        goodsList: [],
        isCollection: !1,
        merchantInfo: 0
    },
    onLoad: function(o) {
        s = this;
        var a = wx.getStorageSync("wxUser");
        if (o && o.scene) {
            var t = decodeURIComponent(o.scene);
            console.log(t);
            var e = t.split(","), d = e[0], n = e[1];
            s.setData({
                goods_id: d,
                pid: n
            });
        } else s.setData({
            goods_id: o.goods_id
        }), o.pid && s.setData({
            pid: o.pid
        });
        a ? (a.mcode && a.pid && s.setData({
            pid: a.pid
        }), s.setData({
            wxUser: a
        })) : wx.navigateTo({
            url: "/pages/common/login/login?pid=" + o.pid
        }), wx.getSystemInfo({
            success: function(o) {
                i = o.windowWidth / 750;
            }
        }), s.getGoodsComment();
    },
    onShow: function() {
        (s = this).data.wxUser.id && !s.data.goodsInfo.goods_id && s.getGoodDetail();
    },
    openShareDialog: function() {
        s.setData({
            shareDialogShow: !0
        });
    },
    closeShareDialog: function() {
        s.setData({
            shareDialogShow: !1
        });
    },
    stopEvent: function() {},
    storeGoodsSum: function() {
        wx.request({
            url: "https://api.pinduoduo.com/mall/" + s.data.goodsInfo.mall_id + "/info?check_merchant_score=yes",
            data: {},
            success: function(o) {
                o.data.goods_num && s.setData({
                    merchantInfo: o.data
                });
            },
            fail: function() {
                wx.showToast({
                    title: "未获取店铺商品总量",
                    icon: "none",
                    mask: !0
                });
            }
        });
    },
    getGoodDetail: function() {
        var t = s.data.pid;
        t && "undefined" != t || (t = s.data.wxUser.bind_pid) && "undefined" != t || (t = e.globalData.default_pid), 
        wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), o.request(a.system.goodDetail, {
            goods_id: s.data.goods_id,
            uid: s.data.wxUser.uid,
            pid: t
        }, function(o) {
            var a = o.data;
            0 == a.code ? (a.data.coupon_btime = a.data.coupon_btime.substring(0, 5), a.data.coupon_etime = a.data.coupon_etime.substring(0, 5), 
            s.setData({
                goodsInfo: a.data
            }), s.isCollection(), s.similarGoodsList(), s.storeGoodsSum(), wx.hideLoading()) : -1001 == a.code ? (wx.hideLoading(), 
            wx.showModal({
                title: "下架提示",
                content: a.msg,
                showCancel: !1,
                success: function(o) {
                    o.confirm && wx.switchTab({
                        url: "/pages/main/home/home"
                    });
                }
            })) : wx.showToast({
                title: a.msg,
                image: e.globalData.errorImg,
                mask: !0
            });
        });
    },
    getGoodsComment: function() {
        o.getGoodsComment(s.data.goods_id, 1, 3, function(a) {
            var t = a.data.data, e = a.data.number;
            t.map(function(a) {
                a.time = o.formatTime3(a.time, "Y-M-D"), a.specs = JSON.parse(a.specs);
            }), s.setData({
                comment: t,
                commentCount: e
            });
        });
    },
    lookCommentAll: function(o) {
        var a = o.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/common/goodsComment/goodsComment?goods_id=" + a
        });
    },
    similarGoodsList: function() {
        wx.showLoading({
            title: "数据加载中···",
            mask: !0
        }), o.request(a.home.index.getGoodsList, {
            appid: e.globalData.app_id,
            category_id: s.data.goodsInfo.category_id,
            role: s.data.wxUser.role,
            uid: s.data.wxUser.uid,
            pageNum: s.data.pageNum
        }, function(a) {
            var t = a.data;
            if (0 == t.code) {
                var i = s.data.pageNum + 1, d = o.encrypt(t.data), n = s.data.goodsList.concat(d);
                d.length <= 0 ? (s.setData({
                    reach: !1
                }), wx.hideLoading()) : (s.setData({
                    goodsList: n,
                    pageNum: i
                }), wx.hideLoading());
            } else wx.showToast({
                title: t.msg,
                image: e.globalData.errorImg,
                mask: !0
            });
        });
    },
    goodsDetails: function(o) {
        var a = o.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/main/goodsDetails/goodsDetails?goods_id=" + a
        });
    },
    commentPreviewImg: function(o) {
        var a = o.target.dataset.index, t = [];
        o.target.dataset.imgs.forEach(function(o) {
            t.push(o.url);
        }), wx.previewImage({
            current: t[a],
            urls: t
        });
    },
    bannerPreviewImg: function(o) {
        var a = o.target.dataset.index, t = [];
        s.data.goodsInfo.banners.forEach(function(o) {
            t.push(o.img);
        }), wx.previewImage({
            current: t[a],
            urls: t
        });
    },
    goodsPreviewImg: function(o) {
        var a = o.target.dataset.index, t = [];
        s.data.goodsInfo.imgList.forEach(function(o) {
            t.push(o.img);
        }), wx.previewImage({
            current: t[a],
            urls: t
        });
    },
    isCollection: function() {
        o.request(a.system.isCollection, {
            uid: s.data.wxUser.id,
            goods_id: s.data.goods_id
        }, function(o) {
            s.setData({
                isCollection: o.data.isCollection
            });
        });
    },
    collection: function() {
        s.data.isCollection ? o.request(a.system.delCollection, {
            uid: s.data.wxUser.id,
            goods_id: s.data.goods_id
        }, function(o) {
            var a = o.data;
            1 == a.code ? s.setData({
                isCollection: !1
            }) : wx.showToast({
                title: a.msg,
                image: e.globalData.errorImg,
                mask: !0
            });
        }) : o.request(a.system.addCollection, {
            uid: s.data.wxUser.id,
            goods_id: s.data.goods_id
        }, function(o) {
            var a = o.data;
            1 == a.code ? s.setData({
                isCollection: !0
            }) : wx.showToast({
                title: a.msg,
                image: e.globalData.errorImg,
                mask: !0
            });
        });
    },
    copyText: function() {
        o.shareGoodsCount(s.data.goods_id), wx.setClipboardData({
            data: s.data.goodsInfo.content,
            success: function(o) {
                wx.getClipboardData({
                    success: function(o) {
                        wx.showToast({
                            title: "文案已复制",
                            mask: !0
                        });
                    }
                });
            }
        });
    },
    copyUrl: function() {
        wx.showModal({
            title: "功能说明",
            content: "外部跳转微信领券链接，简单来说就是复制当前链接发短信给用户或者去其他APP引流刷评论，比如某宝、闲鱼、抖音、快手有流量的地方去刷评论，用户看见以后点击链接，就会自动打开拼多多领券页面，增加自己的订单出单率。",
            cancelText: "取消复制",
            cancelColor: "#666666",
            confirmText: "确认复制",
            confirmColor: "#d84f49",
            success: function(a) {
                a.confirm && (o.shareGoodsCount(s.data.goods_id), wx.setClipboardData({
                    data: s.data.goodsInfo.web_short_url,
                    success: function(o) {
                        wx.getClipboardData({
                            success: function(o) {
                                wx.showToast({
                                    title: "链接已复制",
                                    mask: !0
                                });
                            }
                        });
                    }
                }));
            }
        });
    },
    shareImg: function(t) {
        0 != o.getAlbumInfo() && (s.copyText(), wx.showLoading({
            title: "图片保存中...",
            mask: !0
        }), wx.downloadFile({
            url: s.data.goodsInfo.goods_image_url,
            success: function(i) {
                if (200 == i.statusCode) {
                    d.goodsImg = i.tempFilePath;
                    var n = t.currentTarget.dataset.sharetype;
                    switch (d.shareType = n, n) {
                      case "minApp":
                        d.shareBj = "../../../img/share-bg-1.png", o.request(a.system.weAppPicUrl, {
                            pid: s.data.wxUser.pid,
                            goods_id: s.data.goods_id
                        }, function(o) {
                            var a = o.data.data;
                            if (!o.data.data) return wx.showModal({
                                title: "系统提示",
                                content: "虚拟商品不能通过小程序分享",
                                showCancel: !1,
                                confirmText: "确定",
                                confirmColor: "#3CC51F",
                                success: function(o) {}
                            }), void wx.hideLoading();
                            wx.downloadFile({
                                url: a,
                                success: function(o) {
                                    200 == o.statusCode ? (d.codeImg = o.tempFilePath, s.drawImage(d)) : wx.showToast({
                                        title: "未下载小程序码",
                                        image: e.globalData.errorImg,
                                        mask: !0
                                    });
                                },
                                fail: function() {
                                    wx.showToast({
                                        title: "小程序码fail",
                                        image: e.globalData.errorImg,
                                        mask: !0
                                    });
                                }
                            });
                        });
                        break;

                      case "H5":
                        d.shareBj = "../../../img/share-bg-2.png", s.drawImage(d);
                    }
                } else wx.showToast({
                    title: "下载产品图失败",
                    image: e.globalData.errorImg,
                    mask: !0
                });
            },
            fail: function() {
                wx.showToast({
                    title: "下载产品图fail",
                    image: e.globalData.errorImg,
                    mask: !0
                });
            }
        }));
    },
    goPDDApp: function(t) {
        var i = t.target.dataset.item, d = s.data.pid;
        d && "undefined" != d || (d = s.data.wxUser.bind_pid) && "undefined" != d || (d = e.globalData.default_pid), 
        wx.navigateToMiniProgram({
            appId: i.app_id,
            path: i.page_path,
            extraData: {
                goods_id: i.goods_id,
                pid: d
            },
            envVersion: "release",
            success: function(o) {}
        }), o.request(a.system.buyLog, {
            uid: s.data.wxUser.id,
            pid: d,
            url: i.page_path,
            goods_id: i.goods_id,
            type: 1
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        s.data.reach && s.data.goodsInfo.goods_id && s.similarGoodsList();
    },
    onShareAppMessage: function(a) {
        var t = s.data.wxUser.pid;
        if (t && "undefined" != t || (t = s.data.wxUser.bind_pid) && "undefined" != t || (t = e.globalData.default_pid), 
        console.log(t), o.shareGoodsCount(s.data.goodsInfo.goods_id), a.target) {
            var i = a.target.dataset.shareGoods;
            if (i) return {
                title: "【拼多多】优惠券" + String(i.coupon_discount) + "元\n原价￥" + i.min_group_price + "  券后价￥" + i.quanhoujia,
                path: "/pages/main/goodsDetails/goodsDetails?goods_id=" + i.goods_id + "&pid=" + t,
                imageUrl: i.goods_thumbnail_url
            };
            var d = s.data.goodsInfo;
            return {
                title: "【拼多多】优惠券" + String(d.coupon_discount) + "元\n原价￥" + d.min_group_price + "  券后价￥" + d.quanhoujia,
                path: "/pages/main/goodsDetails/goodsDetails?goods_id=" + d.goods_id + "&pid=" + t,
                imageUrl: d.goods_thumbnail_url
            };
        }
        var n = s.data.goodsInfo;
        return {
            title: "【拼多多】优惠券" + String(n.coupon_discount) + "元\n原价￥" + n.min_group_price + "  券后价￥" + n.quanhoujia,
            path: "/pages/main/goodsDetails/goodsDetails?goods_id=" + n.goods_id + "&pid=" + t,
            imageUrl: n.goods_thumbnail_url
        };
    },
    copyGoodsId: function(o) {
        var a = o.currentTarget.dataset.id;
        wx.setClipboardData({
            data: a,
            success: function(o) {
                wx.hideToast(), wx.getClipboardData({
                    success: function(o) {
                        wx.hideToast();
                    }
                });
            }
        });
    },
    drawImage: function(o) {
        n.clearRect(0, 0, 750 * i, 1334 * i), n.drawImage(o.shareBj, 0, 0, 750 * i, 1334 * i), 
        n.drawImage(o.goodsImg, 0, 0, 750 * i, 820 * i), n.setFontSize(32 * i), n.setFillStyle("#000"), 
        n.setTextAlign("left");
        var a = [];
        if (n.measureText(s.data.goodsInfo.goods_name).width > 300) {
            var e = "", d = "";
            s.data.goodsInfo.goods_name.split("").map(function(o) {
                n.measureText(e).width <= 270 ? e += o : d += o;
            }), a.push(e), a.push(d);
        } else a.push(s.data.goodsInfo.goods_name);
        switch (a.forEach(function(o, a) {
            0 == a ? n.fillText(o, 160 * i, 884 * i, 700 * i) : n.fillText(o, 30 * i, 934 * i, 700 * i);
        }), o.shareType) {
          case "minApp":
            n.setFontSize(28 * i), n.setFillStyle("#ff364d"), n.setTextAlign("left"), n.fillText("￥" + s.data.goodsInfo.quanhoujia, 24 * i, 1e3 * i), 
            n.setFontSize(26 * i), n.setFillStyle("#808080"), n.setTextAlign("left"), n.fillText("原价￥" + s.data.goodsInfo.min_group_price, 24 * i, 1040 * i), 
            n.setFontSize(36 * i), n.setFillStyle("#fff"), n.setTextAlign("center"), n.fillText(s.data.goodsInfo.coupon_discount + "元", 630 * i, 1016 * i), 
            n.drawImage(o.codeImg, 40 * i, 1105 * i, 205 * i, 205 * i), n.draw(!1, function() {
                s.downloadCanvas();
            });
            break;

          case "H5":
            n.setFontSize(38 * i), n.setFillStyle("#fd4f42"), n.setTextAlign("center"), n.fillText("￥" + s.data.goodsInfo.quanhoujia, 658 * i, 1045 * i), 
            n.setFontSize(32 * i), n.setFillStyle("#808080"), n.setTextAlign("center"), n.fillText("￥" + s.data.goodsInfo.min_group_price, 90 * i, 1045 * i), 
            n.setFontSize(30 * i), n.setFillStyle("#cfaa71"), n.setTextAlign("center"), n.fillText(s.data.goodsInfo.coupon_discount, 394 * i, 1042 * i), 
            t.api.draw(s.data.goodsInfo.short_url, n, Math.floor(170 * i), Math.floor(170 * i), Math.floor(540 * i), Math.floor(1126 * i)), 
            n.drawImage("../../../img/share-bg-2-logo.png", 606 * i, 1188 * i, 40 * i, 40 * i), 
            n.draw(!1, function() {
                setTimeout(function() {
                    s.downloadCanvas();
                }, 1e3);
            });
        }
    },
    downloadCanvas: function() {
        wx.canvasToTempFilePath({
            fileType: "jpg",
            canvasId: "share",
            success: function(o) {
                var a = o.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function(o) {
                        wx.showToast({
                            title: "图片保存成功",
                            mask: !0
                        }), setTimeout(function() {
                            wx.hideLoading(), wx.previewImage({
                                urls: [ a ]
                            });
                        }, 1e3);
                    },
                    fail: function() {
                        wx.showToast({
                            title: "图片保存失败",
                            image: e.globalData.errorImg,
                            mask: !0
                        });
                    }
                });
            }
        });
    },
    obstacle: function() {}
});