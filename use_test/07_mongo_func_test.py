from common.libs import db_mongo

r = db_mongo.get_table('plat2', 'counter').find_and_modify(
    {
        "query": {"_id": "userid"},
        "update": {"$inc": {"seq": 1}}
    }
)
print(r)

