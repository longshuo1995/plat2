from common.libs import db_mongo

items_od = db_mongo.get_table('plat2', 'order').find()
items_fn = db_mongo.get_table('plat2', 'finance').find()

db_mongo.get_table('plat2_0527', 'order').insert(items_od)
db_mongo.get_table('plat2_0527', 'finance').insert(items_fn)

