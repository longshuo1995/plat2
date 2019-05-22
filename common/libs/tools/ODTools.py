import project_conf
from common.libs import db_mongo
from common.libs.tools import StrTools


def get_order_msg(open_id, pages=0):
    count_per_page = 10
    query = {'$or': [{'custom_parameters': open_id}, {'refer_id': open_id}, {'leader_openid': open_id}, {'leader_master': open_id}]}
    res = db_mongo.get_table('plat2', 'order').find(query)
    count = res.count()
    infos = list(res.sort('order_create_time', -1).skip(pages * count_per_page).limit(count_per_page))
    data = {
        'count': count,
        'ods': infos
    }
    return data


def get_promotion_msg(od_items):
    m_p = {}
    for item in od_items:
        StrTools.add_value(m_p, item['custom_parameters'], item['total_promotion']*project_conf.rate_conf['self_rate'])
        StrTools.add_value(m_p, item['refer_id'], item['total_promotion']*project_conf.rate_conf['refer_rate'])
        StrTools.add_value(m_p, item['leader_openid'], item['total_promotion']*project_conf.rate_conf['leader_rate'])
        StrTools.add_value(m_p, item['leader_master'], item['master_promotion'])
    return m_p
