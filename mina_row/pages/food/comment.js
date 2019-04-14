const app = getApp();
var lay_load = true
const conf = {
  data: {
    reviews: [],
    page: 1,
    noMore: true,
    show_model: true,
    goods_id: ''
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      goods_id: options.id
    })
    wx.request({
      url: 'https://mobile.yangkeduo.com/proxy/api/reviews/' + options.id + '/list',
      data: {
        page: 1,
        size: 10,
        enable_video: 0
      },
      header: app.getRequestHeader(),
      success: function (res) {
        if (res.statusCode != 200) {
          app.alert({ "content": res.errMsg });
          return;
        }
        var reviews = res.data.data
        reviews.forEach(item => {
          var specs = JSON.parse(item.specs)
          item.text = specs[0].spec_key + ":  " + specs[0].spec_value
        })
        that.setData({
          reviews: reviews
        })
      }
    });
  },
  onReachBottom: function () {
    let that = this
    let time = null
    if (lay_load) {
      that.setData({
        show_model: false
      });
      lay_load = false
      wx.request({
        url: 'https://mobile.yangkeduo.com/proxy/api/reviews/' + that.data.goods_id + '/list',
        data: {
          page: that.data.page + 1,
          size: 10,
          enable_video: 0
        },
        success: function (res) {
          if (res.statusCode == 200) {
            clearTimeout(time)
            var reviews = res.data.data
            reviews.forEach(item => {
              var specs = JSON.parse(item.specs)
              item.text = specs[0].spec_key + ":  " + specs[0].spec_value
            })
            that.setData({
              reviews: that.data.reviews.concat(reviews),
              noMore: false,
              show_model: true,
            })
            time = setTimeout(function () {
              that.setData({
                noMore: true
              })
            }, 1000)
          }
          lay_load = true
        }
      })
    }
    else {
      console.log('还没加载完呢')
    }
  }
}
Page(conf)