import json

from flask import request, jsonify
from web.controllers.api import route_api


@route_api.route('/my/order', methods=['GET', 'POST'])
def my_order():
    resp = {'code': 200, 'msg': '操作成功~', 'data': {}}
    req = request.values
    status = int(req['status']) if 'status' in req else 0
    pay_order_list = [
        {
            'status': 0,
            'title': '袜子 10双 20双  袜女士防钩丝袜。。。。',
            'date': '2019-03-09',
            'status_desc': 'status_desc',
            'order_number': 'order_number',
            'note': 'note'
        }
    ]
    resp['data']['pay_order_list'] = pay_order_list
    return jsonify(resp)

