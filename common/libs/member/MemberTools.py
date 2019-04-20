from common.libs import db_mongo

'''
注册：
refer_openid,
leader_openid,
leader_master,
'''


def upgrade(open_id):
    tb = db_mongo.get_table('plat2', 'member')
    info = tb.find_one({'_id': open_id})
    leader_master = info['leader_openid']
    if leader_master == open_id:
        leader_master = leader_master['leader_master']
    tb.update({'_id': open_id}, {'$set': {'level': 1, 'leader_openid': open_id,
                                          'refer_id': open_id, 'leader_master': leader_master}})
    tb.update({'refer_openid': open_id}, {'$set': {'leader_openid': open_id, 'leader_master': leader_master}})


if __name__ == '__main__':
    # tb = db_mongo.get_table('plat2', 'member').find({'refer_openid': })
    upgrade('ohl4g5USDznFdyo9qVFmZQcOn-6Q')
