from common.libs import db_mongo


items = db_mongo.get_table('plat2', 'finance').find()
for item in items:
    f_n = int(item['finance'] * 100)
    db_mongo.get_table('plat2', 'finance').update({'_id': item['_id']}, {"$set": {'finance_count': f_n}})


