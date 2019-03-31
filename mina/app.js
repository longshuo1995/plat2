//app.js
App({
    onLaunch: function () {
    },
    pre_load: function(){
        if(this.globalData.userInfo){
            return
        }
        this.globalData.userInfo = wx.getStorageSync('userInfo')
        wx.setNavigationBarTitle({
            title: this.globalData.shopName
        });
        if(!this.globalData.userInfo){
            this.goToIndex()
        }else{
            console.log('cache success....')
        }
        console.log(this.globalData.userInfo)
        console.log(this.globalData.userInfo)
        console.log(this.globalData.userInfo)
        if(this.globalData.userInfo.level>0){
            this.globalData.promotion_rate=1
        }

        // console.log(this.globalData.isLogin);
        // if(!this.globalData.isLogin){
        //     this.check_login();
        // }
        // console.log('set data....');
        // console.log(this.globalData.userInfo);
        // page_ctx.setData({
        //     userInfo:this.globalData.userInfo,
        // });
    },
    data:{
        'test': 'test'
    },
    globalData: {
        isLogin: false,
        promotion_rate: 0.5,
        userInfo: null,
        version: "1.0",
        shopName: "奇遇拼团",
        from_openid: '',
        cache: '',
        // domain:"https://aishangnet.club/api",
        domain:"http://140.143.163.73:8812/api",
    },
    buildUrl:function( path,params ){
        var url = this.globalData.domain + path;
        var _paramUrl = "";
        if(  params ){
            _paramUrl = Object.keys( params ).map( function( k ){
                return [ encodeURIComponent( k ),encodeURIComponent( params[ k ] ) ].join("=");
            }).join("&");
            _paramUrl = "?" + _paramUrl;
        }
        return url + _paramUrl;
    },
    check_login: function(){
        if(this.globalData.isLogin){
            return
        }

        console.log('ready login')
        var that = this;
        wx.login({
             success:function( res ){
                 if( !res.code ){
                    that.alert( { 'content':'登录失败，请再次点击~~' } );
                    return;
                 }
                 wx.request({
                    url:that.buildUrl( '/member/check-reg' ),
                    header:that.getRequestHeader(),
                    method:'POST',
                    data:{
                        code:res.code,
                        'refer_openid':that.globalData.refer_openid,
                    },
                    success:function( res ){
                        var resp = res.data;
                        that.globalData.userInfo = resp.data;
                        console.log(resp.data);
                        that.globalData.isLogin = resp.is_register;
                        if(!that.globalData.isLogin){
                        //    跳转到登录页面。
                            that.goToLogin()
                        }
                    }
                });
             }
         });
    },
    tip:function( params ){
        var that = this;
        var title = params.hasOwnProperty('title')?params['title']:'奇遇拼团提示您';
        var content = params.hasOwnProperty('content')?params['content']:'';
        wx.showModal({
            title: title,
            content: content,
            success: function(res) {
                if ( res.confirm ) {//点击确定
                    if( params.hasOwnProperty('cb_confirm') && typeof( params.cb_confirm ) == "function" ){
                        params.cb_confirm();
                    }
                }else{//点击否
                    if( params.hasOwnProperty('cb_cancel') && typeof( params.cb_cancel ) == "function" ){
                        params.cb_cancel();
                    }
                }
            }
        })
    },
    alert:function( params ){
        var title = params.hasOwnProperty('title')?params['title']:'奇遇拼团提示您';
        var content = params.hasOwnProperty('content')?params['content']:'';
        wx.showModal({
            title: title,
            content: content,
            showCancel:false,
            success: function(res) {
                if (res.confirm) {//用户点击确定
                    if( params.hasOwnProperty('cb_confirm') && typeof( params.cb_confirm ) == "function" ){
                        params.cb_confirm();
                    }
                }else{
                    if( params.hasOwnProperty('cb_cancel') && typeof( params.cb_cancel ) == "function" ){
                        params.cb_cancel();
                    }
                }
            }
        })
    },
    console:function( msg ){
        console.log( msg);
    },
    getRequestHeader:function(){
        return {
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': this.getCache( "token" )
        }
    },

    getCache:function( key ){
        var value = undefined;
        try {
            value = wx.getStorageSync( key );
        } catch (e) {
        }
        return value;
    },
    setCache:function(key,value){
        wx.setStorage({
             key:key,
            data:value
        });
    },
    goToIndex: function() {
        wx.switchTab({
            url: '/pages/food/index',
        });
    },
    goToLogin: function() {
        wx.switchTab({
            url: '/pages/index/index',
        });
    },
});