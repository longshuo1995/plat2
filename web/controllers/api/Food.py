import logging
import os
import time

from flask import jsonify, request
import project_conf
from common.libs import db_mongo
from common.libs.pdd import pdd_tools
from common.libs.tools import StrTools
from common.libs.we_tools import we_code
from spider import pdd_spider
from web.controllers.api import route_api


@route_api.route("/test/remove_openid")
def remove_openid():
    resp = {'code': 200, 'msg': '操作成功', 'data': []}
    openid = request.values.get('openid')
    db_mongo.get_table('plat2', 'member').remove({"_id": openid})
    return jsonify(resp)


@route_api.route("/good/hot_key")
def hot_key():
    resp = {'code': 200, 'msg': '操作成功', 'data': []}
    data = ['包包', '男鞋', '口红', '棉服', '围巾', '零食']
    resp['data'] = data
    return jsonify(resp)


@route_api.route("/index/get_banner")
def foodIndex():
    resp = {'code': 200, 'msg': '操作成功', 'data': []}
    # 所有类
    data = []
    fn = os.path.join(project_conf.project_path, 'web', 'static', 'index_img')
    img_names = os.listdir(fn)
    img_names.sort()
    for img_name in img_names:
        data.append({
            'banner_url': 'https://aishangnet.club/static/index_img/%s' % img_name,
            'banner_detail_url': 'https://aishangnet.club/static/index_img_detail/%s' % img_name,
        })
    resp['data'] = data
    return jsonify(resp)


@route_api.route("/good/search")
def foodSearch():
    page_size = 50
    resp = {'code': 200, 'msg': '操作成功', 'data': {}}
    req = request.values

    sort_tp = int(req.get('sort_type', 0))
    opt_id = int(req.get('opt_id', 0))
    p = int(req.get('page', 1))
    p = p if p else 1
    mix_kw = req.get('mix_kw', '').split()
    keyword = ' '.join(mix_kw)
    resp_jo = pdd_tools.search_goods(keyword=keyword, opt_id=opt_id, page_size=page_size, sort_type=sort_tp, p=p)
    search_list = resp_jo.get('goods_search_response', {}).get('goods_list', [])
    data_food_list = []
    for item in search_list:
        '''
        {'avg_desc': 483, 'mall_coupon_remain_quantity': None, 'category_name': '美妆', 'coupon_remain_quantity': 24000, 'avg_serv': 486, 'avg_lgst': 484, 'serv_pct': 0.8757, 'promotion_rate': 200, 'sold_quantity': 6998, 'cat_ids': [1432, 1433, 1442, 0], 'coupon_min_order_amount': 200, 'lgst_pct': 0.8726, 'category_id': 1432, 'mall_coupon_discount_pct': None, 'mall_id': 552747, 'goods_eval_score': 4.61, 'cat_id': None, 'mall_name': '珊瑚海美妆馆', 'coupon_total_quantity': 50000, 'desc_pct': 0.8323, 'mall_coupon_min_order_amount': None, 'mall_coupon_end_time': None, 'merchant_type': 6, 'goods_name': '【碎发整理神器】头发毛燥定型碎发膏 防静电毛发固定小孩可用', 'goods_eval_count': 404, 'goods_id': 5788056678, 'goods_gallery_urls': None, 'mall_coupon_id': None, 'goods_desc': None, 'opt_name': '美妆', 'goods_thumbnail_url': 'https://t00img.yangkeduo.com/goods/images/2019-01-24/51c2bbfc5a1986396858cae748b7790e.jpeg', 'opt_id': 16, 'opt_ids': [16, 643, 648, 299, 12, 300], 'goods_image_url': 'https://t00img.yangkeduo.com/openapi/images/2019-01-24/a956594657cfdde575c08620784a4eec.jpeg', 'min_normal_price': 1990, 'has_coupon': True, 'has_mall_coupon': False, 'mall_coupon_start_time': None, 'mall_rate': 10, 'mall_coupon_total_quantity': None, 'create_at': 1548394622, 'mall_coupon_max_discount_amount': None, 'min_group_price': 990, 'mall_cps': 1, 'coupon_start_time': 1553443200, 'coupon_discount': 200, 'coupon_end_time': 1556639999}
        '''
        promotion_rate = item.get('promotion_rate')
        quan_price = item.get('coupon_discount', 0)
        quan_price = quan_price if quan_price else 0
        row_price = item.get('min_group_price', 0)
        min_price = row_price-quan_price

        # 高佣 价格过滤
        if sort_tp == 2 and min_price < 100:
            continue
        sale_count = item.get('sales_tip', 0)

        temp_data = {
            'promotion_rate': promotion_rate,
            'goods_id': item['goods_id'],
            'goods_name': item['goods_name'],
            'row_price': row_price,
            'min_price': min_price,
            'coupon_discount': quan_price,
            'goods_thumbnail_url': item['goods_thumbnail_url'],
            'sold_quantity': sale_count
        }
        data_food_list.append(temp_data)
    resp['data']['list'] = data_food_list
    resp['data']['has_more'] = 0 if len(data_food_list) == 0 else 1
    return jsonify(resp)


