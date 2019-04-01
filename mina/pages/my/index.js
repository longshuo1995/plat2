//获取应用实例
var app = getApp();
Page({
    data: {},
    onLoad(scene) {
        if(scene.from_openid){
            app.globalData.from_openid=scene.from_openid;
        }
        app.pre_load();
        // app.goToIndex()
    },
    onShow() {
        console.log('show...')
        console.log(app.globalData.userInfo)
        this.setData({
            userInfo:app.globalData.userInfo
        })
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
            title: "自购省钱，推广赚钱",
            path: '/pages/my/index?from_openid=' + app.globalData.userInfo.open_id,
            success: function (res) {
            },
            fail: function (res) {
            },

        }

    },
});