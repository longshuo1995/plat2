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
        info: {},
      mall: {},
      reviews: [],
      goods_id: ''
    },
    onShareAppMessage: function(){
        var path = '/pages/food/info?id=' + e.id + '&from_openid=' + app.globalData.userInfo.open_id;
        return {
            title: "自购省钱，推广赚钱",
            path: '/pages/food/info?id=' + e.id + '&from_openid=' + app.globalData.userInfo.open_id,
            success: function (res) {
            },
            fail: function (res) {
            },
        }
    },
  onLoad: function (options) {
    if (options.from_openid){
      app.globalData.refer_openid = options.from_openid
    }
    var that = this;
    var cache_path = '/pages/food/info?id=' + options.id;
    
    app.globalData.cache = cache_path;
    // 暂时注释
    // app.pre_load();
    that.setData({
      goods_id: options.id
    })
    that.getReviews(options.id)
        wx.request({
          url: app.buildUrl("/good/get_good_detail"),
            header: app.getRequestHeader(),
            data:{
              goods_id: options.id,
              open_id: app.globalData.userInfo.open_id,
            },
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }
                var rate = 0.5
                if(app.globalData.userInfo.level > 0){
                    rate = 1
                }
              var mall_id = resp.data.mall_id
              wx.request({
                url: 'https://api.pinduoduo.com/mall/' + mall_id+'/info?check_merchant_score=yes',
                header: app.getRequestHeader(),
                success: function (res) {
                  if (res.statusCode != 200) {
                    app.alert({ "content": res.errMsg });
                    return;
                  } 
                  var response = res.data
                  if (response.dsr) {
                    response.dsr.desc_rating = null
                    response.dsr.service_rating = null
                    response.dsr.logistics_rating = null
                    var mall_rating_text_list = response.dsr.mall_rating_text_list
                    mall_rating_text_list.forEach(item => {
                      if(item.mall_rating_key.txt == '描述相符'){
                        response.dsr.desc_rating = item.mall_rating_value.txt
                      } else if (item.mall_rating_key.txt == '服务态度') {
                        response.dsr.service_rating = item.mall_rating_value.txt
                      } else if (item.mall_rating_key.txt == '物流服务') {
                        response.dsr.logistics_rating = item.mall_rating_value.txt
                      }
                    })
                  }
                  that.setData({
                    mall: response
                  })
                }
              });
                var dt = resp.data;
                dt['min_price'] = (dt['min_price']/100).toFixed(2)
                dt['row_price'] = (dt['row_price']/100).toFixed(2)
              dt['coupon_discount'] = (dt['coupon_discount']/100).toFixed(2)
              dt['promotion'] = (dt['min_price'] * dt['promotion_rate'] * rate / 1000).toFixed(2)
              dt['shareprice'] = (dt['promotion']*0.5).toFixed(2)
                that.setData({
                    info: dt
                })

            }
        });


    },
    getReviews:function(id) {
      var that = this
      wx.request({
        url: 'https://mobile.yangkeduo.com/proxy/api/reviews/' + id+'/list?page=1&size=10&enable_video=0',
        header: app.getRequestHeader(),
        success: function (res) {
          if (res.statusCode != 200) {
            app.alert({ "content": res.errMsg });
            return;
          }
          var reviews = res.data.data
          var avatar = reviews[0].avatar
          var name = reviews[0].name
          var time = reviews[0].time
          var comment = reviews[0].comment
          var specs = JSON.parse(reviews[0].specs)
          var text = specs[0].spec_key + ":  " + specs[0].spec_value
          
          that.setData({
            reviews: [{
              avatar,
              name,
              time,
              comment,
              text
            }]
          })
        }
      });
    },
    onShow:function(){
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
                  app.goToIndex()
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
