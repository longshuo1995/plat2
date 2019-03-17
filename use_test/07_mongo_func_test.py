from common.libs import db_mongo

db_mongo.get_table('plat2', 'test').insert_one({
    "_id": {"$where": 'getNextSequence("userid")'}
})


