from flask import request, jsonify
from pandas import DataFrame

import project_conf
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
    # 计算佣金
    df = DataFrame(infos)
    # 自己
    p1 = df[df['custom_parameters'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['self_rate']
    # 老师
    p2 = df[df['refer_id'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['refer_rate']
    # 团长
    p3 = df[df['leader_openid'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['leader_rate']
    total_promotion = round(sum([p1, p2, p3]), 2)
    data = {
        "current_money": 0,
        "checking_money": 0,
        "order_num": len(infos),
        "est_money": total_promotion,
        "today_money": 0
    }
    resp['data'] = data
    return jsonify(resp)
