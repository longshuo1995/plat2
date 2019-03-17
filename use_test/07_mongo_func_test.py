from common.libs import db_mongo


def getNextValue(key_name):
    ret = db_mongo.get_table('plat2', 'counters').find_and_modify({"_id": key_name}, {"$inc": {"req": 1}}, safe=True, new=True)
    new = ret["req"]
    return new


print(getNextValue("userid"))


