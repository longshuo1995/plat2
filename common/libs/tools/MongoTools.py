import requests

import project_conf
from common.libs import db_mongo
import pandas as pd


def search_member_order(open_id):
    items = db_mongo.get_table('plat2', 'order').find({
        '$or': [{'custom_parameters': open_id}, {'refer_id': open_id},
                {'leader_openid': open_id}, {'leader_master': open_id}],
        'order_status': {'$in': [1, 2, 3]}
    })
    df = pd.DataFrame(items)
    order_counts = len(df)
    promotion = 0
    promotion += df[df['custom_parameters'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['self_rate']
    promotion += df[df['refer_id'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['refer_rate']
    promotion += df[df['leader_openid'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['leader_rate']
    promotion += df[df['leader_master'] == open_id]['total_promotion'].sum() * project_conf.rate_conf['relation_rate']
    return order_counts, promotion


if __name__ == '__main__':
    res = search_member_order('ohl4g5USDznFdyo9qVFmZQcOn-6Q')
    print(res)
