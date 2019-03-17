from pymongo import MongoClient


cache_client = {}


def get_client():
    key = 'mongo_client'
    if not cache_client.get(key):
        client = MongoClient('127.0.0.1', 27017)
        cache_client[key] = client
    return cache_client.get(key)


def get_db(db_name):
    key = "mongo_db_%s" % db_name
    if not cache_client.get(key):
        cache_client[key] = get_client().get_database(db_name)
    return cache_client.get(key)


def get_table(db_name, table_name):
    key = "mongo_table_%s__%s" % (db_name, table_name)
    if not cache_client.get(key):
        cache_client[key] = get_db(db_name).get_collection(table_name)
    return cache_client.get(key)


def getNextValue(key_name):
    ret = get_table('plat2', 'counters').find_and_modify({"_id": key_name}, {"$inc": {"req": 1}}, safe=True, new=True)
    new = ret["req"]
    return new
