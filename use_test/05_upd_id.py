from common.libs import db_mongo

open_id = 'ohl4g5dwnL7xYgyPpK2XBFYGz8D8'
orders = db_mongo.get_table('plat2', 'order').find({'refer_id': open_id})
order_count = len(set([i['custom_parameters'] for i in orders]))
print(order_count)
