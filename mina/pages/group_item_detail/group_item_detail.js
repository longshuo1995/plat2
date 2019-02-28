// pages/group_item_detail/group_item_detail.js
var lay_load = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res_data:[],
    level:null,
    noMore: true,
    show_model: true,
    pages: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this;
    let level = options.level;
    wx.request({
      url: app.globalData.domain + '/pages/group_item_detail', // 仅为示例，并非真实的接口地址
      data: {
        open_id: "test",
        level_id: level,
        pages: that.data.pages
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        that.setData({
          res_data: res.data.data,
          level: level
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
    console.log(that.data.level)
    that.setData({
      show_model: false
    })
    let time = null
    if (lay_load) {
      lay_load = false
      wx.request({
        url: "http://localhost:8000/pages/group_item_detail",
        data: {
          open_id: "",
          level_id: that.data.level,
          pages: that.data.pages+1
        },
        success: function (res) {
          console.log(res.data.data)
          if (res.data.code == 200) {
            if (res.data.data.length < 10) {
              clearTimeout(time)
              that.setData({
                res_data: that.data.res_data.concat(res.data.data),
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
                res_data: that.data.res_data.concat(res.data.data),
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
  selectTab:function(e){
    let level = e.currentTarget.dataset.level;
    let that = this;
    wx.request({
      url: 'http://localhost:8000/pages/group_item_detail', // 仅为示例，并非真实的接口地址
      data: {
        open_id: "",
        level_id: level,
        pages: 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        this.setData({
          res_data: res.data.data,
          nowTab: level,
          pages:0
        })
      }
    })
  }
})