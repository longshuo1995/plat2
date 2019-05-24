from common.libs import db_mongo
from common.libs.tools import ODTools


# 重新插入
items = db_mongo.get_table('plat2_bak', 'finance').find()
db_mongo.get_table('plat2', 'finance').insert(items)


items = db_mongo.get_table('plat2_bak', 'order').find({'order_status': 6})
crawled_id = set([i['_id'] for i in items])

items_od = db_mongo.get_table('plat2', 'order').find({'order_status': 6})
i_d = [i for i in items_od if i['_id'] not in crawled_id]

m_p = ODTools.get_promotion_msg(i_d)
sm = sum(m_p.values())
print('增加值', sm)

items_before = db_mongo.get_table('plat2', 'finance').find()
s_before = sum([i['finance'] for i in items_before])
print('增加前', s_before)
ODTools.upd_finance(m_p)


items_before = db_mongo.get_table('plat2', 'finance').find()
s_before = sum([i['finance'] for i in items_before])
print('增加后', s_before)
