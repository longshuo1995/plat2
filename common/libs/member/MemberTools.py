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
    tb.update({'_id': open_id}, {'$set': {'level': 1, 'leader_openid': open_id,
                                          'leader_master': info['leader_openid']}})
    tb.update({'refer_openid': open_id}, {'$set': {'leader_openid': open_id, 'leader_master': info['leader_openid']}})
