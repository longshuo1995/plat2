// pages/hot_sell/hot_sell.js
var lay_load = true
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tp:0,
    team_index: 0,
    data_list:[],
    noMore: true,
    show_model: true,
    pages: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(scene){
    let that = this
    let tp = 0
    wx.request({
      url: app.globalData.domain + '/goods/hot_goods',
      data: {
        tp: 0,
        team_index: 0,
        pages:that.data.pages
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        var rate = 0.5;
        if (app.globalData.userInfo.level > 0) {
          rate = 1
        }
        var goods = res.data.data
        for (var i = 0; i < goods.length; i++) {
          goods[i]['row_price'] = (goods[i]['row_price'] / 100).toFixed(2)
          goods[i]['min_price'] = (goods[i]['min_price'] / 100).toFixed(2)
          goods[i]['coupon_discount'] = (goods[i]['row_price'] - goods[i]['min_price']).toFixed(2)
          goods[i]['promotion'] = (rate * goods[i]['promotion_rate'] / 1000 * goods[i]['min_price']).toFixed(2)
        }
        that.setData({
          data_list: goods
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  teamSelete: function (e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    that.setData({
      team_index: index,
      pages: 1
    });
    wx.request({
      url: app.globalData.domain + '/goods/hot_goods', // 仅为示例，并非真实的接口地址
      data: {
        tp: that.data.tp,
        pages: 1,
        team_index: index
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        var rate = 0.5;
        if (app.globalData.userInfo.level > 0) {
          rate = 1
        }
        var goods = res.data.data
        for (var i = 0; i < goods.length; i++) {
          goods[i]['row_price'] = (goods[i]['row_price'] / 100).toFixed(2)
          goods[i]['min_price'] = (goods[i]['min_price'] / 100).toFixed(2)
          goods[i]['coupon_discount'] = (goods[i]['row_price'] - goods[i]['min_price']).toFixed(2)
          goods[i]['promotion'] = (rate * goods[i]['promotion_rate'] / 1000 * goods[i]['min_price']).toFixed(2)
        }
        that.setData({
          data_list: goods
        })
      }
    })
  },
  toDetailsTap: function (e) {
        wx.navigateTo({
            url: "/pages/food/info?id=" + e.currentTarget.dataset.id
        });
    },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    that.setData({
      show_model: false
    });
    let time = null
    if (lay_load) {
      lay_load = false
      wx.request({
        url: app.globalData.domain + '/goods/hot_goods',
        data: {
          tp: that.data.tp,
          pages: that.data.pages+1,
          team_index: that.data.team_index
        },
        success: function (res) {
          if (res.data.code == 200) {
            var rate = 0.5;
            if (app.globalData.userInfo.level > 0) {
              rate = 1
            }
            var goods = res.data.data
            for (var i = 0; i < goods.length; i++) {
              goods[i]['row_price'] = (goods[i]['row_price'] / 100).toFixed(2)
              goods[i]['min_price'] = (goods[i]['min_price'] / 100).toFixed(2)
              goods[i]['coupon_discount'] = (goods[i]['row_price'] - goods[i]['min_price']).toFixed(2)
              goods[i]['promotion'] = (rate * goods[i]['promotion_rate'] / 1000 * goods[i]['min_price']).toFixed(2)
            }
            if (res.data.data.length < 10) {
              clearTimeout(time)
             
              
              that.setData({
                data_list: that.data.data_list.concat(goods),
                noMore: false,
                show_model: true,
              })
              time = setTimeout(function () {
                that.setData({
                  noMore: true
                })
                wx.hideLoading()
              }, 1000)
            }
            else {
              that.setData({
                data_list: that.data.data_list.concat(goods),
                pages: that.data.pages + 1
              })
            }
          }
          console.log(res)

          lay_load = true
        }
      })
    }
    else {
      console.log('还没加载完呢')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var obj = {
      title: "自购省钱，推广赚钱",
      path: '/pages/index/index?from_openid=' + app.globalData.userInfo.open_id,
      success: function (res) {
      },
      fail: function (res) {
      },
    }
    if (options.from == 'button') {
      let dataset = options.target.dataset
      let datas = `【拼多多】优惠券${dataset.coupon_discount}元\n 原价￥${dataset.row_price} 券后价￥${dataset.min_price}`

      obj.title = datas
      obj.imageUrl = dataset.img
      obj.path = '/pages/food/info?from_openid=' + app.globalData.userInfo.open_id + '&id=' + dataset.id
    }
    return obj
  },
  selectTab:function(e){
      let tp = e.currentTarget.dataset.tp;
      let that = this;
      wx.request({
        url: app.globalData.domain + '/goods/hot_goods', // 仅为示例，并非真实的接口地址
        data: {
          tp: tp,
          pages:1,
          team_index: that.data.team_index
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          var rate = 0.5;
          if (app.globalData.userInfo.level > 0) {
            rate = 1
          }
          var goods = res.data.data
          for (var i = 0; i < goods.length; i++) {
            goods[i]['row_price'] = (goods[i]['row_price'] / 100).toFixed(2)
            goods[i]['min_price'] = (goods[i]['min_price'] / 100).toFixed(2)
            goods[i]['coupon_discount'] = (goods[i]['row_price'] - goods[i]['min_price']).toFixed(2)
            goods[i]['promotion'] = (rate * goods[i]['promotion_rate'] / 1000 * goods[i]['min_price']).toFixed(2)
          }
          that.setData({
            data_list: goods,
            pages:1,
            tp:tp
          })
        }
      })
  } 
})