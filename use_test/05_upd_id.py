from common.libs import db_mongo
import pandas as pd

items = db_mongo.get_table('plat2', 'member').find()

for item in items:
    db_mongo.get_table('plat2', 'member').remove({'_id': item['_id']})
    item['_id'] = int(item['_id'])
    db_mongo.get_table('plat2', 'member').insert_one(item)

