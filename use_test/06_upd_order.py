from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'order').find({'order_create_time': {'$gt': 1556759914}})
for item in items:
    info = db_mongo.get_table('plat2', 'member').find({'open_id': item['custom_parameters']})
    if item['refer_id'] == '' or item['leader_openid'] == '':
        db_mongo.get_table('plat2', 'order').update({'_id': item['_id']}, {'$set': {'refer_id': info['refer_id'], 'leader_openid': info['leader_openid']}})

