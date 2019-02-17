//app.js
App({
    onLaunch: function () {
    },
    globalData: {
        userInfo: null,
        version: "1.0",
        shopName: "爱尚免单",
        isLogin: false,
        cache_path: '',
        //sdomain:"http://192.168.0.119:8999/api",
        // domain:"https://food.54php.cn/api",
        domain:"http://140.143.163.73:8811/api",
        sdomain:"http://140.143.163.73:8811/api"
    },
    goto_cache:function(){
        console.log(this.globalData.cache_path)
        console.log('ready swith')
        wx.switchTab({
            url: this.globalData.cache_path,
        });
    },
    goto_login:function () {
        wx.navigateTo({
            url: '/pages/index/index',
        });
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
        var that = this
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
                    data:{ code:res.code },
                    success:function( res ){
                        var resp = res.data
                        if(!resp.is_register){
                            that.goto_login()
                            // wx.switchTab({
                            //     url: '/pages/index/index',
                            // });
                        }else{
                            that.globalData.isLogin=true
                        }
                    }
                });
             }
         });
    },
    tip:function( params ){
        var that = this;
        var title = params.hasOwnProperty('title')?params['title']:'爱尚免单提示您';
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
        var title = params.hasOwnProperty('title')?params['title']:'爱尚免单提示您';
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
    }
});