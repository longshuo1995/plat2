var t = getApp(), a = require("../../../489D67D23FACD8FF2EFB0FD52770D606.js"), e = require("../../../A30975103FACD8FFC56F1D17A6EFC606.js"), o = require("../../../633DD3443FACD8FF055BBB430C40D606.js"), i = void 0, s = void 0, n = wx.createCanvasContext("share");

Page({
    data: {
        imgHostUpload: t.globalData.imgHostUpload,
        wxUser: {},
        activityInfo: {},
        sn: null,
        short_url: null
    },
    onLoad: function(t) {
        i = this;
        var a = wx.getStorageSync("wxUser");
        i.setData({
            wxUser: a
        }), t.sn && i.setData({
            sn: t.sn
        }), wx.getSystemInfo({
            success: function(t) {
                s = t.windowWidth / 750;
            }
        }), i.getActivity();
    },
    getActivity: function() {
        a.request(e.system.getActivityTopic, {
            sn: i.data.sn
        }, function(a) {
            var e = a.data;
            0 == e.code && e.data.length > 0 ? (i.setData({
                activityInfo: e.data[0]
            }), wx.setNavigationBarTitle({
                title: e.data[0].title
            }), i.resourceUrlGen()) : wx.showToast({
                title: "未获取活动信息",
                image: t.globalData.errorImg
            });
        });
    },
    resourceUrlGen: function() {
        var e = t.globalData.url + i.data.activityInfo.interface_url;
        a.request(e, {
            pid: i.data.wxUser.pid
        }, function(t) {
            i.setData({
                short_url: t.data.data
            });
        });
    },
    shareImg: function() {
        0 != a.getAlbumInfo() && (wx.showLoading({
            title: "图片保存中...",
            mask: !0
        }), wx.downloadFile({
            url: i.data.activityInfo.share_img,
            success: function(a) {
                200 == a.statusCode ? i.drawImage(a.tempFilePath) : wx.showToast({
                    title: "下载分享图失败",
                    image: t.globalData.errorImg
                });
            },
            fail: function() {
                wx.showToast({
                    title: "下载分享图fail",
                    image: t.globalData.errorImg
                });
            }
        }));
    },
    drawImage: function(t) {
        n.drawImage(t, 0, 0, 750 * s, 1280 * s), n.setFillStyle("#ffffff"), n.fillRect(256 * s, 931 * s, 233 * s, 226 * s), 
        o.api.draw(i.data.short_url, n, Math.floor(230 * s), Math.floor(220 * s), Math.floor(256 * s), Math.floor(932 * s)), 
        n.drawImage("../../../img/share-bg-2-logo.png", 350 * s, 1020 * s, 40 * s, 40 * s), 
        n.draw(!1, function() {
            setTimeout(function() {
                i.downloadCanvas();
            }, 1e3);
        });
    },
    downloadCanvas: function() {
        wx.canvasToTempFilePath({
            fileType: "jpg",
            canvasId: "share",
            success: function(a) {
                var e = a.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "图片保存成功"
                        }), setTimeout(function() {
                            wx.hideLoading(), wx.previewImage({
                                urls: [ e ]
                            });
                        }, 1e3);
                    },
                    fail: function() {
                        wx.showToast({
                            title: "图片保存失败",
                            image: t.globalData.errorImg
                        });
                    }
                });
            }
        });
    }
});