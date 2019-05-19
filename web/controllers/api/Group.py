import json
import re
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
    resp = {'code': 200, 'msg': '成功', 'data': {}}
    gp = req.get('group_id', 0)
    mix_kw = req.get('mix_kw', '').strip()
    group_id = int(gp.strip()) if gp else 0
    open_id = req.get('open_id', '')
    # open_id = 'ohl4g5USDznFdyo9qVFmZQcOn-6Q'
    pages = int(req.get('pages', 0))
    # pages = 0
    pages_per_page = 10
    if group_id == 0:
        info = db_mongo.get_table('plat2', 'member').find_one({"open_id": open_id})

        if info['leader_openid']:
            teacher_info = db_mongo.get_table('plat2', 'member').find_one({"open_id": info['leader_openid']})
            if teacher_info:
                group_list.append({
                    'tp_name': '奇遇团长',
                    'user_img': teacher_info['icon_url'],
                    'user_name': teacher_info['nick_name'],
                    'we_code': teacher_info.get('we_code', ''),
                    'phone_num': teacher_info.get('phone_num', '')
                })
        if info['refer_id'] and info['refer_id'] != open_id and info['refer_id'] != info['leader_openid']:
            teacher_info = db_mongo.get_table('plat2', 'member').find_one({"open_id": info['refer_id']})
            if teacher_info:
                group_list.append({
                    'tp_name': '老师',
                    'user_img': teacher_info['icon_url'],
                    'user_name': teacher_info['nick_name'],
                    'we_code': teacher_info.get('we_code', ''),
                    'phone_num': teacher_info.get('phone_num', '')
                })

        resp['data']['count'] = len(group_list)
    else:
        # 直属团员
        if group_id == 1:
            query = {'refer_id': open_id, 'open_id': {'$ne': open_id}}
        # 间接团员
        elif group_id == 2:
            query = {'leader_openid': open_id, 'refer_id': {'$ne': open_id}}
        elif group_id == 3:
            query = {'leader_master': open_id, 'open_id': {'$ne': open_id}}
        if mix_kw:
            query['nick_name'] = re.compile(mix_kw)
        info = db_mongo.get_table('plat2', 'member').find(query).sort('_id', -1)
        resp['data']['count'] = info.count()
        items = info.skip(pages*pages_per_page).limit(pages_per_page)
        for item in items:
            group_list.append({
                'tp_name': '奇遇会员',
                'user_img': item['icon_url'],
                'user_name': item['nick_name'],
                'we_code': item.get('we_code', ''),
                'phone_num': item.get('phone_num', '')
            })

    temp = []
    for item in group_list:
        item['user_name'] = item['user_name'] if len(item['user_name']) <= 6 else item['user_name'][:3]+'...'+item['user_name'][-3:]
        temp.append(item)

    resp['data']['member'] = temp
    return jsonify(resp)
