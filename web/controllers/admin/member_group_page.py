import math
import re

from flask import request, render_template, redirect, make_response
import logging

from common.libs import db_mongo
from web.controllers.admin import route_admin


@route_admin.route('/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'GET':
        return render_template('admin/login.html')
    elif request.method == 'POST':
        req = request.form
        username = req.get('username')
        password = req.get('password')
        logging.log(logging.ERROR, username)
        logging.log(logging.ERROR, password)
        if username == 'qiyupingtuan' and password == 'd665e0369613cdcaddd4d268b3bcfb90':
            resp = make_response(redirect('/admin/list'))
            resp.set_cookie('username', username)
            resp.set_cookie('password', password)
            return resp
    return render_template('admin/login.html')


@route_admin.route('/list')
def admin_list():
    return render_template('admin/list.html')


@route_admin.route('/member')
def admin_member():
    mp_level = {
        0: '团员',
        1: '团长',
        2: '拉黑'
    }
    user_count_per_page = 10
    username = request.cookies.get('username')
    password = request.cookies.get('password')
    if username != 'qiyupingtuan' and password != 'd665e0369613cdcaddd4d268b3bcfb90':
        return redirect('/admin/login')
    req = request.values
    pages = int(req.get('pages', 0))
    mix_kw = req.get('mix_kw', '').strip()
    query = {}
    if mix_kw:
        query['nick_name'] = re.compile(mix_kw)

    query_result = db_mongo.get_table('plat2', 'member').find(query, {'open_id': 1, 'nick_name': 1, 'icon_url': 1,
                                                                      'level': 1, '_id': 0})
    count = query_result.count()
    user_info = list(query_result.skip(pages*user_count_per_page).limit(user_count_per_page))
    for user in user_info:
        user['level'] = mp_level[user['level']]
    data = {
        'user_info': user_info,
        'pg_count': math.ceil(count/10)-1,
    }
    return render_template('admin/member.html', data=data)


@route_admin.route('/member_upgrade', methods=['POST'])
def admin_member_upgrade():
    req = request.form
    users = req.getlist('userinfo')
    update = int(req.get('update', -2))
    username = request.cookies.get('username')
    password = request.cookies.get('password')
    if username != 'qiyupingtuan' and password != 'd665e0369613cdcaddd4d268b3bcfb90':
        return redirect('/admin/login')
    if update >= 0:
        db_mongo.get_table('plat2', 'member').update({'_id': {'$in': users}}, {'$set': {'level': update}})
    elif update == -1:
        db_mongo.get_table('plat2', 'member').remove({'_id': {'$in': users}})
    return redirect('/admin/member')





