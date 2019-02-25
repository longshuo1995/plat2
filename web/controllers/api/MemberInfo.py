from flask import request, jsonify
from application import app
from common.libs import db_mongo
from common.libs.member import MemberService
from web.controllers.api import route_api


@route_api.route('/member/group', methods=['GET', 'POST'])
def login():
    req = request.values
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    app.logger.info(req)
    if not req.get('openid'):
        resp['code'] = -1
        resp['msg'] = "需要openid"
        return jsonify(resp)

    resp['data'] = {'nickname': req.get('nickname', '')}
    info = db_mongo.get_table('plat2', 'member').find_one({"openid": req.get('openid')})
    data = [
        {"level_id": 1, "level_name": "下级队长人数", "level_num": info.get("")},
    ]
    return jsonify(resp)

    # 将会员信息，绑定信息插入到表中
    # sql_bind = 'insert into oauth_member_bind(nickname, sex, avator, salt) ' \
    #            'values("{nickname}", "{sex}", "{avator}", "{salt}")'.\
    #     format(nickname=req.get('nickname', ''), sex=req.get('sex', ''), avator=req.get, salt='')
    # db_sql.insert2tiku(sql_bind)
    # return ''


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
    info = db_mongo.get_table('plat2', 'member').find_one({"openid": openid})
    # info = None
    if info:
        resp['data']['is_register'] = True
    else:
        resp['data']['is_register'] = False
    return jsonify(resp)

