import time

import requests

url = 'http://gw-api.pinduoduo.com/api/router'
data = {
    'p_id': '81_1812886',
    'goods_id_list': [10060234],
    'type': 'pdd.ddk.goods.promotion.url.generate',
    # 'data_type': 'JSON',
    'timestamp': str(int(time.time()*1000)),
    'client_id': 'f71f13b170dad5a173bbe1bea43ecde2',
    'sign': 'A158E9FB6068BB6F2647BB33B80AA783'
    # 'goods_id_list': '[812681665]',
}

r = requests.post(url, json=data).text
print(r)
