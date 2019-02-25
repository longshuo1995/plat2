from common.libs import db_mongo

db_mongo.get_table('plat2', 'member').insert_one({
    "_id": "test",
    "nick_name": "test",
    "refer_id": "refer_test",
    "refer_nickname": "refer_test",
    "count_vip": 11,
    "count_leader": 12,
    "count_group": 10,
    "earn_vip": 100.11,
    "earn_leader": 200,
    "earn_group": 300,
    "current_money": 1000,
    "checking_money": 2000
})
