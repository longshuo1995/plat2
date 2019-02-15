from flask import Blueprint

route_demo = Blueprint('demo_page', __name__)


@route_demo.route('/uedit', methods=['GET', 'POST'])
def uedit():
    return 'test'
