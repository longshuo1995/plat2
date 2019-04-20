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
            resp.set_cookie('username', req.get('usename'))
            resp.set_cookie('password', req.get('password'))
            return resp
    return render_template('admin/login.html')


@route_admin.route('/list')
def admin_list():
    return render_template('admin/list.html')


@route_admin.route('/member')
def admin_member():
    user_count_per_page = 10
    username = request.cookies.get('username')
    password = request.cookies.get('password')
    req = request.values
    pages = int(req.get('pages', 0))

    mix_kw = req.get('mix_kw', '').strip()
    query = {}
    if mix_kw:
        query['nick_name'] = re.compile(mix_kw)

    user_info = list(db_mongo.get_table('plat2', 'member').find(query, {'open_id': 1, 'nick_name': 1, '_id': 0})
                     .skip(pages*user_count_per_page).limit(user_count_per_page))
    if username == 'qiyupingtuan' and password == 'd665e0369613cdcaddd4d268b3bcfb90':
        data = {
            'user_info': user_info
        }
        return render_template('admin/member.html', data=data)
    return render_template('admin/login.html')


