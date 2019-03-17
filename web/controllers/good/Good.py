from flask import request, render_template

from common.libs import db_mongo
from web.controllers.good import route_good


@route_good.route('/good_list', methods=['GET'])
def good_list():
    PAGER_PER_COUNT = 10
    req = request.values
    pages = req.get('page', 0)
    skip_count = pages * PAGER_PER_COUNT
    good_tp_list = list(db_mongo.get_table('plat2', 'good_type_list').find())
    good_list = list(db_mongo.get_table('plat2', 'good_list').find().skip(skip_count).limit(PAGER_PER_COUNT))
    data = {
        "good_tp_list": good_tp_list,
        "good_list": good_list,
        "test": 'longshuo'
    }
    return render_template('good/good_list.html', data=data)


@route_good.route('/good_detail', methods=['GET'])
def good_detail():
    req = request.values
    _id = int(float(req.get('_id', 0)))
    good_tp_list = list(db_mongo.get_table('plat2', 'good_type_list').find())
    good = {}
    if _id:
        good = list(db_mongo.get_table('plat2', 'good_list').find({'_id': _id}).skip())
        good = good[0] if good else {}
    data = {
        "good_tp_list": good_tp_list,
        "good": good,
    }
    return render_template('good/good_detail.html', data=data)
