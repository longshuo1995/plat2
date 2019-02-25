//login.js
//获取应用实例
var app = getApp();
Page({
    data: {
        remind: '加载中',
        angle: 0,
        userInfo: {},
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '我的团队'
        });
    },
    onShow: function () {
    },
    onReady: function () {
    },
});