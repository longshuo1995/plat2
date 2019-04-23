import json

from flask import request, jsonify

import project_conf
from common.libs import db_mongo
from web.controllers.api import route_api


@route_api.route('/my/order', methods=['GET', 'POST'])
def my_order():
    resp = {'code': 200, 'msg': '操作成功~', 'data': {}}
    req = request.values
    status = int(req['status']) if 'status' in req else 0
    open_id = req.get('openid')
    open_id = 'ohl4g5USDznFdyo9qVFmZQcOn-6Q'
    query = {'$or': [{'custom_parameters': open_id}, {'refer_id': open_id}, {'leader_openid': open_id}, {'leader_master': open_id}]}
    if status:
        query['status'] = status
    print(query)
    infos = db_mongo.get_table('plat2', 'order').find(query)
    order_list = []
    for info in infos:
        member_info = db_mongo.get_table('plat2', 'member').find_one({'_id': info['custom_parameters']})
        if not member_info:
            continue
        rate = 0
        if info['custom_parameters'] == open_id:
            rate += project_conf.rate_conf['self_rate']
        if info.get('refer_id') == open_id:
            rate += project_conf.rate_conf['refer_rate']
        if info.get('leader_openid') == open_id:
            rate += project_conf.rate_conf['leader_rate']
        if info.get('leader_master') == open_id:
            rate += project_conf.rate_conf['relation_rate']
        temp = {
            'order_sn': info['_id'],
            'own_icon': member_info.get('icon_url'),
            'own_name': member_info.get('nick_name', ''),
            'order_status_desc': info.get('order_status_desc', ''),
            'goods_name': info.get('goods_name', ''),
            'goods_thumbnail_url': info.get('goods_thumbnail_url', ''),
            'pay_money': info.get('order_amount')/100,
            'self_money': round(info.get('order_amount')*info.get('promotion_rate')*rate/100000, 2),
        }
        order_list.append(temp)
    order_list.reverse()
    resp['data']['order_list'] = order_list
    return jsonify(resp)