@route_api.route("/good/get_good_detail")
def get_pdd_url():
    '''
    {'avg_desc': 450, 'mall_coupon_remain_quantity': None, 'category_name': '海淘', 'coupon_remain_quantity': 13000, 'avg_serv': 461, 'avg_lgst': 463, 'serv_pct': 0.0609, 'promotion_rate': 200, 'sold_quantity': 24371, 'cat_ids': [16989, 17007, 17106, 0], 'coupon_min_order_amount': 300, 'lgst_pct': 0.0855, 'category_id': 12, 'mall_coupon_discount_pct': None, 'mall_id': 955517893, 'goods_eval_score': 4.51, 'cat_id': None, 'mall_name': '信德兴家居生活专营店', 'coupon_total_quantity': 20000, 'desc_pct': 0.0482, 'mall_coupon_min_order_amount': None, 'mall_coupon_end_time': None, 'merchant_type': 5, 'goods_name': '【买1送1】漏水拖鞋女夏居家沐浴软底防滑男家用情侣网红凉拖鞋', 'goods_eval_count': 1408, 'goods_id': 6869428690, 'goods_gallery_urls': ['https://t00img.yangkeduo.com/goods/images/2019-04-01/d0f9b879-2b0c-4347-9a9e-0cdade1be444.jpg', 'https://t00img.yangkeduo.com/goods/images/2019-04-01/2d030fce-9eec-46d7-bef6-f9d3d7219068.jpg', 'https://t00img.yangkeduo.com/goods/images/2019-04-01/a615e3d7-0db6-49f4-a177-8364d97878f9.jpg', 'https://t00img.yangkeduo.com/goods/images/2019-04-01/fc5ff487-860b-4dd3-89d8-ddd6b19d2240.jpg', 'https://t00img.yangkeduo.com/goods/images/2019-04-01/93b37d40-5684-4d6a-bbd6-9ad2d1845c55.jpg', 'https://t00img.yangkeduo.com/goods/images/2019-03-27/afc35a91-55f5-432a-abbc-c3ed14633814.jpg', 'https://t00img.yangkeduo.com/goods/images/2019-04-01/d9cc6a57-c214-40ec-852e-5cdc2bcb55f7.jpg', 'https://t00img.yangkeduo.com/goods/images/2019-04-02/62010dc4-6e42-413a-b0f8-f6386ef8221d.jpg'], 'mall_coupon_id': None, 'goods_desc': '【码数偏小一码 ,下单请拍大一码】、【码数偏小一码 ,下单请拍大一码】、【码数偏小一码 ,下单请拍大一码】重要的事情说三遍!!! 比如平时穿38码,下单请拍38/39;平时穿40码,下单请拍41/42,如此类推。', 'opt_name': '海淘', 'goods_thumbnail_url': 'https://t00img.yangkeduo.com/goods/images/2019-04-01/d94a5bb66079607587f740d57fa96e49.jpeg', 'opt_id': 12, 'opt_ids': [387, 419, 294, 329, 12, 223, 15], 'goods_image_url': 'https://t00img.yangkeduo.com/goods/images/2019-03-25/7a29527f-be99-4b40-8042-7117d7e6eeac.jpg', 'min_normal_price': 1090, 'has_coupon': True, 'has_mall_coupon': False, 'mall_coupon_start_time': None, 'mall_rate': 10, 'mall_coupon_total_quantity': None, 'create_at': 1553491578, 'mall_coupon_max_discount_amount': None, 'min_group_price': 990, 'mall_cps': 1, 'coupon_start_time': 1554220800, 'coupon_discount': 300, 'coupon_end_time': 1554479999}
    '''
    resp = {'code': 200, 'msg': '操作成功', 'data': ''}
    req = request.values
    good_id = req.get('goods_id')
    open_id = req.get('open_id')
    if open_id == 'undefined':
        dt = None
    else:
        res = pdd_tools.search_good_detail(good_id, open_id)
        dt = res.get('goods_promotion_url_generate_response', {}).get('goods_promotion_url_list', [{}])[0]
    if dt:
        pdd_url = dt['we_app_info']['page_path']
        app_id = dt['we_app_info']['app_id']
        good_detail = dt.get('goods_detail', {})
        promotion_rate = good_detail.get('promotion_rate', 0)
        promotion_rate = promotion_rate if promotion_rate else 0

        row_price = good_detail.get('min_group_price', 0)
        discount = good_detail.get('coupon_discount', 0)
        resp['data'] = {
            'mall_id': StrTools.null_convert(good_detail.get('mall_id')),
            'mall_name': StrTools.null_convert(good_detail.get('mall_name')),
            'avg_serv': StrTools.null_convert(good_detail.get('avg_serv'), 1),
            'avg_desc': StrTools.null_convert(good_detail.get('avg_desc'), 1),
            'avg_lgst': StrTools.null_convert(good_detail.get('avg_lgst'), 1),
            'goods_desc': StrTools.null_convert(good_detail.get('goods_desc')),
            'short_url': dt.get('short_url', ''),
            'promotion_rate': promotion_rate,
            'we_app_id': app_id,
            'we_page_path': pdd_url,
            'pics': good_detail.get('goods_gallery_urls', []),
            'name': good_detail.get('goods_name', []),
            'coupon_discount': discount,
            'min_price': row_price-discount,
            'row_price': row_price,
            'sold_quantity': good_detail.get('sales_tip', 0),
            'coupon_start_time': StrTools.convert_time(good_detail.get('coupon_start_time', 0), fmt='%m-%d'),
            'coupon_end_time': StrTools.convert_time(good_detail.get('coupon_end_time', 0), fmt='%m-%d'),
            'coupon_total_quantity': StrTools.null_convert(good_detail.get('coupon_total_quantity', 5000), True),
            'coupon_remain_quantity': StrTools.null_convert(good_detail.get('coupon_remain_quantity', 3000), True),
        }
        if not resp['data']['goods_desc']:
            resp['data']['goods_desc'] = '该商品暂无描述'
    else:
        logging.log(logging.ERROR, 'get pdd detail failed~ msg:good_id:{good_id}, open_id:{open_id}'.format
        (good_id=good_id, open_id=open_id))
        resp['code'] = 500
        resp['msg'] = '获取商品详情页错误'
    return jsonify(resp)


