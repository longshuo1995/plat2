from flask import Blueprint, render_template, request, jsonify


route_user = Blueprint('user_page', __name__)


def check_register():
    passwd = request.cookies.get('passwd')
    if passwd != '81bf1168a1242755':
        return False
    return True


@route_user.route('/user_manager')
def user_manager():
    if not check_register():
        return render_template('user/login.html')

