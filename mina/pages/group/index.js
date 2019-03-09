//login.js
//获取应用实例
var app = getApp();
Page({
    data: {
        remind: '加载中',
        angle: 0,
        userInfo: null,
        user_name:"boss",
        user_icon:"../../images/food.jpg"
    },
    onLoad: function () {
        console.log(app.globalData.userInfo);
        this.data.userInfo = app.globalData.userInfo;
        console.log(this.data.userInfo);
        wx.setNavigationBarTitle({
            title: '我的团队'
        });
    },
    onShow: function () {
    },
    onReady: function () {
    },
    go_detail:(e)=>{
      wx.navigateTo({
        url: '/pages/group_item_detail/group_item_detail?level='+e.currentTarget.dataset.level
      })
    }
});