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


# def upgrade_order():

if __name__ == '__main__':
    items = db_mongo.get_table('plat2', 'member').find({'level': 1})
    for item in items:
        upgrade(item['open_id'])
    # upgrade('ohl4g5cpaQ2bYaQe8esGz9xVbAxk')
