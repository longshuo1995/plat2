import json
import os
import time

import project_conf
from common.libs import db_mongo
import pandas as pd

from common.libs.pdd import pdd_tools

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
    for good_id in value_count.index[:50]:
        # info 不走缓存， 走搜索
        info = pdd_tools.search_good_detail(good_id, 'xx')
        dt = info.get('goods_promotion_url_generate_response', {}).get('goods_promotion_url_list', [{}])[0]
        # if not info.get('duo_coupon_amount'):
        #     continue
        goods_detail = dt.get('goods_detail', {})
        temp = {
            'goods_id': goods_detail['goods_id'],
            'goods_name': goods_detail['goods_name'],
            'goods_thumbnail_url': goods_detail['goods_thumbnail_url'],
            'row_price': goods_detail['min_group_price'],
            'min_price': goods_detail['min_group_price'] - goods_detail.get('coupon_discount', 0),
            'coupon_discount': goods_detail.get('coupon_discount', 0),
            'promotion_rate': goods_detail['promotion_rate'],
            # 修改为自己的数据
            'sold_quantity': int(value_count[good_id])
        }
        out_file.write('%s\n' % json.dumps(temp))
    out_file.close()


# 粉丝计算
def calc_top_user(offset_time):
    c_time = int(time.time())
    door_time = c_time - offset_time
    items = db_mongo.get_table('plat2', 'member').find(
        {'create_time': {'$gt': door_time}})
    # 计算粉丝数
    df = pd.DataFrame(items)
    self_mem = df['refer_id'][df['refer_id'] != ''][df['refer_id'] != df['_id']].value_counts()
    self_mem = self_mem.sort_values(ascending=False)

    group_mem = df['leader_openid'][df['leader_openid'] != ''][df['leader_openid'] != df['_id']].value_counts()
    group_mem = group_mem.sort_values(ascending=False)

    self_file_nm = os.path.join(project_conf.assert_path, project_conf.fengyun_range_pg['self']['member'])
    self_file = open(self_file_nm, 'w')
    group_file_nm = os.path.join(project_conf.assert_path, project_conf.fengyun_range_pg['group']['member'])
    group_file = open(group_file_nm, 'w')
    tb_mem = db_mongo.get_table('plat2', 'member')
    title = '粉丝'
    for idx in self_mem.index[:20]:
        mem_info = tb_mem.find_one({'_id': idx})
        if not mem_info:
            continue
        temp = {
            'id': idx,
            'nick_name': mem_info['nick_name'],
            'icon': mem_info['icon_url'],
            'title': title,
            'value': int(self_mem[idx])
        }
        self_file.write('%s\n' % json.dumps(temp))
    for idx in group_mem.index[:20]:
        mem_info = tb_mem.find_one({'_id': idx})
        if not mem_info:
            continue
        temp = {
            'id': idx,
            'nick_name': mem_info['nick_name'],
            'icon': mem_info['icon_url'],
            'title': title,
            'value': int(group_mem[idx])
        }
        group_file.write('%s\n' % json.dumps(temp))

    self_file.close()
    group_file.close()


# 佣金排行榜计算
def calc_top_promotion(offset_time):
    c_time = int(time.time())
    door_time = c_time - offset_time
    # m
    items = db_mongo.get_table('plat2', 'order').find(
        {
            'order_create_time': {'$gt': door_time},
            'order_status': {'$ne': 4}
         })
    l = list(items)
    if not l:
        return
    df = pd.DataFrame(l)

    # 个人佣金
    custom_promotion = df['total_promotion'].groupby(df['custom_parameters']).sum()
    custom_promotion = custom_promotion * project_conf.rate_conf['self_rate']

    # 老师佣金
    refer_promotion = df[df['refer_id'] != ''][df['refer_id'] != df['leader_openid']]['total_promotion'].groupby(df['refer_id']).sum()
    refer_promotion = refer_promotion * project_conf.rate_conf['refer_rate']
    # 团长+老师为同一人的佣金
    leader_refer_promotion = df[df['refer_id'] != ''][df['refer_id'] == df['leader_openid']]['total_promotion'].groupby(df['refer_id']).sum()
    leader_refer_promotion = leader_refer_promotion * (project_conf.rate_conf['leader_rate'] +
                                                       project_conf.rate_conf['refer_rate'])
    refer_promotion = refer_promotion.add(leader_refer_promotion, fill_value=0)

    # 团长佣金
    leader_promotion = df[df['leader_openid'] != '']['total_promotion'].groupby(df['leader_openid']).sum()
    group_promotion = leader_promotion.sort_values(ascending=False)
    # relation_promotion = df[df['leader_master'] != '']['total_promotion'].groupby(df['leader_master']).sum()

    # 个人榜（个人+老师）
    self_promotion = custom_promotion.add(refer_promotion, fill_value=0)
    self_promotion = self_promotion.sort_values(ascending=False)

    self_file_nm = os.path.join(project_conf.assert_path, project_conf.fengyun_range_pg['self']['promotion'])
    self_file = open(self_file_nm, 'w')
    group_file_nm = os.path.join(project_conf.assert_path, project_conf.fengyun_range_pg['group']['promotion'])
    group_file = open(group_file_nm, 'w')
    tb_mem = db_mongo.get_table('plat2', 'member')
    title = '分享赚'
    for idx in self_promotion.index[:20]:
        mem_info = tb_mem.find_one({'_id': idx})
        if not mem_info:
            continue
        name = mem_info['nick_name']
        name = name if len(name) <= 6 else name[:3] + '...' + name[-3:]
        temp = {
            'id': idx,
            'nick_name':  name,
            'icon': mem_info['icon_url'],
            'title': title,
            'value': round(float(self_promotion[idx]), 2)
        }
        self_file.write('%s\n' % json.dumps(temp))

    for idx in group_promotion.index[:20]:
        mem_info = tb_mem.find_one({'_id': idx})
        if not mem_info:
            continue
        name = mem_info['nick_name']
        name = name if len(name) <= 6 else name[:3] + '...' + name[-3:]
        temp = {
            'id': idx,
            'nick_name': name,
            'icon': mem_info['icon_url'],
            'title': title,
            'value': round(float(group_promotion[idx]), 2)
        }
        group_file.write('%s\n' % json.dumps(temp))
    self_file.close()
    group_file.close()


if __name__ == '__main__':
    calc_top_promotion(30 * project_conf.seconds_per_day)
    calc_top_user(30 * project_conf.seconds_per_day)
    # for item in project_conf.qiyu_range_pg:
    #     judge_local(item[0], item[1])

