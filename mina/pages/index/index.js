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
            url: '/pages/food/index',
        });
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: app.globalData.shopName
        });
        this.checkLogin();
    },
    onShow: function () {

    },
    onReady: function () {
        var that = this;
        setTimeout(function () {
            that.setData({
                remind: ''
            });
        }, 1000);
        wx.onAccelerometerChange(function (res) {
            var angle = -(res.x * 30).toFixed(1);
            if (angle > 14) {
                angle = 14;
            }
            else if (angle < -14) {
                angle = -14;
            }
            if (that.data.angle !== angle) {
                that.setData({
                    angle: angle
                });
            }
        });
    },
    checkLogin:function(){

        console.log(app.globalData.refer_openid)

         var that = this;
         wx.login({
             fail:function(res){
                 console.log(res)
             },
             success:function( res ){
                 console.log(res.code);
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
                        console.log(resp);
                        if(resp.is_register){
                            app.globalData.userInfo = resp.data;
                            console.log(resp);
                            that.goToIndex()
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
                        console.log(res);
                        app.goToIndex();
                    }
                })
            }
        })
    }
    // login:function( e ){
    //     var that = this;
    //     if( !e.detail.userInfo ){
    //         app.alert( { 'content':'登录失败，请再次点击~~' } );
    //         return;
    //     }
    //
    //     var data = e.detail.userInfo;
    //     wx.login({
    //         success:function( res ){
    //             if( !res.code ){
    //                 app.alert( { 'content':'登录失败，请再次点击~~' } );
    //                 return;
    //             }
    //             data['code'] = res.code;
    //             wx.request({
    //                 url:app.buildUrl( '/member/login' ),
    //                 header:app.getRequestHeader(),
    //                 method:'POST',
    //                 data:data,
    //                 success:function( res ){
    //                     if( res.data.code != 200 ){
    //                         app.alert( { 'content':res.data.msg } );
    //                         return;
    //                     }
    //                     app.setCache( "token",res.data.data.token );
    //                     that.goToIndex();
    //                 }
    //             });
    //         }
    //     });
    // }
});