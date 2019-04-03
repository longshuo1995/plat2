var e = require("48888A443FACD8FF2EEEE24393FFC606.js");

require("4FF561B13FACD8FF299309B6C710D606.js"), require("B777BED63FACD8FFD111D6D13820D606.js");

var t = require("3A9F04203FACD8FF5CF96C274500D606.js"), s = "https://aloss.duoke678.com", i = "LTAI9xbXZC2fziZy", o = function() {
    var t = new Date();
    t.setSeconds(t.getSeconds() + 5);
    var s = {
        expiration: t.toISOString(),
        conditions: [ [ "content-length-range", 0, 1048576 ] ]
    };
    return e.encode(JSON.stringify(s));
}, n = function(e) {
    var s = t.HMAC(t.SHA1, e, "MojUB2hx321CucmAyYiBCjWEmkgGw4", {
        asBytes: !0
    });
    return t.util.bytesToBase64(s);
};

module.exports = {
    uploadimg: function(e, t, c) {
        var a = o(), r = n(a), u = this, l = e.i ? e.i : 0, f = e.success ? e.success : 0, p = e.fail ? e.fail : 0, d = e.path[l];
        d = d.substring(d.lastIndexOf("."), d.length);
        var y = new Date().getTime() + "_" + e.uid + d, g = "wechat/dkNew/upload/find/" + y;
        wx.uploadFile({
            url: s,
            filePath: e.path[l],
            name: "file",
            formData: {
                key: g,
                OSSAccessKeyId: i,
                policy: a,
                Signature: r,
                success_action_status: "200"
            },
            success: function(e) {
                200 == e.statusCode && (f++, "function" == typeof t && t(y));
            },
            fail: function(e) {
                p++, console.log("上传失败" + e), "function" == typeof c && c();
            },
            complete: function() {
                ++l == e.path.length || (e.i = l, e.success = f, e.fail = p, u.uploadimg(e, t));
            }
        });
    }
};