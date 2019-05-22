from common.libs import db_mongo
from common.libs.tools import ODTools

items = db_mongo.get_table('plat2', 'order').find({"order_status": {'$in': [3, 5]}})
m_p = ODTools.get_promotion_msg(items)
ODTools.upd_finance(m_p)

# df = pd.DataFrame(res)
# tot = df['total_promotion'].sum()
# print(tot)
