import requests
from flask import request, jsonify
from application import app
from common.libs import db_sql
from common.libs.member import MemberService
from web.controllers.api import route_api


@route_api.route('/member/login', methods=['GET', 'POST'])
def login():
    req = request.values
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    app.logger.info(req)
    if not req.get('code'):
        resp['code'] = -1
        resp['msg'] = "需要code"
        return jsonify(resp)

    # 临时登录凭证转  openid
    # url = 'https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={js_code}&grant_type' \
    #       '=authorization_code'.format(appid=app.config['MINA_APP']['appid'], js_code=req.get('code'), secret=app.config['MINA_APP']['appkey'])
    # jo = requests.get(url).json()
    openid = MemberService.getWechatOpenId(req['code'])
    query_sql = 'select * from oauth_member_bind where openid={openid} and type=1'.format(openid=jo['openid'])
    bind_infos = db_sql.select_from_tiku('food_db', query_sql)
    if bind_infos:
        query_mem_sql = 'select nickname from member where id="{openid}"'.format(openid=jo['openid'])
        member_info = db_sql.select_from_tiku('food_db', query_mem_sql)[0]
        resp['code'] = -1
        resp['msg'] = '已经绑定'
        resp['data'] = {'nickname': member_info[0]}
        return jsonify(resp)

    # 将会员信息，绑定信息插入到表中
    sql_bind = 'insert into oauth_member_bind(nickname, sex, avator, salt) ' \
               'values("{nickname}", "{sex}", "{avator}", "{salt}")'.\
        format(nickname=req.get('nickname', ''), sex=req.get('sex', ''), avator=req.get, salt='')
    db_sql.insert2tiku(sql_bind)
    return ''


@route_api.route('/member/check-reg', methods=['GET', 'POST'])
def checkReg():
    req = request.values
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    app.logger.info(req)
    if not req.get('code'):
        resp['code'] = -1
        resp['msg'] = "需要code"
        return jsonify(resp)
    openid = MemberService.getWechatOpenId(req['code'])
    return jsonify(resp)

