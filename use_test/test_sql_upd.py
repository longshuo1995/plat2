from common.libs import db_mongo

db_mongo.get_table('plat3', 'test').update_many({'name': 'test'}, {'$set': {'age': 120}})
