import base64
import os

import requests
from flask import jsonify, request

import project_conf
from common.libs import db_mongo
from common.libs.member import MemberService
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
    data_food_list = []

    fn = os.path.join(project_conf.project_path, 'web', 'static', 'index_img')
    img_names = os.listdir(fn)
    for img_name in img_names:
        data_food_list.append({
            'id': img_name,
            'pic_url': 'https://aishangnet.club/static/index_img/%s' % img_name,
        })
    resp['data']['banner_list'] = data_food_list
    return jsonify(resp)


@route_api.route("/food/search")
def foodSearch():
    page_size = 10
    resp = {'code': 200, 'msg': '操作成功', 'data': {}}
    req = request.values

    cat_id = int(req.get('cat_id', 0))
    p = int(req.get('p', 1))
    p = p if p else 1
    mix_kw = req.get('mix_kw', '').split()
    keyword = ' '.join(mix_kw)
    resp_jo = pdd_tools.search_goods(keyword=keyword, sort_type=cat_id, p=p)
    search_list = resp_jo.get('goods_search_response', {}).get('goods_list', [])
    data_food_list = []
    for item in search_list:
        promotion_rate = item.get('promotion_rate')
        quan_price = item.get('coupon_discount', 0)/100
        quan_price = quan_price if quan_price else 0
        row_price = item.get('min_group_price', 0)/100
        row_price = round(row_price, 2)
        min_price = row_price-quan_price
        min_price = round(min_price, 2)

        temp_data = {
            'promotion_rate': promotion_rate,
            'id': item['goods_id'],
            'name': item['goods_name'],
            'price': row_price,
            'min_price': min_price,
            'discount': quan_price,
            'pic_url': item['goods_thumbnail_url'],
            'promotion': round(min_price*promotion_rate/1000, 2)
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
    dt = res.get('goods_promotion_url_generate_response', {}).get('goods_promotion_url_list', [{}])[0]
    print(dt)
    if dt:
        good_detail = dt.get('goods_detail', {})
        resp['data'] = {
            'promotion_rate': good_detail.get('promotion_rate', 0)/1000,
            'pics': good_detail.get('goods_gallery_urls', []),
            'name': good_detail.get('goods_name', []),
            'discount': good_detail.get('coupon_discount', 0)/100,
            'price': 11,
            'row_price': good_detail.get('min_group_price', 0)/100,
            'sold_quantity': good_detail.get('sold_quantity', 0),
            'goods_desc': good_detail.get('goods_desc', '')
        }
    else:
        resp['code'] = 500
        resp['msg'] = '获取商品详情页错误'
    return jsonify(resp)


@route_api.route("/good/share", methods=['GET', 'POST'])
def good_share():
    headers = {
        "Content-Type": "application/json"
    }
    req = request.values
    from_openid = req.get('from_openid')
    access_token = MemberService.get_access_token()
    path = req.get('path', '')
    url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s" % access_token
    data = {
        'scene': 'from_openid=%s' % from_openid,
        'path': path
    }
    content = requests.post(url, headers=headers, json=data).content
    b64str = base64.b64encode(content)
    return b64str

