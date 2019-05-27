from common.libs import db_mongo
from common.libs.tools import ODTools

open_id = 'ohl4g5fIjiqFutNkYHCsJ9OZ4aSY'
query = {'order_status': 6, '$or': [{'custom_parameters': open_id}, {'refer_id': open_id}, {'leader_openid': open_id}, {'leader_master': open_id}]}

items = db_mongo.get_table('plat2', 'order').find(query)

mp = ODTools.get_promotion_msg(items)
print(mp['ohl4g5fIjiqFutNkYHCsJ9OZ4aSY'])
