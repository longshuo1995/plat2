import time

import requests

from common.libs.tools import StrTools
from config import base_setting

api_url = 'https://gw-api.pinduoduo.com/api/router'


def calc_sign(params):
    sign = '%s' % base_setting.PDD_APP['client_secret']
    items = sorted(params.items(), key=lambda x: x[0])
    for item in items:
        sign += '%s%s' % (item[0], item[1])
    sign += base_setting.PDD_APP['client_secret']
    md5_sign = StrTools.get_md5(sign)
    return md5_sign


def search_goods(keyword, sort_type=0, p=1, page_size=base_setting.show_every_page):
    params = {
        "type": "pdd.ddk.goods.search",
        "data_type": "JSON",
        "timestamp": int(time.time()),
        "client_id": base_setting.PDD_APP['client_id'],
        "keyword": keyword,
        'sort_type': sort_type,
        'p': p,
        'page_size': page_size,
    }
    params['sign'] = calc_sign(params)
    jo = requests.post(api_url, data=params).json()
    return jo


def search_good_by_order_sn(order_sn):
    '''
    https://gw-api.pinduoduo.com/api/router?type=pdd.ddk.order.detail.get&data_type=JSON&timestamp=1553453291&client_id=e46a7a383d3d480a913107fac24d04ca&order_sn=190324-270806221493150&sign=6EB7C3EE3A41109FA7CEA2B95FC3149B
    '''
    params = {
        "type": 'pdd.ddk.order.detail.get',
        "client_id": "e46a7a383d3d480a913107fac24d04ca",
        "order_sn": order_sn,
        "data_type": "JSON",
    }
    params['sign'] = calc_sign(params)
    jo = requests.post(api_url, data=params).json()
    return jo


def order_search():
    '''
    https://gw-api.pinduoduo.com/api/router?type=pdd.ddk.order.list.increment.get&data_type=JSON&timestamp=1553453559&client_id=e46a7a383d3d480a913107fac24d04ca&start_update_time=1553438094&end_update_time=1553441694&sign=E284E5B0B2891622B802B1D107BC7EC2
    '''


if __name__ == '__main__':
    params = {
        "type": "pdd.ddk.goods.promotion.url.generate",
        "data_type": "JSON",
        "timestamp": 1553435269,
        "client_id": "e46a7a383d3d480a913107fac24d04ca",
        "p_id": "8475051_56582557",
        "goods_id_list": "[\"6799147167\"]",
        "generate_we_app": "true",
        # "sign": "BD0DA1E179918769B0A7C41F68CB7C85"
    }
    params = {
        "type": "pdd.ddk.goods.search",
        "data_type": "JSON",
        "timestamp": 1553435939,
        "client_id": "e46a7a383d3d480a913107fac24d04ca",
        "keyword": "花瓶",
        # "sign": "B9ABB8CDBF168BE630D9CA7C583AEBAF"
    }
    goods = search_goods('')
    print(goods)

    # sign = calc_sign(params)
    # print(sign)
