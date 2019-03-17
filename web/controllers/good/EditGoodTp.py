from web.controllers.good import route_good


@route_good.route('/add_good_tp', methods=['GET'])
def add_good_tp():
    return 