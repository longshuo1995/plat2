from common.libs import db_mongo


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
