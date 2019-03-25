//获取应用实例
var app = getApp();
Page({
    data: {},
    onLoad(scene) {
        if(scene.from_openid){
            app.globalData.from_openid=scene.from_openid;
        }
        console.log(app.globalData.from_openid)
        app.pre_load(this);
    },
    onShow() {
        this.getInfo();
    },
    getInfo:function(){
        var that = this;
        wx.request({
            url: app.buildUrl("/member/info"),
            header: app.getRequestHeader(),
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }
                that.setData({
                   user_info:resp.data.info
                });
            }
        });
    },
    get_money: function () {
    },
    onShareAppMessage: function(){
        console.log(app.globalData.userInfo.open_id);
        return {
            title: "奇遇拼团",
            path: '/pages/my/index?from_openid=' + app.globalData.userInfo.open_id,
            success: function (res) {
            },
            fail: function (res) {
            },

        }

    },
});