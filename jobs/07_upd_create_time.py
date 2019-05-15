from common.libs import db_mongo
from common.libs.tools import StrTools

items = db_mongo.get_table('plat2', 'order').find()
for item in items:
    ct = StrTools.convert_time(item['order_create_time'], '%Y-%m-%d %H:%M')
    db_mongo.get_table('plat2', 'order').update({'_id': item['_id']}, {'$set': {'create_time': ct}})
