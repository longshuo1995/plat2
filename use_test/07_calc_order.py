import time

from common.libs import db_mongo
from common.libs.pdd import pdd_tools
from common.libs.tools import StrTools
from jobs import update_order

tm = int(time.time())

start_tm = 1553697330
ct = 0
crawled_id = set()


def insert_od(start_time, end_time):
    global ct
    l = pdd_tools.order_search(int(start_time), int(end_time))
    order_items = l.get('order_list_get_response', {}).get('order_list', [])
    for item in order_items:
        open_id = item['custom_parameters']
        if item['order_sn'] in crawled_id:
            continue
        if item.get('order_status') in [3, 5]:
            ct += 1
            continue
        crawled_id.add(item['order_sn'])
        user_info = db_mongo.get_table('plat2', 'member').find_one({'open_id': open_id})
        if not user_info:
            user_info = {}
        upd = StrTools.filter_map(item)
        upd['_id'] = upd['order_sn']
        upd["refer_id"] = user_info.get('refer_id', '')
        upd["leader_openid"] = user_info.get("leader_openid", '')
        upd["leader_master"] = user_info.get("leader_master", '')
        upd["total_promotion"] = round(item['promotion_rate'] * item['order_amount'] / 100000, 2)
        upd['create_time'] = StrTools.convert_time(int(item['order_create_time']), '%Y-%m-%d %H:%M')
        upd['order_status'] = 6
        upd['order_status_desc'] = '审核通过'
        db_mongo.get_table('plat2', 'order').insert_one(upd)


while start_tm < tm:
    time_interval = 24*60*60
    insert_od(start_tm, start_tm+time_interval)
    start_tm += time_interval
    print(ct)
