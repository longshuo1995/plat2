import math
import re

from flask import request, redirect, render_template

from common.libs import db_mongo
from web.controllers.admin import route_admin


@route_admin.route('/order')
def admin_order():
    order_count_per_page = 10
    username = request.cookies.get('username')
    password = request.cookies.get('password')
    open_id = request.cookies.get('open_id', '')
    if username != 'qiyupingtuan' and password != 'd665e0369613cdcaddd4d268b3bcfb90':
        return redirect('/admin/login')
    req = request.values
    pages = int(req.get('pages', 0))
    mix_kw = req.get('mix_kw', '').strip()
    query = {}
    data = {
        'nick_name': '',
        'icon_url': ''
    }
    if mix_kw:
        query['goods_name'] = re.compile(mix_kw)
    if open_id:
        query['$or'] = [{'custom_parameters': open_id}, {'refer_id': open_id}, {'leader_openid': open_id}, {'leader_master': open_id}]
        info = db_mongo.get_table('plat2', 'member').find_one({'open_id': open_id})
        data['nick_name'] = info.get('nick_name', '')
        data['icon_url'] = info.get('icon_url', '')

    od = db_mongo.get_table('plat2', 'order').find(query)
    count = od.count()
    order_list = list(od.skip(pages*order_count_per_page).limit(order_count_per_page))

    id_nick_map = {}

    def query_nick_name(open_id):
        if not open_id:
            return ''
        nick_name = id_nick_map.get(open_id, '')
        if not nick_name:
            info = db_mongo.get_table('plat2', 'member').find_one({'open_id': open_id})
            if not info:
                info = {}
            id_nick_map[open_id] = info.get('nick_name')
        return id_nick_map[open_id]
    for item in order_list:
        item['nick_open_id'] = query_nick_name(item['custom_parameters'])
        item['nick_refer_id'] = query_nick_name(item['refer_id'])
        item['nick_leader_openid'] = query_nick_name(item['leader_openid'])
        item['nick_leader_master'] = query_nick_name(item['leader_master'])

    max_count = math.ceil(count/10)-1
    before_page = pages - 1
    before_page = 0 if before_page < 0 else before_page

    after_page = pages + 1
    after_page = after_page if after_page < max_count else max_count
    base_url = '/admin/order?open_id=%s&mix_kw=%s' % (open_id, mix_kw)
    data['before_page'] = base_url + '&pages=%s' % before_page
    data['after_page'] = base_url + '&pages=%s' % after_page
    data['last_page'] = base_url + '&pages=%s' % max_count
    data['max_count'] = max_count
    data['order_list'] = order_list

    return render_template('admin/my_order.html', data=data)


