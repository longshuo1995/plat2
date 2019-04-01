import json
import os
import time

import project_conf
from common.libs import db_mongo
import pandas as pd

DAY_SECONDS = 24*60*60

# db.order.find({'order_create_time': {'$gt': 1550977586}});


def judge_local(offset_time, file_nm):
    c_time = int(time.time())
    door_time = c_time - offset_time
    items = db_mongo.get_table('plat2', 'order').find(
        {'order_create_time': {'$gt': door_time}},
        {'goods_id': 1, '_id': 0},
    )
    goods_ids = []
    for item in items:
        goods_ids.append(item['goods_id'])

    s = pd.Series(goods_ids)
    value_count = s.value_counts()
    path_nm = os.path.join(project_conf.project_path, 'asserts', file_nm)
    out_file = open(path_nm, 'w')
    for good_id in value_count.index:
        info = db_mongo.get_table('plat2', 'order').find_one({'goods_id': good_id, 'order_status': {'$ne': 4}})
        # if not info.get('duo_coupon_amount'):
        #     continue
        temp = {
            'id': int(good_id),
            'title': info['goods_name'],
            'icon': info['goods_thumbnail_url'],
            'price': str(round(info['order_amount']/100, 2)),
            'discount': info['total_promotion'],
            'sale_count': int(value_count[good_id])
        }
        out_file.write('%s\n' % json.dumps(temp))
    out_file.close()


def calc_top_user(offset_time):
    c_time = int(time.time())
    door_time = c_time - offset_time
    items = db_mongo.get_table('plat2', 'member').find(
        {'create_time': {'$gt': door_time}})
    # 计算粉丝数
    df = pd.DataFrame(items)
    self_mem = df['refer_id'][df['refer_id'] != ''].value_counts()
    group_mem = df['leader_openid'][df['leader_openid'] != ''].value_counts()

    self_file_nm = os.path.join(project_conf.assert_path, project_conf.fengyun_range_pg['self']['member'])
    self_file = open(self_file_nm, 'w')
    group_file_nm = os.path.join(project_conf.assert_path, project_conf.fengyun_range_pg['group']['member'])
    group_file = open(group_file_nm, 'w')
    tb_mem = db_mongo.get_table('plat2', 'member')
    title = '粉丝:'
    for idx in self_mem.index:
        mem_info = tb_mem.find_one({'_id': idx})
        if not mem_info:
            continue
        temp = {
            'id': idx,
            'nick_name': mem_info['nick_name'],
            'icon': mem_info['icon_url'],
            'title': title,
            'value': self_mem[idx]
        }
        self_file.write('%s\n' % json.dumps(temp))
    for idx in group_mem.index:
        mem_info = tb_mem.find_one({'_id': idx})
        if not mem_info:
            continue
        temp = {
            'id': idx,
            'nick_name': mem_info['nick_name'],
            'icon': mem_info['icon_url'],
            'title': title,
            'value': group_mem[idx]
        }
        group_file.write('%s\n' % json.dumps(temp))

    self_file.close()
    group_file.close()


def calc_top_promotion(offset_time):
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

    self_file_nm = os.path.join(project_conf.assert_path, project_conf.fengyun_range_pg['self']['promotion'])
    self_file = open(self_file_nm, 'w')
    group_file_nm = os.path.join(project_conf.assert_path, project_conf.fengyun_range_pg['group']['promotion'])
    group_file = open(group_file_nm, 'w')
    tb_mem = db_mongo.get_table('plat2', 'member')
    title = '分享赚:'
    for idx in self_promotion.index:
        mem_info = tb_mem.find_one({'_id': idx})
        if not mem_info:
            continue
        temp = {
            'id': idx,
            'nick_name': mem_info['nick_name'],
            'icon': mem_info['icon_url'],
            'title': title,
            'value': self_promotion[idx]
        }
        self_file.write('%s\n' % json.dumps(temp))

    for idx in group_promotion.index:
        mem_info = tb_mem.find_one({'_id': idx})
        if not mem_info:
            continue
        temp = {
            'id': idx,
            'nick_name': mem_info['nick_name'],
            'icon': mem_info['icon_url'],
            'title': title,
            'value': group_promotion[idx]
        }
        group_file.write('%s\n' % json.dumps(temp))
    self_file.close()
    group_file.close()


if __name__ == '__main__':
    calc_top_promotion(7 * project_conf.seconds_per_day)
    calc_top_user(7 * project_conf.seconds_per_day)
    for item in project_conf.qiyu_range_pg:
        judge_local(item[0], item[1])

