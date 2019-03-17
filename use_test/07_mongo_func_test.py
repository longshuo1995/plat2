from common.libs import db_mongo


def getNextValue(user_Name):
    ret = db_mongo.get_table('plat2', 'counter').update({"_id": user_Name}, {"$inc": {"req": 1}})
    # new = ret["sequence_value"]
    return ret


print(getNextValue("userid"))


