from common.libs import db_mongo


# 查询旧的
from common.libs.tools import ODTools

olders = db_mongo.get_table('plat2_0524', 'order').find({'order_status': 6})
crawled = set()
for i in olders:
    crawled.add(i['_id'])


# 查询新增的
items = db_mongo.get_table('plat2', 'order').find({'order_status': 6})
items = [items for i in items if i['_id'] not in crawled]
mp = ODTools.get_promotion_msg(items)
for k, v in mp.items():
    print(k, v)

