import json

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

    # 临时登录凭证转  openid
    # url = 'https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={js_code}&grant_type' \
    #       '=authorization_code'.format(appid=app.config['MINA_APP']['appid'], js_code=req.get('code'), secret=app.config['MINA_APP']['appkey'])
    # jo = requests.get(url).json()
    openid = MemberService.getWechatOpenId(req['code'])

    info = db_mongo.get_table('plat2', 'member').find_one({"open_id": openid})
    if info:
        resp['code'] = -1
        resp['msg'] = '已经绑定'
        info.pop('_id')
        resp['data'] = info
        return jsonify(resp)
    else:
        info = {"open_id": openid, "nick_name": req.get('nickName', ''),
                "refer_id": req.get('refer_id', ''), "icon_url": req.get('avatarUrl', ''),
                'gender': req.get('gender', ''), 'language': req.get('language', ''),
                'country': req.get('country', ''), 'province': req.get('province', ''), 'city': req.get('city', ''),
                "count_vip": 11, "count_leader": 12, "count_group": 10,
                "earn_vip": 100.11, "earn_leader": 200, "earn_group": 300,
                "current_money": 1000, "checking_money": 2000,
                "create_time": "2018-01-29", "level": 0,
                }
        db_mongo.get_table('plat2', 'member').insert_one(info)
        info.pop('_id')
        resp['data'] = info
        return json.dumps(resp)


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
    print('openid')
    print(openid)
    info = db_mongo.get_table('plat2', 'member').find_one({"open_id": openid})
    # info = None
    print('info')
    print(info)
    if info:
        info.pop('_id')
        resp['data'] = info
        resp['is_register'] = True
    else:
        resp['is_register'] = False
    return jsonify(resp)

