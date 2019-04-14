// pages/hot_sell/hot_sell.js
var lay_load = true
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tp:0,
    data_list:[],
    noMore: true,
    show_model: true,
    pages: 1,
    team_index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    app.pre_load()
    let that = this
    wx.request({
      url: app.globalData.domain+'/member/hot_member',
      data: {
        team_index: 0,
        tp: 0,
        pages:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        that.setData({
          data_list: res.data.data,
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
    })
    let time = null
    if (lay_load) {
      lay_load = false
      wx.request({
        url: app.globalData.domain+'/member/hot_member', // 仅为示例，并非真实的接口地址
        data: {
          tp: that.data.tp,
          pages: that.data.pages+1,
          team_index: that.data.team_index
        },
        success: function (res) {
          console.log(res.data.data)
          if (res.data.code == 200) {
            if (res.data.data.length < 10) {
              clearTimeout(time)
              that.setData({
                data_list: that.data.data_list.concat(res.data.data),
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
                data_list: that.data.data_list.concat(res.data.data),
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
  onShareAppMessage: function () {
  
  },
  update_data: function (pages) {
      let that = this;
      wx.request({
        url: app.globalData.domain+'/member/hot_member',
        data: {
          tp: that.data.tp,
          pages:pages,
          team_index: that.data.team_index
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          that.setData({
            data_list: res.data.data,
          })
        }
      })
  },
  selectTab:function(e){
      let tp = e.currentTarget.dataset.tp;
      this.setData({
          tp: tp,
          pages: 1
      })
      this.update_data(1)



  },
  teamSelete:function(e){
    let index = e.currentTarget.dataset.index;
    let that = this;
    that.setData({
      team_index: index,
      pages: 1
    });
    this.update_data(1)
  }
});