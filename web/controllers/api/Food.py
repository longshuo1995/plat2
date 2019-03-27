from flask import jsonify, request

from common.libs import db_mongo
from common.libs.pdd import pdd_tools
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

    cat_id = int(req.get('cat_id', 0))
    cat_id = cat_id if cat_id else 1
    # cat_id = 0 if cat_id == 1 else cat_id

    p = int(req.get('p', 1))
    p = p if p else 1

    mix_kw = req.get('mix_kw', '').split()
    keyword = ' '.join(mix_kw)
    resp_jo = pdd_tools.search_goods(keyword=keyword, sort_type=cat_id, p=p)
    data_food_list = []
    for item in resp_jo.get('goods_search_response', {}).get('goods_list', []):
        promotion_rate = item.get('promotion_rate')
        promotion_rate = promotion_rate if promotion_rate else 0
        quan_price = item.get('coupon_discount', 0)/100
        quan_price = quan_price if quan_price else 0
        row_price = item.get('min_group_price', 0)/100
        row_price = round(row_price, 2)
        min_price = row_price-quan_price
        min_price = round(min_price, 2)

        promotion = int(promotion_rate)*min_price / 100
        promotion = round(promotion, 2)

        temp_data = {
            'promotion_rate': promotion_rate,
            'id': item['goods_id'],
            'name': item['goods_name'],
            'price': row_price,
            'min_price': min_price,
            'pic_url': item['goods_thumbnail_url'],
            'promotion': promotion
        }
        data_food_list.append(temp_data)
    resp['data']['list'] = data_food_list
    resp['data']['has_more'] = 0 if len(data_food_list) < page_size else 1
    return jsonify(resp)


@route_api.route("/good/get_pdd_url")
def get_pdd_url():
    resp = {'code': 200, 'msg': '操作成功', 'data': ''}
    req = request.values
    good_id = req.get('good_id')
    open_id = req.get('open_id')
    res = pdd_tools.search_good_detail(good_id, open_id)
    print(res)
    path = res.get('goods_promotion_url_generate_response', {}).get('goods_promotion_url_list', [{}])[0].get('we_app_info',
                                                                                                    {}).get('page_path')
    if path:
        resp['data'] = path
    else:
        resp['code'] = 500
        resp['msg'] = '获取商品详情页错误'
    return jsonify(resp)
