from common.libs import db_mongo

items = list(db_mongo.get_table('plat2', 'member').find())
for item in items:
    item['_id'] = db_mongo.getNextValue('member')
    db_mongo.get_table('plat2', 'member_id').insert_one(item)
