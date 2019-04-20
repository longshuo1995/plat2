import json
import time

from flask import request, jsonify
from application import app
from common.libs import db_mongo
from common.libs.member import MemberService
from web.controllers.api import route_api


@route_api.route('/group/member', methods=['GET', 'POST'])
def group_member():
    req = request.values
    group_list = []
    resp = {'code': 200, 'msg': '成功', 'data': group_list}
    group_id = int(req.get('group_id', 0))
    open_id = req.get('open_id', '')
    pages = int(req.get('pages', 0))
    pages_per_page = 50
    if group_id == 0:
        info = db_mongo.get_table('plat2', 'member').find_one({"_id": open_id})
        if info['leader_openid']:
            teacher_info = db_mongo.get_table('plat2', 'member').find_one({"_id": info['leader_openid']})
            if teacher_info:
                group_list.append({
                    'tp_name': '团长',
                    'user_img': teacher_info['icon_url'],
                    'user_name': teacher_info['nick_name'],
                })
        if info['refer_id'] and info['refer_id'] != open_id and info['refer_id'] != info['leader_openid']:
            teacher_info = db_mongo.get_table('plat2', 'member').find_one({"_id": info['refer_id']})
            if teacher_info:
                group_list.append({
                    'tp_name': '老师',
                    'user_img': teacher_info['icon_url'],
                    'user_name': teacher_info['nick_name'],
                })
    else:
        if group_id == 1:
            query = {'refer_id': open_id, '_id': {'$ne': open_id}, 'leader_openid': {'$ne': open_id}}
        elif group_id == 2:
            query = {'leader_openid': open_id}
        elif group_id == 3:
            query = {'leader_master': open_id, '_id': {'$ne': open_id}}
        items = db_mongo.get_table('plat2', 'member').find(query).skip(pages*pages_per_page).limit(pages_per_page)
        for item in items:
            group_list.append({
                'tp_name': '会员',
                'user_img': item['icon_url'],
                'user_name': item['nick_name'],
            })
    return jsonify(resp)
