const app = getApp();
const conf = {
  data: {
    searchInput: '',
    hotlist: [],
    sercherStorage: [],
    tp: 0,
    goods: [],
    p: 1,
    processing: false,
    noMore: true,
    show_model: true,
    imageurl1: 'https://aishangnet.club/static/mina_pic/paixu_3.png',
    imageurl2: 'https://aishangnet.club/static/mina_pic/paixu_3.png',
    datatp1: 3,
    datatp2: 5,
    isShow: false
  },
  onLoad: function (options) {
    this.setData({
      isShow: false
    })
    this.openLocationsercher();
    this.getHotlist()
  },
  selectTab: function (e) {
    let tp = e.currentTarget.dataset.tp;
    let that = this;
    that.setData({
      imageurl1: "https://aishangnet.club/static/mina_pic/paixu_3.png",
      imageurl2: "https://aishangnet.club/static/mina_pic/paixu_3.png",
      tp: tp,
      p: 1,
      goods: []
    })
    that.toSearch()
  },
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/food/info?id=" + e.currentTarget.dataset.id
    });
  },
  selectSort: function (e) {
    let id = e.currentTarget.id; // 0 价格 1 销量
    let tp = e.currentTarget.dataset.tp;
    let that = this;
    that.setData({
      goods: []
    })
    if (id == 0) {
      if (that.data.datatp1 == 3) {
        that.setData({
          imageurl1: "https://aishangnet.club/static/mina_pic/paixu_2.png",
          imageurl2: "https://aishangnet.club/static/mina_pic/paixu_3.png",
          datatp1: 4,
          tp: 4,
          p: 1
        })
      } else {
        that.setData({
          imageurl1: "https://aishangnet.club/static/mina_pic/paixu_1.png",
          imageurl2: "https://aishangnet.club/static/mina_pic/paixu_3.png",
          datatp1: 3,
          tp: 3,
          p: 1
        })
      }
    } else {
      if (that.data.datatp2 == 5) {
        that.setData({
          imageurl1: 'https://aishangnet.club/static/mina_pic/paixu_3.png',
          imageurl2: "https://aishangnet.club/static/mina_pic/paixu_2.png",
          datatp2: 6,
          tp: 6,
          p: 1
        })
      } else {
        that.setData({
          imageurl1: 'https://aishangnet.club/static/mina_pic/paixu_3.png',
          imageurl2: "https://aishangnet.club/static/mina_pic/paixu_1.png",
          datatp2: 5,
          tp: 5,
          p: 1
        })
      }
    }
    that.toSearch()
  },
  listenerSearchInput(e){
    let value = e.detail.value
    this.setData({
      searchInput: value
    });
  },
  clearInput: function () {
    this.setData({
      searchInput: "",
      isShow: false,
      goods: [],
      p: 1,
      tp: 0
    })
  },
  // 获取热门关键词
  getHotlist: function() {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/good/hot_key',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        let hotlist = res.data.data
        that.setData({
          hotlist: hotlist
        })
      }
    })
  },
  //添加搜索记录并搜索
  setSearchStorage: function () {
    var that = this;
    if (that.data.searchInput != '') {
      //将搜索记录更新到缓存
      var searchData = that.data.sercherStorage;
      for (var j = 0; j < searchData.length; j++) {
        if (searchData[j] == that.data.searchInput) {
          searchData.splice(j, 1)
        }
      }
      //将搜索值放入历史记录中,只能放前6条
      if (searchData.length < 6) {
        searchData.unshift(that.data.searchInput)
      }
      else {
        searchData.pop()//删掉旧的时间最早的第一条
        searchData.unshift(that.data.searchInput)
      }
      wx.setStorageSync('searchData', searchData);
      that.setData({ sercherStorage: searchData, goods: [] })
      //请求搜索
      that.toSearch()
    }
  },
  //清除缓存历史
  clearSearchStorage: function () {
    wx.removeStorageSync('searchData')
    this.setData({
      sercherStorage: []
    })
  },
  //打开历史记录列表
  openLocationsercher: function () {
    this.setData({
      sercherStorage: wx.getStorageSync('searchData') || []
    })
  },
  //点击缓存搜索列表
  tapSercherStorage: function (e) {
    var that = this;
    var item = e.currentTarget.id;
    for (var j = 0; j < that.data.sercherStorage.length; j++) {
      if (that.data.sercherStorage[j] == item) {
        this.setData({
          searchInput: item,
          goods: []
        })
      }
    }
    if (this.data.searchInput != '') {
      //请求搜索记录
      that.toSearch()
    }
  },
  tapChoose: function (e) {
    var that = this;
    var item = e.currentTarget.id;
    this.setData({
      searchInput: item,
      goods: []
    })
    that.toSearch()
  },
  onReachBottom: function () {
    var that = this;
    if (that.data.processing) {
      return;
    }
    that.setData({
      p: that.data.p + 1,
      show_model: false
    })
    that.toSearch()
  },
  toSearch:function(e) {
    var that = this
    this.setData({
      isShow: true
    })
    if (that.data.processing) {
      return;
    }
    that.setData({
      processing: true
    });
    wx.request({
      url: app.buildUrl("/good/search"),
      header: app.getRequestHeader(),
      data: {
        opt_id: 0,
        mix_kw: that.data.searchInput,
        page: that.data.p,
        sort_type: that.data.tp
      },
      success: function (res) {
        var resp = res.data;
        if (resp.code != 200) {
          app.alert({ "content": resp.msg });
          return;
        }

        var goods = resp.data.list;
        var rate = 0.5;
        if (app.globalData.userInfo.level > 0) {
          rate = 1
        }
        for (var i = 0; i < goods.length; i++) {
          goods[i]['row_price'] = (goods[i]['row_price'] / 100).toFixed(2)
          goods[i]['coupon_discount'] = (goods[i]['coupon_discount'] / 100).toFixed(2)
          goods[i]['min_price'] = (goods[i]['min_price'] / 100).toFixed(2)
          goods[i]['promotion'] = (rate * goods[i]['promotion_rate'] / 1000 * goods[i]['min_price']).toFixed(2)
        }
        that.setData({
          goods: that.data.goods.concat(goods),
          p: that.data.p + 1,
          processing: false,
          show_model: true
        });

        if (resp.data.has_more == 0) {
          that.setData({
            noMore: false
          });
        }
      }
    });
  }
}
Page(conf)