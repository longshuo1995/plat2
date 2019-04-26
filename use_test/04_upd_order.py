from common.libs import db_mongo
open_id = 'ohl4g5USDznFdyo9qVFmZQcOn-6Q'
query = {'$or': [{'custom_parameters': open_id}, {'refer_id': open_id}, {'leader_openid': open_id}, {'leader_master': open_id}]}
items = db_mongo.get_table('plat2', 'order').find(query)
for item in items:
    print(item)
    print(item['order_status'])
    # info = db_mongo.get_table('plat2', 'member').find_one({'_id': open_id})
    # if not info:
    #     print(item)
    #     continue
    # db_mongo.get_table('plat2', 'order').update({'_id': item['_id']}, {'$set': {'refer_id': info['refer_id'], 'leader_openid': info['leader_openid']}})

