from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'order').find()
for item in items:
    open_id = item['custom_parameters']
    info = db_mongo.get_table('plat2', 'order').find_one({'_id': open_id})
    db_mongo.get_table('plat2', 'order').update({'_id': item['_id']}, {'$set': {'refer_id': info['refer_id'], 'leader_openid': info['leader_openid']}})

