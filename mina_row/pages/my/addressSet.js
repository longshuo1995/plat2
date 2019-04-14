//获取应用实例
var commonCityData = require('../../utils/city.js');
var app = getApp();
Page({
    data: {
        info: [],
        provinces: [],
        citys: [],
        districts: [],
        selProvince: '请选择',
        selCity: '请选择',
        selDistrict: '请选择',
        selProvinceIndex: 0,
        selCityIndex: 0,
        selDistrictIndex: 0
    },
    onLoad: function (e) {
        var that = this;
        that.setData({
            id: e.id || ''
        });
        // this.initCityData(1);
    },
    // onShow: function () {
    //     this.getInfo();
    // },

    getPhoneNumber(e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
    },



    bindPickerChange: function (event) {
        var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[event.detail.value];
        if (selIterm && selIterm.name && event.detail.value) {
            this.setData({
                selDistrict: selIterm.name,
                selDistrictIndex: event.detail.value
            })
        }
    },
    bindCancel: function () {
        wx.navigateBack({});
    },
    bindSave: function (e) {
        var that = this;
        var mobile = e.detail.value.mobile;

        if (mobile == "") {
            app.tip({content: '请填写手机号码~~'});
            return
        }


        wx.request({
            url: app.buildUrl("/my/address/set"),
            header: app.getRequestHeader(),
            method: "POST",
            data: {
                id: that.data.id,
                province_id: commonCityData.cityData[this.data.selProvinceIndex].id,
                province_str: that.data.selProvince,
                city_id: city_id,
                city_str: that.data.selCity,
                district_id: district_id,
                district_str: that.data.selDistrict,
                nickname: nickname,
                address: address,
                mobile: mobile,
            },
            success: function (res) {
                var resp = res.data;
                if (resp.code != 200) {
                    app.alert({"content": resp.msg});
                    return;
                }
                // 跳转
                wx.navigateBack({});
            }
        })
    },

});
