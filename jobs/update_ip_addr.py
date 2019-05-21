from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'member').find({'ip': {'$exists': True}, 'ip_addr': {'$exists': False}})
for item in items:
    print(item)
