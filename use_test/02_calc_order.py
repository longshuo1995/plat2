import time

from common.libs import db_mongo
import pandas as pd
import csv

from common.libs.tools import StrTools

items = [i['custom_parameters'] for i in db_mongo.get_table('plat2', 'order').find({'order_status': {'$ne': 4}}, {'custom_parameters': 1})]
s = pd.Series(items)
ct = s.value_counts()

f = open('result.csv', 'w')
writer = csv.writer(f)

for cp in ct.index:
    # 查询nick_name, level, province
    self_info = db_mongo.get_table('plat2', 'member').find_one({'open_id': cp})
    if not self_info:
        self_info = {}
    leader_info = {}
    if self_info:
        leader_info = db_mongo.get_table('plat2', 'member').find_one({'open_id': self_info.get('leader_openid', '')})
        if not leader_info:
            leader_info = {}
    else:
        continue
    # 最后一单成交时间
    first_order = list(db_mongo.get_table('plat2', 'order').find({'custom_parameters': cp}).sort('order_create_time', 1).limit(1))[0]
    last_order = list(db_mongo.get_table('plat2', 'order').find({'custom_parameters': cp}).sort('order_create_time', -1).limit(1))[0]
    first_date = StrTools.convert_time(first_order['order_create_time'], '%Y-%m-%d %H:%M:%S')
    last_date = StrTools.convert_time(last_order['order_create_time'], '%Y-%m-%d %H:%M:%S')

    writer.writerow([int(ct[cp]), self_info.get('nick_name', ''), leader_info.get('nick_name', ''), first_date,
                     last_date])

