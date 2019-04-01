// pages/my/partner.js
var lay_load = true
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_list:["我的领导","分组A","分组B","我的团长"],
    groupType:0,
    user_list:[],
    noMore: true,
    show_model: true,
    pages: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.get_data()
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
      let data = that.data.user_list
      console.log(data.length)
      if (data.length >20) {
        clearTimeout(time)
        that.setData({
          user_list: that.data.user_list,
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
          user_list: that.data.user_list.concat(data),
          pages: that.data.pages + 1
        })
      }
      lay_load = true
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
  get_data: function(){
    var that = this;
    wx.request({
        url: app.globalData.domain + '/group/member',
        header:app.getRequestHeader(),
        method:'POST',
        data: {
          open_id: app.globalData.userInfo.open_id,
          group_id: that.data.groupType,
          pages: that.data.pages
        },
        success: function (res) {
          var resp = res.data;
          if(resp.data.length>10){
            clearTimeout(time)
              that.setData({
                user_list: that.data.user_list.concat(res.data.data),
                noMore: false,
                show_model: true,
              })
              time = setTimeout(function () {
                that.setData({
                  noMore: true
                });
                wx.hideLoading()
              }, 1000)
          }else{
            that.setData({
                user_list: that.data.user_list.concat(res.data.data),
                pages: that.data.pages + 1
              })
          }

        }
    });
  },
  groupStatusTap: function (e) {
    var curType = e.currentTarget.dataset.index;

    this.setData({
      groupType: curType
    });
    this.data.user_list = [];
    this.setData({
        user_list: this.data.user_list,
        pages: 0
    })
    this.get_data()

  },
});