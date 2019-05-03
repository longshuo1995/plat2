# 1.查找昨天新注册的用户  &&  leader_id为 空    refer_id为空
# 2.向上查找该用户的团长。
from common.libs import db_mongo

items = list(db_mongo.get_table('plat2', 'member').find({'create_time': {'$gt': 1556759914}}))
print(len(items))


def get_leader_id(open_id):
    if not open_id:
        return ''
    info = db_mongo.get_table('plat2', 'member').find_one({'open_id': open_id})
    leader_id = info['leader_openid']
    if not leader_id:
        leader_id = get_leader_id(info['refer_id'])
    return leader_id


for item in items:
    if item['leader_openid'] == '':
        leader_id = get_leader_id(item['open_id'])
        db_mongo.get_table('plat2', 'member').update({'_id': item['open_id']}, {'$set': {'leader_openid': leader_id}})

