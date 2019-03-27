from common.libs import db_mongo

infos = db_mongo.get_table('plat2', 'order').find_one({
    '$or': [{'refer_id': 'test'}, {'leader_openid': 'test'}],
})
print(infos)
