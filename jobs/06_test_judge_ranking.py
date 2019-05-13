import json
import os
import time

import project_conf
from common.libs import db_mongo
import pandas as pd
DAY_SECONDS = 24*60*60
top_count = 20


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
    other_promotion = df[df['other_promotion'] == 1]['other_promotion'].groupby(df['leader_openid']).sum()
    leader_promotion = df[df['leader_openid'] != 'leader_openid']['total_promotion'].groupby(df['leader_openid']).sum()
    leader_promotion = leader_promotion.add(other_promotion, fill_value=0)
    group_promotion = leader_promotion.sort_values(ascending=False)
    tb_mem = db_mongo.get_table('plat2', 'member')
    for i in group_promotion.index:
        mem_info = tb_mem.find_one({'open_id': i})
        if not mem_info:
            print('*'*11)
            print(i)
            print(group_promotion.index[i])



calc_top_promotion(30*DAY_SECONDS)
