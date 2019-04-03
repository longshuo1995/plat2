import base64
import logging
import os
import time

import requests
from flask import jsonify, request

import project_conf
from common.libs import db_mongo
from common.libs.member import MemberService
from common.libs.pdd import pdd_tools
from web.controllers.api import route_api


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
    img_names.sort()
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
        '''
        {'avg_desc': 483, 'mall_coupon_remain_quantity': None, 'category_name': '美妆', 'coupon_remain_quantity': 24000, 'avg_serv': 486, 'avg_lgst': 484, 'serv_pct': 0.8757, 'promotion_rate': 200, 'sold_quantity': 6998, 'cat_ids': [1432, 1433, 1442, 0], 'coupon_min_order_amount': 200, 'lgst_pct': 0.8726, 'category_id': 1432, 'mall_coupon_discount_pct': None, 'mall_id': 552747, 'goods_eval_score': 4.61, 'cat_id': None, 'mall_name': '珊瑚海美妆馆', 'coupon_total_quantity': 50000, 'desc_pct': 0.8323, 'mall_coupon_min_order_amount': None, 'mall_coupon_end_time': None, 'merchant_type': 6, 'goods_name': '【碎发整理神器】头发毛燥定型碎发膏 防静电毛发固定小孩可用', 'goods_eval_count': 404, 'goods_id': 5788056678, 'goods_gallery_urls': None, 'mall_coupon_id': None, 'goods_desc': None, 'opt_name': '美妆', 'goods_thumbnail_url': 'https://t00img.yangkeduo.com/goods/images/2019-01-24/51c2bbfc5a1986396858cae748b7790e.jpeg', 'opt_id': 16, 'opt_ids': [16, 643, 648, 299, 12, 300], 'goods_image_url': 'https://t00img.yangkeduo.com/openapi/images/2019-01-24/a956594657cfdde575c08620784a4eec.jpeg', 'min_normal_price': 1990, 'has_coupon': True, 'has_mall_coupon': False, 'mall_coupon_start_time': None, 'mall_rate': 10, 'mall_coupon_total_quantity': None, 'create_at': 1548394622, 'mall_coupon_max_discount_amount': None, 'min_group_price': 990, 'mall_cps': 1, 'coupon_start_time': 1553443200, 'coupon_discount': 200, 'coupon_end_time': 1556639999}
        '''
        promotion_rate = item.get('promotion_rate')
        quan_price = item.get('coupon_discount', 0)/100
        quan_price = quan_price if quan_price else 0
        row_price = item.get('min_group_price', 0)/100
        min_price = row_price-quan_price
        sale_count = item.get('sold_quantity', 0)

        temp_data = {
            'promotion_rate': promotion_rate/1000,
            'id': item['goods_id'],
            'name': item['goods_name'],
            'price': row_price,
            'min_price': min_price,
            'discount': quan_price,
            'pic_url': item['goods_thumbnail_url'],
            'sale_count': sale_count
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
    if dt:
        good_detail = dt.get('goods_detail', {})
        row_price = good_detail.get('min_group_price', 0)/100
        discount = good_detail.get('coupon_discount', 0)/100
        resp['data'] = {
            'promotion_rate': good_detail.get('promotion_rate', 0)/1000,
            'pics': good_detail.get('goods_gallery_urls', []),
            'name': good_detail.get('goods_name', []),
            'discount': discount,
            'price': row_price-discount,
            'row_price': row_price,
            'sold_quantity': good_detail.get('sold_quantity', 0),
            'goods_desc': good_detail.get('goods_desc', ''),
            'short_url': dt.get('short_url', '')
        }
    else:
        logging.log(logging.ERROR, 'get pdd detail failed~ msg:good_id:{good_id}, open_id:{open_id}'.format
        (good_id=good_id, open_id=open_id))
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

