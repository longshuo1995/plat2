from flask import Blueprint, render_template, request, jsonify

from common.libs import db_sql
from common.libs.user.UserService import UserService

route_user = Blueprint('user_page', __name__)


@route_user.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("user/login.html")
    resp = {'code': 200, 'msg': '登录成功', 'data': {}}
    req = request.values
    login_name = req.get('login_name', '')
    login_pwd = req.get('login_pwd', '')
    # 表单校验
    if not login_name:
        resp['code'] = -1
        resp['msg'] = "请输入正确的用户名"
        return jsonify(resp)
    if not login_pwd:
        resp['code'] = -1
        resp['msg'] = "请输入正确的密码"
        return jsonify(resp)

    userinfos = db_sql.select_from_tiku('food_db', 'select login_pwd, login_salt from user '
            'where login_name="{login_name}" and status=1'.format(login_name=login_name))
    if not userinfos:
        resp['code'] = -1
        resp['msg'] = "请输入正确的用户名密码"
        return jsonify(resp)
    userinfo = userinfos[0]
    if userinfo[0] != UserService.genPwd(login_pwd, userinfo[1]):
        resp['code'] = -1
        resp['msg'] = "请输入正确的用户名密码"
        return jsonify(resp)
    return jsonify(resp)


@route_user.route('/edit')
def edit():
    return render_template("user/edit.html")


@route_user.route('/reset-pwd')
def reset_pwd():
    return render_template("user/reset-pwd.html")
