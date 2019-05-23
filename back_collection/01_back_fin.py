from common.libs import db_mongo

items = db_mongo.get_table('plat2', 'finance').find()
db_mongo.get_table('plat2_bak', 'finance').insert(items)
