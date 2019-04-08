import json
import time

import requests

from common.libs.tools import StrTools
from config import base_setting
from spider import pdd_spider

api_url = 'https://gw-api.pinduoduo.com/api/router'


def calc_sign(params):
    sign = '%s' % base_setting.PDD_APP['client_secret']
    items = sorted(params.items(), key=lambda x: x[0])
    for item in items:
        sign += '%s%s' % (item[0], item[1])
    sign += base_setting.PDD_APP['client_secret']
    md5_sign = StrTools.get_md5(sign)
    return md5_sign


def pdd_request(added_params):
    base_params = {
        "data_type": "JSON",
        "timestamp": int(time.time()),
        "client_id": base_setting.PDD_APP['client_id'],
    }
    params = dict(base_params, **added_params)
    print(params)
    params['sign'] = calc_sign(params)
    jo = requests.post(api_url, data=params, verify=False).json()
    return jo


def opt_get(parent_opt_id=0):
    added_params = {
        "type": "pdd.goods.opt.get",
        'parent_opt_id': parent_opt_id
    }
    return pdd_request(added_params)


def search_goods(keyword, sort_type=0, p=1, opt_id=0, page_size=base_setting.show_every_page):
    added_params = {
        "type": "pdd.ddk.goods.search",
        "keyword": keyword,
        'sort_type': sort_type,
        'page': p,
        'page_size': page_size,
        'opt_id': opt_id
    }
    return pdd_request(added_params)


def search_good_detail(good_id, custom_parameters):
    added_params = {
        'type': 'pdd.ddk.goods.promotion.url.generate',
        'p_id': base_setting.p_id,
        'goods_id_list': '["%s"]' % good_id,
        'custom_parameters': custom_parameters,
        'generate_we_app': 'true'
    }
    return pdd_request(added_params)


def search_order_by_sn(order_sn):
    added_params = {
        "type": 'pdd.ddk.order.detail.get',
        "order_sn": order_sn,
    }
    return pdd_request(added_params)


def order_search(start_time, end_time):
    added_params = {
        "type": "pdd.ddk.order.list.increment.get",
        'start_update_time': start_time,
        'end_update_time': end_time
    }
    return pdd_request(added_params)


def hot_goods_range(sort_type=1, offset=0, limit=50):
    added_params = {
        "type": "pdd.ddk.top.goods.list.query",
        'offset': offset,
        'sort_type': sort_type,
        'limit': limit
    }
    print(added_params)
    return pdd_request(added_params)


if __name__ == '__main__':
    res = hot_goods_range(sort_type=1, offset=0, limit=50)
    print(res)
    # res = order_search('1553556662', '1553643062')
    # print(res)
    # res = search_order_by_sn('190324-270806221493150')
    # print(res)
    # res = opt_get('0')
    # print(res)


