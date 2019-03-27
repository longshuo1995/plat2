import time

from common.libs import db_mongo
from common.libs.pdd import pdd_tools
from common.libs.tools import StrTools


def start_update_order(time_interval=60):
    current_time = (time.time() // time_interval) * time_interval
    before_time = current_time - time_interval
    l = pdd_tools.order_search(int(before_time), int(current_time))
    order_items = l.get('order_list_get_response', {}).get('order_list', [])
    print(order_items)
    tbl = db_mongo.get_table('plat2', 'order')
    for item in order_items:
        item['_id'] = item['order_sn']
        old_order = tbl.find_one({'_id': item['_id']})
        if old_order:
            if old_order['order_status'] != item['order_status']:
                tbl.update({'_id': item['_id']}, {'$set':
                {'order_status': item['order_status'], 'order_status_desc': item['order_status_desc']}})
        else:
            open_id = item['custom_parameters']
            user_info = db_mongo.get_table('plat2', 'member').find_one({'_id': open_id})
            if not user_info:
                user_info = {}
            upd = StrTools.filter_map(item)
            upd["refer_id"] = user_info.get('refer_id', '')
            upd["leader_openid"] = user_info.get("leader_openid", '')
            upd["leader_master"] = user_info.get("leader_master", '')
            upd["total_promotion"] = round(item['promotion_rate'] * item['order_amount'] / 100000, 2)
            tbl.insert_one(upd)


if __name__ == '__main__':
    start_update_order(24*60*60)

