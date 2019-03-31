//login.js
//获取应用实例
var app = getApp();
Page({
    data: {
    },

    onLoad: function () {
        // app.globalData.userInfo = wx.getStorageSync('userInfo')

    },
    onShow: function () {

    },
    onReady: function () {

    },
    checkLogin:function(){


    },

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