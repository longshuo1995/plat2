from flask import Blueprint, request

route_api = Blueprint('api_page', __name__)


@route_api.route("/", methods=['GET', 'POST'])
def index():
    req = request.values
    print(req)
    return "Mina Api V1.0"
