from flask import jsonify, request

from common.libs import db_mongo
from web.controllers.api import route_api

test_url = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1976195564,3037788353&fm=27&gp=0.jpg'


@route_api.route("/food/index")
def foodIndex():
    resp = {'code': 200, 'msg': '操作成功', 'data': {}}
    # 所有类
    data_cat_list = [{'id': 0, 'name': '全部'}]
    items = db_mongo.get_table('plat2', 'good_tp').find()
    for item in items:
        data_cat_list.append({'id': item['_id'], 'name': item['name']})
    resp['data']['cat_list'] = data_cat_list

    # food list
    food_list = [(1, 'test'), (2, 'test'), (3, 'test')]
    data_food_list = []
    if food_list:
        for item in food_list:
            data_food_list.append({
                'id': item[0],
                'pic_url': test_url
            })
    resp['data']['banner_list'] = data_food_list
    return jsonify(resp)


@route_api.route("/food/search")
def foodSearch():
    page_size = 10
    resp = {'code': 200, 'msg': '操作成功', 'data': {}}
    req = request.values
    cat_id = req.get('cat_id', 0)
    if cat_id:
        cat_id = int(float(cat_id))
    p = int(req.get('p', 1))
    query = {}
    mix_kw = req.get('mix_kw', '').split()
    if cat_id:
        query['type'] = int(cat_id)
    if mix_kw:
        query['name'] = {"name": '.*'.join(mix_kw)}
    print(query)

    offset = (p-1) * page_size
    items = db_mongo.get_table('plat2', 'good').find(query).skip(offset).limit(page_size)
    data_food_list = []
    for item in items:
        temp_data = {
            'id': item['_id'],
            'name': item['name'],
            'price': item['price'],
            'min_price': int(item['price']) - int(item['dis_price']),
            'pic_url': item['imgurl'],
        }
        data_food_list.append(temp_data)
    resp['data']['list'] = data_food_list
    resp['data']['has_more'] = 0 if len(data_food_list) < page_size else 1
    return jsonify(resp)
