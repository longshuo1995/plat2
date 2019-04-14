//app.js
App({
    onLaunch: function () {
    },
    pre_load: function(){
        wx.setNavigationBarTitle({
            title: this.globalData.shopName
        });

        if(this.globalData.userInfo && this.globalData.userInfo.open_id){
            console.log('step 1')
            return
        }
        this.globalData.userInfo = wx.getStorageSync('userInfo');
        if(this.globalData.userInfo && this.globalData.userInfo.open_id){
            console.log('ready goToIndex');
            this.goToIndex();
            if(!this.globalData.is_update_userinfo){
                this.update_userinfo();
                this.globalData.is_update_userinfo=true
            }
        }else{
            console.log('ready goToLogin');
            this.goToLogin();
            this.globalData.is_update_userinfo=true
        }
        if(this.globalData.userInfo.level>0){
            this.globalData.promotion_rate=1
        }
    },
    data:{
        'test': 'test'
    },
    update_userinfo:function(){
         var that = this;
         wx.login({
             fail:function(res){
                 console.log(res)
             },
             success:function( res ){
                 wx.request({
                    url:that.buildUrl( '/member/check-reg' ),
                    header:that.getRequestHeader(),
                    method:'POST',
                    data:{
                        code:res.code,
                        refer_openid: that.globalData.refer_openid
                    },
                    success:function( res ){
                        var resp = res.data;
                        console.log(resp);
                        if(resp.is_register){
                            that.globalData.userInfo = resp.data;
                            wx.setStorageSync('userInfo', that.globalData.userInfo)
                            that.globalData.is_update_userinfo = true
                        }else{
                            that.goToLogin()
                        }
                    }
                });
             }
         });
    },
    globalData: {
        isLogin: false,
        promotion_rate: 0.5,
        userInfo: {},
        version: "1.0",
        shopName: "奇遇拼团",
        from_openid: '',
        is_update_userinfo: false,
        cache: '/pages/food/index',
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
        wx.navigateTo({
            url: this.globalData.cache,
        });
        wx.switchTab({
            url: this.globalData.cache,
        });
    },
    goToLogin: function() {
        wx.navigateTo({
            url: '/pages/index/index',
        });
    },
});