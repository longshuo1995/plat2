import json

import requests

from common.libs import db_mongo
from common.libs.pdd import pdd_decorate
from common.libs.tools import StrTools

url_get_banner = 'https://duoke678.com/pdd/config/getBannerList?bannerType=1'
operate_url = "https://duoke678.com/goods/activityGoods?id=%s&role=0"
detail_url = "https://duoke678.com/pdd/theme_search?theme_id=%s&uid=9110087"


def get_banner_list():
    tb = db_mongo.get_table('plat2', 'banner_goods')
    jo = requests.get(url_get_banner).json()
    for item in jo['data']:
        begin_time = StrTools.reconvert_time(item['beginTime'], '%Y-%m-%d %H:%M:%S')
        end_time = StrTools.reconvert_time(item['endTime'], '%Y-%m-%d %H:%M:%S')
        banner_url = item['banner_url']
        title = item['title']
        _id = item['navigate_url_Android']

        # 获取详情
        if item['navigate_url'].find('operateActivity') > 0:
            base_url = operate_url
            uniq_id = 'act_%s' % _id
        else:
            base_url = detail_url
            uniq_id = 'det_%s' % _id
        res = tb.find_one({'uniq_id': uniq_id})
        if res:
            continue
        url = base_url % _id
        jo_theme = requests.get(url).json()
        dt_list = []

        for them in jo_theme['data']:
            goods_id = them['goods_id']
            them_gd_item = pdd_decorate.search_good_detail(goods_id)
            dt_list.append(them_gd_item)
        temp = {
            'uniq_id': uniq_id,
            'begin_time': begin_time,
            'end_time': end_time,
            'banner_url': banner_url,
            'title': title,
            'goods_list': json.dumps(dt_list)
        }
        tb.insert_one(temp)


get_banner_list()
