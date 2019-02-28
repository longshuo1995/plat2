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
    ]
    return jsonify(resp)

    # 将会员信息，绑定信息插入到表中
    # sql_bind = 'insert into oauth_member_bind(nickname, sex, avator, salt) ' \
    #            'values("{nickname}", "{sex}", "{avator}", "{salt}")'.\
    #     format(nickname=req.get('nickname', ''), sex=req.get('sex', ''), avator=req.get, salt='')
    # db_sql.insert2tiku(sql_bind)
    # return ''


@route_api.route('/member/group_item_detail', methods=['GET', 'POST'])
def get_group_detail():
    req = request.values
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    app.logger.info(req)
    if not req.get('code'):
        resp['code'] = -1
        resp['msg'] = "需要code"
        return jsonify(resp)
    openid = req['open_id']
    level = int(req['open_id'])
    infos = db_mongo.get_table('plat2', 'member').\
        find(
        {"refer_id": openid, "level": level},
        {"nick_name": 1, "create_time": 1, "icon": 1}).\
        sort({"create_time": -1}).limit(10)
    resp['data'] = infos
    return jsonify(resp)

'''
db.member.insertOne({ "_id" : "test_22", "nick_name" : "test11", "refer_id" : "test", "refer_nickname" : "refer_test", "count_vip" : 11, "count_leader" : 12, "count_group" : 10, "earn_vip" : 100.11, "earn_leader" : 200, "earn_group" : 300, "current_money" : 1000, "checking_money" : 2000, "create_time" : "1551170838", "level" : 2, "icon_url" : "https://www.easyicon.net/api/resizeApi.php?id=1179694&size=128" })
'''
