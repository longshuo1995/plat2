;
var user_login_ops = {
  init:function () {
    this.eventBind();
  },
  eventBind:function () {
    $(".login_wrap .do-login").click(function () {
       var login_name = $(".login_wrap input[name=login_name]").val();
       var login_pwd = $(".login_wrap input[name=login_pwd]").val();
       if(login_name == undefined | login_name.length < 1){
           common_ops.alert("请输入正确的用户名");
           return
       }
       if(login_pwd == undefined | login_name.length < 1){
           common_ops.alert("请输入正确的密码");
           return
       }
    });

  }
};

$(document).ready(function () {
    user_login_ops.init()
})