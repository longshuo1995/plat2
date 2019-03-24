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
