from common.libs import db_mongo


def getNextValue(user_Name):
    ret = db_mongo.get_table('plat2', 'counters').find_and_modify({"_id": user_Name}, {"$inc": {"req": 1}}, safe=True)
    new = ret["req"]
    return new


print(getNextValue("userid"))


