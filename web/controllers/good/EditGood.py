from flask import request, render_template, redirect

from common.libs import db_mongo
from web.controllers.good import route_good


@route_good.route('/good_list', methods=['GET'])
def good_list():
    PAGER_PER_COUNT = 10
    req = request.values
    pages = req.get('page', 0)
    skip_count = pages * PAGER_PER_COUNT
    good_tp_list = list(db_mongo.get_table('plat2', 'good_tp').find())
    good_list = list(db_mongo.get_table('plat2', 'good').find().skip(skip_count).limit(PAGER_PER_COUNT))
    data = {
        "good_tp_list": good_tp_list,
        "good_list": good_list,
        "test": 'longshuo'
    }
    return render_template('good/good_list.html', data=data)


@route_good.route('/good_detail', methods=['GET'])
def good_detail():
    req = request.values
    _id = req.get('_id', 0)
    if not _id:
        _id = 0
    else:
        _id = int(float(_id))
    good_tp_list = list(db_mongo.get_table('plat2', 'good_tp').find())
    good = {}
    if _id:
        good = list(db_mongo.get_table('plat2', 'good').find({'_id': _id}))
        good = good[0] if good else {}

    data = {
        "good_tp_list": good_tp_list,
        "good": good,
    }
    return render_template('good/good_detail.html', data=data)


@route_good.route('/submit_edit', methods=['GET', 'POST'])
def good_submit_edit():
    req = request.values
    req = dict(req)
    _id = req.get('_id', 0)
    if not _id:
        _id = db_mongo.getNextValue('good_id')
        req['_id'] = _id
        db_mongo.get_table('plat2', 'good').insert_one(req)
    else:
        _id = int(float(_id))
        req["_id"] = _id
        db_mongo.get_table('plat2', 'good').update({"_id": _id}, req)
    return redirect('/good/good_list')


@route_good.route('/add_good_tp', methods=['GET', 'POST'])
def add_good_tp():
    req = request.values
    name = req.get('name')
    if not name:
        return "需要填入name"
    db_mongo.get_table('plat2', 'good_tp').insert_one({"_id": db_mongo.getNextValue("good_tp_id"), "name": name})
    return redirect("/good/good_list")

