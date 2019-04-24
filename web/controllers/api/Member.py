import json
import time

from flask import request, jsonify
from application import app
from common.libs import db_mongo
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
    openid = MemberService.getWechatOpenId(req['code'])
    info = db_mongo.get_table('plat2', 'member').find_one({"_id": openid})
    if info:
        resp['code'] = -1
        resp['msg'] = '已经绑定'
        info.pop('_id')
        resp['data'] = info
        return jsonify(resp)
    else:
        refer_id = req.get('refer_id', '')
        refer_obj = {}
        if refer_id:
            refer_obj = db_mongo.get_table('plat2', 'member').\
                find_one({"_id": refer_id}, {'leader_openid': 1, 'leader_master': 1})
            if not refer_obj:
                refer_obj = {}
        info = {
                "_id": openid, "open_id": openid,
                "nick_name": req.get('nickName', ''),
                "icon_url": req.get('avatarUrl', ''),
                'gender': req.get('gender', ''), 'language': req.get('language', ''),
                'country': req.get('country', ''), 'province': req.get('province', ''), 'city': req.get('city', ''),
                # "count_vip1": 0, "count_vip2": 0, "count_group": 0,
                # "earn_vip1": 0, "earn_vip2": 0, "earn_group": 0,
                "refer_id": refer_id,
                "leader_openid": refer_obj.get('leader_openid', ''),
                "leader_master": refer_obj.get('leader_master', ''),
                "create_time": int(time.time()),
                "level": 0,
        }
        db_mongo.get_table('plat2', 'member').insert_one(info)
        info.pop('_id')
        resp['data'] = info
        return json.dumps(resp)


@route_api.route('/member/upd_msg', methods=['GET', 'POST'])
def upd_msg():
    req = request.values
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    open_id = req.get('open_id')
    if not open_id:
        resp['code'] = 500
        resp['msg'] = '需要open_id'
    upd_sql = {}
    icon_url = req.get('icon_url')
    if icon_url and icon_url.find('http') > -1:
        upd_sql['icon_url'] = icon_url

    nick_name = req.get('nick_name')
    if nick_name:
        upd_sql['nick_name'] = nick_name
    we_code = req.get('we_code')
    if we_code:
        upd_sql['we_code'] = we_code
    phone_num = req.get('phone_num')
    if phone_num:
        upd_sql['phone_num'] = phone_num
    print(upd_sql)
    upd = {'open_id': open_id}, {'$set': upd_sql}
    print(upd)
    db_mongo.get_table('plat2', 'member').update(upd)
    return resp


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
    info = db_mongo.get_table('plat2', 'member').find_one({"open_id": openid})
    if info:
        info.pop('_id')
        resp['data'] = info
        resp['is_register'] = True
    else:
        resp['is_register'] = False
    return jsonify(resp)


