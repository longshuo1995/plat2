var app = getApp();
Page({
    data: {
        order_list:[],
        orderState:["所有订单","有效订单","失效订单","可提现订单"],
        statusType: ["已成团", "已确认收货", "审核成功", "审核失败"],
        status:[ "0","1","2","3" ],
        currentType: 0,
        currentOrderType:0,
        tabClass: ["", "", "", ""],
    },
    orderStatusTap: function (e) {
      var curType = e.currentTarget.dataset.index;
      this.setData({
        currentOrderType: curType
      });
    },
    statusTap: function (e) {
        var curType = e.currentTarget.dataset.index;
        this.setData({
            currentType: curType
        });
        this.getPayOrder();
    },
    orderDetail: function (e) {
        // wx.navigateTo({
        //     url: "/pages/my/order_info?order_sn=" + e.currentTarget.dataset.id
        // })
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
    },
    onShow: function () {
        this.getPayOrder();
    },
    orderCancel:function( e ){
        this.orderOps( e.currentTarget.dataset.id,"cancel","确定取消订单？" );
    },
    getPayOrder:function(){
        var that = this;
        console.log('getPayOrder')
        console.log(app.globalData.userInfo);
        wx.request({
            url: app.buildUrl("/my/order"),
            header: app.getRequestHeader(),
            data: {
                status: that.data.status[ that.data.currentType ],
                openid: app.globalData.userInfo.open_id
            },
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }

                that.setData({
                   order_list:resp.data.order_list
                });
            }
        });
    },
    toPay:function( e ){
        var that = this;
        wx.request({
            url: app.buildUrl("/order/pay"),
            header: app.getRequestHeader(),
            method: 'POST',
            data: {
                order_sn: e.currentTarget.dataset.id
            },
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }
                var pay_info = resp.data.pay_info;
                wx.requestPayment({
                    'timeStamp': pay_info.timeStamp,
                    'nonceStr': pay_info.nonceStr,
                    'package': pay_info.package,
                    'signType': 'MD5',
                    'paySign': pay_info.paySign,
                    'success': function (res) {
                    },
                    'fail': function (res) {
                    }
                });
            }
        });
    },
    orderConfirm:function( e ){
        this.orderOps( e.currentTarget.dataset.id,"confirm","确定收到？" );
    },
    orderComment:function( e ){
        // wx.navigateTo({
        //     url: "/pages/my/comment?order_sn=" + e.currentTarget.dataset.id
        // });
    },
    orderOps:function(order_sn,act,msg){
        var that = this;
        var params = {
            "content":msg,
            "cb_confirm":function(){
                wx.request({
                    url: app.buildUrl("/order/ops"),
                    header: app.getRequestHeader(),
                    method: 'POST',
                    data: {
                        order_sn: order_sn,
                        act:act
                    },
                    success: function (res) {
                        var resp = res.data;
                        app.alert({"content": resp.msg});
                        if ( resp.code == 200) {
                            that.getPayOrder();
                        }
                    }
                });
            }
        };
        app.tip( params );
    }
});
