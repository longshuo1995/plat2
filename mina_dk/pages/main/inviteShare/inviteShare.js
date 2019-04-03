var e = require("../../../489D67D23FACD8FF2EFB0FD52770D606.js"), a = require("../../../A30975103FACD8FFC56F1D17A6EFC606.js"), t = getApp(), i = void 0, r = void 0, s = wx.createCanvasContext("share"), o = void 0;

Page({
    data: {
        shareBj: null,
        qrCode: null,
        swiperList: [],
        shareContent: {},
        share_img_name: null,
        share_img_src: null
    },
    onLoad: function(e) {
        (i = this).setData({
            wxUser: wx.getStorageSync("wxUser")
        }), wx.getSystemInfo({
            success: function(e) {
                r = e.windowWidth / 750;
            }
        }), i.getShareText(), i.getSwiperList();
    },
    sharePoster: function() {
        0 != e.getAlbumInfo() && (wx.showLoading({
            title: "图片保存中...",
            mask: !0
        }), wx.downloadFile({
            url: i.data.share_img_src,
            success: function(e) {
                200 == e.statusCode ? i.setData({
                    shareBj: e.tempFilePath
                }) : (wx.showToast({
                    title: "下载背景图失败",
                    image: t.globalData.errorImg
                }), clearInterval(o));
            },
            fail: function() {
                wx.showToast({
                    title: "下载背景图fail",
                    image: t.globalData.errorImg
                }), clearInterval(o);
            }
        }), e.request(a.mine.inviteShare.generateImg, {
            uid: i.data.wxUser.id,
            mcode: i.data.wxUser.mcode,
            share_img_name: i.data.share_img_name,
            appid: t.globalData.app_id
        }, function(e) {
            var a = e.data;
            if (0 == a.code) {
                var r = t.globalData.user_imgs_path + "/" + a.imgPath;
                wx.downloadFile({
                    url: r,
                    success: function(e) {
                        200 == e.statusCode ? i.setData({
                            qrCode: e.tempFilePath
                        }) : (wx.showToast({
                            title: "未下载小程序码",
                            image: t.globalData.errorImg
                        }), clearInterval(o));
                    },
                    fail: function() {
                        wx.showToast({
                            title: "下载小程序码fail",
                            image: t.globalData.errorImg
                        }), clearInterval(o);
                    }
                });
            }
        }), o = setInterval(function() {
            var e = i.data.shareBj, a = i.data.qrCode;
            e && a && (i.drawImage(e, a), clearInterval(o));
        }, 500));
    },
    swiperChange: function(e) {
        var a = e.detail.current;
        i.setData({
            share_img_name: i.data.swiperList[a].name,
            share_img_src: i.data.swiperList[a].imgUrl,
            shareBj: null,
            qrCode: null
        });
    },
    getSwiperList: function() {
        e.request(a.mine.inviteShare.getSwiperList, {}, function(e) {
            var a = e.data;
            0 == a.code ? a.templateList ? i.setData({
                swiperList: a.templateList,
                share_img_src: a.templateList[0].imgUrl,
                share_img_name: a.templateList[0].name
            }) : wx.showToast({
                title: "暂无数据",
                image: t.globalData.errorImg
            }) : wx.showToast({
                title: a.msg,
                image: t.globalData.errorImg
            });
        }, function(e) {
            wx.showToast({
                title: "获取swiper图片fail",
                image: t.globalData.errorImg
            });
        });
    },
    shareNormal: function() {
        0 != e.getAlbumInfo() && (wx.showLoading({
            title: "图片保存中...",
            mask: !0
        }), e.request(a.mine.inviteShare.generatePromotionImg, {
            uid: i.data.wxUser.id,
            mcode: i.data.wxUser.mcode,
            pid: i.data.wxUser.pid,
            appid: t.globalData.app_id
        }, function(e) {
            var a = e.data;
            0 == a.code && wx.downloadFile({
                url: a.imgPath,
                success: function(e) {
                    200 == e.statusCode ? i.drawImage("", e.tempFilePath) : wx.showToast({
                        title: "未下载小程序码",
                        image: t.globalData.errorImg
                    });
                },
                fail: function() {
                    wx.showToast({
                        title: "下载小程序码fail",
                        image: t.globalData.errorImg
                    });
                }
            });
        }));
    },
    getShareText: function() {
        e.request(a.home.index.getShareText, {
            type: 2
        }, function(e) {
            var a = e.data;
            0 == a.code ? i.setData({
                shareContent: a.content
            }) : wx.showToast({
                title: a.msg,
                image: t.globalData.errorImg
            });
        });
    },
    onShareAppMessage: function(e) {
        var a = i.data.wxUser.mcode, r = i.data.shareContent.desc, s = i.data.shareContent.imgUrl, o = i.data.wxUser.pid;
        return o && "undefined" != o || (o = i.data.wxUser.bind_pid) && "undefined" != o || (o = t.globalData.default_pid), 
        console.log("share_pid==" + o), {
            title: r,
            path: "/pages/common/register/register?mcode=" + a + "&pid=" + o,
            imageUrl: s
        };
    },
    drawImage: function(e, a) {
        e ? (s.clearRect(0, 0, 750 * r, 1280 * r), s.drawImage(e, 0, 0, 750 * r, 1280 * r), 
        s.drawImage(a, 256 * r, 936 * r, 238 * r, 222 * r), s.setFillStyle("#fff"), s.rect(256 * r, 1158 * r, 238 * r, 40 * r), 
        s.fill(), s.setFontSize(26 * r), s.setFillStyle("#000000"), s.setTextAlign("center"), 
        s.fillText("邀请码:" + i.data.wxUser.mcode, 375 * r, 1188 * r)) : (s.clearRect(0, 0, 750 * r, 1280 * r), 
        s.drawImage(a, 25 * r, 290 * r, 700 * r, 700 * r)), s.draw(!1, function() {
            wx.canvasToTempFilePath({
                fileType: "jpg",
                canvasId: "share",
                success: function(e) {
                    var a = e.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,
                        success: function(e) {
                            wx.showToast({
                                title: "保存成功"
                            }), setTimeout(function() {
                                wx.hideLoading(), wx.previewImage({
                                    urls: [ a ]
                                });
                            }, 1e3);
                        },
                        fail: function() {
                            wx.showToast({
                                title: "保存失败",
                                image: t.globalData.errorImg
                            });
                        }
                    });
                }
            });
        });
    }
});