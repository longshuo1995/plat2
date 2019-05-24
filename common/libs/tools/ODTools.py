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
        StrTools.add_value(m_p, item['custom_parameters'], int(item['total_promotion']*project_conf.rate_conf['self_rate']*100))
        StrTools.add_value(m_p, item['refer_id'], int(item['total_promotion']*project_conf.rate_conf['refer_rate']*100))
        StrTools.add_value(m_p, item['leader_openid'], int(item['total_promotion']*project_conf.rate_conf['leader_rate']*100))
        StrTools.add_value(m_p, item['leader_master'], int(item.get('master_promotion', 0)*100))
        StrTools.add_value(m_p, item['leader_openid'], int(item.get('other_promotion', 0)*100))
    return m_p


def upd_finance(m_p):
    tb_finance = db_mongo.get_table('plat2', 'finance')
    for item in m_p.items():
        finance_info = tb_finance.find_one({'open_id': item[0]})
        if not finance_info:
            finance_info = {'open_id': item[0], 'finance': item[1]}
            tb_finance.insert_one(finance_info)
        else:
            fin = (finance_info['finance'] + item[1])
            tb_finance.update({'_id': finance_info['_id']}, {'$set': {'finance': fin}})
