from flask import request, render_template

from common.libs import db_mongo
from web.controllers.good import route_good


@route_good.route('/good_list', methods=['GET'])
def good_list():
    PAGER_PER_COUNT = 10
    req = request.values
    pages = req.get('page', 0)
    skip_count = pages * PAGER_PER_COUNT
    good_tp_list = db_mongo.get_table('plat2', 'good_type_list').find()
    print(good_tp_list)
    good_list = db_mongo.get_table('plat2', 'good_list').find().skip(skip_count).limit(PAGER_PER_COUNT)
    print(good_list)
    data = {
        "good_tp_list": good_tp_list,
        "good_list": good_list
    }
    return render_template('good/good_list.html', data=data)

