import time

from common.libs import db_mongo
from common.libs.pdd import pdd_tools


def start():
    time_interval = 5 * 60
    current_time = (time.time() // time_interval) * time_interval
    before_time = current_time - time_interval
    l = pdd_tools.order_search(int(before_time), int(current_time))
    order_items = l.get('order_list_get_response', {}).get('order_list', [])
    tbl = db_mongo.get_table('plat2', 'member')
    for item in order_items:
        item['_id'] = item['order_sn']
        old_order = tbl.find_one({'_id': item['_id']})