@route_api.route("/good/opt_get")
def opt_get():
    resp = {'code': 200, 'msg': '操作成功', 'data': []}
    req = request.values
    parent_opt_id = int(req.get('parent_opt_id', 0))
    if parent_opt_id == 0:
        resp['data'] = [{ "level": 1, "opt_id": 1, "opt_name": "食品", "parent_opt_id": 0 }, { "level": 1, "opt_id": 4, "opt_name": "母婴", "parent_opt_id": 0 }, { "level": 1, "opt_id": 13, "opt_name": "水果", "parent_opt_id": 0 }, { "level": 1, "opt_id": 14, "opt_name": "女装", "parent_opt_id": 0 }, { "level": 1, "opt_id": 15, "opt_name": "百货", "parent_opt_id": 0 }, { "level": 1, "opt_id": 16, "opt_name": "美妆", "parent_opt_id": 0 }, { "level": 1, "opt_id": 18, "opt_name": "电器", "parent_opt_id": 0 }, { "level": 1, "opt_id": 590, "opt_name": "充值", "parent_opt_id": 0 }, { "level": 1, "opt_id": 743, "opt_name": "男装", "parent_opt_id": 0 }, { "level": 1, "opt_id": 818, "opt_name": "家纺", "parent_opt_id": 0 }, { "level": 1, "opt_id": 1281, "opt_name": "鞋包", "parent_opt_id": 0 }, { "level": 1, "opt_id": 1282, "opt_name": "内衣", "parent_opt_id": 0 }, { "level": 1, "opt_id": 1451, "opt_name": "运动", "parent_opt_id": 0 }, { "level": 1, "opt_id": 1543, "opt_name": "手机", "parent_opt_id": 0 }, { "level": 1, "opt_id": 1917, "opt_name": "家装", "parent_opt_id": 0 }, { "level": 1, "opt_id": 2048, "opt_name": "汽车", "parent_opt_id": 0 }, { "level": 1, "opt_id": 2478, "opt_name": "电脑", "parent_opt_id": 0 }, { "level": 1, "opt_id": 2946, "opt_name": "生活个护", "parent_opt_id": 0 }, { "level": 1, "opt_id": 2964, "opt_name": "大家电", "parent_opt_id": 0 }, { "level": 1, "opt_id": 2974, "opt_name": "家具", "parent_opt_id": 0 }, { "level": 1, "opt_id": 3162, "opt_name": "数码", "parent_opt_id": 0 }, { "level": 1, "opt_id": 3175, "opt_name": "文化", "parent_opt_id": 0 }, { "level": 1, "opt_id": 3279, "opt_name": "健康", "parent_opt_id": 0 }, { "level": 1, "opt_id": 3526, "opt_name": "办公", "parent_opt_id": 0 }, { "level": 1, "opt_id": 5127, "opt_name": "厨房电器", "parent_opt_id": 0 }, ]
    else:
        resp['data'] = pdd_tools.opt_get(parent_opt_id).get('goods_opt_get_response', {}).get('goods_opt_list', [])
    return jsonify(resp)


