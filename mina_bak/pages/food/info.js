//index.js
//获取应用实例
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var utils = require('../../utils/util.js');

Page({
    data: {
        autoplay: true,
        interval: 3000,
        duration: 1000,
        swiperCurrent: 0,
        hideShopPopup: true,
        buyNumber: 1,
        buyNumMin: 1,
        buyNumMax: 1,
        canSubmit: false, //  选中时候是否允许加入购物车
        shopCarInfo: {},
        shopType: "addShopCar",//购物类型，加入购物车或立即购买，默认为加入购物车,
        id: 0,
        shopCarNum: 4,
        commentCount:2,
        info: {
            'pics': [
                'https://t00img.yangkeduo.com/goods/images/2018-11-30/7c9f78d0dc92c980203d36a0a81339ec.jpeg',
                'https://t00img.yangkeduo.com/goods/images/2018-11-24/fa21bbb71e5615dcda2b8f40866f6cf4.jpeg'
            ],
            'name': '多功能衣架收纳神器折叠衣架子阳台挂衣架家用晾衣架抖音魔术衣撑',
            'price': 11,
            'row_price': 10,
            'promotion_rate': 20,
            'short_url': 'www.baidu.com',
            'goods_desc': '【收藏商品优先发货,优先发货,优先发货,重要的事情说三遍】【厂家直销没有中间商赚差价】【拒绝假实惠,质量保证,七天无理由退换】【48小时内发货】【产品如有瑕疵,请直接联系客服,我们给您最完美的解决】'
        }
    },
    onShareAppMessage: function(){
        var path = '/pages/food/info?id=' + e.id + '&from_openid=' + app.globalData.userInfo.open_id;
        console.log(path);
        return {
            title: "自购省钱，推广赚钱",
            path: '/pages/food/info?id=' + e.id + '&from_openid=' + app.globalData.userInfo.open_id,
            success: function (res) {
            },
            fail: function (res) {
            },
        }
    },
    onLoad: function (e) {
        // that.setData({
        //     id: e.id
        // });
        if(options.from_openid){
            app.globalData.refer_openid = options.from_openid
        }
        var that = this;
        var cache_path = '/pages/food/info?id=' + e.id;
        app.globalData.cache = cache_path;
        app.pre_load();
        wx.request({
            url: app.buildUrl("/good/get_pdd_url"),
            header: app.getRequestHeader(),
            data:{
                good_id: e.id,
                open_id: app.globalData.userInfo.open_id,
            },
            success: function (res) {
                var resp = res.data;
                console.log(resp);
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }
                var rate = 0.5
                if(app.globalData.userInfo.level > 0){
                    rate = 1
                }

                var dt = resp.data;
                dt['promotion_rate'] = (dt['promotion_rate'] * rate).toFixed(2);
                dt['percent_rate'] = dt['promotion_rate'] * 100;
                dt['promotion'] = (dt['price'] * dt['promotion_rate']).toFixed(2);
                dt['price'] = (dt['price']).toFixed(2)
                dt['row_price'] = (dt['row_price']).toFixed(2)
                that.setData({
                    info: dt
                })
            }
        });


    },
    onShow:function(){
        // this.getInfo();
        // this.getComments();
    },
    goShopCar: function () {
        wx.reLaunch({
            url: "/pages/cart/index"
        });
    },
    toAddShopCar: function () {
        this.setData({
            shopType: "addShopCar"
        });
        this.bindGuiGeTap();
    },
    tobuy: function () {
        this.setData({
            shopType: "tobuy"
        });
        this.bindGuiGeTap();
    },
    addShopCar: function () {
        var that = this;
        var data = {
            "id": this.data.info.id,
            "number": this.data.buyNumber
        };
        wx.request({
            url: app.buildUrl("/cart/set"),
            header: app.getRequestHeader(),
            method: 'POST',
            data: data,
            success: function (res) {
                var resp = res.data;
                app.alert({"content": resp.msg});
                that.setData({
                    hideShopPopup: true
                });
            }
        });
    },
    // 复制剪贴板
    copy: function () {
      let datas = `${this.data.info.name}\n价格：${this.data.info.row_price}元，券后价：${this.data.info.row_price}元,商品链接：${this.data.info.short_url}`

      wx.setClipboardData({
        data: datas,
        success(res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功~  快去分享给小伙伴吧'
              })
            }
          })
        }
      })
    },
    buyNow: function () {
        wx.navigateToMiniProgram({
            appId: 'wx32540bd863b27570',
            path: this.data.info.pdd_url,
            extraData: {
                foo: 'bar'
            },
            envVersion: 'release',
            success(res) {
                // 打开成功
                //   app.goToIndex()
            }
        })
    },
    /**
     * 规格选择弹出框
     */
    bindGuiGeTap: function () {
        this.setData({
            hideShopPopup: false
        });
    },
    /**
     * 规格选择弹出框隐藏
     */
    closePopupTap: function () {
        this.setData({
            hideShopPopup: true
        })
    },
    numJianTap: function () {
        if (this.data.buyNumber <= this.data.buyNumMin) {
            return;
        }
        var currentNum = this.data.buyNumber;
        currentNum--;
        this.setData({
            buyNumber: currentNum
        });
    },
    numJiaTap: function () {
        if (this.data.buyNumber >= this.data.buyNumMax) {
            return;
        }
        var currentNum = this.data.buyNumber;
        currentNum++;
        this.setData({
            buyNumber: currentNum
        });
    },
    //事件处理函数
    swiperchange: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    getInfo: function () {
        var that = this;
        wx.request({
            url: app.buildUrl("/food/info"),
            header: app.getRequestHeader(),
            data: {
                id: that.data.id
            },
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    wx.navigateTo({
                        url: "/pages/food/index"
                    });
                    return;
                }

                that.setData({
                    info: resp.data.info,
                    buyNumMax: resp.data.info.stock,
                    shopCarNum:resp.data.cart_number
                });

                WxParse.wxParse('article', 'html', resp.data.info.summary, that, 5);
            }
        });
    },
    getComments:function(){
        var that = this;
        wx.request({
            url: app.buildUrl("/food/comments"),
            header: app.getRequestHeader(),
            data: {
                id: that.data.id
            },
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }

                that.setData({
                    commentList: resp.data.list,
                    commentCount: resp.data.count,
                });
            }
        });
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title: that.data.info.name,
            path: '/pages/food/info?id=' + that.data.info.id,
            success: function (res) {
                // 转发成功
                wx.request({
                    url: app.buildUrl("/member/share"),
                    header: app.getRequestHeader(),
                    method: 'POST',
                    data: {
                        url: utils.getCurrentPageUrlWithArgs()
                    },
                    success: function (res) {

                    }
                });
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
});
