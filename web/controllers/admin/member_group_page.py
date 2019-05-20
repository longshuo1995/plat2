import json
import math
import re

from flask import request, render_template, redirect, make_response
import logging

from common.libs import db_mongo
from common.libs.member import MemberTools
from common.libs.tools import StrTools, ODTools
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
    max_count = math.ceil(count/10)-1
    data = {
        'user_info': user_info,
        'before_pg': '?mix_kw=%s&pages=%s' % (mix_kw, pages-1 if pages > 0 else pages),
        'next_pg': '?mix_kw=%s&pages=%s' % (mix_kw, pages+1 if pages < max_count else pages),
        'pg_count': max_count,
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
    if update == 1:
        for use in users:
            MemberTools.upgrade(use)
    elif update >= 0:
        db_mongo.get_table('plat2', 'member').update({'open_id': {'$in': users}}, {'$set': {'level': update}})
    elif update == -1:
        db_mongo.get_table('plat2', 'member').remove({'open_id': {'$in': users}})
    return redirect('/admin/member')


@route_admin.route('/user_info', methods=['GET', 'POST'])
def admin_user_info():
    open_id = request.values.get('open_id')
    data = {}
    if open_id:
        info = db_mongo.get_table('plat2', 'member').find_one({'open_id': open_id})
        data['nick_name'] = info['nick_name']
        data['icon_url'] = info['icon_url']
        data['open_id'] = info['open_id']
        refer_id = info['refer_id']
        leader_open_id = info['leader_openid']
        data['refer_msg'] = MemberTools.get_msg(refer_id)
        data['leader_msg'] = MemberTools.get_msg(leader_open_id)
        data['create_time'] = StrTools.convert_time(info['create_time'], '%Y-%m-%d %H:%M:%S')
        data['od'] = ODTools.get_order_msg(open_id)
        data['below_refer'] = MemberTools.get_refer_msg(open_id)
        data['below_indirect'] = MemberTools.get_indirect_msg(open_id)

    return render_template('admin/member_info.html', data=data)


@route_admin.route('/my_mem', methods=['GET', 'POST'])
def admin_user_my_mem():
    open_id = request.values.get('open_id')
    is_refer = int(request.values.get('is_refer', 1))
    pages = int(request.values.get('is_refer', 0))
    data = {}
    if is_refer:
        info = MemberTools.get_refer_msg(open_id, pages=pages)
    else:
        info = MemberTools.get_indirect_msg(open_id, pages=pages)
    data['user_info'] = info['mebs']
    count = info['count']
    max_count = math.ceil(count/10)-1
    data['before_pg'] = pages-1 if pages > 0 else 0
    data['next_pg'] = pages+1 if pages < max_count else max_count
    data['pg_count'] = max_count
    return render_template('admin/my_mem.html', data=data)
