from common.libs import db_mongo
from common.libs.pdd import pdd_tools

items = list(db_mongo.get_table('plat2', 'order').find({'order_status': {'$exists': False}}))

for item in items:
    res = pdd_tools.search_order_by_sn(item['_id'])
    tbl = db_mongo.get_table('plat2', 'order')
    dt = res['order_detail_response']
    tbl.update({'_id': item['_id']}, {'$set': {'order_status': dt['order_status'], 'order_status_desc': dt['order_status_desc']}})