@route_api.route("/good/mall_get")
def mall_get():
    resp = {'code': 200, 'msg': '操作成功', 'data': []}
    req = request.values
    good_id = req.get('goods_id')
    if not good_id:
        resp['code'] = '401'
        resp['msg'] = '请传入good_id'
    resp['data'] = pdd_spider.get_mall_info(good_id)
    return jsonify(resp)


@route_api.route("/good/reviews_get")
def reviews_get():
    resp = {'code': 200, 'msg': '操作成功', 'data': []}
    req = request.values
    good_id = req.get('good_id')
    page = req.get('page', 1)
    if not good_id:
        resp['code'] = '401'
        resp['msg'] = '请传入good_id'
        return jsonify(resp)
    jo = pdd_spider.get_reviews(good_id, page)
    resp['data'] = jo.get('data', [])
    return jsonify(resp)


@route_api.route("/good/find_goods")
def get_find_goods():
    PAGER_PER_COUNT = 50
    resp = {'code': 200, 'msg': '操作成功', 'data': []}
    req = request.values
    page = int(req.get('page', 0))
    data = list(db_mongo.get_table('plat2', 'find_goods').find().sort({'_id': -1}).skip(PAGER_PER_COUNT * page).limit(PAGER_PER_COUNT))
    for i in data:
        i.pop('_id')
        if not i.get('nick_name'):
            i['nick_name'] = '小编推荐'
        if not i.get('icon_url'):
            i['icon_url'] = 'https://aishangnet.club/static/mina_pic/QIYU.png'
    resp['data'] = data
    return jsonify(resp)


@route_api.route("/good/get_we_code")
def get_we_code():
    resp = {'code': 200, 'msg': '操作成功', 'data': {}}
    req = request.values
    g_id = int(req.get('goods_id', 0))
    m_id = int(req.get('m_id', 0))
    if not g_id or not m_id:
        resp['code'] = 500
        resp['msg'] = '需要参数goods_id 和  m_id'
        return jsonify(resp)
    resp['data']['we_code_url'] = we_code.good_share(g_id, m_id)
    return jsonify(resp)
