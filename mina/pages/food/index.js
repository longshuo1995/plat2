//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false, // loading
        swiperCurrent: 0,
        categories: [],
        childlist: [],
        banners: [],
        activeCategoryId: 0,
        goods: [],
        scrollTop: "0",
        loadingMoreHidden: true,
        searchInput: '',
        p:1,
        processing:false,
        rate: app.globalData.promotion_rate,
        tp:0,
      imageurl1: 'https://aishangnet.club/static/mina_pic/paixu_3.png',
      imageurl2: 'https://aishangnet.club/static/mina_pic/paixu_3.png',
      datatp1: 3,
      datatp2: 5,
      is_open: false,
      markList: [],
      currentid: 0
    },
    onShareAppMessage: function (options){
      var obj ={
          title: "自购省钱，推广赚钱",
          path: '/pages/index/index?from_openid=' + app.globalData.userInfo.open_id,
          success: function (res) {
          },
          fail: function (res) {
          },
      }
      if (options.from =='button') {
        let dataset = options.target.dataset
        let datas = `【拼多多】优惠券${dataset.coupon_discount}元\n 原价￥${dataset.row_price} 券后价￥${dataset.min_price}`

        obj.title = datas
        obj.imageUrl = dataset.img
        obj.path = '/pages/food/info?from_openid=' + app.globalData.userInfo.open_id + '&id=' + dataset.id
      }
      return obj
    },
    onLoad: function (options) {
        if(options.from_openid){
            app.globalData.refer_openid = options.from_openid
        }
        app.pre_load();
        wx.setNavigationBarTitle({
            title: app.globalData.shopName
        });
        this.getFoodList();
    },
    //解决切换不刷新维内托，每次展示都会调用这个方法
    onShow:function(){
        this.getBanner();
        this.getClassList()
    },
    //事件处理函数
    swiperchange: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    listenerSearchInput:function( e ){
        this.setData({
            searchInput: e.detail.value
        });
    },
  showMenu: function(e) {
    let id = e.currentTarget.id
    if (!this.data.is_open) {
      if (id == 0) {
        this.setData({
          markList: this.data.categories
        })
      } else {
        this.setData({
          markList: this.data.childlist
        })
      }
    }
    this.setData({
      currentid: id,
      is_open: !this.data.is_open
    })
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
      that.getFoodList()
    },
    selectSort: function (e) {
      let id = e.currentTarget.id; // 0 价格 1 销量
      let tp = e.currentTarget.dataset.tp;
      let that = this;
      that.setData({
        p:1,
        goods: []
      })
      if (id == 0) {
        if (that.data.datatp1 == 3) {
          that.setData({
            imageurl1: "https://aishangnet.club/static/mina_pic/paixu_2.png",
            imageurl2: "https://aishangnet.club/static/mina_pic/paixu_3.png",
            datatp1: 4,
            tp: 4
          })
        } else {
          that.setData({
            imageurl1: "https://aishangnet.club/static/mina_pic/paixu_1.png",
            imageurl2: "https://aishangnet.club/static/mina_pic/paixu_3.png",
            datatp1: 3,
            tp: 3
          })
        }
      } else {
        if (that.data.datatp2 == 5) {
          that.setData({
            imageurl1: 'https://aishangnet.club/static/mina_pic/paixu_3.png',
            imageurl2: "https://aishangnet.club/static/mina_pic/paixu_2.png",
            datatp2: 6,
            tp: 6
          })
        } else {
          that.setData({
            imageurl1: 'https://aishangnet.club/static/mina_pic/paixu_3.png',
            imageurl2: "https://aishangnet.club/static/mina_pic/paixu_1.png",
            datatp2: 5,
            tp: 5
          })
        }
      }
      that.getFoodList()
    },
    toSearch:function( e ){
      wx.navigateTo({ url: 'search' });
	},
    tapBanner: function (e) {
        if (e.currentTarget.dataset.id != 0) {
            wx.navigateTo({
                url: "/pages/page_img/index?pic_url=" + e.currentTarget.dataset.id
            });
        }
    },
    toDetailsTap: function (e) {
        wx.navigateTo({
            url: "/pages/food/info?id=" + e.currentTarget.dataset.id
        });
    },
    getBanner: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain + '/index/get_banner',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          let banner_list = res.data.data
          that.setData({
            banners: banner_list
          })
        }
      })
    },
    catClick: function (e) {
      let id = e.currentTarget.id
      if (id === this.data.activeCategoryId) return
      let parent = e.currentTarget.dataset.parent
      if (this.data.is_open) {
        this.setData({
          is_open: false
        })
      }
      this.setData({
        activeCategoryId: id,
        loadingMoreHidden: true,
        p:1,
        goods:[]
      });
      if (parent==0) {
      this.getChildList(id)
      }
      this.getFoodList();
    },
    onReachBottom: function () {
      var that = this;
      if (that.data.processing) {
        return;
      }
      that.setData({
        p: that.data.p+1
      })
      that.getFoodList()
    },
    getChildList:function(id) {
      var that = this
      wx.request({
        url: app.globalData.domain + '/good/opt_get',
        data: {
          parent_opt_id: id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          let childlist = res.data.data
          that.setData({
            childlist: childlist
          })
        }
      })
    },
    getClassList: function() {
      var that = this
      wx.request({
        url: app.globalData.domain + '/good/opt_get',
        data: {
          parent_opt_id: 0
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          let categories = res.data.data
          categories.unshift({
            level:1,
            opt_id: 0,
            opt_name: '今日推荐',
            parent_opt_id: 0
          })
          that.setData({
            categories: categories
          })
        }
      })
    },
    getFoodList: function () {
        var that = this;
        if( that.data.processing ){
            return;
        }

        if( !that.data.loadingMoreHidden ){
            return;
        }

        that.setData({
            processing:true
        });

        wx.request({
            url: app.buildUrl("/good/search"),
            header: app.getRequestHeader(),
            data: {
              opt_id: that.data.activeCategoryId,
              mix_kw: '',
              page: that.data.p,
              sort_type: that.data.tp
            },
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }

                var goods = resp.data.list;
                var rate = 0.5;
                if(app.globalData.userInfo.level>0){
                    rate = 1
                }
                for(var i=0; i<goods.length; i++){
                  goods[i]['row_price'] = (goods[i]['row_price'] / 100).toFixed(2)
                  goods[i]['coupon_discount'] = (goods[i]['coupon_discount'] / 100).toFixed(2)
                  goods[i]['min_price'] = (goods[i]['min_price'] / 100).toFixed(2)
                  goods[i]['promotion'] = (rate * goods[i]['promotion_rate']/1000*goods[i]['min_price']).toFixed(2)
                }
                that.setData({
                    goods: that.data.goods.concat( goods ),
                    p: that.data.p + 1,
                    processing:false
                });

                if( resp.data.has_more == 0 ){
                    that.setData({
                        loadingMoreHidden: false
                    });
                }
            }
        });
    }
});
