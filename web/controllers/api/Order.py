import json

from flask import request, jsonify

from common.libs import db_mongo
from web.controllers.api import route_api


@route_api.route('/my/order', methods=['GET', 'POST'])
def my_order():
    resp = {'code': 200, 'msg': '操作成功~', 'data': {}}
    req = request.values
    status = int(req['status']) if 'status' in req else 0
    open_id = req.get('openid')

    infos = db_mongo.get_table('plat2', 'order').find({'custom_parameters': open_id})
    order_list = []
    for info in infos:
        member_info = db_mongo.get_table('plat2', 'member').find_one({'_id': info['custom_parameters']})
        rate = 0
        if info['custom_parameters'] == open_id:
            rate += 0.2
        if info.get('refer_id') == open_id:
            rate += 0.2
        if info.get('leader_openid') == open_id:
            rate += 0.6
        if info.get('leader_master') == open_id:
            rate += 0.1
        temp = {
            'own_icon': member_info.get('icon_url'),
            'own_name': member_info.get('nick_name', ''),
            'order_status_desc': info.get('order_status_desc', ''),
            'goods_name': info.get('goods_name', ''),
            'goods_thumbnail_url': info.get('goods_thumbnail_url', ''),
            'pay_money': info.get('order_amount')/100,
            'self_money': info.get('order_amount')*info.get('promotion_rate')*rate/100000,
        }
        order_list.append(temp)

    resp['data']['order_list'] = order_list
    return jsonify(resp)

