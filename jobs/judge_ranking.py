import json
import os
import time

import project_conf
from common.libs import db_mongo
import pandas as pd

DAY_SECONDS = 24*60*60


# db.order.find({'order_create_time': {'$gt': 1550977586}});


def judge_24h():
    offset_time = 30 * DAY_SECONDS
    file_nm = '24h_ranking'
    judge_local(offset_time, file_nm)


def judge_local(offset_time, file_nm):

    c_time = int(time.time())
    door_time = c_time - offset_time

    items = db_mongo.get_table('plat2', 'order').find(
        {'order_create_time': {'$gt': door_time}},
        {'goods_id': 1, '_id': 0})
    goods_ids = []
    for item in items:
        goods_ids.append(item['goods_id'])

    s = pd.Series(goods_ids)
    value_count = s.value_counts()
    path_nm = os.path.join(project_conf.project_path, 'asserts', file_nm)
    out_file = open(path_nm, 'w')
    for good_id in value_count.index:
        info = db_mongo.get_table('plat2', 'order').find_one({'goods_id': good_id})
        temp = {
            'id': str(int(good_id)),
            'title': info['goods_name'],
            'icon': "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1976195564,3037788353&fm=27&gp=0.jpg",
            'price': str(round(info['order_amount']/100, 2)),
            'discount': str(round(info['duo_coupon_amount']/100, 2)),
            'sale_count': int(value_count[good_id])
        }
        print(temp)
        out_file.write('%s\n' % json.dumps(temp))
    out_file.close()


def calc_top_user(offset_time, file_name):
    c_time = int(time.time())
    door_time = c_time - offset_time
    items = db_mongo.get_table('plat2', 'order').find(
        {'order_create_time': {'$gt': door_time}})
    df = pd.DataFrame(items)
    print(df)


if __name__ == '__main__':
    calc_top_user(11)
