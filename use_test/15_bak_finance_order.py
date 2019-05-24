from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'order').find()
db_mongo.get_table('plat2_0524', 'order').insert(items)


items = db_mongo.get_table('plat2', 'finance').find()
db_mongo.get_table('plat2_0524', 'finance').insert(items)
