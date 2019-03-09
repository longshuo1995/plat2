import json

from flask import request, jsonify
from application import app
from common.libs import db_mongo
from common.libs.member import MemberService
from web.controllers.api import route_api


@route_api.route('/goods/hot_goods', methods=['GET', 'POST'])
def hot_goods():
    req = request.values
    tp = req.get('tp')
    resp = {'code': 200, 'msg': '成功', 'data': []}
    if not tp:
        resp['code'] = -1
        resp['msg'] = "需要tp"
        return jsonify(resp)
    for i in range(10):
        temp = {
            'id': i,
            'title': "2019春 小白鞋子",
            'icon': "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1976195564,3037788353&fm=27&gp=0.jpg",
            'price': 13.8,
            'discount': 10,
            'sale_count': '290'
        }
        resp['data'].append(temp)
    return jsonify(resp)


@route_api.route('/member/hot_member', methods=['GET', 'POST'])
def hot_member():
    req = request.values
    tp = req.get('tp')
    resp = {'code': 200, 'msg': '成功', 'data': []}
    if not tp:
        resp['code'] = -1
        resp['msg'] = "需要tp"
        return jsonify(resp)
    tp = int(tp)
    title = ''
    if tp == 0:
        title = '累计佣金'
    if tp == 1:
        title = '累计粉丝'

    for i in range(10):
        temp = {
            'id': i,
            'nick_name': "大头哥哥",
            'icon': "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1976195564,3037788353&fm=27&gp=0.jpg",
            'title': title,
            'value': '290'
        }
        resp['data'].append(temp)
    return jsonify(resp)


