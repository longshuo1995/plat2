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
            'id': int(good_id),
            'title': info['goods_name'],
            'icon': info['goods_thumbnail_url'],
            'price': str(round(info['order_amount']/100, 2)),
            'discount': str(round(info['duo_coupon_amount']/100, 2)),
            'sale_count': int(value_count[good_id])
        }
        out_file.write('%s\n' % json.dumps(temp))
    out_file.close()


def calc_top_user(offset_time):
    c_time = int(time.time())
    door_time = c_time - offset_time
    # m
    items = db_mongo.get_table('plat2', 'order').find(
        {'order_create_time': {'$gt': door_time}})
    df = pd.DataFrame(items)
    custom_promotion = df[df['custom_parameters'] != '']['total_promotion'].groupby(df['custom_parameters']).sum()
    custom_promotion = custom_promotion * project_conf.rate_conf['self_rate']
    refer_promotion = df[df['refer_id'] != '']['total_promotion'].groupby(df['refer_id']).sum()
    refer_promotion = refer_promotion * project_conf.rate_conf['refer_rate']
    leader_promotion = df[df['leader_openid'] != '']['total_promotion'].groupby(df['leader_openid']).sum()
    leader_promotion = leader_promotion * project_conf.rate_conf['leader_rate']
    # relation_promotion = df[df['leader_master'] != '']['total_promotion'].groupby(df['leader_master']).sum()

    self_promotion = custom_promotion.add(refer_promotion, fill_value=0)
    group_promotion = self_promotion.add(leader_promotion, fill_value=0)

    self_file_nm = os.path.join(project_conf.project_path, 'asserts', 'self_promotion')
    self_file = open(self_file_nm, 'w')
    group_file_nm = os.path.join(project_conf.project_path, 'asserts', 'group_promotion')
    group_file = open(group_file_nm, 'w')

    for idx in self_promotion.index:
        self_file.write('%s\t%s\n' % (idx, self_promotion[idx]))

    for idx in group_promotion.index:
        group_file.write('%s\t%s\n' % (idx, group_promotion[idx]))
    self_file.close()
    group_file.close()


if __name__ == '__main__':
    calc_top_user(1100000)
    # judge_24h()

