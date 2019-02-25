from flask import jsonify, request
from web.controllers.api import route_api

test_url = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1976195564,3037788353&fm=27&gp=0.jpg'


@route_api.route("/food/index")
def foodIndex():
    resp = {'code': 200, 'msg': '操作成功', 'data': {}}
    # 所有类
    data_cat_list = [{'id': 0, 'name': '全部'}]
    # TODO 需要修改成查询数据库
    cat_list = [(1, '免单商品'), (2, '高佣商品'), (3, '排行榜')]
    if cat_list:
        for item in cat_list:
            data_cat_list.append({'id': item[0], 'name': item[1]})
    resp['data']['cat_list'] = data_cat_list

    # food list
    food_list = [(1, '免单商品'), (2, '高佣商品'), (3, '排行榜')]
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
    mix_kw = req.get('mix_kw', '')
    p = int(req.get('p', 1))
    offset = (p-1) * page_size

    # TODO 根据query  查询
    food_list = [(1, 'fdname1', '10', '8', test_url)]
    data_food_list = []
    for item in food_list:
        temp_data = {
            'id': item[0],
            'name': item[1],
            'price': item[2],
            'min_price': item[3],
            'pic_url': item[4],
        }
        data_food_list.append(temp_data)
    resp['data']['list'] = data_food_list
    resp['data']['has_more'] = 0 if len(data_food_list) < page_size else 1
    return jsonify(resp)
