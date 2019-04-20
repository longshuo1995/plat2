from flask import request, render_template, redirect, make_response

from web.controllers.admin import route_admin


@route_admin.route('/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'GET':
        return render_template('admin/login.html')
    elif request.method == 'POST':
        req = request.form
        username = req.get('usename')
        password = req.get('password')
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
    username = request.cookies.get('username')
    password = request.cookies.get('password')

    if username == 'qiyupingtuan' and password == 'd665e0369613cdcaddd4d268b3bcfb90':
        return render_template('admin/member.html')
    return render_template('admin/login.html')


