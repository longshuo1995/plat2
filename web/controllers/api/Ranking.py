import json
import os

from flask import request, jsonify

import project_conf
from application import app
from common.libs import db_mongo
from common.libs.member import MemberService
from common.libs.pdd import pdd_tools
from web.controllers.api import route_api


@route_api.route('/goods/hot_goods', methods=['GET', 'POST'])
def hot_goods():
    goods_per_page = 50
    req = request.values
    tp = int(req.get('tp', 0))
    resp = {'code': 200, 'msg': '成功', 'data': []}
    pages = int(req.get('pages', 1))
    team_index = int(req.get('team_index'), 0)
    team_index = 1
    if team_index == 1:
        offset = (pages-1) * goods_per_page
        tp += 1
        data = pdd_tools.hot_goods_range(sort_type=tp, offset=offset, limit=goods_per_page).get('top_goods_list_get_response', {}).get('list', [])
        for item in data:
            temp = {
                'goods_id': item['goods_id'],
                'goods_name': item['goods_name'],
                'goods_thumbnail_url': item['goods_thumbnail_url'],
                'row_price': item['min_group_price'],
                'min_price': item['min_group_price'] - item['coupon_discount'],
                'discount': item['coupon_discount'],
                'sold_quantity': item['sales_tip'],
                'promotion_rate': item['promotion_rate'],
            }
            resp['data'].append(temp)
        return jsonify(resp)
    else:
        tp_map = {
            0: project_conf.qiyu_range_pg[0][1],
            1: project_conf.qiyu_range_pg[1][1],
            2: project_conf.qiyu_range_pg[2][1],
        }
        ranking_path = os.path.join(project_conf.project_path, 'asserts', tp_map[tp])
        items = [i for i in open(ranking_path)]

        for item in items[pages * goods_per_page: (pages+1) * goods_per_page]:
            item = json.loads(item)
            resp['data'].append(item)
        return jsonify(resp)


@route_api.route('/member/hot_member', methods=['GET', 'POST'])
def hot_member():
    req = request.values
    tp = req.get('tp', 0)
    pages = int(req.get('pages'), 0)

    resp = {'code': 200, 'msg': '成功', 'data': []}
    if pages > 1:
        return jsonify(resp)

    team_index = int(req.get('team_index', 0))
    tp = int(tp)
    if tp == 0:
        # 佣金排行
        if team_index == 0:
            # 个人榜
            file_name = os.path.join(project_conf.project_path, 'asserts', 'self_promotion')
        else:
            # 团队榜
            file_name = os.path.join(project_conf.project_path, 'asserts', 'group_promotion')
    else:
        # 粉丝排行
        if team_index == 0:
            # 个人榜
            file_name = os.path.join(project_conf.project_path, 'asserts', 'self_member')
        else:
            # 团队榜
            file_name = os.path.join(project_conf.project_path, 'asserts', 'group_member')

    for line in [i for i in open(file_name)]:
        jo = json.loads(line)
        resp['data'].append(jo)

    return jsonify(resp)


