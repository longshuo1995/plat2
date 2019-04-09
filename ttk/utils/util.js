function e(o, i, s, l) {
    wx.showLoading({
        title: "正在生成图片...",
        mask: !0
    }), o.setData({
        canvasShow: ""
    }), wx.getSystemInfo({
        success: function(e) {
            n = e.windowWidth / 750, o.setData({
                winWidth: e.windowWidth,
                winHeight: e.windowHeight
            });
        }
    });
    var c = wx.createCanvasContext("shareCanvas");
    c.rect(0, 0, t(750) * a, t(1344) * a), c.setFillStyle("white"), c.fill();
    wx.getImageInfo({
        src: i,
        success: function(n) {
            var i = n.path;
            c.drawImage(i, -20, 0, t(850) * a, t(721) * a), wx.getImageInfo({
                src: s,
                success: function(n) {
                    var a = n.path;
                    c.drawImage(a, t(350), t(630), t(200), t(200)), c.beginPath(), c.setFillStyle("#4E4E4E"), 
                    c.setFontSize(t(30)), c.closePath(), c.fillText("长按识别二维码购买", t(305), t(900)), c.beginPath(), 
                    c.setFillStyle("#4E4E4E"), c.setFontSize(t(30)), c.closePath(), c.fillText(l.substring(0, 8), t(30), t(700)), 
                    c.beginPath(), c.setFillStyle("#4E4E4E"), c.setFontSize(t(30)), c.closePath(), c.fillText(l.substring(8, 17), t(30), t(750)), 
                    c.beginPath(), c.setFillStyle("#4E4E4E"), c.setFontSize(t(30)), c.closePath(), c.fillText(l.substring(17, 26), t(30), t(800)), 
                    c.draw(), setTimeout(function() {
                        wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            fileType: "jpg",
                            canvasId: "shareCanvas",
                            quality: 1,
                            success: function(t) {
                                wx.hideLoading();
                                wx.getSystemInfoSync();
                                wx.saveImageToPhotosAlbum({
                                    filePath: t.tempFilePath,
                                    success: function(e) {
                                        wx.showToast({
                                            title: "图片已保存",
                                            icon: "success",
                                            duration: 2e3,
                                            mask: !0,
                                            success: function(e) {},
                                            fail: function(e) {},
                                            complete: function(e) {}
                                        }), o.setData({
                                            canvasShow: "none",
                                            showModalStatus: !1
                                        });
                                    },
                                    fail: function(t) {
                                        console.log("fail", t), o.setData({
                                            canvasShow: "none",
                                            showModalStatus: !1
                                        }), wx.getSetting({
                                            success: function(t) {
                                                t.authSetting["scope.writePhotosAlbum"] ? console.log("保存图片已授权") : wx.showModal({
                                                    title: "权限",
                                                    content: "您还没有授权保存图片权限",
                                                    confirmText: "去授权",
                                                    cancelText: "取消",
                                                    success: function(t) {
                                                        console.log(t), t.cancel || wx.openSetting({
                                                            success: function(t) {
                                                                t.authSetting["scope.writePhotosAlbum"] && (console.log("开启权限成功"), e(o, goods, draw_type));
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }), o.setData({
                                    shareImage: t.tempFilePath,
                                    showSharePic: !0
                                }), wx.hideLoading();
                            },
                            fail: function(e) {
                                wx.hideLoading(), console.log("resFail", e);
                            }
                        });
                    }, 2e3);
                },
                fail: function(e) {},
                complete: function(e) {}
            });
        }
    });
}

function t(e) {
    return e * n;
}

var n, o = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, a = .8;

module.exports = {
    formatTime: function(e) {
        var t = e.getFullYear(), n = e.getMonth() + 1, a = e.getDate(), i = e.getHours(), s = e.getMinutes(), l = e.getSeconds();
        return [ t, n, a ].map(o).join("/") + " " + [ i, s, l ].map(o).join(":");
    },
    goFree: function(e) {
        var t = encodeURIComponent(getApp().globalData.miandanUrl + "/h5/exemption/goodslist?uid=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId);
        wx.navigateTo({
            url: "../webview/webview?xinsourl=" + t + "&intoType=4&banner_id=no"
        });
    },
    goZhuLi: function(e) {
        var t = encodeURIComponent(getApp().globalData.zhuliUrl + "?uid=" + wx.getStorageSync("uid") + "&channelId=" + getApp().globalData.channelId + "&isOld=" + e.data.isOld);
        wx.navigateTo({
            url: "../webview/webview?xinsourl=" + t + "&intoType=5"
        });
    },
    drawShareImage: e
};