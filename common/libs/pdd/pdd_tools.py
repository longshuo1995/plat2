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
        # "client_id": '8176931',
    }
    params = dict(base_params, **added_params)
    params['sign'] = calc_sign(params)
    jo = requests.post(api_url, data=params, verify=False).json()
    return jo


def mall_good(mall_id, page_size, p):
    added_params = {
        "type": "pdd.ddk.mall.goods.list.get",
        'page_number': p,
        "mall_id": mall_id,
        "page_size": page_size
    }
    return pdd_request(added_params)


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
        'generate_we_app': 'true',
        # 'zs_duo_id': base_setting.zs_duo_id
    }
    return pdd_request(added_params)


def search_order_by_sn(order_sn):
    added_params = {
        "type": 'pdd.ddk.order.detail.get',
        "order_sn": order_sn,
    }
    return pdd_request(added_params)


def order_search(start_time, end_time):
    start_time = int(start_time)
    end_time = int(end_time)
    print(start_time)
    print(end_time)
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
    return pdd_request(added_params)


def get_detail2(good_id):
    added_params = {
        "type": "pdd.ddk.goods.detail",
        'goods_id_list': '["%s"]' % good_id,
    }
    r = pdd_request(added_params)
    res = r.get('goods_detail_response', {}).get('goods_details', [{}])[0]
    return res



if __name__ == '__main__':
    # res = hot_goods_range(sort_type=1, offset=0, limit=50)
    # print(res)
    # res = order_search('1553556662', '1553643062')
    # print(res)
    # res = search_order_by_sn('190324-270806221493150')
    # print(res)
    # res = search_good_detail('2714877164', '0')
    res = get_detail2('2714877164')
    print(res)




'''
85469664828093b810ee83b363895f03297f2ae6client_ide46a7a383d3d480a913107fac24d04cadata_typeJSONkeyword包包opt_id0page3page_size50sort_type0timestamp1556329022typepdd.ddk.goods.search85469664828093b810ee83b363895f03297f2ae6
'''

