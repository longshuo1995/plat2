import time

from common.libs import db_mongo
from common.libs.pdd import pdd_tools


def update_db_by_order(order_sn):
    tb = db_mongo.get_table('plat2', 'order')
    new_res = pdd_tools.search_order_by_sn(order_sn)
    if not new_res.get('order_detail_response'):
        return 0
    upd = new_res.get('order_detail_response')
    upd['_id'] = order_sn
    row = tb.find_one({'_id': order_sn})
    open_id = upd['custom_parameters']
    user_info = db_mongo.get_table('plat2', 'member').find_one({'open_id': open_id})
    upd["refer_id"] = user_info.get('refer_id', '')
    upd["leader_openid"] = user_info.get("leader_openid", '')
    upd["leader_master"] = user_info.get("leader_master", '')
    if row:
        tb.update({'_id': order_sn}, upd)
    else:
        tb.insert_one(upd)


def search_good_detail(goods_id, custom_parames=''):
    good_detail = pdd_tools.search_good_detail(goods_id, custom_parames)
    gd = good_detail['goods_promotion_url_generate_response']['goods_promotion_url_list'][0]
    gdd = gd['goods_detail']
    row_price = gdd['min_group_price']
    coupon_discount = gdd['coupon_discount']
    promotion_rate = gdd['promotion_rate']
    temp = {
        'sold_quantity': gdd.get('sales_tip', 0),
        'goods_id': gdd['goods_id'],
        'goods_thumbnail_url': gdd['goods_thumbnail_url'],
        'goods_name': gdd['goods_name'],
        'row_price': row_price,
        'coupon_discount': coupon_discount,
        'min_price': row_price - coupon_discount,
        'promotion_rate': promotion_rate,
        'mobile_short_url': gd['mobile_short_url']
    }
    return temp
