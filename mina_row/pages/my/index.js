//获取应用实例
var app = getApp();
Page({
    data: {
      finance: {}
    },
    onLoad(scene) {
        if(scene.from_openid){
            app.globalData.from_openid=scene.from_openid;
        }
        app.pre_load(this);
    },
    onShow() {
        console.log('show...')
        console.log(app.globalData.userInfo)
        this.setData({
            userInfo:app.globalData.userInfo
        })
      this.get_money()
    },
    // 复制
    copyBtn: function (e) {
      var that = this;
      wx.setClipboardData({
        //准备复制的数据
        data: app.globalData.userInfo.nick_name,
        success: function (res) {
          wx.showToast({
            title: '复制成功',
          });
        }
      });
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
      var that = this;
      wx.request({
        url: app.buildUrl("/member/finance"),
        header: app.getRequestHeader(),
        data: {
          openid: app.globalData.userInfo.open_id
        },
        success: function (res) {
          console.log(res)
          var resp = res.data;
          if (resp.code != 200) {
            app.alert({ "content": resp.msg });
            return;
          }
          that.setData({
            finance: resp.data
          });
        }
      });
    },
    onShareAppMessage: function(){
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