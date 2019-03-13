// pages/my/partner.js
var lay_load = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_list:["我的领导","分组A","分组B","我的客长"],
    groupType:0,
    user_list:[
      {
        user_img:"../../images/food.jpg",
        user_name:"无底洞",
        user_number:"2085963",
        user_nickname:"耍帅歌"
      }, {
        user_img: "../../images/food.jpg",
        user_name: "无底洞",
        user_number: "2085963",
        user_nickname: "耍帅歌"
      }
      , {
        user_img: "../../images/food.jpg",
        user_name: "无底洞",
        user_number: "2085963",
        user_nickname: "耍帅歌"
      }
      , {
        user_img: "../../images/food.jpg",
        user_name: "无底洞",
        user_number: "2085963",
        user_nickname: "耍帅歌"
      }
      , {
        user_img: "../../images/food.jpg",
        user_name: "无底洞",
        user_number: "2085963",
        user_nickname: "耍帅歌"
      }
      , {
        user_img: "../../images/food.jpg",
        user_name: "无底洞",
        user_number: "2085963",
        user_nickname: "耍帅歌"
      }
    ],
    noMore: true,
    show_model: true,
    pages: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      // wx.request({
      //   url: 'http://140.143.163.73:8811/api/goods/hot_goods',
      //   data: {
      //     tp: that.data.tp,
      //     pages: that.data.pages + 1
      //   },
      //   success: function (res) {
      //     console.log(res.data.data)
      //     if (res.data.code == 200) {
      //       if (res.data.data.length < 10) {
      //         clearTimeout(time)
      //         that.setData({
      //           data_list: that.data.data_list.concat(res.data.data),
      //           noMore: false,
      //           show_model: true,
      //         })
      //         time = setTimeout(function () {
      //           that.setData({
      //             noMore: true
      //           })
      //           wx.hideLoading()
      //         }, 1000)
      //       }
      //       else {
      //         that.setData({
      //           data_list: that.data.data_list.concat(res.data.data),
      //           pages: that.data.pages + 1
      //         })
      //       }
      //     }
      //     console.log(res)

      //     lay_load = true
      //   }
      // })
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
  groupStatusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.setData({
      groupType: curType
    });
  },
})