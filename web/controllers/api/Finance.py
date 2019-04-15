from flask import request, jsonify

from common.libs import db_mongo
from web.controllers.api import route_api


@route_api.route('/member/finance', methods=['GET', 'POST'])
def member_finance():
    req = request.values
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    open_id = req.get('openid')
    if not open_id:
        resp = {'code': 401, 'msg': '请传入参数openid', 'data': {}}
        return jsonify(resp)
    # info =
    infos = list(db_mongo.get_table('plat2', 'order').find({'$or': [{'custom_parameters': open_id}, {'refer_id': open_id},
                {'leader_openid': open_id}, {'leader_master': open_id}]}))
    data = {
        "current_money": 0,
        "checking_money": 0,
        "order_num": len(infos),
        "est_money": 0,
        "today_money": 0
    }
    resp['data'] = data
    return jsonify(resp)
