import logging
import os

import requests
from flask import jsonify, request
import project_conf
from common.libs import db_mongo
from common.libs.pdd import pdd_tools
from spider import pdd_spider
from web.controllers.api import route_api


@route_api.route("/shop/get_shop_msg")
def get_shop_msg():
    resp = {'code': 200, 'msg': '操作成功', 'data': {}}
    req = request.values
    goods_id = req.get('goods_id')
    if not goods_id:
        resp = {'code': 401, 'msg': '需要参数goods_id', 'data': {}}
    url = 'https://duoke678.com/pdd/goodDetail?goods_id=%s' % goods_id
    jo = requests.get(url).json()
    data = {}
    data['mall_name'] = jo['data']['mall_name']
    data['score'] = {
        'desc': ['描述相符', jo['data']['avg_desc'], 0],
        'serv': ['服务态度', jo['data']['avg_serv'], 0],
        'lgst': ['物流服务', jo['data']['avg_lgst'], 0]
    }
    resp['data'] = data
    return jsonify(resp)
