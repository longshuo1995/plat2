from common.libs import db_mongo

'''
注册：
refer_openid,
leader_openid,
leader_master,
'''


def upgrade(open_id, set_leader_master=False):
    tb = db_mongo.get_table('plat2', 'member')
    info = tb.find_one({'open_id': open_id})
    leader_master = ''
    if set_leader_master:
        leader_master = info['leader_openid']
        if leader_master == open_id:
            leader_master = ''

    tb.update({'open_id': open_id}, {'$set': {'level': 1, 'leader_openid': open_id,
                                          'refer_id': open_id, 'leader_master': leader_master}})
    # tb.update({'refer_id': open_id}, {'$set': {'leader_openid': open_id, 'leader_master': leader_master}})
    upgrade_leader(open_id, open_id)


# 递归计算(member_id的所有下级...   都更新为leader_id的团员)
def upgrade_leader(member_id, leader_id):
    # 所有子级
    member_items = db_mongo.get_table('plat2', 'member').find({'refer_id': member_id, 'open_id': {'$ne': member_id}},
                                                              {'open_id': 1})
    db_mongo.get_table('plat2', 'member').update_many({'refer_id': member_id}, {'$set': {'leader_openid': leader_id}})
    for item in member_items:
        upgrade_leader(item['open_id'], leader_id)


def get_msg(open_id):
    if not open_id:
        return {}
    info = db_mongo.get_table('plat2', 'member').find_one({'open_id': open_id})
    if info:
        resp = {
            'open_id': open_id,
            'nick_name': info['nick_name'],
            'icon_url': info['icon_url']
        }
        return resp
    return {}


def get_refer_msg(open_id, pages=0):
    info = db_mongo.get_table('plat2', 'member').find({'refer_id': open_id, 'open_id': {'$ne': open_id}})
    count_per_page = 10
    resp = {
        'count': info.count(),
        'mebs': list(info.sort('_id', -1).skip(pages*count_per_page).limit(count_per_page))
    }
    return resp


def get_indirect_msg(open_id, pages=0):
    info = db_mongo.get_table('plat2', 'member').find({'leader_openid': open_id, 'refer_id': {'$ne': open_id}})
    count_per_page = 10
    resp = {
        'count': info.count(),
        'mebs': list(info.sort('_id', -1).skip(pages*count_per_page).limit(count_per_page))
    }
    return resp


if __name__ == '__main__':
    # items = db_mongo.get_table('plat2', 'member').find({'level': 1})
    # for item in items:
    #     upgrade(item['open_id'])
    upgrade('ohl4g5eUYodrae6lGu0XAWtlldlE', set_leader_master=True)
