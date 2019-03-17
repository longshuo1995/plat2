from common.libs import db_mongo


ret = db_mongo.get_table('plat2', 'good').find({"name": {"$regex": ".*童装.*"}})
print(list(ret))
