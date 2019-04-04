import json
import os

from flask import request, jsonify

import project_conf
from application import app
from common.libs import db_mongo
from common.libs.member import MemberService
from web.controllers.api import route_api


@route_api.route('/goods/hot_goods', methods=['GET', 'POST'])
def hot_goods():
    goods_per_page = 10
    req = request.values
    tp = int(req.get('tp', 0))
    resp = {'code': 200, 'msg': '成功', 'data': []}
    pages = int(req.get('pages', 0))
    print(tp)
    print(pages)
    tp_map = {
        0: project_conf.qiyu_range_pg[0][1],
        1: project_conf.qiyu_range_pg[1][1],
        2: project_conf.qiyu_range_pg[2][1],
    }
    ranking_path = os.path.join(project_conf.project_path, 'asserts', tp_map[tp])
    items = [i for i in open(ranking_path)]
    if not tp:
        resp['code'] = -1
        resp['msg'] = "需要tp"
        return jsonify(resp)
    db_mongo.get_table('plat2', 'order').find({})
    for item in items[pages * goods_per_page: (pages+1) * goods_per_page]:
        item = json.loads(item)
        temp = {
            'id': item['id'],
            'title': item['title'],
            'icon': item['icon'],
            'price': float(item['price']),
            'discount': item['discount'],
            'sale_count': item['sale_count']
        }
        resp['data'].append(temp)
    return jsonify(resp)


@route_api.route('/member/hot_member', methods=['GET', 'POST'])
def hot_member():
    req = request.values
    print(req)
    tp = req.get('tp')
    pages = req.get('pages')
    team_index = req.get('team_index')
    resp = {'code': 200, 'msg': '成功', 'data': []}
    if not tp:
        resp['code'] = -1
        resp['msg'] = "需要tp"
        return jsonify(resp)
    tp = int(tp)
    print(tp)
    print(pages)
    print(team_index)
    if tp == 0:
        file_name = os.path.join(project_conf.project_path, 'asserts', 'group_promotion')
    if tp == 1:
        file_name = os.path.join(project_conf.project_path, 'asserts', 'group_member')

    for line in [i for i in open(file_name)]:
        jo = json.loads(line)
        resp['data'].append(jo)

    return jsonify(resp)


