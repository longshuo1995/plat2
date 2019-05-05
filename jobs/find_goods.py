import time

import requests

from common.libs import db_mongo
from common.libs.pdd import pdd_tools


def update_goods():
    url = 'https://duoke678.com/pdd/config/getDKGoodsStoreByType?type=5&role=3&pageNum=1'
    jo = requests.get(url).json()
    tb = db_mongo.get_table('plat2', 'find_goods')
    items = jo['storeGoodsList']
    items.reverse()
    for good in items:
        goods_id = good['goods_id']
        create_time = good['suggestTime']
        if tb.find_one({'create_time': create_time}):
            continue
        good_detail = pdd_tools.search_good_detail(goods_id, 'create_find')
        gd = good_detail['goods_promotion_url_generate_response']['goods_promotion_url_list'][0]
        gdd = gd['goods_detail']
        row_price = gdd['min_group_price']
        coupon_discount = gdd['coupon_discount']
        promotion_rate = gdd['promotion_rate']
        temp = {
            'insert_time': int(time.time()),
            'desc': good['desc'],
            'goods_id': gdd['goods_id'],
            'goods_thumbnail_url': gdd['goods_thumbnail_url'],
            'goods_name': gdd['goods_name'],
            'row_price': row_price,
            'coupon_discount': coupon_discount,
            'min_price': row_price - coupon_discount,
            'create_time': create_time,
            'promotion_rate': promotion_rate,
            'imgurls': [i['img'] for i in good['banners']],
            'mobile_short_url': gd['mobile_short_url']
        }
        tb.insert_one(temp)


if __name__ == '__main__':
    update_goods()
