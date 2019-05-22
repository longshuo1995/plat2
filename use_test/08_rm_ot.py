from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'order').find()
for item in items:
    if not isinstance(item['_id'], str):
        print(item['_id'])
