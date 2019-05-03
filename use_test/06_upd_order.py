from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'order').find({'order_create_time': {'$gt': 1556759914}})
for item in items:
    if item['refer_id'] == '' or item['leader_openid'] == '':
        print(item)
