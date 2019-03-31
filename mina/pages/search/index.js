//index.js
//获取应用实例
var app = getApp();
Page({
    getQrcode(){
        var access_token = '20_MbMtOzeDs4tAA0_g3XMk3405RqH7j7-OCjamhogrHSlkCCG4TCYIhEMymXw9VtMiKww6LtOC_CQ6DNkqZ-LBl6TRZUzcUQQSkCNiMlUvKIjqb98FnY-Ocs_bvvRnWOCzm9T0_okG9VZKfSVtSEGjAJAIUW'
        wx.request({
            url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + access_token
            data: {
                page: "pages/index/index",
                scene: 'abc&ddd',
                width: 300
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method:  'POST',
            dataType: 'json',
            success: function(res){
                var qrcodeUrl=res.data;//服务器小程序码地址
                console.log(qrcodeUrl)
            },
        })
    },
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false, // loading
        swiperCurrent: 0,
        categories: [],
        activeCategoryId: 0,
        goods: [],
        scrollTop: "0",
        loadingMoreHidden: true,
        searchInput: '',
        p:1,
        processing:false
    },
    onLoad: function (options) {
        getQrcode()

        // app.pre_load(this);
        // wx.setNavigationBarTitle({
        //     title: app.globalData.shopName
        // });
        // this.getFoodList();
    },
    //解决切换不刷新维内托，每次展示都会调用这个方法
    onShow:function(){
        this.getBannerAndCat();
    },
    scroll: function (e) {
        var that = this, scrollTop = that.data.scrollTop;
        that.setData({
            scrollTop: e.detail.scrollTop
        });
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
    toSearch:function( e ){
        this.setData({
            p:1,
            goods:[],
            loadingMoreHidden:true
        });
        this.getFoodList();
	},
    tapBanner: function (e) {
        if (e.currentTarget.dataset.id != 0) {
            wx.navigateTo({
                url: "/pages/food/info?id=" + e.currentTarget.dataset.id
            });
        }
    },
    toDetailsTap: function (e) {
        wx.navigateTo({
            url: "/pages/food/info?id=" + e.currentTarget.dataset.id
        });
    },
    getBannerAndCat: function () {
        var that = this;
        wx.request({
            url:app.buildUrl("/food/index"),
            header: app.getRequestHeader(),
            success: function (res) {
                var resp = res.data
                if(resp.code != 200){
                    app.alert({"content": resp.msg})
                    return
                }
                that.setData({
                    banners: resp.data.banner_list,
                    categories: resp.data.cat_list,

                });
            }
        })
    },
    catClick: function (e) {
        this.setData({
            activeCategoryId: e.currentTarget.id
        });
        this.setData({
            loadingMoreHidden: true,
            p:1,
            goods:[]
        });
        this.getFoodList();
    },
    onReachBottom: function () {
        var that = this;
        setTimeout(function () {
            that.getFoodList();
        }, 500);
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
            url: app.buildUrl("/food/search"),
            header: app.getRequestHeader(),
            data: {
                cat_id: that.data.activeCategoryId,
                mix_kw: that.data.searchInput,
                p: that.data.p,
            },
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }

                var goods = resp.data.list;
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
