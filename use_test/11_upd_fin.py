from common.libs import db_mongo


items = db_mongo.get_table('plat2', 'finance').find()
for item in items:
    f_n = int(item['finance'] * 100)
    c_n = int(item.get('checking') * 100)
    db_mongo.get_table('plat2', 'finance').update(
        {'_id': item['_id']},
        {"$set": {'finance_count': f_n, 'checking': c_n}})


items = db_mongo.get_table('plat2', 'draw').find()
for item in items:
    d_c = int(item['draw_count']*100)
    db_mongo.get_table('plat2', 'draw').update(
        {'_id': item['_id']},
        {'$set': {'draw_count': d_c}}
    )


