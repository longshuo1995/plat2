from common.libs import db_mongo

tb = db_mongo.get_table('plat2', 'counter')
new = tb.find_and_modify(
        {"_id": "userid"},
        {"$inc": {"seq": 1}},
        safe=True, new=True
)
print(new)

