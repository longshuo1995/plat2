//login.js
//获取应用实例
var app = getApp();
Page({
    data: {
        remind: '加载中',
        angle: 0,
    },
    goToIndex: function () {
        wx.switchTab({
            url: app.globalData.cache,
        });
    },


    onLoad: function () {
        console.log('index ready...')
        app.pre_load();
        wx.setNavigationBarTitle({
            title: app.globalData.shopName
        });
        this.checkLogin();
    },
    onShow: function () {
    },
    onReady: function () {
        app.pre_load();
    },
    checkLogin:function(){
         var that = this;
         wx.login({
             fail:function(res){
             },
             success:function( res ){
                 if( !res.code ){
                    app.alert( { 'content':'登录失败，请再次点击~~' } );
                    return;
                 }
                 wx.request({
                    url:app.buildUrl( '/member/check-reg' ),
                    header:app.getRequestHeader(),
                    method:'POST',
                    data:{
                        code:res.code,
                        refer_openid: app.globalData.refer_openid
                    },
                    success:function( res ){
                        var resp = res.data;
                        if(resp.is_register){
                            app.globalData.userInfo = resp.data;
                            wx.setStorageSync('userInfo', app.globalData.userInfo)
                            app.goToIndex()
                        }
                        // app.setCache( "token",res.data.data.token );
                        //that.goToIndex();
                    }
                });
             }
         });
    },
    login:function (e) {
        if(!e.detail.userInfo){
            app.alert({
                "content": "登录失败,请再次点击"
            });
            return;
        }
        var data = e.detail.userInfo;
        wx.login({
            success: function (res) {
                if(!res.code){
                    app.alert("登录失败，请重试")
                    return
                }
                data['code'] = res.code;
                data['refer_id'] = app.globalData.refer_openid;
                wx.request({
                    // TODO 修改域名
                    url:app.globalData.domain+'/member/login',
                    header: app.getRequestHeader(),
                    method: 'POST',
                    data: data,
                    // openid获取

                    success:function (res) {
                        // userInfo = res.data.data
                        app.globalData.userInfo = res.data.data
                        wx.setStorageSync('userInfo', app.globalData.userInfo)
                        app.goToIndex();
                    }
                })
            }
        })
    }

});