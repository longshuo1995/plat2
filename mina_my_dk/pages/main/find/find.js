var a = require("../../../489D67D23FACD8FF2EFB0FD52770D606.js"), t = require("../../../A30975103FACD8FFC56F1D17A6EFC606.js"), e = require("../../../633DD3443FACD8FF055BBB430C40D606.js"), i = getApp(), o = void 0, s = void 0, d = {}, n = wx.createCanvasContext("share");

Page({
    data: {
        imgHost: i.globalData.imgHost,
        imgHostUpload: i.globalData.imgHostUpload,
        tabChecked: 1,
        filterChecked: 1,
        list: [],
        pageNum: 1,
        reach: !0,
        back: !1,
        findDot: {},
        isFirst: !0,
        hidePage: !0
    },
    onLoad: function(a) {
        o = this;
        var t = wx.getStorageSync("wxUser");
        t && o.setData({
            wxUser: t
        }), wx.getSystemInfo({
            success: function(a) {
                s = a.windowWidth / 750;
            }
        }), 0 == t.role && o.setData({
            filterChecked: 4
        }), o.getShareText(), o.getData();
    },
    onShow: function() {
        o.data.back && (o.setData({
            tabChecked: 2,
            filterChecked: 1,
            list: [],
            pageNum: 1,
            reach: !0
        }), o.getData()), o.data.isFirst && (setTimeout(function() {
            o.checkFindNew();
        }, 500), o.setData({
            isFirst: !1
        }));
    },
    onHide: function() {
        o.data.hidePage ? (o.setData({
            isFirst: !0
        }), wx.setStorageSync("isFirst", !0)) : (o.setData({
            hidePage: !0
        }), wx.setStorageSync("isFirst", !1));
    },
    onTabItemTap: function(a) {
        1 != a.index && wx.setStorageSync("isFirst", !1);
    },
    checkFindNew: function() {
        var a = wx.getStorageSync("findDot");
        o.setData({
            findDot: a
        });
    },
    tabChange: function(a) {
        var t = a.target.dataset.index;
        t != o.data.tabChecked && (o.setData({
            tabChecked: t,
            back: !1,
            filterChecked: 1,
            list: [],
            pageNum: 1,
            reach: !0
        }), o.getData());
    },
    filterChange: function(a) {
        var t = a.target.dataset.index;
        if (t != o.data.filterChecked) {
            o.setData({
                filterChecked: t,
                list: [],
                pageNum: 1,
                reach: !0
            }), o.getData();
            var e = o.data.findDot;
            switch (t) {
              case 1:
                e.dot_tj = !1, setTimeout(function() {
                    o.setData({
                        findDot: e
                    }), 0 == e.dot_tj && 0 == e.dot_yc && 0 == e.dot_sc && 0 == e.dot_xs && (e.dot_fx = !1, 
                    console.log("重重" + e.dot_fx), wx.hideTabBarRedDot({
                        index: 1
                    })), wx.setStorageSync("findDot", e);
                }, 500);
                break;

              case 2:
                e.dot_yc = !1, setTimeout(function() {
                    o.setData({
                        findDot: e
                    }), 0 == e.dot_tj && 0 == e.dot_yc && 0 == e.dot_sc && 0 == e.dot_xs && (e.dot_fx = !1, 
                    wx.hideTabBarRedDot({
                        index: 1
                    })), wx.setStorageSync("findDot", e);
                }, 500);
                break;

              case 3:
                break;

              case 4:
                e.dot_sc = !1, setTimeout(function() {
                    o.setData({
                        findDot: e
                    }), 0 == e.dot_tj && 0 == e.dot_yc && 0 == e.dot_sc && 0 == e.dot_xs && (e.dot_fx = !1, 
                    wx.hideTabBarRedDot({
                        index: 1
                    })), wx.setStorageSync("findDot", e);
                }, 500);
                break;

              case 5:
                e.dot_xs = !1, setTimeout(function() {
                    o.setData({
                        findDot: e
                    }), 0 == e.dot_tj && 0 == e.dot_yc && 0 == e.dot_sc && 0 == e.dot_xs && (e.dot_fx = !1, 
                    wx.hideTabBarRedDot({
                        index: 1
                    })), wx.setStorageSync("findDot", e);
                }, 500);
            }
            console.log("find复制"), console.log(e);
        }
    },
    publish: function() {
        o.setData({
            hidePage: !1
        }), wx.navigateTo({
            url: "/pages/find/publish/publish"
        });
    },
    goodsDetails: function(a) {
        o.setData({
            hidePage: !1
        });
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/main/goodsDetails/goodsDetails?goods_id=" + t
        });
    },
    copyText: function(a) {
        wx.setClipboardData({
            data: a,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {
                        wx.showToast({
                            title: "文案已复制"
                        });
                    }
                });
            }
        });
    },
    findRecommendGoods: function(e) {
        var s = e.currentTarget.dataset.item;
        o.copyText(s.desc);
        var d = e.currentTarget.dataset.item.id, n = e.currentTarget.dataset.findindex, r = o.data.list;
        if (!r[n].isLike) {
            var c = r[n], g = c.avatarUrl_like;
            g.unshift(o.data.wxUser.avatarUrl), c.avatarUrl = g, c.likeCount += 1, c.isLike = 1, 
            o.setData({
                list: r
            }), a.request(t.find.index.findRecommendGoods, {
                id: d,
                uid: o.data.wxUser.id,
                avatarUrl: o.data.wxUser.avatarUrl
            }, function(a) {
                var t = a.data;
                0 != t.code && (wx.showToast({
                    title: t.msg,
                    image: i.globalData.errorImg
                }), g.splice(0, 1), c.avatarUrl = g, c.likeCount -= 1, c.isLike = 0, o.setData({
                    list: r
                }));
            });
        }
    },
    findLike: function(e) {
        var i = e.currentTarget.dataset.item, s = i.id, d = e.currentTarget.dataset.findindex, n = i.type, r = o.data.list, c = i.isLike;
        o.copyText(i.desc), 1 != c ? (i.avatarUrl_like.unshift(o.data.wxUser.avatarUrl), 
        i.likeCount += 1, i.isLike = 1, r[d] = i, o.setData({
            list: r
        }), a.request(t.find.index.findLike, {
            findId: s,
            uid: o.data.wxUser.id,
            avatarUrl: o.data.wxUser.avatarUrl,
            type: n
        }, function(a) {
            0 != a.data.code && (i.avatarUrl_like.splice(0, 1), i.likeCount -= 1, i.isLike = 0, 
            r[d] = i, o.setData({
                list: r
            }));
        }), console.log("告诉了后台")) : console.log("不准点了");
    },
    shareImg: function(e) {
        o.setData({
            hidePage: !1
        });
        var s = e.currentTarget.dataset.findindex, n = e.currentTarget.dataset.item;
        0 != a.getAlbumInfo() && (wx.showLoading({
            title: "图片保存中...",
            mask: !0
        }), d.goodsInfo = n, o.recordShare(o.data.list[s].id, o.data.list[s].desc, o.data.list[s].findImgs, o.data.list[s].goods_id), 
        n.findImgs.forEach(function(a) {
            wx.downloadFile({
                url: a,
                success: function(a) {
                    if (200 == a.statusCode) {
                        var t = a.tempFilePath;
                        wx.saveImageToPhotosAlbum({
                            filePath: t,
                            success: function(a) {},
                            fail: function() {}
                        });
                    }
                }
            });
        }), o.copyText(n.desc), wx.downloadFile({
            url: d.goodsInfo.goods_image_url,
            success: function(e) {
                if (200 == e.statusCode) {
                    d.goodsImg = e.tempFilePath;
                    var s = o.data.wxUser.pid;
                    s && "undefined" != s || (s = o.data.wxUser.bind_pid) && "undefined" != s || (s = i.globalData.default_pid), 
                    a.request(t.system.getShortUrl, {
                        pid: s,
                        goods_id: d.goodsInfo.goods_id
                    }, function(a) {
                        var t = a.data;
                        1 == t.code ? (d.goodsInfo.short_url = t.data, d.shareBj = "../../../img/share-bg-2.png", 
                        o.drawImage(d)) : wx.showToast({
                            title: a.msg,
                            image: i.globalData.errorImg
                        });
                    }, function() {
                        wx.showToast({
                            title: "未获取短连接",
                            image: i.globalData.errorImg
                        });
                    });
                } else wx.showToast({
                    title: "下载产品图失败",
                    image: i.globalData.errorImg
                });
            },
            fail: function() {
                wx.showToast({
                    title: "下载产品图fail",
                    image: i.globalData.errorImg
                });
            }
        }));
    },
    findPreviewImg: function(a) {
        o.setData({
            hidePage: !1
        });
        var t = a.target.dataset.index, e = a.target.dataset.imgs;
        wx.previewImage({
            current: e[t],
            urls: e
        });
    },
    recordShare: function(e, i, s, d) {
        var n = 5;
        switch (o.data.filterChecked) {
          case 1:
            n = 5;
            break;

          case 2:
            n = 3;
            break;

          case 3:
            n = 4;
            break;

          case 4:
            n = 1;
            break;

          case 5:
            n = 2;
        }
        a.request(t.find.index.createCopywriting, {
            types: n,
            id: e,
            desc: i,
            banners: s,
            goods_id: d
        });
    },
    copySave: function(e) {
        o.setData({
            hidePage: !1
        });
        var s = o.data.wxUser.pid;
        if (s && "undefined" != s || (s = o.data.wxUser.bind_pid) && "undefined" != s || (s = i.globalData.default_pid), 
        0 != a.getAlbumInfo()) {
            var d = e.currentTarget.dataset.item, n = d.findImgs;
            o.recordShare(d.id, d.desc, d.findImgs, ""), n.forEach(function(a) {
                wx.downloadFile({
                    url: a,
                    success: function(a) {
                        if (200 == a.statusCode) {
                            var t = a.tempFilePath;
                            wx.saveImageToPhotosAlbum({
                                filePath: t,
                                success: function(a) {},
                                fail: function() {}
                            });
                        }
                    }
                });
            }), o.findLike(e), 0 != o.data.wxUser.role && a.request(t.mine.inviteShare.generatePromotionImg, {
                uid: o.data.wxUser.id,
                mcode: o.data.wxUser.mcode,
                pid: s,
                appid: i.globalData.app_id
            }, function(a) {
                var t = a.data;
                0 == t.code && wx.downloadFile({
                    url: t.imgPath,
                    success: function(a) {
                        if (200 == a.statusCode) {
                            var t = a.tempFilePath;
                            wx.saveImageToPhotosAlbum({
                                filePath: t,
                                success: function(a) {},
                                fail: function() {}
                            });
                        }
                    }
                });
            });
        }
    },
    findDelete: function(e) {
        var s = e.target.dataset.findindex, d = o.data.list;
        wx.showModal({
            title: "系统提示",
            content: "确认删除吗？",
            showCancel: !0,
            success: function(e) {
                e.confirm && (a.request(t.find.index.findDelete, {
                    uid: o.data.wxUser.id,
                    findId: d[s].id
                }, function(a) {
                    var t = a.data;
                    0 == t.code ? wx.showToast({
                        title: "删除成功"
                    }) : wx.showToast({
                        title: t.msg,
                        image: i.globalData.errorImg
                    });
                }), d.splice(s, 1), o.setData({
                    list: d
                }));
            }
        });
    },
    getData: function() {
        var e = o.data.tabChecked, s = o.data.filterChecked;
        switch (e) {
          case 1:
            switch (s) {
              case 1:
                wx.showLoading({
                    title: "数据加载中···",
                    mask: !0
                }), a.request(t.find.index.getDKGoodsStoreByType, {
                    type: 5,
                    role: o.data.wxUser.role,
                    uid: o.data.wxUser.id,
                    pageNum: o.data.pageNum
                }, function(a) {
                    var t = a.data, e = o.data.pageNum + 1;
                    if (0 == t.code) {
                        var s = t.storeGoodsList;
                        s.forEach(function(a) {
                            if (a.banners) {
                                var t = [];
                                a.banners.forEach(function(a) {
                                    t.push(a.img);
                                }), a.findImgs = t;
                            }
                        });
                        var d = o.data.list.concat(s);
                        s.length <= 0 ? (o.setData({
                            reach: !1
                        }), wx.hideLoading()) : (o.setData({
                            list: d,
                            pageNum: e
                        }), wx.hideLoading());
                    } else wx.showToast({
                        title: t.msg,
                        image: i.globalData.errorImg
                    });
                }, function(a) {
                    wx.showToast({
                        title: "未获取商品推荐",
                        image: i.globalData.errorImg
                    });
                });
                break;

              case 2:
                wx.showLoading({
                    title: "数据加载中···",
                    mask: !0
                }), a.request(t.find.index.getFinds, {
                    type: 2,
                    role: o.data.wxUser.role,
                    uid: o.data.wxUser.id,
                    pageNum: o.data.pageNum
                }, function(a) {
                    var t = a.data, e = o.data.pageNum + 1;
                    if (0 == t.code) {
                        var s = t.data;
                        s.forEach(function(a) {
                            var t = [];
                            a.urls.split(",").forEach(function(a) {
                                t.push(o.data.imgHostUpload + a);
                            }), a.findImgs = t, a.desc = a.text;
                        });
                        var d = o.data.list.concat(s);
                        s.length <= 0 ? (o.setData({
                            reach: !1
                        }), wx.hideLoading()) : (o.setData({
                            list: d,
                            pageNum: e
                        }), wx.hideLoading());
                    } else wx.showToast({
                        title: t.msg,
                        image: i.globalData.errorImg
                    });
                }, function(a) {
                    wx.showToast({
                        title: "未获取原创",
                        image: i.globalData.errorImg
                    });
                });
                break;

              case 3:
                wx.showLoading({
                    title: "数据加载中···",
                    mask: !0
                }), a.request(t.find.index.downRank, {
                    role: o.data.wxUser.role,
                    pageNum: o.data.pageNum
                }, function(a) {
                    var t = a.data, e = o.data.pageNum + 1;
                    if (0 == t.code) {
                        var s = t.data;
                        s.forEach(function(a) {
                            var t = [];
                            a.banners && (a.banners.forEach(function(a) {
                                t.push(a.img);
                            }), a.findImgs = t);
                            var e = a.goodsMap;
                            a = Object.assign(a, e);
                        });
                        var d = o.data.list.concat(s);
                        s.length <= 0 ? (o.setData({
                            reach: !1
                        }), wx.hideLoading()) : (o.setData({
                            list: d,
                            pageNum: e
                        }), wx.hideLoading());
                    } else wx.showToast({
                        title: t.msg,
                        image: i.globalData.errorImg
                    });
                }, function(a) {
                    wx.showToast({
                        title: "未获取原创",
                        image: i.globalData.errorImg
                    });
                });
                break;

              case 4:
                wx.showLoading({
                    title: "数据加载中···",
                    mask: !0
                }), a.request(t.find.index.getDKSharePicByType, {
                    type: 1,
                    pageNum: o.data.pageNum
                }, function(a) {
                    var t = a.data, e = o.data.pageNum + 1;
                    if (0 == t.code) {
                        var s = t.storeGoodsList;
                        s.forEach(function(a) {
                            if (a.description.custom) {
                                var t = [];
                                a.description.custom.forEach(function(a) {
                                    t.push(a);
                                }), a.findImgs = t;
                            }
                        });
                        var d = o.data.list.concat(s);
                        s.length <= 0 ? (o.setData({
                            reach: !1
                        }), wx.hideLoading()) : (o.setData({
                            list: d,
                            pageNum: e
                        }), wx.hideLoading());
                    } else wx.showToast({
                        title: t.msg,
                        image: i.globalData.errorImg
                    });
                }, function(a) {
                    wx.showToast({
                        title: "未获取官方",
                        image: i.globalData.errorImg
                    });
                });
                break;

              case 5:
                wx.showLoading({
                    title: "数据加载中···",
                    mask: !0
                }), a.request(t.find.index.getDKSharePicByType, {
                    type: 2,
                    pageNum: o.data.pageNum
                }, function(a) {
                    var t = a.data, e = o.data.pageNum + 1;
                    if (0 == t.code) {
                        var s = t.storeGoodsList;
                        s.forEach(function(a) {
                            if (a.description.custom) {
                                var t = [];
                                a.description.custom.forEach(function(a) {
                                    t.push(a);
                                }), a.findImgs = t;
                            }
                        });
                        var d = o.data.list.concat(s);
                        s.length <= 0 ? (o.setData({
                            reach: !1
                        }), wx.hideLoading()) : (o.setData({
                            list: d,
                            pageNum: e
                        }), wx.hideLoading());
                    } else wx.showToast({
                        title: t.msg,
                        image: i.globalData.errorImg
                    });
                }, function(a) {
                    wx.showToast({
                        title: "未获取新手",
                        image: i.globalData.errorImg
                    });
                });
            }
            break;

          case 2:
            a.request(t.find.index.getFinds, {
                type: 1,
                role: o.data.wxUser.role,
                uid: o.data.wxUser.id,
                pageNum: o.data.pageNum
            }, function(a) {
                var t = a.data, e = o.data.pageNum + 1;
                if (0 == t.code) {
                    var s = t.data;
                    s.forEach(function(a) {
                        var t = [];
                        a.urls.split(",").forEach(function(a) {
                            t.push(o.data.imgHostUpload + a);
                        }), a.findImgs = t, a.desc = a.text;
                    });
                    var d = o.data.list.concat(s);
                    s.length <= 0 ? (o.setData({
                        reach: !1
                    }), wx.hideLoading()) : (o.setData({
                        list: d,
                        pageNum: e
                    }), wx.hideLoading());
                } else wx.showToast({
                    title: t.msg,
                    image: i.globalData.errorImg
                });
            }, function(a) {
                wx.showToast({
                    title: "未获取我的",
                    image: i.globalData.errorImg
                });
            });
        }
    },
    onPullDownRefresh: function() {
        wx.reLaunch({
            url: "/pages/main/find/find"
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        o.data.reach && o.getData();
    },
    getShareText: function() {
        a.request(t.home.index.getShareText, {
            type: 1
        }, function(a) {
            var t = a.data;
            0 == t.code ? o.setData({
                shareText: t.content
            }) : wx.showToast({
                title: t.msg,
                image: i.globalData.errorImg
            });
        });
    },
    onShareAppMessage: function(t) {
        o.setData({
            hidePage: !1
        });
        var e = o.data.wxUser.pid;
        if (e && "undefined" != e || (e = o.data.wxUser.bind_pid) && "undefined" != e || (e = i.globalData.default_pid), 
        t.target) {
            var s = t.target.dataset.item, d = "【拼多多】优惠券" + String(s.coupon_discount) + "元\n原价￥" + s.min_group_price + "  券后价￥" + s.quanhoujia;
            return a.shareGoodsCount(s.goods_id), {
                title: d,
                path: "/pages/main/goodsDetails/goodsDetails?goods_id=" + s.goods_id + "&pid=" + e + "&goFlag=" + !0,
                imageUrl: s.goods_image_url
            };
        }
        return {
            title: o.data.shareText.desc,
            path: "/pages/main/home/home?pid=" + e,
            imageUrl: o.data.shareText.imgUrl
        };
    },
    drawImage: function(a) {
        n.clearRect(0, 0, 750 * s, 1334 * s), n.drawImage(a.shareBj, 0, 0, 750 * s, 1334 * s), 
        n.drawImage(a.goodsImg, 0, 0, 750 * s, 820 * s), n.setFontSize(32 * s), n.setFillStyle("#000"), 
        n.setTextAlign("left");
        var t = [];
        if (n.measureText(a.goodsInfo.goods_name).width > 300) {
            var i = "", d = "";
            a.goodsInfo.goods_name.split("").map(function(a) {
                n.measureText(i).width <= 270 ? i += a : d += a;
            }), t.push(i), t.push(d);
        } else t.push(a.goodsInfo.goods_name);
        t.forEach(function(a, t) {
            0 == t ? n.fillText(a, 160 * s, 884 * s, 700 * s) : n.fillText(a, 30 * s, 934 * s, 700 * s);
        }), n.setFontSize(38 * s), n.setFillStyle("#fd4f42"), n.setTextAlign("center"), 
        n.fillText("￥" + a.goodsInfo.quanhoujia, 658 * s, 1045 * s), n.setFontSize(32 * s), 
        n.setFillStyle("#808080"), n.setTextAlign("center"), n.fillText("￥" + a.goodsInfo.min_group_price, 90 * s, 1045 * s), 
        n.setFontSize(30 * s), n.setFillStyle("#cfaa71"), n.setTextAlign("center"), n.fillText(a.goodsInfo.coupon_discount, 394 * s, 1042 * s), 
        e.api.draw(a.goodsInfo.short_url, n, Math.floor(170 * s), Math.floor(170 * s), Math.floor(540 * s), Math.floor(1126 * s)), 
        n.drawImage("../../../img/share-bg-2-logo.png", 606 * s, 1188 * s, 40 * s, 40 * s), 
        n.draw(!1, function() {
            setTimeout(function() {
                o.downloadCanvas();
            }, 1e3);
        });
    },
    downloadCanvas: function() {
        wx.canvasToTempFilePath({
            fileType: "jpg",
            canvasId: "share",
            success: function(a) {
                var t = a.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(a) {
                        wx.showToast({
                            title: "图片保存成功"
                        }), setTimeout(function() {
                            wx.hideLoading(), wx.previewImage({
                                urls: [ t ]
                            });
                        }, 1e3);
                    },
                    fail: function() {
                        wx.showToast({
                            title: "图片保存失败",
                            image: i.globalData.errorImg
                        });
                    }
                });
            }
        });
    }
});