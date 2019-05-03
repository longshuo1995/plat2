# 1.查找昨天新注册的用户  &&  leader_id为 空    refer_id为空
# 2.向上查找该用户的团长。
from common.libs import db_mongo

items = list(db_mongo.get_table('plat2', 'member').find({'create_time': {'$gt': 1556759914}}))
print(len(items))
for item in items:
    if item['refer_id'] == '':
        print('refer_id is null')
        print(item)
    if item['leader_openid'] == '':
        print('leader_id is null')
        print(item)





