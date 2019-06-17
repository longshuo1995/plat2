from common.libs import db_mongo

open_ids = [
    # 'ohl4g5f8Kzxo-JbLUH0s4T9DZfCc',
    # 'ohl4g5fdajr853w1w_PtecTAeeW8',
    # 'ohl4g5bF-F7ga3Bbe4QK5A_qlUgk',
    # 'ohl4g5fIjiqFutNkYHCsJ9OZ4aSY'
]
items = db_mongo.get_table('plat2', 'draw').find({'status': 1})

for item in items:
    open_id = items['open_id']
    if open_id in open_ids:
        continue
    print(open_id)
    db_mongo.get_table('plat2', 'draw').update({'open_id': open_id, 'status': 1}, {'$set': {'status': 2}})
    db_mongo.get_table('plat2', 'finance').update({'open_id': open_id}, {'$set': {'checking': 0}})
